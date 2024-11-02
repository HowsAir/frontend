import CompromisoAmbiental from './icons/EnvCommitment';
import Transparencia from './icons/Transparency';
import Colaboracion from './icons/Collaboration';

interface ValueCardProps {
    children: React.ReactNode;
    title: string;
}

const iconMapping: Record<string, React.ElementType> = {
    'Compromiso ambiental': CompromisoAmbiental,
    'Transparencia': Transparencia,
    'Colaboración': Colaboracion,
};


export function ValueCard({ children, title }: ValueCardProps) {
    const IconComponent = iconMapping[title];

    return (
        <div className="bg-white w-[365px] p-6 rounded-2xl">
            <IconComponent className="w-12 h-12 mb-4 text-primary"></IconComponent>
            <p className="font-medium">{title}</p>
            <span className="text-offblack text-xl font-light">{children}</span>
        </div>
    );
}
