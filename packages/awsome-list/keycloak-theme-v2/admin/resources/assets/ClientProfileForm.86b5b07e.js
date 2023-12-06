import{u as U,aw as W,az as X,ay as Z,r as u,bA as ee,g as te,a_ as ie,ae as re,aY as T,cD as S,cG as v,j as e,K as ae,h as o,F as h,ap as oe,P as le,av as w,s as d,b4 as P,cS as se,cT as ne,H as ce}from"./index.0cb2e516.js";import{u as de,c as me}from"./index.esm.6af887f8.js";import{F as ue}from"./FormAccess.bee4f1e0.js";import{V as fe}from"./ViewHeader.2586557f.js";import{H as F}from"./HelpItem.e440d5db.js";import{K as pe}from"./KeycloakTextInput.b4d5b2db.js";import{K as xe}from"./KeycloakTextArea.f5e2440a.js";import{u as he}from"./ConfirmDialog.f8013bbb.js";/* empty css                               */import{a as A,A as Pe}from"./FormGroup.3d5f3f16.js";import{F as ge,a as K}from"./FlexItem.308d9f82.js";import{T as L,a as V}from"./Text.c38ffb52.js";import{P as Ce}from"./plus-circle-icon.32cdf4dc.js";import{e as be,D as ke,a as ye,c as Te,d as ve}from"./DataListItemRow.8f458244.js";import{T as Ee}from"./trash-icon.1ac02c7c.js";import"./copy-icon.cf10e1f5.js";import"./GridItem.0db472b0.js";import"./Modal.6593dfcc.js";import"./data-list.f7ff2ea7.js";import"./grip-vertical-icon.1b75ab8f.js";const De={name:"",description:"",executors:[]};function $e(){const{t}=U("realm-settings"),g=W(),{handleSubmit:H,setValue:C,getValues:G,register:E,formState:{isDirty:D,errors:R},control:B}=de({defaultValues:De,mode:"onChange"}),{fields:b,remove:j}=me({name:"executors",control:B}),{addAlert:k,addError:y}=X(),{adminClient:x}=Z(),[m,q]=u.exports.useState(),[a,O]=u.exports.useState(!1),{realm:n,profileName:l}=ee(),z=te(),M=u.exports.useMemo(()=>z.componentTypes?.["org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProvider"],[]),[f,Y]=u.exports.useState(),c=!!l,[I,_]=u.exports.useState(0),$=()=>_(I+1);ie(()=>x.clientPolicies.listProfiles({includeGlobalProfiles:!0}),i=>{q({globalProfiles:i.globalProfiles,profiles:i.profiles?.filter(p=>p.name!==l)});const s=i.globalProfiles?.find(p=>p.name===l),r=i.profiles?.find(p=>p.name===l);O(s!==void 0),C("name",s?.name??r?.name),C("description",s?.description??r?.description),C("executors",s?.executors??r?.executors)},[I]);const J=async i=>{const s=i;try{await x.clientPolicies.createProfiles({...m,profiles:[...m?.profiles||[],s]}),k(t(c?"realm-settings:updateClientProfileSuccess":"realm-settings:createClientProfileSuccess"),T.success),g(S({realm:n,profileName:i.name}))}catch(r){y(c?"realm-settings:updateClientProfileError":"realm-settings:createClientProfileError",r)}},[N,Q]=he({titleKey:f?.name?t("deleteExecutorProfileConfirmTitle"):t("deleteClientProfileConfirmTitle"),messageKey:f?.name?t("deleteExecutorProfileConfirm",{executorName:f.name}):t("deleteClientProfileConfirm",{profileName:l}),continueButtonLabel:t("delete"),continueButtonVariant:re.danger,onConfirm:async()=>{if(f?.name){j(f.idx);try{await x.clientPolicies.createProfiles({...m,profiles:[...m.profiles||[],G()]}),k(t("deleteExecutorSuccess"),T.success),g(S({realm:n,profileName:l}))}catch(i){y(t("deleteExecutorError"),i)}}else try{await x.clientPolicies.createProfiles(m),k(t("deleteClientSuccess"),T.success),g(v({realm:n,tab:"profiles"}))}catch(i){y(t("deleteClientError"),i)}}});return m?o(h,{children:[e(Q,{}),e(fe,{titleKey:c?l:t("newClientProfile"),badges:[{id:"global-client-profile-badge",text:a?t("global"):""}],divider:!0,dropdownItems:c&&!a?[e(oe,{value:"delete",onClick:N,"data-testid":"deleteClientProfileDropdown",children:t("deleteClientProfile")},"delete")]:void 0}),e(le,{variant:"light",children:o(ue,{isHorizontal:!0,role:"view-realm",className:"pf-u-mt-lg",children:[e(A,{label:t("newClientProfileName"),fieldId:"kc-name",helperText:t("createClientProfileNameHelperText"),isRequired:!0,helperTextInvalid:t("common:required"),validated:R.name?w.error:w.default,children:e(pe,{ref:E({required:!0}),name:"name",type:"text",id:"name","aria-label":t("name"),"data-testid":"client-profile-name",isReadOnly:a})}),e(A,{label:t("common:description"),fieldId:"kc-description",children:e(xe,{ref:E(),name:"description",type:"text",id:"description","aria-label":t("description"),"data-testid":"client-profile-description",isReadOnly:a})}),o(Pe,{children:[!a&&e(d,{variant:"primary",onClick:()=>H(J)(),"data-testid":"saveCreateProfile",isDisabled:!D,children:t("common:save")}),c&&!a&&e(d,{id:"reloadProfile",variant:"link","data-testid":"reloadProfile",isDisabled:!D,onClick:$,children:t("realm-settings:reload")}),!c&&!a&&e(d,{id:"cancelCreateProfile",variant:"link",component:i=>e(P,{...i,to:v({realm:n,tab:"profiles"})}),"data-testid":"cancelCreateProfile",children:t("common:cancel")})]}),c&&o(h,{children:[o(ge,{children:[e(K,{children:o(L,{className:"kc-executors",component:V.h1,children:[t("executors"),e(F,{helpText:"realm-settings:executorsHelpText",fieldLabelId:"realm-settings:executors"})]})}),!a&&e(K,{align:{default:"alignRight"},children:e(d,{id:"addExecutor",component:i=>e(P,{...i,to:se({realm:n,profileName:l})}),variant:"link",className:"kc-addExecutor","data-testid":"addExecutor",icon:e(Ce,{}),children:t("realm-settings:addExecutor")})})]}),b.length>0&&o(h,{children:[e(be,{"aria-label":t("executors"),isCompact:!0,children:b.map((i,s)=>e(ke,{"aria-labelledby":"executors-list-item",id:i.executor,children:e(ye,{"data-testid":"executors-list-row",children:e(Te,{dataListCells:[o(ve,{"data-testid":"executor-type",children:[i.configuration?e(d,{component:r=>e(P,{...r,to:ne({realm:n,profileName:l,executorName:i.executor})}),variant:"link","data-testid":"editExecutor",children:i.executor}):e("span",{className:"kc-unclickable-executor",children:i.executor}),M?.filter(r=>r.id===i.executor).map(r=>o(u.exports.Fragment,{children:[e(F,{helpText:r.helpText,fieldLabelId:"realm-settings:executorTypeTextHelpText"},r.id),!a&&e(d,{variant:"link",isInline:!0,icon:e(Ee,{className:"kc-executor-trash-icon","data-testid":"deleteExecutor"},`executorType-trash-icon-${r.id}`),onClick:()=>{N(),Y({idx:s,name:r.id})}})]},r.id))]},"executor")]})})},i.executor))}),a&&e(d,{id:"backToClientPolicies",component:i=>e(P,{...i,to:v({realm:n,tab:"profiles"})}),variant:"primary",className:"kc-backToPolicies","data-testid":"backToClientPolicies",children:t("realm-settings:back")})]}),b.length===0&&o(h,{children:[e(ce,{}),e(L,{className:"kc-emptyExecutors",component:V.h6,children:t("realm-settings:emptyExecutors")})]})]})]})})]}):e(ae,{})}export{$e as default};