(function () {
  class slideBuilder {
    // 생성자 함수
    constructor(swiper) {
      this.productSwiper = document.querySelectorAll(".product__list.swiper");
      this.brandSwiper = document.querySelectorAll(".brand__swiper");
      this.eventSwiper = document.querySelectorAll(".event__swiper");
      this.brandSwiperInstances = [];
    }

    init() {
      this.productSwiperBuild();
      this.brandSwiperBuild();
      this.eventSwiperBuild();
      window.addEventListener("load", () => this.initBrandSwiper());
      window.addEventListener("resize", () => this.initBrandSwiper());
    }

    // 메서드 정의
    productSwiperBuild() {
      this.productSwiper.forEach((el) => {
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
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
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
            },
          },
        });
      });
    }

    brandSwiperBuild() {
      this.brandSwiper.forEach((el) => {
        const swiper = new Swiper(el.querySelector(".swiper"), {
          slidesPerView: 1,
          slidesPerGroup: 1,
          observer: true,
          resizeObserver: true,
          observeParents: true,
          spaceBetween: 0,
          loop: false,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },

          navigation: {
            nextEl: el.querySelector(".swiper-button-next"),
            prevEl: el.querySelector(".swiper-button-prev"),
          },
          pagination: {
            el: el.querySelector(".swiper-pagination"),
            type: "bullets",
            clickable: true,
          },
        });

        this.brandSwiperInstances.push(swiper);
      });
    }

    eventSwiperBuild() {
      this.eventSwiper.forEach((el) => {
        const swiper = new Swiper(el.querySelector(".swiper"), {
          slidesPerView: 1,
          slidesPerGroup: 1,
          observer: true,
          resizeObserver: true,
          observeParents: true,
          spaceBetween: 0,
          loop: false,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },

          pagination: {
            el: el.querySelector(".swiper-pagination"),
            type: "bullets",
            clickable: true,
          },
        });
      });
    }

    destroyBrandSwiper() {
      this.brandSwiperInstances.forEach((instance) => {
        instance.destroy(true, true);
      });
      this.brandSwiperInstances = [];
    }

    initBrandSwiper() {
      const isMobile = window.innerWidth <= 767;

      if (isMobile) {
        this.destroyBrandSwiper();
      } else {
        // 이미 존재하면 중복 생성하지 않음
        if (this.brandSwiperInstances.length === 0) {
          this.brandSwiperBuild();
        }
      }
    }
  }

  class tabObserver {
    // 생성자 함수
    constructor() {
      this.tabs = document.querySelectorAll(".event__tab-button button");
      this.tabpanels = document.querySelectorAll(".tabpanel");
      this.stickyOffset =
        document.querySelector(".event__tab-button")?.offsetHeight || 0;
    }

    init() {
      if (this.tabpanels.length > 0) {
        const firstId = this.tabpanels[0].getAttribute("aria-labelledby");
        this.activateTab(firstId);
      }
      this.bindScrollEvent();
    }

    activateTab(id) {
      this.tabs.forEach((tab) => {
        tab
          .closest("li")
          .classList.toggle(
            "event__tab-button--active",
            tab.getAttribute("id") === id
          );
      });
    }

    bindScrollEvent() {
      window.addEventListener("scroll", () => {
        this.tabpanels.forEach((tabpanel) => {
          const top = tabpanel.getBoundingClientRect().top;

          // 상단에 딱 붙었을 때만 실행 (오차 1px 허용)
          if (top - this.stickyOffset <= 1) {
            const currentId = tabpanel.getAttribute("aria-labelledby");
            this.activateTab(currentId);
          }
        });
      });
    }
  }

  class morePromotion {
    // 생성자 함수
    constructor() {
      this.location = document.querySelector(".location");
      this.selectBoxBtn = document.querySelector(".location__new strong");
      this.popupOpenBtn = document.querySelector(".btn_more");
      this.layer = document.querySelector(".layer-dim");
      this.closeBtn = document.querySelector(
        ".box-bottom-float .btn-close-layer button"
      );
    }

    init() {
      this.bindEvent();
    }

    // 메서드 정의
    bindEvent() {
      this.selectBoxBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.selectboxControll();
      });
      this.popupOpenBtn.addEventListener("click", () => {
        this.openPopup();
      });
      this.closeBtn.addEventListener("click", () => {
        this.closePopup();
      });
      document.addEventListener("click", (e) => {
        if (
          this.selectBoxBtn.classList.contains("is-open") &&
          !this.location.contains(e.target)
        ) {
          this.selectBoxBtn.classList.remove("is-open");
          $(".location__new div.box_list").slideUp();
        }
      });
    }

    selectboxControll() {
      if (!this.selectBoxBtn.classList.contains("is-open")) {
        this.selectBoxBtn.classList.add("is-open");
        $(".location__new div.box_list").slideDown();
      } else {
        this.selectBoxBtn.classList.remove("is-open");
        $(".location__new div.box_list").slideUp();
      }
    }

    openPopup() {
      if (!this.layer.classList.contains("is-show")) {
        this.layer.classList.add("is-show");
        setTimeout(() => {
          this.layer.querySelector(".box-bottom-float").classList.add("is-up");
        }, 10);
      } else {
        this.layer.classList.remove("is-show");
      }
    }

    closePopup() {
      if (this.layer.classList.contains("is-show")) {
        this.layer.classList.remove("is-show");
        this.layer.querySelector(".box-bottom-float").classList.remove("is-up");
      }
    }
  }

  class productSet {
    // 생성자 함수
    constructor(el) {
      this.el = el;
      this.setSwiper = this.el.querySelector(".swiper");
      this.image = this.el.querySelectorAll(".product-set-image");
      this.smallImageWrap = this.el.querySelector(".product-set__small-img");
    }

    init() {
      this.setSwiperBuild();
      this.setsmallImage();
    }

    setsmallImage() {
      const smallItems = this.image;
      let mergedHTML = "";

      smallItems.forEach((item) => {
        mergedHTML += item.outerHTML;
      });
      this.smallImageWrap.innerHTML = mergedHTML;
      console.log(mergedHTML, this.smallImageWrap);
    }

    setSwiperBuild() {
      const swiper = new Swiper(this.setSwiper, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        observer: true,
        resizeObserver: true,
        observeParents: true,
        spaceBetween: 0,
        loop: false,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },

        pagination: {
          el: this.setSwiper.querySelector(".swiper-pagination"),
          type: "bullets",
          clickable: true,
        },
      });
    }
  }

  // 클래스 인스턴스 생성
  const SlideBuilder = new slideBuilder();
  const TabObserver = new tabObserver();
  const MorePromotion = new morePromotion();
  document.querySelectorAll(".product-set").forEach((el) => {
    const ProductSet = new productSet(el);
    ProductSet.init();
  });

  SlideBuilder.init();
  TabObserver.init();
  MorePromotion.init();
})();
