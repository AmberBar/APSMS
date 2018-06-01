import { localStorageService } from "./common"
import { format } from "util";

export function getUserProfile() {
   return localStorageService.getItem("profile")
}

export function isAdmin() {
    const userProfile = localStorageService.getItem("profile")

    if ("roles" in userProfile) {
        let roles = userProfile.roles
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name == "ROLE_ADMIN") {
                return true
            }
        }
    }
    return false;
}