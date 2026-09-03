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
      "The ATM Purchase Program generates the highest profit, because you own the machine and keep the surcharge apart from a small fixed amount per transaction to Lively Cash. It is also the only program with an up-front hardware cost — and the ATM is sold at wholesale pricing, with no upcharge or hidden fees. The Combo Program is the middle option, and Turnkey earns the least but requires nothing from you at all.",
  },
  {
    question: "Do I need to give the ATM access to my internet connection?",
    answer:
      "No. Every machine can run on a DPL wireless communication device, which gives the ATM its own secure connection independent of your network. Connecting to your existing local internet is optional, and on the Purchase and Combo programs it improves your terms — the DPL fee is waived and the Combo surcharge split gets increased 5% in your favour.",
  },
  {
    question: "What paperwork do I need to provide?",
    answer:
      "The ATM Purchase Program and the ATM Combo Program both require AML onboarding to our processing network. We collect your full name, email address and phone number, photo ID of all directors, a certified company void cheque stamped by your bank, and your articles of incorporation. A void cheque will be required for all merchant payouts, regardless of the chosen program. Training on how to maintain and load the ATM with cash is provided.",
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
  {
    question:
      "Are there risks of having an ATM in my business and what measures are taken to mitigate risk?",
    answer:
      "Like any piece of equipment that holds cash, there is a small inherent risk associated with having an ATM on-site. We take several proactive measures to minimize that risk and protect both the ATM and your business. Every Lively Cash ATM is securely bolted to the floor using four heavy-duty concrete anchors, capable of holding 10,000+ lbs of force. We also place visible anti-theft and security stickers directly on the ATM to deter tampering and theft, along with optional GPS tracking technology that provides an additional layer of protection. As well, we will install the ATM in a secure location within the premises away from the main entrance or windows for increased safety. Our goal is to make having an ATM in your business as safe, secure, and hassle-free as possible, while allowing you and your customers to enjoy the convenience and benefits of on-site cash access.",
  },
];
