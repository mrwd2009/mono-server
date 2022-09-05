import React, {
  Children,
  cloneElement,
  isValidElement
} from "../../_snowpack/pkg/react.js";
import {Controller} from "../../_snowpack/pkg/react-hook-form.js";
import {
  ActionGroup,
  ClipboardCopy,
  Form,
  FormGroup,
  Grid,
  GridItem,
  Stack,
  StackItem,
  TextArea
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import {useAccess} from "../../context/access/Access.js";
export const FormAccess = ({
  children,
  role,
  fineGrainedAccess = false,
  isReadOnly = false,
  unWrap = false,
  ...rest
}) => {
  const {hasAccess} = useAccess();
  const recursiveCloneChildren = (children2, newProps) => {
    return Children.map(children2, (child) => {
      if (!isValidElement(child)) {
        return child;
      }
      if (child.props) {
        const element = child;
        if (child.type === Controller) {
          return cloneElement(child, {
            ...element.props,
            render: (props) => {
              const renderElement = element.props.render(props);
              return cloneElement(renderElement, {
                ...renderElement.props,
                ...newProps
              });
            }
          });
        }
        const children3 = recursiveCloneChildren(element.props.children, newProps);
        if (child.type === TextArea) {
          return cloneElement(child, {
            readOnly: newProps.isDisabled,
            children: children3
          });
        }
        return cloneElement(child, child.type === FormGroup || child.type === GridItem || child.type === Grid || child.type === ActionGroup || child.type === ClipboardCopy || child.type === Stack || child.type === StackItem ? {children: children3} : {...newProps, children: children3});
      }
      return child;
    });
  };
  const isDisabled = isReadOnly || !hasAccess(role) && !fineGrainedAccess;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, !unWrap && /* @__PURE__ */ React.createElement(Form, {
    ...rest,
    className: "keycloak__form " + (rest.className || "")
  }, recursiveCloneChildren(children, isDisabled ? {isDisabled} : {})), unWrap && recursiveCloneChildren(children, isDisabled ? {isDisabled} : {}));
};
