document.addEventListener("DOMContentLoaded", () => {
    const cleatForm = document.getElementById("cleat-form");
    const cleatList = document.getElementById("cleat-list");
    const budgetInput = document.getElementById("budget");
    const budgetValue = document.getElementById("budget-value");
    const emailInput = document.getElementById("email");
    const subscribeBtn = document.getElementById("subscribe");
    
    budgetInput.addEventListener("input", () => {
        budgetValue.textContent = `$${budgetInput.value}`;
    });
    
    cleatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const size = document.getElementById("size").value;
        const position = document.getElementById("position").value;
        const brand = document.getElementById("brand").value;
        const surface = document.getElementById("playing-surface").value;
        const budget = budgetInput.value;
        
        const cleats = getCleatRecommendations(size, position, brand, surface, budget);
        displayCleats(cleats);
    });
    
    function getCleatRecommendations(size, position, brand, surface, budget) {
        const allCleats = [
            { name: "Nike Mercurial Vapor", brand: "nike", surface: "firm-ground", price: 250, img: "nike_mercurial.jpg" },
            { name: "Adidas Predator Edge", brand: "adidas", surface: "firm-ground", price: 230, img: "adidas_predator.jpg" },
            { name: "Puma Future Z", brand: "puma", surface: "turf", price: 180, img: "puma_future.jpg" },
            { name: "Nike Tiempo Legend", brand: "nike", surface: "soft-ground", price: 200, img: "nike_tiempo.jpg" },
            { name: "Adidas X Speedflow", brand: "adidas", surface: "artificial-ground", price: 220, img: "adidas_xspeedflow.jpg" }
        ];
        
        return allCleats.filter(cleat =>
            (brand === "any" || cleat.brand === brand) &&
            cleat.surface === surface &&
            cleat.price <= budget
        );
    }
    
    function displayCleats(cleats) {
        cleatList.innerHTML = "";
        if (cleats.length === 0) {
            cleatList.innerHTML = "<p>No cleats found within your preferences.</p>";
            return;
        }
        cleats.forEach(cleat => {
            const cleatItem = document.createElement("div");
            cleatItem.classList.add("cleat-item");
            cleatItem.innerHTML = `
                <img src="images/${cleat.img}" alt="${cleat.name}">
                <h3>${cleat.name}</h3>
                <p>Brand: ${cleat.brand.toUpperCase()}</p>
                <p>Price: $${cleat.price}</p>
                <button class="buy-now" onclick="alert('Redirecting to purchase page...')">Buy Now</button>
            `;
            cleatList.appendChild(cleatItem);
        });
    }
    
    subscribeBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        if (validateEmail(email)) {
            alert("Thank you for subscribing! You'll receive the latest cleat updates.");
            emailInput.value = "";
        } else {
            alert("Please enter a valid email address.");
        }
    });
    
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Smooth scrolling for better UX
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Lazy load images for performance improvement
    const lazyImages = document.querySelectorAll("img");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    }, { rootMargin: "0px", threshold: 0.1 });
    
    lazyImages.forEach(img => {
        observer.observe(img);
    });

    // Dark mode toggle
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "Dark Mode";
    darkModeToggle.classList.add("dark-mode-toggle");
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
});
