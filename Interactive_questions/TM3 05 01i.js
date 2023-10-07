// TM3 05 01i - Kontrollpunkt an Masse B (vertikal beweglich, z.B. als slider). Wenn man daran zieht, soll sich Masse A mit der Rolle darüber passend bewegen. Beim Loslassen geht das System in die Ausgangslage zurück.
// This file is divided into two sections: the first part is the tested JavaScript file in JSfiddle, the second part is the tested code in Moodle
// Some differences in code can be found, because JSfiddle is used as development platform while Moodle is the final test platform

// <<<<<  FIRST CODE - IN JSFIDDLE  >>>>>

// HTML INITIALISATION
<p id="init">[
  [ "grid", "","", -2, 3.5, -9, 0.8, 40 ],
  [ "wall", "", [-1, 0], [2.5, 0], 45 ],
  [ "circle", "", [1,-1], 0.5 ],
  [ "circle", "", [0,-3], 0.5 ],
  [ "rope", "", [0,-3], -0.5, [0,0], -0.5 ],
  [ "rope", "", [0,-3], 0.5, [1,-1], -0.5 ],
  [ "rope", "", [1,-1], -0.5, [1.5, -5], 0 ],
  [ "rope", "", [1,-1], 0, [1, 0], 0 ],
  [ "rope", "", [0,-3], 0, [0,-5.5], 0 ],
  [ "beam", "", [0,-4.5], [0,-5.5], 0.5],
  [ "beam", "", [1.5, -5], [1.5, -5.5], 0.5],
  [ "disp", "s_A", [-1, -5], -90],
  [ "disp", "s_B", [2.5, -5], 90],
  [ "label", "\\(A\\)", [-0.2, -6] ], 
  [ "label", "\\(B\\)", [1.3, -6] ],
  [ "node", " ", [0,-3] ],
  [ "node", " ", [1,-1] ]
 ]
</p>

let cA = objects[3]; // circle A
let A = objects[9]; // Masse A
let B = objects[10]; // Masse B
let RWA = objects[4]; // rope zw. Wall und circle A
let RAB = objects[5]; // rope zw. circle A und circle B
let RA = objects[8]; // rope für Masse A
let RB = objects[6]; // rope für Masse B
let NA = objects[15]; // Node bei Masse A
let labelA = objects[13];
let labelB = objects[14];
let sB = objects[12];

let tp0 = board.create('point', [0, 0], {name:'tp0', fixed:false, visible:true});
let RBp1 = board.create('point', [1.5, -2], {name:'RBp1', visible:true});
let LA = board.create('line', [XY(tp0), XY(A.p2)], {visible:true}); // line durch Masse A
let bp1 = board.create('point', XY(A.p2), {visible:true, name:'bp1'});
let bp2 = board.create('point', XY(B.p2), {visible:true, name:'bp2'});
let LB = board.create('line', [XY(RBp1), XY(bp2)], {straightFirst:false, visible:true}); // line durch Masse B
let pB = board.create('glider', [B.p2.X(), B.p2.Y(), LB], {fixed:false});
let dA = () => (1 / RB.p2.Y());
let pA = board.create('glider', [A.p2.X(), function () {return ((tp0.Y() - A.p2.Y()) * dA() )}, LA], {fixed:true, name:'pA', visible:true});
sB.p2.label.setAttribute({offset:[0,-10]});


// fixed:false only inside functions to prevent students from messing with the objects
pB.on('drag', function(e) {
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  A.p1.setAttribute({fixed:false});
  A.p2.setAttribute({fixed:false});
  B.p1.setAttribute({fixed:false});
  B.p2.setAttribute({fixed:false});
	let Bgroup = board.create('group', [B.p1, B.p2, RB.p2, labelB.p1]);
	B.p2.moveTo(XY(pB));
  
  pA.setAttribute({fixed:false});
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  NA.p1.setAttribute({fixed:false});
  cA.p1.setAttribute({fixed:false});
	let Agroup = board.create('group', [pA, A.p1, A.p2, RA.p1, RA.p2, labelA.p1, RWA.p1, RAB.p1, NA.p1, cA.p1]).setTranslationPoints([pA]);
})

pB.on('up', function(e) {
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  A.p1.setAttribute({fixed:false});
  A.p2.setAttribute({fixed:false});
  B.p1.setAttribute({fixed:false});
  B.p2.setAttribute({fixed:false});
  let Bgroup = board.create('group', [pB, B.p1, B.p2, RB.p2, labelB.p1]);
  B.p2.moveTo(XY(bp2), 1000);
  pB.moveTo(XY(bp2), 1000);
  
  pA.setAttribute({fixed:false});
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  NA.p1.setAttribute({fixed:false});
  cA.p1.setAttribute({fixed:false});
	let Agroup = board.create('group', [pA, A.p1, A.p2, RA.p1, RA.p2, labelA.p1, RWA.p1, RAB.p1, NA.p1, cA.p1]).setTranslationPoints([pA]);
}) 

