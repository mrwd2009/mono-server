import React, {useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {useFormContext, Controller} from "../../../_snowpack/pkg/react-hook-form.js";
import {FormGroup, Button, Checkbox} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {MinusCircleIcon} from "../../../_snowpack/pkg/@patternfly/react-icons.js";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from "../../../_snowpack/pkg/@patternfly/react-table.js";
import {ServiceRole} from "../../../components/role-mapping/RoleMapping.js";
import {HelpItem} from "../../../components/help-enabler/HelpItem.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import {AddRoleMappingModal} from "../../../components/role-mapping/AddRoleMappingModal.js";
export const Role = () => {
  const {t} = useTranslation("clients");
  const {
    control,
    getValues,
    setValue,
    formState: {errors}
  } = useFormContext();
  const values = getValues("roles");
  const [open, setOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const {adminClient} = useAdminClient();
  useFetch(async () => {
    if (values && values.length > 0) {
      const roles = await Promise.all(values.map((r) => adminClient.roles.findOneById({id: r.id})));
      return Promise.all(roles.filter((r) => r?.clientRole).map(async (role) => ({
        role,
        client: await adminClient.clients.findOne({
          id: role?.containerId
        })
      })));
    }
    return Promise.resolve([]);
  }, setSelectedRoles, []);
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("roles"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "clients-help:policyRoles",
      fieldLabelId: "clients:roles"
    }),
    fieldId: "roles",
    helperTextInvalid: t("requiredRoles"),
    validated: errors.roles ? "error" : "default",
    isRequired: true
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "roles",
    control,
    defaultValue: [],
    rules: {
      validate: (value) => value.filter((c) => c.id).length > 0
    },
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement(AddRoleMappingModal, {
      id: "role",
      type: "roles",
      onAssign: (rows) => {
        onChange([
          ...value,
          ...rows.map((row) => ({id: row.role.id}))
        ]);
        setSelectedRoles([...selectedRoles, ...rows]);
        setOpen(false);
      },
      onClose: () => {
        setOpen(false);
      },
      isLDAPmapper: true
    }), /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "select-role-button",
      variant: "secondary",
      onClick: () => {
        setOpen(true);
      }
    }, t("addRoles")))
  }), selectedRoles.length > 0 && /* @__PURE__ */ React.createElement(TableComposable, {
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, null, t("roles")), /* @__PURE__ */ React.createElement(Th, null, t("required")), /* @__PURE__ */ React.createElement(Th, null))), /* @__PURE__ */ React.createElement(Tbody, null, selectedRoles.map((row, index) => /* @__PURE__ */ React.createElement(Tr, {
    key: row.role.id
  }, /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(ServiceRole, {
    role: row.role,
    client: row.client
  })), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Controller, {
    name: `roles[${index}].required`,
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
      setValue("roles", [
        ...(values || []).filter((s) => s.id !== row.role.id)
      ]);
      setSelectedRoles([
        ...selectedRoles.filter((s) => s.role.id !== row.role.id)
      ]);
    }
  })))))));
};
