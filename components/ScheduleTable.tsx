import React from 'react';
import type { AcademicLevel, ScheduleEntry } from '../types';
import { DAY_COLORS, ALL_DAYS, ALL_TIME_SLOTS } from '../constants';
import BackArrowIcon from './icons/BackArrowIcon';

interface ScheduleTableProps {
  level: AcademicLevel;
  group: string;
  schedule: ScheduleEntry[];
  onBack: () => void;
}

const CourseCell = ({ course }: { course: string }) => {
  if (course.toLowerCase().includes('cours amphi a')) {
     return (
        <div className="bg-indigo-100 p-2 rounded-lg shadow-sm h-full flex flex-col justify-center text-center ring-1 ring-indigo-200 border-l-4 border-indigo-500">
            <p className="font-bold text-sm text-indigo-800">Cours AMPHI A</p>
        </div>
     )
  }

  const parts = course.split('–');
  const subject = parts[0].trim();
  const details = parts.length > 1 ? parts.slice(1).join('–').trim() : '';
  const isOnline = course.toLowerCase().includes('distance') || course.toLowerCase().includes('en ligne');

  return (
    <div className="bg-white p-2 rounded-lg shadow-sm h-full flex flex-col justify-center text-center ring-1 ring-slate-200">
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
  
  const scheduledDays = [...new Set(schedule.map(entry => entry[0]))];
  const daysToRender = ALL_DAYS.filter(day => scheduledDays.includes(day));

  const scheduledTimes = [...new Set(schedule.map(entry => entry[1]))];
  const timesToRender = ALL_TIME_SLOTS.filter(time => scheduledTimes.some(scheduledTime => scheduledTime === time));


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
        <div 
          className="grid min-w-[900px]"
          style={{ gridTemplateColumns: `auto repeat(${timesToRender.length}, minmax(120px, 1fr))` }}
        >
          {/* Header Row: Time Slots */}
          <div className="sticky top-0 left-0 z-20 bg-white"></div> {/* Top-left empty cell */}
          {timesToRender.map(time => (
            <div key={time} className="sticky top-0 p-2 text-center text-xs font-bold text-slate-600 border-b-2 border-slate-200 bg-white z-10">
              {time.replace('–', ' - ')}
            </div>
          ))}

          {/* Schedule Rows */}
          {daysToRender.map(day => (
            <React.Fragment key={day}>
              {/* Day Header Cell */}
              <div className={`sticky left-0 p-2 pl-4 text-left font-bold text-sm z-10 ${DAY_COLORS[day]?.background || 'bg-slate-100'} ${DAY_COLORS[day]?.text || 'text-slate-800'}`}>
                {day}
              </div>
              
              {/* Course Cells */}
              {timesToRender.map(time => {
                const course = scheduleMap.get(`${day}-${time}`);
                return (
                  <div key={`${day}-${time}`} className={`p-1.5 border-b border-r border-slate-200 min-h-[100px] ${DAY_COLORS[day]?.background || 'bg-slate-100'} bg-opacity-30`}>
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