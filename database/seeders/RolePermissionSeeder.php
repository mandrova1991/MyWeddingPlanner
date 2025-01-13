<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = config('permission.modules');
        $roles = config('permission.roles');

        foreach ($roles as $role => $permissions) {
            Role::firstOrCreate(['name' => $role]);
        }

        foreach ($modules as $module) {
            foreach ($module['permissions'] as $permission) {
                $permission = Permission::firstOrCreate(['name' => $permission]);
                $this->assignPermissionToRoles($permission, $roles);
            }
        }
    }

    protected function assignPermissionToRoles(Permission $permission, array $roles)
    {
        foreach ($roles as $role => $permissions) {
            if (in_array($permission->name, $permissions)) {
                $role = Role::firstOrCreate(['name' => $role]);
                $role->permissions()->syncWithoutDetaching([$permission->id]);
            }
        }
    }
}
