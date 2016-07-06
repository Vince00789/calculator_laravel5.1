<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TriangleController extends Controller
{

    public function showForm()
    {
        return view('triangle');
    }


}