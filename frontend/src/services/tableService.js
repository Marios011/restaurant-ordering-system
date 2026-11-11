const BASE_URL = 'http://localhost:9000/api/tables'

export async function fetchTables() {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch tables (HTTP ${response.status})`)
  }

  return response.json()
}
