import { getArticles } from "@/lib/articles/service";
import LearningArticleCard from "./_components/LearningArticleCard";

export default async function LearnDashboard() {
  const learnArticles = await getArticles({
    type: "learn",
    status: "published",
    includeContent: true,
  });

  //! Scratch Pad section for functions

  /**
   * totalFruit
   * Calculates the max. number of fruits that can be picked under conditions:
   *  - You only have two baskets that can hold only 1 type of fruit (a fruit type is fruit[i] number value) Ex: 1 = "apple", 2 = "cherry", etc
   *  - Starting from any tree, you must pick exactly one fruit from every tree while moving to the right
   *  - You must stop when you need a third type of fruit (as you have only two baskets each for 1 type of fruit - we dont want contamiination :D)
   *
   *
   * @params fruit - number[] -> Array of ints where fruits[i] represents the type of fruit on the tree `i`
   * @returns totalFruit - number -> the total amount of fruit picked up when starting at a tree before encounting a 3rd unique fruit tree
   *
   * @examples
   * totalFruit([1,2,1]) => 3 // Can pick from all trees as theres only two types
   * totalFruit([0,1,2,1]) => 3 // 4 fruit, 3 types, but 3 is the maximum in a row
   *
   * @screnarios
   *  - [ ] 1. Baskets Filled :
   *    - 1a. && new Unique fruit (3rd type of fruit)
   *      - [ ] 1a1. We stop the current 'window'
   *        - Tally up fruits in both baskets
   *        - Compare them w/ maxTotalFruit (Math.max(maxTotalFruits, currFruitTotal))
   *            currFruitTotal = The current amount of fruit in both left & right basket during this picking phrase
   *        - Figure out new windowPicking starting point
   *        - Calculate which & how much of the baskets to empty
   *            - [ ] 1a1a: Empty entire left basket, keep entire right -> [1,1,2,2,3,....]
   *            - [ ] 1a1b: Empty entire left basket, keep entire right -> [1,1,2,1,2,3,....]
   *            - [ ] 1a1c: Empty entirely 1 basket, and keep portions of the other (need to discard part of the remaining basket)
   *                  1a1c v1-> [1,1,2,1,3,....]  -> keeping basket of 1 but removing 2 of 1s so it only has 1 going into the next window
   *                  1a1c v2-> [1,2,2,1,2,3,....] -> keeping basket of 2 but rmeoving 2 of 2s as it goes into [2,3] window
   *    - 1b. fruit is within 1 of the filled baskets (3rd type of fruit)
   *      - [x] 1b1. fruit[i] is in left basket
   *        - Incrememnt fruitMap(fruit[i], +1)
   *      - [x] 1b2. fruit[i] is in right basket
   *        - Incrememnt fruitMap(fruit[i], +1)
   *  - [x] 2. Baskets Not Filled:
   *    - [x] 2a. Baskets Not Filled && 1st Unique fruit: -> Put in left basket
   *    - [x] 2b. Baskets Not Filled && 1st Unique fruit && 1stBasket has fruit[i]: -> Increment count in first basket
   *    - [x] 2c. Baskets Not Filled && 2nd Unique fruit: -> put in right basket
   */

  function totalFruit2(fruits: number[]): number {
    // maxTotalFruit
    let maxTotalFruit: number = 0;
    let currentTotalFruit: number = 0;
    // 2 pointers for last tree of type fruit found
    let leftFruitPtr: number;
    let rightFruitPtr: number;
    // map for storing total #s of fruits
    let fruitMap = new Map<number, number>();

    // iteration through our line of fruit trees
    for (let i = 0; i < fruits.length; i++) {
      console.log("Loop Start: i , fruits[i]", i, "-", fruits[i]);
      console.log("Loop Start: fruitMap ", fruitMap);
      console.log("Loop Start: leftFruitPtr", leftFruitPtr);
      console.log("Loop Start: rightFruitPtr", rightFruitPtr);

      // 1) Both baskets filled
      if (fruitMap.size == 2) {
        // && new Unique fruit (3rd type of fruit)
        if (!fruitMap.has(fruits[i])) {
          // console.log("New Fruit found baskets filled: ", fruits[i]);

          //total current Fruit vs maxFruitTotal:

          const [firstKey, secondKey] = Array.from(fruitMap.keys());

          maxTotalFruit = Math.max(maxTotalFruit, currentTotalFruit);

          console.log("figuring out which pointer to remove");
          if (leftFruitPtr! > rightFruitPtr!) {
            console.log("left > right");
            // keep left basekt but account fo rho wmany parts need to be removed
            let remainingFruit = leftFruitPtr! - rightFruitPtr!;
            // update baskets with remaining fruit count
            fruitMap.set(firstKey, remainingFruit);
            fruitMap.delete(secondKey);
            currentTotalFruit = remainingFruit - 1;

            //console.log("currentTotalFruit: ", currentTotalFruit);
          } else {
            console.log("right > left");
            // keep right basket
            let remainingFruit = rightFruitPtr! - leftFruitPtr!;
            fruitMap.set(secondKey, remainingFruit);
            fruitMap.delete(firstKey);
            currentTotalFruit = remainingFruit - 1;
            //console.log("currentTotalFruit: ", currentTotalFruit);
          }
          console.log("fruitMaps - Inside PTR: ", fruitMap);
        }

        // existing fruit
        if (fruitMap.has(fruits[i])) {
          console.log("fruit in basket somewhere");
          // increment count in fruitMap of fruit[i]
          let fruitCount = fruitMap.get(fruits[i]) || 0;
          //console.log("fruitCount: ", fruitCount);
          fruitMap.set(fruits[i], fruitCount + 1);
          //figure out if left or right pointer for fruits
          const [firstKey, secondKey] = Array.from(fruitMap.keys());
          // left basket
          if (fruits[i] === firstKey) {
            leftFruitPtr = i;
          }
          // right basket
          if (fruits[i] === secondKey) {
            rightFruitPtr = i;
          }
        }
      }

      // 2) Fruit baskets not filled
      if (fruitMap.size < 2) {
        // 2b. Fruit already in baskets
        if (fruitMap.has(fruits[i])) {
          console.log("fruit in basket somewhere");
          // increment count in fruitMap of fruit[i]
          let fruitCount = fruitMap.get(fruits[i]) || 0;
          //console.log("fruitCount: ", fruitCount);
          fruitMap.set(fruits[i], fruitCount + 1);
          const [firstKey, secondKey] = Array.from(fruitMap.keys());
          // left basket
          if (fruits[i] === firstKey) {
            leftFruitPtr = i;
          }
          // right basket
          if (fruits[i] === secondKey) {
            rightFruitPtr = i;
          }
        }

        // 2) Current fruit not in fruit baskets
        if (!fruitMap.has(fruits[i])) {
          // Add current fruit to fruit baskets
          // Is this left basket or right basket?

          //2a Left Basket
          if (fruitMap.size == 0) {
            leftFruitPtr = i;
            fruitMap.set(fruits[i], 1);
            leftFruitPtr = i;
            console.log("left basket add: ", fruits[i]);
          }
          //2c Right basket
          else {
            rightFruitPtr = i;
            fruitMap.set(fruits[i], 1);
          }
        }
      }

      currentTotalFruit += 1;
    }

    console.log("currentTotalFruit: ", currentTotalFruit);
    maxTotalFruit = Math.max(maxTotalFruit, currentTotalFruit);
    console.log("maxTotalFruit: ", maxTotalFruit);
    return maxTotalFruit;
  }

  function totalFruit(fruits: number[]): number {
    let maxFruitTotal: number;
    let currentFruitTotal: number;
    let fruitMap = new Map<number, number>();
    let leftBaskPtr: number, rightBaskPtr: number;

    // iterate through trees once
    for (let i = 0; i < fruits.length; i++) {
      console.log("i-fruits[i]: ", i, " - ", fruits[i]);
      // 1. Baskets Not Filled
      if (fruitMap.size < 2) {
        // fruit exist in basket?
        if (fruitMap.has(fruits[i])) {
          // find fruit count
          // update fruit count

          let fruitCount = fruitMap.get(fruits[i]) || 0;
          //console.log("fruitCount: ", fruitCount);
          fruitMap.set(fruits[i], fruitCount + 1);
        }
        // put fruit in left basket
        // put fruit in right basket
        if (!fruitMap.has(fruits[i])) {
          fruitMap.set(fruits[i], 1);
        }
      }

      // 2. Baskets Filled
      if (fruitMap.size === 2) {
      }
    }
    return 0;
  }

  // Tests
  let testFruits = [1, 1, 1, 2];
  // let testFruits = [1, 2, 1];
  // let testFruits = [0, 1, 2, 2];
  // let testFruits = [1, 2, 3, 2, 2];
  // let testFruits = [1, 0, 3, 4, 3];
  totalFruit(testFruits);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learnArticles.map((article) => (
          <LearningArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
