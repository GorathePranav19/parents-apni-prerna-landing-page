import { useEffect, useState } from 'react'
import { CalendarDays, Clock3, UserCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchBlogs } from '../lib/blogApi.js'

function BlogCard({ post }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/75 bg-white shadow-[0_18px_48px_rgba(0,25,63,0.1)] transition hover:-translate-y-1">
      <img src={post.featuredImage} alt={post.title} className="h-52 w-full object-cover" loading="lazy" />

      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-heading text-2xl leading-tight text-slate-900">{post.title}</h2>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <UserCircle2 className="h-3.5 w-3.5" />
            {post.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {post.publishedAt}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-700">{post.excerpt}</p>

        <Link
          to={`/blogs/${post.slug}`}
          className="mt-6 inline-flex min-h-11 w-fit items-center justify-center rounded-2xl bg-prerna-blue px-5 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-prerna-blue-dark"
        >
          Read
        </Link>
      </div>
    </article>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadBlogs() {
      try {
        const data = await fetchBlogs()
        if (active) {
          setPosts(data)
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load blogs right now.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadBlogs()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfdff_0%,#f3f8ff_100%)] text-slate-900">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-3xl border border-white/70 bg-white/80 p-7 shadow-[0_18px_48px_rgba(0,34,94,0.1)]">
          <p className="font-heading text-xs uppercase tracking-[0.22em] text-prerna-blue">Blogs</p>
          <h1 className="mt-2 font-heading text-4xl leading-tight text-slate-900 md:text-5xl">Apni Prerna Blog</h1>
          <Link
            to="/"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-2xl border border-prerna-blue/20 px-5 py-2.5 font-heading text-sm font-semibold text-prerna-blue transition hover:border-prerna-blue hover:bg-prerna-blue hover:text-white"
          >
            Back to landing page
          </Link>
        </header>

        {loading ? <p className="text-sm text-slate-600">Loading blogs...</p> : null}
        {error ? <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

        {!loading && !error ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id || post.slug} post={post} />
            ))}
          </div>
        ) : null}

        {!loading && !error && posts.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700">No blogs found yet. Seed your database to see cards.</p>
        ) : null}
      </main>
    </div>
  )
}
