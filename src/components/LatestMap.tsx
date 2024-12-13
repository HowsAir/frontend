import { useEffect, useRef, useState } from 'react';
import { GasInfoPopUp } from './widgets/GasInfoPopUp';
import { getCurrentAirQualityMap } from '../api/apiClient';

interface LatestMapProps {
    portal?: boolean;
}

export const LatestMap = (portal: LatestMapProps) => {
    const [gasInfoPopUp, setGasInfoPopUp] = useState<boolean>(false);
    const [htmlContent, setHtmlContent] = useState('');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const toggleGasInfoPopUp = () => {
        setGasInfoPopUp(!gasInfoPopUp);
    };

    useEffect(() => {
        const fetchAirQualityMap = async () => {
            try {
                // Fetch the map URL using the API method
                const airQualityMap = await getCurrentAirQualityMap();

                // Fetch the HTML content of the map URL
                const response = await fetch(airQualityMap.url);
                if (!response.ok) {
                    throw new Error(
                        `Error fetching HTML: ${response.statusText}`
                    );
                }
                const html = await response.text();
                setHtmlContent(html);
            } catch (error) {
                console.error('Failed to fetch air quality map:', error);
            }
        };

        fetchAirQualityMap();
    }, []); // No dependencies, runs once on mount

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
            <div
                className={`${portal ? 'h-[55dvh]' : ''} relative h-[75dvh] w-full rounded-lg border-[1px] border-gray bg-white p-2`}
            >
                <iframe
                    ref={iframeRef}
                    title="Dynamic HTML"
                    className={`mb-0 h-full w-full border-0 rounded-md`}
                />

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
