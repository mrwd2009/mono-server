import React, {useState} from "../_snowpack/pkg/react.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  Form,
  PageSection
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormProvider, useForm, useFormContext} from "../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {Link, useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {ScrollForm} from "../components/scroll-form/ScrollForm.js";
import {AttributeGeneralSettings} from "./user-profile/attribute/AttributeGeneralSettings.js";
import {AttributePermission} from "./user-profile/attribute/AttributePermission.js";
import {AttributeValidations} from "./user-profile/attribute/AttributeValidations.js";
import {toUserProfile} from "./routes/UserProfile.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {AttributeAnnotations} from "./user-profile/attribute/AttributeAnnotations.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {UserProfileProvider} from "./user-profile/UserProfileContext.js";
import {convertToFormValues} from "../util.js";
import {flatten} from "../_snowpack/pkg/flat.js";
import "./realm-settings-section.css.proxy.js";
const CreateAttributeFormContent = ({
  save
}) => {
  const {t} = useTranslation("realm-settings");
  const form = useFormContext();
  const {realm, attributeName} = useParams();
  const editMode = attributeName ? true : false;
  return /* @__PURE__ */ React.createElement(UserProfileProvider, null, /* @__PURE__ */ React.createElement(ScrollForm, {
    sections: [
      {title: t("generalSettings"), panel: /* @__PURE__ */ React.createElement(AttributeGeneralSettings, null)},
      {title: t("permission"), panel: /* @__PURE__ */ React.createElement(AttributePermission, null)},
      {title: t("validations"), panel: /* @__PURE__ */ React.createElement(AttributeValidations, null)},
      {title: t("annotations"), panel: /* @__PURE__ */ React.createElement(AttributeAnnotations, null)}
    ]
  }), /* @__PURE__ */ React.createElement(Form, {
    onSubmit: form.handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(ActionGroup, {
    className: "keycloak__form_actions"
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit",
    "data-testid": "attribute-create"
  }, editMode ? t("common:save") : t("common:create")), /* @__PURE__ */ React.createElement(Link, {
    to: toUserProfile({realm, tab: "attributes"}),
    "data-testid": "attribute-cancel",
    className: "kc-attributeCancel"
  }, t("common:cancel")))));
};
export default function NewAttributeSettings() {
  const {realm, attributeName} = useParams();
  const {adminClient} = useAdminClient();
  const form = useForm({shouldUnregister: false});
  const {t} = useTranslation("realm-settings");
  const history = useHistory();
  const {addAlert, addError} = useAlerts();
  const [config, setConfig] = useState(null);
  const editMode = attributeName ? true : false;
  const convert = (obj) => Object.entries(obj || []).map(([key, value]) => ({
    key,
    value
  }));
  useFetch(() => adminClient.users.getProfile(), (config2) => {
    setConfig(config2);
    const {
      annotations,
      validations,
      permissions,
      selector,
      required,
      ...values
    } = config2.attributes.find((attribute) => attribute.name === attributeName) || {};
    convertToFormValues(values, form.setValue);
    Object.entries(flatten({permissions, selector, required}, {safe: true})).map(([key, value]) => form.setValue(key, value));
    form.setValue("annotations", convert(annotations));
    form.setValue("validations", convert(validations));
    form.setValue("isRequired", required !== void 0);
  }, []);
  const save = async (profileConfig) => {
    const validations = profileConfig.validations?.reduce((prevValidations, currentValidations) => {
      prevValidations[currentValidations.key] = currentValidations.value?.length === 0 ? {} : currentValidations.value;
      return prevValidations;
    }, {});
    const annotations = profileConfig.annotations.reduce((obj, item) => Object.assign(obj, {[item.key]: item.value}), {});
    const patchAttributes = () => config?.attributes.map((attribute) => {
      if (attribute.name !== attributeName) {
        return attribute;
      }
      delete attribute.required;
      return Object.assign({
        ...attribute,
        name: attributeName,
        displayName: profileConfig.displayName,
        validations,
        selector: profileConfig.selector,
        permissions: profileConfig.permissions,
        annotations
      }, profileConfig.isRequired ? {required: profileConfig.required} : void 0, profileConfig.group ? {group: profileConfig.group} : void 0);
    });
    const addAttribute = () => config?.attributes.concat([
      Object.assign({
        name: profileConfig.name,
        displayName: profileConfig.displayName,
        required: profileConfig.isRequired ? profileConfig.required : {},
        validations,
        selector: profileConfig.selector,
        permissions: profileConfig.permissions,
        annotations
      }, profileConfig.isRequired ? {required: profileConfig.required} : void 0, profileConfig.group ? {group: profileConfig.group} : void 0)
    ]);
    const updatedAttributes = editMode ? patchAttributes() : addAttribute();
    try {
      await adminClient.users.updateProfile({
        ...config,
        attributes: updatedAttributes,
        realm
      });
      history.push(toUserProfile({realm, tab: "attributes"}));
      addAlert(t("realm-settings:createAttributeSuccess"), AlertVariant.success);
    } catch (error) {
      addError("realm-settings:createAttributeError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: editMode ? attributeName : t("createAttribute"),
    subKey: editMode ? "" : t("createAttributeSubTitle")
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(CreateAttributeFormContent, {
    save: () => form.handleSubmit(save)()
  })));
}
