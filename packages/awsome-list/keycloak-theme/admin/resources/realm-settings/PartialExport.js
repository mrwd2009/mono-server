import {
  Alert,
  AlertVariant,
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Switch,
  Text,
  TextContent
} from "../_snowpack/pkg/@patternfly/react-core.js";
import FileSaver from "../_snowpack/pkg/file-saver.js";
import React, {useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {prettyPrintJSON} from "../util.js";
import "./partial-export.css.proxy.js";
export const PartialExportDialog = ({
  isOpen,
  onClose
}) => {
  const {t} = useTranslation("realm-settings");
  const {realm} = useRealm();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [exportGroupsAndRoles, setExportGroupsAndRoles] = useState(false);
  const [exportClients, setExportClients] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const showWarning = exportGroupsAndRoles || exportClients;
  async function exportRealm() {
    setIsExporting(true);
    try {
      const realmExport = await adminClient.realms.export({
        realm,
        exportClients,
        exportGroupsAndRoles
      });
      FileSaver.saveAs(new Blob([prettyPrintJSON(realmExport)], {
        type: "application/json"
      }), "realm-export.json");
      addAlert(t("exportSuccess"), AlertVariant.success);
      onClose();
    } catch (error) {
      addError("exportFail", error);
    }
    setIsExporting(false);
  }
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    title: t("partialExport"),
    isOpen,
    onClose,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        key: "export",
        "data-testid": "export-button",
        isDisabled: isExporting,
        onClick: exportRealm
      }, t("common:export")),
      /* @__PURE__ */ React.createElement(Button, {
        key: "cancel",
        "data-testid": "cancel-button",
        variant: ButtonVariant.link,
        onClick: onClose
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, null, t("partialExportHeaderText"))), /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true,
    className: "keycloak__realm-settings__partial-import_form"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("includeGroupsAndRoles"),
    fieldId: "include-groups-and-roles-check",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "include-groups-and-roles-check",
    "data-testid": "include-groups-and-roles-check",
    isChecked: exportGroupsAndRoles,
    onChange: setExportGroupsAndRoles,
    label: t("common:on"),
    labelOff: t("common:off")
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("includeClients"),
    fieldId: "include-clients-check",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "include-clients-check",
    "data-testid": "include-clients-check",
    onChange: setExportClients,
    isChecked: exportClients,
    label: t("common:on"),
    labelOff: t("common:off")
  }))), showWarning && /* @__PURE__ */ React.createElement(Alert, {
    "data-testid": "warning-message",
    variant: "warning",
    title: t("exportWarningTitle"),
    isInline: true
  }, t("exportWarningDescription")));
};
