objects = [];
status = "";
video = "";

function preload(){
}

function setup(){
    canvas = createCanvas(530,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video,0,0,630,410);
    if (status != ""){
        objectDetector.detect(video,gotResults);
        for (i=0;i<objects.length;i++){
            document.getElementById("no_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            
            if(objects[i].label == object_name){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status").innerHTML = object_name + " found";
                synth = window.SpeechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object_name + "found!");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = object_name + "not found";
            }
        }
    }

}

