function BinarySearchTree() {

    this.rootNode = null;

    this.root = (function() {
        return this.rootNode;
    }).bind(this);

    this.insert = (function(key, value) {
        var node = new Node(key, value);

        if(!(this.root())) {
            this.rootNode = node;
        } else {
            var currentNode = this.root();

            while(true) {
                if (currentNode.key > node.key) {
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

    this.search = (function(key) {

        function innerSearch(currentNode) {
            
            if(currentNode.key == key) {
                return currentNode;
            } else if(currentNode.leftChild && currentNode.key > key) {
                return innerSearch(currentNode.leftChild);
            } else if(currentNode.rightChild && currentNode.key <= key) {
                return innerSearch(currentNode.rightChild);
            } else {
                return undefined;
            }
        }
        
        return innerSearch(this.root());
    }).bind(this);

    this.contains = (function(value) {
        
        function innerContains(currentNode) {
            var isValue;

            if(currentNode.value == value) {
                return true;
            } else {

                if(currentNode.leftChild) {
                    isValue = innerContains(currentNode.leftChild);
                    if (isValue) {
                        return true;
                    }
                } 

                if(currentNode.rightChild) {
                    isValue = innerContains(currentNode.rightChild);
                    if (isValue) {
                        return true;
                    }
                }

                return false; 
            }
        }

        return innerContains(this.root());
    }).bind(this);

    this.traverse = (function(bool) {
        var keys = [];
        var values = [];

        function innerTraverse(currentNode) {
            if(currentNode) {
                keys.push(currentNode.key);
                innerTraverse(currentNode.leftChild);
                innerTraverse(currentNode.rightChild);
            }
        }

        innerTraverse(this.root());

        keys.sort(function(a,b) {
            return a - b;
        });

        for (var i = 0; i < keys.length; i++) {
            values.push(this.search(keys[i]).value);
        }

        if(bool) {
            return values;
        } else {
            return values.reverse();
        }    
    }).bind(this);

    

    // this.showTree = (function() {
    //     console.log(this.root());
    // }).bind(this);
}

function Node(key, value) {
    this.key = key;
    this.value = value;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
}

var bst = new BinarySearchTree();

bst.insert(8, 23).insert(4, 5).insert(10, 30).insert(2, 30).insert(5, 30);

bst.contains(5);