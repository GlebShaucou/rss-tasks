function Iterator(array, config) { // add check for incomming parameters
	this.array = array;
	this.width = config.width || 1;
	this.currentPos = 0;

	if (config.cyclic) {
		this.cyclic = true;
	} else {
		this.cyclic = false;
	}

	if (typeof config.windowTransform === 'function') {
		/* 	windowTransform function accepts (currentPos, width, "forward" or "backward")
		* 	and returns object { newCurrPos, newWidth}
		*/
		this.windowTransform = config.windowTransform;
	}
}

Iterator.prototype.forward = function() {
	var subArr = [];
	var ind;
	var currSubArrLength;

	if(this.windowTransform) {
		var newData = this.windowTransform(this.currentPos, this.width, 'forward');
		this.currentPos = newData.newCurrPos;
		this.width = newData.newWidth;
	}

	if (!this.cyclic && this.currentPos === this.array.length - 1) {
		throw 'Config.cyclic is false iterations are over';
		return undefined;
	}

	if (this.currentPos === this.array.length) {
		this.currentPos = 0;
	}

	ind = this.currentPos + 1;

	for(currSubArrLength = 0; currSubArrLength < this.width; currSubArrLength++, ind++) {
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
	var currSubArrLength;

	if (!this.cyclic && this.currentPos === this.array.length - 1) {
		throw 'Config.cyclic is false iterations are over. Last element:';
		return [this.array[this.array.length - 1]];
	}

	for(currSubArrLength = 0; currSubArrLength < this.width; currSubArrLength++, ind++) {
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
	var currSubArrLength;

	if(this.windowTransform) {
		var newData = this.windowTransform(this.currentPos, this.width, 'backward');
		this.currentPos = newData.newCurrPos;
		this.width = newData.newWidth;
	}

	if (!this.cyclic && !this.currentPos) {
		throw 'Config.cyclic is false iterations are over';
		return [this.array[0]];
	}

	ind = this.currentPos - 1;

	for(currSubArrLength = 0; currSubArrLength < this.width; currSubArrLength++, ind--) {
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
		throw 'Index value should be in range from 0 to array length!';
		return undefined;
	}

	this.currentPos = index;
	return undefined;
};

var arr = [0,1,2,3,4,5,6,7,8,9];

var iterableCycled = new Iterator(arr, { cyclic: true, width: 4});

var iterableNonCycled = new Iterator(arr, { cyclic: false, width: 3});

function wintrans(pos, width, direction) { 
	var obj = {}; 

	if(direction == 'forward') { 
		obj.newCurrPos = pos + 1; 
		obj.newWidth = width - 1; 
	} 

	if(direction == 'backward') { 
		obj.newCurrPos = pos - 1; 
		obj.newWidth = width - 1; 
	}

	return obj;
}

var iteratorWithTransform = new Iterator(arr, {
	cyclic: true, 
	width: 4,
	windowTransform: wintrans
});