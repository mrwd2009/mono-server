<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><link id="favicon" rel="icon" href="${resourceUrl}/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Web site to manage CFEX account"><title>CFEX Account Administration Console</title><style>.container,
    .container-fluid,
    #load-container {
      padding: 0;
      margin: 0;
    }

    .container,
    .container-fluid,
    #load-container {
      width: 100vw;
    }

    .keycloak__loading-container {
      height: 100vh;
      width: 100%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 0;
    }

    #loading-text {
      z-index: 1000;
      font-size: 20px;
      font-weight: 600;
      padding-top: 32px;
    }</style><link rel="stylesheet" href="${resourceUrl}/styles.1653b4622917b89da7e4.css"></head>

<body style="height: 100%;">
  <script id="environment" type="application/json">
    {
      "loginRealm": "${loginRealm!"master"}",
      "authServerUrl": "${authServerUrl}",
      "authUrl": "${authUrl}",
      "consoleBaseUrl": "${consoleBaseUrl}",
      "resourceUrl": "${resourceUrl}",
      "masterRealm": "${masterRealm}",
      "resourceVersion": "${resourceVersion}",
      "commitHash": "04237c0eb32bf838e866b879b3637d1eca326151",
      "isRunningAsTheme": true
    }
  </script>

<div id="app" style="height: 100%"><div class="container container-fluid" id="load-container"><div class="keycloak__loading-container"><span class="pf-c-spinner pf-m-xl" role="progressbar" aria-valuetext="Loading..."><span class="pf-c-spinner__clipper"></span> <span class="pf-c-spinner__lead-ball"></span> <span class="pf-c-spinner__tail-ball"></span></span><div><p id="loading-text">Loading the admin console</p></div></div></div></div><noscript>You need to enable JavaScript to run this app.</noscript><script src="${resourceUrl}/webpack-runtime.js"></script><script src="${resourceUrl}/lib-index-916de6ed.js"></script><script src="${resourceUrl}/lib-EmptyState-25333d4a.js"></script><script src="${resourceUrl}/lib-react-core.js"></script><script src="${resourceUrl}/4359.js"></script><script src="${resourceUrl}/index.js"></script></body></html>