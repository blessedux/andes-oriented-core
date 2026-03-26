# PlaneBuilder: normalization and plane construction (measurements -> GeologyPlane)

Module `planeBuilder.ts`. Builds `GeologicalPlane[]` from:
- measurements (`point_trios` + `boh_lines` + `device_info`)
- per-drillhole trajectory (`trajectoryPoints`)
- drillhole metadata (`azimuth` / `inclination` / `collar`)

This file assembles the structure consumed later by:
- `planeMeasurementTruth.ts` (canonical depth and angle reads)
- 3D visualization/editor (discs, ellipses, cylinder)

---

## 1. Inputs

- `measurements: Measurement[]`
- `trajectoryPoints: Map<string, TrajectoryPoint[]>`
- `sondajeMetadata: Map<string, SondajeVisualizationMetadata>`
- `dynamicColumns: DynamicColumn[]`
- `options?: { enableDebug?, structureTypeStyles? }`

---

## 2. Normalization standards (rules)

1. Units: everything is built in **meters** for GEO coordinates/equations and `trajectory[].depth`.
2. Cylinder radius and height:
   - radius/height come from `getCylinderDimensions(diameterType)` (H/N)
   - logical height is 30 cm (0.3 m)
3. Scene base depth (composite image):
   - `composite_image_depth` arrives as center-of-capture depth (15 cm), in meters
   - `depth_reference_cm` (if available) helps define how 0-30 cm base is interpreted in Hub
4. Trios and discs:
   - trio `depthMeters` is preferably computed with `calculateTrioDepthFromPoints(profMan, n1, n2, n3, CYLINDER_HEIGHT_M)`
5. Cylinder and composite coordinates:
   - `compositeCoordinates` is positioned at cylinder center (base + height/2).

---

## 3. Canonical input parsing

### 3.1. `point_trios`

`planeBuilder.ts` interprets `measurement.point_trios` as:
- direct array, or
- JSON string (parsed)

Each trio contains `points` (x,y,z) coordinates (Field -> Hub normalization depends on full pipeline).

---

### 3.2. `boh_lines`

`boh_lines` can come from:
- `measurement.boh_lines` (legacy array or object)
- `measurement.device_info.boh_lines` (fallback)

It is normalized into an object with:
- `line1Angle` / `line2Angle` plus snake_case aliases (`line1_angle` / `line2_angle`) for downstream compatibility.

---

### 3.3. Detecting measurements WITHOUT point_trios

Measurement is treated as "without trios" if:
- `device_info.has_no_point_trios === true`
- or `save_mode === 'boh_and_image_only'`
- or `measurement_type === 'image_only'`
- or `has_trios === false`

But if `pointTrios.length > 0`, data presence is prioritized and it is processed as a trio-based measurement.

---

## 4. Building `GeologicalPlane` (with trios)

For each valid trio (3 points):

1. Normalizes points to cylinder-local space (n1, n2, n3) and computes:
   - `equation` with `calculatePlaneFromThreePoints(n1, n2, n3)`
   - `dip`/`dipDirection` when possible (with fallback)
2. Alpha/beta (and when dip/dipDirection are missing):
   - alpha/beta come from `trio.angles`, trio root, or `dynamicData`
   - if missing, and required inputs exist (`alpha/beta + boh + orientation`), they are computed with `calculateDipAndDipDirectionFromAlphaBeta(...)`
3. Trio depth:
   - `depthMeters` preferably via `calculateTrioDepthFromPoints(...)` using `profMan`
4. Coordinates:
   - `coordinates` for discs/ellipses by trajectory interpolation at `depthMeters`
   - fallback when no trajectory: trio `averagePoint`, converted with `localCylinderToUtm` when collar/orientation exists
5. Ellipse:
   - `ellipsePoints` are generated from equation and cylinder radius
6. Display equation:
   - `equationForDisplay` keeps disc/ellipse orientation aligned with alpha/beta

Attached metadata:
- `compositeImageDepth` (30 cm scene base)
- `captureDepthCenter` (15 cm for tables)
- `bohAngles`
- `deviceInfo` and (if present) `cylinderMapping` to preserve original FOV.

---

## 5. Special plane construction (without trios)

If there are no valid trios and measurement has BOH plus image (or equivalent flags):

- creates `planeWithoutTrios` with:
  - `angles: { alpha: undefined, beta: undefined }` (to show N/A)
  - default `equation` (horizontal plane)
  - `depth`, `structureDepthM`, `compositeImageDepth`, `captureDepthCenter` based on manual depth
- computes `coordinates` from manual depth on `trajectory` when available
- attaches `cylinderMapping` if available

Goal:
- base instance appears in 3D
- depth tables (15 cm center) remain coherent
- no fake dip/dipDirection or trio-derived structure is generated when trios do not exist

---

## 6. Validation checklist

1. Measurement with point_trios:
   - verify `plane.depth` and `plane.structureDepthM` are consistent
   - verify `plane.compositeCoordinates` places cylinder at scene center
2. Measurement without point_trios:
   - verify only special plane exists (no trio-generated discs/ellipses)
   - verify table `depth` matches `captureDepthCenter`
3. Legacy BOH:
   - verify `boh_lines` parsing works for both array and object formats
4. Images:
   - verify local URLs (`localhost/127.0.0.1`) are filtered or rebuilt via `buildImagePublicUrl`

