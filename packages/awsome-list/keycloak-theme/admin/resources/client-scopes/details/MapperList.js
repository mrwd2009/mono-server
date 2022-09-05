import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {Dropdown, DropdownItem, DropdownToggle} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CaretDownIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {AddMapperDialog} from "../add/MapperDialog.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
export const MapperList = ({
  model,
  onAdd,
  onDelete,
  detailLink
}) => {
  const {t} = useTranslation("client-scopes");
  const [mapperAction, setMapperAction] = useState(false);
  const mapperList = model.protocolMappers;
  const mapperTypes = useServerInfo().protocolMapperTypes[model.protocol];
  const [key, setKey] = useState(0);
  useEffect(() => setKey(key + 1), [mapperList]);
  const [addMapperDialogOpen, setAddMapperDialogOpen] = useState(false);
  const [filter, setFilter] = useState(model.protocolMappers);
  const toggleAddMapperDialog = (buildIn) => {
    if (buildIn) {
      setFilter(mapperList || []);
    } else {
      setFilter(void 0);
    }
    setAddMapperDialogOpen(!addMapperDialogOpen);
  };
  const loader = async () => {
    if (!mapperList) {
      return [];
    }
    const list = mapperList.reduce((rows, mapper) => {
      const mapperType = mapperTypes.find(({id}) => id === mapper.protocolMapper);
      if (!mapperType) {
        return rows;
      }
      return rows.concat({
        ...mapper,
        category: mapperType.category,
        type: mapperType.name,
        priority: mapperType.priority
      });
    }, []);
    return list.sort((a, b) => a.priority - b.priority);
  };
  const MapperLink = ({id, name}) => /* @__PURE__ */ React.createElement(Link, {
    to: detailLink(id)
  }, name);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AddMapperDialog, {
    protocol: model.protocol,
    filter,
    onConfirm: onAdd,
    open: addMapperDialogOpen,
    toggleDialog: () => setAddMapperDialogOpen(!addMapperDialogOpen)
  }), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    ariaLabelKey: "client-scopes:clientScopeList",
    searchPlaceholderKey: "common:searchForMapper",
    toolbarItem: /* @__PURE__ */ React.createElement(Dropdown, {
      onSelect: () => setMapperAction(false),
      toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
        isPrimary: true,
        id: "mapperAction",
        onToggle: () => setMapperAction(!mapperAction),
        toggleIndicator: CaretDownIcon
      }, t("common:addMapper")),
      isOpen: mapperAction,
      dropdownItems: [
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "predefined",
          onClick: () => toggleAddMapperDialog(true)
        }, t("fromPredefinedMapper")),
        /* @__PURE__ */ React.createElement(DropdownItem, {
          key: "byConfiguration",
          onClick: () => toggleAddMapperDialog(false)
        }, t("byConfiguration"))
      ]
    }),
    actions: [
      {
        title: t("common:delete"),
        onRowClick: onDelete
      }
    ],
    columns: [
      {
        name: "name",
        cellRenderer: MapperLink
      },
      {name: "category"},
      {
        name: "type"
      },
      {
        name: "priority"
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("common:emptyMappers"),
      instructions: t("common:emptyMappersInstructions"),
      secondaryActions: [
        {
          text: t("common:emptyPrimaryAction"),
          onClick: () => toggleAddMapperDialog(true)
        },
        {
          text: t("emptySecondaryAction"),
          onClick: () => toggleAddMapperDialog(false)
        }
      ]
    })
  }));
};
