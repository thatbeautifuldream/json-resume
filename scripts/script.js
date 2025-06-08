// Enhanced features for the resume page
document.addEventListener('DOMContentLoaded', function() {
    // Add favicon
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👨🏻‍💻</text></svg>';
    document.head.appendChild(favicon);

    // Rotating title
    const titles = [
        "Full Stack Engineer",
        "Software Engineer",
        "Creative Developer",
        "Problem Solver",
        "Tech Innovator",
        "Digital Craftsman",
        "System Architect"
    ];
    
    let currentIndex = 0;
    const baseTitle = document.title;
    
    function rotateTitle() {
        document.title = `${titles[currentIndex]} | ${baseTitle}`;
        currentIndex = (currentIndex + 1) % titles.length;
    }
    
    // Initial title rotation
    rotateTitle();
    // Rotate title every 10 seconds
    setInterval(rotateTitle, 10000);

    // Print functionality
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('print') === 'true') {
        window.print();
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add copy email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                const originalText = link.textContent;
                link.textContent = 'Email copied!';
                setTimeout(() => {
                    link.textContent = originalText;
                }, 2000);
            });
        });
    });

    // Add print button
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.className = 'print-button';
    printButton.title = 'Print Resume';
    document.body.appendChild(printButton);

    // Add print button styles
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        .print-button {
            position: fixed;
            top: 20px;
            right: 30px;
            z-index: 1000;
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        @media print {
            .print-button {
                display: none;
            }
        }
    `;
    document.head.appendChild(printStyle);

    // Print button functionality
    printButton.addEventListener('click', () => {
        window.print();
    });
}); 