const POLOS = [
    {
        id: 'RN',
        name: 'Rio Grande do Norte',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiZjc2ZDU5MDEtNTc2Yi00ZjlmLWIwNDUtNDA0OGQ1ODkyZWRmIiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'PB',
        name: 'Paraíba',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiZTI3MGE5YzktNDhhMS00MzRkLWI2ZWYtOWI3M2ZhM2RjZjU5IiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'PR',
        name: 'Paraná',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiNDhkNTg0NjQtNWMzYS00MTg5LTlkMjgtZGIzZjVkZDgyZWY1IiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'RS',
        name: 'Rio Grande do Sul',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiNzlhYjlmOTEtN2EyZi00NjcwLWFhOWItN2M4MGM3OTdhMjQ4IiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'PE',
        name: 'Pernambuco',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiZmQ4ZjkxNGUtN2IxYi00NmNiLWFiNTYtN2FkY2M0ODkwZGMzIiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'F1',
        name: 'Financeiro 1',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiYWUxZDY4ZTktNTVlYy00MzkzLWFjYjItZThlZjBhNDRmM2I3IiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'GL',
        name: 'Geral',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiMzkwZTNiMTYtZWVlNS00N2ZlLWE3YTYtNjAwNGZiZDA2NjE0IiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    }
];

function init() {
    const navList = document.getElementById('nav-list');
    const searchInput = document.getElementById('search-input');
    const iframe = document.getElementById('report-iframe');
    const loader = document.getElementById('loader');
    const drawer = document.getElementById('sidebar-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const menuToggle = document.getElementById('menu-toggle');
    const drawerClose = document.getElementById('drawer-close');
    const activePoloName = document.getElementById('active-polo-name');
    const externalLink = document.getElementById('external-link');

    // ---- Drawer open / close ----
    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('visible');
        menuToggle.classList.add('open');
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('visible');
        menuToggle.classList.remove('open');
    }

    menuToggle.addEventListener('click', () => {
        drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    drawerClose.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Close drawer with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });

    // ---- Render navigation list ----
    function renderNav(filter = '') {
        const hash = window.location.hash.slice(1);
        navList.innerHTML = '';

        const filtered = POLOS.filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.id.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
            navList.innerHTML = `<li style="padding: 0.75rem 0.875rem; color: var(--text-muted); font-size: 0.85rem;">Nenhum resultado encontrado.</li>`;
            return;
        }

        filtered.forEach(polo => {
            const li = document.createElement('li');
            li.className = `nav-item ${polo.id === 'GL' ? 'nav-item-special' : ''}`;
            li.innerHTML = `
                <a href="#${polo.id}" class="nav-link ${hash === polo.id ? 'active' : ''}">
                    <span class="polo-id">${polo.id}</span>
                    <span class="polo-name">${polo.name}</span>
                </a>
            `;
            li.querySelector('a').addEventListener('click', closeDrawer);
            navList.appendChild(li);
        });
    }

    // ---- Render External Links Menu ----
    function renderExternalLinks() {
        const container = document.getElementById('external-links-list');
        container.innerHTML = '';
        
        POLOS.forEach(polo => {
            const a = document.createElement('a');
            a.href = polo.url;
            a.target = '_blank';
            a.className = 'external-item';
            a.innerHTML = `
                <span class="ext-id">${polo.id}</span>
                <span class="ext-name">${polo.name}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            `;
            container.appendChild(a);
        });
    }

    const extMenuBtn = document.getElementById('external-link');
    const extMenuContent = document.getElementById('external-menu-content');

    extMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        extMenuContent.classList.toggle('open');
        extMenuBtn.classList.toggle('active');
    });


    // ---- Load Report ----
    function loadReport() {
        const hash = window.location.hash.slice(1);
        const polo = POLOS.find(p => p.id === hash);

        renderNav(searchInput.value);

        if (!polo) {
            // No polo selected — show welcome state, hide iframe
            return;
        }

        // Update the fab label
        activePoloName.textContent = `${polo.id} — ${polo.name}`;

        // Show loading overlay
        loader.classList.remove('hidden');
        iframe.classList.remove('loaded');
        iframe.src = polo.url;

        iframe.onload = () => {
            loader.classList.add('hidden');
            iframe.classList.add('loaded');
        };
    }

    // ---- Search ----
    searchInput.addEventListener('input', (e) => {
        renderNav(e.target.value);
    });

    // ---- Listeners ----
    window.addEventListener('hashchange', loadReport);

    // ---- Init ----
    renderNav();
    renderExternalLinks();
    loadReport();

    // Open drawer initially if no polo is selected
    if (!window.location.hash) {
        openDrawer();
    }
}

document.addEventListener('DOMContentLoaded', init);
