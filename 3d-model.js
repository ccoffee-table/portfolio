const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Load GLTF/GLB model
const loader = new THREE.GLTFLoader();
loader.load('images/model.glb', function(gltf) {
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            // Unlit with vertex colors
            child.material = new THREE.MeshBasicMaterial({
                vertexColors: true
            });
        }
    });
    const model = gltf.scene;
    scene.add(model);
    animate();
});


camera.position.set(0, 0, 1.3);



function animate() {
    requestAnimationFrame(animate);
    if (scene.children.length > 0) { // Ensure model is loaded
        scene.children[0].rotation.y += 0.01; // Rotate the model
    }
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


