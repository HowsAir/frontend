interface IconWithColorProps {
    color: string;
}

const IconWithColor = ({ color }: IconWithColorProps) => {
    return (
        <svg
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            enable-background="new 0 0 100 100"
            xmlSpace="preserve"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {' '}
                <g>
                    {' '}
                    <path d="M74,29H26c-3.3,0-6,2.7-6,6v29c0,3.3,2.7,6,6,6h48c3.3,0,6-2.7,6-6V35C80,31.7,77.3,29,74,29z M48.6,63H40 h-8.6c-1.9,0-3.4-2.1-3.4-4.1c0.1-3,3.2-4.8,6.5-6.3c2.3-1,2.6-1.9,2.6-2.9c0-1-0.6-1.9-1.4-2.6c-1.3-1.2-2.1-3-2.1-5 c0-3.8,2.3-7,6.3-7s6.3,3.2,6.3,7c0,2-0.7,3.8-2.1,5c-0.8,0.7-1.4,1.6-1.4,2.6c0,1,0.3,1.9,2.6,2.8c3.3,1.4,6.4,3.4,6.5,6.4 C52,60.9,50.5,63,48.6,63z M72,56c0,1.1-0.9,2-2,2h-9c-1.1,0-2-0.9-2-2v-3c0-1.1,0.9-2,2-2h9c1.1,0,2,0.9,2,2V56z M72,45 c0,1.1-0.9,2-2,2H55c-1.1,0-2-0.9-2-2v-3c0-1.1,0.9-2,2-2h15c1.1,0,2,0.9,2,2V45z"></path>{' '}
                </g>{' '}
            </g>
        </svg>
    );
};

export default IconWithColor;
