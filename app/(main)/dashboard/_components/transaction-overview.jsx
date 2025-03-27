"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, BarChart as BarChartIcon, PieChartIcon, LineChart } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "#D4A5A5",
  "#9FA8DA",
];

// Chart types
const CHART_TYPES = {
  PIE: 'pie',
  BAR: 'bar',
  AREA: 'area'
};

// SVG Background Patterns
const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 opacity-5">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill="url(#smallGrid)" />
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// VVS Vault Logo/Brand element
const BrandWatermark = () => (
  <div className="absolute bottom-2 right-2 text-primary/10 font-bold text-xl z-0">
    VVS VAULT
  </div>
);

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );
  const [chartType, setChartType] = useState(CHART_TYPES.PIE);

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for charts
  const chartData = useMemo(() => {
    return Object.entries(expensesByCategory).map(
      ([category, amount], index) => ({
        name: category,
        value: amount,
        fill: COLORS[index % COLORS.length]
      })
    );
  }, [expensesByCategory]);

  // Calculate total expenses for the current month
  const totalExpenses = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.value, 0);
  }, [chartData]);

  // Get top expense category
  const topExpenseCategory = useMemo(() => {
    if (chartData.length === 0) return null;
    return chartData.sort((a, b) => b.value - a.value)[0];
  }, [chartData]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalExpenses) * 100).toFixed(1);
      
      return (
        <div className="bg-card border border-border p-2 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-primary">₹{data.value.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{percentage}% of total</p>
        </div>
      );
    }
    
    return null;
  };

  // Render the appropriate chart based on chartType
  const renderChart = () => {
    if (chartData.length === 0) {
      return (
        <p className="text-center text-muted-foreground py-4">
          No expenses this month
        </p>
      );
    }

    switch (chartType) {
      case CHART_TYPES.PIE:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1000}
                animationBegin={0}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                layout="vertical" 
                align="right"
                verticalAlign="middle"
                formatter={(value, entry) => (
                  <span className="text-xs font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case CHART_TYPES.BAR:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barCategoryGap={8}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `₹${value}`}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                width={80} 
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]} 
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
        
      case CHART_TYPES.AREA:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                {chartData.map((entry, index) => (
                  <linearGradient 
                    key={`gradient-${index}`} 
                    id={`colorGradient${index}`} 
                    x1="0" y1="0" x2="0" y2="1"
                  >
                    <stop offset="5%" stopColor={entry.fill} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={entry.fill} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tickFormatter={(value) => `₹${value}`} 
                tick={{ fontSize: 12 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip content={<CustomTooltip />} />
              {chartData.map((entry, index) => (
                <Area
                  key={`area-${index}`}
                  type="monotone"
                  dataKey="value"
                  name={entry.name}
                  stroke={entry.fill}
                  fillOpacity={1}
                  fill={`url(#colorGradient${index})`}
                  animationDuration={1000}
                  hide={index !== 0}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Recent Transactions Card */}
      <Card className="gradient-border overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-primary/10 to-transparent z-0"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
          <CardTitle className="text-base font-normal">
            Recent Transactions
          </CardTitle>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[140px] border-border bg-card/40 backdrop-blur-sm">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No recent transactions
              </p>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-card/60 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(transaction.date), "PP")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex items-center font-medium",
                        transaction.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      )}
                    >
                      {transaction.type === "EXPENSE" ? (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      )}
                      ₹{transaction.amount.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expense Breakdown Card */}
      <Card className="gradient-border overflow-hidden relative">
        <BackgroundPattern />
        <BrandWatermark />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 z-0"></div>
        
        <CardHeader className="relative z-10 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-normal">
              Monthly Expense Breakdown
            </CardTitle>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${chartType === CHART_TYPES.PIE ? 'bg-accent text-accent-foreground' : ''}`} 
                onClick={() => setChartType(CHART_TYPES.PIE)}
              >
                <PieChartIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${chartType === CHART_TYPES.BAR ? 'bg-accent text-accent-foreground' : ''}`} 
                onClick={() => setChartType(CHART_TYPES.BAR)}
              >
                <BarChartIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`h-8 w-8 ${chartType === CHART_TYPES.AREA ? 'bg-accent text-accent-foreground' : ''}`} 
                onClick={() => setChartType(CHART_TYPES.AREA)}
              >
                <LineChart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {chartData.length > 0 && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Expenses:</span>
                <span className="font-semibold">₹{totalExpenses.toFixed(2)}</span>
              </div>
              {topExpenseCategory && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Top Category:</span>
                  <span className="font-medium flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full mr-1" style={{ backgroundColor: topExpenseCategory.fill }}></span>
                    {topExpenseCategory.name}
                    <span className="ml-2 text-primary">(₹{topExpenseCategory.value.toFixed(2)})</span>
                  </span>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-0 pb-5 relative z-10">
          <div className="h-[300px] px-4">
            {renderChart()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
