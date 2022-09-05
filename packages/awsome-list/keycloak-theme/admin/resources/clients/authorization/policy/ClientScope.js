import React, {useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useFormContext, Controller} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Button, Checkbox} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {MinusCircleIcon} from "../../../_snowpack/pkg/@patternfly/react-icons.js";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../../_snowpack/pkg/@patternfly/react-table.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {AddScopeDialog} from "../../scopes/AddScopeDialog.js";
import useLocaleSort, {mapByKey} from "../../../utils/useLocaleSort.js";
export const ClientScope = () => {
  const {t} = useTranslation("clients");
  const {
    control,
    getValues,
    setValue,
    formState: {errors}
  } = useFormContext();
  const [open, setOpen] = useState(false);
  const [scopes, setScopes] = useState([]);
  const [selectedScopes, setSelectedScopes] = useState([]);
  const {adminClient} = useAdminClient();
  const localeSort = useLocaleSort();
  useFetch(() => adminClient.clientScopes.find(), (scopes2) => {
    setSelectedScopes(getValues("clientScopes").map((s) => scopes2.find((c) => c.id === s.id)));
    setScopes(localeSort(scopes2, mapByKey("name")));
  }, []);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("clientScopes"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:clientScopes",
      fieldLabelId: "clients:clientScopes"
    }),
    fieldId: "clientScopes",
    helperTextInvalid: t("requiredClientScope"),
    validated: errors.clientScopes ? "error" : "default",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "clientScopes",
    control,
    defaultValue: [],
    rules: {
      validate: (value) => value.filter((c) => c.id).length > 0
    },
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement(AddScopeDialog, {
      clientScopes: scopes.filter((scope) => !value.map((c) => c.id).includes(scope.id)),
      isClientScopesConditionType: true,
      open,
      toggleDialog: () => setOpen(!open),
      onAdd: (scopes2) => {
        setSelectedScopes([
          ...selectedScopes,
          ...scopes2.map((s) => s.scope)
        ]);
        onChange([
          ...value,
          ...scopes2.map((scope) => scope.scope).map((item) => ({id: item.id, required: false}))
        ]);
      }
    }), /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "select-scope-button",
      variant: "secondary",
      onClick: () => {
        setOpen(true);
      }
    }, t("addClientScopes")))
  }), selectedScopes.length > 0 && /* @__PURE__ */ React.createElement(TableComposable, {
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, t("clientScope")), /* @__PURE__ */ React.createElement(Th, null, t("required")), /* @__PURE__ */ React.createElement(Th, null))), /* @__PURE__ */ React.createElement(Tbody, null, selectedScopes.map((scope, index) => /* @__PURE__ */ React.createElement(Tr, {
    key: scope.id
  }, /* @__PURE__ */ React.createElement(Td, null, scope.name), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Controller, {
    name: `clientScopes[${index}].required`,
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Checkbox, {
      id: "required",
      "data-testid": "standard",
      name: "required",
      isChecked: value,
      onChange
    })
  })), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    className: "keycloak__client-authorization__policy-row-remove",
    icon: /* @__PURE__ */ React.createElement(MinusCircleIcon, null),
    onClick: () => {
      setValue("clientScopes", [
        ...getValues("clientScopes").filter((s) => s.id !== scope.id)
      ]);
      setSelectedScopes([
        ...selectedScopes.filter((s) => s.id !== scope.id)
      ]);
    }
  })))))));
};
