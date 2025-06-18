import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Utensils, 
  ListTree, 
  ShoppingCart, 
  CalendarDays, 
  Users, 
  LogOut 
} from 'lucide-react';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center p-2 rounded hover:bg-gray-700">
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-foods" className="flex items-center p-2 rounded hover:bg-gray-700">
              <Utensils className="w-5 h-5 mr-3" />
              <span>Manage Foods</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-categories" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ListTree className="w-5 h-5 mr-3" />
              <span>Manage Categories</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-orders" className="flex items-center p-2 rounded hover:bg-gray-700">
              <ShoppingCart className="w-5 h-5 mr-3" />
              <span>Manage Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-reservations" className="flex items-center p-2 rounded hover:bg-gray-700">
              <CalendarDays className="w-5 h-5 mr-3" />
              <span>Manage Reservations</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-customers" className="flex items-center p-2 rounded hover:bg-gray-700">
              <Users className="w-5 h-5 mr-3" />
              <span>Manage Customers</span>
            </Link>
          </li>
          <li className="mt-8 border-t border-gray-700 pt-2">
            <button className="flex items-center w-full p-2 rounded hover:bg-gray-700 text-red-400">
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;