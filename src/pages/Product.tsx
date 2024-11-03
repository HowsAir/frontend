import { Link } from 'react-router-dom';

const Product = () => {
    return (
        <>
            <div></div>
            <div>
                <h2 className="mb-2">
                    Breeze{' '}
                    <span className="font-normal">
                        - Monitor portátil de calidad del aire
                    </span>
                </h2>
                <label className="text-primary text-[40px]">85€</label>
                <ul className="list-disc list-inside marker:text-primary">
                    <li className="product-detail">
                        <span>Tamaño perfecto</span> de llavero 10x5x5 cm
                    </li>
                    <li className="product-detail">
                        <span>Batería duradera</span> hasta 3 dias de autonomía
                    </li>
                    <li className="product-detail">
                        <span>HowsAir App</span>, con mediciones en tiempo real,
                        recompensas, y más
                    </li>
                </ul>

                <div>
                    <Link to="#" className="btn-secondary px-3">
                        Solícitalo gratis*
                    </Link>

                    <Link to="/register" className="btn-primary">
                        Comprar
                    </Link>
                </div>

                <label>
                    * La solicitud no garantiza la obtención del producto.
                    Debido a las unidades limitadas, seleccionaremos solamente a
                    los usuarios que cumplan con nuestros criterios, incluyendo
                    un máximo de nodos por zona, para los diez primeros
                    solicitantes.
                </label>
            </div>
        </>
    );
};

export default Product;
