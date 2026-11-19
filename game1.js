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

const ball2 = BABYLON.MeshBuilder.CreateSphere( "ball2", {diameter: 1 }, scene);
ball2.position.set(3, 0.5, 3);
const red = new BABYLON.StandardMaterial("red", scene);
red.diffuseColor = new BABYLON.Color3(0, 128, 0);
ball2.material = red;

const ball3 = BABYLON.MeshBuilder.CreateSphere( "ball3", {diameter: 1 }, scene);
ball3.position.set(-3, 0.5, -3);
const green1 = new BABYLON.StandardMaterial("green1", scene);
green1.diffuseColor = new BABYLON.Color3(0, 128, 0);
ball3.material = green1;

const keys = {};
window.addEventListener("keydown", (event) => { keys[event.code] = true;});
window.addEventListener("keyup", (event) => { keys[event.code] = false;});

const spots = [ [-3000, -2000], [-3000, -2000], [-3000, -2000], [-3000, -2000], [-3000, -2000] ];
const spots2 = [ [-3000, -2000], [-3000, -2000], [-3000, -2000], [-3000, -2000], [-3000, -2000] ];
const spots3 = [ [-3000, -2000], [-3000, -2000], [-3000, -2000], [-3000, -2000], [-3000, -2000] ];

let score = 0;
const scoreBox = document.getElementById("score");


engine.runRenderLoop(() => { const speed = 10 * engine.getDeltaTime() / 1000;
    if (keys["KeyW"]) cube.position.z += speed;
    if (keys["KeyS"]) cube.position.z -= speed;
    if (keys["KeyA"]) cube.position.x -= speed;
    if (keys["KeyD"]) cube.position.x += speed;
    const edge = 5.2;

    cube.position.x = Math.max(-edge, Math.min(edge, cube.position.x));
    cube.position.z = Math.max(-edge, Math.min(edge, cube.position.z));
    scene.render();

    const gx = cube.position.x - ball2.position.x;
    const gz = cube.position.z - ball2.position.z;
    const distance2 = Math.sqrt(gx * gx + gz * gz);

    const tx = cube.position.x - ball3.position.x;
    const tz = cube.position.z - ball3.position.z;
    const distance3 = Math.sqrt(tx * tx + tz * tz);

    const dx = cube.position.x - ball.position.x;
    const dz = cube.position.z - ball.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    if (score < 3 && distance < 1.3) { score += 1;
        if (score === 3) { scoreBox.textContent = "Победа!, заряд 3/3";
            ball.setEnabled(false);}
        else { scoreBox.textContent = "Заряд: " + score + "/3";
            const next = spots[score];
            ball.position.x = next[0];
            ball.position.z = next[1];
        }
    }
    if (score < 3 && distance2 < 1.3) { score += 1;
        if (score === 3) { scoreBox.textContent = "Победа!, заряд 3/3";
            ball2.setEnabled(false);}
        else { scoreBox.textContent = "Заряд: " + score + "/3";
            const next = spots2[score];
            ball2.position.x = next[0];
            ball2.position.z = next[1];
        }
    }
    if (score < 3 && distance3 < 1.3) { score += 1;
        if (score === 3) { scoreBox.textContent = "Победа!, заряд 3/3";
            ball3.setEnabled(false);}
        else { scoreBox.textContent = "Заряд: " + score + "/3";
            const next = spots3[score];
            ball3.position.x = next[0];
            ball3.position.z = next[1];
        }
    }
 });

window.addEventListener("relize", () => engine.relize());
