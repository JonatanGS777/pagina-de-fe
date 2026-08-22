(() => {
    "use strict";

    const scenes = Array.isArray(window.BIBLICAL_GALLERY_SCENES)
        ? window.BIBLICAL_GALLERY_SCENES
        : [];

    const state = {
        testament: "all",
        category: "all",
        search: "",
        visibleScenes: [...scenes],
        activeSceneId: null,
        lastTrigger: null
    };

    const elements = {
        header: document.querySelector("#site-header"),
        grid: document.querySelector("#gallery-grid"),
        search: document.querySelector("#gallery-search"),
        category: document.querySelector("#category-filter"),
        filters: [...document.querySelectorAll("[data-testament]")],
        count: document.querySelector("#results-count"),
        reset: document.querySelector("#reset-filters"),
        empty: document.querySelector("#empty-state"),
        dialog: document.querySelector("#art-dialog"),
        dialogImage: document.querySelector("#dialog-image"),
        dialogNumber: document.querySelector("#dialog-number"),
        dialogTestament: document.querySelector("#dialog-testament"),
        dialogTitle: document.querySelector("#dialog-title"),
        dialogReference: document.querySelector("#dialog-reference"),
        dialogDescription: document.querySelector("#dialog-description"),
        dialogProgress: document.querySelector("#dialog-progress"),
        copyReference: document.querySelector("#copy-reference"),
        copyStatus: document.querySelector("#copy-status"),
        menuToggle: document.querySelector(".menu-toggle"),
        mobileNav: document.querySelector("#mobile-nav")
    };

    const normalize = (value) => String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const imagePath = (scene) => `images/imagen-de-fe/gallery/scene-${String(scene.id).padStart(2, "0")}.jpg`;

    function cardTemplate(scene) {
        const testamentLabel = scene.testament === "AT" ? "Antiguo Testamento" : "Nuevo Testamento";
        const imageWidth = scene.size === "tall" ? 800 : 1200;
        const imageHeight = scene.size === "tall" ? 1200 : 800;
        return `
            <button
                class="gallery-card"
                type="button"
                data-scene-id="${scene.id}"
                data-testament="${scene.testament}"
                data-category="${scene.category}"
                data-size="${scene.size}"
                aria-label="Abrir escena ${scene.id}: ${scene.title}"
            >
                <img
                    src="${imagePath(scene)}"
                    alt="Representación artística original: ${scene.title}"
                    width="${imageWidth}"
                    height="${imageHeight}"
                    loading="lazy"
                    decoding="async"
                >
                <span class="card-shade"></span>
                <span class="card-index"><i></i>${String(scene.id).padStart(2, "0")} · ${testamentLabel}</span>
                <span class="card-open" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </span>
                <span class="card-copy">
                    <span class="card-category">${scene.category}</span>
                    <h3>${scene.title}</h3>
                    <span class="card-reference">${scene.reference}</span>
                </span>
            </button>
        `;
    }

    function renderGallery() {
        if (!elements.grid) return;
        elements.grid.innerHTML = scenes.map(cardTemplate).join("");

        elements.grid.querySelectorAll(".gallery-card").forEach((card) => {
            card.addEventListener("click", () => {
                state.lastTrigger = card;
                openDialog(Number(card.dataset.sceneId));
            });

            const image = card.querySelector("img");
            image.addEventListener("error", () => {
                card.classList.add("image-error");
                image.alt = `Imagen temporalmente no disponible: ${image.alt}`;
            });
        });
    }

    function populateCategories() {
        if (!elements.category) return;
        const categories = [...new Set(scenes.map((scene) => scene.category))];
        categories.forEach((category) => {
            const option = document.createElement("option");
            const total = scenes.filter((scene) => scene.category === category).length;
            option.value = category;
            option.textContent = `${category} (${total})`;
            elements.category.append(option);
        });
    }

    function matchesFilters(scene) {
        const haystack = normalize(`${scene.title} ${scene.reference} ${scene.description} ${scene.category}`);
        const matchesTestament = state.testament === "all" || scene.testament === state.testament;
        const matchesCategory = state.category === "all" || scene.category === state.category;
        const matchesSearch = !state.search || haystack.includes(normalize(state.search));
        return matchesTestament && matchesCategory && matchesSearch;
    }

    function applyFilters() {
        state.visibleScenes = scenes.filter(matchesFilters);
        const visibleIds = new Set(state.visibleScenes.map((scene) => scene.id));

        elements.grid.querySelectorAll(".gallery-card").forEach((card) => {
            card.hidden = !visibleIds.has(Number(card.dataset.sceneId));
        });

        elements.count.textContent = state.visibleScenes.length;
        elements.empty.hidden = state.visibleScenes.length !== 0;

        const hasFilters = state.testament !== "all" || state.category !== "all" || Boolean(state.search);
        elements.reset.hidden = !hasFilters;
    }

    function resetFilters() {
        state.testament = "all";
        state.category = "all";
        state.search = "";
        elements.search.value = "";
        elements.category.value = "all";
        elements.filters.forEach((button) => {
            const active = button.dataset.testament === "all";
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        applyFilters();
    }

    function bindFilters() {
        elements.filters.forEach((button) => {
            button.addEventListener("click", () => {
                state.testament = button.dataset.testament;
                elements.filters.forEach((filter) => {
                    const active = filter === button;
                    filter.classList.toggle("active", active);
                    filter.setAttribute("aria-pressed", String(active));
                });
                applyFilters();
            });
        });

        elements.search.addEventListener("input", (event) => {
            state.search = event.target.value;
            applyFilters();
        });

        elements.category.addEventListener("change", (event) => {
            state.category = event.target.value;
            applyFilters();
        });

        elements.reset.addEventListener("click", resetFilters);
        elements.empty.querySelector("[data-reset]").addEventListener("click", resetFilters);
    }

    function currentDialogIndex() {
        return state.visibleScenes.findIndex((scene) => scene.id === state.activeSceneId);
    }

    function updateDialog(scene) {
        if (!scene) return;
        state.activeSceneId = scene.id;
        const index = currentDialogIndex();
        const testamentLabel = scene.testament === "AT" ? "Antiguo Testamento" : "Nuevo Testamento";

        elements.dialogImage.src = imagePath(scene);
        elements.dialogImage.alt = `Representación artística original: ${scene.title}`;
        elements.dialogNumber.textContent = `Escena ${String(scene.id).padStart(2, "0")}`;
        elements.dialogTestament.textContent = `${testamentLabel} · ${scene.category}`;
        elements.dialogTestament.classList.toggle("nt", scene.testament === "NT");
        elements.dialogTitle.textContent = scene.title;
        elements.dialogReference.textContent = scene.reference;
        elements.dialogDescription.textContent = scene.description;
        elements.dialogProgress.textContent = `${index + 1} / ${state.visibleScenes.length}`;
        elements.copyStatus.textContent = "";
    }

    function openDialog(sceneId) {
        const scene = state.visibleScenes.find((item) => item.id === sceneId)
            || scenes.find((item) => item.id === sceneId);
        if (!scene || !elements.dialog) return;

        updateDialog(scene);
        document.body.classList.add("dialog-open");
        if (typeof elements.dialog.showModal === "function") {
            elements.dialog.showModal();
        } else {
            elements.dialog.setAttribute("open", "");
        }
    }

    function closeDialog() {
        if (!elements.dialog.open) return;
        elements.dialog.close();
    }

    function moveDialog(step) {
        if (!state.visibleScenes.length) return;
        const current = currentDialogIndex();
        const next = (current + step + state.visibleScenes.length) % state.visibleScenes.length;
        updateDialog(state.visibleScenes[next]);
    }

    async function copyReference() {
        const scene = scenes.find((item) => item.id === state.activeSceneId);
        if (!scene) return;
        const text = `${scene.title}: ${scene.reference}`;

        try {
            await navigator.clipboard.writeText(text);
            elements.copyStatus.textContent = "Referencia copiada";
        } catch {
            const temporary = document.createElement("textarea");
            temporary.value = text;
            temporary.style.position = "fixed";
            temporary.style.opacity = "0";
            document.body.append(temporary);
            temporary.select();
            document.execCommand("copy");
            temporary.remove();
            elements.copyStatus.textContent = "Referencia copiada";
        }
    }

    function bindDialog() {
        document.querySelector(".dialog-close").addEventListener("click", closeDialog);
        document.querySelector(".dialog-prev").addEventListener("click", () => moveDialog(-1));
        document.querySelector(".dialog-next").addEventListener("click", () => moveDialog(1));
        elements.copyReference.addEventListener("click", copyReference);

        elements.dialog.addEventListener("click", (event) => {
            if (event.target === elements.dialog) closeDialog();
        });

        elements.dialog.addEventListener("close", () => {
            document.body.classList.remove("dialog-open");
            elements.dialogImage.src = "";
            state.lastTrigger?.focus({ preventScroll: true });
        });

        document.addEventListener("keydown", (event) => {
            if (!elements.dialog.open) return;
            if (event.key === "ArrowLeft") moveDialog(-1);
            if (event.key === "ArrowRight") moveDialog(1);
        });
    }

    function bindNavigation() {
        const setMenu = (open) => {
            elements.menuToggle.setAttribute("aria-expanded", String(open));
            elements.menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
            elements.mobileNav.hidden = !open;
        };

        elements.menuToggle.addEventListener("click", () => {
            setMenu(elements.menuToggle.getAttribute("aria-expanded") !== "true");
        });

        elements.mobileNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenu(false));
        });

        const updateHeader = () => elements.header.classList.toggle("scrolled", window.scrollY > 32);
        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    function setupReveal() {
        if (!("IntersectionObserver" in window)) {
            document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    }

    function init() {
        if (!scenes.length || !elements.grid) return;
        renderGallery();
        populateCategories();
        bindFilters();
        bindDialog();
        bindNavigation();
        setupReveal();
        applyFilters();
    }

    init();
})();
