import { FileKind, StoredFile, StoredFileFilters } from "../../types/files/file"
import { PaginatedResponse } from "../../types/common"
import api from "./api"

export const storedFileApi = {
    /* ---------- internal helpers ---------- */
    fetchFileBlob:  async (file: StoredFile, token: string): Promise<Blob> => {
        const res = await fetch(file.url, { headers: { Authorization: token } });
        if (!res.ok) throw new Error(await res.text());
        return res.blob();
    },

    saveBlob:  (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), { href: url, download: filename });
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    },
    /* ---------- public API ---------- */

    /**
     * Downloads a file and triggers the browser's save dialog.
     *
     * - Public files (`/public/...`) are handed straight to the browser — no fetch, no auth,
     *   hits the browser cache.
     * - Private files (`/api/files/{id}/content`) are fetched with the Authorization header
     *   (the browser would NOT send it for a plain <a href>), then turned into a blob URL.
     */
    downloadFile : async (file: StoredFile, token: string) => {
        if (file.url.startsWith("/public/")) {
            // Public — let the browser do it, no fetch, no auth
            const a = Object.assign(document.createElement("a"), {
                href: file.url,
                download: file.originalName,
            });
            document.body.appendChild(a);
            a.click();
            a.remove();
            return;
        }
        storedFileApi.saveBlob(await storedFileApi.fetchFileBlob(file, token), file.originalName);
    },
    getFiles :  async (
        token: string, 
        filters: StoredFileFilters = {}, 
        page = 0, size = 20, sort = "createdAt,desc", 
        signal?: AbortSignal): Promise<PaginatedResponse<StoredFile>> => {

        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            sort,
        })
        if (filters.kind) params.set("kind", filters.kind)
        if (filters.accountEmail != null) 
            params.set("accountEmail", String(filters.accountEmail))
        if (filters.from) params.set("from", String(filters.from))
        if (filters.to) params.set("to", filters.to)
        const response = await api.get<PaginatedResponse<StoredFile>>(
            `/api/files?${params.toString()}`,
            {signal, headers: {Authorization: token}}
        )
        return response.data
    },
    uploadFile : async (token: string, file: File, kind: FileKind): Promise<StoredFile> => {
        const form = new FormData()
        form.append("file", file)
        form.append("kind", kind)
        const response = await api.post<StoredFile>("/api/files", form, {
            headers: { Authorization: token}
        })
        return response.data
    }
}




