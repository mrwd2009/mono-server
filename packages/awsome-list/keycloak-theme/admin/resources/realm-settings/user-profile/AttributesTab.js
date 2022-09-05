import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  ButtonVariant,
  Divider,
  Select,
  SelectOption,
  SelectVariant,
  Toolbar,
  ToolbarContent,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FilterIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {DraggableTable} from "../../authentication/components/DraggableTable.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {toAddAttribute} from "../routes/AddAttribute.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useUserProfile} from "./UserProfileContext.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {toAttribute} from "../routes/Attribute.js";
import useToggle from "../../utils/useToggle.js";
const RESTRICTED_ATTRIBUTES = ["username", "email"];
export const AttributesTab = () => {
  const {config, save} = useUserProfile();
  const {realm: realmName} = useRealm();
  const {t} = useTranslation("realm-settings");
  const history = useHistory();
  const [filter, setFilter] = useState("allGroups");
  const [isFilterTypeDropdownOpen, toggleIsFilterTypeDropdownOpen] = useToggle();
  const [data, setData] = useState(config?.attributes);
  const [attributeToDelete, setAttributeToDelete] = useState("");
  const executeMove = async (attribute, newIndex) => {
    const fromIndex = config?.attributes.findIndex((attr) => {
      return attr.name === attribute.name;
    });
    let movedAttribute = {};
    movedAttribute = config?.attributes[fromIndex];
    config?.attributes.splice(fromIndex, 1);
    config?.attributes.splice(newIndex, 0, movedAttribute);
    save({attributes: config?.attributes}, {
      successMessageKey: "realm-settings:updatedUserProfileSuccess",
      errorMessageKey: "realm-settings:updatedUserProfileError"
    });
  };
  const updatedAttributes = config?.attributes.filter((attribute) => attribute.name !== attributeToDelete);
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: t("deleteAttributeConfirmTitle"),
    messageKey: t("deleteAttributeConfirm", {
      attributeName: attributeToDelete
    }),
    continueButtonLabel: t("common:delete"),
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      save({attributes: updatedAttributes}, {
        successMessageKey: "realm-settings:deleteAttributeSuccess",
        errorMessageKey: "realm-settings:deleteAttributeError"
      });
      setAttributeToDelete("");
    }
  });
  const cellFormatter = (row) => /* @__PURE__ */ React.createElement(Link, {
    to: toAttribute({
      realm: realmName,
      attributeName: row.name
    }),
    key: row.name
  }, row.name);
  if (!config?.attributes) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(ToolbarContent, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Select, {
    width: 200,
    "data-testid": "filter-select",
    isOpen: isFilterTypeDropdownOpen,
    variant: SelectVariant.single,
    onToggle: toggleIsFilterTypeDropdownOpen,
    toggleIcon: /* @__PURE__ */ React.createElement(FilterIcon, null),
    onSelect: (_, value) => {
      const filter2 = value.toString();
      setFilter(filter2);
      setData(filter2 === "allGroups" ? config.attributes : config.attributes?.filter((attr) => attr.group === filter2));
      toggleIsFilterTypeDropdownOpen();
    },
    selections: filter === "allGroups" ? t(filter) : filter
  }, [
    /* @__PURE__ */ React.createElement(SelectOption, {
      key: "allGroups",
      "data-testid": "all-groups",
      value: "allGroups"
    }, t("allGroups")),
    ...config.attributes.filter((attr) => !!attr.group).map((attr) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: attr.group,
      "data-testid": `${attr.group}-option`,
      value: attr.group
    }))
  ])), /* @__PURE__ */ React.createElement(ToolbarItem, {
    className: "kc-toolbar-attributesTab"
  }, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "createAttributeBtn",
    variant: "primary",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toAddAttribute({realm: realmName})
    })
  }, t("createAttribute"))))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(DraggableTable, {
    keyField: "name",
    onDragFinish: async (nameDragged, items) => {
      const keys = config.attributes.map((e) => e.name);
      const newIndex = items.indexOf(nameDragged);
      const oldIndex = keys.indexOf(nameDragged);
      const dragged = config.attributes[oldIndex];
      if (!dragged.name)
        return;
      executeMove(dragged, newIndex);
    },
    actions: [
      {
        title: t("common:edit"),
        onClick: (_key, _idx, component) => {
          history.push(toAttribute({
            realm: realmName,
            attributeName: component.name
          }));
        }
      },
      {
        title: t("common:delete"),
        isActionable: ({name}) => !RESTRICTED_ATTRIBUTES.includes(name),
        onClick: (_key, _idx, component) => {
          setAttributeToDelete(component.name);
          toggleDeleteDialog();
        }
      }
    ],
    columns: [
      {
        name: "name",
        displayKey: t("attributeName"),
        cellRenderer: cellFormatter
      },
      {
        name: "displayName",
        displayKey: t("attributeDisplayName")
      },
      {
        name: "group",
        displayKey: t("attributeGroup")
      }
    ],
    data: data || config.attributes
  }));
};
