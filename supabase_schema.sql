-- Create table for storing IMEI lookup records
CREATE TABLE IF NOT EXISTS public.imei_searches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    imei VARCHAR(15) NOT NULL,
    is_valid BOOLEAN DEFAULT true,
    device_brand VARCHAR(100),
    device_model VARCHAR(100),
    security_status VARCHAR(50),
    device_payload JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.imei_searches ENABLE ROW LEVEL SECURITY;

-- Allow public read access to recent searches
CREATE POLICY "Allow public read access to imei searches" 
ON public.imei_searches FOR SELECT 
USING (true);

-- Allow authenticated users or anonymous searches to insert records
CREATE POLICY "Allow public insert to imei searches" 
ON public.imei_searches FOR INSERT 
WITH CHECK (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_imei_searches_created_at ON public.imei_searches(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_imei_searches_imei ON public.imei_searches(imei);
