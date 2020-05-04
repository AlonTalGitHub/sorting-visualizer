import React, { useState, useEffect } from 'react';
import createRandomArray from '../../sortingAlgorithms/helpers';
import getMergeSortAnimations, { mergeSortAlgo } from '../../sortingAlgorithms/merge';
import getHeapSortAnimations from '../../sortingAlgorithms/heap';
import getQuickSortAnimations from '../../sortingAlgorithms/quick';

import Toolbar from '../Toolbar/Toolbar.js';

import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 7;
const NUMBER_OF_BARS = 70;
const PRIMARY_COLOR = 'blueviolet';
const SORTED_COLOR = '#7FFFD4';
const SECONDARY_COLOR = 'red';
var timeoutIdsCount = 0;

export default function SortingVisualizer(props) {

    const [array, setArray] = useState(createRandomArray(NUMBER_OF_BARS));

    const resetArray = () => {
        const array = createRandomArray(NUMBER_OF_BARS);
        setArray([...array]);
        changeBarsColor(PRIMARY_COLOR);
    }

    const changeBarsColor = (color) => {
        const arraysBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arraysBars.length; i++) {
            arraysBars[i].style.backgroundColor = color;
        }
    }

    useEffect(() => {
        resetArray();
        enableButtonClass();
    }, []);


    const mergeSort = () => {
        toggleButtonClass();
        const animations = getMergeSortAnimations(array);
        const jsSortedArray = array.slice().sort((a, b) => a - b);
        const jsSortedHeights = jsSortedArray.map(bar => `${bar}px`);

        for (let i = 0; i < animations.length; i++) {
            if (i === animations.length - 1) {
                setTimeout(() => {
                    toggleButtonClass();
                }, ANIMATION_SPEED_MS * i);
            }
            const arraysBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arraysBars[barOneIdx].style;
                const barTwoStyle = arraysBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                timeoutIdsCount = window.setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    if (color === PRIMARY_COLOR && jsSortedHeights[barOneIdx] === barOneStyle.height) {
                        barOneStyle.backgroundColor = SORTED_COLOR;
                    }
                }, i * ANIMATION_SPEED_MS);
            } else {
                timeoutIdsCount = window.setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arraysBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    if (jsSortedHeights[barOneIdx] === barOneStyle.height) {
                        barOneStyle.backgroundColor = SORTED_COLOR;
                    }
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    const heapSort = () => {
        toggleButtonClass();
        const animations = getHeapSortAnimations(array);
        const jsSortedArray = array.slice().sort((a, b) => a - b);
        const jsSortedHeights = jsSortedArray.map(bar => `${bar}px`);

        for (let i = 0; i < animations.length; i++) {
            if (i === animations.length - 1) {
                setTimeout(() => {
                    toggleButtonClass();
                }, ANIMATION_SPEED_MS * i);
            }
            const arraysBars = document.getElementsByClassName('array-bar');
            const isColorChange = (i % 4 !== 2) && (i % 4 !== 3);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arraysBars[barOneIdx].style;
                const barTwoStyle = arraysBars[barTwoIdx].style;
                const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                timeoutIdsCount = window.setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                timeoutIdsCount = window.setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arraysBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`
                    if (jsSortedHeights[barOneIdx] === barOneStyle.height) {
                        barOneStyle.backgroundColor = SORTED_COLOR;
                    }
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    const quickSort = () => {
        toggleButtonClass();
        const animations = getQuickSortAnimations(array);
        const jsSortedArray = array.slice().sort((a, b) => a - b);
        const jsSortedHeights = jsSortedArray.map(bar => `${bar}px`);

        for (let i = 0; i < animations.length; i++) {
            if (i === animations.length - 1) {
                setTimeout(() => {
                    toggleButtonClass();
                }, ANIMATION_SPEED_MS * i);
            }
            const arraysBars = document.getElementsByClassName('array-bar');
            const isColorChange = (i % 4 !== 2) && (i % 4 !== 3);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arraysBars[barOneIdx].style;
                const barTwoStyle = arraysBars[barTwoIdx].style;
                const color = (i % 4 === 0) ? SECONDARY_COLOR : PRIMARY_COLOR;
                timeoutIdsCount = window.setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                timeoutIdsCount = window.setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arraysBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    if (jsSortedHeights[barOneIdx] === barOneStyle.height) {
                        barOneStyle.backgroundColor = SORTED_COLOR;
                    }
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }


    const testSortingAlgorithms = () => {
        for (let i = 0; i < 100; i++) {
            const mainArray = createRandomArray(NUMBER_OF_BARS);
            const jsSortedArray = mainArray.slice();
            jsSortedArray.sort((a, b) => a - b);
            mergeSortAlgo(mainArray);
            for (let j = 0; j < mainArray.length; j++) {
                const element = mainArray[j];
                const jsElement = jsSortedArray[j];
                if (element !== jsElement) return false;
            }

            return console.log(true);
        }
    }

    const stopSorting = () => {
        while (timeoutIdsCount > 0) {
            window.clearTimeout(timeoutIdsCount); // will do nothing if no timeout with id is present
            timeoutIdsCount--;
        }
        enableButtonClass();
        resetArray();

    }

    const enableButtonClass = () => {
        for (let i = 0; i < 5; i++) {
            if (i === 0) {
                document.getElementById(`btn-${i}`).classList.remove('generate-btn-running');
                document.getElementById(`btn-${i}`).classList.add('generate-btn');
                document.getElementById(`btn-${i}`).disabled = false;
            } else if (i === 4) {
                document.getElementById(`btn-${i}`).classList.remove('stop-btn-running');
                document.getElementById(`btn-${i}`).classList.add('stop-btn');
                document.getElementById(`btn-${i}`).disabled = true;
            } else {
                document.getElementById(`btn-${i}`).classList.remove('toolbar-btn-running');
                document.getElementById(`btn-${i}`).classList.add('toolbar-btn');
                document.getElementById(`btn-${i}`).disabled = false;
            }

        }
    }

    const toggleButtonClass = () => {
        for (let i = 0; i < 5; i++) {
            const isDisabled = document.getElementById(`btn-${i}`).disabled
            if (i === 0) {
                document.getElementById(`btn-${i}`).classList.toggle('generate-btn-running');
                document.getElementById(`btn-${i}`).classList.toggle('generate-btn');
            } else if (i === 4) {
                document.getElementById(`btn-${i}`).classList.toggle('stop-btn-running');
                document.getElementById(`btn-${i}`).classList.toggle('stop-btn');
            } else {
                document.getElementById(`btn-${i}`).classList.toggle('toolbar-btn-running');
                document.getElementById(`btn-${i}`).classList.toggle('toolbar-btn');
            }
            document.getElementById(`btn-${i}`).disabled = !isDisabled;
        }
    };

    return (
        <div className="app-body">
            <div className="main-content-container">
                <Toolbar
                    resetArray={resetArray}
                    mergeSort={mergeSort}
                    heapSort={heapSort}
                    quickSort={quickSort}
                    stopSorting={stopSorting}
                ></Toolbar>
                <div className="main-message">Generate an Array and Choose which Sorting algorithm to Visualize!</div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`
                            }}></div>
                    ))}
                </div>
            </div>

        </div>
    );
} 
