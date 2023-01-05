import{a as v,C as o}from"./index.esm.6af887f8.js";import{F as T}from"./FormAccess.bee4f1e0.js";import{H as l}from"./HelpItem.e440d5db.js";import{u as z,h as d,F as w,j as e,aA as k,bB as I,ag as p,av as h}from"./index.0cb2e516.js";import{a as s}from"./FormGroup.3d5f3f16.js";import{G as F,a as b}from"./GridItem.0db472b0.js";import{C as f}from"./Checkbox.2dc73ed3.js";import{K as x}from"./KeycloakTextInput.b4d5b2db.js";import{K as L}from"./KeycloakTextArea.f5e2440a.js";const _=({unWrap:y,protocol:c})=>{const{t}=z("clients"),{control:n,watch:r,setValue:u}=v(),C=c||r("protocol"),m=r("publicClient"),A=r("authorizationServicesEnabled");return d(T,{isHorizontal:!0,role:"manage-clients",unWrap:y,className:"keycloak__capability-config__form","data-testid":"capability-config-form",children:[C==="openid-connect"&&d(w,{children:[e(s,{hasNoPaddingTop:!0,label:t("clientAuthentication"),fieldId:"kc-authentication",labelIcon:e(l,{helpText:"clients-help:authentication",fieldLabelId:"clients:authentication"}),children:e(o,{name:"publicClient",defaultValue:!1,control:n,render:({onChange:a,value:i})=>e(k,{"data-testid":"authentication",id:"kc-authentication-switch",name:"publicClient",label:t("common:on"),labelOff:t("common:off"),isChecked:!i,onChange:g=>{a(!g),g||(u("authorizationServicesEnabled",!1),u("serviceAccountsEnabled",!1),u(I("attributes.oidc.ciba.grant.enabled"),!1))},"aria-label":t("clientAuthentication")})})}),e(s,{hasNoPaddingTop:!0,label:t("clientAuthorization"),fieldId:"kc-authorization",labelIcon:e(l,{helpText:"clients-help:authorization",fieldLabelId:"clients:authorization"}),children:e(o,{name:"authorizationServicesEnabled",defaultValue:!1,control:n,render:({onChange:a,value:i})=>e(k,{"data-testid":"authorization",id:"kc-authorization-switch",name:"authorizationServicesEnabled",label:t("common:on"),labelOff:t("common:off"),isChecked:i&&!m,onChange:g=>{a(g),g&&u("serviceAccountsEnabled",!0)},isDisabled:m,"aria-label":t("clientAuthorization")})})}),e(s,{hasNoPaddingTop:!0,label:t("authenticationFlow"),fieldId:"kc-flow",children:d(F,{id:"authenticationFlowGrid",children:[e(b,{lg:4,sm:6,children:e(o,{name:"standardFlowEnabled",defaultValue:!0,control:n,render:({onChange:a,value:i})=>d(p,{children:[e(f,{"data-testid":"standard",label:t("standardFlow"),id:"kc-flow-standard",name:"standardFlowEnabled",isChecked:i.toString()==="true",onChange:a}),e(l,{helpText:"clients-help:standardFlow",fieldLabelId:"clients:standardFlow"})]})})}),e(b,{lg:8,sm:6,children:e(o,{name:"directAccessGrantsEnabled",defaultValue:!0,control:n,render:({onChange:a,value:i})=>d(p,{children:[e(f,{"data-testid":"direct",label:t("directAccess"),id:"kc-flow-direct",name:"directAccessGrantsEnabled",isChecked:i,onChange:a}),e(l,{helpText:"clients-help:directAccess",fieldLabelId:"clients:directAccess"})]})})}),e(b,{lg:4,sm:6,children:e(o,{name:"implicitFlowEnabled",defaultValue:!0,control:n,render:({onChange:a,value:i})=>d(p,{children:[e(f,{"data-testid":"implicit",label:t("implicitFlow"),id:"kc-flow-implicit",name:"implicitFlowEnabled",isChecked:i.toString()==="true",onChange:a}),e(l,{helpText:"clients-help:implicitFlow",fieldLabelId:"clients:implicitFlow"})]})})}),e(b,{lg:8,sm:6,children:e(o,{name:"serviceAccountsEnabled",defaultValue:!1,control:n,render:({onChange:a,value:i})=>d(p,{children:[e(f,{"data-testid":"service-account",label:t("serviceAccount"),id:"kc-flow-service-account",name:"serviceAccountsEnabled",isChecked:i.toString()==="true"||m&&A,onChange:a,isDisabled:m&&!A||!m&&A}),e(l,{helpText:"clients-help:serviceAccount",fieldLabelId:"clients:serviceAccount"})]})})}),e(b,{lg:8,sm:6,children:e(o,{name:I("attributes.oauth2.device.authorization.grant.enabled"),defaultValue:!1,control:n,render:({onChange:a,value:i})=>d(p,{children:[e(f,{"data-testid":"oauth-device-authorization-grant",label:t("oauthDeviceAuthorizationGrant"),id:"kc-oauth-device-authorization-grant",name:"oauth2.device.authorization.grant.enabled",isChecked:i.toString()==="true",onChange:a}),e(l,{helpText:"clients-help:oauthDeviceAuthorizationGrant",fieldLabelId:"clients:oauthDeviceAuthorizationGrant"})]})})}),e(b,{lg:8,sm:6,children:e(o,{name:I("attributes.oidc.ciba.grant.enabled"),defaultValue:!1,control:n,render:({onChange:a,value:i})=>d(p,{children:[e(f,{"data-testid":"oidc-ciba-grant",label:t("oidcCibaGrant"),id:"kc-oidc-ciba-grant",name:"oidc.ciba.grant.enabled",isChecked:i.toString()==="true",onChange:a,isDisabled:m}),e(l,{helpText:"clients-help:oidcCibaGrant",fieldLabelId:"clients:oidcCibaGrant"})]})})})]})})]}),C==="saml"&&d(w,{children:[e(s,{labelIcon:e(l,{helpText:"clients-help:encryptAssertions",fieldLabelId:"clients:encryptAssertions"}),label:t("encryptAssertions"),fieldId:"kc-encrypt",hasNoPaddingTop:!0,children:e(o,{name:I("attributes.saml.encrypt"),control:n,defaultValue:!1,render:({onChange:a,value:i})=>e(k,{"data-testid":"encrypt",id:"kc-encrypt",label:t("common:on"),labelOff:t("common:off"),isChecked:i,onChange:a,"aria-label":t("encryptAssertions")})})}),e(s,{labelIcon:e(l,{helpText:"clients-help:clientSignature",fieldLabelId:"clients:clientSignature"}),label:t("clientSignature"),fieldId:"kc-client-signature",hasNoPaddingTop:!0,children:e(o,{name:I("attributes.saml.client.signature"),control:n,defaultValue:!1,render:({onChange:a,value:i})=>e(k,{"data-testid":"client-signature",id:"kc-client-signature",label:t("common:on"),labelOff:t("common:off"),isChecked:i,onChange:a,"aria-label":t("clientSignature")})})})]})]})},j=({hasConfigureAccess:y})=>{const{t:c}=z("clients"),{register:t,control:n,formState:{errors:r}}=v();return d(T,{role:"manage-clients",fineGrainedAccess:y,unWrap:!0,children:[e(s,{labelIcon:e(l,{helpText:"clients-help:clientId",fieldLabelId:"clientId"}),label:c("common:clientId"),fieldId:"kc-client-id",helperTextInvalid:c("common:required"),validated:r.clientId?h.error:h.default,isRequired:!0,children:e(x,{ref:t({required:!0}),type:"text",id:"kc-client-id","data-testid":"kc-client-id",name:"clientId",validated:r.clientId?h.error:h.default})}),e(s,{labelIcon:e(l,{helpText:"clients-help:clientName",fieldLabelId:"name"}),label:c("common:name"),fieldId:"kc-name",children:e(x,{ref:t(),type:"text",id:"kc-name",name:"name"})}),e(s,{labelIcon:e(l,{helpText:"clients-help:description",fieldLabelId:"description"}),label:c("common:description"),fieldId:"kc-description",validated:r.description?h.error:h.default,helperTextInvalid:r.description?.message,children:e(L,{ref:t({maxLength:{value:255,message:c("common:maxLength",{length:255})}}),type:"text",id:"kc-description",name:"description",validated:r.description?h.error:h.default})}),e(s,{label:c("alwaysDisplayInConsole"),labelIcon:e(l,{helpText:"clients-help:alwaysDisplayInConsole",fieldLabelId:"clients:alwaysDisplayInConsole"}),fieldId:"kc-always-display-in-console",hasNoPaddingTop:!0,children:e(o,{name:"alwaysDisplayInConsole",defaultValue:!1,control:n,render:({onChange:u,value:C})=>e(k,{id:"kc-always-display-in-console-switch",label:c("common:on"),labelOff:c("common:off"),isChecked:C,onChange:u,"aria-label":c("alwaysDisplayInConsole")})})})]})};export{j as C,_ as a};
