const gui = new dat.GUI();

gui.add(parameters, 'sphereRadius').name('Sphere radius').min(1.).max(10.).step(0.1).onChange(updateScene);
gui.add(parameters, 'sphereRotation').name('Rotation').min(0).max(2*Math.PI).step(0.001).onChange(updateScene);
gui.add(parameters, 'latitude').name('Latitude').min(-Math.PI/2.).max(Math.PI/2.).step(0.001).onChange(updateScene);
gui.add(parameters, 'wireframe').name('Wireframe').onChange(toggleWireframe);
//gui.add(parameters, 'longitude').name('Longitude').min(-Math.PI).max(Math.PI).step(0.001).onChange(updateScene);
//gui.add(parameters, 'observerHeight').name('Observer height').min(0.1).max(10.).step(0.1);
