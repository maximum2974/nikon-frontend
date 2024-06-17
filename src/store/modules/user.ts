import {defineStore} from "pinia";
import {UserState} from "./types/type.ts";

let useUserState = defineStore("User", {
    state: (): UserState => {
        return {
            userName: '',
            userAccount: '',
            userAvatar: '',
            gender: 0,
            userRole: '',
        };
    },

})