import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Cpu,
  FileText,
  Briefcase,
  Mic,
  Sliders,
  Gift
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const StudentDashboard = () => {
  // Sample data for charts
  const courseProgressData = [
    { name: "Completed", value: 4 },
    { name: "In Progress", value: 2 },
    { name: "Pending", value: 3 }
  ];

  const performanceData = [
    { name: 'Jul', grade: 78 },
    { name: 'Aug', grade: 82 },
    { name: 'Sep', grade: 85 },
    { name: 'Oct', grade: 80 },
    { name: 'Nov', grade: 88 },
    { name: 'Dec', grade: 90 },
    { name: 'Jan', grade: 87 },
  ];

  const COLORS = ['#312e81', '#ec4899', '#f97316'];

  // Sidebar items for student tools with associated routes
  const sidebarItems = [
    { icon: <Cpu className="w-5 h-5" />, label: "AI Bot", active: true, route: "/ai" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Resume Builder", route: "/resume" },
    { icon: <Mic className="w-5 h-5" />, label: "Mock Interview", route: "/mock-interview" },
    { icon: <Sliders className="w-5 h-5" />, label: "AI Auto Grade Test", route: "/ai-auto-grade-test" },
    { icon: <Sliders className="w-5 h-5" />, label: "My Certificates", route: "/certification" },
  ];

  // Recent courses for quick access
  const recentCourses = [
    { name: "Machine Learning 101", instructor: "Prof. John", img: "https://i.pinimg.com/236x/be/a3/49/bea3491915571d34a026753f4a872000.jpg" },
    { name: "Data Structures", instructor: "Dr. Emma", img: "https://i.pinimg.com/236x/be/a3/49/bea3491915571d34a026753f4a872000.jpg" },
    { name: "Web Development", instructor: "Mr. Alex", img: "https://i.pinimg.com/236x/be/a3/49/bea3491915571d34a026753f4a872000.jpg" },
  ];

  // Recent activities / rewards from course completions
  const recentActivities = [
    { activity: "Completed 'Introduction to AI'", date: "28 January 2021", points: "+50" },
    { activity: "Submitted assignment in 'Web Development'", date: "25 January 2021", points: "+20" },
    { activity: "Attended live session for 'Data Structures'", date: "21 January 2021", points: "+30" },
  ];

  // Dummy Reward Transactions with adjusted values:
  // Earned transactions are positive; Redeemed transactions are negative.
  const rewardTransactions = [
    { id: 1, type: 'Earned', description: 'Completed Introduction to AI', date: '28 January 2021', points: 50 },
    { id: 2, type: 'Earned', description: 'Submitted assignment in Web Development', date: '25 January 2021', points: 20 },
    { id: 3, type: 'Earned', description: 'Attended live session for Data Structures', date: '21 January 2021', points: 30 },
    { id: 4, type: 'Redeemed', description: 'Redeemed for a course voucher', date: '15 February 2021', points: -40 },
    { id: 5, type: 'Earned', description: 'Completed Data Structures', date: '10 February 2021', points: 60 },
  ];

  // Compute totals for earned and redeemed points for transparency:
  const totalEarned = rewardTransactions
    .filter(tx => tx.type === 'Earned')
    .reduce((sum, tx) => sum + tx.points, 0); // 50 + 20 + 30 + 60 = 160

  const totalRedeemed = rewardTransactions
    .filter(tx => tx.type === 'Redeemed')
    .reduce((sum, tx) => sum + Math.abs(tx.points), 0); // | -40 | = 40

  // Current balance: earned points minus redeemed points = 160 - 40 = 120
  const currentBalance = totalEarned - totalRedeemed;

  const [filter, setFilter] = useState('All');

  const filteredTransactions = rewardTransactions.filter(tx =>
    filter === 'All' ? true : tx.type === filter
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen mt-24 bg-gradient-to-r from-gray-100 to-gray-50"
    >
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white p-6 border-r shadow-lg">
        <div className="flex items-center mb-10">
          <Briefcase className="w-10 h-10 text-blue-600" />
          <span className="ml-3 text-2xl font-bold text-gray-800">Student Dashboard</span>
        </div>
        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.route}
              className={`flex items-center p-3 rounded-lg transition transform hover:scale-105 duration-200 ${
                item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="ml-4 font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Overview</h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses or tools"
                className="pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Bell className="w-7 h-7 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            <img
              src="/api/placeholder/40/40"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-blue-600"
            />
          </div>
        </div>

        {/* Rewards Section */}
        <div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Course Completion Rewards</h2>
            <p className="mt-2 text-gray-600">
              Total Reward Points: <span className="font-semibold text-green-600">{currentBalance}</span>
            </p>
            {/* For clarity, showing breakdown: Earned = {totalEarned} and Redeemed = {totalRedeemed} */}
          </div>
        </div>

        {/* Academic Summary & Course Progress */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Academic Summary Card */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg opacity-90">Current GPA</p>
                <p className="text-4xl font-bold">3.8</p>
              </div>
              <Cpu className="w-10 h-10" />
            </div>
            <div className="mt-6">
              <p className="text-lg opacity-90">Major</p>
              <p className="text-xl">Computer Science</p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p className="text-xl">Enrolled: 5 Courses</p>
              <div>
                <p className="text-lg opacity-90">Credits Earned</p>
                <p className="text-xl">90</p>
              </div>
            </div>
          </div>

          {/* Course Progress Pie Chart */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Course Progress</h3>
            <div className="flex justify-center items-center">
              <PieChart width={250} height={250}>
                <Pie
                  data={courseProgressData}
                  cx={125}
                  cy={125}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {courseProgressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>

        {/* Performance Trend & Recent Courses */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Courses */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Courses</h3>
            <div className="flex space-x-6">
              {recentCourses.map((course, index) => (
                <div key={index} className="text-center">
                  <img
                    src={course.img}
                    alt={course.name}
                    className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-blue-500"
                  />
                  <p className="text-lg font-semibold text-gray-700">{course.name}</p>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Grade Trend Area Chart */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Grade Trend</h3>
            <div className="w-full h-64">
              <AreaChart
                width={300}
                height={200}
                data={performanceData}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#4b5563" />
                <YAxis stroke="#4b5563" />
                <Area
                  type="monotone"
                  dataKey="grade"
                  stroke="#4ade80"
                  fill="#bbf7d0"
                />
              </AreaChart>
            </div>
          </div>
        </div>

        {/* Reward Transactions Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Reward Transactions</h3>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {['All', 'Earned', 'Redeemed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    filter === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button
                onClick={() => alert('Redeem Rewards functionality coming soon!')}
                className="px-4 py-2 rounded-md bg-green-600 text-white transition-colors duration-200 hover:bg-green-700"
              >
                Redeem Rewards
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Description</th>
                  <th className="pb-2 text-right">Skill Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(tx => (
                  <tr key={tx.id} className="border-t">
                    <td className="py-2">{tx.date}</td>
                    <td className="py-2">{tx.description}</td>
                    <td className="py-2 font-semibold text-right">
                      <span className={tx.points >= 0 ? 'text-green-500' : 'text-red-500'}>
                        {tx.points > 0 ? `+${tx.points}` : tx.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Recent Activities */}
      <div className="hidden lg:block w-80 p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activities</h3>
          <div className="space-y-6">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <Gift className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">{activity.activity}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    activity.points.startsWith('+')
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {activity.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
