// TM3 02 02i - Interaktive Fräsbahn mit Slider
// This file only contains the code from Moodle due to few reasons: 
// The STACK question variables are complicated to be converted into HTML, JSfiddle server was down on 06th October 2023, and the adjustments to the exisitng JavaScript code do not require creation of complex frames

// <<<<<  CODE - IN MOODLE  >>>>>

// STACK QUESTION VARIABLES
stack_unit_si_declare(true);
assume(mm>0);

vv: rand_with_step(400, 2000, 100)*mm/min;
rr: rand_with_step(1,10,1)*mm;
alpha_deg: rand_with_step(15,75,15);

alpha: alpha_deg*pi/180;

tges: pi/2*rr/vv;
phi_raw: alpha-pi/2-pi/2*t/(pi/2*r/v);
phi: alpha-pi/2-pi/2*t/tges;
at: 0;
an: vv^2/rr;
ax: float( an*max(abs(cos(alpha-pi/2)), abs(cos(alpha-pi))));
ay: an;

p0:[0,0]; 
L1: 3; R: 2; L2: 1;
if alpha<pi/4 then jphi: alpha+pi/6 else jphi: alpha+pi/3; /* jphi angle from center to t */
jphi_deg: jphi*180/pi;
x1: L1*cos(alpha); xc: x1+R*sin(alpha); x2: xc+R*cos(alpha); x3: x2+L2*sin(alpha);
y1: L1*sin(alpha); yc: y1-R*cos(alpha); y2: yc+R*sin(alpha); y3: y2-L2*cos(alpha);
xe: xc+R*cos(jphi); ye: yc+R*sin(jphi); 
off: 0.2; 
initdata: [ 
  [ "grid", "x","y", -1, x3+1.5, min(0,y3)-1.5, max(1,y1,y2,ye+sin(jphi-pi/2))+1, 50 ],
  [ "line", "", [0, x1], [0, y1] , "-", 2 ],
  [ "line", "", [x2,x3], [y2,y3] , "-", 2 ],
  [ "line", "", xc+makelist(R*cos(t), t, alpha, alpha+pi/2, pi/40), 
                   yc+makelist(R*sin(t), t, alpha, alpha+pi/2, pi/40) , "-", 2 ],
  [ "dir", "x", p0, 0, 5, 2.5 ],
  [ "dir", "y", p0, 90, 5, 1],
  [ "dir", "", [xe,ye], jphi_deg-180, 5, 0.8 ],
  [ "angle", ".", [xc,yc], [x1,y1], 0.5, -90 ],
  [ "angle", "", [xc,yc], [x1,y1], r, -90 ],
  [ "angle", "\\alpha", p0, [1, 0], 1.5, alpha_deg ],
/*  [ "angle", "\\varphi", [xe, ye], [xe+0.7, ye], 0.5, jphi_deg-180 ], */
  [ "point", "1", [x1,y1], 15 ],
  [ "point", "2", [x2,y2], 15 ],
  [ "disp", "v",  [xe,ye], jphi_deg-90, 5, 1 ],
  [ "label", "\\(\\mathbf{e}_n\\)", [ xc+0.5*R*cos(jphi+0.03), yc+0.5*R*sin(jphi+0.03)]  ],
  [ "circle", "", [xe,ye], 0.2],
  [ "point", "", [xe,ye], 15 ],
  [ "label", "\\(r\\)", [xc+R/2*cos(alpha)+off*sin(alpha), yc+R/2*sin(alpha)-off*cos(alpha)] ]
];
init: stackjson_stringify(float(initdata));

stack_include("https://raw.githubusercontent.com/mkraska/meclib/main/Maxima/fb_value.mac");

// JAVASCRIPT CODE


