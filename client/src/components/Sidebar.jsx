import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  History,
  Home,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/dashboard", icon: Calendar, label: "Dashboard" },
    { path: "/transcriptions", icon: FileText, label: "Transcriptions" },
    { path: "/history", icon: History, label: "History" },
    { path: "/patients", icon: Users, label: "Patients" },
  ];

  return (
    <div className="fixed w-64 h-full bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <FileText className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">MedTranscribe</h1>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isActive(path)
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}>
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-8 left-4 right-4">
        <Link
          to="/settings"
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors">
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </div>
  );
}
