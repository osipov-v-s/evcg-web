import api from "./api"
import { pupilApi } from "./pupilApi"
import { Gender } from "../../types/pupil/gender"

jest.mock("./api", () => ({
    __esModule: true,
    default: {
        get: jest.fn()
    }
}))

const mockedApi = api as jest.Mocked<typeof api>

describe("pupil list API boundary", () => {
    it("sends pagination and all supported server-side filters", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: { content: [], totalPages: 0 } })

        await pupilApi.getAllPupils(2, 10, "token", {
            name: "Иван",
            email: "ivan@example.test",
            school: "Лицей",
            classNumber: 10,
            gender: Gender.MALE
        })

        expect(mockedApi.get).toHaveBeenCalledWith(
            "/api/pupils?page=2&size=10&school=%D0%9B%D0%B8%D1%86%D0%B5%D0%B9&email=ivan%40example.test&name=%D0%98%D0%B2%D0%B0%D0%BD&classNumber=10&gender=MALE",
            { signal: undefined, headers: { Authorization: "token" } }
        )
    })
})
