import { StatusCode } from "../Data/constants";
import { downloadNewPhoto, getPhotoById, getPhotosByIdAlbum, downloadNewPhotoWithoutAlbumId } from "../API/endpoints/endpointPhotos";

describe("Test requests for enndpoint /posts", () => {
    test("Test get phoos by album id", async () => {
        let albumPhotos = await getPhotosByIdAlbum(2);
        expect(albumPhotos.status).toBe(StatusCode.OK);
    });

    test("Test get photo by id", async () => {
        let photo = await getPhotoById(25);
        expect(photo.status).toBe(StatusCode.OK);
    });

    test("Test download new Photo", async () => {
        let newPhoto = await downloadNewPhoto(2, "newPhoto", "https://via.placeholder.com/671/d3277633", "https://via.placeholder.com/201/d3277633");
        expect(newPhoto.status).toBe(StatusCode.CREATED);
    });

    test.skip("Negative test download new Photo with invalid album id", async () => {
        let newPhoto = await downloadNewPhoto(2, "newPhoto", "https://via.placeholder.com/671/d3277633", "https://via.placeholder.com/201/d3277633", StatusCode.BAD_REQUEST);
        expect(newPhoto.status).toBe(StatusCode.BAD_REQUEST);

    });

    test.skip("Negative test download new photo without albumId", async () => {
        let newPhoto = await downloadNewPhotoWithoutAlbumId("title", "URL", "URL", StatusCode.BAD_REQUEST);
        expect(newPhoto.status).toBe(StatusCode.BAD_REQUEST);
    });

});