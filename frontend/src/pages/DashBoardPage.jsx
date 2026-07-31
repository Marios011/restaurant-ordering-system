import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function DashboardPage({ orders, deleteOrder, payOrder, removeItemFromOrder }) {
  
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)

  useEffect(() => {
    if (orders.length > 0) {
      const stillExists = orders.find((order) => order.id === selectedOrder?.id)

      if (stillExists) {
        setSelectedOrder(stillExists)
      } else {
        setSelectedOrder(orders[0])
      }
    } else {
      setSelectedOrder(null)
    }
  }, [orders, selectedOrder?.id])
  
  
  
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  
  
  return (
    <div className="container-fluid mt-4">
      <div className="row" style={{ minHeight: '75vh' }}>
        <div className="col-md-4 border-end">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="btn btn-outline-secondary">Open Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="mt-4">
              <p>No open orders</p>
              <Link to="/create-order" className="btn btn-outline-primary">
                Create your first order
              </Link>
            </div>
          ) : (
            <div className="list-group">
              {orders.map((order) => (
                <button
                  key={order.id}
                  type="button"
                  className={`list-group-item list-group-item-action ${
                    selectedOrder?.id === order.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="d-flex justify-content-between">
                    <strong>{order.table}</strong>
                    <span>€{order.total.toFixed(2)}</span>
                  </div>
                  <div className="small">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                  </div>
                  <div className="small">Status: {order.status}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-8">
          {!selectedOrder ? (
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
              <h3>No order selected</h3>
              <p className="text-muted">Choose an order from the left side.</p>
            </div>
          ) : (
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="mb-1">Order #{selectedOrder.id}</h2>
                  <p className="mb-0">
                    <strong>Table:</strong> {selectedOrder.table}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
					<span className="badge bg-success fs-6">
						{selectedOrder.status}
					</span>

					<button
						type="button"
						className="btn btn-danger btn-sm"
						onClick={() => {
							const confirmed = window.confirm('Are you sure you want to delete this order?')

							if (confirmed) {
								deleteOrder(selectedOrder.id)
							}
						}}
					>
						Delete
					</button>
					
					<button
						type="button"
						className="btn btn-primary btn-sm"
						onClick={() => {
						}}
					>
						+
					</button>
					
				</div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h4 className="card-title">Order Items</h4>
                  <ul className="list-group list-group-flush mt-3">
                    {selectedOrder.items.map((item, index) => (
                      <li
                        key={index}
                        className={`list-group-item d-flex justify-content-between px-0 ${
							selectedItemIndex === index ? 'active' : ''
						}`}
						style={{ cursor: 'pointer' }}
						onClick={() => setSelectedItemIndex(index)}
					  
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
				       {selectedItemIndex !== null && (
						 <div className="mt-3">
						 <button
						 type="button"
						 className="btn btn-outline-danger btn-sm"
						 onClick={() => {
							const selectedItem = selectedOrder.items[selectedItemIndex]
							const confirmed = window.confirm(
							`Delete ${selectedItem.name} from this order?`
							)

						if (confirmed) {
							removeItemFromOrder(selectedOrder.id, selectedItemIndex)
							setSelectedItemIndex(null)
						}
						}}
						>
							Delete Selected Item
						</button>
					</div>
					 )}
                </div>
              </div>

              <div className="text-end">
			  						
                <h3> €{selectedOrder.total.toFixed(2)}</h3>
              </div>
			  	<div className="d-flex gap-2 mt-3">
					<button
					type="button"
					className="btn btn-warning btn-sm"
					onClick={() => setShowPaymentOptions(true)}
				>
					Pay
				</button>

				{showPaymentOptions && (
				<>
					<button
						type="button"
						className="btn btn-outline-success btn-sm"
						onClick={() => {
						const confirmed = window.confirm('Confirm cash payment?')

					if (confirmed) {
						payOrder(selectedOrder.id, 'Cash')
						setShowPaymentOptions(false)
					}
				}}
					>
						Cash
					</button>

					<button
						type="button"
						className="btn btn-outline-primary btn-sm"
						onClick={() => {
						const confirmed = window.confirm('Confirm card payment?')

					if (confirmed) {
					payOrder(selectedOrder.id, 'Card')
					setShowPaymentOptions(false)
					}
				}}
					>
						Card
					</button>

					<button
						type="button"
						className="btn btn-outline-secondary btn-sm"
						onClick={() => setShowPaymentOptions(false)}
					>
						Cancel
					</button>
				</>
				)}
				</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage