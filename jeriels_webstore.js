
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

// Nav scrolling
let isScrolling;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.add('scrolling');
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        navbar.classList.remove('scrolling');
    }, 300);
});

// Mobile menu toggle
const toggle = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('mobile-menu');
toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;

    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});


// DOMContentLoaded logic for chicharon-card
document.addEventListener('DOMContentLoaded', () => {
    const card = document.querySelector('#chicharon-card');
    const typeSelect = card.querySelector('.type');
    const flavorSelect = card.querySelector('.flavor');
    const weightSelect = card.querySelector('.weight');
    const quantityDisplay = card.querySelector('.quantity');
    const minusBtn = card.querySelector('.minus');
    const plusBtn = card.querySelector('.plus');
    const priceDisplay = card.querySelector('.price-display');
    const addToCartBtn = card.querySelector('.add-to-cart');

    let quantity = 1;

    const updatePrice = () => {
        const type = typeSelect.value;
        const flavor = flavorSelect.value;
        const weight = parseFloat(weightSelect.value);
        const basePricePerKilo = type === 'special' ? 800 : 600;
        let unitPrice = basePricePerKilo * weight;
        if (flavor === 'spicy') unitPrice *= 1.02;
        const totalPrice = unitPrice * quantity;
        priceDisplay.textContent = `₱${Math.round(totalPrice)}`;
    };

    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updatePrice();
        }
    });

    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updatePrice();
    });

    [typeSelect, flavorSelect, weightSelect].forEach(select => {
        select.addEventListener('change', updatePrice);
    });

    updatePrice();

    // Add to cart with modal popup
    addToCartBtn.addEventListener('click', () => {
        const type = typeSelect.value;
        const flavor = flavorSelect.value;
        const weight = parseFloat(weightSelect.value);
        const basePricePerKilo = type === 'special' ? 800 : 600;
        let unitPrice = basePricePerKilo * weight;
        if (flavor === 'spicy') unitPrice *= 1.02;
        const totalPrice = unitPrice * quantity;

        document.getElementById("summaryType").textContent = type;
        document.getElementById("summaryFlavor").textContent = flavor;
        document.getElementById("summaryKilo").textContent = weight;
        document.getElementById("summaryQuantity").textContent = quantity;
        document.getElementById("summaryTotal").textContent = `₱${Math.round(totalPrice).toLocaleString()}`;

        const modal = document.getElementById('openModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });
});

// Open modal and populate with summary + total price
function openModal() {
    const card = document.querySelector('#chicharon-card');
    const type = card.querySelector('.type').value;
    const flavor = card.querySelector('.flavor').value;
    const weight = parseFloat(card.querySelector('.weight').value);
    const quantity = parseInt(card.querySelector('.quantity').textContent);

    const basePricePerKilo = type === 'special' ? 800 : 600;
    let unitPrice = basePricePerKilo * weight;
    if (flavor === 'spicy') unitPrice *= 1.02;
    const totalPrice = unitPrice * quantity;

    document.getElementById("summaryType").textContent = type;
    document.getElementById("summaryFlavor").textContent = flavor;
    document.getElementById("summaryKilo").textContent = weight;
    document.getElementById("summaryQuantity").textContent = quantity;
    document.getElementById("summaryTotal").textContent = `₱${Math.round(totalPrice).toLocaleString()}`;

    const modal = document.getElementById('openModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('openModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Handle form submission
document.getElementById('userInfoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const phone = document.getElementById('phoneNumber').value;
    const gmail = document.getElementById('gmail').value;

    alert(`Thank you, ${name}! We will contact you soon at ${phone}${gmail ? ' or ' + gmail : ''}.`);
    closeModal();
    document.getElementById('chicharonForm').reset();
});


// DOMContentLoaded logic for ampao-card
document.addEventListener('DOMContentLoaded', () => {
    const ampaoCard = document.querySelector('#ampao-card');
    const minusBtn = ampaoCard.querySelector('button:first-of-type');
    const plusBtn = ampaoCard.querySelector('button:last-of-type');
    const quantityDisplay = ampaoCard.querySelector('span.text-lg');
    const priceDisplay = ampaoCard.querySelector('span.font-bold');
    const addToCartBtn = ampaoCard.querySelector('.add-to-cart');

    const pricePerPiece = 20;
    let quantity = 1;

    const updateAmpaoPrice = () => {
        const totalPrice = quantity * pricePerPiece;
        priceDisplay.textContent = `₱${totalPrice}`;
    };

    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updateAmpaoPrice();
        }
    });

    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateAmpaoPrice();
    });

    updateAmpaoPrice();

    addToCartBtn.addEventListener('click', () => {
        // Insert modal logic or form submission here
        document.getElementById("summaryType").textContent = "Ampao";
        document.getElementById("summaryFlavor").textContent = "—";
        document.getElementById("summaryKilo").textContent = "—";
        document.getElementById("summaryQuantity").textContent = quantity;
        document.getElementById("summaryTotal").textContent = `₱${(quantity * pricePerPiece).toLocaleString()}`;

        const modal = document.getElementById('openModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });
});


// DOMContentLoaded logic for bananachips-card
document.addEventListener('DOMContentLoaded', () => {
    const ampaoCard = document.querySelector('#bananachips-card');
    const minusBtn = ampaoCard.querySelector('button:first-of-type');
    const plusBtn = ampaoCard.querySelector('button:last-of-type');
    const quantityDisplay = ampaoCard.querySelector('span.text-lg');
    const priceDisplay = ampaoCard.querySelector('span.font-bold');
    const addToCartBtn = ampaoCard.querySelector('.add-to-cart');

    const pricePerPiece = 40;
    let quantity = 1;

    const updateAmpaoPrice = () => {
        const totalPrice = quantity * pricePerPiece;
        priceDisplay.textContent = `₱${totalPrice}`;
    };

    minusBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updateAmpaoPrice();
        }
    });

    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateAmpaoPrice();
    });

    updateAmpaoPrice();

    addToCartBtn.addEventListener('click', () => {
        // Insert modal logic or form submission here
        document.getElementById("summaryType").textContent = "Special Banana Chips";
        document.getElementById("summaryFlavor").textContent = "—";
        document.getElementById("summaryKilo").textContent = "—";
        document.getElementById("summaryQuantity").textContent = quantity;
        document.getElementById("summaryTotal").textContent = `₱${(quantity * pricePerPiece).toLocaleString()}`;

        const modal = document.getElementById('openModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });
});


const phrases = ["SPECIAL CHICHARONN", "Ampao & Banana Chipss"];
const typingSpan = document.getElementById("typing-text");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typingSpan.textContent = currentPhrase.substring(0, charIndex--);
    } else {
        typingSpan.textContent = currentPhrase.substring(0, charIndex++);
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 2000; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
    }

    setTimeout(typeLoop, delay);
}

document.addEventListener("DOMContentLoaded", typeLoop);




 (function () {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'96c7fd5287c7bc33',t:'MTc1NDc1MDIyNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d)
        }
    }
    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        if ('loading' !== document.readyState) c();
        else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
        else {
            var e = document.onreadystatechange || function () {};
            document.onreadystatechange = function (b) {
                e(b);
                'loading' !== document.readyState && (document.onreadystatechange = e, c())
            }
        }
    }
})();