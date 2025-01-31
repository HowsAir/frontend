interface IconWithColorProps {
    color: string;
}

const IconWithColor = ({ color }: IconWithColorProps) => {
    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 73.312 73.312"
            xmlSpace="preserve"
            fill={color}
            width={26}
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
                    <g>
                        {' '}
                        <g>
                            {' '}
                            <path d="M66.368,20.672c0.224,0,0.224,0,0.447,0l-3.359-12.99c-0.896-3.809-4.929-6.049-8.513-4.929L5.217,15.969 c-3.808,0.896-6.048,4.928-4.928,8.512l4.256,16.128v-9.632c0-5.822,4.704-10.526,10.528-10.526h51.295V20.672z"></path>{' '}
                            <path d="M66.368,24.256h-51.52c-3.808,0-6.943,3.137-6.943,6.944v32.702c0,3.81,3.136,6.944,6.943,6.944h51.52 c3.808,0,6.943-3.137,6.943-6.944V31.202C73.313,27.392,70.176,24.256,66.368,24.256z M68.609,63.905 c0,1.345-1.119,2.239-2.239,2.239H14.85c-1.344,0-2.239-1.119-2.239-2.24v-8.286h56.223v8.286L68.609,63.905L68.609,63.905z M68.609,39.489h-56v-8.287c0-1.345,1.12-2.24,2.239-2.24h51.52c1.345,0,2.239,1.12,2.239,2.24L68.609,39.489L68.609,39.489z"></path>{' '}
                        </g>{' '}
                    </g>{' '}
                </g>{' '}
            </g>
        </svg>
    );
};

export default IconWithColor;
