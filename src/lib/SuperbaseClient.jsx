
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vnghlakudkgjasouevnt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZ2hsYWt1ZGtnamFzb3Vldm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMjUzNDIsImV4cCI6MjAzODgwMTM0Mn0.PTZllC23x-ij9te4JaQ1H4ZjcFczX16RLPI8iLi10aI'
// const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
    db: {
      schema: 'public',
    },
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    realtime: {
      channels,
      endpoint,
    },
    global: {
      fetch: customFetch,
      headers: DEFAULT_HEADERS,
    },
  })

// ess.env.SUPABASE_KEY