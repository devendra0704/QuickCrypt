import { useState } from "react";

const OrderTabs = ({ openOrders, orderHistory, cancelOrder }) => {
    const [activeTab, setActiveTab] = useState("open");

    return (
        <div className="bg-gray-800 p-4 rounded-xl shadow w-1/2">
            <div className="flex border-b border-gray-600 mb-4">
                <button
                    className={`px-4 py-2 text-sm font-semibold ${
                        activeTab === "open"
                            ? "border-b-2 border-blue-500 text-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("open")}
                >
                    Open Orders
                </button>
                <button
                    className={`px-4 py-2 text-sm font-semibold ml-4 ${
                        activeTab === "history"
                            ? "border-b-2 border-blue-500 text-white"
                            : "text-gray-400"
                    }`}
                    onClick={() => setActiveTab("history")}
                >
                    Order History
                </button>
            </div>

            {activeTab === "open" ? (
                openOrders.length === 0 ? (
                    <p className="text-gray-400 text-sm">No open orders</p>
                ) : (
                    <div className="space-y-2">
                        {openOrders.map((order) => (
                            <div
                                key={order.id}
                                className="flex justify-between items-center bg-gray-700 p-3 rounded text-sm"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium text-white">
                                        {order.side.toUpperCase()} {order.total_quantity} @ ${order.price_per_unit}
                                    </span>
                                    <span className="text-gray-400 text-xs">{order.market}</span>
                                </div>
                                <button
                                    onClick={() => cancelOrder(order.id)}
                                    className="text-red-400 hover:text-red-600 text-xs font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        ))}
                    </div>
                )
            ) : orderHistory.length === 0 ? (
                <p className="text-gray-400 text-sm">No order history</p>
            ) : (
                <div className="space-y-2">
                    {orderHistory.map((order, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 p-3 rounded text-sm flex justify-between items-center"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-white">
                                    {order.side.toUpperCase()} {order.total_quantity} @ ${order.price_per_unit}
                                </span>
                                <span className="text-gray-400 text-xs">{order.market}</span>
                            </div>
                            <span className="text-xs text-gray-300">{order.status}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderTabs;