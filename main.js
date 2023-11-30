img="";
status = "";
objects =[];



function preload(){
    audio = loadSound("001.mp3");
   }
   


function setup(){
    canvas= createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Dectecting"
   
}
function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);
}

function draw() {
    image(video, 0, 0,400, 400);

    if(status !="person")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i< objects.length; i++)
        {
          document.getElementById('status').innerHTML = 'Status : Object Detected';
          document.getElementById("number_of_objects").innerHTML = "Baby found"+ objects.length;
          audio.stop();

          fill(r,g,b);
          percent = floor(objects[i].confidence*100);
          text(objects[i].label+"" + percent + "%" ,objects[i].x + 15,objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    else {
        document.getElementById("status").innerHTML = "status : Object detected";
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found" + objects.length;
        audio.play();
    }
    
    
}

function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}