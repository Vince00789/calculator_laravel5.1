<!DOCTYPE html>
<html>

@include('partials.htmlheaderNoSidebar')

<body>

@include('partials.mainheaderNosidebar')

@include('partials.contentheader')
        <!-- Main content -->
<section class="content">
    <div style="margin-left: 5%;margin-right: 5%">
        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <strong>天啦噜！</strong> 出错了囧：<br><br>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

    </div>
    <!-- Your Page Content Here -->
    @yield('main-content')
</section><!-- /.content -->


@include('partials.footerNoSidebar')
@include('partials.scripts')
</body>
</html>