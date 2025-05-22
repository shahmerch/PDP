// Mock data for demonstration
const mockCompanies = {
    '1': {
        name: "AI Solutions Inc.",
        industry: "Tech",
        stage: "Series A",
        teamStrength: { score: 85, label: "Strong", description: "Experienced team with relevant background" },
        marketOpportunity: { score: 78, label: "Large", description: "$10B+ market opportunity" },
        productClarity: { score: 92, label: "Excellent", description: "Clear value proposition" },
        tractionEvidence: { score: 65, label: "Early", description: "Initial pilot customers" },
        monetizationStrategy: { score: 80, label: "Clear", description: "Subscription-based model" },
        competitivePositioning: { score: 72, label: "Good", description: "Differentiated technology" },
        overallInvestmentRisk: { score: 68, label: "Medium", description: "Balanced risk/reward" },
        summary: "Strong team with a clear product vision in a growing market. The company shows promising early traction and has a viable path to monetization. The main risks are competition and execution risk.",
        growthHistory: [10, 25, 40, 55, 68]
    },
    '2': {
        name: "GreenTech Energy",
        industry: "CleanTech",
        stage: "Seed",
        teamStrength: { score: 75, label: "Good", description: "Technical team with industry experience" },
        marketOpportunity: { score: 88, label: "Huge", description: "$50B+ market opportunity" },
        productClarity: { score: 80, label: "Good", description: "Clear sustainability focus" },
        tractionEvidence: { score: 45, label: "Very Early", description: "Prototype stage" },
        monetizationStrategy: { score: 70, label: "Developing", description: "B2B partnerships" },
        competitivePositioning: { score: 85, label: "Strong", description: "First-mover advantage" },
        overallInvestmentRisk: { score: 75, label: "High", description: "High risk, high reward" },
        summary: "Innovative clean energy solution with significant market potential. The technology is promising but still in early stages. The team is strong technically but may need additional business expertise.",
        growthHistory: [5, 15, 30, 45, 75]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const companySelect = document.getElementById('company-select');

    // Initialize navigation
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Handle mobile menu close
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Handle mobile menu link clicks
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Handle company selection
    if (companySelect) {
        companySelect.addEventListener('change', (e) => {
            const companyId = e.target.value;
            const company = mockCompanies[companyId];
            if (company) {
                displayAnalysis(company);
            }
        });
        
        // Display first company by default
        const firstCompanyId = Object.keys(mockCompanies)[0];
        if (firstCompanyId) {
            companySelect.value = firstCompanyId;
            displayAnalysis(mockCompanies[firstCompanyId]);
        }
    }
});

function displayAnalysis(analysis) {
    // Update summary
    const summaryElement = document.getElementById('summary');
    if (summaryElement && analysis.summary) {
        summaryElement.textContent = analysis.summary;
    }

    // Update metrics
    updateMetric('team-strength', analysis.teamStrength || analysis.analysis?.teamStrength);
    updateMetric('market-opportunity', analysis.marketOpportunity || analysis.analysis?.marketOpportunity);
    updateMetric('product-clarity', analysis.productClarity || analysis.analysis?.productClarity);
    updateMetric('traction-evidence', analysis.tractionEvidence || analysis.analysis?.tractionEvidence);
    updateMetric('monetization-strategy', analysis.monetizationStrategy || analysis.analysis?.monetizationStrategy);
    updateMetric('competitive-positioning', analysis.competitivePositioning || analysis.analysis?.competitivePositioning);
    updateMetric('investment-risk', analysis.overallInvestmentRisk || analysis.analysis?.overallInvestmentRisk);

    // Update growth chart if data exists
    if (analysis.growthHistory) {
        addGrowthChart(analysis.growthHistory);
    } else if (analysis.analysis?.growthHistory) {
        addGrowthChart(analysis.analysis.growthHistory);
    }
}

function updateMetric(metricId, data) {
    const valueElement = document.getElementById(`${metricId}-value`);
    const chartElement = document.getElementById(`${metricId}-chart`);

    if (valueElement) {
        // Update value display
        valueElement.textContent = `${data.score}% - ${data.label}`;

        // Create chart
        if (chartElement) {
            new Chart(chartElement, {
                type: 'doughnut',
                data: {
                    labels: ['Score', 'Remaining'],
                    datasets: [{
                        data: [data.score, 100 - data.score],
                        backgroundColor: ['#2563eb', '#e2e8f0'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '80%',
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    }
                }
            });
        }
    }
}
const fileInput = document.getElementById('pitch-deck');
const summaryElement = document.getElementById('summary');

fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
        alert('Please upload a PDF file');
        return;
    }

    showLoading();
    
    // Simulate PDF processing
    setTimeout(() => {
        displayAnalysis();
    }, 2000);
}

function showLoading() {
    uploadButton.style.display = 'none';
    spinner.style.display = 'block';
}

function displayAnalysis() {
    // Hide loading
    spinner.style.display = 'none';
    uploadButton.style.display = 'flex';

    // Update summary
    summaryElement.textContent = mockAnalysis.summary;

    // Update metrics
    updateMetric('team-strength', mockAnalysis.teamStrength);
    updateMetric('market-opportunity', mockAnalysis.marketOpportunity);
    updateMetric('product-clarity', mockAnalysis.productClarity);
    updateMetric('traction-evidence', mockAnalysis.tractionEvidence);
    updateMetric('monetization-strategy', mockAnalysis.monetizationStrategy);
    updateMetric('competitive-positioning', mockAnalysis.competitivePositioning);
    updateMetric('investment-risk', mockAnalysis.overallInvestmentRisk);
}

function updateMetric(metricId, data) {
    const valueElement = document.getElementById(`${metricId}-value`);
    const chartElement = document.getElementById(`${metricId}-chart`);

    // Update value display
    valueElement.textContent = `${data.score}% - ${data.label}`;

    // Create chart
    if (chartElement) {
        new Chart(chartElement, {
            type: 'doughnut',
            data: {
                labels: ['Score', 'Remaining'],
                datasets: [{
                    data: [data.score, 100 - data.score],
                    backgroundColor: ['#2563eb', '#e2e8f0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }
}
