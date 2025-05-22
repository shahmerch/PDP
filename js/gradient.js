document.addEventListener('DOMContentLoaded', function() {
    const gradientBg = document.getElementById('gradient-bg');
    
    // Gradient colors
    const colors = ['#1e40af', '#1e3a8a', '#1e1b4b'];
    
    // Animation variables
    let angle = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    const animationSpeed = 0.005;
    const animationRadius = 0.2;
    
    // Handle mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });
    
    // Smoothly follow mouse with easing
    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    
    // Animation loop
    function animate() {
        // Smoothly move towards mouse position
        targetX = lerp(targetX, mouseX, 0.01);
        targetY = lerp(targetY, mouseY, 0.01);
        
        // Add subtle automatic movement
        angle += animationSpeed;
        const autoX = 0.5 + Math.sin(angle) * animationRadius;
        const autoY = 0.5 + Math.cos(angle * 0.7) * animationRadius;
        
        // Combine mouse and auto movement
        const x = lerp(autoX, targetX, 0.3);
        const y = lerp(autoY, targetY, 0.3);
        
        // Create gradient
        const gradient = `radial-gradient(
            circle at ${x * 100}% ${y * 100}%,
            ${colors[0]} 0%,
            ${colors[1]} 40%,
            ${colors[2]} 100%
        )`;
        
        gradientBg.style.background = gradient;
        
        requestAnimationFrame(animate);
    }
    
    // Set initial gradient position
    const initialGradient = `radial-gradient(
        circle at 50% 50%,
        ${colors[0]} 0%,
        ${colors[1]} 40%,
        ${colors[2]} 100%
    )`;
    gradientBg.style.background = initialGradient;
    
    // Add smooth transition
    gradientBg.style.transition = 'background 1.5s ease-out';
    
    // Start animation
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        gradientBg.style.transition = 'none';
        setTimeout(() => {
            gradientBg.style.transition = 'background 1.5s ease-out';
        }, 10);
    });
});
