/****************************
 * GLOBAL HELPERS & ONLOAD
 ****************************/
document.addEventListener("DOMContentLoaded", () => {
  // 1) Chatbot always start minimized
  const chatBox = document.getElementById("chatbot-box");
  const chatBtn = document.getElementById("chatbot-button");
  if (chatBox && chatBtn) {
    chatBox.style.display = "none";
    chatBtn.style.display = "block";
  }

  // 2) Quotes carousel safe init
  initQuotesCarousel();

  // 3) Live modal auto-open (if present)
  const liveModal = document.getElementById("liveModal");
  if (liveModal) {
    liveModal.style.display = "flex";
  }

  // 4) Lost & Found file upload limit (max 5)
  const lfFileInputs = document.querySelectorAll('input[type="file"][multiple], .lf-max-5');
  lfFileInputs.forEach(inp => {
    inp.addEventListener("change", (e) => {
      if (inp.files && inp.files.length > 5) {
        alert("⚠️ आप अधिकतम 5 फोटो ही अपलोड कर सकते हैं।");
        inp.value = "";
      }
    });
  });

  // 5) Prevent dummy anchors with href="#"
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener("click", (e) => e.preventDefault());
  });
});

/****************************
 * HEADER / MENU / NOTIFS
 ****************************/
function toggleNotif() {
  const n = document.getElementById("notif-box");
  if (!n) return;
  n.style.display = (n.style.display === "block") ? "none" : "block";
}

function toggleMenu() {
  const m = document.getElementById("menu");
  if (!m) return;
  m.classList.toggle("showing");
}

/****************************
 * CHATBOT
 ****************************/
function toggleChat() {
  const box = document.getElementById("chatbot-box");
  const btn = document.getElementById("chatbot-button");
  if (!box || !btn) return;

  const isOpen = (box.style.display === "flex" || box.style.display === "block");
  if (isOpen) {
    box.style.display = "none";   // close box
    btn.style.display = "block";  // show floating button
  } else {
    box.style.display = "flex";   // open box
    btn.style.display = "none";   // hide floating button
  }
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const body  = document.getElementById("chat-body");
  if (!input || !body) return;

  const msg = (input.value || "").trim();
  if (!msg) return;

  body.innerHTML += `<div class="user">${escapeHTML(msg)}</div>`;
  setTimeout(() => {
    body.innerHTML += `<div class="bot">✅ यह डेमो उत्तर है।</div>`;
    body.scrollTop = body.scrollHeight;
  }, 400);

  input.value = "";
}

function escapeHTML(str) {
  const p = document.createElement("p");
  p.innerText = str;
  return p.innerHTML;
}

/****************************
 * QUOTES CAROUSEL + SWIPE
 ****************************/
let currentSlide = 0;
let quotesSlides = [];

function initQuotesCarousel() {
  quotesSlides = Array.from(document.querySelectorAll(".quote-slide"));
  if (!quotesSlides.length) return;

  const carousel = document.getElementById("quote-carousel");
  const showSlide = (index) => {
    quotesSlides.forEach((s, i) => s.classList.toggle("active", i === index));
  };
  showSlide(currentSlide);

  // Auto-rotate
  setInterval(() => {
    currentSlide = (currentSlide + 1) % quotesSlides.length;
    showSlide(currentSlide);
  }, 7000);

  // Swipe support (mobile)
  if (carousel) {
    let startX = 0;
    carousel.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; });
    carousel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) { // left
        currentSlide = (currentSlide + 1) % quotesSlides.length;
        showSlide(currentSlide);
      } else if (endX - startX > 50) { // right
        currentSlide = (currentSlide - 1 + quotesSlides.length) % quotesSlides.length;
        showSlide(currentSlide);
      }
    });
  }
}

/****************************
 * GENERIC MODAL HELPERS
 ****************************/
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = "flex";
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.style.display = "none";
}

/****************************
 * LIVE PAGES - CLOSE BTN (if any)
 ****************************/
function closeLiveModal() {
  const liveModal = document.getElementById("liveModal");
  if (liveModal) liveModal.style.display = "none";
}

