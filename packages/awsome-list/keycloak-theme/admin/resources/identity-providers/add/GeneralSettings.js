import React from "../../_snowpack/pkg/react.js";
import {RedirectUrl} from "../component/RedirectUrl.js";
import {ClientIdSecret} from "../component/ClientIdSecret.js";
import {DisplayOrder} from "../component/DisplayOrder.js";
export const GeneralSettings = ({
  create = true,
  id
}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(RedirectUrl, {
  id
}), /* @__PURE__ */ React.createElement(ClientIdSecret, {
  create
}), /* @__PURE__ */ React.createElement(DisplayOrder, null));
