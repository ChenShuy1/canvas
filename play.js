window.onload = () => {
    let deviceWidth = 0;
    const getPixelRatio = function(context) {
        const backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
    };
    const setWidthHight = function(canvas, ratio) {
        deviceWidth = document.body.clientWidth || document.documentElement.clientWidth;
        // const deviceHeight = document.body.clientHeight || document.documentElement.clientHeight;

        canvas.width = deviceWidth * ratio;
        canvas.height = (deviceWidth + 100) * ratio;
        canvas.style.width = deviceWidth + 'px';
        canvas.style.height = (deviceWidth + 100) + 'px';

        return canvas;
    }
    /** @type {HTMLCanvasElement} */
    let canvas = document.getElementById('play');
    const context = canvas.getContext('2d');

    const ratio = getPixelRatio(context);

    canvas = setWidthHight(canvas, ratio);

    const disc = new Image();
    disc.src = './images/disc.png';

    const needle = new Image();
    needle.src = './images/needle.png';

    disc.onload = function() {
        console.log(deviceWidth / 2);
        
        context.drawImage(disc, (deviceWidth - disc.width) / 2, 0, disc.width, disc.height);
        context.drawImage(needle, deviceWidth / 2, 0, 96 * ratio, 137 * ratio);
    }
}