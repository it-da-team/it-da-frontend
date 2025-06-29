import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { interviewData } from './data';
import './Detail.css';
import NotFound from '../NotFound';

const TalkDetail = () => {
    const { id } = useParams();
    const interview = interviewData.find(item => item.id === parseInt(id));

    if (!interview) {
        return <NotFound />;
    }

    const { title, image, content, summary } = interview;

    return (
        <div className="talk-detail-container">
            <div className="talk-detail-content">
                <header className="talk-detail-header">
                    <h1 className="talk-detail-title">{title}</h1>
                    <p className="talk-detail-summary">{summary}</p>
                </header>
                <div className="talk-detail-image-wrapper">
                    <img src={image} alt={title} className="talk-detail-image" />
                </div>
                <article className="talk-detail-body">
                    <p>{content}</p>
                </article>
            </div>
            <div className="back-to-list-wrapper">
                <Link to="/talk" className="back-to-list-button">
                    목록으로 돌아가기
                </Link>
            </div>
        </div>
    );
};

export default TalkDetail; 