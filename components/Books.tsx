import React, { useState } from 'react';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: '1', title: '1st Semester', count: '6 Books' },
  { id: '2', title: '2nd Semester', count: '7 Books' },
  { id: '3', title: '3rd Semester', count: '6 Books' },
  { id: '4', title: '4th Semester', count: '7 Books' },
  { id: '5', title: '5th Semester', count: '5 Books' },
  { id: '6', title: '6th Semester', count: '8 Books' },
  { id: '7', title: '7th Semester', count: '5 Books' },
];

const Books: React.FC = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubOptionClick = (title: string) => {
    setToastMessage(`${title}: Coming Soon!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary-600 hover:underline font-medium">
        <ArrowLeft size={20} /> Back to Home
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center mb-8">
         <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen size={32} />
         </div>
         <h2 className="text-2xl font-bold text-slate-800">Academic Books</h2>
         <p className="text-slate-500">Select your semester to browse available resources</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSubOptionClick(cat.title)}
            className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-400 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                 {cat.id}
               </div>
               <div>
                 <h3 className="font-bold text-slate-800 group-hover:text-primary-700">{cat.title}</h3>
                 <p className="text-xs text-slate-500">{cat.count}</p>
               </div>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Books;
