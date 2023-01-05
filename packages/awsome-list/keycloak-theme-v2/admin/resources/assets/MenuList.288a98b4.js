import{r as d,j as n,O as Me,N as ne,_ as A,h as T,q as m,Q as Le,as as Ce,R as we,a9 as Ee,at as Ne,a6 as Re,au as Se}from"./index.0cb2e516.js";import{K as De}from"./TableToolbar.c27bcd3c.js";import{S as Oe}from"./star-icon.97692015.js";import{C as ke}from"./Checkbox.2dc73ed3.js";const t={breadcrumb:"pf-c-breadcrumb",divider:"pf-c-divider",menu:"pf-c-menu",menuBreadcrumb:"pf-c-menu__breadcrumb",menuContent:"pf-c-menu__content",menuFooter:"pf-c-menu__footer",menuGroup:"pf-c-menu__group",menuGroupTitle:"pf-c-menu__group-title",menuHeader:"pf-c-menu__header",menuItem:"pf-c-menu__item",menuItemAction:"pf-c-menu__item-action",menuItemActionIcon:"pf-c-menu__item-action-icon",menuItemCheck:"pf-c-menu__item-check",menuItemDescription:"pf-c-menu__item-description",menuItemExternalIcon:"pf-c-menu__item-external-icon",menuItemIcon:"pf-c-menu__item-icon",menuItemMain:"pf-c-menu__item-main",menuItemSelectIcon:"pf-c-menu__item-select-icon",menuItemText:"pf-c-menu__item-text",menuItemToggleIcon:"pf-c-menu__item-toggle-icon",menuList:"pf-c-menu__list",menuListItem:"pf-c-menu__list-item",menuSearch:"pf-c-menu__search",modifiers:{hidden:"pf-m-hidden",hiddenOnSm:"pf-m-hidden-on-sm",visibleOnSm:"pf-m-visible-on-sm",hiddenOnMd:"pf-m-hidden-on-md",visibleOnMd:"pf-m-visible-on-md",hiddenOnLg:"pf-m-hidden-on-lg",visibleOnLg:"pf-m-visible-on-lg",hiddenOnXl:"pf-m-hidden-on-xl",visibleOnXl:"pf-m-visible-on-xl",hiddenOn_2xl:"pf-m-hidden-on-2xl",visibleOn_2xl:"pf-m-visible-on-2xl",flyout:"pf-m-flyout",top:"pf-m-top",left:"pf-m-left",drilldown:"pf-m-drilldown",drilledIn:"pf-m-drilled-in",currentPath:"pf-m-current-path",static:"pf-m-static",plain:"pf-m-plain",scrollable:"pf-m-scrollable",nav:"pf-m-nav",focus:"pf-m-focus",disabled:"pf-m-disabled",load:"pf-m-load",loading:"pf-m-loading",danger:"pf-m-danger",selected:"pf-m-selected",favorite:"pf-m-favorite",favorited:"pf-m-favorited"},themeDark:"pf-theme-dark"},R=d.exports.createContext({menuId:null,parentMenu:null,onActionClick:()=>null,onSelect:()=>null,activeItemId:null,selected:null,drilledInMenus:[],drilldownItemPath:[],onDrillIn:null,onDrillOut:null,onGetMenuHeight:()=>null,flyoutRef:null,setFlyoutRef:()=>null,disableHover:!1}),ge=d.exports.createContext({itemId:null,isDisabled:!1});class V extends d.exports.Component{constructor(l){super(l),this.menuRef=d.exports.createRef(),this.activeMenu=null,this.state={ouiaStateId:Me(ie.displayName),searchInputValue:"",transitionMoveTarget:null,flyoutRef:null,disableHover:!1},this.handleDrilldownTransition=s=>{const e=this.menuRef.current;if(!(!e||e!==s.target.closest(".pf-c-menu")&&!Array.from(e.getElementsByClassName("pf-c-menu")).includes(s.target.closest(".pf-c-menu"))))if(this.state.transitionMoveTarget)this.state.transitionMoveTarget.focus(),this.setState({transitionMoveTarget:null});else{const o=e.querySelector("#"+this.props.activeMenu)||e||null,a=Array.from(o.getElementsByTagName("UL")[0].children).filter(p=>!(p.classList.contains("pf-m-disabled")||p.classList.contains("pf-c-divider")))[0].firstChild;a.focus(),a.tabIndex=0}},this.handleExtraKeys=s=>{const e=this.props.containsDrilldown,o=document.activeElement;if(s.target.closest(".pf-c-menu")!==this.activeMenu&&!s.target.classList.contains("pf-c-breadcrumb__link")&&(this.activeMenu=s.target.closest(".pf-c-menu"),this.setState({disableHover:!0})),s.target.tagName==="INPUT")return;const a=this.activeMenu,p=s.key,b=o.classList.contains("pf-c-breadcrumb__link")||o.classList.contains("pf-c-dropdown__toggle");if(p===" "||p==="Enter"){if(s.preventDefault(),e&&!b){if(o.closest("li").classList.contains("pf-m-current-path")&&a.parentElement.tagName==="LI")o.tabIndex=-1,a.parentElement.firstChild.tabIndex=0,this.setState({transitionMoveTarget:a.parentElement.firstChild});else if(o.nextElementSibling&&o.nextElementSibling.classList.contains("pf-c-menu")){const f=Array.from(o.nextElementSibling.getElementsByTagName("UL")[0].children).filter(u=>!(u.classList.contains("pf-m-disabled")||u.classList.contains("pf-c-divider")));o.tabIndex=-1,f[0].firstChild.tabIndex=0,this.setState({transitionMoveTarget:f[0].firstChild})}}document.activeElement.click()}},this.createNavigableElements=()=>this.props.containsDrilldown?this.activeMenu?Array.from(this.activeMenu.getElementsByTagName("UL")[0].children).filter(e=>!(e.classList.contains("pf-m-disabled")||e.classList.contains("pf-c-divider"))):[]:this.menuRef.current?Array.from(this.menuRef.current.getElementsByTagName("LI")).filter(e=>!(e.classList.contains("pf-m-disabled")||e.classList.contains("pf-c-divider"))):[],l.innerRef&&(this.menuRef=l.innerRef)}allowTabFirstItem(){const l=this.menuRef.current;if(l){const s=l.querySelector("ul button:not(:disabled), ul a:not(:disabled)");s&&(s.tabIndex=0)}}componentDidMount(){this.context&&this.setState({disableHover:this.context.disableHover}),ne&&window.addEventListener("transitionend",this.props.isRootMenu?this.handleDrilldownTransition:null),this.allowTabFirstItem()}componentWillUnmount(){ne&&window.removeEventListener("transitionend",this.handleDrilldownTransition)}componentDidUpdate(l){l.children!==this.props.children&&this.allowTabFirstItem()}render(){const l=this.props,{"aria-label":s,id:e,children:o,className:a,onSelect:p,selected:b=null,onActionClick:L,ouiaId:f,ouiaSafe:u,containsFlyout:h,isNavFlyout:I,containsDrilldown:y,isMenuDrilledIn:g,isPlain:_,isScrollable:S,drilldownItemPath:D,drilledInMenus:O,onDrillIn:H,onDrillOut:q,onGetMenuHeight:P,parentMenu:C=null,activeItemId:k=null,innerRef:se,isRootMenu:X,activeMenu:le}=l,$=A(l,["aria-label","id","children","className","onSelect","selected","onActionClick","ouiaId","ouiaSafe","containsFlyout","isNavFlyout","containsDrilldown","isMenuDrilledIn","isPlain","isScrollable","drilldownItemPath","drilledInMenus","onDrillIn","onDrillOut","onGetMenuHeight","parentMenu","activeItemId","innerRef","isRootMenu","activeMenu"]),B=g||O&&O.includes(e)||!1;return T(R.Provider,{value:{menuId:e,parentMenu:C||e,onSelect:p,onActionClick:L,activeItemId:k,selected:b,drilledInMenus:O,drilldownItemPath:D,onDrillIn:H,onDrillOut:q,onGetMenuHeight:P,flyoutRef:this.state.flyoutRef,setFlyoutRef:v=>this.setState({flyoutRef:v}),disableHover:this.state.disableHover},children:[X&&n(De,{containerRef:this.menuRef||null,additionalKeyHandler:this.handleExtraKeys,createNavigableElements:this.createNavigableElements,isActiveElement:v=>document.activeElement.closest("li")===v||document.activeElement.parentElement===v||document.activeElement.closest("ol")&&document.activeElement.closest("ol").firstChild===v,getFocusableElement:v=>v.querySelector("input")||v.firstChild,noHorizontalArrowHandling:document.activeElement&&(document.activeElement.classList.contains("pf-c-breadcrumb__link")||document.activeElement.classList.contains("pf-c-dropdown__toggle")),noEnterHandling:!0,noSpaceHandling:!0}),n("div",{...Object.assign({id:e,className:m(t.menu,_&&t.modifiers.plain,S&&t.modifiers.scrollable,h&&t.modifiers.flyout,I&&t.modifiers.nav,y&&t.modifiers.drilldown,B&&t.modifiers.drilledIn,a),"aria-label":s,ref:this.menuRef},Le(ie.displayName,f!==void 0?f:this.state.ouiaStateId,u),$),children:o})]})}}V.displayName="Menu";V.contextType=R;V.defaultProps={ouiaSafe:!0,isRootMenu:!0,isPlain:!1,isScrollable:!1};const ie=d.exports.forwardRef((c,l)=>n(V,{...Object.assign({},c,{innerRef:l})}));ie.displayName="Menu";const Fe=d.exports.forwardRef((c,l)=>{const{getHeight:s,children:e,menuHeight:o,maxMenuHeight:a}=c,p=A(c,["getHeight","children","menuHeight","maxMenuHeight"]),b=d.exports.createRef(),L=(f,u,h)=>{if(f){let I=f.clientHeight,y=null,g=f.closest(`.${t.menuList}`);for(;g!==null&&g.nodeType===1;)g.classList.contains(t.menuList)&&(y=g),g=g.parentElement;if(y){const _=getComputedStyle(y),S=parseFloat(_.getPropertyValue("padding-top").replace(/px/g,""))+parseFloat(_.getPropertyValue("padding-bottom").replace(/px/g,""))+parseFloat(getComputedStyle(y.parentElement).getPropertyValue("border-bottom-width").replace(/px/g,""));I=I+S}h&&h(u,I),s&&s(I.toString())}return l||b};return n(R.Consumer,{children:({menuId:f,onGetMenuHeight:u})=>n("div",{...Object.assign({},p,{className:m(t.menuContent,c.className),ref:h=>L(h,f,u),style:Object.assign(Object.assign({},o&&{"--pf-c-menu__content--Height":o}),a&&{"--pf-c-menu__content--MaxHeight":a})}),children:e})})});Fe.displayName="MenuContent";const Te={name:"--pf-c-menu--m-flyout__menu--top-offset",value:"0px",var:"var(--pf-c-menu--m-flyout__menu--top-offset)"},Ae=Te,He={name:"--pf-c-menu--m-flyout__menu--m-left--right-offset",value:"0px",var:"var(--pf-c-menu--m-flyout__menu--m-left--right-offset)"},Pe=He,Be={name:"--pf-c-menu--m-flyout__menu--left-offset",value:"0px",var:"var(--pf-c-menu--m-flyout__menu--left-offset)"},je=Be,Ue=c=>{var{className:l="",icon:s,onClick:e,"aria-label":o,isFavorited:a=null,isDisabled:p,actionId:b,innerRef:L}=c,f=A(c,["className","icon","onClick","aria-label","isFavorited","isDisabled","actionId","innerRef"]);return n(R.Consumer,{children:({onActionClick:u})=>n(ge.Consumer,{children:({itemId:h,isDisabled:I})=>{const y=g=>{e&&e(g),u&&u(g,h,b)};return n("button",{...Object.assign({className:m(t.menuItemAction,a!==null&&t.modifiers.favorite,a&&t.modifiers.favorited,l),"aria-label":o,onClick:y},(p===!0||I===!0)&&{disabled:!0},{ref:L,tabIndex:-1},f),children:n("span",{className:m(t.menuItemActionIcon),children:s==="favorites"||a!==null?n(Oe,{"aria-hidden":!0}):s})})}})})},be=d.exports.forwardRef((c,l)=>n(Ue,{...Object.assign({},c,{innerRef:l})}));be.displayName="MenuItemAction";const he=d.exports.createContext({direction:"right"}),Ke=c=>{var{children:l,className:s,itemId:e=null,to:o,hasCheck:a=!1,isActive:p=null,isFavorited:b=null,isLoadButton:L=!1,isLoading:f=!1,flyoutMenu:u,direction:h,description:I=null,onClick:y=()=>{},component:g="button",isDisabled:_=!1,isExternalLink:S=!1,isSelected:D=null,isFocused:O,icon:H,actions:q,onShowFlyout:P,drilldownMenu:C,isOnPath:k,innerRef:se}=c,X=A(c,["children","className","itemId","to","hasCheck","isActive","isFavorited","isLoadButton","isLoading","flyoutMenu","direction","description","onClick","component","isDisabled","isExternalLink","isSelected","isFocused","icon","actions","onShowFlyout","drilldownMenu","isOnPath","innerRef"]);const{menuId:le,parentMenu:$,onSelect:B,onActionClick:v,activeItemId:ae,selected:j,drilldownItemPath:oe,onDrillIn:re,onDrillOut:ce,flyoutRef:Ie,setFlyoutRef:W,disableHover:ue}=d.exports.useContext(R);let U=o?"a":g;a&&!o&&(U="label");const[K,ye]=d.exports.useState(null),z=d.exports.useContext(he),[de,Q]=d.exports.useState(z.direction),w=d.exports.useRef(),M=w===Ie,J=u!==void 0,Y=i=>{!M&&i?W(w):M&&!i&&W(null),P&&i&&P()};Ce(()=>{if(J&&w.current&&ne){const i=w.current.lastElementChild;if(i&&i.classList.contains(t.menu)){const r=w.current.getClientRects()[0],x=i.getClientRects()[0];if(r&&x){const F=r.x-x.width,Z=window.innerWidth-r.x-r.width-x.width;let N=de;Z<0&&N!=="left"?(Q("left"),N="left"):F<0&&N!=="right"&&(Q("right"),N="right");let ee=0;F<0&&Z<0&&(ee=N==="right"?-Z:-F),N==="left"?(i.classList.add(t.modifiers.left),i.style.setProperty(Pe.name,`-${ee}px`)):i.style.setProperty(je.name,`-${ee}px`);const te=window.innerHeight-r.y-x.height;window.innerHeight-x.height<0&&te<0||te<0&&i.style.setProperty(Ae.name,`${te}px`)}}}},[M,u]),d.exports.useEffect(()=>{Q(z.direction)},[z]),d.exports.useEffect(()=>{if(K)if(M){const i=K.nextElementSibling;Array.from(i.getElementsByTagName("UL")[0].children).filter(x=>!(x.classList.contains("pf-m-disabled")||x.classList.contains("pf-c-divider")))[0].firstChild.focus()}else K.focus()},[M,K]);const me=i=>{const r=i.key,x=i.target,F=i.type;(r===" "||r==="Enter"||r==="ArrowRight"||F==="click")&&(i.stopPropagation(),M||(Y(!0),ye(x))),(r==="Escape"||r==="ArrowLeft")&&M&&(i.stopPropagation(),Y(!1))},fe=(i,r)=>{r&&r(i,e),y&&y(i)},_e=k&&k||oe&&oe.includes(e)||!1;let G;h&&(h==="down"?G=()=>re&&re(le,typeof C=="function"?C().props.id:C.props.id,e):G=()=>ce&&ce($,e));let E={};U==="a"?E={href:o,"aria-disabled":_?!0:null,disabled:null}:U==="button"&&(E={type:"button"}),k?E["aria-expanded"]=!0:J&&(E["aria-haspopup"]="menu",E["aria-expanded"]=M);const ve=()=>p!==null?p?"page":null:e!==null&&ae!==null?e===ae:null,pe=()=>D!==null?D:j!==null&&e!==null?Array.isArray(j)&&j.includes(e)||e===j:!1,xe=()=>{ue||(J?Y(!0):W(null))};return T("li",{...Object.assign({className:m(t.menuListItem,_&&t.modifiers.disabled,_e&&t.modifiers.currentPath,L&&t.modifiers.load,f&&t.modifiers.loading,O&&t.modifiers.focus,s),onMouseOver:xe},u&&{onKeyDown:me},{ref:w,role:a?"menuitem":"none"},X),children:[n(we,{children:i=>T(U,{...Object.assign({tabIndex:-1,className:m(t.menuItem,pe()&&!a&&t.modifiers.selected,s),"aria-current":ve()},!a&&{disabled:_},!a&&!u&&{role:"menuitem"},{ref:se},!a&&{onClick:r=>{fe(r,B),G&&G(),u&&me(r)}},a&&{htmlFor:i},E),children:[T("span",{className:m(t.menuItemMain),children:[h==="up"&&n("span",{className:m(t.menuItemToggleIcon),children:n(Ee,{"aria-hidden":!0})}),H&&n("span",{className:m(t.menuItemIcon),children:H}),a&&n("span",{className:m("pf-c-menu__item-check"),children:n(ke,{id:i,component:"span",isChecked:D||!1,onChange:r=>fe(r,B),isDisabled:_})}),n("span",{className:m(t.menuItemText),children:l}),S&&n("span",{className:m(t.menuItemExternalIcon),children:n(Ne,{"aria-hidden":!0})}),(u||h==="down")&&n("span",{className:m(t.menuItemToggleIcon),children:n(Re,{"aria-hidden":!0})}),pe()&&n("span",{className:m(t.menuItemSelectIcon),children:n(Se,{"aria-hidden":!0})})]}),I&&h!=="up"&&n("span",{className:m(t.menuItemDescription),children:n("span",{children:I})})]})}),M&&n(R.Provider,{value:{disableHover:ue},children:n(he.Provider,{value:{direction:de},children:u})}),typeof C=="function"?C():C,T(ge.Provider,{value:{itemId:e,isDisabled:_},children:[q,b!==null&&n(be,{icon:"favorites",isFavorited:b,"aria-label":b?"starred":"not starred",onClick:i=>v(i,e),tabIndex:-1,actionId:"fav"})]})]})},Ge=d.exports.forwardRef((c,l)=>n(Ke,{...Object.assign({},c,{innerRef:l})}));Ge.displayName="MenuItem";const Ve=c=>{var{children:l=null,className:s}=c,e=A(c,["children","className"]);return n("ul",{...Object.assign({role:"menu",className:m(t.menuList,s)},e),children:l})};Ve.displayName="MenuList";export{Ge as M,ie as a,Fe as b,Ve as c,t as m};
