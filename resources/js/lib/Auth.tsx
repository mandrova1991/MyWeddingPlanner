import React from "react";
import {PermissionType} from "@/types/Permissions";
import {date} from "zod";

/**
    isAuthenticated is a function to check if the token persists in the localStorage.

    @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
}

/**
    LoginUser handles the frontend actions to login a user.
    It just sets new items in the localStorage which can be used.

    @param {string} token - token provided by the backend.
    @param {string} expirationTime - expiration dateTime provided by the backend.
 */
export const loginUser = (token: string, expirationTime: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);
}


/**
    Logout handles the frontend actions to logout a user.
    It just removes the localStorage items.
 */
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
}


/**
    isTokenExpired check if the token is expired.
    If token expiration can not be found it will also return true.

    @returns {boolean};
 */
export const isTokenExpired = () => {
    const now = new Date();
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (!tokenExpiration) {
        return true;
    }

    if (new Date(tokenExpiration) < now) {
        return true;
    }

    return false;
}


/**
 * Check if user has a certain permission
 *
 * @param {PermissionType} permission - permission to check
 */
export const userHasPermission = (permission: PermissionType) => {
    // const permissions = usePermissions();

    if (permission.includes(permission)) {
        return true;
    }
    return false;
}