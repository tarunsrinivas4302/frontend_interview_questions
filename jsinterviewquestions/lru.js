
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRU {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map(); 
        this.head = new Node(null, null);
        this.tail = new Node(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    #removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    #addNodeToFront(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    put(key, value) {
        if (this.map.has(key)) {
            let existingNode = this.map.get(key);
            this.#removeNode(existingNode);
        } else if (this.map.size >= this.capacity) {
            let lruNode = this.tail.prev;
            this.#removeNode(lruNode);
            this.map.delete(lruNode.key);
        }
        let newNode = new Node(key, value);
        this.#addNodeToFront(newNode);
        this.map.set(key, newNode);
    }

    get(key) {
        if (!this.map.has(key)) return ;
        let node = this.map.get(key);
        this.#removeNode(node);
        this.#addNodeToFront(node);
        return node.value;
    }

    renderCache(){
        return this.map;
    }
}

// Example Usage
const lruCache = new LRU(2);
lruCache.put(1, 10);
lruCache.put(2, 20);
// console.log(lruCache.get(1)); // 10
lruCache.put(3, 30); // Removes key 2
// console.log(lruCache.get(2)); // -1 (not found)
// console.log(lruCache.get(3)); // 30
console.log(lruCache.renderCache())