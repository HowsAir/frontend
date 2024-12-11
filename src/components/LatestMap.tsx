import { useEffect, useRef, useState } from 'react';
import { GasInfoPopUp } from './widgets/GasInfoPopUp';

interface LatestMapProps {
    portal?: boolean;
}

export const LatestMap = (portal: LatestMapProps) => {
    const [gasInfoPopUp, setGasInfoPopUp] = useState<boolean>(false);

    const toggleGasInfoPopUp = () => {
        setGasInfoPopUp(!gasInfoPopUp);
    };

    const mapUrl =
        'https://res.cloudinary.com/dzh6bz0zi/raw/upload/v1733940950/air_quality_maps/latest.html';

    const [htmlContent, setHtmlContent] = useState('');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const fetchHtml = async () => {
            try {
                const response = await fetch(mapUrl);
                if (!response.ok) {
                    throw new Error(
                        `Error fetching HTML: ${response.statusText}`
                    );
                }
                const html = await response.text();
                setHtmlContent(html);
            } catch (error) {
                console.error('Failed to fetch HTML:', error);
            }
        };

        fetchHtml();
    }, [mapUrl]);

    useEffect(() => {
        if (iframeRef.current && htmlContent) {
            const iframeDoc =
                iframeRef.current?.contentDocument ||
                iframeRef.current?.contentWindow?.document;
            if (iframeDoc) {
                iframeDoc.open();
                iframeDoc.write(htmlContent);
                iframeDoc.close();
            }
        }
    }, [htmlContent]);

    return (
        <>
            <div className="relative w-full rounded-lg border-[1px] border-gray bg-white after:absolute after:bottom-0 after:h-2.5 after:w-full after:rounded-bl-lg after:rounded-br-lg after:bg-white">
                <iframe
                    ref={iframeRef}
                    title="Dynamic HTML"
                    className={`mb-0 ${portal ? 'h-[55dvh]' : 'h-[75dvh]'} w-full border-0`}
                />
                <div className="absolute bottom-4 left-4 flex flex-col gap-1 rounded-md border-[1px] border-gray bg-white px-4 py-2">
                    <p className="text-base">Calidad</p>

                    <div className="inline-flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-green-500" />{' '}
                        <p className="text-sm">Buena</p>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-orange-500" />{' '}
                        <p className="text-sm">Regular</p>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <div className="size-3 rounded-sm bg-red-500" />{' '}
                        <p className="text-sm">Peligrosa</p>
                    </div>
                </div>

                <button className="absolute bottom-20 right-4 rounded-md bg-white p-2 transition-all duration-200 ease-in-out hover:bg-neutral-200">
                    <img src="../../../public/icons/location.svg" />
                </button>
                <button
                    onClick={toggleGasInfoPopUp}
                    className="absolute bottom-4 right-4 flex w-44 items-center gap-2 rounded-md bg-white px-4 py-2 text-right text-base leading-tight text-neutral-400 transition-all duration-200 ease-in-out hover:bg-neutral-200"
                >
                    Conoce los contaminantes
                    <img src="../../../public/icons/help.svg" className="" />
                </button>
            </div>
            {gasInfoPopUp && <GasInfoPopUp togglePopup={toggleGasInfoPopUp} />}
        </>
    );
};
