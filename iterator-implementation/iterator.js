function Iterator(array, config) { // add check for incomming parameters
	this.array = array;
	this.cyclic = config.cyclic || true;
	this.width = config.width || 1;
	// this.windowTransform = config.windowTransform;
	this.currentPos = 0;
}

Iterator.prototype.forward = function() {
	var subArr = [];
	var ind = this.currentPos + 1;
	var currLength = 0;

	for(; currLength < this.width; currLength++, ind++) {
		if (this.cyclic && ind === this.array.length) {
			ind = 0;
		}

		subArr.push(this.array[ind]);
	}

	if (this.currentPos === this.array.length - 1) {
		this.currentPos = 0;
	} else {
		this.currentPos++;
	}

	return subArr;
};

Iterator.prototype.current = function() {
	var subArr = [];
	var ind = this.currentPos;
	var currLength = 0;

	for(; currLength < this.width; currLength++, ind++) {
		if (this.cyclic && ind === this.array.length) {
			ind = 0;
		}

		subArr.push(this.array[ind]);
	}

	return subArr;
};

Iterator.prototype.backward = function() {
	
};

Iterator.prototype.jumpTo = function(index) {

};

var arr = [0,1,2,3,4,5,6,7,8,9];
var iterableArr = new Iterator(arr, { cyclic: true, width: 4});