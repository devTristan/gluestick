gluestick
=========

No bullshit dom-data glue

No template parsing, no mercy. This little module binds data to the DOM in an efficient manner with almost zero overhead, while maintaining total flexibility.

Depends on jQuery or zepto, whichever you prefer.

Example
=======

First, include the script

```html
<script src="gluestick.js"></script>
```

Second, define a template

```javascript
var Post = glue('<div class="post"><h3></h3><p></p></div>');
Post.set.title = glue.set.text('h3');
Post.set.content = glue.set.html('p');

Post.def.title = "Untitled Post";
```

Third, generate some elements

```javascript
var newPost = Post.create({
	title: 'Hello, World!',
	content: 'This is my first time using gluestick!'
});

newPost.appendTo('body');
```

And finally, keep those elements updated

```javascript
newPost.set('content', 'This is my first time using gluestick!<br>Edit: gluestick is great!');
```

Documentation
=============

glue(selector, html string, element)
The input is passed to jQuery, so it will accept anything that jquery does.

It returns a template object. You add setters to this object like this:

```javascript
template.set.waffles = function(value){
	this.attr('data-waffles', value);
};
```

There are several built-in convenience setter function generators for common actions.
They are as follows:

* glue.set.text([selector]): sets the inner text of an element
* glue.set.html([selector]): sets the inner html of an element
* glue.set.element([selector]): puts an element in your element
* glue.set.css(attribute, [selector]): sets a css attribute of an element
* glue.set.attr(attribute, [selector]): sets an html attribute of an element
* glue.set.hasClass(className, [selector]): adds or removes a defined class to an element

You can also provide default values, like this:

```javascript
template.def.waffles = 3;
```

Values can be given as functions, which will be executed when they are used.

```javascript
template.def.waffles = function(){
	return Math.floor( Math.random()*25 );
};
```

Template objects only have one method, and that is the "create" method. It returns a jQuery (or zepto) object, which you can then appendTo or insertAfter anything you like.

```javascript
var myThingy = template.create({
	waffles: 25
});
myThingy.appendTo('body');
```

That object differs from a jQuery object in one way: it has a "set" method, which is used like so:

```javascript
myThingy.set('waffles', 12);
```

Or...

```javascript
myThingy.set({'waffles': 12});
```

This will update the element with whatever data you give it.

Speed Considerations
====================

gluestick is very fast. So fast, in fact, that there's no point even benchmarking it because the browser overwhelmingly becomes the bottleneck.

Why is it fast? Because it doesn't do any string parsing or generation whatsoever. It interacts directly with the DOM instead of generating markup for the browser to interpret.
