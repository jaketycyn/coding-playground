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
   *  - [ ] 1. Baskets Filled && new Unique fruit (3rd type of fruit)
   *    - [ ]Find totalAmount of fruit picked at this time & compare to maxTotal historically
   *    - [ ]Figure out new starting 'window/picking' point
   *      - [ ] Do we need to remove both fruits existing? Or just one?
   *  - [ ] 2. Baskets Not Filled && new Unique fruit:
   *    - [ ] 2a. Baskets Not Filled && 1st Unique fruit: -> Put in left basket
   *    - [ ] 2b. Baskets Not Filled && 2nd Unique fruit: -> put in right basket
   *  - [ ] 3. Baskets Are Filled && existing fruit picked
   *    - [ ] 3a. Baskets Are Filled && existing fruit picked in left basket -> update left Basket total & ptr to last index of picked left fruit
   *    - [ ] 3b. Baskets Are Filled && existing fruit picked in right basket
   *
   */

  function totalFruit(fruits: number[]): number {
    // maxTotalFruit
    let maxTotalFruit: number = 0;
    // 2 pointers for last tree of type fruit found
    let leftFruitPtr: number;
    let rightFruitPtr: number;
    // map for storing total #s of fruits
    let fruitMap = new Map<number, number>();

    // iteration through our line of fruit trees
    for (let i = 0; i < fruits.length; i++) {
      console.log("Loop Start: ", i);
      console.log("FruitMap: ", fruitMap);
      // 1. Fruit baskets not filled
      if (fruitMap.size < 2) {
        // 2. Fruit already in baskets
        if (fruitMap.has(fruits[i])) {
          console.log("fruit in basket somewhere");
        }

        // 3. Current fruit not in fruit baskets
        if (!fruitMap.has(fruits[i])) {
          // Add current fruit to fruit baskets
          // Is this left basket or right basket?

          // Left Basket
          if (fruitMap.size == 0) {
            leftFruitPtr = i;
            fruitMap.set(fruits[i], 1);
            console.log("left basket add: ", fruits[i]);
          }
          // Right basket
          else {
            rightFruitPtr = i;
            fruitMap.set(fruits[i], 1);
          }
        }
      }
    }

    return maxTotalFruit;
  }

  // Tests
  let testFruits = [1, 1, 2, 1, 3, 2, 3, 2];
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
