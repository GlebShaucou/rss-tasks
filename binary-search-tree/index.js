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
let node = new Node(key, value);

if(this._root.key === undefined) {
    this._root = node;
} else {
    let currentNode = this._root;

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
    let containsValue = false;

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
    let keys = [];
    let values = [];

    function innerTraverse(currentNode) {
        if(currentNode !== null) {
            keys.push(currentNode.key);
            innerTraverse(currentNode.left);
            innerTraverse(currentNode.right);
        }
    }

    innerTraverse(this._root);

    keys.sort(function(a,b) {
        return a - b;
    });

    for (let i = 0; i < keys.length; i++) {
        values.push(this.search(keys[i]));
    }

    if(bool) {
        return values;
    } else {
        return values.reverse();
    }
};

BinarySearchTree.prototype.verify = function() {
    let verifyIt = true;

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
    let nodeToDelete = innerSearch(this._root);

    if (nodeToDelete === undefined) {
        return this;
    }

    if (nodeToDelete.left === null && nodeToDelete.right === null) {
        
    }

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
