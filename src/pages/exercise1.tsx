import React, {useEffect, useState} from 'react';
import { Range } from '@components/Range';
import {useMinMax} from "@hooks/use-range";
import styles from "@styles/Exercices.module.css";

 const Exercise1 = () => {
     const { data, isLoading,isSuccess} = useMinMax();

    return (
        <div className={styles.container}>
            <h1>Exercise 1</h1>
            {!isLoading && isSuccess &&  (<Range min={data?.min} max={data?.max}/>)}

        </div>
    );
};

export  default Exercise1;
