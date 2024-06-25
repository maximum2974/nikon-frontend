import request from "../../utils/request.ts";
import {
    AddOrUpdateProductRequestData, AddOrUpdateProductResponseData,
    AdminPutawayRequestData,
    AdminPutawayResonseData,
    ProductResponseData,
    PurchaseProduct,
    PurchaseProductResponseData, RemovalProductRequestData, RemovalProductResponseData
} from "./type.ts";


enum API {
    GETUSERPRODUCTS_URL = "/product/list/user",
    PURCHASEPRODUCTS_URL = "/shipping/purchase",
    GETADMINPRODUCTS_URL = "/product/list/admin",
    PUTAWAYPRODUCT_URL = "/product/putaway",
    UPDATEPRODUCT_URL = "/product/update",
    REMOVALPRODUCT_URL = "/product/delete",
    ADDPRODUCT_URL = "/product/add",
}

export const reqGetUserProducts = (current: number, size: number) =>
    request.get<any, ProductResponseData>(API.GETUSERPRODUCTS_URL, {
        params: {current, size}
    });

export const reqGetAdminProducts = (current: number, size: number) =>
    request.get<any, ProductResponseData>(API.GETADMINPRODUCTS_URL, {
        params: {current, size}
    });

export const reqPurchaseProducts = (data: PurchaseProduct) =>
    request.post<any, PurchaseProductResponseData>(API.PURCHASEPRODUCTS_URL, data);

export const reqAdminPutawayProduct = (data: AdminPutawayRequestData) =>
    request.post<any, AdminPutawayResonseData>(API.PUTAWAYPRODUCT_URL, data);

export const reqRemovalProduct = (data: RemovalProductRequestData) =>
    request.post<any, RemovalProductResponseData>(API.REMOVALPRODUCT_URL, data);

export const reqAddOrUpdateProduct = (data: AddOrUpdateProductRequestData) => {
    if(data.uuid){
        return request.post<any, AddOrUpdateProductResponseData>(API.UPDATEPRODUCT_URL, data);
    }else{
        return request.post<any, AddOrUpdateProductResponseData>(API.ADDPRODUCT_URL, data);
    }
}