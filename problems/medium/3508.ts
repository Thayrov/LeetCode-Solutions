/*
3508. Implement Router

Design a data structure that can efficiently manage data packets in a network router. Each data packet consists of the following attributes:
source: A unique identifier for the machine that generated the packet.
destination: A unique identifier for the target machine.
timestamp: The time at which the packet arrived at the router.
Implement the Router class:
Router(int memoryLimit): Initializes the Router object with a fixed memory limit.
memoryLimit is the maximum number of packets the router can store at any given time.
If adding a new packet would exceed this limit, the oldest packet must be removed to free up space.
bool addPacket(int source, int destination, int timestamp): Adds a packet with the given attributes to the router.
A packet is considered a duplicate if another packet with the same source, destination, and timestamp already exists in the router.
Return true if the packet is successfully added (i.e., it is not a duplicate); otherwise return false.
int[] forwardPacket(): Forwards the next packet in FIFO (First In First Out) order.
Remove the packet from storage.
Return the packet as an array [source, destination, timestamp].
If there are no packets to forward, return an empty array.
int getCount(int destination, int startTime, int endTime):
Returns the number of packets currently stored in the router (i.e., not yet forwarded) that have the specified destination and have timestamps in the inclusive range [startTime, endTime].
Note that queries for addPacket will be made in increasing order of timestamp.

Example 1:
Input:
["Router", "addPacket", "addPacket", "addPacket", "addPacket", "addPacket", "forwardPacket", "addPacket", "getCount"]
[[3], [1, 4, 90], [2, 5, 90], [1, 4, 90], [3, 5, 95], [4, 5, 105], [], [5, 2, 110], [5, 100, 110]]
Output:
[null, true, true, false, true, true, [2, 5, 90], true, 1]
Explanation
Router router = new Router(3); // Initialize Router with memoryLimit of 3.
router.addPacket(1, 4, 90); // Packet is added. Return True.
router.addPacket(2, 5, 90); // Packet is added. Return True.
router.addPacket(1, 4, 90); // This is a duplicate packet. Return False.
router.addPacket(3, 5, 95); // Packet is added. Return True
router.addPacket(4, 5, 105); // Packet is added, [1, 4, 90] is removed as number of packets exceeds memoryLimit. Return True.
router.forwardPacket(); // Return [2, 5, 90] and remove it from router.
router.addPacket(5, 2, 110); // Packet is added. Return True.
router.getCount(5, 100, 110); // The only packet with destination 5 and timestamp in the inclusive range [100, 110] is [4, 5, 105]. Return 1.

Example 2:
Input:
["Router", "addPacket", "forwardPacket", "forwardPacket"]
[[2], [7, 4, 90], [], []]
Output:
[null, true, [7, 4, 90], []]
Explanation
Router router = new Router(2); // Initialize Router with memoryLimit of 2.
router.addPacket(7, 4, 90); // Return True.
router.forwardPacket(); // Return [7, 4, 90].
router.forwardPacket(); // There are no packets left, return [].
 
Constraints:
2 <= memoryLimit <= 10^5
1 <= source, destination <= 2 * 10^5
1 <= timestamp <= 10^9
1 <= startTime <= endTime <= 10^9
At most 10^5 calls will be made to addPacket, forwardPacket, and getCount methods altogether.
queries for addPacket will be made in increasing order of timestamp.

</> Typescript code:
*/

type Node = { k:number; c:number; s:number; p:number; l:Node|null; r:Node|null };

class Router {
    // Maximum packets allowed in memory
    private memoryLimit: number;
    // FIFO queue storing packets in arrival order
    private q: {s:number,d:number,t:number}[] = [];
    // Index of the current head of the queue (amortized O(1) pops)
    private head = 0;
    // Current number of packets in memory
    private n = 0;
    // Tracks (source|destination|timestamp) triples to reject duplicates
    private keys = new Set<string>();
    // Per-destination randomized balanced BST (treap) storing (timestamp -> count) with subtree sums
    private roots = new Map<number, Node|null>();

    constructor(memoryLimit: number) { 
        // Store the memory capacity
        this.memoryLimit = memoryLimit; 
    }

    // Compose a unique key for duplicate detection
    private key(s:number,d:number,t:number){ return s+"|"+d+"|"+t; }

