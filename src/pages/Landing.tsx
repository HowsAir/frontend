import { ValueCard } from '../components/ValueCard';

const Landing = () => {
    return (
        <>
            <section
                className="relative h-screen w-full bg-cover overflow-hidden"
                style={{ backgroundImage: "url('../../public/landingBg.png')" }}
            >
                <div
                    className="absolute inset-0 bg-[rgba(143,143,143,0.28)]"
                    style={{
                        background:
                            'radial-gradient(circle 600px at 50% 70%, rgba(143, 143, 143, 0.28) 0%, rgba(0, 73, 147, 0.65) 100%)',
                    }}
                />

                <div className="container mx-auto relative pt-60 flex flex-col items-center">
                    <h1>¿Es seguro el aire a tu alrededor?</h1>
                    <p className="hero-p">
                        HowsAir te ayuda a monitorear la calidad del aire en tu
                        entorno.
                    </p>

                    <a className="btn-primary mt-24">Ver mapas</a>
                    <button className="rounded-full w-14 h-14 mt-16 p-2 text-primary text-4xl bg-white bg-opacity-60">
                        V
                    </button>
                </div>
            </section>

            <section className="py-20 mx-auto max-w-[600px] flex flex-col items-center">
                <h2>¿Qué hacemos en HowsAir?</h2>
                <p className="text-center">
                    Desarrollamos mapas de calidad del aire para los ciudadanos
                    gracias a la participación de nuestros fieles portadores de
                    Breeze.
                </p>
            </section>

            <section className="w-fit flex flex-row lg:gap-16 sm:gap-0 py-20 justify-center">
                <img
                    className="lg:w-[400px] sm:w-72 h-fit my-auto lg:static sm:absolute left-4"
                    alt="Vaper Breeze"
                    src="/breezePic.png"
                />
                <div className="w-[50%] h-auto lg:ml-0 sm:ml-64">
                    <p className="text-[40px] font-regular text-offblack mb-6">
                        Breeze
                    </p>
                    <h2>Obtén el poder de la monitorización</h2>
                    <p className="mb-16 lg:inline-block sm: hidden">
                        Dispositivo portátil que monitorea la calidad del aire a
                        tu alrededor. Equipado con sensores para detectar ozono,
                        CO2 y otros contaminantes, te proporciona información en
                        tiempo real a través de tu móvil, ayudándote a cuidar tu
                        salud y el ambiente que respiras.
                    </p>

                    <div className="flex lg:flex-row sm:flex-col gap-5 lg:items-center sm:items-start">
                        <a className="btn-primary">Saber más</a>
                        <p className="text-primary font-semibold">
                            ¡Unidades gratis limitadas!
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-24 flex lg:flex-row sm:flex-col bg-primary h-fit py-20">
                <div className="lg:w-[60%] sm:w-full lg:pr-36 ">
                    <h2 className="text-offwhite lg:mx-0 sm:mx-auto">
                        Mapas de contaminación
                    </h2>
                    <p className="text-offwhite lg:mb-24 sm:mb-12 lg:text-start sm:text-justify">
                        En HowsAir, ofrecemos mapas interactivos que te permiten
                        visualizar en tiempo real la calidad del aire que te
                        rodea. Puedes seleccionar contaminantes como O3, CO y
                        NO2 para ver como te afectan en tu día a día, sea donde
                        sea.
                    </p>
                    <a
                        href="#"
                        className="btn-inverted lg:inline-block sm:hidden"
                    >
                        Ver mapas
                    </a>
                </div>
                <img
                    className="rounded-[50px] w-auto h-auto sm:w-screen lg:max-w-[40%] object-cover"
                    alt="Mapa de ejemplo"
                    src="/mapExample.png"
                ></img>
                <a
                    href="#"
                    className="btn-inverted lg:hidden sm:inline-block mx-auto mt-10"
                >
                    Ver mapas
                </a>
            </section>

            <section className="py-20 px-20">
                <h2 className="mx-auto mb-16">Nuestro valores</h2>
                <div className="flex lg:flex-row sm:flex-col gap-20 items-stretch lg:justify-center sm:items-center">
                    <ValueCard title="Compromiso ambiental">
                        Creemos en la importancia de reducir la contaminación y
                        cuidar el planeta para las generaciones futuras.
                    </ValueCard>
                    <ValueCard title="Transparencia">
                        Proporcionamos datos precisos y accesibles sin filtros,
                        para que nuestros usuarios vean la realidad del planeta.
                    </ValueCard>
                    <ValueCard title="Colaboración">
                        Valoramos el trabajo conjunto entre nuestra comunidad,
                        clientes y expertos para recopilar datos.
                    </ValueCard>
                </div>
            </section>

            <section className="px-24 flex lg:flex-row sm:flex-col h-fit py-20 sm:items-center">
                <div className="lg:w-2/3 md:w-4/5 sm:w-full lg:mr-40 sm:mr-0">
                    <h2 className="lg:mx-0 sm:mx-auto">Nuestra misión</h2>
                    <p className="lg:text-start sm:text-justify">
                        En HowsAir, nuestra misión es proporcionar a las
                        personas información precisa y sin filtros sobre la
                        calidad del aire que respiran. Buscamos que cualquier
                        persona pueda monitorear los contaminantes presentes en
                        su entorno. Creemos que el acceso a datos veraces es
                        clave para tomar decisiones informadas que promuevan un
                        estilo de vida más saludable. No alteramos ni filtramos
                        la información, estamos comprometidos con la
                        transparencia y el empoderamiento de nuestra comunidad
                        para que cada usuario conozca la verdad sobre el aire
                        que lo rodea.
                    </p>
                </div>
                <img
                    alt="Mujer feliz con telefono en mano"
                    src="/missionWoman.jpg"
                    className="md:inline-block sm:hidden rounded-[50px] lg:w-1/3 md:w-4/5 md:mt-12 object-cover transform scale-x-[-1]"
                ></img>
            </section>
        </>
    );
};

export default Landing;
