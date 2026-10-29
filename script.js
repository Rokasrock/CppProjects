const products = [
  { id: "amethyst-cluster", name: "Ametisto kristalų drūza", category: "crystals", label: "Neapdorotas kristalas", detail: "Natūralus ametistas · Kiekvienas unikalus", price: 38, form: "cluster", color: "#7752a5", light: "#d0b4f0", dark: "#3d285e", description: "Violetinių atspalvių kvarco kristalų sankaupa. Natūralūs kristalai skiriasi forma ir spalva.", use: "Padėkite ant lentynos ar stalo kaip natūralų akcentą. Dulkes nuvalykite minkštu, sausu šepetėliu." },
  { id: "clear-quartz", name: "Kalnų krištolo kristalas", category: "crystals", label: "Neapdorotas kristalas", detail: "Skaidrus kvarcas · Natūralios formos", price: 46, form: "point", color: "#85aeb0", light: "#e5f4ec", dark: "#527c80", description: "Skaidrus arba lengvai balkšvas kvarco kristalas su natūraliai susiformavusiu smailiu galu.", use: "Eksponuokite gerai matomoje vietoje arba naudokite kaip stalo dekoraciją. Saugokite nuo kritimo." },
  { id: "rose-quartz", name: "Rožinio kvarco akmenys", category: "stones", label: "Poliruotas akmuo", detail: "3 glotnūs akmenys · Natūralus kvarcas", price: 29, form: "tumbled", color: "#d98c99", light: "#f5d7d9", dark: "#a85869", description: "Švelniai rausvas kvarcas, nušlifuotas į glotnius, patogiai laikomus akmenukus.", use: "Išdėliokite dubenėlyje ar ant palangės, arba laikykite vieną akmenuką ant darbo stalo kaip dekoratyvų akcentą." },
  { id: "citrine-point", name: "Citrino kristalas", category: "crystals", label: "Neapdorotas kristalas", detail: "Geltonas kvarcas · Natūrali forma", price: 36, form: "point", color: "#d99535", light: "#f6d991", dark: "#9d5721", description: "Šiltų geltonų ir auksinių atspalvių kvarco kristalas, išsiskiriantis savo spalva ir smailia forma.", use: "Pastatykite ten, kur norisi šilto spalvinio akcento. Ryški saulė gali išblukinti kai kuriuos kristalus." },
  { id: "black-tourmaline", name: "Juodasis turmalinas", category: "crystals", label: "Neapdorotas kristalas", detail: "Tamsus mineralas · Natūrali forma", price: 24, form: "point", color: "#424b49", light: "#a4b3ad", dark: "#202927", description: "Tamsus, dažnai išilgai ruožuotas mineralas, vertinamas dėl išraiškingos natūralios tekstūros.", use: "Derinkite su šviesesniais akmenimis arba pastatykite kaip kontrastingą dekoro elementą. Nuvalykite sausa šluoste." },
  { id: "aventurine-stones", name: "Žaliojo aventurino akmenys", category: "stones", label: "Poliruotas akmuo", detail: "3 glotnūs akmenys · Žalias kvarcas", price: 27, form: "tumbled", color: "#558b68", light: "#b5d7aa", dark: "#315940", description: "Žalsvi, glotniai nušlifuoti kvarco akmenys su natūraliai kintančiais atspalviais.", use: "Sudėkite į mažą indą ar komponuokite su augalais. Tai paprastas būdas į erdvę įnešti natūralios žalios spalvos." },
  { id: "tiger-eye-stone", name: "Tigro akies akmuo", category: "stones", label: "Poliruotas akmuo", detail: "Poliruotas akmuo · Auksiniai ruožai", price: 32, form: "tumbled", color: "#a76b30", light: "#e6bd69", dark: "#684020", description: "Rudas kvarco akmuo su atpažįstamais auksiniais, šviesoje žvilgančiais ruoželiais.", use: "Pasukite akmenį šviesoje, kad išryškėtų jo natūralūs ruožai, arba naudokite kaip nedidelį lentynos akcentą." },
  { id: "labradorite", name: "Labradorito kristalas", category: "crystals", label: "Neapdorotas kristalas", detail: "Pilkas mineralas · Melsvi žvilgesiai", price: 42, form: "point", color: "#536c85", light: "#a9d8db", dark: "#354256", description: "Pilkas lauko špato grupės mineralas, kai kuriuose kampuose atspindintis mėlynus ar žalsvus tonus.", use: "Laikykite vietoje, kur galima pastebėti spalvų žaismą. Švelniai valykite sausa šluoste ir saugokite nuo smūgių." }
];

