// TM3 10 03i - Kontrollpunkt rechts am Balkenende. Wenn man zieht und loslässt, soll das System einige Schwingungen ausführen und dann in der Ausgangslage stehen bleiben.
// This file is divided into two sections: the first part is the tested JavaScript file in JSfiddle, the second part is the tested code in Moodle
// Some differences in code can be found, because the code that works in JSfiddle does not fully work when tested in Moodle, hence some adjustments are made

// <<<<<  FIRST CODE - IN JSFIDDLE  >>>>>

// HTML INITIALISATION
<p id="init">[
  [ "grid", "","", -1, 6, -2, 3, 40 ],
  [ "fix12", "A", [0,0], -90],
  [ "fix12", "", [0, 2], -90],
  [ "beam", "", [0,0], [5,0], 0.13],
  [ "label", "\\(m\\)", [4.5, 0.4] ],
  [ "springt", "c", [0, 2], [3, 0] ],
  [ "node", "B", [3, 0] ],
  [ "rot", "\\varphi", [0,0], [0.4, 0.4], [0.2,-0.8] ],
  [ "moment", "M", [0,0], [1.2, 0.6], [1.2,-0.6] ]
 ]
</p>

let b = objects[3]; // beam
let labelm = objects[4]; 
let s = objects[5]; // springt
let n = objects[6]; // node
let m = objects[8];
n.p1.label.setAttribute({autoPosition:false});
m.p3.label.setAttribute({autoPosition:false});

let c1 = board.create('circle', [[0,0], XY(n.p1)], {visible:false});
let plc = board.create('point', XY(b.p2), {visible:false, fixed:false});
let lc = board.create('line', [plc, [0,0]], {visible:false}); // 2nd point of line is fixed and invisible
let n1 = board.create('intersection', [c1, lc, 1], {visible:false, name:'n1'});
//let pA = board.create('glider', [n1.X(), n1.Y(), c1], {visible:true, fixed:false});
let c2 = board.create('circle', [[0,0], XY(b.p2)], {visible:false});
let pB = board.create('glider', [b.p2.X(), b.p2.Y(), c2], {visible:true, fixed:false});

pB.on('drag', function(e) {
  labelm.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
	//s.p2.setAttribute({fixed:false});
  let Agroup = board.create('group', [s.p2, n.p1, n1]);
  let Bgroup = board.create('group', [labelm.p1, b.p2, plc]);
  b.p2.moveTo(XY(pB));
  s.p2.moveTo(XY(n1));
  n.p1.moveTo(XY(n1));
  plc.moveTo(XY(pB));
})
 
pB.on('up', function(e) {
  let Bgroup = board.create('group', [labelm.p1, b.p2, plc]);
  let px = () => pB.X(), py = () => pB.Y();
  //console.log('px is here: ' + px());
  //console.log('py is here: ' + py());
  let nx = () => n1.X(), ny = () => n1.Y();
  //console.log('nx is here: ' + nx());
  //console.log('ny is here: ' + ny());
  
  // to be used as scaling factor for smooth animations
  let diffnx = 3 - nx(), diffpx = 5 - px();

	// the scaling factor for y-coordinates need to be considered, negative for opposing swing direction
  // difference in circle radius does not affect duration of animation for each separate parts
  (function() {
  let pathc1 = [[nx(), ny()], [(3/5)*diffnx + nx(), (5/6)*-ny()], [(2/5)*diffnx + nx(), (1/2)*ny()], [(1/5)*diffnx + nx(), (1/6)*-ny()], [3, 0]];
  	for (let i = 0; i < pathc1.length; i++) {
    	s.p2.moveAlong(pathc1, 3000, '--');
      n.p1.moveAlong(pathc1, 3000, '--');
   }
  let pathc2 = [[px(), py()], [(3/5)*diffpx + px(), (5/6)*-py()], [(2/5)*diffpx + px(), (1/2)*py()], [(1/5)*diffpx + px(), (1/6)*-py()], [5, 0]];
   	for (let j = 0; j < pathc2.length; j++) {
      pB.moveAlong(pathc2, 3000, '--');
      b.p2.moveAlong(pathc2, 3000, '--');
    }   
  })()
}) 

// <<<<<  SECOND CODE - IN MOODLE  >>>>>

