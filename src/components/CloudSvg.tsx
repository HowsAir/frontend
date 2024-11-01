interface CloudSvgProps {
    color: string;
}

export function CloudSvg ({ color }: CloudSvgProps) {
    const colorHex = color === 'primary' ? '#1074E7' : '#F5F5F5';

    return (
        <svg className="w-10"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="-20 0 520 500"
            style={{ background: 'new 0 0 500 500' }}
            xmlSpace="preserve"
        >
            <style type="text/css">
                {`.st0 { opacity: 0.98; fill: transparent; stroke: ${colorHex}; stroke-width: 35; stroke-miterlimit: 10; }`}
            </style>
            <path
                className="st0"
                d="M399.68,234.34h-7.51c1.22-6.84,1.89-13.86,1.89-21.05c0-65.86-53.39-119.25-119.25-119.25
                c-59.4,0-108.63,43.43-117.73,100.27h-36.76c-58.2,0-105.82,47.62-105.82,105.82v0c0,58.2,47.62,105.82,105.82,105.82h82.65h159.94
                h36.77c47.19,0,85.81-38.61,85.81-85.81v0C485.49,272.95,446.88,234.34,399.68,234.34z"
            />
        </svg>
    );
};