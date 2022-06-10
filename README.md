Use this link to use the visualizer: https://prod.d2twrrqznvwsbb.amplifyapp.com/

This project provides a visual representation of the following sorting algorithms: Selection Sort, Bubble Sort, Quick Sort, Concurrent Quick Sort, and Merge Sort. It uses vanilla JavaScript to animate the sorting algorithms and React for everything else. MaterialUI components were used to quickly create a professional looking UI. 

A bar’s “value” is represented by its height. After the sorting algorithm is completed, the bars should appear lined up smallest to largest. Bars can be one of three colors: aquamarine, orange, and purple.
1.	A bar will be purple if it’s swapping places with another bar.
2.	A bar will be orange if its value is being compared with the value of another bar.
3.	A bar will be aquamarine if it’s not currently being swapped or analyzed. 

The application features a responsive design. If the user’s browser window is wide enough, they will be able to control the speed of the sorting algorithm and the number of bars to be sorted. Otherwise, a predetermined number of bars and sorting speed will be used.

Adding support for more sorting algorithms is simple. Just do the following: 
1.	Create a new file in the algorithms folder that contains your sorting algorithm.
2.	Create and export your sorting function. The function should be asynchronous and take the following parameters: array, delay, and groupNum.
3.	At this point, I recommend that you implement the sorting algorithm you are currently adding without worrying about any animations.
4.	Once you are sure you have a correct implementation of algorithm, use bubble sort and merge sort as an example of how to animate the bars. 
a.	Please note that you must use the sleep function after changing the color of a bar. Failing to do so will not allow the user time to see the bar switch colors. Because of this, the swap helper function is asynchronous. Make sure you use the await keyword before it.
b.	When comparing bars, remember to compare the actual values (i.e bar.val instead of bar). 
5.	After the sorting function is implemented, add it to the list sortingAlgosList in the algoHelpers file.
6.	Add the sorting function to the getAlgoFromString function in algoHelpers. 

After doing this your algorithm should appear in the algorithms drop down!


Known bugs: If the number of bars is large and the user decreases the size of the window the bars can glitch 
