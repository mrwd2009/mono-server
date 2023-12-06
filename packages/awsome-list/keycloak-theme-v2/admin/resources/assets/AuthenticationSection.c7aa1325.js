import{_ as Ne,j as e,q as Fe,u as E,ay as x,az as $,aw as xe,l as U,r as C,s as _,ae as H,aY as L,aZ as ye,a_ as fe,K as Ae,aA as B,a$ as Y,av as W,h as g,b0 as ke,b1 as re,g as Pe,P as z,F as O,H as Le,S as Oe,T as ge,aB as Me,aC as Ve,aS as $e,n as Ue,b2 as De,b3 as se,b4 as ce,b5 as He,b6 as Ke,b7 as qe,b8 as Be,L as ze}from"./index.0cb2e516.js";import{K as we,L as je}from"./KeycloakDataTable.4e517788.js";import{V as Ge}from"./ViewHeader.2586557f.js";import{u as Ye}from"./ConfirmDialog.f8013bbb.js";import{u as j}from"./useToggle.8c992bea.js";import{u as G,F as ie,a as Ie,C as N,b as We}from"./index.esm.6af887f8.js";import{N as Qe}from"./NameDescription.09ef155c.js";import{M as ne,a as Se}from"./Modal.6593dfcc.js";import{F as Te,a as S,A as oe}from"./FormGroup.3d5f3f16.js";import{D as Ze}from"./DraggableTable.2d0d5d5a.js";import{F as le}from"./FormAccess.bee4f1e0.js";import{K as ee}from"./KeycloakTextInput.b4d5b2db.js";import{H as v,a as Je,b as Xe,c as ve,T as et,P as Ce}from"./HelpItem.e440d5db.js";import{N as te}from"./NumberInput.331c7b85.js";import{M as tt}from"./minus-circle-icon.de526f05.js";import{s as at,E as it,a as nt}from"./EmptyStateBody.a0363fe4.js";import{E as ot}from"./EmptyStateSecondaryActions.1a804d56.js";import{P as lt}from"./plus-circle-icon.32cdf4dc.js";import{S as Z,a as J,b as Q,C as rt,c as st}from"./Select.5a6b39aa.js";import{T as _e}from"./TimeSelector.1a65a2e3.js";import{u as ct}from"./useLocaleSort.84ea7ec0.js";import{R as de}from"./Radio.cfe305aa.js";import{M as dt}from"./MultiLineInput.e27bc560.js";import{Q as ut}from"./question-circle-icon.c9ca7908.js";import{T as ae,a as mt}from"./Text.c38ffb52.js";import{b as ht,T as M,a as V}from"./Tabs.3d61d369.js";import{f as pt}from"./resource.df4d2bbd.js";import{R as bt,r as yt}from"./RoutableTabs.f3cff418.js";import{T as ft}from"./Trans.ec4d13b3.js";const Re=t=>{var{children:i,className:a=""}=t,n=Ne(t,["children","className"]);return e("div",{...Object.assign({className:Fe(at.emptyStatePrimary,a)},n),children:i})};Re.displayName="EmptyStatePrimary";const At=({name:t,description:i,toggleDialog:a,onComplete:n})=>{const{t:u}=E("authentication"),s=G({shouldUnregister:!1}),{setValue:m,trigger:p,getValues:h}=s,{adminClient:f}=x(),{addAlert:y,addError:w}=$(),o=xe(),{realm:b}=U();C.exports.useEffect(()=>{m("description",i),m("alias",u("copyOf",{name:t}))},[t,i,m]);const l=async()=>{if(!await p())return;const P=h();try{await f.authenticationManagement.copyFlow({flow:t,newName:P.alias});const A=(await f.authenticationManagement.getFlows()).find(I=>I.alias===P.alias);P.description!==i&&(A.description=P.description,await f.authenticationManagement.updateFlow({flowId:A.id},A)),y(u("copyFlowSuccess"),L.success),o(ye({realm:b,id:A.id,usedBy:"notInUse",builtIn:A.builtIn?"builtIn":void 0}))}catch(A){w("authentication:copyFlowError",A)}n()};return e(ne,{title:u("duplicateFlow"),isOpen:!0,onClose:a,variant:Se.small,actions:[e(_,{id:"modal-confirm",onClick:l,"data-testid":"confirm",children:u("duplicate")},"confirm"),e(_,{"data-testid":"cancel",id:"modal-cancel",variant:H.link,onClick:()=>{a()},children:u("common:cancel")},"cancel")],children:e(ie,{...s,children:e(Te,{isHorizontal:!0,children:e(Qe,{})})})})},Pt=()=>{const{t}=E("authentication"),{adminClient:i}=x(),{addAlert:a,addError:n}=$(),[u,s]=C.exports.useState(),[m,p]=C.exports.useState(0),h=()=>p(m+1);fe(async()=>{const[o,b]=await Promise.all([i.authenticationManagement.getRequiredActions(),i.authenticationManagement.getUnregisteredRequiredActions()]);return[...o.map(l=>({name:l.name,enabled:l.enabled,defaultAction:l.defaultAction,data:l})),...b.map(l=>({name:l.name,enabled:!1,defaultAction:!1,data:l}))]},o=>s(o),[m]);const f=o=>!("alias"in o),y=async(o,b)=>{try{b in o?(o[b]=!o[b],await i.authenticationManagement.updateRequiredAction({alias:o.alias},o)):f(o)&&await i.authenticationManagement.registerRequiredAction({name:o.name,providerId:o.providerId}),h(),a(t("updatedRequiredActionSuccess"),L.success)}catch(l){n("authentication:updatedRequiredActionError",l)}},w=async(o,b)=>{try{const l=o.alias;for(let P=0;P<Math.abs(b);P++)b>0?await i.authenticationManagement.lowerRequiredActionPriority({alias:l}):await i.authenticationManagement.raiseRequiredActionPriority({alias:l});h(),a(t("updatedRequiredActionSuccess"),L.success)}catch(l){n("authentication:updatedRequiredActionError",l)}};return u?e(Ze,{keyField:"name",onDragFinish:async(o,b)=>{const l=u.map(c=>c.name),P=b.indexOf(o),A=l.indexOf(o),I=u[A].data;if(!I.alias)return;const T=P-A;w(I,T)},columns:[{name:"name",displayKey:"authentication:requiredActions"},{name:"enabled",displayKey:"common:enabled",cellRenderer:o=>e(B,{id:`enable-${Y(o.name)}`,label:t("common:on"),labelOff:t("common:off"),isChecked:o.enabled,onChange:()=>{y(o.data,"enabled")},"aria-label":Y(o.name)})},{name:"default",displayKey:"authentication:setAsDefaultAction",cellRenderer:o=>e(B,{id:`default-${Y(o.name)}`,label:t("common:on"),isDisabled:!o.enabled,labelOff:o.enabled?t("common:off"):t("disabledOff"),isChecked:o.defaultAction,onChange:()=>{y(o.data,"defaultAction")},"aria-label":Y(o.name)})}],data:u}):e(Ae,{})},Ee=" and ",ue=(t,i)=>t.map(a=>`${a.id}(${i[a.id]})`).join(Ee),gt=(t,i)=>t.split(Ee).map(wt).reduce((a,{id:n,value:u})=>{const s=i.find(m=>m.id===n);return s?a.concat({...s,value:u}):a},[]);function wt(t){const i=t.indexOf("(");if(i===-1)return{id:t.trim()};const a=t.substring(0,i).trim(),n=t.lastIndexOf(")");if(n===-1)return{id:a};const u=t.substring(i+1,n).trim();return{id:a,value:u}}const It=({policy:{id:t,configType:i,defaultValue:a,displayName:n},onRemove:u})=>{const{t:s}=E("authentication"),{control:m,register:p,formState:{errors:h}}=Ie();return e(S,{label:n,fieldId:t,isRequired:!0,helperTextInvalid:s("common:required"),validated:h[t]?W.error:W.default,labelIcon:e(v,{helpText:`authentication-help:passwordPolicies.${t}`,fieldLabelId:`authentication:${t}`}),children:g(ke,{children:[g(re,{isFilled:!0,children:[i&&i!=="int"&&e(ee,{id:t,"data-testid":t,ref:p({required:!0}),name:t,defaultValue:a,validated:h[t]?W.error:W.default}),i==="int"&&e(N,{name:t,defaultValue:Number.parseInt(a||"0"),control:m,render:({onChange:f,value:y})=>{const o=b=>f(Math.max(b,0));return e(te,{id:t,value:y,min:0,onPlus:()=>o(y+1),onMinus:()=>o(y-1),onChange:b=>{const l=Number(b.currentTarget.value);o(isNaN(l)?0:l)},className:"keycloak__policies_authentication__number-field"})}}),!i&&e(B,{id:t,label:s("common:on"),labelOff:s("common:off"),isChecked:!0,isDisabled:!0,"aria-label":n})]}),e(re,{children:e(_,{"data-testid":`remove-${t}`,variant:"link",className:"keycloak__policies_authentication__minus-icon",onClick:()=>u(t),"aria-label":s("common:remove"),children:e(tt,{})})})]})})},me=({onSelect:t,selectedPolicies:i})=>{const{t:a}=E("authentication"),{passwordPolicies:n}=Pe(),[u,s]=C.exports.useState(!1),m=C.exports.useMemo(()=>n?.filter(p=>i.find(h=>h.id===p.id)===void 0),[i]);return e(Z,{width:300,onSelect:(p,h)=>{t(h),s(!1)},onToggle:p=>s(p),isOpen:u,selections:a("addPolicy"),isDisabled:m?.length===0,children:m?.map(p=>e(J,{value:p,children:p.displayName},p.id))})},St=({realm:t,realmUpdated:i})=>{const{t:a}=E("authentication"),{passwordPolicies:n}=Pe(),{adminClient:u}=x(),{addAlert:s,addError:m}=$(),{realm:p}=U(),[h,f]=C.exports.useState([]),y=I=>f([...h,I]),w=G({shouldUnregister:!1}),{handleSubmit:o,setValue:b,getValues:l}=w,P=I=>{const T=gt(I.passwordPolicy||"",n);T.forEach(c=>{b(c.id,c.value)}),f(T)};C.exports.useEffect(()=>P(t),[]);const A=async I=>{const T={...t,passwordPolicy:ue(h,I)};try{await u.realms.update({realm:p},T),i(T),P(T),s(a("updatePasswordPolicySuccess"),L.success)}catch(c){m("authentication:updatePasswordPolicyError",c)}};return g(z,{variant:"light",className:"pf-u-p-0",children:[(h.length!==0||t.passwordPolicy)&&g(O,{children:[e(Je,{children:e(Xe,{children:e(ve,{children:e(me,{onSelect:y,selectedPolicies:h})})})}),e(Le,{}),e(z,{variant:"light",children:e(ie,{...w,children:g(le,{className:"keycloak__policies_authentication__form",role:"manage-realm",isHorizontal:!0,onSubmit:o(A),children:[h.map((I,T)=>e(It,{policy:I,onRemove:c=>f(h.filter(d=>d.id!==c))},`${I.id}-${T}`)),g(oe,{children:[e(_,{"data-testid":"save",variant:"primary",type:"submit",isDisabled:ue(h,l())===t.passwordPolicy,children:a("common:save")}),e(_,{"data-testid":"reload",variant:H.link,onClick:()=>P(t),children:a("common:reload")})]})]})})})]}),!h.length&&!t.passwordPolicy&&g(it,{"data-testid":"empty-state",variant:"large",children:[e(ot,{icon:lt}),e(et,{headingLevel:"h1",size:"lg",children:a("noPasswordPolicies")}),e(nt,{children:a("noPasswordPoliciesInstructions")}),e(Re,{children:e(me,{onSelect:y,selectedPolicies:[]})})]})]})};const D=["totp","hotp"],he=["SHA1","SHA256","SHA512"],pe=[6,8],Tt=({realm:t,realmUpdated:i})=>{const{t:a}=E("authentication"),{control:n,reset:u,handleSubmit:s,formState:{isDirty:m,errors:p}}=G({mode:"onChange"}),{adminClient:h}=x(),{realm:f}=U(),{addAlert:y,addError:w}=$(),o=ct(),[b,l]=j(),P=We({name:"otpPolicyType",control:n,defaultValue:D[0]}),A=c=>u(c);C.exports.useEffect(()=>A(t),[]);const I=C.exports.useMemo(()=>{const c=(t.otpSupportedApplications??[]).map(d=>a(`otpSupportedApplications.${d}`));return o(c,d=>d)},[t.otpSupportedApplications]);return e(z,{variant:"light",children:g(le,{role:"manage-realm",isHorizontal:!0,onSubmit:s(async c=>{try{await h.realms.update({realm:f},c);const d=await h.realms.findOne({realm:f});i(d),A(d),y(a("updateOtpSuccess"),L.success)}catch(d){w("authentication:updateOtpError",d)}}),className:"keycloak__otp_policies_authentication__form",children:[e(S,{label:a("otpType"),labelIcon:e(v,{helpText:"authentication-help:otpType",fieldLabelId:"authentication:otpType"}),fieldId:"otpType",hasNoPaddingTop:!0,children:e(N,{name:"otpPolicyType","data-testid":"otpPolicyType",defaultValue:D[0],control:n,render:({onChange:c,value:d})=>e(O,{children:D.map(r=>e(de,{id:r,"data-testid":r,isChecked:d===r,name:"otpPolicyType",onChange:()=>c(r),label:a(`policyType.${r}`),className:"keycloak__otp_policies_authentication__policy-type"},r))})})}),e(S,{label:a("otpHashAlgorithm"),labelIcon:e(v,{helpText:"authentication-help:otpHashAlgorithm",fieldLabelId:"authentication:otpHashAlgorithm"}),fieldId:"otpHashAlgorithm",children:e(N,{name:"otpPolicyAlgorithm",defaultValue:`Hmac${he[0]}`,control:n,render:({onChange:c,value:d})=>e(Z,{toggleId:"otpHashAlgorithm",onToggle:l,onSelect:(r,R)=>{c(R.toString()),l()},selections:d,variant:Q.single,"aria-label":a("otpHashAlgorithm"),isOpen:b,children:he.map(r=>e(J,{selected:`Hmac${r}`===d,value:`Hmac${r}`,children:r},r))})})}),e(S,{label:a("otpPolicyDigits"),labelIcon:e(v,{helpText:"authentication-help:otpPolicyDigits",fieldLabelId:"authentication:otpPolicyDigits"}),fieldId:"otpPolicyDigits",hasNoPaddingTop:!0,children:e(N,{name:"otpPolicyDigits","data-testid":"otpPolicyDigits",defaultValue:pe[0],control:n,render:({onChange:c,value:d})=>e(O,{children:pe.map(r=>e(de,{id:`digit-${r}`,"data-testid":`digit-${r}`,isChecked:d===r,name:"otpPolicyDigits",onChange:()=>c(r),label:r,className:"keycloak__otp_policies_authentication__number-of-digits"},r))})})}),e(S,{label:a("lookAhead"),labelIcon:e(v,{helpText:"authentication-help:lookAhead",fieldLabelId:"authentication:lookAhead"}),fieldId:"lookAhead",children:e(N,{name:"otpPolicyLookAheadWindow",defaultValue:1,control:n,render:({onChange:c,value:d})=>{const R=F=>c(Math.max(F,0));return e(te,{id:"lookAhead",value:d,min:0,onPlus:()=>R(d+1),onMinus:()=>R(d-1),onChange:F=>{const k=Number(F.currentTarget.value);R(isNaN(k)?0:k)}})}})}),P===D[0]&&e(S,{label:a("otpPolicyPeriod"),fieldId:"otpPolicyPeriod",helperTextInvalid:a("otpPolicyPeriodErrorHint"),validated:p.otpPolicyPeriod?"error":"default",labelIcon:e(v,{helpText:"authentication-help:otpPolicyPeriod",fieldLabelId:"authentication:otpPolicyPeriod"}),children:e(N,{name:"otpPolicyPeriod",defaultValue:30,control:n,rules:{min:1,max:120},render:({onChange:c,value:d})=>e(_e,{"data-testid":"otpPolicyPeriod","aria-label":a("otpPolicyPeriod"),value:d,onChange:c,units:["second","minute"],validated:p.otpPolicyPeriod?"error":"default"})})}),P===D[1]&&e(S,{label:a("initialCounter"),fieldId:"initialCounter",helperTextInvalid:a("initialCounterErrorHint"),validated:p.otpPolicyInitialCounter?"error":"default",labelIcon:e(v,{helpText:"authentication-help:initialCounter",fieldLabelId:"authentication:initialCounter"}),children:e(N,{name:"otpPolicyInitialCounter",defaultValue:30,control:n,rules:{min:1,max:120},render:({onChange:c,value:d})=>{const R=F=>c(Math.max(F,1));return e(te,{id:"initialCounter",value:d,min:1,onPlus:()=>R(d+1),onMinus:()=>R(d-1),onChange:F=>{const k=Number(F.currentTarget.value);R(isNaN(k)?30:k)}})}})}),e(S,{label:a("supportedApplications"),labelIcon:e(v,{helpText:"authentication-help:supportedApplications",fieldLabelId:"authentication:supportedApplications"}),children:e(rt,{"data-testid":"supportedApplications",children:I.map(c=>e(st,{isReadOnly:!0,children:c},c))})}),P===D[0]&&e(S,{label:a("otpPolicyCodeReusable"),fieldId:"otpPolicyCodeReusable",labelIcon:e(v,{helpText:"authentication-help:otpPolicyCodeReusable",fieldLabelId:"authentication:otpPolicyCodeReusable"}),children:e(N,{name:"otpPolicyCodeReusable",defaultValue:!0,control:n,render:({onChange:c,value:d})=>e(B,{id:"otpPolicyCodeReusable",label:a("common:on"),labelOff:a("common:off"),isChecked:d,onChange:c})})}),g(oe,{children:[e(_,{"data-testid":"save",variant:"primary",type:"submit",isDisabled:!m,children:a("common:save")}),e(_,{"data-testid":"reload",variant:H.link,onClick:()=>u({...t}),children:a("common:reload")})]})]})})};const vt=["ES256","ES384","ES512","RS256","RS384","RS512","RS1"],Ct=["not specified","none","indirect","direct"],_t=["not specified","platform","cross-platform"],Rt=["not specified","Yes","No"],Et=["not specified","required","preferred","discouraged"],K=({name:t,label:i,options:a,labelPrefix:n,isMultiSelect:u=!1})=>{const{t:s}=E("authentication"),{control:m}=Ie(),[p,h]=C.exports.useState(!1);return e(S,{label:s(i),labelIcon:e(v,{helpText:`authentication-help:${i}`,fieldLabelId:`authentication:${i}`}),fieldId:t,children:e(N,{name:t,defaultValue:a[0],control:m,render:({onChange:f,value:y})=>e(Z,{toggleId:t,onToggle:h,onSelect:(w,o)=>{if(u){const b=y.find(l=>l===o)?y.filter(l=>l!==o):[...y,o];f(b)}else f(o.toString()),h(!1)},selections:n?s(`${n}.${y}`):y,variant:u?Q.typeaheadMulti:Q.single,"aria-label":s(t),typeAheadAriaLabel:s(t),isOpen:p,children:a.map(w=>e(J,{selected:w===y,value:w,children:n?s(`${n}.${w}`):w},w))})})})},be=({realm:t,realmUpdated:i,isPasswordLess:a=!1})=>{const{t:n}=E("authentication"),{adminClient:u}=x(),{addAlert:s,addError:m}=$(),{realm:p}=U(),{enabled:h}=Oe(),f=G({mode:"onChange",shouldUnregister:!1}),{control:y,register:w,setValue:o,errors:b,handleSubmit:l,formState:{isDirty:P}}=f,A=a?"webAuthnPolicyPasswordless":"webAuthnPolicy",I=c=>Me(c,o);C.exports.useEffect(()=>I(t),[]);const T=async c=>{const d=Ve(c);try{await u.realms.update({realm:p},d),i(d),I(d),s(n("webAuthnUpdateSuccess"),L.success)}catch(r){m("authentication:webAuthnUpdateError",r)}};return g(z,{variant:"light",children:[h&&e(Ce,{bodyContent:n(`authentication-help:${A}FormHelp`),children:e(ge,{className:"keycloak__section_intro__help",children:g(ae,{children:[e(ut,{})," ",n("authentication-help:webauthnIntro")]})})}),g(le,{role:"manage-realm",isHorizontal:!0,onSubmit:l(T),className:"keycloak__webauthn_policies_authentication__form",children:[e(S,{label:n("webAuthnPolicyRpEntityName"),fieldId:"webAuthnPolicyRpEntityName",helperTextInvalid:n("common:required"),validated:b.webAuthnPolicyRpEntityName?"error":"default",isRequired:!0,labelIcon:e(v,{helpText:"authentication-help:webAuthnPolicyRpEntityName",fieldLabelId:"authentication:webAuthnPolicyRpEntityName"}),children:e(ee,{ref:w({required:!0}),name:`${A}RpEntityName`,id:"webAuthnPolicyRpEntityName","data-testid":"webAuthnPolicyRpEntityName",validated:b.webAuthnPolicyRpEntityName?"error":"default"})}),g(ie,{...f,children:[e(K,{name:`${A}SignatureAlgorithms`,label:"webAuthnPolicySignatureAlgorithms",options:vt,isMultiSelect:!0}),e(S,{label:n("webAuthnPolicyRpId"),labelIcon:e(v,{helpText:"authentication-help:webAuthnPolicyRpId",fieldLabelId:"authentication:webAuthnPolicyRpId"}),fieldId:"webAuthnPolicyRpId",children:e(ee,{id:"webAuthnPolicyRpId",name:`${A}RpId`,ref:w(),"data-testid":"webAuthnPolicyRpId "})}),e(K,{name:`${A}AttestationConveyancePreference`,label:"webAuthnPolicyAttestationConveyancePreference",options:Ct,labelPrefix:"attestationPreference"}),e(K,{name:`${A}AuthenticatorAttachment`,label:"webAuthnPolicyAuthenticatorAttachment",options:_t,labelPrefix:"authenticatorAttachment"}),e(K,{name:`${A}RequireResidentKey`,label:"webAuthnPolicyRequireResidentKey",options:Rt,labelPrefix:"residentKey"}),e(K,{name:`${A}UserVerificationRequirement`,label:"webAuthnPolicyUserVerificationRequirement",options:Et,labelPrefix:"userVerify"}),e(S,{label:n("webAuthnPolicyCreateTimeout"),fieldId:"webAuthnPolicyCreateTimeout",helperTextInvalid:n("webAuthnPolicyCreateTimeoutHint"),validated:b.webAuthnPolicyCreateTimeout?"error":"default",labelIcon:e(v,{helpText:"authentication-help:webAuthnPolicyCreateTimeout",fieldLabelId:"authentication:webAuthnPolicyCreateTimeout"}),children:e(N,{name:`${A}CreateTimeout`,defaultValue:0,control:y,rules:{min:0,max:31536},render:({onChange:c,value:d})=>e(_e,{"data-testid":"webAuthnPolicyCreateTimeout","aria-label":n("webAuthnPolicyCreateTimeout"),value:d,onChange:c,units:["second","minute","hour"],validated:b.webAuthnPolicyCreateTimeout?"error":"default"})})}),e(S,{label:n("webAuthnPolicyAvoidSameAuthenticatorRegister"),fieldId:"webAuthnPolicyAvoidSameAuthenticatorRegister",labelIcon:e(v,{helpText:"authentication-help:webAuthnPolicyAvoidSameAuthenticatorRegister",fieldLabelId:"authentication:webAuthnPolicyAvoidSameAuthenticatorRegister"}),children:e(N,{name:`${A}AvoidSameAuthenticatorRegister`,defaultValue:!1,control:y,render:({onChange:c,value:d})=>e(B,{id:"webAuthnPolicyAvoidSameAuthenticatorRegister",label:n("common:on"),labelOff:n("common:off"),isChecked:d,onChange:c,"aria-label":n("webAuthnPolicyAvoidSameAuthenticatorRegister")})})}),e(S,{label:n("webAuthnPolicyAcceptableAaguids"),fieldId:"webAuthnPolicyAcceptableAaguids",labelIcon:e(v,{helpText:"authentication-help:webAuthnPolicyAcceptableAaguids",fieldLabelId:"authentication:webAuthnPolicyAcceptableAaguids"}),children:e(dt,{name:`${A}AcceptableAaguids`,"aria-label":n("webAuthnPolicyAcceptableAaguids"),addButtonLabel:"authentication:addAaguids"})})]}),g(oe,{children:[e(_,{"data-testid":"save",variant:"primary",type:"submit",isDisabled:!P,children:n("common:save")}),e(_,{"data-testid":"reload",variant:H.link,onClick:()=>I(t),children:n("common:reload")})]})]})]})},Nt=()=>{const{t}=E("authentication"),[i,a]=C.exports.useState(1),{adminClient:n}=x(),{realm:u}=U(),[s,m]=C.exports.useState();return fe(async()=>{const p=await n.realms.findOne({realm:u});if(!p)throw new Error(t("common:notFound"));return p},p=>{m(p)},[]),s?g(ht,{activeKey:i,onSelect:(p,h)=>a(h),mountOnEnter:!0,unmountOnExit:!0,children:[e(M,{id:"passwordPolicy",eventKey:1,title:e(V,{children:t("passwordPolicy")}),children:e(St,{realm:s,realmUpdated:m})}),e(M,{id:"otpPolicy",eventKey:2,title:e(V,{children:t("otpPolicy")}),children:e(Tt,{realm:s,realmUpdated:m})}),e(M,{id:"webauthnPolicy",eventKey:3,title:e(V,{children:t("webauthnPolicy")}),children:e(be,{realm:s,realmUpdated:m})}),e(M,{id:"webauthnPasswordlessPolicy",eventKey:4,title:e(V,{children:t("webauthnPasswordlessPolicy")}),children:e(be,{realm:s,realmUpdated:m,isPasswordLess:!0})})]}):e(Ae,{})},Ft=({flowAlias:t,onClose:i})=>{const{t:a}=E("authentication"),{control:n,handleSubmit:u}=G(),{adminClient:s}=x(),{addAlert:m,addError:p}=$(),{realm:h}=U(),[f,y]=j(),w=async({bindingType:o})=>{const b=await s.realms.findOne({realm:h});try{await s.realms.update({realm:h},{...b,[o]:t}),m(a("updateFlowSuccess"),L.success)}catch(l){p("authentication:updateFlowError",l)}i()};return e(ne,{title:a("bindFlow"),isOpen:!0,variant:"small",onClose:i,actions:[e(_,{id:"modal-confirm","data-testid":"save",type:"submit",form:"bind-form",children:a("common:save")},"confirm"),e(_,{"data-testid":"cancel",id:"modal-cancel",variant:H.link,onClick:i,children:a("common:cancel")},"cancel")],children:e(Te,{id:"bind-form",isHorizontal:!0,onSubmit:u(w),children:e(S,{label:a("chooseBindingType"),fieldId:"chooseBindingType",children:e(N,{name:"bindingType",defaultValue:"browserFlow",control:n,render:({onChange:o,value:b})=>e(Z,{toggleId:"chooseBindingType",onToggle:y,onSelect:(l,P)=>{o(P.toString()),y()},selections:b,variant:Q.single,"aria-label":a("bindingFlow"),isOpen:f,menuAppendTo:"parent",children:[...q.keys()].filter(l=>l!=="dockerAuthenticationFlow").map(l=>{const P=q.get(l);return e(J,{selected:l===q.get(l),value:l,children:a(`flow.${P}`)},l)})})})})})})};const X=({label:t})=>g(O,{children:[e($e,{className:"keycloak_authentication-section__usedby"})," ",t]}),xt=({id:t,isSpecificClient:i,onClose:a})=>{const{t:n}=E("authentication"),{adminClient:u}=x(),s=async(m,p,h)=>(await pt({adminClient:u,id:t,type:i?"clients":"idp",first:m||0,max:p||10,search:h})).map(y=>({name:y}));return e(ne,{header:g(ge,{children:[e(ae,{component:mt.h1,children:n("flowUsedBy")}),e(ae,{children:n("flowUsedByDescription",{value:n(i?"clients":"identiyProviders")})})]}),variant:Se.medium,isOpen:!0,onClose:a,actions:[e(_,{"data-testid":"cancel",id:"modal-cancel",onClick:a,children:n("common:close")},"cancel")],children:e(we,{loader:s,isPaginated:!0,ariaLabelKey:"authentication:usedBy",searchPlaceholderKey:"common:search",columns:[{name:"name"}]})})},kt=({authType:{id:t,usedBy:i}})=>{const{t:a}=E("authentication"),[n,u]=j();return g(O,{children:[n&&e(xt,{id:t,onClose:u,isSpecificClient:i?.type==="SPECIFIC_CLIENTS"}),(i?.type==="SPECIFIC_PROVIDERS"||i?.type==="SPECIFIC_CLIENTS")&&(i.values.length<=8?e(Ce,{"aria-label":a("usedBy"),bodyContent:g("div",{children:[a("appliedBy"+(i.type==="SPECIFIC_CLIENTS"?"Clients":"Providers"))," ",i.values.map((s,m)=>g(O,{children:[e("strong",{children:s}),m<i.values.length-1?", ":""]}))]},`usedBy-${t}-${i.values}`),children:e(_,{variant:"link",className:"keycloak__used-by__popover-button",children:e(X,{label:a(`used.${i.type}`)})})},t):e(_,{variant:"link",className:"keycloak__used-by__popover-button",onClick:u,children:e(X,{label:a(`used.${i.type}`)})})),i?.type==="DEFAULT"&&e(X,{label:a([...q.values()].includes(i.values[0])?`flow.${i.values[0]}`:i.values[0])}),!i?.type&&a("used.notInUse")]})};const q=new Map([["browserFlow","browser"],["registrationFlow","registration"],["directGrantFlow","direct grant"],["resetCredentialsFlow","reset credentials"],["clientAuthenticationFlow","clients"],["dockerAuthenticationFlow","docker auth"]]);function Lt(){const{t}=E("authentication"),{adminClient:i}=x(),{realm:a}=U(),n=Ue(),[u,s]=C.exports.useState(0),m=()=>s(u+1),{addAlert:p,addError:h}=$(),[f,y]=C.exports.useState(),[w,o]=j(),[b,l]=j(),P=async()=>{const R=await(await fetch(`${Ke(i.baseUrl)}admin/realms/${a}/admin-ui-authentication-management/flows`,{method:"GET",headers:qe(await i.getAccessToken())})).json();return Be(R,F=>F.usedBy?.type)},[A,I]=Ye({titleKey:"authentication:deleteConfirmFlow",children:g(ft,{i18nKey:"authentication:deleteConfirmFlowMessage",children:[" ",e("strong",{children:{flow:f?f.alias:""}}),"."]}),continueButtonLabel:"common:delete",continueButtonVariant:H.danger,onConfirm:async()=>{try{await i.authenticationManagement.deleteFlow({flowId:f.id}),m(),p(t("deleteFlowSuccess"),L.success)}catch(r){h("authentication:deleteFlowError",r)}}}),T=r=>e(kt,{authType:r}),c=({id:r,alias:R,usedBy:F,builtIn:k})=>g(O,{children:[e(ce,{to:ye({realm:a,id:r,usedBy:F?.type||"notInUse",builtIn:k?"builtIn":void 0}),children:R},`link-${r}`)," ",k&&e(ze,{children:t("buildIn")},`label-${r}`)]}),d=r=>yt({to:se({realm:a,tab:r}),history:n});return g(O,{children:[e(I,{}),w&&e(At,{name:f?f.alias:"",description:f?.description,toggleDialog:o,onComplete:()=>{m(),o()}}),b&&e(Ft,{onClose:()=>{l(),m()},flowAlias:f?.alias}),e(Ge,{titleKey:"authentication:title",subKey:"authentication:authenticationExplain",helpUrl:De.authenticationUrl,divider:!1}),e(z,{variant:"light",className:"pf-u-p-0",children:g(bt,{isBox:!0,defaultLocation:se({realm:a,tab:"flows"}),children:[e(M,{"data-testid":"flows",title:e(V,{children:t("flows")}),...d("flows"),children:e(we,{loader:P,ariaLabelKey:"authentication:title",searchPlaceholderKey:"authentication:searchForFlow",toolbarItem:e(ve,{children:e(_,{component:r=>e(ce,{...r,to:He({realm:a})}),children:t("createFlow")})}),actionResolver:({data:r})=>[{title:t("duplicate"),onClick:()=>{o(),y(r)}},...r.usedBy?.type!=="DEFAULT"?[{title:t("bindFlow"),onClick:()=>{l(),y(r)}}]:[],...!r.builtIn&&!r.usedBy?[{title:t("common:delete"),onClick:()=>{y(r),A()}}]:[]],columns:[{name:"alias",displayKey:"authentication:flowName",cellRenderer:c},{name:"usedBy",displayKey:"authentication:usedBy",cellRenderer:T},{name:"description",displayKey:"common:description"}],emptyState:e(je,{message:t("emptyEvents"),instructions:t("emptyEventsInstructions")})},u)}),e(M,{"data-testid":"requiredActions",title:e(V,{children:t("requiredActions")}),...d("required-actions"),children:e(Pt,{})}),e(M,{"data-testid":"policies",title:e(V,{children:t("policies")}),...d("policies"),children:e(Nt,{})})]})})]})}const da=Object.freeze(Object.defineProperty({__proto__:null,REALM_FLOWS:q,default:Lt},Symbol.toStringTag,{value:"Module"}));export{da as A,Ft as B,At as D};