export const SET_USERROLE = (userRole: string) => {
    localStorage.setItem("USERROLE", userRole);
};

export const GET_USERROLE = () => {
    return localStorage.getItem("USERROLE");
};

export const REMOVE_USERROLE = () => {
    localStorage.removeItem("USERROLE");
};
