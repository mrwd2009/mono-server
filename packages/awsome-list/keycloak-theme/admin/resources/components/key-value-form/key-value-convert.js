export const keyValueToArray = (attributeArray = []) => Object.fromEntries(attributeArray.filter(({key}) => key !== "").map(({key, value}) => [key, [value]]));
export const arrayToKeyValue = (attributes = {}) => {
  const result = Object.entries(attributes).flatMap(([key, value]) => value.map((value2) => ({key, value: value2})));
  return result.concat({key: "", value: ""});
};
