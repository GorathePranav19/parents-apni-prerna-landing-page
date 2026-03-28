import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarDays, Clock3, UserCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { fetchBlogBySlug, fetchBlogs } from '../lib/blogApi.js'

function parseImageParagraph(paragraph) {
  const match = String(paragraph || '').trim().match(/^!\[(.*?)\]\(([^)\s]+)\)$/)
  if (!match) {
    return null
  }

  return {
    alt: match[1]?.trim() || 'Article image',
    src: match[2]?.trim() || '',
  }
}

function ArticleSection({ section }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_14px_30px_rgba(0,20,48,0.07)]">
      {section.heading ? <h2 className="font-heading text-2xl leading-tight text-slate-900">{section.heading}</h2> : null}

      {section.paragraphs
        ? section.paragraphs.map((paragraph, index) => {
            const imageData = parseImageParagraph(paragraph)
            if (imageData) {
              return (
                <figure key={`${imageData.src}-${index}`} className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <img src={imageData.src} alt={imageData.alt} loading="lazy" className="h-auto w-full object-cover" />
                </figure>
              )
            }

            return (
              <p key={`${paragraph}-${index}`} className="mt-4 text-[15px] leading-relaxed text-slate-700">
                {paragraph}
              </p>
            )
          })
        : null}

      {section.list && section.list.length ? (
        section.listType === 'ol' ? (
          <ol className="mt-4 list-inside list-decimal space-y-2 text-[15px] leading-relaxed text-slate-700">
            {section.list.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-slate-700">
            {section.list.map((item, index) => (
              <li key={`${item}-${index}`} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-prerna-blue" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </section>
  )
}

export default function SingleBlogTemplate({ slug: slugProp }) {
  const { slug: slugFromRoute } = useParams()
  const slug = slugProp || slugFromRoute || ''
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadPost() {
      if (!slug) {
        setPost(null)
        setRelatedPosts([])
        setLoading(false)
        return
      }

      try {
        const [currentPost, allPosts] = await Promise.all([fetchBlogBySlug(slug), fetchBlogs()])

        if (!active) {
          return
        }

        setPost(currentPost)
        setRelatedPosts(allPosts.filter((entry) => entry.slug !== slug).slice(0, 2))
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load this blog.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadPost()

    return () => {
      active = false
    }
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-4xl items-center px-4 py-14 sm:px-6">
        <p className="text-sm text-slate-600">Loading article...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-start justify-center px-4 py-14 sm:px-6">
        <h1 className="font-heading text-4xl leading-tight text-slate-900">Unable to load article</h1>
        <p className="mt-3 text-slate-600">{error}</p>
        <Link
          to="/blogs"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-prerna-blue px-5 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-prerna-blue-dark"
        >
          Back to blogs
        </Link>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-start justify-center px-4 py-14 sm:px-6">
        <h1 className="font-heading text-4xl leading-tight text-slate-900">Article not found</h1>
        <Link
          to="/blogs"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-prerna-blue px-5 py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-prerna-blue-dark"
        >
          Back to blogs
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfdff_0%,#f3f8ff_100%)] text-slate-900">
      <article className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link to="/blogs" className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-prerna-blue hover:text-prerna-blue-dark">
          <ArrowLeft className="h-4 w-4" />
          Back to all blogs
        </Link>

        <header className="mt-6 overflow-hidden rounded-3xl border border-white/75 bg-white/85 shadow-[0_20px_56px_rgba(0,34,94,0.12)]">
          <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} className="h-72 w-full object-cover md:h-96" />

          <div className="p-6 md:p-8">
            {post.category ? <p className="font-heading text-xs uppercase tracking-[0.2em] text-prerna-blue">{post.category}</p> : null}
            <h1 className="mt-3 font-heading text-4xl leading-tight md:text-5xl">{post.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
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
          </div>
        </header>

        <div className="mt-8 space-y-5">
          {post.sections.map((section, index) => (
            <ArticleSection key={section.heading || index} section={section} />
          ))}
        </div>

        {post.quote?.text ? (
          <blockquote className="mt-8 rounded-3xl border border-prerna-blue/15 bg-prerna-blue/5 p-7">
            <p className="font-heading text-2xl leading-tight text-slate-900">"{post.quote.text}"</p>
            {post.quote.by ? <cite className="mt-3 block text-sm font-semibold uppercase tracking-[0.1em] text-prerna-blue not-italic">{post.quote.by}</cite> : null}
          </blockquote>
        ) : null}

        {relatedPosts.length ? (
          <section className="mt-12">
            <h2 className="font-heading text-2xl text-slate-900">Related reads</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link key={related.slug} to={`/blogs/${related.slug}`} className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-[0_12px_28px_rgba(0,20,48,0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-prerna-blue">{related.category}</p>
                  <h3 className="mt-2 font-heading text-xl leading-tight text-slate-900">{related.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </div>
  )
}
