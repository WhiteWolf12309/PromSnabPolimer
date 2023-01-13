
import React from 'react';
import Intro from '../../components/Intro/Intro';
import MainProductsSection from '../../components/MainProductsSection/MainProductsSection';
import OurQualities from '../../components/OurQualities/OurQualities';
import OrderCall from '../../components/OrderCall/OrderCall';
import OurPosition from '../../components/OurPosition/OurPosition';
import OrderCalculator from '../../components/OrderCalculator/OrderCalculator';

import './HomePage.scss'

const HomePage = () => {
    return (
        <div className='home'>
            <Intro />
            <OrderCalculator />
            <MainProductsSection />
            <OurQualities />
            <OrderCall />
            <OurPosition />
        </div>
    );
}

export default HomePage;
