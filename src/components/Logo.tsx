import { CloudSvg } from './CloudSvg';

interface LogoProps {
    color: string;
}

export function Logo({color}: LogoProps) {
    const colorName = color === 'blue' ? 'primary' : 'offwhite';

    return (
        <a href="/" className='flex flex-row items-center'>
            <CloudSvg color={ colorName } />
            <p className={`text-[32px] text-${colorName}`}>HowsAir</p>
        </a>
    );
}

export default Logo;