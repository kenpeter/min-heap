// based on this https://stackoverflow.com/questions/48872514/implementing-min-heap-using-an-array

const heapifyDown = (heap, size) => {
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

  return [heap, size];
}

// delete root
const deleteMin = (heap, size) => {
  // get min at top
  let t = heap[1];

  // last item to top
  heap[1] = heap[size];
  
  // destroy last item
  heap[size] = null;

  // 1 item less
  size = size - 1;

  // top to down
  let tmp = heapifyDown(heap, size);
  heap = tmp[0];
  size = tmp[1];

  // return small
  return [heap, size];
}

const heapifyUp = (heap, size) => {
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

  return [heap, size];
}

const insert = (heap, size, item) => {
    // size starts 0
    size = size + 1;

    // to end arr
    heap[size] = item;

    // go up
    return heapifyUp(heap, size);
}

const buildHeap = (heap, size, arr) => {
    for (let i=0; i<arr.length; i++) {
      let t = insert(heap, size, arr[i]);
      heap = t[0];
      size = t[1];
    }
    
    return [heap, size];
}

const findKthLargest = (ns, k) => {
    let heap;
    let t = buildHeap(heap=[], size=0, ns.slice(0, k));
    heap = t[0];
    size = t[1];
    
    // rest element
    for (let value of ns.slice(k)) {
        // value is bigger than min, delete min, insert value
        if (value > heap[1]) {
            let tmp = deleteMin(heap, size);
            heap = tmp[0];
            size = tmp[1];

            let tmp1 = insert(heap, size, value);
            heap = tmp1[0];
            size = tmp1[1];
        }
    }

    return heap[1];
}

let out = findKthLargest([2, 1], 1);
console.log(out);
