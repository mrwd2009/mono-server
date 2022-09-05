import React, {useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {useForm} from "../../_snowpack/pkg/react-hook-form.js";
import {
  AlertVariant,
  ButtonVariant,
  PageSection,
  Tab,
  Tabs,
  TabTitleText,
  Title
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {FormAccess} from "../../components/form-access/FormAccess.js";
import {useRealm} from "../../context/realm-context/RealmContext.js";
import {useAlerts} from "../../components/alert/Alerts.js";
import {useFetch, useAdminClient} from "../../context/auth/AdminClient.js";
import {EventConfigForm} from "./EventConfigForm.js";
import {useConfirmDialog} from "../../components/confirm-dialog/ConfirmDialog.js";
import {EventsTypeTable} from "./EventsTypeTable.js";
import {AddEventTypesDialog} from "./AddEventTypesDialog.js";
import {EventListenersForm} from "./EventListenersForm.js";
export const EventsTab = () => {
  const {t} = useTranslation("realm-settings");
  const form = useForm();
  const {setValue, handleSubmit, watch, reset} = form;
  const [key, setKey] = useState(0);
  const refresh = () => setKey(new Date().getTime());
  const [tableKey, setTableKey] = useState(0);
  const reload = () => setTableKey(new Date().getTime());
  const [activeTab, setActiveTab] = useState("event");
  const [events, setEvents] = useState();
  const [type, setType] = useState();
  const [addEventType, setAddEventType] = useState(false);
  const {adminClient} = useAdminClient();
  const {addAlert, addError} = useAlerts();
  const {realm} = useRealm();
  const setupForm = (eventConfig) => {
    reset(eventConfig);
    setEvents(eventConfig);
    Object.entries(eventConfig || {}).forEach((entry) => setValue(entry[0], entry[1]));
  };
  const clear = async (type2) => {
    setType(type2);
    toggleDeleteDialog();
  };
  const [toggleDeleteDialog, DeleteConfirm] = useConfirmDialog({
    titleKey: "realm-settings:deleteEvents",
    messageKey: "realm-settings:deleteEventsConfirm",
    continueButtonLabel: "common:clear",
    continueButtonVariant: ButtonVariant.danger,
    onConfirm: async () => {
      try {
        switch (type) {
          case "admin":
            await adminClient.realms.clearAdminEvents({realm});
            break;
          case "user":
            await adminClient.realms.clearEvents({realm});
            break;
        }
        addAlert(t(`${type}-events-cleared`), AlertVariant.success);
      } catch (error) {
        addError(`realm-settings:${type}-events-cleared-error`, error);
      }
    }
  });
  useFetch(() => adminClient.realms.getConfigEvents({realm}), (eventConfig) => {
    setupForm(eventConfig);
    reload();
  }, [key]);
  const save = async (eventConfig) => {
    const updatedEventListener = events?.eventsListeners !== eventConfig.eventsListeners;
    try {
      await adminClient.realms.updateConfigEvents({realm}, eventConfig);
      setupForm({...events, ...eventConfig});
      addAlert(updatedEventListener ? t("realm-settings:saveEventListenersSuccess") : t("realm-settings:eventConfigSuccessfully"), AlertVariant.success);
    } catch (error) {
      addError(updatedEventListener ? t("realm-settings:saveEventListenersError") : t("realm-settings:eventConfigError"), error);
    }
  };
  const addEventTypes = async (eventTypes) => {
    const eventsTypes = eventTypes.map((type2) => type2.id);
    const enabledEvents = events.enabledEventTypes?.concat(eventsTypes);
    await addEvents(enabledEvents);
  };
  const addEvents = async (events2 = []) => {
    const eventConfig = {...form.getValues(), enabledEventTypes: events2};
    await save(eventConfig);
    setAddEventType(false);
    refresh();
  };
  const eventsEnabled = watch("eventsEnabled") || false;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(DeleteConfirm, null), addEventType && /* @__PURE__ */ React.createElement(AddEventTypesDialog, {
    onConfirm: (eventTypes) => addEventTypes(eventTypes),
    configured: events?.enabledEventTypes || [],
    onClose: () => setAddEventType(false)
  }), /* @__PURE__ */ React.createElement(Tabs, {
    activeKey: activeTab,
    onSelect: (_, key2) => setActiveTab(key2)
  }, /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "event",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("eventListeners")),
    "data-testid": "rs-event-listeners-tab"
  }, /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-events",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(EventListenersForm, {
    form,
    reset: () => setupForm(events)
  })))), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "user",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("userEventsSettings")),
    "data-testid": "rs-events-tab"
  }, /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h1",
    size: "xl"
  }, t("userEventsConfig"))), /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-events",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(EventConfigForm, {
    type: "user",
    form,
    reset: () => setupForm(events),
    clear: () => clear("user")
  }))), eventsEnabled && /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(EventsTypeTable, {
    key: tableKey,
    addTypes: () => setAddEventType(true),
    loader: () => Promise.resolve(events?.enabledEventTypes?.map((id) => {
      return {id};
    }) || []),
    onDelete: (value) => {
      const enabledEventTypes = events?.enabledEventTypes?.filter((e) => e !== value.id);
      addEvents(enabledEventTypes);
      setEvents({...events, enabledEventTypes});
    }
  }))), /* @__PURE__ */ React.createElement(Tab, {
    eventKey: "admin",
    title: /* @__PURE__ */ React.createElement(TabTitleText, null, t("adminEventsSettings")),
    "data-testid": "rs-admin-events-tab"
  }, /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(Title, {
    headingLevel: "h4",
    size: "xl"
  }, t("adminEventsConfig"))), /* @__PURE__ */ React.createElement(PageSection, null, /* @__PURE__ */ React.createElement(FormAccess, {
    role: "manage-events",
    isHorizontal: true,
    onSubmit: handleSubmit(save)
  }, /* @__PURE__ */ React.createElement(EventConfigForm, {
    type: "admin",
    form,
    reset: () => setupForm(events),
    clear: () => clear("admin")
  }))))));
};
