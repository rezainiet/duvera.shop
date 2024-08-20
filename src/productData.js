import img1 from "../src/img/image_1.jpg";
import img2 from "../src/img/image_2.jpg";
import img3 from "../src/img/image_3.jpg";

const productData = {
    productName: "Diamond Cut Ring",
    price: 550.00,
    description: "",
    reviews: 483,
    rating: 4, // out of 5
    images: {
        golden: [img1, img2, img3],
        silver: [img1, img2, img3], // Replace these with actual silver images
    },
    colors: ["golden", "silver"],
    specifications: [
        "➡ তাই আমরা আপনার প্রিয় মানুষকে খুশি করতে নিয়ে আসলাম (Orginal Daimond Cart Ring) সাথে থাকছে এই অসাধারণ আর্টিফিশিয়াল গোলাপটি।",
        "🔶সাথে একটি ফ্রি নাখ ফুল 🥰",
        "➡ কোন প্রকার অগ্রিম ছাড়াই অর্ডার করুন!",
        "🔴 অর্ডার করতে Order Now বাটন এ ক্লিক করুন।",
    ],
    shippingOptions: [
        { location: 'Outside Dhaka', cost: 110, label: 'ঢাকার বাহিরে: ৳ 110.00' },
        { location: 'Inside Dhaka', cost: 60, label: 'ঢাকার মধ্যে: ৳ 60.00' }
    ],
    additionalInfo: [
        "ঢাকার মধ্যে ডেলিভারিত সময় ১ দিন",
        "ঢাকার বাহিরে ডেলিভারি সময় ২ দিন",
        "Whats App 01644995129",
    ]
};

export default productData;

