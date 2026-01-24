export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioMediaItem = {
  src: string;
  type: "image" | "video";
  alt: string;
  caption?: string;
};

export type PortfolioProject = {
  name: string;
  year?: string;
  description: string;
  stack: string[];
  highlights?: string[];
  links?: PortfolioLink[];
  media?: PortfolioMediaItem[];
};

export type PortfolioExperience = {
  title: string;
  org: string;
  start: string;
  end: string;
  location?: string;
  bullets: string[];
  media?: PortfolioMediaItem[];
};

export type PortfolioEducation = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location?: string;
  notes?: string[];
};

export type PortfolioLeadership = {
  title: string;
  subtitle: string;
  bullets: string[];
  media?: PortfolioMediaItem[];
};

export type PortfolioMedia = {
  title: string;
  caption: string;
  src: string;
  type: "image" | "video";
};

export const portfolio = {
  name: "Prakul Sanjith Selvakumar",
  headline: "Computer Science student at UBC building AI + full-stack products",
  location: "Vancouver, BC",
  bio: "Building AI workflow tools and reliable full-stack products across TypeScript/React and Python with a focus on polish and reliability.",
  about: [
    "I’m a Computer Science student at UBC (Sept. 2025 – Apr. 2029) who enjoys building practical tools that feel polished and dependable.",
    "Recent work includes LinkMCP, an AI tool orchestration builder that turns JSON schemas into a drag-and-drop workflow UI, plus an AI Resume Generator that produces ATS-friendly PDFs quickly.",
  ],
  links: [
    { label: "View Resume (PDF)", href: "/prakul_resume.pdf" },
    { label: "Email", href: "mailto:prakulss7@gmail.com" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/psanjith-selvakumar",
    },
    { label: "GitHub", href: "https://github.com/psanjith" },
  ] satisfies PortfolioLink[],
  contact: {
    phone: "780-667-9070",
    email: "prakulss7@gmail.com",
  },
  education: [
    {
      school: "University of British Columbia (UBC)",
      degree: "Bachelor of Computer Science",
      start: "Sept. 2025",
      end: "Apr. 2029",
      location: "Vancouver, BC",
      notes: [
        "Dual Credit: Functional Anatomy at Northern Alberta Institute of Technology",
      ],
    },
  ] satisfies PortfolioEducation[],
  skills: {
    languages: ["Python", "JavaScript", "TypeScript", "Java", "Racket", "SQL", "HTML/CSS", "LaTeX"],
    modelsAndLibraries: [
      "pandas",
      "NumPy",
      "Matplotlib",
      "TensorFlow",
      "FPDF",
      "JUnit",
      "linear regression",
      "logistic regression",
    ],
    developerTools: [
      "GitHub",
      "VS Code",
      "Jupyter Notebook",
      "Google Colab",
      "Google Cloud Platform",
      "Firebase",
      "Supabase",
    ],
    certifications: [
      "CSTS (Construction Safety)",
      "Electronic Art Software Engineering Virtual Experience",
    ],
  },
  projects: [
    {
      name: "LinkMCP — AI Tool Orchestration",
      year: "2025",
      description:
        "Drag-and-drop UI that abstracts JSON schemas into visual AI workflows, eliminating syntax errors in MCP integrations.",
      stack: ["React", "TypeScript", "Python", "MCP SDK"],
      highlights: [
        "Engineered a visual workflow builder that transforms complex JSON schemas into intuitive drag-and-drop methods.",
        "Designed a logic-flow architecture to eliminate common integration errors and reduce setup time by 70%.",
        "Designed a template marketplace and pitched technical architecture to investors.",
      ],
      links: [
        { label: "Live", href: "#" },
      ],
      media: [
        {
          src: "/linkmcpdemo.mov",
          type: "video",
          alt: "LinkMCP demo video",
          caption: "LinkMCP workflow builder demonstration",
        },
      ],
    },
    {
      name: "AI Resume Generator",
      year: "2025",
      description:
        "LLM-powered resume tailoring that maps job descriptions through a rapid questionnaire and generates ATS-friendly PDFs in under 10 seconds.",
      stack: ["Python", "Groq API (Llama 3.3)", "FPDF"],
      highlights: [
        "Built a 6-question interface that leverages Llama 3.3 to extract and map job-critical skills.",
        "Generates ATS-compliant PDFs tuned for common applicant tracking systems.",
        "Engineered a modular prompt pipeline for runtime context assembly.",
      ],
      links: [{ label: "Live", href: "#" }],
    },
    {
      name: "OOP Banking Application",
      year: "2024",
      description:
        "Robust banking system demonstrating OOP principles with comprehensive testing and error handling.",
      stack: ["Java", "JUnit", "OOP Design Patterns"],
      highlights: [
        "Simulates menu-driven banking flows with a JUnit suite covering edge cases and regressions.",
        "Reduced code redundancy by 30% through strategic inheritance and polymorphism.",
        "Implemented fault-tolerant exception handling to prevent runtime failures.",
      ],
      links: [{ label: "Live", href: "#" }],
    },
  ] satisfies PortfolioProject[],
  experience: [
    {
      title: "Team Co-Lead (2nd Place — Province Wide)",
      org: "APEGA Science Olympics",
      start: "Oct 2024",
      end: "Apr 2025",
      location: "Edmonton, AB",
      media: [
        {
          src: "/media/PHOTO-2025-04-05-17-43-29.JPG",
          type: "image",
          alt: "APEGA Science Olympics team and awards",
          caption: "2nd Place provincial finish with our competition team.",
        },
        {
          src: "/media/IMG_4675.MOV",
          type: "video",
          alt: "Robot prototype testing with sensors",
          caption: "Prototype testing: gyroscope and magnetic detection systems.",
        },
      ],
      bullets: [
        "Directed design of a sensor-equipped robot (gyroscope, infrared control, magnetic detection) from concept to competition.",
        "Led a 4-person team through planning, prototyping, and validation with 100% object detection accuracy.",
        "Achieved 2nd place provincial finish and presented technical results to industry judges.",
      ],
    },
    {
      title: "Construction Labourer",
      org: "Woodfibre LNG Project (Ledcor / Bird Construction)",
      start: "Jul 2025",
      end: "Aug 2025",
      location: "Squamish, BC",
      media: [
        {
          src: "/media/IMG_2451.JPG",
          type: "image",
          alt: "Safety-first construction work at Woodfibre LNG",
          caption: "On-site safety and coordination at Woodfibre LNG Project.",
        },
        {
          src: "/media/IMG_2458.MOV",
          type: "video",
          alt: "Construction site operations and safety protocols",
          caption: "Daily operations and safety-first execution.",
        },
      ],
      bullets: [
        "Maintained zero-incident safety record across 12-hour shifts using WHMIS and CSTS protocols.",
        "Coordinated with pipefitters and HDPE specialists, managing handoffs to maintain workflow continuity.",
        "Demonstrated adaptability and communication in a multidisciplinary team with heavy machinery operators.",
      ],
    },
    {
      title: "Clinical Support Staff",
      org: "Envision Mind Care",
      start: "Apr 2023",
      end: "Aug 2025",
      location: "Edmonton, AB",
      bullets: [
        "Provided compassionate emotional support to diverse patients in stabilizing, therapeutic environments.",
        "Maintained strict confidentiality and professional boundaries in compliance with healthcare regulations.",
        "Adapted de-escalation strategies to address sensitive situations with empathy and professionalism.",
      ],
    },
    {
      title: "Youth Literacy Facilitator",
      org: "EPL (Edmonton Public Library)",
      start: "Jan 2023",
      end: "Aug 2025",
      location: "Edmonton, AB",
      bullets: [
        "Facilitated interactive literacy sessions for children, building foundational reading skills and confidence.",
        "Customized engagement strategies to accommodate individual learning needs and developmental pace.",
        "Coordinated with library staff to deliver reliable weekly programming.",
      ],
    },
  ] satisfies PortfolioExperience[],
  leadership: [
    {
      title: "Awards & Leadership",
      subtitle: "Recognition for teamwork and technical leadership",
      bullets: [
        "\"In many squadrons across Canada the WO2 is the highest ranked cadet, which makes him/her \"The Leader\". Cadets achieving this rank are trained as leaders and they get to collaborate with officers in the organization of activities for the squadron. Warrant Officers Second Class are senior cadets who must perform to a very high level and take care of many responsibilities.\"",
        "— Red Deer Air Cadets (https://www.reddeeraircadets.com/air-cadet-ranks.html)",
      ],
      media: [
        {
          src: "/media/IMG_5319.JPG",
          type: "image",
          alt: "Receiving a medal and badge",
        },
      ],
    },
  ] satisfies PortfolioLeadership[],
} as const;
