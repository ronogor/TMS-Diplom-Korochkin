export enum RequestMethods {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch"
}
export const defoultHeader: {
    "Content-Type": string
} = {
    "Content-Type": "application/json; charset=UTF-8"
};

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BADREQUEST = 400,
    NOTFOUND = 404
}