export interface Reminder {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
}

export const reminderData: Reminder[] = [
  {
    id: 1,
    title: "Saint's Birthday",
    date: "Sun Feb 23 2025",
    time: "08:00AM",
    description: "Celebrate Saint's birthday with family and friends.",
  },
  {
    id: 2,
    title: "Buy groceries",
    date: "Wed Nov 15 2025",
    time: "09:00AM",
    description: "Buy groceries for the week from the local supermarket.",
  },
  {
    id: 3,
    title: "Doctor's appointment",
    date: "Thu Nov 16 2025",
    time: "11:00AM",
    description: "Visit Dr. Smith for a regular check-up.",
  },
  {
    id: 4,
    title: "Team meeting",
    date: "Fri Nov 17 2025",
    time: "02:00PM",
    description: "Monthly team meeting to discuss project progress.",
  },
  {
    id: 5,
    title: "Dinner with friends",
    date: "Sat Nov 18 2025",
    time: "07:00PM",
    description: "Dinner at the new Italian restaurant with friends.",
  },
  {
    id: 6,
    title: "Yoga class",
    date: "Sun Nov 19 2025",
    time: "06:00AM",
    description: "Morning yoga class at the community center.",
  },
  {
    id: 7,
    title: "Project deadline",
    date: "Mon Nov 20 2025",
    time: "05:00PM",
    description: "Submit the final project report to the client.",
  },
  {
    id: 8,
    title: "Anniversary celebration",
    date: "Tue Nov 21 2025",
    time: "08:00PM",
    description: "Celebrate wedding anniversary with a special dinner.",
  },
  {
    id: 9,
    title: "Parent-teacher meeting",
    date: "Wed Nov 22 2025",
    time: "10:00AM",
    description: "Discuss child's progress with the teacher.",
  },
  {
    id: 10,
    title: "Flight to New York ✈️✈️",
    date: "Thu Nov 23 2025",
    time: "04:00PM",
    description: "Flight to New York for a business trip.",
  },
  {
    id: 11,
    title: "Gym workout 💪💪💪",
    date: "Fri Nov 24 2025",
    time: "07:00AM",
    description: "Morning workout session at the gym.",
  },
];

interface Color {
  id: string;
  value: string;
  label: string;
}

export const colors: Color[] = [
  { id: "peach", value: "#FFE5D1", label: "Peach" },
  { id: "pink", value: "#FFD1D1", label: "Pink" },
  { id: "lime", value: "#E8FFD1", label: "Lime" },
  { id: "blue", value: "#D1F3FF", label: "Light Blue" },
  { id: "purple", value: "#E5D1FF", label: "Purple" },
  { id: "salmon", value: "#FFD1D1", label: "Salmon" },
];
