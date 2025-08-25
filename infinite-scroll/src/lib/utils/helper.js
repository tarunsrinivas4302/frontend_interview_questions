
export const mockFakeData = (start, limit) => {
    return Array.from({ length: limit }, (_, i) => `Item ${start + i + 1} Number`)
}