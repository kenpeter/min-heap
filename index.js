// global
var heap = new Array(); // 0 is not used
var size = 0;

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

// print
const printHeap = () => {
  // index as 1
  let i = 1;
  // size is all elements
  while(i <= size){
    console.log('element: ', heap[i]);
    // ++
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