<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return response()->json([
            'message' => "Register successful",
        ]);
    }

    public function login(Request $request)
    {
        return response()->json([
            'message' => "Login successful",
        ]);
    }

    public function logout(Request $request)
    {
        return response()->json([
            'message' => "Logout successful",
        ]);
    }
}
