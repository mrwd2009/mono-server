import {
  Alert,
  AlertVariant,
  Form,
  FormGroup,
  ModalVariant,
  Select,
  SelectOption,
  SelectVariant,
  Stack,
  StackItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import FileSaver from "../../_snowpack/pkg/file-saver.js";
import React, {useEffect, useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {prettyPrintJSON} from "../../util.js";
import {ConfirmDialogModal} from "../confirm-dialog/ConfirmDialog.js";
import {useHelp} from "../help-enabler/HelpHeader.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import {KeycloakTextArea} from "../keycloak-text-area/KeycloakTextArea.js";
export const DownloadDialog = ({
  id,
  open,
  toggleDialog,
  protocol = "openid-connect"
}) => {
  const {adminClient} = useAdminClient();
  const {t} = useTranslation("common");
  const {enabled} = useHelp();
  const serverInfo = useServerInfo();
  const configFormats = serverInfo.clientInstallations[protocol];
  const [selected, setSelected] = useState(configFormats[configFormats.length - 1].id);
  const [snippet, setSnippet] = useState("");
  const [openType, setOpenType] = useState(false);
  const selectedConfig = useMemo(() => configFormats.find((config) => config.id === selected) ?? null, [selected]);
  const sanitizeSnippet = (snippet2) => snippet2.replace(/<PrivateKeyPem>.*<\/PrivateKeyPem>/gs, `<PrivateKeyPem>${t("clients:privateKeyMask")}</PrivateKeyPem>`);
  useFetch(async () => {
    const snippet2 = await adminClient.clients.getInstallationProviders({
      id,
      providerId: selected
    });
    if (typeof snippet2 === "string") {
      return sanitizeSnippet(snippet2);
    } else {
      return prettyPrintJSON(snippet2);
    }
  }, (snippet2) => setSnippet(snippet2), [id, selected]);
  useEffect(() => setSnippet(""), [id, selected]);
  return /* @__PURE__ */ React.createElement(ConfirmDialogModal, {
    titleKey: t("clients:downloadAdaptorTitle"),
    continueButtonLabel: t("download"),
    onConfirm: () => {
      const config = configFormats.find((config2) => config2.id === selected);
      FileSaver.saveAs(new Blob([snippet], {type: config.mediaType}), config.filename);
    },
    open,
    toggleDialog,
    variant: ModalVariant.medium
  }, /* @__PURE__ */ React.createElement(Form, null, /* @__PURE__ */ React.createElement(Stack, {
    hasGutter: true
  }, enabled && /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(Alert, {
    id,
    title: t("clients:description"),
    variant: AlertVariant.info,
    isInline: true
  }, configFormats.find((configFormat) => configFormat.id === selected)?.helpText)), /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "type",
    label: t("clients:formatOption"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t("clients-help:downloadType"),
      fieldLabelId: "clients:formatOption"
    })
  }, /* @__PURE__ */ React.createElement(Select, {
    toggleId: "type",
    isOpen: openType,
    onToggle: (isExpanded) => setOpenType(isExpanded),
    variant: SelectVariant.single,
    value: selected,
    selections: selected,
    onSelect: (_, value) => {
      setSelected(value.toString());
      setOpenType(false);
    },
    "aria-label": "Select Input",
    menuAppendTo: () => document.body
  }, configFormats.map((configFormat) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: configFormat.id,
    value: configFormat.id,
    isSelected: selected === configFormat.id
  }, configFormat.displayType))))), !selectedConfig?.downloadOnly && /* @__PURE__ */ React.createElement(StackItem, {
    isFilled: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "details",
    label: t("details"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t("clients-help:details"),
      fieldLabelId: "clients:details"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    id: "details",
    readOnly: true,
    rows: 12,
    resizeOrientation: "vertical",
    value: snippet,
    "aria-label": "text area example"
  }))))));
};
