import Corgi from './corgi';

class Projectile {
  constructor(canvas, stage, score, stats, currentBTickers) {
    this.canvas = canvas;
    this.stage = stage;
    this.currentBTickers = currentBTickers; 

    this.setVelocity = this.setVelocity.bind(this); 
    this.setMotion = this.setMotion.bind(this);
    this.tick = this.tick.bind(this);
    this.delete = this.delete.bind(this);

    this.setMotion(); 
    this.time = 0; 

    this.CorgiClass = new Corgi(canvas, stage, score, stats);
    this.corgi = this.CorgiClass.generateCorgi(this.interval);
    this.xDirection = this.corgi.x > canvas.width / 2 ? -1 : 1; 
    this.setVelocity(); 
    stage.addChild(this.corgi);  

  }
  setVelocity() {
    this.x_velocity = Math.random() * 12 * this.xDirection;
    this.y_velocity = (Math.random() * 10) + 33; 
  };

  setMotion() {
    this.interval = setInterval(this.tick, 25); 
  };

  tick() {
    this.time += 25; 
    const corgi = this.corgi; 
    const time = (this.time) / 1000; 

    corgi.x = corgi.x + this.x_velocity; 
    corgi.y = corgi.y - (time * (this.y_velocity - (30 * time))); 
    corgi.rotation += 3 * this.xDirection; 

    if (corgi.y > 800) {
      this.delete(); 
    }
    this.stage.update(); 
  };

  delete() {
    this.CorgiClass.deleteCorgi(this.corgi, this.interval);
    const keys = Object.keys(this.currentBTickers); 
    this.currentBTickers = keys.filter(el => el !== this.interval); 
  };
}

export default Projectile; 