/* 丝滑连续线条鼠标拖尾特效 (精准跟随修复版) */
(function() {
    // 配置参数
    const config = {
        trailLength: 10,      // 拖尾长度
        lineWidth: 6,         // 线条宽度
        colorStart: '#e67e96',// 你的主题粉
        colorEnd: '#5e72e4',  // 你的主题靛蓝
        lerpSpeed: 0.2,       // 跟随速度 (调大一点，跟得更紧)
        
        // ✅ 新增：位置偏移修正 (让线条避开鼠标箭头本身的遮挡)
        xOffset: 4, 
        yOffset: 4
    };

    let canvas, ctx;
    let mouse = { x: 0, y: 0 };
    let points = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let fadeLevel = 0; 

    function initCanvas() {
        canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '999999';
        
        document.body.appendChild(canvas);
        onResize();
        bindEvents();
        animate();
    }

    function onResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        let dpr = window.devicePixelRatio || 1;
        
        // 修复：明确设置 Canvas 的像素大小，防止缩放偏差
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    function bindEvents() {
        document.addEventListener('mousemove', e => {
            // ✅ 关键修复：加上偏移量，让线条出现在鼠标尖端的旁边，而不是被压在底下
            mouse.x = e.clientX + config.xOffset;
            mouse.y = e.clientY + config.yOffset;
            
            if (points.length === 0) {
                for (let i = 0; i < config.trailLength; i++) {
                    points.push({ x: mouse.x, y: mouse.y });
                }
            }
        });
        window.addEventListener('resize', onResize);
    }

    function lerpColor(a, b, amount) {
        const ah = parseInt(a.replace(/#/g, ''), 16),
            ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
            bh = parseInt(b.replace(/#/g, ''), 16),
            br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
            rr = ar + amount * (br - ar),
            rg = ag + amount * (bg - ag),
            rb = ab + amount * (bb - ab);
        return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, width, height);
        
        if (points.length === 0) return;

        // --- 1. 位置计算 ---
        const dx = mouse.x - points[0].x;
        const dy = mouse.y - points[0].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // 稍微放宽速度限制，让它跟得更紧
        const maxSpeed = 50; 

        if (dist > maxSpeed) {
            points[0].x += (dx / dist) * maxSpeed;
            points[0].y += (dy / dist) * maxSpeed;
        } else {
            points[0].x += dx * config.lerpSpeed;
            points[0].y += dy * config.lerpSpeed;
        }

        for (let i = 1; i < points.length; i++) {
            points[i].x += (points[i - 1].x - points[i].x) * config.lerpSpeed;
            points[i].y += (points[i - 1].y - points[i].y) * config.lerpSpeed;
        }

        // --- 2. 淡出逻辑 ---
        const tailIndex = points.length - 1;
        const dx_total = mouse.x - points[tailIndex].x;
        const dy_total = mouse.y - points[tailIndex].y;
        const dist_total = Math.sqrt(dx_total * dx_total + dy_total * dy_total);

        if (dist_total < 5) {
            fadeLevel -= 0.05;
        } else {
            fadeLevel += 0.1;
        }
        if (fadeLevel < 0) fadeLevel = 0;
        if (fadeLevel > 1) fadeLevel = 1;
        if (fadeLevel <= 0.01) return;

        // --- 3. 绘制 ---
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i+1];
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
            
            let progress = i / points.length;
            ctx.strokeStyle = lerpColor(config.colorStart, config.colorEnd, progress);
            ctx.lineWidth = config.lineWidth * (1 - progress);
            ctx.globalAlpha = (1 - progress * 0.8) * fadeLevel;
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    initCanvas();
})();