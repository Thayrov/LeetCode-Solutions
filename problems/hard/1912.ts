/*
1912. Design Movie Rental System

You have a movie renting company consisting of n shops. You want to implement a renting system that supports searching for, booking, and returning movies. The system should also support generating a report of the currently rented movies.
Each movie is given as a 2D integer array entries where entries[i] = [shopi, moviei, pricei] indicates that there is a copy of movie moviei at shop shopi with a rental price of pricei. Each shop carries at most one copy of a movie moviei.
The system should support the following functions:
Search: Finds the cheapest 5 shops that have an unrented copy of a given movie. The shops should be sorted by price in ascending order, and in case of a tie, the one with the smaller shopi should appear first. If there are less than 5 matching shops, then all of them should be returned. If no shop has an unrented copy, then an empty list should be returned.
Rent: Rents an unrented copy of a given movie from a given shop.
Drop: Drops off a previously rented copy of a given movie at a given shop.
Report: Returns the cheapest 5 rented movies (possibly of the same movie ID) as a 2D list res where res[j] = [shopj, moviej] describes that the jth cheapest rented movie moviej was rented from the shop shopj. The movies in res should be sorted by price in ascending order, and in case of a tie, the one with the smaller shopj should appear first, and if there is still tie, the one with the smaller moviej should appear first. If there are fewer than 5 rented movies, then all of them should be returned. If no movies are currently being rented, then an empty list should be returned.
Implement the MovieRentingSystem class:
MovieRentingSystem(int n, int[][] entries) Initializes the MovieRentingSystem object with n shops and the movies in entries.
List<Integer> search(int movie) Returns a list of shops that have an unrented copy of the given movie as described above.
void rent(int shop, int movie) Rents the given movie from the given shop.
void drop(int shop, int movie) Drops off a previously rented movie at the given shop.
List<List<Integer>> report() Returns a list of cheapest rented movies as described above.
Note: The test cases will be generated such that rent will only be called if the shop has an unrented copy of the movie, and drop will only be called if the shop had previously rented out the movie.

Example 1:
Input
["MovieRentingSystem", "search", "rent", "rent", "report", "drop", "search"]
[[3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]], [1], [0, 1], [1, 2], [], [1, 2], [2]]
Output
[null, [1, 0, 2], null, null, [[0, 1], [1, 2]], null, [0, 1]]
Explanation
MovieRentingSystem movieRentingSystem = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
movieRentingSystem.search(1);  // return [1, 0, 2], Movies of ID 1 are unrented at shops 1, 0, and 2. Shop 1 is cheapest; shop 0 and 2 are the same price, so order by shop number.
movieRentingSystem.rent(0, 1); // Rent movie 1 from shop 0. Unrented movies at shop 0 are now [2,3].
movieRentingSystem.rent(1, 2); // Rent movie 2 from shop 1. Unrented movies at shop 1 are now [1].
movieRentingSystem.report();   // return [[0, 1], [1, 2]]. Movie 1 from shop 0 is cheapest, followed by movie 2 from shop 1.
movieRentingSystem.drop(1, 2); // Drop off movie 2 at shop 1. Unrented movies at shop 1 are now [1,2].
movieRentingSystem.search(2);  // return [0, 1]. Movies of ID 2 are unrented at shops 0 and 1. Shop 0 is cheapest, followed by shop 1.
 
Constraints:
1 <= n <= 3 * 10^5
1 <= entries.length <= 10^5
0 <= shopi < n
1 <= moviei, pricei <= 10^4
Each shop carries at most one copy of a movie moviei.
At most 105 calls in total will be made to search, rent, drop and report.

</> Typescript code:
*/

// Define Entry type: tuple of [price, shop, movie]
type Entry = [number, number, number];

// Custom MinHeap data structure (binary heap)
// Supports push/pop/peek in O(log n)
class MyHeap {
    private data: Entry[] = [];
    private cmp: (a: Entry, b: Entry) => number;

    constructor(cmp: (a: Entry, b: Entry) => number) {
        // Pass a comparator function for sorting entries in the heap
        this.cmp = cmp;
    }

    // Insert a new element
    push(x: Entry) {
        this.data.push(x);
        this.bubbleUp(this.data.length - 1);
    }

    // Remove and return the smallest element
    pop(): Entry | undefined {
        if (this.data.length === 0) return;
        const res = this.data[0]; // root (min element)
        const last = this.data.pop()!; // pop last element
        if (this.data.length > 0) {
            this.data[0] = last;     // move last to root
            this.bubbleDown(0);      // re-heapify downward
        }
        return res;
    }

    // Look at the smallest element without removing
    peek(): Entry | undefined {
        return this.data[0];
    }

