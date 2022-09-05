"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1785],{1785:(e,a,t)=>{t.r(a),t.d(a,{default:()=>A});var l=t(5863),n=t(710),r=t(1576),i=t(3802),s=t(2954),o=t(3328),m=(t(5623),t(386)),c=t(4839),d=t(1786),u=t(8798),p=t(390);const h=[{label:"requiredForLabel.both",value:["admin","user"]},{label:"requiredForLabel.users",value:["user"]},{label:"requiredForLabel.admins",value:["admin"]}],g=()=>{const{t:e}=(0,i.$G)("realm-settings"),{adminClient:a}=(0,u.K3)(),t=(0,r.Gc)(),[o,g]=(0,l.eJ)(),[b,f]=(0,l.eJ)(),[P,v]=(0,l.eJ)(!1),[E,Z]=(0,l.eJ)(!1),[k,y]=(0,l.eJ)(!1),{attributeName:C}=(0,s.UO)(),q=!!C,T=(0,r.qo)({control:t.control,name:"selector.scopes",defaultValue:[]}),V=(0,r.qo)({control:t.control,name:"required.scopes",defaultValue:[]}),w=(0,r.qo)({control:t.control,name:"isRequired",defaultValue:!1});return(0,u.ib)((()=>a.clientScopes.find()),g,[]),(0,u.ib)((()=>a.users.getProfile()),f,[]),l.ZP.createElement(c.N,{role:"manage-realm",isHorizontal:!0},l.ZP.createElement(n.cw,{label:e("attributeName"),labelIcon:l.ZP.createElement(m.B,{helpText:"realm-settings-help:attributeNameHelp",fieldLabelId:"realm-settings:attributeName"}),fieldId:"kc-attribute-name",isRequired:!0,validated:t.errors.name?"error":"default",helperTextInvalid:t.errors.name?.message},l.ZP.createElement(d.F,{isRequired:!0,type:"text",id:"kc-attribute-name",name:"name",defaultValue:"",ref:t.register({required:{value:!0,message:e("validateName")}}),"data-testid":"attribute-name",isDisabled:q,validated:t.errors.name?"error":"default"})),l.ZP.createElement(n.cw,{label:e("attributeDisplayName"),labelIcon:l.ZP.createElement(m.B,{helpText:"realm-settings-help:attributeDisplayNameHelp",fieldLabelId:"realm-settings:attributeDisplayName"}),fieldId:"kc-attribute-display-name"},l.ZP.createElement(d.F,{type:"text",id:"kc-attribute-display-name",name:"displayName",defaultValue:"",ref:t.register,"data-testid":"attribute-display-name"})),l.ZP.createElement(n.cw,{label:e("attributeGroup"),labelIcon:l.ZP.createElement(m.B,{helpText:"realm-setting-help:attributeGroupHelp",fieldLabelId:"realm-setting:attributeGroup"}),fieldId:"kc-attribute-group"},l.ZP.createElement(r.Qr,{name:"group",defaultValue:"",control:t.control,render:({onChange:a,value:t})=>l.ZP.createElement(n.Ph,{toggleId:"kc-attributeGroup",onToggle:()=>y(!k),isOpen:k,onSelect:(e,t)=>{a(t.toString()),y(!1)},selections:[t||e("common:choose")],variant:n.TM.single},b?.groups?.map((e=>l.ZP.createElement(n.$m,{key:e.name,value:e.name},e.name))))})),l.ZP.createElement(n.iz,null),l.ZP.createElement(n.cw,{label:e("enabledWhen"),fieldId:"enabledWhen",hasNoPaddingTop:!0},l.ZP.createElement(n.Y8,{id:"always","data-testid":"always",isChecked:T.length===o?.length,name:"enabledWhen",label:e("always"),onChange:e=>{e?t.setValue("selector.scopes",o?.map((e=>e.name))):t.setValue("selector.scopes",[])},className:"pf-u-mb-md"}),l.ZP.createElement(n.Y8,{id:"scopesAsRequested","data-testid":"scopesAsRequested",isChecked:T.length!==o?.length,name:"enabledWhen",label:e("scopesAsRequested"),onChange:e=>{e?t.setValue("selector.scopes",[]):t.setValue("selector.scopes",o?.map((e=>e.name)))},className:"pf-u-mb-md"})),l.ZP.createElement(n.cw,{fieldId:"kc-scope-enabled-when"},l.ZP.createElement(r.Qr,{name:"selector.scopes",control:t.control,defaultValue:[],render:({onChange:a,value:t})=>l.ZP.createElement(n.Ph,{name:"scopes","data-testid":"enabled-when-scope-field",variant:n.TM.typeaheadMulti,typeAheadAriaLabel:"Select",chipGroupProps:{numChips:3,expandedText:e("common:hide"),collapsedText:e("common:showRemaining")},onToggle:e=>v(e),selections:t,onSelect:(e,l)=>{const n=l.toString();let r=[""];r=t?t.includes(n)?t.filter((e=>e!==n)):[...t,n]:[n],a(r)},onClear:e=>{e.stopPropagation(),a([])},isOpen:P,isDisabled:T.length===o?.length,"aria-labelledby":"scope"},o?.map((e=>l.ZP.createElement(n.$m,{key:e.name,value:e.name}))))})),l.ZP.createElement(n.iz,null),l.ZP.createElement(n.cw,{label:e("required"),labelIcon:l.ZP.createElement(m.B,{helpText:"realm-settings-help:requiredHelp",fieldLabelId:"realm-settings:required"}),fieldId:"kc-required",hasNoPaddingTop:!0},l.ZP.createElement(r.Qr,{name:"isRequired","data-testid":"required",defaultValue:!1,control:t.control,render:({onChange:a,value:t})=>l.ZP.createElement(n.rs,{id:"kc-required",onChange:a,isChecked:t,label:e("common:on"),labelOff:e("common:off")})})),w&&l.ZP.createElement(l.ZP.Fragment,null,l.ZP.createElement(n.cw,{label:e("requiredFor"),fieldId:"requiredFor",hasNoPaddingTop:!0},l.ZP.createElement(r.Qr,{name:"required.roles","data-testid":"requiredFor",defaultValue:h[0].value,control:t.control,render:({onChange:a,value:t})=>l.ZP.createElement("div",{className:"kc-requiredFor"},h.map((r=>l.ZP.createElement(n.Y8,{id:r.label,key:r.label,"data-testid":r.label,isChecked:(0,p.Xy)(t,r.value),name:"roles",onChange:()=>{a(r.value)},label:e(r.label),className:"kc-requiredFor-option"}))))})),l.ZP.createElement(n.cw,{label:e("requiredWhen"),fieldId:"requiredWhen",hasNoPaddingTop:!0},l.ZP.createElement(n.Y8,{id:"requiredAlways","data-testid":"requiredAlways",isChecked:V.length===o?.length,name:"requiredWhen",label:e("always"),onChange:e=>{e?t.setValue("required.scopes",o?.map((e=>e.name))):t.setValue("required.scopes",[])},className:"pf-u-mb-md"}),l.ZP.createElement(n.Y8,{id:"requiredScopesAsRequested","data-testid":"requiredScopesAsRequested",isChecked:V.length!==o?.length,name:"requiredWhen",label:e("scopesAsRequested"),onChange:e=>{e?t.setValue("required.scopes",[]):t.setValue("required.scopes",o?.map((e=>e.name)))},className:"pf-u-mb-md"})),l.ZP.createElement(n.cw,{fieldId:"kc-scope-required-when"},l.ZP.createElement(r.Qr,{name:"required.scopes",control:t.control,defaultValue:[],render:({onChange:a,value:t})=>l.ZP.createElement(n.Ph,{name:"scopeRequired","data-testid":"required-when-scope-field",variant:n.TM.typeaheadMulti,typeAheadAriaLabel:"Select",chipGroupProps:{numChips:3,expandedText:e("common:hide"),collapsedText:e("common:showRemaining")},onToggle:e=>Z(e),selections:t,onSelect:(e,l)=>{const n=l.toString();let r=[""];r=t?t.includes(n)?t.filter((e=>e!==n)):[...t,n]:[n],a(r)},onClear:e=>{e.stopPropagation(),a([])},isOpen:E,isDisabled:V.length===o?.length,"aria-labelledby":"scope"},o?.map((e=>l.ZP.createElement(n.$m,{key:e.name,value:e.name}))))}))))},b=({name:e})=>{const{t:a}=(0,i.$G)("realm-settings"),{control:t}=(0,r.Gc)();return l.ZP.createElement(n.rj,null,l.ZP.createElement(r.Qr,{name:`permissions.${e}`,control:t,defaultValue:[],render:({onChange:t,value:r})=>l.ZP.createElement(l.ZP.Fragment,null,l.ZP.createElement(n.P4,{lg:4,sm:6},l.ZP.createElement(n.XZ,{id:`user-${e}`,label:a("user"),value:"user","data-testid":`user-${e}`,isChecked:r.includes("user"),onChange:()=>{const e="user",a=r.includes(e)?r.filter((a=>a!==e)):[e];t(a)},isDisabled:r.includes("admin")})),l.ZP.createElement(n.P4,{lg:8,sm:6},l.ZP.createElement(n.XZ,{id:`admin-${e}`,label:a("admin"),value:"admin","data-testid":`admin-${e}`,isChecked:r.includes("admin"),onChange:()=>{const e="admin",a=r.includes(e)?r.filter((a=>a!==e)):["user",e];t(a)}})))}))},f=()=>{const{t:e}=(0,i.$G)("realm-settings");return l.ZP.createElement(c.N,{role:"manage-realm",isHorizontal:!0},l.ZP.createElement(n.cw,{hasNoPaddingTop:!0,label:e("whoCanEdit"),labelIcon:l.ZP.createElement(m.B,{helpText:"realm-settings-help:whoCanEditHelp",fieldLabelId:"realm-settings:whoCanEdit"}),fieldId:"kc-who-can-edit"},l.ZP.createElement(b,{name:"edit"})),l.ZP.createElement(n.cw,{hasNoPaddingTop:!0,label:e("whoCanView"),labelIcon:l.ZP.createElement(m.B,{helpText:"realm-settings-help:whoCanViewHelp",fieldLabelId:"realm-settings:whoCanView"}),fieldId:"kc-who-can-view"},l.ZP.createElement(b,{name:"view"})))};var P=t(7973),v=t(2688),E=t(5954);const Z=({open:e,toggleDialog:a,onConfirm:t,selected:s})=>{const{t:o}=(0,i.$G)("realm-settings"),m=(0,r.cI)(),{handleSubmit:c}=m,d=s,u=e=>{t({...e,name:s.name}),a()};return l.ZP.createElement(n.u_,{variant:n.vE.small,title:o("addValidatorRole",{validatorName:d.name}),description:d.description,isOpen:e,onClose:a,actions:[l.ZP.createElement(n.zx,{key:"save","data-testid":"save-validator-role-button",variant:"primary",onClick:()=>c(u)()},o("common:save")),l.ZP.createElement(n.zx,{key:"cancel","data-testid":"cancel-validator-role-button",variant:"link",onClick:a},o("common:cancel"))]},l.ZP.createElement(r.RV,{...m},l.ZP.createElement(E.K,{properties:d.config})))},k=[{name:"double",description:"Check if the value is a double and within a lower and/or upper range. If no range is defined, the validator only checks whether the value is a valid number.",config:[{type:"String",defaultValue:"",helpText:"The minimal allowed value - this config is optional.",label:"Minimum",name:"min"},{type:"String",defaultValue:"",helpText:"The maximal allowed value - this config is optional.",label:"Maximum",name:"max"}]},{name:"email",description:"Check if the value has a valid e-mail format.",config:[]},{name:"integer",description:"Check if the value is an integer and within a lower and/or upper range. If no range is defined, the validator only checks whether the value is a valid number.",config:[{type:"String",defaultValue:"",helpText:"The minimal allowed value - this config is optional.",label:"Minimum",name:"min"},{type:"String",defaultValue:"",helpText:"The maximal allowed value - this config is optional.",label:"Maximum",name:"max"}]},{name:"length",description:"Check the length of a string value based on a minimum and maximum length.",config:[{type:"String",defaultValue:"",helpText:"The minimum length",label:"Minimum length",name:"min"},{type:"String",defaultValue:"",helpText:"The maximum length",label:"Maximum length",name:"max"},{type:"boolean",defaultValue:!1,helpText:"Disable trimming of the String value before the length check",label:"Trimming disabled",name:"trim-disabled"}]},{name:"local-date",description:"Check if the value has a valid format based on the realm and/or user locale.",config:[]},{name:"options",description:"Check if the value is from the defined set of allowed values. Useful to validate values entered through select and multiselect fields.",config:[{type:"MultivaluedString",defaultValue:"",helpText:"List of allowed options",label:"Options",name:"options"}]},{name:"pattern",description:"Check if the value matches a specific RegEx pattern.",config:[{type:"String",defaultValue:"",helpText:"RegExp pattern the value must match. Java Pattern syntax is used.",label:"RegExp pattern",name:"pattern"},{type:"String",defaultValue:"",helpText:"Key of the error message in i18n bundle. Dafault message key is error-pattern-no-match",label:"Error message key",name:"error-message"}]},{name:"person-name-prohibited-characters",description:"Check if the value is a valid person name as an additional barrier for attacks such as script injection. The validation is based on a default RegEx pattern that blocks characters not common in person names.",config:[{type:"String",defaultValue:"",helpText:"Key of the error message in i18n bundle. Dafault message key is error-person-name-invalid-character",label:"Error message key",name:"error-message"}]},{name:"uri",description:"Check if the value is a valid URI.",config:[]},{name:"username-prohibited-characters",description:"Check if the value is a valid username as an additional barrier for attacks such as script injection. The validation is based on a default RegEx pattern that blocks characters not common in usernames.",config:[{type:"String",defaultValue:"",helpText:"Key of the error message in i18n bundle. Dafault message key is error-username-invalid-character",label:"Error message key",name:"error-message"}]}];var y=t(4836);const C=({selectedValidators:e,toggleDialog:a,onConfirm:t})=>{const{t:r}=(0,i.$G)("realm-settings"),[s,o]=(0,l.eJ)(),[m,c]=(0,l.eJ)((()=>k.filter((({name:a})=>!e.map((({key:e})=>e)).includes(a))))),[d,u]=(0,y.Z)();return l.ZP.createElement(l.ZP.Fragment,null,d&&l.ZP.createElement(Z,{onConfirm:e=>{t(e),c(m.filter((({name:a})=>a!==e.name)))},open:d,toggleDialog:u,selected:s}),l.ZP.createElement(n.u_,{variant:n.vE.small,title:r("addValidator"),isOpen:!0,onClose:a},l.ZP.createElement(v.Xs,{"aria-label":"validators-table"},l.ZP.createElement(v.hr,null,l.ZP.createElement(v.Tr,null,l.ZP.createElement(v.Th,null,r("validatorDialogColNames.colName")),l.ZP.createElement(v.Th,null,r("validatorDialogColNames.colDescription")))),l.ZP.createElement(v.p3,null,m.map((e=>l.ZP.createElement(v.Tr,{key:e.name,onRowClick:()=>{o(e),u()},isHoverable:!0},l.ZP.createElement(v.Td,{dataLabel:r("validatorDialogColNames.colName")},e.name),l.ZP.createElement(v.Td,{dataLabel:r("validatorDialogColNames.colDescription")},e.description))))))))};var q=t(9766);const T=()=>{const{t:e}=(0,i.$G)("realm-settings"),[a,t]=(0,y.Z)(),[s,o]=(0,l.eJ)(),{setValue:m,control:c,register:d}=(0,r.Gc)(),u=(0,r.qo)({name:"validations",control:c,defaultValue:[]});(0,l.d4)((()=>{d("validations")}),[]);const[p,h]=(0,q.W)({titleKey:e("deleteValidatorConfirmTitle"),messageKey:e("deleteValidatorConfirmMsg",{validatorName:s?.name}),continueButtonLabel:"common:delete",continueButtonVariant:n.Wu.danger,onConfirm:async()=>{const e=u.filter((e=>e.key!==s?.name));m("validations",[...e])}});return l.ZP.createElement(l.ZP.Fragment,null,a&&l.ZP.createElement(C,{selectedValidators:u,onConfirm:e=>{m("validations",[...u,{key:e.name,value:e.config}])},toggleDialog:t}),l.ZP.createElement(h,null),l.ZP.createElement("div",{className:"kc-attributes-validations"},l.ZP.createElement(n.kC,null,l.ZP.createElement(n.B5,{align:{default:"alignRight"}},l.ZP.createElement(n.zx,{id:"addValidator",onClick:()=>t(),variant:"link",className:"kc-addValidator","data-testid":"addValidator",icon:l.ZP.createElement(P.wl,null)},e("realm-settings:addValidator")))),l.ZP.createElement(n.iz,null),l.ZP.createElement(v.Xs,{"aria-label":"validators-table"},l.ZP.createElement(v.hr,null,l.ZP.createElement(v.Tr,null,l.ZP.createElement(v.Th,null,e("validatorColNames.colName")),l.ZP.createElement(v.Th,null,e("validatorColNames.colConfig")),l.ZP.createElement(v.Th,null))),l.ZP.createElement(v.p3,null,u.map((a=>l.ZP.createElement(v.Tr,{key:a.key},l.ZP.createElement(v.Td,{dataLabel:e("validatorColNames.colName")},a.key),l.ZP.createElement(v.Td,{dataLabel:e("validatorColNames.colConfig")},JSON.stringify(a.value)),l.ZP.createElement(v.Td,null,l.ZP.createElement(n.zx,{key:"validator",variant:"link","data-testid":"deleteValidator",onClick:()=>{p(),o({name:a.key})}},e("common:delete")))))),0===u.length&&l.ZP.createElement(n.xv,{className:"kc-emptyValidators",component:n.qO.h6},e("realm-settings:emptyValidators"))))))};var V=t(9310),w=t(1677),N=t(6179);const x=()=>{const{t:e}=(0,i.$G)("realm-settings");return l.ZP.createElement(c.N,{role:"manage-realm",isHorizontal:!0},l.ZP.createElement(n.cw,{hasNoPaddingTop:!0,label:e("annotations"),fieldId:"kc-annotations",className:"kc-annotations-label"},l.ZP.createElement(n.rj,{className:"kc-annotations"},l.ZP.createElement(n.P4,null,l.ZP.createElement(N.R,{name:"annotations"})))))};var I=t(4326),S=t(8437),R=t(8336),D=t(2630);const G=({save:e})=>{const{t:a}=(0,i.$G)("realm-settings"),t=(0,r.Gc)(),{realm:m,attributeName:c}=(0,s.UO)(),d=!!c;return l.ZP.createElement(S.XP,null,l.ZP.createElement(o.W,{sections:[{title:a("generalSettings"),panel:l.ZP.createElement(g,null)},{title:a("permission"),panel:l.ZP.createElement(f,null)},{title:a("validations"),panel:l.ZP.createElement(T,null)},{title:a("annotations"),panel:l.ZP.createElement(x,null)}]}),l.ZP.createElement(n.l0,{onSubmit:t.handleSubmit(e)},l.ZP.createElement(n.WK,{className:"keycloak__form_actions"},l.ZP.createElement(n.zx,{variant:"primary",type:"submit","data-testid":"attribute-create"},a(d?"common:save":"common:create")),l.ZP.createElement(s.rU,{to:(0,V.e)({realm:m,tab:"attributes"}),"data-testid":"attribute-cancel",className:"kc-attributeCancel"},a("common:cancel")))))};function A(){const{realm:e,attributeName:a}=(0,s.UO)(),{adminClient:t}=(0,u.K3)(),o=(0,r.cI)({shouldUnregister:!1}),{t:m}=(0,i.$G)("realm-settings"),c=(0,s.k6)(),{addAlert:d,addError:p}=(0,I.Z7)(),[h,g]=(0,l.eJ)(null),b=!!a,f=e=>Object.entries(e||[]).map((([e,a])=>({key:e,value:a})));(0,u.ib)((()=>t.users.getProfile()),(e=>{g(e);const{annotations:t,validations:l,permissions:n,selector:r,required:i,...s}=e.attributes.find((e=>e.name===a))||{};(0,R.Fz)(s,o.setValue),Object.entries((0,D.x)({permissions:n,selector:r,required:i},{safe:!0})).map((([e,a])=>o.setValue(e,a))),o.setValue("annotations",f(t)),o.setValue("validations",f(l)),o.setValue("isRequired",void 0!==i)}),[]);const P=async l=>{const r=l.validations?.reduce(((e,a)=>(e[a.key]=0===a.value?.length?{}:a.value,e)),{}),i=l.annotations.reduce(((e,a)=>Object.assign(e,{[a.key]:a.value})),{}),s=b?h?.attributes.map((e=>e.name!==a?e:(delete e.required,Object.assign({...e,name:a,displayName:l.displayName,validations:r,selector:l.selector,permissions:l.permissions,annotations:i},l.isRequired?{required:l.required}:void 0,l.group?{group:l.group}:void 0)))):h?.attributes.concat([Object.assign({name:l.name,displayName:l.displayName,required:l.isRequired?l.required:{},validations:r,selector:l.selector,permissions:l.permissions,annotations:i},l.isRequired?{required:l.required}:void 0,l.group?{group:l.group}:void 0)]);try{await t.users.updateProfile({...h,attributes:s,realm:e}),c.push((0,V.e)({realm:e,tab:"attributes"})),d(m("realm-settings:createAttributeSuccess"),n.Ux.success)}catch(e){p("realm-settings:createAttributeError",e)}};return l.ZP.createElement(r.RV,{...o},l.ZP.createElement(w.t,{titleKey:b?a:m("createAttribute"),subKey:b?"":m("createAttributeSubTitle")}),l.ZP.createElement(n.NP,{variant:"light"},l.ZP.createElement(G,{save:()=>o.handleSubmit(P)()})))}}}]);