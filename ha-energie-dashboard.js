const ee = globalThis, Te = ee.ShadowRoot && (ee.ShadyCSS === void 0 || ee.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ce = /* @__PURE__ */ Symbol(), Ie = /* @__PURE__ */ new WeakMap();
let $a = class {
  constructor(t, a, s) {
    if (this._$cssResult$ = !0, s !== Ce) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = a;
  }
  get styleSheet() {
    let t = this.o;
    const a = this.t;
    if (Te && t === void 0) {
      const s = a !== void 0 && a.length === 1;
      s && (t = Ie.get(a)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ie.set(a, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Wa = (e) => new $a(typeof e == "string" ? e : e + "", void 0, Ce), Zt = (e, ...t) => {
  const a = e.length === 1 ? e[0] : t.reduce((s, n, i) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[i + 1], e[0]);
  return new $a(a, e, Ce);
}, Fa = (e, t) => {
  if (Te) e.adoptedStyleSheets = t.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of t) {
    const s = document.createElement("style"), n = ee.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = a.cssText, e.appendChild(s);
  }
}, Ue = Te ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let a = "";
  for (const s of t.cssRules) a += s.cssText;
  return Wa(a);
})(e) : e;
const { is: Ia, defineProperty: Ua, getOwnPropertyDescriptor: Va, getOwnPropertyNames: Ga, getOwnPropertySymbols: Za, getPrototypeOf: Ka } = Object, he = globalThis, Ve = he.trustedTypes, Ya = Ve ? Ve.emptyScript : "", qa = he.reactiveElementPolyfillSupport, Ft = (e, t) => e, se = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ya : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let a = e;
  switch (t) {
    case Boolean:
      a = e !== null;
      break;
    case Number:
      a = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        a = JSON.parse(e);
      } catch {
        a = null;
      }
  }
  return a;
} }, De = (e, t) => !Ia(e, t), Ge = { attribute: !0, type: String, converter: se, reflect: !1, useDefault: !1, hasChanged: De };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), he.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let At = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, a = Ge) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(t, a), !a.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, a);
      n !== void 0 && Ua(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, a, s) {
    const { get: n, set: i } = Va(this.prototype, t) ?? { get() {
      return this[a];
    }, set(o) {
      this[a] = o;
    } };
    return { get: n, set(o) {
      const r = n?.call(this);
      i?.call(this, o), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ge;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ft("elementProperties"))) return;
    const t = Ka(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ft("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ft("properties"))) {
      const a = this.properties, s = [...Ga(a), ...Za(a)];
      for (const n of s) this.createProperty(n, a[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const a = litPropertyMetadata.get(t);
      if (a !== void 0) for (const [s, n] of a) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, s] of this.elementProperties) {
      const n = this._$Eu(a, s);
      n !== void 0 && this._$Eh.set(n, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const a = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) a.unshift(Ue(n));
    } else t !== void 0 && a.push(Ue(t));
    return a;
  }
  static _$Eu(t, a) {
    const s = a.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), a = this.constructor.elementProperties;
    for (const s of a.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Fa(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, a, s) {
    this._$AK(t, s);
  }
  _$ET(t, a) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : se).toAttribute(a, s.type);
      this._$Em = t, i == null ? this.removeAttribute(n) : this.setAttribute(n, i), this._$Em = null;
    }
  }
  _$AK(t, a) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const i = s.getPropertyOptions(n), o = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : se;
      this._$Em = n;
      const r = o.fromAttribute(a, i.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, a, s, n = !1, i) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (i = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? De)(i, a) || s.useDefault && s.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, a, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, a, { useDefault: s, reflect: n, wrapped: i }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? a ?? this[t]), i !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (a = void 0), this._$AL.set(t, a)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (a) {
      Promise.reject(a);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [n, i] of this._$Ep) this[n] = i;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, i] of s) {
        const { wrapped: o } = i, r = this[n];
        o !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, i, r);
      }
    }
    let t = !1;
    const a = this._$AL;
    try {
      t = this.shouldUpdate(a), t ? (this.willUpdate(a), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(a)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(a);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((a) => a.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
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
    this._$Eq &&= this._$Eq.forEach((a) => this._$ET(a, this[a])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
At.elementStyles = [], At.shadowRootOptions = { mode: "open" }, At[Ft("elementProperties")] = /* @__PURE__ */ new Map(), At[Ft("finalized")] = /* @__PURE__ */ new Map(), qa?.({ ReactiveElement: At }), (he.reactiveElementVersions ??= []).push("2.1.2");
const Le = globalThis, Ze = (e) => e, ne = Le.trustedTypes, Ke = ne ? ne.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, xa = "$lit$", kt = `lit$${Math.random().toFixed(9).slice(2)}$`, wa = "?" + kt, Ja = `<${wa}>`, Dt = document, Ut = () => Dt.createComment(""), Vt = (e) => e === null || typeof e != "object" && typeof e != "function", Ae = Array.isArray, Xa = (e) => Ae(e) || typeof e?.[Symbol.iterator] == "function", be = `[ 	
\f\r]`, Nt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ye = /-->/g, qe = />/g, Mt = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Je = /'/g, Xe = /"/g, ka = /^(?:script|style|textarea|title)$/i, _a = (e) => (t, ...a) => ({ _$litType$: e, strings: t, values: a }), f = _a(1), F = _a(2), Ht = /* @__PURE__ */ Symbol.for("lit-noChange"), D = /* @__PURE__ */ Symbol.for("lit-nothing"), Qe = /* @__PURE__ */ new WeakMap(), Tt = Dt.createTreeWalker(Dt, 129);
function Sa(e, t) {
  if (!Ae(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ke !== void 0 ? Ke.createHTML(t) : t;
}
const Qa = (e, t) => {
  const a = e.length - 1, s = [];
  let n, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Nt;
  for (let r = 0; r < a; r++) {
    const l = e[r];
    let c, d, p = -1, h = 0;
    for (; h < l.length && (o.lastIndex = h, d = o.exec(l), d !== null); ) h = o.lastIndex, o === Nt ? d[1] === "!--" ? o = Ye : d[1] !== void 0 ? o = qe : d[2] !== void 0 ? (ka.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = Mt) : d[3] !== void 0 && (o = Mt) : o === Mt ? d[0] === ">" ? (o = n ?? Nt, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? Mt : d[3] === '"' ? Xe : Je) : o === Xe || o === Je ? o = Mt : o === Ye || o === qe ? o = Nt : (o = Mt, n = void 0);
    const v = o === Mt && e[r + 1].startsWith("/>") ? " " : "";
    i += o === Nt ? l + Ja : p >= 0 ? (s.push(c), l.slice(0, p) + xa + l.slice(p) + kt + v) : l + kt + (p === -2 ? r : v);
  }
  return [Sa(e, i + (e[a] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Gt {
  constructor({ strings: t, _$litType$: a }, s) {
    let n;
    this.parts = [];
    let i = 0, o = 0;
    const r = t.length - 1, l = this.parts, [c, d] = Qa(t, a);
    if (this.el = Gt.createElement(c, s), Tt.currentNode = this.el.content, a === 2 || a === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = Tt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(xa)) {
          const h = d[o++], v = n.getAttribute(p).split(kt), y = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: i, name: y[2], strings: v, ctor: y[1] === "." ? es : y[1] === "?" ? as : y[1] === "@" ? ss : pe }), n.removeAttribute(p);
        } else p.startsWith(kt) && (l.push({ type: 6, index: i }), n.removeAttribute(p));
        if (ka.test(n.tagName)) {
          const p = n.textContent.split(kt), h = p.length - 1;
          if (h > 0) {
            n.textContent = ne ? ne.emptyScript : "";
            for (let v = 0; v < h; v++) n.append(p[v], Ut()), Tt.nextNode(), l.push({ type: 2, index: ++i });
            n.append(p[h], Ut());
          }
        }
      } else if (n.nodeType === 8) if (n.data === wa) l.push({ type: 2, index: i });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(kt, p + 1)) !== -1; ) l.push({ type: 7, index: i }), p += kt.length - 1;
      }
      i++;
    }
  }
  static createElement(t, a) {
    const s = Dt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Pt(e, t, a = e, s) {
  if (t === Ht) return t;
  let n = s !== void 0 ? a._$Co?.[s] : a._$Cl;
  const i = Vt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== i && (n?._$AO?.(!1), i === void 0 ? n = void 0 : (n = new i(e), n._$AT(e, a, s)), s !== void 0 ? (a._$Co ??= [])[s] = n : a._$Cl = n), n !== void 0 && (t = Pt(e, n._$AS(e, t.values), n, s)), t;
}
class ts {
  constructor(t, a) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = a;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: a }, parts: s } = this._$AD, n = (t?.creationScope ?? Dt).importNode(a, !0);
    Tt.currentNode = n;
    let i = Tt.nextNode(), o = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Kt(i, i.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (c = new ns(i, this, t)), this._$AV.push(c), l = s[++r];
      }
      o !== l?.index && (i = Tt.nextNode(), o++);
    }
    return Tt.currentNode = Dt, n;
  }
  p(t) {
    let a = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, a), a += s.strings.length - 2) : s._$AI(t[a])), a++;
  }
}
class Kt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, a, s, n) {
    this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t, this._$AB = a, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const a = this._$AM;
    return a !== void 0 && t?.nodeType === 11 && (t = a.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, a = this) {
    t = Pt(this, t, a), Vt(t) ? t === D || t == null || t === "" ? (this._$AH !== D && this._$AR(), this._$AH = D) : t !== this._$AH && t !== Ht && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Xa(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== D && Vt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Dt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: a, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Gt.createElement(Sa(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(a);
    else {
      const i = new ts(n, this), o = i.u(this.options);
      i.p(a), this.T(o), this._$AH = i;
    }
  }
  _$AC(t) {
    let a = Qe.get(t.strings);
    return a === void 0 && Qe.set(t.strings, a = new Gt(t)), a;
  }
  k(t) {
    Ae(this._$AH) || (this._$AH = [], this._$AR());
    const a = this._$AH;
    let s, n = 0;
    for (const i of t) n === a.length ? a.push(s = new Kt(this.O(Ut()), this.O(Ut()), this, this.options)) : s = a[n], s._$AI(i), n++;
    n < a.length && (this._$AR(s && s._$AB.nextSibling, n), a.length = n);
  }
  _$AR(t = this._$AA.nextSibling, a) {
    for (this._$AP?.(!1, !0, a); t !== this._$AB; ) {
      const s = Ze(t).nextSibling;
      Ze(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class pe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, a, s, n, i) {
    this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t, this.name = a, this._$AM = n, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = D;
  }
  _$AI(t, a = this, s, n) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) t = Pt(this, t, a, 0), o = !Vt(t) || t !== this._$AH && t !== Ht, o && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = i[0], l = 0; l < i.length - 1; l++) c = Pt(this, r[s + l], a, l), c === Ht && (c = this._$AH[l]), o ||= !Vt(c) || c !== this._$AH[l], c === D ? t = D : t !== D && (t += (c ?? "") + i[l + 1]), this._$AH[l] = c;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class es extends pe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === D ? void 0 : t;
  }
}
class as extends pe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== D);
  }
}
class ss extends pe {
  constructor(t, a, s, n, i) {
    super(t, a, s, n, i), this.type = 5;
  }
  _$AI(t, a = this) {
    if ((t = Pt(this, t, a, 0) ?? D) === Ht) return;
    const s = this._$AH, n = t === D && s !== D || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, i = t !== D && (s === D || n);
    n && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ns {
  constructor(t, a, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = a, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Pt(this, t);
  }
}
const is = Le.litHtmlPolyfillSupport;
is?.(Gt, Kt), (Le.litHtmlVersions ??= []).push("3.3.3");
const os = (e, t, a) => {
  const s = a?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const i = a?.renderBefore ?? null;
    s._$litPart$ = n = new Kt(t.insertBefore(Ut(), i), i, void 0, a ?? {});
  }
  return n._$AI(e), n;
};
const Ee = globalThis;
class _t extends At {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const a = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = os(a, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ht;
  }
}
_t._$litElement$ = !0, _t.finalized = !0, Ee.litElementHydrateSupport?.({ LitElement: _t });
const rs = Ee.litElementPolyfillSupport;
rs?.({ LitElement: _t });
(Ee.litElementVersions ??= []).push("4.2.2");
const ls = { attribute: !0, type: String, converter: se, reflect: !1, hasChanged: De }, ds = (e = ls, t, a) => {
  const { kind: s, metadata: n } = a;
  let i = globalThis.litPropertyMetadata.get(n);
  if (i === void 0 && globalThis.litPropertyMetadata.set(n, i = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(a.name, e), s === "accessor") {
    const { name: o } = a;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(o, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(o, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: o } = a;
    return function(r) {
      const l = this[o];
      t.call(this, r), this.requestUpdate(o, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function W(e) {
  return (t, a) => typeof a == "object" ? ds(e, t, a) : ((s, n, i) => {
    const o = n.hasOwnProperty(i);
    return n.constructor.createProperty(i, s), o ? Object.getOwnPropertyDescriptor(n, i) : void 0;
  })(e, t, a);
}
function V(e) {
  return W({ ...e, state: !0, attribute: !1 });
}
class Be {
  /** `times` is read at every press, so changed properties apply at once. */
  constructor(t) {
    this.times = t, this.pressing = !1, this.fired = !1;
  }
  /** A press began: `onHold` runs when it lasts `holdMs`. */
  start(t) {
    window.clearTimeout(this.timer), this.pressing = !0, this.fired = !1, this.timer = window.setTimeout(() => {
      this.fired = !0, this.last = void 0, t();
    }, this.times().holdMs);
  }
  /** The pointer was lifted or left: a hold that has not fired yet is cancelled. */
  release() {
    window.clearTimeout(this.timer);
  }
  /** The press was interrupted (pointercancel, leaving the control): nothing follows. */
  cancel() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1;
  }
  /**
   * The press ended in a tap on `key` at `time` (ms, monotonic). "none": the press was a hold that
   * has fired already (or no press began); "double": the second tap of `key` within `doubleTapMs`;
   * "single": the first tap, remembered for a following second one.
   */
  tap(t, a) {
    window.clearTimeout(this.timer);
    const s = this.pressing, n = this.fired;
    return this.pressing = !1, this.fired = !1, !s || n ? "none" : this.last && this.last.key === t && a - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: a }, "single");
  }
  /** Whether `key` was tapped once and no second tap has followed yet. */
  pending(t) {
    return this.last?.key === t;
  }
  /** Forget the remembered first tap (a hint was shown, the action was sent …). */
  forget() {
    this.last = void 0;
  }
  dispose() {
    window.clearTimeout(this.timer), this.pressing = !1, this.fired = !1, this.last = void 0;
  }
}
class Ma {
  constructor(t) {
    this.host = t, this.nudge = !1, this.hint = !1;
  }
  show(t) {
    this.nudge = !0, this.hint = !0, window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudgeTimer = window.setTimeout(() => {
      this.nudge = !1, this.host.requestUpdate();
    }, 450), this.hintTimer = window.setTimeout(() => {
      this.hint = !1, this.host.requestUpdate();
    }, t * 1e3), this.host.requestUpdate();
  }
  hide() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer), this.nudge = !1, this.hint = !1, this.host.requestUpdate();
  }
  dispose() {
    window.clearTimeout(this.nudgeTimer), window.clearTimeout(this.hintTimer);
  }
}
const Ta = Zt`
  .hint {
    position: absolute;
    z-index: 6;
    right: 0;
    padding: 8px 12px;
    border-radius: 12px;
    background: var(--hdk-bubble, #3a3a3c);
    color: var(--hdk-bubble-text, #ffffff);
    box-shadow: 0 6px 20px rgb(0 0 0 / 55%);
    font-size: 13px;
    line-height: 18px;
    width: max-content;
    max-width: 240px;
    pointer-events: none;
    animation: hint-in 0.18s ease-out;
  }
  .hint.below {
    top: calc(100% + 10px);
  }
  .hint.above {
    bottom: calc(100% + 4px);
  }
  .hint.center {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    animation-name: hint-in-center;
  }
  .hint i {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: var(--hdk-bubble, #3a3a3c);
    transform: rotate(45deg);
  }
  .hint.below i {
    top: -5px;
  }
  .hint.above i {
    bottom: -5px;
  }
  .hint.end i {
    right: var(--arrow, 25px);
  }
  .hint.center i {
    left: 50%;
    margin-left: -5px;
  }
  @keyframes hint-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
    }
  }
  @keyframes hint-in-center {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateX(-50%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hint {
      animation: none;
    }
  }
`;
var cs = Object.defineProperty, ut = (e, t, a, s) => {
  for (var n = void 0, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = o(t, a, n) || n);
  return n && cs(t, a, n), n;
};
const Re = class Re extends _t {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Ma(this), this.nudgeIndex = 0, this.gesture = new Be(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), a = this.options.filter((r) => !r.disabled), s = this.options[t]?.value ?? a[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, i = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, o = this._dragging ? this._dx : i;
    return f`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${o}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(r) => this.guarded && r.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (r, l) => f`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === s ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(c) => this.onClick(c, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? f`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? f`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  select(t) {
    this.disabled || t === this.value || (this.gesture.release(), this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-select", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  onClick(t, a, s) {
    if (this.disabled || a === this.value) return;
    if (!this.guarded) {
      this.select(a);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(a);
      return;
    }
    const n = this.gesture.tap(String(s), t.timeStamp);
    if (this.swallowClick || n === "none") {
      this.swallowClick = !1;
      return;
    }
    n === "double" ? this.select(a) : (this.nudgeIndex = s, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const a = t.currentTarget, s = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (a.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: s, moved: !1, id: t.pointerId };
    const n = t.target.closest("button[data-index]"), i = n ? Number(n.dataset.index) : -1, o = i >= 0 && i !== s && !this.options[i]?.disabled;
    this.gesture.start(() => {
      o && (this.drag = void 0, this.select(this.options[i].value));
    });
  }
  onMove(t) {
    const a = this.drag;
    if (!a || a.id !== t.pointerId) return;
    const s = t.clientX - a.x;
    if (!a.moved && Math.abs(s) < 6) return;
    a.moved || (a.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const n = this.options.length - 1;
    this._dx = Math.max(-a.index * a.width, Math.min((n - a.index) * a.width, s)), this._dragging = !0;
  }
  onUp(t) {
    const a = this.drag;
    if (this.gesture.release(), !a || a.id !== t.pointerId || (this.drag = void 0, !a.moved)) return;
    this.swallowClick = !0;
    const s = Math.max(0, Math.min(this.options.length - 1, a.index + Math.round(this._dx / a.width)));
    this._dx = 0, this._dragging = !1;
    const n = this.options[s];
    n && !n.disabled && s !== a.index && this.select(n.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const s = this.options.filter((r) => !r.disabled);
    if (!s.length) return;
    const n = s.findIndex((r) => r.value === this.value), i = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, o = s[(n + i + s.length) % s.length];
    t.preventDefault(), this.select(o.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${o.value}"]`)?.focus());
  }
};
Re.styles = [
  Ta,
  Zt`
      :host {
        position: relative;
        display: block;
      }
      .track {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--n), minmax(0, 1fr));
        box-sizing: border-box;
        min-height: 48px;
        padding: 3px;
        border-radius: 999px;
        background: var(--hdk-track, #2c2c2e);
        user-select: none;
        -webkit-user-select: none;
      }
      .track.guarded {
        touch-action: pan-y;
      }
      .track.compact {
        min-height: 40px;
        background: var(--hdk-track-compact, #3a3a3c);
      }
      .track.tall {
        min-height: 66px;
      }
      .thumb {
        position: absolute;
        top: 3px;
        bottom: 3px;
        left: 3px;
        width: calc((100% - 6px) / var(--n));
        box-sizing: border-box;
        border-radius: 999px;
        background: var(--hdk-seg-thumb, #fff);
        box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
        transform: translateX(calc(var(--i) * 100% + var(--dx, 0px)));
        transition: transform 0.28s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      .track.dragging .thumb {
        transition: none;
      }
      .thumb[hidden] {
        display: none;
      }
      button {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 0;
        min-height: 44px;
        padding: 0 8px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--hdk-seg-text, #ebebf5);
        font: inherit;
        font-size: 17px;
        font-weight: 400;
        line-height: 22px;
        cursor: pointer;
        transition: color 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
      }
      .track.compact button {
        min-height: 34px;
        padding: 0 2px;
        font-size: 14px;
        line-height: 20px;
      }
      .track.guarded button {
        touch-action: pan-y;
      }
      button .detail {
        font-size: 13px;
        line-height: 18px;
      }
      button[aria-checked="true"] {
        color: var(--hdk-seg-selected, #000);
        font-weight: 600;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: -3px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.5;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        .thumb,
        button {
          transition: none;
        }
      }
    `
];
let rt = Re;
ut([
  W({ attribute: !1 })
], rt.prototype, "options");
ut([
  W()
], rt.prototype, "value");
ut([
  W()
], rt.prototype, "label");
ut([
  W({ type: Boolean })
], rt.prototype, "disabled");
ut([
  W({ type: Boolean })
], rt.prototype, "compact");
ut([
  W({ type: Boolean })
], rt.prototype, "guarded");
ut([
  W({ type: Number })
], rt.prototype, "holdMs");
ut([
  W({ type: Number })
], rt.prototype, "doubleTapMs");
ut([
  W({ type: Number })
], rt.prototype, "hintSeconds");
ut([
  W()
], rt.prototype, "hint");
ut([
  V()
], rt.prototype, "_dx");
ut([
  V()
], rt.prototype, "_dragging");
var hs = Object.defineProperty, bt = (e, t, a, s) => {
  for (var n = void 0, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = o(t, a, n) || n);
  return n && hs(t, a, n), n;
};
const Ne = class Ne extends _t {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, a = this.max - this.min || 1, n = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / a))})`, i = this.tickStep || this.step || 1, o = Math.floor(a / i + 1e-9) + 1, r = o >= 2 && o <= 40 ? Array.from({ length: o }, (l, c) => f`<i style="left:${(c * i / a * 100).toFixed(2)}%"></i>`) : [];
    return f`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${n}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${r}</div>
      </div>
      ${this.minLabel || this.maxLabel ? f`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const a = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: a }, bubbles: !0, composed: !0 }));
  }
};
Ne.styles = Zt`
    :host {
      display: block;
    }
    .wrap {
      position: relative;
      height: 52px;
    }
    input {
      -webkit-appearance: none;
      appearance: none;
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 52px;
      margin: 0;
      padding: 0 14px;
      border-radius: 26px;
      background: var(--hdk-track, #2c2c2e);
      cursor: pointer;
      touch-action: pan-y;
    }
    input:disabled {
      cursor: default;
      opacity: 0.45;
    }
    input::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, var(--hdk-accent, #0a84ff) 0%, var(--hdk-accent, #0a84ff) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) var(--fill), var(--hdk-bar, rgb(255 255 255 / 14%)) 100%);
    }
    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      margin-top: -9px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    input::-moz-range-track {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-bar, rgb(255 255 255 / 14%));
    }
    input::-moz-range-progress {
      height: 6px;
      border-radius: 3px;
      background: var(--hdk-accent, #0a84ff);
    }
    input::-moz-range-thumb {
      box-sizing: border-box;
      width: 38px;
      height: 24px;
      border: 0;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
    }
    input:focus-visible {
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: 2px;
    }
    /* Ticks at the steps, between the thumb centres at both ends. */
    .ticks {
      position: absolute;
      left: 33px;
      right: 33px;
      bottom: 7px;
      height: 5px;
      pointer-events: none;
    }
    .ticks i {
      position: absolute;
      top: 0;
      margin-left: -1px;
      width: 2px;
      height: 5px;
      border-radius: 1px;
      background: var(--hdk-tick, rgb(255 255 255 / 28%));
    }
    .ends {
      display: flex;
      justify-content: space-between;
      padding: 4px 14px 0;
      color: var(--hdk-secondary, #98989f);
      font-size: 13px;
      line-height: 18px;
    }
  `;
let lt = Ne;
bt([
  W({ type: Number })
], lt.prototype, "min");
bt([
  W({ type: Number })
], lt.prototype, "max");
bt([
  W({ type: Number })
], lt.prototype, "step");
bt([
  W({ type: Number })
], lt.prototype, "tickStep");
bt([
  W({ type: Number })
], lt.prototype, "value");
bt([
  W()
], lt.prototype, "label");
bt([
  W()
], lt.prototype, "valueText");
bt([
  W()
], lt.prototype, "minLabel");
bt([
  W()
], lt.prototype, "maxLabel");
bt([
  W({ type: Boolean })
], lt.prototype, "disabled");
bt([
  V()
], lt.prototype, "_drag");
var ps = Object.defineProperty, xt = (e, t, a, s) => {
  for (var n = void 0, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = o(t, a, n) || n);
  return n && ps(t, a, n), n;
};
const We = class We extends _t {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Ma(this), this.gesture = new Be(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return f`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
        aria-label=${this.label}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(t) => this.guarded && t.preventDefault()}
      ><span class="thumb"></span></button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? f`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  emit() {
    this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-toggle", { detail: { checked: !this.checked }, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.guarded || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.guarded) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const a = this.gesture.tap("switch", t.timeStamp);
    a === "double" ? this.emit() : a === "single" && this.hints.show(this.hintSeconds);
  }
};
We.styles = [
  Ta,
  Zt`
      :host {
        position: relative;
        display: inline-block;
        flex: none;
      }
      button {
        position: relative;
        display: block;
        box-sizing: border-box;
        width: 60px;
        height: 32px;
        padding: 0;
        border: 0;
        border-radius: 16px;
        background: var(--hdk-switch-off, rgb(120 120 128 / 36%));
        cursor: pointer;
        transition: background 0.2s;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      button[aria-checked="true"] {
        background: var(--hdk-accent, #0a84ff);
      }
      /* Invisible extension of the touch target to 44 px. */
      button::after {
        content: "";
        position: absolute;
        inset: -6px -4px;
      }
      .thumb {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 40px;
        height: 26px;
        box-sizing: border-box;
        border-radius: 13px;
        background: #fff;
        box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
        transition: left 0.25s cubic-bezier(0.3, 1.2, 0.5, 1);
      }
      button[aria-checked="true"] .thumb {
        left: 17px;
      }
      /* One tap on a protected switch: the thumb moves toward the new position and back. */
      button.nudge[aria-checked="false"] .thumb {
        left: 9px;
      }
      button.nudge[aria-checked="true"] .thumb {
        left: 11px;
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 3px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
      @media (prefers-reduced-motion: reduce) {
        button,
        .thumb {
          transition: none;
        }
        button.nudge[aria-checked="false"] .thumb {
          left: 3px;
        }
        button.nudge[aria-checked="true"] .thumb {
          left: 17px;
        }
      }
    `
];
let pt = We;
xt([
  W({ type: Boolean })
], pt.prototype, "checked");
xt([
  W({ type: Boolean })
], pt.prototype, "disabled");
xt([
  W()
], pt.prototype, "label");
xt([
  W({ type: Boolean })
], pt.prototype, "guarded");
xt([
  W({ type: Number })
], pt.prototype, "holdMs");
xt([
  W({ type: Number })
], pt.prototype, "doubleTapMs");
xt([
  W({ type: Number })
], pt.prototype, "hintSeconds");
xt([
  W()
], pt.prototype, "hintPlacement");
xt([
  W()
], pt.prototype, "hint");
function us(e) {
  const t = [
    [`${e}-switch`, pt],
    [`${e}-segmented`, rt],
    [`${e}-slider`, lt]
  ];
  for (const [a, s] of t)
    customElements.get(a) || customElements.define(a, s);
}
const bs = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function gs(e) {
  return bs.has(e);
}
function ot(e, t) {
  return t ? e?.states?.[t] : void 0;
}
function ct(e, t) {
  const a = ot(e, t)?.state;
  return a === void 0 || gs(a) ? void 0 : a;
}
function fs(e, t) {
  const a = ct(e, t);
  if (a === void 0)
    return;
  const s = Number(a);
  return Number.isFinite(s) ? s : void 0;
}
function Ca(e) {
  return (e?.locale?.language || e?.language || "").trim();
}
function je(e) {
  const t = e.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function ms(e, t) {
  return e === "auto" ? je(Ca(t)) : e;
}
function vs() {
  return je(document.documentElement.lang || navigator.language || "");
}
const ta = /* @__PURE__ */ new WeakMap(), ys = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, $s = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), xs = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function ge(e, t) {
  const a = e?.locale?.[t];
  return typeof a == "string" && a !== "" ? a : "language";
}
function ws(e, t, a) {
  const s = Ca(a).replace("_", "-"), n = s !== "" && je(s) === t ? s : ys[t], i = ge(a, "number_format"), o = ge(a, "time_format"), r = ge(a, "date_format"), l = [t, n, i, o, r].join("|");
  let c = ta.get(e);
  c || (c = /* @__PURE__ */ new Map(), ta.set(e, c));
  let d = c.get(l);
  return d || (d = Ss(e[t], t, n, i, o, r), c.set(l, d)), d;
}
function ks(e) {
  try {
    return new Intl.NumberFormat(e), e;
  } catch {
    return "en";
  }
}
function _s(e, t) {
  if (e === "12")
    return !0;
  if (e === "24")
    return !1;
  const a = e === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(a).includes("10");
}
function Ss(e, t, a, s, n, i) {
  const o = ks(a), r = s === "system" ? void 0 : s === "none" ? "en-US" : xs[s] ?? o, l = s === "none" ? { useGrouping: !1 } : {}, c = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), d = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), v = _s(n, o), y = v ? "h12" : "h23", u = new Intl.DateTimeFormat(o, { hour: v ? "numeric" : "2-digit", minute: "2-digit", hourCycle: y }), g = new Intl.DateTimeFormat(o, v ? { hour: "numeric", hourCycle: y } : { hour: "2-digit", minute: "2-digit", hourCycle: y }), m = i === "system" ? void 0 : o, b = new Intl.DateTimeFormat(m, { day: "numeric", month: "numeric" }), k = ($) => {
    if (!["DMY", "MDY", "YMD"].includes(i))
      return b.format($);
    const x = b.formatToParts($), z = x.find((T) => T.type === "literal")?.value ?? "/", j = x[x.length - 1], E = j?.type === "literal" ? j.value : "", A = x.find((T) => T.type === "day")?.value ?? "", w = x.find((T) => T.type === "month")?.value ?? "";
    return i === "DMY" ? `${A}${z}${w}${E}` : `${w}${z}${A}${E}`;
  }, L = $s.has(o.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: o,
    t: e,
    one: ($) => c.format($),
    two: ($) => d.format($),
    half: ($) => p.format(Math.round($ * 2) / 2),
    tick: ($) => p.format($),
    whole: ($) => h.format($),
    percent: ($) => `${$}${L}%`,
    time: ($) => u.format($),
    hour: ($) => g.format($),
    day: k
  };
}
const Ms = {
  /** Heading without `title` in the YAML. */
  title: "Energie",
  /** Card picker of Home Assistant. */
  cardDescription: "Energie domu: toky jako Sankey diagram, auto s wallboxem a teplá voda (bojler, zásobník, mísení) s ovládáním.",
  /** Panel headings without `titles.*` in the YAML. */
  titles: { electricity: "Elektřina", car: "BMW i3", water: "Teplá voda" },
  // Words used in many places
  /** A value that is missing, for screen readers ("––" on screen) and in lists of spoken details. */
  noData: "bez dat",
  close: "Zavřít",
  /** Small connecting word of source lists: "ze slunce a baterie". */
  and: "a",
  /** "před 4 min" for the age of a reading. */
  ago: {
    now: "právě teď",
    minutes: (e) => `před ${e} min`,
    hours: (e) => `před ${e} h`,
    days: (e) => `před ${e} d`
  },
  // Sources of energy: "ze slunce", "z baterie a sítě" (from-form first, then the form after "a")
  from: { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" },
  alsoFrom: { sun: "slunce", bat: "baterie", grid: "sítě" },
  /** Names of the sources in lists (car sources). */
  source: { sun: "Slunce", bat: "Baterie", grid: "Síť" },
  // Sentence under the heading of Elektřina
  summary: {
    exportSurplus: "Přebytek jde do sítě",
    sunChargesCar: (e) => `Slunce nabíjí ${e ? "baterii i " : ""}auto`,
    sunChargesBattery: "Slunce nabíjí baterii",
    sunCoversHouse: "Slunce pokrývá dům",
    fromGrid: "Dům jede ze sítě",
    fromBattery: "Dům jede z baterie",
    nothing: "Dům nic neodebírá",
    houseTakes: (e) => `Dům bere ${e}`
  },
  // Alerts (Upozornění)
  alerts: {
    heading: "Upozornění",
    blocked: { title: "Nabíjení auta je zablokované", text: "Auto nenabíjí, ani v Boostu. Přebytek ohřívá vodu." },
    priorityWaiting: {
      title: "Auto je připojené, ale nenabíjí",
      text: "Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu."
    },
    boostWallbox: { title: "Boost wallboxu je zapnutý", text: "Auto smí nabíjet i ze sítě a z baterie." },
    boostBoiler: { title: "Boost bojleru je zapnutý", text: "Bojler smí topit i ze sítě a z baterie." }
  },
  // Tiles of the flow diagram
  flowLabel: "Toky energie",
  tile: { sun: "Slunce", bat: "Baterie", grid: "Síť", house: "Dům", car: "Auto", boil: "Bojler", batIn: "Baterie", gridOut: "Do sítě" },
  idle: {
    sun: "bez výroby",
    bat: "nevybíjí",
    grid: "neodebírá",
    house: "bez odběru",
    carDisconnected: "odpojeno",
    carNoState: "bez stavu",
    carConnected: "připojeno",
    boil: "bez ohřevu",
    batIn: "nenabíjí",
    gridOut: "nedodává"
  },
  /** Extra words of the spoken name of a tile. */
  tileSpoken: {
    gridImport: "odběr",
    gridExport: "dodávka",
    houseOther: "ostatní spotřeba",
    charging: "nabíjí",
    heating: "ohřev",
    atReserve: "na rezervě",
    chargeLevel: (e) => `nabití ${e}`,
    temperature: (e) => `teplota ${e}`,
    batteryState: (e) => e ? "vybíjení" : "nabíjení"
  },
  // Popups of the tiles and of the heading
  pop: {
    discharging: (e) => `vybíjí ${e}`,
    charging: (e) => `nabíjí ${e}`,
    importing: (e) => `odebírá ${e}`,
    exporting: (e) => `dodává ${e}`,
    carConnectedIdle: "připojeno, nenabíjí",
    heating: (e) => `ohřev ${e}`,
    level: "Nabití",
    atReserve: "na rezervě",
    temperature: "Teplota",
    rows: {
      discharged: "Dnes vybito",
      charged: "Dnes nabito",
      imported: "Dnes odebráno",
      exported: "Dnes dodáno",
      produced: "Dnes vyrobeno",
      consumed: "Dnes spotřebováno",
      carCharged: "Dnes nabito",
      boilerHeated: "Dnes ohřev"
    },
    day: "Dnes",
    sources: "Zdroje",
    consumption: "Spotřeba",
    fromBattery: "Z baterie",
    fromGrid: "Ze sítě",
    toBattery: "Do baterie"
  },
  // Car panel
  car: {
    charging: (e) => `Nabíjí ${e}`,
    connectedIdle: "Připojeno, nenabíjí",
    disconnected: "Odpojeno",
    openDashboard: "Otevřít dashboard auta",
    chargeLevel: (e, t) => `Nabití auta ${e}${t === void 0 ? "" : `, limit ${t}`}`,
    range: "dojezd",
    limit: (e) => `limit ${e}`,
    mode: "Režim nabíjení",
    modeLabel: "Režim nabíjení auta",
    modeSurplus: "Přetoky · jen z přebytku",
    modeBoost: "Boost · bere i ze sítě a z baterie",
    sourcesTitle: "Odkud auto nabíjí",
    sourcesLabel: "Odkud auto nabíjí, průměr za 5 minut",
    power: "Nabíjecí výkon",
    powerLabel: "Nabíjecí výkon wallboxu"
  },
  /** The two charging and heating modes (segmented control). */
  boostOptions: { off: "Přetoky", on: "Boost" },
  // Wallbox
  wallbox: {
    title: "Wallbox",
    charging: "nabíjí",
    idle: "nenabíjí",
    disconnected: "odpojeno",
    fromCar: (e) => `z auta ${e}`,
    block: "Zablokovat nabíjení",
    blockOn: "Auto nenabíjí, přebytek ohřívá vodu",
    blockOff: "Auto smí nabíjet",
    priority: "Přednost před bojlerem",
    priorityOn: "Auto nabíjí dřív než bojler",
    priorityOff: "Auto nemá přednost"
  },
  // Hot water panel
  water: {
    boilerHeats: (e) => `Bojler ohřívá ${e}`,
    noHeating: "Bez ohřevu",
    boilerTitle: "Bojler (FVE)",
    notHeating: "neohřívá",
    target: (e) => `cíl ${e}`,
    boilerLabel: (e, t, a, s, n) => `Bojler ${e}, ${t}${a === void 0 ? "" : `, cíl ${a}`}, stupnice ${s} až ${n}`,
    heatingWith: (e) => `ohřívá výkonem ${e}`,
    boostMode: "Režim ohřevu bojleru",
    targets: "Cílové teploty",
    targetFlow: "Přetoky",
    targetBoost: "Boost",
    targetFlowHint: "jen z přebytku",
    targetBoostHint: "i ze sítě a z baterie",
    targetsRule: "Přetoky nesmí být pod Boostem.",
    targetSliderLabel: (e) => `Cíl ohřevu bojleru, ${e}`,
    targetSliderSpoken: (e, t) => `${e}, ${t}`,
    targetWhat: (e) => `Cíl ohřevu bojleru (${e})`,
    mixing: "Mísení vody",
    mixingUnclear: "nejasný stav ventilů"
  },
  // Tank (gas)
  tank: {
    title: "Zásobník (plyn)",
    modes: { auto: "Auto", heat: "Manual", off: "Off" },
    modeLabel: "Režim zásobníku",
    temperature: "Teplota",
    sliderLabel: "Teplota zásobníku",
    keepsMinimum: "kotel drží minimum",
    setManually: "nastaveno ručně",
    byPlan: "podle plánu",
    summaryOff: (e) => `${e} · vypnuto`,
    summaryManual: (e) => `${e} · ručně`,
    summaryPlan: (e) => `${e} · podle plánu`,
    hintOff: "zásobník je vypnutý",
    hintManual: "nastavujete ručně",
    hintPlan: "podle plánu; změna přepne na Manual",
    sliderSpoken: (e) => `${e}, nastavená teplota`,
    label: (e, t, a, s) => `Zásobník, ${e}, režim ${t}, naměřená teplota není, stupnice ${a} až ${s}`,
    settingNoData: "nastavení bez dat",
    settingOff: (e) => `vypnuto, kotel drží ${e}`,
    settingSet: (e) => `nastaveno ${e}`
  },
  // Hints of the protected controls (hold or double tap)
  hint: {
    holdOrDouble: "Podržte nebo klepněte dvakrát.",
    holdDragOrDouble: "Podržte, přetáhněte nebo klepněte dvakrát."
  },
  // Feedback under the card
  feedback: {
    noData: (e) => `${e}: entita nehlásí data, nic jsem neodeslal.`,
    rejected: (e) => `${e}: Home Assistant příkaz nepřijal.`,
    unblocked: "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval.",
    mixingNotSent: "Mísení vody: příkaz se neodeslal."
  },
  // Popup and detail of the battery (CURRENT_SPEC.md, Baterie)
  bat: {
    open: "Detail baterie",
    back: "Zpět",
    done: "Hotovo",
    title: "Baterie",
    detailLabel: "Detail baterie",
    tabsLabel: "Část detailu baterie",
    tabs: { now: "Dnes", hist: "Historie", health: "Zdraví" },
    rangeLabel: "Období historie",
    ranges: { "1d": "1 den", "7d": "7 dní", "30d": "30 dní" },
    spanLabel: "Rozsah grafu",
    spans: { "6h": "6 h", "24h": "24 h" },
    level: "Nabití",
    levelLabel: (e, t) => `Nabití ${e}, rezerva ${t}`,
    fullIn: (e) => `Plná za asi ${e}`,
    lastsFor: (e) => `Vydrží asi ${e}`,
    today: "Dnes",
    charging: "nabíjení",
    discharging: "vybíjení",
    now: "teď",
    noDataChart: "–– bez dat",
    trendLabel: "Výkon baterie dnes od půlnoci",
    scrubLabel: "Posun v čase",
    status: { charging: "Nabíjí se", discharging: "Vybíjí se", idle: "Nečinná" },
    live: { power: "Výkon", current: "Proud", voltage: "Napětí", load: "Zátěž", loadSub: "výkon ÷ kapacita", chargeCurrent: "nabíjecí", dischargeCurrent: "vybíjecí", ofBattery: "baterie" },
    levelChart: "Nabití a výkon",
    levelLegend: "nabití",
    energyToday: "Energie dnes",
    charged: "Nabito",
    discharged: "Vybito",
    netStored: (e) => `Čistě uloženo ${e}`,
    net: "čistě",
    energyHours: "Energie po hodinách",
    energyDays: "Denní energie",
    kpi: {
      efficiency: "Účinnost cyklu",
      efficiencySub: "vybito ÷ nabito",
      cycles: "Ekvivalentní cykly",
      cyclesSub: (e) => `vybito ÷ ${e}`,
      lowest: "Nejnižší nabití",
      lowestSub: "minimum nabití",
      peak: "Špička výkonu",
      peakSub: "nabíjení i vybíjení",
      over: (e) => `za ${e}`
    },
    bandsTitle: "Čas v pásmech nabití",
    bandsNote: "Podíl času za zvolené období, z historie nabití.",
    health: {
      ok: "Baterie je v pořádku",
      okSub: "Bez chyb a varování",
      error: (e) => `Chyba ${e}`,
      warning: (e) => `Varování ${e}`,
      problemSub: "Podrobnosti v diagnostice",
      noData: "Bez dat",
      noDataSub: "Baterie neposílá data",
      capacity: "Kapacita",
      capacitySub: (e, t) => `využitelná ≈ ${e} z ${t}`,
      balance: "Vyvážení článků",
      balanceSub: "rozdíl nejnižšího a nejvyššího článku",
      words: { good: "Výborné", ok: "Dobré", warn: "Pozor", fault: "Chyba" },
      temperature: "Teplota",
      temperatureSub: (e) => `nejteplejší článek · rozptyl ${e}`,
      battery: "Baterie",
      inverterAir: "Střídač, vzduch",
      inverterRadiator: "Střídač, chladič",
      life: "Životnost",
      cycles: (e) => `${e} cyklů`,
      lifeSub: (e) => `účinnost celkem ${e}`,
      totalCharged: "Celkem nabito",
      totalDischarged: "Celkem vybito",
      diagnostics: "Diagnostika",
      mode: "Režim",
      chargeLimit: "Limit nabíjení",
      dischargeLimit: "Limit vybíjení",
      errors: "Chyby a varování",
      none: "žádné",
      min: "min",
      max: "max",
      difference: "rozdíl",
      rangeLegend: "min–max",
      excellentZone: (e) => `výborné do ${e}`,
      expand: (e) => `${e}, zobrazit historii`
    }
  },
  // Popup and detail of the sun (CURRENT_SPEC.md, Slunce)
  sun: {
    open: "Detail slunce",
    back: "Zpět",
    done: "Hotovo",
    title: "Slunce",
    detailLabel: "Detail slunce",
    tabsLabel: "Část detailu slunce",
    tabs: { today: "Dnes", hist: "Historie", outlook: "Výhled" },
    producing: "Vyrábí",
    producingWith: (e) => `Vyrábí · ${e}`,
    powerNow: "Výkon teď",
    flowTitle: "Kam teď slunce jde",
    flowNone: "Slunce nikam nejde",
    soFar: "Dnes zatím",
    ofEstimate: (e) => `z odhadu ≈ ${e}`,
    ringLabel: (e) => `Hotovo ${e} odhadu dne`,
    started: "Začala",
    ends: "Skončí asi",
    ended: "Skončila",
    startedLong: "Výroba začala",
    sunrise: (e) => `východ slunce ${e}`,
    sunset: (e) => `západ slunce ${e}`,
    peakToday: "Špička dnes",
    at: (e) => `v ${e}`,
    chartTitle: "Výkon dnes",
    chartUnit: "v kW",
    chartLegend: { production: "Výroba", possible: "Možné", forecast: "Předpověď" },
    chartLabel: "Výkon slunce dnes",
    possibleShort: "možné",
    whereTitle: "Kam dnes slunce šlo",
    whereUnit: "kWh dnes od rána",
    info: "Nápověda",
    hints: {
      chart: "Křivka „možné“ se učí z nejlepších dnů posledního období, takže ví, kdy kolik jde získat. Pásmo předpovědi se zužuje, jak den běží.",
      where: "Slunce, které nešlo do baterie ani do sítě, se mezi dům, auto a bojler dělí podle jejich dnešní spotřeby. Je to odhad ze součtů dne.",
      conf: "Ráno je odhad hodně nepřesný, odpoledne už je téměř jistý. Rozmezí se během dne zužuje.",
      five: (e) => `Pruh ukazuje hodiny dne. Plná žlutá je výkon aspoň ${e}, světlejší žlutá je slabé slunce. Vpravo je odhad v kWh a hodiny s výkonem nad touto hranicí. Čím dál dopředu, tím méně jistě.`,
      eve: "Odhad z předpovědi výroby, z běžné spotřeby domu v tuto dobu (medián posledních dní) a z nastavené metody nabíjení auta. Zpřesňuje se během dne.",
      acc: "Předpověď z rána porovnaná s tím, co se opravdu vyrobilo. Z toho karta počítá, jak moc může být odhad dne vedle."
    },
    weather: { clear: "jasno", partly: "polojasno", cloudy: "zataženo", rain: "déšť", snow: "sníh", fog: "mlha", storm: "bouřky", wind: "vítr" },
    hist: {
      rangeLabel: "Období historie",
      ranges: { "7d": "7 dní", "30d": "30 dní" },
      last: (e) => `Posledních ${e} dní`,
      ofPossible: (e) => `${e} možného`,
      average: (e) => `v průměru ${e} denně`,
      chartTitle: "Výroba po dnech",
      modeLabel: "Zobrazení grafu",
      modes: { total: "Celkem", parts: "Denní doba" },
      production: "Výroba",
      possible: "Možné",
      blocks: ["do 9", "9–11", "11–13", "13–15", "od 15 h"],
      mostIn: (e) => `nejvíc ${e}`,
      best: "Nejlepší den",
      worst: "Nejhorší den",
      peak: "Špička",
      length: "Délka výroby",
      lengthValue: (e) => `${e} h`,
      before7: (e) => `před týdnem ${e} h`,
      before30: (e) => `předchozích 30 dní ${e} h`,
      dayOfPossible: (e, t) => `${e} · ${t} možného`,
      eastWest: "Východ a západ",
      eastWestLabel: (e, t) => `Východ ${e}, západ ${t}`,
      goodDays: "Dobré dny",
      goodOf: (e, t) => `${e} z ${t}`,
      over: (e) => `nad ${e} kWh`,
      accuracyTitle: "Jak se předpověď trefovala",
      accuracyAverage: (e) => `průměrná odchylka, ${e} dní`,
      accuracyLabel: "Předpověď a skutečnost za poslední dny",
      forecast: "Předpověď",
      actual: "Skutečnost"
    },
    outlook: {
      heroTitle: "Dnes celkem, odhad",
      between: (e, t) => `pravděpodobně ${e} až ${t} kWh`,
      certainty: { low: "Jistota nízká", medium: "Jistota střední", high: "Jistota vysoká" },
      fiveTitle: "Pět dní dopředu",
      today: "Dnes",
      strong: (e) => `aspoň ${e}`,
      weak: "slabě",
      below: (e) => `pod ${e}`,
      window: (e, t) => `${e}–${t} h`,
      eveningTitle: "Dnes do večera",
      full: "Baterie plná",
      batteryAt: (e) => `Baterie v ${e}`,
      batteryNow: "Baterie teď",
      sunUntil: (e) => `Slunce do ${e}`,
      houseUntil: (e) => `Dům do ${e}`,
      carSun: "Auto ze slunce",
      dayLength: "Den",
      dayChange: (e) => `${e < 0 ? "−" : "+"}${Math.abs(e)} min za den`,
      bestDay: "Nejlepší den",
      bestSub: (e, t) => `≈ ${e} kWh${t ? ` · ${t}` : ""}`,
      hoursMinutes: (e, t) => `${e} h ${t} min`,
      sourceForecast: "podle předpovědi",
      sourcePace: "podle tempa dne"
    }
  }
}, Ts = {
  title: "Energy",
  cardDescription: "Home energy: flows as a Sankey diagram, the car with its wallbox and hot water (boiler, tank, mixing) with controls.",
  titles: { electricity: "Electricity", car: "BMW i3", water: "Hot water" },
  noData: "no data",
  close: "Close",
  and: "and",
  ago: {
    now: "just now",
    minutes: (e) => `${e} min ago`,
    hours: (e) => `${e} h ago`,
    days: (e) => `${e} d ago`
  },
  from: { sun: "from the sun", bat: "from the battery", grid: "from the grid" },
  alsoFrom: { sun: "the sun", bat: "the battery", grid: "the grid" },
  source: { sun: "Sun", bat: "Battery", grid: "Grid" },
  summary: {
    exportSurplus: "Surplus goes to the grid",
    sunChargesCar: (e) => `The sun charges the ${e ? "battery and the " : ""}car`,
    sunChargesBattery: "The sun charges the battery",
    sunCoversHouse: "The sun covers the house",
    fromGrid: "The house runs on the grid",
    fromBattery: "The house runs on the battery",
    nothing: "The house draws nothing",
    houseTakes: (e) => `The house takes energy ${e}`
  },
  alerts: {
    heading: "Alerts",
    blocked: { title: "Car charging is blocked", text: "The car does not charge, not even in Boost. The surplus heats the water." },
    priorityWaiting: {
      title: "The car is connected but not charging",
      text: "Priority over the boiler is on, but the sun is probably too weak to start the wallbox."
    },
    boostWallbox: { title: "Wallbox Boost is on", text: "The car may also charge from the grid and the battery." },
    boostBoiler: { title: "Boiler Boost is on", text: "The boiler may also heat from the grid and the battery." }
  },
  flowLabel: "Energy flows",
  tile: { sun: "Sun", bat: "Battery", grid: "Grid", house: "House", car: "Car", boil: "Boiler", batIn: "Battery", gridOut: "To grid" },
  idle: {
    sun: "no production",
    bat: "not discharging",
    grid: "not importing",
    house: "no consumption",
    carDisconnected: "unplugged",
    carNoState: "no status",
    carConnected: "plugged in",
    boil: "not heating",
    batIn: "not charging",
    gridOut: "not exporting"
  },
  tileSpoken: {
    gridImport: "import",
    gridExport: "export",
    houseOther: "other consumption",
    charging: "charging",
    heating: "heating",
    atReserve: "at reserve",
    chargeLevel: (e) => `charge ${e}`,
    temperature: (e) => `temperature ${e}`,
    batteryState: (e) => e ? "discharging" : "charging"
  },
  pop: {
    discharging: (e) => `discharging ${e}`,
    charging: (e) => `charging ${e}`,
    importing: (e) => `importing ${e}`,
    exporting: (e) => `exporting ${e}`,
    carConnectedIdle: "plugged in, not charging",
    heating: (e) => `heating ${e}`,
    level: "Charge",
    atReserve: "at reserve",
    temperature: "Temperature",
    rows: {
      discharged: "Discharged today",
      charged: "Charged today",
      imported: "Imported today",
      exported: "Exported today",
      produced: "Produced today",
      consumed: "Consumed today",
      carCharged: "Charged today",
      boilerHeated: "Heated today"
    },
    day: "Today",
    sources: "Sources",
    consumption: "Consumption",
    fromBattery: "From battery",
    fromGrid: "From grid",
    toBattery: "To battery"
  },
  car: {
    charging: (e) => `Charging ${e}`,
    connectedIdle: "Plugged in, not charging",
    disconnected: "Unplugged",
    openDashboard: "Open the car dashboard",
    chargeLevel: (e, t) => `Car charge ${e}${t === void 0 ? "" : `, limit ${t}`}`,
    range: "range",
    limit: (e) => `limit ${e}`,
    mode: "Charging mode",
    modeLabel: "Car charging mode",
    modeSurplus: "Surplus · from the surplus only",
    modeBoost: "Boost · also from the grid and the battery",
    sourcesTitle: "Where the car charges from",
    sourcesLabel: "Where the car charges from, 5 minute average",
    power: "Charging power",
    powerLabel: "Wallbox charging power"
  },
  boostOptions: { off: "Surplus", on: "Boost" },
  wallbox: {
    title: "Wallbox",
    charging: "charging",
    idle: "not charging",
    disconnected: "unplugged",
    fromCar: (e) => `from the car ${e}`,
    block: "Block charging",
    blockOn: "The car does not charge, the surplus heats the water",
    blockOff: "The car may charge",
    priority: "Priority over the boiler",
    priorityOn: "The car charges before the boiler",
    priorityOff: "The car has no priority"
  },
  water: {
    boilerHeats: (e) => `The boiler heats ${e}`,
    noHeating: "Not heating",
    boilerTitle: "Boiler (PV)",
    notHeating: "not heating",
    target: (e) => `target ${e}`,
    boilerLabel: (e, t, a, s, n) => `Boiler ${e}, ${t}${a === void 0 ? "" : `, target ${a}`}, scale ${s} to ${n}`,
    heatingWith: (e) => `heating with ${e}`,
    boostMode: "Boiler heating mode",
    targets: "Target temperatures",
    targetFlow: "Surplus",
    targetBoost: "Boost",
    targetFlowHint: "from the surplus only",
    targetBoostHint: "also from the grid and the battery",
    targetsRule: "Surplus may not be below Boost.",
    targetSliderLabel: (e) => `Boiler heating target, ${e}`,
    targetSliderSpoken: (e, t) => `${e}, ${t}`,
    targetWhat: (e) => `Boiler heating target (${e})`,
    mixing: "Water mixing",
    mixingUnclear: "valve state unclear"
  },
  tank: {
    title: "Tank (gas)",
    modes: { auto: "Auto", heat: "Manual", off: "Off" },
    modeLabel: "Tank mode",
    temperature: "Temperature",
    sliderLabel: "Tank temperature",
    keepsMinimum: "the boiler keeps the minimum",
    setManually: "set manually",
    byPlan: "by schedule",
    summaryOff: (e) => `${e} · off`,
    summaryManual: (e) => `${e} · manual`,
    summaryPlan: (e) => `${e} · by schedule`,
    hintOff: "the tank is off",
    hintManual: "you set it manually",
    hintPlan: "by schedule; a change switches to Manual",
    sliderSpoken: (e) => `${e}, set temperature`,
    label: (e, t, a, s) => `Tank, ${e}, mode ${t}, no measured temperature, scale ${a} to ${s}`,
    settingNoData: "setting not available",
    settingOff: (e) => `off, the boiler keeps ${e}`,
    settingSet: (e) => `set to ${e}`
  },
  hint: {
    holdOrDouble: "Press and hold, or tap twice.",
    holdDragOrDouble: "Press and hold, drag, or tap twice."
  },
  feedback: {
    noData: (e) => `${e}: the entity reports no data, nothing was sent.`,
    rejected: (e) => `${e}: Home Assistant did not accept the command.`,
    unblocked: "Charging was blocked; I turned the block off so that Boost works.",
    mixingNotSent: "Water mixing: the command was not sent."
  },
  // Popup and detail of the battery (CURRENT_SPEC.md, Baterie)
  bat: {
    open: "Battery details",
    back: "Back",
    done: "Done",
    title: "Battery",
    detailLabel: "Battery details",
    tabsLabel: "Part of the battery details",
    tabs: { now: "Today", hist: "History", health: "Health" },
    rangeLabel: "History period",
    ranges: { "1d": "1 day", "7d": "7 days", "30d": "30 days" },
    spanLabel: "Chart range",
    spans: { "6h": "6 h", "24h": "24 h" },
    level: "Charge",
    levelLabel: (e, t) => `Charge ${e}, reserve ${t}`,
    fullIn: (e) => `Full in about ${e}`,
    lastsFor: (e) => `Lasts about ${e}`,
    today: "Today",
    charging: "charging",
    discharging: "discharging",
    now: "now",
    noDataChart: "–– no data",
    trendLabel: "Battery power today since midnight",
    scrubLabel: "Move through time",
    status: { charging: "Charging", discharging: "Discharging", idle: "Idle" },
    live: { power: "Power", current: "Current", voltage: "Voltage", load: "Load", loadSub: "power ÷ capacity", chargeCurrent: "charging", dischargeCurrent: "discharging", ofBattery: "battery" },
    levelChart: "Charge and power",
    levelLegend: "charge",
    energyToday: "Energy today",
    charged: "Charged",
    discharged: "Discharged",
    netStored: (e) => `Net stored ${e}`,
    net: "net",
    energyHours: "Energy by hour",
    energyDays: "Energy by day",
    kpi: {
      efficiency: "Cycle efficiency",
      efficiencySub: "discharged ÷ charged",
      cycles: "Equivalent cycles",
      cyclesSub: (e) => `discharged ÷ ${e}`,
      lowest: "Lowest charge",
      lowestSub: "minimum charge",
      peak: "Peak power",
      peakSub: "charging and discharging",
      over: (e) => `over ${e}`
    },
    bandsTitle: "Time in charge bands",
    bandsNote: "Share of the time in the chosen period, from the charge history.",
    health: {
      ok: "The battery is fine",
      okSub: "No errors or warnings",
      error: (e) => `Error ${e}`,
      warning: (e) => `Warning ${e}`,
      problemSub: "Details in the diagnostics",
      noData: "No data",
      noDataSub: "The battery sends no data",
      capacity: "Capacity",
      capacitySub: (e, t) => `usable ≈ ${e} of ${t}`,
      balance: "Cell balance",
      balanceSub: "difference between the lowest and the highest cell",
      words: { good: "Excellent", ok: "Good", warn: "Attention", fault: "Fault" },
      temperature: "Temperature",
      temperatureSub: (e) => `warmest cell · spread ${e}`,
      battery: "Battery",
      inverterAir: "Inverter, air",
      inverterRadiator: "Inverter, heatsink",
      life: "Lifetime",
      cycles: (e) => `${e} cycles`,
      lifeSub: (e) => `overall efficiency ${e}`,
      totalCharged: "Total charged",
      totalDischarged: "Total discharged",
      diagnostics: "Diagnostics",
      mode: "Mode",
      chargeLimit: "Charge limit",
      dischargeLimit: "Discharge limit",
      errors: "Errors and warnings",
      none: "none",
      min: "min",
      max: "max",
      difference: "difference",
      rangeLegend: "min–max",
      excellentZone: (e) => `excellent up to ${e}`,
      expand: (e) => `${e}, show history`
    }
  },
  // Popup and detail of the sun (CURRENT_SPEC.md, Slunce)
  sun: {
    open: "Sun details",
    back: "Back",
    done: "Done",
    title: "Sun",
    detailLabel: "Sun details",
    tabsLabel: "Part of the sun details",
    tabs: { today: "Today", hist: "History", outlook: "Outlook" },
    producing: "Producing",
    producingWith: (e) => `Producing · ${e}`,
    powerNow: "Power now",
    flowTitle: "Where the sun goes now",
    flowNone: "The sun goes nowhere",
    soFar: "Today so far",
    ofEstimate: (e) => `of ≈ ${e} expected`,
    ringLabel: (e) => `${e} of the day's estimate done`,
    started: "Started",
    ends: "Ends about",
    ended: "Ended",
    startedLong: "Production started",
    sunrise: (e) => `sunrise ${e}`,
    sunset: (e) => `sunset ${e}`,
    peakToday: "Peak today",
    at: (e) => `at ${e}`,
    chartTitle: "Power today",
    chartUnit: "in kW",
    chartLegend: { production: "Production", possible: "Possible", forecast: "Forecast" },
    chartLabel: "Solar power today",
    possibleShort: "possible",
    whereTitle: "Where the sun went today",
    whereUnit: "kWh since morning",
    info: "Help",
    hints: {
      chart: "The “possible” curve is learned from the best days of the recent period, so it knows how much can be had at which time. The band of the forecast narrows as the day goes on.",
      where: "The sun that went neither to the battery nor to the grid is split between the house, the car and the boiler by their consumption today. It is an estimate from the totals of the day.",
      conf: "In the morning the estimate is very rough, in the afternoon it is almost certain. The range narrows during the day.",
      five: (e) => `The strip shows the hours of the day. Solid yellow is a power of at least ${e}, light yellow is weak sun. On the right are the estimate in kWh and the hours above that limit. The further ahead, the less certain.`,
      eve: "An estimate from the production forecast, the usual consumption of the house at this time (the median of the last days) and the configured way of charging the car. It gets more exact during the day.",
      acc: "The forecast of the morning compared with what was really produced. The card uses it to tell how far off the estimate of the day can be."
    },
    weather: { clear: "clear", partly: "partly cloudy", cloudy: "cloudy", rain: "rain", snow: "snow", fog: "fog", storm: "storms", wind: "windy" },
    hist: {
      rangeLabel: "History period",
      ranges: { "7d": "7 days", "30d": "30 days" },
      last: (e) => `Last ${e} days`,
      ofPossible: (e) => `${e} of possible`,
      average: (e) => `${e} a day on average`,
      chartTitle: "Production by day",
      modeLabel: "Chart view",
      modes: { total: "Total", parts: "Time of day" },
      production: "Production",
      possible: "Possible",
      blocks: ["before 9", "9–11", "11–13", "13–15", "from 15"],
      mostIn: (e) => `most ${e}`,
      best: "Best day",
      worst: "Worst day",
      peak: "Peak",
      length: "Production time",
      lengthValue: (e) => `${e} h`,
      before7: (e) => `a week ago ${e} h`,
      before30: (e) => `the 30 days before ${e} h`,
      dayOfPossible: (e, t) => `${e} · ${t} of possible`,
      eastWest: "East and west",
      eastWestLabel: (e, t) => `East ${e}, west ${t}`,
      goodDays: "Good days",
      goodOf: (e, t) => `${e} of ${t}`,
      over: (e) => `over ${e} kWh`,
      accuracyTitle: "How the forecast did",
      accuracyAverage: (e) => `average deviation, ${e} days`,
      accuracyLabel: "Forecast and actual production of the last days",
      forecast: "Forecast",
      actual: "Actual"
    },
    outlook: {
      heroTitle: "Today in total, estimate",
      between: (e, t) => `probably ${e} to ${t} kWh`,
      certainty: { low: "Certainty low", medium: "Certainty medium", high: "Certainty high" },
      fiveTitle: "Five days ahead",
      today: "Today",
      strong: (e) => `at least ${e}`,
      weak: "weak",
      below: (e) => `under ${e}`,
      window: (e, t) => `${e}–${t} h`,
      eveningTitle: "Today until the evening",
      full: "Battery full",
      batteryAt: (e) => `Battery at ${e}`,
      batteryNow: "Battery now",
      sunUntil: (e) => `Sun until ${e}`,
      houseUntil: (e) => `House until ${e}`,
      carSun: "Car from the sun",
      dayLength: "Day",
      dayChange: (e) => `${e < 0 ? "−" : "+"}${Math.abs(e)} min a day`,
      bestDay: "Best day",
      bestSub: (e, t) => `≈ ${e} kWh${t ? ` · ${t}` : ""}`,
      hoursMinutes: (e, t) => `${e} h ${t} min`,
      sourceForecast: "from the forecast",
      sourcePace: "from the pace of the day"
    }
  }
}, Cs = {
  title: "Energi",
  cardDescription: "Hemmets energi: flöden som Sankey-diagram, bilen med laddbox och varmvatten (beredare, tank, blandning) med styrning.",
  titles: { electricity: "El", car: "BMW i3", water: "Varmvatten" },
  noData: "inga data",
  close: "Stäng",
  and: "och",
  ago: {
    now: "just nu",
    minutes: (e) => `för ${e} min sedan`,
    hours: (e) => `för ${e} h sedan`,
    days: (e) => `för ${e} d sedan`
  },
  from: { sun: "från solen", bat: "från batteriet", grid: "från nätet" },
  alsoFrom: { sun: "solen", bat: "batteriet", grid: "nätet" },
  source: { sun: "Sol", bat: "Batteri", grid: "Nät" },
  summary: {
    exportSurplus: "Överskottet går ut på nätet",
    sunChargesCar: (e) => `Solen laddar ${e ? "batteriet och " : ""}bilen`,
    sunChargesBattery: "Solen laddar batteriet",
    sunCoversHouse: "Solen täcker huset",
    fromGrid: "Huset går på nätet",
    fromBattery: "Huset går på batteriet",
    nothing: "Huset drar ingenting",
    houseTakes: (e) => `Huset tar energi ${e}`
  },
  alerts: {
    heading: "Varningar",
    blocked: { title: "Billaddningen är blockerad", text: "Bilen laddar inte, inte ens i Boost. Överskottet värmer vattnet." },
    priorityWaiting: {
      title: "Bilen är ansluten men laddar inte",
      text: "Företräde före beredaren är på, men solen räcker troligen inte för att starta laddboxen."
    },
    boostWallbox: { title: "Laddboxens Boost är på", text: "Bilen får ladda även från nätet och batteriet." },
    boostBoiler: { title: "Beredarens Boost är på", text: "Beredaren får värma även från nätet och batteriet." }
  },
  flowLabel: "Energiflöden",
  tile: { sun: "Sol", bat: "Batteri", grid: "Nät", house: "Hus", car: "Bil", boil: "Beredare", batIn: "Batteri", gridOut: "Till nätet" },
  idle: {
    sun: "ingen produktion",
    bat: "laddar ur inte",
    grid: "köper inte",
    house: "ingen förbrukning",
    carDisconnected: "urkopplad",
    carNoState: "ingen status",
    carConnected: "ansluten",
    boil: "värmer inte",
    batIn: "laddar inte",
    gridOut: "säljer inte"
  },
  tileSpoken: {
    gridImport: "köp",
    gridExport: "försäljning",
    houseOther: "övrig förbrukning",
    charging: "laddar",
    heating: "värmer",
    atReserve: "på reserven",
    chargeLevel: (e) => `laddning ${e}`,
    temperature: (e) => `temperatur ${e}`,
    batteryState: (e) => e ? "urladdning" : "laddning"
  },
  pop: {
    discharging: (e) => `laddar ur ${e}`,
    charging: (e) => `laddar ${e}`,
    importing: (e) => `köper ${e}`,
    exporting: (e) => `säljer ${e}`,
    carConnectedIdle: "ansluten, laddar inte",
    heating: (e) => `värmer ${e}`,
    level: "Laddning",
    atReserve: "på reserven",
    temperature: "Temperatur",
    rows: {
      discharged: "Urladdat idag",
      charged: "Laddat idag",
      imported: "Köpt idag",
      exported: "Sålt idag",
      produced: "Producerat idag",
      consumed: "Förbrukat idag",
      carCharged: "Laddat idag",
      boilerHeated: "Värmt idag"
    },
    day: "Idag",
    sources: "Källor",
    consumption: "Förbrukning",
    fromBattery: "Från batteriet",
    fromGrid: "Från nätet",
    toBattery: "Till batteriet"
  },
  car: {
    charging: (e) => `Laddar ${e}`,
    connectedIdle: "Ansluten, laddar inte",
    disconnected: "Urkopplad",
    openDashboard: "Öppna bilens dashboard",
    chargeLevel: (e, t) => `Bilens laddning ${e}${t === void 0 ? "" : `, gräns ${t}`}`,
    range: "räckvidd",
    limit: (e) => `gräns ${e}`,
    mode: "Laddningsläge",
    modeLabel: "Bilens laddningsläge",
    modeSurplus: "Överskott · bara från överskottet",
    modeBoost: "Boost · även från nätet och batteriet",
    sourcesTitle: "Varifrån bilen laddar",
    sourcesLabel: "Varifrån bilen laddar, medelvärde 5 minuter",
    power: "Laddeffekt",
    powerLabel: "Laddboxens laddeffekt"
  },
  boostOptions: { off: "Överskott", on: "Boost" },
  wallbox: {
    title: "Laddbox",
    charging: "laddar",
    idle: "laddar inte",
    disconnected: "urkopplad",
    fromCar: (e) => `från bilen ${e}`,
    block: "Blockera laddning",
    blockOn: "Bilen laddar inte, överskottet värmer vattnet",
    blockOff: "Bilen får ladda",
    priority: "Företräde före beredaren",
    priorityOn: "Bilen laddar före beredaren",
    priorityOff: "Bilen har inget företräde"
  },
  water: {
    boilerHeats: (e) => `Beredaren värmer ${e}`,
    noHeating: "Ingen uppvärmning",
    boilerTitle: "Beredare (sol)",
    notHeating: "värmer inte",
    target: (e) => `mål ${e}`,
    boilerLabel: (e, t, a, s, n) => `Beredare ${e}, ${t}${a === void 0 ? "" : `, mål ${a}`}, skala ${s} till ${n}`,
    heatingWith: (e) => `värmer med ${e}`,
    boostMode: "Beredarens värmeläge",
    targets: "Måltemperaturer",
    targetFlow: "Överskott",
    targetBoost: "Boost",
    targetFlowHint: "bara från överskottet",
    targetBoostHint: "även från nätet och batteriet",
    targetsRule: "Överskott får inte ligga under Boost.",
    targetSliderLabel: (e) => `Beredarens måltemperatur, ${e}`,
    targetSliderSpoken: (e, t) => `${e}, ${t}`,
    targetWhat: (e) => `Beredarens måltemperatur (${e})`,
    mixing: "Vattenblandning",
    mixingUnclear: "oklart ventilläge"
  },
  tank: {
    title: "Tank (gas)",
    modes: { auto: "Auto", heat: "Manuell", off: "Av" },
    modeLabel: "Tankens läge",
    temperature: "Temperatur",
    sliderLabel: "Tankens temperatur",
    keepsMinimum: "pannan håller minimum",
    setManually: "inställd manuellt",
    byPlan: "enligt schema",
    summaryOff: (e) => `${e} · av`,
    summaryManual: (e) => `${e} · manuellt`,
    summaryPlan: (e) => `${e} · enligt schema`,
    hintOff: "tanken är av",
    hintManual: "du ställer in manuellt",
    hintPlan: "enligt schema; en ändring växlar till Manuell",
    sliderSpoken: (e) => `${e}, inställd temperatur`,
    label: (e, t, a, s) => `Tank, ${e}, läge ${t}, ingen uppmätt temperatur, skala ${a} till ${s}`,
    settingNoData: "inställning saknas",
    settingOff: (e) => `av, pannan håller ${e}`,
    settingSet: (e) => `inställd på ${e}`
  },
  hint: {
    holdOrDouble: "Håll nedtryckt eller tryck två gånger.",
    holdDragOrDouble: "Håll nedtryckt, dra eller tryck två gånger."
  },
  feedback: {
    noData: (e) => `${e}: enheten rapporterar inga data, inget skickades.`,
    rejected: (e) => `${e}: Home Assistant tog inte emot kommandot.`,
    unblocked: "Laddningen var blockerad; jag tog bort blockeringen så att Boost fungerar.",
    mixingNotSent: "Vattenblandning: kommandot skickades inte."
  },
  // Popup and detail of the battery (CURRENT_SPEC.md, Baterie)
  bat: {
    open: "Batteridetaljer",
    back: "Tillbaka",
    done: "Klar",
    title: "Batteri",
    detailLabel: "Batteridetaljer",
    tabsLabel: "Del av batteridetaljerna",
    tabs: { now: "Idag", hist: "Historik", health: "Hälsa" },
    rangeLabel: "Period för historiken",
    ranges: { "1d": "1 dag", "7d": "7 dagar", "30d": "30 dagar" },
    spanLabel: "Diagrammets spann",
    spans: { "6h": "6 h", "24h": "24 h" },
    level: "Laddning",
    levelLabel: (e, t) => `Laddning ${e}, reserv ${t}`,
    fullIn: (e) => `Full om ungefär ${e}`,
    lastsFor: (e) => `Räcker i ungefär ${e}`,
    today: "Idag",
    charging: "laddning",
    discharging: "urladdning",
    now: "nu",
    noDataChart: "–– inga data",
    trendLabel: "Batteriets effekt idag sedan midnatt",
    scrubLabel: "Flytta i tiden",
    status: { charging: "Laddar", discharging: "Laddar ur", idle: "Vilar" },
    live: { power: "Effekt", current: "Ström", voltage: "Spänning", load: "Belastning", loadSub: "effekt ÷ kapacitet", chargeCurrent: "laddström", dischargeCurrent: "urladdningsström", ofBattery: "batteri" },
    levelChart: "Laddning och effekt",
    levelLegend: "laddning",
    energyToday: "Energi idag",
    charged: "Laddat",
    discharged: "Urladdat",
    netStored: (e) => `Netto lagrat ${e}`,
    net: "netto",
    energyHours: "Energi per timme",
    energyDays: "Energi per dag",
    kpi: {
      efficiency: "Cykelverkningsgrad",
      efficiencySub: "urladdat ÷ laddat",
      cycles: "Ekvivalenta cykler",
      cyclesSub: (e) => `urladdat ÷ ${e}`,
      lowest: "Lägsta laddning",
      lowestSub: "lägsta laddningsnivå",
      peak: "Toppeffekt",
      peakSub: "laddning och urladdning",
      over: (e) => `under ${e}`
    },
    bandsTitle: "Tid i laddningsintervall",
    bandsNote: "Andel av tiden under vald period, från laddningshistoriken.",
    health: {
      ok: "Batteriet mår bra",
      okSub: "Inga fel eller varningar",
      error: (e) => `Fel ${e}`,
      warning: (e) => `Varning ${e}`,
      problemSub: "Detaljer i diagnostiken",
      noData: "Inga data",
      noDataSub: "Batteriet skickar inga data",
      capacity: "Kapacitet",
      capacitySub: (e, t) => `användbar ≈ ${e} av ${t}`,
      balance: "Cellbalans",
      balanceSub: "skillnad mellan lägsta och högsta cellen",
      words: { good: "Utmärkt", ok: "Bra", warn: "Obs", fault: "Fel" },
      temperature: "Temperatur",
      temperatureSub: (e) => `varmaste cellen · spridning ${e}`,
      battery: "Batteri",
      inverterAir: "Växelriktare, luft",
      inverterRadiator: "Växelriktare, kylare",
      life: "Livslängd",
      cycles: (e) => `${e} cykler`,
      lifeSub: (e) => `total verkningsgrad ${e}`,
      totalCharged: "Totalt laddat",
      totalDischarged: "Totalt urladdat",
      diagnostics: "Diagnostik",
      mode: "Läge",
      chargeLimit: "Laddgräns",
      dischargeLimit: "Urladdningsgräns",
      errors: "Fel och varningar",
      none: "inga",
      min: "min",
      max: "max",
      difference: "skillnad",
      rangeLegend: "min–max",
      excellentZone: (e) => `utmärkt upp till ${e}`,
      expand: (e) => `${e}, visa historik`
    }
  },
  // Popup and detail of the sun (CURRENT_SPEC.md, Slunce)
  sun: {
    open: "Solens detaljer",
    back: "Tillbaka",
    done: "Klar",
    title: "Sol",
    detailLabel: "Solens detaljer",
    tabsLabel: "Del av solens detaljer",
    tabs: { today: "Idag", hist: "Historik", outlook: "Utsikt" },
    producing: "Producerar",
    producingWith: (e) => `Producerar · ${e}`,
    powerNow: "Effekt nu",
    flowTitle: "Vart solen går nu",
    flowNone: "Solen går ingenstans",
    soFar: "Idag hittills",
    ofEstimate: (e) => `av ≈ ${e} väntat`,
    ringLabel: (e) => `${e} av dagens uppskattning klart`,
    started: "Började",
    ends: "Slutar ungefär",
    ended: "Slutade",
    startedLong: "Produktionen började",
    sunrise: (e) => `soluppgång ${e}`,
    sunset: (e) => `solnedgång ${e}`,
    peakToday: "Topp idag",
    at: (e) => `kl. ${e}`,
    chartTitle: "Effekt idag",
    chartUnit: "i kW",
    chartLegend: { production: "Produktion", possible: "Möjligt", forecast: "Prognos" },
    chartLabel: "Soleffekt idag",
    possibleShort: "möjligt",
    whereTitle: "Vart solen gick idag",
    whereUnit: "kWh sedan morgonen",
    info: "Hjälp",
    hints: {
      chart: "Kurvan ”möjligt” lär sig av de bästa dagarna den senaste tiden, så den vet hur mycket som går att få och när. Prognosbandet blir smalare under dagen.",
      where: "Solen som varken gick till batteriet eller nätet delas mellan huset, bilen och varmvattenberedaren efter deras förbrukning idag. Det är en uppskattning från dagens summor.",
      conf: "På morgonen är uppskattningen mycket grov, på eftermiddagen nästan säker. Intervallet blir smalare under dagen.",
      five: (e) => `Remsan visar dygnets timmar. Full gul är en effekt på minst ${e}, ljusgul är svag sol. Till höger står uppskattningen i kWh och timmarna över gränsen. Ju längre fram, desto osäkrare.`,
      eve: "En uppskattning från produktionsprognosen, husets vanliga förbrukning vid den här tiden (medianen av de senaste dagarna) och det inställda sättet att ladda bilen. Den blir säkrare under dagen.",
      acc: "Morgonens prognos jämförd med vad som verkligen producerades. Kortet räknar ut hur långt fel dagens uppskattning kan vara."
    },
    weather: { clear: "klart", partly: "halvklart", cloudy: "mulet", rain: "regn", snow: "snö", fog: "dimma", storm: "åska", wind: "blåsigt" },
    hist: {
      rangeLabel: "Historikperiod",
      ranges: { "7d": "7 dagar", "30d": "30 dagar" },
      last: (e) => `Senaste ${e} dagarna`,
      ofPossible: (e) => `${e} av möjligt`,
      average: (e) => `${e} per dag i snitt`,
      chartTitle: "Produktion per dag",
      modeLabel: "Diagramvy",
      modes: { total: "Totalt", parts: "Tid på dagen" },
      production: "Produktion",
      possible: "Möjligt",
      blocks: ["före 9", "9–11", "11–13", "13–15", "från 15"],
      mostIn: (e) => `mest ${e}`,
      best: "Bästa dag",
      worst: "Sämsta dag",
      peak: "Topp",
      length: "Produktionstid",
      lengthValue: (e) => `${e} h`,
      before7: (e) => `för en vecka sedan ${e} h`,
      before30: (e) => `30 dagarna före ${e} h`,
      dayOfPossible: (e, t) => `${e} · ${t} av möjligt`,
      eastWest: "Öst och väst",
      eastWestLabel: (e, t) => `Öst ${e}, väst ${t}`,
      goodDays: "Bra dagar",
      goodOf: (e, t) => `${e} av ${t}`,
      over: (e) => `över ${e} kWh`,
      accuracyTitle: "Hur prognosen träffade",
      accuracyAverage: (e) => `genomsnittlig avvikelse, ${e} dagar`,
      accuracyLabel: "Prognos och verklig produktion de senaste dagarna",
      forecast: "Prognos",
      actual: "Verklig"
    },
    outlook: {
      heroTitle: "Idag totalt, uppskattning",
      between: (e, t) => `troligen ${e} till ${t} kWh`,
      certainty: { low: "Säkerhet låg", medium: "Säkerhet medel", high: "Säkerhet hög" },
      fiveTitle: "Fem dagar framåt",
      today: "Idag",
      strong: (e) => `minst ${e}`,
      weak: "svag",
      below: (e) => `under ${e}`,
      window: (e, t) => `${e}–${t} h`,
      eveningTitle: "Idag till kvällen",
      full: "Batteriet fullt",
      batteryAt: (e) => `Batteri kl. ${e}`,
      batteryNow: "Batteri nu",
      sunUntil: (e) => `Sol till ${e}`,
      houseUntil: (e) => `Huset till ${e}`,
      carSun: "Bil från solen",
      dayLength: "Dag",
      dayChange: (e) => `${e < 0 ? "−" : "+"}${Math.abs(e)} min per dag`,
      bestDay: "Bästa dag",
      bestSub: (e, t) => `≈ ${e} kWh${t ? ` · ${t}` : ""}`,
      hoursMinutes: (e, t) => `${e} h ${t} min`,
      sourceForecast: "enligt prognosen",
      sourcePace: "enligt dagens takt"
    }
  }
}, Ds = { cs: Ms, en: Ts, sv: Cs };
function ie(e, t) {
  return ws(Ds, e, t);
}
function Y(e, t) {
  const a = fs(e, t);
  if (a !== void 0)
    return ot(e, t)?.attributes?.unit_of_measurement === "kW" ? a * 1e3 : a;
}
let st = ie("cs"), oe = "auto";
function Ls(e, t = "auto") {
  st = e, oe = t;
}
function ze(e, t = 1e3) {
  return e.some((a) => a !== void 0 && Math.abs(a) >= t) ? "kW" : "W";
}
function Da(e) {
  const t = oe === "auto" ? Math.abs(Math.round(e * 100) / 100) < 10 ? 2 : Math.abs(Math.round(e * 10) / 10) < 100 ? 1 : 0 : oe;
  return t === 2 ? st.two(e) : t === 1 ? st.one(e) : st.whole(e);
}
function X(e, t) {
  return t === "kW" ? `${Da(e / 1e3)} kW` : `${st.whole(Math.round(e))} W`;
}
function H(e, t = 0) {
  return t === 0 ? st.whole(e) : st.one(e);
}
function N(e, t) {
  if (t === 0) return st.whole(e);
  if (t === 1) return st.one(e);
  if (t === 2) return st.two(e);
  const a = st.one(1.5).charAt(1), s = 10 ** t, n = Math.round(Math.abs(e) * s);
  return `${e < 0 && n > 0 ? "−" : ""}${st.whole(Math.floor(n / s))}${a}${String(n % s).padStart(t, "0")}`;
}
function Et(e) {
  return `${new Intl.DateTimeFormat(st.locale, { weekday: "short" }).format(e)} ${st.day(e)}`;
}
function ea(e) {
  const t = new Intl.DateTimeFormat(st.locale, { weekday: "long" }).format(e);
  return t.charAt(0).toLocaleUpperCase(st.locale) + t.slice(1);
}
function it(e) {
  return st.time(e);
}
function R(e) {
  return st.percent(typeof e == "number" ? H(e) : e);
}
function Ot(e, t) {
  const a = ot(e, t), s = ct(e, t);
  if (s === void 0) return;
  const n = Number(s);
  if (!Number.isFinite(n)) return;
  const i = a?.attributes?.unit_of_measurement;
  return i === "Wh" ? n / 1e3 : i === "MWh" ? n * 1e3 : n;
}
function nt(e) {
  return e < (oe === 1 ? 0.05 : 5e-3) ? "0" : Da(e);
}
function As(e, t, a) {
  const s = e ? Date.parse(e) : NaN;
  if (!Number.isFinite(s)) return;
  const n = Math.max(0, Math.round((t - s) / 6e4));
  return n < 1 ? a.ago.now : n < 60 ? a.ago.minutes(n) : n < 1440 ? a.ago.hours(Math.round(n / 60)) : a.ago.days(Math.round(n / 1440));
}
const ht = ["sun", "bat", "grid"], Bt = ["house", "car", "boil", "batIn", "gridOut"], qt = (e) => e === void 0 ? void 0 : Math.max(0, e), q = (e, t) => e !== void 0 && e >= t;
function La(e) {
  if (e === "Disconnected") return "disconnected";
  if (e === "Waiting") return "connected";
  if (e === "Charging") return "charging";
}
function Es(e, t, a) {
  const s = t.entities, n = t.num.flows.idle_threshold, i = qt(Y(e, s.pv.power)), o = Y(e, s.battery.power), r = Y(e, s.grid.power), l = qt(Y(e, s.house.power)), c = qt(Y(e, s.wallbox.power)), d = qt(Y(e, s.boiler.power)), p = o === void 0 ? void 0 : Math.max(0, o), h = o === void 0 ? void 0 : Math.max(0, -o), v = r === void 0 ? void 0 : Math.max(0, -r), y = r === void 0 ? void 0 : Math.max(0, r), u = l === void 0 ? void 0 : Math.max(0, l - (c ?? 0) - (d ?? 0)), g = (A) => q(A, n) ? A : 0, m = {
    sun: Math.max(0, g(i) - g(h) - g(y)),
    bat: g(p),
    grid: g(v)
  }, b = m.sun + m.bat + m.grid, k = { sun: 0, bat: 0, grid: 0 };
  if (b > 0)
    for (const A of ht) k[A] = m[A] / b;
  const L = [], $ = { house: { ...k }, car: { ...k }, boil: { ...k } }, x = [
    ["house", u],
    ["car", c],
    ["boil", d]
  ], z = x.reduce((A, [, w]) => A + (q(w, n) ? w : 0), 0), j = { sun: 0, bat: 0, grid: 0 };
  for (const A of ht) j[A] = b > 0 ? m[A] * z / b : 0;
  for (const [A, w] of x) {
    if (!q(w, n)) continue;
    let T = w;
    const C = { sun: 0, bat: 0, grid: 0 };
    for (const _ of ht) {
      const S = Math.min(j[_], T);
      j[_] -= S, T -= S, C[_] = S / w, S > 0.5 && L.push({ from: _, to: A, watts: S });
    }
    C.sun + C.bat + C.grid > 0 && ($[A] = C);
  }
  q(h, n) && L.push({ from: "sun", to: "batIn", watts: h }), q(y, n) && L.push({ from: "sun", to: "gridOut", watts: y });
  const E = {
    sun: i,
    batDis: p,
    batIn: h,
    imp: v,
    exp: y,
    other: u,
    car: c,
    boil: d,
    share: k,
    loadShare: $,
    flows: L,
    soc: Y(e, s.battery.state_of_charge),
    carSoc: Y(e, s.car.state_of_charge),
    carRange: Y(e, s.car.range),
    boilTemp: Y(e, s.boiler.temperature),
    carLink: La(ct(e, s.wallbox.status))
  };
  return Object.assign(E, Bs(E, t.num.flows, a)), E;
}
function Bs(e, t, a) {
  const s = t.idle_threshold, n = (h) => q(h, s);
  if ([e.sun, e.batDis, e.imp, e.other].every((h) => h === void 0)) return {};
  if (n(e.sun) && !n(e.imp) && !n(e.batDis)) {
    let h;
    return (e.exp ?? 0) > t.export_notice && !n(e.batIn) ? h = a.summary.exportSurplus : n(e.car) ? h = a.summary.sunChargesCar(n(e.batIn)) : n(e.batIn) ? h = a.summary.sunChargesBattery : h = a.summary.sunCoversHouse, { summary: h, summarySource: "sun" };
  }
  const { sun: r, bat: l, grid: c } = e.loadShare.house;
  if (c > t.grid_deviation_share / 100) return { summary: a.summary.fromGrid, summarySource: "grid" };
  const d = t.source_min_share / 100;
  if (r < d && c < d && l > 0) return { summary: a.summary.fromBattery, summarySource: "bat" };
  const p = Ea(e.loadShare.house, d);
  return p.length ? { summary: a.summary.houseTakes(Aa(p, a)), summarySource: p[0] } : { summary: a.summary.nothing };
}
function Aa(e, t) {
  return t.from[e[0]] + e.slice(1).map((a) => ` ${t.and} ${t.alsoFrom[a]}`).join("");
}
function Ea(e, t) {
  return ht.filter((a) => e[a] >= t).sort((a, s) => e[s] - e[a]);
}
function Ba(e, t, a) {
  let s = Ea(e, t.source_min_share / 100);
  s.length || (s = ["sun"]);
  const n = e.grid > t.grid_deviation_share / 100;
  return { text: Aa(s, a), main: n ? "grid" : s[0], deviation: n };
}
function js(e, t) {
  if (!(e === void 0 || t === void 0))
    return e === "off" && t === "on" ? "on" : e === "on" && t === "off" ? "off" : "unclear";
}
const zs = Zt`
  :host {
    display: block;
    --ed-card: #1c1c1e;
    --ed-tile: #2c2c2e;
    --ed-tint-base: #000000;
    --ed-track: #2c2c2e;
    --ed-text: #ffffff;
    --ed-secondary: #98989f;
    --ed-off: #8e8e93;
    --ed-sep: rgb(84 84 88 / 65%);
    --ed-bar: rgb(255 255 255 / 14%);
    --ed-tick: rgb(255 255 255 / 28%);
    --ed-switch-off: rgb(120 120 128 / 36%);
    --ed-seg-thumb: #ffffff;
    --ed-seg-text: #ebebf5;
    --ed-seg-selected: #000000;
    --ed-btn: rgb(118 118 128 / 24%);
    --ed-badge: rgb(255 255 255 / 8%);
    --ed-fill-idle: rgb(255 255 255 / 17%);
    --ed-gauge-track: rgb(255 255 255 / 14%);
    --ed-track-compact: #3a3a3c;
    --ed-pop: #3a3a3c;
    --ed-pop-sec: #c7c7cc;
    --ed-pop-line: rgb(255 255 255 / 14%);
    --ed-pop-shadow: rgb(0 0 0 / 55%);
    --ed-bubble: #3a3a3c;
    --ed-bubble-text: #ffffff;
    color: var(--ed-text);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif;
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }

  :host([data-light]) {
    --ed-card: #ffffff;
    --ed-tile: #f2f2f7;
    --ed-tint-base: #ffffff;
    --ed-track: #f2f2f7;
    --ed-text: #000000;
    --ed-secondary: #5f5f66;
    --ed-off: #8e8e93;
    --ed-sep: rgb(60 60 67 / 29%);
    --ed-bar: rgb(60 60 67 / 18%);
    --ed-tick: rgb(60 60 67 / 30%);
    --ed-switch-off: rgb(120 120 128 / 32%);
    --ed-seg-text: #000000;
    --ed-badge: rgb(60 60 67 / 8%);
    --ed-fill-idle: rgb(60 60 67 / 16%);
    --ed-gauge-track: rgb(60 60 67 / 16%);
    --ed-track-compact: #e5e5ea;
    --ed-pop: #ffffff;
    --ed-pop-sec: #5f5f66;
    --ed-pop-line: rgb(60 60 67 / 18%);
    --ed-pop-shadow: rgb(0 0 0 / 22%);
    --ed-bubble: #1c1c1e;
    --ed-bubble-text: #ffffff;
  }

  .page {
    display: grid;
    gap: 12px;
    min-width: 0;
    /* Colours of the controls of the kit (ha-dashboard-kit, Ovládací prvky), mapped to this card's. */
    --hdk-accent: var(--ed-accent);
    --hdk-switch-off: var(--ed-switch-off);
    --hdk-track: var(--ed-track);
    --hdk-track-compact: var(--ed-track-compact);
    --hdk-bar: var(--ed-bar);
    --hdk-tick: var(--ed-tick);
    --hdk-secondary: var(--ed-secondary);
    --hdk-seg-thumb: var(--ed-seg-thumb);
    --hdk-seg-text: var(--ed-seg-text);
    --hdk-seg-selected: var(--ed-seg-selected);
    --hdk-bubble: var(--ed-bubble);
    --hdk-bubble-text: var(--ed-bubble-text);
  }

  h1,
  h2,
  h3,
  p,
  ul {
    margin: 0;
  }

  h1 {
    padding: 4px 4px 0;
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
  }

  button {
    font-family: inherit;
  }

  button:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: 2px;
    border-radius: 12px;
  }

  .panel {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    box-sizing: border-box;
    padding: 16px 16px 12px;
    border-radius: 12px;
    background: var(--ed-card);
    /* Popups and hints lie over the page and never move or resize anything. */
    overflow: visible;
  }

  /* The enlarged car picture must not reach over the edges of its card. */
  .panel.car-panel {
    overflow: hidden;
  }

  .panel h2 {
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .head.click {
    cursor: pointer;
  }

  .title-btn {
    all: unset;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border-radius: 6px;
    cursor: pointer;
  }

  .title-btn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: 3px;
  }

  .title-btn svg {
    width: 14px;
    height: 14px;
    margin-top: 1px;
    fill: var(--ed-off);
  }

  /* The state line under a heading: a dot and a sentence in the colour of the energy source. */
  .state {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--sc, var(--ed-secondary));
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  :host([data-light]) .state {
    color: color-mix(in srgb, var(--sc, var(--ed-secondary)) 45%, #000);
  }

  .state .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: var(--sc, var(--ed-secondary));
  }

  /* ------------------------------------------------------------ alerts */
  .alerts {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .group-label {
    padding: 0 4px;
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
  }

  .alert {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    min-height: 60px;
    padding: 8px 0;
  }

  .alert .badge {
    background: color-mix(in srgb, var(--ed-accent) 18%, transparent);
  }

  .alert .badge svg {
    fill: var(--ed-accent);
  }

  .alert.warn .badge {
    background: color-mix(in srgb, var(--ed-warning) 18%, transparent);
  }

  .alert.warn .badge svg {
    fill: var(--ed-warning);
  }

  .alert-text {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  /* ------------------------------------------------------------ Sankey */
  .flow {
    position: relative;
    width: 100%;
  }

  .flow > svg {
    position: absolute;
    inset: 0 auto auto 0;
    overflow: visible;
    pointer-events: none;
  }

  .dots {
    fill: none;
    stroke: rgb(255 255 255 / 90%);
    stroke-linecap: round;
    stroke-dasharray: 0.1 13.9;
    animation: flow linear infinite;
  }

  @keyframes flow {
    to {
      stroke-dashoffset: -14;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dots {
      animation: none;
    }
  }

  .tile {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px;
    border: 0;
    border-radius: 12px;
    background: var(--ed-tile);
    color: var(--ed-text);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .tile .icon {
    flex: none;
    width: 22px;
    height: 22px;
    fill: var(--ed-off);
  }

  .tile.on .icon,
  .tile.on .icon2 {
    fill: var(--tc);
  }

  .tile.on .icon {
    filter: drop-shadow(0 0 var(--gr) color-mix(in srgb, var(--tc) var(--ga), transparent));
  }

  .tile .text {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
  }

  .tile .name {
    color: var(--ed-secondary);
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    white-space: nowrap;
  }

  /* On a tinted tile the secondary grey is too faint (4.5 : 1): the name takes the text colour. */
  .tile.on .name,
  .tile.battery .name {
    color: color-mix(in srgb, var(--ed-text) 82%, transparent);
  }

  .tile .value {
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  /* Idle texts ("ingen produktion") may wrap to a second line on a narrow card; the tile is tall enough. */
  .tile.idle .value {
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 400;
    line-height: 15px;
    white-space: normal;
  }

  :host([data-light]) .tile.idle.battery .value {
    color: var(--ed-text);
  }

  /* Popups: a tile popover with an arrow, and the big one of the heading. */
  .scrim {
    position: absolute;
    inset: 0;
    z-index: 5;
    padding: 0;
    border: 0;
    border-radius: 12px;
    background: rgb(0 0 0 / 0.1%);
    cursor: default;
  }

  .pop {
    position: absolute;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 14px;
    background: var(--ed-pop);
    box-shadow: 0 8px 30px var(--ed-pop-shadow);
    animation: pop-in 0.18s ease-out;
  }

  @keyframes pop-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pop {
      animation: none;
    }
  }

  .pop > * {
    position: relative;
  }

  .pop .arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    background: var(--ed-pop);
    transform: rotate(45deg);
  }

  .pop .arrow.up {
    top: -6px;
  }

  .pop .arrow.down {
    bottom: -6px;
  }

  .pop-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .pop-title {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
  }

  .pop-now,
  .pop-label {
    color: var(--ed-pop-sec);
    font-size: 13px;
    line-height: 18px;
  }

  .pop-now {
    text-align: right;
  }

  .pop-label .note {
    color: var(--ed-warning);
  }

  .pop-level {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pop-level-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .pop-big {
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    font-variant-numeric: tabular-nums;
  }

  .segs {
    display: flex;
    gap: 3px;
    height: 8px;
  }

  .segs > span {
    position: relative;
    flex: 1 1 0;
    overflow: hidden;
    border-radius: 3px;
    background: var(--ed-pop-line);
  }

  .segs i {
    position: absolute;
    inset: 0 auto 0 0;
  }

  .pop-rows {
    display: flex;
    flex-direction: column;
  }

  .pop-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    box-sizing: border-box;
    min-height: 30px;
    padding-top: 6px;
    border-top: 1px solid var(--ed-pop-line);
  }

  .pop-row span {
    color: var(--ed-pop-sec);
    font-size: 15px;
    line-height: 20px;
  }

  .pop-row b {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    font-variant-numeric: tabular-nums;
  }

  .pop.day {
    z-index: 20;
    top: 72px;
    right: 12px;
    left: 12px;
    gap: 6px;
    padding: 14px 14px 8px;
    border-radius: 16px;
  }

  .pop.day h3 {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
  }

  .pop.day h3 span {
    color: var(--ed-pop-sec);
    font-size: 15px;
    font-weight: 400;
  }

  .day-cols {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 16px;
    align-items: start;
  }

  .day-total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-bottom: 4px;
    color: var(--ed-pop-sec);
    font-size: 13px;
    line-height: 18px;
  }

  .day-total b {
    color: var(--ed-text);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .day-item {
    display: grid;
    grid-template-columns: 8px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    min-height: 36px;
    border-top: 1px solid var(--ed-pop-line);
    font-size: 15px;
    line-height: 20px;
  }

  .day-item i {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }

  .day-item span {
    white-space: nowrap;
  }

  .day-item b {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  /* --------------------------------------------------------------- car */
  .car-top {
    position: relative;
    height: 168px;
  }

  .car-top .head {
    position: relative;
  }

  .car-art {
    position: absolute;
    right: -4px;
    bottom: 0;
    width: 276px;
    height: 150px;
    pointer-events: none;
    /* Scaled up from the ground line, around the car (ui: car.image_scale). */
    transform-origin: 61% 100%;
  }

  .car-art .glow {
    position: absolute;
    inset: auto 6px 2px;
    height: 30px;
    border-radius: 50%;
    opacity: 0.95;
  }

  .car-art .shadow {
    position: absolute;
    inset: auto 14px 9px 22px;
    height: 8px;
    border-radius: 50%;
    background: radial-gradient(closest-side, rgb(0 0 0 / 65%), transparent);
  }

  .car-art img {
    position: absolute;
    right: 8px;
    bottom: 10px;
    display: block;
    width: 204px;
    max-height: 101px;
    object-fit: contain;
    filter: drop-shadow(0 6px 10px rgb(0 0 0 / 45%));
  }

  /* The hit area of the car picture: the same box and scaling as the picture, so it covers the car and nothing else. */
  .car-art.car-hitbox {
    z-index: 1;
  }

  .car-hit {
    position: absolute;
    right: 8px;
    bottom: 10px;
    width: 204px;
    height: 101px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
    touch-action: manipulation;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }

  .car-hit:focus-visible {
    outline: 2px solid var(--ed-accent, #0a84ff);
    outline-offset: 2px;
    border-radius: 12px;
  }

  /* Over the lower right of the picture; it lies on top and moves nothing. */
  .car-hint {
    position: absolute;
    z-index: 6;
    right: 8px;
    bottom: 8px;
    padding: 8px 12px;
    border-radius: 12px;
    background: var(--ed-bubble, #3a3a3c);
    color: var(--ed-bubble-text, #ffffff);
    box-shadow: 0 6px 20px rgb(0 0 0 / 55%);
    font-size: 13px;
    line-height: 18px;
    pointer-events: none;
  }

  .car-soc {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }

  .soc {
    font-size: 52px;
    font-weight: 400;
    line-height: 54px;
    letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
  }

  .soc small {
    color: var(--ed-secondary);
    font-size: 20px;
  }

  .range {
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
  }

  .range b {
    color: var(--ed-text);
    font-weight: 500;
  }

  .meter-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meter {
    position: relative;
    display: flex;
    gap: 2px;
    height: 34px;
  }

  .meter > span {
    position: relative;
    flex: 1 1 0;
    overflow: hidden;
    border-radius: 0;
    background: var(--ed-tile);
  }

  .meter > span:first-child {
    border-radius: 12px 0 0 12px;
  }

  .meter > span:last-of-type {
    border-radius: 0 12px 12px 0;
  }

  .meter > span > i {
    position: absolute;
    inset: 0 auto 0 0;
    background: var(--ed-car);
  }

  .meter .limit {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px solid var(--ed-text);
    opacity: 0.8;
  }

  .meter-label {
    position: relative;
    height: 16px;
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 16px;
  }

  .meter-label span {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .mix {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mix-head {
    display: flex;
    justify-content: space-between;
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
  }

  .mix-bar {
    display: flex;
    gap: 2px;
    height: 20px;
    border-radius: 7px;
    overflow: hidden;
  }

  .mix-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 2px 12px;
    font-size: 13px;
    line-height: 20px;
  }

  .mix-legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .mix-legend i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  .mix-legend em {
    color: var(--ed-secondary);
    font-style: normal;
    font-variant-numeric: tabular-nums;
  }

  .mode {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mode-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    font-size: 17px;
    line-height: 22px;
  }

  .mode-sub {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
    text-align: right;
  }

  /* --------------------------------------------------------- hot water */
  .water {
    display: flex;
    flex-direction: column;
  }

  .source {
    box-sizing: border-box;
    padding: 12px 12px 0;
    border-radius: 12px;
    background: var(--ed-tile);
    overflow: hidden;
  }

  .source-top {
    display: grid;
    grid-template-columns: 108px minmax(0, 1fr);
    align-items: start;
    gap: 12px;
  }

  .arc {
    position: relative;
    width: 108px;
    height: 102px;
  }

  .arc > svg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }

  .arc-num {
    position: absolute;
    inset: 27px 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .arc-num b {
    font-size: 36px;
    font-weight: 500;
    line-height: 38px;
    letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
  }

  .arc-num span {
    color: var(--ed-pop-sec);
    font-size: 13px;
    font-weight: 500;
    line-height: 15px;
  }

  :host([data-light]) .arc-num span {
    color: var(--ed-secondary);
  }

  .arc-min,
  .arc-max {
    position: absolute;
    top: 87px;
    transform: translateX(-50%);
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 14px;
    font-variant-numeric: tabular-nums;
  }

  .arc-min {
    left: 25px;
  }

  .arc-max {
    left: 83px;
  }

  .source-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    height: 100px;
  }

  .source-title {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    white-space: nowrap;
  }

  /* The parts ("not heating", "· target 60 °C") wrap as wholes when a language is wordy. */
  .source-line {
    font-size: 13px;
    line-height: 18px;
  }

  .source-line .src,
  .source-line .dim {
    white-space: nowrap;
  }

  .source-line .src {
    color: var(--c);
    font-weight: 500;
  }

  :host([data-light]) .source-line .src {
    color: color-mix(in srgb, var(--c) 45%, #000);
  }

  .warn,
  .mode-sub.warn,
  .hint.warn {
    color: var(--ed-warning);
  }

  :host([data-light]) .warn,
  :host([data-light]) .mode-sub.warn,
  :host([data-light]) .hint.warn {
    color: color-mix(in srgb, var(--ed-warning) 45%, #000);
  }

  .source-line .dim {
    color: var(--ed-secondary);
  }

  .subrow {
    margin: 10px -12px 0;
    border-top: 1px solid var(--ed-sep);
  }

  .rowbtn {
    all: unset;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 48px;
    padding: 4px 12px;
    color: var(--ed-text);
    cursor: pointer;
  }

  .rowbtn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: -2px;
    border-radius: 10px;
  }

  .rowbtn-title {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
  }

  /* On the narrowest phones the value wraps to a second line instead of being cut. */
  .rowbtn-value {
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
    text-align: right;
  }

  .rowbtn-value b {
    color: var(--ed-text);
    font-weight: 500;
  }

  /* The water between the two tiles: connectors and the mixing capsule. */
  .link {
    width: 0;
    height: 8px;
    margin: 0 auto;
    border-left: 2px dashed var(--ed-off);
  }

  .link.on {
    border-left-style: solid;
    border-left-color: var(--ed-text);
  }

  .mixcap {
    position: relative;
    align-self: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 48px;
    padding: 0 8px 0 14px;
    border-radius: 24px;
    background: var(--ed-tile);
  }

  .mixcap-text {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  .mixcap-note {
    color: var(--ed-secondary);
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
  }

  /* ------------------------------------------------------------- lists */
  .group {
    padding: 2px 12px;
    list-style: none;
    border-radius: 12px;
    background: var(--ed-tile);
  }

  .group > li + li {
    border-top: 1px solid var(--ed-sep);
  }

  .row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
    width: 100%;
    min-height: 60px;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .row-btn {
    cursor: pointer;
  }

  .row-btn:disabled {
    cursor: default;
  }

  .row-btn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: -2px;
  }

  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--bc, transparent) 16%, var(--ed-badge));
  }

  .badge svg {
    width: 24px;
    height: 24px;
    fill: var(--bc, var(--ed-off));
  }

  .row-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .row-title {
    font-size: 17px;
    font-weight: 500;
    line-height: 21px;
  }

  .row-sub {
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .row-sub b {
    color: var(--c, var(--ed-text));
    font-weight: 500;
  }

  :host([data-light]) .row-sub b {
    color: color-mix(in srgb, var(--c, var(--ed-text)) 45%, #000);
  }

  .row-aside {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
    text-align: right;
  }

  .chevron {
    width: 14px;
    height: 14px;
    fill: var(--ed-secondary);
    transition: transform 0.25s;
  }

  [aria-expanded="true"] > .chevron,
  .chevron.turned {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron {
      transition: none;
    }
  }

  /* Detail of a row: grows open under the row, inside the same group. */
  .fold {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows 0.28s ease,
      visibility 0s linear 0.28s;
  }

  .fold.open {
    grid-template-rows: 1fr;
    visibility: visible;
    transition-delay: 0s;
  }

  .fold > div {
    min-height: 0;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .fold {
      transition: none;
    }
  }

  .detail {
    display: grid;
    gap: 16px;
    padding: 4px 12px 14px;
  }

  .field {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 12px;
  }

  .mode .field {
    padding-bottom: 6px;
  }

  .field.off {
    opacity: 0.5;
    pointer-events: none;
  }

  .field ed-slider {
    grid-column: 1 / -1;
    margin-top: 2px;
  }

  .field-label {
    display: flex;
    flex-direction: column;
    font-size: 17px;
    line-height: 22px;
  }

  .field-value {
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .field-value small {
    color: var(--ed-secondary);
    font-size: 15px;
  }

  .hint {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  .switch-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-height: 64px;
    border-top: 1px solid var(--ed-sep);
  }

  .switch-text {
    display: flex;
    flex-direction: column;
  }

  .switch-title {
    font-size: 17px;
    line-height: 22px;
  }

  .feedback {
    min-height: 18px;
    padding: 0 4px;
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* Popup of the battery: gauge of ten pills, estimate, trend (CURRENT_SPEC.md, Baterie). */
  .bat-pop {
    --pill: var(--ed-pop-line);
  }

  .bat-gauge {
    display: flex;
    gap: 2px;
  }

  .pill {
    position: relative;
    flex: 1 1 0;
    overflow: hidden;
    background: var(--pill);
  }

  .pill i {
    position: absolute;
    inset: 0 auto 0 0;
  }

  .bat-estimate {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--ed-pop-sec);
    font-size: 15px;
    line-height: 20px;
  }

  .bat-estimate svg {
    width: 16px;
    height: 16px;
    flex: none;
    fill: none;
    stroke: currentcolor;
    stroke-width: 1.6;
    stroke-linecap: round;
  }

  .bat-estimate.plain {
    color: var(--ed-secondary);
  }

  .bat-trend {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .bat-trend svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .bat-trend .axis,
  .bat-chart .axis {
    stroke: var(--ed-tick);
    stroke-width: 1.5;
  }

  .bat-legend {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    color: var(--ed-pop-sec);
    font-size: 13px;
    line-height: 18px;
  }

  .bat-legend span {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .bat-legend.wrap {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 6px 16px;
  }

  .bat-legend .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .bat-legend .bar {
    width: 16px;
    height: 3px;
    border-radius: 2px;
  }

  .bat-legend .swatch {
    width: 16px;
    height: 8px;
    border-radius: 2px;
    opacity: 0.45;
  }

  .bat-open {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 12px;
    background: var(--ed-pop-line);
    color: var(--ed-text);
    font-size: 15px;
    font-weight: 500;
    text-align: left;
  }

  .bat-open svg {
    width: 24px;
    height: 24px;
    fill: var(--ed-pop-sec);
  }

  /* Detail of the battery: a page of its own inside the card. */
  .bat-detail {
    --pill: var(--ed-tile);
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    outline: none;
  }

  .bat-nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    min-height: 44px;
  }

  .bat-nav h2 {
    font-size: 17px;
    font-weight: 700;
    line-height: 22px;
  }

  .bat-link {
    background: none;
    border: 0;
    min-width: 64px;
    min-height: 44px;
    padding: 0 6px;
    /* The accent alone is 3.3:1 on the light page; mixed with the text colour it passes 4.5:1 in both themes. */
    color: color-mix(in srgb, var(--ed-accent) 60%, var(--ed-text));
    font-size: 17px;
    text-align: left;
  }

  .bat-link.end {
    text-align: right;
    font-weight: 500;
  }

  .bat-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 16px;
    background: var(--ed-card);
  }

  .bat-card.row {
    flex-direction: row;
    align-items: center;
    gap: 14px;
  }

  .bat-card.flush {
    gap: 0;
    padding: 0;
  }

  .bat-card-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
  }

  .bat-card-head > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .bat-card-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .bat-card-bar ed-segmented {
    width: 132px;
  }

  .bat-cap {
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.6px;
    line-height: 18px;
    text-transform: uppercase;
  }

  .bat-cap.pad {
    padding: 14px 16px 4px;
  }

  .bat-sub {
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
  }

  .bat-huge {
    font-size: 56px;
    font-weight: 700;
    letter-spacing: -1.5px;
    line-height: 56px;
    font-variant-numeric: tabular-nums;
  }

  .bat-kpis {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .bat-kpi {
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 12px 14px;
    border-radius: 16px;
    background: var(--ed-card);
  }

  .bat-kpi .sub,
  .bat-two .sub {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  .bat-kpi .val,
  .bat-two .val {
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
    font-variant-numeric: tabular-nums;
  }

  .bat-two {
    display: flex;
    gap: 10px;
  }

  .bat-two > div {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .bat-split {
    display: flex;
    gap: 2px;
    overflow: hidden;
    height: 10px;
    border-radius: 5px;
    background: var(--ed-tile);
  }

  .bat-split > i {
    min-width: 4px;
  }

  .bat-split > i:first-child {
    border-radius: 5px 0 0 5px;
  }

  .bat-split > i:last-child {
    border-radius: 0 5px 5px 0;
  }

  .bat-split > i:only-child {
    border-radius: 5px;
  }

  .bat-read {
    min-height: 20px;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    line-height: 20px;
  }

  .bat-chart {
    position: relative;
    width: 100%;
  }

  .bat-chart svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .bat-chart .grid {
    stroke: var(--ed-tile);
    stroke-width: 1;
  }

  .bat-chart .cursor {
    stroke: var(--ed-text);
    stroke-width: 2;
    opacity: 0.5;
  }

  .bat-ylabel {
    position: absolute;
    left: 0;
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 14px;
    pointer-events: none;
    font-variant-numeric: tabular-nums;
  }

  .bat-chart input[type="range"] {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    touch-action: pan-y;
  }

  .bat-chart:focus-within {
    outline: 2px solid var(--ed-accent);
    outline-offset: 2px;
    border-radius: 6px;
  }

  .bat-axis {
    display: flex;
    justify-content: space-between;
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  .bat-nodata {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 96px;
    color: var(--ed-secondary);
    font-size: 24px;
  }

  .bat-nodata.small {
    min-height: 56px;
    font-size: 17px;
  }

  .bat-band {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 15px;
    font-variant-numeric: tabular-nums;
  }

  .bat-band .name {
    width: 72px;
    color: var(--ed-secondary);
  }

  .bat-band .track {
    position: relative;
    flex: 1;
    overflow: hidden;
    height: 10px;
    border-radius: 5px;
    background: var(--ed-tile);
  }

  .bat-band .track i {
    position: absolute;
    inset: 0 auto 0 0;
  }

  .bat-band .pct {
    width: 44px;
    text-align: right;
  }

  .bat-badge {
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--ed-tile);
  }

  .bat-badge svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: var(--ed-off);
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .bat-badge.ok {
    background: color-mix(in srgb, var(--ed-battery) 20%, transparent);
  }

  .bat-badge.ok svg {
    stroke: var(--ed-battery);
  }

  .bat-badge.warn {
    background: color-mix(in srgb, var(--ed-warning) 20%, transparent);
  }

  .bat-badge.warn svg {
    stroke: var(--ed-warning);
  }

  .bat-col {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .bat-title {
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
  }

  .bat-title.warn {
    color: var(--ed-warning);
  }

  .bat-title.off {
    color: var(--ed-off);
  }

  .bat-row {
    background: none;
    border: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    box-sizing: border-box;
    width: 100%;
    min-height: 68px;
    padding: 14px 16px;
    border-radius: 16px;
    color: var(--ed-text);
    text-align: left;
  }

  .bat-row:disabled {
    color: var(--ed-text);
  }

  .bat-label {
    font-size: 17px;
    font-weight: 500;
    line-height: 22px;
  }

  .bat-value {
    font-size: 30px;
    font-weight: 700;
    line-height: 34px;
    font-variant-numeric: tabular-nums;
  }

  .bat-word {
    font-size: 15px;
    font-weight: 700;
  }

  .bat-row .chev {
    width: 20px;
    height: 20px;
    flex: none;
    fill: var(--ed-off);
    transition: transform 0.25s ease;
  }

  .bat-row .chev.open {
    transform: rotate(90deg);
  }

  .bat-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px 16px;
  }

  .bat-list {
    display: flex;
    flex-direction: column;
  }

  .bat-list.pad {
    padding: 0 16px 8px;
  }

  .bat-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    box-sizing: border-box;
    min-height: 44px;
    border-top: 1px solid var(--ed-sep);
    font-size: 16px;
    line-height: 22px;
  }

  .bat-line:first-child {
    border-top: 0;
  }

  .bat-line b {
    color: var(--ed-secondary);
    font-weight: 400;
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  @media (prefers-reduced-motion: reduce) {
    .bat-row .chev {
      transition: none;
    }
  }

  /* The sun: popup and detail (CURRENT_SPEC.md, Slunce). They reuse the battery pieces above (bat-*, mix-bar, segs). */
  .sun-pop {
    --sun-track: var(--ed-pop-line);
    --sun-sub: var(--ed-pop-sec);
  }

  .sun-detail {
    --sun-track: var(--ed-tile);
    --sun-sub: var(--ed-secondary);
  }

  .bat-card.rel {
    position: relative;
  }

  .sun-bar {
    height: 12px;
    border-radius: 6px;
  }

  .sun-bar.large {
    height: 16px;
    border-radius: 8px;
  }

  .sun-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
  }

  .sun-legend > span {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
  }

  .sun-legend .name {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--sun-sub);
    font-size: 13px;
    line-height: 18px;
    white-space: nowrap;
  }

  .sun-legend .name i {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .sun-legend b {
    white-space: nowrap;
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    font-variant-numeric: tabular-nums;
  }

  .sun-title {
    font-size: 15px;
    font-weight: 600;
  }

  .sun-unit {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--ed-secondary);
    font-size: 13px;
  }

  /* The small (i) that opens a bubble over the card: a hint never takes room in a panel. */
  .sun-hint {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin: -13px -13px -13px 0;
    border: 0;
    background: none;
    cursor: pointer;
  }

  .sun-hint svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: var(--ed-secondary);
    stroke-width: 1.8;
    stroke-linecap: round;
  }

  .sun-hint circle:last-child {
    fill: var(--ed-secondary);
    stroke: none;
  }

  .sun-note {
    position: absolute;
    z-index: 5;
    inset: 48px 12px auto;
    padding: 12px 14px;
    border-radius: 14px;
    background: var(--ed-bubble);
    box-shadow: 0 8px 24px var(--ed-pop-shadow);
    color: var(--ed-bubble-text);
    font-size: 13px;
    line-height: 19px;
    cursor: pointer;
  }

  .sun-ring {
    position: relative;
    flex: none;
  }

  .sun-ring svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .sun-ring .track {
    stroke: var(--sun-track, var(--ed-tile));
  }

  .sun-ring .fill {
    stroke: var(--ed-sun);
  }

  .sun-ring .num {
    position: absolute;
    inset: 50% 0 auto;
    transform: translateY(-62%);
    font-weight: 700;
    line-height: 1;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .sun-ring .unit {
    position: absolute;
    inset: 50% 0 auto;
    margin-top: 8px;
    color: var(--sun-sub, var(--ed-secondary));
    font-size: 10px;
    line-height: 1;
    text-align: center;
  }

  .sun-sofar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .sun-sofar .text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .sun-sofar .sub {
    color: var(--sun-sub, var(--ed-secondary));
    font-size: 13px;
    line-height: 18px;
    white-space: nowrap;
  }

  .sun-sofar .val {
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .sun-kpi-ring {
    justify-content: center;
  }

  .sun-yellow {
    /* Yellow text alone is 1.4:1 on the light page; mixed with the text colour it passes in both themes. */
    color: color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text));
    font-weight: 600;
  }

  .sun-mode ed-segmented {
    width: 188px;
    flex: none;
  }

  .sun-blocks {
    display: flex;
    gap: 2px;
    min-height: 23px;
  }

  .sun-blocks > span {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
    color: var(--ed-secondary);
    font-size: 11px;
    line-height: 13px;
    text-align: center;
    white-space: nowrap;
  }

  .sun-blocks i {
    height: 5px;
    margin: 0 2px;
    border-radius: 3px;
  }

  .sun-legend-row {
    justify-content: flex-start;
    gap: 16px;
    min-height: 23px;
    align-items: flex-start;
  }

  .bat-legend .dots {
    width: 16px;
    height: 0;
    border-top: 2px dotted var(--ed-secondary);
  }

  .sun-two {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .sun-two .bat-card {
    gap: 6px;
  }

  .sun-two .val.big {
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
    font-variant-numeric: tabular-nums;
  }

  .sun-half {
    display: block;
    width: 124px;
    max-width: 100%;
    margin: 0 auto;
  }

  .sun-half-text {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    font-weight: 600;
  }

  .sun-dots {
    display: flex;
    flex-wrap: nowrap;
    gap: 1.5px;
    margin-top: 4px;
  }

  .sun-dots i {
    flex: 1 1 0;
    max-width: 10px;
    height: 10px;
    border-radius: 3px;
    background: var(--ed-tile);
  }

  .sun-dots i.on {
    background: var(--ed-sun);
  }

  .sun-acc {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .sun-acc b {
    font-size: 28px;
    font-weight: 700;
    white-space: nowrap;
  }

  .sun-pairs {
    display: block;
    width: 100%;
  }

  .sun-pairs .axis {
    stroke: var(--ed-tick);
    stroke-width: 1;
  }

  .sun-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .sun-hero .text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .sun-est {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.8px;
    line-height: 44px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .sun-est .approx {
    color: var(--ed-secondary);
  }

  .sun-conf {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 6px;
    font-size: 15px;
  }

  .sun-conf .level {
    display: flex;
    gap: 2px;
    width: 84px;
    height: 8px;
  }

  .sun-conf .level i {
    flex: 1;
    background: var(--ed-tile);
  }

  .sun-conf .level i.on {
    background: var(--ed-sun);
  }

  .sun-conf .level i:first-child {
    border-radius: 4px 0 0 4px;
  }

  .sun-conf .level i:last-child {
    border-radius: 0 4px 4px 0;
  }

  .sun-five {
    display: flex;
    flex-direction: column;
  }

  .sun-five-head,
  .sun-five-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .sun-five-row {
    padding: 9px 0;
    border-top: 1px solid var(--ed-sep);
  }

  .sun-five .day {
    display: flex;
    flex: none;
    flex-direction: column;
    width: 84px;
    min-width: 0;
  }

  .sun-five .day b {
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
  }

  .sun-five .day span {
    overflow: hidden;
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .sun-five .strip {
    display: flex;
    flex: 1 1 0;
    gap: 2px;
    min-width: 0;
  }

  .sun-five-head .strip span {
    flex: 1 1 0;
    min-width: 0;
    color: var(--ed-secondary);
    font-size: 11px;
    line-height: 14px;
  }

  .sun-five .strip i {
    flex: 1 1 0;
    min-width: 0;
    height: 24px;
    border-radius: 4px;
    background: var(--ed-tile);
  }

  .sun-five .strip i.faint {
    background: color-mix(in srgb, var(--ed-sun) 14%, var(--ed-tile));
  }

  .sun-five .strip i.mid {
    background: color-mix(in srgb, var(--ed-sun) 38%, var(--ed-tile));
  }

  .sun-five .strip i.strong {
    background: var(--ed-sun);
  }

  .sun-five .strip i.now {
    box-shadow: 0 0 0 1.5px var(--ed-text);
  }

  .sun-five .end {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: flex-end;
    min-width: 64px;
    color: var(--ed-secondary);
    font-size: 11px;
    text-align: right;
  }

  .sun-five-row .end b {
    color: var(--ed-text);
    font-size: 15px;
    font-weight: 700;
    line-height: 18px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .sun-five-row .end span {
    font-size: 12px;
    line-height: 15px;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }

  .sun-five-row .end span.off {
    color: var(--ed-secondary);
  }

  .sun-line > span {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .sun-line > span i {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .sun-line b {
    color: var(--ed-text);
    font-weight: 700;
    white-space: nowrap;
  }
`, Os = ["cs", "en", "sv"];
class ja extends Error {
}
function J(e) {
  throw new ja(e);
}
function Hs(e, t) {
  try {
    return t();
  } catch (a) {
    throw a instanceof ja ? new Error(`${e}: ${a.message}`) : a;
  }
}
function Oe(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function mt(e, t) {
  return e == null ? {} : (Oe(e) || J(`"${t}" must be a mapping of keys.`), e);
}
function Yt(e, t, a) {
  for (const s of Object.keys(e))
    t.includes(s) || J(`${a}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function Ps(e, t, a = {}) {
  if (e == null)
    return;
  const s = typeof e == "string" ? e.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || J(`${t} must be an entity ID such as ${a.example ?? `${a.domain ?? "sensor"}.example`}.`), a.domain && !s.startsWith(`${a.domain}.`) && J(`${t} must be a ${a.domain} entity (${a.domain}.…), not ${s}.`), s;
}
const aa = ["auto", ...Os];
function Rs(e) {
  const t = e ?? "auto";
  return aa.includes(t) || J(`language must be one of ${aa.join(", ")}.`), t;
}
const ue = {
  pv: { power: void 0, total_generation: void 0 },
  battery: {
    power: void 0,
    state_of_charge: void 0,
    depth_of_discharge: "number",
    state_of_health: void 0,
    voltage: void 0,
    current: void 0,
    temperature: void 0,
    min_cell_voltage: void 0,
    max_cell_voltage: void 0,
    min_cell_temperature: void 0,
    max_cell_temperature: void 0,
    total_charge: void 0,
    total_discharge: void 0,
    inverter_temperature_air: void 0,
    inverter_temperature_radiator: void 0,
    mode: void 0,
    charge_limit: void 0,
    discharge_limit: void 0,
    error: void 0,
    warning: void 0
  },
  grid: { power: void 0 },
  house: { power: void 0 },
  car: { state_of_charge: void 0, range: void 0, image: "image" },
  wallbox: { power: void 0, status: void 0, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch" },
  forecast: { energy_today: void 0, energy_tomorrow: void 0, energy_day_2: void 0, energy_day_3: void 0, energy_day_4: void 0, weather: "weather" },
  daily: { pv_generation: void 0, battery_charge: void 0, battery_discharge: void 0, grid_import: void 0, grid_export: void 0, car: void 0, boiler: void 0 }
}, za = { boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"], forecast: ["default_range"] }, sa = ["1d", "7d", "30d"], Ns = "1d", na = ["7d", "30d"], Ws = "7d", ia = ["always", "heating"], Fs = "heating", oa = ["auto", 1, 2], Is = "auto", Oa = Object.keys(ue), O = (e, t, a, s, n = !1) => ({ value: e, min: t, max: a, what: s, integer: n }), He = {
  battery: {
    reserve: O(20, 0, 100, "% battery reserve"),
    capacity: O(11.2, 0.1, 1e3, "kWh usable capacity (time estimates, equivalent cycles, load in C)"),
    imbalance_good: O(15, 0, 1e3, "mV cell imbalance up to which it is called excellent"),
    imbalance_warn: O(30, 0, 1e3, "mV cell imbalance up to which it is called good (above it needs attention)"),
    imbalance_fault: O(100, 0, 1e3, "mV cell imbalance above which it is called a fault")
  },
  car: {
    charge_limit: O(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)"),
    image_scale: O(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)")
  },
  wallbox: {
    phases: O(3, 1, 3, "number of phases", !0),
    power_min: O(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: O(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: O(300, 1, 1e5, "W, step of the charging power (all phases)"),
    priority_min_sun: O(200, 0, 1e5, "W of sun above which a waiting car is reported")
  },
  boiler: {
    target_min: O(20, 0, 100, "°C, lowest target"),
    target_max: O(85, 0, 100, "°C, highest target"),
    target_step: O(5, 1, 50, "°C, target step"),
    hold_minutes: O(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)")
  },
  water: {
    gauge_min: O(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: O(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)")
  },
  tank: {
    temp_min: O(38, 0, 100, "°C, lowest temperature"),
    temp_max: O(65, 0, 100, "°C, highest temperature"),
    temp_step: O(1, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: O(100, 0, 1e3, "W, below this a flow counts as none"),
    kw_from: O(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    export_notice: O(300, 0, 1e5, "W of export that counts as a surplus"),
    source_min_share: O(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: O(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: O(10, 0.5, 50, "px per kW, thickness of the bands"),
    band_min_px: O(1.6, 0.5, 10, "px, thinnest band")
  },
  forecast: {
    good_power: O(2e3, 100, 1e5, "W of sun from which an hour counts as strong (the filled blocks of the five days, the window)"),
    good_day: O(10, 0.1, 1e3, "kWh a day from which a day counts as good (Historie)"),
    learn_days: O(14, 3, 90, "days the curve of what is possible and the typical deviation of the forecast are learned from", !0),
    possible_percentile: O(90, 50, 100, "% percentile of the days that sets what is possible in an hour"),
    typical_deviation: O(20, 1, 100, "% deviation of the forecast assumed until the card has seen enough days"),
    strip_from: O(6, 0, 23, "hour the hourly strips start at", !0),
    strip_to: O(17, 1, 24, "hour the hourly strips end at (the hour itself is the last block)", !0),
    evening_hour: O(22, 12, 23, "hour the evening battery level is estimated for", !0),
    morning_hour: O(6, 0, 11, "hour the night ends at (the battery level in the morning)", !0),
    car_start_soc: O(50, 0, 100, "% battery level from which the wallbox is started in the evening estimate"),
    car_stop_soc: O(30, 0, 100, "% battery level at which the wallbox is stopped in the evening estimate"),
    car_min_sun: O(2e3, 0, 1e5, "W of sun from which the wallbox is started in the evening estimate"),
    car_kwh_per_km: O(0.34, 0.01, 10, "kWh per km the car takes from the wallbox (the km of the sun are counted with it)"),
    efficiency: O(95, 50, 100, "% efficiency of the battery in one direction")
  },
  scale: {
    sun: O(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: O(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: O(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: O(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: O(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: O(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: {
    revert_after: O(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: O(550, 200, 3e3, "ms to hold a protected control to switch it", !0),
    double_tap_ms: O(400, 150, 1e3, "ms between the two taps of a double tap", !0),
    hint_seconds: O(3, 1, 10, "s the hint of a protected control stays")
  }
}, ae = {
  sun: "#FFD60A",
  battery: "#30D158",
  grid: "#3D8BFF",
  house: "#BF5AF2",
  car: "#40D0E6",
  boiler: "#FF6F59",
  discharge: "#64D2FF",
  accent: "#0A84FF",
  warning: "#FF9230",
  neutral: "#8E8E93",
  cold: "#64D2FF",
  hot: "#FF9F0A"
}, Us = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], _e = ["electricity", "car", "water"];
[
  ...Oa.flatMap((e) => Object.keys(ue[e]).map((t) => `${e}.${t}`)),
  ...Object.entries(He).flatMap(([e, t]) => Object.keys(t).map((a) => `${e}.${a}`)),
  ..._e.map((e) => `titles.${e}`),
  ...Object.keys(ae).map((e) => `colors.${e}`)
];
function Vs(e, t) {
  const a = mt(e[t], t), s = ue[t], n = [...Object.keys(He[t] ?? {}), ...za[t] ?? []];
  Yt(a, [...Object.keys(s), ...n], t);
  const i = {};
  for (const [o, r] of Object.entries(s)) {
    const l = Ps(a[o], `${t}.${o}`, { domain: r });
    l && (i[o] = l);
  }
  return i;
}
function Gs(e) {
  const t = {};
  for (const [a, s] of Object.entries(He)) {
    const n = mt(e[a], a), i = Object.keys(ue[a] ?? {});
    Yt(n, [...i, ...Object.keys(s), ...za[a] ?? []], a), t[a] = {};
    for (const [o, r] of Object.entries(s)) {
      const l = n[o], c = `${a}.${o}`;
      if (l == null) {
        t[a][o] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && J(`${c} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && J(`${c} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[a][o] = l;
    }
  }
  return t;
}
function Zs(e) {
  const t = mt(e.colors, "colors");
  Yt(t, [...Object.keys(ae), "temp_scale"], "colors");
  const a = { ...ae };
  for (const s of Object.keys(ae)) {
    const n = t[s];
    n != null && ((typeof n != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.trim())) && J(`colors.${s} must be a colour like #FFD60A (six hex digits).`), a[s] = n.trim().toUpperCase());
  }
  return a;
}
function Ks(e) {
  const t = mt(e.colors, "colors").temp_scale;
  if (t == null)
    return Us.map((n) => ({ ...n }));
  const a = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && J(`${a} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const s = t.map((n, i) => (Oe(n) || J(`${a}[${i}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Yt(n, ["temp", "color"], `${a}[${i}]`), (typeof n.temp != "number" || !Number.isFinite(n.temp)) && J(`${a}[${i}].temp must be a number (°C).`), (typeof n.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.color.trim())) && J(`${a}[${i}].color must be a colour like #0A84FF (six hex digits).`), { temp: n.temp, color: n.color.trim().toUpperCase() }));
  return s.forEach((n, i) => {
    i > 0 && n.temp <= s[i - 1].temp && J(`${a}: temperatures must rise (${s[i - 1].temp} is followed by ${n.temp}).`);
  }), s;
}
function Ys(e) {
  const t = mt(e.boiler, "boiler").show;
  return t == null ? Fs : ((typeof t != "string" || !ia.includes(t)) && J(`boiler.show must be one of ${ia.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function qs(e) {
  const t = mt(e.battery, "battery").default_range;
  return t == null ? Ns : ((typeof t != "string" || !sa.includes(t)) && J(`battery.default_range must be one of ${sa.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Js(e) {
  const t = mt(e.forecast, "forecast").default_range;
  return t == null ? Ws : ((typeof t != "string" || !na.includes(t)) && J(`forecast.default_range must be one of ${na.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Xs(e) {
  const t = mt(e.flows, "flows").decimals;
  return t == null ? Is : (oa.includes(t) || J(`flows.decimals must be one of ${oa.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const Qs = "/dashboard-bmw";
function tn(e) {
  const t = mt(e.car, "car").link;
  return t == null ? Qs : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && J(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function en(e) {
  const t = mt(e.titles, "titles");
  Yt(t, [..._e], "titles");
  const a = {};
  for (const s of _e) {
    const n = t[s];
    n != null && ((typeof n != "string" || n.trim() === "") && J(`titles.${s} must be a non-empty text.`), a[s] = n.trim());
  }
  return a;
}
function an(e) {
  const t = [
    [e.wallbox.power_min, e.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [e.boiler.target_min, e.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [e.water.gauge_min, e.water.gauge_max, "water.gauge_min", "water.gauge_max", !0],
    [e.tank.temp_min, e.tank.temp_max, "tank.temp_min", "tank.temp_max", !0],
    [e.forecast.strip_from, e.forecast.strip_to, "forecast.strip_from", "forecast.strip_to", !0],
    [e.forecast.car_stop_soc, e.forecast.car_start_soc, "forecast.car_stop_soc", "forecast.car_start_soc", !0],
    [e.forecast.morning_hour, e.forecast.evening_hour, "forecast.morning_hour", "forecast.evening_hour", !0],
    [e.battery.imbalance_good, e.battery.imbalance_warn, "battery.imbalance_good", "battery.imbalance_warn", !1],
    [e.battery.imbalance_warn, e.battery.imbalance_fault, "battery.imbalance_warn", "battery.imbalance_fault", !1]
  ];
  for (const [a, s, n, i, o] of t)
    (o ? a >= s : a > s) && J(`${n} (${a}) must be ${o ? "below" : "at most"} ${i} (${s}).`);
}
function sn(e) {
  return Hs("Energie Dashboard", () => nn(e));
}
function nn(e) {
  Oe(e) || J("the configuration must be a mapping of keys."), e.title != null && typeof e.title != "string" && J("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(Oa.map((n) => [n, Vs(e, n)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && J("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const a = Gs(e);
  an(a);
  const s = Rs(e.language);
  return { title: e.title ?? void 0, language: s, entities: t, titles: en(e), num: a, colors: Zs(e), tempScale: Ks(e), boilerShow: Ys(e), powerDecimals: Xs(e), carLink: tn(e), batteryRange: qs(e), sunRange: Js(e) };
}
const M = "––", gt = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, jt = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, ra = "ha-energie-dashboard:boiler-heating", la = "ha-energie-dashboard:battery-range", da = "ha-energie-dashboard:sun-range";
function $t(e, t) {
  const a = e?.attributes?.[t];
  return typeof a == "number" && Number.isFinite(a) ? a : void 0;
}
function on(e) {
  const t = e.reduce((i, o) => i + o, 0);
  if (t <= 0) return e.map(() => 0);
  const a = e.map((i) => i / t * 100), s = a.map(Math.floor);
  let n = 100 - s.reduce((i, o) => i + o, 0);
  return a.map((i, o) => ({ index: o, rest: i - s[o] })).sort((i, o) => o.rest - i.rest).forEach(({ index: i }) => {
    n-- > 0 && s[i]++;
  }), s;
}
const I = (e, t, a) => Math.max(t, Math.min(a, e)), Pe = (e, t) => `color-mix(in srgb, ${e} ${t}%, transparent)`, Jt = (e, t) => `color-mix(in srgb, ${e} ${t}%, var(--ed-tint-base))`, Ha = (e) => Array.from({ length: 10 }, (t, a) => I((e - a * 10) / 10, 0, 1) * 100), ca = (e) => `calc((100% - 18px) * ${I(e, 0, 100) / 100} + ${Math.max(0, Math.ceil(I(e, 0, 100) / 10) - 1) * 2}px)`;
var rn = Object.defineProperty, Z = (e, t, a, s) => {
  for (var n = void 0, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (n = o(t, a, n) || n);
  return n && rn(t, a, n), n;
};
class G extends _t {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._sunDetail = !1, this._sunTab = "today", this._sunMode = "total", this._i18n = ie("cs"), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = sn(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(ra)) || 0);
    } catch {
    }
    this._clock = window.setInterval(() => this._now = Date.now(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer?.disconnect(), this._observer = void 0, this._timers.forEach((t) => window.clearTimeout(t)), this._timers.clear(), window.clearInterval(this._clock);
  }
  /** The texts of the card language. */
  get t() {
    return this._i18n.t;
  }
  get boostOptions() {
    return [{ value: "off", label: this.t.boostOptions.off }, { value: "on", label: this.t.boostOptions.on }];
  }
  willUpdate() {
    this._i18n = ie(ms(this._config?.language ?? "auto", this.hass), this.hass), Ls(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && q(Y(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(ra, String(this._lastHeating));
      } catch {
      }
    }
  }
  /** Overridden by the battery part: loads the history of what is open, and moves the focus to the detail. */
  loadBattery() {
  }
  batteryToggled() {
  }
  updated(t) {
    super.updated(t), this.loadBattery(), t.has("_batDetail") && this.batteryToggled();
    const a = this.renderRoot.querySelector(".flow");
    if (a && !this._observer && (this._observer = new ResizeObserver(() => {
      const n = Math.round(a.getBoundingClientRect().width);
      n > 0 && n !== this._width && (this._width = n);
    }), this._observer.observe(a)), t.has("hass")) {
      const n = Object.entries(this._optimistic).filter(([i, o]) => this.hass?.states?.[i]?.state === o);
      if (n.length) {
        const i = { ...this._optimistic };
        n.forEach(([o]) => delete i[o]), this._optimistic = i;
      }
    }
    t.has("hass") && this._tankTemp && $t(ot(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const s = this._config;
    if (window.clearTimeout(this._timers.get("hold")), s && s.boilerShow === "heating" && this._lastHeating) {
      const n = this._lastHeating + s.num.boiler.hold_minutes * 6e4 - Date.now();
      n > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), n + 50));
    }
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${gt[t.main]})`;
  }
  stateLine(t, a) {
    return f`<p class="state" style="--sc:${a ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? f`${M}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }
  carVisible(t, a) {
    return !(a.carLink === "disconnected" && !q(a.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, a) {
    return t.boilerShow === "always" || a.boil === void 0 || q(a.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const a = t.entities.daily, s = (r) => Ot(this.hass, r), n = {
      pv: s(a.pv_generation),
      bchg: s(a.battery_charge),
      bdis: s(a.battery_discharge),
      gin: s(a.grid_import),
      gout: s(a.grid_export),
      car: s(a.car),
      boil: s(a.boiler)
    }, o = [n.pv, n.gin, n.bdis, n.gout, n.bchg, n.car, n.boil].every((r) => r !== void 0) ? Math.max(0, n.pv + n.gin + n.bdis - n.gout - n.bchg - n.car - n.boil) : void 0;
    return { ...n, house: o };
  }
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const a = Y(this.hass, t.entities.battery.depth_of_discharge);
    return a !== void 0 && a >= 0 && a <= 100 ? 100 - a : t.num.battery.reserve;
  }
}
Z([
  V()
], G.prototype, "_config");
Z([
  W({ attribute: !1 })
], G.prototype, "hass");
Z([
  V()
], G.prototype, "_width");
Z([
  V()
], G.prototype, "_optimistic");
Z([
  V()
], G.prototype, "_feedback");
Z([
  V()
], G.prototype, "_open");
Z([
  V()
], G.prototype, "_pop");
Z([
  V()
], G.prototype, "_all");
Z([
  V()
], G.prototype, "_now");
Z([
  V()
], G.prototype, "_carHint");
Z([
  V()
], G.prototype, "_batDetail");
Z([
  V()
], G.prototype, "_batTab");
Z([
  V()
], G.prototype, "_batSpan");
Z([
  V()
], G.prototype, "_batRange");
Z([
  V()
], G.prototype, "_batOpen");
Z([
  V()
], G.prototype, "_batScrub");
Z([
  V()
], G.prototype, "_batData");
Z([
  V()
], G.prototype, "_sunDetail");
Z([
  V()
], G.prototype, "_sunTab");
Z([
  V()
], G.prototype, "_sunRange");
Z([
  V()
], G.prototype, "_sunMode");
Z([
  V()
], G.prototype, "_sunHint");
Z([
  V()
], G.prototype, "_sunWeather");
Z([
  V()
], G.prototype, "_tankTemp");
const ln = (e) => class extends e {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? ct(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, a, s, n) {
    const i = this.shown(a);
    return f`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${a.replace(/\W/g, "-")}">${t}</span><span class="hint ${n ? "warn" : ""}">${i === void 0 ? M : s}</span></span>
        <ed-switch
          label=${t} .checked=${i === "on"} ?disabled=${i === void 0}
          @hdk-toggle=${(o) => this.setSwitch(a, o.detail.checked, t)}
        ></ed-switch>
      </div>`;
  }
  // ---------------------------------------------------------------- actions
  choose(t, a) {
    this._optimistic = { ...this._optimistic, [t]: a }, window.clearTimeout(this._timers.get(t)), this._timers.set(t, window.setTimeout(() => {
      const s = { ...this._optimistic };
      delete s[t], this._optimistic = s;
    }, (this._config?.num.ui.revert_after ?? 6) * 1e3));
  }
  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  async call(t, a, s, n, i) {
    if (!this.hass || ct(this.hass, n) === void 0)
      return this._feedback = this.t.feedback.noData(i), !1;
    try {
      return await this.hass.callService(t, a, s), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(i), !1;
    }
  }
  async setSwitch(t, a, s) {
    this._feedback = "", this.choose(t, a ? "on" : "off"), await this.call("switch", a ? "turn_on" : "turn_off", { entity_id: t }, t, s);
  }
  async setBoost(t, a) {
    const s = this._config.entities, n = t === "wallbox" ? s.wallbox.boost : s.boiler.boost;
    n && (this._feedback = "", t === "wallbox" && a && s.wallbox.block_charging && ct(this.hass, s.wallbox.block_charging) === "on" && (await this.setSwitch(s.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(n, a ? "on" : "off"), await this.call("switch", a ? "turn_on" : "turn_off", { entity_id: n }, n, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, a, s) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: a }, t, s);
  }
  async setTank(t, a) {
    if (this._feedback = "", this.choose(t, a), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: a }, t, this.t.tank.modeLabel) && a === "heat") {
      const { min: s, max: n } = this.tankRange(this._config), i = $t(ot(this.hass, t), "temperature");
      (i === void 0 || i < s || i > n) && await this.setTemperature(t, I(i ?? s, s, n));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const a = ot(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, $t(a, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, $t(a, "max_temp") ?? t.num.tank.temp_max)
    };
  }
  async setTemperature(t, a) {
    return this._tankTemp = { id: t, value: a }, window.clearTimeout(this._timers.get("tank-temp")), this._timers.set("tank-temp", window.setTimeout(() => this._tankTemp = void 0, (this._config?.num.ui.revert_after ?? 6) * 1e3)), this.call("water_heater", "set_temperature", { entity_id: t, temperature: a }, t, this.t.tank.sliderLabel);
  }
  /** Moving the temperature in Auto switches the tank to Manual first (CURRENT_SPEC.md, Zásobník). */
  async setTankTemperature(t, a, s) {
    this._feedback = "", !(s !== "heat" && (this.choose(t, "heat"), !await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: "heat" }, t, this.t.tank.modeLabel))) && await this.setTemperature(t, a);
  }
  /**
   * Manual mixing switches both valves directly and at once (mixing = C1 off + C2 on, not mixing = C1 on + C2 off),
   * so it works from any valve state, even an unclear one. Automations are not touched.
   */
  async setMixing(t) {
    const { valve_c1: a, valve_c2: s } = this._config.entities.mixing;
    if (!a || !s) return;
    this._feedback = "";
    const n = t === "on" ? "off" : "on", i = t === "on" ? "on" : "off";
    this.choose(a, n), this.choose(s, i), (await Promise.all([
      this.call("switch", `turn_${n}`, { entity_id: a }, a, this.t.water.mixing),
      this.call("switch", `turn_${i}`, { entity_id: s }, s, this.t.water.mixing)
    ])).every(Boolean) || (this._feedback = this._feedback || this.t.feedback.mixingNotSent);
  }
}, ha = ["1d", "7d", "30d"], Lt = { "1d": 1, "7d": 7, "30d": 30 }, dt = 310, et = 36e5, Wt = 24 * et, Se = (e) => typeof e == "number" && Number.isFinite(e);
async function Pa(e, t, a, s, n, i) {
  return t.length ? await e.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(a).toISOString(),
    end_time: new Date(s).toISOString(),
    statistic_ids: t,
    period: n,
    types: i
  }) ?? {} : {};
}
function yt(e) {
  const t = new Date(e);
  return t.setHours(0, 0, 0, 0), t.getTime();
}
function vt(e, t, a, s, n, i = "mean", o = 0) {
  const r = new Array(n).fill(0), l = new Array(n).fill(0), c = new Array(n).fill(void 0), d = (s - a) / n;
  for (const p of e ?? []) {
    const h = p[t];
    if (!Se(h) || !Se(p.start) || d <= 0) continue;
    const v = Math.floor((p.start - a + o) / d);
    if (v < 0 || v >= n) continue;
    l[v]++, r[v] += h;
    const y = c[v];
    i === "min" ? c[v] = y === void 0 ? h : Math.min(y, h) : i === "max" ? c[v] = y === void 0 ? h : Math.max(y, h) : i === "last" && (c[v] = h);
  }
  return c.map((p, h) => {
    if (l[h])
      return i === "mean" ? r[h] / l[h] : i === "sum" ? r[h] : p;
  });
}
function fe(e, t) {
  return (e ?? []).some((a) => Se(a[t]));
}
const P = (e) => Math.round(e * 10) / 10;
function zt(e, t, a) {
  let s = "", n = !1;
  return e.forEach((i, o) => {
    if (i === void 0) {
      n = !1;
      return;
    }
    s += `${n ? " L" : s ? " M" : "M"}${P(t(o))} ${P(a(i))}`, n = !0;
  }), s;
}
function re(e, t, a, s) {
  let n = "", i = -1;
  const o = (r) => {
    if (!(i < 0)) {
      n += `${n ? " " : ""}M${P(t(i))} ${P(s)}`;
      for (let l = i; l <= r; l++) n += ` L${P(t(l))} ${P(a(e[l]))}`;
      n += ` L${P(t(r))} ${P(s)} Z`, i = -1;
    }
  };
  return e.forEach((r, l) => {
    r === void 0 ? o(l - 1) : i < 0 && (i = l);
  }), o(e.length - 1), n;
}
function Ra(e, t, a, s) {
  let n = "", i = -1;
  const o = (l) => e[l] !== void 0 && t[l] !== void 0, r = (l) => {
    if (!(i < 0)) {
      n += `${n ? " " : ""}M${P(a(i))} ${P(s(t[i]))}`;
      for (let c = i + 1; c <= l; c++) n += ` L${P(a(c))} ${P(s(t[c]))}`;
      for (let c = l; c >= i; c--) n += ` L${P(a(c))} ${P(s(e[c]))}`;
      n += " Z", i = -1;
    }
  };
  for (let l = 0; l < e.length; l++)
    o(l) ? i < 0 && (i = l) : r(l - 1);
  return r(e.length - 1), n;
}
function le(e) {
  if (!(e > 0)) return 1;
  const a = 10 ** Math.floor(Math.log10(e)), s = e / a;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 3 ? 3 : s <= 5 ? 5 : 10) * a;
}
function dn(e, t) {
  const a = e.filter((r) => r !== void 0);
  if (!a.length) return;
  let s = Math.min(...a), n = Math.max(...a);
  const i = Math.max(n - s, t), o = (n + s) / 2;
  return s = o - i / 2 - i * 0.1, n = o + i / 2 + i * 0.1, { lo: s, hi: n };
}
function pa(e, t, a) {
  if (!(a > 0) || !(e > 0) || !(t > 0)) return;
  const s = e / 100 * t / (a / 1e3), n = Math.round(s * 60 / 5) * 5;
  return n >= 5 && n < 2880 ? n : void 0;
}
function ua(e) {
  const t = Math.floor(e / 60), a = e % 60;
  return t === 0 ? `${a} min` : a === 0 ? `${t} h` : `${t} h ${a} min`;
}
const cn = 5 * 6e4, me = 48, ba = 60, hn = 90, pn = (e) => class extends e {
  // ----------------------------------------------------------------- state and history
  /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
  batRange(t) {
    if (this._batRange) return this._batRange;
    try {
      const a = localStorage.getItem(la);
      if (a && ha.includes(a)) return a;
    } catch {
    }
    return t.batteryRange;
  }
  setBatRange(t) {
    this._batRange = t, this._batScrub = {};
    try {
      localStorage.setItem(la, t);
    } catch {
    }
  }
  /** The views of the history the open parts need (keys of `_batData`). */
  batNeeds(t) {
    const a = [];
    return this._batDetail && (this._batTab === "now" && a.push(`day:${this._batSpan}`), this._batTab === "hist" && a.push(`hist:${this.batRange(t)}`), this._batTab === "health" && this._batOpen && a.push(`health:${this.batRange(t)}`)), a;
  }
  /** What to ask Home Assistant for a view; the entities that are not configured are left out. */
  batRequests(t, a, s) {
    const n = t.entities.battery, i = (...c) => c.filter((d) => !!d), [o, r] = a.split(":");
    if (o === "day") {
      const c = s - (r === "6h" ? 6 : 24) * et;
      return [{ part: "level", ids: i(n.power, n.state_of_charge), start: c, end: s, period: "5minute", types: ["mean"] }];
    }
    const l = r;
    if (o === "hist") {
      const c = this.histWindow(l, s);
      return [
        { part: "energy", ids: i(n.total_charge, n.total_discharge), start: c.start, end: s, period: l === "1d" ? "hour" : "day", types: ["change"] },
        { part: "level", ids: i(n.state_of_charge, n.power), start: c.start, end: s, period: "hour", types: ["mean", "min", "max"] }
      ];
    }
    return [
      {
        part: "health",
        ids: i(n.min_cell_voltage, n.max_cell_voltage, n.min_cell_temperature, n.max_cell_temperature, n.temperature, n.total_discharge, n.total_charge),
        start: s - Lt[l] * Wt,
        end: s,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, a) {
    if (t === "1d")
      return { start: Math.floor(a / et) * et - 23 * et, bins: 24 };
    const s = new Date(a);
    return s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (Lt[t] - 1)), { start: s.getTime(), bins: Lt[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const a of this.batNeeds(t)) {
        const s = this._batData[a];
        s && (s.status === "loading" || Date.now() - s.at < cn) || this.fetchBattery(t, a, s);
      }
  }
  async fetchBattery(t, a, s) {
    const n = this.hass;
    if (!n) return;
    const i = Date.now();
    this._batData = { ...this._batData, [a]: { status: "loading", at: i, parts: s?.parts ?? {} } };
    try {
      const o = this.batRequests(t, a, i), r = {};
      await Promise.all(o.map(async (l) => r[l.part] = await Pa(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [a]: { status: "ready", at: i, parts: r } };
    } catch {
      this._batData = { ...this._batData, [a]: { status: "error", at: i, parts: {} } };
    }
  }
  /** Rows of one entity from a loaded view. */
  batRows(t, a, s) {
    return s ? this._batData[t]?.parts[a]?.[s] : void 0;
  }
  batteryToggled() {
    if (!this._batDetail) return;
    const t = this.renderRoot.querySelector(".bat-detail");
    t?.scrollIntoView({ block: "start" }), t?.focus({ preventScroll: !0 });
  }
  openBatteryDetail() {
    this._batDetail = !0, this._batTab = "now", this._batOpen = void 0, this._batScrub = {};
  }
  /** "Zpět" and "Hotovo" both return to the card; the popup the detail was opened from is closed too (user 2026-10-30). */
  closeBatteryDetail(t = !0) {
    this._batDetail = !1, this._pop = void 0, this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
  }
  // ----------------------------------------------------------------- shared pieces
  batState(t, a) {
    const s = a.num.flows.idle_threshold;
    return q(t.batIn, s) ? "charging" : q(t.batDis, s) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, a, s) {
    const n = this.t, i = this.batteryReserve(a), o = Array.from({ length: 10 }, (l, c) => {
      const d = (c + 1) * 10 <= i + 1e-3, p = t === void 0 ? 0 : I((t - c * 10) / 10, 0, 1) * 100, h = c === 0 ? "8px 0 0 8px" : c === 9 ? "0 8px 8px 0" : "0", v = d ? "var(--ed-warning)" : "var(--ed-battery)";
      return f`<span class="pill" style="height:${s}px;border-radius:${h};background:${d ? Pe("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${p.toFixed(1)}%;background:${v}"></i></span>`;
    }), r = t === void 0 ? n.noData : n.bat.levelLabel(R(t), R(i));
    return f`<div class="bat-gauge" role="img" aria-label=${r}>${o}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, a) {
    const s = t.soc, n = this.batState(t, a);
    if (s === void 0) return;
    const i = a.num.battery.capacity;
    if (n === "charging") {
      const o = pa(100 - s, i, t.batIn ?? 0);
      return o === void 0 ? void 0 : this.t.bat.fullIn(ua(o));
    }
    if (n === "discharging") {
      const o = pa(s - this.batteryReserve(a), i, t.batDis ?? 0);
      return o === void 0 ? void 0 : this.t.bat.lastsFor(ua(o));
    }
  }
  /** Signed power in kW, charging positive (the raw entity is the other way round). */
  batSigned(t) {
    if (!(t.batIn === void 0 && t.batDis === void 0))
      return ((t.batIn ?? 0) - (t.batDis ?? 0)) / 1e3;
  }
  // ----------------------------------------------------------------- popup
  renderBatteryPopup(t, a, s, n, i) {
    const o = this.t, r = s.num.flows.idle_threshold, l = t.key === "bat", c = n.soc, d = c !== void 0 && c <= this.batteryReserve(s), p = l ? n.batDis : n.batIn, v = q(p, r) ? l ? o.pop.discharging(X(p, i)) : o.pop.charging(X(p, i)) : n.batDis === void 0 && n.batIn === void 0 && c === void 0 ? M : l ? o.idle.bat : o.idle.batIn, y = this.today(s), u = l ? y.bdis : y.bchg, g = this.batEstimate(n, s), m = Math.min(236, a.width), b = t.side === "L" ? a.tile.w / 2 : a.width - a.tile.w / 2, k = I(b - m / 2, 0, a.width - m), L = t.side === "L" ? a.left[t.key] : a.right[t.key], $ = L - a.tile.h / 2, x = L < a.height / 2, z = x ? `top:${($ + a.tile.h + 8).toFixed(0)}px` : `bottom:${(a.height - $ + 8).toFixed(0)}px`;
    return f`<div class="pop bat-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${k.toFixed(0)}px;${z};width:${m}px">
        <i class="arrow ${x ? "up" : "down"}" aria-hidden="true" style="left:${(b - k - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${v}</span></div>
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${o.pop.level}${d ? f`<span class="note"> ${o.pop.atReserve}</span>` : D}</span>
            <span class="pop-big" style="color:${d ? "var(--ed-warning)" : "var(--ed-text)"}">${c === void 0 ? M : R(c)}</span>
          </div>
          ${this.renderGauge(c, s, 12)}
        </div>
        ${g ? f`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${g}</p>` : D}
        <div class="pop-rows"><div class="pop-row"><span>${l ? o.pop.rows.discharged : o.pop.rows.charged}</span><b>${u === void 0 ? M : `${nt(u)} kWh`}</b></div></div>
        <button type="button" class="bat-open" @click=${() => this.openBatteryDetail()}><span>${o.bat.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
  }
  // ----------------------------------------------------------------- charts
  /** Back in time as a short text: "teď", "−45 min", "−3 h 20 min", "−5 d". */
  back(t) {
    const a = Math.round(t);
    return a <= 0 ? this.t.bat.now : a < 60 ? `−${a} min` : a < 1440 ? `−${Math.floor(a / 60)} h${a % 60 ? ` ${a % 60} min` : ""}` : `−${Math.round(a / 1440)} d`;
  }
  /** One chart with its readout, finger scrubbing (a slider with no look of its own), the vertical axis and the fade on the left. */
  renderChart(t) {
    const a = this.t, s = this._batScrub[t.id] ?? t.start ?? 100, n = t.fade ?? hn, i = Math.round(s / 100 * (t.n - 1)), o = t.x(i), r = t.dot?.(i), l = t.read(i), c = (d) => `${(d / t.h * 100).toFixed(2)}%`;
    return f`<div class="bat-read">${l}</div>
        <div class="bat-chart" style="aspect-ratio:${dt} / ${t.h}">
          <svg viewBox="0 0 ${dt} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${n} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${dt} height=${t.h}><rect width=${dt} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${t.grid.map((d) => F`<line x1="0" y1=${d.y} x2=${dt} y2=${d.y} class=${d.strong ? "axis" : "grid"}></line>`)}
            <g mask=${n > 0 ? `url(#bm-${t.id})` : D}>${t.body}</g>
            <line x1=${o} y1="0" x2=${o} y2=${t.h} class="cursor"></line>
            ${r ? F`<circle cx=${o} cy=${r.y} r="6" style="fill:var(--ed-text)"></circle>` : D}
          </svg>
          ${t.labels.map((d) => f`<span class="bat-ylabel" style="top:calc(${c(d.y)} - 16px)">${d.text}</span>`)}
          <input type="range" min="0" max="100" step="1" .value=${String(s)} aria-label=${a.bat.scrubLabel} aria-valuetext=${l}
            @input=${(d) => {
      this._batScrub = { ...this._batScrub, [t.id]: Number(d.target.value) };
    }} />
        </div>
        <div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>
        ${t.legend ?? D}`;
  }
  renderChartOrEmpty(t, a, s) {
    if (s) return this.renderChart(s);
    const n = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return f`<div class="bat-nodata" style="aspect-ratio:${dt} / ${a}">${n ? M : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const a = t.entities.battery, s = `day:${this._batSpan}`, n = this._batData[s];
    if (!n) return;
    const i = this._batSpan === "6h" ? 6 : 24, o = n.at, r = o - i * et, l = vt(this.batRows(s, "level", a.state_of_charge), "mean", r, o, me), c = vt(this.batRows(s, "level", a.power), "mean", r, o, me).map(($) => $ === void 0 ? void 0 : -$ / 1e3);
    if (!l.some(($) => $ !== void 0) && !c.some(($) => $ !== void 0)) return;
    const d = me, p = ($) => P($ / (d - 1) * dt), h = ($) => P(98 - I($, 0, 100) / 100 * 90), v = le(Math.max(1, ...c.map(($) => Math.abs($ ?? 0)))), y = 160, u = ($) => P(y - I($, -v, v) / v * 44), g = 4.2, m = c.map(($, x) => {
      if ($ === void 0) return D;
      const z = Math.min(y, u($)), j = Math.max(1.5, Math.abs(u($) - y));
      return F`<rect x=${P(p(x) - g / 2)} y=${$ >= 0 ? z : y} width=${g} height=${P(j)} rx="1.5" style="fill:${$ >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), b = zt(l, p, h), k = re(l, p, h, 98), L = ($) => `${N($, $ % 1 === 0 ? 0 : 1)} kW`;
    return {
      id: "level",
      h: 210,
      n: d,
      x: p,
      grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: !0 }, { y, strong: !0 }],
      labels: [
        { y: 8, text: R(100) },
        { y: 53, text: R(50) },
        { y: 98, text: R(0) },
        { y: y - 44, text: `+${L(v)}` },
        { y, text: "0" },
        { y: y + 44, text: `−${L(v)}` }
      ],
      body: F`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${k} fill="url(#bl-area)"></path>
          <path d=${b} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${m}`,
      dot: ($) => l[$] === void 0 ? void 0 : { y: h(l[$]), color: "var(--ed-text)" },
      read: ($) => {
        const x = c[$], z = x === void 0 ? M : Math.abs(x) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${x > 0 ? this.t.bat.charging : this.t.bat.discharging} ${X(Math.abs(x) * 1e3, "kW")}`;
        return `${this.back((1 - $ / (d - 1)) * i * 60)} · ${l[$] === void 0 ? M : R(l[$])} · ${z}`;
      },
      from: `−${i} h`,
      to: this.t.bat.now,
      legend: f`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`
    };
  }
  /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
  energyChart(t, a) {
    const s = t.entities.battery, n = `hist:${a}`, i = this._batData[n];
    if (!i) return;
    const o = this.histWindow(a, i.at), r = a === "1d", l = o.bins, c = r ? et : Wt, d = o.start + l * c, p = r ? 0 : 6 * et, h = this.batRows(n, "energy", s.total_charge), v = this.batRows(n, "energy", s.total_discharge), y = vt(h, "change", o.start, d, l, "sum", p), u = vt(v, "change", o.start, d, l, "sum", p);
    if (!y.some((S) => S !== void 0) && !u.some((S) => S !== void 0)) return;
    const g = y.map((S) => S ?? 0), m = u.map((S) => S ?? 0), b = le(Math.max(0.5, ...g, ...m)), k = r ? 3 : l <= 7 ? 10 : 2, L = (dt - (l - 1) * k) / l, $ = (S) => P(S * (L + k) + L / 2), x = 100, z = (S) => I(S, 0, b) / b * 92, j = g.flatMap((S, B) => {
      const K = m[B], Q = B === l - 1 ? 1 : 0.85;
      return [
        F`<rect x=${P(B * (L + k))} y=${P(x - Math.max(S > 0 ? 1 : 0, z(S)))} width=${P(L)} height=${P(Math.max(S > 0 ? 1 : 0, z(S)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${Q}"></rect>`,
        F`<rect x=${P(B * (L + k))} y=${x} width=${P(L)} height=${P(Math.max(K > 0 ? 1 : 0, z(K)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${Q}"></rect>`
      ];
    }), E = (S) => P(x - I(S, -b, b) / b * 92), A = g.map((S, B) => S - m[B]), w = r ? 2 : 1, T = (S) => `${S >= 0 ? "+" : "−"}${N(Math.abs(S), w)}`, C = (S) => r ? it(o.start + S * et) : Et(o.start + S * Wt), _ = (S) => `${N(S, S % 1 === 0 ? 0 : 1)} kWh`;
    return {
      charged: g,
      discharged: m,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: $,
        grid: [{ y: x, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${_(b)}` }, { y: x, text: "0" }, { y: 192, text: `−${_(b)}` }],
        body: F`${j}<path d=${zt(A, $, E)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (S) => ({ y: E(A[S]), color: "var(--ed-text)" }),
        read: (S) => `${C(S)} · ${T(g[S])} / ${T(-m[S])} · ${this.t.bat.net} ${T(A[S])} kWh`,
        from: r ? "−24 h" : Et(o.start),
        to: this.t.bat.today,
        legend: f`<div class="bat-legend wrap"><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charged.toLowerCase()}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharged.toLowerCase()}</span><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.net}</span></div>`
      }
    };
  }
  /**
   * The balance of the cells: one line, the difference between the highest and the lowest cell in mV, from zero,
   * over a green zone of the excellent range; above the "attention" limit the line turns orange. The absolute
   * voltages are in the readout under the finger (CURRENT_SPEC.md, Zdraví).
   */
  balanceChart(t, a) {
    const s = t.entities.battery, n = `health:${a}`, i = this._batData[n];
    if (!i) return;
    const o = Lt[a], r = i.at, l = r - o * Wt, c = ba, d = (w) => vt(this.batRows(n, "health", w), "mean", l, r, c), p = d(s.min_cell_voltage), h = d(s.max_cell_voltage), v = p.map((w, T) => w === void 0 || h[T] === void 0 ? void 0 : Math.max(0, (h[T] - w) * 1e3)), y = v.filter((w) => w !== void 0);
    if (!y.length) return;
    const { imbalance_good: u, imbalance_warn: g } = t.num.battery, m = Math.max(u > 0 ? u * 1.5 : 10, Math.max(...y) * 1.2), b = (w) => P(130 - I(w, 0, m) / m * 120), k = (w) => P(w / (c - 1) * dt), L = (w) => this.back((1 - w / (c - 1)) * o * 24 * 60), $ = this.t.bat.health, x = "var(--ed-battery)", z = "var(--ed-warning)", j = (w) => w > g ? z : x, E = `bg-${a}`, A = I(1 - (130 - b(g)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: c,
      x: k,
      grid: [{ y: 10 }, { y: b(u) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${H(m)} mV` }, { y: b(u), text: `${H(u)} mV` }, { y: 130, text: "0" }],
      body: F`<defs>
            <linearGradient id=${E} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${A} stop-color="#FF9230"></stop><stop offset=${A} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${E}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${b(u)} width=${dt} height=${P(130 - b(u))} style="fill:${x};fill-opacity:0.12"></rect>
          <path d=${re(v, k, b, 130)} fill="url(#${E}-area)"></path>
          <path d=${zt(v, k, b)} fill="none" stroke="url(#${E})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (w) => v[w] === void 0 ? void 0 : { y: b(v[w]), color: j(v[w]) },
      read: (w) => v[w] === void 0 ? `${L(w)} · ${M}` : `${L(w)} · ${$.difference} ${H(v[w])} mV · ${$.min} ${N(p[w], 3)} V · ${$.max} ${N(h[w], 3)} V`,
      from: o === 1 ? "−24 h" : `−${o} d`,
      to: this.t.bat.today,
      legend: f`<div class="bat-legend"><span><i class="swatch" style="background:${x};opacity:0.35"></i>${$.excellentZone(`${H(u)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, a, s) {
    if (t === "gap") return this.balanceChart(a, s);
    const n = a.entities.battery, i = `health:${s}`, o = this._batData[i];
    if (!o) return;
    const r = Lt[s], l = o.at, c = l - r * Wt, d = ba, p = (x) => this.batRows(i, "health", x), h = (x) => vt(p(x), "mean", c, l, d), v = (x) => P(x / (d - 1) * dt), y = (x) => this.back((1 - x / (d - 1)) * r * 24 * 60), u = r === 1 ? "−24 h" : `−${r} d`;
    let g;
    if (t === "temp") {
      const x = h(n.min_cell_temperature), z = h(n.max_cell_temperature), j = h(n.temperature);
      g = {
        low: x,
        high: z,
        line: j,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (E) => `${H(E)} °C`,
        mid: (E) => `${H(E)} °C`,
        read: (E) => {
          const A = [x[E] === void 0 ? void 0 : `${this.t.bat.health.min} ${N(x[E], 1)}`, j[E] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${N(j[E], 1)}`, z[E] === void 0 ? void 0 : `${this.t.bat.health.max} ${N(z[E], 1)}`].filter(Boolean);
          return `${y(E)} · ${A.length ? `${A.join(" · ")} °C` : M}`;
        },
        legend: f`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const x = vt(p(n.total_discharge), "state", c, l, d, "last").map((z) => z === void 0 ? void 0 : z / a.num.battery.capacity);
      g = {
        low: x,
        high: x,
        line: x,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (z) => H(z),
        mid: (z) => H(z),
        read: (z) => `${y(z)} · ${x[z] === void 0 ? M : this.t.bat.health.cycles(N(x[z], 1))}`
      };
    }
    const m = dn([...g.low, ...g.high], g.minSpan);
    if (!m) return;
    const b = (x) => P(130 - (I(x, m.lo, m.hi) - m.lo) / (m.hi - m.lo) * 120), k = t === "life" ? "" : Ra(g.low, g.high, v, b), L = g.line ? zt(g.line, v, b) : "", $ = g.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: d,
      x: v,
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: g.text(m.hi) }, { y: 70, text: g.mid((m.hi + m.lo) / 2) }, { y: 130, text: g.text(m.lo) }],
      body: F`<path d=${k} style="fill:${$};fill-opacity:0.22"></path><path d=${L} fill="none" style="stroke:${$}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (x) => g.line?.[x] === void 0 ? void 0 : { y: b(g.line[x]), color: $ },
      read: g.read,
      from: u,
      to: this.t.bat.today,
      legend: g.legend
    };
  }
  // ----------------------------------------------------------------- the detail
  /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
  renderBatteryDetail(t, a) {
    const s = this.t, n = ["now", "hist", "health"].map((i) => ({ value: i, label: s.bat.tabs[i] }));
    return f`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${s.bat.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeBatteryDetail(!1)}>‹ ${s.bat.back}</button>
          <h2>${s.bat.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeBatteryDetail(!0)}>${s.bat.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._batTab} label=${s.bat.tabsLabel} @hdk-select=${(i) => {
      this._batTab = i.detail.value;
    }}></ed-segmented>
        ${this._batTab === "now" ? this.renderBatteryNow(t, a) : this._batTab === "hist" ? this.renderBatteryHistory(t, a) : this.renderBatteryHealth(t, a)}
      </section>`;
  }
  renderRange(t) {
    const a = this.t, s = ha.map((n) => ({ value: n, label: a.bat.ranges[n] }));
    return f`<ed-segmented .options=${s} .value=${this.batRange(t)} label=${a.bat.rangeLabel} @hdk-select=${(n) => this.setBatRange(n.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, a) {
    const s = this.t, n = t.entities.battery, i = a.soc, o = this.batState(a, t), r = this.batSigned(a), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, c = "kW", d = Y(this.hass, n.current), p = Y(this.hass, n.voltage), h = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, v = o === "idle", y = o === "charging" ? s.pop.charging(X(a.batIn ?? 0, c)) : o === "discharging" ? s.pop.discharging(X(a.batDis ?? 0, c)) : o === "idle" ? s.bat.status.idle.toLowerCase() : s.noData, u = this.batEstimate(a, t), g = this.today(t), m = [
      { label: s.bat.live.power, value: l === void 0 ? M : v ? "0 kW" : X(l, c), sub: o === void 0 ? "" : s.bat.status[o] },
      { label: s.bat.live.current, value: d === void 0 ? M : `${N(Math.abs(d), 1)} A`, sub: d === void 0 || v || o === void 0 ? "" : o === "charging" ? s.bat.live.chargeCurrent : s.bat.live.dischargeCurrent },
      { label: s.bat.live.voltage, value: p === void 0 ? M : `${N(p, 1)} V`, sub: s.bat.live.ofBattery },
      { label: s.bat.live.load, value: h === void 0 ? M : `${N(h, 2)} C`, sub: s.bat.live.loadSub }
    ], b = g.bchg, k = g.bdis, L = b !== void 0 && k !== void 0 ? b - k : void 0, $ = ["6h", "24h"].map((x) => ({ value: x, label: s.bat.spans[x] }));
    return f`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${s.bat.level}</span><span class="bat-sub">${y}</span></div><span class="bat-huge">${i === void 0 ? M : R(i)}</span></div>
          ${this.renderGauge(i, t, 32)}
          ${u ? f`<p class="bat-estimate plain">${u}</p>` : D}
        </div>
        <div class="bat-kpis">${m.map((x) => f`<div class="bat-kpi"><span class="sub">${x.label}</span><span class="val">${x.value}</span><span class="sub">${x.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.levelChart}</span>
          <ed-segmented .options=${$} .value=${this._batSpan} label=${s.bat.spanLabel} @hdk-select=${(x) => {
      this._batSpan = x.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${s.bat.charged}</span><span class="val">${b === void 0 ? M : `${nt(b)} kWh`}</span></div><div><span class="sub">${s.bat.discharged}</span><span class="val">${k === void 0 ? M : `${nt(k)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${b !== void 0 && k !== void 0 && b + k > 0 ? f`${b > 0 ? f`<i style="flex:${b.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : D}${k > 0 ? f`<i style="flex:${k.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : D}` : D}</div>
          <p class="bat-sub">${L === void 0 ? M : s.bat.netStored(`${L >= 0 ? "+" : "−"}${nt(Math.abs(L))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, a) {
    const s = this.t, n = t.entities.battery, i = this.batRange(t), o = `hist:${i}`, r = this.energyChart(t, i), l = r ? r.charged.reduce((j, E) => j + E, 0) : void 0, c = r ? r.discharged.reduce((j, E) => j + E, 0) : void 0, d = s.bat.kpi.over(i === "1d" ? "24 h" : s.bat.ranges[i].toLowerCase()), p = this._batData[o], h = Lt[i], v = this.batRows(o, "level", n.state_of_charge), y = this.batRows(o, "level", n.power), u = fe(v, "min") ? Math.min(...(v ?? []).map((j) => j.min).filter((j) => typeof j == "number")) : void 0, g = fe(y, "max") || fe(y, "min") ? Math.max(...(y ?? []).flatMap((j) => [j.max, j.min]).filter((j) => typeof j == "number").map((j) => Math.abs(j))) : void 0, m = `${N(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, b = M, k = [
      { label: s.bat.charged, value: l === void 0 ? b : `${N(l, i === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.discharged, value: c === void 0 ? b : `${N(c, i === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.kpi.efficiency, value: l && c !== void 0 ? R(N(c / l * 100, 1)) : b, sub: s.bat.kpi.efficiencySub },
      { label: s.bat.kpi.cycles, value: c === void 0 ? b : N(c / t.num.battery.capacity, 1), sub: s.bat.kpi.cyclesSub(m) },
      { label: s.bat.kpi.lowest, value: u === void 0 ? b : R(u), sub: s.bat.kpi.lowestSub },
      { label: s.bat.kpi.peak, value: g === void 0 ? b : X(g, "kW"), sub: s.bat.kpi.peakSub }
    ], $ = vt(v, "mean", this.histWindow(i, p?.at ?? Date.now()).start, p?.at ?? Date.now(), Math.max(1, h * 24)).filter((j) => j !== void 0), x = [0, 20, 40, 60, 80, 100], z = x.slice(0, 5).map((j, E) => $.length ? Math.round($.filter((A) => E === 4 ? A >= j : A >= j && A < x[E + 1]).length / $.length * 100) : void 0);
    return f`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${i === "1d" ? s.bat.energyHours : s.bat.energyDays}</span>${this.renderChartOrEmpty(o, 200, r?.chart)}</div>
        <div class="bat-kpis">${k.map((j) => f`<div class="bat-kpi"><span class="sub">${j.label}</span><span class="val">${j.value}</span><span class="sub">${j.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.bandsTitle}</span>
          ${z.map((j, E) => f`<div class="bat-band"><span class="name">${x[E]}–${x[E + 1]} %</span><span class="track"><i style="width:${j ?? 0}%;background:${E === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${j === void 0 ? M : R(j)}</span></div>`)}
          <p class="bat-sub">${s.bat.bandsNote}</p>
        </div>`;
  }
  /** Text of an error or a warning entity: "" = none, undefined = no data. */
  batProblem(t) {
    const a = ot(this.hass, t)?.state;
    if (!(a === void 0 || a === "unavailable" || a === "unknown"))
      return a === "" || a === "0" ? "" : a;
  }
  renderBatteryHealth(t, a) {
    const s = this.t, n = t.entities.battery, i = s.bat.health, o = this.batRange(t), r = (T) => Y(this.hass, T), l = r(n.state_of_health), c = r(n.min_cell_voltage), d = r(n.max_cell_voltage), p = r(n.min_cell_temperature), h = r(n.max_cell_temperature), v = this.batProblem(n.error), y = this.batProblem(n.warning), u = Ot(this.hass, n.total_charge), g = Ot(this.hass, n.total_discharge), m = t.num.battery, b = c !== void 0 && d !== void 0 ? (d - c) * 1e3 : void 0, k = b === void 0 ? void 0 : b <= m.imbalance_good ? "good" : b <= m.imbalance_warn ? "ok" : b <= m.imbalance_fault ? "warn" : "fault", L = k === "warn" || k === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", z = [l, c, d, p, h, a.soc].every((T) => T === void 0) && v === void 0 && y === void 0 ? { title: i.noData, sub: i.noDataSub, tone: "off", icon: "M5 12h14" } : v || y ? { title: v ? i.error(v) : i.warning(y), sub: i.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: i.ok, sub: i.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, j = g === void 0 ? void 0 : g / m.capacity, E = [
      { key: "soh", label: i.capacity, value: l === void 0 ? M : R(l), sub: l === void 0 ? s.noData : i.capacitySub(`${N(m.capacity * l / 100, 1)} kWh`, `${N(m.capacity, m.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: i.balance, value: b === void 0 ? M : `${H(b)} mV`, word: k ? i.words[k] : void 0, sub: i.balanceSub, details: [] },
      {
        key: "temp",
        label: i.temperature,
        value: h === void 0 ? M : `${H(h)} °C`,
        sub: h !== void 0 && p !== void 0 ? i.temperatureSub(`${H(h - p)} °C`) : s.noData,
        details: [
          [i.battery, n.temperature],
          [i.inverterAir, n.inverter_temperature_air],
          [i.inverterRadiator, n.inverter_temperature_radiator]
        ].filter(([, T]) => T).map(([T, C]) => ({ label: T, value: r(C) === void 0 ? M : `${N(r(C), 1)} °C` }))
      },
      {
        key: "life",
        label: i.life,
        value: j === void 0 ? M : i.cycles(H(j)),
        sub: u && g !== void 0 ? i.lifeSub(R(N(g / u * 100, 1))) : s.noData,
        details: [
          { label: i.totalCharged, value: u === void 0 ? M : `${H(u)} kWh` },
          { label: i.totalDischarged, value: g === void 0 ? M : `${H(g)} kWh` }
        ]
      }
    ], A = (T) => T ? un(this.hass, T) : void 0, w = [];
    if (n.mode && w.push({ label: i.mode, value: A(n.mode) ?? M }), n.charge_limit && w.push({ label: i.chargeLimit, value: r(n.charge_limit) === void 0 ? M : `${H(r(n.charge_limit))} A` }), n.discharge_limit && w.push({ label: i.dischargeLimit, value: r(n.discharge_limit) === void 0 ? M : `${H(r(n.discharge_limit))} A` }), n.error || n.warning) {
      const T = [v, y].filter(Boolean).join(", ");
      w.push({ label: i.errors, value: v === void 0 && y === void 0 ? M : T || i.none, warn: !!T });
    }
    return f`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${z.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${z.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${z.tone}">${z.title}</span><span class="bat-sub">${z.sub}</span></div>
        </div>
        ${E.map((T) => {
      const C = T.key !== "soh" && this._batOpen === T.key, _ = C ? this.healthChart(T.key, t, o) : void 0;
      return f`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${T.key === "soh"} aria-expanded=${T.key === "soh" ? D : C ? "true" : "false"}
              @click=${() => {
        T.key !== "soh" && (this._batOpen = C ? void 0 : T.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${T.label}</span><span class="bat-sub">${T.sub}</span></span>
              <span class="bat-value">${T.value}</span>${T.word ? f`<span class="bat-word" style="color:${L}">${T.word}</span>` : D}
              ${T.key === "soh" ? D : f`<svg class="chev ${C ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${C ? f`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${o}`, 140, _)}
                  ${T.details.length ? f`<div class="bat-list">${T.details.map((S) => f`<div class="bat-line"><span>${S.label}</span><b>${S.value}</b></div>`)}</div>` : D}
                </div>` : D}
          </div>`;
    })}
        ${w.length ? f`<div class="bat-card flush"><span class="bat-cap pad">${i.diagnostics}</span><div class="bat-list pad">${w.map((T) => f`<div class="bat-line"><span>${T.label}</span><b style="color:${T.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${T.value}</b></div>`)}</div></div>` : D}`;
  }
};
function un(e, t) {
  const a = ot(e, t)?.state;
  return a === void 0 || a === "" || a === "unavailable" || a === "unknown" ? void 0 : a;
}
const ga = (e) => typeof e == "number" && Number.isFinite(e);
function ve(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const s of e ?? []) {
    const n = s[t];
    if (!ga(n) || !ga(s.start)) continue;
    const i = new Date(s.start), o = yt(s.start), r = a.get(o) ?? new Array(24).fill(void 0);
    r[i.getHours()] = Math.max(0, t === "mean" ? n / 1e3 : n), a.set(o, r);
  }
  return a;
}
function de(e, t = 1) {
  if (!e) return;
  const a = e.filter((s) => s !== void 0);
  return a.length >= t ? a.reduce((s, n) => s + n, 0) : void 0;
}
function ce(e, t) {
  if (!e.length) return;
  const a = [...e].sort((o, r) => o - r), s = Math.min(100, Math.max(0, t)) / 100 * (a.length - 1), n = Math.floor(s), i = Math.ceil(s);
  return a[n] + (a[i] - a[n]) * (s - n);
}
const fa = (e) => ce(e, 50);
function Na(e, t) {
  const a = [], s = new Date(e);
  for (let n = 0; n < t; n++)
    s.setDate(s.getDate() - 1), a.push(s.getTime());
  return a;
}
function ft(e, t) {
  const a = new Date(e);
  return a.setDate(a.getDate() + t), a.setHours(0, 0, 0, 0), a.getTime();
}
function bn(e, t, a, s) {
  const n = Na(t, a).filter((r) => e.has(r)), i = Array.from({ length: 24 }, (r, l) => {
    const c = n.map((d) => e.get(d)[l]).filter((d) => d !== void 0);
    return c.length >= 3 ? ce(c, s) : void 0;
  }), o = n.map((r) => de(e.get(r), 20)).filter((r) => r !== void 0);
  return { curve: i, daily: o.length >= 3 ? ce(o, s) : void 0, days: n.length };
}
function gn(e) {
  const t = e.reduce((a, s) => a + (s ?? 0), 0);
  return t > 0 ? e.map((a) => (a ?? 0) / t) : void 0;
}
function fn(e, t) {
  const a = gn(t);
  return a ? a.map((s) => s * e) : void 0;
}
function mn(e, t, a, s) {
  const n = new Date(s), i = n.getHours(), o = 1 - (n.getMinutes() * 60 + n.getSeconds()) / 3600, r = a.map((c, d) => d < i ? 0 : d === i ? (c ?? 0) * o : c ?? 0), l = r.reduce((c, d) => c + d, 0);
  return Array.from({ length: 24 }, (c, d) => d < i ? e?.[d] : l > 0 ? r[d] / l * Math.max(0, t) : void 0);
}
function vn(e, t, a, s, n) {
  if (e === void 0) return;
  const i = new Date(s), o = i.getHours() + i.getMinutes() / 60, r = a.reduce((u, g, m) => u + (g ?? 0) * Math.min(1, Math.max(0, o - m)), 0), l = a.reduce((u, g) => u + (g ?? 0), 0);
  let c, d = "forecast";
  if (t !== void 0)
    c = Math.max(t, e);
  else if (l > 0 && r >= 0.5) {
    const u = l - r;
    c = e + u * Math.min(2, e / r), d = "pace";
  }
  if (c === void 0) return;
  const p = c > 0 ? Math.min(1, e / c) : 1, h = Math.min(0.6, n * (1 + (1 - p))), v = Math.max(0, c - e);
  let y = p < 0.35 ? "low" : p < 0.7 ? "medium" : "high";
  return n > 0.3 && y !== "low" && (y = y === "high" ? "medium" : "low"), { value: c, low: e + v * (1 - h), high: e + v * (1 + h), done: p, certainty: y, source: d };
}
function yn(e) {
  const t = e.filter((a) => a.actual > 0.5);
  if (!(t.length < 3))
    return t.reduce((a, s) => a + Math.abs(s.forecast - s.actual) / s.actual, 0) / t.length;
}
function $n(e, t, a, s) {
  let n = -1, i = -1;
  for (let o = t; o <= a; o++)
    (e[o] ?? 0) >= s && (n < 0 && (n = o), i = o);
  return n < 0 ? void 0 : [n, i + 1];
}
const ma = [9, 11, 13, 15];
function xn(e) {
  const t = ma.findIndex((a) => e < a);
  return t < 0 ? ma.length : t;
}
function wn(e) {
  if (!e || !e.some((a) => a !== void 0)) return;
  const t = [0, 0, 0, 0, 0];
  return e.forEach((a, s) => {
    a !== void 0 && (t[xn(s)] += a);
  }), t;
}
function Xt(e, t, a) {
  const s = new Date(e), n = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), 12), i = Math.round(n / 864e5 + 24405875e-1 - 2451545), o = Math.PI / 180, r = i - a / 360, l = (357.5291 + 0.98560028 * r) % 360, c = 1.9148 * Math.sin(l * o) + 0.02 * Math.sin(2 * l * o) + 3e-4 * Math.sin(3 * l * o), d = (l + c + 180 + 102.9372) % 360, p = 2451545 + r + 53e-4 * Math.sin(l * o) - 69e-4 * Math.sin(2 * d * o), h = Math.sin(d * o) * Math.sin(23.4397 * o), v = Math.cos(Math.asin(h)), y = (Math.sin(-0.833 * o) - Math.sin(t * o) * h) / (Math.cos(t * o) * v);
  if (y < -1 || y > 1) return;
  const u = Math.acos(y) / o, g = (m) => (m - 24405875e-1) * 864e5;
  return { rise: g(p - u / 360), set: g(p + u / 360) };
}
function kn(e) {
  const { capacity: t, efficiency: a } = e;
  let s = e.soc / 100 * t;
  const n = e.reserve / 100 * t, i = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let o = Math.ceil(e.now / (et / 4)) * (et / 4);
  const r = yt(e.now), l = r + e.eveningHour * et, c = ft(r, 1) + e.morningHour * et;
  let d = !1, p = s >= t - 0.01;
  for (; o <= c; o += et / 4) {
    !i.socAtEvening && o >= l && e.now < l && (i.socAtEvening = s / t * 100);
    const h = new Date(o - 1).getHours(), v = o - 1 < ft(r, 1), y = v ? (e.sun[h] ?? 0) / 4 : 0, u = (e.house[h] ?? 0) / 4;
    o <= l && (i.sunUntilEvening += y, i.houseUntilEvening += u);
    const g = s / t * 100;
    let m = 0;
    e.car && v && (d && g <= e.car.stopSoc ? d = !1 : !d && g >= e.car.startSoc && y * 4 * 1e3 >= e.car.minSun && (d = !0), m = d ? e.car.watts / 1e3 / 4 : 0);
    const b = u + m, k = Math.min(y, b), L = y - k, $ = b - k;
    if (m > 0 && (i.carTotal += m, i.carSun += Math.min(m, Math.max(0, y - u))), L > 0)
      s = Math.min(t, s + L * a);
    else if ($ > 0) {
      const x = Math.max(0, s - n) * a, z = Math.min($, x);
      s -= z / a;
    }
    !p && s >= t - 0.01 && i.fullAt === void 0 && o < l && (i.fullAt = o), s >= t - 0.01 && (p = !0), o >= c && (i.socAtMorning = s / t * 100);
  }
  return i;
}
function _n(e, t, a = 8) {
  const s = t.length;
  if (s === 0) return [];
  if (s === 1) return [[e[0], t[0]]];
  const n = Array.from({ length: s - 1 }, (r, l) => (t[l + 1] - t[l]) / (e[l + 1] - e[l])), i = [n[0], ...Array.from({ length: s - 2 }, (r, l) => n[l] * n[l + 1] <= 0 ? 0 : 2 * n[l] * n[l + 1] / (n[l] + n[l + 1])), n[s - 2]], o = [];
  for (let r = 0; r < s - 1; r++) {
    const l = e[r + 1] - e[r];
    for (let c = 0; c < a; c++) {
      const d = c / a, p = 2 * d ** 3 - 3 * d ** 2 + 1, h = d ** 3 - 2 * d ** 2 + d, v = -2 * d ** 3 + 3 * d ** 2, y = d ** 3 - d ** 2;
      o.push([e[r] + d * l, p * t[r] + h * l * i[r] + v * t[r + 1] + y * l * i[r + 1]]);
    }
  }
  return o.push([e[s - 1], t[s - 1]]), o;
}
function Sn(e, t, a, s) {
  const n = Na(t, a).map((i) => de(e.get(i), 20)).filter((i) => i !== void 0);
  return n.length >= 3 ? ce(n, s) : void 0;
}
const Mn = 5 * 6e4, Tn = 30 * 6e4, ye = 12, Qt = 26, va = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)"
], ya = ["7d", "30d"], $e = { "7d": 7, "30d": 30 }, Cn = (e) => class extends e {
  constructor() {
    super(...arguments), this._sunWeatherBusy = !1;
  }
  // ----------------------------------------------------------------- state and history
  sunRange(t) {
    if (this._sunRange) return this._sunRange;
    try {
      const a = localStorage.getItem(da);
      if (a && ya.includes(a)) return a;
    } catch {
    }
    return t.sunRange;
  }
  setSunRange(t) {
    this._sunRange = t, this._batScrub = {};
    try {
      localStorage.setItem(da, t);
    } catch {
    }
  }
  /** The views of the history the open parts need: the popup and the detail both show the day. */
  sunNeeds() {
    return this._sunDetail || this._pop === "sun" ? ["sun:hist", "sun:five"] : [];
  }
  sunRequests(t, a, s) {
    const n = t.entities, i = (...l) => l.filter((c) => !!c), o = yt(s);
    if (a === "sun:five")
      return [{ part: "power", ids: i(n.pv.power), start: ft(o, -10), end: s, period: "5minute", types: ["mean"] }];
    const r = ft(o, -(Math.max(30, t.num.forecast.learn_days) + t.num.forecast.learn_days + 1));
    return [
      { part: "energy", ids: i(n.pv.total_generation), start: r, end: s, period: "hour", types: ["change"] },
      { part: "power", ids: i(n.pv.power), start: r, end: s, period: "hour", types: ["mean", "max"] },
      { part: "house", ids: i(n.house.power), start: ft(o, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] },
      { part: "forecast", ids: i(n.forecast.energy_today), start: ft(o, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] }
    ];
  }
  loadSun() {
    const t = this._config;
    if (!(!t || !this.hass)) {
      for (const a of this.sunNeeds()) {
        const s = this._batData[a];
        s && (s.status === "loading" || Date.now() - s.at < Mn) || this.fetchSun(t, a, s);
      }
      this._sunDetail && this._sunTab === "outlook" && this.loadWeather(t);
    }
  }
  async fetchSun(t, a, s) {
    const n = this.hass;
    if (!n) return;
    const i = Date.now();
    this._batData = { ...this._batData, [a]: { status: "loading", at: i, parts: s?.parts ?? {} } };
    try {
      const o = this.sunRequests(t, a, i), r = {};
      await Promise.all(o.map(async (l) => r[l.part] = await Pa(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [a]: { status: "ready", at: i, parts: r } };
    } catch {
      this._batData = { ...this._batData, [a]: { status: "error", at: i, parts: {} } };
    }
  }
  /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
  async loadWeather(t) {
    const a = t.entities.forecast.weather, s = this.hass;
    if (!a || !s || this._sunWeatherBusy || this._sunWeather && Date.now() - this._sunWeather.at < Tn) return;
    this._sunWeatherBusy = !0;
    const n = Date.now();
    try {
      const o = (await s.callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type: "daily" },
        target: { entity_id: a },
        return_response: !0
      }))?.response?.[a]?.forecast ?? [];
      this._sunWeather = { at: n, days: o.filter((r) => r.datetime).map((r) => ({ day: yt(Date.parse(r.datetime)), condition: r.condition })) };
    } catch {
      this._sunWeather = { at: n, days: [] };
    } finally {
      this._sunWeatherBusy = !1;
    }
  }
  loadBattery() {
    super.loadBattery(), this.loadSun();
  }
  updated(t) {
    if (super.updated(t), t.has("_sunDetail") && this._sunDetail) {
      const a = this.renderRoot.querySelector(".bat-detail");
      a?.scrollIntoView({ block: "start" }), a?.focus({ preventScroll: !0 });
    }
  }
  openSunDetail() {
    this._sunDetail = !0, this._sunTab = "today", this._sunHint = void 0, this._batScrub = {};
  }
  /** "Zpět" and "Hotovo" both return to the card; the popup the detail was opened from is closed too. */
  closeSunDetail() {
    this._sunDetail = !1, this._sunHint = void 0, this._pop = void 0, this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
  }
  // ----------------------------------------------------------------- what the card knows about the day
  place() {
    const t = this.hass?.config;
    return typeof t?.latitude == "number" && typeof t.longitude == "number" ? { latitude: t.latitude, longitude: t.longitude } : void 0;
  }
  sunView(t) {
    const a = Date.now(), s = yt(a), n = t.num.forecast, i = this._batData["sun:hist"], o = this._batData["sun:five"], r = t.entities;
    let l = /* @__PURE__ */ new Map(), c = new Array(24).fill(void 0), d = [];
    if (i && Object.keys(i.parts).length) {
      if (this._sunCache?.entry !== i) {
        const C = r.pv.total_generation ? i.parts.energy?.[r.pv.total_generation] : void 0;
        let _ = ve(C, "change");
        _.size || (_ = ve(r.pv.power ? i.parts.power?.[r.pv.power] : void 0, "mean"));
        const S = ve(r.house.power ? i.parts.house?.[r.house.power] : void 0, "mean"), B = Array.from({ length: 24 }, (tt, St) => {
          const Rt = [...S.entries()].filter(([wt]) => wt < s).map(([, wt]) => wt[St]).filter((wt) => wt !== void 0);
          return Rt.length >= 3 ? fa(Rt) : void 0;
        }), Q = ((r.forecast.energy_today ? i.parts.forecast?.[r.forecast.energy_today] : void 0) ?? []).filter((tt) => typeof tt.mean == "number" && new Date(tt.start).getHours() === 8).map((tt) => ({ day: yt(tt.start), forecast: tt.mean, actual: de(_.get(yt(tt.start)), 20) })).filter((tt) => tt.actual !== void 0 && tt.day < s);
        this._sunCache = { entry: i, days: _, houseCurve: B, pairs: Q };
      }
      l = this._sunCache.days, c = this._sunCache.houseCurve, d = this._sunCache.pairs;
    }
    const p = bn(l, s, n.learn_days, n.possible_percentile), h = r.pv.power ? o?.parts.power?.[r.pv.power] : void 0;
    let v = l.get(s);
    if (h?.length) {
      const C = new Array(24).fill(void 0);
      for (const _ of h) {
        if (_.start < s || typeof _.mean != "number") continue;
        const S = new Date(_.start).getHours();
        C[S] = (C[S] ?? 0) + Math.max(0, _.mean) / 1e3 / ye;
      }
      v = C;
    }
    const u = Ot(this.hass, t.entities.daily.pv_generation) ?? (v && v.some((C) => C !== void 0) ? v.reduce((C, _) => C + (_ ?? 0), 0) : void 0), g = Ot(this.hass, r.forecast.energy_today), m = yn(d) ?? n.typical_deviation / 100, b = vn(u, g, p.curve, a, m), k = b ? Math.max(0, b.value - (u ?? 0)) : 0, L = mn(v, b ? k : 0, p.curve, a);
    if (!b) for (let C = new Date(a).getHours(); C < 24; C++) L[C] = void 0;
    const $ = this.place(), x = $ ? Xt(s, $.latitude, $.longitude) : void 0, z = t.num.flows.idle_threshold, j = (h ?? []).filter((C) => C.start >= s && typeof C.mean == "number"), E = j.filter((C) => C.mean >= z), A = E.length ? E[0].start : void 0, w = j.reduce((C, _) => !C || _.mean > C.mean ? _ : C, void 0);
    let T;
    if (x) {
      const C = [];
      for (const K of [...new Set((h ?? []).map((Q) => yt(Q.start)))].filter((Q) => Q < s)) {
        const Q = (h ?? []).filter((St) => yt(St.start) === K && St.mean >= z).pop(), tt = $ ? Xt(K, $.latitude, $.longitude) : void 0;
        Q && tt && C.push(tt.set - (Q.start + 5 * 6e4));
      }
      const _ = C.length >= 3 ? fa(C) : 0, S = E.length ? E[E.length - 1].start + 5 * 6e4 : void 0;
      T = a > x.set && (S === void 0 || a - S > 15 * 6e4) && S !== void 0 ? { at: S, over: !0 } : { at: x.set - _, over: !1 };
    }
    return {
      now: a,
      today: s,
      ready: !!i && i.status !== "loading" || !!i?.parts && Object.keys(i.parts).length > 0,
      days: l,
      learned: p,
      done: u,
      forecastToday: g,
      deviation: m,
      pairs: d,
      estimate: b,
      hours: L,
      rise: x?.rise,
      set: x?.set,
      started: A,
      ends: T,
      fiveRows: h,
      peak: w ? { kw: w.mean / 1e3, at: w.start } : void 0,
      houseCurve: c
    };
  }
  /** The house by hour (the median of the recent days) kept in the cache of the view. */
  sunHouseCurve() {
    return this._sunCache?.houseCurve ?? [];
  }
  // ----------------------------------------------------------------- shared pieces
  /** The small ⓘ and the bubble it opens over the card (a second tap closes it); the hint never takes room in a panel. */
  hint(t, a) {
    const s = this._sunHint === t;
    return f`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${s ? "true" : "false"} @click=${() => {
      this._sunHint = s ? void 0 : t;
    }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${s ? f`<div class="sun-note" role="note" @click=${() => {
      this._sunHint = void 0;
    }}>${a}</div>` : D}`;
  }
  /** A ring with the number centred in it and the unit under the number. */
  ring(t, a, s, n, i, o) {
    const r = (a - s) / 2, l = 2 * Math.PI * r, c = I(t, 0, 1);
    return f`<div class="sun-ring" style="width:${a}px;height:${a}px" role="img" aria-label=${o}>
        <svg viewBox="0 0 ${a} ${a}" aria-hidden="true">
          <circle cx=${a / 2} cy=${a / 2} r=${r} fill="none" class="track" stroke-width=${s}></circle>
          <circle cx=${a / 2} cy=${a / 2} r=${r} fill="none" class="fill" stroke-width=${s} stroke-linecap="round" stroke-dasharray="${(l * c).toFixed(1)} ${l.toFixed(1)}" transform="rotate(-90 ${a / 2} ${a / 2})"></circle>
        </svg>
        <span class="num" style="font-size:${Math.round(a * (a <= 44 ? 0.3 : 0.27))}px">${n}</span><span class="unit">${i}</span>
      </div>`;
  }
  /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
  renderSoFar(t) {
    const a = this.t.sun, s = t.estimate, n = s && t.done !== void 0 && s.value > 0 ? Math.min(100, Math.round(t.done / s.value * 100)) : void 0;
    return f`<div class="sun-sofar">
        <div class="text"><span class="sub">${a.soFar}</span><span class="val">${t.done === void 0 ? M : `${nt(t.done)} kWh`}</span><span class="sub">${s ? a.ofEstimate(nt(s.value)) : M}</span></div>
        ${n === void 0 ? D : this.ring(n / 100, 40, 6, String(n), "%", a.ringLabel(R(n)))}
      </div>`;
  }
  /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
  renderSunFlow(t, a, s) {
    const n = this.t, i = a.num.flows.idle_threshold, o = Bt.map((l) => ({ sink: l, watts: t.flows.filter((c) => c.from === "sun" && c.to === l).reduce((c, d) => c + d.watts, 0) })).filter((l) => q(l.watts, i));
    if (!o.length) return f`<p class="bat-sub">${t.sun === void 0 ? M : n.sun.flowNone}</p>`;
    const r = "kW";
    return f`<div class="mix-bar sun-bar ${s ? "large" : ""}" role="img" aria-label=${o.map((l) => `${n.tile[l.sink]} ${X(l.watts, r)}`).join(", ")}>${o.map((l) => f`<div style="flex:${l.watts.toFixed(0)} 1 0;background:var(${jt[l.sink]})"></div>`)}</div>
        ${s ? f`<div class="sun-legend" role="group" aria-label=${n.sun.flowTitle}>${o.map((l) => f`<span><span class="name"><i style="background:var(${jt[l.sink]})"></i>${n.tile[l.sink]}</span><b>${X(l.watts, r)}</b></span>`)}</div>` : D}`;
  }
  /** The condition of the weather entity as a group of the card's texts ("partly", "rain" …). */
  weatherGroup(t) {
    if (t) {
      if (t === "sunny" || t === "clear-night") return "clear";
      if (t === "partlycloudy") return "partly";
      if (t === "cloudy") return "cloudy";
      if (t === "rainy" || t === "pouring") return "rain";
      if (t === "snowy" || t === "snowy-rainy" || t === "hail") return "snow";
      if (t === "fog") return "fog";
      if (t === "lightning" || t === "lightning-rainy") return "storm";
      if (t === "windy" || t === "windy-variant") return "wind";
    }
  }
  weatherNow(t) {
    const a = t.entities.forecast.weather, s = this.weatherGroup(a ? ot(this.hass, a)?.state : void 0);
    return s ? this.t.sun.weather[s] : void 0;
  }
  // ----------------------------------------------------------------- popup
  renderSunPopup(t, a, s, n, i) {
    const o = this.t, r = this.sunView(s), l = q(n.sun, s.num.flows.idle_threshold), c = this.weatherNow(s), d = l ? c ? o.sun.producingWith(c) : o.sun.producing : n.sun === void 0 ? M : o.idle.sun, p = Math.min(236, a.width), h = t.side === "L" ? a.tile.w / 2 : a.width - a.tile.w / 2, v = I(h - p / 2, 0, a.width - p), y = t.side === "L" ? a.left[t.key] : a.right[t.key], u = y - a.tile.h / 2, g = y < a.height / 2, m = g ? `top:${(u + a.tile.h + 8).toFixed(0)}px` : `bottom:${(a.height - u + 8).toFixed(0)}px`;
    return f`<div class="pop bat-pop sun-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${v.toFixed(0)}px;${m};width:${p}px">
        <i class="arrow ${g ? "up" : "down"}" aria-hidden="true" style="left:${(h - v - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${d}</span></div>
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${o.sun.powerNow}</span><span class="pop-big">${n.sun === void 0 ? M : X(n.sun, i === "W" && n.sun >= s.num.flows.kw_from ? "kW" : i)}</span></div>
          ${l ? this.renderSunFlow(n, s, !1) : D}
        </div>
        ${this.renderSoFar(r)}
        <div class="pop-rows">
          <div class="pop-row"><span>${o.sun.started}</span><b>${r.started === void 0 ? M : it(r.started)}</b></div>
          <div class="pop-row"><span>${r.ends?.over ? o.sun.ended : o.sun.ends}</span><b>${r.ends === void 0 ? M : it(r.ends.at)}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openSunDetail()}><span>${o.sun.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
  }
  // ----------------------------------------------------------------- the detail
  renderSunDetail(t, a) {
    const s = this.t, n = ["today", "hist", "outlook"].map((o) => ({ value: o, label: s.sun.tabs[o] })), i = this.sunView(t);
    return f`<section class="bat-detail sun-detail" role="dialog" aria-modal="true" aria-label=${s.sun.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeSunDetail()}>‹ ${s.sun.back}</button>
          <h2>${s.sun.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeSunDetail()}>${s.sun.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._sunTab} label=${s.sun.tabsLabel} @hdk-select=${(o) => {
      this._sunTab = o.detail.value, this._sunHint = void 0, this._batScrub = {};
    }}></ed-segmented>
        ${this._sunTab === "today" ? this.renderSunToday(t, a, i) : this._sunTab === "hist" ? this.renderSunHistory(t, i) : this.renderSunOutlook(t, i)}
      </section>`;
  }
  // ----------------------------------------------------------------- Dnes
  /** Clock hour of a time as a fraction (7:30 = 7.5). */
  hourOf(t) {
    const a = new Date(t);
    return a.getHours() + a.getMinutes() / 60;
  }
  /** The chart of the power today: the production, the learned "possible" curve and the band of the forecast. */
  todayChart(t, a) {
    if (!t.entities.pv.power || !a.fiveRows?.some((B) => B.start >= a.today)) return;
    const n = this.t.sun, i = a.rise !== void 0 ? I(Math.floor(this.hourOf(a.rise) - 0.5), 0, 22) : 6, o = a.set !== void 0 ? I(Math.ceil(this.hourOf(a.set) + 0.5), i + 2, 24) : 18, r = (o - i) * ye, l = a.today + i * et, c = a.today + o * et, d = (B) => P(Qt + B / (r - 1) * (dt - Qt)), p = vt(a.fiveRows, "mean", l, c, r).map((B) => B === void 0 ? void 0 : B / 1e3), h = (B) => i + (B + 0.5) / ye, v = Math.floor((a.now - l) / (c - l) * r), y = (B, K) => {
      const Q = K - 0.5, tt = Math.floor(Q), St = B[tt], Rt = B[tt + 1];
      if (St === void 0 && Rt === void 0) return;
      const wt = Q - tt;
      return (St ?? 0) * (1 - wt) + (Rt ?? 0) * wt;
    }, u = a.learned.curve.some((B) => B !== void 0), g = Array.from({ length: r }, (B, K) => u ? y(a.learned.curve, h(K)) : void 0), m = a.estimate, b = m ? Math.max(0, m.value - (a.done ?? 0)) : 0, k = m && b > 0 ? (m.low - (a.done ?? 0)) / b : 1, L = m && b > 0 ? (m.high - (a.done ?? 0)) / b : 1, $ = (B) => B >= v, x = Array.from({ length: r }, (B, K) => m && $(K) ? y(a.hours.map((Q, tt) => tt >= new Date(a.now).getHours() ? Q : void 0), h(K)) : void 0), z = x.map((B) => B === void 0 ? void 0 : B * k), j = x.map((B) => B === void 0 ? void 0 : B * L), E = Math.max(1, ...p.map((B) => B ?? 0), ...g.map((B) => B ?? 0), ...j.map((B) => B ?? 0)), A = Math.ceil(E) > 7 ? 2 : 1, w = Math.ceil(E / A) * A, T = 150, C = (B) => P(T - I(B, 0, w) / w * (T - 12)), _ = (B) => X(B * 1e3, "kW"), S = Array.from({ length: w / A }, (B, K) => (K + 1) * A);
    return {
      id: "sun-today",
      h: 170,
      n: r,
      x: d,
      fade: 0,
      start: I(v / (r - 1) * 100, 0, 100),
      grid: [{ y: T, strong: !0 }, ...S.map((B) => ({ y: C(B) }))],
      labels: [...S.map((B) => ({ y: C(B), text: H(B) })), { y: T, text: "0" }],
      body: F`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${Ra(z, j, d, C)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${zt(g, d, C)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${re(p, d, C, T)} fill="url(#sun-area)"></path>
          <path d=${zt(p, d, C)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (B) => p[B] === void 0 ? void 0 : { y: C(p[B]), color: "var(--ed-sun)" },
      read: (B) => {
        const K = it(l + (B + 0.5) * ((c - l) / r)), Q = [p[B] !== void 0 ? _(p[B]) : x[B] !== void 0 ? `${n.chartLegend.forecast.toLowerCase()} ≈ ${_(x[B])}` : M];
        return g[B] !== void 0 && Q.push(`${n.possibleShort} ${_(g[B])}`), `${K} · ${Q.join(" · ")}`;
      },
      from: it(l),
      to: it(c),
      legend: f`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-sun)"></i>${n.chartLegend.production}</span><span><i class="dots" aria-hidden="true"></i>${n.chartLegend.possible}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.3"></i>${n.chartLegend.forecast}</span></div>`
    };
  }
  /** The kWh the sun gave today to the house, the car, the boiler, the battery and the grid (an estimate from the totals of the day). */
  whereToday(t) {
    const a = this.today(t);
    if (a.pv === void 0 || a.bchg === void 0 || a.gout === void 0 || a.gin === void 0 || a.bdis === void 0) return;
    const s = Math.max(0, a.pv + a.gin + a.bdis - a.gout - a.bchg), n = Math.max(0, a.pv - a.bchg - a.gout), i = a.car ?? 0, o = a.boil ?? 0, r = Math.max(0, s - i - o), l = s > 0 ? Math.min(1, n / s) : 0;
    return [
      { key: "house", kwh: r * l },
      { key: "car", kwh: i * l },
      { key: "boil", kwh: o * l },
      { key: "batIn", kwh: a.bchg },
      { key: "gridOut", kwh: a.gout }
    ].filter((c) => c.kwh > 5e-3);
  }
  renderSunToday(t, a, s) {
    const n = this.t, i = "kW", o = this.todayChart(t, s), r = this.whereToday(t), l = r?.reduce((d, p) => d + p.kwh, 0) ?? 0, c = a.sun === void 0 ? M : X(a.sun, i);
    return f`<div class="bat-card">
          <span class="bat-cap">${n.sun.powerNow}</span>
          <span class="bat-huge">${c}</span>
          ${q(a.sun, t.num.flows.idle_threshold) ? this.renderSunFlow(a, t, !0) : D}
        </div>
        <div class="bat-card rel">
          <div class="bat-card-bar"><span class="sun-title">${n.sun.chartTitle}</span><span class="sun-unit">${n.sun.chartUnit}${this.hint("chart", n.sun.hints.chart)}</span></div>
          ${this.renderChartOrEmpty("sun:five", 170, o)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi sun-kpi-ring">${this.renderSoFar(s)}</div>
          <div class="bat-kpi"><span class="sub">${n.sun.peakToday}</span><span class="val">${s.peak ? X(s.peak.kw * 1e3, i) : M}</span><span class="sub">${s.peak ? n.sun.at(it(s.peak.at)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${n.sun.startedLong}</span><span class="val">${s.started === void 0 ? M : it(s.started)}</span><span class="sub">${s.rise === void 0 ? "" : n.sun.sunrise(it(s.rise))}</span></div>
          <div class="bat-kpi"><span class="sub">${s.ends?.over ? n.sun.ended : n.sun.ends}</span><span class="val">${s.ends === void 0 ? M : it(s.ends.at)}</span><span class="sub">${s.set === void 0 ? "" : n.sun.sunset(it(s.set))}</span></div>
        </div>
        ${r ? f`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.sun.whereTitle}</span>${this.hint("where", n.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${r.map((d) => f`<div style="flex:${d.kwh.toFixed(3)} 1 0;background:var(${jt[d.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${n.sun.whereTitle}>${r.map((d) => f`<span><span class="name"><i style="background:var(${jt[d.key]})"></i>${n.tile[d.key]}</span><b>${nt(d.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${l > 0 ? n.sun.whereUnit : M}</span>
            </div>` : D}`;
  }
  // ----------------------------------------------------------------- Historie
  renderSunRange(t) {
    const a = this.t.sun.hist, s = ya.map((n) => ({ value: n, label: a.ranges[n] }));
    return f`<ed-segmented .options=${s} .value=${this.sunRange(t)} label=${a.rangeLabel} @hdk-select=${(n) => this.setSunRange(n.detail.value)}></ed-segmented>`;
  }
  /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
  rangeDays(t, a, s = 0) {
    const n = $e[a];
    return Array.from({ length: n }, (i, o) => ft(t.today, -(n - o) - s));
  }
  /** The production by day of the range: the totals, the blocks of the day and what was possible. */
  histData(t, a, s) {
    const n = t.num.forecast;
    return this.rangeDays(a, s).map((o) => {
      const r = a.days.get(o), l = de(r, 20);
      return { day: o, hours: r, total: l, blocks: l === void 0 ? void 0 : wn(r), possible: Sn(a.days, o, n.learn_days, n.possible_percentile) };
    });
  }
  histChart(t, a, s) {
    const n = this.t.sun.hist, i = this.histData(t, a, s);
    if (!i.some((b) => b.total !== void 0)) return;
    const o = i.length, r = (dt - Qt) / o, l = (b) => P(Qt + b * r + r / 2), c = Math.max(1, ...i.map((b) => Math.max(b.total ?? 0, b.possible ?? 0))), d = le(c), p = 150, h = (b) => P(p - I(b, 0, d) / d * (p - 14)), v = this._sunMode === "parts", y = (b) => s === "7d" ? new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(i[b].day) : Et(i[b].day).replace(/^\S+\s/, "");
    let u;
    if (v) {
      const b = i.map((A, w) => l(w)), k = i.map((A) => A.blocks), L = k.map((A, w) => A ? w : -1).filter((A) => A >= 0), $ = L.map((A) => k[A].reduce((w, T) => [...w, w[w.length - 1] + T], [0])), x = Array.from({ length: 6 }, (A, w) => _n(L.map((T) => b[T]), $.map((T) => h(T[w])))), z = (A) => A.map(([w, T]) => `${P(w)},${P(T)}`).join(" "), j = i.map((A) => A.possible), E = j.some((A) => A !== void 0) ? re(j, l, h, p) : "";
      u = F`<path d=${E} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((A) => F`<polygon points=${`${z(x[A + 1])} ${z([...x[A]].reverse())}`} style="fill:${va[A]}"></polygon>`)}
          ${[1, 2, 3, 4].map((A) => F`<polyline points=${z(x[A])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
    } else {
      const b = Math.min(s === "7d" ? 26 : 7, r - 3);
      u = F`${i.map((k, L) => F`
          ${k.possible === void 0 ? D : F`<rect x=${P(l(L) - b / 2)} y=${h(k.possible)} width=${b} height=${P(p - h(k.possible))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${k.total === void 0 ? D : F`<rect x=${P(l(L) - b / 2)} y=${h(k.total)} width=${b} height=${P(Math.max(1, p - h(k.total)))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${k.total !== void 0 && s === "7d" ? F`<text x=${l(L)} y=${h(k.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${N(k.total, 1)}</text>` : D}`)}`;
    }
    const g = s === "7d" ? i.map((b, k) => k) : [0, 7, 14, 21, o - 1], m = v ? f`<div class="sun-blocks" role="group">${n.blocks.map((b, k) => f`<span><i style="background:${va[k]}"></i><span>${b}</span></span>`)}</div>` : f`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${n.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${n.possible}</span></div>`;
    return {
      id: `sun-hist-${v ? "parts" : "total"}`,
      h: 170,
      n: o,
      x: l,
      fade: 0,
      grid: [{ y: p, strong: !0 }, { y: h(d / 2) }, { y: h(d) }],
      labels: [{ y: h(d), text: H(d) }, { y: h(d / 2), text: H(d / 2, d / 2 % 1 ? 1 : 0) }, { y: p, text: "0" }],
      body: F`${u}${g.map((b) => F`<text x=${l(b)} y=${p + 16} text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${y(b)}</text>`)}`,
      dot: (b) => i[b].total === void 0 ? void 0 : { y: h(i[b].total), color: "var(--ed-sun)" },
      read: (b) => {
        const k = i[b], L = Et(k.day);
        if (k.total === void 0) return `${L} · ${M}`;
        if (v && k.blocks) {
          const $ = k.blocks.indexOf(Math.max(...k.blocks));
          return `${L} · ${N(k.total, 1)} kWh · ${n.mostIn(n.blocks[$])}`;
        }
        return `${L} · ${N(k.total, 1)} kWh${k.possible ? ` · ${n.ofPossible(R(Math.round(k.total / k.possible * 100)))}` : ""}`;
      },
      from: "",
      to: "",
      legend: m
    };
  }
  /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
  eastWest(t) {
    const a = this.t.sun.hist, s = 46, n = (r, l, c) => {
      const d = (p) => `${P(70 + s * Math.cos(p * Math.PI / 180))},${P(64 - s * Math.sin(p * Math.PI / 180))}`;
      return F`<path d="M${d(r)} A${s},${s} 0 0 1 ${d(l)}" fill="none" style="stroke:${c}" stroke-width="10"></path>`;
    }, i = 180 - 180 * t, o = Math.round(t * 100);
    return f`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${a.eastWestLabel(R(o), R(100 - o))}>${n(180, i + 1.5, "var(--ed-warning)")}${n(i - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${R(o)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${R(100 - o)}</span></div>`;
  }
  renderSunHistory(t, a) {
    const s = this.t.sun, n = t.num.forecast, i = this.sunRange(t), o = this.histData(t, a, i), r = o.filter((_) => _.total !== void 0), l = !a.ready, c = r.reduce((_, S) => _ + S.total, 0);
    o.reduce((_, S) => _ + (S.possible ?? 0), 0);
    const d = r.filter((_) => _.possible !== void 0), p = d.length ? Math.round(d.reduce((_, S) => _ + S.total, 0) / d.reduce((_, S) => _ + S.possible, 0) * 100) : void 0, h = this.histChart(t, a, i), v = ["total", "parts"].map((_) => ({ value: _, label: s.hist.modes[_] })), y = r.reduce((_, S) => !_ || S.total > _.total ? S : _, void 0), u = r.reduce((_, S) => !_ || S.total < _.total ? S : _, void 0), g = (_) => s.hist.dayOfPossible(Et(_.day), _.possible ? R(Math.round(_.total / _.possible * 100)) : M), m = t.entities, b = m.pv.power && this._batData["sun:hist"]?.parts.power?.[m.pv.power] || [], k = o[0]?.day ?? a.today, L = b.filter((_) => _.start >= k && _.start < a.today && typeof _.max == "number").reduce((_, S) => !_ || S.max > _.max ? S : _, void 0), $ = (_) => {
      const S = _.map((B) => B.hours ? B.hours.filter((K) => (K ?? 0) >= 0.05).length : void 0).filter((B) => B !== void 0);
      return S.length ? S.reduce((B, K) => B + K, 0) / S.length : void 0;
    }, x = $(o), z = $(this.rangeDays(a, i, $e[i]).map((_) => ({ hours: a.days.get(_) }))), j = a.rise !== void 0 && a.set !== void 0 ? this.hourOf((a.rise + a.set) / 2) : 12;
    let E = 0, A = 0;
    for (const _ of r) _.hours?.forEach((S, B) => {
      S && (B + 0.5 < j ? E += S : A += S);
    });
    const w = E + A > 0 ? E / (E + A) : void 0, T = r.filter((_) => _.total > n.good_day).length, C = a.pairs.slice(-7);
    return f`${this.renderSunRange(t)}
        <div class="bat-card">
          <span class="bat-cap">${s.hist.last($e[i])}</span>
          <span class="bat-huge sun-huge">${r.length ? `${N(c, 1)} kWh` : M}</span>
          <span class="bat-sub">${r.length ? f`${p === void 0 ? D : f`<b class="sun-yellow">${s.hist.ofPossible(R(p))}</b> · `}${s.hist.average(`${N(c / r.length, 1)} kWh`)}` : M}</span>
        </div>
        <div class="bat-card">
          <div class="bat-card-bar sun-mode"><span class="sun-title">${s.hist.chartTitle}</span>
            <ed-segmented compact .options=${v} .value=${this._sunMode} label=${s.hist.modeLabel} @hdk-select=${(_) => {
      this._sunMode = _.detail.value;
    }}></ed-segmented>
          </div>
          ${this.renderChartOrEmpty("sun:hist", 170, h)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${s.hist.best}</span><span class="val">${y ? `${N(y.total, 1)} kWh` : M}</span><span class="sub">${y ? g(y) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.worst}</span><span class="val">${u ? `${N(u.total, 1)} kWh` : M}</span><span class="sub">${u ? g(u) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.peak}</span><span class="val">${L ? X(L.max, "kW") : M}</span><span class="sub">${L ? `${Et(L.start)} ${s.at(it(L.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.length}</span><span class="val">${x === void 0 ? M : s.hist.lengthValue(N(x, 1))}</span><span class="sub">${z === void 0 ? "" : (i === "7d" ? s.hist.before7 : s.hist.before30)(N(z, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${s.hist.eastWest}</span>${w === void 0 ? f`<span class="bat-sub">${M}</span>` : this.eastWest(w)}</div>
          <div class="bat-card"><span class="bat-cap">${s.hist.goodDays}</span><span class="val big">${r.length ? s.hist.goodOf(T, r.length) : M}</span><span class="bat-sub">${s.hist.over(H(n.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${r.map((_) => f`<i class=${_.total > n.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${C.length >= 3 ? this.renderAccuracy(C, a) : D}`;
  }
  renderAccuracy(t, a) {
    const s = this.t.sun, n = le(Math.max(...t.flatMap((c) => [c.forecast, c.actual]))), i = 310, o = 60, r = 14, l = i / t.length;
    return f`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${s.hist.accuracyTitle}</span>${this.hint("acc", s.hints.acc)}</div>
        <div class="sun-acc"><b>±${R(Math.round(a.deviation * 100))}</b><span class="bat-sub">${s.hist.accuracyAverage(a.pairs.length)}</span></div>
        <svg viewBox="0 0 ${i} 80" class="sun-pairs" role="img" aria-label=${s.hist.accuracyLabel}>
          <line x1="0" y1=${o} x2=${i} y2=${o} class="axis"></line>
          ${t.map((c, d) => {
      const p = d * l + (l - 2 * r - 2) / 2, h = (v) => P(v / n * 50);
      return F`<rect x=${P(p)} y=${P(o - h(c.forecast))} width=${r} height=${h(c.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${P(p + r + 2)} y=${P(o - h(c.actual))} width=${r} height=${h(c.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${P(p + r + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(c.day)}</text>`;
    })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${s.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${s.hist.actual}</span></div>
      </div>`;
  }
  // ----------------------------------------------------------------- Výhled
  renderSunOutlook(t, a) {
    const s = this.t.sun, n = s.outlook, i = t.num.forecast, o = t.entities, r = a.estimate, l = i.good_power / 1e3, c = `${N(i.good_power / 1e3, i.good_power % 1e3 ? 1 : 0)} kW`, d = r && a.done !== void 0 && r.value > 0 ? Math.min(100, Math.round(a.done / r.value * 100)) : void 0, p = r ? { low: 1, medium: 2, high: 3 }[r.certainty] : 0, h = [o.forecast.energy_today, o.forecast.energy_tomorrow, o.forecast.energy_day_2, o.forecast.energy_day_3, o.forecast.energy_day_4], v = this._sunWeather?.days ?? [], y = h.map((w, T) => {
      const C = ft(a.today, T), _ = T === 0 ? r?.value : Ot(this.hass, w), S = T === 0 ? a.hours : _ === void 0 ? void 0 : fn(_, a.learned.curve), B = T === 0 ? this.weatherGroup(o.forecast.weather ? ot(this.hass, o.forecast.weather)?.state : void 0) : this.weatherGroup(v.find((K) => K.day === C)?.condition);
      return { i: T, day: C, kwh: _, hours: S, condition: B };
    }).filter((w) => w.kwh !== void 0 || w.i === 0), u = y.filter((w) => w.kwh !== void 0), g = (w) => w ? $n(w, i.strip_from, i.strip_to, l) : void 0, m = u.filter((w) => w.i > 0 || u.length === 1).reduce((w, T) => !w || T.kwh > w.kwh ? T : w, void 0), b = m ? g(m.hours) : void 0, k = this.place(), L = k ? Xt(a.today, k.latitude, k.longitude) : void 0, $ = k ? Xt(ft(a.today, 1), k.latitude, k.longitude) : void 0, x = L ? Math.round((L.set - L.rise) / 6e4) : void 0, z = L && $ ? Math.round(($.set - $.rise - (L.set - L.rise)) / 6e4) : void 0, j = this.evening(t, a), E = Array.from({ length: i.strip_to - i.strip_from + 1 }, (w, T) => i.strip_from + T), A = new Date(a.now).getHours();
    return f`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${n.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${r ? `${nt(r.value)} kWh` : M}</span>
              <span class="bat-sub">${r ? n.between(nt(r.low), nt(r.high)) : ""}</span>
              ${r ? f`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((w) => f`<i class=${w <= p ? "on" : ""}></i>`)}</span><b>${n.certainty[r.certainty]}</b>${this.hint("conf", s.hints.conf)}</span>` : D}
            </div>
            ${d === void 0 ? D : this.ring(d / 100, 76, 8, String(d), "%", s.ringLabel(R(d)))}
          </div>
        </div>
        ${y.length > 1 ? f`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.fiveTitle}</span>${this.hint("five", s.hints.five(c))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${E.map((w) => f`<span>${w % 3 === 0 ? w : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${y.map((w) => {
      const T = g(w.hours);
      return f`<div class="sun-five-row">
                    <span class="day"><b>${w.i === 0 ? n.today : ea(w.day)}</b><span>${w.condition ? s.weather[w.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${E.map((C) => {
        const _ = w.hours?.[C], S = _ === void 0 ? "none" : _ >= l ? "strong" : _ >= l * 0.35 ? "mid" : _ >= l * 0.075 ? "faint" : "none";
        return f`<i class="${S} ${w.i === 0 && C === A ? "now" : ""}"></i>`;
      })}</span>
                    <span class="end"><b>${w.kwh === void 0 ? M : `${w.i ? "≈ " : ""}${nt(w.kwh)}`}</b><span class=${T ? "" : "off"}>${w.kwh === void 0 ? "" : T ? n.window(T[0], T[1]) : n.below(c)}</span></span>
                  </div>`;
    })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${n.strong(c)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${n.weak}</span></div>
            </div>` : D}
        ${j ? f`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.eveningTitle}</span>${this.hint("eve", s.hints.eve)}</div>
              <div class="bat-list">${j.map((w) => f`<div class="bat-line sun-line"><span><i style="background:var(${w.color})"></i>${w.label}</span><b>${w.value}</b></div>`)}
              </div>
            </div>` : D}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${n.dayLength}</span><span class="val">${x === void 0 ? M : n.hoursMinutes(Math.floor(x / 60), x % 60)}</span><span class="sub">${z === void 0 ? "" : n.dayChange(z)}</span></div>
          <div class="bat-kpi"><span class="sub">${n.bestDay}</span><span class="val">${m ? m.i === 0 ? n.today : ea(m.day) : M}</span><span class="sub">${m ? n.bestSub(nt(m.kwh), b ? n.window(b[0], b[1]) : "") : ""}</span></div>
        </div>`;
  }
  /** The rows of "Dnes do večera": the battery full, its level in the evening, the car from the sun, the grid at night; none without the data it needs. */
  evening(t, a) {
    const s = t.num.forecast, n = t.entities, i = Y(this.hass, n.battery.state_of_charge), o = this.sunHouseCurve();
    if (i === void 0 || !o.some((p) => p !== void 0) || !a.estimate) return;
    const r = kn({
      now: a.now,
      soc: i,
      capacity: t.num.battery.capacity,
      reserve: this.batteryReserve(t),
      sun: a.hours,
      house: o,
      efficiency: s.efficiency / 100,
      eveningHour: s.evening_hour,
      morningHour: s.morning_hour,
      car: n.wallbox.power && La(ct(this.hass, n.wallbox.status)) !== "disconnected" ? { startSoc: s.car_start_soc, stopSoc: s.car_stop_soc, minSun: s.car_min_sun, watts: t.num.wallbox.power_min } : void 0
    }), l = this.t.sun.outlook, c = [], d = it(a.today + s.evening_hour * et);
    return r.socAtEvening !== void 0 && (c.push({ color: "--ed-battery", label: l.batteryNow, value: R(Math.round(i)) }), c.push({ color: "--ed-sun", label: l.sunUntil(d), value: `≈ ${nt(r.sunUntilEvening)} kWh` }), c.push({ color: "--ed-house", label: l.houseUntil(d), value: `≈ ${nt(r.houseUntilEvening)} kWh` })), r.fullAt !== void 0 && c.push({ color: "--ed-battery", label: l.full, value: `≈ ${it(r.fullAt)}` }), r.socAtEvening !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(it(a.today + s.evening_hour * et)), value: `≈ ${R(Math.round(r.socAtEvening))}` }), r.carTotal > 0 && c.push({ color: "--ed-car", label: l.carSun, value: `≈ ${nt(r.carSun)} kWh · ${H(r.carSun / s.car_kwh_per_km)} km` }), r.socAtMorning !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(it(ft(a.today, 1) + s.morning_hour * et)), value: `≈ ${R(Math.round(r.socAtMorning))}` }), c;
  }
};
function Dn(e, t = Bt) {
  const a = Math.round(Math.max(116, Math.min(132, e * 0.377))), s = 56, n = 6, i = Math.max(1, t.length), o = i * s + (i - 1) * n, r = Object.fromEntries(t.map((c, d) => [c, s / 2 + d * (s + n)])), l = Object.fromEntries(
    ht.map((c, d) => [c, i < 4 ? s / 2 + d * (s + n) : (d + 0.5) * o / ht.length])
  );
  return { width: e, tile: { w: a, h: s }, gap: n, height: o, left: l, right: r, xa: a - 8, xb: e - a + 8 };
}
const at = (e) => e.toFixed(1);
function Ln(e, t, a) {
  const s = e.filter((u) => u.to in t.right);
  if (!s.length) return [];
  const n = (u) => {
    const g = /* @__PURE__ */ new Map();
    for (const m of s) g.set(m[u], (g.get(m[u]) ?? 0) + m.watts);
    return g;
  }, i = Math.max(...n("from").values(), ...n("to").values()), o = Math.min(a.maxPxPerKw / 1e3, 44 / i), r = (u) => Math.max(a.minPx, u.watts * o), l = /* @__PURE__ */ new Map();
  for (const u of ht) {
    const g = s.filter((m) => m.from === u).reduce((m, b) => m + r(b), 0);
    l.set(u, t.left[u] - g / 2);
  }
  const c = /* @__PURE__ */ new Map();
  for (const u of Bt.filter((g) => g in t.right)) {
    const g = s.filter((m) => m.to === u).reduce((m, b) => m + r(b), 0);
    c.set(u, t.right[u] - g / 2);
  }
  const d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const u of ht)
    for (const g of s.filter((m) => m.from === u).sort((m, b) => Bt.indexOf(m.to) - Bt.indexOf(b.to)))
      d.set(g, l.get(u)), l.set(u, l.get(u) + r(g));
  for (const u of Bt.filter((g) => g in t.right))
    for (const g of s.filter((m) => m.to === u).sort((m, b) => ht.indexOf(m.from) - ht.indexOf(b.from)))
      p.set(g, c.get(u)), c.set(u, c.get(u) + r(g));
  const { xa: h, xb: v } = t, y = (h + v) / 2;
  return s.map((u) => {
    const g = r(u), m = d.get(u), b = m + g, k = p.get(u), L = k + g;
    return {
      from: u.from,
      to: u.to,
      watts: u.watts,
      thickness: g,
      d: `M${h} ${at(m)} C${at(y)} ${at(m)} ${at(y)} ${at(k)} ${v} ${at(k)} L${v} ${at(L)} C${at(y)} ${at(L)} ${at(y)} ${at(b)} ${h} ${at(b)} Z`,
      centre: `M${h} ${at(m + g / 2)} C${at(y)} ${at(m + g / 2)} ${at(y)} ${at(k + g / 2)} ${v} ${at(k + g / 2)}`
    };
  });
}
const U = {
  sun: "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z",
  grid: "M8.28,5.45L6.5,4.55L7.76,2H16.23L17.5,4.55L15.72,5.44L15,4H9L8.28,5.45M18.62,8H14.09L13.3,5H10.7L9.91,8H5.38L4.1,10.55L5.89,11.44L6.62,10H17.38L18.1,11.45L19.89,10.56L18.62,8M17.77,22H15.7L15.46,21.1L12,15.9L8.53,21.1L8.3,22H6.23L9.12,11H11.19L10.83,12.35L12,14.1L13.16,12.35L12.81,11H14.88L17.77,22M11.4,15L10.5,13.65L9.32,18.13L11.4,15M14.68,18.12L13.5,13.64L12.6,15L14.68,18.12Z",
  home: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",
  car: "M18.92 2C18.72 1.42 18.16 1 17.5 1H6.5C5.84 1 5.29 1.42 5.08 2L3 8V16C3 16.55 3.45 17 4 17H5C5.55 17 6 16.55 6 16V15H18V16C18 16.55 18.45 17 19 17H20C20.55 17 21 16.55 21 16V8L18.92 2M6.5 12C5.67 12 5 11.33 5 10.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12M17.5 12C16.67 12 16 11.33 16 10.5S16.67 9 17.5 9 19 9.67 19 10.5 18.33 12 17.5 12M5 7L6.5 2.5H17.5L19 7H5M7 20H11V18L17 21H13V23L7 20Z",
  therm: "M15 13V5A3 3 0 0 0 9 5V13A5 5 0 1 0 15 13M12 4A1 1 0 0 1 13 5V8H11V5A1 1 0 0 1 12 4Z",
  battery: "M16 20H8V6H16M16.67 4H15V2H9V4H7.33A1.33 1.33 0 0 0 6 5.33V20.67C6 21.4 6.6 22 7.33 22H16.67A1.33 1.33 0 0 0 18 20.67V5.33C18 4.6 17.4 4 16.67 4Z",
  /** Arrow inside the battery: discharging (down) and charging (bolt). */
  batteryDown: "M12 19L7.6 13.4H10.8V7.8H13.2V13.4H16.4Z",
  batteryBolt: "M13.4 6.8L8.8 13.2H11.8L10.8 19.2L15.4 12.6H12.4Z",
  /** Idle glyphs shown instead of a zero. */
  moon: "M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9Z",
  pause: "M8 5h3v14H8zM13 5h3v14h-3z",
  minus: "M5 11h14v2H5z",
  plug: "M16 7V3h-2v4h-4V3H8v4H6v6l3 4v4h6v-4l3-4V7h-2z",
  wallbox: "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z",
  chevron: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  alert: "M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2z",
  info: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
  /** Chevron pointing down (rotated 180° when a row is open). */
  expand: "M7.4 8.6 12 13.2l4.6-4.6L18 10l-6 6-6-6z"
}, xe = 42, we = 10, An = (e) => class extends e {
  onKey(t) {
    t.key === "Escape" && this._batDetail ? this.closeBatteryDetail(!0) : t.key === "Escape" && this._sunDetail ? this.closeSunDetail() : t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, a) {
    const s = this.t, n = t.entities.wallbox, i = [], o = a.carLink === "connected" || a.carLink === "charging", r = ct(this.hass, n.block_charging) === "on", l = ct(this.hass, n.prioritize_connected) === "on" && a.carLink === "connected" && (a.sun ?? 0) > t.num.wallbox.priority_min_sun;
    return r ? i.push({ kind: "info", ...s.alerts.blocked }) : l && i.push({ kind: "warn", ...s.alerts.priorityWaiting }), ct(this.hass, n.boost) === "on" && o && i.push({ kind: "warn", ...s.alerts.boostWallbox }), ct(this.hass, t.entities.boiler.boost) === "on" && i.push({ kind: "warn", ...s.alerts.boostBoiler }), i;
  }
  renderAlerts(t, a) {
    const s = this.alerts(t, a);
    return s.length ? f`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${s.map(
      (n) => f`<li class="alert ${n.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${n.kind === "warn" ? U.alert : U.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${n.title}</span><span class="alert-text">${n.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : D;
  }
  renderElectricity(t, a) {
    const s = a.summarySource ? `var(${gt[a.summarySource]})` : void 0;
    return f`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(n) => {
      n.stopPropagation(), this.openAll();
    }}>
              ${t.titles.electricity ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${U.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(a.summary, s)}
        </div>
        ${this.renderFlow(t, a)} ${this._all ? this.renderDayPopup(t, a) : D}
        ${this._pop || this._all ? f`<button type="button" class="scrim" aria-label=${this.t.close} @click=${() => this.closePop()}></button>` : D}
      </section>`;
  }
  openAll() {
    this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, a, s) {
    const n = this.t, i = t.entities, o = t.num.scale, r = t.num.flows.idle_threshold, l = a.carLink, c = a.soc, d = c !== void 0 && c <= this.batteryReserve(t), p = (x) => c === void 0 ? void 0 : { f: c / 100, active: x, color: d ? "var(--ed-warning)" : "var(--ed-battery)", a1: d ? 0.5 : 0.58 }, h = (x) => `${n.tileSpoken.batteryState(x)}, ${c === void 0 ? n.noData : n.tileSpoken.chargeLevel(R(c))}${d ? `, ${n.tileSpoken.atReserve}` : ""}`, v = l === "connected" || l === "charging" || q(a.car, r), y = t.num.water.gauge_min, u = Math.max(t.num.water.gauge_max, Y(this.hass, i.boiler.target_temperature) ?? 0), g = a.boilTemp, m = (x) => q(x, r), b = a.loadShare.house, k = ht.filter((x) => b[x] >= 0.02), L = m(a.other) && k.length ? this.houseBackground(k, b, I((a.other ?? 0) / o.house, 0, 1)) : void 0, $ = [
      { side: "L", key: "sun", name: n.tile.sun, watts: a.sun, k: (a.sun ?? 0) / o.sun, icon: U.sun, idleIcon: U.moon, idleText: n.idle.sun, aria: a.sun === void 0 ? n.noData : "" },
      { side: "L", key: "bat", name: n.tile.bat, watts: a.batDis, k: (a.batDis ?? 0) / o.battery, icon: U.battery, icon2: U.batteryDown, idleIcon: U.pause, idleText: n.idle.bat, level: p(m(a.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: n.tile.grid, watts: a.imp, k: (a.imp ?? 0) / o.grid, icon: U.grid, idleIcon: U.minus, idleText: n.idle.grid, aria: a.imp === void 0 ? n.noData : m(a.imp) ? n.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: n.tile.house, watts: a.other, k: (a.other ?? 0) / o.house, icon: U.home, idleIcon: U.minus, idleText: n.idle.house, background: L, aria: a.other === void 0 ? n.noData : n.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, a)) {
      const x = v && a.carSoc !== void 0 ? { f: a.carSoc / 100, active: m(a.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      $.push({
        side: "R",
        key: "car",
        name: n.tile.car,
        watts: l === void 0 && a.car === void 0 ? void 0 : a.car ?? 0,
        k: (a.car ?? 0) / o.car,
        icon: U.car,
        idleIcon: l === "disconnected" ? U.minus : U.plug,
        idleText: l === "disconnected" ? n.idle.carDisconnected : l === void 0 ? n.idle.carNoState : n.idle.carConnected,
        level: x,
        aria: [l === void 0 && a.car === void 0 ? n.noData : m(a.car) ? n.tileSpoken.charging : "", v && a.carSoc !== void 0 ? n.tileSpoken.chargeLevel(R(a.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, a)) {
      const x = g === void 0 ? void 0 : { f: I((g - y) / (u - y), 0, 1), active: m(a.boil), color: "var(--ed-boiler)", a1: 0.5 };
      $.push({
        side: "R",
        key: "boil",
        name: n.tile.boil,
        watts: a.boil,
        k: (a.boil ?? 0) / o.boiler,
        icon: U.therm,
        idleIcon: U.pause,
        idleText: n.idle.boil,
        level: x,
        aria: [g === void 0 ? n.noData : n.tileSpoken.temperature(`${H(g)} °C`), m(a.boil) ? n.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return $.push(
      { side: "R", key: "batIn", name: n.tile.batIn, watts: a.batIn, k: (a.batIn ?? 0) / o.battery, icon: U.battery, icon2: U.batteryBolt, idleIcon: U.pause, idleText: n.idle.batIn, level: p(m(a.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: n.tile.gridOut, watts: a.exp, k: (a.exp ?? 0) / o.grid, icon: U.grid, idleIcon: U.minus, idleText: n.idle.gridOut, aria: a.exp === void 0 ? n.noData : m(a.exp) ? n.tileSpoken.gridExport : "" }
    ), $;
  }
  renderFlow(t, a) {
    const s = t.num.flows.idle_threshold, n = ze(
      [a.sun, a.batDis, a.batIn, a.imp, a.exp, a.other, a.car, a.boil].map((d) => q(d, s) ? d : void 0),
      t.num.flows.kw_from
    ), i = this.tiles(t, a, n), o = Dn(this._width, i.filter((d) => d.side === "R").map((d) => d.key)), r = Ln(a.flows, o, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), l = (d) => F`<linearGradient id="rg-${d}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(${gt[d]});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(${gt[d]});stop-opacity:0.88"></stop>
          <stop offset="0.86" style="stop-color:var(${gt[d]});stop-opacity:0.88"></stop>
          <stop offset="1" style="stop-color:var(${gt[d]});stop-opacity:0.2"></stop>
        </linearGradient>`, c = this._pop ? i.find((d) => d.key === this._pop) : void 0;
    return f`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${o.height}px">
        <svg width=${o.width} height=${o.height} viewBox="0 0 ${o.width} ${o.height}" aria-hidden="true">
          <defs>${ht.map(l)}</defs>
          ${r.map(
      (d) => F`<g>
              <path d=${d.d} fill="url(#rg-${d.from})"></path>
              <path class="dots" d=${d.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, d.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(d.watts / 1e3, 10))).toFixed(2)}s"></path>
            </g>`
    )}
        </svg>
        ${i.map((d) => this.renderTile(d, o, n, t))} ${c ? this.renderTilePopup(c, o, t, a, n) : D}
      </div>`;
  }
  houseBackground(t, a, s) {
    const n = t.reduce((c, d) => a[d] > a[c] ? d : c), i = `linear-gradient(${Jt(`var(${gt[n]})`, Math.round(xe + we * s))}, ${Jt(`var(${gt[n]})`, Math.round(xe + we * s))}), var(--ed-tile)`;
    if (t.length === 1) return i;
    const o = t.reduce((c, d) => c + a[d], 0);
    let r = 0;
    const l = [];
    return t.forEach((c, d) => {
      const p = r / o * 100;
      r += a[c];
      const h = r / o * 100, v = `var(${gt[c]})`, y = d === 0 ? `${p}%` : `calc(${p}% + 1px)`, u = d === t.length - 1 ? `${h}%` : `calc(${h}% - 1px)`;
      d > 0 && l.push(`transparent calc(${p}% - 1px) calc(${p}% + 1px)`), l.push(`${v} ${y} ${u}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${i}`;
  }
  tileBackground(t, a, s) {
    const n = `var(${jt[t.key]})`, i = t.level;
    if (i) {
      const o = I(i.f, 0, 1), r = `${(o * 100).toFixed(1)}%`, l = i.active ? Jt(i.color, Math.round(i.a1 * 100)) : "var(--ed-fill-idle)", c = i.active ? Pe(i.color, 14) : "var(--ed-tile)";
      return o < 5e-3 ? i.active ? `linear-gradient(${c}, ${c}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${l} 0%, ${l} ${r}, ${c} ${r}, ${c} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (a) {
      const o = Jt(n, Math.round(xe + we * s));
      return `linear-gradient(${o}, ${o}), var(--ed-tile)`;
    }
  }
  renderTile(t, a, s, n) {
    const i = t.watts === void 0, o = q(t.watts, n.num.flows.idle_threshold), r = t.side === "L" ? 0 : a.width - a.tile.w, l = t.side === "L" ? a.left[t.key] : a.right[t.key], c = I(t.k, 0, 1), d = i ? M : X(t.watts, s), p = this.tileBackground(t, o, c), h = `left:${r}px;top:${(l - a.tile.h / 2).toFixed(1)}px;width:${a.tile.w}px;height:${a.tile.h}px;--tc:var(${jt[t.key]});--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%${p ? `;background:${p}` : ""}`;
    return f`<button
        type="button"
        class="tile ${o ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""}"
        data-tile=${t.key}
        style=${h}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${o ? d : i ? M : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${o ? t.icon : t.idleIcon}></path>${o && t.icon2 ? F`<path class="icon2" d=${t.icon2}></path>` : D}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${o ? d : i ? M : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
  }
  renderTilePopup(t, a, s, n, i) {
    if (t.key === "bat" || t.key === "batIn") return this.renderBatteryPopup(t, a, s, n, i);
    if (t.key === "sun") return this.renderSunPopup(t, a, s, n, i);
    const o = this.t, r = s.num.flows.idle_threshold, l = this.today(s), c = (C) => C === void 0 ? M : `${nt(C)} kWh`, d = (C) => C === void 0 ? M : X(C, i), p = (C) => q(C, r), h = n.soc, v = h !== void 0 && h <= this.batteryReserve(s), y = (C) => ({
      title: C ? o.tile.bat : o.tile.batIn,
      now: C ? p(n.batDis) ? o.pop.discharging(d(n.batDis)) : n.batDis === void 0 && h === void 0 ? M : o.idle.bat : p(n.batIn) ? o.pop.charging(d(n.batIn)) : n.batIn === void 0 && h === void 0 ? M : o.idle.batIn,
      level: h === void 0 ? void 0 : { label: o.pop.level, text: R(h), percent: h, color: v ? "var(--ed-warning)" : "var(--ed-battery)", note: v ? o.pop.atReserve : "" },
      rows: C ? [{ label: o.pop.rows.discharged, value: c(l.bdis) }] : [{ label: o.pop.rows.charged, value: c(l.bchg) }]
    }), u = (C) => ({
      title: C ? o.tile.gridOut : o.tile.grid,
      now: C ? p(n.exp) ? o.pop.exporting(d(n.exp)) : n.exp === void 0 ? M : o.idle.gridOut : p(n.imp) ? o.pop.importing(d(n.imp)) : n.imp === void 0 ? M : o.idle.grid,
      rows: C ? [{ label: o.pop.rows.exported, value: c(l.gout) }] : [{ label: o.pop.rows.imported, value: c(l.gin) }]
    }), g = n.carLink, m = n.boilTemp, b = s.num.water.gauge_min, k = Math.max(s.num.water.gauge_max, Y(this.hass, s.entities.boiler.target_temperature) ?? 0), $ = {
      sun: { title: o.tile.sun, now: p(n.sun) ? d(n.sun) : n.sun === void 0 ? M : o.idle.sun, rows: [{ label: o.pop.rows.produced, value: c(l.pv) }] },
      bat: y(!0),
      batIn: y(!1),
      grid: u(!1),
      gridOut: u(!0),
      house: { title: o.tile.house, now: p(n.other) ? d(n.other) : n.other === void 0 ? M : o.idle.house, rows: [{ label: o.pop.rows.consumed, value: c(l.house) }] },
      car: {
        title: o.tile.car,
        now: p(n.car) ? o.pop.charging(d(n.car)) : g === "connected" || g === "charging" ? o.pop.carConnectedIdle : g === "disconnected" ? o.idle.carDisconnected : M,
        level: n.carSoc !== void 0 && (g === "connected" || g === "charging") ? { label: o.pop.level, text: R(n.carSoc), percent: n.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: o.pop.rows.carCharged, value: c(l.car) }]
      },
      boil: {
        title: o.tile.boil,
        now: p(n.boil) ? o.pop.heating(d(n.boil)) : n.boil === void 0 ? M : o.idle.boil,
        level: m === void 0 ? void 0 : { label: o.pop.temperature, text: `${H(m)} °C`, percent: I((m - b) / (k - b) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: o.pop.rows.boilerHeated, value: c(l.boil) }]
      }
    }[t.key], x = 236, z = t.side === "L" ? a.tile.w / 2 : a.width - a.tile.w / 2, j = t.side === "L" ? a.left[t.key] : a.right[t.key], E = j - a.tile.h / 2, A = j < a.height / 2, w = I(z - x / 2, 0, a.width - x), T = A ? `top:${(E + a.tile.h + 8).toFixed(0)}px` : `bottom:${(a.height - E + 8).toFixed(0)}px`;
    return f`<div class="pop" role="dialog" aria-label=${$.title} tabindex="-1" style="left:${w.toFixed(0)}px;${T};width:${Math.min(x, a.width)}px">
        <i class="arrow ${A ? "up" : "down"}" aria-hidden="true" style="left:${(z - w - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${$.title}</span><span class="pop-now">${$.now}</span></div>
        ${$.level ? f`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${$.level.label}${$.level.note ? f`<span class="note"> ${$.level.note}</span>` : D}</span>
                <span class="pop-big" style="color:${$.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${$.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${Ha($.level.percent).map((C) => f`<span><i style="width:${C.toFixed(0)}%;background:${$.level.color}"></i></span>`)}</div>
            </div>` : D}
        <div class="pop-rows">${$.rows.map((C) => f`<div class="pop-row"><span>${C.label}</span><b>${C.value}</b></div>`)}</div>
      </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, a) {
    const s = this.t, n = this.today(t), i = (h) => h === void 0 ? M : nt(h), o = [n.pv, n.bdis, n.gin], r = o.every((h) => h !== void 0) ? o.reduce((h, v) => h + v, 0) : void 0, l = n.house === void 0 ? void 0 : n.house + n.car + n.boil + n.bchg + n.gout, c = [
      { label: s.tile.sun, color: "var(--ed-sun)", value: n.pv },
      { label: s.pop.fromBattery, color: "var(--ed-battery)", value: n.bdis },
      { label: s.pop.fromGrid, color: "var(--ed-grid)", value: n.gin }
    ], d = [
      { label: s.tile.house, color: "var(--ed-house)", value: n.house },
      { label: s.tile.car, color: "var(--ed-car)", value: n.car },
      { label: s.tile.boil, color: "var(--ed-boiler)", value: n.boil },
      { label: s.pop.toBattery, color: "var(--ed-battery)", value: n.bchg },
      { label: s.tile.gridOut, color: "var(--ed-grid)", value: n.gout }
    ], p = (h, v, y) => f`<div role="list" aria-label=${h} class="day-col">
        <div class="day-total"><span>${h}</span><b>${i(v)}</b></div>
        ${y.map((u) => f`<div role="listitem" class="day-item"><i style="background:${u.color}" aria-hidden="true"></i><span>${u.label}</span><b>${i(u.value)}</b></div>`)}
      </div>`;
    return f`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${s.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${p(s.pop.sources, r, c)} ${p(s.pop.consumption, l, d)}</div>
      </div>`;
  }
}, En = (e) => class extends e {
  constructor() {
    super(...arguments), this._carGesture = new Be(() => ({
      holdMs: this._config?.num.ui.hold_ms ?? 550,
      doubleTapMs: this._config?.num.ui.double_tap_ms ?? 400
    })), this.carDown = () => {
      this._carGesture.start(() => this.openCarLink());
    }, this.carRelease = () => {
      this._carGesture.release();
    }, this.carCancel = () => {
      this._carGesture.cancel();
    }, this.carClick = (t) => {
      const a = this._config;
      if (!a) return;
      if (t.detail === 0) {
        this._carGesture.cancel(), this.openCarLink();
        return;
      }
      const s = this._carGesture.tap("car", t.timeStamp);
      s === "double" ? this.openCarLink() : s === "single" && (this._carHint = !0, window.clearTimeout(this._timers.get("carhint")), this._timers.set("carhint", window.setTimeout(() => this._carHint = !1, a.num.ui.hint_seconds * 1e3)));
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._carGesture.dispose();
  }
  openCarLink() {
    const t = this._config?.carLink;
    t && (this._carHint = !1, t.startsWith("/") ? (window.history.pushState(null, "", t), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }))) : window.open(t, "_blank", "noopener"));
  }
  renderCar(t, a) {
    const s = this.t, n = t.entities, i = t.num.flows, o = t.num.car.charge_limit, r = a.carLink, l = q(a.car, i.idle_threshold) && r !== "disconnected", c = Ba(a.loadShare.car, i, s), d = this.sourceColor(c), p = ct(this.hass, n.wallbox.block_charging) === "on", h = this.shown(n.wallbox.boost), v = ct(this.hass, n.wallbox.prioritize_connected) === "on" && r === "connected" && !p && (a.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let y, u;
    l ? (y = `${s.car.charging(c.text)}${h === "on" ? ` · ${s.boostOptions.on}` : ""}`, u = d) : r === "connected" || r === "charging" ? (y = s.car.connectedIdle, u = v ? "var(--ed-warning)" : void 0) : r === "disconnected" && (y = s.car.disconnected);
    const g = Pe(u ?? "#d8d8dc", u ? 42 : 28), m = ot(this.hass, n.car.image)?.attributes?.entity_picture, b = a.carSoc, k = ze([q(a.car, i.idle_threshold) ? a.car : void 0], i.kw_from), L = o < 100, $ = s.car.chargeLevel(b === void 0 ? s.noData : R(b), L ? R(o) : void 0), x = n.wallbox, z = h === "on" ? "on" : h === "off" ? "off" : "", j = this.boostOptions, E = h === "on" ? s.car.modeBoost : h === "off" ? s.car.modeSurplus : M;
    return f`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${g}, transparent)"></div><div class="shadow"></div>
            ${typeof m == "string" && m ? f`<img src=${m} alt="" />` : D}
          </div>
          ${t.carLink ? f`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${s.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(A) => A.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? f`<div class="car-hint" aria-hidden="true">${s.hint.holdOrDouble}</div>` : D}` : D}
          <div class="head"><h2 id="h-car">${t.titles.car ?? s.titles.car}</h2>${this.stateLine(y, u)}</div>
          <div class="car-soc">
            <span class="soc">${b === void 0 ? M : H(b)}<small>${this._i18n.percent("")}</small>${b === void 0 ? f`<span class="sr-only">${s.noData}</span>` : D}</span>
            <span class="range">${s.car.range} <b>${a.carRange === void 0 ? M : `${H(a.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${$}>
            ${Ha(I(b ?? 0, 0, 100)).map((A) => f`<span><i style="width:${A.toFixed(1)}%"></i></span>`)}
            ${L ? f`<div class="limit" style="left:${ca(o)}"></div>` : D}
          </div>
          ${L ? f`<div class="meter-label" aria-hidden="true"><span style="left:${ca(o)}">${s.car.limit(R(o))}</span></div>` : D}
        </div>
        ${l ? this.renderCarSources(a, i, X(a.car ?? 0, k)) : D}
        ${x.boost ? f`<div class="mode">
              <div class="mode-head"><span id="mode-l">${s.car.mode}</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${E}</span></div>
              <ed-segmented
                guarded .options=${j} .value=${z} label=${s.car.modeLabel} .hint=${s.hint.holdDragOrDouble} ?disabled=${h === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(A) => this.setBoost("wallbox", A.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, h === "on")}
            </div>` : D}
        ${this.carVisible(t, a) ? this.renderWallboxGroup(t, a, l, d, k) : D}
      </section>`;
  }
  renderCarSources(t, a, s) {
    const n = this.t, i = n.source, o = t.loadShare.car, r = ht.filter((d) => o[d] > 4e-3), l = on(r.map((d) => o[d])), c = (d) => d === "grid" && o.grid > a.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${gt[d]})`;
    return f`<div class="mix">
        <div class="mix-head"><span>${n.car.sourcesTitle}</span><span>${s}</span></div>
        <div class="mix-bar" aria-hidden="true">${r.map((d) => f`<div style="flex:${o[d]} 1 0;background:${c(d)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${n.car.sourcesLabel}>
          ${r.map((d, p) => f`<span><i style="background:${c(d)}"></i>${i[d]}<em>${R(l[p])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, a) {
    const s = t.entities.wallbox.charging_power;
    if (!s) return D;
    const { phases: n, power_min: i, power_max: o, power_step: r } = t.num.wallbox, l = ot(this.hass, s), c = Y(this.hass, s), d = c === void 0 ? void 0 : c * n / 1e3;
    let p = i / 1e3, h = o / 1e3;
    const v = $t(l, "min"), y = $t(l, "max");
    return v !== void 0 && (p = Math.max(p, v * n / 1e3)), y !== void 0 && (h = Math.min(h, y * n / 1e3)), f`<div class="fold ${a ? "open" : ""}" ?inert=${!a}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${d === void 0 ? M : H(d, 1)}<small> kW</small></span>
          <ed-slider
            .min=${p} .max=${h} .step=${r / 1e3} .value=${d ?? p}
            label=${this.t.car.powerLabel} valueText=${d === void 0 ? this.t.noData : `${H(d, 1)} kW`}
            minLabel="${H(p, 1)} kW" maxLabel="${H(h, 1)} kW"
            ?disabled=${d === void 0}
            @hdk-change=${(u) => this.setNumber(s, Math.round(u.detail.value * 1e3 / n), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, a, s, n, i) {
    const o = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, c = !!(r.block_charging || r.prioritize_connected), d = a.carLink, p = s ? f`<span>${o.wallbox.charging} </span><b style="--c:${n}">${X(a.car ?? 0, i)}</b>` : d === "connected" || d === "charging" ? f`${o.wallbox.idle}` : d === "disconnected" ? f`${o.wallbox.disconnected}` : f`${M}`, h = t.entities.car.state_of_charge, v = Y(this.hass, h) === void 0 ? void 0 : As(ot(this.hass, h)?.last_updated, this._now, o), y = this.shown(r.block_charging), u = this.shown(r.prioritize_connected);
    return f`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!c} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${s ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${U.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${o.wallbox.title}</span><span class="row-sub">${p}</span></span>
            <span class="row-aside">${v ? o.wallbox.fromCar(v) : ""}</span>
            ${c ? f`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${U.expand}></path></svg>` : f`<span></span>`}
          </button>
          ${c ? f`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(o.wallbox.block, r.block_charging, y === "on" ? o.wallbox.blockOn : o.wallbox.blockOff, y === "on") : D}
                ${r.prioritize_connected ? this.switchRow(o.wallbox.priority, r.prioritize_connected, u === "on" ? o.wallbox.priorityOn : o.wallbox.priorityOff, !1) : D}
              </div></div>` : D}
        </li>
      </ul>`;
  }
}, te = 45, Ct = 46, Bn = 62, jn = 58;
function ke(e, t) {
  let a = 1;
  for (; a < e.length - 1 && t > e[a].temp; ) a++;
  const s = e[a - 1], n = e[a], i = Math.max(0, Math.min(1, (t - s.temp) / (n.temp - s.temp))), o = (c) => [1, 3, 5].map((d) => parseInt(c.slice(d, d + 2), 16)), r = o(s.color), l = o(n.color);
  return `rgb(${[0, 1, 2].map((c) => Math.round(r[c] + (l[c] - r[c]) * i)).join(",")})`;
}
const It = (e, t) => {
  const a = (135 + 270 * e) * Math.PI / 180;
  return [Bn + t * Math.cos(a), jn + t * Math.sin(a)];
}, zn = (e, t) => {
  const [a, s] = It(e, Ct), [n, i] = It(t, Ct);
  return `M${a.toFixed(2)} ${s.toFixed(2)} A${Ct} ${Ct} 0 0 1 ${n.toFixed(2)} ${i.toFixed(2)}`;
};
function On(e, t, a, s) {
  const n = e === void 0 ? 0 : Math.max(0, Math.min(1, (e - t) / (a - t))), i = "var(--ed-gauge-track)", o = Array.from({ length: te }, (v, y) => {
    const u = (y + 0.5) / te, g = e !== void 0 && u <= n ? ke(s, t + u * (a - t)) : i;
    return F`<path d=${zn(y / te, Math.min(1, (y + 1) / te + 4e-3))} fill="none" stroke=${g} stroke-width="10"></path>`;
  }), [r, l] = It(0, Ct), [c, d] = It(1, Ct), [p, h] = It(n, Ct);
  return F`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${o}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${e !== void 0 && n > 0 ? ke(s, t) : i}></circle>
    <circle cx=${c.toFixed(1)} cy=${d.toFixed(1)} r="5" fill=${e !== void 0 && n >= 0.99 ? ke(s, a) : i}></circle>
    ${e === void 0 ? null : F`<circle class="knob" cx=${p.toFixed(1)} cy=${h.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const Hn = (e) => class extends e {
  renderWater(t, a) {
    const s = this.t, n = t.entities, i = t.num.flows, o = q(a.boil, i.idle_threshold), r = Ba(a.loadShare.boil, i, s), l = this.sourceColor(r), d = this.shown(n.boiler.boost) === "on", p = ze([o ? a.boil : void 0], i.kw_from);
    let h;
    return o ? h = `${s.water.boilerHeats(r.text)}${d ? ` · ${s.boostOptions.on}` : ""}` : a.boil !== void 0 && (h = s.water.noHeating), f`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${t.titles.water ?? s.titles.water}</h2>${this.stateLine(h, o ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, a, o, l, p)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, a, s, n, i) {
    return f`<div class="arc" role="img" aria-label=${i}>
        ${On(t, a, s, n.tempScale)}
        <div class="arc-num"><b>${t === void 0 ? M : H(t)}</b>${t === void 0 ? f`<span class="sr-only">${this.t.noData}</span>` : f`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${H(a)}</span><span class="arc-max" aria-hidden="true">${H(s)}</span>
      </div>`;
  }
  renderBoilerTile(t, a, s, n, i) {
    const o = this.t, r = t.entities.boiler;
    t.num.boiler;
    const l = this.shown(r.boost), c = l === "on", d = Y(this.hass, r.target_temperature), p = Y(this.hass, r.boost_target_temperature), h = c ? p : d, v = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, d ?? 0), u = a.boilTemp, g = !!this._open.targets, m = !!(r.target_temperature || r.boost_target_temperature), b = o.water.boilerLabel(
      u === void 0 ? o.noData : `${H(u)} °C`,
      s ? o.water.heatingWith(X(a.boil, i)) : o.water.notHeating,
      h === void 0 ? void 0 : `${H(h)} °C`,
      H(v),
      `${H(y)} °C`
    );
    return f`<div class="source">
        <div class="source-top">
          ${this.gauge(u, v, y, t, b)}
          <div class="source-body">
            <div>
              <div class="source-title">${o.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${s ? n : "var(--ed-secondary)"}">${s ? X(a.boil, i) : a.boil === void 0 ? M : o.water.notHeating}</span>${h === void 0 ? D : f` <span class="dim">· ${o.water.target(`${H(h)} °C`)}</span>`}
              </div>
            </div>
            ${r.boost ? f`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${o.water.boostMode} .hint=${o.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(k) => this.setBoost("boiler", k.detail.value === "on")}
                ></ed-segmented>` : D}
          </div>
        </div>
        ${m ? f`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${g ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${o.water.targets}</span>
                <span class="rowbtn-value">${o.water.targetFlow} <b>${d === void 0 ? M : H(d)}</b> · ${o.water.targetBoost} <b>${p === void 0 ? M : `${H(p)} °C`}</b></span>
                <svg class="chevron ${g ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${U.expand}></path></svg>
              </button>
              <div class="fold ${g ? "open" : ""}" ?inert=${!g}><div>${this.renderTargets(t, d, p)}</div></div>
            </div>` : D}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, a, s) {
    const n = this.t, i = t.entities.boiler, o = t.num.boiler, r = (l, c, d, p, h, v) => {
      if (!l) return D;
      const y = ot(this.hass, l);
      let u = o.target_min, g = o.target_max;
      const m = $t(y, "min"), b = $t(y, "max");
      return m !== void 0 && (u = Math.max(u, m)), b !== void 0 && (g = Math.min(g, b)), h !== void 0 && (u = Math.max(u, h)), v !== void 0 && (g = Math.min(g, v)), f`<div class="field">
          <span class="field-label">${d}<span class="hint">${p}</span></span><span class="field-value">${c === void 0 ? M : H(c)}<small> °C</small></span>
          <ed-slider
            .min=${u} .max=${g} .step=${o.target_step} .value=${c ?? u}
            label=${n.water.targetSliderLabel(d)} valueText=${c === void 0 ? n.noData : n.water.targetSliderSpoken(`${c} °C`, d)}
            minLabel="${H(u)} °C" maxLabel="${H(g)} °C"
            ?disabled=${c === void 0}
            @hdk-change=${(k) => this.setNumber(l, k.detail.value, n.water.targetWhat(d))}
          ></ed-slider>
        </div>`;
    };
    return f`<div class="detail">
        ${r(i.target_temperature, a, n.water.targetFlow, n.water.targetFlowHint, s, void 0)}
        ${r(i.boost_target_temperature, s, n.water.targetBoost, n.water.targetBoostHint, void 0, a)}
        <p class="hint">${n.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const a = t.entities.mixing;
    if (!a.valve_c1 && !a.valve_c2) return D;
    const s = js(this.shown(a.valve_c1), this.shown(a.valve_c2)), n = s === "on", i = !!(a.valve_c1 && a.valve_c2), o = s === "unclear" ? this.t.water.mixingUnclear : s === void 0 ? this.t.noData : "";
    return f`
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${n ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${n ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${n ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${o ? f`<span class="mixcap-note">${o}</span>` : D}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${n} ?disabled=${s === void 0 || !i}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const a = this.t, s = t.entities.tank, n = t.num.tank, i = s.water_heater, o = ot(this.hass, i), r = this.shown(i), l = r === "off", c = r === "heat", d = $t(o, "temperature"), p = this._tankTemp, h = p && p.id === i ? p.value : d, v = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, Y(this.hass, t.entities.boiler.target_temperature) ?? 0), u = l ? n.temp_min : h, g = Array.isArray(o?.attributes?.operation_list) ? o.attributes.operation_list : Object.keys(a.tank.modes), m = Object.keys(a.tank.modes).filter((E) => g.includes(E)).map((E) => ({ value: E, label: a.tank.modes[E] })), b = !!this._open.tank, { min: k, max: L } = this.tankRange(t), $ = r === void 0 ? M : a.tank.modes[r] ?? r, x = l ? a.tank.keepsMinimum : c ? a.tank.setManually : a.tank.byPlan, z = u === void 0 ? M : l ? a.tank.summaryOff(`${H(n.temp_min)} °C`) : (c ? a.tank.summaryManual : a.tank.summaryPlan)(`${H(u)} °C`), j = a.tank.label(
      u === void 0 ? a.tank.settingNoData : l ? a.tank.settingOff(`${H(n.temp_min)} °C`) : a.tank.settingSet(`${H(u)} °C`),
      $,
      H(v),
      `${H(y)} °C`
    );
    return f`<div class="source">
        <div class="source-top">
          ${this.gauge(u, v, y, t, j)}
          <div class="source-body">
            <div>
              <div class="source-title">${a.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${c ? "var(--ed-text)" : "var(--ed-secondary)"}">${$}</span>${r === void 0 ? D : f` <span class="dim">· ${x}</span>`}</div>
            </div>
            ${i ? f`<ed-segmented compact .options=${m} .value=${r ?? ""} label=${a.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(E) => this.setTank(i, E.detail.value)}></ed-segmented>` : D}
          </div>
        </div>
        ${i ? f`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${b ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${a.tank.temperature}</span>
                <span class="rowbtn-value">${z}</span>
                <svg class="chevron ${b ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${U.expand}></path></svg>
              </button>
              <div class="fold ${b ? "open" : ""}" ?inert=${!b}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${a.tank.temperature}<span class="hint">${l ? a.tank.hintOff : c ? a.tank.hintManual : a.tank.hintPlan}</span></span>
                    <span class="field-value">${u === void 0 ? M : H(u)}<small> °C</small></span>
                    <ed-slider
                      .min=${k} .max=${L} .step=${n.temp_step} .tickStep=${5} .value=${u ?? k}
                      label=${a.tank.sliderLabel} valueText=${h === void 0 ? a.noData : a.tank.sliderSpoken(`${h} °C`)}
                      minLabel="${H(k)} °C" maxLabel="${H(L)} °C"
                      ?disabled=${h === void 0 || l}
                      @hdk-change=${(E) => this.setTankTemperature(i, E.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : D}
      </div>`;
  }
}, Fe = class Fe extends Hn(En(An(Cn(pn(ln(G)))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return D;
    const a = Es(this.hass, t, this.t), s = t.colors, n = `--ed-sun:${s.sun};--ed-battery:${s.battery};--ed-grid:${s.grid};--ed-house:${s.house};--ed-car:${s.car};--ed-boiler:${s.boiler};--ed-discharge:${s.discharge};--ed-accent:${s.accent};--ed-warning:${s.warning};--ed-off:${s.neutral}`;
    return this._batDetail ? f`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderBatteryDetail(t, a)}</div>` : this._sunDetail ? f`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderSunDetail(t, a)}</div>` : f`<div class="page" style=${n} @keydown=${this.onKey}>
      ${t.title === "" ? D : f`<h1>${t.title ?? this.t.title}</h1>`} ${this.renderAlerts(t, a)} ${this.renderElectricity(t, a)} ${this.renderCar(t, a)}
      ${this.renderWater(t, a)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
Fe.styles = zs;
let Me = Fe;
us("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", Me);
window.customCards = window.customCards ?? [];
window.customCards.some((e) => e.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: ie(vs()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.1.0 · 2026-10-30 14:04 UTC · po 5758a6f ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
