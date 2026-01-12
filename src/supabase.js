import { createClient } from '@supabase/supabase-js'

console.log('VITE_TESTE:', import.meta.env.VITE_TESTE)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey ? 'Carregada OK' : 'ERRO')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
