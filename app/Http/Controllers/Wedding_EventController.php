<?php

namespace App\Http\Controllers;

use App\Models\Wedding_Event;
use Illuminate\Http\Request;

class Wedding_EventController extends Controller
{
    public function index()
    {
        return Wedding_Event::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'wedding_id' => ['required', 'integer'],
            'start_time' => ['required', 'date'],
            'end_time' => ['required', 'date'],
        ]);

        return Wedding_Event::create($data);
    }

    public function show(Wedding_Event $wedding_Event)
    {
        return $wedding_Event;
    }

    public function update(Request $request, Wedding_Event $wedding_Event)
    {
        $data = $request->validate([
            'name' => ['required'],
            'wedding_id' => ['required', 'integer'],
            'start_time' => ['required', 'date'],
            'end_time' => ['required', 'date'],
        ]);

        $wedding_Event->update($data);

        return $wedding_Event;
    }

    public function destroy(Wedding_Event $wedding_Event)
    {
        $wedding_Event->delete();

        return response()->json();
    }
}
