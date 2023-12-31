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
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import Persoana from "./components/AlumniPersoana";
import { Navigation, Pagination } from "swiper";

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

      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        grabCursor={true}
        autoHeight={true}
        scrollbar={true}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        autoplay={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/Cazacu.jpeg")}
            // id={p.id}
            nume={"Cristiana Cazacu"}
            faculta={"Team manager"}
            text={
              "<b>Prof.</b> at Faculty of Industrial Engineering and Robotics"
            }
          />
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/hanga.jpg")}
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"Team leader"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/liviu.jpeg")}
            // id={p.id}
            nume={"Burghiu Liviu Mihai"}
            text={"Faculty of Mechanical Engineering and Mechatronics"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/io.jpeg")}
            // id={p.id}
            nume={"Dragutu Matei "}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/teo.jpeg")}
            // id={p.id}
            nume={"Nasu Teodor Cristian"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/carmen.jpeg")}
            // id={p.id}
            nume={"Selaru Carmen Cristiana Ioana"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/andrew.jpeg")}
            // id={p.id}
            nume={"Simion Andrei"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/radu.jpeg")}
            // id={p.id}
            nume={"Ionescu Radu Marian"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/bogdan.jpeg")}
            // id={p.id}
            nume={"Costea Bogdan Ionut"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/dinu.jpeg")}
            // id={p.id}
            nume={"Dinu Cristian"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/stefan.jpeg")}
            // id={p.id}
            nume={"Cula Stefan"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/logo.png")}
            // id={p.id}
            nume={"Marin Cristian Nicolae"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>
        
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/logo.png")}
            // id={p.id}
            nume={"Ghiorghiu Dimitrie Mihnea"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>
        
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/logo.png")}
            // id={p.id}
            nume={"Iancu Razvan Andrei"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>
        
        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/logo.png")}
            // id={p.id}
            nume={"Topozaru Catalin Andrei"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>

        <SwiperSlide style={{ margin: "0 15px" }}>
          <Persoana
            no={true}
            img={require("../../img/logo.png")}
            // id={p.id}
            nume={"Dinu Mihai Cristian"}
            text={"Faculty of Industrial Engineering and Robotics"}
          />{" "}
        </SwiperSlide>

        
        {/* {persoane &&
          persoane.map((p) => {
            return (
                      <SwiperSlide  style={{margin:"0 15px"}}>

                {p && (
                  <Persoana
                    no={true}
                    img={p.img}
                    id={p.id}
                    delete_this={p.delete_this_mama}
                    nume={p.nume}
                    faculta={p.faculta}
                    text={p.text}
                  />
                )}
              </SwiperSlide>
            );
          })} */}
      </Swiper>

      {/* {ani &&
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
        ))} */}
      <Svg />
      <Contact />
      <Up />
    </div>
  );
}

export default Alumni;
