export interface Project {
  id: number;
  name: string;
  image: string | null;
  tags: string[];
  description: string;
  link: string;
  date: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'Job Connect',
    image: 'assets/jobconnectlogo.png',
    tags: ['Python', 'Selenium'],
    description: 'A streamlined LinkedIn automation tool designed to simplify the job search and application process for software engineers.',
    link: 'https://github.com/jordan-schnur/Job-Connect',
    date: 'July 2020 - Present'
  },
  {
    id: 2,
    name: 'Death Is Inevitable',
    image: 'assets/die.jpg',
    tags: ['Godot', 'Game Jam'],
    description: 'Run from the scary monster and use the resources around the map to craft potions and weapons to delay the inevitable.',
    link: 'https://ldjam.com/events/ludum-dare/50/death-is-inevitable',
    date: 'April 2022'
  },
  {
    id: 3,
    name: 'Joob & Dover',
    image: 'assets/joob.png',
    tags: ['Unity', 'Management', 'Game Jam'],
    description: 'An Alien named “Joob” and his robot pal “Dever” crash land on the planet Earth, 1,000 years into the future. They have lost their ship, and must work together to find it. Joined Together by a neural link, Joob can record his movements, and send them to Dever to complete, traverse forgotten cities and solve unique puzzles in this cute, side-scrolling puzzler!',
    link: 'https://game-jam-peeps.itch.io/joob-and-dever',
    date: 'June 2021'
  },
  {
    id: 4,
    name: 'Arc of Time',
    image: 'assets/arc.png',
    tags: ['Unity', 'Management', 'Game Jam'],
    description: 'Arc of Time is a puzzle platformer game built in seven days for Brackeys Jam 2020. You use the your bow to solve puzzles and defeat enemies by rewinding them. ',
    link: 'https://game-jam-peeps.itch.io/arc-of-time',
    date: 'August 2020'
  },
  {
    id: 5,
    name: 'SandGears',
    image: 'assets/sandgears.png',
    tags: ['Rust', 'Vulkan'],
    description: 'SandGears is an interactive 2D sandbox simulation that allows users to experiment with mechanical contraptions and granular materials like sand. Play around with pistons, hinges, heaters, and more to create unique contraptions and observe their effects on the sand environment.',
    link: 'https://github.com/jordan-schnur/SandGears/tree/main',
    date: 'May 2023 - Present'
  },
  {
    id: 6,
    name: 'Bee Spellbound',
    image: 'assets/beespellbound.png',
    tags: ['Angular'],
    description: 'A very silly spelling bee game that helps you learn',
    link: 'https://github.com/jordan-schnur/Bee-Spellbound/tree/main',
    date: 'February 2024'
  },
];
