import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [currentMonth, setCurrentMonth] = useState(0); // 0 = Jan
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const year = 2026;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, year);
    const firstDay = getFirstDayOfMonth(currentMonth, year);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blanks, ...days];
  };

  const nextMonth = () => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
  const prevMonth = () => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-primary-600 p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon size={20} />
              <span className="font-medium opacity-80">{year}</span>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="flex items-center justify-between">
             <button onClick={prevMonth} className="p-2 hover:bg-white/20 rounded-full"><ChevronLeft size={24}/></button>
             <h2 className="text-3xl font-bold">{months[currentMonth]}</h2>
             <button onClick={nextMonth} className="p-2 hover:bg-white/20 rounded-full"><ChevronRight size={24}/></button>
          </div>
        </div>

        <div className="p-6 bg-white">
          <div className="grid grid-cols-7 mb-4 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-xs font-bold text-slate-400">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            {renderCalendar().map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day ? (
                  <button
                    onClick={() => setSelectedDate(`${day}-${currentMonth}-${year}`)}
                    className={`w-8 h-8 rounded-full text-sm font-medium transition-all flex items-center justify-center
                      ${selectedDate === `${day}-${currentMonth}-${year}` 
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 scale-110' 
                        : 'text-slate-700 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                  >
                    {day}
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
            ))}
          </div>
          
          {selectedDate && (
             <div className="mt-6 p-3 bg-primary-50 rounded-lg text-center text-primary-800 text-sm font-medium animate-fade-in">
                Selected: {selectedDate.split('-')[0]} {months[parseInt(selectedDate.split('-')[1])]}, {year}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
