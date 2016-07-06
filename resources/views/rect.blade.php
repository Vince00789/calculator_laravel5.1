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
矩形的宽:<input type="text" name="width" value="{{ old('width') }}" /><br>
矩形的高:<input type="text" name="height" value="{{ old('height') }}" /><br>
<button type="button" onclick="calculate()">计算</button>
<div id="area">矩形的面积为:</div>
<div id="perimeter">矩形的周长为:</div>

<script>
   function calculate(){
      var a = parseInt($('input[name=width]').val());
      var b = parseInt($('input[name=height]').val());
      var perimeter = a + b ;

      $("#perimeter").text("三角形的周长为:"+ perimeter);


      var area = a * b;
      $("#area").text("三角形的面积为:"+ area);

   }
</script>

</body>