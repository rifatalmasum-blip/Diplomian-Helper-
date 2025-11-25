import React from 'react';
import { X, FileText, AlertCircle } from 'lucide-react';
import { Notice } from '../types';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoticeModal: React.FC<NoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock data - simulate admin posts. Empty array to show "Nothing to show"
  const notices: Notice[] = [
    // Uncomment to test data
    // { id: '1', title: 'Exam Schedule Published', date: 'Oct 24, 2025', content: 'Final exams start from Nov 10th.' } 
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 flex justify-between items-start text-white">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white/20 rounded-lg">
               <FileText size={24} />
             </div>
             <div>
               <h2 className="text-xl font-bold">Notice Board</h2>
               <p className="text-purple-100 text-sm">Latest updates from Admin</p>
             </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 min-h-[300px] bg-slate-50">
          {notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map(notice => (
                <div key={notice.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-800">{notice.title}</h3>
                    <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{notice.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{notice.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 pt-10">
              <AlertCircle size={48} className="mb-3 opacity-50" />
              <p className="font-medium">Nothing to show</p>
              <p className="text-xs">Check back later for updates</p>
            </div>
          )}
        </div>
        
        <div className="bg-white p-4 border-t border-slate-100 text-center">
          <button onClick={onClose} className="text-primary-600 font-medium hover:underline text-sm">Close Notice Board</button>
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
