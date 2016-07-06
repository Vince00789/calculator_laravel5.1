/**
 * Created by Jay on 16/4/4.
 */
mooe = window.location.host; //全局url
$('.textarea').wysihtml5();

$(".studentsInfo").DataTable({
    "ordering": true,
    "language": {

        "lengthMenu": '每页显示 <select  class="form-control input-sm"' +
        '>' +
        '<option value="5">5</option>' +
        '<option value="10">10</option>' +
        '<option value="15">15</option>' +
        '<option value="-1">All</option>' +
        '</select> ',
        "paginate": {
            "previous": "<",
            "next": ">"
        },
        "infoFiltered": " （从_MAX_ 行记录中筛选）",
        "search": "搜索：",
        "searchPlaceholder": "输入查询信息",
        "info": "显示 _START_ 至 _END_ 行 ／共 _TOTAL_ 行",
        "infoEmpty": "无记录",
        "zeroRecords": "没有此条记录"
    }

});


function getvnc(vmid) {
    var cookie, username, password;
    $.ajax({
        method: "GET",
        url: "/proxmox/vnc",
        success: function (data) {
            cookie = data.cookie;
            username = data.username;
            password = data.password;
            document.cookie = "PVEAuthCookie=" + cookie + ";path=/";
            var url = "https://" + username + ":" + password + "@" + mooe + "/novnc/?console=kvm&novnc=1&node=proxmox&resize=scale&vmid=" + vmid;
            $('#console').html("<iframe frameborder='0' scrolling='yes' width='100%' height='100%' allowfullscreen='true'>");
            $('iframe').attr("src", url);
        },
        error: function (err) {
            console.info(err);
        }

    });


}
var Id; //获取模态框当前对应删除元素的id
function getId(id) {
     // alert(id);
    Id = id;
}

function vmDelete() {
    $.ajax({
        method: "POST",
        url: "/proxmox/delete/" + Id,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            window.location.reload(this); //TODO 优化局部重绘

        },
        error: function (err) {
            console.info(err);
        }

    });


}

function vmClone() {
    $.ajax({
        method: "POST",
        url: "/proxmox/clone/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            window.location.replace('qemus/10/1/'+data);
           // window.location.reload(this); //TODO 优化局部重绘

        },
        error: function (err) {
            console.info(err);
        }

    });


}

function vmTemplate() {
    $.ajax({
        method: "POST",
        url: "/proxmox/template/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            window.location.replace('/proxmox/qemus/10/1/'+data);
           // window.location.reload(this); //TODO 优化局部重绘

        },
        error: function (err) {
            console.info(err);
        }

    });


}
function usersDelete() {
    $.ajax({
        method: "POST",
        url: "/students/deleteuser/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/students/showall");
        },
        error: function (err) {
            console.info(err);
        }

    });


}
function studentsDelete() {
    $.ajax({
        method: "POST",
        url: "/students/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/students/show");
        },
        error: function (err) {
            console.info(err);
        }

    });


}
function teachersDelete() {
    $.ajax({
        method: "POST",
        url: "/teachers/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/teachers/show");
        },
        error: function (err) {
            console.info(err);
        }

    });


}


function adminsDelete() {
    $.ajax({
        method: "POST",
        url: "/admins/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/admins/show");
        },
        error: function (err) {
            console.info(err);
        }

    });


}

function demand_usersDelete() {
    $.ajax({
        method: "POST",
        url: "/demand_users/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/demand_users/show");
        },
        error: function (err) {
            console.info(err);
        }

    });


}

var password; // 保存密码，用来判断确认密码
//输入密码，判断该密码长度是否合法
function passwordInput(str) {

    if (str.length < 6 || str.length > 16) {
        document.getElementById("passwordHint").innerHTML = "<font size='3px' color='red' >密码为6-16位</font>";
    }
    else {
        document.getElementById("passwordHint").innerHTML = "<font size='3px' color='blue' >密码可用，请确认密码</font>";
        password = str;
    }

}

function passwordConfirm(str) {


    if (str.length < 6 || str.length > 16) {
        document.getElementById("passwordConfirmHint").innerHTML = "<font size='3px' color='red' >密码为6-16位</font>";
    }
    else if (str != password) {

        document.getElementById("passwordConfirmHint").innerHTML = "<font size='3px' color='red' >两次密码不一致,请重输</font>";

    } else {
        document.getElementById("passwordConfirmHint").innerHTML = "<font size='3px' color='blue' >两次密码一致，OK</font>";

    }

}

