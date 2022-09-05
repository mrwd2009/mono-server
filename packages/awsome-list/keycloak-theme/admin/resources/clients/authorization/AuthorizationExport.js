import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  FormGroup,
  PageSection,
  ActionGroup,
  Button,
  AlertVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useParams} from "../../_snowpack/pkg/react-router-dom.js";
import FileSaver from "../../_snowpack/pkg/file-saver.js";
import {prettyPrintJSON} from "../../util.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
import "./authorization-details.css.proxy.js";
export const AuthorizationExport = () => {
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {clientId} = useParams();
  const {addAlert, addError} = useAlerts();
  const [code, setCode] = useState();
  const [authorizationDetails, setAuthorizationDetails] = useState();
  useFetch(() => adminClient.clients.exportResource({
    id: clientId
  }), (authDetails) => {
    setCode(JSON.stringify(authDetails, null, 2));
    setAuthorizationDetails(authDetails);
  }, []);
  const exportAuthDetails = () => {
    try {
      FileSaver.saveAs(new Blob([prettyPrintJSON(authorizationDetails)], {
        type: "application/json"
      }), "test-authz-config.json");
      addAlert(t("exportAuthDetailsSuccess"), AlertVariant.success);
    } catch (error) {
      addError("exportAuthDetailsError", error);
    }
  };
  if (!code) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "view-realm",
    className: "pf-u-mt-lg"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authDetails"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:authDetails",
      fieldLabelId: "clients:authDetails"
    }),
    fieldId: "client"
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    id: "authorizationDetails",
    readOnly: true,
    resizeOrientation: "vertical",
    value: code,
    "aria-label": t("authDetails")
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "authorization-export-download",
    onClick: () => exportAuthDetails()
  }, t("common:download")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "authorization-export-copy",
    variant: "secondary",
    onClick: async () => {
      try {
        await navigator.clipboard.writeText(code);
        addAlert(t("copied"), AlertVariant.success);
      } catch (error) {
        addError(t("copyError"), error);
      }
    }
  }, t("copy")))));
};
