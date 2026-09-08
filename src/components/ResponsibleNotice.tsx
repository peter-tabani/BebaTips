import Link from "next/link";

export default function ResponsibleNotice() {
  return (
    <div className="bg-[#17202d] px-4 py-2 text-center text-[11px] text-gray-300">
      <span className="font-bold text-white">18+ only.</span>{" "}
      Gambling can be addictive.{" "}
      <Link href="/responsible-gambling" className="font-semibold text-brand-green hover:underline">
        Play responsibly
      </Link>
    </div>
  );
}
