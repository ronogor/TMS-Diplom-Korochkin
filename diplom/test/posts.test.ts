import { randomNumber, randomNumberNegative } from "../../helpers/randomNumber";
import { getPostById, getAllPosts, getPostsByUserId, getCommentById, createNewPost, updateTitle, deletePost } from "../API/endpoints/endpointPosts";
import { StatusCode } from "../data/constants";
import { MinMaxIdPositive } from "../data/testData";


describe("Test requests for enndpoint /posts", () => {
    
    test("Test get all posts from site", async () => {
        const allPosts = await getAllPosts();
        expect(allPosts.status).toBe(StatusCode.OK);
    });

    test("Test get post by id", async () => {
        const postById = await getPostById(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_POST_ID));
        expect(postById.status).toBe(StatusCode.OK);
    });
    
    test.skip("Negative test get post by invalid Id", async() => {
        const postById = await getPostById(randomNumberNegative(), StatusCode.NOT_FOUND);
        expect(postById.status).toBe(StatusCode.NOT_FOUND);
    });

    test("Test get user posts by user Id", async() => {
        const postsByUserId = await getPostsByUserId(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID));
        expect(postsByUserId.status).toBe(StatusCode.OK);
    });
    
    test("Negative test get user posts by invalid user Id", async() => {
        const postsByUserId = await getPostsByUserId(randomNumberNegative());
        expect(postsByUserId.status).toBe(StatusCode.OK);
        expect(postsByUserId.data).toEqual([])
    });
    
    test("Test get post comment by Id", async () => {
        const commentById = await getCommentById(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID));
        expect(commentById.status).toBe(StatusCode.OK);
    });
    
    test("Negative test get post comment by invalid Id", async () => {
        const commentById = await getCommentById(randomNumberNegative());
        expect(commentById.status).toBe(StatusCode.OK);
        expect(commentById.data).toEqual([]);
    });
    
    test("Test create new post", async () => {
        const newPost = await createNewPost("New Post", "This is new post", randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_USER_ID));
        expect(newPost.status).toBe(StatusCode.CREATED);
    });

    test("Test update title", async () => {
        const updatedPostTitle = await updateTitle(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_POST_ID), "jopa");
        expect(updatedPostTitle.status).toBe(StatusCode.OK);
    });

    test("Test delete post", async () => {
        const deletedPost = await deletePost(randomNumber(MinMaxIdPositive.MIN_ID, MinMaxIdPositive.MAX_POST_ID));
        expect(deletedPost.status).toBe(StatusCode.OK);
    });

});