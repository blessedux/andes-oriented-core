# Mapping between 3D cylinder and 2D image (cylindrical unwrap)

Module `cylinderImageMapper.ts`. Defines transforms between:
- coordenadas en el cilindro (3D local)
- coordenadas 2D de la imagen compuesta (desarrollo 2D del cilindro)

This module uses the **visible arc / near hemisphere** concept to prevent points/selections from appearing on the far side.

---

## 1. Basic conventions

Composite image = cylinder unwrap:
- Image width = cylinder circumference: `2 * pi * radius`
- Image height = logical cylinder height: 30 cm (0.3 m)

Conceptual mapping:
- Image X axis: angular position around cylinder (0..2pi -> u 0..1)
- Image Y axis: Z along cylinder height (0..0.3m -> v 0..1)

For orientation details and V formula with `textureFlipY`, see:
- `BOH_CYLINDER_UV_REF.md`

---

## 2. Key functions

### 2.1. `imageToCylinder3D(imageX, imageY, imageWidth, imageHeight, visibleArcUMin?, visibleArcUMax?)`

Converts 2D image coordinates to 3D cylinder coordinates.

- Computes `v = imageY / imageHeight`
- Z = `v * CYLINDER_HEIGHT`
- If `visibleArcUMin/visibleArcUMax` is provided:
  - map `imageX` to U inside visible arc (near hemisphere)
- Otherwise:
  - map `imageX` to full U range (0..1)

Output: `{x,y,z}` in local cylinder coordinates.

---

### 2.2. `snapCylinderPointToVisibleTextureArc(x,y,z,radius,bounds)`

Projects a 3D point onto cylinder radius (if outside due to numeric error) and **forces it into near hemisphere** using `{uMin,uMax}`.

If angle `u` is outside `[uMin,uMax]`:
- use equivalent opposite side (`u + 0.5` with wrap)
- or clamp to limits.

---

### 2.3. `cylinder3DToVisibleHemisphere(cylinderX,cylinderY,cylinderZ, visibleArcUMin, visibleArcUMax)`

Utility function for visualization:
- computes angle around axis with `atan2(cylinderY, cylinderX)`
- converts to u in 0..1
- if `u` is outside visible arc, tries opposite `uOpposite = (u + 0.5) % 1`

Result:
- returned point stays in visible/clipped hemisphere.

---

### 2.4. `cylinder3DToImage(cylinderX,cylinderY,cylinderZ,imageWidth,imageHeight, visibleArcUMin?, visibleArcUMax?)`

Converts local cylinder coordinates to image pixels.

If visible arc (uMin/uMax) is provided:
- if `u` is outside arc:
  - use opposite-side `u` (`u + 0.5`) if inside
  - otherwise clamp to [uMin,uMax]
- luego:
  - `x = (u - uMin) / (uMax - uMin) * imageWidth`
  - `y = (cylinderZ / CYLINDER_HEIGHT) * imageHeight`

If no visible arc is provided:
- `x = u * imageWidth`
- `y = (cylinderZ / CYLINDER_HEIGHT) * imageHeight`

---

## 3. Validation checklist

1. Image selection:
   - converting click/drag in image -> 3D cylinder should keep point in near hemisphere
2. 3D selection/editing:
   - converting cylinder -> image should avoid far-side jumps
3. Wrap cases near u=0/1:
   - validate wrapped `[uMin,uMax]` intervals so clipping remains continuous

