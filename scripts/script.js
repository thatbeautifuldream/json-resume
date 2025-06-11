// Enhanced features for the resume page
document.addEventListener('DOMContentLoaded', function () {
    initializeDarkReader();
    addFavicon();
    setupTitle();
    setupSEOMetaTags();
    handlePrintParameter();
    setupSmoothScroll();
    setupEmailCopy();
    setupPrintButton();
    setupDarkModeButton();
    setupGoogleTranslate();
    setupScrollProgress();
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

function setupTitle() {
    const title = "Milind Mishra";
    document.title = `${title} | Product Engineer`;
}

function setupSEOMetaTags() {
    const title = document.title;
    const description = "A passionate Product Engineer with a knack for creating elegant and effective solutions. Explore my projects, skills, and experience on my interactive JSON resume.";
    const imageUrl = 'https://github.com/user-attachments/assets/d543f82d-154b-4341-be4f-5cbcdea5837a';
    const pageUrl = window.location.href.split('?')[0];

    const metaInfo = [
        { name: 'description', content: description },
        { name: 'author', content: 'Milind Mishra' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:url', content: pageUrl },
        { property: 'og:site_name', content: 'Milind Mishra' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: imageUrl }
    ];

    metaInfo.forEach(info => {
        const meta = document.createElement('meta');
        if (info.name) {
            meta.setAttribute('name', info.name);
        } else if (info.property) {
            meta.setAttribute('property', info.property);
        }
        meta.setAttribute('content', info.content);
        document.head.appendChild(meta);
    });
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
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    document.body.appendChild(buttonContainer);

    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i>';
    printButton.className = 'print-button';
    printButton.title = 'Print Resume';
    buttonContainer.appendChild(printButton);

    printButton.addEventListener('click', () => {
        window.print();
    });
}

function setupDarkModeButton() {
    const buttonContainer = document.querySelector('.button-container');
    const darkModeButton = document.createElement('button');
    darkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeButton.className = 'print-button';
    darkModeButton.title = 'Toggle Dark Mode';
    buttonContainer.appendChild(darkModeButton);

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
    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'ar,zh-CN,fr,de,hi,id,it,ja,ko,pt,ru,es,th,tr,vi',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };
}

function setupScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Add print button styles
const printStyle = document.createElement('style');
printStyle.textContent = `
    .button-container {
        position: fixed;
        top: 20px;
        right: 30px;
        z-index: 1000;
        display: flex;
        gap: 10px;
    }
    .print-button {
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
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background-color: #FF6B00;
        z-index: 1001;
        transition: width 0.1s ease;
    }
    @media print {
        .button-container {
            display: none;
        }
        .scroll-progress {
            display: none;
        }
        #google_translate_element {
            display: none;
        }
    }
    @media screen and (max-width: 768px) {
        .print-button[title="Print Resume"] {
            display: none;
        }
    }
`;
document.head.appendChild(printStyle); 