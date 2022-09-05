export function stringToMultiline(value) {
  return (value || "").split("##");
}
export function toStringValue(formValue) {
  return formValue.join("##");
}
