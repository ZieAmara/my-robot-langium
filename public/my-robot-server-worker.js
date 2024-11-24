"use strict";(()=>{var Nk=Object.create;var np=Object.defineProperty;var _k=Object.getOwnPropertyDescriptor;var Ik=Object.getOwnPropertyNames;var Pk=Object.getPrototypeOf,Ok=Object.prototype.hasOwnProperty;var jy=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),Dk=(t,e)=>{for(var r in e)np(t,r,{get:e[r],enumerable:!0})},Lk=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Ik(e))!Ok.call(t,i)&&i!==r&&np(t,i,{get:()=>e[i],enumerable:!(n=_k(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?Nk(Pk(t)):{},Lk(e||!t||!t.__esModule?np(r,"default",{value:t,enumerable:!0}):r,t));var Vn=H(sp=>{"use strict";Object.defineProperty(sp,"__esModule",{value:!0});var ip;function op(){if(ip===void 0)throw new Error("No runtime abstraction layer installed");return ip}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");ip=r}t.install=e})(op||(op={}));sp.default=op});var ap=H(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.Disposable=void 0;var Mk;(function(t){function e(r){return{dispose:r}}t.create=e})(Mk=Ea.Disposable||(Ea.Disposable={}))});var oo=H(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.Emitter=io.Event=void 0;var Fk=Vn(),Uk;(function(t){let e={dispose(){}};t.None=function(){return e}})(Uk=io.Event||(io.Event={}));var cp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,Fk.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},sl=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new cp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};io.Emitter=sl;sl._noop=function(){}});var Hy=H(al=>{"use strict";Object.defineProperty(al,"__esModule",{value:!0});al.AbstractMessageBuffer=void 0;var qk=13,Gk=10,jk=`\r
`,lp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let c=this._chunks[r];for(n=0;n<c.length;){switch(c[n]){case qk:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case Gk:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(jk);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let l=a[c],u=l.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,u),m=l.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};al.AbstractMessageBuffer=lp});var Wy=H(pp=>{"use strict";Object.defineProperty(pp,"__esModule",{value:!0});var Ky=Vn(),Ho=ap(),Hk=oo(),Kk=Hy(),cl=class t extends Kk.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};cl.emptyBuffer=new Uint8Array(0);var up=class{constructor(e){this.socket=e,this._onData=new Hk.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,Ky.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Ho.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ho.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ho.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},fp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Ho.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ho.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ho.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},Bk=new TextEncoder,By=Object.freeze({messageBuffer:Object.freeze({create:t=>new cl(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(Bk.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new up(t),asWritableStream:t=>new fp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function dp(){return By}(function(t){function e(){Ky.default.install(By)}t.install=e})(dp||(dp={}));pp.default=dp});var Ko=H(nr=>{"use strict";Object.defineProperty(nr,"__esModule",{value:!0});nr.stringArray=nr.array=nr.func=nr.error=nr.number=nr.string=nr.boolean=void 0;function Wk(t){return t===!0||t===!1}nr.boolean=Wk;function zy(t){return typeof t=="string"||t instanceof String}nr.string=zy;function zk(t){return typeof t=="number"||t instanceof Number}nr.number=zk;function Vk(t){return t instanceof Error}nr.error=Vk;function Xk(t){return typeof t=="function"}nr.func=Xk;function Vy(t){return Array.isArray(t)}nr.array=Vy;function Yk(t){return Vy(t)&&t.every(e=>zy(e))}nr.stringArray=Yk});var Mp=H(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var so=Ko(),Xy;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Xy=V.ErrorCodes||(V.ErrorCodes={}));var mp=class t extends Error{constructor(e,r,n){super(r),this.code=so.number(e)?e:Xy.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=mp;var br=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=br;br.auto=new br("auto");br.byPosition=new br("byPosition");br.byName=new br("byName");var Ye=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return br.auto}};V.AbstractMessageSignature=Ye;var hp=class extends Ye{constructor(e){super(e,0)}};V.RequestType0=hp;var yp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=yp;var gp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=gp;var Tp=class extends Ye{constructor(e){super(e,2)}};V.RequestType2=Tp;var vp=class extends Ye{constructor(e){super(e,3)}};V.RequestType3=vp;var xp=class extends Ye{constructor(e){super(e,4)}};V.RequestType4=xp;var Rp=class extends Ye{constructor(e){super(e,5)}};V.RequestType5=Rp;var bp=class extends Ye{constructor(e){super(e,6)}};V.RequestType6=bp;var Sp=class extends Ye{constructor(e){super(e,7)}};V.RequestType7=Sp;var Ap=class extends Ye{constructor(e){super(e,8)}};V.RequestType8=Ap;var wp=class extends Ye{constructor(e){super(e,9)}};V.RequestType9=wp;var kp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=kp;var Cp=class extends Ye{constructor(e){super(e,0)}};V.NotificationType0=Cp;var Ep=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=Ep;var $p=class extends Ye{constructor(e){super(e,2)}};V.NotificationType2=$p;var Np=class extends Ye{constructor(e){super(e,3)}};V.NotificationType3=Np;var _p=class extends Ye{constructor(e){super(e,4)}};V.NotificationType4=_p;var Ip=class extends Ye{constructor(e){super(e,5)}};V.NotificationType5=Ip;var Pp=class extends Ye{constructor(e){super(e,6)}};V.NotificationType6=Pp;var Op=class extends Ye{constructor(e){super(e,7)}};V.NotificationType7=Op;var Dp=class extends Ye{constructor(e){super(e,8)}};V.NotificationType8=Dp;var Lp=class extends Ye{constructor(e){super(e,9)}};V.NotificationType9=Lp;var Jk;(function(t){function e(i){let o=i;return o&&so.string(o.method)&&(so.string(o.id)||so.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&so.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(so.string(o.id)||so.number(o.id)||o.id===null)}t.isResponse=n})(Jk=V.Message||(V.Message={}))});var Up=H(Xn=>{"use strict";var Yy;Object.defineProperty(Xn,"__esModule",{value:!0});Xn.LRUCache=Xn.LinkedMap=Xn.Touch=void 0;var dr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(dr=Xn.Touch||(Xn.Touch={}));var ll=class{constructor(){this[Yy]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=dr.None){let n=this._map.get(e);if(n)return r!==dr.None&&this.touch(n,r),n.value}set(e,r,n=dr.None){let i=this._map.get(e);if(i)i.value=r,n!==dr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case dr.None:this.addItemLast(i);break;case dr.First:this.addItemFirst(i);break;case dr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(Yy=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==dr.First&&r!==dr.Last)){if(r===dr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===dr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Xn.LinkedMap=ll;var Fp=class extends ll{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=dr.AsNew){return super.get(e,r)}peek(e){return super.get(e,dr.None)}set(e,r){return super.set(e,r,dr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Xn.LRUCache=Fp});var Hp=H(ao=>{"use strict";Object.defineProperty(ao,"__esModule",{value:!0});ao.CancellationTokenSource=ao.CancellationToken=void 0;var Qk=Vn(),Zk=Ko(),qp=oo(),Gp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:qp.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:qp.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||Zk.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Gp=ao.CancellationToken||(ao.CancellationToken={}));var eC=Object.freeze(function(t,e){let r=(0,Qk.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),ul=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?eC:(this._emitter||(this._emitter=new qp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},jp=class{get token(){return this._token||(this._token=new ul),this._token}cancel(){this._token?this._token.cancel():this._token=Gp.Cancelled}dispose(){this._token?this._token instanceof ul&&this._token.dispose():this._token=Gp.None}};ao.CancellationTokenSource=jp});var Jy=H(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.ReadableStreamMessageReader=Yn.AbstractMessageReader=Yn.MessageReader=void 0;var Bp=Vn(),Bo=Ko(),Kp=oo(),tC;(function(t){function e(r){let n=r;return n&&Bo.func(n.listen)&&Bo.func(n.dispose)&&Bo.func(n.onError)&&Bo.func(n.onClose)&&Bo.func(n.onPartialMessage)}t.is=e})(tC=Yn.MessageReader||(Yn.MessageReader={}));var fl=class{constructor(){this.errorEmitter=new Kp.Emitter,this.closeEmitter=new Kp.Emitter,this.partialMessageEmitter=new Kp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Bo.string(e.message)?e.message:"unknown"}`)}};Yn.AbstractMessageReader=fl;var Wp;(function(t){function e(r){let n,i,o,s=new Map,a,c=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)s.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,c.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)c.set(l.name,l)}return a===void 0&&(a=(0,Bp.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}t.fromOptions=e})(Wp||(Wp={}));var zp=class extends fl{constructor(e,r){super(),this.readable=e,this.options=Wp.fromOptions(r),this.buffer=(0,Bp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Bp.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Yn.ReadableStreamMessageReader=zp});var Qy=H(dl=>{"use strict";Object.defineProperty(dl,"__esModule",{value:!0});dl.Semaphore=void 0;var rC=Vn(),Vp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,rC.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};dl.Semaphore=Vp});var rg=H(Jn=>{"use strict";Object.defineProperty(Jn,"__esModule",{value:!0});Jn.WriteableStreamMessageWriter=Jn.AbstractMessageWriter=Jn.MessageWriter=void 0;var Zy=Vn(),$a=Ko(),nC=Qy(),eg=oo(),iC="Content-Length: ",tg=`\r
`,oC;(function(t){function e(r){let n=r;return n&&$a.func(n.dispose)&&$a.func(n.onClose)&&$a.func(n.onError)&&$a.func(n.write)}t.is=e})(oC=Jn.MessageWriter||(Jn.MessageWriter={}));var pl=class{constructor(){this.errorEmitter=new eg.Emitter,this.closeEmitter=new eg.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${$a.string(e.message)?e.message:"unknown"}`)}};Jn.AbstractMessageWriter=pl;var Xp;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Zy.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Zy.default)().applicationJson.encoder}}t.fromOptions=e})(Xp||(Xp={}));var Yp=class extends pl{constructor(e,r){super(),this.writable=e,this.options=Xp.fromOptions(r),this.errorCount=0,this.writeSemaphore=new nC.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(iC,n.byteLength.toString(),tg),i.push(tg),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Jn.WriteableStreamMessageWriter=Yp});var cg=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var ng=Vn(),Pt=Ko(),Z=Mp(),ig=Up(),Na=oo(),Jp=Hp(),Ia;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(Ia||(Ia={}));var og;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(og=Y.ProgressToken||(Y.ProgressToken={}));var _a;(function(t){t.type=new Z.NotificationType("$/progress")})(_a||(_a={}));var Qp=class{constructor(){}};Y.ProgressType=Qp;var Zp;(function(t){function e(r){return Pt.func(r)}t.is=e})(Zp||(Zp={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var Ne;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(Ne=Y.Trace||(Y.Trace={}));var sC;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(sC=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!Pt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(Ne=Y.Trace||(Y.Trace={}));var nn;(function(t){t.Text="text",t.JSON="json"})(nn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return Pt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(nn=Y.TraceFormat||(Y.TraceFormat={}));var sg;(function(t){t.type=new Z.NotificationType("$/setTrace")})(sg=Y.SetTraceNotification||(Y.SetTraceNotification={}));var em;(function(t){t.type=new Z.NotificationType("$/logTrace")})(em=Y.LogTraceNotification||(Y.LogTraceNotification={}));var ml;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(ml=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Wo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=Wo;var ag;(function(t){function e(r){let n=r;return n&&Pt.func(n.cancelUndispatched)}t.is=e})(ag=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var tm;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Jp.CancellationTokenSource}});function e(r){let n=r;return n&&Pt.func(n.createCancellationTokenSource)}t.is=e})(tm=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var rm;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Ia.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Pt.func(n.sendCancellation)&&Pt.func(n.cleanup)}t.is=e})(rm=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var nm;(function(t){t.Message=Object.freeze({receiver:tm.Message,sender:rm.Message});function e(r){let n=r;return n&&tm.is(n.receiver)&&rm.is(n.sender)}t.is=e})(nm=Y.CancellationStrategy||(Y.CancellationStrategy={}));var aC;(function(t){function e(r){let n=r;return n&&(nm.is(n.cancellationStrategy)||ag.is(n.connectionStrategy))}t.is=e})(aC=Y.ConnectionOptions||(Y.ConnectionOptions={}));var on;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(on||(on={}));function cC(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,c="2.0",l,u=new Map,f,m=new Map,T=new Map,S,w=new ig.LinkedMap,N=new Map,k=new Set,v=new Map,g=Ne.Off,$=nn.Text,O,X=on.New,Te=new Na.Emitter,$e=new Na.Emitter,Kt=new Na.Emitter,Rt=new Na.Emitter,M=new Na.Emitter,A=n&&n.cancellationStrategy?n.cancellationStrategy:nm.Message;function q(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function ee(x,P){Z.Message.isRequest(P)?x.set(q(P.id),P):Z.Message.isResponse(P)?x.set(j(P.id),P):x.set(ce(),P)}function Q(x){}function bt(){return X===on.Listening}function ft(){return X===on.Closed}function he(){return X===on.Disposed}function Nr(){(X===on.New||X===on.Listening)&&(X=on.Closed,$e.fire(void 0))}function Bn(x){Te.fire([x,void 0,void 0])}function ka(x){Te.fire(x)}t.onClose(Nr),t.onError(Bn),e.onClose(Nr),e.onError(ka);function eo(){S||w.size===0||(S=(0,ng.default)().timer.setImmediate(()=>{S=void 0,fr()}))}function fr(){if(w.size===0)return;let x=w.shift();try{Z.Message.isRequest(x)?St(x):Z.Message.isNotification(x)?Sn(x):Z.Message.isResponse(x)?tr(x):Bt(x)}finally{eo()}}let qo=x=>{try{if(Z.Message.isNotification(x)&&x.method===Ia.type.method){let P=x.params.id,F=q(P),W=w.get(F);if(Z.Message.isRequest(W)){let Le=n?.connectionStrategy,Qe=Le&&Le.cancelUndispatched?Le.cancelUndispatched(W,Q):void 0;if(Qe&&(Qe.error!==void 0||Qe.result!==void 0)){w.delete(F),v.delete(P),Qe.id=W.id,Rr(Qe,x.method,Date.now()),e.write(Qe).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=v.get(P);if(De!==void 0){De.cancel(),bi(x);return}else k.add(P)}ee(w,x)}finally{eo()}};function St(x){if(he())return;function P(ue,qe,ve){let gt={jsonrpc:c,id:x.id};ue instanceof Z.ResponseError?gt.error=ue.toJson():gt.result=ue===void 0?null:ue,Rr(gt,qe,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}function F(ue,qe,ve){let gt={jsonrpc:c,id:x.id,error:ue.toJson()};Rr(gt,qe,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}function W(ue,qe,ve){ue===void 0&&(ue=null);let gt={jsonrpc:c,id:x.id,result:ue};Rr(gt,qe,ve),e.write(gt).catch(()=>i.error("Sending response failed."))}to(x);let De=u.get(x.method),Le,Qe;De&&(Le=De.type,Qe=De.handler);let At=Date.now();if(Qe||l){let ue=x.id??String(Date.now()),qe=A.receiver.createCancellationTokenSource(ue);x.id!==null&&k.has(x.id)&&qe.cancel(),x.id!==null&&v.set(ue,qe);try{let ve;if(Qe)if(x.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${Le.numberOfParams} params but received none.`),x.method,At);return}ve=Qe(qe.token)}else if(Array.isArray(x.params)){if(Le!==void 0&&Le.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,At);return}ve=Qe(...x.params,qe.token)}else{if(Le!==void 0&&Le.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,At);return}ve=Qe(x.params,qe.token)}else l&&(ve=l(x.method,x.params,qe.token));let gt=ve;ve?gt.then?gt.then(rr=>{v.delete(ue),P(rr,x.method,At)},rr=>{v.delete(ue),rr instanceof Z.ResponseError?F(rr,x.method,At):rr&&Pt.string(rr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${rr.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}):(v.delete(ue),P(ve,x.method,At)):(v.delete(ue),W(ve,x.method,At))}catch(ve){v.delete(ue),ve instanceof Z.ResponseError?P(ve,x.method,At):ve&&Pt.string(ve.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${ve.message}`),x.method,At):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,At)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,At)}function tr(x){if(!he())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=x.id,F=N.get(P);if(ep(x,F),F!==void 0){N.delete(P);try{if(x.error){let W=x.error;F.reject(new Z.ResponseError(W.code,W.message,W.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(W){W.message?i.error(`Response handler '${F.method}' failed with message: ${W.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function Sn(x){if(he())return;let P,F;if(x.method===Ia.type.method){let W=x.params.id;k.delete(W),bi(x);return}else{let W=m.get(x.method);W&&(F=W.handler,P=W.type)}if(F||f)try{if(bi(x),F)if(x.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let W=x.params;x.method===_a.type.method&&W.length===2&&og.is(W[0])?F({token:W[0],value:W[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),P.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received ${W.length} arguments`)),F(...W))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(W){W.message?i.error(`Notification handler '${x.method}' failed with message: ${W.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Kt.fire(x)}function Bt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let P=x;if(Pt.string(P.id)||Pt.number(P.id)){let F=P.id,W=N.get(F);W&&W.reject(new Error("The received response has neither a result nor an error property."))}}function dt(x){if(x!=null)switch(g){case Ne.Verbose:return JSON.stringify(x,null,4);case Ne.Compact:return JSON.stringify(x);default:return}}function jr(x){if(!(g===Ne.Off||!O))if($===nn.Text){let P;(g===Ne.Verbose||g===Ne.Compact)&&x.params&&(P=`Params: ${dt(x.params)}

`),O.log(`Sending request '${x.method} - (${x.id})'.`,P)}else Si("send-request",x)}function _r(x){if(!(g===Ne.Off||!O))if($===nn.Text){let P;(g===Ne.Verbose||g===Ne.Compact)&&(x.params?P=`Params: ${dt(x.params)}

`:P=`No parameters provided.

`),O.log(`Sending notification '${x.method}'.`,P)}else Si("send-notification",x)}function Rr(x,P,F){if(!(g===Ne.Off||!O))if($===nn.Text){let W;(g===Ne.Verbose||g===Ne.Compact)&&(x.error&&x.error.data?W=`Error data: ${dt(x.error.data)}

`:x.result?W=`Result: ${dt(x.result)}

`:x.error===void 0&&(W=`No result returned.

`)),O.log(`Sending response '${P} - (${x.id})'. Processing request took ${Date.now()-F}ms`,W)}else Si("send-response",x)}function to(x){if(!(g===Ne.Off||!O))if($===nn.Text){let P;(g===Ne.Verbose||g===Ne.Compact)&&x.params&&(P=`Params: ${dt(x.params)}

`),O.log(`Received request '${x.method} - (${x.id})'.`,P)}else Si("receive-request",x)}function bi(x){if(!(g===Ne.Off||!O||x.method===em.type.method))if($===nn.Text){let P;(g===Ne.Verbose||g===Ne.Compact)&&(x.params?P=`Params: ${dt(x.params)}

`:P=`No parameters provided.

`),O.log(`Received notification '${x.method}'.`,P)}else Si("receive-notification",x)}function ep(x,P){if(!(g===Ne.Off||!O))if($===nn.Text){let F;if((g===Ne.Verbose||g===Ne.Compact)&&(x.error&&x.error.data?F=`Error data: ${dt(x.error.data)}

`:x.result?F=`Result: ${dt(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),P){let W=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";O.log(`Received response '${P.method} - (${x.id})' in ${Date.now()-P.timerStart}ms.${W}`,F)}else O.log(`Received response ${x.id} without active response promise.`,F)}else Si("receive-response",x)}function Si(x,P){if(!O||g===Ne.Off)return;let F={isLSPMessage:!0,type:x,message:P,timestamp:Date.now()};O.log(F)}function ro(){if(ft())throw new Wo(ml.Closed,"Connection is closed.");if(he())throw new Wo(ml.Disposed,"Connection is disposed.")}function tp(){if(bt())throw new Wo(ml.AlreadyListening,"Connection is already listening")}function rp(){if(!bt())throw new Error("Call listen() first.")}function no(x){return x===void 0?null:x}function Go(x){if(x!==null)return x}function nl(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function Ca(x,P){switch(x){case Z.ParameterStructures.auto:return nl(P)?Go(P):[no(P)];case Z.ParameterStructures.byName:if(!nl(P))throw new Error("Received parameters by name but param is not an object literal.");return Go(P);case Z.ParameterStructures.byPosition:return[no(P)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function il(x,P){let F,W=x.numberOfParams;switch(W){case 0:F=void 0;break;case 1:F=Ca(x.parameterStructures,P[0]);break;default:F=[];for(let De=0;De<P.length&&De<W;De++)F.push(no(P[De]));if(P.length<W)for(let De=P.length;De<W;De++)F.push(null);break}return F}let Ai={sendNotification:(x,...P)=>{ro();let F,W;if(Pt.string(x)){F=x;let Le=P[0],Qe=0,At=Z.ParameterStructures.auto;Z.ParameterStructures.is(Le)&&(Qe=1,At=Le);let ue=P.length,qe=ue-Qe;switch(qe){case 0:W=void 0;break;case 1:W=Ca(At,P[Qe]);break;default:if(At===Z.ParameterStructures.byName)throw new Error(`Received ${qe} parameters for 'by Name' notification parameter structure.`);W=P.slice(Qe,ue).map(ve=>no(ve));break}}else{let Le=P;F=x.method,W=il(x,Le)}let De={jsonrpc:c,method:F,params:W};return _r(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(x,P)=>{ro();let F;return Pt.func(x)?f=x:P&&(Pt.string(x)?(F=x,m.set(x,{type:void 0,handler:P})):(F=x.method,m.set(x.method,{type:x,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(x,P,F)=>Ai.sendNotification(_a.type,{token:P,value:F}),onUnhandledProgress:Rt.event,sendRequest:(x,...P)=>{ro(),rp();let F,W,De;if(Pt.string(x)){F=x;let ue=P[0],qe=P[P.length-1],ve=0,gt=Z.ParameterStructures.auto;Z.ParameterStructures.is(ue)&&(ve=1,gt=ue);let rr=P.length;Jp.CancellationToken.is(qe)&&(rr=rr-1,De=qe);let Wn=rr-ve;switch(Wn){case 0:W=void 0;break;case 1:W=Ca(gt,P[ve]);break;default:if(gt===Z.ParameterStructures.byName)throw new Error(`Received ${Wn} parameters for 'by Name' request parameter structure.`);W=P.slice(ve,rr).map(An=>no(An));break}}else{let ue=P;F=x.method,W=il(x,ue);let qe=x.numberOfParams;De=Jp.CancellationToken.is(ue[qe])?ue[qe]:void 0}let Le=o++,Qe;return De&&(Qe=De.onCancellationRequested(()=>{let ue=A.sender.sendCancellation(Ai,Le);return ue===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):ue.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((ue,qe)=>{let ve={jsonrpc:c,id:Le,method:F,params:W},gt=An=>{ue(An),A.sender.cleanup(Le),Qe?.dispose()},rr=An=>{qe(An),A.sender.cleanup(Le),Qe?.dispose()},Wn={method:F,timerStart:Date.now(),resolve:gt,reject:rr};jr(ve);try{e.write(ve).catch(()=>i.error("Sending request failed."))}catch(An){Wn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,An.message?An.message:"Unknown reason")),Wn=null}Wn&&N.set(Le,Wn)})},onRequest:(x,P)=>{ro();let F=null;return Zp.is(x)?(F=void 0,l=x):Pt.string(x)?(F=null,P!==void 0&&(F=x,u.set(x,{handler:P,type:void 0}))):P!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):l=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,P,F)=>{let W=!1,De=nn.Text;F!==void 0&&(Pt.boolean(F)?W=F:(W=F.sendNotification||!1,De=F.traceFormat||nn.Text)),g=x,$=De,g===Ne.Off?O=void 0:O=P,W&&!ft()&&!he()&&await Ai.sendNotification(sg.type,{value:Ne.toString(x)})},onError:Te.event,onClose:$e.event,onUnhandledNotification:Kt.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(he())return;X=on.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of N.values())P.reject(x);N=new Map,v=new Map,k=new Set,w=new ig.LinkedMap,Pt.func(e.dispose)&&e.dispose(),Pt.func(t.dispose)&&t.dispose()},listen:()=>{ro(),tp(),X=on.Listening,t.listen(qo)},inspect:()=>{(0,ng.default)().console.log("inspect")}};return Ai.onNotification(em.type,x=>{if(g===Ne.Off||!O)return;let P=g===Ne.Verbose||g===Ne.Compact;O.log(x.message,P?x.verbose:void 0)}),Ai.onNotification(_a.type,x=>{let P=T.get(x.token);P?P(x.value):Rt.fire(x)}),Ai}Y.createMessageConnection=cC});var am=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var je=Mp();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return je.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return je.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return je.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return je.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return je.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return je.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return je.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return je.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return je.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return je.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return je.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return je.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return je.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return je.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return je.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return je.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return je.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return je.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return je.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return je.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return je.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return je.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return je.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return je.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return je.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return je.ParameterStructures}});var im=Up();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return im.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return im.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return im.Touch}});var lC=ap();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return lC.Disposable}});var lg=oo();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return lg.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return lg.Emitter}});var ug=Hp();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return ug.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return ug.CancellationToken}});var om=Jy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return om.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return om.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return om.ReadableStreamMessageReader}});var sm=rg();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return sm.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return sm.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return sm.WriteableStreamMessageWriter}});var ir=cg();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return ir.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return ir.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return ir.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return ir.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return ir.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return ir.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return ir.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return ir.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return ir.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return ir.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return ir.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return ir.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return ir.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return ir.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return ir.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return ir.CancellationStrategy}});var uC=Vn();_.RAL=uC.default});var Qn=H(Ir=>{"use strict";var fC=Ir&&Ir.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),dC=Ir&&Ir.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&fC(e,t,r)};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.createMessageConnection=Ir.BrowserMessageWriter=Ir.BrowserMessageReader=void 0;var pC=Wy();pC.default.install();var zo=am();dC(am(),Ir);var cm=class extends zo.AbstractMessageReader{constructor(e){super(),this._onData=new zo.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Ir.BrowserMessageReader=cm;var lm=class extends zo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Ir.BrowserMessageWriter=lm;function mC(t,e,r,n){return r===void 0&&(r=zo.NullLogger),zo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,zo.createMessageConnection)(t,e,r,n)}Ir.createMessageConnection=mC});var um=H((mj,fg)=>{"use strict";fg.exports=Qn()});var co=H((dg,hl)=>{(function(t){if(typeof hl=="object"&&typeof hl.exports=="object"){var e=t(jy,dg);e!==void 0&&(hl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(y,d){return y===Number.MAX_VALUE&&(y=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:y,character:d}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&C.uinteger(d.line)&&C.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(y,d,E,I){if(C.uinteger(y)&&C.uinteger(d)&&C.uinteger(E)&&C.uinteger(I))return{start:s.create(y,d),end:s.create(E,I)};if(s.is(y)&&s.is(d))return{start:y,end:d};throw new Error("Range#create called with invalid arguments[".concat(y,", ").concat(d,", ").concat(E,", ").concat(I,"]"))}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function R(y,d){return{uri:y,range:d}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&a.is(d.range)&&(C.string(d.uri)||C.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var l;(function(p){function R(y,d,E,I){return{targetUri:y,targetRange:d,targetSelectionRange:E,originSelectionRange:I}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&a.is(d.targetRange)&&C.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||C.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(y,d,E,I){return{red:y,green:d,blue:E,alpha:I}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&C.numberRange(d.red,0,1)&&C.numberRange(d.green,0,1)&&C.numberRange(d.blue,0,1)&&C.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(y,d){return{range:y,color:d}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(y,d,E){return{label:y,textEdit:d,additionalTextEdits:E}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&C.string(d.label)&&(C.undefined(d.textEdit)||O.is(d))&&(C.undefined(d.additionalTextEdits)||C.typedArray(d.additionalTextEdits,O.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var S;(function(p){function R(y,d,E,I,re,pt){var Ge={startLine:y,endLine:d};return C.defined(E)&&(Ge.startCharacter=E),C.defined(I)&&(Ge.endCharacter=I),C.defined(re)&&(Ge.kind=re),C.defined(pt)&&(Ge.collapsedText=pt),Ge}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&C.uinteger(d.startLine)&&C.uinteger(d.startLine)&&(C.undefined(d.startCharacter)||C.uinteger(d.startCharacter))&&(C.undefined(d.endCharacter)||C.uinteger(d.endCharacter))&&(C.undefined(d.kind)||C.string(d.kind))}p.is=b})(S=e.FoldingRange||(e.FoldingRange={}));var w;(function(p){function R(y,d){return{location:y,message:d}}p.create=R;function b(y){var d=y;return C.defined(d)&&c.is(d.location)&&C.string(d.message)}p.is=b})(w=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var k;(function(p){p.Unnecessary=1,p.Deprecated=2})(k=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var y=b;return C.objectLiteral(y)&&C.string(y.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var g;(function(p){function R(y,d,E,I,re,pt){var Ge={range:y,message:d};return C.defined(E)&&(Ge.severity=E),C.defined(I)&&(Ge.code=I),C.defined(re)&&(Ge.source=re),C.defined(pt)&&(Ge.relatedInformation=pt),Ge}p.create=R;function b(y){var d,E=y;return C.defined(E)&&a.is(E.range)&&C.string(E.message)&&(C.number(E.severity)||C.undefined(E.severity))&&(C.integer(E.code)||C.string(E.code)||C.undefined(E.code))&&(C.undefined(E.codeDescription)||C.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(C.string(E.source)||C.undefined(E.source))&&(C.undefined(E.relatedInformation)||C.typedArray(E.relatedInformation,w.is))}p.is=b})(g=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(y,d){for(var E=[],I=2;I<arguments.length;I++)E[I-2]=arguments[I];var re={title:y,command:d};return C.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=R;function b(y){var d=y;return C.defined(d)&&C.string(d.title)&&C.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var O;(function(p){function R(E,I){return{range:E,newText:I}}p.replace=R;function b(E,I){return{range:{start:E,end:E},newText:I}}p.insert=b;function y(E){return{range:E,newText:""}}p.del=y;function d(E){var I=E;return C.objectLiteral(I)&&C.string(I.newText)&&a.is(I.range)}p.is=d})(O=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(y,d,E){var I={label:y};return d!==void 0&&(I.needsConfirmation=d),E!==void 0&&(I.description=E),I}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&C.string(d.label)&&(C.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(C.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var Te;(function(p){function R(b){var y=b;return C.string(y)}p.is=R})(Te=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var $e;(function(p){function R(E,I,re){return{range:E,newText:I,annotationId:re}}p.replace=R;function b(E,I,re){return{range:{start:E,end:E},newText:I,annotationId:re}}p.insert=b;function y(E,I){return{range:E,newText:"",annotationId:I}}p.del=y;function d(E){var I=E;return O.is(I)&&(X.is(I.annotationId)||Te.is(I.annotationId))}p.is=d})($e=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Kt;(function(p){function R(y,d){return{textDocument:y,edits:d}}p.create=R;function b(y){var d=y;return C.defined(d)&&ft.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Kt=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Rt;(function(p){function R(y,d,E){var I={kind:"create",uri:y};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(y){var d=y;return d&&d.kind==="create"&&C.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||C.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||C.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||Te.is(d.annotationId))}p.is=b})(Rt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(y,d,E,I){var re={kind:"rename",oldUri:y,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),I!==void 0&&(re.annotationId=I),re}p.create=R;function b(y){var d=y;return d&&d.kind==="rename"&&C.string(d.oldUri)&&C.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||C.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||C.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||Te.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var A;(function(p){function R(y,d,E){var I={kind:"delete",uri:y};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(y){var d=y;return d&&d.kind==="delete"&&C.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||C.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||C.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||Te.is(d.annotationId))}p.is=b})(A=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function R(b){var y=b;return y&&(y.changes!==void 0||y.documentChanges!==void 0)&&(y.documentChanges===void 0||y.documentChanges.every(function(d){return C.string(d.kind)?Rt.is(d)||M.is(d)||A.is(d):Kt.is(d)}))}p.is=R})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,y){var d,E;if(y===void 0?d=O.insert(R,b):Te.is(y)?(E=y,d=$e.insert(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=$e.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,y){var d,E;if(y===void 0?d=O.replace(R,b):Te.is(y)?(E=y,d=$e.replace(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=$e.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var y,d;if(b===void 0?y=O.del(R):Te.is(b)?(d=b,y=$e.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),y=$e.del(R,d)),this.edits.push(y),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var y;if(Te.is(R)?y=R:(y=this.nextId(),b=R),this._annotations[y]!==void 0)throw new Error("Id ".concat(y," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(y));return this._annotations[y]=b,this._size++,y},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(y){if(Kt.is(y)){var d=new j(y.edits,b._changeAnnotations);b._textEditChanges[y.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(y){var d=new j(R.changes[y]);b._textEditChanges[y]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ft.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},y=this._textEditChanges[b.uri];if(!y){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),y=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=y}return y}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var y=this._textEditChanges[R];if(!y){var d=[];this._workspaceEdit.changes[R]=d,y=new j(d),this._textEditChanges[R]=y}return y}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||Te.is(b)?d=b:y=b;var E,I;if(d===void 0?E=Rt.create(R,y):(I=Te.is(d)?d:this._changeAnnotations.manage(d),E=Rt.create(R,y,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p.prototype.renameFile=function(R,b,y,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(y)||Te.is(y)?E=y:d=y;var I,re;if(E===void 0?I=M.create(R,b,d):(re=Te.is(E)?E:this._changeAnnotations.manage(E),I=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||Te.is(b)?d=b:y=b;var E,I;if(d===void 0?E=A.create(R,y):(I=Te.is(d)?d:this._changeAnnotations.manage(d),E=A.create(R,y,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(y){return{uri:y}}p.create=R;function b(y){var d=y;return C.defined(d)&&C.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var bt;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return C.defined(d)&&C.string(d.uri)&&C.integer(d.version)}p.is=b})(bt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ft;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return C.defined(d)&&C.string(d.uri)&&(d.version===null||C.integer(d.version))}p.is=b})(ft=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var he;(function(p){function R(y,d,E,I){return{uri:y,languageId:d,version:E,text:I}}p.create=R;function b(y){var d=y;return C.defined(d)&&C.string(d.uri)&&C.string(d.languageId)&&C.integer(d.version)&&C.string(d.text)}p.is=b})(he=e.TextDocumentItem||(e.TextDocumentItem={}));var Nr;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var y=b;return y===p.PlainText||y===p.Markdown}p.is=R})(Nr=e.MarkupKind||(e.MarkupKind={}));var Bn;(function(p){function R(b){var y=b;return C.objectLiteral(b)&&Nr.is(y.kind)&&C.string(y.value)}p.is=R})(Bn=e.MarkupContent||(e.MarkupContent={}));var ka;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(ka=e.CompletionItemKind||(e.CompletionItemKind={}));var eo;(function(p){p.PlainText=1,p.Snippet=2})(eo=e.InsertTextFormat||(e.InsertTextFormat={}));var fr;(function(p){p.Deprecated=1})(fr=e.CompletionItemTag||(e.CompletionItemTag={}));var qo;(function(p){function R(y,d,E){return{newText:y,insert:d,replace:E}}p.create=R;function b(y){var d=y;return d&&C.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(qo=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var St;(function(p){p.asIs=1,p.adjustIndentation=2})(St=e.InsertTextMode||(e.InsertTextMode={}));var tr;(function(p){function R(b){var y=b;return y&&(C.string(y.detail)||y.detail===void 0)&&(C.string(y.description)||y.description===void 0)}p.is=R})(tr=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Sn;(function(p){function R(b){return{label:b}}p.create=R})(Sn=e.CompletionItem||(e.CompletionItem={}));var Bt;(function(p){function R(b,y){return{items:b||[],isIncomplete:!!y}}p.create=R})(Bt=e.CompletionList||(e.CompletionList={}));var dt;(function(p){function R(y){return y.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(y){var d=y;return C.string(d)||C.objectLiteral(d)&&C.string(d.language)&&C.string(d.value)}p.is=b})(dt=e.MarkedString||(e.MarkedString={}));var jr;(function(p){function R(b){var y=b;return!!y&&C.objectLiteral(y)&&(Bn.is(y.contents)||dt.is(y.contents)||C.typedArray(y.contents,dt.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(jr=e.Hover||(e.Hover={}));var _r;(function(p){function R(b,y){return y?{label:b,documentation:y}:{label:b}}p.create=R})(_r=e.ParameterInformation||(e.ParameterInformation={}));var Rr;(function(p){function R(b,y){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var I={label:b};return C.defined(y)&&(I.documentation=y),C.defined(d)?I.parameters=d:I.parameters=[],I}p.create=R})(Rr=e.SignatureInformation||(e.SignatureInformation={}));var to;(function(p){p.Text=1,p.Read=2,p.Write=3})(to=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var bi;(function(p){function R(b,y){var d={range:b};return C.number(y)&&(d.kind=y),d}p.create=R})(bi=e.DocumentHighlight||(e.DocumentHighlight={}));var ep;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(ep=e.SymbolKind||(e.SymbolKind={}));var Si;(function(p){p.Deprecated=1})(Si=e.SymbolTag||(e.SymbolTag={}));var ro;(function(p){function R(b,y,d,E,I){var re={name:b,kind:y,location:{uri:E,range:d}};return I&&(re.containerName=I),re}p.create=R})(ro=e.SymbolInformation||(e.SymbolInformation={}));var tp;(function(p){function R(b,y,d,E){return E!==void 0?{name:b,kind:y,location:{uri:d,range:E}}:{name:b,kind:y,location:{uri:d}}}p.create=R})(tp=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var rp;(function(p){function R(y,d,E,I,re,pt){var Ge={name:y,detail:d,kind:E,range:I,selectionRange:re};return pt!==void 0&&(Ge.children=pt),Ge}p.create=R;function b(y){var d=y;return d&&C.string(d.name)&&C.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||C.string(d.detail))&&(d.deprecated===void 0||C.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(rp=e.DocumentSymbol||(e.DocumentSymbol={}));var no;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(no=e.CodeActionKind||(e.CodeActionKind={}));var Go;(function(p){p.Invoked=1,p.Automatic=2})(Go=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var nl;(function(p){function R(y,d,E){var I={diagnostics:y};return d!=null&&(I.only=d),E!=null&&(I.triggerKind=E),I}p.create=R;function b(y){var d=y;return C.defined(d)&&C.typedArray(d.diagnostics,g.is)&&(d.only===void 0||C.typedArray(d.only,C.string))&&(d.triggerKind===void 0||d.triggerKind===Go.Invoked||d.triggerKind===Go.Automatic)}p.is=b})(nl=e.CodeActionContext||(e.CodeActionContext={}));var Ca;(function(p){function R(y,d,E){var I={title:y},re=!0;return typeof d=="string"?(re=!1,I.kind=d):$.is(d)?I.command=d:I.edit=d,re&&E!==void 0&&(I.kind=E),I}p.create=R;function b(y){var d=y;return d&&C.string(d.title)&&(d.diagnostics===void 0||C.typedArray(d.diagnostics,g.is))&&(d.kind===void 0||C.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||C.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(Ca=e.CodeAction||(e.CodeAction={}));var il;(function(p){function R(y,d){var E={range:y};return C.defined(d)&&(E.data=d),E}p.create=R;function b(y){var d=y;return C.defined(d)&&a.is(d.range)&&(C.undefined(d.command)||$.is(d.command))}p.is=b})(il=e.CodeLens||(e.CodeLens={}));var Ai;(function(p){function R(y,d){return{tabSize:y,insertSpaces:d}}p.create=R;function b(y){var d=y;return C.defined(d)&&C.uinteger(d.tabSize)&&C.boolean(d.insertSpaces)}p.is=b})(Ai=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(y,d,E){return{range:y,target:d,data:E}}p.create=R;function b(y){var d=y;return C.defined(d)&&a.is(d.range)&&(C.undefined(d.target)||C.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function R(y,d){return{range:y,parent:d}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var W;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(W=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function R(b){var y=b;return C.objectLiteral(y)&&(y.resultId===void 0||typeof y.resultId=="string")&&Array.isArray(y.data)&&(y.data.length===0||typeof y.data[0]=="number")}p.is=R})(De=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(p){function R(y,d){return{range:y,text:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&C.string(d.text)}p.is=b})(Le=e.InlineValueText||(e.InlineValueText={}));var Qe;(function(p){function R(y,d,E){return{range:y,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&C.boolean(d.caseSensitiveLookup)&&(C.string(d.variableName)||d.variableName===void 0)}p.is=b})(Qe=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var At;(function(p){function R(y,d){return{range:y,expression:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&(C.string(d.expression)||d.expression===void 0)}p.is=b})(At=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ue;(function(p){function R(y,d){return{frameId:y,stoppedLocation:d}}p.create=R;function b(y){var d=y;return C.defined(d)&&a.is(y.stoppedLocation)}p.is=b})(ue=e.InlineValueContext||(e.InlineValueContext={}));var qe;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(qe=e.InlayHintKind||(e.InlayHintKind={}));var ve;(function(p){function R(y){return{value:y}}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&(d.tooltip===void 0||C.string(d.tooltip)||Bn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(ve=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var gt;(function(p){function R(y,d,E){var I={position:y,label:d};return E!==void 0&&(I.kind=E),I}p.create=R;function b(y){var d=y;return C.objectLiteral(d)&&s.is(d.position)&&(C.string(d.label)||C.typedArray(d.label,ve.is))&&(d.kind===void 0||qe.is(d.kind))&&d.textEdits===void 0||C.typedArray(d.textEdits,O.is)&&(d.tooltip===void 0||C.string(d.tooltip)||Bn.is(d.tooltip))&&(d.paddingLeft===void 0||C.boolean(d.paddingLeft))&&(d.paddingRight===void 0||C.boolean(d.paddingRight))}p.is=b})(gt=e.InlayHint||(e.InlayHint={}));var rr;(function(p){function R(b){var y=b;return C.objectLiteral(y)&&n.is(y.uri)&&C.string(y.name)}p.is=R})(rr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Wn;(function(p){function R(E,I,re,pt){return new An(E,I,re,pt)}p.create=R;function b(E){var I=E;return!!(C.defined(I)&&C.string(I.uri)&&(C.undefined(I.languageId)||C.string(I.languageId))&&C.uinteger(I.lineCount)&&C.func(I.getText)&&C.func(I.positionAt)&&C.func(I.offsetAt))}p.is=b;function y(E,I){for(var re=E.getText(),pt=d(I,function(jo,ol){var Gy=jo.range.start.line-ol.range.start.line;return Gy===0?jo.range.start.character-ol.range.start.character:Gy}),Ge=re.length,tn=pt.length-1;tn>=0;tn--){var rn=pt[tn],zn=E.offsetAt(rn.range.start),fe=E.offsetAt(rn.range.end);if(fe<=Ge)re=re.substring(0,zn)+rn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");Ge=zn}return re}p.applyEdits=y;function d(E,I){if(E.length<=1)return E;var re=E.length/2|0,pt=E.slice(0,re),Ge=E.slice(re);d(pt,I),d(Ge,I);for(var tn=0,rn=0,zn=0;tn<pt.length&&rn<Ge.length;){var fe=I(pt[tn],Ge[rn]);fe<=0?E[zn++]=pt[tn++]:E[zn++]=Ge[rn++]}for(;tn<pt.length;)E[zn++]=pt[tn++];for(;rn<Ge.length;)E[zn++]=Ge[rn++];return E}})(Wn=e.TextDocument||(e.TextDocument={}));var An=function(){function p(R,b,y,d){this._uri=R,this._languageId=b,this._version=y,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),y=this.offsetAt(R.end);return this._content.substring(b,y)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,y=!0,d=0;d<b.length;d++){y&&(R.push(d),y=!1);var E=b.charAt(d);y=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}y&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),y=0,d=b.length;if(d===0)return s.create(0,R);for(;y<d;){var E=Math.floor((y+d)/2);b[E]>R?d=E:y=E+1}var I=y-1;return s.create(I,R-b[I])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var y=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(y+R.character,d),y)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),C;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function y(fe){return typeof fe>"u"}p.undefined=y;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return R.call(fe)==="[object String]"}p.string=E;function I(fe){return R.call(fe)==="[object Number]"}p.number=I;function re(fe,jo,ol){return R.call(fe)==="[object Number]"&&jo<=fe&&fe<=ol}p.numberRange=re;function pt(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=pt;function Ge(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=Ge;function tn(fe){return R.call(fe)==="[object Function]"}p.func=tn;function rn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=rn;function zn(fe,jo){return Array.isArray(fe)&&fe.every(jo)}p.typedArray=zn})(C||(C={}))})});var ot=H(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.ProtocolNotificationType=pr.ProtocolNotificationType0=pr.ProtocolRequestType=pr.ProtocolRequestType0=pr.RegistrationType=pr.MessageDirection=void 0;var Vo=Qn(),hC;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(hC=pr.MessageDirection||(pr.MessageDirection={}));var fm=class{constructor(e){this.method=e}};pr.RegistrationType=fm;var dm=class extends Vo.RequestType0{constructor(e){super(e)}};pr.ProtocolRequestType0=dm;var pm=class extends Vo.RequestType{constructor(e){super(e,Vo.ParameterStructures.byName)}};pr.ProtocolRequestType=pm;var mm=class extends Vo.NotificationType0{constructor(e){super(e)}};pr.ProtocolNotificationType0=mm;var hm=class extends Vo.NotificationType{constructor(e){super(e,Vo.ParameterStructures.byName)}};pr.ProtocolNotificationType=hm});var yl=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.objectLiteral=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function yC(t){return t===!0||t===!1}wt.boolean=yC;function pg(t){return typeof t=="string"||t instanceof String}wt.string=pg;function gC(t){return typeof t=="number"||t instanceof Number}wt.number=gC;function TC(t){return t instanceof Error}wt.error=TC;function vC(t){return typeof t=="function"}wt.func=vC;function mg(t){return Array.isArray(t)}wt.array=mg;function xC(t){return mg(t)&&t.every(e=>pg(e))}wt.stringArray=xC;function RC(t,e){return Array.isArray(t)&&t.every(e)}wt.typedArray=RC;function bC(t){return t!==null&&typeof t=="object"}wt.objectLiteral=bC});var yg=H(Pa=>{"use strict";Object.defineProperty(Pa,"__esModule",{value:!0});Pa.ImplementationRequest=void 0;var hg=ot(),SC;(function(t){t.method="textDocument/implementation",t.messageDirection=hg.MessageDirection.clientToServer,t.type=new hg.ProtocolRequestType(t.method)})(SC=Pa.ImplementationRequest||(Pa.ImplementationRequest={}))});var Tg=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.TypeDefinitionRequest=void 0;var gg=ot(),AC;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=gg.MessageDirection.clientToServer,t.type=new gg.ProtocolRequestType(t.method)})(AC=Oa.TypeDefinitionRequest||(Oa.TypeDefinitionRequest={}))});var vg=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.DidChangeWorkspaceFoldersNotification=wi.WorkspaceFoldersRequest=void 0;var gl=ot(),wC;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=gl.MessageDirection.serverToClient,t.type=new gl.ProtocolRequestType0(t.method)})(wC=wi.WorkspaceFoldersRequest||(wi.WorkspaceFoldersRequest={}));var kC;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=gl.MessageDirection.clientToServer,t.type=new gl.ProtocolNotificationType(t.method)})(kC=wi.DidChangeWorkspaceFoldersNotification||(wi.DidChangeWorkspaceFoldersNotification={}))});var Rg=H(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.ConfigurationRequest=void 0;var xg=ot(),CC;(function(t){t.method="workspace/configuration",t.messageDirection=xg.MessageDirection.serverToClient,t.type=new xg.ProtocolRequestType(t.method)})(CC=Da.ConfigurationRequest||(Da.ConfigurationRequest={}))});var bg=H(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.ColorPresentationRequest=ki.DocumentColorRequest=void 0;var Tl=ot(),EC;(function(t){t.method="textDocument/documentColor",t.messageDirection=Tl.MessageDirection.clientToServer,t.type=new Tl.ProtocolRequestType(t.method)})(EC=ki.DocumentColorRequest||(ki.DocumentColorRequest={}));var $C;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Tl.MessageDirection.clientToServer,t.type=new Tl.ProtocolRequestType(t.method)})($C=ki.ColorPresentationRequest||(ki.ColorPresentationRequest={}))});var Ag=H(La=>{"use strict";Object.defineProperty(La,"__esModule",{value:!0});La.FoldingRangeRequest=void 0;var Sg=ot(),NC;(function(t){t.method="textDocument/foldingRange",t.messageDirection=Sg.MessageDirection.clientToServer,t.type=new Sg.ProtocolRequestType(t.method)})(NC=La.FoldingRangeRequest||(La.FoldingRangeRequest={}))});var kg=H(Ma=>{"use strict";Object.defineProperty(Ma,"__esModule",{value:!0});Ma.DeclarationRequest=void 0;var wg=ot(),_C;(function(t){t.method="textDocument/declaration",t.messageDirection=wg.MessageDirection.clientToServer,t.type=new wg.ProtocolRequestType(t.method)})(_C=Ma.DeclarationRequest||(Ma.DeclarationRequest={}))});var Eg=H(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.SelectionRangeRequest=void 0;var Cg=ot(),IC;(function(t){t.method="textDocument/selectionRange",t.messageDirection=Cg.MessageDirection.clientToServer,t.type=new Cg.ProtocolRequestType(t.method)})(IC=Fa.SelectionRangeRequest||(Fa.SelectionRangeRequest={}))});var $g=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.WorkDoneProgressCancelNotification=sn.WorkDoneProgressCreateRequest=sn.WorkDoneProgress=void 0;var PC=Qn(),vl=ot(),OC;(function(t){t.type=new PC.ProgressType;function e(r){return r===t.type}t.is=e})(OC=sn.WorkDoneProgress||(sn.WorkDoneProgress={}));var DC;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=vl.MessageDirection.serverToClient,t.type=new vl.ProtocolRequestType(t.method)})(DC=sn.WorkDoneProgressCreateRequest||(sn.WorkDoneProgressCreateRequest={}));var LC;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=vl.MessageDirection.clientToServer,t.type=new vl.ProtocolNotificationType(t.method)})(LC=sn.WorkDoneProgressCancelNotification||(sn.WorkDoneProgressCancelNotification={}))});var Ng=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.CallHierarchyOutgoingCallsRequest=an.CallHierarchyIncomingCallsRequest=an.CallHierarchyPrepareRequest=void 0;var Xo=ot(),MC;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(MC=an.CallHierarchyPrepareRequest||(an.CallHierarchyPrepareRequest={}));var FC;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(FC=an.CallHierarchyIncomingCallsRequest||(an.CallHierarchyIncomingCallsRequest={}));var UC;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Xo.MessageDirection.clientToServer,t.type=new Xo.ProtocolRequestType(t.method)})(UC=an.CallHierarchyOutgoingCallsRequest||(an.CallHierarchyOutgoingCallsRequest={}))});var _g=H(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.SemanticTokensRefreshRequest=kt.SemanticTokensRangeRequest=kt.SemanticTokensDeltaRequest=kt.SemanticTokensRequest=kt.SemanticTokensRegistrationType=kt.TokenFormat=void 0;var Zn=ot(),qC;(function(t){t.Relative="relative"})(qC=kt.TokenFormat||(kt.TokenFormat={}));var xl;(function(t){t.method="textDocument/semanticTokens",t.type=new Zn.RegistrationType(t.method)})(xl=kt.SemanticTokensRegistrationType||(kt.SemanticTokensRegistrationType={}));var GC;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=xl.method})(GC=kt.SemanticTokensRequest||(kt.SemanticTokensRequest={}));var jC;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=xl.method})(jC=kt.SemanticTokensDeltaRequest||(kt.SemanticTokensDeltaRequest={}));var HC;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=xl.method})(HC=kt.SemanticTokensRangeRequest||(kt.SemanticTokensRangeRequest={}));var KC;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType0(t.method)})(KC=kt.SemanticTokensRefreshRequest||(kt.SemanticTokensRefreshRequest={}))});var Pg=H(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.ShowDocumentRequest=void 0;var Ig=ot(),BC;(function(t){t.method="window/showDocument",t.messageDirection=Ig.MessageDirection.serverToClient,t.type=new Ig.ProtocolRequestType(t.method)})(BC=Ua.ShowDocumentRequest||(Ua.ShowDocumentRequest={}))});var Dg=H(qa=>{"use strict";Object.defineProperty(qa,"__esModule",{value:!0});qa.LinkedEditingRangeRequest=void 0;var Og=ot(),WC;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Og.MessageDirection.clientToServer,t.type=new Og.ProtocolRequestType(t.method)})(WC=qa.LinkedEditingRangeRequest||(qa.LinkedEditingRangeRequest={}))});var Lg=H(st=>{"use strict";Object.defineProperty(st,"__esModule",{value:!0});st.WillDeleteFilesRequest=st.DidDeleteFilesNotification=st.DidRenameFilesNotification=st.WillRenameFilesRequest=st.DidCreateFilesNotification=st.WillCreateFilesRequest=st.FileOperationPatternKind=void 0;var Hr=ot(),zC;(function(t){t.file="file",t.folder="folder"})(zC=st.FileOperationPatternKind||(st.FileOperationPatternKind={}));var VC;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolRequestType(t.method)})(VC=st.WillCreateFilesRequest||(st.WillCreateFilesRequest={}));var XC;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolNotificationType(t.method)})(XC=st.DidCreateFilesNotification||(st.DidCreateFilesNotification={}));var YC;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolRequestType(t.method)})(YC=st.WillRenameFilesRequest||(st.WillRenameFilesRequest={}));var JC;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolNotificationType(t.method)})(JC=st.DidRenameFilesNotification||(st.DidRenameFilesNotification={}));var QC;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolNotificationType(t.method)})(QC=st.DidDeleteFilesNotification||(st.DidDeleteFilesNotification={}));var ZC;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolRequestType(t.method)})(ZC=st.WillDeleteFilesRequest||(st.WillDeleteFilesRequest={}))});var Fg=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.MonikerRequest=cn.MonikerKind=cn.UniquenessLevel=void 0;var Mg=ot(),eE;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(eE=cn.UniquenessLevel||(cn.UniquenessLevel={}));var tE;(function(t){t.$import="import",t.$export="export",t.local="local"})(tE=cn.MonikerKind||(cn.MonikerKind={}));var rE;(function(t){t.method="textDocument/moniker",t.messageDirection=Mg.MessageDirection.clientToServer,t.type=new Mg.ProtocolRequestType(t.method)})(rE=cn.MonikerRequest||(cn.MonikerRequest={}))});var Ug=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.TypeHierarchySubtypesRequest=ln.TypeHierarchySupertypesRequest=ln.TypeHierarchyPrepareRequest=void 0;var Yo=ot(),nE;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(nE=ln.TypeHierarchyPrepareRequest||(ln.TypeHierarchyPrepareRequest={}));var iE;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(iE=ln.TypeHierarchySupertypesRequest||(ln.TypeHierarchySupertypesRequest={}));var oE;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(oE=ln.TypeHierarchySubtypesRequest||(ln.TypeHierarchySubtypesRequest={}))});var qg=H(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.InlineValueRefreshRequest=Ci.InlineValueRequest=void 0;var Rl=ot(),sE;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Rl.MessageDirection.clientToServer,t.type=new Rl.ProtocolRequestType(t.method)})(sE=Ci.InlineValueRequest||(Ci.InlineValueRequest={}));var aE;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Rl.MessageDirection.clientToServer,t.type=new Rl.ProtocolRequestType0(t.method)})(aE=Ci.InlineValueRefreshRequest||(Ci.InlineValueRefreshRequest={}))});var Gg=H(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.InlayHintRefreshRequest=un.InlayHintResolveRequest=un.InlayHintRequest=void 0;var Jo=ot(),cE;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(cE=un.InlayHintRequest||(un.InlayHintRequest={}));var lE;(function(t){t.method="inlayHint/resolve",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(lE=un.InlayHintResolveRequest||(un.InlayHintResolveRequest={}));var uE;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType0(t.method)})(uE=un.InlayHintRefreshRequest||(un.InlayHintRefreshRequest={}))});var Hg=H(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var jg=Qn(),fE=yl(),Qo=ot(),dE;(function(t){function e(r){let n=r;return n&&fE.boolean(n.retriggerRequest)}t.is=e})(dE=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var pE;(function(t){t.Full="full",t.Unchanged="unchanged"})(pE=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var mE;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method),t.partialResult=new jg.ProgressType})(mE=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var hE;(function(t){t.method="workspace/diagnostic",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method),t.partialResult=new jg.ProgressType})(hE=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var yE;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType0(t.method)})(yE=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var Wg=H(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.DidCloseNotebookDocumentNotification=Re.DidSaveNotebookDocumentNotification=Re.DidChangeNotebookDocumentNotification=Re.NotebookCellArrayChange=Re.DidOpenNotebookDocumentNotification=Re.NotebookDocumentSyncRegistrationType=Re.NotebookDocument=Re.NotebookCell=Re.ExecutionSummary=Re.NotebookCellKind=void 0;var Ga=co(),fn=yl(),wn=ot(),Kg;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Kg=Re.NotebookCellKind||(Re.NotebookCellKind={}));var Bg;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return fn.objectLiteral(o)&&Ga.uinteger.is(o.executionOrder)&&(o.success===void 0||fn.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Bg=Re.ExecutionSummary||(Re.ExecutionSummary={}));var ym;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return fn.objectLiteral(s)&&Kg.is(s.kind)&&Ga.DocumentUri.is(s.document)&&(s.metadata===void 0||fn.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Bg.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(fn.objectLiteral(o)&&fn.objectLiteral(s)){let l=Object.keys(o),u=Object.keys(s);if(l.length!==u.length||(l.sort(),u.sort(),!i(l,u)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(ym=Re.NotebookCell||(Re.NotebookCell={}));var gE;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return fn.objectLiteral(i)&&fn.string(i.uri)&&Ga.integer.is(i.version)&&fn.typedArray(i.cells,ym.is)}t.is=r})(gE=Re.NotebookDocument||(Re.NotebookDocument={}));var ja;(function(t){t.method="notebookDocument/sync",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.RegistrationType(t.method)})(ja=Re.NotebookDocumentSyncRegistrationType||(Re.NotebookDocumentSyncRegistrationType={}));var TE;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=ja.method})(TE=Re.DidOpenNotebookDocumentNotification||(Re.DidOpenNotebookDocumentNotification={}));var vE;(function(t){function e(n){let i=n;return fn.objectLiteral(i)&&Ga.uinteger.is(i.start)&&Ga.uinteger.is(i.deleteCount)&&(i.cells===void 0||fn.typedArray(i.cells,ym.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(vE=Re.NotebookCellArrayChange||(Re.NotebookCellArrayChange={}));var xE;(function(t){t.method="notebookDocument/didChange",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=ja.method})(xE=Re.DidChangeNotebookDocumentNotification||(Re.DidChangeNotebookDocumentNotification={}));var RE;(function(t){t.method="notebookDocument/didSave",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=ja.method})(RE=Re.DidSaveNotebookDocumentNotification||(Re.DidSaveNotebookDocumentNotification={}));var bE;(function(t){t.method="notebookDocument/didClose",t.messageDirection=wn.MessageDirection.clientToServer,t.type=new wn.ProtocolNotificationType(t.method),t.registrationMethod=ja.method})(bE=Re.DidCloseNotebookDocumentNotification||(Re.DidCloseNotebookDocumentNotification={}))});var tT=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var D=ot(),zg=co(),zt=yl(),SE=yg();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return SE.ImplementationRequest}});var AE=Tg();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return AE.TypeDefinitionRequest}});var Vg=vg();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return Vg.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return Vg.DidChangeWorkspaceFoldersNotification}});var wE=Rg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return wE.ConfigurationRequest}});var Xg=bg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Xg.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Xg.ColorPresentationRequest}});var kE=Ag();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return kE.FoldingRangeRequest}});var CE=kg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return CE.DeclarationRequest}});var EE=Eg();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return EE.SelectionRangeRequest}});var gm=$g();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return gm.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return gm.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return gm.WorkDoneProgressCancelNotification}});var Tm=Ng();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Tm.CallHierarchyPrepareRequest}});var Zo=_g();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Zo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Zo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Zo.SemanticTokensRegistrationType}});var $E=Pg();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return $E.ShowDocumentRequest}});var NE=Dg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return NE.LinkedEditingRangeRequest}});var lo=Lg();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return lo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return lo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return lo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return lo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return lo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return lo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return lo.WillDeleteFilesRequest}});var vm=Fg();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return vm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return vm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return vm.MonikerRequest}});var xm=Ug();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return xm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return xm.TypeHierarchySupertypesRequest}});var Yg=qg();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Yg.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Yg.InlineValueRefreshRequest}});var Rm=Gg();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return Rm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Rm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Rm.InlayHintRefreshRequest}});var Ha=Hg();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Ha.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Ha.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Ha.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Ha.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Ha.DiagnosticRefreshRequest}});var kn=Wg();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return kn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return kn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return kn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return kn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return kn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return kn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return kn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return kn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return kn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return kn.DidCloseNotebookDocumentNotification}});var Jg;(function(t){function e(r){let n=r;return zt.string(n.language)||zt.string(n.scheme)||zt.string(n.pattern)}t.is=e})(Jg=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Qg;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebookType)||zt.string(n.scheme)||zt.string(n.pattern))}t.is=e})(Qg=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Zg;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zt.string(n.notebook)||Qg.is(n.notebook))&&(n.language===void 0||zt.string(n.language))}t.is=e})(Zg=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var eT;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!zt.string(n)&&!Jg.is(n)&&!Zg.is(n))return!1;return!0}t.is=e})(eT=h.DocumentSelector||(h.DocumentSelector={}));var _E;(function(t){t.method="client/registerCapability",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType(t.method)})(_E=h.RegistrationRequest||(h.RegistrationRequest={}));var IE;(function(t){t.method="client/unregisterCapability",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType(t.method)})(IE=h.UnregistrationRequest||(h.UnregistrationRequest={}));var PE;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(PE=h.ResourceOperationKind||(h.ResourceOperationKind={}));var OE;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(OE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var DE;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(DE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var LE;(function(t){function e(r){let n=r;return n&&zt.string(n.id)&&n.id.length>0}t.hasId=e})(LE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var ME;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||eT.is(n.documentSelector))}t.is=e})(ME=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var FE;(function(t){function e(n){let i=n;return zt.objectLiteral(i)&&(i.workDoneProgress===void 0||zt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&zt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(FE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var UE;(function(t){t.method="initialize",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(UE=h.InitializeRequest||(h.InitializeRequest={}));var qE;(function(t){t.unknownProtocolVersion=1})(qE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var GE;(function(t){t.method="initialized",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(GE=h.InitializedNotification||(h.InitializedNotification={}));var jE;(function(t){t.method="shutdown",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType0(t.method)})(jE=h.ShutdownRequest||(h.ShutdownRequest={}));var HE;(function(t){t.method="exit",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType0(t.method)})(HE=h.ExitNotification||(h.ExitNotification={}));var KE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(KE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var BE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(BE=h.MessageType||(h.MessageType={}));var WE;(function(t){t.method="window/showMessage",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(WE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var zE;(function(t){t.method="window/showMessageRequest",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType(t.method)})(zE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var VE;(function(t){t.method="window/logMessage",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(VE=h.LogMessageNotification||(h.LogMessageNotification={}));var XE;(function(t){t.method="telemetry/event",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(XE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var YE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(YE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var JE;(function(t){t.method="textDocument/didOpen",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(JE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var QE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(QE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var ZE;(function(t){t.method="textDocument/didChange",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(ZE=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var e$;(function(t){t.method="textDocument/didClose",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(e$=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var t$;(function(t){t.method="textDocument/didSave",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(t$=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var r$;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(r$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var n$;(function(t){t.method="textDocument/willSave",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(n$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var i$;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(i$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var o$;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(o$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var s$;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(s$=h.FileChangeType||(h.FileChangeType={}));var a$;(function(t){function e(r){let n=r;return zt.objectLiteral(n)&&(zg.URI.is(n.baseUri)||zg.WorkspaceFolder.is(n.baseUri))&&zt.string(n.pattern)}t.is=e})(a$=h.RelativePattern||(h.RelativePattern={}));var c$;(function(t){t.Create=1,t.Change=2,t.Delete=4})(c$=h.WatchKind||(h.WatchKind={}));var l$;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(l$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var u$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(u$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var f$;(function(t){t.method="textDocument/completion",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(f$=h.CompletionRequest||(h.CompletionRequest={}));var d$;(function(t){t.method="completionItem/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(d$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var p$;(function(t){t.method="textDocument/hover",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(p$=h.HoverRequest||(h.HoverRequest={}));var m$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(m$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var h$;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(h$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var y$;(function(t){t.method="textDocument/definition",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(y$=h.DefinitionRequest||(h.DefinitionRequest={}));var g$;(function(t){t.method="textDocument/references",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(g$=h.ReferencesRequest||(h.ReferencesRequest={}));var T$;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(T$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var v$;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(v$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var x$;(function(t){t.method="textDocument/codeAction",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(x$=h.CodeActionRequest||(h.CodeActionRequest={}));var R$;(function(t){t.method="codeAction/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(R$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var b$;(function(t){t.method="workspace/symbol",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(b$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var S$;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(S$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var A$;(function(t){t.method="textDocument/codeLens",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(A$=h.CodeLensRequest||(h.CodeLensRequest={}));var w$;(function(t){t.method="codeLens/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(w$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var k$;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType0(t.method)})(k$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var C$;(function(t){t.method="textDocument/documentLink",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(C$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var E$;(function(t){t.method="documentLink/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(E$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var $$;(function(t){t.method="textDocument/formatting",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})($$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var N$;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(N$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var _$;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(_$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var I$;(function(t){t.Identifier=1})(I$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var P$;(function(t){t.method="textDocument/rename",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(P$=h.RenameRequest||(h.RenameRequest={}));var O$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(O$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var D$;(function(t){t.method="workspace/executeCommand",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(D$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var L$;(function(t){t.method="workspace/applyEdit",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType("workspace/applyEdit")})(L$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var nT=H(bl=>{"use strict";Object.defineProperty(bl,"__esModule",{value:!0});bl.createProtocolConnection=void 0;var rT=Qn();function M$(t,e,r,n){return rT.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,rT.createMessageConnection)(t,e,r,n)}bl.createProtocolConnection=M$});var iT=H(mr=>{"use strict";var F$=mr&&mr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Sl=mr&&mr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&F$(e,t,r)};Object.defineProperty(mr,"__esModule",{value:!0});mr.LSPErrorCodes=mr.createProtocolConnection=void 0;Sl(Qn(),mr);Sl(co(),mr);Sl(ot(),mr);Sl(tT(),mr);var U$=nT();Object.defineProperty(mr,"createProtocolConnection",{enumerable:!0,get:function(){return U$.createProtocolConnection}});var q$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(q$=mr.LSPErrorCodes||(mr.LSPErrorCodes={}))});var Ct=H(Cn=>{"use strict";var G$=Cn&&Cn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),oT=Cn&&Cn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&G$(e,t,r)};Object.defineProperty(Cn,"__esModule",{value:!0});Cn.createProtocolConnection=void 0;var j$=um();oT(um(),Cn);oT(iT(),Cn);function H$(t,e,r,n){return(0,j$.createMessageConnection)(t,e,r,n)}Cn.createProtocolConnection=H$});var Sm=H(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.SemanticTokensBuilder=Ei.SemanticTokensDiff=Ei.SemanticTokensFeature=void 0;var Al=Ct(),K$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Al.SemanticTokensRefreshRequest.type),on:e=>{let r=Al.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Al.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Al.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ei.SemanticTokensFeature=K$;var wl=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ei.SemanticTokensDiff=wl;var bm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new wl(this._prevData,this._data).computeDiff()}:this.build()}};Ei.SemanticTokensBuilder=bm});var wm=H(kl=>{"use strict";Object.defineProperty(kl,"__esModule",{value:!0});kl.TextDocuments=void 0;var uo=Ct(),Am=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new uo.Emitter,this._onDidOpen=new uo.Emitter,this._onDidClose=new uo.Emitter,this._onDidSave=new uo.Emitter,this._onWillSave=new uo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=uo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),uo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};kl.TextDocuments=Am});var Cm=H(es=>{"use strict";Object.defineProperty(es,"__esModule",{value:!0});es.NotebookDocuments=es.NotebookSyncFeature=void 0;var Kr=Ct(),sT=wm(),B$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Kr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Kr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Kr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Kr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};es.NotebookSyncFeature=B$;var Cl=class t{onDidOpenTextDocument(e){return this.openHandler=e,Kr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Kr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Kr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};Cl.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var km=class{constructor(e){e instanceof sT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new sT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Kr.Emitter,this._onDidChange=new Kr.Emitter,this._onDidSave=new Kr.Emitter,this._onDidClose=new Kr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Cl,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let l=[],u=[],f=[],m=[];if(c.cells!==void 0){let k=c.cells;if(k.structure!==void 0){let v=k.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),k.structure.didOpen!==void 0)for(let g of k.structure.didOpen)r.openTextDocument({textDocument:g}),l.push(g.uri);if(k.structure.didClose)for(let g of k.structure.didClose)r.closeTextDocument({textDocument:g}),u.push(g.uri)}if(k.data!==void 0){let v=new Map(k.data.map(g=>[g.document,g]));for(let g=0;g<=o.cells.length;g++){let $=v.get(o.cells[g].document);if($!==void 0){let O=o.cells.splice(g,1,$);if(f.push({old:O[0],new:$}),v.delete($.document),v.size===0)break}}}if(k.textContent!==void 0)for(let v of k.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let S=[];for(let k of l)S.push(this.getNotebookCell(k));let w=[];for(let k of u)w.push(this.getNotebookCell(k));let N=[];for(let k of m)N.push(this.getNotebookCell(k));(S.length>0||w.length>0||f.length>0||N.length>0)&&(T.cells={added:S,removed:w,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Kr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};es.NotebookDocuments=km});var Em=H(Et=>{"use strict";Object.defineProperty(Et,"__esModule",{value:!0});Et.thenable=Et.typedArray=Et.stringArray=Et.array=Et.func=Et.error=Et.number=Et.string=Et.boolean=void 0;function W$(t){return t===!0||t===!1}Et.boolean=W$;function aT(t){return typeof t=="string"||t instanceof String}Et.string=aT;function z$(t){return typeof t=="number"||t instanceof Number}Et.number=z$;function V$(t){return t instanceof Error}Et.error=V$;function cT(t){return typeof t=="function"}Et.func=cT;function lT(t){return Array.isArray(t)}Et.array=lT;function X$(t){return lT(t)&&t.every(e=>aT(e))}Et.stringArray=X$;function Y$(t,e){return Array.isArray(t)&&t.every(e)}Et.typedArray=Y$;function J$(t){return t&&cT(t.then)}Et.thenable=J$});var $m=H(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.generateUuid=Br.parse=Br.isUUID=Br.v4=Br.empty=void 0;var Ka=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Ba=class t extends Ka{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Ba._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Ba._timeHighBits=["8","9","a","b"];Br.empty=new Ka("00000000-0000-0000-0000-000000000000");function uT(){return new Ba}Br.v4=uT;var Q$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function fT(t){return Q$.test(t)}Br.isUUID=fT;function Z$(t){if(!fT(t))throw new Error("invalid uuid");return new Ka(t)}Br.parse=Z$;function eN(){return uT().asHex()}Br.generateUuid=eN});var dT=H(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.attachPartialResult=Ni.ProgressFeature=Ni.attachWorkDone=void 0;var $i=Ct(),tN=$m(),fo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress($i.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress($i.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress($i.WorkDoneProgress.type,this._token,{kind:"end"})}};fo.Instances=new Map;var El=class extends fo{constructor(e,r){super(e,r),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Wa=class{constructor(){}begin(){}report(){}done(){}},$l=class extends Wa{constructor(){super(),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function rN(t,e){if(e===void 0||e.workDoneToken===void 0)return new Wa;let r=e.workDoneToken;return delete e.workDoneToken,new fo(t,r)}Ni.attachWorkDone=rN;var nN=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification($i.WorkDoneProgressCancelNotification.type,r=>{let n=fo.Instances.get(r.token);(n instanceof El||n instanceof $l)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Wa:new fo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,tN.generateUuid)();return this.connection.sendRequest($i.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new El(this.connection,e))}else return Promise.resolve(new $l)}};Ni.ProgressFeature=nN;var Nm;(function(t){t.type=new $i.ProgressType})(Nm||(Nm={}));var _m=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Nm.type,this._token,e)}};function iN(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new _m(t,r)}Ni.attachPartialResult=iN});var pT=H(Nl=>{"use strict";Object.defineProperty(Nl,"__esModule",{value:!0});Nl.ConfigurationFeature=void 0;var oN=Ct(),sN=Em(),aN=t=>class extends t{getConfiguration(e){return e?sN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(oN.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};Nl.ConfigurationFeature=aN});var mT=H(Il=>{"use strict";Object.defineProperty(Il,"__esModule",{value:!0});Il.WorkspaceFoldersFeature=void 0;var _l=Ct(),cN=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new _l.Emitter,this.connection.onNotification(_l.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(_l.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(_l.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Il.WorkspaceFoldersFeature=cN});var hT=H(Pl=>{"use strict";Object.defineProperty(Pl,"__esModule",{value:!0});Pl.CallHierarchyFeature=void 0;var Im=Ct(),lN=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Im.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Im.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Im.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Pl.CallHierarchyFeature=lN});var yT=H(Ol=>{"use strict";Object.defineProperty(Ol,"__esModule",{value:!0});Ol.ShowDocumentFeature=void 0;var uN=Ct(),fN=t=>class extends t{showDocument(e){return this.connection.sendRequest(uN.ShowDocumentRequest.type,e)}};Ol.ShowDocumentFeature=fN});var gT=H(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.FileOperationsFeature=void 0;var ts=Ct(),dN=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(ts.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(ts.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(ts.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(ts.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(ts.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(ts.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Dl.FileOperationsFeature=dN});var TT=H(Ll=>{"use strict";Object.defineProperty(Ll,"__esModule",{value:!0});Ll.LinkedEditingRangeFeature=void 0;var pN=Ct(),mN=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(pN.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Ll.LinkedEditingRangeFeature=mN});var vT=H(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.TypeHierarchyFeature=void 0;var Pm=Ct(),hN=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Pm.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Pm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Pm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ml.TypeHierarchyFeature=hN});var RT=H(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.InlineValueFeature=void 0;var xT=Ct(),yN=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(xT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(xT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Fl.InlineValueFeature=yN});var bT=H(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.InlayHintFeature=void 0;var Om=Ct(),gN=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Om.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Om.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Om.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Ul.InlayHintFeature=gN});var ST=H(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.DiagnosticFeature=void 0;var za=Ct(),TN=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(za.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(za.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(za.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(za.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(za.WorkspaceDiagnosticRequest.partialResult,r)))}}};ql.DiagnosticFeature=TN});var AT=H(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.MonikerFeature=void 0;var vN=Ct(),xN=t=>class extends t{get moniker(){return{on:e=>{let r=vN.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Gl.MonikerFeature=xN});var MT=H(ye=>{"use strict";Object.defineProperty(ye,"__esModule",{value:!0});ye.createConnection=ye.combineFeatures=ye.combineNotebooksFeatures=ye.combineLanguagesFeatures=ye.combineWorkspaceFeatures=ye.combineWindowFeatures=ye.combineClientFeatures=ye.combineTracerFeatures=ye.combineTelemetryFeatures=ye.combineConsoleFeatures=ye._NotebooksImpl=ye._LanguagesImpl=ye.BulkUnregistration=ye.BulkRegistration=ye.ErrorMessageTracker=void 0;var U=Ct(),Wr=Em(),Lm=$m(),te=dT(),RN=pT(),bN=mT(),SN=hT(),AN=Sm(),wN=yT(),kN=gT(),CN=TT(),EN=vT(),$N=RT(),NN=bT(),_N=ST(),IN=Cm(),PN=AT();function Dm(t){if(t!==null)return t}var Mm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};ye.ErrorMessageTracker=Mm;var jl=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},Fm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Dm)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Dm)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Dm)}},wT=(0,wN.ShowDocumentFeature)((0,te.ProgressFeature)(Fm)),ON;(function(t){function e(){return new Hl}t.create=e})(ON=ye.BulkRegistration||(ye.BulkRegistration={}));var Hl=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Wr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Lm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},DN;(function(t){function e(){return new Va(void 0,[])}t.create=e})(DN=ye.BulkUnregistration||(ye.BulkUnregistration={}));var Va=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Wr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Kl=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Hl?this.registerMany(e):e instanceof Va?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Wr.string(r)?r:r.method,o=Lm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Wr.string(e)?e:e.method,i=Lm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new Va(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},Um=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},kT=(0,kN.FileOperationsFeature)((0,bN.WorkspaceFoldersFeature)((0,RN.ConfigurationFeature)(Um))),Bl=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Wl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},zl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};ye._LanguagesImpl=zl;var CT=(0,PN.MonikerFeature)((0,_N.DiagnosticFeature)((0,NN.InlayHintFeature)((0,$N.InlineValueFeature)((0,EN.TypeHierarchyFeature)((0,CN.LinkedEditingRangeFeature)((0,AN.SemanticTokensFeature)((0,SN.CallHierarchyFeature)(zl)))))))),Vl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};ye._NotebooksImpl=Vl;var ET=(0,IN.NotebookSyncFeature)(Vl);function $T(t,e){return function(r){return e(t(r))}}ye.combineConsoleFeatures=$T;function NT(t,e){return function(r){return e(t(r))}}ye.combineTelemetryFeatures=NT;function _T(t,e){return function(r){return e(t(r))}}ye.combineTracerFeatures=_T;function IT(t,e){return function(r){return e(t(r))}}ye.combineClientFeatures=IT;function PT(t,e){return function(r){return e(t(r))}}ye.combineWindowFeatures=PT;function OT(t,e){return function(r){return e(t(r))}}ye.combineWorkspaceFeatures=OT;function DT(t,e){return function(r){return e(t(r))}}ye.combineLanguagesFeatures=DT;function LT(t,e){return function(r){return e(t(r))}}ye.combineNotebooksFeatures=LT;function LN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,$T),tracer:r(t.tracer,e.tracer,_T),telemetry:r(t.telemetry,e.telemetry,NT),client:r(t.client,e.client,IT),window:r(t.window,e.window,PT),workspace:r(t.workspace,e.workspace,OT),languages:r(t.languages,e.languages,DT),notebooks:r(t.notebooks,e.notebooks,LT)}}ye.combineFeatures=LN;function MN(t,e,r){let n=r&&r.console?new(r.console(jl)):new jl,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Bl)):new Bl,s=r&&r.telemetry?new(r.telemetry(Wl)):new Wl,a=r&&r.client?new(r.client(Kl)):new Kl,c=r&&r.window?new(r.window(wT)):new wT,l=r&&r.workspace?new(r.workspace(kT)):new kT,u=r&&r.languages?new(r.languages(CT)):new CT,f=r&&r.notebooks?new(r.notebooks(ET)):new ET,m=[n,o,s,a,c,l,u,f];function T(v){return v instanceof Promise?v:Wr.thenable(v)?new Promise((g,$)=>{v.then(O=>g(O),O=>$(O))}):Promise.resolve(v)}let S,w,N,k={listen:()=>i.listen(),sendRequest:(v,...g)=>i.sendRequest(Wr.string(v)?v:v.method,...g),onRequest:(v,g)=>i.onRequest(v,g),sendNotification:(v,g)=>{let $=Wr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,g)},onNotification:(v,g)=>i.onNotification(v,g),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(w=v,{dispose:()=>{w=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(S=v,{dispose:()=>{S=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return l},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(g,$)=>v(g,$)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(g,$)=>v(g,$)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(g,$)=>v(g,$)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(g,$)=>v(g,$)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(g,$)=>v(g,$)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(k);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),Wr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let g of m)g.initialize(v.capabilities);if(w){let g=w(v,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(g).then($=>{if($ instanceof U.ResponseError)return $;let O=$;O||(O={capabilities:{}});let X=O.capabilities;X||(X={},O.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Wr.number(k.__textDocumentSync)?k.__textDocumentSync:U.TextDocumentSyncKind.None:!Wr.number(X.textDocumentSync)&&!Wr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Wr.number(k.__textDocumentSync)?k.__textDocumentSync:U.TextDocumentSyncKind.None);for(let Te of m)Te.fillServerCapabilities(X);return O})}else{let g={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(g.capabilities);return g}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,S)return S(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),k}ye.createConnection=MN});var qm=H(Vt=>{"use strict";var FN=Vt&&Vt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),FT=Vt&&Vt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&FN(e,t,r)};Object.defineProperty(Vt,"__esModule",{value:!0});Vt.ProposedFeatures=Vt.NotebookDocuments=Vt.TextDocuments=Vt.SemanticTokensBuilder=void 0;var UN=Sm();Object.defineProperty(Vt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return UN.SemanticTokensBuilder}});FT(Ct(),Vt);var qN=wm();Object.defineProperty(Vt,"TextDocuments",{enumerable:!0,get:function(){return qN.TextDocuments}});var GN=Cm();Object.defineProperty(Vt,"NotebookDocuments",{enumerable:!0,get:function(){return GN.NotebookDocuments}});FT(MT(),Vt);var jN;(function(t){t.all={__brand:"features"}})(jN=Vt.ProposedFeatures||(Vt.ProposedFeatures={}))});var qT=H((RH,UT)=>{"use strict";UT.exports=Ct()});var Ae=H(En=>{"use strict";var HN=En&&En.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),jT=En&&En.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&HN(e,t,r)};Object.defineProperty(En,"__esModule",{value:!0});En.createConnection=void 0;var Xl=qm();jT(qT(),En);jT(qm(),En);var GT=!1,KN={initialize:t=>{},get shutdownReceived(){return GT},set shutdownReceived(t){GT=t},exit:t=>{}};function BN(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Xl.ConnectionStrategy.is(t)||Xl.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let c=l=>(0,Xl.createProtocolConnection)(o,s,l,a);return(0,Xl.createConnection)(c,KN,i)}En.createConnection=BN});var ik=H((Kce,nk)=>{"use strict";nk.exports=Ae()});var rk=de(Ae(),1);var Yl=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=BT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),l=this._lineOffsets,u=HT(n.text,!1,o);if(c-a===u.length)for(let m=0,T=u.length;m<T;m++)l[m+a+1]=u[m];else u.length<1e4?l.splice(a+1,c-a,...u):this._lineOffsets=l=l.slice(0,a+1).concat(u,l.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,T=l.length;m<T;m++)l[m]=l[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=HT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return e=this.ensureBeforeEOL(e,r[o]),{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line];if(e.character<=0)return n;let i=e.line+1<r.length?r[e.line+1]:this._content.length,o=Math.min(n+e.character,i);return this.ensureBeforeEOL(o,n)}ensureBeforeEOL(e,r){for(;e>r&&KT(this._content.charCodeAt(e-1));)e--;return e}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},rs;(function(t){function e(i,o,s,a){return new Yl(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Yl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=Gm(o.map(WN),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),c=0,l=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&l.push(s.substring(c,f)),u.newText.length&&l.push(u.newText),c=i.offsetAt(u.range.end)}return l.push(s.substr(c)),l.join("")}t.applyEdits=n})(rs||(rs={}));function Gm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);Gm(n,e),Gm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function HT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);KT(o)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function KT(t){return t===13||t===10}function BT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function WN(t){let e=BT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function $t(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function ei(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function WT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function ns(t){return typeof t=="object"&&t!==null&&$t(t.container)&&ei(t.reference)&&typeof t.message=="string"}var po=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return $t(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function $n(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function mo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function zT(t){return $n(t)&&typeof t.fullText=="string"}var Pr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return hr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=zN(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?hr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return hr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(Jl(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return hr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(Jl(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return hr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?hr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function zN(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Jl(t){return!!t&&typeof t[Symbol.iterator]=="function"}var is=new Pr(()=>{},()=>hr),hr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Pr)return e;if(Jl(e))return new Pr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Pr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:hr)}return t.length>1?new Pr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Jl(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return hr}):is}var zr=class extends Pr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return hr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Xa;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Xa=Xa||(Xa={}));function jm(t){return new zr(t,e=>$n(e)?e.content:[],{includeRoot:!0})}function YT(t){return jm(t).filter(mo)}function JT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Ya(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function or(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var ti;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(ti=ti||(ti={}));function VN(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return ti.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return ti.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?ti.Inside:r?ti.OverlapBack:ti.OverlapFront}function Ql(t,e){return VN(t,e)>ti.After}var Hm=/^[\w\p{L}]$/u;function Ot(t,e,r=Hm){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Sr(t,e)}}function QT(t,e){if(t){let r=XN(t,!0);if(r&&VT(r,e))return r;if(zT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(VT(o,e))return o}}}}function VT(t,e){return mo(t)&&e.includes(t.tokenType.name)}function Sr(t,e){if(mo(t))return t;if($n(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return Sr(o,e)}if(r===n)return Sr(t.content[r],e)}}function XN(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function ZT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function ev(t,e){let r=YN(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function YN(t,e){let r=XT(t),n=XT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function XT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function ho(t,e,r,n){let i=[t,e,r,n].reduce(iv,{});return nv(i)}var Km=Symbol("isProxy");function Zl(t){if(t&&t[Km])for(let e of Object.values(t))Zl(e);return t}function nv(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>rv(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(rv(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Km]});return r[Km]=!0,r}var tv=Symbol();function rv(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===tv)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=tv;try{t[e]=typeof i=="function"?i(n):nv(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function iv(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=iv(i,n):t[r]=n}}return t}var Me=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Xa.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Bm="AbstractRule";var yo="AbstractType";var JN="Condition";var QN="TypeDefinition";var Wm="AbstractElement";function os(t){return le.isInstance(t,Wm)}var ov="ArrayType";function go(t){return le.isInstance(t,ov)}var sv="Conjunction";function av(t){return le.isInstance(t,sv)}var cv="Disjunction";function lv(t){return le.isInstance(t,cv)}var uv="Grammar";function ss(t){return le.isInstance(t,uv)}var ZN="GrammarImport";function eu(t){return le.isInstance(t,ZN)}var e_="InferredType";function as(t){return le.isInstance(t,e_)}var Qa="Interface";function Ar(t){return le.isInstance(t,Qa)}var fv="LiteralCondition";function dv(t){return le.isInstance(t,fv)}var pv="Negation";function mv(t){return le.isInstance(t,pv)}var hv="Parameter";function yv(t){return le.isInstance(t,hv)}var gv="ParameterReference";function cs(t){return le.isInstance(t,gv)}var Tv="ParserRule";function K(t){return le.isInstance(t,Tv)}var vv="ReferenceType";function To(t){return le.isInstance(t,vv)}var t_="ReturnType";function ls(t){return le.isInstance(t,t_)}var xv="SimpleType";function sr(t){return le.isInstance(t,xv)}var zm="TerminalRule";function we(t){return le.isInstance(t,zm)}var Za="Type";function Ft(t){return le.isInstance(t,Za)}var r_="TypeAttribute";function tu(t){return le.isInstance(t,r_)}var Rv="UnionType";function Vr(t){return le.isInstance(t,Rv)}var bv="Action";function _e(t){return le.isInstance(t,bv)}var Sv="Alternatives";function Or(t){return le.isInstance(t,Sv)}var Av="Assignment";function be(t){return le.isInstance(t,Av)}var wv="CharacterRange";function ru(t){return le.isInstance(t,wv)}var kv="CrossReference";function Xt(t){return le.isInstance(t,kv)}var Cv="Group";function Ut(t){return le.isInstance(t,Cv)}var Ev="Keyword";function mt(t){return le.isInstance(t,Ev)}var $v="NegatedToken";function Nv(t){return le.isInstance(t,$v)}var _v="RegexToken";function Iv(t){return le.isInstance(t,_v)}var Pv="RuleCall";function Ie(t){return le.isInstance(t,Pv)}var Ov="TerminalAlternatives";function Dv(t){return le.isInstance(t,Ov)}var Lv="TerminalGroup";function Mv(t){return le.isInstance(t,Lv)}var Fv="TerminalRuleCall";function nu(t){return le.isInstance(t,Fv)}var Uv="UnorderedGroup";function Dr(t){return le.isInstance(t,Uv)}var qv="UntilToken";function Gv(t){return le.isInstance(t,qv)}var jv="Wildcard";function Hv(t){return le.isInstance(t,jv)}var Ja=class extends po{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case bv:return this.isSubtype(Wm,r)||this.isSubtype(yo,r);case Sv:case Av:case wv:case kv:case Cv:case Ev:case $v:case _v:case Pv:case Ov:case Lv:case Fv:case Uv:case qv:case jv:return this.isSubtype(Wm,r);case ov:case vv:case xv:case Rv:return this.isSubtype(QN,r);case sv:case cv:case fv:case pv:case gv:return this.isSubtype(JN,r);case Qa:case Za:return this.isSubtype(yo,r);case Tv:return this.isSubtype(Bm,r)||this.isSubtype(yo,r);case zm:return this.isSubtype(Bm,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return yo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Bm;case"Grammar:usedGrammars":return uv;case"NamedArgument:parameter":case"ParameterReference:parameter":return hv;case"TerminalRuleCall:rule":return zm;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Ja;function Kv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{$t(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):$t(r)&&(r.$container=t,r.$containerProperty=e))}function Pe(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=iu(t).$document;if(!r)throw new Error("AST node has no document.");return r}function iu(t){for(;t.$container;)t=t.$container;return t}function _i(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if($t(o)){if(n.keyIndex++,Vm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if($t(a)&&Vm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return hr})}function Ze(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new zr(t,r=>_i(r,e))}function ni(t,e){if(t){if(e?.range&&!Vm(t,e.range))return new zr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new zr(t,r=>_i(r,e),{includeRoot:!0})}function Vm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Ql(n,e):!1}function ou(t){return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(ei(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(ei(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return hr})}function Bv(t){var e,r;if(t){if("astNode"in t)return o_(t);if(Array.isArray(t))return t.reduce(Wv,void 0);{let n=t,i=n_(n)?i_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return us(n,i)}}else return}function n_(t){return typeof t<"u"&&"element"in t&&"text"in t}function i_(t){try{return ne(t).uri.toString()}catch{return}}function o_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return us(s,Xm(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(Wv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let c=a(s.assignments[i]);return c&&us(c,Xm(n))}else if(n.$cstNode){let c=a(Ii(n.$cstNode,i));return c&&us(c,Xm(n))}else return}}}function Xm(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new zr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function us(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Wv(t,e){var r,n;if(t){if(!e)return t&&us(t)}else return e&&us(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),c=a-s,l={offset:s,end:a,length:c};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let u=t.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;l.fileURI=m}return l}var Ym=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=s_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function s_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function zv(t,e){let r=new Ym(e),n=r.pushTraceRegion(void 0);Vv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Vv(t,e){typeof t=="string"?a_(t,e):t instanceof fs?c_(t,e):t instanceof Yt?Jv(t,e):t instanceof Pi&&l_(t,e)}function Xv(t,e){return typeof t=="string"?t.length!==0:t instanceof Yt?t.contents.some(r=>Xv(r,e)):t instanceof Pi?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function a_(t,e){t&&(e.pendingIndent&&Yv(e,!1),e.append(t))}function Yv(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Jv(t,e){let r,n=Bv(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Vv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function c_(t,e){var r;if(Xv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Jv(t,e)}finally{e.decreaseIndent()}}}function l_(t,e){t.ifNotEmpty&&!u_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Yv(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function u_(t){return t.trimStart()!==""}var BH=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),ec=/\r?\n/g,f_=/\S|$/;function Qv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(f_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function Qm(t,...e){let r=d_(t),n=p_(t,e,r);return h_(n)}function tx(t,e,r){return(n,...i)=>Zm(t,e,r)(Qm(n,...i))}function d_(t){let e=t.join("_").split(ec),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Qv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function p_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((l,u)=>{s.push(...l.split(ec).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(u===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(su,m):(f,m,T)=>T===0?[m]:f.concat(su,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(tc(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?rx:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===su?s.slice(0,a-2):s.slice(0,a-1):s}var su={isNewLine:!0},rx={isUndefinedSegment:!0},ex=t=>t===su,Jm=t=>t===rx,m_=t=>t.content!==void 0;function h_(t){return t.reduce((r,n,i)=>Jm(n)?r:ex(n)?{node:i!==0&&(Jm(t[i-1])||tc(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Jm(t[i-2])||tc(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||ex(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=m_(n)?n.content:n,c;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>c=l.append(a)}):r.node.append(a),indented:c??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Yt}).node}var Zv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function tc(t){return t instanceof Yt||t instanceof fs||t instanceof Pi}function ds(t,e){return tc(t)?zv(t,e).text:String(t)}var Yt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if($t(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(at)}appendNewLineIf(e){return e?this.append(at):this}appendNewLineIfNotEmpty(){return this.append(y_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(Qm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new fs(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(tx(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function Zm(t,e,r){return n=>n instanceof Yt&&n.tracedSource===void 0?n.trace(t,e,r):new Yt().trace(t,e,r).append(n)}var fs=class extends Yt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},Pi=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Zv,this.ifNotEmpty=r}},at=new Pi,y_=new Pi(void 0,!0);function ii(t){return"referenceType"in t}function oi(t){return"elementType"in t}function Dt(t){return"types"in t}function rh(t){if(Dt(t)){let e=[];for(let r of t.types)e.push(...rh(r));return e}else return[t]}function Lr(t){return"value"in t}function Mr(t){return"primitive"in t}function Nn(t){return"string"in t}function dn(t){return t&&"type"in t}function mn(t){return t&&"properties"in t}var cu=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Yt;return r.append(`export type ${this.name} = ${pn(this.type,"AstType")};`,at),e&&(r.append(at),ox(r,this.name)),this.dataType&&g_(r,this),ds(r)}toDeclaredTypesString(e){let r=new Yt;return r.append(`type ${nh(this.name,e)} = ${pn(this.type,"DeclaredType")};`,at),ds(r)}},ps=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=mn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Yt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?vo([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,at),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${vo([...this.containerTypes].map(s=>s.name)).join(" | ")};`,at),this.typeNames.size>0&&o.append(`readonly $type: ${vo([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,at),nx(o,this.properties,"AstType")}),r.append("}",at),e&&(r.append(at),ox(r,this.name)),ds(r)}toDeclaredTypesString(e){let r=new Yt,n=nh(this.name,e),i=vo(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,at),r.indent(o=>nx(o,this.properties,"DeclaredType",e)),r.append("}",at),ds(r)}},lu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function nc(t,e){return Oi(t,e,new Map)}function Oi(t,e,r){let n=`${rc(t)}\xBB${rc(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Dt(t)?i=t.types.every(o=>Oi(o,e,r)):Dt(e)?i=e.types.some(o=>Oi(t,o,r)):Lr(e)&&dn(e.value)?Lr(t)&&dn(t.value)&&e.value.name===t.value.name?i=!0:i=Oi(t,e.value.type,r):ii(t)?i=ii(e)&&Oi(t.referenceType,e.referenceType,r):oi(t)?i=oi(e)&&Oi(t.elementType,e.elementType,r):Lr(t)?dn(t.value)?i=Oi(t.value.type,e,r):Lr(e)?dn(e.value)?i=Oi(t,e.value.type,r):i=ix(t.value,e.value,new Set):i=!1:Mr(t)?i=Mr(e)&&t.primitive===e.primitive:Nn(t)&&(i=Mr(e)&&e.primitive==="string"||Nn(e)&&e.string===t.string),i&&r.set(n,i)),i}function ix(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(mn(i)&&ix(i,e,r))return!0;return!1}function rc(t){if(ii(t))return`@(${rc(t.referenceType)})}`;if(oi(t))return`(${rc(t.elementType)})[]`;if(Dt(t)){let e=t.types.map(r=>rc(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Lr(t))return`Value<${t.value.name}>`;if(Mr(t))return t.primitive;if(Nn(t))return`'${t.string}'`}throw new Error("Invalid type")}function pn(t,e="AstType"){if(ii(t)){let r=pn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${eh(t.referenceType,r)}`}else if(oi(t)){let r=pn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${eh(t.elementType,r)}[]`}else if(Dt(t)){let r=t.types.map(n=>eh(n,pn(n,e)));return vo(r).join(" | ")}else{if(Lr(t))return t.value.name;if(Mr(t))return t.primitive;if(Nn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function eh(t,e){return Dt(t)&&(e=`(${e})`),e}function nx(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:nh(o.name,n),a=o.optional&&!uu(o.type),c=pn(o.type,r);return`${s}${a?"?":""}: ${c}`}vo(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),at))}function uu(t){return oi(t)?!0:ii(t)?!1:Dt(t)?t.types.every(e=>uu(e)):Mr(t)?t.primitive==="boolean":!1}function ox(t,e){t.append(`export const ${e} = '${e}';`,at),t.append(at),t.append(`export function is${e}(item: unknown): item is ${e} {`,at),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,at)),t.append("}",at)}function g_(t,e){switch(e.dataType){case"string":if(th(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=sx(e.type),i=ax(e.type);if(r.length===0&&n.length===0&&i.length===0)au(t,e.name,`typeof item === '${e.dataType}'`);else{let o=T_(r,n,i);au(t,e.name,o)}}break;case"number":case"boolean":case"bigint":au(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":au(t,e.name,"item instanceof Date");break;default:return}}function th(t){let e=!0;if(Mr(t))return t.primitive==="string";if(Nn(t))return!0;if(Dt(t)){for(let r of t.types)if(Lr(r))if(dn(r.value)){if(!th(r.value.type))return!1}else return!1;else if(Mr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Dt(r))e=th(r);else if(!Nn(r))return!1}else return!1;return e}function T_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function nh(t,e){return e.has(t)?`^${t}`:t}function sx(t){let e=[];if(Nn(t))return[t.string];if(Dt(t))for(let r of t.types)Nn(r)?e.push(r.string):Dt(r)&&e.push(...sx(r));return e}function ax(t){let e=[];if(Mr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Dt(t))for(let r of t.types)Mr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Dt(r)&&e.push(...ax(r));return e}function au(t,e,r){t.append(at,`export function is${e}(item: unknown): item is ${e} {`,at),t.indent(n=>n.append(`return ${r};`,at)),t.append("}",at)}function vo(t,e){return Array.from(new Set(t)).sort(e)}function ih(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);Ar(c)?(i.add(c),ih(c,e,r,n).forEach(u=>i.add(u))):c&&Ft(c.$container)&&i.add(c.$container)}),i}function ic(t){let e=new Set;if(Ar(t))e.add(t),t.superTypes.forEach(r=>{if(Ar(r.ref)){e.add(r.ref);let n=ic(r.ref);for(let i of n)e.add(i)}});else if(Ft(t)){let r=cx(t.type);for(let n of r){let i=ic(n);for(let o of i)e.add(o)}}return e}function cx(t){var e;if(Vr(t))return t.types.flatMap(r=>cx(r));if(sr(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Ft(r)||Ar(r))return[r]}return[]}function oh(t,e){return t.interfaces.concat(e.interfaces)}function du(t){return t.interfaces.concat(t.unions)}function lx(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function ux(t){return fu(t,new Set)}function fu(t,e){if(e.has(t))return[];if(e.add(t),Dt(t))return t.types.flatMap(r=>fu(r,e));if(Lr(t)){let r=t.value;return"type"in r?fu(r.type,e):[r.name]}else if(oi(t))return fu(t.elementType,e);return[]}function oc(t){return typeof t.name=="string"}var ms=class{getName(e){if(oc(e))return e.name}getNameNode(e){return Jt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function pu(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function hs(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function xo(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function sc(){throw Error("Internal Error - Should never get here!")}function sh(t){return t.type==="Character"}var ac=[];for(let t=J("0");t<=J("9");t++)ac.push(t);var cc=[J("_")].concat(ac);for(let t=J("a");t<=J("z");t++)cc.push(t);for(let t=J("A");t<=J("Z");t++)cc.push(t);var ah=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var v_=/[0-9a-fA-F]/,mu=/[0-9]/,x_=/[1-9]/,Ro=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":hs(n,"global");break;case"i":hs(n,"ignoreCase");break;case"m":hs(n,"multiLine");break;case"u":hs(n,"unicode");break;case"y":hs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}xo(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return sc()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;xo(r);break}if(!(e===!0&&r===void 0)&&xo(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),xo(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):sc()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=ac;break;case"D":e=ac,r=!0;break;case"s":e=ah;break;case"S":e=ah,r=!0;break;case"w":e=cc;break;case"W":e=cc,r=!0;break}return xo(e)?{type:"Set",value:e,complement:r}:sc()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return xo(e)?{type:"Character",value:e}:sc()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(sh(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(sh(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else pu(n.value,e),e.push(J("-")),pu(o.value,e)}else pu(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(x_.test(e)===!1)throw Error("Expecting a positive integer");for(;mu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(mu.test(e)===!1)throw Error("Expecting an integer");for(;mu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return mu.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(v_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var _n=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var R_=new Ro,lh=class extends _n{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=si(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},ch=new lh;function fx(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),ch.reset(t),ch.visit(R_.pattern(t)),ch.multiline}catch{return!1}}function uh(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function si(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function dx(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:si(e)).join("")}function px(t,e){let r=b_(t),n=e.match(r);return!!n&&n[0].length>0}function b_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(l){o+=r.substr(n,l),n+=l}function c(l){o+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?r[n+2]==="{"?c(r.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(r.indexOf("}",n)-n+1):c(2);break;case"k":c(r.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):c(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),t.flags)}var fh={};Dk(fh,{URI:()=>hu,Utils:()=>S_});var mx;(()=>{"use strict";var t={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,l){for(var u,f="",m=0,T=-1,S=0,w=0;w<=c.length;++w){if(w<c.length)u=c.charCodeAt(w);else{if(u===47)break;u=47}if(u===47){if(!(T===w-1||S===1))if(T!==w-1&&S===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=w,S=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=w,S=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(T+1,w):f=c.slice(T+1,w),m=w-T-1;T=w,S=0}else u===46&&S!==-1?++S:S=-1}return f}var a={resolve:function(){for(var c,l="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(l=m+"/"+l,u=m.charCodeAt(0)===47)}return l=s(l,!u),u?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(c){if(o(c),c.length===0)return".";var l=c.charCodeAt(0)===47,u=c.charCodeAt(c.length-1)===47;return(c=s(c,!l)).length!==0||l||(c="."),c.length>0&&u&&(c+="/"),l?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,l=0;l<arguments.length;++l){var u=arguments[l];o(u),u.length>0&&(c===void 0?c=u:c+="/"+u)}return c===void 0?".":a.normalize(c)},relative:function(c,l){if(o(c),o(l),c===l||(c=a.resolve(c))===(l=a.resolve(l)))return"";for(var u=1;u<c.length&&c.charCodeAt(u)===47;++u);for(var f=c.length,m=f-u,T=1;T<l.length&&l.charCodeAt(T)===47;++T);for(var S=l.length-T,w=m<S?m:S,N=-1,k=0;k<=w;++k){if(k===w){if(S>w){if(l.charCodeAt(T+k)===47)return l.slice(T+k+1);if(k===0)return l.slice(T+k)}else m>w&&(c.charCodeAt(u+k)===47?N=k:k===0&&(N=0));break}var v=c.charCodeAt(u+k);if(v!==l.charCodeAt(T+k))break;v===47&&(N=k)}var g="";for(k=u+N+1;k<=f;++k)k!==f&&c.charCodeAt(k)!==47||(g.length===0?g+="..":g+="/..");return g.length>0?g+l.slice(T+N):(T+=N,l.charCodeAt(T)===47&&++T,l.slice(T))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var l=c.charCodeAt(0),u=l===47,f=-1,m=!0,T=c.length-1;T>=1;--T)if((l=c.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":c.slice(0,f)},basename:function(c,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(c);var u,f=0,m=-1,T=!0;if(l!==void 0&&l.length>0&&l.length<=c.length){if(l.length===c.length&&l===c)return"";var S=l.length-1,w=-1;for(u=c.length-1;u>=0;--u){var N=c.charCodeAt(u);if(N===47){if(!T){f=u+1;break}}else w===-1&&(T=!1,w=u+1),S>=0&&(N===l.charCodeAt(S)?--S==-1&&(m=u):(S=-1,m=w))}return f===m?m=w:m===-1&&(m=c.length),c.slice(f,m)}for(u=c.length-1;u>=0;--u)if(c.charCodeAt(u)===47){if(!T){f=u+1;break}}else m===-1&&(T=!1,m=u+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var l=-1,u=0,f=-1,m=!0,T=0,S=c.length-1;S>=0;--S){var w=c.charCodeAt(S);if(w!==47)f===-1&&(m=!1,f=S+1),w===46?l===-1?l=S:T!==1&&(T=1):l!==-1&&(T=-1);else if(!m){u=S+1;break}}return l===-1||f===-1||T===0||T===1&&l===f-1&&l===u+1?"":c.slice(l,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(l,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var l={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return l;var u,f=c.charCodeAt(0),m=f===47;m?(l.root="/",u=1):u=0;for(var T=-1,S=0,w=-1,N=!0,k=c.length-1,v=0;k>=u;--k)if((f=c.charCodeAt(k))!==47)w===-1&&(N=!1,w=k+1),f===46?T===-1?T=k:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){S=k+1;break}return T===-1||w===-1||v===0||v===1&&T===w-1&&T===S+1?w!==-1&&(l.base=l.name=S===0&&m?c.slice(1,w):c.slice(S,w)):(S===0&&m?(l.name=c.slice(1,T),l.base=c.slice(1,w)):(l.name=c.slice(S,T),l.base=c.slice(S,w)),l.ext=c.slice(T,w)),S>0?l.dir=c.slice(0,S-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>Rt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,A){if(!M.scheme&&A)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(A){return A instanceof m||!!A&&typeof A.authority=="string"&&typeof A.fragment=="string"&&typeof A.path=="string"&&typeof A.query=="string"&&typeof A.scheme=="string"&&typeof A.fsPath=="string"&&typeof A.with=="function"&&typeof A.toString=="function"}scheme;authority;path;query;fragment;constructor(A,q,j,ce,ee,Q=!1){typeof A=="object"?(this.scheme=A.scheme||l,this.authority=A.authority||l,this.path=A.path||l,this.query=A.query||l,this.fragment=A.fragment||l):(this.scheme=function(bt,ft){return bt||ft?bt:"file"}(A,Q),this.authority=q||l,this.path=function(bt,ft){switch(bt){case"https":case"http":case"file":ft?ft[0]!==u&&(ft=u+ft):ft=u}return ft}(this.scheme,j||l),this.query=ce||l,this.fragment=ee||l,c(this,Q))}get fsPath(){return v(this,!1)}with(A){if(!A)return this;let{scheme:q,authority:j,path:ce,query:ee,fragment:Q}=A;return q===void 0?q=this.scheme:q===null&&(q=l),j===void 0?j=this.authority:j===null&&(j=l),ce===void 0?ce=this.path:ce===null&&(ce=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),q===this.scheme&&j===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new S(q,j,ce,ee,Q)}static parse(A,q=!1){let j=f.exec(A);return j?new S(j[2]||l,X(j[4]||l),X(j[5]||l),X(j[7]||l),X(j[9]||l),q):new S(l,l,l,l,l)}static file(A){let q=l;if(i&&(A=A.replace(/\\/g,u)),A[0]===u&&A[1]===u){let j=A.indexOf(u,2);j===-1?(q=A.substring(2),A=u):(q=A.substring(2,j),A=A.substring(j)||u)}return new S("file",q,A,l,l)}static from(A){let q=new S(A.scheme,A.authority,A.path,A.query,A.fragment);return c(q,!0),q}toString(A=!1){return g(this,A)}toJSON(){return this}static revive(A){if(A){if(A instanceof m)return A;{let q=new S(A);return q._formatted=A.external,q._fsPath=A._sep===T?A.fsPath:null,q}}return A}}let T=i?1:void 0;class S extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(A=!1){return A?g(this,!0):(this._formatted||(this._formatted=g(this,!1)),this._formatted)}toJSON(){let A={$mid:1};return this._fsPath&&(A.fsPath=this._fsPath,A._sep=T),this._formatted&&(A.external=this._formatted),this.path&&(A.path=this.path),this.scheme&&(A.scheme=this.scheme),this.authority&&(A.authority=this.authority),this.query&&(A.query=this.query),this.fragment&&(A.fragment=this.fragment),A}}let w={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,A,q){let j,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||A&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let bt=w[Q];bt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j+=bt):ce===-1&&(ce=ee)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function k(M){let A;for(let q=0;q<M.length;q++){let j=M.charCodeAt(q);j===35||j===63?(A===void 0&&(A=M.substr(0,q)),A+=w[j]):A!==void 0&&(A+=M[q])}return A!==void 0?A:M}function v(M,A){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?A?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function g(M,A){let q=A?k:N,j="",{scheme:ce,authority:ee,path:Q,query:bt,fragment:ft}=M;if(ce&&(j+=ce,j+=":"),(ee||ce==="file")&&(j+=u,j+=u),ee){let he=ee.indexOf("@");if(he!==-1){let Nr=ee.substr(0,he);ee=ee.substr(he+1),he=Nr.lastIndexOf(":"),he===-1?j+=q(Nr,!1,!1):(j+=q(Nr.substr(0,he),!1,!1),j+=":",j+=q(Nr.substr(he+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),he=ee.lastIndexOf(":"),he===-1?j+=q(ee,!1,!0):(j+=q(ee.substr(0,he),!1,!0),j+=ee.substr(he))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let he=Q.charCodeAt(1);he>=65&&he<=90&&(Q=`/${String.fromCharCode(he+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let he=Q.charCodeAt(0);he>=65&&he<=90&&(Q=`${String.fromCharCode(he+32)}:${Q.substr(2)}`)}j+=q(Q,!0,!1)}return bt&&(j+="?",j+=q(bt,!1,!1)),ft&&(j+="#",j+=A?ft:N(ft,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let O=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(O)?M.replace(O,A=>$(A)):M}var Te=r(470);let $e=Te.posix||Te,Kt="/";var Rt;(function(M){M.joinPath=function(A,...q){return A.with({path:$e.join(A.path,...q)})},M.resolvePath=function(A,...q){let j=A.path,ce=!1;j[0]!==Kt&&(j=Kt+j,ce=!0);let ee=$e.resolve(j,...q);return ce&&ee[0]===Kt&&!A.authority&&(ee=ee.substring(1)),A.with({path:ee})},M.dirname=function(A){if(A.path.length===0||A.path===Kt)return A;let q=$e.dirname(A.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),A.with({path:q})},M.basename=function(A){return $e.basename(A.path)},M.extname=function(A){return $e.extname(A.path)}})(Rt||(Rt={}))})(),mx=n})();var{URI:hu,Utils:S_}=mx;var ai=fh;"default"in ai&&(ai=ai.default);var Qt=ai.URI;var xe;(function(t){t.basename=ai.Utils.basename,t.dirname=ai.Utils.dirname,t.extname=ai.Utils.extname,t.joinPath=ai.Utils.joinPath,t.resolvePath=ai.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===c[l];l++);let u="../".repeat(a.length-l),f=c.slice(l).join("/");return u+f}t.relative=r})(xe=xe||(xe={}));var RK=xe.equals,bK=xe.relative;var yu,hx=()=>yu??(yu=gu(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var xu=de(co(),1);var lc=de(Qn(),1);function A_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var yx=0,w_=10;var gx=Symbol("OperationCancelled");function bo(t){return t===gx}async function et(t){if(t===lc.CancellationToken.None)return;let e=Date.now();if(e-yx>=w_&&(yx=e,await A_()),t.isCancellationRequested)throw gx}var Tu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new lc.CancellationTokenSource}lock(e){this.cancel();let r=new lc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{bo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Fr(t){return{code:t}}var ys;(function(t){t.all=["fast","slow","built-in"]})(ys=ys||(ys={}));var vu=class{constructor(e){this.entries=new Me,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function Tx(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:So(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(hn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:So(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function So(t){if(go(t))return{elementType:So(t.elementType)};if(To(t))return{referenceType:So(t.referenceType)};if(Vr(t))return{types:t.types.map(So)};if(sr(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=In(r);if(n)return gs(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function Ts(t){return"referenceType"in t}function dh(t){return"elementType"in t}function vx(t){return"types"in t}function ph(t){return"value"in t}function k_(t){return"primitive"in t}function C_(t){return"string"in t}function xx(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ps(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new cu(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=E_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=uc(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function E_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:uc(t.type,void 0,e,r)}}function uc(t,e,r,n){if(dh(t))return{elementType:uc(t.elementType,e,r,n)};if(Ts(t))return{referenceType:uc(t.referenceType,void 0,r,n)};if(vx(t))return{types:t.types.map(i=>uc(i,e,r,n))};if(C_(t))return{string:t.string};if(k_(t))return{primitive:t.primitive,regex:t.regex};if(ph(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function hh(t,e){let r=fc(t),n=fc(e);for(let i of n)$_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function $_(t,e){return t.some(r=>mh(r,e))}function mh(t,e){return dh(t)&&dh(e)?mh(t.elementType,e.elementType):Ts(t)&&Ts(e)?mh(t.referenceType,e.referenceType):ph(t)&&ph(e)?t.value===e.value:!1}function fc(t){return vx(t)?t.types.flatMap(e=>fc(e)):[t]}function Rx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var ke;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(ke=ke||(ke={}));var Ru=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Fr(ke.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>K(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>K(o)&&!Ur(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Fr(ke.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Ur(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!dc(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Me;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=pc(this.documents,e);for(let c of a)n(c).forEach(l=>s.add(l.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(u=>{r("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Me;for(let i of e.imports){let o=ci(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[xu.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=pc(this.documents,o);n.set(o,s)}let i=new Me;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),l=this.getDuplicateExportedRules(s,c);for(let u of l)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let l of o){let u=l.name;c===u&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of pc(this.documents,e))c.types.forEach(l=>s.add(l.name)),c.interfaces.forEach(l=>s.add(l.name));for(let c of e.rules.filter(K)){if(dc(c))continue;let l=Ur(c),u=!c.returnType&&!c.dataType,f=In(c);if(!l&&f&&s.has(f)===u){if((u||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)r("error",a(f,u),{node:c,property:"name",data:Fr(ke.MissingReturns)});else if(u||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Xr(c.inferredType.$cstNode,"infers");r("error",a(f,u),{node:c.inferredType,property:"name",data:{code:ke.InvalidInfers,actionSegment:or(m)}})}}else if(l&&u){let m=Xr(c.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:ke.InvalidInfers,actionSegment:or(m)}})}}for(let c of Ze(e).filter(_e)){let l=this.getActionType(c);if(l){let u=!!c.inferredType,f=In(c);if(c.type&&f&&s.has(f)===u){let m=u?Xr(c.$cstNode,"infer"):Xr(c.$cstNode,"{");r("error",a(f,u),{node:c,property:"type",data:{code:u?ke.SuperfluousInfer:ke.MissingInfer,actionSegment:or(m)}})}else if(l&&f&&s.has(f)&&u&&c.$cstNode){let m=Jt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=Xr(c.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:ke.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(c,l){return l?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Fr(ke.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Jr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",l=new Set,u=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);c.includes(T)?s.includes(T)&&u.add(T):l.add(T)}let f=this.getFlagRange(e);f&&(l.size>0?r("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&r("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!we(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Jt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Pe(e,i=>we(i)||K(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;we(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;we(n)&&n.fragment&&Pe(e,K)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Fr(ke.CrossRefTokenSyntax)})}checkPackageImport(e,r){ci(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Fr(ke.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Fr(ke.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=vs(e,!0);for(let i of e.rules)we(i)&&i.hidden||dc(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[xu.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Me,i=new Set;for(let l of e.rules)we(l)&&l.name&&n.add(l.name,l),K(l)&&Ze(l).filter(mt).forEach(f=>i.add(f.value));let o=new Me,s=new Me;for(let l of e.imports){let u=pc(this.documents,l);for(let f of u)for(let m of f.rules)we(m)&&m.name?o.add(m.name,l):K(m)&&m.name&&Ze(m).filter(mt).forEach(S=>s.add(S.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let u=s.get(l.name);r("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:l,property:"name"})}let a=new Me;for(let l of i)for(let u of o.get(l))a.add(u,l);for(let[l,u]of a.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let c=new Me;for(let[l,u]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>c.add(m,l))}for(let[l,u]of c.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!dc(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Fr(ke.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&N_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Pe(e,K)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Yr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Fr(ke.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Ze(e).filter(cs);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[xu.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(dc(e))return;let n=Sx(e),i=Ur(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&Ie(e.terminal)&&K(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Ze(e.terminal).map(o=>Xt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=So(n.type),o=fc(i),s=!1,a=!1;for(let c of o)Ts(c)?s=!0:Ts(c)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!gs(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(K(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else we(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!mc(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(Ie(i)){let o=i.rule.ref;K(o)&&!Ur(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):K(o)&&!Ax(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):we(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Ft(e.type.ref)&&Vr(e.type.ref.type)){let n=bx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;K((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){sr(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&K(e.ref)&&!Ur(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=In(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Xt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function dc(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var N_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function bx(t){let e=[];return t.types.forEach(r=>{var n;sr(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Ft(r.typeRef.ref)&&(Vr(r.typeRef.ref.type)?e.push(...bx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Yr(t,e){return t==="?"||t==="*"||Ut(e)&&!!e.guardCondition}function wx(t){return t==="*"||t==="+"}function Ur(t){return kx(t,new Set)}function kx(t,e){if(e.has(t))return!0;e.add(t);for(let r of Ze(t))if(Ie(r)){if(!r.rule.ref||K(r.rule.ref)&&!kx(r.rule.ref,e))return!1}else{if(be(r))return!1;if(_e(r))return!1}return!!t.definition}function Sx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Ft(r)&&__(r)}function __(t){return gh(t.type,new Set)}function gh(t,e){if(e.has(t))return!0;if(e.add(t),go(t))return!1;if(To(t))return!1;if(Vr(t))return t.types.every(r=>gh(r,e));if(sr(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Ft(r)?gh(r.type,e):!1}else return!1}else return!1}function Ax(t){return hc(t,new Set)}function hc(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),K(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return hc(t.returnType.ref,e)}else{if(Ft(t))return hc(t.type,e);if(go(t))return!1;if(To(t))return!1;if(Vr(t))return t.types.every(i=>hc(i,e));if(sr(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return hc(t.typeRef.ref,e)}}return!1}function vh(t){let e=t.$container;if(Ut(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(_e(o))return o;{let s=Ze(r[i]).find(_e);if(s)return s}}}if(os(e))return vh(e)}function hn(t){var e;if(K(t))return Ur(t)?t.name:(e=Rs(t))!==null&&e!==void 0?e:t.name;if(Ar(t)||Ft(t)||ls(t))return t.name;if(_e(t)){let r=bs(t);if(r)return r}else if(as(t))return t.name;throw new lu("Cannot get name of Unknown Type",t.$cstNode)}function In(t){if(t)try{return hn(t)}catch{return}}function Rs(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(K(e))return e.name;if(Ar(e)||Ft(e))return e.name}}}function bs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return hn(t.type.ref)}function Ao(t){var e,r,n;return we(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Ur(t)?t.name:(n=Rs(t))!==null&&n!==void 0?n:t.name}function Jr(t){let e={s:!1,i:!1,u:!1},r=Ss(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var xh=/[\s\S]/.source;function Ss(t,e){if(Dv(t))return I_(t);if(Mv(t))return P_(t);if(ru(t))return L_(t);if(nu(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return li(Ss(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(Nv(t))return D_(t);if(Gv(t))return O_(t);if(Iv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),li(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Hv(t))return li(xh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function I_(t){return li(t.elements.map(e=>Ss(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function P_(t){return li(t.elements.map(e=>Ss(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function O_(t){return li(`${xh}*?${Ss(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function D_(t){return li(`(?!${Ss(t.terminal)})${xh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function L_(t){return t.right?li(`[${yh(t.left)}-${yh(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):li(yh(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function yh(t){return si(t.value)}function li(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function Rh(t){if(t.path===void 0||t.path.length===0)return;let e=xe.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),xe.resolvePath(e,r)}function ci(t,e){let r=Rh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ss(i))return i}}catch{}}function pc(t,e){if(eu(e)){let r=ci(t,e);if(r){let n=Th(t,r);return n.push(r),n}return[]}else return Th(t,e)}function Th(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ci(t,s);a&&Th(t,a,r,n,i)}}return Array.from(i)}function xs(t){return be(t)?[t]:Or(t)||Ut(t)||Dr(t)?t.elements.flatMap(e=>xs(e)):Ie(t)&&t.rule.ref?xs(t.rule.ref.definition):[]}var M_=["string","number","boolean","Date","bigint"];function gs(t){return M_.includes(t)}var bh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:Cx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(l=>l!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return Ix(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(Cx(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=wo();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function F_(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(Ex)}}function Cx(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>Ex(e))}}function Ex(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function $x(t,e,r){let n=[],i={fragments:new Map};for(let c of t)n.push(...Nx(i,c));let o=K_(n),s=B_(o),a=W_(o,s,r);for(let c of e){let l=U_(c);a.unions.push({name:c.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function U_(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=Sh(t.definition,r);return e?{primitive:"string"}:n}function Sh(t,e){var r,n,i;if(t.cardinality)return e();if(Or(t))return{types:t.elements.map(o=>Sh(o,e))};if(Ut(t)||Dr(t))return t.elements.length!==1?e():Sh(t.elements[0],e);if(Ie(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?we(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Jr(o).toString()}:{value:o.name}:e()}else if(mt(t))return{string:t.value};return e()}function Nx(t,e){let r=wo(e),n=new bh(t,r);return e.definition&&Ah(n,n.root,e.definition),n.getTypes()}function wo(t){return{name:K(t)||_e(t)?In(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Ah(t,e,r){let n=Yr(r.cardinality,r);if(Or(r)){let i=[];n&&i.push(t.connect(e,wo()));for(let o of r.elements){let s=t.connect(e,wo());i.push(Ah(t,s,o))}return t.merge(...i)}else if(Ut(r)||Dr(r)){let i=t.connect(e,wo()),o;n&&(o=t.connect(e,wo()));for(let s of r.elements)i=Ah(t,i,s);return o?t.merge(o,i):i}else{if(_e(r))return q_(t,e,r);be(r)?G_(e,r):Ie(r)&&j_(t,e,r)}return e}function q_(t,e,r){var n;if(!t.hasLeafNode(e)){let o=F_(e);t.connect(e,o)}let i=t.connect(e,wo(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&oc(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:ko(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function G_(t,e){let r={types:new Set,reference:!1};_x(e.terminal,r);let n=ko(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Yr(e.cardinality),type:n,astNodes:new Set([e])})}function _x(t,e){if(Or(t)||Dr(t)||Ut(t))for(let r of t.elements)_x(r,e);else if(mt(t))e.types.add(`'${t.value}'`);else if(Ie(t)&&t.rule.ref)e.types.add(Ao(t.rule.ref));else if(Xt(t)&&t.type.ref){let r=In(t.type.ref);r&&e.types.add(r),e.reference=!0}}function j_(t,e,r){let n=r.rule.ref;if(K(n)&&n.fragment){let i=H_(n,t.context);Yr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else K(n)&&e.ruleCalls.push(Ao(n))}function H_(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=In(t),o=Nx(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function K_(t){let e=new Map,r=[],n=Ix(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function Ix(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Me),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let l=c.alt;a.alt.super.push(...l.super),a.next.push(...c.next);let u=l.properties;for(let f of u){let m=o.find(T=>T.name===f.name);m?(m.type=hh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let l=c.alt;if(l.ruleCalls.length===0)for(let u of o)l.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function B_(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Me;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:ko(!1,!1,o)};r.push(s)}return r}function W_(t,e,r){let n=new Me;for(let a of t)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=ko(!1,!1,Array.from(c)),u=s.get(a.name);if(u)u.type=hh(u.type,l);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function ko(t,e,r){if(t)return{elementType:ko(!1,e,r)};if(e)return{referenceType:ko(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:gs(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>ko(!1,!1,[n]))}}function Px(t,e){let r=Ox(t,e),n=Tx(r.interfaces,r.types),i=$x(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function Ox(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)K(s)&&!s.fragment&&(Ur(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ci(e,a)).filter(a=>a!==void 0);Ox(s,e,r,n)}}}return n}function Mx(t,e){let{inferred:r,declared:n,astResources:i}=Px(t,e);return{astResources:i,inferred:Dx(n,r),declared:Dx(r,n)}}function Dx(t,e){var r,n;let i={interfaces:lx(Lx(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:Lx(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=xx(i);return z_(o),o}function Lx(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function z_(t){let e=X_(t),r=Array.from(e.values());Y_(r),J_(t.interfaces),V_(r)}function V_(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function X_({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,wh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function wh(t,e){if(e.has(t))return!0;if(e.add(t),Dt(t))return t.types.every(r=>wh(r,e));if(Lr(t)){let r=t.value;return dn(r)?wh(r.type,e):!1}else return Mr(t)||Nn(t)}function Y_(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function J_(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(c=>ux(c.type));for(let c of a)(e=r.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)mn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var Q_={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},Z_={maxLookahead:3},Fx={AstReflection:()=>new Ja},Ux={Grammar:()=>hx(),LanguageMetaData:()=>Q_,parser:{ParserConfig:()=>Z_}};var yc=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},As=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},qx={getElement(){},getAllElements(){return is}};var bu=de(Qn(),1);var ws=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=bu.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=_i,i=bu.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await et(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=bu.CancellationToken.None){let n=e.parseResult.value,i=new Me;for(let o of Ze(n))await et(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var Su=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},kh=class extends Su{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},Au=class extends Su{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var wu=class extends kh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var ks=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new wu(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new yc(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new yc(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new As(this.indexManager.allElements(e)))}};var ku=class extends ks{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===yo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=iu(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===Qa||c.type===Za))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Pe(r.container,ss);if(!n)return qx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===yo&&(o=o.filter(s=>s.type===Qa||s.type===Za)),new As(o)}gatherImports(e,r){for(let n of e.imports){let i=Rh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ss(s)&&this.gatherImports(s,r)}}}},Cu=class extends ws{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),K(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Ze(e).forEach(o=>{if(_e(o)&&o.inferredType){let s=bs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){ls(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&K(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=iu(e);if(i&&_e(e)&&e.inferredType){let o=bs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=or((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:or(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var qr=de(Ae(),1);var ar=de(Ae(),1);var Eu=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=ar.CancellationToken.None){let i=e.parseResult,o=[];if(await et(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s)}return await et(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:ar.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Fr(yn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=ar.Range.create(0,0,0,0);else{let a=ar.Position.create(s.endLine-1,s.endColumn);o=ar.Range.create(a,a)}}}else o=Ya(i.token);if(o){let s={severity:ar.DiagnosticSeverity.Error,range:o,message:i.message,data:Fr(yn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:yn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=ar.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(ni(e).map(async s=>{await et(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:eI(n),severity:tI(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function eI(t){if(ar.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Jt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Xr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function tI(t){switch(t){case"error":return ar.DiagnosticSeverity.Error;case"warning":return ar.DiagnosticSeverity.Warning;case"info":return ar.DiagnosticSeverity.Information;case"hint":return ar.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var yn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(yn=yn||(yn={}));var $u=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case ke.GrammarNameUppercase:case ke.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case ke.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case ke.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case ke.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case ke.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case ke.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case ke.MissingReturns:n(this.fixMissingReturns(e,r));break;case ke.InvalidInfers:case ke.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case ke.MissingInfer:n(this.fixMissingInfer(e,r));break;case ke.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case yn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=Sr(i,n),s=Pe(o?.astNode,ru);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${si(a)}-${si(c)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Jt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,l=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(l)}})}for(let a of i){let c=a.ref;if(c&&we(c)&&!c.hidden&&c.$cstNode){let l=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=Sr(o,i),a=Pe(s?.astNode,K);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===r.refText),l=[],u=-1,f=-1;for(let m of c){if(xe.equals(m.documentUri,n.uri))continue;let T=rI(n.uri,m.documentUri),S,w="",N=n.parseResult.value,k=N.imports.find(v=>v.path&&T<v.path);if(k)S=(i=k.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(S={line:v.line+1,character:0})}else N.rules.length>0&&(S=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,w=`
`);S&&((u<0||T.length<f)&&(u=l.length,f=T.length),l.push({title:`Add import to '${T}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:S,end:S},newText:`import '${T}'
${w}`}]}}}))}return u>=0&&(l[u].isPreferred=!0),l}};function rI(t,e){let r=xe.dirname(t),n=xe.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Kx=de(co(),1);var $s=de(Ae(),1);function Ch(t,e){let r={stacks:t,tokens:e};return nI(r),r.stacks.flat().forEach(i=>{i.property=void 0}),jx(r.stacks).map(i=>i[i.length-1])}function Eh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(Ut(c.$container)){a=c.$container;break}else if(os(c.$container))c=c.$container;else break;if(wx(c.cardinality)){let l=Cs({next:{feature:c,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let u of l)i.add(u.feature);o.push(...l)}if(a){let l=a.elements.indexOf(c);l!==void 0&&l<a.elements.length-1&&o.push(...Gx({feature:a,type:e.type,new:!1},l+1,r,n,i)),o.every(u=>Yr(u.feature.cardinality,u.feature)||Yr(r.get(u.feature))||i.has(u.feature))&&o.push(...Eh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function gc(t){return $t(t)&&(t={feature:t}),Cs({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function Cs(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:c,type:l}=i;if(Ut(c)){if(s.has(c))return[];s.add(c)}if(Ut(c))return Gx(i,0,o,s,a).map(u=>Nu(u,c.cardinality,o));if(Or(c)||Dr(c))return c.elements.flatMap(u=>Cs({next:{feature:u,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(u=>Nu(u,c.cardinality,o));if(be(c)){let u={feature:c.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return Cs({next:u,cardinalities:o,visited:s,plus:a}).map(f=>Nu(f,c.cardinality,o))}else{if(_e(c))return Eh({next:{feature:c,new:!0,type:hn(c),property:(r=i.property)!==null&&r!==void 0?r:c.feature},cardinalities:o,visited:s,plus:a});if(Ie(c)&&K(c.rule.ref)){let u=c.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=Rs(u))!==null&&n!==void 0?n:u.name,property:i.property};return Cs({next:f,cardinalities:o,visited:s,plus:a}).map(m=>Nu(m,c.cardinality,o))}else return[i]}}function Nu(t,e,r){return r.set(t.feature,e),t}function Gx(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...Cs({next:a,cardinalities:r,visited:n,plus:i})),!!Yr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function nI(t){for(let e of t.tokens){let r=jx(t.stacks,e);t.stacks=r}}function jx(t,e){let r=[];for(let n of t)r.push(...iI(n,e));return r}function iI(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(oI)),i=[];for(;t.length>0;){let o=t.pop(),s=Eh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?$h(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Yr(a.feature.cardinality,a.feature)||Yr(r.get(a.feature))))break}return i}function oI(t){if(t.cardinality==="+")return!0;let e=Pe(t,be);return!!(e&&e.cardinality==="+")}function $h(t,e){if(mt(t))return t.value===e.image;if(Ie(t))return sI(t.rule.ref,e);if(Xt(t)){let r=_u(t);if(r)return $h(r,e)}return!1}function sI(t,e){return K(t)?gc(t.definition).some(n=>$h(n.feature,e)):we(t)?Jr(t).test(e.image):!1}function Hx(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Es=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(c,l)=>{let u=this.fillCompletionItem(c,l);u&&n.push(u)},s=c=>mt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(l=>this.completionFor(c,l,o))),a.push(...c.features),!this.continueCompletion(n))break;return $s.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:$s.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=Iu(this.grammar),l=gc({feature:c.definition,new:!0,type:Rs(c)});return o.length>0?(o.shift(),Ch(l.map(u=>[u]),o)):l}let s=[...o].splice(i.tokenIndex);return Ch([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,r){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let l=e.textDocument,u=l.getText(),f=l.offsetAt(r),m={document:e,textDocument:l,offset:f,position:r},T=this.findDataTypeRuleStart(c,f);if(T){let[g,$]=T,O=(n=Sr(c,g))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,g);yield Object.assign(Object.assign({},m),{node:O,tokenOffset:g,tokenEndOffset:$,features:X})}let{nextTokenStart:S,nextTokenEnd:w,previousTokenStart:N,previousTokenEnd:k}=this.backtrackToAnyToken(u,f),v;if(N!==void 0&&k!==void 0&&k===f){v=(i=Sr(c,N))===null||i===void 0?void 0:i.astNode;let g=this.findFeaturesAt(l,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:k,features:g})}if(v=(s=(o=Sr(c,S))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=Sr(c,N))===null||a===void 0?void 0:a.astNode,v){let g=this.findFeaturesAt(l,S);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:S,tokenEndOffset:w,features:g})}else{let g=Iu(this.grammar),$=gc(g.definition);yield Object.assign(Object.assign({},m),{tokenOffset:S,tokenEndOffset:w,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=Ot(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Pe(o?.grammarSource,K))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Pe(o?.grammarSource,K))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(K(r)){let i=gc(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(mt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Xt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Pe(r.feature,be),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(l=>{!c.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),c.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:$s.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let l=this.nameProvider.getName(r.node);if(!l)return;o=l}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Pu=class extends Es{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Pe(r.feature,be);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:l}}for(let a of o){let c=i.length>0?"":'"',l=`${c}${a}${c}`;r(e,{label:a,textEdit:{newText:l,range:s},kind:Kx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=xe.dirname(e.uri).toString(),o=[];for(let s of r)if(!xe.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-xe.extname(s.uri).length),l=xe.relative(i,c);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var Tc=de(Ae(),1);var Ns=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Ze(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of YT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,Tc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),Tc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===Tc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Ou=class extends Ns{shouldProcessContent(e){return!K(e)}};var Du=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Nh(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,c,l)=>{var u,f;let m=this.nodeModeToKey(a,c),T=i.get(m),S=(u=l.options.priority)!==null&&u!==void 0?u:0,w=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||w<=S)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Ze(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),l,u;do if(u=c.next(),!u.done){let f=u.value,m=mo(f),T=this.nodeModeToKey(f,"prepend"),S=r.get(T);if(r.delete(T),S){let k=this.createTextEdit(l,f,S,o);for(let v of k)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let w=this.nodeModeToKey(f,"append"),N=r.get(w);if(r.delete(w),N){let k=ZT(f);if(k){let v=this.createTextEdit(f,k,N,o);for(let g of v)g&&this.insideRange(g.range,i)&&this.isNecessary(g,e.textDocument)&&s.push(g)}}if(!S&&f.hidden){let k=this.createHiddenTextEdits(l,f,void 0,o);for(let v of k)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(l=f)}while(!u.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:r.range.start},l=i.document.getText(c),u=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),T=this.getIndentationCharacterCount(i,u)-f;if(T===0)return[];let S="";T>0&&(S=(i.options.insertSpaces?" ":"	").repeat(T));let w=r.text.split(`
`);w[0]=l+w[0];for(let N=0;N<w.length;N++){let k=s+N,v={character:0,line:k};if(T>0)a.push({newText:S,range:{start:v,end:v}});else{let g=w[N],$=0;for(;$<g.length;$++){let O=g.charAt($);if(O!==" "&&O!=="	")break}a.push({newText:"",range:{start:v,end:{line:k,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,l=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),mo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new zr(i,o=>this.iterateCst(o,r)):is}iterateCst(e,r){if(!$n(e))return is;let n=r.indentation;return new Pr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,hr))}},Nh=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new gn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new gn(r,this.collector)}property(e,r){let n=Jt(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Ii(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}keyword(e,r){let n=Xr(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Lu(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}cst(e){return new gn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new gn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new gn(ev(o,s),this.collector)}},gn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ge;(function(t){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(u){return i(0,u)}t.noSpace=r;function n(u){return i(1,u)}t.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}t.spaces=i;function o(u){return s(1,u)}t.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}t.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function c(u){return{options:u??{},moves:[{tabs:0}]}}t.noIndent=c;function l(u,f){var m,T,S,w,N,k;let v=(m=u.lines)!==null&&m!==void 0?m:0,g=(T=f.lines)!==null&&T!==void 0?T:0,$=(S=u.tabs)!==null&&S!==void 0?S:0,O=(w=f.tabs)!==null&&w!==void 0?w:0,X=(N=u.characters)!==null&&N!==void 0?N:0,Te=(k=f.characters)!==null&&k!==void 0?k:0;return v<g?-1:v>g?1:$<O?-1:$>O?1:X<Te?-1:X>Te?1:0}})(ge=ge||(ge={}));var Mu=class extends Du{format(e){if(Xt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ge.noSpace());else if(K(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ge.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ge.oneSpace()):r.property("name").append(ge.noSpace()),r.properties("parameters").append(ge.noSpace()),r.keywords(",").append(ge.oneSpace()),r.keywords("<").append(ge.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ge.noSpace()),r.interior(i,n).prepend(ge.indent()),n.prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(we(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ge.oneSpace()),r.keyword("returns").append(ge.oneSpace())),r.keywords("hidden","terminal","fragment").append(ge.oneSpace()),r.keyword(":").prepend(ge.noSpace()),r.keyword(";").prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ge.noSpace()),r.keywords(".","+=","=").surround(ge.noSpace()),r.keyword("}").prepend(ge.noSpace())}else if(as(e))this.getNodeFormatter(e).keywords("infer","infers").append(ge.oneSpace());else if(be(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ge.noSpace());else if(Ie(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ge.noSpace()),r.keyword(",").append(ge.oneSpace()),r.properties("arguments").append(ge.noSpace())}os(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ge.noSpace())}};var ui=de(Ae(),1);var oe=de(Ae(),1);var Ph={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},Bx={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},Wx={legend:{tokenTypes:Object.keys(Ph),tokenModifiers:Object.keys(Bx)},full:{delta:!0},range:!0},Ih=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Fu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Ih;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=ni(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await et(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Ql(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Ph[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=Bx[u];a|=f}}let c=n.start.line,l=n.end.line;if(c===l){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(c,u,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=c+1;m<l;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Jt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Ii(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=Xr(r.$cstNode,n,o);c&&a.push(c)}else a.push(...Lu(r.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},_h;(function(t){function e(n,i){let o=new Map;Object.entries(Ph).forEach(([c,l])=>o.set(l,c));let s=0,a=0;return r(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let l=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(_h=_h||(_h={}));var Uu=class extends Fu{highlightElement(e,r){var n;be(e)?r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):_e(e)?e.feature&&r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):ls(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.type}):sr(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ui.SemanticTokenTypes.type}):yv(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.parameter}):cs(e)?r({node:e,property:"parameter",type:ui.SemanticTokenTypes.parameter}):Ie(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ui.SemanticTokenTypes.type}):tu(e)&&r({node:e,property:"name",type:ui.SemanticTokenTypes.property})}};var qu=class extends ms{getName(e){return be(e)?e.feature:super.getName(e)}getNameNode(e){return be(e)?Jt(e.$cstNode,"feature"):super.getNameNode(e)}};var _s=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Is(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(ei(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(ei(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||JT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>xe.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:or(r),local:!0}}}};var Gu=class extends _s{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Is(e);if(n&&n.feature==="feature"){if(be(r))return this.findAssignmentDeclaration(r);if(_e(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return tu(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Pe(e,Ar);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=ih(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(K(e)){let i=xs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:or(o),local:xe.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Jt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:or(o),local:xe.equals(ne(e).uri,ne(r).uri)})}let i=Pe(e,K);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Pe(e,K),i=vh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Ar(n.returnType.ref)||Ft(n.returnType.ref))){let o=ic(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=ic(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(K(s)||_e(s))&&r.push(s)}),r}};var vc=de(Ae(),1);var zx=de(Ae(),1);var ju=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=Ot(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:zx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=r.parseResult.value,i=Ot(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Qt.parse(e.item.uri)),n=r.parseResult.value,i=Ot(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var Vx=de(Ae(),1);var Ps=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Ot(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Vx.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var Xx=de(Ae(),1);var Hu=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Ot(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=xe.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return Xx.DocumentHighlight.create(e.segment.range)}};var Ku=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of _i(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Yx=de(Ae(),1),Bu=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=Yx.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};var Wu=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let c=r.charCodeAt(a),l=e.charCodeAt(o);if((c===l||this.toUpperCharCode(c)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,r){return Jx<=e&&e<=Qx&&aI<=r&&r<=cI||e===Zx&&r!==Zx}toUpperCharCode(e){return Jx<=e&&e<=Qx?e-32:e}},Jx="a".charCodeAt(0),Qx="z".charCodeAt(0),aI="A".charCodeAt(0),cI="Z".charCodeAt(0),Zx="_".charCodeAt(0);var Oh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Ot(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},zu=class extends Oh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var lI=de(Ae(),1);var uI=de(Ae(),1);var Qr=de(Ae(),1);var He;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(He=He||(He={}));var Vu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Qt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:He.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:He.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=rs.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Xu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=He.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=He.Changed,this.documentMap.delete(r)),n}};var fI=de(Ae(),1);function eR(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Yu=class{constructor(e){this.onInitializeEmitter=new Qr.Emitter,this.onInitializedEmitter=new Qr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Zl(this.services),this.services.ServiceRegistry.all.forEach(e=>Zl(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(A=>A.lsp.Formatter),o=n.map(A=>{var q;return(q=A.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(A=>!!A),s=this.hasService(A=>A.lsp.CodeActionProvider),a=this.hasService(A=>A.lsp.SemanticTokenProvider),c=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.hasService(A=>A.lsp.DocumentLinkProvider),u=eR(n.map(A=>{var q;return(q=A.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(A=>A.lsp.TypeProvider),m=this.hasService(A=>A.lsp.ImplementationProvider),T=this.hasService(A=>A.lsp.CompletionProvider),S=Hx(n.map(A=>{var q;return(q=A.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),w=this.hasService(A=>A.lsp.ReferencesProvider),N=this.hasService(A=>A.lsp.DocumentSymbolProvider),k=this.hasService(A=>A.lsp.DefinitionProvider),v=this.hasService(A=>A.lsp.DocumentHighlightProvider),g=this.hasService(A=>A.lsp.FoldingRangeProvider),$=this.hasService(A=>A.lsp.HoverProvider),O=this.hasService(A=>A.lsp.RenameProvider),X=this.hasService(A=>A.lsp.CallHierarchyProvider),Te=this.hasService(A=>A.lsp.CodeLensProvider),$e=this.hasService(A=>A.lsp.DeclarationProvider),Kt=this.hasService(A=>A.lsp.InlayHintProvider),Rt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Qr.TextDocumentSyncKind.Incremental,completionProvider:T?S:void 0,referencesProvider:w,documentSymbolProvider:N,definitionProvider:k,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:g,hoverProvider:$,renameProvider:O?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Wx:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:Te?{resolveProvider:!1}:void 0,declarationProvider:$e,inlayHintProvider:Kt?{resolveProvider:!1}:void 0,workspaceSymbolProvider:Rt?{resolveProvider:!!Rt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function rR(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");dI(e,t),pI(e,t),mI(e,t),hI(e,t),gI(e,t),TI(e,t),vI(e,t),xI(e,t),bI(e,t),AI(e,t),wI(e,t),yI(e,t),kI(e,t),SI(e,t),CI(e,t),EI(e,t),NI(e,t),II(e,t),DI(e,t),PI(e,t),_I(e,t),$I(e,t),RI(e,t),OI(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function dI(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>r.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Qt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let l of s.changes){let u=Qt.parse(l.uri);l.type===Qr.FileChangeType.Deleted?c.push(u):a.push(u)}i(a,c)})}function pI(t,e){e.workspace.DocumentBuilder.onBuildPhase(He.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function mI(t,e){t.onCompletion(cr((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function hI(t,e){t.onReferences(cr((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function yI(t,e){t.onCodeAction(cr((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function gI(t,e){t.onDocumentSymbol(cr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function TI(t,e){t.onDefinition(cr((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function vI(t,e){t.onTypeDefinition(cr((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function xI(t,e){t.onImplementation(cr((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function RI(t,e){t.onDeclaration(cr((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function bI(t,e){t.onDocumentHighlight(cr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function SI(t,e){t.onHover(cr((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function AI(t,e){t.onFoldingRanges(cr((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function wI(t,e){t.onDocumentFormatting(cr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(cr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(cr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function kI(t,e){t.onRenameRequest(cr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(cr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function CI(t,e){t.languages.inlayHint.on(Di((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function EI(t,e){let r={data:[]};t.languages.semanticTokens.on(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function $I(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function NI(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Os(s)}})}function _I(t,e){t.onDocumentLinks(Di((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function II(t,e){t.onSignatureHelp(Di((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function PI(t,e){t.onCodeLens(Di((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function OI(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Os(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Os(a)}})}}function DI(t,e){t.languages.callHierarchy.onPrepare(Di((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(tR((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(tR((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function tR(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Qt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return Os(a)}}}function Di(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=r.getOrCreateDocument(s);if(!c)throw new Error;try{return await t(a,c,i,o)}catch(l){return Os(l)}}}function cr(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Qt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=r.getOrCreateDocument(s);if(!c)return null;try{return await t(a,c,i,o)}catch(l){return Os(l)}}}function Os(t){if(bo(t))return new Qr.ResponseError(Qr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Qr.ResponseError)return t;throw t}var Qu=de(Ae(),1),Ju=class{getSymbolKind(){return Qu.SymbolKind.Field}getCompletionItemKind(){return Qu.CompletionItemKind.Reference}};var nR=de(Ae(),1);var Zu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Ot(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(nR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var iR=de(Ae(),1);var ef=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=Ot(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(u=>{let f=iR.TextEdit.replace(u.segment.range,r.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Ot(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&oc(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var LI=de(Ae(),1);var oR=de(Ae(),1);var tf=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=oR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await et(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var rf=class extends Ps{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,c;let l="path";if(eu(e.astNode)&&((n=Is(e))===null||n===void 0?void 0:n.feature)===l){let u=ci(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:vc.Range.create(0,0,0,0),T=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:vc.Range.create(0,0,0,0);return[vc.LocationLink.create(u.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:_i(e).head()}};var Dh=de(Ae(),1);var nf=class extends ju{getIncomingCalls(e,r){if(!K(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=Sr(s.$cstNode,i.segment.offset);if(!a)return;let c=Pe(a.astNode,K);if(!c||!c.$cstNode)return;let l=this.nameProvider.getNameNode(c);if(!l)return;let u=i.sourceUri.toString(),f=u+"@"+l.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:Dh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!K(e))return;let r=Ze(e).filter(Ie).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let l=ne(a.astNode).uri.toString(),u=l+"@"+c.text;n.has(u)?n.set(u,{refCstNode:a,to:c,from:[...n.get(u).from,s.range],docUri:l}):n.set(u,{refCstNode:a,to:c,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:Dh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var of=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=Mx(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=MI(e);for(let a of du(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of du(n)){let c=s.get(a.name);if(c){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=oh(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of oh(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function MI({parserRules:t,datatypeRules:e}){let r=new Me;ie(t).concat(e).forEach(i=>r.add(Ao(i),i));function n(i){if(_e(i)){let o=bs(i);o&&r.add(o,i)}(Or(i)||Ut(i)||Dr(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function sR(t){return t&&"declared"in t}function aR(t){return t&&"inferred"in t}function cR(t){return t&&"inferred"in t&&"declared"in t}function uR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var sf=class{checkCyclicType(e,r){Li(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Li(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(sR(o)&&mn(o.declared)&&Ar(o.declaredNode)){let s=o;UI(s,r),qI(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())aR(o)&&o.inferred instanceof ps&&FI(o.inferred,r),cR(o)&&HI(o,i,r)}checkActionIsNotUnionType(e,r){Ft(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Li(t,e){var r;if(e.has(t))return!0;if(e.add(t),Ft(t))return Li(t.type,e);if(Ar(t))return t.superTypes.some(n=>n.ref&&Li(n.ref,new Set(e)));if(sr(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Li(t.typeRef.ref,e)}else{if(To(t))return Li(t.referenceType,e);if(go(t))return Li(t.elementType,e);if(Vr(t))return t.types.some(n=>Li(n,new Set(e)))}return!1}function FI(t,e){t.properties.forEach(r=>{var n;let i=rh(r.type);if(i.length>1){let o=a=>ii(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function UI({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(dn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function qI({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Me);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],l=i[a],u=mn(c)?c.superProperties:[],f=mn(l)?l.superProperties:[],m=GI(u,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${c}' and '${l}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=mn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function GI(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!jI(n,i)&&r.push(n.name)}return r}function jI(t,e){return nc(t.type,e.type)&&nc(e.type,t.type)}function HI(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,c=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:_e(T)?"type":"name"})),l=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:be(T)||_e(T)?"feature":"name"})),u=f=>{s.forEach(m=>{K(m)&&xs(m.definition).find(S=>S.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(dn(n)&&dn(i))KI(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(mn(n)&&mn(i))BI(n,i,e,c(`in a rule that returns type '${a}'`),l,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),r("error",f,{node:o,property:"name"})}}function KI(t,e,r){nc(t,e)||r(`Cannot assign type '${pn(t,"DeclaredType")}' to '${pn(e,"DeclaredType")}'`)}function lR(t){return t.optional||uu(t.type)}function BI(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Dt(f))return{types:f.types.map(m=>l(m))};if(ii(f))return{referenceType:l(f.referenceType)};if(oi(f))return{elementType:l(f.elementType)};if(Lr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=c.get(f);if(T){let S=pn(m.type,"DeclaredType"),w=pn(T.type,"DeclaredType");if(!nc(l(m.type),T.type)&&w!=="unknown"){let k=`The assigned type '${S}' is not compatible with the declared property '${f}' of type '${w}'.`;i(m.astNodes,k)}m.optional&&!lR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of c.entries())!a.get(f)&&!lR(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",T=Array.from(u).map(S=>`'${S}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var WI={validation:{LangiumGrammarValidator:t=>new Ru(t),ValidationResourcesCollector:t=>new of(t),LangiumGrammarTypesValidator:()=>new sf},lsp:{FoldingRangeProvider:t=>new Ou(t),CodeActionProvider:t=>new $u(t),SemanticTokenProvider:t=>new Uu(t),Formatter:()=>new Mu,DefinitionProvider:t=>new rf(t),CallHierarchyProvider:t=>new nf(t),CompletionProvider:t=>new Pu(t)},references:{ScopeComputation:t=>new Cu(t),ScopeProvider:t=>new ku(t),References:t=>new Gu(t),NameProvider:()=>new qu}};function fR(t,e){let r=ho(Rc(t),Fx,e),n=ho(xc({shared:r}),Ux,WI);return zI(r,n),r.ServiceRegistry.register(n),Rx(n),uR(n),{shared:r,grammar:n}}function zI(t,e){t.workspace.DocumentBuilder.onBuildPhase(He.IndexedReferences,async(n,i)=>{for(let o of n){await et(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Lh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Co={fileSystemProvider:()=>new Lh};function Iu(t){return t.rules.find(e=>K(e)&&e.entry)}function VI(t){return t.rules.filter(e=>we(e)&&e.hidden)}function vs(t,e){let r=new Set,n=Iu(t);if(!n)return new Set(t.rules);let i=[n].concat(VI(t));for(let s of i)dR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||we(s)&&s.hidden)&&o.add(s);return o}function dR(t,e,r){e.add(t.name),Ze(t).forEach(n=>{if(Ie(n)||r&&nu(n)){let i=n.rule.ref;i&&!e.has(i.name)&&dR(i,e,r)}})}function _u(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=mc(t.type.ref);return e?.terminal}}function pR(t){return t.hidden&&!Jr(t).test(" ")}function Ii(t,e){return!t||!e?[]:Mh(t,e,t.astNode,!0)}function Jt(t,e,r){if(!t||!e)return;let n=Mh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Mh(t,e,r,n){if(!n){let i=Pe(t.grammarSource,be);if(i&&i.feature===e)return[t]}return $n(t)&&t.astNode===r?t.content.flatMap(i=>Mh(i,e,r,!1)):[]}function Lu(t,e){return t?mR(t,e,t?.astNode):[]}function Xr(t,e,r){if(!t)return;let n=mR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function mR(t,e,r){if(t.astNode!==r)return[];if(mt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=jm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?mt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Is(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Pe(t.grammarSource,be);if(n)return n;t=t.container}}function mc(t){return as(t)&&(t=t.$container),hR(t,new Map)}function hR(t,e){var r;function n(i,o){let s;return Pe(i,be)||(s=hR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Ze(t)){if(be(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Ie(i)&&K(i.rule.ref))return n(i,i.rule.ref);if(sr(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function gu(t){var e;let r=fR(Co).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Qt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function yR(t){let e=[],r=t.Grammar;for(let n of r.rules)we(n)&&pR(n)&&fx(Jr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Hm}}var XI=typeof global=="object"&&global&&global.Object===Object&&global,af=XI;var YI=typeof self=="object"&&self&&self.Object===Object&&self,JI=af||YI||Function("return this")(),Nt=JI;var QI=Nt.Symbol,qt=QI;var gR=Object.prototype,ZI=gR.hasOwnProperty,eP=gR.toString,bc=qt?qt.toStringTag:void 0;function tP(t){var e=ZI.call(t,bc),r=t[bc];try{t[bc]=void 0;var n=!0}catch{}var i=eP.call(t);return n&&(e?t[bc]=r:delete t[bc]),i}var TR=tP;var rP=Object.prototype,nP=rP.toString;function iP(t){return nP.call(t)}var vR=iP;var oP="[object Null]",sP="[object Undefined]",xR=qt?qt.toStringTag:void 0;function aP(t){return t==null?t===void 0?sP:oP:xR&&xR in Object(t)?TR(t):vR(t)}var yr=aP;function cP(t){return t!=null&&typeof t=="object"}var Tt=cP;var lP="[object Symbol]";function uP(t){return typeof t=="symbol"||Tt(t)&&yr(t)==lP}var Pn=uP;function fP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var On=fP;var dP=Array.isArray,z=dP;var pP=1/0,RR=qt?qt.prototype:void 0,bR=RR?RR.toString:void 0;function SR(t){if(typeof t=="string")return t;if(z(t))return On(t,SR)+"";if(Pn(t))return bR?bR.call(t):"";var e=t+"";return e=="0"&&1/t==-pP?"-0":e}var AR=SR;var mP=/\s/;function hP(t){for(var e=t.length;e--&&mP.test(t.charAt(e)););return e}var wR=hP;var yP=/^\s+/;function gP(t){return t&&t.slice(0,wR(t)+1).replace(yP,"")}var kR=gP;function TP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var ct=TP;var CR=0/0,vP=/^[-+]0x[0-9a-f]+$/i,xP=/^0b[01]+$/i,RP=/^0o[0-7]+$/i,bP=parseInt;function SP(t){if(typeof t=="number")return t;if(Pn(t))return CR;if(ct(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=ct(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=kR(t);var r=xP.test(t);return r||RP.test(t)?bP(t.slice(2),r?2:8):vP.test(t)?CR:+t}var ER=SP;var $R=1/0,AP=17976931348623157e292;function wP(t){if(!t)return t===0?t:0;if(t=ER(t),t===$R||t===-$R){var e=t<0?-1:1;return e*AP}return t===t?t:0}var NR=wP;function kP(t){var e=NR(t),r=e%1;return e===e?r?e-r:e:0}var Dn=kP;function CP(t){return t}var wr=CP;var EP="[object AsyncFunction]",$P="[object Function]",NP="[object GeneratorFunction]",_P="[object Proxy]";function IP(t){if(!ct(t))return!1;var e=yr(t);return e==$P||e==NP||e==EP||e==_P}var gr=IP;var PP=Nt["__core-js_shared__"],cf=PP;var _R=function(){var t=/[^.]+$/.exec(cf&&cf.keys&&cf.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function OP(t){return!!_R&&_R in t}var IR=OP;var DP=Function.prototype,LP=DP.toString;function MP(t){if(t!=null){try{return LP.call(t)}catch{}try{return t+""}catch{}}return""}var fi=MP;var FP=/[\\^$.*+?()[\]{}|]/g,UP=/^\[object .+?Constructor\]$/,qP=Function.prototype,GP=Object.prototype,jP=qP.toString,HP=GP.hasOwnProperty,KP=RegExp("^"+jP.call(HP).replace(FP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function BP(t){if(!ct(t)||IR(t))return!1;var e=gr(t)?KP:UP;return e.test(fi(t))}var PR=BP;function WP(t,e){return t?.[e]}var OR=WP;function zP(t,e){var r=OR(t,e);return PR(r)?r:void 0}var kr=zP;var VP=kr(Nt,"WeakMap"),lf=VP;var DR=Object.create,XP=function(){function t(){}return function(e){if(!ct(e))return{};if(DR)return DR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),LR=XP;function YP(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var MR=YP;function JP(){}var lt=JP;function QP(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var FR=QP;var ZP=800,e0=16,t0=Date.now;function r0(t){var e=0,r=0;return function(){var n=t0(),i=e0-(n-r);if(r=n,i>0){if(++e>=ZP)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var UR=r0;function n0(t){return function(){return t}}var qR=n0;var i0=function(){try{var t=kr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Ds=i0;var o0=Ds?function(t,e){return Ds(t,"toString",{configurable:!0,enumerable:!1,value:qR(e),writable:!0})}:wr,GR=o0;var s0=UR(GR),jR=s0;function a0(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var uf=a0;function c0(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var ff=c0;function l0(t){return t!==t}var HR=l0;function u0(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var KR=u0;function f0(t,e,r){return e===e?KR(t,e,r):ff(t,HR,r)}var Ls=f0;function d0(t,e){var r=t==null?0:t.length;return!!r&&Ls(t,e,0)>-1}var df=d0;var p0=9007199254740991,m0=/^(?:0|[1-9]\d*)$/;function h0(t,e){var r=typeof t;return e=e??p0,!!e&&(r=="number"||r!="symbol"&&m0.test(t))&&t>-1&&t%1==0&&t<e}var Mi=h0;function y0(t,e,r){e=="__proto__"&&Ds?Ds(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Ms=y0;function g0(t,e){return t===e||t!==t&&e!==e}var Ln=g0;var T0=Object.prototype,v0=T0.hasOwnProperty;function x0(t,e,r){var n=t[e];(!(v0.call(t,e)&&Ln(n,r))||r===void 0&&!(e in t))&&Ms(t,e,r)}var Fi=x0;function R0(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;c===void 0&&(c=t[a]),i?Ms(r,a,c):Fi(r,a,c)}return r}var Mn=R0;var BR=Math.max;function b0(t,e,r){return e=BR(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=BR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),MR(t,this,a)}}var WR=b0;function S0(t,e){return jR(WR(t,e,wr),t+"")}var Fs=S0;var A0=9007199254740991;function w0(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=A0}var Us=w0;function k0(t){return t!=null&&Us(t.length)&&!gr(t)}var _t=k0;function C0(t,e,r){if(!ct(r))return!1;var n=typeof e;return(n=="number"?_t(r)&&Mi(e,r.length):n=="string"&&e in r)?Ln(r[e],t):!1}var Ui=C0;function E0(t){return Fs(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Ui(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var zR=E0;var $0=Object.prototype;function N0(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||$0;return t===r}var Fn=N0;function _0(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var VR=_0;var I0="[object Arguments]";function P0(t){return Tt(t)&&yr(t)==I0}var Fh=P0;var XR=Object.prototype,O0=XR.hasOwnProperty,D0=XR.propertyIsEnumerable,L0=Fh(function(){return arguments}())?Fh:function(t){return Tt(t)&&O0.call(t,"callee")&&!D0.call(t,"callee")},qi=L0;function M0(){return!1}var YR=M0;var ZR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,JR=ZR&&typeof module=="object"&&module&&!module.nodeType&&module,F0=JR&&JR.exports===ZR,QR=F0?Nt.Buffer:void 0,U0=QR?QR.isBuffer:void 0,q0=U0||YR,di=q0;var G0="[object Arguments]",j0="[object Array]",H0="[object Boolean]",K0="[object Date]",B0="[object Error]",W0="[object Function]",z0="[object Map]",V0="[object Number]",X0="[object Object]",Y0="[object RegExp]",J0="[object Set]",Q0="[object String]",Z0="[object WeakMap]",eO="[object ArrayBuffer]",tO="[object DataView]",rO="[object Float32Array]",nO="[object Float64Array]",iO="[object Int8Array]",oO="[object Int16Array]",sO="[object Int32Array]",aO="[object Uint8Array]",cO="[object Uint8ClampedArray]",lO="[object Uint16Array]",uO="[object Uint32Array]",Je={};Je[rO]=Je[nO]=Je[iO]=Je[oO]=Je[sO]=Je[aO]=Je[cO]=Je[lO]=Je[uO]=!0;Je[G0]=Je[j0]=Je[eO]=Je[H0]=Je[tO]=Je[K0]=Je[B0]=Je[W0]=Je[z0]=Je[V0]=Je[X0]=Je[Y0]=Je[J0]=Je[Q0]=Je[Z0]=!1;function fO(t){return Tt(t)&&Us(t.length)&&!!Je[yr(t)]}var eb=fO;function dO(t){return function(e){return t(e)}}var Un=dO;var tb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Sc=tb&&typeof module=="object"&&module&&!module.nodeType&&module,pO=Sc&&Sc.exports===tb,Uh=pO&&af.process,mO=function(){try{var t=Sc&&Sc.require&&Sc.require("util").types;return t||Uh&&Uh.binding&&Uh.binding("util")}catch{}}(),Zr=mO;var rb=Zr&&Zr.isTypedArray,hO=rb?Un(rb):eb,qs=hO;var yO=Object.prototype,gO=yO.hasOwnProperty;function TO(t,e){var r=z(t),n=!r&&qi(t),i=!r&&!n&&di(t),o=!r&&!n&&!i&&qs(t),s=r||n||i||o,a=s?VR(t.length,String):[],c=a.length;for(var l in t)(e||gO.call(t,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Mi(l,c)))&&a.push(l);return a}var pf=TO;function vO(t,e){return function(r){return t(e(r))}}var mf=vO;var xO=mf(Object.keys,Object),nb=xO;var RO=Object.prototype,bO=RO.hasOwnProperty;function SO(t){if(!Fn(t))return nb(t);var e=[];for(var r in Object(t))bO.call(t,r)&&r!="constructor"&&e.push(r);return e}var hf=SO;function AO(t){return _t(t)?pf(t):hf(t)}var Ke=AO;var wO=Object.prototype,kO=wO.hasOwnProperty,CO=zR(function(t,e){if(Fn(e)||_t(e)){Mn(e,Ke(e),t);return}for(var r in e)kO.call(e,r)&&Fi(t,r,e[r])}),Zt=CO;function EO(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var ib=EO;var $O=Object.prototype,NO=$O.hasOwnProperty;function _O(t){if(!ct(t))return ib(t);var e=Fn(t),r=[];for(var n in t)n=="constructor"&&(e||!NO.call(t,n))||r.push(n);return r}var ob=_O;function IO(t){return _t(t)?pf(t,!0):ob(t)}var Gi=IO;var PO=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,OO=/^\w*$/;function DO(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||Pn(t)?!0:OO.test(t)||!PO.test(t)||e!=null&&t in Object(e)}var Gs=DO;var LO=kr(Object,"create"),pi=LO;function MO(){this.__data__=pi?pi(null):{},this.size=0}var sb=MO;function FO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var ab=FO;var UO="__lodash_hash_undefined__",qO=Object.prototype,GO=qO.hasOwnProperty;function jO(t){var e=this.__data__;if(pi){var r=e[t];return r===UO?void 0:r}return GO.call(e,t)?e[t]:void 0}var cb=jO;var HO=Object.prototype,KO=HO.hasOwnProperty;function BO(t){var e=this.__data__;return pi?e[t]!==void 0:KO.call(e,t)}var lb=BO;var WO="__lodash_hash_undefined__";function zO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=pi&&e===void 0?WO:e,this}var ub=zO;function js(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}js.prototype.clear=sb;js.prototype.delete=ab;js.prototype.get=cb;js.prototype.has=lb;js.prototype.set=ub;var qh=js;function VO(){this.__data__=[],this.size=0}var fb=VO;function XO(t,e){for(var r=t.length;r--;)if(Ln(t[r][0],e))return r;return-1}var ji=XO;var YO=Array.prototype,JO=YO.splice;function QO(t){var e=this.__data__,r=ji(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():JO.call(e,r,1),--this.size,!0}var db=QO;function ZO(t){var e=this.__data__,r=ji(e,t);return r<0?void 0:e[r][1]}var pb=ZO;function eD(t){return ji(this.__data__,t)>-1}var mb=eD;function tD(t,e){var r=this.__data__,n=ji(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var hb=tD;function Hs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Hs.prototype.clear=fb;Hs.prototype.delete=db;Hs.prototype.get=pb;Hs.prototype.has=mb;Hs.prototype.set=hb;var Hi=Hs;var rD=kr(Nt,"Map"),Ki=rD;function nD(){this.size=0,this.__data__={hash:new qh,map:new(Ki||Hi),string:new qh}}var yb=nD;function iD(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var gb=iD;function oD(t,e){var r=t.__data__;return gb(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Bi=oD;function sD(t){var e=Bi(this,t).delete(t);return this.size-=e?1:0,e}var Tb=sD;function aD(t){return Bi(this,t).get(t)}var vb=aD;function cD(t){return Bi(this,t).has(t)}var xb=cD;function lD(t,e){var r=Bi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var Rb=lD;function Ks(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ks.prototype.clear=yb;Ks.prototype.delete=Tb;Ks.prototype.get=vb;Ks.prototype.has=xb;Ks.prototype.set=Rb;var Eo=Ks;var uD="Expected a function";function Gh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(uD);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(Gh.Cache||Eo),r}Gh.Cache=Eo;var bb=Gh;var fD=500;function dD(t){var e=bb(t,function(n){return r.size===fD&&r.clear(),n}),r=e.cache;return e}var Sb=dD;var pD=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,mD=/\\(\\)?/g,hD=Sb(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(pD,function(r,n,i,o){e.push(i?o.replace(mD,"$1"):n||r)}),e}),Ab=hD;function yD(t){return t==null?"":AR(t)}var wb=yD;function gD(t,e){return z(t)?t:Gs(t,e)?[t]:Ab(wb(t))}var Wi=gD;var TD=1/0;function vD(t){if(typeof t=="string"||Pn(t))return t;var e=t+"";return e=="0"&&1/t==-TD?"-0":e}var qn=vD;function xD(t,e){e=Wi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[qn(e[r++])];return r&&r==n?t:void 0}var Bs=xD;function RD(t,e,r){var n=t==null?void 0:Bs(t,e);return n===void 0?r:n}var kb=RD;function bD(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Ws=bD;var Cb=qt?qt.isConcatSpreadable:void 0;function SD(t){return z(t)||qi(t)||!!(Cb&&t&&t[Cb])}var Eb=SD;function $b(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=Eb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?$b(a,e-1,r,n,i):Ws(i,a):n||(i[i.length]=a)}return i}var zs=$b;function AD(t){var e=t==null?0:t.length;return e?zs(t,1):[]}var vt=AD;var wD=mf(Object.getPrototypeOf,Object),yf=wD;function kD(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var gf=kD;function CD(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var Nb=CD;function ED(){this.__data__=new Hi,this.size=0}var _b=ED;function $D(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var Ib=$D;function ND(t){return this.__data__.get(t)}var Pb=ND;function _D(t){return this.__data__.has(t)}var Ob=_D;var ID=200;function PD(t,e){var r=this.__data__;if(r instanceof Hi){var n=r.__data__;if(!Ki||n.length<ID-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Eo(n)}return r.set(t,e),this.size=r.size,this}var Db=PD;function Vs(t){var e=this.__data__=new Hi(t);this.size=e.size}Vs.prototype.clear=_b;Vs.prototype.delete=Ib;Vs.prototype.get=Pb;Vs.prototype.has=Ob;Vs.prototype.set=Db;var zi=Vs;function OD(t,e){return t&&Mn(e,Ke(e),t)}var Lb=OD;function DD(t,e){return t&&Mn(e,Gi(e),t)}var Mb=DD;var Gb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Fb=Gb&&typeof module=="object"&&module&&!module.nodeType&&module,LD=Fb&&Fb.exports===Gb,Ub=LD?Nt.Buffer:void 0,qb=Ub?Ub.allocUnsafe:void 0;function MD(t,e){if(e)return t.slice();var r=t.length,n=qb?qb(r):new t.constructor(r);return t.copy(n),n}var jb=MD;function FD(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Xs=FD;function UD(){return[]}var Tf=UD;var qD=Object.prototype,GD=qD.propertyIsEnumerable,Hb=Object.getOwnPropertySymbols,jD=Hb?function(t){return t==null?[]:(t=Object(t),Xs(Hb(t),function(e){return GD.call(t,e)}))}:Tf,Ys=jD;function HD(t,e){return Mn(t,Ys(t),e)}var Kb=HD;var KD=Object.getOwnPropertySymbols,BD=KD?function(t){for(var e=[];t;)Ws(e,Ys(t)),t=yf(t);return e}:Tf,vf=BD;function WD(t,e){return Mn(t,vf(t),e)}var Bb=WD;function zD(t,e,r){var n=e(t);return z(t)?n:Ws(n,r(t))}var xf=zD;function VD(t){return xf(t,Ke,Ys)}var Ac=VD;function XD(t){return xf(t,Gi,vf)}var Rf=XD;var YD=kr(Nt,"DataView"),bf=YD;var JD=kr(Nt,"Promise"),Sf=JD;var QD=kr(Nt,"Set"),Vi=QD;var Wb="[object Map]",ZD="[object Object]",zb="[object Promise]",Vb="[object Set]",Xb="[object WeakMap]",Yb="[object DataView]",eL=fi(bf),tL=fi(Ki),rL=fi(Sf),nL=fi(Vi),iL=fi(lf),$o=yr;(bf&&$o(new bf(new ArrayBuffer(1)))!=Yb||Ki&&$o(new Ki)!=Wb||Sf&&$o(Sf.resolve())!=zb||Vi&&$o(new Vi)!=Vb||lf&&$o(new lf)!=Xb)&&($o=function(t){var e=yr(t),r=e==ZD?t.constructor:void 0,n=r?fi(r):"";if(n)switch(n){case eL:return Yb;case tL:return Wb;case rL:return zb;case nL:return Vb;case iL:return Xb}return e});var Tn=$o;var oL=Object.prototype,sL=oL.hasOwnProperty;function aL(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&sL.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Jb=aL;var cL=Nt.Uint8Array,Js=cL;function lL(t){var e=new t.constructor(t.byteLength);return new Js(e).set(new Js(t)),e}var Qs=lL;function uL(t,e){var r=e?Qs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Qb=uL;var fL=/\w*$/;function dL(t){var e=new t.constructor(t.source,fL.exec(t));return e.lastIndex=t.lastIndex,e}var Zb=dL;var eS=qt?qt.prototype:void 0,tS=eS?eS.valueOf:void 0;function pL(t){return tS?Object(tS.call(t)):{}}var rS=pL;function mL(t,e){var r=e?Qs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var nS=mL;var hL="[object Boolean]",yL="[object Date]",gL="[object Map]",TL="[object Number]",vL="[object RegExp]",xL="[object Set]",RL="[object String]",bL="[object Symbol]",SL="[object ArrayBuffer]",AL="[object DataView]",wL="[object Float32Array]",kL="[object Float64Array]",CL="[object Int8Array]",EL="[object Int16Array]",$L="[object Int32Array]",NL="[object Uint8Array]",_L="[object Uint8ClampedArray]",IL="[object Uint16Array]",PL="[object Uint32Array]";function OL(t,e,r){var n=t.constructor;switch(e){case SL:return Qs(t);case hL:case yL:return new n(+t);case AL:return Qb(t,r);case wL:case kL:case CL:case EL:case $L:case NL:case _L:case IL:case PL:return nS(t,r);case gL:return new n;case TL:case RL:return new n(t);case vL:return Zb(t);case xL:return new n;case bL:return rS(t)}}var iS=OL;function DL(t){return typeof t.constructor=="function"&&!Fn(t)?LR(yf(t)):{}}var oS=DL;var LL="[object Map]";function ML(t){return Tt(t)&&Tn(t)==LL}var sS=ML;var aS=Zr&&Zr.isMap,FL=aS?Un(aS):sS,cS=FL;var UL="[object Set]";function qL(t){return Tt(t)&&Tn(t)==UL}var lS=qL;var uS=Zr&&Zr.isSet,GL=uS?Un(uS):lS,fS=GL;var jL=1,HL=2,KL=4,dS="[object Arguments]",BL="[object Array]",WL="[object Boolean]",zL="[object Date]",VL="[object Error]",pS="[object Function]",XL="[object GeneratorFunction]",YL="[object Map]",JL="[object Number]",mS="[object Object]",QL="[object RegExp]",ZL="[object Set]",eM="[object String]",tM="[object Symbol]",rM="[object WeakMap]",nM="[object ArrayBuffer]",iM="[object DataView]",oM="[object Float32Array]",sM="[object Float64Array]",aM="[object Int8Array]",cM="[object Int16Array]",lM="[object Int32Array]",uM="[object Uint8Array]",fM="[object Uint8ClampedArray]",dM="[object Uint16Array]",pM="[object Uint32Array]",Be={};Be[dS]=Be[BL]=Be[nM]=Be[iM]=Be[WL]=Be[zL]=Be[oM]=Be[sM]=Be[aM]=Be[cM]=Be[lM]=Be[YL]=Be[JL]=Be[mS]=Be[QL]=Be[ZL]=Be[eM]=Be[tM]=Be[uM]=Be[fM]=Be[dM]=Be[pM]=!0;Be[VL]=Be[pS]=Be[rM]=!1;function Af(t,e,r,n,i,o){var s,a=e&jL,c=e&HL,l=e&KL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!ct(t))return t;var u=z(t);if(u){if(s=Jb(t),!a)return FR(t,s)}else{var f=Tn(t),m=f==pS||f==XL;if(di(t))return jb(t,a);if(f==mS||f==dS||m&&!i){if(s=c||m?{}:oS(t),!a)return c?Bb(t,Mb(s,t)):Kb(t,Lb(s,t))}else{if(!Be[f])return i?t:{};s=iS(t,f,a)}}o||(o=new zi);var T=o.get(t);if(T)return T;o.set(t,s),fS(t)?t.forEach(function(N){s.add(Af(N,e,r,N,t,o))}):cS(t)&&t.forEach(function(N,k){s.set(k,Af(N,e,r,k,t,o))});var S=l?c?Rf:Ac:c?Gi:Ke,w=u?void 0:S(t);return uf(w||t,function(N,k){w&&(k=N,N=t[k]),Fi(s,k,Af(N,e,r,k,t,o))}),s}var hS=Af;var mM=4;function hM(t){return hS(t,mM)}var We=hM;function yM(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Gn=yM;var gM="__lodash_hash_undefined__";function TM(t){return this.__data__.set(t,gM),this}var yS=TM;function vM(t){return this.__data__.has(t)}var gS=vM;function wf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Eo;++e<r;)this.add(t[e])}wf.prototype.add=wf.prototype.push=yS;wf.prototype.has=gS;var Zs=wf;function xM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var kf=xM;function RM(t,e){return t.has(e)}var ea=RM;var bM=1,SM=2;function AM(t,e,r,n,i,o){var s=r&bM,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=o.get(t),u=o.get(e);if(l&&u)return l==e&&u==t;var f=-1,m=!0,T=r&SM?new Zs:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var S=t[f],w=e[f];if(n)var N=s?n(w,S,f,e,t,o):n(S,w,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!kf(e,function(k,v){if(!ea(T,v)&&(S===k||i(S,k,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(S===w||i(S,w,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var Cf=AM;function wM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var TS=wM;function kM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var ta=kM;var CM=1,EM=2,$M="[object Boolean]",NM="[object Date]",_M="[object Error]",IM="[object Map]",PM="[object Number]",OM="[object RegExp]",DM="[object Set]",LM="[object String]",MM="[object Symbol]",FM="[object ArrayBuffer]",UM="[object DataView]",vS=qt?qt.prototype:void 0,jh=vS?vS.valueOf:void 0;function qM(t,e,r,n,i,o,s){switch(r){case UM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case FM:return!(t.byteLength!=e.byteLength||!o(new Js(t),new Js(e)));case $M:case NM:case PM:return Ln(+t,+e);case _M:return t.name==e.name&&t.message==e.message;case OM:case LM:return t==e+"";case IM:var a=TS;case DM:var c=n&CM;if(a||(a=ta),t.size!=e.size&&!c)return!1;var l=s.get(t);if(l)return l==e;n|=EM,s.set(t,e);var u=Cf(a(t),a(e),n,i,o,s);return s.delete(t),u;case MM:if(jh)return jh.call(t)==jh.call(e)}return!1}var xS=qM;var GM=1,jM=Object.prototype,HM=jM.hasOwnProperty;function KM(t,e,r,n,i,o){var s=r&GM,a=Ac(t),c=a.length,l=Ac(e),u=l.length;if(c!=u&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:HM.call(e,m)))return!1}var T=o.get(t),S=o.get(e);if(T&&S)return T==e&&S==t;var w=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<c;){m=a[f];var k=t[m],v=e[m];if(n)var g=s?n(v,k,m,e,t,o):n(k,v,m,t,e,o);if(!(g===void 0?k===v||i(k,v,r,n,o):g)){w=!1;break}N||(N=m=="constructor")}if(w&&!N){var $=t.constructor,O=e.constructor;$!=O&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof O=="function"&&O instanceof O)&&(w=!1)}return o.delete(t),o.delete(e),w}var RS=KM;var BM=1,bS="[object Arguments]",SS="[object Array]",Ef="[object Object]",WM=Object.prototype,AS=WM.hasOwnProperty;function zM(t,e,r,n,i,o){var s=z(t),a=z(e),c=s?SS:Tn(t),l=a?SS:Tn(e);c=c==bS?Ef:c,l=l==bS?Ef:l;var u=c==Ef,f=l==Ef,m=c==l;if(m&&di(t)){if(!di(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new zi),s||qs(t)?Cf(t,e,r,n,i,o):xS(t,e,c,r,n,i,o);if(!(r&BM)){var T=u&&AS.call(t,"__wrapped__"),S=f&&AS.call(e,"__wrapped__");if(T||S){var w=T?t.value():t,N=S?e.value():e;return o||(o=new zi),i(w,N,r,n,o)}}return m?(o||(o=new zi),RS(t,e,r,n,i,o)):!1}var wS=zM;function kS(t,e,r,n,i){return t===e?!0:t==null||e==null||!Tt(t)&&!Tt(e)?t!==t&&e!==e:wS(t,e,r,n,kS,i)}var $f=kS;var VM=1,XM=2;function YM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var c=a[0],l=t[c],u=a[1];if(s&&a[2]){if(l===void 0&&!(c in t))return!1}else{var f=new zi;if(n)var m=n(l,u,c,t,e,f);if(!(m===void 0?$f(u,l,VM|XM,n,f):m))return!1}}return!0}var CS=YM;function JM(t){return t===t&&!ct(t)}var Nf=JM;function QM(t){for(var e=Ke(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,Nf(i)]}return e}var ES=QM;function ZM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var _f=ZM;function eF(t){var e=ES(t);return e.length==1&&e[0][2]?_f(e[0][0],e[0][1]):function(r){return r===t||CS(r,t,e)}}var $S=eF;function tF(t,e){return t!=null&&e in Object(t)}var NS=tF;function rF(t,e,r){e=Wi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=qn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Us(i)&&Mi(s,i)&&(z(t)||qi(t)))}var If=rF;function nF(t,e){return t!=null&&If(t,e,NS)}var _S=nF;var iF=1,oF=2;function sF(t,e){return Gs(t)&&Nf(e)?_f(qn(t),e):function(r){var n=kb(r,t);return n===void 0&&n===e?_S(r,t):$f(e,n,iF|oF)}}var IS=sF;function aF(t){return function(e){return e?.[t]}}var PS=aF;function cF(t){return function(e){return Bs(e,t)}}var OS=cF;function lF(t){return Gs(t)?PS(qn(t)):OS(t)}var DS=lF;function uF(t){return typeof t=="function"?t:t==null?wr:typeof t=="object"?z(t)?IS(t[0],t[1]):$S(t):DS(t)}var ht=uF;function fF(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var LS=fF;function dF(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[t?a:++i];if(r(o[c],c,o)===!1)break}return e}}var MS=dF;var pF=MS(),FS=pF;function mF(t,e){return t&&FS(t,e,Ke)}var US=mF;function hF(t,e){return function(r,n){if(r==null)return r;if(!_t(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var qS=hF;var yF=qS(US),Cr=yF;function gF(t,e,r,n){return Cr(t,function(i,o,s){e(n,i,r(i),s)}),n}var GS=gF;function TF(t,e){return function(r,n){var i=z(r)?LS:GS,o=e?e():{};return i(r,t,ht(n,2),o)}}var jS=TF;var HS=Object.prototype,vF=HS.hasOwnProperty,xF=Fs(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Ui(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Gi(o),a=-1,c=s.length;++a<c;){var l=s[a],u=t[l];(u===void 0||Ln(u,HS[l])&&!vF.call(t,l))&&(t[l]=o[l])}return t}),ra=xF;function RF(t){return Tt(t)&&_t(t)}var Hh=RF;function bF(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Pf=bF;var SF=200;function AF(t,e,r,n){var i=-1,o=df,s=!0,a=t.length,c=[],l=e.length;if(!a)return c;r&&(e=On(e,Un(r))),n?(o=Pf,s=!1):e.length>=SF&&(o=ea,s=!1,e=new Zs(e));e:for(;++i<a;){var u=t[i],f=r==null?u:r(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;c.push(u)}else o(e,f,n)||c.push(u)}return c}var KS=AF;var wF=Fs(function(t,e){return Hh(t)?KS(t,zs(e,1,Hh,!0)):[]}),Xi=wF;function kF(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var jn=kF;function CF(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Dn(e),gf(t,e<0?0:e,n)):[]}var xt=CF;function EF(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Dn(e),e=n-e,gf(t,0,e<0?0:e)):[]}var mi=EF;function $F(t){return typeof t=="function"?t:wr}var BS=$F;function NF(t,e){var r=z(t)?uf:Cr;return r(t,BS(e))}var G=NF;function _F(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var WS=_F;function IF(t,e){var r=!0;return Cr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var zS=IF;function PF(t,e,r){var n=z(t)?WS:zS;return r&&Ui(t,e,r)&&(e=void 0),n(t,ht(e,3))}var lr=PF;function OF(t,e){var r=[];return Cr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var Of=OF;function DF(t,e){var r=z(t)?Xs:Of;return r(t,ht(e,3))}var Gt=DF;function LF(t){return function(e,r,n){var i=Object(e);if(!_t(e)){var o=ht(r,3);e=Ke(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var VS=LF;var MF=Math.max;function FF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Dn(r);return i<0&&(i=MF(n+i,0)),ff(t,ht(e,3),i)}var XS=FF;var UF=VS(XS),Hn=UF;function qF(t){return t&&t.length?t[0]:void 0}var jt=qF;function GF(t,e){var r=-1,n=_t(t)?Array(t.length):[];return Cr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var YS=GF;function jF(t,e){var r=z(t)?On:YS;return r(t,ht(e,3))}var L=jF;function HF(t,e){return zs(L(t,e),1)}var er=HF;var KF=Object.prototype,BF=KF.hasOwnProperty,WF=jS(function(t,e,r){BF.call(t,r)?t[r].push(e):Ms(t,r,[e])}),Kh=WF;var zF=Object.prototype,VF=zF.hasOwnProperty;function XF(t,e){return t!=null&&VF.call(t,e)}var JS=XF;function YF(t,e){return t!=null&&If(t,e,JS)}var B=YF;var JF="[object String]";function QF(t){return typeof t=="string"||!z(t)&&Tt(t)&&yr(t)==JF}var Lt=QF;function ZF(t,e){return On(e,function(r){return t[r]})}var QS=ZF;function e1(t){return t==null?[]:QS(t,Ke(t))}var Oe=e1;var t1=Math.max;function r1(t,e,r,n){t=_t(t)?t:Oe(t),r=r&&!n?Dn(r):0;var i=t.length;return r<0&&(r=t1(i+r,0)),Lt(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ls(t,e,r)>-1}var tt=r1;var n1=Math.max;function i1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Dn(r);return i<0&&(i=n1(n+i,0)),Ls(t,e,i)}var Df=i1;var o1="[object Map]",s1="[object Set]",a1=Object.prototype,c1=a1.hasOwnProperty;function l1(t){if(t==null)return!0;if(_t(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||di(t)||qs(t)||qi(t)))return!t.length;var e=Tn(t);if(e==o1||e==s1)return!t.size;if(Fn(t))return!hf(t).length;for(var r in t)if(c1.call(t,r))return!1;return!0}var se=l1;var u1="[object RegExp]";function f1(t){return Tt(t)&&yr(t)==u1}var ZS=f1;var eA=Zr&&Zr.isRegExp,d1=eA?Un(eA):ZS,en=d1;function p1(t){return t===void 0}var ur=p1;function m1(t,e){return t<e}var tA=m1;function h1(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!Pn(s):r(s,a)))var a=s,c=o}return c}var rA=h1;function y1(t){return t&&t.length?rA(t,wr,tA):void 0}var nA=y1;var g1="Expected a function";function T1(t){if(typeof t!="function")throw new TypeError(g1);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var iA=T1;function v1(t,e,r,n){if(!ct(t))return t;e=Wi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var c=qn(e[i]),l=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=s){var u=a[c];l=n?n(u,c,a):void 0,l===void 0&&(l=ct(u)?u:Mi(e[i+1])?[]:{})}Fi(a,c,l),a=a[c]}return t}var oA=v1;function x1(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Bs(t,s);r(a,s)&&oA(o,Wi(s,t),a)}return o}var sA=x1;function R1(t,e){if(t==null)return{};var r=On(Rf(t),function(n){return[n]});return e=ht(e),sA(t,r,function(n,i){return e(n,i[0])})}var Er=R1;function b1(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var aA=b1;function S1(t,e,r){var n=z(t)?Nb:aA,i=arguments.length<3;return n(t,ht(e,4),r,i,Cr)}var ut=S1;function A1(t,e){var r=z(t)?Xs:Of;return r(t,iA(ht(e,3)))}var Yi=A1;function w1(t,e){var r;return Cr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var cA=w1;function k1(t,e,r){var n=z(t)?kf:cA;return r&&Ui(t,e,r)&&(e=void 0),n(t,ht(e,3))}var wc=k1;var C1=1/0,E1=Vi&&1/ta(new Vi([,-0]))[1]==C1?function(t){return new Vi(t)}:lt,lA=E1;var $1=200;function N1(t,e,r){var n=-1,i=df,o=t.length,s=!0,a=[],c=a;if(r)s=!1,i=Pf;else if(o>=$1){var l=e?null:lA(t);if(l)return ta(l);s=!1,i=ea,c=new Zs}else c=e?[]:a;e:for(;++n<o;){var u=t[n],f=e?e(u):u;if(u=r||u!==0?u:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(u)}else i(c,f,r)||(c!==a&&c.push(f),a.push(u))}return a}var Lf=N1;function _1(t){return t&&t.length?Lf(t):[]}var na=_1;function I1(t,e){return t&&t.length?Lf(t,ht(e,2)):[]}var uA=I1;function ia(t){console&&console.error&&console.error(`Error: ${t}`)}function kc(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function Cc(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Ec(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function P1(t){return O1(t)?t.LABEL:t.name}function O1(t){return Lt(t.LABEL)&&t.LABEL!==""}var Gr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},Ce=class extends Gr{constructor(e){super([]),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},Tr=class extends Gr{constructor(e){super(e.definition),this.orgText="",Zt(this,Er(e,r=>r!==void 0))}},ze=class extends Gr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Zt(this,Er(e,r=>r!==void 0))}},Ee=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Ve=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Xe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},pe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Fe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Zt(this,Er(e,r=>r!==void 0))}},Ue=class extends Gr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Zt(this,Er(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Zt(this,Er(e,r=>r!==void 0))}accept(e){e.visit(this)}};function Mf(t){return L(t,oa)}function oa(t){function e(r){return L(r,oa)}if(t instanceof Ce){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Lt(t.label)&&(r.label=t.label),r}else{if(t instanceof ze)return{type:"Alternative",definition:e(t.definition)};if(t instanceof Ee)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Xe)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:oa(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Fe)return{type:"RepetitionWithSeparator",idx:t.idx,separator:oa(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Ue)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:P1(t.terminalType),idx:t.idx};Lt(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=en(n)?n.source:n),r}else{if(t instanceof Tr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var vr=class{visit(e){let r=e;switch(r.constructor){case Ce:return this.visitNonTerminal(r);case ze:return this.visitAlternative(r);case Ee:return this.visitOption(r);case Ve:return this.visitRepetitionMandatory(r);case Xe:return this.visitRepetitionMandatoryWithSeparator(r);case Fe:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Ue:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case Tr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Bh(t){return t instanceof ze||t instanceof Ee||t instanceof pe||t instanceof Ve||t instanceof Xe||t instanceof Fe||t instanceof ae||t instanceof Tr}function No(t,e=[]){return t instanceof Ee||t instanceof pe||t instanceof Fe?!0:t instanceof Ue?wc(t.definition,n=>No(n,e)):t instanceof Ce&&tt(e,t)?!1:t instanceof Gr?(t instanceof Ce&&e.push(t),lr(t.definition,n=>No(n,e))):!1}function Wh(t){return t instanceof Ue}function $r(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof Ee)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var hi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=xt(e.definition,i+1);if(n instanceof Ce)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof ze)this.walkFlat(n,o,r);else if(n instanceof Ee)this.walkOption(n,o,r);else if(n instanceof Ve)this.walkAtLeastOne(n,o,r);else if(n instanceof Xe)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Fe)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Ue)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new Ee({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=fA(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new Ee({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=fA(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new ze({definition:[o]});this.walk(s,i)})}};function fA(t,e,r){return[new Ee({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function _o(t){if(t instanceof Ce)return _o(t.referencedRule);if(t instanceof ae)return M1(t);if(Bh(t))return D1(t);if(Wh(t))return L1(t);throw Error("non exhaustive match")}function D1(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=No(o),e=e.concat(_o(o)),n=n+1,i=r.length>n;return na(e)}function L1(t){let e=L(t.definition,r=>_o(r));return na(vt(e))}function M1(t){return[t.terminalType]}var Ff="_~IN~_";var zh=class extends hi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=F1(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new ze({definition:o}),a=_o(s);this.follows[i]=a}};function dA(t){let e={};return G(t,r=>{let n=new zh(r).startWalking();Zt(e,n)}),e}function F1(t,e){return t.name+e+Ff}var Uf={},U1=new Ro;function sa(t){let e=t.toString();if(Uf.hasOwnProperty(e))return Uf[e];{let r=U1.pattern(e);return Uf[e]=r,r}}function pA(){Uf={}}var hA="Complement Sets are not supported for first char optimization",$c=`Unable to use "first char" lexer optimizations:
`;function yA(t,e=!1){try{let r=sa(t);return Vh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===hA)e&&kc(`${$c}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ia(`${$c}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Vh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Vh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":qf(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(hA);G(s.value,c=>{if(typeof c=="number")qf(c,e,r);else{let l=c;if(r===!0)for(let u=l.from;u<=l.to;u++)qf(u,e,r);else{for(let u=l.from;u<=l.to&&u<aa;u++)qf(u,e,r);if(l.to>=aa){let u=l.from>=aa?l.from:aa,f=l.to,m=Kn(u),T=Kn(f);for(let S=m;S<=T;S++)e[S]=S}}}});break;case"Group":Vh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&Xh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Oe(e)}function qf(t,e,r){let n=Kn(t);e[n]=n,r===!0&&q1(t,e)}function q1(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=Kn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=Kn(i.charCodeAt(0));e[o]=o}}}function mA(t,e){return Hn(t.value,r=>{if(typeof r=="number")return tt(e,r);{let n=r;return Hn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function Xh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?lr(t.value,Xh):Xh(t.value):!1}var Yh=class extends _n{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){tt(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?mA(e,this.targetCharCodes)===void 0&&(this.found=!0):mA(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function Gf(t,e){if(e instanceof RegExp){let r=sa(e),n=new Yh(t);return n.visit(r),n.found}else return Hn(e,r=>tt(t,r.charCodeAt(0)))!==void 0}var Io="PATTERN",ca="defaultMode",jf="modes",Qh=typeof new RegExp("(?:)").sticky=="boolean";function vA(t,e){e=ra(e,{useSticky:Qh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,g)=>g()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{iU()});let n;r("Reject Lexer.NA",()=>{n=Yi(t,v=>v[Io]===yt.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let g=v[Io];if(en(g)){let $=g.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!g.ignoreCase?$:$.length===2&&$[0]==="\\"&&!tt(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?TA(g):gA(g)}else{if(gr(g))return i=!0,{exec:g};if(typeof g=="object")return i=!0,g;if(typeof g=="string"){if(g.length===1)return g;{let $=g.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),O=new RegExp($);return e.useSticky?TA(O):gA(O)}}else throw Error("non exhaustive match")}})});let s,a,c,l,u;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let g=v.GROUP;if(g!==yt.SKIPPED){if(Lt(g))return g;if(ur(g))return!1;throw Error("non exhaustive match")}}),c=L(n,v=>{let g=v.LONGER_ALT;if(g)return z(g)?L(g,O=>Df(n,O)):[Df(n,g)]}),l=L(n,v=>v.PUSH_MODE),u=L(n,v=>B(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=CA(e.lineTerminatorCharacters);f=L(n,g=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,g=>B(g,"LINE_BREAKS")?!!g.LINE_BREAKS:kA(g,v)===!1&&Gf(v,g.PATTERN)))});let m,T,S,w;r("Misc Mapping #2",()=>{m=L(n,AA),T=L(o,rU),S=ut(n,(v,g)=>{let $=g.GROUP;return Lt($)&&$!==yt.SKIPPED&&(v[$]=[]),v},{}),w=L(o,(v,g)=>({pattern:o[g],longerAlt:c[g],canLineTerminator:f[g],isCustom:m[g],short:T[g],group:a[g],push:l[g],pop:u[g],tokenTypeIdx:s[g],tokenType:n[g]}))});let N=!0,k=[];return e.safeMode||r("First Char Optimization",()=>{k=ut(n,(v,g,$)=>{if(typeof g.PATTERN=="string"){let O=g.PATTERN.charCodeAt(0),X=Kn(O);Jh(v,X,w[$])}else if(z(g.START_CHARS_HINT)){let O;G(g.START_CHARS_HINT,X=>{let Te=typeof X=="string"?X.charCodeAt(0):X,$e=Kn(Te);O!==$e&&(O=$e,Jh(v,$e,w[$]))})}else if(en(g.PATTERN))if(g.PATTERN.unicode)N=!1,e.ensureOptimizations&&ia(`${$c}	Unable to analyze < ${g.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let O=yA(g.PATTERN,e.ensureOptimizations);se(O)&&(N=!1),G(O,X=>{Jh(v,X,w[$])})}else e.ensureOptimizations&&ia(`${$c}	TokenType: <${g.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:S,patternIdxToConfig:w,charCodeToPatternIdxToConfig:k,hasCustom:i,canBeOptimized:N}}function xA(t,e){let r=[],n=j1(t);r=r.concat(n.errors);let i=H1(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(G1(o)),r=r.concat(J1(o)),r=r.concat(Q1(o,e)),r=r.concat(Z1(o)),r}function G1(t){let e=[],r=Gt(t,n=>en(n[Io]));return e=e.concat(B1(r)),e=e.concat(V1(r)),e=e.concat(X1(r)),e=e.concat(Y1(r)),e=e.concat(W1(r)),e}function j1(t){let e=Gt(t,i=>!B(i,Io)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:rt.MISSING_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}function H1(t){let e=Gt(t,i=>{let o=i[Io];return!en(o)&&!gr(o)&&!B(o,"exec")&&!Lt(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:rt.INVALID_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}var K1=/[^\\][$]/;function B1(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=Gt(t,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return K1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function W1(t){let e=Gt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:rt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var z1=/[^\\[][\^]|^\^/;function V1(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=Gt(t,i=>{let o=i.PATTERN;try{let s=sa(o),a=new e;return a.visit(s),a.found}catch{return z1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function X1(t){let e=Gt(t,n=>{let i=n[Io];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:rt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function Y1(t){let e=[],r=L(t,o=>ut(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!tt(e,a)&&a.PATTERN!==yt.NA&&(e.push(a),s.push(a)),s),[]));r=Gn(r);let n=Gt(r,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${jt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:rt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function J1(t){let e=Gt(t,n=>{if(!B(n,"GROUP"))return!1;let i=n.GROUP;return i!==yt.SKIPPED&&i!==yt.NA&&!Lt(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:rt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function Q1(t,e){let r=Gt(t,i=>i.PUSH_MODE!==void 0&&!tt(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:rt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function Z1(t){let e=[],r=ut(t,(n,i,o)=>{let s=i.PATTERN;return s===yt.NA||(Lt(s)?n.push({str:s,idx:o,tokenType:i}):en(s)&&tU(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&eU(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:rt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function eU(t,e){if(en(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(gr(e))return e(t,0,[],{});if(B(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function tU(t){return Hn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function gA(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function TA(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function RA(t,e,r){let n=[];return B(t,ca)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+ca+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),B(t,jf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+jf+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),B(t,jf)&&B(t,ca)&&!B(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${ca}: <${t.defaultMode}>which does not exist
`,type:rt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),B(t,jf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(ur(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:rt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(B(s,"LONGER_ALT")){let c=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,l=>{!ur(l)&&!tt(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:rt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function bA(t,e,r){let n=[],i=!1,o=Gn(vt(Oe(t.modes))),s=Yi(o,c=>c[Io]===yt.NA),a=CA(r);return e&&G(s,c=>{let l=kA(c,a);if(l!==!1){let f={message:nU(c,l),type:l.issue,tokenType:c};n.push(f)}else B(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):Gf(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:rt.NO_LINE_BREAKS_FLAGS}),n}function SA(t){let e={},r=Ke(t);return G(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function AA(t){let e=t.PATTERN;if(en(e))return!1;if(gr(e))return!0;if(B(e,"exec"))return!0;if(Lt(e))return!1;throw Error("non exhaustive match")}function rU(t){return Lt(t)&&t.length===1?t.charCodeAt(0):!1}var wA={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function kA(t,e){if(B(t,"LINE_BREAKS"))return!1;if(en(t.PATTERN)){try{Gf(e,t.PATTERN)}catch(r){return{issue:rt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Lt(t.PATTERN))return!1;if(AA(t))return{issue:rt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function nU(t,e){if(e.issue===rt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===rt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function CA(t){return L(t,r=>Lt(r)?r.charCodeAt(0):r)}function Jh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var aa=256,Hf=[];function Kn(t){return t<aa?t:Hf[t]}function iU(){if(se(Hf)){Hf=new Array(65536);for(let t=0;t<65536;t++)Hf[t]=t>255?255+~~(t/255):t}}function yi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function la(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var EA=1,NA={};function gi(t){let e=oU(t);sU(e),cU(e),aU(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function oU(t){let e=We(t),r=t,n=!0;for(;n;){r=Gn(vt(L(r,o=>o.CATEGORIES)));let i=Xi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function sU(t){G(t,e=>{Zh(e)||(NA[EA]=e,e.tokenTypeIdx=EA++),$A(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),$A(e)||(e.CATEGORIES=[]),lU(e)||(e.categoryMatches=[]),uU(e)||(e.categoryMatchesMap={})})}function aU(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(NA[n].tokenTypeIdx)})})}function cU(t){G(t,e=>{_A([],e)})}function _A(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);tt(n,r)||_A(n,r)})}function Zh(t){return B(t,"tokenTypeIdx")}function $A(t){return B(t,"CATEGORIES")}function lU(t){return B(t,"categoryMatches")}function uU(t){return B(t,"categoryMatchesMap")}function IA(t){return B(t,"tokenTypeIdx")}var ey={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var rt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(rt||(rt={}));var Nc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:ey,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Nc);var yt=class{constructor(e,r=Nc){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=Cc(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Zt({},Nc,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Nc.lineTerminatorsPattern)this.config.lineTerminatorsPattern=wA;else if(this.config.lineTerminatorCharacters===Nc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:We(e)},defaultMode:ca}:(o=!1,i=We(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(RA(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(bA(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=Yi(a,l=>ur(l))});let s=Ke(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(xA(a,s))}),se(this.lexerDefinitionErrors)){gi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=vA(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Zt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{kc(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Qh?(this.chopInput=wr,this.match=this.matchWithTest):(this.updateLastIndex=lt,this.match=this.matchWithExec),o&&(this.handleModes=lt),this.trackStartLines===!1&&(this.computeNewColumn=wr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=lt),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=ut(this.canModeBeOptimized,(c,l,u)=>(l===!1&&c.push(u),c),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{pA()}),this.TRACE_INIT("toFastProperties",()=>{Ec(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,c,l,u,f,m,T,S,w,N,k,v,g=e,$=g.length,O=0,X=0,Te=this.hasCustom?0:Math.floor(e.length/10),$e=new Array(Te),Kt=[],Rt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,A=SA(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],bt=[],ft=[];Object.freeze(ft);let he;function Nr(){return ee}function Bn(St){let tr=Kn(St),Sn=Q[tr];return Sn===void 0?ft:Sn}let ka=St=>{if(bt.length===1&&St.tokenType.PUSH_MODE===void 0){let tr=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(St);Kt.push({offset:St.startOffset,line:St.startLine,column:St.startColumn,length:St.image.length,message:tr})}else{bt.pop();let tr=jn(bt);ee=this.patternIdxToConfig[tr],Q=this.charCodeToPatternIdxToConfig[tr],ce=ee.length;let Sn=this.canModeBeOptimized[tr]&&this.config.safeMode===!1;Q&&Sn?he=Bn:he=Nr}};function eo(St){bt.push(St),Q=this.charCodeToPatternIdxToConfig[St],ee=this.patternIdxToConfig[St],ce=ee.length,ce=ee.length;let tr=this.canModeBeOptimized[St]&&this.config.safeMode===!1;Q&&tr?he=Bn:he=Nr}eo.call(this,r);let fr,qo=this.config.recoveryEnabled;for(;O<$;){c=null;let St=g.charCodeAt(O),tr=he(St),Sn=tr.length;for(n=0;n<Sn;n++){fr=tr[n];let Bt=fr.pattern;l=null;let dt=fr.short;if(dt!==!1?St===dt&&(c=Bt):fr.isCustom===!0?(v=Bt.exec(g,O,$e,A),v!==null?(c=v[0],v.payload!==void 0&&(l=v.payload)):c=null):(this.updateLastIndex(Bt,O),c=this.match(Bt,e,O)),c!==null){if(a=fr.longerAlt,a!==void 0){let jr=a.length;for(o=0;o<jr;o++){let _r=ee[a[o]],Rr=_r.pattern;if(u=null,_r.isCustom===!0?(v=Rr.exec(g,O,$e,A),v!==null?(s=v[0],v.payload!==void 0&&(u=v.payload)):s=null):(this.updateLastIndex(Rr,O),s=this.match(Rr,e,O)),s&&s.length>c.length){c=s,l=u,fr=_r;break}}}break}}if(c!==null){if(f=c.length,m=fr.group,m!==void 0&&(T=fr.tokenTypeIdx,S=this.createTokenInstance(c,O,T,fr.tokenType,Rt,M,f),this.handlePayload(S,l),m===!1?X=this.addToken($e,X,S):A[m].push(S)),e=this.chopInput(e,f),O=O+f,M=this.computeNewColumn(M,f),q===!0&&fr.canLineTerminator===!0){let Bt=0,dt,jr;j.lastIndex=0;do dt=j.test(c),dt===!0&&(jr=j.lastIndex-1,Bt++);while(dt===!0);Bt!==0&&(Rt=Rt+Bt,M=f-jr,this.updateTokenEndLineColumnLocation(S,m,jr,Bt,Rt,M,f))}this.handleModes(fr,ka,eo,S)}else{let Bt=O,dt=Rt,jr=M,_r=qo===!1;for(;_r===!1&&O<$;)for(e=this.chopInput(e,1),O++,i=0;i<ce;i++){let Rr=ee[i],to=Rr.pattern,bi=Rr.short;if(bi!==!1?g.charCodeAt(O)===bi&&(_r=!0):Rr.isCustom===!0?_r=to.exec(g,O,$e,A)!==null:(this.updateLastIndex(to,O),_r=to.exec(e)!==null),_r===!0)break}if(w=O-Bt,M=this.computeNewColumn(M,w),k=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g,Bt,w,dt,jr),Kt.push({offset:Bt,line:dt,column:jr,length:w,message:k}),qo===!1)break}}return this.hasCustom||($e.length=X),{tokens:$e,groups:A,errors:Kt}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let c,l;r!==void 0&&(c=n===a-1,l=c?-1:0,i===1&&c===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};yt.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";yt.NA=/NOT_APPLICABLE/;function Ti(t){return ty(t)?t.LABEL:t.name}function ty(t){return Lt(t.LABEL)&&t.LABEL!==""}var fU="parent",PA="categories",OA="label",DA="group",LA="push_mode",MA="pop_mode",FA="longer_alt",UA="line_breaks",qA="start_chars_hint";function Kf(t){return dU(t)}function dU(t){let e=t.pattern,r={};if(r.name=t.name,ur(e)||(r.PATTERN=e),B(t,fU))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return B(t,PA)&&(r.CATEGORIES=t[PA]),gi([r]),B(t,OA)&&(r.LABEL=t[OA]),B(t,DA)&&(r.GROUP=t[DA]),B(t,MA)&&(r.POP_MODE=t[MA]),B(t,LA)&&(r.PUSH_MODE=t[LA]),B(t,FA)&&(r.LONGER_ALT=t[FA]),B(t,UA)&&(r.LINE_BREAKS=t[UA]),B(t,qA)&&(r.START_CHARS_HINT=t[qA]),r}var vn=Kf({name:"EOF",pattern:yt.NA});gi([vn]);function Po(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function _c(t,e){return yi(t,e)}var vi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${ty(t)?`--> ${Ti(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+jt(e).image+"'";if(n)return o+n+a;{let c=ut(t,(m,T)=>m.concat(T),[]),l=L(c,m=>`[${L(m,T=>Ti(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+jt(e).image+"'";if(r)return i+r+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,l=>`[${L(l,u=>Ti(u)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(vi);var GA={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},xn={buildDuplicateFoundError(t,e){function r(u){return u instanceof ae?u.terminalType.name:u instanceof Ce?u.nonTerminalName:""}let n=t.name,i=jt(e),o=i.idx,s=$r(i),a=r(i),c=o>0,l=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return l=l.replace(/[ \t]+/g," "),l=l.replace(/\s\s+/g,`
`),l},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=$r(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof Tr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function jA(t,e){let r=new ry(t,e);return r.resolveRefs(),r.errors}var ry=class extends vr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(Oe(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Mt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var ny=class extends hi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=We(this.path.ruleStack).reverse(),this.occurrenceStack=We(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Bf=class extends ny{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new ze({definition:i});this.possibleTokTypes=_o(o),this.found=!0}}},ua=class extends hi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Wf=class extends ua{walkMany(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},Ic=class extends ua{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},zf=class extends ua{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Pc=class extends ua{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function Vf(t,e,r=[]){r=We(r);let n=[],i=0;function o(a){return a.concat(xt(t,i+1))}function s(a){let c=Vf(o(a),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof ze)return s(a.definition);if(a instanceof Ce)return s(a.definition);if(a instanceof Ee)n=s(a.definition);else if(a instanceof Ve){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof Xe){let c=[new ze({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Fe){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Ue)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:xt(t,i)}),n}function Xf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,l=c-n-1,u=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&jn(f).idx<=l&&f.pop();continue}let T=m.def,S=m.idx,w=m.ruleStack,N=m.occurrenceStack;if(se(T))continue;let k=T[0];if(k===i){let v={idx:S,def:xt(T),ruleStack:mi(w),occurrenceStack:mi(N)};f.push(v)}else if(k instanceof ae)if(S<c-1){let v=S+1,g=e[v];if(r(g,k.terminalType)){let $={idx:v,def:xt(T),ruleStack:w,occurrenceStack:N};f.push($)}}else if(S===c-1)u.push({nextTokenType:k.terminalType,nextTokenOccurrence:k.idx,ruleStack:w,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(k instanceof Ce){let v=We(w);v.push(k.nonTerminalName);let g=We(N);g.push(k.idx);let $={idx:S,def:k.definition.concat(o,xt(T)),ruleStack:v,occurrenceStack:g};f.push($)}else if(k instanceof Ee){let v={idx:S,def:xt(T),ruleStack:w,occurrenceStack:N};f.push(v),f.push(s);let g={idx:S,def:k.definition.concat(xt(T)),ruleStack:w,occurrenceStack:N};f.push(g)}else if(k instanceof Ve){let v=new pe({definition:k.definition,idx:k.idx}),g=k.definition.concat([v],xt(T)),$={idx:S,def:g,ruleStack:w,occurrenceStack:N};f.push($)}else if(k instanceof Xe){let v=new ae({terminalType:k.separator}),g=new pe({definition:[v].concat(k.definition),idx:k.idx}),$=k.definition.concat([g],xt(T)),O={idx:S,def:$,ruleStack:w,occurrenceStack:N};f.push(O)}else if(k instanceof Fe){let v={idx:S,def:xt(T),ruleStack:w,occurrenceStack:N};f.push(v),f.push(s);let g=new ae({terminalType:k.separator}),$=new pe({definition:[g].concat(k.definition),idx:k.idx}),O=k.definition.concat([$],xt(T)),X={idx:S,def:O,ruleStack:w,occurrenceStack:N};f.push(X)}else if(k instanceof pe){let v={idx:S,def:xt(T),ruleStack:w,occurrenceStack:N};f.push(v),f.push(s);let g=new pe({definition:k.definition,idx:k.idx}),$=k.definition.concat([g],xt(T)),O={idx:S,def:$,ruleStack:w,occurrenceStack:N};f.push(O)}else if(k instanceof Ue)for(let v=k.definition.length-1;v>=0;v--){let g=k.definition[v],$={idx:S,def:g.definition.concat(xt(T)),ruleStack:w,occurrenceStack:N};f.push($),f.push(s)}else if(k instanceof ze)f.push({idx:S,def:k.definition.concat(xt(T)),ruleStack:w,occurrenceStack:N});else if(k instanceof Tr)f.push(pU(k,S,w,N));else throw Error("non exhaustive match")}return u}function pU(t,e,r,n){let i=We(r);i.push(t.name);let o=We(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var nt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(nt||(nt={}));function Oc(t){if(t instanceof Ee||t==="Option")return nt.OPTION;if(t instanceof pe||t==="Repetition")return nt.REPETITION;if(t instanceof Ve||t==="RepetitionMandatory")return nt.REPETITION_MANDATORY;if(t instanceof Xe||t==="RepetitionMandatoryWithSeparator")return nt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Fe||t==="RepetitionWithSeparator")return nt.REPETITION_WITH_SEPARATOR;if(t instanceof Ue||t==="Alternation")return nt.ALTERNATION;throw Error("non exhaustive match")}function Jf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Oc(n);return o===nt.ALTERNATION?fa(e,r,i):da(e,r,o,i)}function KA(t,e,r,n,i,o){let s=fa(t,e,r),a=YA(s)?la:yi;return o(s,n,a,i)}function BA(t,e,r,n,i,o){let s=da(t,e,i,r),a=YA(s)?la:yi;return o(s[0],a,n)}function WA(t,e,r,n){let i=t.length,o=lr(t,s=>lr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let l=t[c],u=l.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let T=l[m],S=T.length;for(let w=0;w<S;w++){let N=this.LA(w+1);if(r(N,T[w])===!1)continue e}return c}}};if(o&&!n){let s=L(t,c=>vt(c)),a=ut(s,(c,l,u)=>(G(l,f=>{B(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{B(c,m)||(c[m]=u)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],c=a.length;e:for(let l=0;l<c;l++){let u=a[l],f=u.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,u[m])===!1)continue e}return s}}}}function zA(t,e,r){let n=lr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=vt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=ut(o,(a,c,l)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let c=0;c<a;c++){let l=this.LA(c+1);if(e(l,s[c])===!1)continue e}return!0}return!1}}var oy=class extends hi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,nt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,nt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},Yf=class extends vr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,nt.OPTION)}visitRepetition(e){this.checkIsTarget(e,nt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,nt.ALTERNATION)}};function HA(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function iy(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function mU(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function VA(t,e){let r=L(t,s=>Vf([s],1)),n=HA(r.length),i=L(r,s=>{let a={};return G(s,c=>{let l=iy(c.partialPath);G(l,u=>{a[u]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=HA(a.length);for(let c=0;c<a.length;c++){let l=a[c];for(let u=0;u<l.length;u++){let f=l[u].partialPath,m=l[u].suffixDef,T=iy(f);if(mU(i,T,c)||se(m)||f.length===e){let w=n[c];if(Qf(w,f)===!1){w.push(f);for(let N=0;N<T.length;N++){let k=T[N];i[c][k]=!0}}}else{let w=Vf(m,s+1,f);o[c]=o[c].concat(w),G(w,N=>{let k=iy(N.partialPath);G(k,v=>{i[c][v]=!0})})}}}}return n}function fa(t,e,r,n){let i=new Yf(t,nt.ALTERNATION,n);return e.accept(i),VA(i.result,r)}function da(t,e,r,n){let i=new Yf(t,r);e.accept(i);let o=i.result,a=new oy(e,t,r).startWalking(),c=new ze({definition:o}),l=new ze({definition:a});return VA([c,l],n)}function Qf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function XA(t,e){return t.length<e.length&&lr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function YA(t){return lr(t,e=>lr(e,r=>lr(r,n=>se(n.categoryMatches))))}function JA(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Mt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function QA(t,e,r,n){let i=er(t,c=>hU(c,r)),o=RU(t,e,r),s=er(t,c=>TU(c,r)),a=er(t,c=>gU(c,t,n,r));return i.concat(o,s,a)}function hU(t,e){let r=new sy;t.accept(r);let n=r.allProductions,i=Kh(n,yU),o=Er(i,a=>a.length>1);return L(Oe(o),a=>{let c=jt(a),l=e.buildDuplicateFoundError(t,a),u=$r(c),f={message:l,type:Mt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:u,occurrence:c.idx},m=ZA(c);return m&&(f.parameter=m),f})}function yU(t){return`${$r(t)}_#_${t.idx}_#_${ZA(t)}`}function ZA(t){return t instanceof ae?t.terminalType.name:t instanceof Ce?t.nonTerminalName:""}var sy=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function gU(t,e,r,n){let i=[];if(ut(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Mt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function ew(t,e,r){let n=[],i;return tt(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Mt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function cy(t,e,r,n=[]){let i=[],o=Zf(e.definition);if(se(o))return[];{let s=t.name;tt(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Mt.LEFT_RECURSION,ruleName:s});let c=Xi(o,n.concat([t])),l=er(c,u=>{let f=We(n);return f.push(u),cy(t,u,r,f)});return i.concat(l)}}function Zf(t){let e=[];if(se(t))return e;let r=jt(t);if(r instanceof Ce)e.push(r.referencedRule);else if(r instanceof ze||r instanceof Ee||r instanceof Ve||r instanceof Xe||r instanceof Fe||r instanceof pe)e=e.concat(Zf(r.definition));else if(r instanceof Ue)e=vt(L(r.definition,o=>Zf(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=No(r),i=t.length>1;if(n&&i){let o=xt(t);return e.concat(Zf(o))}else return e}var Dc=class extends vr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function tw(t,e){let r=new Dc;t.accept(r);let n=r.alternations;return er(n,o=>{let s=mi(o.definition);return er(s,(a,c)=>{let l=Xf([a],[],yi,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:c}),type:Mt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:c+1}]:[]})})}function rw(t,e,r){let n=new Dc;t.accept(n);let i=n.alternations;return i=Yi(i,s=>s.ignoreAmbiguities===!0),er(i,s=>{let a=s.idx,c=s.maxLookahead||e,l=fa(a,t,c,s),u=vU(l,s,t,r),f=xU(l,s,t,r);return u.concat(f)})}var ay=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function TU(t,e){let r=new Dc;t.accept(r);let n=r.alternations;return er(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Mt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function nw(t,e,r){let n=[];return G(t,i=>{let o=new ay;i.accept(o);let s=o.allProductions;G(s,a=>{let c=Oc(a),l=a.maxLookahead||e,u=a.idx,m=da(u,i,c,l)[0];if(se(vt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Mt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function vU(t,e,r,n){let i=[],o=ut(t,(a,c,l)=>(e.definition[l].ignoreAmbiguities===!0||G(c,u=>{let f=[l];G(t,(m,T)=>{l!==T&&Qf(m,u)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Qf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let c=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Mt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function xU(t,e,r,n){let i=ut(t,(s,a,c)=>{let l=L(a,u=>({idx:c,path:u}));return s.concat(l)},[]);return Gn(er(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,l=s.path,u=Gt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&XA(m.path,l));return L(u,m=>{let T=[m.idx+1,c+1],S=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Mt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:S,alternatives:T}})}))}function RU(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(tt(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Mt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function iw(t){let e=ra(t,{errMsgProvider:GA}),r={};return G(t.rules,n=>{r[n.name]=n}),jA(r,e.errMsgProvider)}function ow(t){return t=ra(t,{errMsgProvider:xn}),QA(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var sw="MismatchedTokenException",aw="NoViableAltException",cw="EarlyExitException",lw="NotAllInputParsedException",uw=[sw,aw,cw,lw];Object.freeze(uw);function Ji(t){return tt(uw,t.name)}var pa=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Oo=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=sw}},Lc=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=aw}},Mc=class extends pa{constructor(e,r){super(e,r),this.name=lw}},Fc=class extends pa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=cw}};var ly={},fy="InRuleRecoveryException",uy=class extends Error{constructor(e){super(e),this.name=fy}},ed=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=B(e,"recoveryEnabled")?e.recoveryEnabled:xr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=bU)}getTokenToInsert(e){let r=Po(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,l=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),S=new Oo(T,l,this.LA(0));S.resyncedTokens=mi(a),this.SAVE_ERROR(S)};for(;!c;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(u,o)?c=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new uy("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Hn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return tt(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Hn(e,o=>_c(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return ly;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?ly:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return vt(e)}getFollowSetFromFollowKey(e){if(e===ly)return[vn];let r=e.ruleName+e.idxInCallingRule+Ff+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,vn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return mi(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=We(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function bU(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];c=new o(T,i).startWalking(),this.firstAfterRepMap[a]=c}let l=c.token,u=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=vn,u=1),!(l===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,u,s)&&this.tryInRepetitionRecovery(t,e,r,l)}function td(t,e,r){return r|e|t}var qre=32-8;var xi=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:xr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return er(e,r=>cy(r,r,xn))}validateEmptyOrAlternatives(e){return er(e,r=>tw(r,xn))}validateAmbiguousAlternationAlternatives(e,r){return er(e,n=>rw(n,r,xn))}validateSomeNonEmptyLookaheadPath(e,r){return nw(e,r,xn)}buildLookaheadForAlternation(e){return KA(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,WA)}buildLookaheadForOptional(e){return BA(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Oc(e.prodType),zA)}};var nd=class{initLooksAhead(e){this.dynamicTokensEnabled=B(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:xr.dynamicTokensEnabled,this.maxLookahead=B(e,"maxLookahead")?e.maxLookahead:xr.maxLookahead,this.lookaheadStrategy=B(e,"lookaheadStrategy")?e.lookaheadStrategy:new xi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=SU(r);G(n,l=>{let u=l.idx===0?"":l.idx;this.TRACE_INIT(`${$r(l)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:r,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=td(this.fullRuleNameToShort[r.name],256,l.idx);this.setLaFuncCache(m,f)})}),G(i,l=>{this.computeLookaheadFunc(r,l.idx,768,"Repetition",l.maxLookahead,$r(l))}),G(o,l=>{this.computeLookaheadFunc(r,l.idx,512,"Option",l.maxLookahead,$r(l))}),G(s,l=>{this.computeLookaheadFunc(r,l.idx,1024,"RepetitionMandatory",l.maxLookahead,$r(l))}),G(a,l=>{this.computeLookaheadFunc(r,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,$r(l))}),G(c,l=>{this.computeLookaheadFunc(r,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,$r(l))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=td(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return td(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},dy=class extends vr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},rd=new dy;function SU(t){rd.reset(),t.accept(rd);let e=rd.dslMethods;return rd.reset(),e}function hy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function yy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function fw(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function dw(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var AU="name";function gy(t,e){Object.defineProperty(t,AU,{enumerable:!1,configurable:!0,writable:!1,value:e})}function wU(t,e){let r=Ke(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let c=0;c<a;c++){let l=s[c];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function pw(t,e){let r=function(){};gy(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!ur(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=kU(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function mw(t,e,r){let n=function(){};gy(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=wU}),n.prototype=i,n.prototype.constructor=n,n}var Ty;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Ty||(Ty={}));function kU(t,e){return CU(t,e)}function CU(t,e){let r=Gt(e,i=>gr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:Ty.MISSING_METHOD,methodName:i}));return Gn(n)}var ad=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=B(e,"nodeLocationTracking")?e.nodeLocationTracking:xr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=lt,this.cstFinallyStateUpdate=lt,this.cstPostTerminal=lt,this.cstPostNonTerminal=lt,this.cstPostRule=lt;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=yy,this.setNodeLocationFromNode=yy,this.cstPostRule=lt,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=lt,this.setNodeLocationFromNode=lt,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=hy,this.setNodeLocationFromNode=hy,this.cstPostRule=lt,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=lt,this.setNodeLocationFromNode=lt,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=lt,this.setNodeLocationFromNode=lt,this.cstPostRule=lt,this.setInitialNodeLocation=lt;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];fw(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];dw(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(ur(this.baseCstVisitorConstructor)){let e=pw(this.className,Ke(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(ur(this.baseCstVisitorWithDefaultsConstructor)){let e=mw(this.className,Ke(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var cd=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ma}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?ma:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var ld=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=ha){if(tt(this.definedRulesNames,e)){let s={message:xn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Mt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=ha){let i=ew(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Ji(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Mf(Oe(this.gastProductionsCache))}};var ud=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=la,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},B(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=ut(e,(o,s)=>(o[s.name]=s,o),{});else if(B(e,"modes")&&lr(vt(Oe(e.modes)),IA)){let o=vt(Oe(e.modes)),s=na(o);this.tokensMap=ut(s,(a,c)=>(a[c.name]=c,a),{})}else if(ct(e))this.tokensMap=We(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=vn;let n=B(e,"modes")?vt(Oe(e.modes)):Oe(e),i=lr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?la:yi,gi(Oe(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=B(n,"resyncEnabled")?n.resyncEnabled:ha.resyncEnabled,o=B(n,"recoveryValueFunc")?n.recoveryValueFunc:ha.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Ji(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,zf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Pc],a,1536,e,Pc)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Wf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Ic],a,1280,e,Ic)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Mc(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Ji(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Oo(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===fy?n:o}}else throw n}saveRecogState(){let e=this.errors,r=We(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),vn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var fd=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=B(e,"errorMessageProvider")?e.errorMessageProvider:xr.errorMessageProvider}SAVE_ERROR(e){if(Ji(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:We(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return We(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=da(e,o,r,this.maxLookahead)[0],c=[];for(let u=1;u<=this.maxLookahead;u++)c.push(this.LA(u));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Fc(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=fa(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Lc(c,this.LA(1),a))}};var dd=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(ur(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Xf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=jt(e.ruleStack),i=this.getGAstProductions()[r];return new Bf(i,e).startWalking()}};var hd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(hd);var hw=!0,yw=Math.pow(2,8)-1,Tw=Kf({name:"RECORDING_PHASE_TOKEN",pattern:yt.NA});gi([Tw]);var vw=Po(Tw,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(vw);var $U={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},pd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return ma}topLevelRuleRecord(e,r){try{let n=new Tr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return qc.call(this,Ee,e,r)}atLeastOneInternalRecord(e,r){qc.call(this,Ve,r,e)}atLeastOneSepFirstInternalRecord(e,r){qc.call(this,Xe,r,e,hw)}manyInternalRecord(e,r){qc.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){qc.call(this,Fe,r,e,hw)}orInternalRecord(e,r){return NU.call(this,e,r)}subruleInternalRecord(e,r,n){if(md(r),!e||B(e,"ruleName")===!1){let a=new Error(`<SUBRULE${gw(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=jn(this.recordingProdStack),o=e.ruleName,s=new Ce({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?$U:hd}consumeInternalRecord(e,r,n){if(md(r),!Zh(e)){let s=new Error(`<CONSUME${gw(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=jn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),vw}};function qc(t,e,r,n=!1){md(r);let i=jn(this.recordingProdStack),o=gr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),B(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),hd}function NU(t,e){md(e);let r=jn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Ue({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});B(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=wc(i,a=>gr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let c=new ze({definition:[]});o.definition.push(c),B(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:B(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),hd}function gw(t){return t===0?"":`${t}`}function md(t){if(t<0||t>yw){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${yw+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var yd=class{initPerformanceTracer(e){if(B(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=xr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=Cc(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function xw(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var ma=Po(vn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ma);var xr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:vi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ha=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Mt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Mt||(Mt={}));function gd(t=void 0){return function(){return t}}var Gc=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Ec(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=iw({rules:Oe(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=ow({rules:Oe(this.gastProductionsCache),tokenTypes:Oe(this.tokensMap),errMsgProvider:xn,grammarName:r}),o=JA({lookaheadStrategy:this.lookaheadStrategy,rules:Oe(this.gastProductionsCache),tokenTypes:Oe(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=dA(Oe(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Oe(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Oe(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),B(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=B(r,"skipValidations")?r.skipValidations:xr.skipValidations}};Gc.DEFER_DEFINITION_ERRORS_HANDLING=!1;xw(Gc,[ed,nd,ad,cd,ud,ld,fd,dd,pd,yd]);var jc=class extends Gc{constructor(e,r=xr){let n=We(r);n.outputCst=!1,super(e,n)}};function Do(t,e,r){return`${t.name}_${e}_${r}`}var Qi=1,IU=2,Rw=4,bw=5;var Ta=7,PU=8,OU=9,DU=10,LU=11,Sw=12,Hc=class{constructor(e){this.target=e}isEpsilon(){return!1}},ya=class extends Hc{constructor(e,r){super(e),this.tokenType=r}},Kc=class extends Hc{constructor(e){super(e)}isEpsilon(){return!0}},ga=class extends Hc{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function Aw(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};MU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Lo(e,i,i);o!==void 0&&VU(e,i,o)}return e}function MU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Ht(t,i,void 0,{type:IU}),s=Ht(t,i,void 0,{type:Ta});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function ww(t,e,r){return r instanceof ae?xy(t,e,r.terminalType,r):r instanceof Ce?zU(t,e,r):r instanceof Ue?jU(t,e,r):r instanceof Ee?HU(t,e,r):r instanceof pe?FU(t,e,r):r instanceof Fe?UU(t,e,r):r instanceof Ve?qU(t,e,r):r instanceof Xe?GU(t,e,r):Lo(t,e,r)}function FU(t,e,r){let n=Ht(t,e,r,{type:bw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return Cw(t,e,r,i)}function UU(t,e,r){let n=Ht(t,e,r,{type:bw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r)),o=xy(t,e,r.separator,r);return Cw(t,e,r,i,o)}function qU(t,e,r){let n=Ht(t,e,r,{type:Rw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return kw(t,e,r,i)}function GU(t,e,r){let n=Ht(t,e,r,{type:Rw});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r)),o=xy(t,e,r.separator,r);return kw(t,e,r,i,o)}function jU(t,e,r){let n=Ht(t,e,r,{type:Qi});Zi(t,n);let i=L(r.definition,s=>ww(t,e,s));return va(t,e,n,r,...i)}function HU(t,e,r){let n=Ht(t,e,r,{type:Qi});Zi(t,n);let i=va(t,e,n,r,Lo(t,e,r));return KU(t,e,r,i)}function Lo(t,e,r){let n=Gt(L(r.definition,i=>ww(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:WU(t,n)}function kw(t,e,r,n,i){let o=n.left,s=n.right,a=Ht(t,e,r,{type:LU});Zi(t,a);let c=Ht(t,e,r,{type:Sw});return o.loopback=a,c.loopback=a,t.decisionMap[Do(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,It(s,a),i===void 0?(It(a,o),It(a,c)):(It(a,c),It(a,i.left),It(i.right,o)),{left:o,right:c}}function Cw(t,e,r,n,i){let o=n.left,s=n.right,a=Ht(t,e,r,{type:DU});Zi(t,a);let c=Ht(t,e,r,{type:Sw}),l=Ht(t,e,r,{type:OU});return a.loopback=l,c.loopback=l,It(a,o),It(a,c),It(s,l),i!==void 0?(It(l,c),It(l,i.left),It(i.right,o)):It(l,a),t.decisionMap[Do(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:c}}function KU(t,e,r,n){let i=n.left,o=n.right;return It(i,o),t.decisionMap[Do(e,"Option",r.idx)]=i,n}function Zi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function va(t,e,r,n,...i){let o=Ht(t,e,n,{type:PU,start:r});r.end=o;for(let a of i)a!==void 0?(It(r,a.left),It(a.right,o)):It(r,o);let s={left:r,right:o};return t.decisionMap[Do(e,BU(n),n.idx)]=r,s}function BU(t){if(t instanceof Ue)return"Alternation";if(t instanceof Ee)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Fe)return"RepetitionWithSeparator";if(t instanceof Ve)return"RepetitionMandatory";if(t instanceof Xe)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function WU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof ga,l=a,u=e[o+1].left;s.left.type===Qi&&s.right.type===Qi&&a!==void 0&&(c&&l.followState===s.right||a.target===s.right)?(c?l.followState=u:a.target=u,XU(t,s.right)):It(s.right,u)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function xy(t,e,r,n){let i=Ht(t,e,n,{type:Qi}),o=Ht(t,e,n,{type:Qi});return Ry(i,new ya(o,r)),{left:i,right:o}}function zU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Ht(t,e,r,{type:Qi}),s=Ht(t,e,r,{type:Qi}),a=new ga(i,n,s);return Ry(o,a),{left:o,right:s}}function VU(t,e,r){let n=t.ruleToStartState.get(e);It(n,r.left);let i=t.ruleToStopState.get(e);return It(r.right,i),{left:n,right:i}}function It(t,e){let r=new Kc(e);Ry(t,r)}function Ht(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function Ry(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function XU(t,e){t.states.splice(t.states.indexOf(e),1)}var Bc={},xa=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=by(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function by(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function YU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var Td=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},Ew=new Td,Wc=class extends xi{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=Aw(e.rules),this.dfas=JU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Do(n,"Alternation",r),u=this.atn.decisionMap[c].decision,f=L(Jf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if($w(f,!1)&&!o){let m=ut(f,(T,S,w)=>(G(S,N=>{N&&(T[N.tokenTypeIdx]=w,G(N.categoryMatches,k=>{T[k]=w}))}),T),{});return i?function(T){var S;let w=this.LA(1),N=m[w.tokenTypeIdx];if(T!==void 0&&N!==void 0){let k=(S=T[N])===null||S===void 0?void 0:S.GATE;if(k!==void 0&&k.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new Td,S=m===void 0?0:m.length;for(let N=0;N<S;N++){let k=m?.[N].GATE;T.set(N,k===void 0||k.call(this))}let w=Sy.call(this,s,u,T,a);return typeof w=="number"?w:void 0}:function(){let m=Sy.call(this,s,u,Ew,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Do(n,i,r),u=this.atn.decisionMap[c].decision,f=L(Jf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if($w(f)&&f[0][0]&&!o){let m=f[0],T=vt(m);if(T.length===1&&se(T[0].categoryMatches)){let w=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===w}}else{let S=ut(T,(w,N)=>(N!==void 0&&(w[N.tokenTypeIdx]=!0,G(N.categoryMatches,k=>{w[k]=!0})),w),{});return function(){let w=this.LA(1);return S[w.tokenTypeIdx]===!0}}}return function(){let m=Sy.call(this,s,u,Ew,a);return typeof m=="object"?!1:m===0}}};function $w(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function JU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=YU(t.decisionStates[n],n);return r}function Sy(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=cq(i.atnStartState);o=Iw(i,_w(a)),i.start=o}return QU.apply(this,[i,o,r,n])}function QU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=iq(i,a);if(c===void 0&&(c=ZU.apply(this,[t,i,a,o,r,n])),c===Bc)return nq(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function ZU(t,e,r,n,i,o){let s=oq(e.configs,r,i);if(s.size===0)return Nw(t,e,r,Bc),Bc;let a=_w(s),c=aq(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(dq(s)){let l=nA(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,eq.apply(this,[t,n,s.alts,o])}return a=Nw(t,e,r,a),a}function eq(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,c=tq({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(c)}function tq(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${rq(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function rq(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof Ee)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function nq(t,e,r){let n=er(e.configs.elements,o=>o.state.transitions),i=uA(n.filter(o=>o instanceof ya).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function iq(t,e){return t.edges[e.tokenTypeIdx]}function oq(t,e,r){let n=new xa,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===Ta){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let l=s.state.transitions[c],u=sq(l,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new xa;for(let s of n.elements)vd(s,o)}if(i.length>0&&!uq(o))for(let s of i)o.add(s);return o}function sq(t,e){if(t instanceof ya&&_c(e,t.tokenType))return t.target}function aq(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function _w(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function Nw(t,e,r,n){return n=Iw(t,n),e.edges[r.tokenTypeIdx]=n,n}function Iw(t,e){if(e===Bc)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function cq(t){let e=new xa,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};vd(o,e)}return e}function vd(t,e){let r=t.state;if(r.type===Ta){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};vd(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=lq(t,o);s!==void 0&&vd(s,e)}}function lq(t,e){if(e instanceof Kc)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ga){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function uq(t){for(let e of t.elements)if(e.state.type===Ta)return!0;return!1}function fq(t){for(let e of t.elements)if(e.state.type!==Ta)return!1;return!0}function dq(t){if(fq(t))return!0;let e=pq(t.elements);return mq(e)&&!hq(e)}function pq(t){let e=new Map;for(let r of t){let n=by(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function mq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function hq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var Ay=de(co(),1);var xd=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new ky(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new Sd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new bd(e.startOffset,e.image.length,Ya(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new bd(r.startOffset,r.image.length,Ya(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if($n(s)&&n>a&&i<c){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},Rd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},bd=class extends Rd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},Sd=class extends Rd{constructor(){super(...arguments),this.content=new wy(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:Ay.Position.create(0,0),end:Ay.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},wy=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},ky=class extends Sd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Ey=Symbol("Datatype");function Cy(t){return t.$type===Ey}var Pw="\u200B",Ow=t=>t.endsWith(Pw)?t:t+Pw,Ad=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Ny(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},wd=class extends Ad{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new xd,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Ur(e)?Ey:hn(e),i=this.wrapper.DEFINE_RULE(Ow(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===Ey&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let l=mt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(Cy(c)){let l=i.image;mt(n)||(l=this.converter.convert(l,o).toString()),c.value+=l}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Cy(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let l=c;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return Kv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),Cy(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Pe(e,be);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Xt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},$y=class{buildMismatchTokenMessage(e){return vi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return vi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return vi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return vi.buildEarlyExitMessage(e)}},zc=class extends $y{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},kd=class extends Ad{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(Ow(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},yq={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new zc},Ny=class extends jc{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},yq),{lookaheadStrategy:n?new xi({maxLookahead:r.maxLookahead}):new Wc}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Vc=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function Cd(t){throw new Error("Error! The input value was not handled.")}function $d(t,e,r){return gq({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function gq(t,e){let r=vs(e,!1),n=ie(e.rules).filter(K).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Mo(o,i.definition)))}}function Mo(t,e,r=!1){let n;if(mt(e))n=Aq(t,e);else if(_e(e))n=Tq(t,e);else if(be(e))n=Mo(t,e.terminal);else if(Xt(e))n=Dw(t,e);else if(Ie(e))n=vq(t,e);else if(Or(e))n=Rq(t,e);else if(Dr(e))n=bq(t,e);else if(Ut(e))n=Sq(t,e);else throw new Vc(e.$cstNode,`Unexpected element type: ${e.$type}`);return Lw(t,r?void 0:Ed(e),n,e.cardinality)}function Tq(t,e){let r=hn(e);return()=>t.parser.action(r,e)}function vq(t,e){let r=e.rule.ref;if(K(r)){let n=t.subrule++,i=e.arguments.length>0?xq(r,e.arguments):()=>({});return o=>t.parser.subrule(n,Mw(t,r),e,i(o))}else if(we(r)){let n=t.consume++,i=_y(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)Cd(r);else throw new Vc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function xq(t,e){let r=e.map(n=>Ri(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function Ri(t){if(lv(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)||r(n)}else if(av(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)&&r(n)}else if(mv(t)){let e=Ri(t.value);return r=>!e(r)}else if(cs(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(dv(t)){let e=!!t.true;return()=>e}Cd(t)}function Rq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Mo(t,i,!0)},s=Ed(i);s&&(o.GATE=Ri(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function bq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);let r=[];for(let a of e.elements){let c={ALT:Mo(t,a,!0)},l=Ed(a);l&&(c.GATE=Ri(l)),r.push(c)}let n=t.or++,i=(a,c)=>{let l=c.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>t.parser.alternatives(n,r.map((c,l)=>{let u={ALT:()=>!0},f=t.parser;u.ALT=()=>{if(c.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let S=f.unorderedGroups.get(T);typeof S?.[l]>"u"&&(S[l]=!0)}};let m=c.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[l]},u})),s=Lw(t,Ed(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function Sq(t,e){let r=e.elements.map(n=>Mo(t,n));return n=>r.forEach(i=>i(n))}function Ed(t){if(Ut(t))return t.guardCondition}function Dw(t,e,r=e.terminal){if(r)if(Ie(r)&&K(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,Mw(t,r.rule.ref),e,i)}else if(Ie(r)&&we(r.rule.ref)){let n=t.consume++,i=_y(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(mt(r)){let n=t.consume++,i=_y(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=mc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+hn(e.type.ref));return Dw(t,e,i)}}function Aq(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function Lw(t,e,r,n){let i=e&&Ri(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:gd(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:gd(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else Cd(n)}function Mw(t,e){let r=wq(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function wq(t,e){if(K(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!K(n);)(Ut(n)||Or(n)||Dr(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function _y(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function Fw(t){let e=t.Grammar,r=t.parser.Lexer,n=new kd(t);return $d(e,n,r.definition),n.finalize(),n}function Uw(t){let e=kq(t);return e.finalize(),e}function kq(t){let e=t.Grammar,r=t.parser.Lexer,n=new wd(t);return $d(e,n,r.definition)}var Nd=class{buildTokens(e,r){let n=ie(vs(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&uh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(we).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Jr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=uh(r)?yt.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(K).flatMap(i=>Ze(i).filter(mt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(dx(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&px("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var _d=class{convert(e,r){let n=r.grammarSource;if(Xt(n)&&(n=_u(n)),Ie(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return Nq(r);case"STRING":return Cq(r);case"ID":return $q(r)}switch((i=Ao(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Pq(r);case"boolean":return Oq(r);case"bigint":return _q(r);case"date":return Iq(r);default:return r}}};function Cq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=Eq(i)}else e+=n}return e}function Eq(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function $q(t){return t.charAt(0)==="^"?t.substring(1):t}function Nq(t){return parseInt(t)}function _q(t){return BigInt(t)}function Iq(t){return new Date(t)}function Pq(t){return Number(t)}function Oq(t){return t.toLowerCase()==="true"}var qw=de(Ae(),1);var Id=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=qw.CancellationToken.None){for(let n of ni(e.parseResult.value))await et(r),ou(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(ns(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if($t(this._ref))return this._ref;if(WT(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:r});if(c.error&&ne(e).state<He.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return $t(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return ns(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(ns(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<He.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function jw(t){return typeof t.$comment=="string"}function Gw(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Pd=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,l;if(!this.ignoreProperties.has(e))if(ei(r)){let u=r.ref,f=n?r.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(c=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let u;if(o&&$t(r)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&$t(r)&&(u??(u=Object.assign({},r)),u.$sourceText=(l=r.$cstNode)===null||l===void 0?void 0:l.text),s&&$t(r)&&(u??(u=Object.assign({},r)),u.$comment=this.commentProvider.getComment(r)),u??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Ii(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];Gw(u)?c[l]=this.reviveReference(e,a,r,u):$t(u)&&this.linkNode(u,r,e,a,l)}else Gw(c)?e[a]=this.reviveReference(e,a,r,c):$t(c)&&this.linkNode(c,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Od=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=xe.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var Hw=de(Ae(),1);var Dd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=or((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:or(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Ld=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=Hw.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ni(i))await et(r),ou(o).filter(s=>!ns(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:or(n),local:xe.equals(r.documentUri,i)}}};var Md=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),l=i[a];return l?.[c]}return i[o]},e)}};var Kw=de(Ct(),1),Fd=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(Kw.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var Ra=de(Ae(),1);var Ud=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Me,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Ra.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===He.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=He.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let c=this.buildState.get(a),l=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=r.validation.categories)!==null&&o!==void 0?o:ys.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:c.result}),s.state=He.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=Ra.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,He.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await et(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<He.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),Ra.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,He.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,He.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,He.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,He.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,He.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,He.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await et(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Ra.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await et(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:ys.all;l.result.validationChecks?l.result.validationChecks.push(...u):l.result.validationChecks=[...u]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Iy=de(Ae(),1);var qd=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new Au,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{xe.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Iy.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Iy.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var Bw=de(Ae(),1);var Gd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=Bw.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await et(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Qt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=xe.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=xe.extname(r.uri);return n.includes(o)}return!1}};var jd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=Ww(r)?Object.values(r):r;this.chevrotainLexer=new yt(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(Ww(e))return e;let r=zw(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function Dq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function zw(t){return t&&"modes"in t&&"defaultMode"in t}function Ww(t){return!Dq(t)&&!zw(t)}var Se=de(Ae(),1);function Yw(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Se.Position.create(0,0));let o=Qw(t),s=Dy(n),a=Mq({lines:o,position:i,options:s});return jq({index:0,tokens:a,position:i})}function Jw(t,e){let r=Dy(e),n=Qw(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function Qw(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(ec)}var Vw=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,Lq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Mq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let c=a===0,l=a===t.lines.length-1,u=t.lines[a],f=0;if(c&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(u);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(u);T&&(f=T.index+T[0].length)}if(l){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(u);T&&(u=u.substring(0,T.index))}if(u=u.substring(0,Gq(u)),Oy(u,0)>=u.length){if(i.length>0){let T=Se.Position.create(o,s);i.push({type:"break",content:"",range:Se.Range.create(T,T)})}}else{Vw.lastIndex=f;let T=Vw.exec(u);if(T){let S=T[0],w=T[1],N=Se.Position.create(o,s+f),k=Se.Position.create(o,s+f+S.length);i.push({type:"tag",content:w,range:Se.Range.create(N,k)}),f+=S.length,f=Oy(u,f)}if(f<u.length){let S=u.substring(f),w=Array.from(S.matchAll(Lq));i.push(...Fq(w,S,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Fq(t,e,r,n){let i=[];if(t.length===0){let o=Se.Position.create(r,n),s=Se.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Se.Range.create(o,s)})}else{let o=0;for(let a of t){let c=a.index,l=e.substring(o,c);l.length>0&&i.push({type:"text",content:e.substring(o,c),range:Se.Range.create(Se.Position.create(r,o+n),Se.Position.create(r,c+n))});let u=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:Se.Range.create(Se.Position.create(r,o+u+n),Se.Position.create(r,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:Se.Range.create(Se.Position.create(r,o+u+n),Se.Position.create(r,o+u+m.length+n))})}else i.push({type:"text",content:"",range:Se.Range.create(Se.Position.create(r,o+u+n),Se.Position.create(r,o+u+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:Se.Range.create(Se.Position.create(r,o+n),Se.Position.create(r,o+n+s.length))})}return i}var Uq=/\S/,qq=/\s*$/;function Oy(t,e){let r=t.substring(e).match(Uq);return r?e+r.index:t.length}function Gq(t){let e=t.match(qq);if(e&&typeof e.index=="number")return e.index}function jq(t){var e,r,n,i;let o=Se.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Hd([],Se.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let l=Hq(t,s[s.length-1]);l&&s.push(l)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Hd(s,Se.Range.create(a,c))}function Hq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return ek(t,!1);if(r.type==="text"||r.type==="inline-tag")return Zw(t);Kq(r,e),t.index++}function Kq(t,e){if(e){let r=new Kd("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function Zw(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Bq(t)),n=e,e=t.tokens[t.index];return new Yc(i,Se.Range.create(r.range.start,n.range.end))}function Bq(t){return t.tokens[t.index].type==="inline-tag"?ek(t,!0):tk(t)}function ek(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=tk(t);return new Xc(n,new Yc([o],o.range),e,Se.Range.create(r.range.start,o.range.end))}else{let o=Zw(t);return new Xc(n,o,e,Se.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Xc(n,new Yc([],o),e,o)}}function tk(t){let e=t.tokens[t.index++];return new Kd(e.content,e.range)}function Dy(t){if(!t)return Dy({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:Py(e,!0),end:Py(r,!1),line:Py(n,!0)}}function Py(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?si(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Hd=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=Xw(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=Xw(r)+i}return r.trim()}},Xc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=Wq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Wq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=Oy(e,o);s=e.substring(c),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:zq(e,s)}}function zq(t,e){try{return Qt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Yc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Kd=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function Xw(t){return t.endsWith(`
`)?`
`:`

`}var Bd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&Jw(r))return Yw(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Wd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return jw(e)?e.$comment:(r=QT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function xc(t){return{documentation:{CommentProvider:e=>new Wd(e),DocumentationProvider:e=>new Bd(e)},parser:{GrammarConfig:e=>yR(e),LangiumParser:e=>Uw(e),CompletionParser:e=>Fw(e),ValueConverter:()=>new _d,TokenBuilder:()=>new Nd,Lexer:e=>new jd(e),ParserErrorMessageProvider:()=>new zc},lsp:{CompletionProvider:e=>new Es(e),DocumentSymbolProvider:e=>new Ku(e),HoverProvider:e=>new zu(e),FoldingRangeProvider:e=>new Ns(e),ReferencesProvider:e=>new Zu(e),DefinitionProvider:e=>new Ps(e),DocumentHighlightProvider:e=>new Hu(e),RenameProvider:e=>new ef(e)},workspace:{AstNodeLocator:()=>new Md,AstNodeDescriptionProvider:e=>new Dd(e),ReferenceDescriptionProvider:e=>new Ld(e)},references:{Linker:e=>new Id(e),NameProvider:()=>new ms,ScopeProvider:e=>new ks(e),ScopeComputation:e=>new ws(e),References:e=>new _s(e)},serializer:{JsonSerializer:e=>new Pd(e)},validation:{DocumentValidator:e=>new Eu(e),ValidationRegistry:e=>new vu(e)},shared:()=>t.shared}}function Rc(t){return{ServiceRegistry:()=>new Od,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Yu(e),WorkspaceSymbolProvider:e=>new tf(e),NodeKindProvider:()=>new Ju,FuzzyMatcher:()=>new Wu},workspace:{LangiumDocuments:e=>new Xu(e),LangiumDocumentFactory:e=>new Vu(e),DocumentBuilder:e=>new Ud(e),TextDocuments:()=>new rk.TextDocuments(rs),IndexManager:e=>new qd(e),WorkspaceManager:e=>new Gd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new Tu,ConfigurationProvider:e=>new Fd(e)}}}var wa=de(ik(),1);var Vq="ArithmeticOperator";var Xq="BooleanOperator";var Yq="Expression";var Jq="Fonction";var Qq="Statement";var Zq="Add";var eG="Divise";var tG="Multiply";var rG="Sub";var nG="And";var iG="EqualTo";var oG="LowerOrEqualTo";var sG="LowerThan";var aG="Not";var cG="Or";var lG="UpperOrEqualTo";var uG="UpperThan";var fG="ArithmeticExpression";var dG="BooleanExpression";var ok="UnaryArithmeticExpression";var pG="UnaryBooleanExpression";var mG="CallFunction";var sk="ControlRobot";var Ly="Entity";var hG="If";var yG="Loop";var gG="ReturnStatement";var TG="SetSpeed";var vG="VariableAssignation";var xG="CallEntity";var RG="CallFunctionExpr";var ak="GetSensor";var bG="Value";var ck="Movement";var lk="Rotate";var SG="Parameter";var uk="VariableStatement";var AG="GetDistance";var wG="GetSpeed";var kG="GetTimestamp";var CG="Backward";var EG="Forward";var $G="Left";var NG="Right";var _G="Clock";var IG="ClockLeft";var Jc=class extends po{getAllTypes(){return["Add","And","ArithmeticExpression","ArithmeticOperator","Backward","BooleanExpression","BooleanOperator","CallEntity","CallFunction","CallFunctionExpr","Clock","ClockLeft","ControlRobot","Divise","Entity","EqualTo","Expression","Fonction","Forward","GetDistance","GetSensor","GetSpeed","GetTimestamp","If","Left","Loop","LowerOrEqualTo","LowerThan","Movement","Multiply","Not","Or","Parameter","Program","ReturnStatement","ReturnType","Right","Rotate","SetSpeed","Statement","Sub","UnaryArithmeticExpression","UnaryBooleanExpression","UpperOrEqualTo","UpperThan","Value","VariableAssignation","VariableStatement"]}computeIsSubtype(e,r){switch(e){case Zq:case eG:case tG:case rG:return this.isSubtype(Vq,r);case nG:case iG:case oG:case sG:case aG:case cG:case lG:case uG:return this.isSubtype(Xq,r);case fG:case dG:case ok:case pG:return this.isSubtype(Yq,r);case CG:case EG:case $G:case NG:return this.isSubtype(ck,r);case xG:case RG:case ak:case bG:return this.isSubtype(ok,r);case mG:case sk:case Ly:case hG:case yG:case gG:case TG:case vG:return this.isSubtype(Qq,r);case _G:case IG:return this.isSubtype(lk,r);case AG:case wG:case kG:return this.isSubtype(ak,r);case ck:case lk:return this.isSubtype(sk,r);case SG:case uk:return this.isSubtype(Ly,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"CallEntity:entity":return Ly;case"CallFunction:fonction":case"CallFunctionExpr:fonction":return Jq;case"VariableAssignation:variable":return uk;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Fonction":return{name:"Fonction",mandatory:[{name:"body",type:"array"},{name:"parameter",type:"array"}]};case"Program":return{name:"Program",mandatory:[{name:"fonction",type:"array"}]};case"ArithmeticExpression":return{name:"ArithmeticExpression",mandatory:[{name:"operator",type:"array"},{name:"rightOperand",type:"array"}]};case"UnaryBooleanExpression":return{name:"UnaryBooleanExpression",mandatory:[{name:"value",type:"boolean"}]};case"CallFunction":return{name:"CallFunction",mandatory:[{name:"args",type:"array"}]};case"If":return{name:"If",mandatory:[{name:"elseStatement",type:"array"},{name:"thenStatement",type:"array"}]};case"Loop":return{name:"Loop",mandatory:[{name:"body",type:"array"}]};case"CallFunctionExpr":return{name:"CallFunctionExpr",mandatory:[{name:"args",type:"array"}]};default:return{name:e,mandatory:[]}}}},Wce=new Jc;var zd,fk=()=>zd??(zd=gu(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "MyRobot",
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Block",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "body",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BlockIf",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "thenStatement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BlockElse",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "elseStatement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Program",
      "entry": true,
      "returnType": {
        "$ref": "#/interfaces@0"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "fonction",
        "operator": "+=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@4"
          },
          "arguments": []
        },
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Fonction",
      "returnType": {
        "$ref": "#/interfaces@1"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "let"
          },
          {
            "$type": "Assignment",
            "feature": "returnType",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@20"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "parameter",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@20"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@0"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnType",
      "returnType": {
        "$ref": "#/interfaces@2"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "returnType",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@56"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "void"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Statement",
      "returnType": {
        "$ref": "#/interfaces@3"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnStatement",
      "returnType": {
        "$ref": "#/interfaces@4"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "return"
          },
          {
            "$type": "Assignment",
            "feature": "returnValue",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "If",
      "returnType": {
        "$ref": "#/interfaces@5"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "if"
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@41"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "then"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@1"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "else"
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@2"
                },
                "arguments": []
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Loop",
      "returnType": {
        "$ref": "#/interfaces@6"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "loop"
          },
          {
            "$type": "Assignment",
            "feature": "condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@41"
              },
              "arguments": []
            }
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@0"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ControlRobot",
      "returnType": {
        "$ref": "#/interfaces@7"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Movement",
      "returnType": {
        "$ref": "#/interfaces@8"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Backward",
      "returnType": {
        "$ref": "#/interfaces@9"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Backward"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Forward",
      "returnType": {
        "$ref": "#/interfaces@10"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Forward"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Left",
      "returnType": {
        "$ref": "#/interfaces@11"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Left"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Right",
      "returnType": {
        "$ref": "#/interfaces@12"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Right"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Rotate",
      "returnType": {
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Clock",
      "returnType": {
        "$ref": "#/interfaces@14"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Clock"
          },
          {
            "$type": "Assignment",
            "feature": "angle",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ClockLeft",
      "returnType": {
        "$ref": "#/interfaces@15"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "ClockLeft"
          },
          {
            "$type": "Assignment",
            "feature": "angle",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Entity",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "returnType": {
        "$ref": "#/interfaces@17"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@56"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableStatement",
      "returnType": {
        "$ref": "#/interfaces@18"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "var"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@56"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@52"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableAssignation",
      "returnType": {
        "$ref": "#/interfaces@19"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "variable",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/interfaces@18"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@51"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SetSpeed",
      "returnType": {
        "$ref": "#/interfaces@20"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "setSpeed"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "in",
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@52"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CallFunction",
      "returnType": {
        "$ref": "#/interfaces@21"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "fonction",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/interfaces@1"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@51"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "args",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@25"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "args",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@25"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expression",
      "returnType": {
        "$ref": "#/interfaces@22"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnaryBooleanExpression",
      "returnType": {
        "$ref": "#/interfaces@23"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@23"
                }
              },
              {
                "$type": "Keyword",
                "value": "True"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "False"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnaryArithmeticExpression",
      "returnType": {
        "$ref": "#/interfaces@24"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CallFunctionExpr",
      "returnType": {
        "$ref": "#/interfaces@25"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "fonction",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/interfaces@1"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@51"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "args",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@25"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "args",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@25"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CallEntity",
      "returnType": {
        "$ref": "#/interfaces@26"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "entity",
        "operator": "=",
        "terminal": {
          "$type": "CrossReference",
          "type": {
            "$ref": "#/interfaces@16"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          "deprecatedSyntax": false
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GetSensor",
      "returnType": {
        "$ref": "#/interfaces@27"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GetDistance",
      "returnType": {
        "$ref": "#/interfaces@28"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@28"
            }
          },
          {
            "$type": "Keyword",
            "value": "getDistance()"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GetSpeed",
      "returnType": {
        "$ref": "#/interfaces@29"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@29"
            }
          },
          {
            "$type": "Keyword",
            "value": "getSpeed()"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GetTimestamp",
      "returnType": {
        "$ref": "#/interfaces@30"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@30"
            }
          },
          {
            "$type": "Keyword",
            "value": "getTimestamp()"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Value",
      "returnType": {
        "$ref": "#/interfaces@31"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@60"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticExpression",
      "returnType": {
        "$ref": "#/interfaces@32"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftOperand",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@27"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@36"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "rightOperand",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticOperator",
      "returnType": {
        "$ref": "#/interfaces@33"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Add",
      "returnType": {
        "$ref": "#/interfaces@34"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "symbole",
        "operator": "=",
        "terminal": {
          "$type": "Keyword",
          "value": "+"
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Sub",
      "returnType": {
        "$ref": "#/interfaces@35"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "symbole",
        "operator": "=",
        "terminal": {
          "$type": "Keyword",
          "value": "-"
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Multiply",
      "returnType": {
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "symbole",
        "operator": "=",
        "terminal": {
          "$type": "Keyword",
          "value": "*"
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Divise",
      "returnType": {
        "$ref": "#/interfaces@37"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "symbole",
        "operator": "=",
        "terminal": {
          "$type": "Keyword",
          "value": "/"
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanExpression",
      "returnType": {
        "$ref": "#/interfaces@38"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "leftCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@42"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "rightCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@46"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "rightCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator",
      "returnType": {
        "$ref": "#/interfaces@39"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@45"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LowerThan",
      "returnType": {
        "$ref": "#/interfaces@40"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@40"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "<"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EqualTo",
      "returnType": {
        "$ref": "#/interfaces@41"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@41"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "=="
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UpperThan",
      "returnType": {
        "$ref": "#/interfaces@42"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@42"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": ">"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Not",
      "returnType": {
        "$ref": "#/interfaces@43"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@43"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "!"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Or",
      "returnType": {
        "$ref": "#/interfaces@44"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@44"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "||"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "And",
      "returnType": {
        "$ref": "#/interfaces@45"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@45"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "&&"
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LowerOrEqualTo",
      "returnType": {
        "$ref": "#/interfaces@46"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@46"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": "<="
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UpperOrEqualTo",
      "returnType": {
        "$ref": "#/interfaces@47"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@47"
            }
          },
          {
            "$type": "Assignment",
            "feature": "symbole",
            "operator": "=",
            "terminal": {
              "$type": "Keyword",
              "value": ">="
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EString",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@61"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Unit",
      "returnType": {
        "$ref": "#/types@4"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Unit_m",
      "returnType": {
        "$ref": "#/types@5"
      },
      "definition": {
        "$type": "Keyword",
        "value": "m"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Unit_cm",
      "returnType": {
        "$ref": "#/types@6"
      },
      "definition": {
        "$type": "Keyword",
        "value": "cm"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Unit_mm",
      "returnType": {
        "$ref": "#/types@7"
      },
      "definition": {
        "$type": "Keyword",
        "value": "mm"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "returnType": {
        "$ref": "#/types@1"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@58"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_number",
      "returnType": {
        "$ref": "#/types@2"
      },
      "definition": {
        "$type": "Keyword",
        "value": "number"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type_boolean",
      "returnType": {
        "$ref": "#/types@3"
      },
      "definition": {
        "$type": "Keyword",
        "value": "boolean"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "^"
            },
            "cardinality": "?"
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "a"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "z"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "A"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "Z"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "_"
                }
              }
            ]
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "a"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "z"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "A"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "Z"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "_"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "0"
        },
        "right": {
          "$type": "Keyword",
          "value": "9"
        },
        "cardinality": "+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\""
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              }
            ]
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "'"
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              }
            ]
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\s+/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "/\\\\/\\\\/[^\\\\n\\\\r]*/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ANY_OTHER",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "Wildcard"
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "interfaces": [
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "fonction",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Program",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "name",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "returnType",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@2"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "parameter",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@17"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "body",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@3"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Fonction",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "returnType",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/types@1"
                }
              },
              {
                "$type": "SimpleType",
                "stringType": "void"
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "ReturnType",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Statement",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "returnValue",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@22"
            }
          },
          "isOptional": false
        }
      ],
      "name": "ReturnStatement",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@38"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "thenStatement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@3"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "elseStatement",
          "isOptional": true,
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@3"
              }
            }
          }
        }
      ],
      "name": "If",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@38"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "body",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@3"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Loop",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "ControlRobot",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@4"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "distance",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@22"
            }
          }
        }
      ],
      "name": "Movement",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Backward",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Forward",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Left",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Right",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "angle",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@22"
            }
          }
        }
      ],
      "name": "Rotate",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Clock",
      "superTypes": [
        {
          "$ref": "#/interfaces@13"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "ClockLeft",
      "superTypes": [
        {
          "$ref": "#/interfaces@13"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "name",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@0"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "value",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@22"
            }
          }
        }
      ],
      "name": "Entity",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@1"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Parameter",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/types@1"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/types@4"
                }
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "VariableStatement",
      "superTypes": [
        {
          "$ref": "#/interfaces@16"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "variable",
          "type": {
            "$type": "ReferenceType",
            "referenceType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@18"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "value",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@22"
            }
          }
        }
      ],
      "name": "VariableAssignation",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@4"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "distance",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@22"
            }
          },
          "isOptional": false
        }
      ],
      "name": "SetSpeed",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "fonction",
          "type": {
            "$type": "ReferenceType",
            "referenceType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "args",
          "isOptional": true,
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@22"
              }
            }
          }
        }
      ],
      "name": "CallFunction",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Expression",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "value",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "boolean"
          },
          "isOptional": false
        }
      ],
      "name": "UnaryBooleanExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@22"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "UnaryArithmeticExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@22"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "fonction",
          "type": {
            "$type": "ReferenceType",
            "referenceType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "args",
          "isOptional": true,
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@22"
              }
            }
          }
        }
      ],
      "name": "CallFunctionExpr",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "entity",
          "type": {
            "$type": "ReferenceType",
            "referenceType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@16"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "CallEntity",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "GetSensor",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "GetDistance",
      "superTypes": [
        {
          "$ref": "#/interfaces@27"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "GetSpeed",
      "superTypes": [
        {
          "$ref": "#/interfaces@27"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "GetTimestamp",
      "superTypes": [
        {
          "$ref": "#/interfaces@27"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "value",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          },
          "isOptional": false
        }
      ],
      "name": "Value",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "leftOperand",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@24"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "operator",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@33"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "rightOperand",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@24"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "ArithmeticExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@22"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "ArithmeticOperator",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "+"
          },
          "isOptional": false
        }
      ],
      "name": "Add",
      "superTypes": [
        {
          "$ref": "#/interfaces@33"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "-"
          },
          "isOptional": false
        }
      ],
      "name": "Sub",
      "superTypes": [
        {
          "$ref": "#/interfaces@33"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "*"
          },
          "isOptional": false
        }
      ],
      "name": "Multiply",
      "superTypes": [
        {
          "$ref": "#/interfaces@33"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "/"
          },
          "isOptional": false
        }
      ],
      "name": "Divise",
      "superTypes": [
        {
          "$ref": "#/interfaces@33"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "leftCondition",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@24"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "operator",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@39"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "rightCondition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@24"
            }
          },
          "isOptional": false
        }
      ],
      "name": "BooleanExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@22"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "BooleanOperator",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "<"
          },
          "isOptional": false
        }
      ],
      "name": "LowerThan",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "=="
          },
          "isOptional": false
        }
      ],
      "name": "EqualTo",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": ">"
          },
          "isOptional": false
        }
      ],
      "name": "UpperThan",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "!"
          },
          "isOptional": false
        }
      ],
      "name": "Not",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "||"
          },
          "isOptional": false
        }
      ],
      "name": "Or",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "type": {
            "$type": "SimpleType",
            "stringType": "&&"
          },
          "isOptional": false
        }
      ],
      "name": "And",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "stringType": "<="
          }
        }
      ],
      "name": "LowerOrEqualTo",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "symbole",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "stringType": ">="
          }
        }
      ],
      "name": "UpperOrEqualTo",
      "superTypes": [
        {
          "$ref": "#/interfaces@39"
        }
      ]
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "ID",
      "type": {
        "$type": "SimpleType",
        "primitiveType": "string"
      }
    },
    {
      "$type": "Type",
      "name": "Type",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@2"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@3"
            }
          }
        ]
      }
    },
    {
      "$type": "Type",
      "name": "Type_number",
      "type": {
        "$type": "SimpleType",
        "stringType": "number"
      }
    },
    {
      "$type": "Type",
      "name": "Type_boolean",
      "type": {
        "$type": "SimpleType",
        "stringType": "boolean"
      }
    },
    {
      "$type": "Type",
      "name": "Unit",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@5"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@6"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/types@7"
            }
          }
        ]
      }
    },
    {
      "$type": "Type",
      "name": "Unit_m",
      "type": {
        "$type": "SimpleType",
        "stringType": "m"
      }
    },
    {
      "$type": "Type",
      "name": "Unit_cm",
      "type": {
        "$type": "SimpleType",
        "stringType": "cm"
      }
    },
    {
      "$type": "Type",
      "name": "Unit_mm",
      "type": {
        "$type": "SimpleType",
        "stringType": "mm"
      }
    }
  ],
  "usedGrammars": []
}`));var PG={languageId:"my-robot",fileExtensions:[".rob"],caseInsensitive:!1},dk={AstReflection:()=>new Jc},pk={Grammar:()=>fk(),LanguageMetaData:()=>PG,parser:{}};function mk(t){let e=t.validation.ValidationRegistry,r=t.validation.MyRobotValidator,n={Program:[r.checkUniqueFonctionDefs,r.checkUniqueVariableDeclarations,r.checkUniqueFonctionReturnStatements],If:[r.checkUniqueControlStructureReturnStatements],Loop:[r.checkUniqueControlStructureReturnStatements],Value:[r.checkValueAsNumber]};e.register(n,r)}var Vd=class{checkValueAsNumber(e,r){r("info",`Value = ${e.value}`,{node:e,property:"value"})}checkUniqueFonctionDefs(e,r){let n=new Set;e.fonction.forEach(i=>{n.has(i.name)&&r("error",`Function has non-unique name '${i.name}'.`,{node:i,property:"name"}),n.add(i.name)})}checkUniqueVariableDeclarations(e,r){e.fonction.forEach(n=>{let i=new Set;n.body.forEach(o=>{if(o.$type==="VariableStatement"){var s=o;i.has(s.name)&&r("error",`Variable has non-unique name '${s.name}'.`,{node:s,property:"name"}),i.add(s.name)}})})}checkUniqueFonctionReturnStatements(e,r){let n=0;e.fonction.forEach(i=>{i.body.forEach(o=>{o.$type==="ReturnStatement"&&(n++,n>1&&r("error",`Function '${i.name}' has multiple return statements in one block.`,{node:o}))})})}checkUniqueControlStructureReturnStatements(e,r){let n=0;e.$type==="If"?(e.thenStatement.forEach(i=>{i.$type==="ReturnStatement"&&(n++,n>1&&r("error","If statement has multiple return statements in one block.",{node:i}))}),e.elseStatement&&e.elseStatement.forEach(i=>{i.$type==="ReturnStatement"&&(n++,n>1&&r("error","Else statement has multiple return statements in one block.",{node:i}))})):e.$type==="Loop"&&e.body.forEach(i=>{i.$type==="ReturnStatement"&&(n++,n>1&&r("error","Loop statement has multiple return statements in one block.",{node:i}))})}};function hk(t){let e=t.validation.ValidationRegistry,r=t.validation.MyRobotAcceptWeaver;e.register(r.checks,r)}var Xd=class{constructor(){this.checks={Program:this.weaveProgram,Fonction:this.weaveFonction,ReturnType:this.weaveReturnType,Statement:this.weaveStatement,ReturnStatement:this.weaveReturnStatement,If:this.weaveIf,Loop:this.weaveLoop,ControlRobot:this.weaveControlRobot,Movement:this.weaveMovement,Backward:this.weaveBackward,Forward:this.weaveForward,Left:this.weaveLeft,Right:this.weaveRight,Rotate:this.weaveRotate,Clock:this.weaveClock,ClockLeft:this.weaveClockLeft,Entity:this.weaveEntity,Parameter:this.weaveParameter,VariableStatement:this.weaveVariableStatement,VariableAssignation:this.weaveVariableAssignation,SetSpeed:this.weaveSetSpeed,CallFunction:this.weaveCallFunction,Expression:this.weaveExpression,UnaryBooleanExpression:this.weaveUnaryBooleanExpression,UnaryArithmeticExpression:this.weaveUnaryArithmeticExpression,CallFunctionExpr:this.weaveCallFunctionExpr,CallEntity:this.weaveCallEntity,GetSensor:this.weaveGetSensor,GetDistance:this.weaveGetDistance,GetSpeed:this.weaveGetSpeed,GetTimestamp:this.weaveGetTimestamp,Value:this.weaveValue,ArithmeticExpression:this.weaveArithmeticExpression,ArithmeticOperator:this.weaveArithmeticOperator,Add:this.weaveAdd,Sub:this.weaveSub,Multiply:this.weaveMultiply,Divise:this.weaveDivise,BooleanExpression:this.weaveBooleanExpression,BooleanOperator:this.weaveBooleanOperator,LowerThan:this.weaveLowerThan,EqualTo:this.weaveEqualTo,UpperThan:this.weaveUpperThan,Not:this.weaveNot,Or:this.weaveOr,LowerOrEqualTo:this.weaveLowerOrEqualTo,UpperOrEqualTo:this.weaveUpperOrEqualTo,And:this.weaveAnd}}weaveProgram(e,r){e.accept=n=>n.visitProgram(e)}weaveFonction(e,r){e.accept=n=>n.visitFonction(e)}weaveReturnType(e,r){e.accept=n=>n.visitReturnType(e)}weaveStatement(e,r){e.accept=n=>n.visitStatement(e)}weaveReturnStatement(e,r){e.accept=n=>n.visitReturnStatement(e)}weaveIf(e,r){e.accept=n=>n.visitIf(e)}weaveLoop(e,r){e.accept=n=>n.visitLoop(e)}weaveControlRobot(e,r){e.accept=n=>n.visitControlRobot(e)}weaveMovement(e,r){e.accept=n=>n.visitMovement(e)}weaveBackward(e,r){e.accept=n=>n.visitBackward(e)}weaveForward(e,r){e.accept=n=>n.visitForward(e)}weaveLeft(e,r){e.accept=n=>n.visitLeft(e)}weaveRight(e,r){e.accept=n=>n.visitRight(e)}weaveRotate(e,r){e.accept=n=>n.visitRotate(e)}weaveClock(e,r){e.accept=n=>n.visitClock(e)}weaveClockLeft(e,r){e.accept=n=>n.visitClockLeft(e)}weaveEntity(e,r){e.accept=n=>n.visitEntity(e)}weaveParameter(e,r){e.accept=n=>n.visitParameter(e)}weaveVariableStatement(e,r){e.accept=n=>n.visitVariableStatement(e)}weaveVariableAssignation(e,r){e.accept=n=>n.visitVariableAssignation(e)}weaveSetSpeed(e,r){e.accept=n=>n.visitSetSpeed(e)}weaveCallFunction(e,r){e.accept=n=>n.visitCallFunction(e)}weaveExpression(e,r){e.accept=n=>n.visitExpression(e)}weaveUnaryBooleanExpression(e,r){e.accept=n=>n.visitUnaryBooleanExpression(e)}weaveUnaryArithmeticExpression(e,r){e.accept=n=>n.visitUnaryArithmeticExpression(e)}weaveCallFunctionExpr(e,r){e.accept=n=>n.visitCallFunctionExpr(e)}weaveCallEntity(e,r){e.accept=n=>n.visitCallEntity(e)}weaveGetSensor(e,r){e.accept=n=>n.visitGetSensor(e)}weaveGetDistance(e,r){e.accept=n=>n.visitGetDistance(e)}weaveGetSpeed(e,r){e.accept=n=>n.visitGetSpeed(e)}weaveGetTimestamp(e,r){e.accept=n=>n.visitGetTimestamp(e)}weaveValue(e,r){e.accept=n=>n.visitValue(e)}weaveArithmeticExpression(e,r){e.accept=n=>n.visitArithmeticExpression(e)}weaveArithmeticOperator(e,r){e.accept=n=>n.visitArithmeticOperator(e)}weaveAdd(e,r){e.accept=n=>n.visitAdd(e)}weaveSub(e,r){e.accept=n=>n.visitSub(e)}weaveMultiply(e,r){e.accept=n=>n.visitMultiply(e)}weaveDivise(e,r){e.accept=n=>n.visitDivise(e)}weaveBooleanExpression(e,r){e.accept=n=>n.visitBooleanExpression(e)}weaveBooleanOperator(e,r){e.accept=n=>n.visitBooleanOperator(e)}weaveLowerThan(e,r){e.accept=n=>n.visitLowerThan(e)}weaveEqualTo(e,r){e.accept=n=>n.visitEqualTo(e)}weaveUpperThan(e,r){e.accept=n=>n.visitUpperThan(e)}weaveNot(e,r){e.accept=n=>n.visitNot(e)}weaveOr(e,r){e.accept=n=>n.visitOr(e)}weaveLowerOrEqualTo(e,r){e.accept=n=>n.visitLowerOrEqualTo(e)}weaveUpperOrEqualTo(e,r){e.accept=n=>n.visitUpperOrEqualTo(e)}weaveAnd(e,r){e.accept=n=>n.visitAnd(e)}};function me(t,e){switch(t.$type){case"Program":return t.accept(e);case"Fonction":return t.accept(e);case"ReturnType":return t.accept(e);case"Statement":return t.accept(e);case"ReturnStatement":return t.accept(e);case"If":return t.accept(e);case"Loop":return t.accept(e);case"ControlRobot":return t.accept(e);case"Movement":return t.accept(e);case"Backward":return t.accept(e);case"Forward":return t.accept(e);case"Left":return t.accept(e);case"Right":return t.accept(e);case"Rotate":return t.accept(e);case"Clock":return t.accept(e);case"ClockLeft":return t.accept(e);case"Entity":return t.accept(e);case"Parameter":return t.accept(e);case"VariableStatement":return t.accept(e);case"VariableAssignation":return t.accept(e);case"SetSpeed":return t.accept(e);case"CallFunction":return t.accept(e);case"Expression":return t.accept(e);case"UnaryBooleanExpression":return t.accept(e);case"UnaryArithmeticExpression":return t.accept(e);case"CallFunctionExpr":return t.accept(e);case"CallEntity":return t.accept(e);case"GetSensor":return t.accept(e);case"Value":return t.accept(e);case"ArithmeticExpression":return t.accept(e);case"ArithmeticOperator":return t.accept(e);case"Add":return t.accept(e);case"Sub":return t.accept(e);case"Multiply":return t.accept(e);case"Divise":return t.accept(e);case"BooleanExpression":return t.accept(e);case"BooleanOperator":return t.accept(e);case"LowerThan":return t.accept(e);case"EqualTo":return t.accept(e);case"UpperThan":return t.accept(e);case"Not":return t.accept(e);case"Or":return t.accept(e);case"LowerOrEqualTo":return t.accept(e);case"UpperOrEqualTo":return t.accept(e);case"And":return t.accept(e);default:throw new Error(`Unknown node type: ${t.$type}`)}}var Rn=class t{static fromAngle(e,r){return new t(Math.cos(e)*r,Math.sin(e)*r)}static null(){return new t(0,0)}constructor(e,r){this.x=e,this.y=r}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}scale(e){return new t(this.x*e,this.y*e)}projX(){return new t(this.x,0)}projY(){return new t(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}},Yd=class{constructor(e,r){this.origin=e,this.vector=r}intersect(e){let r=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),r=r.concat(o)}return this.findClosestIntersection(r)}findClosestIntersection(e){let r=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,r=i)}return e[r]}else return}getPoiFinder(){return(e,r)=>{let n=e.minus(r),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,c=n.x*s.y-s.x*n.y,l=a/o,u=-c/o;if(l>0&&l<1&&u>0)return e.plus(n.scale(-l))}}}};var Qc=class{constructor(e,r,n,i,o){this.type="Robot",this.pos=e,this.size=r,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){return[]}turn(e){this.rad+=e*Math.PI/180;let r=e/this.speed*1e3;this.scene.time+=r,this.scene.timestamps.push(new Fo(this.scene.time,this))}move(e){let r=Math.cos(this.rad)*e,n=Math.sin(this.rad)*e;this.pos.x+=r,this.pos.y+=n;let i=e/this.speed*1e3;this.scene.time+=i,this.scene.timestamps.push(new Fo(this.scene.time,this))}side(e){let r=this.rad-Math.PI/2,n=Math.cos(r)*e,i=Math.sin(r)*e;this.pos.x+=n,this.pos.y+=i;let o=e/this.speed*1e3;this.scene.time+=o,this.scene.timestamps.push(new Fo(this.scene.time,this))}getRay(){return new Yd(this.pos,Rn.fromAngle(this.rad,1e4).scale(-1))}},Fo=class extends Qc{constructor(e,r){super(r.pos.scale(1),r.size.scale(1),r.rad,r.speed,r.scene),this.rad=r.rad,this.time=e}};var Uo=class{constructor(e,r){this.type="Wall",this.pos=e,this.size=r}intersect(e){let r=e.getPoiFinder()(this.pos,this.size);return r?[r]:[]}};var Zc=class{constructor(e=new Rn(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new Qc(this.size.scale(.5),new Rn(250,250),0,30,this),this.entities.push(new Uo(Rn.null(),this.size.projX())),this.entities.push(new Uo(Rn.null(),this.size.projY())),this.entities.push(new Uo(this.size,this.size.projY())),this.entities.push(new Uo(this.size,this.size.projX())),this.timestamps.push(new Fo(0,this.robot))}};var Jd=class{constructor(e,r){this.variableTable={},this.functionTable={},e&&r?this.scene=new Zc(new Rn(e*10,r*10)):this.scene=new Zc,this.robot=this.scene.robot}visitProgram(e){let r=e.fonction.find(n=>n.name==="entry");return r&&me(r,this),this.scene}visitFonction(e){this.functionTable[e.name]={name:e.name,parameters:e.parameter,returnType:me(e.returnType,this)};for(let r of e.body){if(r.$type==="ReturnStatement")return me(r,this);me(r,this)}}visitReturnType(e){return e.returnType}visitStatement(e){return me(e,this)}visitReturnStatement(e){return me(e.returnValue,this)}visitIf(e){let r=e.condition,n=e.thenStatement,i=e.elseStatement;if(me(r,this))for(let s of n)me(s,this);else for(let s of i)me(s,this)}visitLoop(e){let r=e.condition,n=e.body;for(;me(r,this);)for(let i of n)me(i,this)}visitControlRobot(e){return me(e,this)}visitMovement(e){me(e,this)}visitBackward(e){let r=e.distance,n=me(r,this),i=this.toMillimeter(-n,e.unit);this.robot.move(i)}visitForward(e){let r=e.distance,n=me(r,this),i=this.toMillimeter(n,e.unit);this.robot.move(i)}visitLeft(e){let r=e.distance,n=me(r,this),i=this.toMillimeter(-n,e.unit);this.robot.side(i)}visitRight(e){let r=e.distance,n=me(r,this),i=this.toMillimeter(n,e.unit);this.robot.side(i)}visitRotate(e){}visitClock(e){let r=e.angle,n=me(r,this);this.robot.turn(n)}visitClockLeft(e){let r=e.angle,n=me(r,this);this.robot.turn(-n)}visitEntity(e){return me(e,this)}visitParameter(e){return me(e,this)}visitVariableStatement(e){let r=e.name,n=e.type,i=me(e.value,this);this.variableTable[r]={name:r,type:n,value:i}}visitVariableAssignation(e){let r=me(e.value,this);this.variableTable[e.variable.ref.name].value=r}visitSetSpeed(e){let r=me(e.distance,this),n=typeof r=="boolean"?r?1:0:r,i=this.toMillimeter(n,e.unit);this.robot.speed=i}visitCallFunction(e){let r=e.fonction.ref;for(let n=0;n<e.args.length;n++)this.variableTable[r.parameter[n].name]={name:r.parameter[n].name,type:r.parameter[n].type,value:me(e.args[n],this)};return me(r,this)}visitExpression(e){return me(e,this)}visitUnaryBooleanExpression(e){return me(e,this)}visitUnaryArithmeticExpression(e){return me(e,this)}visitCallFunctionExpr(e){let r=e.fonction.ref;for(let n=0;n<e.args.length;n++)this.variableTable[r.parameter[n].name]={name:r.parameter[n].name,type:r.parameter[n].type,value:me(e.args[n],this)};return me(r,this)}visitCallEntity(e){let r=e.entity.ref;return this.variableTable[r.name].value}visitGetSensor(e){return me(e,this)}visitGetDistance(e){let r=this.robot.getRay().intersect(this.scene.entities);return r?r.minus(this.robot.pos).norm():9999999999}visitGetSpeed(e){return this.robot.speed}visitGetTimestamp(e){return this.scene.time}visitValue(e){return e.value}visitArithmeticExpression(e){let r=this.visitUnaryArithmeticExpression(e.leftOperand),n=e.rightOperand.map(a=>this.visitUnaryArithmeticExpression(a)),i=e.operator,o=-1,s=r;for(let a of n)o++,s=s+i[o]+a;return s}visitArithmeticOperator(e){return me(e,this)}visitAdd(e){return e.symbole}visitSub(e){return e.symbole}visitMultiply(e){return e.symbole}visitDivise(e){return e.symbole}visitBooleanExpression(e){let r=this.visitUnaryArithmeticExpression(e.leftCondition),n=this.visitUnaryArithmeticExpression(e.rightCondition),i=this.visitBooleanOperator(e.operator);return i=="=="?r===n:i===">"?r>n:i==="<"?r<n:!1}visitBooleanOperator(e){return me(e,this)}visitLowerThan(e){return e.symbole}visitEqualTo(e){return e.symbole}visitUpperThan(e){return e.symbole}visitNot(e){return e.symbole}visitOr(e){return e.symbole}visitLowerOrEqualTo(e){return e.symbole}visitUpperOrEqualTo(e){return e.symbole}visitAnd(e){return e.symbole}toMillimeter(e,r){switch(r){case"mm":return e;case"cm":return e*10;case"m":return e*1e3;default:return e}}};function yk(t,e,r){let n=new Jd(e,r);return t.accept(n)}var gk=(t=0)=>e=>`\x1B[${e+t}m`,Tk=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,vk=(t=0)=>(e,r,n)=>`\x1B[${38+t};2;${e};${r};${n}m`,it={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},dle=Object.keys(it.modifier),DG=Object.keys(it.color),LG=Object.keys(it.bgColor),ple=[...DG,...LG];function MG(){let t=new Map;for(let[e,r]of Object.entries(it)){for(let[n,i]of Object.entries(r))it[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[n]=it[n],t.set(i[0],i[1]);Object.defineProperty(it,e,{value:r,enumerable:!1})}return Object.defineProperty(it,"codes",{value:t,enumerable:!1}),it.color.close="\x1B[39m",it.bgColor.close="\x1B[49m",it.color.ansi=gk(),it.color.ansi256=Tk(),it.color.ansi16m=vk(),it.bgColor.ansi=gk(10),it.bgColor.ansi256=Tk(10),it.bgColor.ansi16m=vk(10),Object.defineProperties(it,{rgbToAnsi256:{value(e,r,n){return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(e){let r=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!r)return[0,0,0];let[n]=r;n.length===3&&(n=[...n].map(o=>o+o).join(""));let i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:e=>it.rgbToAnsi256(...it.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let r,n,i;if(e>=232)r=((e-232)*10+8)/255,n=r,i=r;else{e-=16;let a=e%36;r=Math.floor(e/36)/5,n=Math.floor(a/6)/5,i=a%6/5}let o=Math.max(r,n,i)*2;if(o===0)return 30;let s=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(r));return o===2&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,r,n)=>it.ansi256ToAnsi(it.rgbToAnsi256(e,r,n)),enumerable:!1},hexToAnsi:{value:e=>it.ansi256ToAnsi(it.hexToAnsi256(e)),enumerable:!1}}),it}var FG=MG(),bn=FG;var Qd=(()=>{if(navigator.userAgentData){let t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),xk=Qd!==0&&{level:Qd,hasBasic:!0,has256:Qd>=2,has16m:Qd>=3},UG={stdout:xk,stderr:xk},Rk=UG;function bk(t,e,r){let n=t.indexOf(e);if(n===-1)return t;let i=e.length,o=0,s="";do s+=t.slice(o,n)+e+r,o=n+i,n=t.indexOf(e,o);while(n!==-1);return s+=t.slice(o),s}function Sk(t,e,r,n){let i=0,o="";do{let s=t[n-1]==="\r";o+=t.slice(i,s?n-1:n)+e+(s?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return o+=t.slice(i),o}var{stdout:Ak,stderr:wk}=Rk,My=Symbol("GENERATOR"),ba=Symbol("STYLER"),el=Symbol("IS_EMPTY"),kk=["ansi","ansi","ansi256","ansi16m"],Sa=Object.create(null),qG=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=Ak?Ak.level:0;t.level=e.level===void 0?r:e.level};var GG=t=>{let e=(...r)=>r.join(" ");return qG(e,t),Object.setPrototypeOf(e,tl.prototype),e};function tl(t){return GG(t)}Object.setPrototypeOf(tl.prototype,Function.prototype);for(let[t,e]of Object.entries(bn))Sa[t]={get(){let r=Zd(this,Uy(e.open,e.close,this[ba]),this[el]);return Object.defineProperty(this,t,{value:r}),r}};Sa.visible={get(){let t=Zd(this,this[ba],!0);return Object.defineProperty(this,"visible",{value:t}),t}};var Fy=(t,e,r,...n)=>t==="rgb"?e==="ansi16m"?bn[r].ansi16m(...n):e==="ansi256"?bn[r].ansi256(bn.rgbToAnsi256(...n)):bn[r].ansi(bn.rgbToAnsi(...n)):t==="hex"?Fy("rgb",e,r,...bn.hexToRgb(...n)):bn[r][t](...n),jG=["rgb","hex","ansi256"];for(let t of jG){Sa[t]={get(){let{level:r}=this;return function(...n){let i=Uy(Fy(t,kk[r],"color",...n),bn.color.close,this[ba]);return Zd(this,i,this[el])}}};let e="bg"+t[0].toUpperCase()+t.slice(1);Sa[e]={get(){let{level:r}=this;return function(...n){let i=Uy(Fy(t,kk[r],"bgColor",...n),bn.bgColor.close,this[ba]);return Zd(this,i,this[el])}}}}var HG=Object.defineProperties(()=>{},{...Sa,level:{enumerable:!0,get(){return this[My].level},set(t){this[My].level=t}}}),Uy=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},Zd=(t,e,r)=>{let n=(...i)=>KG(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,HG),n[My]=t,n[ba]=e,n[el]=r,n},KG=(t,e)=>{if(t.level<=0||!e)return t[el]?"":e;let r=t[ba];if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.includes("\x1B"))for(;r!==void 0;)e=bk(e,r.close,r.open),r=r.parent;let o=e.indexOf(`
`);return o!==-1&&(e=Sk(e,i,n,o)),n+e+i};Object.defineProperties(tl.prototype,Sa);var BG=tl(),xle=tl({level:wk?wk.level:0});var Aa=BG;async function WG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,hu.parse("memory://minilogo.document"));return await e.shared.workspace.DocumentBuilder.build([n],{validation:!0}),(r=n.parseResult)===null||r===void 0?void 0:r.value}async function Ck(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,hu.parse("memory://minilogo.document"));await e.shared.workspace.DocumentBuilder.build([n],{validation:!0});let i=((r=n.diagnostics)!==null&&r!==void 0?r:[]).filter(o=>o.severity===1);if(i.length>0){let o=i.map(s=>`line ${s.range.start.line+1}: ${s.message} [${n.textDocument.getText(s.range)}]`);throw console.error(Aa.red("There are validation errors:")),o.forEach(s=>console.error(Aa.red(s))),new Error(o.join(`
`))}return n}async function Ek(t){let e=t[0],r=t[1],n=t[2],i=rl(Co).MyRobot,o=await WG(e,i),s=yk(o,r,n);return Promise.resolve(s)}var $k=async t=>{let e=rl(Co).MyRobot;try{await Ck(t,e);let n=(await Ck(t,e)).parseResult;if(n.lexerErrors.length===0&&n.parserErrors.length===0)return console.log(Aa.green("Parsed and validated successfully!")),[];{let i=[];if(n.lexerErrors.length>0){let o=n.lexerErrors.map(s=>`${s.line?"line "+s.line+1:""}: ${s.message}`);i=i.concat(o)}if(n.parserErrors.length>0){let o=n.parserErrors.map(s=>`${s.message}`);i=i.concat(o)}return console.log(Aa.red("Failed to parse and validate!")),i}}catch(r){return console.log(Aa.red("Failed to parse and validate!")),r.message.split(`
`)}};var zG={validation:{MyRobotValidator:()=>new Vd,MyRobotAcceptWeaver:()=>new Xd}};function rl(t){let e=ho(Rc(t),dk),r=ho(xc({shared:e}),pk,zG);return e.lsp.ExecuteCommandHandler=new qy,e.ServiceRegistry.register(r),mk(r),hk(r),{shared:e,MyRobot:r}}var qy=class extends Bu{registerCommands(e){e("parseAndGenerate",r=>Ek(r[0])),e("parseAndValidate",r=>$k(r[0]))}};var VG=new wa.BrowserMessageReader(self),XG=new wa.BrowserMessageWriter(self),YG=(0,wa.createConnection)(VG,XG),{shared:JG}=rl(Object.assign({connection:YG},Co));rR(JG);})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
