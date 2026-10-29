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
      "Prepared examples stored with the companies so you can open a full change report before a live check finds anything. The UI labels each one Sample example. They are not claims about the company's real policy.",
  },
  {
    question: "What does the demo check do?",
    answer:
      "It fetches WhatsApp's current privacy policy and compares it with a hardcoded earlier copy that includes extra sample clauses. The result stays on the demo screen and is not saved.",
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
