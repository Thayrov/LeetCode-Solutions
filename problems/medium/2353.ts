/*
2353. Design a Food Rating System

Design a food rating system that can do the following:
Modify the rating of a food item listed in the system.
Return the highest-rated food item for a type of cuisine in the system.
Implement the FoodRatings class:
FoodRatings(String[] foods, String[] cuisines, int[] ratings) Initializes the system. The food items are described by foods, cuisines and ratings, all of which have a length of n.
foods[i] is the name of the ith food,
cuisines[i] is the type of cuisine of the ith food, and
ratings[i] is the initial rating of the ith food.
void changeRating(String food, int newRating) Changes the rating of the food item with the name food.
String highestRated(String cuisine) Returns the name of the food item that has the highest rating for the given type of cuisine. If there is a tie, return the item with the lexicographically smaller name.
Note that a string x is lexicographically smaller than string y if x comes before y in dictionary order, that is, either x is a prefix of y, or if i is the first position such that x[i] != y[i], then x[i] comes before y[i] in alphabetic order.

Example 1:
Input
["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
[[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
Output
[null, "kimchi", "ramen", null, "sushi", null, "ramen"]
Explanation
FoodRatings foodRatings = new FoodRatings(["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]);
foodRatings.highestRated("korean"); // return "kimchi"
                                    // "kimchi" is the highest rated korean food with a rating of 9.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // "ramen" is the highest rated japanese food with a rating of 14.
foodRatings.changeRating("sushi", 16); // "sushi" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "sushi"
                                      // "sushi" is the highest rated japanese food with a rating of 16.
foodRatings.changeRating("ramen", 16); // "ramen" now has a rating of 16.
foodRatings.highestRated("japanese"); // return "ramen"
                                      // Both "sushi" and "ramen" have a rating of 16.
                                      // However, "ramen" is lexicographically smaller than "sushi".
 
Constraints:
1 <= n <= 2 * 10^4
n == foods.length == cuisines.length == ratings.length
1 <= foods[i].length, cuisines[i].length <= 10
foods[i], cuisines[i] consist of lowercase English letters.
1 <= ratings[i] <= 10^8
All the strings in foods are distinct.
food will be the name of a food item in the system across all calls to changeRating.
cuisine will be a type of cuisine of at least one food item in the system across all calls to highestRated.
At most 2 * 10^4 calls in total will be made to changeRating and highestRated.

</> Typescript code:
*/

class FoodRatings {
    // Map from food name -> cuisine
    private foodToCuisine: Map<string, string>
    // Map from food name -> its current rating
    private foodToRating: Map<string, number>
    // Map from cuisine -> max-heap of [rating, food]
    private cuisineToHeap: Map<string, [number, string][]>

    constructor(foods: string[], cuisines: string[], ratings: number[]) {
        this.foodToCuisine = new Map()
        this.foodToRating = new Map()
        this.cuisineToHeap = new Map()

        // Initialize structures with given arrays
        for (let i = 0; i < foods.length; i++) {
            const food = foods[i]
            const cuisine = cuisines[i]
            const rating = ratings[i]

            // Register mapping of food to its cuisine
            this.foodToCuisine.set(food, cuisine)
            // Register mapping of food to its rating
            this.foodToRating.set(food, rating)

            // Ensure cuisine has its own heap initialized
            if (!this.cuisineToHeap.has(cuisine)) {
                this.cuisineToHeap.set(cuisine, [])
            }

            // Push the initial (rating, food) into cuisine's heap
            this.pushHeap(this.cuisineToHeap.get(cuisine)!, [rating, food])
        }
    }

    // Update the rating of a given food
    changeRating(food: string, newRating: number): void {
        const cuisine = this.foodToCuisine.get(food)! // Get cuisine of the food
        this.foodToRating.set(food, newRating) // Update its rating in map
        // Push new entry into the cuisine's heap
        // (old values remain but are lazily removed when encountered)
        this.pushHeap(this.cuisineToHeap.get(cuisine)!, [newRating, food])
    }

    // Get the highest rated food for a given cuisine
    highestRated(cuisine: string): string {
        const heap = this.cuisineToHeap.get(cuisine)!
        while (true) {
            const [rating, food] = heap[0]
            // Validate heap's top entry against latest rating
            if (this.foodToRating.get(food)! === rating) {
                return food // Valid entry found at top
            }
            // If outdated rating, remove it and retry
            this.popHeap(heap)
        }
    }

    // Insert new entry into heap and bubble up
    private pushHeap(heap: [number, string][], item: [number, string]) {
        heap.push(item)
        let i = heap.length - 1
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2)
            if (this.compare(heap[i], heap[parent]) > 0) {
                // Swap with parent if child is "better"
                ;[heap[parent], heap[i]] = [heap[i], heap[parent]]
                i = parent
            } else break
        }
    }

    // Remove root element (top) and bubble down
    private popHeap(heap: [number, string][]) {
        if (heap.length === 1) {
            heap.pop()
            return
        }
        // Replace root with last element, then bubble down
        heap[0] = heap.pop()!
        let i = 0
        while (true) {
            let left = 2 * i + 1,
                right = 2 * i + 2,
                best = i

            // Compare left child
            if (left < heap.length && this.compare(heap[left], heap[best]) > 0) {
                best = left
            }
            // Compare right child
            if (right < heap.length && this.compare(heap[right], heap[best]) > 0) {
                best = right
            }
            if (best === i) break // Already satisfies heap property
            ;[heap[i], heap[best]] = [heap[best], heap[i]]
            i = best
        }
    }

    // Comparator: higher rating first; if tie, lexicographically smaller food
    private compare(a: [number, string], b: [number, string]): number {
        if (a[0] !== b[0]) {
            return a[0] - b[0] // Larger rating = "better"
        }
        // If ratings equal, smaller string wins
        return b[1].localeCompare(a[1])
    }
}

/**
 * Your FoodRatings object will be instantiated and called as such:
 * var obj = new FoodRatings(foods, cuisines, ratings)
 * obj.changeRating(food,newRating)
 * var param_2 = obj.highestRated(cuisine)
 */
