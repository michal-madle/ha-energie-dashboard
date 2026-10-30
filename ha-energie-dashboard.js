const se = globalThis, Ce = se.ShadowRoot && (se.ShadyCSS === void 0 || se.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, De = /* @__PURE__ */ Symbol(), Ue = /* @__PURE__ */ new WeakMap();
let wa = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== De) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ce && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Ue.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Ue.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Fa = (a) => new wa(typeof a == "string" ? a : a + "", void 0, De), Yt = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, n, i) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + a[i + 1], a[0]);
  return new wa(e, a, De);
}, Ua = (a, t) => {
  if (Ce) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = se.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, a.appendChild(s);
  }
}, Ve = Ce ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Fa(e);
})(a) : a;
const { is: Va, defineProperty: Ga, getOwnPropertyDescriptor: Ka, getOwnPropertyNames: Za, getOwnPropertySymbols: Ya, getPrototypeOf: qa } = Object, ue = globalThis, Ge = ue.trustedTypes, Ja = Ge ? Ge.emptyScript : "", Xa = ue.reactiveElementPolyfillSupport, Ut = (a, t) => a, ie = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Ja : null;
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
} }, Le = (a, t) => !Va(a, t), Ke = { attribute: !0, type: String, converter: ie, reflect: !1, useDefault: !1, hasChanged: Le };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), ue.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let At = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ke) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Ga(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: i } = Ka(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: n, set(o) {
      const r = n?.call(this);
      i?.call(this, o), this.requestUpdate(t, r, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ke;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ut("elementProperties"))) return;
    const t = qa(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ut("properties"))) {
      const e = this.properties, s = [...Za(e), ...Ya(e)];
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
      for (const n of s) e.unshift(Ve(n));
    } else t !== void 0 && e.push(Ve(t));
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
    return Ua(t, this.constructor.elementStyles), t;
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
      const i = (s.converter?.toAttribute !== void 0 ? s.converter : ie).toAttribute(e, s.type);
      this._$Em = t, i == null ? this.removeAttribute(n) : this.setAttribute(n, i), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const i = s.getPropertyOptions(n), o = typeof i.converter == "function" ? { fromAttribute: i.converter } : i.converter?.fromAttribute !== void 0 ? i.converter : ie;
      this._$Em = n;
      const r = o.fromAttribute(e, i.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, i) {
    if (t !== void 0) {
      const o = this.constructor;
      if (n === !1 && (i = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? Le)(i, e) || s.useDefault && s.reflect && i === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: n, wrapped: i }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), i !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), n === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
