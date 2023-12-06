"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5010],{5010:(e,t,l)=>{l.r(t),l.d(t,{default:()=>y});var a=l(5863),r=l(710),i=l(3802),n=l(1576),c=l(4839),o=l(1677),s=l(2954),m=l(4326),d=l(8798),u=l(386),P=l(1786),x=l(4036),p=l(7973),f=l(9766),E=l(9136),Z=l(9280),g=l(9761),b=l(4129),k=l(8765);const C={name:"",description:"",executors:[]};function y(){const{t:e}=(0,i.$G)("realm-settings"),t=(0,s.k6)(),{handleSubmit:l,setValue:y,register:h,formState:{isDirty:N,errors:T}}=(0,n.cI)({defaultValues:C,mode:"onChange"}),{addAlert:v,addError:w}=(0,m.Z7)(),{adminClient:z}=(0,d.K3)(),[L,I]=(0,a.eJ)([]),[U,B]=(0,a.eJ)([]),{realm:D,profileName:F}=(0,s.UO)(),H=(0,Z.tN)(),K=(0,a.Ye)((()=>H.componentTypes?.["org.keycloak.services.clientpolicy.executor.ClientPolicyExecutorProvider"]),[]),[O,R]=(0,a.eJ)(),S=!!F,[q,G]=(0,a.eJ)(0);(0,d.ib)((()=>z.clientPolicies.listProfiles({includeGlobalProfiles:!0})),(e=>{I(e.globalProfiles??[]),B(e.profiles??[])}),[q]);const V=async l=>{const a=S?J(l):W(l);try{await z.clientPolicies.createProfiles({profiles:a,globalProfiles:L}),v(e(S?"realm-settings:updateClientProfileSuccess":"realm-settings:createClientProfileSuccess"),r.Ux.success),t.push((0,g.i)({realm:D,profileName:l.name}))}catch(e){w(S?"realm-settings:updateClientProfileError":"realm-settings:createClientProfileError",e)}},J=e=>U.map((t=>t.name!==F?t:{...t,name:e.name,description:e.description})),W=e=>U.concat({...e,executors:[]}),[X,Y]=(0,f.W)({titleKey:e(O?.name?"deleteExecutorProfileConfirmTitle":"deleteClientProfileConfirmTitle"),messageKey:O?.name?e("deleteExecutorProfileConfirm",{executorName:O.name}):e("deleteClientProfileConfirm",{profileName:F}),continueButtonLabel:e("delete"),continueButtonVariant:r.Wu.danger,onConfirm:async()=>{if(O?.name){j.splice(O.idx,1);try{await z.clientPolicies.createProfiles({profiles:U,globalProfiles:L}),v(e("deleteExecutorSuccess"),r.Ux.success),t.push((0,g.i)({realm:D,profileName:F}))}catch(t){w(e("deleteExecutorError"),t)}}else{const l=U.filter((e=>e.name!==F));try{await z.clientPolicies.createProfiles({profiles:l,globalProfiles:L}),v(e("deleteClientSuccess"),r.Ux.success),t.push((0,k.G)({realm:D,tab:"profiles"}))}catch(t){w(e("deleteClientError"),t)}}}}),$=U.find((e=>e.name===F)),j=$?.executors||[],A=L.find((e=>e.name===F)),Q=A?.executors||[];return(0,a.d4)((()=>{y("name",A?.name??$?.name),y("description",A?.description??$?.description)}),[U]),a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(Y,null),a.ZP.createElement(o.t,{titleKey:S?F:e("newClientProfile"),badges:[{id:"global-client-profile-badge",text:A?e("global"):""}],divider:!0,dropdownItems:S&&!A?[a.ZP.createElement(r.hP,{key:"delete",value:"delete",onClick:X,"data-testid":"deleteClientProfileDropdown"},e("deleteClientProfile"))]:void 0}),a.ZP.createElement(r.NP,{variant:"light"},a.ZP.createElement(c.N,{isHorizontal:!0,role:"view-realm",className:"pf-u-mt-lg"},a.ZP.createElement(r.cw,{label:e("newClientProfileName"),fieldId:"kc-name",helperText:e("createClientProfileNameHelperText"),isRequired:!0,helperTextInvalid:e("common:required"),validated:T.name?r.LD.error:r.LD.default},a.ZP.createElement(P.F,{ref:h({required:!0}),name:"name",type:"text",id:"name","aria-label":e("name"),"data-testid":"client-profile-name",isReadOnly:!!A})),a.ZP.createElement(r.cw,{label:e("common:description"),fieldId:"kc-description"},a.ZP.createElement(x.Q,{ref:h(),name:"description",type:"text",id:"description","aria-label":e("description"),"data-testid":"client-profile-description",isReadOnly:!!A})),a.ZP.createElement(r.WK,null,!A&&a.ZP.createElement(r.zx,{variant:"primary",onClick:()=>l(V)(),"data-testid":"saveCreateProfile",isDisabled:!N},e("common:save")),S&&!A&&a.ZP.createElement(r.zx,{id:"reloadProfile",variant:"link","data-testid":"reloadProfile",isDisabled:!N,onClick:()=>G((new Date).getTime())},e("realm-settings:reload")),!S&&!A&&a.ZP.createElement(r.zx,{id:"cancelCreateProfile",component:e=>a.ZP.createElement(s.rU,{...e,to:(0,k.G)({realm:D,tab:"profiles"})}),"data-testid":"cancelCreateProfile"},e("common:cancel"))),S&&a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(r.kC,null,a.ZP.createElement(r.B5,null,a.ZP.createElement(r.xv,{className:"kc-executors",component:r.qO.h1},e("executors"),a.ZP.createElement(u.B,{helpText:"realm-settings:executorsHelpText",fieldLabelId:"realm-settings:executors"}))),$&&a.ZP.createElement(r.B5,{align:{default:"alignRight"}},a.ZP.createElement(r.zx,{id:"addExecutor",component:e=>a.ZP.createElement(s.rU,{...e,to:(0,E.w)({realm:D,profileName:F})}),variant:"link",className:"kc-addExecutor","data-testid":"addExecutor",icon:a.ZP.createElement(p.wl,null)},e("realm-settings:addExecutor")))),j.length>0&&a.ZP.createElement(r.FR,{"aria-label":e("executors"),isCompact:!0},j.map(((e,t)=>a.ZP.createElement(r.LC,{"aria-labelledby":"executors-list-item",key:e.executor,id:e.executor},a.ZP.createElement(r.Vi,{"data-testid":"executors-list-row"},a.ZP.createElement(r.p9,{dataListCells:[a.ZP.createElement(r.KX,{key:"executor","data-testid":"executor-type"},e.configuration?a.ZP.createElement(r.zx,{component:t=>a.ZP.createElement(s.rU,{...t,to:(0,b.h)({realm:D,profileName:F,executorName:e.executor})}),variant:"link","data-testid":"editExecutor"},e.executor):a.ZP.createElement("span",{className:"kc-unclickable-executor"},e.executor),K?.filter((t=>t.id===e.executor)).map((e=>a.ZP.createElement(a.HY,{key:e.id},a.ZP.createElement(u.B,{key:e.id,helpText:e.helpText,fieldLabelId:"realm-settings:executorTypeTextHelpText"}),a.ZP.createElement(r.zx,{variant:"link",isInline:!0,icon:a.ZP.createElement(p.XH,{key:`executorType-trash-icon-${e.id}`,className:"kc-executor-trash-icon","data-testid":"deleteExecutor"}),onClick:()=>{X(),R({idx:t,name:e.id})}})))))]})))))),Q.length>0&&a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(r.FR,{"aria-label":e("executors"),isCompact:!0},Q.map((e=>a.ZP.createElement(r.LC,{"aria-labelledby":"global-executors-list-item",key:e.executor,id:e.executor},a.ZP.createElement(r.Vi,{"data-testid":"global-executors-list-row"},a.ZP.createElement(r.p9,{dataListCells:[a.ZP.createElement(r.KX,{key:"executor","data-testid":"global-executor-type"},0!==Object.keys(e.configuration).length?a.ZP.createElement(r.zx,{component:t=>a.ZP.createElement(s.rU,{...t,to:(0,b.h)({realm:D,profileName:F,executorName:e.executor})}),variant:"link","data-testid":"editExecutor"},e.executor):a.ZP.createElement("span",{className:"kc-unclickable-executor"},e.executor),K?.filter((t=>t.id===e.executor)).map((e=>a.ZP.createElement(u.B,{key:e.id,helpText:e.helpText,fieldLabelId:"realm-settings:executorTypeTextHelpText"}))))]})))))),a.ZP.createElement(r.zx,{id:"backToClientPolicies",component:e=>a.ZP.createElement(s.rU,{...e,to:(0,k.G)({realm:D,tab:"profiles"})}),variant:"primary",className:"kc-backToPolicies","data-testid":"backToClientPolicies"},e("realm-settings:back"))),0===j.length&&0===Q.length&&a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(r.iz,null),a.ZP.createElement(r.xv,{className:"kc-emptyExecutors",component:r.qO.h6},e("realm-settings:emptyExecutors")))))))}}}]);