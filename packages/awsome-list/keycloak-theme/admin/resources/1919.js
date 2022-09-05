"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1919],{1919:(e,l,t)=>{t.r(l),t.d(l,{default:()=>w});var c=t(5863),i=t(2954),a=t(3802),n=t(710),s=t(3172),o=t(2820),r=t(1677),d=t(8798),p=t(7482),m=t(6454),u=t(611),P=t(4326),f=t(4839),E=t(386),S=t(2931),Z=t(4836),g=t(8670);const h=({client:e})=>{const{t:l}=(0,a.$G)("clients"),{adminClient:t}=(0,d.K3)(),{addAlert:i,addError:s}=(0,P.Z7)(),[o,r]=(0,c.eJ)(e),[p,m]=(0,Z.Z)(),{hasAccess:u}=(0,g.md)(),h=u("manage-clients")||o.access?.manage;return c.ZP.createElement(n.NP,null,c.ZP.createElement(f.N,{role:"manage-clients",fineGrainedAccess:o.access?.manage,isHorizontal:!0},c.ZP.createElement(n.cw,{hasNoPaddingTop:!0,label:l("fullScopeAllowed"),labelIcon:c.ZP.createElement(E.B,{helpText:"clients-help:fullScopeAllowed",fieldLabelId:"clients:fullScopeAllowed"}),fieldId:"fullScopeAllowed"},c.ZP.createElement(n.rs,{id:"fullScopeAllowed",label:l("common:on"),labelOff:l("common:off"),isChecked:o.fullScopeAllowed,onChange:async()=>{const e={...o,fullScopeAllowed:!o.fullScopeAllowed};try{await t.clients.update({id:o.id},e),i(l("clientScopeSuccess"),n.Ux.success),r(e)}catch(e){s("clients:clientScopeError",e)}}}))),!o.fullScopeAllowed&&c.ZP.createElement(c.ZP.Fragment,null,c.ZP.createElement(n.iz,null),c.ZP.createElement(S.Bo,{name:o.clientId,id:o.id,type:"clients",loader:async()=>{const[e,l,c]=await Promise.all([t.clients.find(),t.clients.listRealmScopeMappings({id:o.id}).then((e=>e.map((e=>({role:e}))))),t.clients.listCompositeRealmScopeMappings({id:o.id}).then((e=>e.map((e=>({role:e})))))]),i=(await Promise.all(e.map((async({id:e})=>{const[l,c]=await Promise.all([t.clients.listClientScopeMappings({id:o.id,client:e}).then((e=>e.map((e=>({role:e,client:o}))))),t.clients.listCompositeClientScopeMappings({id:o.id,client:e}).then((e=>e.map((e=>({role:e,client:o})))))]);return(0,S.cc)(l,c,p)})))).flat();return[...(0,S.cc)(l,c,p),...i]},save:async e=>{try{const c=e.filter((e=>void 0===e.client)).map((e=>e.role)).flat();await Promise.all([t.clients.addRealmScopeMappings({id:o.id},c),...e.filter((e=>void 0!==e.client)).map((e=>t.clients.addClientScopeMappings({id:o.id,client:e.client.id},[e.role])))]),i(l("clientScopeSuccess"),n.Ux.success)}catch(e){s("clients:clientScopeError",e)}},onHideRolesToggle:m,isManager:h})))};function w(){const{t:e}=(0,a.$G)("clients"),l=(0,i.k6)(),{realm:t,clientId:f}=(0,i.UO)(),{adminClient:E}=(0,d.K3)(),{addAlert:S,addError:Z}=(0,P.Z7)(),[g,w]=(0,c.eJ)();(0,d.ib)((()=>E.clients.findOne({id:f})),w,[]);const y=e=>(0,p.w)({to:(0,m.E)({realm:t,clientId:f,tab:e}),history:l});return g?c.ZP.createElement(c.ZP.Fragment,null,c.ZP.createElement(r.t,{titleKey:g.clientId,subKey:"clients-help:dedicatedScopeExplain",divider:!1}),c.ZP.createElement(n.NP,{variant:"light",className:"pf-u-p-0"},c.ZP.createElement(p.U,{isBox:!0,mountOnEnter:!0,defaultLocation:(0,m.E)({realm:t,clientId:f,tab:"mappers"})},c.ZP.createElement(n.OK,{title:c.ZP.createElement(n.TP,null,e("mappers")),"data-testid":"mappersTab",...y("mappers")},c.ZP.createElement(o.t,{model:g,onAdd:async c=>{if(Array.isArray(c))try{await E.clients.addMultipleProtocolMappers({id:g.id},c),w(await E.clients.findOne({id:g.id})),S(e("common:mappingCreatedSuccess"),n.Ux.success)}catch(e){Z("common:mappingCreatedError",e)}else{const e=c;l.push((0,u.J)({realm:t,id:g.id,mapperId:e.id}))}},onDelete:async l=>{try{await E.clients.delProtocolMapper({id:g.id,mapperId:l.id}),w({...g,protocolMappers:g.protocolMappers?.filter((e=>e.id!==l.id))}),S(e("common:mappingDeletedSuccess"),n.Ux.success)}catch(e){Z("common:mappingDeletedError",e)}return!0},detailLink:e=>(0,u.J)({realm:t,id:g.id,mapperId:e})})),c.ZP.createElement(n.OK,{title:c.ZP.createElement(n.TP,null,e("scope")),"data-testid":"scopeTab",...y("scope")},c.ZP.createElement(h,{client:g}))))):c.ZP.createElement(s.g,null)}}}]);