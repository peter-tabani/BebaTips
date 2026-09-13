import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PremiumExperience from "@/components/PremiumExperience";

export const metadata: Metadata = {
  title: "Premium Tips — Local & International Plans",
  description:
    "Review BebaTips daily, weekly, monthly and yearly football analysis plans for Kenya and international readers.",
};

export default function PremiumPage() {
  return (
    <PageLayout>
      <PremiumExperience />
    </PageLayout>
  );
}
