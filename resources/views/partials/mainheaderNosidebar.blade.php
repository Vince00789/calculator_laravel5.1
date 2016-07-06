<!--header-->
<div class="header" id="home">
    <div class="container">
        <div class="logo">
            <h3><a href="/studenthome">MOOE-Cloudlab</a></h3>
        </div>
        <div class="header-bottom">
            <div class="top-nav">
                <!-- Navbar Right Menu -->
                <div class="navbar-custom-menu">

                    <ul class="nav navbar-nav">
                        <!-- User Account Menu -->
                        <li class="dropdown user user-menu">
                            <!-- Menu Toggle Button -->
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <!-- The user image in the navbar-->
                                {{--@if( Auth::user()->avatar_img_url )--}}
                                    {{--<img src="{{Config::get("mooe.img_host")}}{{ Auth::user()->avatar_img_url}}" class="user-image" alt="User Image"/>--}}
                                {{--@else--}}
                                    {{--<img src="{{ asset('/images/1.png') }}" class="user-image" alt="User Image"/>--}}
                                    {{--@endif--}}
                                            {{--<!-- hidden-xs hides the username on small devices so only the image appears. -->--}}
                                    {{--<span class="hidden-xs">{{ Auth::user()->name }}</span>--}}
                            </a>

                            <ul class="dropdown-menu">
                                <!-- The user image in the menu -->
                                <li class="user-header">
                                    {{--@if( Auth::user()->avatar_img_url )--}}
                                        {{--<img src="{{Config::get("mooe.img_host")}}{{ Auth::user()->avatar_img_url}}" class="img-circle"--}}
                                             {{-->--}}
                                    {{--@else--}}
                                        {{--<img src="{{ asset('/images/1.png') }}" class="img-circle">--}}
                                    {{--@endif--}}
                                    {{--<p>--}}
                                        {{--{{ Auth::user()->name }}--}}
                                    {{--</p>--}}
                                </li>
                                <!-- Menu Footer-->
                                <li class="user-footer">
                                    {{--@if(Auth::user()->isDouble_role())--}}
                                        {{--<div class="switch">--}}
                                            {{--<a href="{{ url('dos/mydo') }}" class="btn btn-default btn-flat">切换到普通用户界面</a>--}}
                                        {{--</div>--}}
                                        {{--<div class="switch2">--}}
                                            {{--<a href="{{ url('homeadmin') }}" class="btn btn-default btn-flat">切换到内容管理员界面</a>--}}
                                        {{--</div>--}}
                                    {{--@endif--}}
                                    <div class="pull-left">
                                        <a href="{{  url('message/show')  }}" class="btn btn-default btn-flat">账户</a>
                                    </div>
                                    <div class="pull-right">
                                        <a href="{{ url('/auth/logout') }}" class="btn btn-default btn-flat">注销</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <!--script-->
                <script>
                    $("span.menu").click(function(){
                        $(".top-nav ul").slideToggle(500, function(){
                        });
                    });
                </script>
            </div>


            <div class="clearfix"> </div>
        </div>
        <div class="clearfix"> </div>
    </div>
</div>
<!---->