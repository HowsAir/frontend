import { Link } from 'react-router-dom';
import { ImagePanel } from '../components/ImagePanel';

const Product = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-1 grid-flow-row gap-20 px-28">
            <ImagePanel />
            <div className="col-span-2 flex flex-col">
                <h2 className="mb-2  w-2/3">
                    Breeze
                    <span className="font-normal">
                        - Monitor portátil de calidad del aire
                    </span>
                </h2>
                <label className="text-primary text-[40px] mb-4">85€</label>
                <ul className="list-disc list-inside marker:text-primary space-y-3">
                    <li className="font-light text-xl text-offblack">
                        <span className='text-primary font-normal'>Tamaño perfecto</span> de llavero 10x5x5 cm
                    </li>
                    <li className="font-light text-xl text-offblack">
                        <span className='text-primary font-normal'>Batería duradera</span> hasta 3 dias de autonomía
                    </li>
                    <li className="font-light text-xl text-offblack">
                        <span className='text-primary font-normal'>HowsAir App</span>, con mediciones en tiempo real,
                        recompensas, y más
                    </li>
                </ul>

                <div className="mt-auto mb-2 relative">
                    <div className="flex flex-row gap-4">
                        <Link to="#" className="btn-secondary px-4">
                            Solícitalo gratis*
                        </Link>

                        <Link to="/register" className="btn-primary">
                            Comprar
                        </Link>
                    </div>
                    <label className="text-neutral-500 absolute w-3/4 mt-4 leading-none">
                        * La solicitud no garantiza la obtención del producto.
                        Debido a las unidades limitadas, seleccionaremos
                        solamente a los usuarios que cumplan con nuestros
                        criterios.
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Product;
