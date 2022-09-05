import React, {useEffect, useRef} from "../../_snowpack/pkg/react.js";
import {Link} from "../../_snowpack/pkg/react-router-dom.js";
import {Trans, useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  InputGroup,
  Button,
  ActionGroup,
  Tooltip,
  Text
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {parseResult} from "../AdvancedTab.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toClient} from "../routes/Client.js";
import useFormatDate, {FORMAT_DATE_AND_TIME} from "../../utils/useFormatDate.js";
export const RevocationPanel = ({
  save,
  client: {id, adminUrl, access}
}) => {
  const revocationFieldName = "notBefore";
  const pushRevocationButtonRef = useRef();
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const {addAlert} = useAlerts();
  const formatDate = useFormatDate();
  const {getValues, setValue, register} = useFormContext();
  const setNotBefore = (time, messageKey) => {
    setValue(revocationFieldName, time);
    save({messageKey});
  };
  useEffect(() => {
    register(revocationFieldName);
  }, [register]);
  const getNotBeforeValue = () => {
    const date = getValues(revocationFieldName);
    if (date > 0) {
      return formatDate(new Date(date * 1e3), FORMAT_DATE_AND_TIME);
    } else {
      return t("common:none");
    }
  };
  const push = async () => {
    const result = await adminClient.clients.pushRevocation({
      id
    });
    parseResult(result, "notBeforePush", addAlert, t);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Text, {
    className: "pf-u-pb-lg"
  }, /* @__PURE__ */ React.createElement(Trans, {
    i18nKey: "clients-help:notBeforeIntro"
  }, "In order to successfully push setup url on", /* @__PURE__ */ React.createElement(Link, {
    to: toClient({realm, clientId: id, tab: "settings"})
  }, t("settings")), "tab")), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-clients",
    fineGrainedAccess: access?.configure,
    isHorizontal: true
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("notBefore"),
    fieldId: "kc-not-before",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:notBefore",
      fieldLabelId: "clients:notBefore"
    })
  }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "kc-not-before",
    name: "notBefore",
    isReadOnly: true,
    value: getNotBeforeValue()
  }), /* @__PURE__ */ React.createElement(Button, {
    id: "setToNow",
    variant: "control",
    onClick: () => {
      setNotBefore(Date.now() / 1e3, "notBeforeSetToNow");
    }
  }, t("setToNow")), /* @__PURE__ */ React.createElement(Button, {
    id: "clear",
    variant: "control",
    onClick: () => {
      setNotBefore(0, "notBeforeNowClear");
    }
  }, t("clear")))), /* @__PURE__ */ React.createElement(ActionGroup, null, !adminUrl && /* @__PURE__ */ React.createElement(Tooltip, {
    reference: pushRevocationButtonRef,
    content: t("clients-help:notBeforeTooltip")
  }), /* @__PURE__ */ React.createElement(Button, {
    id: "push",
    variant: "secondary",
    onClick: push,
    isAriaDisabled: !adminUrl,
    ref: pushRevocationButtonRef
  }, t("push")))));
};
