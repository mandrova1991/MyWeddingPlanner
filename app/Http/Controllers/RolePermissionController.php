<?php

namespace App\Http\Controllers;

use App\Models\RolePermission;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    public function index()
    {
        return RolePermission::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'role_id' => ['required', 'exists:roles'],
            'permission_id' => ['required', 'exists:permissions'],
        ]);

        return RolePermission::create($data);
    }

    public function show(RolePermission $rolePermission)
    {
        return $rolePermission;
    }

    public function update(Request $request, RolePermission $rolePermission)
    {
        $data = $request->validate([
            'role_id' => ['required', 'exists:roles'],
            'permission_id' => ['required', 'exists:permissions'],
        ]);

        $rolePermission->update($data);

        return $rolePermission;
    }

    public function destroy(RolePermission $rolePermission)
    {
        $rolePermission->delete();

        return response()->json();
    }
}
