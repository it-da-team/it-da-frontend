import React from 'react';
import MainBanner from './MainBanner';
import MainCategory from './MainCategory';
import MainCategoryList from './MainCategoryList';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <MainBanner />
            <MainCategory />
            <MainCategoryList />
        </div>
    );
}

export default Home;