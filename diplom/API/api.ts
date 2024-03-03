import axios, { AxiosResponse } from "axios"
import { RequestMethods } from "../testData/constants";

const mainUrl: string = "https://jsonplaceholder.typicode.com";

const handleResponse = async (actualResponse: AxiosResponse, expectedStatusCode: number): Promise<AxiosResponse> => {
    expect(actualResponse.status).toEqual(expectedStatusCode);
    return actualResponse;
};

const handleError = async (actualErrorResponse: AxiosResponse, expectedError?: number): Promise<AxiosResponse> => {
    expect(actualErrorResponse.status).toEqual(expectedError);
    return actualErrorResponse;
};

export async function get(endpoint: string, statusCode: number, headers: object, quary?: object, expectedErrorCode?: number): Promise<any> {
    try {
        const sendedRequest = await axios({
            method: RequestMethods.GET,
            url: `${mainUrl}${endpoint}`,
            params: quary ?? {},
            headers: headers,
            // data: body ?? {}
        });
        return handleResponse(sendedRequest, statusCode);
    } catch (error: any) {
        return handleError(error.response, expectedErrorCode);
    }
};

export async function post(endpoint: string, statusCode: number, headers: object, body: object, expectedErrorCode?: number): Promise<any> {
    try {
        const sendedRequest = await axios({
            method: RequestMethods.POST,
            url: `${mainUrl}${endpoint}`,
            headers: headers,
            data: body
        });
        return handleResponse(sendedRequest, statusCode);
    } catch (error: any) {
        return handleError(error.response, expectedErrorCode);
    }
};

export async function patch(endpoint: string, statusCode: number, headers: object, id: number, body: object, expectedErrorCode?: number): Promise<any> {
    try {
        const sendedRequest = await axios({
            method: RequestMethods.PATCH,
            url: `${mainUrl}${endpoint}/${id}`,
            headers: headers,
            data: body
        });
        return handleResponse(sendedRequest, statusCode);
    } catch (error: any) {
        return handleError(error.response, expectedErrorCode);
    }
};

async function deleteData(endpoint: string, statusCode: number, id: number, expectedErrorCode?: number): Promise<any> {
    try {
        const sendedRequest = await axios({
            method: RequestMethods.DELETE,
            url: `${mainUrl}${endpoint}/${id}`,
        });
        return handleResponse(sendedRequest, statusCode);
    } catch (error: any) {
        return handleError(error.response, expectedErrorCode);
    }
};
export {deleteData as delete};