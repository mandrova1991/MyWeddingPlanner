<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        return Location::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required'],
            'street' => ['required'],
            'number' => ['required'],
            'city' => ['required'],
            'country' => ['required'],
            'entrance' => ['required'],
            'parking' => ['required'],
            'in_house_location' => ['required'],
            'extra_description' => ['required'],
        ]);

        return Location::create($data);
    }

    public function show(Location $location)
    {
        return $location;
    }

    public function update(Request $request, Location $location)
    {
        $data = $request->validate([
            'name' => ['required'],
            'street' => ['required'],
            'number' => ['required'],
            'city' => ['required'],
            'country' => ['required'],
            'entrance' => ['required'],
            'parking' => ['required'],
            'in_house_location' => ['required'],
            'extra_description' => ['required'],
        ]);

        $location->update($data);

        return $location;
    }

    public function destroy(Location $location)
    {
        $location->delete();

        return response()->json();
    }
}
