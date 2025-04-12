import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.COINDCX_API_KEY;
const API_SECRET = process.env.COINDCX_API_SECRET;

// 🔐 Create signature using HMAC SHA256
function getSignature(payload) {
  return crypto
    .createHmac('sha256', API_SECRET)
    .update(payload)
    .digest('hex');
}

// 📦 Export the function for use in other modules
export default getSignature;