import{u as h,bA as f,ay as P,az as A,aw as F,l as g,h as a,F as b,j as r,o as S,P as I,s as n,b4 as x,cr as E,aY as j,cs as w}from"./index.0cb2e516.js";import{u as C,F as G}from"./index.esm.6af887f8.js";import{G as V,E as k}from"./ExtendedFieldsForm.27b13c2a.js";import{V as z}from"./ViewHeader.2586557f.js";import{F as D}from"./FormAccess.bee4f1e0.js";import{A as H}from"./FormGroup.3d5f3f16.js";import"./DisplayOrder.76153bb4.js";import"./HelpItem.e440d5db.js";import"./ClientIdSecret.0917a328.js";import"./PasswordInput.34ff6dd3.js";import"./KeycloakTextInput.b4d5b2db.js";import"./Text.c38ffb52.js";import"./copy-icon.cf10e1f5.js";import"./GridItem.0db472b0.js";function X(){const{t:e}=h("identity-providers"),{providerId:t}=f(),s=C(),{handleSubmit:d,formState:{isDirty:m}}=s,{adminClient:c}=P(),{addAlert:l,addError:p}=A(),u=F(),{realm:o}=g(),v=async i=>{try{await c.identityProviders.create({...i,providerId:t,alias:t}),l(e("createSuccess"),j.success),u(w({realm:o,providerId:t,alias:t,tab:"settings"}))}catch(y){p("identity-providers:createError",y)}};return a(b,{children:[r(z,{titleKey:e("addIdentityProvider",{provider:S(t)})}),r(I,{variant:"light",children:a(D,{role:"manage-identity-providers",isHorizontal:!0,onSubmit:d(v),children:[a(G,{...s,children:[r(V,{id:t}),r(k,{providerId:t})]}),a(H,{children:[r(n,{isDisabled:!m,variant:"primary",type:"submit","data-testid":"createProvider",children:e("common:add")}),r(n,{variant:"link","data-testid":"cancel",component:i=>r(x,{...i,to:E({realm:o})}),children:e("common:cancel")})]})]})})]})}export{X as default};
