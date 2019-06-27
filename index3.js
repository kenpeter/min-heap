// arr is heap
function heapify(arr, i = 0, value = arr[i]) {
  // arr: [3, 2, 1]
  // i: 1 (parent)

  // infi loop
  console.log('start loop');
  while (true) {
      
      // get parent
      let j = i*2+1;

      console.log('arr: ', arr, 'j: ', j, 'i: ', i);

      // 1. index bounds in tree #
      // 2. see if we can use right child
      if (j+1 < arr.length && arr[j] > arr[j+1]) j++; 

      // 1. index bounds in tree #
      // 2. val > smaller child, we keep going
      // 3. val <= smaller child, we break loop, i is the position assign value
      if (j >= arr.length || value <= arr[j]) break;

      console.log('arr[i] = arr[j]', "i: " + i, arr[i], "j: " + j, arr[j]);

      // 1. min heap, child always > parent, so overwrite it. 
      // 2. child will be overwritten next iteration
      arr[i] = arr[j];

      // i becomes larger, goes down, keep finding position
      i = j;
  }

  console.log('end loop');

  // 1. when reach here, i find final position, so insert.
  // 2. possible that directly insert to root
  arr[i] = value;
}

function buildHeap(arr) {
  // when build heap, start from mid (parent), less and less
  for (let i = Math.floor((arr.length-1) / 2); i >= 0; i--) {
    // arr: [3, 2, 1], i: 1
    heapify(arr, i);
  }
  return arr;
}

function findKthLargest(nums, k) {
  // k: 3
  // [3, 2, 1]
  const heap = buildHeap(nums.slice(0, k));

  // loop rest num
  for (let i = k; i < nums.length; i++) {
      // 1. if num big, need to go down
      // 2. 0, start at root
      if (nums[i] > heap[0]) heapify(heap, 0, nums[i]);
  }

  console.log(heap);

  return heap[0];
}

const nums = [3,2,1,5,6,4]; // 6 num
console.log(findKthLargest(nums, 3));