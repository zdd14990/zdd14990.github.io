(function () {
  "use strict";
  var article = document.querySelector('.md-content__inner');
  var isArticle = document.body.classList.contains('article-layout');
  var media = document.getElementById('zdd-media-dialog');
  if (!article || !isArticle || !media) return;
  var dates = article.querySelector('.zdd-reading-dates');
  var title = article.querySelector('h1');
  if (dates && title) title.after(dates);
  media.querySelector('[data-reader-close]').addEventListener('click', function () { media.close(); });
  media.addEventListener('click', function (event) {
    if (event.target !== media) return;
    var box = media.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) media.close();
  });

  function expandButton(label) {
    var button = document.createElement('button');
    button.type = 'button'; button.className = 'md-icon zdd-media-expand';
    button.title = label; button.setAttribute('aria-label', label); button.setAttribute('aria-haspopup', 'dialog');
    button.appendChild(document.getElementById('zdd-icon-expand').content.cloneNode(true));
    return button;
  }
  function openMedia(node, title, download) {
    var viewport = media.querySelector('.zdd-media-viewport'); viewport.replaceChildren();
    var clone = node.cloneNode(true);
    if (node.tagName === 'TABLE') clone.style.minWidth = Math.max(640, node.scrollWidth) + 'px';
    clone.removeAttribute('id'); clone.querySelectorAll('[id]').forEach(function (element) { element.removeAttribute('id'); });
    viewport.appendChild(clone);
    media.querySelector('strong').textContent = title;
    var link = media.querySelector('[data-media-download]'); link.hidden = !download;
    if (download) link.href = download;
    media.showModal();
  }
  function enhanceMedia() {
    if (!isArticle) return;
    article.querySelectorAll('img:not(.twemoji)').forEach(function (img) {
      if (img.closest('a') || img.dataset.readingEnhanced) return;
      if (!img.complete) { img.addEventListener('load', enhanceMedia, {once: true}); return; }
      if (img.naturalWidth < 150 && img.clientWidth < 150) return;
      img.dataset.readingEnhanced = 'true';
      var button = expandButton('放大图示'); img.insertAdjacentElement('afterend', button);
      button.addEventListener('click', function () { openMedia(img, img.alt || '图示', img.currentSrc || img.src); });
    });
    article.querySelectorAll('table').forEach(function (table) {
      if (table.dataset.readingEnhanced) return;
      table.dataset.readingEnhanced = 'true';
      var wrap = table.closest('.md-typeset__scrollwrap') || table.parentElement;
      var button = expandButton('展开表格'); wrap.insertAdjacentElement('beforebegin', button);
      function check() {
        var wide = table.scrollWidth > Math.min(article.clientWidth, wrap.clientWidth) + 2;
        button.hidden = !wide; table.classList.toggle('zdd-wide-table', wide);
      }
      new ResizeObserver(check).observe(wrap); check();
      button.addEventListener('click', function () { openMedia(table, table.caption?.textContent || '表格', ''); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhanceMedia);
  else enhanceMedia();
})();