    // Treap helpers: subtree sum or 0 if null
    private sum(x:Node|null){ return x?x.s:0; }
    // Recompute node's subtree sum = own count + left sum + right sum
    private upd(x:Node){ x.s = x.c + this.sum(x.l) + this.sum(x.r); }
    // Split treap into (<= key, > key)
    private split(x:Node|null, key:number): [Node|null,Node|null]{
        if(!x) return [null,null];
        if(x.k<=key){ 
            const sp=this.split(x.r,key); // split right subtree
            x.r=sp[0];                    // keep <= key on the left of right side
            this.upd(x);                  // fix sums
            return [x,sp[1]];             // return (<=key, >key)
        }
        const sp=this.split(x.l,key);     // split left subtree
        x.l=sp[1];                        // keep > key on the right of left side
        this.upd(x);                      // fix sums
        return [sp[0],x];                 // return (<=key, >key)
    }
    // Merge two treaps where all keys in 'a' <= keys in 'b'
    private merge(a:Node|null,b:Node|null): Node|null{
        if(!a||!b) return a||b;
        if(a.p<b.p){                      // heap by priority
            a.r=this.merge(a.r,b);        // attach b into a's right
            this.upd(a);                  // fix sums
            return a;
        }
        b.l=this.merge(a,b.l);            // attach a into b's left
        this.upd(b);                      // fix sums
        return b;
    }
    // Point update at 'key' with +1 (insert) / -1 (remove); deletes node if count hits 0
    private add(root:Node|null, key:number, delta:number): Node|null{
        let L:Node|null, M:Node|null, R:Node|null;
        [L,R]=this.split(root,key);       // split by <= key
        [L,M]=this.split(L,key-1);        // isolate exact key into M
        if(M){ 
            M.c+=delta;                   // adjust count
            if(M.c<=0) M=null;            // drop if zero
            else this.upd(M);             // refresh subtree sum
        }else if(delta>0){                // create if inserting new timestamp
            M={k:key,c:delta,s:delta,p:(Math.random()*0xFFFFFFFF)>>>0,l:null,r:null};
        }
        return this.merge(this.merge(L,M),R); // stitch treap back
    }

    // Remove the oldest packet when memory exceeds the limit
    private evictOne(){
        if(this.n===0) return;
        const p=this.q[this.head++];      // pop from FIFO
        this.n--;
        this.keys.delete(this.key(p.s,p.d,p.t)); // free duplicate marker
        const r=this.roots.get(p.d)||null;       // update destination treap
        this.roots.set(p.d, this.add(r,p.t,-1));
        // Periodic compaction of the underlying array
        if(this.head>1024 && this.head*2>=this.q.length){ 
            this.q=this.q.slice(this.head); this.head=0; 
        }
    }

    addPacket(source: number, destination: number, timestamp: number): boolean {
        const k=this.key(source,destination,timestamp);
        if(this.keys.has(k)) return false;        // duplicate present
        this.keys.add(k);                         // mark as present
        this.q.push({s:source,d:destination,t:timestamp}); // enqueue
        this.n++;
        const r=this.roots.get(destination)||null;         // add to dest's treap
        this.roots.set(destination, this.add(r,timestamp,1));
        if(this.n>this.memoryLimit) this.evictOne();       // enforce capacity
        return true;
    }

    forwardPacket(): number[] {
        if(this.n===0) return [];                // nothing to forward
        const p=this.q[this.head++];             // dequeue oldest
        this.n--;
        this.keys.delete(this.key(p.s,p.d,p.t)); // clear duplicate state
        const r=this.roots.get(p.d)||null;       // decrement count for that timestamp
        this.roots.set(p.d, this.add(r,p.t,-1));
        if(this.head>1024 && this.head*2>=this.q.length){ // compact occasionally
            this.q=this.q.slice(this.head); this.head=0;
        }
        return [p.s,p.d,p.t];                     // return packet triplet
    }

    getCount(destination: number, startTime: number, endTime: number): number {
        const root=this.roots.get(destination)||null; // treap for destination
        if(!root || startTime>endTime) return 0;      // quick outs
        const sp1=this.split(root,endTime);           // (<=end, >end)
        const sp2=this.split(sp1[0],startTime-1);     // (<start, [start..end])
        const ans=this.sum(sp2[1]);                   // sum in range
        const merged=this.merge(this.merge(sp2[0],sp2[1]),sp1[1]); // restore
        this.roots.set(destination, merged);          // keep structure intact
        return ans;
    }
}


/**
 * Your Router object will be instantiated and called as such:
 * var obj = new Router(memoryLimit)
 * var param_1 = obj.addPacket(source,destination,timestamp)
 * var param_2 = obj.forwardPacket()
 * var param_3 = obj.getCount(destination,startTime,endTime)
 */
