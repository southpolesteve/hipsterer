(function(a,b){var c=a.document,d,e=function(a,e,f){var g=this,h,i,j,k,l,m,n={updated:[]};this.listContainer=typeof a=="string"?c.getElementById(a):a,this.items=[],this.visibleItems=[],this.matchingItems=[],this.searched=!1,this.filtered=!1,this.list=null,this.templateEngines={},this.page=e.page||200,this.i=e.i||1,i={start:function(a,b){b.plugins=b.plugins||{},this.classes(b),h=new l(g,b),this.callbacks(b),this.items.start(a,b),g.update(),this.plugins(b.plugins)},classes:function(a){a.listClass=a.listClass||"list",a.searchClass=a.searchClass||"search",a.sortClass=a.sortClass||"sort"},callbacks:function(a){g.list=d.getByClass(a.listClass,g.listContainer,!0),d.addEvent(d.getByClass(a.searchClass,g.listContainer),"keyup",g.search),m=d.getByClass(a.sortClass,g.listContainer),d.addEvent(m,"click",g.sort)},items:{start:function(a,c){if(c.valueNames){var d=this.get(),e=c.valueNames;c.indexAsync?this.indexAsync(d,e):this.index(d,e)}a!==b&&g.add(a)},get:function(){var a=g.list.childNodes,c=[];for(var d=0,e=a.length;d<e;d++)a[d].data===b&&c.push(a[d]);return c},index:function(a,b){for(var c=0,d=a.length;c<d;c++)g.items.push(new k(b,a[c]))},indexAsync:function(a,b){var c=a.splice(0,100);this.index(c,b),a.length>0?setTimeout(function(){i.items.indexAsync(a,b)},10):g.update()}},plugins:function(a){for(var b=0;b<a.length;b++){var c=a[b][1].name||a[b][0];g[c]=new g.plugins[a[b][0]](g,a[b][1])}}},this.add=function(a,c){c&&o(a,c);var d=[],e=!1;a[0]===b&&(a=[a]);for(var f=0,h=a.length;f<h;f++){var i=null;a[f]instanceof k?(i=a[f],i.reload()):(e=g.items.length>g.page?!0:!1,i=new k(a[f],b,e)),g.items.push(i),d.push(i)}return g.update(),d};var o=function(a,b,c){var d=a.splice(0,100);c=c||[],c=c.concat(g.add(d)),a.length>0?setTimeout(function(){o(a,b,c)},10):(g.update(),b(c))};this.show=function(a,b){this.i=a,this.page=b,g.update()},this.remove=function(a,b,c){var d=0;for(var e=0,f=g.items.length;e<f;e++)g.items[e].values()[a]==b&&(h.remove(g.items[e],c),g.items.splice(e,1),f--,d++);return g.update(),d},this.get=function(a,b){var c=[];for(var d=0,e=g.items.length;d<e;d++){var f=g.items[d];f.values()[a]==b&&c.push(f)}return c.length==0?null:c.length==1?c[0]:c},this.sort=function(a,c){var e=g.items.length,f=null,h=a.target||a.srcElement,i="",j=!1,k="asc",l="desc",c=c||{};h===b?(f=a,j=c.asc||!1):(f=d.getAttribute(h,"data-sort"),j=d.hasClass(h,k)?!1:!0);for(var n=0,o=m.length;n<o;n++)d.removeClass(m[n],k),d.removeClass(m[n],l);j?(h!==b&&d.addClass(h,k),j=!0):(h!==b&&d.addClass(h,l),j=!1),c.sortFunction?c.sortFunction=c.sortFunction:c.sortFunction=function(a,b){return d.sorter.alphanum(a.values()[f],b.values()[f],j)},g.items.sort(c.sortFunction),g.update()},this.search=function(a,c){g.i=1;var d=[],e,f,i,j,k,c=c===b?g.items[0].values():c,a=a===b?"":a,l=a.target||a.srcElement;a=l===b?(""+a).toLowerCase():""+l.value.toLowerCase(),k=g.items,a=a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),h.clear();if(a==="")q.search(),g.searched=!1,g.update();else{g.searched=!0;for(var m=0,n=k.length;m<n;m++){e=!1,f=k[m],j=f.values();for(var o in c)j.hasOwnProperty(o)&&c[o]!==null&&(i=j[o]!=null?j[o].toString().toLowerCase():"",a!==""&&i.search(a)>-1&&(e=!0));e?(f.found=!0,d.push(f)):f.found=!1}g.update()}return g.visibleItems},this.filter=function(a){g.i=1;var c=b;q.filter();if(a===b)g.filtered=!1;else{c=[],g.filtered=!0;var d=g.items;for(var e=0,f=d.length;e<f;e++){var h=d[e];a(h.values())?(h.filtered=!0,c.push(h)):h.filtered=!1}}return g.update(),g.visibleItems},this.size=function(){return g.items.length},this.clear=function(){h.clear(),g.items=[]},this.on=function(a,b){n[a].push(b)};var p=function(a){var b=n[a].length;while(b--)n[a][b]()},q={filter:function(){var a=g.items,b=a.length;while(b--)a[b].filtered=!1},search:function(){var a=g.items,b=a.length;while(b--)a[b].found=!1}};this.update=function(){var a=g.items,b=a.length;g.visibleItems=[],g.matchingItems=[],h.clear();for(var c=0;c<b;c++)a[c].matching()&&c+1>=g.i&&g.visibleItems.length<g.page?(a[c].show(),g.visibleItems.push(a[c]),g.matchingItems.push(a[c])):a[c].matching()?(g.matchingItems.push(a[c]),a[c].hide()):a[c].hide();p("updated")},k=function(a,c,d){var e=this,f={};this.found=!1,this.filtered=!1;var i=function(a,c,d){if(c===b)d?e.values(a,d):e.values(a);else{e.elm=c;var f=h.get(e,a);e.values(f)}};this.values=function(a,c){if(a===b)return f;for(var d in a)f[d]=a[d];c!==!0&&h.set(e,e.values())},this.show=function(){h.show(e)},this.hide=function(){h.hide(e)},this.matching=function(){return g.filtered&&g.searched&&e.found&&e.filtered||g.filtered&&!g.searched&&e.filtered||!g.filtered&&g.searched&&e.found||!g.filtered&&!g.searched},this.visible=function(){return e.elm.parentNode?!0:!1},i(a,c,d)},l=function(a,c){return c.engine===b?c.engine="standard":c.engine=c.engine.toLowerCase(),new g.constructor.prototype.templateEngines[c.engine](a,c)},i.start(f,e)};e.prototype.templateEngines={},e.prototype.plugins={},e.prototype.templateEngines.standard=function(a,e){function i(a){if(a===b){var d=f.childNodes,g=[];for(var h=0,i=d.length;h<i;h++)if(d[h].data===b)return d[h];return null}if(a.indexOf("<")!==-1){var j=c.createElement("div");return j.innerHTML=a,j.firstChild}return c.getElementById(e.item)}var f=d.getByClass(e.listClass,a.listContainer)[0],g=i(e.item),h=this,j={created:function(a){a.elm===b&&h.create(a)}};this.get=function(a,b){j.created(a);var c={};for(var e=0,f=b.length;e<f;e++)c[b[e]]=d.getByClass(b[e],a.elm)[0].innerHTML;return c},this.set=function(a,b){j.created(a);for(var c in b)if(b.hasOwnProperty(c)){var e=d.getByClass(c,a.elm,!0);e&&(e.innerHTML=b[c])}},this.create=function(a){if(a.elm!==b)return;var c=g.cloneNode(!0);c.id="",a.elm=c,h.set(a,a.values())},this.remove=function(a){f.removeChild(a.elm)},this.show=function(a){j.created(a),f.appendChild(a.elm)},this.hide=function(a){a.elm!==b&&a.elm.parentNode===f&&f.removeChild(a.elm)},this.clear=function(){if(f.hasChildNodes())while(f.childNodes.length>=1)f.removeChild(f.firstChild)}},d={getByClass:function(){return c.getElementsByClassName?function(a,b,c){return c?b.getElementsByClassName(a)[0]:b.getElementsByClassName(a)}:function(a,b,d){var e=[],f="*";b==null&&(b=c);var g=b.getElementsByTagName(f),h=g.length,i=new RegExp("(^|\\s)"+a+"(\\s|$)");for(var j=0,k=0;j<h;j++)if(i.test(g[j].className)){if(d)return g[j];e[k]=g[j],k++}return e}}(),addEvent:function(a,c){if(c.addEventListener)return function(c,e,f){if(c&&!(c instanceof Array)&&!c.length&&!d.isNodeList(c)&&c.length!==0||c===a)c.addEventListener(e,f,!1);else if(c&&c[0]!==b){var h=c.length;for(var i=0;i<h;i++)d.addEvent(c[i],e,f)}};if(c.attachEvent)return function(c,e,f){if(c&&!(c instanceof Array)&&!c.length&&!d.isNodeList(c)&&c.length!==0||c===a)c.attachEvent("on"+e,function(){return f.call(c,a.event)});else if(c&&c[0]!==b){var h=c.length;for(var i=0;i<h;i++)d.addEvent(c[i],e,f)}}}(this,c),getAttribute:function(a,c){var d=a.getAttribute&&a.getAttribute(c)||null;if(!d){var e=a.attributes,f=e.length;for(var g=0;g<f;g++)c[g]!==b&&c[g].nodeName===c&&(d=c[g].nodeValue)}return d},isNodeList:function(a){var b=Object.prototype.toString.call(a);return typeof a=="object"&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(b)&&(a.length==0||typeof node=="object"&&a[0].nodeType>0)?!0:!1},hasClass:function(a,b){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className");return c.search(b)>-1},addClass:function(a,b){if(!this.hasClass(a,b)){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className");c=c+" "+b+" ",c=c.replace(/\s{2,}/g," "),a.setAttribute("class",c)}},removeClass:function(a,b){if(this.hasClass(a,b)){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className");c=c.replace(b,""),a.setAttribute("class",c)}},sorter:{alphanum:function(a,c,d){if(a===b||a===null)a="";if(c===b||c===null)c="";a=a.toString().replace(/&(lt|gt);/g,function(a,b){return b=="lt"?"<":">"}),a=a.replace(/<\/?[^>]+(>|$)/g,""),c=c.toString().replace(/&(lt|gt);/g,function(a,b){return b=="lt"?"<":">"}),c=c.replace(/<\/?[^>]+(>|$)/g,"");var e=this.chunkify(a),f=this.chunkify(c);for(var g=0;e[g]&&f[g];g++)if(e[g]!==f[g]){var h=Number(e[g]),i=Number(f[g]);return d?h==e[g]&&i==f[g]?h-i:e[g]>f[g]?1:-1:h==e[g]&&i==f[g]?i-h:e[g]>f[g]?-1:1}return e.length-f.length},chunkify:function(a){var b=[],c=0,d=-1,e=0,f,g;while(f=(g=a.charAt(c++)).charCodeAt(0)){var h=f==45||f==46||f>=48&&f<=57;h!==e&&(b[++d]="",e=h),b[d]+=g}return b}}},a.List=e,a.ListJsHelpers=d})(window),function(){var a;a=new List("friend-list",{valueNames:["name"]})}.call(this);