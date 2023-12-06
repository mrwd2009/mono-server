// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".pf-c-card.pf-m-flat.kc-login-screen,\n.pf-c-card.pf-m-flat.kc-email-settings,\n.pf-c-card.pf-m-flat.kc-user-info-settings,\n.pf-c-card.pf-m-flat.kc-email-template,\n.pf-c-card.pf-m-flat.kc-email-connection,\n.pf-c-card.pf-m-flat.kc-message-bundles,\n.pf-c-card.pf-m-flat.kc-sso-session-template,\n.pf-c-card.pf-m-flat.kc-client-session-template,\n.pf-c-card.pf-m-flat.kc-offline-session-template,\n.pf-c-card.pf-m-flat.kc-login-settings-template {\n  border: none;\n  margin-top: 0px;\n  margin-bottom: 0px;\n  padding-bottom: var(--pf-global--spacer--sm);\n}\n\narticle.pf-c-card.pf-m-flat.kc-email-template\n  > .pf-c-card__header.kc-form-panel__header,\narticle.pf-c-card.pf-m-flat.kc-email-connection\n  > .pf-c-card__header.kc-form-panel__header {\n  margin-top: 0px;\n  margin-bottom: 0px;\n  padding-left: 0px;\n  padding-bottom: 0px;\n}\n\n.kc-login-screen > div.pf-c-card__header.kc-form-panel__header,\n.kc-email-settings > div.pf-c-card__header.kc-form-panel__header,\n.kc-email-template > div.pf-c-card__header.kc-form-panel__header,\n.kc-user-info-settings > div.pf-c-card__header.kc-form-panel__header {\n  padding-bottom: 0px;\n  padding-left: 0px;\n  padding-top: 0px;\n}\n\n.kc-email-settings > div.pf-c-card__body.kc-form-panel__body,\n.kc-email-template > div.pf-c-card__body.kc-form-panel__body,\n.kc-login-screen > div.pf-c-card__body.kc-form-panel__body,\n.kc-user-info-settings > div.pf-c-card__body.kc-form-panel__body {\n  padding-left: 0px;\n  padding-bottom: var(--pf-global--spacer--2xl);\n}\n\nbutton.kc-certificate.pf-c-button.pf-m-secondary {\n  margin-left: var(--pf-global--spacer--md);\n}\n\n.pf-c-data-list__item-row.test {\n  font-weight: bold;\n}\n\n.pf-c-data-list__item-content.data-list-cells {\n  margin-left: var(--pf-global--spacer--xl);\n}\n\nbutton.pf-c-data-list__item-draggable-button.pf-m-disabled.header-drag-button {\n  display: none;\n}\n\nbutton.pf-c-data-list__item-draggable-button.row-drag-button {\n  padding-top: var(--pf-global--spacer--md);\n}\n\n.pf-c-data-list__item-control {\n  margin-right: 0px;\n}\n\n.pf-c-data-list__item-row.test {\n  font-weight: bold;\n}\n\nbutton.pf-c-button.pf-m-link.add-provider {\n  padding: 0px;\n}\n\n.pf-c-toolbar__group.providers-toolbar {\n  padding-left: var(--pf-c-toolbar__content--PaddingLeft);\n}\n\ndiv#login-action-timeout-label > .pf-c-form__group-label,\ndiv#offline-session-max-label > .pf-c-form__group-label {\n  width: 90%;\n}\n\ndiv#offline-session-max-label > .pf-c-form__group-label {\n  width: 85%;\n}\n\n.add-provider-modal > div.pf-c-modal-box__body {\n  overflow: visible;\n}\n\n.pf-c-content.messageBundleDescription {\n  max-width: 1024px;\n  padding-bottom: var(--pf-global--spacer--lg);\n}\n\n.kc-message-bundles > .pf-c-card__body.kc-form-panel__body > div.tableBorder {\n  border-style: solid;\n  border-width: 1px;\n  border-color: var(--pf-global--BorderColor--100);\n  max-width: 1024px;\n}\n\n.pf-c-form__group.kc-email-form-group {\n  display: inline-block !important;\n}\n\n.pf-c-content.kc-provide-email-text {\n  padding-bottom: var(--pf-global--spacer--md);\n}\n\n.kc-sso-session-idle-input,\n.kc-sso-session-max-input,\n.kc-sso-session-max-input,\n.kc-sso-session-idle-remember-me-input,\n.kc-sso-session-max-remember-me-input,\n.kc-offline-session-idle-input,\n.kc-offline-session-max-input,\n.kc-client-session-idle-input,\n.kc-client-session-max-input,\n.kc-login-timeout-input,\n.kc-login-action-timeout-input,\n.kc-access-token-lifespan-input,\n.kc-user-initiated-action-lifespan-input,\n.kc-default-admin-initiated-input,\n.kc-access-token-lifespan-implicit-input,\n.kc-client-login-timeout-input,\n.kc-email-verification-input,\n.kc-idp-email-verification-input,\n.kc-idp-forgot-password-input,\n.kc-forgot-pw-input,\n.kc-execute-actions-input {\n  width: 170px;\n  margin-right: 12px;\n}\n\n.kc-sso-session-idle-select,\n.kc-sso-session-max-select,\n.kc-sso-session-idle-remember-me-select,\n.kc-sso-session-max-remember-me-select,\n.kc-client-session-idle-select,\n.kc-client-session-max-select,\n.kc-offline-session-idle-select,\n.kc-offline-session-max-select,\n.kc-login-action-timeout-select,\n.kc-sso-session-idle-select.pf-m-expanded,\n.kc-sso-session-max-select.pf-m-expanded {\n  width: 170px;\n}\n\narticle.pf-c-card.pf-m-flat.kc-sso-session-template\n  > .pf-c-card__header.kc-form-panel__header,\narticle.pf-c-card.pf-m-flat.kc-sso-session-template\n  > .pf-c-card__body.kc-form-panel__body,\narticle.pf-c-card.pf-m-flat.kc-client-session-template\n  > .pf-c-card__header.kc-form-panel__header,\narticle.pf-c-card.pf-m-flat.kc-client-session-template\n  > .pf-c-card__body.kc-form-panel__body,\narticle.pf-c-card.pf-m-flat.kc-offline-session-template\n  > .pf-c-card__header.kc-form-panel__header,\narticle.pf-c-card.pf-m-flat.kc-offline-session-template\n  > .pf-c-card__body.kc-form-panel__body,\narticle.pf-c-card.pf-m-flat.kc-login-settings-template\n  > .pf-c-card__header.kc-form-panel__header,\narticle.pf-c-card.pf-m-flat.kc-login-settings-template\n  > .pf-c-card__body.kc-form-panel__body,\narticle.pf-c-card.pf-m-flat.kc-email-connection\n  > .pf-c-card__body.kc-form-panel__body {\n  padding: 0px;\n}\n\n.kc-override-action-tokens-subtitle {\n  font-size: var(--pf-global--FontSize--md);\n  font-weight: bold;\n}\n\n.kc-row-drag-button {\n  padding: var(--pf-global--spacer--sm);\n}\n\n.kc-profiles-config-section {\n  align-items: center;\n}\n\n.kc-form-radio-btn > input {\n  transform: scale(1.6);\n}\n\n.kc-editor-radio-btn > input {\n  transform: scale(1.6);\n}\n\n.kc-emptyExecutors {\n  color: #8d9195;\n}\n\n.kc-emptyConditions {\n  color: #8d9195;\n}\n\n.kc-emptyClientProfiles {\n  color: #8d9195;\n}\n\n.kc-action-dropdown {\n  background-color: transparent;\n}\n\n.kc-executor-link {\n  margin-right: 0.625rem;\n}\n\n.kc-unclickable-executor {\n  font-size: var(--pf-global--FontSize--md);\n  padding: 0 var(--pf-global--spacer--md) 0 var(--pf-global--spacer--md);\n}\n\n.kc-backToPolicies,\n.kc-backToPolicies {\n  width: 5rem;\n}\n\n.kc-backToPolicies {\n  float: left;\n}\n\n.kc-executor-trash-icon {\n  margin-left: 0.5rem;\n  color: var(--pf-global--Color--200);\n}\n\n.kc-executor-trash-icon:hover {\n  filter: brightness(55%);\n}\n\n.kc-condition-link {\n  margin-right: 0.625rem;\n}\n\n.kc-conditionType-trash-icon {\n  margin-left: 0.5rem;\n  color: var(--pf-global--Color--400);\n}\n\n.kc-conditionType-trash-icon:hover {\n  filter: brightness(55%);\n}\n\n.kc_eventListeners_select {\n  width: 35rem;\n}\n\ninput#kc-scopes {\n  width: 630px;\n\n  margin-right: 24px;\n}\n\n.kc-client-scopes-chip-group {\n  margin-right: var(--pf-global--spacer--2xl);\n  max-width: 585px;\n  min-width: 585px;\n  padding-left: none;\n}\n\n.kc-join-group-modal-check {\n  margin-right: var(--pf-global--spacer--sm);\n}\n\n.kc-requiredFor {\n  display: flex;\n}\n\n.kc-requiredFor-option {\n  margin-right: 20px;\n}\n\n.kc-emptyValidators {\n  color: #8d9195;\n  margin-left: 25px;\n}\n\n.kc-attributes-validations {\n  max-width: 1024px;\n  margin-bottom: 52px;\n}\n\n.kc-attributeCancel {\n  align-self: center;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}