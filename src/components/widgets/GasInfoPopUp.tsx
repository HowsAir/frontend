interface GasInfoPopUpProps {
    togglePopup: () => void;
}

export const GasInfoPopUp = ({ togglePopup }: GasInfoPopUpProps) => {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative mx-24 h-fit w-[70%] rounded-lg bg-offwhite px-12 py-8 mt-20">
                <h2 className="w-full text-center text-3xl mb-4">
                    Contaminantes y consejos
                </h2>
                <button
                    onClick={togglePopup}
                    className="absolute right-8 top-8"
                >
                    <img
                        className="text-4xl"
                        src="../../../public/icons/close.svg"
                    ></img>
                </button>
                <div className="h-fit w-full rounded-lg bg-white p-8">
                    <table className="w-full">
                        <thead>
                            <th className="pb-4"></th>
                            <th className="pb-4">Dióxido de Nitrógeno (NO2)</th>
                            <th className="pb-4">Ozono (O3)</th>
                            <th className="pb-4">Monóxido de carbono (CO)</th>
                        </thead>
                        <tbody>
                            <tr className="text-left font-light">
                                <td className="border-r-2 border-gray pr-4">
                                    <img
                                        className="w-24"
                                        alt="Origen"
                                        src="../../../public/icons/factory.svg"
                                    />
                                </td>
                                <td className="border-r-2 border-gray px-4">
                                    <span className="font-medium">Origen:</span>{' '}
                                    Tráfico y combustibles fósiles.
                                </td>
                                <td className="border-r-2 border-gray px-4">
                                    <span className="font-medium">Origen:</span>{' '}
                                    vehículos, fábricas tras reaccionar con la
                                    luz del sol.
                                </td>
                                <td className="px-4">
                                    <span className="font-medium">Origen:</span>{' '}
                                    Calefacción y combustión de gasolina y
                                    diesel.
                                </td>
                            </tr>
                            <tr className="text-left font-light">
                                <td className="border-r-2 border-gray pr-4">
                                    <img
                                        className="w-24"
                                        alt="Efectos"
                                        src="../../../public/icons/effects.svg"
                                    />
                                </td>
                                <td className="border-r-2 border-gray px-4">
                                    <span className="font-medium">
                                        Efectos:
                                    </span>{' '}
                                    Irrita las vías respiratorias, reduce
                                    función pulmonar.
                                </td>
                                <td className="border-r-2 border-gray px-4">
                                    <span className="font-medium">
                                        Efectos:
                                    </span>{' '}
                                    Dificultad para respirar, agrava el asma.
                                </td>
                                <td className="px-4 py-2">
                                    <span className="font-medium">
                                        Efectos:
                                    </span>{' '}
                                    Mareos, fatiga; peligro en alta exposición
                                </td>
                            </tr>
                            <tr className="text-left font-light">
                                <td className="border-r-2 border-gray pr-4">
                                    <img
                                        className="w-24"
                                        alt="Consejo"
                                        src="../../../public/icons/tip-icon.svg"
                                    />
                                </td>
                                <td className="border-r-2 border-gray px-4 py-2">
                                    <span className="font-medium">Tip:</span>{' '}
                                    Mantén ventanas cerradas en horas pico.
                                </td>
                                <td className="border-r-2 border-gray px-4 py-2">
                                    <span className="font-medium">Tip:</span>{' '}
                                    Evita actividades al aire libre de 10:00 a
                                    17:00.
                                </td>
                                <td className="px-4 py-2">
                                    <span className="font-medium">Tip:</span>{' '}
                                    Evita motores encendidos en espacios
                                    cerrados.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-8 mb-2 font-medium">Consejos generales</p>
                    <ul className="list-disc marker:text-primary grid grid-cols-2 w-1/2 mx-auto gap-2 text-left font-light">
                        <li className="w-fit">Usa purificadores en casa</li>
                        <li className="w-fit">Ventila temprano o tarde</li>
                        <li className="w-fit">Opta por rutas con menos tráfico</li>
                        <li className="w-fit">Usa mascarrila en zonas de mucha contaminación</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
