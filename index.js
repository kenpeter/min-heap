// global
var heap = new Array(); // 0 is not used
var size = 0;

const heapifyDown = () => {
  // largest on top, i tracks
  let i = 1;

  // i larger and larger, bound
  while(i < size) {
    // left child
    let left_c = 2*i;

    // right child
    let right_c = 2*i + 1;

    // tmp
    let t;

    if (left_c <= size) {
      // left_child in bound. Use it
      t = left_c;
    } else {
      // left_child > last_index, stop
      break;
    }

    // 1. right_child in bound
    // 2. somehow, left_child > right_child, pick smaller, because smaller to top
    if (right_c <= size && heap[left_c] > heap[right_c]) {
      t = right_c;
    }

    // 1. inserted_item >= 1 of children, inserted_item goes down
    // 2. inserted_item < 1 of children, inserted_item found position
    if(heap[i] < heap[t]) {
      console.log('heap[i] < heap[t]: ', i, heap[i], t, heap[t]);
      break;
    }

    // inserted_item to tmp
    let tmp = heap[i];

    // 1 of children to parent
    heap[i] = heap[t];

    // inserted_item to 1 of children
    heap[t] = tmp;

    // i tracks inserted_item
    i = t;
  }
}

const heapifyUp = () => {
  // item inserted at end, flow up, i tracks
  let i = size;

  // infi loop
  while(1) { 
    // i needs to be last, because i/2 === parent
    let parent = Math.floor(i/2);

    // 1. parent smaller and smaller, so bound;
    // 2. parent > child, not min heap, swap
    if (parent > 0 && heap[parent] > heap[i]) {
      // parent to tmp
      let t = heap[parent];
      
      // child to parent
      heap[parent] = heap[i];

      // parent to child
      heap[i] = t;

      // i pts back to inserted_item
      i = parent;

    } else {
      // 1. inserted_item on root
      // 2. or inserted_item > parent i.e. cannot go up
      break;
    }
  }
}

// 
const insert = (item) => {
  // size starts 0, ++
  size = size + 1;

  // in arr, small item 1st, big item last, put inserted last
  // flow up
  heap[size] = item;

  // flow up
  heapifyUp();
}

// delete root
const deleteMin = () => {
  // smallest on top, get it
  let t = heap[1];

  // get largest, put it on top, it flows down, shuffle all along the way
  heap[1] = heap[size];
  
  // destroy last item
  heap[size] = null;

  // size reduce
  size = size - 1;

  // last item go down
  heapifyDown();

  // return min
  return t;
}

// print
const printHeap = () => {
  // index 1
  let i = 1;

  // 1, 2, 3... size
  while(i <= size){
    console.log('element: ', heap[i]);
    // advance
    i++;
  }

  // space
  console.log();
}

const main1 = () => 
{
  // 10, 20, 11, 7, 18
  insert(10);
  insert(20);
  insert(11);
  insert(7);
  insert(18);

  // print all data
  printHeap();

  // delete head
  console.log("delete: ", deleteMin());

  printHeap();

  // insert 110, -7, 15
  insert(110);
  insert(-7);
  insert(15);

  // print all data
  printHeap();

  // delete head
  console.log("delete: ", deleteMin());

  printHeap();

  return 0;
}

const main2 = () => 
{
  insert(7);
  insert(10);
  insert(11);
  insert(20);
  insert(18);

  printHeap();

  console.log("delete: ", deleteMin());

  printHeap();

  // test 
  console.log(heap[size+1]);

}

main2();