"use strict";

var assert = require("assert");
var osCore = require("../docs/javascripts/personal-os-core.js");
var searchCore = require("../docs/javascripts/zdd-search-core.js");

var catalog = {
  scope: "private",
  entities: {
    documents: [
      {id: "nlp-14", title: "14. Multi-Modal Models", displayTitle: "Multi-Modal Models", courseId: "nlp", course: "Natural Language Processing", documentType: "lecture-slide", representationIds: ["pdf", "pptx"], topics: ["multimodal-models"], modifiedAt: "2026-01-02", seriesId: "nlp-2025", seriesLabel: "2025 · Lecture Series", seriesTeacher: "Mingming Sun", seriesOrder: 10, explicitOrder: 14},
      {id: "npde", title: "Numerical PDE", courseId: "npde", course: "Numerical PDE", documentType: "lecture-note", representationIds: ["npde-pdf"], topics: ["maximum-principle"], modifiedAt: "2026-01-01"}
    ],
    documentVersions: [],
    representations: [
      {id: "pdf", format: "PDF"},
      {id: "pptx", format: "PPTX"},
      {id: "npde-pdf", format: "PDF"}
    ],
    courses: [
      {id: "nlp", name: "Natural Language Processing", documentCount: 1},
      {id: "npde", name: "Numerical PDE", documentCount: 1}
    ],
    courseOfferings: [],
    collections: [{id: "focus", name: "Focus", documentIds: ["nlp-14", "npde"]}],
    topics: [],
    relations: []
  }
};

var model = osCore.createModel(catalog);
assert.deepStrictEqual(osCore.libraryStats(model), {documents: 2, courses: 2, collections: 1, representations: 3});
assert.deepStrictEqual(osCore.representationFormats(model, model.documentById["nlp-14"]), ["PDF", "PPTX"]);
assert.strictEqual(osCore.documentsForCourse(model, "nlp").length, 1);
assert.strictEqual(osCore.documentsForCollection(model, "focus").length, 2);
assert.strictEqual(osCore.filterDocuments(model, "maximum principle")[0].id, "npde");
assert.strictEqual(osCore.recentDocuments(model, 1)[0].id, "nlp-14");
assert.strictEqual(osCore.displayTitle(model.documentById["nlp-14"]), "Multi-Modal Models");
assert.strictEqual(osCore.courseDocumentGroups(model, "nlp").series.length, 1);
assert.deepStrictEqual(osCore.courseDocumentGroups(model, "nlp").series[0].documents.map(function(document) { return document.id; }), ["nlp-14"]);

var directoryCatalog = {
  scope: "private",
  entities: {
    documents: [], documentVersions: [], representations: [], courseOfferings: [], collections: [], topics: [], relations: [],
    courses: [
      {id: "machine-learning-theory", name: "Machine Learning Theory", documentCount: 25},
      {id: "probability-theory", name: "Probability Theory", documentCount: 12},
      {id: "numerical-pde", name: "Numerical PDE", documentCount: 54},
      {id: "applied-mathematics-reference", name: "Applied Mathematics References", documentCount: 2},
      {id: "mathematical-analysis", name: "Mathematical Analysis", documentCount: 4},
      {id: "quantum-mechanics", name: "Quantum Mechanics", documentCount: 22},
      {id: "russian", name: "Russian", documentCount: 13},
      {id: "ai-qualification-exam", name: "AI Qualification Exam", documentCount: 12}
    ]
  }
};
var directory = osCore.courseDirectory(osCore.createModel(directoryCatalog));
assert.deepStrictEqual(directory.map(function(subject) { return subject.label; }), [
  "AI & Machine Learning", "Probability & Statistics", "Applied & Computational Mathematics", "Pure Mathematics", "Physics", "Languages", "Qualification Exams"
]);
assert.strictEqual(directory.find(function(subject) { return subject.id === "applied-computational-mathematics"; }).references[0].id, "applied-mathematics-reference");
assert.ok(!directory.some(function(subject) { return subject.courses.some(function(course) { return course.id === "applied-mathematics-reference"; }); }));

function titlesInOrder(titles) {
  return osCore.sortDocuments(titles.map(function(title, index) { return {id: String(index), title: title}; })).map(function(document) { return document.title; });
}

