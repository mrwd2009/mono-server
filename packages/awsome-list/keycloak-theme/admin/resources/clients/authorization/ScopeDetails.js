import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  DropdownItem,
  FormGroup,
  PageSection,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {toAuthorizationTab} from "../routes/AuthenticationTab.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import useToggle from "../../utils/useToggle.js";
import {DeleteScopeDialog} from "./DeleteScopeDialog.js";
export default function ScopeDetails() {
  const {t} = useTranslation("clients");
  const {id, scopeId, realm} = useParams();
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [deleteDialog, toggleDeleteDialog] = useToggle();
  const [scope, setScope] = useState();
  const {
    register,
    reset,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: "onChange"
  });
  useFetch(async () => {
    if (scopeId) {
      const scope2 = await adminClient.clients.getAuthorizationScope({
        id,
        scopeId
      });
      if (!scope2) {
        throw new Error(t("common:notFound"));
      }
      return scope2;
    }
  }, (scope2) => {
    setScope(scope2);
    reset({...scope2});
  }, []);
  const save = async (scope2) => {
    try {
      if (scopeId) {
        await adminClient.clients.updateAuthorizationScope({id, scopeId}, scope2);
        setScope(scope2);
      } else {
        await adminClient.clients.createAuthorizationScope({id}, {
          name: scope2.name,
          displayName: scope2.displayName,
          iconUri: scope2.iconUri
        });
        history.push(toAuthorizationTab({realm, clientId: id, tab: "scopes"}));
      }
      addAlert(t((scopeId ? "update" : "create") + "ScopeSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:scopeSaveError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteScopeDialog, {
    clientId: id,
    open: deleteDialog,
    toggleDialog: toggleDeleteDialog,
    selectedScope: scope,
    refresh: () => history.push(toAuthorizationTab({realm, clientId: id, tab: "scopes"}))
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: scopeId ? scope?.name : t("clients:createAuthorizationScope"),
    dropdownItems: scopeId ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        "data-testid": "delete-resource",
        onClick: () => toggleDeleteDialog()
      }, t("common:delete"))
    ] : void 0
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "view-clients",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    fieldId: "name",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:scopeName",
      fieldLabelId: "name"
    }),
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "name",
    name: "name",
    ref: register({required: true}),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("displayName"),
    fieldId: "displayName",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:scopeDisplayName",
      fieldLabelId: "displayName"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "displayName",
    name: "displayName",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("iconUri"),
    fieldId: "iconUri",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:iconUri",
      fieldLabelId: "clients:iconUri"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "iconUri",
    name: "iconUri",
    ref: register
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.primary,
    type: "submit",
    "data-testid": "save"
  }, t("common:save")), !scope ? /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "cancel",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toAuthorizationTab({
        realm,
        clientId: id,
        tab: "scopes"
      })
    })
  }, t("common:cancel")) : /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "revert",
    onClick: () => reset({...scope})
  }, t("common:revert")))))));
}
