KISSY.add(function(){
    return {"html":"<h4>处理文件列表:</h4>\r\n{{#if !files.length}}\r\n    <div>\r\n        没有文件\r\n    </div>\r\n{{#else}}\r\n    <ul class=\"plugin-file-list\">\r\n        {{#each files as file}}\r\n            <li>\r\n                <i class=\"icon-file\"></i> {{file}}\r\n            </li>\r\n        {{/each}}\r\n    </ul>\r\n{{/if}}\r\n"};
});