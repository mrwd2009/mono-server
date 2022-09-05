"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2177],{2177:(e,t,a)=>{a.r(t),a.d(t,{default:()=>M});var o=a(5863),n=a(2954),r=a(3802),p=a(1576),c=a(710),l=a(1677),i=a(8798),m=a(9766),d=a(4326),s=a(386),u=a(9280),f=a(8336),P=a(4839),y=a(764),E=a(8007),w=a(7092),g=a(5954),Z=a(1786);function M(){const{t:e}=(0,r.$G)("client-scopes"),{adminClient:t}=(0,i.K3)(),{addAlert:a,addError:M}=(0,d.Z7)(),{id:h,mapperId:I,type:b}=(0,n.UO)(),v=(0,p.cI)(),{register:k,setValue:F,errors:S,handleSubmit:x}=v,[T,C]=(0,o.eJ)(),[K,L]=(0,o.eJ)(),$=(0,n.k6)(),{realm:D}=(0,y.PL)(),B=(0,u.tN)(),N=!!I.match(/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/),O=!!(0,n.$B)(E.S.path),U=()=>O?(0,w.w)({realm:D,id:h,type:b,tab:"mappers"}):`/${D}/clients/${h}/mappers`;(0,i.ib)((async()=>{let a;if(N){if(a=O?await t.clientScopes.findProtocolMapper({id:h,mapperId:I}):await t.clients.findProtocolMapperById({id:h,mapperId:I}),!a)throw new Error(e("common:notFound"));const o=B.protocolMapperTypes[a.protocol].find((e=>e.id===a.protocolMapper));return{config:{protocol:a.protocol,protocolMapper:a.protocolMapper},mapping:o,data:a}}{const a=b?await t.clientScopes.findOne({id:h}):await t.clients.findOne({id:h});if(!a)throw new Error(e("common:notFound"));const o=B.protocolMapperTypes[a.protocol].find((e=>e.id===I));if(!o)throw new Error(e("common:notFound"));return{mapping:o,config:{protocol:a.protocol,protocolMapper:I}}}}),(({config:e,mapping:t,data:a})=>{L(e),C(t),a&&(0,f.Fz)(a,F)}),[]);const[z,A]=(0,m.W)({titleKey:"common:deleteMappingTitle",messageKey:"common:deleteMappingConfirm",continueButtonLabel:"common:delete",continueButtonVariant:c.Wu.danger,onConfirm:async()=>{try{O?await t.clientScopes.delProtocolMapper({id:h,mapperId:I}):await t.clients.delProtocolMapper({id:h,mapperId:I}),a(e("common:mappingDeletedSuccess"),c.Ux.success),$.push(U())}catch(e){M("common:mappingDeletedError",e)}}});return o.ZP.createElement(o.ZP.Fragment,null,o.ZP.createElement(A,null),o.ZP.createElement(l.t,{titleKey:N?T?.name:e("common:addMapper"),subKey:N?I:"client-scopes:addMapperExplain",dropdownItems:N?[o.ZP.createElement(c.hP,{key:"delete",value:"delete",onClick:z},e("common:delete"))]:void 0}),o.ZP.createElement(c.NP,{variant:"light"},o.ZP.createElement(P.N,{isHorizontal:!0,onSubmit:x((async o=>{const n=N?"Updated":"Created";try{const r={...K,...(0,f.a)(o)};N?O?await t.clientScopes.updateProtocolMapper({id:h,mapperId:I},{id:I,...r}):await t.clients.updateProtocolMapper({id:h,mapperId:I},{id:I,...r}):O?await t.clientScopes.addProtocolMapper({id:h},r):await t.clients.addProtocolMapper({id:h},r),a(e(`common:mapping${n}Success`),c.Ux.success)}catch(e){M(`common:mapping${n}Error`,e)}})),role:"manage-clients",className:"keycloak__client-scope-mapping-details__form"},o.ZP.createElement(c.cw,{label:e("common:mapperType"),fieldId:"mapperType"},o.ZP.createElement(Z.F,{type:"text",id:"mapperType",name:"mapperType",isReadOnly:!0,value:T?.name})),o.ZP.createElement(c.cw,{label:e("common:name"),labelIcon:o.ZP.createElement(s.B,{helpText:"client-scopes-help:mapperName",fieldLabelId:"name"}),fieldId:"name",isRequired:!0,validated:S.name?c.LD.error:c.LD.default,helperTextInvalid:e("common:required")},o.ZP.createElement(Z.F,{ref:k({required:!0}),type:"text",id:"name",name:"name",isReadOnly:N,validated:S.name?c.LD.error:c.LD.default})),o.ZP.createElement(p.RV,{...v},o.ZP.createElement(g.K,{properties:T?.properties||[]})),o.ZP.createElement(c.WK,null,o.ZP.createElement(c.zx,{variant:"primary",type:"submit"},e("common:save")),o.ZP.createElement(c.zx,{variant:"link",component:e=>o.ZP.createElement(n.rU,{...e,to:U()})},e("common:cancel"))))))}}}]);