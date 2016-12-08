let CJQuery = function() {
    this.elements = null;
};

let $ = function(selector) {
    let obj = new CJQuery();
    obj.init(selector);
    return obj;
};

CJQuery.prototype.init = function(selector) {
    this.elements = document.querySelectorAll(selector);
    this.elements = Array.from(this.elements);
};

CJQuery.prototype.addClass = function(newClassNames) {
    for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].classList.add(newClassNames);
    }

    return this;
}

CJQuery.prototype.append = function(newContent) {
    for (let i = 0; i < this.elements.length; i++) {
        let oldContent = this.elements[i].innerHTML;
        this.elements[i].innerHTML = oldContent + " " + newContent;        
    }
    
    return this;
}

CJQuery.prototype.html = function(newContent) {
    if (newContent === undefined) {
        return this.elements[0].innerHTML;
    }

    this.append(newContent);

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

CJQuery.prototype.children = function() { // add filter function ?????
    let childrenSet = [];

    for(let i = 0; i < this.elements.length; i++) {
        childrenSet = childrenSet.concat(Array.from(this.elements[i].children));
    }
    this.elements = childrenSet;

    return this;
};

CJQuery.prototype.css = function() {

};

CJQuery.prototype.data = function() {

};

CJQuery.prototype.on = function() {

};

CJQuery.prototype.one = function(events, func) {

};

CJQuery.prototype.each = function(func) {
    for (let i = 0; i < this.elements.length; i++) {
        func.call(this.elements[i].nodeName, i);
    }

    return this;
};