import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "IIT Bombay",
    location: "Mumbai", state: "Maharashtra",
    fees_per_year: 220000, rating: 4.8, placement_pct: 95,
    established: 1958, type: "Government",
    overview: "Premier engineering institute known for research and industry connections.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 220000 },
      { name: "B.Tech Electrical Engineering", duration_yrs: 4, fees: 220000 },
      { name: "M.Tech AI & Data Science", duration_yrs: 2, fees: 25000 },
    ],
  },
  {
    name: "IIT Delhi",
    location: "New Delhi", state: "Delhi",
    fees_per_year: 210000, rating: 4.8, placement_pct: 94,
    established: 1961, type: "Government",
    overview: "Top-ranked institute with strong alumni network in tech and finance.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 210000 },
      { name: "B.Tech Mechanical Engineering", duration_yrs: 4, fees: 210000 },
      { name: "MBA", duration_yrs: 2, fees: 400000 },
    ],
  },
  {
    name: "IIT Madras",
    location: "Chennai", state: "Tamil Nadu",
    fees_per_year: 215000, rating: 4.7, placement_pct: 93,
    established: 1959, type: "Government",
    overview: "Known for cutting-edge research and highest-ranked institute in India.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 215000 },
      { name: "B.Tech Civil Engineering", duration_yrs: 4, fees: 215000 },
    ],
  },
  {
    name: "BITS Pilani",
    location: "Pilani", state: "Rajasthan",
    fees_per_year: 530000, rating: 4.5, placement_pct: 88,
    established: 1964, type: "Deemed",
    overview: "Flexible curriculum and strong industry internship programmes.",
    courses: [
      { name: "B.E. Computer Science", duration_yrs: 4, fees: 530000 },
      { name: "B.E. Electronics", duration_yrs: 4, fees: 530000 },
      { name: "M.Sc Mathematics", duration_yrs: 2, fees: 200000 },
    ],
  },
  {
    name: "NIT Trichy",
    location: "Tiruchirappalli", state: "Tamil Nadu",
    fees_per_year: 135000, rating: 4.4, placement_pct: 85,
    established: 1964, type: "Government",
    overview: "Consistently ranked top NIT with excellent placement record.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 135000 },
      { name: "B.Tech Chemical Engineering", duration_yrs: 4, fees: 135000 },
    ],
  },
  {
    name: "VIT Vellore",
    location: "Vellore", state: "Tamil Nadu",
    fees_per_year: 198000, rating: 4.1, placement_pct: 80,
    established: 1984, type: "Deemed",
    overview: "Large private university with strong MNC recruitment drives.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 198000 },
      { name: "B.Tech Biotech", duration_yrs: 4, fees: 198000 },
      { name: "MBA", duration_yrs: 2, fees: 350000 },
    ],
  },
  {
    name: "Jadavpur University",
    location: "Kolkata", state: "West Bengal",
    fees_per_year: 25000, rating: 4.3, placement_pct: 79,
    established: 1955, type: "Government",
    overview: "Reputed state university known for engineering and arts faculties.",
    courses: [
      { name: "B.E. Computer Science", duration_yrs: 4, fees: 25000 },
      { name: "B.E. Electronics", duration_yrs: 4, fees: 25000 },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    location: "Manipal", state: "Karnataka",
    fees_per_year: 320000, rating: 4.0, placement_pct: 76,
    established: 1957, type: "Private",
    overview: "Well-known private institute with international collaborations.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 320000 },
      { name: "B.Tech Mechatronics", duration_yrs: 4, fees: 320000 },
    ],
  },
  {
    name: "SRM Institute of Science and Technology",
    location: "Chennai", state: "Tamil Nadu",
    fees_per_year: 270000, rating: 3.9, placement_pct: 74,
    established: 1985, type: "Deemed",
    overview: "Large deemed university with diverse engineering programmes.",
    courses: [
      { name: "B.Tech CSE (AI & ML)", duration_yrs: 4, fees: 270000 },
      { name: "B.Tech Mechanical", duration_yrs: 4, fees: 240000 },
    ],
  },
  {
    name: "NIT Warangal",
    location: "Warangal", state: "Telangana",
    fees_per_year: 130000, rating: 4.3, placement_pct: 84,
    established: 1959, type: "Government",
    overview: "One of the oldest NITs with strong core engineering placements.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 130000 },
      { name: "B.Tech Electronics", duration_yrs: 4, fees: 130000 },
    ],
  },
  {
    name: "IIT Kharagpur",
    location: "Kharagpur", state: "West Bengal",
    fees_per_year: 200000, rating: 4.7, placement_pct: 91,
    established: 1951, type: "Government",
    overview: "Oldest IIT with the largest campus and broadest programme offering.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 200000 },
      { name: "B.Tech Aerospace", duration_yrs: 4, fees: 200000 },
      { name: "MBA", duration_yrs: 2, fees: 320000 },
    ],
  },
  {
    name: "Amity University",
    location: "Noida", state: "Uttar Pradesh",
    fees_per_year: 310000, rating: 3.7, placement_pct: 68,
    established: 2005, type: "Private",
    overview: "Large private university with broad undergraduate offerings.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 310000 },
      { name: "BBA", duration_yrs: 3, fees: 250000 },
    ],
  },
  {
    name: "IIIT Hyderabad",
    location: "Hyderabad", state: "Telangana",
    fees_per_year: 340000, rating: 4.5, placement_pct: 90,
    established: 1998, type: "Deemed",
    overview: "Research-focused institute with specialisation in CS and AI.",
    courses: [
      { name: "B.Tech Computer Science", duration_yrs: 4, fees: 340000 },
      { name: "M.Tech AI", duration_yrs: 2, fees: 150000 },
    ],
  },
  {
    name: "Christ University",
    location: "Bengaluru", state: "Karnataka",
    fees_per_year: 180000, rating: 3.8, placement_pct: 71,
    established: 1969, type: "Deemed",
    overview: "Liberal arts and commerce focused university with good campus life.",
    courses: [
      { name: "BCA", duration_yrs: 3, fees: 150000 },
      { name: "MBA", duration_yrs: 2, fees: 380000 },
    ],
  },
  {
    name: "PSG College of Technology",
    location: "Coimbatore", state: "Tamil Nadu",
    fees_per_year: 95000, rating: 4.2, placement_pct: 82,
    established: 1951, type: "Private",
    overview: "Autonomous college with strong industry ties in manufacturing sector.",
    courses: [
      { name: "B.E. Computer Science", duration_yrs: 4, fees: 95000 },
      { name: "B.E. Mechanical", duration_yrs: 4, fees: 90000 },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const college of colleges) {
    const { courses, ...collegeData } = college;
    const created = await prisma.college.create({ data: collegeData });
    await prisma.course.createMany({
      data: courses.map((c) => ({ ...c, college_id: created.id })),
    });
    console.log(`✓ ${created.name}`);
  }

  console.log("Done.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());