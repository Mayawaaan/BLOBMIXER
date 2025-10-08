import * as THREE from 'three';
import {
    RGBELoader
} from 'three/examples/jsm/loaders/RGBELoader';
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import {
    mergeVertices
} from 'three/examples/jsm/utils/BufferGeometryUtils';
import vertexShader from './Shaders/vertexShader.glsl';
import {
    Text
} from 'troika-three-text';
import textVertex from './Shaders/textVertex.glsl';
import gsap from "gsap"

// --- WHY IS THE GRADIENT ONLY VISIBLE ON THE 1ST BLOB? ---
// The issue is that when you change the `material.map` property after the first blob, you do not trigger a material update
// and, more importantly, the new texture may not be loaded yet when you assign it. This can cause the gradient to only appear
// on the first blob, and not update for subsequent blobs. To fix this, you should load the new texture asynchronously and
// assign it to the material only after it has finished loading, then set `material.needsUpdate = true`.
// ----------------------------------------------------------

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const rgbeLoader = new RGBELoader(loadingManager);

const blobs = [{
        name: 'Gradient 1',
        background: '#9D73F7',
        config: {
            "uPositionFrequency": 1,
            "uPositionStrength": 0.3,
            "uSmallWavePositionFrequency": 0.5,
            "uSmallWavePositionStrength": 0.7,
            "roughness": 0.3,
            "metalness": 0.6,
            "envMapIntensity": 0.7,
            "clearcoat": 0,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0001"
        },
    },
    {
        name: 'Gradient 2',
        background: '#5300B1',
        config: {
            "uPositionFrequency": 0.584,
            "uPositionStrength": 0.276,
            "uSmallWavePositionFrequency": 0.899,
            "uSmallWavePositionStrength": 1.266,
            "roughness": 0.3,
            "metalness": 0.6,
            "envMapIntensity": 0.7,
            "clearcoat": 0,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0002"
        },
    },
    {
        name: 'Gradient 3',
        background: '#562245',
        config: {
            "uPositionFrequency": 0.584,
            "uPositionStrength": 0.276,
            "uSmallWavePositionFrequency": 0.899,
            "uSmallWavePositionStrength": 1.266,
            "roughness": 0.3,
            "metalness": 0.6,
            "envMapIntensity": 0.7,
            "clearcoat": 0,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0003"
        },
    },
    {
        name: 'Gradient 4',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0004"
        },
    },
    {
        name: 'Gradient 5',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0005"
        },
    },
    {
        name: 'Gradient 6',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0006"
        },
    },
    {
        name: 'Gradient 7',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0007"
        },
    },
    {
        name: 'Gradient 8',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0008"
        },
    },
    {
        name: 'Gradient 9',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0009"
        },
    },
    {
        name: 'Gradient 10',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0010"
        },
    },
    {
        name: 'Gradient 11',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0011"
        },
    },
    {
        name: 'Gradient 12',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0012"
        },
    },
    {
        name: 'Gradient 13',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0013"
        },
    },
    {
        name: 'Gradient 14',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0014"
        },
    },
    {
        name: 'Gradient 15',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_0015"
        },
    },
    {
        name: 'Gradient 16',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_00016"
        },
    },
    {
        name: 'Gradient 17',
        background: '#45ACD8',
        config: {
            "uPositionFrequency": 1.022,
            "uPositionStrength": 0.99,
            "uSmallWavePositionFrequency": 0.378,
            "uSmallWavePositionStrength": 0.341,
            "roughness": 1,
            "metalness": 0,
            "envMapIntensity": 0,
            "clearcoat": 0.5,
            "clearcoatRoughness": 0,
            "transmission": 0,
            "flatShading": false,
            "wireframe": false,
            "map": "grad_00017"
        },
    },

]

let isAnimating = false;
let currentIndex = 0;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#333');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas')
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;

const uniforms = {
    uTime: {
        value: 0
    },
    uPositionFrequency: {
        value: blobs[currentIndex].config.uPositionFrequency
    },
    uPositionStrength: {
        value: blobs[currentIndex].config.uPositionStrength
    },
    uTimeFrequency: {
        value: .3
    },
    uSmallWavePositionFrequency: {
        value: blobs[currentIndex].config.uSmallWavePositionFrequency
    },
    uSmallWavePositionStrength: {
        value: blobs[currentIndex].config.uSmallWavePositionStrength
    },
    uSmallWaveTimeFrequency: {
        value: .3
    },
};

const material = new CustomShaderMaterial({
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader,
    map: textureLoader.load(`./gradients/${blobs[currentIndex].config.map}.png`),
    metalness: blobs[currentIndex].config.metalness,
    roughness: blobs[currentIndex].config.roughness,
    envMapIntensity: blobs[currentIndex].config.envMapIntensity,
    clearcoat: blobs[currentIndex].config.clearcoat,
    clearcoatRoughness: blobs[currentIndex].config.clearcoatRoughness,
    transmission: blobs[currentIndex].config.transmission,
    flatShading: blobs[currentIndex].config.flatShading,
    wireframe: blobs[currentIndex].config.wireframe,
    uniforms,
});

