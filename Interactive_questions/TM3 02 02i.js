// TM3 02 02i - Interaktive Fräsbahn mit Slider
// This file only contains the code from JSfiddle due to code running not fully as planned (overall it works, but some parts are still lacking)

/* 
challenges faced:
- convert STACK question variables with Maxima to HTML in JSfiddle (have to use JavaScript in HTML)
- STACK question variables contains random numbers from Math.random(), which affects all positions of object
- coordinates of slider object has to be dynamic to adapt to this
- curves from existing line objects cannot be combined into one curve anyhow
- using JSXGraph arc geometry element causes a circle to appear when combined with other curves
- creating a curve that uses functions to replace the arc causes data to be inaccessible
- have to use updataDataArray() with iteration steps to create a usable 'curve' arc
- deciding on a scaling factor from the slider to control the glider is challenging
- arrow objects sticking to the glider did not move accordingly, solved by using transformation of type 'translate'
- determining the behaviour of the glider when meeting different curves is also challenging
 */

// <<<<<  CODE - IN JSFIDDLE  >>>>>

// HTML CODE

<div id="jxgbox" class="jxgbox" style="width:500px; height:500px">
</div>
<p id="init">[
 ]
</p>
<p id="data"></p>
<p id="fbd_names"></p>
<script>
        function calculateMaximaData() {
            // Define variables with numerical values (replace with actual values)
            var mm = 0.001;  // Example value for mm

            // Calculate values using Maxima-style expressions
            var vv = Math.floor(Math.random() * 16 + 4) * 100 * mm;
            var rr = Math.floor(Math.random() * 10 + 1) * mm;
            var alpha_deg = (1/2)*(Math.floor(/* Math.random() * */ 5 + 3) * 15); 
            var alpha = alpha_deg * Math.PI / 180;
            var tges = (Math.PI / 2) * rr / vv;

            // Calculate other variables using Maxima-style expressions
            var phi_raw = alpha - Math.PI / 2 - (Math.PI / 2) * t / (Math.PI / 2 * rr / vv);
            var phi = alpha - Math.PI / 2 - (Math.PI / 2) * t / tges;
            var at = 0;
            var an = vv * vv / rr;
            var ax = an * Math.max(Math.abs(Math.cos(alpha - Math.PI / 2)), Math.abs(Math.cos(alpha - Math.PI)));
            var ay = an;

            // Calculate values based on Maxima-style expressions
            var p0 = [0, 0];
            var L1 = 3;
            var R = 2;
            var L2 = 1;

            var jphi = alpha < Math.PI / 4 ? alpha + Math.PI / 6 : alpha + Math.PI / 3;
            var jphi_deg = jphi * 180 / Math.PI;

            var x1 = L1 * Math.cos(alpha);
            var xc = x1 + R * Math.sin(alpha);
            var x2 = xc + R * Math.cos(alpha);
            var x3 = x2 + L2 * Math.sin(alpha);

            var y1 = L1 * Math.sin(alpha);
            var yc = y1 - R * Math.cos(alpha);
            var y2 = yc + R * Math.sin(alpha);
            var y3 = y2 - L2 * Math.cos(alpha);

            var xe = xc + R * Math.cos(jphi);
            var ye = yc + R * Math.sin(jphi);

            var off = 0.2;
						
            // Generate the line segments for xc and yc using a loop
						var numSegments = 40;
						var lineSegmentsX = [];
						var lineSegmentsY = [];

						for (var t = alpha; t <= alpha + Math.PI / 2; t += Math.PI / (2 * numSegments)) {
    						lineSegmentsX.push(xc + R * Math.cos(t));
    						lineSegmentsY.push(yc + R * Math.sin(t));
						}
            
            // combined 2nd and 3rd line into 1st line
            // ["line", "", [0, x1, lineSegmentsX, x2, x3], [0, y1, lineSegmentsY, y2, y3], "-", 2]
            // original 2nd and 3rd lines
            // ["line", "", [x2, x3], [y2, y3], "-", 2],
            // ["line", "", lineSegmentsX, lineSegmentsY, "-", 2], // Use the generated line segments here
            
            
            // Create the formatted data array
            var formattedData = [
                ["grid", "x", "y", -1, x3 + 1.5, Math.min(0, y3) - 1.5, Math.max(1, y1, y2, ye + Math.sin(jphi - Math.PI / 2)) + 1, 50],
                //["line", "", [0, x1, lineSegmentsX, x2, x3], [0, y1, lineSegmentsY, y2, y3], "-", 2],
               
                ["line", "", [0, x1], [0, y1], "-", 2],
                ["line", "", [x2, x3], [y2, y3], "-", 2],
                ["line", "", lineSegmentsX, lineSegmentsY, "-", 2], // Use the generated line segments here 
                
                ["dir", "x", p0, 0, 5, 2.5],
                ["dir", "y", p0, 90, 5, 1],
                ["dir", "", [0, 0], jphi_deg - 180, 5, 0.8], // xe, ye
                ["angle", ".", [xc, yc], [x1, y1], 0.5, -90],
                ["angle", "", [xc, yc], [x1, y1], R, -90],
                ["angle", "\\(\\alpha\\)", p0, [1, 0], 1.5, alpha_deg],
                ["point", "1", [x1, y1], 15],
                ["point", "2", [x2, y2], 15],
                ["disp", "v", [0,0], jphi_deg - 90, 5, 1], // xe, ye
               /*  ["label", "\\(\\mathbf{e}_n\\)", [xc + 0.5 * R * Math.cos(jphi + 0.03), yc + 0.5 * R * Math.sin(jphi + 0.03)]], */
                ["circle", "", [0,0], 0.2], // xe, ye
                ["point", "", [0,0], 15], // xe, ye
                ["label", "\\(r\\)", [xc + R / 2 * Math.cos(alpha) + off * Math.sin(alpha), yc + R / 2 * Math.sin(alpha) - off * Math.cos(alpha)]]
            ];

            // Return the formatted data as a string
            return JSON.stringify(formattedData);
        }

        // Call the function to get the calculated data
        var maximaData = calculateMaximaData();

        // Display the data in your HTML document
        document.getElementById("data").textContent = maximaData;
        
        // Parse the JSON data and update the init array
        var initElement = document.getElementById("init");
        var formattedData = JSON.parse(maximaData);
        initElement.textContent = JSON.stringify(formattedData);
    </script>


