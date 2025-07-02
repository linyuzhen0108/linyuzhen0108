const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
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

let currentIndex = 0;
const total = images.length;


function updateSlide() {
    const firstImage = images[0];

    if (firstImage.complete) {
        const slideWidth = firstImage.clientWidth;
        slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    } else {
        // 等圖片加載完再執行
        firstImage.addEventListener('load', () => {
            const slideWidth = firstImage.clientWidth;
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        });
    }
}


prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? total - 1 : currentIndex - 1;
    updateSlide();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === total - 1) ? 0 : currentIndex + 1;
    updateSlide();
});

// 自動輪播
setInterval(() => {
    nextBtn.click();
}, 5000);

// 當視窗大小改變，重新更新 transform 位置
window.addEventListener('resize', updateSlide);

// 初始更新位置（避免第一次沒套 transform）
window.addEventListener('load', updateSlide);
