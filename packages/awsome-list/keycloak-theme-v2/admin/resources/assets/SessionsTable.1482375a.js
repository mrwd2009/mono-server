import{ac as I,l as D,V as k,u as z,ay as w,az as x,r as d,h as R,F as V,j as e,s as O,b4 as y,bW as j,bP as F}from"./index.0cb2e516.js";import{u as M}from"./ConfirmDialog.f8013bbb.js";import{K as T,L as U}from"./KeycloakDataTable.4e517788.js";import{u as E}from"./useFormatDate.53169b6c.js";import{c as P}from"./HelpItem.e440d5db.js";import{L as B,a as W,b as q}from"./ListItem.f69883ba.js";const G={name:"CubesIcon",height:512,width:512,svgPath:"M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z",yOffset:0,xOffset:0},H=I(G);function ss({loader:f,hiddenColumns:a=[],emptyInstructions:l,logoutUser:i}){const{realm:o}=D(),{whoAmI:C}=k(),{t:n}=z("sessions"),{keycloak:g,adminClient:r}=w(),{addError:p}=x(),c=E(),[h,b]=d.exports.useState(0),m=()=>b(t=>t+1),v=d.exports.useMemo(()=>[{name:"username",displayKey:"sessions:user",cellRenderer:s=>e(y,{to:j({realm:o,id:s.userId,tab:"sessions"}),children:s.username})},{name:"start",displayKey:"sessions:started",cellRenderer:s=>c(new Date(s.start))},{name:"lastAccess",displayKey:"sessions:lastAccess",cellRenderer:s=>c(new Date(s.lastAccess))},{name:"ipAddress",displayKey:"events:ipAddress"},{name:"clients",displayKey:"sessions:clients",cellRenderer:s=>e(B,{variant:W.inline,children:Object.entries(s.clients).map(([u,L])=>e(q,{children:e(y,{to:F({realm:o,clientId:u,tab:"sessions"}),children:L})},u))})}].filter(({name:s})=>!a.includes(s)),[o,a]),[A,S]=M({titleKey:"sessions:logoutAllSessions",messageKey:"sessions:logoutAllDescription",continueButtonLabel:"common:confirm",onConfirm:async()=>{try{await r.users.logout({id:i}),m()}catch(t){p("sessions:logoutAllSessionsError",t)}}});async function K(t){await r.realms.deleteSession({realm:o,session:t.id}),t.userId===C.getUserId()?await g.logout({redirectUri:""}):m()}return R(V,{children:[e(S,{}),e(T,{loader:f,ariaLabelKey:"sessions:title",searchPlaceholderKey:"sessions:searchForSession",toolbarItem:i&&e(P,{children:e(O,{onClick:A,children:n("logoutAllSessions")})}),columns:v,actions:[{title:n("common:signOut"),onRowClick:K}],emptyState:e(U,{hasIcon:!0,icon:H,message:n("noSessions"),instructions:l||n("noSessionsDescription")})},h)]})}export{H as C,ss as S};