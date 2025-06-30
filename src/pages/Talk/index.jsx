import React from 'react';
import ColumnList from './components/ColumnList';
import './Talk.css';

const Talk = () => {
    return (
        <div className="talk-page-container">
            <header className="talk-page-header">
                <h1>선배 톡톡</h1>
                <p>업계 선배들의 생생한 경험과 지혜를 만나보세요.</p>
            </header>
            <main className="talk-page-main">
                <ColumnList />
            </main>
        </div>
    );
};

export default Talk; 