import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2l-8 8H1v11h6v-7h8v7h6V10h-3l-8-8z" />
      <path d="M9 21V11c0-2.8 2.2-5 5-5s5 2.2 5 5v10" />
      <path d="M16 11.5a2.5 2.5 0 01-5 0" />
    </svg>
  );
}
