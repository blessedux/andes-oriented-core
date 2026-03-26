# Prognosis tables in Supabase

If you see 404 errors on the **Drillhole Prognosis** page, or the message "Error fetching project prognosis parameters", prognosis tables do **not** exist yet in your Supabase database.

## What to do

1. Open your project **SQL Editor** in [Supabase](https://supabase.com/dashboard) (project -> SQL Editor).
2. Copy and paste the full contents of `create-prognosis-tables.sql` from this folder.
3. Run the script.

This creates:

- **project_prognosis_parameters**: project-level parameter configuration (up to 100 alphanumeric parameters per project, such as Lithology, RQD, etc.).
- **sondaje_prognosis**: drillhole prognosis entries (depth from/to + parameter + value). The `depth_to_m` column (optional) supports ranges; if it does not exist in your DB, run `add-prognosis-depth-to.sql`.

The script includes RLS policies so only project users can view/edit data.

## `trajectory_points` table (optional)

A **404 on `trajectory_points`** means that table does not exist. The app still works (prognosis and visualization use computed trajectory), but the Supabase request fails and logs an error.

To remove the 404 and support future trajectory persistence:

1. In Supabase **SQL Editor**, create a new query.
2. Copy and paste all content from `create-trajectory-points-table.sql` (same `docs/` folder).
3. Run the script.

It creates `trajectory_points` with columns `sondaje_id`, `depth`, `este`, `norte`, `elevacion`, plus RLS. The table can remain empty; the app keeps using computed trajectory until data is inserted.

## Summary

| Resource | Action if 404 appears |
|----------|-----------------------|
| `project_prognosis_parameters` | Run `create-prognosis-tables.sql` |
| `sondaje_prognosis` | Same script |
| `trajectory_points` | Run `create-trajectory-points-table.sql` (optional, avoids 404) |

**Depth ranges (`from-to`):** if `sondaje_prognosis` existed before adding `depth_to_m`, run **`add-prognosis-depth-to.sql`** in Supabase to store depth ranges.

After running scripts, refresh the Prognosis page. 404 errors should disappear and you should be able to configure parameters and save entries (single point or from-to range).
