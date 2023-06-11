export const paginate = (arr, currentPage, pageSize) => {
    let startIndex = currentPage * pageSize // 0
    let endIndex = startIndex + pageSize //
    return arr.slice(startIndex, endIndex)
}

export const searchByName = (arr, searchKey) => {
    return arr.filter(item => item.title.toLowerCase().includes(searchKey.toLowerCase()))
}

// 0-9