export default function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    const size = array.length - 1; 
    quickSortAnimation(array, 0, size, auxiliaryArray, animations);

    return animations;
}


function quickSortAnimation(mainArray, p, r, auxiliaryArray, animations) {
    if (p < r) {
        const q = partitionAnimation(mainArray, p, r, auxiliaryArray, animations);
        quickSortAnimation(mainArray, p, q-1, auxiliaryArray, animations);
        quickSortAnimation(mainArray, q, r, auxiliaryArray, animations);
    }

    return mainArray;
}

function partitionAnimation(mainArray, p, r, auxiliaryArray, animations) {
    let pivotIdx = getRandomIntFromInterval(p+1, r);
    const pivot = auxiliaryArray[pivotIdx];
    swapAnimation(mainArray, pivotIdx, r, auxiliaryArray, animations);
    let i = p - 1;
    for(let j = p; j < r; j++) {
        if (mainArray[j] <= pivot) {
            i++;
            swapAnimation(mainArray, i, j, auxiliaryArray, animations);
        }
    }
    pivotIdx = i+1;
    swapAnimation(mainArray, pivotIdx, r, auxiliaryArray, animations);

    return pivotIdx;
    
}

function swapAnimation(mainArray, i, j, auxiliaryArray, animations) {
    animations.push([i, j], [i, j]);
    animations.push([i, auxiliaryArray[j]]);
    mainArray[i] = auxiliaryArray[j];
    animations.push([j, auxiliaryArray[i]]);
    mainArray[j] = auxiliaryArray[i];
    auxiliaryArray[i] = mainArray[i];
    auxiliaryArray[j] = mainArray[j];

    return mainArray;
}

// const nums = createRandomArray(100);


// function createRandomArray(size) {
//     let nums = []
//     for (let i = 0; i < size; i++) {
//         nums.push(getRandomIntFromInterval(0, 1000));
//     }

//     return nums;
// }

// console.log(quickSort(nums, 0, nums.length -1));


//////// Original Quick Sort ///////////


// function quickSort(array, p, r) {
//     if (p < r) {
//         const q = partition(array, p, r);
//         quickSort(array, p, q-1);
//         quickSort(array, q, r);
//     }

//     return array;
// }

// function partition(array, p, r) {
//     let pivotIdx = getRandomIntFromInterval(p+1, r);
//     const pivot = array[pivotIdx];
//     array[pivotIdx] = array[r];
//     array[r] = pivot;
//     let i = p - 1;
//     for(let j = p; j < r; j++) {
//         if (array[j] <= pivot) {
//             i++;
//             swap(array, i, j);
//         }
//     }
//     pivotIdx = i+1;
//     swap(array, pivotIdx, r);

//     return pivotIdx;
    
// }

function getRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}



