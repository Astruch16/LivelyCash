export type Faq = {
  question: string;
  answer: string;
};

/** Shown on /plans and emitted as FAQPage structured data. */
export const planFaqs: readonly Faq[] = [
  {
    question: "Does it really cost nothing to get an ATM placed?",
    answer:
      "On the Turnkey ATM Placement Program, yes. The machine, shipping, installation and setup are free, and there is no out-of-pocket cost to you. We supply and stock the cash, monitor the machine 24/7 and handle all maintenance, and we collect most of the proceeds from the surcharge in return. The ATM Combo Program is also free to install — you simply load it with your own cash and take a share of the surcharge.",
  },
  {
    question: "Which program makes my business the most money?",
    answer:
      "The ATM Purchase Program generates the highest profit, because you own the machine and keep the surcharge apart from a fixed $0.50 or $0.65 per transaction to Lively Cash. It also has the highest up-front cost, roughly $4,000 to $5,000 for the ATM. The Combo Program is the middle option, and Turnkey earns the least but requires nothing from you at all.",
  },
  {
    question: "Do I need to give the ATM access to my internet connection?",
    answer:
      "No. Every machine can run on a DPL wireless communication device, which gives the ATM its own secure connection independent of your network. Connecting to your existing local internet is optional, and on the Purchase and Combo programs it improves your terms — the DPL fee is waived and the Combo surcharge split moves from 65/35 to 60/40 in your favour.",
  },
  {
    question: "What paperwork do I need to provide?",
    answer:
      "The ATM Purchase Program and the ATM Combo Program both require AML onboarding to our processing network. We collect your full name, email address and phone number, photo ID of all directors, a certified company void cheque stamped by your bank, and your articles of incorporation. Training on how to maintain and load the ATM with cash is provided.",
  },
  {
    question: "Who fills the machine with cash?",
    answer:
      "It depends on the program. On the Purchase and Combo programs you supply and load the cash yourself, and we train you on how to do it. On the Turnkey program we stock the machine weekly so your customers never walk away empty-handed.",
  },
  {
    question: "What happens if the ATM breaks down?",
    answer:
      "Lively Cash provides maintenance calls on every program. On the Turnkey program the machine is monitored 24/7 and full maintenance is included. Because our team is based in the Fraser Valley rather than dispatched from Vancouver or out of province, service calls in Chilliwack, Abbotsford, Agassiz, Hope and Harrison are handled quickly and locally.",
  },
  {
    question: "Which ATM hardware do you install?",
    answer:
      "We deploy the Hyosung Halo II — a current-generation ATM with a bright interactive display, a modern shell that suits a retail interior, and a strong reliability record. On every program the machine is professionally bolted and secured at installation.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We serve businesses across the Fraser Valley in British Columbia, including Chilliwack, Abbotsford, Agassiz, Hope and Harrison Hot Springs. If you are nearby but not on that list, get in touch and we will tell you honestly whether we can service you properly.",
  },
];
