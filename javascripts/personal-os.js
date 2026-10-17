(function() {
  "use strict";

  var root = document.querySelector("[data-personal-os-root]");
  if (!root || !window.PersonalOSCore || !window.ZddSearchCore) return;

  var apiRoot = "/__personal_os/api";
  var content = root.querySelector("[data-os-content]");
  var command = root.querySelector("[data-os-command]");
  var commandInput = root.querySelector("[data-os-command-input]");
  var commandResults = root.querySelector("[data-os-command-results]");
  var state = {model: null, searchIndex: null, searchPromise: null};
  var typeLabels = {
    "lecture-note": "Lecture Notes",
    "lecture-slide": "Slides",
    "textbook": "Books",
    "reference-book": "References",
    "reference": "References",
    "syllabus": "Course Information"
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString();
  }

  function formatSize(bytes) {
    var value = Number(bytes || 0);
    if (value < 1024 * 1024) return Math.max(1, Math.round(value / 1024)) + " KB";
    return (value / 1024 / 1024).toFixed(value > 100 * 1024 * 1024 ? 0 : 1) + " MB";
  }

  function currentRoute() {
    var params = new URLSearchParams(window.location.search);
    return {view: params.get("view") || "library", id: params.get("id") || "", query: params.get("q") || "", location: params.get("location") || ""};
  }

  function navigate(view, id, replace) {
    var url = new URL(window.location.href);
    url.search = "";
    if (view && view !== "library") url.searchParams.set("view", view);
    if (id) url.searchParams.set("id", id);
    (replace ? history.replaceState : history.pushState).call(history, {}, "", url.pathname + url.search);
    renderRoute();
  }

  function heading(eyebrow, title, description) {
    var header = el("header", "zdd-os__page-heading");
    header.appendChild(el("p", "zdd-os__eyebrow", eyebrow));
    header.appendChild(el("h1", "", title));
    if (description) header.appendChild(el("p", "zdd-os__lede", description));
    return header;
  }

  function formatsFor(document) {
    return window.PersonalOSCore.representationFormats(state.model, document);
  }

  function titleFor(document) {
    return window.PersonalOSCore.displayTitle(document);
  }

  function orderLabel(document, index) {
    var order = window.PersonalOSCore.parsedAcademicOrder(document);
    return order === null ? "—" : String(order).padStart(2, "0");
  }

  function documentRow(document, options, index) {
    var settings = options || {};
    var row = el("button", "zdd-os__document-row");
    row.type = "button";
    row.addEventListener("click", function() { navigate("document", document.id); });
    if (settings.numbered) {
      row.classList.add("zdd-os__document-row--numbered");
      row.appendChild(el("span", "zdd-os__document-order", orderLabel(document, index)));
    }
    var body = el("span", "zdd-os__document-row-body");
    var titleLine = el("span", "zdd-os__document-title-line");
    titleLine.appendChild(el("strong", "zdd-os__document-title", titleFor(document)));
    body.appendChild(titleLine);
    var context = [];
    if (settings.showCourse !== false) context.push(document.course);
    if (settings.showType !== false) context.push(typeLabels[document.documentType] || document.documentType);
    if (context.length) body.appendChild(el("span", "zdd-os__document-context", context.join(" · ")));
    row.appendChild(body);
    var formats = formatsFor(document);
    row.appendChild(el("span", "zdd-os__document-formats", formats.length ? formats.join(" · ") : "File"));
    return row;
  }

  function documentList(documents, options, emptyMessage) {
    var list = el("div", "zdd-os__document-list");
    documents.forEach(function(document, index) { list.appendChild(documentRow(document, options, index)); });
    if (!documents.length) list.appendChild(el("p", "zdd-os__empty", emptyMessage || "No documents in this view."));
    return list;
  }

  function sectionTitle(title, action) {
    var row = el("div", "zdd-os__section-title");
    row.appendChild(el("h2", "", title));
    if (action) row.appendChild(action);
    return row;
  }

  function renderLibrary() {
    var stats = window.PersonalOSCore.libraryStats(state.model);
    content.appendChild(heading("Knowledge library", "Library", formatNumber(stats.documents) + " documents · " + formatNumber(stats.courses) + " courses"));

    var focusCourseIds = ["machine-learning-theory", "mathematical-statistics", "numerical-pde", "natural-language-processing", "probability-theory"];
    var courseList = el("div", "zdd-os__course-grid zdd-os__course-grid--library");
    focusCourseIds.map(function(courseId) { return state.model.courseById[courseId]; }).filter(Boolean).forEach(function(course) {
      courseList.appendChild(courseCard(course));
    });
    var browse = el("button", "zdd-os__text-action", "Browse by subject →");
    browse.type = "button";
    browse.addEventListener("click", function() { navigate("courses"); });
    content.appendChild(sectionTitle("Courses", browse));
    content.appendChild(courseList);

    var focusDocuments = [];
    focusCourseIds.forEach(function(courseId) {
      focusDocuments = focusDocuments.concat(window.PersonalOSCore.documentsForCourse(state.model, courseId).slice(0, 2));
    });
    var button = el("button", "zdd-os__text-action", "Browse courses →");
    button.type = "button";
    button.addEventListener("click", function() { navigate("courses"); });
    content.appendChild(sectionTitle("Start here", button));
    content.appendChild(documentList(focusDocuments.slice(0, 10), {showCourse: true, showType: true}));
  }

  function courseCard(course) {
    var card = el("button", "zdd-os__course-card");
    card.type = "button";
    card.addEventListener("click", function() { navigate("course", course.id); });
    var monogram = course.name.split(/\s+/).map(function(part) { return part.charAt(0); }).join("").slice(0, 3).toUpperCase();
    card.appendChild(el("span", "zdd-os__course-mark", monogram));
    var body = el("span", "zdd-os__course-card-body");
    body.appendChild(el("strong", "", course.name));
    var details = [course.teacher, course.documentCount + " documents"].filter(Boolean).join(" · ");
    body.appendChild(el("span", "", details));
    card.appendChild(body);
    card.appendChild(el("span", "zdd-os__arrow", "→"));
    return card;
  }

  function renderCourses() {
    var directory = window.PersonalOSCore.courseDirectory(state.model);
    var courseCount = directory.reduce(function(total, subject) { return total + subject.courses.length; }, 0);
    content.appendChild(heading("Browse by subject", "Courses", courseCount + " courses across " + directory.length + " subject areas"));
    directory.forEach(function(subject) {
      var section = el("section", "zdd-os__course-directory-section");
      section.appendChild(sectionTitle(subject.label));
      var list = el("div", "zdd-os__course-directory-list");
      subject.courses.forEach(function(course) {
        var row = el("button", "zdd-os__course-directory-row");
        row.type = "button";
        row.addEventListener("click", function() { navigate("course", course.id); });
        row.appendChild(el("strong", "", course.name));
        row.appendChild(el("span", "", formatNumber(course.documentCount)));
        list.appendChild(row);
      });
      section.appendChild(list);
      if (subject.references.length) {
        section.appendChild(el("p", "zdd-os__course-directory-subtitle", "References"));
        var references = el("div", "zdd-os__course-directory-list zdd-os__course-directory-list--references");
        subject.references.forEach(function(course) {
          var reference = el("button", "zdd-os__course-directory-row", course.name);
          reference.type = "button";
          reference.addEventListener("click", function() { navigate("course", course.id); });
          reference.appendChild(el("span", "", formatNumber(course.documentCount)));
          references.appendChild(reference);
        });
        section.appendChild(references);
      }
      content.appendChild(section);
    });
  }

  function renderCourse(courseId) {
    var course = state.model.courseById[courseId];
    if (!course) return renderNotFound("Course");
    var offering = course.offeringIds.length ? state.model.offeringById[course.offeringIds[0]] : null;
    var groups = window.PersonalOSCore.courseDocumentGroups(state.model, courseId);
    var teachers = [];
    String(course.teacher || "").split(/\s*\/\s*/).concat(groups.series.map(function(series) { return series.teacher; })).filter(Boolean).forEach(function(teacher) {
      if (teachers.indexOf(teacher) < 0) teachers.push(teacher);
    });
    var description = [offering && offering.label, teachers.join(" · ")].filter(Boolean).join(" · ") || "No verified semester or instructor metadata.";
    content.appendChild(heading("Course", course.name, description));
    var summary = el("div", "zdd-os__course-summary");
    summary.appendChild(el("strong", "", course.documentCount + " documents"));
    var books = groups.sections.find(function(section) { return section.label === "Books"; });
    var references = groups.sections.find(function(section) { return section.label === "Reference Materials"; });
    var supplementary = groups.sections.find(function(section) { return section.label === "Supplementary Notes"; });
    var summaryParts = [];
    if (groups.series.length) summaryParts.push(groups.series.length + " lecture series");
    if (books) summaryParts.push(books.documents.length + " " + (books.documents.length === 1 ? "book" : "books"));
    if (references) summaryParts.push(references.documents.length + " " + (references.documents.length === 1 ? "reference" : "references"));
    if (supplementary) summaryParts.push(supplementary.documents.length + " supplementary notes");
    summary.appendChild(el("span", "", summaryParts.join(" · ")));
    content.appendChild(summary);
    groups.series.forEach(function(series) {
      var section = el("section", "zdd-os__course-section zdd-os__course-series");
      var label = sectionTitle(series.label);
      label.appendChild(el("span", "zdd-os__section-count", series.documents.length + " documents"));
      section.appendChild(label);
      section.appendChild(documentList(series.documents, {numbered: true, showCourse: false, showType: false}));
      content.appendChild(section);
    });
    groups.sections.forEach(function(group) {
      var section = el("section", "zdd-os__course-section");
      var label = sectionTitle(group.label);
      label.appendChild(el("span", "zdd-os__section-count", group.documents.length + " documents"));
      section.appendChild(label);
      section.appendChild(documentList(group.documents, {showCourse: false, showType: false}));
      content.appendChild(section);
    });
    if (course.topics && course.topics.length >= 3) {
      content.appendChild(sectionTitle("Topics"));
      var topics = el("div", "zdd-os__topics zdd-os__topics--quiet");
      course.topics.slice(0, 10).forEach(function(topic) { topics.appendChild(el("span", "", topic.replace(/-/g, " "))); });
      content.appendChild(topics);
    }
  }

  function appendHighlighted(parent, text, terms) {
    window.ZddSearchCore.highlightParts(text, terms).forEach(function(part) {
      var node = part.highlighted ? el("mark", "", part.text) : document.createTextNode(part.text);
      parent.appendChild(node);
    });
  }

  function searchResult(result, closeCommand) {
    var card = el("button", "zdd-os__search-result");
    card.type = "button";
    card.addEventListener("click", function() {
      if (closeCommand) closeSearch();
      history.pushState({}, "", result.url);
      renderRoute();
    });
    var top = el("span", "zdd-os__search-result-top");
    top.appendChild(el("strong", "", result.title));
    top.appendChild(el("span", "", result.subtitle));
    card.appendChild(top);
    if (result.section) card.appendChild(el("span", "zdd-os__search-section", result.section));
    var snippet = el("span", "zdd-os__search-snippet");
    appendHighlighted(snippet, result.snippet, result.highlights);
    card.appendChild(snippet);
    var location = result.location.page ? "Page " + result.location.page : result.location.slide ? "Slide " + result.location.slide : "Section";
    card.appendChild(el("span", "zdd-os__search-location", (result.contentType || "document") + " · " + location));
    return card;
  }

  function loadSearchIndex() {
    if (state.searchIndex) return Promise.resolve(state.searchIndex);
    if (!state.searchPromise) {
      state.searchPromise = fetch(apiRoot + "/search-index", {credentials: "same-origin", cache: "no-store"}).then(function(response) {
        if (!response.ok) throw new Error("Private index unavailable");
        return response.json();
      }).then(function(index) {
        if (index.scope !== "private") throw new Error("Wrong search scope");
        state.searchIndex = index;
        return index;
      });
    }
    return state.searchPromise;
  }

  function runSearch(query, target, options) {
    clear(target);
    if (!String(query || "").trim()) {
      target.appendChild(el("p", "zdd-os__empty", "Type to search titles, sections, and extracted passages."));
      return Promise.resolve([]);
    }
    target.appendChild(el("p", "zdd-os__empty", "Searching the local private index…"));
    return loadSearchIndex().then(function(index) {
      var settings = {scope: "private", limit: options && options.limit || 24, perDocument: options && options.perDocument || 2};
      if (options && options.documentId) settings.documentId = options.documentId;
      var results = window.ZddSearchCore.search(index, query, settings);
      clear(target);
      results.forEach(function(result) { target.appendChild(searchResult(result, options && options.command)); });
      if (!results.length) target.appendChild(el("p", "zdd-os__empty", "No matching private passages."));
      return results;
    }).catch(function(error) {
      clear(target);
      target.appendChild(el("p", "zdd-os__empty zdd-os__error", error.message));
      return [];
    });
  }

  function searchPanel(documentId) {
    var panel = el("section", "zdd-os__inline-search");
    if (documentId) panel.classList.add("zdd-os__inline-search--document");
    var form = el("form", "zdd-os__inline-search-form");
    var input = el("input", ""); input.type = "search"; input.placeholder = documentId ? "Search in document…" : "Search everything";
    var button = el("button", "", "Search"); button.type = "submit";
    form.appendChild(input); form.appendChild(button); panel.appendChild(form);
    var results = el("div", "zdd-os__search-list"); panel.appendChild(results);
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      runSearch(input.value, results, {documentId: documentId, limit: documentId ? 60 : 30, perDocument: documentId ? 60 : 2});
    });
    return panel;
  }

  function renderSearch() {
    content.appendChild(heading("Knowledge library", "Search", "Search titles, sections, and extracted passages. Results show at most two passages per document."));
    content.appendChild(searchPanel());
  }

  function metadataField(label, value) {
    var normalized = Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value || "").trim();
    if (!normalized) return null;
    var field = el("div", "zdd-os__metadata-field");
    field.appendChild(el("dt", "", label));
    field.appendChild(el("dd", "", normalized));
    return field;
  }

  function simpleMarkdown(text) {
    var fragment = document.createDocumentFragment();
    var paragraph = [];
    function flush() {
      if (!paragraph.length) return;
      fragment.appendChild(el("p", "", paragraph.join(" ").replace(/[*_`]/g, "")));
      paragraph = [];
    }
    String(text || "").split(/\r?\n/).forEach(function(line) {
      var match = line.match(/^\s{0,3}(#{1,4})\s+(.+)$/);
      if (match) {
        flush();
        fragment.appendChild(el("h" + Math.min(4, match[1].length + 1), "", match[2].replace(/[*_`]/g, "")));
      } else if (!line.trim()) {
        flush();
      } else {
        paragraph.push(line.trim());
      }
    });
    flush();
    return fragment;
  }

  function renderDocument(documentId) {
    var documentData = state.model.documentById[documentId];
    if (!documentData) return renderNotFound("Document");
    var course = state.model.courseById[documentData.courseId];
    var offering = course && course.offeringIds.length ? state.model.offeringById[course.offeringIds[0]] : null;
    var documentHeader = heading(typeLabels[documentData.documentType] || documentData.documentType, titleFor(documentData), documentData.course);
    documentHeader.classList.add("zdd-os__page-heading--document");
    content.appendChild(documentHeader);
    var layout = el("div", "zdd-os__document-layout");
    var main = el("div", "zdd-os__document-viewer");
    var side = el("aside", "zdd-os__document-sidebar");
    var representations = (documentData.representationIds || []).map(function(id) { return state.model.representationById[id]; }).filter(Boolean);
    var preferred = representations.find(function(item) { return item.previewKind === "pdf"; }) || representations.find(function(item) { return item.previewKind === "markdown"; });
    if (preferred && preferred.previewKind === "pdf") {
      var route = currentRoute();
      main.classList.add("zdd-os__document-viewer--pdf");
      var frame = el("iframe", "zdd-os__pdf-frame");
      frame.title = titleFor(documentData) + " PDF";
      frame.src = apiRoot + "/file/" + encodeURIComponent(preferred.fileBlobId) + (route.location ? "#page=" + encodeURIComponent(route.location) + "&view=FitH" : "#view=FitH");
      main.appendChild(frame);
    } else if (preferred && preferred.previewKind === "markdown") {
      var markdown = el("article", "zdd-os__markdown-preview");
      markdown.appendChild(el("p", "zdd-os__empty", "Loading Markdown…"));
      main.appendChild(markdown);
      fetch(apiRoot + "/text/" + encodeURIComponent(preferred.fileBlobId), {credentials: "same-origin", cache: "no-store"}).then(function(response) { return response.json(); }).then(function(payload) {
        clear(markdown); markdown.appendChild(simpleMarkdown(payload.text));
      }).catch(function() { clear(markdown); markdown.appendChild(el("p", "zdd-os__error", "Markdown preview unavailable.")); });
    } else {
      main.appendChild(el("div", "zdd-os__viewer-empty", "Browser preview is unavailable for this format. Use the original-file link in Representations."));
    }

    side.appendChild(sectionTitle("Metadata"));
    var metadata = el("dl", "zdd-os__metadata");
    var metadataLabels = Object.create(null);
    [
      ["Course", documentData.course],
      ["Type", typeLabels[documentData.documentType] || documentData.documentType],
      ["Teacher", course && course.teacher],
      ["Semester", offering && offering.label],
      ["Topics", documentData.topics || []],
      ["Source", (documentData.sourceFilenames || []).join(" · ")]
    ].forEach(function(item) {
      if (metadataLabels[item[0]]) return;
      var field = metadataField(item[0], item[1]);
      if (field) {
        metadataLabels[item[0]] = true;
        metadata.appendChild(field);
      }
    });
    side.appendChild(metadata);
    side.appendChild(sectionTitle("Representations"));
    var representationList = el("div", "zdd-os__representation-list");
    representations.forEach(function(item) {
      var card = el("div", "zdd-os__representation");
      var label = el("div", ""); label.appendChild(el("strong", "", item.format)); label.appendChild(el("span", "", formatSize(item.size))); card.appendChild(label);
      var link = el("a", "", item.previewKind === "pdf" ? "Open original" : "Download original");
      link.href = apiRoot + (item.previewKind === "pdf" ? "/file/" : "/download/") + encodeURIComponent(item.fileBlobId);
      link.target = "_blank"; link.rel = "noopener"; card.appendChild(link);
      representationList.appendChild(card);
    });
    side.appendChild(representationList);
    content.appendChild(searchPanel(documentId));
    layout.appendChild(main); layout.appendChild(side); content.appendChild(layout);
  }

  function renderNotFound(label) {
    content.appendChild(heading("Not found", label + " unavailable", "The requested local catalog entity does not exist."));
  }

  function renderRoute() {
    if (!state.model) return;
    clear(content);
    var route = currentRoute();
    content.classList.toggle("zdd-os__main--document", route.view === "document");
    root.querySelectorAll("[data-os-view]").forEach(function(button) {
      button.classList.toggle("is-active", button.dataset.osView === route.view || (route.view === "course" && button.dataset.osView === "courses") || (route.view === "document" && button.dataset.osView === "library"));
    });
    if (route.view === "library") renderLibrary();
    else if (route.view === "courses") renderCourses();
    else if (route.view === "course") renderCourse(route.id);
    else if (route.view === "search") renderSearch();
    else if (route.view === "document") renderDocument(route.id);
    else renderNotFound("View");
    content.focus({preventScroll: true});
    window.scrollTo(0, 0);
  }

  function renderUnavailable(error) {
    clear(content);
    var panel = el("section", "zdd-os__locked");
    panel.appendChild(el("span", "zdd-os__locked-icon", "⌁"));
    panel.appendChild(el("h1", "", "Local library is offline"));
    panel.appendChild(el("p", "", "Start the local zddOS service and reload this page."));
    var code = el("code", "", "python personal_os_server.py");
    panel.appendChild(code);
    panel.appendChild(el("small", "", error && error.message || "Private API unavailable"));
    content.appendChild(panel);
  }

  function openSearch() {
    command.hidden = false;
    document.body.classList.add("zdd-os-command-open");
    window.setTimeout(function() { commandInput.focus(); }, 10);
  }

  function closeSearch() {
    command.hidden = true;
    document.body.classList.remove("zdd-os-command-open");
    commandInput.value = "";
    clear(commandResults);
    commandResults.appendChild(el("p", "zdd-os__empty", "Type to search the private passage index."));
  }

  root.querySelectorAll("[data-os-view]").forEach(function(button) { button.addEventListener("click", function() { navigate(button.dataset.osView); }); });
  root.querySelector("[data-os-link='library']").addEventListener("click", function(event) { event.preventDefault(); navigate("library"); });
  root.querySelectorAll("[data-os-command-close]").forEach(function(button) { button.addEventListener("click", closeSearch); });
  commandInput.addEventListener("input", function() { runSearch(commandInput.value, commandResults, {command: true, limit: 20, perDocument: 2}); });
  document.addEventListener("keydown", function(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
    if (event.key === "Escape" && !command.hidden) closeSearch();
  });
  window.addEventListener("popstate", renderRoute);

  fetch(apiRoot + "/catalog", {credentials: "same-origin", cache: "no-store"}).then(function(response) {
    if (!response.ok) throw new Error("Local catalog unavailable");
    return response.json();
  }).then(function(catalog) {
    if (catalog.scope !== "private") throw new Error("Catalog scope mismatch");
    state.model = window.PersonalOSCore.createModel(catalog);
    renderRoute();
  }).catch(renderUnavailable);
})();
