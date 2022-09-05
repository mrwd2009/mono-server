import React, {useEffect, useState} from "../_snowpack/pkg/react.js";
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
  arrayToKeyValue,
  keyValueToArray
} from "../components/key-value-form/key-value-convert.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
export const UserAttributes = ({user: defaultUser}) => {
  const {t} = useTranslation("users");
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const [user, setUser] = useState(defaultUser);
  const form = useForm({mode: "onChange"});
  const convertAttributes = (attr) => {
    return arrayToKeyValue(attr || user.attributes);
  };
  useEffect(() => {
    form.setValue("attributes", convertAttributes());
  }, [user]);
  const save = async (attributeForm) => {
    try {
      const attributes = keyValueToArray(attributeForm.attributes);
      await adminClient.users.update({id: user.id}, {...user, attributes});
      setUser({...user, attributes});
      addAlert(t("userSaved"), AlertVariant.success);
    } catch (error) {
      addError("groups:groupUpdateError", error);
    }
  };
  return /* @__PURE__ */ React.createElement(PageSection, {
    variant: PageSectionVariants.light
  }, /* @__PURE__ */ React.createElement(AttributesForm, {
    form,
    save,
    fineGrainedAccess: user.access?.manage,
    reset: () => form.reset({
      attributes: convertAttributes()
    })
  }));
};
