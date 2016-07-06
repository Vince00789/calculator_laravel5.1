<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
// 首页路由...
Route::get('/', function () {
    return view('welcome');
});

//矩形表单页面路由
Route::get('/rect',[

    'as' => 'rect','uses' => 'RectController@showForm'

]);


//矩形计算结果页面路由
Route::post('/rect/results',[

    'as' => 'results','uses' => 'RectController@postResults'

]);





//三角形表单页面路由
Route::get('/triangle',[

    'as' => 'triangle','uses' => 'TriangleController@showForm'

]);


//三角形计算结果页面路由
Route::post('/triangle/results',[

    'as' => 'results','uses' => 'TriangleController@postResults'

]);







// 认证路由...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');
// 注册路由...
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

