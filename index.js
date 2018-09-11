window.onload = () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('example');
    const context = canvas.getContext('2d');

    const r = 150;

    setInterval(function() {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        context.beginPath();
        // 画出分钟刻度 360 / 60 = 6
        for(let i = 0; i < 60; i++) {
            context.moveTo(200, 200);
            context.arc(200, 200, r, 6 * (i) * Math.PI / 180, 6 * (i + 1) * Math.PI / 180, false);
            context.stroke();
        }
        context.closePath();
        context.fillStyle = 'white';
        context.beginPath();
        context.moveTo(200, 200);
        context.arc(200, 200, r * 90 / 100, 0, 360 * Math.PI / 180, false);
        context.closePath();
        context.fill();

        context.lineWidth = 3;    
        context.beginPath();
        // 画出小时刻度线 360 / 12 = 30
        for(let i = 0; i < 12; i++) {
            context.moveTo(200, 200);
            context.arc(200, 200, r, 30 * (i) * Math.PI / 180, 30 * (i + 1) * Math.PI / 180, false);
            context.stroke();
        }
        context.closePath();
        context.fillStyle = 'white';
        context.beginPath();
        context.moveTo(200, 200);
        context.arc(200, 200, r * 85 / 100, 0, 360 * Math.PI / 180, false);
        context.closePath();
        context.fill();
        const date = new Date();
        const hour = date.getHours();
        const min = date.getMinutes();
        const second = date.getSeconds();
        // 时分秒的度数
        const hourDeg = (-90 + hour * 30 + min * 30 / 60) * Math.PI / 180;
        const minDeg = (-90 + min * 6) * Math.PI / 180;
        const secondDeg = (-90 +second * 6) * Math.PI / 180;

        // 画出时针
        context.beginPath();
        context.lineWidth = 3;
        context.moveTo(200, 200);
        context.arc(200, 200, r * 60 / 100, hourDeg, hourDeg, false);
        context.stroke();
        context.closePath();

        // 画出分针
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(200, 200);
        context.arc(200, 200, r * 70 / 100, minDeg, minDeg, false);
        context.stroke();
        context.closePath();

        // 画出秒针
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(200, 200);
        context.arc(200, 200, r * 80 / 100, secondDeg, secondDeg, false);
        context.stroke();
        context.closePath();
    }, 1000);

}