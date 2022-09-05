import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {
  Alert,
  Button,
  ButtonVariant,
  Checkbox,
  DataList,
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  Divider,
  Label,
  Modal,
  ModalVariant,
  Select,
  SelectOption,
  Stack,
  StackItem,
  Text,
  TextContent
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {JsonFileUpload} from "../components/json-file-upload/JsonFileUpload.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
const INITIAL_RESOURCES = {
  users: false,
  clients: false,
  groups: false,
  identityProviders: false,
  realmRoles: false,
  clientRoles: false
};
export const PartialImportDialog = (props) => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const [importedFile, setImportedFile] = useState();
  const isFileSelected = !!importedFile;
  const [isRealmSelectOpen, setIsRealmSelectOpen] = useState(false);
  const [isCollisionSelectOpen, setIsCollisionSelectOpen] = useState(false);
  const [importInProgress, setImportInProgress] = useState(false);
  const [collisionOption, setCollisionOption] = useState("FAIL");
  const [targetRealm, setTargetRealm] = useState({});
  const [importResponse, setImportResponse] = useState();
  const {addError} = useAlerts();
  const [resourcesToImport, setResourcesToImport] = useState(INITIAL_RESOURCES);
  const isAnyResourceChecked = Object.values(resourcesToImport).some((checked) => checked);
  const resetResourcesToImport = () => {
    setResourcesToImport(INITIAL_RESOURCES);
  };
  const resetInputState = () => {
    setImportedFile(void 0);
    setTargetRealm({});
    setCollisionOption("FAIL");
    resetResourcesToImport();
  };
  useEffect(() => {
    setImportInProgress(false);
    setImportResponse(void 0);
    resetInputState();
  }, [props.open]);
  const handleFileChange = (value) => {
    resetInputState();
    setImportedFile(value);
    if (!Array.isArray(value)) {
      setTargetRealm(value);
    } else if (value.length > 0) {
      setTargetRealm(value[0]);
    }
  };
  const handleRealmSelect = (realm2) => {
    setTargetRealm(realm2);
    setIsRealmSelectOpen(false);
    resetResourcesToImport();
  };
  const handleResourceCheckBox = (checked, event) => {
    const resource = event.currentTarget.name;
    setResourcesToImport({
      ...resourcesToImport,
      [resource]: checked
    });
  };
  const realmSelectOptions = (realms) => realms.map((realm2) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: realm2.id,
    value: realm2,
    "data-testid": realm2.id + "-select-option"
  }, realm2.realm || realm2.id));
  const handleCollisionSelect = (event, option) => {
    setCollisionOption(option);
    setIsCollisionSelectOpen(false);
  };
  const collisionOptions = () => {
    return [
      /* @__PURE__ */ React.createElement(SelectOption, {
        key: "fail",
        value: "FAIL"
      }, t("FAIL")),
      /* @__PURE__ */ React.createElement(SelectOption, {
        key: "skip",
        value: "SKIP"
      }, t("SKIP")),
      /* @__PURE__ */ React.createElement(SelectOption, {
        key: "overwrite",
        value: "OVERWRITE"
      }, t("OVERWRITE"))
    ];
  };
  const targetHasResources = () => {
    return targetHasResource("users") || targetHasResource("groups") || targetHasResource("clients") || targetHasResource("identityProviders") || targetHasRealmRoles() || targetHasClientRoles();
  };
  const targetHasResource = (resource) => {
    const value = targetRealm[resource];
    return value !== void 0 && value.length > 0;
  };
  const targetHasRealmRoles = () => {
    const value = targetRealm.roles?.realm;
    return value !== void 0 && value.length > 0;
  };
  const targetHasClientRoles = () => {
    const value = targetRealm.roles?.client;
    return value !== void 0 && Object.keys(value).length > 0;
  };
  const itemCount = (resource) => {
    if (!isFileSelected)
      return 0;
    if (resource === "realmRoles") {
      return targetRealm.roles?.realm?.length ?? 0;
    }
    if (resource === "clientRoles") {
      return targetHasClientRoles() ? clientRolesCount(targetRealm.roles.client) : 0;
    }
    return targetRealm[resource]?.length ?? 0;
  };
  const clientRolesCount = (clientRoles) => Object.values(clientRoles).reduce((total, role) => total + role.length, 0);
  const resourceDataListItem = (resource, resourceDisplayName) => {
    return /* @__PURE__ */ React.createElement(DataListItem, {
      "aria-labelledby": `${resource}-list-item`
    }, /* @__PURE__ */ React.createElement(DataListItemRow, null, /* @__PURE__ */ React.createElement(DataListItemCells, {
      dataListCells: [
        /* @__PURE__ */ React.createElement(DataListCell, {
          key: resource
        }, /* @__PURE__ */ React.createElement(Checkbox, {
          id: `${resource}-checkbox`,
          label: `${itemCount(resource)} ${resourceDisplayName}`,
          "aria-labelledby": `${resource}-checkbox`,
          name: resource,
          isChecked: resourcesToImport[resource],
          onChange: handleResourceCheckBox,
          "data-testid": resource + "-checkbox"
        }))
      ]
    })));
  };
  const jsonForImport = () => {
    const jsonToImport = {
      ifResourceExists: collisionOption,
      id: targetRealm.id,
      realm: targetRealm.realm
    };
    if (resourcesToImport["users"])
      jsonToImport.users = targetRealm.users;
    if (resourcesToImport["groups"])
      jsonToImport.groups = targetRealm.groups;
    if (resourcesToImport["identityProviders"])
      jsonToImport.identityProviders = targetRealm.identityProviders;
    if (resourcesToImport["clients"])
      jsonToImport.clients = targetRealm.clients;
    if (resourcesToImport["realmRoles"] || resourcesToImport["clientRoles"]) {
      jsonToImport.roles = targetRealm.roles;
      if (!resourcesToImport["realmRoles"])
        delete jsonToImport.roles?.realm;
      if (!resourcesToImport["clientRoles"])
        delete jsonToImport.roles?.client;
    }
    return jsonToImport;
  };
  async function doImport() {
    if (importInProgress)
      return;
    setImportInProgress(true);
    try {
      const importResults = await adminClient.realms.partialImport({
        realm,
        rep: jsonForImport()
      });
      setImportResponse(importResults);
    } catch (error) {
      addError("realm-settings:importFail", error);
    }
    setImportInProgress(false);
  }
  const importModal = () => {
    return /* @__PURE__ */ React.createElement(Modal, {
      variant: ModalVariant.medium,
      title: t("partialImport"),
      isOpen: props.open,
      onClose: props.toggleDialog,
      actions: [
        /* @__PURE__ */ React.createElement(Button, {
          id: "modal-import",
          "data-testid": "import-button",
          key: "import",
          isDisabled: !isAnyResourceChecked,
          onClick: () => {
            doImport();
          }
        }, t("import")),
        /* @__PURE__ */ React.createElement(Button, {
          id: "modal-cancel",
          "data-testid": "cancel-button",
          key: "cancel",
          variant: ButtonVariant.link,
          onClick: () => {
            props.toggleDialog();
          }
        }, t("common:cancel"))
      ]
    }, /* @__PURE__ */ React.createElement(Stack, {
      hasGutter: true
    }, /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, null, t("partialImportHeaderText")))), /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(JsonFileUpload, {
      id: "partial-import-file",
      allowEditingUploadedText: true,
      onChange: handleFileChange
    })), isFileSelected && targetHasResources() && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(Divider, null)), Array.isArray(importedFile) && importedFile.length > 1 && /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(Text, null, t("selectRealm"), ":"), /* @__PURE__ */ React.createElement(Select, {
      toggleId: "realm-selector",
      isOpen: isRealmSelectOpen,
      onToggle: () => setIsRealmSelectOpen(!isRealmSelectOpen),
      onSelect: (_, value) => handleRealmSelect(value),
      placeholderText: targetRealm.realm || targetRealm.id
    }, realmSelectOptions(importedFile))), /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(Text, null, t("chooseResources"), ":"), /* @__PURE__ */ React.createElement(DataList, {
      "aria-label": t("resourcesToImport"),
      isCompact: true
    }, targetHasResource("users") && resourceDataListItem("users", t("common:users")), targetHasResource("groups") && resourceDataListItem("groups", t("common:groups")), targetHasResource("clients") && resourceDataListItem("clients", t("common:clients")), targetHasResource("identityProviders") && resourceDataListItem("identityProviders", t("common:identityProviders")), targetHasRealmRoles() && resourceDataListItem("realmRoles", t("common:realmRoles")), targetHasClientRoles() && resourceDataListItem("clientRoles", t("common:clientRoles")))), /* @__PURE__ */ React.createElement(StackItem, null, /* @__PURE__ */ React.createElement(Text, null, t("selectIfResourceExists"), ":"), /* @__PURE__ */ React.createElement(Select, {
      isOpen: isCollisionSelectOpen,
      direction: "up",
      onToggle: () => {
        setIsCollisionSelectOpen(!isCollisionSelectOpen);
      },
      onSelect: handleCollisionSelect,
      placeholderText: t(collisionOption)
    }, collisionOptions())))));
  };
  const importCompleteMessage = () => {
    return `${t("importAdded", {
      count: importResponse?.added
    })}  ${t("importSkipped", {
      count: importResponse?.skipped
    })} ${t("importOverwritten", {
      count: importResponse?.overwritten
    })}`;
  };
  const loader = async (first = 0, max = 15) => {
    if (!importResponse) {
      return [];
    }
    const last = Math.min(first + max, importResponse.results.length);
    return importResponse.results.slice(first, last);
  };
  const ActionLabel = (importRecord) => {
    switch (importRecord.action) {
      case "ADDED":
        return /* @__PURE__ */ React.createElement(Label, {
          key: importRecord.id,
          color: "green"
        }, t("added"));
      case "SKIPPED":
        return /* @__PURE__ */ React.createElement(Label, {
          key: importRecord.id,
          color: "orange"
        }, t("skipped"));
      case "OVERWRITTEN":
        return /* @__PURE__ */ React.createElement(Label, {
          key: importRecord.id,
          color: "purple"
        }, t("overwritten"));
    }
  };
  const TypeRenderer = (importRecord) => {
    const typeMap = new Map([
      ["CLIENT", t("common:clients")],
      ["REALM_ROLE", t("common:realmRoles")],
      ["USER", t("common:users")],
      ["CLIENT_ROLE", t("common:clientRoles")],
      ["IDP", t("common:identityProviders")]
    ]);
    return /* @__PURE__ */ React.createElement("span", null, typeMap.get(importRecord.resourceType));
  };
  const importCompletedModal = () => {
    return /* @__PURE__ */ React.createElement(Modal, {
      variant: ModalVariant.medium,
      title: t("partialImport"),
      isOpen: props.open,
      onClose: props.toggleDialog,
      actions: [
        /* @__PURE__ */ React.createElement(Button, {
          id: "modal-close",
          "data-testid": "close-button",
          key: "close",
          variant: ButtonVariant.primary,
          onClick: () => {
            props.toggleDialog();
          }
        }, t("common:close"))
      ]
    }, /* @__PURE__ */ React.createElement(Alert, {
      variant: "success",
      isInline: true,
      title: importCompleteMessage()
    }), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
      loader,
      isPaginated: true,
      ariaLabelKey: "realm-settings:partialImport",
      columns: [
        {
          name: "action",
          displayKey: "common:action",
          cellRenderer: ActionLabel
        },
        {
          name: "resourceType",
          displayKey: "common:type",
          cellRenderer: TypeRenderer
        },
        {
          name: "resourceName",
          displayKey: "common:name"
        },
        {
          name: "id",
          displayKey: "common:id"
        }
      ]
    }));
  };
  if (!importResponse) {
    return importModal();
  }
  return importCompletedModal();
};
