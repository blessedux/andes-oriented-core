# Unified virtual geometry: Field ↔ Hub

Single source of truth so **diameter**, **cylinder axis length**, **BOH length and angular position**, and **FOV** are identical in Field and in the Hub 3D editor. The image captured in Field, including BOHs, point trios, and ellipses, must look the same and fully visible within the device camera's visible portion.

---

## 1. Single source of dimensions

- **Package:** `@geostar/shared` (`packages/shared/src/constants/cylinder.ts`).
- **Hub** uses these constants through `compositeImageHelper.ts` (re-export of `CYLINDER`, `BOH_TICK_POSITIONS_CM`, etc.).
- **Field** uses `SHARED_CYLINDER` / `CYLINDER` from the same package in `cylinderMappingCapture.ts` and in 3D geometry.

| Constant | Value | Usage |
|----------|-------|-------|
| `CYLINDER.HEIGHT_CM` | 30 | Logical cylinder height (cm). |
| `CYLINDER.HEIGHT_M` | 0.3 | Same axis length in meters. |
| `CYLINDER.RADIUS_CM` | 3.175 | **H-type** radius (6.35 cm diameter). |
| `CYLINDER.DIAMETER_CM` | 6.35 | H-type diameter. |
| `BOH_TICK_POSITIONS_CM` | [0, 10, 20, 30] | BOH ticks (0 cm = base, 30 cm = top). |
| `BOH.BOH1_CENTER_Z_CM` | 7.5 | BOH1 center (lower half 0-15 cm). |
| `BOH.BOH2_CENTER_Z_CM` | 22.5 | BOH2 center (upper half 15-30 cm). |

**N-type diameter:** not currently in shared constants. In Hub (and Field when applicable), use **2.38 cm radius** (0.0238 m) when `cylinder_diameter === 'N'`. Defined in `compositeImageHelper.ts` as `CYLINDER_DIMENSIONS.N`.

---

## 2. Diameter and axis length

- **Diameter:** always from `getCylinderDimensions(diameterType)` in Hub (`diameterType` = `plane.cylinderDiameter` or `'H'`). H = 6.35 cm, N = 4.76 cm.
- **Cylinder axis length:** always **30 cm** (0.3 m). No visual correction is applied: mesh geometry and BOHs use the same `CYLINDER_HEIGHT_M` so 0 cm and 30 cm align with the image.
- **Hub:** cylinder mesh and `FieldDataRenderer` (BOHs, ticks, ellipses, point trios) use `dimensions.height` and `dimensions.radius` from `getCylinderDimensions(plane.cylinderDiameter ?? 'H')`. Do not use `cylinderMapping.height` for mesh or BOH length; only use it as UV-mapping metadata if needed.
- **Field:** sends `device_info.cylinder_mapping` with `height: 0.3` and radius in meters (0.03175 for H, 0.0238 for N). Field 3D geometry uses true 30 cm height. Saved composite image must contain **only** 0-30 cm cylinder content (no black bands): main capture path fills the frame; fallback path crops to content.
- **Hub:** does not assume a fixed 32 cm model (30 + 2x1 cm black bands). Components rendering composite images (`MeasurementCompositeImage`, `EditorImageRotated`, etc.) use texture `repeat(1,1)` and `offset(0,0)`; vertical crop (for legacy images with bands) is handled by `mapCylinderUVs` using `device_info.cylinder_mapping.hasBlackBands` and dimensions. This keeps image 30 cm aligned with cylinder and BOHs 30 cm.

---

## 3. BOHs: length and angular position

- **Length:** each BOH covers **15 cm** along the axis (half the cylinder). BOH1: 15-30 cm, BOH2: 0-15 cm. Total cylinder length is 30 cm; BOH ends at 0 cm and 30 cm match cylinder ends.
- **Angular position:** comes from `boh_lines` / `device_info` (`line1Angle`, `line2Angle`, or equivalent). Hub uses this in `FieldDataRenderer` and cylinder orientation calculations; Field uses it to draw lines in capture.
- **0/30 cm alignment:** with AC = 0 degrees (same BOH angle for BOH1 and BOH2), the cylinder front in Field is 90 degrees -> in Hub `visibleArcCenterU = 0.25` (90/360). See `BOH_CYLINDER_UV_REF.md` section 5.

---

## 4. FOV and visible portion (same and complete image)

To ensure the **image captured in Field** looks **identical and complete** in Hub's 3D editor (same portion visible by the device camera):

- **Field** computes and stores in `device_info.cylinder_mapping`:
  - `effectiveFOV`: effective FOV from real on-screen cylinder size and camera distance.
  - `visibleArcDegrees`, `visibleArcCenterU`, `visibleArcUMin`, `visibleArcUMax`: visible cylinder arc.
  - `cylinderScreenHeightPx`, `cylinderScreenWidthPx`: cylinder pixel size in capture (for arc aspect ratio).
- **Hub** must use these values **without recomputing** visible arc when metadata exists:
  - In `cylinderMappingHelpers.ts`, `getCylinderMappingParams()` uses `metadata.visibleArcDegrees`, `metadata.visibleArcUMin/Max`, `metadata.visibleArcCenterU` and, when available, `cylinderScreenWidthPx` / `cylinderScreenHeightPx` for `arcAspectRatio`.
  - In `FieldCaptureView3D.tsx`, camera uses `cylinderMapping.effectiveFOV` (fallback to `fov` or 60 degrees) so view cone matches Field.
  - UV mapping (`mapCylinderUVs`) uses `visibleArea` (uMin, uMax, arcAspectRatio, etc.) so texture shows exactly the captured visible area.

This ensures **composite image**, **BOHs**, **point trios**, and **ellipses** stay aligned in diameter, axis length, angular position, and FOV, and the visible area in Hub 3D matches Field camera visibility.

---

## 5. Key file summary

| Topic | Field | Hub |
|------|--------|-----|
| 30 cm constants and H radius | `@geostar/shared` in `cylinderMappingCapture.ts` | `compositeImageHelper.ts` (shared re-export), `getCylinderDimensions()` |
| FOV and visible arc | `cylinderMappingCapture.ts` (`effectiveFOV`, `visibleArc*`) | `cylinderMappingHelpers.ts` (`getCylinderMappingParams`), `FieldCaptureView3D` (`camera.fov = effectiveFOV`) |
| Mesh and BOHs same length | 30 cm geometry | `FieldCaptureView3D` + `FieldDataRenderer`: `dimensions.height = CYLINDER_HEIGHT_M` |
| Per-plane diameter | `device_info` / `cylinder_diameter` | `plane.cylinderDiameter`, `getCylinderDimensions()` |
| UV mapping 0/30 cm | - | `mapCylinderUVs`, `BOH_CYLINDER_UV_REF.md` |

---

## 6. Quick validation

1. Capture in Field with complete `cylinder_mapping` (`effectiveFOV`, `visibleArc*`, `cylinderScreen*Px`).
2. Open the measurement in Hub 3D editor.
3. Confirm: same diameter and 30 cm length; BOHs and 0/10/20/30 ticks aligned with image; same visible cylinder portion (no extra crop/stretch).
4. If portion does not match: verify Hub uses metadata `effectiveFOV` and metadata arc (no recomputation), and `mapCylinderUVs` uses `visibleArea` from `getCylinderMappingParams`.

**Validation checklist (Field -> Hub):** (1) capture in Field with visible cylinder; (2) inspect PNG: no black bands (cylinder content only); (3) open in Hub: same visible portion, BOHs/ticks 0-30 cm aligned; (4) verify table depths (`prof_man` and trios are correct).