// JAVASCRIPT CODE

/* 
// in case of curves being combined into one
let l1 = objects[1];
let cdir = objects[4];
let ang90 = objects[5];
let pt1 = objects[8];
let pt2 = objects[9];
let dispv = objects[10];
//let labelen = objects[11];
let c = objects[12];
let pc = objects[13]; 

let cv2 = board.create('curve', [l1.p.dataX, l1.p.dataY]);
console.log('here is cv2 data array: ' + cv2.dataX);

let gpc = board.create('glider', [0, 0, cv2], {visible:true, fixed:false, name:'gpc'});
*/


let l1 = objects[1];
let l2 = objects[2];
let l3 = objects[3];
let cdir = objects[6];
let ang90 = objects[7];
let pt1 = objects[10];
let pt2 = objects[11];
let dispv = objects[12];
//let labelen = objects[13];
let c = objects[13];
let pc = objects[14]; 
 
//let line1 = board.create('line', [[0,0], [1,2]]);

// although console.log can output data array elements correctly, glider on the combined curve will not appear
//let cv2 = board.create('curve', [[l1.p.dataX, l3.p.dataX, l2.p.dataX], [l1.p.dataY, l3.p.dataY, l2.p.dataY]]);
//console.log('here is cv2 data array: ' + cv2.dataX);
pt1.p1.label.setAttribute({autoPosition:false});
pt2.p1.label.setAttribute({autoPosition:false});
let a90 = board.create('point', XY(ang90.p1), {visible:false});
let pt11 = board.create('point', XY(pt1.p1), {visible:false});
let pt22 = board.create('point', XY(pt2.p1), {visible:false});
let arad = Math.sqrt((pt2.p1.Y() - a90.Y())**2 + (pt2.p1.X() - a90.X())**2);

//let l1grad = (pt1.p1.Y() / pt1.p1.X());
/* 
let arc1 = board.create('arc', [a90, pt11, pt22], {visible:true});
let cv1 = board.create('curve', [[], []], {visible:true});
cv1.updateDataArray = function() {
let dX = l1.p.dataX.concat(arc1.dataX, l3.p.dataX);
let dY = l1.p.dataY.concat(arc1.dataY, l3.p.dataY);
this.dataX = dX;
this.dataY = dY;
}
 */
let arc1 = board.create('curve', [
            function (t) {
                const angle =  Math.atan2(pt2.p1.Y() - a90.Y(), pt2.p1.X() - a90.X());
                return a90.X() + arad * Math.cos(t * - angle);
            },
            function (t) {
                const angle =  Math.atan2(pt2.p1.Y() - a90.Y(), pt2.p1.X() - a90.X());
                return a90.Y() + arad * Math.sin(t * - angle);
            }, -3.5, -5], {strokeColor: 'red', strokeWidth:0});
        
// data inaccessible from curve with functions         
// Define the parametric equations for the curve data
arc1.updateDataArray = function () {
    const angle = Math.atan2(pt2.p1.Y() - a90.Y(), pt2.p1.X() - a90.X());
    const tStart = -3.5; // Adjust the start and end values as needed
    const tEnd = -5;
    const numPoints = 100; // Adjust the number of points as needed
    // Initialize arrays to store x and y coordinates
    const xData = [];
    const yData = [];
    // Calculate and store the x and y coordinates for each point along the curve
    for (let i = 0; i <= numPoints; i++) {
        const t = tStart + (tEnd - tStart) * (i / numPoints);
        const x = a90.X() + arad * Math.cos(t * angle);
        const y = a90.Y() + arad * Math.sin(t * angle);
        xData.push(x);
        yData.push(y);
    }
    // Update the data arrays for the curve
    this.dataX = xData;
    this.dataY = yData;
};
        
