//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var current_li, li_index;

$(".vm_edit_next").click(function () {
    var input_name = $("#vm_edit_name_id")[0].value;
    var input_disk_id = $("#vm_edit_disk_id")[0].value;
    var input_socket_id = $("#vm_edit_socket_id")[0].value;
    var input_core_id = $("#vm_edit_core_id")[0].value;
    var input_memory_id = $("#vm_edit_memory_id")[0].value;

    //判断这是当前第几个next按钮
    var button_index = $(this).parent().index();

    if (button_index == 2) {   //2指name下一页按钮
        if (input_name != '') {
            vm_edit_do_animate(this);
        } else {
            return false;
        }
    }
    if (button_index == 5) {   //5指硬盘：下一页按钮
        if (input_disk_id != '') {
            vm_edit_do_animate(this);
        } else {
            alert("硬盘大小不能为空")
            return false;
        }
    }

    if (button_index == 6) {   //6指cpu：下一页按钮
        if (input_core_id != '') {
            vm_edit_do_animate(this);
        } else {
            alert("sockets和核数量都不能为空")
            return false;
        }
    }

    if (button_index == 7) {   //7指内存：下一页按钮
        if (input_memory_id != '') {
            vm_edit_do_animate(this);
        } else {
            alert("内存大小不能为空")
            return false;
        }
    }

    console.log("这是虚拟机编辑界面外层的do_animate");
    vm_edit_do_animate(this);

});


//animate函数封装起来，要传递this对象，获取当前所在各个元素
function vm_edit_do_animate(p_this) {
    if (animating) return false;
    animating = true;

    current_fs = $(p_this).parent();
    next_fs = $(p_this).parent().next();

    //去掉其他div的高亮
    $("#ve_progressbar li div").removeClass("active");
    console.log("去掉高亮");

    //当前位置div高亮
    $("#ve_progressbar li div").eq($("fieldset").index(next_fs)).addClass("active");

    //activate next step on progressbar using the index of next_fs
    //$("#ve_progressbar li div").eq($("fieldset").index(next_fs)).addClass("active");


    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale current_fs down to 80%
            scale = 1 - (1 - now) * 0.2;
            //2. bring next_fs from the right(50%)
            left = (now * 50) + "%";
            //3. increase opacity of next_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'transform': 'scale(' + scale + ')'});
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
}


$(".vm_edit_previous").click(function () {
    if (animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //de-activate current step on progressbar
   // $("#ve_progressbar li div").eq($("fieldset").index(current_fs)).removeClass("active");

    //去掉其他div的高亮
    $("#ve_progressbar li div").removeClass("active");
    console.log("去掉高亮");

    //当前位置div高亮
    $("#ve_progressbar li div").eq($("fieldset").index(previous_fs)).addClass("active");



    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
        step: function (now, mx) {
            //as the opacity of current_fs reduces to 0 - stored in "now"
            //1. scale previous_fs from 80% to 100%
            scale = 0.8 + (1 - now) * 0.2;
            //2. take current_fs to the right(50%) - from 0%
            left = ((1 - now) * 50) + "%";
            //3. increase opacity of previous_fs to 1 as it moves in
            opacity = 1 - now;
            current_fs.css({'left': left});
            previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
        },
        duration: 800,
        complete: function () {
            current_fs.hide();
            animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
    });
});

