
import React from 'react';
import { motion } from 'framer-motion';

import Speed from '../../assets/images/speed.svg'
import Team from '../../assets/images/team.svg'
import Support from '../../assets/images/support.svg'

import './OurQualities.scss'

import SectionTitle from '../SectionTitle/SectionTitle';

const OurQualities = () => {

    // Animations
    const itemAnimation = {
        hidden: {
            y: 50,
            opacity: 0
        },
        visible: custom => ({
            y: 0,
            opacity: 1,
            transition: {delay: custom * 0.2}
        })
    }

    return (
        <motion.div 
        className='qualities'
        id='qualities'
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8, once: true }}
        >
            <div className="container">
                
                <SectionTitle title={"Наши качества"} />

                <div className="qualities__inner">
                    <motion.div 
                    className="qualities__item"
                    variants={itemAnimation}
                    custom={1}
                    >
                        <img className='item__image' src={Speed} />
                        <div className='item__text'>Мы делаем работу быстро и качественно</div>
                    </motion.div>

                    <motion.div 
                    className="qualities__item"
                    variants={itemAnimation}
                    custom={2}
                    >
                        <img className='item__image' src={Team} />
                        <div className='item__text'>В нашей команде работают только профессионалы</div>
                    </motion.div>

                    <motion.div 
                    className="qualities__item"
                    variants={itemAnimation}
                    custom={3}
                    >
                        <img className='item__image' src={Support} />
                        <div className='item__text'>По всем вопросам наши мастера ответят вам как можно быстрее</div>
                    </motion.div>
                </div>

            </div>  
        </motion.div>
    );
}

export default OurQualities;
