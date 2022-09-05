import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {Controller, FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  ActionGroup,
  Alert,
  AlertVariant,
  Button,
  ButtonVariant,
  DropdownItem,
  FormGroup,
  PageSection,
  Switch,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {toResourceDetails} from "../routes/Resource.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {convertFormValuesToObject, convertToFormValues} from "../../util.js";
import {MultiLineInput} from "../../components/multi-line-input/MultiLineInput.js";
import {toAuthorizationTab} from "../routes/AuthenticationTab.js";
import {ScopePicker} from "./ScopePicker.js";
import {KeyValueInput} from "../../components/key-value-form/KeyValueInput.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import "./resource-details.css.proxy.js";
export default function ResourceDetails() {
  const {t} = useTranslation("clients");
  const [client, setClient] = useState();
  const [resource, setResource] = useState();
  const [permissions, setPermission] = useState();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const form = useForm({
    shouldUnregister: false,
    mode: "onChange"
  });
  const {register, errors, control, setValue, handleSubmit} = form;
  const {id, resourceId, realm} = useParams();
  const history = useHistory();
  const setupForm = (resource2 = {}) => {
    convertToFormValues(resource2, setValue);
  };
  useFetch(() => Promise.all([
    adminClient.clients.findOne({id}),
    resourceId ? adminClient.clients.getResource({id, resourceId}) : Promise.resolve(void 0),
    resourceId ? adminClient.clients.listPermissionsByResource({id, resourceId}) : Promise.resolve(void 0)
  ]), ([client2, resource2, permissions2]) => {
    if (!client2) {
      throw new Error(t("common:notFound"));
    }
    setClient(client2);
    setPermission(permissions2);
    setResource(resource2);
    setupForm(resource2);
  }, []);
  const save = async (submitted) => {
    const resource2 = convertFormValuesToObject(submitted);
    try {
      if (resourceId) {
        await adminClient.clients.updateResource({id, resourceId}, resource2);
      } else {
        const result = await adminClient.clients.createResource({id}, resource2);
        history.push(toResourceDetails({realm, id, resourceId: result._id}));
      }
      addAlert(t((resourceId ? "update" : "create") + "ResourceSuccess"), AlertVariant.success);
    } catch (error) {
      addError("clients:resourceSaveError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "clients:deleteResource",
    children: /* @__PURE__ */ React.createElement(React.Fragment, null, t("deleteResourceConfirm"), permissions?.length !== 0 && /* @__PURE__ */ React.createElement(Alert, {
      variant: "warning",
      isInline: true,
      isPlain: true,
      title: t("deleteResourceWarning"),
      className: "pf-u-pt-lg"
    }, /* @__PURE__ */ React.createElement("p", {
      className: "pf-u-pt-xs"
    }, permissions?.map((permission) => /* @__PURE__ */ React.createElement("strong", {
      key: permission.id,
      className: "pf-u-pr-md"
    }, permission.name))))),
    continueButtonLabel: "clients:confirm",
    onConfirm: async () => {
      try {
        await adminClient.clients.delResource({
          id,
          resourceId
        });
        addAlert(t("resourceDeletedSuccess"), AlertVariant.success);
        history.push(toAuthorizationTab({realm, clientId: id, tab: "resources"}));
      } catch (error) {
        addError("clients:resourceDeletedError", error);
      }
    }
  });
  if (!client) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: resourceId ? resource?.name : "clients:createResource",
    dropdownItems: resourceId ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        "data-testid": "delete-resource",
        onClick: () => toggleDeleteDialog()
      }, t("common:delete"))
    ] : void 0
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "view-clients",
    className: "keycloak__resource-details__form",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("owner"),
    fieldId: "owner",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:owner",
      fieldLabelId: "clients:owner"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "owner",
    value: client.clientId,
    isReadOnly: true
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    fieldId: "name",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:resourceName",
      fieldLabelId: "name"
    }),
    helperTextInvalid: t("common:required"),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "name",
    name: "name",
    ref: register({required: true}),
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("displayName"),
    fieldId: "displayName",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:displayName",
      fieldLabelId: "name"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "displayName",
    name: "name",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("type"),
    fieldId: "type",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:type",
      fieldLabelId: "type"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "type",
    name: "type",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("uris"),
    fieldId: "uris",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:uris",
      fieldLabelId: "clients:uris"
    })
  }, /* @__PURE__ */ React.createElement(MultiLineInput, {
    name: "uris",
    "aria-label": t("uris"),
    addButtonLabel: "clients:addUri"
  })), /* @__PURE__ */ React.createElement(ScopePicker, {
    clientId: id
  }), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("iconUri"),
    fieldId: "iconUri",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:iconUri",
      fieldLabelId: "clients:iconUri"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: "iconUri",
    name: "icon_uri",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("ownerManagedAccess"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:ownerManagedAccess",
      fieldLabelId: "clients:ownerManagedAccess"
    }),
    fieldId: "ownerManagedAccess"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "ownerManagedAccess",
    control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "ownerManagedAccess",
      label: t("common:on"),
      labelOff: t("common:off"),
      isChecked: value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    hasNoPaddingTop: true,
    label: t("resourceAttribute"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:resourceAttribute",
      fieldLabelId: "clients:resourceAttribute"
    }),
    fieldId: "resourceAttribute"
  }, /* @__PURE__ */ React.createElement(KeyValueInput, {
    name: "attributes"
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
        tab: "resources"
      })
    })
  }, t("common:cancel"))))))));
}
