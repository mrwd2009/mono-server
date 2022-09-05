import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  FormGroup,
  Select,
  SelectVariant,
  SelectOption,
  PageSection,
  ActionGroup,
  Button,
  Switch,
  ExpandableSection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {FormPanel} from "../../components/scroll-form/FormPanel.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {KeyBasedAttributeInput} from "./KeyBasedAttributeInput.js";
import {defaultContextAttributes} from "../utils.js";
import {useAccess} from "../../context/access/Access.js";
import {ForbiddenSection} from "../../ForbiddenSection.js";
import {Results} from "./evaluate/Results.js";
import {ClientSelect} from "../../components/client/ClientSelect.js";
import "./auth-evaluate.css.proxy.js";
import {UserSelect} from "../../components/users/UserSelect.js";
export const AuthorizationEvaluate = ({client}) => {
  const form = useForm({mode: "onChange"});
  const {
    control,
    register,
    reset,
    errors,
    trigger,
    formState: {isValid}
  } = form;
  const {t} = useTranslation("clients");
  const {adminClient} = useAdminClient();
  const realm = useRealm();
  const [scopesDropdownOpen, setScopesDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [applyToResourceType, setApplyToResourceType] = useState(false);
  const [resources, setResources] = useState([]);
  const [scopes, setScopes] = useState([]);
  const [evaluateResult, setEvaluateResult] = useState();
  const [clientRoles, setClientRoles] = useState([]);
  const {hasAccess} = useAccess();
  if (!hasAccess("view-users"))
    return /* @__PURE__ */ React.createElement(ForbiddenSection, {
      permissionNeeded: "view-users"
    });
  useFetch(() => adminClient.roles.find(), (roles) => {
    setClientRoles(roles);
  }, []);
  useFetch(() => Promise.all([
    adminClient.clients.listResources({
      id: client.id
    }),
    adminClient.clients.listAllScopes({
      id: client.id
    })
  ]), ([resources2, scopes2]) => {
    setResources(resources2);
    setScopes(scopes2);
  }, []);
  const evaluate = async () => {
    if (!await trigger()) {
      return;
    }
    const formValues = form.getValues();
    const keys = formValues.resources?.map(({key}) => key);
    const resEval = {
      roleIds: formValues.roleIds ?? [],
      clientId: formValues.client.id,
      userId: formValues.user[0],
      resources: formValues.resources?.filter((resource) => keys?.includes(resource.name)),
      entitlements: false,
      context: {
        attributes: Object.fromEntries(formValues.context.attributes.filter((item) => item.key || item.value !== "").map(({key, value}) => [key, value]))
      }
    };
    const evaluation = await adminClient.clients.evaluateResource({id: client.id, realm: realm.realm}, resEval);
    setEvaluateResult(evaluation);
    return evaluation;
  };
  if (evaluateResult) {
    return /* @__PURE__ */ React.createElement(Results, {
      evaluateResult,
      refresh: evaluate,
      back: () => setEvaluateResult(void 0)
    });
  }
  return /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-identity-information",
    title: t("clients:identityInformation")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "view-clients"
  }, /* @__PURE__ */ React.createElement(ClientSelect, {
    name: "client",
    label: "client",
    namespace: "clients",
    helpText: "clients-help:client",
    defaultValue: client.clientId
  }), /* @__PURE__ */ React.createElement(UserSelect, {
    name: "user",
    label: "users",
    helpText: "clients-help:selectUser",
    defaultValue: "",
    variant: SelectVariant.typeahead,
    isRequired: true
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("roles"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:roles",
      fieldLabelId: "clients:roles"
    }),
    fieldId: "realmRole",
    validated: errors.roleIds ? "error" : "default",
    helperTextInvalid: t("common:required"),
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "roleIds",
    placeholderText: t("selectARole"),
    control,
    defaultValue: [],
    rules: {validate: (value) => value.length > 0},
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      variant: SelectVariant.typeaheadMulti,
      toggleId: "role",
      onToggle: setRoleDropdownOpen,
      selections: value,
      onSelect: (_, v) => {
        const option = v.toString();
        if (value.includes(option)) {
          onChange(value.filter((item) => item !== option));
        } else {
          onChange([...value, option]);
        }
        setRoleDropdownOpen(false);
      },
      onClear: (event) => {
        event.stopPropagation();
        onChange([]);
      },
      "aria-label": t("realmRole"),
      isOpen: roleDropdownOpen
    }, clientRoles.map((role) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: role.name === value,
      key: role.name,
      value: role.name
    })))
  })))), /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-permissions",
    title: t("common:permissions")
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "view-clients"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("applyToResourceType"),
    fieldId: "applyToResourceType",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:applyToResourceType",
      fieldLabelId: "clients:applyToResourceType"
    })
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "applyToResource-switch",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: applyToResourceType,
    onChange: setApplyToResourceType
  })), !applyToResourceType ? /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resourcesAndAuthScopes"),
    id: "resourcesAndAuthScopes",
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t("clients-help:contextualAttributes"),
      fieldLabelId: `resourcesAndAuthScopes`
    }),
    helperTextInvalid: t("common:required"),
    fieldId: "resourcesAndAuthScopes"
  }, /* @__PURE__ */ React.createElement(KeyBasedAttributeInput, {
    selectableValues: resources.map((item) => ({
      name: item.name,
      key: item._id
    })),
    resources,
    name: "resources"
  })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resourceType"),
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:resourceType",
      fieldLabelId: "clients:resourceType"
    }),
    fieldId: "client",
    validated: form.errors.alias ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "alias",
    name: "alias",
    "data-testid": "alias",
    ref: register({required: true})
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authScopes"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:scopesSelect",
      fieldLabelId: "clients:client"
    }),
    fieldId: "authScopes"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "authScopes",
    defaultValue: [],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "authScopes",
      onToggle: setScopesDropdownOpen,
      onSelect: (_, v) => {
        const option = v.toString();
        if (value.includes(option)) {
          onChange(value.filter((item) => item !== option));
        } else {
          onChange([...value, option]);
        }
        setScopesDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.typeaheadMulti,
      "aria-label": t("authScopes"),
      isOpen: scopesDropdownOpen
    }, scopes.map((scope) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: scope.name === value,
      key: scope.id,
      value: scope.name
    })))
  }))), /* @__PURE__ */ React.createElement(ExpandableSection, {
    toggleText: t("contextualInfo"),
    onToggle: () => setIsExpanded(!isExpanded),
    isExpanded
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("contextualAttributes"),
    id: "contextualAttributes",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: t("clients-help:contextualAttributes"),
      fieldLabelId: `contextualAttributes`
    }),
    helperTextInvalid: t("common:required"),
    fieldId: "contextualAttributes"
  }, /* @__PURE__ */ React.createElement(KeyBasedAttributeInput, {
    selectableValues: defaultContextAttributes,
    name: "context.attributes"
  })))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "authorization-eval",
    id: "authorization-eval",
    className: "pf-u-mr-md",
    isDisabled: !isValid,
    onClick: () => evaluate()
  }, t("evaluate")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "authorization-revert",
    id: "authorization-revert",
    className: "pf-u-mr-md",
    variant: "link",
    onClick: () => reset()
  }, t("common:revert"))))));
};
