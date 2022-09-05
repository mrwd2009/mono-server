import React, {createContext, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {AlertVariant} from "../../_snowpack/pkg/@patternfly/react-core.js";
import axios from "../../_snowpack/pkg/axios.js";
import useRequiredContext from "../../utils/useRequiredContext.js";
import {AlertPanel} from "./AlertPanel.js";
export const AlertContext = createContext(void 0);
export const useAlerts = () => useRequiredContext(AlertContext);
export const AlertProvider = ({children}) => {
  const {t} = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const hideAlert = (id) => {
    setAlerts((alerts2) => alerts2.filter((alert) => alert.id !== id));
  };
  const addAlert = (message, variant = AlertVariant.success, description) => {
    setAlerts([
      {
        id: Math.random(),
        message,
        variant,
        description
      },
      ...alerts
    ]);
  };
  const addError = (message, error) => {
    addAlert(t(message, {
      error: getErrorMessage(error)
    }), AlertVariant.danger);
  };
  return /* @__PURE__ */ React.createElement(AlertContext.Provider, {
    value: {addAlert, addError}
  }, /* @__PURE__ */ React.createElement(AlertPanel, {
    alerts,
    onCloseAlert: hideAlert
  }), children);
};
function getErrorMessage(error) {
  if (typeof error === "string") {
    return error;
  }
  if (!axios.isAxiosError(error)) {
    return error.message;
  }
  const responseData = error.response?.data ?? {};
  for (const key of ["error_description", "errorMessage", "error"]) {
    const value = responseData[key];
    if (typeof value === "string") {
      return value;
    }
  }
  return error.message;
}
