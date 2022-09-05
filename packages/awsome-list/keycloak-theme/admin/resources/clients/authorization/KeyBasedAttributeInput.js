import React, {useEffect, useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {Controller, useFieldArray, useFormContext} from "../../_snowpack/pkg/react-hook-form.js";
import {
  Button,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {MinusCircleIcon, PlusCircleIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {camelCase} from "../../_snowpack/pkg/lodash-es.js";
import {defaultContextAttributes} from "../utils.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import "./key-based-attribute-input.css.proxy.js";
const ValueInput = ({
  name,
  rowIndex,
  attribute,
  selectableValues,
  resources
}) => {
  const {t} = useTranslation("common");
  const {control, register, getValues} = useFormContext();
  const [isValueOpenArray, setIsValueOpenArray] = useState([false]);
  const toggleValueSelect = (rowIndex2, open) => {
    const arr = [...isValueOpenArray];
    arr[rowIndex2] = open;
    setIsValueOpenArray(arr);
  };
  const attributeValues = useMemo(() => {
    let values = [];
    if (selectableValues) {
      values = defaultContextAttributes.find((attr) => attr.key === getValues().context?.[rowIndex]?.key)?.values;
    }
    return values;
  }, [getValues]);
  const renderSelectOptionType = () => {
    const scopeValues = resources?.find((resource) => resource.name === getValues().resources?.[rowIndex]?.key)?.scopes;
    if (attributeValues?.length && !resources) {
      return attributeValues.map((attr) => /* @__PURE__ */ React.createElement(SelectOption, {
        key: attr.key,
        value: attr.key
      }, attr.name));
    } else if (scopeValues?.length) {
      return scopeValues.map((scope) => /* @__PURE__ */ React.createElement(SelectOption, {
        key: scope.name,
        value: scope.name
      }, scope.name));
    }
  };
  const getMessageBundleKey = (attributeName) => camelCase(attributeName).replace(/\W/g, "");
  return /* @__PURE__ */ React.createElement(Td, null, resources || attributeValues?.length ? /* @__PURE__ */ React.createElement(Controller, {
    name: `${name}[${rowIndex}].value`,
    defaultValue: [],
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      id: `${attribute.id}-value`,
      className: "kc-attribute-value-selectable",
      name: `${name}[${rowIndex}].value`,
      chipGroupProps: {
        numChips: 1,
        expandedText: t("common:hide"),
        collapsedText: t("common:showRemaining")
      },
      toggleId: `group-${name}`,
      onToggle: (open) => toggleValueSelect(rowIndex, open),
      isOpen: isValueOpenArray[rowIndex],
      variant: SelectVariant.typeahead,
      typeAheadAriaLabel: t("clients:selectOrTypeAKey"),
      placeholderText: t("clients:selectOrTypeAKey"),
      selections: value,
      onSelect: (_, v) => {
        onChange(v);
        toggleValueSelect(rowIndex, false);
      }
    }, renderSelectOptionType())
  }) : /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    id: `${getMessageBundleKey(attribute.key)}-value`,
    className: "value-input",
    name: `${name}[${rowIndex}].value`,
    ref: register(),
    defaultValue: attribute.value,
    "data-testid": "attribute-value-input"
  }));
};
export const KeyBasedAttributeInput = ({
  name,
  selectableValues,
  resources
}) => {
  const {t} = useTranslation("common");
  const {control, watch} = useFormContext();
  const {fields, append, remove} = useFieldArray({
    control,
    name
  });
  const [isKeyOpenArray, setIsKeyOpenArray] = useState([false]);
  const toggleKeySelect = (rowIndex, open) => {
    const arr = [...isKeyOpenArray];
    arr[rowIndex] = open;
    setIsKeyOpenArray(arr);
  };
  useEffect(() => {
    if (!fields.length) {
      append({key: "", value: ""}, false);
    }
  }, [fields]);
  const watchLastValue = watch(`${name}[${fields.length - 1}].value`, "");
  return /* @__PURE__ */ React.createElement(TableComposable, {
    className: "kc-attributes__table",
    "aria-label": "Role attribute keys and values",
    variant: "compact",
    borders: false
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, {
    id: "key",
    width: 40
  }, t("key")), /* @__PURE__ */ React.createElement(Th, {
    id: "value",
    width: 40
  }, t("value")))), /* @__PURE__ */ React.createElement(Tbody, null, fields.map((attribute, rowIndex) => /* @__PURE__ */ React.createElement(Tr, {
    key: attribute.id,
    "data-testid": "attribute-row"
  }, /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Controller, {
    name: `${name}[${rowIndex}].key`,
    defaultValue: attribute.key,
    control,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      id: `${name}[${rowIndex}].key`,
      className: "kc-attribute-key-selectable",
      name: `${name}[${rowIndex}].key`,
      toggleId: `group-${name}`,
      onToggle: (open) => toggleKeySelect(rowIndex, open),
      isOpen: isKeyOpenArray[rowIndex],
      variant: SelectVariant.typeahead,
      typeAheadAriaLabel: t("clients:selectOrTypeAKey"),
      placeholderText: t("clients:selectOrTypeAKey"),
      selections: value,
      onSelect: (_, v) => {
        onChange(v.toString());
        toggleKeySelect(rowIndex, false);
      }
    }, selectableValues?.map((attribute2) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: attribute2.name === value,
      key: attribute2.key,
      value: resources ? attribute2.name : attribute2.key
    }, attribute2.name)))
  })), /* @__PURE__ */ React.createElement(ValueInput, {
    name,
    attribute,
    rowIndex,
    selectableValues,
    resources
  }), /* @__PURE__ */ React.createElement(Td, {
    key: "minus-button",
    id: `kc-minus-button-${rowIndex}`
  }, /* @__PURE__ */ React.createElement(Button, {
    id: `minus-button-${rowIndex}`,
    variant: "link",
    className: "kc-attributes__minus-icon",
    onClick: () => remove(rowIndex)
  }, /* @__PURE__ */ React.createElement(MinusCircleIcon, null))))), /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement(Button, {
    "aria-label": t("addAttribute"),
    id: "plus-icon",
    variant: "link",
    className: "kc-attributes__plus-icon",
    onClick: () => {
      append({key: "", value: ""});
      setIsKeyOpenArray([...isKeyOpenArray, false]);
    },
    icon: /* @__PURE__ */ React.createElement(PlusCircleIcon, null),
    isDisabled: !watchLastValue,
    "data-testid": "attribute-add-row"
  }, t("addAttribute"))))));
};
