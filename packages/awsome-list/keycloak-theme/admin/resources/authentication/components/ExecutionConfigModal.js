import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Tooltip,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {CogIcon, TrashIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {DynamicComponents} from "../../components/dynamic/DynamicComponents.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
export const ExecutionConfigModal = ({
  execution
}) => {
  const {t} = useTranslation("authentication");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [show, setShow] = useState(false);
  const [config, setConfig] = useState();
  const [configDescription, setConfigDescription] = useState();
  const form = useForm();
  const {
    register,
    setValue,
    handleSubmit,
    formState: {errors}
  } = form;
  const setupForm = (configDescription2, config2) => {
    configDescription2.properties.map((property) => {
      setValue(`config.${property.name}`, config2?.config?.[property.name] || property.defaultValue || "");
    });
    if (config2) {
      setValue("alias", config2.alias);
      setValue("id", config2.id);
    }
  };
  useFetch(async () => {
    const configDescription2 = await adminClient.authenticationManagement.getConfigDescription({
      providerId: execution.providerId
    });
    let config2;
    if (execution.authenticationConfig) {
      config2 = await adminClient.authenticationManagement.getConfig({
        id: execution.authenticationConfig
      });
    }
    return {configDescription: configDescription2, config: config2};
  }, ({configDescription: configDescription2, config: config2}) => {
    setConfigDescription(configDescription2);
    setConfig(config2);
  }, []);
  useEffect(() => {
    if (configDescription)
      setupForm(configDescription, config);
  }, [show]);
  const save = async (changedConfig) => {
    try {
      if (config) {
        const newConfig = {
          ...config,
          config: changedConfig.config
        };
        await adminClient.authenticationManagement.updateConfig(newConfig);
        setConfig({...newConfig.config});
      } else {
        const newConfig = {
          id: execution.id,
          alias: changedConfig.alias,
          config: changedConfig.config
        };
        const {id} = await adminClient.authenticationManagement.createConfig(newConfig);
        setConfig({...newConfig.config, id, alias: newConfig.alias});
      }
      addAlert(t("configSaveSuccess"), AlertVariant.success);
      setShow(false);
    } catch (error) {
      addError("authentication:configSaveError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Tooltip, {
    content: t("common:settings")
  }, /* @__PURE__ */ React.createElement(Button, {
    variant: "plain",
    "aria-label": t("common:settings"),
    onClick: () => setShow(true)
  }, /* @__PURE__ */ React.createElement(CogIcon, null))), configDescription && /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.small,
    isOpen: show,
    title: t("executionConfig", {name: configDescription.name}),
    onClose: () => setShow(false)
  }, /* @__PURE__ */ React.createElement(Form, {
    id: "execution-config-form",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("alias"),
    fieldId: "alias",
    helperTextInvalid: t("common:required"),
    validated: errors.alias ? ValidatedOptions.error : ValidatedOptions.default,
    isRequired: true,
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "authentication-help:alias",
      fieldLabelId: "authentication:alias"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    isReadOnly: !!config,
    type: "text",
    id: "alias",
    name: "alias",
    "data-testid": "alias",
    ref: register({required: true}),
    validated: errors.alias ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: configDescription.properties || []
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "save",
    variant: "primary",
    type: "submit"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "cancel",
    variant: ButtonVariant.link,
    onClick: () => {
      setShow(false);
    }
  }, t("common:cancel")), config && /* @__PURE__ */ React.createElement(Button, {
    className: "pf-u-ml-4xl",
    "data-testid": "clear",
    variant: ButtonVariant.link,
    onClick: async () => {
      await adminClient.authenticationManagement.delConfig({
        id: config.id
      });
      setConfig(void 0);
      setShow(false);
    }
  }, t("common:clear"), " ", /* @__PURE__ */ React.createElement(TrashIcon, null))))));
};
