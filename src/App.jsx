import {
  AlertTriangle,
  BellRing,
  ChartColumn,
  Clock3,
  GlobeLock,
  LaptopMinimal,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
} from 'lucide-react'

const riskCards = [
  {
    icon: AlertTriangle,
    title: 'Harmful websites',
    text: 'Adult content, unsafe links, gambling pages, and malware sites can appear without warning.',
  },
  {
    icon: TriangleAlert,
    title: 'Online distractions',
    text: "Games and entertainment platforms can quietly consume your child's learning time.",
  },
  {
    icon: ShieldAlert,
    title: 'Unsafe downloads',
    text: 'Suspicious files and unwanted software can damage devices and create security risks.',
  },
]

const featureCards = [
  {
    icon: ShieldCheck,
    title: 'Harmful website blocking',
    text: 'Blocks adult content, unsafe links, malware pages, and risky downloads before they open.',
  },
  {
    icon: Clock3,
    title: 'Distraction control',
    text: 'Keeps study hours focused by limiting access to games and entertainment sites.',
  },
  {
    icon: BellRing,
    title: 'Real-time alerts',
    text: 'Sends quick alerts when risky browsing or suspicious activity is detected.',
  },
  {
    icon: ChartColumn,
    title: 'Weekly parent reports',
    text: 'Shows browsing trends, learning time, and safety summaries in one place.',
  },
]

const blocklistItems = [
  ['Adult websites', 'Blocked'],
  ['Gambling', 'Blocked'],
  ['Malware sites', 'Blocked'],
  ['Unsafe downloads', 'Blocked'],
  ['Learning websites', 'Allowed'],
]

const alertItems = [
  {
    icon: ShieldAlert,
    title: 'Unsafe website blocked',
    time: '2 min ago',
  },
  {
    icon: TriangleAlert,
    title: 'Suspicious download prevented',
    time: '16 min ago',
  },
  {
    icon: BellRing,
    title: 'Study mode active',
    time: 'Today, 4:00 PM',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create an account',
    text: 'Sign up and choose the plan that fits your family.',
  },
  {
    number: '02',
    title: "Install on your child's computer",
    text: 'A quick install starts protection and monitoring.',
  },
  {
    number: '03',
    title: 'Monitor and protect automatically',
    text: 'Apni Prerna works in the background and sends clear parent updates.',
  },
]

