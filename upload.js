document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('pitch-deck');
    const analyzeBtn = document.getElementById('analyze-btn');
    const uploadBox = document.querySelector('.upload-box');
    const uploadLabel = document.querySelector('.upload-label');
    const loadingContainer = document.querySelector('.loading-container');
    const companyNameInput = document.getElementById('company-name');
    const industrySelect = document.getElementById('industry');
    const stageSelect = document.getElementById('stage');

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFileUpload(file);
    });

    // Handle drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
    });

    function handleFileUpload(file) {
        if (file && file.name.toLowerCase().endsWith('.pdf')) {
            // Create a new DataTransfer object and add the file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            
            // Set the files property of the input
            fileInput.files = dataTransfer.files;
            
            // Update the UI
            uploadLabel.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${file.name}</span>
                <small class="file-type">Click to change file</small>
            `;
            updateAnalyzeButton();
        } else {
            alert('Please select a PDF file');
            resetFileInput();
        }
    }

    function resetFileInput() {
        fileInput.value = '';
        uploadLabel.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <span>Drag & Drop or Click to Upload PDF</span>
            <small class="file-type">PDF files only</small>
        `;
        updateAnalyzeButton();
    }

    function updateAnalyzeButton() {
        const hasFile = fileInput.files.length > 0;
        const hasCompanyName = companyNameInput.value.trim() !== '';
        const hasIndustry = industrySelect.value !== '';
        const hasStage = stageSelect.value !== '';
        
        analyzeBtn.disabled = !(hasFile && hasCompanyName && hasIndustry && hasStage);
    }

    // Update button state on input changes
    companyNameInput.addEventListener('input', updateAnalyzeButton);
    industrySelect.addEventListener('change', updateAnalyzeButton);
    stageSelect.addEventListener('change', updateAnalyzeButton);

    // Handle analyze button click
    analyzeBtn.addEventListener('click', () => {
        if (analyzeBtn.disabled) return;

        // Show loading state
        uploadBox.classList.add('loading');
        loadingContainer.style.display = 'block';
        analyzeBtn.disabled = true;
        analyzeBtn.querySelector('.btn-spinner').style.display = 'block';
        analyzeBtn.querySelector('.btn-text').style.visibility = 'hidden';

        // Simulate analysis
        setTimeout(() => {
            window.location.href = 'analyze.html';
        }, 2000);
    });
});

function hideLoading() {
    uploadButton.style.display = 'block';
    spinner.style.display = 'none';
}