//邮箱判断是否合法，是否数据库中存在该邮箱
function emailIsExist(str) {

    var re = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!re.test(str)) {
        document.getElementById("emailHint").innerHTML = "<font size='3px' color='red' >邮箱为必填，请输入正确的邮箱格式</font>";

    } else {
        //判断数据库里是否存在该邮箱
        $.ajax({
            type: 'POST',
            url: "/students/email/" + str,
            data: {
                email: str
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (msg) {
                if (msg == "true") {
                    document.getElementById("emailHint").innerHTML = "<font size='3px' color='red' >该邮箱已存在，请重新输入</font>";
                } else {
                    document.getElementById("emailHint").innerHTML = "<font size='3px' color='blue' >恭喜！邮箱可用</font>";
                }
            }
        });

    }
}
var last = $("#last").val();
var current = $("#current").val();

function getusersNextPage() {
    if (current === last) {
        $("#next").addClass("disabled");
    } else {
        current++;
        console.log("当前页数：" + current);
        window.location.replace("/students/showall?page=" + current);
    }


}
function getusersPreviousPage() {
    if (current == 1) {
        $("#pre").addClass("disabled");
    } else {
        current--;
        console.log("当前页数：" + current);
        window.location.replace("/students/showall?page=" + current);

    }

}
function getstudentsNextPage() {
    if (current === last) {
        $("#next").addClass("disabled");
    } else {
        current++;
        console.log("当前页数：" + current);
        window.location.replace("/students/show?page=" + current);
    }


}
function getstudentsPreviousPage() {
    if (current == 1) {
        $("#pre").addClass("disabled");
    } else {
        current--;
        console.log("当前页数：" + current);
        window.location.replace("/students/show?page=" + current);

    }

}
function getteachersNextPage() {
    if (current === last) {
        $("#next").addClass("disabled");
    } else {
        current++;
        console.log("当前页数：" + current);
        window.location.replace("/teachers/show?page=" + current);
    }


}
function getteachersPreviousPage() {
    if (current == 1) {
        $("#pre").addClass("disabled");
    } else {
        current--;
        console.log("当前页数：" + current);
        window.location.replace("/teachers/show?page=" + current);

    }

}
function getadminsNextPage() {
    if (current === last) {
        $("#next").addClass("disabled");
    } else {
        current++;
        console.log("当前页数：" + current);
        window.location.replace("/admins/show?page=" + current);
    }


}
function getadminsPreviousPage() {
    if (current == 1) {
        $("#pre").addClass("disabled");
    } else {
        current--;
        console.log("当前页数：" + current);
        window.location.replace("/admins/show?page=" + current);

    }

}
function getdemand_usersNextPage() {
    if (current === last) {
        $("#next").addClass("disabled");
    } else {
        current++;
        console.log("当前页数：" + current);
        window.location.replace("/demand_users/show?page=" + current);
    }


}
function getdemand_usersPreviousPage() {
    if (current == 1) {
        $("#pre").addClass("disabled");
    } else {
        current--;
        console.log("当前页数：" + current);
        window.location.replace("/demand_users/show?page=" + current);

    }

}


//虚拟机前端分页：上一页
function Previous(n,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var current_page = document.getElementById("current").value;
    var num_per = n;
    if (current_page == 1) {
        $("#pre").addClass("disabled");
    } else {
        current_page--;
        window.location.replace("/proxmox/qemus/" + num_per + '/' + current_page+'/default/'+sort_type+'/'+sort_ds);
    }
}

//虚拟机前端分页：下一页
function Next(n,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var current_page = document.getElementById("current").value;
    var num_per = n;
    if (current_page == last_page) {
        $("#next").addClass("disabled");
    } else {
        current_page++;
        window.location.replace("/proxmox/qemus/" + num_per + '/' + current_page+'/default/'+sort_type+'/'+sort_ds);

    }


}

//虚拟机前端分页：首页
function FirstPage(n,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var current_page = document.getElementById("current").value;
    var num_per = n;
    window.location.replace("/proxmox/qemus/" + num_per + '/' + 1+'/default/'+sort_type+'/'+sort_ds);

}