const productGrid = document.querySelector("#products");
const searchInput = document.querySelector("#product-search");
const emptyResults = document.querySelector("#empty-results");
const cart = new Map();
let activeFilter = "all";

function crystalImage(product) {
  const stones = product.form === "tumbled";
  const shapes = stones
    ? `<path d="M92 382 Q74 355 106 329 Q140 309 169 333 Q190 361 164 389 Q124 405 92 382Z" fill="url(#stone1)"/><path d="M178 390 Q157 359 190 326 Q226 305 254 335 Q278 365 249 394 Q209 409 178 390Z" fill="url(#stone2)"/><path d="M271 382 Q249 350 280 326 Q314 308 346 335 Q366 360 342 386 Q304 402 271 382Z" fill="url(#stone3)"/><path d="M107 350 Q133 327 158 344 M197 350 Q222 326 248 346 M291 347 Q315 329 340 348" fill="none" stroke="#fff" stroke-opacity=".48" stroke-width="5" stroke-linecap="round"/>`
    : `<path d="M96 376 103 220 140 126 176 221 180 376Z" fill="url(#crystal1)"/><path d="M168 376 178 149 224 54 270 150 280 376Z" fill="url(#crystal2)"/><path d="M264 376 273 227 310 139 346 228 352 376Z" fill="url(#crystal3)"/><path d="M140 126 140 376 103 376 103 220Z" fill="#fff" fill-opacity=".29"/><path d="M224 54 224 376 178 376 178 149Z" fill="#fff" fill-opacity=".35"/><path d="M310 139 310 376 273 376 273 227Z" fill="#fff" fill-opacity=".25"/><path d="M152 183 166 232 M238 112 255 174 M322 190 337 236" fill="none" stroke="#fff" stroke-opacity=".64" stroke-width="5" stroke-linecap="round"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 500"><defs><linearGradient id="background" x2="0" y2="1"><stop stop-color="#f8f6f0"/><stop offset="1" stop-color="#e9e3d6"/></linearGradient><radialGradient id="glow"><stop stop-color="${product.light}" stop-opacity=".58"/><stop offset="1" stop-color="${product.light}" stop-opacity="0"/></radialGradient><linearGradient id="crystal1" x1="0" x2="1" y2="1"><stop stop-color="${product.light}"/><stop offset=".48" stop-color="${product.color}"/><stop offset="1" stop-color="${product.dark}"/></linearGradient><linearGradient id="crystal2" x1="0" x2="1" y2="1"><stop stop-color="${product.light}"/><stop offset=".52" stop-color="${product.color}"/><stop offset="1" stop-color="${product.dark}"/></linearGradient><linearGradient id="crystal3" x1="0" x2="1" y2="1"><stop stop-color="${product.light}"/><stop offset=".5" stop-color="${product.color}"/><stop offset="1" stop-color="${product.dark}"/></linearGradient><linearGradient id="stone1" x2="1" y2="1"><stop stop-color="${product.light}"/><stop offset="1" stop-color="${product.dark}"/></linearGradient><linearGradient id="stone2" x2="1" y2="1"><stop stop-color="${product.light}"/><stop offset="1" stop-color="${product.color}"/></linearGradient><linearGradient id="stone3" x2="1" y2="1"><stop stop-color="${product.color}"/><stop offset="1" stop-color="${product.dark}"/></linearGradient></defs><rect width="440" height="500" fill="url(#background)"/><ellipse cx="220" cy="225" rx="190" ry="190" fill="url(#glow)"/><ellipse cx="220" cy="399" rx="142" ry="18" fill="#51483f" opacity=".14"/>${shapes}<path d="M111 397 Q220 378 329 397 L315 417 Q220 432 125 417Z" fill="${product.dark}" opacity=".72"/><path d="M128 399 Q220 389 312 399" fill="none" stroke="${product.light}" stroke-opacity=".85" stroke-width="3"/><text x="220" y="466" text-anchor="middle" fill="#554d45" font-family="Georgia,serif" font-size="17" letter-spacing="3">${stones ? "POLIRUOTAS AKMUO" : "NATŪRALUS KRISTALAS"}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function renderProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const visible = products.filter((product) => {
    const matchesCategory = activeFilter === "all" || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.detail} ${product.label} ${product.description} ${product.use}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  productGrid.innerHTML = visible.map((product) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${crystalImage(product)}" alt="${product.name} – iliustracinis kristalo vaizdas" loading="lazy">
        <span class="product-tag">${product.label}</span>
        <button class="add-button" type="button" data-add="${product.id}" aria-label="Įdėti prekę „${product.name}“ į krepšelį">Į krepšelį +</button>
      </div>
      <div class="product-meta"><h3>${product.name}</h3><span>${product.price} €</span></div>
      <p class="product-detail">${product.detail}</p>
      <details class="product-details">
        <summary>Apie kristalą ir jo panaudojimą</summary>
        <div class="product-details-copy">
          <p>${product.description}</p>
          <p><strong>Kaip panaudoti:</strong> ${product.use}</p>
          <p class="product-note">Dekoratyvinis natūralus akmuo. Jo savybės nepakeičia medicininės ar profesionalios pagalbos.</p>
        </div>
      </details>
    </article>`).join("");
  emptyResults.hidden = visible.length > 0;
}