$("#ve_progressbar li div").click(function () {

    //获取当前display为true的的fieldset对象
    current_fs = $("fieldset:visible");

    //找到点击的div所对应的li的索引
    var div_index = $(this).parent().index();

    console.log("div_index"+div_index);
    var display_div_index = current_fs.index() - 2;


    if (div_index == 7) {
        testHtml = "";
        document.getElementById("vm_edit_showDiv").innerHTML = testHtml;

        var name = document.getElementById("vm_edit_name_id").value;
        addOneLine("名称", name);

        //单选框循环遍历，获取选中值
        for (var i = 0; i < document.getElementsByName("vm_edit_os").length; i++) {
            if (document.getElementsByName("vm_edit_os")[i].checked)
                var os = document.getElementsByName("vm_edit_os")[i].value;
        }
        addOneLine("系统", os);

        var iso = document.getElementById("vm_edit_iso_id").value;
        addOneLine("镜像", iso);

        var disk = document.getElementById("vm_edit_disk_id").value;
        addOneLine("硬盘大小", disk + "GB");

        var socket = document.getElementById("vm_edit_socket_id").value;
        addOneLine("socket", socket);

        var cores = document.getElementById("vm_edit_core_id").value;
        addOneLine("内核", cores);

        var memory = document.getElementById("vm_edit_memory_id").value;
        addOneLine("内存", memory + "MB");

        //单选框循环遍历，获取选中值
        for (var i = 0; i < document.getElementsByName("vm_edit_net").length; i++) {
            if (document.getElementsByName("vm_edit_net")[i].checked)
                var network = document.getElementsByName("vm_edit_net")[i].value;
        }
        addOneLine("网络", network);

        // alert(testHtml);

        document.getElementById("vm_edit_showDiv").innerHTML = testHtml;

        function addOneLine(key, value) {
            testHtml += "<p>";
            testHtml += key + ":";
            testHtml += value;
            testHtml += "<p>";
        }

    }

    //$("#ve_progressbar li div").eq("+div_index+").addClass("active");

    //获取下一个fieldset对象，准备显示
    next_fs = $("fieldset:eq(" + div_index + ")");

    //去掉其他div的高亮
    $("#ve_progressbar li div").removeClass("active");
    console.log("去掉高亮");

    //当前位置div高亮
    $("#ve_progressbar li div").eq($("fieldset").index(next_fs)).addClass("active");
    if (display_div_index != div_index) {
        next_fs.show();

        current_fs.animate({opacity: 0}, {
            //step方法是为了使current_fs在消失的过程中，增加一个缓冲的效果
            step: function (now, mx) {
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale(' + scale + ')'});
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }
});


jQuery.easing.jswing = jQuery.easing.swing;
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad", swing: function (e, f, a, h, g) {
        return jQuery.easing[jQuery.easing.def](e, f, a, h, g)
    }, easeInQuad: function (e, f, a, h, g) {
        return h * (f /= g) * f + a
    }, easeOutQuad: function (e, f, a, h, g) {
        return -h * (f /= g) * (f - 2) + a
    }, easeInOutQuad: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f + a
        }
        return -h / 2 * ((--f) * (f - 2) - 1) + a
    }, easeInCubic: function (e, f, a, h, g) {
        return h * (f /= g) * f * f + a
    }, easeOutCubic: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f + 1) + a
    }, easeInOutCubic: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f + 2) + a
    }, easeInQuart: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f + a
    }, easeOutQuart: function (e, f, a, h, g) {
        return -h * ((f = f / g - 1) * f * f * f - 1) + a
    }, easeInOutQuart: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f + a
        }
        return -h / 2 * ((f -= 2) * f * f * f - 2) + a
    }, easeInQuint: function (e, f, a, h, g) {
        return h * (f /= g) * f * f * f * f + a
    }, easeOutQuint: function (e, f, a, h, g) {
        return h * ((f = f / g - 1) * f * f * f * f + 1) + a
    }, easeInOutQuint: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return h / 2 * f * f * f * f * f + a
        }
        return h / 2 * ((f -= 2) * f * f * f * f + 2) + a
    }, easeInSine: function (e, f, a, h, g) {
        return -h * Math.cos(f / g * (Math.PI / 2)) + h + a
    }, easeOutSine: function (e, f, a, h, g) {
        return h * Math.sin(f / g * (Math.PI / 2)) + a
    }, easeInOutSine: function (e, f, a, h, g) {
        return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a
    }, easeInExpo: function (e, f, a, h, g) {
        return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a
    }, easeOutExpo: function (e, f, a, h, g) {
        return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a
    }, easeInOutExpo: function (e, f, a, h, g) {
        if (f == 0) {
            return a
        }
        if (f == g) {
            return a + h
        }
        if ((f /= g / 2) < 1) {
            return h / 2 * Math.pow(2, 10 * (f - 1)) + a
        }
        return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a
    }, easeInCirc: function (e, f, a, h, g) {
        return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a
    }, easeOutCirc: function (e, f, a, h, g) {
        return h * Math.sqrt(1 - (f = f / g - 1) * f) + a
    }, easeInOutCirc: function (e, f, a, h, g) {
        if ((f /= g / 2) < 1) {
            return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a
        }
        return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a
    }, easeInElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
    }, easeOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k) == 1) {
            return e + l
        }
        if (!j) {
            j = k * 0.3
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e
    }, easeInOutElastic: function (f, h, e, l, k) {
        var i = 1.70158;
        var j = 0;
        var g = l;
        if (h == 0) {
            return e
        }
        if ((h /= k / 2) == 2) {
            return e + l
        }
        if (!j) {
            j = k * (0.3 * 1.5)
        }
        if (g < Math.abs(l)) {
            g = l;
            var i = j / 4
        } else {
            var i = j / (2 * Math.PI) * Math.asin(l / g)
        }
        if (h < 1) {
            return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e
        }
        return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e
    }, easeInBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * (f /= h) * f * ((g + 1) * f - g) + a
    }, easeOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a
    }, easeInOutBack: function (e, f, a, i, h, g) {
        if (g == undefined) {
            g = 1.70158
        }
        if ((f /= h / 2) < 1) {
            return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a
        }
        return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a
    }, easeInBounce: function (e, f, a, h, g) {
        return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a
    }, easeOutBounce: function (e, f, a, h, g) {
        if ((f /= g) < (1 / 2.75)) {
            return h * (7.5625 * f * f) + a
        } else {
            if (f < (2 / 2.75)) {
                return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a
            } else {
                if (f < (2.5 / 2.75)) {
                    return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a
                } else {
                    return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a
                }
            }
        }
    }, easeInOutBounce: function (e, f, a, h, g) {
        if (f < g / 2) {
            return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a
        }
        return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a
    }
});