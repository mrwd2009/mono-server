import React, {useState} from "../_snowpack/pkg/react.js";
import {omit} from "../_snowpack/pkg/lodash-es.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  FormGroup,
  Label,
  PageSection,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {Divider, Flex, FlexItem, Radio, Title} from "../_snowpack/pkg/@patternfly/react-core.js";
import {CodeEditor, Language} from "../_snowpack/pkg/@patternfly/react-code-editor.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useConfirmDialog} from "../components/confirm-dialog/ConfirmDialog.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {prettyPrintJSON} from "../util.js";
import {Link} from "../_snowpack/pkg/react-router-dom.js";
import {toAddClientProfile} from "./routes/AddClientProfile.js";
import {toClientProfile} from "./routes/ClientProfile.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
import "./realm-settings-section.css.proxy.js";
export default function ProfilesTab() {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const [tableProfiles, setTableProfiles] = useState();
  const [globalProfiles, setGlobalProfiles] = useState();
  const [selectedProfile, setSelectedProfile] = useState();
  const [show, setShow] = useState(false);
  const [code, setCode] = useState();
  const [key, setKey] = useState(0);
  useFetch(() => adminClient.clientPolicies.listProfiles({
    includeGlobalProfiles: true
  }), (allProfiles) => {
    setGlobalProfiles(allProfiles.globalProfiles);
    const globalProfiles2 = allProfiles.globalProfiles?.map((globalProfiles3) => ({
      ...globalProfiles3,
      global: true
    }));
    const profiles = allProfiles.profiles?.map((profiles2) => ({
      ...profiles2,
      global: false
    }));
    const allClientProfiles = globalProfiles2?.concat(profiles ?? []);
    setTableProfiles(allClientProfiles || []);
    setCode(JSON.stringify(allClientProfiles, null, 2));
  }, [key]);
  const loader = async () => tableProfiles ?? [];
  const normalizeProfile = (profile) => omit(profile, "global");
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteClientProfileConfirmTitle"),
    messageKey: t("deleteClientProfileConfirm", {
      profileName: selectedProfile?.name
    }),
    continueButtonLabel: t("delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      const updatedProfiles = tableProfiles?.filter((profile) => profile.name !== selectedProfile?.name && !profile.global).map((profile) => normalizeProfile(profile));
      try {
        await adminClient.clientPolicies.createProfiles({
          profiles: updatedProfiles,
          globalProfiles
        });
        addAlert(t("deleteClientSuccess"), AlertVariant.success);
        setKey(key + 1);
      } catch (error) {
        addError(t("deleteClientError"), error);
      }
    }
  });
  const cellFormatter = (row) => /* @__PURE__ */ React.createElement(Link, {
    to: toClientProfile({
      realm,
      profileName: row.name
    }),
    key: row.name
  }, row.name, " ", row.global && /* @__PURE__ */ React.createElement(Label, {
    color: "blue"
  }, t("global")));
  if (!tableProfiles) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const save = async () => {
    if (!code) {
      return;
    }
    try {
      const obj = JSON.parse(code);
      const changedProfiles = obj.filter((profile) => !profile.global).map((profile) => normalizeProfile(profile));
      const changedGlobalProfiles = obj.filter((profile) => profile.global).map((profile) => normalizeProfile(profile));
      try {
        await adminClient.clientPolicies.createProfiles({
          profiles: changedProfiles,
          globalProfiles: changedGlobalProfiles
        });
        addAlert(t("realm-settings:updateClientProfilesSuccess"), AlertVariant.success);
        setKey(key + 1);
      } catch (error) {
        addError("realm-settings:updateClientProfilesError", error);
      }
    } catch (error) {
      console.warn("Invalid json, ignoring value using {}");
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(Flex, {
    className: "kc-profiles-config-section"
  }, /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "md"
  }, t("profilesConfigType"))), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    isChecked: !show,
    name: "profilesView",
    onChange: () => setShow(false),
    label: t("profilesConfigTypes.formView"),
    id: "formView-profilesView",
    className: "kc-form-radio-btn pf-u-mr-sm pf-u-ml-sm",
    "data-testid": "formView-profilesView"
  })), /* @__PURE__ */ React.createElement(FlexItem, null, /* @__PURE__ */ React.createElement(Radio, {
    isChecked: show,
    name: "profilesView",
    onChange: () => setShow(true),
    label: t("profilesConfigTypes.jsonEditor"),
    id: "jsonEditor-profilesView",
    className: "kc-editor-radio-btn",
    "data-testid": "jsonEditor-profilesView"
  })))), /* @__PURE__ */ React.createElement(Divider, null), !show ? /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key: tableProfiles.length,
    ariaLabelKey: "realm-settings:profiles",
    searchPlaceholderKey: "realm-settings:clientProfileSearch",
    loader,
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      id: "createProfile",
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toAddClientProfile({realm, tab: "profiles"})
      }),
      "data-testid": "createProfile"
    }, t("createClientProfile"))),
    isRowDisabled: (value) => value.global,
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (profile) => {
          setSelectedProfile(profile);
          toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "name",
        displayKey: t("common:name"),
        cellRenderer: cellFormatter
      },
      {
        name: "description",
        displayKey: t("clientProfileDescription")
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("emptyClientProfiles"),
      instructions: t("emptyClientProfilesInstructions")
    })
  }) : /* @__PURE__ */ React.createElement(FormGroup, {
    fieldId: "jsonEditor"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md pf-u-ml-lg"
  }, /* @__PURE__ */ React.createElement(CodeEditor, {
    isLineNumbersVisible: true,
    isLanguageLabelVisible: true,
    isReadOnly: false,
    code,
    language: Language.json,
    height: "30rem",
    onChange: (value) => {
      setCode(value ?? "");
    }
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.primary,
    className: "pf-u-mr-md pf-u-ml-lg",
    onClick: save,
    "data-testid": "jsonEditor-saveBtn"
  }, t("save")), /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.link,
    onClick: () => {
      setCode(prettyPrintJSON(tableProfiles));
    },
    "data-testid": "jsonEditor-reloadBtn"
  }, t("reload"))))));
}
