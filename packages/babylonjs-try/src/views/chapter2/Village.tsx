import { memo, useRef, useEffect } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3, Sound } from 'babylonjs';

const createScene = (canvas: HTMLCanvasElement): Scene => {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);
  // add camera
  const camera = new ArcRotateCamera('arc_camera', -Math.PI / 2, Math.PI / 2, 3, new Vector3(0, 0, 0), scene);
  camera.attachControl(true);
  // add light
  new HemisphericLight('hemispheric_light', new Vector3(0, 1, 0), scene);
  // add box mesh
  const box = MeshBuilder.CreateBox('box', {}, scene);
  box.position.y = 0.5;
  // add ground
  MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
  // add sound
  // loop
  // const sound = new Sound('dongcidaci', '/music/dongcidaci.mp3', scene, null, { loop: true, autoplay: true });
  // once
  const sound = new Sound('dong', 'music/dongcidaci.mp3', scene);
  setTimeout(() => {
    sound.play();
  }, 2000)
  // render scene in canvas
  engine.runRenderLoop(() => {
    scene.render();
  });
  return scene;
};


export interface VillageProps {
  title: string,
};

const Village = ({ title }: VillageProps) => {
  const elRef = useRef(null);
  useEffect(() => {
    createScene(elRef.current!);
  }, []);
  return (
    <>
      <h5>{title}</h5>
      <canvas ref={elRef} width="500" height="200" />
    </>
  );
};

export default memo(Village);