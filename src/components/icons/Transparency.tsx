import type { SVGProps } from 'react';

const SvgTransparency = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={800}
        height={800}
        viewBox="0 0 24 24"
        fill="currentColor" // Use currentColor here
        stroke="currentColor" // Use currentColor here
        {...props}
    >
        <g
            fill="none"
            fillRule="evenodd"
            stroke="currentColor"
            strokeWidth={1.5}
        >
            <path d="M18.5 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM6 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m13 20.5 3-2.5v-3c0-1.733 1-3 2.5-3s2.5 1.267 2.5 3v7M12 17.5 9 15v-2c0-1.733-1-3-2.5-3S4 11.267 4 13v9"
            />
        </g>
    </svg>
);

export default SvgTransparency;
