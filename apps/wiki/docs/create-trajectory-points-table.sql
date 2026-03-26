-- Tabla: puntos de trayectoria por sondaje (opcional).
-- Si no existe, la app calcula la trayectoria desde collar/orientación/profundidad.
-- Columnas: sondaje_id, depth, este, norte, elevacion (coordenadas en el sistema del proyecto).
CREATE TABLE IF NOT EXISTS public.trajectory_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sondaje_id UUID NOT NULL REFERENCES public.sondajes(id) ON DELETE CASCADE,
  depth DOUBLE PRECISION NOT NULL,
  este DOUBLE PRECISION NOT NULL,
  norte DOUBLE PRECISION NOT NULL,
  elevacion DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_trajectory_points_sondaje_id ON public.trajectory_points(sondaje_id);
CREATE INDEX IF NOT EXISTS idx_trajectory_points_sondaje_depth ON public.trajectory_points(sondaje_id, depth);

ALTER TABLE public.trajectory_points ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view trajectory points of sondajes in their projects"
  ON public.trajectory_points FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = trajectory_points.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL))
    )
  );

CREATE POLICY "Project members with write role can insert trajectory points"
  ON public.trajectory_points FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = trajectory_points.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );

CREATE POLICY "Project members with write role can update trajectory points"
  ON public.trajectory_points FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = trajectory_points.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );

CREATE POLICY "Project members with write role can delete trajectory points"
  ON public.trajectory_points FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = trajectory_points.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );
