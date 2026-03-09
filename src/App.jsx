import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

const translations = {
  en: {
    navCta: 'Start Free Trial',
    watchDemo: 'Watch 2-Min Demo Video',
    heroHeadline: "Your Child's Digital Guardian. 24/7 Protection. Zero Compromise.",
    heroSubheadline:
      "AI-powered safety that blocks harmful content, monitors activities, and builds healthy screen habits while respecting your child's privacy.",
    trustLine: 'Trusted by 10,247+ parents across India | GDPR Compliant | No Data Selling',
    heroDescription:
      'Every 7 minutes, a child encounters inappropriate content online. Apni Prerna uses advanced AI to create a safe digital environment for your child, blocking threats in real time, alerting you to risks, and helping build responsible digital citizenship.',
    heroCta: 'Start Free 14-Day Trial',
    noCard: 'No credit card required | Cancel anytime',
    socialProof: '4.8/5 from 1,284 parents | Featured on leading Indian media | Recommended by child psychologists',
    problemHeadline: "Every Parent's Nightmare: The Digital Dangers Your Child Faces Daily",
    solutionHeadline: 'One Platform. Complete Protection. Peace of Mind.',
    solutionSubheadline:
      'Apni Prerna combines AI monitoring, smart controls, and educational tools to create a safe digital environment where your child can thrive.',
    howHeadline: 'Get Started in 3 Simple Steps',
    testimonialHeadline: 'Join 10,000+ Parents Who Sleep Better at Night',
    comparisonHeadline: 'Not All Child Safety Apps Are Created Equal',
    pricingHeadline: 'One Low Price. Complete Protection. No Hidden Fees.',
    pricingSubheadline: '14-day free trial | Cancel anytime | 30-day money-back guarantee',
    faqHeadline: 'Frequently Asked Questions',
    faqSearch: 'Search questions',
    finalHeadline: "Don't Wait Until It's Too Late",
    finalSubheadline:
      'Every day without protection puts your child at risk. Start your free trial now, no credit card, no commitment, just peace of mind.',
    urgency: 'Limited Time: Get 2 Months Free with Annual Plan (Ends March 31, 2026)',
    scheduleDemo: 'Schedule Free Demo Call',
    footerTagline: 'Protecting children in the digital world',
    startNow: 'Protect Your Child Today',
    seeAll: 'See All Features',
    trialLarge: 'Start Your 14-Day Free Trial',
    emailLabel: 'Parent email',
    emailPlaceholder: 'name@example.com',
    formSuccess: 'Trial request received. Our team will contact you shortly.',
    formError: 'Enter a valid email address.',
    stickyCta: 'Start Free Trial',
    chat: 'Need Help? Chat Now',
    exitHeadline: 'Wait! Your Child Needs Protection',
    exitBody: 'Get 50% off your first month if you start today.',
    claimOffer: 'Claim Offer',
    closeOffer: "No thanks, I'll risk it",
  },
  hi: {
    navCta: 'फ्री ट्रायल शुरू करें',
    watchDemo: '2 मिनट का डेमो देखें',
    heroHeadline: 'आपके बच्चे का डिजिटल गार्जियन। 24/7 सुरक्षा। बिना समझौते।',
    heroSubheadline:
      'AI से चलने वाली सुरक्षा जो हानिकारक कंटेंट रोकती है, गतिविधियों पर नज़र रखती है और स्वस्थ स्क्रीन आदतें बनाती है।',
    trustLine: 'भारत के 10,247+ माता-पिता का भरोसा | GDPR compliant | No data selling',
    heroDescription:
      'हर 7 मिनट में एक बच्चा अनुचित ऑनलाइन कंटेंट से टकराता है। Apni Prerna रियल-टाइम में खतरे रोकती है, आपको तुरंत अलर्ट देती है और जिम्मेदार डिजिटल आदतें बनाने में मदद करती है।',
    heroCta: '14-दिन का फ्री ट्रायल शुरू करें',
    noCard: 'क्रेडिट कार्ड नहीं चाहिए | कभी भी कैंसल करें',
    socialProof: '1,284+ माता-पिता से 4.8/5 | प्रमुख भारतीय मीडिया में फीचर्ड | चाइल्ड साइकोलॉजिस्ट द्वारा सुझाया गया',
    problemHeadline: 'हर माता-पिता का डर: आपके बच्चे के सामने रोज़ आने वाले डिजिटल खतरे',
    solutionHeadline: 'एक प्लेटफॉर्म। पूरी सुरक्षा। पूरा भरोसा।',
    solutionSubheadline:
      'Apni Prerna AI मॉनिटरिंग, स्मार्ट कंट्रोल और एजुकेशनल टूल्स को मिलाकर सुरक्षित डिजिटल माहौल बनाती है।',
    howHeadline: '3 आसान स्टेप्स में शुरू करें',
    testimonialHeadline: '10,000+ माता-पिता के साथ जुड़ें जो अब चैन की नींद सोते हैं',
    comparisonHeadline: 'हर चाइल्ड सेफ्टी ऐप एक जैसा नहीं होता',
    pricingHeadline: 'एक सीधी कीमत। पूरी सुरक्षा। कोई छुपी फीस नहीं।',
    pricingSubheadline: '14-दिन का फ्री ट्रायल | कभी भी कैंसल करें | 30-दिन मनी-बैक गारंटी',
    faqHeadline: 'अक्सर पूछे जाने वाले सवाल',
    faqSearch: 'सवाल खोजें',
    finalHeadline: 'देर मत कीजिए',
    finalSubheadline:
      'हर दिन बिना सुरक्षा के आपके बच्चे को जोखिम में डालता है। अभी ट्रायल शुरू करें और मन की शांति पाएँ।',
    urgency: 'सीमित समय: Annual plan पर 2 महीने फ्री (31 मार्च 2026 तक)',
    scheduleDemo: 'फ्री डेमो कॉल बुक करें',
    footerTagline: 'डिजिटल दुनिया में बच्चों की सुरक्षा',
    startNow: 'आज ही सुरक्षा शुरू करें',
    seeAll: 'सभी फीचर्स देखें',
    trialLarge: '14-दिन का फ्री ट्रायल शुरू करें',
    emailLabel: 'माता-पिता का ईमेल',
    emailPlaceholder: 'name@example.com',
    formSuccess: 'ट्रायल रिक्वेस्ट मिल गई है। हमारी टीम जल्द संपर्क करेगी।',
    formError: 'सही ईमेल दर्ज करें।',
    stickyCta: 'फ्री ट्रायल शुरू करें',
    chat: 'मदद चाहिए? चैट करें',
    exitHeadline: 'रुकिए! आपके बच्चे को सुरक्षा चाहिए',
    exitBody: 'आज शुरू करने पर पहले महीने पर 50% छूट पाएँ।',
    claimOffer: 'ऑफर लें',
    closeOffer: 'नहीं, अभी नहीं',
  },
}

