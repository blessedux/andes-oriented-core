-- Añadir columna depth_to_m a sondaje_prognosis (rangos desde-hasta).
-- Ejecutar en Supabase SQL Editor si la tabla ya existía sin esta columna.
ALTER TABLE public.sondaje_prognosis
  ADD COLUMN IF NOT EXISTS depth_to_m DOUBLE PRECISION;
