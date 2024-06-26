import useUserStore from "./store/modules/user.ts";
import pinia from "./store";
import router from "./router";


let userStore = useUserStore(pinia);

router.beforeEach(async (to, _from, next) => {
    if (to.path === "/login" || to.path === "/register") {
        next();
        return;
    }

    try {
        await userStore.userInfo();
        const userRole = userStore.userRole;

        if ((to.path === "/update" || to.path === "/putaway") && userRole !== "admin") {
            next({ path: "/" });
        } else if (to.path === "/order" && userRole !== "user") {
            next({ path: "/" });
        } else {
            next();
        }
    } catch (error) {
        if (to.path === "/update" || to.path === "/putaway" || to.path === "/order") {
            next({ path: "/login", query: { redirect: to.path } });
        } else {
            next();
        }
    }
});