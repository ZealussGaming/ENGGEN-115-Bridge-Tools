import {Bridge} from './bridgeComponents.mjs';
import {MemberTableFactory} from './memberTable.js';
import {CanvasManagerFactory} from './canvasManager.mjs';
import {Pos} from './Objects.mjs';

const e = React.createElement;



/*
? ===================================================== ?
? =================== Canvas Setup ==================== ?
? ===================================================== ?
*/

let canvas = document.querySelector("canvas#bridge-canvas");
canvas.width = window.innerWidth;
canvas.height = canvas.parentElement.offsetHeight;
let canvasManager = CanvasManagerFactory(canvas);


function MouseFactory(HTMLelement) {
    var mousePos = new Pos(0, 0);
    HTMLelement.addEventListener("mousemove", (event) => {
        mousePos.x = event.x - HTMLelement.offsetLeft;
        mousePos.y = event.y - HTMLelement.offsetTop;
        console.log(mousePos);
    });
    return mousePos;
}

// functions


// Events
var mousePos = MouseFactory(canvas);
console.log(mousePos);



// initialisation of the bridge object
var bridge = new Bridge(canvasManager, mousePos);


// getting the canvas to take up the appropriate amount of the screen
var handleResize = () => {
    console.log(innerWidth);
    // height and width
    let optonsEl = document.querySelector(".options");
    let infoHeight = Number(getComputedStyle(optonsEl).height.slice(0,-2));
    canvas.height = window.innerHeight - infoHeight;
    canvas.width = innerWidth - 20;
    bridge.draw();
}
setTimeout(() => {
    handleResize();
}, 200);

window.onresize = handleResize;


canvas.addEventListener("click", bridge.handleClick);

console.log(bridge);

// simulating a user clicking on the canvas
bridge.addJoint(new Pos(100,100));
console.log(bridge);

// simulating selecting the joint that was just created
let j = Array.from(bridge.joints.values())[0];
j.select();
j.name = "A";
console.log(j);

// simulating adding a new joint and connecting selected joints via new members
bridge.addJoint(new Pos(200,100));

// simulating deselecting the joint
j.deselect();

console.log(j.neighbours);

console.log(bridge);

bridge.joints.forEach((x) => x.select());

bridge.addJoint(new Pos(200,200));

console.log(j.neighbours);

j.members.values().next().value.handleClick(new Pos(200,200));

bridge.removeJoint(j);
// exports = {Bridge: Bridge};

console.log(bridge);












/*
? ===================================================== ?
? =================== table Setup ===================== ?
? ===================================================== ?
*/

const domContainer = document.querySelector('tbody');
ReactDOM.render(e(MemberTableFactory(bridge.members)), domContainer);
document.querySelector("#UI").style.gridTemplateRows = "auto min-content";

// ? Methods to implimement in bridgeCompoments.mjs
// Bridge.supports.add(); // f(<Pos> ...args)
// Bridge.supports; // [<Support> ...]
// Bridge.selected; //
// Bridge.addJoint

