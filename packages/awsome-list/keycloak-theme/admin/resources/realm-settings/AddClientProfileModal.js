import React, {useState} from "../_snowpack/pkg/react.js";
import {Button, Label, Modal, ModalVariant} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useFetch, useAdminClient} from "../context/auth/AdminClient.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakSpinner} from "../components/keycloak-spinner/KeycloakSpinner.js";
export const AddClientProfileModal = (props) => {
  const {t} = useTranslation("roles");
  const {adminClient} = useAdminClient();
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableProfiles, setTableProfiles] = useState();
  useFetch(() => adminClient.clientPolicies.listProfiles({
    includeGlobalProfiles: true
  }), (allProfiles) => {
    const globalProfiles = allProfiles.globalProfiles?.map((globalProfiles2) => ({
      ...globalProfiles2,
      global: true
    }));
    const profiles = allProfiles.profiles?.map((profiles2) => ({
      ...profiles2,
      global: false
    }));
    setTableProfiles([...globalProfiles ?? [], ...profiles ?? []]);
  }, []);
  const loader = async () => tableProfiles?.filter((item) => !props.allProfiles.includes(item.name)) ?? [];
  if (!tableProfiles) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  const AliasRenderer = ({name, global}) => /* @__PURE__ */ React.createElement(React.Fragment, null, name, " ", global && /* @__PURE__ */ React.createElement(Label, {
    color: "blue"
  }, t("realm-settings:global")));
  return /* @__PURE__ */ React.createElement(Modal, {
    "data-testid": "addClientProfile",
    title: t("realm-settings:addClientProfile"),
    isOpen: props.open,
    onClose: props.toggleDialog,
    variant: ModalVariant.large,
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        key: "add",
        "data-testid": "add-client-profile-button",
        variant: "primary",
        isDisabled: !selectedRows.length,
        onClick: () => {
          props.toggleDialog();
          props.onConfirm(selectedRows);
        }
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        key: "cancel",
        variant: "link",
        onClick: () => {
          props.toggleDialog();
        }
      }, t("common:cancel"))
    ]
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    loader,
    ariaLabelKey: "realm-settings:profilesList",
    searchPlaceholderKey: "realm-settings:searchProfile",
    canSelectAll: true,
    onSelect: (rows) => {
      setSelectedRows([...rows]);
    },
    columns: [
      {
        name: "name",
        displayKey: "realm-settings:clientProfileName",
        cellRenderer: AliasRenderer
      },
      {
        name: "description",
        displayKey: "common:description"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noRoles"),
      instructions: t("noRolesInstructions"),
      primaryActionText: t("createRole")
    })
  }));
};
