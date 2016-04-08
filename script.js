   function drawImage(imageObj1, number) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var imageX = 0;
        var imageY = 0;
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;

        context.drawImage(imageObj, 0, 0);
        context.drawImage(imageObj, 430, 0);
      }
function drawNewImage(imageObj1, number) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var imageX = 0;
        var imageY = 0;
        var imageWidth = imageObj.width;
        var imageHeight = imageObj.height;
        factor = Math.log10(Math.abs(number/10));

        context.drawImage(imageObj, 0, 0);


        var imageData1 = context.getImageData(imageX, imageY, imageWidth, imageHeight);
        var imageData= context.getImageData(430,0,imageWidth,imageHeight);
       	var data = imageData.data; 

        // iterate over all pixels
        for(var i = 0, n = data.length; i < n; i += 4) {
          var red = data[i];
          var green = data[i + 1];
          var blue = data[i + 2];
          var alpha = data[i + 3];
          if (number<0){
          imageData1.data[i] = red + number*factor ;
          imageData1.data[i + 1] = green + number*factor;
          imageData1.data[i + 2] = blue;
          imageData1.data[i + 3] = alpha;
        }
          if (number>0){
          imageData1.data[i] = red;
          imageData1.data[i + 1] = green - number*factor;
          imageData1.data[i + 2] = blue;
          imageData1.data[i + 3] = alpha;

          }
        }
        context.putImageData(imageData1, 0, 0);
      }
var imageObj = new Image();
imageObj.onload = function() {
drawImage(this,0)};
var diff = 0;
$( "#slider3" ).val(0);
$( "#ip1" ).val(0);
imageObj.crossOrigin="anonymous";
imageObj.src = 'star-small.png';
$( document ).ready(function() {
    console.log( "ready!" );
    $( "#slider3" ).change(function() {
		var imageObj = new Image();
	    imageObj.onload = function() {
	        drawNewImage(this, $( "#slider3" ).val());
	    };
	    imageObj.crossOrigin="anonymous";
	    imageObj.src = 'star.png';
});

	$( "#ip1" ).change(function() {
	    var imageObj = new Image();
	    imageObj.onload = function() {
	   		drawNewImage(this, $( "#ip1" ).val());
	   	};
	   	imageObj.crossOrigin="anonymous";
	    imageObj.src = 'star.png';
	});
});

