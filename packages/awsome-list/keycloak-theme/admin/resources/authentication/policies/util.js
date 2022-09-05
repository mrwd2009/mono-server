const POLICY_SEPARATOR = " and ";
export const serializePolicy = (policies, submitted) => policies.map((policy) => `${policy.id}(${submitted[policy.id]})`).join(POLICY_SEPARATOR);
export const parsePolicy = (value, policies) => value.split(POLICY_SEPARATOR).map(parsePolicyToken).reduce((result, {id, value: value2}) => {
  const matchingPolicy = policies.find((policy) => policy.id === id);
  if (!matchingPolicy) {
    return result;
  }
  return result.concat({...matchingPolicy, value: value2});
}, []);
function parsePolicyToken(token) {
  const valueStart = token.indexOf("(");
  if (valueStart === -1) {
    return {id: token.trim()};
  }
  const id = token.substring(0, valueStart).trim();
  const valueEnd = token.lastIndexOf(")");
  if (valueEnd === -1) {
    return {id};
  }
  const value = token.substring(valueStart + 1, valueEnd).trim();
  return {id, value};
}
