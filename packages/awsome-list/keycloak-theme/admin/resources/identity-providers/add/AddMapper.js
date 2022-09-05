import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams} from "../../_snowpack/pkg/react-router-dom.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {FormProvider, useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  AlertVariant,
  Button,
  ButtonVariant,
  DropdownItem,
  FormGroup,
  PageSection,
  ValidatedOptions
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {
  toIdentityProviderEditMapper
} from "../routes/EditMapper.js";
import {convertFormValuesToObject, convertToFormValues} from "../../util.js";
import {toIdentityProvider} from "../routes/IdentityProvider.js";
import {AddMapperForm} from "./AddMapperForm.js";
import {DynamicComponents} from "../../components/dynamic/DynamicComponents.js";
import {KeycloakSpinner} from "../../components/keycloak-spinner/KeycloakSpinner.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import useLocaleSort, {mapByKey} from "../../utils/useLocaleSort.js";
export default function AddMapper() {
  const {t} = useTranslation("identity-providers");
  const form = useForm({
    shouldUnregister: false
  });
  const {handleSubmit, register, errors} = form;
  const {addAlert, addError} = useAlerts();
  const history = useHistory();
  const localeSort = useLocaleSort();
  const {realm} = useRealm();
  const {adminClient} = useAdminClient();
  const {providerId, alias} = useParams();
  const {id} = useParams();
  const [mapperTypes, setMapperTypes] = useState();
  const [currentMapper, setCurrentMapper] = useState();
  const save = async (idpMapper) => {
    const mapper = convertFormValuesToObject(idpMapper);
    const attributes = JSON.stringify(idpMapper.config.attributes ?? []);
    const claims = JSON.stringify(idpMapper.config.claims ?? []);
    const identityProviderMapper = {
      ...mapper,
      config: {
        ...mapper.config,
        attributes,
        claims
      },
      identityProviderAlias: alias
    };
    if (id) {
      try {
        await adminClient.identityProviders.updateMapper({
          id,
          alias
        }, {...identityProviderMapper, name: currentMapper?.name});
        addAlert(t("mapperSaveSuccess"), AlertVariant.success);
      } catch (error) {
        addError(t("mapperSaveError"), error);
      }
    } else {
      try {
        const createdMapper = await adminClient.identityProviders.createMapper({
          identityProviderMapper,
          alias
        });
        addAlert(t("mapperCreateSuccess"), AlertVariant.success);
        history.push(toIdentityProviderEditMapper({
          realm,
          alias,
          providerId,
          id: createdMapper.id
        }));
      } catch (error) {
        addError(t("mapperCreateError"), error);
      }
    }
  };
  const [toggleDeleteMapperDialog, DeleteMapperConfirm] = useConfirmDialog({
    titleKey: "identity-providers:deleteProviderMapper",
    messageKey: t("identity-providers:deleteMapperConfirm", {
      mapper: currentMapper?.name
    }),
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        await adminClient.identityProviders.delMapper({
          alias,
          id
        });
        addAlert(t("deleteMapperSuccess"), AlertVariant.success);
        history.push(toIdentityProvider({providerId, alias, tab: "mappers", realm}));
      } catch (error) {
        addError("identity-providers:deleteErrorError", error);
      }
    }
  });
  useFetch(() => Promise.all([
    id ? adminClient.identityProviders.findOneMapper({alias, id}) : null,
    adminClient.identityProviders.findMapperTypes({alias})
  ]), ([mapper, mapperTypes2]) => {
    const mappers = localeSort(Object.values(mapperTypes2), mapByKey("name"));
    if (mapper) {
      setCurrentMapper(mappers.find(({id: id2}) => id2 === mapper.identityProviderMapper));
      setupForm(mapper);
    } else {
      setCurrentMapper(mappers[0]);
    }
    setMapperTypes(mappers);
  }, []);
  const setupForm = (mapper) => {
    convertToFormValues(mapper, form.setValue);
    form.setValue("config.attributes", JSON.parse(mapper.config.attributes));
    form.setValue("config.claims", JSON.parse(mapper.config.claims));
  };
  if (!mapperTypes || !currentMapper) {
    return /* @__PURE__ */ React.createElement(KeycloakSpinner, null);
  }
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(DeleteMapperConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    className: "kc-add-mapper-title",
    titleKey: id ? t("editIdPMapper", {
      providerId: providerId[0].toUpperCase() + providerId.substring(1)
    }) : t("addIdPMapper", {
      providerId: providerId[0].toUpperCase() + providerId.substring(1)
    }),
    dropdownItems: id ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        onClick: toggleDeleteMapperDialog
      }, t("common:delete"))
    ] : void 0,
    divider: true
  }), /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-identity-providers",
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    className: "pf-u-mt-lg"
  }, id && /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:id"),
    fieldId: "kc-mapper-id",
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register(),
    type: "text",
    value: currentMapper.id,
    "datatest-id": "name-input",
    id: "kc-name",
    name: "name",
    isDisabled: !!id,
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), currentMapper.properties && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(AddMapperForm, {
    form,
    id,
    mapperTypes,
    updateMapperType: setCurrentMapper,
    mapperType: currentMapper
  }), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: currentMapper.properties
  })), " "), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    "data-testid": "new-mapper-save-button",
    variant: "primary",
    type: "submit"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toIdentityProvider({
        realm,
        providerId,
        alias,
        tab: "settings"
      })
    })
  }, t("common:cancel")))));
}
