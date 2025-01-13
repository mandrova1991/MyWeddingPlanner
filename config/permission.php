<?php

return [
    'modules' => [
        'task' => [
            'name' => 'Task Management',
            'permissions' => [
                'create_task',
                'update_task',
                'delete_task',
                'view_task'
            ]
        ],
        'task_category' => [
            'name' => 'TaskCategory Management',
            'permissions' => [
                'create_task_category',
                'update_task_category',
                'delete_task_category',
                'view_task_category'
            ]
        ],
        'wedding' => [
            'name' => 'Wedding Management',
            'permissions' => [
                'create_wedding',
                'update_wedding',
                'delete_wedding',
                'view_wedding'
            ]
        ]
    ],

    'roles' => [
        'admin' => [
            'create_task',
            'update_task',
            'delete_task',
            'view_task',
            'create_task_category',
            'update_task_category',
            'delete_task_category',
            'view_task_category',
            'update_wedding',
            'delete_wedding',
            'view_wedding'
        ],
        'planner' => [
            'create_task',
            'update_task',
            'delete_task',
            'view_task',
            'create_task_category',
            'update_task_category',
            'delete_task_category',
            'view_task_category',
            'update_wedding',
            'view_wedding'
        ],
        'wedding_couple' => [
            'create_task',
            'update_task',
            'delete_task',
            'view_task',
            'create_task_category',
            'update_task_category',
            'delete_task_category',
            'view_task_category',
            'update_wedding',
            'view_wedding'
        ],
        'guest_with_task' => [
            // TODO decide how to implement this. Guest could have a lot of different tasks. Access depends on what they have to do
        ],
        'guest' => [
            // For now empty. Will change in the future when working on communication to guests
        ]

    ]
];
