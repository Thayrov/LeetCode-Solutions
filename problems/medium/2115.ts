/* 
2115. Find All Possible Recipes from Given Supplies

You have information about n different recipes. You are given a string array recipes and a 2D string array ingredients. The ith recipe has the name recipes[i], and you can create it if you have all the needed ingredients from ingredients[i]. A recipe can also be an ingredient for other recipes, i.e., ingredients[i] may contain a string that is in recipes.

You are also given a string array supplies containing all the ingredients that you initially have, and you have an infinite supply of all of them.

Return a list of all the recipes that you can create. You may return the answer in any order.

Note that two recipes may contain each other in their ingredients.

Example 1:
Input: recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
Output: ["bread"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".

Example 2:
Input: recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".

Example 3:
Input: recipes = ["bread","sandwich","burger"], ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich","burger"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
We can create "burger" since we have the ingredient "meat" and can create the ingredients "bread" and "sandwich".

Constraints:
n == recipes.length == ingredients.length
1 <= n <= 100
1 <= ingredients[i].length, supplies.length <= 100
1 <= recipes[i].length, ingredients[i][j].length, supplies[k].length <= 10
recipes[i], ingredients[i][j], and supplies[k] consist only of lowercase English letters.
All the values of recipes and supplies combined are unique.
Each ingredients[i] does not contain any duplicate values.

</> Typescript code:
*/

function findAllRecipes(
  recipes: string[],
  ingredients: string[][],
  supplies: string[]
): string[] {
  // Create a set for quick lookup of available supplies.
  const supplySet = new Set(supplies);
  // Create a set for quick lookup to check if a string is a recipe.
  const recipeSet = new Set(recipes);
  // Map to store the number of prerequisites (ingredients) needed for each recipe.
  const inDegree = new Map<string, number>();
  // Graph mapping: key is an ingredient (that is also a recipe) to the recipes that depend on it.
  const graph = new Map<string, string[]>();

  // Initialize inDegree for each recipe with 0 prerequisites.
  for (const r of recipes) inDegree.set(r, 0);

  // Build the dependency graph and update inDegrees for each recipe.
  for (let i = 0; i < recipes.length; i++) {
    // Loop through each ingredient required for the i-th recipe.
    for (const ing of ingredients[i]) {
      // If the ingredient is not in our initial supplies...
      if (!supplySet.has(ing)) {
        // ...and if it is also a recipe (thus can be created later)...
        if (recipeSet.has(ing)) {
          // Increase the prerequisite count for the current recipe.
          inDegree.set(recipes[i], (inDegree.get(recipes[i]) || 0) + 1);
          // Build or update the dependency graph: map the ingredient (recipe) to recipes that depend on it.
          if (!graph.has(ing)) graph.set(ing, []);
          graph.get(ing)!.push(recipes[i]);
        } else {
          // If the ingredient is neither a supply nor a recipe, mark the recipe as unbuildable.
          inDegree.set(recipes[i], Number.POSITIVE_INFINITY);
        }
      }
    }
  }

  // Queue to process recipes that can currently be made (i.e., with zero remaining prerequisites).
  const queue: string[] = [];
  // Initialize the queue with recipes that have no prerequisites.
  for (const r of recipes) {
    if (inDegree.get(r) === 0) queue.push(r);
  }

  // List to accumulate recipes that can be created.
  const result: string[] = [];
  // Process the queue until no further recipes can be made.
  while (queue.length) {
    // Remove the first recipe from the queue.
    const cur = queue.shift()!;
    // Add the recipe to the result as it can be created.
    result.push(cur);
    // If the current recipe is a dependency for other recipes, process them.
    if (graph.has(cur)) {
      for (const dependent of graph.get(cur)!) {
        // Skip if the dependent recipe was already marked as unbuildable.
        if (inDegree.get(dependent) === Number.POSITIVE_INFINITY) continue;
        // Decrement the prerequisite count for the dependent recipe.
        inDegree.set(dependent, inDegree.get(dependent)! - 1);
        // If all prerequisites are met, add the dependent recipe to the queue.
        if (inDegree.get(dependent) === 0) queue.push(dependent);
      }
    }
  }
  // Return all recipes that can be created.
  return result;
}
