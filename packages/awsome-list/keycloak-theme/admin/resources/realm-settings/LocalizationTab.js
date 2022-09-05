import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {cloneDeep, isEqual, uniqWith} from "../_snowpack/pkg/lodash-es.js";
import {Controller, useForm, useWatch} from "../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  Divider,
  FormGroup,
  PageSection,
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  Switch,
  TextContent,
  ToolbarItem
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../components/form-access/FormAccess.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {FormPanel} from "../components/scroll-form/FormPanel.js";
import {useAdminClient, useFetch} from "../context/auth/AdminClient.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {AddMessageBundleModal} from "./AddMessageBundleModal.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {HelpItem} from "../components/help-enabler/HelpItem.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {DEFAULT_LOCALE} from "../i18n.js";
import {
  EditableTextCell,
  validateCellEdits,
  cancelCellEdits,
  applyCellEdits,
  TableBody,
  TableHeader,
  Table,
  TableVariant
} from "../_snowpack/pkg/@patternfly/react-table.js";
import {PaginatingTableToolbar} from "../components/table-toolbar/PaginatingTableToolbar.js";
import {SearchIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {useWhoAmI} from "../context/whoami/WhoAmI.js";
import {convertToFormValues} from "../util.js";
export var RowEditAction;
(function(RowEditAction2) {
  RowEditAction2["Save"] = "save";
  RowEditAction2["Cancel"] = "cancel";
  RowEditAction2["Edit"] = "edit";
})(RowEditAction || (RowEditAction = {}));
export const LocalizationTab = ({save, realm}) => {
  const {t} = useTranslation("realm-settings");
  const {adminClient} = useAdminClient();
  const [addMessageBundleModalOpen, setAddMessageBundleModalOpen] = useState(false);
  const [supportedLocalesOpen, setSupportedLocalesOpen] = useState(false);
  const [defaultLocaleOpen, setDefaultLocaleOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectMenuLocale, setSelectMenuLocale] = useState(DEFAULT_LOCALE);
  const {setValue, getValues, control, handleSubmit, formState} = useForm({
    shouldUnregister: false
  });
  const [selectMenuValueSelected, setSelectMenuValueSelected] = useState(false);
  const [messageBundles, setMessageBundles] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const themeTypes = useServerInfo().themes;
  const bundleForm = useForm({mode: "onChange"});
  const {addAlert, addError} = useAlerts();
  const {realm: currentRealm} = useRealm();
  const {whoAmI} = useWhoAmI();
  const setupForm = () => {
    convertToFormValues(realm, setValue);
    if (realm.supportedLocales?.length === 0) {
      setValue("supportedLocales", [DEFAULT_LOCALE]);
    }
  };
  useEffect(setupForm, []);
  const watchSupportedLocales = useWatch({
    control,
    name: "supportedLocales",
    defaultValue: [DEFAULT_LOCALE]
  });
  const internationalizationEnabled = useWatch({
    control,
    name: "internationalizationEnabled",
    defaultValue: false
  });
  const [tableKey, setTableKey] = useState(0);
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const [filter, setFilter] = useState("");
  const refreshTable = () => {
    setTableKey(tableKey + 1);
  };
  useFetch(async () => {
    let result = await adminClient.realms.getRealmLocalizationTexts({
      first,
      max,
      realm: realm.realm,
      selectedLocale: selectMenuLocale || getValues("defaultLocale") || whoAmI.getLocale()
    }).catch(() => []);
    const searchInBundles = (idx) => {
      return Object.entries(result).filter((i) => i[idx].includes(filter));
    };
    if (filter) {
      const filtered = uniqWith(searchInBundles(0).concat(searchInBundles(1)), isEqual);
      result = Object.fromEntries(filtered);
    }
    return {result};
  }, ({result}) => {
    const bundles = Object.entries(result).slice(first, first + max + 1);
    setMessageBundles(bundles);
    const updatedRows = bundles.map((messageBundle) => ({
      rowEditBtnAriaLabel: () => t("rowEditBtnAriaLabel", {
        messageBundle: messageBundle[1]
      }),
      rowSaveBtnAriaLabel: () => t("rowSaveBtnAriaLabel", {
        messageBundle: messageBundle[1]
      }),
      rowCancelBtnAriaLabel: () => t("rowCancelBtnAriaLabel", {
        messageBundle: messageBundle[1]
      }),
      cells: [
        {
          title: (value, rowIndex, cellIndex, props) => /* @__PURE__ */ React.createElement(EditableTextCell, {
            value,
            rowIndex,
            cellIndex,
            props,
            isDisabled: true,
            handleTextInputChange,
            inputAriaLabel: messageBundle[0]
          }),
          props: {
            value: messageBundle[0]
          }
        },
        {
          title: (value, rowIndex, cellIndex, props) => /* @__PURE__ */ React.createElement(EditableTextCell, {
            value,
            rowIndex,
            cellIndex,
            props,
            handleTextInputChange,
            inputAriaLabel: messageBundle[1]
          }),
          props: {
            value: messageBundle[1]
          }
        }
      ]
    }));
    setTableRows(updatedRows);
    return bundles;
  }, [tableKey, filter, first, max]);
  const handleTextInputChange = (newValue, evt, rowIndex, cellIndex) => {
    setTableRows((prev) => {
      const newRows = cloneDeep(prev);
      const textCell = newRows[rowIndex]?.cells?.[cellIndex];
      textCell.props.editableValue = newValue;
      return newRows;
    });
  };
  const updateEditableRows = async (type, rowIndex, validationErrors) => {
    if (rowIndex === void 0) {
      return;
    }
    const newRows = cloneDeep(tableRows);
    let newRow;
    const invalid = !!validationErrors && Object.keys(validationErrors).length > 0;
    if (invalid) {
      newRow = validateCellEdits(newRows[rowIndex], type, validationErrors);
    } else if (type === RowEditAction.Cancel) {
      newRow = cancelCellEdits(newRows[rowIndex]);
    } else {
      newRow = applyCellEdits(newRows[rowIndex], type);
    }
    newRows[rowIndex] = newRow;
    if (!invalid && type === RowEditAction.Save) {
      const key = (newRow.cells?.[0]).props.value;
      const value = (newRow.cells?.[1]).props.value;
      try {
        await adminClient.realms.addLocalization({
          realm: realm.realm,
          selectedLocale: selectMenuLocale || getValues("defaultLocale") || DEFAULT_LOCALE,
          key
        }, value);
        addAlert(t("updateMessageBundleSuccess"), AlertVariant.success);
      } catch (error) {
        addAlert(t("updateMessageBundleError"), AlertVariant.danger);
      }
    }
    setTableRows(newRows);
  };
  const handleModalToggle = () => {
    setAddMessageBundleModalOpen(!addMessageBundleModalOpen);
  };
  const options = [
    /* @__PURE__ */ React.createElement(SelectGroup, {
      label: t("defaultLocale"),
      key: "group1"
    }, /* @__PURE__ */ React.createElement(SelectOption, {
      key: DEFAULT_LOCALE,
      value: DEFAULT_LOCALE
    }, t(`allSupportedLocales.${DEFAULT_LOCALE}`))),
    /* @__PURE__ */ React.createElement(Divider, {
      key: "divider"
    }),
    /* @__PURE__ */ React.createElement(SelectGroup, {
      label: t("supportedLocales"),
      key: "group2"
    }, watchSupportedLocales.filter((item) => item !== realm.defaultLocale).map((locale) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: locale,
      value: locale
    }, t(`allSupportedLocales.${locale}`))))
  ];
  const addKeyValue = async (pair) => {
    try {
      await adminClient.realms.addLocalization({
        realm: currentRealm,
        selectedLocale: selectMenuLocale || getValues("defaultLocale") || DEFAULT_LOCALE,
        key: pair.key
      }, pair.value);
      adminClient.setConfig({
        realmName: currentRealm
      });
      refreshTable();
      addAlert(t("addMessageBundleSuccess"), AlertVariant.success);
    } catch (error) {
      addError(t("addMessageBundleError"), error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, addMessageBundleModalOpen && /* @__PURE__ */ React.createElement(AddMessageBundleModal, {
    handleModalToggle,
    save: (pair) => {
      addKeyValue(pair);
      handleModalToggle();
    },
    form: bundleForm
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    role: "manage-realm",
    className: "pf-u-mt-lg",
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("internationalization"),
    fieldId: "kc-internationalization",
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "realm-settings-help:internationalization",
      fieldLabelId: "realm-settings:internationalization"
    })
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "internationalizationEnabled",
    control,
    defaultValue: false,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Switch, {
      id: "kc-l-internationalization",
      label: t("common:enabled"),
      labelOff: t("common:disabled"),
      isChecked: internationalizationEnabled,
      "data-testid": value ? "internationalization-enabled" : "internationalization-disabled",
      onChange
    })
  })), internationalizationEnabled && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("supportedLocales"),
    fieldId: "kc-l-supported-locales"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "supportedLocales",
    control,
    defaultValue: [DEFAULT_LOCALE],
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-l-supported-locales",
      onToggle: (open) => {
        setSupportedLocalesOpen(open);
      },
      onSelect: (_, v) => {
        const option = v;
        if (value.includes(option)) {
          onChange(value.filter((item) => item !== option || option === DEFAULT_LOCALE));
        } else {
          onChange([...value, option]);
        }
      },
      onClear: () => {
        onChange([DEFAULT_LOCALE]);
      },
      selections: value,
      variant: SelectVariant.typeaheadMulti,
      "aria-label": t("supportedLocales"),
      isOpen: supportedLocalesOpen,
      placeholderText: t("selectLocales")
    }, themeTypes.login[0].locales.map((locale) => /* @__PURE__ */ React.createElement(SelectOption, {
      selected: value.includes(locale),
      key: locale,
      value: locale
    }, t(`allSupportedLocales.${locale}`))))
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("defaultLocale"),
    fieldId: "kc-l-default-locale"
  }, /* @__PURE__ */ React.createElement(Controller, {
    name: "defaultLocale",
    control,
    defaultValue: DEFAULT_LOCALE,
    render: ({onChange, value}) => /* @__PURE__ */ React.createElement(Select, {
      toggleId: "kc-default-locale",
      onToggle: () => setDefaultLocaleOpen(!defaultLocaleOpen),
      onSelect: (_, value2) => {
        onChange(value2);
        setDefaultLocaleOpen(false);
      },
      selections: value ? t(`allSupportedLocales.${value}`) : realm.defaultLocale !== "" ? t(`allSupportedLocales.${realm.defaultLocale || DEFAULT_LOCALE}`) : t("placeholderText"),
      variant: SelectVariant.single,
      "aria-label": t("defaultLocale"),
      isOpen: defaultLocaleOpen,
      placeholderText: t("placeholderText"),
      "data-testid": "select-default-locale"
    }, watchSupportedLocales.map((locale, idx) => /* @__PURE__ */ React.createElement(SelectOption, {
      key: `default-locale-${idx}`,
      value: locale
    }, t(`allSupportedLocales.${locale}`))))
  }))), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    isDisabled: !formState.isDirty,
    type: "submit",
    "data-testid": "localization-tab-save"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    onClick: setupForm
  }, t("common:revert")))), /* @__PURE__ */ React.createElement(FormPanel, {
    className: "kc-message-bundles",
    title: "Edit message bundles"
  }, /* @__PURE__ */ React.createElement(TextContent, {
    className: "messageBundleDescription"
  }, t("messageBundleDescription")), /* @__PURE__ */ React.createElement("div", {
    className: "tableBorder"
  }, /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: messageBundles.length,
    first,
    max,
    onNextClick: setFirst,
    onPreviousClick: setFirst,
    onPerPageSelect: (first2, max2) => {
      setFirst(first2);
      setMax(max2);
    },
    inputGroupName: "common:search",
    inputGroupOnEnter: (search) => {
      setFilter(search);
      setFirst(0);
      setMax(10);
    },
    inputGroupPlaceholder: t("searchForMessageBundle"),
    toolbarItem: /* @__PURE__ */ React.createElement(Button, {
      "data-testid": "add-bundle-button",
      onClick: () => setAddMessageBundleModalOpen(true)
    }, t("addMessageBundle")),
    searchTypeComponent: /* @__PURE__ */ React.createElement(ToolbarItem, null, /* @__PURE__ */ React.createElement(Select, {
      width: 180,
      "data-testid": "filter-by-locale-select",
      isOpen: filterDropdownOpen,
      className: "kc-filter-by-locale-select",
      variant: SelectVariant.single,
      isDisabled: !internationalizationEnabled,
      onToggle: (isExpanded) => setFilterDropdownOpen(isExpanded),
      onSelect: (_, value) => {
        setSelectMenuLocale(value.toString());
        setSelectMenuValueSelected(true);
        refreshTable();
        setFilterDropdownOpen(false);
      },
      selections: selectMenuValueSelected ? t(`allSupportedLocales.${selectMenuLocale}`) : realm.defaultLocale !== "" ? t(`allSupportedLocales.${DEFAULT_LOCALE}`) : t("placeholderText")
    }, options))
  }, messageBundles.length === 0 && !filter && /* @__PURE__ */ React.createElement(ListEmptyState, {
    hasIcon: true,
    message: t("noMessageBundles"),
    instructions: t("noMessageBundlesInstructions"),
    onPrimaryAction: handleModalToggle
  }), messageBundles.length === 0 && filter && /* @__PURE__ */ React.createElement(ListEmptyState, {
    hasIcon: true,
    icon: SearchIcon,
    isSearchVariant: true,
    message: t("common:noSearchResults"),
    instructions: t("common:noSearchResultsInstructions")
  }), messageBundles.length !== 0 && /* @__PURE__ */ React.createElement(Table, {
    "aria-label": t("editableRowsTable"),
    "data-testid": "editable-rows-table",
    variant: TableVariant.compact,
    cells: [t("common:key"), t("common:value")],
    rows: tableRows,
    onRowEdit: (_, type, _b, rowIndex, validation) => updateEditableRows(type, rowIndex, validation)
  }, /* @__PURE__ */ React.createElement(TableHeader, null), /* @__PURE__ */ React.createElement(TableBody, null)))))));
};
