import { useState } from 'react';
import productData from '../productData';
import WhatsAppButton from './WhatsAppButton';

const ProductPage = () => {
    const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
    const [selectedImage, setSelectedImage] = useState(productData.images[productData.colors[0]][0]);
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

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedImage(productData.images[color][0]);
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
            selectedColor,
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Product Images Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <div className="w-full lg:w-3/4">
                            <img
                                src={selectedImage}
                                alt="Product"
                                className="w-full h-auto rounded-lg object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-row lg:flex-col lg:w-1/4 gap-4">
                            {productData.images[selectedColor].map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg cursor-pointer transition-transform ${selectedImage === image ? 'ring-2 ring-green-500' : ''}`}
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product and Order Info Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
                    <div className='flex items-center justify-center my-5'>
                        <button>
                            <a href="#buyNowBtn" className='px-3 py-2 rounded bg-green-200 font-bold'>অর্ডার করতে এখানে ক্লিক করুন</a>
                        </button>
                    </div>
                    {/* Product Info */}
                    <div className="mb-6">
                        <h2 className="text-2xl lg:text-4xl font-bold mb-2 text-gray-800">{productData.productName}</h2>
                        <p className="text-xl lg:text-3xl text-green-600 font-semibold mb-4">৳ {productData.price}.00 <span className='text-orange-500 text-sm'>+ Delivery Charge</span></p>
                        <p className='text-orange-500 text-sm'>Inside Dhaka (60 BDT) Outside Dhaka (110 BDT)</p>
                        <p className="text-gray-700 mb-6 text-sm lg:text-base">{productData.description}</p>
                        <div className="flex items-center space-x-3">
                            <span className="text-yellow-500 text-xl lg:text-2xl">
                                {'★'.repeat(productData.rating)}{'☆'.repeat(5 - productData.rating)}
                            </span>
                            <span className="text-gray-600 text-sm lg:text-lg">({productData.reviews} reviews)</span>
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-6">
                        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Select Color</h3>
                        <div className="flex flex-wrap gap-4">
                            {productData.colors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleColorChange(color)}
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm lg:text-base ${selectedColor === color ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="mb-6">
                        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Specifications</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm lg:text-base">
                            {productData.specifications.map((spec, index) => (
                                <li key={index}>{spec}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Additional Information */}
                    <div className="mb-6">
                        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">Additional Information</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm lg:text-base">
                            {productData.additionalInfo.map((info, index) => (
                                <li key={index}>{info}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Order Info */}
                    <div>
                        <div className="flex flex-col lg:flex-row lg:justify-between items-center mb-4">
                            <span className="text-gray-600 text-sm lg:text-base">Quantity</span>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(false)}
                                    className="px-3 py-1 bg-gray-200 rounded-l-lg text-lg lg:text-xl hover:bg-gray-300 transition-colors"
                                >-</button>
                                <input
                                    type="number"
                                    value={quantity}
                                    readOnly
                                    className="w-16 text-center border-t border-b border-gray-300 text-lg lg:text-xl"
                                />
                                <button
                                    onClick={() => handleQuantityChange(true)}
                                    className="px-3 py-1 bg-gray-200 rounded-r-lg text-lg lg:text-xl hover:bg-gray-300 transition-colors"
                                >+</button>
                            </div>
                        </div>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="shippingOptions" className="text-gray-600 mb-2 text-sm lg:text-base">Shipping Options</label>
                            <select
                                id="shippingOptions"
                                value={selectedShipping}
                                onChange={(e) => setSelectedShipping(Number(e.target.value))}
                                className="border border-gray-300 rounded-lg p-2 text-gray-800"
                            >
                                {productData.shippingOptions.map((option, index) => (
                                    <option key={index} value={option.cost}>
                                        {option.label} ({option.cost} BDT)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center justify-between mb-6"
                            id='buyNowBtn'
                        >
                            <span className="text-lg lg:text-xl font-bold text-gray-800">Total: ৳ {total}</span>
                            <button
                                onClick={handlePurchaseClick}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                            >
                                অর্ডার কনফার্ম করুন
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Form Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
                        <h3 className="text-xl font-semibold mb-4">আপনার তথ্য দিন</h3>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">নাম : *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">মোবাইল নং : *</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-600">ঠিকানা : *</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-600">শহর / থানা: *</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleClosePopup}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmClick}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating WhatsApp Button */}
            <WhatsAppButton />

        </div>
    );
};

export default ProductPage;
