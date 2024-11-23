"use strict";(()=>{var $C=Object.create;var ip=Object.defineProperty;var NC=Object.getOwnPropertyDescriptor;var _C=Object.getOwnPropertyNames;var IC=Object.getPrototypeOf,PC=Object.prototype.hasOwnProperty;var Hy=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),OC=(t,e)=>{for(var r in e)ip(t,r,{get:e[r],enumerable:!0})},DC=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of _C(e))!PC.call(t,i)&&i!==r&&ip(t,i,{get:()=>e[i],enumerable:!(n=NC(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?$C(IC(t)):{},DC(e||!t||!t.__esModule?ip(r,"default",{value:t,enumerable:!0}):r,t));var Vn=H(ap=>{"use strict";Object.defineProperty(ap,"__esModule",{value:!0});var op;function sp(){if(op===void 0)throw new Error("No runtime abstraction layer installed");return op}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");op=r}t.install=e})(sp||(sp={}));ap.default=sp});var cp=H($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.Disposable=void 0;var LC;(function(t){function e(r){return{dispose:r}}t.create=e})(LC=$a.Disposable||($a.Disposable={}))});var oo=H(io=>{"use strict";Object.defineProperty(io,"__esModule",{value:!0});io.Emitter=io.Event=void 0;var MC=Vn(),FC;(function(t){let e={dispose(){}};t.None=function(){return e}})(FC=io.Event||(io.Event={}));var lp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,MC.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},al=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new lp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};io.Emitter=al;al._noop=function(){}});var Ky=H(cl=>{"use strict";Object.defineProperty(cl,"__esModule",{value:!0});cl.AbstractMessageBuffer=void 0;var UC=13,qC=10,GC=`\r
`,up=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let c=this._chunks[r];for(n=0;n<c.length;){switch(c[n]){case UC:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case qC:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(GC);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let l=a[c],u=l.indexOf(":");if(u===-1)throw new Error("Message header must separate key and value using :");let f=l.substr(0,u),m=l.substr(u+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};cl.AbstractMessageBuffer=up});var zy=H(mp=>{"use strict";Object.defineProperty(mp,"__esModule",{value:!0});var By=Vn(),Ko=cp(),jC=oo(),HC=Ky(),ll=class t extends HC.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};ll.emptyBuffer=new Uint8Array(0);var fp=class{constructor(e){this.socket=e,this._onData=new jC.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,By.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Ko.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ko.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ko.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},dp=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Ko.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Ko.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Ko.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},KC=new TextEncoder,Wy=Object.freeze({messageBuffer:Object.freeze({create:t=>new ll(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(KC.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new fp(t),asWritableStream:t=>new dp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function pp(){return Wy}(function(t){function e(){By.default.install(Wy)}t.install=e})(pp||(pp={}));mp.default=pp});var Bo=H(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.stringArray=rr.array=rr.func=rr.error=rr.number=rr.string=rr.boolean=void 0;function BC(t){return t===!0||t===!1}rr.boolean=BC;function Vy(t){return typeof t=="string"||t instanceof String}rr.string=Vy;function WC(t){return typeof t=="number"||t instanceof Number}rr.number=WC;function zC(t){return t instanceof Error}rr.error=zC;function VC(t){return typeof t=="function"}rr.func=VC;function Xy(t){return Array.isArray(t)}rr.array=Xy;function XC(t){return Xy(t)&&t.every(e=>Vy(e))}rr.stringArray=XC});var Fp=H(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var so=Bo(),Yy;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Yy=V.ErrorCodes||(V.ErrorCodes={}));var hp=class t extends Error{constructor(e,r,n){super(r),this.code=so.number(e)?e:Yy.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=hp;var br=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=br;br.auto=new br("auto");br.byPosition=new br("byPosition");br.byName=new br("byName");var Xe=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return br.auto}};V.AbstractMessageSignature=Xe;var yp=class extends Xe{constructor(e){super(e,0)}};V.RequestType0=yp;var gp=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=gp;var Tp=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=Tp;var vp=class extends Xe{constructor(e){super(e,2)}};V.RequestType2=vp;var xp=class extends Xe{constructor(e){super(e,3)}};V.RequestType3=xp;var Rp=class extends Xe{constructor(e){super(e,4)}};V.RequestType4=Rp;var bp=class extends Xe{constructor(e){super(e,5)}};V.RequestType5=bp;var Sp=class extends Xe{constructor(e){super(e,6)}};V.RequestType6=Sp;var wp=class extends Xe{constructor(e){super(e,7)}};V.RequestType7=wp;var Ap=class extends Xe{constructor(e){super(e,8)}};V.RequestType8=Ap;var Cp=class extends Xe{constructor(e){super(e,9)}};V.RequestType9=Cp;var kp=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=kp;var Ep=class extends Xe{constructor(e){super(e,0)}};V.NotificationType0=Ep;var $p=class extends Xe{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=$p;var Np=class extends Xe{constructor(e){super(e,2)}};V.NotificationType2=Np;var _p=class extends Xe{constructor(e){super(e,3)}};V.NotificationType3=_p;var Ip=class extends Xe{constructor(e){super(e,4)}};V.NotificationType4=Ip;var Pp=class extends Xe{constructor(e){super(e,5)}};V.NotificationType5=Pp;var Op=class extends Xe{constructor(e){super(e,6)}};V.NotificationType6=Op;var Dp=class extends Xe{constructor(e){super(e,7)}};V.NotificationType7=Dp;var Lp=class extends Xe{constructor(e){super(e,8)}};V.NotificationType8=Lp;var Mp=class extends Xe{constructor(e){super(e,9)}};V.NotificationType9=Mp;var YC;(function(t){function e(i){let o=i;return o&&so.string(o.method)&&(so.string(o.id)||so.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&so.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(so.string(o.id)||so.number(o.id)||o.id===null)}t.isResponse=n})(YC=V.Message||(V.Message={}))});var qp=H(Xn=>{"use strict";var Jy;Object.defineProperty(Xn,"__esModule",{value:!0});Xn.LRUCache=Xn.LinkedMap=Xn.Touch=void 0;var dr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(dr=Xn.Touch||(Xn.Touch={}));var ul=class{constructor(){this[Jy]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=dr.None){let n=this._map.get(e);if(n)return r!==dr.None&&this.touch(n,r),n.value}set(e,r,n=dr.None){let i=this._map.get(e);if(i)i.value=r,n!==dr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case dr.None:this.addItemLast(i);break;case dr.First:this.addItemFirst(i);break;case dr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(Jy=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==dr.First&&r!==dr.Last)){if(r===dr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===dr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Xn.LinkedMap=ul;var Up=class extends ul{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=dr.AsNew){return super.get(e,r)}peek(e){return super.get(e,dr.None)}set(e,r){return super.set(e,r,dr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Xn.LRUCache=Up});var Kp=H(ao=>{"use strict";Object.defineProperty(ao,"__esModule",{value:!0});ao.CancellationTokenSource=ao.CancellationToken=void 0;var JC=Vn(),QC=Bo(),Gp=oo(),jp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Gp.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Gp.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||QC.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(jp=ao.CancellationToken||(ao.CancellationToken={}));var ZC=Object.freeze(function(t,e){let r=(0,JC.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),fl=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?ZC:(this._emitter||(this._emitter=new Gp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Hp=class{get token(){return this._token||(this._token=new fl),this._token}cancel(){this._token?this._token.cancel():this._token=jp.Cancelled}dispose(){this._token?this._token instanceof fl&&this._token.dispose():this._token=jp.None}};ao.CancellationTokenSource=Hp});var Qy=H(Yn=>{"use strict";Object.defineProperty(Yn,"__esModule",{value:!0});Yn.ReadableStreamMessageReader=Yn.AbstractMessageReader=Yn.MessageReader=void 0;var Wp=Vn(),Wo=Bo(),Bp=oo(),ek;(function(t){function e(r){let n=r;return n&&Wo.func(n.listen)&&Wo.func(n.dispose)&&Wo.func(n.onError)&&Wo.func(n.onClose)&&Wo.func(n.onPartialMessage)}t.is=e})(ek=Yn.MessageReader||(Yn.MessageReader={}));var dl=class{constructor(){this.errorEmitter=new Bp.Emitter,this.closeEmitter=new Bp.Emitter,this.partialMessageEmitter=new Bp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Wo.string(e.message)?e.message:"unknown"}`)}};Yn.AbstractMessageReader=dl;var zp;(function(t){function e(r){let n,i,o,s=new Map,a,c=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let l of r.contentDecoders)s.set(l.name,l);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,c.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let l of r.contentTypeDecoders)c.set(l.name,l)}return a===void 0&&(a=(0,Wp.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}t.fromOptions=e})(zp||(zp={}));var Vp=class extends dl{constructor(e,r){super(),this.readable=e,this.options=zp.fromOptions(r),this.buffer=(0,Wp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Wp.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Yn.ReadableStreamMessageReader=Vp});var Zy=H(pl=>{"use strict";Object.defineProperty(pl,"__esModule",{value:!0});pl.Semaphore=void 0;var tk=Vn(),Xp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,tk.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};pl.Semaphore=Xp});var ng=H(Jn=>{"use strict";Object.defineProperty(Jn,"__esModule",{value:!0});Jn.WriteableStreamMessageWriter=Jn.AbstractMessageWriter=Jn.MessageWriter=void 0;var eg=Vn(),Na=Bo(),rk=Zy(),tg=oo(),nk="Content-Length: ",rg=`\r
`,ik;(function(t){function e(r){let n=r;return n&&Na.func(n.dispose)&&Na.func(n.onClose)&&Na.func(n.onError)&&Na.func(n.write)}t.is=e})(ik=Jn.MessageWriter||(Jn.MessageWriter={}));var ml=class{constructor(){this.errorEmitter=new tg.Emitter,this.closeEmitter=new tg.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Na.string(e.message)?e.message:"unknown"}`)}};Jn.AbstractMessageWriter=ml;var Yp;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,eg.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,eg.default)().applicationJson.encoder}}t.fromOptions=e})(Yp||(Yp={}));var Jp=class extends ml{constructor(e,r){super(),this.writable=e,this.options=Yp.fromOptions(r),this.errorCount=0,this.writeSemaphore=new rk.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(nk,n.byteLength.toString(),rg),i.push(rg),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};Jn.WriteableStreamMessageWriter=Jp});var lg=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var ig=Vn(),It=Bo(),Z=Fp(),og=qp(),_a=oo(),Qp=Kp(),Pa;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(Pa||(Pa={}));var sg;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(sg=Y.ProgressToken||(Y.ProgressToken={}));var Ia;(function(t){t.type=new Z.NotificationType("$/progress")})(Ia||(Ia={}));var Zp=class{constructor(){}};Y.ProgressType=Zp;var em;(function(t){function e(r){return It.func(r)}t.is=e})(em||(em={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var ok;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(ok=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!It.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})($e=Y.Trace||(Y.Trace={}));var nn;(function(t){t.Text="text",t.JSON="json"})(nn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return It.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(nn=Y.TraceFormat||(Y.TraceFormat={}));var ag;(function(t){t.type=new Z.NotificationType("$/setTrace")})(ag=Y.SetTraceNotification||(Y.SetTraceNotification={}));var tm;(function(t){t.type=new Z.NotificationType("$/logTrace")})(tm=Y.LogTraceNotification||(Y.LogTraceNotification={}));var hl;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(hl=Y.ConnectionErrors||(Y.ConnectionErrors={}));var zo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=zo;var cg;(function(t){function e(r){let n=r;return n&&It.func(n.cancelUndispatched)}t.is=e})(cg=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var rm;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Qp.CancellationTokenSource}});function e(r){let n=r;return n&&It.func(n.createCancellationTokenSource)}t.is=e})(rm=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var nm;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Pa.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}t.is=e})(nm=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var im;(function(t){t.Message=Object.freeze({receiver:rm.Message,sender:nm.Message});function e(r){let n=r;return n&&rm.is(n.receiver)&&nm.is(n.sender)}t.is=e})(im=Y.CancellationStrategy||(Y.CancellationStrategy={}));var sk;(function(t){function e(r){let n=r;return n&&(im.is(n.cancellationStrategy)||cg.is(n.connectionStrategy))}t.is=e})(sk=Y.ConnectionOptions||(Y.ConnectionOptions={}));var on;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(on||(on={}));function ak(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,c="2.0",l,u=new Map,f,m=new Map,T=new Map,S,A=new og.LinkedMap,N=new Map,C=new Set,v=new Map,g=$e.Off,$=nn.Text,O,X=on.New,ge=new _a.Emitter,Ee=new _a.Emitter,Ht=new _a.Emitter,xt=new _a.Emitter,M=new _a.Emitter,w=n&&n.cancellationStrategy?n.cancellationStrategy:im.Message;function q(x){if(x===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+x.toString()}function j(x){return x===null?"res-unknown-"+(++a).toString():"res-"+x.toString()}function ce(){return"not-"+(++s).toString()}function ee(x,P){Z.Message.isRequest(P)?x.set(q(P.id),P):Z.Message.isResponse(P)?x.set(j(P.id),P):x.set(ce(),P)}function Q(x){}function Rt(){return X===on.Listening}function ut(){return X===on.Closed}function me(){return X===on.Disposed}function Nr(){(X===on.New||X===on.Listening)&&(X=on.Closed,Ee.fire(void 0))}function Bn(x){ge.fire([x,void 0,void 0])}function ka(x){ge.fire(x)}t.onClose(Nr),t.onError(Bn),e.onClose(Nr),e.onError(ka);function eo(){S||A.size===0||(S=(0,ig.default)().timer.setImmediate(()=>{S=void 0,fr()}))}function fr(){if(A.size===0)return;let x=A.shift();try{Z.Message.isRequest(x)?bt(x):Z.Message.isNotification(x)?Sn(x):Z.Message.isResponse(x)?er(x):Kt(x)}finally{eo()}}let Go=x=>{try{if(Z.Message.isNotification(x)&&x.method===Pa.type.method){let P=x.params.id,F=q(P),W=A.get(F);if(Z.Message.isRequest(W)){let De=n?.connectionStrategy,Je=De&&De.cancelUndispatched?De.cancelUndispatched(W,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){A.delete(F),v.delete(P),Je.id=W.id,Rr(Je,x.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let Oe=v.get(P);if(Oe!==void 0){Oe.cancel(),bi(x);return}else C.add(P)}ee(A,x)}finally{eo()}};function bt(x){if(me())return;function P(ue,Ue,Te){let yt={jsonrpc:c,id:x.id};ue instanceof Z.ResponseError?yt.error=ue.toJson():yt.result=ue===void 0?null:ue,Rr(yt,Ue,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function F(ue,Ue,Te){let yt={jsonrpc:c,id:x.id,error:ue.toJson()};Rr(yt,Ue,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}function W(ue,Ue,Te){ue===void 0&&(ue=null);let yt={jsonrpc:c,id:x.id,result:ue};Rr(yt,Ue,Te),e.write(yt).catch(()=>i.error("Sending response failed."))}to(x);let Oe=u.get(x.method),De,Je;Oe&&(De=Oe.type,Je=Oe.handler);let St=Date.now();if(Je||l){let ue=x.id??String(Date.now()),Ue=w.receiver.createCancellationTokenSource(ue);x.id!==null&&C.has(x.id)&&Ue.cancel(),x.id!==null&&v.set(ue,Ue);try{let Te;if(Je)if(x.params===void 0){if(De!==void 0&&De.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines ${De.numberOfParams} params but received none.`),x.method,St);return}Te=Je(Ue.token)}else if(Array.isArray(x.params)){if(De!==void 0&&De.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by name but received parameters by position`),x.method,St);return}Te=Je(...x.params,Ue.token)}else{if(De!==void 0&&De.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${x.method} defines parameters by position but received parameters by name`),x.method,St);return}Te=Je(x.params,Ue.token)}else l&&(Te=l(x.method,x.params,Ue.token));let yt=Te;Te?yt.then?yt.then(tr=>{v.delete(ue),P(tr,x.method,St)},tr=>{v.delete(ue),tr instanceof Z.ResponseError?F(tr,x.method,St):tr&&It.string(tr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${tr.message}`),x.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,St)}):(v.delete(ue),P(Te,x.method,St)):(v.delete(ue),W(Te,x.method,St))}catch(Te){v.delete(ue),Te instanceof Z.ResponseError?P(Te,x.method,St):Te&&It.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed with message: ${Te.message}`),x.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${x.method} failed unexpectedly without providing any details.`),x.method,St)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${x.method}`),x.method,St)}function er(x){if(!me())if(x.id===null)x.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(x.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=x.id,F=N.get(P);if(tp(x,F),F!==void 0){N.delete(P);try{if(x.error){let W=x.error;F.reject(new Z.ResponseError(W.code,W.message,W.data))}else if(x.result!==void 0)F.resolve(x.result);else throw new Error("Should never happen.")}catch(W){W.message?i.error(`Response handler '${F.method}' failed with message: ${W.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function Sn(x){if(me())return;let P,F;if(x.method===Pa.type.method){let W=x.params.id;C.delete(W),bi(x);return}else{let W=m.get(x.method);W&&(F=W.handler,P=W.type)}if(F||f)try{if(bi(x),F)if(x.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(x.params)){let W=x.params;x.method===Ia.type.method&&W.length===2&&sg.is(W[0])?F({token:W[0],value:W[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${x.method} defines parameters by name but received parameters by position`),P.numberOfParams!==x.params.length&&i.error(`Notification ${x.method} defines ${P.numberOfParams} params but received ${W.length} arguments`)),F(...W))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${x.method} defines parameters by position but received parameters by name`),F(x.params);else f&&f(x.method,x.params)}catch(W){W.message?i.error(`Notification handler '${x.method}' failed with message: ${W.message}`):i.error(`Notification handler '${x.method}' failed unexpectedly.`)}else Ht.fire(x)}function Kt(x){if(!x){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(x,null,4)}`);let P=x;if(It.string(P.id)||It.number(P.id)){let F=P.id,W=N.get(F);W&&W.reject(new Error("The received response has neither a result nor an error property."))}}function ft(x){if(x!=null)switch(g){case $e.Verbose:return JSON.stringify(x,null,4);case $e.Compact:return JSON.stringify(x);default:return}}function jr(x){if(!(g===$e.Off||!O))if($===nn.Text){let P;(g===$e.Verbose||g===$e.Compact)&&x.params&&(P=`Params: ${ft(x.params)}

`),O.log(`Sending request '${x.method} - (${x.id})'.`,P)}else Si("send-request",x)}function _r(x){if(!(g===$e.Off||!O))if($===nn.Text){let P;(g===$e.Verbose||g===$e.Compact)&&(x.params?P=`Params: ${ft(x.params)}

`:P=`No parameters provided.

`),O.log(`Sending notification '${x.method}'.`,P)}else Si("send-notification",x)}function Rr(x,P,F){if(!(g===$e.Off||!O))if($===nn.Text){let W;(g===$e.Verbose||g===$e.Compact)&&(x.error&&x.error.data?W=`Error data: ${ft(x.error.data)}

`:x.result?W=`Result: ${ft(x.result)}

`:x.error===void 0&&(W=`No result returned.

`)),O.log(`Sending response '${P} - (${x.id})'. Processing request took ${Date.now()-F}ms`,W)}else Si("send-response",x)}function to(x){if(!(g===$e.Off||!O))if($===nn.Text){let P;(g===$e.Verbose||g===$e.Compact)&&x.params&&(P=`Params: ${ft(x.params)}

`),O.log(`Received request '${x.method} - (${x.id})'.`,P)}else Si("receive-request",x)}function bi(x){if(!(g===$e.Off||!O||x.method===tm.type.method))if($===nn.Text){let P;(g===$e.Verbose||g===$e.Compact)&&(x.params?P=`Params: ${ft(x.params)}

`:P=`No parameters provided.

`),O.log(`Received notification '${x.method}'.`,P)}else Si("receive-notification",x)}function tp(x,P){if(!(g===$e.Off||!O))if($===nn.Text){let F;if((g===$e.Verbose||g===$e.Compact)&&(x.error&&x.error.data?F=`Error data: ${ft(x.error.data)}

`:x.result?F=`Result: ${ft(x.result)}

`:x.error===void 0&&(F=`No result returned.

`)),P){let W=x.error?` Request failed: ${x.error.message} (${x.error.code}).`:"";O.log(`Received response '${P.method} - (${x.id})' in ${Date.now()-P.timerStart}ms.${W}`,F)}else O.log(`Received response ${x.id} without active response promise.`,F)}else Si("receive-response",x)}function Si(x,P){if(!O||g===$e.Off)return;let F={isLSPMessage:!0,type:x,message:P,timestamp:Date.now()};O.log(F)}function ro(){if(ut())throw new zo(hl.Closed,"Connection is closed.");if(me())throw new zo(hl.Disposed,"Connection is disposed.")}function rp(){if(Rt())throw new zo(hl.AlreadyListening,"Connection is already listening")}function np(){if(!Rt())throw new Error("Call listen() first.")}function no(x){return x===void 0?null:x}function jo(x){if(x!==null)return x}function il(x){return x!=null&&!Array.isArray(x)&&typeof x=="object"}function Ea(x,P){switch(x){case Z.ParameterStructures.auto:return il(P)?jo(P):[no(P)];case Z.ParameterStructures.byName:if(!il(P))throw new Error("Received parameters by name but param is not an object literal.");return jo(P);case Z.ParameterStructures.byPosition:return[no(P)];default:throw new Error(`Unknown parameter structure ${x.toString()}`)}}function ol(x,P){let F,W=x.numberOfParams;switch(W){case 0:F=void 0;break;case 1:F=Ea(x.parameterStructures,P[0]);break;default:F=[];for(let Oe=0;Oe<P.length&&Oe<W;Oe++)F.push(no(P[Oe]));if(P.length<W)for(let Oe=P.length;Oe<W;Oe++)F.push(null);break}return F}let wi={sendNotification:(x,...P)=>{ro();let F,W;if(It.string(x)){F=x;let De=P[0],Je=0,St=Z.ParameterStructures.auto;Z.ParameterStructures.is(De)&&(Je=1,St=De);let ue=P.length,Ue=ue-Je;switch(Ue){case 0:W=void 0;break;case 1:W=Ea(St,P[Je]);break;default:if(St===Z.ParameterStructures.byName)throw new Error(`Received ${Ue} parameters for 'by Name' notification parameter structure.`);W=P.slice(Je,ue).map(Te=>no(Te));break}}else{let De=P;F=x.method,W=ol(x,De)}let Oe={jsonrpc:c,method:F,params:W};return _r(Oe),e.write(Oe).catch(()=>i.error("Sending notification failed."))},onNotification:(x,P)=>{ro();let F;return It.func(x)?f=x:P&&(It.string(x)?(F=x,m.set(x,{type:void 0,handler:P})):(F=x.method,m.set(x.method,{type:x,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(x,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(x,P,F)=>wi.sendNotification(Ia.type,{token:P,value:F}),onUnhandledProgress:xt.event,sendRequest:(x,...P)=>{ro(),np();let F,W,Oe;if(It.string(x)){F=x;let ue=P[0],Ue=P[P.length-1],Te=0,yt=Z.ParameterStructures.auto;Z.ParameterStructures.is(ue)&&(Te=1,yt=ue);let tr=P.length;Qp.CancellationToken.is(Ue)&&(tr=tr-1,Oe=Ue);let Wn=tr-Te;switch(Wn){case 0:W=void 0;break;case 1:W=Ea(yt,P[Te]);break;default:if(yt===Z.ParameterStructures.byName)throw new Error(`Received ${Wn} parameters for 'by Name' request parameter structure.`);W=P.slice(Te,tr).map(wn=>no(wn));break}}else{let ue=P;F=x.method,W=ol(x,ue);let Ue=x.numberOfParams;Oe=Qp.CancellationToken.is(ue[Ue])?ue[Ue]:void 0}let De=o++,Je;return Oe&&(Je=Oe.onCancellationRequested(()=>{let ue=w.sender.sendCancellation(wi,De);return ue===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${De}`),Promise.resolve()):ue.catch(()=>{i.log(`Sending cancellation messages for id ${De} failed`)})})),new Promise((ue,Ue)=>{let Te={jsonrpc:c,id:De,method:F,params:W},yt=wn=>{ue(wn),w.sender.cleanup(De),Je?.dispose()},tr=wn=>{Ue(wn),w.sender.cleanup(De),Je?.dispose()},Wn={method:F,timerStart:Date.now(),resolve:yt,reject:tr};jr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(wn){Wn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,wn.message?wn.message:"Unknown reason")),Wn=null}Wn&&N.set(De,Wn)})},onRequest:(x,P)=>{ro();let F=null;return em.is(x)?(F=void 0,l=x):It.string(x)?(F=null,P!==void 0&&(F=x,u.set(x,{handler:P,type:void 0}))):P!==void 0&&(F=x.method,u.set(x.method,{type:x,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?u.delete(F):l=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(x,P,F)=>{let W=!1,Oe=nn.Text;F!==void 0&&(It.boolean(F)?W=F:(W=F.sendNotification||!1,Oe=F.traceFormat||nn.Text)),g=x,$=Oe,g===$e.Off?O=void 0:O=P,W&&!ut()&&!me()&&await wi.sendNotification(ag.type,{value:$e.toString(x)})},onError:ge.event,onClose:Ee.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=on.Disposed,M.fire(void 0);let x=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of N.values())P.reject(x);N=new Map,v=new Map,C=new Set,A=new og.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(t.dispose)&&t.dispose()},listen:()=>{ro(),rp(),X=on.Listening,t.listen(Go)},inspect:()=>{(0,ig.default)().console.log("inspect")}};return wi.onNotification(tm.type,x=>{if(g===$e.Off||!O)return;let P=g===$e.Verbose||g===$e.Compact;O.log(x.message,P?x.verbose:void 0)}),wi.onNotification(Ia.type,x=>{let P=T.get(x.token);P?P(x.value):xt.fire(x)}),wi}Y.createMessageConnection=ak});var cm=H(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.TraceFormat=_.TraceValues=_.Trace=_.ProgressType=_.ProgressToken=_.createMessageConnection=_.NullLogger=_.ConnectionOptions=_.ConnectionStrategy=_.WriteableStreamMessageWriter=_.AbstractMessageWriter=_.MessageWriter=_.ReadableStreamMessageReader=_.AbstractMessageReader=_.MessageReader=_.CancellationToken=_.CancellationTokenSource=_.Emitter=_.Event=_.Disposable=_.LRUCache=_.Touch=_.LinkedMap=_.ParameterStructures=_.NotificationType9=_.NotificationType8=_.NotificationType7=_.NotificationType6=_.NotificationType5=_.NotificationType4=_.NotificationType3=_.NotificationType2=_.NotificationType1=_.NotificationType0=_.NotificationType=_.ErrorCodes=_.ResponseError=_.RequestType9=_.RequestType8=_.RequestType7=_.RequestType6=_.RequestType5=_.RequestType4=_.RequestType3=_.RequestType2=_.RequestType1=_.RequestType0=_.RequestType=_.Message=_.RAL=void 0;_.CancellationStrategy=_.CancellationSenderStrategy=_.CancellationReceiverStrategy=_.ConnectionError=_.ConnectionErrors=_.LogTraceNotification=_.SetTraceNotification=void 0;var Ge=Fp();Object.defineProperty(_,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty(_,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty(_,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty(_,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty(_,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty(_,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty(_,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty(_,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty(_,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty(_,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty(_,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty(_,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty(_,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty(_,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty(_,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty(_,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty(_,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty(_,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty(_,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty(_,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty(_,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty(_,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty(_,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty(_,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty(_,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty(_,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var om=qp();Object.defineProperty(_,"LinkedMap",{enumerable:!0,get:function(){return om.LinkedMap}});Object.defineProperty(_,"LRUCache",{enumerable:!0,get:function(){return om.LRUCache}});Object.defineProperty(_,"Touch",{enumerable:!0,get:function(){return om.Touch}});var ck=cp();Object.defineProperty(_,"Disposable",{enumerable:!0,get:function(){return ck.Disposable}});var ug=oo();Object.defineProperty(_,"Event",{enumerable:!0,get:function(){return ug.Event}});Object.defineProperty(_,"Emitter",{enumerable:!0,get:function(){return ug.Emitter}});var fg=Kp();Object.defineProperty(_,"CancellationTokenSource",{enumerable:!0,get:function(){return fg.CancellationTokenSource}});Object.defineProperty(_,"CancellationToken",{enumerable:!0,get:function(){return fg.CancellationToken}});var sm=Qy();Object.defineProperty(_,"MessageReader",{enumerable:!0,get:function(){return sm.MessageReader}});Object.defineProperty(_,"AbstractMessageReader",{enumerable:!0,get:function(){return sm.AbstractMessageReader}});Object.defineProperty(_,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return sm.ReadableStreamMessageReader}});var am=ng();Object.defineProperty(_,"MessageWriter",{enumerable:!0,get:function(){return am.MessageWriter}});Object.defineProperty(_,"AbstractMessageWriter",{enumerable:!0,get:function(){return am.AbstractMessageWriter}});Object.defineProperty(_,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return am.WriteableStreamMessageWriter}});var nr=lg();Object.defineProperty(_,"ConnectionStrategy",{enumerable:!0,get:function(){return nr.ConnectionStrategy}});Object.defineProperty(_,"ConnectionOptions",{enumerable:!0,get:function(){return nr.ConnectionOptions}});Object.defineProperty(_,"NullLogger",{enumerable:!0,get:function(){return nr.NullLogger}});Object.defineProperty(_,"createMessageConnection",{enumerable:!0,get:function(){return nr.createMessageConnection}});Object.defineProperty(_,"ProgressToken",{enumerable:!0,get:function(){return nr.ProgressToken}});Object.defineProperty(_,"ProgressType",{enumerable:!0,get:function(){return nr.ProgressType}});Object.defineProperty(_,"Trace",{enumerable:!0,get:function(){return nr.Trace}});Object.defineProperty(_,"TraceValues",{enumerable:!0,get:function(){return nr.TraceValues}});Object.defineProperty(_,"TraceFormat",{enumerable:!0,get:function(){return nr.TraceFormat}});Object.defineProperty(_,"SetTraceNotification",{enumerable:!0,get:function(){return nr.SetTraceNotification}});Object.defineProperty(_,"LogTraceNotification",{enumerable:!0,get:function(){return nr.LogTraceNotification}});Object.defineProperty(_,"ConnectionErrors",{enumerable:!0,get:function(){return nr.ConnectionErrors}});Object.defineProperty(_,"ConnectionError",{enumerable:!0,get:function(){return nr.ConnectionError}});Object.defineProperty(_,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return nr.CancellationReceiverStrategy}});Object.defineProperty(_,"CancellationSenderStrategy",{enumerable:!0,get:function(){return nr.CancellationSenderStrategy}});Object.defineProperty(_,"CancellationStrategy",{enumerable:!0,get:function(){return nr.CancellationStrategy}});var lk=Vn();_.RAL=lk.default});var Qn=H(Ir=>{"use strict";var uk=Ir&&Ir.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),fk=Ir&&Ir.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&uk(e,t,r)};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.createMessageConnection=Ir.BrowserMessageWriter=Ir.BrowserMessageReader=void 0;var dk=zy();dk.default.install();var Vo=cm();fk(cm(),Ir);var lm=class extends Vo.AbstractMessageReader{constructor(e){super(),this._onData=new Vo.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Ir.BrowserMessageReader=lm;var um=class extends Vo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Ir.BrowserMessageWriter=um;function pk(t,e,r,n){return r===void 0&&(r=Vo.NullLogger),Vo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Vo.createMessageConnection)(t,e,r,n)}Ir.createMessageConnection=pk});var fm=H((fj,dg)=>{"use strict";dg.exports=Qn()});var co=H((pg,yl)=>{(function(t){if(typeof yl=="object"&&typeof yl.exports=="object"){var e=t(Hy,pg);e!==void 0&&(yl.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function R(b){return typeof b=="string"}p.is=R})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function R(b){return typeof b=="string"}p.is=R})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function R(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=R})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function R(y,d){return y===Number.MAX_VALUE&&(y=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:y,character:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function R(y,d,E,I){if(k.uinteger(y)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(I))return{start:s.create(y,d),end:s.create(E,I)};if(s.is(y)&&s.is(d))return{start:y,end:d};throw new Error("Range#create called with invalid arguments[".concat(y,", ").concat(d,", ").concat(E,", ").concat(I,"]"))}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function R(y,d){return{uri:y,range:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var l;(function(p){function R(y,d,E,I){return{targetUri:y,targetRange:d,targetSelectionRange:E,originSelectionRange:I}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(l=e.LocationLink||(e.LocationLink={}));var u;(function(p){function R(y,d,E,I){return{red:y,green:d,blue:E,alpha:I}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(u=e.Color||(e.Color={}));var f;(function(p){function R(y,d){return{range:y,color:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&u.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function R(y,d,E){return{label:y,textEdit:d,additionalTextEdits:E}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||O.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,O.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var S;(function(p){function R(y,d,E,I,re,dt){var qe={startLine:y,endLine:d};return k.defined(E)&&(qe.startCharacter=E),k.defined(I)&&(qe.endCharacter=I),k.defined(re)&&(qe.kind=re),k.defined(dt)&&(qe.collapsedText=dt),qe}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(S=e.FoldingRange||(e.FoldingRange={}));var A;(function(p){function R(y,d){return{location:y,message:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&c.is(d.location)&&k.string(d.message)}p.is=b})(A=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var C;(function(p){p.Unnecessary=1,p.Deprecated=2})(C=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&k.string(y.href)}p.is=R})(v=e.CodeDescription||(e.CodeDescription={}));var g;(function(p){function R(y,d,E,I,re,dt){var qe={range:y,message:d};return k.defined(E)&&(qe.severity=E),k.defined(I)&&(qe.code=I),k.defined(re)&&(qe.source=re),k.defined(dt)&&(qe.relatedInformation=dt),qe}p.create=R;function b(y){var d,E=y;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,A.is))}p.is=b})(g=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function R(y,d){for(var E=[],I=2;I<arguments.length;I++)E[I-2]=arguments[I];var re={title:y,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})($=e.Command||(e.Command={}));var O;(function(p){function R(E,I){return{range:E,newText:I}}p.replace=R;function b(E,I){return{range:{start:E,end:E},newText:I}}p.insert=b;function y(E){return{range:E,newText:""}}p.del=y;function d(E){var I=E;return k.objectLiteral(I)&&k.string(I.newText)&&a.is(I.range)}p.is=d})(O=e.TextEdit||(e.TextEdit={}));var X;(function(p){function R(y,d,E){var I={label:y};return d!==void 0&&(I.needsConfirmation=d),E!==void 0&&(I.description=E),I}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ge;(function(p){function R(b){var y=b;return k.string(y)}p.is=R})(ge=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function R(E,I,re){return{range:E,newText:I,annotationId:re}}p.replace=R;function b(E,I,re){return{range:{start:E,end:E},newText:I,annotationId:re}}p.insert=b;function y(E,I){return{range:E,newText:"",annotationId:I}}p.del=y;function d(E){var I=E;return O.is(I)&&(X.is(I.annotationId)||ge.is(I.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function R(y,d){return{textDocument:y,edits:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&ut.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var xt;(function(p){function R(y,d,E){var I={kind:"create",uri:y};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(y){var d=y;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(xt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function R(y,d,E,I){var re={kind:"rename",oldUri:y,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),I!==void 0&&(re.annotationId=I),re}p.create=R;function b(y){var d=y;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var w;(function(p){function R(y,d,E){var I={kind:"delete",uri:y};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=R;function b(y){var d=y;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ge.is(d.annotationId))}p.is=b})(w=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function R(b){var y=b;return y&&(y.changes!==void 0||y.documentChanges!==void 0)&&(y.documentChanges===void 0||y.documentChanges.every(function(d){return k.string(d.kind)?xt.is(d)||M.is(d)||w.is(d):Ht.is(d)}))}p.is=R})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(R,b){this.edits=R,this.changeAnnotations=b}return p.prototype.insert=function(R,b,y){var d,E;if(y===void 0?d=O.insert(R,b):ge.is(y)?(E=y,d=Ee.insert(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=Ee.insert(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(R,b,y){var d,E;if(y===void 0?d=O.replace(R,b):ge.is(y)?(E=y,d=Ee.replace(R,b,y)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(y),d=Ee.replace(R,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(R,b){var y,d;if(b===void 0?y=O.del(R):ge.is(b)?(d=b,y=Ee.del(R,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),y=Ee.del(R,d)),this.edits.push(y),d!==void 0)return d},p.prototype.add=function(R){this.edits.push(R)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(R){if(R===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(R){this._annotations=R===void 0?Object.create(null):R,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(R,b){var y;if(ge.is(R)?y=R:(y=this.nextId(),b=R),this._annotations[y]!==void 0)throw new Error("Id ".concat(y," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(y));return this._annotations[y]=b,this._size++,y},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(R){var b=this;this._textEditChanges=Object.create(null),R!==void 0?(this._workspaceEdit=R,R.documentChanges?(this._changeAnnotations=new ce(R.changeAnnotations),R.changeAnnotations=this._changeAnnotations.all(),R.documentChanges.forEach(function(y){if(Ht.is(y)){var d=new j(y.edits,b._changeAnnotations);b._textEditChanges[y.textDocument.uri]=d}})):R.changes&&Object.keys(R.changes).forEach(function(y){var d=new j(R.changes[y]);b._textEditChanges[y]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(R){if(ut.is(R)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:R.uri,version:R.version},y=this._textEditChanges[b.uri];if(!y){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),y=new j(d,this._changeAnnotations),this._textEditChanges[b.uri]=y}return y}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var y=this._textEditChanges[R];if(!y){var d=[];this._workspaceEdit.changes[R]=d,y=new j(d),this._textEditChanges[R]=y}return y}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:y=b;var E,I;if(d===void 0?E=xt.create(R,y):(I=ge.is(d)?d:this._changeAnnotations.manage(d),E=xt.create(R,y,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p.prototype.renameFile=function(R,b,y,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(y)||ge.is(y)?E=y:d=y;var I,re;if(E===void 0?I=M.create(R,b,d):(re=ge.is(E)?E:this._changeAnnotations.manage(E),I=M.create(R,b,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(R,b,y){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ge.is(b)?d=b:y=b;var E,I;if(d===void 0?E=w.create(R,y):(I=ge.is(d)?d:this._changeAnnotations.manage(d),E=w.create(R,y,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function R(y){return{uri:y}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var Rt;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(Rt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ut;(function(p){function R(y,d){return{uri:y,version:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(ut=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function R(y,d,E,I){return{uri:y,languageId:d,version:E,text:I}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var Nr;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function R(b){var y=b;return y===p.PlainText||y===p.Markdown}p.is=R})(Nr=e.MarkupKind||(e.MarkupKind={}));var Bn;(function(p){function R(b){var y=b;return k.objectLiteral(b)&&Nr.is(y.kind)&&k.string(y.value)}p.is=R})(Bn=e.MarkupContent||(e.MarkupContent={}));var ka;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(ka=e.CompletionItemKind||(e.CompletionItemKind={}));var eo;(function(p){p.PlainText=1,p.Snippet=2})(eo=e.InsertTextFormat||(e.InsertTextFormat={}));var fr;(function(p){p.Deprecated=1})(fr=e.CompletionItemTag||(e.CompletionItemTag={}));var Go;(function(p){function R(y,d,E){return{newText:y,insert:d,replace:E}}p.create=R;function b(y){var d=y;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(Go=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var bt;(function(p){p.asIs=1,p.adjustIndentation=2})(bt=e.InsertTextMode||(e.InsertTextMode={}));var er;(function(p){function R(b){var y=b;return y&&(k.string(y.detail)||y.detail===void 0)&&(k.string(y.description)||y.description===void 0)}p.is=R})(er=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var Sn;(function(p){function R(b){return{label:b}}p.create=R})(Sn=e.CompletionItem||(e.CompletionItem={}));var Kt;(function(p){function R(b,y){return{items:b||[],isIncomplete:!!y}}p.create=R})(Kt=e.CompletionList||(e.CompletionList={}));var ft;(function(p){function R(y){return y.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=R;function b(y){var d=y;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(ft=e.MarkedString||(e.MarkedString={}));var jr;(function(p){function R(b){var y=b;return!!y&&k.objectLiteral(y)&&(Bn.is(y.contents)||ft.is(y.contents)||k.typedArray(y.contents,ft.is))&&(b.range===void 0||a.is(b.range))}p.is=R})(jr=e.Hover||(e.Hover={}));var _r;(function(p){function R(b,y){return y?{label:b,documentation:y}:{label:b}}p.create=R})(_r=e.ParameterInformation||(e.ParameterInformation={}));var Rr;(function(p){function R(b,y){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var I={label:b};return k.defined(y)&&(I.documentation=y),k.defined(d)?I.parameters=d:I.parameters=[],I}p.create=R})(Rr=e.SignatureInformation||(e.SignatureInformation={}));var to;(function(p){p.Text=1,p.Read=2,p.Write=3})(to=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var bi;(function(p){function R(b,y){var d={range:b};return k.number(y)&&(d.kind=y),d}p.create=R})(bi=e.DocumentHighlight||(e.DocumentHighlight={}));var tp;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(tp=e.SymbolKind||(e.SymbolKind={}));var Si;(function(p){p.Deprecated=1})(Si=e.SymbolTag||(e.SymbolTag={}));var ro;(function(p){function R(b,y,d,E,I){var re={name:b,kind:y,location:{uri:E,range:d}};return I&&(re.containerName=I),re}p.create=R})(ro=e.SymbolInformation||(e.SymbolInformation={}));var rp;(function(p){function R(b,y,d,E){return E!==void 0?{name:b,kind:y,location:{uri:d,range:E}}:{name:b,kind:y,location:{uri:d}}}p.create=R})(rp=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var np;(function(p){function R(y,d,E,I,re,dt){var qe={name:y,detail:d,kind:E,range:I,selectionRange:re};return dt!==void 0&&(qe.children=dt),qe}p.create=R;function b(y){var d=y;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(np=e.DocumentSymbol||(e.DocumentSymbol={}));var no;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(no=e.CodeActionKind||(e.CodeActionKind={}));var jo;(function(p){p.Invoked=1,p.Automatic=2})(jo=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var il;(function(p){function R(y,d,E){var I={diagnostics:y};return d!=null&&(I.only=d),E!=null&&(I.triggerKind=E),I}p.create=R;function b(y){var d=y;return k.defined(d)&&k.typedArray(d.diagnostics,g.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===jo.Invoked||d.triggerKind===jo.Automatic)}p.is=b})(il=e.CodeActionContext||(e.CodeActionContext={}));var Ea;(function(p){function R(y,d,E){var I={title:y},re=!0;return typeof d=="string"?(re=!1,I.kind=d):$.is(d)?I.command=d:I.edit=d,re&&E!==void 0&&(I.kind=E),I}p.create=R;function b(y){var d=y;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,g.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(Ea=e.CodeAction||(e.CodeAction={}));var ol;(function(p){function R(y,d){var E={range:y};return k.defined(d)&&(E.data=d),E}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=b})(ol=e.CodeLens||(e.CodeLens={}));var wi;(function(p){function R(y,d){return{tabSize:y,insertSpaces:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(wi=e.FormattingOptions||(e.FormattingOptions={}));var x;(function(p){function R(y,d,E){return{range:y,target:d,data:E}}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(x=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function R(y,d){return{range:y,parent:d}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var W;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(W=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var Oe;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&(y.resultId===void 0||typeof y.resultId=="string")&&Array.isArray(y.data)&&(y.data.length===0||typeof y.data[0]=="number")}p.is=R})(Oe=e.SemanticTokens||(e.SemanticTokens={}));var De;(function(p){function R(y,d){return{range:y,text:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(De=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function R(y,d,E){return{range:y,variableName:d,caseSensitiveLookup:E}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var St;(function(p){function R(y,d){return{range:y,expression:d}}p.create=R;function b(y){var d=y;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(St=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ue;(function(p){function R(y,d){return{frameId:y,stoppedLocation:d}}p.create=R;function b(y){var d=y;return k.defined(d)&&a.is(y.stoppedLocation)}p.is=b})(ue=e.InlineValueContext||(e.InlineValueContext={}));var Ue;(function(p){p.Type=1,p.Parameter=2;function R(b){return b===1||b===2}p.is=R})(Ue=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function R(y){return{value:y}}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var yt;(function(p){function R(y,d,E){var I={position:y,label:d};return E!==void 0&&(I.kind=E),I}p.create=R;function b(y){var d=y;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||Ue.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,O.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Bn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(yt=e.InlayHint||(e.InlayHint={}));var tr;(function(p){function R(b){var y=b;return k.objectLiteral(y)&&n.is(y.uri)&&k.string(y.name)}p.is=R})(tr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Wn;(function(p){function R(E,I,re,dt){return new wn(E,I,re,dt)}p.create=R;function b(E){var I=E;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}p.is=b;function y(E,I){for(var re=E.getText(),dt=d(I,function(Ho,sl){var jy=Ho.range.start.line-sl.range.start.line;return jy===0?Ho.range.start.character-sl.range.start.character:jy}),qe=re.length,tn=dt.length-1;tn>=0;tn--){var rn=dt[tn],zn=E.offsetAt(rn.range.start),fe=E.offsetAt(rn.range.end);if(fe<=qe)re=re.substring(0,zn)+rn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");qe=zn}return re}p.applyEdits=y;function d(E,I){if(E.length<=1)return E;var re=E.length/2|0,dt=E.slice(0,re),qe=E.slice(re);d(dt,I),d(qe,I);for(var tn=0,rn=0,zn=0;tn<dt.length&&rn<qe.length;){var fe=I(dt[tn],qe[rn]);fe<=0?E[zn++]=dt[tn++]:E[zn++]=qe[rn++]}for(;tn<dt.length;)E[zn++]=dt[tn++];for(;rn<qe.length;)E[zn++]=qe[rn++];return E}})(Wn=e.TextDocument||(e.TextDocument={}));var wn=function(){function p(R,b,y,d){this._uri=R,this._languageId=b,this._version=y,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(R){if(R){var b=this.offsetAt(R.start),y=this.offsetAt(R.end);return this._content.substring(b,y)}return this._content},p.prototype.update=function(R,b){this._content=R.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var R=[],b=this._content,y=!0,d=0;d<b.length;d++){y&&(R.push(d),y=!1);var E=b.charAt(d);y=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}y&&b.length>0&&R.push(b.length),this._lineOffsets=R}return this._lineOffsets},p.prototype.positionAt=function(R){R=Math.max(Math.min(R,this._content.length),0);var b=this.getLineOffsets(),y=0,d=b.length;if(d===0)return s.create(0,R);for(;y<d;){var E=Math.floor((y+d)/2);b[E]>R?d=E:y=E+1}var I=y-1;return s.create(I,R-b[I])},p.prototype.offsetAt=function(R){var b=this.getLineOffsets();if(R.line>=b.length)return this._content.length;if(R.line<0)return 0;var y=b[R.line],d=R.line+1<b.length?b[R.line+1]:this._content.length;return Math.max(Math.min(y+R.character,d),y)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var R=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function y(fe){return typeof fe>"u"}p.undefined=y;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return R.call(fe)==="[object String]"}p.string=E;function I(fe){return R.call(fe)==="[object Number]"}p.number=I;function re(fe,Ho,sl){return R.call(fe)==="[object Number]"&&Ho<=fe&&fe<=sl}p.numberRange=re;function dt(fe){return R.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=dt;function qe(fe){return R.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=qe;function tn(fe){return R.call(fe)==="[object Function]"}p.func=tn;function rn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=rn;function zn(fe,Ho){return Array.isArray(fe)&&fe.every(Ho)}p.typedArray=zn})(k||(k={}))})});var it=H(pr=>{"use strict";Object.defineProperty(pr,"__esModule",{value:!0});pr.ProtocolNotificationType=pr.ProtocolNotificationType0=pr.ProtocolRequestType=pr.ProtocolRequestType0=pr.RegistrationType=pr.MessageDirection=void 0;var Xo=Qn(),mk;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(mk=pr.MessageDirection||(pr.MessageDirection={}));var dm=class{constructor(e){this.method=e}};pr.RegistrationType=dm;var pm=class extends Xo.RequestType0{constructor(e){super(e)}};pr.ProtocolRequestType0=pm;var mm=class extends Xo.RequestType{constructor(e){super(e,Xo.ParameterStructures.byName)}};pr.ProtocolRequestType=mm;var hm=class extends Xo.NotificationType0{constructor(e){super(e)}};pr.ProtocolNotificationType0=hm;var ym=class extends Xo.NotificationType{constructor(e){super(e,Xo.ParameterStructures.byName)}};pr.ProtocolNotificationType=ym});var gl=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.objectLiteral=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function hk(t){return t===!0||t===!1}wt.boolean=hk;function mg(t){return typeof t=="string"||t instanceof String}wt.string=mg;function yk(t){return typeof t=="number"||t instanceof Number}wt.number=yk;function gk(t){return t instanceof Error}wt.error=gk;function Tk(t){return typeof t=="function"}wt.func=Tk;function hg(t){return Array.isArray(t)}wt.array=hg;function vk(t){return hg(t)&&t.every(e=>mg(e))}wt.stringArray=vk;function xk(t,e){return Array.isArray(t)&&t.every(e)}wt.typedArray=xk;function Rk(t){return t!==null&&typeof t=="object"}wt.objectLiteral=Rk});var gg=H(Oa=>{"use strict";Object.defineProperty(Oa,"__esModule",{value:!0});Oa.ImplementationRequest=void 0;var yg=it(),bk;(function(t){t.method="textDocument/implementation",t.messageDirection=yg.MessageDirection.clientToServer,t.type=new yg.ProtocolRequestType(t.method)})(bk=Oa.ImplementationRequest||(Oa.ImplementationRequest={}))});var vg=H(Da=>{"use strict";Object.defineProperty(Da,"__esModule",{value:!0});Da.TypeDefinitionRequest=void 0;var Tg=it(),Sk;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=Tg.MessageDirection.clientToServer,t.type=new Tg.ProtocolRequestType(t.method)})(Sk=Da.TypeDefinitionRequest||(Da.TypeDefinitionRequest={}))});var xg=H(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.DidChangeWorkspaceFoldersNotification=Ai.WorkspaceFoldersRequest=void 0;var Tl=it(),wk;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=Tl.MessageDirection.serverToClient,t.type=new Tl.ProtocolRequestType0(t.method)})(wk=Ai.WorkspaceFoldersRequest||(Ai.WorkspaceFoldersRequest={}));var Ak;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=Tl.MessageDirection.clientToServer,t.type=new Tl.ProtocolNotificationType(t.method)})(Ak=Ai.DidChangeWorkspaceFoldersNotification||(Ai.DidChangeWorkspaceFoldersNotification={}))});var bg=H(La=>{"use strict";Object.defineProperty(La,"__esModule",{value:!0});La.ConfigurationRequest=void 0;var Rg=it(),Ck;(function(t){t.method="workspace/configuration",t.messageDirection=Rg.MessageDirection.serverToClient,t.type=new Rg.ProtocolRequestType(t.method)})(Ck=La.ConfigurationRequest||(La.ConfigurationRequest={}))});var Sg=H(Ci=>{"use strict";Object.defineProperty(Ci,"__esModule",{value:!0});Ci.ColorPresentationRequest=Ci.DocumentColorRequest=void 0;var vl=it(),kk;(function(t){t.method="textDocument/documentColor",t.messageDirection=vl.MessageDirection.clientToServer,t.type=new vl.ProtocolRequestType(t.method)})(kk=Ci.DocumentColorRequest||(Ci.DocumentColorRequest={}));var Ek;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=vl.MessageDirection.clientToServer,t.type=new vl.ProtocolRequestType(t.method)})(Ek=Ci.ColorPresentationRequest||(Ci.ColorPresentationRequest={}))});var Ag=H(Ma=>{"use strict";Object.defineProperty(Ma,"__esModule",{value:!0});Ma.FoldingRangeRequest=void 0;var wg=it(),$k;(function(t){t.method="textDocument/foldingRange",t.messageDirection=wg.MessageDirection.clientToServer,t.type=new wg.ProtocolRequestType(t.method)})($k=Ma.FoldingRangeRequest||(Ma.FoldingRangeRequest={}))});var kg=H(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.DeclarationRequest=void 0;var Cg=it(),Nk;(function(t){t.method="textDocument/declaration",t.messageDirection=Cg.MessageDirection.clientToServer,t.type=new Cg.ProtocolRequestType(t.method)})(Nk=Fa.DeclarationRequest||(Fa.DeclarationRequest={}))});var $g=H(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.SelectionRangeRequest=void 0;var Eg=it(),_k;(function(t){t.method="textDocument/selectionRange",t.messageDirection=Eg.MessageDirection.clientToServer,t.type=new Eg.ProtocolRequestType(t.method)})(_k=Ua.SelectionRangeRequest||(Ua.SelectionRangeRequest={}))});var Ng=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.WorkDoneProgressCancelNotification=sn.WorkDoneProgressCreateRequest=sn.WorkDoneProgress=void 0;var Ik=Qn(),xl=it(),Pk;(function(t){t.type=new Ik.ProgressType;function e(r){return r===t.type}t.is=e})(Pk=sn.WorkDoneProgress||(sn.WorkDoneProgress={}));var Ok;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=xl.MessageDirection.serverToClient,t.type=new xl.ProtocolRequestType(t.method)})(Ok=sn.WorkDoneProgressCreateRequest||(sn.WorkDoneProgressCreateRequest={}));var Dk;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=xl.MessageDirection.clientToServer,t.type=new xl.ProtocolNotificationType(t.method)})(Dk=sn.WorkDoneProgressCancelNotification||(sn.WorkDoneProgressCancelNotification={}))});var _g=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.CallHierarchyOutgoingCallsRequest=an.CallHierarchyIncomingCallsRequest=an.CallHierarchyPrepareRequest=void 0;var Yo=it(),Lk;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(Lk=an.CallHierarchyPrepareRequest||(an.CallHierarchyPrepareRequest={}));var Mk;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(Mk=an.CallHierarchyIncomingCallsRequest||(an.CallHierarchyIncomingCallsRequest={}));var Fk;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Yo.MessageDirection.clientToServer,t.type=new Yo.ProtocolRequestType(t.method)})(Fk=an.CallHierarchyOutgoingCallsRequest||(an.CallHierarchyOutgoingCallsRequest={}))});var Ig=H(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.SemanticTokensRefreshRequest=At.SemanticTokensRangeRequest=At.SemanticTokensDeltaRequest=At.SemanticTokensRequest=At.SemanticTokensRegistrationType=At.TokenFormat=void 0;var Zn=it(),Uk;(function(t){t.Relative="relative"})(Uk=At.TokenFormat||(At.TokenFormat={}));var Rl;(function(t){t.method="textDocument/semanticTokens",t.type=new Zn.RegistrationType(t.method)})(Rl=At.SemanticTokensRegistrationType||(At.SemanticTokensRegistrationType={}));var qk;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=Rl.method})(qk=At.SemanticTokensRequest||(At.SemanticTokensRequest={}));var Gk;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=Rl.method})(Gk=At.SemanticTokensDeltaRequest||(At.SemanticTokensDeltaRequest={}));var jk;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType(t.method),t.registrationMethod=Rl.method})(jk=At.SemanticTokensRangeRequest||(At.SemanticTokensRangeRequest={}));var Hk;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Zn.MessageDirection.clientToServer,t.type=new Zn.ProtocolRequestType0(t.method)})(Hk=At.SemanticTokensRefreshRequest||(At.SemanticTokensRefreshRequest={}))});var Og=H(qa=>{"use strict";Object.defineProperty(qa,"__esModule",{value:!0});qa.ShowDocumentRequest=void 0;var Pg=it(),Kk;(function(t){t.method="window/showDocument",t.messageDirection=Pg.MessageDirection.serverToClient,t.type=new Pg.ProtocolRequestType(t.method)})(Kk=qa.ShowDocumentRequest||(qa.ShowDocumentRequest={}))});var Lg=H(Ga=>{"use strict";Object.defineProperty(Ga,"__esModule",{value:!0});Ga.LinkedEditingRangeRequest=void 0;var Dg=it(),Bk;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Dg.MessageDirection.clientToServer,t.type=new Dg.ProtocolRequestType(t.method)})(Bk=Ga.LinkedEditingRangeRequest||(Ga.LinkedEditingRangeRequest={}))});var Mg=H(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var Hr=it(),Wk;(function(t){t.file="file",t.folder="folder"})(Wk=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var zk;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolRequestType(t.method)})(zk=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var Vk;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolNotificationType(t.method)})(Vk=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var Xk;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolRequestType(t.method)})(Xk=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var Yk;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolNotificationType(t.method)})(Yk=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var Jk;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolNotificationType(t.method)})(Jk=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var Qk;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Hr.MessageDirection.clientToServer,t.type=new Hr.ProtocolRequestType(t.method)})(Qk=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var Ug=H(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.MonikerRequest=cn.MonikerKind=cn.UniquenessLevel=void 0;var Fg=it(),Zk;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(Zk=cn.UniquenessLevel||(cn.UniquenessLevel={}));var eE;(function(t){t.$import="import",t.$export="export",t.local="local"})(eE=cn.MonikerKind||(cn.MonikerKind={}));var tE;(function(t){t.method="textDocument/moniker",t.messageDirection=Fg.MessageDirection.clientToServer,t.type=new Fg.ProtocolRequestType(t.method)})(tE=cn.MonikerRequest||(cn.MonikerRequest={}))});var qg=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.TypeHierarchySubtypesRequest=ln.TypeHierarchySupertypesRequest=ln.TypeHierarchyPrepareRequest=void 0;var Jo=it(),rE;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(rE=ln.TypeHierarchyPrepareRequest||(ln.TypeHierarchyPrepareRequest={}));var nE;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(nE=ln.TypeHierarchySupertypesRequest||(ln.TypeHierarchySupertypesRequest={}));var iE;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Jo.MessageDirection.clientToServer,t.type=new Jo.ProtocolRequestType(t.method)})(iE=ln.TypeHierarchySubtypesRequest||(ln.TypeHierarchySubtypesRequest={}))});var Gg=H(ki=>{"use strict";Object.defineProperty(ki,"__esModule",{value:!0});ki.InlineValueRefreshRequest=ki.InlineValueRequest=void 0;var bl=it(),oE;(function(t){t.method="textDocument/inlineValue",t.messageDirection=bl.MessageDirection.clientToServer,t.type=new bl.ProtocolRequestType(t.method)})(oE=ki.InlineValueRequest||(ki.InlineValueRequest={}));var sE;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=bl.MessageDirection.clientToServer,t.type=new bl.ProtocolRequestType0(t.method)})(sE=ki.InlineValueRefreshRequest||(ki.InlineValueRefreshRequest={}))});var jg=H(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.InlayHintRefreshRequest=un.InlayHintResolveRequest=un.InlayHintRequest=void 0;var Qo=it(),aE;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method)})(aE=un.InlayHintRequest||(un.InlayHintRequest={}));var cE;(function(t){t.method="inlayHint/resolve",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method)})(cE=un.InlayHintResolveRequest||(un.InlayHintResolveRequest={}));var lE;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType0(t.method)})(lE=un.InlayHintRefreshRequest||(un.InlayHintRefreshRequest={}))});var Kg=H(Bt=>{"use strict";Object.defineProperty(Bt,"__esModule",{value:!0});Bt.DiagnosticRefreshRequest=Bt.WorkspaceDiagnosticRequest=Bt.DocumentDiagnosticRequest=Bt.DocumentDiagnosticReportKind=Bt.DiagnosticServerCancellationData=void 0;var Hg=Qn(),uE=gl(),Zo=it(),fE;(function(t){function e(r){let n=r;return n&&uE.boolean(n.retriggerRequest)}t.is=e})(fE=Bt.DiagnosticServerCancellationData||(Bt.DiagnosticServerCancellationData={}));var dE;(function(t){t.Full="full",t.Unchanged="unchanged"})(dE=Bt.DocumentDiagnosticReportKind||(Bt.DocumentDiagnosticReportKind={}));var pE;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Zo.MessageDirection.clientToServer,t.type=new Zo.ProtocolRequestType(t.method),t.partialResult=new Hg.ProgressType})(pE=Bt.DocumentDiagnosticRequest||(Bt.DocumentDiagnosticRequest={}));var mE;(function(t){t.method="workspace/diagnostic",t.messageDirection=Zo.MessageDirection.clientToServer,t.type=new Zo.ProtocolRequestType(t.method),t.partialResult=new Hg.ProgressType})(mE=Bt.WorkspaceDiagnosticRequest||(Bt.WorkspaceDiagnosticRequest={}));var hE;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Zo.MessageDirection.clientToServer,t.type=new Zo.ProtocolRequestType0(t.method)})(hE=Bt.DiagnosticRefreshRequest||(Bt.DiagnosticRefreshRequest={}))});var zg=H(xe=>{"use strict";Object.defineProperty(xe,"__esModule",{value:!0});xe.DidCloseNotebookDocumentNotification=xe.DidSaveNotebookDocumentNotification=xe.DidChangeNotebookDocumentNotification=xe.NotebookCellArrayChange=xe.DidOpenNotebookDocumentNotification=xe.NotebookDocumentSyncRegistrationType=xe.NotebookDocument=xe.NotebookCell=xe.ExecutionSummary=xe.NotebookCellKind=void 0;var ja=co(),fn=gl(),An=it(),Bg;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(Bg=xe.NotebookCellKind||(xe.NotebookCellKind={}));var Wg;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return fn.objectLiteral(o)&&ja.uinteger.is(o.executionOrder)&&(o.success===void 0||fn.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Wg=xe.ExecutionSummary||(xe.ExecutionSummary={}));var gm;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return fn.objectLiteral(s)&&Bg.is(s.kind)&&ja.DocumentUri.is(s.document)&&(s.metadata===void 0||fn.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Wg.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let l=0;l<o.length;l++)if(!i(o[l],s[l]))return!1}if(fn.objectLiteral(o)&&fn.objectLiteral(s)){let l=Object.keys(o),u=Object.keys(s);if(l.length!==u.length||(l.sort(),u.sort(),!i(l,u)))return!1;for(let f=0;f<l.length;f++){let m=l[f];if(!i(o[m],s[m]))return!1}}return!0}})(gm=xe.NotebookCell||(xe.NotebookCell={}));var yE;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return fn.objectLiteral(i)&&fn.string(i.uri)&&ja.integer.is(i.version)&&fn.typedArray(i.cells,gm.is)}t.is=r})(yE=xe.NotebookDocument||(xe.NotebookDocument={}));var Ha;(function(t){t.method="notebookDocument/sync",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.RegistrationType(t.method)})(Ha=xe.NotebookDocumentSyncRegistrationType||(xe.NotebookDocumentSyncRegistrationType={}));var gE;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ha.method})(gE=xe.DidOpenNotebookDocumentNotification||(xe.DidOpenNotebookDocumentNotification={}));var TE;(function(t){function e(n){let i=n;return fn.objectLiteral(i)&&ja.uinteger.is(i.start)&&ja.uinteger.is(i.deleteCount)&&(i.cells===void 0||fn.typedArray(i.cells,gm.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(TE=xe.NotebookCellArrayChange||(xe.NotebookCellArrayChange={}));var vE;(function(t){t.method="notebookDocument/didChange",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ha.method})(vE=xe.DidChangeNotebookDocumentNotification||(xe.DidChangeNotebookDocumentNotification={}));var xE;(function(t){t.method="notebookDocument/didSave",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ha.method})(xE=xe.DidSaveNotebookDocumentNotification||(xe.DidSaveNotebookDocumentNotification={}));var RE;(function(t){t.method="notebookDocument/didClose",t.messageDirection=An.MessageDirection.clientToServer,t.type=new An.ProtocolNotificationType(t.method),t.registrationMethod=Ha.method})(RE=xe.DidCloseNotebookDocumentNotification||(xe.DidCloseNotebookDocumentNotification={}))});var rT=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var D=it(),Vg=co(),Wt=gl(),bE=gg();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return bE.ImplementationRequest}});var SE=vg();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return SE.TypeDefinitionRequest}});var Xg=xg();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return Xg.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return Xg.DidChangeWorkspaceFoldersNotification}});var wE=bg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return wE.ConfigurationRequest}});var Yg=Sg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Yg.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Yg.ColorPresentationRequest}});var AE=Ag();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return AE.FoldingRangeRequest}});var CE=kg();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return CE.DeclarationRequest}});var kE=$g();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return kE.SelectionRangeRequest}});var Tm=Ng();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return Tm.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return Tm.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return Tm.WorkDoneProgressCancelNotification}});var vm=_g();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return vm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return vm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return vm.CallHierarchyPrepareRequest}});var es=Ig();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return es.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return es.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return es.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return es.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return es.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return es.SemanticTokensRegistrationType}});var EE=Og();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return EE.ShowDocumentRequest}});var $E=Lg();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return $E.LinkedEditingRangeRequest}});var lo=Mg();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return lo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return lo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return lo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return lo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return lo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return lo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return lo.WillDeleteFilesRequest}});var xm=Ug();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return xm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return xm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return xm.MonikerRequest}});var Rm=qg();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return Rm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return Rm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return Rm.TypeHierarchySupertypesRequest}});var Jg=Gg();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Jg.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Jg.InlineValueRefreshRequest}});var bm=jg();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return bm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return bm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return bm.InlayHintRefreshRequest}});var Ka=Kg();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Ka.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Ka.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Ka.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Ka.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Ka.DiagnosticRefreshRequest}});var Cn=zg();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Cn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Cn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Cn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Cn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Cn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Cn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Cn.DidCloseNotebookDocumentNotification}});var Qg;(function(t){function e(r){let n=r;return Wt.string(n.language)||Wt.string(n.scheme)||Wt.string(n.pattern)}t.is=e})(Qg=h.TextDocumentFilter||(h.TextDocumentFilter={}));var Zg;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebookType)||Wt.string(n.scheme)||Wt.string(n.pattern))}t.is=e})(Zg=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var eT;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebook)||Zg.is(n.notebook))&&(n.language===void 0||Wt.string(n.language))}t.is=e})(eT=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var tT;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Wt.string(n)&&!Qg.is(n)&&!eT.is(n))return!1;return!0}t.is=e})(tT=h.DocumentSelector||(h.DocumentSelector={}));var NE;(function(t){t.method="client/registerCapability",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType(t.method)})(NE=h.RegistrationRequest||(h.RegistrationRequest={}));var _E;(function(t){t.method="client/unregisterCapability",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType(t.method)})(_E=h.UnregistrationRequest||(h.UnregistrationRequest={}));var IE;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(IE=h.ResourceOperationKind||(h.ResourceOperationKind={}));var PE;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(PE=h.FailureHandlingKind||(h.FailureHandlingKind={}));var OE;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(OE=h.PositionEncodingKind||(h.PositionEncodingKind={}));var DE;(function(t){function e(r){let n=r;return n&&Wt.string(n.id)&&n.id.length>0}t.hasId=e})(DE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var LE;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||tT.is(n.documentSelector))}t.is=e})(LE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var ME;(function(t){function e(n){let i=n;return Wt.objectLiteral(i)&&(i.workDoneProgress===void 0||Wt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Wt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(ME=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var FE;(function(t){t.method="initialize",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(FE=h.InitializeRequest||(h.InitializeRequest={}));var UE;(function(t){t.unknownProtocolVersion=1})(UE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var qE;(function(t){t.method="initialized",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(qE=h.InitializedNotification||(h.InitializedNotification={}));var GE;(function(t){t.method="shutdown",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType0(t.method)})(GE=h.ShutdownRequest||(h.ShutdownRequest={}));var jE;(function(t){t.method="exit",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType0(t.method)})(jE=h.ExitNotification||(h.ExitNotification={}));var HE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(HE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var KE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(KE=h.MessageType||(h.MessageType={}));var BE;(function(t){t.method="window/showMessage",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(BE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var WE;(function(t){t.method="window/showMessageRequest",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType(t.method)})(WE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var zE;(function(t){t.method="window/logMessage",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(zE=h.LogMessageNotification||(h.LogMessageNotification={}));var VE;(function(t){t.method="telemetry/event",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(VE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var XE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(XE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var YE;(function(t){t.method="textDocument/didOpen",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(YE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var JE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(JE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var QE;(function(t){t.method="textDocument/didChange",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(QE=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var ZE;(function(t){t.method="textDocument/didClose",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(ZE=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var e$;(function(t){t.method="textDocument/didSave",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(e$=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var t$;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(t$=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var r$;(function(t){t.method="textDocument/willSave",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(r$=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var n$;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(n$=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var i$;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolNotificationType(t.method)})(i$=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var o$;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(o$=h.FileChangeType||(h.FileChangeType={}));var s$;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Vg.URI.is(n.baseUri)||Vg.WorkspaceFolder.is(n.baseUri))&&Wt.string(n.pattern)}t.is=e})(s$=h.RelativePattern||(h.RelativePattern={}));var a$;(function(t){t.Create=1,t.Change=2,t.Delete=4})(a$=h.WatchKind||(h.WatchKind={}));var c$;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolNotificationType(t.method)})(c$=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var l$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(l$=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var u$;(function(t){t.method="textDocument/completion",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(u$=h.CompletionRequest||(h.CompletionRequest={}));var f$;(function(t){t.method="completionItem/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(f$=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var d$;(function(t){t.method="textDocument/hover",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(d$=h.HoverRequest||(h.HoverRequest={}));var p$;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(p$=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var m$;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(m$=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var h$;(function(t){t.method="textDocument/definition",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(h$=h.DefinitionRequest||(h.DefinitionRequest={}));var y$;(function(t){t.method="textDocument/references",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(y$=h.ReferencesRequest||(h.ReferencesRequest={}));var g$;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(g$=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var T$;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(T$=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var v$;(function(t){t.method="textDocument/codeAction",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(v$=h.CodeActionRequest||(h.CodeActionRequest={}));var x$;(function(t){t.method="codeAction/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(x$=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var R$;(function(t){t.method="workspace/symbol",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(R$=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var b$;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(b$=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var S$;(function(t){t.method="textDocument/codeLens",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(S$=h.CodeLensRequest||(h.CodeLensRequest={}));var w$;(function(t){t.method="codeLens/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(w$=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var A$;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType0(t.method)})(A$=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var C$;(function(t){t.method="textDocument/documentLink",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(C$=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var k$;(function(t){t.method="documentLink/resolve",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(k$=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var E$;(function(t){t.method="textDocument/formatting",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(E$=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var $$;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})($$=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var N$;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(N$=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var _$;(function(t){t.Identifier=1})(_$=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var I$;(function(t){t.method="textDocument/rename",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(I$=h.RenameRequest||(h.RenameRequest={}));var P$;(function(t){t.method="textDocument/prepareRename",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(P$=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var O$;(function(t){t.method="workspace/executeCommand",t.messageDirection=D.MessageDirection.clientToServer,t.type=new D.ProtocolRequestType(t.method)})(O$=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var D$;(function(t){t.method="workspace/applyEdit",t.messageDirection=D.MessageDirection.serverToClient,t.type=new D.ProtocolRequestType("workspace/applyEdit")})(D$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var iT=H(Sl=>{"use strict";Object.defineProperty(Sl,"__esModule",{value:!0});Sl.createProtocolConnection=void 0;var nT=Qn();function L$(t,e,r,n){return nT.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,nT.createMessageConnection)(t,e,r,n)}Sl.createProtocolConnection=L$});var oT=H(mr=>{"use strict";var M$=mr&&mr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),wl=mr&&mr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&M$(e,t,r)};Object.defineProperty(mr,"__esModule",{value:!0});mr.LSPErrorCodes=mr.createProtocolConnection=void 0;wl(Qn(),mr);wl(co(),mr);wl(it(),mr);wl(rT(),mr);var F$=iT();Object.defineProperty(mr,"createProtocolConnection",{enumerable:!0,get:function(){return F$.createProtocolConnection}});var U$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(U$=mr.LSPErrorCodes||(mr.LSPErrorCodes={}))});var Ct=H(kn=>{"use strict";var q$=kn&&kn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),sT=kn&&kn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&q$(e,t,r)};Object.defineProperty(kn,"__esModule",{value:!0});kn.createProtocolConnection=void 0;var G$=fm();sT(fm(),kn);sT(oT(),kn);function j$(t,e,r,n){return(0,G$.createMessageConnection)(t,e,r,n)}kn.createProtocolConnection=j$});var wm=H(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.SemanticTokensBuilder=Ei.SemanticTokensDiff=Ei.SemanticTokensFeature=void 0;var Al=Ct(),H$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Al.SemanticTokensRefreshRequest.type),on:e=>{let r=Al.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Al.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Al.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ei.SemanticTokensFeature=H$;var Cl=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ei.SemanticTokensDiff=Cl;var Sm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Cl(this._prevData,this._data).computeDiff()}:this.build()}};Ei.SemanticTokensBuilder=Sm});var Cm=H(kl=>{"use strict";Object.defineProperty(kl,"__esModule",{value:!0});kl.TextDocuments=void 0;var uo=Ct(),Am=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new uo.Emitter,this._onDidOpen=new uo.Emitter,this._onDidClose=new uo.Emitter,this._onDidSave=new uo.Emitter,this._onWillSave=new uo.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=uo.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),uo.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};kl.TextDocuments=Am});var Em=H(ts=>{"use strict";Object.defineProperty(ts,"__esModule",{value:!0});ts.NotebookDocuments=ts.NotebookSyncFeature=void 0;var Kr=Ct(),aT=Cm(),K$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Kr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Kr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Kr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Kr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};ts.NotebookSyncFeature=K$;var El=class t{onDidOpenTextDocument(e){return this.openHandler=e,Kr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Kr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Kr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};El.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var km=class{constructor(e){e instanceof aT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new aT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Kr.Emitter,this._onDidChange=new Kr.Emitter,this._onDidSave=new Kr.Emitter,this._onDidClose=new Kr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new El,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let l=[],u=[],f=[],m=[];if(c.cells!==void 0){let C=c.cells;if(C.structure!==void 0){let v=C.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),C.structure.didOpen!==void 0)for(let g of C.structure.didOpen)r.openTextDocument({textDocument:g}),l.push(g.uri);if(C.structure.didClose)for(let g of C.structure.didClose)r.closeTextDocument({textDocument:g}),u.push(g.uri)}if(C.data!==void 0){let v=new Map(C.data.map(g=>[g.document,g]));for(let g=0;g<=o.cells.length;g++){let $=v.get(o.cells[g].document);if($!==void 0){let O=o.cells.splice(g,1,$);if(f.push({old:O[0],new:$}),v.delete($.document),v.size===0)break}}}if(C.textContent!==void 0)for(let v of C.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let S=[];for(let C of l)S.push(this.getNotebookCell(C));let A=[];for(let C of u)A.push(this.getNotebookCell(C));let N=[];for(let C of m)N.push(this.getNotebookCell(C));(S.length>0||A.length>0||f.length>0||N.length>0)&&(T.cells={added:S,removed:A,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Kr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};ts.NotebookDocuments=km});var $m=H(kt=>{"use strict";Object.defineProperty(kt,"__esModule",{value:!0});kt.thenable=kt.typedArray=kt.stringArray=kt.array=kt.func=kt.error=kt.number=kt.string=kt.boolean=void 0;function B$(t){return t===!0||t===!1}kt.boolean=B$;function cT(t){return typeof t=="string"||t instanceof String}kt.string=cT;function W$(t){return typeof t=="number"||t instanceof Number}kt.number=W$;function z$(t){return t instanceof Error}kt.error=z$;function lT(t){return typeof t=="function"}kt.func=lT;function uT(t){return Array.isArray(t)}kt.array=uT;function V$(t){return uT(t)&&t.every(e=>cT(e))}kt.stringArray=V$;function X$(t,e){return Array.isArray(t)&&t.every(e)}kt.typedArray=X$;function Y$(t){return t&&lT(t.then)}kt.thenable=Y$});var Nm=H(Br=>{"use strict";Object.defineProperty(Br,"__esModule",{value:!0});Br.generateUuid=Br.parse=Br.isUUID=Br.v4=Br.empty=void 0;var Ba=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Wa=class t extends Ba{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Wa._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Wa._timeHighBits=["8","9","a","b"];Br.empty=new Ba("00000000-0000-0000-0000-000000000000");function fT(){return new Wa}Br.v4=fT;var J$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function dT(t){return J$.test(t)}Br.isUUID=dT;function Q$(t){if(!dT(t))throw new Error("invalid uuid");return new Ba(t)}Br.parse=Q$;function Z$(){return fT().asHex()}Br.generateUuid=Z$});var pT=H(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.attachPartialResult=Ni.ProgressFeature=Ni.attachWorkDone=void 0;var $i=Ct(),eN=Nm(),fo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress($i.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress($i.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress($i.WorkDoneProgress.type,this._token,{kind:"end"})}};fo.Instances=new Map;var $l=class extends fo{constructor(e,r){super(e,r),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},za=class{constructor(){}begin(){}report(){}done(){}},Nl=class extends za{constructor(){super(),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function tN(t,e){if(e===void 0||e.workDoneToken===void 0)return new za;let r=e.workDoneToken;return delete e.workDoneToken,new fo(t,r)}Ni.attachWorkDone=tN;var rN=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification($i.WorkDoneProgressCancelNotification.type,r=>{let n=fo.Instances.get(r.token);(n instanceof $l||n instanceof Nl)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new za:new fo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,eN.generateUuid)();return this.connection.sendRequest($i.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new $l(this.connection,e))}else return Promise.resolve(new Nl)}};Ni.ProgressFeature=rN;var _m;(function(t){t.type=new $i.ProgressType})(_m||(_m={}));var Im=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(_m.type,this._token,e)}};function nN(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new Im(t,r)}Ni.attachPartialResult=nN});var mT=H(_l=>{"use strict";Object.defineProperty(_l,"__esModule",{value:!0});_l.ConfigurationFeature=void 0;var iN=Ct(),oN=$m(),sN=t=>class extends t{getConfiguration(e){return e?oN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(iN.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};_l.ConfigurationFeature=sN});var hT=H(Pl=>{"use strict";Object.defineProperty(Pl,"__esModule",{value:!0});Pl.WorkspaceFoldersFeature=void 0;var Il=Ct(),aN=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Il.Emitter,this.connection.onNotification(Il.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Il.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Il.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Pl.WorkspaceFoldersFeature=aN});var yT=H(Ol=>{"use strict";Object.defineProperty(Ol,"__esModule",{value:!0});Ol.CallHierarchyFeature=void 0;var Pm=Ct(),cN=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Pm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Pm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Pm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ol.CallHierarchyFeature=cN});var gT=H(Dl=>{"use strict";Object.defineProperty(Dl,"__esModule",{value:!0});Dl.ShowDocumentFeature=void 0;var lN=Ct(),uN=t=>class extends t{showDocument(e){return this.connection.sendRequest(lN.ShowDocumentRequest.type,e)}};Dl.ShowDocumentFeature=uN});var TT=H(Ll=>{"use strict";Object.defineProperty(Ll,"__esModule",{value:!0});Ll.FileOperationsFeature=void 0;var rs=Ct(),fN=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(rs.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(rs.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(rs.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(rs.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(rs.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(rs.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Ll.FileOperationsFeature=fN});var vT=H(Ml=>{"use strict";Object.defineProperty(Ml,"__esModule",{value:!0});Ml.LinkedEditingRangeFeature=void 0;var dN=Ct(),pN=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(dN.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Ml.LinkedEditingRangeFeature=pN});var xT=H(Fl=>{"use strict";Object.defineProperty(Fl,"__esModule",{value:!0});Fl.TypeHierarchyFeature=void 0;var Om=Ct(),mN=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(Om.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=Om.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=Om.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Fl.TypeHierarchyFeature=mN});var bT=H(Ul=>{"use strict";Object.defineProperty(Ul,"__esModule",{value:!0});Ul.InlineValueFeature=void 0;var RT=Ct(),hN=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(RT.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(RT.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};Ul.InlineValueFeature=hN});var ST=H(ql=>{"use strict";Object.defineProperty(ql,"__esModule",{value:!0});ql.InlayHintFeature=void 0;var Dm=Ct(),yN=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Dm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Dm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Dm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};ql.InlayHintFeature=yN});var wT=H(Gl=>{"use strict";Object.defineProperty(Gl,"__esModule",{value:!0});Gl.DiagnosticFeature=void 0;var Va=Ct(),gN=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Va.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Va.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Va.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Va.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Va.WorkspaceDiagnosticRequest.partialResult,r)))}}};Gl.DiagnosticFeature=gN});var AT=H(jl=>{"use strict";Object.defineProperty(jl,"__esModule",{value:!0});jl.MonikerFeature=void 0;var TN=Ct(),vN=t=>class extends t{get moniker(){return{on:e=>{let r=TN.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};jl.MonikerFeature=vN});var FT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var U=Ct(),Wr=$m(),Mm=Nm(),te=pT(),xN=mT(),RN=hT(),bN=yT(),SN=wm(),wN=gT(),AN=TT(),CN=vT(),kN=xT(),EN=bT(),$N=ST(),NN=wT(),_N=Em(),IN=AT();function Lm(t){if(t!==null)return t}var Fm=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=Fm;var Hl=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},Um=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Lm)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Lm)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Lm)}},CT=(0,wN.ShowDocumentFeature)((0,te.ProgressFeature)(Um)),PN;(function(t){function e(){return new Kl}t.create=e})(PN=he.BulkRegistration||(he.BulkRegistration={}));var Kl=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Wr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Mm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},ON;(function(t){function e(){return new Xa(void 0,[])}t.create=e})(ON=he.BulkUnregistration||(he.BulkUnregistration={}));var Xa=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Wr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Bl=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Kl?this.registerMany(e):e instanceof Xa?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Wr.string(r)?r:r.method,o=Mm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Wr.string(e)?e:e.method,i=Mm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new Xa(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},qm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},kT=(0,AN.FileOperationsFeature)((0,RN.WorkspaceFoldersFeature)((0,xN.ConfigurationFeature)(qm))),Wl=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},zl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Vl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Vl;var ET=(0,IN.MonikerFeature)((0,NN.DiagnosticFeature)((0,$N.InlayHintFeature)((0,EN.InlineValueFeature)((0,kN.TypeHierarchyFeature)((0,CN.LinkedEditingRangeFeature)((0,SN.SemanticTokensFeature)((0,bN.CallHierarchyFeature)(Vl)))))))),Xl=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=Xl;var $T=(0,_N.NotebookSyncFeature)(Xl);function NT(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=NT;function _T(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=_T;function IT(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=IT;function PT(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=PT;function OT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=OT;function DT(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=DT;function LT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=LT;function MT(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=MT;function DN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,NT),tracer:r(t.tracer,e.tracer,IT),telemetry:r(t.telemetry,e.telemetry,_T),client:r(t.client,e.client,PT),window:r(t.window,e.window,OT),workspace:r(t.workspace,e.workspace,DT),languages:r(t.languages,e.languages,LT),notebooks:r(t.notebooks,e.notebooks,MT)}}he.combineFeatures=DN;function LN(t,e,r){let n=r&&r.console?new(r.console(Hl)):new Hl,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Wl)):new Wl,s=r&&r.telemetry?new(r.telemetry(zl)):new zl,a=r&&r.client?new(r.client(Bl)):new Bl,c=r&&r.window?new(r.window(CT)):new CT,l=r&&r.workspace?new(r.workspace(kT)):new kT,u=r&&r.languages?new(r.languages(ET)):new ET,f=r&&r.notebooks?new(r.notebooks($T)):new $T,m=[n,o,s,a,c,l,u,f];function T(v){return v instanceof Promise?v:Wr.thenable(v)?new Promise((g,$)=>{v.then(O=>g(O),O=>$(O))}):Promise.resolve(v)}let S,A,N,C={listen:()=>i.listen(),sendRequest:(v,...g)=>i.sendRequest(Wr.string(v)?v:v.method,...g),onRequest:(v,g)=>i.onRequest(v,g),sendNotification:(v,g)=>{let $=Wr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,g)},onNotification:(v,g)=>i.onNotification(v,g),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(A=v,{dispose:()=>{A=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(S=v,{dispose:()=>{S=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return l},get languages(){return u},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(g,$)=>v(g,$)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(g,$)=>v(g,$)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(g,$)=>v(g,$)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(g,$)=>v(g,$)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(g,$)=>v(g,$)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),(0,te.attachPartialResult)(i,g))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(g,$)=>v(g,$,(0,te.attachWorkDone)(i,g),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(C);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),Wr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let g of m)g.initialize(v.capabilities);if(A){let g=A(v,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(g).then($=>{if($ instanceof U.ResponseError)return $;let O=$;O||(O={capabilities:{}});let X=O.capabilities;X||(X={},O.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Wr.number(C.__textDocumentSync)?C.__textDocumentSync:U.TextDocumentSyncKind.None:!Wr.number(X.textDocumentSync)&&!Wr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Wr.number(C.__textDocumentSync)?C.__textDocumentSync:U.TextDocumentSyncKind.None);for(let ge of m)ge.fillServerCapabilities(X);return O})}else{let g={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(g.capabilities);return g}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,S)return S(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),C}he.createConnection=LN});var Gm=H(zt=>{"use strict";var MN=zt&&zt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),UT=zt&&zt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&MN(e,t,r)};Object.defineProperty(zt,"__esModule",{value:!0});zt.ProposedFeatures=zt.NotebookDocuments=zt.TextDocuments=zt.SemanticTokensBuilder=void 0;var FN=wm();Object.defineProperty(zt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return FN.SemanticTokensBuilder}});UT(Ct(),zt);var UN=Cm();Object.defineProperty(zt,"TextDocuments",{enumerable:!0,get:function(){return UN.TextDocuments}});var qN=Em();Object.defineProperty(zt,"NotebookDocuments",{enumerable:!0,get:function(){return qN.NotebookDocuments}});UT(FT(),zt);var GN;(function(t){t.all={__brand:"features"}})(GN=zt.ProposedFeatures||(zt.ProposedFeatures={}))});var GT=H((TH,qT)=>{"use strict";qT.exports=Ct()});var Se=H(En=>{"use strict";var jN=En&&En.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),HT=En&&En.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&jN(e,t,r)};Object.defineProperty(En,"__esModule",{value:!0});En.createConnection=void 0;var Yl=Gm();HT(GT(),En);HT(Gm(),En);var jT=!1,HN={initialize:t=>{},get shutdownReceived(){return jT},set shutdownReceived(t){jT=t},exit:t=>{}};function KN(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Yl.ConnectionStrategy.is(t)||Yl.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let c=l=>(0,Yl.createProtocolConnection)(o,s,l,a);return(0,Yl.createConnection)(c,HN,i)}En.createConnection=KN});var iC=H((Gce,nC)=>{"use strict";nC.exports=Se()});var rC=de(Se(),1);var Jl=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=BT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),l=this._lineOffsets,u=KT(n.text,!1,o);if(c-a===u.length)for(let m=0,T=u.length;m<T;m++)l[m+a+1]=u[m];else u.length<1e4?l.splice(a+1,c-a,...u):this._lineOffsets=l=l.slice(0,a+1).concat(u,l.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+u.length,T=l.length;m<T;m++)l[m]=l[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=KT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},ns;(function(t){function e(i,o,s,a){return new Jl(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Jl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=jm(o.map(BN),(u,f)=>{let m=u.range.start.line-f.range.start.line;return m===0?u.range.start.character-f.range.start.character:m}),c=0,l=[];for(let u of a){let f=i.offsetAt(u.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&l.push(s.substring(c,f)),u.newText.length&&l.push(u.newText),c=i.offsetAt(u.range.end)}return l.push(s.substr(c)),l.join("")}t.applyEdits=n})(ns||(ns={}));function jm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);jm(n,e),jm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function KT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function BT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function BN(t){let e=BT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function Et(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function ei(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function WT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function is(t){return typeof t=="object"&&t!==null&&Et(t.container)&&ei(t.reference)&&typeof t.message=="string"}var po=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return Et(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function $n(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function mo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function zT(t){return $n(t)&&typeof t.fullText=="string"}var Pr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return hr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=WN(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?hr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return hr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(Ql(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return hr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(Ql(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return hr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?hr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function WN(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Ql(t){return!!t&&typeof t[Symbol.iterator]=="function"}var os=new Pr(()=>{},()=>hr),hr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Pr)return e;if(Ql(e))return new Pr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Pr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:hr)}return t.length>1?new Pr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Ql(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return hr}):os}var zr=class extends Pr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return hr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Ya;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Ya=Ya||(Ya={}));function Hm(t){return new zr(t,e=>$n(e)?e.content:[],{includeRoot:!0})}function YT(t){return Hm(t).filter(mo)}function JT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function Ja(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function ir(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var ti;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(ti=ti||(ti={}));function zN(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return ti.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return ti.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?ti.Inside:r?ti.OverlapBack:ti.OverlapFront}function Zl(t,e){return zN(t,e)>ti.After}var Km=/^[\w\p{L}]$/u;function Pt(t,e,r=Km){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Sr(t,e)}}function QT(t,e){if(t){let r=VN(t,!0);if(r&&VT(r,e))return r;if(zT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(VT(o,e))return o}}}}function VT(t,e){return mo(t)&&e.includes(t.tokenType.name)}function Sr(t,e){if(mo(t))return t;if($n(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return Sr(o,e)}if(r===n)return Sr(t.content[r],e)}}function VN(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function ZT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function ev(t,e){let r=XN(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function XN(t,e){let r=XT(t),n=XT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function XT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function ho(t,e,r,n){let i=[t,e,r,n].reduce(iv,{});return nv(i)}var Bm=Symbol("isProxy");function eu(t){if(t&&t[Bm])for(let e of Object.values(t))eu(e);return t}function nv(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>rv(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(rv(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Bm]});return r[Bm]=!0,r}var tv=Symbol();function rv(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===tv)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=tv;try{t[e]=typeof i=="function"?i(n):nv(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function iv(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=iv(i,n):t[r]=n}}return t}var Le=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ya.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Wm="AbstractRule";var yo="AbstractType";var YN="Condition";var JN="TypeDefinition";var zm="AbstractElement";function ss(t){return le.isInstance(t,zm)}var ov="ArrayType";function go(t){return le.isInstance(t,ov)}var sv="Conjunction";function av(t){return le.isInstance(t,sv)}var cv="Disjunction";function lv(t){return le.isInstance(t,cv)}var uv="Grammar";function as(t){return le.isInstance(t,uv)}var QN="GrammarImport";function tu(t){return le.isInstance(t,QN)}var ZN="InferredType";function cs(t){return le.isInstance(t,ZN)}var Za="Interface";function wr(t){return le.isInstance(t,Za)}var fv="LiteralCondition";function dv(t){return le.isInstance(t,fv)}var pv="Negation";function mv(t){return le.isInstance(t,pv)}var hv="Parameter";function yv(t){return le.isInstance(t,hv)}var gv="ParameterReference";function ls(t){return le.isInstance(t,gv)}var Tv="ParserRule";function K(t){return le.isInstance(t,Tv)}var vv="ReferenceType";function To(t){return le.isInstance(t,vv)}var e_="ReturnType";function us(t){return le.isInstance(t,e_)}var xv="SimpleType";function or(t){return le.isInstance(t,xv)}var Vm="TerminalRule";function we(t){return le.isInstance(t,Vm)}var ec="Type";function Mt(t){return le.isInstance(t,ec)}var t_="TypeAttribute";function ru(t){return le.isInstance(t,t_)}var Rv="UnionType";function Vr(t){return le.isInstance(t,Rv)}var bv="Action";function Ne(t){return le.isInstance(t,bv)}var Sv="Alternatives";function Or(t){return le.isInstance(t,Sv)}var wv="Assignment";function Re(t){return le.isInstance(t,wv)}var Av="CharacterRange";function nu(t){return le.isInstance(t,Av)}var Cv="CrossReference";function Vt(t){return le.isInstance(t,Cv)}var kv="Group";function Ft(t){return le.isInstance(t,kv)}var Ev="Keyword";function pt(t){return le.isInstance(t,Ev)}var $v="NegatedToken";function Nv(t){return le.isInstance(t,$v)}var _v="RegexToken";function Iv(t){return le.isInstance(t,_v)}var Pv="RuleCall";function _e(t){return le.isInstance(t,Pv)}var Ov="TerminalAlternatives";function Dv(t){return le.isInstance(t,Ov)}var Lv="TerminalGroup";function Mv(t){return le.isInstance(t,Lv)}var Fv="TerminalRuleCall";function iu(t){return le.isInstance(t,Fv)}var Uv="UnorderedGroup";function Dr(t){return le.isInstance(t,Uv)}var qv="UntilToken";function Gv(t){return le.isInstance(t,qv)}var jv="Wildcard";function Hv(t){return le.isInstance(t,jv)}var Qa=class extends po{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case bv:return this.isSubtype(zm,r)||this.isSubtype(yo,r);case Sv:case wv:case Av:case Cv:case kv:case Ev:case $v:case _v:case Pv:case Ov:case Lv:case Fv:case Uv:case qv:case jv:return this.isSubtype(zm,r);case ov:case vv:case xv:case Rv:return this.isSubtype(JN,r);case sv:case cv:case fv:case pv:case gv:return this.isSubtype(YN,r);case Za:case ec:return this.isSubtype(yo,r);case Tv:return this.isSubtype(Wm,r)||this.isSubtype(yo,r);case Vm:return this.isSubtype(Wm,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return yo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Wm;case"Grammar:usedGrammars":return uv;case"NamedArgument:parameter":case"ParameterReference:parameter":return hv;case"TerminalRuleCall:rule":return Vm;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},le=new Qa;function Kv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{Et(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):Et(r)&&(r.$container=t,r.$containerProperty=e))}function Ie(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=ou(t).$document;if(!r)throw new Error("AST node has no document.");return r}function ou(t){for(;t.$container;)t=t.$container;return t}function _i(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(Et(o)){if(n.keyIndex++,Xm(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(Et(a)&&Xm(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return hr})}function Qe(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new zr(t,r=>_i(r,e))}function ni(t,e){if(t){if(e?.range&&!Xm(t,e.range))return new zr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new zr(t,r=>_i(r,e),{includeRoot:!0})}function Xm(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Zl(n,e):!1}function su(t){return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(ei(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(ei(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return hr})}function Bv(t){var e,r;if(t){if("astNode"in t)return i_(t);if(Array.isArray(t))return t.reduce(Wv,void 0);{let n=t,i=r_(n)?n_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return fs(n,i)}}else return}function r_(t){return typeof t<"u"&&"element"in t&&"text"in t}function n_(t){try{return ne(t).uri.toString()}catch{return}}function i_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return fs(s,Ym(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(Wv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let c=a(s.assignments[i]);return c&&fs(c,Ym(n))}else if(n.$cstNode){let c=a(Ii(n.$cstNode,i));return c&&fs(c,Ym(n))}else return}}}function Ym(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new zr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function fs(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Wv(t,e){var r,n;if(t){if(!e)return t&&fs(t)}else return e&&fs(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),c=a-s,l={offset:s,end:a,length:c};if(t.range&&e.range&&(l.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let u=t.fileURI,f=e.fileURI,m=u&&f&&u!==f?`<unmergable text regions of ${u}, ${f}>`:u??f;l.fileURI=m}return l}var Jm=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=o_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function o_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function zv(t,e){let r=new Jm(e),n=r.pushTraceRegion(void 0);Vv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Vv(t,e){typeof t=="string"?s_(t,e):t instanceof ds?a_(t,e):t instanceof Xt?Jv(t,e):t instanceof Pi&&c_(t,e)}function Xv(t,e){return typeof t=="string"?t.length!==0:t instanceof Xt?t.contents.some(r=>Xv(r,e)):t instanceof Pi?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function s_(t,e){t&&(e.pendingIndent&&Yv(e,!1),e.append(t))}function Yv(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Jv(t,e){let r,n=Bv(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Vv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function a_(t,e){var r;if(Xv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Jv(t,e)}finally{e.decreaseIndent()}}}function c_(t,e){t.ifNotEmpty&&!l_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Yv(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function l_(t){return t.trimStart()!==""}var jH=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),tc=/\r?\n/g,u_=/\S|$/;function Qv(t){let e=t.filter(n=>n.length>0).map(n=>n.search(u_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function Zm(t,...e){let r=f_(t),n=d_(t,e,r);return m_(n)}function tx(t,e,r){return(n,...i)=>eh(t,e,r)(Zm(n,...i))}function f_(t){let e=t.join("_").split(tc),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=Qv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function d_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((l,u)=>{s.push(...l.split(tc).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(u===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(au,m):(f,m,T)=>T===0?[m]:f.concat(au,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(rc(e[u])?e[u]:e[u]!==void 0?{content:String(e[u])}:u<e.length?rx:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===au?s.slice(0,a-2):s.slice(0,a-1):s}var au={isNewLine:!0},rx={isUndefinedSegment:!0},ex=t=>t===au,Qm=t=>t===rx,p_=t=>t.content!==void 0;function m_(t){return t.reduce((r,n,i)=>Qm(n)?r:ex(n)?{node:i!==0&&(Qm(t[i-1])||rc(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Qm(t[i-2])||rc(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||ex(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=p_(n)?n.content:n,c;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:l=>c=l.append(a)}):r.node.append(a),indented:c??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Xt}).node}var Zv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function rc(t){return t instanceof Xt||t instanceof ds||t instanceof Pi}function ps(t,e){return rc(t)?zv(t,e).text:String(t)}var Xt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(Et(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(st)}appendNewLineIf(e){return e?this.append(st):this}appendNewLineIfNotEmpty(){return this.append(h_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(Zm(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new ds(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(tx(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function eh(t,e,r){return n=>n instanceof Xt&&n.tracedSource===void 0?n.trace(t,e,r):new Xt().trace(t,e,r).append(n)}var ds=class extends Xt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},Pi=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??Zv,this.ifNotEmpty=r}},st=new Pi,h_=new Pi(void 0,!0);function ii(t){return"referenceType"in t}function oi(t){return"elementType"in t}function Ot(t){return"types"in t}function nh(t){if(Ot(t)){let e=[];for(let r of t.types)e.push(...nh(r));return e}else return[t]}function Lr(t){return"value"in t}function Mr(t){return"primitive"in t}function Nn(t){return"string"in t}function dn(t){return t&&"type"in t}function mn(t){return t&&"properties"in t}var lu=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Xt;return r.append(`export type ${this.name} = ${pn(this.type,"AstType")};`,st),e&&(r.append(st),ox(r,this.name)),this.dataType&&y_(r,this),ps(r)}toDeclaredTypesString(e){let r=new Xt;return r.append(`type ${ih(this.name,e)} = ${pn(this.type,"DeclaredType")};`,st),ps(r)}},ms=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=mn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Xt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?vo([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,st),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${vo([...this.containerTypes].map(s=>s.name)).join(" | ")};`,st),this.typeNames.size>0&&o.append(`readonly $type: ${vo([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,st),nx(o,this.properties,"AstType")}),r.append("}",st),e&&(r.append(st),ox(r,this.name)),ps(r)}toDeclaredTypesString(e){let r=new Xt,n=ih(this.name,e),i=vo(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,st),r.indent(o=>nx(o,this.properties,"DeclaredType",e)),r.append("}",st),ps(r)}},uu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function ic(t,e){return Oi(t,e,new Map)}function Oi(t,e,r){let n=`${nc(t)}\xBB${nc(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Ot(t)?i=t.types.every(o=>Oi(o,e,r)):Ot(e)?i=e.types.some(o=>Oi(t,o,r)):Lr(e)&&dn(e.value)?Lr(t)&&dn(t.value)&&e.value.name===t.value.name?i=!0:i=Oi(t,e.value.type,r):ii(t)?i=ii(e)&&Oi(t.referenceType,e.referenceType,r):oi(t)?i=oi(e)&&Oi(t.elementType,e.elementType,r):Lr(t)?dn(t.value)?i=Oi(t.value.type,e,r):Lr(e)?dn(e.value)?i=Oi(t,e.value.type,r):i=ix(t.value,e.value,new Set):i=!1:Mr(t)?i=Mr(e)&&t.primitive===e.primitive:Nn(t)&&(i=Mr(e)&&e.primitive==="string"||Nn(e)&&e.string===t.string),i&&r.set(n,i)),i}function ix(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(mn(i)&&ix(i,e,r))return!0;return!1}function nc(t){if(ii(t))return`@(${nc(t.referenceType)})}`;if(oi(t))return`(${nc(t.elementType)})[]`;if(Ot(t)){let e=t.types.map(r=>nc(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Lr(t))return`Value<${t.value.name}>`;if(Mr(t))return t.primitive;if(Nn(t))return`'${t.string}'`}throw new Error("Invalid type")}function pn(t,e="AstType"){if(ii(t)){let r=pn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${th(t.referenceType,r)}`}else if(oi(t)){let r=pn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${th(t.elementType,r)}[]`}else if(Ot(t)){let r=t.types.map(n=>th(n,pn(n,e)));return vo(r).join(" | ")}else{if(Lr(t))return t.value.name;if(Mr(t))return t.primitive;if(Nn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function th(t,e){return Ot(t)&&(e=`(${e})`),e}function nx(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:ih(o.name,n),a=o.optional&&!fu(o.type),c=pn(o.type,r);return`${s}${a?"?":""}: ${c}`}vo(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),st))}function fu(t){return oi(t)?!0:ii(t)?!1:Ot(t)?t.types.every(e=>fu(e)):Mr(t)?t.primitive==="boolean":!1}function ox(t,e){t.append(`export const ${e} = '${e}';`,st),t.append(st),t.append(`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,st)),t.append("}",st)}function y_(t,e){switch(e.dataType){case"string":if(rh(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=sx(e.type),i=ax(e.type);if(r.length===0&&n.length===0&&i.length===0)cu(t,e.name,`typeof item === '${e.dataType}'`);else{let o=g_(r,n,i);cu(t,e.name,o)}}break;case"number":case"boolean":case"bigint":cu(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":cu(t,e.name,"item instanceof Date");break;default:return}}function rh(t){let e=!0;if(Mr(t))return t.primitive==="string";if(Nn(t))return!0;if(Ot(t)){for(let r of t.types)if(Lr(r))if(dn(r.value)){if(!rh(r.value.type))return!1}else return!1;else if(Mr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Ot(r))e=rh(r);else if(!Nn(r))return!1}else return!1;return e}function g_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function ih(t,e){return e.has(t)?`^${t}`:t}function sx(t){let e=[];if(Nn(t))return[t.string];if(Ot(t))for(let r of t.types)Nn(r)?e.push(r.string):Ot(r)&&e.push(...sx(r));return e}function ax(t){let e=[];if(Mr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Ot(t))for(let r of t.types)Mr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Ot(r)&&e.push(...ax(r));return e}function cu(t,e,r){t.append(st,`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(n=>n.append(`return ${r};`,st)),t.append("}",st)}function vo(t,e){return Array.from(new Set(t)).sort(e)}function oh(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);wr(c)?(i.add(c),oh(c,e,r,n).forEach(u=>i.add(u))):c&&Mt(c.$container)&&i.add(c.$container)}),i}function oc(t){let e=new Set;if(wr(t))e.add(t),t.superTypes.forEach(r=>{if(wr(r.ref)){e.add(r.ref);let n=oc(r.ref);for(let i of n)e.add(i)}});else if(Mt(t)){let r=cx(t.type);for(let n of r){let i=oc(n);for(let o of i)e.add(o)}}return e}function cx(t){var e;if(Vr(t))return t.types.flatMap(r=>cx(r));if(or(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Mt(r)||wr(r))return[r]}return[]}function sh(t,e){return t.interfaces.concat(e.interfaces)}function pu(t){return t.interfaces.concat(t.unions)}function lx(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function ux(t){return du(t,new Set)}function du(t,e){if(e.has(t))return[];if(e.add(t),Ot(t))return t.types.flatMap(r=>du(r,e));if(Lr(t)){let r=t.value;return"type"in r?du(r.type,e):[r.name]}else if(oi(t))return du(t.elementType,e);return[]}function sc(t){return typeof t.name=="string"}var hs=class{getName(e){if(sc(e))return e.name}getNameNode(e){return Yt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function mu(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function ys(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function xo(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function ac(){throw Error("Internal Error - Should never get here!")}function ah(t){return t.type==="Character"}var cc=[];for(let t=J("0");t<=J("9");t++)cc.push(t);var lc=[J("_")].concat(cc);for(let t=J("a");t<=J("z");t++)lc.push(t);for(let t=J("A");t<=J("Z");t++)lc.push(t);var ch=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var T_=/[0-9a-fA-F]/,hu=/[0-9]/,v_=/[1-9]/,Ro=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":ys(n,"global");break;case"i":ys(n,"ignoreCase");break;case"m":ys(n,"multiLine");break;case"u":ys(n,"unicode");break;case"y":ys(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}xo(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return ac()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;xo(r);break}if(!(e===!0&&r===void 0)&&xo(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),xo(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):ac()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=cc;break;case"D":e=cc,r=!0;break;case"s":e=ch;break;case"S":e=ch,r=!0;break;case"w":e=lc;break;case"W":e=lc,r=!0;break}return xo(e)?{type:"Set",value:e,complement:r}:ac()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return xo(e)?{type:"Character",value:e}:ac()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(ah(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(ah(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else mu(n.value,e),e.push(J("-")),mu(o.value,e)}else mu(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(v_.test(e)===!1)throw Error("Expecting a positive integer");for(;hu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(hu.test(e)===!1)throw Error("Expecting an integer");for(;hu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return hu.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(T_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var _n=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var x_=new Ro,uh=class extends _n{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=si(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},lh=new uh;function fx(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),lh.reset(t),lh.visit(x_.pattern(t)),lh.multiline}catch{return!1}}function fh(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function si(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function dx(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:si(e)).join("")}function px(t,e){let r=R_(t),n=e.match(r);return!!n&&n[0].length>0}function R_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(l){o+=r.substr(n,l),n+=l}function c(l){o+="(?:"+r.substr(n,l)+"|$)",n+=l}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?r[n+2]==="{"?c(r.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(r.indexOf("}",n)-n+1):c(2);break;case"k":c(r.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):c(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),t.flags)}var dh={};OC(dh,{URI:()=>yu,Utils:()=>b_});var mx;(()=>{"use strict";var t={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,l){for(var u,f="",m=0,T=-1,S=0,A=0;A<=c.length;++A){if(A<c.length)u=c.charCodeAt(A);else{if(u===47)break;u=47}if(u===47){if(!(T===A-1||S===1))if(T!==A-1&&S===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=A,S=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=A,S=0;continue}}l&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(T+1,A):f=c.slice(T+1,A),m=A-T-1;T=A,S=0}else u===46&&S!==-1?++S:S=-1}return f}var a={resolve:function(){for(var c,l="",u=!1,f=arguments.length-1;f>=-1&&!u;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(l=m+"/"+l,u=m.charCodeAt(0)===47)}return l=s(l,!u),u?l.length>0?"/"+l:"/":l.length>0?l:"."},normalize:function(c){if(o(c),c.length===0)return".";var l=c.charCodeAt(0)===47,u=c.charCodeAt(c.length-1)===47;return(c=s(c,!l)).length!==0||l||(c="."),c.length>0&&u&&(c+="/"),l?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,l=0;l<arguments.length;++l){var u=arguments[l];o(u),u.length>0&&(c===void 0?c=u:c+="/"+u)}return c===void 0?".":a.normalize(c)},relative:function(c,l){if(o(c),o(l),c===l||(c=a.resolve(c))===(l=a.resolve(l)))return"";for(var u=1;u<c.length&&c.charCodeAt(u)===47;++u);for(var f=c.length,m=f-u,T=1;T<l.length&&l.charCodeAt(T)===47;++T);for(var S=l.length-T,A=m<S?m:S,N=-1,C=0;C<=A;++C){if(C===A){if(S>A){if(l.charCodeAt(T+C)===47)return l.slice(T+C+1);if(C===0)return l.slice(T+C)}else m>A&&(c.charCodeAt(u+C)===47?N=C:C===0&&(N=0));break}var v=c.charCodeAt(u+C);if(v!==l.charCodeAt(T+C))break;v===47&&(N=C)}var g="";for(C=u+N+1;C<=f;++C)C!==f&&c.charCodeAt(C)!==47||(g.length===0?g+="..":g+="/..");return g.length>0?g+l.slice(T+N):(T+=N,l.charCodeAt(T)===47&&++T,l.slice(T))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var l=c.charCodeAt(0),u=l===47,f=-1,m=!0,T=c.length-1;T>=1;--T)if((l=c.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?u?"/":".":u&&f===1?"//":c.slice(0,f)},basename:function(c,l){if(l!==void 0&&typeof l!="string")throw new TypeError('"ext" argument must be a string');o(c);var u,f=0,m=-1,T=!0;if(l!==void 0&&l.length>0&&l.length<=c.length){if(l.length===c.length&&l===c)return"";var S=l.length-1,A=-1;for(u=c.length-1;u>=0;--u){var N=c.charCodeAt(u);if(N===47){if(!T){f=u+1;break}}else A===-1&&(T=!1,A=u+1),S>=0&&(N===l.charCodeAt(S)?--S==-1&&(m=u):(S=-1,m=A))}return f===m?m=A:m===-1&&(m=c.length),c.slice(f,m)}for(u=c.length-1;u>=0;--u)if(c.charCodeAt(u)===47){if(!T){f=u+1;break}}else m===-1&&(T=!1,m=u+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var l=-1,u=0,f=-1,m=!0,T=0,S=c.length-1;S>=0;--S){var A=c.charCodeAt(S);if(A!==47)f===-1&&(m=!1,f=S+1),A===46?l===-1?l=S:T!==1&&(T=1):l!==-1&&(T=-1);else if(!m){u=S+1;break}}return l===-1||f===-1||T===0||T===1&&l===f-1&&l===u+1?"":c.slice(l,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(l,u){var f=u.dir||u.root,m=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var l={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return l;var u,f=c.charCodeAt(0),m=f===47;m?(l.root="/",u=1):u=0;for(var T=-1,S=0,A=-1,N=!0,C=c.length-1,v=0;C>=u;--C)if((f=c.charCodeAt(C))!==47)A===-1&&(N=!1,A=C+1),f===46?T===-1?T=C:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){S=C+1;break}return T===-1||A===-1||v===0||v===1&&T===A-1&&T===S+1?A!==-1&&(l.base=l.name=S===0&&m?c.slice(1,A):c.slice(S,A)):(S===0&&m?(l.name=c.slice(1,T),l.base=c.slice(1,A)):(l.name=c.slice(S,T),l.base=c.slice(S,A)),l.ext=c.slice(T,A)),S>0?l.dir=c.slice(0,S-1):m&&(l.dir="/"),l},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>xt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,w){if(!M.scheme&&w)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let l="",u="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(w){return w instanceof m||!!w&&typeof w.authority=="string"&&typeof w.fragment=="string"&&typeof w.path=="string"&&typeof w.query=="string"&&typeof w.scheme=="string"&&typeof w.fsPath=="string"&&typeof w.with=="function"&&typeof w.toString=="function"}scheme;authority;path;query;fragment;constructor(w,q,j,ce,ee,Q=!1){typeof w=="object"?(this.scheme=w.scheme||l,this.authority=w.authority||l,this.path=w.path||l,this.query=w.query||l,this.fragment=w.fragment||l):(this.scheme=function(Rt,ut){return Rt||ut?Rt:"file"}(w,Q),this.authority=q||l,this.path=function(Rt,ut){switch(Rt){case"https":case"http":case"file":ut?ut[0]!==u&&(ut=u+ut):ut=u}return ut}(this.scheme,j||l),this.query=ce||l,this.fragment=ee||l,c(this,Q))}get fsPath(){return v(this,!1)}with(w){if(!w)return this;let{scheme:q,authority:j,path:ce,query:ee,fragment:Q}=w;return q===void 0?q=this.scheme:q===null&&(q=l),j===void 0?j=this.authority:j===null&&(j=l),ce===void 0?ce=this.path:ce===null&&(ce=l),ee===void 0?ee=this.query:ee===null&&(ee=l),Q===void 0?Q=this.fragment:Q===null&&(Q=l),q===this.scheme&&j===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new S(q,j,ce,ee,Q)}static parse(w,q=!1){let j=f.exec(w);return j?new S(j[2]||l,X(j[4]||l),X(j[5]||l),X(j[7]||l),X(j[9]||l),q):new S(l,l,l,l,l)}static file(w){let q=l;if(i&&(w=w.replace(/\\/g,u)),w[0]===u&&w[1]===u){let j=w.indexOf(u,2);j===-1?(q=w.substring(2),w=u):(q=w.substring(2,j),w=w.substring(j)||u)}return new S("file",q,w,l,l)}static from(w){let q=new S(w.scheme,w.authority,w.path,w.query,w.fragment);return c(q,!0),q}toString(w=!1){return g(this,w)}toJSON(){return this}static revive(w){if(w){if(w instanceof m)return w;{let q=new S(w);return q._formatted=w.external,q._fsPath=w._sep===T?w.fsPath:null,q}}return w}}let T=i?1:void 0;class S extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(w=!1){return w?g(this,!0):(this._formatted||(this._formatted=g(this,!1)),this._formatted)}toJSON(){let w={$mid:1};return this._fsPath&&(w.fsPath=this._fsPath,w._sep=T),this._formatted&&(w.external=this._formatted),this.path&&(w.path=this.path),this.scheme&&(w.scheme=this.scheme),this.authority&&(w.authority=this.authority),this.query&&(w.query=this.query),this.fragment&&(w.fragment=this.fragment),w}}let A={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,w,q){let j,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||w&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let Rt=A[Q];Rt!==void 0?(ce!==-1&&(j+=encodeURIComponent(M.substring(ce,ee)),ce=-1),j+=Rt):ce===-1&&(ce=ee)}}return ce!==-1&&(j+=encodeURIComponent(M.substring(ce))),j!==void 0?j:M}function C(M){let w;for(let q=0;q<M.length;q++){let j=M.charCodeAt(q);j===35||j===63?(w===void 0&&(w=M.substr(0,q)),w+=A[j]):w!==void 0&&(w+=M[q])}return w!==void 0?w:M}function v(M,w){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?w?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function g(M,w){let q=w?C:N,j="",{scheme:ce,authority:ee,path:Q,query:Rt,fragment:ut}=M;if(ce&&(j+=ce,j+=":"),(ee||ce==="file")&&(j+=u,j+=u),ee){let me=ee.indexOf("@");if(me!==-1){let Nr=ee.substr(0,me);ee=ee.substr(me+1),me=Nr.lastIndexOf(":"),me===-1?j+=q(Nr,!1,!1):(j+=q(Nr.substr(0,me),!1,!1),j+=":",j+=q(Nr.substr(me+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?j+=q(ee,!1,!0):(j+=q(ee.substr(0,me),!1,!0),j+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}j+=q(Q,!0,!1)}return Rt&&(j+="?",j+=q(Rt,!1,!1)),ut&&(j+="#",j+=w?ut:N(ut,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let O=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(O)?M.replace(O,w=>$(w)):M}var ge=r(470);let Ee=ge.posix||ge,Ht="/";var xt;(function(M){M.joinPath=function(w,...q){return w.with({path:Ee.join(w.path,...q)})},M.resolvePath=function(w,...q){let j=w.path,ce=!1;j[0]!==Ht&&(j=Ht+j,ce=!0);let ee=Ee.resolve(j,...q);return ce&&ee[0]===Ht&&!w.authority&&(ee=ee.substring(1)),w.with({path:ee})},M.dirname=function(w){if(w.path.length===0||w.path===Ht)return w;let q=Ee.dirname(w.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),w.with({path:q})},M.basename=function(w){return Ee.basename(w.path)},M.extname=function(w){return Ee.extname(w.path)}})(xt||(xt={}))})(),mx=n})();var{URI:yu,Utils:b_}=mx;var ai=dh;"default"in ai&&(ai=ai.default);var Jt=ai.URI;var ve;(function(t){t.basename=ai.Utils.basename,t.dirname=ai.Utils.dirname,t.extname=ai.Utils.extname,t.joinPath=ai.Utils.joinPath,t.resolvePath=ai.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),l=0;for(;l<a.length&&a[l]===c[l];l++);let u="../".repeat(a.length-l),f=c.slice(l).join("/");return u+f}t.relative=r})(ve=ve||(ve={}));var TK=ve.equals,vK=ve.relative;var gu,hx=()=>gu??(gu=Tu(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var Ru=de(co(),1);var uc=de(Qn(),1);function S_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var yx=0,w_=10;var gx=Symbol("OperationCancelled");function bo(t){return t===gx}async function Ze(t){if(t===uc.CancellationToken.None)return;let e=Date.now();if(e-yx>=w_&&(yx=e,await S_()),t.isCancellationRequested)throw gx}var vu=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new uc.CancellationTokenSource}lock(e){this.cancel();let r=new uc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{bo(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Fr(t){return{code:t}}var gs;(function(t){t.all=["fast","slow","built-in"]})(gs=gs||(gs={}));var xu=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function Tx(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:So(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(hn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:So(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function So(t){if(go(t))return{elementType:So(t.elementType)};if(To(t))return{referenceType:So(t.referenceType)};if(Vr(t))return{types:t.types.map(So)};if(or(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=In(r);if(n)return Ts(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function vs(t){return"referenceType"in t}function ph(t){return"elementType"in t}function vx(t){return"types"in t}function mh(t){return"value"in t}function A_(t){return"primitive"in t}function C_(t){return"string"in t}function xx(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ms(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new lu(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=k_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=fc(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function k_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:fc(t.type,void 0,e,r)}}function fc(t,e,r,n){if(ph(t))return{elementType:fc(t.elementType,e,r,n)};if(vs(t))return{referenceType:fc(t.referenceType,void 0,r,n)};if(vx(t))return{types:t.types.map(i=>fc(i,e,r,n))};if(C_(t))return{string:t.string};if(A_(t))return{primitive:t.primitive,regex:t.regex};if(mh(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function yh(t,e){let r=dc(t),n=dc(e);for(let i of n)E_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function E_(t,e){return t.some(r=>hh(r,e))}function hh(t,e){return ph(t)&&ph(e)?hh(t.elementType,e.elementType):vs(t)&&vs(e)?hh(t.referenceType,e.referenceType):mh(t)&&mh(e)?t.value===e.value:!1}function dc(t){return vx(t)?t.types.flatMap(e=>dc(e)):[t]}function Rx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Ae;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Ae=Ae||(Ae={}));var bu=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Fr(Ae.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>K(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>K(o)&&!Ur(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Fr(Ae.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Ur(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!pc(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Le;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(l=>{r("error",`A ${i}'s name has to be unique.`,{node:l,property:"name"})});let s=new Set,a=mc(this.documents,e);for(let c of a)n(c).forEach(l=>s.add(l.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(u=>{r("error",`A ${i} with the name '${u.name}' already exists in an imported grammar.`,{node:u,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Le;for(let i of e.imports){let o=ci(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[Ru.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=mc(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),l=this.getDuplicateExportedRules(s,c);for(let u of l)i.add(o,u)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let l of o){let u=l.name;c===u&&s.add(l.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of mc(this.documents,e))c.types.forEach(l=>s.add(l.name)),c.interfaces.forEach(l=>s.add(l.name));for(let c of e.rules.filter(K)){if(pc(c))continue;let l=Ur(c),u=!c.returnType&&!c.dataType,f=In(c);if(!l&&f&&s.has(f)===u){if((u||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)r("error",a(f,u),{node:c,property:"name",data:Fr(Ae.MissingReturns)});else if(u||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Xr(c.inferredType.$cstNode,"infers");r("error",a(f,u),{node:c.inferredType,property:"name",data:{code:Ae.InvalidInfers,actionSegment:ir(m)}})}}else if(l&&u){let m=Xr(c.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:Ae.InvalidInfers,actionSegment:ir(m)}})}}for(let c of Qe(e).filter(Ne)){let l=this.getActionType(c);if(l){let u=!!c.inferredType,f=In(c);if(c.type&&f&&s.has(f)===u){let m=u?Xr(c.$cstNode,"infer"):Xr(c.$cstNode,"{");r("error",a(f,u),{node:c,property:"type",data:{code:u?Ae.SuperfluousInfer:Ae.MissingInfer,actionSegment:ir(m)}})}else if(l&&f&&s.has(f)&&u&&c.$cstNode){let m=Yt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=Xr(c.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:Ae.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(c,l){return l?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Fr(Ae.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Jr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",l=new Set,u=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);c.includes(T)?s.includes(T)&&u.add(T):l.add(T)}let f=this.getFlagRange(e);f&&(l.size>0?r("error",`'${Array.from(l).join("")}' ${l.size>1?"are":"is"} not valid regular expression flag${l.size>1?"s":""}.`,{node:e,range:f}):u.size>0&&r("warning",`'${Array.from(u).join("")}' regular expression flag${u.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!we(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Yt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Ie(e,i=>we(i)||K(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;we(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;we(n)&&n.fragment&&Ie(e,K)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Fr(Ae.CrossRefTokenSyntax)})}checkPackageImport(e,r){ci(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Fr(Ae.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Fr(Ae.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=xs(e,!0);for(let i of e.rules)we(i)&&i.hidden||pc(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[Ru.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Le,i=new Set;for(let l of e.rules)we(l)&&l.name&&n.add(l.name,l),K(l)&&Qe(l).filter(pt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let l of e.imports){let u=mc(this.documents,l);for(let f of u)for(let m of f.rules)we(m)&&m.name?o.add(m.name,l):K(m)&&m.name&&Qe(m).filter(pt).forEach(S=>s.add(S.value,l))}for(let l of n.values())if(i.has(l.name))r("error","Terminal name clashes with existing keyword.",{node:l,property:"name"});else if(s.has(l.name)){let u=s.get(l.name);r("error",`Terminal name clashes with imported keyword from "${u[0].path}".`,{node:l,property:"name"})}let a=new Le;for(let l of i)for(let u of o.get(l))a.add(u,l);for(let[l,u]of a.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with locally defined keywords.`,{node:l,property:"path"});let c=new Le;for(let[l,u]of o.entriesGroupedByKey()){let f=s.get(l);f.length>0&&u.filter(m=>!f.includes(m)).forEach(m=>c.add(m,l))}for(let[l,u]of c.entriesGroupedByKey())u.length>0&&r("error",`Imported terminals (${u.join(", ")}) clash with imported keywords.`,{node:l,property:"path"})}checkRuleName(e,r){if(e.name&&!pc(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Fr(Ae.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&$_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Ie(e,K)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Yr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Fr(Ae.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(ls);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[Ru.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(pc(e))return;let n=Sx(e),i=Ur(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&_e(e.terminal)&&K(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>Vt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=So(n.type),o=dc(i),s=!1,a=!1;for(let c of o)vs(c)?s=!0:vs(c)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!Ts(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(K(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else we(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!hc(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(_e(i)){let o=i.rule.ref;K(o)&&!Ur(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):K(o)&&!wx(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):we(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Mt(e.type.ref)&&Vr(e.type.ref.type)){let n=bx(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;K((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){or(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&K(e.ref)&&!Ur(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=In(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Vt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function pc(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var $_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function bx(t){let e=[];return t.types.forEach(r=>{var n;or(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Mt(r.typeRef.ref)&&(Vr(r.typeRef.ref.type)?e.push(...bx(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Yr(t,e){return t==="?"||t==="*"||Ft(e)&&!!e.guardCondition}function Ax(t){return t==="*"||t==="+"}function Ur(t){return Cx(t,new Set)}function Cx(t,e){if(e.has(t))return!0;e.add(t);for(let r of Qe(t))if(_e(r)){if(!r.rule.ref||K(r.rule.ref)&&!Cx(r.rule.ref,e))return!1}else{if(Re(r))return!1;if(Ne(r))return!1}return!!t.definition}function Sx(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Mt(r)&&N_(r)}function N_(t){return Th(t.type,new Set)}function Th(t,e){if(e.has(t))return!0;if(e.add(t),go(t))return!1;if(To(t))return!1;if(Vr(t))return t.types.every(r=>Th(r,e));if(or(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Mt(r)?Th(r.type,e):!1}else return!1}else return!1}function wx(t){return yc(t,new Set)}function yc(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),K(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return yc(t.returnType.ref,e)}else{if(Mt(t))return yc(t.type,e);if(go(t))return!1;if(To(t))return!1;if(Vr(t))return t.types.every(i=>yc(i,e));if(or(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return yc(t.typeRef.ref,e)}}return!1}function xh(t){let e=t.$container;if(Ft(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(Ne(o))return o;{let s=Qe(r[i]).find(Ne);if(s)return s}}}if(ss(e))return xh(e)}function hn(t){var e;if(K(t))return Ur(t)?t.name:(e=bs(t))!==null&&e!==void 0?e:t.name;if(wr(t)||Mt(t)||us(t))return t.name;if(Ne(t)){let r=Ss(t);if(r)return r}else if(cs(t))return t.name;throw new uu("Cannot get name of Unknown Type",t.$cstNode)}function In(t){if(t)try{return hn(t)}catch{return}}function bs(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(K(e))return e.name;if(wr(e)||Mt(e))return e.name}}}function Ss(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return hn(t.type.ref)}function wo(t){var e,r,n;return we(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Ur(t)?t.name:(n=bs(t))!==null&&n!==void 0?n:t.name}function Jr(t){let e={s:!1,i:!1,u:!1},r=ws(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var Rh=/[\s\S]/.source;function ws(t,e){if(Dv(t))return __(t);if(Mv(t))return I_(t);if(nu(t))return D_(t);if(iu(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return li(ws(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(Nv(t))return O_(t);if(Gv(t))return P_(t);if(Iv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),li(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Hv(t))return li(Rh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function __(t){return li(t.elements.map(e=>ws(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function I_(t){return li(t.elements.map(e=>ws(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function P_(t){return li(`${Rh}*?${ws(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function O_(t){return li(`(?!${ws(t.terminal)})${Rh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function D_(t){return t.right?li(`[${gh(t.left)}-${gh(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):li(gh(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function gh(t){return si(t.value)}function li(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function bh(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function ci(t,e){let r=bh(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(as(i))return i}}catch{}}function mc(t,e){if(tu(e)){let r=ci(t,e);if(r){let n=vh(t,r);return n.push(r),n}return[]}else return vh(t,e)}function vh(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ci(t,s);a&&vh(t,a,r,n,i)}}return Array.from(i)}function Rs(t){return Re(t)?[t]:Or(t)||Ft(t)||Dr(t)?t.elements.flatMap(e=>Rs(e)):_e(t)&&t.rule.ref?Rs(t.rule.ref.definition):[]}var L_=["string","number","boolean","Date","bigint"];function Ts(t){return L_.includes(t)}var Sh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:kx(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(l=>l!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return Ix(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(kx(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Ao();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function M_(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(Ex)}}function kx(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>Ex(e))}}function Ex(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function $x(t,e,r){let n=[],i={fragments:new Map};for(let c of t)n.push(...Nx(i,c));let o=H_(n),s=K_(o),a=B_(o,s,r);for(let c of e){let l=F_(c);a.unions.push({name:c.name,declared:!1,type:l,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function F_(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=wh(t.definition,r);return e?{primitive:"string"}:n}function wh(t,e){var r,n,i;if(t.cardinality)return e();if(Or(t))return{types:t.elements.map(o=>wh(o,e))};if(Ft(t)||Dr(t))return t.elements.length!==1?e():wh(t.elements[0],e);if(_e(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?we(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Jr(o).toString()}:{value:o.name}:e()}else if(pt(t))return{string:t.value};return e()}function Nx(t,e){let r=Ao(e),n=new Sh(t,r);return e.definition&&Ah(n,n.root,e.definition),n.getTypes()}function Ao(t){return{name:K(t)||Ne(t)?In(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Ah(t,e,r){let n=Yr(r.cardinality,r);if(Or(r)){let i=[];n&&i.push(t.connect(e,Ao()));for(let o of r.elements){let s=t.connect(e,Ao());i.push(Ah(t,s,o))}return t.merge(...i)}else if(Ft(r)||Dr(r)){let i=t.connect(e,Ao()),o;n&&(o=t.connect(e,Ao()));for(let s of r.elements)i=Ah(t,i,s);return o?t.merge(o,i):i}else{if(Ne(r))return U_(t,e,r);Re(r)?q_(e,r):_e(r)&&G_(t,e,r)}return e}function U_(t,e,r){var n;if(!t.hasLeafNode(e)){let o=M_(e);t.connect(e,o)}let i=t.connect(e,Ao(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&sc(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:Co(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function q_(t,e){let r={types:new Set,reference:!1};_x(e.terminal,r);let n=Co(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Yr(e.cardinality),type:n,astNodes:new Set([e])})}function _x(t,e){if(Or(t)||Dr(t)||Ft(t))for(let r of t.elements)_x(r,e);else if(pt(t))e.types.add(`'${t.value}'`);else if(_e(t)&&t.rule.ref)e.types.add(wo(t.rule.ref));else if(Vt(t)&&t.type.ref){let r=In(t.type.ref);r&&e.types.add(r),e.reference=!0}}function G_(t,e,r){let n=r.rule.ref;if(K(n)&&n.fragment){let i=j_(n,t.context);Yr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else K(n)&&e.ruleCalls.push(wo(n))}function j_(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=In(t),o=Nx(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function H_(t){let e=new Map,r=[],n=Ix(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function Ix(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Le),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let l=c.alt;a.alt.super.push(...l.super),a.next.push(...c.next);let u=l.properties;for(let f of u){let m=o.find(T=>T.name===f.name);m?(m.type=yh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}l.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let l=c.alt;if(l.ruleCalls.length===0)for(let u of o)l.properties.find(f=>f.name===u.name)||(u.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function K_(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Le;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:Co(!1,!1,o)};r.push(s)}return r}function B_(t,e,r){let n=new Le;for(let a of t)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let l=Co(!1,!1,Array.from(c)),u=s.get(a.name);if(u)u.type=yh(u.type,l);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:l};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function Co(t,e,r){if(t)return{elementType:Co(!1,e,r)};if(e)return{referenceType:Co(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:Ts(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>Co(!1,!1,[n]))}}function Px(t,e){let r=Ox(t,e),n=Tx(r.interfaces,r.types),i=$x(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function Ox(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)K(s)&&!s.fragment&&(Ur(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ci(e,a)).filter(a=>a!==void 0);Ox(s,e,r,n)}}}return n}function Mx(t,e){let{inferred:r,declared:n,astResources:i}=Px(t,e);return{astResources:i,inferred:Dx(n,r),declared:Dx(r,n)}}function Dx(t,e){var r,n;let i={interfaces:lx(Lx(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:Lx(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=xx(i);return W_(o),o}function Lx(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function W_(t){let e=V_(t),r=Array.from(e.values());X_(r),Y_(t.interfaces),z_(r)}function z_(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function V_({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,Ch(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function Ch(t,e){if(e.has(t))return!0;if(e.add(t),Ot(t))return t.types.every(r=>Ch(r,e));if(Lr(t)){let r=t.value;return dn(r)?Ch(r.type,e):!1}else return Mr(t)||Nn(t)}function X_(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function Y_(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(c=>ux(c.type));for(let c of a)(e=r.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)mn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var J_={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},Q_={maxLookahead:3},Fx={AstReflection:()=>new Qa},Ux={Grammar:()=>hx(),LanguageMetaData:()=>J_,parser:{ParserConfig:()=>Q_}};var gc=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},As=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},qx={getElement(){},getAllElements(){return os}};var Su=de(Qn(),1);var Cs=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=Su.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=_i,i=Su.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ze(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=Su.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var wu=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},kh=class extends wu{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},Au=class extends wu{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var Cu=class extends kh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var ks=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new Cu(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new gc(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new gc(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new As(this.indexManager.allElements(e)))}};var ku=class extends ks{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===yo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=ou(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===Za||c.type===ec))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Ie(r.container,as);if(!n)return qx;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===yo&&(o=o.filter(s=>s.type===Za||s.type===ec)),new As(o)}gatherImports(e,r){for(let n of e.imports){let i=bh(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;as(s)&&this.gatherImports(s,r)}}}},Eu=class extends Cs{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),K(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(Ne(o)&&o.inferredType){let s=Ss(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){us(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&K(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=ou(e);if(i&&Ne(e)&&e.inferredType){let o=Ss(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=ir((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:ir(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var qr=de(Se(),1);var sr=de(Se(),1);var $u=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=sr.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===yn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(bo(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:sr.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Fr(yn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=sr.Range.create(0,0,0,0);else{let a=sr.Position.create(s.endLine-1,s.endColumn);o=sr.Range.create(a,a)}}}else o=Ja(i.token);if(o){let s={severity:sr.DiagnosticSeverity.Error,range:o,message:i.message,data:Fr(yn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:yn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=sr.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(ni(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:Z_(n),severity:eI(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function Z_(t){if(sr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Yt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Xr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function eI(t){switch(t){case"error":return sr.DiagnosticSeverity.Error;case"warning":return sr.DiagnosticSeverity.Warning;case"info":return sr.DiagnosticSeverity.Information;case"hint":return sr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var yn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(yn=yn||(yn={}));var Nu=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Ae.GrammarNameUppercase:case Ae.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Ae.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Ae.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Ae.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Ae.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Ae.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Ae.MissingReturns:n(this.fixMissingReturns(e,r));break;case Ae.InvalidInfers:case Ae.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Ae.MissingInfer:n(this.fixMissingInfer(e,r));break;case Ae.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case yn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=Sr(i,n),s=Ie(o?.astNode,nu);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${si(a)}-${si(c)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Yt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,l=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(l)}})}for(let a of i){let c=a.ref;if(c&&we(c)&&!c.hidden&&c.$cstNode){let l=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:l,end:l}})}}return{title:"Fix hidden terminals",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=Sr(o,i),a=Ie(s?.astNode,K);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===r.refText),l=[],u=-1,f=-1;for(let m of c){if(ve.equals(m.documentUri,n.uri))continue;let T=tI(n.uri,m.documentUri),S,A="",N=n.parseResult.value,C=N.imports.find(v=>v.path&&T<v.path);if(C)S=(i=C.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(S={line:v.line+1,character:0})}else N.rules.length>0&&(S=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,A=`
`);S&&((u<0||T.length<f)&&(u=l.length,f=T.length),l.push({title:`Add import to '${T}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:S,end:S},newText:`import '${T}'
${A}`}]}}}))}return u>=0&&(l[u].isPreferred=!0),l}};function tI(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var Kx=de(co(),1);var Ns=de(Se(),1);function Eh(t,e){let r={stacks:t,tokens:e};return rI(r),r.stacks.flat().forEach(i=>{i.property=void 0}),jx(r.stacks).map(i=>i[i.length-1])}function $h(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(Ft(c.$container)){a=c.$container;break}else if(ss(c.$container))c=c.$container;else break;if(Ax(c.cardinality)){let l=Es({next:{feature:c,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let u of l)i.add(u.feature);o.push(...l)}if(a){let l=a.elements.indexOf(c);l!==void 0&&l<a.elements.length-1&&o.push(...Gx({feature:a,type:e.type,new:!1},l+1,r,n,i)),o.every(u=>Yr(u.feature.cardinality,u.feature)||Yr(r.get(u.feature))||i.has(u.feature))&&o.push(...$h({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function Tc(t){return Et(t)&&(t={feature:t}),Es({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function Es(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:c,type:l}=i;if(Ft(c)){if(s.has(c))return[];s.add(c)}if(Ft(c))return Gx(i,0,o,s,a).map(u=>_u(u,c.cardinality,o));if(Or(c)||Dr(c))return c.elements.flatMap(u=>Es({next:{feature:u,new:!1,type:l},cardinalities:o,visited:s,plus:a})).map(u=>_u(u,c.cardinality,o));if(Re(c)){let u={feature:c.terminal,new:!1,type:l,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return Es({next:u,cardinalities:o,visited:s,plus:a}).map(f=>_u(f,c.cardinality,o))}else{if(Ne(c))return $h({next:{feature:c,new:!0,type:hn(c),property:(r=i.property)!==null&&r!==void 0?r:c.feature},cardinalities:o,visited:s,plus:a});if(_e(c)&&K(c.rule.ref)){let u=c.rule.ref,f={feature:u.definition,new:!0,type:u.fragment?void 0:(n=bs(u))!==null&&n!==void 0?n:u.name,property:i.property};return Es({next:f,cardinalities:o,visited:s,plus:a}).map(m=>_u(m,c.cardinality,o))}else return[i]}}function _u(t,e,r){return r.set(t.feature,e),t}function Gx(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...Es({next:a,cardinalities:r,visited:n,plus:i})),!!Yr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function rI(t){for(let e of t.tokens){let r=jx(t.stacks,e);t.stacks=r}}function jx(t,e){let r=[];for(let n of t)r.push(...nI(n,e));return r}function nI(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(iI)),i=[];for(;t.length>0;){let o=t.pop(),s=$h({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?Nh(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Yr(a.feature.cardinality,a.feature)||Yr(r.get(a.feature))))break}return i}function iI(t){if(t.cardinality==="+")return!0;let e=Ie(t,Re);return!!(e&&e.cardinality==="+")}function Nh(t,e){if(pt(t))return t.value===e.image;if(_e(t))return oI(t.rule.ref,e);if(Vt(t)){let r=Iu(t);if(r)return Nh(r,e)}return!1}function oI(t,e){return K(t)?Tc(t.definition).some(n=>Nh(n.feature,e)):we(t)?Jr(t).test(e.image):!1}function Hx(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var $s=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(c,l)=>{let u=this.fillCompletionItem(c,l);u&&n.push(u)},s=c=>pt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(l=>this.completionFor(c,l,o))),a.push(...c.features),!this.continueCompletion(n))break;return Ns.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:Ns.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=Pu(this.grammar),l=Tc({feature:c.definition,new:!0,type:bs(c)});return o.length>0?(o.shift(),Eh(l.map(u=>[u]),o)):l}let s=[...o].splice(i.tokenIndex);return Eh([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,r){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let l=e.textDocument,u=l.getText(),f=l.offsetAt(r),m={document:e,textDocument:l,offset:f,position:r},T=this.findDataTypeRuleStart(c,f);if(T){let[g,$]=T,O=(n=Sr(c,g))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(l,g);yield Object.assign(Object.assign({},m),{node:O,tokenOffset:g,tokenEndOffset:$,features:X})}let{nextTokenStart:S,nextTokenEnd:A,previousTokenStart:N,previousTokenEnd:C}=this.backtrackToAnyToken(u,f),v;if(N!==void 0&&C!==void 0&&C===f){v=(i=Sr(c,N))===null||i===void 0?void 0:i.astNode;let g=this.findFeaturesAt(l,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:C,features:g})}if(v=(s=(o=Sr(c,S))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=Sr(c,N))===null||a===void 0?void 0:a.astNode,v){let g=this.findFeaturesAt(l,S);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:S,tokenEndOffset:A,features:g})}else{let g=Pu(this.grammar),$=Tc(g.definition);yield Object.assign(Object.assign({},m),{tokenOffset:S,tokenEndOffset:A,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=Pt(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,K))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,K))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(K(r)){let i=Tc(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(pt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Vt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Ie(r.feature,Re),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(l=>{!c.has(l.name)&&this.filterCrossReference(l)&&(n(e,this.createReferenceCompletionItem(l)),c.add(l.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:Ns.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let l=this.nameProvider.getName(r.node);if(!l)return;o=l}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Ou=class extends $s{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Ie(r.feature,Re);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(u=>u.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),l=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:l}}for(let a of o){let c=i.length>0?"":'"',l=`${c}${a}${c}`;r(e,{label:a,textEdit:{newText:l,range:s},kind:Kx.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-ve.extname(s.uri).length),l=ve.relative(i,c);l.startsWith(".")||(l=`./${l}`),o.push(l)}return o}};var vc=de(Se(),1);var _s=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of YT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,vc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),vc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===vc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Du=class extends _s{shouldProcessContent(e){return!K(e)}};var Lu=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new _h(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,c,l)=>{var u,f;let m=this.nodeModeToKey(a,c),T=i.get(m),S=(u=l.options.priority)!==null&&u!==void 0?u:0,A=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||A<=S)&&i.set(m,l)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),l,u;do if(u=c.next(),!u.done){let f=u.value,m=mo(f),T=this.nodeModeToKey(f,"prepend"),S=r.get(T);if(r.delete(T),S){let C=this.createTextEdit(l,f,S,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let A=this.nodeModeToKey(f,"append"),N=r.get(A);if(r.delete(A),N){let C=ZT(f);if(C){let v=this.createTextEdit(f,C,N,o);for(let g of v)g&&this.insideRange(g.range,i)&&this.isNecessary(g,e.textDocument)&&s.push(g)}}if(!S&&f.hidden){let C=this.createHiddenTextEdits(l,f,void 0,o);for(let v of C)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(l=f)}while(!u.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:r.range.start},l=i.document.getText(c),u=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(l,i),T=this.getIndentationCharacterCount(i,u)-f;if(T===0)return[];let S="";T>0&&(S=(i.options.insertSpaces?" ":"	").repeat(T));let A=r.text.split(`
`);A[0]=l+A[0];for(let N=0;N<A.length;N++){let C=s+N,v={character:0,line:C};if(T>0)a.push({newText:S,range:{start:v,end:v}});else{let g=A[N],$=0;for(;$<g.length;$++){let O=g.charAt($);if(O!==" "&&O!=="	")break}a.push({newText:"",range:{start:v,end:{line:C,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,l=a.lines,u=a.tabs,f=i.indentation;i.indentation+=u??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):l!==void 0?m.push(this.createLineTextEdit(s,l,i,n.options)):u!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),mo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new zr(i,o=>this.iterateCst(o,r)):os}iterateCst(e,r){if(!$n(e))return os;let n=r.indentation;return new Pr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,hr))}},_h=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new gn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new gn(r,this.collector)}property(e,r){let n=Yt(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Ii(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}keyword(e,r){let n=Xr(this.astNode.$cstNode,e,r);return new gn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Mu(this.astNode.$cstNode,n);r.push(...i)}return new gn(r,this.collector)}cst(e){return new gn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new gn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new gn(ev(o,s),this.collector)}},gn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ye;(function(t){function e(...u){return{options:{},moves:u.flatMap(f=>f.moves).sort(l)}}t.fit=e;function r(u){return i(0,u)}t.noSpace=r;function n(u){return i(1,u)}t.oneSpace=n;function i(u,f){return{options:f??{},moves:[{characters:u}]}}t.spaces=i;function o(u){return s(1,u)}t.newLine=o;function s(u,f){return{options:f??{},moves:[{lines:u}]}}t.newLines=s;function a(u){return{options:u??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function c(u){return{options:u??{},moves:[{tabs:0}]}}t.noIndent=c;function l(u,f){var m,T,S,A,N,C;let v=(m=u.lines)!==null&&m!==void 0?m:0,g=(T=f.lines)!==null&&T!==void 0?T:0,$=(S=u.tabs)!==null&&S!==void 0?S:0,O=(A=f.tabs)!==null&&A!==void 0?A:0,X=(N=u.characters)!==null&&N!==void 0?N:0,ge=(C=f.characters)!==null&&C!==void 0?C:0;return v<g?-1:v>g?1:$<O?-1:$>O?1:X<ge?-1:X>ge?1:0}})(ye=ye||(ye={}));var Fu=class extends Lu{format(e){if(Vt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ye.noSpace());else if(K(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ye.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ye.oneSpace()):r.property("name").append(ye.noSpace()),r.properties("parameters").append(ye.noSpace()),r.keywords(",").append(ye.oneSpace()),r.keywords("<").append(ye.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ye.noSpace()),r.interior(i,n).prepend(ye.indent()),n.prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(we(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ye.oneSpace()),r.keyword("returns").append(ye.oneSpace())),r.keywords("hidden","terminal","fragment").append(ye.oneSpace()),r.keyword(":").prepend(ye.noSpace()),r.keyword(";").prepend(ye.fit(ye.noSpace(),ye.newLine())),r.node(e).prepend(ye.noIndent())}else if(Ne(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ye.noSpace()),r.keywords(".","+=","=").surround(ye.noSpace()),r.keyword("}").prepend(ye.noSpace())}else if(cs(e))this.getNodeFormatter(e).keywords("infer","infers").append(ye.oneSpace());else if(Re(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ye.noSpace());else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ye.noSpace()),r.keyword(",").append(ye.oneSpace()),r.properties("arguments").append(ye.noSpace())}ss(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ye.noSpace())}};var ui=de(Se(),1);var oe=de(Se(),1);var Oh={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},Bx={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},Wx={legend:{tokenTypes:Object.keys(Oh),tokenModifiers:Object.keys(Bx)},full:{delta:!0},range:!0},Ph=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Uu=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new Ph;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=ni(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Zl(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=Oh[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let u of o){let f=Bx[u];a|=f}}let c=n.start.line,l=n.end.line;if(c===l){let u=n.start.character,f=n.end.character-u;this.currentTokensBuilder.push(c,u,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let u=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,u,m-f,s,a)}else{let u=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(u.line,u.character,f-u.character-1,s,a);for(let m=c+1;m<l;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(l,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Yt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Ii(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=Xr(r.$cstNode,n,o);c&&a.push(c)}else a.push(...Mu(r.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},Ih;(function(t){function e(n,i){let o=new Map;Object.entries(Oh).forEach(([c,l])=>o.set(l,c));let s=0,a=0;return r(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let l=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+l}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(Ih=Ih||(Ih={}));var qu=class extends Uu{highlightElement(e,r){var n;Re(e)?r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):Ne(e)?e.feature&&r({node:e,property:"feature",type:ui.SemanticTokenTypes.property}):us(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.type}):or(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:ui.SemanticTokenTypes.type}):yv(e)?r({node:e,property:"name",type:ui.SemanticTokenTypes.parameter}):ls(e)?r({node:e,property:"parameter",type:ui.SemanticTokenTypes.parameter}):_e(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:ui.SemanticTokenTypes.type}):ru(e)&&r({node:e,property:"name",type:ui.SemanticTokenTypes.property})}};var Gu=class extends hs{getName(e){return Re(e)?e.feature:super.getName(e)}getNameNode(e){return Re(e)?Yt(e.$cstNode,"feature"):super.getNameNode(e)}};var Is=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Ps(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(ei(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(ei(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||JT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:ir(r),local:!0}}}};var ju=class extends Is{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Ps(e);if(n&&n.feature==="feature"){if(Re(r))return this.findAssignmentDeclaration(r);if(Ne(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return ru(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Ie(e,wr);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=oh(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(K(e)){let i=Rs(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Yt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Ie(e,K);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Ie(e,K),i=xh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(wr(n.returnType.ref)||Mt(n.returnType.ref))){let o=oc(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=oc(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(K(s)||Ne(s))&&r.push(s)}),r}};var xc=de(Se(),1);var zx=de(Se(),1);var Hu=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=Pt(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:zx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var Vx=de(Se(),1);var Os=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Pt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[Vx.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var Xx=de(Se(),1);var Ku=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(l=>this.createDocumentHighlight(l)).toArray()}}createDocumentHighlight(e){return Xx.DocumentHighlight.create(e.segment.range)}};var Bu=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of _i(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var Yx=de(Se(),1),Wu=class{get commands(){return Array.from(this.registeredCommands.keys())}constructor(){this.registeredCommands=new Map,this.registerCommands(this.createCommandAcceptor())}async executeCommand(e,r,n=Yx.CancellationToken.None){let i=this.registeredCommands.get(e);if(i)return i(r,n)}createCommandAcceptor(){return(e,r)=>this.registeredCommands.set(e,r)}};var zu=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let c=r.charCodeAt(a),l=e.charCodeAt(o);if((c===l||this.toUpperCharCode(c)===this.toUpperCharCode(l))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,r){return Jx<=e&&e<=Qx&&sI<=r&&r<=aI||e===Zx&&r!==Zx}toUpperCharCode(e){return Jx<=e&&e<=Qx?e-32:e}},Jx="a".charCodeAt(0),Qx="z".charCodeAt(0),sI="A".charCodeAt(0),aI="Z".charCodeAt(0),Zx="_".charCodeAt(0);var Dh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Pt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},Vu=class extends Dh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var cI=de(Se(),1);var lI=de(Se(),1);var Qr=de(Se(),1);var je;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(je=je||(je={}));var Xu=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Jt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:je.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:je.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=ns.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Yu=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,this.documentMap.delete(r)),n}};var uI=de(Se(),1);function eR(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Ju=class{constructor(e){this.onInitializeEmitter=new Qr.Emitter,this.onInitializedEmitter=new Qr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){eu(this.services),this.services.ServiceRegistry.all.forEach(e=>eu(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(w=>w.lsp.Formatter),o=n.map(w=>{var q;return(q=w.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(w=>!!w),s=this.hasService(w=>w.lsp.CodeActionProvider),a=this.hasService(w=>w.lsp.SemanticTokenProvider),c=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,l=this.hasService(w=>w.lsp.DocumentLinkProvider),u=eR(n.map(w=>{var q;return(q=w.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(w=>w.lsp.TypeProvider),m=this.hasService(w=>w.lsp.ImplementationProvider),T=this.hasService(w=>w.lsp.CompletionProvider),S=Hx(n.map(w=>{var q;return(q=w.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),A=this.hasService(w=>w.lsp.ReferencesProvider),N=this.hasService(w=>w.lsp.DocumentSymbolProvider),C=this.hasService(w=>w.lsp.DefinitionProvider),v=this.hasService(w=>w.lsp.DocumentHighlightProvider),g=this.hasService(w=>w.lsp.FoldingRangeProvider),$=this.hasService(w=>w.lsp.HoverProvider),O=this.hasService(w=>w.lsp.RenameProvider),X=this.hasService(w=>w.lsp.CallHierarchyProvider),ge=this.hasService(w=>w.lsp.CodeLensProvider),Ee=this.hasService(w=>w.lsp.DeclarationProvider),Ht=this.hasService(w=>w.lsp.InlayHintProvider),xt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Qr.TextDocumentSyncKind.Incremental,completionProvider:T?S:void 0,referencesProvider:A,documentSymbolProvider:N,definitionProvider:C,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:g,hoverProvider:$,renameProvider:O?{prepareProvider:!0}:void 0,semanticTokensProvider:a?Wx:void 0,signatureHelpProvider:u,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:l?{resolveProvider:!1}:void 0,codeLensProvider:ge?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:xt?{resolveProvider:!!xt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function rR(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");fI(e,t),dI(e,t),pI(e,t),mI(e,t),yI(e,t),gI(e,t),TI(e,t),vI(e,t),RI(e,t),SI(e,t),wI(e,t),hI(e,t),AI(e,t),bI(e,t),CI(e,t),kI(e,t),$I(e,t),_I(e,t),OI(e,t),II(e,t),NI(e,t),EI(e,t),xI(e,t),PI(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function fI(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>r.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Jt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let l of s.changes){let u=Jt.parse(l.uri);l.type===Qr.FileChangeType.Deleted?c.push(u):a.push(u)}i(a,c)})}function dI(t,e){e.workspace.DocumentBuilder.onBuildPhase(je.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function pI(t,e){t.onCompletion(ar((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function mI(t,e){t.onReferences(ar((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function hI(t,e){t.onCodeAction(ar((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function yI(t,e){t.onDocumentSymbol(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function gI(t,e){t.onDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function TI(t,e){t.onTypeDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function vI(t,e){t.onImplementation(ar((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function xI(t,e){t.onDeclaration(ar((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function RI(t,e){t.onDocumentHighlight(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function bI(t,e){t.onHover(ar((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function SI(t,e){t.onFoldingRanges(ar((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function wI(t,e){t.onDocumentFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function AI(t,e){t.onRenameRequest(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function CI(t,e){t.languages.inlayHint.on(Di((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function kI(t,e){let r={data:[]};t.languages.semanticTokens.on(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Di((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function EI(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function $I(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Ds(s)}})}function NI(t,e){t.onDocumentLinks(Di((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function _I(t,e){t.onSignatureHelp(Di((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function II(t,e){t.onCodeLens(Di((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function PI(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Ds(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Ds(a)}})}}function OI(t,e){t.languages.callHierarchy.onPrepare(Di((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(tR((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(tR((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function tR(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Jt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return Ds(a)}}}function Di(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=r.getOrCreateDocument(s);if(!c)throw new Error;try{return await t(a,c,i,o)}catch(l){return Ds(l)}}}function ar(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=r.getOrCreateDocument(s);if(!c)return null;try{return await t(a,c,i,o)}catch(l){return Ds(l)}}}function Ds(t){if(bo(t))return new Qr.ResponseError(Qr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Qr.ResponseError)return t;throw t}var Zu=de(Se(),1),Qu=class{getSymbolKind(){return Zu.SymbolKind.Field}getCompletionItemKind(){return Zu.CompletionItemKind.Reference}};var nR=de(Se(),1);var ef=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(nR.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var iR=de(Se(),1);var tf=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=Pt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(u=>{let f=iR.TextEdit.replace(u.segment.range,r.newName),m=u.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Pt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&sc(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var DI=de(Se(),1);var oR=de(Se(),1);var rf=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=oR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var nf=class extends Os{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,c;let l="path";if(tu(e.astNode)&&((n=Ps(e))===null||n===void 0?void 0:n.feature)===l){let u=ci(this.documents,e.astNode);if(u?.$document){let f=(i=this.findTargetObject(u))!==null&&i!==void 0?i:u,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:xc.Range.create(0,0,0,0),T=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:xc.Range.create(0,0,0,0);return[xc.LocationLink.create(u.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:_i(e).head()}};var Lh=de(Se(),1);var of=class extends Hu{getIncomingCalls(e,r){if(!K(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=Sr(s.$cstNode,i.segment.offset);if(!a)return;let c=Ie(a.astNode,K);if(!c||!c.$cstNode)return;let l=this.nameProvider.getNameNode(c);if(!l)return;let u=i.sourceUri.toString(),f=u+"@"+l.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[...n.get(f).targetNodes,a],docUri:u}):n.set(f,{parserRule:c.$cstNode,nameNode:l,targetNodes:[a],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:Lh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!K(e))return;let r=Qe(e).filter(_e).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let l=ne(a.astNode).uri.toString(),u=l+"@"+c.text;n.has(u)?n.set(u,{refCstNode:a,to:c,from:[...n.get(u).from,s.range],docUri:l}):n.set(u,{refCstNode:a,to:c,from:[s.range],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:Lh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var sf=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=Mx(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=LI(e);for(let a of pu(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of pu(n)){let c=s.get(a.name);if(c){let l=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},l??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=sh(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of sh(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function LI({parserRules:t,datatypeRules:e}){let r=new Le;ie(t).concat(e).forEach(i=>r.add(wo(i),i));function n(i){if(Ne(i)){let o=Ss(i);o&&r.add(o,i)}(Or(i)||Ft(i)||Dr(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function sR(t){return t&&"declared"in t}function aR(t){return t&&"inferred"in t}function cR(t){return t&&"inferred"in t&&"declared"in t}function uR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var af=class{checkCyclicType(e,r){Li(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Li(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(sR(o)&&mn(o.declared)&&wr(o.declaredNode)){let s=o;FI(s,r),UI(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())aR(o)&&o.inferred instanceof ms&&MI(o.inferred,r),cR(o)&&jI(o,i,r)}checkActionIsNotUnionType(e,r){Mt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Li(t,e){var r;if(e.has(t))return!0;if(e.add(t),Mt(t))return Li(t.type,e);if(wr(t))return t.superTypes.some(n=>n.ref&&Li(n.ref,new Set(e)));if(or(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Li(t.typeRef.ref,e)}else{if(To(t))return Li(t.referenceType,e);if(go(t))return Li(t.elementType,e);if(Vr(t))return t.types.some(n=>Li(n,new Set(e)))}return!1}function MI(t,e){t.properties.forEach(r=>{var n;let i=nh(r.type);if(i.length>1){let o=a=>ii(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function FI({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(dn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function UI({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],l=i[a],u=mn(c)?c.superProperties:[],f=mn(l)?l.superProperties:[],m=qI(u,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${c}' and '${l}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=mn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function qI(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!GI(n,i)&&r.push(n.name)}return r}function GI(t,e){return ic(t.type,e.type)&&ic(e.type,t.type)}function jI(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,c=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:Ne(T)?"type":"name"})),l=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:Re(T)||Ne(T)?"feature":"name"})),u=f=>{s.forEach(m=>{K(m)&&Rs(m.definition).find(S=>S.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(dn(n)&&dn(i))HI(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(mn(n)&&mn(i))KI(n,i,e,c(`in a rule that returns type '${a}'`),l,u);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),r("error",f,{node:o,property:"name"})}}function HI(t,e,r){ic(t,e)||r(`Cannot assign type '${pn(t,"DeclaredType")}' to '${pn(e,"DeclaredType")}'`)}function lR(t){return t.optional||fu(t.type)}function KI(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),l=f=>{if(Ot(f))return{types:f.types.map(m=>l(m))};if(ii(f))return{referenceType:l(f.referenceType)};if(oi(f))return{elementType:l(f.elementType)};if(Lr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=c.get(f);if(T){let S=pn(m.type,"DeclaredType"),A=pn(T.type,"DeclaredType");if(!ic(l(m.type),T.type)&&A!=="unknown"){let C=`The assigned type '${S}' is not compatible with the declared property '${f}' of type '${A}'.`;i(m.astNodes,C)}m.optional&&!lR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let u=new Set;for(let[f,m]of c.entries())!a.get(f)&&!lR(m)&&u.add(f);if(u.size>0){let f=u.size>1?"Properties":"A property",m=u.size>1?"are expected":"is expected",T=Array.from(u).map(S=>`'${S}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var BI={validation:{LangiumGrammarValidator:t=>new bu(t),ValidationResourcesCollector:t=>new sf(t),LangiumGrammarTypesValidator:()=>new af},lsp:{FoldingRangeProvider:t=>new Du(t),CodeActionProvider:t=>new Nu(t),SemanticTokenProvider:t=>new qu(t),Formatter:()=>new Fu,DefinitionProvider:t=>new nf(t),CallHierarchyProvider:t=>new of(t),CompletionProvider:t=>new Ou(t)},references:{ScopeComputation:t=>new Eu(t),ScopeProvider:t=>new ku(t),References:t=>new ju(t),NameProvider:()=>new Gu}};function fR(t,e){let r=ho(bc(t),Fx,e),n=ho(Rc({shared:r}),Ux,BI);return WI(r,n),r.ServiceRegistry.register(n),Rx(n),uR(n),{shared:r,grammar:n}}function WI(t,e){t.workspace.DocumentBuilder.onBuildPhase(je.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Mh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},ko={fileSystemProvider:()=>new Mh};function Pu(t){return t.rules.find(e=>K(e)&&e.entry)}function zI(t){return t.rules.filter(e=>we(e)&&e.hidden)}function xs(t,e){let r=new Set,n=Pu(t);if(!n)return new Set(t.rules);let i=[n].concat(zI(t));for(let s of i)dR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||we(s)&&s.hidden)&&o.add(s);return o}function dR(t,e,r){e.add(t.name),Qe(t).forEach(n=>{if(_e(n)||r&&iu(n)){let i=n.rule.ref;i&&!e.has(i.name)&&dR(i,e,r)}})}function Iu(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=hc(t.type.ref);return e?.terminal}}function pR(t){return t.hidden&&!Jr(t).test(" ")}function Ii(t,e){return!t||!e?[]:Fh(t,e,t.astNode,!0)}function Yt(t,e,r){if(!t||!e)return;let n=Fh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Fh(t,e,r,n){if(!n){let i=Ie(t.grammarSource,Re);if(i&&i.feature===e)return[t]}return $n(t)&&t.astNode===r?t.content.flatMap(i=>Fh(i,e,r,!1)):[]}function Mu(t,e){return t?mR(t,e,t?.astNode):[]}function Xr(t,e,r){if(!t)return;let n=mR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function mR(t,e,r){if(t.astNode!==r)return[];if(pt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=Hm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?pt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Ps(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(t.grammarSource,Re);if(n)return n;t=t.container}}function hc(t){return cs(t)&&(t=t.$container),hR(t,new Map)}function hR(t,e){var r;function n(i,o){let s;return Ie(i,Re)||(s=hR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Qe(t)){if(Re(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(_e(i)&&K(i.rule.ref))return n(i,i.rule.ref);if(or(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function Tu(t){var e;let r=fR(ko).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Jt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function yR(t){let e=[],r=t.Grammar;for(let n of r.rules)we(n)&&pR(n)&&fx(Jr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Km}}var VI=typeof global=="object"&&global&&global.Object===Object&&global,cf=VI;var XI=typeof self=="object"&&self&&self.Object===Object&&self,YI=cf||XI||Function("return this")(),$t=YI;var JI=$t.Symbol,Ut=JI;var gR=Object.prototype,QI=gR.hasOwnProperty,ZI=gR.toString,Sc=Ut?Ut.toStringTag:void 0;function eP(t){var e=QI.call(t,Sc),r=t[Sc];try{t[Sc]=void 0;var n=!0}catch{}var i=ZI.call(t);return n&&(e?t[Sc]=r:delete t[Sc]),i}var TR=eP;var tP=Object.prototype,rP=tP.toString;function nP(t){return rP.call(t)}var vR=nP;var iP="[object Null]",oP="[object Undefined]",xR=Ut?Ut.toStringTag:void 0;function sP(t){return t==null?t===void 0?oP:iP:xR&&xR in Object(t)?TR(t):vR(t)}var yr=sP;function aP(t){return t!=null&&typeof t=="object"}var gt=aP;var cP="[object Symbol]";function lP(t){return typeof t=="symbol"||gt(t)&&yr(t)==cP}var Pn=lP;function uP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var On=uP;var fP=Array.isArray,z=fP;var dP=1/0,RR=Ut?Ut.prototype:void 0,bR=RR?RR.toString:void 0;function SR(t){if(typeof t=="string")return t;if(z(t))return On(t,SR)+"";if(Pn(t))return bR?bR.call(t):"";var e=t+"";return e=="0"&&1/t==-dP?"-0":e}var wR=SR;var pP=/\s/;function mP(t){for(var e=t.length;e--&&pP.test(t.charAt(e)););return e}var AR=mP;var hP=/^\s+/;function yP(t){return t&&t.slice(0,AR(t)+1).replace(hP,"")}var CR=yP;function gP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var at=gP;var kR=0/0,TP=/^[-+]0x[0-9a-f]+$/i,vP=/^0b[01]+$/i,xP=/^0o[0-7]+$/i,RP=parseInt;function bP(t){if(typeof t=="number")return t;if(Pn(t))return kR;if(at(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=at(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=CR(t);var r=vP.test(t);return r||xP.test(t)?RP(t.slice(2),r?2:8):TP.test(t)?kR:+t}var ER=bP;var $R=1/0,SP=17976931348623157e292;function wP(t){if(!t)return t===0?t:0;if(t=ER(t),t===$R||t===-$R){var e=t<0?-1:1;return e*SP}return t===t?t:0}var NR=wP;function AP(t){var e=NR(t),r=e%1;return e===e?r?e-r:e:0}var Dn=AP;function CP(t){return t}var Ar=CP;var kP="[object AsyncFunction]",EP="[object Function]",$P="[object GeneratorFunction]",NP="[object Proxy]";function _P(t){if(!at(t))return!1;var e=yr(t);return e==EP||e==$P||e==kP||e==NP}var gr=_P;var IP=$t["__core-js_shared__"],lf=IP;var _R=function(){var t=/[^.]+$/.exec(lf&&lf.keys&&lf.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function PP(t){return!!_R&&_R in t}var IR=PP;var OP=Function.prototype,DP=OP.toString;function LP(t){if(t!=null){try{return DP.call(t)}catch{}try{return t+""}catch{}}return""}var fi=LP;var MP=/[\\^$.*+?()[\]{}|]/g,FP=/^\[object .+?Constructor\]$/,UP=Function.prototype,qP=Object.prototype,GP=UP.toString,jP=qP.hasOwnProperty,HP=RegExp("^"+GP.call(jP).replace(MP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function KP(t){if(!at(t)||IR(t))return!1;var e=gr(t)?HP:FP;return e.test(fi(t))}var PR=KP;function BP(t,e){return t?.[e]}var OR=BP;function WP(t,e){var r=OR(t,e);return PR(r)?r:void 0}var Cr=WP;var zP=Cr($t,"WeakMap"),uf=zP;var DR=Object.create,VP=function(){function t(){}return function(e){if(!at(e))return{};if(DR)return DR(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),LR=VP;function XP(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var MR=XP;function YP(){}var ct=YP;function JP(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var FR=JP;var QP=800,ZP=16,e0=Date.now;function t0(t){var e=0,r=0;return function(){var n=e0(),i=ZP-(n-r);if(r=n,i>0){if(++e>=QP)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var UR=t0;function r0(t){return function(){return t}}var qR=r0;var n0=function(){try{var t=Cr(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Ls=n0;var i0=Ls?function(t,e){return Ls(t,"toString",{configurable:!0,enumerable:!1,value:qR(e),writable:!0})}:Ar,GR=i0;var o0=UR(GR),jR=o0;function s0(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var ff=s0;function a0(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var df=a0;function c0(t){return t!==t}var HR=c0;function l0(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var KR=l0;function u0(t,e,r){return e===e?KR(t,e,r):df(t,HR,r)}var Ms=u0;function f0(t,e){var r=t==null?0:t.length;return!!r&&Ms(t,e,0)>-1}var pf=f0;var d0=9007199254740991,p0=/^(?:0|[1-9]\d*)$/;function m0(t,e){var r=typeof t;return e=e??d0,!!e&&(r=="number"||r!="symbol"&&p0.test(t))&&t>-1&&t%1==0&&t<e}var Mi=m0;function h0(t,e,r){e=="__proto__"&&Ls?Ls(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var Fs=h0;function y0(t,e){return t===e||t!==t&&e!==e}var Ln=y0;var g0=Object.prototype,T0=g0.hasOwnProperty;function v0(t,e,r){var n=t[e];(!(T0.call(t,e)&&Ln(n,r))||r===void 0&&!(e in t))&&Fs(t,e,r)}var Fi=v0;function x0(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;c===void 0&&(c=t[a]),i?Fs(r,a,c):Fi(r,a,c)}return r}var Mn=x0;var BR=Math.max;function R0(t,e,r){return e=BR(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=BR(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),MR(t,this,a)}}var WR=R0;function b0(t,e){return jR(WR(t,e,Ar),t+"")}var Us=b0;var S0=9007199254740991;function w0(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=S0}var qs=w0;function A0(t){return t!=null&&qs(t.length)&&!gr(t)}var Nt=A0;function C0(t,e,r){if(!at(r))return!1;var n=typeof e;return(n=="number"?Nt(r)&&Mi(e,r.length):n=="string"&&e in r)?Ln(r[e],t):!1}var Ui=C0;function k0(t){return Us(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Ui(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var zR=k0;var E0=Object.prototype;function $0(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||E0;return t===r}var Fn=$0;function N0(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var VR=N0;var _0="[object Arguments]";function I0(t){return gt(t)&&yr(t)==_0}var Uh=I0;var XR=Object.prototype,P0=XR.hasOwnProperty,O0=XR.propertyIsEnumerable,D0=Uh(function(){return arguments}())?Uh:function(t){return gt(t)&&P0.call(t,"callee")&&!O0.call(t,"callee")},qi=D0;function L0(){return!1}var YR=L0;var ZR=typeof exports=="object"&&exports&&!exports.nodeType&&exports,JR=ZR&&typeof module=="object"&&module&&!module.nodeType&&module,M0=JR&&JR.exports===ZR,QR=M0?$t.Buffer:void 0,F0=QR?QR.isBuffer:void 0,U0=F0||YR,di=U0;var q0="[object Arguments]",G0="[object Array]",j0="[object Boolean]",H0="[object Date]",K0="[object Error]",B0="[object Function]",W0="[object Map]",z0="[object Number]",V0="[object Object]",X0="[object RegExp]",Y0="[object Set]",J0="[object String]",Q0="[object WeakMap]",Z0="[object ArrayBuffer]",eO="[object DataView]",tO="[object Float32Array]",rO="[object Float64Array]",nO="[object Int8Array]",iO="[object Int16Array]",oO="[object Int32Array]",sO="[object Uint8Array]",aO="[object Uint8ClampedArray]",cO="[object Uint16Array]",lO="[object Uint32Array]",Ye={};Ye[tO]=Ye[rO]=Ye[nO]=Ye[iO]=Ye[oO]=Ye[sO]=Ye[aO]=Ye[cO]=Ye[lO]=!0;Ye[q0]=Ye[G0]=Ye[Z0]=Ye[j0]=Ye[eO]=Ye[H0]=Ye[K0]=Ye[B0]=Ye[W0]=Ye[z0]=Ye[V0]=Ye[X0]=Ye[Y0]=Ye[J0]=Ye[Q0]=!1;function uO(t){return gt(t)&&qs(t.length)&&!!Ye[yr(t)]}var eb=uO;function fO(t){return function(e){return t(e)}}var Un=fO;var tb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,wc=tb&&typeof module=="object"&&module&&!module.nodeType&&module,dO=wc&&wc.exports===tb,qh=dO&&cf.process,pO=function(){try{var t=wc&&wc.require&&wc.require("util").types;return t||qh&&qh.binding&&qh.binding("util")}catch{}}(),Zr=pO;var rb=Zr&&Zr.isTypedArray,mO=rb?Un(rb):eb,Gs=mO;var hO=Object.prototype,yO=hO.hasOwnProperty;function gO(t,e){var r=z(t),n=!r&&qi(t),i=!r&&!n&&di(t),o=!r&&!n&&!i&&Gs(t),s=r||n||i||o,a=s?VR(t.length,String):[],c=a.length;for(var l in t)(e||yO.call(t,l))&&!(s&&(l=="length"||i&&(l=="offset"||l=="parent")||o&&(l=="buffer"||l=="byteLength"||l=="byteOffset")||Mi(l,c)))&&a.push(l);return a}var mf=gO;function TO(t,e){return function(r){return t(e(r))}}var hf=TO;var vO=hf(Object.keys,Object),nb=vO;var xO=Object.prototype,RO=xO.hasOwnProperty;function bO(t){if(!Fn(t))return nb(t);var e=[];for(var r in Object(t))RO.call(t,r)&&r!="constructor"&&e.push(r);return e}var yf=bO;function SO(t){return Nt(t)?mf(t):yf(t)}var He=SO;var wO=Object.prototype,AO=wO.hasOwnProperty,CO=zR(function(t,e){if(Fn(e)||Nt(e)){Mn(e,He(e),t);return}for(var r in e)AO.call(e,r)&&Fi(t,r,e[r])}),Qt=CO;function kO(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var ib=kO;var EO=Object.prototype,$O=EO.hasOwnProperty;function NO(t){if(!at(t))return ib(t);var e=Fn(t),r=[];for(var n in t)n=="constructor"&&(e||!$O.call(t,n))||r.push(n);return r}var ob=NO;function _O(t){return Nt(t)?mf(t,!0):ob(t)}var Gi=_O;var IO=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,PO=/^\w*$/;function OO(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||Pn(t)?!0:PO.test(t)||!IO.test(t)||e!=null&&t in Object(e)}var js=OO;var DO=Cr(Object,"create"),pi=DO;function LO(){this.__data__=pi?pi(null):{},this.size=0}var sb=LO;function MO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var ab=MO;var FO="__lodash_hash_undefined__",UO=Object.prototype,qO=UO.hasOwnProperty;function GO(t){var e=this.__data__;if(pi){var r=e[t];return r===FO?void 0:r}return qO.call(e,t)?e[t]:void 0}var cb=GO;var jO=Object.prototype,HO=jO.hasOwnProperty;function KO(t){var e=this.__data__;return pi?e[t]!==void 0:HO.call(e,t)}var lb=KO;var BO="__lodash_hash_undefined__";function WO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=pi&&e===void 0?BO:e,this}var ub=WO;function Hs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Hs.prototype.clear=sb;Hs.prototype.delete=ab;Hs.prototype.get=cb;Hs.prototype.has=lb;Hs.prototype.set=ub;var Gh=Hs;function zO(){this.__data__=[],this.size=0}var fb=zO;function VO(t,e){for(var r=t.length;r--;)if(Ln(t[r][0],e))return r;return-1}var ji=VO;var XO=Array.prototype,YO=XO.splice;function JO(t){var e=this.__data__,r=ji(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():YO.call(e,r,1),--this.size,!0}var db=JO;function QO(t){var e=this.__data__,r=ji(e,t);return r<0?void 0:e[r][1]}var pb=QO;function ZO(t){return ji(this.__data__,t)>-1}var mb=ZO;function eD(t,e){var r=this.__data__,n=ji(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var hb=eD;function Ks(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ks.prototype.clear=fb;Ks.prototype.delete=db;Ks.prototype.get=pb;Ks.prototype.has=mb;Ks.prototype.set=hb;var Hi=Ks;var tD=Cr($t,"Map"),Ki=tD;function rD(){this.size=0,this.__data__={hash:new Gh,map:new(Ki||Hi),string:new Gh}}var yb=rD;function nD(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var gb=nD;function iD(t,e){var r=t.__data__;return gb(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Bi=iD;function oD(t){var e=Bi(this,t).delete(t);return this.size-=e?1:0,e}var Tb=oD;function sD(t){return Bi(this,t).get(t)}var vb=sD;function aD(t){return Bi(this,t).has(t)}var xb=aD;function cD(t,e){var r=Bi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var Rb=cD;function Bs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Bs.prototype.clear=yb;Bs.prototype.delete=Tb;Bs.prototype.get=vb;Bs.prototype.has=xb;Bs.prototype.set=Rb;var Eo=Bs;var lD="Expected a function";function jh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(lD);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(jh.Cache||Eo),r}jh.Cache=Eo;var bb=jh;var uD=500;function fD(t){var e=bb(t,function(n){return r.size===uD&&r.clear(),n}),r=e.cache;return e}var Sb=fD;var dD=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,pD=/\\(\\)?/g,mD=Sb(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(dD,function(r,n,i,o){e.push(i?o.replace(pD,"$1"):n||r)}),e}),wb=mD;function hD(t){return t==null?"":wR(t)}var Ab=hD;function yD(t,e){return z(t)?t:js(t,e)?[t]:wb(Ab(t))}var Wi=yD;var gD=1/0;function TD(t){if(typeof t=="string"||Pn(t))return t;var e=t+"";return e=="0"&&1/t==-gD?"-0":e}var qn=TD;function vD(t,e){e=Wi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[qn(e[r++])];return r&&r==n?t:void 0}var Ws=vD;function xD(t,e,r){var n=t==null?void 0:Ws(t,e);return n===void 0?r:n}var Cb=xD;function RD(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var zs=RD;var kb=Ut?Ut.isConcatSpreadable:void 0;function bD(t){return z(t)||qi(t)||!!(kb&&t&&t[kb])}var Eb=bD;function $b(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=Eb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?$b(a,e-1,r,n,i):zs(i,a):n||(i[i.length]=a)}return i}var Vs=$b;function SD(t){var e=t==null?0:t.length;return e?Vs(t,1):[]}var Tt=SD;var wD=hf(Object.getPrototypeOf,Object),gf=wD;function AD(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var Tf=AD;function CD(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var Nb=CD;function kD(){this.__data__=new Hi,this.size=0}var _b=kD;function ED(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var Ib=ED;function $D(t){return this.__data__.get(t)}var Pb=$D;function ND(t){return this.__data__.has(t)}var Ob=ND;var _D=200;function ID(t,e){var r=this.__data__;if(r instanceof Hi){var n=r.__data__;if(!Ki||n.length<_D-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Eo(n)}return r.set(t,e),this.size=r.size,this}var Db=ID;function Xs(t){var e=this.__data__=new Hi(t);this.size=e.size}Xs.prototype.clear=_b;Xs.prototype.delete=Ib;Xs.prototype.get=Pb;Xs.prototype.has=Ob;Xs.prototype.set=Db;var zi=Xs;function PD(t,e){return t&&Mn(e,He(e),t)}var Lb=PD;function OD(t,e){return t&&Mn(e,Gi(e),t)}var Mb=OD;var Gb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Fb=Gb&&typeof module=="object"&&module&&!module.nodeType&&module,DD=Fb&&Fb.exports===Gb,Ub=DD?$t.Buffer:void 0,qb=Ub?Ub.allocUnsafe:void 0;function LD(t,e){if(e)return t.slice();var r=t.length,n=qb?qb(r):new t.constructor(r);return t.copy(n),n}var jb=LD;function MD(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Ys=MD;function FD(){return[]}var vf=FD;var UD=Object.prototype,qD=UD.propertyIsEnumerable,Hb=Object.getOwnPropertySymbols,GD=Hb?function(t){return t==null?[]:(t=Object(t),Ys(Hb(t),function(e){return qD.call(t,e)}))}:vf,Js=GD;function jD(t,e){return Mn(t,Js(t),e)}var Kb=jD;var HD=Object.getOwnPropertySymbols,KD=HD?function(t){for(var e=[];t;)zs(e,Js(t)),t=gf(t);return e}:vf,xf=KD;function BD(t,e){return Mn(t,xf(t),e)}var Bb=BD;function WD(t,e,r){var n=e(t);return z(t)?n:zs(n,r(t))}var Rf=WD;function zD(t){return Rf(t,He,Js)}var Ac=zD;function VD(t){return Rf(t,Gi,xf)}var bf=VD;var XD=Cr($t,"DataView"),Sf=XD;var YD=Cr($t,"Promise"),wf=YD;var JD=Cr($t,"Set"),Vi=JD;var Wb="[object Map]",QD="[object Object]",zb="[object Promise]",Vb="[object Set]",Xb="[object WeakMap]",Yb="[object DataView]",ZD=fi(Sf),eL=fi(Ki),tL=fi(wf),rL=fi(Vi),nL=fi(uf),$o=yr;(Sf&&$o(new Sf(new ArrayBuffer(1)))!=Yb||Ki&&$o(new Ki)!=Wb||wf&&$o(wf.resolve())!=zb||Vi&&$o(new Vi)!=Vb||uf&&$o(new uf)!=Xb)&&($o=function(t){var e=yr(t),r=e==QD?t.constructor:void 0,n=r?fi(r):"";if(n)switch(n){case ZD:return Yb;case eL:return Wb;case tL:return zb;case rL:return Vb;case nL:return Xb}return e});var Tn=$o;var iL=Object.prototype,oL=iL.hasOwnProperty;function sL(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&oL.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var Jb=sL;var aL=$t.Uint8Array,Qs=aL;function cL(t){var e=new t.constructor(t.byteLength);return new Qs(e).set(new Qs(t)),e}var Zs=cL;function lL(t,e){var r=e?Zs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var Qb=lL;var uL=/\w*$/;function fL(t){var e=new t.constructor(t.source,uL.exec(t));return e.lastIndex=t.lastIndex,e}var Zb=fL;var eS=Ut?Ut.prototype:void 0,tS=eS?eS.valueOf:void 0;function dL(t){return tS?Object(tS.call(t)):{}}var rS=dL;function pL(t,e){var r=e?Zs(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var nS=pL;var mL="[object Boolean]",hL="[object Date]",yL="[object Map]",gL="[object Number]",TL="[object RegExp]",vL="[object Set]",xL="[object String]",RL="[object Symbol]",bL="[object ArrayBuffer]",SL="[object DataView]",wL="[object Float32Array]",AL="[object Float64Array]",CL="[object Int8Array]",kL="[object Int16Array]",EL="[object Int32Array]",$L="[object Uint8Array]",NL="[object Uint8ClampedArray]",_L="[object Uint16Array]",IL="[object Uint32Array]";function PL(t,e,r){var n=t.constructor;switch(e){case bL:return Zs(t);case mL:case hL:return new n(+t);case SL:return Qb(t,r);case wL:case AL:case CL:case kL:case EL:case $L:case NL:case _L:case IL:return nS(t,r);case yL:return new n;case gL:case xL:return new n(t);case TL:return Zb(t);case vL:return new n;case RL:return rS(t)}}var iS=PL;function OL(t){return typeof t.constructor=="function"&&!Fn(t)?LR(gf(t)):{}}var oS=OL;var DL="[object Map]";function LL(t){return gt(t)&&Tn(t)==DL}var sS=LL;var aS=Zr&&Zr.isMap,ML=aS?Un(aS):sS,cS=ML;var FL="[object Set]";function UL(t){return gt(t)&&Tn(t)==FL}var lS=UL;var uS=Zr&&Zr.isSet,qL=uS?Un(uS):lS,fS=qL;var GL=1,jL=2,HL=4,dS="[object Arguments]",KL="[object Array]",BL="[object Boolean]",WL="[object Date]",zL="[object Error]",pS="[object Function]",VL="[object GeneratorFunction]",XL="[object Map]",YL="[object Number]",mS="[object Object]",JL="[object RegExp]",QL="[object Set]",ZL="[object String]",eM="[object Symbol]",tM="[object WeakMap]",rM="[object ArrayBuffer]",nM="[object DataView]",iM="[object Float32Array]",oM="[object Float64Array]",sM="[object Int8Array]",aM="[object Int16Array]",cM="[object Int32Array]",lM="[object Uint8Array]",uM="[object Uint8ClampedArray]",fM="[object Uint16Array]",dM="[object Uint32Array]",Ke={};Ke[dS]=Ke[KL]=Ke[rM]=Ke[nM]=Ke[BL]=Ke[WL]=Ke[iM]=Ke[oM]=Ke[sM]=Ke[aM]=Ke[cM]=Ke[XL]=Ke[YL]=Ke[mS]=Ke[JL]=Ke[QL]=Ke[ZL]=Ke[eM]=Ke[lM]=Ke[uM]=Ke[fM]=Ke[dM]=!0;Ke[zL]=Ke[pS]=Ke[tM]=!1;function Af(t,e,r,n,i,o){var s,a=e&GL,c=e&jL,l=e&HL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!at(t))return t;var u=z(t);if(u){if(s=Jb(t),!a)return FR(t,s)}else{var f=Tn(t),m=f==pS||f==VL;if(di(t))return jb(t,a);if(f==mS||f==dS||m&&!i){if(s=c||m?{}:oS(t),!a)return c?Bb(t,Mb(s,t)):Kb(t,Lb(s,t))}else{if(!Ke[f])return i?t:{};s=iS(t,f,a)}}o||(o=new zi);var T=o.get(t);if(T)return T;o.set(t,s),fS(t)?t.forEach(function(N){s.add(Af(N,e,r,N,t,o))}):cS(t)&&t.forEach(function(N,C){s.set(C,Af(N,e,r,C,t,o))});var S=l?c?bf:Ac:c?Gi:He,A=u?void 0:S(t);return ff(A||t,function(N,C){A&&(C=N,N=t[C]),Fi(s,C,Af(N,e,r,C,t,o))}),s}var hS=Af;var pM=4;function mM(t){return hS(t,pM)}var Be=mM;function hM(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Gn=hM;var yM="__lodash_hash_undefined__";function gM(t){return this.__data__.set(t,yM),this}var yS=gM;function TM(t){return this.__data__.has(t)}var gS=TM;function Cf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Eo;++e<r;)this.add(t[e])}Cf.prototype.add=Cf.prototype.push=yS;Cf.prototype.has=gS;var ea=Cf;function vM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var kf=vM;function xM(t,e){return t.has(e)}var ta=xM;var RM=1,bM=2;function SM(t,e,r,n,i,o){var s=r&RM,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var l=o.get(t),u=o.get(e);if(l&&u)return l==e&&u==t;var f=-1,m=!0,T=r&bM?new ea:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var S=t[f],A=e[f];if(n)var N=s?n(A,S,f,e,t,o):n(S,A,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!kf(e,function(C,v){if(!ta(T,v)&&(S===C||i(S,C,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(S===A||i(S,A,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var Ef=SM;function wM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var TS=wM;function AM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var ra=AM;var CM=1,kM=2,EM="[object Boolean]",$M="[object Date]",NM="[object Error]",_M="[object Map]",IM="[object Number]",PM="[object RegExp]",OM="[object Set]",DM="[object String]",LM="[object Symbol]",MM="[object ArrayBuffer]",FM="[object DataView]",vS=Ut?Ut.prototype:void 0,Hh=vS?vS.valueOf:void 0;function UM(t,e,r,n,i,o,s){switch(r){case FM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case MM:return!(t.byteLength!=e.byteLength||!o(new Qs(t),new Qs(e)));case EM:case $M:case IM:return Ln(+t,+e);case NM:return t.name==e.name&&t.message==e.message;case PM:case DM:return t==e+"";case _M:var a=TS;case OM:var c=n&CM;if(a||(a=ra),t.size!=e.size&&!c)return!1;var l=s.get(t);if(l)return l==e;n|=kM,s.set(t,e);var u=Ef(a(t),a(e),n,i,o,s);return s.delete(t),u;case LM:if(Hh)return Hh.call(t)==Hh.call(e)}return!1}var xS=UM;var qM=1,GM=Object.prototype,jM=GM.hasOwnProperty;function HM(t,e,r,n,i,o){var s=r&qM,a=Ac(t),c=a.length,l=Ac(e),u=l.length;if(c!=u&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:jM.call(e,m)))return!1}var T=o.get(t),S=o.get(e);if(T&&S)return T==e&&S==t;var A=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<c;){m=a[f];var C=t[m],v=e[m];if(n)var g=s?n(v,C,m,e,t,o):n(C,v,m,t,e,o);if(!(g===void 0?C===v||i(C,v,r,n,o):g)){A=!1;break}N||(N=m=="constructor")}if(A&&!N){var $=t.constructor,O=e.constructor;$!=O&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof O=="function"&&O instanceof O)&&(A=!1)}return o.delete(t),o.delete(e),A}var RS=HM;var KM=1,bS="[object Arguments]",SS="[object Array]",$f="[object Object]",BM=Object.prototype,wS=BM.hasOwnProperty;function WM(t,e,r,n,i,o){var s=z(t),a=z(e),c=s?SS:Tn(t),l=a?SS:Tn(e);c=c==bS?$f:c,l=l==bS?$f:l;var u=c==$f,f=l==$f,m=c==l;if(m&&di(t)){if(!di(e))return!1;s=!0,u=!1}if(m&&!u)return o||(o=new zi),s||Gs(t)?Ef(t,e,r,n,i,o):xS(t,e,c,r,n,i,o);if(!(r&KM)){var T=u&&wS.call(t,"__wrapped__"),S=f&&wS.call(e,"__wrapped__");if(T||S){var A=T?t.value():t,N=S?e.value():e;return o||(o=new zi),i(A,N,r,n,o)}}return m?(o||(o=new zi),RS(t,e,r,n,i,o)):!1}var AS=WM;function CS(t,e,r,n,i){return t===e?!0:t==null||e==null||!gt(t)&&!gt(e)?t!==t&&e!==e:AS(t,e,r,n,CS,i)}var Nf=CS;var zM=1,VM=2;function XM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var c=a[0],l=t[c],u=a[1];if(s&&a[2]){if(l===void 0&&!(c in t))return!1}else{var f=new zi;if(n)var m=n(l,u,c,t,e,f);if(!(m===void 0?Nf(u,l,zM|VM,n,f):m))return!1}}return!0}var kS=XM;function YM(t){return t===t&&!at(t)}var _f=YM;function JM(t){for(var e=He(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,_f(i)]}return e}var ES=JM;function QM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var If=QM;function ZM(t){var e=ES(t);return e.length==1&&e[0][2]?If(e[0][0],e[0][1]):function(r){return r===t||kS(r,t,e)}}var $S=ZM;function eF(t,e){return t!=null&&e in Object(t)}var NS=eF;function tF(t,e,r){e=Wi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=qn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&qs(i)&&Mi(s,i)&&(z(t)||qi(t)))}var Pf=tF;function rF(t,e){return t!=null&&Pf(t,e,NS)}var _S=rF;var nF=1,iF=2;function oF(t,e){return js(t)&&_f(e)?If(qn(t),e):function(r){var n=Cb(r,t);return n===void 0&&n===e?_S(r,t):Nf(e,n,nF|iF)}}var IS=oF;function sF(t){return function(e){return e?.[t]}}var PS=sF;function aF(t){return function(e){return Ws(e,t)}}var OS=aF;function cF(t){return js(t)?PS(qn(t)):OS(t)}var DS=cF;function lF(t){return typeof t=="function"?t:t==null?Ar:typeof t=="object"?z(t)?IS(t[0],t[1]):$S(t):DS(t)}var mt=lF;function uF(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var LS=uF;function fF(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[t?a:++i];if(r(o[c],c,o)===!1)break}return e}}var MS=fF;var dF=MS(),FS=dF;function pF(t,e){return t&&FS(t,e,He)}var US=pF;function mF(t,e){return function(r,n){if(r==null)return r;if(!Nt(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var qS=mF;var hF=qS(US),kr=hF;function yF(t,e,r,n){return kr(t,function(i,o,s){e(n,i,r(i),s)}),n}var GS=yF;function gF(t,e){return function(r,n){var i=z(r)?LS:GS,o=e?e():{};return i(r,t,mt(n,2),o)}}var jS=gF;var HS=Object.prototype,TF=HS.hasOwnProperty,vF=Us(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Ui(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Gi(o),a=-1,c=s.length;++a<c;){var l=s[a],u=t[l];(u===void 0||Ln(u,HS[l])&&!TF.call(t,l))&&(t[l]=o[l])}return t}),na=vF;function xF(t){return gt(t)&&Nt(t)}var Kh=xF;function RF(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Of=RF;var bF=200;function SF(t,e,r,n){var i=-1,o=pf,s=!0,a=t.length,c=[],l=e.length;if(!a)return c;r&&(e=On(e,Un(r))),n?(o=Of,s=!1):e.length>=bF&&(o=ta,s=!1,e=new ea(e));e:for(;++i<a;){var u=t[i],f=r==null?u:r(u);if(u=n||u!==0?u:0,s&&f===f){for(var m=l;m--;)if(e[m]===f)continue e;c.push(u)}else o(e,f,n)||c.push(u)}return c}var KS=SF;var wF=Us(function(t,e){return Kh(t)?KS(t,Vs(e,1,Kh,!0)):[]}),Xi=wF;function AF(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var jn=AF;function CF(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Dn(e),Tf(t,e<0?0:e,n)):[]}var vt=CF;function kF(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Dn(e),e=n-e,Tf(t,0,e<0?0:e)):[]}var mi=kF;function EF(t){return typeof t=="function"?t:Ar}var BS=EF;function $F(t,e){var r=z(t)?ff:kr;return r(t,BS(e))}var G=$F;function NF(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var WS=NF;function _F(t,e){var r=!0;return kr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var zS=_F;function IF(t,e,r){var n=z(t)?WS:zS;return r&&Ui(t,e,r)&&(e=void 0),n(t,mt(e,3))}var cr=IF;function PF(t,e){var r=[];return kr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var Df=PF;function OF(t,e){var r=z(t)?Ys:Df;return r(t,mt(e,3))}var qt=OF;function DF(t){return function(e,r,n){var i=Object(e);if(!Nt(e)){var o=mt(r,3);e=He(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var VS=DF;var LF=Math.max;function MF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Dn(r);return i<0&&(i=LF(n+i,0)),df(t,mt(e,3),i)}var XS=MF;var FF=VS(XS),Hn=FF;function UF(t){return t&&t.length?t[0]:void 0}var Gt=UF;function qF(t,e){var r=-1,n=Nt(t)?Array(t.length):[];return kr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var YS=qF;function GF(t,e){var r=z(t)?On:YS;return r(t,mt(e,3))}var L=GF;function jF(t,e){return Vs(L(t,e),1)}var Zt=jF;var HF=Object.prototype,KF=HF.hasOwnProperty,BF=jS(function(t,e,r){KF.call(t,r)?t[r].push(e):Fs(t,r,[e])}),Bh=BF;var WF=Object.prototype,zF=WF.hasOwnProperty;function VF(t,e){return t!=null&&zF.call(t,e)}var JS=VF;function XF(t,e){return t!=null&&Pf(t,e,JS)}var B=XF;var YF="[object String]";function JF(t){return typeof t=="string"||!z(t)&&gt(t)&&yr(t)==YF}var Dt=JF;function QF(t,e){return On(e,function(r){return t[r]})}var QS=QF;function ZF(t){return t==null?[]:QS(t,He(t))}var Pe=ZF;var e1=Math.max;function t1(t,e,r,n){t=Nt(t)?t:Pe(t),r=r&&!n?Dn(r):0;var i=t.length;return r<0&&(r=e1(i+r,0)),Dt(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&Ms(t,e,r)>-1}var et=t1;var r1=Math.max;function n1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Dn(r);return i<0&&(i=r1(n+i,0)),Ms(t,e,i)}var Lf=n1;var i1="[object Map]",o1="[object Set]",s1=Object.prototype,a1=s1.hasOwnProperty;function c1(t){if(t==null)return!0;if(Nt(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||di(t)||Gs(t)||qi(t)))return!t.length;var e=Tn(t);if(e==i1||e==o1)return!t.size;if(Fn(t))return!yf(t).length;for(var r in t)if(a1.call(t,r))return!1;return!0}var se=c1;var l1="[object RegExp]";function u1(t){return gt(t)&&yr(t)==l1}var ZS=u1;var ew=Zr&&Zr.isRegExp,f1=ew?Un(ew):ZS,en=f1;function d1(t){return t===void 0}var lr=d1;function p1(t,e){return t<e}var tw=p1;function m1(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!Pn(s):r(s,a)))var a=s,c=o}return c}var rw=m1;function h1(t){return t&&t.length?rw(t,Ar,tw):void 0}var nw=h1;var y1="Expected a function";function g1(t){if(typeof t!="function")throw new TypeError(y1);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var iw=g1;function T1(t,e,r,n){if(!at(t))return t;e=Wi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var c=qn(e[i]),l=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=s){var u=a[c];l=n?n(u,c,a):void 0,l===void 0&&(l=at(u)?u:Mi(e[i+1])?[]:{})}Fi(a,c,l),a=a[c]}return t}var ow=T1;function v1(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Ws(t,s);r(a,s)&&ow(o,Wi(s,t),a)}return o}var sw=v1;function x1(t,e){if(t==null)return{};var r=On(bf(t),function(n){return[n]});return e=mt(e),sw(t,r,function(n,i){return e(n,i[0])})}var Er=x1;function R1(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var aw=R1;function b1(t,e,r){var n=z(t)?Nb:aw,i=arguments.length<3;return n(t,mt(e,4),r,i,kr)}var lt=b1;function S1(t,e){var r=z(t)?Ys:Df;return r(t,iw(mt(e,3)))}var Yi=S1;function w1(t,e){var r;return kr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var cw=w1;function A1(t,e,r){var n=z(t)?kf:cw;return r&&Ui(t,e,r)&&(e=void 0),n(t,mt(e,3))}var Cc=A1;var C1=1/0,k1=Vi&&1/ra(new Vi([,-0]))[1]==C1?function(t){return new Vi(t)}:ct,lw=k1;var E1=200;function $1(t,e,r){var n=-1,i=pf,o=t.length,s=!0,a=[],c=a;if(r)s=!1,i=Of;else if(o>=E1){var l=e?null:lw(t);if(l)return ra(l);s=!1,i=ta,c=new ea}else c=e?[]:a;e:for(;++n<o;){var u=t[n],f=e?e(u):u;if(u=r||u!==0?u:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(u)}else i(c,f,r)||(c!==a&&c.push(f),a.push(u))}return a}var Mf=$1;function N1(t){return t&&t.length?Mf(t):[]}var ia=N1;function _1(t,e){return t&&t.length?Mf(t,mt(e,2)):[]}var uw=_1;function oa(t){console&&console.error&&console.error(`Error: ${t}`)}function kc(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function Ec(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function $c(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function I1(t){return P1(t)?t.LABEL:t.name}function P1(t){return Dt(t.LABEL)&&t.LABEL!==""}var Gr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},Ce=class extends Gr{constructor(e){super([]),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},Tr=class extends Gr{constructor(e){super(e.definition),this.orgText="",Qt(this,Er(e,r=>r!==void 0))}},We=class extends Gr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Qt(this,Er(e,r=>r!==void 0))}},ke=class extends Gr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},ze=class extends Gr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},Ve=class extends Gr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},pe=class extends Gr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},Me=class extends Gr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},Fe=class extends Gr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Qt(this,Er(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Qt(this,Er(e,r=>r!==void 0))}accept(e){e.visit(this)}};function Ff(t){return L(t,sa)}function sa(t){function e(r){return L(r,sa)}if(t instanceof Ce){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Dt(t.label)&&(r.label=t.label),r}else{if(t instanceof We)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof ze)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:sa(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Me)return{type:"RepetitionWithSeparator",idx:t.idx,separator:sa(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Fe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:I1(t.terminalType),idx:t.idx};Dt(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=en(n)?n.source:n),r}else{if(t instanceof Tr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var vr=class{visit(e){let r=e;switch(r.constructor){case Ce:return this.visitNonTerminal(r);case We:return this.visitAlternative(r);case ke:return this.visitOption(r);case ze:return this.visitRepetitionMandatory(r);case Ve:return this.visitRepetitionMandatoryWithSeparator(r);case Me:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Fe:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case Tr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Wh(t){return t instanceof We||t instanceof ke||t instanceof pe||t instanceof ze||t instanceof Ve||t instanceof Me||t instanceof ae||t instanceof Tr}function No(t,e=[]){return t instanceof ke||t instanceof pe||t instanceof Me?!0:t instanceof Fe?Cc(t.definition,n=>No(n,e)):t instanceof Ce&&et(e,t)?!1:t instanceof Gr?(t instanceof Ce&&e.push(t),cr(t.definition,n=>No(n,e))):!1}function zh(t){return t instanceof Fe}function $r(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var hi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=vt(e.definition,i+1);if(n instanceof Ce)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof We)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof ze)this.walkAtLeastOne(n,o,r);else if(n instanceof Ve)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Me)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Fe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=fw(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=fw(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new We({definition:[o]});this.walk(s,i)})}};function fw(t,e,r){return[new ke({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function _o(t){if(t instanceof Ce)return _o(t.referencedRule);if(t instanceof ae)return L1(t);if(Wh(t))return O1(t);if(zh(t))return D1(t);throw Error("non exhaustive match")}function O1(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=No(o),e=e.concat(_o(o)),n=n+1,i=r.length>n;return ia(e)}function D1(t){let e=L(t.definition,r=>_o(r));return ia(Tt(e))}function L1(t){return[t.terminalType]}var Uf="_~IN~_";var Vh=class extends hi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=M1(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new We({definition:o}),a=_o(s);this.follows[i]=a}};function dw(t){let e={};return G(t,r=>{let n=new Vh(r).startWalking();Qt(e,n)}),e}function M1(t,e){return t.name+e+Uf}var qf={},F1=new Ro;function aa(t){let e=t.toString();if(qf.hasOwnProperty(e))return qf[e];{let r=F1.pattern(e);return qf[e]=r,r}}function pw(){qf={}}var hw="Complement Sets are not supported for first char optimization",Nc=`Unable to use "first char" lexer optimizations:
`;function yw(t,e=!1){try{let r=aa(t);return Xh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===hw)e&&kc(`${Nc}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),oa(`${Nc}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Xh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Xh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Gf(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(hw);G(s.value,c=>{if(typeof c=="number")Gf(c,e,r);else{let l=c;if(r===!0)for(let u=l.from;u<=l.to;u++)Gf(u,e,r);else{for(let u=l.from;u<=l.to&&u<ca;u++)Gf(u,e,r);if(l.to>=ca){let u=l.from>=ca?l.from:ca,f=l.to,m=Kn(u),T=Kn(f);for(let S=m;S<=T;S++)e[S]=S}}}});break;case"Group":Xh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&Yh(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Pe(e)}function Gf(t,e,r){let n=Kn(t);e[n]=n,r===!0&&U1(t,e)}function U1(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=Kn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=Kn(i.charCodeAt(0));e[o]=o}}}function mw(t,e){return Hn(t.value,r=>{if(typeof r=="number")return et(e,r);{let n=r;return Hn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function Yh(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?cr(t.value,Yh):Yh(t.value):!1}var Jh=class extends _n{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?mw(e,this.targetCharCodes)===void 0&&(this.found=!0):mw(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function jf(t,e){if(e instanceof RegExp){let r=aa(e),n=new Jh(t);return n.visit(r),n.found}else return Hn(e,r=>et(t,r.charCodeAt(0)))!==void 0}var Io="PATTERN",la="defaultMode",Hf="modes",Zh=typeof new RegExp("(?:)").sticky=="boolean";function vw(t,e){e=na(e,{useSticky:Zh,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,g)=>g()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{nU()});let n;r("Reject Lexer.NA",()=>{n=Yi(t,v=>v[Io]===ht.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let g=v[Io];if(en(g)){let $=g.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!g.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?Tw(g):gw(g)}else{if(gr(g))return i=!0,{exec:g};if(typeof g=="object")return i=!0,g;if(typeof g=="string"){if(g.length===1)return g;{let $=g.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),O=new RegExp($);return e.useSticky?Tw(O):gw(O)}}else throw Error("non exhaustive match")}})});let s,a,c,l,u;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let g=v.GROUP;if(g!==ht.SKIPPED){if(Dt(g))return g;if(lr(g))return!1;throw Error("non exhaustive match")}}),c=L(n,v=>{let g=v.LONGER_ALT;if(g)return z(g)?L(g,O=>Lf(n,O)):[Lf(n,g)]}),l=L(n,v=>v.PUSH_MODE),u=L(n,v=>B(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=kw(e.lineTerminatorCharacters);f=L(n,g=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,g=>B(g,"LINE_BREAKS")?!!g.LINE_BREAKS:Cw(g,v)===!1&&jf(v,g.PATTERN)))});let m,T,S,A;r("Misc Mapping #2",()=>{m=L(n,ww),T=L(o,tU),S=lt(n,(v,g)=>{let $=g.GROUP;return Dt($)&&$!==ht.SKIPPED&&(v[$]=[]),v},{}),A=L(o,(v,g)=>({pattern:o[g],longerAlt:c[g],canLineTerminator:f[g],isCustom:m[g],short:T[g],group:a[g],push:l[g],pop:u[g],tokenTypeIdx:s[g],tokenType:n[g]}))});let N=!0,C=[];return e.safeMode||r("First Char Optimization",()=>{C=lt(n,(v,g,$)=>{if(typeof g.PATTERN=="string"){let O=g.PATTERN.charCodeAt(0),X=Kn(O);Qh(v,X,A[$])}else if(z(g.START_CHARS_HINT)){let O;G(g.START_CHARS_HINT,X=>{let ge=typeof X=="string"?X.charCodeAt(0):X,Ee=Kn(ge);O!==Ee&&(O=Ee,Qh(v,Ee,A[$]))})}else if(en(g.PATTERN))if(g.PATTERN.unicode)N=!1,e.ensureOptimizations&&oa(`${Nc}	Unable to analyze < ${g.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let O=yw(g.PATTERN,e.ensureOptimizations);se(O)&&(N=!1),G(O,X=>{Qh(v,X,A[$])})}else e.ensureOptimizations&&oa(`${Nc}	TokenType: <${g.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:S,patternIdxToConfig:A,charCodeToPatternIdxToConfig:C,hasCustom:i,canBeOptimized:N}}function xw(t,e){let r=[],n=G1(t);r=r.concat(n.errors);let i=j1(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(q1(o)),r=r.concat(Y1(o)),r=r.concat(J1(o,e)),r=r.concat(Q1(o)),r}function q1(t){let e=[],r=qt(t,n=>en(n[Io]));return e=e.concat(K1(r)),e=e.concat(z1(r)),e=e.concat(V1(r)),e=e.concat(X1(r)),e=e.concat(B1(r)),e}function G1(t){let e=qt(t,i=>!B(i,Io)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}function j1(t){let e=qt(t,i=>{let o=i[Io];return!en(o)&&!gr(o)&&!B(o,"exec")&&!Dt(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Xi(t,e);return{errors:r,valid:n}}var H1=/[^\\][$]/;function K1(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=aa(o),a=new e;return a.visit(s),a.found}catch{return H1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function B1(t){let e=qt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var W1=/[^\\[][\^]|^\^/;function z1(t){class e extends _n{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=aa(o),a=new e;return a.visit(s),a.found}catch{return W1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function V1(t){let e=qt(t,n=>{let i=n[Io];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function X1(t){let e=[],r=L(t,o=>lt(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==ht.NA&&(e.push(a),s.push(a)),s),[]));r=Gn(r);let n=qt(r,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${Gt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function Y1(t){let e=qt(t,n=>{if(!B(n,"GROUP"))return!1;let i=n.GROUP;return i!==ht.SKIPPED&&i!==ht.NA&&!Dt(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function J1(t,e){let r=qt(t,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function Q1(t){let e=[],r=lt(t,(n,i,o)=>{let s=i.PATTERN;return s===ht.NA||(Dt(s)?n.push({str:s,idx:o,tokenType:i}):en(s)&&eU(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&Z1(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function Z1(t,e){if(en(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(gr(e))return e(t,0,[],{});if(B(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function eU(t){return Hn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function gw(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function Tw(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function Rw(t,e,r){let n=[];return B(t,la)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+la+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),B(t,Hf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Hf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),B(t,Hf)&&B(t,la)&&!B(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${la}: <${t.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),B(t,Hf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(lr(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(B(s,"LONGER_ALT")){let c=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,l=>{!lr(l)&&!et(i,l)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${l.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function bw(t,e,r){let n=[],i=!1,o=Gn(Tt(Pe(t.modes))),s=Yi(o,c=>c[Io]===ht.NA),a=kw(r);return e&&G(s,c=>{let l=Cw(c,a);if(l!==!1){let f={message:rU(c,l),type:l.issue,tokenType:c};n.push(f)}else B(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):jf(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function Sw(t){let e={},r=He(t);return G(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function ww(t){let e=t.PATTERN;if(en(e))return!1;if(gr(e))return!0;if(B(e,"exec"))return!0;if(Dt(e))return!1;throw Error("non exhaustive match")}function tU(t){return Dt(t)&&t.length===1?t.charCodeAt(0):!1}var Aw={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function Cw(t,e){if(B(t,"LINE_BREAKS"))return!1;if(en(t.PATTERN)){try{jf(e,t.PATTERN)}catch(r){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Dt(t.PATTERN))return!1;if(ww(t))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function rU(t,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function kw(t){return L(t,r=>Dt(r)?r.charCodeAt(0):r)}function Qh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var ca=256,Kf=[];function Kn(t){return t<ca?t:Kf[t]}function nU(){if(se(Kf)){Kf=new Array(65536);for(let t=0;t<65536;t++)Kf[t]=t>255?255+~~(t/255):t}}function yi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function ua(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var Ew=1,Nw={};function gi(t){let e=iU(t);oU(e),aU(e),sU(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function iU(t){let e=Be(t),r=t,n=!0;for(;n;){r=Gn(Tt(L(r,o=>o.CATEGORIES)));let i=Xi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function oU(t){G(t,e=>{ey(e)||(Nw[Ew]=e,e.tokenTypeIdx=Ew++),$w(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),$w(e)||(e.CATEGORIES=[]),cU(e)||(e.categoryMatches=[]),lU(e)||(e.categoryMatchesMap={})})}function sU(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(Nw[n].tokenTypeIdx)})})}function aU(t){G(t,e=>{_w([],e)})}function _w(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);et(n,r)||_w(n,r)})}function ey(t){return B(t,"tokenTypeIdx")}function $w(t){return B(t,"CATEGORIES")}function cU(t){return B(t,"categoryMatches")}function lU(t){return B(t,"categoryMatchesMap")}function Iw(t){return B(t,"tokenTypeIdx")}var ty={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var tt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var _c={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:ty,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(_c);var ht=class{constructor(e,r=_c){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=Ec(o),l=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&l(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Qt({},_c,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===_c.lineTerminatorsPattern)this.config.lineTerminatorsPattern=Aw;else if(this.config.lineTerminatorCharacters===_c.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:Be(e)},defaultMode:la}:(o=!1,i=Be(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Rw(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(bw(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=Yi(a,l=>lr(l))});let s=He(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(xw(a,s))}),se(this.lexerDefinitionErrors)){gi(a);let l;this.TRACE_INIT("analyzeTokenTypes",()=>{l=vw(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=l.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=l.charCodeToPatternIdxToConfig,this.emptyGroups=Qt({},this.emptyGroups,l.emptyGroups),this.hasCustom=l.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=l.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,l=>l.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{kc(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Zh?(this.chopInput=Ar,this.match=this.matchWithTest):(this.updateLastIndex=ct,this.match=this.matchWithExec),o&&(this.handleModes=ct),this.trackStartLines===!1&&(this.computeNewColumn=Ar),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=ct),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=lt(this.canModeBeOptimized,(c,l,u)=>(l===!1&&c.push(u),c),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{pw()}),this.TRACE_INIT("toFastProperties",()=>{$c(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,c,l,u,f,m,T,S,A,N,C,v,g=e,$=g.length,O=0,X=0,ge=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ge),Ht=[],xt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,w=Sw(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],Rt=[],ut=[];Object.freeze(ut);let me;function Nr(){return ee}function Bn(bt){let er=Kn(bt),Sn=Q[er];return Sn===void 0?ut:Sn}let ka=bt=>{if(Rt.length===1&&bt.tokenType.PUSH_MODE===void 0){let er=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(bt);Ht.push({offset:bt.startOffset,line:bt.startLine,column:bt.startColumn,length:bt.image.length,message:er})}else{Rt.pop();let er=jn(Rt);ee=this.patternIdxToConfig[er],Q=this.charCodeToPatternIdxToConfig[er],ce=ee.length;let Sn=this.canModeBeOptimized[er]&&this.config.safeMode===!1;Q&&Sn?me=Bn:me=Nr}};function eo(bt){Rt.push(bt),Q=this.charCodeToPatternIdxToConfig[bt],ee=this.patternIdxToConfig[bt],ce=ee.length,ce=ee.length;let er=this.canModeBeOptimized[bt]&&this.config.safeMode===!1;Q&&er?me=Bn:me=Nr}eo.call(this,r);let fr,Go=this.config.recoveryEnabled;for(;O<$;){c=null;let bt=g.charCodeAt(O),er=me(bt),Sn=er.length;for(n=0;n<Sn;n++){fr=er[n];let Kt=fr.pattern;l=null;let ft=fr.short;if(ft!==!1?bt===ft&&(c=Kt):fr.isCustom===!0?(v=Kt.exec(g,O,Ee,w),v!==null?(c=v[0],v.payload!==void 0&&(l=v.payload)):c=null):(this.updateLastIndex(Kt,O),c=this.match(Kt,e,O)),c!==null){if(a=fr.longerAlt,a!==void 0){let jr=a.length;for(o=0;o<jr;o++){let _r=ee[a[o]],Rr=_r.pattern;if(u=null,_r.isCustom===!0?(v=Rr.exec(g,O,Ee,w),v!==null?(s=v[0],v.payload!==void 0&&(u=v.payload)):s=null):(this.updateLastIndex(Rr,O),s=this.match(Rr,e,O)),s&&s.length>c.length){c=s,l=u,fr=_r;break}}}break}}if(c!==null){if(f=c.length,m=fr.group,m!==void 0&&(T=fr.tokenTypeIdx,S=this.createTokenInstance(c,O,T,fr.tokenType,xt,M,f),this.handlePayload(S,l),m===!1?X=this.addToken(Ee,X,S):w[m].push(S)),e=this.chopInput(e,f),O=O+f,M=this.computeNewColumn(M,f),q===!0&&fr.canLineTerminator===!0){let Kt=0,ft,jr;j.lastIndex=0;do ft=j.test(c),ft===!0&&(jr=j.lastIndex-1,Kt++);while(ft===!0);Kt!==0&&(xt=xt+Kt,M=f-jr,this.updateTokenEndLineColumnLocation(S,m,jr,Kt,xt,M,f))}this.handleModes(fr,ka,eo,S)}else{let Kt=O,ft=xt,jr=M,_r=Go===!1;for(;_r===!1&&O<$;)for(e=this.chopInput(e,1),O++,i=0;i<ce;i++){let Rr=ee[i],to=Rr.pattern,bi=Rr.short;if(bi!==!1?g.charCodeAt(O)===bi&&(_r=!0):Rr.isCustom===!0?_r=to.exec(g,O,Ee,w)!==null:(this.updateLastIndex(to,O),_r=to.exec(e)!==null),_r===!0)break}if(A=O-Kt,M=this.computeNewColumn(M,A),C=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g,Kt,A,ft,jr),Ht.push({offset:Kt,line:ft,column:jr,length:A,message:C}),Go===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:w,errors:Ht}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let c,l;r!==void 0&&(c=n===a-1,l=c?-1:0,i===1&&c===!0||(e.endLine=o+l,e.endColumn=s-1+-l))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};ht.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";ht.NA=/NOT_APPLICABLE/;function Ti(t){return ry(t)?t.LABEL:t.name}function ry(t){return Dt(t.LABEL)&&t.LABEL!==""}var uU="parent",Pw="categories",Ow="label",Dw="group",Lw="push_mode",Mw="pop_mode",Fw="longer_alt",Uw="line_breaks",qw="start_chars_hint";function Bf(t){return fU(t)}function fU(t){let e=t.pattern,r={};if(r.name=t.name,lr(e)||(r.PATTERN=e),B(t,uU))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return B(t,Pw)&&(r.CATEGORIES=t[Pw]),gi([r]),B(t,Ow)&&(r.LABEL=t[Ow]),B(t,Dw)&&(r.GROUP=t[Dw]),B(t,Mw)&&(r.POP_MODE=t[Mw]),B(t,Lw)&&(r.PUSH_MODE=t[Lw]),B(t,Fw)&&(r.LONGER_ALT=t[Fw]),B(t,Uw)&&(r.LINE_BREAKS=t[Uw]),B(t,qw)&&(r.START_CHARS_HINT=t[qw]),r}var vn=Bf({name:"EOF",pattern:ht.NA});gi([vn]);function Po(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function Ic(t,e){return yi(t,e)}var vi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${ry(t)?`--> ${Ti(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+Gt(e).image+"'";if(n)return o+n+a;{let c=lt(t,(m,T)=>m.concat(T),[]),l=L(c,m=>`[${L(m,T=>Ti(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(l,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+Gt(e).image+"'";if(r)return i+r+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,l=>`[${L(l,u=>Ti(u)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(vi);var Gw={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},xn={buildDuplicateFoundError(t,e){function r(u){return u instanceof ae?u.terminalType.name:u instanceof Ce?u.nonTerminalName:""}let n=t.name,i=Gt(e),o=i.idx,s=$r(i),a=r(i),c=o>0,l=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
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
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof Tr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function jw(t,e){let r=new ny(t,e);return r.resolveRefs(),r.errors}var ny=class extends vr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(Pe(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Lt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var iy=class extends hi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Be(this.path.ruleStack).reverse(),this.occurrenceStack=Be(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Wf=class extends iy{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new We({definition:i});this.possibleTokTypes=_o(o),this.found=!0}}},fa=class extends hi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},zf=class extends fa{walkMany(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},Pc=class extends fa{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Vf=class extends fa{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Oc=class extends fa{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=Gt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function Xf(t,e,r=[]){r=Be(r);let n=[],i=0;function o(a){return a.concat(vt(t,i+1))}function s(a){let c=Xf(o(a),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof We)return s(a.definition);if(a instanceof Ce)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof ze){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof Ve){let c=[new We({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Me){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Fe)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:vt(t,i)}),n}function Yf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,l=c-n-1,u=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&jn(f).idx<=l&&f.pop();continue}let T=m.def,S=m.idx,A=m.ruleStack,N=m.occurrenceStack;if(se(T))continue;let C=T[0];if(C===i){let v={idx:S,def:vt(T),ruleStack:mi(A),occurrenceStack:mi(N)};f.push(v)}else if(C instanceof ae)if(S<c-1){let v=S+1,g=e[v];if(r(g,C.terminalType)){let $={idx:v,def:vt(T),ruleStack:A,occurrenceStack:N};f.push($)}}else if(S===c-1)u.push({nextTokenType:C.terminalType,nextTokenOccurrence:C.idx,ruleStack:A,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(C instanceof Ce){let v=Be(A);v.push(C.nonTerminalName);let g=Be(N);g.push(C.idx);let $={idx:S,def:C.definition.concat(o,vt(T)),ruleStack:v,occurrenceStack:g};f.push($)}else if(C instanceof ke){let v={idx:S,def:vt(T),ruleStack:A,occurrenceStack:N};f.push(v),f.push(s);let g={idx:S,def:C.definition.concat(vt(T)),ruleStack:A,occurrenceStack:N};f.push(g)}else if(C instanceof ze){let v=new pe({definition:C.definition,idx:C.idx}),g=C.definition.concat([v],vt(T)),$={idx:S,def:g,ruleStack:A,occurrenceStack:N};f.push($)}else if(C instanceof Ve){let v=new ae({terminalType:C.separator}),g=new pe({definition:[v].concat(C.definition),idx:C.idx}),$=C.definition.concat([g],vt(T)),O={idx:S,def:$,ruleStack:A,occurrenceStack:N};f.push(O)}else if(C instanceof Me){let v={idx:S,def:vt(T),ruleStack:A,occurrenceStack:N};f.push(v),f.push(s);let g=new ae({terminalType:C.separator}),$=new pe({definition:[g].concat(C.definition),idx:C.idx}),O=C.definition.concat([$],vt(T)),X={idx:S,def:O,ruleStack:A,occurrenceStack:N};f.push(X)}else if(C instanceof pe){let v={idx:S,def:vt(T),ruleStack:A,occurrenceStack:N};f.push(v),f.push(s);let g=new pe({definition:C.definition,idx:C.idx}),$=C.definition.concat([g],vt(T)),O={idx:S,def:$,ruleStack:A,occurrenceStack:N};f.push(O)}else if(C instanceof Fe)for(let v=C.definition.length-1;v>=0;v--){let g=C.definition[v],$={idx:S,def:g.definition.concat(vt(T)),ruleStack:A,occurrenceStack:N};f.push($),f.push(s)}else if(C instanceof We)f.push({idx:S,def:C.definition.concat(vt(T)),ruleStack:A,occurrenceStack:N});else if(C instanceof Tr)f.push(dU(C,S,A,N));else throw Error("non exhaustive match")}return u}function dU(t,e,r,n){let i=Be(r);i.push(t.name);let o=Be(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function Dc(t){if(t instanceof ke||t==="Option")return rt.OPTION;if(t instanceof pe||t==="Repetition")return rt.REPETITION;if(t instanceof ze||t==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(t instanceof Ve||t==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Me||t==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(t instanceof Fe||t==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Qf(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Dc(n);return o===rt.ALTERNATION?da(e,r,i):pa(e,r,o,i)}function Kw(t,e,r,n,i,o){let s=da(t,e,r),a=Yw(s)?ua:yi;return o(s,n,a,i)}function Bw(t,e,r,n,i,o){let s=pa(t,e,i,r),a=Yw(s)?ua:yi;return o(s[0],a,n)}function Ww(t,e,r,n){let i=t.length,o=cr(t,s=>cr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let l=t[c],u=l.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<u;m++){let T=l[m],S=T.length;for(let A=0;A<S;A++){let N=this.LA(A+1);if(r(N,T[A])===!1)continue e}return c}}};if(o&&!n){let s=L(t,c=>Tt(c)),a=lt(s,(c,l,u)=>(G(l,f=>{B(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=u),G(f.categoryMatches,m=>{B(c,m)||(c[m]=u)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],c=a.length;e:for(let l=0;l<c;l++){let u=a[l],f=u.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,u[m])===!1)continue e}return s}}}}function zw(t,e,r){let n=cr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=Tt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=lt(o,(a,c,l)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,u=>{a[u]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let c=0;c<a;c++){let l=this.LA(c+1);if(e(l,s[c])===!1)continue e}return!0}return!1}}var sy=class extends hi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,rt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,rt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},Jf=class extends vr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function Hw(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function oy(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function pU(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function Vw(t,e){let r=L(t,s=>Xf([s],1)),n=Hw(r.length),i=L(r,s=>{let a={};return G(s,c=>{let l=oy(c.partialPath);G(l,u=>{a[u]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=Hw(a.length);for(let c=0;c<a.length;c++){let l=a[c];for(let u=0;u<l.length;u++){let f=l[u].partialPath,m=l[u].suffixDef,T=oy(f);if(pU(i,T,c)||se(m)||f.length===e){let A=n[c];if(Zf(A,f)===!1){A.push(f);for(let N=0;N<T.length;N++){let C=T[N];i[c][C]=!0}}}else{let A=Xf(m,s+1,f);o[c]=o[c].concat(A),G(A,N=>{let C=oy(N.partialPath);G(C,v=>{i[c][v]=!0})})}}}}return n}function da(t,e,r,n){let i=new Jf(t,rt.ALTERNATION,n);return e.accept(i),Vw(i.result,r)}function pa(t,e,r,n){let i=new Jf(t,r);e.accept(i);let o=i.result,a=new sy(e,t,r).startWalking(),c=new We({definition:o}),l=new We({definition:a});return Vw([c,l],n)}function Zf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function Xw(t,e){return t.length<e.length&&cr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function Yw(t){return cr(t,e=>cr(e,r=>cr(r,n=>se(n.categoryMatches))))}function Jw(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Lt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function Qw(t,e,r,n){let i=Zt(t,c=>mU(c,r)),o=xU(t,e,r),s=Zt(t,c=>gU(c,r)),a=Zt(t,c=>yU(c,t,n,r));return i.concat(o,s,a)}function mU(t,e){let r=new ay;t.accept(r);let n=r.allProductions,i=Bh(n,hU),o=Er(i,a=>a.length>1);return L(Pe(o),a=>{let c=Gt(a),l=e.buildDuplicateFoundError(t,a),u=$r(c),f={message:l,type:Lt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:u,occurrence:c.idx},m=Zw(c);return m&&(f.parameter=m),f})}function hU(t){return`${$r(t)}_#_${t.idx}_#_${Zw(t)}`}function Zw(t){return t instanceof ae?t.terminalType.name:t instanceof Ce?t.nonTerminalName:""}var ay=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function yU(t,e,r,n){let i=[];if(lt(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Lt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function eA(t,e,r){let n=[],i;return et(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Lt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function ly(t,e,r,n=[]){let i=[],o=ed(e.definition);if(se(o))return[];{let s=t.name;et(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Lt.LEFT_RECURSION,ruleName:s});let c=Xi(o,n.concat([t])),l=Zt(c,u=>{let f=Be(n);return f.push(u),ly(t,u,r,f)});return i.concat(l)}}function ed(t){let e=[];if(se(t))return e;let r=Gt(t);if(r instanceof Ce)e.push(r.referencedRule);else if(r instanceof We||r instanceof ke||r instanceof ze||r instanceof Ve||r instanceof Me||r instanceof pe)e=e.concat(ed(r.definition));else if(r instanceof Fe)e=Tt(L(r.definition,o=>ed(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=No(r),i=t.length>1;if(n&&i){let o=vt(t);return e.concat(ed(o))}else return e}var Lc=class extends vr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function tA(t,e){let r=new Lc;t.accept(r);let n=r.alternations;return Zt(n,o=>{let s=mi(o.definition);return Zt(s,(a,c)=>{let l=Yf([a],[],yi,1);return se(l)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:c}),type:Lt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:c+1}]:[]})})}function rA(t,e,r){let n=new Lc;t.accept(n);let i=n.alternations;return i=Yi(i,s=>s.ignoreAmbiguities===!0),Zt(i,s=>{let a=s.idx,c=s.maxLookahead||e,l=da(a,t,c,s),u=TU(l,s,t,r),f=vU(l,s,t,r);return u.concat(f)})}var cy=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function gU(t,e){let r=new Lc;t.accept(r);let n=r.alternations;return Zt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Lt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function nA(t,e,r){let n=[];return G(t,i=>{let o=new cy;i.accept(o);let s=o.allProductions;G(s,a=>{let c=Dc(a),l=a.maxLookahead||e,u=a.idx,m=pa(u,i,c,l)[0];if(se(Tt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Lt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function TU(t,e,r,n){let i=[],o=lt(t,(a,c,l)=>(e.definition[l].ignoreAmbiguities===!0||G(c,u=>{let f=[l];G(t,(m,T)=>{l!==T&&Zf(m,u)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Zf(i,u)&&(i.push(u),a.push({alts:f,path:u}))}),a),[]);return L(o,a=>{let c=L(a.alts,u=>u+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Lt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function vU(t,e,r,n){let i=lt(t,(s,a,c)=>{let l=L(a,u=>({idx:c,path:u}));return s.concat(l)},[]);return Gn(Zt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,l=s.path,u=qt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&Xw(m.path,l));return L(u,m=>{let T=[m.idx+1,c+1],S=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Lt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:S,alternatives:T}})}))}function xU(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(et(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Lt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function iA(t){let e=na(t,{errMsgProvider:Gw}),r={};return G(t.rules,n=>{r[n.name]=n}),jw(r,e.errMsgProvider)}function oA(t){return t=na(t,{errMsgProvider:xn}),Qw(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var sA="MismatchedTokenException",aA="NoViableAltException",cA="EarlyExitException",lA="NotAllInputParsedException",uA=[sA,aA,cA,lA];Object.freeze(uA);function Ji(t){return et(uA,t.name)}var ma=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},Oo=class extends ma{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=sA}},Mc=class extends ma{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=aA}},Fc=class extends ma{constructor(e,r){super(e,r),this.name=lA}},Uc=class extends ma{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=cA}};var uy={},dy="InRuleRecoveryException",fy=class extends Error{constructor(e){super(e),this.name=dy}},td=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=B(e,"recoveryEnabled")?e.recoveryEnabled:xr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=RU)}getTokenToInsert(e){let r=Po(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,l=this.LA(1),u=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:l,previous:m,ruleName:this.getCurrRuleFullName()}),S=new Oo(T,l,this.LA(0));S.resyncedTokens=mi(a),this.SAVE_ERROR(S)};for(;!c;)if(this.tokenMatcher(u,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(u,o)?c=!0:(u=this.SKIP_TOKEN(),this.addToResyncTokens(u,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new fy("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Hn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Hn(e,o=>Ic(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return uy;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?uy:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return Tt(e)}getFollowSetFromFollowKey(e){if(e===uy)return[vn];let r=e.ruleName+e.idxInCallingRule+Uf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,vn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return mi(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=Be(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function RU(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];c=new o(T,i).startWalking(),this.firstAfterRepMap[a]=c}let l=c.token,u=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&l===void 0&&(l=vn,u=1),!(l===void 0||u===void 0)&&this.shouldInRepetitionRecoveryBeTried(l,u,s)&&this.tryInRepetitionRecovery(t,e,r,l)}function rd(t,e,r){return r|e|t}var Mre=32-8;var xi=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:xr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Zt(e,r=>ly(r,r,xn))}validateEmptyOrAlternatives(e){return Zt(e,r=>tA(r,xn))}validateAmbiguousAlternationAlternatives(e,r){return Zt(e,n=>rA(n,r,xn))}validateSomeNonEmptyLookaheadPath(e,r){return nA(e,r,xn)}buildLookaheadForAlternation(e){return Kw(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,Ww)}buildLookaheadForOptional(e){return Bw(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Dc(e.prodType),zw)}};var id=class{initLooksAhead(e){this.dynamicTokensEnabled=B(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:xr.dynamicTokensEnabled,this.maxLookahead=B(e,"maxLookahead")?e.maxLookahead:xr.maxLookahead,this.lookaheadStrategy=B(e,"lookaheadStrategy")?e.lookaheadStrategy:new xi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=bU(r);G(n,l=>{let u=l.idx===0?"":l.idx;this.TRACE_INIT(`${$r(l)}${u}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:l.idx,rule:r,maxLookahead:l.maxLookahead||this.maxLookahead,hasPredicates:l.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=rd(this.fullRuleNameToShort[r.name],256,l.idx);this.setLaFuncCache(m,f)})}),G(i,l=>{this.computeLookaheadFunc(r,l.idx,768,"Repetition",l.maxLookahead,$r(l))}),G(o,l=>{this.computeLookaheadFunc(r,l.idx,512,"Option",l.maxLookahead,$r(l))}),G(s,l=>{this.computeLookaheadFunc(r,l.idx,1024,"RepetitionMandatory",l.maxLookahead,$r(l))}),G(a,l=>{this.computeLookaheadFunc(r,l.idx,1536,"RepetitionMandatoryWithSeparator",l.maxLookahead,$r(l))}),G(c,l=>{this.computeLookaheadFunc(r,l.idx,1280,"RepetitionWithSeparator",l.maxLookahead,$r(l))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=rd(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return rd(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},py=class extends vr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},nd=new py;function bU(t){nd.reset(),t.accept(nd);let e=nd.dslMethods;return nd.reset(),e}function yy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function gy(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function fA(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function dA(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var SU="name";function Ty(t,e){Object.defineProperty(t,SU,{enumerable:!1,configurable:!0,writable:!1,value:e})}function wU(t,e){let r=He(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let c=0;c<a;c++){let l=s[c];l.tokenTypeIdx===void 0&&this[l.name](l.children,e)}}}function pA(t,e){let r=function(){};Ty(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!lr(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=AU(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function mA(t,e,r){let n=function(){};Ty(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=wU}),n.prototype=i,n.prototype.constructor=n,n}var vy;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(vy||(vy={}));function AU(t,e){return CU(t,e)}function CU(t,e){let r=qt(e,i=>gr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:vy.MISSING_METHOD,methodName:i}));return Gn(n)}var cd=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=B(e,"nodeLocationTracking")?e.nodeLocationTracking:xr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=ct,this.cstFinallyStateUpdate=ct,this.cstPostTerminal=ct,this.cstPostNonTerminal=ct,this.cstPostRule=ct;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=gy,this.setNodeLocationFromNode=gy,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=yy,this.setNodeLocationFromNode=yy,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=ct,this.setInitialNodeLocation=ct;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];fA(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];dA(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(lr(this.baseCstVisitorConstructor)){let e=pA(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(lr(this.baseCstVisitorWithDefaultsConstructor)){let e=mA(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var ld=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):ha}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?ha:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var ud=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=ya){if(et(this.definedRulesNames,e)){let s={message:xn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Lt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=ya){let i=eA(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(Ji(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Ff(Pe(this.gastProductionsCache))}};var fd=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ua,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},B(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=lt(e,(o,s)=>(o[s.name]=s,o),{});else if(B(e,"modes")&&cr(Tt(Pe(e.modes)),Iw)){let o=Tt(Pe(e.modes)),s=ia(o);this.tokensMap=lt(s,(a,c)=>(a[c.name]=c,a),{})}else if(at(e))this.tokensMap=Be(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=vn;let n=B(e,"modes")?Tt(Pe(e.modes)):Pe(e),i=cr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?ua:yi,gi(Pe(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=B(n,"resyncEnabled")?n.resyncEnabled:ya.resyncEnabled,o=B(n,"recoveryValueFunc")?n.recoveryValueFunc:ya.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...u){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...u){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,u)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(Ji(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Vf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Oc],a,1536,e,Oc)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,zf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Pc],a,1280,e,Pc)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Fc(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw Ji(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new Oo(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===dy?n:o}}else throw n}saveRecogState(){let e=this.errors,r=Be(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),vn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var dd=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=B(e,"errorMessageProvider")?e.errorMessageProvider:xr.errorMessageProvider}SAVE_ERROR(e){if(Ji(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Be(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Be(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=pa(e,o,r,this.maxLookahead)[0],c=[];for(let u=1;u<=this.maxLookahead;u++)c.push(this.LA(u));let l=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Uc(l,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=da(e,i,this.maxLookahead),s=[];for(let l=1;l<=this.maxLookahead;l++)s.push(this.LA(l));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new Mc(c,this.LA(1),a))}};var pd=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(lr(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Yf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=Gt(e.ruleStack),i=this.getGAstProductions()[r];return new Wf(i,e).startWalking()}};var yd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(yd);var hA=!0,yA=Math.pow(2,8)-1,TA=Bf({name:"RECORDING_PHASE_TOKEN",pattern:ht.NA});gi([TA]);var vA=Po(TA,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(vA);var EU={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},md=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return ha}topLevelRuleRecord(e,r){try{let n=new Tr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Gc.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){Gc.call(this,ze,r,e)}atLeastOneSepFirstInternalRecord(e,r){Gc.call(this,Ve,r,e,hA)}manyInternalRecord(e,r){Gc.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){Gc.call(this,Me,r,e,hA)}orInternalRecord(e,r){return $U.call(this,e,r)}subruleInternalRecord(e,r,n){if(hd(r),!e||B(e,"ruleName")===!1){let a=new Error(`<SUBRULE${gA(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=jn(this.recordingProdStack),o=e.ruleName,s=new Ce({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?EU:yd}consumeInternalRecord(e,r,n){if(hd(r),!ey(e)){let s=new Error(`<CONSUME${gA(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=jn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),vA}};function Gc(t,e,r,n=!1){hd(r);let i=jn(this.recordingProdStack),o=gr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),B(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),yd}function $U(t,e){hd(e);let r=jn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});B(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=Cc(i,a=>gr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let c=new We({definition:[]});o.definition.push(c),B(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:B(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),yd}function gA(t){return t===0?"":`${t}`}function hd(t){if(t<0||t>yA){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${yA+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var gd=class{initPerformanceTracer(e){if(B(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=xr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=Ec(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function xA(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var ha=Po(vn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(ha);var xr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:vi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),ya=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Lt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Lt||(Lt={}));function Td(t=void 0){return function(){return t}}var jc=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{$c(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=iA({rules:Pe(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=oA({rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),errMsgProvider:xn,grammarName:r}),o=Jw({lookaheadStrategy:this.lookaheadStrategy,rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=dw(Pe(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Pe(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Pe(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),B(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=B(r,"skipValidations")?r.skipValidations:xr.skipValidations}};jc.DEFER_DEFINITION_ERRORS_HANDLING=!1;xA(jc,[td,id,cd,ld,fd,ud,dd,pd,md,gd]);var Hc=class extends jc{constructor(e,r=xr){let n=Be(r);n.outputCst=!1,super(e,n)}};function Do(t,e,r){return`${t.name}_${e}_${r}`}var Qi=1,_U=2,RA=4,bA=5;var va=7,IU=8,PU=9,OU=10,DU=11,SA=12,Kc=class{constructor(e){this.target=e}isEpsilon(){return!1}},ga=class extends Kc{constructor(e,r){super(e),this.tokenType=r}},Bc=class extends Kc{constructor(e){super(e)}isEpsilon(){return!0}},Ta=class extends Kc{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function wA(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};LU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Lo(e,i,i);o!==void 0&&zU(e,i,o)}return e}function LU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=jt(t,i,void 0,{type:_U}),s=jt(t,i,void 0,{type:va});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function AA(t,e,r){return r instanceof ae?Ry(t,e,r.terminalType,r):r instanceof Ce?WU(t,e,r):r instanceof Fe?GU(t,e,r):r instanceof ke?jU(t,e,r):r instanceof pe?MU(t,e,r):r instanceof Me?FU(t,e,r):r instanceof ze?UU(t,e,r):r instanceof Ve?qU(t,e,r):Lo(t,e,r)}function MU(t,e,r){let n=jt(t,e,r,{type:bA});Zi(t,n);let i=xa(t,e,n,r,Lo(t,e,r));return kA(t,e,r,i)}function FU(t,e,r){let n=jt(t,e,r,{type:bA});Zi(t,n);let i=xa(t,e,n,r,Lo(t,e,r)),o=Ry(t,e,r.separator,r);return kA(t,e,r,i,o)}function UU(t,e,r){let n=jt(t,e,r,{type:RA});Zi(t,n);let i=xa(t,e,n,r,Lo(t,e,r));return CA(t,e,r,i)}function qU(t,e,r){let n=jt(t,e,r,{type:RA});Zi(t,n);let i=xa(t,e,n,r,Lo(t,e,r)),o=Ry(t,e,r.separator,r);return CA(t,e,r,i,o)}function GU(t,e,r){let n=jt(t,e,r,{type:Qi});Zi(t,n);let i=L(r.definition,s=>AA(t,e,s));return xa(t,e,n,r,...i)}function jU(t,e,r){let n=jt(t,e,r,{type:Qi});Zi(t,n);let i=xa(t,e,n,r,Lo(t,e,r));return HU(t,e,r,i)}function Lo(t,e,r){let n=qt(L(r.definition,i=>AA(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:BU(t,n)}function CA(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:DU});Zi(t,a);let c=jt(t,e,r,{type:SA});return o.loopback=a,c.loopback=a,t.decisionMap[Do(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,c)):(_t(a,c),_t(a,i.left),_t(i.right,o)),{left:o,right:c}}function kA(t,e,r,n,i){let o=n.left,s=n.right,a=jt(t,e,r,{type:OU});Zi(t,a);let c=jt(t,e,r,{type:SA}),l=jt(t,e,r,{type:PU});return a.loopback=l,c.loopback=l,_t(a,o),_t(a,c),_t(s,l),i!==void 0?(_t(l,c),_t(l,i.left),_t(i.right,o)):_t(l,a),t.decisionMap[Do(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:c}}function HU(t,e,r,n){let i=n.left,o=n.right;return _t(i,o),t.decisionMap[Do(e,"Option",r.idx)]=i,n}function Zi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function xa(t,e,r,n,...i){let o=jt(t,e,n,{type:IU,start:r});r.end=o;for(let a of i)a!==void 0?(_t(r,a.left),_t(a.right,o)):_t(r,o);let s={left:r,right:o};return t.decisionMap[Do(e,KU(n),n.idx)]=r,s}function KU(t){if(t instanceof Fe)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Me)return"RepetitionWithSeparator";if(t instanceof ze)return"RepetitionMandatory";if(t instanceof Ve)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function BU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof Ta,l=a,u=e[o+1].left;s.left.type===Qi&&s.right.type===Qi&&a!==void 0&&(c&&l.followState===s.right||a.target===s.right)?(c?l.followState=u:a.target=u,VU(t,s.right)):_t(s.right,u)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function Ry(t,e,r,n){let i=jt(t,e,n,{type:Qi}),o=jt(t,e,n,{type:Qi});return by(i,new ga(o,r)),{left:i,right:o}}function WU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=jt(t,e,r,{type:Qi}),s=jt(t,e,r,{type:Qi}),a=new Ta(i,n,s);return by(o,a),{left:o,right:s}}function zU(t,e,r){let n=t.ruleToStartState.get(e);_t(n,r.left);let i=t.ruleToStopState.get(e);return _t(r.right,i),{left:n,right:i}}function _t(t,e){let r=new Bc(e);by(t,r)}function jt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function by(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function VU(t,e){t.states.splice(t.states.indexOf(e),1)}var Wc={},Ra=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=Sy(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function Sy(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function XU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var vd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},EA=new vd,zc=class extends xi{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=wA(e.rules),this.dfas=YU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Do(n,"Alternation",r),u=this.atn.decisionMap[c].decision,f=L(Qf({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if($A(f,!1)&&!o){let m=lt(f,(T,S,A)=>(G(S,N=>{N&&(T[N.tokenTypeIdx]=A,G(N.categoryMatches,C=>{T[C]=A}))}),T),{});return i?function(T){var S;let A=this.LA(1),N=m[A.tokenTypeIdx];if(T!==void 0&&N!==void 0){let C=(S=T[N])===null||S===void 0?void 0:S.GATE;if(C!==void 0&&C.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new vd,S=m===void 0?0:m.length;for(let N=0;N<S;N++){let C=m?.[N].GATE;T.set(N,C===void 0||C.call(this))}let A=wy.call(this,s,u,T,a);return typeof A=="number"?A:void 0}:function(){let m=wy.call(this,s,u,EA,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=Do(n,i,r),u=this.atn.decisionMap[c].decision,f=L(Qf({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if($A(f)&&f[0][0]&&!o){let m=f[0],T=Tt(m);if(T.length===1&&se(T[0].categoryMatches)){let A=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===A}}else{let S=lt(T,(A,N)=>(N!==void 0&&(A[N.tokenTypeIdx]=!0,G(N.categoryMatches,C=>{A[C]=!0})),A),{});return function(){let A=this.LA(1);return S[A.tokenTypeIdx]===!0}}}return function(){let m=wy.call(this,s,u,EA,a);return typeof m=="object"?!1:m===0}}};function $A(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function YU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=XU(t.decisionStates[n],n);return r}function wy(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=aq(i.atnStartState);o=IA(i,_A(a)),i.start=o}return JU.apply(this,[i,o,r,n])}function JU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=nq(i,a);if(c===void 0&&(c=QU.apply(this,[t,i,a,o,r,n])),c===Wc)return rq(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function QU(t,e,r,n,i,o){let s=iq(e.configs,r,i);if(s.size===0)return NA(t,e,r,Wc),Wc;let a=_A(s),c=sq(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(fq(s)){let l=nw(s.alts);a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l,ZU.apply(this,[t,n,s.alts,o])}return a=NA(t,e,r,a),a}function ZU(t,e,r,n){let i=[];for(let l=1;l<=e;l++)i.push(this.LA(l).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,c=eq({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(c)}function eq(t){let e=L(t.prefixPath,i=>Ti(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${tq(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function tq(t){if(t instanceof Ce)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function rq(t,e,r){let n=Zt(e.configs.elements,o=>o.state.transitions),i=uw(n.filter(o=>o instanceof ga).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function nq(t,e){return t.edges[e.tokenTypeIdx]}function iq(t,e,r){let n=new Ra,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===va){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let l=s.state.transitions[c],u=oq(l,e);u!==void 0&&n.add({state:u,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new Ra;for(let s of n.elements)xd(s,o)}if(i.length>0&&!lq(o))for(let s of i)o.add(s);return o}function oq(t,e){if(t instanceof ga&&Ic(e,t.tokenType))return t.target}function sq(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function _A(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function NA(t,e,r,n){return n=IA(t,n),e.edges[r.tokenTypeIdx]=n,n}function IA(t,e){if(e===Wc)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function aq(t){let e=new Ra,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};xd(o,e)}return e}function xd(t,e){let r=t.state;if(r.type===va){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};xd(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=cq(t,o);s!==void 0&&xd(s,e)}}function cq(t,e){if(e instanceof Bc)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof Ta){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function lq(t){for(let e of t.elements)if(e.state.type===va)return!0;return!1}function uq(t){for(let e of t.elements)if(e.state.type!==va)return!1;return!0}function fq(t){if(uq(t))return!0;let e=dq(t.elements);return pq(e)&&!mq(e)}function dq(t){let e=new Map;for(let r of t){let n=Sy(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function pq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function mq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var Ay=de(co(),1);var Rd=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new ky(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new wd;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Sd(e.startOffset,e.image.length,Ja(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Sd(r.startOffset,r.image.length,Ja(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if($n(s)&&n>a&&i<c){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},bd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},Sd=class extends bd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},wd=class extends bd{constructor(){super(...arguments),this.content=new Cy(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:Ay.Position.create(0,0),end:Ay.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},Cy=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},ky=class extends wd{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var $y=Symbol("Datatype");function Ey(t){return t.$type===$y}var PA="\u200B",OA=t=>t.endsWith(PA)?t:t+PA,Ad=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new _y(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},Cd=class extends Ad{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Rd,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Ur(e)?$y:hn(e),i=this.wrapper.DEFINE_RULE(OA(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===$y&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let l=pt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,l,o,a)}else if(Ey(c)){let l=i.image;pt(n)||(l=this.converter.convert(l,o).toString()),c.value+=l}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Ey(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let l=c;this.stack.pop(),this.stack.push(l)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return Kv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),Ey(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Ie(e,Re);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Vt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},Ny=class{buildMismatchTokenMessage(e){return vi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return vi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return vi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return vi.buildEarlyExitMessage(e)}},Vc=class extends Ny{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},kd=class extends Ad{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(OA(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},hq={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Vc},_y=class extends Hc{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},hq),{lookaheadStrategy:n?new xi({maxLookahead:r.maxLookahead}):new zc}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Xc=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function Ed(t){throw new Error("Error! The input value was not handled.")}function Nd(t,e,r){return yq({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function yq(t,e){let r=xs(e,!1),n=ie(e.rules).filter(K).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Mo(o,i.definition)))}}function Mo(t,e,r=!1){let n;if(pt(e))n=Sq(t,e);else if(Ne(e))n=gq(t,e);else if(Re(e))n=Mo(t,e.terminal);else if(Vt(e))n=DA(t,e);else if(_e(e))n=Tq(t,e);else if(Or(e))n=xq(t,e);else if(Dr(e))n=Rq(t,e);else if(Ft(e))n=bq(t,e);else throw new Xc(e.$cstNode,`Unexpected element type: ${e.$type}`);return LA(t,r?void 0:$d(e),n,e.cardinality)}function gq(t,e){let r=hn(e);return()=>t.parser.action(r,e)}function Tq(t,e){let r=e.rule.ref;if(K(r)){let n=t.subrule++,i=e.arguments.length>0?vq(r,e.arguments):()=>({});return o=>t.parser.subrule(n,MA(t,r),e,i(o))}else if(we(r)){let n=t.consume++,i=Iy(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)Ed(r);else throw new Xc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function vq(t,e){let r=e.map(n=>Ri(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function Ri(t){if(lv(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)||r(n)}else if(av(t)){let e=Ri(t.left),r=Ri(t.right);return n=>e(n)&&r(n)}else if(mv(t)){let e=Ri(t.value);return r=>!e(r)}else if(ls(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(dv(t)){let e=!!t.true;return()=>e}Ed(t)}function xq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Mo(t,i,!0)},s=$d(i);s&&(o.GATE=Ri(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function Rq(t,e){if(e.elements.length===1)return Mo(t,e.elements[0]);let r=[];for(let a of e.elements){let c={ALT:Mo(t,a,!0)},l=$d(a);l&&(c.GATE=Ri(l)),r.push(c)}let n=t.or++,i=(a,c)=>{let l=c.getRuleStack().join("-");return`uGroup_${a}_${l}`},o=a=>t.parser.alternatives(n,r.map((c,l)=>{let u={ALT:()=>!0},f=t.parser;u.ALT=()=>{if(c.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let S=f.unorderedGroups.get(T);typeof S?.[l]>"u"&&(S[l]=!0)}};let m=c.GATE;return m?u.GATE=()=>m(a):u.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[l]},u})),s=LA(t,$d(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function bq(t,e){let r=e.elements.map(n=>Mo(t,n));return n=>r.forEach(i=>i(n))}function $d(t){if(Ft(t))return t.guardCondition}function DA(t,e,r=e.terminal){if(r)if(_e(r)&&K(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,MA(t,r.rule.ref),e,i)}else if(_e(r)&&we(r.rule.ref)){let n=t.consume++,i=Iy(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(pt(r)){let n=t.consume++,i=Iy(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=hc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+hn(e.type.ref));return DA(t,e,i)}}function Sq(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function LA(t,e,r,n){let i=e&&Ri(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:Td(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:Td(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else Ed(n)}function MA(t,e){let r=wq(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function wq(t,e){if(K(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!K(n);)(Ft(n)||Or(n)||Dr(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function Iy(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function FA(t){let e=t.Grammar,r=t.parser.Lexer,n=new kd(t);return Nd(e,n,r.definition),n.finalize(),n}function UA(t){let e=Aq(t);return e.finalize(),e}function Aq(t){let e=t.Grammar,r=t.parser.Lexer,n=new Cd(t);return Nd(e,n,r.definition)}var _d=class{buildTokens(e,r){let n=ie(xs(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&fh(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(we).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Jr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=fh(r)?ht.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(K).flatMap(i=>Qe(i).filter(pt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(dx(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&px("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Id=class{convert(e,r){let n=r.grammarSource;if(Vt(n)&&(n=Iu(n)),_e(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return $q(r);case"STRING":return Cq(r);case"ID":return Eq(r)}switch((i=wo(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return Iq(r);case"boolean":return Pq(r);case"bigint":return Nq(r);case"date":return _q(r);default:return r}}};function Cq(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=kq(i)}else e+=n}return e}function kq(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function Eq(t){return t.charAt(0)==="^"?t.substring(1):t}function $q(t){return parseInt(t)}function Nq(t){return BigInt(t)}function _q(t){return new Date(t)}function Iq(t){return Number(t)}function Pq(t){return t.toLowerCase()==="true"}var qA=de(Se(),1);var Pd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=qA.CancellationToken.None){for(let n of ni(e.parseResult.value))await Ze(r),su(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(is(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(Et(this._ref))return this._ref;if(WT(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:r});if(c.error&&ne(e).state<je.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return Et(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return is(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(is(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<je.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function jA(t){return typeof t.$comment=="string"}function GA(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Od=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,l;if(!this.ignoreProperties.has(e))if(ei(r)){let u=r.ref,f=n?r.$refText:void 0;return u?{$refText:f,$ref:"#"+(u&&this.astNodeLocator.getAstNodePath(u))}:{$refText:f,$error:(c=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let u;if(o&&Et(r)&&(u=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&u?.$textRegion))try{u.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&Et(r)&&(u??(u=Object.assign({},r)),u.$sourceText=(l=r.$cstNode)===null||l===void 0?void 0:l.text),s&&Et(r)&&(u??(u=Object.assign({},r)),u.$comment=this.commentProvider.getComment(r)),u??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Ii(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];GA(u)?c[l]=this.reviveReference(e,a,r,u):Et(u)&&this.linkNode(u,r,e,a,l)}else GA(c)?e[a]=this.reviveReference(e,a,r,c):Et(c)&&this.linkNode(c,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Dd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var HA=de(Se(),1);var Ld=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=ir((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:ir(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Md=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=HA.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of ni(i))await Ze(r),su(o).filter(s=>!is(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:ir(n),local:ve.equals(r.documentUri,i)}}};var Fd=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),l=i[a];return l?.[c]}return i[o]},e)}};var KA=de(Ct(),1),Ud=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(KA.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var ba=de(Se(),1);var qd=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=ba.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===je.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=je.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let c=this.buildState.get(a),l=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(l){let f=((o=r.validation.categories)!==null&&o!==void 0?o:gs.all).filter(m=>!l.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:c.result}),s.state=je.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=ba.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,je.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<je.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),ba.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,je.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,je.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,je.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,je.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,je.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,je.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await Ze(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),ba.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let l=this.buildState.get(e.uri.toString());if(l){(n=l.result)!==null&&n!==void 0||(l.result={});let u=(i=a?.categories)!==null&&i!==void 0?i:gs.all;l.result.validationChecks?l.result.validationChecks.push(...u):l.result.validationChecks=[...u]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var Py=de(Se(),1);var Gd=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new Au,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=Py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=Py.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var BA=de(Se(),1);var jd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=BA.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Jt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var Hd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=WA(r)?Object.values(r):r;this.chevrotainLexer=new ht(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(WA(e))return e;let r=zA(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function Oq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function zA(t){return t&&"modes"in t&&"defaultMode"in t}function WA(t){return!Oq(t)&&!zA(t)}var be=de(Se(),1);function YA(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=be.Position.create(0,0));let o=QA(t),s=Ly(n),a=Lq({lines:o,position:i,options:s});return Gq({index:0,tokens:a,position:i})}function JA(t,e){let r=Ly(e),n=QA(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function QA(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(tc)}var VA=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,Dq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function Lq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let c=a===0,l=a===t.lines.length-1,u=t.lines[a],f=0;if(c&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(u);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(u);T&&(f=T.index+T[0].length)}if(l){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(u);T&&(u=u.substring(0,T.index))}if(u=u.substring(0,qq(u)),Dy(u,0)>=u.length){if(i.length>0){let T=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(T,T)})}}else{VA.lastIndex=f;let T=VA.exec(u);if(T){let S=T[0],A=T[1],N=be.Position.create(o,s+f),C=be.Position.create(o,s+f+S.length);i.push({type:"tag",content:A,range:be.Range.create(N,C)}),f+=S.length,f=Dy(u,f)}if(f<u.length){let S=u.substring(f),A=Array.from(S.matchAll(Dq));i.push(...Mq(A,S,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function Mq(t,e,r,n){let i=[];if(t.length===0){let o=be.Position.create(r,n),s=be.Position.create(r,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of t){let c=a.index,l=e.substring(o,c);l.length>0&&i.push({type:"text",content:e.substring(o,c),range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,c+n))});let u=l.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+f.length+n))}),u+=f.length,a.length===4){u+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(r,o+u+n),be.Position.create(r,o+u+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,o+n+s.length))})}return i}var Fq=/\S/,Uq=/\s*$/;function Dy(t,e){let r=t.substring(e).match(Fq);return r?e+r.index:t.length}function qq(t){let e=t.match(Uq);if(e&&typeof e.index=="number")return e.index}function Gq(t){var e,r,n,i;let o=be.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Kd([],be.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let l=jq(t,s[s.length-1]);l&&s.push(l)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Kd(s,be.Range.create(a,c))}function jq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return eC(t,!1);if(r.type==="text"||r.type==="inline-tag")return ZA(t);Hq(r,e),t.index++}function Hq(t,e){if(e){let r=new Bd("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function ZA(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Kq(t)),n=e,e=t.tokens[t.index];return new Jc(i,be.Range.create(r.range.start,n.range.end))}function Kq(t){return t.tokens[t.index].type==="inline-tag"?eC(t,!0):tC(t)}function eC(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=tC(t);return new Yc(n,new Jc([o],o.range),e,be.Range.create(r.range.start,o.range.end))}else{let o=ZA(t);return new Yc(n,o,e,be.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Yc(n,new Jc([],o),e,o)}}function tC(t){let e=t.tokens[t.index++];return new Bd(e.content,e.range)}function Ly(t){if(!t)return Ly({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:Oy(e,!0),end:Oy(r,!1),line:Oy(n,!0)}}function Oy(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?si(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Kd=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=XA(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=XA(r)+i}return r.trim()}},Yc=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=Bq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function Bq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=Dy(e,o);s=e.substring(c),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:Wq(e,s)}}function Wq(t,e){try{return Jt.parse(t,!0),`[${e}](${t})`}catch{return t}}var Jc=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Bd=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function XA(t){return t.endsWith(`
`)?`
`:`

`}var Wd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&JA(r))return YA(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var zd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return jA(e)?e.$comment:(r=QT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function Rc(t){return{documentation:{CommentProvider:e=>new zd(e),DocumentationProvider:e=>new Wd(e)},parser:{GrammarConfig:e=>yR(e),LangiumParser:e=>UA(e),CompletionParser:e=>FA(e),ValueConverter:()=>new Id,TokenBuilder:()=>new _d,Lexer:e=>new Hd(e),ParserErrorMessageProvider:()=>new Vc},lsp:{CompletionProvider:e=>new $s(e),DocumentSymbolProvider:e=>new Bu(e),HoverProvider:e=>new Vu(e),FoldingRangeProvider:e=>new _s(e),ReferencesProvider:e=>new ef(e),DefinitionProvider:e=>new Os(e),DocumentHighlightProvider:e=>new Ku(e),RenameProvider:e=>new tf(e)},workspace:{AstNodeLocator:()=>new Fd,AstNodeDescriptionProvider:e=>new Ld(e),ReferenceDescriptionProvider:e=>new Md(e)},references:{Linker:e=>new Pd(e),NameProvider:()=>new hs,ScopeProvider:e=>new ks(e),ScopeComputation:e=>new Cs(e),References:e=>new Is(e)},serializer:{JsonSerializer:e=>new Od(e)},validation:{DocumentValidator:e=>new $u(e),ValidationRegistry:e=>new xu(e)},shared:()=>t.shared}}function bc(t){return{ServiceRegistry:()=>new Dd,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Ju(e),WorkspaceSymbolProvider:e=>new rf(e),NodeKindProvider:()=>new Qu,FuzzyMatcher:()=>new zu},workspace:{LangiumDocuments:e=>new Yu(e),LangiumDocumentFactory:e=>new Xu(e),DocumentBuilder:e=>new qd(e),TextDocuments:()=>new rC.TextDocuments(ns),IndexManager:e=>new Gd(e),WorkspaceManager:e=>new jd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new vu,ConfigurationProvider:e=>new Ud(e)}}}var Ca=de(iC(),1);var zq="ArithmeticOperator";var Vq="BooleanOperator";var Xq="Expression";var Yq="Fonction";var Jq="Statement";var Qq="Add";var Zq="Divise";var eG="Multiply";var tG="Sub";var rG="And";var nG="EqualTo";var iG="LowerOrEqualTo";var oG="LowerThan";var sG="Not";var aG="Or";var cG="UpperOrEqualTo";var lG="UpperThan";var uG="ArithmeticExpression";var fG="BooleanExpression";var oC="UnaryArithmeticExpression";var dG="UnaryBooleanExpression";var pG="CallFunction";var sC="ControlRobot";var My="Entity";var mG="If";var hG="Loop";var yG="ReturnStatement";var gG="SetSpeed";var TG="VariableAssignation";var vG="CallEntity";var xG="CallFunctionExpr";var RG="GetSensor";var bG="Value";var aC="Movement";var cC="Rotate";var SG="Parameter";var lC="VariableStatement";var wG="Backward";var AG="Forward";var CG="Left";var kG="Right";var EG="Clock";var $G="ClockLeft";var Qc=class extends po{getAllTypes(){return["Add","And","ArithmeticExpression","ArithmeticOperator","Backward","BooleanExpression","BooleanOperator","CallEntity","CallFunction","CallFunctionExpr","Clock","ClockLeft","ControlRobot","Divise","Entity","EqualTo","Expression","Fonction","Forward","GetSensor","If","Left","Loop","LowerOrEqualTo","LowerThan","Movement","Multiply","Not","Or","Parameter","Program","ReturnStatement","ReturnType","Right","Rotate","SetSpeed","Statement","Sub","UnaryArithmeticExpression","UnaryBooleanExpression","UpperOrEqualTo","UpperThan","Value","VariableAssignation","VariableStatement"]}computeIsSubtype(e,r){switch(e){case Qq:case Zq:case eG:case tG:return this.isSubtype(zq,r);case rG:case nG:case iG:case oG:case sG:case aG:case cG:case lG:return this.isSubtype(Vq,r);case uG:case fG:case oC:case dG:return this.isSubtype(Xq,r);case wG:case AG:case CG:case kG:return this.isSubtype(aC,r);case vG:case xG:case RG:case bG:return this.isSubtype(oC,r);case pG:case sC:case My:case mG:case hG:case yG:case gG:case TG:return this.isSubtype(Jq,r);case EG:case $G:return this.isSubtype(cC,r);case aC:case cC:return this.isSubtype(sC,r);case SG:case lC:return this.isSubtype(My,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"CallEntity:entity":return My;case"CallFunction:fonction":case"CallFunctionExpr:fonction":return Yq;case"VariableAssignation:variable":return lC;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Fonction":return{name:"Fonction",mandatory:[{name:"body",type:"array"},{name:"parameter",type:"array"}]};case"Program":return{name:"Program",mandatory:[{name:"fonction",type:"array"}]};case"ArithmeticExpression":return{name:"ArithmeticExpression",mandatory:[{name:"operator",type:"array"},{name:"rightOperand",type:"array"}]};case"CallFunction":return{name:"CallFunction",mandatory:[{name:"args",type:"array"}]};case"If":return{name:"If",mandatory:[{name:"elseStatement",type:"array"},{name:"thenStatement",type:"array"}]};case"Loop":return{name:"Loop",mandatory:[{name:"body",type:"array"}]};case"CallFunctionExpr":return{name:"CallFunctionExpr",mandatory:[{name:"args",type:"array"}]};default:return{name:e,mandatory:[]}}}},Hce=new Qc;var Vd,uC=()=>Vd??(Vd=Tu(`{
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
                "$ref": "#/rules@56"
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
                "$ref": "#/rules@53"
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
                "$ref": "#/rules@38"
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
                "$ref": "#/rules@38"
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
                "$ref": "#/rules@49"
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
                "$ref": "#/rules@49"
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
                "$ref": "#/rules@49"
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
                "$ref": "#/rules@49"
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
                "$ref": "#/rules@53"
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
                "$ref": "#/rules@56"
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
                    "$ref": "#/rules@53"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
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
                "$ref": "#/rules@56"
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
                  "$ref": "#/rules@48"
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
                "$ref": "#/rules@49"
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
                  "$ref": "#/rules@48"
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
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
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
              "$ref": "#/rules@31"
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
                  "$ref": "#/rules@48"
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
              "$ref": "#/rules@48"
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
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "type": {
                  "$ref": "#/interfaces@27"
                }
              },
              {
                "$type": "Keyword",
                "value": "getTimestamp()"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "getDistance()"
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
      "name": "Value",
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
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
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
      "name": "ArithmeticExpression",
      "returnType": {
        "$ref": "#/interfaces@29"
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
                    "$ref": "#/rules@33"
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
        "$ref": "#/interfaces@30"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
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
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
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
        "$ref": "#/interfaces@31"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@31"
            }
          },
          {
            "$type": "Keyword",
            "value": "+"
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
      "name": "Sub",
      "returnType": {
        "$ref": "#/interfaces@32"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@32"
            }
          },
          {
            "$type": "Keyword",
            "value": "-"
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
      "name": "Multiply",
      "returnType": {
        "$ref": "#/interfaces@33"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@33"
            }
          },
          {
            "$type": "Keyword",
            "value": "*"
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
      "name": "Divise",
      "returnType": {
        "$ref": "#/interfaces@34"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@34"
            }
          },
          {
            "$type": "Keyword",
            "value": "/"
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
      "name": "BooleanExpression",
      "returnType": {
        "$ref": "#/interfaces@35"
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
                    "$ref": "#/rules@39"
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
                    "$ref": "#/rules@43"
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
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
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
              "$ref": "#/rules@45"
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
        "$ref": "#/interfaces@37"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@37"
            }
          },
          {
            "$type": "Keyword",
            "value": "<"
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
        "$ref": "#/interfaces@38"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@38"
            }
          },
          {
            "$type": "Keyword",
            "value": "=="
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
        "$ref": "#/interfaces@39"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@39"
            }
          },
          {
            "$type": "Keyword",
            "value": ">"
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
            "$type": "Keyword",
            "value": "NOT"
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
            "$type": "Keyword",
            "value": "OR"
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
            "$type": "Keyword",
            "value": "AND"
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
            "$type": "Keyword",
            "value": "<="
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
            "$type": "Keyword",
            "value": ">="
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
              "$ref": "#/rules@58"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
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
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
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
              "$ref": "#/interfaces@35"
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
              "$ref": "#/interfaces@35"
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
      "name": "UnaryBooleanExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@22"
        }
      ],
      "attributes": []
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
      "name": "Value",
      "superTypes": [
        {
          "$ref": "#/interfaces@24"
        }
      ],
      "attributes": []
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
                "$ref": "#/interfaces@30"
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
      "name": "Add",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Sub",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Multiply",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Divise",
      "superTypes": [
        {
          "$ref": "#/interfaces@30"
        }
      ],
      "attributes": []
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
              "$ref": "#/interfaces@36"
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
      "name": "LowerThan",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "EqualTo",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "UpperThan",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Not",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Or",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "And",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "LowerOrEqualTo",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "UpperOrEqualTo",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ],
      "attributes": []
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
}`));var NG={languageId:"my-robot",fileExtensions:[".rob"],caseInsensitive:!1},fC={AstReflection:()=>new Qc},dC={Grammar:()=>uC(),LanguageMetaData:()=>NG,parser:{}};function pC(t){let e=t.validation.ValidationRegistry,r=t.validation.MyRobotValidator,n={Program:[r.checkUniqueFonctionDefs,r.checkUniqueVariableDeclarations,r.checkUniqueFonctionReturnStatements],If:[r.checkUniqueControlStructureReturnStatements],Loop:[r.checkUniqueControlStructureReturnStatements]};e.register(n,r)}var Xd=class{checkUniqueFonctionDefs(e,r){let n=new Set;e.fonction.forEach(i=>{n.has(i.name)&&r("error",`Function has non-unique name '${i.name}'.`,{node:i,property:"name"}),n.add(i.name)})}checkUniqueVariableDeclarations(e,r){e.fonction.forEach(n=>{let i=new Set;n.body.forEach(o=>{if(o.$type==="VariableStatement"){var s=o;i.has(s.name)&&r("error",`Variable has non-unique name '${s.name}'.`,{node:s,property:"name"}),i.add(s.name)}})})}checkUniqueFonctionReturnStatements(e,r){let n=0;e.fonction.forEach(i=>{i.body.forEach(o=>{o.$type==="ReturnStatement"&&(n++,n>1&&r("error",`Function '${i.name}' has multiple return statements in one block.`,{node:o}))})})}checkUniqueControlStructureReturnStatements(e,r){let n=0;e.$type==="If"?(e.thenStatement.forEach(i=>{i.$type==="ReturnStatement"&&(n++,n>1&&r("error","If statement has multiple return statements in one block.",{node:i}))}),e.elseStatement&&e.elseStatement.forEach(i=>{i.$type==="ReturnStatement"&&(n++,n>1&&r("error","Else statement has multiple return statements in one block.",{node:i}))})):e.$type==="Loop"&&e.body.forEach(i=>{i.$type==="ReturnStatement"&&(n++,n>1&&r("error","Loop statement has multiple return statements in one block.",{node:i}))})}};function mC(t){let e=t.validation.ValidationRegistry,r=t.validation.MyRobotAcceptWeaver;e.register(r.checks,r)}var Yd=class{constructor(){this.checks={Program:this.weaveProgram,Fonction:this.weaveFonction,ReturnType:this.weaveReturnType,Statement:this.weaveStatement,ReturnStatement:this.weaveReturnStatement,If:this.weaveIf,Loop:this.weaveLoop,ControlRobot:this.weaveControlRobot,Movement:this.weaveMovement,Backward:this.weaveBackward,Forward:this.weaveForward,Left:this.weaveLeft,Right:this.weaveRight,Rotate:this.weaveRotate,Clock:this.weaveClock,ClockLeft:this.weaveClockLeft,Entity:this.weaveEntity,Parameter:this.weaveParameter,VariableStatement:this.weaveVariableStatement,VariableAssignation:this.weaveVariableAssignation,SetSpeed:this.weaveSetSpeed,CallFunction:this.weaveCallFunction,Expression:this.weaveExpression,UnaryBooleanExpression:this.weaveUnaryBooleanExpression,UnaryArithmeticExpression:this.weaveUnaryArithmeticExpression,CallFunctionExpr:this.weaveCallFunctionExpr,CallEntity:this.weaveCallEntity,GetSensor:this.weaveGetSensor,Value:this.weaveValue,ArithmeticExpression:this.weaveArithmeticExpression,ArithmeticOperator:this.weaveArithmeticOperator,Add:this.weaveAdd,Sub:this.weaveSub,Multiply:this.weaveMultiply,Divise:this.weaveDivise,BooleanExpression:this.weaveBooleanExpression,BooleanOperator:this.weaveBooleanOperator,LowerThan:this.weaveLowerThan,EqualTo:this.weaveEqualTo,UpperThan:this.weaveUpperThan,Not:this.weaveNot,Or:this.weaveOr,LowerOrEqualTo:this.weaveLowerOrEqualTo,UpperOrEqualTo:this.weaveUpperOrEqualTo,And:this.weaveAnd}}weaveProgram(e,r){e.accept=n=>n.visitProgram(e)}weaveFonction(e,r){e.accept=n=>n.visitFonction(e)}weaveReturnType(e,r){e.accept=n=>n.visitReturnType(e)}weaveStatement(e,r){e.accept=n=>n.visitStatement(e)}weaveReturnStatement(e,r){e.accept=n=>n.visitReturnStatement(e)}weaveIf(e,r){e.accept=n=>n.visitIf(e)}weaveLoop(e,r){e.accept=n=>n.visitLoop(e)}weaveControlRobot(e,r){e.accept=n=>n.visitControlRobot(e)}weaveMovement(e,r){e.accept=n=>n.visitMovement(e)}weaveBackward(e,r){e.accept=n=>n.visitBackward(e)}weaveForward(e,r){e.accept=n=>n.visitForward(e)}weaveLeft(e,r){e.accept=n=>n.visitLeft(e)}weaveRight(e,r){e.accept=n=>n.visitRight(e)}weaveRotate(e,r){e.accept=n=>n.visitRotate(e)}weaveClock(e,r){e.accept=n=>n.visitClock(e)}weaveClockLeft(e,r){e.accept=n=>n.visitClockLeft(e)}weaveEntity(e,r){e.accept=n=>n.visitEntity(e)}weaveParameter(e,r){e.accept=n=>n.visitParameter(e)}weaveVariableStatement(e,r){e.accept=n=>n.visitVariableStatement(e)}weaveVariableAssignation(e,r){e.accept=n=>n.visitVariableAssignation(e)}weaveSetSpeed(e,r){e.accept=n=>n.visitSetSpeed(e)}weaveCallFunction(e,r){e.accept=n=>n.visitCallFunction(e)}weaveExpression(e,r){e.accept=n=>n.visitExpression(e)}weaveUnaryBooleanExpression(e,r){e.accept=n=>n.visitUnaryBooleanExpression(e)}weaveUnaryArithmeticExpression(e,r){e.accept=n=>n.visitUnaryArithmeticExpression(e)}weaveCallFunctionExpr(e,r){e.accept=n=>n.visitCallFunctionExpr(e)}weaveCallEntity(e,r){e.accept=n=>n.visitCallEntity(e)}weaveGetSensor(e,r){e.accept=n=>n.visitGetSensor(e)}weaveValue(e,r){e.accept=n=>n.visitValue(e)}weaveArithmeticExpression(e,r){e.accept=n=>n.visitArithmeticExpression(e)}weaveArithmeticOperator(e,r){e.accept=n=>n.visitArithmeticOperator(e)}weaveAdd(e,r){e.accept=n=>n.visitAdd(e)}weaveSub(e,r){e.accept=n=>n.visitSub(e)}weaveMultiply(e,r){e.accept=n=>n.visitMultiply(e)}weaveDivise(e,r){e.accept=n=>n.visitDivise(e)}weaveBooleanExpression(e,r){e.accept=n=>n.visitBooleanExpression(e)}weaveBooleanOperator(e,r){e.accept=n=>n.visitBooleanOperator(e)}weaveLowerThan(e,r){e.accept=n=>n.visitLowerThan(e)}weaveEqualTo(e,r){e.accept=n=>n.visitEqualTo(e)}weaveUpperThan(e,r){e.accept=n=>n.visitUpperThan(e)}weaveNot(e,r){e.accept=n=>n.visitNot(e)}weaveOr(e,r){e.accept=n=>n.visitOr(e)}weaveLowerOrEqualTo(e,r){e.accept=n=>n.visitLowerOrEqualTo(e)}weaveUpperOrEqualTo(e,r){e.accept=n=>n.visitUpperOrEqualTo(e)}weaveAnd(e,r){e.accept=n=>n.visitAnd(e)}};function ur(t,e){switch(t.$type){case"Program":return t.accept(e);case"Fonction":return t.accept(e);case"ReturnType":return t.accept(e);case"Statement":return t.accept(e);case"ReturnStatement":return t.accept(e);case"If":return t.accept(e);case"Loop":return t.accept(e);case"ControlRobot":return t.accept(e);case"Movement":return t.accept(e);case"Backward":return t.accept(e);case"Forward":return t.accept(e);case"Left":return t.accept(e);case"Right":return t.accept(e);case"Rotate":return t.accept(e);case"Clock":return t.accept(e);case"ClockLeft":return t.accept(e);case"Entity":return t.accept(e);case"Parameter":return t.accept(e);case"VariableStatement":return t.accept(e);case"VariableAssignation":return t.accept(e);case"SetSpeed":return t.accept(e);case"CallFunction":return t.accept(e);case"Expression":return t.accept(e);case"UnaryBooleanExpression":return t.accept(e);case"UnaryArithmeticExpression":return t.accept(e);case"CallFunctionExpr":return t.accept(e);case"CallEntity":return t.accept(e);case"GetSensor":return t.accept(e);case"Value":return t.accept(e);case"ArithmeticExpression":return t.accept(e);case"ArithmeticOperator":return t.accept(e);case"Add":return t.accept(e);case"Sub":return t.accept(e);case"Multiply":return t.accept(e);case"Divise":return t.accept(e);case"BooleanExpression":return t.accept(e);case"BooleanOperator":return t.accept(e);case"LowerThan":return t.accept(e);case"EqualTo":return t.accept(e);case"UpperThan":return t.accept(e);case"Not":return t.accept(e);case"Or":return t.accept(e);case"LowerOrEqualTo":return t.accept(e);case"UpperOrEqualTo":return t.accept(e);case"And":return t.accept(e);default:throw new Error(`Unknown node type: ${t.$type}`)}}var Rn=class t{static fromAngle(e,r){return new t(Math.cos(e)*r,Math.sin(e)*r)}static null(){return new t(0,0)}constructor(e,r){this.x=e,this.y=r}plus(e){return new t(this.x+e.x,this.y+e.y)}minus(e){return new t(this.x-e.x,this.y-e.y)}scale(e){return new t(this.x*e,this.y*e)}projX(){return new t(this.x,0)}projY(){return new t(0,this.y)}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}},Jd=class{constructor(e,r){this.origin=e,this.vector=r}intersect(e){let r=[];for(var n=0;n<e.length;n++){let o=e[n].intersect(this);console.log(o),r=r.concat(o)}return this.findClosestIntersection(r)}findClosestIntersection(e){let r=0,n=1/0;if(e.length>0){for(var i=0;i<e.length;i++){let o=this.origin.minus(e[i]).norm();o<n&&(n=o,r=i)}return e[r]}else return}getPoiFinder(){return(e,r)=>{let n=e.minus(r),i=this.vector,o=n.x*i.y-i.x*n.y;if(o!=0){let s=e.minus(this.origin),a=s.x*i.y-i.x*s.y,c=n.x*s.y-s.x*n.y,l=a/o,u=-c/o;if(l>0&&l<1&&u>0)return e.plus(n.scale(-l))}}}};var Zc=class{constructor(e,r,n,i,o){this.type="Robot",this.pos=e,this.size=r,this.rad=n*Math.PI/180,this.speed=i,this.scene=o}intersect(e){return[]}turn(e){this.rad+=e*Math.PI/180;let r=e/this.speed*1e3;this.scene.time+=r,this.scene.timestamps.push(new Fo(this.scene.time,this))}move(e){let r=Math.cos(this.rad)*e,n=Math.sin(this.rad)*e;this.pos.x+=r,this.pos.y+=n;let i=e/this.speed*1e3;this.scene.time+=i,this.scene.timestamps.push(new Fo(this.scene.time,this))}side(e){let r=this.rad-Math.PI/2,n=Math.cos(r)*e,i=Math.sin(r)*e;this.pos.x+=n,this.pos.y+=i;let o=e/this.speed*1e3;this.scene.time+=o,this.scene.timestamps.push(new Fo(this.scene.time,this))}getRay(){return new Jd(this.pos,Rn.fromAngle(this.rad,1e4).scale(-1))}},Fo=class extends Zc{constructor(e,r){super(r.pos.scale(1),r.size.scale(1),r.rad,r.speed,r.scene),this.rad=r.rad,this.time=e}};var Uo=class{constructor(e,r){this.type="Wall",this.pos=e,this.size=r}intersect(e){let r=e.getPoiFinder()(this.pos,this.size);return r?[r]:[]}};var el=class{constructor(e=new Rn(1e4,1e4)){this.entities=[],this.time=0,this.timestamps=[],this.size=e,this.robot=new Zc(this.size.scale(.5),new Rn(250,250),0,30,this),this.entities.push(new Uo(Rn.null(),this.size.projX())),this.entities.push(new Uo(Rn.null(),this.size.projY())),this.entities.push(new Uo(this.size,this.size.projY())),this.entities.push(new Uo(this.size,this.size.projX())),this.timestamps.push(new Fo(0,this.robot))}};var qo={variables:{},functions:{},currentScene:null},Qd=class{constructor(e,r){e&&r?this.scene=new el(new Rn(e*10,r*10)):this.scene=new el,this.robot=this.scene.robot,qo.currentScene=this.scene}visitProgram(e){let r=e.fonction.find(n=>n.name==="entry");if(!r)throw new Error("La fonction 'entry' doit \xEAtre d\xE9finie.");return this.visitFonction(r)}visitFonction(e){if(!e.body||e.body.length===0)throw new Error(`La fonction '${e.name}' n'a pas de corps d\xE9fini.`);console.log(`Ex\xE9cution de la fonction : ${e.name}`);let r=Object.assign({},qo.variables);for(let n of e.body)ur(n,this);qo.variables=r,console.log(`Fin de l'ex\xE9cution de la fonction : ${e.name}`)}visitReturnType(e){if(!e.returnType)throw new Error("Le type de retour attendu pour la fonction n'est pas d\xE9fini.");let r=ur(e,this);if(typeof r!==e.returnType)throw new Error(`Type de retour incorrect : attendu '${e.returnType}', obtenu '${typeof r}'.`);return console.log(`Type de retour valide : '${e.returnType}'.`),r}visitStatement(e){}visitReturnStatement(e){}visitIf(e){if(Array.isArray(e.condition))e.condition.forEach(r=>{if(typeof ur(r,this)!="boolean")throw new Error("Chaque condition doit \xEAtre une expression bool\xE9enne.")});else{let r=ur(e.condition,this);if(typeof r!="boolean")throw new Error("La condition de l'instruction 'if' doit \xEAtre une expression bool\xE9enne.");if(r)for(let n of e.thenStatement)ur(n,this);else if(e.elseStatement)for(let n of e.elseStatement)ur(n,this)}}visitLoop(e){let r=!1;if(Array.isArray(e.condition))e.condition.forEach(n=>{let i=ur(n,this);if(typeof i!="boolean")throw new Error("Chaque condition dans la boucle doit \xEAtre une expression bool\xE9enne.");r=r||i});else if(r=ur(e.condition,this),typeof r!="boolean")throw new Error("La condition de la boucle doit \xEAtre une expression bool\xE9enne.");for(;r;){for(let n of e.body)ur(n,this);if(Array.isArray(e.condition))r=!1,e.condition.forEach(n=>{let i=ur(n,this);if(typeof i!="boolean")throw new Error("Chaque condition dans la boucle doit \xEAtre une expression bool\xE9enne.");r=r||i});else if(r=ur(e.condition,this),typeof r!="boolean")throw new Error("La condition de la boucle doit \xEAtre une expression bool\xE9enne.")}}visitControlRobot(e){}visitMovement(e){var r;let n=(r=qo.currentScene)===null||r===void 0?void 0:r.robot;if(!n)throw new Error("Aucun robot trouv\xE9 pour effectuer le mouvement.");e.distance&&n.move(ur(e.distance,this))}visitBackward(e){var r;let n=(r=qo.currentScene)===null||r===void 0?void 0:r.robot;if(!n)throw new Error("Aucun robot trouv\xE9 pour effectuer le mouvement arri\xE8re.");e.distance&&n.move(ur(e.distance,this))}visitForward(e){this.visitMovement(e)}visitLeft(e){var r;let n=(r=qo.currentScene)===null||r===void 0?void 0:r.robot;if(!n)throw new Error("Aucun robot rencontr\xE9 pour effectuer le mouvement gauche.");e.distance&&n.side(-ur(e.distance,this))}visitRight(e){var r;let n=(r=qo.currentScene)===null||r===void 0?void 0:r.robot;if(!n)throw new Error("Aucun robot rencontr\xE9 pour effectuer le mouvement droit.");e.distance&&n.side(ur(e.distance,this))}visitRotate(e){}visitClock(e){}visitClockLeft(e){}visitEntity(e){}visitParameter(e){}visitVariableStatement(e){}visitVariableAssignation(e){}visitSetSpeed(e){}visitCallFunction(e){}visitExpression(e){}visitUnaryBooleanExpression(e){}visitUnaryArithmeticExpression(e){}visitCallFunctionExpr(e){}visitCallEntity(e){}visitGetSensor(e){}visitValue(e){}visitArithmeticExpression(e){}visitArithmeticOperator(e){}visitAdd(e){}visitSub(e){}visitMultiply(e){}visitDivise(e){}visitBooleanExpression(e){}visitBooleanOperator(e){}visitLowerThan(e){}visitEqualTo(e){}visitUpperThan(e){}visitNot(e){}visitOr(e){}visitLowerOrEqualTo(e){}visitUpperOrEqualTo(e){}visitAnd(e){}};function hC(t,e,r){let n=new Qd(e,r);return t.accept(n)}var yC=(t=0)=>e=>`\x1B[${e+t}m`,gC=(t=0)=>e=>`\x1B[${38+t};5;${e}m`,TC=(t=0)=>(e,r,n)=>`\x1B[${38+t};2;${e};${r};${n}m`,nt={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},lle=Object.keys(nt.modifier),IG=Object.keys(nt.color),PG=Object.keys(nt.bgColor),ule=[...IG,...PG];function OG(){let t=new Map;for(let[e,r]of Object.entries(nt)){for(let[n,i]of Object.entries(r))nt[n]={open:`\x1B[${i[0]}m`,close:`\x1B[${i[1]}m`},r[n]=nt[n],t.set(i[0],i[1]);Object.defineProperty(nt,e,{value:r,enumerable:!1})}return Object.defineProperty(nt,"codes",{value:t,enumerable:!1}),nt.color.close="\x1B[39m",nt.bgColor.close="\x1B[49m",nt.color.ansi=yC(),nt.color.ansi256=gC(),nt.color.ansi16m=TC(),nt.bgColor.ansi=yC(10),nt.bgColor.ansi256=gC(10),nt.bgColor.ansi16m=TC(10),Object.defineProperties(nt,{rgbToAnsi256:{value(e,r,n){return e===r&&r===n?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(n/255*5)},enumerable:!1},hexToRgb:{value(e){let r=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!r)return[0,0,0];let[n]=r;n.length===3&&(n=[...n].map(o=>o+o).join(""));let i=Number.parseInt(n,16);return[i>>16&255,i>>8&255,i&255]},enumerable:!1},hexToAnsi256:{value:e=>nt.rgbToAnsi256(...nt.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){if(e<8)return 30+e;if(e<16)return 90+(e-8);let r,n,i;if(e>=232)r=((e-232)*10+8)/255,n=r,i=r;else{e-=16;let a=e%36;r=Math.floor(e/36)/5,n=Math.floor(a/6)/5,i=a%6/5}let o=Math.max(r,n,i)*2;if(o===0)return 30;let s=30+(Math.round(i)<<2|Math.round(n)<<1|Math.round(r));return o===2&&(s+=60),s},enumerable:!1},rgbToAnsi:{value:(e,r,n)=>nt.ansi256ToAnsi(nt.rgbToAnsi256(e,r,n)),enumerable:!1},hexToAnsi:{value:e=>nt.ansi256ToAnsi(nt.hexToAnsi256(e)),enumerable:!1}}),nt}var DG=OG(),bn=DG;var Zd=(()=>{if(navigator.userAgentData){let t=navigator.userAgentData.brands.find(({brand:e})=>e==="Chromium");if(t&&t.version>93)return 3}return/\b(Chrome|Chromium)\//.test(navigator.userAgent)?1:0})(),vC=Zd!==0&&{level:Zd,hasBasic:!0,has256:Zd>=2,has16m:Zd>=3},LG={stdout:vC,stderr:vC},xC=LG;function RC(t,e,r){let n=t.indexOf(e);if(n===-1)return t;let i=e.length,o=0,s="";do s+=t.slice(o,n)+e+r,o=n+i,n=t.indexOf(e,o);while(n!==-1);return s+=t.slice(o),s}function bC(t,e,r,n){let i=0,o="";do{let s=t[n-1]==="\r";o+=t.slice(i,s?n-1:n)+e+(s?`\r
`:`
`)+r,i=n+1,n=t.indexOf(`
`,i)}while(n!==-1);return o+=t.slice(i),o}var{stdout:SC,stderr:wC}=xC,Fy=Symbol("GENERATOR"),Sa=Symbol("STYLER"),tl=Symbol("IS_EMPTY"),AC=["ansi","ansi","ansi256","ansi16m"],wa=Object.create(null),MG=(t,e={})=>{if(e.level&&!(Number.isInteger(e.level)&&e.level>=0&&e.level<=3))throw new Error("The `level` option should be an integer from 0 to 3");let r=SC?SC.level:0;t.level=e.level===void 0?r:e.level};var FG=t=>{let e=(...r)=>r.join(" ");return MG(e,t),Object.setPrototypeOf(e,rl.prototype),e};function rl(t){return FG(t)}Object.setPrototypeOf(rl.prototype,Function.prototype);for(let[t,e]of Object.entries(bn))wa[t]={get(){let r=ep(this,qy(e.open,e.close,this[Sa]),this[tl]);return Object.defineProperty(this,t,{value:r}),r}};wa.visible={get(){let t=ep(this,this[Sa],!0);return Object.defineProperty(this,"visible",{value:t}),t}};var Uy=(t,e,r,...n)=>t==="rgb"?e==="ansi16m"?bn[r].ansi16m(...n):e==="ansi256"?bn[r].ansi256(bn.rgbToAnsi256(...n)):bn[r].ansi(bn.rgbToAnsi(...n)):t==="hex"?Uy("rgb",e,r,...bn.hexToRgb(...n)):bn[r][t](...n),UG=["rgb","hex","ansi256"];for(let t of UG){wa[t]={get(){let{level:r}=this;return function(...n){let i=qy(Uy(t,AC[r],"color",...n),bn.color.close,this[Sa]);return ep(this,i,this[tl])}}};let e="bg"+t[0].toUpperCase()+t.slice(1);wa[e]={get(){let{level:r}=this;return function(...n){let i=qy(Uy(t,AC[r],"bgColor",...n),bn.bgColor.close,this[Sa]);return ep(this,i,this[tl])}}}}var qG=Object.defineProperties(()=>{},{...wa,level:{enumerable:!0,get(){return this[Fy].level},set(t){this[Fy].level=t}}}),qy=(t,e,r)=>{let n,i;return r===void 0?(n=t,i=e):(n=r.openAll+t,i=e+r.closeAll),{open:t,close:e,openAll:n,closeAll:i,parent:r}},ep=(t,e,r)=>{let n=(...i)=>GG(n,i.length===1?""+i[0]:i.join(" "));return Object.setPrototypeOf(n,qG),n[Fy]=t,n[Sa]=e,n[tl]=r,n},GG=(t,e)=>{if(t.level<=0||!e)return t[tl]?"":e;let r=t[Sa];if(r===void 0)return e;let{openAll:n,closeAll:i}=r;if(e.includes("\x1B"))for(;r!==void 0;)e=RC(e,r.close,r.open),r=r.parent;let o=e.indexOf(`
`);return o!==-1&&(e=bC(e,i,n,o)),n+e+i};Object.defineProperties(rl.prototype,wa);var jG=rl(),gle=rl({level:wC?wC.level:0});var Aa=jG;async function HG(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,yu.parse("memory://minilogo.document"));return await e.shared.workspace.DocumentBuilder.build([n],{validation:!0}),(r=n.parseResult)===null||r===void 0?void 0:r.value}async function CC(t,e){var r;let n=e.shared.workspace.LangiumDocumentFactory.fromString(t,yu.parse("memory://minilogo.document"));await e.shared.workspace.DocumentBuilder.build([n],{validation:!0});let i=((r=n.diagnostics)!==null&&r!==void 0?r:[]).filter(o=>o.severity===1);if(i.length>0){let o=i.map(s=>`line ${s.range.start.line+1}: ${s.message} [${n.textDocument.getText(s.range)}]`);throw console.error(Aa.red("There are validation errors:")),o.forEach(s=>console.error(Aa.red(s))),new Error(o.join(`
`))}return n}async function kC(t){let e=t[0],r=t[1],n=t[2],i=nl(ko).MyRobot,o=await HG(e,i),s=hC(o,r,n);return Promise.resolve(s)}var EC=async t=>{let e=nl(ko).MyRobot;try{await CC(t,e);let n=(await CC(t,e)).parseResult;if(n.lexerErrors.length===0&&n.parserErrors.length===0)return console.log(Aa.green("Parsed and validated successfully!")),[];{let i=[];if(n.lexerErrors.length>0){let o=n.lexerErrors.map(s=>`${s.line?"line "+s.line+1:""}: ${s.message}`);i=i.concat(o)}if(n.parserErrors.length>0){let o=n.parserErrors.map(s=>`${s.message}`);i=i.concat(o)}return console.log(Aa.red("Failed to parse and validate!")),i}}catch(r){return console.log(Aa.red("Failed to parse and validate!")),r.message.split(`
`)}};var KG={validation:{MyRobotValidator:()=>new Xd,MyRobotAcceptWeaver:()=>new Yd}};function nl(t){let e=ho(bc(t),fC),r=ho(Rc({shared:e}),dC,KG);return e.lsp.ExecuteCommandHandler=new Gy,e.ServiceRegistry.register(r),pC(r),mC(r),{shared:e,MyRobot:r}}var Gy=class extends Wu{registerCommands(e){e("parseAndGenerate",r=>kC(r[0])),e("parseAndValidate",r=>EC(r[0]))}};var BG=new Ca.BrowserMessageReader(self),WG=new Ca.BrowserMessageWriter(self),zG=(0,Ca.createConnection)(BG,WG),{shared:VG}=nl(Object.assign({connection:zG},ko));rR(VG);})();
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
