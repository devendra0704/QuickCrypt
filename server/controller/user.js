// controllers/userController.js
import { db } from "../config/db.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // 32 chars

const algorithm = "aes-256-cbc";
const key = Buffer.from(ENCRYPTION_KEY, "hex");
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

function decrypt(encryptedData, iv) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}


export const saveKeys = async (req, res) => {
  try {
    console.log("Save keys request received:", req.body);
    const { uid, apiKey, secretKey } = req.body;
    if (!uid || !apiKey || !secretKey) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const encryptedApi = encrypt(apiKey);
    const encryptedSecret = encrypt(secretKey);

    await db.collection("users").doc(uid).set({
      keys: {
        apiKey: encryptedApi,
        secretKey: encryptedSecret,
      }
    }, { merge: true });

    res.status(200).json({ message: "Keys saved securely in Firestore" });
  } catch (err) {
    console.error("Error saving to Firestore:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getKeys = async (req, res) => {
  try {
    const { uid } = req.params;
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const data = userDoc.data();
    const decryptedApiKey = decrypt(data.keys.apiKey.encryptedData, data.keys.apiKey.iv);
    const decryptedSecretKey = decrypt(data.keys.secretKey.encryptedData, data.keys.secretKey.iv);

    res.status(200).json({
      apiKey: decryptedApiKey,
      secretKey: decryptedSecretKey,
    });
  } catch (err) {
    console.error("Error retrieving keys:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
