function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = new Node();
}

BinarySearchTree.prototype.insert = function(key, value) {
var node = new Node(key, value);
var currentNode

if(this._root.key === undefined) {
    this._root = node;
} else {
    currentNode = this._root;

    while(true) {
        if (node.key < currentNode.key) {
            if (currentNode.left === null) {
                currentNode.left = node;
                break;
            }
            currentNode = currentNode.left;
        }
        if (node.key >= currentNode.key) {
            if (currentNode.right === null) {
                currentNode.right = node;
                break;
            }
            currentNode = currentNode.right;
        }
    }
}

return this; // chainable
};

BinarySearchTree.prototype.root = function() {
    if (this._root.key === undefined) {
        return undefined;
    }
    return this._root.value;
};

BinarySearchTree.prototype.search = function(key) {
    function innerSearch(currentNode) {
            
        if(currentNode.key == key) {
            return currentNode.value;
        } else if(key < currentNode.key) {
            if (currentNode.left === null) {
                return undefined;
            }
            return innerSearch(currentNode.left);
        } else if(key >= currentNode.key) {
            if (currentNode.right === null) {
                return undefined;
            }
            return innerSearch(currentNode.right);
        } else {
            return undefined;
        }
    }
    
    return innerSearch(this._root);
};

BinarySearchTree.prototype.contains = function(value) {
    var containsValue = false;

    function innerContains(currentNode) {
        if (currentNode === null) {
            return;
        }

        if(currentNode.value === value) {
            containsValue = true;
        } else {
            innerContains(currentNode.left);
            innerContains(currentNode.right); 
        }

        return containsValue;
    }

    return innerContains(this._root);
};

BinarySearchTree.prototype.traverse = function(bool) {
    var keys = [];
    var sequence = [];

    preOrderTraverse(this._root);

    for (let i = 0; i < keys.length; i++) {
        sequence.push(this.search(keys[i]));
    }

    function preOrderTraverse(currentNode) {
        if(currentNode !== null) {
            if (bool) {
                minMaxSort(currentNode.key);
            } else {
                maxMinSort(currentNode.key);
            }
            preOrderTraverse(currentNode.left);
            preOrderTraverse(currentNode.right);
        }
    }

    // if bool === true
    function minMaxSort(key) {
        if (keys.length === 0) {
            keys.push(key);
        } else {
            var i = keys.length - 1;
            while(key < keys[i]) {
                keys[i + 1] = keys[i];
                i--;
            }
            keys[i + 1] = key; 
        }
    }
    // if bool === false
    function maxMinSort(key) {
        if (keys.length === 0) {
            keys.push(key);
        } else {
            var i = keys.length - 1;
            while(key > keys[i]) {
                keys[i + 1] = keys[i];
                i--;
            }
            keys[i + 1] = key; 
        }
    }

    return sequence;
};

BinarySearchTree.prototype.verify = function() {
    var verifyIt = true;

    function innerVerify(currentNode) {
        if (currentNode !== null) {
            if (currentNode.left !== null && currentNode.key < currentNode.left.key) {
                verifyIt = false;
                return;
            }
            if (currentNode.right !== null && currentNode.key > currentNode.right.key) {
                verifyIt = false;
                return;
            }
            innerVerify(currentNode.left);
            innerVerify(currentNode.right);
        }
    }

    innerVerify(this._root);

    return verifyIt;
};

BinarySearchTree.prototype.delete = function(key) {
    var nodeDescr = innerSearch(this._root);
    var nodeToDelete = nodeDescr[0];
    var parent = nodeDescr[1];
    var position = nodeDescr[2];
    var currentNode;

    if (nodeToDelete.left === null && nodeToDelete.right === null) {
        parent[position] = null;
        return this;
    }

    if (nodeToDelete.left === null) {
        parent.right = nodeToDelete.right;
        return this;
    }

    if (nodeToDelete.right === null) {
        parent.left = nodeToDelete.left;
        return this;
    }

    currentNode = nodeToDelete.right;
    // node has both children
    while(currentNode.left !== null) {
        currentNode = currentNode.left;
    }

    currentNode.left = nodeToDelete.left;
    currentNode.right = nodeToDelete.right;
    if (position !== undefined) {
        parent[position] = currentNode;    
    }
    this._root = currentNode;

    function innerSearch(currentNode, parent, position) {            
        if(currentNode.key == key) {
            return [currentNode, parent, position];
        } else if(key < currentNode.key) {
            if (currentNode.left === null) {
                return undefined;
            }
            return innerSearch(currentNode.left, currentNode, "left");
        } else if(key >= currentNode.key) {
            if (currentNode.right === null) {
                return undefined;
            }
            return innerSearch(currentNode.right, currentNode, "right");
        } else {
            return undefined;
        }
    }

    return this;
};

module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'HLEB SHAUTSOU'
};