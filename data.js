/**
 * Sample event catalogue for the K Explore course project.
 * IMPORTANT: These events, dates and venues are fictional demo content.
 * Times are stored with an explicit Asia/Kolkata (+05:30) offset.
 */
window.KEXPLORE_EVENTS = [
  {
    id: "build-brew",
    title: "Build & Brew Hackathon",
    category: "Technology",
    date: "2026-11-14T09:30:00+05:30",
    venue: "Innovation Hub",
    location: "Bhubaneswar",
    duration: "8 hours",
    image: "assets/build-brew.svg",
    shortDescription: "Big ideas, good coffee, and a whole day to build something brilliant.",
    description: "An idea-to-prototype day for curious builders. Join a friendly team, sketch your solution, build a small working demo, and celebrate what you create. Complete beginners are welcome.",
    agenda: ["9:30 AM · Check-in and team matching", "10:30 AM · Build sprint with mentors", "4:30 PM · Demos and community showcase"],
    tags: ["Beginner friendly", "Team building", "Mentors"],
    featured: true
  },
  {
    id: "neon-nights",
    title: "Neon Nights Music Fest",
    category: "Arts & Culture",
    date: "2026-11-22T18:30:00+05:30",
    venue: "Open-Air Arena",
    location: "Bhubaneswar",
    duration: "4 hours",
    image: "assets/neon-nights.svg",
    shortDescription: "Live music, electric energy, and a night you won't forget.",
    description: "A colorful evening of independent bands, unplugged performances, and open-mic surprises. Discover new sounds and enjoy a relaxed festival atmosphere with friends.",
    agenda: ["6:30 PM · Doors open", "7:00 PM · Indie and acoustic sets", "9:15 PM · Headline performance"],
    tags: ["Live music", "Open mic", "Creative community"]
  },
  {
    id: "design-tomorrow",
    title: "Design for Tomorrow",
    category: "Arts & Culture",
    date: "2026-11-29T11:00:00+05:30",
    venue: "Creative Studio",
    location: "Bhubaneswar",
    duration: "3 hours",
    image: "assets/design-tomorrow.svg",
    shortDescription: "Turn everyday problems into creative, people-first solutions.",
    description: "Explore design thinking through sketches, quick experiments, and fun group challenges. Walk away with a small portfolio piece and a fresh way of seeing the world.",
    agenda: ["11:00 AM · Creative warm-up", "11:30 AM · Design challenge", "1:00 PM · Present your concept"],
    tags: ["Design thinking", "Hands-on", "Portfolio"]
  },
  {
    id: "career-launchpad",
    title: "Career Launchpad 2026",
    category: "Career",
    date: "2026-12-06T10:00:00+05:30",
    venue: "Seminar Hall A",
    location: "Bhubaneswar",
    duration: "5 hours",
    image: "assets/career-launchpad.svg",
    shortDescription: "Real advice, practical workshops, and a clearer path forward.",
    description: "A practical career day featuring resume reviews, interview practice, and conversations about early-career opportunities. Explore how to present your skills with confidence.",
    agenda: ["10:00 AM · Career roadmap talks", "11:30 AM · Resume review workshop", "1:30 PM · Mock interviews and Q&A"],
    tags: ["Resume clinic", "Interview prep", "Networking"]
  },
  {
    id: "frame-the-city",
    title: "Frame the City Photowalk",
    category: "Community",
    date: "2026-12-13T07:00:00+05:30",
    venue: "City Heritage Walk",
    location: "Bhubaneswar",
    duration: "2.5 hours",
    image: "assets/frame-the-city.svg",
    shortDescription: "Good light, hidden corners, and a fresh perspective on your city.",
    description: "Take a guided morning walk with other photography enthusiasts. Learn simple composition tips, explore interesting streets, and share your favorite frames. Phone cameras are absolutely welcome.",
    agenda: ["7:00 AM · Meet and introductions", "7:15 AM · Guided street photography", "9:00 AM · Photo sharing circle"],
    tags: ["Photography", "Walk", "All skill levels"]
  },
  {
    id: "mindful-mornings",
    title: "Mindful Mornings",
    category: "Wellness",
    date: "2026-12-20T07:30:00+05:30",
    venue: "Green Courtyard",
    location: "Bhubaneswar",
    duration: "90 minutes",
    image: "assets/mindful-mornings.svg",
    shortDescription: "Slow down, recharge, and begin the day with good energy.",
    description: "A gentle, beginner-friendly session focused on mindful movement, breathing, and stress relief. Bring a water bottle, wear comfortable clothes, and take a little time for yourself.",
    agenda: ["7:30 AM · Gentle stretches", "7:50 AM · Guided breathing", "8:20 AM · Reflection and community tea"],
    tags: ["Mindfulness", "Relaxation", "Beginner friendly"]
  },
  {
    id: "game-on",
    title: "Game On: Campus Arena",
    category: "Gaming",
    date: "2027-01-09T14:00:00+05:30",
    venue: "Digital Commons",
    location: "Bhubaneswar",
    duration: "5 hours",
    image: "assets/game-on.svg",
    shortDescription: "Friendly competition, big moments, and serious fun.",
    description: "Meet other gamers for an afternoon of casual tournaments, co-op challenges, and game discussions. From first-timers to veterans, everyone's invited to join the fun.",
    agenda: ["2:00 PM · Player check-in", "2:30 PM · Friendly tournament rounds", "5:45 PM · Showcase and awards"],
    tags: ["Esports", "Casual games", "Community"]
  },
  {
    id: "ideas-that-matter",
    title: "Ideas That Matter",
    category: "Community",
    date: "2027-01-17T11:00:00+05:30",
    venue: "Community Forum",
    location: "Bhubaneswar",
    duration: "3 hours",
    image: "assets/ideas-that-matter.svg",
    shortDescription: "Fresh perspectives and meaningful conversations that spark action.",
    description: "A small gathering for people who care about social impact. Hear short lightning talks, exchange perspectives, and co-create practical ideas for your neighborhood.",
    agenda: ["11:00 AM · Community stories", "11:45 AM · Small group discussions", "1:00 PM · Idea showcase"],
    tags: ["Social impact", "Discussion", "Collaboration"]
  },
  {
    id: "ai-lab",
    title: "AI Makers Lab",
    category: "Technology",
    date: "2027-02-07T10:00:00+05:30",
    venue: "Tech Learning Lab",
    location: "Bhubaneswar",
    duration: "4 hours",
    image: "assets/ai-lab.svg",
    shortDescription: "Build a tiny AI-powered tool and learn by doing.",
    description: "Explore accessible AI concepts through guided mini-projects. Learn how to test prompts, think about responsible usage, and turn an idea into a simple working prototype.",
    agenda: ["10:00 AM · AI fundamentals", "11:00 AM · Guided maker workshop", "1:00 PM · Show and tell"],
    tags: ["AI", "Hands-on", "Responsible tech"]
  }
];

window.KEXPLORE_CATEGORIES = [
  { name: "Technology", icon: "⌘", color: "#d7cbff" },
  { name: "Arts & Culture", icon: "✿", color: "#ffd5b9" },
  { name: "Career", icon: "↗", color: "#dcf5b6" },
  { name: "Community", icon: "♥", color: "#ffc9d6" },
  { name: "Wellness", icon: "☼", color: "#b9e9ee" },
  { name: "Gaming", icon: "✦", color: "#f9e5a7" }
];
