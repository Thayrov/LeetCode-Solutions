/*
3433. Count Mentions Per User

You are given an integer numberOfUsers representing the total number of users and an array events of size n x 3.
Each events[i] can be either of the following two types:
Message Event: ["MESSAGE", "timestampi", "mentions_stringi"]
This event indicates that a set of users was mentioned in a message at timestampi.
The mentions_stringi string can contain one of the following tokens:
id<number>: where <number> is an integer in range [0,numberOfUsers - 1]. There can be multiple ids separated by a single whitespace and may contain duplicates. This can mention even the offline users.
ALL: mentions all users.
HERE: mentions all online users.
Offline Event: ["OFFLINE", "timestampi", "idi"]
This event indicates that the user idi had become offline at timestampi for 60 time units. The user will automatically be online again at time timestampi + 60.
Return an array mentions where mentions[i] represents the number of mentions the user with id i has across all MESSAGE events.
All users are initially online, and if a user goes offline or comes back online, their status change is processed before handling any message event that occurs at the same timestamp.
Note that a user can be mentioned multiple times in a single message event, and each mention should be counted separately.

Example 1:
Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]
Output: [2,2]
Explanation:
Initially, all users are online.
At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]
At timestamp 11, id0 goes offline.
At timestamp 71, id0 comes back online and "HERE" is mentioned. mentions = [2,2]

Example 2:
Input: numberOfUsers = 2, events = [["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]]
Output: [2,2]
Explanation:
Initially, all users are online.
At timestamp 10, id1 and id0 are mentioned. mentions = [1,1]
At timestamp 11, id0 goes offline.
At timestamp 12, "ALL" is mentioned. This includes offline users, so both id0 and id1 are mentioned. mentions = [2,2]

Example 3:
Input: numberOfUsers = 2, events = [["OFFLINE","10","0"],["MESSAGE","12","HERE"]]
Output: [0,1]
Explanation:
Initially, all users are online.
At timestamp 10, id0 goes offline.
At timestamp 12, "HERE" is mentioned. Because id0 is still offline, they will not be mentioned. mentions = [0,1]

Constraints:
1 <= numberOfUsers <= 100
1 <= events.length <= 100
events[i].length == 3
events[i][0] will be one of MESSAGE or OFFLINE.
1 <= int(events[i][1]) <= 10^5
The number of id<number> mentions in any "MESSAGE" event is between 1 and 100.
0 <= <number> <= numberOfUsers - 1
It is guaranteed that the user id referenced in the OFFLINE event is online at the time the event occurs.

</> Typescript code:
*/

function countMentions(numberOfUsers: number, events: string[][]): number[] {
    // Initialize an array to track mention counts for each user, starting at 0.
    const mentions = new Array(numberOfUsers).fill(0);
    
    // Initialize an array to track when a user will be back online.
    // 0 implies they are currently online (since timestamps are >= 1).
    const onlineUntil = new Array(numberOfUsers).fill(0);

    // Sort events to process them chronologically.
    events.sort((a, b) => {
        // Primary sort key: Timestamp (parsed from string to number).
        const timeDiff = Number(a[1]) - Number(b[1]);
        if (timeDiff !== 0) return timeDiff;
        
        // Secondary sort key: Event Type.
        // If timestamps are equal, "OFFLINE" events must be processed BEFORE "MESSAGE" events.
        // This ensures correct status (offline) is active when the message is processed.
        return a[0] === "OFFLINE" ? -1 : 1;
    });

    // Iterate through the sorted events.
    for (const [type, timeStr, content] of events) {
        const timestamp = Number(timeStr);

        if (type === "OFFLINE") {
            // "OFFLINE" event: The content field is the userId.
            // The user remains offline for 60 units. They are back online at timestamp + 60.
            const id = Number(content);
            onlineUntil[id] = timestamp + 60;
        } else {
            // "MESSAGE" event: The content field is the mention string.
            if (content === "ALL") {
                // "ALL": Increment count for every user regardless of status.
                for (let i = 0; i < numberOfUsers; i++) {
                    mentions[i]++;
                }
            } else if (content === "HERE") {
                // "HERE": Increment count only for ONLINE users.
                for (let i = 0; i < numberOfUsers; i++) {
                    // A user is online if the current timestamp is >= the time they are set to return.
                    if (onlineUntil[i] <= timestamp) {
                        mentions[i]++;
                    }
                }
            } else {
                // Specific IDs (e.g., "id0 id1"): Space-separated list.
                const tokens = content.split(' ');
                for (const token of tokens) {
                    // Parse ID by slicing off "id" prefix (first 2 chars).
                    const id = Number(token.slice(2));
                    mentions[id]++;
                }
            }
        }
    }

    return mentions;
}
