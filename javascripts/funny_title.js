// docs/javascripts/funny_title.js

var OriginTitle = document.title;
var titleTime;

// 获取原本的 Icon 元素
var iconLink = document.querySelector("link[rel*='icon']");
var OriginIcon = iconLink ? iconLink.href : '';

// 定义“离开”时的 Icon 路径 (请确保 docs/assets/ 下有这张图)
// MkDocs 打包后，assets 通常位于根目录下，所以用相对路径或绝对路径
// 如果你用的是 mkdocs serve，路径通常是 /assets/favicon_hide.png
var HiddenIcon = '/assets/favicon_hide.png'; 

document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // ====== 离开页面 ======
        
        // 1. 记录当前标题 (防止 SPA 跳转后标题错乱)
        OriginTitle = document.title;
        
        // 2. 修改标题
        document.title = '_(:3 」∠ )_ 别走呀...';
        clearTimeout(titleTime);

        // 3. 修改图标
        if (iconLink) {
            iconLink.href = HiddenIcon;
        }

    } else {
        // ====== 回到页面 ======

        // 1. 修改标题
        document.title = '(ฅ>ω<*ฅ) 欢迎回来！';

        // 2. 恢复图标 (立刻恢复)
        if (iconLink) {
            iconLink.href = OriginIcon;
        }

        // 3. 延迟 2 秒恢复原标题
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});