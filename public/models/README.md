# 3D Models Directory

Place your 3D model files (`.glb` or `.gltf`) in this directory.

For example:
- `public/models/model.glb`

Then update the path in `src/components/ModelViewer.tsx`:
```tsx
const { scene } = useGLTF('/models/model.glb');
```
