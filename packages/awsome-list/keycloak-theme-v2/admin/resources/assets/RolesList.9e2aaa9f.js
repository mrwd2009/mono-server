import{u as T,aw as w,ay as B,az as E,bM as D,l as b,r as y,a_ as N,ae as j,aY as h,j as a,K as v,h as d,F as g,s as M,bC as P,bD as C,b4 as K,c7 as V,c8 as H,c9 as $,ca as z}from"./index.0cb2e516.js";import{K as Y,L as _}from"./KeycloakDataTable.4e517788.js";import{u as q}from"./ConfirmDialog.f8013bbb.js";import{H as G}from"./HelpItem.e440d5db.js";const J=({children:i,role:r})=>{const{realm:n}=b(),l=D(H.path),o=l?$({...l.params,id:r.id,tab:"details"}):z({realm:n,id:r.id,tab:"details"});return a(K,{to:o,children:i})},Z=({loader:i,paginated:r=!0,parentRoleId:n,messageBundle:l="roles",isReadOnly:o})=>{const{t}=T(l),L=w(),{adminClient:c}=B(),{addAlert:u,addError:S}=E(),{url:F}=D(),{realm:R}=b(),[m,k]=y.exports.useState(),[s,p]=y.exports.useState();N(()=>c.realms.findOne({realm:R}),e=>{k(e)},[]);const x=e=>e.name!==m?.defaultRole?.name?a(J,{role:e,children:e.name}):d(g,{children:[d(K,{to:V({realm:R,tab:"user-registration"}),children:[e.name," "]}),a(G,{helpText:`${l}:defaultRole`,fieldLabelId:"defaultRole"})]}),[A,I]=q({titleKey:"roles:roleDeleteConfirm",messageKey:t("roles:roleDeleteConfirmDialog",{selectedRoleName:s?s.name:""}),continueButtonLabel:"common:delete",continueButtonVariant:j.danger,onConfirm:async()=>{try{n?await c.roles.delCompositeRoles({id:n},[s]):await c.roles.delById({id:s.id}),p(void 0),u(t("roleDeletedSuccess"),h.success)}catch(e){S("roles:roleDeleteError",e)}}}),f=()=>L(`${F}/add-role`);return m?d(g,{children:[a(I,{}),a(Y,{loader:i,ariaLabelKey:"roles:roleList",searchPlaceholderKey:"roles:searchFor",isPaginated:r,toolbarItem:!o&&a(M,{"data-testid":"create-role",onClick:f,children:t("createRole")}),actions:o?[]:[{title:t("common:delete"),onRowClick:e=>{p(e),e.name===m.defaultRole.name?u(t("defaultRoleDeleteError"),h.danger):A()}}],columns:[{name:"name",displayKey:"roles:roleName",cellRenderer:x},{name:"composite",displayKey:"roles:composite",cellFormatters:[P(),C()]},{name:"description",displayKey:"common:description",cellFormatters:[C()]}],emptyState:a(_,{hasIcon:!0,message:t("noRoles"),instructions:o?"":t("noRolesInstructions"),primaryActionText:o?"":t("createRole"),onPrimaryAction:f})},s?s.id:"roleList")]}):a(v,{})};export{Z as R};
