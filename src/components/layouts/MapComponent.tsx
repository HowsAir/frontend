import { useEffect, useRef, useState } from 'react';
import { GasInfoPopUp } from '../widgets/GasInfoPopUp';
import { getCurrentAirQualityMap } from '../../api/apiClient';
import { AirQualityMap } from '../../api/data';

interface MapProps {
    data?: AirQualityMap | null;
    portal?: boolean;
}

export const MapComponent = ({ portal, data }: MapProps) => {
    const [gasInfoPopUp, setGasInfoPopUp] = useState<boolean>(false);
    const [htmlContent, setHtmlContent] = useState('');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const toggleGasInfoPopUp = () => {
        setGasInfoPopUp(!gasInfoPopUp);
    };

    useEffect(() => {
        if (data == null) {
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
                    console.log(html);
                    setHtmlContent(html);
                } catch (error) {
                    console.error('Failed to fetch air quality map:', error);
                }
            };

            fetchAirQualityMap();
        } else {
            const fetchHtmlContent = async () => {
                try {
                    if (data) {
                        const response = await fetch(data.url);
                        if (!response.ok) {
                            throw new Error(
                                `Error fetching HTML: ${response.statusText}`
                            );
                        }
                        const html = await response.text();
                        setHtmlContent(html);
                    }
                } catch (error) {
                    console.error('Failed to fetch HTML content:', error);
                }
            };

            fetchHtmlContent();
        }
    }, [data]); // Dependency on data

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
                className={`${portal ? 'h-[445px]' : 'h-[75dvh]'} relative w-full rounded-lg border-[1px] border-gray bg-white p-2`}
            >
                <iframe
                    ref={iframeRef}
                    title="Dynamic HTML"
                    className={`mb-0 h-full w-full rounded-md border-0`}
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
