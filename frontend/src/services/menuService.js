const BASE_URL = 'http://localhost:9000/api/products'

export async function fetchProducts(){
	const response = await fetch(BASE_URL)

	if(!response.ok){
		throw new Error(`Failed to fetch products (HTTP ${response.status})`)
	}

	return response.json()
}