// <<<<<  SECOND CODE - IN MOODLE  >>>>>

// STACK QUESTION VARIABLES
pA:[0,-3]; pB:[1,-1]; pC: pB+[0.5, -3];
initdata: [ 
  [ "grid", "","", -2, 3.5, -9, 0.8, 40 ],
  [ "wall", "", [-1, 0], [2.5, 0], 45 ],
  [ "circle", "", pB, 0.5 ],
  [ "circle", "", pA, 0.5 ],
  [ "rope", "", pA, -0.5, [0,0], -0.5 ],
  [ "rope", "", pA, 0.5, pB, -0.5 ],
  [ "rope", "", pB, -0.5, pC+[0, -1], 0 ],
  [ "rope", "", pB, 0, [1, 0], 0 ],
  [ "rope", "", pA, 0, pA+[0,-2.5], 0 ],
  [ "beam", "", pA+[0, -1.5], pA+[0, -2.5], 0.5],
  [ "beam", "", pC+[0, -1], pC+[0, -1.5], 0.5],
  [ "disp", "s_A", [-1, -5], -90],
  [ "disp", "s_B", [2.5, -5], 90],
  [ "label", "\\(A\\)", [-0.2, -6] ], 
  [ "label", "\\(B\\)", [1.3, -6] ],
  [ "node", "", pA ],
  [ "node", "", pB ]
];
init: stackjson_stringify(float(initdata));

let cA = objects[3]; // circle A
let A = objects[9]; // Masse A
let B = objects[10]; // Masse B
let RWA = objects[4]; // rope zw. Wall und circle A
let RAB = objects[5]; // rope zw. circle A und circle B
let RA = objects[8]; // rope für Masse A
let RB = objects[6]; // rope für Masse B
let NA = objects[15]; // Node bei Masse A
let sB = objects[12];
let labelA = objects[13];
let labelB = objects[14];

let tp0 = board.create('point', [0, 0], {name:'tp0', fixed:false, visible:false});
let RBp1 = board.create('point', [1.5, -2], {name:'RBp1', visible:false});
let LA = board.create('line', [XY(tp0), XY(A.p2)], {visible:false}); // line durch Masse A
let bp1 = board.create('point', XY(A.p2), {visible:false, name:'bp1'});
let bp2 = board.create('point', XY(B.p2), {visible:false, name:'bp2'});
let LB = board.create('line', [XY(RBp1), XY(bp2)], {straightFirst:false, visible:false}); // line durch Masse B
let pB = board.create('glider', [B.p2.X(), B.p2.Y(), LB], {fixed:false});
let dA = () => (1 / RB.p2.Y());
let pA = board.create('glider', [A.p2.X(), function () {return ((tp0.Y() - A.p2.Y()) * dA() )}, LA], {fixed:true, name:'pA', visible:false});
sB.p2.label.setAttribute({offset:[0,-10]});

// fixed:false only inside functions to prevent students from messing with the objects
pB.on('drag', function(e) {
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  A.p1.setAttribute({fixed:false});
  A.p2.setAttribute({fixed:false});
  B.p1.setAttribute({fixed:false});
  B.p2.setAttribute({fixed:false});
	let Bgroup = board.create('group', [B.p1, B.p2, RB.p2, labelB.p1]);
	B.p2.moveTo(XY(pB));
  
  pA.setAttribute({fixed:false});
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  NA.p1.setAttribute({fixed:false});
  cA.p1.setAttribute({fixed:false});
	let Agroup = board.create('group', [pA, A.p1, A.p2, RA.p1, RA.p2, labelA.p1, RWA.p1, RAB.p1, NA.p1, cA.p1]).setTranslationPoints([pA]);
})

pB.on('up', function(e) {
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  A.p1.setAttribute({fixed:false});
  A.p2.setAttribute({fixed:false});
  B.p1.setAttribute({fixed:false});
  B.p2.setAttribute({fixed:false});
  let Bgroup = board.create('group', [pB, B.p1, B.p2, RB.p2, labelB.p1]);
  B.p2.moveTo(XY(bp2), 1000);
  pB.moveTo(XY(bp2), 1000);
  
  pA.setAttribute({fixed:false});
  labelA.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  labelB.p1.setAttribute({fixed:false}); // Label B bewegt mit Masse B
  NA.p1.setAttribute({fixed:false});
  cA.p1.setAttribute({fixed:false});
	let Agroup = board.create('group', [pA, A.p1, A.p2, RA.p1, RA.p2, labelA.p1, RWA.p1, RAB.p1, NA.p1, cA.p1]).setTranslationPoints([pA]);
}) 
