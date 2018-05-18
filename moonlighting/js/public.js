function addClass(element, value) {
	var old_class = element.className;
	if (!old_class) {
		element.className = value;
	} else {
		var old_class_split = old_class.split(" ");
		for (var i=0; i<old_class_split.length; i++) {
			if (old_class_split[i] === value) {
				return;
			}
		}
		element.className = old_class + " " + value;
	}
}

function delClass(element, value) {
	var old_class = element.className;
	if (!old_class) return;
	var old_class_split = old_class.split(" ");
	for (var i=0; i<old_class_split.length; i++) {
		if (old_class_split[i] === value) {
			element.className = old_class.replace(value, "");
			var new_class = element.className;
			if (!new_class) element.removeAttribute("class");
			if (new_class.substring(0, 1) === " ") {
				element.className = new_class.substring(1);
			}
			if (new_class.substring(new_class.length-1) === " ") {
				element.className = new_class.substring(0, new_class.length-1);
			}
			if (new_class.indexOf("  ") !== -1) {
				element.className = new_class.replace("  ", " ");
			}
		}
	}
}
