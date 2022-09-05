import React, {useState} from "../../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams, useRouteMatch} from "../../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  ToolbarItem
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakDataTable} from "../../../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../../../components/list-empty-state/ListEmptyState.js";
import {useAlerts} from "../../../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {useConfirmDialog} from "../../../components/confirm-dialog/ConfirmDialog.js";
import useLocaleSort, {mapByKey} from "../../../utils/useLocaleSort.js";
export const LdapMapperList = () => {
  const history = useHistory();
  const {t} = useTranslation("user-federation");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {url} = useRouteMatch();
  const [key, setKey] = useState(0);
  const refresh = () => setKey(key + 1);
  const [mappers, setMappers] = useState([]);
  const localeSort = useLocaleSort();
  const {id} = useParams();
  const [selectedMapper, setSelectedMapper] = useState();
  useFetch(() => adminClient.components.find({
    parent: id,
    type: "org.keycloak.storage.ldap.mappers.LDAPStorageMapper"
  }), (mapper) => {
    setMappers(localeSort(mapper.map((mapper2) => ({
      ...mapper2,
      name: mapper2.name,
      type: mapper2.providerId
    })), mapByKey("name")));
  }, [key]);
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("common:deleteMappingTitle", {mapperId: selectedMapper?.id}),
    messageKey: "common:deleteMappingConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.components.del({
          id: selectedMapper.id
        });
        refresh();
        addAlert(t("common:mappingDeletedSuccess"), AlertVariant.success);
        setSelectedMapper(void 0);
      } catch (error) {
        addError("common:mappingDeletedError", error);
      }
    }
  });
  const getUrl = (url2) => {
    if (!url2.includes("/mappers")) {
      return `${url2}/mappers`;
    }
    return `${url2}`;
  };
  const MapperLink = (mapper) => /* @__PURE__ */ React.createElement(Link, {
    to: `${getUrl(url)}/${mapper.id}`
  }, mapper.name);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader: mappers,
    ariaLabelKey: "ldapMappersList",
    searchPlaceholderKey: "common:searchForMapper",
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "add-mapper-btn",
      variant: "primary",
      onClick: () => history.push(`${url}/new`)
    }, t("common:addMapper"))),
    actions: [
      {
        title: t("common:delete"),
        onRowClick: (mapper) => {
          setSelectedMapper(mapper);
          toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "name",
        cellRenderer: MapperLink
      },
      {
        name: "type"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("common:emptyMappers"),
      instructions: t("common:emptyMappersInstructions"),
      primaryActionText: t("common:emptyPrimaryAction"),
      onPrimaryAction: () => history.push(`${url}/new`)
    })
  }));
};
