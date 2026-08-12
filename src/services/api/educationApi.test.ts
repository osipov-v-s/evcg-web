import api from "./api"
import { educationApi } from "./educationApi"

jest.mock("./api", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        patch: jest.fn()
    }
}))

const mockedApi = api as jest.Mocked<typeof api>

describe("curator API boundary", () => {
    it("resets only the pupil selected in the curator action", async () => {
        mockedApi.patch.mockResolvedValueOnce({ data: undefined })

        await educationApi.resetPupilPassword("token", 42)

        expect(mockedApi.patch).toHaveBeenCalledWith(
            "/api/curators/pupils/42/reset-password",
            undefined,
            { headers: { Authorization: "token" } }
        )
    })

    it("requests the curator-scoped results without accepting a client school id", async () => {
        mockedApi.get.mockResolvedValueOnce({ data: [] })

        await educationApi.getCuratorPupilResults("token", "2026-08-01", "2026-08-12")

        expect(mockedApi.get).toHaveBeenCalledWith("/api/curators/pupil-results", {
            params: { startDate: "2026-08-01", endDate: "2026-08-12" },
            headers: { Authorization: "token" }
        })
    })
})
