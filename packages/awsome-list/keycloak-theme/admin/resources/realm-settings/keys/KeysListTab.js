import React, {useState} from "../../_snowpack/pkg/react.js";
import {useHistory} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  ButtonVariant,
  PageSection,
  Select,
  SelectOption,
  SelectVariant
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {cellWidth} from "../../_snowpack/pkg/@patternfly/react-table.js";
import {FilterIcon} from "../../_snowpack/pkg/@patternfly/react-icons.js";
import {ListEmptyState} from "../../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../../components/table-toolbar/KeycloakDataTable.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {emptyFormatter} from "../../util.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {toKeysTab} from "../routes/KeysTab.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import useToggle from "../../utils/useToggle.js";
import "../realm-settings-section.css.proxy.js";
const FILTER_OPTIONS = ["ACTIVE", "PASSIVE", "DISABLED"];
const SelectFilter = ({onFilter}) => {
  const {t} = useTranslation("realm-settings");
  const [filterType, setFilterType] = useState(FILTER_OPTIONS[0]);
  const [filterDropdownOpen, toggleFilter] = useToggle();
  return /* @__PURE__ */ React.createElement(Select, {
    width: 300,
    "data-testid": "filter-type-select",
    isOpen: filterDropdownOpen,
    className: "kc-filter-type-select",
    variant: SelectVariant.single,
    onToggle: toggleFilter,
    toggleIcon: /* @__PURE__ */ React.createElement(FilterIcon, null),
    onSelect: (_, value) => {
      const filter = FILTER_OPTIONS.find((o) => o === value.toString()) || FILTER_OPTIONS[0];
      setFilterType(filter);
      onFilter(filter);
      toggleFilter();
    },
    selections: filterType
  }, FILTER_OPTIONS.map((option) => /* @__PURE__ */ React.createElement(SelectOption, {
    key: option,
    "data-testid": `${option}-option`,
    value: option
  }, t(`keysFilter.${option}`))));
};
export const KeysListTab = ({realmComponents}) => {
  const {t} = useTranslation("realm-settings");
  const history = useHistory();
  const [publicKey, setPublicKey] = useState("");
  const [certificate, setCertificate] = useState("");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const [keyData, setKeyData] = useState();
  const [filteredKeyData, setFilteredKeyData] = useState();
  useFetch(async () => {
    const keysMetaData = await adminClient.realms.getKeys({realm});
    return keysMetaData.keys?.map((key) => {
      const provider = realmComponents.find((component) => component.id === key.providerId);
      return {...key, provider: provider?.name};
    });
  }, setKeyData, []);
  const [togglePublicKeyDialog, PublicKeyDialog] = useConfirmDialog({
    titleKey: t("publicKeys").slice(0, -1),
    messageKey: publicKey,
    continueButtonLabel: "common:close",
    continueButtonVariant: ButtonVariant.primary,
    onConfirm: () => Promise.resolve()
  });
  const [toggleCertificateDialog, CertificateDialog] = useConfirmDialog({
    titleKey: t("certificate"),
    messageKey: certificate,
    continueButtonLabel: "common:close",
    continueButtonVariant: ButtonVariant.primary,
    onConfirm: () => Promise.resolve()
  });
  const ProviderRenderer = ({provider}) => provider;
  const ButtonRenderer = ({type, publicKey: publicKey2, certificate: certificate2}) => {
    if (type === "EC") {
      return /* @__PURE__ */ React.createElement(Button, {
        onClick: () => {
          togglePublicKeyDialog();
          setPublicKey(publicKey2);
        },
        variant: "secondary",
        id: "kc-public-key"
      }, t("publicKeys").slice(0, -1));
    } else if (type === "RSA") {
      return /* @__PURE__ */ React.createElement("div", {
        className: "button-wrapper"
      }, /* @__PURE__ */ React.createElement(Button, {
        onClick: () => {
          togglePublicKeyDialog();
          setPublicKey(publicKey2);
        },
        variant: "secondary",
        id: publicKey2
      }, t("publicKeys").slice(0, -1)), /* @__PURE__ */ React.createElement(Button, {
        onClick: () => {
          toggleCertificateDialog();
          setCertificate(certificate2);
        },
        variant: "secondary",
        id: certificate2,
        className: "kc-certificate"
      }, t("certificate")));
    }
  };
  if (!keyData) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    padding: {default: "noPadding"}
  }, /* @__PURE__ */ React.createElement(PublicKeyDialog, null), /* @__PURE__ */ React.createElement(CertificateDialog, null), /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    isNotCompact: true,
    className: "kc-keys-list",
    loader: filteredKeyData || keyData,
    ariaLabelKey: "realm-settings:keysList",
    searchPlaceholderKey: "realm-settings:searchKey",
    searchTypeComponent: /* @__PURE__ */ React.createElement(SelectFilter, {
      onFilter: (filterType) => setFilteredKeyData(filterType !== FILTER_OPTIONS[0] ? keyData.filter(({status}) => status === filterType) : void 0)
    }),
    canSelectAll: true,
    columns: [
      {
        name: "algorithm",
        displayKey: "realm-settings:algorithm",
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(15)]
      },
      {
        name: "type",
        displayKey: "type",
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(10)]
      },
      {
        name: "kid",
        displayKey: "realm-settings:kid",
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(10)]
      },
      {
        name: "provider",
        displayKey: "realm-settings:provider",
        cellRenderer: ProviderRenderer,
        cellFormatters: [emptyFormatter()],
        transforms: [cellWidth(10)]
      },
      {
        name: "publicKeys",
        displayKey: "realm-settings:publicKeys",
        cellRenderer: ButtonRenderer,
        cellFormatters: [],
        transforms: [cellWidth(20)]
      }
    ],
    isSearching: !!filteredKeyData,
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noKeys"),
      instructions: t("noKeysDescription"),
      primaryActionText: t("addProvider"),
      onPrimaryAction: () => history.push(toKeysTab({realm, tab: "providers"}))
    })
  }));
};
