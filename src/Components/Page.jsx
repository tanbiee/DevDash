import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Activity, Settings, Bell, Search, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const App = () => {
  // State for storing data fetched from API
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Effect to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using JSONPlaceholder as a mock API
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mock statistics for the dashboard cards
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, positive: true },
    { title: 'Active Users', value: '2,350', change: '+180.1%', icon: Users, positive: true },
    { title: 'Bounce Rate', value: '12.23%', change: '-4.5%', icon: Activity, positive: false }, // Negative change is good for bounce rate usually, but logic depends on context
  ];

  const SidebarItem = ({ icon: Icon, label, id }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
        activeTab === id 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    // Changed to fixed inset-0 w-screen h-screen to override default Vite/parent container constraints
    <div className="fixed inset-0 flex w-screen h-screen bg-gray-900 text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col p-4">
        <div className="flex items-center space-x-2 mb-8 px-2">
          <LayoutDashboard className="text-blue-500" size={28} />
          <span className="text-xl font-bold text-white">DevDash</span>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Overview" id="dashboard" />
          <SidebarItem icon={Users} label="Customers" id="customers" />
          <SidebarItem icon={Activity} label="Analytics" id="analytics" />
          <SidebarItem icon={Settings} label="Settings" id="settings" />
        </nav>

        <div className="p-4 bg-gray-700/50 rounded-xl mt-auto">
          <p className="text-sm text-gray-400 mb-2">Pro Plan</p>
          <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
            <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
          </div>
          <p className="text-xs text-gray-500">75% Used</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2 w-64">
            <Search className="text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none focus:outline-none text-sm ml-2 text-gray-300 w-full"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="w-full space-y-6">
            
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400 mt-1">Welcome back, here's what's happening today.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Download Report
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-gray-700/50 rounded-lg">
                      <stat.icon size={20} className="text-gray-300" />
                    </div>
                    <div className={`flex items-center text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.positive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                      {stat.change}
                    </div>
                  </div>
                  <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* API Data Table Section */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Recent Users (Fetched from API)</h2>
                <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-700/50 text-gray-400 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                      <th className="px-6 py-4 font-medium">Company</th>
                      <th className="px-6 py-4 font-medium">City</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading data...</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      users.slice(0, 5).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-white">{user.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{user.company.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{user.address.city}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                              passive
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;