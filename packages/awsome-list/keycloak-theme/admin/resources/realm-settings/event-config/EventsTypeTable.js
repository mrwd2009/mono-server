import React, {Fragment} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Button, ToolbarItem} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
export function EventsTypeTable({
  loader,
  addTypes,
  onSelect,
  onDelete
}) {
  const {t} = useTranslation("realm-settings");
  const DescriptionCell = (event) => /* @__PURE__ */ React.createElement(Fragment, {
    key: event.id
  }, t(`eventTypes.${event.id}.description`));
  return /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    ariaLabelKey: "userEventsRegistered",
    searchPlaceholderKey: "realm-settings:searchEventType",
    loader,
    onSelect: onSelect ? onSelect : void 0,
    canSelectAll: !!onSelect,
    toolbarItem: addTypes && /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Button, {
      id: "addTypes",
      onClick: addTypes,
      "data-testid": "addTypes"
    }, t("addSavedTypes"))),
    actions: !onDelete ? [] : [
      {
        title: t("common:delete"),
        onRowClick: onDelete
      }
    ],
    columns: [
      {
        name: "id",
        displayKey: "realm-settings:eventType",
        cellFormatters: [
          (data) => t(`eventTypes.${data}.name`)
        ]
      },
      {
        name: "description",
        displayKey: "description",
        cellRenderer: DescriptionCell
      }
    ],
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      message: t("emptyEvents"),
      instructions: t("emptyEventsInstructions")
    })
  });
}
