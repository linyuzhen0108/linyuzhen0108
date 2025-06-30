const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // 如果是關閉狀態，就清除所有展開的子選單
    if (!navMenu.classList.contains('active')) {
        document.querySelectorAll('.nav-item.dropdown').forEach(item => {
            item.classList.remove('open');
        });
    }
});

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // 阻止跳轉連結

            const currentItem = toggle.parentElement;

            const isOpen = currentItem.classList.contains('open');

            // 先關掉全部
            document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                item.classList.remove('open');
            });

            // 如果剛剛沒開，就開它
            if (!isOpen) {
                currentItem.classList.add('open');
            }
        }
    });
});