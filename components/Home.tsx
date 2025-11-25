import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Bell, Book, FileText, Calendar, MessageCircle } from 'lucide-react';
import NoticeModal from './NoticeModal';
import CalendarModal from './CalendarModal';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showNotice, setShowNotice] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);

  const handleLiveHelp = () => {
    setComingSoon(true);
    setTimeout(() => setComingSoon(false), 2500);
  };

  const options = [
    { 
      id: 1, 
      title: 'Routine Maker', 
      icon: <Table size={32} />, 
      color: 'bg-blue-500', 
      desc: 'Create & manage class routine',
      action: () => navigate('/routine') 
    },
    { 
      id: 2, 
      title: 'Reminder', 
      icon: <Bell size={32} />, 
      color: 'bg-rose-500', 
      desc: 'Set alarms & study timers',
      action: () => navigate('/reminder') 
    },
    { 
      id: 3, 
      title: 'Books', 
      icon: <Book size={32} />, 
      color: 'bg-emerald-500', 
      desc: 'Academic resources',
      action: () => navigate('/books') 
    },
    { 
      id: 4, 
      title: 'Notice', 
      icon: <FileText size={32} />, 
      color: 'bg-purple-500', 
      desc: 'Updates from admin',
      action: () => setShowNotice(true) 
    },
    { 
      id: 5, 
      title: 'Calendar', 
      icon: <Calendar size={32} />, 
      color: 'bg-orange-500', 
      desc: 'View 2026 schedule',
      action: () => setShowCalendar(true) 
    },
    { 
      id: 6, 
      title: 'Live Help', 
      icon: <MessageCircle size={32} />, 
      color: 'bg-indigo-500', 
      desc: 'Chat support (Coming Soon)',
      action: handleLiveHelp 
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10 mt-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Student!</h2>
        <p className="text-slate-500 max-w-md mx-auto">Manage your academic life efficiently with Diploma Helper.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={opt.action}
            className="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity ${opt.color}`}></div>
            
            <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-white shadow-lg ${opt.color} group-hover:scale-110 transition-transform duration-300`}>
              {opt.icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-primary-600 transition-colors">{opt.title}</h3>
            <p className="text-sm text-slate-500">{opt.desc}</p>
          </button>
        ))}
      </div>

      <NoticeModal isOpen={showNotice} onClose={() => setShowNotice(false)} />
      <CalendarModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} />

      {/* Global Toast for Coming Soon */}
      {comingSoon && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
           <div className="bg-slate-800 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce-in">
              <MessageCircle className="text-indigo-400" />
              <span className="font-semibold">Live Help is Coming Soon!</span>
           </div>
        </div>
      )}
    </div>
  );
};

export default Home;
