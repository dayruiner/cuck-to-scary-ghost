walk(document.body);

if (window.MutationObserver) {
	var observer = new MutationObserver(function (mutations) {
		Array.prototype.forEach.call(mutations, function (m) {
			if (m.type === 'childList') {
				walk(m.target);
			} else if (m.target.nodeType === 3) {
				handleText(m.target);
			}
		});
	});

	observer.observe(document.body, {
		childList: true,
		attributes: false,
		characterData: true,
		subtree: true
	});
}

function walk(node) 
{
	// I stole this function from here:
	// https://github.com/alexhong/sjw-to-skeleton
	// They, in turn, stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	if (textNode.parentElement.tagName.toLowerCase() === "script" || textNode.parentElement.isContentEditable === true) {
		return false;
	}

	var oldValue = textNode.nodeValue;
	var v = oldValue;

	v = v.replace(/\bcuck(s?)\b/g, "scary ghost$1");
	v = v.replace(/\bCuck(s?)\b/g, "Scary ghost$1");
	v = v.replace(/\bCUCK(S?)\b/g, "SCARY GHOST$1");
	v = v.replace(/\bcucked\b/ig, "spooked");
	v = v.replace(/\bcuckolded\b/ig, "spooked");
	v = v.replace(/\bcucking\b/ig, "spooking");
	v = v.replace(/\bcuckolding\b/ig, "spooking");
	v = v.replace(/\bcuckery\b/ig, "spookery");
	v = v.replace(/\bcuckoldry\b/ig, "spookery");
	v = v.replace(/\bcuckservative\b/ig, "spookmaster");
	v = v.replace(/\bnsfcucks\b/ig, "dumb");
	
	if (v !== oldValue) {
		textNode.nodeValue = v;
	}
}
