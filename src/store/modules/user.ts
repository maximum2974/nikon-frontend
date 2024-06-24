import {defineStore} from "pinia";
import {UserState} from "./types/type.ts";
import {loginData, loginResponseData} from "../../api/user/type.ts";
import {reqLogin, reqLogout, reqUserInfo} from "../../api/user";
import {REMOVE_USERROLE, SET_USERROLE} from "../../utils/userRole.ts";


let useUserStore = defineStore("User", {
    state: (): UserState => {
        return {
            userName: '',
            userAccount: '',
            userAvatar: '',
            gender: 0,
            userRole: '',
        };
    },
    actions: {
        async userLogin(data: loginData) {
            const result: loginResponseData = await reqLogin(data);
            console.log(result);
            if(result.code === 0 && result.data){
                SET_USERROLE(result.data.userRole as string);
                return "ok";
            } else {
                return Promise.reject(new Error(result.message));
            }
        },
        async userInfo() {
            let result: loginResponseData = await reqUserInfo();
            if(result.code === 0){
                this.userName = result.data.userName;
                this.userAccount = result.data.userAccount;
                this.userAvatar = result.data.userAvatar;
                this.gender = result.data.gender;
                this.userRole = result.data.userRole;
                return "ok";
            }else{
                return Promise.reject(new Error(result.message));
            }
        },
        async userLogout(){
            let result: any = await reqLogout();
            if(result.code === 0){
                this.userName = "";
                this.userAccount = "";
                this.userAvatar = "";
                this.gender = 0;
                this.userRole = "";
                REMOVE_USERROLE();
                return "ok";
            }else{
                return Promise.reject(new Error(result.message));
            }
        }
    },
    getters: {},
});

export default useUserStore;