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
    { name: 'Moon', value: stats.husbandTotal },
    { name: 'Lovely', value: stats.wifeTotal },
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
      {/* Pie Chart */}
      <div className="group rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 sm:p-6 lg:col-span-12 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-400/20">
        <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white sm:text-lg transition-colors duration-300">
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
              animationDuration={800}
              animationBegin={0}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={formatCurrency}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                transition: 'all 0.3s ease-in-out',
              }}
              animationDuration={300}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="group rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 lg:col-span-12 transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
          Growth Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
            <XAxis 
              dataKey="month" 
              style={{ transition: 'all 0.3s ease-in-out' }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              style={{ transition: 'all 0.3s ease-in-out' }}
            />
            <Tooltip 
              formatter={formatCurrency}
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                transition: 'all 0.3s ease-in-out',
              }}
              animationDuration={300}
            />
            <Legend 
              wrapperStyle={{ transition: 'all 0.3s ease-in-out' }}
            />
            <Bar 
              dataKey="Husband" 
              fill="#3b82f6" 
              name="Moon"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
              animationBegin={0}
            />
            <Bar 
              dataKey="Wife" 
              fill="#a855f7" 
              name="Lovely"
              radius={[8, 8, 0, 0]}
              animationDuration={800}
              animationBegin={100}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
