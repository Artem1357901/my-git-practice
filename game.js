const canvas = document.getElementById("screen");
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color4(0.70, 0.87, 1.00, 1);
const camera = new BABYLON.ArcRotateCamera(
 "camera", -Math.PI / 2, 0.85, 20,
 new BABYLON.Vector3(0, 0, 0), scene);

camera.attachControl(canvas, true);
new BABYLON.HemisphericLight(
 "sun", new BABYLON.Vector3(0, 1, 0), scene);

const ground = BABYLON.MeshBuilder.CreateGround(
 "ground", { width: 12, height: 12 }, scene);

const grass = new BABYLON.StandardMaterial("grass", scene);
grass.diffuseColor = new BABYLON.Color3(0.25, 0.72, 0.42);
ground.material = grass;
const cube = BABYLON.MeshBuilder.CreateBox(
 "cube", { size: 1 }, scene);

cube.position.set(-4.4, 0.5, -4.4);
const orange = new BABYLON.StandardMaterial("orange", scene);
orange.diffuseColor = new BABYLON.Color3(1, 0.44, 0.12);
cube.material = orange;

const wallColor = new BABYLON.StandardMaterial("wallColor", scene);
wallColor.diffuseColor = new BABYLON.Color3(0.51, 0.36, 0.86);
const walls = [];
function addWall(name, x, z, width, depth) {
 const wall = BABYLON.MeshBuilder.CreateBox(
 name, { width, height: 1.6, depth }, scene);

 wall.position.set(x, 0.8, z);
 wall.material = wallColor;
 walls.push(wall);}

addWall("north", 0, 5.8, 12, 0.4);
addWall("south", 0, -5.8, 12, 0.4);
addWall("west", -5.8, 0, 0.4, 12);
addWall("east", 5.8, 0, 0.4, 12);
addWall("wallA", -1.4, -2.3, 0.5, 7.2);
addWall("wallB", 1.6, 2.3, 0.5, 7.2);

const star = BABYLON.MeshBuilder.CreateSphere(
 "star", { diameter: 0.75 }, scene);

const gold = new BABYLON.StandardMaterial("gold", scene);
gold.diffuseColor = new BABYLON.Color3(1, 0.81, 0.10);
gold.emissiveColor = new BABYLON.Color3(0.50, 0.28, 0.01);
star.material = gold;
const starPlaces = [
 [-4.1, 3.7], [0, -3.7], [4, 0]];

star.position.set(starPlaces[0][0], 0.55, starPlaces[0][1]);
const exit = BABYLON.MeshBuilder.CreateBox(
 "exit", { width: 1.5, height: 0.12, depth: 1.5 }, scene);

exit.position.set(4.2, 0.06, 4.2);
const green = new BABYLON.StandardMaterial("green", scene);
green.diffuseColor = new BABYLON.Color3(0.06, 0.87, 0.67);
green.emissiveColor = new BABYLON.Color3(0.01, 0.20, 0.12);
exit.material = green;

const keys = {};
window.addEventListener("keydown", (event) => {
 keys[event.code] = true;});

window.addEventListener("keyup", (event) => {
 keys[event.code] = false;});

const scoreBox = document.getElementById("score");
const hint = document.getElementById("hint");
const message = document.getElementById("message");
let score = 0;
let won = false;

function hitsWall() {
 for (const wall of walls) {
 if (cube.intersectsMesh(wall, false)) return true;
 }
 return false;}

 engine.runRenderLoop(() => {
    if (!won) {
        const step = 4 * engine.getDeltaTime() / 1000;
        const oldX = cube.position.x;
        if (keys["KeyA"]) cube.position.x -= step;
        if (keys["KeyD"]) cube.position.x += step;
        if (hitsWall()) cube.position.x = oldX;
        const oldZ = cube.position.z;
        if (keys["KeyW"]) cube.position.z += step;
        if (keys["KeyS"]) cube.position.z -= step;
        if (hitsWall()) cube.position.z = oldZ;
 
        const dx = cube.position.x - star.position.x;
        const dz = cube.position.z - star.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        if (score < 3 && distance < 0.95) {
            score += 1;
            scoreBox.textContent = "Звёзды: " + score + "/3";
            if (score === 3) {
                star.setEnabled(false);
                hint.textContent = "Все звёзды собраны! Иди к зелёному выходу.";}
            else {
                star.position.set(starPlaces[score][0], 0.55,
                starPlaces[score][1]); }}

        const ex = cube.position.x - exit.position.x;
        const ez = cube.position.z - exit.position.z;
        if (score === 3 && Math.sqrt(ex * ex + ez * ez) < 1.15) {
            won = true;
            message.style.display = "block";
            hint.textContent = "Ты нашёл выход из лабиринта!";}}

        scene.render();});

window.addEventListener("resize", () => engine.resize());
 
 

