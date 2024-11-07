export function ImagePanel() {
    return (
        <div className="col-span-1 grid grid-cols-5 grid-rows-6 rounded-2xl overflow-hidden border-2 border-gray">
            <img
                className="w-full col-span-5 row-span-5 bg-white border-gray border-b-2"
                src="https://res.cloudinary.com/dzh6bz0zi/image/upload/v1731012929/media/tje5wbwnff3ql4xxbvwi.png"
                alt="Imagen representada"
            />
            <div className="col-span-5 row-span-1 grid grid-cols-5 grid-rows-1 gap-2">
                <button className="bg-white w-full h-full"></button>
                <button className="bg-white w-full h-full"></button>
                <button className="bg-white w-full h-full"></button>
                <button className="bg-white w-full h-full"></button>
                <button className="bg-white w-full h-full"></button>
            </div>
        </div>
    );
}
