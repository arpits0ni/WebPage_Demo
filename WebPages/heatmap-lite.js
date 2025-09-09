// heatmap-lite.js
(function(){
  if (window.__heatmap_lite_loaded) return;
  window.__heatmap_lite_loaded = true;

  const LOC = {
    mahakal:    { name: "महाकाल मंदिर", lat: 23.1816, lng: 75.7667 },
    ramghat:    { name: "रामघाट",       lat: 23.1843, lng: 75.7686 },
    mangalnath: { name: "मंगलनाथ",     lat: 23.2030, lng: 75.7725 },
    kalbhairav: { name: "काल भैरव",     lat: 23.1903, lng: 75.7568 }
  };
  window.LOC = LOC;

  const dataset = [{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T00:00:00.000Z","count":15800},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T02:00:00.000Z","count":24200},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T04:00:00.000Z","count":98000},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T06:00:00.000Z","count":104000},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T08:00:00.000Z","count":94000},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T10:00:00.000Z","count":35200},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T12:00:00.000Z","count":34400},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T14:00:00.000Z","count":28800},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T16:00:00.000Z","count":82400},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T18:00:00.000Z","count":90400},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T20:00:00.000Z","count":85600},{"locId":"mahakal","name":"महाकाल मंदिर","lat":23.1816,"lng":75.7667,"timestamp":"2025-09-08T22:00:00.000Z","count":18800},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T00:00:00.000Z","count":10625},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T02:00:00.000Z","count":14375},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T04:00:00.000Z","count":61250},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T06:00:00.000Z","count":65000},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T08:00:00.000Z","count":58750},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T10:00:00.000Z","count":22000},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T12:00:00.000Z","count":21500},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T14:00:00.000Z","count":18000},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T16:00:00.000Z","count":51500},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T18:00:00.000Z","count":56500},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T20:00:00.000Z","count":53500},{"locId":"ramghat","name":"रामघाट","lat":23.1843,"lng":75.7686,"timestamp":"2025-09-08T22:00:00.000Z","count":11750},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T00:00:00.000Z","count":5100},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T02:00:00.000Z","count":8850},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T04:00:00.000Z","count":36750},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T06:00:00.000Z","count":39000},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T08:00:00.000Z","count":35250},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T10:00:00.000Z","count":13200},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T12:00:00.000Z","count":12900},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T14:00:00.000Z","count":10800},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T16:00:00.000Z","count":30900},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T18:00:00.000Z","count":33900},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T20:00:00.000Z","count":32100},{"locId":"mangalnath","name":"मंगलनाथ","lat":23.203,"lng":75.7725,"timestamp":"2025-09-08T22:00:00.000Z","count":7050},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T00:00:00.000Z","count":4600},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T02:00:00.000Z","count":5900},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T04:00:00.000Z","count":24500},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T06:00:00.000Z","count":26000},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T08:00:00.000Z","count":23500},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T10:00:00.000Z","count":8800},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T12:00:00.000Z","count":8600},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T14:00:00.000Z","count":7200},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T16:00:00.000Z","count":20600},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T18:00:00.000Z","count":22600},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T20:00:00.000Z","count":21400},{"locId":"kalbhairav","name":"काल भैरव","lat":23.1903,"lng":75.7568,"timestamp":"2025-09-08T22:00:00.000Z","count":4700}];
  window.chartData = dataset;

  let currentIndex = 0;
  let animationTimer = null;
  const timestamps = Array.from(new Set(dataset.map(d => d.timestamp))).sort();

  // This function renders data to the UI (table, labels, and map if it exists)
  function renderIndex(index) {
    currentIndex = index;
    const ts = timestamps[index];
    const formattedTime = new Date(ts).toLocaleString('hi-IN', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    // Update labels and slider
    document.getElementById('currentTimeLabel').innerText = formattedTime;
    document.getElementById('countTabTimeLabel').innerText = formattedTime;
    document.getElementById('timeSlider').value = index;

    // Update count table
    const currentPoints = dataset.filter(d => d.timestamp === ts);
    const countTable = document.getElementById('crowdTable');
    Array.from(countTable.tBodies[0].rows).forEach(r => {
      const locId = r.getAttribute('data-loc-id');
      const rec = currentPoints.find(d => d.locId === locId);
      const cell = r.querySelector('.count');
      if (cell) cell.innerText = rec ? rec.count.toLocaleString('en-IN') : '0';
    });

    // Update the heatmap IF the map has been initialized
    if (window.heatLayer) {
      const counts = currentPoints.map(p => p.count);
      const maxCount = Math.max(1, ...counts);
      const heatPoints = currentPoints.map(d => [d.lat, d.lng, d.count / maxCount]);
      window.heatLayer.setLatLngs(heatPoints);
    }
  }

  function initMap() {
    const el = document.getElementById('heatmap');
    if (!el) { return; }

    const map = L.map(el).setView([23.189, 75.767], 14);
    window.heatmapInstance = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(map);

    const heat = L.heatLayer([], {
      radius: 150, blur: 100, maxZoom: 16, max: 1.0,
      gradient: { 0.2: '#00FFFF', 0.4: '#00FF00', 0.7: '#FFFF00', 1.0: '#FF0000' }
    }).addTo(map);
    window.heatLayer = heat;

    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      const div = L.DomUtil.create("div", "legend legend-snapchat");
      div.innerHTML = `<h4>सक्रियता स्तर</h4>
        <div><i style="background:#FF0000"></i><span> अत्यधिक सक्रिय</span></div>
        <div><i style="background:#FFFF00"></i><span> उच्च सक्रिय</span></div>
        <div><i style="background:#00FF00"></i><span> मध्यम सक्रिय</span></div>
        <div><i style="background:#00FFFF"></i><span> कुछ गतिविधि</span></div>`;
      return div;
    };
    legend.addTo(map);

    map.on('zoomend', function() {
      const zoom = map.getZoom();
      let r = 25, b = 20; // Default for zoomed in
      if (zoom <= 14) { r = 150; b = 100; }
      else if (zoom === 15) { r = 80; b = 60; }
      else if (zoom === 16) { r = 40; b = 30; }
      heat.setOptions({ radius: r, blur: b });
    });
    
    // Render the current data onto the newly created map
    renderIndex(currentIndex);
  }

  // This function sets up all the buttons and controls
  function initDataAndControls() {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const timeSlider = document.getElementById('timeSlider');
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    if (timeSlider) timeSlider.max = timestamps.length - 1;

  const locationSelect = document.getElementById('locationSelect');
  if (locationSelect) {
    for (const locId in LOC) {
        const option = document.createElement('option');
        option.value = locId;
        option.innerText = LOC[locId].name;
        locationSelect.appendChild(option);
    }
    locationSelect.addEventListener('change', window.renderCrowdLineChart);
  }

    function stopAnimation() {
      if (animationTimer) { clearInterval(animationTimer); animationTimer = null; }
      if (playPauseBtn) playPauseBtn.innerText = '▶';
    }
    function startAnimation() {
      stopAnimation();
      if (playPauseBtn) playPauseBtn.innerText = '⏸';
      animationTimer = setInterval(() => {
        let nextIndex = (currentIndex + 1) % timestamps.length;
        renderIndex(nextIndex);
      }, 1200);
    }
    
    if (playPauseBtn) { playPauseBtn.addEventListener('click', () => { if (animationTimer) stopAnimation(); else startAnimation(); }); }
    if (timeSlider) { timeSlider.addEventListener('input', (e) => { stopAnimation(); renderIndex(parseInt(e.target.value, 10)); }); }
    if (prevBtn) { prevBtn.addEventListener('click', () => { stopAnimation(); renderIndex((currentIndex - 1 + timestamps.length) % timestamps.length); }); }
    if (nextBtn) { nextBtn.addEventListener('click', () => { stopAnimation(); renderIndex((currentIndex + 1) % timestamps.length); }); }

    // Initial render for the count tab ON PAGE LOAD
    renderIndex(0);
  }


  function onMaybeInit() {
    const hm = document.getElementById('heatmap');
    // If the heatmap container is visible AND the map hasn't been initialized yet...
    if (hm && hm.offsetParent !== null && !window.heatmapInstance) {
      initMap();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // This runs right away, loading data and populating the count tab.
    initDataAndControls();
    
    // This sets up listeners that will create the map only when the map tab is clicked.
    document.querySelectorAll('.tab-buttons button').forEach(button => {
      button.addEventListener('click', () => setTimeout(onMaybeInit, 50));
    });
  });

  // Graph logic remains the same
  let crowdChartInstance = null;
  window.renderCrowdLineChart = function() {
    const locationSelect = document.getElementById('locationSelect');
    const selectedLocId = locationSelect.value || Object.keys(LOC)[0];
    if (!document.getElementById('crowdLineChart')) return;
    const crowdLineChartCtx = document.getElementById('crowdLineChart').getContext('2d');
    
    const filteredData = dataset.filter(d => d.locId === selectedLocId);
    const labels = filteredData.map(d => new Date(d.timestamp).toLocaleString('hi-IN', { hour: 'numeric', minute: 'numeric', hour12: true }));
    const crowdCounts = filteredData.map(d => d.count);
    if (crowdChartInstance) { crowdChartInstance.destroy(); }
    crowdChartInstance = new Chart(crowdLineChartCtx, {
        type: 'line', data: { labels, datasets: [{
                label: `भीड़ संख्या - ${LOC[selectedLocId].name}`, data: crowdCounts, borderColor: '#f57f17',
                backgroundColor: 'rgba(245, 127, 23, 0.2)', tension: 0.4, fill: true, pointBackgroundColor: '#f57f17',
                pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff', pointHoverBorderColor: '#f57f17',
                pointRadius: 5, pointHoverRadius: 7
        }]}, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: 'समय के साथ भीड़ का रुझान', font: { size: 16 } }, tooltip: { mode: 'index', intersect: false, callbacks: { title: (ctx) => `समय: ${ctx[0].label}`, label: (ctx) => `भीड़: ${ctx.raw.toLocaleString('en-IN')}` }}}, scales: { x: { title: { display: true, text: 'समय' }, grid: { display: false } }, y: { title: { display: true, text: 'भीड़ संख्या' }, beginAtZero: true }}}
    });
  };
})();