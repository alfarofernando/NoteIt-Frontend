import footerMain from '../assets/images/footerMain.webp';
import pins1 from '../assets/images/pins1.webp';
import pins2 from '../assets/images/pins2.webp';

export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-1  text-gray-800 mt-auto">
            {/* Imagen de la izquierda */}
            <div className="w-2/12 h-1/12 flex justify-start pl-2">
                <img src={pins1} alt="Left Decoration" className="w-1/2 h-auto" />
            </div>

            {/* Área central con texto y fondo */}
            <div
                className="flex-1 flex p-4 lg:p-8 xl:p-12 items-center justify-center bg-cover bg-no-repeat bg-center text-center "
                style={{
                    backgroundImage: `url(${footerMain})`,
                    backgroundSize: "90% 80%"
                }}
            >
                <p className="rounded text-sm md:text-md lg:text-lg xl:text-xl">
                    &copy;Note:It. Alfa::Dev.
                </p>
            </div>

            {/* Imagen de la derecha */}
            <div className="w-2/12 h-1/12 flex justify-end pr-2">
                <img src={pins2} alt="Right Decoration" className="w-1/2 h-auto" />
            </div>
        </footer>
    );
}
