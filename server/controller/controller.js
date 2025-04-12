import axios from 'axios';
import dotenv from 'dotenv';
import getSignature from '../utils/Signature.js';

dotenv.config();
const API_URL = "https://api.coindcx.com";
const COINDCX_API_KEY = process.env.COINDCX_API_KEY;

export const userBalance = async (req, res) => {

  const body = {
      timestamp: Date.now(),
  };

  const payload = Buffer.from(JSON.stringify(body)).toString();


  const signature = getSignature(payload);

  try {
      const response = await axios.post(`${API_URL}/exchange/v1/users/balances`, body, {
          headers: {
              'X-AUTH-APIKEY': COINDCX_API_KEY,
              'X-AUTH-SIGNATURE': signature,
              'Content-Type': 'application/json',
          },
      });

      res.json(response.data);
  } catch (error) {
      res.status(error.response?.status || 500).json({
          success: false,
          error: error.response?.data?.message || error.message,
        });
  }
}


export const Markets = async (req, res) => {

  try {
      const response = await axios.get(`${API_URL}/exchange/v1/markets`);

      res.json(response.data);
  } catch (error) {
      res.status(error.response?.status || 500).json({
          success: false,
          error: error.response?.data?.message || error.message,
        });
  }
}

export const Market_details = async (req, res) => {

  try {
      const response = await axios.get(`https://api.coindcx.com/exchange/v1/markets_details`);

      res.json(response.data);
  } catch (error) {
      res.status(error.response?.status || 500).json({
          success: false,
          error: error.response?.data?.message || error.message,
        });
  }
}



export const buyTrade = async (req, res) => {
    console.log("Buy trade request received:", req.body);
    const { side, market, price_per_unit, total_quantity } = req.body;

    if (!side || !market || !total_quantity || !price_per_unit) {
        return res.status(400).json({ error: "Missing required trade parameters" });
      }

    const body = {
        market, // e.g., BTCUSDT
        side, // 'buy' or 'sell'
        order_type: 'limit_order',
        price_per_unit,
        total_quantity,
        timestamp: Date.now(),
    };

    const payload = Buffer.from(JSON.stringify(body)).toString();


    const signature = getSignature(payload);

    try {
        const response = await axios.post(`${API_URL}/exchange/v1/orders/create`, body, {
            headers: {
                'X-AUTH-APIKEY': COINDCX_API_KEY,
                'X-AUTH-SIGNATURE': signature,
                'Content-Type': 'application/json',
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data?.message || error.message,
          });
    }
}


export const sellTrade = async (req, res) => {
    const { originalOrder } = req.body;
    const oppositeSide = originalOrder.side === 'buy' ? 'sell' : 'buy';
  
    const body = {
      market: originalOrder.market,
      side: oppositeSide,
      order_type: 'limit_order',
      total_quantity: originalOrder.total_quantity,
      price_per_unit: originalOrder.price_per_unit,
      timestamp: Date.now(),
    };
    const payload = Buffer.from(JSON.stringify(body)).toString();  
    
    const signature = getSignature(payload);
  
    try {
      const response = await axios.post(`${API_URL}/exchange/v1/orders/create`, body, {
        headers: {
          'X-AUTH-APIKEY': COINDCX_API_KEY,
          'X-AUTH-SIGNATURE': signature,
          'Content-Type': 'application/json',
        },
      });
  
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.response?.data || error.message });
    }
}
