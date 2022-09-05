import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm, useWatch} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  DropdownItem,
  FormGroup,
  PageSection,
  Radio,
  SelectVariant,
  Switch
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  toPermissionDetails
} from "../routes/PermissionDetails.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {ResourcesPolicySelect} from "./ResourcesPolicySelect.js";
import {toAuthorizationTab} from "../routes/AuthenticationTab.js";
import {ScopeSelect} from "./ScopeSelect.js";
import {toUpperCase} from "../../util.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../../components/keycloak-text-area/KeycloakTextArea.js";
const DECISION_STRATEGIES = ["UNANIMOUS", "AFFIRMATIVE", "CONSENSUS"];
export default function PermissionDetails() {
  const {t} = useTranslation("clients");
  const form = useForm({
    shouldUnregister: false,
    mode: "onChange"
  });
  const {register, control, reset, errors, handleSubmit} = form;
  const history = useHistory();
  const {id, realm, permissionType, permissionId, selectedId} = useParams();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [permission, setPermission] = useState();
  const [applyToResourceTypeFlag, setApplyToResourceTypeFlag] = useState(false);
  useFetch(async () => {
    if (!permissionId) {
      return {};
    }
    const [permission2, resources, policies, scopes] = await Promise.all([
      adminClient.clients.findOnePermission({
        id,
        type: permissionType,
        permissionId
      }),
      adminClient.clients.getAssociatedResources({
        id,
        permissionId
      }),
      adminClient.clients.getAssociatedPolicies({
        id,
        permissionId
      }),
      adminClient.clients.getAssociatedScopes({
        id,
        permissionId
      })
    ]);
    if (!permission2) {
      throw new Error(t("common:notFound"));
    }
    return {
      permission: permission2,
      resources: resources.map((r) => r._id),
      policies: policies.map((p) => p.id),
      scopes: scopes.map((s) => s.id)
    };
  }, ({permission: permission2, resources, policies, scopes}) => {
    reset({...permission2, resources, policies, scopes});
    if (permission2 && "resourceType" in permission2) {
      setApplyToResourceTypeFlag(!!permission2.resourceType);
    }
    setPermission({...permission2, resources, policies});
  }, []);
  const save = async (permission2) => {
    try {
      if (permissionId) {
        await adminClient.clients.updatePermission({id, type: permissionType, permissionId}, permission2);
      } else {
        const result = await adminClient.clients.createPermission({id, type: permissionType}, permission2);
        history.push(toPermissionDetails({
          realm,
          id,
          permissionType,
          permissionId: result.id
        }));
      }
      addAlert(t((permissionId ? "update" : "create") + "PermissionSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:permissionSaveError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:deletePermission",
    messageKey: t("deletePermissionConfirm", {
      permission: permission?.name
    }),
    continueButtonVariant: ButtonVariant.danger,
    continueButtonLabel: "clients:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.delPermission({
          id,
          type: permissionType,
          permissionId
        });
        addAlert(t("permissionDeletedSuccess"), AlertVariant.success);
        history.push(toAuthorizationTab({realm, clientId: id, tab: "permissions"}));
      } catch (error) {
        addError("clients:permissionDeletedError", error);
      }
    }
  });
  const resourcesIds = useWatch({
    control,
    name: "resources",
    defaultValue: []
  });
  if (!permission) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: permissionId ? permission.name : `clients:create${toUpperCase(permissionType)}BasedPermission`,
    dropdownItems: permissionId ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        "data-testid": "delete-resource",
        onClick: () => toggleDeleteDialog()
      }, t("common:delete"))
    ] : void 0
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "view-clients",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    isRequired: true,
    helperTextInvalid: t("common:required"),
    validated: errors.name ? "error" : "default",
    fieldId: "name",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:permissionName",
      fieldLabelId: "name"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "name",
    name: "name",
    ref: register({required: true}),
    validated: errors.name ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    fieldId: "description",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:permissionDescription",
      fieldLabelId: "description"
    }),
    validated: errors.description ? "error" : "default",
    helperTextInvalid: errors.description?.message
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    id: "description",
    name: "description",
    ref: register({
      maxLength: {
        value: 255,
        message: t("common:maxLength", {length: 255})
      }
    }),
    validated: errors.description ? "error" : "default"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("applyToResourceTypeFlag"),
    fieldId: "applyToResourceTypeFlag",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:applyToResourceTypeFlag",
      fieldLabelId: "clients:applyToResourceTypeFlag"
    })
  }, /* @__PURE__ */ React.createElement(Switch, {
    id: "applyToResourceTypeFlag",
    name: "applyToResourceTypeFlag",
    label: t("common:on"),
    labelOff: t("common:off"),
    isChecked: applyToResourceTypeFlag,
    onChange: setApplyToResourceTypeFlag
  })), applyToResourceTypeFlag ? /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resourceType"),
    fieldId: "name",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:resourceType",
      fieldLabelId: "resourceType"
    }),
    isRequired: permissionType === "scope"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "resourceType",
    name: "resourceType",
    ref: register({required: permissionType === "scope"})
  })) : /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("resources"),
    fieldId: "resources",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:permissionResources",
      fieldLabelId: "clients:resources"
    }),
    helperTextInvalid: t("common:required"),
    validated: errors.resources ? "error" : "default",
    isRequired: permissionType !== "scope"
  }, /* @__PURE__ */ React.createElement(ResourcesPolicySelect, {
    name: "resources",
    clientId: id,
    permissionId,
    preSelected: permissionType === "scope" ? void 0 : selectedId,
    variant: permissionType === "scope" ? SelectVariant.typeahead : SelectVariant.typeaheadMulti,
    isRequired: permissionType !== "scope"
  })), permissionType === "scope" && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("authorizationScopes"),
    fieldId: "scopes",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:permissionScopes",
      fieldLabelId: "clients:scopesSelect"
    }),
    helperTextInvalid: t("common:required"),
    validated: errors.scopes ? "error" : "default",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(ScopeSelect, {
    clientId: id,
    resourceId: resourcesIds?.[0],
    preSelected: selectedId
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("policies"),
    fieldId: "policies",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:permissionPolicies",
      fieldLabelId: "clients:policies"
    })
  }, /* @__PURE__ */ React.createElement(ResourcesPolicySelect, {
    name: "policies",
    clientId: id,
    permissionId
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("decisionStrategy"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:permissionDecisionStrategy",
      fieldLabelId: "clients:decisionStrategy"
    }),
    fieldId: "policyEnforcementMode",
    hasNoPaddingTop: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "decisionStrategy",
    "data-testid": "decisionStrategy",
    defaultValue: DECISION_STRATEGIES[0],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, DECISION_STRATEGIES.map((strategy) => /* @__PURE__ */ React.createElement(Radio, {
      id: strategy,
      key: strategy,
      "data-testid": strategy,
      isChecked: value === strategy,
      name: "decisionStrategies",
      onChange: () => onChange(strategy),
      label: t(`decisionStrategies.${strategy}`),
      className: "pf-u-mb-md"
    })))
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement("div", {
    className: "pf-u-mt-md"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.primary,
    type: "submit",
    "data-testid": "save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "cancel",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toAuthorizationTab({
        realm,
        clientId: id,
        tab: "permissions"
      })
    })
  }, t("common:cancel"))))))));
}
