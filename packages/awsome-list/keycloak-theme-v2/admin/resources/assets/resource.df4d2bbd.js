import{b7 as f}from"./index.0cb2e516.js";import{j as m}from"./joinPath.69b856b1.js";async function r(e,t,s){const a=await e.getAccessToken(),n=e.baseUrl;return await(await fetch(m(n,"admin/realms",e.realmName,t)+(s?"?"+new URLSearchParams(s):""),{method:"GET",headers:f(a)})).json()}const o=async({adminClient:e,id:t,type:s,first:a,max:n,search:i,endpoint:c})=>r(e,`/admin-ui-${c}/${s}/${t}`,{first:(a||0).toString(),max:(n||10).toString(),search:i||""}),h=e=>o({...e,endpoint:"available-roles"}),p=e=>o({...e,endpoint:"effective-roles"}),g=({adminClient:e,...t})=>r(e,"admin-ui-brute-force-user",t),b=e=>o({...e,endpoint:"authentication-management"});export{h as a,r as b,g as c,b as f,p as g};
