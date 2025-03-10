/**
 * LRU stands For Least Recently Used Caching Mechanism to efficently manage limited memory by removing the least recently used items from the cache .
 * In Simpler Terms :: If the cache is full and a new item needs to be added, LRU removes the least recently accessed item to make space.
 * Why Do we need LRU ?
 *  Optimizes Memory Usage :: Stores only most relevant data.
 *  Improves Performance :: Frequently used data is quickly accessible
 *  Prevents Memory Overflow :: Automatically removes old/unused items from the cache
 * Ideal for Limited Storage :: Useful in RAM - Limited systems like mobile apps
 * 
 */
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


// Another Way Using Map 

class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map(); // Maintains insertion order
    }
  
    get(key) {
      if (!this.cache.has(key)) return -1; // Not found
  
      // Move accessed key to the front (most recently used)
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
  
      return value;
    }
  
    put(key, value) {
      if (this.cache.has(key)) {
        this.cache.delete(key); // Remove old position
      } else if (this.cache.size >= this.capacity) {
        // Remove least recently used item (first inserted item)
        const lruKey = this.cache.keys().next().value;
        this.cache.delete(lruKey);
      }
  
      this.cache.set(key, value); // Insert new value
    }
  }
  
  // Example Usage
  const lru = new LRUCache(3);
  lru.put(1, "A");
  lru.put(2, "B");
  lru.put(3, "C");
  
  console.log(lru.get(1)); // "A" (Moves 1 to front)
  lru.put(4, "D"); // Removes least recently used (2, "B")
  
  console.log(lru.get(2)); // -1 (Not found, as it was removed)
  console.log([...lru.cache.keys()]); // [3, 1, 4] (Shows order)
  

// Example Usage
const lruCache = new LRU(2);
lruCache.put(1, 10);
lruCache.put(2, 20);
// console.log(lruCache.get(1)); // 10
lruCache.put(3, 30); // Removes key 2
// console.log(lruCache.get(2)); // -1 (not found)
// console.log(lruCache.get(3)); // 30
console.log(lruCache.renderCache())