import PageLayout from "@/components/PageLayout";

export default function PrivacyPage() {
  return (
    <PageLayout showSidebars={false}>
      <div className="mx-auto max-w-2xl rounded bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Privacy Policy</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
          <p>
            BebaTips respects your privacy. We collect your phone number only when you purchase
            premium tips, solely for SMS delivery. We do not sell personal data to third parties.
          </p>
          <p>
            We use cookies for analytics and advertising (Google AdSense and similar providers).
            You can accept or decline cookies via the banner at the bottom of the page.
          </p>
          <p>
            For questions, contact us via WhatsApp or email at support@bebatips.com.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
