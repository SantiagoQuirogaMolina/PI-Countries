import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import { Link, NavLink } from 'react-router-dom';
import videoSource from "./fondo.mp4";

function LandingPage() {
  const [text, setText] = useState("");
  const texts = ["WELCOME", "TO", "WORLD-COUNTRIES"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [showHomeButton, setShowHomeButton] = useState(false); // Nuevo estado para mostrar el botón

  const delay = 268; // Define el valor de delay para controlar la velocidad de escritura

  useEffect(() => {
    const typeEffect = () => {
      const currentText = texts[currentIndex];
      const currentChar = currentText[charIndex];

      if (isTyping) {
        setText((prevText) => prevText + currentChar);
        setCharIndex((prevIndex) => prevIndex + 1);

        if (charIndex === currentText.length - 1) {
          setIsTyping(false); // Detiene la escritura una vez que se completa la palabra actual
          if (currentIndex === texts.length - 1) {
            // Si es la última palabra, muestra el botón
            setShowHomeButton(true);
          } else {
            setTimeout(() => {
              setText(""); // Borra toda la palabra
              setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
              setCharIndex(0); // Reinicia el índice de caracteres para la siguiente palabra
              setIsTyping(true); // Comienza a escribir la siguiente palabra
            }, 1000); // Espera 1 segundo antes de iniciar la siguiente palabra
          }
        }
      }
    };

    const typeInterval = setInterval(typeEffect, delay); // Utiliza el delay para controlar la velocidad
    // Ajusta la velocidad del video a 1.5x (o el valor que desees)
    const videoElement = document.querySelector(".background-video video");
    videoElement.playbackRate = 1.2; // Cambia este valor según la velocidad deseada

    return () => clearInterval(typeInterval); // Limpia el intervalo al desmontar el componente
  }, [charIndex, isTyping, currentIndex, text, delay, texts]);

  return (
    <div className="landing-page  ">
      <div className="bg-1">
        <p className="t-stroke t-shadow-halftone">{text}</p>{" "}
        {/* Muestra el texto que se está escribiendo */}
        {showHomeButton &&  <NavLink to='/home'>
                <button>Home</button>
            </NavLink>}
      </div>
      <div className="background-video">
        <video autoPlay muted>
          <source src={videoSource} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default LandingPage;
