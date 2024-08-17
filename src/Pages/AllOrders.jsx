import React, { useEffect, useState } from 'react';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const response = await fetch('http://localhost:4000/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch all orders:', error);
            }
        };

        fetchAllOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:4000/update-order-status/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                );
            } else {
                console.error('Failed to update order status');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>
                <input
                    type="text"
                    placeholder="Search orders..."
                    className="p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Orders List */}
            <div className="bg-white shadow-md rounded-lg p-6">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-medium">
                            <th className="py-3 px-4">Order Number</th>
                            <th className="py-3 px-4">Customer Name</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Address</th>
                            <th className="py-3 px-4">City</th>
                            <th className="py-3 px-4">Shipping Location</th>
                            <th className="py-3 px-4">Total Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4">{order._id}</td>
                                    <td className="py-3 px-4">{order.customerName}</td>
                                    <td className="py-3 px-4">{order.purchaseDate}</td>
                                    <td className="py-3 px-4">{order.address}</td>
                                    <td className="py-3 px-4">{order.city}</td>
                                    <td className="py-3 px-4">{order.shippingLocation}</td>
                                    <td className="py-3 px-4">${order.totalAmount}</td>
                                    <td className="py-3 px-4">{order.status}</td>
                                    <td className="py-3 px-4">
                                        {order.status === 'Pending' && (
                                            <button
                                                onClick={() => handleStatusChange(order._id, 'Shipping')}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                            >
                                                Mark as Shipping
                                            </button>
                                        )}
                                        {order.status === 'Shipping' && (
                                            <button
                                                onClick={() => handleStatusChange(order._id, 'Delivered')}
                                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                                            >
                                                Mark as Delivered
                                            </button>
                                        )}
                                        {order.status === 'Delivered' && (
                                            <span className="text-green-600 font-semibold">Delivered</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
