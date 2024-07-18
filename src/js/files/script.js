// Подключение функционала "Чертогов Фрилансера"
import { isMobile, bodyLockToggle, bodyLockStatus } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

//#region Глобальный клик

document.addEventListener("click", function (e) {
   // открыть модалку каталога
   if (bodyLockStatus && e.target.closest('.js-open-sidebar-catalog')) {
      if (!document.documentElement.classList.contains('menu-open')) {
         bodyLockToggle();
      }
      document.documentElement.classList.toggle("sidebar-catalog-open");
      if (window.matchMedia("(min-width: 991.98px)").matches && !isMobile.any()) {
         document.addEventListener("mouseover", sidebarCatalogActions);
         document.removeEventListener("click", sidebarCatalogActions);
      } else {
         document.addEventListener("click", sidebarCatalogActions);
         document.removeEventListener("mouseover", sidebarCatalogActions);
      }
   }
   // закрыть модалку каталога
   if (e.target.closest('.js-sidebar-catalog-close')) {
      if (!document.documentElement.classList.contains('menu-open')) {
         bodyLockToggle();
      }
      document.documentElement.classList.remove("sidebar-catalog-open", "sidebar-sub-catalog-open");
   }
   // очистка input по клику на крестик
   if (e.target.closest('.form__clear-svg')) {
      let input = e.target.closest('.form__line').querySelector('.form__input') || e.target.closest('.form__line').querySelector('.form__txt');
      input.value = '';
      input.classList.remove('_form-focus');
      input.parentElement.classList.remove('_form-focus');
      e.target.closest('.form__clear-svg').classList.remove('_active');
      // Inputmask.remove(input);
      // input.style.height = `auto`;
   }
   // автовысота для textarea
   if (e.target.closest('textarea')) {
      txtarAutoHeight(e.target)
   }
});

//#endregion

//#region Шаринг в деталке

let shareButton = document.getElementById('share-button');
if (shareButton) {
   let thisUrl = window.location.href
   let thisTitle = document.title;
   shareButton.addEventListener('click', function () {
      // Проверка поддержки navigator.share
      if (navigator.share && isMobile.any()) {

         // navigator.share принимает объект с URL, title или text
         navigator.share({
            title: thisTitle,
            url: thisUrl
         })
            .then(function () {
               // Shareing successfull
            })
            .catch(function () {
               // Sharing failed
            })

      } else {
         flsModules.popup.open('#share-popup');
         copyUrl();
      }
   })
}
function copyUrl() {
   const copyButton = document.querySelector('.share__button');
   const copyInput = document.querySelector('.share__input');

   copyInput.value = window.location.href;
   setTimeout(() => {
      copyInput.focus();
   }, 100);

   copyButton.addEventListener("click", function (e) {
      copyInput.select();
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      copyButton.innerHTML = 'Ссылка скопированна';
      copyButton.classList.remove('btn__orange');
      copyButton.setAttribute('disabled', 'true');
   });
}

//#endregion

//#region автовысота для textarea

function txtarAutoHeight(target) {
   const el = target;
   if (el.closest('textarea')) {

      let origHeight
      if (el.dataset.height) {
         origHeight = el.dataset.height
      } else {
         origHeight = el.scrollHeight
         el.dataset.height = origHeight
      }
      origHeight = Number(origHeight)
      el.style.height = el.setAttribute('style', 'height: ' + (origHeight + 1) + 'px');
      el.addEventListener('input', e => {
         if (el.scrollHeight > origHeight) {
            el.style.height = 'auto';
            el.style.height = (el.scrollHeight) + 10 + 'px';
         } else {
            el.style.height = 'auto';
            el.style.height = origHeight + 'px';
         }
      });
   }
}

//#endregion

//#region Открыть/закрыть боковой каталог + Открытие закрытие подкатегорий в каталоге

function sidebarCatalogActions(e) {
   if (e.target.closest('[data-parent]')) {
      const targetElement = e.target.closest('[data-parent]');
      const subMenuId = targetElement.closest('[data-parent]').dataset.parent ? targetElement.closest('[data-parent]').dataset.parent : null;
      const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
      if (subMenu) {
         const activeLink = document.querySelector('._sub-menu-active');
         const activeBlock = document.querySelector('._sub-menu-open');


         if (activeLink && activeLink !== targetElement) {
            activeLink.classList.remove('_sub-menu-active');
            activeBlock.classList.remove('_sub-menu-open');
            document.documentElement.classList.remove('sidebar-sub-catalog-open');
         }
         document.documentElement.classList.add('sidebar-sub-catalog-open');
         targetElement.classList.add('_sub-menu-active');
         subMenu.classList.add('_sub-menu-open');
         e.preventDefault();
      } else {
         const activeLink = document.querySelector('._sub-menu-active');
         const activeBlock = document.querySelector('._sub-menu-open');


         if (activeLink) {
            activeLink.classList.remove('_sub-menu-active');
            activeBlock.classList.remove('_sub-menu-open');
            document.documentElement.classList.remove('sidebar-sub-catalog-open');
         }
      }
   }
   if (e.target.closest('.js-sidebar-catalog-back')) {
      document.documentElement.classList.remove('sidebar-sub-catalog-open');
      document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
      document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;
      e.preventDefault();
   }
}

