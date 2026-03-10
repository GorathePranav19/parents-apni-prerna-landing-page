import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  AlertTriangle,
  Bell,
  Blocks,
  Bot,
  ChartColumn,
  CircleHelp,
  ClipboardList,
  Download,
  Gauge,
  LayoutDashboard,
  MonitorCheck,
  SearchCheck,
  Shield,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const content = {
  navCta: 'Book the call now',
  heroHeadline: 'Protect Your Child in the Digital World',
  heroSubheadline:
    'Apni Prerna helps parents create a safer digital learning environment for their children. It protects students online by blocking harmful websites, reducing distractions, and promoting responsible use of technology.',
  heroDescription:
    '',
  trustLine: '',
  primaryCta: 'Book the call now',
  secondaryCta: '',
  microCopy: 'Part of the Apni Pathshala Ecosystem',
  socialProof: '',
  problemHeadline: 'About Apni Prerna',
  solutionHeadline: 'Why Apni Prerna Stands Out',
  solutionSubheadline:
    'Apni Prerna empowers parents and educators with tools that create a safe, focused, and meaningful digital learning environment, going beyond traditional device monitoring solutions. Rather than simply tracking device usage, Apni Prerna supports students in developing responsible technology habits, stronger focus, and a healthier digital experience.',
  howHeadline: 'How Apni Prerna Works',
  dashboardHeadline: 'Parent Dashboard for Clear Activity Insights',
  pricingHeadline: 'Special Offer for Early Users',
  pricingSubheadline: 'Get Apni Prerna for just ₹99/month for the first 100 parents, instead of the regular price of ₹999/month.',
  faqHeadline: 'Frequently Asked Questions',
  faqSearch: 'Search questions',
  finalHeadline: 'Give Your Child a Safer Digital Future',
  finalSubheadline:
    'Become one of the first 50 students to start using Apni Prerna and help shape the future of safe digital learning for children.',
  finalCta: 'Book the call now',
  footerTagline: 'Apni Prerna is part of the Apni Pathshala network, which works to improve access to safe and productive digital learning environments for students across different communities.',
  stickyCta: 'Book the call now',
  chat: 'Need Help? Contact Us',
}

const googleFormUrl = 'https://forms.gle/ZN9PWNQghGz5eAE29'

const problems = [
  ['Shield', 'Safer Learning Environment', 'Built for digital learning', 'The internet offers powerful learning opportunities, but it also exposes children to harmful websites, unsafe downloads, and online distractions.'],
  ['Alert', 'Simple and Responsible Guidance', 'Supports better habits', 'Apni Prerna was created to help parents guide their childrens computer usage in a simple and responsible way.'],
  ['Download', 'Learning, Growth, and Exploration', 'The goal is simple', 'To help children use technology for learning, growth, and exploration in a safe and responsible way.'],
]

const features = [
  ['Shield', '01', 'Blocks harmful websites automatically', 'Block harmful websites, unsafe downloads, and risky content before children access them.', 'Core Safety'],
  ['Blocks', '02', 'Reduces online distractions during study hours', 'Keep devices focused on learning by limiting games, entertainment, and unrelated sites.', 'Study Focus'],
  ['ClipboardList', '03', 'Provides simple activity summaries for parents', 'Receive clear summaries of device activity without technical complexity.', 'Parent Reports'],
  ['SearchCheck', '04', 'Encourages responsible digital habits for children', 'Help children build safe and focused technology habits over time.', 'Healthy Habits'],
  ['MonitorCheck', '05', 'Designed specifically for learning environments', 'Made for families, schools, and learning communities instead of generic device monitoring.', 'Learning First'],
  ['Bot', '06', 'Coming Soon', 'More parent and educator tools are being prepared to make digital learning safer, clearer, and more effective.', 'Next Update'],
]

