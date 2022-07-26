import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Landing.scss";
import { Button } from 'antd';

const Landing = () => {

  return (
    <div className="landing">
      Landing
      <div className="landingContainer">
        <div className="pictureWall">
          <div>
            <img src="https://i.imgur.com/JJTVrsc.jpg" />
          </div>
          <div>
            <img src="https://i.imgur.com/a3gBCnc.jpg" />
          </div>
          <div>
            <img src="https://i.imgur.com/Xv1blrT.jpg" />
          </div>
          <div>
            <img src="https://i.imgur.com/IwDKMRm.jpg" />
          </div>
          <div>
            <img src="https://i.imgur.com/Crduxe0.jpg" />
          </div>
          <div>
            <img src="https://i.imgur.com/XTE1qlC.jpg" />
          </div>
        </div>{" "}
      </div>
      <div className="welcome">
        <div className="welcome-text">
          <h2>Bienvenido a "Nombre"</h2>
          <p> Tu nueva app para descubrir rutas por Valencia.</p>
        </div>

        <div className="access">
          <button className="registerbtn"><Link to="/register">Regístrate</Link></button>
          <div className="loginbtn"> <Link to="/login">¿Ya tienes cuenta? Accede aquí.</Link></div>
        </div>
      </div>
    </div>

    // <div className="main-container">
    //   <h1 className="h1title">Routes</h1>
    //   <div className="gif">
    //     <img
    //       className="gif-image"
    //       src="https://c.tenor.com/b5ye9Sj0hXQAAAAM/valencia-awkward.gif"
    //     />
    //   </div>
    //   <span className="buttons">
    //     <button className="button">
    //       ¿Ya tienes cuenta?<Link to="/login">Conéctate</Link>
    //     </button>
    //     <button className="button">
    //       ¿No tienes cuenta?<Link to="/register">Regístrate</Link>
    //     </button>
    //   </span>
    //   <div className='image-route-div'>
    //     <img
    //       className="image-route"
    //       src="https://zenduwork.com/wp-content/uploads/2022/06/routing-pointa-ppointb.png"
    //       height="300px"
    //       alt="logo"
    //     ></img>
    //   </div>
    // </div>
  );
};

export default Landing;

//https://chargemap-blog.s3.amazonaws.com/uploads/2019/05/Illus-blog-nouvel-iti-free-EN.jpg
