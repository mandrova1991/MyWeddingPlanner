import {createRootRoute, createRoute, Outlet, Route, useParams} from "@tanstack/react-router";
import Dashboard from "@/Pages/Dashboard";
import Login from "@/Pages/Auth/Login";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TaskList from "@/Pages/MyWedding/TaskList";

export const rootRoute = createRootRoute();

export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
});

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login
})

export const weddingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'wedding',
});

export const weddingDashboard = createRoute({
    getParentRoute: () => weddingRoute,
    path: '$wedding',
    loader: ({ params }) => {
        return params.wedding
    },
    component: () => {
        const weddingParams = weddingRoute.useParams() as { wedding: number };

        return (
            <DashboardLayout wedding={weddingParams.wedding} >
                <Outlet />
            </DashboardLayout>
        )
    }
});

export const weddingTaskListRoute = createRoute({
    getParentRoute: () => weddingDashboard,
    path: "task-list",
    component: TaskList
})