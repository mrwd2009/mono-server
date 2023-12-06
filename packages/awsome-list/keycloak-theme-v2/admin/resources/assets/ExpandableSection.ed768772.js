import{r as m,_ as D,h as u,q as o,j as p,a6 as W}from"./index.0cb2e516.js";const t={expandableSection:"pf-c-expandable-section",expandableSectionContent:"pf-c-expandable-section__content",expandableSectionToggle:"pf-c-expandable-section__toggle",expandableSectionToggleIcon:"pf-c-expandable-section__toggle-icon",expandableSectionToggleText:"pf-c-expandable-section__toggle-text",modifiers:{expanded:"pf-m-expanded",detached:"pf-m-detached",truncate:"pf-m-truncate",limitWidth:"pf-m-limit-width",displayLg:"pf-m-display-lg",indented:"pf-m-indented",active:"pf-m-active",expandTop:"pf-m-expand-top",overpassFont:"pf-m-overpass-font"}},j={name:"--pf-c-expandable-section--m-truncate__content--LineClamp",value:"3",var:"var(--pf-c-expandable-section--m-truncate__content--LineClamp)"},A=j;var n;(function(a){a.default="default",a.truncate="truncate"})(n||(n={}));const h=(a,e)=>{!e||a<1||e.style.setProperty(A.name,a.toString())};class b extends m.exports.Component{constructor(e){super(e),this.expandableContentRef=m.exports.createRef(),this.state={isExpanded:e.isExpanded}}calculateToggleText(e,i,c,l){return l&&i!==""?i:!l&&c!==""?c:e}componentDidMount(){if(this.props.variant===n.truncate&&this.props.truncateMaxLines){const e=this.expandableContentRef.current;h(this.props.truncateMaxLines,e)}}componentDidUpdate(e){if(this.props.variant===n.truncate&&e.truncateMaxLines!==this.props.truncateMaxLines){const i=this.expandableContentRef.current;h(this.props.truncateMaxLines,i)}}render(){const e=this.props,{onToggle:i,isActive:c,className:l,toggleText:T,toggleTextExpanded:_,toggleTextCollapsed:v,toggleContent:C,children:S,isExpanded:r,isDetached:x,displaySize:L,isWidthLimited:E,isIndented:y,contentId:I,variant:d,truncateMaxLines:z}=e,N=D(e,["onToggle","isActive","className","toggleText","toggleTextExpanded","toggleTextCollapsed","toggleContent","children","isExpanded","isDetached","displaySize","isWidthLimited","isIndented","contentId","variant","truncateMaxLines"]);let g=i,s=r;r===void 0&&(s=this.state.isExpanded,g=R=>{this.setState({isExpanded:R},()=>i(this.state.isExpanded))});const M=this.calculateToggleText(T,_,v,s),f=!x&&u("button",{className:o(t.expandableSectionToggle),type:"button","aria-expanded":s,onClick:()=>g(!s),children:[d!==n.truncate&&p("span",{className:o(t.expandableSectionToggleIcon),children:p(W,{"aria-hidden":!0})}),p("span",{className:o(t.expandableSectionToggleText),children:C||M})]});return u("div",{...Object.assign({className:o(t.expandableSection,s&&t.modifiers.expanded,c&&t.modifiers.active,x&&t.modifiers.detached,L==="large"&&t.modifiers.displayLg,E&&t.modifiers.limitWidth,y&&t.modifiers.indented,d===n.truncate&&t.modifiers.truncate,l)},N),children:[d===n.default&&f,p("div",{ref:this.expandableContentRef,className:o(t.expandableSectionContent),hidden:d!==n.truncate&&!s,id:I,children:S}),d===n.truncate&&f]})}}b.displayName="ExpandableSection";b.defaultProps={className:"",toggleText:"",toggleTextExpanded:"",toggleTextCollapsed:"",onToggle:a=>{},isActive:!1,isDetached:!1,displaySize:"default",isWidthLimited:!1,isIndented:!1,contentId:"",variant:"default"};export{b as E};