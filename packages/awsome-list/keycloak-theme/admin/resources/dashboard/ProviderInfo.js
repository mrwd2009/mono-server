import React, {useMemo, useState} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {ExpandableSection, PageSection} from "../_snowpack/pkg/@patternfly/react-core.js";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "../_snowpack/pkg/@patternfly/react-table.js";
import {useServerInfo} from "../context/server-info/ServerInfoProvider.js";
import {TableToolbar} from "../components/table-toolbar/TableToolbar.js";
import {isDefined} from "../utils/isDefined.js";
export const ProviderInfo = () => {
  const {t} = useTranslation("dashboard");
  const serverInfo = useServerInfo();
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState([]);
  const providerInfo = useMemo(() => Object.entries(serverInfo.providers || []).filter(([key]) => key.includes(filter)), [filter]);
  const toggleOpen = (option) => {
    if (open.includes(option)) {
      setOpen(open.filter((item) => item !== option));
    } else {
      setOpen([...open, option]);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(TableToolbar, {
    inputGroupName: "search",
    inputGroupPlaceholder: t("common:search"),
    inputGroupOnEnter: setFilter
  }, /* @__PURE__ */ React.createElement(TableComposable, {
    variant: "compact"
  }, /* @__PURE__ */ React.createElement(Thead, null, /* @__PURE__ */ React.createElement(Tr, null, /* @__PURE__ */ React.createElement(Th, {
    width: 20
  }, t("spi")), /* @__PURE__ */ React.createElement(Th, null, t("providers")))), /* @__PURE__ */ React.createElement(Tbody, null, providerInfo.map(([name, {providers}]) => /* @__PURE__ */ React.createElement(Tr, {
    key: name
  }, /* @__PURE__ */ React.createElement(Td, null, name), /* @__PURE__ */ React.createElement(Td, null, /* @__PURE__ */ React.createElement("ul", null, Object.entries(providers).map(([key]) => /* @__PURE__ */ React.createElement("li", {
    key
  }, key))), Object.entries(providers).map(([key, {operationalInfo}]) => operationalInfo ? /* @__PURE__ */ React.createElement(ExpandableSection, {
    key,
    isExpanded: open.includes(key),
    onToggle: () => toggleOpen(key),
    toggleText: open.includes(key) ? t("showLess") : t("showMore")
  }, /* @__PURE__ */ React.createElement(TableComposable, {
    borders: false
  }, /* @__PURE__ */ React.createElement(Tbody, null, Object.entries(operationalInfo).map(([key2, value]) => /* @__PURE__ */ React.createElement(Tr, {
    key: key2
  }, /* @__PURE__ */ React.createElement(Td, null, key2), /* @__PURE__ */ React.createElement(Td, null, value)))))) : null).filter(isDefined))))))));
};