function SectionHeading({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={`space-y-3 ${align === 'center' ? 'text-center' : ''}`}>
      {eyebrow ? <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-prerna-blue">{eyebrow}</p> : null}
      <h2 className="font-heading text-[1.8rem] leading-[1.12] text-slate-950 sm:text-[2.2rem] lg:text-[2.7rem]">{title}</h2>
      <p className="text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">{body}</p>
    </div>
  )
}

function App() {
  return (
    <div id="top" className="min-h-screen bg-prerna-page text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <section className="overflow-hidden rounded-[2rem] border border-prerna-blue/10 bg-white px-5 pb-7 pt-6 shadow-prerna-soft sm:px-7 sm:pb-10 lg:px-10 lg:pb-12 lg:pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-prerna-blue text-white shadow-prerna-button">
                <Shield className="h-5 w-5" />
              </div>
              <p className="font-heading text-base text-slate-950">Apni Prerna</p>
            </div>
            <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 lg:flex">
              <a href="#features" className="transition hover:text-prerna-blue">
                Features
              </a>
              <a href="#dashboard" className="transition hover:text-prerna-blue">
                Dashboard
              </a>
              <a href="#get-started" className="transition hover:text-prerna-blue">
                Get Started
              </a>
            </nav>
            <a
              href="#get-started"
              className="rounded-full bg-prerna-orange px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-prerna-orange-dark"
            >
              Start Subscription
            </a>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-prerna-blue">Safe Digital Learning</p>
              <h1 className="mt-3 font-heading text-[2.2rem] leading-[1.04] text-slate-950 sm:text-[3rem] lg:text-[4.5rem]">
                Protect Your Child in the <span className="text-prerna-blue">Digital World</span>
              </h1>
              <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7 lg:max-w-xl">
                Apni Prerna helps parents block harmful websites, reduce distractions, and support safer computer use every day.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a
                  href="#get-started"
                  className="rounded-2xl bg-prerna-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(255,136,0,0.24)] transition hover:bg-prerna-orange-dark"
                >
                  Start Protecting My Child
                </a>
                <a
                  href="#features"
                  className="rounded-2xl border border-prerna-blue/20 bg-white px-5 py-3 text-sm font-semibold text-prerna-blue transition hover:bg-prerna-blue hover:text-white"
                >
                  See Features
                </a>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-600 lg:justify-start">
                {['Student protection', 'Safer browsing', 'Parent visibility'].map((item) => (
                  <span key={item} className="rounded-full bg-prerna-blue-light px-3 py-2 text-prerna-blue">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Protection</p>
                  <p className="mt-1 font-heading text-lg text-slate-950">Harmful sites blocked</p>
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Focus</p>
                  <p className="mt-1 font-heading text-lg text-slate-950">Study time protected</p>
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500">Reports</p>
                  <p className="mt-1 font-heading text-lg text-slate-950">Clear parent updates</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-10 top-4 h-32 rounded-full bg-prerna-blue/12 blur-3xl" />
              <div className="relative rounded-[2rem] bg-[linear-gradient(180deg,#eff5ff_0%,#ffffff_58%,#fff3e6_100%)] p-3 shadow-prerna-soft sm:p-5">
                <div className="rounded-[1.6rem] border border-white/70 bg-white p-2 shadow-[0_20px_40px_rgba(15,23,42,0.1)]">
                  <img
                    src="/main-dashboard.png"
                    alt="Apni Prerna parent dashboard preview"
                    className="w-full rounded-[1.2rem] object-cover"
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.3rem] bg-prerna-blue px-4 py-4 text-white shadow-prerna-button">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">This week</p>
                    <p className="mt-2 font-heading text-2xl">16 sites blocked</p>
                  </div>
                  <div className="rounded-[1.3rem] border border-prerna-orange/20 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Parent view</p>
                    <p className="mt-2 font-heading text-2xl text-slate-950">92% safety score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-slate-950 p-5 text-white shadow-prerna-soft sm:p-6">
            <SectionHeading
              title="The Internet Is Not Always Safe for Children"
              body="Children can quickly run into harmful content, distractions, and unsafe downloads while using a computer."
            />

            <div className="mt-5 grid gap-3">
              {riskCards.map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-2xl bg-prerna-orange/15 p-2 text-prerna-orange">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-white/70">{item.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="features" className="rounded-[2rem] bg-white p-5 shadow-prerna-soft sm:p-6">
            <SectionHeading
              eyebrow="Key Features"
              title="How Apni Prerna Protects Daily Device Use"
              body="Clear controls and clear information help parents create a safer, more focused digital environment."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {featureCards.map((item, index) => (
                <article key={item.title} className="rounded-[1.45rem] border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                  <div className="flex gap-3">
                    <div className="rounded-2xl bg-prerna-blue-light p-2.5 text-prerna-blue">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="rounded-full bg-prerna-orange-light px-2 py-1 text-[10px] font-bold tracking-[0.16em] text-prerna-orange-dark">
                        0{index + 1}
                      </span>
                      <h3 className="mt-2 font-heading text-base leading-5 text-slate-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="dashboard" className="mt-6 grid gap-6 xl:grid-cols-[1.03fr_0.97fr]">
          <div className="rounded-[2rem] bg-white p-5 shadow-prerna-soft sm:p-6">
            <SectionHeading
              title="Smart Website Protection"
              body="Apni Prerna blocks unsafe categories automatically while keeping school and learning resources available."
            />

            <div className="mt-5 rounded-[1.6rem] bg-slate-950 p-4 text-white sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-base">Live Protection</p>
                  <p className="text-xs text-white/65">Category-based filtering</p>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">Active</div>
              </div>

              <div className="mt-4 grid gap-2">
                {blocklistItems.map(([label, status]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-white/6 px-3 py-3">
                    <span className="text-sm text-white/84">{label}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        status === 'Allowed' ? 'bg-emerald-300/15 text-emerald-300' : 'bg-rose-300/15 text-rose-200'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-prerna-soft sm:p-6">
            <SectionHeading
              title="Parent Dashboard Visibility"
              body="Use the parent dashboard to check alerts, blocked websites, device status, and weekly summaries without complexity."
            />

            <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-50 p-3">
              <img
                src="/main-dashboard.png"
                alt="Parent dashboard showing child safety activity"
                className="w-full rounded-[1.2rem] border border-slate-200"
              />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-white p-5 shadow-prerna-soft sm:p-6">
            <SectionHeading
              title="Weekly Parent Safety Reports"
              body="Clear summaries help parents understand what was blocked, where focus improved, and when extra support is needed."
            />

            <div className="mt-5 rounded-[1.6rem] bg-prerna-blue px-4 py-4 text-white shadow-prerna-button">
              <p className="text-sm font-semibold">Weekly protection summary available now</p>
              <p className="mt-1 text-xs text-white/75">Updated every Sunday with device activity and safety highlights.</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Blocked Sites</p>
                <p className="mt-2 font-heading text-2xl text-slate-950">16</p>
              </div>
              <div className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Safety Score</p>
                <p className="mt-2 font-heading text-2xl text-emerald-600">92%</p>
              </div>
              <div className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Study Hours</p>
                <p className="mt-2 font-heading text-2xl text-slate-950">21h</p>
              </div>
              <div className="rounded-[1.3rem] border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Alerts</p>
                <p className="mt-2 font-heading text-2xl text-prerna-orange">4</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-prerna-soft sm:p-6">
            <SectionHeading
              title="Real-Time Safety Alerts"
              body="If risky activity happens online, parents receive a quick alert and can respond immediately."
            />

            <div className="mt-5 space-y-3">
              {alertItems.map((item) => (
                <article key={item.title} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-prerna-orange-light p-2.5 text-prerna-orange">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-base text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-white p-5 shadow-prerna-soft sm:p-6">
            <SectionHeading
              title="Protected Search Mode"
              body="Search filtering helps children avoid explicit results while keeping browsing safer for learning."
            />

            <div className="mt-5 rounded-[1.6rem] bg-[linear-gradient(180deg,#edf4ff_0%,#ffffff_100%)] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-prerna-blue p-2.5 text-white">
                  <GlobeLock className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-heading text-base text-slate-950">Search safety is on</p>
                  <p className="text-xs text-slate-500">Google, YouTube, and web search filtering enabled</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Explicit search filtering', 'Safer video results', 'Learning-first browsing'].map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-prerna-blue shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div id="get-started" className="rounded-[2rem] bg-white p-5 shadow-prerna-soft sm:p-6">
            <SectionHeading
              title="Get Started in 3 Simple Steps"
              body="Setup is quick, parent-friendly, and designed to start protection without technical complexity."
            />

            <div className="mt-5 grid gap-3">
              {steps.map((item) => (
                <article key={item.number} className="rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-prerna-blue font-heading text-sm text-white">
                      {item.number}
                    </div>
                    <div>
                      <h3 className="font-heading text-base text-slate-950">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="#top"
                className="rounded-2xl bg-prerna-orange px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-prerna-orange-dark"
              >
                Start Subscription
              </a>
              <a
                href="#features"
                className="rounded-2xl border border-prerna-blue/15 bg-white px-4 py-3 text-center text-sm font-semibold text-prerna-blue transition hover:bg-prerna-blue hover:text-white"
              >
                Explore Features
              </a>
            </div>
          </div>
        </section>

        <footer className="px-2 py-6 text-center text-xs text-slate-500 sm:py-8">
          <p className="font-semibold text-slate-700">Apni Prerna</p>
          <p className="mt-1">Safer digital experiences for children, guided by parents.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