    // Fix heap upwards from index i
    private bubbleUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1; // parent index
            if (this.cmp(this.data[i], this.data[p]) < 0) {
                // swap if child < parent
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                i = p;
            } else break;
        }
    }

    // Fix heap downwards from index i
    private bubbleDown(i: number) {
        const n = this.data.length;
        while (true) {
            let small = i;
            const l = i * 2 + 1, r = i * 2 + 2; // children
            if (l < n && this.cmp(this.data[l], this.data[small]) < 0) small = l;
            if (r < n && this.cmp(this.data[r], this.data[small]) < 0) small = r;
            if (small !== i) {
                [this.data[i], this.data[small]] = [this.data[small], this.data[i]];
                i = small;
            } else break;
        }
    }
}

// Main MovieRentingSystem class
class MovieRentingSystem {
    // Maps each [shop,movie] key -> price
    private priceMap: Map<string, number> = new Map();
    // For each movie -> a minHeap of available shops sorted by [price, shop]
    private available: Map<number, MyHeap> = new Map();
    // Global minHeap of rented movies sorted by [price, shop, movie]
    private rentedHeap: MyHeap;
    // Active sets: track currently available keys and currently rented keys
    private availSet: Set<string> = new Set();
    private rentedSet: Set<string> = new Set();

    constructor(n: number, entries: number[][]) {
        // Comparator for rentedHeap → first by price, then shop, then movie
        this.rentedHeap = new MyHeap((a, b) =>
            a[0] === b[0]
                ? a[1] === b[1]
                    ? a[2] - b[2] // tie: smaller movie id
                    : a[1] - b[1] // tie: smaller shop id
                : a[0] - b[0]     // lowest price first
        );

        // Load all initial entries
        for (const [shop, movie, price] of entries) {
            const key = `${shop},${movie}`;
            this.priceMap.set(key, price);

            // If no heap exists for this movie, create one
            if (!this.available.has(movie)) {
                this.available.set(
                    movie,
                    new MyHeap((a, b) =>
                        a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]
                    ) // sort by price, then shop
                );
            }
            // Push entry into the per-movie available heap
            this.available.get(movie)!.push([price, shop, movie]);
            // Mark as available
            this.availSet.add(key);
        }
    }

    // Search top 5 cheapest shops for a given movie
    search(movie: number): number[] {
        if (!this.available.has(movie)) return [];
        const heap = this.available.get(movie)!;
        const res: number[] = [];
        const temp: Entry[] = [];
        const seen = new Set<string>(); // ensure no duplicates this call

        // Extract up to 5 valid unique entries
        while (res.length < 5 && heap.peek()) {
            const [price, shop, mov] = heap.pop()!;
            const key = `${shop},${mov}`;
            if (this.availSet.has(key) && !seen.has(key)) {
                res.push(shop);               // record shop result
                seen.add(key);                // mark as seen
                temp.push([price, shop, mov]); // keep for restoration
            }
            // stale or duplicate entries are discarded
        }
        // Restore the valid entries popped
        for (const e of temp) heap.push(e);
        return res;
    }

    // Rent a movie: remove from available, add to rented
    rent(shop: number, movie: number): void {
        const key = `${shop},${movie}`;
        this.availSet.delete(key); // no longer available
        this.rentedSet.add(key);   // now rented
        this.rentedHeap.push([this.priceMap.get(key)!, shop, movie]); // enter rented heap
    }

    // Drop returns a rented movie: remove from rented, re-add to available
    drop(shop: number, movie: number): void {
        const key = `${shop},${movie}`;
        this.rentedSet.delete(key); // no longer rented
        this.availSet.add(key);     // back to available
        // push back into that movie's heap
        this.available.get(movie)!.push([this.priceMap.get(key)!, shop, movie]);
    }

    // Report top 5 rented movies globally
    report(): number[][] {
        const res: number[][] = [];
        const temp: Entry[] = [];
        const seen = new Set<string>();

        // Extract up to 5 valid unique rented entries
        while (res.length < 5 && this.rentedHeap.peek()) {
            const [price, shop, mov] = this.rentedHeap.pop()!;
            const key = `${shop},${mov}`;
            if (this.rentedSet.has(key) && !seen.has(key)) {
                res.push([shop, mov]); // add to answer
                seen.add(key);         // avoid duplication
                temp.push([price, shop, mov]); // restore later
            }
        }
        // Restore valid entries
        for (const e of temp) this.rentedHeap.push(e);
        return res;
    }
}

/**
 * Your MovieRentingSystem object will be instantiated and called as such:
 * var obj = new MovieRentingSystem(n, entries)
 * var param_1 = obj.search(movie)
 * obj.rent(shop,movie)
 * obj.drop(shop,movie)
 * var param_4 = obj.report()
 */
