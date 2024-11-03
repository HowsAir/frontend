export function ImagePanel() {
    return (
        <div className="col-span-1 grid grid-cols-5 grid-rows-6 rounded-2xl overflow-hidden border-2 border-gray">
            <img
                className="w-full col-span-5 row-span-5 bg-white border-gray border-b-2"
                src="../public/breezePic.png"
                alt=""
            />
            <div className="col-span-5 row-span-1 grid grid-cols-5 grid-rows-1 gap-2">
                <button className="img-btn">a</button>
                <button className="img-btn"></button>
                <button className="img-btn"></button>
                <button className="img-btn"></button>
                <button className="img-btn"></button>
            </div>
        </div>
    );
}
