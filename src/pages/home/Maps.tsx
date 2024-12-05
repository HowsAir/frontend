import { useState } from "react";
import { GasInfoPopUp } from "../../components/widgets/GasInfoPopUp";

const Maps = () => {
    const [gasInfoPopUp, setGasInfoPopUp] = useState<boolean>(false);

    const toggleGasInfoPopUp = () => {
        setGasInfoPopUp(!gasInfoPopUp);
    }

    return (
        <div className="w-fit mx-auto text-center">
            <h2 className="w-full">Mapas</h2>
            <p>Lo siento, todavia estamos trabajando en esto...</p>
            <img className="mt-8 mx-auto size-96" src="https://media0.giphy.com/media/H1dxi6xdh4NGQCZSvz/200w.gif?cid=6c09b9520oljohov3k5p47xyfvxcsv4qr30gyahx5ky7gwp7&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="Gato trabajando"></img>
            <button onClick={toggleGasInfoPopUp} className="btn-primary mt-8">Ver información de gases</button>
            {gasInfoPopUp && <GasInfoPopUp togglePopup={toggleGasInfoPopUp} />}
        </div>
    );
};

export default Maps;
