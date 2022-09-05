import React from "../_snowpack/pkg/react.js";
import {
  ActionGroup,
  Button,
  FormGroup,
  PageSection,
  ValidatedOptions
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {ViewHeader} from "../components/view-header/ViewHeader.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {KeycloakTextInput} from "../components/keycloak-text-input/KeycloakTextInput.js";
import {KeycloakTextArea} from "../components/keycloak-text-area/KeycloakTextArea.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {useHistory} from "../_snowpack/pkg/react-router-dom.js";
export const RealmRoleForm = ({
  form: {handleSubmit, errors, register, getValues},
  save,
  editMode,
  reset
}) => {
  const {t} = useTranslation("roles");
  const history = useHistory();
  const {realm: realmName} = useRealm();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, !editMode && /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: t("createRole")
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    role: "manage-realm",
    className: "pf-u-mt-lg"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("roleName"),
    fieldId: "kc-name",
    isRequired: true,
    validated: errors.name ? "error" : "default",
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({
      required: !editMode,
      validate: (value) => !!value.trim() || t("common:required").toString()
    }),
    type: "text",
    id: "kc-name",
    name: "name",
    isReadOnly: editMode
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:description"),
    fieldId: "kc-description",
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: errors.description?.message
  }, /* @__PURE__ */ React.createElement(KeycloakTextArea, {
    name: "description",
    "aria-label": "description",
    isDisabled: getValues().name?.includes("default-roles"),
    ref: register({
      maxLength: {
        value: 255,
        message: t("common:maxLength", {length: 255})
      }
    }),
    type: "text",
    validated: errors.description ? ValidatedOptions.error : ValidatedOptions.default,
    id: "kc-role-description"
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    onClick: save,
    "data-testid": "realm-roles-save-button"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "cancel",
    onClick: () => editMode ? reset() : history.push(`/${realmName}/roles`),
    variant: "link"
  }, editMode ? t("common:revert") : t("common:cancel"))))));
};
