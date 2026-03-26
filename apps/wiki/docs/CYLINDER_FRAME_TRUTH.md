# Cylinder frame: scene calculation and near hemisphere

Module `cylinderFrameTruth.ts`. It defines two critical pieces for consistency between:
- visualizacion en 3D del cilindro (cilindro/cilindro-texturas)
- 3D editor (discs, ellipses, selection, and editing)

The goal is to use the same depth and the same visible hemisphere across the entire Hub app.

---

## 1. Problem it solves

When UI calculates:
- where cylinder center is in world space (for meshes and editing)
- which texture portion belongs to near/visible hemisphere (for UV cropping/selection)

it is easy for different components to use different conventions.

`cylinderFrameTruth.ts` unifies those conventions:
- `getCylinderFrameAtCaptureCenter(...)` -> frame del cilindro en el centro de captura
- `getNearHemisphereBoundsFromBOHs(...)` -> bounds `{ uMin, uMax }` del hemisferio cercano

---

## 2. `getCylinderFrameAtCaptureCenter(...)`

Signature (current implementation):

- `plane: GeologicalPlane`
- `measurement: { device_info?, compositeImageDepth?, boh_lines? } | null | undefined`
- `trajectory: TrajectoryPoint[]`
- `offset: {x,y,z}` (offset del contexto de escena)
- `profile: HUB_CYLINDER_DISPLAY_PROFILE.trajectory | HUB_CYLINDER_DISPLAY_PROFILE.editor3d`
- `fallbacks?: LiveMeasurementDepthFallbacks`

What it does:

1. Determines geometry by plane diameter:
   - `diameterType = plane.cylinderDiameter ?? 'H'`
   - `dims = getCylinderDimensions(diameterType)`
   - `radiusM` y `heightM` salen de `dims`
2. Calculates `targetDepthM` using depth truth module:
   - `getCylinderTrajectoryAnchorDepthM(plane, heightM, fallbacks)`
3. Calculates base world position/orientation:
   - `calculateImagePositionOnTrajectory(targetDepthM, trajectory, offset, heightM)`
4. Canonicalizes BOH angles:
   - `getCanonicalBohAnglesFromPlane(plane, measurement)`
5. Builds final quaternion:
   - `calculateImageOrientation(axisDirWorld, line1Angle, line2Angle, profile.imageOrientationAxialDeg, result.azimuthAtDepth)`

`CylinderFrame` output:
- `centerWorld: THREE.Vector3`
- `axisDirWorld: THREE.Vector3`
- `quaternionWorld: THREE.Quaternion`
- `radiusM: number`
- `heightM: number`
- `targetDepthM: number`

---

## 3. `getNearHemisphereBoundsFromBOHs(...)`

Input:
- `boh1AngleDeg`
- `boh2AngleDeg`
- `bohLocalOffsetDeg`

Output:
- `{ uMin, uMax }` in canonical U space (0..1) with wrap handling.

Concept:
- BOH angles define a "front" and an interval around center (using angular offset from `BOH_AXIAL_OFFSET_DEG + bohLocalOffsetDeg`)
- Two points are computed (2D XY) and used to extract a local front vector
- It converts to U (`atan2` + normalization)
- It builds a total 0.5-wide window (0.25 each side in U)

In practice:
- `FieldCylinderWithData` / `FieldCaptureView3D` / `FullscreenCylinderEditor3D`
- used to apply crops or bounds when selection/editing is restricted to near hemisphere

---

## 4. Validation checklist

1. Select a measurement with visible BOHs:
   - verify `uMin/uMax` covers the same side as camera view
2. Edit discs/ellipses:
   - verify editing does not jump to far-side areas when it should not
3. Depth fallback cases:
   - when `captureDepthCenter` is missing, verify cylinder anchor stays stable across views

