import React from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useRouteMatch} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  PageSection
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {OIDCGeneralSettings} from "./OIDCGeneralSettings.js";
import {OpenIdConnectSettings} from "./OpenIdConnectSettings.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {OIDCAuthentication} from "./OIDCAuthentication.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {toIdentityProvider} from "../routes/IdentityProvider.js";
import {toIdentityProviders} from "../routes/IdentityProviders.js";
export default function AddOpenIdConnect() {
  const {t} = useTranslation("identity-providers");
  const history = useHistory();
  const {url} = useRouteMatch();
  const isKeycloak = url.endsWith("keycloak-oidc");
  const id = `${isKeycloak ? "keycloak-" : ""}oidc`;
  const form = useForm({
    defaultValues: {alias: id}
  });
  const {
    handleSubmit,
    formState: {isDirty}
  } = form;
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const save = async (provider) => {
    delete provider.discoveryEndpoint;
    try {
      await adminClient.identityProviders.create({
        ...provider,
        providerId: id
      });
      addAlert(t("createSuccess"), AlertVariant.success);
      history.push(toIdentityProvider({
        realm,
        providerId: id,
        alias: provider.alias,
        tab: "settings"
      }));
    } catch (error) {
      addError("identity-providers:createError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: t(isKeycloak ? "addKeycloakOpenIdProvider" : "addOpenIdProvider")
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-identity-providers",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(OIDCGeneralSettings, {
    id
  }), /* @__PURE__ */ React.createElement(OpenIdConnectSettings, null), /* @__PURE__ */ React.createElement(OIDCAuthentication, null), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    isDisabled: !isDirty,
    variant: "primary",
    type: "submit",
    "data-testid": "createProvider"
  }, t("common:add")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    "data-testid": "cancel",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toIdentityProviders({realm})
    })
  }, t("common:cancel")))))));
}
