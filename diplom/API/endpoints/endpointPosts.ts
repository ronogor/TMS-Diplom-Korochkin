import { AxiosResponse } from "axios";
import { defoultHeader, StatusCode } from "../../data/constants";
import { get, patch, post, delete as delete_ } from "../api";

const endpointPosts: string = "/posts";
const endpointComment: string = "/comments";

export async function getAllPosts(expectedErrorCode?: number): Promise<AxiosResponse> {
    let allPosts = await get(endpointPosts, StatusCode.OK, defoultHeader, {}, expectedErrorCode);
    return allPosts;
};

export async function getPostById(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let postById = await get(endpointPosts, StatusCode.OK, defoultHeader, {"id": id}, expectedErrorCode);
    return postById;
};

export async function getPostsByUserId(userId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let postsByUserId = await get(endpointPosts, StatusCode.OK, defoultHeader, {"userId": userId}, expectedErrorCode);
    return postsByUserId;
};

export async function getCommentsByPostId(postId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let commentById = await get(endpointComment, StatusCode.OK, defoultHeader, {"postId": postId}, expectedErrorCode);
    return commentById;
};

export async function getCommentById(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let commentById = await get(endpointComment, StatusCode.OK, defoultHeader, {"id": id}, expectedErrorCode);
    return commentById;
};

export async function createNewPost(title: string, body: string, userId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let createdPost = await post(endpointPosts, StatusCode.CREATED, defoultHeader, {"title": title, "body": body, "userId": userId}, expectedErrorCode);
    return createdPost;
};

export async function updateTitle(postId: number, title: string, expectedErrorCode?: number): Promise<AxiosResponse> {
    let updatePost = await patch(endpointPosts, StatusCode.OK, defoultHeader, postId, { "title": title }, expectedErrorCode);
    return updatePost;
};

export async function deletePost(postId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let deletedPost = await delete_(endpointPosts, StatusCode.OK, postId, expectedErrorCode);
    return deletedPost;
};