//虚拟机前端分页：末页
function LastPage(n,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    //var current_page = document.getElementById("current").value;
    var num_per = n;
    window.location.replace("/proxmox/qemus/" + num_per + '/' + last_page+'/default/'+sort_type+'/'+sort_ds);

}
//虚拟机前端分页：跳转到指定页
function jumpToPage(n, page,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var current_page =page;
    var num_per = n;
    if (current_page == 1) {
        $("#pre").addClass("disabled");
    }
    if (current_page == last_page) {
        $("#next").addClass("disabled");
    }
    window.location.replace("/proxmox/qemus/" + num_per + '/' + current_page+'/default/'+sort_type+'/'+sort_ds);

}


//虚拟机搜索结果页：上一页按钮
function SPrevious(search,n,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var current_page = document.getElementById("current").value;
    var num_per = n;
    if (current_page == 1) {
        $("#pre").addClass("disabled");
    } else {
        current_page--;
        window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);
    }
}

//虚拟机搜索结果页：下一页按钮
function SNext(search,n,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var current_page = document.getElementById("current").value;
    var num_per = n;
    if (current_page == last_page) {
        $("#next").addClass("disabled");
    } else {
        current_page++;
        window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);

    }


}

//虚拟机搜索结果页：首页按钮
function SFirstPage(search,n,sort_type,sort_ds) {
    var num_per = n;
    var current_page = 1;
    $("#pre").addClass("disabled");
    window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);

}

//虚拟机搜索结果页：末页按钮
function SLastPage(search,n,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var num_per = n;
    var current_page = last_page;
    $("#next").addClass("disabled");
    window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);

}
//虚拟机搜索结果页：跳转到指定页 输入框
function SJumpToPage(search,n, page,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    var current_page =page;
    var num_per = n;
    if (current_page == 1) {
        $("#pre").addClass("disabled");
    }
    if (current_page == last_page) {
        $("#next").addClass("disabled");
    }
    window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);
}


//虚拟机搜索结果页，下拉框：选择每页显示虚拟机数
function S_select_VM_Num(search,n, page,sort_type,sort_ds) {
    var last_page = document.getElementById("last").value;
    //var current_page = document.getElementById("current").value;
    var current_page =1;
    var num_per = n;
    if (current_page == 1) {
        $("#pre").addClass("disabled");
    }
    if (current_page == last_page) {
        $("#next").addClass("disabled");
    }

    window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);



}


//虚拟机搜索结果页，点击状态，按照状态排序
function S_sort_by_status(search,n,v_sort_ds){
    var num_per = n;
    var current_page=1;
    var sort_type='status';
    var sort_ds=v_sort_ds;
    if(sort_ds==3){
        sort_ds=4;
        window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);
    }
    else if(sort_ds==4){
        sort_ds=3;
        window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);
    }
}

//虚拟机列表搜索结果页，点击运行时间，按照运行时间排序
function S_sort_by_uptime(search,n,v_sort_ds){

    var num_per = n;
    var current_page=1;
    var sort_type='uptime';
    var sort_ds=v_sort_ds;
    if(sort_ds==3){
        sort_ds=4;
        window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);
    }
    else if(sort_ds==4){
        sort_ds=3;
        window.location.replace("/proxmox/search?search_key=" +search+'&&num_per_page='+ num_per + '&&page=' + current_page+'&&new_id=default&&sort_type='+sort_type+'&&v_sort_desc_asc='+sort_ds);
    }
}



//虚拟机搜索框
function searchVM(s) {
    var data = 'search_key='+s+'&&num_per_page=10&&page=1&&new_id=default&&sort_type=1&&v_sort_desc_asc=3';
    //使键盘触发事件在不同浏览器中兼容
    var event=arguments.callee.caller.arguments[0]||window.event;//消除浏览器差异
    if (event.keyCode == 13) {
    //search_key=22&&num_per_page=10&&page=1&&new_id=default&&sort_type=1&&v_sort_desc_asc=3
        window.location.replace("/proxmox/search?" + data);
    }
}

//下拉框：选择每页显示虚拟机数
function select_VM_Num(s,sort_type,sort_desc_asc) {

    var num_per = s.value;
    window.location.replace("/proxmox/qemus/"+num_per+"/1/default/"+sort_type+"/"  +sort_desc_asc);
}

//虚拟机列表，点击名称，按照名称排序
function sort_by_name(n,desc_asc){

    var sort_desc_asc=desc_asc;
    var num_per = n;
    if(sort_desc_asc==3){
        sort_desc_asc=4;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/name/"  +sort_desc_asc);
    }
    else if(sort_desc_asc==4){
        sort_desc_asc=3;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/name/"  +sort_desc_asc);

    }
}