/****************************
 * LOST & FOUND – STEPPER
 ****************************/
// Generic step switcher (expects #step1, #step2 ... with .form-step classes)
function nextStep(stepNo) {
  const steps = document.querySelectorAll(".form-step");
  steps.forEach(s => s.classList.remove("active"));
  const target = document.getElementById("step" + stepNo);
  if (target) target.classList.add("active");

  // Special case: show item vs person block on step 3
  if (stepNo === 3) {
    const mainType = (document.querySelector('input[name="mainType"]:checked') || {}).value;
    const itemBlock = document.getElementById("itemCategory");
    const personBlock = document.getElementById("personCategory");
    if (itemBlock)  itemBlock.style.display  = (mainType === "item")   ? "block" : "none";
    if (personBlock) personBlock.style.display = (mainType === "person") ? "block" : "none";
  }
}

function showOtherInput(sel) {
  const other = document.getElementById("otherInput");
  if (!other) return;
  other.style.display = (sel && sel.value === "other") ? "block" : "none";
}

/****************************
 * BOOKING CONFIRM SHORTHANDS
 ****************************/
function confirmBooking() {
  alert("✅ आपकी बुकिंग सफल रही (डमी API)");
}
function confirmHotel() {
  alert("✅ होटल बुकिंग सफल (डमी API)");
  closeModal("hotelModal");
}
function confirmBus() {
  alert("✅ बस टिकट बुकिंग सफल (डमी API)");
  closeModal("busModal");
}
function confirmRide() {
  alert("✅ राइड बुकिंग सफल (डमी API)");
  closeModal("rideModal");
}
function confirmFood(item) {
  alert("✅ " + (item || "फूड") + " बुकिंग सफल (डमी API)");
}

/****************************
 * SMALL UTILITIES
 ****************************/
// Close modal when clicking outside content (for any .modal)
document.addEventListener("click", (e) => {
  const modal = e.target.closest(".modal");
  if (!modal && e.target.classList && e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

/****************************
 * CROWD TABS SWITCH
 ****************************/
function showCrowdTab(id) {
  const tabs = document.querySelectorAll(".crowd-tab");
  tabs.forEach(t => t.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  // When map tab is shown, ensure the map renders correctly
  if (id === "mapTab" && window.heatmapInstance) {
    setTimeout(() => { window.heatmapInstance.invalidateSize(); }, 150);
  }
  // When graph tab is shown, ensure graph is drawn
  if (id === "graphTab" && window.renderCrowdLineChart) {
    // Give it a moment to become visible
    setTimeout(() => {
        window.renderCrowdLineChart(window.chartData, window.currentSelectedLocation || Object.keys(window.LOC)[0]);
    }, 150);
  }
}



/*
document.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.getElementById("heatmap");
  if (!mapEl) return;

  const map = L.map("heatmap").setView([23.1765, 75.7885], 13);
  window.heatmapInstance = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(map);

  // Create the heat layer and marker group (these will be populated by heatmap-lite.js)
  window.heatLayer = L.heatLayer([], { radius: 35, blur: 20, maxZoom: 17 }).addTo(map);
  window.markerGroup = L.layerGroup().addTo(map);

  // Add the legend
  const legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    const div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>भीड़ स्तर</h4>";
    div.innerHTML += '<i style="background:yellow"></i><span>कम</span><br>';
    div.innerHTML += '<i style="background:orange"></i><span>मध्यम</span><br>';
    div.innerHTML += '<i style="background:red"></i><span>अधिक</span><br>';
    return div;
  };
  legend.addTo(map);

  // The heatmap-lite.js script is designed to run automatically and populate these layers.
  // So, no need for additional code here.
});

function showCrowdTab(id) {
    const tabs=document.querySelectorAll(".crowd-tab");
    tabs.forEach(t=>t.classList.remove("active"));
    const target=document.getElementById(id);
    if (target) target.classList.add("active");

    if (id==="map" && window.heatmapInstance) {
      setTimeout(()=>{ window.heatmapInstance.invalidateSize(); },200);
    }
}

*/