const cartDrawer = document.querySelector("#cart-drawer");
const cartBackdrop = document.querySelector("#cart-backdrop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartSummary = document.querySelector("#cart-summary");

function updateCart() {
  const quantity = [...cart.values()].reduce((total, item) => total + item.quantity, 0);
  const subtotal = [...cart.values()].reduce((total, item) => total + item.product.price * item.quantity, 0);
  document.querySelector("#cart-count").textContent = quantity;
  document.querySelector("#cart-title-count").textContent = `(${quantity})`;
  cartEmpty.hidden = quantity > 0;
  cartSummary.hidden = quantity === 0;
  cartItems.innerHTML = [...cart.values()].map(({ product, quantity: count }) => `
    <article class="cart-item">
      <img src="${crystalImage(product)}" alt="">
      <div class="cart-item-info"><strong>${product.name}</strong><small>${product.price} € · ${product.detail}</small><div class="quantity-control" aria-label="Prekės „${product.name}“ kiekis"><button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Pašalinti vieną prekę „${product.name}“">−</button><span>${count}</span><button type="button" data-quantity="${product.id}" data-change="1" aria-label="Pridėti vieną prekę „${product.name}“">+</button></div></div>
      <span class="cart-item-price">${product.price * count} €</span>
    </article>`).join("");
  document.querySelector("#cart-subtotal").textContent = `${subtotal} €`;
}

function setCartOpen(isOpen) {
  cartDrawer.classList.toggle("open", isOpen);
  cartDrawer.setAttribute("aria-hidden", String(!isOpen));
  cartDrawer.inert = !isOpen;
  cartBackdrop.hidden = !isOpen;
  document.body.classList.toggle("cart-open", isOpen);
  if (isOpen) {
    requestAnimationFrame(() => cartBackdrop.classList.add("visible"));
    document.querySelector("#cart-close").focus();
  } else {
    cartBackdrop.classList.remove("visible");
    document.querySelector("#cart-open").focus();
  }
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.add);
  const existing = cart.get(product.id);
  cart.set(product.id, { product, quantity: (existing?.quantity ?? 0) + 1 });
  updateCart();
  button.textContent = "Įdėta ✓";
  window.setTimeout(() => { if (button.isConnected) button.textContent = "Į krepšelį +"; }, 1100);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-quantity]");
  if (!button) return;
  const item = cart.get(button.dataset.quantity);
  item.quantity += Number(button.dataset.change);
  if (item.quantity <= 0) cart.delete(button.dataset.quantity);
  updateCart();
});

document.querySelector("#cart-open").addEventListener("click", () => setCartOpen(true));
document.querySelector("#cart-close").addEventListener("click", () => setCartOpen(false));
cartBackdrop.addEventListener("click", () => setCartOpen(false));
document.querySelector("#continue-shopping").addEventListener("click", () => setCartOpen(false));
document.querySelector("#checkout-button").addEventListener("click", () => {
  document.querySelector("#checkout-note").textContent = "Tai demonstracinė parduotuvė. Mokėjimai dar neprijungti.";
});

document.querySelector("#menu-toggle").addEventListener("click", (event) => {
  const menu = document.querySelector(".main-nav");
  const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
  event.currentTarget.setAttribute("aria-expanded", String(!expanded));
  event.currentTarget.setAttribute("aria-label", expanded ? "Atidaryti navigaciją" : "Uždaryti navigaciją");
  menu.classList.toggle("open", !expanded);
});
document.querySelectorAll(".main-nav a").forEach((link) => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  document.querySelector("#menu-toggle").setAttribute("aria-expanded", "false");
  document.querySelector("#menu-toggle").setAttribute("aria-label", "Atidaryti navigaciją");
}));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) setCartOpen(false);
});
document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-message").textContent = "Ačiū, kad užsiprenumeravote. Naujienlaiškio registracija veikia demonstraciniu režimu.";
  event.currentTarget.reset();
});

renderProducts();
updateCart();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelector(".hero-video").pause();
}