import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Reminder: React.FC = () => {
  const navigate = useNavigate();
  
  // Alarm State
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmLabel, setAlarmLabel] = useState('');
  const [alarms, setAlarms] = useState<{time: string, label: string}[]>([]);

  // Timer State
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  const addAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (alarmTime) {
      setAlarms([...alarms, { time: alarmTime, label: alarmLabel || 'Alarm' }]);
      setAlarmTime('');
      setAlarmLabel('');
    }
  };

  // Timer Logic
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Ideally play a sound here
      alert("Study session complete!");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(studyMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-fade-in">
       <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary-600 hover:underline font-medium">
          <ArrowLeft size={20} /> Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Alarm Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                <Bell size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Set Alarm</h2>
            </div>

            <form onSubmit={addAlarm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Time</label>
                <input 
                  type="time" 
                  required
                  value={alarmTime}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Label (Optional)</label>
                <input 
                  type="text" 
                  value={alarmLabel}
                  onChange={(e) => setAlarmLabel(e.target.value)}
                  placeholder="e.g. Physics Study"
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
                Add Alarm
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Upcoming Alarms</h3>
              {alarms.length === 0 && <p className="text-slate-400 text-sm italic">No alarms set.</p>}
              {alarms.map((alarm, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-800">{alarm.time}</span>
                  <span className="text-sm text-slate-600">{alarm.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Study Timer Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                <Clock size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Study Timer</h2>
            </div>

            <div className="flex flex-col items-center justify-center py-8">
              <div className={`text-6xl font-black tracking-tighter mb-8 ${isActive ? 'text-primary-600' : 'text-slate-300'}`}>
                {formatTime(timeLeft)}
              </div>

              <div className="flex gap-4 w-full justify-center">
                <button 
                  onClick={toggleTimer}
                  className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isActive ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200'}`}
                >
                  {isActive ? <><Pause size={20} /> Pause</> : <><Play size={20} /> Start</>}
                </button>
                <button 
                  onClick={resetTimer}
                  className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
              </div>

              <div className="mt-8 w-full">
                <label className="block text-sm font-medium text-slate-600 mb-2">Set Duration (Minutes)</label>
                <div className="flex gap-2">
                  {[15, 25, 45, 60].map(m => (
                    <button 
                      key={m}
                      onClick={() => {
                        setStudyMinutes(m);
                        setTimeLeft(m * 60);
                        setIsActive(false);
                      }}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg border ${studyMinutes === m ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Reminder;
