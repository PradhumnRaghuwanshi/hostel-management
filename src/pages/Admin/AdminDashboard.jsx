import { Bell, Users, Building2, FileWarning, IndianRupee, LayoutDashboard, ClipboardList, DoorOpen, Settings, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Total Students",
      icon: <Users className="h-10 w-10 text-blue-600 bg-blue-100 rounded-full p-2" />,
      value: "342",
      color: "from-blue-50 to-blue-100"
    },
    {
      title: "Rooms Allocated",
      icon: <Building2 className="h-10 w-10 text-green-600 bg-green-100 rounded-full p-2" />,
      value: "187",
      color: "from-green-50 to-green-100"
    },
    {
      title: "Pending Complaints",
      icon: <FileWarning className="h-10 w-10 text-yellow-600 bg-yellow-100 rounded-full p-2" />,
      value: "24",
      color: "from-yellow-50 to-yellow-100"
    },
    {
      title: "Total Fees Collected",
      icon: <IndianRupee className="h-10 w-10 text-purple-600 bg-purple-100 rounded-full p-2" />,
      value: "₹ 15.3L",
      color: "from-purple-50 to-purple-100"
    },
  ];

  const menu = [
    { label: "Dashboard", icon: LayoutDashboard, route: "/AdminDashboard" },
    { label: "Manage Rooms", icon: DoorOpen, route: "/ManageRoom" },
    { label: "Student Requests", icon: ClipboardList, route: "/StudentRequest" },
    { label: "Complaints", icon: FileWarning, route: "/AdminComplaints" },
    { label: "Fee Management", icon: IndianRupee, route: "/FeeManagement" },
    { label: "Settings", icon: Settings, route: "#" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-slate-100 to-purple-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl px-6 py-8 flex flex-col gap-12 min-h-screen hidden md:flex">
        <div>
          <h2 className="text-3xl font-extrabold mb-6 text-blue-700 tracking-tight">Admin Panel</h2>
          <ul className="space-y-2">
            {menu.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 rounded-lg px-3 py-2 transition cursor-pointer group"
                onClick={() => item.route !== "#" && navigate(item.route)}
              >
                <item.icon className="h-6 w-6 text-blue-500 group-hover:scale-110 transition" />
                <span className="text-base font-medium">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <UserCircle className="h-9 w-9 text-blue-400" />
            <div>
              <p className="font-semibold text-gray-700">Admin</p>
              <p className="text-xs text-gray-400">admin@hostel.com</p>
            </div>
          </div>
          <button
            className="w-full bg-red-100 hover:bg-red-200 text-red-600 rounded-lg px-4 py-2 text-sm mt-2 font-semibold transition"
            onClick={() => alert("Logout logic here")}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-0 sm:px-6 py-6">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-6">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight mb-1">Admin Dashboard</h1>
            <p className="text-gray-500 text-base font-medium">Welcome back, manage everything from here.</p>
          </div>
          <div className="flex gap-4 items-center mt-4 sm:mt-0">
            <button className="relative group">
              <Bell className="h-7 w-7 text-blue-600" />
              <span className="absolute -top-1.5 -right-1 h-4 w-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold shadow">3</span>
              <span className="absolute top-8 right-0 bg-white border shadow-md rounded p-2 text-sm hidden group-hover:block">3 new notifications</span>
            </button>
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Admin Avatar"
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-300"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 mb-8">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-lg p-6 bg-gradient-to-br ${card.color} flex items-center gap-4 hover:scale-105 transition-transform duration-200`}
            >
              {card.icon}
              <div>
                <p className="text-base text-gray-600">{card.title}</p>
                <h2 className="text-2xl font-bold text-gray-900">{card.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow mb-8 mx-6">
          <h2 className="text-lg font-bold mb-4 text-blue-700">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">🧑 <b>Anjali Sharma</b> submitted a complaint</span>
              <span className="text-xs text-gray-400">2 mins ago</span>
            </li>
            <li className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">🏠 <b>Room 105</b> allocated to Rahul Mehta</span>
              <span className="text-xs text-gray-400">10 mins ago</span>
            </li>
            <li className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1">💳 Fee payment received from <b>Aman Singh</b></span>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </li>
          </ul>
        </div>

        {/* Performance Overview */}
        <div className="bg-white rounded-2xl p-6 shadow mx-6">
          <h2 className="text-lg font-bold mb-4 text-blue-700">Performance Overview</h2>
          <div className="text-gray-500 text-sm">
            (Add analytics, chart, or graphs here if needed)
          </div>
        </div>
      </main>
    </div>
  );
}
