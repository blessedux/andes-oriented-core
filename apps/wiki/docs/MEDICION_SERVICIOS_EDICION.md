# Measurement services: editing, persistence, and recalculation

This document summarizes the main flows in:
- `apps/hub/src/services/measurementService.ts`
- `apps/hub/src/services/measurementEditorService.ts`

Goal: clarify responsibilities so geometry changes (alpha/beta/dip) and persistence changes (Supabase) stay aligned.

---

## 1. `measurementService.ts` (basic Supabase operations)

Main functions:

### 1.1 `updateMeasurementStatus(measurementId, status)`

Updates:
- `approval_status`
- `updated_at`

---

### 1.2 Deletions

- `deleteMeasurement(measurementId, options?)`
  - deletes from `measurements`
  - optionally prepares image deletion (CDN), but this flow does not execute ImageKit deletion (credential reasons)
  - optionally records deletion history with `saveDeletionRecord`
- `deleteMeasurements(measurementIds, options?)`
  - deletes one by one and accumulates errors

---

### 1.3 Full update

`updateMeasurement(measurementId, updates)`

Updates fields provided in `updates`:
- `point_trios` (if provided)
- `device_info` (if provided)
- `boh_lines` (if provided)
- `dynamic_data` (assumed embedded in `device_info` as `dynamic_data`)
- `sondaje_id` (if provided)

Returns `true` when update succeeds.

---

### 1.4 Edit a single trio

- `updatePointTrio(measurementId, trioId, updates, editedBy?)`
  - loads full measurement
  - finds trio by `id`
  - adds `editHistory` record when relevant changes occur (points/structureType/color/etc.)
  - persists with `updateMeasurement(...)`
- `updateTrioPoints(measurementId, trioId, points, editedBy?)`
- `updateTrioStructureType(measurementId, trioId, structureType, color?, editedBy?)`

---

### 1.5 Create measurement

`createMeasurement(measurement)`

Creates a Supabase record with:
- `device_info.measurement_source` and source label

---

### 1.6 Recalculation and persistence from edited points

`recalculateAndUpdatePlaneFromPoints(measurementId, trioId, points, options)`

Flow:
1. Dynamically imports `planeRecalculator.ts`
2. Gets measured alpha/beta from original trio as fallback
3. Recalculates dip/dipDirection and angles (alpha/beta optionally)
4. Tries to recalculate `depth` and `structureDepthM` from `device_info.composite_image_depth` (when parseable)
5. Updates the trio in Supabase through `updatePointTrio(...)`

---

### 1.7 Measurement reassignment

`reassignMeasurements(measurementIds, newSondajeId, sourceProjectId)`

Updates:
- `sondaje_id`
- `project_id` (if destination drillhole belongs to another project)

---

## 2. `measurementEditorService.ts` (flows from Field/Editor)

Main functions:

### 2.1 `loadMeasurementById(measurementId)`

Loads measurement and normalizes:
- parses `point_trios` (can be JSON string)
- interprets `device_info.composite_image_depth` as scene base
- converts points to Hub conventions:
  - x/y to meters
  - z to Hub local Z ([-0.15, +0.15]) with detection to avoid reconverting data already created in Hub
- extracts `boh_angles` using `extractBohAngles(...)`

---

### 2.2 `updateMeasurement(measurementId, updates)`

Flow:
1. Verifies session (Supabase auth)
2. Loads current measurement
3. Ensures `boh_lines` is saved as `{line1_angle, line2_angle}`
4. Normalizes coordinates before saving:
   - projects points to max radius when needed
   - clamps Z to Hub local visibility convention
5. If `measurementId` is not a valid UUID:
   - creates new measurement and deletes old one (compatibility with non-standard IDs)
6. Preserves `device_info` (and ensures `measurement_source` metadata)

Returns `true/false`.

---

### 2.3 `updateMeasurementTrioFromDiscontinuity(...)`

Receives validated discontinuity payload:
- `alpha`, `beta`, and equation (if available)

Calculates dip/dipDirection using:
- `calculateDipAndDipDirectionFromAlphaBeta(...)`

Then updates trio and `dynamicData` with equation/alpha/beta.

---

### 2.4 `addMeasurementTrioFromValidatedDiscontinuity(...)`

Creates a new trio from validated candidate and appends it to measurement:
- assigns `id` and `points` (clamped to 3 points)
- `depth` in cm calculated from `depthCenterM`
- sets `structureType`, `color`, `angles`, and `dynamicData`

---

## 3. Validation checklist

1. Edit points in 3D editor:
   - confirm coordinates are normalized to expected clamping
   - confirm dip/dipDirection/angles recalculate and persist
2. Update from discontinuities:
   - confirm dip/dipDirection are derived from `alpha/beta` + drillhole context
3. ID compatibility:
   - if ID is not valid UUID, verify new measurement is created and old one deleted without losing `device_info`

