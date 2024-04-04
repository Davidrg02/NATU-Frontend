import React from 'react';
import 'animate.css/animate.min.css'; // Importa animate.css
import './Home.css'
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Beneficios from './Beneficios';
import ProductosVista from './ProductosVista';

export default function Inicio() {
  return (
    <div>
      <div className="home-page-container">
        <div className="home-page-text-container">
          <h1 className="home-page-title animate__animated animate__fadeInUp">
            ¿Quieres alimentar tu cuerpo y tu mente con productos orgánicos y saludables?
          </h1>
          <p className="home-page-description animate__animated animate__fadeIn">
            En Natu Tienda Orgánica encontrarás una gran variedad de productos de alta calidad, cultivados y fabricados por productores locales de pueblos de toda Colombia. 
          </p>
          <Link to="/products" className="home-page-button animate__animated animate__fadeIn animate__pulse">
            Productos <FiArrowRight />
          </Link>
        </div>
      </div>
      <div className="home-image-section parallax-container">
        <img src="https://acortar.link/1sQiAb" alt="Banner" className="home-banner-image parallax-image" />
      </div>

      <div className="acerca-container">
        <div className="titulo-container">
          <h1 className="titulo-texto animate__animated animate__fadeInLeft">Descubre lo auténtico: Productos naturales de la tierra, cultivados con amor</h1>
        </div>
        <div className="texto-container">
          <p className="parrafo-texto animate__animated animate__fadeInRight">
            En Natu, respaldamos la economía local al ofrecerte productos saludables y naturales, cultivados y elaborados en el campo por familias colombianas trabajadoras. Nuestro objetivo es brindarte una experiencia auténtica y promover un estilo de vida más saludable para que puedas disfrutar plenamente de nuestros productos.
          </p>
          <Link to="/" className="leer-mas-button animate__animated animate__shine">
            Leer Más...<FiArrowRight />
          </Link>
        </div>
      </div>
      <div className="acerca-image-section">
        <img src="../../../TomatoesC.png" alt="Banner" className="acerca-banner-image" />
      </div>
      
      <Beneficios />
      <ProductosVista />

    

    </div>
  );
}