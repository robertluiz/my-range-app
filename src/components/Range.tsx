import React, { useCallback, useEffect, useState, useRef } from 'react';
import styles from '@styles/Range.module.css';
export type RangeProps = {
    minValue?: number;
    maxValue?: number;
    rangeValues?: number[];
}
export const Range = ({ minValue=1, maxValue=100, rangeValues = [] }: RangeProps) => {
    const [min, setMin] = useState(minValue);
    const [max, setMax] = useState(maxValue);
    const [dragging, setDragging] = useState<'min' | 'max' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleMinChange = useCallback(() => {
        const enterValue = prompt('Insira um novo valor mínimo', min.toFixed(2));
        if (enterValue) {
            const value = parseFloat(enterValue);
            if (!isNaN(value) && value >= minValue && value <= max) {
                setMin(value);
            }
        }
    }, [min, max, minValue]);
    const handleMaxChange = useCallback(() => {
        const enterValue = prompt('Insira um novo valor máximo', max.toFixed(2));
        if (enterValue) {
            const value = parseFloat(enterValue);
            if (!isNaN(value) && value <= maxValue && value >= min) {
                setMax(value);
            }
        }
    }, [min, max, maxValue]);
    const handleDrag = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const { left, width } = containerRef.current.getBoundingClientRect();
        const value = (e.clientX - left) / width * (maxValue - minValue) + minValue;
        const roundedValue =  rangeValues.length > 0 ? rangeValues.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev) : value;
        if (dragging === 'min') {
            const newMin = Math.min(Math.max(roundedValue, minValue), max);
            setMin(newMin);
            return;
        }
        if (dragging === 'max') {
            const newMax = Math.max(Math.min(roundedValue, maxValue), min);
            setMax(newMax);
        }
    }, [min, dragging, maxValue, max, minValue, rangeValues]);
    const handleDragStart = useCallback((type: 'min' | 'max') => {
        setDragging(type);
    }, []);
    const handleDragEnd = useCallback(() => {
        setDragging(null);
    }, []);
    useEffect(() => {
        const handleMouseUp = () => {
            if (dragging) {
                handleDragEnd();
            }
        };
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, handleDragEnd]);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (dragging) {
                handleDrag(e);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [dragging, handleDrag]);
    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.range}>
                <div className={styles.rangeContainer}>
                    <div className={styles.rangeLine} />
                    <div
                        className={`${styles.handle} ${styles.minHandle} ${dragging === 'min' ? styles.dragging : ''}`}
                        style={{ left: `${((min - minValue) / (maxValue - minValue)) * 100}%` }}
                        onMouseDown={() => handleDragStart('min')}
                        onMouseUp={handleDragEnd}
                        data-testid="min-handle"
                    />
                    <div
                        className={`${styles.handle} ${styles.maxHandle} ${dragging === 'max' ? styles.dragging : ''}`}
                        style={{ left: `${((max - minValue) / (maxValue - minValue)) * 100}%` }}
                        onMouseDown={() => handleDragStart('max')}
                        onMouseUp={handleDragEnd}
                        data-testid="max-handle"
                    />
                </div>
            </div>
            <div className={styles.valuesContainer}>
                <div>
                    <span onClick={handleMinChange}>{`${min.toFixed(2)}€`}</span>
                </div>
                <div>
                    <span onClick={handleMaxChange}>{`${max.toFixed(2)}€`}</span>
                </div>
            </div>
        </div>
    );
};
