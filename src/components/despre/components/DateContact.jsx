import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import Map from "./Map";

function DateContact() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="datecontact">
      <div className="left">
        <div className="title">
          <h1 data-aos="fade-down">
            Suntem de la{" "}
            <span>Facultatea de Inginerie Industriala si Robotica</span>
          </h1>
          <div className="linie" data-aos="fade-right"></div>
        </div>
        <ul>
          <li data-aos="fade-right">
            Splaiul Independentei 313, sector 6, cod postal 060042, Bucuresti,
            corp CD 003
          </li>
          <li data-aos="fade-right">
            <a href="tel: 40214029302">40 21-402 93 02</a>
          </li>
          <li data-aos="fade-right">
            <a href="mailto:secretariat@fiir.pub.ro">secretariat@fiir.pub.ro</a>
            <a href="mailto:decanat@fiir.pub.ro">decanat@fiir.pub.ro</a>
          </li>
        </ul>
      </div>
      <div className="right">
        <Map />
      </div>
    </div>
  );
}

export default DateContact;
