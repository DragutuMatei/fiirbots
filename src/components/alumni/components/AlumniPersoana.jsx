import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import over from "../../../img/over_alumni_img.svg";
import abs from "../../../img/absolute_alumni.svg";
function Persoana({ nume, faculta, text, img }) {
  return (
    <div className="alumn" data-aos="fade-left">
      <div className="top">
        <div className="imgs">
          <LazyLoadImage src={img} width={"100%"} height={"auto"} alt="" />
          <LazyLoadImage
            src={over}
            width={"100%"}
            height={"auto"}
            className="svg"
          />
        </div>

        <div className="ttext">
          <h1>{nume}</h1>
          {/* <h3>{faculta}</h3> */}
        </div>
      </div>
      <div className="text">
        <p
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <LazyLoadImage
        src={abs}
        className="abs first"
        width={"auto"}
        height={"auto"}
      />
      <LazyLoadImage
        src={abs}
        className="abs second"
        width={"auto"}
        height={"auto"}
      />
    </div>
  );
}

export default Persoana;
