import React, {useEffect, useMemo, useState} from "../../_snowpack/pkg/react.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  Divider,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary,
  PageSection,
  Select,
  SelectOption,
  Title,
  Toolbar,
  ToolbarContent,
  ToolbarItem
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {PlusCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {parsePolicy} from "./util.js";
import {PolicyRow} from "./PolicyRow.js";
import {serializePolicy} from "./util.js";
const PolicySelect = ({onSelect, selectedPolicies}) => {
  const {t} = useTranslation("authentication");
  const {passwordPolicies} = useServerInfo();
  const [open, setOpen] = useState(false);
  const policies = useMemo(() => passwordPolicies?.filter((p) => selectedPolicies.find((o) => o.id === p.id) === void 0), [selectedPolicies]);
  return /* @__PURE__ */ React.createElement(Select, {
    width: 300,
    onSelect: (_, selection) => {
      onSelect(selection);
      setOpen(false);
    },
    onToggle: (value) => setOpen(value),
    isOpen: open,
    selections: t("addPolicy"),
    isDisabled: policies?.length === 0
  }, policies?.map((policy) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: policy.id,
    value: policy
  }, policy.displayName)));
};
export const PasswordPolicy = ({
  realm,
  realmUpdated
}) => {
  const {t} = useTranslation("authentication");
  const {passwordPolicies} = useServerInfo();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm: realmName} = useRealm();
  const [rows, setRows] = useState([]);
  const onSelect = (row) => setRows([...rows, row]);
  const form = useForm({shouldUnregister: false});
  const {handleSubmit, setValue, getValues} = form;
  const setupForm = (realm2) => {
    const values = parsePolicy(realm2.passwordPolicy || "", passwordPolicies);
    values.forEach((v) => {
      setValue(v.id, v.value);
    });
    setRows(values);
  };
  useEffect(() => setupForm(realm), []);
  const save = async (values) => {
    const updatedRealm = {
      ...realm,
      passwordPolicy: serializePolicy(rows, values)
    };
    try {
      await adminClient.realms.update({realm: realmName}, updatedRealm);
      realmUpdated(updatedRealm);
      setupForm(updatedRealm);
      addAlert(t("updatePasswordPolicySuccess"), AlertVariant.success);
    } catch (error) {
      addError("authentication:updatePasswordPolicyError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-p-0"
  }, (rows.length !== 0 || realm.passwordPolicy) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(ToolbarContent, null, /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(PolicySelect, {
    onSelect,
    selectedPolicies: rows
  })))), /* @__PURE__ */ React.createElement(Divider, null), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    className: "keycloak__policies_authentication__form",
    role: "manage-realm",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, rows.map((r, index) => /* @__PURE__ */ React.createElement(PolicyRow, {
    key: `${r.id}-${index}`,
    policy: r,
    onRemove: (id) => setRows(rows.filter((r2) => r2.id !== id))
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "save",
    variant: "primary",
    type: "submit",
    isDisabled: serializePolicy(rows, getValues()) === realm.passwordPolicy
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "reload",
    variant: ButtonVariant.link,
    onClick: () => setupForm(realm)
  }, t("common:reload"))))))), !rows.length && !realm.passwordPolicy && /* @__PURE__ */ React.createElement(EmptyState, {
    "data-testid": "empty-state",
    variant: "large"
  }, /* @__PURE__ */ React.createElement(EmptyStateIcon, {
    icon: PlusCircleIcon
  }), /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "lg"
  }, t("noPasswordPolicies")), /* @__PURE__ */ React.createElement(EmptyStateBody, null, t("noPasswordPoliciesInstructions")), /* @__PURE__ */ React.createElement(EmptyStatePrimary, null, /* @__PURE__ */ React.createElement(PolicySelect, {
    onSelect,
    selectedPolicies: []
  }))));
};
