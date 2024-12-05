"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[333],{333:(e,t,n)=>{n.d(t,{qk:()=>et,c7:()=>er,KR:()=>en,D:()=>ee});var r,s,o=n(1972),i=n(2213),a=n(7086);let l="firebasestorage.googleapis.com",u="storageBucket";class h extends i.g{constructor(e,t,n=0){super(c(e),`Firebase Storage: ${t} (${c(e)})`),this.status_=n,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,h.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return c(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}function c(e){return"storage/"+e}function d(){return new h(r.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function p(e){return new h(r.INVALID_ARGUMENT,e)}function _(){return new h(r.APP_DELETED,"The Firebase app was deleted.")}function f(e,t){return new h(r.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function g(e){throw new h(r.INTERNAL_ERROR,"Internal error: "+e)}!function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"}(r||(r={}));class m{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return 0===this.path.length}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let n;try{n=m.makeFromUrl(e,t)}catch(t){return new m(e,"")}if(""===n.path)return n;throw new h(r.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}static makeFromUrl(e,t){let n=null,s="([A-Za-z0-9.\\-_]+)",o=RegExp("^gs://"+s+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}let a=t.replace(/[.]/g,"\\."),u=RegExp(`^https?://${a}/v[A-Za-z0-9_]+/b/${s}/o(/([^?#]*).*)?$`,"i"),c=t===l?"(?:storage.googleapis.com|storage.cloud.google.com)":t,d=[{regex:o,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:u,indices:{bucket:1,path:3},postModify:i},{regex:RegExp(`^https?://${c}/${s}/([^?#]*)`,"i"),indices:{bucket:1,path:2},postModify:i}];for(let t=0;t<d.length;t++){let r=d[t],s=r.regex.exec(e);if(s){let e=s[r.indices.bucket],t=s[r.indices.path];t||(t=""),n=new m(e,t),r.postModify(n);break}}if(null==n)throw new h(r.INVALID_URL,"Invalid URL '"+e+"'.");return n}}class b{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}function w(e){return"string"==typeof e||e instanceof String}function R(e){return E()&&e instanceof Blob}function E(){return"undefined"!=typeof Blob}function T(e,t,n,r){if(r<t)throw p(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw p(`Invalid value for '${e}'. Expected ${n} or less.`)}function k(e,t,n){let r=t;return null==n&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function A(e){let t=encodeURIComponent,n="?";for(let r in e)e.hasOwnProperty(r)&&(n=n+(t(r)+"=")+t(e[r])+"&");return n.slice(0,-1)}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(s||(s={}));class y{constructor(e,t,n,r,s,o,i,a,l,u,h,c=!0){this.url_=e,this.method_=t,this.headers_=n,this.body_=r,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=i,this.errorCallback_=a,this.timeout_=l,this.progressCallback_=u,this.connectionFactory_=h,this.retry=c,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((e,t)=>{this.resolve_=e,this.reject_=t,this.start_()})}start_(){let e=(e,t)=>{let n=this.resolve_,s=this.reject_,o=t.connection;if(t.wasSuccessCode)try{let e=this.callback_(o,o.getResponse());void 0!==e?n(e):n()}catch(e){s(e)}else if(null!==o){let e=d();e.serverResponse=o.getErrorText(),s(this.errorCallback_?this.errorCallback_(o,e):e)}else s(t.canceled?this.appDelete_?_():new h(r.CANCELED,"User canceled the upload/download."):new h(r.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))};this.canceled_?e(!1,new O(!1,null,!0)):this.backoffId_=function(e,t,n){let r=1,s=null,o=null,i=!1,a=0,l=!1;function u(...e){l||(l=!0,t.apply(null,e))}function h(t){s=setTimeout(()=>{s=null,e(d,2===a)},t)}function c(){o&&clearTimeout(o)}function d(e,...t){let n;if(l){c();return}if(e||2===a||i){c(),u.call(null,e,...t);return}r<64&&(r*=2),1===a?(a=2,n=0):n=(r+Math.random())*1e3,h(n)}let p=!1;function _(e){!p&&(p=!0,c(),!l&&(null!==s?(e||(a=2),clearTimeout(s),h(0)):e||(a=1)))}return h(0),o=setTimeout(()=>{i=!0,_(!0)},n),_}((e,t)=>{if(t){e(!1,new O(!1,null,!0));return}let n=this.connectionFactory_();this.pendingConnection_=n;let r=e=>{let t=e.loaded,n=e.lengthComputable?e.total:-1;null!==this.progressCallback_&&this.progressCallback_(t,n)};null!==this.progressCallback_&&n.addUploadProgressListener(r),n.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{null!==this.progressCallback_&&n.removeUploadProgressListener(r),this.pendingConnection_=null;let t=n.getErrorCode()===s.NO_ERROR,o=n.getStatus();if(!t||function(e,t){let n=e>=500&&e<600,r=-1!==[408,429].indexOf(e),s=-1!==t.indexOf(e);return n||r||s}(o,this.additionalRetryCodes_)&&this.retry){e(!1,new O(!1,null,n.getErrorCode()===s.ABORT));return}e(!0,new O(-1!==this.successCodes_.indexOf(o),n))})},e,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingConnection_&&this.pendingConnection_.abort()}}class O{constructor(e,t,n){this.wasSuccessCode=e,this.connection=t,this.canceled=!!n}}function U(...e){let t="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==t){let n=new t;for(let t=0;t<e.length;t++)n.append(e[t]);return n.getBlob()}if(E())return new Blob(e);throw new h(r.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}let N={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class I{constructor(e,t){this.data=e,this.contentType=t||null}}function v(e){let t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);r<=127?t.push(r):r<=2047?t.push(192|r>>6,128|63&r):(64512&r)==55296?n<e.length-1&&(64512&e.charCodeAt(n+1))==56320?(r=65536|(1023&r)<<10|1023&e.charCodeAt(++n),t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|63&r)):t.push(239,191,189):(64512&r)==56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|63&r)}return new Uint8Array(t)}function C(e,t){let n;switch(e){case N.BASE64:{let n=-1!==t.indexOf("-"),r=-1!==t.indexOf("_");if(n||r)throw f(e,"Invalid character '"+(n?"-":"_")+"' found: is it base64url encoded?");break}case N.BASE64URL:{let n=-1!==t.indexOf("+"),r=-1!==t.indexOf("/");if(n||r)throw f(e,"Invalid character '"+(n?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}}try{n=function(e){if("undefined"==typeof atob)throw new h(r.UNSUPPORTED_ENVIRONMENT,"base-64 is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.");return atob(e)}(t)}catch(t){if(t.message.includes("polyfill"))throw t;throw f(e,"Invalid character found")}let s=new Uint8Array(n.length);for(let e=0;e<n.length;e++)s[e]=n.charCodeAt(e);return s}class x{constructor(e){this.base64=!1,this.contentType=null;let t=e.match(/^data:([^,]+)?,/);if(null===t)throw f(N.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let n=t[1]||null;null!=n&&(this.base64=function(e,t){return e.length>=t.length&&e.substring(e.length-t.length)===t}(n,";base64"),this.contentType=this.base64?n.substring(0,n.length-7):n),this.rest=e.substring(e.indexOf(",")+1)}}class D{constructor(e,t){let n=0,r="";R(e)?(this.data_=e,n=e.size,r=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),n=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),n=e.length),this.size_=n,this.type_=r}size(){return this.size_}type(){return this.type_}slice(e,t){if(!R(this.data_))return new D(new Uint8Array(this.data_.buffer,e,t-e),!0);{var n;let r=(n=this.data_).webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null;return null===r?null:new D(r)}}static getBlob(...e){if(E()){let t=e.map(e=>e instanceof D?e.data_:e);return new D(U.apply(null,t))}{let t=e.map(e=>w(e)?function(e,t){switch(e){case N.RAW:return new I(v(t));case N.BASE64:case N.BASE64URL:return new I(C(e,t));case N.DATA_URL:return new I(function(e){let t=new x(e);return t.base64?C(N.BASE64,t.rest):function(e){let t;try{t=decodeURIComponent(e)}catch(e){throw f(N.DATA_URL,"Malformed data URL.")}return v(t)}(t.rest)}(t),new x(t).contentType)}throw d()}(N.RAW,e).data:e.data_),n=0;t.forEach(e=>{n+=e.byteLength});let r=new Uint8Array(n),s=0;return t.forEach(e=>{for(let t=0;t<e.length;t++)r[s++]=e[t]}),new D(r,!0)}}uploadData(){return this.data_}}function L(e){var t;let n;try{n=JSON.parse(e)}catch(e){return null}return"object"!=typeof(t=n)||Array.isArray(t)?null:n}function P(e){let t=e.lastIndexOf("/",e.length-2);return -1===t?e:e.slice(t+1)}function S(e,t){return t}class B{constructor(e,t,n,r){this.server=e,this.local=t||e,this.writable=!!n,this.xform=r||S}}let F=null;function M(){if(F)return F;let e=[];e.push(new B("bucket")),e.push(new B("generation")),e.push(new B("metageneration")),e.push(new B("name","fullPath",!0));let t=new B("name");t.xform=function(e,t){return!w(t)||t.length<2?t:P(t)},e.push(t);let n=new B("size");return n.xform=function(e,t){return void 0!==t?Number(t):t},e.push(n),e.push(new B("timeCreated")),e.push(new B("updated")),e.push(new B("md5Hash",null,!0)),e.push(new B("cacheControl",null,!0)),e.push(new B("contentDisposition",null,!0)),e.push(new B("contentEncoding",null,!0)),e.push(new B("contentLanguage",null,!0)),e.push(new B("contentType",null,!0)),e.push(new B("metadata","customMetadata",!0)),F=e}function V(e,t,n){let r=L(t);return null===r?null:function(e,t,n){let r={};r.type="file";let s=n.length;for(let e=0;e<s;e++){let s=n[e];r[s.local]=s.xform(r,t[s.server])}return Object.defineProperty(r,"ref",{get:function(){let t=new m(r.bucket,r.fullPath);return e._makeStorageReference(t)}}),r}(e,r,n)}class K{constructor(e,t,n,r){this.url=e,this.method=t,this.handler=n,this.timeout=r,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}function $(e){if(!e)throw d()}function j(e){return function(t,n){var s,o;let i;return 401===t.getStatus()?i=t.getErrorText().includes("Firebase App Check token is invalid")?new h(r.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project."):new h(r.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(s=e.bucket,i=new h(r.QUOTA_EXCEEDED,"Quota for bucket '"+s+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(o=e.path,i=new h(r.UNAUTHORIZED,"User does not have permission to access '"+o+"'.")):i=n,i.status=t.getStatus(),i.serverResponse=n.serverResponse,i}}let q={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};class z{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=s.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=s.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=s.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,n,r){if(this.sent_)throw g("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==r)for(let e in r)r.hasOwnProperty(e)&&this.xhr_.setRequestHeader(e,r[e].toString());return void 0!==n?this.xhr_.send(n):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw g("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw g("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return -1}}getResponse(){if(!this.sent_)throw g("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw g("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)}}class H extends z{initXhr(){this.xhr_.responseType="text"}}function W(){return new H}class X{constructor(e,t){this._service=e,t instanceof m?this._location=t:this._location=m.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new X(e,t)}get root(){let e=new m(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return P(this._location.path)}get storage(){return this._service}get parent(){let e=function(e){if(0===e.length)return null;let t=e.lastIndexOf("/");return -1===t?"":e.slice(0,t)}(this._location.path);if(null===e)return null;let t=new m(this._location.bucket,e);return new X(this._service,t)}_throwIfRoot(e){if(""===this._location.path)throw new h(r.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}}function G(e,t){let n=null==t?void 0:t[u];return null==n?null:m.makeFromBucketSpec(n,e)}class Z{constructor(e,t,n,r,s){this.app=e,this._authProvider=t,this._appCheckProvider=n,this._url=r,this._firebaseVersion=s,this._bucket=null,this._host=l,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,null!=r?this._bucket=m.makeFromBucketSpec(r,this._host):this._bucket=G(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,null!=this._url?this._bucket=m.makeFromBucketSpec(this._url,e):this._bucket=G(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){T("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){T("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(null!==t)return t.accessToken}return null}async _getAppCheckToken(){let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new X(this,e)}_makeRequest(e,t,n,r,s=!0){if(this._deleted)return new b(_());{let o=function(e,t,n,r,s,o,i=!0){let a=A(e.urlParams),l=e.url+a,u=Object.assign({},e.headers);return t&&(u["X-Firebase-GMPID"]=t),null!==n&&n.length>0&&(u.Authorization="Firebase "+n),u["X-Firebase-Storage-Version"]="webjs/"+(null!=o?o:"AppManager"),null!==r&&(u["X-Firebase-AppCheck"]=r),new y(l,e.method,u,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,s,i)}(e,this._appId,n,r,t,this._firebaseVersion,s);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,t){let[n,r]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,n,r).getPromise()}}let J="@firebase/storage",Y="0.13.4",Q="storage";function ee(e,t,n){return function(e,t,n){e._throwIfRoot("uploadBytes");let s=function(e,t,n,s,o){var i,a;let l=t.bucketOnlyServerUrl(),u={"X-Goog-Upload-Protocol":"multipart"},c=function(){let e="";for(let t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();u["Content-Type"]="multipart/related; boundary="+c;let d=function(e,t,n){let r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),!r.contentType&&(r.contentType=t&&t.type()||"application/octet-stream"),r}(t,s,o),p="--"+c+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+function(e,t){let n={},r=t.length;for(let s=0;s<r;s++){let r=t[s];r.writable&&(n[r.server]=e[r.local])}return JSON.stringify(n)}(d,n)+"\r\n--"+c+"\r\nContent-Type: "+d.contentType+"\r\n\r\n",_=D.getBlob(p,s,"\r\n--"+c+"--");if(null===_)throw new h(r.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.");let f={name:d.fullPath},g=k(l,e.host,e._protocol),m=e.maxUploadRetryTime,b=new K(g,"POST",(i=e,a=n,function(e,t){let n=V(i,t,a);return $(null!==n),n}),m);return b.urlParams=f,b.headers=u,b.body=_.uploadData(),b.errorHandler=j(t),b}(e.storage,e._location,M(),new D(t,!0),n);return e.storage.makeRequestWithTokens(s,W).then(t=>({metadata:t,ref:e}))}(e=(0,i.Ku)(e),t,n)}function et(e){return function(e){e._throwIfRoot("getDownloadURL");let t=function(e,t,n){let s=new K(k(t.fullServerUrl(),e.host,e._protocol),"GET",function(t,r){let s=V(e,r,n);return $(null!==s),function(e,t,n,r){let s=L(t);if(null===s||!w(s.downloadTokens))return null;let o=s.downloadTokens;if(0===o.length)return null;let i=encodeURIComponent;return o.split(",").map(t=>{let s=e.bucket,o=e.fullPath;return k("/b/"+i(s)+"/o/"+i(o),n,r)+A({alt:"media",token:t})})[0]}(s,r,e.host,e._protocol)},e.maxOperationRetryTime);return s.errorHandler=function(e){let t=j(e);return function(n,s){let o=t(n,s);if(404===n.getStatus()){var i;i=e.path,o=new h(r.OBJECT_NOT_FOUND,"Object '"+i+"' does not exist.")}return o.serverResponse=s.serverResponse,o}}(t),s}(e.storage,e._location,M());return e.storage.makeRequestWithTokens(t,W).then(e=>{if(null===e)throw new h(r.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})}(e=(0,i.Ku)(e))}function en(e,t){return function(e,t){if(!(t&&/^[A-Za-z]+:\/\//.test(t)))return function e(t,n){if(t instanceof Z){if(null==t._bucket)throw new h(r.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+u+"' property when initializing the app?");let s=new X(t,t._bucket);return null!=n?e(s,n):s}return void 0!==n?function(e,t){let n=function(e,t){let n=t.split("/").filter(e=>e.length>0).join("/");return 0===e.length?n:e+"/"+n}(e._location.path,t),r=new m(e._location.bucket,n);return new X(e.storage,r)}(t,n):t}(e,t);if(e instanceof Z)return new X(e,t);throw p("To use ref(service, url), the first argument must be a Storage instance.")}(e=(0,i.Ku)(e),t)}function er(e=(0,o.Sx)(),t){e=(0,i.Ku)(e);let n=(0,o.j6)(e,Q).getImmediate({identifier:t}),r=(0,i.yU)("storage");return r&&function(e,t,n,r={}){!function(e,t,n,r={}){e.host=`${t}:${n}`,e._protocol="http";let{mockUserToken:s}=r;s&&(e._overrideAuthToken="string"==typeof s?s:(0,i.Fy)(s,e.app.options.projectId))}(e,t,n,r)}(n,...r),n}(0,o.om)(new a.uA(Q,function(e,{instanceIdentifier:t}){return new Z(e.getProvider("app").getImmediate(),e.getProvider("auth-internal"),e.getProvider("app-check-internal"),t,o.MF)},"PUBLIC").setMultipleInstances(!0)),(0,o.KO)(J,Y,""),(0,o.KO)(J,Y,"esm2017")}}]);