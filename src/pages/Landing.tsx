import { ValueCard } from "../components/ValueCard";

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

            <section className="max-w-[85dvw] flex flex-row gap-16 py-20 mx-auto">
                <img
                    className="w-[400px] h-fit my-auto"
                    alt="Vaper Breeze"
                    src="/breezePic.png"
                />
                <div className="w-[50%] h-auto">
                    <p className="text-[40px] font-regular text-offblack mb-6">
                        Breeze
                    </p>
                    <h2>Obtén el poder de la monitorización</h2>
                    <p className="mb-16">
                        Dispositivo portátil que monitorea la calidad del aire a
                        tu alrededor. Equipado con sensores para detectar ozono,
                        CO2 y otros contaminantes, te proporciona información en
                        tiempo real a través de tu móvil, ayudándote a cuidar tu
                        salud y el ambiente que respiras.
                    </p>

                    <div className="flex flex-row gap-5 items-center">
                        <a className="btn-primary">Saber más</a>
                        <p className="text-primary font-semibold">
                            ¡Unidades gratis limitadas!
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-24 flex flex-row bg-primary h-fit py-20">
                <div>
                    <h2 className="text-offwhite">Mapas de contaminación</h2>
                    <p className="text-offwhite w-[80%] mb-24">
                        En HowsAir, ofrecemos mapas interactivos que te permiten
                        visualizar en tiempo real la calidad del aire que te
                        rodea. Puedes seleccionar contaminantes como O3, CO y
                        NO2 para ver como te afectan en tu día a día, sea donde
                        sea.
                    </p>
                    <a className="btn-inverted">Ver mapas</a>
                </div>
                <img
                    className="rounded-[50px]"
                    alt="Mapa de ejemplo"
                    src="/mapExample.png"
                ></img>
            </section>

            <section className="py-20 px-20">
                <h2 className="text-center mb-16">Nuestro valores</h2>
                <div className="flex flex-row gap-20 items-stretch">
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

            <section className="px-24 flex flex-row h-fit py-20">
                <div className="w-2/3 mr-40">
                    <h2>Nuestra misión</h2>
                    <p>
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
                    className="rounded-[50px] w-[400px] object-cover transform scale-x-[-1]"
                ></img>
            </section>
        </>
    );
};

export default Landing;
