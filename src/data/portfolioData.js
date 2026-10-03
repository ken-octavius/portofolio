import { content } from '../content.js';

export const personalInfo = {
  name: content.profile.name,
  nickname: content.profile.shortName,
  initials: content.profile.initials,
  school: content.profile.school,
  major: content.profile.major,
  role: content.profile.role,
  tagline: content.hero.headline,
  shortBio: "",
  fullBio: content.about.whoamiText,
  location: content.profile.location,
  statusBadge: content.hero.statusBadge,
  email: content.profile.email,
  github: content.profile.githubUrl,
  youtube: content.profile.youtubeUrl,
  logoImage: content.profile.logoImage,
  avatarImage: content.profile.avatarImage,

  heroTools: [
    { name: "Linux Server", color: "bg-neo-coral" },
    { name: "Jaringan Komputer", color: "bg-neo-teal" },
    { name: "MikroTik RouterOS", color: "bg-neo-yellow" },
    { name: "Cisco Packet Tracer", color: "bg-neo-purple" },
    { name: "SOC / Blue Team", color: "bg-neo-pink" },
  ],

  metrics: [
    { label: "Base", value: "Linux", color: "bg-neo-yellow" },
    { label: "Layer", value: "Network", color: "bg-neo-teal" },
    { label: "Lab", value: "Router", color: "bg-neo-purple" },
    { label: "Focus", value: "Security", color: "bg-neo-coral" },
  ],
};

const skillColors = [
  "bg-neo-coral",
  "bg-neo-teal",
  "bg-neo-yellow",
  "bg-neo-purple",
  "bg-neo-pink",
];

export const skills = content.techStack.items.map((item, idx) => ({
  name: item.name,
  color: skillColors[idx] || "bg-neo-teal",
  description: item.description,
  tags: item.tags,
}));

export const experiences = content.education.items.map((item) => ({
  role: item.role,
  organization: item.organization,
  period: item.period,
  badgeColor: "bg-neo-teal",
  description: item.description,
}));

