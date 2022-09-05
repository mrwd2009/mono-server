import React, {Children, isValidElement, useState} from "../../_snowpack/pkg/react.js";
import {useHistory, useRouteMatch} from "../../_snowpack/pkg/react-router-dom.js";
import {Tabs} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {useConfirmDialog} from "../confirm-dialog/ConfirmDialog.js";
const createUrl = (path, params) => {
  let url = path;
  for (const key in params) {
    const value = params[key];
    if (url.includes(key)) {
      url = url.replace(new RegExp(`:${key}\\??`), value || "");
    }
  }
  return url;
};
export const KeycloakTabs = ({
  paramName = "tab",
  children,
  ...rest
}) => {
  const match = useRouteMatch();
  const params = match.params;
  const history = useHistory();
  const form = useFormContext();
  const [key, setKey] = useState("");
  const firstTab = Children.toArray(children)[0];
  const tab = params[paramName] || isValidElement(firstTab) && firstTab.props.eventKey || "";
  const pathIndex = match.path.indexOf(paramName) + paramName.length;
  const path = match.path.substr(0, pathIndex);
  const [toggleChangeTabDialog, ChangeTabConfirm] = useConfirmDialog({
    titleKey: "common:leaveDirtyTitle",
    messageKey: "common:leaveDirtyConfirm",
    continueButtonLabel: "common:leave",
    onConfirm: () => {
      form.reset();
      history.push(createUrl(path, {...params, [paramName]: key}));
    }
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ChangeTabConfirm, null), /* @__PURE__ */ React.createElement(Tabs, {
    inset: {
      default: "insetNone",
      md: "insetSm",
      xl: "inset2xl",
      "2xl": "insetLg"
    },
    activeKey: tab,
    onSelect: (_, key2) => {
      if (form?.formState.isDirty) {
        setKey(key2);
        toggleChangeTabDialog();
      } else {
        history.push(createUrl(path, {...params, [paramName]: key2}));
      }
    },
    ...rest
  }, children));
};
