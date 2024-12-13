import { useState } from 'react';
import { ImagePanel } from '../../components/layouts/ImagePanel';
import { BuyPopUp } from '../../components/widgets/BuyPopUp';
import { FormPopUp } from '../../components/widgets/FormPopUp';

const Product = () => {
    const [buypopup, setBuyPopup] = useState<boolean>(false);
    const [formpopup, setFormPopup] = useState<boolean>(false);

    const toggleBuyPopup = () => {
        setBuyPopup(!buypopup);
    };

    const toggleFormPopup = () => {
        setFormPopup(!formpopup);
    }

    return (
        <div className="grid grid-flow-row grid-cols-3 grid-rows-1 gap-20 px-28">
            <ImagePanel />
            <div className="col-span-2 flex flex-col">
                <h2 className="mb-2 w-2/3">
                    Breeze
                    <span className="font-normal">
                        - Monitor portátil de calidad del aire
                    </span>
                </h2>
                <label className="mb-4 text-[40px] text-primary">85€</label>
                <ul className="list-inside list-disc space-y-3 marker:text-primary">
                    <li className="text-xl font-light text-offblack">
                        <span className="font-normal text-primary">
                            Tamaño perfecto
                        </span>{' '}
                        de llavero 10x5x5 cm
                    </li>
                    <li className="text-xl font-light text-offblack">
                        <span className="font-normal text-primary">
                            Batería duradera
                        </span>{' '}
                        hasta 3 dias de autonomía
                    </li>
                    <li className="text-xl font-light text-offblack">
                        <span className="font-normal text-primary">
                            HowsAir App
                        </span>
                        , con mediciones en tiempo real, recompensas, y más
                    </li>
                </ul>

                <div className="relative mb-2 mt-auto">
                    <div className="flex flex-row gap-4">
                        <button
                            onClick={toggleFormPopup}
                            className="btn-secondary px-4"
                        >
                            Solícitalo gratis*
                        </button>

                        <button
                            onClick={toggleBuyPopup}
                            className="btn-primary"
                        >
                            Comprar
                        </button>
                    </div>
                    <label className="absolute mt-4 w-3/4 leading-none text-neutral-500">
                        * La solicitud no garantiza la obtención del producto.
                        Debido a las unidades limitadas, seleccionaremos
                        solamente a los usuarios que cumplan con nuestros
                        criterios.
                    </label>
                </div>
            </div>

            {/* PopUps */}
            {buypopup && <BuyPopUp togglePopup={toggleBuyPopup} />}
            {formpopup && <FormPopUp togglePopup={toggleFormPopup} />}
        </div>
    );
};

export default Product;
