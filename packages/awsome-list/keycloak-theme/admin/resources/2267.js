"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2267],{2267:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var l=n(710),a=n(5863),c=n(1576),r=n(3802),i=n(2954),m=n(4326),s=n(4839),o=n(2190),u=n(1677),p=n(1786),d=n(8798),E=n(764),P=n(8336),Z=n(9969),y=n(9985),h=n(3413),b=n(1832);function f(){const{t:e}=(0,r.$G)("clients"),t=(0,i.k6)(),{adminClient:n}=(0,d.K3)(),{realm:f}=(0,E.PL)(),g=(0,c.cI)({shouldUnregister:!1}),{register:k,handleSubmit:C,setValue:I}=g,[v,x]=(0,a.eJ)({}),{addAlert:K,addError:w}=(0,m.Z7)();return a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(u.t,{titleKey:"clients:importClient",subKey:"clients:clientsExplain"}),a.ZP.createElement(l.NP,{variant:"light"},a.ZP.createElement(s.N,{isHorizontal:!0,onSubmit:C((async a=>{try{const c=await n.clients.create({...v,...(0,P.a)(a)});K(e("clientImportSuccess"),l.Ux.success),t.push((0,h.O)({realm:f,clientId:c.id,tab:"settings"}))}catch(e){w("clients:clientImportError",e)}})),role:"manage-clients"},a.ZP.createElement(c.RV,{...g},a.ZP.createElement(o.K,{id:"realm-file",onChange:e=>{const t={protocol:"",clientId:"",name:"",description:""};(0,P.Fz)(e||t,I),x(e||t)}}),a.ZP.createElement(y._,{hasConfigureAccess:!0}),a.ZP.createElement(l.cw,{label:e("common:type"),fieldId:"kc-type"},a.ZP.createElement(p.F,{type:"text",id:"kc-type",name:"protocol",isReadOnly:!0,ref:k()})),a.ZP.createElement(Z.J,{unWrap:!0}),a.ZP.createElement(l.WK,null,a.ZP.createElement(l.zx,{variant:"primary",type:"submit"},e("common:save")),a.ZP.createElement(l.zx,{variant:"link",component:e=>a.ZP.createElement(i.rU,{...e,to:(0,b.X)({realm:f})})},e("common:cancel")))))))}}}]);