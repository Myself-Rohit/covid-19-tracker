export const SortedData = (data) => {
    const SortData = [...data];
    return SortData.sort((a, b) => a.cases > b.cases ? -1 : 1
    )
}