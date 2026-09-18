const SUPABASE_URL = "https://brnqvcgkcrvdvyskoqkt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_6zbl1ScHlkd7iyOb--8BRw_gjWvNmhO";

if (
    !SUPABASE_URL ||
    !SUPABASE_PUBLISHABLE_KEY ||
    SUPABASE_URL.includes("PEGA_ACÁ") ||
    SUPABASE_PUBLISHABLE_KEY.includes("PEGA_ACÁ")
) {
    window.careerPathSupabase = null;

    console.error(
        "CareerPath AI: falta configurar SUPABASE_URL o SUPABASE_PUBLISHABLE_KEY en js/supabase.js."
    );
} else if (!window.supabase) {
    window.careerPathSupabase = null;

    console.error(
        "CareerPath AI: no se cargó la librería de Supabase. Revisá el script CDN en perfil.html."
    );
} else {
    window.careerPathSupabase = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
            },
        }
    );

    console.log(
        "CareerPath AI: Supabase conectado correctamente."
    );
}