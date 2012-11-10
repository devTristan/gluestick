var Box = glue('.template.box');
Box.set.title = glue.set.text('.boxTitle');
Box.set.content = glue.set.html('.content');
Box.set.id = glue.set.attr('id');
Box.set.titleColor = glue.set.css('color', '.boxTitle');
Box.set.important = glue.set.hasClass('important');
Box.set.type = glue.set.addClass();
Box.set.clicks = function(clicks){
	var $sentence = $(this).find('.clickSentence');
	$sentence.find('.clicks').text(clicks + ' time' + (clicks == 1 ? '' : 's') + '.');
	if (clicks == 0) {
		$sentence.hide();
	} else {
		$sentence.show();
	}
};
Box.def.title = function(){
	return 'Untitled - '+(new Date()).toDateString();
};
Box.def.content = 'Empty box';
Box.def.titleColor = 'inherit';
Box.def.important = false;
$('body').on('click', '.box', function(){
	myBox.set('clicks', myBox.data.clicks + 1);
});
Box.def.clicks = 0;

var myBox = Box.create();

myBox.appendTo('body');

setTimeout(function(){
	myBox.set({
		title: 'Important document (click me)',
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sed elit sed libero faucibus porta molestie sed lorem. Duis porttitor fermentum dolor molestie ullamcorper. Fusce dignissim, nisl vitae condimentum posuere, est risus commodo erat, et posuere sem justo id quam. Phasellus ullamcorper gravida ultrices. Quisque mattis enim sed diam viverra consectetur. Ut libero purus, posuere id interdum non, sollicitudin quis leo. Proin ultrices ullamcorper elit varius varius. Sed lacus nisi, bibendum vel luctus id, volutpat et dui. Fusce viverra eleifend diam. Suspendisse urna lacus, mattis quis consequat ac, imperdiet non eros. Vestibulum id ipsum diam, ac mattis arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed hendrerit tellus sed arcu commodo in tempor erat porttitor. Vestibulum eros nulla, posuere ac pulvinar vitae, tincidunt vestibulum metus.',
		titleColor: 'blue',
		type: 'fancy' 
	});
	myBox.set('important', true);
}, 2000);
