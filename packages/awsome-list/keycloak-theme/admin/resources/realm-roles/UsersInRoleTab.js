import {Button, PageSection, Popover} from "../_snowpack/pkg/@patternfly/react-core.js";
import {QuestionCircleIcon} from "../_snowpack/pkg/@patternfly/react-icons.js";
import React from "../_snowpack/pkg/react.js";
import {useTranslation} from "../_snowpack/pkg/react-i18next.js";
import {useHistory, useParams} from "../_snowpack/pkg/react-router-dom.js";
import {useHelp} from "../components/help-enabler/HelpHeader.js";
import {ListEmptyState} from "../components/list-empty-state/ListEmptyState.js";
import {KeycloakDataTable} from "../components/table-toolbar/KeycloakDataTable.js";
import {useAdminClient} from "../context/auth/AdminClient.js";
import {useRealm} from "../context/realm-context/RealmContext.js";
import {emptyFormatter, upperCaseFormatter} from "../util.js";
export const UsersInRoleTab = () => {
  const history = useHistory();
  const {realm} = useRealm();
  const {t} = useTranslation("roles");
  const {id, clientId} = useParams();
  const {adminClient} = useAdminClient();
  const loader = async (first, max) => {
    const role = await adminClient.roles.findOneById({id});
    if (!role) {
      throw new Error(t("common:notFound"));
    }
    if (role.clientRole) {
      return adminClient.clients.findUsersWithRole({
        roleName: role.name,
        id: clientId,
        first,
        max
      });
    }
    return adminClient.roles.findUsersWithRole({
      name: role.name,
      first,
      max
    });
  };
  const {enabled} = useHelp();
  return /* @__PURE__ */ React.createElement(PageSection, {
    "data-testid": "users-page",
    variant: "light"
  }, /* @__PURE__ */ React.createElement(KeycloakDataTable, {
    isPaginated: true,
    loader,
    ariaLabelKey: "roles:roleList",
    searchPlaceholderKey: "",
    toolbarItem: enabled && /* @__PURE__ */ React.createElement(Popover, {
      "aria-label": "Basic popover",
      position: "bottom",
      bodyContent: /* @__PURE__ */ React.createElement("div", null, t("roles:whoWillAppearPopoverText"), /* @__PURE__ */ React.createElement(Button, {
        className: "kc-groups-link",
        variant: "link",
        onClick: () => history.push(`/${realm}/groups`)
      }, t("common:groups")), t("or"), /* @__PURE__ */ React.createElement(Button, {
        className: "kc-users-link",
        variant: "link",
        onClick: () => history.push(`/${realm}/users`)
      }, t("users"), ".")),
      footerContent: t("roles:whoWillAppearPopoverFooterText")
    }, /* @__PURE__ */ React.createElement(Button, {
      variant: "link",
      className: "kc-who-will-appear-button",
      key: "who-will-appear-button",
      icon: /* @__PURE__ */ React.createElement(QuestionCircleIcon, null)
    }, t("roles:whoWillAppearLinkText"))),
    emptyState: /* @__PURE__ */ React.createElement(ListEmptyState, {
      hasIcon: true,
      message: t("noDirectUsers"),
      instructions: /* @__PURE__ */ React.createElement("div", null, t("noUsersEmptyStateDescription"), /* @__PURE__ */ React.createElement(Button, {
        className: "kc-groups-link-empty-state",
        variant: "link",
        onClick: () => history.push(`/${realm}/groups`)
      }, t("common:groups")), t("or"), /* @__PURE__ */ React.createElement(Button, {
        className: "kc-users-link-empty-state",
        variant: "link",
        onClick: () => history.push(`/${realm}/users`)
      }, t("users")), t("noUsersEmptyStateDescriptionContinued"))
    }),
    columns: [
      {
        name: "username",
        displayKey: "roles:userName",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "email",
        displayKey: "roles:email",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "lastName",
        displayKey: "roles:lastName",
        cellFormatters: [emptyFormatter()]
      },
      {
        name: "firstName",
        displayKey: "roles:firstName",
        cellFormatters: [upperCaseFormatter(), emptyFormatter()]
      }
    ]
  }));
};
