const mockAnalysis = {
    teamStrength: "Experienced",
    marketOpportunity: "Large & Growing",
    productClarity: "Clear value prop",
    tractionEvidence: "MVP launched",
    monetizationStrategy: "Clear",
    competitivePositioning: "Strong",
    overallInvestmentRisk: "Medium",
    investorFit: "Angel investors, Seed funds",
    summary: "This startup presents a compelling opportunity in a rapidly expanding market. The experienced founding team has demonstrated traction with their MVP and has a clear monetization strategy. While there are some competitive pressures, their unique value proposition positions them well for growth. This opportunity aligns well with early-stage investors looking for scalable opportunities in the tech sector."
};

const uploadButton = document.querySelector('.upload-button');
const spinner = document.querySelector('.spinner');
const fileInput = document.getElementById('pitch-deck');
const uploadSection = document.getElementById('upload-section');
const analysisSection = document.getElementById('analysis-section');

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

    // Show analysis section
    uploadSection.classList.add('hidden');
    analysisSection.classList.remove('hidden');

    // Fill in analysis data
    document.getElementById('summary').textContent = mockAnalysis.summary;
    document.getElementById('team-strength').textContent = mockAnalysis.teamStrength;
    document.getElementById('market-opportunity').textContent = mockAnalysis.marketOpportunity;
    document.getElementById('product-clarity').textContent = mockAnalysis.productClarity;
    document.getElementById('traction-evidence').textContent = mockAnalysis.tractionEvidence;
    document.getElementById('monetization-strategy').textContent = mockAnalysis.monetizationStrategy;
    document.getElementById('competitive-positioning').textContent = mockAnalysis.competitivePositioning;
    document.getElementById('investment-risk').textContent = mockAnalysis.overallInvestmentRisk;
    document.getElementById('investor-fit').textContent = mockAnalysis.investorFit;
}
