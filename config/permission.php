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
        ],
        'task_messages' => [
            'name' => 'Task Messages Management',
            'permissions' => [
                'create_task_messages',
                'update_task_messages',
                'delete_task_messages',
                'view_task_messages',
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
            'view_wedding',
            'create_task_messages',
            'update_task_messages',
            'delete_task_messages',
            'view_task_messages',
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
            'view_wedding',
            'create_task_messages',
            'update_task_messages',
            'delete_task_messages',
            'view_task_messages',
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
