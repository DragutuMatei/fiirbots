import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import DateContact from "./components/DateContact";
import Stem from "./components/Stem";
import "./despre.scss";

import banner from "../../img/despre_banner.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Svg from "../utils/Svg";

function Despre() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div style={{ background: "#2f2f2f" }}>
        <LazyLoadImage
          src={banner}
          width={"100vw"}
          height={"auto"}
          className="header"
        />
      </div>

      <div className="part">
        <div
          data-aos="fade-up"
          data-aos-delay={window.innerWidth > 700 ? 600 : 0}
          className="img"
        />
        <div className="text">
          <div className="title">
            <h1
              data-aos="fade-right"
              data-aos-delay={window.innerWidth > 700 ? 600 : 0}
            >
              Despre Thobor
            </h1>
            <div
              data-aos="fade-right"
              data-aos-delay={window.innerWidth > 700 ? 900 : 0}
              className="linie"
            ></div>
          </div>
          <p data-aos-delay="700" data-aos="fade-down">
            Echipa THOBOR a Colegiului Național “Calistrat Hogaş” Tecuci, este
            formată din șaisprezece liceeni si doi mentori care au îndrăznit să
            viseze. Plecată dintr-o zonă fără tradiții în domeniu, echipa și-a
            propus să aducă în comunitate o idee nouă, care să-i inspire pe toți
            colegii, care să deschidă noi direcții de evoluție pentru copii.
            Echipa are deja o vechime de {new Date().getFullYear() - 2017} ani
            și pe parcursul acestor ani am învățat că First este ca o călătorie,
            o călătorie pe care ai putea să o oprești în orice moment dar care
            te motivează continuu să mergi mai departe, să încerci mai mult și
            să te dedici și mai mult.
          </p>
        </div>
      </div>

      <Stem />
      <DateContact />
      <Svg/>
      <Contact />
      <Up />
    </>
  );
}

export default Despre;
