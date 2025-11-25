import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Palette, Highlighter, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RoutineRow, RoutineCell } from '../types';

const initialRows: RoutineRow[] = [
  {
    id: '1',
    time: '09:00 AM',
    days: {
      sat: { text: 'Math', color: 'bg-white', isHighlighted: false },
      sun: { text: 'Physics', color: 'bg-white', isHighlighted: false },
      mon: { text: 'Chemistry', color: 'bg-white', isHighlighted: false },
      tue: { text: 'English', color: 'bg-white', isHighlighted: false },
      wed: { text: 'Bangla', color: 'bg-white', isHighlighted: false },
      thu: { text: 'Drawing', color: 'bg-white', isHighlighted: false },
    }
  }
];

const RoutineMaker: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<RoutineRow[]>(initialRows);
  const [selectedColor, setSelectedColor] = useState<string>('bg-yellow-100');
  const [isHighlightMode, setIsHighlightMode] = useState(false);

  const days = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu'];

  const addRow = () => {
    const newRow: RoutineRow = {
      id: Date.now().toString(),
      time: '00:00',
      days: days.reduce((acc, day) => ({
        ...acc,
        [day]: { text: '', color: 'bg-white', isHighlighted: false }
      }), {})
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    setRows(rows.filter(r => r.id !== id));
  };

  const updateCell = (rowId: string, day: string, field: keyof RoutineCell, value: any) => {
    setRows(rows.map(row => {
      if (row.id !== rowId) return row;
      return {
        ...row,
        days: {
          ...row.days,
          [day]: {
            ...row.days[day],
            [field]: value
          }
        }
      };
    }));
  };

  const updateTime = (rowId: string, time: string) => {
    setRows(rows.map(r => r.id === rowId ? { ...r, time } : r));
  };

  const handleCellClick = (rowId: string, day: string) => {
    if (isHighlightMode) {
       const current = rows.find(r => r.id === rowId)?.days[day].isHighlighted;
       updateCell(rowId, day, 'isHighlighted', !current);
    } else {
       // Apply selected color on click if intended, or keep it for edit
       // For this UX, let's just allow text editing directly and color changing via a specific action or just click-to-color
       updateCell(rowId, day, 'color', selectedColor);
    }
  };

  const colors = [
    'bg-white', 'bg-red-100', 'bg-orange-100', 'bg-yellow-100', 
    'bg-green-100', 'bg-teal-100', 'bg-blue-100', 'bg-indigo-100', 'bg-purple-100'
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary-600 hover:underline font-medium">
          <ArrowLeft size={20} /> Back to Home
        </button>
        <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors">
          <Save size={18} /> Save Routine
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
        <div className="flex flex-wrap gap-4 mb-6 items-center border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Palette size={18} /> Cell Color:
            </span>
            <div className="flex gap-1">
              {colors.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedColor(c);
                    setIsHighlightMode(false);
                  }}
                  className={`w-6 h-6 rounded-full border border-slate-300 ${c} ${selectedColor === c && !isHighlightMode ? 'ring-2 ring-primary-500 ring-offset-1' : ''}`}
                />
              ))}
            </div>
          </div>
          
          <div className="h-6 w-px bg-slate-300 mx-2 hidden sm:block"></div>

          <button 
            onClick={() => setIsHighlightMode(!isHighlightMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isHighlightMode ? 'bg-yellow-400 text-yellow-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            <Highlighter size={16} />
            {isHighlightMode ? 'Highlight Mode ON' : 'Highlight Text'}
          </button>
        </div>

        <div className="overflow-x-auto pb-4">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-sm font-bold text-slate-500 uppercase tracking-wider border-b-2 border-slate-100">Time</th>
                {days.map(d => (
                  <th key={d} className="p-3 text-left text-sm font-bold text-slate-500 uppercase tracking-wider border-b-2 border-slate-100">{d}</th>
                ))}
                <th className="p-3 w-10 border-b-2 border-slate-100"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-2">
                    <input 
                      type="text" 
                      value={row.time} 
                      onChange={(e) => updateTime(row.id, e.target.value)}
                      className="w-24 p-2 rounded border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-sm font-medium text-slate-700"
                    />
                  </td>
                  {days.map(day => (
                    <td key={day} className="p-2">
                      <div className="relative">
                         <input 
                          type="text" 
                          value={row.days[day].text} 
                          onChange={(e) => updateCell(row.id, day, 'text', e.target.value)}
                          className={`w-full p-2 rounded border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-sm transition-colors ${row.days[day].color} ${row.days[day].isHighlighted ? 'font-bold text-primary-700 decoration-wavy underline decoration-primary-300' : 'text-slate-700'}`}
                          placeholder="..."
                        />
                        <button 
                          onClick={() => handleCellClick(row.id, day)}
                          className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 sm:hover:opacity-100 p-1 rounded-full hover:bg-black/10 text-slate-500"
                          title="Apply Color/Highlight"
                        >
                          <div className={`w-2 h-2 rounded-full ${selectedColor === 'bg-white' ? 'bg-slate-400' : selectedColor.replace('bg-', 'bg-')}`}></div>
                        </button>
                      </div>
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <button onClick={() => deleteRow(row.id)} className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <button onClick={addRow} className="mt-4 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center gap-2">
          <Plus size={20} /> Add Time Slot
        </button>
      </div>
    </div>
  );
};

export default RoutineMaker;