let cv1 = board.create('curve', [[l1.p.dataX, arc1.dataX, l3.p.dataX], [l1.p.dataY, arc1.dataY, l3.p.dataY]], {visible:true}); // putting data arrays directly as elements does not work
cv1.updateDataArray = function() {
let cv2ndX = arc1.dataX.concat(l3.p.dataX);
let cv2ndY = arc1.dataY.concat(l3.p.dataY);
let dX = l1.p.dataX.concat(cv2ndX);
let dY = l1.p.dataY.concat(cv2ndY);
this.dataX = dX;
this.dataY = dY;
} 

console.log('arc1 dataX is here: ' + arc1.dataX); // data inaccessible from curve with functions 

// idea is to replace l3 with arc. Use if-else, and check position of glider. Once glider reaches meeting point with another cuve, a new glider will appear on other element (since glider can only exist on 1 element at a time)
// scaling of slider depends on total distance of line l1+l2+l3
// since l1 starts from origin, take pt1 coords as distance of l1
// distance of l2 = 0.5*Math.PI*r, where r = Math.sqrt((ang90.p1.X()-ang90.p3.X())**2 + (ang90.p1.Y()-ang90.p3.Y())**2)
// distance of l3 = Math.sqrt((l2.p.dataX[1] - l2.p.dataX[0])**2 + (l2.p.dataY[1] - l2.p.dataY[0])**2)
let dl1 = Math.sqrt((pt1.p1.X())**2 + (pt1.p1.Y())**2);
let ang90r = Math.sqrt((ang90.p1.X()-ang90.p3.X())**2 + (ang90.p1.Y()-ang90.p3.Y())**2);
let dl2 = (Math.PI/2)*ang90r;
let dl3 = Math.sqrt((l2.p.dataX[1] - l2.p.dataX[0])**2 + (l2.p.dataY[1] - l2.p.dataY[0])**2);
let sumdl = dl1 + dl2 + dl3;
console.log('sumdl is: ' + sumdl);
console.log('dl2 is here: ' + dl2);


// if-else to adjust position of slider depending on diagram setup
let sldY = function () {
    if (pt1.p1.X() <= 2) {
        return Math.round(pt1.p1.Y()) - 4;
    } else if (pt1.p1.X() > 2) {
        return Math.round(pt1.p1.Y()) - 3;
    }
}
console.log('l2dataY is here: ' + l2.p.dataY[1]);

let sld = board.create('slider',[[0, sldY()], [5, sldY()], [0,0,10]], {moveOnUp:true, fixed:false});
let gpc = board.create('glider', [0,0, cv1], {visible:false, fixed:false, name:'gpc'});
dispv.p2.setAttribute({autoPosition:false});
cdir.p2.setAttribute({name:'\\(\\mathbf{e}_n\\)', autoPosition:false})


let tp0 = board.create('point', [0,0], {fixed:true, visible:false});
const diffX = gpc.X() - tp0.X(), diffY = gpc.Y() - tp0.Y();
const t3 = board.create('transform', [() => gpc.X() - diffX, () => gpc.Y() - diffY], {type:'translate'}); 
t3.bindTo([cdir.p2, dispv.p2])

// Define the combined curve's parametric equations
function combinedCurve(t) {
    if ((gpc.X() <= pt1.p1.X()) || (gpc.Y() <= pt1.p1.Y()) ) {
        // First straight line segment: Adjust the equation as needed
        // Linear interpolation from 0 to pt1.p1.X()
        return [ t * pt1.p1.X(), t * pt1.p1.Y()]
    } else if ((gpc.X() > pt1.p1.X() && gpc.X() <= pt2.p1.X()) || (gpc.Y() > pt1.p1.Y() && gpc.Y() <= pt2.p1.Y())) {
        // 90-degree arc segment: Adjust the equation as needed
        const angle = Math.PI / 2 * (t - 1); // Angle from 0 to π/2
        return [pt1.p1.X() + Math.cos(angle) * (pt2.p1.X() - pt1.p1.X()), pt1.p1.Y() + Math.sin(angle) * (pt2.p1.Y() - pt1.p1.Y())];
    } else if ((gpc.X() > pt2.p1.X()) || (gpc.Y() > pt2.p1.Y())) {
        // Second straight line segment: Adjust the equation as needed
        return [pt2.p1.X() + (t - 2) * (l2.p.dataX[1] - pt2.p1.X()), pt2.p1.Y() + (t - 2) * (l2.p.dataY[1] - pt2.p1.Y())];
    }
}

// Update the glider's coordinates based on the slider's value along the combined curve
sld.on('drag', function () {
    let t = sld.Value()/5; 
    // Update the glider's coordinates
    let gldcoords = combinedCurve(t);
    gpc.moveTo([gldcoords[0], gldcoords[1]]);
		pc.p1.moveTo(XY(gpc));	
		c.p1.moveTo(XY(gpc));
		dispv.p1.moveTo(XY(gpc));
		cdir.p1.moveTo(XY(gpc)); 
});


