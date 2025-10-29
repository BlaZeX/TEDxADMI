import { Speaker, ScheduleItem } from './types';

export const EVENT_DATE = "November 16, 2024";
export const EVENT_THEME = "Genesis";
export const EVENT_VENUE = "Mumbai University Campus";

export const SPEAKERS: Speaker[] = [
  {
    name: "Dr. Anya Sharma",
    title: "AI Ethicist",
    bio: "Pioneering the conversation on artificial intelligence and its societal impact, Dr. Sharma brings a critical perspective on our digital future.",
    imageUrl: "https://picsum.photos/id/1027/400/400"
  },
  {
    name: "Rohan Verma",
    title: "Sustainable Architect",
    bio: "Verma is revolutionizing urban living with his eco-friendly designs that merge nature with modern architecture to create healthier communities.",
    imageUrl: "https://picsum.photos/id/1011/400/400"
  },
  {
    name: "Meera Desai",
    title: "Social Entrepreneur",
    bio: "Founder of 'Connect', a platform empowering rural artisans, Meera's work is a testament to the power of technology in preserving culture.",
    imageUrl: "https://picsum.photos/id/1012/400/400"
  },
  {
    name: "Vikram Singh",
    title: "Astrophysicist",
    bio: "With his eyes on the stars, Vikram simplifies the complex mysteries of the cosmos, making space accessible and fascinating for everyone.",
    imageUrl: "https://picsum.photos/id/1013/400/400"
  },
  {
    name: "Dr. Lena Petrova",
    title: "Geneticist & Bio-Futurist",
    bio: "Dr. Petrova explores the very code of life, researching how gene editing technologies could mark the beginning of a new human evolution.",
    imageUrl: "https://picsum.photos/id/1014/400/400"
  },
  {
    name: "Arjun Kapoor",
    title: "Serial Tech Entrepreneur",
    bio: "From a garage startup to a global tech giant, Arjun shares his journey on how a single spark of an idea can ignite a revolution.",
    imageUrl: "https://picsum.photos/id/1015/400/400"
  },
  {
    name: "Isabella Rossi",
    title: "Kinetic Sculptor",
    bio: "Isabella breathes life into metal and stone, creating sculptures that explore the genesis of form, movement, and emotion.",
    imageUrl: "https://picsum.photos/id/1016/400/400"
  },
  {
    name: "Kenji Tanaka",
    title: "Urban Historian",
    bio: "Kenji unearths the stories of how great cities are born, revealing the patterns of civilization's origins and their lessons for our future.",
    imageUrl: "https://picsum.photos/id/1018/400/400"
  }
];

export const SCHEDULE: ScheduleItem[] = [
    { time: "9:00 AM", title: "Registration & Welcome Coffee", description: "Doors open. Get registered, grab some coffee, and meet fellow attendees." },
    { time: "10:00 AM", title: "Session 1: The Spark of Creation", description: "Talks by Dr. Anya Sharma and Isabella Rossi." },
    { time: "11:30 AM", title: "Coffee Break & Networking", description: "A short break to refresh and connect with others." },
    { time: "12:00 PM", title: "Session 2: The Blueprint of Life", description: "Talks by Dr. Lena Petrova and Rohan Verma." },
    { time: "1:30 PM", title: "Lunch Break", description: "Enjoy a curated lunch and network with speakers and attendees." },
    { time: "2:30 PM", title: "Session 3: Building New Realities", description: "Talks by Arjun Kapoor and Meera Desai." },
    { time: "4:00 PM", title: "Coffee Break & Networking", description: "Another opportunity to connect and discuss the talks." },
    { time: "4:30 PM", title: "Session 4: Echoes of the Cosmos", description: "Talks by Vikram Singh and Kenji Tanaka." },
    { time: "6:00 PM", title: "Closing Remarks & Final Networking", description: "Final thoughts and an opportunity to connect." }
];
