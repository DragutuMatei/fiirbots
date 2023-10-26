import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import "./alumni.scss";
import Generatie from "./components/Generatie";

import "swiper/css";
import "swiper/css/pagination";

import "firebase/compat/auth";
import "firebase/compat/firestore";

import banner from "../../img/team_banner.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Svg from "../utils/Svg";

function Alumni({ ani, alumni }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div style={{ background: "#2f2f2f" }}>
      <LazyLoadImage
        src={banner}
        width={"100vw"}
        height={"auto"}
        className="header"
      />
      {ani &&
        ani.map((ani) => (
          <Generatie
            no={false}
            years={ani.ani}
            team={false}
            key={ani.id}
            persoane={[
              alumni &&
                alumni.filter((te) => {
                  if (te.ani == ani.ani) {
                    return {
                      key: te.id,
                      no: false,
                      img: te.poza,
                      nume: te.nume,
                      faculta: te.detalii,
                      text: alumni.text,
                    };
                  }
                }),
            ]}
          />
        ))}
      <Svg />
      <Contact />
      <Up />
    </div>
  );
}

export default Alumni;
