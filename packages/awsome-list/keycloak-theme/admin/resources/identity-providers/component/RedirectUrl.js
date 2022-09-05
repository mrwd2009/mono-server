import React from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {ClipboardCopy, FormGroup} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {HelpItem} from "../../components/help-enabler/HelpItem.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAdminClient} from "../../context/auth/AdminClient.js";
import {addTrailingSlash} from "../../util.js";
export const RedirectUrl = ({id}) => {
  const {t} = useTranslation("identity-providers");
  const {adminClient} = useAdminClient();
  const {realm} = useRealm();
  const callbackUrl = `${addTrailingSlash(adminClient.baseUrl)}realms/${realm}/broker`;
  return /* @__PURE__ */ React.createElement(FormGroup, {
    label: t("redirectURI"),
    labelIcon: /* @__PURE__ */ React.createElement(HelpItem, {
      helpText: "identity-providers-help:redirectURI",
      fieldLabelId: "identity-providers:redirectURI"
    }),
    fieldId: "kc-redirect-uri"
  }, /* @__PURE__ */ React.createElement(ClipboardCopy, {
    isReadOnly: true
  }, `${callbackUrl}/${id}/endpoint`));
};
