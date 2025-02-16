import { html as gt, css as yt, state as vt, customElement as bt } from "@umbraco-cms/backoffice/external/lit";
import { UmbHeaderAppButtonElement as nt } from "@umbraco-cms/backoffice/components";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, q = M.ShadowRoot && (M.ShadyCSS === void 0 || M.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = Symbol(), Z = /* @__PURE__ */ new WeakMap();
let at = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (q && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Z.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Z.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (o) => new at(typeof o == "string" ? o : o + "", void 0, V), ht = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((s, i, n) => s + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[n + 1], o[0]);
  return new at(e, o, V);
}, Et = (o, t) => {
  if (q) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = M.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, F = q ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return At(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: St, defineProperty: xt, getOwnPropertyDescriptor: wt, getOwnPropertyNames: Pt, getOwnPropertySymbols: Ct, getPrototypeOf: Ot } = Object, _ = globalThis, G = _.trustedTypes, Ut = G ? G.emptyScript : "", j = _.reactiveElementPolyfillSupport, x = (o, t) => o, N = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? Ut : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, K = (o, t) => !St(o, t), Q = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: K };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
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
      i !== void 0 && xt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = wt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(r) {
      const h = i == null ? void 0 : i.call(this);
      n.call(this, r), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Q;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Ot(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, s = [...Pt(e), ...Ct(e)];
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
    return Et(t, this.constructor.elementStyles), t;
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
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : N).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), h = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((n = r.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? r.converter : N;
      this._$Em = i, this[i] = h.fromAttribute(e, r.type), this._$Em = null;
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
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) r.wrapped !== !0 || this._$AL.has(n) || this[n] === void 0 || this.P(n, this[n], r);
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[x("elementProperties")] = /* @__PURE__ */ new Map(), v[x("finalized")] = /* @__PURE__ */ new Map(), j == null || j({ ReactiveElement: v }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis, R = w.trustedTypes, X = R ? R.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, lt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + f, Tt = `<${ct}>`, y = document, C = () => y.createComment(""), O = (o) => o === null || typeof o != "object" && typeof o != "function", J = Array.isArray, Ht = (o) => J(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", D = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Y = /-->/g, tt = />/g, m = RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), et = /'/g, st = /"/g, pt = /^(?:script|style|textarea|title)$/i, Mt = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), it = Mt(1), b = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), ot = /* @__PURE__ */ new WeakMap(), g = y.createTreeWalker(y, 129);
function dt(o, t) {
  if (!J(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const Nt = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = S;
  for (let h = 0; h < e; h++) {
    const a = o[h];
    let c, d, l = -1, u = 0;
    for (; u < a.length && (r.lastIndex = u, d = r.exec(a), d !== null); ) u = r.lastIndex, r === S ? d[1] === "!--" ? r = Y : d[1] !== void 0 ? r = tt : d[2] !== void 0 ? (pt.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = m) : d[3] !== void 0 && (r = m) : r === m ? d[0] === ">" ? (r = i ?? S, l = -1) : d[1] === void 0 ? l = -2 : (l = r.lastIndex - d[2].length, c = d[1], r = d[3] === void 0 ? m : d[3] === '"' ? st : et) : r === st || r === et ? r = m : r === Y || r === tt ? r = S : (r = m, i = void 0);
    const $ = r === m && o[h + 1].startsWith("/>") ? " " : "";
    n += r === S ? a + Tt : l >= 0 ? (s.push(c), a.slice(0, l) + lt + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [dt(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const h = t.length - 1, a = this.parts, [c, d] = Nt(t, e);
    if (this.el = U.createElement(c, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(lt)) {
          const u = d[r++], $ = i.getAttribute(l).split(f), H = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: H[2], strings: $, ctor: H[1] === "." ? kt : H[1] === "?" ? It : H[1] === "@" ? Bt : I }), i.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (pt.test(i.tagName)) {
          const l = i.textContent.split(f), u = l.length - 1;
          if (u > 0) {
            i.textContent = R ? R.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(l[$], C()), g.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[u], C());
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
function A(o, t, e = o, s) {
  var r, h;
  if (t === b) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = O(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = A(o, i._$AS(o, t.values), i, s)), t;
}
class Rt {
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
    let n = g.nextNode(), r = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let c;
        a.type === 2 ? c = new T(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new jt(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      r !== (a == null ? void 0 : a.index) && (n = g.nextNode(), r++);
    }
    return g.currentNode = y, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = A(this, t, e), O(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== b && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ht(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && O(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(dt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new Rt(i, this), h = r.u(this.options);
      r.p(e), this.T(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ot.get(t.strings);
    return e === void 0 && ot.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    J(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new T(this.O(C()), this.O(C()), this, this.options)) : s = e[i], s._$AI(n), i++;
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
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = A(this, t, e, 0), r = !O(t) || t !== this._$AH && t !== b, r && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = A(this, h[s + a], e, a), c === b && (c = this._$AH[a]), r || (r = !O(c) || c !== this._$AH[a]), c === p ? t = p : t !== p && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class kt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class It extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Bt extends I {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = A(this, t, e, 0) ?? p) === b) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    A(this, t);
  }
}
const z = w.litHtmlPolyfillSupport;
z == null || z(U, T), (w.litHtmlVersions ?? (w.litHtmlVersions = [])).push("3.2.1");
const Dt = (o, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new T(t.insertBefore(C(), n), n, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let P = class extends v {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Dt(e, this.renderRoot, this.renderOptions);
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
    return b;
  }
};
var rt;
P._$litElement$ = !0, P.finalized = !0, (rt = globalThis.litElementHydrateSupport) == null || rt.call(globalThis, { LitElement: P });
const L = globalThis.litElementPolyfillSupport;
L == null || L({ LitElement: P });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zt = (o) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(o, t);
  }) : customElements.define(o, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = { attribute: !0, type: String, converter: N, reflect: !1, hasChanged: K }, Wt = (o = Lt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), n.set(e.name, o), s === "accessor") {
    const { name: r } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(r, a, o);
    }, init(h) {
      return h !== void 0 && this.P(r, void 0, o), h;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(h) {
      const a = this[r];
      t.call(this, h), this.requestUpdate(r, a, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function ut(o) {
  return (t, e) => typeof e == "object" ? Wt(o, t, e) : ((s, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, r ? { ...s, wrapped: !0 } : s), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $t(o) {
  return ut({ ...o, state: !0, attribute: !1 });
}
const qt = ht`
  .chatbot-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid #ccc;
  }

  .chatbot-header {
    background: #f0f0f0;
    padding: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  .chatbot-body {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    background: #fafafa;
  }

  .chat-message {
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 5px;
  }

  .user-message {
    background-color: #d1e7fd;
    text-align: right;
  }

  .bot-message {
    background-color: #e0e0e0;
  }

  .chatbot-footer {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  .chatbot-footer input {
    flex: 1;
    padding: 5px;
    margin-right: 5px;
  }
`;
var Vt = Object.defineProperty, Kt = Object.getOwnPropertyDescriptor, B = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Kt(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && Vt(t, e, i), i;
};
let E = class extends P {
  constructor() {
    super(...arguments), this.messages = [
      { sender: "bot", text: "Hello! How can I assist you today?" }
    ], this.userInput = "", this.isOpen = !1;
  }
  firstUpdated() {
    var o;
    this._chatBody = (o = this.shadowRoot) == null ? void 0 : o.querySelector(".chatbot-body");
  }
  updated(o) {
    o.has("messages") && this._scrollToBottom();
  }
  render() {
    return it`
      <div class="chatbot-container">
        <div class="chatbot-body">
          ${this.messages.map(
      (o) => it`
              <div class="chat-message ${o.sender}-message">
                ${o.text}
              </div>
            `
    )}
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
  _handleInput(o) {
    this.userInput = o.target.value;
  }
  _handleKeyPress(o) {
    o.key === "Enter" && this._sendMessage();
  }
  async _sendMessage() {
    if (this.userInput.trim()) {
      this.messages = [...this.messages, { sender: "user", text: this.userInput }];
      debugger;
      try {
        const t = await (await fetch("/api/chatapi/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: this.userInput })
        })).json();
        this.messages = [...this.messages, { sender: "bot", text: t.response }];
      } catch (o) {
        console.error("Error:", o), this.messages = [
          ...this.messages,
          { sender: "bot", text: "Sorry, there was an error processing your request." }
        ];
      }
      this.userInput = "";
    }
  }
  _scrollToBottom() {
    this._chatBody && (this._chatBody.scrollTop = this._chatBody.scrollHeight);
  }
};
E.styles = [
  qt,
  ht`
      :host {
        display: block;
        height: 100%;
        position: relative;
      }

      .chatbot-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
      }

      .chatbot-body {
        flex: 1 1 auto;
        overflow-y: auto;
        padding: 1rem;
        background: var(--uui-color-surface);
        height: 500px;
        min-height: 470px;
      }

      .chat-message {
        padding: 8px;
        margin-bottom: 5px;
        border-radius: 5px;
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
      }
    `
];
B([
  $t()
], E.prototype, "messages", 2);
B([
  $t()
], E.prototype, "userInput", 2);
B([
  ut({ type: Boolean })
], E.prototype, "isOpen", 2);
E = B([
  zt("chatbot-component")
], E);
var Jt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, ft = (o) => {
  throw TypeError(o);
}, _t = (o, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Zt(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (i = (s ? r(t, e, i) : r(i)) || i);
  return s && i && Jt(t, e, i), i;
}, Ft = (o, t, e) => t.has(o) || ft("Cannot " + e), Gt = (o, t, e) => t.has(o) ? ft("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, e), Qt = (o, t, e) => (Ft(o, t, "access private method"), e), W, mt;
const Xt = "umb-chat-header-app";
let k = class extends nt {
  constructor() {
    super(...arguments), Gt(this, W), this._popoverOpen = !1;
  }
  render() {
    return gt`
      <uui-button 
        id="chat-button"
        popovertarget="chat-menu-popover" 
        look="primary" 
        label="Chat" 
        compact>
        <uui-icon name="icon-chat"></uui-icon>
      </uui-button>

      <uui-popover-container 
        id="chat-menu-popover" 
        placement="bottom-end"
        @toggle=${Qt(this, W, mt)}>
        <umb-popover-layout>
          <uui-box>
            <chatbot-component .isOpen=${this._popoverOpen}></chatbot-component>
          </uui-box>
        </umb-popover-layout>
      </uui-popover-container>
    `;
  }
};
W = /* @__PURE__ */ new WeakSet();
mt = function(o) {
  this._popoverOpen = o.newState === "open";
  const t = this.renderRoot.querySelector("chatbot-component");
  t && (t.isOpen = this._popoverOpen);
};
k.styles = [
  nt.styles,
  yt`
      uui-popover-container {
        width: 350px;
      }

      umb-popover-layout {
        height: 600px;
        max-height: 90vh;
      }
      
      uui-box {
        height: 100%;
      }
      
      chatbot-component {
        height: 100%;
      }
    `
];
_t([
  vt()
], k.prototype, "_popoverOpen", 2);
k = _t([
  bt(Xt)
], k);
export {
  k as UmbChatHeaderAppElement,
  k as element
};
//# sourceMappingURL=chat-header-app.element-BGiGSeEa.js.map
