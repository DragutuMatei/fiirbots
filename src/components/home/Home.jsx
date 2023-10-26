import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { ScrollContainer } from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { Link } from "react-router-dom";
import Contact from "../utils/Contact";
import Svg from "../utils/Svg";
import Up from "../utils/Up";
import Card from "./components/Card";
import "./style.scss";
import "firebase/compat/firestore";
import Incercare from "../utils/Incercare";

import main from "../../img/Frame 118asd.png";
import work from "../../img/work.svg";
import programming from "../../img/programming.svg";
import marketing from "../../img/marketing.svg";
import control from "../../img/control.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Home({ premii }) {
  const h1 = useRef(null);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    // const particule = document.getElementById("tsparticles");
    // particule.style.visibility = "visible";
    // return () => {
    // particule.style.visibility = "hidden";
    // };
  });

  window.addEventListener(
    "scroll",
    () => {
      if (document.querySelector(".despre1 h1") != null)
        document.querySelector(".despre1 h1").style.transform = `translateX(${
          window.innerWidth > 700 ? window.scrollY / 1.6 : window.scrollY / 4.5
        }px)`;
    },
    { passive: true }
  );
  return (
    <>
      <Incercare id="tsparticles" />
      <div className="home">
        <div className="text">
          <h2 data-aos="fade-right" data-aos-delay="300">
            we are
          </h2>
          <h1 data-aos="fade-right">thobor</h1>
          <h2 data-aos="fade-right" data-aos-delay="300">
            team
          </h2>
        </div>
        <div className="img" data-aos="fade-left">
          <LazyLoadImage src={main} alt="main" width="100%" height="100%" />
        </div>
      </div>
      <div className="cifre">
        <div className="custom-shape-divider-bottom-1669758197">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <h3 data-aos="fade-down">
          <b>THOBOR</b> in cifre:
        </h3>
        <div className="tab" data-aos="fade-down">
          <div className="linie">
            <div className="cifra">
              <h1>
                <span> + </span>
                <span id="cifra_ani">
                  {" "}
                  <CountUp
                    end={6}
                    enableScrollSpy
                    redraw={true}
                    scrollSpyDelay={600}
                  />{" "}
                </span>
              </h1>
              <h2>Ani de experienta</h2>
            </div>

            <div className="cifra">
              <h1>
                <span> + </span>
                <span id="cifra_nat">
                  <CountUp
                    end={6}
                    redraw={true}
                    enableScrollSpy
                    scrollSpyDelay={600}
                  />
                </span>
              </h1>
              <h2>Participari la nationala</h2>
            </div>
          </div>

          <div className="linie">
            <div className="cifra">
              <h1>
                <span> + </span>
                <span id="cifra_mem">
                  <CountUp
                    end={24}
                    redraw={true}
                    enableScrollSpy
                    scrollSpyDelay={600}
                  />
                </span>
              </h1>
              <h2>Membrii</h2>
            </div>

            <div className="cifra">
              <h1>
                <span> + </span>
                <span id="cifra_al">
                  <CountUp
                    end={37}
                    redraw={true}
                    enableScrollSpy
                    scrollSpyDelay={600}
                  />
                </span>
              </h1>
              <h2>Alumni</h2>
            </div>
          </div>
        </div>
      </div>
      <div
        className="despre1"
        style={{
          background: "url(../../img/thobor_team.png)",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="custom-shape-divider-bottom-plm">
          <svg
            className="sucit"
            data-name="Layer 21"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <h1 ref={h1}>Despre</h1>
        <h2 data-aos="zoom-in-up">Despre</h2>
        <p data-aos="zoom-in-up">
          Echipa de robotică, formată din 15 liceeni ai Colegiului Național
          “Calistrat Hogaș” Tecuci, alături de mentori, îndrăznim să visăm.
          Plecată dintr-o zonă fără tradiții în domeniu, echipa și-a propus să
          aducă în comunitate o idee nouă, care să-i inspire pe toți colegii,
          care să deschidă noi direcții de evoluție pentru copii.
        </p>
        <Link to={"/despre"} className="button" data-aos="zoom-in-up">
          afla mai multe
        </Link>
      </div>
      <div className="cards">
        <div className="card" data-aos="fade-right">
          <LazyLoadImage src={work} width={100} height="auto" alt="main" />
          <h1>work</h1>
        </div>
        <div className="card" data-aos="fade-right" data-aos-delay="200">
          <LazyLoadImage
            src={programming}
            alt="main"
            width={100}
            height="auto"
          />
          <h1>programming</h1>
        </div>
        <div className="card" data-aos="fade-right" data-aos-delay="400">
          <LazyLoadImage src={marketing} alt="main" width={100} height="auto" />
          <h1>marketing</h1>
        </div>
        <div className="card" data-aos="fade-right" data-aos-delay="600">
          <LazyLoadImage src={control} alt="main" width={100} height="auto" />
          <h1>Mechanics</h1>
        </div>
      </div>
      <div className="scrollcnt">
        <div className="loc_de_premii">
          <h1>Premii</h1>
          <div className="coca"></div>
          <h2>Since 2017</h2>
        </div>

        <ScrollContainer className="scc">
          <div className="poate">
            <div className="space"></div>
            {premii &&
              premii.map((premiu) => (
                <Card an={premiu.an} text={premiu.text} image={premiu.img} />
              ))}
          </div>
        </ScrollContainer>
      </div>

      <div className="al">
        <Svg />
        <Contact />
      </div>

      <Up />
    </>
  );
}

export default Home;
