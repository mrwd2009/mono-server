import React from "../../_snowpack/pkg/react.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  PageSection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {NameDescription} from "./NameDescription.js";
import {FlowType} from "./FlowType.js";
import {toFlow} from "../routes/Flow.js";
import {toAuthentication} from "../routes/Authentication.js";
export default function CreateFlow() {
  const {t} = useTranslation("authentication");
  const history = useHistory();
  const {realm} = useRealm();
  const form = useForm({
    defaultValues: {builtIn: false, topLevel: true}
  });
  const {handleSubmit, register} = form;
  const {adminClient} = useAdminClient();
  const {addAlert} = useAlerts();
  const save = async (flow) => {
    try {
      const {id} = await adminClient.authenticationManagement.createFlow(flow);
      addAlert(t("flowCreatedSuccess"), AlertVariant.success);
      history.push(toFlow({
        realm,
        id,
        usedBy: "notInUse"
      }));
    } catch (error) {
      addAlert(t("flowCreateError", {
        error: error.response?.data?.errorMessage || error
      }), AlertVariant.danger);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "authentication:createFlow",
    subKey: "authentication-help:createFlow"
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-authorization",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement("input", {
    name: "builtIn",
    type: "hidden",
    ref: register
  }), /* @__PURE__ */ React.createElement("input", {
    name: "topLevel",
    type: "hidden",
    ref: register
  }), /* @__PURE__ */ React.createElement(NameDescription, null), /* @__PURE__ */ React.createElement(FlowType, null), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "create",
    type: "submit"
  }, t("common:create")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "cancel",
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toAuthentication({realm})
    })
  }, t("common:cancel")))))));
}
