# Trio recalculation from cylinder points

Module `trioEditRecalculation.ts`. Recalculates trio geological properties when users edit points in the cylinder 3D editor.

The function takes 3 points in cylinder local coordinates and returns:
- plane geometry (alpha, beta, AC in viewer convention)
- dip / dipDirection
- depth (optional/null) consistent with scene (using `compositeImageDepthM`)

---

## 1. Problem it solves

Previously, when editing trio points, it was easy for:
- alpha/beta and dip/dipDirection to drift out of sync
- depth calculation to depend on inconsistent heuristics across views

This module defines a single recalculation flow so edited trio data persists and appears consistently in:
- visualizacion 3D
- discos/elipses
- tablas/estats (dip/dipDirection/structureDepth)

---

## 2. `recalculateTrioFromCylinderPoints(updatedPoints, opts)`

### 2.1. Inputs

- `updatedPoints: TrioCylinderPoint[]`
  - Must contain exactly 3 points
  - Cylinder-local coordinates (meters)
- `opts:`
  - `cylinderDiameter: string` (H or N; cast to `'H' | 'N'` when dimensions are resolved)
  - `bohLines: { line1_angle?: number; line2_angle?: number }`
  - `compositeImageDepthM: number`
  - `sondajeAzimuth?: number`
  - `sondajeInclination?: number`

### 2.2. Internal flow (summary)

1. Computes plane equation with `calculatePlaneFromThreePoints(p1,p2,p3)`.
2. Obtiene `dims = getCylinderDimensions(cylinderDiameter)`:
   - radio `dims.radius`
   - altura `dims.height`
3. Computes ellipse points (64 segments) to derive beta:
   - `calculateEllipsePoints(equation, dims.radius, 64)`
4. Computes BOH angle used for beta:
   - `getBOHAngleForTrioPoints(bohLines, updatedPoints)`
   - uses `90` defaults when both BOH angles are not provided
5. Calcula:
   - `alpha = calculateAlpha(equation)`
   - `beta  = calculateBeta(equation, bohAngleForBeta, ellipsePoints)`
   - `ac = calculateAC(l1, l2)` (using l1/l2 from `opts.bohLines`)
6. Computes dip / dipDirection:
   - if `sondajeAzimuth` and `sondajeInclination` exist, uses `recalculateDipFromAngles(...)`
   - otherwise uses `calculateDip(equation)` and `calculateDipDirection(equation)`
7. Computes trio depth (`depthM`):
   - requiere `compositeImageDepthM` finito
   - usa `calculateTrioDepthFromPoints(compositeImageDepthM, p1, p2, p3, dims.height)`

### 2.3. Output

Devuelve:
- `{ alpha, beta, ac, dip, dipDirection, depthM }`

If:
- `updatedPoints.length !== 3` -> returns `null`
- any calculation fails -> returns `null`

---

## 3. Validation checklist

1. Edit one trio point:
   - verify alpha/beta change consistently with plane
   - verify dip/dipDirection do not jump unpredictably
2. Edit in a case with defined BOH:
   - confirm AC (`ac`) is recalculated from `line1_angle` / `line2_angle`
3. Edit with and without `sondajeAzimuth/Inclination`:
   - with metadata: use angle-based recalculation
   - without metadata: use equation-based dip/dipDirection

