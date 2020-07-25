function exchangeImg(eve) {
    var fileData = eve.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onload = function (evt) {
        var replaceSrc = evt.target.result;
        var imageObj = new Image();
        imageObj.src = replaceSrc;
        imageObj.onload = function () {
        	document.getElementById('preview_img').setAttribute("src", evt.target.result);
        };
    };
}

function scrollToMain(height) {
	moveToDance(height);
}