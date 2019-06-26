// based on this https://stackoverflow.com/questions/48872514/implementing-min-heap-using-an-array

// global
let size = 0;
let heap = new Array();


const heapifyDown = () => {
  // root already return, largest_item at root, i pts to root
  let i = 1;

  // i < size (size is the last_item_index)
  while(i < size) {
    // left child
    let left_c = 2*i;

    // right child
    let right_c = 2*i + 1;

    // tmp var
    let t;

    // left_child bigger size, stop going down
    if (left_c <= size) {
      // left_child into tmp
      t = left_c;
    } else {
      break;
    }

    // right_child bigger size, so use left_child
    if (right_c <= size && heap[left_c] > heap[right_c]) {
      // left_child VS right_child, pick smaller
      t = right_c;
    }

    // root_item, found its position, stop
    if(heap[i] < heap[t]) {

      console.log('heap[i] < heap[t]: ', i, heap[i], t, heap[t]);

      break;
    }

    // e.g. root to tmp
    let temp = heap[i];

    // e.g. child to parent
    heap[i] = heap[t];

    // parent to child
    heap[t] = temp;

    // i goes down
    i = t;
  }
}

// delete root
const deleteMin = () => {
  // get root
  let t = heap[1];

  // last item to root, why?????
  heap[1] = heap[size];
  
  // destroy this item
  heap[size] = null;

  // --
  size = size - 1;

  // arr last item go down
  heapifyDown();

  // return small
  return t;
}


//
const heapifyUp = () => {
  // inserted_item to arr end, i pts to last item (size is last item index)
  let i = size;

  // loop, inserted_item from bottom, going up
  while(1) { 
    // use math, i/2 works out parent
    let parent = Math.floor(i/2);

    // parent_index > 0, parent is there
    // parent > child (need swap)
    if (parent > 0 && heap[parent] > heap[i]) {
      // parent to tmp
      let t = heap[parent];
      
      // inserted_item assign to parent (i.e. go up)
      heap[parent] = heap[i];

      // parent goes to inserted_item position (i.e. go down)
      heap[i] = t;

      // i points to insert_item
      i = parent;

    } else {
      // inserted_item cannot go up, done out
      break;
    }
  }
}

// 
const insert = (item) => {
    // size has to be up first, because starts 0
    size = size + 1;

    // put new item at the end of arr, heap up
    heap[size] = item;

    // arr last item go up
    heapifyUp();
}

const buildHeap = (arr) => {
    for (let i=0; i<arr.length; i++) {
        insert(arr[i]);
    }     
}

const findKthLargest = (ns, k) => {
    buildHeap(ns.slice(0, k));
    
    // rest
    for (let value of ns.slice(k)) {
        // index 1
        if (value > heap[1]) {
            deleteMin();
            insert(value);
        }
    }
    
    console.log(heap)
    
    return heap[1];
}

let out = findKthLargest([2, 1], 1);
console.log(out);
