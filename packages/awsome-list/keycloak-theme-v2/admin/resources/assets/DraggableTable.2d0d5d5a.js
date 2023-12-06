import{u as w,r as u,bm as g,h as I,j as i}from"./index.0cb2e516.js";import{s as l}from"./data-list.f7ff2ea7.js";import{a as X,b as Y,c as y,d as C,e as B,f as p,N as K}from"./TableToolbar.c27bcd3c.js";function q({keyField:m,columns:h,data:f,actions:T,onDragFinish:A,...L}){const{t:O}=w("authentication"),d=u.exports.useRef(null),[a,o]=u.exports.useState({draggedItemId:"",draggingToItemIndex:-1,dragging:!1,tempItemOrder:[""]}),b=u.exports.useMemo(()=>f.map(e=>g(e,m)),[f]),j=e=>{e.dataTransfer.effectAllowed="move",e.dataTransfer.setData("text/plain",e.currentTarget.id);const r=e.currentTarget.id;e.currentTarget.classList.add(l.modifiers.ghostRow),e.currentTarget.setAttribute("aria-pressed","true"),o({...a,draggedItemId:r,dragging:!0})},E=(e,r,t)=>{const n=e.indexOf(r);if(n===t)return e;const s=e.splice(n,1);return e.splice(t,0,s[0]),e},x=e=>{if(!d.current)return;const r=d.current,t=Array.from(r.children);if(!t.map(n=>n.id).every((n,s)=>n===e[s])){for(;r.firstChild;)r.removeChild(r.lastChild);e.forEach(n=>{r.appendChild(t.find(s=>s.id===n))})}},N=()=>{Array.from(d.current?.children||[]).forEach(e=>{e.classList.remove(l.modifiers.ghostRow),e.setAttribute("aria-pressed","false")}),o({...a,draggedItemId:"",draggingToItemIndex:-1,dragging:!1})},S=e=>{D(e)||(x(b),o({...a,draggingToItemIndex:-1}))},D=e=>{const r=d.current.getBoundingClientRect();return e.clientX>r.x&&e.clientX<r.x+r.width&&e.clientY>r.y&&e.clientY<r.y+r.height},$=e=>{D(e)?A(a.draggedItemId,a.tempItemOrder):N()},R=e=>{e.preventDefault();const t=e.target.closest("tr");if(!t||d.current&&!d.current.contains(t)||t.id===a.draggedItemId)return null;{const n=t.id,s=Array.from(d.current?.children||[]).findIndex(c=>c.id===n);if(s!==a.draggingToItemIndex){const c=E(b,a.draggedItemId,s);x(c),o({...a,draggingToItemIndex:s,tempItemOrder:c})}}},v=e=>{const r=e.target;r.classList.remove(l.modifiers.ghostRow),r.setAttribute("aria-pressed","false"),o({...a,draggedItemId:"",draggingToItemIndex:-1,dragging:!1})};return I(X,{"aria-label":"Draggable table",className:a.dragging?l.modifiers.dragOver:"",...L,children:[i(Y,{children:I(y,{children:[i(C,{}),h.map(e=>i(C,{children:O(e.displayKey||e.name)},e.name))]})}),i(B,{ref:d,onDragOver:R,onDrop:R,onDragLeave:S,children:f.map(e=>I(y,{id:g(e,m),draggable:!0,onDrop:$,onDragEnd:v,onDragStart:j,children:[i(p,{draggableRow:{id:`draggable-row-${g(e,"id")}`}}),h.map(r=>i(p,{dataLabel:r.name,children:r.cellRenderer?r.cellRenderer(e):g(e,r.name)},`${g(e,"id")}_${r.name}`)),T&&i(p,{isActionCell:!0,children:i(K,{items:T.map(({isActionable:r,...t})=>r?{...t,isDisabled:!r(e)}:t),rowData:e})})]},g(e,m)))})]})}export{q as D};