import React, {Fragment, useEffect} from "../../_snowpack/pkg/react.js";
import {useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  TextInput,
  Button,
  ButtonVariant,
  InputGroup
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {MinusCircleIcon, PlusCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
export const MultiLineInput = ({
  name,
  addButtonLabel,
  isDisabled = false,
  defaultValue,
  ...rest
}) => {
  const {t} = useTranslation();
  const {register, watch, setValue} = useFormContext();
  const value = watch(name, defaultValue);
  const fields = Array.isArray(value) && value.length !== 0 ? value : [""];
  const remove = (index) => {
    setValue(name, [...fields.slice(0, index), ...fields.slice(index + 1)]);
  };
  const append = () => {
    setValue(name, [...fields, ""]);
  };
  useEffect(() => register(name), [register]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, fields.map((value2, index) => /* @__PURE__ */ React.createElement(Fragment, {
    key: index
  }, /* @__PURE__ */ React.createElement(InputGroup, null, /* @__PURE__ */ React.createElement(TextInput, {
    id: name + index,
    onChange: (value3) => {
      setValue(name, [
        ...fields.slice(0, index),
        value3,
        ...fields.slice(index + 1)
      ]);
    },
    name: `${name}[${index}]`,
    value: value2,
    isDisabled,
    ...rest
  }), /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.link,
    onClick: () => remove(index),
    tabIndex: -1,
    "aria-label": t("common:remove"),
    isDisabled: index === fields.length - 1
  }, /* @__PURE__ */ React.createElement(MinusCircleIcon, null))), index === fields.length - 1 && /* @__PURE__ */ React.createElement(Button, {
    variant: ButtonVariant.link,
    onClick: append,
    tabIndex: -1,
    "aria-label": t("common:add"),
    "data-testid": "addValue",
    isDisabled: !value2
  }, /* @__PURE__ */ React.createElement(PlusCircleIcon, null), " ", t(addButtonLabel || "common:add")))));
};
