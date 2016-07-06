<html>
<head>
    <title>简单的图形计算器</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <script src='{{asset('/js/jquery-1.8.0.min.js')}}'></script>
</head>
<body>
<center>
    <h1>简单的图形计算器</h1>
    <a href="{{route('rect')}}">矩形</a>
    <a href="{{route('triangle')}}">三角形</a>
</center>
<hr><br>



    三角形的第一边:<input type="text" name="bian1" value="{{ old('bian1') }}" /><br>
    三角形的第一边:<input type="text" name="bian2" value="{{ old('bian2') }}" /><br>
    三角形的第一边:<input type="text" name="bian3" value="{{ old('bian3') }}" /><br>
    <button type="button" onclick="calculate()">计算</button>
    <div id="area">三角形的面积为:</div>
    <div id="perimeter">三角形的周长为:</div>

<script>
    function calculate(){
        var a = parseInt($('input[name=bian1]').val());
        var b = parseInt($('input[name=bian2]').val());
        var c = parseInt($('input[name=bian3]').val());
        var perimeter = a + b + c;

        $("#perimeter").text("三角形的周长为:"+ perimeter);

        var p = perimeter/2;
        var area = Math.sqrt((p * (p-a) * (p-b) * (p-c)));
        $("#area").text("三角形的面积为:"+ area);

    }
</script>

</body>