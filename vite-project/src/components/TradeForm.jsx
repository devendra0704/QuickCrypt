import { useEffect, useState } from 'react'
import axios from 'axios'
import OrderTabs from './OrderTabs'
import { useAuth } from '@/store/store'

export default function TradeForm() {
    const [formData, setFormData] = useState({
        side: 'buy',
        market: 'BTCUSDT',
        price_per_unit: '',
        total_quantity: '',
    })
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [btcPrice, setBtcPrice] = useState(null)
    const [openOrders, setOpenOrders] = useState([])
    const [orderHistory, setOrderHistory] = useState([])
    // const { apiKey } = useAuth();


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setResponse(null)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/trade/buy`, formData)
            setResponse(res.data)
        } catch (err) {
            setResponse(err.response?.data || { error: 'Unknown error' })
        } finally {
            setLoading(false)
        }
    }

    const fetchOpenOrders = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/open`)
            setOpenOrders(res.data || [])
        } catch (err) {
            console.error('Error fetching open orders:', err)
        }
    }

    const fetchOrderHistory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/history`)
            setOrderHistory(res.data || [])
        } catch (err) {
            console.error('Error fetching order history:', err)
        }
    }

    const cancelOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/api/orders/cancel/${orderId}`)
            fetchOpenOrders()
        } catch (err) {
            console.error('Failed to cancel order', err)
        }
    }


    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
                setBtcPrice(res.data.price)
            } catch (error) {
                console.error('Failed to fetch BTC price', error)
            }
        }

        fetchPrice()
        fetchOpenOrders()
        fetchOrderHistory()

        const interval = setInterval(fetchPrice, 5000) // refresh every 5 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full max-w-2xl space-y-6">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Quickcrypt</h2>

                {btcPrice && (
                    <div className="text-center text-sm text-gray-400">
                        Current BTC/USDT: <span className="font-semibold text-white">${parseFloat(btcPrice).toFixed(2)}</span>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-1">Side</label>
                    <select
                        name="side"
                        value={formData.side}
                        onChange={handleChange}
                        className="w-full bg-gray-700 rounded p-2"
                    >
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Market</label>
                    <input
                        type="text"
                        name="market"
                        value={formData.market}
                        onChange={handleChange}
                        className="w-full bg-gray-700 rounded p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Price per Unit</label>
                    <input
                        type="number"
                        name="price_per_unit"
                        value={formData.price_per_unit}
                        onChange={handleChange}
                        className="w-full bg-gray-700 rounded p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <input
                        type="number"
                        name="total_quantity"
                        value={formData.total_quantity}
                        onChange={handleChange}
                        className="w-full bg-gray-700 rounded p-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-800 p-2 rounded text-white font-semibold cursor-pointer"
                    disabled={loading}
                >
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>

                {response && (
                    <div className="mt-4 text-sm">
                        <pre className="bg-gray-700 p-3 rounded overflow-x-auto">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                )}
            </form>
            <OrderTabs
                openOrders={openOrders}
                orderHistory={orderHistory}
                cancelOrder={cancelOrder}
            />
        </div>
    )
}