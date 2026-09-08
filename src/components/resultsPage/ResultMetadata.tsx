import { formatDateRU } from "../../services/dates/formatDate"
import { formatTime } from "../testsPage/utils/formatTime"

interface ResultMetadataProps {
    createdAt?: string
    completionTimeSeconds?: number
}
export const ResultMetadata = ({createdAt, completionTimeSeconds}: ResultMetadataProps) => (
    <>
        {createdAt &&<p>Дата прохождения: {formatDateRU(createdAt)}</p> }
        {completionTimeSeconds && (
            <span>
                Пройдено за: {formatTime(Math.floor(completionTimeSeconds / 60))}:
                    {formatTime(completionTimeSeconds % 60)}
            </span>
        )}
    </>
)