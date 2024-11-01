const Landing = () => {
    return (
        <section 
            className="relative h-screen w-screen bg-cover"
            style={{ backgroundImage: "url('../../public/landingBg.png')" }}>
            <div 
                className="absolute inset-0 bg-[rgba(143,143,143,0.28)]" 
                style={{ 
                    background: 'radial-gradient(circle 600px at 50% 70%, rgba(143, 143, 143, 0.28) 0%, rgba(0, 73, 147, 0.65) 100%)'
                }} 
            />
            <div className="container relative pt-60 mx-auto flex flex-col items-center">
                <h1>¿Es seguro el aire a tu alrededor?</h1>
                <p className="hero-p">HowsAir te ayuda a monitorear la calidad del aire en tu entorno.</p>

                <a className="btn-primary mt-24">Ver mapas</a>
                <button className="rounded-full w-14 h-14 mt-16 p-2 text-primary text-4xl bg-white bg-opacity-60">V</button>
            </div>
        </section>
    );
};

export default Landing;
