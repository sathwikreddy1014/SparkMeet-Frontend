import axios from "axios";
import React from "react";
import { FaCrown, FaStar, FaCheck, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../utils/constants";

const PremiumPlans = () => {
  const comparisonData = [
    { feature: "Unlimited Chats", aurora: true, nova: true },
    { feature: "AI Smart Matches", aurora: true, nova: true },
    { feature: "Profile Boost", aurora: "1/day", nova: "Unlimited" },
    { feature: "See Who Viewed You", aurora: true, nova: true },
    { feature: "Ad-Free Experience", aurora: true, nova: true },
    { feature: "Stealth Mode", aurora: false, nova: true },
    { feature: "AI Chat Assistant", aurora: false, nova: true },
    { feature: "Verified Badge", aurora: false, nova: true },
    { feature: "Custom Themes", aurora: "Limited", nova: "Full" },
    { feature: "Cross-Region Discovery", aurora: false, nova: true },
    { feature: "Super Likes", aurora: false, nova: true },
  ];

  const handlePlam = async (type) => {
    const order = await axios.post(BASE_URL + "/payment/create", {
      membershipType: type
    },{
      withCredentials:true 
    })

    const {amount, keyId, currency, notes, orderId} = order.data

     const options = {
        key: keyId, 
        amount, 
        currency,
        name: 'SparkMeet',
        description: 'Test Transaction',
        order_id: orderId, 
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
  }

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
          Upgrade to <span className="text-yellow-300">Premium</span>
        </h1>
        <p className="text-gray-100 text-lg mt-2">
          Unlock smarter AI features, enhanced visibility, and full control.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-16 w-full max-w-6xl">
        {/* Aurora Pass */}
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-8 w-full max-w-sm">
          <div className="flex justify-center mb-4">
            <FaStar className="text-4xl text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Aurora Pass</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Smarter matches, better visibility, and ad-free chatting for your daily social life.
          </p>
          <div className="text-4xl font-extrabold text-blue-500 mb-4">₹199<span className="text-lg font-medium text-gray-600">/month</span></div>
          <button onClick = {() => handlePlam('silver')} className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition">
            Choose Aurora
          </button>
        </div>

        {/* Nova Elite */}
        <div className="relative bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-gray-900 rounded-3xl shadow-2xl hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all duration-300 transform hover:scale-105 p-8 w-full max-w-sm border-4 border-yellow-500">
          <div className="absolute top-4 right-4 bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>
          <div className="flex justify-center mb-4">
            <FaCrown className="text-4xl text-yellow-800" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Nova Elite</h2>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Unlock every premium feature — AI companion, global discovery, and unmatched control.
          </p>
          <div className="text-4xl font-extrabold text-yellow-800 mb-4">₹499<span className="text-lg font-medium text-gray-700">/month</span></div>
          <button onClick = {() => handlePlam('gold')} className="w-full bg-yellow-700 text-white py-3 rounded-xl font-semibold hover:bg-yellow-800 transition">
            Choose Nova Elite
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm">
        <table className="w-full border-collapse text-center">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th className="py-5 px-4 text-left text-lg font-semibold">Feature</th>
              <th className="py-5 px-4 text-lg font-semibold">Aurora Pass</th>
              <th className="py-5 px-4 text-lg font-semibold">Nova Elite</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((item, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-gray-100/80" : "bg-gray-50/80"
                } border-b border-gray-200`}
              >
                <td className="py-3 px-4 text-left text-gray-800 font-medium">
                  {item.feature}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {item.aurora === true ? (
                    <FaCheck className="text-green-500 inline" />
                  ) : item.aurora === false ? (
                    <FaTimes className="text-red-500 inline" />
                  ) : (
                    <span className="font-medium text-gray-600">{item.aurora}</span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {item.nova === true ? (
                    <FaCheck className="text-green-500 inline" />
                  ) : item.nova === false ? (
                    <FaTimes className="text-red-500 inline" />
                  ) : (
                    <span className="font-medium text-gray-600">{item.nova}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <p className="text-sm text-gray-200 mt-8">
        *Prices are monthly and can be cancelled anytime. Upgrade for instant access.
      </p>
    </div>
  );
};

export default PremiumPlans;
