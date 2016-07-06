<html>
<head>
    <title>简单的图形计算器</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
</head>
<body>
<center>
    <h1>简单的图形计算器</h1>
    <a href="{{route('rect')}}">矩形</a>
    <a href="{{route('triangle')}}">三角形</a>
</center>
<hr><br>
<h3>三角的周长为:{{$perimeter}}<br></h3>
<h3>三角的面积为:{{$area}}<br></h3>