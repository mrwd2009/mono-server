import React from "../../_snowpack/pkg/react.js";
import environment from "../../environment.js";
export const FontAwesomeIcon = ({icon}) => {
  const styles = {style: {height: "2em", width: "2em"}};
  switch (icon) {
    case "bitbucket":
      return /* @__PURE__ */ React.createElement("img", {
        src: environment.resourceUrl + "/bitbucket-brands.svg",
        ...styles,
        "aria-label": "bitbucket icon"
      });
    case "microsoft":
      return /* @__PURE__ */ React.createElement("img", {
        src: environment.resourceUrl + "/microsoft-brands.svg",
        ...styles,
        "aria-label": "microsoft icon"
      });
    case "instagram":
      return /* @__PURE__ */ React.createElement("img", {
        src: environment.resourceUrl + "/instagram-brands.svg",
        ...styles,
        "aria-label": "instagram icon"
      });
    case "paypal":
      return /* @__PURE__ */ React.createElement("img", {
        src: environment.resourceUrl + "/paypal-brands.svg",
        ...styles,
        "aria-label": "paypal icon"
      });
    default:
      return null;
  }
};
