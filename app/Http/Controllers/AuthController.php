<?php

namespace App\Http\Controllers;

use App\Http\Responses\ServerResponse;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // register User
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        $newUser = User::create($validatedData);

        return ServerResponse::basicResponse(
            'You have successfully registered',
            ["user" => $newUser]
        );
    }

    public function login(Request $request)
    {

        // login User cq generate token
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required',
        ]);

        // Check if user exists or fail.
        // If user found try to check password. If fails return an errorResponse
        $user = User::where('email', $request->email)->first();
        if ( !\Auth::attempt(['email' => $request->email, 'password' => $request->password]) ) {
            return ServerResponse::errorResponse(
                "The provided credentials are incorrect.",
                "Trying to login with invalid credentials.",
                null,
                null,
                401
            );
        }

//        $request->session()->regenerate();
        session(['user' => \Auth::user()]);
        $token = $user->createToken($user->id);
        $tokenExpiration = now()->addHours(2);
        $sessionTimeOut = now()->addHours(4);

        return ServerResponse::basicResponse(
            'You have successfully logged in',
            [
                "user" => $user,
                "token" => $token->plainTextToken,
                "token_expired_time" => $tokenExpiration,
                "session_expired_time" => $sessionTimeOut,
            ]
        );
    }

    public function logout(Request $request)
    {
        // delete tokens
        $request->user()->tokens()->delete();

        return ServerResponse::basicResponse(
            'You have successfully logged out',
            null
        );
    }

    public function refreshToken(Request $request){
        $request->user()->tokens()->delete();
        $token = $request->user()->createToken($request->user()->id);
        $tokenExpiration = now()->addHours(1);

        return ServerResponse::basicResponse(
            'You have successfully logged in',
            [
                "token" => $token->plainTextToken,
                "token_expired_time" => $tokenExpiration,
            ]
        );
    }
}
