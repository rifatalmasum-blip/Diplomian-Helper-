export interface RoutineCell {
  text: string;
  color: string;
  isHighlighted: boolean;
}

export interface RoutineRow {
  id: string;
  time: string;
  days: {
    [key: string]: RoutineCell; // mon, tue, wed, etc.
  };
}

export interface BookCategory {
  id: string;
  title: string;
  semester: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
}

export enum AppRoute {
  HOME = '/',
  ROUTINE = '/routine',
  REMINDER = '/reminder',
  BOOKS = '/books'
}
