import useUserStore from "./store/modules/user.ts";
import pinia from "./store";
import router from "./router";

let userStore = useUserStore(pinia);
router.beforeEach(async (to: any, _from: any, next: any) => {
    let userAccount: string = userStore.userAccount;
    let userRole: string = userStore.userRole;
    let requiresAuth = ['/order', '/info', '/update'];
    let requiresAdmin = ['/update'];
    console.log('Navigating to:', to.path);
    console.log('User Account:', userAccount);
    console.log('User Role:', userRole);
    if (userAccount && (to.path === '/login' || to.path === '/register')) {
        next({ path: '/' });
    } else if (requiresAuth.includes(to.path)) {
        if (!userAccount) {
            next({ path: '/login' });
        } else if (requiresAdmin.includes(to.path) && userRole !== 'admin') {
            next({ path: '/' });
        } else {
            next();
        }
    } else {
        next();
    }
});
