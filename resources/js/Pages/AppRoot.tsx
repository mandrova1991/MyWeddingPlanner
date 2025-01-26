import React from 'react';
import {createRootRoute, createRouter, RouterProvider} from "@tanstack/react-router";
import {
    dashboardRoute,
    loginRoute,
    rootRoute,
    testListRoute,
    weddingDashboard,
    weddingRoute,
    weddingTaskListRoute
} from "@/router";


const routeTree  = rootRoute.addChildren({
    dashboardRoute,
    loginRoute,
    weddingRoute,
    weddingDashboard,
    weddingTaskListRoute,
    testListRoute
})

export const router = createRouter({
    routeTree,
    defaultPreload: "intent",
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function AppRoot() {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRoot;