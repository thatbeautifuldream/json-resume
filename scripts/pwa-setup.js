// PWA Setup Script
(function() {
  'use strict';

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }

  // PWA Install Prompt
  let deferredPrompt;
  let installButton;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Create install button if it doesn't exist
    if (!installButton) {
      createInstallButton();
    }
    
    // Show the install button
    if (installButton) {
      installButton.style.display = 'block';
    }
  });

  function createInstallButton() {
    // Create a floating install button
    installButton = document.createElement('button');
    installButton.innerHTML = '<i class="fas fa-download"></i> Install App';
    installButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      background: #0095ff;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 149, 255, 0.3);
      transition: all 0.3s ease;
      display: none;
      font-family: inherit;
    `;
    
    installButton.addEventListener('mouseover', () => {
      installButton.style.background = '#0c65a5';
      installButton.style.transform = 'translateY(-2px)';
      installButton.style.boxShadow = '0 6px 16px rgba(0, 149, 255, 0.4)';
    });
    
    installButton.addEventListener('mouseout', () => {
      installButton.style.background = '#0095ff';
      installButton.style.transform = 'translateY(0)';
      installButton.style.boxShadow = '0 4px 12px rgba(0, 149, 255, 0.3)';
    });

    installButton.addEventListener('click', async () => {
      if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        // Clear the deferredPrompt
        deferredPrompt = null;
        // Hide the install button
        installButton.style.display = 'none';
      }
    });

    document.body.appendChild(installButton);
  }

  // Handle successful installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    if (installButton) {
      installButton.style.display = 'none';
    }
    deferredPrompt = null;
  });

  // Add PWA-specific styles
  const pwaStyles = document.createElement('style');
  pwaStyles.textContent = `
    @media (display-mode: standalone) {
      body {
        user-select: none;
        -webkit-user-select: none;
      }
      
      /* Hide install button when in standalone mode */
      .pwa-install-button {
        display: none !important;
      }
    }
    
    /* PWA splash screen improvements */
    @media (prefers-color-scheme: dark) {
      :root {
        --pwa-bg: #1a1a1a;
        --pwa-text: #ffffff;
      }
    }
    
    @media (prefers-color-scheme: light) {
      :root {
        --pwa-bg: #ffffff;
        --pwa-text: #40484f;
      }
    }
  `;
  document.head.appendChild(pwaStyles);

})(); 