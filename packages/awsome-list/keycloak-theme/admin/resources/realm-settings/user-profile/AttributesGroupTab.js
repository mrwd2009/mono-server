import {
  Button,
  ButtonVariant,
  PageSection,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {Trans, useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toEditAttributesGroup} from "../routes/EditAttributesGroup.js";
import {toNewAttributesGroup} from "../routes/NewAttributesGroup.js";
import {useUserProfile} from "./UserProfileContext.js";
export const AttributesGroupTab = () => {
  const {config, save} = useUserProfile();
  const {t} = useTranslation("attributes-group");
  const history = useHistory();
  const {realm} = useRealm();
  const [key, setKey] = useState(0);
  const [groupToDelete, setGroupToDelete] = useState();
  useEffect(() => setKey((value) => value + 1), [config]);
  async function loader() {
    return config?.groups ?? [];
  }
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "attributes-group:deleteDialogTitle",
    children: /* @__PURE__ */ React.createElement(Trans, {
      i18nKey: "attributes-group:deleteDialogDescription"
    }, " ", /* @__PURE__ */ React.createElement("strong", null, {group: groupToDelete?.name}), "."),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm() {
      const groups = (config?.groups ?? []).filter((group) => group !== groupToDelete);
      save({...config, groups}, {
        successMessageKey: "attributes-group:deleteSuccess",
        errorMessageKey: "attributes-group:deleteError"
      });
    }
  });
  function deleteAttributeGroup(group) {
    setGroupToDelete(group);
    toggleDeleteDialog();
  }
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    key,
    loader,
    ariaLabelKey: "attributes-group:tableTitle",
    toolbarItem: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      component: (props) => /* @__PURE__ */ React.createElement(Link, {
        ...props,
        to: toNewAttributesGroup({realm})
      })
    }, t("createGroupText"))),
    columns: [
      {
        name: "name",
        displayKey: "attributes-group:columnName",
        cellRenderer: (group) => /* @__PURE__ */ React.createElement(Link, {
          to: toEditAttributesGroup({realm, name: group.name})
        }, group.name)
      },
      {
        name: "displayHeader",
        displayKey: "attributes-group:columnDisplayName"
      },
      {
        name: "displayDescription",
        displayKey: "attributes-group:columnDisplayDescription"
      }
    ],
    actions: [
      {
        title: t("common:delete"),
        onRowClick: deleteAttributeGroup
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("emptyStateMessage"),
      instructions: t("emptyStateInstructions"),
      primaryActionText: t("createGroupText"),
      onPrimaryAction: () => history.push(toNewAttributesGroup({realm}))
    })
  }));
};
