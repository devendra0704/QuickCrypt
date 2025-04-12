import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// 🔐 Create signature using HMAC SHA256
function getSignature(payload,secret_key) {
  return crypto
    .createHmac('sha256', secret_key)
    .update(payload)
    .digest('hex');
}

// 📦 Export the function for use in other modules
export default getSignature;