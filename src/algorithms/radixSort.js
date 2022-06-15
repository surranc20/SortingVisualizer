import { sleep } from "../helpers";
import {
    changeColor,
    swap,
    LOOKING_AT_COLOR,
    NORMAL_COLOR,
} from "./algoHelpers";

export const radixSort = async (array, delay, groupNum) => {
    const digit = (number, d) => {
        return Math.floor((number / Math.pow(10, (d))) % 10);
    }
    const barRefs = document.getElementsByClassName(`Bar ${groupNum}`);
    let maxElement = Number.MIN_VALUE;

    for (let i = 0; i < array.length; i++) {
        if (array[i].val > maxElement) {
            maxElement = array[i].val;
        }
    }
    let maxDigits = Math.floor(Math.log10(maxElement)) + 1;

    for (let d = 0; d < maxDigits; d++) {
        let freq_map = {}
        for (let n = 0; n < array.length; n++) {
            let dig = digit(array[n].val, d);
            changeColor(n, barRefs, LOOKING_AT_COLOR);
            await sleep(delay)
            if (freq_map[dig] === undefined) {
                freq_map[dig] = [[n, barRefs[n].style.height]];
            }
            else {
                freq_map[dig].push([n, barRefs[n].style.height]);
            }
            changeColor(n, barRefs, NORMAL_COLOR);

        }

        let a = [];
        Object.keys(freq_map).forEach(key => {
            freq_map[key].forEach(el => { a.push([array[el[0]].val, el[1]]) });

        });
        for (let n = 0; n < array.length; n++) {
            array[n].val = a[n][0];
            barRefs[n].style.height = a[n][1];


        }


    }


}