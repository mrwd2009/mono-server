import{u as I,ay as P,l as S,r as q,a_ as x,h as s,F as R,j as e,aA as v,aw as A,bA as H,az as L,P as y,s as T,cI as C,aY as D}from"./index.0cb2e516.js";import{b as N,C as k,u as O,F as E}from"./index.esm.6af887f8.js";import{F as V}from"./FormAccess.bee4f1e0.js";import{H as n}from"./HelpItem.e440d5db.js";import{W as $,H as K,S as M}from"./Header.d933d0e7.js";import{K as c}from"./KeycloakTextInput.b4d5b2db.js";import{i as U}from"./isEqual.b67f23a3.js";import{a as d,F as Y,A as _}from"./FormGroup.3d5f3f16.js";import{S as j,b as z,a as w}from"./Select.5a6b39aa.js";import"./copy-icon.cf10e1f5.js";import"./GridItem.0db472b0.js";import"./Text.c38ffb52.js";import"./useToggle.8c992bea.js";import"./NumberInput.331c7b85.js";import"./plus-icon.407671b4.js";import"./ConfirmDialog.f8013bbb.js";import"./Modal.6593dfcc.js";import"./ViewHeader.2586557f.js";import"./check.51c67984.js";import"./star-icon.97692015.js";const W=({form:a,showSectionHeading:i=!1,showSectionDescription:m=!1})=>{const{t:r}=I("user-federation"),{t:f}=I("user-federation-help"),{adminClient:l}=P(),{realm:b}=S(),[h,p]=q.exports.useState(!1),g=N({control:a.control,name:"config.allowPasswordAuthentication"});return x(()=>l.realms.findOne({realm:b}),t=>a.setValue("parentId",t.id),[]),s(R,{children:[i&&e($,{title:r("requiredSettings"),description:f("kerberosRequiredSettingsDescription"),showDescription:m}),s(V,{role:"manage-realm",isHorizontal:!0,children:[s(d,{label:r("consoleDisplayName"),labelIcon:e(n,{helpText:"user-federation-help:consoleDisplayNameHelp",fieldLabelId:"user-federation:consoleDisplayName"}),fieldId:"kc-console-display-name",isRequired:!0,validated:a.errors.name?"error":"default",helperTextInvalid:a.errors.name?.message,children:[e(c,{hidden:!0,type:"text",id:"kc-console-providerId",name:"providerId",defaultValue:"kerberos",ref:a.register,"aria-label":r("providerId")}),e(c,{hidden:!0,type:"text",id:"kc-console-providerType",name:"providerType",defaultValue:"org.keycloak.storage.UserStorageProvider",ref:a.register,"aria-label":r("providerType")}),e(c,{hidden:!0,type:"text",id:"kc-console-parentId",name:"parentId",defaultValue:b,ref:a.register,"aria-label":r("parentId")}),e(c,{isRequired:!0,type:"text",id:"kc-console-name",name:"name",ref:a.register({required:{value:!0,message:`${r("validateName")}`}}),"data-testid":"kerberos-name",validated:a.errors.name?"error":"default","aria-label":r("consoleDisplayName")})]}),e(d,{label:r("kerberosRealm"),labelIcon:e(n,{helpText:"user-federation-help:kerberosRealmHelp",fieldLabelId:"user-federation:kc-kerberos-realm"}),fieldId:"kc-kerberos-realm",isRequired:!0,validated:a.errors.config?.kerberosRealm?.[0]?"error":"default",helperTextInvalid:a.errors.config?.kerberosRealm?.[0].message,children:e(c,{isRequired:!0,type:"text",id:"kc-kerberos-realm",name:"config.kerberosRealm[0]",ref:a.register({required:{value:!0,message:`${r("validateRealm")}`}}),"data-testid":"kerberos-realm","aria-label":r("kerberosRealm"),validated:a.errors.config?.kerberosRealm?.[0]?"error":"default"})}),e(d,{label:r("serverPrincipal"),labelIcon:e(n,{helpText:"user-federation-help:serverPrincipalHelp",fieldLabelId:"user-federation:serverPrincipal"}),fieldId:"kc-server-principal",isRequired:!0,validated:a.errors.config?.serverPrincipal?.[0]?"error":"default",helperTextInvalid:a.errors.config?.serverPrincipal?.[0].message,children:e(c,{isRequired:!0,type:"text",id:"kc-server-principal",name:"config.serverPrincipal[0]",ref:a.register({required:{value:!0,message:`${r("validateServerPrincipal")}`}}),"data-testid":"kerberos-principal","aria-label":r("kerberosPrincipal"),validated:a.errors.config?.serverPrincipal?.[0]?"error":"default"})}),e(d,{label:r("keyTab"),labelIcon:e(n,{helpText:"user-federation-help:keyTabHelp",fieldLabelId:"user-federation:keyTab"}),fieldId:"kc-key-tab",isRequired:!0,validated:a.errors.config?.keyTab?.[0]?"error":"default",helperTextInvalid:a.errors.config?.keyTab?.[0].message,children:e(c,{isRequired:!0,type:"text",id:"kc-key-tab",name:"config.keyTab[0]",ref:a.register({required:{value:!0,message:`${r("validateKeyTab")}`}}),"data-testid":"kerberos-keytab","aria-label":r("kerberosKeyTab"),validated:a.errors.config?.keyTab?.[0]?"error":"default"})}),s(d,{label:r("debug"),labelIcon:e(n,{helpText:"user-federation-help:debugHelp",fieldLabelId:"user-federation:debug"}),fieldId:"kc-debug",hasNoPaddingTop:!0,children:[" ",e(k,{name:"config.debug",defaultValue:["false"],control:a.control,render:({onChange:t,value:o})=>e(v,{id:"kc-debug","data-testid":"debug",onChange:u=>t([`${u}`]),isChecked:o?.[0]==="true",label:r("common:on"),labelOff:r("common:off"),"aria-label":r("debug")})})]}),e(d,{label:r("allowPasswordAuthentication"),labelIcon:e(n,{helpText:"user-federation-help:allowPasswordAuthenticationHelp",fieldLabelId:"user-federation:allowPasswordAuthentication"}),fieldId:"kc-allow-password-authentication",hasNoPaddingTop:!0,children:e(k,{name:"config.allowPasswordAuthentication",defaultValue:["false"],control:a.control,render:({onChange:t,value:o})=>e(v,{id:"kc-allow-password-authentication","data-testid":"allow-password-authentication",onChange:u=>t([`${u}`]),isChecked:o?.[0]==="true",label:r("common:on"),labelOff:r("common:off"),"aria-label":r("allowPasswordAuthentication")})})}),U(g,["true"])?s(d,{label:r("editMode"),labelIcon:e(n,{helpText:"user-federation-help:editModeKerberosHelp",fieldLabelId:"user-federation:editMode"}),isRequired:!0,fieldId:"kc-edit-mode",children:[" ",e(k,{name:"config.editMode[0]",defaultValue:"READ_ONLY",control:a.control,rules:{required:!0},render:({onChange:t,value:o})=>s(j,{toggleId:"kc-edit-mode",required:!0,onToggle:()=>p(!h),isOpen:h,onSelect:(u,F)=>{t(F),p(!1)},selections:o,variant:z.single,children:[e(w,{value:"READ_ONLY",isPlaceholder:!0},0),e(w,{value:"UNSYNCED"},1)]})})]}):null,e(d,{label:r("updateFirstLogin"),labelIcon:e(n,{helpText:"user-federation-help:updateFirstLoginHelp",fieldLabelId:"user-federation:updateFirstLogin"}),fieldId:"kc-update-first-login",hasNoPaddingTop:!0,children:e(k,{name:"config.updateProfileFirstLogin",defaultValue:["false"],control:a.control,render:({onChange:t,value:o})=>e(v,{id:"kc-update-first-login","data-testid":"update-first-login",onChange:u=>t([`${u}`]),isChecked:o?.[0]==="true",label:r("common:on"),labelOff:r("common:off"),"aria-label":r("updateFirstLogin")})})})]})]})};function fe(){const{t:a}=I("user-federation"),i=O({mode:"onChange"}),m=A(),{adminClient:r}=P(),{realm:f}=S(),{id:l}=H(),{addAlert:b,addError:h}=L();x(async()=>{if(l)return r.components.findOne({id:l})},t=>{if(t)p(t);else if(l)throw new Error(a("common:notFound"))},[]);const p=t=>{i.reset({...t})},g=async t=>{try{l?await r.components.update({id:l},t):(await r.components.create(t),m(`/${f}/user-federation`)),p(t),b(a(l?"saveSuccess":"createSuccess"),D.success)}catch(o){h(`user-federation:${l?"saveError":"createError"}`,o)}};return s(R,{children:[e(E,{...i,children:e(K,{provider:"Kerberos",save:()=>i.handleSubmit(g)()})}),e(y,{variant:"light",children:e(W,{form:i,showSectionHeading:!0})}),s(y,{variant:"light",isFilled:!0,children:[e(M,{form:i,showSectionHeading:!0}),e(Y,{onSubmit:i.handleSubmit(g),children:s(_,{children:[e(T,{isDisabled:!i.formState.isDirty,variant:"primary",type:"submit","data-testid":"kerberos-save",children:a("common:save")}),e(T,{variant:"link",onClick:()=>m(C({realm:f})),"data-testid":"kerberos-cancel",children:a("common:cancel")})]})})]})]})}export{fe as default};