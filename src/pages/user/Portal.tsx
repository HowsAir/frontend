import { Link } from 'react-router-dom';
import { routes } from '../../routes/routes';
import { useUser } from '../../contexts/UserContext';
import { MeasureCard } from '../../components/widgets/MeasureCard';

const Portal = () => {
    const { user } = useUser();
    return (
        <div className="mx-auto w-fit lg:w-full lg:px-24">
            <h3 className="w-full">
                Bienvenide a tu portal, {user ? user.name : ''}
            </h3>

            <div className="mt-12 grid grid-cols-6 gap-20">
                <div className="col-span-4">
                    <div className="mb-6 flex items-center gap-4">
                        <h3 className="text-4xl font-medium">Mapa general</h3>
                        <Link
                            className="mb-1 text-2xl font-normal text-primary underline"
                            to={routes.HOME.MAPS}
                        >{`Más información >`}</Link>
                    </div>
                    <div className="h-[85%] rounded-lg border-[1px] border-gray bg-white p-8 text-center">
                        <div className="h-full rounded-lg bg-green-200">
                            <p className="m-auto">Mapa</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="mb-6 flex items-center gap-4">
                        <h3 className="text-4xl font-medium">Tu nodo</h3>
                        <Link
                            className="mb-1 text-2xl font-normal text-primary underline"
                            to={routes.USER.NODE}
                        >{`Más mapas >`}</Link>
                    </div>
                    <div className="flex flex-col gap-6">
                        <MeasureCard
                            value={2}
                            type="ppm"
                            date="Ayer"
                            title="Ultima medición"
                            slider
                            average={"Buena"}
                        />
                        <MeasureCard
                            value={100}
                            type="m"
                            date="Hola"
                            title="Recorrido"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portal;
