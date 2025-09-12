// Funcionalidades básicas do site de jornal

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização das funcionalidades
    initSmoothScrolling();
    initReadingProgress();
    initAccessibilityFeatures();
});

// Scroll suave para melhor experiência do usuário
function initSmoothScrolling() {
    // Adiciona comportamento de scroll suave para navegadores que não suportam nativamente
    if (!('scrollBehavior' in document.documentElement.style)) {
        const style = document.createElement('style');
        style.textContent = 'html { scroll-behavior: smooth; }';
        document.head.appendChild(style);
    }
}

// Barra de progresso de leitura
function initReadingProgress() {
    // Cria a barra de progresso
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #007bff, #0056b3);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    // Atualiza a barra de progresso baseada no scroll
    window.addEventListener('scroll', function() {
        const article = document.querySelector('.article');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;

        const progress = Math.min(
            Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
            1
        );

        progressBar.style.width = (progress * 100) + '%';
    });
}

// Funcionalidade de impressão removida

// Melhorias de acessibilidade
function initAccessibilityFeatures() {
    // Adiciona navegação por teclado
    document.addEventListener('keydown', function(e) {
        // Escape para voltar ao topo
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Adiciona indicador de foco para elementos interativos
    const style = document.createElement('style');
    style.textContent = `
        button:focus,
        a:focus {
            outline: 2px solid #007bff !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

// Função para destacar texto (funcionalidade extra)
function highlightText() {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = '#ffeb3b';
        span.style.padding = '2px 4px';
        span.style.borderRadius = '3px';
        
        try {
            range.surroundContents(span);
            selection.removeAllRanges();
        } catch (e) {
            console.log('Não foi possível destacar o texto selecionado');
        }
    }
}

// Adiciona evento de duplo clique para destacar texto
document.addEventListener('dblclick', function() {
    highlightText();
});

// Função para calcular tempo de leitura estimado
function calculateReadingTime() {
    const articleText = document.querySelector('.article-body');
    if (!articleText) return;

    const text = articleText.textContent;
    const wordsPerMinute = 200; // Velocidade média de leitura
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    // Adiciona o tempo de leitura ao artigo
    const readingTimeElement = document.createElement('div');
    readingTimeElement.innerHTML = `⏱️ Tempo de leitura estimado: ${readingTime} minuto${readingTime > 1 ? 's' : ''}`;
    readingTimeElement.style.cssText = `
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 20px;
        padding: 10px;
        background-color: #f8f9fa;
        border-radius: 5px;
        text-align: center;
    `;

    const articleTitle = document.querySelector('.article-title');
    articleTitle.parentNode.insertBefore(readingTimeElement, articleTitle.nextSibling);
}

// Inicializa o cálculo de tempo de leitura após o carregamento
window.addEventListener('load', function() {
    setTimeout(calculateReadingTime, 500);
});

// Função para modo escuro (funcionalidade extra)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Carrega preferência de modo escuro
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Adiciona estilos para modo escuro
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    .dark-mode {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
    }
    
    .dark-mode .main-content {
        background-color: #2c2c2c !important;
    }
    
    .dark-mode .article-lead {
        background-color: #3a3a3a !important;
        color: #d0d0d0 !important;
    }
    
    .dark-mode .article-title {
        color: #ffffff !important;
    }
`;
document.head.appendChild(darkModeStyles);
