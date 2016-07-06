<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RectController extends Controller
{

    public function showForm(){
        return view('rect');
    }



    public function postResults(Request $request){

        $width = $request->get('width');
        $height = $request->get('height');

        //计算周长
        $perimeter = 2 * ($width + $height);


        //计算面积
        $area = $width * $height;

        return view('rect_results')->with('perimeter',$perimeter)->with('area',$area);
    }
}