//虚拟机列表，点击状态，按照状态排序
function sort_by_status(n,desc_asc){

    var sort_desc_asc=desc_asc;
    var num_per = n;
    if(sort_desc_asc==3){
        sort_desc_asc=4;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/status/"  +sort_desc_asc);
    }
    else if(sort_desc_asc==4){
        sort_desc_asc=3;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/status/"  +sort_desc_asc);

    }
}


//虚拟机列表，点击运行时间，按照运行时间排序
function sort_by_uptime(n,desc_asc){
    var num_per = n;
    var sort_desc_asc=desc_asc;
    if(sort_desc_asc==3){
        sort_desc_asc=4;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/uptime/"  +sort_desc_asc);
    }
    else if(sort_desc_asc==4){
        sort_desc_asc=3;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/uptime/"  +sort_desc_asc);
    }
}

//虚拟机列表，点击ID，按照ID排序
function sort_by_id(n,desc_asc){
    var num_per = n;
    var sort_desc_asc=desc_asc;
    if(sort_desc_asc==3){
        sort_desc_asc=4;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/vmid/"  +sort_desc_asc);
    }
    else if(sort_desc_asc==4){
        sort_desc_asc=3;
        window.location.replace("/proxmox/qemus/"+num_per+"/1/default/vmid/"  +sort_desc_asc);
    }
}

function courseDelete() {
    $.ajax({
        method: "POST",
        url:  "/course/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function () {

            window.location.replace(mooe + "/course/showcourse");

        },
        error: function (err) {
            console.info(err);
        }

    });


}
//实验
function experimentDelete() {
    $.ajax({
        method: "POST",
        url: "/experiment/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {

            window.location.replace("/experiment/show");

        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }

    });
}
var last = $("#last").val();
var current = $("#current").val();
//分页
function getNextPage(url) {
    if (current === last) {
        $("#next").addClass("disabled");
    } else {
        current++;
        console.log("当前页数：" + current);
        window.location.replace(url + current);
    }


}
function getPreviousPage(url) {
    if (current == 1) {
        $("#pre").addClass("disabled");
    } else {
        current--;
        console.log("当前页数：" + current);
        window.location.replace(url + current);

    }

}



//教程搜索
function lessons_get_key(v) {

    var data = v;
    if (event.keyCode == 13) {
        window.location.replace("/edit/search/" + data);
        // alert(data);
    }


}
////搜索
//var appUserSelectNum = 5;//默认5
////选择每页显示用户数目
//function selectStudentsNum(s) {
//    var num = s.value;
//    appUserSelectNum = s.value;
//    window.location.replace(shami + "/app_user/indexnum/" + num);
//
//
//}
//用户搜索
function users_get_key(v) {

    var data = v;
    if (event.keyCode == 13) {
        window.location.replace("/students/searchall/" + data);
        // alert(data);
    }


}
//学生搜索
function students_get_key(v) {

    var data = v;
    if (event.keyCode == 13) {
        window.location.replace("/students/search/" + data);
        // alert(data);
    }


}
//教师搜索
function teachers_get_key(v) {

    var data = v;
    if (event.keyCode == 13) {
        window.location.replace("/teachers/search/" + data);
        // alert(data);
    }


}
function admins_get_key(v) {

    var data = v;
    if (event.keyCode == 13) {
        window.location.replace("/admins/search/" + data);
        // alert(data);
    }


}
function demand_users_get_key(v) {

    var data = v;
    if (event.keyCode == 13) {
        window.location.replace("/demand_users/search/" + data);
        // alert(data);
    }


}