const mergedGeometry = mergeVertices(new THREE.IcosahedronGeometry(1, 70));
mergedGeometry.computeTangents();

const sphere = new THREE.Mesh(mergedGeometry, material);
scene.add(sphere);

camera.position.z = 3;

rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const clock = new THREE.Clock();

const textMaterial = new THREE.ShaderMaterial({
    fragmentShader: `void main() { gl_FragColor = vec4(1.0); }`,
    vertexShader: textVertex,
    side: THREE.DoubleSide,
    uniforms: {
        progress: {
            value: 0.0
        },
        direction: {
            value: 1
        },
    }
});

const texts = blobs.map((blob, index) => {
    const myText = new Text();
    myText.text = blob.name;
    myText.font = `./aften_screen.woff`;
    myText.anchorX = 'center';
    myText.anchorY = 'middle';
    myText.material = textMaterial;
    myText.position.set(0, 0, 2);
    if (index !== 0) myText.scale.set(0, 0, 0);
    myText.letterSpacing = -0.08;
    myText.fontSize = window.innerWidth / 4000;
    myText.glyphGeometryDetail = 20;
    myText.sync();
    scene.add(myText);
    return myText;
})

window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    isAnimating = true;
    let direction = Math.sign(e.deltaY);
    let next = (currentIndex + direction + blobs.length) % blobs.length;

    texts[next].scale.set(1, 1, 1);
    texts[next].position.x = direction * 3.5;

    gsap.to(textMaterial.uniforms.progress, {
        value: .5,
        duration: 1,
        ease: 'linear',
        onComplete: () => {
            currentIndex = next;
            isAnimating = false;
            textMaterial.uniforms.progress.value = 0;
        }
    })

    gsap.to(texts[currentIndex].position, {
        x: -direction * 3,
        duration: 1,
        ease: 'power2.inOut',
    })

    gsap.to(sphere.rotation, {
        y: sphere.rotation.y + Math.PI * 4 * -direction,
        duration: 1,
        ease: 'power2.inOut',
    })

    gsap.to(texts[next].position, {
        x: 0,
        duration: 1,
        ease: 'power2.inOut',
    })

    const bg = new THREE.Color(blobs[next].background);
    gsap.to(scene.background, {
        r: bg.r,
        g: bg.g,
        b: bg.b,
        duration: 1,
        ease: 'linear',
    })

    updateBlob(blobs[next].config);
})

function updateBlob(config) {
    if (config.uPositionFrequency !== undefined) gsap.to(material.uniforms.uPositionFrequency, {
        value: config.uPositionFrequency,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.uPositionStrength !== undefined) gsap.to(material.uniforms.uPositionStrength, {
        value: config.uPositionStrength,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.uSmallWavePositionFrequency !== undefined) gsap.to(material.uniforms.uSmallWavePositionFrequency, {
        value: config.uSmallWavePositionFrequency,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.uSmallWavePositionStrength !== undefined) gsap.to(material.uniforms.uSmallWavePositionStrength, {
        value: config.uSmallWavePositionStrength,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.uSmallWaveTimeFrequency !== undefined) gsap.to(material.uniforms.uSmallWaveTimeFrequency, {
        value: config.uSmallWaveTimeFrequency,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.map !== undefined) {
        // FIX: Load the new texture asynchronously and assign it only after it's loaded
        setTimeout(() => {
            textureLoader.load(`./gradients/${config.map}.png`, (newTexture) => {
                material.map = newTexture;
                material.needsUpdate = true;
            });
        }, 400);
    }
    if (config.roughness !== undefined) gsap.to(material, {
        roughness: config.roughness,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.metalness !== undefined) gsap.to(material, {
        metalness: config.metalness,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.envMapIntensity !== undefined) gsap.to(material, {
        envMapIntensity: config.envMapIntensity,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.clearcoat !== undefined) gsap.to(material, {
        clearcoat: config.clearcoat,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.clearcoatRoughness !== undefined) gsap.to(material, {
        clearcoatRoughness: config.clearcoatRoughness,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.transmission !== undefined) gsap.to(material, {
        transmission: config.transmission,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.flatShading !== undefined) gsap.to(material, {
        flatShading: config.flatShading,
        duration: 1,
        ease: 'power2.inOut'
    });
    if (config.wireframe !== undefined) gsap.to(material, {
        wireframe: config.wireframe,
        duration: 1,
        ease: 'power2.inOut'
    });
}

loadingManager.onLoad = () => {
    function animate() {
        requestAnimationFrame(animate);
        uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    }
    const bg = new THREE.Color(blobs[currentIndex].background);
    gsap.to(scene.background, {
        r: bg.r,
        g: bg.g,
        b: bg.b,
        duration: 1,
        ease: 'linear'
    });
    animate();
};