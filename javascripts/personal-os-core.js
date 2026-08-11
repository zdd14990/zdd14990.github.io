(function(root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.PersonalOSCore = api;
})(typeof window !== "undefined" ? window : globalThis, function() {
  "use strict";

  function entityMap(items) {
    return (items || []).reduce(function(map, item) {
      if (item && item.id) map[item.id] = item;
      return map;
    }, Object.create(null));
  }

  function createModel(catalog) {
    var entities = catalog && catalog.entities || {};
    return {
      catalog: catalog || {},
      documents: entities.documents || [],
      versions: entities.documentVersions || [],
      representations: entities.representations || [],
      courses: entities.courses || [],
      offerings: entities.courseOfferings || [],
      collections: entities.collections || [],
      topics: entities.topics || [],
      relations: entities.relations || [],
      documentById: entityMap(entities.documents),
      versionById: entityMap(entities.documentVersions),
      representationById: entityMap(entities.representations),
      courseById: entityMap(entities.courses),
      offeringById: entityMap(entities.courseOfferings),
      collectionById: entityMap(entities.collections)
    };
  }

  function libraryStats(model) {
    return {
      documents: model.documents.length,
      courses: model.courses.length,
      collections: model.collections.length,
      representations: model.representations.length
    };
  }

  var courseSubjectDefinitions = [
    {id: "ai-machine-learning", label: "AI & Machine Learning", courseIds: ["ai4math", "machine-learning-theory", "deep-learning", "optimization-for-ml", "natural-language-processing"]},
    {id: "probability-statistics", label: "Probability & Statistics", courseIds: ["probability-theory", "mathematical-statistics", "high-dimensional-statistics", "stochastic-processes"]},
    {id: "applied-computational-mathematics", label: "Applied & Computational Mathematics", courseIds: ["numerical-pde", "numerical-ode", "numerical-analysis", "finite-element-methods", "mathematical-optimization", "asymptotic-analysis"], referenceIds: ["applied-mathematics-reference"]},
    {id: "pure-mathematics", label: "Pure Mathematics", courseIds: ["mathematical-analysis", "higher-algebra"]},
    {id: "physics", label: "Physics", courseIds: ["quantum-mechanics", "electrodynamics"]},
    {id: "languages", label: "Languages", courseIds: ["russian", "french"]},
    {id: "qualification-exams", label: "Qualification Exams", courseIds: ["ai-qualification-exam", "applied-math-qualification-exam", "probability-qualification-exam"]}
  ];

  function courseDirectory(model) {
    return courseSubjectDefinitions.map(function(subject) {
      return {
        id: subject.id,
        label: subject.label,
        courses: subject.courseIds.map(function(id) { return model.courseById[id]; }).filter(Boolean),
        references: (subject.referenceIds || []).map(function(id) { return model.courseById[id]; }).filter(Boolean)
      };
    }).filter(function(subject) { return subject.courses.length || subject.references.length; });
  }

  function documentsForCourse(model, courseId) {
    return sortDocuments(model.documents.filter(function(document) { return document.courseId === courseId; }));
  }

  function documentsForCollection(model, collectionId) {
    var collection = model.collectionById[collectionId];
    if (!collection) return [];
    return (collection.documentIds || []).map(function(id) { return model.documentById[id]; }).filter(Boolean);
  }

  function representationFormats(model, document) {
    var seen = Object.create(null);
    return (document.representationIds || []).map(function(id) {
      return model.representationById[id];
    }).filter(Boolean).map(function(item) {
      return item.format;
    }).filter(function(format) {
      if (!format || seen[format]) return false;
      seen[format] = true;
      return true;
    });
  }

  var academicCollator = new Intl.Collator(["en", "zh-Hans"], {numeric: true, sensitivity: "base"});

  function displayTitle(document) {
    return String(document && (document.displayTitle || document.title) || "Untitled");
  }

  function hasExplicitOrder(document) {
    return Boolean(document) && document.explicitOrder !== null && document.explicitOrder !== undefined && document.explicitOrder !== "" && Number.isFinite(Number(document.explicitOrder));
  }

  function parsedAcademicOrder(document) {
    if (hasExplicitOrder(document)) return Number(document.explicitOrder);
    var title = displayTitle(document);
    var patterns = [
      /(?:^|\b)(?:lecture|week|chapter)\s*0*(\d+)\b/i,
      /^\s*0*(\d+)\s*[.、)_-]/,
      /第\s*0*(\d+)\s*(?:讲|章|周|节)/
    ];
    for (var index = 0; index < patterns.length; index += 1) {
      var match = title.match(patterns[index]);
      if (match) return Number(match[1]);
    }
    return null;
  }

  function naturalAcademicCompare(left, right) {
    var leftExplicit = hasExplicitOrder(left);
    var rightExplicit = hasExplicitOrder(right);
    if (leftExplicit !== rightExplicit) return leftExplicit ? -1 : 1;
    var leftOrder = parsedAcademicOrder(left);
    var rightOrder = parsedAcademicOrder(right);
    var leftOrdered = leftOrder !== null;
    var rightOrdered = rightOrder !== null;
    if (leftOrdered !== rightOrdered) return leftOrdered ? -1 : 1;
    if (leftOrdered && leftOrder !== rightOrder) return leftOrder - rightOrder;
    var leftDate = String(left && left.documentDate || "");
    var rightDate = String(right && right.documentDate || "");
    if (leftDate || rightDate) {
      if (!leftDate) return 1;
      if (!rightDate) return -1;
      var dateOrder = leftDate.localeCompare(rightDate);
      if (dateOrder) return dateOrder;
    }
    return academicCollator.compare(displayTitle(left), displayTitle(right)) || String(left && left.id || "").localeCompare(String(right && right.id || ""));
  }

  function sortDocuments(documents) {
    return (documents || []).slice().sort(naturalAcademicCompare);
  }

  function courseDocumentGroups(model, courseId) {
    var documents = documentsForCourse(model, courseId);
    var seriesById = Object.create(null);
    var sections = {
      "Books": [],
      "Supplementary Notes": [],
      "Reference Materials": [],
      "Other Materials": []
    };
    documents.forEach(function(document) {
      if (document.seriesId) {
        if (!seriesById[document.seriesId]) {
          seriesById[document.seriesId] = {
            id: document.seriesId,
            label: document.seriesLabel || "Lecture Series",
            teacher: document.seriesTeacher || "",
            order: Number(document.seriesOrder || 999),
            documents: []
          };
        }
        seriesById[document.seriesId].documents.push(document);
      } else if (document.documentType === "textbook" || document.documentType === "reference-book") {
        sections["Books"].push(document);
      } else if (document.documentType === "lecture-note" || document.documentType === "lecture-slide") {
        sections["Supplementary Notes"].push(document);
      } else if (document.documentType === "reference") {
        sections["Reference Materials"].push(document);
      } else {
        sections["Other Materials"].push(document);
      }
    });
    var series = Object.keys(seriesById).map(function(id) {
      seriesById[id].documents = sortDocuments(seriesById[id].documents);
      return seriesById[id];
    }).sort(function(left, right) {
      return left.order - right.order || academicCollator.compare(left.label, right.label);
    });
    var materialSections = Object.keys(sections).map(function(label) {
      return {label: label, documents: sortDocuments(sections[label])};
    }).filter(function(section) { return section.documents.length; });
    return {series: series, sections: materialSections};
  }

  function documentsByType(documents) {
    var groups = (documents || []).reduce(function(result, document) {
      var key = document.documentType || "reference";
      if (!result[key]) result[key] = [];
      result[key].push(document);
      return result;
    }, Object.create(null));
    Object.keys(groups).forEach(function(key) { groups[key] = sortDocuments(groups[key]); });
    return groups;
  }

  function recentDocuments(model, limit) {
    return model.documents.slice().sort(function(left, right) {
      return String(right.modifiedAt || "").localeCompare(String(left.modifiedAt || ""));
    }).slice(0, limit || 8);
  }

  function filterDocuments(model, query) {
    var terms = String(query || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return model.documents.slice();
    return model.documents.filter(function(document) {
      var text = [displayTitle(document), document.title, document.course, document.documentType].concat(document.sourceFilenames || []).concat(document.topics || []).join(" ").toLocaleLowerCase();
      return terms.every(function(term) { return text.indexOf(term) >= 0; });
    });
  }

  return {
    createModel: createModel,
    libraryStats: libraryStats,
    courseDirectory: courseDirectory,
    documentsForCourse: documentsForCourse,
    documentsForCollection: documentsForCollection,
    representationFormats: representationFormats,
    displayTitle: displayTitle,
    parsedAcademicOrder: parsedAcademicOrder,
    naturalAcademicCompare: naturalAcademicCompare,
    sortDocuments: sortDocuments,
    courseDocumentGroups: courseDocumentGroups,
    documentsByType: documentsByType,
    recentDocuments: recentDocuments,
    filterDocuments: filterDocuments
  };
});
