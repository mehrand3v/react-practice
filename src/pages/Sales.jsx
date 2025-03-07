// src/pages/Sales.jsx
import { BarChart2, DollarSign, TrendingUp, Users } from "lucide-react";

function Sales() {
  // Sample data
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,780",
      icon: DollarSign,
      change: "+12.5%",
      color: "from-green-500 to-emerald-700",
    },
    {
      title: "Total Sales",
      value: "567",
      icon: TrendingUp,
      change: "+8.2%",
      color: "from-blue-500 to-indigo-700",
    },
    {
      title: "New Customers",
      value: "45",
      icon: Users,
      change: "+5.8%",
      color: "from-purple-500 to-violet-700",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      icon: BarChart2,
      change: "+2.1%",
      color: "from-amber-500 to-orange-700",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Sales Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <div className="flex justify-between mb-4">
              <span className="text-gray-400 font-medium">{stat.title}</span>
              <div
                className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex items-baseline space-x-4">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className="text-green-500 text-sm">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <div className="h-64 flex items-center justify-center border border-gray-700 rounded-lg">
          <p className="text-gray-400">Sales chart placeholder</p>
        </div>
      </div>
    </div>
  );
}

export default Sales;
