import assert from 'node:assert';
import {
  personalInfo,
  skills,
  experiences,
} from './src/data/portfolioData.js';

// Verify personal info & email
assert.strictEqual(personalInfo.nickname, 'Ken', 'Nickname must be Ken');
assert.strictEqual(personalInfo.email, 'm.kenzie.oktavian@gmail.com', 'Email must match');
assert.strictEqual(personalInfo.school, 'SMK Negeri 1 Sragi', 'School must match');
assert.ok(personalInfo.logoImage, 'Logo image must be specified');

// Verify skills: strictly NO level/percentage and strictly authentic items
assert.ok(skills.length >= 4, 'Skills must contain real school topics');
skills.forEach((skill) => {
  assert.ok(skill.name, `Skill missing name`);
  assert.strictEqual(skill.level, undefined, `Skill ${skill.name} must NOT have a level or percentage`);
  assert.ok(Array.isArray(skill.tags), `Skill ${skill.name} should have tags`);
});

// Verify experiences
assert.ok(experiences.length >= 1, 'Experiences must have school items');
assert.ok(experiences[0].period.includes('2025') && experiences[0].period.includes('Sekarang'), 'Period must be 2025 — Sekarang');

console.log('ALL_AUTHENTIC_CHECKS_PASSED');
