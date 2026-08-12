const BASE_URL = 'http://localhost:9000/api/orders'


export async function fetchOrders(){
	const response = await fetch(BASE_URL)
	
	if(!response.ok){
		throw new Error('Failed to fetch orders')
	}
	
	return response.json()
}


export async function createOrder(orderData){
	
	const response = await fetch(BASE_URL, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(orderData),
	})
	
	if(!response.ok){
		throw new Error('Failed to create order')
	}
	
	return response.json()
}

/*

export async function updateOrderPayment(orderId, paymentMethod){
	const response=await fetch(`${BASE_URL}/${orderId}/pay`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		
		body: JSON.stringify({
			status: 'paid',
			paymentMethod,
		}),
	})
	
	
	if(!response.ok){
		throw new Error('Failed to pay order')
	}
	
	return response.json()
}


export async function deleteOrderById(orderId){
	const response = await fetch(`${BASE_URL}/${orderId}`, {
		method: 'DELETE',
	})
	
	if(!response.ok){
		throw new Error('Failed to delete order')
	}
}

*/