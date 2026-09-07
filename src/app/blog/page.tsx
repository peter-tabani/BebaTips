import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import AdBanner from "@/components/AdBanner";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Betting Blog — Tips, Strategy & Guides",
  description: "Football betting guides, jackpot strategies, and Premier League previews.",
};

export default function BlogPage() {
  return (
    <PageLayout>
      <div className="mb-4">
        <h1 className="section-title">Betting Blog</h1>
        <p className="mt-1 text-sm text-gray-500">
          Guides, strategies, and match previews for smarter betting.
        </p>
      </div>

      <AdBanner slot="blog-top" format="leaderboard" className="mb-4" />

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="rounded bg-brand-green/10 px-2 py-0.5 font-semibold text-brand-green">
                {post.category}
              </span>
              <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span>· {post.readTime} read</span>
            </div>
            <h2 className="mt-2 text-lg font-bold text-gray-800">
              <Link href={`/blog/${post.slug}`} className="hover:text-brand-green">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-sm font-semibold text-brand-green hover:underline"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
