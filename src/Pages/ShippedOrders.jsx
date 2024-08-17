import React, { useEffect, useState } from 'react';

const ShippedOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchShippedOrders = async () => {
            try {
                const response = await fetch('https://duvera-shop-backend.vercel.app/orders/shipping');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch shipped orders:', error);
            }
        };

        fetchShippedOrders();
    }, []);

    const handleDelivered = async (orderId) => {
        try {
            const response = await fetch(`https://duvera-shop-backend.vercel.app/update-order-status/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Delivered' }),
            });

            if (response.ok) {
                // Update the order status in the frontend
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: 'Delivered' } : order
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
                <h1 className="text-3xl font-bold text-gray-800">Shipped Orders</h1>
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
                                        {order.status === 'Shipping' && (
                                            <button
                                                onClick={() => handleDelivered(order._id)}
                                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                                            >
                                                Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">
                                    No shipped orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShippedOrders;
