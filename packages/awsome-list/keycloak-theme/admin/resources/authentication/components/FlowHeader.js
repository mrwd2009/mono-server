import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  DataListItem,
  DataListItemRow,
  DataListDragButton,
  DataListItemCells,
  DataListCell
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import "./flow-header.css.proxy.js";
export const FlowHeader = () => {
  const {t} = useTranslation("authentication");
  return /* @__PURE__ */ React.createElement(DataListItem, {
    "aria-labelledby": "headerName",
    id: "header"
  }, /* @__PURE__ */ React.createElement(DataListItemRow, null, /* @__PURE__ */ React.createElement(DataListDragButton, {
    className: "keycloak__authentication__header-drag-button",
    "aria-label": t("common:disabled")
  }), /* @__PURE__ */ React.createElement(DataListItemCells, {
    className: "keycloak__authentication__header",
    dataListCells: [
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: "step",
        id: "headerName"
      }, t("steps")),
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: "requirement"
      }, t("requirement")),
      /* @__PURE__ */ React.createElement(DataListCell, {
        key: "config"
      })
    ]
  })));
};
