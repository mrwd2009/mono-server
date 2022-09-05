import React, {useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useFormContext, Controller} from "../../../_snowpack/pkg/react-hook-form.js";
import {MinusCircleIcon} from "../../../_snowpack/pkg/@patternfly/react-icons.js";
import {FormGroup, Button, Checkbox} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "../../../_snowpack/pkg/@patternfly/react-table.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {GroupPickerDialog} from "../../../components/group/GroupPickerDialog.js";
import {KeycloakTextInput} from "../../../components/keycloak-text-input/KeycloakTextInput.js";
export const Group = () => {
  const {t} = useTranslation("clients");
  const {
    control,
    register,
    getValues,
    setValue,
    formState: {errors}
  } = useFormContext();
  const values = getValues("groups");
  const [open, setOpen] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const {adminClient} = useAdminClient();
  useFetch(() => {
    if (values && values.length > 0)
      return Promise.all(values.map((g) => adminClient.groups.findOne({id: g.id})));
    return Promise.resolve([]);
  }, (groups) => {
    const filteredGroup = groups.filter((g) => g);
    setSelectedGroups(filteredGroup);
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("groupsClaim"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:groupsClaim",
      fieldLabelId: "clients:groupsClaim"
    }),
    fieldId: "groups"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "groupsClaim",
    name: "groupsClaim",
    "data-testid": "groupsClaim",
    ref: register
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("groups"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:policyGroups",
      fieldLabelId: "clients:groups"
    }),
    fieldId: "groups",
    helperTextInvalid: t("requiredGroups"),
    validated: errors.groups ? "error" : "default",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "groups",
    control,
    defaultValue: [],
    rules: {
      validate: (value) => value.filter(({id}) => id).length > 0
    },
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement(GroupPickerDialog, {
      type: "selectMany",
      text: {
        title: "clients:addGroupsToGroupPolicy",
        ok: "common:add"
      },
      onConfirm: (groups) => {
        onChange([
          ...value,
          ...(groups || []).map(({id}) => ({id}))
        ]);
        setSelectedGroups([...selectedGroups, ...groups || []]);
        setOpen(false);
      },
      onClose: () => {
        setOpen(false);
      },
      filterGroups: selectedGroups.map(({name}) => name)
    }), /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "select-group-button",
      variant: "secondary",
      onClick: () => {
        setOpen(true);
      }
    }, t("addGroups")))
  }), selectedGroups.length > 0 && /* @__PURE__ */ React.createElement(TableComposable, {
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, t("groups")), /* @__PURE__ */ React.createElement(Th, null, t("extendToChildren")), /* @__PURE__ */ React.createElement(Th, null))), /* @__PURE__ */ React.createElement(Tbody, null, selectedGroups.map((group, index) => /* @__PURE__ */ React.createElement(Tr, {
    key: group.id
  }, /* @__PURE__ */ React.createElement(Td, null, group.path), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Controller, {
    name: `groups[${index}].extendChildren`,
    defaultValue: false,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Checkbox, {
      id: "extendChildren",
      "data-testid": "standard",
      name: "extendChildren",
      isChecked: value,
      onChange,
      isDisabled: group.subGroups?.length === 0
    })
  })), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    className: "keycloak__client-authorization__policy-row-remove",
    icon: /* @__PURE__ */ React.createElement(MinusCircleIcon, null),
    onClick: () => {
      setValue("groups", [
        ...(values || []).filter(({id}) => id !== group.id)
      ]);
      setSelectedGroups([
        ...selectedGroups.filter(({id}) => id !== group.id)
      ]);
    }
  }))))))));
};
