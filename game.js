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
grass.diffuseColor = new BABYLON.Color3(0.20, 0.55, 1.00);
ground.material = grass;

const cube = BABYLON.MeshBuilder.CreateBox( "cube", {size: 2.0 }, scene);
cube.position.y = 1.0;
const orange = new BABYLON.StandardMaterial("orange", scene);
orange.diffuseColor = new BABYLON.Color3(1.00, 0.44, 0.12);
cube.material = orange;

const ball = BABYLON.MeshBuilder.CreateSphere( "ball", {diameter: 1 }, scene);
ball.position.set(2.4, 0.5, 1.2);
const pink = new BABYLON.StandardMaterial("pink", scene);
pink.diffuseColor = new BABYLON.Color3(0.97, 0.27, 0.65);
ball.material = pink;

const keys = {};
window.addEventListener("keydown", (event) => { keys[event.code] = true;});
window.addEventListener("keyup", (event) => { keys[event.code] = false;});

let score = 0;
const scoreBox = document.getElementById("score");
const spots = [ [2.4, 1.2], [-3, -2], [3, -3], [-2, 3], [2, 3] ];

engine.runRenderLoop(() => { const speed = 10 * engine.getDeltaTime() / 1000;
    if (keys["KeyW"]) cube.position.z += speed;
    if (keys["KeyS"]) cube.position.z -= speed;
    if (keys["KeyA"]) cube.position.x -= speed;
    if (keys["KeyD"]) cube.position.x += speed;
    const edge = 5.2;

    cube.position.x = Math.max(-edge, Math.min(edge, cube.position.x));
    cube.position.z = Math.max(-edge, Math.min(edge, cube.position.z));
    scene.render();

    const dx = cube.position.x - ball.position.x;
    const dz = cube.position.z - ball.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    if (score < 5 && distance < 1.3) { score += 1;
        if (score === 5) { scoreBox.textContent = "Победа! 5/5";
            ball.setEnabled(false);}
        else { scoreBox.textContent = "Шары: " + score + "/5";
            const next = spots[score];
            ball.position.x = next[0];
            ball.position.z = next[1];
        }
    }
 });

window.addEventListener("relize", () => engine.relize());

