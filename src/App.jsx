import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  navCta: 'Start Subscription',
  heroHeadline: 'Protect Your Child in the Digital World',
  heroSubheadline:
    'Apni Prerna Safe Zone helps parents keep children safe on computers and the internet by blocking harmful websites, reducing distractions, and supporting responsible device usage.',
  heroDescription:
    'Built for families, schools, and learning environments, Apni Prerna creates a safer digital space where students can focus on learning without exposure to unsafe content, risky downloads, or unnecessary distractions.',
  trustLine: 'Student safety software | Parent-friendly dashboard | Built for responsible digital use',
  primaryCta: 'Start Protecting My Child',
  secondaryCta: 'See How It Works',
  microCopy: 'Simple setup | Parent-focused controls | Safer learning environment',
  socialProof: 'Used for safe digital learning, website protection, and parent visibility',
  problemHeadline: 'The Internet Is Not Always Safe for Children',
  solutionHeadline: 'Student Safety Software Designed for Everyday Protection',
  solutionSubheadline:
    'Apni Prerna gives parents clear controls and clear information so children can use computers for learning in a safe and responsible way.',
  howHeadline: 'How Apni Prerna Works',
  dashboardHeadline: 'Parent Dashboard Visibility Without Complexity',
  pricingHeadline: 'Choose a Plan That Fits Your Family',
  pricingSubheadline: 'Monthly plans per child with annual options available',
  faqHeadline: 'Frequently Asked Questions',
  faqSearch: 'Search questions',
  finalHeadline: 'Give Your Child a Safer Digital Future',
  finalSubheadline:
    'Start using Apni Prerna Safe Zone to block harmful websites, reduce distractions, and maintain a productive digital environment for your child.',
  finalCta: 'Start Subscription',
  contactCta: 'Contact for Setup Help',
  footerTagline: 'Student safety software for safe and responsible digital usage',
  emailLabel: 'Parent email',
  emailPlaceholder: 'name@example.com',
  formSuccess: 'Your request has been received. We will contact you shortly.',
  formError: 'Enter a valid email address.',
  stickyCta: 'Start Subscription',
  chat: 'Need Help? Contact Us',
  exitHeadline: 'Before You Leave',
  exitBody: 'Create a safer digital environment for your child with Apni Prerna Safe Zone.',
  claimOffer: 'Start Subscription',
  closeOffer: 'Close',
}

const problems = [
  ['Shield', 'Harmful Websites', 'Unsafe content can appear without warning', 'Children can be exposed to adult content, unsafe links, gambling pages, and malware-based websites while browsing.'],
  ['Alert', 'Online Distractions', 'Learning time is easily lost', 'Games, entertainment platforms, and social websites can break concentration and reduce productive computer use.'],
  ['Download', 'Unsafe Downloads', 'Risky files affect device safety', 'Unverified downloads, unwanted programs, and unsafe tools can create security issues on a student device.'],
]

const features = [
  ['Shield', '01', 'Harmful Website Blocking', 'Automatically blocks inappropriate websites, malware pages, adult content, gambling pages, and unsafe downloads.', 'Core Safety'],
  ['Blocks', '02', 'Distraction Control', 'Restricts access to games, social media, and entertainment platforms during study time to keep attention on learning.', 'Focus Time'],
  ['MonitorCheck', '03', 'Safe Device Monitoring', 'Checks device safety and helps ensure unsafe or unwanted programs are not actively running.', 'Device Health'],
  ['SearchCheck', '04', 'Learning-Focused Environment', 'Supports productive device usage by keeping the computer centered on educational activities and student work.', 'Learning First'],
  ['ClipboardList', '05', 'Activity Summary for Parents', 'Shows simplified usage summaries so parents can understand how the computer is being used.', 'Parent Visibility'],
  ['Bot', '06', 'Smart Safety Policies', 'Applies rules that maintain safe and productive use of the device without making setup difficult for families.', 'Smart Rules'],
]

