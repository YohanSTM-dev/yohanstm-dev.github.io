/* ============================================================
   MACOS-BG.JS — Fond style macOS Catalina / Big Sur
   Ciel rose-violet au coucher du soleil + montagne silhouette
============================================================ */

(function () {
    function initMacosBg() {
        var container = document.getElementById("background-3d");
        if (!container) return;

        /* Clear previous content */
        container.innerHTML = "";

        var canvas = document.createElement("canvas");
        canvas.style.cssText =
            "position:absolute;inset:0;width:100%;height:100%;display:block;z-index:0;";
        container.appendChild(canvas);

        var ctx = canvas.getContext("2d");

        function resize() {
            canvas.width  = window.innerWidth;
            canvas.height = window.innerHeight;
            draw();
        }

        function draw() {
            var W = canvas.width;
            var H = canvas.height;

            /* SKY gradient — macOS Catalina sunset palette */
            var sky = ctx.createLinearGradient(0, 0, 0, H * 0.72);
            sky.addColorStop(0.00, "#0e1023");
            sky.addColorStop(0.18, "#1a1535");
            sky.addColorStop(0.38, "#3d1f5a");
            sky.addColorStop(0.56, "#7a2a60");
            sky.addColorStop(0.72, "#c96060");
            sky.addColorStop(0.86, "#e8956a");
            sky.addColorStop(1.00, "#f5c98a");
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, W, H);

            /* Horizon glow */
            var horizonY = H * 0.56;
            var glow = ctx.createRadialGradient(W * 0.5, horizonY, 0, W * 0.5, horizonY, W * 0.55);
            glow.addColorStop(0.00, "rgba(255,180,100,0.40)");
            glow.addColorStop(0.35, "rgba(240,120,80,0.18)");
            glow.addColorStop(1.00, "rgba(0,0,0,0.0)");
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, W, H);

            /* Soft cloud wisps */
            var bands = [0.14, 0.23, 0.32, 0.42, 0.50];
            bands.forEach(function(by, i) {
                var cy = H * by;
                var alpha = 0.04 + i * 0.015;
                var grad = ctx.createLinearGradient(0, cy - 28, 0, cy + 28);
                grad.addColorStop(0, "rgba(255,225,200,0)");
                grad.addColorStop(0.5, "rgba(255,225,200," + alpha + ")");
                grad.addColorStop(1, "rgba(255,225,200,0)");
                ctx.fillStyle = grad;
                ctx.fillRect(0, cy - 28, W, 56);
            });

            /* Stars — upper sky only */
            drawStars(ctx, W, H * 0.48);

            /* Ground / sea below horizon */
            var ground = ctx.createLinearGradient(0, horizonY, 0, H);
            ground.addColorStop(0.0, "#c47050");
            ground.addColorStop(0.2, "#6b3040");
            ground.addColorStop(0.6, "#1e1228");
            ground.addColorStop(1.0, "#0a0812");
            ctx.fillStyle = ground;
            ctx.fillRect(0, horizonY, W, H - horizonY);

            /* Mountain silhouette */
            drawMountain(ctx, W, H, horizonY);
        }

        function drawStars(ctx, W, H) {
            for (var i = 0; i < 110; i++) {
                var x = Math.random() * W;
                var y = Math.random() * H;
                var r = Math.random() * 1.1 + 0.2;
                var a = Math.random() * 0.5 + 0.08;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,248,235," + a + ")";
                ctx.fill();
            }
        }

        function drawMountain(ctx, W, H, horizonY) {
            /* Main mountain — macOS Catalina island profile */
            var mountGrad = ctx.createLinearGradient(0, horizonY * 0.7, 0, horizonY + 10);
            mountGrad.addColorStop(0.0, "#2a1520");
            mountGrad.addColorStop(0.5, "#180e18");
            mountGrad.addColorStop(1.0, "#0d0812");

            ctx.beginPath();
            ctx.moveTo(0, horizonY + 8);
            ctx.lineTo(0, H * 0.84);
            ctx.lineTo(W * 0.04, H * 0.78);
            ctx.lineTo(W * 0.08, H * 0.75);
            ctx.lineTo(W * 0.12, H * 0.73);
            ctx.lineTo(W * 0.16, H * 0.70);
            ctx.lineTo(W * 0.20, H * 0.72);
            ctx.bezierCurveTo(W * 0.25, H * 0.63, W * 0.30, H * 0.57, W * 0.34, H * 0.52);
            /* Main peak — tall, sharp */
            ctx.bezierCurveTo(W * 0.36, H * 0.48, W * 0.38, H * 0.43, W * 0.40, H * 0.41);
            ctx.bezierCurveTo(W * 0.42, H * 0.39, W * 0.43, H * 0.40, W * 0.44, H * 0.43);
            /* Saddle then secondary peak */
            ctx.bezierCurveTo(W * 0.46, H * 0.47, W * 0.48, H * 0.47, W * 0.50, H * 0.45);
            ctx.bezierCurveTo(W * 0.52, H * 0.43, W * 0.53, H * 0.42, W * 0.545, H * 0.44);
            /* Ridge continues right */
            ctx.bezierCurveTo(W * 0.57, H * 0.47, W * 0.60, H * 0.51, W * 0.64, H * 0.54);
            ctx.bezierCurveTo(W * 0.68, H * 0.57, W * 0.72, H * 0.60, W * 0.76, H * 0.63);
            ctx.lineTo(W * 0.80, H * 0.68);
            ctx.lineTo(W * 0.84, H * 0.66);
            ctx.lineTo(W * 0.88, H * 0.70);
            ctx.lineTo(W * 0.92, H * 0.73);
            ctx.lineTo(W * 0.96, H * 0.75);
            ctx.lineTo(W, H * 0.78);
            ctx.lineTo(W, horizonY + 8);
            ctx.closePath();
            ctx.fillStyle = mountGrad;
            ctx.fill();

            /* Foreground hill — darker, closer */
            var fgGrad = ctx.createLinearGradient(0, H * 0.78, 0, H);
            fgGrad.addColorStop(0.0, "#180e16");
            fgGrad.addColorStop(1.0, "#0a0812");
            ctx.beginPath();
            ctx.moveTo(0, H);
            ctx.lineTo(0, H * 0.92);
            ctx.bezierCurveTo(W * 0.10, H * 0.82, W * 0.18, H * 0.79, W * 0.26, H * 0.82);
            ctx.bezierCurveTo(W * 0.32, H * 0.85, W * 0.37, H * 0.77, W * 0.44, H * 0.76);
            ctx.bezierCurveTo(W * 0.50, H * 0.75, W * 0.56, H * 0.78, W * 0.62, H * 0.81);
            ctx.bezierCurveTo(W * 0.70, H * 0.85, W * 0.78, H * 0.87, W * 0.86, H * 0.82);
            ctx.bezierCurveTo(W * 0.92, H * 0.79, W * 0.97, H * 0.83, W, H * 0.86);
            ctx.lineTo(W, H);
            ctx.closePath();
            ctx.fillStyle = fgGrad;
            ctx.fill();
        }

        resize();
        window.addEventListener("resize", resize);

        /* Subtle parallax on mouse move */
        var targetX = 0;
        var currentX = 0;
        var rafId;

        document.addEventListener("mousemove", function(e) {
            targetX = (e.clientX / window.innerWidth - 0.5) * 14;
        });

        function tick() {
            rafId = requestAnimationFrame(tick);
            var diff = targetX - currentX;
            if (Math.abs(diff) > 0.1) {
                currentX += diff * 0.04;
                canvas.style.transform = "translateX(" + currentX.toFixed(2) + "px) scale(1.015)";
            }
        }
        tick();

        document.addEventListener("visibilitychange", function() {
            if (document.hidden) { cancelAnimationFrame(rafId); }
            else { tick(); }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMacosBg);
    } else {
        initMacosBg();
    }
})();
