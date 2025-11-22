/* 鼠标点击浮出数学符号特效 */
(function() {
    var a_idx = 0;
    // 这里是你想要浮出的符号列表，可以自己加
    var symbols = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "∫", "∑", "∏", "∞", "∂", "∇", "∀", "∃"];
    
    document.body.addEventListener('click', function(e) {
        // 过滤掉点击链接或按钮的情况，防止误触
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;

        var ele = document.createElement("span");
        ele.textContent = symbols[a_idx];
        a_idx = (a_idx + 1) % symbols.length;
        
        // 随机颜色 (你可以固定为你的主题色 #e67e96)
         var color = "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")";
        // var color = "#e67e96"; // 粉色

        ele.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            color: ${color};
            font-size: 16px;
            font-weight: bold;
            user-select: none;
            pointer-events: none;
            z-index: 999999;
            transition: all 1s ease-out;
            transform: translate(-50%, -50%);
        `;

        document.body.appendChild(ele);

        // 动画：向上飘并透明
        requestAnimationFrame(() => {
            ele.style.top = (e.clientY - 30) + "px";
            ele.style.opacity = 0;
        });

        // 清理 DOM
        setTimeout(() => {
            document.body.removeChild(ele);
        }, 1000);
    });
})();