const steps = [
  ['01', 'Create an Account', 'Parents sign up and choose the subscription plan that fits their needs.', 'Step 1'],
  ['02', "Install on the Child's Computer", 'Apni Prerna is installed on the student device to begin protection and rule enforcement.', 'Step 2'],
  ['03', 'Monitor and Protect Automatically', 'Once installed, the software works in the background and parents can review summaries and alerts.', 'Step 3'],
]

const dashboardItems = [
  ['Bell', 'Safety alerts', 'Receive clear updates when risky activity or blocked content is detected.'],
  ['Shield', 'Blocked website information', 'See what websites were restricted and why they were blocked.'],
  ['LayoutDashboard', 'Device status', 'Check whether the student computer is active, protected, and working within the set policies.'],
  ['ClipboardList', 'Activity summaries', 'Review simplified summaries of usage without needing technical knowledge.'],
  ['ChartColumn', 'Weekly usage reports', 'Understand overall learning and device usage patterns over time.'],
  ['Gauge', 'Smart visibility', 'Stay informed without constantly supervising the child in person.'],
]

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
    name: 'Basic',
    price: 'Rs. 99',
    cadence: '/month per child',
    billed: 'Annual options available',
    features: ['Harmful website blocking', 'Distraction control', 'Basic safety monitoring'],
  },
  {
    name: 'Standard',
    price: 'Rs. 199',
    cadence: '/month per child',
    billed: 'Annual options available',
    badge: 'Recommended',
    featured: true,
    features: ['Everything in Basic', 'Device monitoring', 'Safety alerts', 'Activity summaries'],
  },
  {
    name: 'Premium',
    price: 'Rs. 349',
    cadence: '/month per child',
    billed: 'Annual options available',
    badge: 'Full Access',
    features: ['Everything in Standard', 'Parent dashboard access', 'Weekly reports', 'Priority support'],
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
  ['What is included in the parent dashboard?', 'The dashboard gives access to safety alerts, blocked website details, device status, activity summaries, and weekly usage reports.'],
  ['Are annual subscription options available?', 'Yes. The website states that annual subscription options are available in addition to the monthly plans.'],
  ['Who is this product designed for?', 'It is primarily designed for parents of students aged 8 to 18 who want safer and more responsible computer and internet usage.'],
]