const steps = [
  ['01', 'Create an Account', 'Parents sign up and choose the subscription plan that fits their needs.', 'Step 1'],
  ['02', "Install on the Child's Computer", 'Apni Prerna is installed on the student device to begin protection and rule enforcement.', 'Step 2'],
  ['03', 'Monitor and Protect Automatically', 'Once installed, the software works in the background and parents can review summaries and alerts.', 'Step 3'],
]

const dashboardItems = [
  ['LayoutDashboard', 'Website Monitoring', 'See which websites are being visited, how often they are accessed, and how much time is spent on each site. This helps track browsing behavior clearly and gives a better understanding of overall digital usage.'],
  ['Shield', 'Blocked Websites', 'Automatically blocks harmful, unsafe, or distracting websites using predefined rules. This creates a safer digital environment and helps students stay focused on productive learning.'],
  ['ClipboardList', 'Activity Reports', 'View daily and weekly browsing insights through clear reports. These reports help identify activity patterns, top websites, blocked attempts, and overall engagement trends.'],
  ['ChartColumn', 'Usage History', 'Track past browsing activity in a simple and organized way. Review which websites were visited, when they were accessed, and how long they were used to understand long-term usage patterns.'],
]

const dashboardPreviews = {
  'Website Monitoring': {
    image: '/website-monitor.jpeg',
    alt: 'Website monitoring dashboard preview',
    label: 'Live browser tracking',
  },
  'Blocked Websites': {
    image: '/block-website.jpeg',
    alt: 'Blocked websites dashboard preview',
    label: 'Blocked website activity',
  },
  'Activity Reports': {
    image: '/report-photo.jpeg',
    alt: 'Activity reports dashboard preview',
    label: 'Learning report view',
  },
  'Usage History': {
    image: '/usage-history.jpeg',
    alt: 'Usage history dashboard preview',
    label: 'Long-term usage history',
  },
}

const comparisonRows = [
  ['Harmful website blocking', 'Included', 'Limited or inconsistent'],
  ['Distraction control', 'Included', 'Often missing'],
  ['Device safety monitoring', 'Included', 'Basic only'],
  ['Parent activity summaries', 'Included', 'Not always available'],
  ['Weekly usage reports', 'Premium plan', 'Rare'],
  ['Learning-focused controls', 'Designed for students', 'General purpose'],
]

const plans = [
  {
    name: 'First 100 Parents',
    price: '₹99',
    originalPrice: '₹1000',
    cadence: '/month',
    billed: '',
    featured: true,
    features: [
      'Learning progress tracking',
      'Category-wise analytics',
      'Real-time activity monitoring',
      'Weekly parent reports',
      'Educational PC monitoring',
      'Priority support',
    ],
  },
]

const faqs = [
  ['What type of websites does Apni Prerna block?', 'It blocks harmful or inappropriate websites such as adult content, gambling pages, unsafe links, malware sources, and other risky websites.'],
  ['Is the software monitoring my child activity?', 'It provides parents with simplified activity summaries, blocked website information, safety alerts, and usage reports focused on safe device use.'],
  ['How easy is the installation process?', 'The setup is simple: create an account, install the software on the child computer, and let the platform begin protecting the device.'],
  ['Can parents view activity reports?', 'Yes. Parents can access summaries, alerts, blocked site information, device status, and weekly usage reports depending on the selected plan.'],
  ['What devices can run Apni Prerna?', 'The website presents Apni Prerna as software for protecting student computers and internet usage in home and learning environments.'],
  ['Can schools and learning centres use it?', 'Yes. The platform can also support schools, educational institutions, learning centres, and digital learning programs.'],
  ['Does it help reduce distractions during study time?', 'Yes. Distraction control is a core feature and is designed to reduce access to gaming, entertainment, and non-learning websites during productive hours.'],
]

const testimonials = [
  [
    'As children increasingly rely on computers for learning, ensuring their online safety is essential. Apni Prerna is a thoughtful solution that helps parents create a safer digital learning environment by reducing distractions and protecting students from harmful websites. It empowers parents to guide responsible technology use while supporting focused learning.',
    'Dr. Aniruddha Malpani',
    'Founder, Malpani Ventures',
  ],
  [
    'At Apni Pathshala, we work closely with students and learning communities across the country, and we understand the importance of safe digital learning environments. Apni Prerna was created to help parents and educators ensure that computers remain tools for learning rather than sources of distraction or risk.',
    'Sagar Tiwari',
    'CEO, Apni Pathshala',
  ],
]

