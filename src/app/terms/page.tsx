import PageLayout from "@/components/PageLayout";

export default function TermsPage() {
  return (
    <PageLayout showSidebars={false}>
      <div className="mx-auto max-w-2xl rounded bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">Terms of Service</h1>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-600">
          <p>
            BebaTips provides football predictions for informational and entertainment purposes.
            We do not guarantee winnings. All betting involves risk.
          </p>
          <p>
            You must be 18 years or older to use this site or purchase premium tips.
            Please gamble responsibly.
          </p>
          <p>
            Premium tip purchases are non-refundable once tips have been delivered via SMS.
            Tips are sent once per day per plan purchased.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
