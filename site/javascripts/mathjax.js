window.MathJax = {
  tex: {
    // 1. 设置行内公式标志： \( ... \)
    inlineMath: [["\\(", "\\)"]],
    
    // 2. 设置块级公式标志： \[ ... \] 和 $$ ... $$
    // 关键：加上 ["$$", "$$"]，让 MathJax 主动识别这两个符号
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    // 3. 关键修改：删除 ignoreHtmlClass 和 processHtmlClass 配置
    // 现在的配置表示：不忽略任何内容，扫描整个网页寻找公式
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    
    // 忽略带 "ignore" 类的标签
    ignoreHtmlClass: "tex2jax_ignore",
    
    // 处理带 "process" 类的标签
    processHtmlClass: "tex2jax_process"
  }
};

document$.subscribe(() => { 
  MathJax.typesetPromise()
})