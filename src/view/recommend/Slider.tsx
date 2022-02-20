import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay} from "swiper";
SwiperCore.use([Pagination, Autoplay])

interface Iprops {
    list: {imageUrl: string}[]
}

const Slider = (props: Iprops): JSX.Element | null => {
    const { list } = props
    console.log('list', props.list)

    return (
      list.length > 0 ? (
          <SliderContainer>
              <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                pagination={{dynamicBullets: true,}}
                autoplay={{delay: 3000, disableOnInteraction: false}}
                // onSlideChange={()=> console.log('slide change')}
                // onSwiper={(swiper => console.log('swper', swiper))}
              >
                  {
                      list.map((item, index)=>
                          <SwiperSlide key={index}>
                              <img src={item.imageUrl} className={'coverImg'} alt='cover' />
                          </SwiperSlide>
                      )
                  }
              </Swiper>
          </SliderContainer>
      ): null
    )
}
export default React.memo (Slider);

const SliderContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  background: white;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 60%;
    width: 100%;
    background: ${props => props.theme.color};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  >.swiper {
    >.swiper-pagination {
      > .swiper-pagination-bullet-active{
          background: ${props => props.theme.color};
      }
    }
    >.swiper-wrapper {
      >.swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
        .coverImg {
          width: 97%;
        }
      }
    }
  }
`
