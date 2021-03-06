const WIDTH             = window.innerWidth - 50;
const HEIGHT            = window.innerHeight - 50;
const CENTER            = {x: (WIDTH / 2), y: (HEIGHT / 2)};

const SCALE_RADIUS      = 1 / 10000;
const SCALE_INCREASE    = 0.1;
const SCALE_MIN         = 0.1;
const SCALE_MAX         = 2.5;
const SCALE_MAJOR_AXIS  = 1 / 1_000_000;

const G                 = 6.67430;

let speedMultiplier     = 360 / 15; // 15 second orbit
let zoom                = 1.0;

// Interactive controls
let orbitalTime;
let planetSize;
let planetSelection;
let hohmannCheckbox;

// Function to handle setup
function setup()
{ 
  // Center canvas
  createCanvas(WIDTH, HEIGHT)
    .position((windowWidth - WIDTH) / 2, (windowHeight - HEIGHT) / 2);

  // Change angle mode to degrees
  angleMode(DEGREES);

  // Add interactive elements
  addPlanetSizeOptions();
  addOrbitalTimeOptions();
  addPlanetSelectionOptions();
  addHohmannTransferToggle();
  addZoomButtons();

  togglePlanetSize();

  // Set planet values
  for (let i = 0; i < planets.length; i++)
  {
    let planet    = planets[i];
    planet.b      = getSemiMinorAxis(planet.a, planet.e);
    planet.ae     = getFocusPoint(planet);
    planet.v      = getEarthVelocityRatio(planet.a);
    planet.peri   = getPerihelion(planet.a, planet.e);
    planet.aphe   = getAphelion(planet.a, planet.e);
    planet.x      = planet.a;
    planet.y      = 0;
    planet.angle = 0;
  }
}

// Function to handle logic
function update(dt)
{
  // Calculate new planet position and angle
  for (let i = 0; i < planets.length; i++)
  {
    let planet = planets[i];

    let angle = planet.angle;
    let e     = planet.e;

    //angle = (angle + ((speedMultiplier * planet.v))) % 360;
    angle = (angle - ((speedMultiplier * planet.v) * (dt / 1000))) % 360;

    // Calculate new x and y position
    let r = (planet.a * (1 - (e * e))) / (1 + e * cos(angle));

    planet.x = (r * cos(angle)) + planet.ae;
    planet.y = (r * sin(angle));
    planet.angle = angle;
  }
}

// Function to handle drawing
function draw()
{
  // Handle logic
  update(deltaTime);

  // Clear canvas and reset colors
  clear();
  background(220);
  
  fill("#000000");
  text((+zoom).toFixed(1), 46, 40);

  // Translate everything from center of screen
  translate(CENTER.x, CENTER.y)

  // Draw the planets
  let selectedPlanet = undefined;
  let i = 0;
  let max = planets.length;

  if (planetSelection.value() != "All Planets") 
  {
    i = planetsRef[planetSelection.value()];
    max = i + 1;
    selectedPlanet = planets[i];
  }

  for (i; i < max; i++)
  {
    let planet = planets[i];
    fill(planet.color);

    // Planet with a minimum radius of 5 pixels
    circle(
      (planet.ae * zoom) + (planet.x * zoom),
      planet.y * zoom, 
      Math.max(5, (planet.r * zoom))
    );
    
    noFill();
    ellipse(planet.ae * zoom, 0, (planet.a * 2) * zoom, (planet.b * 2) * zoom);
  }

  strokeWeight(1);

  // Draw sun
  fill(sun.color);
  circle(0, 0, sun.r * zoom);

  // Draw focus points and lines if a specific planet has been selected
  if (selectedPlanet != undefined)
  {
    let p = selectedPlanet;
    let x;
    let y;

    // Draw information box
    x = -CENTER.x + 250;
    y = -CENTER.y + 10;
    fill("#FFFFFF");
    rect(x, y, 275, 200);

    // Name of planet
    fill("#000000");
    textSize(16);
    text(p.name, x + 3, y + 15);
    textSize(12);
    
    // Planet information
    text(
      "Semi-major axis: " + (+p.a).toFixed(2) + 
      " x 10^6 km", 
      x + 3, y + 40
    );
    
    text(
      "Semi-minor axis: " + (+p.b).toFixed(2) + " x 10^6 km", 
      x + 3, y + 55
    );

    text(
      "Perihelion: " + 
      (+p.peri).toFixed(2) + 
      " x 10^6 km", 
      x + 3, y + 75
    );

    text(
      "Aphelion: " + 
      (+p.aphe).toFixed(2) + 
      " x 10^6 km", 
      x + 3, y + 90
    );

    text(
      "Eccentricity: " + 
      p.e.toFixed(4), 
      x + 3, y + 115
    );

    text(
      "Orbital period (Earth days): " + 
      getPeriodDays(p.T).toFixed(2), 
      x + 3, y + 140
    );

    text(
      "Current angle (from center): " + 
      Math.abs(p.angle.toFixed(4)), 
      x + 3, y + 165
    );

    text(
      "Sum of focal point distances: " +
      (
        getDistance(0, 0, p.x + p.ae, p.y) +
        getDistance(p.ae * 2, 0, p.x + p.ae, p.y)
      ).toFixed(2) +
      " x 10^6 km",
      x + 3, y + 190
    );
    
    // Draw focus points and lines
    circle(0, 0, 5);
    circle(p.ae * 2 * zoom, 0, 5);
    
    x = (p.x * zoom) + (p.ae * zoom);
    y = p.y * zoom;

    line(0, 0, x, y);
    line(p.ae * 2 * zoom, 0, x, y);
  }

  if (hohmannCheckbox.checked())
  {
    let angle = p5.Vector.fromAngle(radians(44), (mars.a - 15));
    line(0, 0, -angle.x * zoom, angle.y * zoom);
    
    // Earth point
    fill(earth.color);
    circle(-(earth.peri * zoom) - (earth.ae * zoom) + (3 * zoom), 0, 10);
    
    // Transfer Line
    noFill();
    strokeWeight(2);
    stroke("#FF0000");
    bezier(
      -(earth.peri * zoom), 0,              // x1, y1
      -(earth.peri * zoom), mars.a * zoom,  // x2, y2
      (mars.aphe * zoom),   mars.a * zoom,  // x3, y3
      (mars.aphe * zoom) - (2 * zoom), 0    // x4, y4
    );

    stroke("#000000");
    strokeWeight(1);

    // Mars points
    fill(mars.color);
    circle((mars.aphe * zoom) - (2 * zoom), 0, 5);
    circle(-angle.x * zoom, angle.y * zoom, 8);
  }
}
