import { Link } from 'react-router-dom';
import { ValueCard } from '../../components/widgets/ValueCard';
import ArrowDown from '../../components/icons/ArrowDown';
import { routes } from '../../routes/routes';

const Landing = () => {
    const Icon = ArrowDown;

    return (
        <div className='overflow-x-hidden'>
            <section className="relative h-screen w-full overflow-hidden bg-hero bg-cover">
                <div
                    className="absolute inset-0 bg-[rgba(143,143,143,0.28)]"
                    style={{
                        background:
                            'radial-gradient(circle 600px at 50% 70%, rgba(143, 143, 143, 0.28) 0%, rgba(0, 73, 147, 0.65) 100%)',
                    }}
                />

                <div className="container relative mx-auto flex h-full flex-col items-center pt-60">
                    <h1>¿Es seguro el aire a tu alrededor?</h1>
                    <p className="w-fit text-center font-medium text-offwhite">
                        HowsAir te ayuda a monitorear la calidad del aire en tu
                        entorno.
                    </p>

                    <Link to={routes.HOME.MAPS} className="btn-primary mt-24">
                        Ver mapas
                    </Link>
                    <a
                        href="#target"
                        className="mb-12 mt-auto h-14 w-14 rounded-full bg-white bg-opacity-60 p-2 text-4xl text-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .querySelector('#target')
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <Icon></Icon>
                    </a>
                </div>
            </section>
            <div id="target" className="relative -top-20"></div>
            <section className=" relative mx-auto flex w-full flex-col items-center py-20">
                <h2>¿Qué hacemos en HowsAir?</h2>
                <p className="max-w-[600px] text-center">
                    Desarrollamos mapas de calidad del aire para los ciudadanos
                    gracias a la participación de nuestros fieles portadores de
                    Breeze.
                </p>

                <img
                    src="/nube-lateral.svg"
                    className="absolute -right-10 top-52 w-28 scale-y-125 object-cover"
                ></img>

                <img
                    src="/nube-lateral.svg"
                    className="absolute -left-12 top-14 w-40 -scale-y-125 scale-x-[-1] transform object-cover"
                ></img>
            </section>

            <section className="flex w-fit flex-row justify-center py-20 sm:gap-0 lg:gap-16">
                <img
                    className="left-4 my-auto h-fit sm:absolute sm:w-72 lg:static lg:w-[400px]"
                    alt="Vaper Breeze"
                    src="https://res.cloudinary.com/dzh6bz0zi/image/upload/v1731012929/media/tje5wbwnff3ql4xxbvwi.png "
                />
                <div className="h-auto w-[50%] sm:ml-64 lg:ml-0">
                    <p className="font-regular mb-6 text-[40px] text-offblack">
                        Breeze
                    </p>
                    <h2>Obtén el poder de la monitorización</h2>
                    <p className="sm: mb-16 hidden lg:inline-block">
                        Dispositivo portátil que monitorea la calidad del aire a
                        tu alrededor. Equipado con sensores para detectar ozono,
                        CO2 y otros contaminantes, te proporciona información en
                        tiempo real a través de tu móvil, ayudándote a cuidar tu
                        salud y el ambiente que respiras.
                    </p>

                    <div className="flex gap-5 sm:flex-col sm:items-start lg:flex-row lg:items-center">
                        <Link to={routes.SHOP.PRODUCT} className="btn-primary">
                            Saber más
                        </Link>
                        <p className="font-semibold text-primary">
                            ¡Unidades gratis limitadas!
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex h-fit bg-primary px-24 py-20 sm:flex-col lg:flex-row">
                <div className="sm:w-full lg:w-[60%] lg:pr-36">
                    <h2 className="text-offwhite sm:mx-auto lg:mx-0">
                        Mapas de contaminación
                    </h2>
                    <p className="text-offwhite sm:mb-12 sm:text-justify lg:mb-24 lg:text-start">
                        En HowsAir, ofrecemos mapas interactivos que te permiten
                        visualizar en tiempo real la calidad del aire que te
                        rodea. Puedes seleccionar contaminantes como O3, CO y
                        NO2 para ver como te afectan en tu día a día, sea donde
                        sea.
                    </p>
                    <Link
                        to={routes.HOME.MAPS}
                        className="btn-inverted relative z-10 sm:hidden lg:inline-block"
                    >
                        Ver mapas
                    </Link>
                </div>
                <img
                    className="h-auto w-auto rounded-[50px] object-cover sm:w-screen lg:max-w-[40%]"
                    alt="Mapa de ejemplo"
                    src="https://res.cloudinary.com/dzh6bz0zi/image/upload/v1730570970/media/uxvxh7ivr6x6hsou4ts7.jpg"
                ></img>
                <Link
                    to={routes.HOME.MAPS}
                    className="btn-inverted mx-auto mt-10 sm:inline-block lg:hidden"
                >
                    Ver mapas
                </Link>
            </section>

            <section className="px-20 py-20">
                <h2 className="mx-auto mb-16">Nuestro valores</h2>
                <div className="flex items-stretch gap-20 sm:flex-col sm:items-center lg:flex-row lg:justify-center">
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

            <section className="flex h-fit px-24 py-20 sm:flex-col sm:items-center lg:flex-row">
                <div className="sm:mr-0 sm:w-full md:w-4/5 lg:mr-40 lg:w-2/3">
                    <h2 className="sm:mx-auto lg:mx-0">Nuestra misión</h2>
                    <p className="sm:text-justify lg:text-start">
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
                    src="https://res.cloudinary.com/dzh6bz0zi/image/upload/v1731011479/media/uvnweh4j8kdua2xz3sa6.jpg"
                    className="scale-x-[-1] transform rounded-[50px] object-cover sm:hidden md:mt-12 md:inline-block md:w-4/5 lg:w-1/3"
                ></img>
            </section>
        </div>
    );
};

export default Landing;
