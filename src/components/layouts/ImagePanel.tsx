export function ImagePanel() {
    return (
        <div className="col-span-1 grid grid-cols-5 grid-rows-6 overflow-hidden rounded-2xl border-2 border-gray">
            <img
                className="col-span-5 row-span-5 w-full border-b-2 border-gray bg-white"
                src="https://res.cloudinary.com/dzh6bz0zi/image/upload/v1731012929/media/tje5wbwnff3ql4xxbvwi.png"
                alt="Imagen representada"
            />
            <div className="col-span-5 row-span-1 grid grid-cols-5 grid-rows-1 gap-2">
                <button className="h-full w-full bg-white"></button>
                <button className="h-full w-full bg-white"></button>
                <button className="h-full w-full bg-white"></button>
                <button className="h-full w-full bg-white"></button>
                <button className="h-full w-full bg-white"></button>
            </div>
        </div>
    );
}
