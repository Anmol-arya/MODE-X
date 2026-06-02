

console.log("MODE-X Loaded Successfully!");



window.addEventListener("load", () => {
    console.log("Welcome to MODE-X");
});



function shopNow() {
    alert("🔥 Welcome to MODE-X Sale!");
}



let wishlistCount = 0;

function addWishlist() {
    wishlistCount++;

    const wishlist = document.getElementById("wishlistCount");

    if (wishlist) {
        wishlist.innerText = wishlistCount;
    }
}



let bagCount = 0;

function addBag() {
    bagCount++;

    const bag = document.getElementById("bagCount");

    if (bag) {
        bag.innerText = bagCount;
    }
}



const searchInputDebug = document.querySelector(".search_input");

if (searchInputDebug) {
    searchInputDebug.addEventListener("keyup", () => {
        console.log("Searching:", searchInputDebug.value);
    });
}



const banner = document.querySelector(".banner_image");

const banners = [
    "banner 1.webp",
    "banner 2.avif",
    "banner 3.avif",
    "banner4.jpg"
];

let currentBanner = 0;

setInterval(() => {

    if (!banner) return;

    banner.style.opacity = "0";

    setTimeout(() => {

        currentBanner++;

        if (currentBanner >= banners.length) {
            currentBanner = 0;
        }

        banner.src = banners[currentBanner];

        banner.style.opacity = "1";

    }, 500);

}, 3000);



const navLinks = document.querySelectorAll(".nav_bar a");

navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        link.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", () => {
        link.style.transform = "translateY(0px)";
    });
});



const products = document.querySelectorAll(".sale_item");

products.forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.transform = "scale(1.05)";
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "scale(1)";
    });
});



const topBtn = document.createElement("button");

topBtn.innerText = "↑";

topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.padding = "10px 15px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#ff3f6c";
topBtn.style.color = "white";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});



const year = document.getElementById("year");

if (year) {
    year.innerText = new Date().getFullYear();
}



const profileBtn = document.getElementById("profileBtn");
const profilePopup = document.getElementById("profilePopup");
const saveProfile = document.getElementById("saveProfile");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeText = document.getElementById("welcomeText");

if (profileBtn && profilePopup) {

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profilePopup.style.display = "block";
    });

    profilePopup.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        profilePopup.style.display = "none";
    });
}

if (saveProfile) {
    saveProfile.addEventListener("click", () => {

        const username =
            document.getElementById("username").value.trim();

        if (username === "") {
            alert("Please enter your name");
            return;
        }

        localStorage.setItem("MODEX_USER", username);

        welcomeText.innerText = `Welcome ${username} 👋`;

        document.getElementById("username").style.display = "none";

        saveProfile.innerText = "Logged In ✓";

        saveProfile.disabled = true;
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("MODEX_USER");

        welcomeText.innerText = "Welcome Guest 👋";

        document.getElementById("username").style.display = "block";

        document.getElementById("username").value = "";

        saveProfile.innerText = "Login";

        saveProfile.disabled = false;
    });
}

const savedUser = localStorage.getItem("MODEX_USER");

if (savedUser && welcomeText) {

    welcomeText.innerText = `Welcome ${savedUser} 👋`;

    document.getElementById("username").style.display = "none";

    saveProfile.innerText = "Logged In ✓";

    saveProfile.disabled = true;
}



const searchInput = document.querySelector(".search_input");
const searchResults = document.getElementById("searchResults");
const searchLoader = document.getElementById("searchLoader");

if (searchInput && searchResults) {

    searchInput.addEventListener("keyup", async () => {

        const query = searchInput.value.toLowerCase();

        console.log("typing:", query);

        if (query.length < 2) {
            searchResults.innerHTML = "";
            searchResults.classList.remove("active");
            return;
        }

        searchLoader && (searchLoader.style.display = "block");

        try {
            const response = await fetch(`https://dummyjson.com/products?limit=100`);
            const data = await response.json();

            const filtered = data.products.filter(product =>
                product.title.toLowerCase().includes(query)
            );

            searchResults.innerHTML = "";
            searchResults.classList.add("active");

            searchLoader && (searchLoader.style.display = "none");

            if (filtered.length === 0) {
                searchResults.innerHTML = `<p style="padding:10px;">No products found 😕</p>`;
                return;
            }

            filtered.forEach(product => {

                const div = document.createElement("div");
                div.className = "product-item";
                div.dataset.id = product.id;

                div.style.display = "flex";
                div.style.gap = "10px";
                div.style.alignItems = "center";
                div.style.margin = "10px 0";
                div.style.cursor = "pointer";

                div.innerHTML = `
                    <img src="${product.thumbnail}" 
                         style="width:50px;height:50px;object-fit:cover;border-radius:8px;" />
                    <div>
                        <h3 style="margin:0;">${product.title}</h3>
                        <p style="margin:0;">₹${product.price}</p>
                    </div>
                `;

                searchResults.appendChild(div);
            });

        } catch (err) {
            console.log(err);
            searchResults.innerHTML = `<p style="padding:10px;">Error loading products</p>`;
            searchLoader && (searchLoader.style.display = "none");
        }

    });
}

if (searchResults) {

    searchResults.addEventListener("click", (e) => {

        const item = e.target.closest(".product-item");

        if (!item) return;

        window.location.href = `product.html?id=${item.dataset.id}`;
    });
}













