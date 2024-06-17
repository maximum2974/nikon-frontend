import {loginData, loginResponseData, registerData, registerResponseData} from "./type.ts";
import request from "../../utils/request.ts";


enum API {
    REGISTER_URL = "/user/register",
    LOGIN_URL = "/user/login",
    USERINFO_URL = "/user/get/login",
    LOGOUT_URL = "/user/logout",
}

export const reqRegister = (data: registerData) =>
    request.post<any, registerResponseData>(API.REGISTER_URL, data);

export const reqLogin = (data: loginData) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data);

export const reqUserInfo = () =>
    request.get<any, loginResponseData>(API.USERINFO_URL);

export const reqLogout = () =>
    request.post<any, any>(API.LOGOUT_URL);

