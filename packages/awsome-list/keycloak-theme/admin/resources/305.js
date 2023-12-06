"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[305],{305:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var a=r(5863),n=r(710),l=r(3802),i=r(386),o=r(1576),d=r(4839),s=r(3536),c=r(390),u=r(3745),m=r(8798),f=r(764),p=r(4326),g=r(1786);const b=["connectionUrl","bindDn","bindCredential","useTruststoreSpi","connectionTimeout","startTls","authType"],P=e=>{const t={};return b.forEach((r=>{const a=(0,c.U2)(e.getValues(),`config.${r}`);t[r]=Array.isArray(a)?a[0]:""})),t},h=({form:e,id:t,showSectionHeading:r=!1,showSectionDescription:b=!1})=>{const{t:h}=(0,l.$G)("user-federation"),{t:E}=(0,l.$G)("user-federation-help"),{adminClient:Z}=(0,m.K3)(),{realm:v}=(0,f.PL)(),{addAlert:y,addError:k}=(0,p.Z7)(),I=!!t,T=async r=>{if(await e.trigger())try{const a=P(e);await Z.realms.testLDAPConnection({realm:v},{...a,action:r,componentId:t}),y(h("testSuccess"),n.Ux.success)}catch(e){k("user-federation:testError",e)}},[S,w]=(0,a.eJ)(!1),[L,A]=(0,a.eJ)(!1),D=(0,o.qo)({control:e.control,name:"config.authType",defaultValue:["simple"]});return a.ZP.createElement(a.ZP.Fragment,null,r&&a.ZP.createElement(s.v,{title:h("connectionAndAuthenticationSettings"),description:E("ldapConnectionAndAuthorizationSettingsDescription"),showDescription:b}),a.ZP.createElement(d.N,{role:"manage-realm",isHorizontal:!0},a.ZP.createElement(n.cw,{label:h("connectionURL"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:consoleDisplayConnectionUrlHelp",fieldLabelId:"user-federation:connectionURL"}),fieldId:"kc-console-connection-url",isRequired:!0,validated:e.errors.config?.connectionUrl?.[0]?"error":"default",helperTextInvalid:e.errors.config?.connectionUrl?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",id:"kc-console-connection-url","data-testid":"ldap-connection-url",name:"config.connectionUrl[0]",ref:e.register({required:{value:!0,message:`${h("validateConnectionUrl")}`}}),validated:e.errors.config?.connectionUrl?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:h("enableStartTls"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:enableStartTlsHelp",fieldLabelId:"user-federation:enableStartTls"}),fieldId:"kc-enable-start-tls",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.startTls",defaultValue:["false"],control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-enable-start-tls","data-testid":"enable-start-tls",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:h("common:on"),labelOff:h("common:off")})})),a.ZP.createElement(n.cw,{label:h("useTruststoreSpi"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:useTruststoreSpiHelp",fieldLabelId:"user-federation:useTruststoreSpi"}),fieldId:"kc-use-truststore-spi"},a.ZP.createElement(o.Qr,{name:"config.useTruststoreSpi[0]",control:e.control,defaultValue:"ldapsOnly",render:({onChange:e,value:t})=>a.ZP.createElement(n.Ph,{toggleId:"kc-use-truststore-spi",onToggle:()=>w(!S),isOpen:S,onSelect:(t,r)=>{e(r.toString()),w(!1)},selections:t},a.ZP.createElement(n.$m,{value:"always"},h("always")),a.ZP.createElement(n.$m,{value:"ldapsOnly"},h("onlyLdaps")),a.ZP.createElement(n.$m,{value:"never"},h("never")))})),a.ZP.createElement(n.cw,{label:h("connectionPooling"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:connectionPoolingHelp",fieldLabelId:"user-federation:connectionPooling"}),fieldId:"kc-connection-pooling",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.connectionPooling",defaultValue:["false"],control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-connection-pooling","data-testid":"connection-pooling",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:h("common:on"),labelOff:h("common:off")})})),a.ZP.createElement(n.cw,{label:h("connectionTimeout"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:connectionTimeoutHelp",fieldLabelId:"user-federation:consoleTimeout"}),fieldId:"kc-console-connection-timeout"},a.ZP.createElement(g.F,{type:"number",min:0,id:"kc-console-connection-timeout","data-testid":"connection-timeout",name:"config.connectionTimeout[0]",ref:e.register})),a.ZP.createElement(n.cw,{fieldId:"kc-test-connection-button"},a.ZP.createElement(n.zx,{variant:"secondary",id:"kc-test-connection-button","data-testid":"test-connection-button",onClick:()=>T("testConnection")},h("common:testConnection"))),a.ZP.createElement(n.cw,{label:h("bindType"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:bindTypeHelp",fieldLabelId:"user-federation:bindType"}),fieldId:"kc-bind-type",isRequired:!0},a.ZP.createElement(o.Qr,{name:"config.authType[0]",defaultValue:"simple",control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.Ph,{toggleId:"kc-bind-type",required:!0,onToggle:()=>A(!L),isOpen:L,onSelect:(t,r)=>{e(r),A(!1)},selections:t,variant:n.TM.single,"data-testid":"ldap-bind-type"},a.ZP.createElement(n.$m,{value:"simple"}),a.ZP.createElement(n.$m,{value:"none"}))})),(0,c.Xy)(D,["simple"])&&a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(n.cw,{label:h("bindDn"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:bindDnHelp",fieldLabelId:"user-federation:bindDn"}),fieldId:"kc-console-bind-dn",helperTextInvalid:h("validateBindDn"),validated:e.errors.config?.bindDn?n.LD.error:n.LD.default,isRequired:!0},a.ZP.createElement(g.F,{type:"text",id:"kc-console-bind-dn","data-testid":"ldap-bind-dn",name:"config.bindDn[0]",ref:e.register({required:!0}),validated:e.errors.config?.bindDn?n.LD.error:n.LD.default})),a.ZP.createElement(n.cw,{label:h("bindCredentials"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:bindCredentialsHelp",fieldLabelId:"user-federation:bindCredentials"}),fieldId:"kc-console-bind-credentials",helperTextInvalid:h("validateBindCredentials"),validated:e.errors.config?.bindCredential?n.LD.error:n.LD.default,isRequired:!0},a.ZP.createElement(u.W,{hasReveal:!I,isRequired:!0,id:"kc-console-bind-credentials","data-testid":"ldap-bind-credentials",name:"config.bindCredential[0]",ref:e.register({required:!0}),validated:e.errors.config?.bindCredential?n.LD.error:n.LD.default}))),a.ZP.createElement(n.cw,{fieldId:"kc-test-auth-button"},a.ZP.createElement(n.zx,{variant:"secondary",id:"kc-test-auth-button","data-testid":"test-auth-button",onClick:()=>T("testAuthentication")},h("testAuthentication")))))},E=({id:e,form:t,showSectionHeading:r=!1,showSectionDescription:c=!1})=>{const{t:u}=(0,l.$G)("user-federation"),{t:g}=(0,l.$G)("user-federation-help"),{adminClient:b}=(0,m.K3)(),{realm:h}=(0,f.PL)(),{addAlert:E,addError:Z}=(0,p.Z7)();return a.ZP.createElement(a.ZP.Fragment,null,r&&a.ZP.createElement(s.v,{title:u("advancedSettings"),description:g("ldapAdvancedSettingsDescription"),showDescription:c}),a.ZP.createElement(d.N,{role:"manage-realm",isHorizontal:!0},a.ZP.createElement(n.cw,{label:u("enableLdapv3Password"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:enableLdapv3PasswordHelp",fieldLabelId:"user-federation:enableLdapv3Password"}),fieldId:"kc-enable-ldapv3-password",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.usePasswordModifyExtendedOp",defaultValue:["false"],control:t.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-enable-ldapv3-password","data-testid":"ldapv3-password",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:u("common:on"),labelOff:u("common:off")})})),a.ZP.createElement(n.cw,{label:u("validatePasswordPolicy"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:validatePasswordPolicyHelp",fieldLabelId:"user-federation:validatePasswordPolicy"}),fieldId:"kc-validate-password-policy",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.validatePasswordPolicy",defaultValue:["false"],control:t.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-validate-password-policy","data-testid":"password-policy",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:u("common:on"),labelOff:u("common:off")})})),a.ZP.createElement(n.cw,{label:u("trustEmail"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:trustEmailHelp",fieldLabelId:"user-federation:trustEmail"}),fieldId:"kc-trust-email",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.trustEmail",defaultValue:["false"],control:t.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-trust-email","data-testid":"trust-email",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:u("common:on"),labelOff:u("common:off")})})),a.ZP.createElement(n.cw,{fieldId:"query-extensions"},a.ZP.createElement(n.zx,{variant:"secondary",id:"query-extensions","data-testid":"query-extensions",onClick:async()=>{if(await t.trigger())try{const r=P(t),a=await b.realms.ldapServerCapabilities({realm:h},{...r,componentId:e});E(u("testSuccess"));const n=a.filter((e=>"1.3.6.1.4.1.4203.1.11.1"===e.oid));t.setValue("config.usePasswordModifyExtendedOp",[(n.length>0).toString()])}catch(e){Z("user-federation:testError",e)}}},u("queryExtensions")))))},Z=({form:e,showSectionHeading:t=!1,showSectionDescription:r=!1})=>{const{t:c}=(0,l.$G)("user-federation"),{t:u}=(0,l.$G)("user-federation-help"),m=(0,o.qo)({control:e.control,name:"config.allowKerberosAuthentication",defaultValue:["false"]});return a.ZP.createElement(a.ZP.Fragment,null,t&&a.ZP.createElement(s.v,{title:c("kerberosIntegration"),description:u("ldapKerberosSettingsDescription"),showDescription:r}),a.ZP.createElement(d.N,{role:"manage-realm",isHorizontal:!0},a.ZP.createElement(n.cw,{label:c("allowKerberosAuthentication"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:allowKerberosAuthenticationHelp",fieldLabelId:"user-federation:allowKerberosAuthentication"}),fieldId:"kc-allow-kerberos-authentication",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.allowKerberosAuthentication",defaultValue:["false"],control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-allow-kerberos-authentication","data-testid":"allow-kerberos-auth",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:c("common:on"),labelOff:c("common:off")})})),"true"===m[0]&&a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(n.cw,{label:c("kerberosRealm"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:kerberosRealmHelp",fieldLabelId:"user-federation:kerberosRealm"}),fieldId:"kc-kerberos-realm",isRequired:!0,validated:e.errors.config?.kerberosRealm?.[0]?"error":"default",helperTextInvalid:e.errors.config?.kerberosRealm?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",id:"kc-kerberos-realm",name:"config.kerberosRealm[0]",ref:e.register({required:{value:!0,message:`${c("validateRealm")}`}}),"data-testid":"kerberos-realm",validated:e.errors.config?.kerberosRealm?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("serverPrincipal"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:serverPrincipalHelp",fieldLabelId:"user-federation:serverPrincipal"}),fieldId:"kc-server-principal",isRequired:!0,validated:e.errors.config?.serverPrincipal?.[0]?"error":"default",helperTextInvalid:e.errors.config?.serverPrincipal?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",id:"kc-server-principal",name:"config.serverPrincipal[0]",ref:e.register({required:{value:!0,message:`${c("validateServerPrincipal")}`}}),"data-testid":"kerberos-principal",validated:e.errors.config?.serverPrincipal?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("keyTab"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:keyTabHelp",fieldLabelId:"user-federation:keyTab"}),fieldId:"kc-key-tab",isRequired:!0,validated:e.errors.config?.keyTab?.[0]?"error":"default",helperTextInvalid:e.errors.config?.keyTab?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",id:"kc-key-tab",name:"config.keyTab[0]",ref:e.register({required:{value:!0,message:`${c("validateKeyTab")}`}}),"data-testid":"kerberos-keytab",validated:e.errors.config?.keyTab?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("debug"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:debugHelp",fieldLabelId:"user-federation:debug"}),fieldId:"kc-debug",hasNoPaddingTop:!0}," ",a.ZP.createElement(o.Qr,{name:"config.debug",defaultValue:["false"],control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-debug","data-testid":"debug",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:c("common:on"),labelOff:c("common:off")})}))),a.ZP.createElement(n.cw,{label:c("useKerberosForPasswordAuthentication"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:useKerberosForPasswordAuthenticationHelp",fieldLabelId:"user-federation:useKerberosForPasswordAuthentication"}),fieldId:"kc-use-kerberos-password-authentication",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.useKerberosForPasswordAuthentication",defaultValue:["false"],control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-use-kerberos-password-authentication","data-testid":"use-kerberos-pw-auth",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:c("common:on"),labelOff:c("common:off")})}))))};var v=r(5436);const y=({form:e,showSectionHeading:t=!1,showSectionDescription:r=!1})=>{const{t:c}=(0,l.$G)("user-federation"),{t:u}=(0,l.$G)("user-federation-help"),m=e.watch("config.periodicFullSync",!1),f=e.watch("config.periodicChangedUsersSync",!1);return a.ZP.createElement(a.ZP.Fragment,null,t&&a.ZP.createElement(s.v,{title:c("synchronizationSettings"),description:u("ldapSynchronizationSettingsDescription"),showDescription:r}),a.ZP.createElement(d.N,{role:"manage-realm",isHorizontal:!0},a.ZP.createElement(n.cw,{hasNoPaddingTop:!0,label:c("importUsers"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:importUsersHelp",fieldLabelId:"user-federation:importUsers"}),fieldId:"kc-import-users"},a.ZP.createElement(o.Qr,{name:"config.importEnabled",defaultValue:["true"],control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-import-users","data-testid":"import-users",name:"importEnabled",label:c("common:on"),labelOff:c("common:off"),onChange:t=>e([`${t}`]),isChecked:"true"===t[0],isDisabled:!1})})),a.ZP.createElement(n.cw,{label:c("batchSize"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:batchSizeHelp",fieldLabelId:"user-federation:batchSize"}),fieldId:"kc-batch-size"},a.ZP.createElement(g.F,{type:"number",min:0,id:"kc-batch-size","data-testid":"batch-size",name:"config.batchSizeForSync[0]",ref:e.register})),a.ZP.createElement(n.cw,{label:c("periodicFullSync"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:periodicFullSyncHelp",fieldLabelId:"user-federation:periodicFullSync"}),fieldId:"kc-periodic-full-sync",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.periodicFullSync",defaultValue:!1,control:e.control,render:({onChange:t,value:r})=>a.ZP.createElement(n.rs,{id:"kc-periodic-full-sync","data-testid":"periodic-full-sync",isDisabled:!1,onChange:e=>t(e),isChecked:!0===r,label:c("common:on"),labelOff:c("common:off"),ref:e.register})})),m&&a.ZP.createElement(n.cw,{hasNoPaddingTop:!0,label:c("fullSyncPeriod"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:fullSyncPeriodHelp",fieldLabelId:"user-federation:fullSyncPeriod"}),fieldId:"kc-full-sync-period"},a.ZP.createElement(g.F,{type:"number",min:-1,defaultValue:604800,id:"kc-full-sync-period","data-testid":"full-sync-period",name:"config.fullSyncPeriod[0]",ref:e.register})),a.ZP.createElement(n.cw,{label:c("periodicChangedUsersSync"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:periodicChangedUsersSyncHelp",fieldLabelId:"user-federation:periodicChangedUsersSync"}),fieldId:"kc-periodic-changed-users-sync",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.periodicChangedUsersSync",defaultValue:!1,control:e.control,render:({onChange:t,value:r})=>a.ZP.createElement(n.rs,{id:"kc-periodic-changed-users-sync","data-testid":"periodic-changed-users-sync",isDisabled:!1,onChange:e=>t(e),isChecked:!0===r,label:c("common:on"),labelOff:c("common:off"),ref:e.register})})),f&&a.ZP.createElement(n.cw,{label:c("changedUsersSyncPeriod"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:changedUsersSyncHelp",fieldLabelId:"user-federation:changedUsersSyncPeriod"}),fieldId:"kc-changed-users-sync-period",hasNoPaddingTop:!0},a.ZP.createElement(g.F,{type:"number",min:-1,defaultValue:86400,id:"kc-changed-users-sync-period","data-testid":"changed-users-sync-period",name:"config.changedSyncPeriod[0]",ref:e.register}))))},k=({form:e,showSectionHeading:t=!1,showSectionDescription:r=!1,vendorEdit:c=!1})=>{const{t:u}=(0,l.$G)("user-federation"),{t:p}=(0,l.$G)("user-federation-help"),{adminClient:b}=(0,m.K3)(),{realm:P}=(0,f.PL)();(0,m.ib)((()=>b.realms.findOne({realm:P})),(t=>e.setValue("parentId",t.id)),[]);const[h,E]=(0,a.eJ)(!1);return a.ZP.createElement(a.ZP.Fragment,null,t&&a.ZP.createElement(s.v,{title:u("generalOptions"),description:p("ldapGeneralOptionsSettingsDescription"),showDescription:r}),a.ZP.createElement(d.N,{role:"manage-realm",isHorizontal:!0},a.ZP.createElement(n.cw,{label:u("consoleDisplayName"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:consoleDisplayNameHelp",fieldLabelId:"user-federation:consoleDisplayName"}),fieldId:"kc-console-display-name",isRequired:!0,validated:e.errors.name?"error":"default",helperTextInvalid:e.errors.name?.message},a.ZP.createElement(g.F,{hidden:!0,type:"text",id:"kc-console-provider-id",name:"providerId",defaultValue:"ldap",ref:e.register}),a.ZP.createElement(g.F,{hidden:!0,type:"text",id:"kc-console-provider-type",name:"providerType",defaultValue:"org.keycloak.storage.UserStorageProvider",ref:e.register}),a.ZP.createElement(g.F,{hidden:!0,type:"text",id:"kc-console-parentId",name:"parentId",defaultValue:P,ref:e.register}),a.ZP.createElement(g.F,{isRequired:!0,type:"text",id:"kc-console-display-name",name:"name",defaultValue:"ldap",ref:e.register({required:{value:!0,message:`${u("validateName")}`}}),"data-testid":"ldap-name",validated:e.errors.name?"error":"default"})),a.ZP.createElement(n.cw,{label:u("vendor"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:vendorHelp",fieldLabelId:"user-federation:vendor"}),fieldId:"kc-vendor",isRequired:!0},a.ZP.createElement(o.Qr,{name:"config.vendor[0]",defaultValue:"ad",control:e.control,render:({onChange:t,value:r})=>a.ZP.createElement(n.Ph,{isDisabled:!!c,toggleId:"kc-vendor",required:!0,onToggle:()=>E(!h),isOpen:h,onSelect:(r,a)=>{t(a),E(!1),(()=>{switch(e.getValues("config.vendor[0]")){case"ad":e.setValue("config.usernameLDAPAttribute[0]","cn"),e.setValue("config.rdnLDAPAttribute[0]","cn"),e.setValue("config.uuidLDAPAttribute[0]","objectGUID"),e.setValue("config.userObjectClasses[0]","person, organizationalPerson, user");break;case"rhds":e.setValue("config.usernameLDAPAttribute[0]","uid"),e.setValue("config.rdnLDAPAttribute[0]","uid"),e.setValue("config.uuidLDAPAttribute[0]","nsuniqueid"),e.setValue("config.userObjectClasses[0]","inetOrgPerson, organizationalPerson");break;case"tivoli":e.setValue("config.usernameLDAPAttribute[0]","uid"),e.setValue("config.rdnLDAPAttribute[0]","uid"),e.setValue("config.uuidLDAPAttribute[0]","uniqueidentifier"),e.setValue("config.userObjectClasses[0]","inetOrgPerson, organizationalPerson");break;case"edirectory":e.setValue("config.usernameLDAPAttribute[0]","uid"),e.setValue("config.rdnLDAPAttribute[0]","uid"),e.setValue("config.uuidLDAPAttribute[0]","guid"),e.setValue("config.userObjectClasses[0]","inetOrgPerson, organizationalPerson");break;case"other":e.setValue("config.usernameLDAPAttribute[0]","uid"),e.setValue("config.rdnLDAPAttribute[0]","uid"),e.setValue("config.uuidLDAPAttribute[0]","entryUUID"),e.setValue("config.userObjectClasses[0]","inetOrgPerson, organizationalPerson")}})()},selections:r,variant:n.TM.single},a.ZP.createElement(n.$m,{key:0,value:"ad",isPlaceholder:!0},"Active Directory"),a.ZP.createElement(n.$m,{key:1,value:"rhds"},"Red Hat Directory Server"),a.ZP.createElement(n.$m,{key:2,value:"tivoli"},"Tivoli"),a.ZP.createElement(n.$m,{key:3,value:"edirectory"},"Novell eDirectory"),a.ZP.createElement(n.$m,{key:4,value:"other"},"Other"))}))))},I=({form:e,showSectionHeading:t=!1,showSectionDescription:r=!1})=>{const{t:c}=(0,l.$G)("user-federation"),{t:u}=(0,l.$G)("user-federation-help"),[m,f]=(0,a.eJ)(!1),[p,b]=(0,a.eJ)(!1);return a.ZP.createElement(a.ZP.Fragment,null,t&&a.ZP.createElement(s.v,{title:c("ldapSearchingAndUpdatingSettings"),description:u("ldapSearchingAndUpdatingSettingsDescription"),showDescription:r}),a.ZP.createElement(d.N,{role:"manage-realm",isHorizontal:!0},a.ZP.createElement(n.cw,{label:c("editMode"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:editModeLdapHelp",fieldLabelId:"user-federation:editMode"}),fieldId:"kc-edit-mode",isRequired:!0,validated:e.errors.config?.editMode?.[0]?"error":"default",helperTextInvalid:e.errors.config?.editMode?.[0].message},a.ZP.createElement(o.Qr,{name:"config.editMode[0]",defaultValue:"",control:e.control,rules:{required:{value:!0,message:c("validateEditMode")}},render:({onChange:t,value:r})=>a.ZP.createElement(n.Ph,{toggleId:"kc-edit-mode",required:!0,onToggle:()=>b(!p),isOpen:p,onSelect:(e,r)=>{t(r.toString()),b(!1)},selections:r,variant:n.TM.single,validated:e.errors.config?.editMode?.[0]?"error":"default"},a.ZP.createElement(n.$m,{value:"",isPlaceholder:!0}),a.ZP.createElement(n.$m,{value:"READ_ONLY"}),a.ZP.createElement(n.$m,{value:"WRITABLE"}),a.ZP.createElement(n.$m,{value:"UNSYNCED"}))})),a.ZP.createElement(n.cw,{label:c("usersDN"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:usersDNHelp",fieldLabelId:"user-federation:usersDn"}),fieldId:"kc-console-users-dn",isRequired:!0,validated:e.errors.config?.usersDn?.[0]?"error":"default",helperTextInvalid:e.errors.config?.usersDn?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",defaultValue:"",id:"kc-console-users-dn","data-testid":"ldap-users-dn",name:"config.usersDn[0]",ref:e.register({required:{value:!0,message:`${c("validateUsersDn")}`}}),validated:e.errors.config?.usersDn?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("usernameLdapAttribute"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:usernameLdapAttributeHelp",fieldLabelId:"user-federation:usernameLdapAttribute"}),fieldId:"kc-username-ldap-attribute",isRequired:!0,validated:e.errors.config?.usernameLDAPAttribute?.[0]?"error":"default",helperTextInvalid:e.errors.config?.usernameLDAPAttribute?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",defaultValue:"cn",id:"kc-username-ldap-attribute","data-testid":"ldap-username-attribute",name:"config.usernameLDAPAttribute[0]",ref:e.register({required:{value:!0,message:`${c("validateUsernameLDAPAttribute")}`}}),validated:e.errors.config?.usernameLDAPAttribute?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("rdnLdapAttribute"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:rdnLdapAttributeHelp",fieldLabelId:"user-federation:rdnLdapAttribute"}),fieldId:"kc-rdn-ldap-attribute",isRequired:!0,validated:e.errors.config?.rdnLDAPAttribute?.[0]?"error":"default",helperTextInvalid:e.errors.config?.rdnLDAPAttribute?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",defaultValue:"cn",id:"kc-rdn-ldap-attribute","data-testid":"ldap-rdn-attribute",name:"config.rdnLDAPAttribute[0]",ref:e.register({required:{value:!0,message:`${c("validateRdnLdapAttribute")}`}}),validated:e.errors.config?.rdnLDAPAttribute?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("uuidLdapAttribute"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:uuidLdapAttributeHelp",fieldLabelId:"user-federation:uuidLdapAttribute"}),fieldId:"kc-uuid-ldap-attribute",isRequired:!0,validated:e.errors.config?.uuidLDAPAttribute?.[0]?"error":"default",helperTextInvalid:e.errors.config?.uuidLDAPAttribute?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",defaultValue:"objectGUID",id:"kc-uuid-ldap-attribute","data-testid":"ldap-uuid-attribute",name:"config.uuidLDAPAttribute[0]",ref:e.register({required:{value:!0,message:`${c("validateUuidLDAPAttribute")}`}}),validated:e.errors.config?.uuidLDAPAttribute?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("userObjectClasses"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:userObjectClassesHelp",fieldLabelId:"user-federation:userObjectClasses"}),fieldId:"kc-user-object-classes",isRequired:!0,validated:e.errors.config?.userObjectClasses?.[0]?"error":"default",helperTextInvalid:e.errors.config?.userObjectClasses?.[0].message},a.ZP.createElement(g.F,{isRequired:!0,type:"text",defaultValue:"person, organizationalPerson, user",id:"kc-user-object-classes","data-testid":"ldap-user-object-classes",name:"config.userObjectClasses[0]",ref:e.register({required:{value:!0,message:`${c("validateUserObjectClasses")}`}}),validated:e.errors.config?.userObjectClasses?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("userLdapFilter"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:userLdapFilterHelp",fieldLabelId:"user-federation:userLdapFilter"}),fieldId:"kc-user-ldap-filter",validated:e.errors.config?.customUserSearchFilter?.[0]?"error":"default",helperTextInvalid:e.errors.config?.customUserSearchFilter?.[0].message},a.ZP.createElement(g.F,{type:"text",id:"kc-user-ldap-filter","data-testid":"user-ldap-filter",name:"config.customUserSearchFilter[0]",ref:e.register({pattern:{value:/(\(.*\))$/,message:`${c("validateCustomUserSearchFilter")}`}}),validated:e.errors.config?.customUserSearchFilter?.[0]?"error":"default"})),a.ZP.createElement(n.cw,{label:c("searchScope"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:searchScopeHelp",fieldLabelId:"user-federation:searchScope"}),fieldId:"kc-search-scope"},a.ZP.createElement(o.Qr,{name:"config.searchScope[0]",defaultValue:"",control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.Ph,{toggleId:"kc-search-scope",required:!0,onToggle:()=>f(!m),isOpen:m,onSelect:(t,r)=>{e(r),f(!1)},selections:t,variant:n.TM.single},a.ZP.createElement(n.$m,{key:0,value:"1",isPlaceholder:!0},c("oneLevel")),a.ZP.createElement(n.$m,{key:1,value:"2"},c("subtree")))})),a.ZP.createElement(n.cw,{label:c("readTimeout"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:readTimeoutHelp",fieldLabelId:"user-federation:readTimeout"}),fieldId:"kc-read-timeout"},a.ZP.createElement(g.F,{type:"number",min:0,id:"kc-read-timeout","data-testid":"ldap-read-timeout",name:"config.readTimeout[0]",ref:e.register})),a.ZP.createElement(n.cw,{label:c("pagination"),labelIcon:a.ZP.createElement(i.B,{helpText:"user-federation-help:paginationHelp",fieldLabelId:"user-federation:pagination"}),fieldId:"kc-console-pagination",hasNoPaddingTop:!0},a.ZP.createElement(o.Qr,{name:"config.pagination",defaultValue:["false"],control:e.control,render:({onChange:e,value:t})=>a.ZP.createElement(n.rs,{id:"kc-console-pagination","data-testid":"console-pagination",isDisabled:!1,onChange:t=>e([`${t}`]),isChecked:"true"===t[0],label:c("common:on"),labelOff:c("common:off")})}))))};var T=r(2954),S=r(3328),w=r(2265),L=(r(5623),r(192)),A=r(1586),D=r(9766),C=r(3227);const x=()=>{const e=(0,T.k6)(),{t}=(0,l.$G)("user-federation"),{adminClient:r}=(0,m.K3)(),{addAlert:i,addError:o}=(0,p.Z7)(),{url:d}=(0,T.$B)(),[s,c]=(0,a.eJ)(0),[u,f]=(0,a.eJ)([]),g=(0,C.Z)(),{id:b}=(0,T.UO)(),[P,h]=(0,a.eJ)();(0,m.ib)((()=>r.components.find({parent:b,type:"org.keycloak.storage.ldap.mappers.LDAPStorageMapper"})),(e=>{f(g(e.map((e=>({...e,name:e.name,type:e.providerId}))),(0,C.x)("name")))}),[s]);const[E,Z]=(0,D.W)({titleKey:t("common:deleteMappingTitle",{mapperId:P?.id}),messageKey:"common:deleteMappingConfirm",continueButtonLabel:"common:delete",continueButtonVariant:n.Wu.danger,onConfirm:async()=>{try{await r.components.del({id:P.id}),c(s+1),i(t("common:mappingDeletedSuccess"),n.Ux.success),h(void 0)}catch(e){o("common:mappingDeletedError",e)}}});return a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(Z,null),a.ZP.createElement(L.B,{key:s,loader:u,ariaLabelKey:"ldapMappersList",searchPlaceholderKey:"common:searchForMapper",toolbarItem:a.ZP.createElement(n.Eg,null,a.ZP.createElement(n.zx,{"data-testid":"add-mapper-btn",variant:"primary",onClick:()=>e.push(`${d}/new`)},t("common:addMapper"))),actions:[{title:t("common:delete"),onRowClick:e=>{h(e),E()}}],columns:[{name:"name",cellRenderer:e=>{return a.ZP.createElement(T.rU,{to:`${t=d,t.includes("/mappers")?`${t}`:`${t}/mappers`}/${e.id}`},e.name);var t}},{name:"type"}],emptyState:a.ZP.createElement(A.M,{message:t("common:emptyMappers"),instructions:t("common:emptyMappersInstructions"),primaryActionText:t("common:emptyPrimaryAction"),onPrimaryAction:()=>e.push(`${d}/new`)})}))};var $=r(248),V=r(3377);const F=({save:e})=>{const{t}=(0,l.$G)("user-federation"),r=(0,o.Gc)(),{id:i}=(0,T.UO)(),d=(0,T.k6)(),{realm:s}=(0,f.PL)();return a.ZP.createElement(a.ZP.Fragment,null,a.ZP.createElement(S.W,{sections:[{title:t("generalOptions"),panel:a.ZP.createElement(k,{form:r,vendorEdit:!!i})},{title:t("connectionAndAuthenticationSettings"),panel:a.ZP.createElement(h,{form:r,id:i})},{title:t("ldapSearchingAndUpdatingSettings"),panel:a.ZP.createElement(I,{form:r})},{title:t("synchronizationSettings"),panel:a.ZP.createElement(y,{form:r})},{title:t("kerberosIntegration"),panel:a.ZP.createElement(Z,{form:r})},{title:t("cacheSettings"),panel:a.ZP.createElement(v.S,{form:r})},{title:t("advancedSettings"),panel:a.ZP.createElement(E,{form:r,id:i})}]}),a.ZP.createElement(n.l0,{onSubmit:r.handleSubmit(e)},a.ZP.createElement(n.WK,{className:"keycloak__form_actions"},a.ZP.createElement(n.zx,{isDisabled:!r.formState.isDirty,variant:"primary",type:"submit","data-testid":"ldap-save"},t("common:save")),a.ZP.createElement(n.zx,{variant:"link",onClick:()=>d.push((0,$.d)({realm:s})),"data-testid":"ldap-cancel"},t("common:cancel")))))};function q(){const{t:e}=(0,l.$G)("user-federation"),t=(0,o.cI)({mode:"onChange"}),r=(0,T.k6)(),{adminClient:i}=(0,m.K3)(),{realm:d}=(0,f.PL)(),{id:s}=(0,T.UO)(),{addAlert:c,addError:u}=(0,p.Z7)(),[g,b]=(0,a.eJ)(),[P,h]=(0,a.eJ)(0),E=g?.config?.editMode;(0,m.ib)((async()=>{if(s)return await i.components.findOne({id:s})}),(t=>{if(t)Z(t),b(t);else if(s)throw new Error(e("common:notFound"))}),[P]);const Z=e=>{t.reset({...e}),t.setValue("config.periodicChangedUsersSync","-1"!==e.config?.changedSyncPeriod[0]),t.setValue("config.periodicFullSync","-1"!==e.config?.fullSyncPeriod[0])},v=async t=>{void 0!==t.config?.periodicChangedUsersSync&&(!1===t.config.periodicChangedUsersSync&&(t.config.changedSyncPeriod=["-1"]),delete t.config.periodicChangedUsersSync),void 0!==t.config?.periodicFullSync&&(!1===t.config.periodicFullSync&&(t.config.fullSyncPeriod=["-1"]),delete t.config.periodicFullSync);try{s?await i.components.update({id:s},t):(await i.components.create(t),r.push((0,$.d)({realm:d}))),c(e(s?"saveSuccess":"createSuccess"),n.Ux.success),h((e=>e+1))}catch(e){u("user-federation:"+(s?"saveError":"createError"),e)}};return a.ZP.createElement(o.RV,{...t},a.ZP.createElement(V.S,{provider:"LDAP",noDivider:!0,editMode:E,save:()=>t.handleSubmit(v)()}),a.ZP.createElement(n.NP,{variant:"light",className:"pf-u-p-0"},s?a.ZP.createElement(w.n,{isBox:!0},a.ZP.createElement(n.OK,{id:"settings",eventKey:"settings",title:a.ZP.createElement(n.TP,null,e("common:settings"))},a.ZP.createElement(n.NP,{variant:"light"},a.ZP.createElement(F,{save:v}))),a.ZP.createElement(n.OK,{id:"mappers",eventKey:"mappers",title:a.ZP.createElement(n.TP,null,e("common:mappers")),"data-testid":"ldap-mappers-tab"},a.ZP.createElement(x,null))):a.ZP.createElement(n.NP,{variant:"light"},a.ZP.createElement(F,{save:v}))))}}}]);