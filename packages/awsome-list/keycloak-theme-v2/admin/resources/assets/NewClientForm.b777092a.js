import{h as w,q as c,j as n,s as k,ae as V,bw as Se,bx as Ne,F as L,a6 as Q,ah as ze,_ as X,r as y,v as ve,A as xe,u as Z,bH as ye,l as Te,ay as Ie,aw as ke,az as Be,P as _e,bO as Le,aY as Ae,bP as Fe,aC as M}from"./index.0cb2e516.js";import{a as De,C as We,u as Oe,F as Ee}from"./index.esm.6af887f8.js";import{V as Pe}from"./ViewHeader.2586557f.js";import{C as je,a as Ve}from"./ClientDescription.e967f34f.js";import{F as Me}from"./FormAccess.bee4f1e0.js";import{T as He,H as Ge}from"./HelpItem.e440d5db.js";import{g as Je}from"./utils.988d95db.js";import{a as Ke}from"./FormGroup.3d5f3f16.js";import{S as $e,b as Re,a as Ue}from"./Select.5a6b39aa.js";import{M as qe,a as Ye}from"./Modal.6593dfcc.js";import"./Text.c38ffb52.js";import"./GridItem.0db472b0.js";import"./Checkbox.2dc73ed3.js";import"./check.51c67984.js";import"./KeycloakTextInput.b4d5b2db.js";import"./KeycloakTextArea.f5e2440a.js";import"./copy-icon.cf10e1f5.js";import"./star-icon.97692015.js";const l={button:"pf-c-button",card:"pf-c-card",drawer:"pf-c-drawer",modalBox:"pf-c-modal-box",modifiers:{finished:"pf-m-finished",expanded:"pf-m-expanded",current:"pf-m-current",expandable:"pf-m-expandable",disabled:"pf-m-disabled",noPadding:"pf-m-no-padding"},pageMainWizard:"pf-c-page__main-wizard",themeDark:"pf-theme-dark",wizard:"pf-c-wizard",wizardClose:"pf-c-wizard__close",wizardDescription:"pf-c-wizard__description",wizardFooter:"pf-c-wizard__footer",wizardFooterCancel:"pf-c-wizard__footer-cancel",wizardHeader:"pf-c-wizard__header",wizardInnerWrap:"pf-c-wizard__inner-wrap",wizardMain:"pf-c-wizard__main",wizardMainBody:"pf-c-wizard__main-body",wizardNav:"pf-c-wizard__nav",wizardNavItem:"pf-c-wizard__nav-item",wizardNavLink:"pf-c-wizard__nav-link",wizardNavLinkText:"pf-c-wizard__nav-link-text",wizardNavLinkToggle:"pf-c-wizard__nav-link-toggle",wizardNavLinkToggleIcon:"pf-c-wizard__nav-link-toggle-icon",wizardNavList:"pf-c-wizard__nav-list",wizardOuterWrap:"pf-c-wizard__outer-wrap",wizardTitle:"pf-c-wizard__title",wizardToggle:"pf-c-wizard__toggle",wizardToggleIcon:"pf-c-wizard__toggle-icon",wizardToggleList:"pf-c-wizard__toggle-list",wizardToggleListItem:"pf-c-wizard__toggle-list-item",wizardToggleNum:"pf-c-wizard__toggle-num",wizardToggleSeparator:"pf-c-wizard__toggle-separator"},ee=({onNext:s,onBack:r,onClose:d,isValid:e,firstStep:t,activeStep:a,nextButtonText:i,backButtonText:o,cancelButtonText:p})=>w("footer",{className:c(l.wizardFooter),children:[n(k,{variant:V.primary,type:"submit",onClick:s,isDisabled:!e,children:i}),!a.hideBackButton&&n(k,{variant:V.secondary,onClick:r,isDisabled:t,children:o}),!a.hideCancelButton&&n("div",{className:l.wizardFooterCancel,children:n(k,{variant:V.link,onClick:d,children:p})})]});ee.displayName="WizardFooterInternal";const te=({hasDrawer:s,wrapper:r,children:d})=>s?r(d):d;te.displayName="WizardDrawerWrapper";const ae=({children:s,hasNoBodyPadding:r=!1,"aria-label":d,"aria-labelledby":e,mainComponent:t="div",hasDrawer:a,isDrawerExpanded:i,activeStep:o})=>n(t,{"aria-label":d,"aria-labelledby":e,className:c(l.wizardMain),children:n(te,{hasDrawer:a&&o.drawerPanelContent,wrapper:m=>n(Se,{isInline:!0,isExpanded:i,children:n(Ne,{panelContent:o.drawerPanelContent,children:m})}),children:n("div",{className:c(l.wizardMainBody,r&&l.modifiers.noPadding),children:s})})});ae.displayName="WizardBody";const ne=({isNavOpen:s,onNavToggle:r,nav:d,steps:e,activeStep:t,children:a,hasNoBodyPadding:i=!1,"aria-label":o="Wizard Toggle",mainAriaLabelledBy:p=null,mainAriaLabel:m=null,isInPage:u=!0,hasDrawer:h,isDrawerExpanded:v})=>{let b,f,N;for(let g=0;g<e.length;g++)if(t.id&&e[g].id===t.id||e[g].name===t.name){b=g+1,f=e[g].name;break}else if(e[g].steps){for(const T of e[g].steps)if(t.id&&T.id===t.id||T.name===t.name){b=g+1,f=e[g].name,N=T.name;break}}return w(L,{children:[w("button",{onClick:()=>r(!s),className:c(l.wizardToggle,s&&"pf-m-expanded"),"aria-label":o,"aria-expanded":s,children:[w("span",{className:c(l.wizardToggleList),children:[w("span",{className:c(l.wizardToggleListItem),children:[n("span",{className:c(l.wizardToggleNum),children:b})," ",f,N&&n(Q,{className:c(l.wizardToggleSeparator),"aria-hidden":"true"})]}),N&&n("span",{className:c(l.wizardToggleListItem),children:N})]}),n("span",{className:c(l.wizardToggleIcon),children:n(ze,{"aria-hidden":"true"})})]}),w("div",{className:c(l.wizardOuterWrap),children:[w("div",{className:c(l.wizardInnerWrap),children:[d(s),w(ae,{mainComponent:u?"div":"main","aria-label":m,"aria-labelledby":p,hasNoBodyPadding:i,activeStep:t,isDrawerExpanded:v,hasDrawer:h,children:[h&&!v&&t.drawerToggleButton,t.component]})]}),a]})]})};ne.displayName="WizardToggle";const H=({children:s,"aria-label":r,"aria-labelledby":d,isOpen:e=!1,returnList:t=!1})=>{const a=n("ol",{className:c(l.wizardNavList),children:s});return t?a:n("nav",{className:c(l.wizardNav,e&&l.modifiers.expanded),"aria-label":r,"aria-labelledby":d,children:n("ol",{className:c(l.wizardNavList),children:s})})};H.displayName="WizardNav";const W=s=>{var{children:r=null,content:d="",isCurrent:e=!1,isDisabled:t=!1,step:a,onNavItemClick:i=()=>{},navItemComponent:o="button",href:p=null,isExpandable:m=!1,id:u}=s,h=X(s,["children","content","isCurrent","isDisabled","step","onNavItemClick","navItemComponent","href","isExpandable","id"]);const v=o,[b,f]=y.exports.useState(!1);y.exports.useEffect(()=>{f(e)},[e]);const N={disabled:t},g={tabIndex:t?-1:void 0,href:p};return w("li",{className:c(l.wizardNavItem,m&&l.modifiers.expandable,m&&b&&l.modifiers.expanded),children:[n(v,{...Object.assign({},h,o==="a"?Object.assign({},g):Object.assign({},N),u&&{id:u.toString()},{onClick:()=>m?f(!b||e):i(a),className:c(l.wizardNavLink,e&&l.modifiers.current,t&&l.modifiers.disabled),"aria-disabled":t?!0:null,"aria-current":e&&!r?"step":!1},m&&{"aria-expanded":b}),children:m?w(L,{children:[n("span",{className:c(l.wizardNavLinkText),children:d}),n("span",{className:c(l.wizardNavLinkToggle),children:n("span",{className:c(l.wizardNavLinkToggleIcon),children:n(Q,{})})})]}):d}),r]})};W.displayName="WizardNavItem";const ie=y.exports.createContext({goToStepById:()=>null,goToStepByName:()=>null,onNext:()=>null,onBack:()=>null,onClose:()=>null,activeStep:{name:null}}),Qe=ie.Provider,Xe=ie.Consumer,re=({onClose:s=()=>{},title:r,description:d,hideClose:e,closeButtonAriaLabel:t,titleId:a,descriptionComponent:i="p",descriptionId:o})=>w("div",{className:c(l.wizardHeader),children:[!e&&n(k,{variant:"plain",className:c(l.wizardClose),"aria-label":t,onClick:s,children:n(ve,{"aria-hidden":"true"})}),n(He,{headingLevel:"h2",size:"3xl",className:c(l.wizardTitle),"aria-label":r,id:a,children:r||n(L,{children:"\xA0"})}),d&&n(i,{className:c(l.wizardDescription),id:o,children:d})]});re.displayName="WizardHeader";class _ extends y.exports.Component{constructor(r){super(r),this.handleKeyClicks=e=>{e.key===xe.Escape&&(this.state.isNavOpen?this.setState({isNavOpen:!this.state.isNavOpen}):this.props.isOpen&&this.props.onClose())},this.onNext=()=>{const{onNext:e,onClose:t,onSave:a}=this.props,{currentStep:i}=this.state,o=this.getFlattenedSteps(),p=o.length;if(i>=p)return a?a():t();{let m=i;for(let f=i;f<=p;f++){if(!o[f])return;if(!o[f].isDisabled){m=f+1;break}}this.setCurrentStep(m,o[m-1]);const{id:u,name:h}=o[i-1],{id:v,name:b}=o[m-1];return e&&e({id:v,name:b},{prevId:u,prevName:h})}},this.onBack=()=>{const{onBack:e}=this.props,{currentStep:t}=this.state,a=this.getFlattenedSteps();if(a.length<t){const i=a.length;this.setCurrentStep(i,a[i-1])}else{let i=t;for(let h=t;h>=0;h--){if(!a[h-2])return;if(!a[h-2].isDisabled){i=h-1<=1?1:h-1;break}}this.setCurrentStep(i,a[i-1]);const{id:o,name:p}=a[i],{id:m,name:u}=a[i-1];return e&&e({id:m,name:u},{prevId:o,prevName:p})}},this.goToStep=e=>{const t=this.getFlattenedSteps();if(t[e-1].isDisabled)return;const{onGoToStep:a}=this.props,{currentStep:i}=this.state,o=t.length;e<1?e=1:e>o&&(e=o),this.setCurrentStep(e,t[e-1]),this.setState({isNavOpen:!1});const{id:p,name:m}=t[i-1],{id:u,name:h}=t[e-1];return a&&a({id:u,name:h},{prevId:p,prevName:m})},this.goToStepById=e=>{const t=this.getFlattenedSteps();let a;for(let i=0;i<t.length;i++)if(t[i].id===e){a=i+1;break}a&&this.setCurrentStep(a,t[a-1])},this.goToStepByName=e=>{const t=this.getFlattenedSteps();let a;for(let i=0;i<t.length;i++)if(t[i].name===e){a=i+1;break}a&&this.setCurrentStep(a,t[a-1])},this.getFlattenedSteps=()=>{const{steps:e}=this.props,t=[];for(const a of e)if(a.steps)for(const i of a.steps)t.push(i);else t.push(a);return t},this.getFlattenedStepsIndex=(e,t)=>{for(let a=0;a<e.length;a++)if(e[a].name===t)return a+1;return 0},this.initSteps=e=>{for(let t=0;t<e.length;t++){if(e[t].steps)for(let a=0;a<e[t].steps.length;a++)e[t].steps[a]=Object.assign({canJumpTo:!0},e[t].steps[a]);e[t]=Object.assign({canJumpTo:!0},e[t])}return e},this.getElement=e=>typeof e=="function"?e():e||document.body;const d=_.currentId++;if(this.titleId=r.titleId||`pf-wizard-title-${d}`,this.descriptionId=r.descriptionId||`pf-wizard-description-${d}`,this.state={currentStep:this.props.startAtStep&&Number.isInteger(this.props.startAtStep)?this.props.startAtStep:1,isNavOpen:!1},r.onCurrentStepChanged){const e=this.getFlattenedSteps();if(e.length>=this.state.currentStep){const t=e[this.state.currentStep-1];r.onCurrentStepChanged(t)}}this.drawerRef=y.exports.createRef()}setCurrentStep(r,d){this.setState({currentStep:r}),this.props.onCurrentStepChanged&&this.props.onCurrentStepChanged(d)}componentDidMount(){const r=typeof document<"u"?document.body:null;r&&r.addEventListener("keydown",this.handleKeyClicks,!1)}componentWillUnmount(){const r=typeof document<"u"&&document.body||null;r&&r.removeEventListener("keydown",this.handleKeyClicks,!1)}componentDidUpdate(r){r.startAtStep!==this.props.startAtStep&&this.setState({currentStep:this.props.startAtStep})}render(){const r=this.props,{width:d,height:e,title:t,description:a,descriptionComponent:i,onClose:o,onSave:p,onBack:m,onNext:u,onGoToStep:h,className:v,steps:b,startAtStep:f,nextButtonText:N="Next",backButtonText:g="Back",cancelButtonText:T="Cancel",hideClose:A,closeButtonAriaLabel:z="Close",navAriaLabel:O,navAriaLabelledBy:F,mainAriaLabel:E,mainAriaLabelledBy:G,hasNoBodyPadding:oe,footer:le,appendTo:et,isOpen:P,titleId:tt,descriptionId:at,isNavExpandable:de,onCurrentStepChanged:nt,hasDrawer:ce,isDrawerExpanded:pe}=r,me=X(r,["width","height","title","description","descriptionComponent","onClose","onSave","onBack","onNext","onGoToStep","className","steps","startAtStep","nextButtonText","backButtonText","cancelButtonText","hideClose","closeButtonAriaLabel","navAriaLabel","navAriaLabelledBy","mainAriaLabel","mainAriaLabelledBy","hasNoBodyPadding","footer","appendTo","isOpen","titleId","descriptionId","isNavExpandable","onCurrentStepChanged","hasDrawer","isDrawerExpanded"]),{currentStep:J}=this.state,I=this.getFlattenedSteps(),ue=I.length<J?I.length:J,C=I[ue-1],he=this.initSteps(b),fe=C===I[0],ge=C&&C.enableNext!==void 0?C.enableNext:!0,be=j=>{const R={isOpen:j,"aria-label":O,"aria-labelledby":(t||F)&&(F||this.titleId)};return n(H,{...Object.assign({},R),children:he.map((S,U)=>{if(S.isFinishedStep)return;let D,B;if(S.steps){let q=!1,Y=!1;for(const x of S.steps)C.name===x.name&&(q=!0),x.canJumpTo&&(Y=!0);return B=this.getFlattenedStepsIndex(I,S.steps[0].name),n(W,{id:S.id,content:S.name,isExpandable:de,isCurrent:q,isDisabled:!Y,step:B,onNavItemClick:this.goToStep,children:n(H,{...Object.assign({},R,{returnList:!0}),children:S.steps.map((x,Ce)=>{if(!x.isFinishedStep)return B=this.getFlattenedStepsIndex(I,x.name),D=x.canJumpTo&&!x.isDisabled,n(W,{id:x.id,content:x.name,isCurrent:C.name===x.name,isDisabled:!D,step:B,onNavItemClick:this.goToStep},`child_${Ce}`)})})},U)}return B=this.getFlattenedStepsIndex(I,S.name),D=S.canJumpTo&&!S.isDisabled,n(W,{...Object.assign({},S.stepNavItemProps,{key:U,id:S.id,content:S.name,isCurrent:C.name===S.name,isDisabled:!D,step:B,onNavItemClick:this.goToStep})})})})},we={goToStepById:this.goToStepById,goToStepByName:this.goToStepByName,onNext:this.onNext,onBack:this.onBack,onClose:o,activeStep:C},K=Object.assign(Object.assign({},e?{height:e}:{}),d?{width:d}:{}),$=n(Qe,{value:we,children:w("div",{...Object.assign({},me,{className:c(l.wizard,C&&C.isFinishedStep&&"pf-m-finished",v),style:Object.keys(K).length?K:void 0}),children:[t&&n(re,{titleId:this.titleId,descriptionId:this.descriptionId,onClose:o,title:t,description:a,descriptionComponent:i,closeButtonAriaLabel:z,hideClose:A}),n(ne,{hasDrawer:ce,isDrawerExpanded:pe,mainAriaLabel:E,isInPage:P===void 0,mainAriaLabelledBy:(t||G)&&(G||this.titleId),isNavOpen:this.state.isNavOpen,onNavToggle:j=>this.setState({isNavOpen:j}),nav:be,steps:b,activeStep:C,hasNoBodyPadding:oe,children:le||n(ee,{onNext:this.onNext,onBack:this.onBack,onClose:o,isValid:ge,firstStep:fe,activeStep:C,nextButtonText:C&&C.nextButtonText||N,backButtonText:g,cancelButtonText:T})})]})});return P!==void 0?n(qe,{width:d!==null?d:void 0,isOpen:P,variant:Ye.large,"aria-labelledby":this.titleId,"aria-describedby":this.descriptionId,showClose:!1,hasNoBodyWrapper:!0,children:$}):$}}_.displayName="Wizard";_.currentId=0;_.defaultProps={title:null,description:"",descriptionComponent:"p",className:"",startAtStep:1,nextButtonText:"Next",backButtonText:"Back",cancelButtonText:"Cancel",hideClose:!1,closeButtonAriaLabel:"Close",navAriaLabel:null,navAriaLabelledBy:null,mainAriaLabel:null,mainAriaLabelledBy:null,hasNoBodyPadding:!1,onBack:null,onNext:null,onGoToStep:null,width:null,height:null,footer:null,onClose:()=>{},appendTo:null,isOpen:void 0,isNavExpandable:!1,hasDrawer:!1,isDrawerExpanded:!1};const se=({children:s})=>n("footer",{className:c(l.wizardFooter),children:s});se.displayName="WizardFooter";const Ze=()=>{const{t:s}=Z("clients"),{control:r,formState:{errors:d}}=De(),e=ye(),[t,a]=y.exports.useState(!1);return w(Me,{isHorizontal:!0,role:"manage-clients",children:[n(Ke,{label:s("clientType"),fieldId:"kc-type",validated:d.protocol?"error":"default",labelIcon:n(Ge,{helpText:"clients-help:clientType",fieldLabelId:"clients:clientType"}),children:n(We,{name:"protocol",defaultValue:"",control:r,render:({onChange:i,value:o})=>n($e,{id:"kc-type",onToggle:a,onSelect:(p,m)=>{i(m.toString()),a(!1)},selections:o,variant:Re.single,"aria-label":s("selectEncryptionType"),isOpen:t,children:e.map(p=>n(Ue,{selected:p===o,value:p,"data-testid":`option-${p}`,children:Je(s,p)},p))})})}),n(je,{hasConfigureAccess:!0})]})};function zt(){const{t:s}=Z("clients"),{realm:r}=Te(),{adminClient:d}=Ie(),e=ke(),[t,a]=y.exports.useState(!1),[i,o]=y.exports.useState({protocol:"openid-connect",clientId:"",name:"",description:"",publicClient:!0,authorizationServicesEnabled:!1,serviceAccountsEnabled:!1,implicitFlowEnabled:!1,directAccessGrantsEnabled:!0,standardFlowEnabled:!0,frontchannelLogout:!0}),{addAlert:p,addError:m}=Be(),u=Oe({defaultValues:i}),h=u.watch("protocol"),v=async()=>{try{const z=await d.clients.create({...i,clientId:i.clientId?.trim()});p(s("createSuccess"),Ae.success),e(Fe({realm:r,clientId:z.id,tab:"settings"}))}catch(z){m("clients:createError",z)}},b=async z=>{await u.trigger()&&(o({...i,...M(u.getValues())}),f()||a(!0),z?.())},f=()=>t||h!=="openid-connect",N=()=>{o({...i,...M(u.getValues())}),u.reset({...i,...M(u.getValues())}),a(!1)},g=z=>{z.id==="generalSettings"?N():b()},T=()=>n(se,{children:n(Xe,{children:({activeStep:z,onNext:O,onBack:F,onClose:E})=>w(L,{children:[n(k,{variant:"primary","data-testid":f()?"save":"next",type:"submit",onClick:()=>{b(O)},children:f()?s("common:save"):s("common:next")}),n(k,{variant:"secondary","data-testid":"back",onClick:()=>{N(),F()},isDisabled:z.name===s("generalSettings"),children:s("common:back")}),n(k,{"data-testid":"cancel",variant:"link",onClick:E,children:s("common:cancel")})]})})}),A=s("createClient");return w(L,{children:[n(Pe,{titleKey:"clients:createClient",subKey:"clients:clientsExplain"}),n(_e,{variant:"light",children:n(Ee,{...u,children:n(_,{onClose:()=>e(Le({realm:r})),navAriaLabel:`${A} steps`,mainAriaLabel:`${A} content`,steps:[{id:"generalSettings",name:s("generalSettings"),component:n(Ze,{})},...t?[{id:"capabilityConfig",name:s("capabilityConfig"),component:n(Ve,{protocol:i.protocol})}]:[]],footer:n(T,{}),onSave:v,onGoToStep:g})})})]})}export{zt as default};
