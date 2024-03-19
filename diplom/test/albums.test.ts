import { StatusCode } from "../Data/constants";
import { createNewAlbum, getAlbumBiId, getAllAlbums, getUserAlbums } from "../API/endpoints/endpointAlbums";

describe("Test requests for enndpoint /albums", () => {
    test("Test get all albums", async () => {
        let allAlbums = await getAllAlbums();
        expect(allAlbums.status).toBe(StatusCode.OK);
    });

    test("Test get allbum by id", async () => {
        let album = await getAlbumBiId(3);
        expect(album.status).toBe(StatusCode.OK);
    });

    test("Test get user albums by user id", async () => {
        let userAlbums = await getUserAlbums(2);
        expect(userAlbums.status).toBe(StatusCode.OK);
    });

    test("Test create new album", async () => {
        let newAlbum = await createNewAlbum("new title", 2);
        expect(newAlbum.status).toBe(StatusCode.CREATED);
    });
});