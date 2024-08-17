import { useState } from 'react';
import productData from '../productData';

const ProductPage = () => {
    const [selectedImage, setSelectedImage] = useState(productData.images[0]);
    const [selectedShipping, setSelectedShipping] = useState(productData.shippingOptions[0].cost); // Default shipping outside Dhaka
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''
    });

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleQuantityChange = (increment) => {
        setQuantity((prevQuantity) => {
            if (increment) return prevQuantity + 1;
            return prevQuantity > 1 ? prevQuantity - 1 : 1;
        });
    };

    const total = (productData.price * quantity) + selectedShipping;

    const handlePurchaseClick = () => {
        setShowPopup(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleConfirmClick = async () => {
        if (!formData.name || !formData.phone || !formData.address || !formData.city) {
            alert("Please fill in all the required fields.");
            return;
        }

        // Basic phone number validation
        const phoneRegex = /^[0-9]{11}$/; // Example: 11 digits
        if (!phoneRegex.test(formData.phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        const purchaseDate = new Date().toLocaleString();
        const shippingLocation = selectedShipping === 110 ? 'Outside Dhaka' : 'Inside Dhaka';

        const orderData = {
            productName: productData.productName,
            purchaseDate,
            customerName: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            quantity,
            shippingLocation,
            totalAmount: total,
            status: "Pending",
        };

        try {
            const response = await fetch('https://duvera-shop-backend.vercel.app/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                alert('Order placed successfully!');
                setShowPopup(false);
                setFormData({ name: '', phone: '', address: '', city: '' });
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-extrabold text-center mb-10 text-green-400">Product Information</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Product Images Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex lg:flex-row items-center gap-6">
                        <div className="flex flex-col items-center gap-4 lg:items-start">
                            {productData.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 ${selectedImage === image ? 'ring-4 ring-orange-500' : ''}`}
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                        <div className="w-full">
                            <img
                                src={selectedImage}
                                alt="Product"
                                className="w-full h-auto rounded-lg object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* Product and Order Info Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                    {/* Product Info */}
                    <div className="mb-6">
                        <h2 className="text-4xl font-bold mb-2 text-gray-800">{productData.productName}</h2>
                        <p className="text-3xl text-green-600 font-semibold mb-4">৳ {productData.price}.00</p>
                        <p className="text-gray-700 mb-6">{productData.description}</p>
                        <div className="flex items-center space-x-3">
                            <span className="text-yellow-500 text-2xl">
                                {'★'.repeat(productData.rating)}{'☆'.repeat(5 - productData.rating)}
                            </span>
                            <span className="text-gray-600 text-lg">({productData.reviews} reviews)</span>
                        </div>
                    </div>

                    {/* Order Info */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Quantity</span>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(false)}
                                    className="px-3 py-1 bg-gray-200 rounded-l-lg text-xl hover:bg-gray-300 transition-colors"
                                >-</button>
                                <span className="px-4 py-2 bg-gray-100">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(true)}
                                    className="px-3 py-1 bg-gray-200 rounded-r-lg text-xl hover:bg-gray-300 transition-colors"
                                >+</button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">Shipping</span>
                            <div className="flex flex-col space-y-2">
                                {productData.shippingOptions.map((option, index) => (
                                    <label key={index} className="flex items-center">
                                        <input
                                            required
                                            type="radio"
                                            name="shipping"
                                            value={option.cost}
                                            checked={selectedShipping === option.cost}
                                            onChange={() => setSelectedShipping(option.cost)}
                                            className="mr-2"
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center font-bold text-lg mb-4">
                            <span>Total</span>
                            <span>৳ {total}.00</span>
                        </div>

                        <button
                            onClick={handlePurchaseClick}
                            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            অর্ডার কনফার্ম করুন
                        </button>
                    </div>
                </div>
            </div>


            {/* Popup for Purchase Details */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={handleClosePopup}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Please Fill Your Information</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-600">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Phone Number *</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Full Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">City/Thana *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleConfirmClick}
                                    type="button"
                                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={handleClosePopup}
                                    type="button"
                                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
