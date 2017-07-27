var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = Detector.webgl? new THREE.WebGLRenderer( { antialias: true } ): new THREE.CanvasRenderer();

var blue = 0x3EB6D3;
var yellow = 0x84D4DA;
var purple = 0x007CAE;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;

var tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
var ballGeometry = new THREE.SphereGeometry(0.8,32,32);
var blueMaterial = new THREE.MeshBasicMaterial( { color: blue } );
var yellowMaterial = new THREE.MeshBasicMaterial( { color: yellow } );
var purpleMaterial = new THREE.MeshBasicMaterial( { color: purple } );

var dna = new THREE.Object3D();
var holder = new THREE.Object3D();

var rows = [];

for (var i = 0; i <= 120; i++) {
  var blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
  blueTube.rotation.z = 90 * Math.PI/180; 
  blueTube.position.x = -3;

  var yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
  yellowTube.rotation.z = 90 * Math.PI/180;
  yellowTube.position.x = 3;


  var ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
  var ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
  ballRight.position.x = 6;
  ballLeft.position.x = -6;

  var row = new THREE.Object3D();
  row.add(blueTube);
  row.add(yellowTube);
  row.add(ballRight);
  row.add(ballLeft);

  row.position.y = i*2;
  row.rotation.y = 30*i * Math.PI/180;

  rows.push(row);

};


dna.position.y = -40;

scene.add(dna);

dna.position.y = -40;
holder.add(dna)
scene.add(holder);

var CubeConfigData = function() {
  this.zoom = 20;
};

var view = new CubeConfigData();
var gui = new dat.GUI();
gui.close();

gui.add( view, 'zoom', 0, 20 ).onChange( function(value) {
  camera.position.z = value;
});

window.addEventListener('mousemove', function(e) {
  var lx = e.pageX;
  var ly = e.pageY;
  camera.position.z = Math.abs(window.innerWidth/2-lx)/(window.innerWidth/2)*20 + 3;
  camera.rotation.x = (window.innerHeight/2-ly)/window.innerHeight*0.5*Math.PI;
}, false);

var count = 0;
var cCount = 0;
var render = function () {

  requestAnimationFrame(render);

  //holder.rotation.x += 0.001;
  //holder.rotation.z += 0.001;
  holder.rotation.y += 0.02;
  count++;
  if (count > 10) {
    count = 0;
    cCount++;
  }
  if (cCount <= rows.length - 1) {
    dna.add(rows[cCount]);
  }
  renderer.render(scene, camera);
}

render();
