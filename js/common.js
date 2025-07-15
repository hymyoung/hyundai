(function(){
    class slideBuilder {
        // 생성자 함수
        constructor(swiper) {
            this.swiper = document.querySelectorAll(swiper);
        }

        init() {
            this.slideBuild();
        }
       
        // 메서드 정의
        slideBuild() {
            this.swiper.forEach(el => {
                const swiper = new Swiper(el, {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    observer: true,
                    observeParents: true,
                    loop: false,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                     breakpoints: {
                        // 모바일: 1023px 이하
                        0: {
                            slidesPerView: 2.6,
                            spaceBetween: 16,
                        },
                        // PC: 1024px 이상
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        }
                    }
                });
            })
        }
    }

    // 클래스 인스턴스 생성
    const SlideBuilder = new slideBuilder('.swiper');
    SlideBuilder.init();

})();