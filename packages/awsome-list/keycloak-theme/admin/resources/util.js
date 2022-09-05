import {cloneDeep} from "./_snowpack/pkg/lodash-es.js";
import FileSaver from "./_snowpack/pkg/file-saver.js";
import {unflatten, flatten} from "./_snowpack/pkg/flat.js";
import {
  keyValueToArray,
  arrayToKeyValue
} from "./components/key-value-form/key-value-convert.js";
export const sortProviders = (providers) => {
  return [...new Map(Object.entries(providers).sort(sortProvider)).keys()];
};
const sortProvider = (a, b) => {
  let s1, s2;
  if (a[1].order !== b[1].order) {
    s1 = b[1].order;
    s2 = a[1].order;
  } else {
    s1 = a[0];
    s2 = b[0];
  }
  if (s1 < s2) {
    return -1;
  } else if (s1 > s2) {
    return 1;
  } else {
    return 0;
  }
};
export const toKey = (value) => value.replace(/\s/g, "-");
export const exportClient = (client) => {
  const clientCopy = cloneDeep(client);
  delete clientCopy.id;
  if (clientCopy.protocolMappers) {
    for (let i = 0; i < clientCopy.protocolMappers.length; i++) {
      delete clientCopy.protocolMappers[i].id;
    }
  }
  FileSaver.saveAs(new Blob([prettyPrintJSON(clientCopy)], {
    type: "application/json"
  }), clientCopy.clientId + ".json");
};
export const toUpperCase = (name) => name.charAt(0).toUpperCase() + name.slice(1);
const isAttributesObject = (value) => {
  return Object.values(value).filter((value2) => Array.isArray(value2) && value2.length === 1).length !== 0;
};
const isAttributeArray = (value) => {
  if (!Array.isArray(value)) {
    return false;
  }
  return value.some((e) => Object.prototype.hasOwnProperty.call(e, "key") && Object.prototype.hasOwnProperty.call(e, "value"));
};
const isEmpty = (obj) => Object.keys(obj).length === 0;
export const convertToFormValues = (obj, setValue) => {
  Object.entries(obj).map(([key, value]) => {
    if (key === "attributes" && isAttributesObject(value)) {
      setValue(key, arrayToKeyValue(value));
    } else if (key === "config" || key === "attributes") {
      if (!isEmpty(value)) {
        const flattened = flatten(value, {safe: true});
        const convertedValues = Object.entries(flattened).map(([key2, value2]) => Array.isArray(value2) ? [key2, value2[0]] : [key2, value2]);
        setValue(key, unflatten(Object.fromEntries(convertedValues)));
      } else {
        setValue(key, void 0);
      }
    } else {
      setValue(key, value);
    }
  });
};
export function convertFormValuesToObject(obj) {
  const result = {};
  Object.entries(obj).map(([key, value]) => {
    if (isAttributeArray(value)) {
      result[key] = keyValueToArray(value);
    } else if (key === "config" || key === "attributes") {
      result[key] = flatten(value, {safe: true});
    } else {
      result[key] = value;
    }
  });
  return result;
}
export const emptyFormatter = () => (data) => {
  return data ? data : "—";
};
export const upperCaseFormatter = () => (data) => {
  const value = data?.toString();
  return value ? toUpperCase(value) : void 0;
};
export const alphaRegexPattern = /[^A-Za-z]/g;
export const emailRegexPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const KEY_PROVIDER_TYPE = "org.keycloak.keys.KeyProvider";
export const prettyPrintJSON = (value) => JSON.stringify(value, null, 2);
export const addTrailingSlash = (url) => url.endsWith("/") ? url : url + "/";
