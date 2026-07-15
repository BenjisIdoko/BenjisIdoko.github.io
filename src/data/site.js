export const site = {
  name: 'Benjamin Idoko Emmanuel',
  shortName: 'bie.',
  role: 'Product & UI/UX Designer',
  email: 'benjaminemma360@gmail.com',
  resume: '/assets/pdf/Benjamin Emmanuel E CV 3.pdf',
  description:
    'Benjamin Idoko Emmanuel — Product Designer & UI/UX Designer crafting beautiful, useful interfaces for digital products.',
  social: [
    { label: 'Dribbble', href: 'https://dribbble.com/Benjis' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/benjamin-emmanuel-89941a4a/',
    },
  ],
};

export const projects = [
  {
    slug: 'payforce',
    title: 'Payforce',
    overview: 'Modern banking services for merchants of all sizes.',
    summary:
      'Mobile app redesign, design system, design-team management and support.',
    cover: '/assets/imgs/projects/payforce/payforce1.webp',
    hero: '/assets/imgs/projects/payforce/splash_slide.webp',
    accent: '#0ea5e9',
    tags: ['Product Design', 'Design System', 'Research'],
    role: 'Product Designer',
    year: '2023',
    challenge:
      'Payforce needed to upgrade the UI and overall experience of every digital product. The existing app felt stale and there was no design consistency across their suite of products.',
    solution:
      'We started by building a design system and component library. Then, informed by research and feedback from the current app, we rebuilt the product on top of the new system — bringing consistency, speed and clarity to every screen.',
    gallery: [
      {
        src: '/assets/imgs/projects/payforce/pay-color.webp',
        caption: 'Design system — color foundation & tokens',
      },
      {
        src: '/assets/imgs/projects/payforce/auth.webp',
        caption: 'Onboarding & account verification flows',
      },
      {
        src: '/assets/imgs/projects/payforce/payforce1.webp',
        caption: 'Refreshed onboarding screens',
      },
    ],
  },
  {
    slug: 'faantaxi',
    title: 'FAANTaxi',
    overview:
      'A secure, seamless way to book airport taxis across every Nigerian airport.',
    summary:
      'A secure and safe solution for booking airport taxis, built specifically for Nigerian airports.',
    cover: '/assets/imgs/projects/faantaxi.webp',
    hero: '/assets/imgs/projects/faantaxi.webp',
    accent: '#10b981',
    tags: ['Product Design', 'Research', 'Testing'],
    role: 'Product Designer',
    year: '2022',
    challenge: [
      'Airport taxis in Nigeria have long struggled with poor organisation.',
      'Passenger touting caused by badly organised taxi ranks.',
      'Revenue loss for airport management.',
      'Insecurity — drivers were not properly documented by the airport system.',
    ],
    solution:
      'A booking platform built with the Federal Airport Authority of Nigeria (FAAN) that documents every driver, standardises fares, and lets passengers book and schedule rides to and from any Nigerian airport — safely and transparently.',
    gallery: [
      {
        src: '/assets/imgs/projects/nexmove taxi.png',
        caption: 'End-to-end booking, driver profiles and ride flows',
      },
    ],
  },
  {
    slug: 'thrifty',
    title: 'Thrifty',
    overview:
      'Banking the unbanked — quick, secure savings in under 90 seconds.',
    summary:
      'A quick, easy way for the underbanked and unbanked to save using call credit, a savings agent, or their preferred bank account.',
    cover: '/assets/imgs/projects/thrifty-1.webp',
    hero: '/assets/imgs/projects/thrifty-1.webp',
    accent: '#6366f1',
    tags: ['Product Design', 'Fintech', 'Research'],
    role: 'Product Designer',
    year: '2021',
    challenge:
      'Millions of underbanked and unbanked Nigerians lack a simple, trustworthy way to save small amounts of money consistently — most tools assume a bank account and a smartphone that many people do not have.',
    solution:
      'Thrifty lets people save through airtime, an approved savings agent, or their preferred bank — meeting them where they already are. Deposits are insured and the whole set-up takes less than 90 seconds via USSD or the app.',
    gallery: [
      {
        src: '/assets/imgs/projects/thriftyflow.png',
        caption: 'Cash-in / cash-out user flow',
      },
      {
        src: '/assets/imgs/projects/thrifty1.webp',
        caption: 'Savings check-in screen',
      },
    ],
  },
];

export const experience = [
  {
    company: 'Nexmove Technologies',
    role: 'Product Designer',
    period: '2020 — 2022',
    points: [
      'Product designer from ideation to launch of the KikiSave mobile and web app, targeting an audience of <span class="highlight">2 million</span> users.',
      'Partnered with the development team to build the FAANTaxi airport-shuttle mobile and desktop application.',
    ],
  },
  {
    company: 'The Smarthub Abuja',
    role: 'UI/UX Designer',
    period: '2018 — 2020',
    points: [
      'Designed UI components and interfaces for an e-health product across 15 hospitals — reducing consultation time by <span class="highlight">75%</span> and increasing hospital productivity by <span class="highlight">60%</span>.',
      'Grew the design team from 2 to 4 through training and mentorship.',
    ],
  },
  {
    company: 'Projaro Technologies',
    role: 'UI/UX Designer',
    period: '2016 — 2019',
    points: [
      'Designed a range of client projects — mobile apps, web apps and WordPress websites.',
      'Design facilitator at the Projaro Academy, teaching UX design and WordPress development.',
    ],
  },
];
