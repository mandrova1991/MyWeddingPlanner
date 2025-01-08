<?php

namespace App\Http\Controllers;

use App\Models\UserWeddingRole;
use Illuminate\Http\Request;

class UserWeddingRoleController extends Controller
{
    public function index()
    {
        return UserWeddingRole::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer'],
            'wedding_id' => ['required', 'integer'],
            'role' => ['required'],
        ]);

        return UserWeddingRole::create($data);
    }

    public function show(UserWeddingRole $userWeddingRole)
    {
        return $userWeddingRole;
    }

    public function update(Request $request, UserWeddingRole $userWeddingRole)
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer'],
            'wedding_id' => ['required', 'integer'],
            'role' => ['required'],
        ]);

        $userWeddingRole->update($data);

        return $userWeddingRole;
    }

    public function destroy(UserWeddingRole $userWeddingRole)
    {
        $userWeddingRole->delete();

        return response()->json();
    }
}
