import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const Portal = () => {
    return (
        <div className="mx-auto w-fit text-center">
            <h2 className="w-full">Inicio</h2>
            <p>Lo siento, todavia estamos trabajando en esto...</p>
            <img
                className="mx-auto mt-8 size-96"
                src="https://media0.giphy.com/media/H1dxi6xdh4NGQCZSvz/200w.gif?cid=6c09b9520oljohov3k5p47xyfvxcsv4qr30gyahx5ky7gwp7&ep=v1_gifs_search&rid=200w.gif&ct=g"
                alt="Gato trabajando"
            ></img>
            <Link to={routes.USER.NODE} className="btn-primary mt-8">
                Nodo</Link>
                <Link to={routes.HOME.MAPS} className="btn-primary mt-8">Mapas</Link>
        </div>
    );
};

export default Portal;
