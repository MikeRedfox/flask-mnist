var canvas;

$(function () {
    canvas = window.__canvas = new fabric.Canvas('canvas');
    canvas.backgroundColor = '#fff';
    canvas.isDrawingMode = 1;
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = 10;
    canvas.renderAll();

    // process image 
    var butt3 = document.getElementById("process_button")
    butt3.onclick = function () {

        function canvasToImg() {
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var url = canvas.toDataURL();

            var newImg = document.createElement("img"); // create img tag
            newImg.src = url;
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:8000/hook",
                data: {
                    imageBase64: url
                }
            })
            fetch("/hook")
                .then(function (response) {
                    return response.json();;
                }).then(function (text) {
                    let result = text.result
                    document.getElementById("result").innerHTML = "The number you drew is : " + result
                });



        }

        canvasToImg(); //execute the function
    }

    // // clear canvas 
    // var clear_button = document.getElementById('clear_button')
    // clear_button.onclick = function () {
    //     // canvas.clear();
    //     context = canvas.getContext("2d");
    //     canvas.clear_context();
    //     // context.clearRect(0, 0, canvas.width, canvas.height);
    //     // context.beginPath();
    //     // canvas.remove.apply(canvas, canvas.getObjects().concat())
    //     // // context.stroke();

    //     // canvas.beginPath();
    // };



});

