import{u as V,ay as N,az as H,r as u,ae as Q,aY as W,h as T,F as K,j as n,bC as Y,bD as q,ai as G,s as B,an as J,aF as X,ap as Z}from"./index.0cb2e516.js";import{K as U,L as _}from"./KeycloakDataTable.4e517788.js";import{u as ee}from"./useLocaleSort.84ea7ec0.js";import{g as te,a as se}from"./resource.df4d2bbd.js";import{F as oe}from"./filter-icon.fec9f70e.js";import{M as ne,a as le}from"./Modal.6593dfcc.js";import{c as F}from"./HelpItem.e440d5db.js";import{u as ie}from"./ConfirmDialog.f8013bbb.js";import{ah as ae}from"./TableToolbar.c27bcd3c.js";import{C as re}from"./Checkbox.2dc73ed3.js";const j={delete:["delClientRoleMappings","delRealmRoleMappings"],listEffective:["listRoleMappings","listCompositeRealmRoleMappings","listCompositeClientRoleMappings"],listAvailable:["listAvailableClientRoleMappings","listAvailableRealmRoleMappings"]},O={delete:["delClientScopeMappings","delRealmScopeMappings"],listEffective:["listScopeMappings","listAvailableRealmScopeMappings","listCompositeClientScopeMappings"],listAvailable:["listAvailableClientScopeMappings","listAvailableRealmScopeMappings"]},D={groups:j,users:j,clientScopes:O,clients:O,roles:{delete:["delCompositeRoles","delCompositeRoles"],listEffective:["getCompositeRoles","getCompositeRoles","getCompositeRolesForClient"],listAvailable:["listRoles","find"]}},ce=(t,e)=>t[e],S=(t,e,s,...o)=>ce(t,e)[s](...o),me=(t,e,s,o)=>o.map(a=>{const l={id:a.role.id,name:a.role.name},r=D[e]?.delete[a.client?0:1];return S(t,e,r,{id:s,clientUniqueId:a.client?.id,client:a.client?.id,roles:[l]},[l])}),pe=async(t,e,s)=>{const o=D[e].listEffective[0],a=S(t,e,o,{id:s});if(e!=="roles")return a;const l=await a;return{clientMappings:await Promise.all(l.filter(i=>i.clientRole).map(async i=>{const f=await t.clients.findOne({id:i.containerId});return i.containerId=f?.clientId,{...f,mappings:[i]}})),realmMappings:l.filter(i=>!i.clientRole)}},de=async(t,e,s)=>{const o=D[e].listEffective[1];if(e!=="roles")return(await S(t,e,o,{id:s})).map(r=>({role:r}));const a=await S(t,e,o,{id:s}),l=await Promise.all(a.filter(r=>r.composite).map(r=>S(t,e,o,{id:r.id})));return[...a,...l.flat()].map(r=>({role:r}))},ge=async(t,e,s)=>{const o=D[e].listAvailable[1];return(await S(t,e,o,s)).map(a=>({role:a}))};const ue=(t,e,s)=>[...s?t.map(o=>({...o,role:{...o.role,isInherited:!1}})):e.map(o=>({...o,role:{...o.role,isInherited:t.find(a=>a.role.id===o.role.id)===void 0}}))],$=({role:t,client:e})=>T(K,{children:[e?.clientId&&n(G,{isRead:!0,className:"keycloak-admin--role-mapping__client-name",children:e.clientId}),t.name]}),we=({name:t,id:e,type:s,isManager:o=!0,save:a})=>{const{t:l}=V(s),{adminClient:r}=N(),{addAlert:i,addError:f}=H(),[A,b]=u.exports.useState(0),d=()=>b(A+1),[y,I]=u.exports.useState(!0),[E,C]=u.exports.useState(!1),[v,M]=u.exports.useState([]),w=async c=>{await a(c),d()},k=async()=>{let c=[],R=[];y||(c=await de(r,s,e),R=(await te({adminClient:r,type:s,id:e})).map(m=>({client:{clientId:m.client,id:m.clientId},role:{id:m.id,name:m.role,description:m.description}})));const h=await pe(r,s,e),p=h.realmMappings?.map(m=>({role:m}))||[],P=Object.values(h.clientMappings||{}).map(m=>m.mappings.map(z=>({client:{clientId:m.client,...m},role:z}))).flat();return[...ue([...p,...P],[...R,...c],y)]},[x,L]=ie({titleKey:"clients:removeMappingTitle",messageKey:l("clients:removeMappingConfirm",{count:v.length}),continueButtonLabel:"common:remove",continueButtonVariant:Q.danger,onConfirm:async()=>{try{await Promise.all(me(r,s,e,v)),i(l("clients:clientScopeRemoveSuccess"),W.success),d()}catch(c){f("clients:clientScopeRemoveError",c)}}}),g=()=>o?T(K,{children:[n(F,{children:n(B,{"data-testid":"assignRole",onClick:()=>C(!0),children:l("common:assignRole")})}),n(F,{children:n(B,{variant:"link","data-testid":"unAssignRole",onClick:x,isDisabled:v.length===0,children:l("common:unAssignRole")})})]}):n("span",{});return T(K,{children:[E&&n(fe,{id:e,type:s,name:t,onAssign:w,onClose:()=>C(!1)}),n(L,{}),n(U,{"data-testid":"assigned-roles",loader:k,canSelectAll:!0,onSelect:c=>M(c),searchPlaceholderKey:"clients:searchByName",ariaLabelKey:"clients:clientScopeList",isRowDisabled:c=>c.role.isInherited||!1,toolbarItem:T(K,{children:[n(F,{children:n(re,{label:l("common:hideInheritedRoles"),id:"hideInheritedRoles","data-testid":"hideInheritedRoles",isChecked:y,onChange:c=>{I(c),d()}})}),n(g,{})]}),actions:o?[{title:l("common:unAssignRole"),onRowClick:async c=>(M([c]),x(),!1)}]:[],columns:[{name:"role.name",displayKey:l("common:name"),transforms:[ae(30)],cellRenderer:$},{name:"role.isInherited",displayKey:l("common:inherent"),cellFormatters:[Y(),q()]},{name:"role.description",displayKey:l("common:description"),cellFormatters:[q()]}],emptyState:n(_,{message:l("noRoles"),instructions:l("noRolesInstructions"),primaryActionText:l("common:assignRole"),onPrimaryAction:()=>C(!0)})},`${e}${A}`)]})},fe=({id:t,name:e,type:s,isRadio:o=!1,isLDAPmapper:a,onAssign:l,onClose:r})=>{const{t:i}=V(s),{adminClient:f}=N(),[A,b]=u.exports.useState(!1),[d,y]=u.exports.useState("roles"),[I,E]=u.exports.useState([]),[C,v]=u.exports.useState(0),M=()=>v(C+1),w=ee(),k=({role:{name:g}})=>g?.toUpperCase(),x=async(g,c,R)=>{const h={first:g,max:c};R&&(h.search=R);const p=await ge(f,s,{...h,id:t});return w(p,k).map(m=>({role:m.role,id:m.role.id}))},L=async(g,c,R)=>{const h=await se({adminClient:f,id:t,type:s,first:g||0,max:c||10,search:R});return w(h.map(p=>({client:{clientId:p.client,id:p.clientId},role:{id:p.id,name:p.role,description:p.description},id:p.id})),k)};return n(ne,{variant:le.large,title:a?i("common:assignRole"):i("common:assignRolesTo",{client:e}),isOpen:!0,onClose:r,actions:[n(B,{"data-testid":"assign",isDisabled:I.length===0,variant:"primary",onClick:()=>{l(I),r()},children:i("common:assign")},"confirm"),n(B,{"data-testid":"cancel",variant:"link",onClick:r,children:i("common:cancel")},"cancel")],children:n(U,{onSelect:g=>E([...g]),searchPlaceholderKey:"clients:searchByRoleName",isPaginated:!0,searchTypeComponent:n(F,{children:n(J,{onSelect:()=>{y(d==="roles"?"clients":"roles"),b(!1),M()},"data-testid":"filter-type-dropdown",toggle:n(X,{onToggle:b,icon:n(oe,{}),children:i(d==="roles"?"common:filterByRoles":"common:filterByClients")}),isOpen:A,dropdownItems:[n(Z,{"data-testid":d,children:i(d==="roles"?"common:filterByClients":"common:filterByRoles")},"filter-type")]})}),canSelectAll:!0,isRadio:o,loader:d==="roles"?x:L,ariaLabelKey:"clients:roles",columns:[{name:"name",cellRenderer:$},{name:"role.description",displayKey:"common:description"}],emptyState:n(_,{message:i("noRoles"),instructions:i("common:noRealmRolesToAssign"),secondaryActions:[{text:i("common:filterByClients"),onClick:()=>{y("clients"),M()}}]})},C)})};export{fe as A,we as R,$ as S};
