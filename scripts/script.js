// //Change title every minute
// //Choose fuse time
// //Change background color depending on time


//ThreeJS variables.
let camera, scene, renderer, controls;
let light = new THREE.PointLight(0xffffff, 1.1, 500, 1);
const fontLoader = new THREE.FontLoader();
const selectedTimeZone = document.querySelector('.timeZones').value;
let textGeometry, textMesh;
let previousTime;

renderer = new THREE.WebGLRenderer({
    alpha: true
});
camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);


//Time stuff
let options = {
        timeZone: selectedTimeZone,
        hour: 'numeric',
        minute: 'numeric',
    },
    formatter = new Intl.DateTimeFormat([], options);

//Initialize GameBoy and background
function init() {
    //Camera position
    camera.position.z = 1;
    scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const time = formatter.format(new Date());
    previousTime = time;
    setTime(time);
    backgroundTime(time);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;
    document.body.appendChild(renderer.domElement);
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    light.position.copy(camera.position);
    scene.add(light);
    renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//Set time on screen
function setTime(time) {
    fontLoader.load('./fonts/Digital Dismay_Regular.json', function(font) {
        if (textMesh !== undefined) scene.remove(textMesh);
        previousTime = time;
        textGeometry = new THREE.TextGeometry(previousTime.toString(), {
            font: font,
            size: 0.5,
            height: 0.1,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.01,
            bevelSegments: 3
        });
        textGeometry.center();
        const material = new THREE.MeshNormalMaterial();
        textMesh = new THREE.Mesh(textGeometry, material);
        scene.add(textMesh);
    });

}
//Update time if needed every second.
function updateTime() {
    setInterval(function() {
        if (previousTime !== formatter.format(new Date())) {
            const time = formatter.format(new Date());
            setTime(time);
            backgroundTime(time);
        }
    }, 1000);

}


//Changes background color depending on time.
function backgroundTime(time) {
    const hour = parseInt(previousTime.substr(0, previousTime.indexOf(':')));
    let g = 0;
    let b = 0;

    if (hour !== '00') {
        //Brightess color chosses has g = 201 and b = 255, so those values are divided by 24.
        g = (hour / 8.375) * 255;
        b = (hour/ 10.625) * 255;
    }
    document.body.style.backgroundColor = `rgb(0, ${g}, ${b})`;
}

//Update time when selector is changed.
document.querySelector('.timeZones').addEventListener('input', event => {
    options.timeZone = event.target.value;
    formatter = new Intl.DateTimeFormat([], options);
    const time = formatter.format(new Date());
    previousTime = time;
    setTime(time);
    backgroundTime(time);
});




//Function calls.
updateTime();
init();
animate();