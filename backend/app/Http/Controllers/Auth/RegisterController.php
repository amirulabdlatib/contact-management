<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'eamil', 'unique:users'],
            'password' => ['required', 'confirmed']
        ]);

        $user = User::create($data);
        Auth::login($user);

        return response()->json([
            'message' => 'Registration successful',
            'user' => $user,
        ]);
    }
}
