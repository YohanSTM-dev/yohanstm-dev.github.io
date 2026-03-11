import { create } from 'zustand';
import { format } from 'date-fns';

export type PRRecord = {
  id: string;
  exercise: string;
  value: number;
  unit: 'kg' | 'lbs' | 'rep' | 'sec';
  date: string; // ISO
  note?: string;
};

type PRState = {
  records: PRRecord[];
  addRecord: (record: Omit<PRRecord, 'id'>) => void;
};

const uid = () => Math.random().toString(36).slice(2, 9);

const SAMPLE: PRRecord[] = [
  {
    id: uid(),
    exercise: 'Squat',
    value: 140,
    unit: 'kg',
    date: format(new Date(), 'yyyy-MM-dd'),
    note: '5x5 en forme',
  },
  {
    id: uid(),
    exercise: 'Développé couché',
    value: 100,
    unit: 'kg',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    id: uid(),
    exercise: 'Tractions',
    value: 15,
    unit: 'rep',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
];

export const usePRStore = create<PRState>((set) => ({
  records: SAMPLE,
  addRecord: (record) =>
    set((state) => ({
      records: [
        { ...record, id: uid() },
        ...state.records,
      ],
    })),
}));
