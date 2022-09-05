// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".keycloak__authentication__input_node,\n.keycloak__authentication__output_node {\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--pf-global--BackgroundColor--200);\n  border: 0;\n}\n\n.keycloak__authentication__conditional_node {\n  border: 1px solid #777;\n  width: 80px;\n  height: 80px;\n  transform: rotate(45deg);\n}\n\n.keycloak__authentication__conditional_node div {\n  transform: rotate(-45deg);\n}\n\n.keycloak__authentication__subflow_node {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--pf-global--BackgroundColor--200);\n}\n\n.keycloak__authentication__input_node.selected,\n.keycloak__authentication__input_node:hover,\n.keycloak__authentication__output_node.selected,\n.keycloak__authentication__output_node:hover,\n.keycloak__authentication__subflow_node.selected,\n.keycloak__authentication__subflow_node:hover,\n.keycloak__authentication__conditional_node.selected,\n.keycloak__authentication__conditional_node:hover {\n  box-shadow: 0 0 0 0.5px #1a192b;\n}\n\n.edgebutton {\n  background-color: var(--pf-global--BackgroundColor--200);\n  border: 1px solid var(--pf-global--BackgroundColor--100);\n  border-radius: 50%;\n  cursor: pointer;\n  height: 33px;\n  width: 33px;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}