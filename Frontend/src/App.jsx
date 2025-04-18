import Navbar from './components/Navbar/NavbarContainer';
import Router from './router/Routes';
import Footer from "./components/Footer";

const App = () => {
  return (
    <div
      className="flex flex-col min-h-screen font-serif"
      style={{
        backgroundColor: '#c9a46e', // Color base cálido, similar a madera de corcho
        backgroundImage: `
      radial-gradient(circle, rgba(94, 69, 47, 0.1) 1px, transparent 1px), 
      radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      radial-gradient(circle, rgba(142, 110, 76, 0.15) 2px, transparent 2px),
      linear-gradient(0deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `,
        backgroundSize: '15px 15px, 20px 20px, 25px 25px, 100% 100%', // Diferentes tamaños de grano
        backgroundBlendMode: 'overlay, overlay, multiply, normal', // Mezcla más rica
        border: '20px solid #7a5c3e', // Marco de madera envejecida
        borderRadius: '10px', // Esquinas ligeramente redondeadas para un toque vintage
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)', // Sombra para dar un efecto tridimensional
      }}
    >
      <Navbar />
      <div className="">
        <Router />
      </div>
      <Footer />
    </div>
  );
};

export default App;
