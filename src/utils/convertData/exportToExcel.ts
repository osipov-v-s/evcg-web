import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AccountsTests } from '../../types/account/account';
export const exportToExcel = (accountsData: AccountsTests[], filename: string = "psych_test_results") => {
    if (!accountsData.length) {
        console.error("No data to export")
        throw new Error("No data to export check dates")
    }
    
    const transformedData = transformAccountsData(accountsData)
    
    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(transformedData)
    XLSX.utils.book_append_sheet(workbook, worksheet, filename)
    const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'})
    const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    saveAs(blob, `${filename}.xlsx`)
}

const transformAccountsData = (accountsData: AccountsTests[]) => {
    const transformedData: Array<Record<string, string | number>> = []
    
    accountsData.forEach(account => {
        if (!account.psychTests || !account.psychTests.length) return
        
        // Add a row for each test
        account.psychTests.forEach(test => {
            const row: Record<string, string | number> = {
                'ФИО': account.fullName,
                'Email': account.email,
                'Роль': account.roles?.join(', ') || '',
                'Школа': account.school || '',
                'Класс': account.classNumber ? `${account.classNumber}${account.classLabel || ''}` : '',
                'Пол': account.gender || '',
                'Дата рождения': account.birthday || '',
                'Профессия': account.profession || '',
                'Организация': account.company || '',
                'Тип теста': test.testTypeName,
                'Время выполнения (сек)': test.completionTimeSeconds,
                'Дата прохождения': test.createdAt || ''
            }
            
            // Add psych params as columns
            if (test.psychParams && Array.isArray(test.psychParams)) {
                test.psychParams.forEach(param => {
                    row[param.name] = param.param
                })
            }
            
            transformedData.push(row)
        })
    })
    
    return transformedData
}
