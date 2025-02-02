<?php

namespace App\Console\Commands;

use App\Events\TaskMessage\TaskMessageCreatedEvent;
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
