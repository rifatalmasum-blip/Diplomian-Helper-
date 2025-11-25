import React, { useState } from 'react';
import { Menu, X, User, Settings, Moon, LogOut } from 'lucide-react';
import { HashRouter, useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNav = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-lg z-20 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="p-2 hover:bg-primary-700 rounded-full transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold tracking-wide" onClick={() => handleNav('/')} role="button">
              Diploma Helper
            </h1>
          </div>
          
          {/* Profile Icon (Desktop) */}
          <div className="hidden sm:block">
            <button className="p-2 hover:bg-primary-700 rounded-full transition-colors">
              <User size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="h-40 bg-gradient-to-br from-primary-500 to-primary-700 flex flex-col justify-end p-6 text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-md">
               <User size={32} />
            </div>
            <h2 className="font-bold text-lg">Student Profile</h2>
            <p className="text-primary-100 text-sm">Update your info here</p>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all">
                <User size={20} />
                <span>Edit Profile</span>
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all">
                <Settings size={20} />
                <span>App Settings</span>
             </button>
             <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all">
                <Moon size={20} />
                <span>Change Theme</span>
             </button>
             <hr className="my-4 border-slate-100" />
             <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                <LogOut size={20} />
                <span>Logout</span>
             </button>
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors font-medium"
            >
              Close Menu
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-6 pb-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-primary-100 text-center py-6 text-slate-500 text-sm font-medium shadow-inner mt-auto">
        <p>Develop by Rifat, DPI</p>
      </footer>
    </div>
  );
};

export default Layout;
