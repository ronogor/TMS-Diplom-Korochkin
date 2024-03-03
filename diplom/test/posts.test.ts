import { getPostById, getAllPosts, getPostsByUserId, getCommentById, createNewPost, updateTitle, deletePost } from "../API/endpoints/endpointPosts";
import { StatusCode } from "../testData/constants";


describe("Test requests for enndpoint /posts", () => {
    
    test("Test get all posts from site", async () => {
        const allPosts = await getAllPosts();
        expect(allPosts.status).toBe(StatusCode.OK);
    });

    test("Test get post by id", async () => {
        const postById = await getPostById(2);
        expect(postById.status).toBe(StatusCode.OK);
    });
    
    test.skip("Negative test get post by invalid Id", async() => {
        const postById = await getPostById(1221121212122, StatusCode.NOTFOUND);
        expect(postById.status).toBe(StatusCode.NOTFOUND);
    });

    test("Test get user posts by user Id", async() => {
        const postsByUserId = await getPostsByUserId(3);
        expect(postsByUserId.status).toBe(StatusCode.OK);
    });
    
    test("Negative test get user posts by invalid user Id", async() => {
        const postsByUserId = await getPostsByUserId(223232332);
        expect(postsByUserId.status).toBe(StatusCode.OK);
        expect(postsByUserId.data).toEqual([])
    });
    
    test("Test get post comment bu Id", async () => {
        const commentById = await getCommentById(31);
        expect(commentById.status).toBe(StatusCode.OK);
    });
    
    test("Negative test get post comment by invalid Id", async () => {
        const commentById = await getCommentById(10000);
        expect(commentById.status).toBe(StatusCode.OK);
        expect(commentById.data).toEqual([]);
    });
    
    test("Test create new post", async () => {
        const newPost = await createNewPost("New Post", "This is new post", 2);
        expect(newPost.status).toBe(StatusCode.CREATED);
    });

    test("Test update title", async () => {
        const updatedPostTitle = await updateTitle(3, "jopa");
        expect(updatedPostTitle.status).toBe(StatusCode.OK);
    });

    test("Test delete post", async () => {
        const deletedPost = await deletePost(3);
        expect(deletedPost.status).toBe(StatusCode.OK);
    });

});