function AdminPage({orders, logout}){
	
	const paidOrders=orders.filter((order)=>order.status==='paid')
	
	
	return(
		<div className="container mt-4">
		  <div className="d-flex justify-content-between align-items-center mb-4">
			<h2>Admin</h2>
			<button type="button" className="btn btn-outline-dark btn-sm" onClick={() => {
               const confirmed = window.confirm('Are you sure you want to logout?')

			   if (confirmed) {
                  logout()
                }
			  }}
			>
				Logout
			</button>
		  </div>
			
			{paidOrders.length===0?(
			  <p>No paid orders yet</p>
			):(
			  <div className="row g-3">
			  {paidOrders.map((order)=>(
			    <div className="col-md-6" key={order.id}>
				  <div className="card h-100">
				    <div className="card-body">
					  <div className="d-flex justify-content-between align-items-center mb-3">
					    <div>
						  <h5 className="mb-1">Order #{order.id}</h5>
						  <p className="mb-0">
						    <strong>Table:</strong> {order.table}
						  </p>
						</div>
						
						<span className="badge bg-success">
						 {order.status}
						</span>
						
					  </div>
					  
					  <p className="mb-2">
					    <strong>Payment:</strong> {order.paymentMethod || 'unknown'}
					  </p>
					  
					  <ul className="list-group list-group-flush mb-3">
					   {order.items.map((item,index)=>(
					     <li key={index} 
						   className="list-group-item d-flex justify-content-between px-0" 
					   >
					    <div>
						  <div>
						    {item.name} x {item.quantity}
						  </div>
						  
						  {item.note && (
						    <div className="text-muted small mt-1">
							  {item.note}
							</div>
						  )}
						  
					    </div>
						
						  <span>
						    €{(item.price * item.quantity).toFixed(2)}
						  </span>
						 </li>
					   ))}
					  </ul>
					  
					  <div className="text-end">
					    <strong>Total: €{order.total.toFixed(2)}</strong>
					  </div>
					  
					</div>
				  </div>
				</div>
			  ))}
			  </div>
			
			)}
			
		</div>
	)
	
}


export default AdminPage