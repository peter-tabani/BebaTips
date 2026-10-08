import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Checkout Preview",
  description: "Preview a BebaTips premium football tips access plan.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
