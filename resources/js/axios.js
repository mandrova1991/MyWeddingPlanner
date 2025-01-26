import axios from "axios";
import {router} from "@inertiajs/react";
import {echo} from "@/echo.js";

const api = axios.create({
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
})

api.interceptors.request.use( config => {
    config.headers['X-Socket-ID'] = echo.socketId();
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const sessionExpiration = localStorage.getItem("sessionExpiration");
    // config.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    if (token && tokenExpiration && tokenExpiration) {
        const now = new Date();

        // To do if token is expired
        if (tokenExpiration < now.getTime() / 1000) {
            try {
                const response = axios.get(route("api.auth.refresh_token"), {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });


                const newToken = response.data.token;
                const newTokenExpiration = response.data.token_expired_time;
                localStorage.setItem("token", newToken);
                localStorage.setItem("tokenExpiration", newTokenExpiration);
                config.headers["Authorization"] = `Bearer ${token}`;
            } catch (error) {
                logout(token);
            }
        } else {
            // To do if token is still valid. And als the session Expiration hasn't been met
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (sessionExpiration < now.getTime() / 1000) {
            logout(token);
        }
    }
    return config;
});


api.interceptors.response.use(
    response => response,
    async error => {
        const config = error.config;

        // Logout when unauthenticated
        if (error.response.status === 401) {
            logout();
            return Promise.reject(error);
        }

        // Retry when server error. Max 2 extra tries allowed
        if (!config || config._retryCount >= 2){
            return Promise.reject(error);
        }

        // init _retryCount when not set or increase retryCount by 1
        config._retryCount = (config._retryCount || 0) + 1;

        // Show warning in console
        console.warn("Retrying request", config._retryCount);

        // Retry after 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));

        return api(config);
    }
);
export default api;

const logout = ($token) => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const sessionExpiration = localStorage.getItem("sessionExpiration");

    axios.post(route("api.auth.logout"), null, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("sessionExpiration");

    router.visit(route('login'));
}