assert.deepStrictEqual(titlesInOrder(["Lecture10", "Lecture2", "Lecture1", "Lecture3"]), ["Lecture1", "Lecture2", "Lecture3", "Lecture10"]);
assert.deepStrictEqual(titlesInOrder(["Week10", "Week02", "Week1", "Week4"]), ["Week1", "Week02", "Week4", "Week10"]);
assert.deepStrictEqual(titlesInOrder(["Chapter 10", "Chapter 2", "Chapter 0", "Chapter 1"]), ["Chapter 0", "Chapter 1", "Chapter 2", "Chapter 10"]);
assert.deepStrictEqual(titlesInOrder(["第10讲", "第2讲", "第1讲"]), ["第1讲", "第2讲", "第10讲"]);
assert.deepStrictEqual(osCore.sortDocuments([
  {id: "later-title", title: "Alpha", explicitOrder: 2},
  {id: "first", title: "Zulu", explicitOrder: 1}
]).map(function(document) { return document.id; }), ["first", "later-title"]);

var privateIndex = {
  scope: "private",
  documents: [
    {id: "npde", title: "Numerical PDE", subtitle: "Numerical PDE", course: "Numerical PDE", documentType: "lecture-note", url: "/os/?view=document&id=npde"},
    {id: "nlp", title: "Natural Language Processing", subtitle: "NLP", course: "Natural Language Processing", documentType: "lecture-slide", url: "/os/?view=document&id=nlp"}
  ],
  passages: [
    {id: "p1", documentId: "npde", section: "Discrete Maximum Principle", text: "The discrete maximum principle controls interior extrema.", url: "/os/?view=document&id=npde", location: {page: 12, passageIndex: 0}},
    {id: "p2", documentId: "npde", section: "Stability", text: "The maximum principle gives stability for the finite difference method.", url: "/os/?view=document&id=npde", location: {page: 13, passageIndex: 1}},
    {id: "p3", documentId: "npde", section: "Applications", text: "Another maximum principle application.", url: "/os/?view=document&id=npde", location: {page: 14, passageIndex: 2}},
    {id: "p4", documentId: "nlp", section: "Transformer", text: "Multi-modal transformer architecture.", url: "/os/?view=document&id=nlp", location: {slide: 8, passageIndex: 0}}
  ]
};

assert.deepStrictEqual(searchCore.search(privateIndex, "maximum principle"), []);
var globalResults = searchCore.search(privateIndex, "maximum principle", {scope: "private", limit: 20, perDocument: 2});
assert.strictEqual(globalResults.length, 2);
assert.strictEqual(globalResults[0].documentType, "lecture-note");
assert.ok(globalResults[0].snippet.toLowerCase().includes("maximum principle"));
assert.strictEqual(globalResults[0].location.page, 12);
var documentResults = searchCore.search(privateIndex, "maximum principle", {scope: "private", documentId: "npde", limit: 20, perDocument: 20});
assert.strictEqual(documentResults.length, 3);
assert.strictEqual(searchCore.search(privateIndex, "transformer architecture", {scope: "private"})[0].documentId, "nlp");
var chineseIndex = {
  scope: "private",
  documents: [{id: "zh", title: "\u504f\u5fae\u5206\u65b9\u7a0b\u6570\u503c\u89e3", subtitle: "Numerical PDE", documentType: "lecture-note"}],
  passages: [{id: "zh:1", documentId: "zh", section: "\u79bb\u6563\u6700\u5927\u503c\u539f\u7406", text: "\u7531\u79bb\u6563\u6700\u5927\u503c\u539f\u7406\u53ef\u4ee5\u5f97\u5230\u7a33\u5b9a\u6027\u4f30\u8ba1\u3002", location: {page: 7, passageIndex: 0}}]
};
var chineseResults = searchCore.search(chineseIndex, "\u6700\u5927\u503c\u539f\u7406", {scope: "private"});
assert.strictEqual(chineseResults.length, 1);
assert.ok(chineseResults[0].snippet.indexOf("\u6700\u5927\u503c\u539f\u7406") >= 0);
assert.deepStrictEqual(searchCore.search({scope: "public", documents: [], passages: []}, "private", {scope: "private"}), []);

console.log("personal-os-core: all tests passed");
