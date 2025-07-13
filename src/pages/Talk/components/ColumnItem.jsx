import React from 'react';
import { Link } from 'react-router-dom';
import './ColumnItem.css';

const ColumnItem = ({ id, image, title, summary }) => {
    return (
        <Link to={`/talk/${id}`} className="column-item-link">
            <div className="column-item">
                <div className="column-item-image-wrapper">
                    <img src={image} alt={title} className="column-item-image" />
                </div>
                <div className="column-item-content">
                    <h3 className="column-item-title">{title}</h3>
                    <p className="column-item-summary">{summary}</p>
                </div>
            </div>
        </Link>
    );
};

export default ColumnItem; 