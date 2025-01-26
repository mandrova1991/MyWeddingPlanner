<?php

namespace App\Console\Commands;

use App\Models\TaskMassage;
use App\Events\TaskMessageCreatedEvent;
use Illuminate\Console\Command;

class TestCommand extends Command
{
    protected $signature = 'test';

    protected $description = 'Command description';

    public function handle(): void
    {
        TaskMessageCreatedEvent::dispatch();
    }
}
