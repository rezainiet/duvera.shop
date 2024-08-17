import React, { useState, useEffect } from 'react';

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/orders/pending')
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error('Error fetching pending orders:', error));
    }, []);

    const handleStatusChange = (id, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === id ? { ...order, status: newStatus } : order
            )
        );

        // Optionally, you can send an update request to the backend here
        fetch(`http://localhost:4000/update-order-status/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then((response) => response.json())
            .then((data) => console.log('Order status updated:', data))
            .catch((error) => console.error('Error updating order status:', error));
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Pending Orders</h1>
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
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{order.productName}</td>
                                <td className="py-3 px-4">{order.customerName}</td>
                                <td className="py-3 px-4">{order.purchaseDate}</td>
                                <td className="py-3 px-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-lg p-2"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipping">Shipping</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="py-3 px-4">
                                    <button className="text-blue-500 hover:underline">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Status Filter */}
            <div className="mt-8 flex justify-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                    Filter by Status
                </button>
            </div>
        </div>
    );
};

export default PendingOrders;
