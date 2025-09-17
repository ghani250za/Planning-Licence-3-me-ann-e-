import React from 'react';
import type { ScheduleGroup, ScheduleEntry } from '../types';
import { DAY_COLORS } from '../constants';
import BackArrowIcon from './icons/BackArrowIcon';

interface ScheduleTableProps {
  group: ScheduleGroup;
  schedule: ScheduleEntry[];
  onBack: () => void;
}

const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi'];
const TIME_SLOTS = [
  '08:00–09:30',
  '09:30–11:00',
  '11:00–12:30',
  '12:30–14:00',
  '14:00–15:30',
  '15:00–17:00'
];

const CourseCell = ({ course }: { course: string }) => {
  const parts = course.split('–');
  const subject = parts[0].trim();
  const details = parts.length > 1 ? parts.slice(1).join('–').trim() : '';
  const isAmphi = course.toLowerCase().includes('amphi');
  const isOnline = course.toLowerCase().includes('distance') || course.toLowerCase().includes('en ligne');

  return (
    <div className={`bg-white p-2 rounded-lg shadow-sm h-full flex flex-col justify-center text-center ring-1 ring-slate-200 ${isAmphi ? 'border-l-4 border-indigo-500' : ''}`}>
      <p className="font-bold text-sm text-slate-800">{subject}</p>
      {details && <p className="text-xs text-slate-500 mt-1">{details}</p>}
      {isOnline && (
        <span className="mt-1 mx-auto px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] w-fit font-semibold">
          À distance
        </span>
      )}
    </div>
  );
};


const ScheduleTable: React.FC<ScheduleTableProps> = ({ group, schedule, onBack }) => {
  const scheduleMap = new Map<string, string>();
  schedule.forEach(([day, time, course]) => {
    scheduleMap.set(`${day}-${time}`, course);
  });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition"
          aria-label="Go back to group selection"
        >
          <BackArrowIcon />
          Retour
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 text-center">
          Groupe {group}
        </h2>
        <div className="w-20"></div> {/* Spacer */}
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-[auto,repeat(6,minmax(120px,1fr))] min-w-[900px]">
          {/* Header Row: Time Slots */}
          <div className="sticky left-0 z-10"></div> {/* Top-left empty cell */}
          {TIME_SLOTS.map(time => (
            <div key={time} className="p-2 text-center text-xs font-bold text-slate-600 border-b-2 border-slate-200">
              {time.replace('–', ' - ')}
            </div>
          ))}

          {/* Schedule Rows */}
          {DAYS.map(day => (
            <React.Fragment key={day}>
              {/* Day Header Cell */}
              <div className={`sticky left-0 p-2 text-center font-bold text-sm z-10 ${DAY_COLORS[day].background} ${DAY_COLORS[day].text}`}>
                {day}
              </div>
              
              {/* Course Cells */}
              {TIME_SLOTS.map(time => {
                const course = scheduleMap.get(`${day}-${time}`);
                return (
                  <div key={`${day}-${time}`} className={`p-1.5 border-b border-r border-slate-200 min-h-[100px] ${DAY_COLORS[day].background} bg-opacity-30`}>
                    {course ? <CourseCell course={course} /> : null}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
