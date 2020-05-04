import React, { useState, useEffect } from 'react';

import './Toolbar.css';


export default function Toolbar(props) {

    const { resetArray, mergeSort, heapSort, quickSort, stopSorting } = props;
    
    return (
        <div className="toolbar-container">
            <div className="main-logo">Sorting Visualizer</div>
            <div className="main-manu">
                {/* <button className="button" onClick={testSortingAlgorithms}>Test Sorting Algorithms</button> */}
                <button id="btn-4" className="stop-btn" onClick={stopSorting}>Stop!</button>
                <button id="btn-0" className="generate-btn" onClick={resetArray}>Generate New Array</button>
                <button id="btn-1" className="toolbar-btn" onClick={mergeSort}>Merge Sort</button>
                <button id="btn-2" className="toolbar-btn" onClick={heapSort}>Heap Sort</button>
                <button id="btn-3" className="toolbar-btn" onClick={quickSort}>Quick Sort</button>
            </div>
        </div>
    );
}











