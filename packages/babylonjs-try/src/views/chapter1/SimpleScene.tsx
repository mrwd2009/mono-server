import { memo, useRef, useEffect } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, MeshBuilder, Vector3 } from 'babylonjs';

interface Options {
  label?: string,
}
const SimpleScene = ({ label = '2002' }: Options) => {
  return <div>{label}</div>;
};

export default memo(SimpleScene);

const createScene = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas);
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
  camera.attachControl(true);
  new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  MeshBuilder.CreateBox('box', {}, scene);
  engine.runRenderLoop(() => {
    scene.render();
  })
};

export const HelloWorldScene = () => {
  const elRef = useRef(null);
  useEffect(() => {
    createScene(elRef.current!);
  }, []);
  return (
    <canvas ref={elRef} width="500" height="250" />
  );
};