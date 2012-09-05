KISSY.add("utils/build-page",function(a){function c(b,c,d){a.ajax({url:b,data:c,cache:!1,dataType:"json",success:function(a){d(null,a)}})}function d(){var d=this;b("body").delegate("click",".fb-build-page",function(e){e.preventDefault();var f=b(e.target),g=f.parent(".buildto-block"),h=f.attr("data-group-build"),i=g.one(".status"),j=g.one("input");i.html("building...");var k=[],l=j.val();h?(b("input.j-version-checkbox").each(function(a){a.prop("checked")&&a.val()&&k.push(a.val())}),c(f.attr("href"),{timestamp:l,pages:k.join(",")},function(b,c){if(b)return a.error(b);if(c.err){var b=c.err;i.html("Error:"+b.message),d.fire("error",{error:c.err});return}i.html("success!"),setTimeout(function(){i.html("")},2e3)})):(c(f.attr("href"),{timestamp:l},function(b,c){if(b)return a.error(b);if(c.err){var b=c.err;i.html("Error:"+b.message),d.fire("error",{error:c.err});return}i.html("success!"),setTimeout(function(){i.html("")},2e3),c.reports&&d.fire("report",{reports:c.reports})}),f.attr("data-page")&&k.push(f.attr("data-page")))})}var b=a.all;return a.extend(d,a.Base),new d}),KISSY.add("utils/calendar-init",function(a,b,c){var d=a.all;return{init:function(e){function g(a){var b=d(a.target);if(f.get("el").contains(b))return;if(b.attr("data-cal-trigger"))return;if(b.parent(".ks-cal-box"))return;f.hide()}d(e.triggers).attr("data-cal-trigger","1");var f=new c.Popup({width:192});f.render(),f.on("hide",function(){d(document.body).detach("click",g)}).on("show",function(){d(document.body).on("click",g)});var h=new b(f.get("contentEl"));h.on("select",function(b){this.targetInput&&d(this.targetInput).val(a.Date.format(b.date,"yyyymmdd")),f.hide()}),d(e.triggers).on("click",function(b){f.show();var c=d(b.target);f.align(c,["bl","tl"]),h.targetInput=c;var e=c.val();if(e){var g=e.match(/^(\d{2,4})(\d\d)(\d\d)$/);console.log(g);var i=a.Date.parse(g.slice(1).join("-"));h.render({date:i,selected:i})}})}}},{requires:["calendar","overlay","calendar/assets/base.css"]}),KISSY.add("page/mods/reporter",function(a,b,c,d,e,f,g,h,i,j){var k=a.all,l=function(b){var c=this;c.$el=k(b);if(!c.$el||!c.$el.length)throw new Error("container is not found");a.ready(function(){c.init()})};return a.extend(l,a.Base,{init:function(){var a=this;k("body").delegate("click",".report-plugin-item-hd",function(a){var b=k(a.currentTarget).siblings(".report-plugin-item-bd");b&&b.toggle()})},addError:function(a){var b=this,c=l.error_wrap_tpl.render(a);b.appendReportEl(k(c))},addReport:function(b){var c=this,d={};a.each(b,function(a,b){c.renderer[b]&&a&&(d[b]=c.renderer[b].call(c,a))});var e=l.wrap_tpl.render(d);c.appendReportEl(k(e))},appendReportEl:function(a){var b=this,c=b.$el.all(".report");c.length>0?a.insertBefore(c[0]):a.appendTo(b.$el),a.slideDown(.2)},pluginRenderer:{csslint:"csslint_tpl","kissy-template":"files_tpl",uglifyjs:"files_tpl",cssmin:"files_tpl",concat:"concat_tpl",lesscss:"files_tpl","css-combo":"css_combo_tpl"},parserPluginReports:function(b){return a.map(b,function(a){switch(a.name){case"csslint":a.count=a.lintReport.length;break;case"concat":case"css-combo":a.count=a.jobs.length;break;case"cssmin":case"uglifyjs":case"kissy-template":case"lesscss":a.count=a.files.length}return a})},renderer:{fb:function(a){return l.fb_tpl.render(a)},plugins:function(b){var c=this,d=[];return b=c.parserPluginReports(b),a.each(b,function(a){var b=a.name,e=c.pluginRenderer[b]||null;e&&(e=l[e]);var f=e?e.render(a):"";d.push(l.plugin_tpl.render({name:b,report:a,content:f}))}),d.join("")}}},{fb_tpl:b(c.html),plugin_tpl:b(f.html),wrap_tpl:b(d.html),error_wrap_tpl:b(e.html),csslint_tpl:b(g.html),files_tpl:b(h.html),concat_tpl:b(i.html),css_combo_tpl:b(j.html)}),l},{requires:["template","page/template/report-fb-tpl","page/template/report-wrap-tpl","page/template/report-error-wrap-tpl","page/template/report-plugin-tpl","page/template/report-csslint-tpl","page/template/report-files-tpl","page/template/report-concat-tpl","page/template/report-css-combo-tpl"]}),KISSY.add("page/template/report-fb-tpl",function(){return{html:'<div class="report-fb">\r\n    <span class="number">\r\n        {{build_version}}\r\n    </span>\r\n    <b class=\'block\'></b><b class=\'triangle\'></b>\r\n    <span class="number">\r\n        {{build_timestamp}}\r\n    </span>\r\n    <span class="number used-time">\r\n        {{build_used_time}}ms\r\n    </span>\r\n</div>'}}),KISSY.add("page/template/report-wrap-tpl",function(){return{html:'<div class="report" style=\'display:none\'>\r\n    <div class="report-hd">{{fb}}</div>\r\n    <div class="report-bd">{{plugins}}</div>\r\n</div>'}}),KISSY.add("page/template/report-error-wrap-tpl",function(){return{html:'<div class="report" style=\'display:none\'>\r\n    <div class="report-bd">\r\n        <div class="alert alert-error">\r\n            <h2> {{message}} </h2>\r\n            <h4>error</h4>\r\n            <pre>{{text}}</pre>\r\n            <h4>stack</h4>\r\n            <pre>{{stack}}</pre>\r\n        </div>\r\n    </div>\r\n</div>'}}),KISSY.add("page/template/report-plugin-tpl",function(){return{html:"<div class=\"report-plugin-item\">\r\n    <div class=\"report-plugin-item-hd{{#if content}} report-plugin-hd-has-content{{/if}}\">\r\n        <h4>{{name}} \r\n        {{#if typeof report.count === 'number'}}\r\n        <span class='plugin-bdg'>\r\n            <span class=\"badge\">{{report.count}}</span>\r\n        </span>\r\n        {{/if}}\r\n        {{#if typeof report.warningCount === 'number' && report.warningCount > 0}}\r\n        <span class='plugin-bdg'>\r\n            <span class=\"badge badge-warning\">{{report.warningCount}}</span>\r\n        </span>\r\n        {{/if}}\r\n        {{#if typeof report.errorCount === 'number' && report.errorCount > 0}}\r\n        <span class='plugin-bdg'>\r\n            <span class=\"badge badge-important\">{{report.errorCount}}</span>\r\n        </span>\r\n        {{/if}}\r\n        </h4>\r\n    </div>\r\n    {{#if content}}\r\n    <div class='report-plugin-item-bd'>{{content}}</div>\r\n    {{/if}}\r\n    <div class=\"report-plugin-item-ft\">\r\n        <ul>\r\n            <li class='used-time'><i class='icon-time'></i> {{report.used_time}} ms\r\n            </li>\r\n        </ul>\r\n    </div>\r\n</div>"}}),KISSY.add("page/template/report-csslint-tpl",function(){return{html:"<div class=\"csslint-list\">\r\n    {{#if lintReport&&lintReport.length}}\r\n        {{#each lintReport as item}}\r\n            <div class='csslint-list-item'>\r\n                <h4 class='csslint-file'>{{item.file}}</h4>\r\n                <p>{{item.fullpath}}</p>\r\n                <pre>{{item.output}}</pre>\r\n            </div>\r\n        {{/each}}\r\n    {{#else}}\r\n        \u6ca1\u6709CSS\u6587\u4ef6\r\n    {{/if}}\r\n</div>\r\n"}}),KISSY.add("page/template/report-files-tpl",function(){return{html:'<h4>\u5904\u7406\u6587\u4ef6\u5217\u8868:</h4>\r\n{{#if !files.length}}\r\n    <div>\r\n        \u6ca1\u6709\u6587\u4ef6\r\n    </div>\r\n{{#else}}\r\n    <ul class="plugin-file-list">\r\n        {{#each files as file}}\r\n            <li>\r\n                <i class="icon-file"></i> {{file}}\r\n            </li>\r\n        {{/each}}\r\n    </ul>\r\n{{/if}}\r\n'}}),KISSY.add("page/template/report-concat-tpl",function(){return{html:'<h4>\u5904\u7406\u6587\u4ef6\u5217\u8868:</h4>\r\n{{#if !jobs.length}}\r\n    <div>\r\n        \u6ca1\u6709\u6587\u4ef6\r\n    </div>\r\n{{#else}}\r\n    <ul >\r\n        {{#each jobs as job}}\r\n            <li>\r\n                <h4><i class="icon-file"></i> {{job.filename}}</h4>\r\n                <ul class="plugin-file-list">\r\n                    {{#each job.files as file}}\r\n                        <li title=\'{{file.path}}\'>{{file.filename}}</li>\r\n                    {{/each}}\r\n                </ul>\r\n            </li>\r\n        {{/each}}\r\n    </ul>\r\n{{/if}}\r\n'}}),KISSY.add("page/template/report-css-combo-tpl",function(){return{html:'<h4>\u5904\u7406\u6587\u4ef6\u5217\u8868:</h4>\r\n{{#if !jobs.length}}\r\n    <div>\r\n        \u6ca1\u6709\u6587\u4ef6\r\n    </div>\r\n{{#else}}\r\n    <ul >\r\n        {{#each jobs as job}}\r\n            <li>\r\n                <h4><i class="icon-file"></i> {{job.filename}} </h4>\r\n                <ul class="plugin-file-list">\r\n                    {{#each job.imports as file}}\r\n                        <li>\r\n                            <i class="icon-bookmark"></i>  \r\n                            {{file}}\r\n                        </li>\r\n                    {{/each}}\r\n                </ul>\r\n            </li>\r\n        {{/each}}\r\n    </ul>\r\n{{/if}}\r\n'}}),KISSY.add("page/mods/timestamp",function(a){var b=a.all;a.ready(function(){b("body").delegate("click",".build-timestamp",function(a){var c=b(a.target),d=b(".timestamp-input"),e=c.clone(!0),f=c.offset(),g=d.offset();e.appendTo("body"),e.css("position","absolute").css("left",f.left).css("top",f.top).show().animate({left:g.left,top:g.top},.2,"easeNone",function(){d.val(c.html()),setTimeout(function(){e.remove()},0)})})})}),KISSY.add("page/index",function(a,b,c,d){var e=a.all;a.ready(function(){var a=new d("#reports");b.on("report",function(b){a.addReport(b.reports)}),b.on("error",function(b){a.addError(b.error)}),c.init({triggers:"input.timestamp-input"})})},{requires:["utils/build-page","utils/calendar-init","./mods/reporter","./mods/timestamp"]}); 