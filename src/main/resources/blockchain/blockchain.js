!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";e.exports=n(1)},function(e,t,n){"use strict";
/** @license React v16.5.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(2),o="function"==typeof Symbol&&Symbol.for,a=o?Symbol.for("react.element"):60103,l=o?Symbol.for("react.portal"):60106,i=o?Symbol.for("react.fragment"):60107,c=o?Symbol.for("react.strict_mode"):60108,s=o?Symbol.for("react.profiler"):60114,u=o?Symbol.for("react.provider"):60109,d=o?Symbol.for("react.context"):60110,f=o?Symbol.for("react.async_mode"):60111,h=o?Symbol.for("react.forward_ref"):60112;o&&Symbol.for("react.placeholder");var p="function"==typeof Symbol&&Symbol.iterator;function m(e){for(var t=arguments.length-1,n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=0;r<t;r++)n+="&args[]="+encodeURIComponent(arguments[r+1]);!function(e,t,n,r,o,a,l,i){if(!e){if(e=void 0,void 0===t)e=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var c=[n,r,o,a,l,i],s=0;(e=Error(t.replace(/%s/g,function(){return c[s++]}))).name="Invariant Violation"}throw e.framesToPop=1,e}}(!1,"Minified React error #"+e+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",n)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},b={};function v(e,t,n){this.props=e,this.context=t,this.refs=b,this.updater=n||y}function k(){}function g(e,t,n){this.props=e,this.context=t,this.refs=b,this.updater=n||y}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&m("85"),this.updater.enqueueSetState(this,e,t,"setState")},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},k.prototype=v.prototype;var E=g.prototype=new k;E.constructor=g,r(E,v.prototype),E.isPureReactComponent=!0;var S={current:null,currentDispatcher:null},C=Object.prototype.hasOwnProperty,O={key:!0,ref:!0,__self:!0,__source:!0};function x(e,t,n){var r=void 0,o={},l=null,i=null;if(null!=t)for(r in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(l=""+t.key),t)C.call(t,r)&&!O.hasOwnProperty(r)&&(o[r]=t[r]);var c=arguments.length-2;if(1===c)o.children=n;else if(1<c){for(var s=Array(c),u=0;u<c;u++)s[u]=arguments[u+2];o.children=s}if(e&&e.defaultProps)for(r in c=e.defaultProps)void 0===o[r]&&(o[r]=c[r]);return{$$typeof:a,type:e,key:l,ref:i,props:o,_owner:S.current}}function j(e){return"object"==typeof e&&null!==e&&e.$$typeof===a}var _=/\/+/g,w=[];function B(e,t,n,r){if(w.length){var o=w.pop();return o.result=e,o.keyPrefix=t,o.func=n,o.context=r,o.count=0,o}return{result:e,keyPrefix:t,func:n,context:r,count:0}}function P(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>w.length&&w.push(e)}function I(e,t,n){return null==e?0:function e(t,n,r,o){var i=typeof t;"undefined"!==i&&"boolean"!==i||(t=null);var c=!1;if(null===t)c=!0;else switch(i){case"string":case"number":c=!0;break;case"object":switch(t.$$typeof){case a:case l:c=!0}}if(c)return r(o,t,""===n?"."+N(t,0):n),1;if(c=0,n=""===n?".":n+":",Array.isArray(t))for(var s=0;s<t.length;s++){var u=n+N(i=t[s],s);c+=e(i,u,r,o)}else if(u=null===t||"object"!=typeof t?null:"function"==typeof(u=p&&t[p]||t["@@iterator"])?u:null,"function"==typeof u)for(t=u.call(t),s=0;!(i=t.next()).done;)c+=e(i=i.value,u=n+N(i,s++),r,o);else"object"===i&&m("31","[object Object]"==(r=""+t)?"object with keys {"+Object.keys(t).join(", ")+"}":r,"");return c}(e,"",t,n)}function N(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}(e.key):t.toString(36)}function $(e,t){e.func.call(e.context,t,e.count++)}function A(e,t,n){var r=e.result,o=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?M(e,r,n,function(e){return e}):null!=e&&(j(e)&&(e=function(e,t){return{$$typeof:a,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(e,o+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(_,"$&/")+"/")+n)),r.push(e))}function M(e,t,n,r,o){var a="";null!=n&&(a=(""+n).replace(_,"$&/")+"/"),I(e,A,t=B(t,a,r,o)),P(t)}var T={Children:{map:function(e,t,n){if(null==e)return e;var r=[];return M(e,r,null,t,n),r},forEach:function(e,t,n){if(null==e)return e;I(e,$,t=B(null,null,t,n)),P(t)},count:function(e){return I(e,function(){return null},null)},toArray:function(e){var t=[];return M(e,t,null,function(e){return e}),t},only:function(e){return j(e)||m("143"),e}},createRef:function(){return{current:null}},Component:v,PureComponent:g,createContext:function(e,t){return void 0===t&&(t=null),(e={$$typeof:d,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,Provider:null,Consumer:null,unstable_read:null}).Provider={$$typeof:u,_context:e},e.Consumer=e,e.unstable_read=function(e,t){var n=S.currentDispatcher;return null===n&&m("277"),n.readContext(e,t)}.bind(null,e),e},forwardRef:function(e){return{$$typeof:h,render:e}},Fragment:i,StrictMode:c,unstable_AsyncMode:f,unstable_Profiler:s,createElement:x,cloneElement:function(e,t,n){(null===e||void 0===e)&&m("267",e);var o=void 0,l=r({},e.props),i=e.key,c=e.ref,s=e._owner;if(null!=t){void 0!==t.ref&&(c=t.ref,s=S.current),void 0!==t.key&&(i=""+t.key);var u=void 0;for(o in e.type&&e.type.defaultProps&&(u=e.type.defaultProps),t)C.call(t,o)&&!O.hasOwnProperty(o)&&(l[o]=void 0===t[o]&&void 0!==u?u[o]:t[o])}if(1===(o=arguments.length-2))l.children=n;else if(1<o){u=Array(o);for(var d=0;d<o;d++)u[d]=arguments[d+2];l.children=u}return{$$typeof:a,type:e.type,key:i,ref:c,props:l,_owner:s}},createFactory:function(e){var t=x.bind(null,e);return t.type=e,t},isValidElement:j,version:"16.5.2",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:S,assign:r}},R={default:T},W=R&&T||R;e.exports=W.default||W},function(e,t,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(e){r[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,l,i=function(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}(e),c=1;c<arguments.length;c++){for(var s in n=Object(arguments[c]))o.call(n,s)&&(i[s]=n[s]);if(r){l=r(n);for(var u=0;u<l.length;u++)a.call(n,l[u])&&(i[l[u]]=n[l[u]])}}return i}},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r);const a=e=>e,l=e=>{if(0===Object.keys(e).length||"0"===Object.keys(e)[0])return e;const t={};return Object.keys(e).sort().forEach(function(n){t[n]=l(e[n])}),t},i=e=>{const t=l(JSON.parse(e));console.log(t);let n=JSON.stringify(t);var r,o=0;if(0===n.length)return o;for(r=0;r<n.length;r++)o=(o<<5)-o+n.charCodeAt(r),o|=0;return o};class c extends o.a.Component{constructor(e){super(e)}render(){const e="transaction"+(this.props.selected?" selected":""),t=a(this.props.tx.id)+" "+this.props.tx.user+":"+this.props.tx.x+"/"+this.props.tx.y;return o.a.createElement("label",{onClick:this.props.handler,className:e},t)}}class s extends o.a.Component{render(){const e=this.props.block,t=this.props.branch-1,n="block"+(this.props.selected?" selected":"")+(this.props.inChain?" inChain":""),r={marginLeft:3*t+"em"};return o.a.createElement("div",{className:n,style:r,onClick:this.props.handler},o.a.createElement("div",null,"Block: ",a(e.id)," from ",a(e.parentId)),o.a.createElement("div",{className:"blockTransaction"},e.transactions.map(e=>o.a.createElement("div",{key:"tx_"+e.id},o.a.createElement(c,{tx:e})))))}}class u extends o.a.Component{constructor(e){super(e),this.state={isLoaded:!1,proofOfWork:0,blocks:[],transactions:[],selectedBlock:void 0},this.handleChange=this.handleChange.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}handleChange(e){}handleProofOfWorkChange(e){this.setState({proofOfWork:e.target.value})}componentDidMount(){this.loadBlockchain()}loadBlockchain(){fetch("/bc/view").then(e=>e.json()).then(e=>{const t=this.buildBlocksMap(e.blocks);this.setState({isLoaded:!0,blocks:e.blocks.reverse(),blocksMap:t,transactions:e.transactions,checkedElements:new Set,selectedBlock:this.getHeadBlock(e.blocks,t)})})}buildBlocksMap(e){const t={};return e.forEach(function(e){t[e.id]=e}),t}buildResponse(){var e={proofOfWork:this.state.proofOfWork,parentId:this.state.selectedBlock,transactions:[]},t=this.state.checkedElements;return this.state.transactions.forEach(function(n){t.has(n.id)&&(console.log("Push:"+n.id),e.transactions.push(n))}),e}handleSubmit(e){e.preventDefault();var t=this.buildResponse();if(console.log(t),!t.parentId)return void alert("Select parent block !");const n=JSON.stringify(t);0==parseInt(i(n))%2?(fetch("/bc/validate",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:n}),this.loadBlockchain()):alert("Try again !")}handleCheckedChange(e){var t=e.target.name;e.target.checked?this.state.checkedElements.add(t):this.state.checkedElements.delete(t)}isValidate(e){this.state.checkedElements;return this.state.checkedElements.has(e)}handlerTransactionSelection(e,t){var n=this.state.checkedElements;this.state.checkedElements.has(e)?n.delete(e):n.add(e),this.setState({checkedElements:n})}handlerBlockSelection(e,t){console.log("click:"+e),this.setState({selectedBlock:e})}blockBranch(e){return 1}transactionsNotInABlock(){const e=this.state.blocksMap;let t=this.getBlockInSelectedChain(),n=new Set;t.forEach(function(t){let r=e[t];console.log(r),r.transactions.forEach(function(e){n.add(e.id)})});let r=[];return this.state.transactions.forEach(function(e){n.has(e.id)||r.push(e)}),r}getHeadBlock(e=this.state.blocks,t=this.state.blocksMap){let n=new Set;e.forEach(function(e){n.add(e.parentId)});let r=[],o=this.getBlockInChain;e.forEach(function(e){n.has(e.id)||r.push([e.id,o(e.id,t).size])});let a,l=0;return r.forEach(function(e){e[1]>l&&(l=e[1],a=e[0])}),a}getBlockInSelectedChain(){return this.getBlockInChain(this.state.selectedBlock,this.state.blocksMap)}getBlockInChain(e,t){let n=t[""+e],r=new Set;for(;n&&0!=n.id;)r.add(n.id),n=t[n.parentId];return r}isBlockInSelectedChain(e){return this.getBlockInSelectedChain().has(e.id)}render(){const{isLoaded:e,blocks:t,transactions:n}=this.state;return e?o.a.createElement("div",null,o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("div",null,o.a.createElement("label",{width:"100%"},"Proof of work"),o.a.createElement("input",{id:"proofOfWork",type:"text",size:"3",value:this.state.proofOfWork,onChange:this.handleProofOfWorkChange.bind(this)}),o.a.createElement("input",{type:"submit",className:"button",value:"Submit"})),o.a.createElement("div",null,this.transactionsNotInABlock().map(e=>o.a.createElement("div",{key:"txcheck_"+e.id},o.a.createElement(c,{tx:e,selected:this.isValidate(e.id),handler:t=>this.handlerTransactionSelection(e.id,t)})))),o.a.createElement("div",null,t.map(e=>o.a.createElement("div",{key:"bck_"+e.id},o.a.createElement(s,{block:e,branch:this.blockBranch(e),selected:this.state.selectedBlock===e.id,inChain:this.isBlockInSelectedChain(e),handler:t=>this.handlerBlockSelection(e.id,t)})))))):o.a.createElement("div",null,"Loading...")}}class d extends o.a.Component{constructor(e){super(e),this.state={id:"1234",user:"Jack",x:"123",y:"456"},this.handleChange=this.handleChange.bind(this),this.handleSubmit=this.handleSubmit.bind(this)}handleChange(e){this.setState({[e.target.name]:e.target.value})}handleSubmit(e){e.preventDefault(),fetch("/tx/add",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(this.state)})}render(){return o.a.createElement("form",{id:"addTxForm",onSubmit:this.handleSubmit},o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("label",null,"Name")),o.a.createElement("input",{size:"15",name:"user",type:"text",value:this.state.user,onChange:this.handleChange})),o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("label",null,"X")),o.a.createElement("input",{size:"15",name:"x",type:"text",value:this.state.x,onChange:this.handleChange})),o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("label",null,"Y")),o.a.createElement("input",{size:"15",name:"y",type:"text",value:this.state.y,onChange:this.handleChange})),o.a.createElement("div",null,o.a.createElement("input",{type:"submit",className:"button",value:"Submit"})))}}ReactDOM.render(o.a.createElement(class extends o.a.Component{constructor(e){super(e),this.state={onglet:"A"}}handleClick(e,t){this.setState({onglet:t})}render(){let e;return e="A"===this.state.onglet?o.a.createElement(u,null):o.a.createElement(d,null),o.a.createElement("div",null,o.a.createElement("div",{className:"bar"},o.a.createElement("a",{className:"baritem"+("A"===this.state.onglet?" selected":""),onClick:e=>this.handleClick(e,"A")},"Blockchain"),o.a.createElement("a",{className:"baritem"+("B"===this.state.onglet?" selected":""),onClick:e=>this.handleClick(e,"B")},"Transaction")),e)}},null),document.getElementById("root"))}]);