//#endregion

//#region Функционал дропдаунов открыть\закрыть

document.addEventListener("click", function (e) {
   const target = e.target;
   const ddWrapper = target.closest('[data-dropdown]');
   const ddActive = document.querySelector('._dd-active');

   if (ddWrapper) {
      dropdownAction(e, ddWrapper, ddActive);
   } else if (ddActive) {
      ddActive.classList.remove('_dd-active');
   }
});

function dropdownAction(e, ddWrapper, ddActive) {
   const target = e.target;
   const ddButton = ddWrapper.querySelector('[data-dropdown-button]');

   if (target == ddButton) {
      if (ddActive && ddActive !== ddWrapper) {
         ddActive.classList.remove('_dd-active');
      }

      ddWrapper.classList.toggle('_dd-active');
      e.preventDefault();
   }
}

//#endregion

//#region Адаптивная высота строки заголовка деталки проекта

function getHeightLine() {
   const pageTitle = document.querySelector('.project-headline__title');
   const pageHeadline = document.querySelector('.project-headline');
   if (pageTitle === null) return

   let cloneTitle = pageTitle.cloneNode(true);
   cloneTitle.classList.add('project-headline__title_clone');
   cloneTitle.querySelector('span').innerHTML = 'A <br> B <br> C'
   pageTitle.after(cloneTitle);

   window.addEventListener('load', () => { compareHeightLine(pageTitle, cloneTitle, pageHeadline); });
   window.addEventListener('resize', () => {
      compareHeightLine(pageTitle, cloneTitle, pageHeadline);
   });
}
getHeightLine();

function compareHeightLine(origEl, cloneEl, parentEl) {
   if (origEl.offsetHeight > cloneEl.offsetHeight) {
      parentEl.style.height = 'auto';
   } else {
      parentEl.style.height = null;
   }
}

//#endregion

//#region Карта проектов перетаскивание

document.querySelectorAll('.projects-map__body').forEach((mapBody) => {
   mapBody.ondragstart = () => false; // Отключаем стандартное поведение drag-and-drop

   mapBody.addEventListener('pointerdown', (event) => {
      // Определяем смещение курсора относительно верхнего левого угла элемента
      const shiftX = event.clientX - mapBody.getBoundingClientRect().left;
      const shiftY = event.clientY - mapBody.getBoundingClientRect().top;

      const navHeight = document.querySelector('.projects-map__navigation').clientHeight; // Высота навигационного меню

      // Предварительные вычисления размеров окна и элемента
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const mapWidth = mapBody.clientWidth;
      const mapHeight = mapBody.clientHeight;

      // Функция перемещения элемента на координаты pageX, pageY
      const moveAt = (pageX, pageY) => {
         let newTop = pageY - shiftY; // Новое значение top для элемента
         let newLeft = pageX - shiftX; // Новое значение left для элемента

         // Ограничиваем движение по вертикали
         if (mapHeight + navHeight > windowHeight) {
            // Если высота элемента больше высоты окна
            newTop = Math.max(windowHeight - mapHeight - navHeight, Math.min(newTop, 0));
         } else {
            // Если высота элемента меньше или равна высоте окна
            newTop = Math.max(0, Math.min(newTop, windowHeight - mapHeight - navHeight));
         }

         // Ограничиваем движение по горизонтали
         if (mapWidth > windowWidth) {
            // Если ширина элемента больше ширины окна
            newLeft = Math.max(windowWidth - mapWidth, Math.min(newLeft, 0));
         } else {
            // Если ширина элемента меньше или равна ширине окна
            newLeft = Math.max(0, Math.min(newLeft, windowWidth - mapWidth));
         }

         // Устанавливаем новые координаты для элемента
         mapBody.style.top = `${newTop}px`;
         mapBody.style.left = `${newLeft}px`;
      };

      // Обработчик события перемещения указателя мыши
      const onPointerMove = (event) => {
         moveAt(event.clientX, event.clientY); // Перемещаем элемент при движении указателя мыши
      };

      // Добавляем обработчик события перемещения указателя мыши
      document.addEventListener('pointermove', onPointerMove);

      // Обработчик события отпускания кнопки мыши
      document.onpointerup = () => {
         // Удаляем обработчик события перемещения указателя мыши
         document.removeEventListener('pointermove', onPointerMove);
         document.onpointerup = null; // Убираем обработчик события отпускания кнопки мыши
      };
   });
});

//#endregion