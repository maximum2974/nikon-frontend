import request from "../../utils/request.ts";
import {ProductResponseData, PurchaseProduct, PurchaseProductResponseData} from "./type.ts";


enum API {
    GETUSERPRODUCTS_URL = "/product/list/user",
    PURCHASEPRODUCTS_URL = "/shipping/purchase",
}

export const reqGetUserProducts = (current: number, size: number) =>
    request.get<any, ProductResponseData>(API.GETUSERPRODUCTS_URL, {
        params: {current, size}
    });

export const reqPurchaseProducts = (data: PurchaseProduct) =>
    request.post<any, PurchaseProductResponseData>(API.PURCHASEPRODUCTS_URL, data);