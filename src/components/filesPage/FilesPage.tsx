import { useEffect, useState } from "react"
import { StoredFileFilters } from "../../types/files/file"
import { useStoredFiles } from "./hooks/useStoredFiles"
import toast, { Toaster } from "react-hot-toast"
import { getApiErrorMessage } from "../../services/api/error"
import { PageHeader } from "../ui/common/PageHeader"
import { NoResults } from "../ui/noResultComponent/NoResult"
import { FileCard } from "./FileCard"
import { Pagination } from "../ui/reusable/Pagination"
import { FilesFilterBar } from "./FilesFilterBar"

const PAGE_SIZE = 20
const emptyFilters: StoredFileFilters = {}

export const FilesPage = () => {
    const [filters, setFilters] = useState<StoredFileFilters>(emptyFilters)
    const [page, setPage] = useState(0)

    const {response, isLoading, error} = useStoredFiles({
        filters,
        page,
        size: PAGE_SIZE
    })
    useEffect(() => {
        if (error) toast.error(getApiErrorMessage(error, "Не удалось загрузить файлы"))
    }, [error])
    const applyFilter = (nextFilters: StoredFileFilters) => {
        setPage(0)
        setFilters(nextFilters)
    }
    // Флаг первой загрузки
    const isInitialLoading = isLoading && !response
    const isEmpty = !isLoading && response?.content.length === 0

    return(
        <main className="admin-list-wrapper admin-entity-page">
            <PageHeader 
                title="Файлы" 
                description="Все доступные файлы: симуляции, сессии сравнения и публичные ресурсы"/>
            <FilesFilterBar filters={filters} onApply={applyFilter} />
            {isInitialLoading ? (<NoResults variant="loading" message="Загружаем файлы..." />) 
                : isEmpty && (<NoResults variant="empty" title="Файлы не найдены" message="Измените параметры фильтрации"/>) }
            {!isInitialLoading && !isEmpty && (
                <div className="cards-container">
                    {response?.content.map(file => (
                        <FileCard key={file.id} file={file} />
                    ))}
                </div>
            )}
            {response && (
                <Pagination
                    currentPage={page}
                    setCurrentPage={setPage}
                    total={response.totalPages}
                />
            )}
            <Toaster position="top-right" />
        </main>
    )
}