import {ShippingRecordsResponseData} from "./type.ts";
import request from "../../utils/request.ts";

enum API{
    GETUSERSHIPPINGRECORDS_URL = "/shipping/list",
}

export const reqGetUserShippingRecords = (current: number, size: number) =>
    request.get<any, ShippingRecordsResponseData>(API.GETUSERSHIPPINGRECORDS_URL, {
        params: {current, size}
    });