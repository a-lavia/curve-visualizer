const gui = new dat.GUI();

gui.add(parameters, 'sphereRadius').name('Sphere radius').min(1.).max(10.).step(0.1).onChange(updateSphere);
gui.add(parameters, 'observerHeight').name('Observer height').min(0.1).max(10.).step(0.1);
