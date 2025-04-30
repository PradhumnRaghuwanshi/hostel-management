import {
    LayoutDashboard,
    DoorOpen,
    ClipboardList,
    FileWarning,
    IndianRupee,
    Settings,
    UserCircle
  } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  
  export default function AdminSidebar() {
    const navigate = useNavigate();
    const menu = [
      { label: "Dashboard", icon: LayoutDashboard, route: "/AdminDashboard" },
      { label: "Manage Rooms", icon: DoorOpen, route: "/ManageRoom" },
      { label: "Student Requests", icon: ClipboardList, route: "/StudentRequest" },
      { label: "Complaints", icon: FileWarning, route: "/AdminComplaints" },
      { label: "Fee Management", icon: IndianRupee, route: "/FeeManagement" },
      { label: "Settings", icon: Settings, route: "/Settings" },
    ];
  
    return (
      <aside className="w-64 bg-white shadow-xl px-6 py-8 flex flex-col justify-between min-h-screen">
        <div>
          <h2 className="text-3xl font-extrabold mb-8 text-blue-700 tracking-tight">
            Admin Panel
          </h2>
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
        {/* User & Logout (bottom) */}
        <div className="flex flex-col gap-3 mt-10">
          <div className="flex items-center gap-2">
            <UserCircle className="h-9 w-9 text-blue-400" />
            <div>
              <p className="font-semibold text-gray-700">Admin</p>
              <p className="text-xs text-gray-400">admin@hostel.com</p>
            </div>
          </div>
          <button
            className="w-full bg-red-100 hover:bg-red-200 text-red-600 rounded-lg px-4 py-2 text-sm mt-2 font-semibold transition"
            onClick={() => navigate("/Login")}
          >
            Logout
          </button>
        </div>
      </aside>
    );
  }
  