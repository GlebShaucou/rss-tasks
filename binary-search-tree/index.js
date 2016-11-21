function BinarySearchTree() {

    this.rootNode = null;

    this.root = (function() {
        return this.rootNode;
    }).bind(this);

    this.insert = (function(key, value) {
        var node = new Node(key, value);

        if(this.rootNode == null) {
            this.rootNode = node;
        } else {
            var currentNode = this.rootNode;

            while(true) {
                if (currentNode.value > node.value) {
                    if (currentNode.leftChild == null) {
                        currentNode.leftChild = node;
                        node.parent = currentNode;
                        break;
                    }
                    currentNode = currentNode.leftChild;
                } else {
                    if (currentNode.rightChild == null) {
                        currentNode.rightChild = node;
                        node.parent = currentNode;
                        break;
                    }
                    currentNode = currentNode.rightChild;
                }
            }
        }

        return this; // это нужно, чтобы метод был chainable
    }).bind(this);

    this.showTree = (function() {
        console.log(this.rootNode);
    }).bind(this);
}

function Node(key, value) {
    this.key = key;
    this.value = value;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
}

var bst = new BinarySearchTree();

bst.insert(1, 23).insert(3, 5).insert(4, 30);
// bst.insert(3, 5);
// bst.insert(4, 30);
// bst.insert(10, 2);
// bst.insert(12, 3);

// bst.showTree();