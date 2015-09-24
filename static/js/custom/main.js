$(document).on('mousemove', function(e) {
  $('#coordiv').text(e.pageX + ', ' + e.pageY);
});


$(document).keydown(function(e) {
  if (e.which == 16) { // shift key
	peopleCount += 1;
	getPeople();
  } 
});

$(document).ready(function() {
	$.ajax({
	   url : 'rooms',
	   type: 'GET',
	   success : function(response) {
		    $('#ajax2div').html(response);
	   }
	});
})

setInterval(function() {
	$('#clockdiv').text(new Date());
	getPeople();
}, 1000);

var peopleCount = 1;

function getPeople() {
	
	var CLASS_FEMALE = 'bg-danger';
	var CLASS_MALE = 'bg-info';
	
	$.ajax({
	   url : 'people?count=' + peopleCount,
	   type: 'GET',
	   success : function(response) {
		   
		   var responseJson = JSON.parse(response);
		   $('#ajax1div').text("");
		   var allMen = true;
		   
		   for (var i=0;i<responseJson.length;++i) {
			   var people = responseJson[i];
			   
			   if (peopleCount < 2 && allMen && people.sex == 'female')
				  allMen = false;
			  
			   $('#ajax1div').append(people.firstname + " " + people.lastname + "<br />");
		   }
		   
		   var bgColorClass = allMen ? CLASS_MALE : CLASS_FEMALE;

		   $('#ajax1div').addClass(bgColorClass);
		   $('#ajax1div').removeClass(allMen ? CLASS_FEMALE : CLASS_MALE);

	   }
	});
}

$(document).ready(getPeople);

