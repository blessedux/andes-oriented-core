# Measurement plane: single source of truth (Field ↔ Hub)

Module `planeMeasurementTruth.ts`. It centralizes rules that must stay consistent across:
- visualization (cylinder/3D, discs/ellipses)
- 3D editor (discs, ellipses, live editing)
- tables/lists (depths, BOHs, and derived fields)

The goal is to remove duplicated logic for depth conversion, BOH angles, and structure depth that used to be spread across different components.

---

## 1. Problem it solves

In Hub, multiple views need:
- anchor depth for the 30 cm cylinder along trajectory
- composite depth (for image and label placement)
- canonical BOH angles (for AC, orientation, discs/ellipses, visible-arc limits)
- canonical structure depth (for tooltips/tables)

`planeMeasurementTruth.ts` defines these values in one place.

---

## 2. Funciones clave

### 2.1. `getCylinderTrajectoryAnchorDepthM(plane, cylinderHeightM, fallbacks?)`

Returns the linear drillhole depth where the **center of the 30 cm cylinder** is anchored.

Priority rules (as implemented):

1. `plane.captureDepthCenter` if finite: physical center depth of capture (15 cm).
2. If missing, compute from base using the first finite fallback/field:
   - `plane.compositeImageDepth`
   - `fallbacks.compositeImageDepthM`
   - `fallbacks.deviceCompositeImageDepthM`
   - `plane.depth`
   - 0 (fallback final)
3. If measurement **has no point_trios** (`plane.hasNoPointTrios === true`):
   - scene center equals base.
4. If point trios exist:
   - scene center is `base + cylinderHeightM / 2`.

Relevant input:
- `plane.hasNoPointTrios` determines whether to use direct `base` or `base + height/2`.

Output:
- number in meters (same unit as `trajectory[].depth` in viewer).

---

### 2.2. `getMeasurementCompositeDepthMForDisplay(plane, measurement?)`

Depth used for display (for example labels and visual consistency with the composite image).

Prioridad:
- `measurement.compositeImageDepth`
- `plane.compositeImageDepth`
- `plane.captureDepthCenter`
- `plane.depth`
- 0

---

### 2.3. `getCanonicalBohAnglesFromPlane(plane, measurement?)`

Returns `{ line1Angle, line2Angle }` with canonical convention for:
- calcular `AC`
- orientar el cilindro y los discos/elipses
- aplicar limites de arco visible/hemisferio cercano

Angle priority:
- `plane.bohAngles.line1Angle` / `plane.bohAngles.line2Angle`
- legacy values in `plane.bohAngles` using snake_case: `line1_angle` / `line2_angle`
- `measurement.boh_lines.line1_angle` / `measurement.boh_lines.line2_angle`
- fallback: 90 / 90

---

### 2.4. `getCanonicalRockType(plane)`

Returns the unified structure type for tooltips/tables:
- `plane.rockType`
- o `plane.structureType` (compatibilidad)

---

### 2.5. `getCanonicalStructureDepthM(plane)`

Canonical structure depth for discs/ellipses/tooltips.

Entra a `resolveStructureDepthM({ structureDepthM, trioDepth, computedDepthM: plane.depth })`.

---

## 3. Unit contract (practical rule)

1. All canonical depths returned/used by this module are in **meters**.
2. Local cylinder coordinates in editor use local `Z` (Hub) and anchor using linear depth above.
3. If data comes through `compositeImageDepth`, assume base corresponds to the 30 cm scene (cylinder center = 15 cm) and respect shifts defined by `plane.hasNoPointTrios`.

---

## 4. How it connects with `planeBuilder.ts`

`planeBuilder.ts` builds `GeologicalPlane` with fields such as:
- `plane.depth` (depth in meters for trio-based or manual values)
- `plane.structureDepthM` / `plane.trioDepth` (segun disponibilidad)
- `plane.compositeImageDepth` (scene base used to place composite image)
- `plane.captureDepthCenter` (center depth, 15 cm, used in tables)
- `plane.bohAngles` y `plane.rockType`

This module (`planeMeasurementTruth.ts`) **reads** those fields and/or fallbacks so every view shares the same truth.

---

## 5. Validation checklist

1. Open a measurement with point trios and verify:
   - cylinder center depth matches scene/composite image
   - `line1Angle` / `line2Angle` correctly preserve AC and orientation
2. Open a measurement without point trios (`hasNoPointTrios === true`) and verify:
   - anchor uses `base` (no `height/2` addition)
   - labels/tables still use correct composite depth
3. For legacy fields (`snake_case` in `bohLines` or `bohAngles`):
   - verify angles are still extracted correctly

