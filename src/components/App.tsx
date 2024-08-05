import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './App.module.scss';
import { About } from '@/pages/about';


export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount(prev => prev + 1);
    };
 
    return (
        <div>
            <Link to="/about">about</Link>
            <br />
            <Link to="/shop">shop</Link>
            <p>{count}</p>
            <button className={classes.button} onClick={increment}><span>+</span></button>
            <About />
        </div>
    );
};