(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[838],{27484:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",o="minute",a="hour",s="day",l="week",u="month",c="quarter",d="year",f="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},g=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},y={s:g,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+g(r,2,"0")+":"+g(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),o=n-i<0,a=e.clone().add(r+(o?-1:1),u);return+(-(r+(n-i)/(o?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:d,w:l,d:s,D:f,h:a,m:o,s:i,ms:r,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},w="en",b={};b[w]=v;var S=function(t){return t instanceof D},$=function(t,e,n){var r;if(!t)return w;if("string"==typeof t)b[t]&&(r=t),e&&(b[t]=e,r=t);else{var i=t.name;b[i]=t,r=i}return!n&&r&&(w=r),r||!n&&w},_=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},k=y;k.l=$,k.i=S,k.w=function(t,e){return _(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function v(t){this.$L=$(t.locale,null,!0),this.parse(t)}var g=v.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(k.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(p);if(r){var i=r[2]-1||0,o=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return k},g.isValid=function(){return!(this.$d.toString()===h)},g.isSame=function(t,e){var n=_(t);return this.startOf(e)<=n&&n<=this.endOf(e)},g.isAfter=function(t,e){return _(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<_(t)},g.$g=function(t,e,n){return k.u(t)?this[e]:this.set(n,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var n=this,r=!!k.u(e)||e,c=k.p(t),h=function(t,e){var i=k.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(s)},p=function(t,e){return k.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,g=this.$D,y="set"+(this.$u?"UTC":"");switch(c){case d:return r?h(1,0):h(31,11);case u:return r?h(1,v):h(0,v+1);case l:var w=this.$locale().weekStart||0,b=(m<w?m+7:m)-w;return h(r?g-b:g+(6-b),v);case s:case f:return p(y+"Hours",0);case a:return p(y+"Minutes",1);case o:return p(y+"Seconds",2);case i:return p(y+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var n,l=k.p(t),c="set"+(this.$u?"UTC":""),h=(n={},n[s]=c+"Date",n[f]=c+"Date",n[u]=c+"Month",n[d]=c+"FullYear",n[a]=c+"Hours",n[o]=c+"Minutes",n[i]=c+"Seconds",n[r]=c+"Milliseconds",n)[l],p=l===s?this.$D+(e-this.$W):e;if(l===u||l===d){var m=this.clone().set(f,1);m.$d[h](p),m.init(),this.$d=m.set(f,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[k.p(t)]()},g.add=function(r,c){var f,h=this;r=Number(r);var p=k.p(c),m=function(t){var e=_(h);return k.w(e.date(e.date()+Math.round(t*r)),h)};if(p===u)return this.set(u,this.$M+r);if(p===d)return this.set(d,this.$y+r);if(p===s)return m(1);if(p===l)return m(7);var v=(f={},f[o]=e,f[a]=n,f[i]=t,f)[p]||1,g=this.$d.getTime()+r*v;return k.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=k.z(this),o=this.$H,a=this.$m,s=this.$M,l=n.weekdays,u=n.months,c=function(t,n,i,o){return t&&(t[n]||t(e,r))||i[n].substr(0,o)},d=function(t){return k.s(o%12||12,t,"0")},f=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:s+1,MM:k.s(s+1,2,"0"),MMM:c(n.monthsShort,s,u,3),MMMM:c(u,s),D:this.$D,DD:k.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,l,2),ddd:c(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(o),HH:k.s(o,2,"0"),h:d(1),hh:d(2),a:f(o,a,!0),A:f(o,a,!1),m:String(a),mm:k.s(a,2,"0"),s:String(this.$s),ss:k.s(this.$s,2,"0"),SSS:k.s(this.$ms,3,"0"),Z:i};return r.replace(m,(function(t,e){return e||p[t]||i.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(r,f,h){var p,m=k.p(f),v=_(r),g=(v.utcOffset()-this.utcOffset())*e,y=this-v,w=k.m(this,v);return w=(p={},p[d]=w/12,p[u]=w,p[c]=w/3,p[l]=(y-g)/6048e5,p[s]=(y-g)/864e5,p[a]=y/n,p[o]=y/e,p[i]=y/t,p)[m]||y,h?w:k.a(w)},g.daysInMonth=function(){return this.endOf(u).$D},g.$locale=function(){return b[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=$(t,e,!0);return r&&(n.$L=r),n},g.clone=function(){return k.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},v}(),M=D.prototype;return _.prototype=M,[["$ms",r],["$s",i],["$m",o],["$H",a],["$W",s],["$M",u],["$y",d],["$D",f]].forEach((function(t){M[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),_.extend=function(t,e){return t.$i||(t(e,D,_),t.$i=!0),_},_.locale=$,_.isDayjs=S,_.unix=function(t){return _(1e3*t)},_.en=b[w],_.Ls=b,_.p={},_}()},16394:function(t,e,n){"use strict";n.d(e,{Z:function(){return u}});var r=n(35944),i=n(53215),o=n(67294),a=(0,n(42106).Z)("article",{target:"e1adcsch0"})("cursor:pointer;margin-bottom:1rem;display:flex;--tw-shadow:0px 0px 5px rgba(0, 0, 0, 0.15);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);--tw-bg-opacity:1;background-color:rgba(255, 255, 255, var(--tw-bg-opacity)); gap:0 1rem;&:hover{--tw-shadow:0px 0px 15px rgba(0, 0, 0, 0.3);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); .image-wrapper{img{transform:scale(1.15);}}}.image-wrapper{overflow:hidden;width:33.333333%;position:relative;height:12rem;margin-left:1.5rem; img{height:12rem;width:100%; transition:0.3s all;}.guide-label{transform:skewX(-35deg);position:absolute;top:0.5rem;left:-1rem;--tw-bg-opacity:1;background-color:rgba(37, 99, 235, var(--tw-bg-opacity));padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1.25rem;padding-right:1.25rem;opacity:0.5;font-weight:700;--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity)); span{display:block;margin-left:0.5rem; transform:skewX(35deg);}}}.news-content{",(0,i.kA)(1.7,3,"auto"),";}.news-main{width:66.666667%;padding-left:1rem;padding-right:1rem;padding-top:2rem;padding-bottom:2.5rem;margin-right:1.5rem;;}h2{",(0,i.kA)(1,1,"auto"),";font-size:1.25rem;line-height:1.75rem;font-weight:700;margin-bottom:1rem;;}@media (max-width: ",i.oe,"){display:block; .image-wrapper{margin-left:0px;margin-bottom:1rem;width:100%;height:14rem; img{height:14rem;;}.guide-label{transform:skewX(-35deg);top:0.5rem;left:-1.25rem;font-size:1.25rem;line-height:1.75rem; span{display:block;margin-left:0.5rem; transform:skewX(35deg);}}}.news-content{",(0,i.kA)(1.7,3,"auto"),";}.news-main{width:100%;padding-left:1rem;padding-right:1rem;padding-bottom:1.5rem;padding-top:0px;;}h2{",(0,i.kA)(1,1,"auto"),";font-size:1.25rem;line-height:1.75rem;font-weight:700;margin-bottom:1rem;;}}"),s=n(11163),l=n(99398),u=function(t){var e=t.article,n=(0,o.useCallback)((function(){s.default.push("/news/".concat(null===e||void 0===e?void 0:e.id))}),[e]);return(0,r.BX)(a,{className:"news-card-wrapper",onClick:n,children:[(0,r.BX)("div",{className:"image-wrapper",children:[(0,r.tZ)("img",{src:null!==e&&void 0!==e&&e.thumbnail?e.thumbnail:i.Q7,alt:"news-thumbnail"}),(null===e||void 0===e?void 0:e.label)&&(0,r.tZ)("div",{className:"guide-label",children:(0,r.tZ)("span",{children:null===e||void 0===e?void 0:e.label})})]}),(0,r.BX)("div",{className:"news-main",children:[(0,r.tZ)("h2",{children:null===e||void 0===e?void 0:e.title}),(0,r.tZ)("p",{className:"news-content",children:(0,l.Z)(null===e||void 0===e?void 0:e.content)})]})]})}},51393:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSP:function(){return D},NewsArticleWrapper:function(){return M}});var r=n(35944),i=n(4942),o=n(42106),a=n(67294),s=n(30653),l=n(53215),u=n(11163),c=n(48818),d=n(84608),f=n(27049),h=n(9669),p=n.n(h),m=n(31296),v=n(80171),g=n(61072),y=n(99617),w=n(36243),b=n(8212),S=n(73171),$=n(49226);function _(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?_(Object(n),!0).forEach((function(e){(0,i.Z)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var D=!0,M=(0,o.Z)("div",{target:"e104987h0"})("padding-top:6rem;.post-content{user-select:none;padding-bottom:4rem;position:relative;;}.article-manage-wrapper{",(0,l.Yk)("center","center"),";}");e.default=function(t){var e=t.initialArticle,n=t.initialArticles,i=(0,u.useRouter)().query,o=(0,a.useState)(!1),h=o[0],_=o[1],D=(0,$.v9)((function(t){return t.user})).user,O=(0,c.ZP)("/article/".concat(null===i||void 0===i?void 0:i.articleId),d.Z,k({initialData:e},l.nb)).data,Z=(0,c.g_)((function(t){return"/article?page=".concat(t+1)}),d.Z,k({initialData:n},l.nb)),N=Z.data,E=Z.setSize;(0,a.useEffect)((function(){var t;(null===D||void 0===D?void 0:D.id)===(null===O||void 0===O||null===(t=O.user)||void 0===t?void 0:t.id)?_(!0):_(!1)}),[D,O]),(0,a.useEffect)((function(){O&&document.querySelectorAll(".post-content > h1 , .post-content > h2 ,.post-content > h3").forEach((function(t,e){var n=document.createElement("span");n.setAttribute("id","header_".concat(e+1)),n.classList.add("anchor-offset-controller"),t.classList.add("anchor-offset-parent"),t.appendChild(n)}))}),[O]);var T=(0,a.useCallback)((function(){D&&h&&p().delete("/article/".concat(null===O||void 0===O?void 0:O.id)).then((function(){(0,l.bi)("\uc5f0\ub300\uae30\ub97c \uc131\uacf5\uc801\uc73c\ub85c \uc0ad\uc81c\ud588\uc2b5\ub2c8\ub2e4."),u.default.push("/news")})).catch((function(t){throw(0,l.p4)(t),t}))}),[D,h,O]),P=(0,a.useCallback)((function(){D&&h&&u.default.push("/news/post?articleId=".concat(null===i||void 0===i?void 0:i.articleId))}),[D,h,i]);return(0,r.tZ)(M,{children:(0,r.BX)(m.Z,{children:[O&&(0,r.BX)(r.HY,{children:[(0,r.tZ)(g.Z,{article:O}),h&&(0,r.BX)(r.HY,{children:[(0,r.tZ)("h2",{className:"main-title",children:"\uad00\ub9ac (\uc6b4\uc601\uc790 \uc804\uc6a9)"}),(0,r.BX)("div",{className:"article-manage-wrapper",children:[(0,r.BX)("button",{onClick:P,className:"edit-btn",children:[(0,r.tZ)(b.Z,{}),"\uae30\uc0ac \uc218\uc815"]}),(0,r.BX)("button",{onClick:function(){return(0,w.u)(T,"\uc815\ub9d0 \uc774 \uae30\uc0ac\ub97c \uc0ad\uc81c\ud560\uae4c\uc694?","\uc0ad\uc81c\ud574\uc8fc\uc138\uc694.")},className:"delete-btn",children:[(0,r.tZ)(S.Z,{}),"\uae30\uc0ac \uc0ad\uc81c"]})]})]}),(0,r.BX)("h2",{className:"main-title",children:["\uc704\uce58 ",(0,r.tZ)("span",{children:null===O||void 0===O?void 0:O.region})]}),(0,r.tZ)(y.Z,{lat:null===O||void 0===O?void 0:O.lat,lng:null===O||void 0===O?void 0:O.lng}),(0,r.tZ)(f.Z,{}),(0,r.BX)("article",{className:"post-content",children:[(0,r.tZ)("span",{id:"main_post",className:"anchor-offset-controller"}),(0,s.ZP)(null===O||void 0===O?void 0:O.content)]})]}),(0,r.tZ)("div",{style:{marginBottom:"2rem"}}),(0,r.tZ)(v.Z,{setSize:E,articles:N})]})})}},80171:function(t,e,n){"use strict";var r=n(35944),i=n(42106),o=n(16394),a=n(51796),s=n(67294);var l=(0,i.Z)("div",{target:"evzrmgf0"})({name:"79elbk",styles:"position:relative;"});e.Z=function(t){var e,n=t.articles,i=t.setSize,u=(0,s.useState)(!0),c=u[0],d=u[1],f=(0,s.useRef)(null),h=(0,a.Z)(f),p=0===(null===n||void 0===n||null===(e=n[0])||void 0===e?void 0:e.length);(0,s.useEffect)((function(){var t;n&&d((null===(t=n[n.length-1])||void 0===t?void 0:t.length)<10)}),[n]),(0,s.useEffect)((function(){!h||c||p||i((function(t){return t+1})).then((function(){}))}),[h]);var m=n?null===n||void 0===n?void 0:n.flat():[];return(0,r.BX)(l,{children:[(0,r.tZ)("span",{id:"article_list",className:"anchor-offset-controller"}),null===m||void 0===m?void 0:m.map((function(t,e){return(0,r.tZ)(o.Z,{article:t},e)})),(0,r.tZ)("div",{ref:f})]})}},30481:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/news/[articleId]",function(){return n(51393)}])},49986:function(t,e,n){"use strict";var r=n(95318);e.Z=void 0;var i=r(n(67154)),o=r(n(59713)),a=r(n(319)),s=r(n(34575)),l=r(n(78585)),u=r(n(29754)),c=r(n(81506)),d=r(n(93913)),f=r(n(2205)),h=r(n(45697)),p=r(n(67294)),m=r(n(94184)),v=r(n(12502));var g=function(t){function e(t){var n;return(0,s.default)(this,e),(n=(0,l.default)(this,(0,u.default)(e).call(this,t))).state={targetItems:[],inViewState:[],isScrolledPast:[]},n._handleSpy=n._handleSpy.bind((0,c.default)(n)),n}return(0,f.default)(e,t),(0,d.default)(e,null,[{key:"propTypes",get:function(){return{items:h.default.arrayOf(h.default.string).isRequired,currentClassName:h.default.string.isRequired,scrolledPastClassName:h.default.string,style:h.default.object,componentTag:h.default.oneOfType([h.default.string,h.default.elementType]),offset:h.default.number,rootEl:h.default.string,onUpdate:h.default.func}}},{key:"defaultProps",get:function(){return{items:[],currentClassName:"",style:{},componentTag:"ul",offset:0,onUpdate:function(){}}}}]),(0,d.default)(e,[{key:"_initSpyTarget",value:function(t){return t.map((function(t){return document.getElementById(t)}))}},{key:"_fillArray",value:function(t,e){for(var n=[],r=0,i=t.length;r<i;r++)n[r]=e;return n}},{key:"_isScrolled",value:function(){return this._getScrollDimension().scrollTop>0}},{key:"_getScrollDimension",value:function(){var t=document,e=this.props.rootEl;return{scrollTop:e?t.querySelector(e).scrollTop:t.documentElement.scrollTop||t.body.parentNode.scrollTop||t.body.scrollTop,scrollHeight:e?t.querySelector(e).scrollHeight:t.documentElement.scrollHeight||t.body.parentNode.scrollHeight||t.body.scrollHeight}}},{key:"_getElemsViewState",value:function(t){for(var e=[],n=[],r=[],i=t||this.state.targetItems,o=!1,s=0,l=i.length;s<l;s++){var u=i[s],c=!o&&this._isInView(u);c?(o=!0,e.push(u)):n.push(u);var d=s===l-1,f=this._isScrolled();this._isAtBottom()&&this._isInView(u)&&!c&&d&&f&&(n.pop(),n.push.apply(n,(0,a.default)(e)),e=[u],r=this._fillArray(r,!1),c=!0),r.push(c)}return{inView:e,outView:n,viewStatusList:r,scrolledPast:this.props.scrolledPastClassName&&this._getScrolledPast(r)}}},{key:"_isInView",value:function(t){if(!t)return!1;var e,n=this.props,r=n.rootEl,i=n.offset;r&&(e=document.querySelector(r).getBoundingClientRect());var o=t.getBoundingClientRect(),a=r?e.height:window.innerHeight,s=this._getScrollDimension().scrollTop,l=s+a,u=r?o.top+s-e.top+i:o.top+s+i,c=u+t.offsetHeight;return u<l&&c>s}},{key:"_isAtBottom",value:function(){var t=this.props.rootEl,e=this._getScrollDimension(),n=e.scrollTop,r=e.scrollHeight;return n+(t?document.querySelector(t).getBoundingClientRect().height:window.innerHeight)>=r}},{key:"_getScrolledPast",value:function(t){if(!t.some((function(t){return t})))return t;var e=!1;return t.map((function(t){return t&&!e?(e=!0,!1):!e}))}},{key:"_spy",value:function(t){var e=this,n=this._getElemsViewState(t),r=this.state.inViewState;this.setState({inViewState:n.viewStatusList,isScrolledPast:n.scrolledPast},(function(){e._update(r)}))}},{key:"_update",value:function(t){var e,n;(e=this.state.inViewState,n=t,e.length===n.length&&e.every((function(t,e){return t===n[e]})))||this.props.onUpdate(this.state.targetItems[this.state.inViewState.indexOf(!0)])}},{key:"_handleSpy",value:function(){(0,v.default)(this._spy(),100)}},{key:"_initFromProps",value:function(){var t=this._initSpyTarget(this.props.items);this.setState({targetItems:t}),this._spy(t)}},{key:"offEvent",value:function(){(this.props.rootEl?document.querySelector(this.props.rootEl):window).removeEventListener("scroll",this._handleSpy)}},{key:"onEvent",value:function(){(this.props.rootEl?document.querySelector(this.props.rootEl):window).addEventListener("scroll",this._handleSpy)}},{key:"componentDidMount",value:function(){this._initFromProps(),this.onEvent()}},{key:"componentWillUnmount",value:function(){this.offEvent()}},{key:"UNSAFE_componentWillReceiveProps",value:function(){this._initFromProps()}},{key:"render",value:function(){var t=this,e=this.props.componentTag,n=this.props,r=n.children,a=n.className,s=n.scrolledPastClassName,l=n.style,u=0,c=p.default.Children.map(r,(function(e,n){var r;if(!e)return null;var a=e.type,l=s&&t.state.isScrolledPast[n],c=(0,m.default)((r={},(0,o.default)(r,"".concat(e.props.className),e.props.className),(0,o.default)(r,"".concat(t.props.currentClassName),t.state.inViewState[n]),(0,o.default)(r,"".concat(t.props.scrolledPastClassName),l),r));return p.default.createElement(a,(0,i.default)({},e.props,{className:c,key:u++}),e.props.children)})),d=(0,m.default)((0,o.default)({},"".concat(a),a));return p.default.createElement(e,{className:d,style:l},c)}}]),e}(p.default.Component);e.Z=g},12502:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(t){var e,n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;return function(){var i=+new Date;!!e&&i<e+r?(clearTimeout(n),n=setTimeout((function(){e=i,t()}),r)):(e=i,t())}};e.default=n}},function(t){t.O(0,[634,818,764,150,524,731,774,888,179],(function(){return e=30481,t(t.s=e);var e}));var e=t.O();_N_E=e}]);