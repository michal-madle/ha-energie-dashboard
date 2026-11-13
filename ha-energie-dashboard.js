const ze = globalThis, la = ze.ShadowRoot && (ze.ShadyCSS === void 0 || ze.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, da = /* @__PURE__ */ Symbol(), La = /* @__PURE__ */ new WeakMap();
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
      s && (t = La.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && La.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const us = (a) => new ps(typeof a == "string" ? a : a + "", void 0, da), zt = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, n, o) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + a[o + 1], a[0]);
  return new ps(e, a, da);
}, Ws = (a, t) => {
  if (la) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = ze.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, a.appendChild(s);
  }
}, Aa = la ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return us(e);
})(a) : a;
const { is: Fs, defineProperty: Us, getOwnPropertyDescriptor: Vs, getOwnPropertyNames: Gs, getOwnPropertySymbols: Ks, getPrototypeOf: Zs } = Object, Ze = globalThis, Ea = Ze.trustedTypes, Ys = Ea ? Ea.emptyScript : "", qs = Ze.reactiveElementPolyfillSupport, ke = (a, t) => a, Re = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Ys : null;
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
} }, ca = (a, t) => !Fs(a, t), Oa = { attribute: !0, type: String, converter: Re, reflect: !1, useDefault: !1, hasChanged: ca };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ze.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let le = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Oa) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Us(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = Vs(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Oa;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const t = Zs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const e = this.properties, s = [...Gs(e), ...Ks(e)];
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
      for (const n of s) e.unshift(Aa(n));
    } else t !== void 0 && e.push(Aa(t));
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
    return Ws(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Re).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), i = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Re;
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
le.elementStyles = [], le.shadowRootOptions = { mode: "open" }, le[ke("elementProperties")] = /* @__PURE__ */ new Map(), le[ke("finalized")] = /* @__PURE__ */ new Map(), qs?.({ ReactiveElement: le }), (Ze.reactiveElementVersions ??= []).push("2.1.2");
const ha = globalThis, ja = (a) => a, Pe = ha.trustedTypes, za = Pe ? Pe.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, gs = "$lit$", Ut = `lit$${Math.random().toFixed(9).slice(2)}$`, bs = "?" + Ut, Xs = `<${bs}>`, te = document, Se = () => te.createComment(""), Me = (a) => a === null || typeof a != "object" && typeof a != "function", pa = Array.isArray, Js = (a) => pa(a) || typeof a?.[Symbol.iterator] == "function", Je = `[ 	
\f\r]`, $e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ba = /-->/g, Ha = />/g, Zt = RegExp(`>|${Je}(?:([^\\s"'>=/]+)(${Je}*=${Je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ra = /'/g, Pa = /"/g, fs = /^(?:script|style|textarea|title)$/i, ms = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), v = ms(1), V = ms(2), ge = /* @__PURE__ */ Symbol.for("lit-noChange"), M = /* @__PURE__ */ Symbol.for("lit-nothing"), Na = /* @__PURE__ */ new WeakMap(), qt = te.createTreeWalker(te, 129);
function vs(a, t) {
  if (!pa(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return za !== void 0 ? za.createHTML(t) : t;
}
const Qs = (a, t) => {
  const e = a.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = $e;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let h, c, d = -1, p = 0;
    for (; p < l.length && (i.lastIndex = p, c = i.exec(l), c !== null); ) p = i.lastIndex, i === $e ? c[1] === "!--" ? i = Ba : c[1] !== void 0 ? i = Ha : c[2] !== void 0 ? (fs.test(c[2]) && (n = RegExp("</" + c[2], "g")), i = Zt) : c[3] !== void 0 && (i = Zt) : i === Zt ? c[0] === ">" ? (i = n ?? $e, d = -1) : c[1] === void 0 ? d = -2 : (d = i.lastIndex - c[2].length, h = c[1], i = c[3] === void 0 ? Zt : c[3] === '"' ? Pa : Ra) : i === Pa || i === Ra ? i = Zt : i === Ba || i === Ha ? i = $e : (i = Zt, n = void 0);
    const b = i === Zt && a[r + 1].startsWith("/>") ? " " : "";
    o += i === $e ? l + Xs : d >= 0 ? (s.push(h), l.slice(0, d) + gs + l.slice(d) + Ut + b) : l + Ut + (d === -2 ? r : b);
  }
  return [vs(a, o + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Te {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, i = 0;
    const r = t.length - 1, l = this.parts, [h, c] = Qs(t, e);
    if (this.el = Te.createElement(h, s), qt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = qt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(gs)) {
          const p = c[i++], b = n.getAttribute(d).split(Ut), y = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: o, name: y[2], strings: b, ctor: y[1] === "." ? en : y[1] === "?" ? an : y[1] === "@" ? sn : Ye }), n.removeAttribute(d);
        } else d.startsWith(Ut) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (fs.test(n.tagName)) {
          const d = n.textContent.split(Ut), p = d.length - 1;
          if (p > 0) {
            n.textContent = Pe ? Pe.emptyScript : "";
            for (let b = 0; b < p; b++) n.append(d[b], Se()), qt.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[p], Se());
          }
        }
      } else if (n.nodeType === 8) if (n.data === bs) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(Ut, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += Ut.length - 1;
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
class tn {
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
        let h;
        l.type === 2 ? h = new De(o, o.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (h = new nn(o, this, t)), this._$AV.push(h), l = s[++r];
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
    this.type = 2, this._$AH = M, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = be(this, t, e), Me(t) ? t === M || t == null || t === "" ? (this._$AH !== M && this._$AR(), this._$AH = M) : t !== this._$AH && t !== ge && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Js(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== M && Me(this._$AH) ? this._$AA.nextSibling.data = t : this.T(te.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Te.createElement(vs(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new tn(n, this), i = o.u(this.options);
      o.p(e), this.T(i), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = Na.get(t.strings);
    return e === void 0 && Na.set(t.strings, e = new Te(t)), e;
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
      const s = ja(t).nextSibling;
      ja(t).remove(), t = s;
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
    this.type = 1, this._$AH = M, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = M;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let i = !1;
    if (o === void 0) t = be(this, t, e, 0), i = !Me(t) || t !== this._$AH && t !== ge, i && (this._$AH = t);
    else {
      const r = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = be(this, r[s + l], e, l), h === ge && (h = this._$AH[l]), i ||= !Me(h) || h !== this._$AH[l], h === M ? t = M : t !== M && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    i && !n && this.j(t);
  }
  j(t) {
    t === M ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class en extends Ye {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === M ? void 0 : t;
  }
}
class an extends Ye {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== M);
  }
}
class sn extends Ye {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = be(this, t, e, 0) ?? M) === ge) return;
    const s = this._$AH, n = t === M && s !== M || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== M && (s === M || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class nn {
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
const on = ha.litHtmlPolyfillSupport;
on?.(Te, De), (ha.litHtmlVersions ??= []).push("3.3.3");
const rn = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new De(t.insertBefore(Se(), o), o, void 0, e ?? {});
  }
  return n._$AI(a), n;
};
const ua = globalThis;
class Ct extends le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = rn(e, this.renderRoot, this.renderOptions);
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
Ct._$litElement$ = !0, Ct.finalized = !0, ua.litElementHydrateSupport?.({ LitElement: Ct });
const ln = ua.litElementPolyfillSupport;
ln?.({ LitElement: Ct });
(ua.litElementVersions ??= []).push("4.2.2");
const dn = { attribute: !0, type: String, converter: Re, reflect: !1, hasChanged: ca }, cn = (a = dn, t, e) => {
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
function B(a) {
  return (t, e) => typeof e == "object" ? cn(a, t, e) : ((s, n, o) => {
    const i = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), i ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(a, t, e);
}
function Z(a) {
  return B({ ...a, state: !0, attribute: !1 });
}
var hn = Object.defineProperty, ve = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && hn(t, e, n), n;
};
const wa = class wa extends Ct {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, s = (t - e) / 2, n = 2 * Math.PI * s, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), i = t / 2;
    return v`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
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
      ${this.num ? v`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? v`<span class="unit">${this.unit}</span>` : M}` : M}
    </div>`;
  }
};
wa.styles = zt`
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
let It = wa;
ve([
  B({ type: Number })
], It.prototype, "fraction");
ve([
  B({ type: Number })
], It.prototype, "size");
ve([
  B({ type: Number })
], It.prototype, "stroke");
ve([
  B()
], It.prototype, "num");
ve([
  B()
], It.prototype, "unit");
ve([
  B()
], It.prototype, "label");
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
const ba = zt`
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
var pn = Object.defineProperty, xt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && pn(t, e, n), n;
};
const ka = class ka extends Ct {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.wrap = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new ga(this), this.nudgeIndex = 0, this.gesture = new qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), s = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, i = this._dragging ? this._dx : o;
    return v`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) || this.wrap ? "tall" : ""} ${this.wrap ? "wrap" : ""} ${this.disabled ? "off" : ""}"
        role="radiogroup"
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
      (r, l) => v`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === s ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(h) => this.onClick(h, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? v`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? v`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
let pt = ka;
xt([
  B({ attribute: !1 })
], pt.prototype, "options");
xt([
  B()
], pt.prototype, "value");
xt([
  B()
], pt.prototype, "label");
xt([
  B({ type: Boolean })
], pt.prototype, "disabled");
xt([
  B({ type: Boolean })
], pt.prototype, "compact");
xt([
  B({ type: Boolean })
], pt.prototype, "wrap");
xt([
  B({ type: Boolean })
], pt.prototype, "guarded");
xt([
  B({ type: Number })
], pt.prototype, "holdMs");
xt([
  B({ type: Number })
], pt.prototype, "doubleTapMs");
xt([
  B({ type: Number })
], pt.prototype, "hintSeconds");
xt([
  B()
], pt.prototype, "hint");
xt([
  Z()
], pt.prototype, "_dx");
xt([
  Z()
], pt.prototype, "_dragging");
const un = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif', gn = zt`
  :host {
    font-family: ${us(un)};
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }
`;
var bn = Object.defineProperty, ae = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && bn(t, e, n), n;
};
const fn = 100, mn = 0.6, vn = 6, _a = class _a extends Ct {
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
        if (s < vn) return;
        this.dragging = !0, t.currentTarget.setPointerCapture(t.pointerId);
      }
      this.dragY = Math.max(0, s);
    }, this.dragEnd = (t) => {
      const e = this.drag;
      if (this.drag = void 0, !e || !this.dragging) return;
      this.dragging = !1;
      const s = Math.max(0, t.clientY - e.startY), n = s / Math.max(1, performance.now() - e.startTime);
      t.type === "pointerup" && (s > fn || n > mn) ? this.close() : this.dragY = 0;
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
    return this.open ? v`<div
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
              ${this.sub ? v`<div class="sub">${this.sub}</div>` : M}
            </div>
            <button type="button" class="close" aria-label=${this.closeLabel} @click=${() => this.close()}>
              <span aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M2 2l8 8M10 2l-8 8"></path></svg></span>
            </button>
          </div>
        </div>
        <slot></slot>
      </div>
    </div>` : M;
  }
};
_a.styles = [gn, zt`
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
let jt = _a;
ae([
  B({ type: Boolean, reflect: !0 })
], jt.prototype, "open");
ae([
  B()
], jt.prototype, "heading");
ae([
  B()
], jt.prototype, "sub");
ae([
  B()
], jt.prototype, "closeLabel");
ae([
  B({ type: Boolean })
], jt.prototype, "wide");
ae([
  Z()
], jt.prototype, "dragY");
ae([
  Z()
], jt.prototype, "dragging");
var yn = Object.defineProperty, wt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && yn(t, e, n), n;
};
const Sa = class Sa extends Ct {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1, this.mixed = !1, this.marks = [];
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = Math.max(0, Math.min(1, (t - this.min) / e)), n = this.mixed && this._drag === void 0 ? "0%" : `calc(19px + (100% - 38px) * ${s})`, o = this.mixed && this._drag === void 0 ? this.marks.map((h) => v`<i style="left:${(Math.max(0, Math.min(1, (h - this.min) / e)) * 100).toFixed(2)}%"></i>`) : [], i = this.tickStep || this.step || 1, r = Math.floor(e / i + 1e-9) + 1, l = r >= 2 && r <= 40 ? Array.from({ length: r }, (h, c) => v`<i style="left:${(c * i / e * 100).toFixed(2)}%"></i>`) : [];
    return v`<div class="wrap">
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
        ${o.length ? v`<div class="marks" aria-hidden="true">${o}</div>` : null}
      </div>
      ${this.minLabel || this.maxLabel ? v`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
Sa.styles = zt`
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
let ut = Sa;
wt([
  B({ type: Number })
], ut.prototype, "min");
wt([
  B({ type: Number })
], ut.prototype, "max");
wt([
  B({ type: Number })
], ut.prototype, "step");
wt([
  B({ type: Number })
], ut.prototype, "tickStep");
wt([
  B({ type: Number })
], ut.prototype, "value");
wt([
  B()
], ut.prototype, "label");
wt([
  B()
], ut.prototype, "valueText");
wt([
  B()
], ut.prototype, "minLabel");
wt([
  B()
], ut.prototype, "maxLabel");
wt([
  B({ type: Boolean })
], ut.prototype, "disabled");
wt([
  B({ type: Boolean, reflect: !0 })
], ut.prototype, "mixed");
wt([
  B({ attribute: !1 })
], ut.prototype, "marks");
wt([
  Z()
], ut.prototype, "_drag");
var $n = Object.defineProperty, Wt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && $n(t, e, n), n;
};
const Ma = class Ma extends Ct {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new ga(this), this.gesture = new qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return v`<button
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
      ${this.hints.hint ? v`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
let Mt = Ma;
Wt([
  B({ type: Boolean })
], Mt.prototype, "checked");
Wt([
  B({ type: Boolean })
], Mt.prototype, "disabled");
Wt([
  B()
], Mt.prototype, "label");
Wt([
  B({ type: Boolean })
], Mt.prototype, "guarded");
Wt([
  B({ type: Number })
], Mt.prototype, "holdMs");
Wt([
  B({ type: Number })
], Mt.prototype, "doubleTapMs");
Wt([
  B({ type: Number })
], Mt.prototype, "hintSeconds");
Wt([
  B()
], Mt.prototype, "hintPlacement");
Wt([
  B()
], Mt.prototype, "hint");
function Lt(a, t = {}) {
  return a.length < 2 ? v`${a[0] ?? M}` : v`<span class="joined ${t.whole ? "whole" : ""}">${a.map(
    (e, s) => v`${s ? v`<span class="joined-sep"><span class="joined-dot">\u00a0·</span> </span>` : M}<span class="joined-part">${e}</span>`
  )}</span>`;
}
function Pt(a, t = {}) {
  return Lt(a.split(" · "), t);
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
    const r = n.filter((l, h) => i[h + 1].top > i[h].top + 1);
    if (r.length) {
      if (!e.classList.contains("whole")) {
        e.classList.add("probe");
        const l = o.some((h) => h.scrollWidth > h.clientWidth + 0.5);
        if (e.classList.remove("probe"), l) {
          e.classList.add("flow");
          return;
        }
      }
      e.classList.add("stacked"), r.forEach((l) => l.classList.add("break"));
    }
  });
}
const $s = zt`
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

  .joined.flow .joined-sep {
    white-space: nowrap;
  }
`;
var xn = Object.defineProperty, gt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && xn(t, e, n), n;
};
const Ta = class Ta extends Ct {
  constructor() {
    super(...arguments), this.name = "", this.text = "", this.state = "idle", this.kind = "toggle", this.centered = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, or tap twice.", this.hintAlign = "center", this.hints = new ga(this), this.gesture = new qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
    const t = this.kind === "toggle", e = this.count === void 0 ? null : v`<span class="count">${this.count}</span>`;
    return v`<button
        type="button"
        role=${t ? "switch" : "button"}
        class=${this.hints.nudge ? "nudge" : ""}
        aria-checked=${t ? this.state === "on" ? "true" : "false" : M}
        aria-pressed=${this.kind === "action" && this.pressed !== void 0 ? this.pressed ? "true" : "false" : M}
        aria-haspopup=${this.kind === "open" ? "dialog" : M}
        aria-label=${this.label || M}
        ?disabled=${this.disabled}
        @click=${this.onClick}
        @pointerdown=${this.onDown}
        @pointerup=${this.release}
        @pointerleave=${this.release}
        @pointercancel=${this.release}
        @contextmenu=${(s) => this.protected && s.preventDefault()}
      ><span class="name"><span>${this.name}</span>${this.kind === "open" ? v`<span class="chevron" aria-hidden="true">›</span>` : null}</span>${this.centered ? e : v`<span class="text">${Pt(this.text)}${e}</span>`}</button>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? v`<div class="hint above ${this.hintAlign}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
  $s,
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
let ht = Ta;
gt([
  B()
], ht.prototype, "name");
gt([
  B()
], ht.prototype, "text");
gt([
  B({ reflect: !0 })
], ht.prototype, "state");
gt([
  B()
], ht.prototype, "kind");
gt([
  B({ type: Number })
], ht.prototype, "count");
gt([
  B({ type: Boolean, reflect: !0 })
], ht.prototype, "centered");
gt([
  B({ type: Boolean })
], ht.prototype, "disabled");
gt([
  B({ type: Boolean })
], ht.prototype, "pressed");
gt([
  B()
], ht.prototype, "label");
gt([
  B({ type: Boolean })
], ht.prototype, "guarded");
gt([
  B({ type: Number })
], ht.prototype, "holdMs");
gt([
  B({ type: Number })
], ht.prototype, "doubleTapMs");
gt([
  B({ type: Number })
], ht.prototype, "hintSeconds");
gt([
  B()
], ht.prototype, "hint");
gt([
  B()
], ht.prototype, "hintAlign");
function wn(a) {
  const t = [
    [`${a}-switch`, Mt],
    [`${a}-segmented`, pt],
    [`${a}-slider`, ut],
    [`${a}-ring`, It],
    [`${a}-tile`, ht],
    [`${a}-sheet`, jt]
  ];
  for (const [e, s] of t)
    customElements.get(e) || customElements.define(e, s);
}
const kn = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function _n(a) {
  return kn.has(a);
}
function vt(a, t) {
  return t ? a?.states?.[t] : void 0;
}
function ct(a, t) {
  const e = vt(a, t)?.state;
  return e === void 0 || _n(e) ? void 0 : e;
}
function Sn(a, t) {
  const e = ct(a, t);
  if (e === void 0)
    return;
  const s = Number(e);
  return Number.isFinite(s) ? s : void 0;
}
function xs(a) {
  return (a?.locale?.language || a?.language || "").trim();
}
function fa(a) {
  const t = a.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Mn(a, t) {
  return a === "auto" ? fa(xs(t)) : a;
}
function Tn() {
  return fa(document.documentElement.lang || navigator.language || "");
}
const Ia = /* @__PURE__ */ new WeakMap(), Dn = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Cn = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Ln = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Qe(a, t) {
  const e = a?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function An(a, t, e) {
  const s = xs(e).replace("_", "-"), n = s !== "" && fa(s) === t ? s : Dn[t], o = Qe(e, "number_format"), i = Qe(e, "time_format"), r = Qe(e, "date_format"), l = [t, n, o, i, r].join("|");
  let h = Ia.get(a);
  h || (h = /* @__PURE__ */ new Map(), Ia.set(a, h));
  let c = h.get(l);
  return c || (c = jn(a[t], t, n, o, i, r), h.set(l, c)), c;
}
function En(a) {
  try {
    return new Intl.NumberFormat(a), a;
  } catch {
    return "en";
  }
}
function On(a, t) {
  if (a === "12")
    return !0;
  if (a === "24")
    return !1;
  const e = a === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function jn(a, t, e, s, n, o) {
  const i = En(e), r = s === "system" ? void 0 : s === "none" ? "en-US" : Ln[s] ?? i, l = s === "none" ? { useGrouping: !1 } : {}, h = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), d = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), b = On(n, i), y = b ? "h12" : "h23", f = new Intl.DateTimeFormat(i, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: y }), u = new Intl.DateTimeFormat(i, b ? { hour: "numeric", hourCycle: y } : { hour: "2-digit", minute: "2-digit", hourCycle: y }), g = o === "system" ? void 0 : i, m = new Intl.DateTimeFormat(g, { day: "numeric", month: "numeric" }), x = ($) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return m.format($);
    const O = m.formatToParts($), A = O.find((C) => C.type === "literal")?.value ?? "/", S = O[O.length - 1], D = S?.type === "literal" ? S.value : "", E = O.find((C) => C.type === "day")?.value ?? "", k = O.find((C) => C.type === "month")?.value ?? "";
    return o === "DMY" ? `${E}${A}${k}${D}` : `${k}${A}${E}${D}`;
  }, _ = Cn.has(i.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: i,
    t: a,
    one: ($) => h.format($),
    two: ($) => c.format($),
    half: ($) => d.format(Math.round($ * 2) / 2),
    tick: ($) => d.format($),
    whole: ($) => p.format($),
    percent: ($) => `${$}${_}%`,
    time: ($) => f.format($),
    hour: ($) => u.format($),
    day: x
  };
}
const zn = {
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
    priorityWaiting: {
      title: "Auto je připojené, ale nenabíjí",
      text: "Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu."
    },
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
    disconnected: "Odpojeno",
    openDashboard: "Otevřít dashboard auta",
    chargeLevel: (a, t) => `Nabití auta ${a}${t === void 0 ? "" : `, limit ${t}`}`,
    range: "dojezd",
    limit: (a) => `limit ${a}`,
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
    priorityOn: "Auto nabíjí dřív než bojler",
    priorityOff: "Auto nemá přednost"
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
}, Bn = {
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
    priorityWaiting: {
      title: "The car is connected but not charging",
      text: "Priority over the boiler is on, but the sun is probably too weak to start the wallbox."
    },
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
    disconnected: "Unplugged",
    openDashboard: "Open the car dashboard",
    chargeLevel: (a, t) => `Car charge ${a}${t === void 0 ? "" : `, limit ${t}`}`,
    range: "range",
    limit: (a) => `limit ${a}`,
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
    priorityOn: "The car charges before the boiler",
    priorityOff: "The car has no priority"
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
}, Hn = {
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
    priorityWaiting: {
      title: "Bilen är ansluten men laddar inte",
      text: "Företräde före beredaren är på, men solen räcker troligen inte för att starta laddboxen."
    },
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
    disconnected: "Urkopplad",
    openDashboard: "Öppna bilens dashboard",
    chargeLevel: (a, t) => `Bilens laddning ${a}${t === void 0 ? "" : `, gräns ${t}`}`,
    range: "räckvidd",
    limit: (a) => `gräns ${a}`,
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
    priorityOn: "Bilen laddar före beredaren",
    priorityOff: "Bilen har inget företräde"
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
}, Rn = { cs: zn, en: Bn, sv: Hn };
function Ne(a, t) {
  return An(Rn, a, t);
}
function F(a, t) {
  const e = Sn(a, t);
  if (e !== void 0)
    return vt(a, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let rt = Ne("cs"), Ie = "auto";
function Pn(a, t = "auto") {
  rt = a, Ie = t;
}
function ma(a, t = 1e3) {
  return a.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function ws(a) {
  const t = Ie === "auto" ? Math.abs(Math.round(a * 100) / 100) < 10 ? 2 : Math.abs(Math.round(a * 10) / 10) < 100 ? 1 : 0 : Ie;
  return t === 2 ? rt.two(a) : t === 1 ? rt.one(a) : rt.whole(a);
}
function nt(a, t) {
  return t === "kW" ? `${ws(a / 1e3)} kW` : `${rt.whole(Math.round(a))} W`;
}
function R(a, t = 0) {
  return t === 0 ? rt.whole(a) : rt.one(a);
}
function Y(a, t) {
  if (t === 0) return rt.whole(a);
  if (t === 1) return rt.one(a);
  if (t === 2) return rt.two(a);
  const e = rt.one(1.5).charAt(1), s = 10 ** t, n = Math.round(Math.abs(a) * s);
  return `${a < 0 && n > 0 ? "−" : ""}${rt.whole(Math.floor(n / s))}${e}${String(n % s).padStart(t, "0")}`;
}
function _e(a) {
  return `${new Intl.DateTimeFormat(rt.locale, { weekday: "short" }).format(a)} ${rt.day(a)}`;
}
function Nn(a) {
  return new Intl.DateTimeFormat(rt.locale, { weekday: "short" }).format(a);
}
function In(a) {
  return rt.day(a);
}
function de(a) {
  const t = new Intl.DateTimeFormat(rt.locale, { weekday: "long" }).format(a);
  return t.charAt(0).toLocaleUpperCase(rt.locale) + t.slice(1);
}
function it(a) {
  return rt.time(a);
}
function K(a) {
  return rt.percent(typeof a == "number" ? R(a) : a);
}
function Jt(a, t) {
  const e = vt(a, t), s = ct(a, t);
  if (s === void 0) return;
  const n = Number(s);
  if (!Number.isFinite(n)) return;
  const o = e?.attributes?.unit_of_measurement;
  return o === "Wh" ? n / 1e3 : o === "MWh" ? n * 1e3 : n;
}
function at(a) {
  return a < (Ie === 1 ? 0.05 : 5e-3) ? "0" : ws(a);
}
function Wn(a, t, e) {
  const s = a ? Date.parse(a) : NaN;
  if (!Number.isFinite(s)) return;
  const n = Math.max(0, Math.round((t - s) / 6e4));
  return n < 1 ? e.ago.now : n < 60 ? e.ago.minutes(n) : n < 1440 ? e.ago.hours(Math.round(n / 60)) : e.ago.days(Math.round(n / 1440));
}
const mt = ["sun", "bat", "grid"], fe = ["house", "car", "boil", "batIn", "gridOut"], Ce = (a) => a === void 0 ? void 0 : Math.max(0, a), ot = (a, t) => a !== void 0 && a >= t;
function ks(a) {
  if (a === "Disconnected") return "disconnected";
  if (a === "Waiting") return "connected";
  if (a === "Charging") return "charging";
}
function Fn(a, t, e) {
  const s = t.entities, n = t.num.flows.idle_threshold, o = Ce(F(a, s.pv.power)), i = F(a, s.battery.power), r = F(a, s.grid.power), l = Ce(F(a, s.house.power)), h = Ce(F(a, s.wallbox.power)), c = Ce(F(a, s.boiler.power)), d = i === void 0 ? void 0 : Math.max(0, i), p = i === void 0 ? void 0 : Math.max(0, -i), b = r === void 0 ? void 0 : Math.max(0, -r), y = r === void 0 ? void 0 : Math.max(0, r), f = l === void 0 ? void 0 : Math.max(0, l - (h ?? 0) - (c ?? 0)), u = (j) => ot(j, n) ? j : 0, g = { sun: u(o), bat: u(d), grid: u(b) }, m = g.sun + g.bat + g.grid, x = [
    ["house", f],
    ["car", h],
    ["boil", c],
    ["batIn", p],
    ["gridOut", y]
  ], _ = x.reduce((j, [, w]) => j + u(w), 0), $ = { sun: 0, bat: 0, grid: 0 };
  for (const j of mt) $[j] = m > 0 ? g[j] * _ / m : 0;
  const O = [], A = {}, S = { sun: 0, bat: 0, grid: 0 };
  for (const [j, w] of x) {
    if (!ot(w, n)) continue;
    let z = w;
    const tt = { sun: 0, bat: 0, grid: 0 };
    for (const P of mt) {
      const L = Math.min($[P], z);
      $[P] -= L, z -= L, tt[P] = L / w, (j === "house" || j === "car" || j === "boil") && (S[P] += L), L > 0.5 && O.push({ from: P, to: j, watts: L });
    }
    A[j] = tt;
  }
  const D = S.sun + S.bat + S.grid, E = { sun: 0, bat: 0, grid: 0 };
  if (D > 0)
    for (const j of mt) E[j] = S[j] / D;
  else if (m > 0)
    for (const j of mt) E[j] = g[j] / m;
  const k = { house: { ...E }, car: { ...E }, boil: { ...E } };
  for (const j of ["house", "car", "boil"]) {
    const w = A[j];
    w && w.sun + w.bat + w.grid > 0 && (k[j] = w);
  }
  const C = {
    sun: o,
    batDis: d,
    batIn: p,
    imp: b,
    exp: y,
    other: f,
    car: h,
    boil: c,
    share: E,
    loadShare: k,
    flows: O,
    soc: F(a, s.battery.state_of_charge),
    carSoc: F(a, s.car.state_of_charge),
    carRange: F(a, s.car.range),
    boilTemp: F(a, s.boiler.temperature),
    carLink: ks(ct(a, s.wallbox.status))
  };
  return Object.assign(C, Un(C, t.num.flows, e)), C;
}
function Un(a, t, e) {
  const s = t.idle_threshold, n = (f) => ot(f, s);
  if ([a.sun, a.batDis, a.imp, a.other].every((f) => f === void 0)) return {};
  if (n(a.sun) && !n(a.imp) && !n(a.batDis)) {
    let f;
    return (a.exp ?? 0) > t.export_notice && !n(a.batIn) ? f = e.summary.exportSurplus : n(a.car) ? f = e.summary.sunChargesCar(n(a.batIn)) : n(a.batIn) ? f = e.summary.sunChargesBattery : f = e.summary.sunCoversHouse, { summary: f, summarySource: "sun" };
  }
  const r = [["house", a.other], ["car", a.car], ["boil", a.boil]].filter(([, f]) => n(f)).map(([f, u]) => [f, u]), l = r.reduce((f, [, u]) => f + u, 0), h = r.filter(([, f]) => f >= t.source_min_share / 100 * l).sort((f, u) => u[1] - f[1]);
  if (h.length && !(h.length === 1 && h[0][0] === "house")) {
    const f = h.reduce((m, [, x]) => m + x, 0), u = { sun: 0, bat: 0, grid: 0 };
    for (const [m, x] of h) for (const _ of mt) u[_] += a.loadShare[m][_] * x / f;
    const g = va(u, t, e);
    return { summary: e.summary.loadsTake(h.map(([m]) => m), g.text), summarySource: g.main };
  }
  const { sun: c, bat: d, grid: p } = a.loadShare.house;
  if (p > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const b = t.source_min_share / 100;
  if (c < b && p < b && d > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const y = Ss(a.loadShare.house, b);
  return y.length ? { summary: e.summary.houseTakes(_s(y, e)), summarySource: y[0] } : { summary: e.summary.nothing };
}
function _s(a, t) {
  return t.from[a[0]] + a.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function Ss(a, t) {
  return mt.filter((e) => a[e] >= t).sort((e, s) => a[s] - a[e]);
}
function va(a, t, e) {
  let s = Ss(a, t.source_min_share / 100);
  s.length || (s = ["sun"]);
  const n = a.grid > t.grid_deviation_share / 100;
  return { text: _s(s, e), main: n ? "grid" : s[0], deviation: n };
}
function Vn(a, t) {
  if (!(a === void 0 || t === void 0))
    return a === "off" && t === "on" ? "on" : a === "on" && t === "off" ? "off" : "unclear";
}
const Gn = zt`
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
`, Kn = ["cs", "en", "sv"];
class Ms extends Error {
}
function G(a) {
  throw new Ms(a);
}
function Zn(a, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Ms ? new Error(`${a}: ${e.message}`) : e;
  }
}
function ee(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function yt(a, t) {
  return a == null ? {} : (ee(a) || G(`"${t}" must be a mapping of keys.`), a);
}
function Gt(a, t, e) {
  for (const s of Object.keys(a))
    t.includes(s) || G(`${e}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function Qt(a, t, e = {}) {
  if (a == null)
    return;
  const s = typeof a == "string" ? a.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || G(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !s.startsWith(`${e.domain}.`) && G(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${s}.`), s;
}
function We(a, t) {
  if (a != null) {
    if (typeof a == "string" && a.trim())
      return a.trim();
    if (ee(a) && Object.keys(a).length > 0) {
      const e = Object.entries(a);
      if (e.every(([s, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(s) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([s, n]) => [s, n.trim()]));
    }
    return G(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function Yn(a, t) {
  if (a === void 0 || typeof a == "string")
    return a;
  const e = t.toLowerCase();
  return a[e] ?? a[e.split("-")[0]] ?? a.en ?? Object.values(a)[0];
}
function Wa(a) {
  return a === void 0 ? [] : typeof a == "string" ? [a] : Object.values(a);
}
const Fa = ["auto", ...Kn];
function qn(a) {
  const t = a ?? "auto";
  return Fa.includes(t) || G(`language must be one of ${Fa.join(", ")}.`), t;
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
    warning: void 0
  },
  grid: { power: void 0, total_import: void 0, total_export: void 0 },
  house: { power: void 0 },
  car: { state_of_charge: void 0, range: void 0, capacity: void 0, image: "image", last_message: void 0 },
  wallbox: { power: void 0, status: void 0, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch" },
  forecast: { energy_today: void 0, energy_tomorrow: void 0, energy_day_2: void 0, energy_day_3: void 0, energy_day_4: void 0, weather: "weather" },
  daily: { pv_generation: void 0, battery_charge: void 0, battery_discharge: void 0, grid_import: void 0, grid_export: void 0, car: void 0, boiler: void 0 }
}, Ts = { house: ["label", "default_range", "appliances", "groups"], boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"], forecast: ["default_range"] }, Fe = ["1d", "7d", "30d"], Ds = "1d", Xn = "appliances", Ua = ["7d", "30d"], Jn = "7d", Va = ["always", "heating"], Qn = "heating", Ga = ["auto", 1, 2], to = "auto", Cs = Object.keys(Xe), W = (a, t, e, s, n = !1) => ({ value: a, min: t, max: e, what: s, integer: n }), ya = {
  battery: {
    reserve: W(20, 0, 100, "% battery reserve"),
    capacity: W(11.2, 0.1, 1e3, "kWh usable capacity (time estimates, equivalent cycles, load in C)"),
    imbalance_good: W(15, 0, 1e3, "mV cell imbalance up to which it is called excellent"),
    imbalance_warn: W(30, 0, 1e3, "mV cell imbalance up to which it is called good (above it needs attention)"),
    imbalance_fault: W(100, 0, 1e3, "mV cell imbalance above which it is called a fault")
  },
  car: {
    charge_limit: W(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)"),
    image_scale: W(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)")
  },
  wallbox: {
    phases: W(3, 1, 3, "number of phases", !0),
    power_min: W(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: W(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: W(300, 1, 1e5, "W, step of the charging power (all phases)"),
    priority_min_sun: W(200, 0, 1e5, "W of sun above which a waiting car is reported")
  },
  boiler: {
    target_min: W(20, 0, 100, "°C, lowest target"),
    target_max: W(85, 0, 100, "°C, highest target"),
    target_step: W(5, 1, 50, "°C, target step"),
    hold_minutes: W(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)")
  },
  water: {
    gauge_min: W(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: W(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)")
  },
  tank: {
    temp_min: W(38, 0, 100, "°C, lowest temperature"),
    temp_max: W(65, 0, 100, "°C, highest temperature"),
    temp_step: W(1, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: W(15, 0, 1e3, "W, below this a flow (and an appliance) counts as none"),
    kw_from: W(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    export_notice: W(300, 0, 1e5, "W of export that counts as a surplus"),
    source_min_share: W(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: W(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: W(14, 0.5, 50, "px, thickness of a band of 1 kW (a stronger flow is thicker by the square root of its power)"),
    band_min_px: W(1.6, 0.5, 10, "px, thinnest band")
  },
  forecast: {
    good_power: W(2e3, 100, 1e5, "W of sun from which an hour counts as strong (the filled blocks of the five days, the window)"),
    good_day: W(10, 0.1, 1e3, "kWh a day from which a day counts as good (Historie)"),
    learn_days: W(14, 3, 90, "days the curve of what is possible and the typical deviation of the forecast are learned from", !0),
    possible_percentile: W(90, 50, 100, "% percentile of the days that sets what is possible in an hour"),
    typical_deviation: W(20, 1, 100, "% deviation of the forecast assumed until the card has seen enough days"),
    strip_from: W(6, 0, 23, "hour the hourly strips start at", !0),
    strip_to: W(17, 1, 24, "hour the hourly strips end at (the hour itself is the last block)", !0),
    evening_hour: W(22, 12, 23, "hour the evening battery level is estimated for", !0),
    morning_hour: W(6, 0, 11, "hour the night ends at (the battery level in the morning)", !0),
    car_start_soc: W(50, 0, 100, "% battery level from which the wallbox is started in the evening estimate"),
    car_stop_soc: W(30, 0, 100, "% battery level at which the wallbox is stopped in the evening estimate"),
    car_min_sun: W(2e3, 0, 1e5, "W of sun from which the wallbox is started in the evening estimate"),
    efficiency: W(95, 50, 100, "% efficiency of the battery in one direction")
  },
  scale: {
    sun: W(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: W(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: W(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: W(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: W(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: W(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: {
    revert_after: W(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: W(550, 200, 3e3, "ms to hold a protected control to switch it", !0),
    double_tap_ms: W(400, 150, 1e3, "ms between the two taps of a double tap", !0),
    hint_seconds: W(3, 1, 10, "s the hint of a protected control stays")
  }
}, Be = {
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
}, eo = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], oa = ["electricity", "car", "water"];
[
  ...Cs.flatMap((a) => Object.keys(Xe[a]).map((t) => `${a}.${t}`)),
  ...Object.entries(ya).flatMap(([a, t]) => Object.keys(t).map((e) => `${a}.${e}`)),
  ...oa.map((a) => `titles.${a}`),
  ...Object.keys(Be).map((a) => `colors.${a}`)
];
function ao(a, t) {
  const e = yt(a[t], t), s = Xe[t], n = [...Object.keys(ya[t] ?? {}), ...Ts[t] ?? []];
  Gt(e, [...Object.keys(s), ...n], t);
  const o = {};
  for (const [i, r] of Object.entries(s)) {
    const l = Qt(e[i], `${t}.${i}`, { domain: r });
    l && (o[i] = l);
  }
  return o;
}
function so(a) {
  const t = {};
  for (const [e, s] of Object.entries(ya)) {
    const n = yt(a[e], e), o = Object.keys(Xe[e] ?? {});
    Gt(n, [...o, ...Object.keys(s), ...Ts[e] ?? []], e), t[e] = {};
    for (const [i, r] of Object.entries(s)) {
      const l = n[i], h = `${e}.${i}`;
      if (l == null) {
        t[e][i] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && G(`${h} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && G(`${h} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][i] = l;
    }
  }
  return t;
}
function no(a) {
  const t = yt(a.colors, "colors");
  Gt(t, [...Object.keys(Be), "temp_scale"], "colors");
  const e = { ...Be };
  for (const s of Object.keys(Be)) {
    const n = t[s];
    n != null && ((typeof n != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.trim())) && G(`colors.${s} must be a colour like #FFD60A (six hex digits).`), e[s] = n.trim().toUpperCase());
  }
  return e;
}
function oo(a) {
  const t = yt(a.colors, "colors").temp_scale;
  if (t == null)
    return eo.map((n) => ({ ...n }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && G(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const s = t.map((n, o) => (ee(n) || G(`${e}[${o}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Gt(n, ["temp", "color"], `${e}[${o}]`), (typeof n.temp != "number" || !Number.isFinite(n.temp)) && G(`${e}[${o}].temp must be a number (°C).`), (typeof n.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.color.trim())) && G(`${e}[${o}].color must be a colour like #0A84FF (six hex digits).`), { temp: n.temp, color: n.color.trim().toUpperCase() }));
  return s.forEach((n, o) => {
    o > 0 && n.temp <= s[o - 1].temp && G(`${e}: temperatures must rise (${s[o - 1].temp} is followed by ${n.temp}).`);
  }), s;
}
function io(a) {
  const t = yt(a.boiler, "boiler").show;
  return t == null ? Qn : ((typeof t != "string" || !Va.includes(t)) && G(`boiler.show must be one of ${Va.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function ro(a) {
  const t = yt(a.battery, "battery").default_range;
  return t == null ? Ds : ((typeof t != "string" || !Fe.includes(t)) && G(`battery.default_range must be one of ${Fe.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function lo(a) {
  const t = yt(a.forecast, "forecast").default_range;
  return t == null ? Jn : ((typeof t != "string" || !Ua.includes(t)) && G(`forecast.default_range must be one of ${Ua.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function co(a) {
  const t = yt(a.house, "house").label;
  return t == null ? Xn : ((typeof t != "string" || t.trim() === "") && G("house.label must be a non-empty text (the label of the appliances in Home Assistant)."), t.trim());
}
function ho(a) {
  const t = yt(a.house, "house").default_range;
  return t == null ? Ds : ((typeof t != "string" || !Fe.includes(t)) && G(`house.default_range must be one of ${Fe.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const po = "mdi:power-plug";
function uo(a) {
  const t = yt(a.house, "house").appliances;
  return t == null ? [] : (Array.isArray(t) || G("house.appliances must be a list of {name, icon, power, energy, running, start_energy, warn_after}."), t.map((e, s) => {
    const n = `house.appliances[${s}]`;
    ee(e) || G(`${n} must be a mapping like {name: Pračka, running: input_boolean.…, start_energy: input_number.…}.`), Gt(e, ["name", "power", "energy", "running", "start_energy", "icon", "warn_after"], n);
    const o = We(e.name, `${n}.name`);
    o === void 0 && G(`${n}.name must be the name of the device of the appliance.`);
    const i = Ls(e.running, `${n}.running`), r = Qt(e.start_energy, `${n}.start_energy`, { domain: "input_number" }), l = Qt(e.power, `${n}.power`, { domain: "sensor" }), h = Qt(e.energy, `${n}.energy`, { domain: "sensor" }), c = Es(e.icon, `${n}.icon`), d = As(e.warn_after, `${n}.warn_after`);
    return { name: o, ...l ? { power: l } : {}, ...h ? { energy: h } : {}, ...i ? { running: i } : {}, ...r ? { start_energy: r } : {}, ...d ? { warn_after: d } : {}, ...c ? { icon: c } : {} };
  }));
}
function Ls(a, t) {
  const e = Qt(a, t, { example: "input_boolean.technicka_mistnost_pracka_bezi" });
  return e && !/^(input_boolean|binary_sensor)\./.test(e) && G(`${t} must be an input_boolean or a binary_sensor entity, not ${e}.`), e;
}
function As(a, t) {
  if (a != null)
    return (typeof a != "number" || !Number.isInteger(a) || a < 1 || a > 1440) && G(`${t} must be a whole number of minutes from 1 to 1440, not ${JSON.stringify(a)}.`), a;
}
function Ka(a, t) {
  return a ?? G(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
}
function Es(a, t) {
  if (a != null)
    return (typeof a != "string" || !/^[a-z0-9]+:[a-z0-9-]+$/i.test(a)) && G(`${t} must be an icon such as mdi:washing-machine.`), a;
}
function go(a) {
  const t = yt(a.house, "house").groups;
  return t == null ? [] : (Array.isArray(t) || G("house.groups must be a list of {name, icon, appliances}."), t.map((e, s) => {
    const n = `house.groups[${s}]`;
    ee(e) || G(`${n} must be a mapping like {name: Vaření, icon: mdi:silverware-fork-knife, appliances: [...]}.`), Gt(e, ["name", "icon", "appliances"], n), (!Array.isArray(e.appliances) || e.appliances.length === 0) && G(`${n}.appliances must be a list of {name, power, energy, running}.`);
    const o = e.appliances.map((i, r) => {
      const l = `${n}.appliances[${r}]`;
      ee(i) || G(`${l} must be a mapping like {name: Trouba, power: sensor.…, energy: sensor.…}.`), Gt(i, ["name", "power", "energy", "running", "warn_after"], l);
      const h = Qt(i.power, `${l}.power`, { domain: "sensor" });
      h || G(`${l}.power must be the power sensor (sensor.…) of the appliance.`);
      const c = Qt(i.energy, `${l}.energy`, { domain: "sensor" }), d = Ls(i.running, `${l}.running`), p = As(i.warn_after, `${l}.warn_after`);
      return { name: Ka(We(i.name, `${l}.name`), `${l}.name`), power: h, ...c ? { energy: c } : {}, ...d ? { running: d } : {}, ...p ? { warn_after: p } : {} };
    });
    return { name: Ka(We(e.name, `${n}.name`), `${n}.name`), icon: Es(e.icon, `${n}.icon`) ?? po, appliances: o };
  }));
}
function bo(a) {
  const t = yt(a.flows, "flows").decimals;
  return t == null ? to : (Ga.includes(t) || G(`flows.decimals must be one of ${Ga.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const fo = "/dashboard-bmw";
function mo(a) {
  const t = yt(a.car, "car").link;
  return t == null ? fo : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && G(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function vo(a) {
  const t = yt(a.titles, "titles");
  Gt(t, [...oa], "titles");
  const e = {};
  for (const s of oa) {
    const n = We(t[s], `titles.${s}`);
    n !== void 0 && (e[s] = n);
  }
  return e;
}
function yo(a) {
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
    (i ? e >= s : e > s) && G(`${n} (${e}) must be ${i ? "below" : "at most"} ${o} (${s}).`);
}
function $o(a) {
  return Zn("Energie Dashboard", () => xo(a));
}
function xo(a) {
  ee(a) || G("the configuration must be a mapping of keys.");
  const t = Object.fromEntries(Cs.map((n) => [n, ao(a, n)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && G("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = so(a);
  return yo(e), { language: qn(a.language), entities: t, titles: vo(a), num: e, colors: no(a), tempScale: oo(a), boilerShow: io(a), powerDecimals: bo(a), carLink: mo(a), batteryRange: ro(a), sunRange: lo(a), houseLabel: co(a), houseRange: ho(a), appliances: uo(a), groups: go(a) };
}
const T = "––", Xt = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, ce = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, Za = "ha-energie-dashboard:boiler-heating", Ya = "ha-energie-dashboard:battery-range", qa = "ha-energie-dashboard:sun-range";
function Nt(a, t) {
  const e = a?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function wo(a) {
  const t = a.reduce((o, i) => o + i, 0);
  if (t <= 0) return a.map(() => 0);
  const e = a.map((o) => o / t * 100), s = e.map(Math.floor);
  let n = 100 - s.reduce((o, i) => o + i, 0);
  return e.map((o, i) => ({ index: i, rest: o - s[i] })).sort((o, i) => i.rest - o.rest).forEach(({ index: o }) => {
    n-- > 0 && s[o]++;
  }), s;
}
const st = (a, t, e) => Math.max(t, Math.min(e, a)), $a = (a, t) => `color-mix(in srgb, ${a} ${t}%, transparent)`, Le = (a, t) => `color-mix(in srgb, ${a} ${t}%, var(--ed-tint-base))`, Os = (a) => Array.from({ length: 10 }, (t, e) => st((a - e * 10) / 10, 0, 1) * 100), Xa = (a) => `calc((100% - 18px) * ${st(a, 0, 100) / 100} + ${Math.max(0, Math.ceil(st(a, 0, 100) / 10) - 1) * 2}px)`;
var ko = Object.defineProperty, J = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && ko(t, e, n), n;
};
class X extends Ct {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._sunDetail = !1, this._sunTab = "today", this._sunMode = "total", this._houseDetail = !1, this._houseOpen = [], this._houseTab = "now", this._houseData = {}, this._i18n = Ne("cs"), this._fonts = 0, this._onFonts = () => {
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
    return Yn(t, this._i18n?.language ?? this.lang ?? "en");
  }
  get t() {
    return this._i18n.t;
  }
  get boostOptions() {
    return [{ value: "off", label: this.t.boostOptions.off }, { value: "on", label: this.t.boostOptions.on }];
  }
  willUpdate() {
    this._i18n = Ne(Mn(this._config?.language ?? "auto", this.hass), this.hass), Pn(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && ot(F(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
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
    t.has("hass") && this._tankTemp && Nt(vt(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
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
    return v`<p class="state ${e ? "tinted" : ""}" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t === void 0 ? v`<span>${this.noData()}</span>` : typeof t == "string" ? v`<span>${t}</span>` : Lt(t)}
    </p>`;
  }
  /** „Boost“ in the state line, orange: the one mark that Boost is on (uživatel 12. 11. 2026: „Q137 A“; CURRENT_SPEC.md, Bojler: „oranžový zůstává jen popisek stavu“). */
  boostMark() {
    return v`<span class="boost-mark">${this.t.boostOptions.on}</span>`;
  }
  /** "––" in the grey of no data, read as „bez dat“ (CURRENT_SPEC.md, Chybějící a zastaralá data; DASHBOARD_UX_SYSTEM.md, Text). */
  noData() {
    return v`<span class="nodata">${T}<span class="sr-only">${this.t.noData}</span></span>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !ot(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || ot(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
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
    const e = F(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
}
J([
  Z()
], X.prototype, "_config");
J([
  B({ attribute: !1 })
], X.prototype, "hass");
J([
  Z()
], X.prototype, "_width");
J([
  Z()
], X.prototype, "_optimistic");
J([
  Z()
], X.prototype, "_feedback");
J([
  Z()
], X.prototype, "_open");
J([
  Z()
], X.prototype, "_pop");
J([
  Z()
], X.prototype, "_all");
J([
  Z()
], X.prototype, "_now");
J([
  Z()
], X.prototype, "_carHint");
J([
  Z()
], X.prototype, "_batDetail");
J([
  Z()
], X.prototype, "_batTab");
J([
  Z()
], X.prototype, "_batSpan");
J([
  Z()
], X.prototype, "_batRange");
J([
  Z()
], X.prototype, "_batOpen");
J([
  Z()
], X.prototype, "_batScrub");
J([
  Z()
], X.prototype, "_batData");
J([
  Z()
], X.prototype, "_sunDetail");
J([
  Z()
], X.prototype, "_sunTab");
J([
  Z()
], X.prototype, "_sunRange");
J([
  Z()
], X.prototype, "_sunMode");
J([
  Z()
], X.prototype, "_sunHint");
J([
  Z()
], X.prototype, "_sunWeather");
J([
  Z()
], X.prototype, "_houseDetail");
J([
  Z()
], X.prototype, "_houseRange");
J([
  Z()
], X.prototype, "_houseOpen");
J([
  Z()
], X.prototype, "_houseTab");
J([
  Z()
], X.prototype, "_houseData");
J([
  Z()
], X.prototype, "_houseToday");
J([
  Z()
], X.prototype, "_houseCycles");
J([
  Z()
], X.prototype, "_tankTemp");
const _o = (a) => class extends a {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? ct(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, s, n) {
    const o = this.shown(e);
    return v`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${n ? "warn" : ""}">${o === void 0 ? T : s}</span></span>
        <ed-switch
          label=${t} .checked=${o === "on"} ?disabled=${o === void 0}
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
    if (!this.hass || ct(this.hass, n) === void 0)
      return this._feedback = this.t.feedback.noData(o), !1;
    try {
      return await this.hass.callService(t, e, s), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(o), !1;
    }
  }
  async setSwitch(t, e, s) {
    this._feedback = "", this.choose(t, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: t }, t, s);
  }
  async setBoost(t, e) {
    const s = this._config.entities, n = t === "wallbox" ? s.wallbox.boost : s.boiler.boost;
    n && (this._feedback = "", t === "wallbox" && e && s.wallbox.block_charging && ct(this.hass, s.wallbox.block_charging) === "on" && (await this.setSwitch(s.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(n, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: n }, n, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, e, s) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, s);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, this.t.tank.modeLabel) && e === "heat") {
      const { min: s, max: n } = this.tankRange(this._config), o = Nt(vt(this.hass, t), "temperature");
      (o === void 0 || o < s || o > n) && await this.setTemperature(t, st(o ?? s, s, n));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = vt(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, Nt(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, Nt(e, "max_temp") ?? t.num.tank.temp_max)
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
}, Ue = ["1d", "7d", "30d"], oe = { "1d": 1, "7d": 7, "30d": 30 }, U = 310, Q = 36e5, Rt = 24 * Q, ia = (a) => typeof a == "number" && Number.isFinite(a);
async function Ft(a, t, e, s, n, o) {
  return t.length ? await a.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(s).toISOString(),
    statistic_ids: t,
    period: n,
    types: o
  }) ?? {} : {};
}
function Ht(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t.getTime();
}
function Tt(a, t, e, s, n, o = "mean", i = 0) {
  const r = new Array(n).fill(0), l = new Array(n).fill(0), h = new Array(n).fill(void 0), c = (s - e) / n;
  for (const d of a ?? []) {
    const p = d[t];
    if (!ia(p) || !ia(d.start) || c <= 0) continue;
    const b = Math.floor((d.start - e + i) / c);
    if (b < 0 || b >= n) continue;
    l[b]++, r[b] += p;
    const y = h[b];
    o === "min" ? h[b] = y === void 0 ? p : Math.min(y, p) : o === "max" ? h[b] = y === void 0 ? p : Math.max(y, p) : o === "last" && (h[b] = p);
  }
  return h.map((d, p) => {
    if (l[p])
      return o === "mean" ? r[p] / l[p] : o === "sum" ? r[p] : d;
  });
}
function Dt(a, t) {
  return (a ?? []).some((e) => ia(e[t]));
}
const N = (a) => Math.round(a * 10) / 10;
function he(a, t, e) {
  let s = "", n = !1;
  return a.forEach((o, i) => {
    if (o === void 0) {
      n = !1;
      return;
    }
    s += `${n ? " L" : s ? " M" : "M"}${N(t(i))} ${N(e(o))}`, n = !0;
  }), s;
}
function Ve(a, t, e, s) {
  let n = "", o = -1;
  const i = (r) => {
    if (!(o < 0)) {
      n += `${n ? " " : ""}M${N(t(o))} ${N(s)}`;
      for (let l = o; l <= r; l++) n += ` L${N(t(l))} ${N(e(a[l]))}`;
      n += ` L${N(t(r))} ${N(s)} Z`, o = -1;
    }
  };
  return a.forEach((r, l) => {
    r === void 0 ? i(l - 1) : o < 0 && (o = l);
  }), i(a.length - 1), n;
}
function js(a, t, e, s) {
  let n = "", o = -1;
  const i = (l) => a[l] !== void 0 && t[l] !== void 0, r = (l) => {
    if (!(o < 0)) {
      n += `${n ? " " : ""}M${N(e(o))} ${N(s(t[o]))}`;
      for (let h = o + 1; h <= l; h++) n += ` L${N(e(h))} ${N(s(t[h]))}`;
      for (let h = l; h >= o; h--) n += ` L${N(e(h))} ${N(s(a[h]))}`;
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
function So(a, t) {
  const e = a.filter((r) => r !== void 0);
  if (!e.length) return;
  let s = Math.min(...e), n = Math.max(...e);
  const o = Math.max(n - s, t), i = (n + s) / 2;
  return s = i - o / 2 - o * 0.1, n = i + o / 2 + o * 0.1, { lo: s, hi: n };
}
function Ja(a, t, e) {
  if (!(e > 0) || !(a > 0) || !(t > 0)) return;
  const s = a / 100 * t / (e / 1e3), n = Math.round(s * 60 / 5) * 5;
  return n >= 5 && n < 2880 ? n : void 0;
}
function pe(a) {
  const t = Math.floor(a / 60), e = a % 60;
  return t === 0 ? `${e} min` : e === 0 ? `${t} h` : `${t} h ${e} min`;
}
const Vt = 56, He = 6e4, Yt = 60 * He, Ot = 24 * Yt, Qa = [10 * He, 15 * He, 30 * He, Yt, 2 * Yt, 3 * Yt, 4 * Yt, 6 * Yt, 12 * Yt, Ot, 2 * Ot, 3 * Ot, 5 * Ot, 7 * Ot], ts = 6, es = 10, zs = 8;
function Mo(a) {
  let t = Qa[0], e = 1 / 0;
  for (const s of Qa) {
    const n = a / s, i = (n < ts ? ts - n : n > es ? n - es : 0) * 100 + Math.abs(n - zs) - s / 1e12;
    i < e && (e = i, t = s);
  }
  return t;
}
function as(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t;
}
function To(a, t, e) {
  const s = [];
  if (e < Ot) {
    const i = as(a).getTime();
    for (let r = i + Math.ceil((a - i) / e) * e; r <= t; r += e) r >= a && s.push(r);
    return s;
  }
  const n = Math.round(e / Ot), o = as(t);
  for (let i = 0; ; i++) {
    const r = new Date(o);
    if (r.setDate(o.getDate() - i * n), r.getTime() < a) break;
    s.push(r.getTime());
  }
  return s.reverse();
}
function xa(a) {
  const { start: t, end: e } = a, s = a.x0 ?? 0, n = a.x1 ?? U, o = a.x ?? ((c) => s + (c - t) / (e - t) * (n - s)), i = Mo(e - t), r = (c) => i < Ot ? it(c).replace(/^(\d{1,2}):00$/, "$1") : i === Ot && e - t <= 8 * Ot ? Nn(c) : In(c), l = To(t, e, i).map((c) => {
    const d = Math.round(o(c) * 10) / 10;
    if (a.slot) {
      const p = Math.round(o(c + a.slot / 2) * 10) / 10, b = r(c), y = b.length * 3.3;
      return { x: d, text: p - y < s || p + y > n ? "" : b, labelX: p };
    }
    return { x: d, text: d < s + 6 || d > n - 6 ? "" : r(c) };
  });
  return Math.max(0, ...l.map((c) => c.text.length)) > 5 && l.length - 1 > 7 ? l.map((c, d) => d % 2 === 1 ? c : { ...c, text: "" }) : l;
}
function Bs(a) {
  if (!a || a.length < 2) return U / zs;
  const t = a.slice(1).map((e, s) => e.x - a[s].x).sort((e, s) => e - s);
  return t[Math.floor(t.length / 2)];
}
const Do = [1, 2, 4, 5], Co = [1, 2, 3, 4, 5, 6, 8, 10];
function Lo(a) {
  if (!(a > 0)) return !1;
  const t = a / 10 ** Math.floor(Math.log10(a) + 1e-9);
  return [1, 2, 2.5, 5].some((e) => Math.abs(t - e) < 1e-6 * e);
}
function Ao(a, t, e, s) {
  const n = [...a].sort((r, l) => r.y - l.y), o = [...n], i = [];
  return n.slice(1).forEach((r, l) => {
    const h = n[l].y, c = (r.y - h) / t, d = s ? Co.filter((b) => b === 1 || Lo(Math.abs(s(r.y) - s(h)) / b)) : Do, p = d.reduce((b, y) => Math.abs(y - c) < Math.abs(b - c) ? y : b, d[0] ?? 1);
    for (let b = 1; b < p; b++) {
      const y = Math.round((h + (r.y - h) * b / p) * 10) / 10;
      o.push({ y });
      const f = e?.(y);
      f && i.push({ y, text: f });
    }
  }), { grid: o.sort((r, l) => r.y - l.y), labels: i };
}
function Hs(a, t) {
  const e = a / Math.max(1, t), s = 10 ** Math.floor(Math.log10(e));
  return [1, 2, 2.5, 5, 10].map((n) => n * s).find((n) => n >= e * 0.8) ?? e;
}
const Eo = 5 * 6e4, xe = 48, ss = 60, Oo = 0, jo = (a) => class extends a {
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
    const n = t.entities.battery, o = (...h) => h.filter((c) => !!c), [i, r] = e.split(":");
    if (i === "day") {
      const h = s - (r === "6h" ? 6 : 24) * Q;
      return [{ part: "level", ids: o(n.power, n.state_of_charge), start: h, end: s, period: "5minute", types: ["mean"] }];
    }
    const l = r;
    if (i === "hist") {
      const h = this.histWindow(l, s);
      return [
        { part: "energy", ids: o(n.total_charge, n.total_discharge), start: h.start, end: s, period: l === "1d" ? "hour" : "day", types: ["change"] },
        { part: "level", ids: o(n.state_of_charge, n.power), start: h.start, end: s, period: "hour", types: ["mean", "min", "max"] }
      ];
    }
    return [
      {
        part: "health",
        ids: o(n.min_cell_voltage, n.max_cell_voltage, n.min_cell_temperature, n.max_cell_temperature, n.temperature, n.total_discharge, n.total_charge),
        start: s - oe[l] * Rt,
        end: s,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, e) {
    if (t === "1d")
      return { start: Math.floor(e / Q) * Q - 23 * Q, bins: 24 };
    const s = new Date(e);
    return s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (oe[t] - 1)), { start: s.getTime(), bins: oe[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const e of this.batNeeds(t)) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < Eo) || this.fetchBattery(t, e, s);
      }
  }
  async fetchBattery(t, e, s) {
    const n = this.hass;
    if (!n) return;
    const o = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: o, parts: s?.parts ?? {} } };
    try {
      const i = this.batRequests(t, e, o), r = {};
      await Promise.all(i.map(async (l) => r[l.part] = await Ft(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
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
    return ot(t.batIn, s) ? "charging" : ot(t.batDis, s) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, e, s) {
    const n = this.t, o = this.batteryReserve(e), i = Array.from({ length: 10 }, (l, h) => {
      const c = (h + 1) * 10 <= o + 1e-3, d = t === void 0 ? 0 : st((t - h * 10) / 10, 0, 1) * 100, p = h === 0 ? "8px 0 0 8px" : h === 9 ? "0 8px 8px 0" : "0", b = c ? "var(--ed-warning)" : "var(--ed-battery)";
      return v`<span class="pill" style="height:${s}px;border-radius:${p};background:${c ? $a("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${d.toFixed(1)}%;background:${b}"></i></span>`;
    }), r = t === void 0 ? n.noData : n.bat.levelLabel(K(t), K(o));
    return v`<div class="bat-gauge" role="img" aria-label=${r}>${i}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, e) {
    const s = t.soc, n = this.batState(t, e);
    if (s === void 0) return;
    const o = e.num.battery.capacity;
    if (n === "charging") {
      const i = Ja(100 - s, o, t.batIn ?? 0);
      return i === void 0 ? void 0 : this.t.bat.fullIn(pe(i));
    }
    if (n === "discharging") {
      const i = Ja(s - this.batteryReserve(e), o, t.batDis ?? 0);
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
    const o = this.t, i = e.num.flows.idle_threshold, r = t.key === "bat", l = s.soc, h = l !== void 0 && l <= this.batteryReserve(e), c = r ? s.batDis : s.batIn, p = ot(c, i) ? r ? o.pop.discharging(nt(c, n)) : o.pop.charging(nt(c, n)) : s.batDis === void 0 && s.batIn === void 0 && l === void 0 ? T : r ? o.idle.bat : o.idle.batIn, b = this.today(e), y = r ? b.bdis : b.bchg, f = this.batEstimate(s, e);
    return v`<ed-sheet open .heading=${t.name} .sub=${p} .closeLabel=${o.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop">
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${o.pop.level}${h ? v`<span class="note"> ${o.pop.atReserve}</span>` : M}</span>
            <span class="pop-big" style="color:${h ? "var(--ed-warning)" : "var(--ed-text)"}">${l === void 0 ? T : K(l)}</span>
          </div>
          ${this.renderGauge(l, e, 12)}
        </div>
        ${f ? v`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${f}</p>` : M}
        <div class="pop-rows"><div class="pop-row"><span>${r ? o.pop.rows.discharged : o.pop.rows.charged}</span><b>${y === void 0 ? T : `${at(y)} kWh`}</b></div></div>
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
    const e = this.t, s = this._batScrub[t.id] ?? t.start ?? 100, n = !!t.whole && this._batScrub[t.id] === void 0, o = t.fade ?? Oo, i = (g) => {
      const m = g / 100 * U;
      let x = 0;
      for (let _ = 1; _ < t.n; _++) Math.abs(t.x(_) - m) < Math.abs(t.x(x) - m) && (x = _);
      return x;
    }, r = i(s), l = () => {
      const g = { ...this._batScrub };
      delete g[t.id], this._batScrub = g;
    }, h = (g) => {
      if (g.key === "Enter" && t.whole && !n) {
        g.preventDefault(), l();
        return;
      }
      const m = g.key === "ArrowRight" || g.key === "ArrowUp" ? 1 : g.key === "ArrowLeft" || g.key === "ArrowDown" ? -1 : 0;
      if (!m) return;
      g.preventDefault();
      const x = n ? r : st(r + m, 0, t.n - 1);
      this._batScrub = { ...this._batScrub, [t.id]: t.x(x) / U * 100 };
    }, c = t.x(r), d = t.dot?.(r), p = n && t.wholeText ? t.wholeText : t.read(r), b = (g) => `${(g / t.h * 100).toFixed(2)}%`, y = t.ticks ?? (t.time ? xa(t.time) : void 0), f = Ao(t.grid, Bs(y), t.valueAt, t.valueNum), u = [...t.labels, ...f.labels.filter((g) => t.labels.every((m) => Math.abs(m.y - g.y) > 13))];
    return v`${t.panel ? M : v`<div class="bat-read">${Pt(p)}</div>`}
        <div class="bat-chart" style="aspect-ratio:${U + Vt} / ${t.h}">
          <svg viewBox="0 0 ${U + Vt} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${o} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${U} height=${t.h}><rect width=${U} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${f.grid.map((g) => V`<line x1="0" y1=${g.y} x2=${U} y2=${g.y} class=${g.strong ? "axis" : "grid"}></line>`)}
            ${(y ?? []).map((g) => V`<line x1=${g.x} y1="0" x2=${g.x} y2=${t.h} class="grid"></line>`)}
            <g mask=${o > 0 ? `url(#bm-${t.id})` : M}>${t.body}</g>
            ${n ? M : V`<line x1=${c} y1="0" x2=${c} y2=${t.h} class="cursor"></line>`}
            ${d && !n ? V`<circle cx=${c} cy=${d.y} r="6" style="fill:var(--ed-text)"></circle>` : M}
          </svg>
          ${u.map((g) => v`<span class="bat-ylabel" style="top:calc(${b(g.y)} - 7px);left:calc(${(U / (U + Vt) * 100).toFixed(2)}% + 8px)">${g.text}</span>`)}
          <input type="range" style="width:${(U / (U + Vt) * 100).toFixed(2)}%" min="0" max="100" step="1" .value=${String(s)} aria-label=${e.bat.scrubLabel} aria-valuetext=${p}
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
      const m = Number(g.target.value);
      this._scrubTap?.id === t.id && this._scrubTap.index !== i(m) && (this._scrubTap.moved = !0), this._batScrub = { ...this._batScrub, [t.id]: m };
    }} @keydown=${h} />
        </div>
        ${y ? v`<div class="bat-axis ticks">${y.map((g) => v`<span style="left:${((g.labelX ?? g.x) / (U + Vt) * 100).toFixed(2)}%;transform:translateX(${g.labelX === void 0 && g.x < 8 ? "0" : g.labelX === void 0 && g.x > U - 8 ? "-100%" : "-50%"})">${g.text}</span>`)}</div>` : v`<div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>`}
        ${t.panel ? n ? t.whole() : t.panel(r) : t.legend ?? M}`;
  }
  renderChartOrEmpty(t, e, s) {
    if (s) return this.renderChart(s);
    const n = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return v`<div class="bat-nodata" style="aspect-ratio:${U} / ${e}">${n ? T : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const e = t.entities.battery, s = `day:${this._batSpan}`, n = this._batData[s];
    if (!n) return;
    const o = this._batSpan === "6h" ? 6 : 24, i = n.at, r = i - o * Q, l = Tt(this.batRows(s, "level", e.state_of_charge), "mean", r, i, xe), h = Tt(this.batRows(s, "level", e.power), "mean", r, i, xe).map((A) => A === void 0 ? void 0 : -A / 1e3);
    if (!l.some((A) => A !== void 0) && !h.some((A) => A !== void 0)) return;
    const c = F(this.hass, e.state_of_charge), d = F(this.hass, e.power);
    c !== void 0 && (l[xe - 1] = c), d !== void 0 && (h[xe - 1] = -d / 1e3);
    const p = xe, b = (A) => N(A / (p - 1) * U), y = (A) => N(98 - st(A, 0, 100) / 100 * 90), f = me(Math.max(1, ...h.map((A) => Math.abs(A ?? 0)))), u = 172, g = (A) => N(u - st(A, -f, f) / f * 44), m = 4.2, x = h.map((A, S) => {
      if (A === void 0) return M;
      const D = Math.min(u, g(A)), E = Math.max(1.5, Math.abs(g(A) - u));
      return V`<rect x=${N(b(S) - m / 2)} y=${A >= 0 ? D : u} width=${m} height=${N(E)} rx="1.5" style="fill:${A >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), _ = he(l, b, y), $ = Ve(l, b, y, 98), O = (A) => `${Y(A, A % 1 === 0 ? 0 : 1)} kW`;
    return {
      id: "level",
      h: 224,
      n: p,
      x: b,
      grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: !0 }, { y: u - 44 }, { y: u, strong: !0 }, { y: u + 44 }],
      time: { start: r, end: i },
      labels: [
        { y: 8, text: K(100) },
        { y: 53, text: K(50) },
        { y: 98, text: K(0) },
        { y: u - 44, text: `+${O(f)}` },
        { y: u, text: "0" },
        { y: u + 44, text: `−${O(f)}` }
      ],
      body: V`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${$} fill="url(#bl-area)"></path>
          <path d=${_} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${x}`,
      dot: (A) => l[A] === void 0 ? void 0 : { y: y(l[A]), color: "var(--ed-text)" },
      read: (A) => {
        const S = h[A], D = S === void 0 ? T : Math.abs(S) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${S > 0 ? this.t.bat.charging : this.t.bat.discharging} ${nt(Math.abs(S) * 1e3, "kW")}`;
        return `${this.back((1 - A / (p - 1)) * o * 60)} · ${l[A] === void 0 ? T : K(l[A])} · ${D}`;
      },
      from: `−${o} h`,
      to: this.t.bat.now,
      legend: v`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`
    };
  }
  /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
  energyChart(t, e) {
    const s = t.entities.battery, n = `hist:${e}`, o = this._batData[n];
    if (!o) return;
    const i = this.histWindow(e, o.at), r = e === "1d", l = i.bins, h = r ? Q : Rt, c = i.start + l * h, d = r ? 0 : 6 * Q, p = this.batRows(n, "energy", s.total_charge), b = this.batRows(n, "energy", s.total_discharge), y = Tt(p, "change", i.start, c, l, "sum", d), f = Tt(b, "change", i.start, c, l, "sum", d);
    if (!y.some((w) => w !== void 0) && !f.some((w) => w !== void 0)) return;
    const u = y.map((w) => w ?? 0), g = f.map((w) => w ?? 0), m = me(Math.max(0.5, ...u, ...g)), x = r ? 3 : l <= 7 ? 10 : 2, _ = (U - (l - 1) * x) / l, $ = (w) => N(w * (_ + x) + _ / 2), O = 100, A = (w) => st(w, 0, m) / m * 92, S = u.flatMap((w, z) => {
      const tt = g[z], P = z === l - 1 ? 1 : 0.85;
      return [
        V`<rect x=${N(z * (_ + x))} y=${N(O - Math.max(w > 0 ? 1 : 0, A(w)))} width=${N(_)} height=${N(Math.max(w > 0 ? 1 : 0, A(w)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${P}"></rect>`,
        V`<rect x=${N(z * (_ + x))} y=${O} width=${N(_)} height=${N(Math.max(tt > 0 ? 1 : 0, A(tt)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${P}"></rect>`
      ];
    }), D = (w) => N(O - st(w, -m, m) / m * 92), E = u.map((w, z) => w - g[z]), k = r ? 2 : 1, C = (w) => `${w >= 0 ? "+" : "−"}${Y(Math.abs(w), k)}`, j = (w) => r ? it(i.start + w * Q) : _e(i.start + w * Rt);
    return {
      charged: u,
      discharged: g,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: $,
        grid: [{ y: O, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${Y(m, m % 1 === 0 ? 0 : 1)}` }, { y: O, text: "0" }, { y: 192, text: `−${Y(m, m % 1 === 0 ? 0 : 1)}` }],
        time: { start: i.start, end: c, slot: h },
        valueNum: (w) => (O - w) / 92 * m,
        valueAt: (w) => {
          const z = (O - w) / 92 * m;
          return Math.abs(z) < 1e-9 ? void 0 : `${z > 0 ? "+" : "−"}${Y(Math.abs(z), Math.abs(z) % 1 === 0 ? 0 : Math.abs(z * 10) % 1 < 1e-6 ? 1 : 2)}`;
        },
        body: V`${S}<path d=${he(E, $, D)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (w) => ({ y: D(E[w]), color: "var(--ed-text)" }),
        read: (w) => `${j(w)} · ${C(u[w])} / ${C(-g[w])} · ${this.t.bat.net} ${C(E[w])} kWh`,
        from: r ? "−24 h" : _e(i.start),
        to: this.t.bat.today,
        legend: v`<div class="bat-legend wrap"><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charged.toLowerCase()}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharged.toLowerCase()}</span><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.net}</span></div>`
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
    const i = oe[e], r = o.at, l = r - i * Rt, h = ss, c = (k) => Tt(this.batRows(n, "health", k), "mean", l, r, h), d = c(s.min_cell_voltage), p = c(s.max_cell_voltage), b = d.map((k, C) => k === void 0 || p[C] === void 0 ? void 0 : Math.max(0, (p[C] - k) * 1e3)), y = b.filter((k) => k !== void 0);
    if (!y.length) return;
    const { imbalance_good: f, imbalance_warn: u } = t.num.battery, g = Math.max(f > 0 ? f * 1.5 : 10, Math.max(...y) * 1.2), m = (k) => N(130 - st(k, 0, g) / g * 120), x = (k) => N(k / (h - 1) * U), _ = (k) => this.back((1 - k / (h - 1)) * i * 24 * 60), $ = this.t.bat.health, O = "var(--ed-battery)", A = "var(--ed-warning)", S = (k) => k > u ? A : O, D = `bg-${e}`, E = st(1 - (130 - m(u)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: h,
      x,
      time: { start: l, end: r },
      grid: [{ y: 10 }, { y: m(f) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${R(g)} mV` }, { y: m(f), text: `${R(f)} mV` }, { y: 130, text: "0" }],
      body: V`<defs>
            <linearGradient id=${D} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${E} stop-color="#FF9230"></stop><stop offset=${E} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${D}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${m(f)} width=${U} height=${N(130 - m(f))} style="fill:${O};fill-opacity:0.12"></rect>
          <path d=${Ve(b, x, m, 130)} fill="url(#${D}-area)"></path>
          <path d=${he(b, x, m)} fill="none" stroke="url(#${D})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (k) => b[k] === void 0 ? void 0 : { y: m(b[k]), color: S(b[k]) },
      read: (k) => b[k] === void 0 ? `${_(k)} · ${T}` : `${_(k)} · ${$.difference} ${R(b[k])} mV · ${$.min} ${Y(d[k], 3)} V · ${$.max} ${Y(p[k], 3)} V`,
      from: i === 1 ? "−24 h" : `−${i} d`,
      to: this.t.bat.today,
      legend: v`<div class="bat-legend"><span><i class="swatch" style="background:${O};opacity:0.35"></i>${$.excellentZone(`${R(f)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, e, s) {
    if (t === "gap") return this.balanceChart(e, s);
    const n = e.entities.battery, o = `health:${s}`, i = this._batData[o];
    if (!i) return;
    const r = oe[s], l = i.at, h = l - r * Rt, c = ss, d = (E) => this.batRows(o, "health", E), p = (E) => Tt(d(E), "mean", h, l, c), b = (E) => N(E / (c - 1) * U), y = (E) => this.back((1 - E / (c - 1)) * r * 24 * 60), f = r === 1 ? "−24 h" : `−${r} d`;
    let u;
    if (t === "temp") {
      const E = p(n.min_cell_temperature), k = p(n.max_cell_temperature), C = p(n.temperature);
      u = {
        low: E,
        high: k,
        line: C,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (j) => `${R(j)} °C`,
        mid: (j) => `${R(j)} °C`,
        read: (j) => {
          const w = [E[j] === void 0 ? void 0 : `${this.t.bat.health.min} ${Y(E[j], 1)}`, C[j] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${Y(C[j], 1)}`, k[j] === void 0 ? void 0 : `${this.t.bat.health.max} ${Y(k[j], 1)}`].filter(Boolean);
          return `${y(j)} · ${w.length ? `${w.join(" · ")} °C` : T}`;
        },
        legend: v`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const E = Tt(d(n.total_discharge), "state", h, l, c, "last").map((k) => k === void 0 ? void 0 : k / e.num.battery.capacity);
      u = {
        low: E,
        high: E,
        line: E,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (k) => R(k, 1),
        mid: (k) => R(k, 1),
        read: (k) => `${y(k)} · ${E[k] === void 0 ? T : this.t.bat.health.cycles(Y(E[k], 1))}`
      };
    }
    const g = So([...u.low, ...u.high], u.minSpan);
    if (!g) return;
    const m = Hs(g.hi - g.lo, 4), x = Math.floor(g.lo / m + 1e-9) * m;
    let _ = Math.ceil(g.hi / m - 1e-9) * m;
    Math.round((_ - x) / m) % 2 === 1 && (_ += m);
    const $ = { lo: x, hi: _ }, O = (E) => N(130 - (st(E, $.lo, $.hi) - $.lo) / ($.hi - $.lo) * 120), A = t === "life" ? "" : js(u.low, u.high, b, O), S = u.line ? he(u.line, b, O) : "", D = u.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: c,
      x: b,
      time: { start: h, end: l },
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: u.text($.hi) }, { y: 70, text: u.mid(($.hi + $.lo) / 2) }, { y: 130, text: u.text($.lo) }],
      body: V`<path d=${A} style="fill:${D};fill-opacity:0.22"></path><path d=${S} fill="none" style="stroke:${D}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (E) => u.line?.[E] === void 0 ? void 0 : { y: O(u.line[E]), color: D },
      read: u.read,
      from: f,
      to: this.t.bat.today,
      legend: u.legend
    };
  }
  // ----------------------------------------------------------------- the detail
  /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
  renderBatteryDetail(t, e) {
    const s = this.t, n = ["now", "hist", "health"].map((o) => ({ value: o, label: s.bat.tabs[o] }));
    return v`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${s.bat.detailLabel} tabindex="-1">
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
    return v`<ed-segmented .options=${s} .value=${this.batRange(t)} label=${e.bat.rangeLabel} @hdk-select=${(n) => this.setBatRange(n.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, e) {
    const s = this.t, n = t.entities.battery, o = e.soc, i = this.batState(e, t), r = this.batSigned(e), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, h = "kW", c = F(this.hass, n.current), d = F(this.hass, n.voltage), p = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, b = i === "idle", y = i === "charging" ? s.pop.charging(nt(e.batIn ?? 0, h)) : i === "discharging" ? s.pop.discharging(nt(e.batDis ?? 0, h)) : i === "idle" ? s.bat.status.idle.toLowerCase() : s.noData, f = this.batEstimate(e, t), u = this.today(t), g = [
      { label: s.bat.live.power, value: l === void 0 ? T : b ? "0 kW" : nt(l, h), sub: i === void 0 ? "" : s.bat.status[i] },
      { label: s.bat.live.current, value: c === void 0 ? T : `${Y(Math.abs(c), 1)} A`, sub: c === void 0 || b || i === void 0 ? "" : i === "charging" ? s.bat.live.chargeCurrent : s.bat.live.dischargeCurrent },
      { label: s.bat.live.voltage, value: d === void 0 ? T : `${Y(d, 1)} V`, sub: s.bat.live.ofBattery },
      { label: s.bat.live.load, value: p === void 0 ? T : `${Y(p, 2)} C`, sub: s.bat.live.loadSub }
    ], m = u.bchg, x = u.bdis, _ = m !== void 0 && x !== void 0 ? m - x : void 0, $ = ["6h", "24h"].map((O) => ({ value: O, label: s.bat.spans[O] }));
    return v`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${s.bat.level}</span><span class="bat-sub">${y}</span></div><span class="bat-huge">${o === void 0 ? T : K(o)}</span></div>
          ${this.renderGauge(o, t, 32)}
          ${f ? v`<p class="bat-estimate plain">${f}</p>` : M}
        </div>
        <div class="bat-kpis">${g.map((O) => v`<div class="bat-kpi"><span class="sub">${O.label}</span><span class="val">${O.value}</span><span class="sub">${O.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.levelChart}</span>
          <ed-segmented .options=${$} .value=${this._batSpan} label=${s.bat.spanLabel} @hdk-select=${(O) => {
      this._batSpan = O.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${s.bat.charged}</span><span class="val">${m === void 0 ? T : `${at(m)} kWh`}</span></div><div><span class="sub">${s.bat.discharged}</span><span class="val">${x === void 0 ? T : `${at(x)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${m !== void 0 && x !== void 0 && m + x > 0 ? v`${m > 0 ? v`<i style="flex:${m.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : M}${x > 0 ? v`<i style="flex:${x.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : M}` : M}</div>
          <p class="bat-sub">${_ === void 0 ? T : s.bat.netStored(`${_ >= 0 ? "+" : "−"}${at(Math.abs(_))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, e) {
    const s = this.t, n = t.entities.battery, o = this.batRange(t), i = `hist:${o}`, r = this.energyChart(t, o), l = r ? r.charged.reduce((S, D) => S + D, 0) : void 0, h = r ? r.discharged.reduce((S, D) => S + D, 0) : void 0, c = s.bat.kpi.over(o === "1d" ? "24 h" : s.bat.ranges[o].toLowerCase()), d = this._batData[i], p = oe[o], b = this.batRows(i, "level", n.state_of_charge), y = this.batRows(i, "level", n.power), f = Dt(b, "min") ? Math.min(...(b ?? []).map((S) => S.min).filter((S) => typeof S == "number")) : void 0, u = Dt(y, "max") || Dt(y, "min") ? Math.max(...(y ?? []).flatMap((S) => [S.max, S.min]).filter((S) => typeof S == "number").map((S) => Math.abs(S))) : void 0, g = `${Y(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, m = T, x = [
      { label: s.bat.charged, value: l === void 0 ? m : `${Y(l, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: s.bat.discharged, value: h === void 0 ? m : `${Y(h, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: s.bat.kpi.efficiency, value: l && h !== void 0 ? K(Y(h / l * 100, 1)) : m, sub: s.bat.kpi.efficiencySub },
      { label: s.bat.kpi.cycles, value: h === void 0 ? m : Y(h / t.num.battery.capacity, 1), sub: s.bat.kpi.cyclesSub(g) },
      { label: s.bat.kpi.lowest, value: f === void 0 ? m : K(f), sub: s.bat.kpi.lowestSub },
      { label: s.bat.kpi.peak, value: u === void 0 ? m : nt(u, "kW"), sub: s.bat.kpi.peakSub }
    ], $ = Tt(b, "mean", this.histWindow(o, d?.at ?? Date.now()).start, d?.at ?? Date.now(), Math.max(1, p * 24)).filter((S) => S !== void 0), O = [0, 20, 40, 60, 80, 100], A = O.slice(0, 5).map((S, D) => $.length ? Math.round($.filter((E) => D === 4 ? E >= S : E >= S && E < O[D + 1]).length / $.length * 100) : void 0);
    return v`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${Lt([o === "1d" ? s.bat.energyHours : s.bat.energyDays, v`<span class="unit">kWh</span>`])}</span>${this.renderChartOrEmpty(i, 200, r?.chart)}</div>
        <div class="bat-kpis">${x.map((S) => v`<div class="bat-kpi"><span class="sub">${S.label}</span><span class="val">${S.value}</span><span class="sub">${S.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.bandsTitle}</span>
          ${A.map((S, D) => v`<div class="bat-band"><span class="name">${O[D]}–${O[D + 1]} %</span><span class="track"><i style="width:${S ?? 0}%;background:${D === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${S === void 0 ? T : K(S)}</span></div>`)}
          <p class="bat-sub">${s.bat.bandsNote}</p>
        </div>`;
  }
  /** Text of an error or a warning entity: "" = none, undefined = no data. */
  batProblem(t) {
    const e = vt(this.hass, t)?.state;
    if (!(e === void 0 || e === "unavailable" || e === "unknown"))
      return e === "" || e === "0" ? "" : e;
  }
  renderBatteryHealth(t, e) {
    const s = this.t, n = t.entities.battery, o = s.bat.health, i = this.batRange(t), r = (C) => F(this.hass, C), l = r(n.state_of_health), h = r(n.min_cell_voltage), c = r(n.max_cell_voltage), d = r(n.min_cell_temperature), p = r(n.max_cell_temperature), b = this.batProblem(n.error), y = this.batProblem(n.warning), f = Jt(this.hass, n.total_charge), u = Jt(this.hass, n.total_discharge), g = t.num.battery, m = h !== void 0 && c !== void 0 ? (c - h) * 1e3 : void 0, x = m === void 0 ? void 0 : m <= g.imbalance_good ? "good" : m <= g.imbalance_warn ? "ok" : m <= g.imbalance_fault ? "warn" : "fault", _ = x === "warn" || x === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", A = [l, h, c, d, p, e.soc].every((C) => C === void 0) && b === void 0 && y === void 0 ? { title: o.noData, sub: o.noDataSub, tone: "off", icon: "M5 12h14" } : b || y ? { title: b ? o.error(b) : o.warning(y), sub: o.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: o.ok, sub: o.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, S = u === void 0 ? void 0 : u / g.capacity, D = [
      { key: "soh", label: o.capacity, value: l === void 0 ? T : K(l), sub: l === void 0 ? s.noData : o.capacitySub(`${Y(g.capacity * l / 100, 1)} kWh`, `${Y(g.capacity, g.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: o.balance, value: m === void 0 ? T : `${R(m)} mV`, word: x ? o.words[x] : void 0, sub: o.balanceSub, details: [] },
      {
        key: "temp",
        label: o.temperature,
        value: p === void 0 ? T : `${R(p)} °C`,
        sub: p !== void 0 && d !== void 0 ? o.temperatureSub(`${R(p - d)} °C`) : s.noData,
        details: [
          [o.battery, n.temperature],
          [o.inverterAir, n.inverter_temperature_air],
          [o.inverterRadiator, n.inverter_temperature_radiator]
        ].filter(([, C]) => C).map(([C, j]) => ({ label: C, value: r(j) === void 0 ? T : `${Y(r(j), 1)} °C` }))
      },
      {
        key: "life",
        label: o.life,
        value: S === void 0 ? T : o.cycles(R(S)),
        sub: f && u !== void 0 ? o.lifeSub(K(Y(u / f * 100, 1))) : s.noData,
        details: [
          { label: o.totalCharged, value: f === void 0 ? T : `${R(f)} kWh` },
          { label: o.totalDischarged, value: u === void 0 ? T : `${R(u)} kWh` }
        ]
      }
    ], E = (C) => C ? zo(this.hass, C) : void 0, k = [];
    if (n.mode && k.push({ label: o.mode, value: E(n.mode) ?? T }), n.charge_limit && k.push({ label: o.chargeLimit, value: r(n.charge_limit) === void 0 ? T : `${R(r(n.charge_limit))} A` }), n.discharge_limit && k.push({ label: o.dischargeLimit, value: r(n.discharge_limit) === void 0 ? T : `${R(r(n.discharge_limit))} A` }), n.error || n.warning) {
      const C = [b, y].filter(Boolean).join(", ");
      k.push({ label: o.errors, value: b === void 0 && y === void 0 ? T : C || o.none, warn: !!C });
    }
    return v`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${A.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${A.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${A.tone}">${A.title}</span><span class="bat-sub">${A.sub}</span></div>
        </div>
        ${D.map((C) => {
      const j = C.key !== "soh" && this._batOpen === C.key, w = j ? this.healthChart(C.key, t, i) : void 0;
      return v`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${C.key === "soh"} aria-expanded=${C.key === "soh" ? M : j ? "true" : "false"}
              @click=${() => {
        C.key !== "soh" && (this._batOpen = j ? void 0 : C.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${C.label}</span><span class="bat-sub">${C.sub}</span></span>
              <span class="bat-value">${C.value}</span>${C.word ? v`<span class="bat-word" style="color:${_}">${C.word}</span>` : M}
              ${C.key === "soh" ? M : v`<svg class="chev ${j ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${j ? v`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${i}`, 140, w)}
                  ${C.details.length ? v`<div class="bat-list">${C.details.map((z) => v`<div class="bat-line"><span>${z.label}</span><b>${z.value}</b></div>`)}</div>` : M}
                </div>` : M}
          </div>`;
    })}
        ${k.length ? v`<div class="bat-card flush"><span class="bat-cap pad">${o.diagnostics}</span><div class="bat-list pad">${k.map((C) => v`<div class="bat-line"><span>${C.label}</span><b style="color:${C.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${C.value}</b></div>`)}</div></div>` : M}`;
  }
};
function zo(a, t) {
  const e = vt(a, t)?.state;
  return e === void 0 || e === "" || e === "unavailable" || e === "unknown" ? void 0 : e;
}
const ns = (a) => typeof a == "number" && Number.isFinite(a);
function ta(a, t) {
  const e = /* @__PURE__ */ new Map();
  for (const s of a ?? []) {
    const n = s[t];
    if (!ns(n) || !ns(s.start)) continue;
    const o = new Date(s.start), i = Ht(s.start), r = e.get(i) ?? new Array(24).fill(void 0);
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
const os = (a) => Ke(a, 50);
function Rs(a, t) {
  const e = [], s = new Date(a);
  for (let n = 0; n < t; n++)
    s.setDate(s.getDate() - 1), e.push(s.getTime());
  return e;
}
function At(a, t) {
  const e = new Date(a);
  return e.setDate(e.getDate() + t), e.setHours(0, 0, 0, 0), e.getTime();
}
function Bo(a, t, e, s) {
  const n = Rs(t, e).filter((r) => a.has(r)), o = Array.from({ length: 24 }, (r, l) => {
    const h = n.map((c) => a.get(c)[l]).filter((c) => c !== void 0);
    return h.length >= 3 ? Ke(h, s) : void 0;
  }), i = n.map((r) => Ge(a.get(r), 20)).filter((r) => r !== void 0);
  return { curve: o, daily: i.length >= 3 ? Ke(i, s) : void 0, days: n.length };
}
function Ho(a) {
  const t = a.reduce((e, s) => e + (s ?? 0), 0);
  return t > 0 ? a.map((e) => (e ?? 0) / t) : void 0;
}
function Ro(a, t) {
  const e = Ho(t);
  return e ? e.map((s) => s * a) : void 0;
}
function Po(a, t, e, s) {
  const n = new Date(s), o = n.getHours(), i = 1 - (n.getMinutes() * 60 + n.getSeconds()) / 3600, r = e.map((h, c) => c < o ? 0 : c === o ? (h ?? 0) * i : h ?? 0), l = r.reduce((h, c) => h + c, 0);
  return Array.from({ length: 24 }, (h, c) => c < o ? a?.[c] : l > 0 ? r[c] / l * Math.max(0, t) : void 0);
}
function is(a, t) {
  const e = new Date(t), s = e.getHours(), n = 1 - (e.getMinutes() * 60 + e.getSeconds()) / 3600;
  return a.reduce((o, i, r) => o + (r < s ? 0 : r === s ? (i ?? 0) * n : i ?? 0), 0);
}
function No(a, t, e, s, n, o) {
  if (a === void 0) return;
  const i = new Date(s), r = i.getHours() + i.getMinutes() / 60, l = e.reduce((g, m, x) => g + (m ?? 0) * Math.min(1, Math.max(0, r - x)), 0), h = e.reduce((g, m) => g + (m ?? 0), 0);
  let c, d = "forecast";
  if (t !== void 0) {
    const g = is(e, s);
    let m = Math.min(Math.max(t - a, 0), g);
    o && o.possible >= 0.3 && (m = Math.min(m, g * Math.min(1, Math.max(0, o.actual / o.possible)))), c = a + m;
  } else if (h > 0 && l >= 0.5) {
    const g = h - l;
    c = a + g * Math.min(2, a / l), d = "pace";
  }
  if (c === void 0) return;
  const p = c > 0 ? Math.min(1, a / c) : 1, b = Math.min(0.6, n * (1 + (1 - p))), y = Math.max(0, c - a), f = h > 0 ? is(e, s) : 1 / 0;
  let u = p < 0.35 ? "low" : p < 0.7 ? "medium" : "high";
  return n > 0.3 && u !== "low" && (u = u === "high" ? "medium" : "low"), { value: c, low: a + y * (1 - b), high: a + Math.min(y * (1 + b), f), done: p, certainty: u, source: d };
}
function Io(a) {
  const t = a.filter((e) => e.actual > 0.5);
  if (!(t.length < 3))
    return t.reduce((e, s) => e + Math.abs(s.forecast - s.actual) / s.actual, 0) / t.length;
}
function Wo(a, t, e, s) {
  let n = -1, o = -1;
  for (let i = t; i <= e; i++)
    (a[i] ?? 0) >= s && (n < 0 && (n = i), o = i);
  return n < 0 ? void 0 : [n, o + 1];
}
const rs = [9, 11, 13, 15];
function Fo(a) {
  const t = rs.findIndex((e) => a < e);
  return t < 0 ? rs.length : t;
}
function Uo(a) {
  if (!a || !a.some((e) => e !== void 0)) return;
  const t = [0, 0, 0, 0, 0];
  return a.forEach((e, s) => {
    e !== void 0 && (t[Fo(s)] += e);
  }), t;
}
function Ae(a, t, e) {
  const s = new Date(a), n = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), 12), o = Math.round(n / 864e5 + 24405875e-1 - 2451545), i = Math.PI / 180, r = o - e / 360, l = (357.5291 + 0.98560028 * r) % 360, h = 1.9148 * Math.sin(l * i) + 0.02 * Math.sin(2 * l * i) + 3e-4 * Math.sin(3 * l * i), c = (l + h + 180 + 102.9372) % 360, d = 2451545 + r + 53e-4 * Math.sin(l * i) - 69e-4 * Math.sin(2 * c * i), p = Math.sin(c * i) * Math.sin(23.4397 * i), b = Math.cos(Math.asin(p)), y = (Math.sin(-0.833 * i) - Math.sin(t * i) * p) / (Math.cos(t * i) * b);
  if (y < -1 || y > 1) return;
  const f = Math.acos(y) / i, u = (g) => (g - 24405875e-1) * 864e5;
  return { rise: u(d - f / 360), set: u(d + f / 360) };
}
function Vo(a) {
  const { capacity: t, efficiency: e } = a;
  let s = a.soc / 100 * t;
  const n = a.reserve / 100 * t, o = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let i = Math.ceil(a.now / (Q / 4)) * (Q / 4);
  const r = Ht(a.now), l = r + a.eveningHour * Q, h = At(r, 1) + a.morningHour * Q;
  let c = !1, d = s >= t - 0.01;
  for (; i <= h; i += Q / 4) {
    !o.socAtEvening && i >= l && a.now < l && (o.socAtEvening = s / t * 100);
    const p = new Date(i - 1).getHours(), b = i - 1 < At(r, 1), y = b ? (a.sun[p] ?? 0) / 4 : 0, f = (a.house[p] ?? 0) / 4;
    i <= l && (o.sunUntilEvening += y, o.houseUntilEvening += f);
    const u = s / t * 100;
    let g = 0;
    a.car && b && (c && u <= a.car.stopSoc ? c = !1 : !c && u >= a.car.startSoc && y * 4 * 1e3 >= a.car.minSun && (c = !0), g = c ? a.car.watts / 1e3 / 4 : 0);
    const m = f + g, x = Math.min(y, m), _ = y - x, $ = m - x;
    if (g > 0 && (o.carTotal += g, o.carSun += Math.min(g, Math.max(0, y - f))), _ > 0)
      s = Math.min(t, s + _ * e);
    else if ($ > 0) {
      const O = Math.max(0, s - n) * e, A = Math.min($, O);
      s -= A / e;
    }
    !d && s >= t - 0.01 && o.fullAt === void 0 && i < l && (o.fullAt = i), s >= t - 0.01 && (d = !0), i >= h && (o.socAtMorning = s / t * 100);
  }
  return o;
}
function Go(a, t, e = 8) {
  const s = t.length;
  if (s === 0) return [];
  if (s === 1) return [[a[0], t[0]]];
  const n = Array.from({ length: s - 1 }, (r, l) => (t[l + 1] - t[l]) / (a[l + 1] - a[l])), o = [n[0], ...Array.from({ length: s - 2 }, (r, l) => n[l] * n[l + 1] <= 0 ? 0 : 2 * n[l] * n[l + 1] / (n[l] + n[l + 1])), n[s - 2]], i = [];
  for (let r = 0; r < s - 1; r++) {
    const l = a[r + 1] - a[r];
    for (let h = 0; h < e; h++) {
      const c = h / e, d = 2 * c ** 3 - 3 * c ** 2 + 1, p = c ** 3 - 2 * c ** 2 + c, b = -2 * c ** 3 + 3 * c ** 2, y = c ** 3 - c ** 2;
      i.push([a[r] + c * l, d * t[r] + p * l * o[r] + b * t[r + 1] + y * l * o[r + 1]]);
    }
  }
  return i.push([a[s - 1], t[s - 1]]), i;
}
function Ko(a, t, e, s) {
  const n = Rs(t, e).map((o) => Ge(a.get(o), 20)).filter((o) => o !== void 0);
  return n.length >= 3 ? Ke(n, s) : void 0;
}
const Zo = 5 * 6e4, Yo = 30 * 6e4, we = 12, ie = 2, ls = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)"
], ds = ["7d", "30d"], ea = { "7d": 7, "30d": 30 }, qo = (a) => class extends a {
  constructor() {
    super(...arguments), this._sunWeatherBusy = !1;
  }
  // ----------------------------------------------------------------- state and history
  sunRange(t) {
    if (this._sunRange) return this._sunRange;
    try {
      const e = localStorage.getItem(qa);
      if (e && ds.includes(e)) return e;
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
    const n = t.entities, o = (...l) => l.filter((h) => !!h), i = Ht(s);
    if (e === "sun:five")
      return [{ part: "power", ids: o(n.pv.power), start: At(i, -10), end: s, period: "5minute", types: ["mean"] }];
    const r = At(i, -(Math.max(30, t.num.forecast.learn_days) + t.num.forecast.learn_days + 1));
    return [
      { part: "energy", ids: o(n.pv.total_generation), start: r, end: s, period: "hour", types: ["change"] },
      { part: "power", ids: o(n.pv.power), start: r, end: s, period: "hour", types: ["mean", "max"] },
      { part: "house", ids: o(n.house.power), start: At(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] },
      { part: "forecast", ids: o(n.forecast.energy_today), start: At(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] }
    ];
  }
  loadSun() {
    const t = this._config;
    if (!(!t || !this.hass)) {
      for (const e of this.sunNeeds()) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < Zo) || this.fetchSun(t, e, s);
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
      await Promise.all(i.map(async (l) => r[l.part] = await Ft(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: o, parts: {} } };
    }
  }
  /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
  async loadWeather(t) {
    const e = t.entities.forecast.weather, s = this.hass;
    if (!e || !s || this._sunWeatherBusy || this._sunWeather && Date.now() - this._sunWeather.at < Yo) return;
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
      this._sunWeather = { at: n, days: i.filter((r) => r.datetime).map((r) => ({ day: Ht(Date.parse(r.datetime)), condition: r.condition })) };
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
    const e = Date.now(), s = Ht(e), n = t.num.forecast, o = this._batData["sun:hist"], i = this._batData["sun:five"], r = t.entities;
    let l = /* @__PURE__ */ new Map(), h = new Array(24).fill(void 0), c = [];
    if (o && Object.keys(o.parts).length) {
      if (this._sunCache?.entry !== o) {
        const P = r.pv.total_generation ? o.parts.energy?.[r.pv.total_generation] : void 0;
        let L = ta(P, "change");
        L.size || (L = ta(r.pv.power ? o.parts.power?.[r.pv.power] : void 0, "mean"));
        const q = ta(r.house.power ? o.parts.house?.[r.house.power] : void 0, "mean"), kt = Array.from({ length: 24 }, (lt, Bt) => {
          const se = [...q.entries()].filter(([Kt]) => Kt < s).map(([, Kt]) => Kt[Bt]).filter((Kt) => Kt !== void 0);
          return se.length >= 3 ? os(se) : void 0;
        }), bt = ((r.forecast.energy_today ? o.parts.forecast?.[r.forecast.energy_today] : void 0) ?? []).filter((lt) => typeof lt.mean == "number" && new Date(lt.start).getHours() === 8).map((lt) => ({ day: Ht(lt.start), forecast: lt.mean, actual: Ge(L.get(Ht(lt.start)), 20) })).filter((lt) => lt.actual !== void 0 && lt.day < s);
        this._sunCache = { entry: o, days: L, houseCurve: kt, pairs: bt };
      }
      l = this._sunCache.days, h = this._sunCache.houseCurve, c = this._sunCache.pairs;
    }
    const d = Bo(l, s, n.learn_days, n.possible_percentile), p = r.pv.power ? i?.parts.power?.[r.pv.power] : void 0;
    let b = l.get(s);
    if (p?.length) {
      const P = new Array(24).fill(void 0);
      for (const L of p) {
        if (L.start < s || typeof L.mean != "number") continue;
        const q = new Date(L.start).getHours();
        P[q] = (P[q] ?? 0) + Math.max(0, L.mean) / 1e3 / we;
      }
      b = P;
    }
    const f = Jt(this.hass, t.entities.daily.pv_generation) ?? (b && b.some((P) => P !== void 0) ? b.reduce((P, L) => P + (L ?? 0), 0) : void 0), u = Jt(this.hass, r.forecast.energy_today), g = new Date(e), m = g.getHours() + g.getMinutes() / 60, x = d.curve.some((P) => P !== void 0) ? d.curve.reduce((P, L, q) => P + (L ?? 0) * st(m - q, 0, 1), 0) : void 0, _ = Io(c) ?? n.typical_deviation / 100;
    let $;
    if (p?.length) {
      let P = 0, L = 0;
      for (const q of p)
        q.start < e - Q || q.start >= e || typeof q.mean != "number" || (P += Math.max(0, q.mean) / 1e3 / we, L += (d.curve[new Date(q.start).getHours()] ?? 0) / we);
      $ = { actual: P, possible: L };
    }
    const O = No(f, u, d.curve, e, _, $), A = O ? Math.max(0, O.value - (f ?? 0)) : 0, S = Po(b, O ? A : 0, d.curve, e);
    if (!O) for (let P = new Date(e).getHours(); P < 24; P++) S[P] = void 0;
    const D = this.place(), E = D ? Ae(s, D.latitude, D.longitude) : void 0, k = t.num.flows.idle_threshold, C = (p ?? []).filter((P) => P.start >= s && typeof P.mean == "number"), j = C.filter((P) => P.mean >= k), w = j.length ? j[0].start : void 0, z = C.reduce((P, L) => !P || L.mean > P.mean ? L : P, void 0);
    let tt;
    if (E) {
      const P = [];
      for (const _t of [...new Set((p ?? []).map((bt) => Ht(bt.start)))].filter((bt) => bt < s)) {
        const bt = (p ?? []).filter((Bt) => Ht(Bt.start) === _t && Bt.mean >= k).pop(), lt = D ? Ae(_t, D.latitude, D.longitude) : void 0;
        bt && lt && P.push(lt.set - (bt.start + 5 * 6e4));
      }
      const L = P.length >= 3 ? os(P) : 0, q = j.length ? j[j.length - 1].start + 5 * 6e4 : void 0;
      tt = e > E.set && (q === void 0 || e - q > 15 * 6e4) && q !== void 0 ? { at: q, over: !0 } : { at: E.set - L, over: !1 };
    }
    return {
      now: e,
      today: s,
      ready: !!o && o.status !== "loading" || !!o?.parts && Object.keys(o.parts).length > 0,
      days: l,
      learned: d,
      done: f,
      possibleSoFar: x,
      forecastToday: u,
      deviation: _,
      pairs: c,
      estimate: O,
      hours: S,
      rise: E?.rise,
      set: E?.set,
      started: w,
      ends: tt,
      fiveRows: p,
      peak: z ? { kw: z.mean / 1e3, at: z.start } : void 0,
      houseCurve: h
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
    return v`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${s ? "true" : "false"} @click=${() => {
      this._sunHint = s ? void 0 : t;
    }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${s ? v`<div class="sun-note" role="note" @click=${() => {
      this._sunHint = void 0;
    }}>${e}</div>` : M}`;
  }
  /** A ring with the number centred in it and the unit under the number: the shared ring of the kit (`<ed-ring>`). */
  ring(t, e, s, n, o, i) {
    return v`<ed-ring fraction=${t} size=${e} stroke=${s} num=${n} unit=${o} label=${i}></ed-ring>`;
  }
  /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
  renderSoFar(t) {
    const e = this.t.sun, s = t.estimate, n = s && t.done !== void 0 && s.value > 0 ? Math.min(100, Math.round(t.done / s.value * 100)) : void 0, o = t.done !== void 0 && t.possibleSoFar !== void 0 && t.possibleSoFar >= 0.3 ? Math.round(t.done / t.possibleSoFar * 100) : void 0;
    return v`<div class="sun-sofar">
        <div class="text"><span class="sub">${e.soFar}</span><span class="val">${t.done === void 0 ? T : `${at(t.done)} kWh`}</span><span class="sub">${s ? e.ofEstimate(at(s.value)) : T}</span>${o === void 0 ? M : v`<span class="sub">${e.ofPossibleSoFar(K(o))}</span>`}</div>
        ${n === void 0 ? M : this.ring(n / 100, 40, 6, String(n), "", e.ringLabel(K(n)))}
      </div>`;
  }
  /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
  renderSunFlow(t, e, s) {
    const n = this.t, o = e.num.flows.idle_threshold, i = fe.map((l) => ({ sink: l, watts: t.flows.filter((h) => h.from === "sun" && h.to === l).reduce((h, c) => h + c.watts, 0) })).filter((l) => ot(l.watts, o));
    if (!i.length) return v`<p class="bat-sub">${t.sun === void 0 ? T : n.sun.flowNone}</p>`;
    const r = "kW";
    return v`<div class="mix-bar sun-bar ${s ? "large" : ""}" role="img" aria-label=${i.map((l) => `${n.tile[l.sink]} ${nt(l.watts, r)}`).join(", ")}>${i.map((l) => v`<div style="flex:${l.watts.toFixed(0)} 1 0;background:var(${ce[l.sink]})"></div>`)}</div>
        ${s ? v`<div class="sun-legend" role="group" aria-label=${n.sun.flowTitle}>${i.map((l) => v`<span><span class="name"><i style="background:var(${ce[l.sink]})"></i>${n.tile[l.sink]}</span><b>${nt(l.watts, r)}</b></span>`)}</div>` : M}`;
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
    const e = t.entities.forecast.weather, s = this.weatherGroup(e ? vt(this.hass, e)?.state : void 0);
    return s ? this.t.sun.weather[s] : void 0;
  }
  // ----------------------------------------------------------------- popup
  renderSunPopup(t, e, s, n) {
    const o = this.t, i = this.sunView(e), r = ot(s.sun, e.num.flows.idle_threshold), l = this.weatherNow(e), h = r ? l ? o.sun.producingWith(l) : o.sun.producing : s.sun === void 0 ? T : o.idle.sun;
    return v`<ed-sheet open .heading=${t.name} .sub=${h} .closeLabel=${o.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop sun-pop">
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${o.sun.powerNow}</span><span class="pop-big">${s.sun === void 0 ? T : nt(s.sun, n === "W" && s.sun >= e.num.flows.kw_from ? "kW" : n)}</span></div>
          ${r ? this.renderSunFlow(s, e, !1) : M}
        </div>
        ${this.renderSoFar(i)}
        <div class="pop-rows">
          <div class="pop-row"><span>${o.sun.started}</span><b>${i.started === void 0 ? T : it(i.started)}</b></div>
          <div class="pop-row"><span>${i.ends?.over ? o.sun.ended : o.sun.ends}</span><b>${i.ends === void 0 ? T : it(i.ends.at)}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openSunDetail()}><span>${o.sun.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- the detail
  renderSunDetail(t, e) {
    const s = this.t, n = ["today", "hist", "outlook"].map((i) => ({ value: i, label: s.sun.tabs[i] })), o = this.sunView(t);
    return v`<section class="bat-detail sun-detail" role="dialog" aria-modal="true" aria-label=${s.sun.detailLabel} tabindex="-1">
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
    if (!t.entities.pv.power || !e.fiveRows?.some((L) => L.start >= e.today)) return;
    const n = this.t.sun, o = e.rise !== void 0 ? st(Math.floor(this.hourOf(e.rise) - 0.5), 0, 22) : 6, i = e.set !== void 0 ? st(Math.ceil(this.hourOf(e.set) + 0.5), o + 2, 24) : 18, r = (i - o) * we, l = e.today + o * Q, h = e.today + i * Q, c = (L) => N(ie + L / (r - 1) * (U - ie)), d = Tt(e.fiveRows, "mean", l, h, r).map((L) => L === void 0 ? void 0 : L / 1e3), p = (L) => o + (L + 0.5) / we, b = Math.floor((e.now - l) / (h - l) * r), y = F(this.hass, t.entities.pv.power);
    y !== void 0 && d.some((L) => L !== void 0) && b >= 0 && b < r && (d[b] = Math.max(0, y) / 1e3);
    const f = (L, q) => {
      const kt = q - 0.5, _t = Math.floor(kt), bt = L[_t], lt = L[_t + 1];
      if (bt === void 0 && lt === void 0) return;
      const Bt = kt - _t;
      return (bt ?? 0) * (1 - Bt) + (lt ?? 0) * Bt;
    }, u = e.learned.curve.some((L) => L !== void 0), g = Array.from({ length: r }, (L, q) => u ? f(e.learned.curve, p(q)) : void 0), m = e.estimate, x = m ? Math.max(0, m.value - (e.done ?? 0)) : 0, _ = m && x > 0 ? (m.low - (e.done ?? 0)) / x : 1, $ = m && x > 0 ? (m.high - (e.done ?? 0)) / x : 1, O = (L) => L >= b, A = Array.from({ length: r }, (L, q) => m && O(q) ? f(e.hours.map((kt, _t) => _t >= new Date(e.now).getHours() ? kt : void 0), p(q)) : void 0), S = A.map((L) => L === void 0 ? void 0 : L * _), D = A.map((L, q) => L === void 0 ? void 0 : Math.min(L * $, Math.max(L, g[q] ?? 1 / 0))), E = Math.max(1, ...d.map((L) => L ?? 0), ...g.map((L) => L ?? 0), ...D.map((L) => L ?? 0)), k = { start: l, end: h, x0: ie, x1: U }, C = 150, j = Hs(E, Math.round((C - 12) / Bs(xa(k)))), w = Math.ceil(E / j) * j, z = (L) => N(C - st(L, 0, w) / w * (C - 12)), tt = (L) => nt(L * 1e3, "kW"), P = Array.from({ length: Math.round(w / j) }, (L, q) => (q + 1) * j);
    return {
      id: "sun-today",
      h: 170,
      n: r,
      x: c,
      fade: 0,
      start: st(b / (r - 1) * 100, 0, 100),
      grid: [{ y: C, strong: !0 }, ...P.map((L) => ({ y: z(L) }))],
      labels: [...P.map((L) => ({ y: z(L), text: R(L, L % 1 ? 1 : 0) })), { y: C, text: "0" }],
      body: V`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${js(S, D, c, z)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${he(g, c, z)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${Ve(d, c, z, C)} fill="url(#sun-area)"></path>
          <path d=${he(d, c, z)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (L) => d[L] === void 0 ? void 0 : { y: z(d[L]), color: "var(--ed-sun)" },
      read: (L) => {
        const q = it(l + (L + 0.5) * ((h - l) / r)), kt = [d[L] !== void 0 ? tt(d[L]) : A[L] !== void 0 ? `${n.chartLegend.forecast.toLowerCase()} ≈ ${tt(A[L])}` : T];
        return g[L] !== void 0 && kt.push(`${n.possibleShort} ${tt(g[L])}`), `${q} · ${kt.join(" · ")}`;
      },
      time: k,
      from: it(l),
      to: it(h),
      legend: v`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-sun)"></i>${n.chartLegend.production}</span><span><i class="dots" aria-hidden="true"></i>${n.chartLegend.possible}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.3"></i>${n.chartLegend.forecast}</span></div>`
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
    ].filter((h) => h.kwh > 5e-3);
  }
  renderSunToday(t, e, s) {
    const n = this.t, o = "kW", i = this.todayChart(t, s), r = this.whereToday(t), l = r?.reduce((c, d) => c + d.kwh, 0) ?? 0, h = e.sun === void 0 ? T : nt(e.sun, o);
    return v`<div class="bat-card">
          <span class="bat-cap">${n.sun.powerNow}</span>
          <span class="bat-huge">${h}</span>
          ${ot(e.sun, t.num.flows.idle_threshold) ? this.renderSunFlow(e, t, !0) : M}
        </div>
        <div class="bat-card rel">
          <div class="bat-card-bar"><span class="sun-title">${n.sun.chartTitle}</span><span class="sun-unit">${n.sun.chartUnit}${this.hint("chart", n.sun.hints.chart)}</span></div>
          ${this.renderChartOrEmpty("sun:five", 170, i)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi sun-kpi-ring">${this.renderSoFar(s)}</div>
          <div class="bat-kpi"><span class="sub">${n.sun.peakToday}</span><span class="val">${s.peak ? nt(s.peak.kw * 1e3, o) : T}</span><span class="sub">${s.peak ? n.sun.at(it(s.peak.at)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${n.sun.startedLong}</span><span class="val">${s.started === void 0 ? T : it(s.started)}</span><span class="sub">${s.rise === void 0 ? "" : n.sun.sunrise(it(s.rise))}</span></div>
          <div class="bat-kpi"><span class="sub">${s.ends?.over ? n.sun.ended : n.sun.ends}</span><span class="val">${s.ends === void 0 ? T : it(s.ends.at)}</span><span class="sub">${s.set === void 0 ? "" : n.sun.sunset(it(s.set))}</span></div>
        </div>
        ${r ? v`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.sun.whereTitle}</span>${this.hint("where", n.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${r.map((c) => v`<div style="flex:${c.kwh.toFixed(3)} 1 0;background:var(${ce[c.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${n.sun.whereTitle}>${r.map((c) => v`<span><span class="name"><i style="background:var(${ce[c.key]})"></i>${n.tile[c.key]}</span><b>${at(c.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${l > 0 ? n.sun.whereUnit : T}</span>
            </div>` : M}`;
  }
  // ----------------------------------------------------------------- Historie
  renderSunRange(t) {
    const e = this.t.sun.hist, s = ds.map((n) => ({ value: n, label: e.ranges[n] }));
    return v`<ed-segmented .options=${s} .value=${this.sunRange(t)} label=${e.rangeLabel} @hdk-select=${(n) => this.setSunRange(n.detail.value)}></ed-segmented>`;
  }
  /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
  rangeDays(t, e, s = 0) {
    const n = ea[e];
    return Array.from({ length: n }, (o, i) => At(t.today, -(n - i) - s));
  }
  /** The production by day of the range: the totals, the blocks of the day and what was possible. */
  histData(t, e, s) {
    const n = t.num.forecast;
    return this.rangeDays(e, s).map((i) => {
      const r = e.days.get(i), l = Ge(r, 20);
      return { day: i, hours: r, total: l, blocks: l === void 0 ? void 0 : Uo(r), possible: Ko(e.days, i, n.learn_days, n.possible_percentile) };
    });
  }
  histChart(t, e, s) {
    const n = this.t.sun.hist, o = this.histData(t, e, s);
    if (!o.some((u) => u.total !== void 0)) return;
    const i = o.length, r = (U - ie) / i, l = (u) => N(ie + u * r + r / 2), h = Math.max(1, ...o.map((u) => Math.max(u.total ?? 0, u.possible ?? 0))), c = me(h), d = 150, p = (u) => N(d - st(u, 0, c) / c * (d - 14)), b = this._sunMode === "parts";
    let y;
    if (b) {
      const u = o.map((S, D) => l(D)), g = o.map((S) => S.blocks), m = g.map((S, D) => S ? D : -1).filter((S) => S >= 0), x = m.map((S) => g[S].reduce((D, E) => [...D, D[D.length - 1] + E], [0])), _ = Array.from({ length: 6 }, (S, D) => Go(m.map((E) => u[E]), x.map((E) => p(E[D])))), $ = (S) => S.map(([D, E]) => `${N(D)},${N(E)}`).join(" "), O = o.map((S) => S.possible), A = O.some((S) => S !== void 0) ? Ve(O, l, p, d) : "";
      y = V`<path d=${A} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((S) => V`<polygon points=${`${$(_[S + 1])} ${$([..._[S]].reverse())}`} style="fill:${ls[S]}"></polygon>`)}
          ${[1, 2, 3, 4].map((S) => V`<polyline points=${$(_[S])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
    } else {
      const u = Math.min(s === "7d" ? 26 : 7, r - 3);
      y = V`${o.map((g, m) => V`
          ${g.possible === void 0 ? M : V`<rect x=${N(l(m) - u / 2)} y=${p(g.possible)} width=${u} height=${N(d - p(g.possible))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${g.total === void 0 ? M : V`<rect x=${N(l(m) - u / 2)} y=${p(g.total)} width=${u} height=${N(Math.max(1, d - p(g.total)))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${g.total !== void 0 && s === "7d" ? V`<text x=${l(m)} y=${p(g.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${Y(g.total, 1)}</text>` : M}`)}`;
    }
    const f = b ? v`<div class="sun-blocks" role="group">${n.blocks.map((u, g) => v`<span><i style="background:${ls[g]}"></i><span>${u}</span></span>`)}</div>` : v`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${n.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${n.possible}</span></div>`;
    return {
      id: `sun-hist-${b ? "parts" : "total"}`,
      h: 170,
      n: i,
      x: l,
      fade: 0,
      grid: [{ y: d, strong: !0 }, { y: p(c / 2) }, { y: p(c) }],
      labels: [{ y: p(c), text: R(c) }, { y: p(c / 2), text: R(c / 2, c / 2 % 1 ? 1 : 0) }, { y: d, text: "0" }],
      time: { start: o[0].day, end: o[i - 1].day + Rt, x0: ie, x1: U, slot: Rt },
      valueNum: (u) => (d - u) / (d - 14) * c,
      valueAt: (u) => R((d - u) / (d - 14) * c, (d - u) / (d - 14) * c % 1 ? 1 : 0),
      body: y,
      dot: (u) => o[u].total === void 0 ? void 0 : { y: p(o[u].total), color: "var(--ed-sun)" },
      read: (u) => {
        const g = o[u], m = _e(g.day);
        if (g.total === void 0) return `${m} · ${T}`;
        if (b && g.blocks) {
          const x = g.blocks.indexOf(Math.max(...g.blocks));
          return `${m} · ${Y(g.total, 1)} kWh · ${n.mostIn(n.blocks[x])}`;
        }
        return `${m} · ${Y(g.total, 1)} kWh${g.possible ? ` · ${n.ofPossible(K(Math.round(g.total / g.possible * 100)))}` : ""}`;
      },
      from: "",
      to: "",
      legend: f
    };
  }
  /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
  eastWest(t) {
    const e = this.t.sun.hist, s = 46, n = (r, l, h) => {
      const c = (d) => `${N(70 + s * Math.cos(d * Math.PI / 180))},${N(64 - s * Math.sin(d * Math.PI / 180))}`;
      return V`<path d="M${c(r)} A${s},${s} 0 0 1 ${c(l)}" fill="none" style="stroke:${h}" stroke-width="10"></path>`;
    }, o = 180 - 180 * t, i = Math.round(t * 100);
    return v`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${e.eastWestLabel(K(i), K(100 - i))}>${n(180, o + 1.5, "var(--ed-warning)")}${n(o - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${K(i)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${K(100 - i)}</span></div>`;
  }
  renderSunHistory(t, e) {
    const s = this.t.sun, n = t.num.forecast, o = this.sunRange(t), i = this.histData(t, e, o), r = i.filter((w) => w.total !== void 0), l = !e.ready, h = r.reduce((w, z) => w + z.total, 0);
    i.reduce((w, z) => w + (z.possible ?? 0), 0);
    const c = r.filter((w) => w.possible !== void 0), d = c.length ? Math.round(c.reduce((w, z) => w + z.total, 0) / c.reduce((w, z) => w + z.possible, 0) * 100) : void 0, p = this.histChart(t, e, o), b = ["total", "parts"].map((w) => ({ value: w, label: s.hist.modes[w] })), y = r.reduce((w, z) => !w || z.total > w.total ? z : w, void 0), f = r.reduce((w, z) => !w || z.total < w.total ? z : w, void 0), u = (w) => s.hist.dayOfPossible(_e(w.day), w.possible ? K(Math.round(w.total / w.possible * 100)) : T), g = t.entities, m = g.pv.power && this._batData["sun:hist"]?.parts.power?.[g.pv.power] || [], x = i[0]?.day ?? e.today, _ = m.filter((w) => w.start >= x && w.start < e.today && typeof w.max == "number").reduce((w, z) => !w || z.max > w.max ? z : w, void 0), $ = (w) => {
      const z = w.map((tt) => tt.hours ? tt.hours.filter((P) => (P ?? 0) >= 0.05).length : void 0).filter((tt) => tt !== void 0);
      return z.length ? z.reduce((tt, P) => tt + P, 0) / z.length : void 0;
    }, O = $(i), A = $(this.rangeDays(e, o, ea[o]).map((w) => ({ hours: e.days.get(w) }))), S = e.rise !== void 0 && e.set !== void 0 ? this.hourOf((e.rise + e.set) / 2) : 12;
    let D = 0, E = 0;
    for (const w of r) w.hours?.forEach((z, tt) => {
      z && (tt + 0.5 < S ? D += z : E += z);
    });
    const k = D + E > 0 ? D / (D + E) : void 0, C = r.filter((w) => w.total > n.good_day).length, j = e.pairs.slice(-7);
    return v`${this.renderSunRange(t)}
        <div class="bat-card">
          <span class="bat-cap">${s.hist.last(ea[o])}</span>
          <span class="bat-huge sun-huge">${r.length ? `${Y(h, 1)} kWh` : T}</span>
          <span class="bat-sub">${r.length ? Lt([...d === void 0 ? [] : [v`<b class="sun-yellow">${s.hist.ofPossible(K(d))}</b>`], s.hist.average(`${Y(h / r.length, 1)} kWh`)]) : T}</span>
        </div>
        <div class="bat-card">
          <div class="bat-card-bar sun-mode"><span class="sun-title">${s.hist.chartTitle}</span>
            <ed-segmented compact .options=${b} .value=${this._sunMode} label=${s.hist.modeLabel} @hdk-select=${(w) => {
      this._sunMode = w.detail.value;
    }}></ed-segmented>
          </div>
          ${this.renderChartOrEmpty("sun:hist", 170, p)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${s.hist.best}</span><span class="val">${y ? `${Y(y.total, 1)} kWh` : T}</span><span class="sub">${y ? Pt(u(y)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.worst}</span><span class="val">${f ? `${Y(f.total, 1)} kWh` : T}</span><span class="sub">${f ? Pt(u(f)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.peak}</span><span class="val">${_ ? nt(_.max, "kW") : T}</span><span class="sub">${_ ? `${_e(_.start)} ${s.at(it(_.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.length}</span><span class="val">${O === void 0 ? T : s.hist.lengthValue(Y(O, 1))}</span><span class="sub">${A === void 0 ? "" : (o === "7d" ? s.hist.before7 : s.hist.before30)(Y(A, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${s.hist.eastWest}</span>${k === void 0 ? v`<span class="bat-sub">${T}</span>` : this.eastWest(k)}</div>
          <div class="bat-card"><span class="bat-cap">${s.hist.goodDays}</span><span class="val big">${r.length ? s.hist.goodOf(C, r.length) : T}</span><span class="bat-sub">${s.hist.over(R(n.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${r.map((w) => v`<i class=${w.total > n.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${j.length >= 3 ? this.renderAccuracy(j, e) : M}`;
  }
  renderAccuracy(t, e) {
    const s = this.t.sun, n = me(Math.max(...t.flatMap((h) => [h.forecast, h.actual]))), o = 310, i = 60, r = 14, l = o / t.length;
    return v`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${s.hist.accuracyTitle}</span>${this.hint("acc", s.hints.acc)}</div>
        <div class="sun-acc"><b>±${K(Math.round(e.deviation * 100))}</b><span class="bat-sub">${s.hist.accuracyAverage(e.pairs.length)}</span></div>
        <svg viewBox="0 0 ${o + Vt} 80" class="sun-pairs" role="img" aria-label=${s.hist.accuracyLabel}>
          ${Array.from({ length: t.length + 1 }, (h, c) => V`<line x1=${N(c * l)} y1="0" x2=${N(c * l)} y2=${i} class="grid"></line>`)}
          <line x1="0" y1=${i - 25} x2=${o} y2=${i - 25} class="grid"></line>
          <line x1="0" y1=${i - 50} x2=${o} y2=${i - 50} class="grid"></line>
          <text x=${o + 5} y=${i - 46} style="fill:var(--ed-secondary)" font-size="12">${R(n)} kWh</text>
          <text x=${o + 5} y=${i - 21} style="fill:var(--ed-secondary)" font-size="12">${R(n / 2, n / 2 % 1 ? 1 : 0)}</text>
          <text x=${o + 5} y=${i + 4} style="fill:var(--ed-secondary)" font-size="12">0</text>
          <line x1="0" y1=${i} x2=${o} y2=${i} class="axis"></line>
          ${t.map((h, c) => {
      const d = c * l + (l - 2 * r - 2) / 2, p = (b) => N(b / n * 50);
      return V`<rect x=${N(d)} y=${N(i - p(h.forecast))} width=${r} height=${p(h.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${N(d + r + 2)} y=${N(i - p(h.actual))} width=${r} height=${p(h.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${N(d + r + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(h.day)}</text>`;
    })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${s.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${s.hist.actual}</span></div>
      </div>`;
  }
  // ----------------------------------------------------------------- Výhled
  renderSunOutlook(t, e) {
    const s = this.t.sun, n = s.outlook, o = t.num.forecast, i = t.entities, r = e.estimate, l = o.good_power / 1e3, h = `${Y(o.good_power / 1e3, o.good_power % 1e3 ? 1 : 0)} kW`, c = r && e.done !== void 0 && r.value > 0 ? Math.min(100, Math.round(e.done / r.value * 100)) : void 0, d = r ? { low: 1, medium: 2, high: 3 }[r.certainty] : 0, p = [i.forecast.energy_today, i.forecast.energy_tomorrow, i.forecast.energy_day_2, i.forecast.energy_day_3, i.forecast.energy_day_4], b = this._sunWeather?.days ?? [], y = p.map((k, C) => {
      const j = At(e.today, C), w = C === 0 ? r?.value : Jt(this.hass, k), z = C === 0 ? e.hours : w === void 0 ? void 0 : Ro(w, e.learned.curve), tt = C === 0 ? this.weatherGroup(i.forecast.weather ? vt(this.hass, i.forecast.weather)?.state : void 0) : this.weatherGroup(b.find((P) => P.day === j)?.condition);
      return { i: C, day: j, kwh: w, hours: z, condition: tt };
    }).filter((k) => k.kwh !== void 0 || k.i === 0), f = y.filter((k) => k.kwh !== void 0), u = (k) => k ? Wo(k, o.strip_from, o.strip_to, l) : void 0, g = f.filter((k) => k.i > 0 || f.length === 1).reduce((k, C) => !k || C.kwh > k.kwh ? C : k, void 0), m = g ? u(g.hours) : void 0, x = this.place(), _ = x ? Ae(e.today, x.latitude, x.longitude) : void 0, $ = x ? Ae(At(e.today, 1), x.latitude, x.longitude) : void 0, O = _ ? Math.round((_.set - _.rise) / 6e4) : void 0, A = _ && $ ? Math.round(($.set - $.rise - (_.set - _.rise)) / 6e4) : void 0, S = this.evening(t, e), D = Array.from({ length: o.strip_to - o.strip_from + 1 }, (k, C) => o.strip_from + C), E = new Date(e.now).getHours();
    return v`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${n.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${r ? `${at(r.value)} kWh` : T}</span>
              <span class="bat-sub">${r ? n.between(at(r.low), at(r.high)) : ""}</span>
              ${r ? v`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((k) => v`<i class=${k <= d ? "on" : ""}></i>`)}</span><b>${n.certainty[r.certainty]}</b>${this.hint("conf", s.hints.conf)}</span>` : M}
            </div>
            ${c === void 0 ? M : this.ring(c / 100, 76, 8, String(c), "", s.ringLabel(K(c)))}
          </div>
        </div>
        ${y.length > 1 ? v`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.fiveTitle}</span>${this.hint("five", s.hints.five(h))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${D.map((k) => v`<span>${k % 3 === 0 ? k : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${y.map((k) => {
      const C = u(k.hours);
      return v`<div class="sun-five-row">
                    <span class="day"><b>${k.i === 0 ? n.today : de(k.day)}</b><span>${k.condition ? s.weather[k.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${D.map((j) => {
        const w = k.hours?.[j], z = w === void 0 ? "none" : w >= l ? "strong" : w >= l * 0.35 ? "mid" : w >= l * 0.075 ? "faint" : "none";
        return v`<i class="${z} ${k.i === 0 && j === E ? "now" : ""}"></i>`;
      })}</span>
                    <span class="end"><b>${k.kwh === void 0 ? T : `${k.i ? "≈ " : ""}${at(k.kwh)}`}</b><span class=${C ? "" : "off"}>${k.kwh === void 0 ? "" : C ? n.window(C[0], C[1]) : n.below(h)}</span></span>
                  </div>`;
    })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${n.strong(h)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${n.weak}</span></div>
            </div>` : M}
        ${S ? v`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.eveningTitle}</span>${this.hint("eve", s.hints.eve)}</div>
              <div class="bat-list">${S.map((k) => v`<div class="bat-line sun-line"><span><i style="background:var(${k.color})"></i>${k.label}</span><b>${Pt(k.value)}</b></div>`)}
              </div>
            </div>` : M}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${n.dayLength}</span><span class="val">${O === void 0 ? T : n.hoursMinutes(Math.floor(O / 60), O % 60)}</span><span class="sub">${A === void 0 ? "" : n.dayChange(A)}</span></div>
          <div class="bat-kpi"><span class="sub">${n.bestDay}</span><span class="val">${g ? g.i === 0 ? n.today : de(g.day) : T}</span><span class="sub">${g ? Pt(n.bestSub(at(g.kwh), m ? n.window(m[0], m[1]) : "")) : ""}</span></div>
        </div>`;
  }
  /** kWh per km of the car, from its charge, the capacity and the range it reports; undefined when it reports none of them. */
  carKwhPerKm(t) {
    const e = F(this.hass, t.entities.car.state_of_charge), s = F(this.hass, t.entities.car.range), n = F(this.hass, t.entities.car.capacity);
    if (!(e === void 0 || s === void 0 || n === void 0 || e < 5 || s < 5 || n <= 0))
      return n * e / 100 / s;
  }
  /** The rows of "Dnes do večera": the battery full, its level in the evening, the car from the sun, the grid at night; none without the data it needs. */
  evening(t, e) {
    const s = t.num.forecast, n = t.entities, o = F(this.hass, n.battery.state_of_charge), i = this.sunHouseCurve();
    if (o === void 0 || !i.some((d) => d !== void 0) || !e.estimate) return;
    const r = Vo({
      now: e.now,
      soc: o,
      capacity: t.num.battery.capacity,
      reserve: this.batteryReserve(t),
      sun: e.hours,
      house: i,
      efficiency: s.efficiency / 100,
      eveningHour: s.evening_hour,
      morningHour: s.morning_hour,
      car: n.wallbox.power && ks(ct(this.hass, n.wallbox.status)) !== "disconnected" ? { startSoc: s.car_start_soc, stopSoc: s.car_stop_soc, minSun: s.car_min_sun, watts: t.num.wallbox.power_min } : void 0
    }), l = this.t.sun.outlook, h = [], c = it(e.today + s.evening_hour * Q);
    if (r.socAtEvening !== void 0 && (h.push({ color: "--ed-battery", label: l.batteryNow, value: K(Math.round(o)) }), h.push({ color: "--ed-sun", label: l.sunUntil(c), value: `≈ ${at(r.sunUntilEvening)} kWh` }), h.push({ color: "--ed-house", label: l.houseUntil(c), value: `≈ ${at(r.houseUntilEvening)} kWh` })), r.fullAt !== void 0 && h.push({ color: "--ed-battery", label: l.full, value: `≈ ${it(r.fullAt)}` }), r.socAtEvening !== void 0 && h.push({ color: "--ed-battery", label: l.batteryAt(it(e.today + s.evening_hour * Q)), value: `≈ ${K(Math.round(r.socAtEvening))}` }), r.carTotal > 0) {
      const d = this.carKwhPerKm(t);
      h.push({ color: "--ed-car", label: l.carSun, value: `≈ ${at(r.carSun)} kWh${d ? ` · ${R(r.carSun / d)} km` : ""}` });
    }
    return r.socAtMorning !== void 0 && h.push({ color: "--ed-battery", label: l.batteryAt(it(At(e.today, 1) + s.morning_hour * Q)), value: `≈ ${K(Math.round(r.socAtMorning))}` }), h;
  }
}, Ee = 5 * 6e4, Xo = 24 * Q, Jo = 7, cs = 5, Qo = ["overcurrent", "overheating", "overpowering", "overvoltage"], re = ["#5E5CE6", "#E8457A", "#1E9E96", "#B8803A", "#5E9E34", "#6F8FAF", "#D9503C", "#A064C8", "#8F8C2A"], hs = "ha-energie-dashboard.house-range", ti = "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12C19,15.87 15.87,19 12,19C8.13,19 5,15.87 5,12C5,9.82 6.01,7.87 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,9.26 19.77,6.82 17.83,5.17Z", Oe = (a) => `\0group:${a}`, ei = "mdi:power-plug", ai = (a) => class extends a {
  // ----------------------------------------------------------------- the appliances
  /** The appliances: the devices that have the label and measure power, and the ones named in house.appliances with their power sensor; the others (a vacuum) drop out. */
  appliances(t) {
    const e = this.hass, s = e?.devices ?? {}, n = e?.entities ?? {}, o = t.houseLabel.toLowerCase(), i = (c) => !!c?.some((d) => d.toLowerCase() === o), r = /* @__PURE__ */ new Set();
    for (const [c, d] of Object.entries(s)) i(d.labels) && r.add(c);
    for (const c of Object.values(n)) c.device_id && i(c.labels) && r.add(c.device_id);
    const l = (c) => {
      const d = { problems: [] }, p = {};
      for (const [b, y] of Object.entries(n)) {
        if (!c || y.device_id !== c) continue;
        const f = this.hass?.states?.[b];
        if (!f) continue;
        const u = f.attributes?.icon;
        typeof u == "string" && u && (p[b] = u);
        const g = f.attributes?.device_class;
        if (b.startsWith("sensor."))
          g === "power" && !d.power ? d.power = b : g === "energy" && f.attributes?.state_class === "total_increasing" && !b.endsWith("_returned") && !d.energy && (d.energy = b);
        else if (b.startsWith("binary_sensor.") && g === "problem") {
          const m = Qo.find((x) => b.endsWith(`_${x}`));
          m && d.problems.push({ id: b, kind: m });
        } else b.startsWith("switch.") && !d.plug && (d.plug = b);
      }
      return d.icon = d.plug && p[d.plug] || d.power && p[d.power] || Object.values(p)[0], d;
    }, h = [];
    for (const c of r) {
      const d = s[c], p = (d?.name_by_user || d?.name || c).trim(), b = l(c);
      if (!b.power) continue;
      const y = t.appliances.find((f) => Wa(f.name).some((u) => u.toLowerCase() === p.toLowerCase()));
      h.push({ name: p, label: y?.name, deviceId: c, warnAfter: y?.warn_after, power: y?.power ?? b.power, energy: y?.energy ?? b.energy, plug: b.plug, icon: this.iconOf(y?.icon, b.icon, [y?.power ?? b.power, y?.energy ?? b.energy, y?.running, y?.start_energy]), problems: b.problems, running: y?.running, startEnergy: y?.start_energy });
    }
    for (const c of t.appliances) {
      if (!c.power || h.some((b) => b.power === c.power)) continue;
      const d = n[c.power]?.device_id ?? void 0, p = l(d);
      h.push({ name: Wa(c.name)[0], label: c.name, deviceId: d ?? c.power, power: c.power, energy: c.energy ?? p.energy, plug: p.plug, icon: this.iconOf(c.icon, p.icon, [c.power, c.energy, c.running, c.start_energy]), problems: p.problems, running: c.running, startEnergy: c.start_energy, warnAfter: c.warn_after });
    }
    return h.sort((c, d) => c.name.localeCompare(d.name));
  }
  /** The appliances of the list and of the chart: without the ones that are members of a group (a power sensor is listed once, in its group). */
  listed(t) {
    const e = new Set(t.groups.flatMap((s) => s.appliances.map((n) => n.power)));
    return this.appliances(t).filter((s) => !e.has(s.power));
  }
  /** What the popup can show: the listed appliances and the members of the groups (Varná deska and Trouba are named in the popup, the group stays one row of the detail). */
  popupItems(t) {
    const e = this.listed(t).map((n) => ({ key: n.name, name: this.applianceName(n), icon: n.icon, power: n.power, running: n.running, cycle: !!n.running, warnAfter: n.warnAfter })), s = t.groups.flatMap((n, o) => n.appliances.map((i) => ({ key: `${Oe(o)}:${i.power}`, name: this.pickText(i.name) ?? "", icon: n.icon, power: i.power, running: i.running, cycle: !1, warnAfter: i.warn_after })));
    return [...e, ...s];
  }
  /** The icon of an appliance: the configured one, the one of the entities of its device, the one of its helpers, otherwise a plug. */
  iconOf(t, e, s) {
    const n = s.map((o) => o ? this.hass?.states?.[o]?.attributes?.icon : void 0).find((o) => typeof o == "string" && o !== "");
    return t ?? e ?? n ?? ei;
  }
  /** The name of the appliance in the language of the card. */
  applianceName(t) {
    return this.pickText(t.label) ?? t.name;
  }
  /** The icon of the appliance (Home Assistant draws it from its name). */
  renderApplianceIcon(t) {
    return t.icon ? v`<ha-icon class="house-icon" icon=${t.icon}></ha-icon>` : M;
  }
  /** An appliance that draws no power: the grey power symbol instead of a word. */
  renderIdleMark() {
    return v`<span class="house-idle" role="img" aria-label=${this.t.house.idle}><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ti}></path></svg></span>`;
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
      const n = ct(this.hass, t.running);
      if (n === "on") return !0;
      if (n === "off") return !1;
    }
    const s = F(this.hass, t.power);
    return s === void 0 ? void 0 : ot(s, e.num.flows.idle_threshold);
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
    const s = this.t, n = it(t), o = (l) => {
      const h = new Date(l);
      return h.setHours(0, 0, 0, 0), h.getTime();
    }, i = o(t), r = o(Date.now());
    return e !== void 0 && o(e) === i ? n : i === r ? e === void 0 ? n : `${s.house.todayWord} ${n}` : i === o(r - 12 * Q) ? `${s.house.yesterday} ${n}` : `${de(t)} ${n}`;
  }
  /** The energy of the cycle: the counter minus the value saved at the start. */
  cycleKwh(t) {
    const e = Jt(this.hass, t.energy), s = F(this.hass, t.startEnergy);
    return e === void 0 || s === void 0 ? void 0 : Math.max(0, e - s);
  }
  /** The status line of an appliance: "Běží · 31 min", "Skončilo · před 40 min" (up to 24 h) or nothing. */
  applianceStatus(t, e) {
    const s = this.t, n = this.applianceOn(t, e);
    if (n === void 0) return;
    const o = this.cycleTimes(t, n);
    if (n) return t.running && o.minutes !== void 0 ? s.house.running(pe(o.minutes)) : s.house.runningNoCycle;
    if (t.running && o.end !== void 0 && Date.now() - o.end <= Xo) return s.house.ended(pe(Math.max(0, Math.round((Date.now() - o.end) / 6e4))));
  }
  // ----------------------------------------------------------------- alerts
  /** One alert for each appliance whose socket reports a fault, and for each one that runs longer than its `warn_after` (CURRENT_SPEC.md, Upozornění). */
  houseAlerts(t) {
    const e = this.appliances(t).flatMap((n) => n.problems.filter((i) => ct(this.hass, i.id) === "on").map((i) => ({ kind: "warn", title: this.applianceName(n), text: this.t.house.problem[i.kind] }))), s = this.popupItems(t).flatMap((n) => {
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
    const e = (r) => F(this.hass, r.power) ?? 0, s = (r, l) => e(l) - e(r), n = this.popupItems(t).filter((r) => this.applianceOn(r, t) === !0), o = n.filter((r) => r.cycle).sort(s).slice(0, cs), i = n.filter((r) => !r.cycle).sort(s).slice(0, cs - o.length);
    this._houseFrozen = [...o, ...i].sort(s).map((r) => r.key);
  }
  /** The order of the detail, decided when it opens: what runs (an appliance by its helper or power, a group by the sum of its power) from the largest power, the rest after it. */
  houseOrder(t) {
    const e = [];
    for (const s of this.listed(t)) this.applianceOn(s, t) === !0 && e.push({ key: s.name, watts: F(this.hass, s.power) ?? 0 });
    return t.groups.forEach((s, n) => {
      const o = s.appliances.map((r) => F(this.hass, r.power));
      if (o.some((r) => r === void 0)) return;
      const i = o.reduce((r, l) => r + l, 0);
      ot(i, t.num.flows.idle_threshold) && e.push({ key: Oe(n), watts: i });
    }), e.sort((s, n) => n.watts - s.watts).map((s) => s.key);
  }
  /** The order of the table of each group, decided when the detail opens: from the largest power now, the unknown ones last (uživatel 9. 11. 2026, "Q19 ok"). */
  memberOrder(t) {
    return Object.fromEntries(
      t.groups.map((e, s) => [s, e.appliances.map((n) => ({ power: n.power, watts: F(this.hass, n.power) ?? -1 })).sort((n, o) => o.watts - n.watts).map((n) => n.power)])
    );
  }
  renderHousePopup(t, e, s) {
    const n = this.t, o = e.num.flows.idle_threshold, i = ot(s.other, o), r = this.today(e), l = this.popupItems(e), h = (this._houseFrozen ?? []).map((d) => l.find((p) => p.key === d)).filter((d) => !!d), c = i ? nt(s.other, "W").replace(" ", " ") : s.other === void 0 ? T : n.idle.house;
    return v`<ed-sheet open .heading=${t.name} .sub=${c} .closeLabel=${n.close} @hdk-close=${() => this._pop = void 0}><div class="pop bat-pop house-pop">
        <div class="pop-rows">
          ${h.map((d) => {
      const p = F(this.hass, d.power), b = this.applianceOn(d, e), y = this.listed(e).find((x) => x.name === d.key), f = y ? this.applianceStatus(y, e) : void 0, u = this.cycleTimes(d, b).minutes, g = b && d.running && u !== void 0 ? `${d.name} · ${pe(u)}` : d.name, m = p === void 0 ? v`<b>${T}</b>` : ot(p, o) || b || !d.cycle ? v`<b>${nt(p, "W").replace(" ", " ")}</b>` : this.renderIdleMark();
      return v`<div class="house-app" title=${f ?? ""}><span class="ell">${d.icon ? v`<ha-icon class="house-icon" icon=${d.icon}></ha-icon>` : M}${g}</span>${m}</div>`;
    })}
          <div class="pop-row"><span>${n.pop.rows.consumed}</span><b>${r.house === void 0 ? T : `${at(r.house)} kWh`}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openHouseDetail()}><span>${n.house.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div></ed-sheet>`;
  }
  // ----------------------------------------------------------------- state and history
  houseRange(t) {
    if (this._houseRange) return this._houseRange;
    try {
      const e = localStorage.getItem(hs);
      if (e && Ue.includes(e)) return e;
    } catch {
    }
    return t.houseRange;
  }
  setHouseRange(t) {
    this._houseRange = t, this._batScrub = {};
    try {
      localStorage.setItem(hs, t);
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
    const n = [t.entities.wallbox.power, t.entities.boiler.power].filter((h) => !!h), o = this._houseDetail ? this.appliances(t).map((h) => h.energy).filter((h) => !!h) : [], i = this._houseDetail ? t.groups.flatMap((h) => h.appliances) : [], r = i.map((h) => h.energy).filter((h) => !!h), l = i.filter((h) => !h.energy).map((h) => h.power);
    if (!(!n.length && !o.length && !r.length && !l.length))
      try {
        const h = new Date(s);
        h.setHours(0, 0, 0, 0);
        const c = await Ft(e, [...n, ...l], h.getTime(), s, "5minute", ["mean"]), d = o.length || r.length ? await Ft(e, [...o, ...r], h.getTime(), s, "5minute", ["change"]) : {}, p = {};
        for (const f of i)
          if (f.energy) {
            const u = d[f.energy];
            Dt(u, "change") && (p[f.power] = u.reduce((g, m) => g + (typeof m.change == "number" ? m.change : 0), 0));
          } else {
            const u = c[f.power];
            Dt(u, "mean") && (p[f.power] = u.reduce((g, m) => g + (typeof m.mean == "number" ? m.mean : 0), 0) / 12 / 1e3);
          }
        const b = {};
        for (const f of o) {
          const u = d[f];
          Dt(u, "change") && (b[f] = u.reduce((g, m) => g + (typeof m.change == "number" ? m.change : 0), 0));
        }
        const y = (f) => {
          const u = f ? c[f] : void 0;
          return Dt(u, "mean") ? u.reduce((g, m) => g + (typeof m.mean == "number" ? m.mean : 0), 0) / 12 / 1e3 : void 0;
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
      return s.setHours(0, 0, 0, 0), { start: s.getTime(), bins: 24, step: Q };
    }
    return { ...this.histWindow(t, e), step: Rt };
  }
  async fetchHouse(t, e, s, n) {
    const o = this.hass;
    if (!o) return;
    const i = Date.now();
    this._houseData = { ...this._houseData, [e]: { status: "loading", at: i, parts: n?.parts ?? {} } };
    try {
      const r = this.houseWindow(s, i), l = s === "1d" || s === "day" ? "hour" : "day", h = (...$) => $.filter((O) => !!O), c = t.entities, d = r.start + Math.min(r.bins - 1, Math.max(0, Math.floor((i - r.start) / r.step))) * r.step, p = this.listed(t), b = t.groups.flatMap(($) => $.appliances), y = s === "day", f = h(...y ? [] : [c.pv.total_generation, c.battery.total_discharge, c.battery.total_charge, c.grid.total_import, c.grid.total_export], ...p.map(($) => $.energy), ...b.map(($) => $.energy)), u = h(...y ? [] : [c.wallbox.power, c.boiler.power], ...p.filter(($) => !$.energy).map(($) => $.power), ...b.filter(($) => !$.energy).map(($) => $.power)), [g, m, x, _] = await Promise.all([
        Ft(o, f, r.start, i, l, ["change"]),
        Ft(o, u, r.start, i, l, ["mean"]),
        // The running bin (hour or day) has no row in the long-term statistics yet: the 5-minute rows fill it.
        Ft(o, f, d, i, "5minute", ["change"]),
        Ft(o, u, d, i, "5minute", ["mean"])
      ]);
      this._houseData = { ...this._houseData, [e]: { status: "ready", at: i, parts: { energy: g, power: m, nowCounters: x, nowPowers: _ } } };
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
          start_time: new Date(s - Jo * Rt).toISOString(),
          end_time: new Date(s).toISOString(),
          entity_ids: n,
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        }), i = {};
        for (const [r, l] of Object.entries(o ?? {})) {
          const h = [], c = [];
          let d, p;
          for (const b of l) {
            const y = b.s ?? b.state, f = b.lu ?? b.last_updated, u = typeof f == "number" ? f * 1e3 : f ? Date.parse(f) : NaN;
            if (Number.isFinite(u)) {
              if (y === void 0 || y === "unavailable" || y === "unknown") {
                d !== void 0 && p === void 0 && (p = u);
                continue;
              }
              d !== void 0 && y !== d && (y === "on" ? h.push(u) : y === "off" && c.push(d === "on" && p !== void 0 ? p : u)), d = y, p = void 0;
            }
          }
          i[r] = { starts: h, ends: c };
        }
        this._houseCycles = { at: s, byId: i };
      } catch {
        this._houseCycles = { at: s, byId: {} };
      }
  }
  // ----------------------------------------------------------------- the detail
  renderHouseDetail(t, e) {
    const s = this.t, n = this.houseRange(t), o = Ue.map((b) => ({ value: b, label: s.bat.ranges[b] })), i = ["now", "hist"].map((b) => ({ value: b, label: s.house.tabs[b] })), r = "W", l = this._houseOrder ?? [], h = [
      ...this.listed(t).map((b) => ({ key: b.name, label: this.applianceName(b), group: !1, render: () => this.renderApplianceRow(b, t, r) })),
      ...t.groups.map((b, y) => ({ key: Oe(y), label: "", group: !0, render: () => this.renderGroupRow(b, y) }))
    ].sort((b, y) => {
      const f = l.indexOf(b.key), u = l.indexOf(y.key);
      return f >= 0 || u >= 0 ? (f < 0 ? 999 : f) - (u < 0 ? 999 : u) : Number(b.group) - Number(y.group) || (b.group ? 0 : b.label.localeCompare(y.label));
    }), c = this.houseChart(t, n), d = this._houseData[`hist:${n}`], p = d?.status === "loading" && !Object.keys(d.parts).length;
    return v`<section class="bat-detail house-detail" role="dialog" aria-modal="true" aria-label=${s.house.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeHouseDetail()}>‹ ${s.house.back}</button>
          <h2>${s.house.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeHouseDetail()}>${s.house.done}</button>
        </div>
        <ed-segmented .options=${i} .value=${this._houseTab} label=${s.house.tabsLabel} @hdk-select=${(b) => {
      this._houseTab = b.detail.value, this._batScrub = {};
    }}></ed-segmented>
        ${this._houseTab === "now" ? v`<div class="bat-card"><span class="bat-cap">${s.house.nowLabel}</span>
              <span class="house-hero">${e.other === void 0 ? T : nt(e.other, r)}</span></div>
            <div class="house-list"><span class="bat-cap">${s.house.appliances}</span>
              ${h.length ? h.map((b) => b.render()) : v`<div class="bat-card"><span>${s.house.none}</span><span class="bat-sub">${this.labelDiagnostics(t)}</span></div>`}
            </div>` : v`<ed-segmented .options=${o} .value=${n} label=${s.house.rangeLabel} @hdk-select=${(b) => this.setHouseRange(b.detail.value)}></ed-segmented>
            <div class="bat-card"><span class="bat-cap">${Lt([n === "1d" ? s.house.chartHours : s.house.chartDays, v`<span class="unit">kWh</span>`])}</span>
              ${c ? this.renderChart(c) : v`<div class="bat-nodata" style="aspect-ratio:${U} / 220">${p ? T : s.bat.noDataChart}</div>`}
            </div>`}
      </section>`;
  }
  /**
   * A group of appliances (house.groups): one row. Closed: the power now (the sum) and the energy of today; open: every appliance with its
   * power now and its energy of today. No cycles, no threshold: what the appliances draw is shown as it is. A sum counts only when every appliance is known.
   */
  renderGroupRow(t, e) {
    const s = Oe(e), n = this._houseOpen.includes(s), o = this._houseMembers?.[e] ?? [], i = t.appliances.map((d) => ({ power: d.power, name: this.pickText(d.name) ?? "", watts: F(this.hass, d.power), kwh: this._houseToday?.groups?.[d.power] })).sort((d, p) => (o.indexOf(d.power) < 0 ? 999 : o.indexOf(d.power)) - (o.indexOf(p.power) < 0 ? 999 : o.indexOf(p.power))), r = (d) => d.every((p) => p !== void 0) ? d.reduce((p, b) => p + b, 0) : void 0, l = (d) => d === void 0 ? T : nt(d, "W").replace(" ", " "), h = (d) => d === void 0 ? T : `${at(d)} kWh`, c = this.t;
    return v`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${n ? "true" : "false"} @click=${() => {
      this._houseOpen = n ? this._houseOpen.filter((d) => d !== s) : [...this._houseOpen, s];
    }}>
          <ha-icon class="house-icon" icon=${t.icon}></ha-icon>
          <span class="bat-col"><span class="bat-label">${this.pickText(t.name) ?? ""}</span><span class="bat-sub">${c.house.today} ${h(r(i.map((d) => d.kwh)))}</span></span>
          <span class="bat-value">${l(r(i.map((d) => d.watts)))}</span>
          <svg class="chev ${n ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${n ? v`<div class="house-body">
            <div class="house-cook">
              <span class="house-cook-head"></span><span class="house-cook-head">${c.house.nowCol}</span><span class="house-cook-head">${c.house.totalCol}</span>
              ${i.map((d) => v`<span class="house-cook-name">${d.name}</span><b>${l(d.watts)}</b><b>${h(d.kwh)}</b>`)}
            </div>
            ${this.renderDayChart(t.appliances.map((d, p) => ({ name: this.pickText(d.name) ?? "", energy: d.energy, power: d.power, color: re[p % re.length] })).sort((d, p) => (o.indexOf(d.power) < 0 ? 999 : o.indexOf(d.power)) - (o.indexOf(p.power) < 0 ? 999 : o.indexOf(p.power))))}
          </div>` : M}
      </div>`;
  }
  renderApplianceRow(t, e, s) {
    const n = this.t, o = this._houseOpen.includes(t.name), i = F(this.hass, t.power), r = this.applianceOn(t, e), l = this.applianceStatus(t, e) ?? (r === !1 ? n.house.notRunning : T), h = i !== void 0 && ot(i, e.num.flows.idle_threshold), c = i === void 0 ? v`<span class="bat-value">${T}</span>` : h ? v`<span class="bat-value">${nt(i, s)}</span>` : r ? v`<span class="bat-value">${R(i)}\u00a0W</span>` : this.renderIdleMark(), d = this.cycleTimes(t, r), p = this.cycleKwh(t), b = /* @__PURE__ */ new Date();
    b.setHours(0, 0, 0, 0);
    const y = t.running ? this._houseCycles?.byId[t.running] : void 0, f = y ? y.starts.filter((D) => D >= b.getTime()).length : void 0, u = Math.max(0, this.listed(e).findIndex((D) => D.name === t.name)), g = re[u % re.length], m = (D, E) => `${this.stamp(D)} – ${E}`, x = t.running && d.start !== void 0 ? v`<div class="house-line wrap"><span>${r ? n.house.currentCycle : n.house.lastCycle}</span><b>${Lt([m(d.start, r ? n.house.axisTo : this.stamp(d.end ?? d.start, d.start)), ...p !== void 0 ? [`${at(p)} kWh`] : []])}</b></div>` : t.running && d.end !== void 0 && !r ? v`<div class="house-line wrap"><span>${n.house.lastCycle}</span><b>${n.house.endedAt(this.stamp(d.end))}</b></div>` : M, _ = this.renderDayChart([{ name: this.applianceName(t), energy: t.energy, power: t.power, color: g }]), $ = t.energy ? this._houseToday?.apps?.[t.energy] : void 0, O = t.plug ? ct(this.hass, t.plug) : void 0, A = t.problems.find((D) => ct(this.hass, D.id) === "on"), S = (D, E) => v`<div class="house-line"><span>${D}</span><b>${Pt(E)}</b></div>`;
    return v`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${o ? "true" : "false"} @click=${() => {
      this._houseOpen = o ? this._houseOpen.filter((D) => D !== t.name) : [...this._houseOpen, t.name];
    }}>
          ${this.renderApplianceIcon(t)}
          <span class="bat-col"><span class="bat-label">${this.applianceName(t)}</span><span class="bat-sub">${Pt(l)}</span></span>
          ${c}
          <svg class="chev ${o ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${o ? v`<div class="house-body">
              ${A ? S(n.house.problem[A.kind], "") : M}
              ${x}
              ${t.running && f !== void 0 ? S(n.house.today, n.house.cyclesCount(f, $ === void 0 ? "" : at($))) : M}
              ${_}
              ${O === "off" ? S(n.house.plug, n.house.plugOff) : M}
            </div>` : M}
      </div>`;
  }
  /** "Co se dělo": the consumption of the house (without the car and the boiler) in kWh per hour or per day, broken down by the appliances. */
  /** The energy per bin of the statistics of a view: from the counter (the running bin from its 5-minute rows), otherwise from the mean power. */
  houseSeries(t, e) {
    const s = t.at, n = this.houseWindow(e, s), o = n.bins, i = n.start + o * n.step, r = n.step / Q, l = Math.min(o - 1, Math.max(0, Math.floor((s - n.start) / n.step))), h = t.parts.energy ?? {}, c = t.parts.power ?? {}, d = t.parts.nowCounters ?? {}, p = t.parts.nowPowers ?? {};
    return { at: s, w: n, n: o, cur: l, counter: (f) => {
      if (!f || !Dt(h[f], "change")) return;
      const u = Tt(h[f], "change", n.start, i, o, "sum"), g = d[f];
      return Dt(g, "change") && (u[l] = g.reduce((m, x) => m + (typeof x.change == "number" ? x.change : 0), 0)), u;
    }, meanKwh: (f) => {
      if (!f || !Dt(c[f], "mean")) return;
      const u = Tt(c[f], "mean", n.start, i, o, "mean").map((m) => m === void 0 ? void 0 : m * r / 1e3), g = p[f];
      if (Dt(g, "mean")) {
        const m = g, x = m.reduce((_, $) => _ + (typeof $.mean == "number" ? $.mean : 0), 0) / m.length;
        u[l] = x * Math.min(r, Math.max(0, (s - (n.start + l * n.step)) / Q)) / 1e3;
      }
      return u;
    } };
  }
  /** The reading of a bar (and the legend at once): the moment and the total, then every part with its colour and its energy. */
  renderReading(t, e, s, n) {
    return v`<div class="house-panel" role="group" aria-label=${t}>
        <div class="house-panel-head"><span>${t}</span><b>${s}\u00a0${at(e)}\u00a0kWh</b></div>
        ${n.map((o) => v`<div class="house-panel-row"><i style="background:${o.color}"></i><span>${o.name}</span><b>${o.kwh === void 0 ? T : `${at(o.kwh)} kWh`}</b></div>`)}
      </div>`;
  }
  /**
   * A small trend of today by hours (from midnight to midnight) in the row of an appliance (one colour) or of a group (the appliances
   * of the group stacked, a legend names them): when it was cooking, when it was washing. No axis of values, no reading. Without statistics nothing.
   */
  renderDayChart(t) {
    const e = this.t, s = this._houseData.day;
    if (!s || s.status === "error" || !Object.keys(s.parts).length) return M;
    const { n, counter: o, meanKwh: i } = this.houseSeries(s, "day"), r = t.map((x) => ({ ...x, list: x.energy ? o(x.energy) : i(x.power) })).filter((x) => x.list && x.list.some((_) => typeof _ == "number"));
    if (!r.length) return M;
    const l = (x, _) => x?.[_] ?? 0;
    let h = 0;
    for (let x = 0; x < n; x++) h = Math.max(h, r.reduce((_, $) => _ + l($.list, x), 0));
    const c = 44, d = 42, p = h > 0 ? me(h) : 0, b = p > 0 ? 36 / p : 0, y = /* @__PURE__ */ new Date();
    y.setHours(0, 0, 0, 0);
    const f = xa({ start: y.getTime(), end: y.getTime() + 24 * Q }), u = U / n, g = u * 0.72, m = Array.from({ length: n }, (x, _) => {
      let $ = 0;
      return r.map((O) => {
        const A = l(O.list, _);
        if (A <= 0) return M;
        const S = Math.max(1.5, A * b), D = d - $ - S;
        return $ += S + 1, V`<rect x=${(_ * u + (u - g) / 2).toFixed(1)} y=${D.toFixed(1)} width=${g.toFixed(1)} height=${S.toFixed(1)} style="fill:${O.color}"></rect>`;
      });
    });
    return v`<div class="house-micro">
        <span class="house-micro-cap">${Lt([e.house.chartToday, v`<span class="unit">kWh</span>`])}</span>
        <svg viewBox="0 0 ${U + Vt} ${c}" role="img" aria-label=${e.house.chartToday}>
          ${f.map((x) => V`<line x1=${x.x} y1="0" x2=${x.x} y2=${d} style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>`)}
          <line x1="0" y1="6" x2=${U} y2="6" style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>
          <line x1="0" y1=${d} x2=${U} y2=${d} style="stroke:var(--ed-tick);stroke-width:1.5"></line>
          ${m}
          <text x=${U + 9} y="10" style="fill:var(--ed-secondary)" font-size="12">${p > 0 ? R(p, p % 1 ? 1 : 0) : ""}</text>
        </svg>
        <div class="bat-axis ticks" aria-hidden="true">${f.map((x) => v`<span style="left:${(x.x / (U + Vt) * 100).toFixed(1)}%;transform:translateX(${x.x < 8 ? "0" : x.x > U - 8 ? "-100%" : "-50%"})">${x.text}</span>`)}</div>
        ${r.length > 1 ? v`<div class="house-micro-legend">${r.map((x) => v`<span><i style="background:${x.color}"></i>${x.name}</span>`)}</div>` : M}
      </div>`;
  }
  houseChart(t, e) {
    const s = this.t, n = this._houseData[`hist:${e}`];
    if (!n || n.status === "error" || !Object.keys(n.parts).length) return;
    const o = t.entities, { w: i, n: r, counter: l, meanKwh: h } = this.houseSeries(n, e), c = l(o.pv.total_generation), d = l(o.battery.total_discharge), p = l(o.battery.total_charge), b = l(o.grid.total_import), y = l(o.grid.total_export), f = h(o.wallbox.power), u = h(o.boiler.power);
    if (!c && !d && !p && !b && !y) return;
    const g = (H, I) => H?.[I] ?? 0, m = !f || !u, x = Array.from({ length: r }, (H, I) => Math.max(0, g(c, I) + g(d, I) + g(b, I) - g(p, I) - g(y, I) - g(f, I) - g(u, I))), _ = (H) => {
      const I = H.filter(($t) => !!$t);
      return I.length ? Array.from({ length: r }, ($t, ne) => I.every((St) => St[ne] === void 0) ? void 0 : I.reduce((St, ft) => St + (ft[ne] ?? 0), 0)) : void 0;
    }, $ = [
      ...this.listed(t).map((H) => ({ name: this.applianceName(H), list: H.energy ? l(H.energy) : h(H.power) })),
      ...t.groups.map((H) => ({ name: this.pickText(H.name) ?? "", list: _(H.appliances.map((I) => I.energy ? l(I.energy) : h(I.power))) }))
    ].map((H, I) => ({ ...H, color: re[I % re.length] })).filter((H) => H.list && H.list.some((I) => typeof I == "number")), O = (H) => Math.max(x[H], $.reduce((I, $t) => I + g($t.list, H), 0));
    let A = 0;
    for (let H = 0; H < r; H++) A = Math.max(A, O(H));
    if (A <= 0) return;
    const S = me(A), D = 220, E = 200, k = 180 / S, C = 0, j = Math.min(18, (U - C) / r * 0.72), w = (H) => C + (H + 0.5) / r * (U - C), z = Array.from({ length: r }, (H, I) => {
      let $t = 0;
      const ne = $.reduce((ft, ye) => ft + g(ye.list, I), 0);
      return [...$.map((ft) => ({ value: g(ft.list, I), color: ft.color })), { value: Math.max(0, x[I] - ne), color: "#8E8E93" }].map((ft) => {
        if (ft.value <= 0) return M;
        const ye = Math.max(0.6, ft.value * k), Is = E - $t - ye;
        return $t += ye + 1, V`<rect x=${(w(I) - j / 2).toFixed(1)} y=${Is.toFixed(1)} width=${j.toFixed(1)} height=${ye.toFixed(1)} style="fill:${ft.color}"></rect>`;
      });
    }), tt = (H) => {
      const I = i.start + H * i.step;
      return e === "1d" ? `${de(I)} ${it(I)}–${it(I + Q)}` : de(I);
    }, P = (H) => Math.max(x[H], $.reduce((I, $t) => I + g($t.list, H), 0)), L = m ? s.house.houseTotal : s.house.sum, q = (H) => `${tt(H)} · ${L} ${at(P(H))} kWh`, kt = (H) => {
      const I = P(H), $t = $.reduce((St, ft) => St + g(ft.list, H), 0), ne = $.length ? [...$.map((St) => ({ name: St.name, kwh: St.list?.[H], color: St.color })).sort((St, ft) => (ft.kwh ?? -1) - (St.kwh ?? -1)), { name: s.house.houseRest, kwh: Math.max(0, I - $t), color: "#8E8E93" }] : [];
      return this.renderReading(tt(H), I, L, ne);
    }, _t = Array.from({ length: r }, (H, I) => I), bt = $.map((H) => ({ name: H.name, kwh: _t.reduce((I, $t) => I + g(H.list, $t), 0), color: H.color })).sort((H, I) => I.kwh - H.kwh), lt = bt.reduce((H, I) => H + I.kwh, 0), Bt = e === "1d" ? this.today(t).house : void 0, se = Math.max(Bt ?? _t.reduce((H, I) => H + P(I), 0), lt), Kt = () => this.renderReading(Ca, se, L, $.length ? [...bt, { name: s.house.houseRest, kwh: Math.max(0, se - lt), color: "#8E8E93" }] : []), Ca = e === "1d" ? s.house.today : s.bat.ranges[e], Ps = () => `${Ca} · ${L} ${at(se)} kWh`, Ns = [c, d, p, b, y].some((H) => H && H[0] === void 0);
    return {
      id: `house-${e}`,
      h: D,
      // The top line is the value `max` exactly (the bars are drawn on the scale of 180 above the base).
      grid: [{ y: E - 180 }, { y: E, strong: !0 }],
      labels: [{ y: E - 180, text: `${S}` }, { y: E, text: "0" }],
      time: { start: i.start, end: i.start + r * i.step, x0: C, x1: U, slot: i.step },
      valueNum: (H) => (E - H) / 180 * S,
      valueAt: (H) => {
        const I = (E - H) / 180 * S;
        return I % 1 ? at(I) : R(I);
      },
      body: V`${z}`,
      n: r,
      x: w,
      read: q,
      from: Ns ? s.house.dataFrom(de(i.start)) : s.house.axisFrom[e],
      to: s.house.axisTo,
      fade: 0,
      panel: kt,
      whole: Kt,
      wholeText: Ps()
    };
  }
};
function si(a, t) {
  return { sources: [...mt], sinks: t.slice().sort((e, s) => fe.indexOf(e) - fe.indexOf(s)) };
}
function ni(a, t = fe, e = mt) {
  const s = Math.round(Math.max(116, Math.min(132, a * 0.377))), n = 56, o = 6, i = Math.max(1, t.length), r = i * n + (i - 1) * o, l = Object.fromEntries(t.map((c, d) => [c, n / 2 + d * (n + o)])), h = Object.fromEntries(
    e.map((c, d) => [c, i < 4 ? n / 2 + d * (n + o) : (d + 0.5) * r / mt.length])
  );
  return { width: a, tile: { w: s, h: n }, gap: o, height: r, left: h, right: l, xa: s - 8, xb: a - s + 8 };
}
const dt = (a) => a.toFixed(1);
function oi(a, t, e) {
  const s = a.filter((u) => u.to in t.right);
  if (!s.length) return [];
  const n = (u) => Math.sqrt(u.watts / 1e3), o = (u) => {
    const g = /* @__PURE__ */ new Map();
    for (const m of s) g.set(m[u], (g.get(m[u]) ?? 0) + n(m));
    return g;
  }, i = Math.max(...o("from").values(), ...o("to").values()), r = Math.min(e.maxPxPerKw, 44 / i), l = (u) => Math.max(e.minPx, n(u) * r), h = /* @__PURE__ */ new Map();
  for (const u of mt) {
    const g = s.filter((m) => m.from === u).reduce((m, x) => m + l(x), 0);
    h.set(u, t.left[u] - g / 2);
  }
  const c = /* @__PURE__ */ new Map();
  for (const u of fe.filter((g) => g in t.right)) {
    const g = s.filter((m) => m.to === u).reduce((m, x) => m + l(x), 0);
    c.set(u, t.right[u] - g / 2);
  }
  const d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const u of mt)
    for (const g of s.filter((m) => m.from === u).sort((m, x) => t.right[m.to] - t.right[x.to]))
      d.set(g, h.get(u)), h.set(u, h.get(u) + l(g));
  for (const u of fe.filter((g) => g in t.right))
    for (const g of s.filter((m) => m.to === u).sort((m, x) => t.left[m.from] - t.left[x.from]))
      p.set(g, c.get(u)), c.set(u, c.get(u) + l(g));
  const { xa: b, xb: y } = t, f = (b + y) / 2;
  return s.map((u) => {
    const g = l(u), m = d.get(u), x = m + g, _ = p.get(u), $ = _ + g;
    return {
      from: u.from,
      to: u.to,
      watts: u.watts,
      thickness: g,
      d: `M${b} ${dt(m)} C${dt(f)} ${dt(m)} ${dt(f)} ${dt(_)} ${y} ${dt(_)} L${y} ${dt($)} C${dt(f)} ${dt($)} ${dt(f)} ${dt(x)} ${b} ${dt(x)} Z`,
      centre: `M${b} ${dt(m + g / 2)} C${dt(f)} ${dt(m + g / 2)} ${dt(f)} ${dt(_ + g / 2)} ${y} ${dt(_ + g / 2)}`
    };
  });
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
}, aa = 42, sa = 10, ii = 12, ri = 34, li = (a) => class extends a {
  onKey(t) {
    t.key === "Escape" && this._houseDetail ? this.closeHouseDetail() : t.key === "Escape" && this._batDetail ? this.closeBatteryDetail(!0) : t.key === "Escape" && this._sunDetail ? this.closeSunDetail() : t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const s = this.t, n = t.entities.wallbox, o = [], i = ct(this.hass, n.block_charging) === "on", r = ct(this.hass, n.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    if (i ? o.push({ kind: "warn", ...s.alerts.blocked }) : r && o.push({ kind: "info", ...s.alerts.priorityWaiting }), ct(this.hass, t.entities.boiler.boost) === "on") {
      const l = ct(this.hass, t.entities.tank.water_heater);
      o.push({ kind: "warn", title: s.alerts.boostBoiler.title, text: l !== void 0 && l !== "off" ? s.alerts.boostBoilerGas : s.alerts.boostBoiler.text });
    }
    return o.push(...this.houseAlerts(t)), o;
  }
  renderAlerts(t, e) {
    const s = this.alerts(t, e);
    return s.length ? v`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${s.map(
      (n) => v`<li class="alert ${n.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${n.kind === "warn" ? et.alert : et.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${n.title}</span><span class="alert-text">${n.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : M;
  }
  renderElectricity(t, e) {
    const s = e.summarySource ? `var(${Xt[e.summarySource]})` : void 0;
    return v`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(n) => {
      n.stopPropagation(), this.openAll();
    }}>
              ${this.pickText(t.titles.electricity) ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${et.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(e.summary, s)}
        </div>
        ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : M}
      </section>`;
  }
  openAll() {
    this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, e) {
    const s = this.t, n = t.entities, o = t.num.scale, i = t.num.flows.idle_threshold, r = e.carLink, l = e.soc, h = l !== void 0 && l <= this.batteryReserve(t), c = ($) => l === void 0 ? void 0 : { f: l / 100, active: $, color: h ? "var(--ed-warning)" : "var(--ed-battery)", a1: h ? 0.5 : 0.58 }, d = ($) => `${s.tileSpoken.batteryState($)}, ${l === void 0 ? s.noData : s.tileSpoken.chargeLevel(K(l))}${h ? `, ${s.tileSpoken.atReserve}` : ""}`, p = r === "connected" || r === "charging" || ot(e.car, i), b = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, F(this.hass, n.boiler.target_temperature) ?? 0), f = e.boilTemp, u = ($) => ot($, i), g = e.loadShare.house, m = mt.filter(($) => g[$] >= 0.02), x = u(e.other) && m.length ? this.houseBackground(m, g, st((e.other ?? 0) / o.house, 0, 1)) : void 0, _ = [
      { side: "L", key: "sun", name: s.tile.sun, watts: e.sun, k: (e.sun ?? 0) / o.sun, icon: et.sun, idleIcon: et.moon, idleText: s.idle.sun, aria: e.sun === void 0 ? s.noData : "" },
      { side: "L", key: "bat", name: s.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / o.battery, icon: et.battery, icon2: et.batteryDown, idleIcon: et.pause, idleText: s.idle.bat, level: c(u(e.batDis)), aria: d(!0) },
      { side: "L", key: "grid", name: s.tile.grid, watts: e.imp, k: (e.imp ?? 0) / o.grid, icon: et.grid, idleIcon: et.minus, idleText: s.idle.grid, aria: e.imp === void 0 ? s.noData : u(e.imp) ? s.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: s.tile.house, watts: e.other, k: (e.other ?? 0) / o.house, icon: et.home, idleIcon: et.minus, idleText: s.idle.house, background: x, aria: e.other === void 0 ? s.noData : s.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const $ = p && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: u(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      _.push({
        side: "R",
        key: "car",
        name: s.tile.car,
        watts: r === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / o.car,
        icon: et.car,
        idleIcon: r === "disconnected" ? et.minus : et.plug,
        idleText: r === "disconnected" ? s.idle.carDisconnected : r === void 0 ? s.idle.carNoState : s.idle.carConnected,
        level: $,
        aria: [r === void 0 && e.car === void 0 ? s.noData : u(e.car) ? s.tileSpoken.charging : "", p && e.carSoc !== void 0 ? s.tileSpoken.chargeLevel(K(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const $ = f === void 0 ? void 0 : { f: st((f - b) / (y - b), 0, 1), active: u(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      _.push({
        side: "R",
        key: "boil",
        name: s.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / o.boiler,
        icon: et.therm,
        idleIcon: et.pause,
        idleText: s.idle.boil,
        level: $,
        aria: [f === void 0 ? s.noData : s.tileSpoken.temperature(`${R(f)} °C`), u(e.boil) ? s.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return _.push(
      { side: "R", key: "batIn", name: s.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / o.battery, icon: et.battery, icon2: et.batteryBolt, idleIcon: et.pause, idleText: s.idle.batIn, level: c(u(e.batIn)), aria: d(!1) },
      { side: "R", key: "gridOut", name: s.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / o.grid, icon: et.grid, idleIcon: et.minus, idleText: s.idle.gridOut, aria: e.exp === void 0 ? s.noData : u(e.exp) ? s.tileSpoken.gridExport : "" }
    ), _;
  }
  renderFlow(t, e) {
    const s = t.num.flows.idle_threshold, n = ma(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((d) => ot(d, s) ? d : void 0),
      t.num.flows.kw_from
    ), o = this.tiles(t, e), i = si(e.flows, o.filter((d) => d.side === "R").map((d) => d.key)), r = ni(this._width, i.sinks, i.sources), l = oi(e.flows, r, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), h = (d) => V`<linearGradient id="rg-${d}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(--band-${d});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(--band-${d});stop-opacity:var(--band-a1)"></stop>
          <stop offset="0.86" style="stop-color:var(--band-${d});stop-opacity:var(--band-a2)"></stop>
          <stop offset="1" style="stop-color:var(--band-${d});stop-opacity:0.2"></stop>
        </linearGradient>`, c = this._pop ? o.find((d) => d.key === this._pop) : void 0;
    return v`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${r.height}px">
        <svg width=${r.width} height=${r.height} viewBox="0 0 ${r.width} ${r.height}" aria-hidden="true">
          <defs>${mt.map(h)}</defs>
          ${l.map((d) => V`<path d=${d.d} fill="url(#rg-${d.from})"></path>`)}
        </svg>
        ${o.map((d) => this.renderTile(d, r, n, t))} ${c ? this.renderTilePopup(c, t, e, n) : M}
      </div>`;
  }
  /** A power "1,37 kW" as the number and a smaller grey unit next to it (uživatel 3. 11. 2026). */
  valueWithUnit(t) {
    const e = /^(.+) (k?W)$/.exec(t);
    return e ? v`${e[1]} <small>${e[2]}</small>` : t;
  }
  houseBackground(t, e, s) {
    const n = t.reduce((h, c) => e[c] > e[h] ? c : h), o = `linear-gradient(${Le(`var(${Xt[n]})`, Math.round(aa + sa * s))}, ${Le(`var(${Xt[n]})`, Math.round(aa + sa * s))}), var(--ed-tile)`;
    if (t.length === 1) return o;
    const i = t.reduce((h, c) => h + e[c], 0);
    let r = 0;
    const l = [];
    return t.forEach((h, c) => {
      const d = r / i * 100;
      r += e[h];
      const p = r / i * 100, b = `var(${Xt[h]})`, y = c === 0 ? `${d}%` : `calc(${d}% + 1px)`, f = c === t.length - 1 ? `${p}%` : `calc(${p}% - 1px)`;
      c > 0 && l.push(`transparent calc(${d}% - 1px) calc(${d}% + 1px)`), l.push(`${b} ${y} ${f}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${o}`;
  }
  tileBackground(t, e, s) {
    const n = `var(${ce[t.key]})`, o = t.level;
    if (o) {
      const i = st(o.f, 0, 1), r = `${(i * 100).toFixed(1)}%`, l = t.key === "boil", h = o.active ? Le(o.color, Math.round(o.a1 * 100 + (l ? ii * s : 0))) : "var(--ed-fill-idle)", c = o.active ? $a(o.color, Math.round(14 + (l ? ri * s : 0))) : "var(--ed-tile)";
      return i < 5e-3 ? o.active ? `linear-gradient(${c}, ${c}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${h} 0%, ${h} ${r}, ${c} ${r}, ${c} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const i = Le(n, Math.round(aa + sa * s));
      return `linear-gradient(${i}, ${i}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, s, n) {
    const o = t.watts === void 0, i = ot(t.watts, n.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], h = st(t.k, 0, 1), c = o ? T : nt(t.watts, s), d = this.tileBackground(t, i, h), p = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${ce[t.key]});--gr:${(2 + 9 * h).toFixed(1)}px;--ga:${Math.round(30 + 60 * h)}%${d ? `;background:${d}` : ""}`;
    return v`<button
        type="button"
        class="tile ${i ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""} ${!i && t.level && t.level.f >= 5e-3 ? "fill" : ""}"
        data-tile=${t.key}
        style=${p}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${i ? c : o ? T : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${i ? t.icon : t.idleIcon}></path>${i && t.icon2 ? V`<path class="icon2" d=${t.icon2}></path>` : M}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${i ? this.valueWithUnit(c) : o ? T : t.idleText}</span>
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
    const o = this.t, i = e.num.flows.idle_threshold, r = this.today(e), l = ($) => $ === void 0 ? T : `${at($)} kWh`, h = ($) => $ === void 0 ? T : nt($, n), c = ($) => ot($, i), d = s.soc, p = d !== void 0 && d <= this.batteryReserve(e), b = ($) => ({
      title: $ ? o.tile.bat : o.tile.batIn,
      now: $ ? c(s.batDis) ? o.pop.discharging(h(s.batDis)) : s.batDis === void 0 && d === void 0 ? T : o.idle.bat : c(s.batIn) ? o.pop.charging(h(s.batIn)) : s.batIn === void 0 && d === void 0 ? T : o.idle.batIn,
      level: d === void 0 ? void 0 : { label: o.pop.level, text: K(d), percent: d, color: p ? "var(--ed-warning)" : "var(--ed-battery)", note: p ? o.pop.atReserve : "" },
      rows: $ ? [{ label: o.pop.rows.discharged, value: l(r.bdis) }] : [{ label: o.pop.rows.charged, value: l(r.bchg) }]
    }), y = ($) => ({
      title: $ ? o.tile.gridOut : o.tile.grid,
      now: $ ? c(s.exp) ? o.pop.exporting(h(s.exp)) : s.exp === void 0 ? T : o.idle.gridOut : c(s.imp) ? o.pop.importing(h(s.imp)) : s.imp === void 0 ? T : o.idle.grid,
      rows: $ ? [{ label: o.pop.rows.exported, value: l(r.gout) }] : [{ label: o.pop.rows.imported, value: l(r.gin) }]
    }), f = s.carLink, u = s.boilTemp, g = e.num.water.gauge_min, m = Math.max(e.num.water.gauge_max, F(this.hass, e.entities.boiler.target_temperature) ?? 0), _ = {
      sun: { title: o.tile.sun, now: c(s.sun) ? h(s.sun) : s.sun === void 0 ? T : o.idle.sun, rows: [{ label: o.pop.rows.produced, value: l(r.pv) }] },
      bat: b(!0),
      batIn: b(!1),
      grid: y(!1),
      gridOut: y(!0),
      house: { title: o.tile.house, now: c(s.other) ? h(s.other) : s.other === void 0 ? T : o.idle.house, rows: [{ label: o.pop.rows.consumed, value: l(r.house) }] },
      car: {
        title: o.tile.car,
        now: c(s.car) ? o.pop.charging(h(s.car)) : f === "connected" || f === "charging" ? o.pop.carConnectedIdle : f === "disconnected" ? o.idle.carDisconnected : T,
        level: s.carSoc !== void 0 && (f === "connected" || f === "charging") ? { label: o.pop.level, text: K(s.carSoc), percent: s.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: o.pop.rows.carCharged, value: l(r.car) }]
      },
      boil: {
        title: o.tile.boil,
        now: c(s.boil) ? o.pop.heating(h(s.boil)) : s.boil === void 0 ? T : o.idle.boil,
        level: u === void 0 ? void 0 : { label: o.pop.temperature, text: `${R(u)} °C`, percent: st((u - g) / (m - g) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: o.pop.rows.boilerHeated, value: l(r.boil) }]
      }
    }[t.key];
    return v`<ed-sheet open .heading=${_.title} .sub=${_.now} .closeLabel=${o.close} @hdk-close=${() => this.closePop()}><div class="pop">
        ${_.level ? v`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${_.level.label}${_.level.note ? v`<span class="note"> ${_.level.note}</span>` : M}</span>
                <span class="pop-big" style="color:${_.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${_.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${Os(_.level.percent).map(($) => v`<span><i style="width:${$.toFixed(0)}%;background:${_.level.color}"></i></span>`)}</div>
            </div>` : M}
        <div class="pop-rows">${_.rows.map(($) => v`<div class="pop-row"><span>${$.label}</span><b>${$.value}</b></div>`)}</div>
      </div></ed-sheet>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const s = this.t, n = this.today(t), o = (p) => p === void 0 ? T : `${Y(Math.max(0, p), 2)} kWh`, i = [n.pv, n.bdis, n.gin], r = i.every((p) => p !== void 0) ? i.reduce((p, b) => p + b, 0) : void 0, l = n.house === void 0 ? void 0 : n.house + n.car + n.boil + n.bchg + n.gout, h = [
      { label: s.tile.sun, color: "var(--ed-sun)", value: n.pv },
      { label: s.pop.fromBattery, color: "var(--ed-battery)", value: n.bdis },
      { label: s.pop.fromGrid, color: "var(--ed-grid)", value: n.gin }
    ], c = [
      { label: s.tile.house, color: "var(--ed-house)", value: n.house },
      { label: s.tile.car, color: "var(--ed-car)", value: n.car },
      { label: s.tile.boil, color: "var(--ed-boiler)", value: n.boil },
      { label: s.pop.toBattery, color: "var(--ed-battery)", value: n.bchg },
      { label: s.tile.gridOut, color: "var(--ed-grid)", value: n.gout }
    ], d = (p, b, y) => v`<div role="list" aria-label=${p} class="day-col">
        <div class="day-total"><span>${p}</span><b>${o(b)}</b></div>
        ${y.map((f) => v`<div role="listitem" class="day-item"><i style="background:${f.color}" aria-hidden="true"></i><span>${f.label}</span><b>${o(f.value)}</b></div>`)}
      </div>`;
    return v`<ed-sheet open .heading=${s.pop.day} .closeLabel=${s.close} @hdk-close=${() => this.closePop()}><div class="pop day">
        <div class="day-cols">${d(s.pop.sources, r, h)} ${d(s.pop.consumption, l, c)}</div>
      </div></ed-sheet>`;
  }
}, di = (a) => class extends a {
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
    const s = this.t, n = t.entities, o = t.num.flows, i = t.num.car.charge_limit, r = e.carLink, l = ot(e.car, o.idle_threshold) && r !== "disconnected", h = va(e.loadShare.car, o, s), c = ct(this.hass, n.wallbox.block_charging) === "on", d = this.shown(n.wallbox.boost), p = d === "on" ? `var(${Xt[h.main]})` : this.sourceColor(h), b = ct(this.hass, n.wallbox.prioritize_connected) === "on" && r === "connected" && !c && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let y, f;
    const u = d === "on" ? [this.boostMark()] : [];
    l ? (y = [s.car.charging(h.text), ...u], f = p) : r === "connected" || r === "charging" ? (y = [s.car.connectedIdle, ...u], f = b ? "var(--ed-warning)" : void 0) : r === "disconnected" && (y = s.car.disconnected);
    const g = $a(f ?? "#d8d8dc", f ? 42 : 28), m = vt(this.hass, n.car.image)?.attributes?.entity_picture, x = e.carSoc, _ = ma([ot(e.car, o.idle_threshold) ? e.car : void 0], o.kw_from), $ = i < 100, O = s.car.chargeLevel(x === void 0 ? s.noData : K(x), $ ? K(i) : void 0), A = n.wallbox, S = d === "on" ? "on" : d === "off" ? "off" : "", D = this.boostOptions, E = d === "on" ? s.car.modeBoost : d === "off" ? s.car.modeSurplus : T;
    return v`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${g}, transparent)"></div><div class="shadow"></div>
            ${typeof m == "string" && m ? v`<img src=${m} alt="" />` : M}
          </div>
          ${t.carLink ? v`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${s.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(k) => k.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? v`<div class="car-hint" aria-hidden="true">${s.hint.holdOrDouble}</div>` : M}` : M}
          <div class="head"><h2 id="h-car">${this.pickText(t.titles.car) ?? s.titles.car}</h2>${this.stateLine(y, f)}</div>
          <div class="car-soc">
            <span class="soc">${x === void 0 ? T : R(x)}<small>${this._i18n.percent("")}</small>${x === void 0 ? v`<span class="sr-only">${s.noData}</span>` : M}</span>
            <span class="range">${s.car.range} <b>${e.carRange === void 0 ? T : `${R(e.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${O}>
            ${Os(st(x ?? 0, 0, 100)).map((k) => v`<span><i style="width:${k.toFixed(1)}%"></i></span>`)}
            ${$ ? v`<div class="limit" style="left:${Xa(i)}"></div>` : M}
          </div>
          ${$ ? v`<div class="meter-label" aria-hidden="true"><span style="left:${Xa(i)}">${s.car.limit(K(i))}</span></div>` : M}
        </div>
        ${l ? this.renderCarSources(e, o, nt(e.car ?? 0, _), d === "on") : M}
        ${A.boost ? v`<div class="mode">
              <div class="mode-head"><span id="mode-l">${s.car.mode}</span><span class="mode-sub">${d === "on" || d === "off" ? (
      // Both descriptions in one place, the other one invisible: the taller one sets the height, so switching moves nothing (CURRENT_SPEC.md, Klidné přepínání režimů).
      [s.car.modeSurplus, s.car.modeBoost].map((k, C) => v`<span class=${C === 1 == (d === "on") ? "shown" : "spare"}>${Pt(k)}</span>`)
    ) : E}</span></div>
              <ed-segmented
                guarded .options=${D} .value=${S} label=${s.car.modeLabel} .hint=${s.hint.holdDragOrDouble} ?disabled=${d === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(k) => this.setBoost("wallbox", k.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, d === "on")}
            </div>` : M}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, l, p, _) : M}
      </section>`;
  }
  renderCarSources(t, e, s, n) {
    const o = this.t, i = o.source, r = t.loadShare.car, l = mt.filter((d) => r[d] > 4e-3), h = wo(l.map((d) => r[d])), c = (d) => d === "grid" && !n && r.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${Xt[d]})`;
    return v`<div class="mix">
        <div class="mix-head"><span>${o.car.sourcesTitle}</span><span>${s}</span></div>
        <div class="mix-bar" aria-hidden="true">${l.map((d) => v`<div style="flex:${r[d]} 1 0;background:${c(d)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${o.car.sourcesLabel}>
          ${l.map((d, p) => v`<span><i style="background:${c(d)}"></i>${i[d]}<em>${K(h[p])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const s = t.entities.wallbox.charging_power;
    if (!s) return M;
    const { phases: n, power_min: o, power_max: i, power_step: r } = t.num.wallbox, l = vt(this.hass, s), h = F(this.hass, s), c = h === void 0 ? void 0 : h * n / 1e3;
    let d = o / 1e3, p = i / 1e3;
    const b = Nt(l, "min"), y = Nt(l, "max");
    return b !== void 0 && (d = Math.max(d, b * n / 1e3)), y !== void 0 && (p = Math.min(p, y * n / 1e3)), v`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${c === void 0 ? T : R(c, 1)}<small> kW</small></span>
          <ed-slider
            .min=${d} .max=${p} .step=${r / 1e3} .value=${c ?? d}
            label=${this.t.car.powerLabel} valueText=${c === void 0 ? this.t.noData : `${R(c, 1)} kW`}
            minLabel="${R(d, 1)} kW" maxLabel="${R(p, 1)} kW"
            ?disabled=${c === void 0}
            @hdk-change=${(f) => this.setNumber(s, Math.round(f.detail.value * 1e3 / n), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, e, s, n, o) {
    const i = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, h = !!(r.block_charging || r.prioritize_connected), c = e.carLink, d = s ? v`<span>${i.wallbox.charging} </span><b style="--c:${n}">${nt(e.car ?? 0, o)}</b>` : c === "connected" || c === "charging" ? v`${i.wallbox.idle}` : c === "disconnected" ? v`${i.wallbox.disconnected}` : v`${T}`, p = Wn(ct(this.hass, t.entities.car.last_message), this._now, i), b = this.shown(r.block_charging), y = this.shown(r.prioritize_connected);
    return v`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!h} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${s ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${et.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${i.wallbox.title}</span><span class="row-sub wrap">${p ? Lt([d, i.wallbox.fromCar(p)]) : d}</span></span>
            <span></span>
            ${h ? v`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>` : v`<span></span>`}
          </button>
          ${h ? v`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(i.wallbox.block, r.block_charging, b === "on" ? i.wallbox.blockOn : i.wallbox.blockOff, b === "on") : M}
                ${r.prioritize_connected ? this.switchRow(i.wallbox.priority, r.prioritize_connected, y === "on" ? i.wallbox.priorityOn : i.wallbox.priorityOff, !1) : M}
              </div></div>` : M}
        </li>
      </ul>`;
  }
}, je = 45, Et = 46, ci = 62, hi = 58;
function na(a, t) {
  let e = 1;
  for (; e < a.length - 1 && t > a[e].temp; ) e++;
  const s = a[e - 1], n = a[e], o = Math.max(0, Math.min(1, (t - s.temp) / (n.temp - s.temp))), i = (h) => [1, 3, 5].map((c) => parseInt(h.slice(c, c + 2), 16)), r = i(s.color), l = i(n.color);
  return `rgb(${[0, 1, 2].map((h) => Math.round(r[h] + (l[h] - r[h]) * o)).join(",")})`;
}
const ue = (a, t) => {
  const e = (135 + 270 * a) * Math.PI / 180;
  return [ci + t * Math.cos(e), hi + t * Math.sin(e)];
}, pi = (a, t) => {
  const [e, s] = ue(a, Et), [n, o] = ue(t, Et);
  return `M${e.toFixed(2)} ${s.toFixed(2)} A${Et} ${Et} 0 0 1 ${n.toFixed(2)} ${o.toFixed(2)}`;
};
function ui(a, t, e, s) {
  const n = a === void 0 ? 0 : Math.max(0, Math.min(1, (a - t) / (e - t))), [o, i] = ue(0, Et), [r, l] = ue(0.5, Et), [h, c] = ue(1, Et), d = (u, g) => `A${Et} ${Et} 0 0 1 ${u.toFixed(2)} ${g.toFixed(2)}`, p = V`<path d=${`M${o.toFixed(2)} ${i.toFixed(2)} ${d(r, l)} ${d(h, c)}`} fill="none" stroke="var(--ed-gauge-track)" stroke-width="10" stroke-linecap="round"></path>`, b = Array.from({ length: je }, (u, g) => {
    const m = (g + 0.5) / je;
    return a === void 0 || m > n ? null : V`<path d=${pi(g / je, Math.min(1, (g + 1) / je + 4e-3))} fill="none" stroke=${na(s, t + m * (e - t))} stroke-width="10"></path>`;
  }), [y, f] = ue(n, Et);
  return V`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${p}${b}
    ${a !== void 0 && n > 0 ? V`<circle cx=${o.toFixed(1)} cy=${i.toFixed(1)} r="5" fill=${na(s, t)}></circle>` : null}
    ${a !== void 0 && n >= 0.99 ? V`<circle cx=${h.toFixed(1)} cy=${c.toFixed(1)} r="5" fill=${na(s, e)}></circle>` : null}
    ${a === void 0 ? null : V`<circle class="knob" cx=${y.toFixed(1)} cy=${f.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const gi = (a) => class extends a {
  renderWater(t, e) {
    const s = this.t, n = t.entities, o = t.num.flows, i = ot(e.boil, o.idle_threshold), r = va(e.loadShare.boil, o, s), l = this.sourceColor(r), c = this.shown(n.boiler.boost) === "on", d = ma([i ? e.boil : void 0], o.kw_from);
    let p;
    return i ? p = [s.water.boilerHeats(r.text), ...c ? [this.boostMark()] : []] : e.boil !== void 0 && (p = [s.water.noHeating, ...c ? [this.boostMark()] : []]), v`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${this.pickText(t.titles.water) ?? s.titles.water}</h2>${this.stateLine(p, i ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, i, l, d)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, s, n, o, i = !1) {
    return v`<div class="arc" role="img" aria-label=${o}>
        ${ui(t, e, s, n.tempScale)}
        <div class="arc-num ${i ? "dim" : ""}"><b class=${t === void 0 ? "nodata" : ""}>${t === void 0 ? T : R(t)}</b>${t === void 0 ? v`<span class="sr-only">${this.t.noData}</span>` : v`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${R(e)}</span><span class="arc-max" aria-hidden="true">${R(s)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, s, n, o) {
    const i = this.t, r = t.entities.boiler, l = this.shown(r.boost), h = l === "on", c = F(this.hass, r.target_temperature), d = F(this.hass, r.boost_target_temperature), p = h ? d : c, b = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, c ?? 0), f = e.boilTemp, u = !!this._open.targets, g = !!(r.target_temperature || r.boost_target_temperature), m = i.water.boilerLabel(
      f === void 0 ? i.noData : `${R(f)} °C`,
      s ? i.water.heatingWith(nt(e.boil, o)) : i.water.notHeating,
      p === void 0 ? void 0 : `${R(p)} °C`,
      R(b),
      `${R(y)} °C`
    );
    return v`<div class="source">
        <div class="source-top">
          ${this.gauge(f, b, y, t, m)}
          <div class="source-body">
            <div>
              <div class="source-title">${i.water.boilerTitle}</div>
              <div class="source-line">${Lt([
      v`<span class="src ${s ? "tinted" : ""}" style="--c:${s ? n : "var(--ed-secondary)"}">${s ? nt(e.boil, o) : e.boil === void 0 ? this.noData() : i.water.notHeating}</span>`,
      ...p === void 0 ? [] : [v`<span class="dim">${i.water.target(`${R(p)} °C`)}</span>`]
    ])}</div>
            </div>
            ${r.boost ? v`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${i.water.boostMode} .hint=${i.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(x) => this.setBoost("boiler", x.detail.value === "on")}
                ></ed-segmented>` : M}
          </div>
        </div>
        ${g ? v`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${u ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${i.water.targets}</span>
                <span class="rowbtn-value">${Lt([
      // On two lines both targets have the unit (uživatel 12. 11. 2026: „A °C bude na obou“).
      v`${i.water.targetFlow} <b>${c === void 0 ? this.noData() : v`${R(c)}<span class="joined-only"> °C</span>`}</b>`,
      v`${i.water.targetBoost} <b>${d === void 0 ? this.noData() : `${R(d)} °C`}</b>`
    ], { whole: !0 })}</span>
                <svg class="chevron ${u ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
              </button>
              <div class="fold ${u ? "open" : ""}" ?inert=${!u}><div>${this.renderTargets(t, c, d)}</div></div>
            </div>` : M}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, s) {
    const n = this.t, o = t.entities.boiler, i = t.num.boiler, r = (l, h, c, d, p, b) => {
      if (!l) return M;
      const y = vt(this.hass, l);
      let f = i.target_min, u = i.target_max;
      const g = Nt(y, "min"), m = Nt(y, "max");
      return g !== void 0 && (f = Math.max(f, g)), m !== void 0 && (u = Math.min(u, m)), p !== void 0 && (f = Math.max(f, p)), b !== void 0 && (u = Math.min(u, b)), v`<div class="field">
          <span class="field-label">${c}<span class="hint">${d}</span></span><span class="field-value">${h === void 0 ? T : R(h)}<small> °C</small></span>
          <ed-slider
            .min=${f} .max=${u} .step=${i.target_step} .value=${h ?? f}
            label=${n.water.targetSliderLabel(c)} valueText=${h === void 0 ? n.noData : n.water.targetSliderSpoken(`${h} °C`, c)}
            minLabel="${R(f)} °C" maxLabel="${R(u)} °C"
            ?disabled=${h === void 0}
            @hdk-change=${(x) => this.setNumber(l, x.detail.value, n.water.targetWhat(c))}
          ></ed-slider>
        </div>`;
    };
    return v`<div class="detail">
        ${r(o.target_temperature, e, n.water.targetFlow, n.water.targetFlowHint, s, void 0)}
        ${r(o.boost_target_temperature, s, n.water.targetBoost, n.water.targetBoostHint, void 0, e)}
        <p class="hint">${n.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return M;
    const s = Vn(this.shown(e.valve_c1), this.shown(e.valve_c2)), n = s === "on", o = !!(e.valve_c1 && e.valve_c2), i = s === "unclear" ? this.t.water.mixingUnclear : s === void 0 ? this.t.noData : "";
    return v`
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${n ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${n ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${n ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${i ? v`<span class="mixcap-note">${i}</span>` : M}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${n} ?disabled=${s === void 0 || !o}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, s = t.entities.tank, n = t.num.tank, o = s.water_heater, i = vt(this.hass, o), r = this.shown(o), l = r === "off", h = r === "heat", c = Nt(i, "temperature"), d = this._tankTemp, p = d && d.id === o ? d.value : c, b = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, F(this.hass, t.entities.boiler.target_temperature) ?? 0), f = l ? n.temp_min : p, u = Array.isArray(i?.attributes?.operation_list) ? i.attributes.operation_list : Object.keys(e.tank.modes), g = Object.keys(e.tank.modes).filter((D) => u.includes(D)).map((D) => ({ value: D, label: e.tank.modes[D] })), m = !!this._open.tank, { min: x, max: _ } = this.tankRange(t), $ = r === void 0 ? T : e.tank.modes[r] ?? r, O = l ? e.tank.keepsMinimum : h ? void 0 : e.tank.byPlan, A = f === void 0 ? this.noData() : v`<b class=${l ? "off" : ""}>${R(l ? n.temp_min : f)} °C</b>`, S = e.tank.label(
      f === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${R(n.temp_min)} °C`) : e.tank.settingSet(`${R(f)} °C`),
      $,
      R(b),
      `${R(y)} °C`
    );
    return v`<div class="source">
        <div class="source-top">
          ${this.gauge(f, b, y, t, S, l)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line">${Lt([v`<span class="src" style="--c:${h ? "var(--ed-text)" : "var(--ed-secondary)"}">${r === void 0 ? this.noData() : $}</span>`, ...r === void 0 || O === void 0 ? [] : [v`<span class="dim">${O}</span>`]])}</div>
            </div>
            ${o ? v`<ed-segmented compact .options=${g} .value=${r ?? ""} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(D) => this.setTank(o, D.detail.value)}></ed-segmented>` : M}
          </div>
        </div>
        ${o ? v`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${m ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${A}</span>
                <svg class="chevron ${m ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${et.expand}></path></svg>
              </button>
              <div class="fold ${m ? "open" : ""}" ?inert=${!m}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : h ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${f === void 0 ? T : R(f)}<small> °C</small></span>
                    <ed-slider
                      .min=${x} .max=${_} .step=${n.temp_step} .tickStep=${5} .value=${f ?? x}
                      label=${e.tank.sliderLabel} valueText=${p === void 0 ? e.noData : e.tank.sliderSpoken(`${p} °C`)}
                      minLabel="${R(x)} °C" maxLabel="${R(_)} °C"
                      ?disabled=${p === void 0 || l}
                      @hdk-change=${(D) => this.setTankTemperature(o, D.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : M}
      </div>`;
  }
}, Da = class Da extends gi(di(li(ai(qo(jo(_o(X))))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return M;
    const e = Fn(this.hass, t, this.t), s = t.colors, n = `--ed-sun:${s.sun};--ed-battery:${s.battery};--ed-grid:${s.grid};--ed-house:${s.house};--ed-car:${s.car};--ed-boiler:${s.boiler};--ed-discharge:${s.discharge};--ed-accent:${s.accent};--ed-warning:${s.warning};--ed-off:${s.neutral}`;
    return this._batDetail ? v`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderBatteryDetail(t, e)}</div>` : this._houseDetail ? v`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderHouseDetail(t, e)}</div>` : this._sunDetail ? v`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderSunDetail(t, e)}</div>` : v`<div class="page" style=${n} @keydown=${this.onKey}>
      <!-- No title: the name of the dashboard is already at the top (uživatel 12. 11. 2026: „nechci title … To zrus“). -->
      ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
Da.styles = [$s, Gn];
let ra = Da;
wn("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", ra);
window.customCards = window.customCards ?? [];
window.customCards.some((a) => a.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Ne(Tn()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.2.3 · 2026-11-13 18:21 UTC · po 24ae282 ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
