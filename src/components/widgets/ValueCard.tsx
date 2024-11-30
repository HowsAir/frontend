import CompromisoAmbiental from '../icons/EnvCommitment';
import Transparencia from '../icons/Transparency';
import Colaboracion from '../icons/Collaboration';

interface ValueCardProps {
    children: React.ReactNode;
    title: string;
}

const iconMapping: Record<string, React.ElementType> = {
    'Compromiso ambiental': CompromisoAmbiental,
    Transparencia: Transparencia,
    Colaboración: Colaboracion,
};

export function ValueCard({ children, title }: ValueCardProps) {
    const IconComponent = iconMapping[title];

    return (
        <div className="rounded-2xl bg-white p-6 sm:w-3/4 lg:w-[365px]">
            <IconComponent className="mb-4 h-12 w-12 text-primary"></IconComponent>
            <p className="font-medium">{title}</p>
            <span className="text-xl font-light text-offblack">{children}</span>
        </div>
    );
}
