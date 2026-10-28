/** PolicyHawk shield logo used in header and footer. */

export function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2.8 20 6v5.4c0 5.2-3.4 8.4-8 10.3-4.6-1.9-8-5.1-8-10.3V6l8-3.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m8.1 12.1 2.4 2.4 5.1-5.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
