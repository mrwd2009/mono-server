"use strict";var __importDefault=this&&this.__importDefault||function(h){return h&&h.__esModule?h:{default:h}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.saveReusableNode=exports.reparentNode=exports.constructContractTree=void 0;const lodash_1=__importDefault(require("lodash")),core_1=require("@sequelize/core"),error_1=require("../../../lib/error"),constructContractTree=async({root:h,version:s,ContractBody:y})=>{const f=(r,n,a="")=>{let t="";return r==="contract"?a==="umc"?t="umcRoot":a==="pcc"?t="pccRoot":t="root":r==="subcontract"?n==="1"?a==="umc"?t="umcSubContractRoot":a==="pcc"&&(t="pccSubContractRoot"):t="subContract":r==="reroute"?t="reroute":r==="charge"&&(n==="1"?a==="umc"?t="umcChargeRoot":a==="pcc"&&(t="pccChargeRoot"):t="charge"),t},p=await y.findAll({attributes:["__pk_contractbody","_fk_parent_contractbody","Name","Sequence_ID","Type","Branch_Type","Hidden_Flag","Source_Type"],where:{_fk_contractroot:h,Version:s,Time_Sequence_ID:"1"},order:[["Sequence_ID","ASC"]]});if(!p.length)throw new error_1.DataError("No available nodes.");const g=lodash_1.default.findIndex(p,["Sequence_ID","1"]),u=p[g];p.splice(g,1),p.unshift(u);let l=null;const o={},q={};return lodash_1.default.forEach(p,r=>{const n={id:r.__pk_contractbody,name:r.Name,hidden:r.Hidden_Flag,type:f(r.Type,r.Sequence_ID),extraData:{type:r.Type,contractBody:r.__pk_contractbody},children:[]};if((r.Sequence_ID||"").length===2&&(n.extraData.branchType=r.Branch_Type),r.Sequence_ID==="1"){n.type=f(r.Type,r.Sequence_ID,r.Source_Type),l=n;return}o[r.Sequence_ID]=n,q[r.__pk_contractbody]=n,r.Sequence_ID.length===2?l.children.push(n):(o[r.Sequence_ID.slice(0,-2)]||q[r._fk_parent_contractbody]).children.push(n)}),l};exports.constructContractTree=constructContractTree;const reparentNode=({payload:h,transaction:s,ContractBody:y})=>{const f=y,{sourceID:p,targetID:g,position:u}=h;let l,o,q,r,n;const a=[];return f.findAll({where:{__pk_contractbody:[p,g]},transaction:s}).then(t=>{if(t.length===2){if(l=lodash_1.default.find(t,["__pk_contractbody",p]),o=lodash_1.default.find(t,["__pk_contractbody",g]),!l._fk_parent_contractbody)throw new error_1.LogicError("Dragged node can't be contract root.");if(o.Type==="charge"&&u==="child")throw new error_1.LogicError("Target charge node can't as parent node.");return f.findOne({where:{_fk_contractroot:l._fk_contractroot,Version:l.Version,_fk_parent_contractbody:null},transaction:s,lock:s.LOCK.UPDATE})}else throw new error_1.DataError("No data")}).then(t=>{if(!t)throw new error_1.DataError("No data");if(q=t,t.__pk_contractbody===o.__pk_contractbody&&u!="child")throw new error_1.LogicError("Contract root only support 'child' position.");return r=l.Sequence_ID.slice(0,-2),f.findAll({where:{_fk_contractroot:l._fk_contractroot,Version:l.Version,Sequence_ID:{[core_1.Op.like]:`${r}%`},_fk_parent_contractbody:{[core_1.Op.not]:null}},transaction:s})}).then(t=>{let S=[];const i=[];lodash_1.default.forEach(t,_=>{lodash_1.default.startsWith(_.Sequence_ID,r)&&_.Sequence_ID>l.Sequence_ID&&!lodash_1.default.startsWith(_.Sequence_ID,l.Sequence_ID)&&(_.Sequence_ID.length===l.Sequence_ID.length?i.push(_):S.push(_)),lodash_1.default.startsWith(_.Sequence_ID,l.Sequence_ID)&&a.push(_)});const I=[];return lodash_1.default.forEach(i,_=>{const D=_.Sequence_ID,d=`${r}${lodash_1.default.padStart(`${parseInt(_.Sequence_ID.substr(-2))-1}`,2,"0")}`;_.Sequence_ID=d,I.push(_.save({hooks:!1,transaction:s})),S=lodash_1.default.filter(S,c=>lodash_1.default.startsWith(c.Sequence_ID,D)?(c.Sequence_ID=c.Sequence_ID.replace(new RegExp(`^${D}`),d),I.push(c.save({hooks:!1,transaction:s})),!1):!0)}),Promise.all(I)}).then(()=>f.findOne({where:{__pk_contractbody:o.__pk_contractbody},transaction:s})).then(t=>{o=t}).then(()=>o._fk_parent_contractbody&&u!="child"?(n=o.Sequence_ID.slice(0,-2),f.findAll({where:{_fk_contractroot:o._fk_contractroot,Version:o.Version,Sequence_ID:{[core_1.Op.like]:`${n}%`},_fk_parent_contractbody:{[core_1.Op.not]:null}},transaction:s})):f.findAll({where:{_fk_parent_contractbody:o.__pk_contractbody},transaction:s})).then(t=>{const S=lodash_1.default.map(a,"__pk_contractbody");t=lodash_1.default.filter(t,e=>!lodash_1.default.includes(S,e.__pk_contractbody));let i=[];const I=[],_=[];let D,d;if(u!=="child")u==="above"?(lodash_1.default.forEach(t,e=>{lodash_1.default.startsWith(e.Sequence_ID,n)&&e.Sequence_ID>=o.Sequence_ID&&(e.Sequence_ID.length===o.Sequence_ID.length?I.push(e):i.push(e))}),D=o.Sequence_ID):(lodash_1.default.forEach(t,e=>{lodash_1.default.startsWith(e.Sequence_ID,n)&&e.Sequence_ID>o.Sequence_ID&&!lodash_1.default.startsWith(e.Sequence_ID,o.Sequence_ID)&&(e.Sequence_ID.length===o.Sequence_ID.length?I.push(e):i.push(e))}),D=`${n}${lodash_1.default.padStart(`${parseInt(o.Sequence_ID.substr(-2))+1}`,2,"0")}`),d=o._fk_parent_contractbody,lodash_1.default.forEach(I,e=>{const k=e.Sequence_ID,b=`${n}${lodash_1.default.padStart(`${parseInt(e.Sequence_ID.substr(-2))+1}`,2,"0")}`;e.Sequence_ID=b,_.push(e.save({hooks:!1,transaction:s})),i=lodash_1.default.filter(i,w=>lodash_1.default.startsWith(w.Sequence_ID,k)?(w.Sequence_ID=w.Sequence_ID.replace(new RegExp(`^${k}`),b),_.push(w.save({hooks:!1,transaction:s})),!1):!0)});else{const e=t.length;o._fk_parent_contractbody?D=`${o.Sequence_ID}${lodash_1.default.padStart(`${e+1}`,2,"0")}`:D=lodash_1.default.padStart(e+1,2,"0"),d=o.__pk_contractbody}const c=l.Sequence_ID;return lodash_1.default.forEach(a,e=>{e.__pk_contractbody===l.__pk_contractbody&&(e._fk_parent_contractbody=d),e.Branch_Type=o.Branch_Type,e.Sequence_ID=e.Sequence_ID.replace(new RegExp(`^${c}`),D),_.push(e.save({hooks:!1,transaction:s}))}),Promise.all(_)}).then(()=>({root:q._fk_contractroot,version:q.Version}))};exports.reparentNode=reparentNode;const saveReusableNode=({node:h,type:s,name:y,transaction:f,ContractBody:p,ContractRoot:g})=>{let u=null,l=null;const o=[],q=n=>g.create({Name:y||u.Name,Status:"active",Type:s,RootType:u.Type,ActiveVersion:1},{transaction:n}).then(a=>{l=a}),r=(n,a)=>{const t={};let S=Promise.resolve(null),i=n;for(;i.length;){const I=[],_=i.shift(),D=[_];lodash_1.default.forEach(i,d=>{d.Sequence_ID.length===_.Sequence_ID.length?D.push(d):I.push(d)}),i=I,S=S.then(()=>{const d=lodash_1.default.map(D,c=>{let e="",k=null;return c.__pk_contractbody===u.__pk_contractbody?(e="1",k=null,c.Name=y||c.Name):(console.log(`${u.Sequence_ID} - ${c.Sequence_ID}`),u.Sequence_ID==="1"?e=c.Sequence_ID:e=c.Sequence_ID.substring(u.Sequence_ID.length),e.length===2?k=t["1"]:k=t[e.substring(0,e.length-2)]),p.create({_fk_contractroot:l.__pk_contractroot,_fk_parent_contractbody:k,Name:c.Name,Type:c.Type,Branch_Type:c.Branch_Type,Conditional:c.Conditional,Charge_Type:c.Charge_Type,Source_Contract_Root:u._fk_contractroot,Source_Contract_Version:u.Version,Source_Type:s,HasRateModel:c.HasRateModel,HasAggregationModel:c.HasAggregationModel,HasUsageModel:c.HasUsageModel,HasGrouping:c.HasGrouping,HasCategorization:c.HasCategorization,Sequence_ID:e,Start_Date:c.Start_Date,End_Date:c.End_Date,Time_Sequence_ID:1,Version:1,Version_Type:"interim",Hidden_Flag:c.Hidden_Flag,Completion_Flag:c.Completion_Flag,Unbundled_Flag:c.Unbundled_Flag},{transaction:a}).then(b=>{t[b.Sequence_ID]=b.__pk_contractbody,o.push([c.__pk_contractbody,b.__pk_contractbody])})});return Promise.all(d)})}return S};return p.findOne({where:{__pk_contractbody:h},transaction:f}).then(n=>{if(!n)throw new error_1.DataError(`Contract node${h} is not found.`);u=n;const a={_fk_contractroot:u._fk_contractroot,Version:u.Version};return s!=="instance"&&(a.Sequence_ID={[core_1.Op.like]:`${u.Sequence_ID}%`}),p.findAll({where:a,order:[["Sequence_ID","ASC"]],transaction:f})}).then(n=>q(f).then(()=>{if(s==="instance"){const a=lodash_1.default.findIndex(n,S=>S.Sequence_ID==="1"),t=n[a];n.splice(a,1),n.unshift(t)}return r(n,f)})).then(()=>!0)};exports.saveReusableNode=saveReusableNode;