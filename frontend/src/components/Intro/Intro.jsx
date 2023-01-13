
import React, { useState } from 'react';
import IntroButton from '../Buttons/Intro-button/IntroButton';

import { motion } from 'framer-motion';

import Arrow from '../../assets/images/arrow.svg'
import Carousel from '../../assets/images/carousel_img.png'
import Phone from '../../assets/images/phone.svg'

import './Intro.scss'

const Intro = () => {

    const [carouselStep, setCarouselStep] = useState(0)
    const [imagesCount, setImagesCount] = useState(3)

    const carouselBack = () => {
        setCarouselStep(prev => {
            if (prev + 1 > 0) {
                return prev - imagesCount + 1 
            } else {
                return prev + 1
            }
        })
    }

    const carouseNext = () => {
        setCarouselStep(prev => {
            if (prev - 1 < -2) {
                return prev + imagesCount - 1
            } else {
                return prev - 1
            }
        })
    }

    // Animations
    const carouselAnimation = {
        hidden: {
            x: -100,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        },
    }

    const textAnimation = {
        hidden: {
            x: 100,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1
        },
    }


    return (
        <motion.div 
        className='intro'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        >
            <div className="container">
                <div className="intro__inner">
                    <div className="intro__upper">
                        
                        <motion.div 
                        className="upper__left"
                        variants={carouselAnimation}
                        >
                            <div onClick={carouselBack} className="carousel__btn back">
                                <img  src={Arrow} alt="Предыдущее изображение" className="carousel__btn--back" />
                            </div>
                            <div className="carousel__body">
                                <div className="carousel" style={{transform: `translateX(${630 * carouselStep}px)`, transition: `transform ease-in-out 0.7s`}}>
                                    <img src={Carousel} alt="" />
                                    <img src={Carousel} alt="" />
                                    <img src={Carousel} alt="" />
                                </div>
                            </div>
                            
                            <div onClick={carouseNext} className="carousel__btn next">
                                <img  src={Arrow} alt="Предыдущее изображение" className="carousel__btn--next" />
                            </div>
                        </motion.div>
                        <motion.div 
                        className="upper__right"
                        variants={textAnimation}
                        >
                            <div className="upper__title">
                                Самые лучшие полиэтиленовые трубы только у нас 
                            </div>
                            <IntroButton text={"Заказать звонок"} img={Phone} />
                        </motion.div>
                    </div>
                    
                    {/* <div className="intro__lower">
                        <div className="product__catalog">
                            
                            <ProductItem 
                                img={ProductItemImgExample}
                                title={"Труба"}
                                price={"239"}
                                description={"Описание"}
                             />
                            
                        </div>
                    </div> */}
                </div>
            </div>
            
        </motion.div>
    );
}

export default Intro;
