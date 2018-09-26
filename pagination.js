/**
 * @author Tuhin Paul
 * 
 * Returns an array of pagination elements including the characters in ['«', »'].
 * 
 * @param count is the total no of items to be distributed over a range of pages.
 * @param pageSize is the maximum number of items displayed on a single page.
 * @param padding tells how many items to show on each side of the current page number.
 * @param pageNo is the current page number. Page numbers start from 1.
 * 
 * @returns an array containing the page numbers and characters in ['«', »'].
 * @throws exception "Bad argument." if any error in an argument is found.
 * */
function pageRange(count, pageSize, padding, pageNo) {

	/**
	 * check if arguments make sense
	 * */
	if (typeof count != "number" || typeof pageSize != "number" || typeof padding != "number" || typeof pageNo != "number") {
		throw "Bad argument";
	}

	if (count < 0 || pageSize <= 0 || padding <= 0 || pageNo <= 0) {
		throw "Bad argument";
	}

	if (count == 0) {
		return [];
	}

	var lastPageNumber = Math.ceil(count / pageSize);

	var leftCount = 0;
	var rightCount = 0;

	var leftArr = [];
	var rightArr = [];

	var leftPadding = padding;
	var rightPadding = padding;

	while (true) {
		var leftTest = pageNo - leftCount - 1;
		var lhsOpen = leftTest >= 1 && leftCount < leftPadding;
		if (lhsOpen) {
			leftArr.push(leftTest);
			leftCount += 1;
		}

		var rightTest = pageNo + rightCount + 1;
		var rhsOpen = rightTest <= lastPageNumber && rightCount < rightPadding;
		if (rhsOpen) {
			rightArr.push(rightTest);
			rightCount += 1;
		}

		// re-calculate lhsOpen
		lhsOpen = leftTest >= 1 && leftCount < leftPadding;

		// re-calculate rhsOpen
		rhsOpen = rightTest <= lastPageNumber && rightCount < rightPadding;

		if (leftCount + rightCount >= Math.min(2 * padding, lastPageNumber - 1)) {
			break;
		}

		if (!lhsOpen)
			rightPadding += 1;

		if (!rhsOpen)
			leftPadding += 1;
	}

	if (leftArr.length > 0 && leftArr[leftArr.length - 1] >= 2) {
		leftArr.pop();
		leftArr.push("«");
	}

	leftArr = leftArr.reverse();

	if (rightArr.length > 0 && rightArr[rightArr.length - 1] < lastPageNumber ) {
		rightArr.pop();
		rightArr.push("»");
	}

	this.pageRange = leftArr.concat([pageNo], rightArr);
}