const problems = [
  {
    icon: '🛡',
    stat: '87% of children have seen inappropriate content by age 12',
    title: 'Inappropriate Content',
    description:
      'Pornography, violence, hate speech, and harmful material can reach your child in seconds and leave lasting impact.',
  },
  {
    icon: '⚠',
    stat: '1 in 3 children experience cyberbullying',
    title: 'Cyberbullying & Predators',
    description:
      'Predators, anonymous harassment, and social pressure happen out of sight. The warning often comes too late.',
  },
  {
    icon: '⏱',
    stat: 'Average child spends 7+ hours daily on screens',
    title: 'Screen Addiction',
    description:
      'Late-night scrolling and gaming loops reduce sleep, focus, and real-world connection across the family.',
  },
]

const features = [
  ['🛡', 'Real-Time Threat Blocking', 'Advanced AI scans web pages, apps, and videos in real time to block harmful or age-inappropriate content instantly.', '99.7% Accuracy'],
  ['👁', 'Complete Visibility Dashboard', 'Track websites visited, apps used, search activity, and risky behavior alerts from one calm parent dashboard.', 'Real-Time Alerts'],
  ['⏳', 'Smart Screen Time Limits', 'Create healthy routines for school, meals, sleep, and rewards without daily arguments or manual follow-up.', 'Age-Appropriate'],
  ['🔎', 'Filtered Search Results', 'Enable safe search across major platforms and hide explicit videos, comments, and risky results before your child sees them.', 'Multi-Platform'],
  ['📍', 'Know Where They Are', 'Use real-time location tracking and geofencing alerts when children leave safe zones like home or school.', 'Live Updates'],
  ['📊', 'Weekly Insights & Recommendations', 'Get reports on usage, blocked threats, and digital wellbeing with practical suggestions for healthier habits.', 'AI-Powered'],
]

