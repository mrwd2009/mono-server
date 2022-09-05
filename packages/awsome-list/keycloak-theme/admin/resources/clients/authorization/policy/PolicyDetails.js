import React, {useState} from "../../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  DropdownItem,
  PageSection
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {
  toPolicyDetails
} from "../../routes/PolicyDetails.js";
import {ViewHeader} from "../../../components/view-header/ViewHeader.js";
import {KeycloakSpinner} from "../../../components/keycloak-spinner/KeycloakSpinner.js";
import {useConfirmDialog} from "../../../components/confirm-dialog/ConfirmDialog.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {FormAccess} from "../../../components/form-access/FormAccess.js";
import {useAlerts} from "../../../components/alert/Alerts.js";
import {toAuthorizationTab} from "../../routes/AuthenticationTab.js";
import {Aggregate} from "./Aggregate.js";
import {Client} from "./Client.js";
import {User} from "./User.js";
import {NameDescription} from "./NameDescription.js";
import {LogicSelector} from "./LogicSelector.js";
import {ClientScope} from "./ClientScope.js";
import {Group} from "./Group.js";
import {Regex} from "./Regex.js";
import {Role} from "./Role.js";
import {Time} from "./Time.js";
import {JavaScript} from "./JavaScript.js";
import "./policy-details.css.proxy.js";
const COMPONENTS = {
  aggregate: Aggregate,
  client: Client,
  user: User,
  "client-scope": ClientScope,
  group: Group,
  regex: Regex,
  role: Role,
  time: Time,
  js: JavaScript
};
export const isValidComponentType = (value) => value in COMPONENTS;
export default function PolicyDetails() {
  const {t} = useTranslation("clients");
  const {id, realm, policyId, policyType} = useParams();
  const history = useHistory();
  const form = useForm({shouldUnregister: false});
  const {reset, handleSubmit} = form;
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [policy, setPolicy] = useState();
  useFetch(async () => {
    if (policyId) {
      const result = await Promise.all([
        adminClient.clients.findOnePolicy({
          id,
          type: policyType,
          policyId
        }),
        adminClient.clients.getAssociatedPolicies({
          id,
          permissionId: policyId
        })
      ]);
      if (!result[0]) {
        throw new Error(t("common:notFound"));
      }
      return {
        policy: result[0],
        policies: result[1].map((p) => p.id)
      };
    }
    return {};
  }, ({policy: policy2, policies}) => {
    reset({...policy2, policies});
    setPolicy(policy2);
  }, []);
  const save = async (policy2) => {
    policy2.groups = policy2.groups?.filter((g) => g.id);
    policy2.clientScopes = policy2.clientScopes?.filter((c) => c.id);
    policy2.roles = policy2.roles?.filter((r) => r.id).map((r) => ({...r, required: r.required || false}));
    try {
      if (policyId) {
        await adminClient.clients.updatePolicy({id, type: policyType, policyId}, policy2);
      } else {
        const result = await adminClient.clients.createPolicy({id, type: policyType}, policy2);
        history.push(toPolicyDetails({
          realm,
          id,
          policyType,
          policyId: result.id
        }));
      }
      addAlert(t((policyId ? "update" : "create") + "PolicySuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:policySaveError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:deletePolicy",
    messageKey: "clients:deletePolicyConfirm",
    continueButtonLabel: "clients:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.delPolicy({
          id,
          policyId
        });
        addAlert(t("policyDeletedSuccess"), AlertVariant.success);
        history.push(toAuthorizationTab({realm, clientId: id, tab: "policies"}));
      } catch (error) {
        addError("clients:policyDeletedError", error);
      }
    }
  });
  if (policyId && !policy) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const ComponentType = isValidComponentType(policyType) ? COMPONENTS[policyType] : COMPONENTS["js"];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: policyId ? policy?.name : "clients:createPolicy",
    dropdownItems: policyId ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        "data-testid": "delete-policy",
        onClick: () => toggleDeleteDialog()
      }, t("common:delete"))
    ] : void 0
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    role: "view-clients"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(NameDescription, {
    prefix: "policy"
  }), /* @__PURE__ */ React.createElement(ComponentType, null), /* @__PURE__ */ React.createElement(LogicSelector, null)), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.primary,
    className: "pf-u-mr-md",
    type: "submit",
    "data-testid": "save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "cancel",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toAuthorizationTab({
        realm,
        clientId: id,
        tab: "policies"
      })
    })
  }, t("common:cancel")))))));
}
