"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5260],{5832:(e,a,r)=>{r.r(a),r.d(a,{default:()=>y});var t=r(5863),n=r(2954),o=r(3802),l=r(1576),i=r(710),s=r(386),c=r(4839),d=r(1786),m=r(248),u=r(8798),p=r(764),f=r(4326),v=r(5436),E=r(3377);function y(){const{t:e}=(0,o.$G)("user-federation"),{id:a,providerId:r}=(0,n.UO)(),y=(0,n.k6)(),P=(0,l.cI)({mode:"onChange"}),{register:Z,errors:h,reset:k,handleSubmit:b,formState:{isDirty:w}}=P,{adminClient:I}=(0,u.K3)(),{addAlert:S,addError:g}=(0,f.Z7)(),{realm:N}=(0,p.PL)(),[x,D]=(0,t.eJ)("");(0,u.ib)((async()=>{if(a)return await I.components.findOne({id:a})}),(r=>{if(r)k({...r});else if(a)throw new Error(e("common:notFound"))}),[]),(0,u.ib)((()=>I.realms.findOne({realm:N})),(e=>D(e?.id)),[]);const C=async t=>{const n={...t,providerId:r,providerType:"org.keycloak.storage.UserStorageProvider",parentId:x};try{a?await I.components.update({id:a},n):(await I.components.create(n),y.push((0,m.d)({realm:N}))),k({...t}),S(e(a?"saveSuccess":"createSuccess"),i.Ux.success)}catch(e){g("user-federation:"+(a?"saveError":"createError"),e)}};return t.ZP.createElement(l.RV,{...P},t.ZP.createElement(E.S,{provider:r,save:()=>b(C)()}),t.ZP.createElement(i.NP,{variant:"light"},t.ZP.createElement(c.N,{role:"manage-realm",isHorizontal:!0,className:"keycloak__user-federation__custom-form",onSubmit:b(C)},t.ZP.createElement(i.cw,{label:e("consoleDisplayName"),labelIcon:t.ZP.createElement(s.B,{helpText:"user-federation-help:consoleDisplayNameHelp",fieldLabelId:"user-federation:consoleDisplayName"}),helperTextInvalid:e("validateName"),validated:h.name?"error":"default",fieldId:"kc-console-display-name",isRequired:!0},t.ZP.createElement(d.F,{isRequired:!0,type:"text",id:"kc-console-display-name",name:"name",ref:Z({required:!0}),"data-testid":"console-name",validated:h.name?"error":"default"})),t.ZP.createElement(v.S,{form:P,unWrap:!0}),t.ZP.createElement(i.WK,null,t.ZP.createElement(i.zx,{isDisabled:!w,variant:"primary",type:"submit","data-testid":"custom-save"},e("common:save")),t.ZP.createElement(i.zx,{variant:"link",component:e=>t.ZP.createElement(n.rU,{...e,to:(0,m.d)({realm:N})}),"data-testid":"custom-cancel"},e("common:cancel"))))))}}}]);