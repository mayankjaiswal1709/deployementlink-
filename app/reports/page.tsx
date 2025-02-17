'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function ReportsPage() {
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [topSpenders, setTopSpenders] = useState([]);
  const [categorySales, setCategorySales] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const headers = {
          'Authorization': `Bearer ${token}`
        };

        // Fetch all reports in parallel
        const [revenueRes, spendersRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:5000/reports/daily-revenue', { headers }),
          fetch('http://localhost:5000/reports/top-spenders', { headers }),
          fetch('http://localhost:5000/reports/sales-by-category', { headers })
        ]);

        const [revenueData, spendersData, categoriesData] = await Promise.all([
          revenueRes.json(),
          spendersRes.json(),
          categoriesRes.json()
        ]);

        setDailyRevenue(revenueData.revenue);
        setTopSpenders(spendersData.spenders);
        setCategorySales(categoriesData.sales);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Sales Reports</h1>

      {/* Daily Revenue Chart */}
      <div className="mb-12 bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daily Revenue</h2>
        <div className="w-full overflow-x-auto">
          <BarChart width={800} height={300} data={dailyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="_sum.total" fill="#8884d8" name="Revenue" />
          </BarChart>
        </div>
      </div>

      {/* Top Spenders */}
      <div className="mb-12 bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Top Spenders</h2>
        <div className="grid gap-4">
          {topSpenders.map((spender: any) => (
            <div key={spender.id} className="flex justify-between items-center p-4 bg-background rounded">
              <div>
                <p className="font-semibold">{spender.name}</p>
                <p className="text-muted-foreground">{spender.email}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${spender.orders.reduce((sum: number, order: any) => sum + order.total, 0).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{spender.orders.length} orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Sales */}
      <div className="mb-12 bg-card p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Sales by Category</h2>
        <div className="w-full overflow-x-auto">
          <BarChart width={800} height={300} data={categorySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalRevenue" fill="#82ca9d" name="Revenue" />
            <Bar dataKey="totalSales" fill="#8884d8" name="Units Sold" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
