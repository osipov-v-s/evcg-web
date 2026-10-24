import { exportToJson } from "./exportToJson"
import { exportRowsToExcel, ExcelRow } from "./exportRowsToExcel"

export type ExportFormat = "json" | "xlsx"

export const exportData = <T>(
    data: T[],
    format: ExportFormat,
    filename: string,
    toRows: (data: T[]) => ExcelRow[]
): void => {
    if (!data.length) throw new Error("No data to export")

    if (format === "json") {
        exportToJson(data, filename)
        return
    }
    exportRowsToExcel(toRows(data), filename)
}