window.onload = () => {
    let deviceWidth = 0;
    let isPause = false;
    const getPixelRatio = function(context) {
        const backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
    };
    const setWidthHight = function(canvas, ratio, w) {
        canvas.width = w ? w * ratio : deviceWidth * ratio;
        canvas.height = w ? w * ratio : (deviceWidth + 100) * ratio;
        canvas.style.width = w ? w + 'px' : deviceWidth + 'px';
        canvas.style.height = w ? w + 'px' : (deviceWidth + 100) + 'px';

        return canvas;
    }
    const rotate = function(canvas, disc, cover) {
        // canvas.width/height: 592px
        // x/y: 148px
        
        
        var x = canvas.width / 4; //画布宽度的一半
        var y = canvas.height / 4;//画布高度的一半
        
        turnContext.clearRect(0,0, canvas.width, canvas.height);//先清掉画布上的内容
        btnContext.clearRect(0,0, 56, 56);//先清掉画布上的内容
        // turnContext.save();       
        turnContext.translate(x, y);//将绘图原点移到画布中点
        turnContext.rotate(0.2 * Math.PI / 180);//旋转角度
        turnContext.translate(-x, -y);//将画布原点移动
        circleImg(turnContext, cover, (296 - 180) / 2, (296 - 180) / 2, cover.width / 4);
        turnContext.drawImage(disc, 0, 0, 296 * ratio, 296 * ratio);
        // turnContext.restore();
        
        
        if (!isPause) {
            requestAnimationFrame(() => rotate(turnCanvas, disc, cover));
        } else {
            btnContext.drawImage(playBtn, 0,  0, 56 * ratio, 56 * ratio);
        }
    }
    function circleImg(ctx, img, x, y, r) {
        ctx.save();
        var d = 2 * r;
        var cx = x + r;
        var cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);

        ctx.clip();
        ctx.drawImage(img, x * 2, y * 2, d * 2, d * 2);

        ctx.restore();
      }
    /** @type {HTMLCanvasElement} */
    
    deviceWidth = document.body.clientWidth || document.documentElement.clientWidth;
    let wrapCanvas = document.getElementById('song-disc-wrap');
    const wrapContext = wrapCanvas.getContext('2d');

    let turnCanvas = document.getElementById('song-disc-turn');
    const turnContext = turnCanvas.getContext('2d');

    let btnCanvas = document.getElementById('song-disc-btn');
    const btnContext = btnCanvas.getContext('2d');

    const ratio = getPixelRatio(wrapContext);

    const disc = new Image();
    disc.src = './images/disc-ip6.png';

    const needle = new Image();
    needle.src = './images/needle-ip6.png';

    const playBtn = new Image();
    playBtn.src = './images/play_btn-ip6.png';

    disc.onload = function() {
        
        wrapContext.drawImage(needle, deviceWidth - needle.width / 8, 0, 96 * ratio, 137 * ratio);
        
        const cover = new Image();
        cover.src = 'http://p1.music.126.net/uomXAcwMBM8Tk5MBDFvYaw==/6663040464990704.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0';
        cover.onload = function() {
            console.log(deviceWidth, cover.width);
            turnContext.drawImage(disc, 0, 0, 296 * ratio, 296 * ratio);
            
            circleImg(turnContext, cover, (296 - 180) / 2, (296 - 180) / 2, cover.width / 4);
            
            // 填充绘制的圆

            if (isPause) {
                btnContext.drawImage(playBtn, 0, 0, 56 * ratio, 56 * ratio);
            } else {
                requestAnimationFrame(() => rotate(turnCanvas, disc, cover))
            }
            // 监听turnCanvas的点击事件
            wrapCanvas.addEventListener('click', function() {
                console.log('in');
                
                isPause = !isPause;
                if (!isPause) {
                    requestAnimationFrame(() => rotate(turnCanvas, disc, cover));
                }
            }, false);
        }
    }

}