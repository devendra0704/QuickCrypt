import express from 'express';
import { buyTrade, Market_details, Markets, sellTrade, userBalance } from '../controller/controller.js';
import { getKeys, saveKeys } from '../controller/user.js';

const router = express.Router();

router.post('/trade/buy', buyTrade);
router.post('/trade/sell', sellTrade);
router.post("/user/balances",userBalance);
router.get("/markets",Markets);
router.get("/market_details",Market_details);




router.post('/save-keys', saveKeys);
router.get('/get-keys/:uid',getKeys);


export default router;