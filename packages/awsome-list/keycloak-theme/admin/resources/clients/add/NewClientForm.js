import {
  AlertVariant,
  Button,
  PageSection,
  Wizard,
  WizardContextConsumer,
  WizardFooter
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {useState} from "../../_snowpack/pkg/react.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {convertFormValuesToObject} from "../../util.js";
import {toClient} from "../routes/Client.js";
import {toClients} from "../routes/Clients.js";
import {CapabilityConfig} from "./CapabilityConfig.js";
import {GeneralSettings} from "./GeneralSettings.js";
export default function NewClientForm() {
  const {t} = useTranslation("clients");
  const {realm} = useRealm();
  const {adminClient} = useAdminClient();
  const history = useHistory();
  const [showCapabilityConfig, setShowCapabilityConfig] = useState(false);
  const [client, setClient] = useState({
    protocol: "openid-connect",
    clientId: "",
    name: "",
    description: "",
    publicClient: true,
    authorizationServicesEnabled: false,
    serviceAccountsEnabled: false,
    implicitFlowEnabled: false,
    directAccessGrantsEnabled: true,
    standardFlowEnabled: true,
    frontchannelLogout: true
  });
  const {addAlert, addError} = useAlerts();
  const methods = useForm({defaultValues: client});
  const protocol = methods.watch("protocol");
  const save = async () => {
    try {
      const newClient = await adminClient.clients.create({
        ...client,
        clientId: client.clientId?.trim()
      });
      addAlert(t("createSuccess"), AlertVariant.success);
      history.push(toClient({realm, clientId: newClient.id, tab: "settings"}));
    } catch (error) {
      addError("clients:createError", error);
    }
  };
  const forward = async (onNext) => {
    if (await methods.trigger()) {
      setClient({
        ...client,
        ...convertFormValuesToObject(methods.getValues())
      });
      if (!isFinalStep()) {
        setShowCapabilityConfig(true);
      }
      onNext?.();
    }
  };
  const isFinalStep = () => showCapabilityConfig || protocol !== "openid-connect";
  const back = () => {
    setClient({...client, ...convertFormValuesToObject(methods.getValues())});
    methods.reset({
      ...client,
      ...convertFormValuesToObject(methods.getValues())
    });
    setShowCapabilityConfig(false);
  };
  const onGoToStep = (newStep) => {
    if (newStep.id === "generalSettings") {
      back();
    } else {
      forward();
    }
  };
  const Footer = () => /* @__PURE__ */ React.createElement(WizardFooter, null, /* @__PURE__ */ React.createElement(WizardContextConsumer, null, ({activeStep, onNext, onBack, onClose}) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    "data-testid": isFinalStep() ? "save" : "next",
    type: "submit",
    onClick: () => {
      forward(onNext);
    }
  }, isFinalStep() ? t("common:save") : t("common:next")), /* @__PURE__ */ React.createElement(Button, {
    variant: "secondary",
    "data-testid": "back",
    onClick: () => {
      back();
      onBack();
    },
    isDisabled: activeStep.name === t("generalSettings")
  }, t("common:back")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "cancel",
    variant: "link",
    onClick: onClose
  }, t("common:cancel")))));
  const title = t("createClient");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: "clients:createClient",
    subKey: "clients:clientsExplain"
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...methods
  }, /* @__PURE__ */ React.createElement(Wizard, {
    onClose: () => history.push(toClients({realm})),
    navAriaLabel: `${title} steps`,
    mainAriaLabel: `${title} content`,
    steps: [
      {
        id: "generalSettings",
        name: t("generalSettings"),
        component: /* @__PURE__ */ React.createElement(GeneralSettings, null)
      },
      ...showCapabilityConfig ? [
        {
          id: "capabilityConfig",
          name: t("capabilityConfig"),
          component: /* @__PURE__ */ React.createElement(CapabilityConfig, {
            protocol: client.protocol
          })
        }
      ] : []
    ],
    footer: /* @__PURE__ */ React.createElement(Footer, null),
    onSave: save,
    onGoToStep
  }))));
}
