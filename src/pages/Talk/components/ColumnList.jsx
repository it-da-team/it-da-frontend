import React from 'react';
import ColumnItem from './ColumnItem';
import { interviewData } from '../data';
import './ColumnList.css';

const ColumnList = () => {
    return (
        <div className="column-list">
            {interviewData.map((item) => (
                <ColumnItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    summary={item.summary}
                />
            ))}
        </div>
    );
};

export default ColumnList; 