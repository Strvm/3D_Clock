//Change title every minute
//Choose fuse time
//Change background color depending on time
let camera, scene, renderer, controls;
const fontLoader = new THREE.FontLoader();
let textGeometry;

renderer = new THREE.WebGLRenderer({alpha: true});
camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 10);

function init() {
    scene = new THREE.Scene();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = false;

    fontLoader.load( './fonts/Digital Dismay_Regular.json', function ( font ) {

        textGeometry = new THREE.TextGeometry( 'Hello three.js!', {
            color: 0x222f3e,
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        textGeometry.center();
        var material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh( textGeometry, material );
        scene.add( mesh );
    } );
    // const materials = [
    //     new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), // front
    //     new THREE.MeshPhongMaterial( { color: 0xffffff } ) // side
    // ];
    // var material = new THREE.MeshPhongMaterial(
    //     { color: 0xffffff}
    // );
    //
    // scene.add(textGeometry, material);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


init();
animate();