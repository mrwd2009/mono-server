// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n\n.kc-edit-icon {\n  color: var(--pf-global--Color--200);\n  margin-left: 5px;\n}\n\n.kc-showData-btn {\n  padding-left: 0;\n}\n\n.kc-userLabel-row {\n  display: inline-block !important;\n  width: 100%;\n}\n\n.kc-form-group-userLabel, .kc-userLabel-actionBtns {\n  display: flex;\n}\n\n.kc-editUserLabel-btn, .kc-editUserLabel-cancelBtn {\n  color: var(--pf-global--Color--200) !important;\n}\n\n.kc-editUserLabel-btn {\n  padding-top: 0px;\n}\n\n.kc-editUserLabel-btn:hover {\n  filter: brightness(55%);\n}\n\n.kc-editUserLabel-acceptBtn {\n  padding-right: 8px;\n}\n\n.kc-editUserLabel-cancelBtn {\n  padding-left: 8px !important;\n}\n\n.pf-c-table.pf-m-compact tr:not(.pf-c-table__expandable-row)>:last-child {\n  overflow-wrap: anywhere;\n}\n\n.kc-setPasswordBtn-tbl {\n  margin: 25px 0 25px 25px;\n}\n\n.kc-form-userLabel {\n  max-height: 0px;\n  margin-bottom: 0px;\n  padding-bottom: 15px;;\n}\n\n.kc-notExpandableRow-credentialType {\n  padding: 15px 0px 15px 15px !important;\n}\n\n.kc-expandableRow-credentialType {\n  padding-left: 15px !important;\n}\n\n.kc-expandRow-btn {\n  vertical-align: middle;\n}\n\n.kc-temporaryPassword {\n  margin: 6px 0 10px 35px;\n}\n\n.kc-resetCredentialBtn-header {\n  float: right;\n  margin: 20px 40px 0 0;\n}\n\ntr.kc-table-header th {\n  padding-top: 0px !important;\n}\n\ntd.one-row button svg {\n  color: var(--pf-c-button--disabled--Color);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}