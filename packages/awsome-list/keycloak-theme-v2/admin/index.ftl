<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <base href="${resourceUrl}/" />
    <link rel="icon" href="${resourceUrl}/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Web site to manage CFEX account" />
    <title>CFEX Account Administration Console</title>
    <style>
      body {
        margin: 0;
      }

      body, #app {
        height: 100%;
      }

      .container {
        padding: 0;
        margin: 0;
        width: 100%;
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
      }
    </style>
    <script type="module" crossorigin src="${resourceUrl}/assets/index.0cb2e516.js"></script>
    <link rel="stylesheet" href="${resourceUrl}/assets/index.e2193254.css">
  

    <#if properties.styles?has_content>
      <#list properties.styles?split(' ') as style>
      <link href="${resourceUrl}/${style}" rel="stylesheet"/>
      </#list>
    </#if>
  </head>
	

  <body>
    <div id="app">
      <div class="container">
        <div class="keycloak__loading-container">
          <span class="pf-c-spinner pf-m-xl" role="progressbar" aria-valuetext="Loading...">
            <span class="pf-c-spinner__clipper"></span>
            <span class="pf-c-spinner__lead-ball"></span>
            <span class="pf-c-spinner__tail-ball"></span>
          </span>
          <div>
            <p id="loading-text">Loading the admin console</p>
          </div>
        </div>
      </div>
    </div>

    <noscript>You need to enable JavaScript to run this app.</noscript>
    
  

  <script id="environment" type="application/json">
    {
      "loginRealm": "${loginRealm!"master"}",
      "authServerUrl": "${authServerUrl}",
      "authUrl": "${authUrl}",
      "consoleBaseUrl": "${consoleBaseUrl}",
      "resourceUrl": "${resourceUrl}",
      "masterRealm": "${masterRealm}",
      "resourceVersion": "${resourceVersion}",
      "commitHash": "911eb6b83b301a990cbd0029c086150dfef279e9",
      "isRunningAsTheme": true
    }
  </script>
</body>


</html>
