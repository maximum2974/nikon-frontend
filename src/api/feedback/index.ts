import {FeedbackRequestData, FeedbackResponseData} from "./type.ts";
import request from "../../utils/request.ts";

enum API {
    FEEDBACK_URL = "/feedback/add",
}

export const reqFeedback = (data: FeedbackRequestData) =>
    request.post<any, FeedbackResponseData>(API.FEEDBACK_URL, data);