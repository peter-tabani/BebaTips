import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PremiumExperience from "@/components/PremiumExperience";

export const metadata: Metadata = {
  title: "Premium Tips | Daily, Weekly, Monthly & Yearly",
  description:
    "Review BebaTips daily, weekly, monthly and yearly football tip plans priced in Kenyan shillings.",
};

export default function PremiumPage() {
  return (
    <PageLayout>
      <PremiumExperience />
    </PageLayout>
  );
}
