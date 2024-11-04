import React from 'react';

const Button = ({ title, styles }) => {
    return (
        <button className={`bg-blue-500 rounded-3xl py-2 font-semibold ${styles}`}>{title}</button>
    );
};

export default Button;