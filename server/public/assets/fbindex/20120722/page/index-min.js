KISSY.add("utils/app-history",function(a){function c(){var a=localStorage.getItem(b);if(!a)return[];try{var c=a.split(",")}catch(d){return[]}return c}function d(a){return localStorage.setItem(b,a.join(","))}if(!window.localStorage)return null;var b="AppHistory";return{push:function(b){var e=c();e=a.filter(e,function(a){return a!=b}),e.unshift(b),d(e)},get:function(){var a=c();return a},rm:function(b){var e=c();e=a.filter(e,function(a){return a!=b}),d(e)}}}),KISSY.add("page/template/app-history-tpl",function(){return{html:"<h3>\u5386\u53f2\u8bb0\u5f55\uff1a</h3>\n{{#each his as item}}\n<div class='history-item'>\n    <a href=\"/app?root={{item}}\"> {{item}} </a>\n</div>\n{{/each}}\n"}}),KISSY.add("page/index",function(a,b,c,d){var e=a.all;c&&a.ready(function(){var a=c.get();e("#app-history").html(b(d.html).render({his:a}))})},{requires:["template","utils/app-history","./template/app-history-tpl"]}); 