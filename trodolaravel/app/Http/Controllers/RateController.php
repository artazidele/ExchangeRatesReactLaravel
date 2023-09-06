<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rate;

class RateController extends Controller
{
    public function index() {
        $rates = Rate::all();
        return response() -> json([
            'status' => 200,
            'rates' => $rates
        ]);
    }
}
