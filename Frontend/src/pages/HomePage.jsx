import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import noteItMainImage from "../assets/images/noteItMainImage.webp";
import homeNoteIt from "../assets/images/homeNoteIt.webp";
import { AuthContext } from "../contexts/AuthContext";
import homeNote from "../assets/images/homeNote.webp";

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
            <div className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold italic">
                <p>{words[0]} {words[1]}</p>
                <p>{words[2]} {words[3]}</p>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center">

            {/* Título */}
            <div className="flex justify-center gap-10  text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 ">
                <span>Start writing</span>
                <span>what matters</span>
            </div>


            {/* Carrusel con imagen de fondo */}
            <div
                className="flex px-6 my-4 items-center justify-center mt-2 w-[500px] h-[400px] md:w-[600px] md:h-[500px] lg:w-[700px] lg:h-[600px] bg-center bg-contain bg-no-repeat"
                style={{
                    backgroundImage: `url(${homeNoteIt})`, // Usa la imagen como fondo
                }}
            >
                <Link to="/active-notes">
                    <motion.div
                        className="flex items-center justify-center"
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 6 }} // Transición suave de 3 segundos
                    >
                        {currentIndex < 3 ? (
                            getFormattedPhrase(phrases[currentIndex])
                        ) : (
                            <img
                                src={phrases[currentIndex]}
                                alt="carousel"
                                className="w-[400px] h-[300px] md:w-[500px] md:h-[400px] object-contain" // Ajustar la imagen al 90% del contenedor
                            />
                        )}
                    </motion.div>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
