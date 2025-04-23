const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".gallery-thumbnails img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const images = Array.from(thumbnails).map((img) => img.src);

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    thumbnails.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.src = thumb.src;
    currentIndex = index;
  });
});

mainImage.addEventListener("click", () => {
  lightbox.style.display = "flex";
  lightboxImg.src = images[currentIndex];
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex];
  transitionLeft(currentIndex)
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex];
  transitionRight(currentIndex)
}

window.addEventListener("load", syncThumbnailHeight);
window.addEventListener("resize", syncThumbnailHeight);

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Swipe support
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  if (swipeDistance > threshold) {
    showPrev();
  } else if (swipeDistance < -threshold) {
    showNext();
  }
}

// Transition support
function transitionRight(index) {
  lightboxImg.classList.add("slide-in-right");
  setTimeout(() => {
    requestAnimationFrame(() => {
      lightboxImg.classList.remove("slide-in-right");
    });
  }, 100);
}

function transitionLeft(index) {
  lightboxImg.classList.add("slide-in-left");
  setTimeout(() => {
    requestAnimationFrame(() => {
      lightboxImg.classList.remove("slide-in-left");
    });
  }, 100);
}

// Styling
function syncThumbnailHeight() {
  const mainImage = document.querySelector('.gallery-main-image');
  const thumbnails = document.querySelector('.gallery-thumbnails');

  if (mainImage && thumbnails) {
    const styles = window.getComputedStyle(thumbnails);
    const flexDirection = styles.getPropertyValue('flex-direction');

    if (flexDirection === "column") {
      const imageHeight = mainImage.clientHeight;
      thumbnails.style.height = imageHeight + "px";
    } else {
      thumbnails.style.height = "";
    }
  }
}

