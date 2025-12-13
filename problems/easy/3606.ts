/*
3606. Coupon Code Validator

You are given three arrays of length n that describe the properties of n coupons: code, businessLine, and isActive. The ith coupon has:
code[i]: a string representing the coupon identifier.
businessLine[i]: a string denoting the business category of the coupon.
isActive[i]: a boolean indicating whether the coupon is currently active.
A coupon is considered valid if all of the following conditions hold:
code[i] is non-empty and consists only of alphanumeric characters (a-z, A-Z, 0-9) and underscores (_).
businessLine[i] is one of the following four categories: "electronics", "grocery", "pharmacy", "restaurant".
isActive[i] is true.
Return an array of the codes of all valid coupons, sorted first by their businessLine in the order: "electronics", "grocery", "pharmacy", "restaurant", and then by code in lexicographical (ascending) order within each category.

Example 1:
Input: code = ["SAVE20","","PHARMA5","SAVE@20"], businessLine = ["restaurant","grocery","pharmacy","restaurant"], isActive = [true,true,true,true]
Output: ["PHARMA5","SAVE20"]
Explanation:
First coupon is valid.
Second coupon has empty code (invalid).
Third coupon is valid.
Fourth coupon has special character @ (invalid).

Example 2:
Input: code = ["GROCERY15","ELECTRONICS_50","DISCOUNT10"], businessLine = ["grocery","electronics","invalid"], isActive = [false,true,true]
Output: ["ELECTRONICS_50"]
Explanation:
First coupon is inactive (invalid).
Second coupon is valid.
Third coupon has invalid business line (invalid).

Constraints:
n == code.length == businessLine.length == isActive.length
1 <= n <= 100
0 <= code[i].length, businessLine[i].length <= 100
code[i] and businessLine[i] consist of printable ASCII characters.
isActive[i] is either true or false.

</> Typescript code:
*/

function validateCoupons(code: string[], businessLine: string[], isActive: boolean[]): string[] {
    // We pre-compile the regular expression for code validation.
    // ^ indicates start of string, $ indicates end.
    // [a-zA-Z0-9_] matches any alphanumeric char or underscore.
    // + ensures it matches 1 or more characters (non-empty check).
    const validRegex = /^[a-zA-Z0-9_]+$/;

    // We use a "bucket" strategy to handle the custom sorting order efficiently.
    // Instead of a complex sort comparator later, we group valid coupons by category immediately.
    // This object also serves as our whitelist for valid business lines.
    const buckets: Record<string, string[]> = {
        "electronics": [],
        "grocery": [],
        "pharmacy": [],
        "restaurant": []
    };

    // Cache the length of the input arrays for the loop condition.
    const n = code.length;

    // Iterate through all coupons exactly once (O(N)).
    for (let i = 0; i < n; i++) {
        // Optimization: Check the boolean flag first. 
        // It's the cheapest check computationally. If inactive, skip immediately.
        if (!isActive[i]) continue;
        
        // Retrieve the current business line.
        const bl = businessLine[i];

        // Check if the business line exists in our buckets object.
        // This acts as the validation that businessLine is one of the 4 allowed types.
        // If 'bl' is not a key in buckets, it's undefined (falsy), so we skip.
        if (!buckets[bl]) continue;

        // Retrieve the current code.
        const c = code[i];

        // Validate the code string.
        // 1. c.length > 0: Explicit check for empty strings (though the regex + handles it, this is often faster).
        // 2. validRegex.test(c): Checks if it contains only allowed characters.
        if (c.length > 0 && validRegex.test(c)) {
            // If all conditions pass, push the code into the specific category bucket.
            buckets[bl].push(c);
        }
    }

    // Now we sort each bucket individually.
    // Since we need lexicographical (ascending) order for codes within the same category,
    // the default Array.prototype.sort() works perfectly for strings.
    buckets["electronics"].sort();
    buckets["grocery"].sort();
    buckets["pharmacy"].sort();
    buckets["restaurant"].sort();

    // Finally, we reconstruct the single array in the strictly required category order.
    // Spread syntax (...) efficiently concatenates the arrays.
    return [
        ...buckets["electronics"],
        ...buckets["grocery"],
        ...buckets["pharmacy"],
        ...buckets["restaurant"]
    ];
};
