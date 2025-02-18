import { html as at, render as ft, customElement as mt } from "@umbraco-cms/backoffice/external/lit";
import { UmbHeaderAppButtonElement as _t } from "@umbraco-cms/backoffice/components";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, V = k.ShadowRoot && (k.ShadyCSS === void 0 || k.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (r) => new ht(typeof r == "string" ? r : r + "", void 0, q), yt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new ht(e, r, q);
}, vt = (r, t) => {
  if (V) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = k.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, F = V ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return gt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: At, defineProperty: bt, getOwnPropertyDescriptor: Et, getOwnPropertyNames: St, getOwnPropertySymbols: wt, getPrototypeOf: xt } = Object, m = globalThis, G = m.trustedTypes, Ct = G ? G.emptyScript : "", L = m.reactiveElementPolyfillSupport, w = (r, t) => r, M = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Ct : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, K = (r, t) => !At(r, t), Q = { attribute: !0, type: String, converter: M, reflect: !1, hasChanged: K };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class v extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Q) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && bt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Et(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const h = i == null ? void 0 : i.call(this);
      n.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const t = xt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, s = [...St(e), ...wt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(F(i));
    } else t !== void 0 && e.push(F(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return vt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EC(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : M).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), h = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((n = o.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? o.converter : M;
      this._$Em = i, this[i] = h.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? K)(this[t], e)) return;
      this.P(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, o] of i) o.wrapped !== !0 || this._$AL.has(n) || this[n] === void 0 || this.P(n, this[n], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[w("elementProperties")] = /* @__PURE__ */ new Map(), v[w("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: v }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x = globalThis, N = x.trustedTypes, X = N ? N.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, lt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + f, Pt = `<${ct}>`, y = document, P = () => y.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", J = Array.isArray, Ut = (r) => J(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", B = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, et = />/g, _ = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, it = /"/g, dt = /^(?:script|style|textarea|title)$/i, Tt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), j = Tt(1), A = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), g = y.createTreeWalker(y, 129);
function ut(r, t) {
  if (!J(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const Ot = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = S;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, u, l = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, u = o.exec(a), u !== null); ) p = o.lastIndex, o === S ? u[1] === "!--" ? o = tt : u[1] !== void 0 ? o = et : u[2] !== void 0 ? (dt.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = _) : u[3] !== void 0 && (o = _) : o === _ ? u[0] === ">" ? (o = i ?? S, l = -1) : u[1] === void 0 ? l = -2 : (l = o.lastIndex - u[2].length, c = u[1], o = u[3] === void 0 ? _ : u[3] === '"' ? it : st) : o === it || o === st ? o = _ : o === tt || o === et ? o = S : (o = _, i = void 0);
    const $ = o === _ && r[h + 1].startsWith("/>") ? " " : "";
    n += o === S ? a + Pt : l >= 0 ? (s.push(c), a.slice(0, l) + lt + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [ut(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class T {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, u] = Ot(t, e);
    if (this.el = T.createElement(c, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(lt)) {
          const p = u[o++], $ = i.getAttribute(l).split(f), H = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: H[2], strings: $, ctor: H[1] === "." ? kt : H[1] === "?" ? Mt : H[1] === "@" ? Nt : R }), i.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (dt.test(i.tagName)) {
          const l = i.textContent.split(f), p = l.length - 1;
          if (p > 0) {
            i.textContent = N ? N.emptyScript : "";
            for (let $ = 0; $ < p; $++) i.append(l[$], P()), g.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[p], P());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ct) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = y.createElement("template");
    return s.innerHTML = t, s;
  }
}
function b(r, t, e = r, s) {
  var o, h;
  if (t === A) return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const n = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = b(r, i._$AS(r, t.values), i, s)), t;
}
class Ht {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? y).importNode(e, !0);
    g.currentNode = i;
    let n = g.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new O(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new Rt(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== (a == null ? void 0 : a.index) && (n = g.nextNode(), o++);
    }
    return g.currentNode = y, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class O {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = b(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ut(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(ut(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const o = new Ht(i, this), h = o.u(this.options);
      o.p(e), this.T(h), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = rt.get(t.strings);
    return e === void 0 && rt.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new O(this.O(P()), this.O(P()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = b(this, t, e, 0), o = !U(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = b(this, h[s + a], e, a), c === A && (c = this._$AH[a]), o || (o = !U(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class kt extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Mt extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class Nt extends R {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = b(this, t, e, 0) ?? d) === A) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Rt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    b(this, t);
  }
}
const z = x.litHtmlPolyfillSupport;
z == null || z(T, O), (x.litHtmlVersions ?? (x.litHtmlVersions = [])).push("3.2.1");
const It = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new O(t.insertBefore(P(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let C = class extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = It(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return A;
  }
};
var nt;
C._$litElement$ = !0, C.finalized = !0, (nt = globalThis.litElementHydrateSupport) == null || nt.call(globalThis, { LitElement: C });
const D = globalThis.litElementPolyfillSupport;
D == null || D({ LitElement: C });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = { attribute: !0, type: String, converter: M, reflect: !1, hasChanged: K }, jt = (r = Bt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, r);
    }, init(h) {
      return h !== void 0 && this.P(o, void 0, r), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function zt(r) {
  return (t, e) => typeof e == "object" ? jt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o ? { ...s, wrapped: !0 } : s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Y(r) {
  return zt({ ...r, state: !0, attribute: !1 });
}
var Dt = Object.defineProperty, Wt = Object.getOwnPropertyDescriptor, I = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Wt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Dt(t, e, i), i;
};
let E = class extends C {
  constructor() {
    super(...arguments), this.messages = [], this.userInput = "", this.isLoading = !1;
  }
  firstUpdated() {
    var r;
    this._chatBody = (r = this.shadowRoot) == null ? void 0 : r.querySelector(".chatbot-body"), this.isLoading = !0, setTimeout(() => {
      this.messages = [
        ...this.messages,
        { sender: "bot", text: "Hello! How can I assist you today?" }
      ], this.isLoading = !1;
    }, 500);
  }
  updated(r) {
    r.has("messages") && this._scrollToBottom();
  }
  render() {
    return j`
      <div class="chatbot-container">
        <div class="chatbot-body">
          ${this.messages.map(
      (r) => j`
              <div class="chat-message ${r.sender}-message">
                ${r.text}
              </div>
            `
    )}
          ${this.isLoading ? j`
            <div class="loader-container">
              <uui-loader style="color: #006eff"></uui-loader>
            </div>
          ` : ""}
        </div>
        <div class="chatbot-footer">
          <uui-input
            type="text"
            .value=${this.userInput}
            @input=${this._handleInput}
            @keypress=${this._handleKeyPress}
            placeholder="Type a message..."
          ></uui-input>
          <uui-button 
            look="primary" 
            label="Send"
            @click=${this._sendMessage}
          >Send</uui-button>
        </div>
      </div>
    `;
  }
  _handleInput(r) {
    this.userInput = r.target.value;
  }
  _handleKeyPress(r) {
    r.key === "Enter" && this._sendMessage();
  }
  async _sendMessage() {
    if (this.userInput.trim()) {
      this.messages = [...this.messages, { sender: "user", text: this.userInput }];
      const r = this.userInput;
      this.userInput = "", this.isLoading = !0;
      try {
        const e = await (await fetch("/api/chatapi/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: r })
        })).json();
        this.messages = [...this.messages, { sender: "bot", text: e.response }];
      } catch (t) {
        console.error("Error:", t), this.messages = [
          ...this.messages,
          { sender: "bot", text: "Sorry, there was an error processing your request." }
        ];
      } finally {
        this.isLoading = !1;
      }
    }
  }
  _scrollToBottom() {
    this._chatBody && (this._chatBody.scrollTop = this._chatBody.scrollHeight);
  }
};
E.styles = yt`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0; /* Important for nested flex containers */
    }

    .chatbot-container {
      display: flex;
      flex-direction: column;
      min-height:91vh;
      flex-wrap: wrap;
      align-content: space-between;    
    }

    .chatbot-body {
      flex: 1 1 auto;
      overflow-y: auto;
      padding: 1rem;
      background: var(--uui-color-surface);
      min-height: 0; /* Important for nested flex containers */
    }

    .chat-message {
      padding: 8px;
      margin-bottom: 5px;
      border-radius: 5px;
      word-break: break-word;
      animation: fadeIn 0.3s ease-in;
      opacity: 1;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .user-message {
      background-color: var(--uui-color-positive-alt);
      text-align: right;
    }

    .bot-message {
      background-color: var(--uui-color-surface-alt);
    }

    .chatbot-footer {
      flex: 0 0 auto;
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid var(--uui-color-divider);
      background: var(--uui-color-surface);
      position: sticky;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
    }

    uui-input {
      flex: 1;
    }

    .loader-container {
      display: flex;
      justify-content: center;
      margin: 1rem 0;
    }
  `;
I([
  Y()
], E.prototype, "messages", 2);
I([
  Y()
], E.prototype, "userInput", 2);
I([
  Y()
], E.prototype, "isLoading", 2);
E = I([
  Lt("chatbot-component")
], E);
var Vt = Object.getOwnPropertyDescriptor, pt = (r) => {
  throw TypeError(r);
}, qt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Vt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = o(i) || i);
  return i;
}, Kt = (r, t, e) => t.has(r) || pt("Cannot " + e), Jt = (r, t, e) => t.has(r) ? pt("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), Yt = (r, t, e) => (Kt(r, t, "access private method"), e), W, $t;
const Zt = "umb-chat-header-app";
let ot = class extends _t {
  constructor() {
    super(...arguments), Jt(this, W);
  }
  render() {
    return at`
      <uui-button 
        look="primary" 
        label="Chat" 
        compact
        @click=${Yt(this, W, $t)}>
        <uui-icon name="icon-chat"></uui-icon>
      </uui-button>
    `;
  }
};
W = /* @__PURE__ */ new WeakSet();
$t = function() {
  const r = at`
      <uui-modal-sidebar size="small" @click=${(e) => e.stopPropagation()}>
        <div class="sidebar-container">
          <uui-box headline="Umbraco BOT">
           <div style="margin-top: -8px; cursor: pointer;" slot="header-actions"> 
           <uui-icon-registry-essential>
            <uui-icon style="color: red;" name="not_existing" @click=${(e) => {
    var i;
    const s = e.target.closest("uui-modal-sidebar");
    (i = s == null ? void 0 : s.parentElement) == null || i.remove();
  }}> <svg xmlns="http://www.w3.org/2000/svg" slot="fallback" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </uui-icon>
            </uui-icon-registry-essential></div>
            <chatbot-component></chatbot-component>
          </uui-box>
        </div>
      </uui-modal-sidebar>
    `, t = document.createElement("uui-modal-container");
  t.innerHTML = "", t.addEventListener("click", (e) => {
    e.target === t && t.remove();
  }), ft(r, t), document.body.appendChild(t);
};
ot = qt([
  mt(Zt)
], ot);
export {
  ot as UmbChatHeaderAppElement,
  ot as element
};
//# sourceMappingURL=chat-header-app.element-p9XfPCTu.js.map