const steps = [
  ['01', 'Install in 2 Minutes', 'Download Apni Prerna on parent and child devices. The setup wizard keeps the process simple.', '2 minutes'],
  ['02', 'Customize Protection', 'Pick an age profile or tune filters, time limits, and safe zones to match your family.', '5 minutes'],
  ['03', 'Relax & Monitor', 'Protection runs quietly in the background while you check alerts and weekly reports when needed.', 'Ongoing'],
]

const testimonials = [
  ['Priya Sharma', 'Mumbai, Maharashtra', 'Mother of 2 (ages 8 & 11)', 'Within the first week, Apni Prerna blocked 47 inappropriate sites my daughter tried to access. Now I can give her independence without constant worry.'],
  ['Rajesh Kumar', 'Bengaluru, Karnataka', 'Father of 1 (age 14)', "My son was spending 10+ hours gaming daily. Apni Prerna helped us set boundaries and our evenings finally feel normal again."],
  ['Sneha Patel', 'Delhi NCR', 'Mother of 3 (ages 6, 9, 13)', "As a working mom, I can't watch them constantly. Real-time alerts give me peace of mind and the weekly reports are actually useful."],
  ['Anjali Deshmukh', 'Pune, Maharashtra', 'School Principal & Mother', 'We recommend Apni Prerna to parents in our school because it balances protection with digital citizenship, not fear.'],
  ['Amit Verma', 'Hyderabad, Telangana', 'Father of 2 (ages 10 & 13)', "I worried this would feel invasive, but it improved communication at home. My kids understand it's about safety, not spying."],
  ['Kavita Singh', 'Chennai, Tamil Nadu', 'Mother of 1 (age 7)', 'Apni Prerna alerted me early during a cyberbullying incident so I could step in before it escalated. Every parent needs that chance.'],
]

const comparisonRows = [
  ['AI-Powered Content Blocking', '99.7% accuracy', 'Basic keyword filtering'],
  ['Real-Time Threat Alerts', 'Instant notifications', 'Daily summary only'],
  ['Screen Time Management', 'Smart schedules + rewards', 'Basic time limits'],
  ['Location Tracking', 'Live + geofencing', 'Location history only'],
  ['Multi-Device Support', 'Unlimited devices', 'Max 3 devices'],
  ['YouTube Safe Mode', 'AI content filter', 'YouTube Kids only'],
  ['Weekly Wellbeing Reports', 'Detailed insights', 'None'],
  ['Privacy Respecting', 'GDPR compliant', 'Data selling concerns'],
  ['Indian Language Support', 'Hindi, Tamil, Telugu, more', 'English only'],
  ['Customer Support', '24/7 chat + phone', 'Email only'],
  ['Price', '₹299/month', '₹499-799/month'],
]

const plans = [
  {
    name: 'Monthly',
    price: '₹399',
    cadence: '/month',
    billed: 'Billed monthly',
    features: ['Unlimited devices', 'All premium features', '24/7 support', 'Weekly reports'],
  },
  {
    name: 'Annual',
    price: '₹299',
    cadence: '/month',
    billed: '₹3,588 billed annually',
    badge: 'Most Popular',
    save: 'Save 25%',
    original: '₹399',
    featured: true,
    features: ['Everything in Monthly', '2 months free', 'Priority support', 'Early access to new features'],
  },
  {
    name: 'Family',
    price: '₹499',
    cadence: '/month',
    billed: '₹5,988 billed annually',
    badge: 'Best for Families',
    save: 'Best Value',
    features: ['Everything in Annual', 'Up to 5 children', 'Individual child profiles', 'Family insights dashboard'],
  },
]

const faqs = [
  ['Is Apni Prerna safe and private?', 'Yes. Monitoring is encrypted, we do not sell family data, and the product is designed around essential safety logs only.'],
  ['Will my child know they are being monitored?', 'Yes. We recommend transparent conversations so the app supports trust and healthy digital behavior rather than hidden surveillance.'],
  ['Does it work on all devices?', 'It is designed for Android, iPhone, iPad, tablets, Chromebooks, Windows PCs, and Macs with one subscription covering unlimited devices.'],
  ['Can my tech-savvy child bypass it?', 'Tamper alerts and parent authentication make disabling or uninstalling difficult without your approval.'],
  ['What if blocked content is needed for homework?', 'Parents can temporarily whitelist specific apps or sites, or schedule a homework mode from the dashboard.'],
  ['How much data does it use?', 'The product is designed to stay light on battery and data usage, typically under 50 MB per month per device.'],
  ['What if I have multiple children of different ages?', 'Each child can have separate profiles, restrictions, reports, and age-appropriate settings.'],
  ['Is customer support available in Hindi?', 'Yes. Support is available in Hindi, English, and multiple Indian languages through chat, phone, and email.'],
  ['Can I cancel anytime?', 'Yes. You can cancel from account settings and use the 30-day money-back guarantee if the service is not a fit.'],
  ['What if I need help setting it up?', 'Parents can book a free onboarding call and most families finish setup in under 10 minutes.'],
]

