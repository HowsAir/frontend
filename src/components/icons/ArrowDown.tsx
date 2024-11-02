import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        viewBox="4 4 24 24"
        {...props}
    >
        <path fill="" d="M0 0h24v24H0z" />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m0 0 5-5m-5 5-5-5"
        />
    </svg>
);
export default SvgArrowDown;
