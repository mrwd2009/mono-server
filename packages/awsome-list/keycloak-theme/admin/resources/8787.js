"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8787],{8787:(e,t,a)=>{a.r(t),a.d(t,{default:()=>U}),a(5623);var l=a(5863),r=a(2954),o=a(710),n=a(3802),s=a(1576),i=a(390),c=a(4326),m=a(8798),d=a(5482),u=a(5260),p=a(3172),P=a(1677),E=a(9766),y=a(4839),Z=a(1786),b=a(4036),f=a(764);const g=({form:{handleSubmit:e,errors:t,register:a,getValues:s},save:i,editMode:c,reset:m})=>{const{t:d}=(0,n.$G)("roles"),u=(0,r.k6)(),{realm:p}=(0,f.PL)();return l.ZP.createElement(l.ZP.Fragment,null,!c&&l.ZP.createElement(P.t,{titleKey:d("createRole")}),l.ZP.createElement(o.NP,{variant:"light"},l.ZP.createElement(y.N,{isHorizontal:!0,onSubmit:e(i),role:"manage-realm",className:"pf-u-mt-lg"},l.ZP.createElement(o.cw,{label:d("roleName"),fieldId:"kc-name",isRequired:!0,validated:t.name?"error":"default",helperTextInvalid:d("common:required")},l.ZP.createElement(Z.F,{ref:a({required:!c,validate:e=>!!e.trim()||d("common:required").toString()}),type:"text",id:"kc-name",name:"name",isReadOnly:c})),l.ZP.createElement(o.cw,{label:d("common:description"),fieldId:"kc-description",validated:t.description?o.LD.error:o.LD.default,helperTextInvalid:t.description?.message},l.ZP.createElement(b.Q,{name:"description","aria-label":"description",isDisabled:s().name?.includes("default-roles"),ref:a({maxLength:{value:255,message:d("common:maxLength",{length:255})}}),type:"text",validated:t.description?o.LD.error:o.LD.default,id:"kc-role-description"})),l.ZP.createElement(o.WK,null,l.ZP.createElement(o.zx,{variant:"primary",onClick:i,"data-testid":"realm-roles-save-button"},d("common:save")),l.ZP.createElement(o.zx,{"data-testid":"cancel",onClick:()=>c?m():u.push(`/${p}/roles`),variant:"link"},d(c?"common:revert":"common:cancel"))))))};var h=a(5999),k=a(2265),v=a(9035),w=a(7973),C=a(904),R=a(1586),x=a(192),K=a(8336);const N=()=>{const e=(0,r.k6)(),{realm:t}=(0,f.PL)(),{t:a}=(0,n.$G)("roles"),{id:s,clientId:i}=(0,r.UO)(),{adminClient:c}=(0,m.K3)(),{enabled:d}=(0,C.yD)();return l.ZP.createElement(o.NP,{"data-testid":"users-page",variant:"light"},l.ZP.createElement(x.B,{isPaginated:!0,loader:async(e,t)=>{const l=await c.roles.findOneById({id:s});if(!l)throw new Error(a("common:notFound"));return l.clientRole?c.clients.findUsersWithRole({roleName:l.name,id:i,first:e,max:t}):c.roles.findUsersWithRole({name:l.name,first:e,max:t})},ariaLabelKey:"roles:roleList",searchPlaceholderKey:"",toolbarItem:d&&l.ZP.createElement(o.J2,{"aria-label":"Basic popover",position:"bottom",bodyContent:l.ZP.createElement("div",null,a("roles:whoWillAppearPopoverText"),l.ZP.createElement(o.zx,{className:"kc-groups-link",variant:"link",onClick:()=>e.push(`/${t}/groups`)},a("common:groups")),a("or"),l.ZP.createElement(o.zx,{className:"kc-users-link",variant:"link",onClick:()=>e.push(`/${t}/users`)},a("users"),".")),footerContent:a("roles:whoWillAppearPopoverFooterText")},l.ZP.createElement(o.zx,{variant:"link",className:"kc-who-will-appear-button",key:"who-will-appear-button",icon:l.ZP.createElement(w.pT,null)},a("roles:whoWillAppearLinkText"))),emptyState:l.ZP.createElement(R.M,{hasIcon:!0,message:a("noDirectUsers"),instructions:l.ZP.createElement("div",null,a("noUsersEmptyStateDescription"),l.ZP.createElement(o.zx,{className:"kc-groups-link-empty-state",variant:"link",onClick:()=>e.push(`/${t}/groups`)},a("common:groups")),a("or"),l.ZP.createElement(o.zx,{className:"kc-users-link-empty-state",variant:"link",onClick:()=>e.push(`/${t}/users`)},a("users")),a("noUsersEmptyStateDescriptionContinued"))}),columns:[{name:"username",displayKey:"roles:userName",cellFormatters:[(0,K.CU)()]},{name:"email",displayKey:"roles:email",cellFormatters:[(0,K.CU)()]},{name:"lastName",displayKey:"roles:lastName",cellFormatters:[(0,K.CU)()]},{name:"firstName",displayKey:"roles:firstName",cellFormatters:[(0,K.UY)(),(0,K.CU)()]}]}))};var D=a(7525),I=a(8607),O=a(860);function U(){const{t:e}=(0,n.$G)("roles"),t=(0,s.cI)({mode:"onChange"}),{setValue:a,getValues:y,trigger:Z,reset:b}=t,w=(0,r.k6)(),{adminClient:C}=(0,m.K3)(),[R,x]=(0,l.eJ)(),{id:K,clientId:U}=(0,r.UO)(),{url:A}=(0,r.$B)(),{realm:B}=(0,f.PL)(),[L,T]=(0,l.eJ)(""),$=()=>{T(`${(new Date).getTime()}`)},{addAlert:F,addError:S}=(0,c.Z7)(),[W,z]=(0,l.eJ)(!1),q=e=>{const{attributes:t,...a}=e;return{attributes:(0,u.q)(t),...a}},[J,V]=(0,l.eJ)();(0,m.ib)((async()=>{const e=await C.realms.findOne({realm:B});return K?{realm:e,role:await C.roles.findOneById({id:K})}:{realm:e}}),(({realm:t,role:l})=>{if(!t||!l&&K)throw new Error(e("common:notFound"));if(V(t),l){const e=q(l);x(e),Object.entries(e).map((e=>{a(e[0],e[1])}))}}),[L,A]);const M=async()=>{try{const t=y();if(t.attributes&&""===t.attributes[t.attributes.length-1]?.key&&a("attributes",t.attributes.slice(0,t.attributes.length-1)),!await Z())return;const{attributes:l,...r}=t;let n=r;if(n.name=n.name?.trim(),K)l&&(n.attributes=(0,u.Y)(l)),n={...(0,i.CE)(R,"attributes"),...n},U?await C.clients.updateRole({id:U,roleName:t.name},n):await C.roles.updateById({id:K},n),x(q(n));else{let a;if(U?(await C.clients.createRole({id:U,name:t.name}),t.description&&await C.clients.updateRole({id:U,roleName:t.name},n),a=await C.clients.findRole({id:U,roleName:t.name})):(await C.roles.create(n),a=await C.roles.findOneByName({name:t.name})),!a)throw new Error(e("common:notFound"));x(q(a)),w.push(A.substr(0,A.lastIndexOf("/")+1)+a.id+"/details")}F(e(K?"roleSaveSuccess":"roleCreated"),o.Ux.success)}catch(e){S(`roles:${K?"roleSave":"roleCreate"}Error`,e)}},[G,j]=(0,E.W)({titleKey:"roles:roleDeleteConfirm",messageKey:e("roles:roleDeleteConfirmDialog",{name:R?.name||e("createRole")}),continueButtonLabel:"common:delete",continueButtonVariant:o.Wu.danger,onConfirm:async()=>{try{U?await C.clients.delRole({id:U,roleName:R.name}):await C.roles.delById({id:K}),F(e("roleDeletedSuccess"),o.Ux.success),w.push(A.substr(0,A.indexOf("/roles")+"/roles".length))}catch(e){S("roles:roleDeleteError",e)}}}),Q=A.includes("associated-roles")?[l.ZP.createElement(o.hP,{key:"delete-all-associated",component:"button",onClick:()=>Y()},e("roles:removeAllAssociatedRoles")),l.ZP.createElement(o.hP,{key:"delete-role",component:"button",onClick:()=>{G()}},e("deleteRole"))]:[l.ZP.createElement(o.hP,{key:"toggle-modal","data-testid":"add-roles",component:"button",onClick:()=>X()},e("addAssociatedRolesText")),l.ZP.createElement(o.hP,{key:"delete-role",component:"button",onClick:()=>G()},e("deleteRole"))],[Y,H]=(0,E.W)({titleKey:e("roles:removeAllAssociatedRoles")+"?",messageKey:e("roles:removeAllAssociatedRolesConfirmDialog",{name:R?.name||e("createRole")}),continueButtonLabel:"common:delete",continueButtonVariant:o.Wu.danger,onConfirm:async()=>{try{const t=await C.roles.getCompositeRoles({id:R.id});await C.roles.delCompositeRoles({id:K},t),F(e("compositeRoleOff"),o.Ux.success,e("compositesRemovedAlertDescription"));const a=A.replace(/\/AssociatedRoles/g,"/details");w.push(a),$()}catch(e){S("roles:roleDeleteError",e)}}}),X=()=>{z(!W)},_=(0,r.$B)(I.p.path),ee=e=>J?.defaultRole.name===e;return J?R?l.ZP.createElement(l.ZP.Fragment,null,l.ZP.createElement(j,null),l.ZP.createElement(H,null),W&&l.ZP.createElement(h.j,{id:K,toggleDialog:X,onConfirm:async t=>{try{await C.roles.createComposite({roleId:R?.id,realm:J.realm},t),$(),(()=>{const e=_?(0,I.Q)({..._.params,tab:"associated-roles"}):(0,D.D)({realm:J?.realm,id:K,tab:"associated-roles"});w.push(e)})(),F(e("addAssociatedRolesSuccess"),o.Ux.success)}catch(e){S("roles:addAssociatedRolesError",e)}}}),l.ZP.createElement(P.t,{titleKey:R.name||e("createRole"),badges:[{id:"composite-role-badge",text:R.composite?e("composite"):"",readonly:!0}],subKey:K?"":"roles:roleCreateExplain",actionsDropdownId:"roles-actions-dropdown",dropdownItems:Q,divider:!K}),l.ZP.createElement(o.NP,{variant:"light",className:"pf-u-p-0"},K&&l.ZP.createElement(k.n,{isBox:!0,mountOnEnter:!0},l.ZP.createElement(o.OK,{eventKey:"details",title:l.ZP.createElement(o.TP,null,e("common:details"))},l.ZP.createElement(g,{reset:()=>b(R),form:t,save:M,editMode:!0})),R.composite&&l.ZP.createElement(o.OK,{eventKey:"associated-roles",className:"kc-associated-roles-tab",title:l.ZP.createElement(o.TP,null,e("associatedRolesText"))},l.ZP.createElement(v.u,{parentRole:R,refresh:$})),!ee(R.name)&&l.ZP.createElement(o.OK,{eventKey:"attributes",className:"kc-attributes-tab",title:l.ZP.createElement(o.TP,null,e("common:attributes"))},l.ZP.createElement(d.m,{form:t,save:M,reset:()=>b(R)})),!ee(R.name)&&l.ZP.createElement(o.OK,{eventKey:"users-in-role",title:l.ZP.createElement(o.TP,null,e("usersInRole"))},l.ZP.createElement(N,{"data-cy":"users-in-role-tab"})),l.ZP.createElement(o.OK,{eventKey:"permissions",title:l.ZP.createElement(o.TP,null,e("common:permissions"))},l.ZP.createElement(O.y,{id:R.id,type:"roles"}))))):l.ZP.createElement(g,{reset:()=>b(R),form:t,save:M,editMode:!1}):l.ZP.createElement(p.g,null)}}}]);