import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import { blogPosts } from "@/lib/data";

const ARTICLE_BODY: Record<string, string[]> = {
  "sportpesa-mega-jackpot-guide-2026": [
    "The SportPesa Mega Jackpot is one of the biggest betting prizes in East Africa, regularly exceeding KSH 100 million. To play, you need to correctly predict the outcomes of 17 pre-selected matches.",
    "Our jackpot subscribers receive the full set of picks before the deadline. We analyse home form, away records, injury lists, and historical head-to-head data for each fixture.",
    "A common mistake is picking too many draws. Statistically, roughly 25% of Mega Jackpot games end in a draw — but most casual players pick 5 or more. We typically include 2–3 draw predictions in our full card.",
    "Stake wisely. The minimum bet is KSH 99, but remember the odds of hitting all 17 are extremely long. Treat it as entertainment, not income.",
  ],
  "bankroll-management-kenya": [
    "The number one reason Kenyan punters lose money is not bad tips — it is bad staking. Chasing losses after a bad weekend is the fastest way to empty your M-Pesa.",
    "The flat-stake method works well: decide a fixed amount (say KSH 200) per bet and never increase it after a loss. If you start with KSH 5,000, that gives you 25 bets before you need to reconsider.",
    "For accumulators, reduce your stake. A 10/1 acca should be staked at half your normal single-bet amount because the variance is much higher.",
    "Set a weekly budget on Sunday evening and stick to it. When it is gone, stop until next week. This single habit separates profitable bettors from the rest.",
  ],
  "premier-league-weekend-preview": [
    "This weekend's Premier League fixtures offer strong home-win value. Liverpool at Anfield against Nottingham Forest look solid — Forest have lost 4 of their last 5 away games.",
    "The Manchester derby is always tricky, but City's home record against mid-table sides is exceptional. Over 2.5 goals has landed in 7 of their last 10 home league games.",
    "In the early kickoff, Arsenal host Brighton. Arsenal's defensive record at the Emirates is the best in the league — a home win at odds around 1.65 offers reasonable value.",
    "Check our free tips table for the current list of picks, or choose a premium access plan for additional analysis.",
  ],
  "both-teams-to-score-tips": [
    "BTTS (Both Teams to Score) is one of the most popular markets on Betika and SportPesa, but not every match suits it. High-scoring leagues like the Bundesliga and Eredivisie produce more BTTS winners than Serie A.",
    "Look for matches where both teams have scored in at least 60% of their recent games AND both have conceded in at least 50%. That combination gives you a statistical edge.",
    "Avoid BTTS in games involving the league's best defensive teams — especially when a top side plays at home against a relegation candidate who park the bus.",
    "Our GG picks on BebaTips are filtered through this model. Check today's free tips for matches tagged with 'GG'.",
  ],
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = ARTICLE_BODY[slug] || [post.excerpt];

  return (
    <PageLayout>
      <article className="rounded bg-white p-6 shadow-sm md:p-8">
        <div className="text-xs text-gray-500">
          <Link href="/blog" className="hover:text-brand-green">Blog</Link>
          {" / "}
          <span>{post.category}</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-gray-800 md:text-3xl">{post.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}{post.readTime} read
        </p>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-8 rounded bg-brand-navy p-5 text-center">
          <p className="text-sm text-gray-300">Want today&apos;s picks?</p>
          <Link href="/premium" className="btn-green mt-3 inline-block">
            GET PREMIUM TIPS
          </Link>
        </div>
      </article>
    </PageLayout>
  );
}
