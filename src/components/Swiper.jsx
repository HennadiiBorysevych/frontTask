import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

import { Scrollbar, A11y, Pagination, Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  PostSwiper,
  SwiperImage,
  LoaderWrapper,
  LandMarkText
} from "./Swiper.styled";
import Waveform from "./AudioPlayer/AudioPlayer";
const SwiperPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);

        const response = await fetch(
          "https://journey-b8oc.onrender.com/api/landmarks"
        );
        const data = await response.json();
        console.log("🚀 : data", data);

        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {!loader ? (
        <PostSwiper>
          <Swiper
            className="coursePurpose"
            spaceBetween={20}
            modules={[Scrollbar, A11y, Navigation, Pagination]}
            scrollbar={{ draggable: true }}
          >
            {posts?.map((item, i) => (
              <SwiperSlide key={i}>
                <SwiperImage
                  src={item.imageURL}
                  alt=""
                  width={500}
                  height={300}
                  style={{ borderRadius: 20 }}
                />
                <Waveform
                  url={item.audioURL}
                  trackSize={80}
                  barWidth={3}
                  svgSize={25}
                />
                <LandMarkText>{item.text}</LandMarkText>
              </SwiperSlide>
            ))}
          </Swiper>
        </PostSwiper>
      ) : (
        <LoaderWrapper>
          <TailSpin
            height="80"
            width="80"
            color="#4169e1"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </LoaderWrapper>
      )}
    </section>
  );
};

export default SwiperPosts;
