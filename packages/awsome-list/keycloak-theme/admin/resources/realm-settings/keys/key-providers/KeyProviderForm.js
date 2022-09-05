import React from "../../../_snowpack/pkg/react.js";
import {useParams} from "../../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {Controller, FormProvider, useForm} from "../../../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  FormGroup,
  ValidatedOptions,
  TextInput,
  PageSection,
  ActionGroup,
  Button
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {useAlerts} from "../../../components/alert/Alerts.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {FormAccess} from "../../../components/form-access/FormAccess.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {KEY_PROVIDER_TYPE} from "../../../util.js";
import {ViewHeader} from "../../../components/view-header/ViewHeader.js";
import {DynamicComponents} from "../../../components/dynamic/DynamicComponents.js";
import {KeycloakTextInput} from "../../../components/keycloak-text-input/KeycloakTextInput.js";
import {useServerInfo} from "../../../context/server-info/ServerInfoProvider.js";
export const KeyProviderForm = ({
  providerType,
  onClose
}) => {
  const {t} = useTranslation("realm-settings");
  const {id} = useParams();
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const serverInfo = useServerInfo();
  const allComponentTypes = serverInfo.componentTypes?.[KEY_PROVIDER_TYPE] ?? [];
  const form = useForm({
    shouldUnregister: false,
    mode: "onChange"
  });
  const {register, control, handleSubmit, errors, reset} = form;
  const save = async (component) => {
    if (component.config)
      Object.entries(component.config).forEach(([key, value]) => component.config[key] = Array.isArray(value) ? value : [value]);
    try {
      if (id) {
        await adminClient.components.update({id}, {
          ...component,
          providerType: KEY_PROVIDER_TYPE
        });
        addAlert(t("saveProviderSuccess"), AlertVariant.success);
      } else {
        await adminClient.components.create({
          ...component,
          providerId: providerType,
          providerType: KEY_PROVIDER_TYPE,
          config: {...component.config, priority: ["0"]}
        });
        addAlert(t("saveProviderSuccess"), AlertVariant.success);
        onClose?.();
      }
    } catch (error) {
      addError("realm-settings:saveProviderError", error);
    }
  };
  useFetch(async () => {
    if (id)
      return await adminClient.components.findOne({id});
  }, (result) => {
    if (result) {
      reset({...result});
    }
  }, []);
  return /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    onSubmit: handleSubmit(save)
  }, id && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("providerId"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:mapperName",
      fieldLabelId: "providerId"
    }),
    fieldId: "providerId",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register,
    id: "id",
    type: "text",
    name: "id",
    isReadOnly: true,
    "aria-label": t("providerId"),
    "data-testid": "providerId-input"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:mapperName",
      fieldLabelId: "name"
    }),
    fieldId: "name",
    isRequired: true,
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "name",
    control,
    rules: {required: true},
    defaultValue: providerType,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(TextInput, {
      id: "name",
      type: "text",
      "aria-label": t("common:name"),
      value,
      onChange,
      "data-testid": "name-input"
    })
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: allComponentTypes.find((type) => type.id === providerType)?.properties || []
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "add-provider-button",
    variant: "primary",
    type: "submit"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    onClick: () => onClose?.(),
    variant: "link"
  }, t("common:cancel"))));
};
export default function KeyProviderFormPage() {
  const {t} = useTranslation("realm-settings");
  const params = useParams();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: t("editProvider"),
    subKey: params.providerType
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(KeyProviderForm, {
    ...params
  })));
}
