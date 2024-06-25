import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import OrderPage from "../views/OrderPage.vue";
import ProductsPage from "../views/ProductsPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import UpdateProductInfoPage from "../views/UpdateProductInfoPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import PutawayProductInfoPage from "../views/PutawayProductInfoPage.vue";


export const constantRoutes = [
    {
        path: "/",
        component: HomePage,
        name: "home",
    },
    {
        path: "/login",
        component: LoginPage,
        name: "login",
    },
    {
        path: "/register",
        component: RegisterPage,
        name: "register"
    },
    {
        path: "/order",
        component: OrderPage,
        name: "order",
    },
    {
        path: "/products",
        component: ProductsPage,
        name: "products"
    },
    {
        path: "/update",
        component: UpdateProductInfoPage,
        name: "update"
    },
    {
        path: "/putaway",
        component: PutawayProductInfoPage,
        name: "putaway"
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFoundPage,
        name: 'not-found'
    },
];