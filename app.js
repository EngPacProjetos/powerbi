const POLOS = [
    {
        id: 'RN',
        name: 'Rio Grande do Norte',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiYjI3YjU0MTMtNWZhNC00OTNlLTlhOTctYjk3MmM0ZjU2YzQwIiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'PB',
        name: 'Paraíba',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiNWI0N2ViNDAtYjYxYi00ODI5LWIwOTctMDc4ODBjMDk5ZTJmIiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'PR',
        name: 'Paraná',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiNWI1YTY1ZmYtNWYxYi00MmUwLWIxN2YtNDdiZWQzOWE0ZWM3IiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'RS',
        name: 'Rio Grande do Sul',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiNzlhYjlmOTEtN2EyZi00NjcwLWFhOWItN2M4MGM3OTdhMjQ4IiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
    },
    {
        id: 'PE',
        name: 'Pernambuco',
        url: 'https://app.powerbi.com/view?r=eyJrIjoiZGU4NzUyODYtY2NhMi00MGZmLWIwMTItM2U0MDYyNzYwMDJmIiwidCI6IjIzMzBlMWVlLTAwYWMtNGVlZi1iNzkzLWU3YzFhMmE0NmU3ZSJ9'
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
            li.className = 'nav-item';
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
    loadReport();

    // Open drawer initially if no polo is selected
    if (!window.location.hash) {
        openDrawer();
    }
}

document.addEventListener('DOMContentLoaded', init);
