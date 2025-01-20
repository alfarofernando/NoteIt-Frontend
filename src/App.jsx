import Navbar from './components/Navbar';
import Router from './router/Routes';
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className='flex flex-col  flex-grow font-serif bg-orange-300'>
      <Navbar />
      <div className="min-h-screen">
        <Router />
      </div>
      <Footer />
    </div>
  );
};

export default App;