const notificationNames = [
  'A parent just reviewed a weekly usage summary',
  'A new family started safer computer protection',
  'A learning-focused plan was activated',
  'A student device was secured with Apni Prerna',
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
  const [faqQuery, setFaqQuery] = useState('')
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [notificationIndex, setNotificationIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [formState, setFormState] = useState({ error: '', success: '' })
  const heroRef = useRef(null)

  const emailError = emailTouched && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? content.formError : ''

  const filteredFaqs = useMemo(
    () => faqs.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(faqQuery.toLowerCase())),
    [faqQuery],
  )

  useEffect(() => {
    document.title = 'Apni Prerna Safe Zone - Student Safety Software'
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

  useEffect(() => {
    const onMouseLeave = (event) => {
      if (event.clientY <= 0 && !showExitModal) {
        setShowExitModal(true)
        trackEvent('exit_intent_triggered', 'mouseleave')
      }
    }

    document.addEventListener('mouseout', onMouseLeave)
    return () => document.removeEventListener('mouseout', onMouseLeave)
  }, [showExitModal])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNotificationIndex((index) => (index + 1) % notificationNames.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!isValidEmail) {
      setFormState({ error: content.formError, success: '' })
      return
    }

    setFormState({ error: '', success: content.formSuccess })
    trackEvent('subscription_interest_submitted', { email })
    setEmail('')
    setEmailTouched(false)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f9fbff_38%,#ffffff_100%)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-prerna-blue/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-wrap items-center justify-between gap-4 py-4">
          <a className="flex items-center gap-3 text-slate-900" href="#home" aria-label="Apni Prerna Safe Zone home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0066FF,#FF8800)] font-heading text-lg font-bold text-white shadow-[0_16px_36px_rgba(0,102,255,0.22)]">
              A
            </span>
            <span className="block">
              <strong className="block font-heading text-base">Apni Prerna Safe Zone</strong>
              <small className="text-sm text-slate-600">Student safety software for responsible digital usage</small>
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

          <a className={`${primaryButtonClass} hidden md:inline-flex`} href="#trial-form" onClick={() => trackEvent('cta_click', 'header')}>
            {content.navCta}
          </a>
        </div>
      </header>

      <main>
        <Section id="home" className="py-16 md:py-24">
          <div ref={heroRef} className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-prerna-blue-dark">Apni Prerna Safe Zone</p>
              <h1 className="font-heading text-4xl leading-tight text-slate-950 md:text-6xl">{content.heroHeadline}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">{content.heroSubheadline}</p>
              <p className="mt-5 text-sm font-semibold text-slate-500">{content.trustLine}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{content.heroDescription}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MotionA whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`${primaryButtonClass} min-h-14 px-7 text-base`} href="#trial-form">
                  {content.primaryCta}
                </MotionA>
                <MotionA whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className={`${secondaryButtonClass} min-h-14 px-7 text-base`} href="#how-it-works">
                  {content.secondaryCta}
                </MotionA>
              </div>
              <p className="mt-3 text-sm text-slate-500">{content.microCopy}</p>
              <div className="mt-6 rounded-3xl border border-prerna-blue/10 bg-prerna-blue-light/70 p-4 text-sm font-semibold text-prerna-blue-dark shadow-[0_16px_40px_rgba(0,102,255,0.08)]">
                {content.socialProof}
              </div>
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
              <div className="absolute bottom-0 left-0 rounded-full bg-[linear-gradient(135deg,#FF8800,#E67700)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(255,136,0,0.25)]">For Learning</div>
            </MotionDiv>
          </div>
        </Section>

        <Section className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_25%),linear-gradient(160deg,#0052CC,#013694)] py-16 text-white md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{content.problemHeadline}</h2>
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
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {dashboardItems.map(([icon, title, description]) => {
                const DashboardIcon = iconMap[icon]

                return (
                  <MotionArticle key={title} whileHover={{ y: -6 }} className="rounded-[1.6rem] border border-prerna-blue/10 bg-white p-6 shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
                    <span className="inline-flex rounded-2xl bg-prerna-orange-light p-3 text-prerna-orange">
                      <DashboardIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-heading text-2xl text-slate-900">{title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{description}</p>
                  </MotionArticle>
                )
              })}
            </div>
          </div>
        </Section>

        <Section className="bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_100%)] py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">Why Parents Choose Apni Prerna</h2>
            <div className="mt-12 overflow-hidden rounded-[1.8rem] border border-prerna-blue/12 bg-white shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
              <div className="hidden grid-cols-[1.5fr_1fr_1fr] gap-4 bg-[linear-gradient(135deg,#0066FF,#FF8800)] px-5 py-4 font-heading text-sm font-bold text-white md:grid">
                <span>Feature</span>
                <span>Apni Prerna</span>
                <span>Typical Tools</span>
              </div>
              {comparisonRows.map(([feature, ours, others]) => (
                <div key={feature} className="grid gap-3 border-t border-slate-200 px-5 py-4 md:grid-cols-[1.5fr_1fr_1fr] md:items-center">
                  <span className="font-semibold text-slate-900">{feature}</span>
                  <span className="font-semibold text-emerald-600">{ours}</span>
                  <span className="text-rose-500">{others}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="pricing" className="bg-white py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{content.pricingHeadline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-8 text-slate-600">{content.pricingSubheadline}</p>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
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
                  <a className={`mt-8 w-full ${plan.featured ? primaryButtonClass : secondaryButtonClass}`} href="#trial-form">
                    {content.navCta}
                  </a>
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
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <label htmlFor="email" className="font-heading text-base text-slate-900">{content.emailLabel}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={content.emailPlaceholder}
                  value={email}
                  onFocus={() => {
                    setEmailTouched(true)
                    trackEvent('subscription_form_started', 'email-focus')
                  }}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setEmailTouched(true)
                    setFormState({ error: '', success: '' })
                  }}
                  className="rounded-2xl border border-prerna-blue/16 px-4 py-4 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-prerna-blue"
                />
                <MotionButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${primaryButtonClass} w-full min-h-14 text-base`} type="submit">
                  {content.finalCta}
                </MotionButton>
                <p className="text-sm text-slate-500">Parents can use Apni Prerna to create a safer and more productive digital environment for students.</p>
                {emailError || formState.error ? <p className="text-sm font-semibold text-rose-700">{emailError || formState.error}</p> : null}
                {formState.success ? <p className="text-sm font-semibold text-emerald-700">{formState.success}</p> : null}
              </form>

              <a className={`mt-4 w-full ${secondaryButtonClass}`} href="#footer">{content.contactCta}</a>
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
            <h3 className="font-heading text-2xl text-white">Apni Prerna Safe Zone</h3>
            <p className="mt-4">{content.footerTagline}</p>
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
            <a className="block transition hover:text-prerna-orange" href="mailto:support@apniprerna.org">support@apniprerna.org</a>
            <a className="block transition hover:text-prerna-orange" href="tel:+919270185253">+91 92701 85253</a>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>
        <div className="mx-auto mt-8 w-[min(1200px,calc(100%-2rem))] border-t border-white/10 pt-6 text-sm text-white/65">
          Copyright 2026 Apni Prerna. A product of Apni Pathshala. All rights reserved.
        </div>
      </footer>

      <MotionButton
        initial={false}
        animate={{ y: showStickyCta ? 0 : 120, opacity: showStickyCta ? 1 : 0 }}
        transition={{ duration: 0.24 }}
        className="fixed inset-x-4 bottom-4 z-40 inline-flex justify-center rounded-2xl bg-prerna-orange px-6 py-4 font-heading text-base font-semibold text-white shadow-[0_20px_50px_rgba(255,136,0,0.32)] md:hidden"
        onClick={() => document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' })}
      >
        {content.stickyCta}
      </MotionButton>

      <MotionButton
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#0066FF,#0052CC)] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(0,82,204,0.28)]"
        onClick={() => trackEvent('contact_widget_opened', 'floating-button')}
      >
        <CircleHelp className="h-4 w-4" aria-hidden="true" />
        {content.chat}
      </MotionButton>

      <AnimatePresence mode="wait">
        <MotionDiv
          key={notificationIndex}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-24 left-4 z-40 max-w-[18rem] rounded-2xl bg-white/95 px-4 py-3 text-sm font-medium text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
          aria-live="polite"
        >
          {notificationNames[notificationIndex]}
        </MotionDiv>
      </AnimatePresence>

      <AnimatePresence>
        {showExitModal ? (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4" role="dialog" aria-modal="true" aria-labelledby="exit-title">
            <MotionDiv initial={{ scale: 0.94, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 8 }} className="relative w-full max-w-xl rounded-[1.8rem] bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.24)]">
              <button className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-2xl text-slate-700" onClick={() => setShowExitModal(false)} aria-label="Close offer">
                x
              </button>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-prerna-blue-dark">Apni Prerna Safe Zone</p>
              <h2 id="exit-title" className="mt-4 font-heading text-3xl text-slate-950">{content.exitHeadline}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{content.exitBody}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a className={primaryButtonClass} href="#trial-form" onClick={() => setShowExitModal(false)}>{content.claimOffer}</a>
                <button className={secondaryButtonClass} onClick={() => setShowExitModal(false)}>{content.closeOffer}</button>
              </div>
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default App
