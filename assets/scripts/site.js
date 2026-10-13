(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var navigation = document.getElementById("primary-nav");

  function closeNavigation() {
    if (!toggle || !navigation) return;
    toggle.classList.remove("open");
    navigation.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("nav-open");
  }

  if (toggle && navigation) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.classList.toggle("open", !isOpen);
      navigation.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      document.body.classList.toggle("nav-open", !isOpen);
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNavigation();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNavigation();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) closeNavigation();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  if (document.body.dataset.page !== "home") return;

  var newsScroll = document.querySelector(".news-scroll");
  var newsItems = newsScroll ? Array.prototype.slice.call(newsScroll.querySelectorAll(".news-list > .compact-list-item")) : [];
  var maxVisibleNewsItems = 6;
  var publicationsScroll = document.querySelector(".recent-publications-scroll");
  var publicationItems = publicationsScroll ? Array.prototype.slice.call(publicationsScroll.querySelectorAll(".recent-publication-card")) : [];
  var maxVisiblePublicationItems = 10;

  function updateScrollableRegion(scrollElement, items, maxVisibleItems, shouldScroll) {
    if (!scrollElement) return;

    scrollElement.classList.toggle("is-scrollable", shouldScroll);
    scrollElement.style.removeProperty("max-height");
    if (!shouldScroll) {
      scrollElement.removeAttribute("tabindex");
      return;
    }

    var visibleItems = items.slice(0, maxVisibleItems);
    var firstRect = visibleItems[0].getBoundingClientRect();
    var lastRect = visibleItems[visibleItems.length - 1].getBoundingClientRect();
    var visibleHeight = lastRect.bottom - firstRect.top;

    scrollElement.style.maxHeight = Math.ceil(visibleHeight) + "px";
    scrollElement.setAttribute("tabindex", "0");
  }

  function updateCappedRegions() {
    updateScrollableRegion(newsScroll, newsItems, maxVisibleNewsItems, newsItems.length >= maxVisibleNewsItems);
    updateScrollableRegion(publicationsScroll, publicationItems, maxVisiblePublicationItems, publicationItems.length > maxVisiblePublicationItems);
  }

  updateCappedRegions();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateCappedRegions);
  }

  var cappedRegionResizeFrame;
  window.addEventListener("resize", function () {
    window.cancelAnimationFrame(cappedRegionResizeFrame);
    cappedRegionResizeFrame = window.requestAnimationFrame(updateCappedRegions);
  });

  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link[data-section]"));
  var sections = sectionLinks
    .map(function (link) { return document.getElementById(link.dataset.section); })
    .filter(Boolean);

  function setActiveSection(sectionId) {
    sectionLinks.forEach(function (link) {
      var isActive = link.dataset.section === sectionId;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visibleSections = new Map();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio);
        else visibleSections.delete(entry.target.id);
      });

      var current = Array.from(visibleSections.entries()).sort(function (a, b) {
        return b[1] - a[1];
      })[0];

      if (current) setActiveSection(current[0]);
    }, {
      rootMargin: "-18% 0px -58% 0px",
      threshold: [0.05, 0.2, 0.5, 0.8]
    });

    sections.forEach(function (section) { observer.observe(section); });
  }
}());
