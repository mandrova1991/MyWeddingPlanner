<?php
$manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
$react = asset('build/' . $manifest['resources/js/app.tsx']['file']);
$css = asset('build/' . $manifest['resources/js/app.tsx']['css'][0]);
?>

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <script type="module" src="{{ $react }}" defer></script>
        <link rel="stylesheet" href="{{ $css }}">

        <!-- Scripts -->
        @routes
{{--        @viteReactRefresh--}}
{{--        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])--}}
{{--        @inertiaHead--}}
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
