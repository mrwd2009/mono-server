"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3863],{3863:(e,t,a)=>{a.r(t),a.d(t,{default:()=>de});var r=a(5863),n=a(710),s=a(3802),l=a(1576),i=a(1677),d=(a(5623),a(2954)),o=a(4839),c=a(386),m=a(764),u=a(8798),p=a(4326),P=a(1786),E=a(8336),f=a(2655),g=a(8326);const Z=({user:e,bruteForce:{isBruteForceProtected:t,isLocked:a}={isBruteForceProtected:!1,isLocked:!1},save:i,onGroupsUpdate:Z})=>{const{t:y}=(0,s.$G)("users"),{realm:b}=(0,m.PL)(),h=(0,f.Z)(),[v,w]=(0,r.eJ)(!1),k=(0,d.k6)(),{adminClient:C}=(0,u.K3)(),{addAlert:I,addError:x}=(0,p.Z7)(),{handleSubmit:T,register:L,watch:D,control:U,reset:A,formState:{errors:K}}=(0,l.Gc)(),N=D("username"),[R,F]=(0,r.eJ)([]),[G,B]=(0,r.eJ)(!1),[S,O]=(0,r.eJ)(a),[M,q]=(0,r.eJ)(),[J,V]=(0,r.eJ)([]);(0,u.ib)((()=>Promise.all([C.realms.findOne({realm:b}),C.authenticationManagement.getRequiredActions()])),(([e,t])=>{if(!e)throw new Error(y("common:notFound"));q(e),V(t)}),[]);const $=()=>{w(!1)},z=()=>{B(!G)};return r.ZP.createElement(o.N,{isHorizontal:!0,onSubmit:T(i),role:"manage-users",fineGrainedAccess:e?.access?.manage,className:"pf-u-mt-lg"},G&&r.ZP.createElement(g.p,{type:"selectMany",text:{title:"users:selectGroups",ok:"users:join"},onConfirm:t=>{e?.id?(async t=>{t.forEach((async t=>{try{await C.users.addToGroup({id:e.id,groupId:t.id}),I(y("users:addedGroupMembership"),n.Ux.success)}catch(e){x("users:addedGroupMembershipError",e)}}))})(t||[]):(async e=>{F([...R,...e]),Z([...R,...e])})(t||[]),B(!1)},onClose:()=>B(!1),filterGroups:R.map((e=>e.name))}),e?.id&&r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(n.cw,{label:y("common:id"),fieldId:"kc-id",isRequired:!0},r.ZP.createElement(P.F,{id:e.id,"aria-label":y("userID"),value:e.id,type:"text",isReadOnly:!0})),r.ZP.createElement(n.cw,{label:y("createdAt"),fieldId:"kc-created-at",isRequired:!0},r.ZP.createElement(P.F,{value:h(new Date(e.createdTimestamp)),type:"text",id:"kc-created-at","aria-label":y("createdAt"),name:"createdTimestamp",isReadOnly:!0}))),!M?.registrationEmailAsUsername&&r.ZP.createElement(n.cw,{label:y("username"),fieldId:"kc-username",isRequired:!0,validated:K.username?"error":"default",helperTextInvalid:y("common:required")},r.ZP.createElement(P.F,{ref:L(),type:"text",id:"kc-username","aria-label":y("username"),name:"username",isReadOnly:!!e?.id&&!M?.editUsernameAllowed})),r.ZP.createElement(n.cw,{label:y("email"),fieldId:"kc-description",validated:K.email?"error":"default",helperTextInvalid:y("users:emailInvalid")},r.ZP.createElement(P.F,{ref:L({pattern:E.E9}),type:"email",id:"kc-email",name:"email","data-testid":"email-input","aria-label":y("emailInput")})),r.ZP.createElement(n.cw,{label:y("emailVerified"),fieldId:"kc-email-verified",helperTextInvalid:y("common:required"),labelIcon:r.ZP.createElement(c.B,{helpText:"users-help:emailVerified",fieldLabelId:"users:emailVerified"})},r.ZP.createElement(l.Qr,{name:"emailVerified",defaultValue:!1,control:U,render:({onChange:e,value:t})=>r.ZP.createElement(n.rs,{"data-testid":"email-verified-switch",id:"kc-user-email-verified",isDisabled:!1,onChange:t=>e(t),isChecked:t,label:y("common:on"),labelOff:y("common:off")})})),r.ZP.createElement(n.cw,{label:y("firstName"),fieldId:"kc-firstname",validated:K.firstName?"error":"default",helperTextInvalid:y("common:required")},r.ZP.createElement(P.F,{ref:L(),"data-testid":"firstName-input",type:"text",id:"kc-firstname","aria-label":y("firstName"),name:"firstName"})),r.ZP.createElement(n.cw,{label:y("lastName"),fieldId:"kc-name",validated:K.lastName?"error":"default"},r.ZP.createElement(P.F,{ref:L(),"data-testid":"lastName-input",type:"text",id:"kc-lastname",name:"lastName","aria-label":y("lastName")})),t&&r.ZP.createElement(n.cw,{label:y("temporaryLocked"),fieldId:"temporaryLocked",labelIcon:r.ZP.createElement(c.B,{helpText:"users-help:temporaryLocked",fieldLabelId:"users:temporaryLocked"})},r.ZP.createElement(n.rs,{"data-testid":"user-locked-switch",id:"temporaryLocked",onChange:t=>{(async()=>{try{await C.attackDetection.del({id:e.id}),I(y("unlockSuccess"),n.Ux.success)}catch(e){x("users:unlockError",e)}})(),O(t)},isChecked:S,isDisabled:!S,label:y("common:on"),labelOff:y("common:off")})),r.ZP.createElement(n.cw,{label:y("common:enabled"),fieldId:"kc-enabled",labelIcon:r.ZP.createElement(c.B,{helpText:"users-help:disabled",fieldLabelId:"enabled"})},r.ZP.createElement(l.Qr,{name:"enabled",defaultValue:!0,control:U,render:({onChange:e,value:t})=>r.ZP.createElement(n.rs,{"data-testid":"user-enabled-switch",id:"kc-user-enabled",onChange:t=>e(t),isChecked:t,label:y("common:on"),labelOff:y("common:off")})})),r.ZP.createElement(n.cw,{label:y("requiredUserActions"),fieldId:"kc-required-user-actions",validated:K.requiredActions?"error":"default",helperTextInvalid:y("common:required"),labelIcon:r.ZP.createElement(c.B,{helpText:"users-help:requiredUserActions",fieldLabelId:"users:requiredUserActions"})},r.ZP.createElement(l.Qr,{name:"requiredActions",defaultValue:[],typeAheadAriaLabel:"Select an action",control:U,render:({onChange:e,value:t})=>r.ZP.createElement(n.Ph,{"data-testid":"required-actions-select",placeholderText:"Select action",toggleId:"kc-required-user-actions",onToggle:()=>w(!v),isOpen:v,selections:t,onSelect:(a,r)=>{const n=r;t.includes(n)?e(t.filter((e=>e!==n))):e([...t,n])},onClear:$,variant:"typeaheadmulti"},J.map((({alias:e,name:t})=>r.ZP.createElement(n.$m,{key:e,value:e},t))))})),!e?.id&&r.ZP.createElement(n.cw,{label:y("common:groups"),fieldId:"kc-groups",validated:K.requiredActions?"error":"default",helperTextInvalid:y("common:required"),labelIcon:r.ZP.createElement(c.B,{helpText:"users-help:groups",fieldLabelId:"groups"})},r.ZP.createElement(l.Qr,{name:"groups",defaultValue:[],typeAheadAriaLabel:"Select an action",control:U,render:()=>r.ZP.createElement(n.BZ,null,r.ZP.createElement(n.Zn,{categoryName:" "},R.map((e=>r.ZP.createElement(n.Af,{key:e.id,onClick:()=>{return t=e.name,F(R.filter((e=>e.name!==t))),void Z(R);var t}},e.path)))),r.ZP.createElement(n.zx,{id:"kc-join-groups-button",onClick:z,variant:"secondary","data-testid":"join-groups-button"},y("users:joinGroups")))})),r.ZP.createElement(n.WK,null,r.ZP.createElement(n.zx,{"data-testid":e?.id?"save-user":"create-user",isDisabled:!e?.id&&!N&&!M?.registrationEmailAsUsername,variant:"primary",type:"submit"},y(e?.id?"common:save":"common:create")),r.ZP.createElement(n.zx,{"data-testid":"cancel-create-user",onClick:()=>e?.id?A(e):k.push(`/${b}/users`),variant:"link"},y(e?.id?"common:revert":"common:cancel"))))};var y=a(2265),b=a(7973),h=a(2688),v=a(390),w=a(9766),k=a(2432),C=a(904),I=a(1586),x=a(192);const T=({user:e})=>{const{t}=(0,s.$G)("users"),{addAlert:a,addError:l}=(0,p.Z7)(),[i,d]=(0,r.eJ)(0),o=()=>d((new Date).getTime()),[c,m]=(0,r.eJ)([]),[P,f]=(0,r.eJ)(""),[Z,y]=(0,r.eJ)(!0),[T,L]=(0,r.eJ)([]),[D,U]=(0,r.eJ)(!1),{enabled:A}=(0,C.yD)(),{adminClient:K}=(0,u.K3)();(0,r.d4)((()=>{o()}),[Z]);const N=()=>{U(!D)},[R,F]=(0,w.W)({titleKey:t("leaveGroup",{count:c.length,name:c[0]?.name}),messageKey:t("leaveGroupConfirmDialog",{count:c.length,groupname:c[0]?.name,username:e.username}),continueButtonLabel:"leave",continueButtonVariant:n.Wu.danger,onConfirm:async()=>{try{await Promise.all(c.map((t=>K.users.delFromGroup({id:e.id,groupId:t.id})))),o(),a(t("removedGroupMembership"),n.Ux.success)}catch(e){l("users:removedGroupMembershipError",e)}}}),G=e=>{m(e),R()};return r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(F,null),D&&r.ZP.createElement(g.p,{id:e.id,type:"selectMany",text:{title:t("joinGroupsFor",{username:e.username}),ok:"users:join"},onClose:()=>U(!1),onConfirm:r=>{(async r=>{r.forEach((async r=>{try{await K.users.addToGroup({id:e.id,groupId:r.id}),o(),a(t("addedGroupMembership"),n.Ux.success)}catch(e){l("users:addedGroupMembershipError",e)}}))})(r||[]),U(!1),o()}}),r.ZP.createElement(x.B,{key:i,loader:async(t,a,r)=>{const n={first:t,max:a},s=r||"";s&&(n.search=s,f(s));const l=await K.users.listGroups({...n,id:e.id}),i=await K.groups.find(),d=l.reduce(((e,t)=>(t.path&&e.push(t.path),e)),[]),o=[],c=[],m=[],u=[...i];let p=[];const P=(e,t,a)=>{if(t(e,a),"object"!=typeof e)return a;if(Array.isArray(e))return e.forEach((e=>P(e,t,a))),a;for(const r in e)P(e[r],t,a);return a},E=P(u,((e,t)=>{e?.subGroups&&t.push(e.subGroups)}),[]),g=[].concat(...E);p=[...u,...g],d.forEach((e=>{const t=e.split("/"),a=[];t.reduce(((e,t)=>{const r=e+"/"+t;return a.push(r),r}),"");for(let e=1;e<a.length;e++)m.push(a[e].substring(1))})),c.push(...m),p.forEach((e=>{0!==e.subGroups.length&&p.push(...e.subGroups)})),p=p.filter((e=>c.includes(e.path)));const y=i.filter((e=>o.includes(e.name))),b=[];y.forEach((e=>b.push(e.subGroups)));const h=l.filter((e=>!y.includes(e)));L(h);const w=p.filter(((e,t,a)=>t===a.findIndex((t=>t.name===e.name))));return k=Z?h:w,(0,v.MR)(k,(e=>e.path?.toUpperCase()));var k},className:"keycloak_user-section_groups-table",isPaginated:!0,ariaLabelKey:"roles:roleList",searchPlaceholderKey:"groups:searchGroup",canSelectAll:!0,onSelect:e=>m(Z?e:(0,v.et)(e,T,"id")),isRowDisabled:e=>!Z&&T.every((t=>t.id!==e.id)),toolbarItem:r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(n.zx,{className:"kc-join-group-button",onClick:N,"data-testid":"add-group-button",isDisabled:!e.access?.manageGroupMembership},t("joinGroup")),r.ZP.createElement(n.XZ,{label:t("directMembership"),key:"direct-membership-check",id:"kc-direct-membership-checkbox",onChange:()=>y(!Z),isChecked:Z,className:"direct-membership-check"}),r.ZP.createElement(n.zx,{onClick:()=>G(c),"data-testid":"leave-group-button",variant:"link",isDisabled:0===c.length},t("leave")),A&&r.ZP.createElement(n.J2,{"aria-label":"Basic popover",position:"bottom",bodyContent:r.ZP.createElement("div",null,t("whoWillAppearPopoverText"))},r.ZP.createElement(n.zx,{variant:"link",className:"kc-who-will-appear-button",key:"who-will-appear-button",icon:r.ZP.createElement(b.pT,null)},t("whoWillAppearLinkText")))),columns:[{name:"groupMembership",displayKey:"users:groupMembership",cellRenderer:e=>e.name,cellFormatters:[(0,E.CU)()],transforms:[(0,h.dY)(40)]},{name:"path",displayKey:"users:path",cellRenderer:e=>r.ZP.createElement(k.g,{group:e}),transforms:[(0,h.dY)(45)]},{name:"",cellRenderer:a=>(T.some((e=>e.id===a.id))||0===T.length||Z)&&r.ZP.createElement(n.zx,{"data-testid":`leave-${a.name}`,onClick:()=>G([a]),variant:"link",isDisabled:!e.access?.manageGroupMembership},t("leave")),cellFormatters:[(0,E.CU)()],transforms:[(0,h.dY)(20)]}],emptyState:P?"":r.ZP.createElement(I.M,{hasIcon:!0,message:t("noGroups"),instructions:t("noGroupsText"),primaryActionText:t("joinGroup"),onPrimaryAction:N})}))},L=()=>{const[e,t]=(0,r.eJ)(),{t:a}=(0,s.$G)("roles"),{addAlert:l,addError:i}=(0,p.Z7)(),o=(0,f.Z)(),[c,m]=(0,r.eJ)(0),{adminClient:P}=(0,u.K3)(),{id:g}=(0,d.UO)(),[Z,y]=(0,w.W)({titleKey:"users:revokeClientScopesTitle",messageKey:a("users:revokeClientScopes",{clientId:e?.clientId}),continueButtonLabel:"common:revoke",continueButtonVariant:n.Wu.danger,onConfirm:async()=>{try{await P.users.revokeConsent({id:g,clientId:e.clientId}),m((new Date).getTime()),l(a("deleteGrantsSuccess"),n.Ux.success)}catch(e){i("roles:deleteGrantsError",e)}}});return r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(y,null),r.ZP.createElement(x.B,{loader:async()=>{return e=await P.users.listConsents({id:g}),(0,v.MR)(e,(e=>e.clientId?.toUpperCase()));var e},key:c,ariaLabelKey:"roles:roleList",searchPlaceholderKey:" ",columns:[{name:"clientId",displayKey:"clients:Client",cellFormatters:[(0,E.CU)()],transforms:[(0,h.dY)(20)]},{name:"grantedClientScopes",displayKey:"client-scopes:grantedClientScopes",cellFormatters:[(0,E.CU)()],cellRenderer:({grantedClientScopes:e})=>r.ZP.createElement(n.Zn,{className:"kc-consents-chip-group"},e.map((e=>r.ZP.createElement(n.Af,{key:e,isReadOnly:!0,className:"kc-consents-chip",id:"consents-chip-text"},e)))),transforms:[(0,h.dY)(30)]},{name:"createDate",displayKey:"clients:created",transforms:[(0,h.dY)(20)],cellRenderer:({createDate:e})=>e?o(new Date(e)):"—"},{name:"lastUpdatedDate",displayKey:"clients:lastUpdated",transforms:[(0,h.dY)(10)],cellRenderer:({lastUpdatedDate:e})=>e?o(new Date(e)):"—"}],actions:[{title:a("users:revoke"),onRowClick:e=>{t(e),Z()}}],emptyState:r.ZP.createElement(I.M,{hasIcon:!0,icon:b.TF,message:a("users:noConsents"),instructions:a("users:noConsentsText")})}))};var D=a(5669),U=a(9280);const A=({federatedId:e,handleModalToggle:t,refresh:a})=>{const{t:i}=(0,s.$G)("users"),{adminClient:o}=(0,u.K3)(),{addAlert:c,addError:m}=(0,p.Z7)(),{register:E,handleSubmit:f,formState:{isValid:g,errors:Z}}=(0,l.cI)({mode:"onChange"}),{id:y}=(0,d.UO)();return r.ZP.createElement(n.u_,{variant:n.vE.small,title:i("users:linkAccountTitle",{provider:(0,v.kC)(e)}),isOpen:!0,onClose:t,actions:[r.ZP.createElement(n.zx,{"data-testid":i("link"),key:"confirm",variant:"primary",type:"submit",form:"group-form",isDisabled:!g},i("link")),r.ZP.createElement(n.zx,{id:"modal-cancel","data-testid":"cancel",key:"cancel",variant:n.Wu.link,onClick:()=>{t()}},i("common:cancel"))]},r.ZP.createElement(n.l0,{id:"group-form",onSubmit:f((async r=>{try{await o.users.addToFederatedIdentity({id:y,federatedIdentityId:e,federatedIdentity:r}),c(i("users:idpLinkSuccess"),n.Ux.success),t(),a()}catch(e){m("users:couldNotLinkIdP",e)}}))},r.ZP.createElement(n.cw,{name:"idp-name-group",label:i("users:identityProvider"),fieldId:"idp-name",helperTextInvalid:i("common:required"),validated:Z.identityProvider?n.LD.error:n.LD.default},r.ZP.createElement(P.F,{"data-testid":"idpNameInput","aria-label":"Identity provider name input",ref:E({required:!0}),autoFocus:!0,isReadOnly:!0,type:"text",id:"link-idp-name",name:"identityProvider",value:(0,v.kC)(e),validated:Z.identityProvider?n.LD.error:n.LD.default})),r.ZP.createElement(n.cw,{name:"user-id-group",label:i("users:userID"),fieldId:"user-id",helperText:i("users-help:userIdHelperText"),helperTextInvalid:i("common:required"),validated:Z.userId?n.LD.error:n.LD.default,isRequired:!0},r.ZP.createElement(P.F,{"data-testid":"userIdInput","aria-label":"user ID input",ref:E({required:!0}),autoFocus:!0,type:"text",id:"link-idp-user-id",name:"userId",validated:Z.userId?n.LD.error:n.LD.default})),r.ZP.createElement(n.cw,{name:"username-group",label:i("users:username"),fieldId:"username",helperText:i("users-help:usernameHelperText"),helperTextInvalid:i("common:required"),validated:Z.name?n.LD.error:n.LD.default,isRequired:!0},r.ZP.createElement(P.F,{"data-testid":"usernameInput","aria-label":"username input",ref:E({required:!0}),autoFocus:!0,type:"text",id:"link-idp-username",name:"userName",validated:Z.name?n.LD.error:n.LD.default}))))};var K=a(5309);const N=()=>{const[e,t]=(0,r.eJ)(0),[a,l]=(0,r.eJ)(""),[i,o]=(0,r.eJ)(!1),{adminClient:c}=(0,u.K3)(),{id:P}=(0,d.UO)(),{realm:f}=(0,m.PL)(),{addAlert:g,addError:Z}=(0,p.Z7)(),{t:y}=(0,s.$G)("users"),b=()=>t((new Date).getTime()),k=(0,U.tN)().identityProviders,C=async()=>{const e=await c.identityProviders.find(),t=await c.users.listFederatedIdentities({id:P});for(const a of t)a.providerId=e.find((e=>e.alias===a.identityProvider))?.providerId;return t},[I,T]=(0,w.W)({titleKey:y("users:unlinkAccountTitle",{provider:(0,v.kC)(a)}),messageKey:y("users:unlinkAccountConfirm",{provider:(0,v.kC)(a)}),continueButtonLabel:"users:unlink",continueButtonVariant:n.Wu.primary,onConfirm:async()=>{try{await c.users.delFromFederatedIdentity({id:P,federatedIdentityId:a}),g(y("common:mappingDeletedSuccess"),n.Ux.success),b()}catch(e){Z("common:mappingDeletedError",e)}}});return r.ZP.createElement(r.ZP.Fragment,null,i&&r.ZP.createElement(A,{federatedId:a,handleModalToggle:()=>{o(!i)},refresh:b}),r.ZP.createElement(T,null),r.ZP.createElement(n.NP,{variant:"light"},r.ZP.createElement(D.b,{title:y("linkedIdPs"),className:"kc-linked-idps"},r.ZP.createElement(n.wu,null,r.ZP.createElement(n.xv,{className:"kc-available-idps-text"},y("linkedIdPsText"))),r.ZP.createElement(x.B,{loader:async()=>C(),key:e,isPaginated:!1,ariaLabelKey:"users:LinkedIdPs",className:"kc-linked-IdPs-table",columns:[{name:"identityProvider",displayKey:"common:name",cellFormatters:[(0,E.CU)()],cellRenderer:e=>r.ZP.createElement(d.rU,{to:(0,K.Q)({realm:f,providerId:e.providerId,alias:e.identityProvider,tab:"settings"})},(0,v.kC)(e.identityProvider)),transforms:[(0,h.dY)(20)]},{name:"type",displayKey:"common:type",cellFormatters:[(0,E.CU)()],cellRenderer:e=>{const t=k?.find((t=>t.id===e.identityProvider))?.groupName;return r.ZP.createElement(n.__,{color:"Social"===t?"blue":"orange"},"Social"===t?"Social":"Custom")},transforms:[(0,h.dY)(10)]},{name:"userId",displayKey:"users:userID",cellFormatters:[(0,E.CU)()],transforms:[(0,h.dY)(30)]},{name:"userName",displayKey:"users:username",cellFormatters:[(0,E.CU)()],transforms:[(0,h.dY)(20)]},{name:"",cellFormatters:[(0,E.CU)()],cellRenderer:e=>r.ZP.createElement(n.zx,{variant:"link",onClick:()=>{l(e.identityProvider),I()}},y("unlinkAccount")),transforms:[(0,h.dY)(20)]}],emptyState:r.ZP.createElement(n.wu,{className:"kc-no-providers-text"},r.ZP.createElement(n.xv,null,y("users:noProvidersLinked")))})),r.ZP.createElement(D.b,{className:"kc-available-idps",title:y("availableIdPs")},r.ZP.createElement(n.wu,null,r.ZP.createElement(n.xv,{className:"kc-available-idps-text"},y("availableIdPsText"))),r.ZP.createElement(x.B,{loader:async()=>{const e=(await C()).map((e=>e.identityProvider));return(await(async()=>(await c.realms.findOne({realm:f})).identityProviders)())?.filter((t=>!e.includes(t.alias)))},key:e,isPaginated:!1,ariaLabelKey:"users:LinkedIdPs",className:"kc-linked-IdPs-table",columns:[{name:"alias",displayKey:"common:name",cellFormatters:[(0,E.CU)(),(0,E.UY)()],transforms:[(0,h.dY)(20)]},{name:"type",displayKey:"common:type",cellFormatters:[(0,E.CU)()],cellRenderer:e=>{const t=k?.find((t=>t.id===e.providerId))?.groupName;return r.ZP.createElement(n.__,{color:"User-defined"===t?"orange":"blue"},"User-defined"===t?"Custom":t)},transforms:[(0,h.dY)(60)]},{name:"",cellFormatters:[(0,E.CU)()],cellRenderer:e=>r.ZP.createElement(n.zx,{variant:"link",onClick:()=>{l(e.alias),o(!0)}},y("linkAccount"))}],emptyState:r.ZP.createElement(n.wu,{className:"kc-no-providers-text"},r.ZP.createElement(n.xv,null,y("users:noAvailableIdentityProviders")))}))))};var R=a(4467),F=a(5952),G=a(2931);const B=({id:e,name:t})=>{const{t:a}=(0,s.$G)("users"),{adminClient:l}=(0,u.K3)(),{addAlert:i,addError:d}=(0,p.Z7)(),[o,c]=(0,r.eJ)(!1);return r.ZP.createElement(G.Bo,{name:t,id:e,type:"users",loader:async()=>{const[t,a]=await Promise.all([l.users.listRealmRoleMappings({id:e}).then((e=>e.map((e=>({role:e}))))),l.users.listCompositeRealmRoleMappings({id:e}).then((e=>e.map((e=>({role:e})))))]),r=await l.clients.find(),n=(await Promise.all(r.map((async t=>{const[a,r]=await Promise.all([l.users.listClientRoleMappings({id:e,clientUniqueId:t.id}).then((e=>e.map((e=>({role:e,client:t}))))),l.users.listCompositeClientRoleMappings({id:e,clientUniqueId:t.id}).then((e=>e.map((e=>({role:e,client:t})))))]);return(0,G.cc)(a,r,o)})))).flat();return[...(0,G.cc)(t,a,o),...n]},save:async t=>{try{const r=t.filter((e=>void 0===e.client)).map((e=>e.role)).flat();await l.users.addRealmRoleMappings({id:e,roles:r}),await Promise.all(t.filter((e=>void 0!==e.client)).map((t=>l.users.addClientRoleMappings({id:e,clientUniqueId:t.client.id,roles:[t.role]})))),i(a("roleMappingUpdatedSuccess"),n.Ux.success)}catch(e){d("clients:roleMappingUpdatedError",e)}},onHideRolesToggle:()=>c(!o)})};var S=a(5482),O=a(5260);const M=({user:e})=>{const{t}=(0,s.$G)("users"),{adminClient:a}=(0,u.K3)(),{addAlert:i,addError:d}=(0,p.Z7)(),[o,c]=(0,r.eJ)(e),m=(0,l.cI)({mode:"onChange"}),P=e=>(0,O.q)(e||o.attributes);return(0,r.d4)((()=>{m.setValue("attributes",P())}),[o]),r.ZP.createElement(n.NP,{variant:n.Dk.light},r.ZP.createElement(S.m,{form:m,save:async e=>{try{const r=(0,O.Y)(e.attributes);await a.users.update({id:o.id},{...o,attributes:r}),c({...o,attributes:r}),i(t("userSaved"),n.Ux.success)}catch(e){d("groups:groupUpdateError",e)}},fineGrainedAccess:o.access?.manage,reset:()=>m.reset({attributes:P()})}))};var q=a(3745),J=a(4836);const V={password:"",passwordConfirmation:"",temporaryPassword:!0},$=({user:e,isResetPassword:t,refresh:a,onClose:i})=>{const{t:d}=(0,s.$G)("users"),{register:o,control:m,formState:{isValid:P,errors:E},watch:f,handleSubmit:g}=(0,l.cI)({defaultValues:V,mode:"onChange",shouldUnregister:!1}),[Z,y]=(0,J.Z)(!0),b=f("password",""),{adminClient:h}=(0,u.K3)(),{addAlert:v,addError:k}=(0,p.Z7)(),[C,I]=(0,w.W)({titleKey:t?"users:resetPasswordConfirm":"users:setPasswordConfirm",messageKey:d(t?"resetPasswordConfirmText":"setPasswordConfirmText",{username:e.username}),continueButtonLabel:t?"users:resetPassword":"users:savePassword",continueButtonVariant:n.Wu.danger,onConfirm:()=>g(x)()}),x=async({password:r,temporaryPassword:s})=>{try{await h.users.resetPassword({id:e.id,credential:{temporary:s,type:"password",value:r}});const{id:l}=(await h.users.getCredentials({id:e.id})).find((e=>"password"===e.type));await h.users.updateCredentialLabel({id:e.id,credentialId:l},d("defaultPasswordLabel")),v(d(t?"resetCredentialsSuccess":"savePasswordSuccess"),n.Ux.success),a()}catch(e){k(t?"users:resetPasswordError":"users:savePasswordError",e)}i()};return r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(I,null),r.ZP.createElement(w.X,{titleKey:d(t?"resetPasswordFor":"setPasswordFor",{username:e.username}),open:Z,onCancel:i,toggleDialog:y,onConfirm:C,confirmButtonDisabled:!P,continueButtonLabel:"common:save"},r.ZP.createElement(n.l0,{id:"userCredentials-form",isHorizontal:!0,className:"keycloak__user-credentials__reset-form"},r.ZP.createElement(n.cw,{name:"password",label:d("password"),fieldId:"password",helperTextInvalid:d("common:required"),validated:E.password?n.LD.error:n.LD.default,isRequired:!0},r.ZP.createElement(q.W,{"data-testid":"passwordField",name:"password","aria-label":"password",ref:o({required:!0})})),r.ZP.createElement(n.cw,{name:"passwordConfirmation",label:d(t?"resetPasswordConfirmation":"passwordConfirmation"),fieldId:"passwordConfirmation",helperTextInvalid:E.passwordConfirmation?.message,validated:E.passwordConfirmation?n.LD.error:n.LD.default,isRequired:!0},r.ZP.createElement(q.W,{"data-testid":"passwordConfirmationField",name:"passwordConfirmation","aria-label":"passwordConfirm",ref:o({required:!0,validate:e=>e===b||d("confirmPasswordDoesNotMatch").toString()})})),r.ZP.createElement(n.cw,{label:d("common:temporaryPassword"),labelIcon:r.ZP.createElement(c.B,{helpText:"temporaryPasswordHelpText",fieldLabelId:"temporaryPassword"}),fieldId:"kc-temporaryPassword"},r.ZP.createElement(l.Qr,{name:"temporaryPassword",defaultValue:!0,control:m,render:({onChange:e,value:t})=>r.ZP.createElement(n.rs,{className:"kc-temporaryPassword",onChange:e,isChecked:t,label:d("common:on"),labelOff:d("common:off")})})))))};var z=a(7216);const Y=()=>{const{t:e}=(0,s.$G)("users"),{control:t}=(0,l.Gc)(),[a,i]=(0,r.eJ)(!1);return r.ZP.createElement(n.cw,{label:e("resetActions"),labelIcon:r.ZP.createElement(c.B,{helpText:"clients-help:resetActions",fieldLabelId:"resetActions"}),fieldId:"actions"},r.ZP.createElement(l.Qr,{name:"actions",defaultValue:[],control:t,render:({onChange:t,value:s})=>r.ZP.createElement(n.Ph,{toggleId:"actions",variant:n.TM.typeaheadMulti,chipGroupProps:{numChips:3},menuAppendTo:"parent",onToggle:e=>i(e),isOpen:a,selections:s,onSelect:(e,a)=>t(s.find((e=>e===a))?s.filter((e=>e!==a)):[...s,a]),onClear:e=>{e.stopPropagation(),t([])},typeAheadAriaLabel:e("resetActions")},Object.values(z.R).map(((t,a)=>r.ZP.createElement(n.$m,{key:a,value:t,"data-testid":`${t}-option`},e(t)))))}))};var W=a(3954);const j=()=>{const{t:e}=(0,s.$G)("users"),{control:t}=(0,l.Gc)();return r.ZP.createElement(n.cw,{fieldId:"lifespan",label:e("lifespan"),isStack:!0,labelIcon:r.ZP.createElement(c.B,{helpText:"clients-help:lifespan",fieldLabelId:"lifespan"})},r.ZP.createElement(l.Qr,{name:"lifespan",defaultValue:H.lifespan,control:t,render:({onChange:e,value:t})=>r.ZP.createElement(W.uM,{value:t,units:["minute","hour","day"],onChange:e,menuAppendTo:"parent"})}))},H={actions:[],lifespan:43200},_=({userId:e,onClose:t})=>{const{t:a}=(0,s.$G)("users"),i=(0,l.cI)({defaultValues:H}),{handleSubmit:d,control:o}=i,c=(0,l.qo)({control:o,name:"actions"}),m=!(0,v.xb)(c),{adminClient:P}=(0,u.K3)(),{addAlert:E,addError:f}=(0,p.Z7)(),g=async({actions:r,lifespan:s})=>{if(!(0,v.xb)(r))try{await P.users.executeActionsEmail({id:e,actions:r,lifespan:s}),E(a("credentialResetEmailSuccess"),n.Ux.success),t()}catch(e){f("users:credentialResetEmailError",e)}};return r.ZP.createElement(w.X,{variant:n.vE.medium,titleKey:"users:credentialReset",open:!0,onCancel:t,toggleDialog:t,continueButtonLabel:"users:credentialResetConfirm",onConfirm:()=>{d(g)()},confirmButtonDisabled:!m},r.ZP.createElement(n.l0,{id:"userCredentialsReset-form",isHorizontal:!0,"data-testid":"credential-reset-modal"},r.ZP.createElement(l.RV,{...i},r.ZP.createElement(Y,null),r.ZP.createElement(j,null))))},Q=({userId:e,credential:t,isEditable:a,toggle:i})=>{const{t:d}=(0,s.$G)("users"),{register:o,handleSubmit:c}=(0,l.cI)(),{adminClient:m}=(0,u.K3)(),{addAlert:E,addError:f}=(0,p.Z7)();return r.ZP.createElement(n.l0,{isHorizontal:!0,className:"kc-form-userLabel",onSubmit:c((async a=>{try{await m.users.updateCredentialLabel({id:e,credentialId:t.id},a.userLabel||""),E(d("updateCredentialUserLabelSuccess"),n.Ux.success),i()}catch(e){f("users:updateCredentialUserLabelError",e)}}))},r.ZP.createElement(n.cw,{fieldId:"kc-userLabel",className:"kc-userLabel-row"},r.ZP.createElement("div",{className:"kc-form-group-userLabel"},a?r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(P.F,{name:"userLabel","data-testid":"userLabelFld",defaultValue:t.userLabel,ref:o(),type:"text",className:"kc-userLabel","aria-label":d("userLabel")}),r.ZP.createElement("div",{className:"kc-userLabel-actionBtns"},r.ZP.createElement(n.zx,{"data-testid":"editUserLabelAcceptBtn",variant:"link",className:"kc-editUserLabelAcceptBtn",type:"submit",icon:r.ZP.createElement(b.nQ,null)}),r.ZP.createElement(n.zx,{"data-testid":"editUserLabelCancelBtn",variant:"link",className:"kc-editUserLabel-cancelBtn",onClick:i,icon:r.ZP.createElement(b.q1,null)}))):r.ZP.createElement(r.ZP.Fragment,null,t.userLabel,r.ZP.createElement(n.zx,{"aria-label":d("editUserLabel"),variant:"link",className:"kc-editUserLabel-btn",onClick:i,"data-testid":"editUserLabelBtn",icon:r.ZP.createElement(b.sC,null)})))))};var X=a(9285),ee=(a(6916),a(3227));const te=({credentialData:e,onClose:t})=>{const{t:a}=(0,s.$G)("users");return r.ZP.createElement(n.u_,{variant:n.vE.medium,title:a("passwordDataTitle"),"data-testid":"passwordDataDialog",isOpen:!0,onClose:t},r.ZP.createElement(h.iA,{"aria-label":a("passwordDataTitle"),"data-testid":"password-data-dialog",variant:h.BZ.compact,cells:[a("showPasswordDataName"),a("showPasswordDataValue")],rows:e},r.ZP.createElement(h.xD,null),r.ZP.createElement(h.RM,null)))},ae=({credential:e,resetPassword:t,toggleDelete:a,children:l})=>{const{t:i}=(0,s.$G)("users"),[d,o]=(0,J.Z)(),[c,m]=(0,J.Z)(),u=(0,ee.Z)(),p=(0,r.Ye)((()=>{if(!e.credentialData)return[];const t=JSON.parse(e.credentialData);return u(Object.entries(t),(([e])=>e)).map((([e,t])=>"string"==typeof t?[e,t]:[e,JSON.stringify(t)]))}),[e.credentialData]);return r.ZP.createElement(r.ZP.Fragment,null,d&&0!==Object.keys(e).length&&r.ZP.createElement(te,{credentialData:p,onClose:()=>{o()}}),r.ZP.createElement(h.Td,null,l),r.ZP.createElement(h.Td,null,r.ZP.createElement(n.zx,{className:"kc-showData-btn",variant:"link","data-testid":"showDataBtn",onClick:o},i("showDataBtn"))),"password"===e.type?r.ZP.createElement(h.Td,{isActionCell:!0},r.ZP.createElement(n.zx,{variant:"secondary","data-testid":"resetPasswordBtn",onClick:t},i("resetPasswordBtn"))):r.ZP.createElement(h.Td,null),r.ZP.createElement(h.Td,{isActionCell:!0},r.ZP.createElement(n.Lt,{isPlain:!0,position:n.ir.right,toggle:r.ZP.createElement(n.ax,{onToggle:m}),isOpen:c,dropdownItems:[r.ZP.createElement(n.hP,{key:e.id,"data-testid":"deleteDropdownItem",component:"button",onClick:()=>{a(),m()}},i("deleteBtn"))]})))},re=({user:e})=>{const{t}=(0,s.$G)("users"),{addAlert:a,addError:l}=(0,p.Z7)(),[i,d]=(0,r.eJ)(0),o=()=>d(i+1),[m,P]=(0,r.eJ)(!1),[f,g]=(0,r.eJ)(!1),{adminClient:Z}=(0,u.K3)(),[y,b]=(0,r.eJ)([]),[v,k]=(0,r.eJ)([]),[C,x]=(0,r.eJ)({}),[T,L]=(0,r.eJ)(!1),[D,U]=(0,r.eJ)(),A=(0,r.sO)(null),[K,N]=(0,r.eJ)({draggedItemId:"",draggingToItemIndex:-1,dragging:!1,tempItemOrder:[""]});(0,u.ib)((()=>Z.users.getCredentials({id:e.id})),(e=>{b(e);const t=e.reduce(((e,t)=>(e[t.type]=e[t.type]||[],e[t.type].push(t),e)),Object.create(null)),a=Object.keys(t).map((e=>({key:e,value:t[e]})));k(a.map((e=>({...e,isExpanded:!1}))))}),[i]);const R=y.find((e=>"password"===e.type)),F=()=>P(!m),G=()=>{L(!0),F()},[B,S]=(0,w.W)({titleKey:t("deleteCredentialsConfirmTitle"),messageKey:t("deleteCredentialsConfirm"),continueButtonLabel:t("common:delete"),continueButtonVariant:n.Wu.danger,onConfirm:async()=>{try{await Z.users.deleteCredential({id:e.id,credentialId:C.id}),a(t("deleteCredentialsSuccess"),n.Ux.success),d((e=>e+1))}catch(e){l("users:deleteCredentialsError",e)}}}),O=({credential:t})=>r.ZP.createElement(ae,{key:t.id,credential:t,toggleDelete:()=>{x(t),B()},resetPassword:G},r.ZP.createElement(Q,{credential:t,userId:e.id,isEditable:D?.status&&D.rowKey===t.id||!1,toggle:()=>{U({status:!D?.status,rowKey:t.id}),D?.status&&o()}})),M=(0,r.Ye)((()=>v.flatMap((e=>[e.value.map((({id:e})=>e)).toString(),...e.isExpanded?e.value.map((e=>e.id)):[]]))),[v]),q=e=>{e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",e.currentTarget.id);const t=e.currentTarget.id;e.currentTarget.classList.add(X.s.modifiers.ghostRow),e.currentTarget.setAttribute("aria-pressed","true"),N({...K,draggedItemId:t,dragging:!0})},J=e=>{if(!A.current)return;const t=A.current,a=Array.from(t.children);a.every((({id:t},a)=>t===e[a]))||(t.replaceChildren(),e.forEach((e=>{t.appendChild(a.find((({id:t})=>t===e)))})))},V=e=>{if(!A.current)return!1;const t=A.current.getBoundingClientRect();return e.clientX>t.x&&e.clientX<t.x+t.width&&e.clientY>t.y&&e.clientY<t.y+t.height},z=e=>{V(e)?j(K.draggedItemId,K.tempItemOrder):A.current&&(Array.from(A.current.children).forEach((e=>{e.classList.remove(X.s.modifiers.ghostRow),e.setAttribute("aria-pressed","false")})),N({...K,draggedItemId:"",draggingToItemIndex:-1,dragging:!1}))},Y=e=>{e.preventDefault();const t=e.target.closest("tr");if(t&&(!A.current||A.current.contains(t))&&t.id!==K.draggedItemId){const e=t.id,a=Array.from(A.current?.children||[]).findIndex((t=>t.id===e));if(a===K.draggingToItemIndex)return;const r=((e,t,a)=>{const r=e.indexOf(t);if(r===a)return e;const n=[...e];return n.splice(a,0,n.splice(r,1)[0]),n})(M,K.draggedItemId,a);J(r),N({...K,draggingToItemIndex:a,tempItemOrder:r})}},W=({target:e})=>{e instanceof HTMLTableRowElement&&(e.classList.remove(X.s.modifiers.ghostRow),e.setAttribute("aria-pressed","false"),N({...K,draggedItemId:"",draggingToItemIndex:-1,dragging:!1}))},j=async(r,s)=>{const i=M.findIndex((e=>e===r)),d=s.findIndex((e=>e===r)),c=d-i,m=r.split(",");try{for(const t of m)for(let a=0;a<Math.abs(c);a++)c>0?await Z.users.moveCredentialPositionDown({id:e.id,credentialId:t,newPreviousCredentialId:M[d]}):await Z.users.moveCredentialPositionUp({id:e.id,credentialId:t});o(),a(t("users:updatedCredentialMoveSuccess"),n.Ux.success)}catch(e){l("users:updatedCredentialMoveError",e)}};return r.ZP.createElement(r.ZP.Fragment,null,m&&r.ZP.createElement($,{user:e,isResetPassword:T,refresh:o,onClose:()=>P(!1)}),f&&r.ZP.createElement(_,{userId:e.id,onClose:()=>g(!1)}),r.ZP.createElement(S,null),0!==y.length&&void 0===R&&r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(n.zx,{className:"kc-setPasswordBtn-tbl","data-testid":"setPasswordBtn-table",variant:"primary",form:"userCredentials-form",onClick:()=>{P(!0)}},t("setPassword")),r.ZP.createElement(n.iz,null)),0!==v.length?r.ZP.createElement(r.ZP.Fragment,null,e.email&&r.ZP.createElement(n.zx,{className:"kc-resetCredentialBtn-header",variant:"primary","data-testid":"credentialResetBtn",onClick:()=>g(!0)},t("credentialResetBtn")),r.ZP.createElement(h.Xs,{"aria-label":"userCredentials-table",variant:"compact"},r.ZP.createElement(h.hr,null,r.ZP.createElement(h.Tr,{className:"kc-table-header"},r.ZP.createElement(h.Th,null,r.ZP.createElement(c.B,{helpText:"users:userCredentialsHelpText",fieldLabelId:"users:userCredentialsHelpTextLabel"})),r.ZP.createElement(h.Th,null),r.ZP.createElement(h.Th,null,t("type")),r.ZP.createElement(h.Th,null,t("userLabel")),r.ZP.createElement(h.Th,null,t("data")),r.ZP.createElement(h.Th,null),r.ZP.createElement(h.Th,null))),r.ZP.createElement(h.p3,{ref:A,onDragOver:Y,onDrop:Y,onDragLeave:e=>{V(e)||(J(M),N({...K,draggingToItemIndex:-1}))}},v.map(((e,t)=>r.ZP.createElement(r.HY,{key:e.key},r.ZP.createElement(h.Tr,{id:e.value.map((({id:e})=>e)).toString(),draggable:v.length>1,onDrop:z,onDragEnd:W,onDragStart:q},r.ZP.createElement(h.Td,{className:1===v.length?"one-row":"",draggableRow:{id:`draggable-row-${e.value.map((({id:e})=>e))}`}}),e.value.length>1?r.ZP.createElement(h.Td,{className:"kc-expandRow-btn",expand:{rowIndex:t,isExpanded:e.isExpanded,onToggle:(e,t)=>{const a=v.map(((e,a)=>a===t?{...e,isExpanded:!e.isExpanded}:e));k(a)}}}):r.ZP.createElement(h.Td,null),r.ZP.createElement(h.Td,{dataLabel:`columns-${e.key}`,className:"kc-notExpandableRow-credentialType","data-testid":"credentialType"},(0,E.LO)(e.key)),e.value.length<=1&&e.value.map((e=>r.ZP.createElement(O,{key:e.id,credential:e})))),e.isExpanded&&e.value.map((t=>r.ZP.createElement(h.Tr,{key:t.id,id:t.id,draggable:!0,onDrop:z,onDragEnd:W,onDragStart:q},r.ZP.createElement(h.Td,null),r.ZP.createElement(h.Td,{className:"kc-draggable-dropdown-type-icon",draggableRow:{id:`draggable-row-${e.value.map((({id:e})=>e))}`}}),r.ZP.createElement(h.Td,{dataLabel:`child-columns-${t.id}`,className:"kc-expandableRow-credentialType"},(0,E.LO)(t.type)),r.ZP.createElement(O,{credential:t})))))))))):r.ZP.createElement(I.M,{hasIcon:!0,message:t("noCredentials"),instructions:t("noCredentialsText"),primaryActionText:t("setPassword"),onPrimaryAction:F,secondaryActions:e.email?[{text:t("credentialResetBtn"),onClick:()=>{g(!f)},type:n.Wu.link}]:void 0}))};var ne=a(7174);const se=()=>{const{adminClient:e}=(0,u.K3)(),{id:t}=(0,d.UO)(),{realm:a}=(0,m.PL)(),{t:l}=(0,s.$G)("sessions");return r.ZP.createElement(n.NP,{variant:"light",className:"pf-u-p-0"},r.ZP.createElement(ne.Z,{loader:()=>e.users.listSessions({id:t,realm:a}),hiddenColumns:["username"],emptyInstructions:l("noSessionsForUser"),logoutUser:t}))};var le=a(8670),ie=a(3172);const de=()=>{const{t:e}=(0,s.$G)("users"),{addAlert:t,addError:a}=(0,p.Z7)(),o=(0,d.k6)(),{realm:c}=(0,m.PL)(),{hasAccess:P}=(0,le.md)(),{adminClient:E}=(0,u.K3)(),f=(0,l.cI)({mode:"onChange"}),{id:g}=(0,d.UO)(),[b,h]=(0,r.eJ)(),[v,k]=(0,r.eJ)(),[C,I]=(0,r.eJ)([]);(0,u.ib)((async()=>{if(g){const t=await E.users.findOne({id:g});if(!t)throw new Error(e("common:notFound"));const a=(await E.realms.findOne({realm:c})).bruteForceProtected,r=await E.attackDetection.findOne({id:t.id});return{user:t,bruteForced:{isBruteForceProtected:a,isLocked:a&&r&&r.disabled}}}return{user:void 0}}),(({user:e,bruteForced:t})=>{h(e),k(t),e&&x(e)}),[b?.username]);const x=e=>{f.reset(e)},D=e=>{I(e)},U=async r=>{r.username=r.username?.trim();try{if(g)await E.users.update({id:g},r),t(e("userSaved"),n.Ux.success);else{const a=await E.users.create(r);C.forEach((async e=>{await E.users.addToGroup({id:a.id,groupId:e.id})})),t(e("userCreated"),n.Ux.success),o.push((0,R.Z)({id:a.id,realm:c,tab:"settings"}))}}catch(e){a("users:userCreateError",e)}},[A,K]=(0,w.W)({titleKey:"users:deleteConfirm",messageKey:"users:deleteConfirmCurrentUser",continueButtonLabel:"common:delete",continueButtonVariant:n.Wu.danger,onConfirm:async()=>{try{await E.users.del({id:g}),t(e("userDeletedSuccess"),n.Ux.success),o.push((0,F.b)({realm:c}))}catch(e){a("users:userDeletedError",e)}}}),[G,S]=(0,w.W)({titleKey:"users:impersonateConfirm",messageKey:"users:impersonateConfirmDialog",continueButtonLabel:"users:impersonate",onConfirm:async()=>{try{const e=await E.users.impersonation({id:g},{user:g,realm:c});e.sameRealm?window.location=e.redirect:window.open(e.redirect,"_blank")}catch(e){a("users:impersonateError",e)}}});return g&&!b?r.ZP.createElement(ie.g,null):r.ZP.createElement(r.ZP.Fragment,null,r.ZP.createElement(S,null),r.ZP.createElement(K,null),r.ZP.createElement(i.t,{titleKey:b?.id?b.username:e("createUser"),divider:!g,dropdownItems:[r.ZP.createElement(n.hP,{key:"impersonate",isDisabled:!b?.access?.impersonate,onClick:()=>G()},e("impersonate")),r.ZP.createElement(n.hP,{key:"delete",isDisabled:!b?.access?.manage,onClick:()=>A()},e("common:delete"))]}),r.ZP.createElement(n.NP,{variant:"light",className:"pf-u-p-0"},r.ZP.createElement(l.RV,{...f},g&&b&&r.ZP.createElement(y.n,{isBox:!0,mountOnEnter:!0},r.ZP.createElement(n.OK,{eventKey:"settings","data-testid":"user-details-tab",title:r.ZP.createElement(n.TP,null,e("common:details"))},r.ZP.createElement(n.NP,{variant:"light"},v&&r.ZP.createElement(Z,{onGroupsUpdate:D,save:U,user:b,bruteForce:v}))),r.ZP.createElement(n.OK,{eventKey:"attributes","data-testid":"attributes",title:r.ZP.createElement(n.TP,null,e("common:attributes"))},r.ZP.createElement(M,{user:b})),r.ZP.createElement(n.OK,{eventKey:"credentials","data-testid":"credentials",isHidden:!b.access?.manage,title:r.ZP.createElement(n.TP,null,e("common:credentials"))},r.ZP.createElement(re,{user:b})),r.ZP.createElement(n.OK,{eventKey:"role-mapping","data-testid":"role-mapping-tab",isHidden:!b.access?.mapRoles,title:r.ZP.createElement(n.TP,null,e("roleMapping"))},r.ZP.createElement(B,{id:g,name:b.username})),r.ZP.createElement(n.OK,{eventKey:"groups","data-testid":"user-groups-tab",title:r.ZP.createElement(n.TP,null,e("common:groups"))},r.ZP.createElement(T,{user:b})),r.ZP.createElement(n.OK,{eventKey:"consents","data-testid":"user-consents-tab",title:r.ZP.createElement(n.TP,null,e("consents"))},r.ZP.createElement(L,null)),P("view-identity-providers")&&r.ZP.createElement(n.OK,{eventKey:"identity-provider-links","data-testid":"identity-provider-links-tab",title:r.ZP.createElement(n.TP,null,e("identityProviderLinks"))},r.ZP.createElement(N,null)),r.ZP.createElement(n.OK,{eventKey:"sessions","data-testid":"user-sessions-tab",title:r.ZP.createElement(n.TP,null,e("sessions"))},r.ZP.createElement(se,null))),!g&&r.ZP.createElement(n.NP,{variant:"light"},r.ZP.createElement(Z,{onGroupsUpdate:D,save:U})))))}}}]);