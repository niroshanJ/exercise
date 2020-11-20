const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Node developer
 * All the tasks including two bonus tasks are completed in asynchronousFizBuzz function.
 */

/**
 * Task 1, 2, 3, 4 and 5 are completed in below code
 * Task 1 - Print number with 1-100
 * Task 2 - Add 'FizzBuzz' program
 * Task 4 - error handling by enabling { withErrors: true }
 * Task 5 - save output to a file in project root
 * Bonus - maintain ascending order when file is saving
 *         slow option added into asynchronousFizBuzz
 */
const synchronousFizBuzz = () => {
    console.time('Synchronous fizzBuzz execution time');
    /**
    * Since the file should be saved in to the project root (not ./src)
    * filename is set into project root as below
    */
    const fileName = path.resolve(__dirname + './../sync-output.log');
    for (number = 1; number <= 100; number++) {
        let word = '';
        if (number % 15 == 0) {
            word = `FizzBuzz`;
        } else if (number % 5 == 0) {
            word = `Buzz`;
        } else if (number % 3 == 0) {
            word = `Fizz`;
        } else {
            // catch and handle errors
            try {
                word = getRandomWordSync({ withErrors: true });
            } catch (err) {
                word = "It shouldn't break anything!";
            }
        }
        /**
        * appendFileSync is used for the bonus task ascending order
        */
        fs.appendFileSync(fileName, `${number}: ${word}${os.EOL}`);
    }
    console.log(`Synchronous output is saved into ${fileName}`);
    console.timeEnd('Synchronous fizzBuzz execution time');
}
/**
 * 
 * This is a helper function to handle fizzBuzz word
 */
const generateFizzBuzzAsync = async (number) => {
    let word = '';
    if (number % 15 == 0) {
        word = `FizzBuzz`;
    } else if (number % 5 == 0) {
        word = `Buzz`;
    } else if (number % 3 == 0) {
        word = `Fizz`;
    } else {
        // catch and handle errors
        try {
            // add slowness by adding slow true
            word = await getRandomWord({ withErrors: true, slow: true });
        } catch (err) {
            word = "It shouldn't break anything!";
        }
    }
    // return the output as string
    return `${number}: ${word}`;
}

/**
 * Task 1, 2, 3, 4, 5 and bonus tasks are completed in below code
 * Task 1 - Print number with 1-100
 * Task 2 - Add 'FizzBuzz' program
 * Task 3 - use of asynchronous function getRandomWord
 * Task 4 - error handling by enabling { withErrors: true }
 * Task 5 - save output to a file in project root
 * Bonus - solution run in less than 1000ms with enabling { slow: true }
 *         maintain ascending order when file is saving
 */
const asynchronousFizBuzz = async () => {
    console.time('Asynchronous fizzBuzz execution time with slowness');
    const fizzBuzzWords = [];
    for (number = 1; number <= 100; number++) {
        fizzBuzzWords.push(generateFizzBuzzAsync(number));
    }
    /**
     * Promise all is used for resolve all the generateFizzBuzzAsync promises
     * Since it takes an 'iterable of promises' as an input
     * it will be easier to maintain the order as well
     */
    Promise.all(fizzBuzzWords).then(completedfizzBuzzWords => {
        /**
         * Since the file should be saved in to the project root (not ./src)
         * filename is set into project root as below
         */
        const fileName = path.resolve(__dirname + './../async-output.log');
        fs.appendFileSync(fileName, completedfizzBuzzWords.join(os.EOL));
        console.log(`Asynchronous output is saved into ${fileName}`);
        console.timeEnd('Asynchronous fizzBuzz execution time with slowness');
    });
}

/**
 * Below lines were added to reset the output files
 * otherwise it getting append with old data
 */
fs.writeFileSync(path.resolve(`${__dirname}./../sync-output.log`), "");
fs.writeFileSync(path.resolve(`${__dirname}./../async-output.log`), "");

/**
 * uncomment any below funtion
 * to run the synchronous/asynchronous 'fizzBuzz'
 */
synchronousFizBuzz();
asynchronousFizBuzz();
