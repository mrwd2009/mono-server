import React, {useState} from "../../_snowpack/pkg/react.js";
import {Link, useHistory, useParams, useRouteMatch} from "../../_snowpack/pkg/react-router-dom.js";
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
import {ViewHeader} from "../../components/view-header/ViewHeader.js";
import {useAdminClient, useFetch} from "../../context/auth/AdminClient.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useServerInfo} from "../../context/server-info/ServerInfoProvider.js";
import {convertFormValuesToObject, convertToFormValues} from "../../util.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {MapperRoute} from "../routes/Mapper.js";
import {toClientScope} from "../routes/ClientScope.js";
import {DynamicComponents} from "../../components/dynamic/DynamicComponents.js";
import {KeycloakTextInput} from "../../components/keycloak-text-input/KeycloakTextInput.js";
import "./mapping-details.css.proxy.js";
export default function MappingDetails() {
  const {t} = useTranslation("client-scopes");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {id, mapperId, type} = useParams();
  const form = useForm();
  const {register, setValue, errors, handleSubmit} = form;
  const [mapping, setMapping] = useState();
  const [config, setConfig] = useState();
  const history = useHistory();
  const {realm} = useRealm();
  const serverInfo = useServerInfo();
  const isGuid = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/;
  const isUpdating = !!mapperId.match(isGuid);
  const isOnClientScope = !!useRouteMatch(MapperRoute.path);
  const toDetails = () => isOnClientScope ? toClientScope({realm, id, type, tab: "mappers"}) : `/${realm}/clients/${id}/mappers`;
  useFetch(async () => {
    let data;
    if (isUpdating) {
      if (isOnClientScope) {
        data = await adminClient.clientScopes.findProtocolMapper({
          id,
          mapperId
        });
      } else {
        data = await adminClient.clients.findProtocolMapperById({
          id,
          mapperId
        });
      }
      if (!data) {
        throw new Error(t("common:notFound"));
      }
      const mapperTypes = serverInfo.protocolMapperTypes[data.protocol];
      const mapping2 = mapperTypes.find((type2) => type2.id === data.protocolMapper);
      return {
        config: {
          protocol: data.protocol,
          protocolMapper: data.protocolMapper
        },
        mapping: mapping2,
        data
      };
    } else {
      const model = type ? await adminClient.clientScopes.findOne({id}) : await adminClient.clients.findOne({id});
      if (!model) {
        throw new Error(t("common:notFound"));
      }
      const protocolMappers = serverInfo.protocolMapperTypes[model.protocol];
      const mapping2 = protocolMappers.find((mapper) => mapper.id === mapperId);
      if (!mapping2) {
        throw new Error(t("common:notFound"));
      }
      return {
        mapping: mapping2,
        config: {
          protocol: model.protocol,
          protocolMapper: mapperId
        }
      };
    }
  }, ({config: config2, mapping: mapping2, data}) => {
    setConfig(config2);
    setMapping(mapping2);
    if (data) {
      convertToFormValues(data, setValue);
    }
  }, []);
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "common:deleteMappingTitle",
    messageKey: "common:deleteMappingConfirm",
    continueButtonLabel: "common:delete",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        if (isOnClientScope) {
          await adminClient.clientScopes.delProtocolMapper({
            id,
            mapperId
          });
        } else {
          await adminClient.clients.delProtocolMapper({
            id,
            mapperId
          });
        }
        addAlert(t("common:mappingDeletedSuccess"), AlertVariant.success);
        history.push(toDetails());
      } catch (error) {
        addError("common:mappingDeletedError", error);
      }
    }
  });
  const save = async (formMapping) => {
    const key = isUpdating ? "Updated" : "Created";
    try {
      const mapping2 = {...config, ...convertFormValuesToObject(formMapping)};
      if (isUpdating) {
        isOnClientScope ? await adminClient.clientScopes.updateProtocolMapper({id, mapperId}, {id: mapperId, ...mapping2}) : await adminClient.clients.updateProtocolMapper({id, mapperId}, {id: mapperId, ...mapping2});
      } else {
        isOnClientScope ? await adminClient.clientScopes.addProtocolMapper({id}, mapping2) : await adminClient.clients.addProtocolMapper({id}, mapping2);
      }
      addAlert(t(`common:mapping${key}Success`), AlertVariant.success);
    } catch (error) {
      addError(`common:mapping${key}Error`, error);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), /* @__PURE__ */ React.createElement(ViewHeader, {
    titleKey: isUpdating ? mapping?.name : t("common:addMapper"),
    subKey: isUpdating ? mapperId : "client-scopes:addMapperExplain",
    dropdownItems: isUpdating ? [
      /* @__PURE__ */ React.createElement(DropdownItem, {
        key: "delete",
        value: "delete",
        onClick: toggleDeleteDialog
      }, t("common:delete"))
    ] : void 0
  }), /* @__PURE__ */ React.createElement(PageSection, {
    variant: "light"
  }, /* @__PURE__ */ React.createElement(FormAccess, {
    isHorizontal: true,
    onSubmit: handleSubmit(save),
    role: "manage-clients",
    className: "keycloak__client-scope-mapping-details__form"
  }, /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:mapperType"),
    fieldId: "mapperType"
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    type: "text",
    id: "mapperType",
    name: "mapperType",
    isReadOnly: true,
    value: mapping?.name
  })), /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("common:name"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "client-scopes-help:mapperName",
      fieldLabelId: "name"
    }),
    fieldId: "name",
    isRequired: true,
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default,
    helperTextInvalid: t("common:required")
  }, /* @__PURE__ */ React.createElement(KeycloakTextInput, {
    ref: register({required: true}),
    type: "text",
    id: "name",
    name: "name",
    isReadOnly: isUpdating,
    validated: errors.name ? ValidatedOptions.error : ValidatedOptions.default
  })), /* @__PURE__ */ React.createElement(FormProvider, {
    ...form
  }, /* @__PURE__ */ React.createElement(DynamicComponents, {
    properties: mapping?.properties || []
  })), /* @__PURE__ */ React.createElement(ActionGroup, null, /* @__PURE__ */ React.createElement(Button, {
    variant: "primary",
    type: "submit"
  }, t("common:save")), /* @__PURE__ */ React.createElement(Button, {
    variant: "link",
    component: (props) => /* @__PURE__ */ React.createElement(Link, {
      ...props,
      to: toDetails()
    })
  }, t("common:cancel"))))));
}
