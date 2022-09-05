// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__authentication__flow-item:before {\n  width: 0;\n}\n\n.keycloak__authentication__flow-row[aria-level=\"1\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 2\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"2\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 3\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"3\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 4\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"4\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 5\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"5\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 6\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"6\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 7\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"7\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 8\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"8\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 9\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"9\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 10\n  );\n}\n\n.keycloak__authentication__flow-row[aria-level=\"10\"] {\n  padding-left: calc(\n    var(--pf-global--spacer--lg) * 11\n  );\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}