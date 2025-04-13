import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import OrderTabs from './OrderTabs'
import { useAuth } from '@/store/store'

export default function TradeForm() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        side: '',
        market: '',
        price_per_unit: '',
        total_quantity: '',
        api_key: user.apiKey,
        secret_key: user.secretKey
    })
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [markets, setMarkets] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault()
        setLoading(true)
        setResponse(null)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/trade/${formData.side}`, formData)
            setResponse(res.data)
        } catch (err) {
            setResponse(err.response?.data || { error: 'Unknown error' })
        } finally {
            setLoading(false)
        }
    }

    const fetchMarkets = async () => {
        try {
            const res = await axios.get('https://api.coindcx.com/exchange/ticker')
            setMarkets(res.data || [])
        } catch (err) {
            console.error('Failed to fetch market data', err)
        }
    }

    const filterMarkets = (query) => {
        return markets.filter(market => market.market.toLowerCase().includes(query.toLowerCase()))
    }

    useEffect(() => {
        fetchMarkets()
        const interval = setInterval(() => {
            fetchMarkets()
        }, 5000)

        return () => clearInterval(interval)
    }, [])


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
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/orders/cancel/${orderId}`)
            fetchOpenOrders()
        } catch (err) {
            console.error('Failed to cancel order', err)
        }
    }

    return (
        <div className="flex flex-row gap-26 min-h-screen">
            {/* Left side: search + market cards */}
            <Navbar />
            <div className="w-full md:w-1/2 px-4">
                {/* Search */}
                <div className="mb-4 mt-20">
                    <input
                        type="text"
                        placeholder="Search Markets"
                        className="w-full p-4 rounded bg-gray-700 text-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Market Cards */}
                <div className="grid grid-cols-1 gap-4">
                    {filterMarkets(searchQuery).slice(0, 20).map((marketData, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-4 rounded-lg shadow-lg"
                        >
                            <h3 className="text-xl font-semibold text-white">{marketData.market}</h3>
                            <div className="text-sm text-gray-400">
                                <p>Change (24h): {marketData.change_24_hour}%</p>
                                <p>High: {marketData.high}</p>
                                <p>Low: {marketData.low}</p>
                                <p>Volume: {marketData.volume}</p>
                                <p>Last Price: {marketData.last_price}</p>
                                <p>Bid: {marketData.bid}</p>
                                <p>Ask: {marketData.ask}</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    className="bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded text-white"
                                    onClick={() =>
                                        setFormData({ ...formData, market: marketData.market, side: 'buy' })
                                    }
                                >
                                    Buy
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded text-white"
                                    onClick={() =>
                                        setFormData({ ...formData, market: marketData.market, side: 'sell' })
                                    }
                                >
                                    Sell
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='fixed top-8 -right-12  w-1/2'>
                {/* Right side: Trade Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-6 rounded-2xl mb-20 mt-20 shadow-lg w-full max-w-sm space-y-4 self-start"
                >
                    <h2 className="text-2xl font-bold text-center text-white">Quickcrypt</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Side</label>
                        <select
                            name="side"
                            value={formData.side}
                            onChange={handleChange}
                            className="w-full bg-gray-700 rounded p-2 text-white"
                        >
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Market</label>
                        <input
                            type="text"
                            name="market"
                            value={formData.market}
                            onChange={handleChange}
                            className="w-full bg-gray-700 rounded p-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Price per Unit</label>
                        <input
                            type="number"
                            name="price_per_unit"
                            value={formData.price_per_unit}
                            onChange={handleChange}
                            className="w-full bg-gray-700 rounded p-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-white">Quantity</label>
                        <input
                            type="number"
                            name="total_quantity"
                            value={formData.total_quantity}
                            onChange={handleChange}
                            className="w-full bg-gray-700 rounded p-2 text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-800 p-2 rounded text-white font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>

                    {response && (
                        <div className="mt-4 text-sm">
                            <pre className="bg-gray-700 p-3 rounded overflow-x-auto text-white">
                                {JSON.stringify(response, null, 2)}
                            </pre>
                        </div>
                    )}
                </form>
                <OrderTabs

                    openOrders={fetchOpenOrders}
                    orderHistory={fetchOrderHistory}
                    cancelOrder={cancelOrder}
                />
            </div>
        </div>
    )
}