const navItems = [
  ['features', 'Features'],
  ['how-it-works', 'How It Works'],
  ['dashboard', 'Dashboard'],
  ['pricing', 'Pricing'],
  ['faq', 'FAQ'],
  ['contact', 'Contact'],
]

const iconMap = {
  Shield,
  Alert: AlertTriangle,
  Download,
  Bell,
  Blocks,
  MonitorCheck,
  SearchCheck,
  ClipboardList,
  Bot,
  LayoutDashboard,
  Gauge,
  ChartColumn,
  CircleHelp,
}

const primaryButtonClass =
  'inline-flex min-h-12 items-center justify-center rounded-2xl bg-prerna-orange px-6 py-3 font-heading text-sm font-semibold text-white shadow-[0_16px_40px_rgba(255,136,0,0.28)] transition hover:-translate-y-0.5 hover:bg-prerna-orange-dark focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-prerna-blue/30'

const secondaryButtonClass =
  'inline-flex min-h-12 items-center justify-center rounded-2xl border border-prerna-blue/20 bg-white/90 px-6 py-3 font-heading text-sm font-semibold text-prerna-blue transition hover:-translate-y-0.5 hover:border-prerna-blue hover:bg-prerna-blue hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-prerna-blue/30'

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionArticle = motion.article
const MotionButton = motion.button
const MotionA = motion.a
const MotionP = motion.p

function trackEvent(event, detail) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, detail })
}

function launchWelcomeConfetti() {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      window.clearInterval(interval)
      return
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
  }, 250)
}

function Section({ id, className = '', children }) {
  const reduceMotion = useReducedMotion()

  return (
    <MotionSection
      id={id}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionSection>
  )
}

