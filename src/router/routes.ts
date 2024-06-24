import LoginPage from "../views/LoginPage.vue";
import HomePage from "../views/HomePage.vue";
import OrderPage from "../views/OrderPage.vue";
import ProductsPage from "../views/ProductsPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import UpdateProductInfoPage from "../views/UpdateProductInfoPage.vue";


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
    }
];