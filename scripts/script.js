// Enhanced features for the resume page
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkReader();
    addFavicon();
    setupRotatingTitles();
    handlePrintParameter();
    setupSmoothScroll();
    setupEmailCopy();
    setupPrintButton();
    setupDarkModeButton();
    setupGoogleTranslate();
});

function initializeDarkReader() {
    const darkReaderScript = document.createElement('script');
    darkReaderScript.src = 'https://cdn.jsdelivr.net/npm/darkreader@4.9.105/darkreader.min.js';
    document.head.appendChild(darkReaderScript);
}

function addFavicon() {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">👨🏻‍💻</text></svg>';
    document.head.appendChild(favicon);
}

function setupRotatingTitles() {
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
    
    rotateTitle();
    setInterval(rotateTitle, 10000);
}

function handlePrintParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('print') === 'true') {
        window.print();
    }
}

function setupSmoothScroll() {
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
}

function setupEmailCopy() {
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
}

function setupPrintButton() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.className = 'print-button';
    printButton.title = 'Print Resume';
    document.body.appendChild(printButton);

    printButton.addEventListener('click', () => {
        window.print();
    });
}

function setupDarkModeButton() {
    const darkModeButton = document.createElement('button');
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeButton.className = 'print-button';
    darkModeButton.title = 'Toggle Dark Mode';
    document.body.appendChild(darkModeButton);

    let isDarkMode = false;
    darkModeButton.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        if (isDarkMode) {
            DarkReader.enable({
                brightness: 100,
                contrast: 90,
                sepia: 10
            });
            darkModeButton.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            DarkReader.disable();
            darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

function setupGoogleTranslate() {
    // Add Google Translate script
    const translateScript = document.createElement('script');
    translateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(translateScript);

    // Create the div for Google Translate
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.position = 'fixed';
    translateDiv.style.bottom = '20px';
    translateDiv.style.right = '20px';
    translateDiv.style.zIndex = '1000';
    document.body.appendChild(translateDiv);

    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ar,zh-CN,fr,de,hi,id,it,ja,ko,pt,ru,es,th,tr,vi',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };

    // Add minimal styles to ensure visibility
    const translateStyle = document.createElement('style');
    translateStyle.textContent = `
        #google_translate_element {
            background: #fff;
            padding: 5px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        @media print {
            #google_translate_element {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(translateStyle);
}

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
    .print-button:first-of-type {
        right: 80px;
    }
    @media print {
        .print-button {
            display: none;
        }
    }
`;
document.head.appendChild(printStyle); 