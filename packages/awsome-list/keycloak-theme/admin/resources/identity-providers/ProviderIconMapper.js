import React from "../_snowpack/pkg/react.js";
import {
  CubeIcon,
  FacebookSquareIcon,
  GithubIcon,
  GitlabIcon,
  GoogleIcon,
  LinkedinIcon,
  OpenshiftIcon,
  StackOverflowIcon,
  TwitterIcon
} from "../_snowpack/pkg/@patternfly/react-icons.js";
import {FontAwesomeIcon} from "./icons/FontAwesomeIcon.js";
export const ProviderIconMapper = ({provider}) => {
  const defaultProps = {size: "lg"};
  switch (provider.id) {
    case "github":
      return /* @__PURE__ */ React.createElement(GithubIcon, {
        ...defaultProps
      });
    case "facebook":
      return /* @__PURE__ */ React.createElement(FacebookSquareIcon, {
        ...defaultProps
      });
    case "gitlab":
      return /* @__PURE__ */ React.createElement(GitlabIcon, {
        ...defaultProps
      });
    case "google":
      return /* @__PURE__ */ React.createElement(GoogleIcon, {
        ...defaultProps
      });
    case "linkedin":
      return /* @__PURE__ */ React.createElement(LinkedinIcon, {
        ...defaultProps
      });
    case "openshift-v3":
    case "openshift-v4":
      return /* @__PURE__ */ React.createElement(OpenshiftIcon, {
        ...defaultProps
      });
    case "stackoverflow":
      return /* @__PURE__ */ React.createElement(StackOverflowIcon, {
        ...defaultProps
      });
    case "twitter":
      return /* @__PURE__ */ React.createElement(TwitterIcon, {
        ...defaultProps
      });
    case "microsoft":
    case "bitbucket":
    case "instagram":
    case "paypal":
      return /* @__PURE__ */ React.createElement(FontAwesomeIcon, {
        icon: provider.id
      });
    default:
      return /* @__PURE__ */ React.createElement(CubeIcon, {
        ...defaultProps
      });
  }
};
