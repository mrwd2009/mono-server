import React, {useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  AlertVariant,
  Button,
  ButtonVariant,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  InputGroup,
  PageSection,
  TextInput,
  Toolbar,
  ToolbarGroup,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {SearchIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {Link, useRouteMatch} from "../../_snowpack/pkg/react-router-dom.js";
import {KEY_PROVIDER_TYPE} from "../../util.js";
import {DraggableTable} from "../../authentication/components/DraggableTable.js";
import {KeyProviderModal} from "./key-providers/KeyProviderModal.js";
import useToggle from "../../utils/useToggle.js";
import "../realm-settings-section.css.proxy.js";
export const KeysProvidersTab = ({
  realmComponents,
  refresh
}) => {
  const {t} = useTranslation("realm-settings");
  const {addAlert, addError} = useAlerts();
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {url} = useRouteMatch();
  const [searchVal, setSearchVal] = useState("");
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [isCreateModalOpen, handleModalToggle] = useToggle();
  const serverInfo = useServerInfo();
  const keyProviderComponentTypes = serverInfo.componentTypes?.[KEY_PROVIDER_TYPE] ?? [];
  const providerTypes = keyProviderComponentTypes.map((item) => item.id);
  const [providerDropdownOpen, setProviderDropdownOpen] = useState(false);
  const [defaultConsoleDisplayName, setDefaultConsoleDisplayName] = useState();
  const [selectedComponent, setSelectedComponent] = useState();
  const components = useMemo(() => realmComponents.map((component) => {
    const provider = keyProviderComponentTypes.find((componentType) => component.providerId === componentType.id);
    return {
      ...component,
      providerDescription: provider?.helpText
    };
  }), [realmComponents]);
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "realm-settings:deleteProviderTitle",
    messageKey: t("deleteProviderConfirm", {
      provider: selectedComponent?.name
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.components.del({
          id: selectedComponent.id,
          realm
        });
        refresh();
        addAlert(t("deleteProviderSuccess"), AlertVariant.success);
      } catch (error) {
        addError("realm-settings:deleteProviderError", error);
      }
    }
  });
  const onSearch = () => {
    if (searchVal !== "") {
      setSearchVal(searchVal);
      const filteredComponents2 = components.filter((component) => component.name?.includes(searchVal) || component.providerId?.includes(searchVal));
      setFilteredComponents(filteredComponents2);
    } else {
      setSearchVal("");
      setFilteredComponents(components);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  const handleInputChange = (value) => {
    setSearchVal(value);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, isCreateModalOpen && defaultConsoleDisplayName && /* @__PURE__ */ React.createElement(KeyProviderModal, {
    providerType: defaultConsoleDisplayName,
    onClose: () => {
      handleModalToggle();
      refresh();
    }
  }), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    padding: {default: "noPadding"}
  }, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(ToolbarGroup, {
    className: "providers-toolbar"
  }, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(TextInput, {
    name: "inputGroupName",
    id: "inputGroupName",
    "data-testid": "provider-search-input",
    type: "search",
    "aria-label": t("common:search"),
    placeholder: t("common:search"),
    onChange: handleInputChange,
    onKeyDown: handleKeyDown
  }), /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.control,
    "aria-label": t("common:search"),
    onClick: onSearch
  }, /* @__PURE__ */ React.createElement(SearchIcon, null)))), /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Dropdown, {
    "data-testid": "addProviderDropdown",
    className: "add-provider-dropdown",
    isOpen: providerDropdownOpen,
    toggle: /* @__PURE__ */ React.createElement(DropdownToggle, {
      onToggle: (val) => setProviderDropdownOpen(val),
      isPrimary: true
    }, t("addProvider")),
    dropdownItems: [
      providerTypes.map((item) => /* @__PURE__ */ React.createElement(DropdownItem, {
        onClick: () => {
          handleModalToggle();
          setProviderDropdownOpen(false);
          setDefaultConsoleDisplayName(item);
        },
        "data-testid": `option-${item}`,
        key: item
      }, item))
    ]
  })))), /* @__PURE__ */ React.createElement(DraggableTable, {
    variant: "compact",
    className: "kc-draggable-table",
    keyField: "id",
    data: filteredComponents.length === 0 ? components : filteredComponents,
    onDragFinish: async (_, itemOrder) => {
      const updateAll = components.map((component) => {
        const componentToSave = {...component};
        delete componentToSave.providerDescription;
        return adminClient.components.update({id: component.id}, {
          ...componentToSave,
          config: {
            priority: [
              (itemOrder.length - itemOrder.indexOf(component.id) + 100).toString()
            ]
          }
        });
      });
      try {
        await Promise.all(updateAll);
        refresh();
        addAlert(t("saveProviderListSuccess"), AlertVariant.success);
      } catch (error) {
        addError("realm-settings:saveProviderError", error);
      }
    },
    columns: [
      {
        name: "name",
        displayKey: "realm-settings:name",
        cellRenderer: (component) => /* @__PURE__ */ React.createElement(Link, {
          key: component.name,
          "data-testid": "provider-name-link",
          to: `${url}/${component.id}/${component.providerId}/settings`
        }, component.name)
      },
      {
        name: "providerId",
        displayKey: "realm-settings:provider"
      },
      {
        name: "providerDescription",
        displayKey: "realm-settings:providerDescription"
      }
    ],
    actions: [
      {
        title: t("common:delete"),
        onClick: (_key, _idx, component) => {
          setSelectedComponent(component);
          toggleDeleteDialog();
        }
      }
    ]
  })));
};
