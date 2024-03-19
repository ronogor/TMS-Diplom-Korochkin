import { randomNumber, randomNumberNegative } from "../../helpers/randomNumber";
import {
    getPostById,
    getAllPosts,
    getPostsByUserId,
    getCommentsByPostId,
    createNewPost,
    updateTitle,
    deletePost,
    getCommentById,
} from "../API/endpoints/endpointPosts";
import { CheckPropertyType, StatusCode, voidArray } from "../data/constants";
import { MinMaxIdPositive } from "../data/constants";
import { IComment } from "../data/responseModel/comment.model";
import { IPost } from "../data/responseModel/post.model";
import { PostBodyData } from "../data/testData/post.data";

describe("Test requests for enndpoint /posts", () => {
    test("Test get all posts from site", async () => {
        const allPosts = await getAllPosts();

        expect(allPosts.status).toBe(StatusCode.OK);

        const firstPostData: IPost = allPosts.data[0];

        expect(typeof firstPostData.userId).toBe(CheckPropertyType.NUMBER);
        expect(typeof firstPostData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof firstPostData.title).toBe(CheckPropertyType.STRING);
        expect(typeof firstPostData.body).toBe(CheckPropertyType.STRING);
    });

    test("Test get post by id", async () => {
        const id: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_POST_ID);
        const postById = await getPostById(id);

        expect(postById.status).toBe(StatusCode.OK);

        const postData: IPost = postById.data[0];

        expect(typeof postData.userId).toBe(CheckPropertyType.NUMBER);
        expect(typeof postData.id).toBe(CheckPropertyType.NUMBER);
        expect(postData.id).toBe(id);
        expect(typeof postData.title).toBe(CheckPropertyType.STRING);
        expect(typeof postData.body).toBe(CheckPropertyType.STRING);
    });

    test("Negative test get post by invalid Id", async () => {
        const postById = await getPostById(randomNumberNegative(), StatusCode.NOT_FOUND);

        expect(postById.status).toBe(StatusCode.NOT_FOUND);
    }); //[BUG]

    test("Test get user posts by user Id", async () => {
        const userId: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID);
        const postsByUserId = await getPostsByUserId(userId);

        expect(postsByUserId.status).toBe(StatusCode.OK);

        const postData: IPost = postsByUserId.data[0];

        expect(typeof postData.userId).toBe(CheckPropertyType.NUMBER);
        expect(postData.userId).toBe(userId);
        expect(typeof postData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof postData.title).toBe(CheckPropertyType.STRING);
        expect(typeof postData.body).toBe(CheckPropertyType.STRING);
    });

    test("Negative test get user posts by invalid user Id", async () => {
        const postsByUserId = await getPostsByUserId(randomNumberNegative());

        expect(postsByUserId.status).toBe(StatusCode.OK);
        expect(postsByUserId.data).toEqual(voidArray);
    });

    test("Test get comments by post Id", async () => {
        const postId: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_POST_ID);
        const commentByPostId = await getCommentsByPostId(postId);

        expect(commentByPostId.status).toBe(StatusCode.OK);

        const firstCommentData: IComment = commentByPostId.data[0];

        expect(typeof firstCommentData.postId).toBe(CheckPropertyType.NUMBER);
        expect(firstCommentData.postId).toBe(postId);
        expect(typeof firstCommentData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof firstCommentData.email).toBe(CheckPropertyType.STRING);
        expect(typeof firstCommentData.body).toBe(CheckPropertyType.STRING);
        expect(typeof firstCommentData.name).toBe(CheckPropertyType.STRING);
    });

    test("Test get comment by Id comment", async () => {
        const id: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_COMMENT_ID);
        const commentById = await getCommentById(id);

        expect(commentById.status).toBe(StatusCode.OK);

        const commentData: IComment = commentById.data[0];

        expect(typeof commentData.postId).toBe(CheckPropertyType.NUMBER);
        expect(typeof commentData.id).toBe(CheckPropertyType.NUMBER);
        expect(commentData.id).toBe(id);
        expect(typeof commentData.email).toBe(CheckPropertyType.STRING);
        expect(typeof commentData.body).toBe(CheckPropertyType.STRING);
        expect(typeof commentData.name).toBe(CheckPropertyType.STRING);
    });

    test("Negative test get post comment by invalid Id", async () => {
        const commentById = await getCommentsByPostId(randomNumberNegative());

        expect(commentById.status).toBe(StatusCode.OK);
        expect(commentById.data).toEqual(voidArray);
    });

    test("Test create new post", async () => {
        const userId: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID);
        const newPost = await createNewPost(PostBodyData.TITLE, PostBodyData.BODY, userId);

        expect(newPost.status).toBe(StatusCode.CREATED);

        const postData: IPost = newPost.data;

        expect(typeof postData.userId).toBe(CheckPropertyType.NUMBER);
        expect(postData.userId).toBe(userId);
        expect(typeof postData.id).toBe(CheckPropertyType.NUMBER);
        expect(typeof postData.title).toBe(CheckPropertyType.STRING);
        expect(postData.title).toBe(PostBodyData.TITLE);
        expect(typeof postData.body).toBe(CheckPropertyType.STRING);
        expect(postData.body).toBe(PostBodyData.BODY);
    });

    test("Test update title", async () => {
        const id: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_POST_ID);
        const updatedPostTitle = await updateTitle(id, PostBodyData.TITLE);

        expect(updatedPostTitle.status).toBe(StatusCode.OK);

        const postData: IPost = updatedPostTitle.data;

        expect(typeof postData.userId).toBe(CheckPropertyType.NUMBER);
        expect(typeof postData.id).toBe(CheckPropertyType.NUMBER);
        expect(postData.id).toBe(id);
        expect(typeof postData.title).toBe(CheckPropertyType.STRING);
        expect(postData.title).toBe(PostBodyData.TITLE);
        expect(typeof postData.body).toBe(CheckPropertyType.STRING);
    });

    test("Test delete post", async () => {
        const id: number = randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_POST_ID);
        const deletedPost = await deletePost(id);

        expect(deletedPost.status).toBe(StatusCode.OK);
    });
});
