import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const marketData = [
  { name: "USDT", pair: "USDT/INR", price: 88.44, change: -0.40, volume: 75804074.37, high: 89.0, low: 87.64 },
  { name: "BTC", pair: "BTC/INR", price: 7365295.17, change: 3.16, volume: 22962448.54, high: 7450000.00, low: 7055312.66 },
  { name: "FARTCOIN", pair: "FARTCOIN/INR", price: 81.46, change: 29.73, volume: 19235611.81, high: 84.0, low: 61.9 },
  { name: "SOL", pair: "SOL/INR", price: 10704.43, change: 7.23, volume: 16136088.26, high: 10800.00, low: 9292.91 },
  { name: "ETH", pair: "ETH/INR", price: 140455.04, change: 2.81, volume: 13737010.18, high: 141865.89, low: 134897.78 },
  { name: "XRP", pair: "XRP/INR", price: 183.87, change: 4.36, volume: 11550390.25, high: 184.82, low: 174.19 },
];

const Market = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="gainers">
          <TabsList>
            <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
            <TabsTrigger value="losers">Top Losers</TabsTrigger>
            <TabsTrigger value="trending">Top Trending</TabsTrigger>
            <TabsTrigger value="volume">Top Volume</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-x-2">
          <Button variant="outline">1D</Button>
          <Button variant="ghost">3D</Button>
          <Button variant="ghost">7D</Button>
          <Button variant="ghost">1M</Button>
        </div>
      </div>

      <div className="mb-4 flex justify-end">
        <Input placeholder="Search Coins" className="w-64" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {marketData.map((coin, idx) => (
          <Card key={idx} className="flex items-center justify-between p-4">
            <div>
              <div className="text-lg font-semibold">{coin.pair}</div>
              <div className="text-sm text-muted-foreground">₹ {coin.price}</div>
            </div>
            <div className={`text-sm font-medium ${coin.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {coin.change}%
            </div>
            <div className="text-sm">Volume: ₹ {coin.volume.toLocaleString()}</div>
            <div className="text-sm">High: ₹ {coin.high}</div>
            <div className="text-sm">Low: ₹ {coin.low}</div>
            <div className="space-x-2">
              <Button variant="outline">Trade</Button>
              <Button variant="ghost" disabled>Margin</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Market;