// STACK QUESTION VARIABLES
l1: 3;
l2: 2;
l3: 2;

dl: l1*l3/sqrt(l1^2+l3^2)*phi*a;
cE: c*l1^2*l3^2/(l3^2+l1^2)*a^2;
J: m/3*(l1+l2)^2*a^2;
T: float(2*pi*sqrt(J/cE*c/m));

pA: [0,0]; pB: [l1, 0]; pC: [l1+l2,0]; pD: [0, l3];
initdata: [
  [ "grid", "","", -1,l1+l2+1,-1.5,l3+1, 40 ],
  [ "fix12", "A", pA, -90],
  [ "fix12", "", pD, -90],
  [ "beam", "", pA, pC, 0.13],
  [ "label", "\\(m\\)", pC+[-0.5, 0.4]],
  [ "springt", "c", pD, pB ],
  [ "node", "B", pB ],
  [ "rot", "\\varphi", pA, [0.4, 0.4], [0.2,-0.8] ],
  [ "moment", "M", pA, [1.2, 0.6], [1.2,-0.6] ]
];
init: stackjson_stringify(initdata);

let b = objects[3]; // beam
let labelm = objects[4]; 
let s = objects[5]; // springt
let n = objects[6]; // node
let m = objects[8];
n.p1.label.setAttribute({autoPosition:false});
m.p3.label.setAttribute({autoPosition:false});

let c1 = board.create('circle', [[0,0], XY(n.p1)], {visible:false});
let plc = board.create('point', XY(b.p2), {visible:false, fixed:false});
let lc = board.create('line', [plc, [0,0]], {visible:false}); // 2nd point of line is fixed and invisible
let n1 = board.create('intersection', [c1, lc, 1], {visible:false, name:'n1'});
let pA = board.create('glider', [n1.X(), n1.Y(), c1], {visible:false, fixed:false});
let c2 = board.create('circle', [[0,0], XY(b.p2)], {visible:false});
let pB = board.create('glider', [b.p2.X(), b.p2.Y(), c2], {visible:true, fixed:false});

pB.on('drag', function(e) {
  labelm.p1.setAttribute({fixed:false}); // Label A bewegt mit Masse A
  let Agroup = board.create('group', [n1, s.p2]);
  let Bgroup = board.create('group', [labelm.p1, b.p2, plc]);
  b.p2.moveTo(XY(pB));
  plc.moveTo(XY(pB));
  s.p2.moveTo(XY(n1));
  n.p1.moveTo(XY(n1));
})
 
pB.on('up', function(e) {
  let Agroup = board.create('group', [n1, s.p2]);
  let Bgroup = board.create('group', [labelm.p1, b.p2, plc]);
  let px = () => pB.X(), py = () => pB.Y();
  //console.log('px is here: ' + px());
  //console.log('py is here: ' + py());
  let nx = () => n1.X(), ny = () => n1.Y();
  //console.log('nx is here: ' + nx());
  //console.log('ny is here: ' + ny());
  
  // to be used as scaling factor for smooth animations
  let diffnx = 3 - nx(), diffpx = 5 - px();

  // the scaling factor for y-coordinates need to be considered, negative for opposing swing direction
  // difference in circle radius does not affect duration of animation for each separate parts
  (function() {
  let pathc1 = [[nx(), ny()], [(3/5)*diffnx + nx(), (5/6)*-ny()], [(2/5)*diffnx + nx(), (1/2)*ny()], [(1/5)*diffnx + nx(), (1/6)*-ny()], [3, 0]];
  for (let i = 0; i < pathc1.length; i++) {
    s.p2.moveAlong(pathc1, 3000);
    n.p1.moveAlong(pathc1, 3000);
    plc.moveAlong(pathc1, 3000);
   }
  let pathc2 = [[px(), py()], [(3/5)*diffpx + px(), (5/6)*-py()], [(2/5)*diffpx + px(), (1/2)*py()], [(1/5)*diffpx + px(), (1/6)*-py()], [5, 0]];
   for (let j = 0; j < pathc2.length; j++) {
     pB.moveAlong(pathc2, 3000);
     b.p2.moveAlong(pathc2, 3000);
     plc.moveAlong(pathc2, 3000);
    }   
  })()
}) 

