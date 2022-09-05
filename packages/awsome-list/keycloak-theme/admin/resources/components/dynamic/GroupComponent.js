import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  Button,
  Chip,
  ChipGroup,
  FormGroup,
  InputGroup
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../help-enabler/HelpItem.js";
import {GroupPickerDialog} from "../group/GroupPickerDialog.js";
export const GroupComponent = ({name, label, helpText}) => {
  const {t} = useTranslation("dynamic");
  const [open, setOpen] = useState(false);
  const {control} = useFormContext();
  return /* @__PURE__ */ React.createElement(Controller, {
    name: `config.${name}`,
    defaultValue: "",
    typeAheadAriaLabel: t("selectGroup"),
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement(GroupPickerDialog, {
      type: "selectOne",
      text: {
        title: "dynamic:selectGroup",
        ok: "common:select"
      },
      onConfirm: (groups) => {
        onChange(groups?.[0].path);
        setOpen(false);
      },
      onClose: () => setOpen(false),
      filterGroups: value
    }), /* @__PURE__ */ React.createElement(FormGroup, {
      label: t(label),
      labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
        helpText: t(helpText),
        fieldLabelId: `dynamic:${label}`
      }),
      fieldId: name
    }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(ChipGroup, null, value && /* @__PURE__ */ React.createElement(Chip, {
      onClick: () => onChange(void 0)
    }, value)), /* @__PURE__ */ React.createElement(Button, {
      id: "kc-join-groups-button",
      onClick: () => setOpen(!open),
      variant: "secondary",
      "data-testid": "join-groups-button"
    }, t("selectGroup")))))
  });
};
