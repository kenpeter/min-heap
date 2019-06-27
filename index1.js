// based on this https://stackoverflow.com/questions/48872514/implementing-min-heap-using-an-array

// global, no var
global.size = 0;
global.heap = new Array();


const heapifyDown = () => {
  // i tracks big
  let i = 1;

  // i larger and larger, bound
  while(i < size) {
    // left child
    let left_c = 2*i;

    // right child
    let right_c = 2*i + 1;

    // tmp
    let t;

    // t = left_child
    if (left_c <= size) {
      t = left_c;
    } else {
      // left_child out bound
      break;
    }

    // right_child < left_child, smaller, small vs inserted_item
    if (right_c <= size && heap[left_c] > heap[right_c]) {
      t = right_c;
    }

    // inserted_found, stop
    if(heap[i] < heap[t]) {
      console.log('heap[i] < heap[t]: ', i, heap[i], t, heap[t]);
      break;
    }

    // swap
    let tmp = heap[i];
    heap[i] = heap[t];
    heap[t] = tmp;

    // i larger and larger
    i = t;
  }
}

// delete root
const deleteMin = () => {
  // get min at top
  let t = heap[1];

  // last item to top
  heap[1] = heap[size];
  
  // destroy last item
  heap[size] = null;

  // 1 item less
  size = size - 1;

  // top to down
  heapifyDown();

  // return small
  return t;
}

const heapifyUp = () => {
  // i tracks end
  let i = size;

  while(1) { 
    // parent
    let parent = Math.floor(i/2);

    // parent less and less; need swap
    if (parent > 0 && heap[parent] > heap[i]) {
      // swap
      let t = heap[parent];
      heap[parent] = heap[i];
      heap[i] = t;

      // i tracks inserted
      i = parent;

    } else {
      // found position
      break;
    }
  }
}

const insert = (item) => {
    // size starts 0
    size = size + 1;

    // to end arr
    heap[size] = item;

    // go up
    heapifyUp();
}

const buildHeap = (arr) => {
    for (let i=0; i<arr.length; i++) {
        insert(arr[i]);
    }     
}

const findKthLargest = (ns, k) => {
    buildHeap(ns.slice(0, k));
    
    // rest element
    for (let value of ns.slice(k)) {
        // value is bigger than min, delete min, insert value
        if (value > heap[1]) {
            deleteMin();
            insert(value);
        }
    }

    return heap[1];
}

let out = findKthLargest([2, 1], 1);
console.log(out);
