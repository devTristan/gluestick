var glue = function(html){
	var $parent = $(html);
	$parent.set = {};
	$parent.def = {};
	
	$parent.create = function(data){
		var $child = $parent.clone().removeClass('template');
		$child.set = function(field, value){
			if (typeof value == 'undefined' && typeof field == 'object') {
				for (var i in field) {
					$child.set(i, field[i]);
				}
				return;
			}
			
			if (typeof $parent.set[field] != 'function') {
				throw "Couldn't find setter for "+field;
			}
			
			$child.data[field] = value;
			$parent.set[field].call($child, value);
		};
		
		var vars = {};
		for (var i in $parent.def) {
			vars[i] = $parent.def[i];
		}
		if (typeof data == 'object') {
			for (var i in data) {
				vars[i] = data[i];
			}
		}
		
		$child.set(vars);
		
		return $child;
	};
	
	return $parent;
};

glue.set = {};
glue.set.text = function(selector){
	if (selector) {
		return function(text){
			this.find(selector).text(text);
		};
	} else {
		return function(text){
			this.text(text);
		};
	}
};
glue.set.html = function(selector){
	if (selector) {
		return function(html){
			this.find(selector).html(html);
		};
	} else {
		return function(html){
			this.text(html);
		};
	}
};
glue.set.element = function(selector){
	if (selector) {
		return function(element){
			this.find(selector).html('').append(element);
		};
	} else {
		return function(element){
			this.html('').append(element);
		};
	}
}
glue.set.css = function(attribute, selector){
	if (selector) {
		return function(value){
			this.find(selector).css(attribute, value);
		};
	} else {
		return function(value){
			this.css(attribute, value);
		};
	}
};
glue.set.attr = function(attribute, selector){
	if (selector) {
		return function(value){
			this.find(selector).attr(attribute, value);
		};
	} else {
		return function(value){
			this.attr(attribute, value);
		};
	}
};
glue.set.hasClass = function(className, selector){
	if (selector) {
		return function(hasClass){
			if (hasClass) {
				this.find(selector).addClass(className);
			} else {
				this.find(selector).removeClass(className);
			}
		};
	} else {
		return function(hasClass){
			if (hasClass) {
				this.addClass(className);
			} else {
				this.removeClass(className);
			}
		};
	}
};
