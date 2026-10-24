// utils/convertData/exportRowsToExcel.ts
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

export type ExcelRow = Record<string, string | number | null | undefined>

export const exportRowsToExcel = (rows: ExcelRow[], filename = "export") => {
    if (!rows.length) throw new Error("No data to export")
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(rows)
    XLSX.utils.book_append_sheet(workbook, worksheet, filename)
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })
    saveAs(blob, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`)
}