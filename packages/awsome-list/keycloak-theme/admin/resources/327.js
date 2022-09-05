"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[327],{327:(e,t,r)=>{r.r(t),r.d(t,{default:()=>C});var a=r(710),n=r(7973),l=r(5863),s=r(3802),c=r(2954),i=r(4326),o=r(9766),m=r(1586),u=r(192),d=r(1677),P=r(8798),E=r(764),Z=r(8336),y=r(4467),g=r(6154),p=r(9176),b=r(3172),h=r(860),k=r(5952),f=r(7482),U=r(8670);function C(){const{t:e}=(0,s.$G)("users"),{adminClient:t}=(0,P.K3)(),{addAlert:r,addError:C}=(0,i.Z7)(),{realm:K}=(0,E.PL)(),F=(0,c.k6)(),[v,w]=(0,l.eJ)(),[x,D]=(0,l.eJ)(),[N,_]=(0,l.eJ)(),[A,L]=(0,l.eJ)(!1),[O,S]=(0,l.eJ)([]),[T,B]=(0,l.eJ)(0),J=()=>B(T+1),{hasAccess:W}=(0,U.md)(),R=W("manage-users");(0,P.ib)((async()=>{const e={type:"org.keycloak.storage.UserStorageProvider"};try{return await Promise.all([t.components.find(e),t.realms.findOne({realm:K})])}catch{return[[{}],void 0]}}),(([e,t])=>{w(e),_(t)}),[]);const[z,I]=(0,o.W)({titleKey:"users:unlockAllUsers",messageKey:"users:unlockUsersConfirm",continueButtonLabel:"users:unlock",onConfirm:async()=>{try{await t.attackDetection.delAll(),J(),r(e("unlockUsersSuccess"),a.Ux.success)}catch(e){C("users:unlockUsersError",e)}}}),[V,$]=(0,o.W)({titleKey:"users:deleteConfirm",messageKey:e("deleteConfirmDialog",{count:O.length}),continueButtonLabel:"delete",continueButtonVariant:a.Wu.danger,onConfirm:async()=>{try{for(const e of O)await t.users.del({id:e.id});S([]),J(),r(e("userDeletedSuccess"),a.Ux.success)}catch(e){C("users:userDeletedError",e)}}}),M=()=>F.push((0,g.l)({realm:K}));if(!v)return l.ZP.createElement(b.g,null);const G=!(v.length>0),j=l.ZP.createElement(l.ZP.Fragment,null,l.ZP.createElement(a.Eg,null,l.ZP.createElement(a.zx,{"data-testid":"add-user",onClick:M},e("addUser"))),N?.bruteForceProtected?l.ZP.createElement(a.Eg,null,l.ZP.createElement(a.Lt,{toggle:l.ZP.createElement(a.ax,{onToggle:e=>L(e)}),isOpen:A,isPlain:!0,dropdownItems:[l.ZP.createElement(a.hP,{key:"deleteUser",component:"button",isDisabled:0===O.length,onClick:()=>{V(),L(!1)}},e("deleteUser")),l.ZP.createElement(a.hP,{key:"unlock",component:"button",onClick:()=>{z(),L(!1)}},e("unlockAllUsers"))]})):l.ZP.createElement(a.Eg,null,l.ZP.createElement(a.zx,{variant:a.Wu.plain,onClick:V,"data-testid":"delete-user-btn",isDisabled:0===O.length},e("deleteUser")))),q=e=>(0,f.w)({to:(0,k.b)({realm:K,tab:e}),history:F});return l.ZP.createElement(l.ZP.Fragment,null,l.ZP.createElement($,null),l.ZP.createElement(I,null),l.ZP.createElement(d.t,{titleKey:"users:title",subKey:"users:usersExplain",helpUrl:p.Z.usersUrl,divider:!1}),l.ZP.createElement(a.NP,{"data-testid":"users-page",variant:"light",className:"pf-u-p-0"},l.ZP.createElement(f.U,{"data-testid":"user-tabs",defaultLocation:(0,k.b)({realm:K,tab:"list"}),isBox:!0,mountOnEnter:!0},l.ZP.createElement(a.OK,{id:"list","data-testid":"listTab",title:l.ZP.createElement(a.TP,null,e("userList")),...q("list")},l.ZP.createElement(u.B,{key:T,loader:async(e,r,a)=>{const n={first:e,max:r},l=a||x||"";if(l&&(n.search=l),!G&&!l)return[];try{const e=await t.users.find({briefRepresentation:!0,...n});if(N?.bruteForceProtected){const r=await Promise.all(e.map((e=>t.attackDetection.findOne({id:e.id}))));for(let t=0;t<e.length;t++)e[t].brute=r[t]}return e}catch(e){return C(v?.length?"users:noUsersFoundErrorStorage":"users:noUsersFoundError",e),[]}},isPaginated:!0,ariaLabelKey:"users:title",searchPlaceholderKey:"users:searchForUser",canSelectAll:!0,onSelect:e=>S([...e]),emptyState:G?l.ZP.createElement(m.M,{message:e("noUsersFound"),instructions:e("emptyInstructions"),primaryActionText:e("createNewUser"),onPrimaryAction:M}):l.ZP.createElement(l.ZP.Fragment,null,l.ZP.createElement(a.o8,null,l.ZP.createElement(a.c_,null,l.ZP.createElement(a.Eg,null,l.ZP.createElement(a.BZ,null,l.ZP.createElement(a.oi,{name:"search-input",type:"search","aria-label":e("search"),placeholder:e("users:searchForUser"),onChange:e=>{D(e)},onKeyDown:e=>{"Enter"===e.key&&J()}}),l.ZP.createElement(a.zx,{variant:a.Wu.control,"aria-label":e("common:search"),onClick:J},l.ZP.createElement(n.W1,null)))),j)),l.ZP.createElement(a.ub,{"data-testid":"empty-state",variant:"large"},l.ZP.createElement(a.wu,{className:"kc-search-users-text"},l.ZP.createElement(a.xv,null,e("searchForUserDescription"))))),toolbarItem:R?j:void 0,actionResolver:t=>{const r=t.data;return r.access?.manage?[{title:e("common:delete"),onClick:()=>{S([r]),V()}}]:[]},columns:[{name:"username",displayKey:"users:username",cellRenderer:e=>l.ZP.createElement(c.rU,{key:e.username,to:(0,y.Z)({realm:K,id:e.id,tab:"settings"})},e.username)},{name:"email",displayKey:"users:email",cellRenderer:t=>l.ZP.createElement(l.ZP.Fragment,null,!t.emailVerified&&l.ZP.createElement(a.u,{key:`email-verified-${t.id}`,content:l.ZP.createElement(l.ZP.Fragment,null,e("notVerified"))},l.ZP.createElement(n.$O,{className:"keycloak__user-section__email-verified"}))," ",(0,Z.CU)()(t.email))},{name:"lastName",displayKey:"users:lastName",cellFormatters:[(0,Z.CU)()]},{name:"firstName",displayKey:"users:firstName",cellFormatters:[(0,Z.CU)()]},{name:"status",displayKey:"users:status",cellRenderer:t=>l.ZP.createElement(l.ZP.Fragment,null,!t.enabled&&l.ZP.createElement(a.__,{key:t.id,color:"red",icon:l.ZP.createElement(n.uM,null)},e("disabled")),t.brute?.disabled&&l.ZP.createElement(a.__,{key:t.id,color:"orange",icon:l.ZP.createElement(n.T6,null)},e("temporaryDisabled")),t.enabled&&!t.brute?.disabled&&"—")}]})),l.ZP.createElement(a.OK,{id:"permissions","data-testid":"permissionsTab",title:l.ZP.createElement(a.TP,null,e("common:permissions")),...q("permissions")},l.ZP.createElement(h.y,{type:"users"})))))}}}]);