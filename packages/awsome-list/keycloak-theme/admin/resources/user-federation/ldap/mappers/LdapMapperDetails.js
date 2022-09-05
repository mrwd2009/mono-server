import React, {useState} from "../../../_snowpack/pkg/react.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  DropdownItem,
  Form,
  FormGroup,
  PageSection,
  Select,
  SelectOption,
  SelectVariant,
  ValidatedOptions
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {convertFormValuesToObject, convertToFormValues} from "../../../util.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {ViewHeader} from "../../../components/view-header/ViewHeader.js";
import {useHistory, useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import {Controller, FormProvider, useForm, useWatch} from "../../../_snowpack/pkg/react-hook-form.js";
import {useAlerts} from "../../../components/alert/Alerts.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {FormAccess} from "../../../components/form-access/FormAccess.js";
import {DynamicComponents} from "../../../components/dynamic/DynamicComponents.js";
import {useRealm} from "../../../context/realm-context/RealmContext.js";
import {KeycloakSpinner} from "../../../components/keycloak-spinner/KeycloakSpinner.js";
import {KeycloakTextInput} from "../../../components/keycloak-text-input/KeycloakTextInput.js";
import {toUserFederationLdap} from "../../routes/UserFederationLdap.js";
import {useConfirmDialog} from "../../../components/confirm-dialog/ConfirmDialog.js";
export default function LdapMapperDetails() {
  const form = useForm();
  const [mapping, setMapping] = useState();
  const [components, setComponents] = useState();
  const {adminClient} = useAdminClient();
  const {id, mapperId} = useParams();
  const history = useHistory();
  const {realm} = useRealm();
  const {t} = useTranslation("user-federation");
  const {addAlert, addError} = useAlerts();
  const [isMapperDropdownOpen, setIsMapperDropdownOpen] = useState(false);
  useFetch(async () => {
    const components2 = await adminClient.components.listSubComponents({
      id,
      type: "org.keycloak.storage.ldap.mappers.LDAPStorageMapper"
    });
    if (mapperId && mapperId !== "new") {
      const fetchedMapper = await adminClient.components.findOne({
        id: mapperId
      });
      return {components: components2, fetchedMapper};
    }
    return {components: components2};
  }, ({components: components2, fetchedMapper}) => {
    setMapping(fetchedMapper);
    setComponents(components2);
    if (mapperId !== "new" && !fetchedMapper)
      throw new Error(t("common:notFound"));
    if (fetchedMapper)
      setupForm(fetchedMapper);
  }, []);
  const setupForm = (mapper) => {
    convertToFormValues(mapper, form.setValue);
  };
  const save = async (mapper) => {
    const component = convertFormValuesToObject(mapper);
    const map = {
      ...component,
      config: Object.entries(component.config || {}).reduce((result, [key, value]) => {
        result[key] = Array.isArray(value) ? value : [value];
        return result;
      }, {})
    };
    try {
      if (mapperId === "new") {
        await adminClient.components.create(map);
        history.push(toUserFederationLdap({realm, id: mapper.parentId, tab: "mappers"}));
      } else {
        await adminClient.components.update({id: mapperId}, map);
      }
      setupForm(map);
      addAlert(t(mapperId === "new" ? "common:mappingCreatedSuccess" : "common:mappingUpdatedSuccess"), AlertVariant.success);
    } catch (error) {
      addError(mapperId === "new" ? "common:mappingCreatedError" : "common:mappingUpdatedError", error);
    }
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "common:deleteMappingTitle",
    messageKey: "common:deleteMappingConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.components.del({
          id: mapping.id
        });
        addAlert(t("common:mappingDeletedSuccess"), AlertVariant.success);
        history.push(toUserFederationLdap({id, realm, tab: "mappers"}));
      } catch (error) {
        addError("common:mappingDeletedError", error);
      }
    }
  });
  const mapperType = useWatch({
    control: form.control,
    name: "providerId"
  });
  const isNew = mapperId === "new";
  if (!components) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: mapping ? mapping.name : t("common:createNewMapper"),
    dropdownItems: isNew ? void 0 : [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        onClick: toggleDeleteDialog
      }, t("common:delete"))
    ]
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    isFilled: true
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-realm",
    isHorizontal: true
  }, !isNew && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:id"),
    fieldId: "kc-ldap-mapper-id"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isDisabled: true,
    type: "text",
    id: "kc-ldap-mapper-id",
    "data-testid": "ldap-mapper-id",
    name: "id",
    ref: form.register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:nameHelp",
      fieldLabelId: "name"
    }),
    fieldId: "kc-ldap-mapper-name",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isDisabled: !isNew,
    isRequired: true,
    type: "text",
    id: "kc-ldap-mapper-name",
    "data-testid": "ldap-mapper-name",
    name: "name",
    ref: form.register({required: true}),
    validated: form.errors.name ? ValidatedOptions.error : ValidatedOptions.default
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    hidden: true,
    defaultValue: isNew ? id : mapping ? mapping.parentId : "",
    type: "text",
    id: "kc-ldap-parentId",
    "data-testid": "ldap-mapper-parentId",
    name: "parentId",
    ref: form.register
  }), /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    hidden: true,
    defaultValue: "org.keycloak.storage.ldap.mappers.LDAPStorageMapper",
    type: "text",
    id: "kc-ldap-provider-type",
    "data-testid": "ldap-mapper-provider-type",
    name: "providerType",
    ref: form.register
  })), !isNew ? /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:mapperType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:mapperTypeHelp",
      fieldLabelId: "mapperType"
    }),
    fieldId: "kc-ldap-mapper-type",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isDisabled: !isNew,
    isRequired: true,
    type: "text",
    id: "kc-ldap-mapper-type",
    "data-testid": "ldap-mapper-type-fld",
    name: "providerId",
    ref: form.register
  })) : /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:mapperType"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "user-federation-help:mapperTypeHelp",
      fieldLabelId: "mapperType"
    }),
    fieldId: "kc-providerId",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "providerId",
    defaultValue: "",
    control: form.control,
    "data-testid": "ldap-mapper-type-select",
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-providerId",
      required: true,
      onToggle: () => setIsMapperDropdownOpen(!isMapperDropdownOpen),
      isOpen: isMapperDropdownOpen,
      onSelect: (_, value2) => {
        onChange(value2);
        setIsMapperDropdownOpen(false);
      },
      selections: value,
      variant: SelectVariant.typeahead
    }, components.map((c) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: c.id,
      value: c.id
    })))
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, !!mapperType && /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: components.find((c) => c.id === mapperType)?.properties
  }))), /* @__PURE__ */ React.createElement(Form, {
    onSubmit: form.handleSubmit(() => save(form.getValues()))
  }, /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    isDisabled: !form.formState.isDirty,
    variant: "primary",
    type: "submit",
    "data-testid": "ldap-mapper-save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: () => isNew ? history.goBack() : history.push(`/${realm}/user-federation/ldap/${mapping.parentId}/mappers`),
    "data-testid": "ldap-mapper-cancel"
  }, t("common:cancel"))))));
}
