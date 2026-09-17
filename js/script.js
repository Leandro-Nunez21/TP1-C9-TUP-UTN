document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MODO OSCURO (Controlado por clases de CSS)
    // ==========================================
    const btnTheme = document.getElementById('btn-theme');
    const body = document.body;

    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                btnTheme.textContent = '☀️ Claro';
            } else {
                btnTheme.textContent = '🌙 Oscuro';
            }
        });
    }

    // ==========================================
    // 2. PERFIL INTERACTIVO (En tiempo real)
    // ==========================================
    const formPerfil = document.getElementById('form-perfil');
    
    if (formPerfil) { 
        const inputNombre = document.getElementById('nombre');
        const inputAvatar = document.getElementById('url-avatar');
        const inputIntereses = document.getElementById('intereses');
        const inputHabilidades = document.getElementById('habilidades');

        const previewNombre = document.getElementById('preview-nombre');
        const previewAvatar = document.getElementById('preview-avatar');
        const previewIntereses = document.getElementById('preview-intereses');
        const previewHabilidades = document.getElementById('preview-habilidades');

        // Eventos en tiempo real mientras el usuario escribe en el formulario
        inputNombre.addEventListener('input', (e) => {
            previewNombre.textContent = e.target.value.trim() || 'Nombre y Apellido';
        });

        inputAvatar.addEventListener('input', (e) => {
            previewAvatar.src = e.target.value.trim() || 'https://via.placeholder.com/150';
        });

        inputIntereses.addEventListener('input', (e) => {
            previewIntereses.textContent = e.target.value.trim() || 'Tus intereses';
        });

        inputHabilidades.addEventListener('input', (e) => {
            previewHabilidades.textContent = e.target.value.trim() || 'Tus habilidades aparecerán aquí...';
        });

        // Acción al hacer clic en "Guardar Perfil" (Solo muestra una alerta visual sin usar JSON)
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Perfil guardado correctamente en la interfaz!');
        });
    }
});