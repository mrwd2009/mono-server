import React, {useEffect, useMemo, useState} from "../../_snowpack/pkg/react.js";
import {useTranslation} from "../../_snowpack/pkg/react-i18next.js";
import {
  ClipboardCopyButton
} from "../../_snowpack/pkg/@patternfly/react-core.js";
import useSetTimeout from "../../utils/useSetTimeout.js";
var CopyState;
(function(CopyState2) {
  CopyState2[CopyState2["Ready"] = 0] = "Ready";
  CopyState2[CopyState2["Copied"] = 1] = "Copied";
  CopyState2[CopyState2["Error"] = 2] = "Error";
})(CopyState || (CopyState = {}));
export const CopyToClipboardButton = ({
  id,
  label,
  text,
  variant = "plain"
}) => {
  const {t} = useTranslation("clients");
  const setTimeout = useSetTimeout();
  const [copy, setCopy] = useState(0);
  const copyMessage = useMemo(() => {
    switch (copy) {
      case 0:
        return t("copyToClipboard");
      case 1:
        return t("copySuccess");
      case 2:
        return t("clipboardCopyError");
    }
  }, [copy]);
  useEffect(() => {
    if (copy !== 0) {
      return setTimeout(() => setCopy(0), 1e3);
    }
  }, [copy]);
  const copyToClipboard = async (text2) => {
    try {
      await navigator.clipboard.writeText(text2);
      setCopy(1);
    } catch (error) {
      setCopy(2);
    }
  };
  return /* @__PURE__ */ React.createElement(ClipboardCopyButton, {
    id: `copy-button-${id}`,
    textId: label,
    "aria-label": t("copyToClipboard"),
    onClick: () => copyToClipboard(text),
    exitDelay: 600,
    variant
  }, copyMessage);
};
