"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8403],{8403:(e,t,n)=>{n.r(t),n.d(t,{default:()=>k});var a=n(5863),l=n(3802),i=n(1576),c=n(710),r=n(4839),o=n(1677),s=n(386),m=n(3954),u=n(2954),d=n(764),p=n(8798),P=n(4326);const E=({token:e,toggleDialog:t})=>{const{t:n}=(0,l.$G)("clients");return a.ZP.createElement(c.u_,{title:n("initialAccessTokenDetails"),isOpen:!0,onClose:t,variant:c.vE.medium},a.ZP.createElement(c.bZ,{title:n("copyInitialAccessToken"),isInline:!0,variant:c.Ux.warning}),a.ZP.createElement(c.l0,{className:"pf-u-mt-md"},a.ZP.createElement(c.cw,{label:n("initialAccessToken"),fieldId:"initialAccessToken"},a.ZP.createElement(c.M5,{id:"initialAccessToken",isReadOnly:!0},e))))};var Z=n(1832);function k(){const{t:e}=(0,l.$G)("clients"),{handleSubmit:t,control:n,formState:{isValid:k,errors:v}}=(0,i.cI)({mode:"onChange"}),{adminClient:b}=(0,p.K3)(),{realm:h}=(0,d.PL)(),{addAlert:x,addError:f}=(0,P.Z7)(),g=(0,u.k6)(),[I,C]=(0,a.eJ)("");return a.ZP.createElement(a.ZP.Fragment,null,I&&a.ZP.createElement(E,{token:I,toggleDialog:()=>{C(""),x(e("tokenSaveSuccess"),c.Ux.success),g.push((0,Z.X)({realm:h,tab:"initial-access-token"}))}}),a.ZP.createElement(o.t,{titleKey:"clients:createToken",subKey:"clients-help:createToken"}),a.ZP.createElement(c.NP,{variant:"light"},a.ZP.createElement(r.N,{isHorizontal:!0,role:"create-client",onSubmit:t((async e=>{try{const t=await b.realms.createClientsInitialAccess({realm:h},e);C(t.token)}catch(e){f("clients:tokenSaveError",e)}}))},a.ZP.createElement(c.cw,{label:e("expiration"),fieldId:"expiration",labelIcon:a.ZP.createElement(s.B,{helpText:"clients-help:expiration",fieldLabelId:"clients:expiration"}),helperTextInvalid:e("expirationValueNotValid"),validated:v.expiration?"error":"default"},a.ZP.createElement(i.Qr,{name:"expiration",defaultValue:86400,control:n,rules:{min:1},render:({onChange:e,value:t})=>a.ZP.createElement(m.uM,{"data-testid":"expiration",value:t,onChange:e,min:1,validated:v.expiration?"error":"default"})})),a.ZP.createElement(c.cw,{label:e("count"),fieldId:"count",labelIcon:a.ZP.createElement(s.B,{helpText:"clients-help:count",fieldLabelId:"clients:count"})},a.ZP.createElement(i.Qr,{name:"count",defaultValue:1,control:n,render:({onChange:t,value:n})=>a.ZP.createElement(c.Y2,{"data-testid":"count",inputName:"count",inputAriaLabel:e("count"),min:1,value:n,onPlus:()=>t(n+1),onMinus:()=>t(n-1),onChange:e=>{const n=Number(e.target.value);t(n<1?1:n)}})})),a.ZP.createElement(c.WK,null,a.ZP.createElement(c.zx,{variant:"primary",type:"submit","data-testid":"save",isDisabled:!k},e("common:save")),a.ZP.createElement(c.zx,{"data-testid":"cancel",variant:"link",component:e=>a.ZP.createElement(u.rU,{...e,to:(0,Z.X)({realm:h,tab:"initial-access-token"})})},e("common:cancel"))))))}}}]);