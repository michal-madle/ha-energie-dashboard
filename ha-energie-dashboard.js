const ze = globalThis, la = ze.ShadowRoot && (ze.ShadyCSS === void 0 || ze.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, da = /* @__PURE__ */ Symbol(), Aa = /* @__PURE__ */ new WeakMap();
let ps = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== da) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (la && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Aa.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Aa.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const us = (a) => new ps(typeof a == "string" ? a : a + "", void 0, da), Nt = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, n, o) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + a[o + 1], a[0]);
  return new ps(e, a, da);
}, Us = (a, t) => {
  if (la) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = ze.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, a.appendChild(s);
  }
}, La = la ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return us(e);
})(a) : a;
const { is: Vs, defineProperty: Gs, getOwnPropertyDescriptor: Ks, getOwnPropertyNames: Zs, getOwnPropertySymbols: Ys, getPrototypeOf: qs } = Object, Ze = globalThis, Ea = Ze.trustedTypes, Xs = Ea ? Ea.emptyScript : "", Js = Ze.reactiveElementPolyfillSupport, ke = (a, t) => a, He = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Xs : null;
      break;
    case Object:
    case Array:
      a = a == null ? a : JSON.stringify(a);
  }
  return a;
}, fromAttribute(a, t) {
  let e = a;
  switch (t) {
    case Boolean:
      e = a !== null;
      break;
    case Number:
      e = a === null ? null : Number(a);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(a);
      } catch {
        e = null;
      }
  }
  return e;
} }, ca = (a, t) => !Vs(a, t), ja = { attribute: !0, type: String, converter: He, reflect: !1, useDefault: !1, hasChanged: ca };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ze.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let le = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ja) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Gs(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = Ks(this.prototype, t) ?? { get() {
      return this[e];
    }, set(i) {
      this[e] = i;
    } };
    return { get: n, set(i) {
      const r = n?.call(this);
      o?.call(this, i), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ja;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const t = qs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const e = this.properties, s = [...Zs(e), ...Ys(e)];
      for (const n of s) this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, n] of e) this.elementProperties.set(s, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const n = this._$Eu(e, s);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const n of s) e.unshift(La(n));
    } else t !== void 0 && e.push(La(t));
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
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Us(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, s);
    if (n !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : He).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), i = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : He;
      this._$Em = n;
      const r = i.fromAttribute(e, o.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const i = this.constructor;
      if (n === !1 && (o = this[t]), s ??= i.getPropertyOptions(t), !((s.hasChanged ?? ca)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: o }, i) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, i ?? e ?? this[t]), o !== !0 || i !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
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
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
le.elementStyles = [], le.shadowRootOptions = { mode: "open" }, le[ke("elementProperties")] = /* @__PURE__ */ new Map(), le[ke("finalized")] = /* @__PURE__ */ new Map(), Js?.({ ReactiveElement: le }), (Ze.reactiveElementVersions ??= []).push("2.1.2");
const ha = globalThis, Ba = (a) => a, Pe = ha.trustedTypes, za = Pe ? Pe.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, gs = "$lit$", Ut = `lit$${Math.random().toFixed(9).slice(2)}$`, bs = "?" + Ut, Qs = `<${bs}>`, te = document, Se = () => te.createComment(""), Me = (a) => a === null || typeof a != "object" && typeof a != "function", pa = Array.isArray, tn = (a) => pa(a) || typeof a?.[Symbol.iterator] == "function", Je = `[ 	
\f\r]`, we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Oa = /-->/g, Na = />/g, Zt = RegExp(`>|${Je}(?:([^\\s"'>=/]+)(${Je}*=${Je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ha = /'/g, Pa = /"/g, fs = /^(?:script|style|textarea|title)$/i, ms = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), f = ms(1), K = ms(2), ge = /* @__PURE__ */ Symbol.for("lit-noChange"), k = /* @__PURE__ */ Symbol.for("lit-nothing"), Ra = /* @__PURE__ */ new WeakMap(), qt = te.createTreeWalker(te, 129);
function vs(a, t) {
  if (!pa(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return za !== void 0 ? za.createHTML(t) : t;
}
const en = (a, t) => {
  const e = a.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = we;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let c, d, h = -1, p = 0;
    for (; p < l.length && (i.lastIndex = p, d = i.exec(l), d !== null); ) p = i.lastIndex, i === we ? d[1] === "!--" ? i = Oa : d[1] !== void 0 ? i = Na : d[2] !== void 0 ? (fs.test(d[2]) && (n = RegExp("</" + d[2], "g")), i = Zt) : d[3] !== void 0 && (i = Zt) : i === Zt ? d[0] === ">" ? (i = n ?? we, h = -1) : d[1] === void 0 ? h = -2 : (h = i.lastIndex - d[2].length, c = d[1], i = d[3] === void 0 ? Zt : d[3] === '"' ? Pa : Ha) : i === Pa || i === Ha ? i = Zt : i === Oa || i === Na ? i = we : (i = Zt, n = void 0);
    const b = i === Zt && a[r + 1].startsWith("/>") ? " " : "";
    o += i === we ? l + Qs : h >= 0 ? (s.push(c), l.slice(0, h) + gs + l.slice(h) + Ut + b) : l + Ut + (h === -2 ? r : b);
  }
  return [vs(a, o + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Te {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, i = 0;
    const r = t.length - 1, l = this.parts, [c, d] = en(t, e);
    if (this.el = Te.createElement(c, s), qt.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = qt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(gs)) {
          const p = d[i++], b = n.getAttribute(h).split(Ut), y = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: y[2], strings: b, ctor: y[1] === "." ? sn : y[1] === "?" ? nn : y[1] === "@" ? on : Ye }), n.removeAttribute(h);
        } else h.startsWith(Ut) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (fs.test(n.tagName)) {
          const h = n.textContent.split(Ut), p = h.length - 1;
          if (p > 0) {
            n.textContent = Pe ? Pe.emptyScript : "";
            for (let b = 0; b < p; b++) n.append(h[b], Se()), qt.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[p], Se());
          }
        }
      } else if (n.nodeType === 8) if (n.data === bs) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(Ut, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += Ut.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = te.createElement("template");
    return s.innerHTML = t, s;
  }
}
function be(a, t, e = a, s) {
  if (t === ge) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = Me(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(a), n._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = be(a, n._$AS(a, t.values), n, s)), t;
}
class an {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? te).importNode(e, !0);
    qt.currentNode = n;
    let o = qt.nextNode(), i = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (i === l.index) {
        let c;
        l.type === 2 ? c = new De(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new rn(o, this, t)), this._$AV.push(c), l = s[++r];
      }
      i !== l?.index && (o = qt.nextNode(), i++);
    }
    return qt.currentNode = te, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class De {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = be(this, t, e), Me(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== ge && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : tn(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && Me(this._$AH) ? this._$AA.nextSibling.data = t : this.T(te.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Te.createElement(vs(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new an(n, this), i = o.u(this.options);
      o.p(e), this.T(i), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Ra.get(t.strings);
    return e === void 0 && Ra.set(t.strings, e = new Te(t)), e;
  }
  k(t) {
    pa(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new De(this.O(Se()), this.O(Se()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Ba(t).nextSibling;
      Ba(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Ye {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = k;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let i = !1;
    if (o === void 0) t = be(this, t, e, 0), i = !Me(t) || t !== this._$AH && t !== ge, i && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = be(this, r[s + l], e, l), c === ge && (c = this._$AH[l]), i ||= !Me(c) || c !== this._$AH[l], c === k ? t = k : t !== k && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    i && !n && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class sn extends Ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
}
class nn extends Ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class on extends Ye {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = be(this, t, e, 0) ?? k) === ge) return;
    const s = this._$AH, n = t === k && s !== k || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== k && (s === k || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class rn {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    be(this, t);
  }
}
const ln = ha.litHtmlPolyfillSupport;
ln?.(Te, De), (ha.litHtmlVersions ??= []).push("3.3.3");
const dn = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new De(t.insertBefore(Se(), o), o, void 0, e ?? {});
  }
  return n._$AI(a), n;
};
const ua = globalThis;
class Lt extends le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = dn(e, this.renderRoot, this.renderOptions);
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
Lt._$litElement$ = !0, Lt.finalized = !0, ua.litElementHydrateSupport?.({ LitElement: Lt });
const cn = ua.litElementPolyfillSupport;
cn?.({ LitElement: Lt });
(ua.litElementVersions ??= []).push("4.2.2");
const hn = { attribute: !0, type: String, converter: He, reflect: !1, hasChanged: ca }, pn = (a = hn, t, e) => {
  const { kind: s, metadata: n } = e;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), s === "setter" && ((a = Object.create(a)).wrapped = !0), o.set(e.name, a), s === "accessor") {
    const { name: i } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(i, l, a, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(i, void 0, a, r), r;
    } };
  }
  if (s === "setter") {
    const { name: i } = e;
    return function(r) {
      const l = this[i];
      t.call(this, r), this.requestUpdate(i, l, a, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function O(a) {
  return (t, e) => typeof e == "object" ? pn(a, t, e) : ((s, n, o) => {
    const i = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), i ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(a, t, e);
}
function Y(a) {
  return O({ ...a, state: !0, attribute: !1 });
}
var un = Object.defineProperty, ve = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && un(t, e, n), n;
};
const xa = class xa extends Lt {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, s = (t - e) / 2, n = 2 * Math.PI * s, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), i = t / 2;
    return f`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
      <svg viewBox="0 0 ${t} ${t}" aria-hidden="true">
        <circle class="track" cx=${i} cy=${i} r=${s} fill="none" stroke-width=${e}></circle>
        <circle
          class="fill"
          cx=${i}
          cy=${i}
          r=${s}
          fill="none"
          stroke-width=${e}
          stroke-linecap="round"
          stroke-dasharray="${(n * o).toFixed(1)} ${n.toFixed(1)}"
          transform="rotate(-90 ${i} ${i})"
        ></circle>
      </svg>
      ${this.num ? f`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? f`<span class="unit">${this.unit}</span>` : k}` : k}
    </div>`;
  }
};
xa.styles = Nt`
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
let Ft = xa;
ve([
  O({ type: Number })
], Ft.prototype, "fraction");
ve([
  O({ type: Number })
], Ft.prototype, "size");
ve([
  O({ type: Number })
], Ft.prototype, "stroke");
ve([
  O()
], Ft.prototype, "num");
ve([
  O()
], Ft.prototype, "unit");
ve([
  O()
], Ft.prototype, "label");
class qe {
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
  tap(t, e) {
    window.clearTimeout(this.timer);
    const s = this.pressing, n = this.fired;
    return this.pressing = !1, this.fired = !1, !s || n ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class ga {
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
const ba = Nt`
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
var gn = Object.defineProperty, wt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && gn(t, e, n), n;
};
const ka = class ka extends Lt {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.pending = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new ga(this), this.nudgeIndex = 0, this.gesture = new qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), s = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, i = this._dragging ? this._dx : o;
    return f`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
        aria-busy=${this.pending ? "true" : k}
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
  onClick(t, e, s) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const n = this.gesture.tap(String(s), t.timeStamp);
    if (this.swallowClick || n === "none") {
      this.swallowClick = !1;
      return;
    }
    n === "double" ? this.select(e) : (this.nudgeIndex = s, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, s = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: s, moved: !1, id: t.pointerId };
    const n = t.target.closest("button[data-index]"), o = n ? Number(n.dataset.index) : -1, i = o >= 0 && o !== s && !this.options[o]?.disabled;
    this.gesture.start(() => {
      i && (this.drag = void 0, this.select(this.options[o].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const s = t.clientX - e.x;
    if (!e.moved && Math.abs(s) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const n = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((n - e.index) * e.width, s)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const s = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const n = this.options[s];
    n && !n.disabled && s !== e.index && this.select(n.value);
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
ka.styles = [
  ba,
  Nt`
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
let ut = ka;
wt([
  O({ attribute: !1 })
], ut.prototype, "options");
wt([
  O()
], ut.prototype, "value");
wt([
  O()
], ut.prototype, "label");
wt([
  O({ type: Boolean })
], ut.prototype, "disabled");
wt([
  O({ type: Boolean, reflect: !0 })
], ut.prototype, "pending");
wt([
  O({ type: Boolean })
], ut.prototype, "compact");
wt([
  O({ type: Boolean })
], ut.prototype, "wrap");
wt([
  O({ type: Boolean })
], ut.prototype, "guarded");
wt([
  O({ type: Number })
], ut.prototype, "holdMs");
wt([
  O({ type: Number })
], ut.prototype, "doubleTapMs");
wt([
  O({ type: Number })
], ut.prototype, "hintSeconds");
wt([
  O()
], ut.prototype, "hint");
wt([
  Y()
], ut.prototype, "_dx");
wt([
  Y()
], ut.prototype, "_dragging");
const bn = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', fn = Nt`
  :host {
    font-family: ${us(bn)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`;
var mn = Object.defineProperty, ae = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && mn(t, e, n), n;
};
const vn = 100, yn = 0.6, wn = 6, _a = class _a extends Lt {
  constructor() {
    super(...arguments), this.open = !1, this.heading = "", this.sub = "", this.closeLabel = "Close", this.wide = !1, this.dragY = 0, this.dragging = !1, this.touchOnSlider = !1, this.keydown = (t) => {
      if (t.key === "Escape") {
        t.stopPropagation(), this.close();
        return;
      }
      if (t.key !== "Tab") return;
      const e = this.focusable();
      if (!e.length) return;
      const s = t.composedPath(), n = e.findIndex((i) => s.includes(i)), o = t.shiftKey ? e[n <= 0 ? e.length - 1 : n - 1] : e[n === -1 || n === e.length - 1 ? 0 : n + 1];
      t.preventDefault(), o.focus();
    }, this.touchStart = (t) => {
      this.touchY = t.touches[0]?.clientY, this.touchOnSlider = t.composedPath().some((e) => e instanceof HTMLElement && (e.localName.endsWith("-slider") || "drag" in e.dataset || e instanceof HTMLInputElement && e.type === "range"));
    }, this.touchMove = (t) => {
      !this.touchOnSlider && t.cancelable && this.cannotScroll(t, (t.touches[0]?.clientY ?? 0) - (this.touchY ?? 0)) && t.preventDefault();
    }, this.wheel = (t) => {
      t.cancelable && !t.ctrlKey && this.cannotScroll(t, -t.deltaY) && t.preventDefault();
    }, this.dragStart = (t) => {
      t.button === 0 && (this.drag = { pointerId: t.pointerId, startY: t.clientY, startTime: performance.now() });
    }, this.dragMove = (t) => {
      const e = this.drag;
      if (!e || e.pointerId !== t.pointerId) return;
      const s = t.clientY - e.startY;
      if (!this.dragging) {
        if (s < wn) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, s);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const s = Math.max(0, t.clientY - e.startY), n = s / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (s > vn || n > yn) ? this.close() : this.dragY = 0;
    };
  }
  willUpdate(t) {
    if (t.has("open") && this.open && !t.get("open")) {
      let e = document.activeElement;
      for (; e?.shadowRoot?.activeElement; ) e = e.shadowRoot.activeElement;
      this.returnFocus = e, this.dragY = 0;
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
    const t = 'button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), [tabindex]:not([tabindex="-1"])', e = (n) => [...n.querySelectorAll("*")].flatMap((o) => [
      ...o.matches(t) ? [o] : [],
      ...o.shadowRoot ? e(o.shadowRoot) : []
    ]), s = this.renderRoot.querySelector(".close");
    return [...s ? [s] : [], ...e(this).filter((n) => n.getClientRects().length > 0)];
  }
  /** `movement` > 0 pulls the content down (towards its top), < 0 up. Outside the sheet nothing scrolls. */
  cannotScroll(t, e) {
    const s = this.renderRoot.querySelector(".panel");
    return !s || !t.composedPath().includes(s) ? !0 : !(s.scrollHeight > s.clientHeight + 1) || e > 0 && s.scrollTop <= 0 || e < 0 && s.scrollTop + s.clientHeight >= s.scrollHeight - 1;
  }
  render() {
    return this.open ? f`<div
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
              ${this.sub ? f`<div class="sub">${this.sub}</div>` : k}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : k;
  }
};
_a.styles = [fn, Nt`
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
let Ot = _a;
ae([
  O({ type: Boolean, reflect: !0 })
], Ot.prototype, "open");
ae([
  O()
], Ot.prototype, "heading");
ae([
  O()
], Ot.prototype, "sub");
ae([
  O()
], Ot.prototype, "closeLabel");
ae([
  O({ type: Boolean })
], Ot.prototype, "wide");
ae([
  Y()
], Ot.prototype, "dragY");
ae([
  Y()
], Ot.prototype, "dragging");
var $n = Object.defineProperty, _t = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && $n(t, e, n), n;
};
const Sa = class Sa extends Lt {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = Math.max(0, Math.min(1, (t - this.min) / e)), n = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${s})`, o = this.mixed && this._drag === void 0 ? this.marks.map((c) => f`<i style="left:${(Math.max(0, Math.min(1, (c - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], i = this.tickStep || this.step || 1, r = Math.floor(e / i + 1e-9) + 1, l = r >= 2 && r <= 40 ? Array.from({ length: r }, (c, d) => f`<i style="left:${(d * i / e * 100).toFixed(2)}%"></i>`) : [];
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
        <div class="ticks" aria-hidden="true">${l}</div>
        ${o.length ? f`<div class="marks" aria-hidden="true">${o}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? f`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
Sa.styles = Nt`
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
let gt = Sa;
_t([
  O({ type: Number })
], gt.prototype, "min");
_t([
  O({ type: Number })
], gt.prototype, "max");
_t([
  O({ type: Number })
], gt.prototype, "step");
_t([
  O({ type: Number })
], gt.prototype, "tickStep");
_t([
  O({ type: Number })
], gt.prototype, "value");
_t([
  O()
], gt.prototype, "label");
_t([
  O()
], gt.prototype, "valueText");
_t([
  O()
], gt.prototype, "minLabel");
_t([
  O()
], gt.prototype, "maxLabel");
_t([
  O({ type: Boolean })
], gt.prototype, "disabled");
_t([
  O({ type: Boolean, reflect: !0 })
], gt.prototype, "mixed");
_t([
  O({ attribute: !1 })
], gt.prototype, "marks");
_t([
  Y()
], gt.prototype, "_drag");
var xn = Object.defineProperty, Ht = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && xn(t, e, n), n;
};
const Ma = class Ma extends Lt {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new ga(this), this.gesture = new qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
        aria-busy=${this.pending ? "true" : k}
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
    const e = this.gesture.tap("switch", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
Ma.styles = [
  ba,
  Nt`
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
let kt = Ma;
Ht([
  O({ type: Boolean })
], kt.prototype, "checked");
Ht([
  O({ type: Boolean })
], kt.prototype, "disabled");
Ht([
  O({ type: Boolean, reflect: !0 })
], kt.prototype, "pending");
Ht([
  O()
], kt.prototype, "label");
Ht([
  O({ type: Boolean })
], kt.prototype, "guarded");
Ht([
  O({ type: Number })
], kt.prototype, "holdMs");
Ht([
  O({ type: Number })
], kt.prototype, "doubleTapMs");
Ht([
  O({ type: Number })
], kt.prototype, "hintSeconds");
Ht([
  O()
], kt.prototype, "hintPlacement");
Ht([
  O()
], kt.prototype, "hint");
function Dt(a, t = {}) {
  return a.length < 2 ? f`${a[0] ?? k}` : f`<span class="joined ${t.whole ? "whole" : ""}">${a.map(
    (e, s) => f`${s ? f`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : k}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function zt(a, t = {}) {
  return Dt(a.split(" · "), t);
}
function ys(a, t) {
  a.querySelectorAll(".joined").forEach((e) => {
    const s = `${t}|${e.textContent}`;
    if (e.dataset.fit === s) return;
    e.classList.remove("stacked", "flow", "probe");
    const n = [...e.querySelectorAll(":scope > .joined-sep")];
    n.forEach((l) => l.classList.remove("break"));
    const o = [...e.querySelectorAll(":scope > .joined-part")], i = o.map((l) => l.getBoundingClientRect());
    if (!i.length || !i[0].width) {
      delete e.dataset.fit;
      return;
    }
    e.dataset.fit = s;
    const r = n.filter((l, c) => i[c + 1].top > i[c].top + 1);
    if (r.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = o.some((c) => c.scrollWidth > c.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), r.forEach((l) => l.classList.add("break"));
    }
  });
}
const ws = Nt`
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
var kn = Object.defineProperty, bt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && kn(t, e, n), n;
};
const Ta = class Ta extends Lt {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.pending = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new ga(this), this.gesture = new qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  /** The state line is text from parts („WindFree · 24°“): it breaks only at the dot, and the dot goes (Text z částí). */
  updated() {
    ys(this.renderRoot, String(Math.round(this.getBoundingClientRect().width)));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.kind === "toggle", e = this.count === void 0 ? null : f`<span class="count">${this.count}</span>`;
    return f`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : k}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : k}
        aria-busy=${this.pending ? "true" : k}
        aria-haspopup=${this.kind === "open" ? "dialog" : k}
        aria-label=${this.label || k}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(s) => this.protected && s.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? f`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : f`<span class="text">${zt(this.text)}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? f`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  /** Opening a popup changes nothing, so an `open` tile is never protected. */
  get protected() {
    return this.guarded && this.kind !== "open";
  }
  emit() {
    this.hints.hide();
    const [t, e] = this.kind === "toggle" ? ["hdk-toggle", { checked: this.state !== "on" }] : this.kind === "open" ? ["hdk-open", {}] : ["hdk-press", {}];
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
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
    const e = this.gesture.tap("tile", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
Ta.styles = [
  ba,
  ws,
  Nt`
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
let ct = Ta;
bt([
  O()
], ct.prototype, "name");
bt([
  O()
], ct.prototype, "text");
bt([
  O({ reflect: !0 })
], ct.prototype, "state");
bt([
  O()
], ct.prototype, "kind");
bt([
  O({ type: Number })
], ct.prototype, "count");
bt([
  O({ type: Boolean, reflect: !0 })
], ct.prototype, "centered");
bt([
  O({ type: Boolean })
], ct.prototype, "disabled");
bt([
  O({ type: Boolean, reflect: !0 })
], ct.prototype, "pending");
bt([
  O({ type: Boolean })
], ct.prototype, "pressed");
bt([
  O()
], ct.prototype, "label");
bt([
  O({ type: Boolean })
], ct.prototype, "guarded");
bt([
  O({ type: Number })
], ct.prototype, "holdMs");
bt([
  O({ type: Number })
], ct.prototype, "doubleTapMs");
bt([
  O({ type: Number })
], ct.prototype, "hintSeconds");
bt([
  O()
], ct.prototype, "hint");
bt([
  O()
], ct.prototype, "hintAlign");
function _n(a) {
  const t = [
    [`${a}-switch`, kt],
    [`${a}-segmented`, ut],
    [`${a}-slider`, gt],
    [`${a}-ring`, Ft],
    [`${a}-tile`, ct],
    [`${a}-sheet`, Ot]
  ];
  for (const [e, s] of t)
    customElements.get(e) || customElements.define(e, s);
}
const Sn = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Mn(a) {
  return Sn.has(a);
}
function pt(a, t) {
  return t ? a?.states?.[t] : void 0;
}
function rt(a, t) {
  const e = pt(a, t)?.state;
  return e === void 0 || Mn(e) ? void 0 : e;
}
function Tn(a, t) {
  const e = rt(a, t);
  if (e === void 0)
    return;
  const s = Number(e);
  return Number.isFinite(s) ? s : void 0;
}
function $s(a) {
  return (a?.locale?.language || a?.language || "").trim();
}
function fa(a) {
  const t = a.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Dn(a, t) {
  return a === "auto" ? fa($s(t)) : a;
}
function Cn() {
  return fa(document.documentElement.lang || navigator.language || "");
}
const Ia = /* @__PURE__ */ new WeakMap(), An = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Ln = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), En = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Qe(a, t) {
  const e = a?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function jn(a, t, e) {
  const s = $s(e).replace("_", "-"), n = s !== "" && fa(s) === t ? s : An[t], o = Qe(e, "number_format"), i = Qe(e, "time_format"), r = Qe(e, "date_format"), l = [t, n, o, i, r].join("|");
  let c = Ia.get(a);
  c || (c = /* @__PURE__ */ new Map(), Ia.set(a, c));
  let d = c.get(l);
  return d || (d = On(a[t], t, n, o, i, r), c.set(l, d)), d;
}
function Bn(a) {
  try {
    return new Intl.NumberFormat(a), a;
  } catch {
    return "en";
  }
}
function zn(a, t) {
  if (a === "12")
    return !0;
  if (a === "24")
    return !1;
  const e = a === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function On(a, t, e, s, n, o) {
  const i = Bn(e), r = s === "system" ? void 0 : s === "none" ? "en-US" : En[s] ?? i, l = s === "none" ? { useGrouping: !1 } : {}, c = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), d = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), b = zn(n, i), y = b ? "h12" : "h23", m = new Intl.DateTimeFormat(i, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: y }), u = new Intl.DateTimeFormat(i, b ? { hour: "numeric", hourCycle: y } : { hour: "2-digit", minute: "2-digit", hourCycle: y }), g = o === "system" ? void 0 : i, v = new Intl.DateTimeFormat(g, { day: "numeric", month: "numeric" }), $ = (w) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return v.format(w);
    const j = v.formatToParts(w), L = j.find((A) => A.type === "literal")?.value ?? "/", M = j[j.length - 1], C = M?.type === "literal" ? M.value : "", E = j.find((A) => A.type === "day")?.value ?? "", _ = j.find((A) => A.type === "month")?.value ?? "";
    return o === "DMY" ? `${E}${L}${_}${C}` : `${_}${L}${E}${C}`;
  }, S = Ln.has(i.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: i,
    t: a,
    one: (w) => c.format(w),
    two: (w) => d.format(w),
    half: (w) => h.format(Math.round(w * 2) / 2),
    tick: (w) => h.format(w),
    whole: (w) => p.format(w),
    percent: (w) => `${w}${S}%`,
    time: (w) => m.format(w),
    hour: (w) => u.format(w),
    day: $
  };
}
const Nn = {
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
    minutes: (a) => `před ${a} min`,
    hours: (a) => `před ${a} h`,
    days: (a) => `před ${a} d`
  },
  // Sources of energy: "ze slunce", "z baterie a sítě" (from-form first, then the form after "a")
  from: { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" },
  alsoFrom: { sun: "slunce", bat: "baterie", grid: "sítě" },
  /** Names of the sources in lists (car sources). */
  source: { sun: "Slunce", bat: "Baterie", grid: "Síť" },
  // Sentence under the heading of Elektřina
  summary: {
    exportSurplus: "Přebytek jde do sítě",
    sunChargesCar: (a) => `Slunce nabíjí ${a ? "baterii i " : ""}auto`,
    sunChargesBattery: "Slunce nabíjí baterii",
    sunCoversHouse: "Slunce pokrývá dům",
    fromGrid: "Dům jede ze sítě",
    fromBattery: "Dům jede z baterie",
    nothing: "Dům nic neodebírá",
    houseTakes: (a) => `Dům bere ${a}`,
    /** The loads that take most of the energy ("Auto a bojler berou ze sítě"). */
    loadsTake: (a, t) => {
      const e = a.map((n) => ({ house: "dům", car: "auto", boil: "bojler" })[n]), s = e.length > 1 ? `${e.slice(0, -1).join(", ")} a ${e[e.length - 1]}` : e[0];
      return `${s.charAt(0).toUpperCase()}${s.slice(1)} ${e.length > 1 ? "berou" : "bere"} ${t}`;
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
    chargeLevel: (a) => `nabití ${a}`,
    temperature: (a) => `teplota ${a}`,
    batteryState: (a) => a ? "vybíjení" : "nabíjení"
  },
  // Popups of the tiles and of the heading
  pop: {
    discharging: (a) => `vybíjí ${a}`,
    charging: (a) => `nabíjí ${a}`,
    importing: (a) => `odebírá ${a}`,
    exporting: (a) => `dodává ${a}`,
    carConnectedIdle: "připojeno, nenabíjí",
    heating: (a) => `ohřev ${a}`,
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
    charging: (a) => `Nabíjí ${a}`,
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
    eta: (a, t) => `${a}${t ? ` za asi ${t}` : ""}`,
    etaFull: "plno",
    etaReached: "nabito do cíle",
    settings: "Nastavení nabíjení",
    // „Co se děje s autem“, the sheet under the title of the car (uživatel 16. 11. 2026).
    info: {
      heading: "Co se děje s autem",
      now: "Teď",
      last: "Naposledy",
      next: "Co dál",
      lastEnd: (a, t) => `Boost skončil ${a}: ${t}`,
      lastNone: "Boost zatím neskončil.",
      atEnd: (a) => `auto ${a}`,
      delivered: (a) => `dodáno ${a}`,
      socDrop: (a, t) => `Při konci ukazoval odhad integrace ${a}, auto teď hlásí ${t}: odhad se po zprávě z auta opravil.`,
      nextBoost: (a) => `Boost skončí, až auto podle odhadu integrace dosáhne ${a}, nebo až wallbox dodá energii na cíl (pojistka). Potom se nabíjení bezpečně ukončí a režim se vrátí, odkud byl Boost zapnutý.`,
      nextBoostFull: "Boost skončí, až auto přestane brát. Potom se nabíjení bezpečně ukončí a režim se vrátí, odkud byl Boost zapnutý.",
      nextSurplus: (a) => `Auto se nabije samo z přetoku, až bude voda dohřátá a přebytek stačí na ${a}.`,
      nextAutoWait: "Dům zapne nabíjení sám, až baterie domu, přebytek a voda splní podmínky pravidla.",
      nextAutoCharging: (a) => `Dům ukončí nabíjení na ${a}, při poklesu baterie domu na dno, nebo když slunce nestačí.`,
      nextShadow: "Pravidlo Auto zatím jen zkouší: nic nezapne, jen zapíše, kdy by nabíjelo.",
      nextDone: "Nic, auto je nabité do cíle.",
      nextDisconnected: "Po připojení auta podle zvoleného režimu."
    },
    targetShort: "do",
    powerShort: "výkon",
    etaLabel: "cíl",
    duration: (a, t) => a ? `${a} h${t ? ` ${t} min` : ""}` : `${t} min`,
    disconnected: "Odpojeno",
    openDashboard: "Otevřít dashboard auta",
    chargeLevel: (a, t) => `Nabití auta ${a}${t === void 0 ? "" : `, cíl ${t}`}`,
    range: "dojezd",
    limit: (a) => `cíl ${a}`,
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
    outsideWindow: (a) => `mimo okno ${a}`,
    noSun: "bez slunce",
    waterFirst: "přetok ohřívá vodu",
    batteryCharges: "slunce nabíjí baterii",
    littleSurplus: "málo přetoku",
    carNotTaking: "auto nebere",
    heated: "nahřáto",
    batteryFull: "baterie plná",
    inverterMode: (a) => `střídač v režimu ${a}`,
    inverterModes: { off_grid: "Off-grid", backup: "Záloha", eco: "Eco", peak_shaving: "Peak shaving" }
  },
  // Wallbox
  wallbox: {
    title: "Wallbox",
    charging: "nabíjí",
    idle: "nenabíjí",
    disconnected: "odpojeno",
    fromCar: (a) => `data auta ${a}`,
    block: "Zablokovat nabíjení",
    blockOn: "Auto nenabíjí, přebytek ohřívá vodu",
    blockOff: "Auto smí nabíjet",
    priority: "Přednost před bojlerem",
    priorityOn: "V režimu Auto auto nečeká na dohřátou vodu",
    priorityOff: "V režimu Auto auto čeká na dohřátou vodu",
    // Why the Boost of the house ended last (input_text.nabijeni_auta_posledni_konec through wallbox.step, „code|time“).
    lastEnd: (a) => `skončilo ${a}`,
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
      energie: "pojistka: wallbox dodal energii na cíl"
    }
  },
  // Hot water panel
  water: {
    boilerHeats: (a) => `Bojler ohřívá ${a}`,
    noHeating: "Bez ohřevu",
    boilerTitle: "Bojler (FVE)",
    notHeating: "neohřívá",
    target: (a) => `cíl ${a}`,
    boilerLabel: (a, t, e, s, n) => `Bojler ${a}, ${t}${e === void 0 ? "" : `, cíl ${e}`}, stupnice ${s} až ${n}`,
    heatingWith: (a) => `ohřívá výkonem ${a}`,
    boostMode: "Režim ohřevu bojleru",
    targets: "Cílové teploty",
    targetFlow: "Přetoky",
    targetBoost: "Boost",
    targetFlowHint: "jen z přebytku",
    targetBoostHint: "i ze sítě a z baterie",
    targetsRule: "Přetoky nesmí být pod Boostem.",
    targetSliderLabel: (a) => `Cíl ohřevu bojleru, ${a}`,
    targetSliderSpoken: (a, t) => `${a}, ${t}`,
    targetWhat: (a) => `Cíl ohřevu bojleru (${a})`,
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
    sliderSpoken: (a) => `${a}, nastavená teplota`,
    label: (a, t, e, s) => `Zásobník, ${a}, režim ${t}, naměřená teplota není, stupnice ${e} až ${s}`,
    settingNoData: "nastavení bez dat",
    settingOff: (a) => `vypnuto, kotel drží ${a}`,
    settingSet: (a) => `nastaveno ${a}`
  },
  // Hints of the protected controls (hold or double tap)
  hint: {
    holdOrDouble: "Podržte nebo klepněte dvakrát.",
    holdDragOrDouble: "Podržte, přetáhněte nebo klepněte dvakrát."
  },
  // Feedback under the card
  feedback: {
    noData: (a) => `${a}: entita nehlásí data, nic jsem neodeslal.`,
    rejected: (a) => `${a}: Home Assistant příkaz nepřijal.`,
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
    running: (a) => `Běží · ${a}`,
    noneHint: (a, t, e) => e ? `Štítek „${a}“ má ${t} zařízení.` : "Home Assistant nepředal registr zařízení a štítků.",
    runningNoCycle: "Odebírá",
    runningLong: (a) => `Běží už ${a}`,
    ended: (a) => `Skončilo · před ${a}`,
    notRunning: "Neběží",
    idle: "neodebírá",
    currentCycle: "Aktuální cyklus",
    chartToday: "Dnes od půlnoci po hodinách",
    lastCycle: "Poslední cyklus",
    endedAt: (a) => `skončil ${a}`,
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
    cyclesCount: (a, t) => `${a} ${a === 1 ? "cyklus" : a >= 2 && a <= 4 ? "cykly" : "cyklů"}${t ? ` · ${t} kWh` : ""}`,
    plug: "Zásuvka",
    plugOff: "vypnuta",
    rangeLabel: "Období",
    houseRest: "Ostatní",
    houseTotal: "Dům (celkem)",
    dataFrom: (a) => `Data od ${a}`,
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
    levelLabel: (a, t) => `Nabití ${a}, rezerva ${t}`,
    fullIn: (a) => `Plná za asi ${a}`,
    lastsFor: (a) => `Vydrží asi ${a}`,
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
    netStored: (a) => `Čistě uloženo ${a}`,
    net: "čistě",
    energyHours: "Energie po hodinách",
    energyDays: "Denní energie",
    kpi: {
      efficiency: "Účinnost cyklu",
      efficiencySub: "vybito ÷ nabito",
      cycles: "Ekvivalentní cykly",
      cyclesSub: (a) => `vybito ÷ ${a}`,
      lowest: "Nejnižší nabití",
      lowestSub: "minimum nabití",
      peak: "Špička výkonu",
      peakSub: "nabíjení i vybíjení",
      over: (a) => `za ${a}`
    },
    bandsTitle: "Čas v pásmech nabití",
    bandsNote: "Podíl času za zvolené období, z historie nabití.",
    health: {
      ok: "Baterie je v pořádku",
      okSub: "Bez chyb a varování",
      error: (a) => `Chyba ${a}`,
      warning: (a) => `Varování ${a}`,
      problemSub: "Podrobnosti v diagnostice",
      noData: "Bez dat",
      noDataSub: "Baterie neposílá data",
      capacity: "Kapacita",
      capacitySub: (a, t) => `využitelná ≈ ${a} z ${t}`,
      balance: "Vyvážení článků",
      balanceSub: "rozdíl nejnižšího a nejvyššího článku",
      words: { good: "Výborné", ok: "Dobré", warn: "Pozor", fault: "Chyba" },
      temperature: "Teplota",
      temperatureSub: (a) => `nejteplejší článek · rozptyl ${a}`,
      battery: "Baterie",
      inverterAir: "Střídač, vzduch",
      inverterRadiator: "Střídač, chladič",
      life: "Životnost",
      cycles: (a) => `${a} cyklů`,
      lifeSub: (a) => `účinnost celkem ${a}`,
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
      excellentZone: (a) => `výborné do ${a}`,
      expand: (a) => `${a}, zobrazit historii`
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
    producingWith: (a) => `Vyrábí · ${a}`,
    powerNow: "Výkon teď",
    flowTitle: "Kam teď slunce jde",
    flowNone: "Slunce nikam nejde",
    soFar: "Dnes zatím",
    ofEstimate: (a) => `z odhadu ≈ ${a}`,
    /** The share of the possible production until now, in the panel "Dnes zatím". */
    ofPossibleSoFar: (a) => `${a} možného do teď`,
    ringLabel: (a) => `Hotovo ${a} odhadu dne`,
    started: "Začala",
    ends: "Skončí asi",
    ended: "Skončila",
    startedLong: "Výroba začala",
    sunrise: (a) => `východ slunce ${a}`,
    sunset: (a) => `západ slunce ${a}`,
    peakToday: "Špička dnes",
    at: (a) => `v ${a}`,
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
      five: (a) => `Pruh ukazuje hodiny dne. Plná žlutá je výkon aspoň ${a}, světlejší žlutá je slabé slunce. Vpravo je odhad v kWh a hodiny s výkonem nad touto hranicí. Čím dál dopředu, tím méně jistě.`,
      eve: "Odhad z předpovědi výroby, z běžné spotřeby domu v tuto dobu (medián posledních dní) a z nastavené metody nabíjení auta. Zpřesňuje se během dne.",
      acc: "Předpověď z rána porovnaná s tím, co se opravdu vyrobilo. Z toho karta počítá, jak moc může být odhad dne vedle."
    },
    weather: { clear: "jasno", partly: "polojasno", cloudy: "zataženo", rain: "déšť", snow: "sníh", fog: "mlha", storm: "bouřky", wind: "vítr" },
    hist: {
      rangeLabel: "Období historie",
      ranges: { "7d": "7 dní", "30d": "30 dní" },
      last: (a) => `Posledních ${a} dní`,
      ofPossible: (a) => `${a} možného`,
      average: (a) => `v průměru ${a} denně`,
      chartTitle: "Výroba po dnech",
      modeLabel: "Zobrazení grafu",
      modes: { total: "Celkem", parts: "Denní doba" },
      production: "Výroba",
      possible: "Možné",
      blocks: ["do 9", "9–11", "11–13", "13–15", "od 15 h"],
      mostIn: (a) => `nejvíc ${a}`,
      best: "Nejlepší den",
      worst: "Nejhorší den",
      peak: "Špička",
      length: "Délka výroby",
      lengthValue: (a) => `${a} h`,
      before7: (a) => `před týdnem ${a} h`,
      before30: (a) => `předchozích 30 dní ${a} h`,
      dayOfPossible: (a, t) => `${a} · ${t} možného`,
      eastWest: "Východ a západ",
      eastWestLabel: (a, t) => `Východ ${a}, západ ${t}`,
      goodDays: "Dobré dny",
      goodOf: (a, t) => `${a} z ${t}`,
      over: (a) => `nad ${a} kWh`,
      accuracyTitle: "Jak se předpověď trefovala",
      accuracyAverage: (a) => `průměrná odchylka, ${a} dní`,
      accuracyLabel: "Předpověď a skutečnost za poslední dny",
      forecast: "Předpověď",
      actual: "Skutečnost"
    },
    outlook: {
      heroTitle: "Dnes celkem, odhad",
      between: (a, t) => `pravděpodobně ${a} až ${t} kWh`,
      certainty: { low: "Jistota nízká", medium: "Jistota střední", high: "Jistota vysoká" },
      fiveTitle: "Pět dní dopředu",
      today: "Dnes",
      strong: (a) => `aspoň ${a}`,
      weak: "slabě",
      below: (a) => `pod ${a}`,
      window: (a, t) => `${a}–${t} h`,
      eveningTitle: "Dnes do večera",
      full: "Baterie plná",
      batteryAt: (a) => `Baterie v ${a}`,
      batteryNow: "Baterie teď",
      sunUntil: (a) => `Slunce do ${a}`,
      houseUntil: (a) => `Dům do ${a}`,
      carSun: "Auto ze slunce",
      dayLength: "Den",
      dayChange: (a) => `${a < 0 ? "−" : "+"}${Math.abs(a)} min za den`,
      bestDay: "Nejlepší den",
      bestSub: (a, t) => `≈ ${a} kWh${t ? ` · ${t}` : ""}`,
      hoursMinutes: (a, t) => `${a} h ${t} min`
    }
  }
}, Hn = {
  title: "Energy",
  cardDescription: "Home energy: flows as a Sankey diagram, the car with its wallbox and hot water (boiler, tank, mixing) with controls.",
  titles: { electricity: "Electricity", car: "BMW i3", water: "Hot water" },
  noData: "no data",
  close: "Close",
  and: "and",
  ago: {
    now: "just now",
    minutes: (a) => `${a} min ago`,
    hours: (a) => `${a} h ago`,
    days: (a) => `${a} d ago`
  },
  from: { sun: "from the sun", bat: "from the battery", grid: "from the grid" },
  alsoFrom: { sun: "the sun", bat: "the battery", grid: "the grid" },
  source: { sun: "Sun", bat: "Battery", grid: "Grid" },
  summary: {
    exportSurplus: "Surplus goes to the grid",
    sunChargesCar: (a) => `The sun charges the ${a ? "battery and the " : ""}car`,
    sunChargesBattery: "The sun charges the battery",
    sunCoversHouse: "The sun covers the house",
    fromGrid: "The house runs on the grid",
    fromBattery: "The house runs on the battery",
    nothing: "The house draws nothing",
    houseTakes: (a) => `The house takes energy ${a}`,
    /** The loads that take most of the energy ("The car and the boiler take energy from the grid"). */
    loadsTake: (a, t) => {
      const e = a.map((n) => `the ${{ house: "house", car: "car", boil: "boiler" }[n]}`), s = e.length > 1 ? `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}` : e[0];
      return `${s.charAt(0).toUpperCase()}${s.slice(1)} ${e.length > 1 ? "take" : "takes"} energy ${t}`;
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
    chargeLevel: (a) => `charge ${a}`,
    temperature: (a) => `temperature ${a}`,
    batteryState: (a) => a ? "discharging" : "charging"
  },
  pop: {
    discharging: (a) => `discharging ${a}`,
    charging: (a) => `charging ${a}`,
    importing: (a) => `importing ${a}`,
    exporting: (a) => `exporting ${a}`,
    carConnectedIdle: "plugged in, not charging",
    heating: (a) => `heating ${a}`,
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
    charging: (a) => `Charging ${a}`,
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
    eta: (a, t) => `${a}${t ? ` in about ${t}` : ""}`,
    etaFull: "full",
    etaReached: "charged to the target",
    settings: "Charging settings",
    info: {
      heading: "What the car is doing",
      now: "Now",
      last: "Last",
      next: "Next",
      lastEnd: (a, t) => `Boost ended ${a}: ${t}`,
      lastNone: "No Boost has ended yet.",
      atEnd: (a) => `car ${a}`,
      delivered: (a) => `delivered ${a}`,
      socDrop: (a, t) => `At the end the integration estimated ${a}, the car now reports ${t}: the estimate was corrected by the car.`,
      nextBoost: (a) => `Boost ends when the car reaches ${a} by the estimate of the integration, or when the wallbox has delivered the energy for the target (safeguard). Then charging ends safely and the mode returns to where Boost was switched on.`,
      nextBoostFull: "Boost ends when the car stops taking power. Then charging ends safely and the mode returns to where Boost was switched on.",
      nextSurplus: (a) => `The car charges by itself from the surplus once the water is hot and the surplus reaches ${a}.`,
      nextAutoWait: "The house starts charging by itself once the house battery, the surplus and the water meet the rule.",
      nextAutoCharging: (a) => `The house ends charging at ${a}, when the house battery falls to its floor, or when the sun is not enough.`,
      nextShadow: "The rule Auto is only on trial: it starts nothing, it only notes when it would charge.",
      nextDone: "Nothing, the car is charged to the target.",
      nextDisconnected: "After plugging in, by the chosen mode."
    },
    targetShort: "to",
    powerShort: "power",
    etaLabel: "target",
    duration: (a, t) => a ? `${a} h${t ? ` ${t} min` : ""}` : `${t} min`,
    disconnected: "Unplugged",
    openDashboard: "Open the car dashboard",
    chargeLevel: (a, t) => `Car charge ${a}${t === void 0 ? "" : `, target ${t}`}`,
    range: "range",
    limit: (a) => `target ${a}`,
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
    outsideWindow: (a) => `outside the window ${a}`,
    noSun: "no sun",
    waterFirst: "the surplus heats the water",
    batteryCharges: "the sun charges the battery",
    littleSurplus: "too little surplus",
    carNotTaking: "the car does not take it",
    heated: "heated",
    batteryFull: "battery full",
    inverterMode: (a) => `inverter in mode ${a}`,
    inverterModes: { off_grid: "Off-grid", backup: "Backup", eco: "Eco", peak_shaving: "Peak shaving" }
  },
  wallbox: {
    title: "Wallbox",
    charging: "charging",
    idle: "not charging",
    disconnected: "unplugged",
    fromCar: (a) => `car data ${a}`,
    block: "Block charging",
    blockOn: "The car does not charge, the surplus heats the water",
    blockOff: "The car may charge",
    priority: "Priority over the boiler",
    priorityOn: "In Auto the car does not wait for hot water",
    priorityOff: "In Auto the car waits for hot water",
    lastEnd: (a) => `ended ${a}`,
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
      energie: "safeguard: the wallbox delivered the energy for the target"
    }
  },
  water: {
    boilerHeats: (a) => `The boiler heats ${a}`,
    noHeating: "Not heating",
    boilerTitle: "Boiler (PV)",
    notHeating: "not heating",
    target: (a) => `target ${a}`,
    boilerLabel: (a, t, e, s, n) => `Boiler ${a}, ${t}${e === void 0 ? "" : `, target ${e}`}, scale ${s} to ${n}`,
    heatingWith: (a) => `heating with ${a}`,
    boostMode: "Boiler heating mode",
    targets: "Target temperatures",
    targetFlow: "Surplus",
    targetBoost: "Boost",
    targetFlowHint: "from the surplus only",
    targetBoostHint: "also from the grid and the battery",
    targetsRule: "Surplus may not be below Boost.",
    targetSliderLabel: (a) => `Boiler heating target, ${a}`,
    targetSliderSpoken: (a, t) => `${a}, ${t}`,
    targetWhat: (a) => `Boiler heating target (${a})`,
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
    sliderSpoken: (a) => `${a}, set temperature`,
    label: (a, t, e, s) => `Tank, ${a}, mode ${t}, no measured temperature, scale ${e} to ${s}`,
    settingNoData: "setting not available",
    settingOff: (a) => `off, the boiler keeps ${a}`,
    settingSet: (a) => `set to ${a}`
  },
  hint: {
    holdOrDouble: "Press and hold, or tap twice.",
    holdDragOrDouble: "Press and hold, drag, or tap twice."
  },
  feedback: {
    noData: (a) => `${a}: the entity reports no data, nothing was sent.`,
    rejected: (a) => `${a}: Home Assistant did not accept the command.`,
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
    running: (a) => `Running · ${a}`,
    noneHint: (a, t, e) => e ? `The label "${a}" has ${t} devices.` : "Home Assistant did not pass the registry of devices and labels.",
    runningNoCycle: "Drawing power",
    runningLong: (a) => `Running for ${a}`,
    ended: (a) => `Finished · ${a} ago`,
    notRunning: "Not running",
    idle: "not drawing",
    currentCycle: "Current cycle",
    chartToday: "Today by hour, from midnight",
    lastCycle: "Last cycle",
    endedAt: (a) => `ended ${a}`,
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
    cyclesCount: (a, t) => `${a} ${a === 1 ? "cycle" : "cycles"}${t ? ` · ${t} kWh` : ""}`,
    plug: "Socket",
    plugOff: "off",
    rangeLabel: "Period",
    houseRest: "Other",
    houseTotal: "House (total)",
    dataFrom: (a) => `Data from ${a}`,
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
    levelLabel: (a, t) => `Charge ${a}, reserve ${t}`,
    fullIn: (a) => `Full in about ${a}`,
    lastsFor: (a) => `Lasts about ${a}`,
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
    netStored: (a) => `Net stored ${a}`,
    net: "net",
    energyHours: "Energy by hour",
    energyDays: "Energy by day",
    kpi: {
      efficiency: "Cycle efficiency",
      efficiencySub: "discharged ÷ charged",
      cycles: "Equivalent cycles",
      cyclesSub: (a) => `discharged ÷ ${a}`,
      lowest: "Lowest charge",
      lowestSub: "minimum charge",
      peak: "Peak power",
      peakSub: "charging and discharging",
      over: (a) => `over ${a}`
    },
    bandsTitle: "Time in charge bands",
    bandsNote: "Share of the time in the chosen period, from the charge history.",
    health: {
      ok: "The battery is fine",
      okSub: "No errors or warnings",
      error: (a) => `Error ${a}`,
      warning: (a) => `Warning ${a}`,
      problemSub: "Details in the diagnostics",
      noData: "No data",
      noDataSub: "The battery sends no data",
      capacity: "Capacity",
      capacitySub: (a, t) => `usable ≈ ${a} of ${t}`,
      balance: "Cell balance",
      balanceSub: "difference between the lowest and the highest cell",
      words: { good: "Excellent", ok: "Good", warn: "Attention", fault: "Fault" },
      temperature: "Temperature",
      temperatureSub: (a) => `warmest cell · spread ${a}`,
      battery: "Battery",
      inverterAir: "Inverter, air",
      inverterRadiator: "Inverter, heatsink",
      life: "Lifetime",
      cycles: (a) => `${a} cycles`,
      lifeSub: (a) => `overall efficiency ${a}`,
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
      excellentZone: (a) => `excellent up to ${a}`,
      expand: (a) => `${a}, show history`
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
    producingWith: (a) => `Producing · ${a}`,
    powerNow: "Power now",
    flowTitle: "Where the sun goes now",
    flowNone: "The sun goes nowhere",
    soFar: "Today so far",
    ofEstimate: (a) => `of ≈ ${a} expected`,
    ofPossibleSoFar: (a) => `${a} of possible so far`,
    ringLabel: (a) => `${a} of the day's estimate done`,
    started: "Started",
    ends: "Ends about",
    ended: "Ended",
    startedLong: "Production started",
    sunrise: (a) => `sunrise ${a}`,
    sunset: (a) => `sunset ${a}`,
    peakToday: "Peak today",
    at: (a) => `at ${a}`,
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
      five: (a) => `The strip shows the hours of the day. Solid yellow is a power of at least ${a}, light yellow is weak sun. On the right are the estimate in kWh and the hours above that limit. The further ahead, the less certain.`,
      eve: "An estimate from the production forecast, the usual consumption of the house at this time (the median of the last days) and the configured way of charging the car. It gets more exact during the day.",
      acc: "The forecast of the morning compared with what was really produced. The card uses it to tell how far off the estimate of the day can be."
    },
    weather: { clear: "clear", partly: "partly cloudy", cloudy: "cloudy", rain: "rain", snow: "snow", fog: "fog", storm: "storms", wind: "windy" },
    hist: {
      rangeLabel: "History period",
      ranges: { "7d": "7 days", "30d": "30 days" },
      last: (a) => `Last ${a} days`,
      ofPossible: (a) => `${a} of possible`,
      average: (a) => `${a} a day on average`,
      chartTitle: "Production by day",
      modeLabel: "Chart view",
      modes: { total: "Total", parts: "Time of day" },
      production: "Production",
      possible: "Possible",
      blocks: ["before 9", "9–11", "11–13", "13–15", "from 15"],
      mostIn: (a) => `most ${a}`,
      best: "Best day",
      worst: "Worst day",
      peak: "Peak",
      length: "Production time",
      lengthValue: (a) => `${a} h`,
      before7: (a) => `a week ago ${a} h`,
      before30: (a) => `the 30 days before ${a} h`,
      dayOfPossible: (a, t) => `${a} · ${t} of possible`,
      eastWest: "East and west",
      eastWestLabel: (a, t) => `East ${a}, west ${t}`,
      goodDays: "Good days",
      goodOf: (a, t) => `${a} of ${t}`,
      over: (a) => `over ${a} kWh`,
      accuracyTitle: "How the forecast did",
      accuracyAverage: (a) => `average deviation, ${a} days`,
      accuracyLabel: "Forecast and actual production of the last days",
      forecast: "Forecast",
      actual: "Actual"
    },
    outlook: {
      heroTitle: "Today in total, estimate",
      between: (a, t) => `probably ${a} to ${t} kWh`,
      certainty: { low: "Certainty low", medium: "Certainty medium", high: "Certainty high" },
      fiveTitle: "Five days ahead",
      today: "Today",
      strong: (a) => `at least ${a}`,
      weak: "weak",
      below: (a) => `under ${a}`,
      window: (a, t) => `${a}–${t} h`,
      eveningTitle: "Today until the evening",
      full: "Battery full",
      batteryAt: (a) => `Battery at ${a}`,
      batteryNow: "Battery now",
      sunUntil: (a) => `Sun until ${a}`,
      houseUntil: (a) => `House until ${a}`,
      carSun: "Car from the sun",
      dayLength: "Day",
      dayChange: (a) => `${a < 0 ? "−" : "+"}${Math.abs(a)} min a day`,
      bestDay: "Best day",
      bestSub: (a, t) => `≈ ${a} kWh${t ? ` · ${t}` : ""}`,
      hoursMinutes: (a, t) => `${a} h ${t} min`
    }
  }
}, Pn = {
  title: "Energi",
  cardDescription: "Hemmets energi: flöden som Sankey-diagram, bilen med laddbox och varmvatten (beredare, tank, blandning) med styrning.",
  titles: { electricity: "El", car: "BMW i3", water: "Varmvatten" },
  noData: "inga data",
  close: "Stäng",
  and: "och",
  ago: {
    now: "just nu",
    minutes: (a) => `för ${a} min sedan`,
    hours: (a) => `för ${a} h sedan`,
    days: (a) => `för ${a} d sedan`
  },
  from: { sun: "från solen", bat: "från batteriet", grid: "från nätet" },
  alsoFrom: { sun: "solen", bat: "batteriet", grid: "nätet" },
  source: { sun: "Sol", bat: "Batteri", grid: "Nät" },
  summary: {
    exportSurplus: "Överskottet går ut på nätet",
    sunChargesCar: (a) => `Solen laddar ${a ? "batteriet och " : ""}bilen`,
    sunChargesBattery: "Solen laddar batteriet",
    sunCoversHouse: "Solen täcker huset",
    fromGrid: "Huset går på nätet",
    fromBattery: "Huset går på batteriet",
    nothing: "Huset drar ingenting",
    houseTakes: (a) => `Huset tar energi ${a}`,
    /** The loads that take most of the energy ("Bilen och beredaren tar energi från nätet"). */
    loadsTake: (a, t) => {
      const e = a.map((n) => ({ house: "huset", car: "bilen", boil: "beredaren" })[n]), s = e.length > 1 ? `${e.slice(0, -1).join(", ")} och ${e[e.length - 1]}` : e[0];
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
    chargeLevel: (a) => `laddning ${a}`,
    temperature: (a) => `temperatur ${a}`,
    batteryState: (a) => a ? "urladdning" : "laddning"
  },
  pop: {
    discharging: (a) => `laddar ur ${a}`,
    charging: (a) => `laddar ${a}`,
    importing: (a) => `köper ${a}`,
    exporting: (a) => `säljer ${a}`,
    carConnectedIdle: "ansluten, laddar inte",
    heating: (a) => `värmer ${a}`,
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
    charging: (a) => `Laddar ${a}`,
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
    eta: (a, t) => `${a}${t ? ` om cirka ${t}` : ""}`,
    etaFull: "fullt",
    etaReached: "laddad till målet",
    settings: "Laddningsinställningar",
    info: {
      heading: "Vad bilen gör",
      now: "Nu",
      last: "Senast",
      next: "Sedan",
      lastEnd: (a, t) => `Boost slutade ${a}: ${t}`,
      lastNone: "Ingen Boost har slutat än.",
      atEnd: (a) => `bil ${a}`,
      delivered: (a) => `levererat ${a}`,
      socDrop: (a, t) => `Vid slutet uppskattade integrationen ${a}, bilen rapporterar nu ${t}: uppskattningen rättades av bilen.`,
      nextBoost: (a) => `Boost slutar när bilen når ${a} enligt integrationens uppskattning, eller när laddboxen har levererat energin för målet (skydd). Sedan avslutas laddningen säkert och läget går tillbaka dit Boost slogs på.`,
      nextBoostFull: "Boost slutar när bilen slutar ta emot. Sedan avslutas laddningen säkert och läget går tillbaka dit Boost slogs på.",
      nextSurplus: (a) => `Bilen laddar själv från överskottet när vattnet är varmt och överskottet räcker till ${a}.`,
      nextAutoWait: "Huset startar laddningen själv när husbatteriet, överskottet och vattnet uppfyller regeln.",
      nextAutoCharging: (a) => `Huset avslutar laddningen vid ${a}, när husbatteriet når sin gräns, eller när solen inte räcker.`,
      nextShadow: "Regeln Auto testas bara: den startar inget, den noterar bara när den skulle ladda.",
      nextDone: "Inget, bilen är laddad till målet.",
      nextDisconnected: "Efter anslutning, enligt valt läge."
    },
    targetShort: "till",
    powerShort: "effekt",
    etaLabel: "mål",
    duration: (a, t) => a ? `${a} h${t ? ` ${t} min` : ""}` : `${t} min`,
    disconnected: "Urkopplad",
    openDashboard: "Öppna bilens dashboard",
    chargeLevel: (a, t) => `Bilens laddning ${a}${t === void 0 ? "" : `, mål ${t}`}`,
    range: "räckvidd",
    limit: (a) => `mål ${a}`,
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
    outsideWindow: (a) => `utanför fönstret ${a}`,
    noSun: "ingen sol",
    waterFirst: "överskottet värmer vattnet",
    batteryCharges: "solen laddar batteriet",
    littleSurplus: "för lite överskott",
    carNotTaking: "bilen tar inte emot",
    heated: "uppvärmt",
    batteryFull: "batteriet fullt",
    inverterMode: (a) => `växelriktaren i läge ${a}`,
    inverterModes: { off_grid: "Off-grid", backup: "Reserv", eco: "Eco", peak_shaving: "Peak shaving" }
  },
  wallbox: {
    title: "Laddbox",
    charging: "laddar",
    idle: "laddar inte",
    disconnected: "urkopplad",
    fromCar: (a) => `bildata ${a}`,
    block: "Blockera laddning",
    blockOn: "Bilen laddar inte, överskottet värmer vattnet",
    blockOff: "Bilen får ladda",
    priority: "Företräde före beredaren",
    priorityOn: "I Auto väntar bilen inte på varmvatten",
    priorityOff: "I Auto väntar bilen på varmvatten",
    lastEnd: (a) => `slutade ${a}`,
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
      energie: "skydd: laddboxen levererade energin för målet"
    }
  },
  water: {
    boilerHeats: (a) => `Beredaren värmer ${a}`,
    noHeating: "Ingen uppvärmning",
    boilerTitle: "Beredare (sol)",
    notHeating: "värmer inte",
    target: (a) => `mål ${a}`,
    boilerLabel: (a, t, e, s, n) => `Beredare ${a}, ${t}${e === void 0 ? "" : `, mål ${e}`}, skala ${s} till ${n}`,
    heatingWith: (a) => `värmer med ${a}`,
    boostMode: "Beredarens värmeläge",
    // A soft hyphen: on 320 px the title breaks as „Mål-“ „temperaturer“ beside the two lines of the value.
    targets: "Mål­temperaturer",
    targetFlow: "Överskott",
    targetBoost: "Boost",
    targetFlowHint: "bara från överskottet",
    targetBoostHint: "även från nätet och batteriet",
    targetsRule: "Överskott får inte ligga under Boost.",
    targetSliderLabel: (a) => `Beredarens måltemperatur, ${a}`,
    targetSliderSpoken: (a, t) => `${a}, ${t}`,
    targetWhat: (a) => `Beredarens måltemperatur (${a})`,
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
    sliderSpoken: (a) => `${a}, inställd temperatur`,
    label: (a, t, e, s) => `Tank, ${a}, läge ${t}, ingen uppmätt temperatur, skala ${e} till ${s}`,
    settingNoData: "inställning saknas",
    settingOff: (a) => `av, pannan håller ${a}`,
    settingSet: (a) => `inställd på ${a}`
  },
  hint: {
    holdOrDouble: "Håll nedtryckt eller tryck två gånger.",
    holdDragOrDouble: "Håll nedtryckt, dra eller tryck två gånger."
  },
  feedback: {
    noData: (a) => `${a}: enheten rapporterar inga data, inget skickades.`,
    rejected: (a) => `${a}: Home Assistant tog inte emot kommandot.`,
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
    running: (a) => `Pågår · ${a}`,
    noneHint: (a, t, e) => e ? `Etiketten "${a}" har ${t} enheter.` : "Home Assistant skickade inte register över enheter och etiketter.",
    runningNoCycle: "Drar ström",
    runningLong: (a) => `Har varit på i ${a}`,
    ended: (a) => `Klar · för ${a} sedan`,
    notRunning: "Går inte",
    idle: "drar ingen ström",
    currentCycle: "Aktuell cykel",
    chartToday: "Idag per timme, från midnatt",
    lastCycle: "Senaste cykel",
    endedAt: (a) => `slutade ${a}`,
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
    cyclesCount: (a, t) => `${a} ${a === 1 ? "cykel" : "cykler"}${t ? ` · ${t} kWh` : ""}`,
    plug: "Uttag",
    plugOff: "av",
    rangeLabel: "Period",
    houseRest: "Övrigt",
    houseTotal: "Hus (totalt)",
    dataFrom: (a) => `Data från ${a}`,
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
    levelLabel: (a, t) => `Laddning ${a}, reserv ${t}`,
    fullIn: (a) => `Full om ungefär ${a}`,
    lastsFor: (a) => `Räcker i ungefär ${a}`,
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
    netStored: (a) => `Netto lagrat ${a}`,
    net: "netto",
    energyHours: "Energi per timme",
    energyDays: "Energi per dag",
    kpi: {
      efficiency: "Cykelverkningsgrad",
      efficiencySub: "urladdat ÷ laddat",
      cycles: "Ekvivalenta cykler",
      cyclesSub: (a) => `urladdat ÷ ${a}`,
      lowest: "Lägsta laddning",
      lowestSub: "lägsta laddningsnivå",
      peak: "Toppeffekt",
      peakSub: "laddning och urladdning",
      over: (a) => `under ${a}`
    },
    bandsTitle: "Tid i laddningsintervall",
    bandsNote: "Andel av tiden under vald period, från laddningshistoriken.",
    health: {
      ok: "Batteriet mår bra",
      okSub: "Inga fel eller varningar",
      error: (a) => `Fel ${a}`,
      warning: (a) => `Varning ${a}`,
      problemSub: "Detaljer i diagnostiken",
      noData: "Inga data",
      noDataSub: "Batteriet skickar inga data",
      capacity: "Kapacitet",
      capacitySub: (a, t) => `användbar ≈ ${a} av ${t}`,
      balance: "Cellbalans",
      balanceSub: "skillnad mellan lägsta och högsta cellen",
      words: { good: "Utmärkt", ok: "Bra", warn: "Obs", fault: "Fel" },
      temperature: "Temperatur",
      temperatureSub: (a) => `varmaste cellen · spridning ${a}`,
      battery: "Batteri",
      inverterAir: "Växelriktare, luft",
      inverterRadiator: "Växelriktare, kylare",
      life: "Livslängd",
      cycles: (a) => `${a} cykler`,
      lifeSub: (a) => `total verkningsgrad ${a}`,
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
      excellentZone: (a) => `utmärkt upp till ${a}`,
      expand: (a) => `${a}, visa historik`
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
    producingWith: (a) => `Producerar · ${a}`,
    powerNow: "Effekt nu",
    flowTitle: "Vart solen går nu",
    flowNone: "Solen går ingenstans",
    soFar: "Idag hittills",
    ofEstimate: (a) => `av ≈ ${a} väntat`,
    ofPossibleSoFar: (a) => `${a} av möjligt hittills`,
    ringLabel: (a) => `${a} av dagens uppskattning klart`,
    started: "Började",
    ends: "Slutar ungefär",
    ended: "Slutade",
    startedLong: "Produktionen började",
    sunrise: (a) => `soluppgång ${a}`,
    sunset: (a) => `solnedgång ${a}`,
    peakToday: "Topp idag",
    at: (a) => `kl. ${a}`,
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
      five: (a) => `Remsan visar dygnets timmar. Full gul är en effekt på minst ${a}, ljusgul är svag sol. Till höger står uppskattningen i kWh och timmarna över gränsen. Ju längre fram, desto osäkrare.`,
      eve: "En uppskattning från produktionsprognosen, husets vanliga förbrukning vid den här tiden (medianen av de senaste dagarna) och det inställda sättet att ladda bilen. Den blir säkrare under dagen.",
      acc: "Morgonens prognos jämförd med vad som verkligen producerades. Kortet räknar ut hur långt fel dagens uppskattning kan vara."
    },
    weather: { clear: "klart", partly: "halvklart", cloudy: "mulet", rain: "regn", snow: "snö", fog: "dimma", storm: "åska", wind: "blåsigt" },
    hist: {
      rangeLabel: "Historikperiod",
      ranges: { "7d": "7 dagar", "30d": "30 dagar" },
      last: (a) => `Senaste ${a} dagarna`,
      ofPossible: (a) => `${a} av möjligt`,
      average: (a) => `${a} per dag i snitt`,
      chartTitle: "Produktion per dag",
      modeLabel: "Diagramvy",
      modes: { total: "Totalt", parts: "Tid på dagen" },
      production: "Produktion",
      possible: "Möjligt",
      blocks: ["före 9", "9–11", "11–13", "13–15", "från 15"],
      mostIn: (a) => `mest ${a}`,
      best: "Bästa dag",
      worst: "Sämsta dag",
      peak: "Topp",
      length: "Produktionstid",
      lengthValue: (a) => `${a} h`,
      before7: (a) => `för en vecka sedan ${a} h`,
      before30: (a) => `30 dagarna före ${a} h`,
      dayOfPossible: (a, t) => `${a} · ${t} av möjligt`,
      eastWest: "Öst och väst",
      eastWestLabel: (a, t) => `Öst ${a}, väst ${t}`,
      goodDays: "Bra dagar",
      goodOf: (a, t) => `${a} av ${t}`,
      over: (a) => `över ${a} kWh`,
      accuracyTitle: "Hur prognosen träffade",
      accuracyAverage: (a) => `genomsnittlig avvikelse, ${a} dagar`,
      accuracyLabel: "Prognos och verklig produktion de senaste dagarna",
      forecast: "Prognos",
      actual: "Verklig"
    },
    outlook: {
      heroTitle: "Idag totalt, uppskattning",
      between: (a, t) => `troligen ${a} till ${t} kWh`,
      certainty: { low: "Säkerhet låg", medium: "Säkerhet medel", high: "Säkerhet hög" },
      fiveTitle: "Fem dagar framåt",
      today: "Idag",
      strong: (a) => `minst ${a}`,
      weak: "svag",
      below: (a) => `under ${a}`,
      window: (a, t) => `${a}–${t} h`,
      eveningTitle: "Idag till kvällen",
      full: "Batteriet fullt",
      batteryAt: (a) => `Batteri kl. ${a}`,
      batteryNow: "Batteri nu",
      sunUntil: (a) => `Sol till ${a}`,
      houseUntil: (a) => `Huset till ${a}`,
      carSun: "Bil från solen",
      dayLength: "Dag",
      dayChange: (a) => `${a < 0 ? "−" : "+"}${Math.abs(a)} min per dag`,
      bestDay: "Bästa dag",
      bestSub: (a, t) => `≈ ${a} kWh${t ? ` · ${t}` : ""}`,
      hoursMinutes: (a, t) => `${a} h ${t} min`
    }
  }
}, Rn = { cs: Nn, en: Hn, sv: Pn };
function Re(a, t) {
  return jn(Rn, a, t);
}
function V(a, t) {
  const e = Tn(a, t);
  if (e !== void 0)
    return pt(a, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let lt = Re("cs"), Ie = "auto";
function In(a, t = "auto") {
  lt = a, Ie = t;
}
function ma(a, t = 1e3) {
  return a.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function xs(a) {
  const t = Ie === "auto" ? Math.abs(Math.round(a * 100) / 100) < 10 ? 2 : Math.abs(Math.round(a * 10) / 10) < 100 ? 1 : 0 : Ie;
  return t === 2 ? lt.two(a) : t === 1 ? lt.one(a) : lt.whole(a);
}
function it(a, t) {
  return t === "kW" ? `${xs(a / 1e3)} kW` : `${lt.whole(Math.round(a))} W`;
}
function N(a, t = 0) {
  return t === 0 ? lt.whole(a) : lt.one(a);
}
function q(a, t) {
  if (t === 0) return lt.whole(a);
  if (t === 1) return lt.one(a);
  if (t === 2) return lt.two(a);
  const e = lt.one(1.5).charAt(1), s = 10 ** t, n = Math.round(Math.abs(a) * s);
  return `${a < 0 && n > 0 ? "−" : ""}${lt.whole(Math.floor(n / s))}${e}${String(n % s).padStart(t, "0")}`;
}
function _e(a) {
  return `${new Intl.DateTimeFormat(lt.locale, { weekday: "short" }).format(a)} ${lt.day(a)}`;
}
function Fn(a) {
  return new Intl.DateTimeFormat(lt.locale, { weekday: "short" }).format(a);
}
function ks(a) {
  return lt.day(a);
}
function de(a) {
  const t = new Intl.DateTimeFormat(lt.locale, { weekday: "long" }).format(a);
  return t.charAt(0).toLocaleUpperCase(lt.locale) + t.slice(1);
}
function ot(a) {
  return lt.time(a);
}
function U(a) {
  return lt.percent(typeof a == "number" ? N(a) : a);
}
function Jt(a, t) {
  const e = pt(a, t), s = rt(a, t);
  if (s === void 0) return;
  const n = Number(s);
  if (!Number.isFinite(n)) return;
  const o = e?.attributes?.unit_of_measurement;
  return o === "Wh" ? n / 1e3 : o === "MWh" ? n * 1e3 : n;
}
function st(a) {
  return a < (Ie === 1 ? 0.05 : 5e-3) ? "0" : xs(a);
}
function Wn(a, t, e) {
  const s = a ? Date.parse(a) : NaN;
  if (!Number.isFinite(s)) return;
  const n = Math.max(0, Math.round((t - s) / 6e4));
  return n < 1 ? e.ago.now : n < 60 ? e.ago.minutes(n) : n < 1440 ? e.ago.hours(Math.round(n / 60)) : e.ago.days(Math.round(n / 1440));
}
const yt = ["sun", "bat", "grid"], fe = ["house", "car", "boil", "batIn", "gridOut"], Ce = (a) => a === void 0 ? void 0 : Math.max(0, a), Q = (a, t) => a !== void 0 && a >= t;
function _s(a) {
  if (a === "Disconnected") return "disconnected";
  if (a === "Waiting") return "connected";
  if (a === "Charging") return "charging";
}
function Un(a, t, e) {
  const s = t.entities, n = t.num.flows.idle_threshold, o = Ce(V(a, s.pv.power)), i = V(a, s.battery.power), r = V(a, s.grid.power), l = Ce(V(a, s.house.power)), c = Ce(V(a, s.wallbox.power)), d = Ce(V(a, s.boiler.power)), h = i === void 0 ? void 0 : Math.max(0, i), p = i === void 0 ? void 0 : Math.max(0, -i), b = r === void 0 ? void 0 : Math.max(0, -r), y = r === void 0 ? void 0 : Math.max(0, r), m = l === void 0 ? void 0 : Math.max(0, l - (c ?? 0) - (d ?? 0)), u = (B) => Q(B, n) ? B : 0, g = { sun: u(o), bat: u(h), grid: u(b) }, v = g.sun + g.bat + g.grid, $ = [
    ["house", m],
    ["car", c],
    ["boil", d],
    ["batIn", p],
    ["gridOut", y]
  ], S = $.reduce((B, [, x]) => B + u(x), 0), w = { sun: 0, bat: 0, grid: 0 };
  for (const B of yt) w[B] = v > 0 ? g[B] * S / v : 0;
  const j = [], L = {}, M = { sun: 0, bat: 0, grid: 0 };
  for (const [B, x] of $) {
    if (!Q(x, n)) continue;
    let z = x;
    const tt = { sun: 0, bat: 0, grid: 0 };
    for (const P of yt) {
      const T = Math.min(w[P], z);
      w[P] -= T, z -= T, tt[P] = T / x, (B === "house" || B === "car" || B === "boil") && (M[P] += T), T > 0.5 && j.push({ from: P, to: B, watts: T });
    }
    L[B] = tt;
  }
  const C = M.sun + M.bat + M.grid, E = { sun: 0, bat: 0, grid: 0 };
  if (C > 0)
    for (const B of yt) E[B] = M[B] / C;
  else if (v > 0)
    for (const B of yt) E[B] = g[B] / v;
  const _ = { house: { ...E }, car: { ...E }, boil: { ...E } };
  for (const B of ["house", "car", "boil"]) {
    const x = L[B];
    x && x.sun + x.bat + x.grid > 0 && (_[B] = x);
  }
  const A = {
    sun: o,
    batDis: h,
    batIn: p,
    imp: b,
    exp: y,
    other: m,
    car: c,
    boil: d,
    share: E,
    loadShare: _,
    flows: j,
    soc: V(a, s.battery.state_of_charge),
    carSoc: V(a, s.car.state_of_charge),
    carRange: V(a, s.car.range),
    boilTemp: V(a, s.boiler.temperature),
    carLink: _s(rt(a, s.wallbox.status))
  };
  return Object.assign(A, Vn(A, t.num.flows, e)), A;
}
function Vn(a, t, e) {
  const s = t.idle_threshold, n = (m) => Q(m, s);
  if ([a.sun, a.batDis, a.imp, a.other].every((m) => m === void 0)) return {};
  if (n(a.sun) && !n(a.imp) && !n(a.batDis)) {
    let m;
    return (a.exp ?? 0) > t.export_notice && !n(a.batIn) ? m = e.summary.exportSurplus : n(a.car) ? m = e.summary.sunChargesCar(n(a.batIn)) : n(a.batIn) ? m = e.summary.sunChargesBattery : m = e.summary.sunCoversHouse, { summary: m, summarySource: "sun" };
  }
  const r = [["house", a.other], ["car", a.car], ["boil", a.boil]].filter(([, m]) => n(m)).map(([m, u]) => [m, u]), l = r.reduce((m, [, u]) => m + u, 0), c = r.filter(([, m]) => m >= t.source_min_share / 100 * l).sort((m, u) => u[1] - m[1]);
  if (c.length && !(c.length === 1 && c[0][0] === "house")) {
    const m = c.reduce((v, [, $]) => v + $, 0), u = { sun: 0, bat: 0, grid: 0 };
    for (const [v, $] of c) for (const S of yt) u[S] += a.loadShare[v][S] * $ / m;
    const g = va(u, t, e);
    return { summary: e.summary.loadsTake(c.map(([v]) => v), g.text), summarySource: g.main };
  }
  const { sun: d, bat: h, grid: p } = a.loadShare.house;
  if (p > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const b = t.source_min_share / 100;
  if (d < b && p < b && h > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const y = Ms(a.loadShare.house, b);
  return y.length ? { summary: e.summary.houseTakes(Ss(y, e)), summarySource: y[0] } : { summary: e.summary.nothing };
}
function Ss(a, t) {
  return t.from[a[0]] + a.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function Ms(a, t) {
  return yt.filter((e) => a[e] >= t).sort((e, s) => a[s] - a[e]);
}
function va(a, t, e) {
  let s = Ms(a, t.source_min_share / 100);
  s.length || (s = ["sun"]);
  const n = a.grid > t.grid_deviation_share / 100;
  return { text: Ss(s, e), main: n ? "grid" : s[0], deviation: n };
}
function Gn(a, t) {
  if (!(a === void 0 || t === void 0))
    return a === "off" && t === "on" ? "on" : a === "on" && t === "off" ? "off" : "unclear";
}
const Kn = Nt`
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
`, Zn = ["cs", "en", "sv"];
class Ts extends Error {
}
function Z(a) {
  throw new Ts(a);
}
function Yn(a, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Ts ? new Error(`${a}: ${e.message}`) : e;
  }
}
function ee(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function $t(a, t) {
  return a == null ? {} : (ee(a) || Z(`"${t}" must be a mapping of keys.`), a);
}
function Gt(a, t, e) {
  for (const s of Object.keys(a))
    t.includes(s) || Z(`${e}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function Qt(a, t, e = {}) {
  if (a == null)
    return;
  const s = typeof a == "string" ? a.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || Z(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !s.startsWith(`${e.domain}.`) && Z(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${s}.`), s;
}
function Fe(a, t) {
  if (a != null) {
    if (typeof a == "string" && a.trim())
      return a.trim();
    if (ee(a) && Object.keys(a).length > 0) {
      const e = Object.entries(a);
      if (e.every(([s, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(s) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([s, n]) => [s, n.trim()]));
    }
    return Z(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function qn(a, t) {
  if (a === void 0 || typeof a == "string")
    return a;
  const e = t.toLowerCase();
  return a[e] ?? a[e.split("-")[0]] ?? a.en ?? Object.values(a)[0];
}
function Fa(a) {
  return a === void 0 ? [] : typeof a == "string" ? [a] : Object.values(a);
}
const Wa = ["auto", ...Zn];
function Xn(a) {
  const t = a ?? "auto";
  return Wa.includes(t) || Z(`language must be one of ${Wa.join(", ")}.`), t;
}
const Xe = {
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
}, Ds = { house: ["label", "default_range", "appliances", "groups"], boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"], forecast: ["default_range"] }, We = ["1d", "7d", "30d"], Cs = "1d", Jn = "appliances", Ua = ["7d", "30d"], Qn = "7d", Va = ["always", "heating"], to = "heating", Ga = ["auto", 1, 2], eo = "auto", As = Object.keys(Xe), F = (a, t, e, s, n = !1) => ({ value: a, min: t, max: e, what: s, integer: n }), ya = {
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
}, Oe = {
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
}, ao = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], oa = ["electricity", "car", "water"];
[
  ...As.flatMap((a) => Object.keys(Xe[a]).map((t) => `${a}.${t}`)),
  ...Object.entries(ya).flatMap(([a, t]) => Object.keys(t).map((e) => `${a}.${e}`)),
  ...oa.map((a) => `titles.${a}`),
  ...Object.keys(Oe).map((a) => `colors.${a}`)
];
function so(a, t) {
  const e = $t(a[t], t), s = Xe[t], n = [...Object.keys(ya[t] ?? {}), ...Ds[t] ?? []];
  Gt(e, [...Object.keys(s), ...n], t);
  const o = {};
  for (const [i, r] of Object.entries(s)) {
    const l = Qt(e[i], `${t}.${i}`, { domain: r });
    l && (o[i] = l);
  }
  return o;
}
function no(a) {
  const t = {};
  for (const [e, s] of Object.entries(ya)) {
    const n = $t(a[e], e), o = Object.keys(Xe[e] ?? {});
    Gt(n, [...o, ...Object.keys(s), ...Ds[e] ?? []], e), t[e] = {};
    for (const [i, r] of Object.entries(s)) {
      const l = n[i], c = `${e}.${i}`;
      if (l == null) {
        t[e][i] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && Z(`${c} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && Z(`${c} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][i] = l;
    }
  }
  return t;
}
function oo(a) {
  const t = $t(a.colors, "colors");
  Gt(t, [...Object.keys(Oe), "temp_scale"], "colors");
  const e = { ...Oe };
  for (const s of Object.keys(Oe)) {
    const n = t[s];
    n != null && ((typeof n != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.trim())) && Z(`colors.${s} must be a colour like #FFD60A (six hex digits).`), e[s] = n.trim().toUpperCase());
  }
  return e;
}
function io(a) {
  const t = $t(a.colors, "colors").temp_scale;
  if (t == null)
    return ao.map((n) => ({ ...n }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && Z(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const s = t.map((n, o) => (ee(n) || Z(`${e}[${o}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Gt(n, ["temp", "color"], `${e}[${o}]`), (typeof n.temp != "number" || !Number.isFinite(n.temp)) && Z(`${e}[${o}].temp must be a number (°C).`), (typeof n.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.color.trim())) && Z(`${e}[${o}].color must be a colour like #0A84FF (six hex digits).`), { temp: n.temp, color: n.color.trim().toUpperCase() }));
  return s.forEach((n, o) => {
    o > 0 && n.temp <= s[o - 1].temp && Z(`${e}: temperatures must rise (${s[o - 1].temp} is followed by ${n.temp}).`);
  }), s;
}
function ro(a) {
  const t = $t(a.boiler, "boiler").show;
  return t == null ? to : ((typeof t != "string" || !Va.includes(t)) && Z(`boiler.show must be one of ${Va.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function lo(a) {
  const t = $t(a.battery, "battery").default_range;
  return t == null ? Cs : ((typeof t != "string" || !We.includes(t)) && Z(`battery.default_range must be one of ${We.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function co(a) {
  const t = $t(a.forecast, "forecast").default_range;
  return t == null ? Qn : ((typeof t != "string" || !Ua.includes(t)) && Z(`forecast.default_range must be one of ${Ua.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function ho(a) {
  const t = $t(a.house, "house").label;
  return t == null ? Jn : ((typeof t != "string" || t.trim() === "") && Z("house.label must be a non-empty text (the label of the appliances in Home Assistant)."), t.trim());
}
function po(a) {
  const t = $t(a.house, "house").default_range;
  return t == null ? Cs : ((typeof t != "string" || !We.includes(t)) && Z(`house.default_range must be one of ${We.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const uo = "mdi:power-plug";
function go(a) {
  const t = $t(a.house, "house").appliances;
  return t == null ? [] : (Array.isArray(t) || Z("house.appliances must be a list of {name, icon, power, energy, running, start_energy, warn_after}."), t.map((e, s) => {
    const n = `house.appliances[${s}]`;
    ee(e) || Z(`${n} must be a mapping like {name: Pračka, running: input_boolean.…, start_energy: input_number.…}.`), Gt(e, ["name", "power", "energy", "running", "start_energy", "icon", "warn_after"], n);
    const o = Fe(e.name, `${n}.name`);
    o === void 0 && Z(`${n}.name must be the name of the device of the appliance.`);
    const i = Ls(e.running, `${n}.running`), r = Qt(e.start_energy, `${n}.start_energy`, { domain: "input_number" }), l = Qt(e.power, `${n}.power`, { domain: "sensor" }), c = Qt(e.energy, `${n}.energy`, { domain: "sensor" }), d = js(e.icon, `${n}.icon`), h = Es(e.warn_after, `${n}.warn_after`);
    return { name: o, ...l ? { power: l } : {}, ...c ? { energy: c } : {}, ...i ? { running: i } : {}, ...r ? { start_energy: r } : {}, ...h ? { warn_after: h } : {}, ...d ? { icon: d } : {} };
  }));
}
function Ls(a, t) {
  const e = Qt(a, t, { example: "input_boolean.technicka_mistnost_pracka_bezi" });
  return e && !/^(input_boolean|binary_sensor)\./.test(e) && Z(`${t} must be an input_boolean or a binary_sensor entity, not ${e}.`), e;
}
function Es(a, t) {
  if (a != null)
    return (typeof a != "number" || !Number.isInteger(a) || a < 1 || a > 1440) && Z(`${t} must be a whole number of minutes from 1 to 1440, not ${JSON.stringify(a)}.`), a;
}
function Ka(a, t) {
  return a ?? Z(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
}
function js(a, t) {
  if (a != null)
    return (typeof a != "string" || !/^[a-z0-9]+:[a-z0-9-]+$/i.test(a)) && Z(`${t} must be an icon such as mdi:washing-machine.`), a;
}
function bo(a) {
  const t = $t(a.house, "house").groups;
  return t == null ? [] : (Array.isArray(t) || Z("house.groups must be a list of {name, icon, appliances}."), t.map((e, s) => {
    const n = `house.groups[${s}]`;
    ee(e) || Z(`${n} must be a mapping like {name: Vaření, icon: mdi:silverware-fork-knife, appliances: [...]}.`), Gt(e, ["name", "icon", "appliances"], n), (!Array.isArray(e.appliances) || e.appliances.length === 0) && Z(`${n}.appliances must be a list of {name, power, energy, running}.`);
    const o = e.appliances.map((i, r) => {
      const l = `${n}.appliances[${r}]`;
      ee(i) || Z(`${l} must be a mapping like {name: Trouba, power: sensor.…, energy: sensor.…}.`), Gt(i, ["name", "power", "energy", "running", "warn_after"], l);
      const c = Qt(i.power, `${l}.power`, { domain: "sensor" });
      c || Z(`${l}.power must be the power sensor (sensor.…) of the appliance.`);
      const d = Qt(i.energy, `${l}.energy`, { domain: "sensor" }), h = Ls(i.running, `${l}.running`), p = Es(i.warn_after, `${l}.warn_after`);
      return { name: Ka(Fe(i.name, `${l}.name`), `${l}.name`), power: c, ...d ? { energy: d } : {}, ...h ? { running: h } : {}, ...p ? { warn_after: p } : {} };
    });
    return { name: Ka(Fe(e.name, `${n}.name`), `${n}.name`), icon: js(e.icon, `${n}.icon`) ?? uo, appliances: o };
  }));
}
function fo(a) {
  const t = $t(a.flows, "flows").decimals;
  return t == null ? eo : (Ga.includes(t) || Z(`flows.decimals must be one of ${Ga.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const mo = "/dashboard-bmw";
function vo(a) {
  const t = $t(a.car, "car").link;
  return t == null ? mo : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && Z(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function yo(a) {
  const t = $t(a.titles, "titles");
  Gt(t, [...oa], "titles");
  const e = {};
  for (const s of oa) {
    const n = Fe(t[s], `titles.${s}`);
    n !== void 0 && (e[s] = n);
  }
  return e;
}
function wo(a) {
  const t = [
    [a.wallbox.power_min, a.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [a.boiler.target_min, a.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [a.water.gauge_min, a.water.gauge_max, "water.gauge_min", "water.gauge_max", !0],
    [a.tank.temp_min, a.tank.temp_max, "tank.temp_min", "tank.temp_max", !0],
    [a.forecast.strip_from, a.forecast.strip_to, "forecast.strip_from", "forecast.strip_to", !0],
    [a.forecast.car_stop_soc, a.forecast.car_start_soc, "forecast.car_stop_soc", "forecast.car_start_soc", !0],
    [a.forecast.morning_hour, a.forecast.evening_hour, "forecast.morning_hour", "forecast.evening_hour", !0],
    [a.battery.imbalance_good, a.battery.imbalance_warn, "battery.imbalance_good", "battery.imbalance_warn", !1],
    [a.battery.imbalance_warn, a.battery.imbalance_fault, "battery.imbalance_warn", "battery.imbalance_fault", !1]
  ];
  for (const [e, s, n, o, i] of t)
    (i ? e >= s : e > s) && Z(`${n} (${e}) must be ${i ? "below" : "at most"} ${o} (${s}).`);
}
function $o(a) {
  return Yn("Energie Dashboard", () => xo(a));
}
function xo(a) {
  ee(a) || Z("the configuration must be a mapping of keys.");
  const t = Object.fromEntries(As.map((n) => [n, so(a, n)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && Z("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = no(a);
  return wo(e), { language: Xn(a.language), entities: t, titles: yo(a), num: e, colors: oo(a), tempScale: io(a), boilerShow: ro(a), powerDecimals: fo(a), carLink: vo(a), batteryRange: lo(a), sunRange: co(a), houseLabel: ho(a), houseRange: po(a), appliances: go(a), groups: bo(a) };
}
const D = "––", Xt = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, ce = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, Za = "ha-energie-dashboard:boiler-heating", Ya = "ha-energie-dashboard:battery-range", qa = "ha-energie-dashboard:sun-range";
function Tt(a, t) {
  const e = a?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function ko(a) {
  const t = a.reduce((o, i) => o + i, 0);
  if (t <= 0) return a.map(() => 0);
  const e = a.map((o) => o / t * 100), s = e.map(Math.floor);
  let n = 100 - s.reduce((o, i) => o + i, 0);
  return e.map((o, i) => ({ index: i, rest: o - s[i] })).sort((o, i) => i.rest - o.rest).forEach(({ index: o }) => {
    n-- > 0 && s[o]++;
  }), s;
}
const nt = (a, t, e) => Math.max(t, Math.min(e, a)), wa = (a, t) => `color-mix(in srgb, ${a} ${t}%, transparent)`, Ae = (a, t) => `color-mix(in srgb, ${a} ${t}%, var(--ed-tint-base))`, Bs = (a) => Array.from({ length: 10 }, (t, e) => nt((a - e * 10) / 10, 0, 1) * 100), _o = (a) => `calc((100% - 18px) * ${nt(a, 0, 100) / 100} + ${Math.max(0, Math.ceil(nt(a, 0, 100) / 10) - 1) * 2}px)`;
var So = Object.defineProperty, J = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && So(t, e, n), n;
};
class X extends Lt {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._carInfo = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._sunDetail = !1, this._sunTab = "today", this._sunMode = "total", this._houseDetail = !1, this._houseOpen = [], this._houseTab = "now", this._houseData = {}, this._i18n = Re("cs"), this._fonts = 0, this._onFonts = () => {
      this._fonts++, this.requestUpdate();
    }, this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = $o(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(Za)) || 0);
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
    return qn(t, this._i18n?.language ?? this.lang ?? "en");
  }
  get t() {
    return this._i18n.t;
  }
  get boostOptions() {
    return [{ value: "off", label: this.t.boostOptions.off }, { value: "on", label: this.t.boostOptions.on }];
  }
  willUpdate() {
    this._i18n = Re(Dn(this._config?.language ?? "auto", this.hass), this.hass), In(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && Q(V(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(Za, String(this._lastHeating));
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
    const e = this.renderRoot.querySelector(".flow");
    if (e && !this._observer && (this._observer = new ResizeObserver(() => {
      const n = Math.round(e.getBoundingClientRect().width);
      n > 0 && n !== this._width && (this._width = n);
    }), this._observer.observe(e)), this.fitJoined(), t.has("hass")) {
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
    ys(this.renderRoot, `${this._width}|${this._fonts}`);
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${Xt[t.main]})`;
  }
  /** The state under a panel title; parts ("Bojler ohřívá ze slunce", "Boost") are joined by a dot (ha-dashboard-kit/joined). */
  stateLine(t, e) {
    return f`<p class="state ${e ? "tinted" : ""}" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t === void 0 ? f`<span>${this.noData()}</span>` : typeof t == "string" ? f`<span>${t}</span>` : Dt(t)}
    </p>`;
  }
  /** „Boost“ in the state line, orange: the one mark that Boost is on (uživatel 12. 11. 2026: „Q137 A“; CURRENT_SPEC.md, Bojler: „oranžový zůstává jen popisek stavu“). */
  boostMark() {
    return f`<span class="boost-mark">${this.t.boostOptions.on}</span>`;
  }
  /** "––" in the grey of no data, read as „bez dat“ (CURRENT_SPEC.md, Chybějící a zastaralá data; DASHBOARD_UX_SYSTEM.md, Text). */
  noData() {
    return f`<span class="nodata">${D}<span class="sr-only">${this.t.noData}</span></span>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !Q(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || Q(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, s = (r) => Jt(this.hass, r), n = {
      pv: s(e.pv_generation),
      bchg: s(e.battery_charge),
      bdis: s(e.battery_discharge),
      gin: s(e.grid_import),
      gout: s(e.grid_export),
      car: s(e.car) ?? this._houseToday?.car,
      boil: s(e.boiler) ?? this._houseToday?.boil
    }, i = [n.pv, n.gin, n.bdis, n.gout, n.bchg, n.car, n.boil].every((r) => r !== void 0) ? Math.max(0, n.pv + n.gin + n.bdis - n.gout - n.bchg - n.car - n.boil) : void 0;
    return { ...n, house: i };
  }
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const e = V(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
}
J([
  Y()
], X.prototype, "_config");
J([
  O({ attribute: !1 })
], X.prototype, "hass");
J([
  Y()
], X.prototype, "_width");
J([
  Y()
], X.prototype, "_optimistic");
J([
  Y()
], X.prototype, "_feedback");
J([
  Y()
], X.prototype, "_open");
J([
  Y()
], X.prototype, "_pop");
J([
  Y()
], X.prototype, "_all");
J([
  Y()
], X.prototype, "_now");
J([
  Y()
], X.prototype, "_carHint");
J([
  Y()
], X.prototype, "_carInfo");
J([
  Y()
], X.prototype, "_batDetail");
J([
  Y()
], X.prototype, "_batTab");
J([
  Y()
], X.prototype, "_batSpan");
J([
  Y()
], X.prototype, "_batRange");
J([
  Y()
], X.prototype, "_batOpen");
J([
  Y()
], X.prototype, "_batScrub");
J([
  Y()
], X.prototype, "_batData");
J([
  Y()
], X.prototype, "_sunDetail");
J([
  Y()
], X.prototype, "_sunTab");
J([
  Y()
], X.prototype, "_sunRange");
J([
  Y()
], X.prototype, "_sunMode");
J([
  Y()
], X.prototype, "_sunHint");
J([
  Y()
], X.prototype, "_sunWeather");
J([
  Y()
], X.prototype, "_houseDetail");
J([
  Y()
], X.prototype, "_houseRange");
J([
  Y()
], X.prototype, "_houseOpen");
J([
  Y()
], X.prototype, "_houseTab");
J([
  Y()
], X.prototype, "_houseData");
J([
  Y()
], X.prototype, "_houseToday");
J([
  Y()
], X.prototype, "_houseCycles");
J([
  Y()
], X.prototype, "_tankTemp");
const Mo = (a) => class extends a {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? rt(this.hass, t);
  }
  /** A change on its way (spec kitu, Odezva): chosen here, not yet reported by Home Assistant. The control pulses. */
  isPending(t) {
    return t !== void 0 && this._optimistic[t] !== void 0;
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, s, n) {
    const o = this.shown(e);
    return f`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${n ? "warn" : ""}">${o === void 0 ? D : s}</span></span>
        <ed-switch
          label=${t} .checked=${o === "on"} .pending=${this.isPending(e)} ?disabled=${o === void 0}
          @hdk-toggle=${(i) => this.setSwitch(e, i.detail.checked, t)}
        ></ed-switch>
      </div>`;
  }
  // ---------------------------------------------------------------- actions
  choose(t, e) {
    this._optimistic = { ...this._optimistic, [t]: e }, window.clearTimeout(this._timers.get(t)), this._timers.set(t, window.setTimeout(() => {
      const s = { ...this._optimistic };
      delete s[t], this._optimistic = s;
    }, (this._config?.num.ui.revert_after ?? 6) * 1e3));
  }
  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  async call(t, e, s, n, o) {
    if (!this.hass || rt(this.hass, n) === void 0)
      return this._feedback = this.t.feedback.noData(o), !1;
    try {
      return await this.hass.callService(t, e, s), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(o), !1;
    }
  }
  /** A switch or an input_boolean (the priority of the car is a helper of the rule Auto): the service of its domain. */
  async setSwitch(t, e, s) {
    this._feedback = "", this.choose(t, e ? "on" : "off");
    const n = t.startsWith("input_boolean.") ? "input_boolean" : "switch";
    await this.call(n, e ? "turn_on" : "turn_off", { entity_id: t }, t, s);
  }
  /** The mode of charging (wallbox.mode, input_select): Home Assistant switches the Boost itself. */
  async setChargeMode(t, e) {
    const s = this._config.entities.wallbox;
    this._feedback = "", e === "Boost" && s.block_charging && rt(this.hass, s.block_charging) === "on" && (await this.setSwitch(s.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(t, e), await this.call("input_select", "select_option", { entity_id: t, option: e }, t, this.t.car.modeLabel);
  }
  async setInputNumber(t, e, s) {
    this._feedback = "", this.choose(t, String(e)), await this.call("input_number", "set_value", { entity_id: t, value: e }, t, s);
  }
  async setBoost(t, e) {
    const s = this._config.entities, n = t === "wallbox" ? s.wallbox.boost : s.boiler.boost;
    n && (this._feedback = "", t === "wallbox" && e && s.wallbox.block_charging && rt(this.hass, s.wallbox.block_charging) === "on" && (await this.setSwitch(s.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(n, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: n }, n, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, e, s) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, s);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, this.t.tank.modeLabel) && e === "heat") {
      const { min: s, max: n } = this.tankRange(this._config), o = Tt(pt(this.hass, t), "temperature");
      (o === void 0 || o < s || o > n) && await this.setTemperature(t, nt(o ?? s, s, n));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = pt(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, Tt(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, Tt(e, "max_temp") ?? t.num.tank.temp_max)
    };
  }
  async setTemperature(t, e) {
    return this._tankTemp = { id: t, value: e }, window.clearTimeout(this._timers.get("tank-temp")), this._timers.set("tank-temp", window.setTimeout(() => this._tankTemp = void 0, (this._config?.num.ui.revert_after ?? 6) * 1e3)), this.call("water_heater", "set_temperature", { entity_id: t, temperature: e }, t, this.t.tank.sliderLabel);
  }
  /** Moving the temperature in Auto switches the tank to Manual first (CURRENT_SPEC.md, Zásobník). */
  async setTankTemperature(t, e, s) {
    this._feedback = "", !(s !== "heat" && (this.choose(t, "heat"), !await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: "heat" }, t, this.t.tank.modeLabel))) && await this.setTemperature(t, e);
  }
  /**
   * Manual mixing switches both valves directly and at once (mixing = C1 off + C2 on, not mixing = C1 on + C2 off),
   * so it works from any valve state, even an unclear one. Automations are not touched.
   */
  async setMixing(t) {
    const { valve_c1: e, valve_c2: s } = this._config.entities.mixing;
    if (!e || !s) return;
    this._feedback = "";
    const n = t === "on" ? "off" : "on", o = t === "on" ? "on" : "off";
    this.choose(e, n), this.choose(s, o), (await Promise.all([
      this.call("switch", `turn_${n}`, { entity_id: e }, e, this.t.water.mixing),
      this.call("switch", `turn_${o}`, { entity_id: s }, s, this.t.water.mixing)
    ])).every(Boolean) || (this._feedback = this._feedback || this.t.feedback.mixingNotSent);
  }
}, Ue = ["1d", "7d", "30d"], oe = { "1d": 1, "7d": 7, "30d": 30 }, G = 310, at = 36e5, It = 24 * at, ia = (a) => typeof a == "number" && Number.isFinite(a);
async function Wt(a, t, e, s, n, o) {
  return t.length ? await a.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(s).toISOString(),
    statistic_ids: t,
    period: n,
    types: o
  }) ?? {} : {};
}
function Rt(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t.getTime();
}
function Ct(a, t, e, s, n, o = "mean", i = 0) {
  const r = new Array(n).fill(0), l = new Array(n).fill(0), c = new Array(n).fill(void 0), d = (s - e) / n;
  for (const h of a ?? []) {
    const p = h[t];
    if (!ia(p) || !ia(h.start) || d <= 0) continue;
    const b = Math.floor((h.start - e + i) / d);
    if (b < 0 || b >= n) continue;
    l[b]++, r[b] += p;
    const y = c[b];
    o === "min" ? c[b] = y === void 0 ? p : Math.min(y, p) : o === "max" ? c[b] = y === void 0 ? p : Math.max(y, p) : o === "last" && (c[b] = p);
  }
  return c.map((h, p) => {
    if (l[p])
      return o === "mean" ? r[p] / l[p] : o === "sum" ? r[p] : h;
  });
}
function At(a, t) {
  return (a ?? []).some((e) => ia(e[t]));
}
const R = (a) => Math.round(a * 10) / 10;
function he(a, t, e) {
  let s = "", n = !1;
  return a.forEach((o, i) => {
    if (o === void 0) {
      n = !1;
      return;
    }
    s += `${n ? " L" : s ? " M" : "M"}${R(t(i))} ${R(e(o))}`, n = !0;
  }), s;
}
function Ve(a, t, e, s) {
  let n = "", o = -1;
  const i = (r) => {
    if (!(o < 0)) {
      n += `${n ? " " : ""}M${R(t(o))} ${R(s)}`;
      for (let l = o; l <= r; l++) n += ` L${R(t(l))} ${R(e(a[l]))}`;
      n += ` L${R(t(r))} ${R(s)} Z`, o = -1;
    }
  };
  return a.forEach((r, l) => {
    r === void 0 ? i(l - 1) : o < 0 && (o = l);
  }), i(a.length - 1), n;
}
function zs(a, t, e, s) {
  let n = "", o = -1;
  const i = (l) => a[l] !== void 0 && t[l] !== void 0, r = (l) => {
    if (!(o < 0)) {
      n += `${n ? " " : ""}M${R(e(o))} ${R(s(t[o]))}`;
      for (let c = o + 1; c <= l; c++) n += ` L${R(e(c))} ${R(s(t[c]))}`;
      for (let c = l; c >= o; c--) n += ` L${R(e(c))} ${R(s(a[c]))}`;
      n += " Z", o = -1;
    }
  };
  for (let l = 0; l < a.length; l++)
    i(l) ? o < 0 && (o = l) : r(l - 1);
  return r(a.length - 1), n;
}
function me(a) {
  if (!(a > 0)) return 1;
  const e = 10 ** Math.floor(Math.log10(a)), s = a / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 3 ? 3 : s <= 5 ? 5 : 10) * e;
}
function To(a, t) {
  const e = a.filter((r) => r !== void 0);
  if (!e.length) return;
  let s = Math.min(...e), n = Math.max(...e);
  const o = Math.max(n - s, t), i = (n + s) / 2;
  return s = i - o / 2 - o * 0.1, n = i + o / 2 + o * 0.1, { lo: s, hi: n };
}
function Xa(a, t, e) {
  if (!(e > 0) || !(a > 0) || !(t > 0)) return;
  const s = a / 100 * t / (e / 1e3), n = Math.round(s * 60 / 5) * 5;
  return n >= 5 && n < 2880 ? n : void 0;
}
function pe(a) {
  const t = Math.floor(a / 60), e = a % 60;
  return t === 0 ? `${e} min` : e === 0 ? `${t} h` : `${t} h ${e} min`;
}
const Vt = 56, Ne = 6e4, Yt = 60 * Ne, Bt = 24 * Yt, Ja = [10 * Ne, 15 * Ne, 30 * Ne, Yt, 2 * Yt, 3 * Yt, 4 * Yt, 6 * Yt, 12 * Yt, Bt, 2 * Bt, 3 * Bt, 5 * Bt, 7 * Bt], Qa = 6, ts = 10, Os = 8;
function Do(a) {
  let t = Ja[0], e = 1 / 0;
  for (const s of Ja) {
    const n = a / s, i = (n < Qa ? Qa - n : n > ts ? n - ts : 0) * 100 + Math.abs(n - Os) - s / 1e12;
    i < e && (e = i, t = s);
  }
  return t;
}
function es(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t;
}
function Co(a, t, e) {
  const s = [];
  if (e < Bt) {
    const i = es(a).getTime();
    for (let r = i + Math.ceil((a - i) / e) * e; r <= t; r += e) r >= a && s.push(r);
    return s;
  }
  const n = Math.round(e / Bt), o = es(t);
  for (let i = 0; ; i++) {
    const r = new Date(o);
    if (r.setDate(o.getDate() - i * n), r.getTime() < a) break;
    s.push(r.getTime());
  }
  return s.reverse();
}
function $a(a) {
  const { start: t, end: e } = a, s = a.x0 ?? 0, n = a.x1 ?? G, o = a.x ?? ((d) => s + (d - t) / (e - t) * (n - s)), i = Do(e - t), r = (d) => i < Bt ? ot(d).replace(/^(\d{1,2}):00$/, "$1") : i === Bt && e - t <= 8 * Bt ? Fn(d) : ks(d), l = Co(t, e, i).map((d) => {
    const h = Math.round(o(d) * 10) / 10;
    if (a.slot) {
      const p = Math.round(o(d + a.slot / 2) * 10) / 10, b = r(d), y = b.length * 3.3;
      return { x: h, text: p - y < s || p + y > n ? "" : b, labelX: p };
    }
    return { x: h, text: h < s + 6 || h > n - 6 ? "" : r(d) };
  });
  return Math.max(0, ...l.map((d) => d.text.length)) > 5 && l.length - 1 > 7 ? l.map((d, h) => h % 2 === 1 ? d : { ...d, text: "" }) : l;
}
function Ns(a) {
  if (!a || a.length < 2) return G / Os;
  const t = a.slice(1).map((e, s) => e.x - a[s].x).sort((e, s) => e - s);
  return t[Math.floor(t.length / 2)];
}
const Ao = [1, 2, 4, 5], Lo = [1, 2, 3, 4, 5, 6, 8, 10];
function Eo(a) {
  if (!(a > 0)) return !1;
  const t = a / 10 ** Math.floor(Math.log10(a) + 1e-9);
  return [1, 2, 2.5, 5].some((e) => Math.abs(t - e) < 1e-6 * e);
}
function jo(a, t, e, s) {
  const n = [...a].sort((r, l) => r.y - l.y), o = [...n], i = [];
  return n.slice(1).forEach((r, l) => {
    const c = n[l].y, d = (r.y - c) / t, h = s ? Lo.filter((b) => b === 1 || Eo(Math.abs(s(r.y) - s(c)) / b)) : Ao, p = h.reduce((b, y) => Math.abs(y - d) < Math.abs(b - d) ? y : b, h[0] ?? 1);
    for (let b = 1; b < p; b++) {
      const y = Math.round((c + (r.y - c) * b / p) * 10) / 10;
      o.push({ y });
      const m = e?.(y);
      m && i.push({ y, text: m });
    }
  }), { grid: o.sort((r, l) => r.y - l.y), labels: i };
}
function Hs(a, t) {
  const e = a / Math.max(1, t), s = 10 ** Math.floor(Math.log10(e));
  return [1, 2, 2.5, 5, 10].map((n) => n * s).find((n) => n >= e * 0.8) ?? e;
}
const Bo = 5 * 6e4, $e = 48, as = 60, zo = 0, Oo = (a) => class extends a {
  // ----------------------------------------------------------------- state and history
  /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
  batRange(t) {
    if (this._batRange) return this._batRange;
    try {
      const e = localStorage.getItem(Ya);
      if (e && Ue.includes(e)) return e;
    } catch {
    }
    return t.batteryRange;
  }
  setBatRange(t) {
    this._batRange = t, this._batScrub = {};
    try {
      localStorage.setItem(Ya, t);
    } catch {
    }
  }
  /** The views of the history the open parts need (keys of `_batData`). */
  batNeeds(t) {
    const e = [];
    return this._batDetail && (this._batTab === "now" && e.push(`day:${this._batSpan}`), this._batTab === "hist" && e.push(`hist:${this.batRange(t)}`), this._batTab === "health" && this._batOpen && e.push(`health:${this.batRange(t)}`)), e;
  }
  /** What to ask Home Assistant for a view; the entities that are not configured are left out. */
  batRequests(t, e, s) {
    const n = t.entities.battery, o = (...c) => c.filter((d) => !!d), [i, r] = e.split(":");
    if (i === "day") {
      const c = s - (r === "6h" ? 6 : 24) * at;
      return [{ part: "level", ids: o(n.power, n.state_of_charge), start: c, end: s, period: "5minute", types: ["mean"] }];
    }
    const l = r;
    if (i === "hist") {
      const c = this.histWindow(l, s);
      return [
        { part: "energy", ids: o(n.total_charge, n.total_discharge), start: c.start, end: s, period: l === "1d" ? "hour" : "day", types: ["change"] },
        { part: "level", ids: o(n.state_of_charge, n.power), start: c.start, end: s, period: "hour", types: ["mean", "min", "max"] }
      ];
    }
    return [
      {
        part: "health",
        ids: o(n.min_cell_voltage, n.max_cell_voltage, n.min_cell_temperature, n.max_cell_temperature, n.temperature, n.total_discharge, n.total_charge),
        start: s - oe[l] * It,
        end: s,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, e) {
    if (t === "1d")
      return { start: Math.floor(e / at) * at - 23 * at, bins: 24 };
    const s = new Date(e);
    return s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (oe[t] - 1)), { start: s.getTime(), bins: oe[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const e of this.batNeeds(t)) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < Bo) || this.fetchBattery(t, e, s);
      }
  }
  async fetchBattery(t, e, s) {
    const n = this.hass;
    if (!n) return;
    const o = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: o, parts: s?.parts ?? {} } };
    try {
      const i = this.batRequests(t, e, o), r = {};
      await Promise.all(i.map(async (l) => r[l.part] = await Wt(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: o, parts: {} } };
    }
  }
  /** Rows of one entity from a loaded view. */
  batRows(t, e, s) {
    return s ? this._batData[t]?.parts[e]?.[s] : void 0;
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
  batState(t, e) {
    const s = e.num.flows.idle_threshold;
    return Q(t.batIn, s) ? "charging" : Q(t.batDis, s) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, e, s) {
    const n = this.t, o = this.batteryReserve(e), i = Array.from({ length: 10 }, (l, c) => {
      const d = (c + 1) * 10 <= o + 1e-3, h = t === void 0 ? 0 : nt((t - c * 10) / 10, 0, 1) * 100, p = c === 0 ? "8px 0 0 8px" : c === 9 ? "0 8px 8px 0" : "0", b = d ? "var(--ed-warning)" : "var(--ed-battery)";
      return f`<span class="pill" style="height:${s}px;border-radius:${p};background:${d ? wa("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${h.toFixed(1)}%;background:${b}"></i></span>`;
    }), r = t === void 0 ? n.noData : n.bat.levelLabel(U(t), U(o));
    return f`<div class="bat-gauge" role="img" aria-label=${r}>${i}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, e) {
    const s = t.soc, n = this.batState(t, e);
    if (s === void 0) return;
    const o = e.num.battery.capacity;
    if (n === "charging") {
      const i = Xa(100 - s, o, t.batIn ?? 0);
      return i === void 0 ? void 0 : this.t.bat.fullIn(pe(i));
    }
    if (n === "discharging") {
      const i = Xa(s - this.batteryReserve(e), o, t.batDis ?? 0);
      return i === void 0 ? void 0 : this.t.bat.lastsFor(pe(i));
    }
  }
  /** Signed power in kW, charging positive (the raw entity is the other way round). */
  batSigned(t) {
    if (!(t.batIn === void 0 && t.batDis === void 0))
      return ((t.batIn ?? 0) - (t.batDis ?? 0)) / 1e3;
  }
  // ----------------------------------------------------------------- popup
  renderBatteryPopup(t, e, s, n) {
    const o = this.t, i = e.num.flows.idle_threshold, r = t.key === "bat", l = s.soc, c = l !== void 0 && l <= this.batteryReserve(e), d = r ? s.batDis : s.batIn, p = Q(d, i) ? r ? o.pop.discharging(it(d, n)) : o.pop.charging(it(d, n)) : s.batDis === void 0 && s.batIn === void 0 && l === void 0 ? D : r ? o.idle.bat : o.idle.batIn, b = this.today(e), y = r ? b.bdis : b.bchg, m = this.batEstimate(s, e);
    return f`<ed-sheet open .heading=${t.name} .sub=${p} .closeLabel=${o.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop">
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${o.pop.level}${c ? f`<span class="note"> ${o.pop.atReserve}</span>` : k}</span>
            <span class="pop-big" style="color:${c ? "var(--ed-warning)" : "var(--ed-text)"}">${l === void 0 ? D : U(l)}</span>
          </div>
          ${this.renderGauge(l, e, 12)}
        </div>
        ${m ? f`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${m}</p>` : k}
        <div class="pop-rows"><div class="pop-row"><span>${r ? o.pop.rows.discharged : o.pop.rows.charged}</span><b>${y === void 0 ? D : `${st(y)} kWh`}</b></div></div>
        <button type="button" class="bat-open" @click=${() => this.openBatteryDetail()}><span>${o.bat.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- charts
  /** Back in time as a short text: "teď", "−45 min", "−3 h 20 min", "−5 d". */
  back(t) {
    const e = Math.round(t);
    return e <= 0 ? this.t.bat.now : e < 60 ? `−${e} min` : e < 1440 ? `−${Math.floor(e / 60)} h${e % 60 ? ` ${e % 60} min` : ""}` : `−${Math.round(e / 1440)} d`;
  }
  /** One chart with its readout, finger scrubbing (a slider with no look of its own), the vertical axis and the fade on the left. */
  renderChart(t) {
    const e = this.t, s = this._batScrub[t.id] ?? t.start ?? 100, n = !!t.whole && this._batScrub[t.id] === void 0, o = t.fade ?? zo, i = (g) => {
      const v = g / 100 * G;
      let $ = 0;
      for (let S = 1; S < t.n; S++) Math.abs(t.x(S) - v) < Math.abs(t.x($) - v) && ($ = S);
      return $;
    }, r = i(s), l = () => {
      const g = { ...this._batScrub };
      delete g[t.id], this._batScrub = g;
    }, c = (g) => {
      if (g.key === "Enter" && t.whole && !n) {
        g.preventDefault(), l();
        return;
      }
      const v = g.key === "ArrowRight" || g.key === "ArrowUp" ? 1 : g.key === "ArrowLeft" || g.key === "ArrowDown" ? -1 : 0;
      if (!v) return;
      g.preventDefault();
      const $ = n ? r : nt(r + v, 0, t.n - 1);
      this._batScrub = { ...this._batScrub, [t.id]: t.x($) / G * 100 };
    }, d = t.x(r), h = t.dot?.(r), p = n && t.wholeText ? t.wholeText : t.read(r), b = (g) => `${(g / t.h * 100).toFixed(2)}%`, y = t.ticks ?? (t.time ? $a(t.time) : void 0), m = jo(t.grid, Ns(y), t.valueAt, t.valueNum), u = [...t.labels, ...m.labels.filter((g) => t.labels.every((v) => Math.abs(v.y - g.y) > 13))];
    return f`${t.panel ? k : f`<div class="bat-read">${zt(p)}</div>`}
        <div class="bat-chart" style="aspect-ratio:${G + Vt} / ${t.h}">
          <svg viewBox="0 0 ${G + Vt} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${o} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${G} height=${t.h}><rect width=${G} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${m.grid.map((g) => K`<line x1="0" y1=${g.y} x2=${G} y2=${g.y} class=${g.strong ? "axis" : "grid"}></line>`)}
            ${(y ?? []).map((g) => K`<line x1=${g.x} y1="0" x2=${g.x} y2=${t.h} class="grid"></line>`)}
            <g mask=${o > 0 ? `url(#bm-${t.id})` : k}>${t.body}</g>
            ${n ? k : K`<line x1=${d} y1="0" x2=${d} y2=${t.h} class="cursor"></line>`}
            ${h && !n ? K`<circle cx=${d} cy=${h.y} r="6" style="fill:var(--ed-text)"></circle>` : k}
          </svg>
          ${u.map((g) => f`<span class="bat-ylabel" style="top:calc(${b(g.y)} - 7px);left:calc(${(G / (G + Vt) * 100).toFixed(2)}% + 8px)">${g.text}</span>`)}
          <input type="range" style="width:${(G / (G + Vt) * 100).toFixed(2)}%" min="0" max="100" step="1" .value=${String(s)} aria-label=${e.bat.scrubLabel} aria-valuetext=${p}
            @pointerdown=${() => {
      this._scrubTap = { id: t.id, index: n ? void 0 : r, moved: !1 };
    }}
            @pointercancel=${() => {
      this._scrubTap = void 0;
    }}
            @pointerup=${() => {
      const g = this._scrubTap;
      this._scrubTap = void 0, t.whole && g && g.id === t.id && !g.moved && g.index !== void 0 && l();
    }}
            @input=${(g) => {
      const v = Number(g.target.value);
      this._scrubTap?.id === t.id && this._scrubTap.index !== i(v) && (this._scrubTap.moved = !0), this._batScrub = { ...this._batScrub, [t.id]: v };
    }} @keydown=${c} />
        </div>
        ${y ? f`<div class="bat-axis ticks">${y.map((g) => f`<span style="left:${((g.labelX ?? g.x) / (G + Vt) * 100).toFixed(2)}%;transform:translateX(${g.labelX === void 0 && g.x < 8 ? "0" : g.labelX === void 0 && g.x > G - 8 ? "-100%" : "-50%"})">${g.text}</span>`)}</div>` : f`<div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>`}
        ${t.panel ? n ? t.whole() : t.panel(r) : t.legend ?? k}`;
  }
  renderChartOrEmpty(t, e, s) {
    if (s) return this.renderChart(s);
    const n = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return f`<div class="bat-nodata" style="aspect-ratio:${G} / ${e}">${n ? D : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const e = t.entities.battery, s = `day:${this._batSpan}`, n = this._batData[s];
    if (!n) return;
    const o = this._batSpan === "6h" ? 6 : 24, i = n.at, r = i - o * at, l = Ct(this.batRows(s, "level", e.state_of_charge), "mean", r, i, $e), c = Ct(this.batRows(s, "level", e.power), "mean", r, i, $e).map((L) => L === void 0 ? void 0 : -L / 1e3);
    if (!l.some((L) => L !== void 0) && !c.some((L) => L !== void 0)) return;
    const d = V(this.hass, e.state_of_charge), h = V(this.hass, e.power);
    d !== void 0 && (l[$e - 1] = d), h !== void 0 && (c[$e - 1] = -h / 1e3);
    const p = $e, b = (L) => R(L / (p - 1) * G), y = (L) => R(98 - nt(L, 0, 100) / 100 * 90), m = me(Math.max(1, ...c.map((L) => Math.abs(L ?? 0)))), u = 172, g = (L) => R(u - nt(L, -m, m) / m * 44), v = 4.2, $ = c.map((L, M) => {
      if (L === void 0) return k;
      const C = Math.min(u, g(L)), E = Math.max(1.5, Math.abs(g(L) - u));
      return K`<rect x=${R(b(M) - v / 2)} y=${L >= 0 ? C : u} width=${v} height=${R(E)} rx="1.5" style="fill:${L >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), S = he(l, b, y), w = Ve(l, b, y, 98), j = (L) => `${q(L, L % 1 === 0 ? 0 : 1)} kW`;
    return {
      id: "level",
      h: 224,
      n: p,
      x: b,
      grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: !0 }, { y: u - 44 }, { y: u, strong: !0 }, { y: u + 44 }],
      time: { start: r, end: i },
      labels: [
        { y: 8, text: U(100) },
        { y: 53, text: U(50) },
        { y: 98, text: U(0) },
        { y: u - 44, text: `+${j(m)}` },
        { y: u, text: "0" },
        { y: u + 44, text: `−${j(m)}` }
      ],
      body: K`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${w} fill="url(#bl-area)"></path>
          <path d=${S} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${$}`,
      dot: (L) => l[L] === void 0 ? void 0 : { y: y(l[L]), color: "var(--ed-text)" },
      read: (L) => {
        const M = c[L], C = M === void 0 ? D : Math.abs(M) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${M > 0 ? this.t.bat.charging : this.t.bat.discharging} ${it(Math.abs(M) * 1e3, "kW")}`;
        return `${this.back((1 - L / (p - 1)) * o * 60)} · ${l[L] === void 0 ? D : U(l[L])} · ${C}`;
      },
      from: `−${o} h`,
      to: this.t.bat.now,
      legend: f`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`
    };
  }
  /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
  energyChart(t, e) {
    const s = t.entities.battery, n = `hist:${e}`, o = this._batData[n];
    if (!o) return;
    const i = this.histWindow(e, o.at), r = e === "1d", l = i.bins, c = r ? at : It, d = i.start + l * c, h = r ? 0 : 6 * at, p = this.batRows(n, "energy", s.total_charge), b = this.batRows(n, "energy", s.total_discharge), y = Ct(p, "change", i.start, d, l, "sum", h), m = Ct(b, "change", i.start, d, l, "sum", h);
    if (!y.some((x) => x !== void 0) && !m.some((x) => x !== void 0)) return;
    const u = y.map((x) => x ?? 0), g = m.map((x) => x ?? 0), v = me(Math.max(0.5, ...u, ...g)), $ = r ? 3 : l <= 7 ? 10 : 2, S = (G - (l - 1) * $) / l, w = (x) => R(x * (S + $) + S / 2), j = 100, L = (x) => nt(x, 0, v) / v * 92, M = u.flatMap((x, z) => {
      const tt = g[z], P = z === l - 1 ? 1 : 0.85;
      return [
        K`<rect x=${R(z * (S + $))} y=${R(j - Math.max(x > 0 ? 1 : 0, L(x)))} width=${R(S)} height=${R(Math.max(x > 0 ? 1 : 0, L(x)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${P}"></rect>`,
        K`<rect x=${R(z * (S + $))} y=${j} width=${R(S)} height=${R(Math.max(tt > 0 ? 1 : 0, L(tt)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${P}"></rect>`
      ];
    }), C = (x) => R(j - nt(x, -v, v) / v * 92), E = u.map((x, z) => x - g[z]), _ = r ? 2 : 1, A = (x) => `${x >= 0 ? "+" : "−"}${q(Math.abs(x), _)}`, B = (x) => r ? ot(i.start + x * at) : _e(i.start + x * It);
    return {
      charged: u,
      discharged: g,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: w,
        grid: [{ y: j, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${q(v, v % 1 === 0 ? 0 : 1)}` }, { y: j, text: "0" }, { y: 192, text: `−${q(v, v % 1 === 0 ? 0 : 1)}` }],
        time: { start: i.start, end: d, slot: c },
        valueNum: (x) => (j - x) / 92 * v,
        valueAt: (x) => {
          const z = (j - x) / 92 * v;
          return Math.abs(z) < 1e-9 ? void 0 : `${z > 0 ? "+" : "−"}${q(Math.abs(z), Math.abs(z) % 1 === 0 ? 0 : Math.abs(z * 10) % 1 < 1e-6 ? 1 : 2)}`;
        },
        body: K`${M}<path d=${he(E, w, C)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (x) => ({ y: C(E[x]), color: "var(--ed-text)" }),
        read: (x) => `${B(x)} · ${A(u[x])} / ${A(-g[x])} · ${this.t.bat.net} ${A(E[x])} kWh`,
        from: r ? "−24 h" : _e(i.start),
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
  balanceChart(t, e) {
    const s = t.entities.battery, n = `health:${e}`, o = this._batData[n];
    if (!o) return;
    const i = oe[e], r = o.at, l = r - i * It, c = as, d = (_) => Ct(this.batRows(n, "health", _), "mean", l, r, c), h = d(s.min_cell_voltage), p = d(s.max_cell_voltage), b = h.map((_, A) => _ === void 0 || p[A] === void 0 ? void 0 : Math.max(0, (p[A] - _) * 1e3)), y = b.filter((_) => _ !== void 0);
    if (!y.length) return;
    const { imbalance_good: m, imbalance_warn: u } = t.num.battery, g = Math.max(m > 0 ? m * 1.5 : 10, Math.max(...y) * 1.2), v = (_) => R(130 - nt(_, 0, g) / g * 120), $ = (_) => R(_ / (c - 1) * G), S = (_) => this.back((1 - _ / (c - 1)) * i * 24 * 60), w = this.t.bat.health, j = "var(--ed-battery)", L = "var(--ed-warning)", M = (_) => _ > u ? L : j, C = `bg-${e}`, E = nt(1 - (130 - v(u)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: c,
      x: $,
      time: { start: l, end: r },
      grid: [{ y: 10 }, { y: v(m) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${N(g)} mV` }, { y: v(m), text: `${N(m)} mV` }, { y: 130, text: "0" }],
      body: K`<defs>
            <linearGradient id=${C} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${E} stop-color="#FF9230"></stop><stop offset=${E} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${C}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${v(m)} width=${G} height=${R(130 - v(m))} style="fill:${j};fill-opacity:0.12"></rect>
          <path d=${Ve(b, $, v, 130)} fill="url(#${C}-area)"></path>
          <path d=${he(b, $, v)} fill="none" stroke="url(#${C})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (_) => b[_] === void 0 ? void 0 : { y: v(b[_]), color: M(b[_]) },
      read: (_) => b[_] === void 0 ? `${S(_)} · ${D}` : `${S(_)} · ${w.difference} ${N(b[_])} mV · ${w.min} ${q(h[_], 3)} V · ${w.max} ${q(p[_], 3)} V`,
      from: i === 1 ? "−24 h" : `−${i} d`,
      to: this.t.bat.today,
      legend: f`<div class="bat-legend"><span><i class="swatch" style="background:${j};opacity:0.35"></i>${w.excellentZone(`${N(m)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, e, s) {
    if (t === "gap") return this.balanceChart(e, s);
    const n = e.entities.battery, o = `health:${s}`, i = this._batData[o];
    if (!i) return;
    const r = oe[s], l = i.at, c = l - r * It, d = as, h = (E) => this.batRows(o, "health", E), p = (E) => Ct(h(E), "mean", c, l, d), b = (E) => R(E / (d - 1) * G), y = (E) => this.back((1 - E / (d - 1)) * r * 24 * 60), m = r === 1 ? "−24 h" : `−${r} d`;
    let u;
    if (t === "temp") {
      const E = p(n.min_cell_temperature), _ = p(n.max_cell_temperature), A = p(n.temperature);
      u = {
        low: E,
        high: _,
        line: A,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (B) => `${N(B)} °C`,
        mid: (B) => `${N(B)} °C`,
        read: (B) => {
          const x = [E[B] === void 0 ? void 0 : `${this.t.bat.health.min} ${q(E[B], 1)}`, A[B] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${q(A[B], 1)}`, _[B] === void 0 ? void 0 : `${this.t.bat.health.max} ${q(_[B], 1)}`].filter(Boolean);
          return `${y(B)} · ${x.length ? `${x.join(" · ")} °C` : D}`;
        },
        legend: f`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const E = Ct(h(n.total_discharge), "state", c, l, d, "last").map((_) => _ === void 0 ? void 0 : _ / e.num.battery.capacity);
      u = {
        low: E,
        high: E,
        line: E,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (_) => N(_, 1),
        mid: (_) => N(_, 1),
        read: (_) => `${y(_)} · ${E[_] === void 0 ? D : this.t.bat.health.cycles(q(E[_], 1))}`
      };
    }
    const g = To([...u.low, ...u.high], u.minSpan);
    if (!g) return;
    const v = Hs(g.hi - g.lo, 4), $ = Math.floor(g.lo / v + 1e-9) * v;
    let S = Math.ceil(g.hi / v - 1e-9) * v;
    Math.round((S - $) / v) % 2 === 1 && (S += v);
    const w = { lo: $, hi: S }, j = (E) => R(130 - (nt(E, w.lo, w.hi) - w.lo) / (w.hi - w.lo) * 120), L = t === "life" ? "" : zs(u.low, u.high, b, j), M = u.line ? he(u.line, b, j) : "", C = u.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: d,
      x: b,
      time: { start: c, end: l },
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: u.text(w.hi) }, { y: 70, text: u.mid((w.hi + w.lo) / 2) }, { y: 130, text: u.text(w.lo) }],
      body: K`<path d=${L} style="fill:${C};fill-opacity:0.22"></path><path d=${M} fill="none" style="stroke:${C}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (E) => u.line?.[E] === void 0 ? void 0 : { y: j(u.line[E]), color: C },
      read: u.read,
      from: m,
      to: this.t.bat.today,
      legend: u.legend
    };
  }
  // ----------------------------------------------------------------- the detail
  /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
  renderBatteryDetail(t, e) {
    const s = this.t, n = ["now", "hist", "health"].map((o) => ({ value: o, label: s.bat.tabs[o] }));
    return f`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${s.bat.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeBatteryDetail(!1)}>‹ ${s.bat.back}</button>
          <h2>${s.bat.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeBatteryDetail(!0)}>${s.bat.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._batTab} label=${s.bat.tabsLabel} @hdk-select=${(o) => {
      this._batTab = o.detail.value;
    }}></ed-segmented>
        ${this._batTab === "now" ? this.renderBatteryNow(t, e) : this._batTab === "hist" ? this.renderBatteryHistory(t, e) : this.renderBatteryHealth(t, e)}
      </section>`;
  }
  renderRange(t) {
    const e = this.t, s = Ue.map((n) => ({ value: n, label: e.bat.ranges[n] }));
    return f`<ed-segmented .options=${s} .value=${this.batRange(t)} label=${e.bat.rangeLabel} @hdk-select=${(n) => this.setBatRange(n.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, e) {
    const s = this.t, n = t.entities.battery, o = e.soc, i = this.batState(e, t), r = this.batSigned(e), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, c = "kW", d = V(this.hass, n.current), h = V(this.hass, n.voltage), p = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, b = i === "idle", y = i === "charging" ? s.pop.charging(it(e.batIn ?? 0, c)) : i === "discharging" ? s.pop.discharging(it(e.batDis ?? 0, c)) : i === "idle" ? s.bat.status.idle.toLowerCase() : s.noData, m = this.batEstimate(e, t), u = this.today(t), g = [
      { label: s.bat.live.power, value: l === void 0 ? D : b ? "0 kW" : it(l, c), sub: i === void 0 ? "" : s.bat.status[i] },
      { label: s.bat.live.current, value: d === void 0 ? D : `${q(Math.abs(d), 1)} A`, sub: d === void 0 || b || i === void 0 ? "" : i === "charging" ? s.bat.live.chargeCurrent : s.bat.live.dischargeCurrent },
      { label: s.bat.live.voltage, value: h === void 0 ? D : `${q(h, 1)} V`, sub: s.bat.live.ofBattery },
      { label: s.bat.live.load, value: p === void 0 ? D : `${q(p, 2)} C`, sub: s.bat.live.loadSub }
    ], v = u.bchg, $ = u.bdis, S = v !== void 0 && $ !== void 0 ? v - $ : void 0, w = ["6h", "24h"].map((j) => ({ value: j, label: s.bat.spans[j] }));
    return f`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${s.bat.level}</span><span class="bat-sub">${y}</span></div><span class="bat-huge">${o === void 0 ? D : U(o)}</span></div>
          ${this.renderGauge(o, t, 32)}
          ${m ? f`<p class="bat-estimate plain">${m}</p>` : k}
        </div>
        <div class="bat-kpis">${g.map((j) => f`<div class="bat-kpi"><span class="sub">${j.label}</span><span class="val">${j.value}</span><span class="sub">${j.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.levelChart}</span>
          <ed-segmented .options=${w} .value=${this._batSpan} label=${s.bat.spanLabel} @hdk-select=${(j) => {
      this._batSpan = j.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${s.bat.charged}</span><span class="val">${v === void 0 ? D : `${st(v)} kWh`}</span></div><div><span class="sub">${s.bat.discharged}</span><span class="val">${$ === void 0 ? D : `${st($)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${v !== void 0 && $ !== void 0 && v + $ > 0 ? f`${v > 0 ? f`<i style="flex:${v.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : k}${$ > 0 ? f`<i style="flex:${$.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : k}` : k}</div>
          <p class="bat-sub">${S === void 0 ? D : s.bat.netStored(`${S >= 0 ? "+" : "−"}${st(Math.abs(S))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, e) {
    const s = this.t, n = t.entities.battery, o = this.batRange(t), i = `hist:${o}`, r = this.energyChart(t, o), l = r ? r.charged.reduce((M, C) => M + C, 0) : void 0, c = r ? r.discharged.reduce((M, C) => M + C, 0) : void 0, d = s.bat.kpi.over(o === "1d" ? "24 h" : s.bat.ranges[o].toLowerCase()), h = this._batData[i], p = oe[o], b = this.batRows(i, "level", n.state_of_charge), y = this.batRows(i, "level", n.power), m = At(b, "min") ? Math.min(...(b ?? []).map((M) => M.min).filter((M) => typeof M == "number")) : void 0, u = At(y, "max") || At(y, "min") ? Math.max(...(y ?? []).flatMap((M) => [M.max, M.min]).filter((M) => typeof M == "number").map((M) => Math.abs(M))) : void 0, g = `${q(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, v = D, $ = [
      { label: s.bat.charged, value: l === void 0 ? v : `${q(l, o === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.discharged, value: c === void 0 ? v : `${q(c, o === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.kpi.efficiency, value: l && c !== void 0 ? U(q(c / l * 100, 1)) : v, sub: s.bat.kpi.efficiencySub },
      { label: s.bat.kpi.cycles, value: c === void 0 ? v : q(c / t.num.battery.capacity, 1), sub: s.bat.kpi.cyclesSub(g) },
      { label: s.bat.kpi.lowest, value: m === void 0 ? v : U(m), sub: s.bat.kpi.lowestSub },
      { label: s.bat.kpi.peak, value: u === void 0 ? v : it(u, "kW"), sub: s.bat.kpi.peakSub }
    ], w = Ct(b, "mean", this.histWindow(o, h?.at ?? Date.now()).start, h?.at ?? Date.now(), Math.max(1, p * 24)).filter((M) => M !== void 0), j = [0, 20, 40, 60, 80, 100], L = j.slice(0, 5).map((M, C) => w.length ? Math.round(w.filter((E) => C === 4 ? E >= M : E >= M && E < j[C + 1]).length / w.length * 100) : void 0);
    return f`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${Dt([o === "1d" ? s.bat.energyHours : s.bat.energyDays, f`<span class="unit">kWh</span>`])}</span>${this.renderChartOrEmpty(i, 200, r?.chart)}</div>
        <div class="bat-kpis">${$.map((M) => f`<div class="bat-kpi"><span class="sub">${M.label}</span><span class="val">${M.value}</span><span class="sub">${M.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.bandsTitle}</span>
          ${L.map((M, C) => f`<div class="bat-band"><span class="name">${j[C]}–${j[C + 1]} %</span><span class="track"><i style="width:${M ?? 0}%;background:${C === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${M === void 0 ? D : U(M)}</span></div>`)}
          <p class="bat-sub">${s.bat.bandsNote}</p>
        </div>`;
  }
  /** Text of an error or a warning entity: "" = none, undefined = no data. */
  batProblem(t) {
    const e = pt(this.hass, t)?.state;
    if (!(e === void 0 || e === "unavailable" || e === "unknown"))
      return e === "" || e === "0" ? "" : e;
  }
  renderBatteryHealth(t, e) {
    const s = this.t, n = t.entities.battery, o = s.bat.health, i = this.batRange(t), r = (A) => V(this.hass, A), l = r(n.state_of_health), c = r(n.min_cell_voltage), d = r(n.max_cell_voltage), h = r(n.min_cell_temperature), p = r(n.max_cell_temperature), b = this.batProblem(n.error), y = this.batProblem(n.warning), m = Jt(this.hass, n.total_charge), u = Jt(this.hass, n.total_discharge), g = t.num.battery, v = c !== void 0 && d !== void 0 ? (d - c) * 1e3 : void 0, $ = v === void 0 ? void 0 : v <= g.imbalance_good ? "good" : v <= g.imbalance_warn ? "ok" : v <= g.imbalance_fault ? "warn" : "fault", S = $ === "warn" || $ === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", L = [l, c, d, h, p, e.soc].every((A) => A === void 0) && b === void 0 && y === void 0 ? { title: o.noData, sub: o.noDataSub, tone: "off", icon: "M5 12h14" } : b || y ? { title: b ? o.error(b) : o.warning(y), sub: o.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: o.ok, sub: o.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, M = u === void 0 ? void 0 : u / g.capacity, C = [
      { key: "soh", label: o.capacity, value: l === void 0 ? D : U(l), sub: l === void 0 ? s.noData : o.capacitySub(`${q(g.capacity * l / 100, 1)} kWh`, `${q(g.capacity, g.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: o.balance, value: v === void 0 ? D : `${N(v)} mV`, word: $ ? o.words[$] : void 0, sub: o.balanceSub, details: [] },
      {
        key: "temp",
        label: o.temperature,
        value: p === void 0 ? D : `${N(p)} °C`,
        sub: p !== void 0 && h !== void 0 ? o.temperatureSub(`${N(p - h)} °C`) : s.noData,
        details: [
          [o.battery, n.temperature],
          [o.inverterAir, n.inverter_temperature_air],
          [o.inverterRadiator, n.inverter_temperature_radiator]
        ].filter(([, A]) => A).map(([A, B]) => ({ label: A, value: r(B) === void 0 ? D : `${q(r(B), 1)} °C` }))
      },
      {
        key: "life",
        label: o.life,
        value: M === void 0 ? D : o.cycles(N(M)),
        sub: m && u !== void 0 ? o.lifeSub(U(q(u / m * 100, 1))) : s.noData,
        details: [
          { label: o.totalCharged, value: m === void 0 ? D : `${N(m)} kWh` },
          { label: o.totalDischarged, value: u === void 0 ? D : `${N(u)} kWh` }
        ]
      }
    ], E = (A) => A ? No(this.hass, A) : void 0, _ = [];
    if (n.mode && _.push({ label: o.mode, value: E(n.mode) ?? D }), n.charge_limit && _.push({ label: o.chargeLimit, value: r(n.charge_limit) === void 0 ? D : `${N(r(n.charge_limit))} A` }), n.discharge_limit && _.push({ label: o.dischargeLimit, value: r(n.discharge_limit) === void 0 ? D : `${N(r(n.discharge_limit))} A` }), n.error || n.warning) {
      const A = [b, y].filter(Boolean).join(", ");
      _.push({ label: o.errors, value: b === void 0 && y === void 0 ? D : A || o.none, warn: !!A });
    }
    return f`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${L.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${L.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${L.tone}">${L.title}</span><span class="bat-sub">${L.sub}</span></div>
        </div>
        ${C.map((A) => {
      const B = A.key !== "soh" && this._batOpen === A.key, x = B ? this.healthChart(A.key, t, i) : void 0;
      return f`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${A.key === "soh"} aria-expanded=${A.key === "soh" ? k : B ? "true" : "false"}
              @click=${() => {
        A.key !== "soh" && (this._batOpen = B ? void 0 : A.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${A.label}</span><span class="bat-sub">${A.sub}</span></span>
              <span class="bat-value">${A.value}</span>${A.word ? f`<span class="bat-word" style="color:${S}">${A.word}</span>` : k}
              ${A.key === "soh" ? k : f`<svg class="chev ${B ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${B ? f`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${i}`, 140, x)}
                  ${A.details.length ? f`<div class="bat-list">${A.details.map((z) => f`<div class="bat-line"><span>${z.label}</span><b>${z.value}</b></div>`)}</div>` : k}
                </div>` : k}
          </div>`;
    })}
        ${_.length ? f`<div class="bat-card flush"><span class="bat-cap pad">${o.diagnostics}</span><div class="bat-list pad">${_.map((A) => f`<div class="bat-line"><span>${A.label}</span><b style="color:${A.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${A.value}</b></div>`)}</div></div>` : k}`;
  }
};
function No(a, t) {
  const e = pt(a, t)?.state;
  return e === void 0 || e === "" || e === "unavailable" || e === "unknown" ? void 0 : e;
}
const ss = (a) => typeof a == "number" && Number.isFinite(a);
function ta(a, t) {
  const e = /* @__PURE__ */ new Map();
  for (const s of a ?? []) {
    const n = s[t];
    if (!ss(n) || !ss(s.start)) continue;
    const o = new Date(s.start), i = Rt(s.start), r = e.get(i) ?? new Array(24).fill(void 0);
    r[o.getHours()] = Math.max(0, t === "mean" ? n / 1e3 : n), e.set(i, r);
  }
  return e;
}
function Ge(a, t = 1) {
  if (!a) return;
  const e = a.filter((s) => s !== void 0);
  return e.length >= t ? e.reduce((s, n) => s + n, 0) : void 0;
}
function Ke(a, t) {
  if (!a.length) return;
  const e = [...a].sort((i, r) => i - r), s = Math.min(100, Math.max(0, t)) / 100 * (e.length - 1), n = Math.floor(s), o = Math.ceil(s);
  return e[n] + (e[o] - e[n]) * (s - n);
}
const ns = (a) => Ke(a, 50);
function Ps(a, t) {
  const e = [], s = new Date(a);
  for (let n = 0; n < t; n++)
    s.setDate(s.getDate() - 1), e.push(s.getTime());
  return e;
}
function Et(a, t) {
  const e = new Date(a);
  return e.setDate(e.getDate() + t), e.setHours(0, 0, 0, 0), e.getTime();
}
function Ho(a, t, e, s) {
  const n = Ps(t, e).filter((r) => a.has(r)), o = Array.from({ length: 24 }, (r, l) => {
    const c = n.map((d) => a.get(d)[l]).filter((d) => d !== void 0);
    return c.length >= 3 ? Ke(c, s) : void 0;
  }), i = n.map((r) => Ge(a.get(r), 20)).filter((r) => r !== void 0);
  return { curve: o, daily: i.length >= 3 ? Ke(i, s) : void 0, days: n.length };
}
function Po(a) {
  const t = a.reduce((e, s) => e + (s ?? 0), 0);
  return t > 0 ? a.map((e) => (e ?? 0) / t) : void 0;
}
function Ro(a, t) {
  const e = Po(t);
  return e ? e.map((s) => s * a) : void 0;
}
function Io(a, t, e, s) {
  const n = new Date(s), o = n.getHours(), i = 1 - (n.getMinutes() * 60 + n.getSeconds()) / 3600, r = e.map((c, d) => d < o ? 0 : d === o ? (c ?? 0) * i : c ?? 0), l = r.reduce((c, d) => c + d, 0);
  return Array.from({ length: 24 }, (c, d) => d < o ? a?.[d] : l > 0 ? r[d] / l * Math.max(0, t) : void 0);
}
function os(a, t) {
  const e = new Date(t), s = e.getHours(), n = 1 - (e.getMinutes() * 60 + e.getSeconds()) / 3600;
  return a.reduce((o, i, r) => o + (r < s ? 0 : r === s ? (i ?? 0) * n : i ?? 0), 0);
}
function Fo(a, t, e, s, n, o) {
  if (a === void 0) return;
  const i = new Date(s), r = i.getHours() + i.getMinutes() / 60, l = e.reduce((g, v, $) => g + (v ?? 0) * Math.min(1, Math.max(0, r - $)), 0), c = e.reduce((g, v) => g + (v ?? 0), 0);
  let d, h = "forecast";
  if (t !== void 0) {
    const g = os(e, s);
    let v = Math.min(Math.max(t - a, 0), g);
    o && o.possible >= 0.3 && (v = Math.min(v, g * Math.min(1, Math.max(0, o.actual / o.possible)))), d = a + v;
  } else if (c > 0 && l >= 0.5) {
    const g = c - l;
    d = a + g * Math.min(2, a / l), h = "pace";
  }
  if (d === void 0) return;
  const p = d > 0 ? Math.min(1, a / d) : 1, b = Math.min(0.6, n * (1 + (1 - p))), y = Math.max(0, d - a), m = c > 0 ? os(e, s) : 1 / 0;
  let u = p < 0.35 ? "low" : p < 0.7 ? "medium" : "high";
  return n > 0.3 && u !== "low" && (u = u === "high" ? "medium" : "low"), { value: d, low: a + y * (1 - b), high: a + Math.min(y * (1 + b), m), done: p, certainty: u, source: h };
}
function Wo(a) {
  const t = a.filter((e) => e.actual > 0.5);
  if (!(t.length < 3))
    return t.reduce((e, s) => e + Math.abs(s.forecast - s.actual) / s.actual, 0) / t.length;
}
function Uo(a, t, e, s) {
  let n = -1, o = -1;
  for (let i = t; i <= e; i++)
    (a[i] ?? 0) >= s && (n < 0 && (n = i), o = i);
  return n < 0 ? void 0 : [n, o + 1];
}
const is = [9, 11, 13, 15];
function Vo(a) {
  const t = is.findIndex((e) => a < e);
  return t < 0 ? is.length : t;
}
function Go(a) {
  if (!a || !a.some((e) => e !== void 0)) return;
  const t = [0, 0, 0, 0, 0];
  return a.forEach((e, s) => {
    e !== void 0 && (t[Vo(s)] += e);
  }), t;
}
function Le(a, t, e) {
  const s = new Date(a), n = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), 12), o = Math.round(n / 864e5 + 24405875e-1 - 2451545), i = Math.PI / 180, r = o - e / 360, l = (357.5291 + 0.98560028 * r) % 360, c = 1.9148 * Math.sin(l * i) + 0.02 * Math.sin(2 * l * i) + 3e-4 * Math.sin(3 * l * i), d = (l + c + 180 + 102.9372) % 360, h = 2451545 + r + 53e-4 * Math.sin(l * i) - 69e-4 * Math.sin(2 * d * i), p = Math.sin(d * i) * Math.sin(23.4397 * i), b = Math.cos(Math.asin(p)), y = (Math.sin(-0.833 * i) - Math.sin(t * i) * p) / (Math.cos(t * i) * b);
  if (y < -1 || y > 1) return;
  const m = Math.acos(y) / i, u = (g) => (g - 24405875e-1) * 864e5;
  return { rise: u(h - m / 360), set: u(h + m / 360) };
}
function Ko(a) {
  const { capacity: t, efficiency: e } = a;
  let s = a.soc / 100 * t;
  const n = a.reserve / 100 * t, o = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let i = Math.ceil(a.now / (at / 4)) * (at / 4);
  const r = Rt(a.now), l = r + a.eveningHour * at, c = Et(r, 1) + a.morningHour * at;
  let d = !1, h = s >= t - 0.01;
  for (; i <= c; i += at / 4) {
    !o.socAtEvening && i >= l && a.now < l && (o.socAtEvening = s / t * 100);
    const p = new Date(i - 1).getHours(), b = i - 1 < Et(r, 1), y = b ? (a.sun[p] ?? 0) / 4 : 0, m = (a.house[p] ?? 0) / 4;
    i <= l && (o.sunUntilEvening += y, o.houseUntilEvening += m);
    const u = s / t * 100;
    let g = 0;
    a.car && b && (d && u <= a.car.stopSoc ? d = !1 : !d && u >= a.car.startSoc && y * 4 * 1e3 >= a.car.minSun && (d = !0), g = d ? a.car.watts / 1e3 / 4 : 0);
    const v = m + g, $ = Math.min(y, v), S = y - $, w = v - $;
    if (g > 0 && (o.carTotal += g, o.carSun += Math.min(g, Math.max(0, y - m))), S > 0)
      s = Math.min(t, s + S * e);
    else if (w > 0) {
      const j = Math.max(0, s - n) * e, L = Math.min(w, j);
      s -= L / e;
    }
    !h && s >= t - 0.01 && o.fullAt === void 0 && i < l && (o.fullAt = i), s >= t - 0.01 && (h = !0), i >= c && (o.socAtMorning = s / t * 100);
  }
  return o;
}
function Zo(a, t, e = 8) {
  const s = t.length;
  if (s === 0) return [];
  if (s === 1) return [[a[0], t[0]]];
  const n = Array.from({ length: s - 1 }, (r, l) => (t[l + 1] - t[l]) / (a[l + 1] - a[l])), o = [n[0], ...Array.from({ length: s - 2 }, (r, l) => n[l] * n[l + 1] <= 0 ? 0 : 2 * n[l] * n[l + 1] / (n[l] + n[l + 1])), n[s - 2]], i = [];
  for (let r = 0; r < s - 1; r++) {
    const l = a[r + 1] - a[r];
    for (let c = 0; c < e; c++) {
      const d = c / e, h = 2 * d ** 3 - 3 * d ** 2 + 1, p = d ** 3 - 2 * d ** 2 + d, b = -2 * d ** 3 + 3 * d ** 2, y = d ** 3 - d ** 2;
      i.push([a[r] + d * l, h * t[r] + p * l * o[r] + b * t[r + 1] + y * l * o[r + 1]]);
    }
  }
  return i.push([a[s - 1], t[s - 1]]), i;
}
function Yo(a, t, e, s) {
  const n = Ps(t, e).map((o) => Ge(a.get(o), 20)).filter((o) => o !== void 0);
  return n.length >= 3 ? Ke(n, s) : void 0;
}
const qo = 5 * 6e4, Xo = 30 * 6e4, xe = 12, ie = 2, rs = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)"
], ls = ["7d", "30d"], ea = { "7d": 7, "30d": 30 }, Jo = (a) => class extends a {
  constructor() {
    super(...arguments), this._sunWeatherBusy = !1;
  }
  // ----------------------------------------------------------------- state and history
  sunRange(t) {
    if (this._sunRange) return this._sunRange;
    try {
      const e = localStorage.getItem(qa);
      if (e && ls.includes(e)) return e;
    } catch {
    }
    return t.sunRange;
  }
  setSunRange(t) {
    this._sunRange = t, this._batScrub = {};
    try {
      localStorage.setItem(qa, t);
    } catch {
    }
  }
  /** The views of the history the open parts need: the popup and the detail both show the day. */
  sunNeeds() {
    return this._sunDetail || this._pop === "sun" ? ["sun:hist", "sun:five"] : [];
  }
  sunRequests(t, e, s) {
    const n = t.entities, o = (...l) => l.filter((c) => !!c), i = Rt(s);
    if (e === "sun:five")
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
      for (const e of this.sunNeeds()) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < qo) || this.fetchSun(t, e, s);
      }
      this._sunDetail && this._sunTab === "outlook" && this.loadWeather(t);
    }
  }
  async fetchSun(t, e, s) {
    const n = this.hass;
    if (!n) return;
    const o = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: o, parts: s?.parts ?? {} } };
    try {
      const i = this.sunRequests(t, e, o), r = {};
      await Promise.all(i.map(async (l) => r[l.part] = await Wt(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: o, parts: {} } };
    }
  }
  /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
  async loadWeather(t) {
    const e = t.entities.forecast.weather, s = this.hass;
    if (!e || !s || this._sunWeatherBusy || this._sunWeather && Date.now() - this._sunWeather.at < Xo) return;
    this._sunWeatherBusy = !0;
    const n = Date.now();
    try {
      const i = (await s.callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type: "daily" },
        target: { entity_id: e },
        return_response: !0
      }))?.response?.[e]?.forecast ?? [];
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
      const e = this.renderRoot.querySelector(".bat-detail");
      e?.scrollIntoView({ block: "start" }), e?.focus({ preventScroll: !0 });
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
    const e = Date.now(), s = Rt(e), n = t.num.forecast, o = this._batData["sun:hist"], i = this._batData["sun:five"], r = t.entities;
    let l = /* @__PURE__ */ new Map(), c = new Array(24).fill(void 0), d = [];
    if (o && Object.keys(o.parts).length) {
      if (this._sunCache?.entry !== o) {
        const P = r.pv.total_generation ? o.parts.energy?.[r.pv.total_generation] : void 0;
        let T = ta(P, "change");
        T.size || (T = ta(r.pv.power ? o.parts.power?.[r.pv.power] : void 0, "mean"));
        const W = ta(r.house.power ? o.parts.house?.[r.house.power] : void 0, "mean"), ft = Array.from({ length: 24 }, (dt, Pt) => {
          const se = [...W.entries()].filter(([Kt]) => Kt < s).map(([, Kt]) => Kt[Pt]).filter((Kt) => Kt !== void 0);
          return se.length >= 3 ? ns(se) : void 0;
        }), mt = ((r.forecast.energy_today ? o.parts.forecast?.[r.forecast.energy_today] : void 0) ?? []).filter((dt) => typeof dt.mean == "number" && new Date(dt.start).getHours() === 8).map((dt) => ({ day: Rt(dt.start), forecast: dt.mean, actual: Ge(T.get(Rt(dt.start)), 20) })).filter((dt) => dt.actual !== void 0 && dt.day < s);
        this._sunCache = { entry: o, days: T, houseCurve: ft, pairs: mt };
      }
      l = this._sunCache.days, c = this._sunCache.houseCurve, d = this._sunCache.pairs;
    }
    const h = Ho(l, s, n.learn_days, n.possible_percentile), p = r.pv.power ? i?.parts.power?.[r.pv.power] : void 0;
    let b = l.get(s);
    if (p?.length) {
      const P = new Array(24).fill(void 0);
      for (const T of p) {
        if (T.start < s || typeof T.mean != "number") continue;
        const W = new Date(T.start).getHours();
        P[W] = (P[W] ?? 0) + Math.max(0, T.mean) / 1e3 / xe;
      }
      b = P;
    }
    const m = Jt(this.hass, t.entities.daily.pv_generation) ?? (b && b.some((P) => P !== void 0) ? b.reduce((P, T) => P + (T ?? 0), 0) : void 0), u = Jt(this.hass, r.forecast.energy_today), g = new Date(e), v = g.getHours() + g.getMinutes() / 60, $ = h.curve.some((P) => P !== void 0) ? h.curve.reduce((P, T, W) => P + (T ?? 0) * nt(v - W, 0, 1), 0) : void 0, S = Wo(d) ?? n.typical_deviation / 100;
    let w;
    if (p?.length) {
      let P = 0, T = 0;
      for (const W of p)
        W.start < e - at || W.start >= e || typeof W.mean != "number" || (P += Math.max(0, W.mean) / 1e3 / xe, T += (h.curve[new Date(W.start).getHours()] ?? 0) / xe);
      w = { actual: P, possible: T };
    }
    const j = Fo(m, u, h.curve, e, S, w), L = j ? Math.max(0, j.value - (m ?? 0)) : 0, M = Io(b, j ? L : 0, h.curve, e);
    if (!j) for (let P = new Date(e).getHours(); P < 24; P++) M[P] = void 0;
    const C = this.place(), E = C ? Le(s, C.latitude, C.longitude) : void 0, _ = t.num.flows.idle_threshold, A = (p ?? []).filter((P) => P.start >= s && typeof P.mean == "number"), B = A.filter((P) => P.mean >= _), x = B.length ? B[0].start : void 0, z = A.reduce((P, T) => !P || T.mean > P.mean ? T : P, void 0);
    let tt;
    if (E) {
      const P = [];
      for (const St of [...new Set((p ?? []).map((mt) => Rt(mt.start)))].filter((mt) => mt < s)) {
        const mt = (p ?? []).filter((Pt) => Rt(Pt.start) === St && Pt.mean >= _).pop(), dt = C ? Le(St, C.latitude, C.longitude) : void 0;
        mt && dt && P.push(dt.set - (mt.start + 5 * 6e4));
      }
      const T = P.length >= 3 ? ns(P) : 0, W = B.length ? B[B.length - 1].start + 5 * 6e4 : void 0;
      tt = e > E.set && (W === void 0 || e - W > 15 * 6e4) && W !== void 0 ? { at: W, over: !0 } : { at: E.set - T, over: !1 };
    }
    return {
      now: e,
      today: s,
      ready: !!o && o.status !== "loading" || !!o?.parts && Object.keys(o.parts).length > 0,
      days: l,
      learned: h,
      done: m,
      possibleSoFar: $,
      forecastToday: u,
      deviation: S,
      pairs: d,
      estimate: j,
      hours: M,
      rise: E?.rise,
      set: E?.set,
      started: x,
      ends: tt,
      fiveRows: p,
      peak: z ? { kw: z.mean / 1e3, at: z.start } : void 0,
      houseCurve: c
    };
  }
  /** The house by hour (the median of the recent days) kept in the cache of the view. */
  sunHouseCurve() {
    return this._sunCache?.houseCurve ?? [];
  }
  // ----------------------------------------------------------------- shared pieces
  /** The small ⓘ and the bubble it opens over the card (a second tap closes it); the hint never takes room in a panel. */
  hint(t, e) {
    const s = this._sunHint === t;
    return f`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${s ? "true" : "false"} @click=${() => {
      this._sunHint = s ? void 0 : t;
    }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${s ? f`<div class="sun-note" role="note" @click=${() => {
      this._sunHint = void 0;
    }}>${e}</div>` : k}`;
  }
  /** A ring with the number centred in it and the unit under the number: the shared ring of the kit (`<ed-ring>`). */
  ring(t, e, s, n, o, i) {
    return f`<ed-ring fraction=${t} size=${e} stroke=${s} num=${n} unit=${o} label=${i}></ed-ring>`;
  }
  /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
  renderSoFar(t) {
    const e = this.t.sun, s = t.estimate, n = s && t.done !== void 0 && s.value > 0 ? Math.min(100, Math.round(t.done / s.value * 100)) : void 0, o = t.done !== void 0 && t.possibleSoFar !== void 0 && t.possibleSoFar >= 0.3 ? Math.round(t.done / t.possibleSoFar * 100) : void 0;
    return f`<div class="sun-sofar">
        <div class="text"><span class="sub">${e.soFar}</span><span class="val">${t.done === void 0 ? D : `${st(t.done)} kWh`}</span><span class="sub">${s ? e.ofEstimate(st(s.value)) : D}</span>${o === void 0 ? k : f`<span class="sub">${e.ofPossibleSoFar(U(o))}</span>`}</div>
        ${n === void 0 ? k : this.ring(n / 100, 40, 6, String(n), "", e.ringLabel(U(n)))}
      </div>`;
  }
  /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
  renderSunFlow(t, e, s) {
    const n = this.t, o = e.num.flows.idle_threshold, i = fe.map((l) => ({ sink: l, watts: t.flows.filter((c) => c.from === "sun" && c.to === l).reduce((c, d) => c + d.watts, 0) })).filter((l) => Q(l.watts, o));
    if (!i.length) return f`<p class="bat-sub">${t.sun === void 0 ? D : n.sun.flowNone}</p>`;
    const r = "kW";
    return f`<div class="mix-bar sun-bar ${s ? "large" : ""}" role="img" aria-label=${i.map((l) => `${n.tile[l.sink]} ${it(l.watts, r)}`).join(", ")}>${i.map((l) => f`<div style="flex:${l.watts.toFixed(0)} 1 0;background:var(${ce[l.sink]})"></div>`)}</div>
        ${s ? f`<div class="sun-legend" role="group" aria-label=${n.sun.flowTitle}>${i.map((l) => f`<span><span class="name"><i style="background:var(${ce[l.sink]})"></i>${n.tile[l.sink]}</span><b>${it(l.watts, r)}</b></span>`)}</div>` : k}`;
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
    const e = t.entities.forecast.weather, s = this.weatherGroup(e ? pt(this.hass, e)?.state : void 0);
    return s ? this.t.sun.weather[s] : void 0;
  }
  // ----------------------------------------------------------------- popup
  renderSunPopup(t, e, s, n) {
    const o = this.t, i = this.sunView(e), r = Q(s.sun, e.num.flows.idle_threshold), l = this.weatherNow(e), c = r ? l ? o.sun.producingWith(l) : o.sun.producing : s.sun === void 0 ? D : o.idle.sun;
    return f`<ed-sheet open .heading=${t.name} .sub=${c} .closeLabel=${o.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop sun-pop">
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${o.sun.powerNow}</span><span class="pop-big">${s.sun === void 0 ? D : it(s.sun, n === "W" && s.sun >= e.num.flows.kw_from ? "kW" : n)}</span></div>
          ${r ? this.renderSunFlow(s, e, !1) : k}
        </div>
        ${this.renderSoFar(i)}
        <div class="pop-rows">
          <div class="pop-row"><span>${o.sun.started}</span><b>${i.started === void 0 ? D : ot(i.started)}</b></div>
          <div class="pop-row"><span>${i.ends?.over ? o.sun.ended : o.sun.ends}</span><b>${i.ends === void 0 ? D : ot(i.ends.at)}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openSunDetail()}><span>${o.sun.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- the detail
  renderSunDetail(t, e) {
    const s = this.t, n = ["today", "hist", "outlook"].map((i) => ({ value: i, label: s.sun.tabs[i] })), o = this.sunView(t);
    return f`<section class="bat-detail sun-detail" role="dialog" aria-modal="true" aria-label=${s.sun.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeSunDetail()}>‹ ${s.sun.back}</button>
          <h2>${s.sun.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeSunDetail()}>${s.sun.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._sunTab} label=${s.sun.tabsLabel} @hdk-select=${(i) => {
      this._sunTab = i.detail.value, this._sunHint = void 0, this._batScrub = {};
    }}></ed-segmented>
        ${this._sunTab === "today" ? this.renderSunToday(t, e, o) : this._sunTab === "hist" ? this.renderSunHistory(t, o) : this.renderSunOutlook(t, o)}
      </section>`;
  }
  // ----------------------------------------------------------------- Dnes
  /** Clock hour of a time as a fraction (7:30 = 7.5). */
  hourOf(t) {
    const e = new Date(t);
    return e.getHours() + e.getMinutes() / 60;
  }
  /** The chart of the power today: the production, the learned "possible" curve and the band of the forecast. */
  todayChart(t, e) {
    if (!t.entities.pv.power || !e.fiveRows?.some((T) => T.start >= e.today)) return;
    const n = this.t.sun, o = e.rise !== void 0 ? nt(Math.floor(this.hourOf(e.rise) - 0.5), 0, 22) : 6, i = e.set !== void 0 ? nt(Math.ceil(this.hourOf(e.set) + 0.5), o + 2, 24) : 18, r = (i - o) * xe, l = e.today + o * at, c = e.today + i * at, d = (T) => R(ie + T / (r - 1) * (G - ie)), h = Ct(e.fiveRows, "mean", l, c, r).map((T) => T === void 0 ? void 0 : T / 1e3), p = (T) => o + (T + 0.5) / xe, b = Math.floor((e.now - l) / (c - l) * r), y = V(this.hass, t.entities.pv.power);
    y !== void 0 && h.some((T) => T !== void 0) && b >= 0 && b < r && (h[b] = Math.max(0, y) / 1e3);
    const m = (T, W) => {
      const ft = W - 0.5, St = Math.floor(ft), mt = T[St], dt = T[St + 1];
      if (mt === void 0 && dt === void 0) return;
      const Pt = ft - St;
      return (mt ?? 0) * (1 - Pt) + (dt ?? 0) * Pt;
    }, u = e.learned.curve.some((T) => T !== void 0), g = Array.from({ length: r }, (T, W) => u ? m(e.learned.curve, p(W)) : void 0), v = e.estimate, $ = v ? Math.max(0, v.value - (e.done ?? 0)) : 0, S = v && $ > 0 ? (v.low - (e.done ?? 0)) / $ : 1, w = v && $ > 0 ? (v.high - (e.done ?? 0)) / $ : 1, j = (T) => T >= b, L = Array.from({ length: r }, (T, W) => v && j(W) ? m(e.hours.map((ft, St) => St >= new Date(e.now).getHours() ? ft : void 0), p(W)) : void 0), M = L.map((T) => T === void 0 ? void 0 : T * S), C = L.map((T, W) => T === void 0 ? void 0 : Math.min(T * w, Math.max(T, g[W] ?? 1 / 0))), E = Math.max(1, ...h.map((T) => T ?? 0), ...g.map((T) => T ?? 0), ...C.map((T) => T ?? 0)), _ = { start: l, end: c, x0: ie, x1: G }, A = 150, B = Hs(E, Math.round((A - 12) / Ns($a(_)))), x = Math.ceil(E / B) * B, z = (T) => R(A - nt(T, 0, x) / x * (A - 12)), tt = (T) => it(T * 1e3, "kW"), P = Array.from({ length: Math.round(x / B) }, (T, W) => (W + 1) * B);
    return {
      id: "sun-today",
      h: 170,
      n: r,
      x: d,
      fade: 0,
      start: nt(b / (r - 1) * 100, 0, 100),
      grid: [{ y: A, strong: !0 }, ...P.map((T) => ({ y: z(T) }))],
      labels: [...P.map((T) => ({ y: z(T), text: N(T, T % 1 ? 1 : 0) })), { y: A, text: "0" }],
      body: K`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${zs(M, C, d, z)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${he(g, d, z)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${Ve(h, d, z, A)} fill="url(#sun-area)"></path>
          <path d=${he(h, d, z)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (T) => h[T] === void 0 ? void 0 : { y: z(h[T]), color: "var(--ed-sun)" },
      read: (T) => {
        const W = ot(l + (T + 0.5) * ((c - l) / r)), ft = [h[T] !== void 0 ? tt(h[T]) : L[T] !== void 0 ? `${n.chartLegend.forecast.toLowerCase()} ≈ ${tt(L[T])}` : D];
        return g[T] !== void 0 && ft.push(`${n.possibleShort} ${tt(g[T])}`), `${W} · ${ft.join(" · ")}`;
      },
      time: _,
      from: ot(l),
      to: ot(c),
      legend: f`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-sun)"></i>${n.chartLegend.production}</span><span><i class="dots" aria-hidden="true"></i>${n.chartLegend.possible}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.3"></i>${n.chartLegend.forecast}</span></div>`
    };
  }
  /** The kWh the sun gave today to the house, the car, the boiler, the battery and the grid (an estimate from the totals of the day). */
  whereToday(t) {
    const e = this.today(t);
    if (e.pv === void 0 || e.bchg === void 0 || e.gout === void 0 || e.gin === void 0 || e.bdis === void 0) return;
    const s = Math.max(0, e.pv + e.gin + e.bdis - e.gout - e.bchg), n = Math.max(0, e.pv - e.bchg - e.gout), o = e.car ?? 0, i = e.boil ?? 0, r = Math.max(0, s - o - i), l = s > 0 ? Math.min(1, n / s) : 0;
    return [
      { key: "house", kwh: r * l },
      { key: "car", kwh: o * l },
      { key: "boil", kwh: i * l },
      { key: "batIn", kwh: e.bchg },
      { key: "gridOut", kwh: e.gout }
    ].filter((c) => c.kwh > 5e-3);
  }
  renderSunToday(t, e, s) {
    const n = this.t, o = "kW", i = this.todayChart(t, s), r = this.whereToday(t), l = r?.reduce((d, h) => d + h.kwh, 0) ?? 0, c = e.sun === void 0 ? D : it(e.sun, o);
    return f`<div class="bat-card">
          <span class="bat-cap">${n.sun.powerNow}</span>
          <span class="bat-huge">${c}</span>
          ${Q(e.sun, t.num.flows.idle_threshold) ? this.renderSunFlow(e, t, !0) : k}
        </div>
        <div class="bat-card rel">
          <div class="bat-card-bar"><span class="sun-title">${n.sun.chartTitle}</span><span class="sun-unit">${n.sun.chartUnit}${this.hint("chart", n.sun.hints.chart)}</span></div>
          ${this.renderChartOrEmpty("sun:five", 170, i)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi sun-kpi-ring">${this.renderSoFar(s)}</div>
          <div class="bat-kpi"><span class="sub">${n.sun.peakToday}</span><span class="val">${s.peak ? it(s.peak.kw * 1e3, o) : D}</span><span class="sub">${s.peak ? n.sun.at(ot(s.peak.at)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${n.sun.startedLong}</span><span class="val">${s.started === void 0 ? D : ot(s.started)}</span><span class="sub">${s.rise === void 0 ? "" : n.sun.sunrise(ot(s.rise))}</span></div>
          <div class="bat-kpi"><span class="sub">${s.ends?.over ? n.sun.ended : n.sun.ends}</span><span class="val">${s.ends === void 0 ? D : ot(s.ends.at)}</span><span class="sub">${s.set === void 0 ? "" : n.sun.sunset(ot(s.set))}</span></div>
        </div>
        ${r ? f`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.sun.whereTitle}</span>${this.hint("where", n.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${r.map((d) => f`<div style="flex:${d.kwh.toFixed(3)} 1 0;background:var(${ce[d.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${n.sun.whereTitle}>${r.map((d) => f`<span><span class="name"><i style="background:var(${ce[d.key]})"></i>${n.tile[d.key]}</span><b>${st(d.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${l > 0 ? n.sun.whereUnit : D}</span>
            </div>` : k}`;
  }
  // ----------------------------------------------------------------- Historie
  renderSunRange(t) {
    const e = this.t.sun.hist, s = ls.map((n) => ({ value: n, label: e.ranges[n] }));
    return f`<ed-segmented .options=${s} .value=${this.sunRange(t)} label=${e.rangeLabel} @hdk-select=${(n) => this.setSunRange(n.detail.value)}></ed-segmented>`;
  }
  /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
  rangeDays(t, e, s = 0) {
    const n = ea[e];
    return Array.from({ length: n }, (o, i) => Et(t.today, -(n - i) - s));
  }
  /** The production by day of the range: the totals, the blocks of the day and what was possible. */
  histData(t, e, s) {
    const n = t.num.forecast;
    return this.rangeDays(e, s).map((i) => {
      const r = e.days.get(i), l = Ge(r, 20);
      return { day: i, hours: r, total: l, blocks: l === void 0 ? void 0 : Go(r), possible: Yo(e.days, i, n.learn_days, n.possible_percentile) };
    });
  }
  histChart(t, e, s) {
    const n = this.t.sun.hist, o = this.histData(t, e, s);
    if (!o.some((u) => u.total !== void 0)) return;
    const i = o.length, r = (G - ie) / i, l = (u) => R(ie + u * r + r / 2), c = Math.max(1, ...o.map((u) => Math.max(u.total ?? 0, u.possible ?? 0))), d = me(c), h = 150, p = (u) => R(h - nt(u, 0, d) / d * (h - 14)), b = this._sunMode === "parts";
    let y;
    if (b) {
      const u = o.map((M, C) => l(C)), g = o.map((M) => M.blocks), v = g.map((M, C) => M ? C : -1).filter((M) => M >= 0), $ = v.map((M) => g[M].reduce((C, E) => [...C, C[C.length - 1] + E], [0])), S = Array.from({ length: 6 }, (M, C) => Zo(v.map((E) => u[E]), $.map((E) => p(E[C])))), w = (M) => M.map(([C, E]) => `${R(C)},${R(E)}`).join(" "), j = o.map((M) => M.possible), L = j.some((M) => M !== void 0) ? Ve(j, l, p, h) : "";
      y = K`<path d=${L} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((M) => K`<polygon points=${`${w(S[M + 1])} ${w([...S[M]].reverse())}`} style="fill:${rs[M]}"></polygon>`)}
          ${[1, 2, 3, 4].map((M) => K`<polyline points=${w(S[M])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
    } else {
      const u = Math.min(s === "7d" ? 26 : 7, r - 3);
      y = K`${o.map((g, v) => K`
          ${g.possible === void 0 ? k : K`<rect x=${R(l(v) - u / 2)} y=${p(g.possible)} width=${u} height=${R(h - p(g.possible))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${g.total === void 0 ? k : K`<rect x=${R(l(v) - u / 2)} y=${p(g.total)} width=${u} height=${R(Math.max(1, h - p(g.total)))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${g.total !== void 0 && s === "7d" ? K`<text x=${l(v)} y=${p(g.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${q(g.total, 1)}</text>` : k}`)}`;
    }
    const m = b ? f`<div class="sun-blocks" role="group">${n.blocks.map((u, g) => f`<span><i style="background:${rs[g]}"></i><span>${u}</span></span>`)}</div>` : f`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${n.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${n.possible}</span></div>`;
    return {
      id: `sun-hist-${b ? "parts" : "total"}`,
      h: 170,
      n: i,
      x: l,
      fade: 0,
      grid: [{ y: h, strong: !0 }, { y: p(d / 2) }, { y: p(d) }],
      labels: [{ y: p(d), text: N(d) }, { y: p(d / 2), text: N(d / 2, d / 2 % 1 ? 1 : 0) }, { y: h, text: "0" }],
      time: { start: o[0].day, end: o[i - 1].day + It, x0: ie, x1: G, slot: It },
      valueNum: (u) => (h - u) / (h - 14) * d,
      valueAt: (u) => N((h - u) / (h - 14) * d, (h - u) / (h - 14) * d % 1 ? 1 : 0),
      body: y,
      dot: (u) => o[u].total === void 0 ? void 0 : { y: p(o[u].total), color: "var(--ed-sun)" },
      read: (u) => {
        const g = o[u], v = _e(g.day);
        if (g.total === void 0) return `${v} · ${D}`;
        if (b && g.blocks) {
          const $ = g.blocks.indexOf(Math.max(...g.blocks));
          return `${v} · ${q(g.total, 1)} kWh · ${n.mostIn(n.blocks[$])}`;
        }
        return `${v} · ${q(g.total, 1)} kWh${g.possible ? ` · ${n.ofPossible(U(Math.round(g.total / g.possible * 100)))}` : ""}`;
      },
      from: "",
      to: "",
      legend: m
    };
  }
  /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
  eastWest(t) {
    const e = this.t.sun.hist, s = 46, n = (r, l, c) => {
      const d = (h) => `${R(70 + s * Math.cos(h * Math.PI / 180))},${R(64 - s * Math.sin(h * Math.PI / 180))}`;
      return K`<path d="M${d(r)} A${s},${s} 0 0 1 ${d(l)}" fill="none" style="stroke:${c}" stroke-width="10"></path>`;
    }, o = 180 - 180 * t, i = Math.round(t * 100);
    return f`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${e.eastWestLabel(U(i), U(100 - i))}>${n(180, o + 1.5, "var(--ed-warning)")}${n(o - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${U(i)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${U(100 - i)}</span></div>`;
  }
  renderSunHistory(t, e) {
    const s = this.t.sun, n = t.num.forecast, o = this.sunRange(t), i = this.histData(t, e, o), r = i.filter((x) => x.total !== void 0), l = !e.ready, c = r.reduce((x, z) => x + z.total, 0);
    i.reduce((x, z) => x + (z.possible ?? 0), 0);
    const d = r.filter((x) => x.possible !== void 0), h = d.length ? Math.round(d.reduce((x, z) => x + z.total, 0) / d.reduce((x, z) => x + z.possible, 0) * 100) : void 0, p = this.histChart(t, e, o), b = ["total", "parts"].map((x) => ({ value: x, label: s.hist.modes[x] })), y = r.reduce((x, z) => !x || z.total > x.total ? z : x, void 0), m = r.reduce((x, z) => !x || z.total < x.total ? z : x, void 0), u = (x) => s.hist.dayOfPossible(_e(x.day), x.possible ? U(Math.round(x.total / x.possible * 100)) : D), g = t.entities, v = g.pv.power && this._batData["sun:hist"]?.parts.power?.[g.pv.power] || [], $ = i[0]?.day ?? e.today, S = v.filter((x) => x.start >= $ && x.start < e.today && typeof x.max == "number").reduce((x, z) => !x || z.max > x.max ? z : x, void 0), w = (x) => {
      const z = x.map((tt) => tt.hours ? tt.hours.filter((P) => (P ?? 0) >= 0.05).length : void 0).filter((tt) => tt !== void 0);
      return z.length ? z.reduce((tt, P) => tt + P, 0) / z.length : void 0;
    }, j = w(i), L = w(this.rangeDays(e, o, ea[o]).map((x) => ({ hours: e.days.get(x) }))), M = e.rise !== void 0 && e.set !== void 0 ? this.hourOf((e.rise + e.set) / 2) : 12;
    let C = 0, E = 0;
    for (const x of r) x.hours?.forEach((z, tt) => {
      z && (tt + 0.5 < M ? C += z : E += z);
    });
    const _ = C + E > 0 ? C / (C + E) : void 0, A = r.filter((x) => x.total > n.good_day).length, B = e.pairs.slice(-7);
    return f`${this.renderSunRange(t)}
        <div class="bat-card">
          <span class="bat-cap">${s.hist.last(ea[o])}</span>
          <span class="bat-huge sun-huge">${r.length ? `${q(c, 1)} kWh` : D}</span>
          <span class="bat-sub">${r.length ? Dt([...h === void 0 ? [] : [f`<b class="sun-yellow">${s.hist.ofPossible(U(h))}</b>`], s.hist.average(`${q(c / r.length, 1)} kWh`)]) : D}</span>
        </div>
        <div class="bat-card">
          <div class="bat-card-bar sun-mode"><span class="sun-title">${s.hist.chartTitle}</span>
            <ed-segmented compact .options=${b} .value=${this._sunMode} label=${s.hist.modeLabel} @hdk-select=${(x) => {
      this._sunMode = x.detail.value;
    }}></ed-segmented>
          </div>
          ${this.renderChartOrEmpty("sun:hist", 170, p)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${s.hist.best}</span><span class="val">${y ? `${q(y.total, 1)} kWh` : D}</span><span class="sub">${y ? zt(u(y)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.worst}</span><span class="val">${m ? `${q(m.total, 1)} kWh` : D}</span><span class="sub">${m ? zt(u(m)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.peak}</span><span class="val">${S ? it(S.max, "kW") : D}</span><span class="sub">${S ? `${_e(S.start)} ${s.at(ot(S.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.length}</span><span class="val">${j === void 0 ? D : s.hist.lengthValue(q(j, 1))}</span><span class="sub">${L === void 0 ? "" : (o === "7d" ? s.hist.before7 : s.hist.before30)(q(L, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${s.hist.eastWest}</span>${_ === void 0 ? f`<span class="bat-sub">${D}</span>` : this.eastWest(_)}</div>
          <div class="bat-card"><span class="bat-cap">${s.hist.goodDays}</span><span class="val big">${r.length ? s.hist.goodOf(A, r.length) : D}</span><span class="bat-sub">${s.hist.over(N(n.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${r.map((x) => f`<i class=${x.total > n.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${B.length >= 3 ? this.renderAccuracy(B, e) : k}`;
  }
  renderAccuracy(t, e) {
    const s = this.t.sun, n = me(Math.max(...t.flatMap((c) => [c.forecast, c.actual]))), o = 310, i = 60, r = 14, l = o / t.length;
    return f`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${s.hist.accuracyTitle}</span>${this.hint("acc", s.hints.acc)}</div>
        <div class="sun-acc"><b>±${U(Math.round(e.deviation * 100))}</b><span class="bat-sub">${s.hist.accuracyAverage(e.pairs.length)}</span></div>
        <svg viewBox="0 0 ${o + Vt} 80" class="sun-pairs" role="img" aria-label=${s.hist.accuracyLabel}>
          ${Array.from({ length: t.length + 1 }, (c, d) => K`<line x1=${R(d * l)} y1="0" x2=${R(d * l)} y2=${i} class="grid"></line>`)}
          <line x1="0" y1=${i - 25} x2=${o} y2=${i - 25} class="grid"></line>
          <line x1="0" y1=${i - 50} x2=${o} y2=${i - 50} class="grid"></line>
          <text x=${o + 5} y=${i - 46} style="fill:var(--ed-secondary)" font-size="12">${N(n)} kWh</text>
          <text x=${o + 5} y=${i - 21} style="fill:var(--ed-secondary)" font-size="12">${N(n / 2, n / 2 % 1 ? 1 : 0)}</text>
          <text x=${o + 5} y=${i + 4} style="fill:var(--ed-secondary)" font-size="12">0</text>
          <line x1="0" y1=${i} x2=${o} y2=${i} class="axis"></line>
          ${t.map((c, d) => {
      const h = d * l + (l - 2 * r - 2) / 2, p = (b) => R(b / n * 50);
      return K`<rect x=${R(h)} y=${R(i - p(c.forecast))} width=${r} height=${p(c.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${R(h + r + 2)} y=${R(i - p(c.actual))} width=${r} height=${p(c.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${R(h + r + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(c.day)}</text>`;
    })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${s.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${s.hist.actual}</span></div>
      </div>`;
  }
  // ----------------------------------------------------------------- Výhled
  renderSunOutlook(t, e) {
    const s = this.t.sun, n = s.outlook, o = t.num.forecast, i = t.entities, r = e.estimate, l = o.good_power / 1e3, c = `${q(o.good_power / 1e3, o.good_power % 1e3 ? 1 : 0)} kW`, d = r && e.done !== void 0 && r.value > 0 ? Math.min(100, Math.round(e.done / r.value * 100)) : void 0, h = r ? { low: 1, medium: 2, high: 3 }[r.certainty] : 0, p = [i.forecast.energy_today, i.forecast.energy_tomorrow, i.forecast.energy_day_2, i.forecast.energy_day_3, i.forecast.energy_day_4], b = this._sunWeather?.days ?? [], y = p.map((_, A) => {
      const B = Et(e.today, A), x = A === 0 ? r?.value : Jt(this.hass, _), z = A === 0 ? e.hours : x === void 0 ? void 0 : Ro(x, e.learned.curve), tt = A === 0 ? this.weatherGroup(i.forecast.weather ? pt(this.hass, i.forecast.weather)?.state : void 0) : this.weatherGroup(b.find((P) => P.day === B)?.condition);
      return { i: A, day: B, kwh: x, hours: z, condition: tt };
    }).filter((_) => _.kwh !== void 0 || _.i === 0), m = y.filter((_) => _.kwh !== void 0), u = (_) => _ ? Uo(_, o.strip_from, o.strip_to, l) : void 0, g = m.filter((_) => _.i > 0 || m.length === 1).reduce((_, A) => !_ || A.kwh > _.kwh ? A : _, void 0), v = g ? u(g.hours) : void 0, $ = this.place(), S = $ ? Le(e.today, $.latitude, $.longitude) : void 0, w = $ ? Le(Et(e.today, 1), $.latitude, $.longitude) : void 0, j = S ? Math.round((S.set - S.rise) / 6e4) : void 0, L = S && w ? Math.round((w.set - w.rise - (S.set - S.rise)) / 6e4) : void 0, M = this.evening(t, e), C = Array.from({ length: o.strip_to - o.strip_from + 1 }, (_, A) => o.strip_from + A), E = new Date(e.now).getHours();
    return f`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${n.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${r ? `${st(r.value)} kWh` : D}</span>
              <span class="bat-sub">${r ? n.between(st(r.low), st(r.high)) : ""}</span>
              ${r ? f`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((_) => f`<i class=${_ <= h ? "on" : ""}></i>`)}</span><b>${n.certainty[r.certainty]}</b>${this.hint("conf", s.hints.conf)}</span>` : k}
            </div>
            ${d === void 0 ? k : this.ring(d / 100, 76, 8, String(d), "", s.ringLabel(U(d)))}
          </div>
        </div>
        ${y.length > 1 ? f`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.fiveTitle}</span>${this.hint("five", s.hints.five(c))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${C.map((_) => f`<span>${_ % 3 === 0 ? _ : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${y.map((_) => {
      const A = u(_.hours);
      return f`<div class="sun-five-row">
                    <span class="day"><b>${_.i === 0 ? n.today : de(_.day)}</b><span>${_.condition ? s.weather[_.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${C.map((B) => {
        const x = _.hours?.[B], z = x === void 0 ? "none" : x >= l ? "strong" : x >= l * 0.35 ? "mid" : x >= l * 0.075 ? "faint" : "none";
        return f`<i class="${z} ${_.i === 0 && B === E ? "now" : ""}"></i>`;
      })}</span>
                    <span class="end"><b>${_.kwh === void 0 ? D : `${_.i ? "≈ " : ""}${st(_.kwh)}`}</b><span class=${A ? "" : "off"}>${_.kwh === void 0 ? "" : A ? n.window(A[0], A[1]) : n.below(c)}</span></span>
                  </div>`;
    })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${n.strong(c)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${n.weak}</span></div>
            </div>` : k}
        ${M ? f`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.eveningTitle}</span>${this.hint("eve", s.hints.eve)}</div>
              <div class="bat-list">${M.map((_) => f`<div class="bat-line sun-line"><span><i style="background:var(${_.color})"></i>${_.label}</span><b>${zt(_.value)}</b></div>`)}
              </div>
            </div>` : k}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${n.dayLength}</span><span class="val">${j === void 0 ? D : n.hoursMinutes(Math.floor(j / 60), j % 60)}</span><span class="sub">${L === void 0 ? "" : n.dayChange(L)}</span></div>
          <div class="bat-kpi"><span class="sub">${n.bestDay}</span><span class="val">${g ? g.i === 0 ? n.today : de(g.day) : D}</span><span class="sub">${g ? zt(n.bestSub(st(g.kwh), v ? n.window(v[0], v[1]) : "")) : ""}</span></div>
        </div>`;
  }
  /** kWh per km of the car, from its charge, the capacity and the range it reports; undefined when it reports none of them. */
  carKwhPerKm(t) {
    const e = V(this.hass, t.entities.car.state_of_charge), s = V(this.hass, t.entities.car.range), n = V(this.hass, t.entities.car.capacity);
    if (!(e === void 0 || s === void 0 || n === void 0 || e < 5 || s < 5 || n <= 0))
      return n * e / 100 / s;
  }
  /** The rows of "Dnes do večera": the battery full, its level in the evening, the car from the sun, the grid at night; none without the data it needs. */
  evening(t, e) {
    const s = t.num.forecast, n = t.entities, o = V(this.hass, n.battery.state_of_charge), i = this.sunHouseCurve();
    if (o === void 0 || !i.some((h) => h !== void 0) || !e.estimate) return;
    const r = Ko({
      now: e.now,
      soc: o,
      capacity: t.num.battery.capacity,
      reserve: this.batteryReserve(t),
      sun: e.hours,
      house: i,
      efficiency: s.efficiency / 100,
      eveningHour: s.evening_hour,
      morningHour: s.morning_hour,
      car: n.wallbox.power && _s(rt(this.hass, n.wallbox.status)) !== "disconnected" ? { startSoc: s.car_start_soc, stopSoc: s.car_stop_soc, minSun: s.car_min_sun, watts: t.num.wallbox.power_min } : void 0
    }), l = this.t.sun.outlook, c = [], d = ot(e.today + s.evening_hour * at);
    if (r.socAtEvening !== void 0 && (c.push({ color: "--ed-battery", label: l.batteryNow, value: U(Math.round(o)) }), c.push({ color: "--ed-sun", label: l.sunUntil(d), value: `≈ ${st(r.sunUntilEvening)} kWh` }), c.push({ color: "--ed-house", label: l.houseUntil(d), value: `≈ ${st(r.houseUntilEvening)} kWh` })), r.fullAt !== void 0 && c.push({ color: "--ed-battery", label: l.full, value: `≈ ${ot(r.fullAt)}` }), r.socAtEvening !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(ot(e.today + s.evening_hour * at)), value: `≈ ${U(Math.round(r.socAtEvening))}` }), r.carTotal > 0) {
      const h = this.carKwhPerKm(t);
      c.push({ color: "--ed-car", label: l.carSun, value: `≈ ${st(r.carSun)} kWh${h ? ` · ${N(r.carSun / h)} km` : ""}` });
    }
    return r.socAtMorning !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(ot(Et(e.today, 1) + s.morning_hour * at)), value: `≈ ${U(Math.round(r.socAtMorning))}` }), c;
  }
}, Ee = 5 * 6e4, Qo = 24 * at, ti = 7, ds = 5, ei = ["overcurrent", "overheating", "overpowering", "overvoltage"], re = ["#5E5CE6", "#E8457A", "#1E9E96", "#B8803A", "#5E9E34", "#6F8FAF", "#D9503C", "#A064C8", "#8F8C2A"], cs = "ha-energie-dashboard.house-range", ai = "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12C19,15.87 15.87,19 12,19C8.13,19 5,15.87 5,12C5,9.82 6.01,7.87 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,9.26 19.77,6.82 17.83,5.17Z", je = (a) => `\0group:${a}`, si = "mdi:power-plug", ni = (a) => class extends a {
  // ----------------------------------------------------------------- the appliances
  /** The appliances: the devices that have the label and measure power, and the ones named in house.appliances with their power sensor; the others (a vacuum) drop out. */
  appliances(t) {
    const e = this.hass, s = e?.devices ?? {}, n = e?.entities ?? {}, o = t.houseLabel.toLowerCase(), i = (d) => !!d?.some((h) => h.toLowerCase() === o), r = /* @__PURE__ */ new Set();
    for (const [d, h] of Object.entries(s)) i(h.labels) && r.add(d);
    for (const d of Object.values(n)) d.device_id && i(d.labels) && r.add(d.device_id);
    const l = (d) => {
      const h = { problems: [] }, p = {};
      for (const [b, y] of Object.entries(n)) {
        if (!d || y.device_id !== d) continue;
        const m = this.hass?.states?.[b];
        if (!m) continue;
        const u = m.attributes?.icon;
        typeof u == "string" && u && (p[b] = u);
        const g = m.attributes?.device_class;
        if (b.startsWith("sensor."))
          g === "power" && !h.power ? h.power = b : g === "energy" && m.attributes?.state_class === "total_increasing" && !b.endsWith("_returned") && !h.energy && (h.energy = b);
        else if (b.startsWith("binary_sensor.") && g === "problem") {
          const v = ei.find(($) => b.endsWith(`_${$}`));
          v && h.problems.push({ id: b, kind: v });
        } else b.startsWith("switch.") && !h.plug && (h.plug = b);
      }
      return h.icon = h.plug && p[h.plug] || h.power && p[h.power] || Object.values(p)[0], h;
    }, c = [];
    for (const d of r) {
      const h = s[d], p = (h?.name_by_user || h?.name || d).trim(), b = l(d);
      if (!b.power) continue;
      const y = t.appliances.find((m) => Fa(m.name).some((u) => u.toLowerCase() === p.toLowerCase()));
      c.push({ name: p, label: y?.name, deviceId: d, warnAfter: y?.warn_after, power: y?.power ?? b.power, energy: y?.energy ?? b.energy, plug: b.plug, icon: this.iconOf(y?.icon, b.icon, [y?.power ?? b.power, y?.energy ?? b.energy, y?.running, y?.start_energy]), problems: b.problems, running: y?.running, startEnergy: y?.start_energy });
    }
    for (const d of t.appliances) {
      if (!d.power || c.some((b) => b.power === d.power)) continue;
      const h = n[d.power]?.device_id ?? void 0, p = l(h);
      c.push({ name: Fa(d.name)[0], label: d.name, deviceId: h ?? d.power, power: d.power, energy: d.energy ?? p.energy, plug: p.plug, icon: this.iconOf(d.icon, p.icon, [d.power, d.energy, d.running, d.start_energy]), problems: p.problems, running: d.running, startEnergy: d.start_energy, warnAfter: d.warn_after });
    }
    return c.sort((d, h) => d.name.localeCompare(h.name));
  }
  /** The appliances of the list and of the chart: without the ones that are members of a group (a power sensor is listed once, in its group). */
  listed(t) {
    const e = new Set(t.groups.flatMap((s) => s.appliances.map((n) => n.power)));
    return this.appliances(t).filter((s) => !e.has(s.power));
  }
  /** What the popup can show: the listed appliances and the members of the groups (Varná deska and Trouba are named in the popup, the group stays one row of the detail). */
  popupItems(t) {
    const e = this.listed(t).map((n) => ({ key: n.name, name: this.applianceName(n), icon: n.icon, power: n.power, running: n.running, cycle: !!n.running, warnAfter: n.warnAfter })), s = t.groups.flatMap((n, o) => n.appliances.map((i) => ({ key: `${je(o)}:${i.power}`, name: this.pickText(i.name) ?? "", icon: n.icon, power: i.power, running: i.running, cycle: !1, warnAfter: i.warn_after })));
    return [...e, ...s];
  }
  /** The icon of an appliance: the configured one, the one of the entities of its device, the one of its helpers, otherwise a plug. */
  iconOf(t, e, s) {
    const n = s.map((o) => o ? this.hass?.states?.[o]?.attributes?.icon : void 0).find((o) => typeof o == "string" && o !== "");
    return t ?? e ?? n ?? si;
  }
  /** The name of the appliance in the language of the card. */
  applianceName(t) {
    return this.pickText(t.label) ?? t.name;
  }
  /** The icon of the appliance (Home Assistant draws it from its name). */
  renderApplianceIcon(t) {
    return t.icon ? f`<ha-icon class="house-icon" icon=${t.icon}></ha-icon>` : k;
  }
  /** An appliance that draws no power: the grey power symbol instead of a word. */
  renderIdleMark() {
    return f`<span class="house-idle" role="img" aria-label=${this.t.house.idle}><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ai}></path></svg></span>`;
  }
  /** What the card sees of the label when it finds no appliance (shown in the detail so that the cause can be told). */
  labelDiagnostics(t) {
    const e = this.hass, s = t.houseLabel.toLowerCase(), n = (i) => !!i?.some((r) => r.toLowerCase() === s), o = /* @__PURE__ */ new Set();
    for (const [i, r] of Object.entries(e?.devices ?? {})) n(r.labels) && o.add(i);
    for (const i of Object.values(e?.entities ?? {})) i.device_id && n(i.labels) && o.add(i.device_id);
    return this.t.house.noneHint(t.houseLabel, o.size, !!e?.devices && !!e?.entities);
  }
  /** Whether the appliance runs: the helper of its cycle, otherwise (an appliance without helpers) its power above the threshold. */
  applianceOn(t, e) {
    if (t.running) {
      const n = rt(this.hass, t.running);
      if (n === "on") return !0;
      if (n === "off") return !1;
    }
    const s = V(this.hass, t.power);
    return s === void 0 ? void 0 : Q(s, e.num.flows.idle_threshold);
  }
  /** When the helper last changed (ms); the start of the running cycle or the end of the finished one. */
  changedAt(t) {
    const e = t.running ? this.hass?.states?.[t.running]?.last_changed : void 0, s = e ? Date.parse(e) : NaN;
    return Number.isFinite(s) ? s : void 0;
  }
  /** Start, end and length of the last cycle: from the moments the helper turned on and off (the recorder), without them only a running cycle (the helper changed when it started). */
  cycleTimes(t, e) {
    const s = t.running ? this._houseCycles?.byId[t.running] : void 0, n = s?.starts.length ? Math.max(...s.starts) : void 0, o = s?.ends.length ? Math.max(...s.ends) : void 0;
    if (e) {
      const l = n ?? this.changedAt(t);
      return { start: l, minutes: l === void 0 ? void 0 : Math.max(0, Math.round((Date.now() - l) / 6e4)) };
    }
    const i = o === void 0 ? [] : (s?.starts ?? []).filter((l) => l < o), r = i.length ? Math.max(...i) : void 0;
    return r !== void 0 && o !== void 0 ? { start: r, end: o, minutes: Math.round((o - r) / 6e4) } : { end: s ? o : this.changedAt(t) };
  }
  /** A moment as the clock, with the day when it is not today ("včera 23:20"); `from` is the start of the range: the same day is not repeated. */
  stamp(t, e) {
    const s = this.t, n = ot(t), o = (l) => {
      const c = new Date(l);
      return c.setHours(0, 0, 0, 0), c.getTime();
    }, i = o(t), r = o(Date.now());
    return e !== void 0 && o(e) === i ? n : i === r ? e === void 0 ? n : `${s.house.todayWord} ${n}` : i === o(r - 12 * at) ? `${s.house.yesterday} ${n}` : `${de(t)} ${n}`;
  }
  /** The energy of the cycle: the counter minus the value saved at the start. */
  cycleKwh(t) {
    const e = Jt(this.hass, t.energy), s = V(this.hass, t.startEnergy);
    return e === void 0 || s === void 0 ? void 0 : Math.max(0, e - s);
  }
  /** The status line of an appliance: "Běží · 31 min", "Skončilo · před 40 min" (up to 24 h) or nothing. */
  applianceStatus(t, e) {
    const s = this.t, n = this.applianceOn(t, e);
    if (n === void 0) return;
    const o = this.cycleTimes(t, n);
    if (n) return t.running && o.minutes !== void 0 ? s.house.running(pe(o.minutes)) : s.house.runningNoCycle;
    if (t.running && o.end !== void 0 && Date.now() - o.end <= Qo) return s.house.ended(pe(Math.max(0, Math.round((Date.now() - o.end) / 6e4))));
  }
  // ----------------------------------------------------------------- alerts
  /** One alert for each appliance whose socket reports a fault, and for each one that runs longer than its `warn_after` (CURRENT_SPEC.md, Upozornění). */
  houseAlerts(t) {
    const e = this.appliances(t).flatMap((n) => n.problems.filter((i) => rt(this.hass, i.id) === "on").map((i) => ({ kind: "warn", title: this.applianceName(n), text: this.t.house.problem[i.kind] }))), s = this.popupItems(t).flatMap((n) => {
      if (!n.warnAfter || !n.running || this.applianceOn(n, t) !== !0) return [];
      const o = this.cycleTimes(n, !0).minutes;
      return o !== void 0 && o >= n.warnAfter ? [{ kind: "warn", title: n.name, text: this.t.house.runningLong(pe(o)) }] : [];
    });
    return [...e, ...s];
  }
  // ----------------------------------------------------------------- the popup
  /**
   * The rows are decided when the popup opens (uživatel 9. 11. 2026, "Q1 B"): at most five, the running cycles always among them, the rest by power
   * (an appliance or a member of a group runs by its helper, without one by its power above the threshold); shown from the largest power.
   */
  freezeHouse(t) {
    const e = (r) => V(this.hass, r.power) ?? 0, s = (r, l) => e(l) - e(r), n = this.popupItems(t).filter((r) => this.applianceOn(r, t) === !0), o = n.filter((r) => r.cycle).sort(s).slice(0, ds), i = n.filter((r) => !r.cycle).sort(s).slice(0, ds - o.length);
    this._houseFrozen = [...o, ...i].sort(s).map((r) => r.key);
  }
  /** The order of the detail, decided when it opens: what runs (an appliance by its helper or power, a group by the sum of its power) from the largest power, the rest after it. */
  houseOrder(t) {
    const e = [];
    for (const s of this.listed(t)) this.applianceOn(s, t) === !0 && e.push({ key: s.name, watts: V(this.hass, s.power) ?? 0 });
    return t.groups.forEach((s, n) => {
      const o = s.appliances.map((r) => V(this.hass, r.power));
      if (o.some((r) => r === void 0)) return;
      const i = o.reduce((r, l) => r + l, 0);
      Q(i, t.num.flows.idle_threshold) && e.push({ key: je(n), watts: i });
    }), e.sort((s, n) => n.watts - s.watts).map((s) => s.key);
  }
  /** The order of the table of each group, decided when the detail opens: from the largest power now, the unknown ones last (uživatel 9. 11. 2026, "Q19 ok"). */
  memberOrder(t) {
    return Object.fromEntries(
      t.groups.map((e, s) => [s, e.appliances.map((n) => ({ power: n.power, watts: V(this.hass, n.power) ?? -1 })).sort((n, o) => o.watts - n.watts).map((n) => n.power)])
    );
  }
  renderHousePopup(t, e, s) {
    const n = this.t, o = e.num.flows.idle_threshold, i = Q(s.other, o), r = this.today(e), l = this.popupItems(e), c = (this._houseFrozen ?? []).map((h) => l.find((p) => p.key === h)).filter((h) => !!h), d = i ? it(s.other, "W").replace(" ", " ") : s.other === void 0 ? D : n.idle.house;
    return f`<ed-sheet open .heading=${t.name} .sub=${d} .closeLabel=${n.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop house-pop">
        <div class="pop-rows">
          ${c.map((h) => {
      const p = V(this.hass, h.power), b = this.applianceOn(h, e), y = this.listed(e).find(($) => $.name === h.key), m = y ? this.applianceStatus(y, e) : void 0, u = this.cycleTimes(h, b).minutes, g = b && h.running && u !== void 0 ? `${h.name} · ${pe(u)}` : h.name, v = p === void 0 ? f`<b>${D}</b>` : Q(p, o) || b || !h.cycle ? f`<b>${it(p, "W").replace(" ", " ")}</b>` : this.renderIdleMark();
      return f`<div class="house-app" title=${m ?? ""}><span class="ell">${h.icon ? f`<ha-icon class="house-icon" icon=${h.icon}></ha-icon>` : k}${g}</span>${v}</div>`;
    })}
          <div class="pop-row"><span>${n.pop.rows.consumed}</span><b>${r.house === void 0 ? D : `${st(r.house)} kWh`}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openHouseDetail()}><span>${n.house.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- state and history
  houseRange(t) {
    if (this._houseRange) return this._houseRange;
    try {
      const e = localStorage.getItem(cs);
      if (e && Ue.includes(e)) return e;
    } catch {
    }
    return t.houseRange;
  }
  setHouseRange(t) {
    this._houseRange = t, this._batScrub = {};
    try {
      localStorage.setItem(cs, t);
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
    const e = this.hass;
    if (!e) return;
    const s = Date.now();
    this._houseToday = { ...this._houseToday ?? {}, at: s, detail: this._houseDetail };
    const n = [t.entities.wallbox.power, t.entities.boiler.power].filter((c) => !!c), o = this._houseDetail ? this.appliances(t).map((c) => c.energy).filter((c) => !!c) : [], i = this._houseDetail ? t.groups.flatMap((c) => c.appliances) : [], r = i.map((c) => c.energy).filter((c) => !!c), l = i.filter((c) => !c.energy).map((c) => c.power);
    if (!(!n.length && !o.length && !r.length && !l.length))
      try {
        const c = new Date(s);
        c.setHours(0, 0, 0, 0);
        const d = await Wt(e, [...n, ...l], c.getTime(), s, "5minute", ["mean"]), h = o.length || r.length ? await Wt(e, [...o, ...r], c.getTime(), s, "5minute", ["change"]) : {}, p = {};
        for (const m of i)
          if (m.energy) {
            const u = h[m.energy];
            At(u, "change") && (p[m.power] = u.reduce((g, v) => g + (typeof v.change == "number" ? v.change : 0), 0));
          } else {
            const u = d[m.power];
            At(u, "mean") && (p[m.power] = u.reduce((g, v) => g + (typeof v.mean == "number" ? v.mean : 0), 0) / 12 / 1e3);
          }
        const b = {};
        for (const m of o) {
          const u = h[m];
          At(u, "change") && (b[m] = u.reduce((g, v) => g + (typeof v.change == "number" ? v.change : 0), 0));
        }
        const y = (m) => {
          const u = m ? d[m] : void 0;
          return At(u, "mean") ? u.reduce((g, v) => g + (typeof v.mean == "number" ? v.mean : 0), 0) / 12 / 1e3 : void 0;
        };
        this._houseToday = { at: s, car: y(t.entities.wallbox.power), boil: y(t.entities.boiler.power), apps: b, groups: p, detail: this._houseDetail };
      } catch {
        this._houseToday = { at: s, detail: this._houseDetail };
      }
  }
  /** The first moment and the number of bins of the chart: today by hours from midnight to midnight, or whole days up to today (uživatel 9. 11. 2026, "Q8 ok": 1 den = od půlnoci). */
  houseWindow(t, e) {
    if (t === "day" || t === "1d") {
      const s = new Date(e);
      return s.setHours(0, 0, 0, 0), { start: s.getTime(), bins: 24, step: at };
    }
    return { ...this.histWindow(t, e), step: It };
  }
  async fetchHouse(t, e, s, n) {
    const o = this.hass;
    if (!o) return;
    const i = Date.now();
    this._houseData = { ...this._houseData, [e]: { status: "loading", at: i, parts: n?.parts ?? {} } };
    try {
      const r = this.houseWindow(s, i), l = s === "1d" || s === "day" ? "hour" : "day", c = (...w) => w.filter((j) => !!j), d = t.entities, h = r.start + Math.min(r.bins - 1, Math.max(0, Math.floor((i - r.start) / r.step))) * r.step, p = this.listed(t), b = t.groups.flatMap((w) => w.appliances), y = s === "day", m = c(...y ? [] : [d.pv.total_generation, d.battery.total_discharge, d.battery.total_charge, d.grid.total_import, d.grid.total_export], ...p.map((w) => w.energy), ...b.map((w) => w.energy)), u = c(...y ? [] : [d.wallbox.power, d.boiler.power], ...p.filter((w) => !w.energy).map((w) => w.power), ...b.filter((w) => !w.energy).map((w) => w.power)), [g, v, $, S] = await Promise.all([
        Wt(o, m, r.start, i, l, ["change"]),
        Wt(o, u, r.start, i, l, ["mean"]),
        // The running bin (hour or day) has no row in the long-term statistics yet: the 5-minute rows fill it.
        Wt(o, m, h, i, "5minute", ["change"]),
        Wt(o, u, h, i, "5minute", ["mean"])
      ]);
      this._houseData = { ...this._houseData, [e]: { status: "ready", at: i, parts: { energy: g, power: v, nowCounters: $, nowPowers: S } } };
    } catch {
      this._houseData = { ...this._houseData, [e]: { status: "error", at: i, parts: {} } };
    }
  }
  /** The cycles of the helpers: the moments the helper turned on and off (the states of the recorder). A gap (unavailable, e.g. a restart of Home Assistant) is not a change: a cycle that ran before it and is over after it ended when the gap began. */
  async fetchCycles(t) {
    const e = this.hass;
    if (!e) return;
    const s = Date.now();
    this._houseCycles = { at: s, byId: this._houseCycles?.byId ?? {} };
    const n = [...this.appliances(t).map((o) => o.running), ...t.groups.flatMap((o) => o.appliances.map((i) => i.running))].filter((o, i, r) => !!o && r.indexOf(o) === i);
    if (n.length)
      try {
        const o = await e.callWS({
          type: "history/history_during_period",
          start_time: new Date(s - ti * It).toISOString(),
          end_time: new Date(s).toISOString(),
          entity_ids: n,
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        }), i = {};
        for (const [r, l] of Object.entries(o ?? {})) {
          const c = [], d = [];
          let h, p;
          for (const b of l) {
            const y = b.s ?? b.state, m = b.lu ?? b.last_updated, u = typeof m == "number" ? m * 1e3 : m ? Date.parse(m) : NaN;
            if (Number.isFinite(u)) {
              if (y === void 0 || y === "unavailable" || y === "unknown") {
                h !== void 0 && p === void 0 && (p = u);
                continue;
              }
              h !== void 0 && y !== h && (y === "on" ? c.push(u) : y === "off" && d.push(h === "on" && p !== void 0 ? p : u)), h = y, p = void 0;
            }
          }
          i[r] = { starts: c, ends: d };
        }
        this._houseCycles = { at: s, byId: i };
      } catch {
        this._houseCycles = { at: s, byId: {} };
      }
  }
  // ----------------------------------------------------------------- the detail
  renderHouseDetail(t, e) {
    const s = this.t, n = this.houseRange(t), o = Ue.map((b) => ({ value: b, label: s.bat.ranges[b] })), i = ["now", "hist"].map((b) => ({ value: b, label: s.house.tabs[b] })), r = "W", l = this._houseOrder ?? [], c = [
      ...this.listed(t).map((b) => ({ key: b.name, label: this.applianceName(b), group: !1, render: () => this.renderApplianceRow(b, t, r) })),
      ...t.groups.map((b, y) => ({ key: je(y), label: "", group: !0, render: () => this.renderGroupRow(b, y) }))
    ].sort((b, y) => {
      const m = l.indexOf(b.key), u = l.indexOf(y.key);
      return m >= 0 || u >= 0 ? (m < 0 ? 999 : m) - (u < 0 ? 999 : u) : Number(b.group) - Number(y.group) || (b.group ? 0 : b.label.localeCompare(y.label));
    }), d = this.houseChart(t, n), h = this._houseData[`hist:${n}`], p = h?.status === "loading" && !Object.keys(h.parts).length;
    return f`<section class="bat-detail house-detail" role="dialog" aria-modal="true" aria-label=${s.house.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeHouseDetail()}>‹ ${s.house.back}</button>
          <h2>${s.house.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeHouseDetail()}>${s.house.done}</button>
        </div>
        <ed-segmented .options=${i} .value=${this._houseTab} label=${s.house.tabsLabel} @hdk-select=${(b) => {
      this._houseTab = b.detail.value, this._batScrub = {};
    }}></ed-segmented>
        ${this._houseTab === "now" ? f`<div class="bat-card"><span class="bat-cap">${s.house.nowLabel}</span>
              <span class="house-hero">${e.other === void 0 ? D : it(e.other, r)}</span></div>
            <div class="house-list"><span class="bat-cap">${s.house.appliances}</span>
              ${c.length ? c.map((b) => b.render()) : f`<div class="bat-card"><span>${s.house.none}</span><span class="bat-sub">${this.labelDiagnostics(t)}</span></div>`}
            </div>` : f`<ed-segmented .options=${o} .value=${n} label=${s.house.rangeLabel} @hdk-select=${(b) => this.setHouseRange(b.detail.value)}></ed-segmented>
            <div class="bat-card"><span class="bat-cap">${Dt([n === "1d" ? s.house.chartHours : s.house.chartDays, f`<span class="unit">kWh</span>`])}</span>
              ${d ? this.renderChart(d) : f`<div class="bat-nodata" style="aspect-ratio:${G} / 220">${p ? D : s.bat.noDataChart}</div>`}
            </div>`}
      </section>`;
  }
  /**
   * A group of appliances (house.groups): one row. Closed: the power now (the sum) and the energy of today; open: every appliance with its
   * power now and its energy of today. No cycles, no threshold: what the appliances draw is shown as it is. A sum counts only when every appliance is known.
   */
  renderGroupRow(t, e) {
    const s = je(e), n = this._houseOpen.includes(s), o = this._houseMembers?.[e] ?? [], i = t.appliances.map((h) => ({ power: h.power, name: this.pickText(h.name) ?? "", watts: V(this.hass, h.power), kwh: this._houseToday?.groups?.[h.power] })).sort((h, p) => (o.indexOf(h.power) < 0 ? 999 : o.indexOf(h.power)) - (o.indexOf(p.power) < 0 ? 999 : o.indexOf(p.power))), r = (h) => h.every((p) => p !== void 0) ? h.reduce((p, b) => p + b, 0) : void 0, l = (h) => h === void 0 ? D : it(h, "W").replace(" ", " "), c = (h) => h === void 0 ? D : `${st(h)} kWh`, d = this.t;
    return f`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${n ? "true" : "false"} @click=${() => {
      this._houseOpen = n ? this._houseOpen.filter((h) => h !== s) : [...this._houseOpen, s];
    }}>
          <ha-icon class="house-icon" icon=${t.icon}></ha-icon>
          <span class="bat-col"><span class="bat-label">${this.pickText(t.name) ?? ""}</span><span class="bat-sub">${d.house.today} ${c(r(i.map((h) => h.kwh)))}</span></span>
          <span class="bat-value">${l(r(i.map((h) => h.watts)))}</span>
          <svg class="chev ${n ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${n ? f`<div class="house-body">
            <div class="house-cook">
              <span class="house-cook-head"></span><span class="house-cook-head">${d.house.nowCol}</span><span class="house-cook-head">${d.house.totalCol}</span>
              ${i.map((h) => f`<span class="house-cook-name">${h.name}</span><b>${l(h.watts)}</b><b>${c(h.kwh)}</b>`)}
            </div>
            ${this.renderDayChart(t.appliances.map((h, p) => ({ name: this.pickText(h.name) ?? "", energy: h.energy, power: h.power, color: re[p % re.length] })).sort((h, p) => (o.indexOf(h.power) < 0 ? 999 : o.indexOf(h.power)) - (o.indexOf(p.power) < 0 ? 999 : o.indexOf(p.power))))}
          </div>` : k}
      </div>`;
  }
  renderApplianceRow(t, e, s) {
    const n = this.t, o = this._houseOpen.includes(t.name), i = V(this.hass, t.power), r = this.applianceOn(t, e), l = this.applianceStatus(t, e) ?? (r === !1 ? n.house.notRunning : D), c = i !== void 0 && Q(i, e.num.flows.idle_threshold), d = i === void 0 ? f`<span class="bat-value">${D}</span>` : c ? f`<span class="bat-value">${it(i, s)}</span>` : r ? f`<span class="bat-value">${N(i)}\u00a0W</span>` : this.renderIdleMark(), h = this.cycleTimes(t, r), p = this.cycleKwh(t), b = /* @__PURE__ */ new Date();
    b.setHours(0, 0, 0, 0);
    const y = t.running ? this._houseCycles?.byId[t.running] : void 0, m = y ? y.starts.filter((C) => C >= b.getTime()).length : void 0, u = Math.max(0, this.listed(e).findIndex((C) => C.name === t.name)), g = re[u % re.length], v = (C, E) => `${this.stamp(C)} – ${E}`, $ = t.running && h.start !== void 0 ? f`<div class="house-line wrap"><span>${r ? n.house.currentCycle : n.house.lastCycle}</span><b>${Dt([v(h.start, r ? n.house.axisTo : this.stamp(h.end ?? h.start, h.start)), ...p !== void 0 ? [`${st(p)} kWh`] : []])}</b></div>` : t.running && h.end !== void 0 && !r ? f`<div class="house-line wrap"><span>${n.house.lastCycle}</span><b>${n.house.endedAt(this.stamp(h.end))}</b></div>` : k, S = this.renderDayChart([{ name: this.applianceName(t), energy: t.energy, power: t.power, color: g }]), w = t.energy ? this._houseToday?.apps?.[t.energy] : void 0, j = t.plug ? rt(this.hass, t.plug) : void 0, L = t.problems.find((C) => rt(this.hass, C.id) === "on"), M = (C, E) => f`<div class="house-line"><span>${C}</span><b>${zt(E)}</b></div>`;
    return f`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${o ? "true" : "false"} @click=${() => {
      this._houseOpen = o ? this._houseOpen.filter((C) => C !== t.name) : [...this._houseOpen, t.name];
    }}>
          ${this.renderApplianceIcon(t)}
          <span class="bat-col"><span class="bat-label">${this.applianceName(t)}</span><span class="bat-sub">${zt(l)}</span></span>
          ${d}
          <svg class="chev ${o ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${o ? f`<div class="house-body">
              ${L ? M(n.house.problem[L.kind], "") : k}
              ${$}
              ${t.running && m !== void 0 ? M(n.house.today, n.house.cyclesCount(m, w === void 0 ? "" : st(w))) : k}
              ${S}
              ${j === "off" ? M(n.house.plug, n.house.plugOff) : k}
            </div>` : k}
      </div>`;
  }
  /** "Co se dělo": the consumption of the house (without the car and the boiler) in kWh per hour or per day, broken down by the appliances. */
  /** The energy per bin of the statistics of a view: from the counter (the running bin from its 5-minute rows), otherwise from the mean power. */
  houseSeries(t, e) {
    const s = t.at, n = this.houseWindow(e, s), o = n.bins, i = n.start + o * n.step, r = n.step / at, l = Math.min(o - 1, Math.max(0, Math.floor((s - n.start) / n.step))), c = t.parts.energy ?? {}, d = t.parts.power ?? {}, h = t.parts.nowCounters ?? {}, p = t.parts.nowPowers ?? {};
    return { at: s, w: n, n: o, cur: l, counter: (m) => {
      if (!m || !At(c[m], "change")) return;
      const u = Ct(c[m], "change", n.start, i, o, "sum"), g = h[m];
      return At(g, "change") && (u[l] = g.reduce((v, $) => v + (typeof $.change == "number" ? $.change : 0), 0)), u;
    }, meanKwh: (m) => {
      if (!m || !At(d[m], "mean")) return;
      const u = Ct(d[m], "mean", n.start, i, o, "mean").map((v) => v === void 0 ? void 0 : v * r / 1e3), g = p[m];
      if (At(g, "mean")) {
        const v = g, $ = v.reduce((S, w) => S + (typeof w.mean == "number" ? w.mean : 0), 0) / v.length;
        u[l] = $ * Math.min(r, Math.max(0, (s - (n.start + l * n.step)) / at)) / 1e3;
      }
      return u;
    } };
  }
  /** The reading of a bar (and the legend at once): the moment and the total, then every part with its colour and its energy. */
  renderReading(t, e, s, n) {
    return f`<div class="house-panel" role="group" aria-label=${t}>
        <div class="house-panel-head"><span>${t}</span><b>${s}\u00a0${st(e)}\u00a0kWh</b></div>
        ${n.map((o) => f`<div class="house-panel-row"><i style="background:${o.color}"></i><span>${o.name}</span><b>${o.kwh === void 0 ? D : `${st(o.kwh)} kWh`}</b></div>`)}
      </div>`;
  }
  /**
   * A small trend of today by hours (from midnight to midnight) in the row of an appliance (one colour) or of a group (the appliances
   * of the group stacked, a legend names them): when it was cooking, when it was washing. No axis of values, no reading. Without statistics nothing.
   */
  renderDayChart(t) {
    const e = this.t, s = this._houseData.day;
    if (!s || s.status === "error" || !Object.keys(s.parts).length) return k;
    const { n, counter: o, meanKwh: i } = this.houseSeries(s, "day"), r = t.map(($) => ({ ...$, list: $.energy ? o($.energy) : i($.power) })).filter(($) => $.list && $.list.some((S) => typeof S == "number"));
    if (!r.length) return k;
    const l = ($, S) => $?.[S] ?? 0;
    let c = 0;
    for (let $ = 0; $ < n; $++) c = Math.max(c, r.reduce((S, w) => S + l(w.list, $), 0));
    const d = 44, h = 42, p = c > 0 ? me(c) : 0, b = p > 0 ? 36 / p : 0, y = /* @__PURE__ */ new Date();
    y.setHours(0, 0, 0, 0);
    const m = $a({ start: y.getTime(), end: y.getTime() + 24 * at }), u = G / n, g = u * 0.72, v = Array.from({ length: n }, ($, S) => {
      let w = 0;
      return r.map((j) => {
        const L = l(j.list, S);
        if (L <= 0) return k;
        const M = Math.max(1.5, L * b), C = h - w - M;
        return w += M + 1, K`<rect x=${(S * u + (u - g) / 2).toFixed(1)} y=${C.toFixed(1)} width=${g.toFixed(1)} height=${M.toFixed(1)} style="fill:${j.color}"></rect>`;
      });
    });
    return f`<div class="house-micro">
        <span class="house-micro-cap">${Dt([e.house.chartToday, f`<span class="unit">kWh</span>`])}</span>
        <svg viewBox="0 0 ${G + Vt} ${d}" role="img" aria-label=${e.house.chartToday}>
          ${m.map(($) => K`<line x1=${$.x} y1="0" x2=${$.x} y2=${h} style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>`)}
          <line x1="0" y1="6" x2=${G} y2="6" style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>
          <line x1="0" y1=${h} x2=${G} y2=${h} style="stroke:var(--ed-tick);stroke-width:1.5"></line>
          ${v}
          <text x=${G + 9} y="10" style="fill:var(--ed-secondary)" font-size="12">${p > 0 ? N(p, p % 1 ? 1 : 0) : ""}</text>
        </svg>
        <div class="bat-axis ticks" aria-hidden="true">${m.map(($) => f`<span style="left:${($.x / (G + Vt) * 100).toFixed(1)}%;transform:translateX(${$.x < 8 ? "0" : $.x > G - 8 ? "-100%" : "-50%"})">${$.text}</span>`)}</div>
        ${r.length > 1 ? f`<div class="house-micro-legend">${r.map(($) => f`<span><i style="background:${$.color}"></i>${$.name}</span>`)}</div>` : k}
      </div>`;
  }
  houseChart(t, e) {
    const s = this.t, n = this._houseData[`hist:${e}`];
    if (!n || n.status === "error" || !Object.keys(n.parts).length) return;
    const o = t.entities, { w: i, n: r, counter: l, meanKwh: c } = this.houseSeries(n, e), d = l(o.pv.total_generation), h = l(o.battery.total_discharge), p = l(o.battery.total_charge), b = l(o.grid.total_import), y = l(o.grid.total_export), m = c(o.wallbox.power), u = c(o.boiler.power);
    if (!d && !h && !p && !b && !y) return;
    const g = (H, I) => H?.[I] ?? 0, v = !m || !u, $ = Array.from({ length: r }, (H, I) => Math.max(0, g(d, I) + g(h, I) + g(b, I) - g(p, I) - g(y, I) - g(m, I) - g(u, I))), S = (H) => {
      const I = H.filter((xt) => !!xt);
      return I.length ? Array.from({ length: r }, (xt, ne) => I.every((Mt) => Mt[ne] === void 0) ? void 0 : I.reduce((Mt, vt) => Mt + (vt[ne] ?? 0), 0)) : void 0;
    }, w = [
      ...this.listed(t).map((H) => ({ name: this.applianceName(H), list: H.energy ? l(H.energy) : c(H.power) })),
      ...t.groups.map((H) => ({ name: this.pickText(H.name) ?? "", list: S(H.appliances.map((I) => I.energy ? l(I.energy) : c(I.power))) }))
    ].map((H, I) => ({ ...H, color: re[I % re.length] })).filter((H) => H.list && H.list.some((I) => typeof I == "number")), j = (H) => Math.max($[H], w.reduce((I, xt) => I + g(xt.list, H), 0));
    let L = 0;
    for (let H = 0; H < r; H++) L = Math.max(L, j(H));
    if (L <= 0) return;
    const M = me(L), C = 220, E = 200, _ = 180 / M, A = 0, B = Math.min(18, (G - A) / r * 0.72), x = (H) => A + (H + 0.5) / r * (G - A), z = Array.from({ length: r }, (H, I) => {
      let xt = 0;
      const ne = w.reduce((vt, ye) => vt + g(ye.list, I), 0);
      return [...w.map((vt) => ({ value: g(vt.list, I), color: vt.color })), { value: Math.max(0, $[I] - ne), color: "#8E8E93" }].map((vt) => {
        if (vt.value <= 0) return k;
        const ye = Math.max(0.6, vt.value * _), Ws = E - xt - ye;
        return xt += ye + 1, K`<rect x=${(x(I) - B / 2).toFixed(1)} y=${Ws.toFixed(1)} width=${B.toFixed(1)} height=${ye.toFixed(1)} style="fill:${vt.color}"></rect>`;
      });
    }), tt = (H) => {
      const I = i.start + H * i.step;
      return e === "1d" ? `${de(I)} ${ot(I)}–${ot(I + at)}` : de(I);
    }, P = (H) => Math.max($[H], w.reduce((I, xt) => I + g(xt.list, H), 0)), T = v ? s.house.houseTotal : s.house.sum, W = (H) => `${tt(H)} · ${T} ${st(P(H))} kWh`, ft = (H) => {
      const I = P(H), xt = w.reduce((Mt, vt) => Mt + g(vt.list, H), 0), ne = w.length ? [...w.map((Mt) => ({ name: Mt.name, kwh: Mt.list?.[H], color: Mt.color })).sort((Mt, vt) => (vt.kwh ?? -1) - (Mt.kwh ?? -1)), { name: s.house.houseRest, kwh: Math.max(0, I - xt), color: "#8E8E93" }] : [];
      return this.renderReading(tt(H), I, T, ne);
    }, St = Array.from({ length: r }, (H, I) => I), mt = w.map((H) => ({ name: H.name, kwh: St.reduce((I, xt) => I + g(H.list, xt), 0), color: H.color })).sort((H, I) => I.kwh - H.kwh), dt = mt.reduce((H, I) => H + I.kwh, 0), Pt = e === "1d" ? this.today(t).house : void 0, se = Math.max(Pt ?? St.reduce((H, I) => H + P(I), 0), dt), Kt = () => this.renderReading(Ca, se, T, w.length ? [...mt, { name: s.house.houseRest, kwh: Math.max(0, se - dt), color: "#8E8E93" }] : []), Ca = e === "1d" ? s.house.today : s.bat.ranges[e], Is = () => `${Ca} · ${T} ${st(se)} kWh`, Fs = [d, h, p, b, y].some((H) => H && H[0] === void 0);
    return {
      id: `house-${e}`,
      h: C,
      // The top line is the value `max` exactly (the bars are drawn on the scale of 180 above the base).
      grid: [{ y: E - 180 }, { y: E, strong: !0 }],
      labels: [{ y: E - 180, text: `${M}` }, { y: E, text: "0" }],
      time: { start: i.start, end: i.start + r * i.step, x0: A, x1: G, slot: i.step },
      valueNum: (H) => (E - H) / 180 * M,
      valueAt: (H) => {
        const I = (E - H) / 180 * M;
        return I % 1 ? st(I) : N(I);
      },
      body: K`${z}`,
      n: r,
      x,
      read: W,
      from: Fs ? s.house.dataFrom(de(i.start)) : s.house.axisFrom[e],
      to: s.house.axisTo,
      fade: 0,
      panel: ft,
      whole: Kt,
      wholeText: Is()
    };
  }
};
function oi(a, t) {
  return { sources: [...yt], sinks: t.slice().sort((e, s) => fe.indexOf(e) - fe.indexOf(s)) };
}
function ii(a, t = fe, e = yt) {
  const s = Math.round(Math.max(116, Math.min(132, a * 0.377))), n = 56, o = 6, i = Math.max(1, t.length), r = i * n + (i - 1) * o, l = Object.fromEntries(t.map((d, h) => [d, n / 2 + h * (n + o)])), c = Object.fromEntries(
    e.map((d, h) => [d, i < 4 ? n / 2 + h * (n + o) : (h + 0.5) * r / yt.length])
  );
  return { width: a, tile: { w: s, h: n }, gap: o, height: r, left: c, right: l, xa: s - 8, xb: a - s + 8 };
}
const ht = (a) => a.toFixed(1);
function ri(a, t, e) {
  const s = a.filter((u) => u.to in t.right);
  if (!s.length) return [];
  const n = (u) => Math.sqrt(u.watts / 1e3), o = (u) => {
    const g = /* @__PURE__ */ new Map();
    for (const v of s) g.set(v[u], (g.get(v[u]) ?? 0) + n(v));
    return g;
  }, i = Math.max(...o("from").values(), ...o("to").values()), r = Math.min(e.maxPxPerKw, 44 / i), l = (u) => Math.max(e.minPx, n(u) * r), c = /* @__PURE__ */ new Map();
  for (const u of yt) {
    const g = s.filter((v) => v.from === u).reduce((v, $) => v + l($), 0);
    c.set(u, t.left[u] - g / 2);
  }
  const d = /* @__PURE__ */ new Map();
  for (const u of fe.filter((g) => g in t.right)) {
    const g = s.filter((v) => v.to === u).reduce((v, $) => v + l($), 0);
    d.set(u, t.right[u] - g / 2);
  }
  const h = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const u of yt)
    for (const g of s.filter((v) => v.from === u).sort((v, $) => t.right[v.to] - t.right[$.to]))
      h.set(g, c.get(u)), c.set(u, c.get(u) + l(g));
  for (const u of fe.filter((g) => g in t.right))
    for (const g of s.filter((v) => v.to === u).sort((v, $) => t.left[v.from] - t.left[$.from]))
      p.set(g, d.get(u)), d.set(u, d.get(u) + l(g));
  const { xa: b, xb: y } = t, m = (b + y) / 2;
  return s.map((u) => {
    const g = l(u), v = h.get(u), $ = v + g, S = p.get(u), w = S + g;
    return {
      from: u.from,
      to: u.to,
      watts: u.watts,
      thickness: g,
      d: `M${b} ${ht(v)} C${ht(m)} ${ht(v)} ${ht(m)} ${ht(S)} ${y} ${ht(S)} L${y} ${ht(w)} C${ht(m)} ${ht(w)} ${ht(m)} ${ht($)} ${b} ${ht($)} Z`,
      centre: `M${b} ${ht(v + g / 2)} C${ht(m)} ${ht(v + g / 2)} ${ht(m)} ${ht(S + g / 2)} ${y} ${ht(S + g / 2)}`
    };
  });
}
function hs(a) {
  const t = a?.match(/^(\d{1,2}):(\d{2})/);
  return t ? Number(t[1]) * 60 + Number(t[2]) : void 0;
}
function Rs(a, t, e, s, n) {
  if (a(t) !== "on") return;
  const o = hs(a(e)), i = hs(a(s));
  if (o === void 0 || i === void 0 || o === i) return;
  const r = new Date(n), l = r.getHours() * 60 + r.getMinutes();
  if (o < i ? l >= o && l < i : l >= o || l < i) return;
  const d = (h) => ot(new Date(r.getFullYear(), r.getMonth(), r.getDate(), Math.floor(h / 60), h % 60).getTime());
  return `${d(o)}–${d(i)}`;
}
function li(a, t, e, s, n) {
  const o = t.entities.wallbox, i = t.num.flows.idle_threshold;
  if (a(o.block_charging) === "on" && a(o.block_by_automation) !== "on") return s.reasons.blocked;
  if (a(o.block_solar) === "on") return s.reasons.solarBlocked;
  const r = Rs(a, o.window, o.window_start, o.window_end, n);
  if (r) return s.reasons.outsideWindow(r);
  if (e.sun !== void 0)
    return Q(e.sun, i) ? Q(e.boil, i) && a(t.entities.boiler.boost) !== "on" ? s.reasons.waterFirst : Q(e.batIn, i) && (e.soc === void 0 || e.soc < t.num.battery.full) ? s.reasons.batteryCharges : (e.exp ?? 0) >= t.num.wallbox.power_min ? s.reasons.carNotTaking : s.reasons.littleSurplus : s.reasons.noSun;
}
function di(a, t, e, s, n) {
  const o = t.entities.wallbox;
  if (a(o.block_charging) === "on" && a(o.block_by_automation) !== "on") return e.reasons.blocked;
  if (!(n !== void 0 && Number.isFinite(n) && s - n < t.num.wallbox.boost_grace * 1e3))
    return e.reasons.carNotTaking;
}
function ci(a, t, e, s, n) {
  const o = t.entities.boiler;
  if ((e.exp ?? 0) <= t.num.flows.export_notice || Q(e.boil, t.num.flows.idle_threshold)) return;
  if (a(o.block_solar) === "on") return s.reasons.solarBlocked;
  const i = Rs(a, o.window, o.window_start, o.window_end, n);
  if (i) return s.reasons.outsideWindow(i);
  const r = Number(a(o.target_temperature));
  if (e.boilTemp !== void 0 && Number.isFinite(r) && e.boilTemp >= r - t.num.boiler.hot_margin) return s.reasons.heated;
}
function hi(a, t, e, s) {
  if (e.summary !== s.summary.exportSurplus) return;
  const n = a(t.entities.battery.operation_mode);
  if (n && n !== "general") return s.reasons.inverterMode(s.reasons.inverterModes[n] ?? n);
  if (e.soc !== void 0 && e.soc >= t.num.battery.full) return s.reasons.batteryFull;
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
}, aa = 42, sa = 10, pi = 12, ui = 34, gi = (a) => class extends a {
  onKey(t) {
    t.key === "Escape" && this._houseDetail ? this.closeHouseDetail() : t.key === "Escape" && this._batDetail ? this.closeBatteryDetail(!0) : t.key === "Escape" && this._sunDetail ? this.closeSunDetail() : t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const s = this.t, n = t.entities.wallbox, o = [], i = rt(this.hass, n.block_charging) === "on", r = i && rt(this.hass, n.block_by_automation) === "on";
    if (i && !r && o.push({ kind: "warn", ...s.alerts.blocked }), rt(this.hass, t.entities.boiler.boost) === "on") {
      const l = rt(this.hass, t.entities.tank.water_heater);
      o.push({ kind: "warn", title: s.alerts.boostBoiler.title, text: l !== void 0 && l !== "off" ? s.alerts.boostBoilerGas : s.alerts.boostBoiler.text });
    }
    return o.push(...this.houseAlerts(t)), o;
  }
  renderAlerts(t, e) {
    const s = this.alerts(t, e);
    return s.length ? f`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${s.map(
      (n) => f`<li class="alert ${n.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${n.kind === "warn" ? et.alert : et.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${n.title}</span><span class="alert-text">${n.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : k;
  }
  renderElectricity(t, e) {
    const s = e.summarySource ? `var(${Xt[e.summarySource]})` : void 0;
    return f`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(n) => {
      n.stopPropagation(), this.openAll();
    }}>
              ${this.pickText(t.titles.electricity) ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${et.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(this.summaryWithReason(t, e), s)}
        </div>
        ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : k}
      </section>`;
  }
  /** „Přebytek jde do sítě“ with why the battery does not take it (H8, src/reasons.ts). */
  summaryWithReason(t, e) {
    const s = hi((n) => rt(this.hass, n), t, e, this.t);
    return s && e.summary ? [e.summary, s] : e.summary;
  }
  openAll() {
    this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, e) {
    const s = this.t, n = t.entities, o = t.num.scale, i = t.num.flows.idle_threshold, r = e.carLink, l = e.soc, c = l !== void 0 && l <= this.batteryReserve(t), d = (w) => l === void 0 ? void 0 : { f: l / 100, active: w, color: c ? "var(--ed-warning)" : "var(--ed-battery)", a1: c ? 0.5 : 0.58 }, h = (w) => `${s.tileSpoken.batteryState(w)}, ${l === void 0 ? s.noData : s.tileSpoken.chargeLevel(U(l))}${c ? `, ${s.tileSpoken.atReserve}` : ""}`, p = r === "connected" || r === "charging" || Q(e.car, i), b = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, V(this.hass, n.boiler.target_temperature) ?? 0), m = e.boilTemp, u = (w) => Q(w, i), g = e.loadShare.house, v = yt.filter((w) => g[w] >= 0.02), $ = u(e.other) && v.length ? this.houseBackground(v, g, nt((e.other ?? 0) / o.house, 0, 1)) : void 0, S = [
      { side: "L", key: "sun", name: s.tile.sun, watts: e.sun, k: (e.sun ?? 0) / o.sun, icon: et.sun, idleIcon: et.moon, idleText: s.idle.sun, aria: e.sun === void 0 ? s.noData : "" },
      { side: "L", key: "bat", name: s.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / o.battery, icon: et.battery, icon2: et.batteryDown, idleIcon: et.pause, idleText: s.idle.bat, level: d(u(e.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: s.tile.grid, watts: e.imp, k: (e.imp ?? 0) / o.grid, icon: et.grid, idleIcon: et.minus, idleText: s.idle.grid, aria: e.imp === void 0 ? s.noData : u(e.imp) ? s.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: s.tile.house, watts: e.other, k: (e.other ?? 0) / o.house, icon: et.home, idleIcon: et.minus, idleText: s.idle.house, background: $, aria: e.other === void 0 ? s.noData : s.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const w = p && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: u(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      S.push({
        side: "R",
        key: "car",
        name: s.tile.car,
        watts: r === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / o.car,
        icon: et.car,
        idleIcon: r === "disconnected" ? et.minus : et.plug,
        idleText: r === "disconnected" ? s.idle.carDisconnected : r === void 0 ? s.idle.carNoState : s.idle.carConnected,
        level: w,
        aria: [r === void 0 && e.car === void 0 ? s.noData : u(e.car) ? s.tileSpoken.charging : "", p && e.carSoc !== void 0 ? s.tileSpoken.chargeLevel(U(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const w = m === void 0 ? void 0 : { f: nt((m - b) / (y - b), 0, 1), active: u(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      S.push({
        side: "R",
        key: "boil",
        name: s.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / o.boiler,
        icon: et.therm,
        idleIcon: et.pause,
        idleText: s.idle.boil,
        level: w,
        aria: [m === void 0 ? s.noData : s.tileSpoken.temperature(`${N(m)} °C`), u(e.boil) ? s.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return S.push(
      { side: "R", key: "batIn", name: s.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / o.battery, icon: et.battery, icon2: et.batteryBolt, idleIcon: et.pause, idleText: s.idle.batIn, level: d(u(e.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: s.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / o.grid, icon: et.grid, idleIcon: et.minus, idleText: s.idle.gridOut, aria: e.exp === void 0 ? s.noData : u(e.exp) ? s.tileSpoken.gridExport : "" }
    ), S;
  }
  renderFlow(t, e) {
    const s = t.num.flows.idle_threshold, n = ma(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((h) => Q(h, s) ? h : void 0),
      t.num.flows.kw_from
    ), o = this.tiles(t, e), i = oi(e.flows, o.filter((h) => h.side === "R").map((h) => h.key)), r = ii(this._width, i.sinks, i.sources), l = ri(e.flows, r, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), c = (h) => K`<linearGradient id="rg-${h}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(--band-${h});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(--band-${h});stop-opacity:var(--band-a1)"></stop>
          <stop offset="0.86" style="stop-color:var(--band-${h});stop-opacity:var(--band-a2)"></stop>
          <stop offset="1" style="stop-color:var(--band-${h});stop-opacity:0.2"></stop>
        </linearGradient>`, d = this._pop ? o.find((h) => h.key === this._pop) : void 0;
    return f`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${r.height}px">
        <svg width=${r.width} height=${r.height} viewBox="0 0 ${r.width} ${r.height}" aria-hidden="true">
          <defs>${yt.map(c)}</defs>
          ${l.map((h) => K`<path d=${h.d} fill="url(#rg-${h.from})"></path>`)}
        </svg>
        ${o.map((h) => this.renderTile(h, r, n, t))} ${d ? this.renderTilePopup(d, t, e, n) : k}
      </div>`;
  }
  /** A power "1,37 kW" as the number and a smaller grey unit next to it (uživatel 3. 11. 2026). */
  valueWithUnit(t) {
    const e = /^(.+) (k?W)$/.exec(t);
    return e ? f`${e[1]} <small>${e[2]}</small>` : t;
  }
  houseBackground(t, e, s) {
    const n = t.reduce((c, d) => e[d] > e[c] ? d : c), o = `linear-gradient(${Ae(`var(${Xt[n]})`, Math.round(aa + sa * s))}, ${Ae(`var(${Xt[n]})`, Math.round(aa + sa * s))}), var(--ed-tile)`;
    if (t.length === 1) return o;
    const i = t.reduce((c, d) => c + e[d], 0);
    let r = 0;
    const l = [];
    return t.forEach((c, d) => {
      const h = r / i * 100;
      r += e[c];
      const p = r / i * 100, b = `var(${Xt[c]})`, y = d === 0 ? `${h}%` : `calc(${h}% + 1px)`, m = d === t.length - 1 ? `${p}%` : `calc(${p}% - 1px)`;
      d > 0 && l.push(`transparent calc(${h}% - 1px) calc(${h}% + 1px)`), l.push(`${b} ${y} ${m}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${o}`;
  }
  tileBackground(t, e, s) {
    const n = `var(${ce[t.key]})`, o = t.level;
    if (o) {
      const i = nt(o.f, 0, 1), r = `${(i * 100).toFixed(1)}%`, l = t.key === "boil", c = o.active ? Ae(o.color, Math.round(o.a1 * 100 + (l ? pi * s : 0))) : "var(--ed-fill-idle)", d = o.active ? wa(o.color, Math.round(14 + (l ? ui * s : 0))) : "var(--ed-tile)";
      return i < 5e-3 ? o.active ? `linear-gradient(${d}, ${d}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${c} 0%, ${c} ${r}, ${d} ${r}, ${d} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const i = Ae(n, Math.round(aa + sa * s));
      return `linear-gradient(${i}, ${i}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, s, n) {
    const o = t.watts === void 0, i = Q(t.watts, n.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], c = nt(t.k, 0, 1), d = o ? D : it(t.watts, s), h = this.tileBackground(t, i, c), p = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${ce[t.key]});--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%${h ? `;background:${h}` : ""}`;
    return f`<button
        type="button"
        class="tile ${i ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""} ${!i && t.level && t.level.f >= 5e-3 ? "fill" : ""}"
        data-tile=${t.key}
        style=${p}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${i ? d : o ? D : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${i ? t.icon : t.idleIcon}></path>${i && t.icon2 ? K`<path class="icon2" d=${t.icon2}></path>` : k}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${i ? this.valueWithUnit(d) : o ? D : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
    const e = this._config;
    this._pop === "house" && e && this.freezeHouse(e);
  }
  renderTilePopup(t, e, s, n) {
    if (t.key === "bat" || t.key === "batIn") return this.renderBatteryPopup(t, e, s, n);
    if (t.key === "sun") return this.renderSunPopup(t, e, s, n);
    if (t.key === "house") return this.renderHousePopup(t, e, s);
    const o = this.t, i = e.num.flows.idle_threshold, r = this.today(e), l = (w) => w === void 0 ? D : `${st(w)} kWh`, c = (w) => w === void 0 ? D : it(w, n), d = (w) => Q(w, i), h = s.soc, p = h !== void 0 && h <= this.batteryReserve(e), b = (w) => ({
      title: w ? o.tile.bat : o.tile.batIn,
      now: w ? d(s.batDis) ? o.pop.discharging(c(s.batDis)) : s.batDis === void 0 && h === void 0 ? D : o.idle.bat : d(s.batIn) ? o.pop.charging(c(s.batIn)) : s.batIn === void 0 && h === void 0 ? D : o.idle.batIn,
      level: h === void 0 ? void 0 : { label: o.pop.level, text: U(h), percent: h, color: p ? "var(--ed-warning)" : "var(--ed-battery)", note: p ? o.pop.atReserve : "" },
      rows: w ? [{ label: o.pop.rows.discharged, value: l(r.bdis) }] : [{ label: o.pop.rows.charged, value: l(r.bchg) }]
    }), y = (w) => ({
      title: w ? o.tile.gridOut : o.tile.grid,
      now: w ? d(s.exp) ? o.pop.exporting(c(s.exp)) : s.exp === void 0 ? D : o.idle.gridOut : d(s.imp) ? o.pop.importing(c(s.imp)) : s.imp === void 0 ? D : o.idle.grid,
      rows: w ? [{ label: o.pop.rows.exported, value: l(r.gout) }] : [{ label: o.pop.rows.imported, value: l(r.gin) }]
    }), m = s.carLink, u = s.boilTemp, g = e.num.water.gauge_min, v = Math.max(e.num.water.gauge_max, V(this.hass, e.entities.boiler.target_temperature) ?? 0), S = {
      sun: { title: o.tile.sun, now: d(s.sun) ? c(s.sun) : s.sun === void 0 ? D : o.idle.sun, rows: [{ label: o.pop.rows.produced, value: l(r.pv) }] },
      bat: b(!0),
      batIn: b(!1),
      grid: y(!1),
      gridOut: y(!0),
      house: { title: o.tile.house, now: d(s.other) ? c(s.other) : s.other === void 0 ? D : o.idle.house, rows: [{ label: o.pop.rows.consumed, value: l(r.house) }] },
      car: {
        title: o.tile.car,
        now: d(s.car) ? o.pop.charging(c(s.car)) : m === "connected" || m === "charging" ? o.pop.carConnectedIdle : m === "disconnected" ? o.idle.carDisconnected : D,
        level: s.carSoc !== void 0 && (m === "connected" || m === "charging") ? { label: o.pop.level, text: U(s.carSoc), percent: s.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: o.pop.rows.carCharged, value: l(r.car) }]
      },
      boil: {
        title: o.tile.boil,
        now: d(s.boil) ? o.pop.heating(c(s.boil)) : s.boil === void 0 ? D : o.idle.boil,
        level: u === void 0 ? void 0 : { label: o.pop.temperature, text: `${N(u)} °C`, percent: nt((u - g) / (v - g) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: o.pop.rows.boilerHeated, value: l(r.boil) }]
      }
    }[t.key];
    return f`<ed-sheet open .heading=${S.title} .sub=${S.now} .closeLabel=${o.close} @hdk-close=${() => this.closePop()}><div class="pop">
        ${S.level ? f`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${S.level.label}${S.level.note ? f`<span class="note"> ${S.level.note}</span>` : k}</span>
                <span class="pop-big" style="color:${S.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${S.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${Bs(S.level.percent).map((w) => f`<span><i style="width:${w.toFixed(0)}%;background:${S.level.color}"></i></span>`)}</div>
            </div>` : k}
        <div class="pop-rows">${S.rows.map((w) => f`<div class="pop-row"><span>${w.label}</span><b>${w.value}</b></div>`)}</div>
      </div></ed-sheet>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const s = this.t, n = this.today(t), o = (p) => p === void 0 ? D : `${q(Math.max(0, p), 2)} kWh`, i = [n.pv, n.bdis, n.gin], r = i.every((p) => p !== void 0) ? i.reduce((p, b) => p + b, 0) : void 0, l = n.house === void 0 ? void 0 : n.house + n.car + n.boil + n.bchg + n.gout, c = [
      { label: s.tile.sun, color: "var(--ed-sun)", value: n.pv },
      { label: s.pop.fromBattery, color: "var(--ed-battery)", value: n.bdis },
      { label: s.pop.fromGrid, color: "var(--ed-grid)", value: n.gin }
    ], d = [
      { label: s.tile.house, color: "var(--ed-house)", value: n.house },
      { label: s.tile.car, color: "var(--ed-car)", value: n.car },
      { label: s.tile.boil, color: "var(--ed-boiler)", value: n.boil },
      { label: s.pop.toBattery, color: "var(--ed-battery)", value: n.bchg },
      { label: s.tile.gridOut, color: "var(--ed-grid)", value: n.gout }
    ], h = (p, b, y) => f`<div role="list" aria-label=${p} class="day-col">
        <div class="day-total"><span>${p}</span><b>${o(b)}</b></div>
        ${y.map((m) => f`<div role="listitem" class="day-item"><i style="background:${m.color}" aria-hidden="true"></i><span>${m.label}</span><b>${o(m.value)}</b></div>`)}
      </div>`;
    return f`<ed-sheet open .heading=${s.pop.day} .closeLabel=${s.close} @hdk-close=${() => this.closePop()}><div class="pop day">
        <div class="day-cols">${h(s.pop.sources, r, c)} ${h(s.pop.consumption, l, d)}</div>
      </div></ed-sheet>`;
  }
}, bi = (a) => class extends a {
  constructor() {
    super(...arguments), this._carGesture = new qe(() => ({
      holdMs: this._config?.num.ui.hold_ms ?? 550,
      doubleTapMs: this._config?.num.ui.double_tap_ms ?? 400
    })), this.carDown = () => {
      this._carGesture.start(() => this.openCarLink());
    }, this.carRelease = () => {
      this._carGesture.release();
    }, this.carCancel = () => {
      this._carGesture.cancel();
    }, this.carClick = (t) => {
      const e = this._config;
      if (!e) return;
      if (t.detail === 0) {
        this._carGesture.cancel(), this.openCarLink();
        return;
      }
      const s = this._carGesture.tap("car", t.timeStamp);
      s === "double" ? this.openCarLink() : s === "single" && (this._carHint = !0, window.clearTimeout(this._timers.get("carhint")), this._timers.set("carhint", window.setTimeout(() => this._carHint = !1, e.num.ui.hint_seconds * 1e3)));
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._carGesture.dispose();
  }
  openCarLink() {
    const t = this._config?.carLink;
    t && (this._carHint = !1, t.startsWith("/") ? (window.history.pushState(null, "", t), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }))) : window.open(t, "_blank", "noopener"));
  }
  renderCar(t, e) {
    const s = this.t, n = t.entities, o = t.num.flows, i = e.carLink, r = this.chargeMode(t), l = r === "Auto" ? rt(this.hass, n.wallbox.step) : void 0, c = this.targetId(t, r), d = c ? Number(this.shown(c)) : NaN, h = Number.isFinite(d) ? d : 100, p = Q(e.car, o.idle_threshold) && i !== "disconnected", b = va(e.loadShare.car, o, s);
    rt(this.hass, n.wallbox.block_charging);
    const y = this.shown(n.wallbox.boost), m = y === "on" ? `var(${Xt[b.main]})` : this.sourceColor(b);
    let u, g;
    const v = r ? r === "Boost" : y === "on", $ = v ? [this.boostMark()] : [], S = f`<span class="auto-mark">${s.car.autoMark}</span>`, w = r ? r === "Přetoky" : y === "off", j = rt(this.hass, n.wallbox.shadow) === "on", L = j && (l === "start" || l === "dnes_hotovo") ? `${l}_stin` : l, M = (W) => rt(this.hass, W), C = L ? s.car.step[L] : w ? li(M, t, e, s, this._now) : v && !p ? di(M, t, s, this._now, Date.parse(pt(this.hass, n.wallbox.boost)?.last_changed ?? "")) : void 0;
    (l === "konci" || M(n.wallbox.block_by_automation) === "on") && i !== "disconnected" ? u = s.car.ending : p ? (u = [s.car.charging(b.text), ...l === "nabiji" ? [S] : $], g = m) : i === "connected" || i === "charging" ? u = C ? [s.car.connected, C, ...$] : [s.car.connectedIdle, ...$] : i === "disconnected" && (u = s.car.disconnected);
    const _ = wa(g ?? "#d8d8dc", g ? 42 : 28), A = pt(this.hass, n.car.image)?.attributes?.entity_picture, B = e.carSoc, x = ma([Q(e.car, o.idle_threshold) ? e.car : void 0], o.kw_from), z = h < 100, tt = s.car.chargeLevel(B === void 0 ? s.noData : U(B), z ? U(h) : void 0), P = n.wallbox, T = this.modeControl(t, r, y);
    return f`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + (n.wallbox.mode ? 20 : 0) + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${_}, transparent)"></div><div class="shadow"></div>
            ${typeof A == "string" && A ? f`<img src=${A} alt="" />` : k}
          </div>
          ${t.carLink ? f`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${s.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(W) => W.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? f`<div class="car-hint" aria-hidden="true">${s.hint.holdOrDouble}</div>` : k}` : k}
          <div class="head">
            <h2 id="h-car">
              <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._carInfo ? "true" : "false"} aria-label="${this.pickText(t.titles.car) ?? s.titles.car}, ${s.car.info.heading}" @click=${() => this._carInfo = !0}>
                ${this.pickText(t.titles.car) ?? s.titles.car}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${et.info}></path></svg>
              </button>
            </h2>
            ${this.stateLine(u, g)}
          </div>
          ${this._carInfo ? this.renderCarInfo(t, e, u, g, { chargeMode: r, step: L, shadow: j, charging: p, manualBoost: v }) : k}
          <div class="car-soc">
            <span class="soc">${B === void 0 ? D : N(B)}<small>${this._i18n.percent("")}</small>${B === void 0 ? f`<span class="sr-only">${s.noData}</span>` : k}</span>
            <span class="range">${s.car.range} <b>${e.carRange === void 0 ? D : `${N(e.carRange)} km`}</b></span>
            ${n.wallbox.mode ? this.renderEta(this.eta(t, r, B, e, p)) : k}
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${tt}>
            ${Bs(nt(B ?? 0, 0, 100)).map((W) => f`<span><i style="width:${W.toFixed(1)}%"></i></span>`)}
            ${z ? f`<div class="limit" style="left:${_o(h)}"></div>` : k}
          </div>
        </div>
        ${p ? this.renderCarSources(e, o, it(e.car ?? 0, x), y === "on") : k}
        ${P.boost ? f`<div class="mode">
              <div class="mode-head"><span id="mode-l">${s.car.mode}</span><span class="mode-sub">${T.value ? (
      // All descriptions in one place, the others invisible: the tallest sets the height, so switching moves nothing (CURRENT_SPEC.md, Klidné přepínání režimů).
      T.subs.map((W, ft) => f`<span class=${T.options[ft].value === T.value ? "shown" : "spare"}>${zt(W)}</span>`)
    ) : D}</span></div>
              <ed-segmented
                compact guarded .options=${T.options} .value=${T.value} .pending=${this.isPending(T.id)} label=${s.car.modeLabel} .hint=${s.hint.holdDragOrDouble} ?disabled=${!T.value}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(W) => n.wallbox.mode ? this.setChargeMode(n.wallbox.mode, W.detail.value) : this.setBoost("wallbox", W.detail.value === "on")}
              ></ed-segmented>
              ${this.renderChargeSettings(t, r, v)}
            </div>` : k}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, p, m, x) : k}
      </section>`;
  }
  /** The mode chosen in Home Assistant (wallbox.mode), undefined without the key or without a known value. */
  chargeMode(t) {
    const e = this.shown(t.entities.wallbox.mode);
    return e === "Přetoky" || e === "Auto" || e === "Boost" ? e : void 0;
  }
  /** „Nabít do“ of the active mode (Auto or Boost); Přetoky has none. */
  targetId(t, e) {
    const s = t.entities.wallbox;
    return e === "Auto" ? s.target_auto : e === "Boost" ? s.target_boost : void 0;
  }
  /**
   * The options of the mode control. With wallbox.mode: Přetoky | Auto | Boost, Auto hidden while the rule only runs in
   * the shadow (wallbox.shadow on), unless Auto is chosen already. Without it: Přetoky | Boost on the Boost switch.
   */
  modeControl(t, e, s) {
    const n = this.t, o = t.entities.wallbox;
    if (!o.mode)
      return { id: o.boost, value: s === "on" || s === "off" ? s : "", options: this.boostOptions, subs: [n.car.modeSurplus, n.car.modeBoost] };
    const i = rt(this.hass, o.shadow) === "on" && e !== "Auto", r = [
      { value: "Přetoky", label: n.chargeModes.Přetoky, sub: n.car.modeSurplus },
      { value: "Auto", label: n.chargeModes.Auto, sub: n.car.modeAuto },
      { value: "Boost", label: n.chargeModes.Boost, sub: n.car.modeBoost }
    ].filter((l) => !(i && l.value === "Auto"));
    return { id: o.mode, value: e ?? "", options: r.map(({ value: l, label: c }) => ({ value: l, label: c })), subs: r.map((l) => l.sub) };
  }
  /**
   * „Nabít do“ in % of the car, for Auto and Boost, each mode with its own value (uživatel 15. 11. 2026: „Q273 ano“), with
   * an estimate of the time: (target − charge) × capacity ÷ power; Boost at its power, Auto at the lowest one (power_min).
   */
  renderTargetField(t, e) {
    const s = this.t, n = this.targetId(t, e), o = pt(this.hass, n), i = n ? Number(this.shown(n)) : NaN, r = Number.isFinite(i), l = Tt(o, "min") ?? 50, c = Tt(o, "max") ?? 100, d = Tt(o, "step") ?? 5, h = r ? f`${N(i)}<small>${this._i18n.percent("")}</small>` : D;
    return f`<div class="field">
          <span class="field-label">${s.car.target}</span><span class="field-value">${h}</span>
          <ed-slider
            .min=${l} .max=${c} .step=${d} .value=${r ? i : c}
            label=${s.car.targetLabel} valueText=${r ? U(i) : s.noData}
            minLabel=${U(l)} maxLabel=${U(c)}
            ?disabled=${!r}
            @hdk-change=${(p) => n && this.setInputNumber(n, p.detail.value, s.car.target)}
          ></ed-slider>
        </div>`;
  }
  /**
   * „Kolik % mám a kdy odjedu“ (uživatel 16. 11. 2026) under the charge: the target of the active mode, the time only while
   * charging (at the measured power; waiting, a time would contradict „čeká na slunce“), undefined in Přetoky.
   */
  eta(t, e, s, n, o) {
    const i = this.t, r = this.targetId(t, e), l = r ? Number(this.shown(r)) : NaN;
    if (!Number.isFinite(l) || s === void 0 || n.carLink === "disconnected") return;
    if (l < 100 && s >= l) return { text: i.car.etaReached, toward: !1 };
    const c = l >= 100 ? i.car.etaFull : U(l), d = V(this.hass, t.entities.car.capacity), h = (n.car ?? 0) / 1e3;
    if (!o || d === void 0 || h <= 0) return { text: i.car.eta(c), toward: !0 };
    const p = Math.max(10, Math.round((Math.min(l, 100) - s) / 100 * d * 60 / h / 10) * 10);
    return { text: i.car.eta(c, i.car.duration(Math.floor(p / 60), p % 60)), toward: !0 };
  }
  /** The reserved line; the arrow is drawn, a screen reader hears „cíl“ instead (dashboard-critic 16. 11.). */
  renderEta(t) {
    return t ? f`<span class="eta">${t.toward ? f`<span aria-hidden="true">→ </span><span class="sr-only">${this.t.car.etaLabel} </span>` : k}${t.text}</span>` : f`<span class="eta">\u00a0</span>`;
  }
  /**
   * One row „Nastavení nabíjení 4,2 kW · do 75 %“ that opens the sliders (uživatel 16. 11. 2026: „Režim Boost je moc
   * dominantní“; the pattern of Cílové teploty): the power in Boost, „Nabít do“ in Auto and Boost; no row in Přetoky.
   */
  renderChargeSettings(t, e, s) {
    const n = this.t, o = t.entities.wallbox, i = s && o.charging_power ? V(this.hass, o.charging_power) : void 0, r = s && !!o.charging_power, l = o.mode ? this.targetId(t, e) : void 0, c = r || !!l, d = !!this._open.charge, h = l ? Number(this.shown(l)) : NaN, p = [
      ...r ? [f`${n.car.powerShort} <b>${i === void 0 ? this.noData() : `${N(i * t.num.wallbox.phases / 1e3, 1)} kW`}</b>`] : [],
      ...l ? [f`${n.car.targetShort} <b>${Number.isFinite(h) ? U(h) : this.noData()}</b>`] : []
    ];
    return f`<div class="fold ${c ? "open" : ""}" ?inert=${!c}><div><div class="charge-settings">
        <button type="button" class="rowbtn" aria-expanded=${d ? "true" : "false"} @click=${() => this.toggle("charge")}>
          <span class="rowbtn-title">${n.car.settings}</span>
          <span class="rowbtn-value">${c ? Dt(p, { whole: !0 }) : k}</span>
          <svg class="chevron ${d ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
        </button>
        <div class="fold ${d && c ? "open" : ""}" ?inert=${!d || !c}><div class="charge-fields">
          ${r ? this.renderPowerField(t) : k}
          ${l ? this.renderTargetField(t, e) : k}
        </div></div>
      </div></div></div>`;
  }
  /** Why and when the Boost of the house ended last, only today (attribute posledni_konec of wallbox.step, „code|time“). */
  lastEnd(t) {
    const e = this.lastEndRecord(t);
    if (!(!e || !e.today))
      return [this.t.wallbox.lastEnd(ot(e.at)), e.why];
  }
  /** „kód|čas|nabití auta|energie“ of the last end of a Boost (input_text.nabijeni_auta_posledni_konec through wallbox.step). */
  lastEndRecord(t) {
    const e = pt(this.hass, t.entities.wallbox.step)?.attributes?.posledni_konec;
    if (typeof e != "string" || !e.includes("|")) return;
    const [s, n, o, i] = e.split("|"), r = Date.parse(n), l = this.t.wallbox.endReason[s];
    if (!l || !Number.isFinite(r)) return;
    const c = (d) => d !== void 0 && d !== "" && Number.isFinite(Number(d)) ? Number(d) : void 0;
    return { at: r, why: l, today: new Date(r).toDateString() === new Date(this._now).toDateString(), soc: c(o), kwh: c(i) };
  }
  /**
   * „Co se děje s autem“ (uživatel 16. 11. 2026: „Potrebuju videt co se s autem deje. Treba nejake (i) kde se mi zobrazi proc
   * se stala poslední akce a co bude následovat.“): now, the last end of a Boost with its reason, what comes next.
   */
  renderCarInfo(t, e, s, n, o) {
    const i = this.t, r = i.car.info, l = this.lastEndRecord(t), c = e.carSoc, d = this.targetId(t, o.chargeMode), h = d ? Number(this.shown(d)) : NaN, p = Number.isFinite(h) ? h >= 100 ? i.car.etaFull : U(h) : void 0;
    let b;
    e.carLink === "disconnected" ? b = r.nextDisconnected : Number.isFinite(h) && h < 100 && c !== void 0 && c >= h ? b = r.nextDone : o.manualBoost ? b = Number.isFinite(h) && h < 100 ? r.nextBoost(p) : r.nextBoostFull : o.chargeMode === "Auto" && o.shadow ? b = r.nextShadow : o.chargeMode === "Auto" ? b = o.step === "nabiji" ? r.nextAutoCharging(p ?? i.car.etaFull) : r.nextAutoWait : b = r.nextSurplus(`${N(t.num.wallbox.power_min / 1e3, 1)} kW`);
    const y = l ? l.today ? ot(l.at) : `${ks(l.at)} ${ot(l.at)}` : void 0, m = l ? [
      ...l.soc !== void 0 ? [r.atEnd(U(l.soc))] : [],
      ...l.kwh !== void 0 ? [r.delivered(`${N(l.kwh, 1)} kWh`)] : []
    ] : [], u = l?.soc !== void 0 && c !== void 0 && l.soc - c >= 2 ? r.socDrop(U(l.soc), U(c)) : void 0;
    return f`<ed-sheet open .heading=${r.heading} .closeLabel=${i.close} @hdk-close=${() => this._carInfo = !1}><div class="pop car-info">
        <div class="info-row"><span class="pop-label">${r.now}</span>${this.stateLine(s, n)}</div>
        <div class="info-row"><span class="pop-label">${r.last}</span>
          <p class="info-text">${l ? f`${r.lastEnd(y, l.why)}${m.length ? f`<br /><span class="dim">${zt(m.join(" · "))}</span>` : k}` : r.lastNone}</p>
          ${u ? f`<p class="info-text dim">${u}</p>` : k}
        </div>
        <div class="info-row"><span class="pop-label">${r.next}</span><p class="info-text">${b}</p></div>
      </div></ed-sheet>`;
  }
  renderCarSources(t, e, s, n) {
    const o = this.t, i = o.source, r = t.loadShare.car, l = yt.filter((h) => r[h] > 4e-3), c = ko(l.map((h) => r[h])), d = (h) => h === "grid" && !n && r.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${Xt[h]})`;
    return f`<div class="mix">
        <div class="mix-head"><span>${o.car.sourcesTitle}</span><span>${s}</span></div>
        <div class="mix-bar" aria-hidden="true">${l.map((h) => f`<div style="flex:${r[h]} 1 0;background:${d(h)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${o.car.sourcesLabel}>
          ${l.map((h, p) => f`<span><i style="background:${d(h)}"></i>${i[h]}<em>${U(c[p])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerField(t) {
    const e = t.entities.wallbox.charging_power;
    if (!e) return k;
    const { phases: s, power_min: n, power_max: o, power_step: i } = t.num.wallbox, r = pt(this.hass, e), l = V(this.hass, e), c = l === void 0 ? void 0 : l * s / 1e3;
    let d = n / 1e3, h = o / 1e3;
    const p = Tt(r, "min"), b = Tt(r, "max");
    return p !== void 0 && (d = Math.max(d, p * s / 1e3)), b !== void 0 && (h = Math.min(h, b * s / 1e3)), f`<div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${c === void 0 ? D : N(c, 1)}<small> kW</small></span>
          <ed-slider
            .min=${d} .max=${h} .step=${i / 1e3} .value=${c ?? d}
            label=${this.t.car.powerLabel} valueText=${c === void 0 ? this.t.noData : `${N(c, 1)} kW`}
            minLabel="${N(d, 1)} kW" maxLabel="${N(h, 1)} kW"
            ?disabled=${c === void 0}
            @hdk-change=${(y) => this.setNumber(e, Math.round(y.detail.value * 1e3 / s), this.t.car.power)}
          ></ed-slider>
        </div>`;
  }
  renderWallboxGroup(t, e, s, n, o) {
    const i = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, c = !!(r.block_charging || r.priority), d = e.carLink, h = s ? (
      // The power is once, at „Odkud auto nabíjí“ (uživatel 16. 11. 2026: „dole ve Wallbox kartě nechat jen stav a poslední aktualizaci“).
      f`${i.wallbox.charging}`
    ) : d === "connected" || d === "charging" ? f`${i.wallbox.idle}` : d === "disconnected" ? f`${i.wallbox.disconnected}` : f`${D}`, p = Wn(rt(this.hass, t.entities.car.last_message), this._now, i), b = s ? void 0 : this.lastEnd(t), y = [h, ...b ?? [], ...p ? [i.wallbox.fromCar(p)] : []], m = this.shown(r.block_charging), u = this.shown(r.priority);
    return f`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!c} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${s ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${et.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${i.wallbox.title}</span><span class="row-sub wrap">${y.length > 1 ? Dt(y) : h}</span></span>
            <span></span>
            ${c ? f`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>` : f`<span></span>`}
          </button>
          ${c ? f`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(i.wallbox.block, r.block_charging, m === "on" ? i.wallbox.blockOn : i.wallbox.blockOff, m === "on") : k}
                ${r.priority ? this.switchRow(i.wallbox.priority, r.priority, u === "on" ? i.wallbox.priorityOn : i.wallbox.priorityOff, !1) : k}
              </div></div>` : k}
        </li>
      </ul>`;
  }
}, Be = 45, jt = 46, fi = 62, mi = 58;
function na(a, t) {
  let e = 1;
  for (; e < a.length - 1 && t > a[e].temp; ) e++;
  const s = a[e - 1], n = a[e], o = Math.max(0, Math.min(1, (t - s.temp) / (n.temp - s.temp))), i = (c) => [1, 3, 5].map((d) => parseInt(c.slice(d, d + 2), 16)), r = i(s.color), l = i(n.color);
  return `rgb(${[0, 1, 2].map((c) => Math.round(r[c] + (l[c] - r[c]) * o)).join(",")})`;
}
const ue = (a, t) => {
  const e = (135 + 270 * a) * Math.PI / 180;
  return [fi + t * Math.cos(e), mi + t * Math.sin(e)];
}, vi = (a, t) => {
  const [e, s] = ue(a, jt), [n, o] = ue(t, jt);
  return `M${e.toFixed(2)} ${s.toFixed(2)} A${jt} ${jt} 0 0 1 ${n.toFixed(2)} ${o.toFixed(2)}`;
};
function yi(a, t, e, s) {
  const n = a === void 0 ? 0 : Math.max(0, Math.min(1, (a - t) / (e - t))), [o, i] = ue(0, jt), [r, l] = ue(0.5, jt), [c, d] = ue(1, jt), h = (u, g) => `A${jt} ${jt} 0 0 1 ${u.toFixed(2)} ${g.toFixed(2)}`, p = K`<path d=${`M${o.toFixed(2)} ${i.toFixed(2)} ${h(r, l)} ${h(c, d)}`} fill="none" stroke="var(--ed-gauge-track)" stroke-width="10" stroke-linecap="round"></path>`, b = Array.from({ length: Be }, (u, g) => {
    const v = (g + 0.5) / Be;
    return a === void 0 || v > n ? null : K`<path d=${vi(g / Be, Math.min(1, (g + 1) / Be + 4e-3))} fill="none" stroke=${na(s, t + v * (e - t))} stroke-width="10"></path>`;
  }), [y, m] = ue(n, jt);
  return K`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${p}${b}
    ${a !== void 0 && n > 0 ? K`<circle cx=${o.toFixed(1)} cy=${i.toFixed(1)} r="5" fill=${na(s, t)}></circle>` : null}
    ${a !== void 0 && n >= 0.99 ? K`<circle cx=${c.toFixed(1)} cy=${d.toFixed(1)} r="5" fill=${na(s, e)}></circle>` : null}
    ${a === void 0 ? null : K`<circle class="knob" cx=${y.toFixed(1)} cy=${m.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const wi = (a) => class extends a {
  renderWater(t, e) {
    const s = this.t, n = t.entities, o = t.num.flows, i = Q(e.boil, o.idle_threshold), r = va(e.loadShare.boil, o, s), l = this.sourceColor(r), d = this.shown(n.boiler.boost) === "on", h = ma([i ? e.boil : void 0], o.kw_from);
    let p;
    if (i) p = [s.water.boilerHeats(r.text), ...d ? [this.boostMark()] : []];
    else if (e.boil !== void 0) {
      const b = d ? void 0 : ci((y) => rt(this.hass, y), t, e, s, this._now);
      p = [s.water.noHeating, ...d ? [this.boostMark()] : b ? [b] : []];
    }
    return f`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${this.pickText(t.titles.water) ?? s.titles.water}</h2>${this.stateLine(p, i ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, i, l, h)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, s, n, o, i = !1) {
    return f`<div class="arc" role="img" aria-label=${o}>
        ${yi(t, e, s, n.tempScale)}
        <div class="arc-num ${i ? "dim" : ""}"><b class=${t === void 0 ? "nodata" : ""}>${t === void 0 ? D : N(t)}</b>${t === void 0 ? f`<span class="sr-only">${this.t.noData}</span>` : f`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${N(e)}</span><span class="arc-max" aria-hidden="true">${N(s)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, s, n, o) {
    const i = this.t, r = t.entities.boiler, l = this.shown(r.boost), c = l === "on", d = V(this.hass, r.target_temperature), h = V(this.hass, r.boost_target_temperature), p = c ? h : d, b = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, d ?? 0), m = e.boilTemp, u = !!this._open.targets, g = !!(r.target_temperature || r.boost_target_temperature), v = i.water.boilerLabel(
      m === void 0 ? i.noData : `${N(m)} °C`,
      s ? i.water.heatingWith(it(e.boil, o)) : i.water.notHeating,
      p === void 0 ? void 0 : `${N(p)} °C`,
      N(b),
      `${N(y)} °C`
    );
    return f`<div class="source">
        <div class="source-top">
          ${this.gauge(m, b, y, t, v)}
          <div class="source-body">
            <div>
              <div class="source-title">${i.water.boilerTitle}</div>
              <div class="source-line">${Dt([
      f`<span class="src ${s ? "tinted" : ""}" style="--c:${s ? n : "var(--ed-secondary)"}">${s ? it(e.boil, o) : e.boil === void 0 ? this.noData() : i.water.notHeating}</span>`,
      ...p === void 0 ? [] : [f`<span class="dim">${i.water.target(`${N(p)} °C`)}</span>`]
    ])}</div>
            </div>
            ${r.boost ? f`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} .pending=${this.isPending(r.boost)} label=${i.water.boostMode} .hint=${i.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${($) => this.setBoost("boiler", $.detail.value === "on")}
                ></ed-segmented>` : k}
          </div>
        </div>
        ${g ? f`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${u ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${i.water.targets}</span>
                <span class="rowbtn-value">${Dt([
      // On two lines both targets have the unit (uživatel 12. 11. 2026: „A °C bude na obou“).
      f`${i.water.targetFlow} <b>${d === void 0 ? this.noData() : f`${N(d)}<span class="joined-only"> °C</span>`}</b>`,
      f`${i.water.targetBoost} <b>${h === void 0 ? this.noData() : `${N(h)} °C`}</b>`
    ], { whole: !0 })}</span>
                <svg class="chevron ${u ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
              </button>
              <div class="fold ${u ? "open" : ""}" ?inert=${!u}><div>${this.renderTargets(t, d, h)}</div></div>
            </div>` : k}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, s) {
    const n = this.t, o = t.entities.boiler, i = t.num.boiler, r = (l, c, d, h, p, b) => {
      if (!l) return k;
      const y = pt(this.hass, l);
      let m = i.target_min, u = i.target_max;
      const g = Tt(y, "min"), v = Tt(y, "max");
      return g !== void 0 && (m = Math.max(m, g)), v !== void 0 && (u = Math.min(u, v)), p !== void 0 && (m = Math.max(m, p)), b !== void 0 && (u = Math.min(u, b)), f`<div class="field">
          <span class="field-label">${d}<span class="hint">${h}</span></span><span class="field-value">${c === void 0 ? D : N(c)}<small> °C</small></span>
          <ed-slider
            .min=${m} .max=${u} .step=${i.target_step} .value=${c ?? m}
            label=${n.water.targetSliderLabel(d)} valueText=${c === void 0 ? n.noData : n.water.targetSliderSpoken(`${c} °C`, d)}
            minLabel="${N(m)} °C" maxLabel="${N(u)} °C"
            ?disabled=${c === void 0}
            @hdk-change=${($) => this.setNumber(l, $.detail.value, n.water.targetWhat(d))}
          ></ed-slider>
        </div>`;
    };
    return f`<div class="detail">
        ${r(o.target_temperature, e, n.water.targetFlow, n.water.targetFlowHint, s, void 0)}
        ${r(o.boost_target_temperature, s, n.water.targetBoost, n.water.targetBoostHint, void 0, e)}
        <p class="hint">${n.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return k;
    const s = Gn(this.shown(e.valve_c1), this.shown(e.valve_c2)), n = s === "on", o = !!(e.valve_c1 && e.valve_c2), i = s === "unclear" ? this.t.water.mixingUnclear : s === void 0 ? this.t.noData : "";
    return f`
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${n ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${n ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${n ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${i ? f`<span class="mixcap-note">${i}</span>` : k}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${n} ?disabled=${s === void 0 || !o}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, s = t.entities.tank, n = t.num.tank, o = s.water_heater, i = pt(this.hass, o), r = this.shown(o), l = r === "off", c = r === "heat", d = Tt(i, "temperature"), h = this._tankTemp, p = h && h.id === o ? h.value : d, b = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, V(this.hass, t.entities.boiler.target_temperature) ?? 0), m = l ? n.temp_min : p, u = Array.isArray(i?.attributes?.operation_list) ? i.attributes.operation_list : Object.keys(e.tank.modes), g = Object.keys(e.tank.modes).filter((C) => u.includes(C)).map((C) => ({ value: C, label: e.tank.modes[C] })), v = !!this._open.tank, { min: $, max: S } = this.tankRange(t), w = r === void 0 ? D : e.tank.modes[r] ?? r, j = l ? e.tank.keepsMinimum : c ? void 0 : e.tank.byPlan, L = m === void 0 ? this.noData() : f`<b class=${l ? "off" : ""}>${N(l ? n.temp_min : m)} °C</b>`, M = e.tank.label(
      m === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${N(n.temp_min)} °C`) : e.tank.settingSet(`${N(m)} °C`),
      w,
      N(b),
      `${N(y)} °C`
    );
    return f`<div class="source">
        <div class="source-top">
          ${this.gauge(m, b, y, t, M, l)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line">${Dt([f`<span class="src" style="--c:${c ? "var(--ed-text)" : "var(--ed-secondary)"}">${r === void 0 ? this.noData() : w}</span>`, ...r === void 0 || j === void 0 ? [] : [f`<span class="dim">${j}</span>`]])}</div>
            </div>
            ${o ? f`<ed-segmented compact .options=${g} .value=${r ?? ""} .pending=${this.isPending(o)} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(C) => this.setTank(o, C.detail.value)}></ed-segmented>` : k}
          </div>
        </div>
        ${o ? f`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${v ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${L}</span>
                <svg class="chevron ${v ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
              </button>
              <div class="fold ${v ? "open" : ""}" ?inert=${!v}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : c ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${m === void 0 ? D : N(m)}<small> °C</small></span>
                    <ed-slider
                      .min=${$} .max=${S} .step=${n.temp_step} .tickStep=${5} .value=${m ?? $}
                      label=${e.tank.sliderLabel} valueText=${p === void 0 ? e.noData : e.tank.sliderSpoken(`${p} °C`)}
                      minLabel="${N($)} °C" maxLabel="${N(S)} °C"
                      ?disabled=${p === void 0 || l}
                      @hdk-change=${(C) => this.setTankTemperature(o, C.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : k}
      </div>`;
  }
}, Da = class Da extends wi(bi(gi(ni(Jo(Oo(Mo(X))))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return k;
    const e = Un(this.hass, t, this.t), s = t.colors, n = `--ed-sun:${s.sun};--ed-battery:${s.battery};--ed-grid:${s.grid};--ed-house:${s.house};--ed-car:${s.car};--ed-boiler:${s.boiler};--ed-discharge:${s.discharge};--ed-accent:${s.accent};--ed-warning:${s.warning};--ed-off:${s.neutral}`;
    return this._batDetail ? f`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderBatteryDetail(t, e)}</div>` : this._houseDetail ? f`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderHouseDetail(t, e)}</div>` : this._sunDetail ? f`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderSunDetail(t, e)}</div>` : f`<div class="page" style=${n} @keydown=${this.onKey}>
      <!-- No title: the name of the dashboard is already at the top (uživatel 12. 11. 2026: „nechci title … To zrus“). -->
      ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
Da.styles = [ws, Kn];
let ra = Da;
_n("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", ra);
window.customCards = window.customCards ?? [];
window.customCards.some((a) => a.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Re(Cn()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.6.0 · 2026-11-16 08:52 UTC · po 61e4f55 ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
