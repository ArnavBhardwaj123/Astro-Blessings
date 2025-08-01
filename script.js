// Global functions
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToAstrologers() {
    const section = document.getElementById('astrologers');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openWhatsApp() {
    const phone = "919456040100";
    const msg = "Radhe Radhe ji! I want to consult with Astro Blessings.";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Payment Modal
function showPaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updatePaymentUI(completed) {
    const statusEl = document.getElementById('paymentStatus');
    const submitBtn = document.getElementById('submitBtn');
    if (completed) {
        statusEl.innerHTML = `<i class="fas fa-check-circle"></i><span>Payment completed</span>`;
        statusEl.className = 'payment-status paid';
        submitBtn.disabled = false;
    } else {
        statusEl.innerHTML = `<i class="fas fa-times-circle"></i><span>Payment not completed</span>`;
        statusEl.className = 'payment-status';
        submitBtn.disabled = true;
    }
}

function confirmPayment() {
    updatePaymentUI(true);
    closePaymentModal();
}

function showNotification(message, type = 'success') {
    const container = document.createElement('div');
    container.className = `notification notification-${type}`;
    container.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    container.style.cssText = `
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
    document.body.appendChild(container);
    setTimeout(() => container.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        container.style.transform = 'translateX(400px)';
        setTimeout(() => container.remove(), 300);
    }, 5000);
    container.querySelector('.notification-close')?.addEventListener('click', () => {
        container.style.transform = 'translateX(400px)';
        setTimeout(() => container.remove(), 300);
    });
}

// Google Script URL
const scriptURL = "https://script.google.com/macros/s/AKfycbw0FcZRgf6WFsQw7gNvn83x2l-4t5O0HTE_OJq5JC5uthtIptEzd5Ajfmn_n4N4pfvBIQ/exec";

document.addEventListener('DOMContentLoaded', () => {
    const paymentCheckbox = document.getElementById('paymentConfirm');
    const modalCheckbox = document.getElementById('paymentConfirmModal');
    const confirmBtn = document.querySelector('.confirm-payment-btn');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('contactForm');

    // Modal confirm checkbox
    modalCheckbox?.addEventListener('change', () => {
        if (confirmBtn) confirmBtn.disabled = !modalCheckbox.checked;
    });

    // In-form payment checkbox
    paymentCheckbox?.addEventListener('change', () => {
        updatePaymentUI(paymentCheckbox.checked);
    });

    // Submit handler
    form?.addEventListener("submit", async function (e) {
        e.preventDefault();
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const imageFile = document.getElementById('handImages')?.files[0];

        let base64Image = '', mimeType = '';

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = async function () {
                base64Image = reader.result.split(',')[1];
                mimeType = imageFile.type;
                await sendToGoogleScript(formData, base64Image, mimeType);
            };
            reader.readAsDataURL(imageFile);
        } else {
            await sendToGoogleScript(formData);
        }
    });
});

async function sendToGoogleScript(formData, imageBase64 = '', mimeType = '') {
    const payload = {
        name: formData.get('name'),
        birthDate: formData.get('birthDate'),
        birthTime: formData.get('birthTime'),
        birthPlace: formData.get('birthPlace'),
        message: formData.get('message'),
        image: imageBase64,
        mimeType: mimeType
    };

    try {
        const res = await fetch(scriptURL, {
            method: 'POST',
            body: new URLSearchParams(payload)
        });

        const data = await res.json();
        if (data.status === 'success') {
            showNotification('Form submitted successfully!', 'success');
            document.getElementById('contactForm').reset();
            document.getElementById('submitBtn').innerHTML = 'Submit';
        } else {
            showNotification('Submission failed. Try again.', 'error');
        }
    } catch (err) {
        showNotification('Something went wrong.', 'error');
    }

    document.getElementById('submitBtn').disabled = false;
}
