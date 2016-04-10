var data = [];

function drawReferenceImage(imageObj1, number) {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageX = 0;
    var imageY = 0;
    var imageWidth = imageObj.width;
    var imageHeight = imageObj.height;
		
	context.drawImage(imageObj, 0, 0);
	var imageData= context.getImageData(0, 0, imageWidth, imageHeight);
    var tempdata = imageData.data; 
	for(var i = 0, n = tempdata.length; i < n; i++) {
			data[i]= tempdata [i];
		}
    }
function modifyImage(imageObj1, number) {
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var imageX = 0;
	var imageY = 0;
	var imageWidth = imageObj.width;
	var imageHeight = imageObj.height;
	factor = Math.log10 ( Math.abs (number));
	var imageData1 = context.getImageData(imageX, imageY, imageWidth, imageHeight);

        // iterate over all pixels
	for(var i = 0, n = data.length; i < n; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var alpha = data[i + 3];
        if (number < 0) {
        	imageData1.data[i] = red + (number * factor);
        	imageData1.data[i + 1] = green + (number * factor);
        	imageData1.data[i + 2] = blue - (number * factor);
        	imageData1.data[i + 3] = alpha;
        }
        else if (number > 0){
        	imageData1.data[i] = red;
        	imageData1.data[i + 1] = green - (number * factor);
        	imageData1.data[i + 2] = blue - (number * factor);
        	imageData1.data[i + 3] = alpha;
		} else {
			imageData1.data[i] = red;
          	imageData1.data[i + 1] = green;
          	imageData1.data[i + 2] = blue;
          	imageData1.data[i + 3] = alpha;
		}
	}
	context.putImageData(imageData1, 0, 0);
}
var imageObj = new Image();
imageObj.onload = function() {
drawReferenceImage(this, 0)};
var diff = 0;
$('#slider').val(0);
$('#ip').val(0);
imageObj.crossOrigin = 'anonymous';
imageObj.src = 'star-small.png';

$( document ).ready(function() {
	$( '#slider').change(function() {
		var imageObj = new Image();
		imageObj.onload = function() {
	    	modifyImage(this, $('#slider').val());
	    };
		$('#ip').val($('#slider').val());
		imageObj.crossOrigin = 'anonymous';
		imageObj.src = 'star-small.png';
	});

	$('#ip').change(function() {
		if($('#ip').val() < -100 || $('#ip').val() > 100){
			alert('Value should be within range -100 to 100');
			$('#ip').val(0);
		} else{
	    	var imageObj = new Image();
	    	imageObj.onload = function() {
	   			modifyImage(this, $('#ip').val());
	   		};
		$('#slider').val($('#ip').val());
		imageObj.crossOrigin = 'anonymous';
		imageObj.src = 'star-small.png';
		}
	});
});

