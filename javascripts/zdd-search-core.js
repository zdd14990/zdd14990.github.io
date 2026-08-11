(function(root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.ZddSearchCore = api;
})(typeof window !== "undefined" ? window : globalThis, function() {
  "use strict";

  function normalize(text) {
    return String(text || "").toLocaleLowerCase();
  }

  function cleanText(text) {
    return String(text || "")
      .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/(?:https?:\/\/|www\.)\S+/g, " ")
      .replace(/[`*_>#|{}\[\]]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function queryTerms(query) {
    var seen = Object.create(null);
    return String(query || "").trim().split(/\s+/).map(function(term) {
      return normalize(term.replace(/^["']+|["']+$/g, ""));
    }).filter(function(term) {
      if (!term || seen[term]) return false;
      seen[term] = true;
      return true;
    });
  }

  function countOccurrences(text, term) {
    var haystack = normalize(text);
    var needle = normalize(term);
    var count = 0;
    var from = 0;
    if (!needle) return count;
    while ((from = haystack.indexOf(needle, from)) >= 0) {
      count += 1;
      from += Math.max(1, needle.length);
    }
    return count;
  }

  function firstMatch(text, terms) {
    var haystack = normalize(text);
    var best = -1;
    terms.forEach(function(term) {
      var index = haystack.indexOf(term);
      if (index >= 0 && (best < 0 || index < best)) best = index;
    });
    return best;
  }

  function snippetMatch(text, terms) {
    var haystack = normalize(text);
    if (terms.length > 1) {
      var phraseIndex = haystack.indexOf(terms.join(" "));
      if (phraseIndex >= 0) return phraseIndex;
      var events = [];
      terms.forEach(function(term, termIndex) {
        var from = 0;
        while ((from = haystack.indexOf(term, from)) >= 0 && events.length < 240) {
          events.push({index: from, termIndex: termIndex, length: term.length});
          from += Math.max(1, term.length);
        }
      });
      events.sort(function(left, right) { return left.index - right.index; });
      var counts = Object.create(null);
      var covered = 0;
      var left = 0;
      var bestStart = -1;
      var bestWidth = Infinity;
      events.forEach(function(event, right) {
        counts[event.termIndex] = (counts[event.termIndex] || 0) + 1;
        if (counts[event.termIndex] === 1) covered += 1;
        while (covered === terms.length && left <= right) {
          var width = event.index + event.length - events[left].index;
          if (width < bestWidth) {
            bestWidth = width;
            bestStart = events[left].index;
          }
          counts[events[left].termIndex] -= 1;
          if (!counts[events[left].termIndex]) covered -= 1;
          left += 1;
        }
      });
      if (bestStart >= 0) return bestStart;
    }
    return firstMatch(text, terms);
  }

  function sentenceStart(text, matchIndex, preferredStart) {
    var boundary = -1;
    var floor = Math.max(0, matchIndex - 120);
    for (var index = matchIndex - 1; index >= floor; index -= 1) {
      if (/[。！？.!?；;\n]/.test(text.charAt(index))) {
        boundary = index + 1;
        break;
      }
    }
    if (boundary >= preferredStart) return boundary;
    var space = text.indexOf(" ", preferredStart);
    return space >= 0 && space < matchIndex ? space + 1 : preferredStart;
  }

  function sentenceEnd(text, preferredEnd) {
    var ceiling = Math.min(text.length, preferredEnd + 80);
    for (var index = preferredEnd; index < ceiling; index += 1) {
      if (/[。！？.!?；;]/.test(text.charAt(index))) return index + 1;
    }
    var space = text.lastIndexOf(" ", preferredEnd);
    return space > preferredEnd - 50 ? space : preferredEnd;
  }

  function makeSnippet(text, terms, maxLength) {
    var source = cleanText(text);
    var limit = Math.max(80, Number(maxLength) || 240);
    if (!source) return "";
    if (source.length <= limit) return source;

    var matchIndex = snippetMatch(source, terms);
    if (matchIndex < 0) matchIndex = 0;
    var start = Math.max(0, matchIndex - Math.round(limit * 0.34));
    start = sentenceStart(source, matchIndex, start);
    var end = Math.min(source.length, start + limit);
    end = sentenceEnd(source, end);
    if (end - start > limit + 80) end = start + limit + 80;

    var snippet = source.slice(start, end).trim();
    if (start > 0) snippet = "…" + snippet;
    if (end < source.length) snippet += "…";
    return snippet;
  }

  function highlightRanges(text, terms) {
    var source = String(text || "");
    var normalized = normalize(source);
    var ranges = [];
    terms.slice().sort(function(left, right) {
      return right.length - left.length;
    }).forEach(function(term) {
      var from = 0;
      while (term && (from = normalized.indexOf(term, from)) >= 0) {
        ranges.push({start: from, end: from + term.length});
        from += Math.max(1, term.length);
      }
    });
    ranges.sort(function(left, right) {
      return left.start - right.start || right.end - left.end;
    });

    return ranges.reduce(function(merged, range) {
      var last = merged[merged.length - 1];
      if (last && range.start <= last.end) {
        last.end = Math.max(last.end, range.end);
      } else {
        merged.push({start: range.start, end: range.end});
      }
      return merged;
    }, []);
  }

  function highlightParts(text, terms) {
    var source = String(text || "");
    var ranges = highlightRanges(source, terms || []);
    var parts = [];
    var cursor = 0;
    ranges.forEach(function(range) {
      if (range.start > cursor) parts.push({text: source.slice(cursor, range.start), highlighted: false});
      parts.push({text: source.slice(range.start, range.end), highlighted: true});
      cursor = range.end;
    });
    if (cursor < source.length) parts.push({text: source.slice(cursor), highlighted: false});
    if (!parts.length && source) parts.push({text: source, highlighted: false});
    return parts;
  }

  function buildLocatedUrl(url, query) {
    var value = String(url || "/");
    try {
      var parsed = new URL(value, "https://zdd.local/");
      if (query) parsed.searchParams.set("zdd-highlight", String(query).trim());
      return parsed.pathname + parsed.search + parsed.hash;
    } catch (error) {
      return value;
    }
  }

  function documentMap(documents) {
    return (documents || []).reduce(function(map, document) {
      if (document && document.id) map[document.id] = document;
      return map;
    }, Object.create(null));
  }

  function searchableFields(document, passage) {
    return {
      title: cleanText(document.title),
      subtitle: cleanText(document.subtitle),
      section: cleanText(passage.section),
      breadcrumb: cleanText((passage.breadcrumb || []).join(" ")),
      text: cleanText(passage.text),
      taxonomy: cleanText((document.categories || []).concat(document.tags || []).concat([document.course || "", document.documentType || ""]).join(" "))
    };
  }

  function fieldScore(fields, terms, rawQuery) {
    var score = 0;
    var aggregate = Object.keys(fields).map(function(key) { return fields[key]; }).join(" ");
    var query = normalize(rawQuery).trim();
    if (!terms.every(function(term) { return normalize(aggregate).indexOf(term) >= 0; })) return -1;

    terms.forEach(function(term) {
      score += countOccurrences(fields.title, term) * 18;
      score += countOccurrences(fields.section, term) * 13;
      score += countOccurrences(fields.breadcrumb, term) * 7;
      score += countOccurrences(fields.subtitle, term) * 6;
      score += countOccurrences(fields.taxonomy, term) * 5;
      score += Math.min(8, countOccurrences(fields.text, term)) * 2;
    });
    if (query && normalize(fields.section).indexOf(query) >= 0) score += 42;
    if (query && normalize(fields.title).indexOf(query) >= 0) score += 30;
    if (query && normalize(fields.text).indexOf(query) >= 0) score += 26;
    else if (query && normalize(aggregate).indexOf(query) >= 0) score += 7;
    if (terms.every(function(term) { return normalize(fields.text).indexOf(term) >= 0; })) score += 6;
    return score;
  }

  function snippetSource(fields, terms) {
    var candidates = [fields.text, fields.section, fields.title, fields.subtitle, fields.breadcrumb];
    for (var index = 0; index < candidates.length; index += 1) {
      if (firstMatch(candidates[index], terms) >= 0) return candidates[index];
    }
    return fields.text || fields.section || fields.title;
  }

  function search(index, query, options) {
    var settings = options || {};
    var limit = Math.max(1, Number(settings.limit) || 12);
    var perDocument = Math.max(1, Number(settings.perDocument) || 2);
    var expectedScope = settings.scope || "public";
    var terms = queryTerms(query);
    if (!index || index.scope !== expectedScope || !terms.length) return [];

    var documents = documentMap(index.documents);
    var candidates = [];
    (index.passages || []).forEach(function(passage) {
      if (settings.documentId && passage.documentId !== settings.documentId) return;
      var document = documents[passage.documentId];
      if (!document) return;
      var fields = searchableFields(document, passage);
      var score = fieldScore(fields, terms, query);
      if (score < 0) return;

      var passageField = [fields.section, fields.breadcrumb, fields.text].join(" ");
      var onlyDocumentMetadata = !terms.some(function(term) {
        return normalize(passageField).indexOf(term) >= 0;
      });
      var passageIndex = Number(passage.location && passage.location.passageIndex) || 0;
      if (onlyDocumentMetadata && passageIndex > 0) return;

      var section = passage.section && normalize(passage.section) !== normalize(document.title)
        ? passage.section
        : "";
      candidates.push({
        id: passage.id,
        documentId: document.id,
        sourceType: document.sourceType || document.type || "document",
        contentType: document.contentType || "article",
        documentType: document.documentType || document.contentType || "article",
        course: document.course || document.subtitle || "",
        title: document.title || "Untitled",
        subtitle: document.subtitle || "",
        section: section,
        snippet: makeSnippet(snippetSource(fields, terms), terms, settings.snippetLength || 240),
        highlights: terms.slice(),
        url: buildLocatedUrl(passage.url || document.url, query),
        location: passage.location || {},
        breadcrumb: passage.breadcrumb || [],
        date: document.date || "",
        tags: (document.tags || []).slice(),
        score: score
      });
    });

    candidates.sort(function(left, right) {
      var leftIndex = Number(left.location && left.location.passageIndex) || 0;
      var rightIndex = Number(right.location && right.location.passageIndex) || 0;
      return right.score - left.score || leftIndex - rightIndex || left.title.localeCompare(right.title);
    });

    var counts = Object.create(null);
    var seen = Object.create(null);
    var results = [];
    candidates.some(function(result) {
      var key = result.documentId + "|" + (result.location.anchor || "") + "|" + result.snippet;
      if (seen[key]) return false;
      if ((counts[result.documentId] || 0) >= perDocument) return false;
      seen[key] = true;
      counts[result.documentId] = (counts[result.documentId] || 0) + 1;
      results.push(result);
      return results.length >= limit;
    });
    return results;
  }

  return {
    normalize: normalize,
    cleanText: cleanText,
    queryTerms: queryTerms,
    makeSnippet: makeSnippet,
    highlightParts: highlightParts,
    buildLocatedUrl: buildLocatedUrl,
    search: search
  };
});