function App() {
  const [activeFaq, setActiveFaq] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [activeDashboardTab, setActiveDashboardTab] = useState(dashboardItems[0][1])
  const [faqQuery, setFaqQuery] = useState('')
  const [showStickyCta, setShowStickyCta] = useState(false)
  const heroRef = useRef(null)

  const filteredFaqs = useMemo(
    () => faqs.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(faqQuery.toLowerCase())),
    [faqQuery],
  )

  useEffect(() => {
    document.title = 'Apni Prerna - Student Safety & Parental Control Software India'
  }, [])

  useEffect(() => {
    const hasSeenWelcomeAnimation = window.localStorage.getItem('apni-prerna-welcome-confetti')

    if (hasSeenWelcomeAnimation) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      launchWelcomeConfetti()
      window.localStorage.setItem('apni-prerna-welcome-confetti', 'true')
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setShowStickyCta(!entry.isIntersecting), {
      threshold: 0.2,
    })

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      { threshold: [0.25, 0.45, 0.7], rootMargin: '-15% 0px -45% 0px' },
    )

    ;['home', ...navItems.map(([id]) => id)].forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        sectionObserver.observe(element)
      }
    })

    return () => sectionObserver.disconnect()
  }, [])

  const openFormModal = (source) => {
    trackEvent('cta_click', source)
    window.open(googleFormUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f9fbff_38%,#ffffff_100%)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-prerna-blue/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-wrap items-center justify-between gap-4 py-4">
          <a className="flex items-center gap-3 text-slate-900" href="#home" aria-label="Apni Prerna home">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-prerna-blue/10 bg-white p-1 shadow-[0_16px_36px_rgba(0,102,255,0.16)]">
              <img src="/logo.jpeg" alt="Apni Prerna logo" className="h-full w-full object-contain" />
            </span>
          </a>

          <nav className="hidden items-center gap-2 text-sm font-medium text-slate-700 md:flex" aria-label="Primary">
            {navItems.map(([id, label]) => (
              <a
                key={id}
                className={`rounded-full px-3 py-2 transition ${
                  activeSection === id ? 'bg-prerna-blue-light text-prerna-blue' : 'hover:text-prerna-orange'
                }`}
                href={`#${id}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <button className={`${primaryButtonClass} hidden md:inline-flex`} type="button" onClick={() => openFormModal('header')}>
            {content.navCta}
          </button>
        </div>
      </header>

      <main>
        <Section id="home" className="py-16 md:py-24">
          <div ref={heroRef} className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-prerna-blue-dark">Apni Prerna</p>
              <h1 className="font-heading text-4xl leading-tight text-slate-950 md:text-6xl">{content.heroHeadline}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">{content.heroSubheadline}</p>
              {content.trustLine ? <p className="mt-5 text-sm font-semibold text-slate-500">{content.trustLine}</p> : null}
              {content.heroDescription ? <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{content.heroDescription}</p> : null}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MotionButton
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButtonClass} min-h-14 px-7 text-base`}
                  type="button"
                  onClick={() => openFormModal('hero')}
                >
                  {content.primaryCta}
                </MotionButton>
              </div>
              {content.microCopy ? <p className="mt-3 text-sm text-slate-500">{content.microCopy}</p> : null}
              {content.socialProof ? (
                <div className="mt-6 rounded-3xl border border-prerna-blue/10 bg-prerna-blue-light/70 p-4 text-sm font-semibold text-prerna-blue-dark shadow-[0_16px_40px_rgba(0,102,255,0.08)]">
                  {content.socialProof}
                </div>
              ) : null}
            </MotionDiv>

            <MotionDiv initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="relative min-h-[34rem]">
              <div className="absolute inset-x-0 top-4 overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_32%),linear-gradient(145deg,#0052CC,#0066FF)] p-4 text-white shadow-[0_26px_70px_rgba(0,46,125,0.24)] md:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
                  <span className="inline-flex rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-prerna-blue">Live Parent Dashboard</span>
                  <div className="flex flex-wrap gap-2 text-sm text-white/85">
                    {['Website blocking', 'Safety summaries', 'Focus controls'].map((item) => (
                      <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">{item}</span>
                    ))}
                  </div>
                </div>
                <img
                  src="/main-dashboard.png"
                  alt="Apni Prerna dashboard showing student safety metrics, filters, and parent monitoring tools"
                  className="w-full rounded-[1.5rem] border border-white/15 object-cover shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
                />
              </div>
              <div className="absolute right-3 top-0 rounded-full bg-[linear-gradient(135deg,#FF8800,#E67700)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(255,136,0,0.25)]">For Parents</div>
            </MotionDiv>
          </div>
        </Section>

        <Section className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_25%),linear-gradient(160deg,#0052CC,#013694)] py-16 text-white md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{content.problemHeadline}</h2>
            <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-8 text-white/88">
              With Apni Prerna, parents can block harmful websites, reduce online distractions during study time, and receive clear summaries of device activity. The system runs quietly in the background while helping families encourage safer and more focused digital habits.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {problems.map(([icon, title, stat, description]) => {
                const ProblemIcon = iconMap[icon]

                return (
                  <MotionArticle key={title} whileHover={{ y: -6 }} className="rounded-[1.6rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_40px_rgba(0,20,80,0.18)] backdrop-blur-md">
                    <div className="inline-flex rounded-2xl bg-white/12 p-3 text-prerna-orange-light">
                      <ProblemIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="mt-4 font-semibold text-[#ffd27a]">{stat}</p>
                    <h3 className="mt-4 font-heading text-2xl">{title}</h3>
                    <p className="mt-3 leading-7 text-white/85">{description}</p>
                  </MotionArticle>
                )
              })}
            </div>
          </div>
        </Section>

        <Section id="features" className="bg-white py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{content.solutionHeadline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-8 text-slate-600">{content.solutionSubheadline}</p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map(([icon, number, title, description, badge], index) => {
                const FeatureIcon = iconMap[icon]

                return (
                  <MotionArticle key={title} whileHover={{ y: -6 }} className={`rounded-[1.6rem] border-t-[5px] bg-white p-6 shadow-[0_20px_45px_rgba(0,63,157,0.10)] ${index % 2 === 0 ? 'border-prerna-blue' : 'border-prerna-orange'}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex rounded-2xl bg-prerna-blue-light p-3 text-prerna-blue">
                          <FeatureIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-heading text-2xl text-prerna-blue">{number}</span>
                      </div>
                      <span className="rounded-full bg-prerna-blue-light px-3 py-2 text-sm font-semibold text-prerna-blue">{badge}</span>
                    </div>
                    <h3 className="mt-5 font-heading text-2xl text-slate-900">{title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{description}</p>
                  </MotionArticle>
                )
              })}
            </div>
          </div>
        </Section>

        <Section id="how-it-works" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{content.howHeadline}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map(([number, title, description, badge]) => (
                <MotionArticle key={title} whileHover={{ y: -6 }} className="rounded-[1.6rem] bg-white p-6 shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
                  <span className="font-heading text-6xl font-bold text-prerna-blue/15">{number}</span>
                  <h3 className="mt-4 font-heading text-2xl text-slate-900">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{description}</p>
                  <span className="mt-5 inline-flex rounded-full bg-prerna-blue-light px-3 py-2 text-sm font-semibold text-prerna-blue">{badge}</span>
                </MotionArticle>
              ))}
            </div>
          </div>
        </Section>

        <Section id="dashboard" className="bg-white py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{content.dashboardHeadline}</h2>
            <p className="mx-auto mt-4 max-w-4xl text-center text-lg leading-8 text-slate-600">
              Apni Prerna provides parents with a simple dashboard that shows how the computer is being used. Parents can monitor browsing activity, detect unsafe websites, and guide children toward safer digital habits.
            </p>
            <div className="mt-12 overflow-hidden rounded-[2rem] border border-prerna-blue/10 bg-[linear-gradient(135deg,#f7fbff,#fff8f0)] p-5 shadow-[0_24px_55px_rgba(0,63,157,0.08)] md:p-8">
              <div
                role="tablist"
                aria-label="Parent dashboard features"
                className="flex flex-nowrap justify-start gap-3 overflow-x-auto pb-2 md:justify-center"
              >
                {dashboardItems.map(([icon, title]) => {
                  const DashboardIcon = iconMap[icon]
                  const isActive = activeDashboardTab === title

                  return (
                    <button
                      key={title}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`dashboard-panel-${title.replace(/\s+/g, '-').toLowerCase()}`}
                      id={`dashboard-tab-${title.replace(/\s+/g, '-').toLowerCase()}`}
                      type="button"
                      onClick={() => setActiveDashboardTab(title)}
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? 'border-prerna-blue bg-prerna-blue text-white shadow-[0_12px_28px_rgba(0,102,255,0.24)]'
                          : 'border-prerna-blue/10 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-prerna-blue/40 hover:text-prerna-blue'
                      }`}
                    >
                      <DashboardIcon className="h-4 w-4" aria-hidden="true" />
                      {title}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                <AnimatePresence mode="wait">
                  {dashboardItems
                    .filter(([, title]) => title === activeDashboardTab)
                    .map(([icon, title, description]) => {
                      const DashboardIcon = iconMap[icon]
                      const preview = dashboardPreviews[title]

                      return (
                        <MotionDiv
                          key={title}
                          role="tabpanel"
                          id={`dashboard-panel-${title.replace(/\s+/g, '-').toLowerCase()}`}
                          aria-labelledby={`dashboard-tab-${title.replace(/\s+/g, '-').toLowerCase()}`}
                          initial={{ opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 24 }}
                          transition={{ duration: 0.32, ease: 'easeOut' }}
                          className="grid gap-8 lg:col-span-2 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
                        >
                          <div className="rounded-[1.8rem] border border-prerna-blue/10 bg-white p-7 shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
                            <span className="inline-flex rounded-2xl bg-prerna-orange-light p-3 text-prerna-orange">
                              <DashboardIcon className="h-6 w-6" aria-hidden="true" />
                            </span>
                            <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-prerna-blue-dark">{preview.label}</p>
                            <h3 className="mt-3 font-heading text-3xl text-slate-950 md:text-4xl">{title}</h3>
                            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{description}</p>
                          </div>

                          <div className="overflow-hidden rounded-[1.8rem] border border-prerna-blue/12 bg-white shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
                            <img
                              src={preview.image}
                              alt={preview.alt}
                              className="aspect-[16/10] w-full object-cover"
                            />
                          </div>
                        </MotionDiv>
                      )
                    })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_100%)] py-16 md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-prerna-blue-dark">Partners</p>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-slate-950 md:text-5xl">Organizations Supporting Apni Prerna</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
                Working together to build a safer digital learning environment for students across India.
              </p>

              <div className="mt-8 rounded-[1.8rem] bg-[linear-gradient(135deg,#0066FF,#0052CC)] p-6 text-white shadow-[0_24px_60px_rgba(0,82,204,0.22)]">
                <p className="text-sm font-semibold text-white/75">Why partners support Apni Prerna</p>
                <div className="mt-5 space-y-4">
                  {[
                    'Promoting digital safety for students',
                    'Supporting learning pods and community education',
                    'Enabling safe and focused internet usage',
                    'Expanding digital learning access across India',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/14 text-sm font-bold text-white">
                        +
                      </span>
                      <p className="text-sm leading-7 text-white/90">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {testimonials.map(([quote, author, role]) => (
                <MotionArticle key={author} whileHover={{ y: -6 }} className="rounded-[1.8rem] border border-prerna-blue/12 bg-white p-8 shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
                  <div className="flex gap-1 text-prerna-orange">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={`${author}-${index}`}>★</span>
                    ))}
                  </div>
                  <p className="mt-5 text-lg leading-8 text-slate-700">"{quote}"</p>
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="font-heading text-xl text-slate-950">{author}</p>
                    <p className="text-sm text-slate-500">{role}</p>
                  </div>
                </MotionArticle>
              ))}
              <div className="rounded-[1.8rem] border border-prerna-blue/12 bg-[linear-gradient(135deg,#f4f8ff,#fff7ee)] p-8 shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-prerna-blue-dark">Our Impact</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1.4rem] bg-white px-5 py-6 text-center">
                    <p className="font-heading text-4xl text-prerna-blue">1+</p>
                    <p className="mt-2 font-semibold text-slate-900">Partners</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Organizations and communities supporting the mission of building safe digital learning spaces for students.</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white px-5 py-6 text-center">
                    <p className="font-heading text-4xl text-prerna-blue">30+</p>
                    <p className="mt-2 font-semibold text-slate-900">Learning Centers</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Community learning spaces rely on Apni Prerna to maintain secure and distraction-free computer environments.</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white px-5 py-6 text-center">
                    <p className="font-heading text-4xl text-prerna-blue">1000+</p>
                    <p className="mt-2 font-semibold text-slate-900">Students</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Students are learning online with monitored, guided, and safe internet access through Apni Prerna.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="pricing" className="bg-white py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{content.pricingHeadline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-8 text-slate-600">{content.pricingSubheadline}</p>
            <div className="mx-auto mt-12 grid max-w-xl gap-6">
              {plans.map((plan) => (
                <MotionArticle key={plan.name} whileHover={{ y: -6 }} className={`rounded-[1.7rem] border-t-[5px] p-6 shadow-[0_20px_45px_rgba(0,63,157,0.08)] ${plan.featured ? 'scale-100 border-prerna-orange bg-[linear-gradient(180deg,#fffaf3,#ffffff)] lg:scale-[1.03]' : 'border-prerna-blue bg-white'}`}>
                  {plan.badge ? <span className={`inline-flex rounded-full px-3 py-2 text-sm font-semibold ${plan.featured ? 'bg-prerna-blue text-white' : 'bg-prerna-blue-light text-prerna-blue'}`}>{plan.badge}</span> : null}
                  <h3 className="mt-5 font-heading text-2xl text-slate-900">{plan.name}</h3>
                  <div className="mt-5 flex items-end gap-2">
                    <strong className="font-heading text-5xl text-slate-950">{plan.price}</strong>
                    <span className="pb-2 text-slate-600">{plan.cadence}</span>
                  </div>
                  <p className="mt-2 text-slate-600">{plan.billed}</p>
                  <ul className="mt-6 space-y-3 text-slate-700">
                    {plan.features.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                  <button
                    className={`mt-8 w-full ${plan.featured ? primaryButtonClass : secondaryButtonClass}`}
                    type="button"
                    onClick={() => {
                      trackEvent('cta_click', `pricing-${plan.name.toLowerCase()}`)
                      document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    book the call now
                  </button>
                </MotionArticle>
              ))}
            </div>
          </div>
        </Section>

        <Section id="faq" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="font-heading text-3xl leading-tight md:text-5xl">{content.faqHeadline}</h2>
              <input
                aria-label={content.faqSearch}
                className="mt-6 w-full rounded-2xl border border-prerna-blue/16 bg-white px-4 py-4 text-slate-900 shadow-[0_12px_28px_rgba(0,63,157,0.06)] outline-none ring-0 placeholder:text-slate-400 focus:border-prerna-blue"
                placeholder={content.faqSearch}
                type="search"
                value={faqQuery}
                onChange={(event) => setFaqQuery(event.target.value)}
              />

              <MotionDiv
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative mt-8 overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#0066FF,#4f8fff_58%,#ffefe0)] p-6 text-white shadow-[0_24px_60px_rgba(0,82,204,0.18)]"
              >
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-prerna-orange/30 blur-2xl" />

                <div className="relative">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/75">Support Guide</p>
                  <h3 className="mt-3 font-heading text-2xl">Answers for parents, without the confusion</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/85">
                    Browse common questions about safety, setup, reports, and daily use before you start.
                  </p>

                  <div className="relative mt-8 h-56">
                    <MotionDiv
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                      className="absolute left-6 top-8 rounded-[1.6rem] bg-white px-5 py-4 text-slate-900 shadow-[0_18px_35px_rgba(15,23,42,0.16)]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-prerna-blue-light text-prerna-blue">
                          <CircleHelp className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-heading text-base">Quick answers</p>
                          <p className="text-xs text-slate-500">Setup, plans, reports</p>
                        </div>
                      </div>
                    </MotionDiv>

                    <MotionDiv
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                      className="absolute right-4 top-20 rounded-[1.4rem] bg-white/18 px-4 py-3 backdrop-blur-md"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-prerna-orange" />
                        <span className="text-sm font-semibold text-white">Search questions</span>
                      </div>
                    </MotionDiv>

                    <MotionDiv
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                      className="absolute bottom-5 left-1/2 grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border border-white/25 bg-white/12 backdrop-blur-md"
                    >
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-prerna-blue shadow-[0_10px_30px_rgba(15,23,42,0.16)]">
                        <CircleHelp className="h-8 w-8" aria-hidden="true" />
                      </div>
                    </MotionDiv>

                    <MotionDiv
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 4.6, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                      className="absolute bottom-10 right-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-prerna-blue shadow-[0_14px_28px_rgba(15,23,42,0.14)]"
                    >
                      Parent help
                    </MotionDiv>
                  </div>
                </div>
              </MotionDiv>
            </div>
            <div className="space-y-4">
              {filteredFaqs.map(([question, answer], index) => {
                const expanded = activeFaq === index

                return (
                  <article key={question} className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_40px_rgba(0,63,157,0.08)]">
                    <button
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-heading text-lg text-prerna-blue"
                      aria-expanded={expanded}
                      onClick={() => {
                        const nextIndex = expanded ? -1 : index
                        setActiveFaq(nextIndex)
                        if (!expanded) {
                          trackEvent('faq_expanded', question)
                        }
                      }}
                    >
                      <span>{question}</span>
                      <span className="text-2xl">{expanded ? '-' : '+'}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <MotionP
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24 }}
                          className="overflow-hidden px-5 pb-5 leading-7 text-slate-600"
                        >
                          {answer}
                        </MotionP>
                      ) : null}
                    </AnimatePresence>
                  </article>
                )
              })}
            </div>
          </div>
        </Section>

        <Section id="contact" className="bg-[linear-gradient(135deg,#0066FF,#FF8800)] py-16 text-white md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <h2 className="font-heading text-4xl leading-tight md:text-6xl">{content.finalHeadline}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">{content.finalSubheadline}</p>
              <p className="mt-6 inline-flex rounded-full bg-white/14 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                Harmful website blocking | Screen time support | Weekly safety visibility
              </p>
            </div>

            <div id="trial-form" className="rounded-[1.8rem] bg-white/96 p-6 text-slate-900 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <div className="grid gap-4">
                <p className="font-heading text-base text-slate-900">Start your subscription request</p>
                <p className="text-sm leading-7 text-slate-600">Open the subscription form and share your details. Our team will contact you after submission.</p>
                <MotionButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButtonClass} w-full min-h-14 text-base`}
                  type="button"
                  onClick={() => openFormModal('contact-card')}
                >
                  {content.finalCta}
                </MotionButton>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-prerna-blue">
                {['Student protection', 'Learning support', 'Parent summaries', 'Responsible digital habits'].map((item) => (
                  <span key={item} className="rounded-full bg-prerna-blue-light px-3 py-2">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer id="footer" className="bg-slate-800 py-16 text-white/88">
        <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-8 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <h3 className="font-heading text-2xl text-white">Apni Prerna</h3>
            {content.footerTagline ? <p className="mt-4">{content.footerTagline}</p> : null}
            <p className="mt-2 text-white/70">Part of Apni Pathshala network</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading text-lg text-white">Product</h4>
            <a className="block transition hover:text-prerna-orange" href="#features">Features</a>
            <a className="block transition hover:text-prerna-orange" href="#how-it-works">How It Works</a>
            <a className="block transition hover:text-prerna-orange" href="#dashboard">Parent Dashboard</a>
            <a className="block transition hover:text-prerna-orange" href="#pricing">Pricing</a>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading text-lg text-white">Support</h4>
            <a className="block transition hover:text-prerna-orange" href="#faq">FAQ</a>
            <a className="block transition hover:text-prerna-orange" href="#trial-form">Contact Us</a>
            <a className="block transition hover:text-prerna-orange" href="#trial-form">Subscription Help</a>
            <a className="block transition hover:text-prerna-orange" href="#contact">Setup Help</a>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading text-lg text-white">Contact</h4>
            <a className="block transition hover:text-prerna-orange" href="mailto:team@apnipathshala.org">team@apnipathshala.org</a>
            <a className="block transition hover:text-prerna-orange" href="tel:+919270185253">+91 92701 85253</a>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>
        <div className="mx-auto mt-8 w-[min(1200px,calc(100%-2rem))] border-t border-white/10 pt-6 text-center text-sm text-white/65">
          Copyright 2026 Apni Prerna. A product of Apni Pathshala. All rights reserved.
        </div>
      </footer>

      <MotionButton
        initial={false}
        animate={{ y: showStickyCta ? 0 : 120, opacity: showStickyCta ? 1 : 0 }}
        transition={{ duration: 0.24 }}
        className="fixed inset-x-4 bottom-4 z-40 inline-flex justify-center rounded-2xl bg-prerna-orange px-6 py-4 font-heading text-base font-semibold text-white shadow-[0_20px_50px_rgba(255,136,0,0.32)] md:hidden"
        onClick={() => openFormModal('sticky-mobile')}
      >
        {content.stickyCta}
      </MotionButton>

    </div>
  )
}

export default App
