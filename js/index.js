window.addEventListener('load', function () {
    var prevArrow = document.querySelector('.prevArrow');
    var nextArrow = document.querySelector('.nextArrow');
    var bannerPic = document.querySelector('.bannerPic');
    function fun() {
        prevArrow.style.display = 'block';
        nextArrow.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器
    }
    bannerPic.addEventListener('mouseenter', fun)
    bannerPic.addEventListener('mouseleave', function () {
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
        timer = setInterval(function () {
            // 手动调用点击事件
            nextArrow.click();
        }, 3000)
    })
    prevArrow.addEventListener('mouseenter', fun);
    nextArrow.addEventListener('mouseenter', fun);
    // 动态创建bannerDot小圆点
    var ul = bannerPic.querySelector('ul');
    var bannerDot = document.querySelector('.bannerDot');
    var banner = document.querySelector('.banner');
    var bannerWidhth = banner.offsetWidth;
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建span
        var span = document.createElement('span');
        bannerDot.appendChild(span);
        // 自定义属性，创建小圆点索引号
        span.setAttribute('index', i);
        // 小圆点排他思想
        span.addEventListener('click', function () {
            for (var i = 0; i < bannerDot.children.length; i++) {
                bannerDot.children[i].className = '';
            }
            this.className = 'current';
            // 点击小圆点，移动图片
            //  得到小圆点index序号
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            // console.log(index);
            // console.log(bannerWidhth);
            animate(bannerPic, -bannerWidhth * index);
        })
    }
    bannerDot.children[0].className = 'current';
    // 克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动
    var num = 0;
    // circle 控制小圆点播放;
    var circle = 0;
    var flag = true;// flag节流阀
    nextArrow.addEventListener('click', function () {
        if (flag) {
            flag = false; // 关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(bannerPic, -num * bannerWidhth, function () {
                flag = true;
            });
            circle++;
            if (circle == bannerDot.children.length) {
                circle = 0;
            };
            circleChange();
        }
    })
    // 左侧
    prevArrow.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * bannerWidhth + 'px';
            }
            num--;
            animate(bannerPic, -num * bannerWidhth, function () {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ul.children.length - 1;
            }
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < bannerDot.children.length; i++) {
            bannerDot.children[i].className = '';

        }
        bannerDot.children[circle].className = 'current';
    }
    // 图片自动播放
    var timer = setInterval(function () {
        // 手动调用点击事件
        nextArrow.click();
    }, 3000)


});
