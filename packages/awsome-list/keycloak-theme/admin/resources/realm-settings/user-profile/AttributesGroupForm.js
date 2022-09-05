import {
  ActionGroup,
  Button,
  FormGroup,
  PageSection,
  Text,
  TextContent
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import React, {useEffect, useMemo} from "../../_snowpack/pkg/react.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Link, useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {KeyValueInput} from "../../components/key-value-form/KeyValueInput.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {toUserProfile} from "../routes/UserProfile.js";
import {useUserProfile} from "./UserProfileContext.js";
import "../realm-settings-section.css.proxy.js";
function parseAnnotations(input) {
  return Object.entries(input).reduce((p, [key, value]) => {
    if (typeof value === "string") {
      return [...p, {key, value}];
    } else {
      return [...p];
    }
  }, []);
}
function transformAnnotations(input) {
  return Object.fromEntries(input.filter((annotation) => annotation.key.length > 0).map((annotation) => [annotation.key, annotation.value]));
}
const defaultValues = {
  annotations: [{key: "", value: ""}],
  displayDescription: "",
  displayHeader: "",
  name: ""
};
export default function AttributesGroupForm() {
  const {t} = useTranslation();
  const {realm} = useRealm();
  const {config, save} = useUserProfile();
  const history = useHistory();
  const params = useParams();
  const form = useForm({defaultValues, shouldUnregister: false});
  const matchingGroup = useMemo(() => config?.groups?.find(({name}) => name === params.name), [config?.groups]);
  useEffect(() => {
    if (!matchingGroup) {
      return;
    }
    const annotations = matchingGroup.annotations ? parseAnnotations(matchingGroup.annotations) : [];
    form.reset({...defaultValues, ...matchingGroup, annotations});
  }, [matchingGroup]);
  const onSubmit = async (values) => {
    if (!config) {
      return;
    }
    const groups = [...config.groups ?? []];
    const updateAt = matchingGroup ? groups.indexOf(matchingGroup) : -1;
    const updatedGroup = {
      ...values,
      annotations: transformAnnotations(values.annotations)
    };
    if (updateAt === -1) {
      groups.push(updatedGroup);
    } else {
      groups[updateAt] = updatedGroup;
    }
    const success = await save({...config, groups});
    if (success) {
      history.push(toUserProfile({realm, tab: "attributes-group"}));
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: matchingGroup ? "attributes-group:editGroupText" : "attributes-group:createGroupText",
    divider: true
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    onSubmit: form.handleSubmit(onSubmit)
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributes-group:nameField"),
    fieldId: "kc-name",
    isRequired: true,
    helperTextInvalid: t("common:required"),
    validated: form.errors.name ? "error" : "default",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "attributes-group:nameHint",
      fieldLabelId: "attributes-group:nameField"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: form.register({required: true}),
    type: "text",
    id: "kc-name",
    name: "name",
    isReadOnly: !!matchingGroup
  }), !!matchingGroup && /* @__PURE__ */ React.createElement("input", {
    type: "hidden",
    ref: form.register(),
    name: "name"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributes-group:displayHeaderField"),
    fieldId: "kc-display-header",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "attributes-group:displayHeaderHint",
      fieldLabelId: "attributes-group:displayHeaderField"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: form.register(),
    type: "text",
    id: "kc-display-header",
    name: "displayHeader"
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributes-group:displayDescriptionField"),
    fieldId: "kc-display-description",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "attributes-group:displayDescriptionHint",
      fieldLabelId: "attributes-group:displayDescriptionField"
    })
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: form.register(),
    type: "text",
    id: "kc-display-description",
    name: "displayDescription"
  })), /* @__PURE__ */ React.createElement(TextContent, null, /* @__PURE__ */ React.createElement(Text, {
    component: "h2"
  }, t("attributes-group:annotationsText"))), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("attributes-group:annotationsText"),
    fieldId: "kc-annotations"
  }, /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(KeyValueInput, {
    name: "annotations"
  }))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toUserProfile({realm, tab: "attributes-group"})
    })
  }, t("common:cancel"))))));
}
