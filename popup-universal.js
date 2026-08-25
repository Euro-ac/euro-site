/**
 * ⚡️ SUPER-ANALYTIC UNIVERSAL LOFT PLUGIN 2026
 * Единая точка управления для всех страниц сайта
 */
document.addEventListener('DOMContentLoaded', function () {
    const leadForm = document.getElementById('crmForm');
    const glassBody = document.querySelector('.popup-body-glass');

    // 1. АВТОМАТИЧЕСКАЯ ГЕНЕРАЦИЯ ОВЕРЛЕЯ ТОНИРОВАНИЯ
    if (glassBody && !document.getElementById('popupSuccessBlock')) {
        const successOverlay = document.createElement('div');
        successOverlay.className = 'popup-success-overlay';
        successOverlay.id = 'popupSuccessBlock';
        successOverlay.innerHTML = `
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#e5c07b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div class="popup-success-text">Заявка отправлена,<br><span style="font-size: 16px; font-weight: 400; color: #a0a0a0;">ожидайте звонка</span></div>
        `;
        glassBody.insertBefore(successOverlay, glassBody.firstChild);
    }

    // 2. ЖЕСТКАЯ ФИКСАЦИЯ МАСКИ +7 ДЛЯ ИНПУТА ТЕЛЕФОНА
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('focus', function () {
            if (!phoneInput.value) phoneInput.value = '+7 (';
        });

        phoneInput.addEventListener('input', function () {
            let matrix = '+7 (___) ___-__-__', i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
            if (def.length >= val.length) val = def;
            this.value = matrix.replace(/./g, function (a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
        });

        phoneInput.addEventListener('keydown', function (e) {
            if (this.value.length <= 4 && (e.key === 'Backspace' || e.key === 'Delete')) {
                e.preventDefault();
            }
        });
    }

    // 3. АСИНХРОННАЯ ОТПРАВКА В CRM С ТОНИРОВАНИЕМ
    if (leadForm) {
        leadForm.addEventListener('submit', function (e) {
            e.preventDefault(); 

            const submitBtn = document.getElementById('submitBtn') || leadForm.querySelector('button[type="submit"]');
            const successBlock = document.getElementById('popupSuccessBlock');
            const originalBtnText = submitBtn ? submitBtn.innerText : 'Подтвердить запись';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Отправка...';
                submitBtn.style.backgroundColor = '#847562';
            }

            const formData = new FormData(leadForm);
            // Берем значение телефона и вычищаем из него все символы кроме цифр
const cleanPhone = formData.get('phone') ? formData.get('phone').replace(/\D/g, '') : '';
formData.set('phone', cleanPhone); // Перезаписываем на чистые цифры (например: 79511670044)
            formData.append('page_url', window.location.pathname);

            const formAction = leadForm.getAttribute('action');

            fetch(formAction, {
                method: 'POST',
                body: formData
            })
            .then(() => {
                if (typeof ym === 'function') { ym(111897765, 'reachGoal', 'lead_success'); }
                
                if (successBlock) successBlock.classList.add('is-active');

                // Очищаем поля формы через 1 секунду
                setTimeout(() => {
                    leadForm.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerText = originalBtnText;
                        submitBtn.style.backgroundColor = '';
                    }
                }, 1000);

                // АВТОМАТИЧЕСКОЕ ИСЧЕЗНОВЕНИЕ ФОРМЫ (Закрытие попапа через 4 секунды)
                setTimeout(() => {
                    window.location.hash = 'close'; // Имитируем клик на закрытие
                    if (successBlock) successBlock.classList.remove('is-active'); // Сбрасываем тонирование
                }, 4000);
            })
            .catch(error => {
                console.error('Ошибка отправки в CRM:', error);
                if (successBlock) successBlock.classList.add('is-active');
            });
        });
    }

    // 4. СУПЕР-УПРАВЛЕНИЕ СКРОЛЛОМ И СБРОС ТОНИРОВАНИЯ
    function clearOverlay() {
        const successBlock = document.getElementById('popupSuccessBlock');
        if (successBlock) successBlock.classList.remove('is-active');
        
        // Размораживаем скролл страницы при закрытии попапа
        document.body.classList.remove('popup-opened');
    }

    // Следим за открытием попапа через хэш, чтобы заблокировать скролл фона
    window.addEventListener('hashchange', function(e) {
        if (window.location.hash.includes('zapis')) {
            // Замораживаем скролл, чтобы страница не прилипала и не дергалась
            document.body.classList.add('popup-opened');
        }
        
        if (window.location.hash === '#close' || window.location.hash === '') {
            // ПРЕДОТВРАЩАЕМ ОТКИДЫВАНИЕ ВВЕРХ: Заменяем резкий прыжок на мягкий сброс хэша
            e.preventDefault();
            clearOverlay();
            // Мягко очищаем адресную строку без перемещения экрана вверх
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    });

    // Контроль клика по крестику закрытия
    const closeBtn = document.querySelector('.close-popup') || document.querySelector('.popup-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearOverlay();
            // Закрываем окно без изменения хэша и прыжков экрана
            history.pushState("", document.title, window.location.pathname + window.location.search);
            window.location.hash = 'close';
        });
    }
});

// ==========================================
// УНИВЕРСАЛЬНЫЙ ПЛАВНЫЙ СКРОЛЛ PORSCHE-LOFT ДЛЯ ВСЕХ СТРАНИЦ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Обработка кликов по меню и стрелке "Наверх"
    document.querySelectorAll('.nav-menu a, .loft-scroll-top-btn').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Если кликнули на стрелку Наверх (href="#") или чистый якорь текущей страницы
            if (href === '#' || (href.startsWith('#') && document.querySelector(href))) {
                e.preventDefault();
                const target = href === '#' ? document.body : document.querySelector(href);
                smartScroll(target);
            } 
            // Если мы на внутренней странице и кликаем на ссылку возврата (например, ../index.html#about)
            else if (href.includes('#') && href.includes('index.html')) {
                const targetId = href.split('#')[1];
                // Если этот блок вдруг есть на текущей странице — плавно скроллим к нему
                if (document.getElementById(targetId)) {
                    e.preventDefault();
                    smartScroll(document.getElementById(targetId));
                }
            }
        });
    });

    // 2. Функция умной плавной анимации скролла (Cubic Ease-Out)
    function smartScroll(targetElement) {
        if (!targetElement) return;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // -80px отступ под шапку
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2 секунды вальяжного премиального хода
        let startTime = null;

        function easeOutCubic(t, b, c, d) {
            t /= d; t--; return c * (t * t * t + 1) + b;
        }

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Автозакрытие мобильного меню при клике
        const burgerToggle = document.getElementById('menu-toggle');
        if (burgerToggle && burgerToggle.checked) {
            burgerToggle.checked = false;
        }

        requestAnimationFrame(animation);
    }
});