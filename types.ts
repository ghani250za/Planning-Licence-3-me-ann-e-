export type ScheduleEntry = [string, string, string]; // [Day, Time, Course]

export type ScheduleGroup = 'G1' | 'G2' | 'G3';

export type Schedules = Record<ScheduleGroup, ScheduleEntry[]>;

export type DayColors = {
  [key: string]: {
    background: string;
    text: string;
  };
};