Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
    });
  
    camera = document.getElementById("camera");

    function setup() {
        video = createCapture(VIDEO);
        video.size(550, 500);
      
        canvas = createCanvas(550, 550);
        canvas.position(560,150);
      
        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on('pose', gotPoses);
      }
  
  Webcam.attach( '#camera' );
  
  function take_snapshot()
  {
      Webcam.snap(function(data_uri) {
          document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
      });
  }
    console.log('ml5 version:', ml5.version);
  
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5q8CnzHMw/model.json',modeLoaded);

    function modeLoaded() {
        console.log('Model Loaded!');
    }
 
    function check()
    {
        img = document.getElementById('captured_image');
        classifier.classify(img, gotResult);
    }

    function gotResult(error, results) {
        if  (error) {
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("result_object_name").innerHTML = results[0].label;
            document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }
    }
