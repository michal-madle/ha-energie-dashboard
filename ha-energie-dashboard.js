const ze = globalThis, ha = ze.ShadowRoot && (ze.ShadyCSS === void 0 || ze.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pa = /* @__PURE__ */ Symbol(), Oa = /* @__PURE__ */ new WeakMap();
let ms = class {
  constructor(t, a, s) {
    if (this._$cssResult$ = !0, s !== pa) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = a;
  }
  get styleSheet() {
    let t = this.o;
    const a = this.t;
    if (ha && t === void 0) {
      const s = a !== void 0 && a.length === 1;
      s && (t = Oa.get(a)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Oa.set(a, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vs = (e) => new ms(typeof e == "string" ? e : e + "", void 0, pa), zt = (e, ...t) => {
  const a = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new ms(a, e, pa);
}, Ks = (e, t) => {
  if (ha) e.adoptedStyleSheets = t.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of t) {
    const s = document.createElement("style"), n = ze.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = a.cssText, e.appendChild(s);
  }
}, za = ha ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let a = "";
  for (const s of t.cssRules) a += s.cssText;
  return vs(a);
})(e) : e;
const { is: Ys, defineProperty: qs, getOwnPropertyDescriptor: Xs, getOwnPropertyNames: Js, getOwnPropertySymbols: Qs, getPrototypeOf: tn } = Object, Ye = globalThis, Na = Ye.trustedTypes, en = Na ? Na.emptyScript : "", an = Ye.reactiveElementPolyfillSupport, ke = (e, t) => e, Re = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? en : null;
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
} }, ua = (e, t) => !Ys(e, t), Ha = { attribute: !0, type: String, converter: Re, reflect: !1, useDefault: !1, hasChanged: ua };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ye.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let le = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, a = Ha) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(t, a), !a.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, a);
      n !== void 0 && qs(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, a, s) {
    const { get: n, set: o } = Xs(this.prototype, t) ?? { get() {
      return this[a];
    }, set(i) {
      this[a] = i;
    } };
    return { get: n, set(i) {
      const r = n?.call(this);
      o?.call(this, i), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ha;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const t = tn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const a = this.properties, s = [...Js(a), ...Qs(a)];
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
      for (const n of s) a.unshift(za(n));
    } else t !== void 0 && a.push(za(t));
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
    return Ks(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Re).toAttribute(a, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, a) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), i = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Re;
      this._$Em = n;
      const r = i.fromAttribute(a, o.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, a, s, n = !1, o) {
    if (t !== void 0) {
      const i = this.constructor;
      if (n === !1 && (o = this[t]), s ??= i.getPropertyOptions(t), !((s.hasChanged ?? ua)(o, a) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
      this.C(t, a, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, a, { useDefault: s, reflect: n, wrapped: o }, i) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, i ?? a ?? this[t]), o !== !0 || i !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (a = void 0), this._$AL.set(t, a)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [n, o] of this._$Ep) this[n] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [n, o] of s) {
        const { wrapped: i } = o, r = this[n];
        i !== !0 || this._$AL.has(n) || r === void 0 || this.C(n, void 0, o, r);
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
le.elementStyles = [], le.shadowRootOptions = { mode: "open" }, le[ke("elementProperties")] = /* @__PURE__ */ new Map(), le[ke("finalized")] = /* @__PURE__ */ new Map(), an?.({ ReactiveElement: le }), (Ye.reactiveElementVersions ??= []).push("2.1.2");
const ga = globalThis, Ra = (e) => e, Pe = ga.trustedTypes, Pa = Pe ? Pe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ys = "$lit$", Ut = `lit$${Math.random().toFixed(9).slice(2)}$`, ws = "?" + Ut, sn = `<${ws}>`, te = document, Se = () => te.createComment(""), Me = (e) => e === null || typeof e != "object" && typeof e != "function", ba = Array.isArray, nn = (e) => ba(e) || typeof e?.[Symbol.iterator] == "function", Qe = `[ 	
\f\r]`, we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ia = /-->/g, Fa = />/g, Kt = RegExp(`>|${Qe}(?:([^\\s"'>=/]+)(${Qe}*=${Qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wa = /'/g, Ua = /"/g, xs = /^(?:script|style|textarea|title)$/i, $s = (e) => (t, ...a) => ({ _$litType$: e, strings: t, values: a }), m = $s(1), K = $s(2), ge = /* @__PURE__ */ Symbol.for("lit-noChange"), _ = /* @__PURE__ */ Symbol.for("lit-nothing"), Va = /* @__PURE__ */ new WeakMap(), qt = te.createTreeWalker(te, 129);
function ks(e, t) {
  if (!ba(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Pa !== void 0 ? Pa.createHTML(t) : t;
}
const on = (e, t) => {
  const a = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = we;
  for (let r = 0; r < a; r++) {
    const l = e[r];
    let d, c, h = -1, u = 0;
    for (; u < l.length && (i.lastIndex = u, c = i.exec(l), c !== null); ) u = i.lastIndex, i === we ? c[1] === "!--" ? i = Ia : c[1] !== void 0 ? i = Fa : c[2] !== void 0 ? (xs.test(c[2]) && (n = RegExp("</" + c[2], "g")), i = Kt) : c[3] !== void 0 && (i = Kt) : i === Kt ? c[0] === ">" ? (i = n ?? we, h = -1) : c[1] === void 0 ? h = -2 : (h = i.lastIndex - c[2].length, d = c[1], i = c[3] === void 0 ? Kt : c[3] === '"' ? Ua : Wa) : i === Ua || i === Wa ? i = Kt : i === Ia || i === Fa ? i = we : (i = Kt, n = void 0);
    const g = i === Kt && e[r + 1].startsWith("/>") ? " " : "";
    o += i === we ? l + sn : h >= 0 ? (s.push(d), l.slice(0, h) + ys + l.slice(h) + Ut + g) : l + Ut + (h === -2 ? r : g);
  }
  return [ks(e, o + (e[a] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Te {
  constructor({ strings: t, _$litType$: a }, s) {
    let n;
    this.parts = [];
    let o = 0, i = 0;
    const r = t.length - 1, l = this.parts, [d, c] = on(t, a);
    if (this.el = Te.createElement(d, s), qt.currentNode = this.el.content, a === 2 || a === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = qt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(ys)) {
          const u = c[i++], g = n.getAttribute(h).split(Ut), v = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: v[2], strings: g, ctor: v[1] === "." ? ln : v[1] === "?" ? dn : v[1] === "@" ? cn : qe }), n.removeAttribute(h);
        } else h.startsWith(Ut) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (xs.test(n.tagName)) {
          const h = n.textContent.split(Ut), u = h.length - 1;
          if (u > 0) {
            n.textContent = Pe ? Pe.emptyScript : "";
            for (let g = 0; g < u; g++) n.append(h[g], Se()), qt.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[u], Se());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ws) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(Ut, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += Ut.length - 1;
      }
      o++;
    }
  }
  static createElement(t, a) {
    const s = te.createElement("template");
    return s.innerHTML = t, s;
  }
}
function be(e, t, a = e, s) {
  if (t === ge) return t;
  let n = s !== void 0 ? a._$Co?.[s] : a._$Cl;
  const o = Me(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, a, s)), s !== void 0 ? (a._$Co ??= [])[s] = n : a._$Cl = n), n !== void 0 && (t = be(e, n._$AS(e, t.values), n, s)), t;
}
class rn {
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
    const { el: { content: a }, parts: s } = this._$AD, n = (t?.creationScope ?? te).importNode(a, !0);
    qt.currentNode = n;
    let o = qt.nextNode(), i = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (i === l.index) {
        let d;
        l.type === 2 ? d = new De(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new hn(o, this, t)), this._$AV.push(d), l = s[++r];
      }
      i !== l?.index && (o = qt.nextNode(), i++);
    }
    return qt.currentNode = te, n;
  }
  p(t) {
    let a = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, a), a += s.strings.length - 2) : s._$AI(t[a])), a++;
  }
}
class De {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, a, s, n) {
    this.type = 2, this._$AH = _, this._$AN = void 0, this._$AA = t, this._$AB = a, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = be(this, t, a), Me(t) ? t === _ || t == null || t === "" ? (this._$AH !== _ && this._$AR(), this._$AH = _) : t !== this._$AH && t !== ge && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : nn(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== _ && Me(this._$AH) ? this._$AA.nextSibling.data = t : this.T(te.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: a, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Te.createElement(ks(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(a);
    else {
      const o = new rn(n, this), i = o.u(this.options);
      o.p(a), this.T(i), this._$AH = o;
    }
  }
  _$AC(t) {
    let a = Va.get(t.strings);
    return a === void 0 && Va.set(t.strings, a = new Te(t)), a;
  }
  k(t) {
    ba(this._$AH) || (this._$AH = [], this._$AR());
    const a = this._$AH;
    let s, n = 0;
    for (const o of t) n === a.length ? a.push(s = new De(this.O(Se()), this.O(Se()), this, this.options)) : s = a[n], s._$AI(o), n++;
    n < a.length && (this._$AR(s && s._$AB.nextSibling, n), a.length = n);
  }
  _$AR(t = this._$AA.nextSibling, a) {
    for (this._$AP?.(!1, !0, a); t !== this._$AB; ) {
      const s = Ra(t).nextSibling;
      Ra(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class qe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, a, s, n, o) {
    this.type = 1, this._$AH = _, this._$AN = void 0, this.element = t, this.name = a, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = _;
  }
  _$AI(t, a = this, s, n) {
    const o = this.strings;
    let i = !1;
    if (o === void 0) t = be(this, t, a, 0), i = !Me(t) || t !== this._$AH && t !== ge, i && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = be(this, r[s + l], a, l), d === ge && (d = this._$AH[l]), i ||= !Me(d) || d !== this._$AH[l], d === _ ? t = _ : t !== _ && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    i && !n && this.j(t);
  }
  j(t) {
    t === _ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ln extends qe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === _ ? void 0 : t;
  }
}
class dn extends qe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== _);
  }
}
class cn extends qe {
  constructor(t, a, s, n, o) {
    super(t, a, s, n, o), this.type = 5;
  }
  _$AI(t, a = this) {
    if ((t = be(this, t, a, 0) ?? _) === ge) return;
    const s = this._$AH, n = t === _ && s !== _ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== _ && (s === _ || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class hn {
  constructor(t, a, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = a, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    be(this, t);
  }
}
const pn = ga.litHtmlPolyfillSupport;
pn?.(Te, De), (ga.litHtmlVersions ??= []).push("3.3.3");
const un = (e, t, a) => {
  const s = a?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = a?.renderBefore ?? null;
    s._$litPart$ = n = new De(t.insertBefore(Se(), o), o, void 0, a ?? {});
  }
  return n._$AI(e), n;
};
const fa = globalThis;
class Lt extends le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const a = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = un(a, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ge;
  }
}
Lt._$litElement$ = !0, Lt.finalized = !0, fa.litElementHydrateSupport?.({ LitElement: Lt });
const gn = fa.litElementPolyfillSupport;
gn?.({ LitElement: Lt });
(fa.litElementVersions ??= []).push("4.2.2");
const bn = { attribute: !0, type: String, converter: Re, reflect: !1, hasChanged: ua }, fn = (e = bn, t, a) => {
  const { kind: s, metadata: n } = a;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(a.name, e), s === "accessor") {
    const { name: i } = a;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(i, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(i, void 0, e, r), r;
    } };
  }
  if (s === "setter") {
    const { name: i } = a;
    return function(r) {
      const l = this[i];
      t.call(this, r), this.requestUpdate(i, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function z(e) {
  return (t, a) => typeof a == "object" ? fn(e, t, a) : ((s, n, o) => {
    const i = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), i ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, a);
}
function G(e) {
  return z({ ...e, state: !0, attribute: !1 });
}
var mn = Object.defineProperty, ve = (e, t, a, s) => {
  for (var n = void 0, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (n = i(t, a, n) || n);
  return n && mn(t, a, n), n;
};
const Ta = class Ta extends Lt {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: a } = this, s = (t - a) / 2, n = 2 * Math.PI * s, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), i = t / 2;
    return m`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${i} cy=${i} r=${s} fill="none" stroke-width=${a}></circle>
        <circle
          class="fill"
          cx=${i}
          cy=${i}
          r=${s}
          fill="none"
          stroke-width=${a}
          stroke-linecap="round"
          stroke-dasharray="${(n * o).toFixed(1)} ${n.toFixed(1)}"
          transform="rotate(-90 ${i} ${i})"
        ></circle>
      </svg>
      ${this.num ? m`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? m`<span class="unit">${this.unit}</span>` : _}` : _}
    </div>`;
  }
};
Ta.styles = zt`
    :host {
      display: inline-block;
      position: relative;
      flex: none;
      line-height: 0;
    }
    .ring {
      position: relative;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .track {
      stroke: var(--hdk-ring-track, rgb(118 118 128 / 24%));
    }
    .fill {
      stroke: var(--hdk-ring-fill, var(--hdk-accent, #0a84ff));
    }
    .num,
    .unit {
      position: absolute;
      inset: 50% 0 auto;
      text-align: center;
    }
    .num {
      transform: translateY(-50%);
      color: var(--hdk-ring-text, currentColor);
      font-weight: 700;
      line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    /* With a unit the number rises a little to make room for it under the number. */
    .num.with-unit {
      transform: translateY(-62%);
    }
    .unit {
      margin-top: 8px;
      color: var(--hdk-ring-sub, var(--hdk-secondary, #98989f));
      font-size: 10px;
      line-height: 1;
    }
  `;
let Ft = Ta;
ve([
  z({ type: Number })
], Ft.prototype, "fraction");
ve([
  z({ type: Number })
], Ft.prototype, "size");
ve([
  z({ type: Number })
], Ft.prototype, "stroke");
ve([
  z()
], Ft.prototype, "num");
ve([
  z()
], Ft.prototype, "unit");
ve([
  z()
], Ft.prototype, "label");
class Xe {
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
class ma {
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
const va = zt`
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
var vn = Object.defineProperty, wt = (e, t, a, s) => {
  for (var n = void 0, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (n = i(t, a, n) || n);
  return n && vn(t, a, n), n;
};
const Da = class Da extends Lt {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.pending = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new ma(this), this.nudgeIndex = 0, this.gesture = new Xe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), a = this.options.filter((r) => !r.disabled), s = this.options[t]?.value ?? a[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, i = this._dragging ? this._dx : o;
    return m`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-busy=${this.pending ? "true" : _}
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${i}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(r) => this.guarded && r.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (r, l) => m`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === s ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? m`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? m`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
    const n = t.target.closest("button[data-index]"), o = n ? Number(n.dataset.index) : -1, i = o >= 0 && o !== s && !this.options[o]?.disabled;
    this.gesture.start(() => {
      i && (this.drag = void 0, this.select(this.options[o].value));
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
    const n = s.findIndex((r) => r.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, i = s[(n + o + s.length) % s.length];
    t.preventDefault(), this.select(i.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${i.value}"]`)?.focus());
  }
};
Da.styles = [
  va,
  zt`
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
      .track.wrap button {
        padding: 0 4px;
        font-size: 13px;
        line-height: 17px;
        text-align: center;
      }
      /* A control that cannot be used now does not look chosen: the thumb fades with the labels. */
      .track.off .thumb {
        opacity: 0.5;
        box-shadow: none;
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
      :host([pending]) .thumb {
        animation: hdk-seg-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-seg-pending {
        to {
          opacity: 0.45;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) .thumb {
          animation: none;
          outline: 1.5px dashed var(--hdk-accent, #0a84ff);
          outline-offset: -1.5px;
        }
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
let ut = Da;
wt([
  z({ attribute: !1 })
], ut.prototype, "options");
wt([
  z()
], ut.prototype, "value");
wt([
  z()
], ut.prototype, "label");
wt([
  z({ type: Boolean })
], ut.prototype, "disabled");
wt([
  z({ type: Boolean, reflect: !0 })
], ut.prototype, "pending");
wt([
  z({ type: Boolean })
], ut.prototype, "compact");
wt([
  z({ type: Boolean })
], ut.prototype, "wrap");
wt([
  z({ type: Boolean })
], ut.prototype, "guarded");
wt([
  z({ type: Number })
], ut.prototype, "holdMs");
wt([
  z({ type: Number })
], ut.prototype, "doubleTapMs");
wt([
  z({ type: Number })
], ut.prototype, "hintSeconds");
wt([
  z()
], ut.prototype, "hint");
wt([
  G()
], ut.prototype, "_dx");
wt([
  G()
], ut.prototype, "_dragging");
const yn = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', wn = zt`
  :host {
    font-family: ${vs(yn)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`;
var xn = Object.defineProperty, ae = (e, t, a, s) => {
  for (var n = void 0, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (n = i(t, a, n) || n);
  return n && xn(t, a, n), n;
};
const $n = 100, kn = 0.6, _n = 6, Ca = class Ca extends Lt {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const a = this.focusable();
      if (!a.length) return;
      const s = t.composedPath(), n = a.findIndex((i) => s.includes(i)), o = t.shiftKey ? a[n <= 0 ? a.length - 1 : n - 1] : a[n === -1 || n === a.length - 1 ? 0 : n + 1];
      t.preventDefault(), o.focus();
    }, this.touchStart = (t) => {
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((a) => a instanceof HTMLElement && (a.localName.endsWith("-slider") || "drag" in a.dataset || a instanceof HTMLInputElement && a.type === "range"));
    }, this.touchMove = (t) => {
      !this.touchOnSlider && t.cancelable && this.cannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this.touchY ?? 0)) && t.preventDefault();
    }, this.wheel = (t) => {
      t.cancelable && !t.ctrlKey && this.cannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this.drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now() });
    }, this.dragMove = (t) => {
      const a = this.drag;
      if (!a || a.pointerId !== t.pointerId) return;
      const s = t.clientY - a.startY;
      if (!this.dragging) {
        if (s < _n) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, s);
    }, this.dragEnd = (t) => {
      const a = this.drag;
      if (this.drag = void 0, !a || !this.dragging) return;
      this.dragging = !1;
      const s = Math.max(0, t.clientY - a.startY), n = s / Math.max(1, performance.now() - a.startTime);
      t.type === "pointerup" && (s > $n || n > kn) ? this.close() : this.dragY = 0;
    };
  }
  willUpdate(t) {
    if (t.has("open") && this.open && !t.get("open")) {
      let a = document.activeElement;
      for (; a?.shadowRoot?.activeElement; ) a = a.shadowRoot.activeElement;
      this.returnFocus = a, this.dragY = 0;
    }
  }
  updated(t) {
    t.has("open") && (this.open ? this.renderRoot.querySelector(".panel")?.focus() : t.get("open") && (this.returnFocus?.focus?.(), this.returnFocus = void 0));
  }
  close() {
    this.dispatchEvent(new CustomEvent("hdk-close", { bubbles: !0, composed: !0 }));
  }
  /** The focusable elements of the sheet: its ✕ and the slotted content, inside shadow roots too (the controls of the kit). */
  focusable() {
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', a = (n) => [...n.querySelectorAll("*")].flatMap((o) => [
      ...o.matches(t) ? [o] : [],
      ...o.shadowRoot ? a(o.shadowRoot) : []
    ]), s = this.renderRoot.querySelector(".close");
    return [...s ? [s] : [], ...a(this).filter((n) => n.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, a) {
    const s = this.renderRoot.querySelector(".panel");
    return !s || !t.composedPath().includes(s) ? !0 : !(s.scrollHeight > s.clientHeight + 1) || a > 0 && s.scrollTop <= 0 || a < 0 && s.scrollTop + s.clientHeight >= s.scrollHeight - 1;
  }
  render() {
    return this.open ? m`<div
      class="backdrop"
      part="backdrop"
      style=${`--backdrop-opacity: ${Math.max(0, 1 - this.dragY / 400).toFixed(2)}`}
      @click=${() => this.close()}
      @keydown=${this.keydown}
      @touchstart=${this.touchStart}
      @touchmove=${this.touchMove}
      @wheel=${this.wheel}
    >
      <div
        class="panel ${this.wide ? "wide" : ""} ${this.dragging ? "dragging" : ""}"
        part="sheet"
        style=${this.dragY > 0 ? `transform: translateY(${this.dragY}px)` : ""}
        role="dialog"
        aria-modal="true"
        aria-labelledby="title"
        tabindex="-1"
        @click=${(t) => t.stopPropagation()}
      >
        <div class="top" @pointerdown=${this.dragStart} @pointermove=${this.dragMove} @pointerup=${this.dragEnd} @pointercancel=${this.dragEnd}>
          <div class="grabber" aria-hidden="true"></div>
          <div class="head">
            <div>
              <h2 id="title">${this.heading}</h2>
              ${this.sub ? m`<div class="sub">${this.sub}</div>` : _}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : _;
  }
};
Ca.styles = [wn, zt`
    :host {
      display: contents;
    }
    .backdrop {
      position: fixed;
      z-index: 9;
      inset: 0;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: rgb(0 0 0 / calc(var(--hdk-sheet-backdrop, 60%) * var(--backdrop-opacity, 1)));
      overscroll-behavior: contain;
      touch-action: none;
    }
    .panel {
      box-sizing: border-box;
      width: 100%;
      max-width: 460px;
      max-height: 90vh;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
      border: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
      border-bottom: 0;
      border-radius: 24px 24px 0 0;
      background: var(--hdk-sheet-bg, #1c1c1e);
      color: var(--hdk-sheet-text, #ffffff);
      animation: rise 220ms ease-out;
      transition: transform 220ms ease-out;
    }
    .panel:focus {
      outline: none;
    }
    .panel.dragging {
      transition: none;
    }
    .top {
      margin: -8px -16px 0;
      padding: 8px 16px 0;
      touch-action: none;
      cursor: grab;
    }
    .grabber {
      width: 36px;
      height: 5px;
      margin: 0 auto 10px;
      border-radius: 3px;
      background: var(--hdk-sheet-grabber, rgb(255 255 255 / 28%));
    }
    .head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }
    /* The type scale of DASHBOARD_UX_SYSTEM.md (Písmo): Title 2 22/28 and Subhead 15/20 (uživatel 13. 11. 2026: „Q209 ano“). */
    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
    }
    .sub {
      color: var(--hdk-secondary, #9a9aa0);
      font-size: 15px;
      line-height: 20px;
    }
    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 44px;
      width: 44px;
      height: 44px;
      margin: -8px -8px 0 0;
      padding: 0;
      border: 0;
      background: none;
      color: var(--hdk-secondary, #9a9aa0);
      cursor: pointer;
    }
    .close span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--hdk-sheet-button, rgb(118 118 128 / 24%));
    }
    .close svg {
      width: 12px;
      height: 12px;
    }
    .close:focus-visible {
      border-radius: 50%;
      outline: 2px solid var(--hdk-accent, #0a84ff);
      outline-offset: -2px;
    }
    @keyframes rise {
      from {
        transform: translateY(24px);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .panel {
        animation: none;
        transition: none;
      }
    }
    @media (min-width: 600px) {
      .backdrop {
        align-items: center;
      }
      .panel {
        border-bottom: 1px solid var(--hdk-sheet-border, rgb(255 255 255 / 10%));
        border-radius: 24px;
      }
      .grabber {
        display: none;
      }
    }
    @media (orientation: landscape) and (max-height: 600px) {
      .panel.wide {
        max-width: min(960px, calc(100% - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px)));
        max-height: calc(100% - 16px);
      }
    }
  `];
let Ot = Ca;
ae([
  z({ type: Boolean, reflect: !0 })
], Ot.prototype, "open");
ae([
  z()
], Ot.prototype, "heading");
ae([
  z()
], Ot.prototype, "sub");
ae([
  z()
], Ot.prototype, "closeLabel");
ae([
  z({ type: Boolean })
], Ot.prototype, "wide");
ae([
  G()
], Ot.prototype, "dragY");
ae([
  G()
], Ot.prototype, "dragging");
var Sn = Object.defineProperty, _t = (e, t, a, s) => {
  for (var n = void 0, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (n = i(t, a, n) || n);
  return n && Sn(t, a, n), n;
};
const Aa = class Aa extends Lt {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, a = this.max - this.min || 1, s = Math.max(0, Math.min(1, (t - this.min) / a)), n = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${s})`, o = this.mixed && this._drag === void 0 ? this.marks.map((d) => m`<i style="left:${(Math.max(0, Math.min(1, (d - this.min) / a)) * 100).toFixed(2)}%"></i>`) : [], i = this.tickStep || this.step || 1, r = Math.floor(a / i + 1e-9) + 1, l = r >= 2 && r <= 40 ? Array.from({ length: r }, (d, c) => m`<i style="left:${(c * i / a * 100).toFixed(2)}%"></i>`) : [];
    return m`<div class="wrap">
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
        <div class="ticks" aria-hidden="true">${l}</div>
        ${o.length ? m`<div class="marks" aria-hidden="true">${o}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? m`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const a = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: a }, bubbles: !0, composed: !0 }));
  }
};
Aa.styles = zt`
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
    :host([mixed]) input::-webkit-slider-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-thumb {
      opacity: 0;
    }
    :host([mixed]) input::-moz-range-progress {
      background: transparent;
    }
    .marks {
      position: absolute;
      left: 33px;
      right: 33px;
      top: 16px;
      height: 20px;
      pointer-events: none;
    }
    .marks i {
      position: absolute;
      top: 0;
      margin-left: -1.5px;
      width: 3px;
      height: 20px;
      border-radius: 1.5px;
      background: var(--hdk-accent, #0a84ff);
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
let gt = Aa;
_t([
  z({ type: Number })
], gt.prototype, "min");
_t([
  z({ type: Number })
], gt.prototype, "max");
_t([
  z({ type: Number })
], gt.prototype, "step");
_t([
  z({ type: Number })
], gt.prototype, "tickStep");
_t([
  z({ type: Number })
], gt.prototype, "value");
_t([
  z()
], gt.prototype, "label");
_t([
  z()
], gt.prototype, "valueText");
_t([
  z()
], gt.prototype, "minLabel");
_t([
  z()
], gt.prototype, "maxLabel");
_t([
  z({ type: Boolean })
], gt.prototype, "disabled");
_t([
  z({ type: Boolean, reflect: !0 })
], gt.prototype, "mixed");
_t([
  z({ attribute: !1 })
], gt.prototype, "marks");
_t([
  G()
], gt.prototype, "_drag");
var Mn = Object.defineProperty, Nt = (e, t, a, s) => {
  for (var n = void 0, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (n = i(t, a, n) || n);
  return n && Mn(t, a, n), n;
};
const La = class La extends Lt {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new ma(this), this.gesture = new Xe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return m`<button
        type="button"
        role="switch"
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${this.checked ? "true" : "false"}
        aria-busy=${this.pending ? "true" : _}
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
      ${this.hints.hint ? m`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
La.styles = [
  va,
  zt`
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
      :host([pending]) button {
        animation: hdk-switch-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-switch-pending {
        to {
          opacity: 0.5;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) button {
          animation: none;
          outline: 1.5px dashed var(--hdk-accent, #0a84ff);
          outline-offset: 2px;
        }
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
let kt = La;
Nt([
  z({ type: Boolean })
], kt.prototype, "checked");
Nt([
  z({ type: Boolean })
], kt.prototype, "disabled");
Nt([
  z({ type: Boolean, reflect: !0 })
], kt.prototype, "pending");
Nt([
  z()
], kt.prototype, "label");
Nt([
  z({ type: Boolean })
], kt.prototype, "guarded");
Nt([
  z({ type: Number })
], kt.prototype, "holdMs");
Nt([
  z({ type: Number })
], kt.prototype, "doubleTapMs");
Nt([
  z({ type: Number })
], kt.prototype, "hintSeconds");
Nt([
  z()
], kt.prototype, "hintPlacement");
Nt([
  z()
], kt.prototype, "hint");
function Dt(e, t = {}) {
  return e.length < 2 ? m`${e[0] ?? _}` : m`<span class="joined ${t.whole ? "whole" : ""}">${e.map(
    (a, s) => m`${s ? m`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : _}<span class="joined-part">${a}</span>`
  )}</span>`;
}
function It(e, t = {}) {
  return Dt(e.split(" · "), t);
}
function _s(e, t) {
  e.querySelectorAll(".joined").forEach((a) => {
    const s = `${t}|${a.textContent}`;
    if (a.dataset.fit === s) return;
    a.classList.remove("stacked", "flow", "probe");
    const n = [...a.querySelectorAll(":scope > .joined-sep")];
    n.forEach((l) => l.classList.remove("break"));
    const o = [...a.querySelectorAll(":scope > .joined-part")], i = o.map((l) => l.getBoundingClientRect());
    if (!i.length || !i[0].width) {
      delete a.dataset.fit;
      return;
    }
    a.dataset.fit = s;
    const r = n.filter((l, d) => i[d + 1].top > i[d].top + 1);
    if (r.length) {
      if (!a.classList.contains("whole")) {
        a.classList.add("probe");
        const l = o.some((d) => d.scrollWidth > d.clientWidth + 0.5);
        if (a.classList.remove("probe"), l) {
          a.classList.add("flow");
          return;
        }
      }
      a.classList.add("stacked"), r.forEach((l) => l.classList.add("break"));
    }
  });
}
const Ss = zt`
  .joined {
    min-width: 0;
  }

  .joined-part {
    white-space: nowrap;
  }

  .joined-only {
    display: none;
  }

  .joined.stacked .joined-only {
    display: inline;
  }

  /* Where the line breaks the dot goes; the space stays, so a copied or read text keeps its words apart. */
  .joined.stacked .joined-sep.break .joined-dot {
    display: none;
  }

  .joined.stacked .joined-sep.break::after {
    content: "\\A";
    white-space: pre;
  }

  /* Measuring only: every part on its own line. */
  .joined.probe {
    display: block;
  }

  .joined.probe .joined-part {
    display: block;
  }

  .joined.flow .joined-part {
    white-space: normal;
  }

  /* A part on its own line that is still too long (measured before the font or the width settled, iPhone) wraps
     rather than pushing the card wider than the screen. */
  .joined.stacked .joined-part {
    white-space: normal;
  }

  .joined.flow .joined-sep {
    white-space: nowrap;
  }
`;
var Tn = Object.defineProperty, bt = (e, t, a, s) => {
  for (var n = void 0, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (n = i(t, a, n) || n);
  return n && Tn(t, a, n), n;
};
const Ea = class Ea extends Lt {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new ma(this), this.gesture = new Xe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    _s(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", a = this.count === void 0 ? null : m`<span class="count">${this.count}</span>`;
    return m`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : _}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : _}
        aria-busy=${this.pending ? "true" : _}
        aria-haspopup=${this.kind === "open" ? "dialog" : _}
        aria-label=${this.label || _}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(s) => this.protected && s.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? m`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? a : m`<span class="text">${It(this.text)}${a}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? m`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  /** Opening a popup changes nothing, so an `open` tile is never protected. */
  get protected() {
    return this.guarded && this.kind !== "open";
  }
  emit() {
    this.hints.hide();
    const [t, a] = this.kind === "toggle" ? ["hdk-toggle", { checked: this.state !== "on" }] : this.kind === "open" ? ["hdk-open", {}] : ["hdk-press", {}];
    this.dispatchEvent(new CustomEvent(t, { detail: a, bubbles: !0, composed: !0 }));
  }
  onDown(t) {
    !this.protected || this.disabled || t.button > 0 || this.gesture.start(() => this.emit());
  }
  onClick(t) {
    if (this.disabled) return;
    if (!this.protected) {
      this.emit();
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.emit();
      return;
    }
    const a = this.gesture.tap("tile", t.timeStamp);
    a === "double" ? this.emit() : a === "single" && this.hints.show(this.hintSeconds);
  }
};
Ea.styles = [
  va,
  Ss,
  zt`
      :host {
        position: relative;
        display: block;
        min-width: 0;
      }
      button {
        position: relative;
        /* The name starts at the top in every tile of a row, whatever the height of the tallest one. */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        min-height: 60px;
        margin: 0;
        padding: 10px 12px;
        border: 0;
        border-radius: 12px;
        background: var(--hdk-tile, #1c1c1e);
        color: var(--hdk-tile-text, #fff);
        font: inherit;
        text-align: start;
        cursor: pointer;
        touch-action: manipulation;
        -webkit-touch-callout: none;
        user-select: none;
        -webkit-user-select: none;
      }
      :host([state="off"]) button {
        background: transparent;
        box-shadow: inset 0 0 0 1px var(--hdk-tile-border, rgb(84 84 88 / 65%));
      }
      :host([state="on"]) button {
        background: var(--hdk-tile-on, #0a6ed1);
        color: var(--hdk-tile-on-text, #fff);
        box-shadow: inset 0 0 0 1.5px var(--hdk-tile-on-border, transparent);
      }
      :host([state="mixed"]) button {
        background: var(--hdk-tile-mixed, #17395d);
      }
      /* Sent and on its way: the fill goes between its own and the accent until Home Assistant reports the result. */
      :host([pending]) button {
        animation: hdk-pending 1.3s ease-in-out infinite alternate;
      }
      @keyframes hdk-pending {
        to {
          background: var(--hdk-tile-on, #0a6ed1);
          color: var(--hdk-tile-on-text, #fff);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        :host([pending]) button {
          animation: none;
          background: var(--hdk-tile-mixed, #17395d);
          /* Not by colour alone: a dashed accent outline marks the command on its way. */
          outline: 1.5px dashed var(--hdk-tile-on, #0a6ed1);
          outline-offset: -1.5px;
        }
      }
      .name {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 15px;
        line-height: 20px;
        font-weight: 600;
        overflow-wrap: anywhere;
      }
      .name > span:first-child {
        flex: 1;
        min-width: 0;
      }
      .chevron {
        flex: none;
        font-weight: 400;
        color: var(--hdk-secondary, #98989f);
      }
      .text {
        display: block;
        font-size: 13px;
        line-height: 18px;
        color: var(--hdk-secondary, #98989f);
      }
      :host([state="on"]) .text,
      :host([state="on"]) .chevron {
        color: var(--hdk-tile-on-sub, #fff);
      }
      :host([centered]) button {
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 52px;
        text-align: center;
      }
      :host([centered]) .name {
        font-size: 17px;
        line-height: 22px;
      }
      :host([centered]) .name > span:first-child {
        flex: none;
      }
      .count {
        flex: none;
        display: grid;
        place-items: center;
        min-width: 22px;
        height: 22px;
        box-sizing: border-box;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--hdk-tile-badge, rgb(255 255 255 / 16%));
        font-size: 13px;
        line-height: 18px;
        font-weight: 600;
      }
      button:active:not(:disabled),
      button.nudge {
        filter: brightness(1.18);
      }
      button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      button:focus-visible {
        outline: 2px solid var(--hdk-accent, #0a84ff);
        outline-offset: 2px;
      }
      .hint.start {
        right: auto;
        left: 0;
      }
      .hint.start i {
        left: 25px;
      }
      .sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip-path: inset(50%);
        white-space: nowrap;
      }
    `
];
let ct = Ea;
bt([
  z()
], ct.prototype, "name");
bt([
  z()
], ct.prototype, "text");
bt([
  z({ reflect: !0 })
], ct.prototype, "state");
bt([
  z()
], ct.prototype, "kind");
bt([
  z({ type: Number })
], ct.prototype, "count");
bt([
  z({ type: Boolean, reflect: !0 })
], ct.prototype, "centered");
bt([
  z({ type: Boolean })
], ct.prototype, "disabled");
bt([
  z({ type: Boolean, reflect: !0 })
], ct.prototype, "pending");
bt([
  z({ type: Boolean })
], ct.prototype, "pressed");
bt([
  z()
], ct.prototype, "label");
bt([
  z({ type: Boolean })
], ct.prototype, "guarded");
bt([
  z({ type: Number })
], ct.prototype, "holdMs");
bt([
  z({ type: Number })
], ct.prototype, "doubleTapMs");
bt([
  z({ type: Number })
], ct.prototype, "hintSeconds");
bt([
  z()
], ct.prototype, "hint");
bt([
  z()
], ct.prototype, "hintAlign");
function Dn(e) {
  const t = [
    [`${e}-switch`, kt],
    [`${e}-segmented`, ut],
    [`${e}-slider`, gt],
    [`${e}-ring`, Ft],
    [`${e}-tile`, ct],
    [`${e}-sheet`, Ot]
  ];
  for (const [a, s] of t)
    customElements.get(a) || customElements.define(a, s);
}
const Cn = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function An(e) {
  return Cn.has(e);
}
function pt(e, t) {
  return t ? e?.states?.[t] : void 0;
}
function it(e, t) {
  const a = pt(e, t)?.state;
  return a === void 0 || An(a) ? void 0 : a;
}
function Ln(e, t) {
  const a = it(e, t);
  if (a === void 0)
    return;
  const s = Number(a);
  return Number.isFinite(s) ? s : void 0;
}
function Ms(e) {
  return (e?.locale?.language || e?.language || "").trim();
}
function ya(e) {
  const t = e.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function En(e, t) {
  return e === "auto" ? ya(Ms(t)) : e;
}
function jn() {
  return ya(document.documentElement.lang || navigator.language || "");
}
const Ga = /* @__PURE__ */ new WeakMap(), Bn = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, On = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), zn = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function ta(e, t) {
  const a = e?.locale?.[t];
  return typeof a == "string" && a !== "" ? a : "language";
}
function Nn(e, t, a) {
  const s = Ms(a).replace("_", "-"), n = s !== "" && ya(s) === t ? s : Bn[t], o = ta(a, "number_format"), i = ta(a, "time_format"), r = ta(a, "date_format"), l = [t, n, o, i, r].join("|");
  let d = Ga.get(e);
  d || (d = /* @__PURE__ */ new Map(), Ga.set(e, d));
  let c = d.get(l);
  return c || (c = Pn(e[t], t, n, o, i, r), d.set(l, c)), c;
}
function Hn(e) {
  try {
    return new Intl.NumberFormat(e), e;
  } catch {
    return "en";
  }
}
function Rn(e, t) {
  if (e === "12")
    return !0;
  if (e === "24")
    return !1;
  const a = e === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(a).includes("10");
}
function Pn(e, t, a, s, n, o) {
  const i = Hn(a), r = s === "system" ? void 0 : s === "none" ? "en-US" : zn[s] ?? i, l = s === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), u = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), g = Rn(n, i), v = g ? "h12" : "h23", y = new Intl.DateTimeFormat(i, { hour: g ? "numeric" : "2-digit", minute: "2-digit", hourCycle: v }), b = new Intl.DateTimeFormat(i, g ? { hour: "numeric", hourCycle: v } : { hour: "2-digit", minute: "2-digit", hourCycle: v }), p = o === "system" ? void 0 : i, f = new Intl.DateTimeFormat(p, { day: "numeric", month: "numeric" }), x = (w) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return f.format(w);
    const E = f.formatToParts(w), T = E.find((L) => L.type === "literal")?.value ?? "/", S = E[E.length - 1], C = S?.type === "literal" ? S.value : "", j = E.find((L) => L.type === "day")?.value ?? "", M = E.find((L) => L.type === "month")?.value ?? "";
    return o === "DMY" ? `${j}${T}${M}${C}` : `${M}${T}${j}${C}`;
  }, $ = On.has(i.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: i,
    t: e,
    one: (w) => d.format(w),
    two: (w) => c.format(w),
    half: (w) => h.format(Math.round(w * 2) / 2),
    tick: (w) => h.format(w),
    whole: (w) => u.format(w),
    percent: (w) => `${w}${$}%`,
    time: (w) => y.format(w),
    hour: (w) => b.format(w),
    day: x
  };
}
const In = {
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
    houseTakes: (e) => `Dům bere ${e}`,
    /** The loads that take most of the energy ("Auto a bojler berou ze sítě"). */
    loadsTake: (e, t) => {
      const a = e.map((n) => ({ house: "dům", car: "auto", boil: "bojler" })[n]), s = a.length > 1 ? `${a.slice(0, -1).join(", ")} a ${a[a.length - 1]}` : a[0];
      return `${s.charAt(0).toUpperCase()}${s.slice(1)} ${a.length > 1 ? "berou" : "bere"} ${t}`;
    }
  },
  // Alerts (Upozornění)
  alerts: {
    heading: "Upozornění",
    blocked: { title: "Nabíjení auta je zablokované", text: "Auto nenabíjí, ani v Boostu. Přebytek ohřívá vodu." },
    boostWallbox: { title: "Boost wallboxu je zapnutý", text: "Auto smí nabíjet i ze sítě a z baterie." },
    boostBoilerGas: "Plynový zásobník je zapnutý, Boost bojleru FVE nemá smysl.",
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
    connected: "Připojeno",
    // The rule Auto (CURRENT_SPEC.md, Důvod ve stavové větě a scénáře nabíjení): why the car waits, grey after „Připojeno“.
    ending: "Končí nabíjení",
    autoMark: "Auto",
    step: {
      zablokovano: "nabíjení zablokované",
      bez_dat: "pravidlu chybí data",
      auto_nabite: "nabito do cíle",
      dnes_hotovo: "dnes už 2 pokusy, znovu zítra nebo po připojení",
      ceka_baterie: "čeká na nabitou baterii domu",
      ceka_voda: "čeká na dohřátou vodu",
      ceka_slunce: "čeká na slunce",
      start: "dům zapíná nabíjení",
      nabiji: "dům zapíná nabíjení",
      start_stin: "dům by teď zapnul, zatím jen zkouška",
      dnes_hotovo_stin: "dům zatím jen zkouší, nenabíjí"
    },
    modeAuto: "sám podle slunce",
    target: "Nabít do",
    targetLabel: "Nabít auto do",
    // Under the charge (uživatel 16. 11. 2026: „→ 75 % za ~40 min“); the time only while charging.
    eta: (e, t) => `${e}${t ? ` za asi ${t}` : ""}`,
    etaFull: "plno",
    etaReached: "nabito do cíle",
    settings: "Nastavení nabíjení",
    // „Co se děje s autem“, the sheet under the title of the car (uživatel 16. 11. 2026).
    info: {
      heading: "Co se děje s autem",
      now: "Teď",
      last: "Naposledy",
      next: "Dál",
      lastEnd: (e, t) => `Boost skončil ${e}: ${t}`,
      lastNone: "Boost zatím neskončil.",
      atEnd: (e) => `auto ${e}`,
      delivered: (e) => `dodáno ${e}`,
      socDrop: (e, t) => `Při konci bylo podle energie ${e}, auto teď hlásí ${t}.`,
      nextBoost: (e) => `Boost skončí, až auto dosáhne ${e} (počítáno z energie z wallboxu), nebo když auto přestane brát. Pak se vrátí předchozí režim.`,
      nextBoostFull: "Boost skončí, až auto přestane brát. Pak se vrátí předchozí režim.",
      nextSurplus: (e) => `Rozjede se samo z přetoku, až bude voda dohřátá a přetok aspoň ${e}. Přetoky nemají cíl: nabíjí, dokud je přetok.`,
      nextBlocked: "Nenabije se, dokud je nabíjení zablokované.",
      nextSolarBlocked: "Z přetoku se nenabije, dokud jsou přetoky zablokované; nabije jen Boost.",
      nextWindow: (e) => `Z přetoku se nabije až v okně ${e}.`,
      nextBattery: (e) => `Nejdřív se nabije baterie domu; pak se auto rozjede, až bude přetok aspoň ${e}. Přetoky nemají cíl.`,
      nextAutoWait: "Dům zapne nabíjení sám, až baterie domu, přebytek a voda splní podmínky pravidla.",
      nextAutoCharging: (e) => `Dům ukončí nabíjení na ${e}, při poklesu baterie domu na dno, nebo když slunce nestačí.`,
      nextShadow: "Pravidlo Auto zatím jen zkouší: nic nezapne, jen zapíše, kdy by nabíjelo.",
      nextDone: "Nic, auto je nabité do cíle.",
      nextDisconnected: (e) => `Po připojení začne nabíjet podle zvoleného režimu (teď ${e}).`,
      today: "Dnes",
      empty: "Dnes se s nabíjením nic nestalo.",
      error: "Historii se nepodařilo načíst.",
      loading: "Načítám historii…",
      timeline: {
        boostOn: "Boost zapnutý",
        houseStart: "Dům zapnul nabíjení",
        boostOff: "Boost skončil",
        charging: "Začalo nabíjet",
        stopped: "Přestalo nabíjet",
        plugged: "Auto připojené",
        unplugged: "Auto odpojené",
        mode: (e) => `režim ${e}`,
        soc: (e) => `auto ${e}`,
        boostTo: (e) => `Boost zapnutý do ${e}`,
        since: (e, t) => `${e} (od včera ${t})`,
        overnight: "Boost běží od včera",
        houseEnd: "Dům ukončil nabíjení",
        delivered: (e) => `dodáno ${e} kWh`,
        wallbox: (e) => `wallbox hlásí ${e}`,
        surplusRuns: (e) => `Nabíjelo z přetoku ${e}× (AZ Router rozjíždí a zastavuje)`,
        until: (e) => `naposledy ${e}`
      }
    },
    targetShort: "do",
    powerShort: "výkon",
    etaLabel: "cíl",
    duration: (e, t) => e ? `${e} h${t ? ` ${t} min` : ""}` : `${t} min`,
    disconnected: "Odpojeno",
    openDashboard: "Otevřít dashboard auta",
    chargeLevel: (e, t) => `Nabití auta ${e}${t === void 0 ? "" : `, cíl ${t}`}`,
    range: "dojezd",
    limit: (e) => `cíl ${e}`,
    mode: "Režim nabíjení",
    modeLabel: "Režim nabíjení auta",
    modeSurplus: "jen z přebytku",
    // Without the name of the mode, the switch below shows it (uživatel 12. 11. 2026: „Q134 B“); short enough for one
    // line on 320 px („Q138 A“); non-breaking spaces: a conjunction or a one-letter word goes with the next word.
    modeBoost: "i ze sítě a z baterie",
    sourcesTitle: "Odkud auto nabíjí",
    sourcesLabel: "Odkud auto nabíjí, průměr za 5 minut",
    power: "Nabíjecí výkon",
    powerLabel: "Nabíjecí výkon wallboxu"
  },
  /** The two charging and heating modes (segmented control). */
  boostOptions: { off: "Přetoky", on: "Boost" },
  chargeModes: { Přetoky: "Přetoky", Auto: "Auto", Boost: "Boost" },
  /** Why a device does not take the surplus (src/reasons.ts), grey after its state. */
  reasons: {
    blocked: "nabíjení zablokované",
    solarBlocked: "přetoky zablokované",
    outsideWindow: (e) => `mimo okno ${e}`,
    noSun: "bez slunce",
    waterFirst: "přetok ohřívá vodu",
    batteryCharges: "slunce nabíjí baterii",
    littleSurplus: "málo přetoku",
    carNotTaking: "auto nebere",
    heated: "nahřáto",
    batteryFull: "baterie plná",
    inverterMode: (e) => `střídač v režimu ${e}`,
    inverterModes: { off_grid: "Off-grid", backup: "Záloha", eco: "Eco", peak_shaving: "Peak shaving" }
  },
  // Wallbox
  wallbox: {
    title: "Wallbox",
    charging: "nabíjí",
    idle: "nenabíjí",
    disconnected: "odpojeno",
    fromCar: (e) => `data auta ${e}`,
    block: "Zablokovat nabíjení",
    blockOn: "Auto nenabíjí, přebytek ohřívá vodu",
    blockOff: "Auto smí nabíjet",
    priority: "Přednost před bojlerem",
    priorityOn: "V režimu Auto auto nečeká na dohřátou vodu",
    priorityOff: "V režimu Auto auto čeká na dohřátou vodu",
    // Why the Boost of the house ended last (input_text.nabijeni_auta_posledni_konec through wallbox.step, „code|time“).
    lastEnd: (e) => `skončilo ${e}`,
    endReason: {
      dno: "baterie domu na dně",
      slunce: "málo slunce",
      cil: "auto na cíli",
      odmitlo: "auto přestalo brát",
      nezacalo: "auto nezačalo brát",
      odpojeno: "odpojeno",
      blokace: "zablokováno",
      rezim: "změna režimu",
      uzivatel: "Boost vypnut ručně",
      restart: "restart Home Assistantu",
      energie: "pojistka: wallbox dodal energii na cíl",
      wallbox: "vypnuto mimo Home Assistant (aplikace AZ nebo tlačítko wallboxu)"
    }
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
    byPlan: "podle plánu",
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
  house: {
    open: "Detail domu",
    detailLabel: "Detail domu",
    title: "Dům",
    back: "Zpět",
    done: "Hotovo",
    nowLabel: "Spotřeba domu teď",
    appliances: "Spotřebiče",
    none: "Žádné spotřebiče",
    running: (e) => `Běží · ${e}`,
    noneHint: (e, t, a) => a ? `Štítek „${e}“ má ${t} zařízení.` : "Home Assistant nepředal registr zařízení a štítků.",
    runningNoCycle: "Odebírá",
    runningLong: (e) => `Běží už ${e}`,
    ended: (e) => `Skončilo · před ${e}`,
    notRunning: "Neběží",
    idle: "neodebírá",
    currentCycle: "Aktuální cyklus",
    chartToday: "Dnes od půlnoci po hodinách",
    lastCycle: "Poslední cyklus",
    endedAt: (e) => `skončil ${e}`,
    todayWord: "dnes",
    yesterday: "včera",
    chartHours: "Spotřeba domu po hodinách",
    chartDays: "Spotřeba domu po dnech",
    sum: "Celkem",
    today: "Dnes",
    nowCol: "Teď",
    totalCol: "Celkem dnes",
    tabsLabel: "Část detailu domu",
    tabs: { now: "Dnes", hist: "Historie" },
    cyclesCount: (e, t) => `${e} ${e === 1 ? "cyklus" : e >= 2 && e <= 4 ? "cykly" : "cyklů"}${t ? ` · ${t} kWh` : ""}`,
    plug: "Zásuvka",
    plugOff: "vypnuta",
    rangeLabel: "Období",
    houseRest: "Ostatní",
    houseTotal: "Dům (celkem)",
    dataFrom: (e) => `Data od ${e}`,
    axisFrom: { "1d": "−24 h", "7d": "−7 d", "30d": "−30 d" },
    axisTo: "teď",
    problem: {
      overcurrent: "Zásuvka hlásí nadproud",
      overheating: "Zásuvka hlásí přehřátí",
      overpowering: "Zásuvka hlásí přetížení",
      overvoltage: "Zásuvka hlásí přepětí"
    }
  },
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
    /** The share of the possible production until now, in the panel "Dnes zatím". */
    ofPossibleSoFar: (e) => `${e} možného do teď`,
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
      hoursMinutes: (e, t) => `${e} h ${t} min`
    }
  }
}, Fn = {
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
    houseTakes: (e) => `The house takes energy ${e}`,
    /** The loads that take most of the energy ("The car and the boiler take energy from the grid"). */
    loadsTake: (e, t) => {
      const a = e.map((n) => `the ${{ house: "house", car: "car", boil: "boiler" }[n]}`), s = a.length > 1 ? `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}` : a[0];
      return `${s.charAt(0).toUpperCase()}${s.slice(1)} ${a.length > 1 ? "take" : "takes"} energy ${t}`;
    }
  },
  alerts: {
    heading: "Alerts",
    blocked: { title: "Car charging is blocked", text: "The car does not charge, not even in Boost. The surplus heats the water." },
    boostWallbox: { title: "Wallbox Boost is on", text: "The car may also charge from the grid and the battery." },
    boostBoilerGas: "The gas tank is on, so the Boost of the PV boiler makes no sense.",
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
    connected: "Plugged in",
    ending: "Ending the charge",
    autoMark: "Auto",
    step: {
      zablokovano: "charging blocked",
      bez_dat: "the rule has no data",
      auto_nabite: "charged to the target",
      dnes_hotovo: "2 tries today, again tomorrow or after plugging in",
      ceka_baterie: "waiting for a charged house battery",
      ceka_voda: "waiting for hot water",
      ceka_slunce: "waiting for the sun",
      start: "the house is starting the charge",
      nabiji: "the house is starting the charge",
      start_stin: "the house would start now, only a trial so far",
      dnes_hotovo_stin: "the house is only trying, not charging"
    },
    modeAuto: "by itself with the sun",
    target: "Charge to",
    targetLabel: "Charge the car to",
    eta: (e, t) => `${e}${t ? ` in about ${t}` : ""}`,
    etaFull: "full",
    etaReached: "charged to the target",
    settings: "Charging settings",
    info: {
      heading: "What the car is doing",
      now: "Now",
      last: "Last",
      next: "Next",
      lastEnd: (e, t) => `Boost ended ${e}: ${t}`,
      lastNone: "No Boost has ended yet.",
      atEnd: (e) => `car ${e}`,
      delivered: (e) => `delivered ${e}`,
      socDrop: (e, t) => `At the end the energy gave ${e}, the car now reports ${t}.`,
      nextBoost: (e) => `Boost ends when the car reaches ${e} (counted from the energy of the wallbox), or when the car stops taking power. Then the previous mode returns.`,
      nextBoostFull: "Boost ends when the car stops taking power. Then the previous mode returns.",
      nextSurplus: (e) => `It starts by itself from the surplus once the water is hot and the surplus reaches ${e}. Surplus has no target: it charges while there is surplus.`,
      nextBlocked: "It will not charge while charging is blocked.",
      nextSolarBlocked: "It will not charge from the surplus while solar charging is blocked; only Boost charges.",
      nextWindow: (e) => `It charges from the surplus only in the window ${e}.`,
      nextBattery: (e) => `First the house battery charges; then the car starts once the surplus reaches ${e}. Surplus has no target.`,
      nextAutoWait: "The house starts charging by itself once the house battery, the surplus and the water meet the rule.",
      nextAutoCharging: (e) => `The house ends charging at ${e}, when the house battery falls to its floor, or when the sun is not enough.`,
      nextShadow: "The rule Auto is only on trial: it starts nothing, it only notes when it would charge.",
      nextDone: "Nothing, the car is charged to the target.",
      nextDisconnected: (e) => `After plugging in it charges by the chosen mode (now ${e}).`,
      today: "Today",
      empty: "Nothing happened with charging today.",
      error: "The history could not be loaded.",
      loading: "Loading the history…",
      timeline: {
        boostOn: "Boost on",
        houseStart: "The house started charging",
        boostOff: "Boost ended",
        charging: "Charging started",
        stopped: "Charging stopped",
        plugged: "Car plugged in",
        unplugged: "Car unplugged",
        mode: (e) => `mode ${e}`,
        soc: (e) => `car ${e}`,
        boostTo: (e) => `Boost on to ${e}`,
        since: (e, t) => `${e} (since yesterday ${t})`,
        overnight: "Boost running since yesterday",
        houseEnd: "The house ended charging",
        delivered: (e) => `delivered ${e} kWh`,
        wallbox: (e) => `the wallbox reports ${e}`,
        surplusRuns: (e) => `Charged from the surplus ${e}× (the AZ Router starts and stops)`,
        until: (e) => `last at ${e}`
      }
    },
    targetShort: "to",
    powerShort: "power",
    etaLabel: "target",
    duration: (e, t) => e ? `${e} h${t ? ` ${t} min` : ""}` : `${t} min`,
    disconnected: "Unplugged",
    openDashboard: "Open the car dashboard",
    chargeLevel: (e, t) => `Car charge ${e}${t === void 0 ? "" : `, target ${t}`}`,
    range: "range",
    limit: (e) => `target ${e}`,
    mode: "Charging mode",
    modeLabel: "Car charging mode",
    modeSurplus: "from the surplus only",
    modeBoost: "also grid and battery",
    sourcesTitle: "Where the car charges from",
    sourcesLabel: "Where the car charges from, 5 minute average",
    power: "Charging power",
    powerLabel: "Wallbox charging power"
  },
  boostOptions: { off: "Surplus", on: "Boost" },
  chargeModes: { Přetoky: "Surplus", Auto: "Auto", Boost: "Boost" },
  reasons: {
    blocked: "charging blocked",
    solarBlocked: "solar blocked",
    outsideWindow: (e) => `outside the window ${e}`,
    noSun: "no sun",
    waterFirst: "the surplus heats the water",
    batteryCharges: "the sun charges the battery",
    littleSurplus: "too little surplus",
    carNotTaking: "the car does not take it",
    heated: "heated",
    batteryFull: "battery full",
    inverterMode: (e) => `inverter in mode ${e}`,
    inverterModes: { off_grid: "Off-grid", backup: "Backup", eco: "Eco", peak_shaving: "Peak shaving" }
  },
  wallbox: {
    title: "Wallbox",
    charging: "charging",
    idle: "not charging",
    disconnected: "unplugged",
    fromCar: (e) => `car data ${e}`,
    block: "Block charging",
    blockOn: "The car does not charge, the surplus heats the water",
    blockOff: "The car may charge",
    priority: "Priority over the boiler",
    priorityOn: "In Auto the car does not wait for hot water",
    priorityOff: "In Auto the car waits for hot water",
    lastEnd: (e) => `ended ${e}`,
    endReason: {
      dno: "house battery at its floor",
      slunce: "too little sun",
      cil: "car at its target",
      odmitlo: "car stopped taking power",
      nezacalo: "car did not start taking power",
      odpojeno: "unplugged",
      blokace: "blocked",
      rezim: "mode changed",
      uzivatel: "Boost switched off by hand",
      restart: "Home Assistant restarted",
      energie: "safeguard: the wallbox delivered the energy for the target",
      wallbox: "switched off outside Home Assistant (AZ app or the wallbox button)"
    }
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
    // Not „the boiler“: in English it reads as the Boiler (PV) tile above.
    keepsMinimum: "held at the minimum",
    byPlan: "by schedule",
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
  house: {
    open: "House details",
    detailLabel: "House details",
    title: "House",
    back: "Back",
    done: "Done",
    nowLabel: "House use now",
    appliances: "Appliances",
    none: "No appliances",
    running: (e) => `Running · ${e}`,
    noneHint: (e, t, a) => a ? `The label "${e}" has ${t} devices.` : "Home Assistant did not pass the registry of devices and labels.",
    runningNoCycle: "Drawing power",
    runningLong: (e) => `Running for ${e}`,
    ended: (e) => `Finished · ${e} ago`,
    notRunning: "Not running",
    idle: "not drawing",
    currentCycle: "Current cycle",
    chartToday: "Today by hour, from midnight",
    lastCycle: "Last cycle",
    endedAt: (e) => `ended ${e}`,
    todayWord: "today",
    yesterday: "yesterday",
    chartHours: "House consumption by hour",
    chartDays: "House consumption by day",
    sum: "Total",
    today: "Today",
    nowCol: "Now",
    totalCol: "Total today",
    tabsLabel: "Part of the house details",
    tabs: { now: "Today", hist: "History" },
    cyclesCount: (e, t) => `${e} ${e === 1 ? "cycle" : "cycles"}${t ? ` · ${t} kWh` : ""}`,
    plug: "Socket",
    plugOff: "off",
    rangeLabel: "Period",
    houseRest: "Other",
    houseTotal: "House (total)",
    dataFrom: (e) => `Data from ${e}`,
    axisFrom: { "1d": "−24 h", "7d": "−7 d", "30d": "−30 d" },
    axisTo: "now",
    problem: {
      overcurrent: "Socket reports overcurrent",
      overheating: "Socket reports overheating",
      overpowering: "Socket reports overload",
      overvoltage: "Socket reports overvoltage"
    }
  },
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
    ofPossibleSoFar: (e) => `${e} of possible so far`,
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
      hoursMinutes: (e, t) => `${e} h ${t} min`
    }
  }
}, Wn = {
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
    houseTakes: (e) => `Huset tar energi ${e}`,
    /** The loads that take most of the energy ("Bilen och beredaren tar energi från nätet"). */
    loadsTake: (e, t) => {
      const a = e.map((n) => ({ house: "huset", car: "bilen", boil: "beredaren" })[n]), s = a.length > 1 ? `${a.slice(0, -1).join(", ")} och ${a[a.length - 1]}` : a[0];
      return `${s.charAt(0).toUpperCase()}${s.slice(1)} tar energi ${t}`;
    }
  },
  alerts: {
    heading: "Varningar",
    blocked: { title: "Billaddningen är blockerad", text: "Bilen laddar inte, inte ens i Boost. Överskottet värmer vattnet." },
    boostWallbox: { title: "Laddboxens Boost är på", text: "Bilen får ladda även från nätet och batteriet." },
    boostBoilerGas: "Gasberedaren är på, så boost av solcellsberedaren är meningslös.",
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
    connected: "Ansluten",
    ending: "Avslutar laddningen",
    autoMark: "Auto",
    step: {
      zablokovano: "laddning blockerad",
      bez_dat: "regeln saknar data",
      auto_nabite: "laddad till målet",
      dnes_hotovo: "2 försök i dag, igen i morgon eller efter anslutning",
      ceka_baterie: "väntar på laddat husbatteri",
      ceka_voda: "väntar på varmvatten",
      ceka_slunce: "väntar på solen",
      start: "huset startar laddningen",
      nabiji: "huset startar laddningen",
      start_stin: "huset skulle starta nu, ännu bara ett test",
      dnes_hotovo_stin: "huset testar bara, laddar inte"
    },
    modeAuto: "själv efter solen",
    target: "Ladda till",
    targetLabel: "Ladda bilen till",
    eta: (e, t) => `${e}${t ? ` om cirka ${t}` : ""}`,
    etaFull: "fullt",
    etaReached: "laddad till målet",
    settings: "Laddningsinställningar",
    info: {
      heading: "Vad bilen gör",
      now: "Nu",
      last: "Senast",
      next: "Sedan",
      lastEnd: (e, t) => `Boost slutade ${e}: ${t}`,
      lastNone: "Ingen Boost har slutat än.",
      atEnd: (e) => `bil ${e}`,
      delivered: (e) => `levererat ${e}`,
      socDrop: (e, t) => `Vid slutet gav energin ${e}, bilen rapporterar nu ${t}.`,
      nextBoost: (e) => `Boost slutar när bilen når ${e} (räknat från laddboxens energi), eller när bilen slutar ta emot. Sedan återkommer föregående läge.`,
      nextBoostFull: "Boost slutar när bilen slutar ta emot. Sedan återkommer föregående läge.",
      nextSurplus: (e) => `Den startar själv från överskottet när vattnet är varmt och överskottet når ${e}. Överskott har inget mål: den laddar så länge det finns överskott.`,
      nextBlocked: "Den laddar inte så länge laddningen är blockerad.",
      nextSolarBlocked: "Den laddar inte från överskottet så länge solladdning är blockerad; bara Boost laddar.",
      nextWindow: (e) => `Den laddar från överskottet först i fönstret ${e}.`,
      nextBattery: (e) => `Först laddas husbatteriet; sedan startar bilen när överskottet når ${e}. Överskott har inget mål.`,
      nextAutoWait: "Huset startar laddningen själv när husbatteriet, överskottet och vattnet uppfyller regeln.",
      nextAutoCharging: (e) => `Huset avslutar laddningen vid ${e}, när husbatteriet når sin gräns, eller när solen inte räcker.`,
      nextShadow: "Regeln Auto testas bara: den startar inget, den noterar bara när den skulle ladda.",
      nextDone: "Inget, bilen är laddad till målet.",
      nextDisconnected: (e) => `Efter anslutning laddar den enligt valt läge (nu ${e}).`,
      today: "I dag",
      empty: "Inget hände med laddningen i dag.",
      error: "Historiken kunde inte läsas.",
      loading: "Läser historiken…",
      timeline: {
        boostOn: "Boost på",
        houseStart: "Huset startade laddningen",
        boostOff: "Boost slutade",
        charging: "Laddningen började",
        stopped: "Laddningen slutade",
        plugged: "Bilen ansluten",
        unplugged: "Bilen urkopplad",
        mode: (e) => `läge ${e}`,
        soc: (e) => `bil ${e}`,
        boostTo: (e) => `Boost på till ${e}`,
        since: (e, t) => `${e} (sedan i går ${t})`,
        overnight: "Boost har gått sedan i går",
        houseEnd: "Huset avslutade laddningen",
        delivered: (e) => `levererat ${e} kWh`,
        wallbox: (e) => `laddboxen rapporterar ${e}`,
        surplusRuns: (e) => `Laddade från överskottet ${e}× (AZ Router startar och stoppar)`,
        until: (e) => `senast ${e}`
      }
    },
    targetShort: "till",
    powerShort: "effekt",
    etaLabel: "mål",
    duration: (e, t) => e ? `${e} h${t ? ` ${t} min` : ""}` : `${t} min`,
    disconnected: "Urkopplad",
    openDashboard: "Öppna bilens dashboard",
    chargeLevel: (e, t) => `Bilens laddning ${e}${t === void 0 ? "" : `, mål ${t}`}`,
    range: "räckvidd",
    limit: (e) => `mål ${e}`,
    mode: "Laddningsläge",
    modeLabel: "Bilens laddningsläge",
    modeSurplus: "bara från överskottet",
    modeBoost: "även nät och batteri",
    sourcesTitle: "Varifrån bilen laddar",
    sourcesLabel: "Varifrån bilen laddar, medelvärde 5 minuter",
    power: "Laddeffekt",
    powerLabel: "Laddboxens laddeffekt"
  },
  boostOptions: { off: "Överskott", on: "Boost" },
  chargeModes: { Přetoky: "Överskott", Auto: "Auto", Boost: "Boost" },
  reasons: {
    blocked: "laddning blockerad",
    solarBlocked: "solladdning blockerad",
    outsideWindow: (e) => `utanför fönstret ${e}`,
    noSun: "ingen sol",
    waterFirst: "överskottet värmer vattnet",
    batteryCharges: "solen laddar batteriet",
    littleSurplus: "för lite överskott",
    carNotTaking: "bilen tar inte emot",
    heated: "uppvärmt",
    batteryFull: "batteriet fullt",
    inverterMode: (e) => `växelriktaren i läge ${e}`,
    inverterModes: { off_grid: "Off-grid", backup: "Reserv", eco: "Eco", peak_shaving: "Peak shaving" }
  },
  wallbox: {
    title: "Laddbox",
    charging: "laddar",
    idle: "laddar inte",
    disconnected: "urkopplad",
    fromCar: (e) => `bildata ${e}`,
    block: "Blockera laddning",
    blockOn: "Bilen laddar inte, överskottet värmer vattnet",
    blockOff: "Bilen får ladda",
    priority: "Företräde före beredaren",
    priorityOn: "I Auto väntar bilen inte på varmvatten",
    priorityOff: "I Auto väntar bilen på varmvatten",
    lastEnd: (e) => `slutade ${e}`,
    endReason: {
      dno: "husets batteri på sin gräns",
      slunce: "för lite sol",
      cil: "bilen på målet",
      odmitlo: "bilen slutade ta emot",
      nezacalo: "bilen började inte ta emot",
      odpojeno: "urkopplad",
      blokace: "blockerad",
      rezim: "läget ändrat",
      uzivatel: "Boost avstängd för hand",
      restart: "Home Assistant startade om",
      energie: "skydd: laddboxen levererade energin för målet",
      wallbox: "avstängd utanför Home Assistant (AZ-appen eller laddboxens knapp)"
    }
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
    // A soft hyphen: on 320 px the title breaks as „Mål-“ „temperaturer“ beside the two lines of the value.
    targets: "Mål­temperaturer",
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
    byPlan: "enligt schema",
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
  house: {
    open: "Husdetaljer",
    detailLabel: "Husdetaljer",
    title: "Hus",
    back: "Tillbaka",
    done: "Klar",
    nowLabel: "Husets förbrukning nu",
    appliances: "Apparater",
    none: "Inga apparater",
    running: (e) => `Pågår · ${e}`,
    noneHint: (e, t, a) => a ? `Etiketten "${e}" har ${t} enheter.` : "Home Assistant skickade inte register över enheter och etiketter.",
    runningNoCycle: "Drar ström",
    runningLong: (e) => `Har varit på i ${e}`,
    ended: (e) => `Klar · för ${e} sedan`,
    notRunning: "Går inte",
    idle: "drar ingen ström",
    currentCycle: "Aktuell cykel",
    chartToday: "Idag per timme, från midnatt",
    lastCycle: "Senaste cykel",
    endedAt: (e) => `slutade ${e}`,
    todayWord: "idag",
    yesterday: "igår",
    chartHours: "Husets förbrukning per timme",
    chartDays: "Husets förbrukning per dag",
    sum: "Totalt",
    today: "Idag",
    nowCol: "Nu",
    totalCol: "Totalt idag",
    tabsLabel: "Del av husdetaljerna",
    tabs: { now: "Idag", hist: "Historik" },
    cyclesCount: (e, t) => `${e} ${e === 1 ? "cykel" : "cykler"}${t ? ` · ${t} kWh` : ""}`,
    plug: "Uttag",
    plugOff: "av",
    rangeLabel: "Period",
    houseRest: "Övrigt",
    houseTotal: "Hus (totalt)",
    dataFrom: (e) => `Data från ${e}`,
    axisFrom: { "1d": "−24 h", "7d": "−7 d", "30d": "−30 d" },
    axisTo: "nu",
    problem: {
      overcurrent: "Uttaget rapporterar överström",
      overheating: "Uttaget rapporterar överhettning",
      overpowering: "Uttaget rapporterar överbelastning",
      overvoltage: "Uttaget rapporterar överspänning"
    }
  },
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
    ofPossibleSoFar: (e) => `${e} av möjligt hittills`,
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
      hoursMinutes: (e, t) => `${e} h ${t} min`
    }
  }
}, Un = { cs: In, en: Fn, sv: Wn };
function Ie(e, t) {
  return Nn(Un, e, t);
}
function V(e, t) {
  const a = Ln(e, t);
  if (a !== void 0)
    return pt(e, t)?.attributes?.unit_of_measurement === "kW" ? a * 1e3 : a;
}
let lt = Ie("cs"), Fe = "auto";
function Vn(e, t = "auto") {
  lt = e, Fe = t;
}
function wa(e, t = 1e3) {
  return e.some((a) => a !== void 0 && Math.abs(a) >= t) ? "kW" : "W";
}
function Ts(e) {
  const t = Fe === "auto" ? Math.abs(Math.round(e * 100) / 100) < 10 ? 2 : Math.abs(Math.round(e * 10) / 10) < 100 ? 1 : 0 : Fe;
  return t === 2 ? lt.two(e) : t === 1 ? lt.one(e) : lt.whole(e);
}
function rt(e, t) {
  return t === "kW" ? `${Ts(e / 1e3)} kW` : `${lt.whole(Math.round(e))} W`;
}
function N(e, t = 0) {
  return t === 0 ? lt.whole(e) : lt.one(e);
}
function q(e, t) {
  if (t === 0) return lt.whole(e);
  if (t === 1) return lt.one(e);
  if (t === 2) return lt.two(e);
  const a = lt.one(1.5).charAt(1), s = 10 ** t, n = Math.round(Math.abs(e) * s);
  return `${e < 0 && n > 0 ? "−" : ""}${lt.whole(Math.floor(n / s))}${a}${String(n % s).padStart(t, "0")}`;
}
function _e(e) {
  return `${new Intl.DateTimeFormat(lt.locale, { weekday: "short" }).format(e)} ${lt.day(e)}`;
}
function Gn(e) {
  return new Intl.DateTimeFormat(lt.locale, { weekday: "short" }).format(e);
}
function Ds(e) {
  return lt.day(e);
}
function de(e) {
  const t = new Intl.DateTimeFormat(lt.locale, { weekday: "long" }).format(e);
  return t.charAt(0).toLocaleUpperCase(lt.locale) + t.slice(1);
}
function st(e) {
  return lt.time(e);
}
function W(e) {
  return lt.percent(typeof e == "number" ? N(e) : e);
}
function Jt(e, t) {
  const a = pt(e, t), s = it(e, t);
  if (s === void 0) return;
  const n = Number(s);
  if (!Number.isFinite(n)) return;
  const o = a?.attributes?.unit_of_measurement;
  return o === "Wh" ? n / 1e3 : o === "MWh" ? n * 1e3 : n;
}
function nt(e) {
  return e < (Fe === 1 ? 0.05 : 5e-3) ? "0" : Ts(e);
}
function Zn(e, t, a) {
  const s = e ? Date.parse(e) : NaN;
  if (!Number.isFinite(s)) return;
  const n = Math.max(0, Math.round((t - s) / 6e4));
  return n < 1 ? a.ago.now : n < 60 ? a.ago.minutes(n) : n < 1440 ? a.ago.hours(Math.round(n / 60)) : a.ago.days(Math.round(n / 1440));
}
const yt = ["sun", "bat", "grid"], fe = ["house", "car", "boil", "batIn", "gridOut"], Ce = (e) => e === void 0 ? void 0 : Math.max(0, e), Q = (e, t) => e !== void 0 && e >= t;
function Cs(e) {
  if (e === "Disconnected") return "disconnected";
  if (e === "Waiting") return "connected";
  if (e === "Charging") return "charging";
}
function Kn(e, t, a) {
  const s = t.entities, n = t.num.flows.idle_threshold, o = Ce(V(e, s.pv.power)), i = V(e, s.battery.power), r = V(e, s.grid.power), l = Ce(V(e, s.house.power)), d = Ce(V(e, s.wallbox.power)), c = Ce(V(e, s.boiler.power)), h = i === void 0 ? void 0 : Math.max(0, i), u = i === void 0 ? void 0 : Math.max(0, -i), g = r === void 0 ? void 0 : Math.max(0, -r), v = r === void 0 ? void 0 : Math.max(0, r), y = l === void 0 ? void 0 : Math.max(0, l - (d ?? 0) - (c ?? 0)), b = (B) => Q(B, n) ? B : 0, p = { sun: b(o), bat: b(h), grid: b(g) }, f = p.sun + p.bat + p.grid, x = [
    ["house", y],
    ["car", d],
    ["boil", c],
    ["batIn", u],
    ["gridOut", v]
  ], $ = x.reduce((B, [, k]) => B + b(k), 0), w = { sun: 0, bat: 0, grid: 0 };
  for (const B of yt) w[B] = f > 0 ? p[B] * $ / f : 0;
  const E = [], T = {}, S = { sun: 0, bat: 0, grid: 0 };
  for (const [B, k] of x) {
    if (!Q(k, n)) continue;
    let O = k;
    const tt = { sun: 0, bat: 0, grid: 0 };
    for (const R of yt) {
      const D = Math.min(w[R], O);
      w[R] -= D, O -= D, tt[R] = D / k, (B === "house" || B === "car" || B === "boil") && (S[R] += D), D > 0.5 && E.push({ from: R, to: B, watts: D });
    }
    T[B] = tt;
  }
  const C = S.sun + S.bat + S.grid, j = { sun: 0, bat: 0, grid: 0 };
  if (C > 0)
    for (const B of yt) j[B] = S[B] / C;
  else if (f > 0)
    for (const B of yt) j[B] = p[B] / f;
  const M = { house: { ...j }, car: { ...j }, boil: { ...j } };
  for (const B of ["house", "car", "boil"]) {
    const k = T[B];
    k && k.sun + k.bat + k.grid > 0 && (M[B] = k);
  }
  const L = {
    sun: o,
    batDis: h,
    batIn: u,
    imp: g,
    exp: v,
    other: y,
    car: d,
    boil: c,
    share: j,
    loadShare: M,
    flows: E,
    soc: V(e, s.battery.state_of_charge),
    carSoc: V(e, s.car.state_of_charge),
    carRange: V(e, s.car.range),
    boilTemp: V(e, s.boiler.temperature),
    carLink: Cs(it(e, s.wallbox.status))
  };
  return Object.assign(L, Yn(L, t.num.flows, a)), L;
}
function Yn(e, t, a) {
  const s = t.idle_threshold, n = (y) => Q(y, s);
  if ([e.sun, e.batDis, e.imp, e.other].every((y) => y === void 0)) return {};
  if (n(e.sun) && !n(e.imp) && !n(e.batDis)) {
    let y;
    return (e.exp ?? 0) > t.export_notice && !n(e.batIn) ? y = a.summary.exportSurplus : n(e.car) ? y = a.summary.sunChargesCar(n(e.batIn)) : n(e.batIn) ? y = a.summary.sunChargesBattery : y = a.summary.sunCoversHouse, { summary: y, summarySource: "sun" };
  }
  const r = [["house", e.other], ["car", e.car], ["boil", e.boil]].filter(([, y]) => n(y)).map(([y, b]) => [y, b]), l = r.reduce((y, [, b]) => y + b, 0), d = r.filter(([, y]) => y >= t.source_min_share / 100 * l).sort((y, b) => b[1] - y[1]);
  if (d.length && !(d.length === 1 && d[0][0] === "house")) {
    const y = d.reduce((f, [, x]) => f + x, 0), b = { sun: 0, bat: 0, grid: 0 };
    for (const [f, x] of d) for (const $ of yt) b[$] += e.loadShare[f][$] * x / y;
    const p = xa(b, t, a);
    return { summary: a.summary.loadsTake(d.map(([f]) => f), p.text), summarySource: p.main };
  }
  const { sun: c, bat: h, grid: u } = e.loadShare.house;
  if (u > t.grid_deviation_share / 100) return { summary: a.summary.fromGrid, summarySource: "grid" };
  const g = t.source_min_share / 100;
  if (c < g && u < g && h > 0) return { summary: a.summary.fromBattery, summarySource: "bat" };
  const v = Ls(e.loadShare.house, g);
  return v.length ? { summary: a.summary.houseTakes(As(v, a)), summarySource: v[0] } : { summary: a.summary.nothing };
}
function As(e, t) {
  return t.from[e[0]] + e.slice(1).map((a) => ` ${t.and} ${t.alsoFrom[a]}`).join("");
}
function Ls(e, t) {
  return yt.filter((a) => e[a] >= t).sort((a, s) => e[s] - e[a]);
}
function xa(e, t, a) {
  let s = Ls(e, t.source_min_share / 100);
  s.length || (s = ["sun"]);
  const n = e.grid > t.grid_deviation_share / 100;
  return { text: As(s, a), main: n ? "grid" : s[0], deviation: n };
}
function qn(e, t) {
  if (!(e === void 0 || t === void 0))
    return e === "off" && t === "on" ? "on" : e === "on" && t === "off" ? "off" : "unclear";
}
const Xn = zt`
  :host {
    display: block;
    --ed-card: #1c1c1e;
    --ed-tile: #2c2c2e;
    --ed-tint-base: #000000;
    --ed-track: #2c2c2e;
    --ed-track-page: #2c2c2e;
    --ed-text: #ffffff;
    --ed-secondary: #98989f;
    --ed-off: #8e8e93;
    /* No data ("––"): DASHBOARD_UX_SYSTEM.md, Text. */
    --ed-nodata: #8e8e93;
    --ed-sep: rgb(84 84 88 / 65%);
    --ed-bar: rgb(255 255 255 / 14%);
    --ed-tick: rgb(255 255 255 / 28%);
    --ed-switch-off: rgb(120 120 128 / 36%);
    /* Selected segment: grey #636366 with white text in the dark, white with black in the light (uživatel 16. 11. 2026: „Q289 dark V4, light V0“). */
    --ed-seg-thumb: #636366;
    --ed-seg-text: #ebebf5;
    --ed-seg-selected: #ffffff;
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
    /* The track of a control that stands on the page itself (the detail), not on a white card: it would vanish on #f2f2f7. */
    --ed-track-page: #e3e3e8;
    --ed-text: #000000;
    --ed-secondary: #5f5f66;
    --ed-off: #8e8e93;
    --ed-nodata: #6e6e73;
    --ed-sep: rgb(60 60 67 / 29%);
    --ed-bar: rgb(60 60 67 / 18%);
    --ed-tick: rgb(60 60 67 / 30%);
    --ed-switch-off: rgb(120 120 128 / 32%);
    --ed-seg-thumb: #ffffff;
    --ed-seg-selected: #000000;
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
    align-items: flex-start;
    gap: 6px;
    color: var(--sc, var(--ed-secondary));
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  :host([data-light]) .state.tinted {
    color: color-mix(in srgb, var(--sc) 45%, #000);
  }

  /* Teplá voda and the car: the state keeps room for two lines, so a longer state („· Boost“) moves nothing (uživatel 12. 11. 2026: „Q130 A“). */
  #h-water + .state,
  #h-car + .state {
    min-height: 40px;
  }

  .boost-mark {
    color: var(--ed-warning);
  }

  :host([data-light]) .boost-mark {
    color: color-mix(in srgb, var(--ed-warning) 45%, #000);
  }

  /* „· Auto“: the house charges by itself, a normal state, so grey (uživatel 15. 11. 2026: „Q269 auto“). */
  .auto-mark {
    color: var(--ed-secondary);
  }

  /* Beside the first line when the state has two. */
  .state .dot {
    flex: none;
    width: 8px;
    height: 8px;
    margin-top: 6px;
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
    grid-template-columns: 28px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    min-height: 44px;
    padding: 6px 0;
  }

  .alert .badge {
    width: 28px;
    height: 28px;
  }

  .alert .badge svg {
    width: 16px;
    height: 16px;
  }

  .alert .row-title {
    font-size: 15px;
    line-height: 20px;
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

  /* Colours of the bands: the colour of the source; in light mode darker (about 3 : 1 on white), the band fades towards the consumer. */
  .flow {
    --band-sun: var(--ed-sun);
    --band-bat: var(--ed-battery);
    --band-grid: var(--ed-grid);
    --band-a1: 0.9;
    --band-a2: 0.45;
  }

  :host([data-light]) .flow {
    --band-sun: color-mix(in srgb, var(--ed-sun) 68%, #000);
    --band-bat: color-mix(in srgb, var(--ed-battery) 75%, #000);
    --band-grid: color-mix(in srgb, var(--ed-grid) 92%, #000);
    --band-a1: 0.9;
    --band-a2: 0.6;
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

  /* An active tile: the number is bigger and bold, the unit next to it smaller and grey (uživatel 3. 11. 2026, common visual language). */
  .tile.on .value {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  /* The unit is muted text colour, not the secondary grey: on a saturated tile the grey has about 2.9 : 1 (measured), this 4.3 : 1 and more. */
  .tile.on .value small {
    color: color-mix(in srgb, var(--ed-text) 90%, transparent);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0;
  }

  :host([data-light]) .tile.on .value small {
    color: color-mix(in srgb, var(--ed-text) 65%, transparent);
  }

  /* Idle texts ("ingen produktion") may wrap to a second line on a narrow card; the tile is tall enough. */
  .tile.idle .value {
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 400;
    line-height: 15px;
    white-space: normal;
  }

  /* An idle tile with the grey level fill (battery, connected car, cold boiler): the word and the name in the text colour, not the secondary grey (2.8 : 1 on the fill, uživatel 3. 11. 2026). */
  .tile.idle.fill .name {
    color: color-mix(in srgb, var(--ed-text) 82%, transparent);
  }

  .tile.idle.fill .value {
    color: var(--ed-text);
  }

  :host([data-light]) .tile.idle.battery .value {
    color: var(--ed-text);
  }

  /* Popups (sheets from the bottom): the house popup keeps every value on one line. */
  .house-pop .pop-row, .house-pop .pop-row span, .house-pop .pop-row b { white-space: nowrap; }
  .house-app { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 0; }
  .house-app .ell { color: var(--ed-pop-sec); font-size: 15px; line-height: 20px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .house-app b { font-size: 17px; line-height: 22px; font-weight: 600; white-space: nowrap; }
  .house-list { display: flex; flex-direction: column; gap: 10px; }
  .house-list .bat-cap { padding: 0 4px; }
  .house-item { overflow: hidden; }
  .house-body { margin: 0 12px 12px; padding: 4px 14px; border-radius: 12px; background: var(--ed-tile); display: flex; flex-direction: column; }
  /* The two columns of numbers have their own width (the power up to "10 000 W", the energy up to "99,9 kWh"), so a value of a thousand watts or more never runs into the next column. */
  .house-cook { display: grid; grid-template-columns: minmax(0, 1fr) minmax(76px, max-content) minmax(76px, max-content); column-gap: 12px; align-items: baseline; padding: 0; }
  .house-cook-head { font-size: 13px; line-height: 18px; color: var(--ed-secondary); text-align: right; justify-self: end; padding: 6px 0 2px; white-space: nowrap; }
  .house-cook-name { font-size: 15px; line-height: 20px; color: var(--ed-secondary); padding: 9px 0; min-width: 0; }
  .house-cook b { font-size: 15px; line-height: 20px; font-weight: 600; text-align: right; justify-self: end; white-space: nowrap; padding: 9px 0; font-variant-numeric: tabular-nums; }
  .house-line.wrap { flex-wrap: wrap; white-space: normal; }
  .house-line.wrap b { margin-left: auto; text-align: right; }
  .house-line.wrap b span { white-space: nowrap; }
  .house-micro { padding: 8px 0 4px; }
  .house-micro-cap { display: block; padding-bottom: 4px; font-size: 13px; line-height: 18px; color: var(--ed-secondary); }
  .house-micro svg { display: block; width: 100%; height: auto; }
  .house-micro .bat-axis.ticks { margin-top: 2px; font-size: 12px; }
  .house-micro-legend { display: flex; flex-wrap: wrap; gap: 2px 12px; padding-top: 6px; font-size: 13px; color: var(--ed-secondary); }
  .house-micro-legend span { display: inline-flex; align-items: center; gap: 6px; }
  .house-micro-legend i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
  .house-panel { margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--ed-sep); display: flex; flex-direction: column; gap: 2px; }
  .house-panel-head { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; padding-bottom: 6px; font-size: 15px; line-height: 20px; }
  .house-panel-head span { color: var(--ed-secondary); }
  .house-panel-head b { font-size: 17px; font-weight: 700; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .house-panel-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 15px; line-height: 20px; }
  .house-panel-row i { width: 12px; height: 12px; border-radius: 3px; flex: none; }
  .house-panel-row span { flex: 1; min-width: 0; }
  .house-panel-row b { font-weight: 600; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .house-line { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; font-size: 15px; line-height: 20px; white-space: nowrap; }
  .house-line > span { color: var(--ed-secondary); }
  .house-line b { font-weight: 600; }
  .house-hero { display: block; font-size: 34px; line-height: 40px; font-weight: 700; font-variant-numeric: tabular-nums; }
  .house-detail .bat-row .bat-value { font-size: 17px; line-height: 22px; font-weight: 600; }
  .house-icon { --mdc-icon-size: 24px; flex: none; color: var(--ed-secondary); }
  .house-app .house-icon { --mdc-icon-size: 18px; margin-right: 8px; vertical-align: -4px; }
  .house-idle { display: inline-flex; align-items: center; padding: 0 4px; }
  .house-idle svg { width: 22px; height: 22px; fill: var(--ed-text); }
  .pop-row span.ell { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  /* The popups are sheets from the bottom of the kit. One look in every card: the values of Klima, where the sheet comes from
     (surface #1C1C1E / white, secondary text, ✕ circle, grabber, edge and dimming). */
  ed-sheet {
    --hdk-sheet-bg: var(--ed-card);
    --hdk-sheet-text: var(--ed-text);
    --hdk-secondary: var(--ed-secondary);
    --hdk-sheet-button: rgb(118 118 128 / 24%);
    --hdk-sheet-grabber: rgb(255 255 255 / 28%);
    --hdk-sheet-border: rgb(255 255 255 / 10%);
    --hdk-sheet-backdrop: 60%;
  }
  :host([data-light]) ed-sheet {
    --hdk-sheet-button: rgb(118 118 128 / 12%);
    --hdk-sheet-grabber: rgb(60 60 67 / 30%);
    --hdk-sheet-border: rgb(0 0 0 / 8%);
    --hdk-sheet-backdrop: 35%;
  }

  .pop {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .pop-label {
    color: var(--ed-pop-sec);
    font-size: 13px;
    line-height: 18px;
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

  /* „Co se děje s autem“: three blocks, each a grey label and a sentence. */
  .car-info {
    gap: 14px;
  }

  /* The day of the car as a timeline (variant 2): time, a dot on a line, what happened; now is filled, next is dashed. */
  .timeline {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  .ev {
    display: grid;
    grid-template-columns: 44px 14px minmax(0, 1fr);
    gap: 8px;
  }

  .ev time,
  .ev .when {
    color: var(--ed-pop-sec);
    font-size: 13px;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
  }

  .ev .line {
    position: relative;
  }

  .ev .line::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--ed-pop-line);
  }

  .ev:last-child .line::before {
    bottom: auto;
    height: 10px;
  }

  .ev .line::after {
    content: "";
    position: absolute;
    left: 2px;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--ed-pop-sec);
  }

  /* Now: a dot in the colour of the text (blue would read as the grid); next: an open ring on a dashed line. */
  .ev.now .line::after {
    background: var(--ed-text);
  }

  .ev.next .line::after {
    box-sizing: border-box;
    background: transparent;
    border: 1.5px solid var(--ed-pop-sec);
  }

  .ev.now .line::before {
    background: repeating-linear-gradient(var(--ed-pop-line) 0 4px, transparent 4px 7px);
    top: 10px;
  }

  .ev .t {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    padding-bottom: 14px;
    font-size: 15px;
    line-height: 20px;
  }

  .ev .t b {
    font-weight: 600;
  }

  .ev .t > span {
    color: var(--ed-pop-sec);
  }

  .ev .t > .next-text {
    color: var(--ed-text);
  }

  .ev .t .state {
    margin: 0;
    color: var(--ed-text);
    font-weight: 600;
  }

  /* The dot of the timeline marks now; the dot of the state line would be a second one. */
  .ev .t .state .dot {
    display: none;
  }

  .info-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .info-text {
    margin: 0;
    font-size: 15px;
    line-height: 20px;
  }

  .info-text .dim,
  .info-text.dim {
    color: var(--ed-pop-sec);
  }

  .pop.day {
    gap: 6px;
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

  /* The title (ⓘ „Co se děje s autem“) lies above the enlarged hit area of the picture; the rest of the head lets taps through. */
  .car-top .head {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .car-top .head .title-btn {
    pointer-events: auto;
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

  /* „→ 75 % za asi 40 min“: what the user wants to know after the charge (uživatel 16. 11. 2026), one reserved line. */
  .eta {
    color: var(--ed-text);
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
  }

  /* The settings of charging as one row like Cílové teploty, under the mode. */
  .charge-settings {
    margin: 0 -4px;
  }

  .charge-settings .rowbtn {
    padding: 4px;
  }

  /* The sliders line up with the title and the mode (the row is widened by 4 px for its touch area). */
  .charge-fields {
    padding: 0 4px;
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

  /* The row title stays whole; the description takes the rest (one line, two lines without the dot, or flowing text). */
  #mode-l {
    flex: none;
  }

  .mode-sub {
    display: grid;
    justify-items: end;
    min-width: 0;
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
    text-align: right;
  }

  .mode-sub > span {
    grid-area: 1 / 1;
  }

  .mode-sub > .spare {
    visibility: hidden;
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
    container: source / inline-size;
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

  /* Light mode: a darker outline, the white knob would vanish on the light track (uživatel 12. 11. 2026: „Q124 A“; #8E8E93 to white 3,3 : 1). */
  :host([data-light]) .arc .knob {
    stroke: #8e8e93;
    stroke-width: 1.5px;
  }

  /* Off: the temperature the gas boiler keeps is grey (CURRENT_SPEC.md, Zásobník: „v Off šedá“). */
  .arc-num.dim b {
    color: var(--ed-secondary);
  }

  /* „––“ in the grey of no data (DASHBOARD_UX_SYSTEM.md, Text). */
  .arc-num b.nodata {
    color: var(--ed-nodata);
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

  /* On a narrow card (320–360 px) the switch beside the gauge would be under 45 px per option and "Manual" would not fit
     (Q118, 12. 11. 2026): the switch moves under the gauge, across the whole tile. */
  @container source (max-width: 299px) {
    .source-top {
      row-gap: 12px;
    }
    .source-body {
      display: contents;
    }
    .source-body > ed-segmented {
      grid-column: 1 / -1;
    }
  }

  .source-title {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    white-space: nowrap;
  }

  .source-line {
    font-size: 13px;
    line-height: 18px;
  }

  /* Texts joined by a dot: ha-dashboard-kit/joined (joinedStyles, added in ha-energie-dashboard.ts). */
  .nodata {
    color: var(--ed-nodata);
    font-weight: 400;
  }

  .source-line .joined-sep {
    color: var(--ed-secondary);
  }

  .source-line .src {
    color: var(--c);
    font-weight: 500;
  }

  /* Only a source colour is darker in the light mode; the neutral grey stays grey (CURRENT_SPEC.md, Teplá voda: „neohřívá“ šedě). */
  :host([data-light]) .source-line .src.tinted {
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
    /* The value keeps its unbreakable parts ("Přetoky 60 °C", "Boost 55 °C"); a long title wraps instead (Q118). */
    grid-template-columns: auto minmax(min-content, 1fr) auto;
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
  }

  /* On narrow phones the value has one part per line instead of being cut. */
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

  /* Off: grey like the temperature on the gauge (CURRENT_SPEC.md, Zásobník: „v Off šedá“). */
  .rowbtn-value b.off {
    color: var(--ed-secondary);
  }

  /* The water between the two tiles: connectors and the mixing capsule. */
  .link {
    width: 0;
    height: 8px;
    margin: 0 auto;
    /* Off: a grey dotted line (CURRENT_SPEC.md, Teplá voda: Mísení). */
    border-left: 2px dotted #636366;
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

  /* Wallbox: the power and the age of the car data („z auta právě teď“) under it when they do not fit one line (uživatel 12. 11. 2026: „Q132 A“). */
  .row-sub.wrap {
    white-space: normal;
  }

  /* The source colour a little lighter on the tile grey: the blue of the grid has 4.2 : 1 there, this 5 : 1 and more. */
  .row-sub b {
    color: color-mix(in srgb, var(--c, var(--ed-text)) 82%, #fff);
    font-weight: 500;
  }

  :host([data-light]) .row-sub b {
    color: color-mix(in srgb, var(--c, var(--ed-text)) 45%, #000);
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

  .bat-detail > ed-segmented { --hdk-track: var(--ed-track-page); }

  .bat-open {
    border: 0;
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

  .bat-cap .unit { text-transform: none; }

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

  .bat-chart .grid,
  .sun-pairs .grid {
    stroke: var(--ed-bar);
    stroke-width: 1;
  }

  .bat-chart .cursor {
    stroke: var(--ed-text);
    stroke-width: 2;
    opacity: 0.5;
  }

  .bat-ylabel {
    position: absolute;
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 14px;
    pointer-events: none;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .bat-chart input[type="range"] {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    touch-action: pan-y;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
  }

  /* A thin thumb: the browser maps the finger to the value across the width minus the thumb, a wide thumb moves the bar under the finger to its neighbour. */
  .bat-chart input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 2px;
    height: 100%;
    border: 0;
  }

  .bat-chart input[type="range"]::-moz-range-thumb {
    width: 2px;
    height: 100%;
    border: 0;
  }

  .bat-chart:has(input:focus-visible) {
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

  .bat-axis.ticks {
    position: relative;
    height: 18px;
    font-size: 12px;
  }
  .bat-axis.ticks span {
    position: absolute;
    top: 0;
    white-space: nowrap;
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

  /* The ring is the shared one of the kit; the card gives it its colours. */
  ed-ring {
    --hdk-ring-track: var(--sun-track, var(--ed-tile));
    --hdk-ring-fill: var(--ed-sun);
    --hdk-ring-sub: var(--sun-sub, var(--ed-secondary));
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
`, Jn = ["cs", "en", "sv"];
class Es extends Error {
}
function Y(e) {
  throw new Es(e);
}
function Qn(e, t) {
  try {
    return t();
  } catch (a) {
    throw a instanceof Es ? new Error(`${e}: ${a.message}`) : a;
  }
}
function ee(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function xt(e, t) {
  return e == null ? {} : (ee(e) || Y(`"${t}" must be a mapping of keys.`), e);
}
function Gt(e, t, a) {
  for (const s of Object.keys(e))
    t.includes(s) || Y(`${a}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function Qt(e, t, a = {}) {
  if (e == null)
    return;
  const s = typeof e == "string" ? e.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || Y(`${t} must be an entity ID such as ${a.example ?? `${a.domain ?? "sensor"}.example`}.`), a.domain && !s.startsWith(`${a.domain}.`) && Y(`${t} must be a ${a.domain} entity (${a.domain}.…), not ${s}.`), s;
}
function We(e, t) {
  if (e != null) {
    if (typeof e == "string" && e.trim())
      return e.trim();
    if (ee(e) && Object.keys(e).length > 0) {
      const a = Object.entries(e);
      if (a.every(([s, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(s) && typeof n == "string" && n.trim()))
        return Object.fromEntries(a.map(([s, n]) => [s, n.trim()]));
    }
    return Y(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function to(e, t) {
  if (e === void 0 || typeof e == "string")
    return e;
  const a = t.toLowerCase();
  return e[a] ?? e[a.split("-")[0]] ?? e.en ?? Object.values(e)[0];
}
function Za(e) {
  return e === void 0 ? [] : typeof e == "string" ? [e] : Object.values(e);
}
const Ka = ["auto", ...Jn];
function eo(e) {
  const t = e ?? "auto";
  return Ka.includes(t) || Y(`language must be one of ${Ka.join(", ")}.`), t;
}
const Je = {
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
    warning: void 0,
    operation_mode: "select"
  },
  grid: { power: void 0, total_import: void 0, total_export: void 0 },
  house: { power: void 0 },
  car: { state_of_charge: void 0, range: void 0, capacity: void 0, image: "image", last_message: void 0 },
  wallbox: {
    power: void 0,
    status: void 0,
    boost: "switch",
    block_charging: "switch",
    block_by_automation: "input_boolean",
    charging_power: "number",
    mode: "input_select",
    target_auto: "input_number",
    target_boost: "input_number",
    step: void 0,
    priority: "input_boolean",
    shadow: "input_boolean",
    last_end: "input_text",
    solar_start: "number",
    block_solar: "switch",
    window: "switch",
    window_start: "time",
    window_end: "time"
  },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number", block_solar: "switch", window: "switch", window_start: "time", window_end: "time" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch" },
  forecast: { energy_today: void 0, energy_tomorrow: void 0, energy_day_2: void 0, energy_day_3: void 0, energy_day_4: void 0, weather: "weather" },
  daily: { pv_generation: void 0, battery_charge: void 0, battery_discharge: void 0, grid_import: void 0, grid_export: void 0, car: void 0, boiler: void 0 }
}, js = { house: ["label", "default_range", "appliances", "groups"], boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"], forecast: ["default_range"] }, Ue = ["1d", "7d", "30d"], Bs = "1d", ao = "appliances", Ya = ["7d", "30d"], so = "7d", qa = ["always", "heating"], no = "heating", Xa = ["auto", 1, 2], oo = "auto", Os = Object.keys(Je), F = (e, t, a, s, n = !1) => ({ value: e, min: t, max: a, what: s, integer: n }), $a = {
  battery: {
    reserve: F(20, 0, 100, "% battery reserve"),
    full: F(99, 50, 100, "% from which the battery counts as full (the reasons in the state sentences)"),
    capacity: F(11.2, 0.1, 1e3, "kWh usable capacity (time estimates, equivalent cycles, load in C)"),
    imbalance_good: F(15, 0, 1e3, "mV cell imbalance up to which it is called excellent"),
    imbalance_warn: F(30, 0, 1e3, "mV cell imbalance up to which it is called good (above it needs attention)"),
    imbalance_fault: F(100, 0, 1e3, "mV cell imbalance above which it is called a fault")
  },
  car: {
    image_scale: F(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)")
  },
  wallbox: {
    phases: F(3, 1, 3, "number of phases", !0),
    power_min: F(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: F(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: F(300, 1, 1e5, "W, step of the charging power (all phases)"),
    boost_grace: F(120, 0, 3600, "s after Boost is switched on before the car counts as not taking it (the reason „auto nebere“)", !0)
  },
  boiler: {
    target_min: F(20, 0, 100, "°C, lowest target"),
    target_max: F(85, 0, 100, "°C, highest target"),
    target_step: F(5, 1, 50, "°C, target step"),
    hold_minutes: F(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)"),
    hot_margin: F(2, 0, 20, "°C below the target from which the water counts as heated (the reason „nahřáto“)")
  },
  water: {
    gauge_min: F(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: F(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)")
  },
  tank: {
    temp_min: F(38, 0, 100, "°C, lowest temperature"),
    temp_max: F(65, 0, 100, "°C, highest temperature"),
    temp_step: F(1, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: F(15, 0, 1e3, "W, below this a flow (and an appliance) counts as none"),
    kw_from: F(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    export_notice: F(300, 0, 1e5, "W of export that counts as a surplus"),
    source_min_share: F(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: F(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: F(14, 0.5, 50, "px, thickness of a band of 1 kW (a stronger flow is thicker by the square root of its power)"),
    band_min_px: F(1.6, 0.5, 10, "px, thinnest band")
  },
  forecast: {
    good_power: F(2e3, 100, 1e5, "W of sun from which an hour counts as strong (the filled blocks of the five days, the window)"),
    good_day: F(10, 0.1, 1e3, "kWh a day from which a day counts as good (Historie)"),
    learn_days: F(14, 3, 90, "days the curve of what is possible and the typical deviation of the forecast are learned from", !0),
    possible_percentile: F(90, 50, 100, "% percentile of the days that sets what is possible in an hour"),
    typical_deviation: F(20, 1, 100, "% deviation of the forecast assumed until the card has seen enough days"),
    strip_from: F(6, 0, 23, "hour the hourly strips start at", !0),
    strip_to: F(17, 1, 24, "hour the hourly strips end at (the hour itself is the last block)", !0),
    evening_hour: F(22, 12, 23, "hour the evening battery level is estimated for", !0),
    morning_hour: F(6, 0, 11, "hour the night ends at (the battery level in the morning)", !0),
    car_start_soc: F(50, 0, 100, "% battery level from which the wallbox is started in the evening estimate"),
    car_stop_soc: F(30, 0, 100, "% battery level at which the wallbox is stopped in the evening estimate"),
    car_min_sun: F(2e3, 0, 1e5, "W of sun from which the wallbox is started in the evening estimate"),
    efficiency: F(95, 50, 100, "% efficiency of the battery in one direction")
  },
  scale: {
    sun: F(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: F(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: F(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: F(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: F(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: F(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: {
    revert_after: F(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: F(550, 200, 3e3, "ms to hold a protected control to switch it", !0),
    double_tap_ms: F(400, 150, 1e3, "ms between the two taps of a double tap", !0),
    hint_seconds: F(3, 1, 10, "s the hint of a protected control stays")
  }
}, Ne = {
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
}, io = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], la = ["electricity", "car", "water"];
[
  ...Os.flatMap((e) => Object.keys(Je[e]).map((t) => `${e}.${t}`)),
  ...Object.entries($a).flatMap(([e, t]) => Object.keys(t).map((a) => `${e}.${a}`)),
  ...la.map((e) => `titles.${e}`),
  ...Object.keys(Ne).map((e) => `colors.${e}`)
];
function ro(e, t) {
  const a = xt(e[t], t), s = Je[t], n = [...Object.keys($a[t] ?? {}), ...js[t] ?? []];
  Gt(a, [...Object.keys(s), ...n], t);
  const o = {};
  for (const [i, r] of Object.entries(s)) {
    const l = Qt(a[i], `${t}.${i}`, { domain: r });
    l && (o[i] = l);
  }
  return o;
}
function lo(e) {
  const t = {};
  for (const [a, s] of Object.entries($a)) {
    const n = xt(e[a], a), o = Object.keys(Je[a] ?? {});
    Gt(n, [...o, ...Object.keys(s), ...js[a] ?? []], a), t[a] = {};
    for (const [i, r] of Object.entries(s)) {
      const l = n[i], d = `${a}.${i}`;
      if (l == null) {
        t[a][i] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && Y(`${d} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && Y(`${d} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[a][i] = l;
    }
  }
  return t;
}
function co(e) {
  const t = xt(e.colors, "colors");
  Gt(t, [...Object.keys(Ne), "temp_scale"], "colors");
  const a = { ...Ne };
  for (const s of Object.keys(Ne)) {
    const n = t[s];
    n != null && ((typeof n != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.trim())) && Y(`colors.${s} must be a colour like #FFD60A (six hex digits).`), a[s] = n.trim().toUpperCase());
  }
  return a;
}
function ho(e) {
  const t = xt(e.colors, "colors").temp_scale;
  if (t == null)
    return io.map((n) => ({ ...n }));
  const a = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && Y(`${a} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const s = t.map((n, o) => (ee(n) || Y(`${a}[${o}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Gt(n, ["temp", "color"], `${a}[${o}]`), (typeof n.temp != "number" || !Number.isFinite(n.temp)) && Y(`${a}[${o}].temp must be a number (°C).`), (typeof n.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.color.trim())) && Y(`${a}[${o}].color must be a colour like #0A84FF (six hex digits).`), { temp: n.temp, color: n.color.trim().toUpperCase() }));
  return s.forEach((n, o) => {
    o > 0 && n.temp <= s[o - 1].temp && Y(`${a}: temperatures must rise (${s[o - 1].temp} is followed by ${n.temp}).`);
  }), s;
}
function po(e) {
  const t = xt(e.boiler, "boiler").show;
  return t == null ? no : ((typeof t != "string" || !qa.includes(t)) && Y(`boiler.show must be one of ${qa.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function uo(e) {
  const t = xt(e.battery, "battery").default_range;
  return t == null ? Bs : ((typeof t != "string" || !Ue.includes(t)) && Y(`battery.default_range must be one of ${Ue.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function go(e) {
  const t = xt(e.forecast, "forecast").default_range;
  return t == null ? so : ((typeof t != "string" || !Ya.includes(t)) && Y(`forecast.default_range must be one of ${Ya.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function bo(e) {
  const t = xt(e.house, "house").label;
  return t == null ? ao : ((typeof t != "string" || t.trim() === "") && Y("house.label must be a non-empty text (the label of the appliances in Home Assistant)."), t.trim());
}
function fo(e) {
  const t = xt(e.house, "house").default_range;
  return t == null ? Bs : ((typeof t != "string" || !Ue.includes(t)) && Y(`house.default_range must be one of ${Ue.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const mo = "mdi:power-plug";
function vo(e) {
  const t = xt(e.house, "house").appliances;
  return t == null ? [] : (Array.isArray(t) || Y("house.appliances must be a list of {name, icon, power, energy, running, start_energy, warn_after}."), t.map((a, s) => {
    const n = `house.appliances[${s}]`;
    ee(a) || Y(`${n} must be a mapping like {name: Pračka, running: input_boolean.…, start_energy: input_number.…}.`), Gt(a, ["name", "power", "energy", "running", "start_energy", "icon", "warn_after"], n);
    const o = We(a.name, `${n}.name`);
    o === void 0 && Y(`${n}.name must be the name of the device of the appliance.`);
    const i = zs(a.running, `${n}.running`), r = Qt(a.start_energy, `${n}.start_energy`, { domain: "input_number" }), l = Qt(a.power, `${n}.power`, { domain: "sensor" }), d = Qt(a.energy, `${n}.energy`, { domain: "sensor" }), c = Hs(a.icon, `${n}.icon`), h = Ns(a.warn_after, `${n}.warn_after`);
    return { name: o, ...l ? { power: l } : {}, ...d ? { energy: d } : {}, ...i ? { running: i } : {}, ...r ? { start_energy: r } : {}, ...h ? { warn_after: h } : {}, ...c ? { icon: c } : {} };
  }));
}
function zs(e, t) {
  const a = Qt(e, t, { example: "input_boolean.technicka_mistnost_pracka_bezi" });
  return a && !/^(input_boolean|binary_sensor)\./.test(a) && Y(`${t} must be an input_boolean or a binary_sensor entity, not ${a}.`), a;
}
function Ns(e, t) {
  if (e != null)
    return (typeof e != "number" || !Number.isInteger(e) || e < 1 || e > 1440) && Y(`${t} must be a whole number of minutes from 1 to 1440, not ${JSON.stringify(e)}.`), e;
}
function Ja(e, t) {
  return e ?? Y(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
}
function Hs(e, t) {
  if (e != null)
    return (typeof e != "string" || !/^[a-z0-9]+:[a-z0-9-]+$/i.test(e)) && Y(`${t} must be an icon such as mdi:washing-machine.`), e;
}
function yo(e) {
  const t = xt(e.house, "house").groups;
  return t == null ? [] : (Array.isArray(t) || Y("house.groups must be a list of {name, icon, appliances}."), t.map((a, s) => {
    const n = `house.groups[${s}]`;
    ee(a) || Y(`${n} must be a mapping like {name: Vaření, icon: mdi:silverware-fork-knife, appliances: [...]}.`), Gt(a, ["name", "icon", "appliances"], n), (!Array.isArray(a.appliances) || a.appliances.length === 0) && Y(`${n}.appliances must be a list of {name, power, energy, running}.`);
    const o = a.appliances.map((i, r) => {
      const l = `${n}.appliances[${r}]`;
      ee(i) || Y(`${l} must be a mapping like {name: Trouba, power: sensor.…, energy: sensor.…}.`), Gt(i, ["name", "power", "energy", "running", "warn_after"], l);
      const d = Qt(i.power, `${l}.power`, { domain: "sensor" });
      d || Y(`${l}.power must be the power sensor (sensor.…) of the appliance.`);
      const c = Qt(i.energy, `${l}.energy`, { domain: "sensor" }), h = zs(i.running, `${l}.running`), u = Ns(i.warn_after, `${l}.warn_after`);
      return { name: Ja(We(i.name, `${l}.name`), `${l}.name`), power: d, ...c ? { energy: c } : {}, ...h ? { running: h } : {}, ...u ? { warn_after: u } : {} };
    });
    return { name: Ja(We(a.name, `${n}.name`), `${n}.name`), icon: Hs(a.icon, `${n}.icon`) ?? mo, appliances: o };
  }));
}
function wo(e) {
  const t = xt(e.flows, "flows").decimals;
  return t == null ? oo : (Xa.includes(t) || Y(`flows.decimals must be one of ${Xa.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const xo = "/dashboard-bmw";
function $o(e) {
  const t = xt(e.car, "car").link;
  return t == null ? xo : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && Y(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function ko(e) {
  const t = xt(e.titles, "titles");
  Gt(t, [...la], "titles");
  const a = {};
  for (const s of la) {
    const n = We(t[s], `titles.${s}`);
    n !== void 0 && (a[s] = n);
  }
  return a;
}
function _o(e) {
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
  for (const [a, s, n, o, i] of t)
    (i ? a >= s : a > s) && Y(`${n} (${a}) must be ${i ? "below" : "at most"} ${o} (${s}).`);
}
function So(e) {
  return Qn("Energie Dashboard", () => Mo(e));
}
function Mo(e) {
  ee(e) || Y("the configuration must be a mapping of keys.");
  const t = Object.fromEntries(Os.map((n) => [n, ro(e, n)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && Y("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const a = lo(e);
  return _o(a), { language: eo(e.language), entities: t, titles: ko(e), num: a, colors: co(e), tempScale: ho(e), boilerShow: po(e), powerDecimals: wo(e), carLink: $o(e), batteryRange: uo(e), sunRange: go(e), houseLabel: bo(e), houseRange: fo(e), appliances: vo(e), groups: yo(e) };
}
const A = "––", Xt = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, ce = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, Qa = "ha-energie-dashboard:boiler-heating", ts = "ha-energie-dashboard:battery-range", es = "ha-energie-dashboard:sun-range";
function Tt(e, t) {
  const a = e?.attributes?.[t];
  return typeof a == "number" && Number.isFinite(a) ? a : void 0;
}
function To(e) {
  const t = e.reduce((o, i) => o + i, 0);
  if (t <= 0) return e.map(() => 0);
  const a = e.map((o) => o / t * 100), s = a.map(Math.floor);
  let n = 100 - s.reduce((o, i) => o + i, 0);
  return a.map((o, i) => ({ index: i, rest: o - s[i] })).sort((o, i) => i.rest - o.rest).forEach(({ index: o }) => {
    n-- > 0 && s[o]++;
  }), s;
}
const ot = (e, t, a) => Math.max(t, Math.min(a, e)), ka = (e, t) => `color-mix(in srgb, ${e} ${t}%, transparent)`, Ae = (e, t) => `color-mix(in srgb, ${e} ${t}%, var(--ed-tint-base))`, Rs = (e) => Array.from({ length: 10 }, (t, a) => ot((e - a * 10) / 10, 0, 1) * 100), Do = (e) => `calc((100% - 18px) * ${ot(e, 0, 100) / 100} + ${Math.max(0, Math.ceil(ot(e, 0, 100) / 10) - 1) * 2}px)`;
var Co = Object.defineProperty, J = (e, t, a, s) => {
  for (var n = void 0, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (n = i(t, a, n) || n);
  return n && Co(t, a, n), n;
};
class X extends Lt {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._carInfo = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._sunDetail = !1, this._sunTab = "today", this._sunMode = "total", this._houseDetail = !1, this._houseOpen = [], this._houseTab = "now", this._houseData = {}, this._i18n = Ie("cs"), this._fonts = 0, this._onFonts = () => {
      this._fonts++, this.requestUpdate();
    }, this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = So(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(Qa)) || 0);
    } catch {
    }
    this._clock = window.setInterval(() => this._now = Date.now(), 3e4), document.fonts?.addEventListener("loadingdone", this._onFonts);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer?.disconnect(), this._observer = void 0, this._timers.forEach((t) => window.clearTimeout(t)), this._timers.clear(), window.clearInterval(this._clock), document.fonts?.removeEventListener("loadingdone", this._onFonts);
  }
  /** The texts of the card language. */
  /** A text of the configuration (title, name) in the language of the card: the language, its base, English, the first given. */
  pickText(t) {
    return to(t, this._i18n?.language ?? this.lang ?? "en");
  }
  get t() {
    return this._i18n.t;
  }
  get boostOptions() {
    return [{ value: "off", label: this.t.boostOptions.off }, { value: "on", label: this.t.boostOptions.on }];
  }
  willUpdate() {
    this._i18n = Ie(En(this._config?.language ?? "auto", this.hass), this.hass), Vn(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && Q(V(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(Qa, String(this._lastHeating));
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
    }), this._observer.observe(a)), this.fitJoined(), t.has("hass")) {
      const n = Object.entries(this._optimistic).filter(([o, i]) => this.hass?.states?.[o]?.state === i);
      if (n.length) {
        const o = { ...this._optimistic };
        n.forEach(([i]) => delete o[i]), this._optimistic = o;
      }
    }
    t.has("hass") && this._tankTemp && Tt(pt(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const s = this._config;
    if (window.clearTimeout(this._timers.get("hold")), s && s.boilerShow === "heating" && this._lastHeating) {
      const n = this._lastHeating + s.num.boiler.hold_minutes * 6e4 - Date.now();
      n > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), n + 50));
    }
  }
  /** Texts joined by a dot: one line, one part per line or one flowing text (ha-dashboard-kit/joined). */
  fitJoined() {
    _s(this.renderRoot, `${this._width}|${this._fonts}`);
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${Xt[t.main]})`;
  }
  /** The state under a panel title; parts ("Bojler ohřívá ze slunce", "Boost") are joined by a dot (ha-dashboard-kit/joined). */
  stateLine(t, a) {
    return m`<p class="state ${a ? "tinted" : ""}" style="--sc:${a ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t === void 0 ? m`<span>${this.noData()}</span>` : typeof t == "string" ? m`<span>${t}</span>` : Dt(t)}
    </p>`;
  }
  /** „Boost“ in the state line, orange: the one mark that Boost is on (uživatel 12. 11. 2026: „Q137 A“; CURRENT_SPEC.md, Bojler: „oranžový zůstává jen popisek stavu“). */
  boostMark() {
    return m`<span class="boost-mark">${this.t.boostOptions.on}</span>`;
  }
  /** "––" in the grey of no data, read as „bez dat“ (CURRENT_SPEC.md, Chybějící a zastaralá data; DASHBOARD_UX_SYSTEM.md, Text). */
  noData() {
    return m`<span class="nodata">${A}<span class="sr-only">${this.t.noData}</span></span>`;
  }
  carVisible(t, a) {
    return !(a.carLink === "disconnected" && !Q(a.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, a) {
    return t.boilerShow === "always" || a.boil === void 0 || Q(a.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const a = t.entities.daily, s = (r) => Jt(this.hass, r), n = {
      pv: s(a.pv_generation),
      bchg: s(a.battery_charge),
      bdis: s(a.battery_discharge),
      gin: s(a.grid_import),
      gout: s(a.grid_export),
      car: s(a.car) ?? this._houseToday?.car,
      boil: s(a.boiler) ?? this._houseToday?.boil
    }, i = [n.pv, n.gin, n.bdis, n.gout, n.bchg, n.car, n.boil].every((r) => r !== void 0) ? Math.max(0, n.pv + n.gin + n.bdis - n.gout - n.bchg - n.car - n.boil) : void 0;
    return { ...n, house: i };
  }
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const a = V(this.hass, t.entities.battery.depth_of_discharge);
    return a !== void 0 && a >= 0 && a <= 100 ? 100 - a : t.num.battery.reserve;
  }
}
J([
  G()
], X.prototype, "_config");
J([
  z({ attribute: !1 })
], X.prototype, "hass");
J([
  G()
], X.prototype, "_width");
J([
  G()
], X.prototype, "_optimistic");
J([
  G()
], X.prototype, "_feedback");
J([
  G()
], X.prototype, "_open");
J([
  G()
], X.prototype, "_pop");
J([
  G()
], X.prototype, "_all");
J([
  G()
], X.prototype, "_now");
J([
  G()
], X.prototype, "_carHint");
J([
  G()
], X.prototype, "_carInfo");
J([
  G()
], X.prototype, "_carTimeline");
J([
  G()
], X.prototype, "_batDetail");
J([
  G()
], X.prototype, "_batTab");
J([
  G()
], X.prototype, "_batSpan");
J([
  G()
], X.prototype, "_batRange");
J([
  G()
], X.prototype, "_batOpen");
J([
  G()
], X.prototype, "_batScrub");
J([
  G()
], X.prototype, "_batData");
J([
  G()
], X.prototype, "_sunDetail");
J([
  G()
], X.prototype, "_sunTab");
J([
  G()
], X.prototype, "_sunRange");
J([
  G()
], X.prototype, "_sunMode");
J([
  G()
], X.prototype, "_sunHint");
J([
  G()
], X.prototype, "_sunWeather");
J([
  G()
], X.prototype, "_houseDetail");
J([
  G()
], X.prototype, "_houseRange");
J([
  G()
], X.prototype, "_houseOpen");
J([
  G()
], X.prototype, "_houseTab");
J([
  G()
], X.prototype, "_houseData");
J([
  G()
], X.prototype, "_houseToday");
J([
  G()
], X.prototype, "_houseCycles");
J([
  G()
], X.prototype, "_tankTemp");
const Ao = (e) => class extends e {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? it(this.hass, t);
  }
  /** A change on its way (spec kitu, Odezva): chosen here, not yet reported by Home Assistant. The control pulses. */
  isPending(t) {
    return t !== void 0 && this._optimistic[t] !== void 0;
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, a, s, n) {
    const o = this.shown(a);
    return m`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${a.replace(/\W/g, "-")}">${t}</span><span class="hint ${n ? "warn" : ""}">${o === void 0 ? A : s}</span></span>
        <ed-switch
          label=${t} .checked=${o === "on"} .pending=${this.isPending(a)} ?disabled=${o === void 0}
          @hdk-toggle=${(i) => this.setSwitch(a, i.detail.checked, t)}
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
  async call(t, a, s, n, o) {
    if (!this.hass || it(this.hass, n) === void 0)
      return this._feedback = this.t.feedback.noData(o), !1;
    try {
      return await this.hass.callService(t, a, s), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(o), !1;
    }
  }
  /** A switch or an input_boolean (the priority of the car is a helper of the rule Auto): the service of its domain. */
  async setSwitch(t, a, s) {
    this._feedback = "", this.choose(t, a ? "on" : "off");
    const n = t.startsWith("input_boolean.") ? "input_boolean" : "switch";
    await this.call(n, a ? "turn_on" : "turn_off", { entity_id: t }, t, s);
  }
  /** The mode of charging (wallbox.mode, input_select): Home Assistant switches the Boost itself. */
  async setChargeMode(t, a) {
    const s = this._config.entities.wallbox;
    this._feedback = "", a === "Boost" && s.block_charging && it(this.hass, s.block_charging) === "on" && (await this.setSwitch(s.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(t, a), await this.call("input_select", "select_option", { entity_id: t, option: a }, t, this.t.car.modeLabel);
  }
  async setInputNumber(t, a, s) {
    this._feedback = "", this.choose(t, String(a)), await this.call("input_number", "set_value", { entity_id: t, value: a }, t, s);
  }
  async setBoost(t, a) {
    const s = this._config.entities, n = t === "wallbox" ? s.wallbox.boost : s.boiler.boost;
    n && (this._feedback = "", t === "wallbox" && a && s.wallbox.block_charging && it(this.hass, s.wallbox.block_charging) === "on" && (await this.setSwitch(s.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(n, a ? "on" : "off"), await this.call("switch", a ? "turn_on" : "turn_off", { entity_id: n }, n, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, a, s) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: a }, t, s);
  }
  async setTank(t, a) {
    if (this._feedback = "", this.choose(t, a), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: a }, t, this.t.tank.modeLabel) && a === "heat") {
      const { min: s, max: n } = this.tankRange(this._config), o = Tt(pt(this.hass, t), "temperature");
      (o === void 0 || o < s || o > n) && await this.setTemperature(t, ot(o ?? s, s, n));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const a = pt(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, Tt(a, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, Tt(a, "max_temp") ?? t.num.tank.temp_max)
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
    const n = t === "on" ? "off" : "on", o = t === "on" ? "on" : "off";
    this.choose(a, n), this.choose(s, o), (await Promise.all([
      this.call("switch", `turn_${n}`, { entity_id: a }, a, this.t.water.mixing),
      this.call("switch", `turn_${o}`, { entity_id: s }, s, this.t.water.mixing)
    ])).every(Boolean) || (this._feedback = this._feedback || this.t.feedback.mixingNotSent);
  }
}, Ve = ["1d", "7d", "30d"], oe = { "1d": 1, "7d": 7, "30d": 30 }, Z = 310, at = 36e5, Pt = 24 * at, da = (e) => typeof e == "number" && Number.isFinite(e);
async function Wt(e, t, a, s, n, o) {
  return t.length ? await e.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(a).toISOString(),
    end_time: new Date(s).toISOString(),
    statistic_ids: t,
    period: n,
    types: o
  }) ?? {} : {};
}
function Rt(e) {
  const t = new Date(e);
  return t.setHours(0, 0, 0, 0), t.getTime();
}
function Ct(e, t, a, s, n, o = "mean", i = 0) {
  const r = new Array(n).fill(0), l = new Array(n).fill(0), d = new Array(n).fill(void 0), c = (s - a) / n;
  for (const h of e ?? []) {
    const u = h[t];
    if (!da(u) || !da(h.start) || c <= 0) continue;
    const g = Math.floor((h.start - a + i) / c);
    if (g < 0 || g >= n) continue;
    l[g]++, r[g] += u;
    const v = d[g];
    o === "min" ? d[g] = v === void 0 ? u : Math.min(v, u) : o === "max" ? d[g] = v === void 0 ? u : Math.max(v, u) : o === "last" && (d[g] = u);
  }
  return d.map((h, u) => {
    if (l[u])
      return o === "mean" ? r[u] / l[u] : o === "sum" ? r[u] : h;
  });
}
function At(e, t) {
  return (e ?? []).some((a) => da(a[t]));
}
const P = (e) => Math.round(e * 10) / 10;
function he(e, t, a) {
  let s = "", n = !1;
  return e.forEach((o, i) => {
    if (o === void 0) {
      n = !1;
      return;
    }
    s += `${n ? " L" : s ? " M" : "M"}${P(t(i))} ${P(a(o))}`, n = !0;
  }), s;
}
function Ge(e, t, a, s) {
  let n = "", o = -1;
  const i = (r) => {
    if (!(o < 0)) {
      n += `${n ? " " : ""}M${P(t(o))} ${P(s)}`;
      for (let l = o; l <= r; l++) n += ` L${P(t(l))} ${P(a(e[l]))}`;
      n += ` L${P(t(r))} ${P(s)} Z`, o = -1;
    }
  };
  return e.forEach((r, l) => {
    r === void 0 ? i(l - 1) : o < 0 && (o = l);
  }), i(e.length - 1), n;
}
function Ps(e, t, a, s) {
  let n = "", o = -1;
  const i = (l) => e[l] !== void 0 && t[l] !== void 0, r = (l) => {
    if (!(o < 0)) {
      n += `${n ? " " : ""}M${P(a(o))} ${P(s(t[o]))}`;
      for (let d = o + 1; d <= l; d++) n += ` L${P(a(d))} ${P(s(t[d]))}`;
      for (let d = l; d >= o; d--) n += ` L${P(a(d))} ${P(s(e[d]))}`;
      n += " Z", o = -1;
    }
  };
  for (let l = 0; l < e.length; l++)
    i(l) ? o < 0 && (o = l) : r(l - 1);
  return r(e.length - 1), n;
}
function me(e) {
  if (!(e > 0)) return 1;
  const a = 10 ** Math.floor(Math.log10(e)), s = e / a;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 3 ? 3 : s <= 5 ? 5 : 10) * a;
}
function Lo(e, t) {
  const a = e.filter((r) => r !== void 0);
  if (!a.length) return;
  let s = Math.min(...a), n = Math.max(...a);
  const o = Math.max(n - s, t), i = (n + s) / 2;
  return s = i - o / 2 - o * 0.1, n = i + o / 2 + o * 0.1, { lo: s, hi: n };
}
function as(e, t, a) {
  if (!(a > 0) || !(e > 0) || !(t > 0)) return;
  const s = e / 100 * t / (a / 1e3), n = Math.round(s * 60 / 5) * 5;
  return n >= 5 && n < 2880 ? n : void 0;
}
function pe(e) {
  const t = Math.floor(e / 60), a = e % 60;
  return t === 0 ? `${a} min` : a === 0 ? `${t} h` : `${t} h ${a} min`;
}
const Vt = 56, He = 6e4, Yt = 60 * He, Bt = 24 * Yt, ss = [10 * He, 15 * He, 30 * He, Yt, 2 * Yt, 3 * Yt, 4 * Yt, 6 * Yt, 12 * Yt, Bt, 2 * Bt, 3 * Bt, 5 * Bt, 7 * Bt], ns = 6, os = 10, Is = 8;
function Eo(e) {
  let t = ss[0], a = 1 / 0;
  for (const s of ss) {
    const n = e / s, i = (n < ns ? ns - n : n > os ? n - os : 0) * 100 + Math.abs(n - Is) - s / 1e12;
    i < a && (a = i, t = s);
  }
  return t;
}
function is(e) {
  const t = new Date(e);
  return t.setHours(0, 0, 0, 0), t;
}
function jo(e, t, a) {
  const s = [];
  if (a < Bt) {
    const i = is(e).getTime();
    for (let r = i + Math.ceil((e - i) / a) * a; r <= t; r += a) r >= e && s.push(r);
    return s;
  }
  const n = Math.round(a / Bt), o = is(t);
  for (let i = 0; ; i++) {
    const r = new Date(o);
    if (r.setDate(o.getDate() - i * n), r.getTime() < e) break;
    s.push(r.getTime());
  }
  return s.reverse();
}
function _a(e) {
  const { start: t, end: a } = e, s = e.x0 ?? 0, n = e.x1 ?? Z, o = e.x ?? ((c) => s + (c - t) / (a - t) * (n - s)), i = Eo(a - t), r = (c) => i < Bt ? st(c).replace(/^(\d{1,2}):00$/, "$1") : i === Bt && a - t <= 8 * Bt ? Gn(c) : Ds(c), l = jo(t, a, i).map((c) => {
    const h = Math.round(o(c) * 10) / 10;
    if (e.slot) {
      const u = Math.round(o(c + e.slot / 2) * 10) / 10, g = r(c), v = g.length * 3.3;
      return { x: h, text: u - v < s || u + v > n ? "" : g, labelX: u };
    }
    return { x: h, text: h < s + 6 || h > n - 6 ? "" : r(c) };
  });
  return Math.max(0, ...l.map((c) => c.text.length)) > 5 && l.length - 1 > 7 ? l.map((c, h) => h % 2 === 1 ? c : { ...c, text: "" }) : l;
}
function Fs(e) {
  if (!e || e.length < 2) return Z / Is;
  const t = e.slice(1).map((a, s) => a.x - e[s].x).sort((a, s) => a - s);
  return t[Math.floor(t.length / 2)];
}
const Bo = [1, 2, 4, 5], Oo = [1, 2, 3, 4, 5, 6, 8, 10];
function zo(e) {
  if (!(e > 0)) return !1;
  const t = e / 10 ** Math.floor(Math.log10(e) + 1e-9);
  return [1, 2, 2.5, 5].some((a) => Math.abs(t - a) < 1e-6 * a);
}
function No(e, t, a, s) {
  const n = [...e].sort((r, l) => r.y - l.y), o = [...n], i = [];
  return n.slice(1).forEach((r, l) => {
    const d = n[l].y, c = (r.y - d) / t, h = s ? Oo.filter((g) => g === 1 || zo(Math.abs(s(r.y) - s(d)) / g)) : Bo, u = h.reduce((g, v) => Math.abs(v - c) < Math.abs(g - c) ? v : g, h[0] ?? 1);
    for (let g = 1; g < u; g++) {
      const v = Math.round((d + (r.y - d) * g / u) * 10) / 10;
      o.push({ y: v });
      const y = a?.(v);
      y && i.push({ y: v, text: y });
    }
  }), { grid: o.sort((r, l) => r.y - l.y), labels: i };
}
function Ws(e, t) {
  const a = e / Math.max(1, t), s = 10 ** Math.floor(Math.log10(a));
  return [1, 2, 2.5, 5, 10].map((n) => n * s).find((n) => n >= a * 0.8) ?? a;
}
const Ho = 5 * 6e4, xe = 48, rs = 60, Ro = 0, Po = (e) => class extends e {
  // ----------------------------------------------------------------- state and history
  /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
  batRange(t) {
    if (this._batRange) return this._batRange;
    try {
      const a = localStorage.getItem(ts);
      if (a && Ve.includes(a)) return a;
    } catch {
    }
    return t.batteryRange;
  }
  setBatRange(t) {
    this._batRange = t, this._batScrub = {};
    try {
      localStorage.setItem(ts, t);
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
    const n = t.entities.battery, o = (...d) => d.filter((c) => !!c), [i, r] = a.split(":");
    if (i === "day") {
      const d = s - (r === "6h" ? 6 : 24) * at;
      return [{ part: "level", ids: o(n.power, n.state_of_charge), start: d, end: s, period: "5minute", types: ["mean"] }];
    }
    const l = r;
    if (i === "hist") {
      const d = this.histWindow(l, s);
      return [
        { part: "energy", ids: o(n.total_charge, n.total_discharge), start: d.start, end: s, period: l === "1d" ? "hour" : "day", types: ["change"] },
        { part: "level", ids: o(n.state_of_charge, n.power), start: d.start, end: s, period: "hour", types: ["mean", "min", "max"] }
      ];
    }
    return [
      {
        part: "health",
        ids: o(n.min_cell_voltage, n.max_cell_voltage, n.min_cell_temperature, n.max_cell_temperature, n.temperature, n.total_discharge, n.total_charge),
        start: s - oe[l] * Pt,
        end: s,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, a) {
    if (t === "1d")
      return { start: Math.floor(a / at) * at - 23 * at, bins: 24 };
    const s = new Date(a);
    return s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (oe[t] - 1)), { start: s.getTime(), bins: oe[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const a of this.batNeeds(t)) {
        const s = this._batData[a];
        s && (s.status === "loading" || Date.now() - s.at < Ho) || this.fetchBattery(t, a, s);
      }
  }
  async fetchBattery(t, a, s) {
    const n = this.hass;
    if (!n) return;
    const o = Date.now();
    this._batData = { ...this._batData, [a]: { status: "loading", at: o, parts: s?.parts ?? {} } };
    try {
      const i = this.batRequests(t, a, o), r = {};
      await Promise.all(i.map(async (l) => r[l.part] = await Wt(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [a]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [a]: { status: "error", at: o, parts: {} } };
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
    return Q(t.batIn, s) ? "charging" : Q(t.batDis, s) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, a, s) {
    const n = this.t, o = this.batteryReserve(a), i = Array.from({ length: 10 }, (l, d) => {
      const c = (d + 1) * 10 <= o + 1e-3, h = t === void 0 ? 0 : ot((t - d * 10) / 10, 0, 1) * 100, u = d === 0 ? "8px 0 0 8px" : d === 9 ? "0 8px 8px 0" : "0", g = c ? "var(--ed-warning)" : "var(--ed-battery)";
      return m`<span class="pill" style="height:${s}px;border-radius:${u};background:${c ? ka("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${h.toFixed(1)}%;background:${g}"></i></span>`;
    }), r = t === void 0 ? n.noData : n.bat.levelLabel(W(t), W(o));
    return m`<div class="bat-gauge" role="img" aria-label=${r}>${i}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, a) {
    const s = t.soc, n = this.batState(t, a);
    if (s === void 0) return;
    const o = a.num.battery.capacity;
    if (n === "charging") {
      const i = as(100 - s, o, t.batIn ?? 0);
      return i === void 0 ? void 0 : this.t.bat.fullIn(pe(i));
    }
    if (n === "discharging") {
      const i = as(s - this.batteryReserve(a), o, t.batDis ?? 0);
      return i === void 0 ? void 0 : this.t.bat.lastsFor(pe(i));
    }
  }
  /** Signed power in kW, charging positive (the raw entity is the other way round). */
  batSigned(t) {
    if (!(t.batIn === void 0 && t.batDis === void 0))
      return ((t.batIn ?? 0) - (t.batDis ?? 0)) / 1e3;
  }
  // ----------------------------------------------------------------- popup
  renderBatteryPopup(t, a, s, n) {
    const o = this.t, i = a.num.flows.idle_threshold, r = t.key === "bat", l = s.soc, d = l !== void 0 && l <= this.batteryReserve(a), c = r ? s.batDis : s.batIn, u = Q(c, i) ? r ? o.pop.discharging(rt(c, n)) : o.pop.charging(rt(c, n)) : s.batDis === void 0 && s.batIn === void 0 && l === void 0 ? A : r ? o.idle.bat : o.idle.batIn, g = this.today(a), v = r ? g.bdis : g.bchg, y = this.batEstimate(s, a);
    return m`<ed-sheet open .heading=${t.name} .sub=${u} .closeLabel=${o.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop">
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${o.pop.level}${d ? m`<span class="note"> ${o.pop.atReserve}</span>` : _}</span>
            <span class="pop-big" style="color:${d ? "var(--ed-warning)" : "var(--ed-text)"}">${l === void 0 ? A : W(l)}</span>
          </div>
          ${this.renderGauge(l, a, 12)}
        </div>
        ${y ? m`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${y}</p>` : _}
        <div class="pop-rows"><div class="pop-row"><span>${r ? o.pop.rows.discharged : o.pop.rows.charged}</span><b>${v === void 0 ? A : `${nt(v)} kWh`}</b></div></div>
        <button type="button" class="bat-open" @click=${() => this.openBatteryDetail()}><span>${o.bat.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- charts
  /** Back in time as a short text: "teď", "−45 min", "−3 h 20 min", "−5 d". */
  back(t) {
    const a = Math.round(t);
    return a <= 0 ? this.t.bat.now : a < 60 ? `−${a} min` : a < 1440 ? `−${Math.floor(a / 60)} h${a % 60 ? ` ${a % 60} min` : ""}` : `−${Math.round(a / 1440)} d`;
  }
  /** One chart with its readout, finger scrubbing (a slider with no look of its own), the vertical axis and the fade on the left. */
  renderChart(t) {
    const a = this.t, s = this._batScrub[t.id] ?? t.start ?? 100, n = !!t.whole && this._batScrub[t.id] === void 0, o = t.fade ?? Ro, i = (p) => {
      const f = p / 100 * Z;
      let x = 0;
      for (let $ = 1; $ < t.n; $++) Math.abs(t.x($) - f) < Math.abs(t.x(x) - f) && (x = $);
      return x;
    }, r = i(s), l = () => {
      const p = { ...this._batScrub };
      delete p[t.id], this._batScrub = p;
    }, d = (p) => {
      if (p.key === "Enter" && t.whole && !n) {
        p.preventDefault(), l();
        return;
      }
      const f = p.key === "ArrowRight" || p.key === "ArrowUp" ? 1 : p.key === "ArrowLeft" || p.key === "ArrowDown" ? -1 : 0;
      if (!f) return;
      p.preventDefault();
      const x = n ? r : ot(r + f, 0, t.n - 1);
      this._batScrub = { ...this._batScrub, [t.id]: t.x(x) / Z * 100 };
    }, c = t.x(r), h = t.dot?.(r), u = n && t.wholeText ? t.wholeText : t.read(r), g = (p) => `${(p / t.h * 100).toFixed(2)}%`, v = t.ticks ?? (t.time ? _a(t.time) : void 0), y = No(t.grid, Fs(v), t.valueAt, t.valueNum), b = [...t.labels, ...y.labels.filter((p) => t.labels.every((f) => Math.abs(f.y - p.y) > 13))];
    return m`${t.panel ? _ : m`<div class="bat-read">${It(u)}</div>`}
        <div class="bat-chart" style="aspect-ratio:${Z + Vt} / ${t.h}">
          <svg viewBox="0 0 ${Z + Vt} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${o} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${Z} height=${t.h}><rect width=${Z} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${y.grid.map((p) => K`<line x1="0" y1=${p.y} x2=${Z} y2=${p.y} class=${p.strong ? "axis" : "grid"}></line>`)}
            ${(v ?? []).map((p) => K`<line x1=${p.x} y1="0" x2=${p.x} y2=${t.h} class="grid"></line>`)}
            <g mask=${o > 0 ? `url(#bm-${t.id})` : _}>${t.body}</g>
            ${n ? _ : K`<line x1=${c} y1="0" x2=${c} y2=${t.h} class="cursor"></line>`}
            ${h && !n ? K`<circle cx=${c} cy=${h.y} r="6" style="fill:var(--ed-text)"></circle>` : _}
          </svg>
          ${b.map((p) => m`<span class="bat-ylabel" style="top:calc(${g(p.y)} - 7px);left:calc(${(Z / (Z + Vt) * 100).toFixed(2)}% + 8px)">${p.text}</span>`)}
          <input type="range" style="width:${(Z / (Z + Vt) * 100).toFixed(2)}%" min="0" max="100" step="1" .value=${String(s)} aria-label=${a.bat.scrubLabel} aria-valuetext=${u}
            @pointerdown=${() => {
      this._scrubTap = { id: t.id, index: n ? void 0 : r, moved: !1 };
    }}
            @pointercancel=${() => {
      this._scrubTap = void 0;
    }}
            @pointerup=${() => {
      const p = this._scrubTap;
      this._scrubTap = void 0, t.whole && p && p.id === t.id && !p.moved && p.index !== void 0 && l();
    }}
            @input=${(p) => {
      const f = Number(p.target.value);
      this._scrubTap?.id === t.id && this._scrubTap.index !== i(f) && (this._scrubTap.moved = !0), this._batScrub = { ...this._batScrub, [t.id]: f };
    }} @keydown=${d} />
        </div>
        ${v ? m`<div class="bat-axis ticks">${v.map((p) => m`<span style="left:${((p.labelX ?? p.x) / (Z + Vt) * 100).toFixed(2)}%;transform:translateX(${p.labelX === void 0 && p.x < 8 ? "0" : p.labelX === void 0 && p.x > Z - 8 ? "-100%" : "-50%"})">${p.text}</span>`)}</div>` : m`<div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>`}
        ${t.panel ? n ? t.whole() : t.panel(r) : t.legend ?? _}`;
  }
  renderChartOrEmpty(t, a, s) {
    if (s) return this.renderChart(s);
    const n = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return m`<div class="bat-nodata" style="aspect-ratio:${Z} / ${a}">${n ? A : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const a = t.entities.battery, s = `day:${this._batSpan}`, n = this._batData[s];
    if (!n) return;
    const o = this._batSpan === "6h" ? 6 : 24, i = n.at, r = i - o * at, l = Ct(this.batRows(s, "level", a.state_of_charge), "mean", r, i, xe), d = Ct(this.batRows(s, "level", a.power), "mean", r, i, xe).map((T) => T === void 0 ? void 0 : -T / 1e3);
    if (!l.some((T) => T !== void 0) && !d.some((T) => T !== void 0)) return;
    const c = V(this.hass, a.state_of_charge), h = V(this.hass, a.power);
    c !== void 0 && (l[xe - 1] = c), h !== void 0 && (d[xe - 1] = -h / 1e3);
    const u = xe, g = (T) => P(T / (u - 1) * Z), v = (T) => P(98 - ot(T, 0, 100) / 100 * 90), y = me(Math.max(1, ...d.map((T) => Math.abs(T ?? 0)))), b = 172, p = (T) => P(b - ot(T, -y, y) / y * 44), f = 4.2, x = d.map((T, S) => {
      if (T === void 0) return _;
      const C = Math.min(b, p(T)), j = Math.max(1.5, Math.abs(p(T) - b));
      return K`<rect x=${P(g(S) - f / 2)} y=${T >= 0 ? C : b} width=${f} height=${P(j)} rx="1.5" style="fill:${T >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), $ = he(l, g, v), w = Ge(l, g, v, 98), E = (T) => `${q(T, T % 1 === 0 ? 0 : 1)} kW`;
    return {
      id: "level",
      h: 224,
      n: u,
      x: g,
      grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: !0 }, { y: b - 44 }, { y: b, strong: !0 }, { y: b + 44 }],
      time: { start: r, end: i },
      labels: [
        { y: 8, text: W(100) },
        { y: 53, text: W(50) },
        { y: 98, text: W(0) },
        { y: b - 44, text: `+${E(y)}` },
        { y: b, text: "0" },
        { y: b + 44, text: `−${E(y)}` }
      ],
      body: K`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${w} fill="url(#bl-area)"></path>
          <path d=${$} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${x}`,
      dot: (T) => l[T] === void 0 ? void 0 : { y: v(l[T]), color: "var(--ed-text)" },
      read: (T) => {
        const S = d[T], C = S === void 0 ? A : Math.abs(S) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${S > 0 ? this.t.bat.charging : this.t.bat.discharging} ${rt(Math.abs(S) * 1e3, "kW")}`;
        return `${this.back((1 - T / (u - 1)) * o * 60)} · ${l[T] === void 0 ? A : W(l[T])} · ${C}`;
      },
      from: `−${o} h`,
      to: this.t.bat.now,
      legend: m`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`
    };
  }
  /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
  energyChart(t, a) {
    const s = t.entities.battery, n = `hist:${a}`, o = this._batData[n];
    if (!o) return;
    const i = this.histWindow(a, o.at), r = a === "1d", l = i.bins, d = r ? at : Pt, c = i.start + l * d, h = r ? 0 : 6 * at, u = this.batRows(n, "energy", s.total_charge), g = this.batRows(n, "energy", s.total_discharge), v = Ct(u, "change", i.start, c, l, "sum", h), y = Ct(g, "change", i.start, c, l, "sum", h);
    if (!v.some((k) => k !== void 0) && !y.some((k) => k !== void 0)) return;
    const b = v.map((k) => k ?? 0), p = y.map((k) => k ?? 0), f = me(Math.max(0.5, ...b, ...p)), x = r ? 3 : l <= 7 ? 10 : 2, $ = (Z - (l - 1) * x) / l, w = (k) => P(k * ($ + x) + $ / 2), E = 100, T = (k) => ot(k, 0, f) / f * 92, S = b.flatMap((k, O) => {
      const tt = p[O], R = O === l - 1 ? 1 : 0.85;
      return [
        K`<rect x=${P(O * ($ + x))} y=${P(E - Math.max(k > 0 ? 1 : 0, T(k)))} width=${P($)} height=${P(Math.max(k > 0 ? 1 : 0, T(k)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${R}"></rect>`,
        K`<rect x=${P(O * ($ + x))} y=${E} width=${P($)} height=${P(Math.max(tt > 0 ? 1 : 0, T(tt)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${R}"></rect>`
      ];
    }), C = (k) => P(E - ot(k, -f, f) / f * 92), j = b.map((k, O) => k - p[O]), M = r ? 2 : 1, L = (k) => `${k >= 0 ? "+" : "−"}${q(Math.abs(k), M)}`, B = (k) => r ? st(i.start + k * at) : _e(i.start + k * Pt);
    return {
      charged: b,
      discharged: p,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: w,
        grid: [{ y: E, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${q(f, f % 1 === 0 ? 0 : 1)}` }, { y: E, text: "0" }, { y: 192, text: `−${q(f, f % 1 === 0 ? 0 : 1)}` }],
        time: { start: i.start, end: c, slot: d },
        valueNum: (k) => (E - k) / 92 * f,
        valueAt: (k) => {
          const O = (E - k) / 92 * f;
          return Math.abs(O) < 1e-9 ? void 0 : `${O > 0 ? "+" : "−"}${q(Math.abs(O), Math.abs(O) % 1 === 0 ? 0 : Math.abs(O * 10) % 1 < 1e-6 ? 1 : 2)}`;
        },
        body: K`${S}<path d=${he(j, w, C)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (k) => ({ y: C(j[k]), color: "var(--ed-text)" }),
        read: (k) => `${B(k)} · ${L(b[k])} / ${L(-p[k])} · ${this.t.bat.net} ${L(j[k])} kWh`,
        from: r ? "−24 h" : _e(i.start),
        to: this.t.bat.today,
        legend: m`<div class="bat-legend wrap"><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charged.toLowerCase()}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharged.toLowerCase()}</span><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.net}</span></div>`
      }
    };
  }
  /**
   * The balance of the cells: one line, the difference between the highest and the lowest cell in mV, from zero,
   * over a green zone of the excellent range; above the "attention" limit the line turns orange. The absolute
   * voltages are in the readout under the finger (CURRENT_SPEC.md, Zdraví).
   */
  balanceChart(t, a) {
    const s = t.entities.battery, n = `health:${a}`, o = this._batData[n];
    if (!o) return;
    const i = oe[a], r = o.at, l = r - i * Pt, d = rs, c = (M) => Ct(this.batRows(n, "health", M), "mean", l, r, d), h = c(s.min_cell_voltage), u = c(s.max_cell_voltage), g = h.map((M, L) => M === void 0 || u[L] === void 0 ? void 0 : Math.max(0, (u[L] - M) * 1e3)), v = g.filter((M) => M !== void 0);
    if (!v.length) return;
    const { imbalance_good: y, imbalance_warn: b } = t.num.battery, p = Math.max(y > 0 ? y * 1.5 : 10, Math.max(...v) * 1.2), f = (M) => P(130 - ot(M, 0, p) / p * 120), x = (M) => P(M / (d - 1) * Z), $ = (M) => this.back((1 - M / (d - 1)) * i * 24 * 60), w = this.t.bat.health, E = "var(--ed-battery)", T = "var(--ed-warning)", S = (M) => M > b ? T : E, C = `bg-${a}`, j = ot(1 - (130 - f(b)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: d,
      x,
      time: { start: l, end: r },
      grid: [{ y: 10 }, { y: f(y) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${N(p)} mV` }, { y: f(y), text: `${N(y)} mV` }, { y: 130, text: "0" }],
      body: K`<defs>
            <linearGradient id=${C} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${j} stop-color="#FF9230"></stop><stop offset=${j} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${C}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${f(y)} width=${Z} height=${P(130 - f(y))} style="fill:${E};fill-opacity:0.12"></rect>
          <path d=${Ge(g, x, f, 130)} fill="url(#${C}-area)"></path>
          <path d=${he(g, x, f)} fill="none" stroke="url(#${C})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (M) => g[M] === void 0 ? void 0 : { y: f(g[M]), color: S(g[M]) },
      read: (M) => g[M] === void 0 ? `${$(M)} · ${A}` : `${$(M)} · ${w.difference} ${N(g[M])} mV · ${w.min} ${q(h[M], 3)} V · ${w.max} ${q(u[M], 3)} V`,
      from: i === 1 ? "−24 h" : `−${i} d`,
      to: this.t.bat.today,
      legend: m`<div class="bat-legend"><span><i class="swatch" style="background:${E};opacity:0.35"></i>${w.excellentZone(`${N(y)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, a, s) {
    if (t === "gap") return this.balanceChart(a, s);
    const n = a.entities.battery, o = `health:${s}`, i = this._batData[o];
    if (!i) return;
    const r = oe[s], l = i.at, d = l - r * Pt, c = rs, h = (j) => this.batRows(o, "health", j), u = (j) => Ct(h(j), "mean", d, l, c), g = (j) => P(j / (c - 1) * Z), v = (j) => this.back((1 - j / (c - 1)) * r * 24 * 60), y = r === 1 ? "−24 h" : `−${r} d`;
    let b;
    if (t === "temp") {
      const j = u(n.min_cell_temperature), M = u(n.max_cell_temperature), L = u(n.temperature);
      b = {
        low: j,
        high: M,
        line: L,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (B) => `${N(B)} °C`,
        mid: (B) => `${N(B)} °C`,
        read: (B) => {
          const k = [j[B] === void 0 ? void 0 : `${this.t.bat.health.min} ${q(j[B], 1)}`, L[B] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${q(L[B], 1)}`, M[B] === void 0 ? void 0 : `${this.t.bat.health.max} ${q(M[B], 1)}`].filter(Boolean);
          return `${v(B)} · ${k.length ? `${k.join(" · ")} °C` : A}`;
        },
        legend: m`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const j = Ct(h(n.total_discharge), "state", d, l, c, "last").map((M) => M === void 0 ? void 0 : M / a.num.battery.capacity);
      b = {
        low: j,
        high: j,
        line: j,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (M) => N(M, 1),
        mid: (M) => N(M, 1),
        read: (M) => `${v(M)} · ${j[M] === void 0 ? A : this.t.bat.health.cycles(q(j[M], 1))}`
      };
    }
    const p = Lo([...b.low, ...b.high], b.minSpan);
    if (!p) return;
    const f = Ws(p.hi - p.lo, 4), x = Math.floor(p.lo / f + 1e-9) * f;
    let $ = Math.ceil(p.hi / f - 1e-9) * f;
    Math.round(($ - x) / f) % 2 === 1 && ($ += f);
    const w = { lo: x, hi: $ }, E = (j) => P(130 - (ot(j, w.lo, w.hi) - w.lo) / (w.hi - w.lo) * 120), T = t === "life" ? "" : Ps(b.low, b.high, g, E), S = b.line ? he(b.line, g, E) : "", C = b.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: c,
      x: g,
      time: { start: d, end: l },
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: b.text(w.hi) }, { y: 70, text: b.mid((w.hi + w.lo) / 2) }, { y: 130, text: b.text(w.lo) }],
      body: K`<path d=${T} style="fill:${C};fill-opacity:0.22"></path><path d=${S} fill="none" style="stroke:${C}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (j) => b.line?.[j] === void 0 ? void 0 : { y: E(b.line[j]), color: C },
      read: b.read,
      from: y,
      to: this.t.bat.today,
      legend: b.legend
    };
  }
  // ----------------------------------------------------------------- the detail
  /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
  renderBatteryDetail(t, a) {
    const s = this.t, n = ["now", "hist", "health"].map((o) => ({ value: o, label: s.bat.tabs[o] }));
    return m`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${s.bat.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeBatteryDetail(!1)}>‹ ${s.bat.back}</button>
          <h2>${s.bat.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeBatteryDetail(!0)}>${s.bat.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._batTab} label=${s.bat.tabsLabel} @hdk-select=${(o) => {
      this._batTab = o.detail.value;
    }}></ed-segmented>
        ${this._batTab === "now" ? this.renderBatteryNow(t, a) : this._batTab === "hist" ? this.renderBatteryHistory(t, a) : this.renderBatteryHealth(t, a)}
      </section>`;
  }
  renderRange(t) {
    const a = this.t, s = Ve.map((n) => ({ value: n, label: a.bat.ranges[n] }));
    return m`<ed-segmented .options=${s} .value=${this.batRange(t)} label=${a.bat.rangeLabel} @hdk-select=${(n) => this.setBatRange(n.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, a) {
    const s = this.t, n = t.entities.battery, o = a.soc, i = this.batState(a, t), r = this.batSigned(a), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, d = "kW", c = V(this.hass, n.current), h = V(this.hass, n.voltage), u = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, g = i === "idle", v = i === "charging" ? s.pop.charging(rt(a.batIn ?? 0, d)) : i === "discharging" ? s.pop.discharging(rt(a.batDis ?? 0, d)) : i === "idle" ? s.bat.status.idle.toLowerCase() : s.noData, y = this.batEstimate(a, t), b = this.today(t), p = [
      { label: s.bat.live.power, value: l === void 0 ? A : g ? "0 kW" : rt(l, d), sub: i === void 0 ? "" : s.bat.status[i] },
      { label: s.bat.live.current, value: c === void 0 ? A : `${q(Math.abs(c), 1)} A`, sub: c === void 0 || g || i === void 0 ? "" : i === "charging" ? s.bat.live.chargeCurrent : s.bat.live.dischargeCurrent },
      { label: s.bat.live.voltage, value: h === void 0 ? A : `${q(h, 1)} V`, sub: s.bat.live.ofBattery },
      { label: s.bat.live.load, value: u === void 0 ? A : `${q(u, 2)} C`, sub: s.bat.live.loadSub }
    ], f = b.bchg, x = b.bdis, $ = f !== void 0 && x !== void 0 ? f - x : void 0, w = ["6h", "24h"].map((E) => ({ value: E, label: s.bat.spans[E] }));
    return m`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${s.bat.level}</span><span class="bat-sub">${v}</span></div><span class="bat-huge">${o === void 0 ? A : W(o)}</span></div>
          ${this.renderGauge(o, t, 32)}
          ${y ? m`<p class="bat-estimate plain">${y}</p>` : _}
        </div>
        <div class="bat-kpis">${p.map((E) => m`<div class="bat-kpi"><span class="sub">${E.label}</span><span class="val">${E.value}</span><span class="sub">${E.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.levelChart}</span>
          <ed-segmented .options=${w} .value=${this._batSpan} label=${s.bat.spanLabel} @hdk-select=${(E) => {
      this._batSpan = E.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${s.bat.charged}</span><span class="val">${f === void 0 ? A : `${nt(f)} kWh`}</span></div><div><span class="sub">${s.bat.discharged}</span><span class="val">${x === void 0 ? A : `${nt(x)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${f !== void 0 && x !== void 0 && f + x > 0 ? m`${f > 0 ? m`<i style="flex:${f.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : _}${x > 0 ? m`<i style="flex:${x.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : _}` : _}</div>
          <p class="bat-sub">${$ === void 0 ? A : s.bat.netStored(`${$ >= 0 ? "+" : "−"}${nt(Math.abs($))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, a) {
    const s = this.t, n = t.entities.battery, o = this.batRange(t), i = `hist:${o}`, r = this.energyChart(t, o), l = r ? r.charged.reduce((S, C) => S + C, 0) : void 0, d = r ? r.discharged.reduce((S, C) => S + C, 0) : void 0, c = s.bat.kpi.over(o === "1d" ? "24 h" : s.bat.ranges[o].toLowerCase()), h = this._batData[i], u = oe[o], g = this.batRows(i, "level", n.state_of_charge), v = this.batRows(i, "level", n.power), y = At(g, "min") ? Math.min(...(g ?? []).map((S) => S.min).filter((S) => typeof S == "number")) : void 0, b = At(v, "max") || At(v, "min") ? Math.max(...(v ?? []).flatMap((S) => [S.max, S.min]).filter((S) => typeof S == "number").map((S) => Math.abs(S))) : void 0, p = `${q(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, f = A, x = [
      { label: s.bat.charged, value: l === void 0 ? f : `${q(l, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: s.bat.discharged, value: d === void 0 ? f : `${q(d, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: s.bat.kpi.efficiency, value: l && d !== void 0 ? W(q(d / l * 100, 1)) : f, sub: s.bat.kpi.efficiencySub },
      { label: s.bat.kpi.cycles, value: d === void 0 ? f : q(d / t.num.battery.capacity, 1), sub: s.bat.kpi.cyclesSub(p) },
      { label: s.bat.kpi.lowest, value: y === void 0 ? f : W(y), sub: s.bat.kpi.lowestSub },
      { label: s.bat.kpi.peak, value: b === void 0 ? f : rt(b, "kW"), sub: s.bat.kpi.peakSub }
    ], w = Ct(g, "mean", this.histWindow(o, h?.at ?? Date.now()).start, h?.at ?? Date.now(), Math.max(1, u * 24)).filter((S) => S !== void 0), E = [0, 20, 40, 60, 80, 100], T = E.slice(0, 5).map((S, C) => w.length ? Math.round(w.filter((j) => C === 4 ? j >= S : j >= S && j < E[C + 1]).length / w.length * 100) : void 0);
    return m`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${Dt([o === "1d" ? s.bat.energyHours : s.bat.energyDays, m`<span class="unit">kWh</span>`])}</span>${this.renderChartOrEmpty(i, 200, r?.chart)}</div>
        <div class="bat-kpis">${x.map((S) => m`<div class="bat-kpi"><span class="sub">${S.label}</span><span class="val">${S.value}</span><span class="sub">${S.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.bandsTitle}</span>
          ${T.map((S, C) => m`<div class="bat-band"><span class="name">${E[C]}–${E[C + 1]} %</span><span class="track"><i style="width:${S ?? 0}%;background:${C === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${S === void 0 ? A : W(S)}</span></div>`)}
          <p class="bat-sub">${s.bat.bandsNote}</p>
        </div>`;
  }
  /** Text of an error or a warning entity: "" = none, undefined = no data. */
  batProblem(t) {
    const a = pt(this.hass, t)?.state;
    if (!(a === void 0 || a === "unavailable" || a === "unknown"))
      return a === "" || a === "0" ? "" : a;
  }
  renderBatteryHealth(t, a) {
    const s = this.t, n = t.entities.battery, o = s.bat.health, i = this.batRange(t), r = (L) => V(this.hass, L), l = r(n.state_of_health), d = r(n.min_cell_voltage), c = r(n.max_cell_voltage), h = r(n.min_cell_temperature), u = r(n.max_cell_temperature), g = this.batProblem(n.error), v = this.batProblem(n.warning), y = Jt(this.hass, n.total_charge), b = Jt(this.hass, n.total_discharge), p = t.num.battery, f = d !== void 0 && c !== void 0 ? (c - d) * 1e3 : void 0, x = f === void 0 ? void 0 : f <= p.imbalance_good ? "good" : f <= p.imbalance_warn ? "ok" : f <= p.imbalance_fault ? "warn" : "fault", $ = x === "warn" || x === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", T = [l, d, c, h, u, a.soc].every((L) => L === void 0) && g === void 0 && v === void 0 ? { title: o.noData, sub: o.noDataSub, tone: "off", icon: "M5 12h14" } : g || v ? { title: g ? o.error(g) : o.warning(v), sub: o.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: o.ok, sub: o.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, S = b === void 0 ? void 0 : b / p.capacity, C = [
      { key: "soh", label: o.capacity, value: l === void 0 ? A : W(l), sub: l === void 0 ? s.noData : o.capacitySub(`${q(p.capacity * l / 100, 1)} kWh`, `${q(p.capacity, p.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: o.balance, value: f === void 0 ? A : `${N(f)} mV`, word: x ? o.words[x] : void 0, sub: o.balanceSub, details: [] },
      {
        key: "temp",
        label: o.temperature,
        value: u === void 0 ? A : `${N(u)} °C`,
        sub: u !== void 0 && h !== void 0 ? o.temperatureSub(`${N(u - h)} °C`) : s.noData,
        details: [
          [o.battery, n.temperature],
          [o.inverterAir, n.inverter_temperature_air],
          [o.inverterRadiator, n.inverter_temperature_radiator]
        ].filter(([, L]) => L).map(([L, B]) => ({ label: L, value: r(B) === void 0 ? A : `${q(r(B), 1)} °C` }))
      },
      {
        key: "life",
        label: o.life,
        value: S === void 0 ? A : o.cycles(N(S)),
        sub: y && b !== void 0 ? o.lifeSub(W(q(b / y * 100, 1))) : s.noData,
        details: [
          { label: o.totalCharged, value: y === void 0 ? A : `${N(y)} kWh` },
          { label: o.totalDischarged, value: b === void 0 ? A : `${N(b)} kWh` }
        ]
      }
    ], j = (L) => L ? Io(this.hass, L) : void 0, M = [];
    if (n.mode && M.push({ label: o.mode, value: j(n.mode) ?? A }), n.charge_limit && M.push({ label: o.chargeLimit, value: r(n.charge_limit) === void 0 ? A : `${N(r(n.charge_limit))} A` }), n.discharge_limit && M.push({ label: o.dischargeLimit, value: r(n.discharge_limit) === void 0 ? A : `${N(r(n.discharge_limit))} A` }), n.error || n.warning) {
      const L = [g, v].filter(Boolean).join(", ");
      M.push({ label: o.errors, value: g === void 0 && v === void 0 ? A : L || o.none, warn: !!L });
    }
    return m`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${T.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${T.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${T.tone}">${T.title}</span><span class="bat-sub">${T.sub}</span></div>
        </div>
        ${C.map((L) => {
      const B = L.key !== "soh" && this._batOpen === L.key, k = B ? this.healthChart(L.key, t, i) : void 0;
      return m`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${L.key === "soh"} aria-expanded=${L.key === "soh" ? _ : B ? "true" : "false"}
              @click=${() => {
        L.key !== "soh" && (this._batOpen = B ? void 0 : L.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${L.label}</span><span class="bat-sub">${L.sub}</span></span>
              <span class="bat-value">${L.value}</span>${L.word ? m`<span class="bat-word" style="color:${$}">${L.word}</span>` : _}
              ${L.key === "soh" ? _ : m`<svg class="chev ${B ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${B ? m`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${i}`, 140, k)}
                  ${L.details.length ? m`<div class="bat-list">${L.details.map((O) => m`<div class="bat-line"><span>${O.label}</span><b>${O.value}</b></div>`)}</div>` : _}
                </div>` : _}
          </div>`;
    })}
        ${M.length ? m`<div class="bat-card flush"><span class="bat-cap pad">${o.diagnostics}</span><div class="bat-list pad">${M.map((L) => m`<div class="bat-line"><span>${L.label}</span><b style="color:${L.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${L.value}</b></div>`)}</div></div>` : _}`;
  }
};
function Io(e, t) {
  const a = pt(e, t)?.state;
  return a === void 0 || a === "" || a === "unavailable" || a === "unknown" ? void 0 : a;
}
const ls = (e) => typeof e == "number" && Number.isFinite(e);
function ea(e, t) {
  const a = /* @__PURE__ */ new Map();
  for (const s of e ?? []) {
    const n = s[t];
    if (!ls(n) || !ls(s.start)) continue;
    const o = new Date(s.start), i = Rt(s.start), r = a.get(i) ?? new Array(24).fill(void 0);
    r[o.getHours()] = Math.max(0, t === "mean" ? n / 1e3 : n), a.set(i, r);
  }
  return a;
}
function Ze(e, t = 1) {
  if (!e) return;
  const a = e.filter((s) => s !== void 0);
  return a.length >= t ? a.reduce((s, n) => s + n, 0) : void 0;
}
function Ke(e, t) {
  if (!e.length) return;
  const a = [...e].sort((i, r) => i - r), s = Math.min(100, Math.max(0, t)) / 100 * (a.length - 1), n = Math.floor(s), o = Math.ceil(s);
  return a[n] + (a[o] - a[n]) * (s - n);
}
const ds = (e) => Ke(e, 50);
function Us(e, t) {
  const a = [], s = new Date(e);
  for (let n = 0; n < t; n++)
    s.setDate(s.getDate() - 1), a.push(s.getTime());
  return a;
}
function Et(e, t) {
  const a = new Date(e);
  return a.setDate(a.getDate() + t), a.setHours(0, 0, 0, 0), a.getTime();
}
function Fo(e, t, a, s) {
  const n = Us(t, a).filter((r) => e.has(r)), o = Array.from({ length: 24 }, (r, l) => {
    const d = n.map((c) => e.get(c)[l]).filter((c) => c !== void 0);
    return d.length >= 3 ? Ke(d, s) : void 0;
  }), i = n.map((r) => Ze(e.get(r), 20)).filter((r) => r !== void 0);
  return { curve: o, daily: i.length >= 3 ? Ke(i, s) : void 0, days: n.length };
}
function Wo(e) {
  const t = e.reduce((a, s) => a + (s ?? 0), 0);
  return t > 0 ? e.map((a) => (a ?? 0) / t) : void 0;
}
function Uo(e, t) {
  const a = Wo(t);
  return a ? a.map((s) => s * e) : void 0;
}
function Vo(e, t, a, s) {
  const n = new Date(s), o = n.getHours(), i = 1 - (n.getMinutes() * 60 + n.getSeconds()) / 3600, r = a.map((d, c) => c < o ? 0 : c === o ? (d ?? 0) * i : d ?? 0), l = r.reduce((d, c) => d + c, 0);
  return Array.from({ length: 24 }, (d, c) => c < o ? e?.[c] : l > 0 ? r[c] / l * Math.max(0, t) : void 0);
}
function cs(e, t) {
  const a = new Date(t), s = a.getHours(), n = 1 - (a.getMinutes() * 60 + a.getSeconds()) / 3600;
  return e.reduce((o, i, r) => o + (r < s ? 0 : r === s ? (i ?? 0) * n : i ?? 0), 0);
}
function Go(e, t, a, s, n, o) {
  if (e === void 0) return;
  const i = new Date(s), r = i.getHours() + i.getMinutes() / 60, l = a.reduce((p, f, x) => p + (f ?? 0) * Math.min(1, Math.max(0, r - x)), 0), d = a.reduce((p, f) => p + (f ?? 0), 0);
  let c, h = "forecast";
  if (t !== void 0) {
    const p = cs(a, s);
    let f = Math.min(Math.max(t - e, 0), p);
    o && o.possible >= 0.3 && (f = Math.min(f, p * Math.min(1, Math.max(0, o.actual / o.possible)))), c = e + f;
  } else if (d > 0 && l >= 0.5) {
    const p = d - l;
    c = e + p * Math.min(2, e / l), h = "pace";
  }
  if (c === void 0) return;
  const u = c > 0 ? Math.min(1, e / c) : 1, g = Math.min(0.6, n * (1 + (1 - u))), v = Math.max(0, c - e), y = d > 0 ? cs(a, s) : 1 / 0;
  let b = u < 0.35 ? "low" : u < 0.7 ? "medium" : "high";
  return n > 0.3 && b !== "low" && (b = b === "high" ? "medium" : "low"), { value: c, low: e + v * (1 - g), high: e + Math.min(v * (1 + g), y), done: u, certainty: b, source: h };
}
function Zo(e) {
  const t = e.filter((a) => a.actual > 0.5);
  if (!(t.length < 3))
    return t.reduce((a, s) => a + Math.abs(s.forecast - s.actual) / s.actual, 0) / t.length;
}
function Ko(e, t, a, s) {
  let n = -1, o = -1;
  for (let i = t; i <= a; i++)
    (e[i] ?? 0) >= s && (n < 0 && (n = i), o = i);
  return n < 0 ? void 0 : [n, o + 1];
}
const hs = [9, 11, 13, 15];
function Yo(e) {
  const t = hs.findIndex((a) => e < a);
  return t < 0 ? hs.length : t;
}
function qo(e) {
  if (!e || !e.some((a) => a !== void 0)) return;
  const t = [0, 0, 0, 0, 0];
  return e.forEach((a, s) => {
    a !== void 0 && (t[Yo(s)] += a);
  }), t;
}
function Le(e, t, a) {
  const s = new Date(e), n = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), 12), o = Math.round(n / 864e5 + 24405875e-1 - 2451545), i = Math.PI / 180, r = o - a / 360, l = (357.5291 + 0.98560028 * r) % 360, d = 1.9148 * Math.sin(l * i) + 0.02 * Math.sin(2 * l * i) + 3e-4 * Math.sin(3 * l * i), c = (l + d + 180 + 102.9372) % 360, h = 2451545 + r + 53e-4 * Math.sin(l * i) - 69e-4 * Math.sin(2 * c * i), u = Math.sin(c * i) * Math.sin(23.4397 * i), g = Math.cos(Math.asin(u)), v = (Math.sin(-0.833 * i) - Math.sin(t * i) * u) / (Math.cos(t * i) * g);
  if (v < -1 || v > 1) return;
  const y = Math.acos(v) / i, b = (p) => (p - 24405875e-1) * 864e5;
  return { rise: b(h - y / 360), set: b(h + y / 360) };
}
function Xo(e) {
  const { capacity: t, efficiency: a } = e;
  let s = e.soc / 100 * t;
  const n = e.reserve / 100 * t, o = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let i = Math.ceil(e.now / (at / 4)) * (at / 4);
  const r = Rt(e.now), l = r + e.eveningHour * at, d = Et(r, 1) + e.morningHour * at;
  let c = !1, h = s >= t - 0.01;
  for (; i <= d; i += at / 4) {
    !o.socAtEvening && i >= l && e.now < l && (o.socAtEvening = s / t * 100);
    const u = new Date(i - 1).getHours(), g = i - 1 < Et(r, 1), v = g ? (e.sun[u] ?? 0) / 4 : 0, y = (e.house[u] ?? 0) / 4;
    i <= l && (o.sunUntilEvening += v, o.houseUntilEvening += y);
    const b = s / t * 100;
    let p = 0;
    e.car && g && (c && b <= e.car.stopSoc ? c = !1 : !c && b >= e.car.startSoc && v * 4 * 1e3 >= e.car.minSun && (c = !0), p = c ? e.car.watts / 1e3 / 4 : 0);
    const f = y + p, x = Math.min(v, f), $ = v - x, w = f - x;
    if (p > 0 && (o.carTotal += p, o.carSun += Math.min(p, Math.max(0, v - y))), $ > 0)
      s = Math.min(t, s + $ * a);
    else if (w > 0) {
      const E = Math.max(0, s - n) * a, T = Math.min(w, E);
      s -= T / a;
    }
    !h && s >= t - 0.01 && o.fullAt === void 0 && i < l && (o.fullAt = i), s >= t - 0.01 && (h = !0), i >= d && (o.socAtMorning = s / t * 100);
  }
  return o;
}
function Jo(e, t, a = 8) {
  const s = t.length;
  if (s === 0) return [];
  if (s === 1) return [[e[0], t[0]]];
  const n = Array.from({ length: s - 1 }, (r, l) => (t[l + 1] - t[l]) / (e[l + 1] - e[l])), o = [n[0], ...Array.from({ length: s - 2 }, (r, l) => n[l] * n[l + 1] <= 0 ? 0 : 2 * n[l] * n[l + 1] / (n[l] + n[l + 1])), n[s - 2]], i = [];
  for (let r = 0; r < s - 1; r++) {
    const l = e[r + 1] - e[r];
    for (let d = 0; d < a; d++) {
      const c = d / a, h = 2 * c ** 3 - 3 * c ** 2 + 1, u = c ** 3 - 2 * c ** 2 + c, g = -2 * c ** 3 + 3 * c ** 2, v = c ** 3 - c ** 2;
      i.push([e[r] + c * l, h * t[r] + u * l * o[r] + g * t[r + 1] + v * l * o[r + 1]]);
    }
  }
  return i.push([e[s - 1], t[s - 1]]), i;
}
function Qo(e, t, a, s) {
  const n = Us(t, a).map((o) => Ze(e.get(o), 20)).filter((o) => o !== void 0);
  return n.length >= 3 ? Ke(n, s) : void 0;
}
const ti = 5 * 6e4, ei = 30 * 6e4, $e = 12, ie = 2, ps = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)"
], us = ["7d", "30d"], aa = { "7d": 7, "30d": 30 }, ai = (e) => class extends e {
  constructor() {
    super(...arguments), this._sunWeatherBusy = !1;
  }
  // ----------------------------------------------------------------- state and history
  sunRange(t) {
    if (this._sunRange) return this._sunRange;
    try {
      const a = localStorage.getItem(es);
      if (a && us.includes(a)) return a;
    } catch {
    }
    return t.sunRange;
  }
  setSunRange(t) {
    this._sunRange = t, this._batScrub = {};
    try {
      localStorage.setItem(es, t);
    } catch {
    }
  }
  /** The views of the history the open parts need: the popup and the detail both show the day. */
  sunNeeds() {
    return this._sunDetail || this._pop === "sun" ? ["sun:hist", "sun:five"] : [];
  }
  sunRequests(t, a, s) {
    const n = t.entities, o = (...l) => l.filter((d) => !!d), i = Rt(s);
    if (a === "sun:five")
      return [{ part: "power", ids: o(n.pv.power), start: Et(i, -10), end: s, period: "5minute", types: ["mean"] }];
    const r = Et(i, -(Math.max(30, t.num.forecast.learn_days) + t.num.forecast.learn_days + 1));
    return [
      { part: "energy", ids: o(n.pv.total_generation), start: r, end: s, period: "hour", types: ["change"] },
      { part: "power", ids: o(n.pv.power), start: r, end: s, period: "hour", types: ["mean", "max"] },
      { part: "house", ids: o(n.house.power), start: Et(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] },
      { part: "forecast", ids: o(n.forecast.energy_today), start: Et(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] }
    ];
  }
  loadSun() {
    const t = this._config;
    if (!(!t || !this.hass)) {
      for (const a of this.sunNeeds()) {
        const s = this._batData[a];
        s && (s.status === "loading" || Date.now() - s.at < ti) || this.fetchSun(t, a, s);
      }
      this._sunDetail && this._sunTab === "outlook" && this.loadWeather(t);
    }
  }
  async fetchSun(t, a, s) {
    const n = this.hass;
    if (!n) return;
    const o = Date.now();
    this._batData = { ...this._batData, [a]: { status: "loading", at: o, parts: s?.parts ?? {} } };
    try {
      const i = this.sunRequests(t, a, o), r = {};
      await Promise.all(i.map(async (l) => r[l.part] = await Wt(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [a]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [a]: { status: "error", at: o, parts: {} } };
    }
  }
  /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
  async loadWeather(t) {
    const a = t.entities.forecast.weather, s = this.hass;
    if (!a || !s || this._sunWeatherBusy || this._sunWeather && Date.now() - this._sunWeather.at < ei) return;
    this._sunWeatherBusy = !0;
    const n = Date.now();
    try {
      const i = (await s.callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type: "daily" },
        target: { entity_id: a },
        return_response: !0
      }))?.response?.[a]?.forecast ?? [];
      this._sunWeather = { at: n, days: i.filter((r) => r.datetime).map((r) => ({ day: Rt(Date.parse(r.datetime)), condition: r.condition })) };
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
    const a = Date.now(), s = Rt(a), n = t.num.forecast, o = this._batData["sun:hist"], i = this._batData["sun:five"], r = t.entities;
    let l = /* @__PURE__ */ new Map(), d = new Array(24).fill(void 0), c = [];
    if (o && Object.keys(o.parts).length) {
      if (this._sunCache?.entry !== o) {
        const R = r.pv.total_generation ? o.parts.energy?.[r.pv.total_generation] : void 0;
        let D = ea(R, "change");
        D.size || (D = ea(r.pv.power ? o.parts.power?.[r.pv.power] : void 0, "mean"));
        const U = ea(r.house.power ? o.parts.house?.[r.house.power] : void 0, "mean"), ft = Array.from({ length: 24 }, (dt, Ht) => {
          const se = [...U.entries()].filter(([Zt]) => Zt < s).map(([, Zt]) => Zt[Ht]).filter((Zt) => Zt !== void 0);
          return se.length >= 3 ? ds(se) : void 0;
        }), mt = ((r.forecast.energy_today ? o.parts.forecast?.[r.forecast.energy_today] : void 0) ?? []).filter((dt) => typeof dt.mean == "number" && new Date(dt.start).getHours() === 8).map((dt) => ({ day: Rt(dt.start), forecast: dt.mean, actual: Ze(D.get(Rt(dt.start)), 20) })).filter((dt) => dt.actual !== void 0 && dt.day < s);
        this._sunCache = { entry: o, days: D, houseCurve: ft, pairs: mt };
      }
      l = this._sunCache.days, d = this._sunCache.houseCurve, c = this._sunCache.pairs;
    }
    const h = Fo(l, s, n.learn_days, n.possible_percentile), u = r.pv.power ? i?.parts.power?.[r.pv.power] : void 0;
    let g = l.get(s);
    if (u?.length) {
      const R = new Array(24).fill(void 0);
      for (const D of u) {
        if (D.start < s || typeof D.mean != "number") continue;
        const U = new Date(D.start).getHours();
        R[U] = (R[U] ?? 0) + Math.max(0, D.mean) / 1e3 / $e;
      }
      g = R;
    }
    const y = Jt(this.hass, t.entities.daily.pv_generation) ?? (g && g.some((R) => R !== void 0) ? g.reduce((R, D) => R + (D ?? 0), 0) : void 0), b = Jt(this.hass, r.forecast.energy_today), p = new Date(a), f = p.getHours() + p.getMinutes() / 60, x = h.curve.some((R) => R !== void 0) ? h.curve.reduce((R, D, U) => R + (D ?? 0) * ot(f - U, 0, 1), 0) : void 0, $ = Zo(c) ?? n.typical_deviation / 100;
    let w;
    if (u?.length) {
      let R = 0, D = 0;
      for (const U of u)
        U.start < a - at || U.start >= a || typeof U.mean != "number" || (R += Math.max(0, U.mean) / 1e3 / $e, D += (h.curve[new Date(U.start).getHours()] ?? 0) / $e);
      w = { actual: R, possible: D };
    }
    const E = Go(y, b, h.curve, a, $, w), T = E ? Math.max(0, E.value - (y ?? 0)) : 0, S = Vo(g, E ? T : 0, h.curve, a);
    if (!E) for (let R = new Date(a).getHours(); R < 24; R++) S[R] = void 0;
    const C = this.place(), j = C ? Le(s, C.latitude, C.longitude) : void 0, M = t.num.flows.idle_threshold, L = (u ?? []).filter((R) => R.start >= s && typeof R.mean == "number"), B = L.filter((R) => R.mean >= M), k = B.length ? B[0].start : void 0, O = L.reduce((R, D) => !R || D.mean > R.mean ? D : R, void 0);
    let tt;
    if (j) {
      const R = [];
      for (const St of [...new Set((u ?? []).map((mt) => Rt(mt.start)))].filter((mt) => mt < s)) {
        const mt = (u ?? []).filter((Ht) => Rt(Ht.start) === St && Ht.mean >= M).pop(), dt = C ? Le(St, C.latitude, C.longitude) : void 0;
        mt && dt && R.push(dt.set - (mt.start + 5 * 6e4));
      }
      const D = R.length >= 3 ? ds(R) : 0, U = B.length ? B[B.length - 1].start + 5 * 6e4 : void 0;
      tt = a > j.set && (U === void 0 || a - U > 15 * 6e4) && U !== void 0 ? { at: U, over: !0 } : { at: j.set - D, over: !1 };
    }
    return {
      now: a,
      today: s,
      ready: !!o && o.status !== "loading" || !!o?.parts && Object.keys(o.parts).length > 0,
      days: l,
      learned: h,
      done: y,
      possibleSoFar: x,
      forecastToday: b,
      deviation: $,
      pairs: c,
      estimate: E,
      hours: S,
      rise: j?.rise,
      set: j?.set,
      started: k,
      ends: tt,
      fiveRows: u,
      peak: O ? { kw: O.mean / 1e3, at: O.start } : void 0,
      houseCurve: d
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
    return m`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${s ? "true" : "false"} @click=${() => {
      this._sunHint = s ? void 0 : t;
    }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${s ? m`<div class="sun-note" role="note" @click=${() => {
      this._sunHint = void 0;
    }}>${a}</div>` : _}`;
  }
  /** A ring with the number centred in it and the unit under the number: the shared ring of the kit (`<ed-ring>`). */
  ring(t, a, s, n, o, i) {
    return m`<ed-ring fraction=${t} size=${a} stroke=${s} num=${n} unit=${o} label=${i}></ed-ring>`;
  }
  /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
  renderSoFar(t) {
    const a = this.t.sun, s = t.estimate, n = s && t.done !== void 0 && s.value > 0 ? Math.min(100, Math.round(t.done / s.value * 100)) : void 0, o = t.done !== void 0 && t.possibleSoFar !== void 0 && t.possibleSoFar >= 0.3 ? Math.round(t.done / t.possibleSoFar * 100) : void 0;
    return m`<div class="sun-sofar">
        <div class="text"><span class="sub">${a.soFar}</span><span class="val">${t.done === void 0 ? A : `${nt(t.done)} kWh`}</span><span class="sub">${s ? a.ofEstimate(nt(s.value)) : A}</span>${o === void 0 ? _ : m`<span class="sub">${a.ofPossibleSoFar(W(o))}</span>`}</div>
        ${n === void 0 ? _ : this.ring(n / 100, 40, 6, String(n), "", a.ringLabel(W(n)))}
      </div>`;
  }
  /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
  renderSunFlow(t, a, s) {
    const n = this.t, o = a.num.flows.idle_threshold, i = fe.map((l) => ({ sink: l, watts: t.flows.filter((d) => d.from === "sun" && d.to === l).reduce((d, c) => d + c.watts, 0) })).filter((l) => Q(l.watts, o));
    if (!i.length) return m`<p class="bat-sub">${t.sun === void 0 ? A : n.sun.flowNone}</p>`;
    const r = "kW";
    return m`<div class="mix-bar sun-bar ${s ? "large" : ""}" role="img" aria-label=${i.map((l) => `${n.tile[l.sink]} ${rt(l.watts, r)}`).join(", ")}>${i.map((l) => m`<div style="flex:${l.watts.toFixed(0)} 1 0;background:var(${ce[l.sink]})"></div>`)}</div>
        ${s ? m`<div class="sun-legend" role="group" aria-label=${n.sun.flowTitle}>${i.map((l) => m`<span><span class="name"><i style="background:var(${ce[l.sink]})"></i>${n.tile[l.sink]}</span><b>${rt(l.watts, r)}</b></span>`)}</div>` : _}`;
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
    const a = t.entities.forecast.weather, s = this.weatherGroup(a ? pt(this.hass, a)?.state : void 0);
    return s ? this.t.sun.weather[s] : void 0;
  }
  // ----------------------------------------------------------------- popup
  renderSunPopup(t, a, s, n) {
    const o = this.t, i = this.sunView(a), r = Q(s.sun, a.num.flows.idle_threshold), l = this.weatherNow(a), d = r ? l ? o.sun.producingWith(l) : o.sun.producing : s.sun === void 0 ? A : o.idle.sun;
    return m`<ed-sheet open .heading=${t.name} .sub=${d} .closeLabel=${o.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop sun-pop">
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${o.sun.powerNow}</span><span class="pop-big">${s.sun === void 0 ? A : rt(s.sun, n === "W" && s.sun >= a.num.flows.kw_from ? "kW" : n)}</span></div>
          ${r ? this.renderSunFlow(s, a, !1) : _}
        </div>
        ${this.renderSoFar(i)}
        <div class="pop-rows">
          <div class="pop-row"><span>${o.sun.started}</span><b>${i.started === void 0 ? A : st(i.started)}</b></div>
          <div class="pop-row"><span>${i.ends?.over ? o.sun.ended : o.sun.ends}</span><b>${i.ends === void 0 ? A : st(i.ends.at)}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openSunDetail()}><span>${o.sun.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- the detail
  renderSunDetail(t, a) {
    const s = this.t, n = ["today", "hist", "outlook"].map((i) => ({ value: i, label: s.sun.tabs[i] })), o = this.sunView(t);
    return m`<section class="bat-detail sun-detail" role="dialog" aria-modal="true" aria-label=${s.sun.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeSunDetail()}>‹ ${s.sun.back}</button>
          <h2>${s.sun.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeSunDetail()}>${s.sun.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._sunTab} label=${s.sun.tabsLabel} @hdk-select=${(i) => {
      this._sunTab = i.detail.value, this._sunHint = void 0, this._batScrub = {};
    }}></ed-segmented>
        ${this._sunTab === "today" ? this.renderSunToday(t, a, o) : this._sunTab === "hist" ? this.renderSunHistory(t, o) : this.renderSunOutlook(t, o)}
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
    if (!t.entities.pv.power || !a.fiveRows?.some((D) => D.start >= a.today)) return;
    const n = this.t.sun, o = a.rise !== void 0 ? ot(Math.floor(this.hourOf(a.rise) - 0.5), 0, 22) : 6, i = a.set !== void 0 ? ot(Math.ceil(this.hourOf(a.set) + 0.5), o + 2, 24) : 18, r = (i - o) * $e, l = a.today + o * at, d = a.today + i * at, c = (D) => P(ie + D / (r - 1) * (Z - ie)), h = Ct(a.fiveRows, "mean", l, d, r).map((D) => D === void 0 ? void 0 : D / 1e3), u = (D) => o + (D + 0.5) / $e, g = Math.floor((a.now - l) / (d - l) * r), v = V(this.hass, t.entities.pv.power);
    v !== void 0 && h.some((D) => D !== void 0) && g >= 0 && g < r && (h[g] = Math.max(0, v) / 1e3);
    const y = (D, U) => {
      const ft = U - 0.5, St = Math.floor(ft), mt = D[St], dt = D[St + 1];
      if (mt === void 0 && dt === void 0) return;
      const Ht = ft - St;
      return (mt ?? 0) * (1 - Ht) + (dt ?? 0) * Ht;
    }, b = a.learned.curve.some((D) => D !== void 0), p = Array.from({ length: r }, (D, U) => b ? y(a.learned.curve, u(U)) : void 0), f = a.estimate, x = f ? Math.max(0, f.value - (a.done ?? 0)) : 0, $ = f && x > 0 ? (f.low - (a.done ?? 0)) / x : 1, w = f && x > 0 ? (f.high - (a.done ?? 0)) / x : 1, E = (D) => D >= g, T = Array.from({ length: r }, (D, U) => f && E(U) ? y(a.hours.map((ft, St) => St >= new Date(a.now).getHours() ? ft : void 0), u(U)) : void 0), S = T.map((D) => D === void 0 ? void 0 : D * $), C = T.map((D, U) => D === void 0 ? void 0 : Math.min(D * w, Math.max(D, p[U] ?? 1 / 0))), j = Math.max(1, ...h.map((D) => D ?? 0), ...p.map((D) => D ?? 0), ...C.map((D) => D ?? 0)), M = { start: l, end: d, x0: ie, x1: Z }, L = 150, B = Ws(j, Math.round((L - 12) / Fs(_a(M)))), k = Math.ceil(j / B) * B, O = (D) => P(L - ot(D, 0, k) / k * (L - 12)), tt = (D) => rt(D * 1e3, "kW"), R = Array.from({ length: Math.round(k / B) }, (D, U) => (U + 1) * B);
    return {
      id: "sun-today",
      h: 170,
      n: r,
      x: c,
      fade: 0,
      start: ot(g / (r - 1) * 100, 0, 100),
      grid: [{ y: L, strong: !0 }, ...R.map((D) => ({ y: O(D) }))],
      labels: [...R.map((D) => ({ y: O(D), text: N(D, D % 1 ? 1 : 0) })), { y: L, text: "0" }],
      body: K`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${Ps(S, C, c, O)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${he(p, c, O)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${Ge(h, c, O, L)} fill="url(#sun-area)"></path>
          <path d=${he(h, c, O)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (D) => h[D] === void 0 ? void 0 : { y: O(h[D]), color: "var(--ed-sun)" },
      read: (D) => {
        const U = st(l + (D + 0.5) * ((d - l) / r)), ft = [h[D] !== void 0 ? tt(h[D]) : T[D] !== void 0 ? `${n.chartLegend.forecast.toLowerCase()} ≈ ${tt(T[D])}` : A];
        return p[D] !== void 0 && ft.push(`${n.possibleShort} ${tt(p[D])}`), `${U} · ${ft.join(" · ")}`;
      },
      time: M,
      from: st(l),
      to: st(d),
      legend: m`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-sun)"></i>${n.chartLegend.production}</span><span><i class="dots" aria-hidden="true"></i>${n.chartLegend.possible}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.3"></i>${n.chartLegend.forecast}</span></div>`
    };
  }
  /** The kWh the sun gave today to the house, the car, the boiler, the battery and the grid (an estimate from the totals of the day). */
  whereToday(t) {
    const a = this.today(t);
    if (a.pv === void 0 || a.bchg === void 0 || a.gout === void 0 || a.gin === void 0 || a.bdis === void 0) return;
    const s = Math.max(0, a.pv + a.gin + a.bdis - a.gout - a.bchg), n = Math.max(0, a.pv - a.bchg - a.gout), o = a.car ?? 0, i = a.boil ?? 0, r = Math.max(0, s - o - i), l = s > 0 ? Math.min(1, n / s) : 0;
    return [
      { key: "house", kwh: r * l },
      { key: "car", kwh: o * l },
      { key: "boil", kwh: i * l },
      { key: "batIn", kwh: a.bchg },
      { key: "gridOut", kwh: a.gout }
    ].filter((d) => d.kwh > 5e-3);
  }
  renderSunToday(t, a, s) {
    const n = this.t, o = "kW", i = this.todayChart(t, s), r = this.whereToday(t), l = r?.reduce((c, h) => c + h.kwh, 0) ?? 0, d = a.sun === void 0 ? A : rt(a.sun, o);
    return m`<div class="bat-card">
          <span class="bat-cap">${n.sun.powerNow}</span>
          <span class="bat-huge">${d}</span>
          ${Q(a.sun, t.num.flows.idle_threshold) ? this.renderSunFlow(a, t, !0) : _}
        </div>
        <div class="bat-card rel">
          <div class="bat-card-bar"><span class="sun-title">${n.sun.chartTitle}</span><span class="sun-unit">${n.sun.chartUnit}${this.hint("chart", n.sun.hints.chart)}</span></div>
          ${this.renderChartOrEmpty("sun:five", 170, i)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi sun-kpi-ring">${this.renderSoFar(s)}</div>
          <div class="bat-kpi"><span class="sub">${n.sun.peakToday}</span><span class="val">${s.peak ? rt(s.peak.kw * 1e3, o) : A}</span><span class="sub">${s.peak ? n.sun.at(st(s.peak.at)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${n.sun.startedLong}</span><span class="val">${s.started === void 0 ? A : st(s.started)}</span><span class="sub">${s.rise === void 0 ? "" : n.sun.sunrise(st(s.rise))}</span></div>
          <div class="bat-kpi"><span class="sub">${s.ends?.over ? n.sun.ended : n.sun.ends}</span><span class="val">${s.ends === void 0 ? A : st(s.ends.at)}</span><span class="sub">${s.set === void 0 ? "" : n.sun.sunset(st(s.set))}</span></div>
        </div>
        ${r ? m`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.sun.whereTitle}</span>${this.hint("where", n.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${r.map((c) => m`<div style="flex:${c.kwh.toFixed(3)} 1 0;background:var(${ce[c.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${n.sun.whereTitle}>${r.map((c) => m`<span><span class="name"><i style="background:var(${ce[c.key]})"></i>${n.tile[c.key]}</span><b>${nt(c.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${l > 0 ? n.sun.whereUnit : A}</span>
            </div>` : _}`;
  }
  // ----------------------------------------------------------------- Historie
  renderSunRange(t) {
    const a = this.t.sun.hist, s = us.map((n) => ({ value: n, label: a.ranges[n] }));
    return m`<ed-segmented .options=${s} .value=${this.sunRange(t)} label=${a.rangeLabel} @hdk-select=${(n) => this.setSunRange(n.detail.value)}></ed-segmented>`;
  }
  /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
  rangeDays(t, a, s = 0) {
    const n = aa[a];
    return Array.from({ length: n }, (o, i) => Et(t.today, -(n - i) - s));
  }
  /** The production by day of the range: the totals, the blocks of the day and what was possible. */
  histData(t, a, s) {
    const n = t.num.forecast;
    return this.rangeDays(a, s).map((i) => {
      const r = a.days.get(i), l = Ze(r, 20);
      return { day: i, hours: r, total: l, blocks: l === void 0 ? void 0 : qo(r), possible: Qo(a.days, i, n.learn_days, n.possible_percentile) };
    });
  }
  histChart(t, a, s) {
    const n = this.t.sun.hist, o = this.histData(t, a, s);
    if (!o.some((b) => b.total !== void 0)) return;
    const i = o.length, r = (Z - ie) / i, l = (b) => P(ie + b * r + r / 2), d = Math.max(1, ...o.map((b) => Math.max(b.total ?? 0, b.possible ?? 0))), c = me(d), h = 150, u = (b) => P(h - ot(b, 0, c) / c * (h - 14)), g = this._sunMode === "parts";
    let v;
    if (g) {
      const b = o.map((S, C) => l(C)), p = o.map((S) => S.blocks), f = p.map((S, C) => S ? C : -1).filter((S) => S >= 0), x = f.map((S) => p[S].reduce((C, j) => [...C, C[C.length - 1] + j], [0])), $ = Array.from({ length: 6 }, (S, C) => Jo(f.map((j) => b[j]), x.map((j) => u(j[C])))), w = (S) => S.map(([C, j]) => `${P(C)},${P(j)}`).join(" "), E = o.map((S) => S.possible), T = E.some((S) => S !== void 0) ? Ge(E, l, u, h) : "";
      v = K`<path d=${T} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((S) => K`<polygon points=${`${w($[S + 1])} ${w([...$[S]].reverse())}`} style="fill:${ps[S]}"></polygon>`)}
          ${[1, 2, 3, 4].map((S) => K`<polyline points=${w($[S])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
    } else {
      const b = Math.min(s === "7d" ? 26 : 7, r - 3);
      v = K`${o.map((p, f) => K`
          ${p.possible === void 0 ? _ : K`<rect x=${P(l(f) - b / 2)} y=${u(p.possible)} width=${b} height=${P(h - u(p.possible))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${p.total === void 0 ? _ : K`<rect x=${P(l(f) - b / 2)} y=${u(p.total)} width=${b} height=${P(Math.max(1, h - u(p.total)))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${p.total !== void 0 && s === "7d" ? K`<text x=${l(f)} y=${u(p.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${q(p.total, 1)}</text>` : _}`)}`;
    }
    const y = g ? m`<div class="sun-blocks" role="group">${n.blocks.map((b, p) => m`<span><i style="background:${ps[p]}"></i><span>${b}</span></span>`)}</div>` : m`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${n.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${n.possible}</span></div>`;
    return {
      id: `sun-hist-${g ? "parts" : "total"}`,
      h: 170,
      n: i,
      x: l,
      fade: 0,
      grid: [{ y: h, strong: !0 }, { y: u(c / 2) }, { y: u(c) }],
      labels: [{ y: u(c), text: N(c) }, { y: u(c / 2), text: N(c / 2, c / 2 % 1 ? 1 : 0) }, { y: h, text: "0" }],
      time: { start: o[0].day, end: o[i - 1].day + Pt, x0: ie, x1: Z, slot: Pt },
      valueNum: (b) => (h - b) / (h - 14) * c,
      valueAt: (b) => N((h - b) / (h - 14) * c, (h - b) / (h - 14) * c % 1 ? 1 : 0),
      body: v,
      dot: (b) => o[b].total === void 0 ? void 0 : { y: u(o[b].total), color: "var(--ed-sun)" },
      read: (b) => {
        const p = o[b], f = _e(p.day);
        if (p.total === void 0) return `${f} · ${A}`;
        if (g && p.blocks) {
          const x = p.blocks.indexOf(Math.max(...p.blocks));
          return `${f} · ${q(p.total, 1)} kWh · ${n.mostIn(n.blocks[x])}`;
        }
        return `${f} · ${q(p.total, 1)} kWh${p.possible ? ` · ${n.ofPossible(W(Math.round(p.total / p.possible * 100)))}` : ""}`;
      },
      from: "",
      to: "",
      legend: y
    };
  }
  /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
  eastWest(t) {
    const a = this.t.sun.hist, s = 46, n = (r, l, d) => {
      const c = (h) => `${P(70 + s * Math.cos(h * Math.PI / 180))},${P(64 - s * Math.sin(h * Math.PI / 180))}`;
      return K`<path d="M${c(r)} A${s},${s} 0 0 1 ${c(l)}" fill="none" style="stroke:${d}" stroke-width="10"></path>`;
    }, o = 180 - 180 * t, i = Math.round(t * 100);
    return m`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${a.eastWestLabel(W(i), W(100 - i))}>${n(180, o + 1.5, "var(--ed-warning)")}${n(o - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${W(i)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${W(100 - i)}</span></div>`;
  }
  renderSunHistory(t, a) {
    const s = this.t.sun, n = t.num.forecast, o = this.sunRange(t), i = this.histData(t, a, o), r = i.filter((k) => k.total !== void 0), l = !a.ready, d = r.reduce((k, O) => k + O.total, 0);
    i.reduce((k, O) => k + (O.possible ?? 0), 0);
    const c = r.filter((k) => k.possible !== void 0), h = c.length ? Math.round(c.reduce((k, O) => k + O.total, 0) / c.reduce((k, O) => k + O.possible, 0) * 100) : void 0, u = this.histChart(t, a, o), g = ["total", "parts"].map((k) => ({ value: k, label: s.hist.modes[k] })), v = r.reduce((k, O) => !k || O.total > k.total ? O : k, void 0), y = r.reduce((k, O) => !k || O.total < k.total ? O : k, void 0), b = (k) => s.hist.dayOfPossible(_e(k.day), k.possible ? W(Math.round(k.total / k.possible * 100)) : A), p = t.entities, f = p.pv.power && this._batData["sun:hist"]?.parts.power?.[p.pv.power] || [], x = i[0]?.day ?? a.today, $ = f.filter((k) => k.start >= x && k.start < a.today && typeof k.max == "number").reduce((k, O) => !k || O.max > k.max ? O : k, void 0), w = (k) => {
      const O = k.map((tt) => tt.hours ? tt.hours.filter((R) => (R ?? 0) >= 0.05).length : void 0).filter((tt) => tt !== void 0);
      return O.length ? O.reduce((tt, R) => tt + R, 0) / O.length : void 0;
    }, E = w(i), T = w(this.rangeDays(a, o, aa[o]).map((k) => ({ hours: a.days.get(k) }))), S = a.rise !== void 0 && a.set !== void 0 ? this.hourOf((a.rise + a.set) / 2) : 12;
    let C = 0, j = 0;
    for (const k of r) k.hours?.forEach((O, tt) => {
      O && (tt + 0.5 < S ? C += O : j += O);
    });
    const M = C + j > 0 ? C / (C + j) : void 0, L = r.filter((k) => k.total > n.good_day).length, B = a.pairs.slice(-7);
    return m`${this.renderSunRange(t)}
        <div class="bat-card">
          <span class="bat-cap">${s.hist.last(aa[o])}</span>
          <span class="bat-huge sun-huge">${r.length ? `${q(d, 1)} kWh` : A}</span>
          <span class="bat-sub">${r.length ? Dt([...h === void 0 ? [] : [m`<b class="sun-yellow">${s.hist.ofPossible(W(h))}</b>`], s.hist.average(`${q(d / r.length, 1)} kWh`)]) : A}</span>
        </div>
        <div class="bat-card">
          <div class="bat-card-bar sun-mode"><span class="sun-title">${s.hist.chartTitle}</span>
            <ed-segmented compact .options=${g} .value=${this._sunMode} label=${s.hist.modeLabel} @hdk-select=${(k) => {
      this._sunMode = k.detail.value;
    }}></ed-segmented>
          </div>
          ${this.renderChartOrEmpty("sun:hist", 170, u)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${s.hist.best}</span><span class="val">${v ? `${q(v.total, 1)} kWh` : A}</span><span class="sub">${v ? It(b(v)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.worst}</span><span class="val">${y ? `${q(y.total, 1)} kWh` : A}</span><span class="sub">${y ? It(b(y)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.peak}</span><span class="val">${$ ? rt($.max, "kW") : A}</span><span class="sub">${$ ? `${_e($.start)} ${s.at(st($.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.length}</span><span class="val">${E === void 0 ? A : s.hist.lengthValue(q(E, 1))}</span><span class="sub">${T === void 0 ? "" : (o === "7d" ? s.hist.before7 : s.hist.before30)(q(T, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${s.hist.eastWest}</span>${M === void 0 ? m`<span class="bat-sub">${A}</span>` : this.eastWest(M)}</div>
          <div class="bat-card"><span class="bat-cap">${s.hist.goodDays}</span><span class="val big">${r.length ? s.hist.goodOf(L, r.length) : A}</span><span class="bat-sub">${s.hist.over(N(n.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${r.map((k) => m`<i class=${k.total > n.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${B.length >= 3 ? this.renderAccuracy(B, a) : _}`;
  }
  renderAccuracy(t, a) {
    const s = this.t.sun, n = me(Math.max(...t.flatMap((d) => [d.forecast, d.actual]))), o = 310, i = 60, r = 14, l = o / t.length;
    return m`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${s.hist.accuracyTitle}</span>${this.hint("acc", s.hints.acc)}</div>
        <div class="sun-acc"><b>±${W(Math.round(a.deviation * 100))}</b><span class="bat-sub">${s.hist.accuracyAverage(a.pairs.length)}</span></div>
        <svg viewBox="0 0 ${o + Vt} 80" class="sun-pairs" role="img" aria-label=${s.hist.accuracyLabel}>
          ${Array.from({ length: t.length + 1 }, (d, c) => K`<line x1=${P(c * l)} y1="0" x2=${P(c * l)} y2=${i} class="grid"></line>`)}
          <line x1="0" y1=${i - 25} x2=${o} y2=${i - 25} class="grid"></line>
          <line x1="0" y1=${i - 50} x2=${o} y2=${i - 50} class="grid"></line>
          <text x=${o + 5} y=${i - 46} style="fill:var(--ed-secondary)" font-size="12">${N(n)} kWh</text>
          <text x=${o + 5} y=${i - 21} style="fill:var(--ed-secondary)" font-size="12">${N(n / 2, n / 2 % 1 ? 1 : 0)}</text>
          <text x=${o + 5} y=${i + 4} style="fill:var(--ed-secondary)" font-size="12">0</text>
          <line x1="0" y1=${i} x2=${o} y2=${i} class="axis"></line>
          ${t.map((d, c) => {
      const h = c * l + (l - 2 * r - 2) / 2, u = (g) => P(g / n * 50);
      return K`<rect x=${P(h)} y=${P(i - u(d.forecast))} width=${r} height=${u(d.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${P(h + r + 2)} y=${P(i - u(d.actual))} width=${r} height=${u(d.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${P(h + r + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(d.day)}</text>`;
    })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${s.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${s.hist.actual}</span></div>
      </div>`;
  }
  // ----------------------------------------------------------------- Výhled
  renderSunOutlook(t, a) {
    const s = this.t.sun, n = s.outlook, o = t.num.forecast, i = t.entities, r = a.estimate, l = o.good_power / 1e3, d = `${q(o.good_power / 1e3, o.good_power % 1e3 ? 1 : 0)} kW`, c = r && a.done !== void 0 && r.value > 0 ? Math.min(100, Math.round(a.done / r.value * 100)) : void 0, h = r ? { low: 1, medium: 2, high: 3 }[r.certainty] : 0, u = [i.forecast.energy_today, i.forecast.energy_tomorrow, i.forecast.energy_day_2, i.forecast.energy_day_3, i.forecast.energy_day_4], g = this._sunWeather?.days ?? [], v = u.map((M, L) => {
      const B = Et(a.today, L), k = L === 0 ? r?.value : Jt(this.hass, M), O = L === 0 ? a.hours : k === void 0 ? void 0 : Uo(k, a.learned.curve), tt = L === 0 ? this.weatherGroup(i.forecast.weather ? pt(this.hass, i.forecast.weather)?.state : void 0) : this.weatherGroup(g.find((R) => R.day === B)?.condition);
      return { i: L, day: B, kwh: k, hours: O, condition: tt };
    }).filter((M) => M.kwh !== void 0 || M.i === 0), y = v.filter((M) => M.kwh !== void 0), b = (M) => M ? Ko(M, o.strip_from, o.strip_to, l) : void 0, p = y.filter((M) => M.i > 0 || y.length === 1).reduce((M, L) => !M || L.kwh > M.kwh ? L : M, void 0), f = p ? b(p.hours) : void 0, x = this.place(), $ = x ? Le(a.today, x.latitude, x.longitude) : void 0, w = x ? Le(Et(a.today, 1), x.latitude, x.longitude) : void 0, E = $ ? Math.round(($.set - $.rise) / 6e4) : void 0, T = $ && w ? Math.round((w.set - w.rise - ($.set - $.rise)) / 6e4) : void 0, S = this.evening(t, a), C = Array.from({ length: o.strip_to - o.strip_from + 1 }, (M, L) => o.strip_from + L), j = new Date(a.now).getHours();
    return m`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${n.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${r ? `${nt(r.value)} kWh` : A}</span>
              <span class="bat-sub">${r ? n.between(nt(r.low), nt(r.high)) : ""}</span>
              ${r ? m`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((M) => m`<i class=${M <= h ? "on" : ""}></i>`)}</span><b>${n.certainty[r.certainty]}</b>${this.hint("conf", s.hints.conf)}</span>` : _}
            </div>
            ${c === void 0 ? _ : this.ring(c / 100, 76, 8, String(c), "", s.ringLabel(W(c)))}
          </div>
        </div>
        ${v.length > 1 ? m`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.fiveTitle}</span>${this.hint("five", s.hints.five(d))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${C.map((M) => m`<span>${M % 3 === 0 ? M : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${v.map((M) => {
      const L = b(M.hours);
      return m`<div class="sun-five-row">
                    <span class="day"><b>${M.i === 0 ? n.today : de(M.day)}</b><span>${M.condition ? s.weather[M.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${C.map((B) => {
        const k = M.hours?.[B], O = k === void 0 ? "none" : k >= l ? "strong" : k >= l * 0.35 ? "mid" : k >= l * 0.075 ? "faint" : "none";
        return m`<i class="${O} ${M.i === 0 && B === j ? "now" : ""}"></i>`;
      })}</span>
                    <span class="end"><b>${M.kwh === void 0 ? A : `${M.i ? "≈ " : ""}${nt(M.kwh)}`}</b><span class=${L ? "" : "off"}>${M.kwh === void 0 ? "" : L ? n.window(L[0], L[1]) : n.below(d)}</span></span>
                  </div>`;
    })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${n.strong(d)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${n.weak}</span></div>
            </div>` : _}
        ${S ? m`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.eveningTitle}</span>${this.hint("eve", s.hints.eve)}</div>
              <div class="bat-list">${S.map((M) => m`<div class="bat-line sun-line"><span><i style="background:var(${M.color})"></i>${M.label}</span><b>${It(M.value)}</b></div>`)}
              </div>
            </div>` : _}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${n.dayLength}</span><span class="val">${E === void 0 ? A : n.hoursMinutes(Math.floor(E / 60), E % 60)}</span><span class="sub">${T === void 0 ? "" : n.dayChange(T)}</span></div>
          <div class="bat-kpi"><span class="sub">${n.bestDay}</span><span class="val">${p ? p.i === 0 ? n.today : de(p.day) : A}</span><span class="sub">${p ? It(n.bestSub(nt(p.kwh), f ? n.window(f[0], f[1]) : "")) : ""}</span></div>
        </div>`;
  }
  /** kWh per km of the car, from its charge, the capacity and the range it reports; undefined when it reports none of them. */
  carKwhPerKm(t) {
    const a = V(this.hass, t.entities.car.state_of_charge), s = V(this.hass, t.entities.car.range), n = V(this.hass, t.entities.car.capacity);
    if (!(a === void 0 || s === void 0 || n === void 0 || a < 5 || s < 5 || n <= 0))
      return n * a / 100 / s;
  }
  /** The rows of "Dnes do večera": the battery full, its level in the evening, the car from the sun, the grid at night; none without the data it needs. */
  evening(t, a) {
    const s = t.num.forecast, n = t.entities, o = V(this.hass, n.battery.state_of_charge), i = this.sunHouseCurve();
    if (o === void 0 || !i.some((h) => h !== void 0) || !a.estimate) return;
    const r = Xo({
      now: a.now,
      soc: o,
      capacity: t.num.battery.capacity,
      reserve: this.batteryReserve(t),
      sun: a.hours,
      house: i,
      efficiency: s.efficiency / 100,
      eveningHour: s.evening_hour,
      morningHour: s.morning_hour,
      car: n.wallbox.power && Cs(it(this.hass, n.wallbox.status)) !== "disconnected" ? { startSoc: s.car_start_soc, stopSoc: s.car_stop_soc, minSun: s.car_min_sun, watts: t.num.wallbox.power_min } : void 0
    }), l = this.t.sun.outlook, d = [], c = st(a.today + s.evening_hour * at);
    if (r.socAtEvening !== void 0 && (d.push({ color: "--ed-battery", label: l.batteryNow, value: W(Math.round(o)) }), d.push({ color: "--ed-sun", label: l.sunUntil(c), value: `≈ ${nt(r.sunUntilEvening)} kWh` }), d.push({ color: "--ed-house", label: l.houseUntil(c), value: `≈ ${nt(r.houseUntilEvening)} kWh` })), r.fullAt !== void 0 && d.push({ color: "--ed-battery", label: l.full, value: `≈ ${st(r.fullAt)}` }), r.socAtEvening !== void 0 && d.push({ color: "--ed-battery", label: l.batteryAt(st(a.today + s.evening_hour * at)), value: `≈ ${W(Math.round(r.socAtEvening))}` }), r.carTotal > 0) {
      const h = this.carKwhPerKm(t);
      d.push({ color: "--ed-car", label: l.carSun, value: `≈ ${nt(r.carSun)} kWh${h ? ` · ${N(r.carSun / h)} km` : ""}` });
    }
    return r.socAtMorning !== void 0 && d.push({ color: "--ed-battery", label: l.batteryAt(st(Et(a.today, 1) + s.morning_hour * at)), value: `≈ ${W(Math.round(r.socAtMorning))}` }), d;
  }
}, Ee = 5 * 6e4, si = 24 * at, ni = 7, gs = 5, oi = ["overcurrent", "overheating", "overpowering", "overvoltage"], re = ["#5E5CE6", "#E8457A", "#1E9E96", "#B8803A", "#5E9E34", "#6F8FAF", "#D9503C", "#A064C8", "#8F8C2A"], bs = "ha-energie-dashboard.house-range", ii = "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12C19,15.87 15.87,19 12,19C8.13,19 5,15.87 5,12C5,9.82 6.01,7.87 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,9.26 19.77,6.82 17.83,5.17Z", je = (e) => `\0group:${e}`, ri = "mdi:power-plug", li = (e) => class extends e {
  // ----------------------------------------------------------------- the appliances
  /** The appliances: the devices that have the label and measure power, and the ones named in house.appliances with their power sensor; the others (a vacuum) drop out. */
  appliances(t) {
    const a = this.hass, s = a?.devices ?? {}, n = a?.entities ?? {}, o = t.houseLabel.toLowerCase(), i = (c) => !!c?.some((h) => h.toLowerCase() === o), r = /* @__PURE__ */ new Set();
    for (const [c, h] of Object.entries(s)) i(h.labels) && r.add(c);
    for (const c of Object.values(n)) c.device_id && i(c.labels) && r.add(c.device_id);
    const l = (c) => {
      const h = { problems: [] }, u = {};
      for (const [g, v] of Object.entries(n)) {
        if (!c || v.device_id !== c) continue;
        const y = this.hass?.states?.[g];
        if (!y) continue;
        const b = y.attributes?.icon;
        typeof b == "string" && b && (u[g] = b);
        const p = y.attributes?.device_class;
        if (g.startsWith("sensor."))
          p === "power" && !h.power ? h.power = g : p === "energy" && y.attributes?.state_class === "total_increasing" && !g.endsWith("_returned") && !h.energy && (h.energy = g);
        else if (g.startsWith("binary_sensor.") && p === "problem") {
          const f = oi.find((x) => g.endsWith(`_${x}`));
          f && h.problems.push({ id: g, kind: f });
        } else g.startsWith("switch.") && !h.plug && (h.plug = g);
      }
      return h.icon = h.plug && u[h.plug] || h.power && u[h.power] || Object.values(u)[0], h;
    }, d = [];
    for (const c of r) {
      const h = s[c], u = (h?.name_by_user || h?.name || c).trim(), g = l(c);
      if (!g.power) continue;
      const v = t.appliances.find((y) => Za(y.name).some((b) => b.toLowerCase() === u.toLowerCase()));
      d.push({ name: u, label: v?.name, deviceId: c, warnAfter: v?.warn_after, power: v?.power ?? g.power, energy: v?.energy ?? g.energy, plug: g.plug, icon: this.iconOf(v?.icon, g.icon, [v?.power ?? g.power, v?.energy ?? g.energy, v?.running, v?.start_energy]), problems: g.problems, running: v?.running, startEnergy: v?.start_energy });
    }
    for (const c of t.appliances) {
      if (!c.power || d.some((g) => g.power === c.power)) continue;
      const h = n[c.power]?.device_id ?? void 0, u = l(h);
      d.push({ name: Za(c.name)[0], label: c.name, deviceId: h ?? c.power, power: c.power, energy: c.energy ?? u.energy, plug: u.plug, icon: this.iconOf(c.icon, u.icon, [c.power, c.energy, c.running, c.start_energy]), problems: u.problems, running: c.running, startEnergy: c.start_energy, warnAfter: c.warn_after });
    }
    return d.sort((c, h) => c.name.localeCompare(h.name));
  }
  /** The appliances of the list and of the chart: without the ones that are members of a group (a power sensor is listed once, in its group). */
  listed(t) {
    const a = new Set(t.groups.flatMap((s) => s.appliances.map((n) => n.power)));
    return this.appliances(t).filter((s) => !a.has(s.power));
  }
  /** What the popup can show: the listed appliances and the members of the groups (Varná deska and Trouba are named in the popup, the group stays one row of the detail). */
  popupItems(t) {
    const a = this.listed(t).map((n) => ({ key: n.name, name: this.applianceName(n), icon: n.icon, power: n.power, running: n.running, cycle: !!n.running, warnAfter: n.warnAfter })), s = t.groups.flatMap((n, o) => n.appliances.map((i) => ({ key: `${je(o)}:${i.power}`, name: this.pickText(i.name) ?? "", icon: n.icon, power: i.power, running: i.running, cycle: !1, warnAfter: i.warn_after })));
    return [...a, ...s];
  }
  /** The icon of an appliance: the configured one, the one of the entities of its device, the one of its helpers, otherwise a plug. */
  iconOf(t, a, s) {
    const n = s.map((o) => o ? this.hass?.states?.[o]?.attributes?.icon : void 0).find((o) => typeof o == "string" && o !== "");
    return t ?? a ?? n ?? ri;
  }
  /** The name of the appliance in the language of the card. */
  applianceName(t) {
    return this.pickText(t.label) ?? t.name;
  }
  /** The icon of the appliance (Home Assistant draws it from its name). */
  renderApplianceIcon(t) {
    return t.icon ? m`<ha-icon class="house-icon" icon=${t.icon}></ha-icon>` : _;
  }
  /** An appliance that draws no power: the grey power symbol instead of a word. */
  renderIdleMark() {
    return m`<span class="house-idle" role="img" aria-label=${this.t.house.idle}><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ii}></path></svg></span>`;
  }
  /** What the card sees of the label when it finds no appliance (shown in the detail so that the cause can be told). */
  labelDiagnostics(t) {
    const a = this.hass, s = t.houseLabel.toLowerCase(), n = (i) => !!i?.some((r) => r.toLowerCase() === s), o = /* @__PURE__ */ new Set();
    for (const [i, r] of Object.entries(a?.devices ?? {})) n(r.labels) && o.add(i);
    for (const i of Object.values(a?.entities ?? {})) i.device_id && n(i.labels) && o.add(i.device_id);
    return this.t.house.noneHint(t.houseLabel, o.size, !!a?.devices && !!a?.entities);
  }
  /** Whether the appliance runs: the helper of its cycle, otherwise (an appliance without helpers) its power above the threshold. */
  applianceOn(t, a) {
    if (t.running) {
      const n = it(this.hass, t.running);
      if (n === "on") return !0;
      if (n === "off") return !1;
    }
    const s = V(this.hass, t.power);
    return s === void 0 ? void 0 : Q(s, a.num.flows.idle_threshold);
  }
  /** When the helper last changed (ms); the start of the running cycle or the end of the finished one. */
  changedAt(t) {
    const a = t.running ? this.hass?.states?.[t.running]?.last_changed : void 0, s = a ? Date.parse(a) : NaN;
    return Number.isFinite(s) ? s : void 0;
  }
  /** Start, end and length of the last cycle: from the moments the helper turned on and off (the recorder), without them only a running cycle (the helper changed when it started). */
  cycleTimes(t, a) {
    const s = t.running ? this._houseCycles?.byId[t.running] : void 0, n = s?.starts.length ? Math.max(...s.starts) : void 0, o = s?.ends.length ? Math.max(...s.ends) : void 0;
    if (a) {
      const l = n ?? this.changedAt(t);
      return { start: l, minutes: l === void 0 ? void 0 : Math.max(0, Math.round((Date.now() - l) / 6e4)) };
    }
    const i = o === void 0 ? [] : (s?.starts ?? []).filter((l) => l < o), r = i.length ? Math.max(...i) : void 0;
    return r !== void 0 && o !== void 0 ? { start: r, end: o, minutes: Math.round((o - r) / 6e4) } : { end: s ? o : this.changedAt(t) };
  }
  /** A moment as the clock, with the day when it is not today ("včera 23:20"); `from` is the start of the range: the same day is not repeated. */
  stamp(t, a) {
    const s = this.t, n = st(t), o = (l) => {
      const d = new Date(l);
      return d.setHours(0, 0, 0, 0), d.getTime();
    }, i = o(t), r = o(Date.now());
    return a !== void 0 && o(a) === i ? n : i === r ? a === void 0 ? n : `${s.house.todayWord} ${n}` : i === o(r - 12 * at) ? `${s.house.yesterday} ${n}` : `${de(t)} ${n}`;
  }
  /** The energy of the cycle: the counter minus the value saved at the start. */
  cycleKwh(t) {
    const a = Jt(this.hass, t.energy), s = V(this.hass, t.startEnergy);
    return a === void 0 || s === void 0 ? void 0 : Math.max(0, a - s);
  }
  /** The status line of an appliance: "Běží · 31 min", "Skončilo · před 40 min" (up to 24 h) or nothing. */
  applianceStatus(t, a) {
    const s = this.t, n = this.applianceOn(t, a);
    if (n === void 0) return;
    const o = this.cycleTimes(t, n);
    if (n) return t.running && o.minutes !== void 0 ? s.house.running(pe(o.minutes)) : s.house.runningNoCycle;
    if (t.running && o.end !== void 0 && Date.now() - o.end <= si) return s.house.ended(pe(Math.max(0, Math.round((Date.now() - o.end) / 6e4))));
  }
  // ----------------------------------------------------------------- alerts
  /** One alert for each appliance whose socket reports a fault, and for each one that runs longer than its `warn_after` (CURRENT_SPEC.md, Upozornění). */
  houseAlerts(t) {
    const a = this.appliances(t).flatMap((n) => n.problems.filter((i) => it(this.hass, i.id) === "on").map((i) => ({ kind: "warn", title: this.applianceName(n), text: this.t.house.problem[i.kind] }))), s = this.popupItems(t).flatMap((n) => {
      if (!n.warnAfter || !n.running || this.applianceOn(n, t) !== !0) return [];
      const o = this.cycleTimes(n, !0).minutes;
      return o !== void 0 && o >= n.warnAfter ? [{ kind: "warn", title: n.name, text: this.t.house.runningLong(pe(o)) }] : [];
    });
    return [...a, ...s];
  }
  // ----------------------------------------------------------------- the popup
  /**
   * The rows are decided when the popup opens (uživatel 9. 11. 2026, "Q1 B"): at most five, the running cycles always among them, the rest by power
   * (an appliance or a member of a group runs by its helper, without one by its power above the threshold); shown from the largest power.
   */
  freezeHouse(t) {
    const a = (r) => V(this.hass, r.power) ?? 0, s = (r, l) => a(l) - a(r), n = this.popupItems(t).filter((r) => this.applianceOn(r, t) === !0), o = n.filter((r) => r.cycle).sort(s).slice(0, gs), i = n.filter((r) => !r.cycle).sort(s).slice(0, gs - o.length);
    this._houseFrozen = [...o, ...i].sort(s).map((r) => r.key);
  }
  /** The order of the detail, decided when it opens: what runs (an appliance by its helper or power, a group by the sum of its power) from the largest power, the rest after it. */
  houseOrder(t) {
    const a = [];
    for (const s of this.listed(t)) this.applianceOn(s, t) === !0 && a.push({ key: s.name, watts: V(this.hass, s.power) ?? 0 });
    return t.groups.forEach((s, n) => {
      const o = s.appliances.map((r) => V(this.hass, r.power));
      if (o.some((r) => r === void 0)) return;
      const i = o.reduce((r, l) => r + l, 0);
      Q(i, t.num.flows.idle_threshold) && a.push({ key: je(n), watts: i });
    }), a.sort((s, n) => n.watts - s.watts).map((s) => s.key);
  }
  /** The order of the table of each group, decided when the detail opens: from the largest power now, the unknown ones last (uživatel 9. 11. 2026, "Q19 ok"). */
  memberOrder(t) {
    return Object.fromEntries(
      t.groups.map((a, s) => [s, a.appliances.map((n) => ({ power: n.power, watts: V(this.hass, n.power) ?? -1 })).sort((n, o) => o.watts - n.watts).map((n) => n.power)])
    );
  }
  renderHousePopup(t, a, s) {
    const n = this.t, o = a.num.flows.idle_threshold, i = Q(s.other, o), r = this.today(a), l = this.popupItems(a), d = (this._houseFrozen ?? []).map((h) => l.find((u) => u.key === h)).filter((h) => !!h), c = i ? rt(s.other, "W").replace(" ", " ") : s.other === void 0 ? A : n.idle.house;
    return m`<ed-sheet open .heading=${t.name} .sub=${c} .closeLabel=${n.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop house-pop">
        <div class="pop-rows">
          ${d.map((h) => {
      const u = V(this.hass, h.power), g = this.applianceOn(h, a), v = this.listed(a).find((x) => x.name === h.key), y = v ? this.applianceStatus(v, a) : void 0, b = this.cycleTimes(h, g).minutes, p = g && h.running && b !== void 0 ? `${h.name} · ${pe(b)}` : h.name, f = u === void 0 ? m`<b>${A}</b>` : Q(u, o) || g || !h.cycle ? m`<b>${rt(u, "W").replace(" ", " ")}</b>` : this.renderIdleMark();
      return m`<div class="house-app" title=${y ?? ""}><span class="ell">${h.icon ? m`<ha-icon class="house-icon" icon=${h.icon}></ha-icon>` : _}${p}</span>${f}</div>`;
    })}
          <div class="pop-row"><span>${n.pop.rows.consumed}</span><b>${r.house === void 0 ? A : `${nt(r.house)} kWh`}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openHouseDetail()}><span>${n.house.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- state and history
  houseRange(t) {
    if (this._houseRange) return this._houseRange;
    try {
      const a = localStorage.getItem(bs);
      if (a && Ve.includes(a)) return a;
    } catch {
    }
    return t.houseRange;
  }
  setHouseRange(t) {
    this._houseRange = t, this._batScrub = {};
    try {
      localStorage.setItem(bs, t);
    } catch {
    }
  }
  openHouseDetail() {
    this._houseDetail = !0, this._houseOpen = [], this._houseTab = "now", this._batScrub = {};
    const t = this._config;
    t && (this._houseOrder = this.houseOrder(t), this._houseMembers = this.memberOrder(t));
  }
  closeHouseDetail() {
    this._houseDetail = !1, this._pop = void 0, this._houseFrozen = void 0, this._houseOrder = void 0, this._houseMembers = void 0, this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
  }
  loadBattery() {
    super.loadBattery(), this.loadHouse();
  }
  loadHouse() {
    const t = this._config;
    if (!t || !this.hass) return;
    if ((this._pop === "house" || this._pop === "car" || this._pop === "boil" || this._all || this._houseDetail) && (!this._houseToday || Date.now() - this._houseToday.at > Ee || this._houseDetail && !this._houseToday.detail) && this.fetchHouseToday(t), this._houseDetail && this._houseTab === "hist") {
      const n = this.houseRange(t), o = `hist:${n}`, i = this._houseData[o];
      (!i || i.status !== "loading" && Date.now() - i.at > Ee) && this.fetchHouse(t, o, n, i);
    }
    if (this._houseDetail && this._houseTab === "now") {
      const n = this._houseData.day;
      (!n || n.status !== "loading" && Date.now() - n.at > Ee) && this.fetchHouse(t, "day", "day", n);
    }
    const s = this.popupItems(t).some((n) => n.warnAfter && n.running);
    if (this._houseDetail && this._houseTab === "now" || this._pop === "house" || s) {
      const n = this._houseCycles;
      (!n || Date.now() - n.at > Ee) && this.fetchCycles(t);
    }
  }
  /** Energy of the car and of the boiler since midnight from the statistics of their power (5-minute means). */
  async fetchHouseToday(t) {
    const a = this.hass;
    if (!a) return;
    const s = Date.now();
    this._houseToday = { ...this._houseToday ?? {}, at: s, detail: this._houseDetail };
    const n = [t.entities.wallbox.power, t.entities.boiler.power].filter((d) => !!d), o = this._houseDetail ? this.appliances(t).map((d) => d.energy).filter((d) => !!d) : [], i = this._houseDetail ? t.groups.flatMap((d) => d.appliances) : [], r = i.map((d) => d.energy).filter((d) => !!d), l = i.filter((d) => !d.energy).map((d) => d.power);
    if (!(!n.length && !o.length && !r.length && !l.length))
      try {
        const d = new Date(s);
        d.setHours(0, 0, 0, 0);
        const c = await Wt(a, [...n, ...l], d.getTime(), s, "5minute", ["mean"]), h = o.length || r.length ? await Wt(a, [...o, ...r], d.getTime(), s, "5minute", ["change"]) : {}, u = {};
        for (const y of i)
          if (y.energy) {
            const b = h[y.energy];
            At(b, "change") && (u[y.power] = b.reduce((p, f) => p + (typeof f.change == "number" ? f.change : 0), 0));
          } else {
            const b = c[y.power];
            At(b, "mean") && (u[y.power] = b.reduce((p, f) => p + (typeof f.mean == "number" ? f.mean : 0), 0) / 12 / 1e3);
          }
        const g = {};
        for (const y of o) {
          const b = h[y];
          At(b, "change") && (g[y] = b.reduce((p, f) => p + (typeof f.change == "number" ? f.change : 0), 0));
        }
        const v = (y) => {
          const b = y ? c[y] : void 0;
          return At(b, "mean") ? b.reduce((p, f) => p + (typeof f.mean == "number" ? f.mean : 0), 0) / 12 / 1e3 : void 0;
        };
        this._houseToday = { at: s, car: v(t.entities.wallbox.power), boil: v(t.entities.boiler.power), apps: g, groups: u, detail: this._houseDetail };
      } catch {
        this._houseToday = { at: s, detail: this._houseDetail };
      }
  }
  /** The first moment and the number of bins of the chart: today by hours from midnight to midnight, or whole days up to today (uživatel 9. 11. 2026, "Q8 ok": 1 den = od půlnoci). */
  houseWindow(t, a) {
    if (t === "day" || t === "1d") {
      const s = new Date(a);
      return s.setHours(0, 0, 0, 0), { start: s.getTime(), bins: 24, step: at };
    }
    return { ...this.histWindow(t, a), step: Pt };
  }
  async fetchHouse(t, a, s, n) {
    const o = this.hass;
    if (!o) return;
    const i = Date.now();
    this._houseData = { ...this._houseData, [a]: { status: "loading", at: i, parts: n?.parts ?? {} } };
    try {
      const r = this.houseWindow(s, i), l = s === "1d" || s === "day" ? "hour" : "day", d = (...w) => w.filter((E) => !!E), c = t.entities, h = r.start + Math.min(r.bins - 1, Math.max(0, Math.floor((i - r.start) / r.step))) * r.step, u = this.listed(t), g = t.groups.flatMap((w) => w.appliances), v = s === "day", y = d(...v ? [] : [c.pv.total_generation, c.battery.total_discharge, c.battery.total_charge, c.grid.total_import, c.grid.total_export], ...u.map((w) => w.energy), ...g.map((w) => w.energy)), b = d(...v ? [] : [c.wallbox.power, c.boiler.power], ...u.filter((w) => !w.energy).map((w) => w.power), ...g.filter((w) => !w.energy).map((w) => w.power)), [p, f, x, $] = await Promise.all([
        Wt(o, y, r.start, i, l, ["change"]),
        Wt(o, b, r.start, i, l, ["mean"]),
        // The running bin (hour or day) has no row in the long-term statistics yet: the 5-minute rows fill it.
        Wt(o, y, h, i, "5minute", ["change"]),
        Wt(o, b, h, i, "5minute", ["mean"])
      ]);
      this._houseData = { ...this._houseData, [a]: { status: "ready", at: i, parts: { energy: p, power: f, nowCounters: x, nowPowers: $ } } };
    } catch {
      this._houseData = { ...this._houseData, [a]: { status: "error", at: i, parts: {} } };
    }
  }
  /** The cycles of the helpers: the moments the helper turned on and off (the states of the recorder). A gap (unavailable, e.g. a restart of Home Assistant) is not a change: a cycle that ran before it and is over after it ended when the gap began. */
  async fetchCycles(t) {
    const a = this.hass;
    if (!a) return;
    const s = Date.now();
    this._houseCycles = { at: s, byId: this._houseCycles?.byId ?? {} };
    const n = [...this.appliances(t).map((o) => o.running), ...t.groups.flatMap((o) => o.appliances.map((i) => i.running))].filter((o, i, r) => !!o && r.indexOf(o) === i);
    if (n.length)
      try {
        const o = await a.callWS({
          type: "history/history_during_period",
          start_time: new Date(s - ni * Pt).toISOString(),
          end_time: new Date(s).toISOString(),
          entity_ids: n,
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        }), i = {};
        for (const [r, l] of Object.entries(o ?? {})) {
          const d = [], c = [];
          let h, u;
          for (const g of l) {
            const v = g.s ?? g.state, y = g.lu ?? g.last_updated, b = typeof y == "number" ? y * 1e3 : y ? Date.parse(y) : NaN;
            if (Number.isFinite(b)) {
              if (v === void 0 || v === "unavailable" || v === "unknown") {
                h !== void 0 && u === void 0 && (u = b);
                continue;
              }
              h !== void 0 && v !== h && (v === "on" ? d.push(b) : v === "off" && c.push(h === "on" && u !== void 0 ? u : b)), h = v, u = void 0;
            }
          }
          i[r] = { starts: d, ends: c };
        }
        this._houseCycles = { at: s, byId: i };
      } catch {
        this._houseCycles = { at: s, byId: {} };
      }
  }
  // ----------------------------------------------------------------- the detail
  renderHouseDetail(t, a) {
    const s = this.t, n = this.houseRange(t), o = Ve.map((g) => ({ value: g, label: s.bat.ranges[g] })), i = ["now", "hist"].map((g) => ({ value: g, label: s.house.tabs[g] })), r = "W", l = this._houseOrder ?? [], d = [
      ...this.listed(t).map((g) => ({ key: g.name, label: this.applianceName(g), group: !1, render: () => this.renderApplianceRow(g, t, r) })),
      ...t.groups.map((g, v) => ({ key: je(v), label: "", group: !0, render: () => this.renderGroupRow(g, v) }))
    ].sort((g, v) => {
      const y = l.indexOf(g.key), b = l.indexOf(v.key);
      return y >= 0 || b >= 0 ? (y < 0 ? 999 : y) - (b < 0 ? 999 : b) : Number(g.group) - Number(v.group) || (g.group ? 0 : g.label.localeCompare(v.label));
    }), c = this.houseChart(t, n), h = this._houseData[`hist:${n}`], u = h?.status === "loading" && !Object.keys(h.parts).length;
    return m`<section class="bat-detail house-detail" role="dialog" aria-modal="true" aria-label=${s.house.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeHouseDetail()}>‹ ${s.house.back}</button>
          <h2>${s.house.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeHouseDetail()}>${s.house.done}</button>
        </div>
        <ed-segmented .options=${i} .value=${this._houseTab} label=${s.house.tabsLabel} @hdk-select=${(g) => {
      this._houseTab = g.detail.value, this._batScrub = {};
    }}></ed-segmented>
        ${this._houseTab === "now" ? m`<div class="bat-card"><span class="bat-cap">${s.house.nowLabel}</span>
              <span class="house-hero">${a.other === void 0 ? A : rt(a.other, r)}</span></div>
            <div class="house-list"><span class="bat-cap">${s.house.appliances}</span>
              ${d.length ? d.map((g) => g.render()) : m`<div class="bat-card"><span>${s.house.none}</span><span class="bat-sub">${this.labelDiagnostics(t)}</span></div>`}
            </div>` : m`<ed-segmented .options=${o} .value=${n} label=${s.house.rangeLabel} @hdk-select=${(g) => this.setHouseRange(g.detail.value)}></ed-segmented>
            <div class="bat-card"><span class="bat-cap">${Dt([n === "1d" ? s.house.chartHours : s.house.chartDays, m`<span class="unit">kWh</span>`])}</span>
              ${c ? this.renderChart(c) : m`<div class="bat-nodata" style="aspect-ratio:${Z} / 220">${u ? A : s.bat.noDataChart}</div>`}
            </div>`}
      </section>`;
  }
  /**
   * A group of appliances (house.groups): one row. Closed: the power now (the sum) and the energy of today; open: every appliance with its
   * power now and its energy of today. No cycles, no threshold: what the appliances draw is shown as it is. A sum counts only when every appliance is known.
   */
  renderGroupRow(t, a) {
    const s = je(a), n = this._houseOpen.includes(s), o = this._houseMembers?.[a] ?? [], i = t.appliances.map((h) => ({ power: h.power, name: this.pickText(h.name) ?? "", watts: V(this.hass, h.power), kwh: this._houseToday?.groups?.[h.power] })).sort((h, u) => (o.indexOf(h.power) < 0 ? 999 : o.indexOf(h.power)) - (o.indexOf(u.power) < 0 ? 999 : o.indexOf(u.power))), r = (h) => h.every((u) => u !== void 0) ? h.reduce((u, g) => u + g, 0) : void 0, l = (h) => h === void 0 ? A : rt(h, "W").replace(" ", " "), d = (h) => h === void 0 ? A : `${nt(h)} kWh`, c = this.t;
    return m`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${n ? "true" : "false"} @click=${() => {
      this._houseOpen = n ? this._houseOpen.filter((h) => h !== s) : [...this._houseOpen, s];
    }}>
          <ha-icon class="house-icon" icon=${t.icon}></ha-icon>
          <span class="bat-col"><span class="bat-label">${this.pickText(t.name) ?? ""}</span><span class="bat-sub">${c.house.today} ${d(r(i.map((h) => h.kwh)))}</span></span>
          <span class="bat-value">${l(r(i.map((h) => h.watts)))}</span>
          <svg class="chev ${n ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${n ? m`<div class="house-body">
            <div class="house-cook">
              <span class="house-cook-head"></span><span class="house-cook-head">${c.house.nowCol}</span><span class="house-cook-head">${c.house.totalCol}</span>
              ${i.map((h) => m`<span class="house-cook-name">${h.name}</span><b>${l(h.watts)}</b><b>${d(h.kwh)}</b>`)}
            </div>
            ${this.renderDayChart(t.appliances.map((h, u) => ({ name: this.pickText(h.name) ?? "", energy: h.energy, power: h.power, color: re[u % re.length] })).sort((h, u) => (o.indexOf(h.power) < 0 ? 999 : o.indexOf(h.power)) - (o.indexOf(u.power) < 0 ? 999 : o.indexOf(u.power))))}
          </div>` : _}
      </div>`;
  }
  renderApplianceRow(t, a, s) {
    const n = this.t, o = this._houseOpen.includes(t.name), i = V(this.hass, t.power), r = this.applianceOn(t, a), l = this.applianceStatus(t, a) ?? (r === !1 ? n.house.notRunning : A), d = i !== void 0 && Q(i, a.num.flows.idle_threshold), c = i === void 0 ? m`<span class="bat-value">${A}</span>` : d ? m`<span class="bat-value">${rt(i, s)}</span>` : r ? m`<span class="bat-value">${N(i)}\u00a0W</span>` : this.renderIdleMark(), h = this.cycleTimes(t, r), u = this.cycleKwh(t), g = /* @__PURE__ */ new Date();
    g.setHours(0, 0, 0, 0);
    const v = t.running ? this._houseCycles?.byId[t.running] : void 0, y = v ? v.starts.filter((C) => C >= g.getTime()).length : void 0, b = Math.max(0, this.listed(a).findIndex((C) => C.name === t.name)), p = re[b % re.length], f = (C, j) => `${this.stamp(C)} – ${j}`, x = t.running && h.start !== void 0 ? m`<div class="house-line wrap"><span>${r ? n.house.currentCycle : n.house.lastCycle}</span><b>${Dt([f(h.start, r ? n.house.axisTo : this.stamp(h.end ?? h.start, h.start)), ...u !== void 0 ? [`${nt(u)} kWh`] : []])}</b></div>` : t.running && h.end !== void 0 && !r ? m`<div class="house-line wrap"><span>${n.house.lastCycle}</span><b>${n.house.endedAt(this.stamp(h.end))}</b></div>` : _, $ = this.renderDayChart([{ name: this.applianceName(t), energy: t.energy, power: t.power, color: p }]), w = t.energy ? this._houseToday?.apps?.[t.energy] : void 0, E = t.plug ? it(this.hass, t.plug) : void 0, T = t.problems.find((C) => it(this.hass, C.id) === "on"), S = (C, j) => m`<div class="house-line"><span>${C}</span><b>${It(j)}</b></div>`;
    return m`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${o ? "true" : "false"} @click=${() => {
      this._houseOpen = o ? this._houseOpen.filter((C) => C !== t.name) : [...this._houseOpen, t.name];
    }}>
          ${this.renderApplianceIcon(t)}
          <span class="bat-col"><span class="bat-label">${this.applianceName(t)}</span><span class="bat-sub">${It(l)}</span></span>
          ${c}
          <svg class="chev ${o ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${o ? m`<div class="house-body">
              ${T ? S(n.house.problem[T.kind], "") : _}
              ${x}
              ${t.running && y !== void 0 ? S(n.house.today, n.house.cyclesCount(y, w === void 0 ? "" : nt(w))) : _}
              ${$}
              ${E === "off" ? S(n.house.plug, n.house.plugOff) : _}
            </div>` : _}
      </div>`;
  }
  /** "Co se dělo": the consumption of the house (without the car and the boiler) in kWh per hour or per day, broken down by the appliances. */
  /** The energy per bin of the statistics of a view: from the counter (the running bin from its 5-minute rows), otherwise from the mean power. */
  houseSeries(t, a) {
    const s = t.at, n = this.houseWindow(a, s), o = n.bins, i = n.start + o * n.step, r = n.step / at, l = Math.min(o - 1, Math.max(0, Math.floor((s - n.start) / n.step))), d = t.parts.energy ?? {}, c = t.parts.power ?? {}, h = t.parts.nowCounters ?? {}, u = t.parts.nowPowers ?? {};
    return { at: s, w: n, n: o, cur: l, counter: (y) => {
      if (!y || !At(d[y], "change")) return;
      const b = Ct(d[y], "change", n.start, i, o, "sum"), p = h[y];
      return At(p, "change") && (b[l] = p.reduce((f, x) => f + (typeof x.change == "number" ? x.change : 0), 0)), b;
    }, meanKwh: (y) => {
      if (!y || !At(c[y], "mean")) return;
      const b = Ct(c[y], "mean", n.start, i, o, "mean").map((f) => f === void 0 ? void 0 : f * r / 1e3), p = u[y];
      if (At(p, "mean")) {
        const f = p, x = f.reduce(($, w) => $ + (typeof w.mean == "number" ? w.mean : 0), 0) / f.length;
        b[l] = x * Math.min(r, Math.max(0, (s - (n.start + l * n.step)) / at)) / 1e3;
      }
      return b;
    } };
  }
  /** The reading of a bar (and the legend at once): the moment and the total, then every part with its colour and its energy. */
  renderReading(t, a, s, n) {
    return m`<div class="house-panel" role="group" aria-label=${t}>
        <div class="house-panel-head"><span>${t}</span><b>${s}\u00a0${nt(a)}\u00a0kWh</b></div>
        ${n.map((o) => m`<div class="house-panel-row"><i style="background:${o.color}"></i><span>${o.name}</span><b>${o.kwh === void 0 ? A : `${nt(o.kwh)} kWh`}</b></div>`)}
      </div>`;
  }
  /**
   * A small trend of today by hours (from midnight to midnight) in the row of an appliance (one colour) or of a group (the appliances
   * of the group stacked, a legend names them): when it was cooking, when it was washing. No axis of values, no reading. Without statistics nothing.
   */
  renderDayChart(t) {
    const a = this.t, s = this._houseData.day;
    if (!s || s.status === "error" || !Object.keys(s.parts).length) return _;
    const { n, counter: o, meanKwh: i } = this.houseSeries(s, "day"), r = t.map((x) => ({ ...x, list: x.energy ? o(x.energy) : i(x.power) })).filter((x) => x.list && x.list.some(($) => typeof $ == "number"));
    if (!r.length) return _;
    const l = (x, $) => x?.[$] ?? 0;
    let d = 0;
    for (let x = 0; x < n; x++) d = Math.max(d, r.reduce(($, w) => $ + l(w.list, x), 0));
    const c = 44, h = 42, u = d > 0 ? me(d) : 0, g = u > 0 ? 36 / u : 0, v = /* @__PURE__ */ new Date();
    v.setHours(0, 0, 0, 0);
    const y = _a({ start: v.getTime(), end: v.getTime() + 24 * at }), b = Z / n, p = b * 0.72, f = Array.from({ length: n }, (x, $) => {
      let w = 0;
      return r.map((E) => {
        const T = l(E.list, $);
        if (T <= 0) return _;
        const S = Math.max(1.5, T * g), C = h - w - S;
        return w += S + 1, K`<rect x=${($ * b + (b - p) / 2).toFixed(1)} y=${C.toFixed(1)} width=${p.toFixed(1)} height=${S.toFixed(1)} style="fill:${E.color}"></rect>`;
      });
    });
    return m`<div class="house-micro">
        <span class="house-micro-cap">${Dt([a.house.chartToday, m`<span class="unit">kWh</span>`])}</span>
        <svg viewBox="0 0 ${Z + Vt} ${c}" role="img" aria-label=${a.house.chartToday}>
          ${y.map((x) => K`<line x1=${x.x} y1="0" x2=${x.x} y2=${h} style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>`)}
          <line x1="0" y1="6" x2=${Z} y2="6" style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>
          <line x1="0" y1=${h} x2=${Z} y2=${h} style="stroke:var(--ed-tick);stroke-width:1.5"></line>
          ${f}
          <text x=${Z + 9} y="10" style="fill:var(--ed-secondary)" font-size="12">${u > 0 ? N(u, u % 1 ? 1 : 0) : ""}</text>
        </svg>
        <div class="bat-axis ticks" aria-hidden="true">${y.map((x) => m`<span style="left:${(x.x / (Z + Vt) * 100).toFixed(1)}%;transform:translateX(${x.x < 8 ? "0" : x.x > Z - 8 ? "-100%" : "-50%"})">${x.text}</span>`)}</div>
        ${r.length > 1 ? m`<div class="house-micro-legend">${r.map((x) => m`<span><i style="background:${x.color}"></i>${x.name}</span>`)}</div>` : _}
      </div>`;
  }
  houseChart(t, a) {
    const s = this.t, n = this._houseData[`hist:${a}`];
    if (!n || n.status === "error" || !Object.keys(n.parts).length) return;
    const o = t.entities, { w: i, n: r, counter: l, meanKwh: d } = this.houseSeries(n, a), c = l(o.pv.total_generation), h = l(o.battery.total_discharge), u = l(o.battery.total_charge), g = l(o.grid.total_import), v = l(o.grid.total_export), y = d(o.wallbox.power), b = d(o.boiler.power);
    if (!c && !h && !u && !g && !v) return;
    const p = (H, I) => H?.[I] ?? 0, f = !y || !b, x = Array.from({ length: r }, (H, I) => Math.max(0, p(c, I) + p(h, I) + p(g, I) - p(u, I) - p(v, I) - p(y, I) - p(b, I))), $ = (H) => {
      const I = H.filter(($t) => !!$t);
      return I.length ? Array.from({ length: r }, ($t, ne) => I.every((Mt) => Mt[ne] === void 0) ? void 0 : I.reduce((Mt, vt) => Mt + (vt[ne] ?? 0), 0)) : void 0;
    }, w = [
      ...this.listed(t).map((H) => ({ name: this.applianceName(H), list: H.energy ? l(H.energy) : d(H.power) })),
      ...t.groups.map((H) => ({ name: this.pickText(H.name) ?? "", list: $(H.appliances.map((I) => I.energy ? l(I.energy) : d(I.power))) }))
    ].map((H, I) => ({ ...H, color: re[I % re.length] })).filter((H) => H.list && H.list.some((I) => typeof I == "number")), E = (H) => Math.max(x[H], w.reduce((I, $t) => I + p($t.list, H), 0));
    let T = 0;
    for (let H = 0; H < r; H++) T = Math.max(T, E(H));
    if (T <= 0) return;
    const S = me(T), C = 220, j = 200, M = 180 / S, L = 0, B = Math.min(18, (Z - L) / r * 0.72), k = (H) => L + (H + 0.5) / r * (Z - L), O = Array.from({ length: r }, (H, I) => {
      let $t = 0;
      const ne = w.reduce((vt, ye) => vt + p(ye.list, I), 0);
      return [...w.map((vt) => ({ value: p(vt.list, I), color: vt.color })), { value: Math.max(0, x[I] - ne), color: "#8E8E93" }].map((vt) => {
        if (vt.value <= 0) return _;
        const ye = Math.max(0.6, vt.value * M), Zs = j - $t - ye;
        return $t += ye + 1, K`<rect x=${(k(I) - B / 2).toFixed(1)} y=${Zs.toFixed(1)} width=${B.toFixed(1)} height=${ye.toFixed(1)} style="fill:${vt.color}"></rect>`;
      });
    }), tt = (H) => {
      const I = i.start + H * i.step;
      return a === "1d" ? `${de(I)} ${st(I)}–${st(I + at)}` : de(I);
    }, R = (H) => Math.max(x[H], w.reduce((I, $t) => I + p($t.list, H), 0)), D = f ? s.house.houseTotal : s.house.sum, U = (H) => `${tt(H)} · ${D} ${nt(R(H))} kWh`, ft = (H) => {
      const I = R(H), $t = w.reduce((Mt, vt) => Mt + p(vt.list, H), 0), ne = w.length ? [...w.map((Mt) => ({ name: Mt.name, kwh: Mt.list?.[H], color: Mt.color })).sort((Mt, vt) => (vt.kwh ?? -1) - (Mt.kwh ?? -1)), { name: s.house.houseRest, kwh: Math.max(0, I - $t), color: "#8E8E93" }] : [];
      return this.renderReading(tt(H), I, D, ne);
    }, St = Array.from({ length: r }, (H, I) => I), mt = w.map((H) => ({ name: H.name, kwh: St.reduce((I, $t) => I + p(H.list, $t), 0), color: H.color })).sort((H, I) => I.kwh - H.kwh), dt = mt.reduce((H, I) => H + I.kwh, 0), Ht = a === "1d" ? this.today(t).house : void 0, se = Math.max(Ht ?? St.reduce((H, I) => H + R(I), 0), dt), Zt = () => this.renderReading(Ba, se, D, w.length ? [...mt, { name: s.house.houseRest, kwh: Math.max(0, se - dt), color: "#8E8E93" }] : []), Ba = a === "1d" ? s.house.today : s.bat.ranges[a], Vs = () => `${Ba} · ${D} ${nt(se)} kWh`, Gs = [c, h, u, g, v].some((H) => H && H[0] === void 0);
    return {
      id: `house-${a}`,
      h: C,
      // The top line is the value `max` exactly (the bars are drawn on the scale of 180 above the base).
      grid: [{ y: j - 180 }, { y: j, strong: !0 }],
      labels: [{ y: j - 180, text: `${S}` }, { y: j, text: "0" }],
      time: { start: i.start, end: i.start + r * i.step, x0: L, x1: Z, slot: i.step },
      valueNum: (H) => (j - H) / 180 * S,
      valueAt: (H) => {
        const I = (j - H) / 180 * S;
        return I % 1 ? nt(I) : N(I);
      },
      body: K`${O}`,
      n: r,
      x: k,
      read: U,
      from: Gs ? s.house.dataFrom(de(i.start)) : s.house.axisFrom[a],
      to: s.house.axisTo,
      fade: 0,
      panel: ft,
      whole: Zt,
      wholeText: Vs()
    };
  }
};
function di(e, t) {
  return { sources: [...yt], sinks: t.slice().sort((a, s) => fe.indexOf(a) - fe.indexOf(s)) };
}
function ci(e, t = fe, a = yt) {
  const s = Math.round(Math.max(116, Math.min(132, e * 0.377))), n = 56, o = 6, i = Math.max(1, t.length), r = i * n + (i - 1) * o, l = Object.fromEntries(t.map((c, h) => [c, n / 2 + h * (n + o)])), d = Object.fromEntries(
    a.map((c, h) => [c, i < 4 ? n / 2 + h * (n + o) : (h + 0.5) * r / yt.length])
  );
  return { width: e, tile: { w: s, h: n }, gap: o, height: r, left: d, right: l, xa: s - 8, xb: e - s + 8 };
}
const ht = (e) => e.toFixed(1);
function hi(e, t, a) {
  const s = e.filter((b) => b.to in t.right);
  if (!s.length) return [];
  const n = (b) => Math.sqrt(b.watts / 1e3), o = (b) => {
    const p = /* @__PURE__ */ new Map();
    for (const f of s) p.set(f[b], (p.get(f[b]) ?? 0) + n(f));
    return p;
  }, i = Math.max(...o("from").values(), ...o("to").values()), r = Math.min(a.maxPxPerKw, 44 / i), l = (b) => Math.max(a.minPx, n(b) * r), d = /* @__PURE__ */ new Map();
  for (const b of yt) {
    const p = s.filter((f) => f.from === b).reduce((f, x) => f + l(x), 0);
    d.set(b, t.left[b] - p / 2);
  }
  const c = /* @__PURE__ */ new Map();
  for (const b of fe.filter((p) => p in t.right)) {
    const p = s.filter((f) => f.to === b).reduce((f, x) => f + l(x), 0);
    c.set(b, t.right[b] - p / 2);
  }
  const h = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (const b of yt)
    for (const p of s.filter((f) => f.from === b).sort((f, x) => t.right[f.to] - t.right[x.to]))
      h.set(p, d.get(b)), d.set(b, d.get(b) + l(p));
  for (const b of fe.filter((p) => p in t.right))
    for (const p of s.filter((f) => f.to === b).sort((f, x) => t.left[f.from] - t.left[x.from]))
      u.set(p, c.get(b)), c.set(b, c.get(b) + l(p));
  const { xa: g, xb: v } = t, y = (g + v) / 2;
  return s.map((b) => {
    const p = l(b), f = h.get(b), x = f + p, $ = u.get(b), w = $ + p;
    return {
      from: b.from,
      to: b.to,
      watts: b.watts,
      thickness: p,
      d: `M${g} ${ht(f)} C${ht(y)} ${ht(f)} ${ht(y)} ${ht($)} ${v} ${ht($)} L${v} ${ht(w)} C${ht(y)} ${ht(w)} ${ht(y)} ${ht(x)} ${g} ${ht(x)} Z`,
      centre: `M${g} ${ht(f + p / 2)} C${ht(y)} ${ht(f + p / 2)} ${ht(y)} ${ht($ + p / 2)} ${v} ${ht($ + p / 2)}`
    };
  });
}
function fs(e) {
  const t = e?.match(/^(\d{1,2}):(\d{2})/);
  return t ? Number(t[1]) * 60 + Number(t[2]) : void 0;
}
function Sa(e, t, a, s, n) {
  if (e(t) !== "on") return;
  const o = fs(e(a)), i = fs(e(s));
  if (o === void 0 || i === void 0 || o === i) return;
  const r = new Date(n), l = r.getHours() * 60 + r.getMinutes();
  if (o < i ? l >= o && l < i : l >= o || l < i) return;
  const c = (h) => st(new Date(r.getFullYear(), r.getMonth(), r.getDate(), Math.floor(h / 60), h % 60).getTime());
  return `${c(o)}–${c(i)}`;
}
function pi(e, t, a, s, n) {
  const o = t.entities.wallbox, i = t.num.flows.idle_threshold;
  if (e(o.block_charging) === "on" && e(o.block_by_automation) !== "on") return s.reasons.blocked;
  if (e(o.block_solar) === "on") return s.reasons.solarBlocked;
  const r = Sa(e, o.window, o.window_start, o.window_end, n);
  if (r) return s.reasons.outsideWindow(r);
  if (a.sun !== void 0)
    return Q(a.sun, i) ? Q(a.boil, i) && e(t.entities.boiler.boost) !== "on" ? s.reasons.waterFirst : Q(a.batIn, i) && (a.soc === void 0 || a.soc < t.num.battery.full) ? s.reasons.batteryCharges : (a.exp ?? 0) >= t.num.wallbox.power_min ? s.reasons.carNotTaking : s.reasons.littleSurplus : s.reasons.noSun;
}
function ui(e, t, a, s, n) {
  const o = t.entities.wallbox;
  if (e(o.block_charging) === "on" && e(o.block_by_automation) !== "on") return a.reasons.blocked;
  if (!(n !== void 0 && Number.isFinite(n) && s - n < t.num.wallbox.boost_grace * 1e3))
    return a.reasons.carNotTaking;
}
function gi(e, t, a, s, n) {
  const o = t.entities.boiler;
  if ((a.exp ?? 0) <= t.num.flows.export_notice || Q(a.boil, t.num.flows.idle_threshold)) return;
  if (e(o.block_solar) === "on") return s.reasons.solarBlocked;
  const i = Sa(e, o.window, o.window_start, o.window_end, n);
  if (i) return s.reasons.outsideWindow(i);
  const r = Number(e(o.target_temperature));
  if (a.boilTemp !== void 0 && Number.isFinite(r) && a.boilTemp >= r - t.num.boiler.hot_margin) return s.reasons.heated;
}
function bi(e, t, a, s) {
  if (a.summary !== s.summary.exportSurplus) return;
  const n = e(t.entities.battery.operation_mode);
  if (n && n !== "general") return s.reasons.inverterMode(s.reasons.inverterModes[n] ?? n);
  if (a.soc !== void 0 && a.soc >= t.num.battery.full) return s.reasons.batteryFull;
}
const et = {
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
}, sa = 42, na = 10, fi = 12, mi = 34, vi = (e) => class extends e {
  onKey(t) {
    t.key === "Escape" && this._houseDetail ? this.closeHouseDetail() : t.key === "Escape" && this._batDetail ? this.closeBatteryDetail(!0) : t.key === "Escape" && this._sunDetail ? this.closeSunDetail() : t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, a) {
    const s = this.t, n = t.entities.wallbox, o = [], i = it(this.hass, n.block_charging) === "on", r = i && it(this.hass, n.block_by_automation) === "on";
    if (i && !r && o.push({ kind: "warn", ...s.alerts.blocked }), it(this.hass, t.entities.boiler.boost) === "on") {
      const l = it(this.hass, t.entities.tank.water_heater);
      o.push({ kind: "warn", title: s.alerts.boostBoiler.title, text: l !== void 0 && l !== "off" ? s.alerts.boostBoilerGas : s.alerts.boostBoiler.text });
    }
    return o.push(...this.houseAlerts(t)), o;
  }
  renderAlerts(t, a) {
    const s = this.alerts(t, a);
    return s.length ? m`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${s.map(
      (n) => m`<li class="alert ${n.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${n.kind === "warn" ? et.alert : et.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${n.title}</span><span class="alert-text">${n.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : _;
  }
  renderElectricity(t, a) {
    const s = a.summarySource ? `var(${Xt[a.summarySource]})` : void 0;
    return m`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(n) => {
      n.stopPropagation(), this.openAll();
    }}>
              ${this.pickText(t.titles.electricity) ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${et.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(this.summaryWithReason(t, a), s)}
        </div>
        ${this.renderFlow(t, a)} ${this._all ? this.renderDayPopup(t, a) : _}
      </section>`;
  }
  /** „Přebytek jde do sítě“ with why the battery does not take it (H8, src/reasons.ts). */
  summaryWithReason(t, a) {
    const s = bi((n) => it(this.hass, n), t, a, this.t);
    return s && a.summary ? [a.summary, s] : a.summary;
  }
  openAll() {
    this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, a) {
    const s = this.t, n = t.entities, o = t.num.scale, i = t.num.flows.idle_threshold, r = a.carLink, l = a.soc, d = l !== void 0 && l <= this.batteryReserve(t), c = (w) => l === void 0 ? void 0 : { f: l / 100, active: w, color: d ? "var(--ed-warning)" : "var(--ed-battery)", a1: d ? 0.5 : 0.58 }, h = (w) => `${s.tileSpoken.batteryState(w)}, ${l === void 0 ? s.noData : s.tileSpoken.chargeLevel(W(l))}${d ? `, ${s.tileSpoken.atReserve}` : ""}`, u = r === "connected" || r === "charging" || Q(a.car, i), g = t.num.water.gauge_min, v = Math.max(t.num.water.gauge_max, V(this.hass, n.boiler.target_temperature) ?? 0), y = a.boilTemp, b = (w) => Q(w, i), p = a.loadShare.house, f = yt.filter((w) => p[w] >= 0.02), x = b(a.other) && f.length ? this.houseBackground(f, p, ot((a.other ?? 0) / o.house, 0, 1)) : void 0, $ = [
      { side: "L", key: "sun", name: s.tile.sun, watts: a.sun, k: (a.sun ?? 0) / o.sun, icon: et.sun, idleIcon: et.moon, idleText: s.idle.sun, aria: a.sun === void 0 ? s.noData : "" },
      { side: "L", key: "bat", name: s.tile.bat, watts: a.batDis, k: (a.batDis ?? 0) / o.battery, icon: et.battery, icon2: et.batteryDown, idleIcon: et.pause, idleText: s.idle.bat, level: c(b(a.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: s.tile.grid, watts: a.imp, k: (a.imp ?? 0) / o.grid, icon: et.grid, idleIcon: et.minus, idleText: s.idle.grid, aria: a.imp === void 0 ? s.noData : b(a.imp) ? s.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: s.tile.house, watts: a.other, k: (a.other ?? 0) / o.house, icon: et.home, idleIcon: et.minus, idleText: s.idle.house, background: x, aria: a.other === void 0 ? s.noData : s.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, a)) {
      const w = u && a.carSoc !== void 0 ? { f: a.carSoc / 100, active: b(a.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      $.push({
        side: "R",
        key: "car",
        name: s.tile.car,
        watts: r === void 0 && a.car === void 0 ? void 0 : a.car ?? 0,
        k: (a.car ?? 0) / o.car,
        icon: et.car,
        idleIcon: r === "disconnected" ? et.minus : et.plug,
        idleText: r === "disconnected" ? s.idle.carDisconnected : r === void 0 ? s.idle.carNoState : s.idle.carConnected,
        level: w,
        aria: [r === void 0 && a.car === void 0 ? s.noData : b(a.car) ? s.tileSpoken.charging : "", u && a.carSoc !== void 0 ? s.tileSpoken.chargeLevel(W(a.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, a)) {
      const w = y === void 0 ? void 0 : { f: ot((y - g) / (v - g), 0, 1), active: b(a.boil), color: "var(--ed-boiler)", a1: 0.5 };
      $.push({
        side: "R",
        key: "boil",
        name: s.tile.boil,
        watts: a.boil,
        k: (a.boil ?? 0) / o.boiler,
        icon: et.therm,
        idleIcon: et.pause,
        idleText: s.idle.boil,
        level: w,
        aria: [y === void 0 ? s.noData : s.tileSpoken.temperature(`${N(y)} °C`), b(a.boil) ? s.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return $.push(
      { side: "R", key: "batIn", name: s.tile.batIn, watts: a.batIn, k: (a.batIn ?? 0) / o.battery, icon: et.battery, icon2: et.batteryBolt, idleIcon: et.pause, idleText: s.idle.batIn, level: c(b(a.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: s.tile.gridOut, watts: a.exp, k: (a.exp ?? 0) / o.grid, icon: et.grid, idleIcon: et.minus, idleText: s.idle.gridOut, aria: a.exp === void 0 ? s.noData : b(a.exp) ? s.tileSpoken.gridExport : "" }
    ), $;
  }
  renderFlow(t, a) {
    const s = t.num.flows.idle_threshold, n = wa(
      [a.sun, a.batDis, a.batIn, a.imp, a.exp, a.other, a.car, a.boil].map((h) => Q(h, s) ? h : void 0),
      t.num.flows.kw_from
    ), o = this.tiles(t, a), i = di(a.flows, o.filter((h) => h.side === "R").map((h) => h.key)), r = ci(this._width, i.sinks, i.sources), l = hi(a.flows, r, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), d = (h) => K`<linearGradient id="rg-${h}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(--band-${h});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(--band-${h});stop-opacity:var(--band-a1)"></stop>
          <stop offset="0.86" style="stop-color:var(--band-${h});stop-opacity:var(--band-a2)"></stop>
          <stop offset="1" style="stop-color:var(--band-${h});stop-opacity:0.2"></stop>
        </linearGradient>`, c = this._pop ? o.find((h) => h.key === this._pop) : void 0;
    return m`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${r.height}px">
        <svg width=${r.width} height=${r.height} viewBox="0 0 ${r.width} ${r.height}" aria-hidden="true">
          <defs>${yt.map(d)}</defs>
          ${l.map((h) => K`<path d=${h.d} fill="url(#rg-${h.from})"></path>`)}
        </svg>
        ${o.map((h) => this.renderTile(h, r, n, t))} ${c ? this.renderTilePopup(c, t, a, n) : _}
      </div>`;
  }
  /** A power "1,37 kW" as the number and a smaller grey unit next to it (uživatel 3. 11. 2026). */
  valueWithUnit(t) {
    const a = /^(.+) (k?W)$/.exec(t);
    return a ? m`${a[1]} <small>${a[2]}</small>` : t;
  }
  houseBackground(t, a, s) {
    const n = t.reduce((d, c) => a[c] > a[d] ? c : d), o = `linear-gradient(${Ae(`var(${Xt[n]})`, Math.round(sa + na * s))}, ${Ae(`var(${Xt[n]})`, Math.round(sa + na * s))}), var(--ed-tile)`;
    if (t.length === 1) return o;
    const i = t.reduce((d, c) => d + a[c], 0);
    let r = 0;
    const l = [];
    return t.forEach((d, c) => {
      const h = r / i * 100;
      r += a[d];
      const u = r / i * 100, g = `var(${Xt[d]})`, v = c === 0 ? `${h}%` : `calc(${h}% + 1px)`, y = c === t.length - 1 ? `${u}%` : `calc(${u}% - 1px)`;
      c > 0 && l.push(`transparent calc(${h}% - 1px) calc(${h}% + 1px)`), l.push(`${g} ${v} ${y}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${o}`;
  }
  tileBackground(t, a, s) {
    const n = `var(${ce[t.key]})`, o = t.level;
    if (o) {
      const i = ot(o.f, 0, 1), r = `${(i * 100).toFixed(1)}%`, l = t.key === "boil", d = o.active ? Ae(o.color, Math.round(o.a1 * 100 + (l ? fi * s : 0))) : "var(--ed-fill-idle)", c = o.active ? ka(o.color, Math.round(14 + (l ? mi * s : 0))) : "var(--ed-tile)";
      return i < 5e-3 ? o.active ? `linear-gradient(${c}, ${c}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${d} 0%, ${d} ${r}, ${c} ${r}, ${c} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (a) {
      const i = Ae(n, Math.round(sa + na * s));
      return `linear-gradient(${i}, ${i}), var(--ed-tile)`;
    }
  }
  renderTile(t, a, s, n) {
    const o = t.watts === void 0, i = Q(t.watts, n.num.flows.idle_threshold), r = t.side === "L" ? 0 : a.width - a.tile.w, l = t.side === "L" ? a.left[t.key] : a.right[t.key], d = ot(t.k, 0, 1), c = o ? A : rt(t.watts, s), h = this.tileBackground(t, i, d), u = `left:${r}px;top:${(l - a.tile.h / 2).toFixed(1)}px;width:${a.tile.w}px;height:${a.tile.h}px;--tc:var(${ce[t.key]});--gr:${(2 + 9 * d).toFixed(1)}px;--ga:${Math.round(30 + 60 * d)}%${h ? `;background:${h}` : ""}`;
    return m`<button
        type="button"
        class="tile ${i ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""} ${!i && t.level && t.level.f >= 5e-3 ? "fill" : ""}"
        data-tile=${t.key}
        style=${u}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${i ? c : o ? A : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${i ? t.icon : t.idleIcon}></path>${i && t.icon2 ? K`<path class="icon2" d=${t.icon2}></path>` : _}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${i ? this.valueWithUnit(c) : o ? A : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
    const a = this._config;
    this._pop === "house" && a && this.freezeHouse(a);
  }
  renderTilePopup(t, a, s, n) {
    if (t.key === "bat" || t.key === "batIn") return this.renderBatteryPopup(t, a, s, n);
    if (t.key === "sun") return this.renderSunPopup(t, a, s, n);
    if (t.key === "house") return this.renderHousePopup(t, a, s);
    const o = this.t, i = a.num.flows.idle_threshold, r = this.today(a), l = (w) => w === void 0 ? A : `${nt(w)} kWh`, d = (w) => w === void 0 ? A : rt(w, n), c = (w) => Q(w, i), h = s.soc, u = h !== void 0 && h <= this.batteryReserve(a), g = (w) => ({
      title: w ? o.tile.bat : o.tile.batIn,
      now: w ? c(s.batDis) ? o.pop.discharging(d(s.batDis)) : s.batDis === void 0 && h === void 0 ? A : o.idle.bat : c(s.batIn) ? o.pop.charging(d(s.batIn)) : s.batIn === void 0 && h === void 0 ? A : o.idle.batIn,
      level: h === void 0 ? void 0 : { label: o.pop.level, text: W(h), percent: h, color: u ? "var(--ed-warning)" : "var(--ed-battery)", note: u ? o.pop.atReserve : "" },
      rows: w ? [{ label: o.pop.rows.discharged, value: l(r.bdis) }] : [{ label: o.pop.rows.charged, value: l(r.bchg) }]
    }), v = (w) => ({
      title: w ? o.tile.gridOut : o.tile.grid,
      now: w ? c(s.exp) ? o.pop.exporting(d(s.exp)) : s.exp === void 0 ? A : o.idle.gridOut : c(s.imp) ? o.pop.importing(d(s.imp)) : s.imp === void 0 ? A : o.idle.grid,
      rows: w ? [{ label: o.pop.rows.exported, value: l(r.gout) }] : [{ label: o.pop.rows.imported, value: l(r.gin) }]
    }), y = s.carLink, b = s.boilTemp, p = a.num.water.gauge_min, f = Math.max(a.num.water.gauge_max, V(this.hass, a.entities.boiler.target_temperature) ?? 0), $ = {
      sun: { title: o.tile.sun, now: c(s.sun) ? d(s.sun) : s.sun === void 0 ? A : o.idle.sun, rows: [{ label: o.pop.rows.produced, value: l(r.pv) }] },
      bat: g(!0),
      batIn: g(!1),
      grid: v(!1),
      gridOut: v(!0),
      house: { title: o.tile.house, now: c(s.other) ? d(s.other) : s.other === void 0 ? A : o.idle.house, rows: [{ label: o.pop.rows.consumed, value: l(r.house) }] },
      car: {
        title: o.tile.car,
        now: c(s.car) ? o.pop.charging(d(s.car)) : y === "connected" || y === "charging" ? o.pop.carConnectedIdle : y === "disconnected" ? o.idle.carDisconnected : A,
        level: s.carSoc !== void 0 && (y === "connected" || y === "charging") ? { label: o.pop.level, text: W(s.carSoc), percent: s.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: o.pop.rows.carCharged, value: l(r.car) }]
      },
      boil: {
        title: o.tile.boil,
        now: c(s.boil) ? o.pop.heating(d(s.boil)) : s.boil === void 0 ? A : o.idle.boil,
        level: b === void 0 ? void 0 : { label: o.pop.temperature, text: `${N(b)} °C`, percent: ot((b - p) / (f - p) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: o.pop.rows.boilerHeated, value: l(r.boil) }]
      }
    }[t.key];
    return m`<ed-sheet open .heading=${$.title} .sub=${$.now} .closeLabel=${o.close} @hdk-close=${() => this.closePop()}><div class="pop">
        ${$.level ? m`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${$.level.label}${$.level.note ? m`<span class="note"> ${$.level.note}</span>` : _}</span>
                <span class="pop-big" style="color:${$.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${$.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${Rs($.level.percent).map((w) => m`<span><i style="width:${w.toFixed(0)}%;background:${$.level.color}"></i></span>`)}</div>
            </div>` : _}
        <div class="pop-rows">${$.rows.map((w) => m`<div class="pop-row"><span>${w.label}</span><b>${w.value}</b></div>`)}</div>
      </div></ed-sheet>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, a) {
    const s = this.t, n = this.today(t), o = (u) => u === void 0 ? A : `${q(Math.max(0, u), 2)} kWh`, i = [n.pv, n.bdis, n.gin], r = i.every((u) => u !== void 0) ? i.reduce((u, g) => u + g, 0) : void 0, l = n.house === void 0 ? void 0 : n.house + n.car + n.boil + n.bchg + n.gout, d = [
      { label: s.tile.sun, color: "var(--ed-sun)", value: n.pv },
      { label: s.pop.fromBattery, color: "var(--ed-battery)", value: n.bdis },
      { label: s.pop.fromGrid, color: "var(--ed-grid)", value: n.gin }
    ], c = [
      { label: s.tile.house, color: "var(--ed-house)", value: n.house },
      { label: s.tile.car, color: "var(--ed-car)", value: n.car },
      { label: s.tile.boil, color: "var(--ed-boiler)", value: n.boil },
      { label: s.pop.toBattery, color: "var(--ed-battery)", value: n.bchg },
      { label: s.tile.gridOut, color: "var(--ed-grid)", value: n.gout }
    ], h = (u, g, v) => m`<div role="list" aria-label=${u} class="day-col">
        <div class="day-total"><span>${u}</span><b>${o(g)}</b></div>
        ${v.map((y) => m`<div role="listitem" class="day-item"><i style="background:${y.color}" aria-hidden="true"></i><span>${y.label}</span><b>${o(y.value)}</b></div>`)}
      </div>`;
    return m`<ed-sheet open .heading=${s.pop.day} .closeLabel=${s.close} @hdk-close=${() => this.closePop()}><div class="pop day">
        <div class="day-cols">${h(s.pop.sources, r, d)} ${h(s.pop.consumption, l, c)}</div>
      </div></ed-sheet>`;
  }
}, Be = 2e4, Ma = /* @__PURE__ */ new Set(["unknown", "unavailable", ""]);
function oa(e, t) {
  let a;
  for (const s of e ?? []) {
    if (s.at > t) break;
    Ma.has(s.state) || (a = s.state);
  }
  return a;
}
function ia(e) {
  const t = [];
  let a;
  for (const s of e ?? [])
    Ma.has(s.state) || s.state === a || (a !== void 0 && t.push({ at: s.at, from: a, to: s.state }), a = s.state);
  return t;
}
function yi(e, t, a, s, n) {
  const o = a.car.info.timeline, i = [], r = (p) => {
    const f = Number(oa(e.target, p + Be));
    return Number.isFinite(f) && f < 100 ? s(f) : void 0;
  };
  let l = !1;
  const d = (e.boost ?? []).find((p) => !Ma.has(p.state));
  d?.state === "on" && d.at < t && i.push({ at: t, kind: "start", text: o.overnight });
  for (const p of ia(e.boost))
    if (p.to === "on") {
      l = oa(e.mode, p.at + Be) === "Auto";
      const f = r(p.at), x = l ? o.houseStart : f ? o.boostTo(f) : o.boostOn;
      i.push({ at: p.at < t ? t : p.at, kind: "start", text: p.at < t ? o.since(x, n(p.at)) : x });
    } else p.to === "off" && i.push({ at: p.at, kind: "end", text: l ? o.houseEnd : o.boostOff, house: l });
  let c;
  for (const p of e.end ?? []) {
    if (p.state === "unknown" || p.state === "unavailable" || p.state === c) continue;
    const f = c === void 0;
    c = p.state;
    const [x, , $, w] = p.state.split("|"), E = a.wallbox.endReason[x];
    if (!E || f && p.at < t) continue;
    const T = [];
    $ !== void 0 && $ !== "" && Number.isFinite(Number($)) && T.push(o.soc(s(Number($)))), w !== void 0 && w !== "" && Number.isFinite(Number(w)) && T.push(o.delivered(w.replace(".", ","))), i.push({ at: p.at, kind: "why", text: E, extra: T });
  }
  for (const p of ia(e.status)) {
    const f = p.to === "Charging" ? o.charging : p.to === "Disconnected" ? o.unplugged : p.from === "Disconnected" ? o.plugged : p.from === "Charging" ? o.stopped : p.to !== "Waiting" ? o.wallbox(p.to) : void 0;
    f && i.push({ at: p.at, kind: "status", text: f });
  }
  for (const p of ia(e.mode)) i.push({ at: p.at, kind: "mode", text: o.mode(a.chargeModes[p.to] ?? p.to) });
  i.sort((p, f) => p.at - f.at);
  const h = { end: 5, start: 4, status: 3, mode: 2, why: 1 }, u = (p) => p.charAt(0).toLocaleLowerCase() + p.slice(1), g = [];
  let v = [];
  const y = () => {
    if (!v.length) return;
    const p = [...v].sort((w, E) => h[E.kind] - h[w.kind])[0], f = v.find((w) => w.kind === "why"), x = p.kind === "end" && f ? `${p.text}: ${f.text}` : p.text, $ = v.filter((w) => w !== p && w.kind !== "why" && !(p.kind === "start" && w.kind === "mode")).map((w) => u(w.text));
    if (f?.extra?.length) $.push(...f.extra);
    else {
      const w = Number(oa(e.soc, p.kind === "end" ? p.at - 1 : v[v.length - 1].at + Be));
      Number.isFinite(w) && $.push(o.soc(s(w)));
    }
    if (v[0].at >= t) {
      const w = v.every((E) => E.kind === "status");
      g.push({ at: v[0].at, title: x, detail: $, statusOnly: w, charging: w && p.text === o.charging });
    }
    v = [];
  };
  for (const p of i)
    v.length && p.at - v[0].at > Be && y(), v.push(p);
  y();
  const b = [];
  for (let p = 0; p < g.length; p++) {
    const f = g[p];
    let x = p;
    for (; x + 1 < g.length && g[x + 1].statusOnly && f.statusOnly; ) x++;
    const $ = g.slice(p, x + 1).filter((w) => w.charging).length;
    x - p >= 2 && $ >= 2 ? (b.push({ at: f.at, title: o.surplusRuns($), detail: [o.until(n(g[x].at))] }), p = x) : b.push({ at: f.at, title: f.title, detail: f.detail });
  }
  return b;
}
const wi = (e) => class extends e {
  constructor() {
    super(...arguments), this._carGesture = new Xe(() => ({
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
    const s = this.t, n = t.entities, o = t.num.flows, i = a.carLink, r = this.chargeMode(t), l = r === "Auto" ? it(this.hass, n.wallbox.step) : void 0, d = this.targetId(t, r), c = d ? Number(this.shown(d)) : NaN, h = Number.isFinite(c) ? c : 100, u = Q(a.car, o.idle_threshold) && i !== "disconnected", g = xa(a.loadShare.car, o, s);
    it(this.hass, n.wallbox.block_charging);
    const v = this.shown(n.wallbox.boost), y = v === "on" ? `var(${Xt[g.main]})` : this.sourceColor(g);
    let b, p;
    const f = r ? r === "Boost" : v === "on", x = f ? [this.boostMark()] : [], $ = m`<span class="auto-mark">${s.car.autoMark}</span>`, w = r ? r === "Přetoky" : v === "off", E = it(this.hass, n.wallbox.shadow) === "on", T = E && (l === "start" || l === "dnes_hotovo") ? `${l}_stin` : l, S = (U) => it(this.hass, U), C = T ? s.car.step[T] : w ? pi(S, t, a, s, this._now) : f && !u ? ui(S, t, s, this._now, Date.parse(pt(this.hass, n.wallbox.boost)?.last_changed ?? "")) : void 0;
    (l === "konci" || S(n.wallbox.block_by_automation) === "on") && i !== "disconnected" ? b = s.car.ending : u ? (b = [s.car.charging(g.text), ...l === "nabiji" ? [$] : x], p = y) : i === "connected" || i === "charging" ? b = C ? [s.car.connected, C, ...x] : [s.car.connectedIdle, ...x] : i === "disconnected" && (b = s.car.disconnected);
    const M = ka(p ?? "#d8d8dc", p ? 42 : 28), L = pt(this.hass, n.car.image)?.attributes?.entity_picture, B = a.carSoc, k = wa([Q(a.car, o.idle_threshold) ? a.car : void 0], o.kw_from), O = h < 100, tt = s.car.chargeLevel(B === void 0 ? s.noData : W(B), O ? W(h) : void 0), R = n.wallbox, D = this.modeControl(t, r, v);
    return m`<section class="panel car-panel" aria-labelledby="h-car">
        <!-- The height does not grow with car.image_scale: the picture of the car has transparent margins, so the space would stay
             empty above the charge (uživatel 16. 11. 2026: „mezera nad 76% je hrozně velká, i když auto je celkem malé“). -->
        <div class="car-top" style="height:${n.wallbox.mode ? 188 : 168}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${M}, transparent)"></div><div class="shadow"></div>
            ${typeof L == "string" && L ? m`<img src=${L} alt="" />` : _}
          </div>
          ${t.carLink ? m`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${s.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(U) => U.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? m`<div class="car-hint" aria-hidden="true">${s.hint.holdOrDouble}</div>` : _}` : _}
          <div class="head">
            <h2 id="h-car">
              <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._carInfo ? "true" : "false"} aria-label="${this.pickText(t.titles.car) ?? s.titles.car}, ${s.car.info.heading}" @click=${() => this.openCarInfo(t)}>
                ${this.pickText(t.titles.car) ?? s.titles.car}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${et.info}></path></svg>
              </button>
            </h2>
            ${this.stateLine(b, p)}
          </div>
          ${this._carInfo ? this.renderCarInfo(t, a, b, p, { chargeMode: r, step: T, shadow: E, charging: u, manualBoost: f }) : _}
          <div class="car-soc">
            <span class="soc">${B === void 0 ? A : N(B)}<small>${this._i18n.percent("")}</small>${B === void 0 ? m`<span class="sr-only">${s.noData}</span>` : _}</span>
            <span class="range">${s.car.range} <b>${a.carRange === void 0 ? A : `${N(a.carRange)} km`}</b></span>
            ${n.wallbox.mode ? this.renderEta(this.eta(t, r, B, a, u)) : _}
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${tt}>
            ${Rs(ot(B ?? 0, 0, 100)).map((U) => m`<span><i style="width:${U.toFixed(1)}%"></i></span>`)}
            ${O ? m`<div class="limit" style="left:${Do(h)}"></div>` : _}
          </div>
        </div>
        ${u ? this.renderCarSources(a, o, rt(a.car ?? 0, k), v === "on") : _}
        ${R.boost ? m`<div class="mode">
              <div class="mode-head"><span id="mode-l">${s.car.mode}</span><span class="mode-sub">${D.value ? (
      // All descriptions in one place, the others invisible: the tallest sets the height, so switching moves nothing (CURRENT_SPEC.md, Klidné přepínání režimů).
      D.subs.map((U, ft) => m`<span class=${D.options[ft].value === D.value ? "shown" : "spare"}>${It(U)}</span>`)
    ) : A}</span></div>
              <ed-segmented
                compact guarded .options=${D.options} .value=${D.value} .pending=${this.isPending(D.id)} label=${s.car.modeLabel} .hint=${s.hint.holdDragOrDouble} ?disabled=${!D.value}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(U) => n.wallbox.mode ? this.setChargeMode(n.wallbox.mode, U.detail.value) : this.setBoost("wallbox", U.detail.value === "on")}
              ></ed-segmented>
              ${this.renderChargeSettings(t, r, f)}
            </div>` : _}
        ${this.carVisible(t, a) ? this.renderWallboxGroup(t, a, u, y, k) : _}
      </section>`;
  }
  /** The mode chosen in Home Assistant (wallbox.mode), undefined without the key or without a known value. */
  chargeMode(t) {
    const a = this.shown(t.entities.wallbox.mode);
    return a === "Přetoky" || a === "Auto" || a === "Boost" ? a : void 0;
  }
  /** „Nabít do“ of the active mode (Auto or Boost); Přetoky has none. */
  targetId(t, a) {
    const s = t.entities.wallbox;
    return a === "Auto" ? s.target_auto : a === "Boost" ? s.target_boost : void 0;
  }
  /**
   * The options of the mode control. With wallbox.mode: Přetoky | Auto | Boost, Auto hidden while the rule only runs in
   * the shadow (wallbox.shadow on), unless Auto is chosen already. Without it: Přetoky | Boost on the Boost switch.
   */
  modeControl(t, a, s) {
    const n = this.t, o = t.entities.wallbox;
    if (!o.mode)
      return { id: o.boost, value: s === "on" || s === "off" ? s : "", options: this.boostOptions, subs: [n.car.modeSurplus, n.car.modeBoost] };
    const i = it(this.hass, o.shadow) === "on" && a !== "Auto", r = [
      { value: "Přetoky", label: n.chargeModes.Přetoky, sub: n.car.modeSurplus },
      { value: "Auto", label: n.chargeModes.Auto, sub: n.car.modeAuto },
      { value: "Boost", label: n.chargeModes.Boost, sub: n.car.modeBoost }
    ].filter((l) => !(i && l.value === "Auto"));
    return { id: o.mode, value: a ?? "", options: r.map(({ value: l, label: d }) => ({ value: l, label: d })), subs: r.map((l) => l.sub) };
  }
  /**
   * „Nabít do“ in % of the car, for Auto and Boost, each mode with its own value (uživatel 15. 11. 2026: „Q273 ano“), with
   * an estimate of the time: (target − charge) × capacity ÷ power; Boost at its power, Auto at the lowest one (power_min).
   */
  renderTargetField(t, a) {
    const s = this.t, n = this.targetId(t, a), o = pt(this.hass, n), i = n ? Number(this.shown(n)) : NaN, r = Number.isFinite(i), l = Tt(o, "min") ?? 50, d = Tt(o, "max") ?? 100, c = Tt(o, "step") ?? 5, h = r ? m`${N(i)}<small>${this._i18n.percent("")}</small>` : A;
    return m`<div class="field">
          <span class="field-label">${s.car.target}</span><span class="field-value">${h}</span>
          <ed-slider
            .min=${l} .max=${d} .step=${c} .value=${r ? i : d}
            label=${s.car.targetLabel} valueText=${r ? W(i) : s.noData}
            minLabel=${W(l)} maxLabel=${W(d)}
            ?disabled=${!r}
            @hdk-change=${(u) => n && this.setInputNumber(n, u.detail.value, s.car.target)}
          ></ed-slider>
        </div>`;
  }
  /**
   * „Kolik % mám a kdy odjedu“ (uživatel 16. 11. 2026) under the charge: the target of the active mode, the time only while
   * charging (at the measured power; waiting, a time would contradict „čeká na slunce“), undefined in Přetoky.
   */
  eta(t, a, s, n, o) {
    const i = this.t, r = this.targetId(t, a), l = r ? Number(this.shown(r)) : NaN;
    if (!Number.isFinite(l) || s === void 0 || n.carLink === "disconnected") return;
    if (l < 100 && s >= l) return { text: i.car.etaReached, toward: !1 };
    const d = l >= 100 ? i.car.etaFull : W(l), c = V(this.hass, t.entities.car.capacity), h = (n.car ?? 0) / 1e3;
    if (!o || c === void 0 || h <= 0) return { text: i.car.eta(d), toward: !0 };
    const u = Math.max(10, Math.round((Math.min(l, 100) - s) / 100 * c * 60 / h / 10) * 10);
    return { text: i.car.eta(d, i.car.duration(Math.floor(u / 60), u % 60)), toward: !0 };
  }
  /** The reserved line; the arrow is drawn, a screen reader hears „cíl“ instead (dashboard-critic 16. 11.). */
  renderEta(t) {
    return t ? m`<span class="eta">${t.toward ? m`<span aria-hidden="true">→ </span><span class="sr-only">${this.t.car.etaLabel} </span>` : _}${t.text}</span>` : m`<span class="eta">\u00a0</span>`;
  }
  /**
   * One row „Nastavení nabíjení 4,2 kW · do 75 %“ that opens the sliders (uživatel 16. 11. 2026: „Režim Boost je moc
   * dominantní“; the pattern of Cílové teploty): the power in Boost, „Nabít do“ in Auto and Boost; no row in Přetoky.
   */
  renderChargeSettings(t, a, s) {
    const n = this.t, o = t.entities.wallbox, i = s && o.charging_power ? V(this.hass, o.charging_power) : void 0, r = s && !!o.charging_power, l = o.mode ? this.targetId(t, a) : void 0, d = r || !!l, c = !!this._open.charge, h = l ? Number(this.shown(l)) : NaN, u = [
      ...r ? [m`${n.car.powerShort} <b>${i === void 0 ? this.noData() : `${N(i * t.num.wallbox.phases / 1e3, 1)} kW`}</b>`] : [],
      ...l ? [m`${n.car.targetShort} <b>${Number.isFinite(h) ? W(h) : this.noData()}</b>`] : []
    ];
    return m`<div class="fold ${d ? "open" : ""}" ?inert=${!d}><div><div class="charge-settings">
        <button type="button" class="rowbtn" aria-expanded=${c ? "true" : "false"} @click=${() => this.toggle("charge")}>
          <span class="rowbtn-title">${n.car.settings}</span>
          <span class="rowbtn-value">${d ? Dt(u, { whole: !0 }) : _}</span>
          <svg class="chevron ${c ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
        </button>
        <div class="fold ${c && d ? "open" : ""}" ?inert=${!c || !d}><div class="charge-fields">
          ${r ? this.renderPowerField(t) : _}
          ${l ? this.renderTargetField(t, a) : _}
        </div></div>
      </div></div></div>`;
  }
  /** Why and when the Boost of the house ended last, only today (attribute posledni_konec of wallbox.step, „code|time“). */
  lastEnd(t) {
    const a = this.lastEndRecord(t);
    if (!(!a || !a.today))
      return [this.t.wallbox.lastEnd(st(a.at)), a.why];
  }
  /** „kód|čas|nabití auta|energie“ of the last end of a Boost (input_text.nabijeni_auta_posledni_konec through wallbox.step). */
  lastEndRecord(t) {
    const a = pt(this.hass, t.entities.wallbox.step)?.attributes?.posledni_konec;
    if (typeof a != "string" || !a.includes("|")) return;
    const [s, n, o, i] = a.split("|"), r = Date.parse(n), l = this.t.wallbox.endReason[s];
    if (!l || !Number.isFinite(r)) return;
    const d = (c) => c !== void 0 && c !== "" && Number.isFinite(Number(c)) ? Number(c) : void 0;
    return { at: r, why: l, today: new Date(r).toDateString() === new Date(this._now).toDateString(), soc: d(o), kwh: d(i) };
  }
  /**
   * „Co se děje s autem“ (uživatel 16. 11. 2026: „Potrebuju videt co se s autem deje. Treba nejake (i) kde se mi zobrazi proc
   * se stala poslední akce a co bude následovat.“): now, the last end of a Boost with its reason, what comes next.
   */
  renderCarInfo(t, a, s, n, o) {
    const i = this.t, r = i.car.info, l = this.lastEndRecord(t), d = a.carSoc, c = this.targetId(t, o.chargeMode), h = c ? Number(this.shown(c)) : NaN, u = Number.isFinite(h) ? h >= 100 ? i.car.etaFull : W(h) : void 0;
    let g;
    if (a.carLink === "disconnected") g = r.nextDisconnected(i.chargeModes[o.chargeMode ?? ""] ?? i.boostOptions.off);
    else if (Number.isFinite(h) && h < 100 && d !== void 0 && d >= h) g = r.nextDone;
    else if (o.manualBoost) g = Number.isFinite(h) && h < 100 ? r.nextBoost(u) : r.nextBoostFull;
    else if (o.chargeMode === "Auto" && o.shadow) g = r.nextShadow;
    else if (o.chargeMode === "Auto") g = o.step === "nabiji" ? r.nextAutoCharging(u ?? i.car.etaFull) : r.nextAutoWait;
    else {
      const $ = V(this.hass, t.entities.wallbox.solar_start), w = `${N(($ !== void 0 ? $ * t.num.wallbox.phases : t.num.wallbox.power_min) / 1e3, 1)} kW`, E = (C) => it(this.hass, C), T = t.entities.wallbox, S = Sa(E, T.window, T.window_start, T.window_end, this._now);
      E(T.block_charging) === "on" && E(T.block_by_automation) !== "on" ? g = r.nextBlocked : E(T.block_solar) === "on" ? g = r.nextSolarBlocked : S ? g = r.nextWindow(S) : (a.soc ?? 0) < t.num.battery.full && a.soc !== void 0 ? g = r.nextBattery(w) : g = r.nextSurplus(w);
    }
    const v = l ? l.today ? st(l.at) : `${Ds(l.at)} ${st(l.at)}` : void 0, y = l ? [
      ...l.soc !== void 0 ? [r.atEnd(W(l.soc))] : [],
      ...l.kwh !== void 0 ? [r.delivered(`${N(l.kwh, 1)} kWh`)] : []
    ] : [], b = l?.soc !== void 0 && d !== void 0 && l.soc - d >= 2 ? r.socDrop(W(l.soc), W(d)) : void 0, p = this._carTimeline, f = p?.status === "ready" ? p.rows : [], x = f.length ? f.map(($) => m`<li class="ev"><time>${st($.at)}</time><span class="line" aria-hidden="true"></span><span class="t"><b>${$.title}</b>${$.detail.length ? m`<span>${$.detail.join(" · ")}</span>` : _}</span></li>`) : p?.status === "loading" || p?.status === "error" ? m`<li class="ev"><time></time><span class="line" aria-hidden="true"></span><span class="t"><span>${p.status === "error" ? r.error : r.loading}</span></span></li>` : l ? m`<li class="ev"><time>${v}</time><span class="line" aria-hidden="true"></span><span class="t"><b>${r.lastEnd(v, l.why)}</b>${y.length ? m`<span>${y.join(" · ")}</span>` : _}</span></li>` : m`<li class="ev"><time></time><span class="line" aria-hidden="true"></span><span class="t"><span>${r.empty}</span></span></li>`;
    return m`<ed-sheet open .heading=${r.heading} .closeLabel=${i.close} @hdk-close=${() => this._carInfo = !1}><div class="pop car-info">
        <ol class="timeline" aria-label=${r.today}>
          ${x}
          <li class="ev now"><span class="when">${r.now}</span><span class="line" aria-hidden="true"></span><span class="t">${this.stateLine(s, n)}${d !== void 0 ? m`<span>${i.car.info.timeline.soc(W(d))}</span>` : _}${b ? m`<span>${b}</span>` : _}</span></li>
          <li class="ev next"><span class="when">${r.next}</span><span class="line" aria-hidden="true"></span><span class="t"><span class="next-text">${g}</span></span></li>
        </ol>
      </div></ed-sheet>`;
  }
  /** Opens „Co se děje s autem“ and reads today's history of the car from the recorder. */
  async openCarInfo(t) {
    this._carInfo = !0;
    const a = this.hass, s = t.entities.wallbox, n = { boost: s.boost, mode: s.mode, status: s.status, end: s.last_end, soc: t.entities.car.state_of_charge, target: s.target_boost }, o = Object.values(n).filter((r) => !!r);
    if (!a || !o.length) return;
    this._carTimeline = { status: "loading", rows: this._carTimeline?.rows ?? [] };
    const i = new Date(this._now);
    i.setHours(0, 0, 0, 0);
    try {
      const r = await a.callWS({
        type: "history/history_during_period",
        // From an hour before midnight, so the state at midnight is known (a Boost that ran over midnight).
        start_time: new Date(i.getTime() - 36e5).toISOString(),
        end_time: (/* @__PURE__ */ new Date()).toISOString(),
        entity_ids: o,
        minimal_response: !0,
        no_attributes: !0,
        significant_changes_only: !1
      }), l = {};
      for (const [d, c] of Object.entries(n))
        c && (l[d] = (r?.[c] ?? []).flatMap((h) => {
          const u = h.lu ?? h.last_updated, g = typeof u == "number" ? u * 1e3 : u ? Date.parse(u) : NaN, v = h.s ?? h.state;
          return Number.isFinite(g) && v !== void 0 ? [{ at: g, state: v }] : [];
        }));
      this._carTimeline = { status: "ready", rows: yi(l, i.getTime(), this.t, (d) => W(d), (d) => st(d)) };
    } catch {
      this._carTimeline = { status: "error", rows: [] };
    }
  }
  renderCarSources(t, a, s, n) {
    const o = this.t, i = o.source, r = t.loadShare.car, l = yt.filter((h) => r[h] > 4e-3), d = To(l.map((h) => r[h])), c = (h) => h === "grid" && !n && r.grid > a.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${Xt[h]})`;
    return m`<div class="mix">
        <div class="mix-head"><span>${o.car.sourcesTitle}</span><span>${s}</span></div>
        <div class="mix-bar" aria-hidden="true">${l.map((h) => m`<div style="flex:${r[h]} 1 0;background:${c(h)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${o.car.sourcesLabel}>
          ${l.map((h, u) => m`<span><i style="background:${c(h)}"></i>${i[h]}<em>${W(d[u])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerField(t) {
    const a = t.entities.wallbox.charging_power;
    if (!a) return _;
    const { phases: s, power_min: n, power_max: o, power_step: i } = t.num.wallbox, r = pt(this.hass, a), l = V(this.hass, a), d = l === void 0 ? void 0 : l * s / 1e3;
    let c = n / 1e3, h = o / 1e3;
    const u = Tt(r, "min"), g = Tt(r, "max");
    return u !== void 0 && (c = Math.max(c, u * s / 1e3)), g !== void 0 && (h = Math.min(h, g * s / 1e3)), m`<div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${d === void 0 ? A : N(d, 1)}<small> kW</small></span>
          <ed-slider
            .min=${c} .max=${h} .step=${i / 1e3} .value=${d ?? c}
            label=${this.t.car.powerLabel} valueText=${d === void 0 ? this.t.noData : `${N(d, 1)} kW`}
            minLabel="${N(c, 1)} kW" maxLabel="${N(h, 1)} kW"
            ?disabled=${d === void 0}
            @hdk-change=${(v) => this.setNumber(a, Math.round(v.detail.value * 1e3 / s), this.t.car.power)}
          ></ed-slider>
        </div>`;
  }
  renderWallboxGroup(t, a, s, n, o) {
    const i = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, d = !!(r.block_charging || r.priority), c = a.carLink, h = s ? (
      // The power is once, at „Odkud auto nabíjí“ (uživatel 16. 11. 2026: „dole ve Wallbox kartě nechat jen stav a poslední aktualizaci“).
      m`${i.wallbox.charging}`
    ) : c === "connected" || c === "charging" ? m`${i.wallbox.idle}` : c === "disconnected" ? m`${i.wallbox.disconnected}` : m`${A}`, u = Zn(it(this.hass, t.entities.car.last_message), this._now, i), g = s ? void 0 : this.lastEnd(t), v = [h, ...g ?? [], ...u ? [i.wallbox.fromCar(u)] : []], y = this.shown(r.block_charging), b = this.shown(r.priority);
    return m`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!d} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${s ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${et.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${i.wallbox.title}</span><span class="row-sub wrap">${v.length > 1 ? Dt(v) : h}</span></span>
            <span></span>
            ${d ? m`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>` : m`<span></span>`}
          </button>
          ${d ? m`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(i.wallbox.block, r.block_charging, y === "on" ? i.wallbox.blockOn : i.wallbox.blockOff, y === "on") : _}
                ${r.priority ? this.switchRow(i.wallbox.priority, r.priority, b === "on" ? i.wallbox.priorityOn : i.wallbox.priorityOff, !1) : _}
              </div></div>` : _}
        </li>
      </ul>`;
  }
}, Oe = 45, jt = 46, xi = 62, $i = 58;
function ra(e, t) {
  let a = 1;
  for (; a < e.length - 1 && t > e[a].temp; ) a++;
  const s = e[a - 1], n = e[a], o = Math.max(0, Math.min(1, (t - s.temp) / (n.temp - s.temp))), i = (d) => [1, 3, 5].map((c) => parseInt(d.slice(c, c + 2), 16)), r = i(s.color), l = i(n.color);
  return `rgb(${[0, 1, 2].map((d) => Math.round(r[d] + (l[d] - r[d]) * o)).join(",")})`;
}
const ue = (e, t) => {
  const a = (135 + 270 * e) * Math.PI / 180;
  return [xi + t * Math.cos(a), $i + t * Math.sin(a)];
}, ki = (e, t) => {
  const [a, s] = ue(e, jt), [n, o] = ue(t, jt);
  return `M${a.toFixed(2)} ${s.toFixed(2)} A${jt} ${jt} 0 0 1 ${n.toFixed(2)} ${o.toFixed(2)}`;
};
function _i(e, t, a, s) {
  const n = e === void 0 ? 0 : Math.max(0, Math.min(1, (e - t) / (a - t))), [o, i] = ue(0, jt), [r, l] = ue(0.5, jt), [d, c] = ue(1, jt), h = (b, p) => `A${jt} ${jt} 0 0 1 ${b.toFixed(2)} ${p.toFixed(2)}`, u = K`<path d=${`M${o.toFixed(2)} ${i.toFixed(2)} ${h(r, l)} ${h(d, c)}`} fill="none" stroke="var(--ed-gauge-track)" stroke-width="10" stroke-linecap="round"></path>`, g = Array.from({ length: Oe }, (b, p) => {
    const f = (p + 0.5) / Oe;
    return e === void 0 || f > n ? null : K`<path d=${ki(p / Oe, Math.min(1, (p + 1) / Oe + 4e-3))} fill="none" stroke=${ra(s, t + f * (a - t))} stroke-width="10"></path>`;
  }), [v, y] = ue(n, jt);
  return K`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${u}${g}
    ${e !== void 0 && n > 0 ? K`<circle cx=${o.toFixed(1)} cy=${i.toFixed(1)} r="5" fill=${ra(s, t)}></circle>` : null}
    ${e !== void 0 && n >= 0.99 ? K`<circle cx=${d.toFixed(1)} cy=${c.toFixed(1)} r="5" fill=${ra(s, a)}></circle>` : null}
    ${e === void 0 ? null : K`<circle class="knob" cx=${v.toFixed(1)} cy=${y.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const Si = (e) => class extends e {
  renderWater(t, a) {
    const s = this.t, n = t.entities, o = t.num.flows, i = Q(a.boil, o.idle_threshold), r = xa(a.loadShare.boil, o, s), l = this.sourceColor(r), c = this.shown(n.boiler.boost) === "on", h = wa([i ? a.boil : void 0], o.kw_from);
    let u;
    if (i) u = [s.water.boilerHeats(r.text), ...c ? [this.boostMark()] : []];
    else if (a.boil !== void 0) {
      const g = c ? void 0 : gi((v) => it(this.hass, v), t, a, s, this._now);
      u = [s.water.noHeating, ...c ? [this.boostMark()] : g ? [g] : []];
    }
    return m`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${this.pickText(t.titles.water) ?? s.titles.water}</h2>${this.stateLine(u, i ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, a, i, l, h)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, a, s, n, o, i = !1) {
    return m`<div class="arc" role="img" aria-label=${o}>
        ${_i(t, a, s, n.tempScale)}
        <div class="arc-num ${i ? "dim" : ""}"><b class=${t === void 0 ? "nodata" : ""}>${t === void 0 ? A : N(t)}</b>${t === void 0 ? m`<span class="sr-only">${this.t.noData}</span>` : m`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${N(a)}</span><span class="arc-max" aria-hidden="true">${N(s)}</span>
      </div>`;
  }
  renderBoilerTile(t, a, s, n, o) {
    const i = this.t, r = t.entities.boiler, l = this.shown(r.boost), d = l === "on", c = V(this.hass, r.target_temperature), h = V(this.hass, r.boost_target_temperature), u = d ? h : c, g = t.num.water.gauge_min, v = Math.max(t.num.water.gauge_max, c ?? 0), y = a.boilTemp, b = !!this._open.targets, p = !!(r.target_temperature || r.boost_target_temperature), f = i.water.boilerLabel(
      y === void 0 ? i.noData : `${N(y)} °C`,
      s ? i.water.heatingWith(rt(a.boil, o)) : i.water.notHeating,
      u === void 0 ? void 0 : `${N(u)} °C`,
      N(g),
      `${N(v)} °C`
    );
    return m`<div class="source">
        <div class="source-top">
          ${this.gauge(y, g, v, t, f)}
          <div class="source-body">
            <div>
              <div class="source-title">${i.water.boilerTitle}</div>
              <div class="source-line">${Dt([
      m`<span class="src ${s ? "tinted" : ""}" style="--c:${s ? n : "var(--ed-secondary)"}">${s ? rt(a.boil, o) : a.boil === void 0 ? this.noData() : i.water.notHeating}</span>`,
      ...u === void 0 ? [] : [m`<span class="dim">${i.water.target(`${N(u)} °C`)}</span>`]
    ])}</div>
            </div>
            ${r.boost ? m`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} .pending=${this.isPending(r.boost)} label=${i.water.boostMode} .hint=${i.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(x) => this.setBoost("boiler", x.detail.value === "on")}
                ></ed-segmented>` : _}
          </div>
        </div>
        ${p ? m`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${b ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${i.water.targets}</span>
                <span class="rowbtn-value">${Dt([
      // On two lines both targets have the unit (uživatel 12. 11. 2026: „A °C bude na obou“).
      m`${i.water.targetFlow} <b>${c === void 0 ? this.noData() : m`${N(c)}<span class="joined-only"> °C</span>`}</b>`,
      m`${i.water.targetBoost} <b>${h === void 0 ? this.noData() : `${N(h)} °C`}</b>`
    ], { whole: !0 })}</span>
                <svg class="chevron ${b ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
              </button>
              <div class="fold ${b ? "open" : ""}" ?inert=${!b}><div>${this.renderTargets(t, c, h)}</div></div>
            </div>` : _}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, a, s) {
    const n = this.t, o = t.entities.boiler, i = t.num.boiler, r = (l, d, c, h, u, g) => {
      if (!l) return _;
      const v = pt(this.hass, l);
      let y = i.target_min, b = i.target_max;
      const p = Tt(v, "min"), f = Tt(v, "max");
      return p !== void 0 && (y = Math.max(y, p)), f !== void 0 && (b = Math.min(b, f)), u !== void 0 && (y = Math.max(y, u)), g !== void 0 && (b = Math.min(b, g)), m`<div class="field">
          <span class="field-label">${c}<span class="hint">${h}</span></span><span class="field-value">${d === void 0 ? A : N(d)}<small> °C</small></span>
          <ed-slider
            .min=${y} .max=${b} .step=${i.target_step} .value=${d ?? y}
            label=${n.water.targetSliderLabel(c)} valueText=${d === void 0 ? n.noData : n.water.targetSliderSpoken(`${d} °C`, c)}
            minLabel="${N(y)} °C" maxLabel="${N(b)} °C"
            ?disabled=${d === void 0}
            @hdk-change=${(x) => this.setNumber(l, x.detail.value, n.water.targetWhat(c))}
          ></ed-slider>
        </div>`;
    };
    return m`<div class="detail">
        ${r(o.target_temperature, a, n.water.targetFlow, n.water.targetFlowHint, s, void 0)}
        ${r(o.boost_target_temperature, s, n.water.targetBoost, n.water.targetBoostHint, void 0, a)}
        <p class="hint">${n.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const a = t.entities.mixing;
    if (!a.valve_c1 && !a.valve_c2) return _;
    const s = qn(this.shown(a.valve_c1), this.shown(a.valve_c2)), n = s === "on", o = !!(a.valve_c1 && a.valve_c2), i = s === "unclear" ? this.t.water.mixingUnclear : s === void 0 ? this.t.noData : "";
    return m`
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${n ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${n ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${n ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${i ? m`<span class="mixcap-note">${i}</span>` : _}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${n} ?disabled=${s === void 0 || !o}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const a = this.t, s = t.entities.tank, n = t.num.tank, o = s.water_heater, i = pt(this.hass, o), r = this.shown(o), l = r === "off", d = r === "heat", c = Tt(i, "temperature"), h = this._tankTemp, u = h && h.id === o ? h.value : c, g = t.num.water.gauge_min, v = Math.max(t.num.water.gauge_max, V(this.hass, t.entities.boiler.target_temperature) ?? 0), y = l ? n.temp_min : u, b = Array.isArray(i?.attributes?.operation_list) ? i.attributes.operation_list : Object.keys(a.tank.modes), p = Object.keys(a.tank.modes).filter((C) => b.includes(C)).map((C) => ({ value: C, label: a.tank.modes[C] })), f = !!this._open.tank, { min: x, max: $ } = this.tankRange(t), w = r === void 0 ? A : a.tank.modes[r] ?? r, E = l ? a.tank.keepsMinimum : d ? void 0 : a.tank.byPlan, T = y === void 0 ? this.noData() : m`<b class=${l ? "off" : ""}>${N(l ? n.temp_min : y)} °C</b>`, S = a.tank.label(
      y === void 0 ? a.tank.settingNoData : l ? a.tank.settingOff(`${N(n.temp_min)} °C`) : a.tank.settingSet(`${N(y)} °C`),
      w,
      N(g),
      `${N(v)} °C`
    );
    return m`<div class="source">
        <div class="source-top">
          ${this.gauge(y, g, v, t, S, l)}
          <div class="source-body">
            <div>
              <div class="source-title">${a.tank.title}</div>
              <div class="source-line">${Dt([m`<span class="src" style="--c:${d ? "var(--ed-text)" : "var(--ed-secondary)"}">${r === void 0 ? this.noData() : w}</span>`, ...r === void 0 || E === void 0 ? [] : [m`<span class="dim">${E}</span>`]])}</div>
            </div>
            ${o ? m`<ed-segmented compact .options=${p} .value=${r ?? ""} .pending=${this.isPending(o)} label=${a.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(C) => this.setTank(o, C.detail.value)}></ed-segmented>` : _}
          </div>
        </div>
        ${o ? m`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${f ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${a.tank.temperature}</span>
                <span class="rowbtn-value">${T}</span>
                <svg class="chevron ${f ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
              </button>
              <div class="fold ${f ? "open" : ""}" ?inert=${!f}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${a.tank.temperature}<span class="hint">${l ? a.tank.hintOff : d ? a.tank.hintManual : a.tank.hintPlan}</span></span>
                    <span class="field-value">${y === void 0 ? A : N(y)}<small> °C</small></span>
                    <ed-slider
                      .min=${x} .max=${$} .step=${n.temp_step} .tickStep=${5} .value=${y ?? x}
                      label=${a.tank.sliderLabel} valueText=${u === void 0 ? a.noData : a.tank.sliderSpoken(`${u} °C`)}
                      minLabel="${N(x)} °C" maxLabel="${N($)} °C"
                      ?disabled=${u === void 0 || l}
                      @hdk-change=${(C) => this.setTankTemperature(o, C.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : _}
      </div>`;
  }
}, ja = class ja extends Si(wi(vi(li(ai(Po(Ao(X))))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return _;
    const a = Kn(this.hass, t, this.t), s = t.colors, n = `--ed-sun:${s.sun};--ed-battery:${s.battery};--ed-grid:${s.grid};--ed-house:${s.house};--ed-car:${s.car};--ed-boiler:${s.boiler};--ed-discharge:${s.discharge};--ed-accent:${s.accent};--ed-warning:${s.warning};--ed-off:${s.neutral}`;
    return this._batDetail ? m`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderBatteryDetail(t, a)}</div>` : this._houseDetail ? m`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderHouseDetail(t, a)}</div>` : this._sunDetail ? m`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderSunDetail(t, a)}</div>` : m`<div class="page" style=${n} @keydown=${this.onKey}>
      <!-- No title: the name of the dashboard is already at the top (uživatel 12. 11. 2026: „nechci title … To zrus“). -->
      ${this.renderAlerts(t, a)} ${this.renderElectricity(t, a)} ${this.renderCar(t, a)}
      ${this.renderWater(t, a)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
ja.styles = [Ss, Xn];
let ca = ja;
Dn("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", ca);
window.customCards = window.customCards ?? [];
window.customCards.some((e) => e.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Ie(jn()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.7.1 · 2026-11-16 12:26 UTC · po ace372f ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
