import{u as E,r as O,h as M,F as U,j as e,av as l,az as _,aw as z,l as G,ay as $,bA as w,ae as Y,aY as F,cs as D,a_ as Q,K as W,P as X,ap as Z,s as K,b4 as ee,aC as re,cu as te,aB as ae}from"./index.0cb2e516.js";import{C as N,u as ie,F as oe}from"./index.esm.6af887f8.js";import{V as se}from"./ViewHeader.2586557f.js";import{F as ne}from"./FormAccess.bee4f1e0.js";import{H as A}from"./HelpItem.e440d5db.js";import{K as j}from"./KeycloakTextInput.b4d5b2db.js";import{a as C,A as de}from"./FormGroup.3d5f3f16.js";import{S as q,b as L,a as B}from"./Select.5a6b39aa.js";import{D as pe}from"./DynamicComponents.3dd18b3b.js";import{u as le}from"./ConfirmDialog.f8013bbb.js";import{u as ce,m as me}from"./useLocaleSort.84ea7ec0.js";import"./Text.c38ffb52.js";import"./copy-icon.cf10e1f5.js";import"./GridItem.0db472b0.js";import"./check.51c67984.js";import"./star-icon.97692015.js";import"./KeycloakTextArea.f5e2440a.js";import"./useToggle.8c992bea.js";import"./AddRoleMappingModal.4adc845a.js";import"./KeycloakDataTable.4e517788.js";import"./TableToolbar.c27bcd3c.js";import"./grip-vertical-icon.1b75ab8f.js";import"./Checkbox.2dc73ed3.js";import"./plus-circle-icon.32cdf4dc.js";import"./EmptyStateBody.a0363fe4.js";import"./EmptyStateSecondaryActions.1a804d56.js";import"./Modal.6593dfcc.js";import"./resource.df4d2bbd.js";import"./joinPath.69b856b1.js";import"./filter-icon.fec9f70e.js";import"./KeyValueInput.cb1ae3e8.js";import"./FlexItem.308d9f82.js";import"./minus-circle-icon.de526f05.js";import"./CodeEditor.16ebafa0.js";import"./ClientSelect.a855e118.js";import"./MultiLineInput.e27bc560.js";import"./GroupPickerDialog.f5430678.js";import"./DataListItemRow.8f458244.js";import"./data-list.f7ff2ea7.js";import"./FileUpload.18e1e495.js";import"./PasswordInput.34ff6dd3.js";const ue=({mapperTypes:t,mapperType:d,form:x,id:h,updateMapperType:b})=>{const{t:o}=E("identity-providers"),{control:m,register:S,errors:I}=x,[u,p]=O.exports.useState(!1),n=["inherit","import","legacy","force"],[s,i]=O.exports.useState(!1);return M(U,{children:[e(C,{label:o("common:name"),labelIcon:e(A,{helpText:"identity-providers-help:addIdpMapperName",fieldLabelId:"name"}),fieldId:"kc-name",isRequired:!0,validated:I.name?l.error:l.default,helperTextInvalid:o("common:required"),children:e(j,{ref:S({required:!0}),type:"text","datatest-id":"name-input",id:"kc-name",name:"name",isDisabled:!!h,validated:I.name?l.error:l.default})}),e(C,{label:o("syncModeOverride"),isRequired:!0,labelIcon:e(A,{helpText:"identity-providers-help:syncModeOverride",fieldLabelId:"identity-providers:syncModeOverride"}),fieldId:"syncMode",children:e(N,{name:"config.syncMode",defaultValue:n[0].toUpperCase(),control:m,render:({onChange:y,value:f})=>e(q,{toggleId:"syncMode","datatest-id":"syncmode-select",required:!0,direction:"down",onToggle:()=>i(!s),onSelect:(r,c)=>{y(c.toString().toUpperCase()),i(!1)},selections:o(`syncModes.${f.toLowerCase()}`),variant:L.single,"aria-label":o("syncMode"),isOpen:s,children:n.map(r=>e(B,{selected:r===f,"data-testid":r,value:r.toUpperCase(),children:o(`syncModes.${r}`)},r))})})}),e(C,{label:o("mapperType"),labelIcon:e(A,{helpText:d.helpText,fieldLabelId:"identity-providers:mapperType"}),fieldId:"identityProviderMapper",children:e(N,{name:"identityProviderMapper",defaultValue:t[0].id,control:m,render:({onChange:y,value:f})=>e(q,{toggleId:"identityProviderMapper","data-testid":"idp-mapper-select",isDisabled:!!h,required:!0,onToggle:()=>p(!u),onSelect:(r,c)=>{const P=c;b(P),y(P.id),p(!1)},selections:d.name,variant:L.single,"aria-label":o("mapperType"),isOpen:u,children:t.map(r=>e(B,{selected:r===f,"datatest-id":r.id,value:r,children:r.name},r.name))})})})]})};function rr(){const{t}=E("identity-providers"),d=ie({shouldUnregister:!1}),{handleSubmit:x,register:h,errors:b}=d,{addAlert:o,addError:m}=_(),S=z(),I=ce(),{realm:u}=G(),{adminClient:p}=$(),{providerId:n,alias:s}=w(),{id:i}=w(),[y,f]=O.exports.useState(),[r,c]=O.exports.useState(),P=async a=>{const T=re(a),v=JSON.stringify(a.config.attributes??[]),V=JSON.stringify(a.config.claims??[]),k={...T,config:{...T.config,attributes:v,claims:V},identityProviderAlias:s};if(i)try{await p.identityProviders.updateMapper({id:i,alias:s},{...k,name:r?.name}),o(t("mapperSaveSuccess"),F.success)}catch(g){m(t("mapperSaveError"),g)}else try{const g=await p.identityProviders.createMapper({identityProviderMapper:k,alias:s});o(t("mapperCreateSuccess"),F.success),S(te({realm:u,alias:s,providerId:n,id:g.id}))}catch(g){m(t("mapperCreateError"),g)}},[H,J]=le({titleKey:"identity-providers:deleteProviderMapper",messageKey:t("identity-providers:deleteMapperConfirm",{mapper:r?.name}),continueButtonLabel:"common:delete",continueButtonVariant:Y.danger,onConfirm:async()=>{try{await p.identityProviders.delMapper({alias:s,id:i}),o(t("deleteMapperSuccess"),F.success),S(D({providerId:n,alias:s,tab:"mappers",realm:u}))}catch(a){m("identity-providers:deleteErrorError",a)}}});Q(()=>Promise.all([i?p.identityProviders.findOneMapper({alias:s,id:i}):null,p.identityProviders.findMapperTypes({alias:s})]),([a,T])=>{const v=I(Object.values(T),me("name"));a?(c(v.find(({id:V})=>V===a.identityProviderMapper)),R(a)):c(v[0]),f(v)},[]);const R=a=>{ae(a,d.setValue),d.setValue("config.attributes",JSON.parse(a.config.attributes||"{}")),d.setValue("config.claims",JSON.parse(a.config.claims||"{}"))};return!y||!r?e(W,{}):M(X,{variant:"light",children:[e(J,{}),e(se,{className:"kc-add-mapper-title",titleKey:i?t("editIdPMapper",{providerId:n[0].toUpperCase()+n.substring(1)}):t("addIdPMapper",{providerId:n[0].toUpperCase()+n.substring(1)}),dropdownItems:i?[e(Z,{onClick:H,children:t("common:delete")},"delete")]:void 0,divider:!0}),M(ne,{role:"manage-identity-providers",isHorizontal:!0,onSubmit:x(P),className:"pf-u-mt-lg",children:[i&&e(C,{label:t("common:id"),fieldId:"kc-mapper-id",validated:b.name?l.error:l.default,helperTextInvalid:t("common:required"),children:e(j,{ref:h(),type:"text",value:r.id,"datatest-id":"name-input",id:"kc-name",name:"name",isDisabled:!!i,validated:b.name?l.error:l.default})}),r.properties&&M(U,{children:[e(ue,{form:d,id:i,mapperTypes:y,updateMapperType:c,mapperType:r}),e(oe,{...d,children:e(pe,{properties:r.properties})})]}),M(de,{children:[e(K,{"data-testid":"new-mapper-save-button",variant:"primary",type:"submit",children:t("common:save")}),e(K,{variant:"link",component:a=>e(ee,{...a,to:D({realm:u,providerId:n,alias:s,tab:"settings"})}),children:t("common:cancel")})]})]})]})}export{rr as default};