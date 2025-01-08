<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ServerResponse
{
    public static function basicResponse($message, $objectData, $status = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => $message,
            'objectData' => $objectData,
            'error' => null
        ], $status);
    }

    public static function errorResponse($errorMessage, $where = null, $expected = null, $objectData = null, $status = 501): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'message' => $errorMessage,
            'objectData' => $objectData ?? null,
            'error' => [
                'where' => $where,
                'expected' => $expected,
            ]
        ], $status);
    }
}