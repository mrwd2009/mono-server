"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4762],{4762:(e,t,r)=>{r.r(t),r.d(t,{default:()=>P});var l=r(5863),a=r(710),c=r(3802),o=r(4839),n=r(1677),i=r(4326),s=r(9280),u=r(1576),m=r(386),d=r(2954),p=r(8798),x=r(9761),f=r(5954);const g={config:{},executor:""};function P(){const{t:e}=(0,c.$G)("realm-settings"),t=(0,d.k6)(),{realm:r,profileName:P}=(0,d.UO)(),{executorName:E}=(0,d.UO)(),{addAlert:Z,addError:T}=(0,i.Z7)(),[h,y]=(0,l.eJ)(!1),b=(0,s.tN)(),{adminClient:k}=(0,p.K3)(),v=b.componentTypes?.["org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProvider"],[N,I]=(0,l.eJ)([]),[S,V]=(0,l.eJ)([]),[C,J]=(0,l.eJ)([]),[U,w]=(0,l.eJ)([]),z=(0,u.cI)({defaultValues:g}),{control:B,reset:H,handleSubmit:K}=z,O=!!E,G=e=>{const t=e.find((e=>e.name===P))?.executors?.find((e=>e.executor===E));t&&H({config:t.configuration})};(0,p.ib)((()=>k.clientPolicies.listProfiles({includeGlobalProfiles:!0})),(e=>{J(e.globalProfiles),w(e.profiles),G(e.profiles),G(e.globalProfiles)}),[]);const L=async()=>{const l=z.getValues(),c=U.map((e=>{if(e.name!==P)return e;const t=e.executors.find((e=>e.executor===E)),r=(e.executors??[]).concat({executor:l.executor,configuration:l.config});return O&&(t.configuration={...t.configuration,...l.config}),O?e:{...e,executors:r}}));try{await k.clientPolicies.createProfiles({profiles:c,globalProfiles:C}),Z(e(O?"realm-settings:updateExecutorSuccess":"realm-settings:addExecutorSuccess"),a.Ux.success),t.push((0,x.i)({realm:r,profileName:P}))}catch(e){T(O?"realm-settings:updateExecutorError":"realm-settings:addExecutorError",e)}},R=C.find((e=>e.name===P)),$=v?.find((e=>e.id===E)),A=$?.properties.map((e=>{const t=O?e.defaultValue:"";return{...e,defaultValue:t}}));return l.ZP.createElement(l.ZP.Fragment,null,l.ZP.createElement(n.t,{titleKey:O?E:e("addExecutor"),divider:!0}),l.ZP.createElement(a.NP,{variant:"light"},l.ZP.createElement(o.N,{isHorizontal:!0,role:"manage-realm",className:"pf-u-mt-lg",isReadOnly:!!R},l.ZP.createElement(a.cw,{label:e("executorType"),fieldId:"kc-executorType",labelIcon:N.length>0&&""!==N[0].helpText?l.ZP.createElement(m.B,{helpText:N[0].helpText,fieldLabelId:"realm-settings:executorTypeHelpText"}):O?l.ZP.createElement(m.B,{helpText:$?.helpText,fieldLabelId:"realm-settings:executorTypeHelpText"}):void 0},l.ZP.createElement(u.Qr,{name:"executor",defaultValue:"",control:B,render:({value:t})=>l.ZP.createElement(a.Ph,{toggleId:"kc-executor",placeholderText:"Select an executor",onToggle:e=>y(e),onSelect:(e,t)=>{H({...g,executor:t.toString()});const r=v?.filter((e=>e.id===t));I(r??[]),V(r?.[0].properties??[]),y(!1)},selections:O?E:t,variant:a.TM.single,"data-testid":"executorType-select","aria-label":e("executorType"),isOpen:h,maxHeight:580,isDisabled:O},v?.map((e=>l.ZP.createElement(a.$m,{selected:e.id===t,key:e.id,value:e.id,description:e.helpText}))))})),l.ZP.createElement(u.RV,{...z},l.ZP.createElement(f.K,{properties:O?A:S})),!R&&l.ZP.createElement(a.WK,null,l.ZP.createElement(a.zx,{variant:"primary",onClick:()=>K(L)(),"data-testid":"addExecutor-saveBtn"},e(O?"common:save":"common:add")),l.ZP.createElement(a.zx,{variant:"link",component:e=>l.ZP.createElement(d.rU,{...e,to:(0,x.i)({realm:r,profileName:P})}),"data-testid":"addExecutor-cancelBtn"},e("common:cancel")))),O&&R&&l.ZP.createElement("div",{className:"kc-backToProfile"},l.ZP.createElement(a.zx,{component:e=>l.ZP.createElement(d.rU,{...e,to:(0,x.i)({realm:r,profileName:P})}),variant:"primary"},e("realm-settings:back")))))}}}]);