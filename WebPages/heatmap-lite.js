// heatmap-lite.js
(function(){
  if (window.__heatmap_lite_loaded) return;
  window.__heatmap_lite_loaded = true;

  // Config: Sample/demo dataset generation
  const LOC = {
    mahakal:    { name: "महाकाल मंदिर", lat: 23.1816, lng: 75.7667 },
    ramghat:    { name: "रामघाट",       lat: 23.1843, lng: 75.7686 },
    mangalnath: { name: "मंगलनाथ",     lat: 23.2030, lng: 75.7725 },
    kalbhairav: { name: "काल भैरव",     lat: 23.1903, lng: 75.7568 }
  };
  window.LOC = LOC;

  function randInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

  function genDemo(dateStr){
    const arr=[];
    const baseCounts = { 
        mahakal: 40000, 
        ramghat: 25000, 
        mangalnath: 15000, 
        kalbhairav: 10000 
    };

    for(const k of Object.keys(LOC)){
      for(let h=0; h<24; h+=2){
        const dt = new Date(dateStr+'T00:00:00Z'); dt.setUTCHours(h);
        const base = baseCounts[k] || 10000;
        
        let mult = 1.0;
        if (h >= 4 && h <= 8) { mult = 2.5; } 
        else if (h >= 10 && h <= 14) { mult = 0.8; } 
        else if (h >= 16 && h <= 20) { mult = 2.2; } 
        else { mult = 0.5; }

        const c = Math.max(0, Math.round(base*mult + randInt(-Math.round(base*0.15), Math.round(base*0.15))));
        arr.push({ locId:k, name:LOC[k].name, lat:LOC[k].lat, lng:LOC[k].lng, timestamp: dt.toISOString(), count: c });
      }
    }
    return arr;
  }

  // Core initializer
  function initHeatmapOnce(){
    if (window.__heatmap_initialized) return;
    window.__heatmap_initialized = true;

    const SAMPLE_DATE = '2025-09-08';
    const dataset = genDemo(SAMPLE_DATE);
    window.chartData = dataset;

    const el = document.getElementById('heatmap');
    if(!el) { console.warn('heatmap-lite: #heatmap element not found'); return; }

    const map = L.map(el).setView([23.189, 75.767], 14);
    window.heatmapInstance = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{ attribution: '&copy; OpenStreetMap' }).addTo(map);
    
    const heat = L.heatLayer([], { 
        radius: 150, blur: 100, maxZoom: 16, max: 1.0, 
        gradient: { 0.2: '#00FFFF', 0.4: '#00FF00', 0.7: '#FFFF00', 1.0: '#FF0000' } 
    }).addTo(map);
    window.heatLayer = heat;
    
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      const div = L.DomUtil.create("div", "legend legend-snapchat");
      div.innerHTML += "<h4>सक्रियता स्तर</h4>";
      div.innerHTML += '<div><i style="background:#FF0000"></i><span> अत्यधिक सक्रिय</span></div>';
      div.innerHTML += '<div><i style="background:#FFFF00"></i><span> उच्च सक्रिय</span></div>';
      div.innerHTML += '<div><i style="background:#00FF00"></i><span> मध्यम सक्रिय</span></div>';
      div.innerHTML += '<div><i style="background:#00FFFF"></i><span> कुछ गतिविधि</span></div>';
      return div;
    };
    legend.addTo(map);

    map.on('zoomend', function() {
        const currentZoom = map.getZoom();
        let newRadius, newBlur;
        if (currentZoom <= 14) { newRadius = 150; newBlur = 100; } 
        else if (currentZoom === 15) { newRadius = 80; newBlur = 60; } 
        else if (currentZoom === 16) { newRadius = 40; newBlur = 30; } 
        else { newRadius = 25; newBlur = 20; }
        heat.setOptions({ radius: newRadius, blur: newBlur });
    });

    const timestamps = Array.from(new Set(dataset.map(d=>d.timestamp))).sort();
    let currentIndex = 0;
    let animationTimer = null;
    
    const playPauseBtn = document.getElementById('playPauseBtn');
    const timeSlider = document.getElementById('timeSlider');
    const currentTimeLabel = document.getElementById('currentTimeLabel');
    const countTabTimeLabel = document.getElementById('countTabTimeLabel'); // Get the new label
    const prevBtn = document.getElementById('prevStep');
    const nextBtn = document.getElementById('nextStep');
    
    if (timeSlider) {
        timeSlider.max = timestamps.length - 1;
    }

    function renderIndex(index){
      currentIndex = index;
      const ts = timestamps[index];
      const currentPoints = dataset.filter(d => d.timestamp === ts);
      
      const counts = currentPoints.map(p => p.count);
      const maxCount = Math.max(1, ...counts);
      const heatPoints = currentPoints.map(d => [d.lat, d.lng, d.count / maxCount]);
      heat.setLatLngs(heatPoints);

      const formattedTime = new Date(ts).toLocaleString('hi-IN', { hour: 'numeric', minute: 'numeric', hour12: true });

      // Update both time labels
      if (currentTimeLabel) { currentTimeLabel.innerText = formattedTime; }
      if (countTabTimeLabel) { countTabTimeLabel.innerText = formattedTime; } // Update the new label
      
      if (timeSlider) { timeSlider.value = index; }
      
      const countTable = document.getElementById('crowdTable');
      if(countTable){
        Array.from(countTable.tBodies[0].rows).forEach(r=>{
          const locId = r.getAttribute('data-loc-id');
          const rec = currentPoints.find(d => d.locId === locId);
          const cell = r.querySelector('.count');
          if(cell) cell.innerText = rec ? rec.count.toLocaleString('en-IN') : '0';
        });
      }
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

    renderIndex(0);

    const locationSelect = document.getElementById('locationSelect');
    const crowdLineChartCtx = document.getElementById('crowdLineChart').getContext('2d');
    let crowdChartInstance = null;
    window.currentSelectedLocation = Object.keys(LOC)[0];

    if (locationSelect) {
        for (const locId in LOC) {
            const option = document.createElement('option');
            option.value = locId;
            option.innerText = LOC[locId].name;
            locationSelect.appendChild(option);
        }
        locationSelect.value = window.currentSelectedLocation;
        locationSelect.addEventListener('change', (e) => {
            window.currentSelectedLocation = e.target.value;
            renderCrowdLineChart(dataset, window.currentSelectedLocation);
        });
    }

    window.renderCrowdLineChart = function(data, selectedLocId) {
        const filteredData = data.filter(d => d.locId === selectedLocId);
        const labels = filteredData.map(d => new Date(d.timestamp).toLocaleString('hi-IN', { hour: 'numeric', minute: 'numeric', hour12: true }));
        const crowdCounts = filteredData.map(d => d.count);

        if (crowdChartInstance) { crowdChartInstance.destroy(); }

        crowdChartInstance = new Chart(crowdLineChartCtx, {
            type: 'line', data: { labels: labels, datasets: [{
                    label: `भीड़ संख्या - ${LOC[selectedLocId].name}`, data: crowdCounts, borderColor: '#f57f17',
                    backgroundColor: 'rgba(245, 127, 23, 0.2)', tension: 0.4, fill: true, pointBackgroundColor: '#f57f17',
                    pointBorderColor: '#fff', pointHoverBackgroundColor: '#fff', pointHoverBorderColor: '#f57f17',
                    pointRadius: 5, pointHoverRadius: 7
            }]},
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'समय के साथ भीड़ का रुझान', font: { size: 16 } },
                    tooltip: { mode: 'index', intersect: false, callbacks: {
                            title: (context) => `समय: ${context[0].label}`,
                            label: (context) => `भीड़: ${context.raw.toLocaleString('en-IN')}`
                    }}
                },
                scales: {
                    x: { title: { display: true, text: 'समय' }, grid: { display: false } },
                    y: { title: { display: true, text: 'भीड़ संख्या' }, beginAtZero: true }
                }
            }
        });
    };
    
    if (document.getElementById('graphTab').classList.contains('active')) {
        renderCrowdLineChart(dataset, window.currentSelectedLocation);
    }
  }

  function onMaybeInit(){
    const hm = document.getElementById('heatmap');
    if(hm && hm.offsetParent !== null && !window.__heatmap_initialized) {
      initHeatmapOnce();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(onMaybeInit, 100);
    document.querySelectorAll('.tab-buttons button').forEach(button => {
      button.addEventListener('click', () => setTimeout(onMaybeInit, 100));
    });
  });
})();