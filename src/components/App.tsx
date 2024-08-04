import { useState } from 'react';
import classes from './App.module.scss';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount(prev => prev + 1);
    };

    console.log('classes', classes);
 
    return (
        <div>
            <p>{count}</p>
            <button className={classes.button} onClick={increment}><span>+</span></button>
        </div>
    );
};