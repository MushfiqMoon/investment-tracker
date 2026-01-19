'use client';

import { Investment } from '@/lib/investments';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface ChartsProps {
  investments: Investment[];
  stats: {
    husbandTotal: number;
    wifeTotal: number;
  };
}

const COLORS = ['#3b82f6', '#a855f7'];

export default function Charts({ investments, stats }: ChartsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prepare pie chart data
  const pieData = [
    { name: 'Moons\nInvestment', value: stats.husbandTotal },
    { name: 'Lovelys\nInvestment', value: stats.wifeTotal },
  ];

  // Prepare bar chart data - group by month
  const monthlyData = investments.reduce((acc, inv) => {
    const date = new Date(inv.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthLabel,
        Husband: 0,
        Wife: 0,
        Total: 0,
      };
    }

    acc[monthKey][inv.investor] += inv.amount;
    acc[monthKey].Total += inv.amount;

    return acc;
  }, {} as Record<string, { month: string; Husband: number; Wife: number; Total: number }>);

  const barData = Object.values(monthlyData).sort((a, b) => {
    return new Date(a.month).getTime() - new Date(b.month).getTime();
  });

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return '৳0';
    return `৳${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Pie Chart */}
      <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 sm:p-6">
        <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white sm:text-lg">
          Investment Split
        </h3>
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => {
                if (!name) return '';
                const labelText = isMobile 
                  ? `${name.split('\n')[0]}: ${((percent || 0) * 100).toFixed(0)}%`
                  : `${name}: ${((percent || 0) * 100).toFixed(0)}%`;
                return labelText;
              }}
              outerRadius={isMobile ? 70 : 100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={formatCurrency} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Growth Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip formatter={formatCurrency} />
            <Legend />
            <Bar dataKey="Husband" fill="#3b82f6" name="Your Investment" />
            <Bar dataKey="Wife" fill="#a855f7" name="Her Investment" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
