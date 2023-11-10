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
              About FIIRBOTS
            </h1>
            <div
              data-aos="fade-right"
              data-aos-delay={window.innerWidth > 700 ? 900 : 0}
              className="linie"
            ></div>
          </div>
          <p data-aos-delay="700" data-aos="fade-down">
            The “FIIR_Bots” is a motivated team, which was established this year
            due to the desire of students to be involved in practical
            activities, research and individual study outside the hours provided
            in the education plan. The team is composed of 15 passionate
            students and a mentor from the Faculty of Industrial Engineering and
            Robotics (F.I.I.R) within the National University of Science and
            Technology POLITEHNICA Bucharest (U.N.S.T.P.B.). These enthusiastic
            and talented young people bring with them a range of skills and
            experience in robotics and industrial engineering. The mentor, an
            experienced professor and researcher in the field of industrial
            engineering and robotics, brings a special guidance perspective
            based on the principles of S.T.E.M. (Science, Technology,
            Engineering and Mathematics) and ”Long Life Learning”. The mentor is
            responsible for guiding them, giving them technical advice, and
            making sure their project is developing in the right direction. The
            students are from various specializations within the faculty
            (digital production systems, robotics, applied informatics in
            industrial engineering) and from different study years (they are
            students from all study years).  
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
