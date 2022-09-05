import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  FormGroup,
  NumberInput,
  PageSection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {TimeSelector} from "../../components/time-selector/TimeSelector.js";
import {Link, useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {AccessTokenDialog} from "./AccessTokenDialog.js";
import {toClients} from "../routes/Clients.js";
export default function CreateInitialAccessToken() {
  const {t} = useTranslation("clients");
  const {
    handleSubmit,
    control,
    formState: {isValid, errors}
  } = useForm({mode: "onChange"});
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert, addError} = useAlerts();
  const history = useHistory();
  const [token, setToken] = useState("");
  const save = async (clientToken) => {
    try {
      const access = await adminClient.realms.createClientsInitialAccess({realm}, clientToken);
      setToken(access.token);
    } catch (error) {
      addError("clients:tokenSaveError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, token && /* @__PURE__ */ React.createElement(AccessTokenDialog, {
    token,
    toggleDialog: () => {
      setToken("");
      addAlert(t("tokenSaveSuccess"), AlertVariant.success);
      history.push(toClients({realm, tab: "initial-access-token"}));
    }
  }), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "clients:createToken",
    subKey: "clients-help:createToken"
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "create-client",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("expiration"),
    fieldId: "expiration",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:expiration",
      fieldLabelId: "clients:expiration"
    }),
    helperTextInvalid: t("expirationValueNotValid"),
    validated: errors.expiration ? "error" : "default"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "expiration",
    defaultValue: 86400,
    control,
    rules: {min: 1},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TimeSelector, {
      "data-testid": "expiration",
      value,
      onChange,
      min: 1,
      validated: errors.expiration ? "error" : "default"
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("count"),
    fieldId: "count",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:count",
      fieldLabelId: "clients:count"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "count",
    defaultValue: 1,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(NumberInput, {
      "data-testid": "count",
      inputName: "count",
      inputAriaLabel: t("count"),
      min: 1,
      value,
      onPlus: () => onChange(value + 1),
      onMinus: () => onChange(value - 1),
      onChange: (event) => {
        const value2 = Number(event.target.value);
        onChange(value2 < 1 ? 1 : value2);
      }
    })
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "save",
    isDisabled: !isValid
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "cancel",
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toClients({realm, tab: "initial-access-token"})
    })
  }, t("common:cancel"))))));
}
