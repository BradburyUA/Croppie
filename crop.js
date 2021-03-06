// Insert application-Id, secret-key, version your app
//Backendless.initApp( application-Id, secret-key, version );

var crop = $uploadCrop = $('#upload-demo').croppie({
    viewport: {
        width: 250,
        height: 250,
        type: 'circle'
    },
    boundary: {
        width: 300,
        height: 300
    }

});

function imageToCanvas(){
    var image = document.getElementById('myImage');
    var canvas = document.getElementById('myCanvas');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.getContext("2d").drawImage(image, 0, 0);
}

function blackToWhiteBAckground(){
    var myCanvas = document.getElementById('myCanvas');
    var ctx = myCanvas.getContext('2d');
    var imgData = ctx.getImageData(0,0,myCanvas.width,myCanvas.height);
    var data=imgData.data;
    for(var i=0;i<data.length;i+=4){
        if(data[i+3]<255){
            data[i]=255;
            data[i+1]=255;
            data[i+2]=255;
            data[i+3]=255;
        }
    }
    ctx.putImageData(imgData,0,0);
}

function returnCanvSrc(){
    var image = new Image();
    var myCanvas = document.getElementById('myCanvas');
    image.src = myCanvas.toDataURL("image/jpeg");
    return image.src;
}

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $uploadCrop.croppie('bind', {
                url: e.target.result
            });
            $('.upload-demo').addClass('ready');
            $( "#hidden" ).show();
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function saveImageToBackendless(path,fileName, imageData){
    Backendless.Files.saveFile( path, fileName, imageData, true );
}

$('#upload').on('change', function () { readFile(this); });
$('#change').on('change', function () { readFile(this); });
$('.upload-result').on('click', function () {
    crop.croppie('result', 'canvas').then(function (resp) {
        $('#myImage').attr('src', resp);
        imageToCanvas();
        blackToWhiteBAckground();
        var imageSrc = returnCanvSrc();
        saveImageToBackendless('media','image2.jpg' , imageSrc);
    });
});



