import React from 'react';
import {Range} from '@components/Range';
import {useMinMax, useRangeValues} from "@hooks/use-range";
import styles from "@styles/Exercices.module.css";

const Exercise2 = () => {

    const { data, isLoading,isSuccess} = useMinMax();
    const {data:rangeResponse, isLoading:isLoadingRange, isSuccess:isSuccessRange} = useRangeValues();

    const isLoadingData = !isLoading && isSuccess && !isLoadingRange && isSuccessRange;

    return (
        <div className={styles.container}>
            <h1>Exercise 2</h1>
            { isLoadingData &&  (<Range minValue={data?.min} maxValue={data?.max} rangeValues={ rangeResponse?.rangeValues} />)}

        </div>
    );
};

export default Exercise2;
