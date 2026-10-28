/**
 * FAQ copy adapted from the prototype for the live product (no “HTML prototype” wording).
 */

export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is PolicyHawk?",
    answer:
      "PolicyHawk is a privacy-policy change tracker. It maintains policy versions, identifies changes between them, and provides plain-language summaries with importance levels.",
  },
  {
    question: "How often are policies checked?",
    answer:
      "The MVP checks configured companies daily. Last successful fetch times appear on the company directory and tracker when the backend has run.",
  },
  {
    question: "How are policy changes detected?",
    answer:
      "A new policy version is compared with the previous stored version. Differences can include added, removed, or rewritten text.",
  },
  {
    question: "What do low, medium, high, and critical mean?",
    answer:
      "They are prioritization labels to help you decide what to inspect first. They are not legal advice or a definitive risk score.",
  },
  {
    question: "Can I view older versions?",
    answer:
      "Yes. Each company page includes a timeline of stored versions and links to compare versions when changes exist.",
  },
  {
    question: "What is sample data?",
    answer:
      "Prepared or simulated records used to demonstrate timelines and change reports. The UI labels them as sample or simulation.",
  },
  {
    question: "What does the test-company demo do?",
    answer:
      "It runs a simulated check against predefined prior policy text and a live fetch, using the same comparison path as real tracking. It does not claim a real company changed its policy.",
  },
  {
    question: "Can I add another company?",
    answer:
      "Adding arbitrary companies is outside the current 10-company MVP. The list is fixed for this release.",
  },
  {
    question: "Does PolicyHawk provide legal advice?",
    answer:
      "No. Summaries help you understand wording but do not replace reading the complete policy or obtaining qualified legal advice.",
  },
];
