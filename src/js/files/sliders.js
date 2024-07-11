/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, EffectFade } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.mp-fb-main-slider')) { // Указываем скласс нужного слайдера
		let bgSlider = new Swiper('.mp-fb-bg-slider', {
			modules: [EffectFade],
			el: '.mp-fb-bg-slider',
			loop: true,
			// speed: 800,
			// effect: 'fade',
			// crossFade: true,
		});
		// Создаем слайдер
		new Swiper('.mp-fb-main-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, EffectFade],
			slidesPerView: 1,
			spaceBetween: 0,
			loop: true,
			// speed: 300,
			// effect: 'fade',
			// crossFade: true,

			// thumbs: {
			// 	swiper: {
			// 		modules: [EffectFade],
			// 		el: '.mp-fb-bg-slider',
			// 		// speed: 800,
			// 		loop: true,
			// 		// effect: 'fade',
			// 		// crossFade: true,
			// 	}
			// },
			// observer: true,
			// observeParents: true,
			// autoHeight: true,
			// loopAdditionalSlides: 1,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.mp-fb-slider-nav .swiper-button-prev',
				nextEl: '.mp-fb-slider-nav .swiper-button-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					autoHeight: true,
				},
				1199.98: {
					autoHeight: false,
				},
			},

			// События
			on: {
				slideNextTransitionStart: function (swiper) {
					bgSlider.slideNext();
				},

				slidePrevTransitionStart: function () {
					bgSlider.slidePrev();
				},
				breakpoint: function (swiper, breakpointParams) {
					if (!breakpointParams?.autoHeight) {
						swiper.el.querySelector('.mp-fb-main-slider__wrapper').style.height = null;
					}
				},
			}
		});
	}
	if (document.querySelector('.projects-block__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		window.lpSLider = new Swiper('.projects-block__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			// observer: true,
			// observeParents: true,
			slidesPerView: 4,
			spaceBetween: 2,
			// autoHeight: true,
			// speed: 800,
			loop: true,
			loopAdditionalSlides: 2,
			watchSlidesProgress: true,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.projects-block__nav .swiper-button-prev',
				nextEl: '.projects-block__nav .swiper-button-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				576.98: {
					slidesPerView: 2,
				},
				1199.98: {
					slidesPerView: 3,
				},
				1399.98: {
					slidesPerView: 4,
				},
			},

			// События
			on: {
				afterInit: function (swiper) { setTimeout(() => { swiper.update(); }, 1000) },
			}
		});
	}
	if (document.querySelector('.news-block__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.news-block__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 1,
			// autoHeight: true,
			// speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.news-block-headline__slider-nav .swiper-button-prev',
				nextEl: '.news-block-headline__slider-nav .swiper-button-next',
			},

			// Брейкпоинты

			breakpoints: {
				320: {
					slidesPerView: 1,
				},
				991.98: {
					slidesPerView: 2,
				},
				1699.98: {
					slidesPerView: 3,
				},
			},

			// События
			on: {

			}
		});
	}
	if (document.querySelector('.sw')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.sw', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {

			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});