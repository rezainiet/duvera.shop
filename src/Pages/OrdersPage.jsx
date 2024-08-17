import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const [orders, setOrders] = useState({
        total: 0,
        pending: 0,
        delivered: 0,
        shipping: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrdersData = () => {
            const data = {
                total: 150,
                pending: 35,
                delivered: 95,
                shipping: 20,
            };
            setOrders(data);
        };

        fetchOrdersData();
    }, []);

    const navigateToOrders = (status) => {
        navigate(`/orders/${status}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Orders Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="order-card bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Total Orders</h2>
                    <p className="text-5xl font-bold mt-4">{orders.total}</p>
                    <button
                        className="mt-6 bg-white text-blue-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                        onClick={() => navigateToOrders('all')}
                    >
                        View All Orders
                    </button>
                </div>
                <div className="order-card bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Pending Orders</h2>
                    <p className="text-5xl font-bold mt-4">{orders.pending}</p>
                    <button
                        className="mt-6 bg-white text-yellow-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                        onClick={() => navigateToOrders('pending')}
                    >
                        View Pending Orders
                    </button>
                </div>
                <div className="order-card bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Delivered Orders</h2>
                    <p className="text-5xl font-bold mt-4">{orders.delivered}</p>
                    <button
                        className="mt-6 bg-white text-green-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                        onClick={() => navigateToOrders('delivered')}
                    >
                        View Delivered Orders
                    </button>
                </div>
                <div className="order-card bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-2xl font-semibold">Shipping Orders</h2>
                    <p className="text-5xl font-bold mt-4">{orders.shipping}</p>
                    <button
                        className="mt-6 bg-white text-purple-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                        onClick={() => navigateToOrders('shipping')}
                    >
                        View Shipping Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
