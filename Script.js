//Binary search tree
const createNode = (data) => {
  return {
    data,
    left: null,
    right: null,
  };
};

// Tree factory function
const createTree = (array) => {
  const buildTree = (arr) => {
    if (arr.length === 0) return null;
    const uniqueSortedArray = [...new Set(arr)].sort((a, b) => a - b);
    const mid = Math.floor(uniqueSortedArray.length / 2);
    const node = createNode(uniqueSortedArray[mid]);
    node.left = buildTree(uniqueSortedArray.slice(0, mid));
    node.right = buildTree(uniqueSortedArray.slice(mid + 1));
    return node;
  };

  const root = buildTree(array);

  const insert = (value) => {
    const insertHelper = (node, value) => {
      if (node === null) return createNode(value);
      if (value < node.data) {
        node.left = insertHelper(node.left, value);
      } else if (value > node.data) {
        node.right = insertHelper(node.right, value);
      }
      return node;
    };
    root = insertHelper(root, value);
  };

  const find = (value) => {
    const findHelper = (node, value) => {
      if (node === null) return null;
      if (value === node.data) return node;
      return value < node.data ? findHelper(node.left, value) : findHelper(node.right, value);
    };
    return findHelper(root, value);
  };

  const levelOrder = (callback) => {
    if (!callback) throw new Error("Callback is required");
    const queue = [root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  };

  const inOrder = (callback) => {
    if (!callback) throw new Error("Callback is required");
    const inOrderHelper = (node) => {
      if (node) {
        inOrderHelper(node.left);
        callback(node);
        inOrderHelper(node.right);
      }
    };
    inOrderHelper(root);
  };

  const preOrder = (callback) => {
    if (!callback) throw new Error("Callback is required");
    const preOrderHelper = (node) => {
      if (node) {
        callback(node);
        preOrderHelper(node.left);
        preOrderHelper(node.right);
      }
    };
    preOrderHelper(root);
  };

  const postOrder = (callback) => {
    if (!callback) throw new Error("Callback is required");
    const postOrderHelper = (node) => {
      if (node) {
        postOrderHelper(node.left);
        postOrderHelper(node.right);
        callback(node);
      }
    };
    postOrderHelper(root);
  };

  const height = (node) => {
    if (node === null) return -1; // Height of an empty tree is -1
    return 1 + Math.max(height(node.left), height(node.right));
  };

  const depth = (node) => {
    let d = 0;
    let current = root;
    while (current !== null) {
      if (node.data < current.data) {
        current = current.left;
      } else if (node.data > current.data) {
        current = current.right;
      } else {
        return d;
      }
      d++;
    }
    return -1; // Node not found
  };

  const isBalanced = (node) => {
    if (node === null) return true;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      isBalanced(node.left) &&
      isBalanced(node.right)
    );
  };

  const rebalance = () => {
    const inOrderArray = [];
    inOrder((node) => inOrderArray.push(node.data));
    root = buildTree(inOrderArray);
  };

  return {
    root,
    insert,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

// Example usage:
const randomNumbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = createTree(randomNumbers);

// Check if the tree is balanced
console.log("Is balanced:", bst.isBalanced(bst.root));

// Print elements in different orders
console.log("Level Order:");
bst.levelOrder((node) => console.log(node.data));

console.log("In Order:");
bst.inOrder((node) => console.log(node.data));

console.log("Pre Order:");
bst.preOrder((node) => console.log(node.data));

console.log("Post Order:");
bst.postOrder((node) => console.log(node.data));

// Unbalance the tree by adding large numbers
bst.insert(100);
bst.insert(200);
bst.insert(300);
console.log("Is balanced after adding large numbers:", bst.isBalanced(bst.root));

// Rebalance the tree
bst.rebalance();
console.log("Is balanced after rebalancing:", bst.isBalanced(bst.root));

// Print elements again after rebalancing
console.log("Level Order after rebalancing:");
bst.levelOrder((node) => console.log(node.data));
