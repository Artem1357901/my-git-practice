const canvas = document.getElementById("screen");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.70, 0.87, 1.00, 1);

const camera = new BABYLON.ArcRotateCamera("camera",
    -Math.PI / 2, Math.PI / 3, 11, new BABYLON.Vector3(0, 0, 0), scene);
camera.attachControl(canvas, true);

new BABYLON.HemisphericLight( "sun", new BABYLON.Vector3(0, 1, 0), scene);

const ground = BABYLON.MeshBuilder.CreateGround( "ground", { width: 12, height: 12 },
    scene );

const grass = new BABYLON.StandardMaterial("grass", scene);
grass.diffuseColor = new BABYLON.Color3(0.25, 0.72, 0.42);
ground.material = grass;

const cube = BABYLON.MeshBuilder.CreateBox( "cube", {size: 1.6 }, scene);
cube.position.y = 0.8;
const orange = new BABYLON.StandardMaterial("orange", scene);
orange.diffuseColor = new BABYLON.Color3(1.00, 0.44, 0.12);
cube.material = orange;

const ball = BABYLON.MeshBuilder.CreateSphere( "ball", {diameter: 1 }, scene);
ball.position.set(2.4, 0.5, 1.2);
const pink = new BABYLON.StandardMaterial("pink", scene);
pink.diffuseColor = new BABYLON.Color3(0.97, 0.27, 0.65);
ball.material = pink;

engine.runRenderLoop(() => {cube.rotation.y += 0.01; scene.render();});

window.addEventListener("relize", () => engine.relize());