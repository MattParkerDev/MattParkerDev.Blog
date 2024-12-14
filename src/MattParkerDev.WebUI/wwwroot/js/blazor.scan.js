let browserRenderer = window.browserRenderer;
const logicalChildrenPropname = Symbol.for("logicalChildrenPropname");
const logicalParentPropname = Symbol.for("logicalParentPropname");
function _tempgetLogicalParent(element) {
	return element[logicalParentPropname] || null;
}
function _tempgetLogicalNextSibling(element) {
	const siblings = _tempgetLogicalChildrenArray(_tempgetLogicalParent(element));
	const siblingIndex = Array.prototype.indexOf.call(siblings, element);
	return siblings[siblingIndex + 1] || null;
}
function _tempgetLogicalChildrenArray(element) {
	return element[logicalChildrenPropname];
}
function _tempgetDomNode(logicalElement) {
	// This function only puts 'child' into the DOM in the right place relative to 'parent'
	// It does not update the logical children array of anything
	if (logicalElement instanceof Element || logicalElement instanceof DocumentFragment) {
		return logicalElement;
	}
	else if (logicalElement instanceof Comment) {
		return logicalElement.nextSibling;

		const parentLogicalNextSibling = _tempgetLogicalNextSibling(logicalElement);
		if (parentLogicalNextSibling) {
			//if (parentLogicalNextSibling instanceof Comment) {
			//	return undefined;
			//}

			// Since the parent has a logical next-sibling, its appended child goes right before that
			//return getDomNode(parentLogicalNextSibling); // May not work
			// parentLogicalNextSibling.parentNode.insertBefore(child, parentLogicalNextSibling);
			return logicalElement.nextElementSibling;

			//return parentLogicalNextSibling.previousElementSibling;
			//let childTemp  = Array.from(parentLogicalNextSibling.childNodes);
			//return childTemp[childTemp.indexOf(parentLogicalNextSibling)];
		}
		else {
			// Since the parent has no logical next-sibling, keep recursing upwards until we find
			// a logical ancestor that does have a next-sibling or is a physical element.
			return undefined; // theory, the parent upwards isnt rendering here. close comment
			//return _tempgetDomNode(_tempgetLogicalParent(logicalElement));
		}
	}
	else {
		// Should never happen
		throw new Error(`Cannot append node because the parent is not a valid logical element. Parent: ${logicalElement}`);
	}
}

function _temptoLogicalElement(element, allowExistingContents) {
	if (logicalChildrenPropname in element) { // If it's already a logical element, leave it alone
		return element;
	}
	const childrenArray = [];
	if (element.childNodes.length > 0) {
		// Normally it's good to assert that the element has started empty, because that's the usual
		// situation and we probably have a bug if it's not. But for the elements that contain prerendered
		// root components, we want to let them keep their content until we replace it.
		if (!allowExistingContents) {
			throw new Error('New logical elements must start empty, or allowExistingContents must be true');
		}
		element.childNodes.forEach(child => {
			const childLogicalElement = _temptoLogicalElement(child, /* allowExistingContents */ true);
			childLogicalElement[logicalParentPropname] = element;
			childrenArray.push(childLogicalElement);
		});
	}
	element[logicalChildrenPropname] = childrenArray;
	return element;
}

function _tempgetClosestDomElement(logicalElement) {
	if (logicalElement instanceof Element || logicalElement instanceof DocumentFragment) {
		return logicalElement;
	}
	else if (logicalElement instanceof Comment) {
		return logicalElement.parentNode;
	}
	else {
		throw new Error('Not a valid logical element');
	}
}

(function (instance) {
	if (typeof instance.updateComponent !== 'function') {
		throw new Error('The provided instance does not have an updateComponent method.');
	}

	const originalFunction = instance.applyEdits.bind(instance);

	// Replace the updateComponent method with a proxied version
	instance.applyEdits = new Proxy(originalFunction, {
		apply: (target, thisArg, args) => {
			const element = args[2];
			const childIndex = args[3];
			const test = _temptoLogicalElement(element);
			//const test2 =test[logicalParentPropname]; //@* *@;_tempgetLogicalParent(test);
			const test3 = test[logicalChildrenPropname]; //@**@;_tempgetLogicalChildrenArray(test2)
			let elementsToPaint = test3.map(x => _tempgetDomNode(x));
			//if (element instanceof Element || element instanceof DocumentFragment){
			//	elementsToPaint.push(element);
			//	//throw new Error("Haven't seen this occur yet");
			//}
			//else if (element instanceof Comment){
			//	let test = element.nextElementSibling;
			//	while (test){
			//		elementsToPaint.push(test);
			//		test = test.nextElementSibling;
			//	}
			//}
			//else{
			//	throw new Error('Not a valid logical element');
			//}

			//let closestDomElement = getClosestDomElement(element);
			if (elementsToPaint.length > 0)
			{
				setTimeout(function()
				{
					for (const elementToPaint of elementsToPaint.filter(x => x instanceof Element)) {
						elementToPaint.style.boxShadow = "0 0 0 4px inset darkorchid";
						elementToPaint.style.backgroundColor = "pink";
					}
					setTimeout(function()
					{
						for (const elementToPaint of elementsToPaint.filter(x => x instanceof Element)) {
							elementToPaint.style.boxShadow = "";
							elementToPaint.style.backgroundColor = "";
						}
					}, 150);
				}, 1);
			}

			return target(...args); // Call the original method
		},
	});
})(browserRenderer);
