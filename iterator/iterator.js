function Iterator(array, config) { // add check for incomming parameters
	this.array = array;
	this.width = config.width || 1;
	// this.windowTransform = config.windowTransform; // takes (currentPos, width, forward or backward) return object { newCurrPos: newCurrPos, newWidth: newWidth}
	this.currentPos = 0;

	if (config.cyclic) {
		this.cyclic = true;
	} else {
		this.cyclic = false;
	}
}

Iterator.prototype.forward = function() {
	var subArr = [];
	var ind;
	var currSubArrLength = 0;

	if (!this.cyclic && this.currentPos === this.array.length - 1) {
		console.log('Config.cyclic is false iterations are over');
		return undefined;
	}

	if (this.currentPos === this.array.length) {
		this.currentPos = 0;
	}

	ind = this.currentPos + 1;

	for(; currSubArrLength < this.width; currSubArrLength++, ind++) {
		if (ind === this.array.length) {
			if (this.cyclic) {
				ind = 0;	
			}
			
			if (!this.cyclic) {
				this.currentPos++;
				return subArr;
			}
		}

		subArr.push(this.array[ind]);
	}

	this.currentPos++;

	return subArr;
};

Iterator.prototype.current = function() {
	var subArr = [];
	var ind = this.currentPos;
	var currSubArrLength = 0;

	if (!this.cyclic && this.currentPos === this.array.length - 1) {
		console.log('Config.cyclic is false iterations are over. Last element:');
		return [this.array[this.array.length - 1]];
	}

	for(; currSubArrLength < this.width; currSubArrLength++, ind++) {
		if (ind === this.array.length) {
			if (this.cyclic) {
				ind = 0;	
			}
			
			if (!this.cyclic) {
				return subArr;
			}
		}

		subArr.push(this.array[ind]);
	}

	return subArr;
};

Iterator.prototype.backward = function() {
	var subArr = [];
	var ind;
	var currSubArrLength = 0;

	if (!this.cyclic && !this.currentPos) {
		console.log('Config.cyclic is false iterations are over');
		return [this.array[0]];
	}

	ind = this.currentPos - 1;

	for(; currSubArrLength < this.width; currSubArrLength++, ind--) {
		if (ind === -1) {
			if (this.cyclic) {
				ind = this.array.length - 1;	
			}
			
			if (!this.cyclic) {
				this.currentPos--;
				return subArr;
			}
		}

		subArr.unshift(this.array[ind]);
	}

	if (!this.currentPos) {
		this.currentPos = this.array.length - 1;
	} else {
		this.currentPos--;
	}

	return subArr;
};

Iterator.prototype.jumpTo = function(index) {
	if (isNaN(index) || index < 0 || index > this.array.length - 1) {
		console.log('Index value should be in range from 0 to array length!');
		return undefined;
	}

	this.currentPos = index;
	return undefined;
};

var arr = [0,1,2,3,4,5,6,7,8,9];
var arr2 = [0,1,2,3];
var iterableArr = new Iterator(arr, { cyclic: true, width: 4});

var iterable2 = new Iterator(arr2, { cyclic: false, width: 3});
