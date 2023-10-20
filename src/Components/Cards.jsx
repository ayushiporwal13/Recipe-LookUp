import React from 'react';
import './Cards.css';

const Card = ({ summary, title }) => {

    return (
        <div className="card">
            <div className="card-body">
                <h3>{title}</h3>
                {Array.isArray(summary) ? <h4>{summary.join(', ')}</h4>
                    :
                    title == "Average Price Per Serving" ? <h1>${Math.round(summary * 100)/100}</h1> :
                        <h1>{summary}</h1>}

            </div>
        </div>
    );
};

export default Card;
