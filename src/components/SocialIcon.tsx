type SocialIconProps = {
  name: "X" | "Facebook" | "Instagram" | "TikTok";
  className?: string;
};

export default function SocialIcon({ name, className = "h-5 w-5" }: SocialIconProps) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };

  if (name === "Facebook") {
    return (
      <svg {...commonProps}>
        <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.5V13h2.8v8h3.4Z" />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg {...commonProps}>
        <path d="M14.1 3h3c.2 1.6 1.1 2.9 2.9 3.3v3.1a8.5 8.5 0 0 1-2.9-.7v6.2A6.1 6.1 0 1 1 11 8.8h.9V12a3 3 0 1 0 2.2 2.9V3Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps} viewBox="0 0 24 24">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 15.6 6.4 22H3.2l7.3-8.4L2.8 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.8h1.7L8.2 4.1H6.4l11.4 15.7Z" />
    </svg>
  );
}
