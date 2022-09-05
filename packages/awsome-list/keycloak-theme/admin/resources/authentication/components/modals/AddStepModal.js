import React, {useMemo, useState} from "../../../_snowpack/pkg/react.js";
import {useTranslation} from "../../../_snowpack/pkg/react-i18next.js";
import {
  Button,
  ButtonVariant,
  Form,
  Modal,
  ModalVariant,
  PageSection,
  Radio
} from "../../../_snowpack/pkg/@patternfly/react-core.js";
import {PaginatingTableToolbar} from "../../../components/table-toolbar/PaginatingTableToolbar.js";
import {useAdminClient, useFetch} from "../../../context/auth/AdminClient.js";
import useLocaleSort, {mapByKey} from "../../../utils/useLocaleSort.js";
import {providerConditionFilter} from "../../FlowDetails.js";
const AuthenticationProviderList = ({
  list,
  setValue
}) => {
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light",
    className: "pf-u-py-lg"
  }, /* @__PURE__ */ React.createElement(Form, {
    isHorizontal: true
  }, list?.map((provider) => /* @__PURE__ */ React.createElement(Radio, {
    id: provider.id,
    key: provider.id,
    name: "provider",
    label: provider.displayName,
    "data-testid": provider.id,
    description: provider.description,
    onChange: (_val, event) => {
      const {id} = event.currentTarget;
      const value = list.find((p) => p.id === id);
      setValue(value);
    }
  }))));
};
export const AddStepModal = ({name, type, onSelect}) => {
  const {t} = useTranslation("authentication");
  const {adminClient} = useAdminClient();
  const [value, setValue] = useState();
  const [providers, setProviders] = useState();
  const [max, setMax] = useState(10);
  const [first, setFirst] = useState(0);
  const localeSort = useLocaleSort();
  useFetch(async () => {
    switch (type) {
      case "client":
        return adminClient.authenticationManagement.getClientAuthenticatorProviders();
      case "form":
        return adminClient.authenticationManagement.getFormActionProviders();
      case "condition": {
        const providers2 = await adminClient.authenticationManagement.getAuthenticatorProviders();
        return providers2.filter(providerConditionFilter);
      }
      case "basic":
      default: {
        const providers2 = await adminClient.authenticationManagement.getAuthenticatorProviders();
        return providers2.filter((p) => !providerConditionFilter(p));
      }
    }
  }, (providers2) => setProviders(providers2), []);
  const page = useMemo(() => localeSort(providers ?? [], mapByKey("displayName")).slice(first, first + max + 1), [providers, first, max]);
  return /* @__PURE__ */ React.createElement(Modal, {
    variant: ModalVariant.medium,
    isOpen: true,
    title: t("addStepTo", {name}),
    onClose: () => onSelect(),
    actions: [
      /* @__PURE__ */ React.createElement(Button, {
        id: "modal-add",
        "data-testid": "modal-add",
        key: "add",
        onClick: () => onSelect(value)
      }, t("common:add")),
      /* @__PURE__ */ React.createElement(Button, {
        "data-testid": "cancel",
        id: "modal-cancel",
        key: "cancel",
        variant: ButtonVariant.link,
        onClick: () => {
          onSelect();
        }
      }, t("common:cancel"))
    ]
  }, providers && providers.length > max && /* @__PURE__ */ React.createElement(PaginatingTableToolbar, {
    count: page.length || 0,
    first,
    max,
    onNextClick: setFirst,
    onPreviousClick: setFirst,
    onPerPageSelect: (first2, max2) => {
      setFirst(first2);
      setMax(max2);
    }
  }, /* @__PURE__ */ React.createElement(AuthenticationProviderList, {
    list: page,
    setValue
  })), providers && providers.length <= max && /* @__PURE__ */ React.createElement(AuthenticationProviderList, {
    list: providers,
    setValue
  }));
};
