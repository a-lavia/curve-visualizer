const gui = new dat.GUI();

gui.add(parameters, 'planetRadius').name('Planet radius').min(0.1).max(10.).step(0.1);
gui.add(parameters, 'observerHeight').name('Observer height').min(0.1).max(10.).step(0.1);
