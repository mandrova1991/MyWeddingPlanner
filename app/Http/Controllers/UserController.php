<?php

namespace App\Http\Controllers;

use App\Http\Responses\ServerResponse;
use App\Models\Wedding;

class UserController extends Controller
{
    public function weddingUsers(Wedding $wedding)
    {

        return ServerResponse::basicResponse(
            'Users retrieved successfully!',
            $wedding->users,
        );
    }
}
