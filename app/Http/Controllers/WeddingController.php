<?php

namespace App\Http\Controllers;

use App\Models\Wedding;
use Illuminate\Http\Request;

class WeddingController extends Controller
{
    public function index()
    {
        return Wedding::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'date' => ['nullable'],
        ]);

        $wedding = Wedding::create($data);
        $wedding->users()->attach(auth()->id(), ['role' => 'wedding_admin']);

        return response()->json(['message' => 'Wedding created!'], 201);
    }

    public function show(Wedding $wedding)
    {
        return $wedding;
    }

    public function update(Request $request, Wedding $wedding)
    {
        $data = $request->validate([
            'name' => ['required'],
            'date' => ['nullable'],
        ]);

        $wedding->update($data);

        return $wedding;
    }

    public function destroy(Wedding $wedding)
    {
        $wedding->delete();

        return response()->json();
    }

    public function joinWeddingAsGuest(Request $request, Wedding $wedding)
    {
        $wedding->users()->attach(auth()->id(), ['role' => 'wedding_guest']);

        return response()->json(['message' => 'Wedding joined!'], 201);
    }

    public function joinWeddingAsPlanner(Request $request, Wedding $wedding)
    {
        $wedding->users()->attach(auth()->id(), ['role' => 'wedding_planner']);
    }
}
