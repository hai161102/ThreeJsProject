import * as THREE from 'three';
import { listModelObject, KEY_CODE } from './Utils.js';
let me = null;
const ACTION_ACTOR = {
    NORMAL: 1,
    ATTACK_1: 2,
    ATTACK_2: 3,
    RUN: 4,
    DEAD: 5,
}
export class Character {
    props = {
        actor: null,
        mixer : null,
        scaleTime : 1,
    }
    attackCount = 0;

    constructor(object) {
        this.props.actor = object;
        this.setupAnimation();
        me = this;
    }

    setupAnimation() {

        let animations;
        this.props.mixer = new THREE.AnimationMixer(this.props.actor);
        animations = this.props.actor.animations;
        for (let element of animations) {
            let animationAction = (this.props.mixer.clipAction(element, this.props.actor));
            animationAction.play();
        }

    }

    // Update the animation mixer in your render loop
    update() {
        if (this.props.mixer != null) {
            this.props.mixer.timeScale = this.props.scaleTime;
            this.props.mixer.update(0.01);
        }

    }

    setAnimationType(object) {
        this.props.actor.copy(object, false);
        this.setupAnimation();
    }

    onkeypress(e) {
        if (e.keyCode != KEY_CODE.ENTER
            && e.keyCode != KEY_CODE.PAGE_UP
            && e.keyCode != KEY_CODE.F
            && e.keyCode != KEY_CODE.D
            && e.keyCode != KEY_CODE.H
            && e.keyCode != KEY_CODE.NUMBER_1
            && e.keyCode != KEY_CODE.NUMBER_2) {
            return;
        }
        let current = this.props.actor.id;
        let newActor = null;
        console.log(e.keyCode);
        if (e.keyCode != KEY_CODE.ENTER) {
            this.attackCount = 0;
        }
        if (e.keyCode == KEY_CODE.ENTER) {
            if (this.attackCount == 0) {
                newActor = listModelObject[2];
            }
            if (this.attackCount == 1) {
                newActor = listModelObject[3];
            }
            if (this.attackCount == 2) {
                newActor = listModelObject[4];
            }

            this.attackCount++;
            if (this.attackCount > 2) {
                this.attackCount = 0;
            }
        }
        if (e.keyCode == KEY_CODE.PAGE_UP) {
            newActor = listModelObject[8];
        }

        if (e.keyCode == KEY_CODE.F) {
            //F
            newActor = listModelObject[5];
        }

        if (e.keyCode == KEY_CODE.D) {
            //D
            newActor = listModelObject[6];
        }

        if (e.keyCode == KEY_CODE.H) {
            //H
            newActor = listModelObject[7];
        }
        if (e.keyCode == KEY_CODE.NUMBER_1) {
            //1
            newActor = listModelObject[9];
        }
        if (e.keyCode == KEY_CODE.NUMBER_2) {
            //2
            newActor = listModelObject[10];
        }
        if (newActor.id != current) {
            this.setAnimationType(newActor);
        }
    }

    onkeyrelease(e) {
        //do nothing
    }
}