function getExperiment(key) {
    if (event.keyCode == 13) {
        $.ajax({

            method: "GET",
            url: "/experiment/search/" + key,
            success: function (data) {
                console.log("success!:" + data);
                $("#search-part").html(data);
            },
            error: function (err) {
                console.info(err);
            }

        })

    }
}
function get_Experiment() {
    var key = $("#experiment_search").val();
    $.ajax({

        method: "GET",
        url: "/experiment/search/" + key,
        success: function (data) {
            $("#search-part").html(data);
        },
        error: function (err) {
            console.info(err);
        }

    })
}
//图片预览
$("#image-cover").on('change', function () {

    if (typeof (FileReader) != "undefined") {

        var image_holder = $("#image-holder");
        image_holder.empty();

        var reader = new FileReader();
        reader.onload = function (e) {
            $("<img />", {
                "src": e.target.result,
                "class": "cover_small"
            }).appendTo(image_holder);

        };
        image_holder.show();
        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
    }
});
//编辑图片预览
$("#image-edit").on('change', function () {

    if (typeof (FileReader) != "undefined") {

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("comment-cover").src = e.target.result;
        };

        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
    }
});
//文件名预览
$("#instructor").on('change', function (evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', (f.name), '</strong> (', f.type || 'n/a', ') - ', '上次修改时间: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }

    document.getElementById('outputinfo').innerHTML = '<ul>' + output.join('') + '</ul>';
});

//添加虚拟机
function addVM(vmid){
    event.preventDefault(); //屏蔽form默认事件
    var formId = "#addVmForm"+ vmid;
    var formData = new FormData($(formId)[0]);
    $.ajax({
        method: "POST",
        url: "/experiment/storevm/",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            if(res == 1 ){
                alert('亲这台虚拟机你已经添加过了~'); //TODO 错误提示窗

            }else{
               $(res).appendTo(choosed);
            }
        },

        error: function (err) {
            console.info(err);
        }

    });
}
//删除虚拟机
function deleteVM(vmid){
    var Id = $("#VM"+vmid).val();
    $.ajax({
        method: "POST",
        url: "/experiment/deletevm",
        data:{
            id:Id,
            vmid:vmid
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            console.log(res);
            if(res == 1){
                $("#btn"+vmid).remove();
            }

        },

        error: function (err) {
            console.info(err);
        }

    });
}

//虚拟机搜索框
function searchVMS(s) {
    var data = s;
    if (event.keyCode == 13) {
        $.ajax({

            method: "GET",
            url: "/experiment/search/" + key,
            success: function (data) {
                $("#search-part").html(data);
            },
            error: function (err) {
                console.info(err);
            }

        })
    }
}

//下拉框：选择每页显示虚拟机数
function selectVMS(s) {

    var vmSelectNum = s.value;
    $.ajax({

        method: "GET",
        url: "/experiment/search/" + key,
        success: function (data) {
            $("#search-part").html(data);
        },
        error: function (err) {
            console.info(err);
        }

    })

}

//克隆
function Clone(type) {
    $.ajax({
        method: "POST",
        url: "/experiment/clone",
        data: {
            vmid: Id,
            experiment_id:$('#experiment_id').val(),
            type:type
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
           $('#myQemus').html(data);

        },
        error: function (err) {
            console.info(err);
        }

    });


}

//实验报告文件名预览
$("#report").on('change', function (evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', (f.name), '</strong> (', f.type || 'n/a', ') - ', '上次修改时间: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }

    document.getElementById('reportinfo').innerHTML = '<ul>' + output.join('') + '</ul>';
});
//实验附件文件名预览
$("#attachment").on('change', function (evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', (f.name), '</strong> (', f.type || 'n/a', ') - ', '上次修改时间: ',
            f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
            '</li>');
    }

    document.getElementById('attachmentinfo').innerHTML = '<ul>' + output.join('') + '</ul>';
});





//end 实验

//用户图片编辑预览
$("#photo").on('change', function () {


    if (typeof (FileReader) != "undefined") {

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("preview").src = e.target.result;
        };

        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
    }
});


//用户图片编辑小图预览
$("#photo").on('change', function () {


    if (typeof (FileReader) != "undefined") {

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("preview2").src = e.target.result;
        };

        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
    }
});
//新上传用户图片预览
$("#fileUpload").on('change', function () {

    if (typeof (FileReader) != "undefined") {

        var image_holder = $("#image-holder");
        image_holder.empty();

        var reader = new FileReader();
        reader.onload = function (e) {
            $("<img />", {
                "src": e.target.result,
                "class": "cover_small"
            }).appendTo(image_holder);

        };
        image_holder.show();
        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
    }
});





//新建教程图片预览
$("#lesson").on('change', function () {

    if (typeof (FileReader) != "undefined") {

        var image_holder = $("#lessonPreview");
        image_holder.empty();

        var reader = new FileReader();
        reader.onload = function (e) {
            $("<img />", {
                "src": e.target.result,
                "class": "cover_small"
            }).appendTo(image_holder);

        };
        image_holder.show();
        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
    }
});
//教程编辑图片预览
$("#photo1").on('change', function () {


    if (typeof (FileReader) != "undefined") {

        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("preview1").src = e.target.result;
        };

        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
    }
});


