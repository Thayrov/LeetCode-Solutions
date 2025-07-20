/*
1948. Delete Duplicate Folders in System

Due to a bug, there are many duplicate folders in a file system. You are given a 2D array paths, where paths[i] is an array representing an absolute path to the ith folder in the file system.
For example, ["one", "two", "three"] represents the path "/one/two/three".
Two folders (not necessarily on the same level) are identical if they contain the same non-empty set of identical subfolders and underlying subfolder structure. The folders do not need to be at the root level to be identical. If two or more folders are identical, then mark the folders as well as all their subfolders.
For example, folders "/a" and "/b" in the file structure below are identical. They (as well as their subfolders) should all be marked:
/a
/a/x
/a/x/y
/a/z
/b
/b/x
/b/x/y
/b/z
However, if the file structure also included the path "/b/w", then the folders "/a" and "/b" would not be identical. Note that "/a/x" and "/b/x" would still be considered identical even with the added folder.
Once all the identical folders and their subfolders have been marked, the file system will delete all of them. The file system only runs the deletion once, so any folders that become identical after the initial deletion are not deleted.
Return the 2D array ans containing the paths of the remaining folders after deleting all the marked folders. The paths may be returned in any order.

Example 1:
Input: paths = [["a"],["c"],["d"],["a","b"],["c","b"],["d","a"]]
Output: [["d"],["d","a"]]
Explanation: The file structure is as shown.
Folders "/a" and "/c" (and their subfolders) are marked for deletion because they both contain an empty
folder named "b".

Example 2:
Input: paths = [["a"],["c"],["a","b"],["c","b"],["a","b","x"],["a","b","x","y"],["w"],["w","y"]]
Output: [["c"],["c","b"],["a"],["a","b"]]
Explanation: The file structure is as shown.
Folders "/a/b/x" and "/w" (and their subfolders) are marked for deletion because they both contain an empty folder named "y".
Note that folders "/a" and "/c" are identical after the deletion, but they are not deleted because they were not marked beforehand.

Example 3:
Input: paths = [["a","b"],["c","d"],["c"],["a"]]
Output: [["c"],["c","d"],["a"],["a","b"]]
Explanation: All folders are unique in the file system.
Note that the returned array can be in a different order as the order does not matter.

Constraints:
1 <= paths.length <= 2 * 10^4
1 <= paths[i].length <= 500
1 <= paths[i][j].length <= 10
1 <= sum(paths[i][j].length) <= 2 * 10^5
path[i][j] consists of lowercase English letters.
No two paths lead to the same folder.
For any folder not at the root level, its parent folder will also be in the input.

</> Typescript code:
*/

function deleteDuplicateFolder(paths: string[][]): string[][] {
    // Create a trie (prefix tree) to represent the folder structure
    // Each node is a Map where keys are folder names and values are child nodes
    const trie = new Map<string, Map<string, any>>();

    // Build the trie from all input paths
    for (const path of paths) {
        let node = trie; // Start from root
        // Traverse/create the path in the trie
        for (const folder of path) {
            // If folder doesn't exist at current level, create it
            if (!node.has(folder)) {
                node.set(folder, new Map());
            }
            // Move to the child node
            node = node.get(folder)!;
        }
    }

    // Map to store computed signatures for each node
    const signatures = new Map<Map<string, any>, string>();
    // Map from signature string to list of nodes with that signature
    const sigToNodes = new Map<string, Map<string, any>[]>();

    // DFS function to generate signatures using post-order traversal
    function dfs(node: Map<string, any>): string {
        // Collect all child signatures with their folder names
        const childSigs: string[] = [];
        for (const [name, child] of node) {
            // Recursively get child signature and prepend folder name
            childSigs.push(name + dfs(child));
        }
        // Sort child signatures to ensure consistent ordering for identical structures
        childSigs.sort();
        // Build final signature by wrapping sorted children in parentheses
        const sig = "(" + childSigs.join("") + ")";

        // Store the signature for this node
        signatures.set(node, sig);

        // Only track non-empty signatures (folders with children)
        if (sig !== "()") {
            // Group nodes by their signature
            if (!sigToNodes.has(sig)) {
                sigToNodes.set(sig, []);
            }
            sigToNodes.get(sig)!.push(node);
        }

        return sig;
    }

    // Generate signatures for all nodes starting from root
    dfs(trie);

    // Mark nodes for deletion if their signature appears more than once
    const toDelete = new Set<Map<string, any>>();
    for (const [sig, nodes] of sigToNodes) {
        // If multiple nodes have the same signature, they're duplicates
        if (nodes.length > 1) {
            for (const node of nodes) {
                toDelete.add(node);
            }
        }
    }

    // Array to store the final result paths
    const result: string[][] = [];

    // Collect all remaining paths using DFS, skipping deleted nodes
    function collect(node: Map<string, any>, path: string[]): void {
        // Traverse all children
        for (const [name, child] of node) {
            // Only process children that are not marked for deletion
            if (!toDelete.has(child)) {
                // Add current folder to path
                path.push(name);
                // Recursively collect from this child
                collect(child, path);
                // Backtrack - remove current folder from path
                path.pop();
            }
        }
        // Add current path to result if it's not empty (exclude root)
        if (path.length > 0) {
            result.push([...path]);
        }
    }

    // Start collection from root with empty path
    collect(trie, []);
    return result;
}