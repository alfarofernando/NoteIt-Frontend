import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import noteItMainImage from "../assets/images/noteItMainImage.webp";
import { AuthContext } from "../contexts/AuthContext";

const HomePage = () => {
    const { user } = useContext(AuthContext);
    const [currentIndex, setCurrentIndex] = useState(0);

    const phrases = [
        "You can Imagine it",
        "You can Think it",
        "You can Enjoy it",
        noteItMainImage, // Utiliza la imagen importada directamente
    ];



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }, 3000); // Cambia de frase cada 3 segundos
        return () => clearInterval(interval); // Limpia el intervalo al desmontarse
    }, []);

    const getFormattedPhrase = (phrase) => {
        const words = phrase.split(" ");
        return (
            <div className="text-center text-5xl md:text-7xl lg:text-8xl font-semibold italic">
                <p>{words[0]} {words[1]}</p>
                <p>{words[2]} {words[3]}</p>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            {/* Flecha animada */}
            {!user &&
                <motion.div
                    className="absolute top-20 right-9 md:right-12 flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full shadow-lg"
                    animate={{
                        y: [0, -25, 0], // Movimiento hacia arriba y luego regresa
                        scale: 1.25
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity, // Animación infinita
                        ease: "easeInOut",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="white"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                </motion.div>
            }

            {/* Título */}
            <h1 className="absolute top-24 mb-2 text-2xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-600 via-gray-700    to-gray-800 text-transparent bg-clip-text">
                Welcome to your Note App
            </h1>

            {/* Carrusel */}
            <div className="relative py-4 flex items-center justify-center w-[90%] mt-2 h-72 md:h-[385px] bg-[#eeeced] rounded-xl shadow-xl">
                <motion.div
                    className="flex  items-center justify-center w-full h-full"
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3 }} // Transición suave de 1 segundo
                >
                    {currentIndex < 3 ? (
                        getFormattedPhrase(phrases[currentIndex])
                    ) : (
                        <img
                            src={phrases[currentIndex]}
                            alt="carousel"
                            className="w-72 h-72 md:w-96 md:h-96 object-contain"
                        />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default HomePage;
