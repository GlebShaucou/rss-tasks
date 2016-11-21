function BinarySearchTree() {
    this.root = null;
}

function Node(key, value) {
    this.key = key;
    this.value = value;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
}