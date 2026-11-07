/* K Explore — plain JavaScript event discovery and local demo registrations. */
(() => {
  "use strict";

  const events = window.KEXPLORE_EVENTS || [];
  const categories = window.KEXPLORE_CATEGORIES || [];
  const REGISTRATIONS_KEY = "kexplore-registrations-v1";
  const THEME_KEY = "kexplore-theme-v1";
  const $ = (selector) => document.querySelector(selector);
  const state = { category: "All events", search: "", sort: "soonest", activeEventId: null };
  let toastTimer;

  const icons = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>'
  };

  const displayDate = (iso, opts) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", ...opts }).format(new Date(iso));
  const shortDate = (iso) => displayDate(iso, { day: "numeric", month: "short", year: "numeric" });
  const dateTime = (iso) => `${shortDate(iso)} · ${displayDate(iso, { hour: "numeric", minute: "2-digit", hour12: true })}`;
  const eventById = (id) => events.find((event) => event.id === id);

  function getRegistrations() {
    try {
      const parsed = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((r) => r && typeof r.id === "string" && typeof r.eventId === "string" && typeof r.email === "string");
    } catch {
      return [];
    }
  }

  function saveRegistrations(registrations) {
    try {
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
      return true;
    } catch {
      showToast("Browser storage is unavailable. Your registration was not saved.");
      return false;
    }
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3800);
  }

  function openDialog(selector) {
    const dialog = $(selector);
    if (dialog && !dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");
  }

  function initializeDialogs() {
    document.querySelectorAll("dialog").forEach((dialog) => {
      dialog.addEventListener("close", () => {
        if (![...document.querySelectorAll("dialog")].some((other) => other.open)) document.body.classList.remove("dialog-open");
      });
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
      });
      dialog.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => dialog.close()));
    });
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === "dark";
    $("#themeToggle").setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    $("#themeToggle").setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    $("#themeToggle").innerHTML = isDark
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13.2A9 9 0 0 1 10.8 3.1 9 9 0 1 0 20.9 13.2Z"/></svg>';
    try { localStorage.setItem(THEME_KEY, theme); } catch { /* Storage may be blocked; theme still works in-session. */ }
  }

  function initializeTheme() {
    let saved = "light";
    try { saved = localStorage.getItem(THEME_KEY) || "light"; } catch { /* no persistent theme */ }
    setTheme(saved === "dark" ? "dark" : "light");
    $("#themeToggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  }

  function initializeNavigation() {
    const menu = $("#mobileNav");
    const menuButton = $("#menuButton");
    menuButton.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      const isOpen = !menu.hidden;
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      menu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    }));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) {
        menu.hidden = true;
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.focus();
      }
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) && !document.querySelector("dialog[open]")) {
        e.preventDefault();
        $("#eventSearch").focus();
        $("#events").scrollIntoView({ behavior: "smooth" });
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 850) { menu.hidden = true; menuButton.setAttribute("aria-expanded", "false"); }
    });
    ["#openPasses", "#mobilePasses", "#footerPasses"].forEach((selector) => $(selector).addEventListener("click", () => {
      menu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      renderPasses();
      openDialog("#passesDialog");
    }));
    $("#footerYear").textContent = String(new Date().getFullYear());
  }

  function renderCategoryTiles() {
    $("#categoryTiles").innerHTML = categories.map((category) => `
      <button class="category-tile" type="button" data-category="${category.name}" aria-label="View ${category.name} events">
        <span class="category-icon" style="background:${category.color}" aria-hidden="true">${category.icon}</span>
        <span class="category-tile-bottom"><strong>${category.name}</strong><span aria-hidden="true">↗</span></span>
      </button>
    `).join("");
    $("#categoryTiles").addEventListener("click", (e) => {
      const button = e.target.closest("[data-category]");
      if (!button) return;
      state.category = button.dataset.category;
      $("#eventSearch").value = "";
      state.search = "";
      renderFilters();
      renderEvents();
      $("#events").scrollIntoView({ behavior: "smooth" });
    });
  }

  function renderFilters() {
    const allCategories = ["All events", ...categories.map((category) => category.name)];
    $("#filterChips").innerHTML = allCategories.map((category) => `
      <button type="button" class="filter-chip" data-filter="${category}" aria-pressed="${state.category === category}">${category}</button>
    `).join("");
  }

  function filteredEvents() {
    const query = state.search.trim().toLocaleLowerCase();
    return events.filter((event) => {
      const categoryMatch = state.category === "All events" || event.category === state.category;
      const searchable = [event.title, event.category, event.venue, event.location, event.shortDescription, ...event.tags].join(" ").toLocaleLowerCase();
      return categoryMatch && (!query || searchable.includes(query));
    }).sort((a, b) => {
      if (state.sort === "name") return a.title.localeCompare(b.title);
      const diff = new Date(a.date) - new Date(b.date);
      return state.sort === "latest" ? -diff : diff;
    });
  }

  function cardHtml(event) {
    const day = displayDate(event.date, { day: "2-digit" });
    const month = displayDate(event.date, { month: "short" }).toUpperCase();
    const time = displayDate(event.date, { hour: "numeric", minute: "2-digit", hour12: true });
    return `
      <article class="event-card" aria-labelledby="event-title-${event.id}">
        <div class="event-media"><img src="${event.image}" alt="Illustrated poster for ${event.title}" width="1200" height="770" loading="lazy">
          ${event.featured ? '<span class="featured-tag">✦ FEATURED</span>' : ""}
          <div class="event-date-tag" aria-label="${shortDate(event.date)}"><strong>${day}</strong><span>${month}</span></div>
        </div>
        <div class="event-body"><span class="card-category">${event.category}</span>
          <h3 class="event-title" id="event-title-${event.id}">${event.title}</h3><p class="event-description">${event.shortDescription}</p>
          <div class="event-meta"><span>${icons.clock} ${time}</span><span>${icons.pin} ${event.venue}</span></div>
        </div>
        <div class="event-footer"><button type="button" data-action="details" data-id="${event.id}" aria-label="View details for ${event.title}">View details ↗</button>
          <button type="button" class="register-small" data-action="register" data-id="${event.id}" aria-label="Register for ${event.title}">Register <span aria-hidden="true">→</span></button></div>
      </article>`;
  }

  function renderEvents() {
    const visible = filteredEvents();
    $("#eventGrid").innerHTML = visible.map(cardHtml).join("");
    $("#emptyState").hidden = visible.length > 0;
    $("#resultCount").textContent = `Showing ${visible.length} ${visible.length === 1 ? "event" : "events"}`;
  }

  function initializeEventSearch() {
    $("#filterChips").addEventListener("click", (e) => {
      const button = e.target.closest("[data-filter]");
      if (!button) return;
      state.category = button.dataset.filter;
      renderFilters();
      renderEvents();
    });
    $("#eventSearch").addEventListener("input", (e) => { state.search = e.target.value; renderEvents(); });
    $("#sortEvents").addEventListener("change", (e) => { state.sort = e.target.value; renderEvents(); });
    $("#resetFilters").addEventListener("click", () => {
      state.category = "All events";
      state.search = "";
      state.sort = "soonest";
      $("#eventSearch").value = "";
      $("#sortEvents").value = "soonest";
      renderFilters();
      renderEvents();
    });
    $("#eventGrid").addEventListener("click", (e) => {
      const button = e.target.closest("button[data-action][data-id]");
      if (!button) return;
      if (button.dataset.action === "details") showDetails(button.dataset.id);
      else if (button.dataset.action === "register") showRegistration(button.dataset.id);
    });
  }

  function showDetails(eventId) {
    const event = eventById(eventId);
    if (!event) { showToast("That event could not be found."); return; }
    state.activeEventId = event.id;
    $("#detailTitle").textContent = event.title;
    $("#detailDescription").textContent = event.description;
    $("#detailImage").src = event.image;
    $("#detailImage").alt = `Illustrated poster for ${event.title}`;
    $("#detailImageCategory").textContent = event.category.toUpperCase();
    $("#detailMeta").innerHTML = `
      <div class="detail-meta-row"><span aria-hidden="true">📅</span><div><strong>${dateTime(event.date)}</strong><small>${event.duration}</small></div></div>
      <div class="detail-meta-row"><span aria-hidden="true">⌖</span><div><strong>${event.venue}</strong><small>${event.location}</small></div></div>
      <div class="detail-meta-row"><span aria-hidden="true">✦</span><div><strong>${event.category}</strong><small>Open to curious learners and explorers</small></div></div>`;
    const agenda = $("#detailAgenda");
    agenda.replaceChildren();
    event.agenda.forEach((item) => { const li = document.createElement("li"); li.textContent = item; agenda.append(li); });
    const tags = $("#detailTags");
    tags.replaceChildren();
    event.tags.forEach((item) => { const span = document.createElement("span"); span.textContent = item; tags.append(span); });
    openDialog("#detailsDialog");
  }

  function generateReference() {
    const bytes = new Uint8Array(4);
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    return "KE-" + [...bytes].map((value) => value.toString(16).padStart(2, "0")).join("").toUpperCase();
  }

  const validationRules = {
    fullName: (value) => {
      if (!value) return "Please enter your full name.";
      if (value.length < 2 || value.length > 80 || !/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(value)) return "Enter a valid name (2–80 characters).";
      return "";
    },
    email: (value) => {
      if (!value) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Enter a valid email address.";
      return "";
    },
    phone: (value) => {
      const digits = value.replace(/\D/g, "");
      if (!value) return "Please enter your phone number.";
      if (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 10 || digits.length > 15) return "Enter a valid phone number (10–15 digits).";
      return "";
    },
    selectedEvent: (value) => eventById(value) ? "" : "Please select an event."
  };

  function validateField(field) {
    const value = field.value.trim();
    const message = validationRules[field.id](value);
    const errorElement = $("#" + ({ fullName: "nameError", email: "emailError", phone: "phoneError", selectedEvent: "eventError" })[field.id]);
    errorElement.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    return !message;
  }

  function clearFormErrors() {
    ["fullName", "email", "phone", "selectedEvent"].forEach((id) => {
      $("#" + id).removeAttribute("aria-invalid");
    });
    document.querySelectorAll("#registrationForm .field-error").forEach((element) => { element.textContent = ""; });
  }

  function showRegistration(eventId) {
    const event = eventById(eventId);
    if (!event) { showToast("Please choose a valid event."); return; }
    $("#registrationForm").reset();
    clearFormErrors();
    $("#selectedEvent").value = eventId;
    if ($("#detailsDialog").open) $("#detailsDialog").close();
    openDialog("#registrationDialog");
    $("#fullName").focus();
  }

  function initializeRegistration() {
    $("#selectedEvent").innerHTML = '<option value="">Select an event</option>' +
      events.map((event) => `<option value="${event.id}">${event.title}</option>`).join("");
    ["fullName", "email", "phone", "selectedEvent"].forEach((id) => {
      const field = $("#" + id);
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener(id === "selectedEvent" ? "change" : "input", () => {
        if (field.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });
    $("#detailRegister").addEventListener("click", () => showRegistration(state.activeEventId));
    $("#shareEvent").addEventListener("click", async () => {
      const event = eventById(state.activeEventId);
      if (!event) return;
      const link = new URL(window.location.href);
      link.hash = "event-" + event.id;
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Unavailable");
        await navigator.clipboard.writeText(link.href);
        showToast("Event link copied to clipboard!");
      } catch {
        showToast("Copy this page URL with #event-" + event.id + " to share.");
      }
    });

    $("#registrationForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fields = ["fullName", "email", "phone", "selectedEvent"].map((id) => $("#" + id));
      const valid = fields.map(validateField).every(Boolean);
      if (!valid) { fields.find((field) => field.getAttribute("aria-invalid") === "true").focus(); return; }
      const fullName = form.elements.fullName.value.trim().replace(/\s+/g, " ");
      const email = form.elements.email.value.trim().toLowerCase();
      const phone = form.elements.phone.value.trim();
      const eventId = form.elements.event.value;
      const event = eventById(eventId);
      const registrations = getRegistrations();
      if (registrations.some((r) => r.eventId === eventId && r.email.toLowerCase() === email)) {
        $("#eventError").textContent = "This email already has a saved registration for this event.";
        $("#selectedEvent").setAttribute("aria-invalid", "true");
        $("#selectedEvent").focus();
        return;
      }
      const entry = { id: generateReference(), eventId, eventTitle: event.title, eventDate: event.date, name: fullName, email, phone, createdAt: new Date().toISOString() };
      if (!saveRegistrations([...registrations, entry])) return;
      updatePassCount();
      $("#registrationDialog").close();
      $("#successMessage").textContent = `Nice one, ${fullName}! Your demo registration has been saved in this browser.`;
      $("#successRef").textContent = entry.id;
      $("#successEvent").textContent = event.title + " · " + shortDate(event.date);
      openDialog("#successDialog");
    });
    $("#successViewPasses").addEventListener("click", () => {
      $("#successDialog").close();
      renderPasses();
      openDialog("#passesDialog");
    });
  }

  function updatePassCount() {
    const count = getRegistrations().length;
    $("#passCount").textContent = String(count);
    $("#passCount").setAttribute("aria-label", `${count} saved registrations`);
  }

  function renderPasses() {
    const list = $("#passesList");
    const registrations = getRegistrations();
    list.replaceChildren();
    $("#exportCsv").hidden = registrations.length === 0;
    if (registrations.length === 0) {
      const empty = document.createElement("div");
      empty.className = "passes-empty";
      empty.innerHTML = '<span aria-hidden="true">◇</span><h3>Nothing saved yet.</h3><p>Explore an event and select Register to save a demo spot.</p>';
      list.append(empty);
      return;
    }
    registrations.slice().reverse().forEach((registration) => {
      const card = document.createElement("article");
      card.className = "pass-card";
      const info = document.createElement("div");
      const title = document.createElement("h3"); title.textContent = registration.eventTitle || eventById(registration.eventId)?.title || "Saved event";
      const date = document.createElement("p"); date.textContent = registration.eventDate ? dateTime(registration.eventDate) : "Date unavailable";
      const person = document.createElement("p"); person.textContent = `${registration.name || "Guest"} · ${registration.email}`;
      const code = document.createElement("p"); code.className = "pass-code"; code.textContent = registration.id;
      const remove = document.createElement("button"); remove.className = "delete-pass"; remove.type = "button"; remove.textContent = "Remove"; remove.setAttribute("aria-label", `Remove registration ${registration.id}`);
      remove.addEventListener("click", () => {
        const newList = getRegistrations().filter((entry) => entry.id !== registration.id);
        if (saveRegistrations(newList)) { updatePassCount(); renderPasses(); showToast("Demo registration removed."); }
      });
      info.append(title, date, person, code);
      card.append(info, remove);
      list.append(card);
    });
  }

  function exportRegistrations() {
    const regs = getRegistrations();
    if (!regs.length) return;
    // Prefix spreadsheet formula-like values to avoid formula injection in CSV readers.
    const csvCell = (value) => {
      let cell = String(value ?? "");
      if (/^[\s]*[=+@-]/.test(cell)) cell = "'" + cell;
      return '"' + cell.replace(/"/g, '""') + '"';
    };
    const rows = [["Reference", "Event", "Event Date", "Name", "Email", "Phone", "Saved At"], ...regs.map((r) => [r.id, r.eventTitle, r.eventDate, r.name, r.email, r.phone, r.createdAt])];
    const csv = "\ufeff" + rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "k-explore-demo-registrations.csv";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    showToast("Your CSV file has been downloaded.");
  }

  function updateCountdown() {
    const now = Date.now();
    const next = events.filter((event) => new Date(event.date).getTime() > now).sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    const container = $("#countdown");
    if (!next) {
      container.textContent = "More events coming soon";
      $("#nextEventTitle").textContent = "Stay tuned for more";
      return;
    }
    $("#nextEventTitle").textContent = next.title;
    const distance = Math.max(0, new Date(next.date).getTime() - now);
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor(distance / 3600000) % 24;
    const minutes = Math.floor(distance / 60000) % 60;
    container.innerHTML = `<strong>${String(days).padStart(2,"0")}</strong><span>days</span><strong>${String(hours).padStart(2,"0")}</strong><span>hrs</span><strong>${String(minutes).padStart(2,"0")}</strong><span>min</span>`;
    container.setAttribute("aria-label", `${days} days, ${hours} hours and ${minutes} minutes until ${next.title}`);
  }

  function initializeDeepLink() {
    const hash = window.location.hash;
    if (hash.startsWith("#event-")) showDetails(hash.slice("#event-".length));
    window.addEventListener("hashchange", () => {
      if (window.location.hash.startsWith("#event-")) showDetails(window.location.hash.slice("#event-".length));
    });
  }

  function init() {
    initializeDialogs();
    initializeTheme();
    initializeNavigation();
    renderCategoryTiles();
    renderFilters();
    renderEvents();
    initializeEventSearch();
    initializeRegistration();
    $("#exportCsv").addEventListener("click", exportRegistrations);
    updatePassCount();
    $("#heroEventCount").textContent = `${String(events.length).padStart(2,"0")} CURATED EXPERIENCES`;
    updateCountdown();
    setInterval(updateCountdown, 30000);
    initializeDeepLink();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
