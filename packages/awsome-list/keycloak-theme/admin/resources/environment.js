const realm = new URLSearchParams(window.location.search).get("realm") ?? "master";
const defaultEnvironment = {
  loginRealm: realm,
  authServerUrl: "http://localhost:8180",
  authUrl: "http://localhost:8180",
  consoleBaseUrl: "/admin/master/console/",
  resourceUrl: ".",
  masterRealm: "master",
  resourceVersion: "unknown",
  commitHash: "unknown",
  isRunningAsTheme: false
};
const environment = {
  ...defaultEnvironment,
  ...getInjectedEnvironment()
};
export default environment;
function getInjectedEnvironment() {
  const element = document.getElementById("environment");
  if (!element?.textContent) {
    return {};
  }
  try {
    return JSON.parse(element.textContent);
  } catch (error) {
    console.error("Unable to parse environment variables.");
  }
  return {};
}
