export type ScheduleEntry = [string, string, string]; // [Day, Time, Course]

export type AcademicLevel = 'Licence 2' | 'Licence 3' | 'Master 1' | 'Master 2';

export type ScheduleForLevel = Record<string, ScheduleEntry[]>; // Group keys are strings (G1, G2, etc.)

export type Schedules = Record<AcademicLevel, ScheduleForLevel>;

export type DayColors = {
  [key: string]: {
    background: string;
    text: string;
  };
};
