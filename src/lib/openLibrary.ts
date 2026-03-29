export const openLibraryFetch = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
  })
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
  const data = await response.json()
  return data
}