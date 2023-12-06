import{u as $,ay as j,az as H,bA as N,r as b,aw as q,l as G,g as L,bM as z,a_ as U,ae as Y,aY as S,h as u,F as J,j as o,ap as Q,P as W,av as l,s as T,b4 as X,bN as Z,bK as ee,aC as oe,aB as te}from"./index.0cb2e516.js";import{u as re,F as ae}from"./index.esm.6af887f8.js";import{V as pe}from"./ViewHeader.2586557f.js";import{u as ie}from"./ConfirmDialog.f8013bbb.js";import{H as ne}from"./HelpItem.e440d5db.js";import{F as se}from"./FormAccess.bee4f1e0.js";import{D as me}from"./DynamicComponents.3dd18b3b.js";import{K as C}from"./KeycloakTextInput.b4d5b2db.js";import{a as I,A as ce}from"./FormGroup.3d5f3f16.js";import"./Text.c38ffb52.js";import"./Modal.6593dfcc.js";import"./copy-icon.cf10e1f5.js";import"./GridItem.0db472b0.js";import"./KeycloakTextArea.f5e2440a.js";import"./Select.5a6b39aa.js";import"./check.51c67984.js";import"./star-icon.97692015.js";import"./useToggle.8c992bea.js";import"./AddRoleMappingModal.4adc845a.js";import"./KeycloakDataTable.4e517788.js";import"./TableToolbar.c27bcd3c.js";import"./grip-vertical-icon.1b75ab8f.js";import"./Checkbox.2dc73ed3.js";import"./plus-circle-icon.32cdf4dc.js";import"./EmptyStateBody.a0363fe4.js";import"./EmptyStateSecondaryActions.1a804d56.js";import"./useLocaleSort.84ea7ec0.js";import"./resource.df4d2bbd.js";import"./joinPath.69b856b1.js";import"./filter-icon.fec9f70e.js";import"./KeyValueInput.cb1ae3e8.js";import"./FlexItem.308d9f82.js";import"./minus-circle-icon.de526f05.js";import"./CodeEditor.16ebafa0.js";import"./ClientSelect.a855e118.js";import"./MultiLineInput.e27bc560.js";import"./GroupPickerDialog.f5430678.js";import"./DataListItemRow.8f458244.js";import"./data-list.f7ff2ea7.js";import"./FileUpload.18e1e495.js";import"./PasswordInput.34ff6dd3.js";function Xe(){const{t}=$("client-scopes"),{adminClient:i}=j(),{addAlert:f,addError:g}=H(),{id:r,mapperId:a,type:y}=N(),h=re(),{register:D,setValue:P,errors:M,handleSubmit:x}=h,[d,A]=b.exports.useState(),[V,k]=b.exports.useState(),E=q(),{realm:w}=G(),v=L(),K=/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/,s=!!a.match(K),m=!!z(Z.path),F=()=>m?ee({realm:w,id:r,type:y,tab:"mappers"}):`/${w}/clients/${r}/mappers`;U(async()=>{let e;if(s){if(m?e=await i.clientScopes.findProtocolMapper({id:r,mapperId:a}):e=await i.clients.findProtocolMapperById({id:r,mapperId:a}),!e)throw new Error(t("common:notFound"));const p=v.protocolMapperTypes[e.protocol].find(c=>c.id===e.protocolMapper);return{config:{protocol:e.protocol,protocolMapper:e.protocolMapper},mapping:p,data:e}}else{const n=y?await i.clientScopes.findOne({id:r}):await i.clients.findOne({id:r});if(!n)throw new Error(t("common:notFound"));const c=v.protocolMapperTypes[n.protocol].find(_=>_.id===a);if(!c)throw new Error(t("common:notFound"));return{mapping:c,config:{protocol:n.protocol,protocolMapper:a}}}},({config:e,mapping:n,data:p})=>{k(e),A(n),p&&te(p,P)},[]);const[O,B]=ie({titleKey:"common:deleteMappingTitle",messageKey:"common:deleteMappingConfirm",continueButtonLabel:"common:delete",continueButtonVariant:Y.danger,onConfirm:async()=>{try{m?await i.clientScopes.delProtocolMapper({id:r,mapperId:a}):await i.clients.delProtocolMapper({id:r,mapperId:a}),f(t("common:mappingDeletedSuccess"),S.success),E(F())}catch(e){g("common:mappingDeletedError",e)}}}),R=async e=>{const n=s?"Updated":"Created";try{const p={...V,...oe(e)};s?m?await i.clientScopes.updateProtocolMapper({id:r,mapperId:a},{id:a,...p}):await i.clients.updateProtocolMapper({id:r,mapperId:a},{id:a,...p}):m?await i.clientScopes.addProtocolMapper({id:r},p):await i.clients.addProtocolMapper({id:r},p),f(t(`common:mapping${n}Success`),S.success)}catch(p){g(`common:mapping${n}Error`,p)}};return u(J,{children:[o(B,{}),o(pe,{titleKey:s?d?.name:t("common:addMapper"),subKey:s?a:"client-scopes:addMapperExplain",dropdownItems:s?[o(Q,{value:"delete",onClick:O,children:t("common:delete")},"delete")]:void 0}),o(W,{variant:"light",children:u(se,{isHorizontal:!0,onSubmit:x(R),role:"manage-clients",className:"keycloak__client-scope-mapping-details__form",children:[o(I,{label:t("common:mapperType"),fieldId:"mapperType",children:o(C,{type:"text",id:"mapperType",name:"mapperType",isReadOnly:!0,value:d?.name})}),o(I,{label:t("common:name"),labelIcon:o(ne,{helpText:"client-scopes-help:mapperName",fieldLabelId:"name"}),fieldId:"name",isRequired:!0,validated:M.name?l.error:l.default,helperTextInvalid:t("common:required"),children:o(C,{ref:D({required:!0}),type:"text",id:"name",name:"name",isReadOnly:s,validated:M.name?l.error:l.default})}),o(ae,{...h,children:o(me,{properties:d?.properties||[]})}),u(ce,{children:[o(T,{variant:"primary",type:"submit",children:t("common:save")}),o(T,{variant:"link",component:e=>o(X,{...e,to:F()}),children:t("common:cancel")})]})]})})]})}export{Xe as default};