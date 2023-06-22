import * as THREE from 'three';
export const modelPath = './model/fbx/';
export const actorModelPath = './model/fbx/actor/';
export const mapModelPath = './model/fbx/map/';

export const KEY_CODE = {
    ENTER: 13,
    PAGE_UP: 38,
    F: 70,
    D: 68,
    H: 72,
    NUMBER_1: 49,
    NUMBER_2: 50,
};

export const listModelObject = [
    null,
];
export const fbxMapPaths = [
    mapModelPath + 'map_xin.fbx',
];
export const fbxActorPaths = [
    actorModelPath + 'attack1.fbx',
    actorModelPath + 'attack2.fbx',
    actorModelPath + 'dead.fbx',
    actorModelPath + 'hit.fbx',
    actorModelPath + 'idle.fbx',
    actorModelPath + 'kinfe.fbx',
    actorModelPath + 'lon.fbx',
    actorModelPath + 'run.fbx',
];
export function loadTextures() {
    var textureLoader = new THREE.TextureLoader();

    //load map models
    modelMapping.ground.texture = textureLoader.load(modelMapping.ground.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.tuong.texture = textureLoader.load(modelMapping.tuong.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.barrel1.texture = textureLoader.load(modelMapping.barrel1.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.barrel2.texture = textureLoader.load(modelMapping.barrel2.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.crate1.texture = textureLoader.load(modelMapping.crate1.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.crate2.texture = textureLoader.load(modelMapping.crate2.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.crate3.texture = textureLoader.load(modelMapping.crate3.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.crate4.texture = textureLoader.load(modelMapping.crate4.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.crate5.texture = textureLoader.load(modelMapping.crate5.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.bucket.texture = textureLoader.load(modelMapping.bucket.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.chest.texture = textureLoader.load(modelMapping.chest.path, function (texture) { console.log(texture) }, function (event) { }, function (e) { console.log(e) });
    modelMapping.lambert3SG1.texture = textureLoader.load(modelMapping.lambert3SG1.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });
    modelMapping.lambert7.texture = textureLoader.load(modelMapping.lambert7.path, function (texture) { }, function (event) { }, function (e) { console.log(e) });

    //load actor models
    actorMapping.pk.texture = textureLoader.load(actorMapping.pk.path);
    actorMapping.hair.texture = textureLoader.load(actorMapping.hair.path);
    actorMapping.bake.texture = textureLoader.load(actorMapping.bake.path);
    actorMapping.skin.texture = textureLoader.load(actorMapping.skin.path);
}


export function loadModel(object, modelMapping) {
    //do something
    object.traverse(function (child) {
        if (child.isMesh && child.hasOwnProperty('material')) {
            if (child.material.name !== undefined) {
                let map;
                for (const mapModel in modelMapping) {
                    
                    if (child.material.name == modelMapping[mapModel]['name']) {
                        map = modelMapping[mapModel]['texture'];
                    }
                }
                if (child.material.type == MATERIAL_TYPES.MeshPhongMaterial) {
                    child.material = new THREE.MeshPhongMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshBasicMaterial) {
                    child.material = new THREE.MeshBasicMaterial({ map: meshs[childCount] })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshDepthMaterial) {
                    child.material = new THREE.MeshDepthMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshDistanceMaterial) {
                    child.material = new THREE.MeshDistanceMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }
                else if (material.type == MATERIAL_TYPES.MeshLambertMaterial) {
                    child.material = new THREE.MeshLambertMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshMatcapMaterial) {
                    child.material = new THREE.MeshMatcapMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshNormalMaterial) {
                    child.material = new THREE.MeshNormalMaterial({ normalMap: map })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshPhysicalMaterial) {
                    child.material = new THREE.MeshPhysicalMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshStandardMaterial) {
                    child.material = new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }
                else if (child.material.type == MATERIAL_TYPES.MeshToonMaterial) {
                    child.material = new THREE.MeshToonMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                }

            }
            else {
                if (child.material instanceof Array) {
                    child.material.forEach(element => {
                        let map;
                        for (const mapModel in modelMapping) {
                            if (element.name == modelMapping[mapModel]['name']) {
                                map = modelMapping[mapModel]['texture'];
                            }
                        }
                        if (element.type == MATERIAL_TYPES.MeshPhongMaterial) {
                            element = new THREE.MeshPhongMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshBasicMaterial) {
                            element = new THREE.MeshBasicMaterial({ map: meshs[childCount] })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshDepthMaterial) {
                            element = new THREE.MeshDepthMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshDistanceMaterial) {
                            element = new THREE.MeshDistanceMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshLambertMaterial) {
                            element = new THREE.MeshLambertMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshMatcapMaterial) {
                            element = new THREE.MeshMatcapMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshNormalMaterial) {
                            element = new THREE.MeshNormalMaterial({ normalMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshPhysicalMaterial) {
                            element = new THREE.MeshPhysicalMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshStandardMaterial) {
                            element = new THREE.MeshStandardMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                        else if (element.type == MATERIAL_TYPES.MeshToonMaterial) {
                            element = new THREE.MeshToonMaterial({ emissive: new THREE.Color(0x808080), emissiveMap: map })
                        }
                    });
                }
            }

        }
    })

};


export const modelMapping = {
    ground: {
        name: 'Material.002',
        path: mapModelPath + 'gach223.png',
        texture: null,
    },
    tuong: {
        name: 'tuong',
        path: mapModelPath + 'gach_tuong2.png',
        texture: null,
    },
    barrel1: {
        name: 'barrel1',
        path: mapModelPath + 'barrel1_[Albedo].jpg',
        texture: null,
    },
    barrel2: {
        name: 'barrel2',
        path: mapModelPath + 'barrel2_[Albedo].jpg',
        texture: null,
    },
    crate1: {
        name: 'crate1',
        path: mapModelPath + 'crate1_[Albedo].jpg',
        texture: null,
    },
    crate2: {
        name: 'crate2',
        path: mapModelPath + 'crate2_[Albedo].jpg',
        texture: null,
    },
    crate3: {
        name: 'crate3',
        path: mapModelPath + 'crate3_[Albedo].jpg',
        texture: null,
    },
    crate4: {
        name: 'crate4',
        path: mapModelPath + 'crate4_[Albedo].jpg',
        texture: null,
    },
    crate5: {
        name: 'crate5',
        path: mapModelPath + 'crate5_[Albedo].jpg',
        texture: null,
    },
    bucket: {
        name: 'bucket',
        path: mapModelPath + 'bucket_[Albedo].jpg',
        texture: null,
    },
    chest: {
        name: 'chest',
        path: mapModelPath + 'chest_[Albedo].jpg',
        texture: null,
    },
    lambert3SG1: {
        name: 'lambert3SG1',
        path: mapModelPath + 'fire.png',
        texture: null,
    },
    lambert7: {
        name: 'lambert7',
        path: mapModelPath + 'cot_2D_View_1001.png',
        texture: null,
    },
}

export const actorMapping = {
    pk : {
        name: 'pk',
        path: actorModelPath + 'animeyellow_low_pk_BaseColor.png',
        texture : null,
    },

    hair : {
        name : 'hair_2',
        path : actorModelPath + 'animeyellow_hair_2_BaseColor.png',
        texture : null,
    },

    bake : {
        name : 'bake',
        path : actorModelPath + 'animeyellow_low_bake_BaseColor.png',
        texture : null,
    },
    skin : {
        name : 'skin',
        path : actorModelPath + 'skin_BaseColor.png',
        texture : null,
    },


}



export const MATERIAL_TYPES = {
    MeshPhongMaterial: 'MeshPhongMaterial',
    MeshBasicMaterial: 'MeshBasicMaterial',
    MeshDepthMaterial: 'MeshDepthMaterial',
    MeshDistanceMaterial: 'MeshDistanceMaterial',
    MeshLambertMaterial: 'MeshLambertMaterial',
    MeshMatcapMaterial: 'MeshMatcapMaterial',
    MeshNormalMaterial: 'MeshNormalMaterial',
    MeshPhysicalMaterial: 'MeshPhysicalMaterial',
    MeshStandardMaterial: 'MeshStandardMaterial',
    MeshToonMaterial: 'MeshToonMaterial',
}