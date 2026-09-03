import { LEGAL_SLUGS } from '../types/legal.js';

const AKN_NS = 'http://docs.oasis-open.org/legaldocml/ns/akn/3.0';

export interface AknParseResult {
  html: string;
  firstParagraph: string;
}

const BLOCK_PARENTS = new Set(['hcontainer', 'mainBody', 'list', 'table', 'tr']);

export function aknToHtml(xml: string): AknParseResult {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');

  if (doc.querySelector('parsererror')) {
    return { html: '', firstParagraph: '' };
  }

  const mainBody =
    doc.getElementsByTagNameNS(AKN_NS, 'mainBody')[0] ??
    findByLocalName(doc, 'mainBody');

  if (!mainBody) {
    return { html: '', firstParagraph: '' };
  }

  const html = Array.from(mainBody.childNodes).map(renderNode).join('');
  const firstP = findByLocalName(mainBody, 'p');
  const firstParagraph = firstP ? (firstP.textContent ?? '').replace(/\s+/g, ' ').trim() : '';

  return { html, firstParagraph };
}

function findByLocalName(root: Element | Document, name: string): Element | null {
  for (const el of Array.from(root.getElementsByTagName('*'))) {
    if (el.localName === name) {
      return el;
    }
  }

  return null;
}

function renderNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? '';
    const parent = (node.parentElement as Element | null)?.localName ?? '';
    if (BLOCK_PARENTS.has(parent) && !text.trim()) {
      return '';
    }
    return linkifyLegalPaths(escapeHtml(text));
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return '';
  }

  const el = node as Element;

  switch (el.localName) {
    case 'hcontainer':
      return renderChildren(el);
    case 'heading': {
      const sectionId = (el.parentElement as Element | null)?.getAttribute('eId') ?? '';
      const idAttr = sectionId ? ` id="${escapeAttr(sectionId)}"` : '';
      return `<h2${idAttr}>${renderChildren(el)}</h2>`;
    }
    case 'p':
      return `<p>${renderChildren(el)}</p>`;
    case 'list':
      return `<ul>${renderChildren(el)}</ul>`;
    case 'item':
      return `<li>${renderChildren(el)}</li>`;
    case 'table':
      return `<div class="overflow-x-auto"><table>${renderChildren(el)}</table></div>`;
    case 'tr':
      return `<tr>${renderChildren(el)}</tr>`;
    case 'th':
      return `<th>${renderChildren(el)}</th>`;
    case 'td':
      return `<td>${renderChildren(el)}</td>`;
    case 'b':
      return `<strong>${renderChildren(el)}</strong>`;
    default:
      return renderChildren(el);
  }
}

function renderChildren(el: Element): string {
  return Array.from(el.childNodes).map(renderNode).join('');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(value: string): string {
  return escapeHtml(value);
}

function linkifyLegalPaths(escapedText: string): string {
  return escapedText.replace(/\/legal\/([a-z0-9-]+)/g, (match, slug: string) => {
    if (!(LEGAL_SLUGS as readonly string[]).includes(slug)) {
      return match;
    }
    return `<a href="/legal/${slug}">${match}</a>`;
  });
}