const notificationNames = [
  'Priya from Mumbai just started a free trial',
  'Amit from Hyderabad booked a demo call',
  'Sneha from Delhi upgraded to the annual plan',
  'Kavita from Chennai completed setup in 8 minutes',
]

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
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </MotionSection>
  )
}

function App() {
  const [language, setLanguage] = useState('en')
  const [activeFaq, setActiveFaq] = useState(0)
  const [faqQuery, setFaqQuery] = useState('')
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [notificationIndex, setNotificationIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState({ error: '', success: '' })
  const heroRef = useRef(null)
  const copy = translations[language]

  const filteredFaqs = useMemo(
    () => faqs.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(faqQuery.toLowerCase())),
    [faqQuery],
  )

  useEffect(() => {
    document.title = 'Apni Prerna - AI-Powered Child Safety & Parental Control App'
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Protect your child online with AI-powered content filtering, screen time management, and real-time threat alerts. Free 14-day trial.',
      )
    }
  }, [])

  useEffect(() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'apni_prerna_page_view', language })
  }, [language])

  useEffect(() => {
    const thresholds = [25, 50, 75, 100]
    const seen = new Set()
    const onScroll = () => {
      const root = document.documentElement
      const scrolled = ((root.scrollTop || document.body.scrollTop) / (root.scrollHeight - root.clientHeight)) * 100
      thresholds.forEach((threshold) => {
        if (scrolled >= threshold && !seen.has(threshold)) {
          seen.add(threshold)
          trackEvent('scroll_depth', { threshold })
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { threshold: 0.2 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onMouseLeave = (event) => {
      if (event.clientY <= 0) {
        setShowExitModal(true)
        trackEvent('exit_intent_triggered', 'mouseleave')
      }
    }

    document.addEventListener('mouseout', onMouseLeave)
    return () => document.removeEventListener('mouseout', onMouseLeave)
  }, [])

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
      setFormState({ error: copy.formError, success: '' })
      return
    }

    setFormState({ error: '', success: copy.formSuccess })
    trackEvent('trial_form_completed', { email })
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.12),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f9fbff_38%,#ffffff_100%)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-prerna-blue/10 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(1200px,calc(100%-2rem))] flex-wrap items-center justify-between gap-4 py-4">
          <a className="flex items-center gap-3 text-slate-900" href="#hero" aria-label="Apni Prerna home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0066FF,#FF8800)] font-heading text-lg font-bold text-white shadow-[0_16px_36px_rgba(0,102,255,0.22)]">
              A
            </span>
            <span className="block">
              <strong className="block font-heading text-base">Apni Prerna</strong>
              <small className="text-sm text-slate-600">Protect Your Child in the Digital World</small>
            </span>
          </a>

          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 md:flex" aria-label="Primary">
            <a className="transition hover:text-prerna-orange" href="#features">
              Features
            </a>
            <a className="transition hover:text-prerna-orange" href="#how-it-works">
              How It Works
            </a>
            <a className="transition hover:text-prerna-orange" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-prerna-orange" href="#faq">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-full bg-slate-100 p-1" role="group" aria-label="Language switcher">
              {['en', 'hi'].map((value) => (
                <button
                  key={value}
                  className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                    language === value ? 'bg-prerna-blue text-white' : 'text-slate-600'
                  }`}
                  onClick={() => setLanguage(value)}
                >
                  {value === 'en' ? 'EN' : 'हिं'}
                </button>
              ))}
            </div>
            <a className={`${primaryButtonClass} hidden md:inline-flex`} href="#trial-form" onClick={() => trackEvent('cta_click', 'header')}>
              {copy.navCta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <Section id="hero" className="py-16 md:py-24">
          <div
            ref={heroRef}
            className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          >
            <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-prerna-blue-dark">
                AI-Powered Child Safety Platform
              </p>
              <h1 className="font-heading text-4xl leading-tight text-slate-950 md:text-6xl">{copy.heroHeadline}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 md:text-xl">{copy.heroSubheadline}</p>
              <p className="mt-5 text-sm font-semibold text-slate-500">{copy.trustLine}</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">{copy.heroDescription}</p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MotionA
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${primaryButtonClass} min-h-14 px-7 text-base`}
                  href="#trial-form"
                  onClick={() => trackEvent('cta_click', 'hero-primary')}
                >
                  {copy.heroCta}
                </MotionA>
                <MotionA
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${secondaryButtonClass} min-h-14 px-7 text-base`}
                  href="#demo"
                  onClick={() => trackEvent('video_play', 'hero-demo')}
                >
                  {copy.watchDemo}
                </MotionA>
              </div>

              <p className="mt-3 text-sm text-slate-500">{copy.noCard}</p>
              <div className="mt-6 rounded-3xl border border-prerna-blue/10 bg-prerna-blue-light/70 p-4 text-sm font-semibold text-prerna-blue-dark shadow-[0_16px_40px_rgba(0,102,255,0.08)]">
                {copy.socialProof}
              </div>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="relative min-h-[34rem]"
            >
              <div className="absolute inset-x-0 top-4 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_32%),linear-gradient(145deg,#0052CC,#0066FF)] p-8 text-white shadow-[0_26px_70px_rgba(0,46,125,0.24)]">
                <span className="inline-flex rounded-full bg-white/95 px-3 py-2 text-sm font-semibold text-prerna-blue">
                  GDPR Compliant
                </span>
                <h2 className="mt-5 font-heading text-3xl">Family Safety Dashboard</h2>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/15 bg-white/8 p-4">
                    <strong className="block text-4xl font-heading">2,487</strong>
                    <span className="text-sm text-white/80">Threats blocked</span>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/8 p-4">
                    <strong className="block text-4xl font-heading">162h</strong>
                    <span className="text-sm text-white/80">Safe screen hours</span>
                  </div>
                </div>

                <MotionDiv
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mx-auto mt-10 grid h-56 w-56 place-items-center rounded-full border border-white/20 shadow-[inset_0_0_0_20px_rgba(255,255,255,0.06)]"
                >
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-[linear-gradient(135deg,#ffffff,#d8e8ff)] font-heading text-xl font-bold text-prerna-blue">
                    Safe
                  </div>
                </MotionDiv>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/85">
                  {['Live alerts', 'Screen schedules', 'Location zones'].map((item) => (
                    <span key={item} className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <MotionDiv
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute right-3 top-0 rounded-full bg-[linear-gradient(135deg,#FF8800,#E67700)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(255,136,0,0.25)]"
              >
                Made in India
              </MotionDiv>
              <MotionDiv
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-0 left-0 rounded-full bg-[linear-gradient(135deg,#FF8800,#E67700)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(255,136,0,0.25)]"
              >
                256-bit Encrypted
              </MotionDiv>
            </MotionDiv>
          </div>
        </Section>

        <Section className="bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_25%),linear-gradient(160deg,#0052CC,#013694)] py-16 text-white md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{copy.problemHeadline}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {problems.map((problem) => (
                <MotionArticle
                  key={problem.title}
                  whileHover={{ y: -6 }}
                  className="rounded-[1.6rem] border border-white/15 bg-white/10 p-6 shadow-[0_20px_40px_rgba(0,20,80,0.18)] backdrop-blur-md"
                >
                  <span className="text-3xl">{problem.icon}</span>
                  <p className="mt-4 font-semibold text-[#ffd27a]">{problem.stat}</p>
                  <h3 className="mt-4 font-heading text-2xl">{problem.title}</h3>
                  <p className="mt-3 leading-7 text-white/85">{problem.description}</p>
                </MotionArticle>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a className={primaryButtonClass} href="#trial-form" onClick={() => trackEvent('cta_click', 'problem-section')}>
                {copy.startNow}
              </a>
            </div>
          </div>
        </Section>

        <Section id="features" className="bg-white py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{copy.solutionHeadline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-8 text-slate-600">{copy.solutionSubheadline}</p>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map(([icon, title, description, badge], index) => (
                <MotionArticle
                  key={title}
                  whileHover={{ y: -6 }}
                  className={`rounded-[1.6rem] border-t-[5px] bg-white p-6 shadow-[0_20px_45px_rgba(0,63,157,0.10)] ${
                    index % 2 === 0 ? 'border-prerna-blue' : 'border-prerna-orange'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-3xl">{icon}</span>
                    <span className="rounded-full bg-prerna-blue-light px-3 py-2 text-sm font-semibold text-prerna-blue">{badge}</span>
                  </div>
                  <h3 className="mt-5 font-heading text-2xl text-slate-900">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{description}</p>
                </MotionArticle>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a className={secondaryButtonClass} href="#pricing" onClick={() => trackEvent('cta_click', 'features-section')}>
                {copy.seeAll}
              </a>
            </div>
          </div>
        </Section>

        <Section id="how-it-works" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{copy.howHeadline}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map(([number, title, description, badge]) => (
                <MotionArticle
                  key={title}
                  whileHover={{ y: -6 }}
                  className="rounded-[1.6rem] bg-white p-6 shadow-[0_20px_45px_rgba(0,63,157,0.08)]"
                >
                  <span className="font-heading text-6xl font-bold text-prerna-blue/15">{number}</span>
                  <h3 className="mt-4 font-heading text-2xl text-slate-900">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{description}</p>
                  <span className="mt-5 inline-flex rounded-full bg-prerna-blue-light px-3 py-2 text-sm font-semibold text-prerna-blue">
                    {badge}
                  </span>
                </MotionArticle>
              ))}
            </div>
            <div className="mt-10 flex justify-center gap-8">
              {['1', '2', '3'].map((item) => (
                <span
                  key={item}
                  className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(135deg,#0066FF,#FF8800)] font-heading text-lg font-bold text-white"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a className={primaryButtonClass} href="#trial-form" onClick={() => trackEvent('cta_click', 'how-it-works')}>
                {copy.heroCta}
              </a>
            </div>
          </div>
        </Section>

        <Section className="bg-white py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{copy.testimonialHeadline}</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.map(([name, location, role, quote]) => (
                <MotionArticle
                  key={name}
                  whileHover={{ y: -6 }}
                  className="rounded-[1.6rem] border border-prerna-blue/10 bg-white p-6 shadow-[0_20px_45px_rgba(0,63,157,0.08)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(135deg,#0066FF,#FF8800)] font-heading text-xl font-bold text-white">
                      {name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading text-xl text-slate-900">{name}</h3>
                      <p className="text-sm text-slate-600">{location}</p>
                      <small className="text-sm text-slate-500">{role}</small>
                    </div>
                  </div>
                  <p className="mt-5 font-semibold tracking-[0.16em] text-prerna-orange">★★★★★</p>
                  <p className="mt-4 italic leading-7 text-slate-600">"{quote}"</p>
                  <span className="mt-5 inline-flex rounded-full bg-prerna-blue-light px-3 py-2 text-sm font-semibold text-prerna-blue">
                    Verified Parent
                  </span>
                </MotionArticle>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 rounded-[1.6rem] border border-prerna-blue/10 bg-prerna-blue-light/50 p-4 text-center text-sm font-semibold text-prerna-blue-dark">
              <span>4.8/5 average rating from 1,200+ reviews</span>
              <span>Featured on Times of India, Economic Times, YourStory</span>
              <span>Recommended by child psychologists and pediatricians</span>
            </div>
          </div>
        </Section>

        <Section className="bg-[linear-gradient(180deg,#ffffff_0%,#edf4ff_100%)] py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{copy.comparisonHeadline}</h2>
            <div className="mt-12 overflow-hidden rounded-[1.8rem] border border-prerna-blue/12 bg-white shadow-[0_20px_45px_rgba(0,63,157,0.08)]">
              <div className="hidden grid-cols-[1.5fr_1fr_1fr] gap-4 bg-[linear-gradient(135deg,#0066FF,#FF8800)] px-5 py-4 font-heading text-sm font-bold text-white md:grid">
                <span>Feature</span>
                <span>Apni Prerna</span>
                <span>Other Apps</span>
              </div>
              {comparisonRows.map(([feature, ours, others]) => (
                <div key={feature} className="grid gap-3 border-t border-slate-200 px-5 py-4 md:grid-cols-[1.5fr_1fr_1fr] md:items-center">
                  <span className="font-semibold text-slate-900">{feature}</span>
                  <span className="font-semibold text-emerald-600">{ours}</span>
                  <span className="text-rose-500">{others}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a className={primaryButtonClass} href="#trial-form" onClick={() => trackEvent('cta_click', 'comparison')}>
                Try Risk-Free for 14 Days
              </a>
            </div>
          </div>
        </Section>

        <Section id="pricing" className="bg-white py-16 md:py-24">
          <div className="mx-auto w-[min(1200px,calc(100%-2rem))]">
            <h2 className="text-center font-heading text-3xl leading-tight md:text-5xl">{copy.pricingHeadline}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-8 text-slate-600">{copy.pricingSubheadline}</p>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <MotionArticle
                  key={plan.name}
                  whileHover={{ y: -6 }}
                  className={`rounded-[1.7rem] border-t-[5px] p-6 shadow-[0_20px_45px_rgba(0,63,157,0.08)] ${
                    plan.featured
                      ? 'scale-100 border-prerna-orange bg-[linear-gradient(180deg,#fffaf3,#ffffff)] lg:scale-[1.03]'
                      : 'border-prerna-blue bg-white'
                  }`}
                >
                  {plan.badge ? (
                    <span className={`inline-flex rounded-full px-3 py-2 text-sm font-semibold ${plan.featured ? 'bg-prerna-blue text-white' : 'bg-prerna-blue-light text-prerna-blue'}`}>
                      {plan.badge}
                    </span>
                  ) : null}
                  <h3 className="mt-5 font-heading text-2xl text-slate-900">{plan.name}</h3>
                  <div className="mt-5 flex items-end gap-2">
                    <strong className="font-heading text-5xl text-slate-950">{plan.price}</strong>
                    <span className="pb-2 text-slate-600">{plan.cadence}</span>
                  </div>
                  {plan.original ? <p className="mt-2 text-slate-500 line-through">{plan.original}</p> : null}
                  <p className="mt-2 text-slate-600">{plan.billed}</p>
                  {plan.save ? (
                    <span className="mt-4 inline-flex rounded-full bg-prerna-orange px-3 py-2 text-sm font-semibold text-white">{plan.save}</span>
                  ) : null}
                  <ul className="mt-6 space-y-3 text-slate-700">
                    {plan.features.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <a className={`mt-8 w-full ${plan.featured ? primaryButtonClass : secondaryButtonClass}`} href="#trial-form">
                    {copy.navCta}
                  </a>
                </MotionArticle>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-slate-500">Visa | Mastercard | RuPay | UPI | Paytm | PhonePe</p>
          </div>
        </Section>

        <Section id="faq" className="bg-slate-50 py-16 md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="font-heading text-3xl leading-tight md:text-5xl">{copy.faqHeadline}</h2>
              <input
                aria-label={copy.faqSearch}
                className="mt-6 w-full rounded-2xl border border-prerna-blue/16 bg-white px-4 py-4 text-slate-900 shadow-[0_12px_28px_rgba(0,63,157,0.06)] outline-none ring-0 placeholder:text-slate-400 focus:border-prerna-blue"
                placeholder={copy.faqSearch}
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
                      onClick={() => setActiveFaq(expanded ? -1 : index)}
                    >
                      <span>{question}</span>
                      <span className="text-2xl">{expanded ? '−' : '+'}</span>
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

        <Section id="demo" className="bg-[linear-gradient(135deg,#0066FF,#FF8800)] py-16 text-white md:py-24">
          <div className="mx-auto grid w-[min(1200px,calc(100%-2rem))] gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <h2 className="font-heading text-4xl leading-tight md:text-6xl">{copy.finalHeadline}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">{copy.finalSubheadline}</p>
              <p className="mt-6 inline-flex rounded-full bg-white/14 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
                {copy.urgency}
              </p>
            </div>

            <div id="trial-form" className="rounded-[1.8rem] bg-white/96 p-6 text-slate-900 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <label htmlFor="email" className="font-heading text-base text-slate-900">
                  {copy.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={copy.emailPlaceholder}
                  value={email}
                  onFocus={() => trackEvent('trial_form_started', 'email-focus')}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (formState.error || formState.success) {
                      setFormState({ error: '', success: '' })
                    }
                  }}
                  className="rounded-2xl border border-prerna-blue/16 px-4 py-4 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-prerna-blue"
                />
                <MotionButton whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`${primaryButtonClass} w-full min-h-14 text-base`} type="submit">
                  {copy.trialLarge}
                </MotionButton>
                <p className="text-sm text-slate-500">No credit card required | Cancel anytime | 30-day money-back guarantee | Setup in 2 minutes</p>
                {formState.error ? <p className="text-sm font-semibold text-rose-700">{formState.error}</p> : null}
                {formState.success ? <p className="text-sm font-semibold text-emerald-700">{formState.success}</p> : null}
              </form>

              <a className={`mt-4 w-full ${secondaryButtonClass}`} href="#footer">
                {copy.scheduleDemo}
              </a>
              <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-prerna-blue">
                {['256-bit SSL Encryption', 'GDPR Compliant', 'Made in India', 'Featured on Times of India'].map((item) => (
                  <span key={item} className="rounded-full bg-prerna-blue-light px-3 py-2">
                    {item}
                  </span>
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
            <p className="mt-4">{copy.footerTagline}</p>
            <p className="mt-2 text-white/70">Part of Apni Pathshala network</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading text-lg text-white">Product</h4>
            <a className="block transition hover:text-prerna-orange" href="#features">
              Features
            </a>
            <a className="block transition hover:text-prerna-orange" href="#how-it-works">
              How It Works
            </a>
            <a className="block transition hover:text-prerna-orange" href="#pricing">
              Pricing
            </a>
            <a className="block transition hover:text-prerna-orange" href="#faq">
              FAQ
            </a>
            <a className="block transition hover:text-prerna-orange" href="#demo">
              Download Apps
            </a>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading text-lg text-white">Support</h4>
            <a className="block transition hover:text-prerna-orange" href="#faq">
              Help Center
            </a>
            <a className="block transition hover:text-prerna-orange" href="#trial-form">
              Contact Us
            </a>
            <a className="block transition hover:text-prerna-orange" href="#trial-form">
              Live Chat
            </a>
            <a className="block transition hover:text-prerna-orange" href="#demo">
              Book Demo Call
            </a>
            <a className="block transition hover:text-prerna-orange" href="#footer">
              Privacy Policy
            </a>
          </div>
          <div className="space-y-3">
            <h4 className="font-heading text-lg text-white">Contact</h4>
            <a className="block transition hover:text-prerna-orange" href="mailto:support@apniprerna.org">
              support@apniprerna.org
            </a>
            <a className="block transition hover:text-prerna-orange" href="tel:+919270185253">
              +91 92701 85253
            </a>
            <a className="block transition hover:text-prerna-orange" href="https://wa.me/919270185253">
              WhatsApp Support
            </a>
            <p>Mumbai, Maharashtra, India</p>
          </div>
        </div>
        <div className="mx-auto mt-8 w-[min(1200px,calc(100%-2rem))] border-t border-white/10 pt-6 text-sm text-white/65">
          © 2026 Apni Prerna. A product of Apni Pathshala. All rights reserved.
        </div>
      </footer>

      <MotionButton
        initial={false}
        animate={{ y: showStickyCta ? 0 : 120, opacity: showStickyCta ? 1 : 0 }}
        transition={{ duration: 0.24 }}
        className="fixed inset-x-4 bottom-4 z-40 inline-flex justify-center rounded-2xl bg-prerna-orange px-6 py-4 font-heading text-base font-semibold text-white shadow-[0_20px_50px_rgba(255,136,0,0.32)] md:hidden"
        onClick={() => {
          trackEvent('cta_click', 'sticky-mobile')
          document.getElementById('trial-form')?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        {copy.stickyCta}
      </MotionButton>

      <MotionButton
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-24 right-4 z-40 rounded-full bg-[linear-gradient(135deg,#0066FF,#0052CC)] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(0,82,204,0.28)]"
        onClick={() => trackEvent('chat_open', 'floating-widget')}
      >
        {copy.chat}
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
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
          >
            <MotionDiv
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              className="relative w-full max-w-xl rounded-[1.8rem] bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.24)]"
            >
              <button
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-2xl text-slate-700"
                onClick={() => setShowExitModal(false)}
                aria-label="Close offer"
              >
                ×
              </button>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-prerna-blue-dark">Limited-time offer</p>
              <h2 id="exit-title" className="mt-4 font-heading text-3xl text-slate-950">
                {copy.exitHeadline}
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{copy.exitBody}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a className={primaryButtonClass} href="#trial-form" onClick={() => setShowExitModal(false)}>
                  {copy.claimOffer}
                </a>
                <button className={secondaryButtonClass} onClick={() => setShowExitModal(false)}>
                  {copy.closeOffer}
                </button>
              </div>
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default App
