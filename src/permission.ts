import useUserStore from "./store/modules/user.ts";
import pinia from "./store";
import router from "./router";
import {GET_USERROLE} from "./utils/userRole.ts";

let userStore = useUserStore(pinia);

router.beforeEach(async (to, _from, next) => {
    let getUserRole = GET_USERROLE();
    if(getUserRole){
        if(to.path == "/login" || to.path == "/register"){
            next({ path: "/" });
        }else{
            try{
                await userStore.userInfo();
                if(to.path !== "/update" && to.path !== "/order"){
                    next();
                }else if(to.path === "/update" && userStore.userRole === "admin"){
                    next();
                }else if(to.path === "/order" && userStore.userRole === "user"){
                    next();
                }else{
                    next({ path: "/" });
                }
            }catch (error){
                await userStore.userLogout();
                next({ path: "/login", query: { redirect: to.path } });
            }
        }
    }else{
        if(to.path == "/login" || to.path == "/register"){
            next();
        }else if(to.path == "/update" || to.path == "/order"){
            next({ path: "/login", query: { redirect: to.path } });
        }else{
            next();
        }
    }
});
