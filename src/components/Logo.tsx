import { Link } from "react-router-dom";
import { CloudSvg } from "./CloudSvg";

interface LogoProps {
    color: 'primary' | 'offwhite';
}

export function Logo({ color }: LogoProps) {
    const colorName = color === 'primary' ? 'primary' : 'offwhite';
    const colorHex = color === 'primary' ? '#1074E7' : '#F5F5F5';

    return (
        <Link to="*" className="flex flex-row h-fit items-center gap-1">
            <CloudSvg color={colorHex} />
            <p className={`text-[32px] text-${colorName}`}>HowsAir</p>
        </Link>
    );
}