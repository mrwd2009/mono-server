import React from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import {FormGroup} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {ResourcesPolicySelect} from "../ResourcesPolicySelect.js";
import {DecisionStrategySelect} from "../DecisionStragegySelect.js";
export const Aggregate = () => {
  const {t} = useTranslation("clients");
  const {id} = useParams();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("applyPolicy"),
    fieldId: "policies",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:applyPolicy",
      fieldLabelId: "clients:policies"
    })
  }, /* @__PURE__ */ React.createElement(ResourcesPolicySelect, {
    name: "policies",
    clientId: id
  })), /* @__PURE__ */ React.createElement(DecisionStrategySelect, {
    helpLabel: "policyDecisionStagey"
  }));
};
