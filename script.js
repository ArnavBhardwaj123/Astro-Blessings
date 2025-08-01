// Form will be linked to Excel/Google Sheets instead of EmailJS

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const chatNowBtn = document.querySelector(".chat-now-btn");
    const contactForm = document.getElementById("contactForm");
    const navMenu = document.querySelector('.nav-menu');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener("click", function() {
        const spans = this.querySelectorAll("span");
        this.classList.toggle("active");
        navMenu.classList.toggle('open');

        if (this.classList.contains("active")) {
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
            spans[0].style.transform = "none";
            spans[1].style.opacity = "1";
            spans[2].style.transform = "none";
        }
    });

    // WhatsApp integration
    function openWhatsApp() {
        const phoneNumber = "919876543210"; // Replace with your actual WhatsApp number
        const message = "Hello! I'm interested in getting an astrology consultation from Astro Blessings. Can you please help me?";
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    // Chat Now button functionality
    if (chatNowBtn) {
        chatNowBtn.addEventListener("click", function() {
            // Add click animation
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "";
            }, 150);

            // Open WhatsApp
            setTimeout(() => {
                openWhatsApp();
            }, 200);
        });
    }

    // Smooth scrolling for navigation links
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

    // Payment functionality
    let paymentCompleted = false;

    // Contact form submission - Link to Excel/Google Sheets
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Check if payment is completed
            if (!paymentCompleted) {
                showNotification('Please complete payment before submitting the form.', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                birthDate: document.getElementById('birthDate').value,
                birthTime: document.getElementById('birthTime').value,
                birthPlace: document.getElementById('birthPlace').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value,
                photos: document.getElementById('photos').files.length > 0 ? 'Photos uploaded' : 'No photos',
                paymentStatus: 'Completed',
                timestamp: new Date().toISOString()
            };

            // Submit to Google Sheets (you'll need to set up a Google Apps Script)
            // Replace this URL with your Google Apps Script web app URL
            const googleSheetsURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
            
            // For now, we'll simulate the submission
            setTimeout(() => {
                // Show success message
                showNotification('Radhe Radhe! Aapka form successfully submit ho gaya hai. Hum 24 ghante mein aapko contact karenge.', 'success');
                
                // Reset form and payment status
                contactForm.reset();
                resetPaymentStatus();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = true;
            }, 2000);

            // Uncomment this when you have your Google Apps Script set up
            /*
            fetch(googleSheetsURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(() => {
                showNotification('Radhe Radhe! Aapka form successfully submit ho gaya hai. Hum 24 ghante mein aapko contact karenge.', 'success');
                contactForm.reset();
                resetPaymentStatus();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = true;
            })
            .catch((error) => {
                console.log('Error:', error);
                showNotification('Sorry! Form submit karne mein problem hui. Please try again ya direct contact karein.', 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
            */
        });
    }

    // Vastu Calendar functionality
    function generateVastuCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) {
            console.log('Calendar grid not found, retrying...');
            setTimeout(generateVastuCalendar, 100);
            return;
        }

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        // Clear existing calendar
        calendarGrid.innerHTML = '';

        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day header';
            dayHeader.textContent = day;
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.backgroundColor = '#f1f5f9';
            calendarGrid.appendChild(dayHeader);
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;

            // Check if it's today
            if (day === today.getDate()) {
                dayElement.classList.add('today');
            }

            // Add Vastu auspicious days (example: 1st, 8th, 15th, 22nd, 29th)
            const vastuDays = [1, 8, 15, 22, 29];
            if (vastuDays.includes(day)) {
                dayElement.classList.add('vastu-day');
            }

            // Add click event for day selection
            dayElement.addEventListener('click', function() {
                // Remove previous selections
                document.querySelectorAll('.calendar-day.selected').forEach(el => {
                    el.classList.remove('selected');
                });
                
                // Add selection to clicked day
                this.classList.add('selected');
                
                // Update calendar info
                updateCalendarInfo(day);
            });

            calendarGrid.appendChild(dayElement);
        }
    }

    function updateCalendarInfo(selectedDay) {
        const calendarInfo = document.querySelector('.calendar-info');
        if (!calendarInfo) return;

        const vastuDays = [1, 8, 15, 22, 29];
        const isVastuDay = vastuDays.includes(selectedDay);

        if (isVastuDay) {
            calendarInfo.innerHTML = `
                <h4>Vastu Auspicious Day - ${selectedDay}</h4>
                <p>This is an excellent day for Vastu consultations and remedies. The planetary alignment is favorable for home energy balancing, construction activities, and spiritual practices. Consider scheduling your Vastu consultation today for optimal results.</p>
            `;
        } else {
            calendarInfo.innerHTML = `
                <h4>Day ${selectedDay} - Regular Day</h4>
                <p>This day is suitable for general Vastu activities. While not specifically auspicious, you can still schedule consultations and perform basic remedies. For best results, consider choosing an auspicious day marked with a star.</p>
            `;
        }
    }

    // Initialize Vastu Calendar after everything else is loaded
    // Temporarily disabled to fix the "Sat" issue
    // setTimeout(() => {
    //     generateVastuCalendar();
    // }, 500);

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 16px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
    }

    // Add parallax effect to background stars
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const stars = document.querySelectorAll(".star-decoration");
        const moon = document.querySelector(".moon-decoration");
        const sun = document.querySelector(".sun-decoration");

        stars.forEach((star, index) => {
            const speed = 0.3 + index * 0.05;
            const yPos = -(scrolled * speed);
            star.style.transform = `translateY(${yPos}px)`;
        });

        if (moon) {
            const moonSpeed = 0.2;
            const moonYPos = -(scrolled * moonSpeed);
            moon.style.transform = `translateY(${moonYPos}px)`;
        }

        if (sun) {
            const sunSpeed = 0.15;
            const sunYPos = -(scrolled * sunSpeed);
            sun.style.transform = `translateY(${sunYPos}px)`;
        }

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add hover effects to geometric patterns
    const patterns = document.querySelectorAll(".pattern");
    patterns.forEach((pattern) => {
        pattern.addEventListener("mouseenter", function() {
            this.style.animationPlayState = "paused";
            this.style.transform += " scale(1.2)";
            this.style.borderColor = "rgba(255, 255, 255, 0.9)";
        });

        pattern.addEventListener("mouseleave", function() {
            this.style.animationPlayState = "running";
            this.style.transform = this.style.transform.replace(" scale(1.2)", "");
            this.style.borderColor = "rgba(255, 255, 255, 0.6)";
        });
    });

    // Add subtle hover effect to hero image
    const heroImage = document.querySelector(".hero-image");
    const mysticalBorder = document.querySelector(".mystical-border");

    if (heroImage && mysticalBorder) {
        heroImage.addEventListener("mouseenter", () => {
            mysticalBorder.style.transform = "scale(1.02)";
            mysticalBorder.style.transition = "transform 0.3s ease";
        });

        heroImage.addEventListener("mouseleave", () => {
            mysticalBorder.style.transform = "scale(1)";
        });
    }

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.usp-card, .astrologer-card').forEach(el => {
        // Ensure content is visible by default
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        heroTitle.textContent = "";

        let i = 0;
        function typeWriter() {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Global functions for external access
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToAstrologers() {
    const astrologersSection = document.getElementById('astrologers');
    if (astrologersSection) {
        astrologersSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openWhatsApp() {
    const phoneNumber = "919876543210"; // Replace with your actual WhatsApp number
    const message = "Hello! I'm interested in getting an astrology consultation from Astro Blessings. Can you please help me?";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Payment Modal Functions
function showPaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function confirmPayment() {
    const checkbox = document.getElementById('paymentConfirm');
    const confirmBtn = document.querySelector('.confirm-payment-btn');
    
    if (checkbox.checked) {
        paymentCompleted = true;
        updatePaymentStatus();
        closePaymentModal();
        showNotification('Payment confirmed! You can now submit your form.', 'success');
    }
}

function updatePaymentStatus() {
    const paymentStatus = document.getElementById('paymentStatus');
    const submitBtn = document.getElementById('submitBtn');
    
    if (paymentCompleted) {
        paymentStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Payment completed</span>';
        paymentStatus.className = 'payment-status paid';
        submitBtn.disabled = false;
    } else {
        paymentStatus.innerHTML = '<i class="fas fa-times-circle"></i><span>Payment not completed</span>';
        paymentStatus.className = 'payment-status';
        submitBtn.disabled = true;
    }
}

function resetPaymentStatus() {
    paymentCompleted = false;
    updatePaymentStatus();
}

// Payment checkbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const paymentCheckbox = document.getElementById('paymentConfirm');
    const confirmBtn = document.querySelector('.confirm-payment-btn');
    
    if (paymentCheckbox) {
        paymentCheckbox.addEventListener('change', function() {
            confirmBtn.disabled = !this.checked;
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePaymentModal();
            }
        });
    }
});

// Add smooth entrance animations
window.addEventListener("load", () => {
    const heroImage = document.querySelector(".hero-image-section");
    const heroContent = document.querySelector(".hero-text");

    if (heroImage && heroContent) {
        // Ensure content is visible immediately
        heroImage.style.opacity = "1";
        heroImage.style.transform = "translateX(0)";
        heroContent.style.opacity = "1";
        heroContent.style.transform = "translateX(0)";
    }
});

// Add loading animation
window.addEventListener("load", () => {
    // Ensure content is visible
    document.body.style.opacity = "1";
    document.body.style.visibility = "visible";
    
    // Show main content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = "1";
        mainContent.style.visibility = "visible";
    }
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .calendar-day.selected {
        background: #3b82f6 !important;
        color: white !important;
        border-color: #3b82f6 !important;
        transform: scale(1.1);
    }
    
    .calendar-day.header {
        background: #f1f5f9 !important;
        color: #1e293b !important;
        font-weight: bold;
        border: none;
    }
    
    .calendar-day.empty {
        background: transparent;
        border: none;
    }
`;
document.head.appendChild(notificationStyles);