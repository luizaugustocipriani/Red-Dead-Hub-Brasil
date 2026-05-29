document.addEventListener("DOMContentLoaded", function () {
    
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede a página de recarregar ao submeter
            
            
            const nomeInput = form.querySelector("input[type='text']");
            const nomeForagido = nomeInput ? nomeInput.value : "Parceiro";
            
            
            alert(`🤠 Abaixe as armas, ${nomeForagido}! Sua mensagem foi enviada com sucesso para o Saloon. Responderemos em breve!`);
            
            form.reset(); 
        });
    }  
    const artigosDicas = document.querySelectorAll("article");
    artigosDicas.forEach(article => {
        article.addEventListener("mouseenter", function () {
            this.style.borderColor = "var(--red-bright)"; 
        });
        
        article.addEventListener("mouseleave", function () {
            this.style.borderColor = "var(--red-primary)"; 
        });
    });
});