window.MathJax = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    macros: {
      bm: ["\\boldsymbol{#1}", 1]
    }
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex",
    // 开启右键菜单功能
    enableMenu: true 
  },
  // 启动时自动把公式转为可读的 LaTeX 代码（辅助功能）
  menuSettings: { 
    zoom: "Double-Click" // 双击放大公式
  },
  // 文章页在排版完成前隐藏公式源码（editorial.css），完成后放出
  startup: {
    pageReady: function () {
      return MathJax.startup.defaultPageReady().then(zddMathReady, zddMathReady);
    }
  }
};

function zddMathReady() {
  if (document.body) document.body.classList.add("zdd-math-ready");
}
// CDN 失败或过慢时也不要让公式一直不可见
setTimeout(zddMathReady, 6000);

