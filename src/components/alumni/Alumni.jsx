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
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Persoana
            no={true}
            img={
              "https://scontent-otp1-1.xx.fbcdn.net/v/t39.30808-6/278232996_4897429856971542_1282493310818328715_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rBTvlty7_gwAX-56zL0&_nc_ht=scontent-otp1-1.xx&oh=00_AfBWJXqz90_TI_aVO7YVJlYy6Im2Ls39THAkcSVfRsDopQ&oe=65499380"
            }
            // id={p.id}
            nume={"Hanga Mihail"}
            faculta={"idk"}
            text={"poate"}
          />{" "}
        </SwiperSlide>
        {/* {persoane &&
          persoane.map((p) => {
            return (
              <SwiperSlide>
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
