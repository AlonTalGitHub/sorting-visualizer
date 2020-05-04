export default function createRandomArray(size) {
    const array = []
    for (let i = 0; i < size; i++) {
        array.push(getRandomIntFromInterval(5, 500));
    }

    return array;
}

function getRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}

export function checkSortedBar(mainArray, i) {
    const jsSortedArray = mainArray.slice();
    jsSortedArray.sort((a, b) => a - b);
    if (mainArray[i] !== jsSortedArray[i]) return false;
    return true;
}