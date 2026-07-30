function OrdersPage({ orders }) {
  return (
    <div className="container mt-4">
      <h1>Orders</h1>

      {orders.length === 0 ? (
        <p className="mt-3">No orders have been created yet.</p>
      ) : (
        <ul className="list-group mt-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                Order #{order.id} - {order.table} - {order.menuItem} x{' '}
                {order.quantity}
              </span>
              <span>{order.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrdersPage