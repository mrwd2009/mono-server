import React from "../../_snowpack/pkg/react.js";
import {
  AlertGroup,
  Alert,
  AlertActionCloseButton,
  AlertVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
export function AlertPanel({alerts, onCloseAlert}) {
  return /* @__PURE__ */ React.createElement(AlertGroup, {
    isToast: true
  }, alerts.map(({id, variant, message, description}) => /* @__PURE__ */ React.createElement(Alert, {
    key: id,
    isLiveRegion: true,
    variant: AlertVariant[variant],
    variantLabel: "",
    title: message,
    actionClose: /* @__PURE__ */ React.createElement(AlertActionCloseButton, {
      title: message,
      onClose: () => onCloseAlert(id)
    }),
    timeout: true,
    onTimeout: () => onCloseAlert(id)
  }, description && /* @__PURE__ */ React.createElement("p", null, description))));
}
