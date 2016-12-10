let CJQuery = function() {
    this.elements = null;
};

window.$ = function(selector) {
    let obj = new CJQuery();
    obj.init(selector);
    return obj;
};

CJQuery.prototype.init = function(selector) {
    this.elements = document.querySelectorAll(selector);
    this.elements = Array.from(this.elements);
};

CJQuery.prototype.addClass = function(newClassNames) {
    let objType = Object.prototype.toString.call(newClassNames).slice(8, -1);
    
    if (objType === "Function") {
        for (let i = 0; i < this.elements.length; i++) {
            let oldClasses = this.elements[i].className; 

            let newClass = newClassNames(i, oldClasses);

            this.elements[i].className = oldClasses + " " + newClass;
        }
    }

    if (objType === "String") {
        for (let i = 0; i < this.elements.length; i++) {
            let oldClasses = this.elements[i].className; 
            this.elements[i].className = oldClasses + " " + newClassNames;
        }
    }

    return this;
}

CJQuery.prototype.append = function(newContent) {
    let objType = Object.prototype.toString.call(newContent).slice(8, -1);

    if (objType === "Object") {
        for (let i = 0; i < this.elements.length; i++) {
            if (i > 0) {
                newContent = newContent.cloneNode(true);
            }
            this.elements[i].appendChild(newContent);
        }
    }

    if (objType === "String") {
        for (let i = 0; i < this.elements.length; i++) {
            let oldContent = this.elements[i].innerHTML;
            this.elements[i].innerHTML = oldContent + " " + newContent;        
        }
    }
    
    return this;
}

CJQuery.prototype.html = function(newContent) {
    if (newContent === undefined) {
        return this.elements[0].innerHTML;
    }

    for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = newContent;
    }

    return this;
};

CJQuery.prototype.attr = function(attribute, value) {
    if (arguments.length === 1) {
        return this.elements[0].getAttribute(attribute);
    }

    for(let i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(attribute, value);
    }

    return this;
};

CJQuery.prototype.children = function(filter) { 
    let childrenSet = [];

    if (filter) {
        for(let i = 0; i < this.elements.length; i++) {
            let childrenAll = Array.from(this.elements[i].children);
            for (let j = 0; j < childrenAll.length; j++) {
                let classes = Array.from(childrenAll[j].classList);

                if (classes.includes(filter.slice(1))) {
                    childrenSet.push(childrenAll[j]);
                }
            }
        }
        return childrenSet;
    }

    for(let i = 0; i < this.elements.length; i++) {
        childrenSet = childrenSet.concat(Array.from(this.elements[i].children));
    }
    this.elements = childrenSet;

    return this;
};

CJQuery.prototype.css = function(param) {
    let objType = Object.prototype.toString.call(param).slice(8, -1);

    if (objType === "String") {
        return this.elements[0].style[param];
    }

    if (objType === "Object") {
        let keys = Object.keys(param); 

        for (let i = 0; i < this.elements.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                this.elements[i].style[keys[j]] = param[keys[j]];   
            }
        }

        return this;
    }
};

CJQuery.prototype.data = function() {
    let objType = Object.prototype.toString.call(arguments[0]).slice(8, -1);

    if (arguments.length === 0) {
        return this.elements[0].dataset;
    }

    if (objType === "Object") {
        let keys = Object.keys(arguments[0]);
        for (let i = 0; i < this.elements.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                this.elements[i].dataset[keys[j]] = arguments[0][keys[j]];
            }
        }

        return this;
    }

    if (arguments.length === 1) {
        return this.elements[0].dataset[arguments[0]];
    }

    if (arguments.length === 2) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].dataset[arguments[0]] = arguments[1];
        }

        return this;
    }
};

CJQuery.prototype.on = function() {
    if (arguments.length === 2) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].addEventListener(arguments[0], arguments[1]);
        }
    }

    // if (arguments.length === 3) {
    //     let childrenSet = this.children(arguments[1]);
    //     for (let i = 0; i < childrenSet.length; i++) {
    //         childrenSet[i].addEventListener(arguments[0], arguments[2]);
    //     }
    // }

    return this;
};

CJQuery.prototype.one = function(event, func) {

};

CJQuery.prototype.each = function(func) {
    for (let i = 0; i < this.elements.length; i++) {
        let result = func.call(this.elements[i], i, this.elements[i]);
        if (result === false) {
            break;
        }
    }

    return this;
};