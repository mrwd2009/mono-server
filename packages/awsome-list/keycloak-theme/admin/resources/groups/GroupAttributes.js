import React, {useEffect} from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useForm} from "../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  PageSection,
  PageSectionVariants
} from "../_snowpack/pkg/@patternfly/react-core.js";
import {useAlerts} from "../components/alert/Alerts.js";
import {
  AttributesForm
} from "../components/key-value-form/AttributeForm.js";
import {
  keyValueToArray,
  arrayToKeyValue
} from "../components/key-value-form/key-value-convert.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {getLastId} from "./groupIdUtils.js";
import {useSubGroups} from "./SubGroupsContext.js";
import {useLocation} from "../_snowpack/pkg/react-router-dom.js";
export const GroupAttributes = () => {
  const {t} = useTranslation("groups");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const form = useForm({
    mode: "onChange",
    shouldUnregister: false
  });
  const location = useLocation();
  const id = getLastId(location.pathname);
  const {currentGroup, subGroups, setSubGroups} = useSubGroups();
  const convertAttributes = (attr) => {
    return arrayToKeyValue(attr || currentGroup()?.attributes);
  };
  useEffect(() => {
    form.setValue("attributes", convertAttributes());
  }, [subGroups]);
  const save = async (attributeForm) => {
    try {
      const group = currentGroup();
      const attributes = keyValueToArray(attributeForm.attributes);
      await adminClient.groups.update({id}, {...group, attributes});
      setSubGroups([
        ...subGroups.slice(0, subGroups.length - 1),
        {...group, attributes}
      ]);
      addAlert(t("groupUpdated"), AlertVariant.success);
    } catch (error) {
      addError("groups:groupUpdateError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: PageSectionVariants.light
  }, /* @__PURE__ */ React.createElement(AttributesForm, {
    form,
    save,
    fineGrainedAccess: currentGroup()?.access?.manage,
    reset: () => form.reset({
      attributes: convertAttributes()
    })
  }));
};