// 以下是Get和Do的函数
function dosDelete() {

//    window.location.replace("/dos/delete/" + Id);
    console.log(Id);
    $.ajax({
        method: "POST",
        url: "/dos/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        //success: function (res) {
        //    window.location.replace("/dos/showalldo");
        //},
        //success: function (data) {
        //    console.log("success!:" + data);
        //    $("#show-all-do").html(data);
        //},
        success: function(data){
            alert(data);
            window.location.replace("/dos/showalldo");
        },
        error: function (err) {
            console.info(err);
        }

    });
}

function dosCopy() {

        window.location.replace("/dos/copydo/" + Id);

    //$.ajax({
    //    method: "POST",
    //    url: "/dos/copydo/" + Id,
    //    data: {
    //        id: Id
    //    },
    //    headers: {
    //        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    //    },
    //    //success: function (res) {
    //    //  //  window.location.replace("/dos/showalldo");
    //    //},
    //    error: function (err) {
    //        console.info(err);
    //    }
    //});
}


function dosAdmineletedo() {
    console.log(Id);
    $.ajax({
        method: "POST",
        url: "/dos/admindeletedo/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/dos/mymoredo");
        },
        //success: function (data) {
        //    console.log("success!:" + data);
        //    $("#show-all-do").html(data);
        //},
        error: function (err) {
            console.info(err);
        }

    });
}

function getDelete() {
    console.log(Id);
    $.ajax({
        method: "POST",
        url: "/gets/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/gets/showallget");
        },
        //success: function (data) {
        //    console.log("success!:" + data);
        //    html.html(data);
        //},
        error: function (err) {
            console.info(err);
        }

    });
}

function newGet() {
    $.ajax({
        method: "GET",
        url: "/gets/newget",
        success: function (data) {
            $('#newGet').html(data);
        },
        error: function (err) {
            console.info(err);
        }
    });
}

function createNew() {
    event.preventDefault(); //屏蔽form默认事件

   var formData = new FormData($('#get_picture')[0])
    $.ajax({
        method: "POST",
        url: "/gets/newgetst",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/gets/showallget");
        },
        error: function (err) {
            console.info(err);
        }
    });
}


//$("#photo").on('change', function () {
//
//    if (typeof (FileReader) != "undefined") {
//
//        var reader = new FileReader();
//        reader.onload = function (e) {
//            document.getElementById("preview").src = e.target.result;
//        };
//
//        reader.readAsDataURL($(this)[0].files[0]);
//    } else {
//        alert("你的浏览器不支持FileReader接口。无法看到图片预览");
//    }
//});



function adminDoDelete() {
    console.log(Id);
    $.ajax({
        method: "POST",
        url: "/dos/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        //success: function (res) {
        //    window.location.replace("/gets/showallget");
        //},
        success: function (data) {
            console.log("success!:" + data);
            $("#show-admin-do").html(data);
        },
        error: function (err) {
            console.info(err);
        }

    });
}

// 以上是Get和Do的函数




//教程列表分页

function getlessonsNextPage() {
    if (current === last) {
        $("#next").addClass("disabled");
    } else {
        current++;
        console.log("当前页数：" + current);
        window.location.replace("/edit/show?page=" + current);
    }


}
function getlessonsPreviousPage() {
    if (current == 1) {
        $("#pre").addClass("disabled");
    } else {
        current--;
        console.log("当前页数：" + current);
        window.location.replace("/edit/show?page=" + current);

    }


    $("#upload_get").on('change', function () {

        if (typeof (FileReader) != "undefined") {

            var image_holder = $("#get_image-holder");
            image_holder.empty();

            var reader = new FileReader();
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result,
                    "class": "cover_small"
                }).appendTo(image_holder);

            };
            image_holder.show();
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            alert("你的浏览器不支持FileReader接口。无法看到图片预览");
        }
    });

}


function lessonsDelete() {
    console.log(Id);
    $.ajax({
        method: "POST",
        url: "/edit/delete/" + Id,
        data: {
            id: Id
        },
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (res) {
            window.location.replace("/edit/lesson");
        },
        //success: function (data) {
        //    console.log("success!:" + data);
        //    html.html(data);
        //},
        error: function (err) {
            console.info(err);
        }

    });
}


