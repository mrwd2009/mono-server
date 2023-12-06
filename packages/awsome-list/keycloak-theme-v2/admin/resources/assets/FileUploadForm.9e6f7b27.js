import{u as v,r as L,h as U,F as D,j as l,s as u}from"./index.0cb2e516.js";import{F as f}from"./FileUpload.18e1e495.js";import{C as T}from"./CodeEditor.16ebafa0.js";import{M as k,a as R}from"./Modal.6593dfcc.js";import{a as b}from"./FormGroup.3d5f3f16.js";const M=({id:o,onChange:s,helpText:g="common-help:helpFileUpload",unWrap:d=!1,language:C,extension:F,...t})=>{const{t:n}=v(),c={value:"",filename:"",isLoading:!1,modal:!1},[e,a]=L.exports.useState(c),m=()=>a({...e,modal:!1}),p=(i,x)=>{a({...e,filename:x.name})},r=i=>{a({...e,value:i}),s(i)},h=()=>{a({...e,modal:!0})};return U(D,{children:[e.modal&&l(k,{variant:R.small,title:n("clearFile"),isOpen:!0,onClose:m,actions:[l(u,{variant:"primary","data-testid":"clear-button",onClick:()=>{a(c),s("")},children:n("clear")},"confirm"),l(u,{"data-testid":"cancel",variant:"link",onClick:m,children:n("cancel")},"cancel")],children:n("clearFileExplain")}),d&&l(f,{id:o,...t,type:"text",value:e.value,filename:e.filename,onFileInputChange:p,onDataChange:r,onTextChange:r,onClearClick:h,onReadStarted:()=>a({...e,isLoading:!0}),onReadFinished:()=>a({...e,isLoading:!1}),isLoading:e.isLoading,dropzoneProps:{accept:{"application/text":[F]}}}),!d&&l(b,{label:n("resourceFile"),fieldId:o,helperText:n(g),children:l(f,{"data-testid":o,id:o,...t,type:"text",value:e.value,filename:e.filename,onFileInputChange:p,onDataChange:r,onTextChange:r,onClearClick:h,onReadStarted:()=>a({...e,isLoading:!0}),onReadFinished:()=>a({...e,isLoading:!1}),isLoading:e.isLoading,hideDefaultPreview:!0,children:!t.hideDefaultPreview&&l(T,{isLineNumbersVisible:!0,code:e.value,language:C,height:"128px",onChange:i=>a({...e,value:i}),isReadOnly:!t.allowEditingUploadedText})})})]})};export{M as F};