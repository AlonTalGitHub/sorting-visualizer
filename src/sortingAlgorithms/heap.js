export default function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    heapSortAnimation(array, auxiliaryArray, animations);

    return animations;
}


function heapSortAnimation(mainArray, auxiliaryArray, animations) {
    buildMaxHeapAnimation(mainArray, auxiliaryArray, animations);
    let heapSize = mainArray.length - 1
    for (let i = heapSize; i > 0; i--) {
        animations.push([0, i], [0, i]);
        animations.push([0, auxiliaryArray[i]]);
        mainArray[0] = auxiliaryArray[i];
        animations.push([i, auxiliaryArray[0]]);
        mainArray[i] = auxiliaryArray[0];
        maxHeapifyAnimation(auxiliaryArray, heapSize, 0, mainArray, animations)
        heapSize--;
    }
}

function buildMaxHeapAnimation(mainArray, auxiliaryArray, animations) {
    const size = mainArray.length;

    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        maxHeapifyAnimation(mainArray, size, i, auxiliaryArray, animations);
    }

    return animations;
}

function maxHeapifyAnimation(mainArray, size, i, auxiliaryArray, animations) {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (auxiliaryArray[right] > auxiliaryArray[left]) {

        if (right < size && auxiliaryArray[right] > auxiliaryArray[largest]) {
            animations.push([right, largest], [right, largest]);
            largest = right
        }
    } else {

        if (left < size && auxiliaryArray[left] > auxiliaryArray[largest]) {
            animations.push([left, largest], [left, largest]);
            largest = left;
        }
    }
    if (largest !== i) {
        animations.push([i, auxiliaryArray[largest]]);
        mainArray[i] = auxiliaryArray[largest];
        mainArray[largest] = auxiliaryArray[i];
        animations.push([largest, auxiliaryArray[i]]);
        mainArray[largest] = auxiliaryArray[i];
        auxiliaryArray[i] = mainArray[i];
        auxiliaryArray[largest] = mainArray[largest];
        maxHeapifyAnimation(mainArray, size, largest, auxiliaryArray, animations);
    }

    return animations;

}



///////// original functions /////////

function maxHeapify(array, size, i) {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (right < size && array[right] > array[largest]) {
        largest = right
    }

    if (left < size && array[left] > array[largest]) {
        largest = left;
    }

    if (largest !== i) {
        const temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;
        maxHeapify(array, size, largest);
    }
    return array

}

function buildMaxHeap(array) {
    const size = array.length;

    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        console.log(i);

        maxHeapify(array, size, i)
    }

    return array;
}


function heapSort(array) {
    buildMaxHeap(array);
    let heapSize = array.length - 1
    for (let i = heapSize; i > 0; i--) {
        const temp = array[i];
        array[i] = array[0];
        array[0] = temp;
        maxHeapify(array, heapSize, 0)
        heapSize--;
    }

    return array;
}
