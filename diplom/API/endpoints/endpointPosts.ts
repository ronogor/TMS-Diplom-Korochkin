import { AxiosResponse } from "axios";
import { defaultHeader, StatusCode } from "../../data/constants";
import { get, patch, post, delete as delete_ } from "../api";

const endpointPosts: string = "/posts";
const endpointComment: string = "/comments";

export async function getAllPosts(expectedErrorCode?: number): Promise<AxiosResponse> {
    let allPosts = await get(endpointPosts, StatusCode.OK, defaultHeader, {}, expectedErrorCode);
    return allPosts;
}

export async function getPostById(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let postById = await get(endpointPosts, StatusCode.OK, defaultHeader, { id: id }, expectedErrorCode);
    return postById;
}

export async function getPostsByUserId(userId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let postsByUserId = await get(endpointPosts, StatusCode.OK, defaultHeader, { userId: userId }, expectedErrorCode);
    return postsByUserId;
}

export async function getCommentsByPostId(postId: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let commentById = await get(endpointComment, StatusCode.OK, defaultHeader, { postId: postId }, expectedErrorCode);
    return commentById;
}

export async function getCommentById(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let commentById = await get(endpointComment, StatusCode.OK, defaultHeader, { id: id }, expectedErrorCode);
    return commentById;
}

export async function createNewPost(
    title: string,
    body: string,
    userId: number,
    expectedErrorCode?: number,
): Promise<AxiosResponse> {
    let createdPost = await post(
        endpointPosts,
        StatusCode.CREATED,
        defaultHeader,
        { title: title, body: body, userId: userId },
        expectedErrorCode,
    );
    return createdPost;
}

export async function updateTitle(id: number, title: string, expectedErrorCode?: number): Promise<AxiosResponse> {
    let updatePost = await patch(endpointPosts, StatusCode.OK, defaultHeader, id, { title: title }, expectedErrorCode);
    return updatePost;
}

export async function deletePost(id: number, expectedErrorCode?: number): Promise<AxiosResponse> {
    let deletedPost = await delete_(endpointPosts, StatusCode.OK, id, expectedErrorCode);
    return deletedPost;
}
