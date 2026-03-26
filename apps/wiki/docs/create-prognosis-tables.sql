-- Parámetros de prognosis por proyecto.
-- Un registro por proyecto; la columna "parameters" es un JSONB array de hasta 100 parámetros
-- alfanuméricos (id, name, type, required, description). El límite de 100 se aplica en la app.
CREATE TABLE IF NOT EXISTS public.project_prognosis_parameters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  parameters JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_project_prognosis_parameters_project_id ON public.project_prognosis_parameters(project_id);

ALTER TABLE public.project_prognosis_parameters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view prognosis params of their projects"
  ON public.project_prognosis_parameters FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE projects.id = project_prognosis_parameters.project_id
      AND (
        projects.owner_id = auth.uid()
        OR EXISTS (SELECT 1 FROM public.project_members WHERE project_members.project_id = projects.id AND project_members.user_id = auth.uid())
      )
    )
  );

CREATE POLICY "Project members with write role can insert prognosis params"
  ON public.project_prognosis_parameters FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects p
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE p.id = project_prognosis_parameters.project_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );

CREATE POLICY "Project members with write role can update prognosis params"
  ON public.project_prognosis_parameters FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE p.id = project_prognosis_parameters.project_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );

CREATE POLICY "Project members with write role can delete prognosis params"
  ON public.project_prognosis_parameters FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE p.id = project_prognosis_parameters.project_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );

-- Tabla: entradas de prognosis por sondaje (depth_m = desde; depth_to_m = hasta, opcional para rangos)
CREATE TABLE IF NOT EXISTS public.sondaje_prognosis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sondaje_id UUID NOT NULL REFERENCES public.sondajes(id) ON DELETE CASCADE,
  depth_m DOUBLE PRECISION NOT NULL,
  depth_to_m DOUBLE PRECISION,
  parameter_id TEXT NOT NULL,
  value JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_sondaje_prognosis_sondaje_id ON public.sondaje_prognosis(sondaje_id);
CREATE INDEX IF NOT EXISTS idx_sondaje_prognosis_depth ON public.sondaje_prognosis(sondaje_id, depth_m);

ALTER TABLE public.sondaje_prognosis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view prognosis of sondajes in their projects"
  ON public.sondaje_prognosis FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = sondaje_prognosis.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL))
    )
  );

CREATE POLICY "Project members with write role can insert prognosis"
  ON public.sondaje_prognosis FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = sondaje_prognosis.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );

CREATE POLICY "Project members with write role can update prognosis"
  ON public.sondaje_prognosis FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = sondaje_prognosis.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );

CREATE POLICY "Project members with write role can delete prognosis"
  ON public.sondaje_prognosis FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.sondajes s
      JOIN public.projects p ON p.id = s.project_id
      LEFT JOIN public.project_members pm ON pm.project_id = p.id AND pm.user_id = auth.uid()
      WHERE s.id = sondaje_prognosis.sondaje_id
      AND (p.owner_id = auth.uid() OR (pm.user_id IS NOT NULL AND pm.role IN ('owner', 'admin', 'editor')))
    )
  );
