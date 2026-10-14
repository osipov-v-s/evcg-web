export type FileKind = 
    | "SIMULATION"
    | "COMPARISON_SESSION"
    | "COMPARISON_SAMPLE_IMAGE"
    | "VR_TEST_ASSET"
export interface StoredFile {
    id: number
    contentType: string
    originalName: string
    sizeBytes: number
    url: string
    kind?: FileKind
    ownerAccountId?: number
    createdAt?: string
}

export interface StoredFileFilters {
    kind?: FileKind
    accountEmail?: string
    from?: string
    to?: string
}