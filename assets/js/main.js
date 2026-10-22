/**
 * My Tools Application
 * Industry-standard vanilla JavaScript router & UX enhancement.
 * Supports:
 * - Single Page Application view switching on index.html (#farmer, #fpo, etc.)
 * - Browser History (Back/Forward) with exact scroll restoration
 * - Smart BackButton: restores scroll when returning, falls back to home/parent
 * - Works offline, via file:// protocol, and on any static server
 */

(function () {
  'use strict';

  var isSpa = !!document.querySelector('.page-view');
  var pageViews = document.querySelectorAll('.page-view');
  var viewMap = {};
  pageViews.forEach(function (view) {
    var id = view.id.replace('view-', '');
    viewMap[id] = view;
  });

  // Track scroll positions for router restoration
  var scrollPositions = {};

  function getRouteFromHash() {
    var hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash) return 'home';

    // handle routes like farmer/financial-calculators or #/farmer
    var clean = hash.split('?')[0];
    if (clean.indexOf('farmer/') === 0) {
      clean = clean.replace('farmer/', '');
    }
    clean = clean.split('/')[0];
    return viewMap[clean] ? clean : (viewMap[hash] ? hash : 'home');
  }

  function setActiveView(pageId, pushState) {
    if (!viewMap[pageId]) {
      pageId = 'home';
    }

    // Save current view scroll position
    var currentActive = document.querySelector('.page-view.active');
    if (currentActive) {
      var currentId = currentActive.id.replace('view-', '');
      scrollPositions[currentId] = window.scrollY;
    }

    // Hide all, show target
    pageViews.forEach(function (view) {
      view.classList.remove('active');
    });

    var targetView = viewMap[pageId];
    targetView.classList.add('active');

    // Update document title
    var pageTitle = targetView.getAttribute('data-page-title') || 'My Tools';
    document.title = pageTitle;

    // Update URL hash
    var targetHash = pageId === 'home' ? '' : '#' + pageId;
    if (pushState) {
      if (window.location.hash !== targetHash) {
        if (targetHash === '') {
          history.pushState({ pageId: 'home' }, pageTitle, window.location.pathname + window.location.search);
        } else {
          history.pushState({ pageId: pageId }, pageTitle, targetHash);
        }
      }
    }

    // Scroll to top or restore
    if (scrollPositions[pageId] !== undefined) {
      window.scrollTo({ top: scrollPositions[pageId], behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  // Handle SPA routing
  if (isSpa) {
    // Initial route
    var initialRoute = getRouteFromHash();
    setActiveView(initialRoute, false);

    // Hash change / popstate listener
    window.addEventListener('popstate', function (e) {
      var route = (e.state && e.state.pageId) ? e.state.pageId : getRouteFromHash();
      setActiveView(route, false);
    });

    window.addEventListener('hashchange', function () {
      var route = getRouteFromHash();
      var currentActive = document.querySelector('.page-view.active');
      var currentId = currentActive ? currentActive.id.replace('view-', '') : '';
      if (route !== currentId) {
        setActiveView(route, false);
      }
    });

    // Intercept navigation links
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;

      // External links or new tabs
      if (link.target === '_blank' || link.getAttribute('rel') === 'noopener noreferrer') {
        return;
      }

      var pageTarget = link.getAttribute('data-page');
      if (!pageTarget) {
        var href = link.getAttribute('href') || '';
        if (href.endsWith('.html')) {
          var base = href.replace('.html', '');
          if (base === 'index') base = 'home';
          if (viewMap[base]) {
            pageTarget = base;
          }
        }
      }

      if (pageTarget && viewMap[pageTarget]) {
        e.preventDefault();

        // Check if it is a back button
        var isBackBtn = link.classList.contains('back-btn');
        if (isBackBtn && window.history.length > 1) {
          window.history.back();
        } else {
          setActiveView(pageTarget, true);
        }
      }
    });
  } else {
    // Standalone page handling: enhance Back Button
    document.addEventListener('click', function (e) {
      var backBtn = e.target.closest('.back-btn');
      if (!backBtn) return;

      if (window.history.length > 1 && document.referrer) {
        var toHref = backBtn.getAttribute('href');
        if (document.referrer.indexOf(toHref) !== -1 || document.referrer.indexOf('index.html') !== -1 || document.referrer.indexOf('farmer.html') !== -1) {
          e.preventDefault();
          window.history.back();
        }
      }
    });
  }

  // Handle keyboard focus accessibility
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var activeBackBtn = document.querySelector('.page-view.active .back-btn, .back-btn');
      if (activeBackBtn) {
        activeBackBtn.focus();
      }
    }
  });

})();
