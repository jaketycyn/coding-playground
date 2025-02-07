// Solution 1 - My first fun RNG version
function sumZero(n: number): number[] {
  let arrTotal = 0;
  let returnArr: number[] = [];
  // numMap containing unique elements
  let numMap = new Map<number, number>();
  // randomInt Function
  const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Special case for n=1 since we need exactly [0]
  if (n === 1) {
    return [0];
  }

  // Handle everything but last 2 iterations
  for (let i = 0; i < n - 1; i++) {
    // rng number selection - keep trying until we get a unique random number
    let randomNum = getRandomInt(-2 * n, 2 * n);
    while (numMap.has(randomNum)) {
      randomNum = getRandomInt(-2 * n, 2 * n);
    }
    // add number to Array & update sumVar & map for uniqueness
    returnArr.push(randomNum);
    numMap.set(randomNum, i);
    arrTotal += randomNum;
  }

  // Second to last number
  let secondToLast = getRandomInt(-2 * n, 2 * n);
  while (
    numMap.has(secondToLast) ||
    secondToLast === 0 ||
    secondToLast === -arrTotal
  ) {
    secondToLast = getRandomInt(-2 * n, 2 * n);
  }

  // Last number, do oppposite - balancing number
  const lastNumber = -arrTotal;

  if (numMap.has(lastNumber) || lastNumber === 0) {
    return sumZero(n);
  }

  returnArr.push(lastNumber);

  console.log("returnARr: ", returnArr);
  return returnArr;
}

// Solution 2 - My other alternating version w/ 0 as last digit for odd value of N
function sumZero2(n: number): number[] {
  // add positive number on even index 0-2-4-6,etc, negative on odd index 1,3,5. If n is odd last number is 0 itself
  // arr for holding numbers
  let returnArr: number[] = [];

  let startNum: number = 1;

  /* Example Situation: 
    n = 4
    i=0; [-1]
    i=1; [-1, 1]  -> startNum ++
    i=2; [-1, 1, -2, 2]
    */

  for (let i = 0; i < n - 1; i++) {
    // even index, but odd n value
    if (i % 2 === 0) {
      returnArr.push(-startNum);
    } else {
      returnArr.push(startNum);
      startNum++;
    }
  }

  // if n is odd lastNum = 0;
  let lastNum: number;
  if (n % 2 !== 0) {
    lastNum = 0;
    returnArr.push(lastNum);
  } else {
    returnArr.push(startNum);
  }

  // return w/ number[]
  console.log("returnArr: ", returnArr);
  return returnArr;
}

// Solution 3 - Optimal Solution for speed
function sumZero3(n: number): number[] {
  // Array to store our pairs of numbers that sum to zero
  const returnArr: number[] = [];

  // Generate pairs of positive and negative numbers
  // We only need to up to n/2 since each iteration adds 2 numbers
  for (let currNum = 1; currNum <= Math.floor(n / 2); currNum++) {
    // Push both positive and negative number
    returnArr.push(currNum, currNum * -1);
  }

  // if n is odd, add 0 to reach target length
  if (n % 2 !== 0) {
    returnArr.push(0);
  }
  return returnArr;
}
