import { Sim3D } from "../engine/Sim3D";
import { DemoBlockHandle } from "../engine/handles/DemoBlockHandle";

let simulator: Sim3D;

window.onload = main;
window.onresize = () => {
  if (simulator) {
    simulator.onresize();
  }
};

function main() {
  const canvas = <HTMLCanvasElement>document.getElementById("demo1");

  simulator = new Sim3D(canvas, {
    defaultWorld: {
      xLength: 10,
      zLength: 20,
      walls: [],

      camera: {
        position: {
          x: 0,
          y: 4,
          z: 12,
        },
      },
    },
  });
  simulator.onresize();
  simulator.beginRendering();

  const block1Ref = simulator.addRobot({
    startingPosition: { x: -2, y: -2 },
    dimensions: { x: 1, y: 1, z: 1 },
    color: 0xff00ff,
  });

  const block1Handle = new DemoBlockHandle(block1Ref, simulator);

  let force = 5;
  block1Handle.applyForce(force);
  setInterval(() => {
    force = -force;
    block1Handle.applyForce(force);
  }, 1000);
}
