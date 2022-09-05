import {
  ActionGroup,
  AlertVariant,
  Button,
  FormGroup,
  PageSection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {useState} from "../../_snowpack/pkg/react.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {JsonFileUpload} from "../../components/json-file-upload/JsonFileUpload.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {convertFormValuesToObject, convertToFormValues} from "../../util.js";
import {CapabilityConfig} from "../add/CapabilityConfig.js";
import {ClientDescription} from "../ClientDescription.js";
import {toClient} from "../routes/Client.js";
import {toClients} from "../routes/Clients.js";
export default function ImportForm() {
  const {t} = useTranslation("clients");
  const history = useHistory();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const form = useForm({shouldUnregister: false});
  const {register, handleSubmit, setValue} = form;
  const [imported, setImported] = useState({});
  const {addAlert, addError} = useAlerts();
  const handleFileChange = (obj) => {
    const defaultClient = {
      protocol: "",
      clientId: "",
      name: "",
      description: ""
    };
    convertToFormValues(obj || defaultClient, setValue);
    setImported(obj || defaultClient);
  };
  const save = async (client) => {
    try {
      const newClient = await adminClient.clients.create({
        ...imported,
        ...convertFormValuesToObject(client)
      });
      addAlert(t("clientImportSuccess"), AlertVariant.success);
      history.push(toClient({realm, clientId: newClient.id, tab: "settings"}));
    } catch (error) {
      addError("clients:clientImportError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "clients:importClient",
    subKey: "clients:clientsExplain"
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    role: "manage-clients"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(JsonFileUpload, {
    id: "realm-file",
    onChange: handleFileChange
  }), /* @__PURE__ */ React.createElement(ClientDescription, {
    hasConfigureAccess: true
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:type"),
    fieldId: "kc-type"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-type",
    name: "protocol",
    isReadOnly: true,
    ref: register()
  })), /* @__PURE__ */ React.createElement(CapabilityConfig, {
    unWrap: true
  }), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toClients({realm})
    })
  }, t("common:cancel")))))));
}
