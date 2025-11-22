window.MathJax = {
  tex: {
    inlineMath: [["$", "$"], ["\\(", "\\)"]],
    displayMath: [["$$", "$$"], ["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
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
  }
};

