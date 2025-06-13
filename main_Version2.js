document.addEventListener('DOMContentLoaded', function () {

    const germinationData = [
        { name: "Imbibition", details: "The first step. The dry seed rapidly absorbs water, causing it to swell and soften its protective coat. This rehydrates the internal cells and activates metabolism." },
        { name: "Enzyme Activation", details: "Water activates enzymes (like amylase and protease) that break down stored food reserves (starch, proteins, lipids) into simple, usable molecules like sugars and amino acids." },
        { name: "Radicle Emergence", details: "Fueled by the mobilized nutrients and energy from initial respiration, the embryonic root (radicle) emerges. It grows downwards, anchoring the seedling and absorbing water and nutrients." },
        { name: "Plumule Growth", details: "The embryonic shoot (plumule) grows upwards towards the light. It is often protected by a sheath as it pushes through the soil. This will form the stem and leaves." },
        { name: "Seedling Establishment", details: "The seedling develops true leaves and becomes capable of photosynthesis. It is no longer reliant on stored food and is now a self-sustaining plant." },
    ];
    
    const respirationContent = {
        aerobic: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h4 class="text-2xl font-semibold mb-4">Aerobic: The High-Efficiency Engine</h4>
                    <p class="text-gray-600 mb-4">This is the primary and most efficient pathway for energy production, requiring oxygen. It fully breaks down glucose to extract the maximum amount of energy.</p>
                    <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
                        <strong>Equation:</strong> Glucose + O₂ → CO₂ + H₂O + <span class="font-bold">~32-38 ATP</span>
                    </div>
                    <ul class="mt-4 space-y-2 text-gray-700">
                        <li><strong>Location:</strong> Cytoplasm & Mitochondria</li>
                        <li><strong>Oxygen Required:</strong> Yes</li>
                        <li><strong>Energy Yield:</strong> Very High</li>
                        <li><strong>Byproducts:</strong> Carbon Dioxide, Water</li>
                    </ul>
                </div>
                <div>
                    <div class="chart-container">
                        <canvas id="atpChart"></canvas>
                    </div>
                    <p class="text-center text-sm text-gray-500 mt-2">ATP Yield Comparison</p>
                </div>
            </div>
        `,
        anaerobic: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h4 class="text-2xl font-semibold mb-4">Anaerobic: The Emergency Backup</h4>
                    <p class="text-gray-600 mb-4">When oxygen is scarce (e.g., in waterlogged soil), plants switch to this less efficient pathway. It provides a small, quick burst of energy to survive temporarily.</p>
                    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                        <strong>Equation:</strong> Glucose → Ethanol + CO₂ + <span class="font-bold">Only 2 ATP</span>
                    </div>
                     <ul class="mt-4 space-y-2 text-gray-700">
                        <li><strong>Location:</strong> Cytoplasm only</li>
                        <li><strong>Oxygen Required:</strong> No</li>
                        <li><strong>Energy Yield:</strong> Very Low</li>
                        <li><strong>Byproducts:</strong> Ethanol (can be toxic), CO₂</li>
                    </ul>
                </div>
                <div>
                    <div class="chart-container">
                        <canvas id="atpChart"></canvas>
                    </div>
                    <p class="text-center text-sm text-gray-500 mt-2">ATP Yield Comparison</p>
                </div>
            </div>
        `
    };

    const photoblastyData = {
        positive: { 
            icon: '☀️',
            text: '<strong>Positive Photoblasty:</strong> These seeds require light to germinate. Light signals that the seed is near the surface and conditions are good for photosynthesis. Example: Lettuce.'
        },
        negative: { 
            icon: '🌑',
            text: '<strong>Negative Photoblasty:</strong> These seeds are inhibited by light and must be in darkness to germinate. This ensures they are safely buried in moist soil. Example: Onion.'
        },
        neutral: {
            icon: '🌗',
            text: '<strong>Neutral:</strong> These seeds don\'t care! They germinate equally well in light or darkness, relying on other cues like temperature and moisture. Example: Corn, Tomato.'
        }
    };
    
    let atpChartInstance = null;
    let tempChartInstance = null;

    function renderGerminationSteps() {
        const container = document.getElementById('germination-steps-container');
        container.innerHTML = germinationData.map((step, index) => `
            <div class="process-step border-2 rounded-lg p-4 text-center cursor-pointer bg-white" data-index="${index}">
                <div class="text-2xl mb-2">${index + 1}</div>
                <h5 class="font-semibold">${step.name}</h5>
            </div>
        `).join('');
    }
    
    function handleGerminationClick(e) {
        const stepElement = e.target.closest('.process-step');
        if (stepElement) {
            const allSteps = document.querySelectorAll('.process-step');
            allSteps.forEach(s => s.classList.remove('active'));
            stepElement.classList.add('active');
            
            const index = parseInt(stepElement.dataset.index);
            const detailsContainer = document.getElementById('germination-details');
            detailsContainer.innerHTML = `<p class="text-gray-700">${germinationData[index].details}</p>`;
        }
    }

    function renderRespirationContent(type) {
        document.getElementById('respiration-content').innerHTML = respirationContent[type];
        createATPChart(type);
    }

    function createATPChart(type) {
        if (atpChartInstance) {
            atpChartInstance.destroy();
        }
        const ctx = document.getElementById('atpChart').getContext('2d');
        const isAerobic = type === 'aerobic';
        
        atpChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Aerobic Respiration', 'Anaerobic Respiration'],
                datasets: [{
                    label: 'ATP Yield per Glucose Molecule',
                    data: [36, 2],
                    backgroundColor: [
                        isAerobic ? '#81B29A' : '#E5E7EB',
                        !isAerobic ? '#F2C14E' : '#E5E7EB'
                    ],
                    borderColor: [
                         isAerobic ? '#699d81' : '#D1D5DB',
                        !isAerobic ? '#d9ad45' : '#D1D5DB'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                         callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + ' ATP';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'ATP Molecules'
                        }
                    }
                }
            }
        });
    }

    function handleTempSlider() {
        const slider = document.getElementById('temp-slider');
        const valueDisplay = document.getElementById('temp-value');
        const feedbackDisplay = document.getElementById('temp-feedback');
        
        const temp = parseInt(slider.value);
        valueDisplay.textContent = temp;

        let feedbackText = '';
        if (temp < 10) {
            feedbackText = "Too cold. Metabolic reactions and enzyme activity are extremely slow, inhibiting germination.";
        } else if (temp >= 10 && temp <= 30) {
            feedbackText = "Optimal range for many plants. Enzymes are highly active, and respiration proceeds efficiently, promoting strong germination and growth.";
        } else if (temp > 30 && temp <= 45) {
            feedbackText = "Getting warm. Respiration rate is high, but can become wasteful. Stress begins for cool-season plants.";
        } else {
            feedbackText = "Too hot! Enzymes start to denature (lose their shape), permanently halting metabolic processes. This is lethal.";
        }
        feedbackDisplay.innerHTML = `<p>${feedbackText}</p>`;
    }

    function handlePhotoClick(e) {
        const btn = e.target.closest('.photo-btn');
        if (btn) {
            document.querySelectorAll('.photo-btn').forEach(b => b.classList.replace('active-nav', 'inactive-nav'));
            btn.classList.replace('inactive-nav', 'active-nav');

            const type = btn.dataset.photoblasty;
            const data = photoblastyData[type];
            const feedbackDisplay = document.getElementById('light-feedback');
            feedbackDisplay.innerHTML = `
                <div class="flex items-start space-x-3">
                    <span class="text-2xl">${data.icon}</span>
                    <p class="text-sm text-left">${data.text}</p>
                </div>
            `;
        }
    }

    function createTempRespirationChart() {
        if (tempChartInstance) {
            tempChartInstance.destroy();
        }
        const ctx = document.getElementById('tempRespirationChart').getContext('2d');
        tempChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['0', '10', '20', '30', '40', '50', '60'],
                datasets: [{
                    label: 'Respiration Rate',
                    data: [5, 10, 20, 40, 80, 40, 5],
                    fill: false,
                    borderColor: '#E07A5F',
                    tension: 0.4,
                    pointBackgroundColor: '#E07A5F',
                    pointRadius: 5,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                     tooltip: {
                         callbacks: {
                            title: (context) => `${context[0].label}°C`,
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Relative Rate'
                        }
                    },
                    x: {
                         title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });
    }

    function handleInternalCardClick(e) {
        const card = e.target.closest('.internal-card');
        if (card) {
            const details = card.querySelector('.details');
            details.classList.toggle('hidden');
        }
    }


    document.getElementById('germination-steps-container').addEventListener('click', handleGerminationClick);
    
    const showAerobicBtn = document.getElementById('show-aerobic');
    const showAnaerobicBtn = document.getElementById('show-anaerobic');
    
    showAerobicBtn.addEventListener('click', () => {
        renderRespirationContent('aerobic');
        showAerobicBtn.classList.replace('inactive-nav', 'active-nav');
        showAnaerobicBtn.classList.replace('active-nav', 'inactive-nav');
    });

    showAnaerobicBtn.addEventListener('click', () => {
        renderRespirationContent('anaerobic');
        showAnaerobicBtn.classList.replace('inactive-nav', 'active-nav');
        showAerobicBtn.classList.replace('active-nav', 'inactive-nav');
    });

    document.getElementById('temp-slider').addEventListener('input', handleTempSlider);

    document.querySelectorAll('.photo-btn').forEach(btn => btn.addEventListener('click', handlePhotoClick));
    
    document.querySelectorAll('.internal-card').forEach(card => card.addEventListener('click', handleInternalCardClick));

    renderGerminationSteps();
    document.querySelector('.process-step[data-index="0"]').click();
    
    renderRespirationContent('aerobic');
    
    handleTempSlider();

    document.querySelector('.photo-btn[data-photoblasty="positive"]').click();

    createTempRespirationChart();
});