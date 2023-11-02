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
              Despre FIIRBOTS
            </h1>
            <div
              data-aos="fade-right"
              data-aos-delay={window.innerWidth > 700 ? 900 : 0}
              className="linie"
            ></div>
          </div>
          <p data-aos-delay="700" data-aos="fade-down">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
            sapiente ut quae iure assumenda, aliquid obcaecati nisi amet,
            suscipit ullam laudantium fugiat temporibus a. Veniam officia
            voluptates suscipit eos, minus autem dolorum quas sit a, aut
            provident. Sint modi iusto possimus impedit accusantium
            exercitationem voluptatum natus nisi repudiandae, ducimus, qui
            doloribus corrupti doloremque unde vitae veritatis autem at velit!
            Unde veniam nulla nemo saepe, provident, sequi architecto asperiores
            eius laboriosam eos, obcaecati suscipit. Eum a quidem minus
            accusantium voluptatibus eos architecto, cum repellat assumenda
            soluta maiores placeat deleniti illum voluptatem tenetur eligendi
            reprehenderit itaque laudantium aperiam alias molestias ut.
          </p>
        </div>
      </div>

      {/* <Stem /> */}
      <DateContact />
      <Svg />
      <Contact />
      <Up />
    </>
  );
}

export default Despre;
