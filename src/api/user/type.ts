export interface ResponseData {
    code: number;
    message: string;
}

export interface registerData {
    userName: string;
    userAccount: string;
    userPassword: string;
    checkPassword: string;
}

export interface registerResponseData extends ResponseData{
    data: number;
}

export interface loginData {
    userAccount: string;
    userPassword: string;
}

export interface loginResponseData extends ResponseData{
    data: {
        userName: string;
        userAccount: string;
        userAvatar: string;
        gender: number;
        userRole: string;
    }
}

