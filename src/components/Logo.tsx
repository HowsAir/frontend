import { CloudSvg } from './CloudSvg';

interface LogoProps {
    color: string;
}

export function Logo({color}: LogoProps) {
    const colorName = color === 'primary' ? 'primary' : 'offwhite';

    return (
        <a href="/" className='flex flex-row items-center gap-1'>
            <CloudSvg color={ colorName } />
            <p className={`text-[32px] text-${colorName}`}>HowsAir</p>
        </a>
    );
}