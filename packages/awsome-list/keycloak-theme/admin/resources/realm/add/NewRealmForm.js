import {
  ActionGroup,
  AlertVariant,
  Button,
  FormGroup,
  PageSection,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React from "../../_snowpack/pkg/react.js";
import {Controller, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {JsonFileUpload} from "../../components/json-file-upload/JsonFileUpload.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealms} from "../../context/RealmsContext.js";
import {useWhoAmI} from "../../context/whoami/WhoAmI.js";
import {toDashboard} from "../../dashboard/routes/Dashboard.js";
export default function NewRealmForm() {
  const {t} = useTranslation("realm");
  const history = useHistory();
  const {refresh, whoAmI} = useWhoAmI();
  const {refresh: refreshRealms} = useRealms();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: {errors}
  } = useForm({mode: "onChange"});
  const handleFileChange = (obj) => {
    const defaultRealm = {id: "", realm: "", enabled: true};
    Object.entries(obj || defaultRealm).map((entry) => setValue(entry[0], entry[1]));
  };
  const save = async (realm) => {
    try {
      await adminClient.realms.create(realm);
      addAlert(t("saveRealmSuccess"), AlertVariant.success);
      refresh();
      await refreshRealms();
      history.push(toDashboard({realm: realm.realm}));
    } catch (error) {
      addError("realm:saveRealmError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "realm:createRealm",
    subKey: "realm:realmExplain"
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    role: "view-realm",
    isReadOnly: !whoAmI.canCreateRealm()
  }, /* @__PURE__ */ React.createElement(JsonFileUpload, {
    id: "kc-realm-filename",
    allowEditingUploadedText: true,
    onChange: handleFileChange
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("realmName"),
    isRequired: true,
    fieldId: "kc-realm-name",
    validated: errors.realm ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isRequired: true,
    type: "text",
    id: "kc-realm-name",
    name: "realm",
    validated: errors.realm ? "error" : "default",
    ref: register({required: true})
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("enabled"),
    fieldId: "kc-realm-enabled-switch"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "enabled",
    defaultValue: true,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-realm-enabled-switch",
      name: "enabled",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit"
  }, t("common:create")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: () => history.goBack()
  }, t("common:cancel"))))));
}
