window.onload = () => {
    let deviceWidth = 0;
    let isPause = true;
    const getPixelRatio = function(context) {
        const backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
    };
    const setWidthHight = function() {
        // wrapCanvas.style.width = deviceWidth + 'px';
        // wrapCanvas.style.height = deviceWidth + 'px';
        console.log(deviceWidth);
        
        if (deviceWidth <= 359) {
            rollwrap = 150;
            turnCanvas.style.width = '248px';
            turnCanvas.width = '496';
            turnCanvas.style.height = '248px';
            turnCanvas.height = '496';
            btnCanvas.style.width = '50px';
            btnCanvas.width = '100';
            btnCanvas.style.height = '50px';
            btnCanvas.height = '100';
        } else if (deviceWidth <= 413) {
            rollwrap = 184;
            turnCanvas.style.width = '296px';
            turnCanvas.width = '592';
            turnCanvas.style.height = '296px';
            turnCanvas.height = '592';
            btnCanvas.style.width = '56px';
            btnCanvas.width = '112';
            btnCanvas.style.height = '56px';
            btnCanvas.height = '112';
        } else {
            rollwrap = 212;
            turnCanvas.style.width = '342px';
            turnCanvas.width = '684';
            turnCanvas.style.height = '342px';
            turnCanvas.height = '684';
            btnCanvas.style.width = '65px';
            btnCanvas.width = '130';
            btnCanvas.style.height = '65px';
            btnCanvas.height = '130';
        }
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
    let rollwrap = 0;
    // let wrapCanvas = document.getElementById('song-disc-wrap');
    // const wrapContext = wrapCanvas.getContext('2d');

    let turnCanvas = document.getElementById('song-disc-turn');
    const turnContext = turnCanvas.getContext('2d');

    let btnCanvas = document.getElementById('song-disc-btn');
    const btnContext = btnCanvas.getContext('2d');

    const ratio = getPixelRatio(turnContext);
    setWidthHight();

    const disc = new Image();
    disc.src = './images/disc.png';

    const needle = new Image();
    needle.src = './images/needle-ip6.png';

    const playBtn = new Image();
    playBtn.src = './images/play_btn-ip6.png';

    disc.onload = function() {
        
        // wrapContext.drawImage(needle, deviceWidth - needle.width / 8, 0, 96 * ratio, 137 * ratio);
        
        const cover = new Image();
        cover.src = 'http://p1.music.126.net/uomXAcwMBM8Tk5MBDFvYaw==/6663040464990704.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0';
        cover.onload = function() {
            turnContext.drawImage(disc, 0, 0, turnCanvas.width , turnCanvas.width);
            console.log(rollwrap);
            
            circleImg(turnContext, cover, (turnCanvas.width / 2 - rollwrap) / 2, (turnCanvas.width / 2 - rollwrap) / 2, rollwrap / 2);
            
            // 填充绘制的圆

            if (isPause) {
                btnContext.drawImage(playBtn, 0, 0, btnCanvas.width , btnCanvas.width);
            } else {
                // requestAnimationFrame(() => rotate(turnCanvas, disc, cover))
            }
            // // 监听turnCanvas的点击事件
            // wrapCanvas.addEventListener('click', function() {
            //     console.log('in');
                
            //     isPause = !isPause;
            //     if (!isPause) {
            //         requestAnimationFrame(() => rotate(turnCanvas, disc, cover));
            //     }
            // }, false);
        }
    }

}