At.elementStyles = [], At.shadowRootOptions = { mode: "open" }, At[Ut("elementProperties")] = /* @__PURE__ */ new Map(), At[Ut("finalized")] = /* @__PURE__ */ new Map(), Xa?.({ ReactiveElement: At }), (ue.reactiveElementVersions ??= []).push("2.1.2");
const Ae = globalThis, Ze = (a) => a, oe = Ae.trustedTypes, Ye = oe ? oe.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, ka = "$lit$", kt = `lit$${Math.random().toFixed(9).slice(2)}$`, _a = "?" + kt, Qa = `<${_a}>`, Dt = document, Gt = () => Dt.createComment(""), Kt = (a) => a === null || typeof a != "object" && typeof a != "function", Ee = Array.isArray, ts = (a) => Ee(a) || typeof a?.[Symbol.iterator] == "function", fe = `[ 	
\f\r]`, Wt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qe = /-->/g, Je = />/g, Mt = RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xe = /'/g, Qe = /"/g, Sa = /^(?:script|style|textarea|title)$/i, Ma = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), m = Ma(1), I = Ma(2), Ht = /* @__PURE__ */ Symbol.for("lit-noChange"), L = /* @__PURE__ */ Symbol.for("lit-nothing"), ta = /* @__PURE__ */ new WeakMap(), Tt = Dt.createTreeWalker(Dt, 129);
function Ta(a, t) {
  if (!Ee(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ye !== void 0 ? Ye.createHTML(t) : t;
}
const es = (a, t) => {
  const e = a.length - 1, s = [];
  let n, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Wt;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let c, d, p = -1, h = 0;
    for (; h < l.length && (o.lastIndex = h, d = o.exec(l), d !== null); ) h = o.lastIndex, o === Wt ? d[1] === "!--" ? o = qe : d[1] !== void 0 ? o = Je : d[2] !== void 0 ? (Sa.test(d[2]) && (n = RegExp("</" + d[2], "g")), o = Mt) : d[3] !== void 0 && (o = Mt) : o === Mt ? d[0] === ">" ? (o = n ?? Wt, p = -1) : d[1] === void 0 ? p = -2 : (p = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? Mt : d[3] === '"' ? Qe : Xe) : o === Qe || o === Xe ? o = Mt : o === qe || o === Je ? o = Wt : (o = Mt, n = void 0);
    const v = o === Mt && a[r + 1].startsWith("/>") ? " " : "";
    i += o === Wt ? l + Qa : p >= 0 ? (s.push(c), l.slice(0, p) + ka + l.slice(p) + kt + v) : l + kt + (p === -2 ? r : v);
  }
  return [Ta(a, i + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class Zt {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let i = 0, o = 0;
    const r = t.length - 1, l = this.parts, [c, d] = es(t, e);
    if (this.el = Zt.createElement(c, s), Tt.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (n = Tt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const p of n.getAttributeNames()) if (p.endsWith(ka)) {
          const h = d[o++], v = n.getAttribute(p).split(kt), y = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: i, name: y[2], strings: v, ctor: y[1] === "." ? ss : y[1] === "?" ? ns : y[1] === "@" ? is : be }), n.removeAttribute(p);
        } else p.startsWith(kt) && (l.push({ type: 6, index: i }), n.removeAttribute(p));
        if (Sa.test(n.tagName)) {
          const p = n.textContent.split(kt), h = p.length - 1;
          if (h > 0) {
            n.textContent = oe ? oe.emptyScript : "";
            for (let v = 0; v < h; v++) n.append(p[v], Gt()), Tt.nextNode(), l.push({ type: 2, index: ++i });
            n.append(p[h], Gt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === _a) l.push({ type: 2, index: i });
      else {
        let p = -1;
        for (; (p = n.data.indexOf(kt, p + 1)) !== -1; ) l.push({ type: 7, index: i }), p += kt.length - 1;
      }
      i++;
    }
  }
  static createElement(t, e) {
    const s = Dt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Pt(a, t, e = a, s) {
  if (t === Ht) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const i = Kt(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== i && (n?._$AO?.(!1), i === void 0 ? n = void 0 : (n = new i(a), n._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = Pt(a, n._$AS(a, t.values), n, s)), t;
}
class as {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? Dt).importNode(e, !0);
    Tt.currentNode = n;
    let i = Tt.nextNode(), o = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new qt(i, i.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (c = new os(i, this, t)), this._$AV.push(c), l = s[++r];
      }
      o !== l?.index && (i = Tt.nextNode(), o++);
    }
    return Tt.currentNode = Dt, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class qt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = L, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = Pt(this, t, e), Kt(t) ? t === L || t == null || t === "" ? (this._$AH !== L && this._$AR(), this._$AH = L) : t !== this._$AH && t !== Ht && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ts(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== L && Kt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Dt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = Zt.createElement(Ta(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const i = new as(n, this), o = i.u(this.options);
      i.p(e), this.T(o), this._$AH = i;
    }
  }
  _$AC(t) {
    let e = ta.get(t.strings);
    return e === void 0 && ta.set(t.strings, e = new Zt(t)), e;
  }
  k(t) {
    Ee(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const i of t) n === e.length ? e.push(s = new qt(this.O(Gt()), this.O(Gt()), this, this.options)) : s = e[n], s._$AI(i), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Ze(t).nextSibling;
      Ze(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class be {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, i) {
    this.type = 1, this._$AH = L, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = i, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = L;
  }
  _$AI(t, e = this, s, n) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) t = Pt(this, t, e, 0), o = !Kt(t) || t !== this._$AH && t !== Ht, o && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = i[0], l = 0; l < i.length - 1; l++) c = Pt(this, r[s + l], e, l), c === Ht && (c = this._$AH[l]), o ||= !Kt(c) || c !== this._$AH[l], c === L ? t = L : t !== L && (t += (c ?? "") + i[l + 1]), this._$AH[l] = c;
    }
    o && !n && this.j(t);
  }
  j(t) {
    t === L ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ss extends be {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === L ? void 0 : t;
  }
}
class ns extends be {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== L);
  }
}
class is extends be {
  constructor(t, e, s, n, i) {
    super(t, e, s, n, i), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Pt(this, t, e, 0) ?? L) === Ht) return;
    const s = this._$AH, n = t === L && s !== L || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, i = t !== L && (s === L || n);
    n && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class os {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Pt(this, t);
  }
}
const rs = Ae.litHtmlPolyfillSupport;
rs?.(Zt, qt), (Ae.litHtmlVersions ??= []).push("3.3.3");
const ls = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const i = e?.renderBefore ?? null;
    s._$litPart$ = n = new qt(t.insertBefore(Gt(), i), i, void 0, e ?? {});
  }
  return n._$AI(a), n;
};
const Be = globalThis;
class _t extends At {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ls(e, this.renderRoot, this.renderOptions);
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
_t._$litElement$ = !0, _t.finalized = !0, Be.litElementHydrateSupport?.({ LitElement: _t });
const ds = Be.litElementPolyfillSupport;
ds?.({ LitElement: _t });
(Be.litElementVersions ??= []).push("4.2.2");
const cs = { attribute: !0, type: String, converter: ie, reflect: !1, hasChanged: Le }, hs = (a = cs, t, e) => {
  const { kind: s, metadata: n } = e;
  let i = globalThis.litPropertyMetadata.get(n);
  if (i === void 0 && globalThis.litPropertyMetadata.set(n, i = /* @__PURE__ */ new Map()), s === "setter" && ((a = Object.create(a)).wrapped = !0), i.set(e.name, a), s === "accessor") {
    const { name: o } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(o, l, a, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(o, void 0, a, r), r;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(r) {
      const l = this[o];
      t.call(this, r), this.requestUpdate(o, l, a, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function W(a) {
  return (t, e) => typeof e == "object" ? hs(a, t, e) : ((s, n, i) => {
    const o = n.hasOwnProperty(i);
    return n.constructor.createProperty(i, s), o ? Object.getOwnPropertyDescriptor(n, i) : void 0;
  })(a, t, e);
}
function G(a) {
  return W({ ...a, state: !0, attribute: !1 });
}
class je {
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
class Ca {
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
const Da = Yt`
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
var ps = Object.defineProperty, bt = (a, t, e, s) => {
  for (var n = void 0, i = a.length - 1, o; i >= 0; i--)
    (o = a[i]) && (n = o(t, e, n) || n);
  return n && ps(t, e, n), n;
};
const Ne = class Ne extends _t {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Ca(this), this.nudgeIndex = 0, this.gesture = new je(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), s = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, i = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, o = this._dragging ? this._dx : i;
    return m`<div
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
      (r, l) => m`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === s ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(c) => this.onClick(c, r.value, l)}
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
    const n = t.target.closest("button[data-index]"), i = n ? Number(n.dataset.index) : -1, o = i >= 0 && i !== s && !this.options[i]?.disabled;
    this.gesture.start(() => {
      o && (this.drag = void 0, this.select(this.options[i].value));
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
    const n = s.findIndex((r) => r.value === this.value), i = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, o = s[(n + i + s.length) % s.length];
    t.preventDefault(), this.select(o.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${o.value}"]`)?.focus());
  }
};
Ne.styles = [
  Da,
  Yt`
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
let ot = Ne;
bt([
  W({ attribute: !1 })
], ot.prototype, "options");
bt([
  W()
], ot.prototype, "value");
bt([
  W()
], ot.prototype, "label");
bt([
  W({ type: Boolean })
], ot.prototype, "disabled");
bt([
  W({ type: Boolean })
], ot.prototype, "compact");
bt([
  W({ type: Boolean })
], ot.prototype, "guarded");
bt([
  W({ type: Number })
], ot.prototype, "holdMs");
bt([
  W({ type: Number })
], ot.prototype, "doubleTapMs");
bt([
  W({ type: Number })
], ot.prototype, "hintSeconds");
bt([
  W()
], ot.prototype, "hint");
bt([
  G()
], ot.prototype, "_dx");
bt([
  G()
], ot.prototype, "_dragging");
var us = Object.defineProperty, gt = (a, t, e, s) => {
  for (var n = void 0, i = a.length - 1, o; i >= 0; i--)
    (o = a[i]) && (n = o(t, e, n) || n);
  return n && us(t, e, n), n;
};
const We = class We extends _t {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, n = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, i = this.tickStep || this.step || 1, o = Math.floor(e / i + 1e-9) + 1, r = o >= 2 && o <= 40 ? Array.from({ length: o }, (l, c) => m`<i style="left:${(c * i / e * 100).toFixed(2)}%"></i>`) : [];
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
        <div class="ticks" aria-hidden="true">${r}</div>
      </div>
      ${this.minLabel || this.maxLabel ? m`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
We.styles = Yt`
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
let dt = We;
gt([
  W({ type: Number })
], dt.prototype, "min");
gt([
  W({ type: Number })
], dt.prototype, "max");
gt([
  W({ type: Number })
], dt.prototype, "step");
gt([
  W({ type: Number })
], dt.prototype, "tickStep");
gt([
  W({ type: Number })
], dt.prototype, "value");
gt([
  W()
], dt.prototype, "label");
gt([
  W()
], dt.prototype, "valueText");
gt([
  W()
], dt.prototype, "minLabel");
gt([
  W()
], dt.prototype, "maxLabel");
gt([
  W({ type: Boolean })
], dt.prototype, "disabled");
gt([
  G()
], dt.prototype, "_drag");
var bs = Object.defineProperty, wt = (a, t, e, s) => {
  for (var n = void 0, i = a.length - 1, o; i >= 0; i--)
    (o = a[i]) && (n = o(t, e, n) || n);
  return n && bs(t, e, n), n;
};
const Ie = class Ie extends _t {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Ca(this), this.gesture = new je(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
    const e = this.gesture.tap("switch", t.timeStamp);
    e === "double" ? this.emit() : e === "single" && this.hints.show(this.hintSeconds);
  }
};
Ie.styles = [
  Da,
  Yt`
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
let ut = Ie;
wt([
  W({ type: Boolean })
], ut.prototype, "checked");
wt([
  W({ type: Boolean })
], ut.prototype, "disabled");
wt([
  W()
], ut.prototype, "label");
wt([
  W({ type: Boolean })
], ut.prototype, "guarded");
wt([
  W({ type: Number })
], ut.prototype, "holdMs");
wt([
  W({ type: Number })
], ut.prototype, "doubleTapMs");
wt([
  W({ type: Number })
], ut.prototype, "hintSeconds");
wt([
  W()
], ut.prototype, "hintPlacement");
wt([
  W()
], ut.prototype, "hint");
function gs(a) {
  const t = [
    [`${a}-switch`, ut],
    [`${a}-segmented`, ot],
    [`${a}-slider`, dt]
  ];
  for (const [e, s] of t)
    customElements.get(e) || customElements.define(e, s);
}
const fs = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function ms(a) {
  return fs.has(a);
}
function it(a, t) {
  return t ? a?.states?.[t] : void 0;
}
function ht(a, t) {
  const e = it(a, t)?.state;
  return e === void 0 || ms(e) ? void 0 : e;
}
function vs(a, t) {
  const e = ht(a, t);
  if (e === void 0)
    return;
  const s = Number(e);
  return Number.isFinite(s) ? s : void 0;
}
function La(a) {
  return (a?.locale?.language || a?.language || "").trim();
}
function ze(a) {
  const t = a.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function ys(a, t) {
  return a === "auto" ? ze(La(t)) : a;
}
function $s() {
  return ze(document.documentElement.lang || navigator.language || "");
}
const ea = /* @__PURE__ */ new WeakMap(), xs = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, ws = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), ks = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function me(a, t) {
  const e = a?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function _s(a, t, e) {
  const s = La(e).replace("_", "-"), n = s !== "" && ze(s) === t ? s : xs[t], i = me(e, "number_format"), o = me(e, "time_format"), r = me(e, "date_format"), l = [t, n, i, o, r].join("|");
  let c = ea.get(a);
  c || (c = /* @__PURE__ */ new Map(), ea.set(a, c));
  let d = c.get(l);
  return d || (d = Ts(a[t], t, n, i, o, r), c.set(l, d)), d;
}
function Ss(a) {
  try {
    return new Intl.NumberFormat(a), a;
  } catch {
    return "en";
  }
}
function Ms(a, t) {
  if (a === "12")
    return !0;
  if (a === "24")
    return !1;
  const e = a === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function Ts(a, t, e, s, n, i) {
  const o = Ss(e), r = s === "system" ? void 0 : s === "none" ? "en-US" : ks[s] ?? o, l = s === "none" ? { useGrouping: !1 } : {}, c = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), d = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), v = Ms(n, o), y = v ? "h12" : "h23", b = new Intl.DateTimeFormat(o, { hour: v ? "numeric" : "2-digit", minute: "2-digit", hourCycle: y }), f = new Intl.DateTimeFormat(o, v ? { hour: "numeric", hourCycle: y } : { hour: "2-digit", minute: "2-digit", hourCycle: y }), g = i === "system" ? void 0 : o, u = new Intl.DateTimeFormat(g, { day: "numeric", month: "numeric" }), x = ($) => {
    if (!["DMY", "MDY", "YMD"].includes(i))
      return u.format($);
    const w = u.formatToParts($), j = w.find((M) => M.type === "literal")?.value ?? "/", B = w[w.length - 1], E = B?.type === "literal" ? B.value : "", D = w.find((M) => M.type === "day")?.value ?? "", k = w.find((M) => M.type === "month")?.value ?? "";
    return i === "DMY" ? `${D}${j}${k}${E}` : `${k}${j}${D}${E}`;
  }, A = ws.has(o.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: o,
    t: a,
    one: ($) => c.format($),
    two: ($) => d.format($),
    half: ($) => p.format(Math.round($ * 2) / 2),
    tick: ($) => p.format($),
    whole: ($) => h.format($),
    percent: ($) => `${$}${A}%`,
    time: ($) => b.format($),
    hour: ($) => f.format($),
    day: x
  };
}
const Cs = {
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
    houseTakes: (a) => `Dům bere ${a}`
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
    fromCar: (a) => `z auta ${a}`,
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
    setManually: "nastaveno ručně",
    byPlan: "podle plánu",
    summaryOff: (a) => `${a} · vypnuto`,
    summaryManual: (a) => `${a} · ručně`,
    summaryPlan: (a) => `${a} · podle plánu`,
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
    trendLabel: "Výkon baterie dnes od půlnoci",
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
    chartLabel: "Výkon slunce dnes",
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
      hoursMinutes: (a, t) => `${a} h ${t} min`,
      sourceForecast: "podle předpovědi",
      sourcePace: "podle tempa dne"
    }
  }
}, Ds = {
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
    houseTakes: (a) => `The house takes energy ${a}`
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
    fromCar: (a) => `from the car ${a}`,
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
    keepsMinimum: "the boiler keeps the minimum",
    setManually: "set manually",
    byPlan: "by schedule",
    summaryOff: (a) => `${a} · off`,
    summaryManual: (a) => `${a} · manual`,
    summaryPlan: (a) => `${a} · by schedule`,
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
    trendLabel: "Battery power today since midnight",
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
    chartLabel: "Solar power today",
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
      hoursMinutes: (a, t) => `${a} h ${t} min`,
      sourceForecast: "from the forecast",
      sourcePace: "from the pace of the day"
    }
  }
}, Ls = {
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
    houseTakes: (a) => `Huset tar energi ${a}`
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
    fromCar: (a) => `från bilen ${a}`,
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
    targets: "Måltemperaturer",
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
    setManually: "inställd manuellt",
    byPlan: "enligt schema",
    summaryOff: (a) => `${a} · av`,
    summaryManual: (a) => `${a} · manuellt`,
    summaryPlan: (a) => `${a} · enligt schema`,
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
    trendLabel: "Batteriets effekt idag sedan midnatt",
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
    chartLabel: "Soleffekt idag",
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
      hoursMinutes: (a, t) => `${a} h ${t} min`,
      sourceForecast: "enligt prognosen",
      sourcePace: "enligt dagens takt"
    }
  }
}, As = { cs: Cs, en: Ds, sv: Ls };
function re(a, t) {
  return _s(As, a, t);
}
function V(a, t) {
  const e = vs(a, t);
  if (e !== void 0)
    return it(a, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let et = re("cs"), le = "auto";
function Es(a, t = "auto") {
  et = a, le = t;
}
function Oe(a, t = 1e3) {
  return a.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function Aa(a) {
  const t = le === "auto" ? Math.abs(Math.round(a * 100) / 100) < 10 ? 2 : Math.abs(Math.round(a * 10) / 10) < 100 ? 1 : 0 : le;
  return t === 2 ? et.two(a) : t === 1 ? et.one(a) : et.whole(a);
}
function Q(a, t) {
  return t === "kW" ? `${Aa(a / 1e3)} kW` : `${et.whole(Math.round(a))} W`;
}
function O(a, t = 0) {
  return t === 0 ? et.whole(a) : et.one(a);
}
function N(a, t) {
  if (t === 0) return et.whole(a);
  if (t === 1) return et.one(a);
  if (t === 2) return et.two(a);
  const e = et.one(1.5).charAt(1), s = 10 ** t, n = Math.round(Math.abs(a) * s);
  return `${a < 0 && n > 0 ? "−" : ""}${et.whole(Math.floor(n / s))}${e}${String(n % s).padStart(t, "0")}`;
}
function Et(a) {
  return `${new Intl.DateTimeFormat(et.locale, { weekday: "short" }).format(a)} ${et.day(a)}`;
}
function aa(a) {
  const t = new Intl.DateTimeFormat(et.locale, { weekday: "long" }).format(a);
  return t.charAt(0).toLocaleUpperCase(et.locale) + t.slice(1);
}
function nt(a) {
  return et.time(a);
}
function R(a) {
  return et.percent(typeof a == "number" ? O(a) : a);
}
function Ot(a, t) {
  const e = it(a, t), s = ht(a, t);
  if (s === void 0) return;
  const n = Number(s);
  if (!Number.isFinite(n)) return;
  const i = e?.attributes?.unit_of_measurement;
  return i === "Wh" ? n / 1e3 : i === "MWh" ? n * 1e3 : n;
}
function at(a) {
  return a < (le === 1 ? 0.05 : 5e-3) ? "0" : Aa(a);
}
function Bs(a, t, e) {
  const s = a ? Date.parse(a) : NaN;
  if (!Number.isFinite(s)) return;
  const n = Math.max(0, Math.round((t - s) / 6e4));
  return n < 1 ? e.ago.now : n < 60 ? e.ago.minutes(n) : n < 1440 ? e.ago.hours(Math.round(n / 60)) : e.ago.days(Math.round(n / 1440));
}
const pt = ["sun", "bat", "grid"], Bt = ["house", "car", "boil", "batIn", "gridOut"], Xt = (a) => a === void 0 ? void 0 : Math.max(0, a), q = (a, t) => a !== void 0 && a >= t;
function Ea(a) {
  if (a === "Disconnected") return "disconnected";
  if (a === "Waiting") return "connected";
  if (a === "Charging") return "charging";
}
function js(a, t, e) {
  const s = t.entities, n = t.num.flows.idle_threshold, i = Xt(V(a, s.pv.power)), o = V(a, s.battery.power), r = V(a, s.grid.power), l = Xt(V(a, s.house.power)), c = Xt(V(a, s.wallbox.power)), d = Xt(V(a, s.boiler.power)), p = o === void 0 ? void 0 : Math.max(0, o), h = o === void 0 ? void 0 : Math.max(0, -o), v = r === void 0 ? void 0 : Math.max(0, -r), y = r === void 0 ? void 0 : Math.max(0, r), b = l === void 0 ? void 0 : Math.max(0, l - (c ?? 0) - (d ?? 0)), f = (D) => q(D, n) ? D : 0, g = {
    sun: Math.max(0, f(i) - f(h) - f(y)),
    bat: f(p),
    grid: f(v)
  }, u = g.sun + g.bat + g.grid, x = { sun: 0, bat: 0, grid: 0 };
  if (u > 0)
    for (const D of pt) x[D] = g[D] / u;
  const A = [], $ = { house: { ...x }, car: { ...x }, boil: { ...x } }, w = [
    ["house", b],
    ["car", c],
    ["boil", d]
  ], j = w.reduce((D, [, k]) => D + (q(k, n) ? k : 0), 0), B = { sun: 0, bat: 0, grid: 0 };
  for (const D of pt) B[D] = u > 0 ? g[D] * j / u : 0;
  for (const [D, k] of w) {
    if (!q(k, n)) continue;
    let M = k;
    const z = { sun: 0, bat: 0, grid: 0 };
    for (const _ of pt) {
      const S = Math.min(B[_], M);
      B[_] -= S, M -= S, z[_] = S / k, S > 0.5 && A.push({ from: _, to: D, watts: S });
    }
    z.sun + z.bat + z.grid > 0 && ($[D] = z);
  }
  q(h, n) && A.push({ from: "sun", to: "batIn", watts: h }), q(y, n) && A.push({ from: "sun", to: "gridOut", watts: y });
  const E = {
    sun: i,
    batDis: p,
    batIn: h,
    imp: v,
    exp: y,
    other: b,
    car: c,
    boil: d,
    share: x,
    loadShare: $,
    flows: A,
    soc: V(a, s.battery.state_of_charge),
    carSoc: V(a, s.car.state_of_charge),
    carRange: V(a, s.car.range),
    boilTemp: V(a, s.boiler.temperature),
    carLink: Ea(ht(a, s.wallbox.status))
  };
  return Object.assign(E, zs(E, t.num.flows, e)), E;
}
function zs(a, t, e) {
  const s = t.idle_threshold, n = (h) => q(h, s);
  if ([a.sun, a.batDis, a.imp, a.other].every((h) => h === void 0)) return {};
  if (n(a.sun) && !n(a.imp) && !n(a.batDis)) {
    let h;
    return (a.exp ?? 0) > t.export_notice && !n(a.batIn) ? h = e.summary.exportSurplus : n(a.car) ? h = e.summary.sunChargesCar(n(a.batIn)) : n(a.batIn) ? h = e.summary.sunChargesBattery : h = e.summary.sunCoversHouse, { summary: h, summarySource: "sun" };
  }
  const { sun: r, bat: l, grid: c } = a.loadShare.house;
  if (c > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const d = t.source_min_share / 100;
  if (r < d && c < d && l > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const p = ja(a.loadShare.house, d);
  return p.length ? { summary: e.summary.houseTakes(Ba(p, e)), summarySource: p[0] } : { summary: e.summary.nothing };
}
function Ba(a, t) {
  return t.from[a[0]] + a.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function ja(a, t) {
  return pt.filter((e) => a[e] >= t).sort((e, s) => a[s] - a[e]);
}
function za(a, t, e) {
  let s = ja(a, t.source_min_share / 100);
  s.length || (s = ["sun"]);
  const n = a.grid > t.grid_deviation_share / 100;
  return { text: Ba(s, e), main: n ? "grid" : s[0], deviation: n };
}
function Os(a, t) {
  if (!(a === void 0 || t === void 0))
    return a === "off" && t === "on" ? "on" : a === "on" && t === "off" ? "off" : "unclear";
}
const Hs = Yt`
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
`, Ps = ["cs", "en", "sv"];
class Oa extends Error {
}
function J(a) {
  throw new Oa(a);
}
function Rs(a, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Oa ? new Error(`${a}: ${e.message}`) : e;
  }
}
function He(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function vt(a, t) {
  return a == null ? {} : (He(a) || J(`"${t}" must be a mapping of keys.`), a);
}
function Jt(a, t, e) {
  for (const s of Object.keys(a))
    t.includes(s) || J(`${e}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function Ns(a, t, e = {}) {
  if (a == null)
    return;
  const s = typeof a == "string" ? a.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || J(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !s.startsWith(`${e.domain}.`) && J(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${s}.`), s;
}
const sa = ["auto", ...Ps];
function Ws(a) {
  const t = a ?? "auto";
  return sa.includes(t) || J(`language must be one of ${sa.join(", ")}.`), t;
}
const ge = {
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
  car: { state_of_charge: void 0, range: void 0, capacity: void 0, image: "image" },
  wallbox: { power: void 0, status: void 0, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch" },
  forecast: { energy_today: void 0, energy_tomorrow: void 0, energy_day_2: void 0, energy_day_3: void 0, energy_day_4: void 0, weather: "weather" },
  daily: { pv_generation: void 0, battery_charge: void 0, battery_discharge: void 0, grid_import: void 0, grid_export: void 0, car: void 0, boiler: void 0 }
}, Ha = { boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"], forecast: ["default_range"] }, na = ["1d", "7d", "30d"], Is = "1d", ia = ["7d", "30d"], Fs = "7d", oa = ["always", "heating"], Us = "heating", ra = ["auto", 1, 2], Vs = "auto", Pa = Object.keys(ge), H = (a, t, e, s, n = !1) => ({ value: a, min: t, max: e, what: s, integer: n }), Pe = {
  battery: {
    reserve: H(20, 0, 100, "% battery reserve"),
    capacity: H(11.2, 0.1, 1e3, "kWh usable capacity (time estimates, equivalent cycles, load in C)"),
    imbalance_good: H(15, 0, 1e3, "mV cell imbalance up to which it is called excellent"),
    imbalance_warn: H(30, 0, 1e3, "mV cell imbalance up to which it is called good (above it needs attention)"),
    imbalance_fault: H(100, 0, 1e3, "mV cell imbalance above which it is called a fault")
  },
  car: {
    charge_limit: H(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)"),
    image_scale: H(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)")
  },
  wallbox: {
    phases: H(3, 1, 3, "number of phases", !0),
    power_min: H(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: H(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: H(300, 1, 1e5, "W, step of the charging power (all phases)"),
    priority_min_sun: H(200, 0, 1e5, "W of sun above which a waiting car is reported")
  },
  boiler: {
    target_min: H(20, 0, 100, "°C, lowest target"),
    target_max: H(85, 0, 100, "°C, highest target"),
    target_step: H(5, 1, 50, "°C, target step"),
    hold_minutes: H(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)")
  },
  water: {
    gauge_min: H(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: H(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)")
  },
  tank: {
    temp_min: H(38, 0, 100, "°C, lowest temperature"),
    temp_max: H(65, 0, 100, "°C, highest temperature"),
    temp_step: H(1, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: H(100, 0, 1e3, "W, below this a flow counts as none"),
    kw_from: H(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    export_notice: H(300, 0, 1e5, "W of export that counts as a surplus"),
    source_min_share: H(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: H(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: H(10, 0.5, 50, "px per kW, thickness of the bands"),
    band_min_px: H(1.6, 0.5, 10, "px, thinnest band")
  },
  forecast: {
    good_power: H(2e3, 100, 1e5, "W of sun from which an hour counts as strong (the filled blocks of the five days, the window)"),
    good_day: H(10, 0.1, 1e3, "kWh a day from which a day counts as good (Historie)"),
    learn_days: H(14, 3, 90, "days the curve of what is possible and the typical deviation of the forecast are learned from", !0),
    possible_percentile: H(90, 50, 100, "% percentile of the days that sets what is possible in an hour"),
    typical_deviation: H(20, 1, 100, "% deviation of the forecast assumed until the card has seen enough days"),
    strip_from: H(6, 0, 23, "hour the hourly strips start at", !0),
    strip_to: H(17, 1, 24, "hour the hourly strips end at (the hour itself is the last block)", !0),
    evening_hour: H(22, 12, 23, "hour the evening battery level is estimated for", !0),
    morning_hour: H(6, 0, 11, "hour the night ends at (the battery level in the morning)", !0),
    car_start_soc: H(50, 0, 100, "% battery level from which the wallbox is started in the evening estimate"),
    car_stop_soc: H(30, 0, 100, "% battery level at which the wallbox is stopped in the evening estimate"),
    car_min_sun: H(2e3, 0, 1e5, "W of sun from which the wallbox is started in the evening estimate"),
    efficiency: H(95, 50, 100, "% efficiency of the battery in one direction")
  },
  scale: {
    sun: H(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: H(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: H(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: H(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: H(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: H(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: {
    revert_after: H(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: H(550, 200, 3e3, "ms to hold a protected control to switch it", !0),
    double_tap_ms: H(400, 150, 1e3, "ms between the two taps of a double tap", !0),
    hint_seconds: H(3, 1, 10, "s the hint of a protected control stays")
  }
}, ne = {
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
}, Gs = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], Se = ["electricity", "car", "water"];
[
  ...Pa.flatMap((a) => Object.keys(ge[a]).map((t) => `${a}.${t}`)),
  ...Object.entries(Pe).flatMap(([a, t]) => Object.keys(t).map((e) => `${a}.${e}`)),
  ...Se.map((a) => `titles.${a}`),
  ...Object.keys(ne).map((a) => `colors.${a}`)
];
function Ks(a, t) {
  const e = vt(a[t], t), s = ge[t], n = [...Object.keys(Pe[t] ?? {}), ...Ha[t] ?? []];
  Jt(e, [...Object.keys(s), ...n], t);
  const i = {};
  for (const [o, r] of Object.entries(s)) {
    const l = Ns(e[o], `${t}.${o}`, { domain: r });
    l && (i[o] = l);
  }
  return i;
}
function Zs(a) {
  const t = {};
  for (const [e, s] of Object.entries(Pe)) {
    const n = vt(a[e], e), i = Object.keys(ge[e] ?? {});
    Jt(n, [...i, ...Object.keys(s), ...Ha[e] ?? []], e), t[e] = {};
    for (const [o, r] of Object.entries(s)) {
      const l = n[o], c = `${e}.${o}`;
      if (l == null) {
        t[e][o] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && J(`${c} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && J(`${c} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][o] = l;
    }
  }
  return t;
}
function Ys(a) {
  const t = vt(a.colors, "colors");
  Jt(t, [...Object.keys(ne), "temp_scale"], "colors");
  const e = { ...ne };
  for (const s of Object.keys(ne)) {
    const n = t[s];
    n != null && ((typeof n != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.trim())) && J(`colors.${s} must be a colour like #FFD60A (six hex digits).`), e[s] = n.trim().toUpperCase());
  }
  return e;
}
function qs(a) {
  const t = vt(a.colors, "colors").temp_scale;
  if (t == null)
    return Gs.map((n) => ({ ...n }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && J(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const s = t.map((n, i) => (He(n) || J(`${e}[${i}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Jt(n, ["temp", "color"], `${e}[${i}]`), (typeof n.temp != "number" || !Number.isFinite(n.temp)) && J(`${e}[${i}].temp must be a number (°C).`), (typeof n.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.color.trim())) && J(`${e}[${i}].color must be a colour like #0A84FF (six hex digits).`), { temp: n.temp, color: n.color.trim().toUpperCase() }));
  return s.forEach((n, i) => {
    i > 0 && n.temp <= s[i - 1].temp && J(`${e}: temperatures must rise (${s[i - 1].temp} is followed by ${n.temp}).`);
  }), s;
}
function Js(a) {
  const t = vt(a.boiler, "boiler").show;
  return t == null ? Us : ((typeof t != "string" || !oa.includes(t)) && J(`boiler.show must be one of ${oa.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Xs(a) {
  const t = vt(a.battery, "battery").default_range;
  return t == null ? Is : ((typeof t != "string" || !na.includes(t)) && J(`battery.default_range must be one of ${na.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Qs(a) {
  const t = vt(a.forecast, "forecast").default_range;
  return t == null ? Fs : ((typeof t != "string" || !ia.includes(t)) && J(`forecast.default_range must be one of ${ia.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function tn(a) {
  const t = vt(a.flows, "flows").decimals;
  return t == null ? Vs : (ra.includes(t) || J(`flows.decimals must be one of ${ra.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const en = "/dashboard-bmw";
function an(a) {
  const t = vt(a.car, "car").link;
  return t == null ? en : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && J(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function sn(a) {
  const t = vt(a.titles, "titles");
  Jt(t, [...Se], "titles");
  const e = {};
  for (const s of Se) {
    const n = t[s];
    n != null && ((typeof n != "string" || n.trim() === "") && J(`titles.${s} must be a non-empty text.`), e[s] = n.trim());
  }
  return e;
}
function nn(a) {
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
  for (const [e, s, n, i, o] of t)
    (o ? e >= s : e > s) && J(`${n} (${e}) must be ${o ? "below" : "at most"} ${i} (${s}).`);
}
function on(a) {
  return Rs("Energie Dashboard", () => rn(a));
}
function rn(a) {
  He(a) || J("the configuration must be a mapping of keys."), a.title != null && typeof a.title != "string" && J("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(Pa.map((n) => [n, Ks(a, n)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && J("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = Zs(a);
  nn(e);
  const s = Ws(a.language);
  return { title: a.title ?? void 0, language: s, entities: t, titles: sn(a), num: e, colors: Ys(a), tempScale: qs(a), boilerShow: Js(a), powerDecimals: tn(a), carLink: an(a), batteryRange: Xs(a), sunRange: Qs(a) };
}
const T = "––", ft = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, jt = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, la = "ha-energie-dashboard:boiler-heating", da = "ha-energie-dashboard:battery-range", ca = "ha-energie-dashboard:sun-range";
function xt(a, t) {
  const e = a?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function ln(a) {
  const t = a.reduce((i, o) => i + o, 0);
  if (t <= 0) return a.map(() => 0);
  const e = a.map((i) => i / t * 100), s = e.map(Math.floor);
  let n = 100 - s.reduce((i, o) => i + o, 0);
  return e.map((i, o) => ({ index: o, rest: i - s[o] })).sort((i, o) => o.rest - i.rest).forEach(({ index: i }) => {
    n-- > 0 && s[i]++;
  }), s;
}
const F = (a, t, e) => Math.max(t, Math.min(e, a)), Re = (a, t) => `color-mix(in srgb, ${a} ${t}%, transparent)`, Qt = (a, t) => `color-mix(in srgb, ${a} ${t}%, var(--ed-tint-base))`, Ra = (a) => Array.from({ length: 10 }, (t, e) => F((a - e * 10) / 10, 0, 1) * 100), ha = (a) => `calc((100% - 18px) * ${F(a, 0, 100) / 100} + ${Math.max(0, Math.ceil(F(a, 0, 100) / 10) - 1) * 2}px)`;
var dn = Object.defineProperty, Y = (a, t, e, s) => {
  for (var n = void 0, i = a.length - 1, o; i >= 0; i--)
    (o = a[i]) && (n = o(t, e, n) || n);
  return n && dn(t, e, n), n;
};
class K extends _t {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._sunDetail = !1, this._sunTab = "today", this._sunMode = "total", this._i18n = re("cs"), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = on(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(la)) || 0);
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
    this._i18n = re(ys(this._config?.language ?? "auto", this.hass), this.hass), Es(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && q(V(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(la, String(this._lastHeating));
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
    }), this._observer.observe(e)), t.has("hass")) {
      const n = Object.entries(this._optimistic).filter(([i, o]) => this.hass?.states?.[i]?.state === o);
      if (n.length) {
        const i = { ...this._optimistic };
        n.forEach(([o]) => delete i[o]), this._optimistic = i;
      }
    }
    t.has("hass") && this._tankTemp && xt(it(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const s = this._config;
    if (window.clearTimeout(this._timers.get("hold")), s && s.boilerShow === "heating" && this._lastHeating) {
      const n = this._lastHeating + s.num.boiler.hold_minutes * 6e4 - Date.now();
      n > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), n + 50));
    }
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${ft[t.main]})`;
  }
  stateLine(t, e) {
    return m`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? m`${T}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !q(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || q(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, s = (r) => Ot(this.hass, r), n = {
      pv: s(e.pv_generation),
      bchg: s(e.battery_charge),
      bdis: s(e.battery_discharge),
      gin: s(e.grid_import),
      gout: s(e.grid_export),
      car: s(e.car),
      boil: s(e.boiler)
    }, o = [n.pv, n.gin, n.bdis, n.gout, n.bchg, n.car, n.boil].every((r) => r !== void 0) ? Math.max(0, n.pv + n.gin + n.bdis - n.gout - n.bchg - n.car - n.boil) : void 0;
    return { ...n, house: o };
  }
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const e = V(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
}
Y([
  G()
], K.prototype, "_config");
Y([
  W({ attribute: !1 })
], K.prototype, "hass");
Y([
  G()
], K.prototype, "_width");
Y([
  G()
], K.prototype, "_optimistic");
Y([
  G()
], K.prototype, "_feedback");
Y([
  G()
], K.prototype, "_open");
Y([
  G()
], K.prototype, "_pop");
Y([
  G()
], K.prototype, "_all");
Y([
  G()
], K.prototype, "_now");
Y([
  G()
], K.prototype, "_carHint");
Y([
  G()
], K.prototype, "_batDetail");
Y([
  G()
], K.prototype, "_batTab");
Y([
  G()
], K.prototype, "_batSpan");
Y([
  G()
], K.prototype, "_batRange");
Y([
  G()
], K.prototype, "_batOpen");
Y([
  G()
], K.prototype, "_batScrub");
Y([
  G()
], K.prototype, "_batData");
Y([
  G()
], K.prototype, "_sunDetail");
Y([
  G()
], K.prototype, "_sunTab");
Y([
  G()
], K.prototype, "_sunRange");
Y([
  G()
], K.prototype, "_sunMode");
Y([
  G()
], K.prototype, "_sunHint");
Y([
  G()
], K.prototype, "_sunWeather");
Y([
  G()
], K.prototype, "_tankTemp");
const cn = (a) => class extends a {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? ht(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, s, n) {
    const i = this.shown(e);
    return m`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${n ? "warn" : ""}">${i === void 0 ? T : s}</span></span>
        <ed-switch
          label=${t} .checked=${i === "on"} ?disabled=${i === void 0}
          @hdk-toggle=${(o) => this.setSwitch(e, o.detail.checked, t)}
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
  async call(t, e, s, n, i) {
    if (!this.hass || ht(this.hass, n) === void 0)
      return this._feedback = this.t.feedback.noData(i), !1;
    try {
      return await this.hass.callService(t, e, s), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(i), !1;
    }
  }
  async setSwitch(t, e, s) {
    this._feedback = "", this.choose(t, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: t }, t, s);
  }
  async setBoost(t, e) {
    const s = this._config.entities, n = t === "wallbox" ? s.wallbox.boost : s.boiler.boost;
    n && (this._feedback = "", t === "wallbox" && e && s.wallbox.block_charging && ht(this.hass, s.wallbox.block_charging) === "on" && (await this.setSwitch(s.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(n, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: n }, n, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, e, s) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, s);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, this.t.tank.modeLabel) && e === "heat") {
      const { min: s, max: n } = this.tankRange(this._config), i = xt(it(this.hass, t), "temperature");
      (i === void 0 || i < s || i > n) && await this.setTemperature(t, F(i ?? s, s, n));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = it(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, xt(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, xt(e, "max_temp") ?? t.num.tank.temp_max)
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
    const n = t === "on" ? "off" : "on", i = t === "on" ? "on" : "off";
    this.choose(e, n), this.choose(s, i), (await Promise.all([
      this.call("switch", `turn_${n}`, { entity_id: e }, e, this.t.water.mixing),
      this.call("switch", `turn_${i}`, { entity_id: s }, s, this.t.water.mixing)
    ])).every(Boolean) || (this._feedback = this._feedback || this.t.feedback.mixingNotSent);
  }
}, pa = ["1d", "7d", "30d"], Lt = { "1d": 1, "7d": 7, "30d": 30 }, ct = 310, X = 36e5, It = 24 * X, Me = (a) => typeof a == "number" && Number.isFinite(a);
async function Na(a, t, e, s, n, i) {
  return t.length ? await a.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(s).toISOString(),
    statistic_ids: t,
    period: n,
    types: i
  }) ?? {} : {};
}
function $t(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t.getTime();
}
function yt(a, t, e, s, n, i = "mean", o = 0) {
  const r = new Array(n).fill(0), l = new Array(n).fill(0), c = new Array(n).fill(void 0), d = (s - e) / n;
  for (const p of a ?? []) {
    const h = p[t];
    if (!Me(h) || !Me(p.start) || d <= 0) continue;
    const v = Math.floor((p.start - e + o) / d);
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
function ve(a, t) {
  return (a ?? []).some((e) => Me(e[t]));
}
const P = (a) => Math.round(a * 10) / 10;
function zt(a, t, e) {
  let s = "", n = !1;
  return a.forEach((i, o) => {
    if (i === void 0) {
      n = !1;
      return;
    }
    s += `${n ? " L" : s ? " M" : "M"}${P(t(o))} ${P(e(i))}`, n = !0;
  }), s;
}
function de(a, t, e, s) {
  let n = "", i = -1;
  const o = (r) => {
    if (!(i < 0)) {
      n += `${n ? " " : ""}M${P(t(i))} ${P(s)}`;
      for (let l = i; l <= r; l++) n += ` L${P(t(l))} ${P(e(a[l]))}`;
      n += ` L${P(t(r))} ${P(s)} Z`, i = -1;
    }
  };
  return a.forEach((r, l) => {
    r === void 0 ? o(l - 1) : i < 0 && (i = l);
  }), o(a.length - 1), n;
}
function Wa(a, t, e, s) {
  let n = "", i = -1;
  const o = (l) => a[l] !== void 0 && t[l] !== void 0, r = (l) => {
    if (!(i < 0)) {
      n += `${n ? " " : ""}M${P(e(i))} ${P(s(t[i]))}`;
      for (let c = i + 1; c <= l; c++) n += ` L${P(e(c))} ${P(s(t[c]))}`;
      for (let c = l; c >= i; c--) n += ` L${P(e(c))} ${P(s(a[c]))}`;
      n += " Z", i = -1;
    }
  };
  for (let l = 0; l < a.length; l++)
    o(l) ? i < 0 && (i = l) : r(l - 1);
  return r(a.length - 1), n;
}
function ce(a) {
  if (!(a > 0)) return 1;
  const e = 10 ** Math.floor(Math.log10(a)), s = a / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 3 ? 3 : s <= 5 ? 5 : 10) * e;
}
function hn(a, t) {
  const e = a.filter((r) => r !== void 0);
  if (!e.length) return;
  let s = Math.min(...e), n = Math.max(...e);
  const i = Math.max(n - s, t), o = (n + s) / 2;
  return s = o - i / 2 - i * 0.1, n = o + i / 2 + i * 0.1, { lo: s, hi: n };
}
function ua(a, t, e) {
  if (!(e > 0) || !(a > 0) || !(t > 0)) return;
  const s = a / 100 * t / (e / 1e3), n = Math.round(s * 60 / 5) * 5;
  return n >= 5 && n < 2880 ? n : void 0;
}
function ba(a) {
  const t = Math.floor(a / 60), e = a % 60;
  return t === 0 ? `${e} min` : e === 0 ? `${t} h` : `${t} h ${e} min`;
}
const pn = 5 * 6e4, ye = 48, ga = 60, un = 90, bn = (a) => class extends a {
  // ----------------------------------------------------------------- state and history
  /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
  batRange(t) {
    if (this._batRange) return this._batRange;
    try {
      const e = localStorage.getItem(da);
      if (e && pa.includes(e)) return e;
    } catch {
    }
    return t.batteryRange;
  }
  setBatRange(t) {
    this._batRange = t, this._batScrub = {};
    try {
      localStorage.setItem(da, t);
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
    const n = t.entities.battery, i = (...c) => c.filter((d) => !!d), [o, r] = e.split(":");
    if (o === "day") {
      const c = s - (r === "6h" ? 6 : 24) * X;
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
        start: s - Lt[l] * It,
        end: s,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, e) {
    if (t === "1d")
      return { start: Math.floor(e / X) * X - 23 * X, bins: 24 };
    const s = new Date(e);
    return s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (Lt[t] - 1)), { start: s.getTime(), bins: Lt[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const e of this.batNeeds(t)) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < pn) || this.fetchBattery(t, e, s);
      }
  }
  async fetchBattery(t, e, s) {
    const n = this.hass;
    if (!n) return;
    const i = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: i, parts: s?.parts ?? {} } };
    try {
      const o = this.batRequests(t, e, i), r = {};
      await Promise.all(o.map(async (l) => r[l.part] = await Na(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: i, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: i, parts: {} } };
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
    return q(t.batIn, s) ? "charging" : q(t.batDis, s) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, e, s) {
    const n = this.t, i = this.batteryReserve(e), o = Array.from({ length: 10 }, (l, c) => {
      const d = (c + 1) * 10 <= i + 1e-3, p = t === void 0 ? 0 : F((t - c * 10) / 10, 0, 1) * 100, h = c === 0 ? "8px 0 0 8px" : c === 9 ? "0 8px 8px 0" : "0", v = d ? "var(--ed-warning)" : "var(--ed-battery)";
      return m`<span class="pill" style="height:${s}px;border-radius:${h};background:${d ? Re("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${p.toFixed(1)}%;background:${v}"></i></span>`;
    }), r = t === void 0 ? n.noData : n.bat.levelLabel(R(t), R(i));
    return m`<div class="bat-gauge" role="img" aria-label=${r}>${o}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, e) {
    const s = t.soc, n = this.batState(t, e);
    if (s === void 0) return;
    const i = e.num.battery.capacity;
    if (n === "charging") {
      const o = ua(100 - s, i, t.batIn ?? 0);
      return o === void 0 ? void 0 : this.t.bat.fullIn(ba(o));
    }
    if (n === "discharging") {
      const o = ua(s - this.batteryReserve(e), i, t.batDis ?? 0);
      return o === void 0 ? void 0 : this.t.bat.lastsFor(ba(o));
    }
  }
  /** Signed power in kW, charging positive (the raw entity is the other way round). */
  batSigned(t) {
    if (!(t.batIn === void 0 && t.batDis === void 0))
      return ((t.batIn ?? 0) - (t.batDis ?? 0)) / 1e3;
  }
  // ----------------------------------------------------------------- popup
  renderBatteryPopup(t, e, s, n, i) {
    const o = this.t, r = s.num.flows.idle_threshold, l = t.key === "bat", c = n.soc, d = c !== void 0 && c <= this.batteryReserve(s), p = l ? n.batDis : n.batIn, v = q(p, r) ? l ? o.pop.discharging(Q(p, i)) : o.pop.charging(Q(p, i)) : n.batDis === void 0 && n.batIn === void 0 && c === void 0 ? T : l ? o.idle.bat : o.idle.batIn, y = this.today(s), b = l ? y.bdis : y.bchg, f = this.batEstimate(n, s), g = Math.min(236, e.width), u = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, x = F(u - g / 2, 0, e.width - g), A = t.side === "L" ? e.left[t.key] : e.right[t.key], $ = A - e.tile.h / 2, w = A < e.height / 2, j = w ? `top:${($ + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - $ + 8).toFixed(0)}px`;
    return m`<div class="pop bat-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${x.toFixed(0)}px;${j};width:${g}px">
        <i class="arrow ${w ? "up" : "down"}" aria-hidden="true" style="left:${(u - x - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${v}</span></div>
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${o.pop.level}${d ? m`<span class="note"> ${o.pop.atReserve}</span>` : L}</span>
            <span class="pop-big" style="color:${d ? "var(--ed-warning)" : "var(--ed-text)"}">${c === void 0 ? T : R(c)}</span>
          </div>
          ${this.renderGauge(c, s, 12)}
        </div>
        ${f ? m`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${f}</p>` : L}
        <div class="pop-rows"><div class="pop-row"><span>${l ? o.pop.rows.discharged : o.pop.rows.charged}</span><b>${b === void 0 ? T : `${at(b)} kWh`}</b></div></div>
        <button type="button" class="bat-open" @click=${() => this.openBatteryDetail()}><span>${o.bat.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
  }
  // ----------------------------------------------------------------- charts
  /** Back in time as a short text: "teď", "−45 min", "−3 h 20 min", "−5 d". */
  back(t) {
    const e = Math.round(t);
    return e <= 0 ? this.t.bat.now : e < 60 ? `−${e} min` : e < 1440 ? `−${Math.floor(e / 60)} h${e % 60 ? ` ${e % 60} min` : ""}` : `−${Math.round(e / 1440)} d`;
  }
  /** One chart with its readout, finger scrubbing (a slider with no look of its own), the vertical axis and the fade on the left. */
  renderChart(t) {
    const e = this.t, s = this._batScrub[t.id] ?? t.start ?? 100, n = t.fade ?? un, i = Math.round(s / 100 * (t.n - 1)), o = t.x(i), r = t.dot?.(i), l = t.read(i), c = (d) => `${(d / t.h * 100).toFixed(2)}%`;
    return m`<div class="bat-read">${l}</div>
        <div class="bat-chart" style="aspect-ratio:${ct} / ${t.h}">
          <svg viewBox="0 0 ${ct} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${n} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${ct} height=${t.h}><rect width=${ct} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${t.grid.map((d) => I`<line x1="0" y1=${d.y} x2=${ct} y2=${d.y} class=${d.strong ? "axis" : "grid"}></line>`)}
            <g mask=${n > 0 ? `url(#bm-${t.id})` : L}>${t.body}</g>
            <line x1=${o} y1="0" x2=${o} y2=${t.h} class="cursor"></line>
            ${r ? I`<circle cx=${o} cy=${r.y} r="6" style="fill:var(--ed-text)"></circle>` : L}
          </svg>
          ${t.labels.map((d) => m`<span class="bat-ylabel" style="top:calc(${c(d.y)} - 16px)">${d.text}</span>`)}
          <input type="range" min="0" max="100" step="1" .value=${String(s)} aria-label=${e.bat.scrubLabel} aria-valuetext=${l}
            @input=${(d) => {
      this._batScrub = { ...this._batScrub, [t.id]: Number(d.target.value) };
    }} />
        </div>
        <div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>
        ${t.legend ?? L}`;
  }
  renderChartOrEmpty(t, e, s) {
    if (s) return this.renderChart(s);
    const n = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return m`<div class="bat-nodata" style="aspect-ratio:${ct} / ${e}">${n ? T : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const e = t.entities.battery, s = `day:${this._batSpan}`, n = this._batData[s];
    if (!n) return;
    const i = this._batSpan === "6h" ? 6 : 24, o = n.at, r = o - i * X, l = yt(this.batRows(s, "level", e.state_of_charge), "mean", r, o, ye), c = yt(this.batRows(s, "level", e.power), "mean", r, o, ye).map(($) => $ === void 0 ? void 0 : -$ / 1e3);
    if (!l.some(($) => $ !== void 0) && !c.some(($) => $ !== void 0)) return;
    const d = ye, p = ($) => P($ / (d - 1) * ct), h = ($) => P(98 - F($, 0, 100) / 100 * 90), v = ce(Math.max(1, ...c.map(($) => Math.abs($ ?? 0)))), y = 160, b = ($) => P(y - F($, -v, v) / v * 44), f = 4.2, g = c.map(($, w) => {
      if ($ === void 0) return L;
      const j = Math.min(y, b($)), B = Math.max(1.5, Math.abs(b($) - y));
      return I`<rect x=${P(p(w) - f / 2)} y=${$ >= 0 ? j : y} width=${f} height=${P(B)} rx="1.5" style="fill:${$ >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), u = zt(l, p, h), x = de(l, p, h, 98), A = ($) => `${N($, $ % 1 === 0 ? 0 : 1)} kW`;
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
        { y: y - 44, text: `+${A(v)}` },
        { y, text: "0" },
        { y: y + 44, text: `−${A(v)}` }
      ],
      body: I`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${x} fill="url(#bl-area)"></path>
          <path d=${u} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${g}`,
      dot: ($) => l[$] === void 0 ? void 0 : { y: h(l[$]), color: "var(--ed-text)" },
      read: ($) => {
        const w = c[$], j = w === void 0 ? T : Math.abs(w) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${w > 0 ? this.t.bat.charging : this.t.bat.discharging} ${Q(Math.abs(w) * 1e3, "kW")}`;
        return `${this.back((1 - $ / (d - 1)) * i * 60)} · ${l[$] === void 0 ? T : R(l[$])} · ${j}`;
      },
      from: `−${i} h`,
      to: this.t.bat.now,
      legend: m`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`
    };
  }
  /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
  energyChart(t, e) {
    const s = t.entities.battery, n = `hist:${e}`, i = this._batData[n];
    if (!i) return;
    const o = this.histWindow(e, i.at), r = e === "1d", l = o.bins, c = r ? X : It, d = o.start + l * c, p = r ? 0 : 6 * X, h = this.batRows(n, "energy", s.total_charge), v = this.batRows(n, "energy", s.total_discharge), y = yt(h, "change", o.start, d, l, "sum", p), b = yt(v, "change", o.start, d, l, "sum", p);
    if (!y.some((S) => S !== void 0) && !b.some((S) => S !== void 0)) return;
    const f = y.map((S) => S ?? 0), g = b.map((S) => S ?? 0), u = ce(Math.max(0.5, ...f, ...g)), x = r ? 3 : l <= 7 ? 10 : 2, A = (ct - (l - 1) * x) / l, $ = (S) => P(S * (A + x) + A / 2), w = 100, j = (S) => F(S, 0, u) / u * 92, B = f.flatMap((S, C) => {
      const Z = g[C], rt = C === l - 1 ? 1 : 0.85;
      return [
        I`<rect x=${P(C * (A + x))} y=${P(w - Math.max(S > 0 ? 1 : 0, j(S)))} width=${P(A)} height=${P(Math.max(S > 0 ? 1 : 0, j(S)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${rt}"></rect>`,
        I`<rect x=${P(C * (A + x))} y=${w} width=${P(A)} height=${P(Math.max(Z > 0 ? 1 : 0, j(Z)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${rt}"></rect>`
      ];
    }), E = (S) => P(w - F(S, -u, u) / u * 92), D = f.map((S, C) => S - g[C]), k = r ? 2 : 1, M = (S) => `${S >= 0 ? "+" : "−"}${N(Math.abs(S), k)}`, z = (S) => r ? nt(o.start + S * X) : Et(o.start + S * It), _ = (S) => `${N(S, S % 1 === 0 ? 0 : 1)} kWh`;
    return {
      charged: f,
      discharged: g,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: $,
        grid: [{ y: w, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${_(u)}` }, { y: w, text: "0" }, { y: 192, text: `−${_(u)}` }],
        body: I`${B}<path d=${zt(D, $, E)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (S) => ({ y: E(D[S]), color: "var(--ed-text)" }),
        read: (S) => `${z(S)} · ${M(f[S])} / ${M(-g[S])} · ${this.t.bat.net} ${M(D[S])} kWh`,
        from: r ? "−24 h" : Et(o.start),
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
  balanceChart(t, e) {
    const s = t.entities.battery, n = `health:${e}`, i = this._batData[n];
    if (!i) return;
    const o = Lt[e], r = i.at, l = r - o * It, c = ga, d = (k) => yt(this.batRows(n, "health", k), "mean", l, r, c), p = d(s.min_cell_voltage), h = d(s.max_cell_voltage), v = p.map((k, M) => k === void 0 || h[M] === void 0 ? void 0 : Math.max(0, (h[M] - k) * 1e3)), y = v.filter((k) => k !== void 0);
    if (!y.length) return;
    const { imbalance_good: b, imbalance_warn: f } = t.num.battery, g = Math.max(b > 0 ? b * 1.5 : 10, Math.max(...y) * 1.2), u = (k) => P(130 - F(k, 0, g) / g * 120), x = (k) => P(k / (c - 1) * ct), A = (k) => this.back((1 - k / (c - 1)) * o * 24 * 60), $ = this.t.bat.health, w = "var(--ed-battery)", j = "var(--ed-warning)", B = (k) => k > f ? j : w, E = `bg-${e}`, D = F(1 - (130 - u(f)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: c,
      x,
      grid: [{ y: 10 }, { y: u(b) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${O(g)} mV` }, { y: u(b), text: `${O(b)} mV` }, { y: 130, text: "0" }],
      body: I`<defs>
            <linearGradient id=${E} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${D} stop-color="#FF9230"></stop><stop offset=${D} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${E}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${u(b)} width=${ct} height=${P(130 - u(b))} style="fill:${w};fill-opacity:0.12"></rect>
          <path d=${de(v, x, u, 130)} fill="url(#${E}-area)"></path>
          <path d=${zt(v, x, u)} fill="none" stroke="url(#${E})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (k) => v[k] === void 0 ? void 0 : { y: u(v[k]), color: B(v[k]) },
      read: (k) => v[k] === void 0 ? `${A(k)} · ${T}` : `${A(k)} · ${$.difference} ${O(v[k])} mV · ${$.min} ${N(p[k], 3)} V · ${$.max} ${N(h[k], 3)} V`,
      from: o === 1 ? "−24 h" : `−${o} d`,
      to: this.t.bat.today,
      legend: m`<div class="bat-legend"><span><i class="swatch" style="background:${w};opacity:0.35"></i>${$.excellentZone(`${O(b)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, e, s) {
    if (t === "gap") return this.balanceChart(e, s);
    const n = e.entities.battery, i = `health:${s}`, o = this._batData[i];
    if (!o) return;
    const r = Lt[s], l = o.at, c = l - r * It, d = ga, p = (w) => this.batRows(i, "health", w), h = (w) => yt(p(w), "mean", c, l, d), v = (w) => P(w / (d - 1) * ct), y = (w) => this.back((1 - w / (d - 1)) * r * 24 * 60), b = r === 1 ? "−24 h" : `−${r} d`;
    let f;
    if (t === "temp") {
      const w = h(n.min_cell_temperature), j = h(n.max_cell_temperature), B = h(n.temperature);
      f = {
        low: w,
        high: j,
        line: B,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (E) => `${O(E)} °C`,
        mid: (E) => `${O(E)} °C`,
        read: (E) => {
          const D = [w[E] === void 0 ? void 0 : `${this.t.bat.health.min} ${N(w[E], 1)}`, B[E] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${N(B[E], 1)}`, j[E] === void 0 ? void 0 : `${this.t.bat.health.max} ${N(j[E], 1)}`].filter(Boolean);
          return `${y(E)} · ${D.length ? `${D.join(" · ")} °C` : T}`;
        },
        legend: m`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const w = yt(p(n.total_discharge), "state", c, l, d, "last").map((j) => j === void 0 ? void 0 : j / e.num.battery.capacity);
      f = {
        low: w,
        high: w,
        line: w,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (j) => O(j),
        mid: (j) => O(j),
        read: (j) => `${y(j)} · ${w[j] === void 0 ? T : this.t.bat.health.cycles(N(w[j], 1))}`
      };
    }
    const g = hn([...f.low, ...f.high], f.minSpan);
    if (!g) return;
    const u = (w) => P(130 - (F(w, g.lo, g.hi) - g.lo) / (g.hi - g.lo) * 120), x = t === "life" ? "" : Wa(f.low, f.high, v, u), A = f.line ? zt(f.line, v, u) : "", $ = f.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: d,
      x: v,
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: f.text(g.hi) }, { y: 70, text: f.mid((g.hi + g.lo) / 2) }, { y: 130, text: f.text(g.lo) }],
      body: I`<path d=${x} style="fill:${$};fill-opacity:0.22"></path><path d=${A} fill="none" style="stroke:${$}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (w) => f.line?.[w] === void 0 ? void 0 : { y: u(f.line[w]), color: $ },
      read: f.read,
      from: b,
      to: this.t.bat.today,
      legend: f.legend
    };
  }
  // ----------------------------------------------------------------- the detail
  /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
  renderBatteryDetail(t, e) {
    const s = this.t, n = ["now", "hist", "health"].map((i) => ({ value: i, label: s.bat.tabs[i] }));
    return m`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${s.bat.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeBatteryDetail(!1)}>‹ ${s.bat.back}</button>
          <h2>${s.bat.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeBatteryDetail(!0)}>${s.bat.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._batTab} label=${s.bat.tabsLabel} @hdk-select=${(i) => {
      this._batTab = i.detail.value;
    }}></ed-segmented>
        ${this._batTab === "now" ? this.renderBatteryNow(t, e) : this._batTab === "hist" ? this.renderBatteryHistory(t, e) : this.renderBatteryHealth(t, e)}
      </section>`;
  }
  renderRange(t) {
    const e = this.t, s = pa.map((n) => ({ value: n, label: e.bat.ranges[n] }));
    return m`<ed-segmented .options=${s} .value=${this.batRange(t)} label=${e.bat.rangeLabel} @hdk-select=${(n) => this.setBatRange(n.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, e) {
    const s = this.t, n = t.entities.battery, i = e.soc, o = this.batState(e, t), r = this.batSigned(e), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, c = "kW", d = V(this.hass, n.current), p = V(this.hass, n.voltage), h = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, v = o === "idle", y = o === "charging" ? s.pop.charging(Q(e.batIn ?? 0, c)) : o === "discharging" ? s.pop.discharging(Q(e.batDis ?? 0, c)) : o === "idle" ? s.bat.status.idle.toLowerCase() : s.noData, b = this.batEstimate(e, t), f = this.today(t), g = [
      { label: s.bat.live.power, value: l === void 0 ? T : v ? "0 kW" : Q(l, c), sub: o === void 0 ? "" : s.bat.status[o] },
      { label: s.bat.live.current, value: d === void 0 ? T : `${N(Math.abs(d), 1)} A`, sub: d === void 0 || v || o === void 0 ? "" : o === "charging" ? s.bat.live.chargeCurrent : s.bat.live.dischargeCurrent },
      { label: s.bat.live.voltage, value: p === void 0 ? T : `${N(p, 1)} V`, sub: s.bat.live.ofBattery },
      { label: s.bat.live.load, value: h === void 0 ? T : `${N(h, 2)} C`, sub: s.bat.live.loadSub }
    ], u = f.bchg, x = f.bdis, A = u !== void 0 && x !== void 0 ? u - x : void 0, $ = ["6h", "24h"].map((w) => ({ value: w, label: s.bat.spans[w] }));
    return m`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${s.bat.level}</span><span class="bat-sub">${y}</span></div><span class="bat-huge">${i === void 0 ? T : R(i)}</span></div>
          ${this.renderGauge(i, t, 32)}
          ${b ? m`<p class="bat-estimate plain">${b}</p>` : L}
        </div>
        <div class="bat-kpis">${g.map((w) => m`<div class="bat-kpi"><span class="sub">${w.label}</span><span class="val">${w.value}</span><span class="sub">${w.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.levelChart}</span>
          <ed-segmented .options=${$} .value=${this._batSpan} label=${s.bat.spanLabel} @hdk-select=${(w) => {
      this._batSpan = w.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${s.bat.charged}</span><span class="val">${u === void 0 ? T : `${at(u)} kWh`}</span></div><div><span class="sub">${s.bat.discharged}</span><span class="val">${x === void 0 ? T : `${at(x)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${u !== void 0 && x !== void 0 && u + x > 0 ? m`${u > 0 ? m`<i style="flex:${u.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : L}${x > 0 ? m`<i style="flex:${x.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : L}` : L}</div>
          <p class="bat-sub">${A === void 0 ? T : s.bat.netStored(`${A >= 0 ? "+" : "−"}${at(Math.abs(A))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, e) {
    const s = this.t, n = t.entities.battery, i = this.batRange(t), o = `hist:${i}`, r = this.energyChart(t, i), l = r ? r.charged.reduce((B, E) => B + E, 0) : void 0, c = r ? r.discharged.reduce((B, E) => B + E, 0) : void 0, d = s.bat.kpi.over(i === "1d" ? "24 h" : s.bat.ranges[i].toLowerCase()), p = this._batData[o], h = Lt[i], v = this.batRows(o, "level", n.state_of_charge), y = this.batRows(o, "level", n.power), b = ve(v, "min") ? Math.min(...(v ?? []).map((B) => B.min).filter((B) => typeof B == "number")) : void 0, f = ve(y, "max") || ve(y, "min") ? Math.max(...(y ?? []).flatMap((B) => [B.max, B.min]).filter((B) => typeof B == "number").map((B) => Math.abs(B))) : void 0, g = `${N(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, u = T, x = [
      { label: s.bat.charged, value: l === void 0 ? u : `${N(l, i === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.discharged, value: c === void 0 ? u : `${N(c, i === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.kpi.efficiency, value: l && c !== void 0 ? R(N(c / l * 100, 1)) : u, sub: s.bat.kpi.efficiencySub },
      { label: s.bat.kpi.cycles, value: c === void 0 ? u : N(c / t.num.battery.capacity, 1), sub: s.bat.kpi.cyclesSub(g) },
      { label: s.bat.kpi.lowest, value: b === void 0 ? u : R(b), sub: s.bat.kpi.lowestSub },
      { label: s.bat.kpi.peak, value: f === void 0 ? u : Q(f, "kW"), sub: s.bat.kpi.peakSub }
    ], $ = yt(v, "mean", this.histWindow(i, p?.at ?? Date.now()).start, p?.at ?? Date.now(), Math.max(1, h * 24)).filter((B) => B !== void 0), w = [0, 20, 40, 60, 80, 100], j = w.slice(0, 5).map((B, E) => $.length ? Math.round($.filter((D) => E === 4 ? D >= B : D >= B && D < w[E + 1]).length / $.length * 100) : void 0);
    return m`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${i === "1d" ? s.bat.energyHours : s.bat.energyDays}</span>${this.renderChartOrEmpty(o, 200, r?.chart)}</div>
        <div class="bat-kpis">${x.map((B) => m`<div class="bat-kpi"><span class="sub">${B.label}</span><span class="val">${B.value}</span><span class="sub">${B.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.bandsTitle}</span>
          ${j.map((B, E) => m`<div class="bat-band"><span class="name">${w[E]}–${w[E + 1]} %</span><span class="track"><i style="width:${B ?? 0}%;background:${E === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${B === void 0 ? T : R(B)}</span></div>`)}
          <p class="bat-sub">${s.bat.bandsNote}</p>
        </div>`;
  }
  /** Text of an error or a warning entity: "" = none, undefined = no data. */
  batProblem(t) {
    const e = it(this.hass, t)?.state;
    if (!(e === void 0 || e === "unavailable" || e === "unknown"))
      return e === "" || e === "0" ? "" : e;
  }
  renderBatteryHealth(t, e) {
    const s = this.t, n = t.entities.battery, i = s.bat.health, o = this.batRange(t), r = (M) => V(this.hass, M), l = r(n.state_of_health), c = r(n.min_cell_voltage), d = r(n.max_cell_voltage), p = r(n.min_cell_temperature), h = r(n.max_cell_temperature), v = this.batProblem(n.error), y = this.batProblem(n.warning), b = Ot(this.hass, n.total_charge), f = Ot(this.hass, n.total_discharge), g = t.num.battery, u = c !== void 0 && d !== void 0 ? (d - c) * 1e3 : void 0, x = u === void 0 ? void 0 : u <= g.imbalance_good ? "good" : u <= g.imbalance_warn ? "ok" : u <= g.imbalance_fault ? "warn" : "fault", A = x === "warn" || x === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", j = [l, c, d, p, h, e.soc].every((M) => M === void 0) && v === void 0 && y === void 0 ? { title: i.noData, sub: i.noDataSub, tone: "off", icon: "M5 12h14" } : v || y ? { title: v ? i.error(v) : i.warning(y), sub: i.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: i.ok, sub: i.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, B = f === void 0 ? void 0 : f / g.capacity, E = [
      { key: "soh", label: i.capacity, value: l === void 0 ? T : R(l), sub: l === void 0 ? s.noData : i.capacitySub(`${N(g.capacity * l / 100, 1)} kWh`, `${N(g.capacity, g.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: i.balance, value: u === void 0 ? T : `${O(u)} mV`, word: x ? i.words[x] : void 0, sub: i.balanceSub, details: [] },
      {
        key: "temp",
        label: i.temperature,
        value: h === void 0 ? T : `${O(h)} °C`,
        sub: h !== void 0 && p !== void 0 ? i.temperatureSub(`${O(h - p)} °C`) : s.noData,
        details: [
          [i.battery, n.temperature],
          [i.inverterAir, n.inverter_temperature_air],
          [i.inverterRadiator, n.inverter_temperature_radiator]
        ].filter(([, M]) => M).map(([M, z]) => ({ label: M, value: r(z) === void 0 ? T : `${N(r(z), 1)} °C` }))
      },
      {
        key: "life",
        label: i.life,
        value: B === void 0 ? T : i.cycles(O(B)),
        sub: b && f !== void 0 ? i.lifeSub(R(N(f / b * 100, 1))) : s.noData,
        details: [
          { label: i.totalCharged, value: b === void 0 ? T : `${O(b)} kWh` },
          { label: i.totalDischarged, value: f === void 0 ? T : `${O(f)} kWh` }
        ]
      }
    ], D = (M) => M ? gn(this.hass, M) : void 0, k = [];
    if (n.mode && k.push({ label: i.mode, value: D(n.mode) ?? T }), n.charge_limit && k.push({ label: i.chargeLimit, value: r(n.charge_limit) === void 0 ? T : `${O(r(n.charge_limit))} A` }), n.discharge_limit && k.push({ label: i.dischargeLimit, value: r(n.discharge_limit) === void 0 ? T : `${O(r(n.discharge_limit))} A` }), n.error || n.warning) {
      const M = [v, y].filter(Boolean).join(", ");
      k.push({ label: i.errors, value: v === void 0 && y === void 0 ? T : M || i.none, warn: !!M });
    }
    return m`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${j.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${j.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${j.tone}">${j.title}</span><span class="bat-sub">${j.sub}</span></div>
        </div>
        ${E.map((M) => {
      const z = M.key !== "soh" && this._batOpen === M.key, _ = z ? this.healthChart(M.key, t, o) : void 0;
      return m`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${M.key === "soh"} aria-expanded=${M.key === "soh" ? L : z ? "true" : "false"}
              @click=${() => {
        M.key !== "soh" && (this._batOpen = z ? void 0 : M.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${M.label}</span><span class="bat-sub">${M.sub}</span></span>
              <span class="bat-value">${M.value}</span>${M.word ? m`<span class="bat-word" style="color:${A}">${M.word}</span>` : L}
              ${M.key === "soh" ? L : m`<svg class="chev ${z ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${z ? m`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${o}`, 140, _)}
                  ${M.details.length ? m`<div class="bat-list">${M.details.map((S) => m`<div class="bat-line"><span>${S.label}</span><b>${S.value}</b></div>`)}</div>` : L}
                </div>` : L}
          </div>`;
    })}
        ${k.length ? m`<div class="bat-card flush"><span class="bat-cap pad">${i.diagnostics}</span><div class="bat-list pad">${k.map((M) => m`<div class="bat-line"><span>${M.label}</span><b style="color:${M.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${M.value}</b></div>`)}</div></div>` : L}`;
  }
};
function gn(a, t) {
  const e = it(a, t)?.state;
  return e === void 0 || e === "" || e === "unavailable" || e === "unknown" ? void 0 : e;
}
const fa = (a) => typeof a == "number" && Number.isFinite(a);
function $e(a, t) {
  const e = /* @__PURE__ */ new Map();
  for (const s of a ?? []) {
    const n = s[t];
    if (!fa(n) || !fa(s.start)) continue;
    const i = new Date(s.start), o = $t(s.start), r = e.get(o) ?? new Array(24).fill(void 0);
    r[i.getHours()] = Math.max(0, t === "mean" ? n / 1e3 : n), e.set(o, r);
  }
  return e;
}
function he(a, t = 1) {
  if (!a) return;
  const e = a.filter((s) => s !== void 0);
  return e.length >= t ? e.reduce((s, n) => s + n, 0) : void 0;
}
function pe(a, t) {
  if (!a.length) return;
  const e = [...a].sort((o, r) => o - r), s = Math.min(100, Math.max(0, t)) / 100 * (e.length - 1), n = Math.floor(s), i = Math.ceil(s);
  return e[n] + (e[i] - e[n]) * (s - n);
}
const ma = (a) => pe(a, 50);
function Ia(a, t) {
  const e = [], s = new Date(a);
  for (let n = 0; n < t; n++)
    s.setDate(s.getDate() - 1), e.push(s.getTime());
  return e;
}
function mt(a, t) {
  const e = new Date(a);
  return e.setDate(e.getDate() + t), e.setHours(0, 0, 0, 0), e.getTime();
}
function fn(a, t, e, s) {
  const n = Ia(t, e).filter((r) => a.has(r)), i = Array.from({ length: 24 }, (r, l) => {
    const c = n.map((d) => a.get(d)[l]).filter((d) => d !== void 0);
    return c.length >= 3 ? pe(c, s) : void 0;
  }), o = n.map((r) => he(a.get(r), 20)).filter((r) => r !== void 0);
  return { curve: i, daily: o.length >= 3 ? pe(o, s) : void 0, days: n.length };
}
function mn(a) {
  const t = a.reduce((e, s) => e + (s ?? 0), 0);
  return t > 0 ? a.map((e) => (e ?? 0) / t) : void 0;
}
function vn(a, t) {
  const e = mn(t);
  return e ? e.map((s) => s * a) : void 0;
}
function yn(a, t, e, s) {
  const n = new Date(s), i = n.getHours(), o = 1 - (n.getMinutes() * 60 + n.getSeconds()) / 3600, r = e.map((c, d) => d < i ? 0 : d === i ? (c ?? 0) * o : c ?? 0), l = r.reduce((c, d) => c + d, 0);
  return Array.from({ length: 24 }, (c, d) => d < i ? a?.[d] : l > 0 ? r[d] / l * Math.max(0, t) : void 0);
}
function va(a, t) {
  const e = new Date(t), s = e.getHours(), n = 1 - (e.getMinutes() * 60 + e.getSeconds()) / 3600;
  return a.reduce((i, o, r) => i + (r < s ? 0 : r === s ? (o ?? 0) * n : o ?? 0), 0);
}
function $n(a, t, e, s, n, i) {
  if (a === void 0) return;
  const o = new Date(s), r = o.getHours() + o.getMinutes() / 60, l = e.reduce((g, u, x) => g + (u ?? 0) * Math.min(1, Math.max(0, r - x)), 0), c = e.reduce((g, u) => g + (u ?? 0), 0);
  let d, p = "forecast";
  if (t !== void 0) {
    const g = va(e, s);
    let u = Math.min(Math.max(t - a, 0), g);
    i && i.possible >= 0.3 && (u = Math.min(u, g * Math.min(1, Math.max(0, i.actual / i.possible)))), d = a + u;
  } else if (c > 0 && l >= 0.5) {
    const g = c - l;
    d = a + g * Math.min(2, a / l), p = "pace";
  }
  if (d === void 0) return;
  const h = d > 0 ? Math.min(1, a / d) : 1, v = Math.min(0.6, n * (1 + (1 - h))), y = Math.max(0, d - a), b = c > 0 ? va(e, s) : 1 / 0;
  let f = h < 0.35 ? "low" : h < 0.7 ? "medium" : "high";
  return n > 0.3 && f !== "low" && (f = f === "high" ? "medium" : "low"), { value: d, low: a + y * (1 - v), high: a + Math.min(y * (1 + v), b), done: h, certainty: f, source: p };
}
function xn(a) {
  const t = a.filter((e) => e.actual > 0.5);
  if (!(t.length < 3))
    return t.reduce((e, s) => e + Math.abs(s.forecast - s.actual) / s.actual, 0) / t.length;
}
function wn(a, t, e, s) {
  let n = -1, i = -1;
  for (let o = t; o <= e; o++)
    (a[o] ?? 0) >= s && (n < 0 && (n = o), i = o);
  return n < 0 ? void 0 : [n, i + 1];
}
const ya = [9, 11, 13, 15];
function kn(a) {
  const t = ya.findIndex((e) => a < e);
  return t < 0 ? ya.length : t;
}
function _n(a) {
  if (!a || !a.some((e) => e !== void 0)) return;
  const t = [0, 0, 0, 0, 0];
  return a.forEach((e, s) => {
    e !== void 0 && (t[kn(s)] += e);
  }), t;
}
function te(a, t, e) {
  const s = new Date(a), n = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), 12), i = Math.round(n / 864e5 + 24405875e-1 - 2451545), o = Math.PI / 180, r = i - e / 360, l = (357.5291 + 0.98560028 * r) % 360, c = 1.9148 * Math.sin(l * o) + 0.02 * Math.sin(2 * l * o) + 3e-4 * Math.sin(3 * l * o), d = (l + c + 180 + 102.9372) % 360, p = 2451545 + r + 53e-4 * Math.sin(l * o) - 69e-4 * Math.sin(2 * d * o), h = Math.sin(d * o) * Math.sin(23.4397 * o), v = Math.cos(Math.asin(h)), y = (Math.sin(-0.833 * o) - Math.sin(t * o) * h) / (Math.cos(t * o) * v);
  if (y < -1 || y > 1) return;
  const b = Math.acos(y) / o, f = (g) => (g - 24405875e-1) * 864e5;
  return { rise: f(p - b / 360), set: f(p + b / 360) };
}
function Sn(a) {
  const { capacity: t, efficiency: e } = a;
  let s = a.soc / 100 * t;
  const n = a.reserve / 100 * t, i = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let o = Math.ceil(a.now / (X / 4)) * (X / 4);
  const r = $t(a.now), l = r + a.eveningHour * X, c = mt(r, 1) + a.morningHour * X;
  let d = !1, p = s >= t - 0.01;
  for (; o <= c; o += X / 4) {
    !i.socAtEvening && o >= l && a.now < l && (i.socAtEvening = s / t * 100);
    const h = new Date(o - 1).getHours(), v = o - 1 < mt(r, 1), y = v ? (a.sun[h] ?? 0) / 4 : 0, b = (a.house[h] ?? 0) / 4;
    o <= l && (i.sunUntilEvening += y, i.houseUntilEvening += b);
    const f = s / t * 100;
    let g = 0;
    a.car && v && (d && f <= a.car.stopSoc ? d = !1 : !d && f >= a.car.startSoc && y * 4 * 1e3 >= a.car.minSun && (d = !0), g = d ? a.car.watts / 1e3 / 4 : 0);
    const u = b + g, x = Math.min(y, u), A = y - x, $ = u - x;
    if (g > 0 && (i.carTotal += g, i.carSun += Math.min(g, Math.max(0, y - b))), A > 0)
      s = Math.min(t, s + A * e);
    else if ($ > 0) {
      const w = Math.max(0, s - n) * e, j = Math.min($, w);
      s -= j / e;
    }
    !p && s >= t - 0.01 && i.fullAt === void 0 && o < l && (i.fullAt = o), s >= t - 0.01 && (p = !0), o >= c && (i.socAtMorning = s / t * 100);
  }
  return i;
}
function Mn(a, t, e = 8) {
  const s = t.length;
  if (s === 0) return [];
  if (s === 1) return [[a[0], t[0]]];
  const n = Array.from({ length: s - 1 }, (r, l) => (t[l + 1] - t[l]) / (a[l + 1] - a[l])), i = [n[0], ...Array.from({ length: s - 2 }, (r, l) => n[l] * n[l + 1] <= 0 ? 0 : 2 * n[l] * n[l + 1] / (n[l] + n[l + 1])), n[s - 2]], o = [];
  for (let r = 0; r < s - 1; r++) {
    const l = a[r + 1] - a[r];
    for (let c = 0; c < e; c++) {
      const d = c / e, p = 2 * d ** 3 - 3 * d ** 2 + 1, h = d ** 3 - 2 * d ** 2 + d, v = -2 * d ** 3 + 3 * d ** 2, y = d ** 3 - d ** 2;
      o.push([a[r] + d * l, p * t[r] + h * l * i[r] + v * t[r + 1] + y * l * i[r + 1]]);
    }
  }
  return o.push([a[s - 1], t[s - 1]]), o;
}
function Tn(a, t, e, s) {
  const n = Ia(t, e).map((i) => he(a.get(i), 20)).filter((i) => i !== void 0);
  return n.length >= 3 ? pe(n, s) : void 0;
}
const Cn = 5 * 6e4, Dn = 30 * 6e4, Ft = 12, ee = 26, $a = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)"
], xa = ["7d", "30d"], xe = { "7d": 7, "30d": 30 }, Ln = (a) => class extends a {
  constructor() {
    super(...arguments), this._sunWeatherBusy = !1;
  }
  // ----------------------------------------------------------------- state and history
  sunRange(t) {
    if (this._sunRange) return this._sunRange;
    try {
      const e = localStorage.getItem(ca);
      if (e && xa.includes(e)) return e;
    } catch {
    }
    return t.sunRange;
  }
  setSunRange(t) {
    this._sunRange = t, this._batScrub = {};
    try {
      localStorage.setItem(ca, t);
    } catch {
    }
  }
  /** The views of the history the open parts need: the popup and the detail both show the day. */
  sunNeeds() {
    return this._sunDetail || this._pop === "sun" ? ["sun:hist", "sun:five"] : [];
  }
  sunRequests(t, e, s) {
    const n = t.entities, i = (...l) => l.filter((c) => !!c), o = $t(s);
    if (e === "sun:five")
      return [{ part: "power", ids: i(n.pv.power), start: mt(o, -10), end: s, period: "5minute", types: ["mean"] }];
    const r = mt(o, -(Math.max(30, t.num.forecast.learn_days) + t.num.forecast.learn_days + 1));
    return [
      { part: "energy", ids: i(n.pv.total_generation), start: r, end: s, period: "hour", types: ["change"] },
      { part: "power", ids: i(n.pv.power), start: r, end: s, period: "hour", types: ["mean", "max"] },
      { part: "house", ids: i(n.house.power), start: mt(o, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] },
      { part: "forecast", ids: i(n.forecast.energy_today), start: mt(o, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] }
    ];
  }
  loadSun() {
    const t = this._config;
    if (!(!t || !this.hass)) {
      for (const e of this.sunNeeds()) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < Cn) || this.fetchSun(t, e, s);
      }
      this._sunDetail && this._sunTab === "outlook" && this.loadWeather(t);
    }
  }
  async fetchSun(t, e, s) {
    const n = this.hass;
    if (!n) return;
    const i = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: i, parts: s?.parts ?? {} } };
    try {
      const o = this.sunRequests(t, e, i), r = {};
      await Promise.all(o.map(async (l) => r[l.part] = await Na(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: i, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: i, parts: {} } };
    }
  }
  /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
  async loadWeather(t) {
    const e = t.entities.forecast.weather, s = this.hass;
    if (!e || !s || this._sunWeatherBusy || this._sunWeather && Date.now() - this._sunWeather.at < Dn) return;
    this._sunWeatherBusy = !0;
    const n = Date.now();
    try {
      const o = (await s.callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type: "daily" },
        target: { entity_id: e },
        return_response: !0
      }))?.response?.[e]?.forecast ?? [];
      this._sunWeather = { at: n, days: o.filter((r) => r.datetime).map((r) => ({ day: $t(Date.parse(r.datetime)), condition: r.condition })) };
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
    const e = Date.now(), s = $t(e), n = t.num.forecast, i = this._batData["sun:hist"], o = this._batData["sun:five"], r = t.entities;
    let l = /* @__PURE__ */ new Map(), c = new Array(24).fill(void 0), d = [];
    if (i && Object.keys(i.parts).length) {
      if (this._sunCache?.entry !== i) {
        const _ = r.pv.total_generation ? i.parts.energy?.[r.pv.total_generation] : void 0;
        let S = $e(_, "change");
        S.size || (S = $e(r.pv.power ? i.parts.power?.[r.pv.power] : void 0, "mean"));
        const C = $e(r.house.power ? i.parts.house?.[r.house.power] : void 0, "mean"), Z = Array.from({ length: 24 }, (st, St) => {
          const Rt = [...C.entries()].filter(([Nt]) => Nt < s).map(([, Nt]) => Nt[St]).filter((Nt) => Nt !== void 0);
          return Rt.length >= 3 ? ma(Rt) : void 0;
        }), lt = ((r.forecast.energy_today ? i.parts.forecast?.[r.forecast.energy_today] : void 0) ?? []).filter((st) => typeof st.mean == "number" && new Date(st.start).getHours() === 8).map((st) => ({ day: $t(st.start), forecast: st.mean, actual: he(S.get($t(st.start)), 20) })).filter((st) => st.actual !== void 0 && st.day < s);
        this._sunCache = { entry: i, days: S, houseCurve: Z, pairs: lt };
      }
      l = this._sunCache.days, c = this._sunCache.houseCurve, d = this._sunCache.pairs;
    }
    const p = fn(l, s, n.learn_days, n.possible_percentile), h = r.pv.power ? o?.parts.power?.[r.pv.power] : void 0;
    let v = l.get(s);
    if (h?.length) {
      const _ = new Array(24).fill(void 0);
      for (const S of h) {
        if (S.start < s || typeof S.mean != "number") continue;
        const C = new Date(S.start).getHours();
        _[C] = (_[C] ?? 0) + Math.max(0, S.mean) / 1e3 / Ft;
      }
      v = _;
    }
    const b = Ot(this.hass, t.entities.daily.pv_generation) ?? (v && v.some((_) => _ !== void 0) ? v.reduce((_, S) => _ + (S ?? 0), 0) : void 0), f = Ot(this.hass, r.forecast.energy_today), g = xn(d) ?? n.typical_deviation / 100;
    let u;
    if (h?.length) {
      let _ = 0, S = 0;
      for (const C of h)
        C.start < e - X || C.start >= e || typeof C.mean != "number" || (_ += Math.max(0, C.mean) / 1e3 / Ft, S += (p.curve[new Date(C.start).getHours()] ?? 0) / Ft);
      u = { actual: _, possible: S };
    }
    const x = $n(b, f, p.curve, e, g, u), A = x ? Math.max(0, x.value - (b ?? 0)) : 0, $ = yn(v, x ? A : 0, p.curve, e);
    if (!x) for (let _ = new Date(e).getHours(); _ < 24; _++) $[_] = void 0;
    const w = this.place(), j = w ? te(s, w.latitude, w.longitude) : void 0, B = t.num.flows.idle_threshold, E = (h ?? []).filter((_) => _.start >= s && typeof _.mean == "number"), D = E.filter((_) => _.mean >= B), k = D.length ? D[0].start : void 0, M = E.reduce((_, S) => !_ || S.mean > _.mean ? S : _, void 0);
    let z;
    if (j) {
      const _ = [];
      for (const rt of [...new Set((h ?? []).map((lt) => $t(lt.start)))].filter((lt) => lt < s)) {
        const lt = (h ?? []).filter((St) => $t(St.start) === rt && St.mean >= B).pop(), st = w ? te(rt, w.latitude, w.longitude) : void 0;
        lt && st && _.push(st.set - (lt.start + 5 * 6e4));
      }
      const S = _.length >= 3 ? ma(_) : 0, C = D.length ? D[D.length - 1].start + 5 * 6e4 : void 0;
      z = e > j.set && (C === void 0 || e - C > 15 * 6e4) && C !== void 0 ? { at: C, over: !0 } : { at: j.set - S, over: !1 };
    }
    return {
      now: e,
      today: s,
      ready: !!i && i.status !== "loading" || !!i?.parts && Object.keys(i.parts).length > 0,
      days: l,
      learned: p,
      done: b,
      forecastToday: f,
      deviation: g,
      pairs: d,
      estimate: x,
      hours: $,
      rise: j?.rise,
      set: j?.set,
      started: k,
      ends: z,
      fiveRows: h,
      peak: M ? { kw: M.mean / 1e3, at: M.start } : void 0,
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
    return m`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${s ? "true" : "false"} @click=${() => {
      this._sunHint = s ? void 0 : t;
    }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${s ? m`<div class="sun-note" role="note" @click=${() => {
      this._sunHint = void 0;
    }}>${e}</div>` : L}`;
  }
  /** A ring with the number centred in it and the unit under the number. */
  ring(t, e, s, n, i, o) {
    const r = (e - s) / 2, l = 2 * Math.PI * r, c = F(t, 0, 1);
    return m`<div class="sun-ring" style="width:${e}px;height:${e}px" role="img" aria-label=${o}>
        <svg viewBox="0 0 ${e} ${e}" aria-hidden="true">
          <circle cx=${e / 2} cy=${e / 2} r=${r} fill="none" class="track" stroke-width=${s}></circle>
          <circle cx=${e / 2} cy=${e / 2} r=${r} fill="none" class="fill" stroke-width=${s} stroke-linecap="round" stroke-dasharray="${(l * c).toFixed(1)} ${l.toFixed(1)}" transform="rotate(-90 ${e / 2} ${e / 2})"></circle>
        </svg>
        <span class="num" style="font-size:${Math.round(e * (e <= 44 ? 0.3 : 0.27))}px">${n}</span><span class="unit">${i}</span>
      </div>`;
  }
  /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
  renderSoFar(t) {
    const e = this.t.sun, s = t.estimate, n = s && t.done !== void 0 && s.value > 0 ? Math.min(100, Math.round(t.done / s.value * 100)) : void 0;
    return m`<div class="sun-sofar">
        <div class="text"><span class="sub">${e.soFar}</span><span class="val">${t.done === void 0 ? T : `${at(t.done)} kWh`}</span><span class="sub">${s ? e.ofEstimate(at(s.value)) : T}</span></div>
        ${n === void 0 ? L : this.ring(n / 100, 40, 6, String(n), "%", e.ringLabel(R(n)))}
      </div>`;
  }
  /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
  renderSunFlow(t, e, s) {
    const n = this.t, i = e.num.flows.idle_threshold, o = Bt.map((l) => ({ sink: l, watts: t.flows.filter((c) => c.from === "sun" && c.to === l).reduce((c, d) => c + d.watts, 0) })).filter((l) => q(l.watts, i));
    if (!o.length) return m`<p class="bat-sub">${t.sun === void 0 ? T : n.sun.flowNone}</p>`;
    const r = "kW";
    return m`<div class="mix-bar sun-bar ${s ? "large" : ""}" role="img" aria-label=${o.map((l) => `${n.tile[l.sink]} ${Q(l.watts, r)}`).join(", ")}>${o.map((l) => m`<div style="flex:${l.watts.toFixed(0)} 1 0;background:var(${jt[l.sink]})"></div>`)}</div>
        ${s ? m`<div class="sun-legend" role="group" aria-label=${n.sun.flowTitle}>${o.map((l) => m`<span><span class="name"><i style="background:var(${jt[l.sink]})"></i>${n.tile[l.sink]}</span><b>${Q(l.watts, r)}</b></span>`)}</div>` : L}`;
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
    const e = t.entities.forecast.weather, s = this.weatherGroup(e ? it(this.hass, e)?.state : void 0);
    return s ? this.t.sun.weather[s] : void 0;
  }
  // ----------------------------------------------------------------- popup
  renderSunPopup(t, e, s, n, i) {
    const o = this.t, r = this.sunView(s), l = q(n.sun, s.num.flows.idle_threshold), c = this.weatherNow(s), d = l ? c ? o.sun.producingWith(c) : o.sun.producing : n.sun === void 0 ? T : o.idle.sun, p = Math.min(236, e.width), h = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, v = F(h - p / 2, 0, e.width - p), y = t.side === "L" ? e.left[t.key] : e.right[t.key], b = y - e.tile.h / 2, f = y < e.height / 2, g = f ? `top:${(b + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - b + 8).toFixed(0)}px`;
    return m`<div class="pop bat-pop sun-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${v.toFixed(0)}px;${g};width:${p}px">
        <i class="arrow ${f ? "up" : "down"}" aria-hidden="true" style="left:${(h - v - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${d}</span></div>
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${o.sun.powerNow}</span><span class="pop-big">${n.sun === void 0 ? T : Q(n.sun, i === "W" && n.sun >= s.num.flows.kw_from ? "kW" : i)}</span></div>
          ${l ? this.renderSunFlow(n, s, !1) : L}
        </div>
        ${this.renderSoFar(r)}
        <div class="pop-rows">
          <div class="pop-row"><span>${o.sun.started}</span><b>${r.started === void 0 ? T : nt(r.started)}</b></div>
          <div class="pop-row"><span>${r.ends?.over ? o.sun.ended : o.sun.ends}</span><b>${r.ends === void 0 ? T : nt(r.ends.at)}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openSunDetail()}><span>${o.sun.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
  }
  // ----------------------------------------------------------------- the detail
  renderSunDetail(t, e) {
    const s = this.t, n = ["today", "hist", "outlook"].map((o) => ({ value: o, label: s.sun.tabs[o] })), i = this.sunView(t);
    return m`<section class="bat-detail sun-detail" role="dialog" aria-modal="true" aria-label=${s.sun.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeSunDetail()}>‹ ${s.sun.back}</button>
          <h2>${s.sun.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeSunDetail()}>${s.sun.done}</button>
        </div>
        <ed-segmented .options=${n} .value=${this._sunTab} label=${s.sun.tabsLabel} @hdk-select=${(o) => {
      this._sunTab = o.detail.value, this._sunHint = void 0, this._batScrub = {};
    }}></ed-segmented>
        ${this._sunTab === "today" ? this.renderSunToday(t, e, i) : this._sunTab === "hist" ? this.renderSunHistory(t, i) : this.renderSunOutlook(t, i)}
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
    if (!t.entities.pv.power || !e.fiveRows?.some((C) => C.start >= e.today)) return;
    const n = this.t.sun, i = e.rise !== void 0 ? F(Math.floor(this.hourOf(e.rise) - 0.5), 0, 22) : 6, o = e.set !== void 0 ? F(Math.ceil(this.hourOf(e.set) + 0.5), i + 2, 24) : 18, r = (o - i) * Ft, l = e.today + i * X, c = e.today + o * X, d = (C) => P(ee + C / (r - 1) * (ct - ee)), p = yt(e.fiveRows, "mean", l, c, r).map((C) => C === void 0 ? void 0 : C / 1e3), h = (C) => i + (C + 0.5) / Ft, v = Math.floor((e.now - l) / (c - l) * r), y = (C, Z) => {
      const rt = Z - 0.5, lt = Math.floor(rt), st = C[lt], St = C[lt + 1];
      if (st === void 0 && St === void 0) return;
      const Rt = rt - lt;
      return (st ?? 0) * (1 - Rt) + (St ?? 0) * Rt;
    }, b = e.learned.curve.some((C) => C !== void 0), f = Array.from({ length: r }, (C, Z) => b ? y(e.learned.curve, h(Z)) : void 0), g = e.estimate, u = g ? Math.max(0, g.value - (e.done ?? 0)) : 0, x = g && u > 0 ? (g.low - (e.done ?? 0)) / u : 1, A = g && u > 0 ? (g.high - (e.done ?? 0)) / u : 1, $ = (C) => C >= v, w = Array.from({ length: r }, (C, Z) => g && $(Z) ? y(e.hours.map((rt, lt) => lt >= new Date(e.now).getHours() ? rt : void 0), h(Z)) : void 0), j = w.map((C) => C === void 0 ? void 0 : C * x), B = w.map((C, Z) => C === void 0 ? void 0 : Math.min(C * A, Math.max(C, f[Z] ?? 1 / 0))), E = Math.max(1, ...p.map((C) => C ?? 0), ...f.map((C) => C ?? 0), ...B.map((C) => C ?? 0)), D = Math.ceil(E) > 7 ? 2 : 1, k = Math.ceil(E / D) * D, M = 150, z = (C) => P(M - F(C, 0, k) / k * (M - 12)), _ = (C) => Q(C * 1e3, "kW"), S = Array.from({ length: k / D }, (C, Z) => (Z + 1) * D);
    return {
      id: "sun-today",
      h: 170,
      n: r,
      x: d,
      fade: 0,
      start: F(v / (r - 1) * 100, 0, 100),
      grid: [{ y: M, strong: !0 }, ...S.map((C) => ({ y: z(C) }))],
      labels: [...S.map((C) => ({ y: z(C), text: O(C) })), { y: M, text: "0" }],
      body: I`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${Wa(j, B, d, z)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${zt(f, d, z)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${de(p, d, z, M)} fill="url(#sun-area)"></path>
          <path d=${zt(p, d, z)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (C) => p[C] === void 0 ? void 0 : { y: z(p[C]), color: "var(--ed-sun)" },
      read: (C) => {
        const Z = nt(l + (C + 0.5) * ((c - l) / r)), rt = [p[C] !== void 0 ? _(p[C]) : w[C] !== void 0 ? `${n.chartLegend.forecast.toLowerCase()} ≈ ${_(w[C])}` : T];
        return f[C] !== void 0 && rt.push(`${n.possibleShort} ${_(f[C])}`), `${Z} · ${rt.join(" · ")}`;
      },
      from: nt(l),
      to: nt(c),
      legend: m`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-sun)"></i>${n.chartLegend.production}</span><span><i class="dots" aria-hidden="true"></i>${n.chartLegend.possible}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.3"></i>${n.chartLegend.forecast}</span></div>`
    };
  }
  /** The kWh the sun gave today to the house, the car, the boiler, the battery and the grid (an estimate from the totals of the day). */
  whereToday(t) {
    const e = this.today(t);
    if (e.pv === void 0 || e.bchg === void 0 || e.gout === void 0 || e.gin === void 0 || e.bdis === void 0) return;
    const s = Math.max(0, e.pv + e.gin + e.bdis - e.gout - e.bchg), n = Math.max(0, e.pv - e.bchg - e.gout), i = e.car ?? 0, o = e.boil ?? 0, r = Math.max(0, s - i - o), l = s > 0 ? Math.min(1, n / s) : 0;
    return [
      { key: "house", kwh: r * l },
      { key: "car", kwh: i * l },
      { key: "boil", kwh: o * l },
      { key: "batIn", kwh: e.bchg },
      { key: "gridOut", kwh: e.gout }
    ].filter((c) => c.kwh > 5e-3);
  }
  renderSunToday(t, e, s) {
    const n = this.t, i = "kW", o = this.todayChart(t, s), r = this.whereToday(t), l = r?.reduce((d, p) => d + p.kwh, 0) ?? 0, c = e.sun === void 0 ? T : Q(e.sun, i);
    return m`<div class="bat-card">
          <span class="bat-cap">${n.sun.powerNow}</span>
          <span class="bat-huge">${c}</span>
          ${q(e.sun, t.num.flows.idle_threshold) ? this.renderSunFlow(e, t, !0) : L}
        </div>
        <div class="bat-card rel">
          <div class="bat-card-bar"><span class="sun-title">${n.sun.chartTitle}</span><span class="sun-unit">${n.sun.chartUnit}${this.hint("chart", n.sun.hints.chart)}</span></div>
          ${this.renderChartOrEmpty("sun:five", 170, o)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi sun-kpi-ring">${this.renderSoFar(s)}</div>
          <div class="bat-kpi"><span class="sub">${n.sun.peakToday}</span><span class="val">${s.peak ? Q(s.peak.kw * 1e3, i) : T}</span><span class="sub">${s.peak ? n.sun.at(nt(s.peak.at)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${n.sun.startedLong}</span><span class="val">${s.started === void 0 ? T : nt(s.started)}</span><span class="sub">${s.rise === void 0 ? "" : n.sun.sunrise(nt(s.rise))}</span></div>
          <div class="bat-kpi"><span class="sub">${s.ends?.over ? n.sun.ended : n.sun.ends}</span><span class="val">${s.ends === void 0 ? T : nt(s.ends.at)}</span><span class="sub">${s.set === void 0 ? "" : n.sun.sunset(nt(s.set))}</span></div>
        </div>
        ${r ? m`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.sun.whereTitle}</span>${this.hint("where", n.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${r.map((d) => m`<div style="flex:${d.kwh.toFixed(3)} 1 0;background:var(${jt[d.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${n.sun.whereTitle}>${r.map((d) => m`<span><span class="name"><i style="background:var(${jt[d.key]})"></i>${n.tile[d.key]}</span><b>${at(d.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${l > 0 ? n.sun.whereUnit : T}</span>
            </div>` : L}`;
  }
  // ----------------------------------------------------------------- Historie
  renderSunRange(t) {
    const e = this.t.sun.hist, s = xa.map((n) => ({ value: n, label: e.ranges[n] }));
    return m`<ed-segmented .options=${s} .value=${this.sunRange(t)} label=${e.rangeLabel} @hdk-select=${(n) => this.setSunRange(n.detail.value)}></ed-segmented>`;
  }
  /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
  rangeDays(t, e, s = 0) {
    const n = xe[e];
    return Array.from({ length: n }, (i, o) => mt(t.today, -(n - o) - s));
  }
  /** The production by day of the range: the totals, the blocks of the day and what was possible. */
  histData(t, e, s) {
    const n = t.num.forecast;
    return this.rangeDays(e, s).map((o) => {
      const r = e.days.get(o), l = he(r, 20);
      return { day: o, hours: r, total: l, blocks: l === void 0 ? void 0 : _n(r), possible: Tn(e.days, o, n.learn_days, n.possible_percentile) };
    });
  }
  histChart(t, e, s) {
    const n = this.t.sun.hist, i = this.histData(t, e, s);
    if (!i.some((u) => u.total !== void 0)) return;
    const o = i.length, r = (ct - ee) / o, l = (u) => P(ee + u * r + r / 2), c = Math.max(1, ...i.map((u) => Math.max(u.total ?? 0, u.possible ?? 0))), d = ce(c), p = 150, h = (u) => P(p - F(u, 0, d) / d * (p - 14)), v = this._sunMode === "parts", y = (u) => s === "7d" ? new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(i[u].day) : Et(i[u].day).replace(/^\S+\s/, "");
    let b;
    if (v) {
      const u = i.map((D, k) => l(k)), x = i.map((D) => D.blocks), A = x.map((D, k) => D ? k : -1).filter((D) => D >= 0), $ = A.map((D) => x[D].reduce((k, M) => [...k, k[k.length - 1] + M], [0])), w = Array.from({ length: 6 }, (D, k) => Mn(A.map((M) => u[M]), $.map((M) => h(M[k])))), j = (D) => D.map(([k, M]) => `${P(k)},${P(M)}`).join(" "), B = i.map((D) => D.possible), E = B.some((D) => D !== void 0) ? de(B, l, h, p) : "";
      b = I`<path d=${E} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((D) => I`<polygon points=${`${j(w[D + 1])} ${j([...w[D]].reverse())}`} style="fill:${$a[D]}"></polygon>`)}
          ${[1, 2, 3, 4].map((D) => I`<polyline points=${j(w[D])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
    } else {
      const u = Math.min(s === "7d" ? 26 : 7, r - 3);
      b = I`${i.map((x, A) => I`
          ${x.possible === void 0 ? L : I`<rect x=${P(l(A) - u / 2)} y=${h(x.possible)} width=${u} height=${P(p - h(x.possible))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${x.total === void 0 ? L : I`<rect x=${P(l(A) - u / 2)} y=${h(x.total)} width=${u} height=${P(Math.max(1, p - h(x.total)))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${x.total !== void 0 && s === "7d" ? I`<text x=${l(A)} y=${h(x.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${N(x.total, 1)}</text>` : L}`)}`;
    }
    const f = s === "7d" ? i.map((u, x) => x) : [0, 7, 14, 21, o - 1], g = v ? m`<div class="sun-blocks" role="group">${n.blocks.map((u, x) => m`<span><i style="background:${$a[x]}"></i><span>${u}</span></span>`)}</div>` : m`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${n.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${n.possible}</span></div>`;
    return {
      id: `sun-hist-${v ? "parts" : "total"}`,
      h: 170,
      n: o,
      x: l,
      fade: 0,
      grid: [{ y: p, strong: !0 }, { y: h(d / 2) }, { y: h(d) }],
      labels: [{ y: h(d), text: O(d) }, { y: h(d / 2), text: O(d / 2, d / 2 % 1 ? 1 : 0) }, { y: p, text: "0" }],
      body: I`${b}${f.map((u) => I`<text x=${l(u)} y=${p + 16} text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${y(u)}</text>`)}`,
      dot: (u) => i[u].total === void 0 ? void 0 : { y: h(i[u].total), color: "var(--ed-sun)" },
      read: (u) => {
        const x = i[u], A = Et(x.day);
        if (x.total === void 0) return `${A} · ${T}`;
        if (v && x.blocks) {
          const $ = x.blocks.indexOf(Math.max(...x.blocks));
          return `${A} · ${N(x.total, 1)} kWh · ${n.mostIn(n.blocks[$])}`;
        }
        return `${A} · ${N(x.total, 1)} kWh${x.possible ? ` · ${n.ofPossible(R(Math.round(x.total / x.possible * 100)))}` : ""}`;
      },
      from: "",
      to: "",
      legend: g
    };
  }
  /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
  eastWest(t) {
    const e = this.t.sun.hist, s = 46, n = (r, l, c) => {
      const d = (p) => `${P(70 + s * Math.cos(p * Math.PI / 180))},${P(64 - s * Math.sin(p * Math.PI / 180))}`;
      return I`<path d="M${d(r)} A${s},${s} 0 0 1 ${d(l)}" fill="none" style="stroke:${c}" stroke-width="10"></path>`;
    }, i = 180 - 180 * t, o = Math.round(t * 100);
    return m`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${e.eastWestLabel(R(o), R(100 - o))}>${n(180, i + 1.5, "var(--ed-warning)")}${n(i - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${R(o)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${R(100 - o)}</span></div>`;
  }
  renderSunHistory(t, e) {
    const s = this.t.sun, n = t.num.forecast, i = this.sunRange(t), o = this.histData(t, e, i), r = o.filter((_) => _.total !== void 0), l = !e.ready, c = r.reduce((_, S) => _ + S.total, 0);
    o.reduce((_, S) => _ + (S.possible ?? 0), 0);
    const d = r.filter((_) => _.possible !== void 0), p = d.length ? Math.round(d.reduce((_, S) => _ + S.total, 0) / d.reduce((_, S) => _ + S.possible, 0) * 100) : void 0, h = this.histChart(t, e, i), v = ["total", "parts"].map((_) => ({ value: _, label: s.hist.modes[_] })), y = r.reduce((_, S) => !_ || S.total > _.total ? S : _, void 0), b = r.reduce((_, S) => !_ || S.total < _.total ? S : _, void 0), f = (_) => s.hist.dayOfPossible(Et(_.day), _.possible ? R(Math.round(_.total / _.possible * 100)) : T), g = t.entities, u = g.pv.power && this._batData["sun:hist"]?.parts.power?.[g.pv.power] || [], x = o[0]?.day ?? e.today, A = u.filter((_) => _.start >= x && _.start < e.today && typeof _.max == "number").reduce((_, S) => !_ || S.max > _.max ? S : _, void 0), $ = (_) => {
      const S = _.map((C) => C.hours ? C.hours.filter((Z) => (Z ?? 0) >= 0.05).length : void 0).filter((C) => C !== void 0);
      return S.length ? S.reduce((C, Z) => C + Z, 0) / S.length : void 0;
    }, w = $(o), j = $(this.rangeDays(e, i, xe[i]).map((_) => ({ hours: e.days.get(_) }))), B = e.rise !== void 0 && e.set !== void 0 ? this.hourOf((e.rise + e.set) / 2) : 12;
    let E = 0, D = 0;
    for (const _ of r) _.hours?.forEach((S, C) => {
      S && (C + 0.5 < B ? E += S : D += S);
    });
    const k = E + D > 0 ? E / (E + D) : void 0, M = r.filter((_) => _.total > n.good_day).length, z = e.pairs.slice(-7);
    return m`${this.renderSunRange(t)}
        <div class="bat-card">
          <span class="bat-cap">${s.hist.last(xe[i])}</span>
          <span class="bat-huge sun-huge">${r.length ? `${N(c, 1)} kWh` : T}</span>
          <span class="bat-sub">${r.length ? m`${p === void 0 ? L : m`<b class="sun-yellow">${s.hist.ofPossible(R(p))}</b> · `}${s.hist.average(`${N(c / r.length, 1)} kWh`)}` : T}</span>
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
          <div class="bat-kpi"><span class="sub">${s.hist.best}</span><span class="val">${y ? `${N(y.total, 1)} kWh` : T}</span><span class="sub">${y ? f(y) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.worst}</span><span class="val">${b ? `${N(b.total, 1)} kWh` : T}</span><span class="sub">${b ? f(b) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.peak}</span><span class="val">${A ? Q(A.max, "kW") : T}</span><span class="sub">${A ? `${Et(A.start)} ${s.at(nt(A.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.length}</span><span class="val">${w === void 0 ? T : s.hist.lengthValue(N(w, 1))}</span><span class="sub">${j === void 0 ? "" : (i === "7d" ? s.hist.before7 : s.hist.before30)(N(j, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${s.hist.eastWest}</span>${k === void 0 ? m`<span class="bat-sub">${T}</span>` : this.eastWest(k)}</div>
          <div class="bat-card"><span class="bat-cap">${s.hist.goodDays}</span><span class="val big">${r.length ? s.hist.goodOf(M, r.length) : T}</span><span class="bat-sub">${s.hist.over(O(n.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${r.map((_) => m`<i class=${_.total > n.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${z.length >= 3 ? this.renderAccuracy(z, e) : L}`;
  }
  renderAccuracy(t, e) {
    const s = this.t.sun, n = ce(Math.max(...t.flatMap((c) => [c.forecast, c.actual]))), i = 310, o = 60, r = 14, l = i / t.length;
    return m`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${s.hist.accuracyTitle}</span>${this.hint("acc", s.hints.acc)}</div>
        <div class="sun-acc"><b>±${R(Math.round(e.deviation * 100))}</b><span class="bat-sub">${s.hist.accuracyAverage(e.pairs.length)}</span></div>
        <svg viewBox="0 0 ${i} 80" class="sun-pairs" role="img" aria-label=${s.hist.accuracyLabel}>
          <line x1="0" y1=${o} x2=${i} y2=${o} class="axis"></line>
          ${t.map((c, d) => {
      const p = d * l + (l - 2 * r - 2) / 2, h = (v) => P(v / n * 50);
      return I`<rect x=${P(p)} y=${P(o - h(c.forecast))} width=${r} height=${h(c.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${P(p + r + 2)} y=${P(o - h(c.actual))} width=${r} height=${h(c.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${P(p + r + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(c.day)}</text>`;
    })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${s.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${s.hist.actual}</span></div>
      </div>`;
  }
  // ----------------------------------------------------------------- Výhled
  renderSunOutlook(t, e) {
    const s = this.t.sun, n = s.outlook, i = t.num.forecast, o = t.entities, r = e.estimate, l = i.good_power / 1e3, c = `${N(i.good_power / 1e3, i.good_power % 1e3 ? 1 : 0)} kW`, d = r && e.done !== void 0 && r.value > 0 ? Math.min(100, Math.round(e.done / r.value * 100)) : void 0, p = r ? { low: 1, medium: 2, high: 3 }[r.certainty] : 0, h = [o.forecast.energy_today, o.forecast.energy_tomorrow, o.forecast.energy_day_2, o.forecast.energy_day_3, o.forecast.energy_day_4], v = this._sunWeather?.days ?? [], y = h.map((k, M) => {
      const z = mt(e.today, M), _ = M === 0 ? r?.value : Ot(this.hass, k), S = M === 0 ? e.hours : _ === void 0 ? void 0 : vn(_, e.learned.curve), C = M === 0 ? this.weatherGroup(o.forecast.weather ? it(this.hass, o.forecast.weather)?.state : void 0) : this.weatherGroup(v.find((Z) => Z.day === z)?.condition);
      return { i: M, day: z, kwh: _, hours: S, condition: C };
    }).filter((k) => k.kwh !== void 0 || k.i === 0), b = y.filter((k) => k.kwh !== void 0), f = (k) => k ? wn(k, i.strip_from, i.strip_to, l) : void 0, g = b.filter((k) => k.i > 0 || b.length === 1).reduce((k, M) => !k || M.kwh > k.kwh ? M : k, void 0), u = g ? f(g.hours) : void 0, x = this.place(), A = x ? te(e.today, x.latitude, x.longitude) : void 0, $ = x ? te(mt(e.today, 1), x.latitude, x.longitude) : void 0, w = A ? Math.round((A.set - A.rise) / 6e4) : void 0, j = A && $ ? Math.round(($.set - $.rise - (A.set - A.rise)) / 6e4) : void 0, B = this.evening(t, e), E = Array.from({ length: i.strip_to - i.strip_from + 1 }, (k, M) => i.strip_from + M), D = new Date(e.now).getHours();
    return m`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${n.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${r ? `${at(r.value)} kWh` : T}</span>
              <span class="bat-sub">${r ? n.between(at(r.low), at(r.high)) : ""}</span>
              ${r ? m`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((k) => m`<i class=${k <= p ? "on" : ""}></i>`)}</span><b>${n.certainty[r.certainty]}</b>${this.hint("conf", s.hints.conf)}</span>` : L}
            </div>
            ${d === void 0 ? L : this.ring(d / 100, 76, 8, String(d), "%", s.ringLabel(R(d)))}
          </div>
        </div>
        ${y.length > 1 ? m`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.fiveTitle}</span>${this.hint("five", s.hints.five(c))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${E.map((k) => m`<span>${k % 3 === 0 ? k : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${y.map((k) => {
      const M = f(k.hours);
      return m`<div class="sun-five-row">
                    <span class="day"><b>${k.i === 0 ? n.today : aa(k.day)}</b><span>${k.condition ? s.weather[k.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${E.map((z) => {
        const _ = k.hours?.[z], S = _ === void 0 ? "none" : _ >= l ? "strong" : _ >= l * 0.35 ? "mid" : _ >= l * 0.075 ? "faint" : "none";
        return m`<i class="${S} ${k.i === 0 && z === D ? "now" : ""}"></i>`;
      })}</span>
                    <span class="end"><b>${k.kwh === void 0 ? T : `${k.i ? "≈ " : ""}${at(k.kwh)}`}</b><span class=${M ? "" : "off"}>${k.kwh === void 0 ? "" : M ? n.window(M[0], M[1]) : n.below(c)}</span></span>
                  </div>`;
    })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${n.strong(c)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${n.weak}</span></div>
            </div>` : L}
        ${B ? m`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.eveningTitle}</span>${this.hint("eve", s.hints.eve)}</div>
              <div class="bat-list">${B.map((k) => m`<div class="bat-line sun-line"><span><i style="background:var(${k.color})"></i>${k.label}</span><b>${k.value}</b></div>`)}
              </div>
            </div>` : L}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${n.dayLength}</span><span class="val">${w === void 0 ? T : n.hoursMinutes(Math.floor(w / 60), w % 60)}</span><span class="sub">${j === void 0 ? "" : n.dayChange(j)}</span></div>
          <div class="bat-kpi"><span class="sub">${n.bestDay}</span><span class="val">${g ? g.i === 0 ? n.today : aa(g.day) : T}</span><span class="sub">${g ? n.bestSub(at(g.kwh), u ? n.window(u[0], u[1]) : "") : ""}</span></div>
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
    const s = t.num.forecast, n = t.entities, i = V(this.hass, n.battery.state_of_charge), o = this.sunHouseCurve();
    if (i === void 0 || !o.some((p) => p !== void 0) || !e.estimate) return;
    const r = Sn({
      now: e.now,
      soc: i,
      capacity: t.num.battery.capacity,
      reserve: this.batteryReserve(t),
      sun: e.hours,
      house: o,
      efficiency: s.efficiency / 100,
      eveningHour: s.evening_hour,
      morningHour: s.morning_hour,
      car: n.wallbox.power && Ea(ht(this.hass, n.wallbox.status)) !== "disconnected" ? { startSoc: s.car_start_soc, stopSoc: s.car_stop_soc, minSun: s.car_min_sun, watts: t.num.wallbox.power_min } : void 0
    }), l = this.t.sun.outlook, c = [], d = nt(e.today + s.evening_hour * X);
    if (r.socAtEvening !== void 0 && (c.push({ color: "--ed-battery", label: l.batteryNow, value: R(Math.round(i)) }), c.push({ color: "--ed-sun", label: l.sunUntil(d), value: `≈ ${at(r.sunUntilEvening)} kWh` }), c.push({ color: "--ed-house", label: l.houseUntil(d), value: `≈ ${at(r.houseUntilEvening)} kWh` })), r.fullAt !== void 0 && c.push({ color: "--ed-battery", label: l.full, value: `≈ ${nt(r.fullAt)}` }), r.socAtEvening !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(nt(e.today + s.evening_hour * X)), value: `≈ ${R(Math.round(r.socAtEvening))}` }), r.carTotal > 0) {
      const p = this.carKwhPerKm(t);
      c.push({ color: "--ed-car", label: l.carSun, value: `≈ ${at(r.carSun)} kWh${p ? ` · ${O(r.carSun / p)} km` : ""}` });
    }
    return r.socAtMorning !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(nt(mt(e.today, 1) + s.morning_hour * X)), value: `≈ ${R(Math.round(r.socAtMorning))}` }), c;
  }
};
function An(a, t = Bt) {
  const e = Math.round(Math.max(116, Math.min(132, a * 0.377))), s = 56, n = 6, i = Math.max(1, t.length), o = i * s + (i - 1) * n, r = Object.fromEntries(t.map((c, d) => [c, s / 2 + d * (s + n)])), l = Object.fromEntries(
    pt.map((c, d) => [c, i < 4 ? s / 2 + d * (s + n) : (d + 0.5) * o / pt.length])
  );
  return { width: a, tile: { w: e, h: s }, gap: n, height: o, left: l, right: r, xa: e - 8, xb: a - e + 8 };
}
const tt = (a) => a.toFixed(1);
function En(a, t, e) {
  const s = a.filter((b) => b.to in t.right);
  if (!s.length) return [];
  const n = (b) => {
    const f = /* @__PURE__ */ new Map();
    for (const g of s) f.set(g[b], (f.get(g[b]) ?? 0) + g.watts);
    return f;
  }, i = Math.max(...n("from").values(), ...n("to").values()), o = Math.min(e.maxPxPerKw / 1e3, 44 / i), r = (b) => Math.max(e.minPx, b.watts * o), l = /* @__PURE__ */ new Map();
  for (const b of pt) {
    const f = s.filter((g) => g.from === b).reduce((g, u) => g + r(u), 0);
    l.set(b, t.left[b] - f / 2);
  }
  const c = /* @__PURE__ */ new Map();
  for (const b of Bt.filter((f) => f in t.right)) {
    const f = s.filter((g) => g.to === b).reduce((g, u) => g + r(u), 0);
    c.set(b, t.right[b] - f / 2);
  }
  const d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const b of pt)
    for (const f of s.filter((g) => g.from === b).sort((g, u) => Bt.indexOf(g.to) - Bt.indexOf(u.to)))
      d.set(f, l.get(b)), l.set(b, l.get(b) + r(f));
  for (const b of Bt.filter((f) => f in t.right))
    for (const f of s.filter((g) => g.to === b).sort((g, u) => pt.indexOf(g.from) - pt.indexOf(u.from)))
      p.set(f, c.get(b)), c.set(b, c.get(b) + r(f));
  const { xa: h, xb: v } = t, y = (h + v) / 2;
  return s.map((b) => {
    const f = r(b), g = d.get(b), u = g + f, x = p.get(b), A = x + f;
    return {
      from: b.from,
      to: b.to,
      watts: b.watts,
      thickness: f,
      d: `M${h} ${tt(g)} C${tt(y)} ${tt(g)} ${tt(y)} ${tt(x)} ${v} ${tt(x)} L${v} ${tt(A)} C${tt(y)} ${tt(A)} ${tt(y)} ${tt(u)} ${h} ${tt(u)} Z`,
      centre: `M${h} ${tt(g + f / 2)} C${tt(y)} ${tt(g + f / 2)} ${tt(y)} ${tt(x + f / 2)} ${v} ${tt(x + f / 2)}`
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
}, we = 42, ke = 10, Bn = (a) => class extends a {
  onKey(t) {
    t.key === "Escape" && this._batDetail ? this.closeBatteryDetail(!0) : t.key === "Escape" && this._sunDetail ? this.closeSunDetail() : t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const s = this.t, n = t.entities.wallbox, i = [], o = e.carLink === "connected" || e.carLink === "charging", r = ht(this.hass, n.block_charging) === "on", l = ht(this.hass, n.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    return r ? i.push({ kind: "info", ...s.alerts.blocked }) : l && i.push({ kind: "warn", ...s.alerts.priorityWaiting }), ht(this.hass, n.boost) === "on" && o && i.push({ kind: "warn", ...s.alerts.boostWallbox }), ht(this.hass, t.entities.boiler.boost) === "on" && i.push({ kind: "warn", ...s.alerts.boostBoiler }), i;
  }
  renderAlerts(t, e) {
    const s = this.alerts(t, e);
    return s.length ? m`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${s.map(
      (n) => m`<li class="alert ${n.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${n.kind === "warn" ? U.alert : U.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${n.title}</span><span class="alert-text">${n.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : L;
  }
  renderElectricity(t, e) {
    const s = e.summarySource ? `var(${ft[e.summarySource]})` : void 0;
    return m`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(n) => {
      n.stopPropagation(), this.openAll();
    }}>
              ${t.titles.electricity ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${U.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(e.summary, s)}
        </div>
        ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : L}
        ${this._pop || this._all ? m`<button type="button" class="scrim" aria-label=${this.t.close} @click=${() => this.closePop()}></button>` : L}
      </section>`;
  }
  openAll() {
    this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, e, s) {
    const n = this.t, i = t.entities, o = t.num.scale, r = t.num.flows.idle_threshold, l = e.carLink, c = e.soc, d = c !== void 0 && c <= this.batteryReserve(t), p = (w) => c === void 0 ? void 0 : { f: c / 100, active: w, color: d ? "var(--ed-warning)" : "var(--ed-battery)", a1: d ? 0.5 : 0.58 }, h = (w) => `${n.tileSpoken.batteryState(w)}, ${c === void 0 ? n.noData : n.tileSpoken.chargeLevel(R(c))}${d ? `, ${n.tileSpoken.atReserve}` : ""}`, v = l === "connected" || l === "charging" || q(e.car, r), y = t.num.water.gauge_min, b = Math.max(t.num.water.gauge_max, V(this.hass, i.boiler.target_temperature) ?? 0), f = e.boilTemp, g = (w) => q(w, r), u = e.loadShare.house, x = pt.filter((w) => u[w] >= 0.02), A = g(e.other) && x.length ? this.houseBackground(x, u, F((e.other ?? 0) / o.house, 0, 1)) : void 0, $ = [
      { side: "L", key: "sun", name: n.tile.sun, watts: e.sun, k: (e.sun ?? 0) / o.sun, icon: U.sun, idleIcon: U.moon, idleText: n.idle.sun, aria: e.sun === void 0 ? n.noData : "" },
      { side: "L", key: "bat", name: n.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / o.battery, icon: U.battery, icon2: U.batteryDown, idleIcon: U.pause, idleText: n.idle.bat, level: p(g(e.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: n.tile.grid, watts: e.imp, k: (e.imp ?? 0) / o.grid, icon: U.grid, idleIcon: U.minus, idleText: n.idle.grid, aria: e.imp === void 0 ? n.noData : g(e.imp) ? n.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: n.tile.house, watts: e.other, k: (e.other ?? 0) / o.house, icon: U.home, idleIcon: U.minus, idleText: n.idle.house, background: A, aria: e.other === void 0 ? n.noData : n.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const w = v && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: g(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      $.push({
        side: "R",
        key: "car",
        name: n.tile.car,
        watts: l === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / o.car,
        icon: U.car,
        idleIcon: l === "disconnected" ? U.minus : U.plug,
        idleText: l === "disconnected" ? n.idle.carDisconnected : l === void 0 ? n.idle.carNoState : n.idle.carConnected,
        level: w,
        aria: [l === void 0 && e.car === void 0 ? n.noData : g(e.car) ? n.tileSpoken.charging : "", v && e.carSoc !== void 0 ? n.tileSpoken.chargeLevel(R(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const w = f === void 0 ? void 0 : { f: F((f - y) / (b - y), 0, 1), active: g(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      $.push({
        side: "R",
        key: "boil",
        name: n.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / o.boiler,
        icon: U.therm,
        idleIcon: U.pause,
        idleText: n.idle.boil,
        level: w,
        aria: [f === void 0 ? n.noData : n.tileSpoken.temperature(`${O(f)} °C`), g(e.boil) ? n.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return $.push(
      { side: "R", key: "batIn", name: n.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / o.battery, icon: U.battery, icon2: U.batteryBolt, idleIcon: U.pause, idleText: n.idle.batIn, level: p(g(e.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: n.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / o.grid, icon: U.grid, idleIcon: U.minus, idleText: n.idle.gridOut, aria: e.exp === void 0 ? n.noData : g(e.exp) ? n.tileSpoken.gridExport : "" }
    ), $;
  }
  renderFlow(t, e) {
    const s = t.num.flows.idle_threshold, n = Oe(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((d) => q(d, s) ? d : void 0),
      t.num.flows.kw_from
    ), i = this.tiles(t, e, n), o = An(this._width, i.filter((d) => d.side === "R").map((d) => d.key)), r = En(e.flows, o, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), l = (d) => I`<linearGradient id="rg-${d}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(${ft[d]});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(${ft[d]});stop-opacity:0.88"></stop>
          <stop offset="0.86" style="stop-color:var(${ft[d]});stop-opacity:0.88"></stop>
          <stop offset="1" style="stop-color:var(${ft[d]});stop-opacity:0.2"></stop>
        </linearGradient>`, c = this._pop ? i.find((d) => d.key === this._pop) : void 0;
    return m`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${o.height}px">
        <svg width=${o.width} height=${o.height} viewBox="0 0 ${o.width} ${o.height}" aria-hidden="true">
          <defs>${pt.map(l)}</defs>
          ${r.map(
      (d) => I`<g>
              <path d=${d.d} fill="url(#rg-${d.from})"></path>
              <path class="dots" d=${d.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, d.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(d.watts / 1e3, 10))).toFixed(2)}s"></path>
            </g>`
    )}
        </svg>
        ${i.map((d) => this.renderTile(d, o, n, t))} ${c ? this.renderTilePopup(c, o, t, e, n) : L}
      </div>`;
  }
  houseBackground(t, e, s) {
    const n = t.reduce((c, d) => e[d] > e[c] ? d : c), i = `linear-gradient(${Qt(`var(${ft[n]})`, Math.round(we + ke * s))}, ${Qt(`var(${ft[n]})`, Math.round(we + ke * s))}), var(--ed-tile)`;
    if (t.length === 1) return i;
    const o = t.reduce((c, d) => c + e[d], 0);
    let r = 0;
    const l = [];
    return t.forEach((c, d) => {
      const p = r / o * 100;
      r += e[c];
      const h = r / o * 100, v = `var(${ft[c]})`, y = d === 0 ? `${p}%` : `calc(${p}% + 1px)`, b = d === t.length - 1 ? `${h}%` : `calc(${h}% - 1px)`;
      d > 0 && l.push(`transparent calc(${p}% - 1px) calc(${p}% + 1px)`), l.push(`${v} ${y} ${b}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${i}`;
  }
  tileBackground(t, e, s) {
    const n = `var(${jt[t.key]})`, i = t.level;
    if (i) {
      const o = F(i.f, 0, 1), r = `${(o * 100).toFixed(1)}%`, l = i.active ? Qt(i.color, Math.round(i.a1 * 100)) : "var(--ed-fill-idle)", c = i.active ? Re(i.color, 14) : "var(--ed-tile)";
      return o < 5e-3 ? i.active ? `linear-gradient(${c}, ${c}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${l} 0%, ${l} ${r}, ${c} ${r}, ${c} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const o = Qt(n, Math.round(we + ke * s));
      return `linear-gradient(${o}, ${o}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, s, n) {
    const i = t.watts === void 0, o = q(t.watts, n.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], c = F(t.k, 0, 1), d = i ? T : Q(t.watts, s), p = this.tileBackground(t, o, c), h = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${jt[t.key]});--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%${p ? `;background:${p}` : ""}`;
    return m`<button
        type="button"
        class="tile ${o ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""}"
        data-tile=${t.key}
        style=${h}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${o ? d : i ? T : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${o ? t.icon : t.idleIcon}></path>${o && t.icon2 ? I`<path class="icon2" d=${t.icon2}></path>` : L}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${o ? d : i ? T : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
  }
  renderTilePopup(t, e, s, n, i) {
    if (t.key === "bat" || t.key === "batIn") return this.renderBatteryPopup(t, e, s, n, i);
    if (t.key === "sun") return this.renderSunPopup(t, e, s, n, i);
    const o = this.t, r = s.num.flows.idle_threshold, l = this.today(s), c = (z) => z === void 0 ? T : `${at(z)} kWh`, d = (z) => z === void 0 ? T : Q(z, i), p = (z) => q(z, r), h = n.soc, v = h !== void 0 && h <= this.batteryReserve(s), y = (z) => ({
      title: z ? o.tile.bat : o.tile.batIn,
      now: z ? p(n.batDis) ? o.pop.discharging(d(n.batDis)) : n.batDis === void 0 && h === void 0 ? T : o.idle.bat : p(n.batIn) ? o.pop.charging(d(n.batIn)) : n.batIn === void 0 && h === void 0 ? T : o.idle.batIn,
      level: h === void 0 ? void 0 : { label: o.pop.level, text: R(h), percent: h, color: v ? "var(--ed-warning)" : "var(--ed-battery)", note: v ? o.pop.atReserve : "" },
      rows: z ? [{ label: o.pop.rows.discharged, value: c(l.bdis) }] : [{ label: o.pop.rows.charged, value: c(l.bchg) }]
    }), b = (z) => ({
      title: z ? o.tile.gridOut : o.tile.grid,
      now: z ? p(n.exp) ? o.pop.exporting(d(n.exp)) : n.exp === void 0 ? T : o.idle.gridOut : p(n.imp) ? o.pop.importing(d(n.imp)) : n.imp === void 0 ? T : o.idle.grid,
      rows: z ? [{ label: o.pop.rows.exported, value: c(l.gout) }] : [{ label: o.pop.rows.imported, value: c(l.gin) }]
    }), f = n.carLink, g = n.boilTemp, u = s.num.water.gauge_min, x = Math.max(s.num.water.gauge_max, V(this.hass, s.entities.boiler.target_temperature) ?? 0), $ = {
      sun: { title: o.tile.sun, now: p(n.sun) ? d(n.sun) : n.sun === void 0 ? T : o.idle.sun, rows: [{ label: o.pop.rows.produced, value: c(l.pv) }] },
      bat: y(!0),
      batIn: y(!1),
      grid: b(!1),
      gridOut: b(!0),
      house: { title: o.tile.house, now: p(n.other) ? d(n.other) : n.other === void 0 ? T : o.idle.house, rows: [{ label: o.pop.rows.consumed, value: c(l.house) }] },
      car: {
        title: o.tile.car,
        now: p(n.car) ? o.pop.charging(d(n.car)) : f === "connected" || f === "charging" ? o.pop.carConnectedIdle : f === "disconnected" ? o.idle.carDisconnected : T,
        level: n.carSoc !== void 0 && (f === "connected" || f === "charging") ? { label: o.pop.level, text: R(n.carSoc), percent: n.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: o.pop.rows.carCharged, value: c(l.car) }]
      },
      boil: {
        title: o.tile.boil,
        now: p(n.boil) ? o.pop.heating(d(n.boil)) : n.boil === void 0 ? T : o.idle.boil,
        level: g === void 0 ? void 0 : { label: o.pop.temperature, text: `${O(g)} °C`, percent: F((g - u) / (x - u) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: o.pop.rows.boilerHeated, value: c(l.boil) }]
      }
    }[t.key], w = 236, j = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, B = t.side === "L" ? e.left[t.key] : e.right[t.key], E = B - e.tile.h / 2, D = B < e.height / 2, k = F(j - w / 2, 0, e.width - w), M = D ? `top:${(E + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - E + 8).toFixed(0)}px`;
    return m`<div class="pop" role="dialog" aria-label=${$.title} tabindex="-1" style="left:${k.toFixed(0)}px;${M};width:${Math.min(w, e.width)}px">
        <i class="arrow ${D ? "up" : "down"}" aria-hidden="true" style="left:${(j - k - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${$.title}</span><span class="pop-now">${$.now}</span></div>
        ${$.level ? m`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${$.level.label}${$.level.note ? m`<span class="note"> ${$.level.note}</span>` : L}</span>
                <span class="pop-big" style="color:${$.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${$.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${Ra($.level.percent).map((z) => m`<span><i style="width:${z.toFixed(0)}%;background:${$.level.color}"></i></span>`)}</div>
            </div>` : L}
        <div class="pop-rows">${$.rows.map((z) => m`<div class="pop-row"><span>${z.label}</span><b>${z.value}</b></div>`)}</div>
      </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const s = this.t, n = this.today(t), i = (h) => h === void 0 ? T : at(h), o = [n.pv, n.bdis, n.gin], r = o.every((h) => h !== void 0) ? o.reduce((h, v) => h + v, 0) : void 0, l = n.house === void 0 ? void 0 : n.house + n.car + n.boil + n.bchg + n.gout, c = [
      { label: s.tile.sun, color: "var(--ed-sun)", value: n.pv },
      { label: s.pop.fromBattery, color: "var(--ed-battery)", value: n.bdis },
      { label: s.pop.fromGrid, color: "var(--ed-grid)", value: n.gin }
    ], d = [
      { label: s.tile.house, color: "var(--ed-house)", value: n.house },
      { label: s.tile.car, color: "var(--ed-car)", value: n.car },
      { label: s.tile.boil, color: "var(--ed-boiler)", value: n.boil },
      { label: s.pop.toBattery, color: "var(--ed-battery)", value: n.bchg },
      { label: s.tile.gridOut, color: "var(--ed-grid)", value: n.gout }
    ], p = (h, v, y) => m`<div role="list" aria-label=${h} class="day-col">
        <div class="day-total"><span>${h}</span><b>${i(v)}</b></div>
        ${y.map((b) => m`<div role="listitem" class="day-item"><i style="background:${b.color}" aria-hidden="true"></i><span>${b.label}</span><b>${i(b.value)}</b></div>`)}
      </div>`;
    return m`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${s.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${p(s.pop.sources, r, c)} ${p(s.pop.consumption, l, d)}</div>
      </div>`;
  }
}, jn = (a) => class extends a {
  constructor() {
    super(...arguments), this._carGesture = new je(() => ({
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
    const s = this.t, n = t.entities, i = t.num.flows, o = t.num.car.charge_limit, r = e.carLink, l = q(e.car, i.idle_threshold) && r !== "disconnected", c = za(e.loadShare.car, i, s), d = this.sourceColor(c), p = ht(this.hass, n.wallbox.block_charging) === "on", h = this.shown(n.wallbox.boost), v = ht(this.hass, n.wallbox.prioritize_connected) === "on" && r === "connected" && !p && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let y, b;
    l ? (y = `${s.car.charging(c.text)}${h === "on" ? ` · ${s.boostOptions.on}` : ""}`, b = d) : r === "connected" || r === "charging" ? (y = s.car.connectedIdle, b = v ? "var(--ed-warning)" : void 0) : r === "disconnected" && (y = s.car.disconnected);
    const f = Re(b ?? "#d8d8dc", b ? 42 : 28), g = it(this.hass, n.car.image)?.attributes?.entity_picture, u = e.carSoc, x = Oe([q(e.car, i.idle_threshold) ? e.car : void 0], i.kw_from), A = o < 100, $ = s.car.chargeLevel(u === void 0 ? s.noData : R(u), A ? R(o) : void 0), w = n.wallbox, j = h === "on" ? "on" : h === "off" ? "off" : "", B = this.boostOptions, E = h === "on" ? s.car.modeBoost : h === "off" ? s.car.modeSurplus : T;
    return m`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${f}, transparent)"></div><div class="shadow"></div>
            ${typeof g == "string" && g ? m`<img src=${g} alt="" />` : L}
          </div>
          ${t.carLink ? m`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${s.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(D) => D.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? m`<div class="car-hint" aria-hidden="true">${s.hint.holdOrDouble}</div>` : L}` : L}
          <div class="head"><h2 id="h-car">${t.titles.car ?? s.titles.car}</h2>${this.stateLine(y, b)}</div>
          <div class="car-soc">
            <span class="soc">${u === void 0 ? T : O(u)}<small>${this._i18n.percent("")}</small>${u === void 0 ? m`<span class="sr-only">${s.noData}</span>` : L}</span>
            <span class="range">${s.car.range} <b>${e.carRange === void 0 ? T : `${O(e.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${$}>
            ${Ra(F(u ?? 0, 0, 100)).map((D) => m`<span><i style="width:${D.toFixed(1)}%"></i></span>`)}
            ${A ? m`<div class="limit" style="left:${ha(o)}"></div>` : L}
          </div>
          ${A ? m`<div class="meter-label" aria-hidden="true"><span style="left:${ha(o)}">${s.car.limit(R(o))}</span></div>` : L}
        </div>
        ${l ? this.renderCarSources(e, i, Q(e.car ?? 0, x)) : L}
        ${w.boost ? m`<div class="mode">
              <div class="mode-head"><span id="mode-l">${s.car.mode}</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${E}</span></div>
              <ed-segmented
                guarded .options=${B} .value=${j} label=${s.car.modeLabel} .hint=${s.hint.holdDragOrDouble} ?disabled=${h === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(D) => this.setBoost("wallbox", D.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, h === "on")}
            </div>` : L}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, l, d, x) : L}
      </section>`;
  }
  renderCarSources(t, e, s) {
    const n = this.t, i = n.source, o = t.loadShare.car, r = pt.filter((d) => o[d] > 4e-3), l = ln(r.map((d) => o[d])), c = (d) => d === "grid" && o.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${ft[d]})`;
    return m`<div class="mix">
        <div class="mix-head"><span>${n.car.sourcesTitle}</span><span>${s}</span></div>
        <div class="mix-bar" aria-hidden="true">${r.map((d) => m`<div style="flex:${o[d]} 1 0;background:${c(d)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${n.car.sourcesLabel}>
          ${r.map((d, p) => m`<span><i style="background:${c(d)}"></i>${i[d]}<em>${R(l[p])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const s = t.entities.wallbox.charging_power;
    if (!s) return L;
    const { phases: n, power_min: i, power_max: o, power_step: r } = t.num.wallbox, l = it(this.hass, s), c = V(this.hass, s), d = c === void 0 ? void 0 : c * n / 1e3;
    let p = i / 1e3, h = o / 1e3;
    const v = xt(l, "min"), y = xt(l, "max");
    return v !== void 0 && (p = Math.max(p, v * n / 1e3)), y !== void 0 && (h = Math.min(h, y * n / 1e3)), m`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${d === void 0 ? T : O(d, 1)}<small> kW</small></span>
          <ed-slider
            .min=${p} .max=${h} .step=${r / 1e3} .value=${d ?? p}
            label=${this.t.car.powerLabel} valueText=${d === void 0 ? this.t.noData : `${O(d, 1)} kW`}
            minLabel="${O(p, 1)} kW" maxLabel="${O(h, 1)} kW"
            ?disabled=${d === void 0}
            @hdk-change=${(b) => this.setNumber(s, Math.round(b.detail.value * 1e3 / n), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, e, s, n, i) {
    const o = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, c = !!(r.block_charging || r.prioritize_connected), d = e.carLink, p = s ? m`<span>${o.wallbox.charging} </span><b style="--c:${n}">${Q(e.car ?? 0, i)}</b>` : d === "connected" || d === "charging" ? m`${o.wallbox.idle}` : d === "disconnected" ? m`${o.wallbox.disconnected}` : m`${T}`, h = t.entities.car.state_of_charge, v = V(this.hass, h) === void 0 ? void 0 : Bs(it(this.hass, h)?.last_updated, this._now, o), y = this.shown(r.block_charging), b = this.shown(r.prioritize_connected);
    return m`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!c} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${s ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${U.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${o.wallbox.title}</span><span class="row-sub">${p}</span></span>
            <span class="row-aside">${v ? o.wallbox.fromCar(v) : ""}</span>
            ${c ? m`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${U.expand}></path></svg>` : m`<span></span>`}
          </button>
          ${c ? m`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(o.wallbox.block, r.block_charging, y === "on" ? o.wallbox.blockOn : o.wallbox.blockOff, y === "on") : L}
                ${r.prioritize_connected ? this.switchRow(o.wallbox.priority, r.prioritize_connected, b === "on" ? o.wallbox.priorityOn : o.wallbox.priorityOff, !1) : L}
              </div></div>` : L}
        </li>
      </ul>`;
  }
}, ae = 45, Ct = 46, zn = 62, On = 58;
function _e(a, t) {
  let e = 1;
  for (; e < a.length - 1 && t > a[e].temp; ) e++;
  const s = a[e - 1], n = a[e], i = Math.max(0, Math.min(1, (t - s.temp) / (n.temp - s.temp))), o = (c) => [1, 3, 5].map((d) => parseInt(c.slice(d, d + 2), 16)), r = o(s.color), l = o(n.color);
  return `rgb(${[0, 1, 2].map((c) => Math.round(r[c] + (l[c] - r[c]) * i)).join(",")})`;
}
const Vt = (a, t) => {
  const e = (135 + 270 * a) * Math.PI / 180;
  return [zn + t * Math.cos(e), On + t * Math.sin(e)];
}, Hn = (a, t) => {
  const [e, s] = Vt(a, Ct), [n, i] = Vt(t, Ct);
  return `M${e.toFixed(2)} ${s.toFixed(2)} A${Ct} ${Ct} 0 0 1 ${n.toFixed(2)} ${i.toFixed(2)}`;
};
function Pn(a, t, e, s) {
  const n = a === void 0 ? 0 : Math.max(0, Math.min(1, (a - t) / (e - t))), i = "var(--ed-gauge-track)", o = Array.from({ length: ae }, (v, y) => {
    const b = (y + 0.5) / ae, f = a !== void 0 && b <= n ? _e(s, t + b * (e - t)) : i;
    return I`<path d=${Hn(y / ae, Math.min(1, (y + 1) / ae + 4e-3))} fill="none" stroke=${f} stroke-width="10"></path>`;
  }), [r, l] = Vt(0, Ct), [c, d] = Vt(1, Ct), [p, h] = Vt(n, Ct);
  return I`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${o}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${a !== void 0 && n > 0 ? _e(s, t) : i}></circle>
    <circle cx=${c.toFixed(1)} cy=${d.toFixed(1)} r="5" fill=${a !== void 0 && n >= 0.99 ? _e(s, e) : i}></circle>
    ${a === void 0 ? null : I`<circle class="knob" cx=${p.toFixed(1)} cy=${h.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const Rn = (a) => class extends a {
  renderWater(t, e) {
    const s = this.t, n = t.entities, i = t.num.flows, o = q(e.boil, i.idle_threshold), r = za(e.loadShare.boil, i, s), l = this.sourceColor(r), d = this.shown(n.boiler.boost) === "on", p = Oe([o ? e.boil : void 0], i.kw_from);
    let h;
    return o ? h = `${s.water.boilerHeats(r.text)}${d ? ` · ${s.boostOptions.on}` : ""}` : e.boil !== void 0 && (h = s.water.noHeating), m`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${t.titles.water ?? s.titles.water}</h2>${this.stateLine(h, o ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, o, l, p)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, s, n, i) {
    return m`<div class="arc" role="img" aria-label=${i}>
        ${Pn(t, e, s, n.tempScale)}
        <div class="arc-num"><b>${t === void 0 ? T : O(t)}</b>${t === void 0 ? m`<span class="sr-only">${this.t.noData}</span>` : m`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${O(e)}</span><span class="arc-max" aria-hidden="true">${O(s)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, s, n, i) {
    const o = this.t, r = t.entities.boiler;
    t.num.boiler;
    const l = this.shown(r.boost), c = l === "on", d = V(this.hass, r.target_temperature), p = V(this.hass, r.boost_target_temperature), h = c ? p : d, v = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, d ?? 0), b = e.boilTemp, f = !!this._open.targets, g = !!(r.target_temperature || r.boost_target_temperature), u = o.water.boilerLabel(
      b === void 0 ? o.noData : `${O(b)} °C`,
      s ? o.water.heatingWith(Q(e.boil, i)) : o.water.notHeating,
      h === void 0 ? void 0 : `${O(h)} °C`,
      O(v),
      `${O(y)} °C`
    );
    return m`<div class="source">
        <div class="source-top">
          ${this.gauge(b, v, y, t, u)}
          <div class="source-body">
            <div>
              <div class="source-title">${o.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${s ? n : "var(--ed-secondary)"}">${s ? Q(e.boil, i) : e.boil === void 0 ? T : o.water.notHeating}</span>${h === void 0 ? L : m` <span class="dim">· ${o.water.target(`${O(h)} °C`)}</span>`}
              </div>
            </div>
            ${r.boost ? m`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${o.water.boostMode} .hint=${o.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(x) => this.setBoost("boiler", x.detail.value === "on")}
                ></ed-segmented>` : L}
          </div>
        </div>
        ${g ? m`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${f ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${o.water.targets}</span>
                <span class="rowbtn-value">${o.water.targetFlow} <b>${d === void 0 ? T : O(d)}</b> · ${o.water.targetBoost} <b>${p === void 0 ? T : `${O(p)} °C`}</b></span>
                <svg class="chevron ${f ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${U.expand}></path></svg>
              </button>
              <div class="fold ${f ? "open" : ""}" ?inert=${!f}><div>${this.renderTargets(t, d, p)}</div></div>
            </div>` : L}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, s) {
    const n = this.t, i = t.entities.boiler, o = t.num.boiler, r = (l, c, d, p, h, v) => {
      if (!l) return L;
      const y = it(this.hass, l);
      let b = o.target_min, f = o.target_max;
      const g = xt(y, "min"), u = xt(y, "max");
      return g !== void 0 && (b = Math.max(b, g)), u !== void 0 && (f = Math.min(f, u)), h !== void 0 && (b = Math.max(b, h)), v !== void 0 && (f = Math.min(f, v)), m`<div class="field">
          <span class="field-label">${d}<span class="hint">${p}</span></span><span class="field-value">${c === void 0 ? T : O(c)}<small> °C</small></span>
          <ed-slider
            .min=${b} .max=${f} .step=${o.target_step} .value=${c ?? b}
            label=${n.water.targetSliderLabel(d)} valueText=${c === void 0 ? n.noData : n.water.targetSliderSpoken(`${c} °C`, d)}
            minLabel="${O(b)} °C" maxLabel="${O(f)} °C"
            ?disabled=${c === void 0}
            @hdk-change=${(x) => this.setNumber(l, x.detail.value, n.water.targetWhat(d))}
          ></ed-slider>
        </div>`;
    };
    return m`<div class="detail">
        ${r(i.target_temperature, e, n.water.targetFlow, n.water.targetFlowHint, s, void 0)}
        ${r(i.boost_target_temperature, s, n.water.targetBoost, n.water.targetBoostHint, void 0, e)}
        <p class="hint">${n.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return L;
    const s = Os(this.shown(e.valve_c1), this.shown(e.valve_c2)), n = s === "on", i = !!(e.valve_c1 && e.valve_c2), o = s === "unclear" ? this.t.water.mixingUnclear : s === void 0 ? this.t.noData : "";
    return m`
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${n ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${n ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${n ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${o ? m`<span class="mixcap-note">${o}</span>` : L}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${n} ?disabled=${s === void 0 || !i}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, s = t.entities.tank, n = t.num.tank, i = s.water_heater, o = it(this.hass, i), r = this.shown(i), l = r === "off", c = r === "heat", d = xt(o, "temperature"), p = this._tankTemp, h = p && p.id === i ? p.value : d, v = t.num.water.gauge_min, y = Math.max(t.num.water.gauge_max, V(this.hass, t.entities.boiler.target_temperature) ?? 0), b = l ? n.temp_min : h, f = Array.isArray(o?.attributes?.operation_list) ? o.attributes.operation_list : Object.keys(e.tank.modes), g = Object.keys(e.tank.modes).filter((E) => f.includes(E)).map((E) => ({ value: E, label: e.tank.modes[E] })), u = !!this._open.tank, { min: x, max: A } = this.tankRange(t), $ = r === void 0 ? T : e.tank.modes[r] ?? r, w = l ? e.tank.keepsMinimum : c ? e.tank.setManually : e.tank.byPlan, j = b === void 0 ? T : l ? e.tank.summaryOff(`${O(n.temp_min)} °C`) : (c ? e.tank.summaryManual : e.tank.summaryPlan)(`${O(b)} °C`), B = e.tank.label(
      b === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${O(n.temp_min)} °C`) : e.tank.settingSet(`${O(b)} °C`),
      $,
      O(v),
      `${O(y)} °C`
    );
    return m`<div class="source">
        <div class="source-top">
          ${this.gauge(b, v, y, t, B)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${c ? "var(--ed-text)" : "var(--ed-secondary)"}">${$}</span>${r === void 0 ? L : m` <span class="dim">· ${w}</span>`}</div>
            </div>
            ${i ? m`<ed-segmented compact .options=${g} .value=${r ?? ""} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(E) => this.setTank(i, E.detail.value)}></ed-segmented>` : L}
          </div>
        </div>
        ${i ? m`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${u ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${j}</span>
                <svg class="chevron ${u ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${U.expand}></path></svg>
              </button>
              <div class="fold ${u ? "open" : ""}" ?inert=${!u}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : c ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${b === void 0 ? T : O(b)}<small> °C</small></span>
                    <ed-slider
                      .min=${x} .max=${A} .step=${n.temp_step} .tickStep=${5} .value=${b ?? x}
                      label=${e.tank.sliderLabel} valueText=${h === void 0 ? e.noData : e.tank.sliderSpoken(`${h} °C`)}
                      minLabel="${O(x)} °C" maxLabel="${O(A)} °C"
                      ?disabled=${h === void 0 || l}
                      @hdk-change=${(E) => this.setTankTemperature(i, E.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : L}
      </div>`;
  }
}, Fe = class Fe extends Rn(jn(Bn(Ln(bn(cn(K)))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return L;
    const e = js(this.hass, t, this.t), s = t.colors, n = `--ed-sun:${s.sun};--ed-battery:${s.battery};--ed-grid:${s.grid};--ed-house:${s.house};--ed-car:${s.car};--ed-boiler:${s.boiler};--ed-discharge:${s.discharge};--ed-accent:${s.accent};--ed-warning:${s.warning};--ed-off:${s.neutral}`;
    return this._batDetail ? m`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderBatteryDetail(t, e)}</div>` : this._sunDetail ? m`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderSunDetail(t, e)}</div>` : m`<div class="page" style=${n} @keydown=${this.onKey}>
      ${t.title === "" ? L : m`<h1>${t.title ?? this.t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
Fe.styles = Hs;
let Te = Fe;
gs("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", Te);
window.customCards = window.customCards ?? [];
window.customCards.some((a) => a.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: re($s()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.1.0 · 2026-10-30 15:13 UTC · po eaeacf7 ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
