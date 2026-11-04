const we = globalThis, Ke = we.ShadowRoot && (we.ShadyCSS === void 0 || we.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ze = /* @__PURE__ */ Symbol(), ca = /* @__PURE__ */ new WeakMap();
let Va = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Ze) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ke && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ca.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ca.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const fs = (a) => new Va(typeof a == "string" ? a : a + "", void 0, Ze), be = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, n, o) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + a[o + 1], a[0]);
  return new Va(e, a, Ze);
}, ms = (a, t) => {
  if (Ke) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = we.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, a.appendChild(s);
  }
}, ha = Ke ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return fs(e);
})(a) : a;
const { is: vs, defineProperty: ys, getOwnPropertyDescriptor: $s, getOwnPropertyNames: xs, getOwnPropertySymbols: ws, getPrototypeOf: ks } = Object, He = globalThis, pa = He.trustedTypes, _s = pa ? pa.emptyScript : "", Ss = He.reactiveElementPolyfillSupport, re = (a, t) => a, Se = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? _s : null;
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
} }, Ye = (a, t) => !vs(a, t), ua = { attribute: !0, type: String, converter: Se, reflect: !1, useDefault: !1, hasChanged: Ye };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), He.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Yt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ua) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && ys(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = $s(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ua;
  }
  static _$Ei() {
    if (this.hasOwnProperty(re("elementProperties"))) return;
    const t = ks(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(re("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(re("properties"))) {
      const e = this.properties, s = [...xs(e), ...ws(e)];
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
      for (const n of s) e.unshift(ha(n));
    } else t !== void 0 && e.push(ha(t));
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
    return ms(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Se).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), i = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Se;
      this._$Em = n;
      const r = i.fromAttribute(e, o.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const i = this.constructor;
      if (n === !1 && (o = this[t]), s ??= i.getPropertyOptions(t), !((s.hasChanged ?? Ye)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
Yt.elementStyles = [], Yt.shadowRootOptions = { mode: "open" }, Yt[re("elementProperties")] = /* @__PURE__ */ new Map(), Yt[re("finalized")] = /* @__PURE__ */ new Map(), Ss?.({ ReactiveElement: Yt }), (He.reactiveElementVersions ??= []).push("2.1.2");
const Xe = globalThis, ga = (a) => a, Me = Xe.trustedTypes, ba = Me ? Me.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Ga = "$lit$", Ot = `lit$${Math.random().toFixed(9).slice(2)}$`, Ka = "?" + Ot, Ms = `<${Ka}>`, Ut = document, he = () => Ut.createComment(""), pe = (a) => a === null || typeof a != "object" && typeof a != "function", qe = Array.isArray, Ds = (a) => qe(a) || typeof a?.[Symbol.iterator] == "function", je = `[ 	
\f\r]`, ne = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fa = /-->/g, ma = />/g, jt = RegExp(`>|${je}(?:([^\\s"'>=/]+)(${je}*=${je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), va = /'/g, ya = /"/g, Za = /^(?:script|style|textarea|title)$/i, Ya = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), y = Ya(1), Y = Ya(2), Qt = /* @__PURE__ */ Symbol.for("lit-noChange"), C = /* @__PURE__ */ Symbol.for("lit-nothing"), $a = /* @__PURE__ */ new WeakMap(), Rt = Ut.createTreeWalker(Ut, 129);
function Xa(a, t) {
  if (!qe(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ba !== void 0 ? ba.createHTML(t) : t;
}
const Ts = (a, t) => {
  const e = a.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = ne;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let c, d, h = -1, g = 0;
    for (; g < l.length && (i.lastIndex = g, d = i.exec(l), d !== null); ) g = i.lastIndex, i === ne ? d[1] === "!--" ? i = fa : d[1] !== void 0 ? i = ma : d[2] !== void 0 ? (Za.test(d[2]) && (n = RegExp("</" + d[2], "g")), i = jt) : d[3] !== void 0 && (i = jt) : i === jt ? d[0] === ">" ? (i = n ?? ne, h = -1) : d[1] === void 0 ? h = -2 : (h = i.lastIndex - d[2].length, c = d[1], i = d[3] === void 0 ? jt : d[3] === '"' ? ya : va) : i === ya || i === va ? i = jt : i === fa || i === ma ? i = ne : (i = jt, n = void 0);
    const b = i === jt && a[r + 1].startsWith("/>") ? " " : "";
    o += i === ne ? l + Ms : h >= 0 ? (s.push(c), l.slice(0, h) + Ga + l.slice(h) + Ot + b) : l + Ot + (h === -2 ? r : b);
  }
  return [Xa(a, o + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class ue {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, i = 0;
    const r = t.length - 1, l = this.parts, [c, d] = Ts(t, e);
    if (this.el = ue.createElement(c, s), Rt.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = Rt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Ga)) {
          const g = d[i++], b = n.getAttribute(h).split(Ot), m = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: o, name: m[2], strings: b, ctor: m[1] === "." ? Ls : m[1] === "?" ? As : m[1] === "@" ? Es : ze }), n.removeAttribute(h);
        } else h.startsWith(Ot) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (Za.test(n.tagName)) {
          const h = n.textContent.split(Ot), g = h.length - 1;
          if (g > 0) {
            n.textContent = Me ? Me.emptyScript : "";
            for (let b = 0; b < g; b++) n.append(h[b], he()), Rt.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[g], he());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ka) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(Ot, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += Ot.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = Ut.createElement("template");
    return s.innerHTML = t, s;
  }
}
function te(a, t, e = a, s) {
  if (t === Qt) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = pe(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(a), n._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = te(a, n._$AS(a, t.values), n, s)), t;
}
class Cs {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? Ut).importNode(e, !0);
    Rt.currentNode = n;
    let o = Rt.nextNode(), i = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (i === l.index) {
        let c;
        l.type === 2 ? c = new fe(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Os(o, this, t)), this._$AV.push(c), l = s[++r];
      }
      i !== l?.index && (o = Rt.nextNode(), i++);
    }
    return Rt.currentNode = Ut, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class fe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = te(this, t, e), pe(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== Qt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ds(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && pe(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ut.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = ue.createElement(Xa(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Cs(n, this), i = o.u(this.options);
      o.p(e), this.T(i), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = $a.get(t.strings);
    return e === void 0 && $a.set(t.strings, e = new ue(t)), e;
  }
  k(t) {
    qe(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new fe(this.O(he()), this.O(he()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = ga(t).nextSibling;
      ga(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ze {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = C;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let i = !1;
    if (o === void 0) t = te(this, t, e, 0), i = !pe(t) || t !== this._$AH && t !== Qt, i && (this._$AH = t);
    else {
      const r = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = te(this, r[s + l], e, l), c === Qt && (c = this._$AH[l]), i ||= !pe(c) || c !== this._$AH[l], c === C ? t = C : t !== C && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    i && !n && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ls extends ze {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
}
class As extends ze {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class Es extends ze {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = te(this, t, e, 0) ?? C) === Qt) return;
    const s = this._$AH, n = t === C && s !== C || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== C && (s === C || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Os {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    te(this, t);
  }
}
const Hs = Xe.litHtmlPolyfillSupport;
Hs?.(ue, fe), (Xe.litHtmlVersions ??= []).push("3.3.3");
const zs = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new fe(t.insertBefore(he(), o), o, void 0, e ?? {});
  }
  return n._$AI(a), n;
};
const Je = globalThis;
class zt extends Yt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zs(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Qt;
  }
}
zt._$litElement$ = !0, zt.finalized = !0, Je.litElementHydrateSupport?.({ LitElement: zt });
const Bs = Je.litElementPolyfillSupport;
Bs?.({ LitElement: zt });
(Je.litElementVersions ??= []).push("4.2.2");
const js = { attribute: !0, type: String, converter: Se, reflect: !1, hasChanged: Ye }, Ps = (a = js, t, e) => {
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
function q(a) {
  return (t, e) => typeof e == "object" ? Ps(a, t, e) : ((s, n, o) => {
    const i = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), i ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(a, t, e);
}
function K(a) {
  return q({ ...a, state: !0, attribute: !1 });
}
class Qe {
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
class qa {
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
const Ja = be`
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
var Rs = Object.defineProperty, $t = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && Rs(t, e, n), n;
};
const ia = class ia extends zt {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new qa(this), this.nudgeIndex = 0, this.gesture = new Qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), s = this.options[t]?.value ?? e[0]?.value, n = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !n ? Math.sign(this.nudgeIndex - t) * 14 : 0, i = this._dragging ? this._dx : o;
    return y`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""}"
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
      (r, l) => y`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === s ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(c) => this.onClick(c, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? y`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? y`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
ia.styles = [
  Ja,
  be`
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
let ut = ia;
$t([
  q({ attribute: !1 })
], ut.prototype, "options");
$t([
  q()
], ut.prototype, "value");
$t([
  q()
], ut.prototype, "label");
$t([
  q({ type: Boolean })
], ut.prototype, "disabled");
$t([
  q({ type: Boolean })
], ut.prototype, "compact");
$t([
  q({ type: Boolean })
], ut.prototype, "guarded");
$t([
  q({ type: Number })
], ut.prototype, "holdMs");
$t([
  q({ type: Number })
], ut.prototype, "doubleTapMs");
$t([
  q({ type: Number })
], ut.prototype, "hintSeconds");
$t([
  q()
], ut.prototype, "hint");
$t([
  K()
], ut.prototype, "_dx");
$t([
  K()
], ut.prototype, "_dragging");
var Ns = Object.defineProperty, _t = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && Ns(t, e, n), n;
};
const ra = class ra extends zt {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, n = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, o = this.tickStep || this.step || 1, i = Math.floor(e / o + 1e-9) + 1, r = i >= 2 && i <= 40 ? Array.from({ length: i }, (l, c) => y`<i style="left:${(c * o / e * 100).toFixed(2)}%"></i>`) : [];
    return y`<div class="wrap">
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
      ${this.minLabel || this.maxLabel ? y`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
ra.styles = be`
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
let bt = ra;
_t([
  q({ type: Number })
], bt.prototype, "min");
_t([
  q({ type: Number })
], bt.prototype, "max");
_t([
  q({ type: Number })
], bt.prototype, "step");
_t([
  q({ type: Number })
], bt.prototype, "tickStep");
_t([
  q({ type: Number })
], bt.prototype, "value");
_t([
  q()
], bt.prototype, "label");
_t([
  q()
], bt.prototype, "valueText");
_t([
  q()
], bt.prototype, "minLabel");
_t([
  q()
], bt.prototype, "maxLabel");
_t([
  q({ type: Boolean })
], bt.prototype, "disabled");
_t([
  K()
], bt.prototype, "_drag");
var Fs = Object.defineProperty, Lt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && Fs(t, e, n), n;
};
const la = class la extends zt {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new qa(this), this.gesture = new Qe(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return y`<button
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
      ${this.hints.hint ? y`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
la.styles = [
  Ja,
  be`
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
let yt = la;
Lt([
  q({ type: Boolean })
], yt.prototype, "checked");
Lt([
  q({ type: Boolean })
], yt.prototype, "disabled");
Lt([
  q()
], yt.prototype, "label");
Lt([
  q({ type: Boolean })
], yt.prototype, "guarded");
Lt([
  q({ type: Number })
], yt.prototype, "holdMs");
Lt([
  q({ type: Number })
], yt.prototype, "doubleTapMs");
Lt([
  q({ type: Number })
], yt.prototype, "hintSeconds");
Lt([
  q()
], yt.prototype, "hintPlacement");
Lt([
  q()
], yt.prototype, "hint");
function Is(a) {
  const t = [
    [`${a}-switch`, yt],
    [`${a}-segmented`, ut],
    [`${a}-slider`, bt]
  ];
  for (const [e, s] of t)
    customElements.get(e) || customElements.define(e, s);
}
const Ws = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Us(a) {
  return Ws.has(a);
}
function pt(a, t) {
  return t ? a?.states?.[t] : void 0;
}
function ct(a, t) {
  const e = pt(a, t)?.state;
  return e === void 0 || Us(e) ? void 0 : e;
}
function Vs(a, t) {
  const e = ct(a, t);
  if (e === void 0)
    return;
  const s = Number(e);
  return Number.isFinite(s) ? s : void 0;
}
function Qa(a) {
  return (a?.locale?.language || a?.language || "").trim();
}
function ta(a) {
  const t = a.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Gs(a, t) {
  return a === "auto" ? ta(Qa(t)) : a;
}
function Ks() {
  return ta(document.documentElement.lang || navigator.language || "");
}
const xa = /* @__PURE__ */ new WeakMap(), Zs = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Ys = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Xs = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Pe(a, t) {
  const e = a?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function qs(a, t, e) {
  const s = Qa(e).replace("_", "-"), n = s !== "" && ta(s) === t ? s : Zs[t], o = Pe(e, "number_format"), i = Pe(e, "time_format"), r = Pe(e, "date_format"), l = [t, n, o, i, r].join("|");
  let c = xa.get(a);
  c || (c = /* @__PURE__ */ new Map(), xa.set(a, c));
  let d = c.get(l);
  return d || (d = tn(a[t], t, n, o, i, r), c.set(l, d)), d;
}
function Js(a) {
  try {
    return new Intl.NumberFormat(a), a;
  } catch {
    return "en";
  }
}
function Qs(a, t) {
  if (a === "12")
    return !0;
  if (a === "24")
    return !1;
  const e = a === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function tn(a, t, e, s, n, o) {
  const i = Js(e), r = s === "system" ? void 0 : s === "none" ? "en-US" : Xs[s] ?? i, l = s === "none" ? { useGrouping: !1 } : {}, c = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), d = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), g = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), b = Qs(n, i), m = b ? "h12" : "h23", u = new Intl.DateTimeFormat(i, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: m }), p = new Intl.DateTimeFormat(i, b ? { hour: "numeric", hourCycle: m } : { hour: "2-digit", minute: "2-digit", hourCycle: m }), f = o === "system" ? void 0 : i, v = new Intl.DateTimeFormat(f, { day: "numeric", month: "numeric" }), x = ($) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return v.format($);
    const E = v.formatToParts($), L = E.find((A) => A.type === "literal")?.value ?? "/", S = E[E.length - 1], D = S?.type === "literal" ? S.value : "", M = E.find((A) => A.type === "day")?.value ?? "", _ = E.find((A) => A.type === "month")?.value ?? "";
    return o === "DMY" ? `${M}${L}${_}${D}` : `${_}${L}${M}${D}`;
  }, k = Ys.has(i.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: i,
    t: a,
    one: ($) => c.format($),
    two: ($) => d.format($),
    half: ($) => h.format(Math.round($ * 2) / 2),
    tick: ($) => h.format($),
    whole: ($) => g.format($),
    percent: ($) => `${$}${k}%`,
    time: ($) => u.format($),
    hour: ($) => p.format($),
    day: x
  };
}
const en = {
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
}, an = {
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
}, sn = {
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
}, nn = { cs: en, en: an, sv: sn };
function De(a, t) {
  return qs(nn, a, t);
}
function W(a, t) {
  const e = Vs(a, t);
  if (e !== void 0)
    return pt(a, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let rt = De("cs"), Te = "auto";
function on(a, t = "auto") {
  rt = a, Te = t;
}
function ea(a, t = 1e3) {
  return a.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function ts(a) {
  const t = Te === "auto" ? Math.abs(Math.round(a * 100) / 100) < 10 ? 2 : Math.abs(Math.round(a * 10) / 10) < 100 ? 1 : 0 : Te;
  return t === 2 ? rt.two(a) : t === 1 ? rt.one(a) : rt.whole(a);
}
function nt(a, t) {
  return t === "kW" ? `${ts(a / 1e3)} kW` : `${rt.whole(Math.round(a))} W`;
}
function j(a, t = 0) {
  return t === 0 ? rt.whole(a) : rt.one(a);
}
function G(a, t) {
  if (t === 0) return rt.whole(a);
  if (t === 1) return rt.one(a);
  if (t === 2) return rt.two(a);
  const e = rt.one(1.5).charAt(1), s = 10 ** t, n = Math.round(Math.abs(a) * s);
  return `${a < 0 && n > 0 ? "−" : ""}${rt.whole(Math.floor(n / s))}${e}${String(n % s).padStart(t, "0")}`;
}
function le(a) {
  return `${new Intl.DateTimeFormat(rt.locale, { weekday: "short" }).format(a)} ${rt.day(a)}`;
}
function rn(a) {
  return new Intl.DateTimeFormat(rt.locale, { weekday: "short" }).format(a);
}
function ln(a) {
  return rt.day(a);
}
function Xt(a) {
  const t = new Intl.DateTimeFormat(rt.locale, { weekday: "long" }).format(a);
  return t.charAt(0).toLocaleUpperCase(rt.locale) + t.slice(1);
}
function it(a) {
  return rt.time(a);
}
function U(a) {
  return rt.percent(typeof a == "number" ? j(a) : a);
}
function Wt(a, t) {
  const e = pt(a, t), s = ct(a, t);
  if (s === void 0) return;
  const n = Number(s);
  if (!Number.isFinite(n)) return;
  const o = e?.attributes?.unit_of_measurement;
  return o === "Wh" ? n / 1e3 : o === "MWh" ? n * 1e3 : n;
}
function st(a) {
  return a < (Te === 1 ? 0.05 : 5e-3) ? "0" : ts(a);
}
function dn(a, t, e) {
  const s = a ? Date.parse(a) : NaN;
  if (!Number.isFinite(s)) return;
  const n = Math.max(0, Math.round((t - s) / 6e4));
  return n < 1 ? e.ago.now : n < 60 ? e.ago.minutes(n) : n < 1440 ? e.ago.hours(Math.round(n / 60)) : e.ago.days(Math.round(n / 1440));
}
const mt = ["sun", "bat", "grid"], ee = ["house", "car", "boil", "batIn", "gridOut"], me = (a) => a === void 0 ? void 0 : Math.max(0, a), et = (a, t) => a !== void 0 && a >= t;
function es(a) {
  if (a === "Disconnected") return "disconnected";
  if (a === "Waiting") return "connected";
  if (a === "Charging") return "charging";
}
function cn(a, t, e) {
  const s = t.entities, n = t.num.flows.idle_threshold, o = me(W(a, s.pv.power)), i = W(a, s.battery.power), r = W(a, s.grid.power), l = me(W(a, s.house.power)), c = me(W(a, s.wallbox.power)), d = me(W(a, s.boiler.power)), h = i === void 0 ? void 0 : Math.max(0, i), g = i === void 0 ? void 0 : Math.max(0, -i), b = r === void 0 ? void 0 : Math.max(0, -r), m = r === void 0 ? void 0 : Math.max(0, r), u = l === void 0 ? void 0 : Math.max(0, l - (c ?? 0) - (d ?? 0)), p = (M) => et(M, n) ? M : 0, f = {
    sun: Math.max(0, p(o) - p(g) - p(m)),
    bat: p(h),
    grid: p(b)
  }, v = f.sun + f.bat + f.grid, x = { sun: 0, bat: 0, grid: 0 };
  if (v > 0)
    for (const M of mt) x[M] = f[M] / v;
  const k = [], $ = { house: { ...x }, car: { ...x }, boil: { ...x } }, E = [
    ["house", u],
    ["car", c],
    ["boil", d]
  ], L = E.reduce((M, [, _]) => M + (et(_, n) ? _ : 0), 0), S = { sun: 0, bat: 0, grid: 0 };
  for (const M of mt) S[M] = v > 0 ? f[M] * L / v : 0;
  for (const [M, _] of E) {
    if (!et(_, n)) continue;
    let A = _;
    const H = { sun: 0, bat: 0, grid: 0 };
    for (const w of mt) {
      const z = Math.min(S[w], A);
      S[w] -= z, A -= z, H[w] = z / _, z > 0.5 && k.push({ from: w, to: M, watts: z });
    }
    H.sun + H.bat + H.grid > 0 && ($[M] = H);
  }
  et(g, n) && k.push({ from: "sun", to: "batIn", watts: g }), et(m, n) && k.push({ from: "sun", to: "gridOut", watts: m });
  const D = {
    sun: o,
    batDis: h,
    batIn: g,
    imp: b,
    exp: m,
    other: u,
    car: c,
    boil: d,
    share: x,
    loadShare: $,
    flows: k,
    soc: W(a, s.battery.state_of_charge),
    carSoc: W(a, s.car.state_of_charge),
    carRange: W(a, s.car.range),
    boilTemp: W(a, s.boiler.temperature),
    carLink: es(ct(a, s.wallbox.status))
  };
  return Object.assign(D, hn(D, t.num.flows, e)), D;
}
function hn(a, t, e) {
  const s = t.idle_threshold, n = (u) => et(u, s);
  if ([a.sun, a.batDis, a.imp, a.other].every((u) => u === void 0)) return {};
  if (n(a.sun) && !n(a.imp) && !n(a.batDis)) {
    let u;
    return (a.exp ?? 0) > t.export_notice && !n(a.batIn) ? u = e.summary.exportSurplus : n(a.car) ? u = e.summary.sunChargesCar(n(a.batIn)) : n(a.batIn) ? u = e.summary.sunChargesBattery : u = e.summary.sunCoversHouse, { summary: u, summarySource: "sun" };
  }
  const r = [["house", a.other], ["car", a.car], ["boil", a.boil]].filter(([, u]) => n(u)).map(([u, p]) => [u, p]), l = r.reduce((u, [, p]) => u + p, 0), c = r.filter(([, u]) => u >= t.source_min_share / 100 * l).sort((u, p) => p[1] - u[1]);
  if (c.length && !(c.length === 1 && c[0][0] === "house")) {
    const u = c.reduce((v, [, x]) => v + x, 0), p = { sun: 0, bat: 0, grid: 0 };
    for (const [v, x] of c) for (const k of mt) p[k] += a.loadShare[v][k] * x / u;
    const f = aa(p, t, e);
    return { summary: e.summary.loadsTake(c.map(([v]) => v), f.text), summarySource: f.main };
  }
  const { sun: d, bat: h, grid: g } = a.loadShare.house;
  if (g > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const b = t.source_min_share / 100;
  if (d < b && g < b && h > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const m = ss(a.loadShare.house, b);
  return m.length ? { summary: e.summary.houseTakes(as(m, e)), summarySource: m[0] } : { summary: e.summary.nothing };
}
function as(a, t) {
  return t.from[a[0]] + a.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function ss(a, t) {
  return mt.filter((e) => a[e] >= t).sort((e, s) => a[s] - a[e]);
}
function aa(a, t, e) {
  let s = ss(a, t.source_min_share / 100);
  s.length || (s = ["sun"]);
  const n = a.grid > t.grid_deviation_share / 100;
  return { text: as(s, e), main: n ? "grid" : s[0], deviation: n };
}
function pn(a, t) {
  if (!(a === void 0 || t === void 0))
    return a === "off" && t === "on" ? "on" : a === "on" && t === "off" ? "off" : "unclear";
}
const un = be`
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

  /* Popups: a tile popover with an arrow, and the big one of the heading. */
  .house-pop .pop-row, .house-pop .pop-row span, .house-pop .pop-row b { white-space: nowrap; }
  .house-app { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 0; }
  .house-app .ell { color: var(--ed-secondary); font-size: 15px; line-height: 20px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .house-app b { font-size: 17px; line-height: 22px; font-weight: 600; white-space: nowrap; }
  .house-list { display: flex; flex-direction: column; gap: 10px; }
  .house-list .bat-cap { padding: 0 4px; }
  .house-item { overflow: hidden; }
  .house-body { margin: 0 12px 12px; padding: 4px 14px; border-radius: 12px; background: var(--ed-tile); display: flex; flex-direction: column; }
  .house-cook { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; column-gap: 14px; align-items: baseline; padding: 0; }
  .house-cook-head { font-size: 13px; line-height: 18px; color: var(--ed-secondary); text-align: right; padding: 6px 0 2px; white-space: nowrap; }
  .house-cook-name { font-size: 15px; line-height: 20px; color: var(--ed-secondary); padding: 9px 0; min-width: 0; }
  .house-cook b { font-size: 15px; line-height: 20px; font-weight: 600; text-align: right; white-space: nowrap; padding: 9px 0; font-variant-numeric: tabular-nums; }
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

  /* The source colour a little lighter on the tile grey: the blue of the grid has 4.2 : 1 there, this 5 : 1 and more. */
  .row-sub b {
    color: color-mix(in srgb, var(--c, var(--ed-text)) 82%, #fff);
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
`, gn = ["cs", "en", "sv"];
class ns extends Error {
}
function V(a) {
  throw new ns(a);
}
function bn(a, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof ns ? new Error(`${a}: ${e.message}`) : e;
  }
}
function Vt(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function ft(a, t) {
  return a == null ? {} : (Vt(a) || V(`"${t}" must be a mapping of keys.`), a);
}
function Bt(a, t, e) {
  for (const s of Object.keys(a))
    t.includes(s) || V(`${e}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function Nt(a, t, e = {}) {
  if (a == null)
    return;
  const s = typeof a == "string" ? a.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || V(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !s.startsWith(`${e.domain}.`) && V(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${s}.`), s;
}
function ge(a, t) {
  if (a != null) {
    if (typeof a == "string" && a.trim())
      return a.trim();
    if (Vt(a) && Object.keys(a).length > 0) {
      const e = Object.entries(a);
      if (e.every(([s, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(s) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([s, n]) => [s, n.trim()]));
    }
    return V(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function fn(a, t) {
  if (a === void 0 || typeof a == "string")
    return a;
  const e = t.toLowerCase();
  return a[e] ?? a[e.split("-")[0]] ?? a.en ?? Object.values(a)[0];
}
function wa(a) {
  return a === void 0 ? [] : typeof a == "string" ? [a] : Object.values(a);
}
const ka = ["auto", ...gn];
function mn(a) {
  const t = a ?? "auto";
  return ka.includes(t) || V(`language must be one of ${ka.join(", ")}.`), t;
}
const Be = {
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
  car: { state_of_charge: void 0, range: void 0, capacity: void 0, image: "image" },
  wallbox: { power: void 0, status: void 0, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch" },
  forecast: { energy_today: void 0, energy_tomorrow: void 0, energy_day_2: void 0, energy_day_3: void 0, energy_day_4: void 0, weather: "weather" },
  daily: { pv_generation: void 0, battery_charge: void 0, battery_discharge: void 0, grid_import: void 0, grid_export: void 0, car: void 0, boiler: void 0 }
}, os = { house: ["label", "default_range", "appliances", "groups"], boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"], forecast: ["default_range"] }, Ce = ["1d", "7d", "30d"], is = "1d", vn = "appliances", _a = ["7d", "30d"], yn = "7d", Sa = ["always", "heating"], $n = "heating", Ma = ["auto", 1, 2], xn = "auto", rs = Object.keys(Be), N = (a, t, e, s, n = !1) => ({ value: a, min: t, max: e, what: s, integer: n }), sa = {
  battery: {
    reserve: N(20, 0, 100, "% battery reserve"),
    capacity: N(11.2, 0.1, 1e3, "kWh usable capacity (time estimates, equivalent cycles, load in C)"),
    imbalance_good: N(15, 0, 1e3, "mV cell imbalance up to which it is called excellent"),
    imbalance_warn: N(30, 0, 1e3, "mV cell imbalance up to which it is called good (above it needs attention)"),
    imbalance_fault: N(100, 0, 1e3, "mV cell imbalance above which it is called a fault")
  },
  car: {
    charge_limit: N(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)"),
    image_scale: N(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)")
  },
  wallbox: {
    phases: N(3, 1, 3, "number of phases", !0),
    power_min: N(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: N(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: N(300, 1, 1e5, "W, step of the charging power (all phases)"),
    priority_min_sun: N(200, 0, 1e5, "W of sun above which a waiting car is reported")
  },
  boiler: {
    target_min: N(20, 0, 100, "°C, lowest target"),
    target_max: N(85, 0, 100, "°C, highest target"),
    target_step: N(5, 1, 50, "°C, target step"),
    hold_minutes: N(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)")
  },
  water: {
    gauge_min: N(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: N(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)")
  },
  tank: {
    temp_min: N(38, 0, 100, "°C, lowest temperature"),
    temp_max: N(65, 0, 100, "°C, highest temperature"),
    temp_step: N(1, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: N(100, 0, 1e3, "W, below this a flow counts as none"),
    kw_from: N(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    export_notice: N(300, 0, 1e5, "W of export that counts as a surplus"),
    source_min_share: N(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: N(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: N(14, 0.5, 50, "px, thickness of a band of 1 kW (a stronger flow is thicker by the square root of its power)"),
    band_min_px: N(1.6, 0.5, 10, "px, thinnest band")
  },
  forecast: {
    good_power: N(2e3, 100, 1e5, "W of sun from which an hour counts as strong (the filled blocks of the five days, the window)"),
    good_day: N(10, 0.1, 1e3, "kWh a day from which a day counts as good (Historie)"),
    learn_days: N(14, 3, 90, "days the curve of what is possible and the typical deviation of the forecast are learned from", !0),
    possible_percentile: N(90, 50, 100, "% percentile of the days that sets what is possible in an hour"),
    typical_deviation: N(20, 1, 100, "% deviation of the forecast assumed until the card has seen enough days"),
    strip_from: N(6, 0, 23, "hour the hourly strips start at", !0),
    strip_to: N(17, 1, 24, "hour the hourly strips end at (the hour itself is the last block)", !0),
    evening_hour: N(22, 12, 23, "hour the evening battery level is estimated for", !0),
    morning_hour: N(6, 0, 11, "hour the night ends at (the battery level in the morning)", !0),
    car_start_soc: N(50, 0, 100, "% battery level from which the wallbox is started in the evening estimate"),
    car_stop_soc: N(30, 0, 100, "% battery level at which the wallbox is stopped in the evening estimate"),
    car_min_sun: N(2e3, 0, 1e5, "W of sun from which the wallbox is started in the evening estimate"),
    efficiency: N(95, 50, 100, "% efficiency of the battery in one direction")
  },
  scale: {
    sun: N(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: N(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: N(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: N(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: N(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: N(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: {
    revert_after: N(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: N(550, 200, 3e3, "ms to hold a protected control to switch it", !0),
    double_tap_ms: N(400, 150, 1e3, "ms between the two taps of a double tap", !0),
    hint_seconds: N(3, 1, 10, "s the hint of a protected control stays")
  }
}, ke = {
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
}, wn = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], Ue = ["electricity", "car", "water"];
[
  ...rs.flatMap((a) => Object.keys(Be[a]).map((t) => `${a}.${t}`)),
  ...Object.entries(sa).flatMap(([a, t]) => Object.keys(t).map((e) => `${a}.${e}`)),
  ...Ue.map((a) => `titles.${a}`),
  ...Object.keys(ke).map((a) => `colors.${a}`)
];
function kn(a, t) {
  const e = ft(a[t], t), s = Be[t], n = [...Object.keys(sa[t] ?? {}), ...os[t] ?? []];
  Bt(e, [...Object.keys(s), ...n], t);
  const o = {};
  for (const [i, r] of Object.entries(s)) {
    const l = Nt(e[i], `${t}.${i}`, { domain: r });
    l && (o[i] = l);
  }
  return o;
}
function _n(a) {
  const t = {};
  for (const [e, s] of Object.entries(sa)) {
    const n = ft(a[e], e), o = Object.keys(Be[e] ?? {});
    Bt(n, [...o, ...Object.keys(s), ...os[e] ?? []], e), t[e] = {};
    for (const [i, r] of Object.entries(s)) {
      const l = n[i], c = `${e}.${i}`;
      if (l == null) {
        t[e][i] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && V(`${c} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && V(`${c} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][i] = l;
    }
  }
  return t;
}
function Sn(a) {
  const t = ft(a.colors, "colors");
  Bt(t, [...Object.keys(ke), "temp_scale"], "colors");
  const e = { ...ke };
  for (const s of Object.keys(ke)) {
    const n = t[s];
    n != null && ((typeof n != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.trim())) && V(`colors.${s} must be a colour like #FFD60A (six hex digits).`), e[s] = n.trim().toUpperCase());
  }
  return e;
}
function Mn(a) {
  const t = ft(a.colors, "colors").temp_scale;
  if (t == null)
    return wn.map((n) => ({ ...n }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && V(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const s = t.map((n, o) => (Vt(n) || V(`${e}[${o}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Bt(n, ["temp", "color"], `${e}[${o}]`), (typeof n.temp != "number" || !Number.isFinite(n.temp)) && V(`${e}[${o}].temp must be a number (°C).`), (typeof n.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.color.trim())) && V(`${e}[${o}].color must be a colour like #0A84FF (six hex digits).`), { temp: n.temp, color: n.color.trim().toUpperCase() }));
  return s.forEach((n, o) => {
    o > 0 && n.temp <= s[o - 1].temp && V(`${e}: temperatures must rise (${s[o - 1].temp} is followed by ${n.temp}).`);
  }), s;
}
function Dn(a) {
  const t = ft(a.boiler, "boiler").show;
  return t == null ? $n : ((typeof t != "string" || !Sa.includes(t)) && V(`boiler.show must be one of ${Sa.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Tn(a) {
  const t = ft(a.battery, "battery").default_range;
  return t == null ? is : ((typeof t != "string" || !Ce.includes(t)) && V(`battery.default_range must be one of ${Ce.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Cn(a) {
  const t = ft(a.forecast, "forecast").default_range;
  return t == null ? yn : ((typeof t != "string" || !_a.includes(t)) && V(`forecast.default_range must be one of ${_a.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Ln(a) {
  const t = ft(a.house, "house").label;
  return t == null ? vn : ((typeof t != "string" || t.trim() === "") && V("house.label must be a non-empty text (the label of the appliances in Home Assistant)."), t.trim());
}
function An(a) {
  const t = ft(a.house, "house").default_range;
  return t == null ? is : ((typeof t != "string" || !Ce.includes(t)) && V(`house.default_range must be one of ${Ce.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const En = "mdi:power-plug";
function On(a) {
  const t = ft(a.house, "house").appliances;
  return t == null ? [] : (Array.isArray(t) || V("house.appliances must be a list of {name, icon, power, energy, running, start_energy}."), t.map((e, s) => {
    const n = `house.appliances[${s}]`;
    Vt(e) || V(`${n} must be a mapping like {name: Pračka, running: input_boolean.…, start_energy: input_number.…}.`), Bt(e, ["name", "power", "energy", "running", "start_energy", "icon"], n);
    const o = ge(e.name, `${n}.name`);
    o === void 0 && V(`${n}.name must be the name of the device of the appliance.`);
    const i = Nt(e.running, `${n}.running`, { domain: "input_boolean" }), r = Nt(e.start_energy, `${n}.start_energy`, { domain: "input_number" }), l = Nt(e.power, `${n}.power`, { domain: "sensor" }), c = Nt(e.energy, `${n}.energy`, { domain: "sensor" }), d = ls(e.icon, `${n}.icon`);
    return { name: o, ...l ? { power: l } : {}, ...c ? { energy: c } : {}, ...i ? { running: i } : {}, ...r ? { start_energy: r } : {}, ...d ? { icon: d } : {} };
  }));
}
function Da(a, t) {
  return a ?? V(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
}
function ls(a, t) {
  if (a != null)
    return (typeof a != "string" || !/^[a-z0-9]+:[a-z0-9-]+$/i.test(a)) && V(`${t} must be an icon such as mdi:washing-machine.`), a;
}
function Hn(a) {
  const t = ft(a.house, "house").groups;
  return t == null ? [] : (Array.isArray(t) || V("house.groups must be a list of {name, icon, appliances}."), t.map((e, s) => {
    const n = `house.groups[${s}]`;
    Vt(e) || V(`${n} must be a mapping like {name: Vaření, icon: mdi:silverware-fork-knife, appliances: [...]}.`), Bt(e, ["name", "icon", "appliances"], n), (!Array.isArray(e.appliances) || e.appliances.length === 0) && V(`${n}.appliances must be a list of {name, power, energy}.`);
    const o = e.appliances.map((i, r) => {
      const l = `${n}.appliances[${r}]`;
      Vt(i) || V(`${l} must be a mapping like {name: Trouba, power: sensor.…, energy: sensor.…}.`), Bt(i, ["name", "power", "energy"], l);
      const c = Nt(i.power, `${l}.power`, { domain: "sensor" });
      c || V(`${l}.power must be the power sensor (sensor.…) of the appliance.`);
      const d = Nt(i.energy, `${l}.energy`, { domain: "sensor" });
      return { name: Da(ge(i.name, `${l}.name`), `${l}.name`), power: c, ...d ? { energy: d } : {} };
    });
    return { name: Da(ge(e.name, `${n}.name`), `${n}.name`), icon: ls(e.icon, `${n}.icon`) ?? En, appliances: o };
  }));
}
function zn(a) {
  const t = ft(a.flows, "flows").decimals;
  return t == null ? xn : (Ma.includes(t) || V(`flows.decimals must be one of ${Ma.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const Bn = "/dashboard-bmw";
function jn(a) {
  const t = ft(a.car, "car").link;
  return t == null ? Bn : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && V(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function Pn(a) {
  const t = ft(a.titles, "titles");
  Bt(t, [...Ue], "titles");
  const e = {};
  for (const s of Ue) {
    const n = ge(t[s], `titles.${s}`);
    n !== void 0 && (e[s] = n);
  }
  return e;
}
function Rn(a) {
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
    (i ? e >= s : e > s) && V(`${n} (${e}) must be ${i ? "below" : "at most"} ${o} (${s}).`);
}
function Nn(a) {
  return bn("Energie Dashboard", () => Fn(a));
}
function Fn(a) {
  Vt(a) || V("the configuration must be a mapping of keys.");
  const t = a.title === "" ? "" : ge(a.title, "title"), e = Object.fromEntries(rs.map((o) => [o, kn(a, o)]));
  e.mixing.valve_c1 && e.mixing.valve_c1 === e.mixing.valve_c2 && V("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const s = _n(a);
  Rn(s);
  const n = mn(a.language);
  return { title: t, language: n, entities: e, titles: Pn(a), num: s, colors: Sn(a), tempScale: Mn(a), boilerShow: Dn(a), powerDecimals: zn(a), carLink: jn(a), batteryRange: Tn(a), sunRange: Cn(a), houseLabel: Ln(a), houseRange: An(a), appliances: On(a), groups: Hn(a) };
}
const T = "––", Ft = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, qt = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, Ta = "ha-energie-dashboard:boiler-heating", Ca = "ha-energie-dashboard:battery-range", La = "ha-energie-dashboard:sun-range";
function Ct(a, t) {
  const e = a?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function In(a) {
  const t = a.reduce((o, i) => o + i, 0);
  if (t <= 0) return a.map(() => 0);
  const e = a.map((o) => o / t * 100), s = e.map(Math.floor);
  let n = 100 - s.reduce((o, i) => o + i, 0);
  return e.map((o, i) => ({ index: i, rest: o - s[i] })).sort((o, i) => i.rest - o.rest).forEach(({ index: o }) => {
    n-- > 0 && s[o]++;
  }), s;
}
const Q = (a, t, e) => Math.max(t, Math.min(e, a)), na = (a, t) => `color-mix(in srgb, ${a} ${t}%, transparent)`, ve = (a, t) => `color-mix(in srgb, ${a} ${t}%, var(--ed-tint-base))`, ds = (a) => Array.from({ length: 10 }, (t, e) => Q((a - e * 10) / 10, 0, 1) * 100), Aa = (a) => `calc((100% - 18px) * ${Q(a, 0, 100) / 100} + ${Math.max(0, Math.ceil(Q(a, 0, 100) / 10) - 1) * 2}px)`;
var Wn = Object.defineProperty, J = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && Wn(t, e, n), n;
};
class X extends zt {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._sunDetail = !1, this._sunTab = "today", this._sunMode = "total", this._houseDetail = !1, this._houseOpen = [], this._houseTab = "now", this._houseData = {}, this._i18n = De("cs"), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = Nn(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(Ta)) || 0);
    } catch {
    }
    this._clock = window.setInterval(() => this._now = Date.now(), 3e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer?.disconnect(), this._observer = void 0, this._timers.forEach((t) => window.clearTimeout(t)), this._timers.clear(), window.clearInterval(this._clock);
  }
  /** The texts of the card language. */
  /** A text of the configuration (title, name) in the language of the card: the language, its base, English, the first given. */
  pickText(t) {
    return fn(t, this._i18n?.language ?? this.lang ?? "en");
  }
  get t() {
    return this._i18n.t;
  }
  get boostOptions() {
    return [{ value: "off", label: this.t.boostOptions.off }, { value: "on", label: this.t.boostOptions.on }];
  }
  willUpdate() {
    this._i18n = De(Gs(this._config?.language ?? "auto", this.hass), this.hass), on(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && et(W(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(Ta, String(this._lastHeating));
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
      const n = Object.entries(this._optimistic).filter(([o, i]) => this.hass?.states?.[o]?.state === i);
      if (n.length) {
        const o = { ...this._optimistic };
        n.forEach(([i]) => delete o[i]), this._optimistic = o;
      }
    }
    t.has("hass") && this._tankTemp && Ct(pt(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const s = this._config;
    if (window.clearTimeout(this._timers.get("hold")), s && s.boilerShow === "heating" && this._lastHeating) {
      const n = this._lastHeating + s.num.boiler.hold_minutes * 6e4 - Date.now();
      n > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), n + 50));
    }
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${Ft[t.main]})`;
  }
  stateLine(t, e) {
    return y`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? y`${T}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !et(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || et(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, s = (r) => Wt(this.hass, r), n = {
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
    const e = W(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
}
J([
  K()
], X.prototype, "_config");
J([
  q({ attribute: !1 })
], X.prototype, "hass");
J([
  K()
], X.prototype, "_width");
J([
  K()
], X.prototype, "_optimistic");
J([
  K()
], X.prototype, "_feedback");
J([
  K()
], X.prototype, "_open");
J([
  K()
], X.prototype, "_pop");
J([
  K()
], X.prototype, "_all");
J([
  K()
], X.prototype, "_now");
J([
  K()
], X.prototype, "_carHint");
J([
  K()
], X.prototype, "_batDetail");
J([
  K()
], X.prototype, "_batTab");
J([
  K()
], X.prototype, "_batSpan");
J([
  K()
], X.prototype, "_batRange");
J([
  K()
], X.prototype, "_batOpen");
J([
  K()
], X.prototype, "_batScrub");
J([
  K()
], X.prototype, "_batData");
J([
  K()
], X.prototype, "_sunDetail");
J([
  K()
], X.prototype, "_sunTab");
J([
  K()
], X.prototype, "_sunRange");
J([
  K()
], X.prototype, "_sunMode");
J([
  K()
], X.prototype, "_sunHint");
J([
  K()
], X.prototype, "_sunWeather");
J([
  K()
], X.prototype, "_houseDetail");
J([
  K()
], X.prototype, "_houseRange");
J([
  K()
], X.prototype, "_houseOpen");
J([
  K()
], X.prototype, "_houseTab");
J([
  K()
], X.prototype, "_houseData");
J([
  K()
], X.prototype, "_houseToday");
J([
  K()
], X.prototype, "_houseCycles");
J([
  K()
], X.prototype, "_tankTemp");
const Un = (a) => class extends a {
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
    return y`<div class="switch-row">
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
      const { min: s, max: n } = this.tankRange(this._config), o = Ct(pt(this.hass, t), "temperature");
      (o === void 0 || o < s || o > n) && await this.setTemperature(t, Q(o ?? s, s, n));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = pt(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, Ct(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, Ct(e, "max_temp") ?? t.num.tank.temp_max)
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
}, Le = ["1d", "7d", "30d"], Gt = { "1d": 1, "7d": 7, "30d": 30 }, I = 310, tt = 36e5, Tt = 24 * tt, Ve = (a) => typeof a == "number" && Number.isFinite(a);
async function Et(a, t, e, s, n, o) {
  return t.length ? await a.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(s).toISOString(),
    statistic_ids: t,
    period: n,
    types: o
  }) ?? {} : {};
}
function Dt(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t.getTime();
}
function wt(a, t, e, s, n, o = "mean", i = 0) {
  const r = new Array(n).fill(0), l = new Array(n).fill(0), c = new Array(n).fill(void 0), d = (s - e) / n;
  for (const h of a ?? []) {
    const g = h[t];
    if (!Ve(g) || !Ve(h.start) || d <= 0) continue;
    const b = Math.floor((h.start - e + i) / d);
    if (b < 0 || b >= n) continue;
    l[b]++, r[b] += g;
    const m = c[b];
    o === "min" ? c[b] = m === void 0 ? g : Math.min(m, g) : o === "max" ? c[b] = m === void 0 ? g : Math.max(m, g) : o === "last" && (c[b] = g);
  }
  return c.map((h, g) => {
    if (l[g])
      return o === "mean" ? r[g] / l[g] : o === "sum" ? r[g] : h;
  });
}
function kt(a, t) {
  return (a ?? []).some((e) => Ve(e[t]));
}
const R = (a) => Math.round(a * 10) / 10;
function Jt(a, t, e) {
  let s = "", n = !1;
  return a.forEach((o, i) => {
    if (o === void 0) {
      n = !1;
      return;
    }
    s += `${n ? " L" : s ? " M" : "M"}${R(t(i))} ${R(e(o))}`, n = !0;
  }), s;
}
function Ae(a, t, e, s) {
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
function cs(a, t, e, s) {
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
function ae(a) {
  if (!(a > 0)) return 1;
  const e = 10 ** Math.floor(Math.log10(a)), s = a / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 3 ? 3 : s <= 5 ? 5 : 10) * e;
}
function Vn(a, t) {
  const e = a.filter((r) => r !== void 0);
  if (!e.length) return;
  let s = Math.min(...e), n = Math.max(...e);
  const o = Math.max(n - s, t), i = (n + s) / 2;
  return s = i - o / 2 - o * 0.1, n = i + o / 2 + o * 0.1, { lo: s, hi: n };
}
function Ea(a, t, e) {
  if (!(e > 0) || !(a > 0) || !(t > 0)) return;
  const s = a / 100 * t / (e / 1e3), n = Math.round(s * 60 / 5) * 5;
  return n >= 5 && n < 2880 ? n : void 0;
}
function de(a) {
  const t = Math.floor(a / 60), e = a % 60;
  return t === 0 ? `${e} min` : e === 0 ? `${t} h` : `${t} h ${e} min`;
}
const Ht = 56, _e = 6e4, Pt = 60 * _e, Mt = 24 * Pt, Oa = [10 * _e, 15 * _e, 30 * _e, Pt, 2 * Pt, 3 * Pt, 4 * Pt, 6 * Pt, 12 * Pt, Mt, 2 * Mt, 3 * Mt, 5 * Mt, 7 * Mt], Ha = 6, za = 10, hs = 8;
function Gn(a) {
  let t = Oa[0], e = 1 / 0;
  for (const s of Oa) {
    const n = a / s, i = (n < Ha ? Ha - n : n > za ? n - za : 0) * 100 + Math.abs(n - hs) - s / 1e12;
    i < e && (e = i, t = s);
  }
  return t;
}
function Ba(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t;
}
function Kn(a, t, e) {
  const s = [];
  if (e < Mt) {
    const i = Ba(a).getTime();
    for (let r = i + Math.ceil((a - i) / e) * e; r <= t; r += e) r >= a && s.push(r);
    return s;
  }
  const n = Math.round(e / Mt), o = Ba(t);
  for (let i = 0; ; i++) {
    const r = new Date(o);
    if (r.setDate(o.getDate() - i * n), r.getTime() < a) break;
    s.push(r.getTime());
  }
  return s.reverse();
}
function oa(a) {
  const { start: t, end: e } = a, s = a.x0 ?? 0, n = a.x1 ?? I, o = a.x ?? ((d) => s + (d - t) / (e - t) * (n - s)), i = Gn(e - t), r = (d) => i < Mt ? it(d).replace(/^(\d{1,2}):00$/, "$1") : i === Mt && e - t <= 8 * Mt ? rn(d) : ln(d), l = Kn(t, e, i).map((d) => {
    const h = Math.round(o(d) * 10) / 10;
    if (a.slot) {
      const g = Math.round(o(d + a.slot / 2) * 10) / 10, b = r(d), m = b.length * 3.3;
      return { x: h, text: g - m < s || g + m > n ? "" : b, labelX: g };
    }
    return { x: h, text: h < s + 6 || h > n - 6 ? "" : r(d) };
  });
  return Math.max(0, ...l.map((d) => d.text.length)) > 5 && l.length - 1 > 7 ? l.map((d, h) => h % 2 === 1 ? d : { ...d, text: "" }) : l;
}
function ps(a) {
  if (!a || a.length < 2) return I / hs;
  const t = a.slice(1).map((e, s) => e.x - a[s].x).sort((e, s) => e - s);
  return t[Math.floor(t.length / 2)];
}
const Zn = [1, 2, 4, 5], Yn = [1, 2, 3, 4, 5, 6, 8, 10];
function Xn(a) {
  if (!(a > 0)) return !1;
  const t = a / 10 ** Math.floor(Math.log10(a) + 1e-9);
  return [1, 2, 2.5, 5].some((e) => Math.abs(t - e) < 1e-6 * e);
}
function qn(a, t, e, s) {
  const n = [...a].sort((r, l) => r.y - l.y), o = [...n], i = [];
  return n.slice(1).forEach((r, l) => {
    const c = n[l].y, d = (r.y - c) / t, h = s ? Yn.filter((b) => b === 1 || Xn(Math.abs(s(r.y) - s(c)) / b)) : Zn, g = h.reduce((b, m) => Math.abs(m - d) < Math.abs(b - d) ? m : b, h[0] ?? 1);
    for (let b = 1; b < g; b++) {
      const m = Math.round((c + (r.y - c) * b / g) * 10) / 10;
      o.push({ y: m });
      const u = e?.(m);
      u && i.push({ y: m, text: u });
    }
  }), { grid: o.sort((r, l) => r.y - l.y), labels: i };
}
function us(a, t) {
  const e = a / Math.max(1, t), s = 10 ** Math.floor(Math.log10(e));
  return [1, 2, 2.5, 5, 10].map((n) => n * s).find((n) => n >= e * 0.8) ?? e;
}
const Jn = 5 * 6e4, oe = 48, ja = 60, Qn = 0, to = (a) => class extends a {
  // ----------------------------------------------------------------- state and history
  /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
  batRange(t) {
    if (this._batRange) return this._batRange;
    try {
      const e = localStorage.getItem(Ca);
      if (e && Le.includes(e)) return e;
    } catch {
    }
    return t.batteryRange;
  }
  setBatRange(t) {
    this._batRange = t, this._batScrub = {};
    try {
      localStorage.setItem(Ca, t);
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
      const c = s - (r === "6h" ? 6 : 24) * tt;
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
        start: s - Gt[l] * Tt,
        end: s,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, e) {
    if (t === "1d")
      return { start: Math.floor(e / tt) * tt - 23 * tt, bins: 24 };
    const s = new Date(e);
    return s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (Gt[t] - 1)), { start: s.getTime(), bins: Gt[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const e of this.batNeeds(t)) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < Jn) || this.fetchBattery(t, e, s);
      }
  }
  async fetchBattery(t, e, s) {
    const n = this.hass;
    if (!n) return;
    const o = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: o, parts: s?.parts ?? {} } };
    try {
      const i = this.batRequests(t, e, o), r = {};
      await Promise.all(i.map(async (l) => r[l.part] = await Et(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
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
    return et(t.batIn, s) ? "charging" : et(t.batDis, s) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, e, s) {
    const n = this.t, o = this.batteryReserve(e), i = Array.from({ length: 10 }, (l, c) => {
      const d = (c + 1) * 10 <= o + 1e-3, h = t === void 0 ? 0 : Q((t - c * 10) / 10, 0, 1) * 100, g = c === 0 ? "8px 0 0 8px" : c === 9 ? "0 8px 8px 0" : "0", b = d ? "var(--ed-warning)" : "var(--ed-battery)";
      return y`<span class="pill" style="height:${s}px;border-radius:${g};background:${d ? na("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${h.toFixed(1)}%;background:${b}"></i></span>`;
    }), r = t === void 0 ? n.noData : n.bat.levelLabel(U(t), U(o));
    return y`<div class="bat-gauge" role="img" aria-label=${r}>${i}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, e) {
    const s = t.soc, n = this.batState(t, e);
    if (s === void 0) return;
    const o = e.num.battery.capacity;
    if (n === "charging") {
      const i = Ea(100 - s, o, t.batIn ?? 0);
      return i === void 0 ? void 0 : this.t.bat.fullIn(de(i));
    }
    if (n === "discharging") {
      const i = Ea(s - this.batteryReserve(e), o, t.batDis ?? 0);
      return i === void 0 ? void 0 : this.t.bat.lastsFor(de(i));
    }
  }
  /** Signed power in kW, charging positive (the raw entity is the other way round). */
  batSigned(t) {
    if (!(t.batIn === void 0 && t.batDis === void 0))
      return ((t.batIn ?? 0) - (t.batDis ?? 0)) / 1e3;
  }
  // ----------------------------------------------------------------- popup
  renderBatteryPopup(t, e, s, n, o) {
    const i = this.t, r = s.num.flows.idle_threshold, l = t.key === "bat", c = n.soc, d = c !== void 0 && c <= this.batteryReserve(s), h = l ? n.batDis : n.batIn, b = et(h, r) ? l ? i.pop.discharging(nt(h, o)) : i.pop.charging(nt(h, o)) : n.batDis === void 0 && n.batIn === void 0 && c === void 0 ? T : l ? i.idle.bat : i.idle.batIn, m = this.today(s), u = l ? m.bdis : m.bchg, p = this.batEstimate(n, s), f = Math.min(236, e.width), v = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, x = Q(v - f / 2, 0, e.width - f), k = t.side === "L" ? e.left[t.key] : e.right[t.key], $ = k - e.tile.h / 2, E = k < e.height / 2, L = E ? `top:${($ + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - $ + 8).toFixed(0)}px`;
    return y`<div class="pop bat-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${x.toFixed(0)}px;${L};width:${f}px">
        <i class="arrow ${E ? "up" : "down"}" aria-hidden="true" style="left:${(v - x - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${b}</span></div>
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${i.pop.level}${d ? y`<span class="note"> ${i.pop.atReserve}</span>` : C}</span>
            <span class="pop-big" style="color:${d ? "var(--ed-warning)" : "var(--ed-text)"}">${c === void 0 ? T : U(c)}</span>
          </div>
          ${this.renderGauge(c, s, 12)}
        </div>
        ${p ? y`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${p}</p>` : C}
        <div class="pop-rows"><div class="pop-row"><span>${l ? i.pop.rows.discharged : i.pop.rows.charged}</span><b>${u === void 0 ? T : `${st(u)} kWh`}</b></div></div>
        <button type="button" class="bat-open" @click=${() => this.openBatteryDetail()}><span>${i.bat.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
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
    const e = this.t, s = this._batScrub[t.id] ?? t.start ?? 100, n = t.fade ?? Qn, o = s / 100 * I;
    let i = 0;
    for (let u = 1; u < t.n; u++) Math.abs(t.x(u) - o) < Math.abs(t.x(i) - o) && (i = u);
    const r = (u) => {
      const p = u.key === "ArrowRight" || u.key === "ArrowUp" ? 1 : u.key === "ArrowLeft" || u.key === "ArrowDown" ? -1 : 0;
      if (!p) return;
      u.preventDefault();
      const f = Q(i + p, 0, t.n - 1);
      this._batScrub = { ...this._batScrub, [t.id]: t.x(f) / I * 100 };
    }, l = t.x(i), c = t.dot?.(i), d = t.read(i), h = (u) => `${(u / t.h * 100).toFixed(2)}%`, g = t.ticks ?? (t.time ? oa(t.time) : void 0), b = qn(t.grid, ps(g), t.valueAt, t.valueNum), m = [...t.labels, ...b.labels.filter((u) => t.labels.every((p) => Math.abs(p.y - u.y) > 13))];
    return y`${t.panel ? C : y`<div class="bat-read">${d}</div>`}
        <div class="bat-chart" style="aspect-ratio:${I + Ht} / ${t.h}">
          <svg viewBox="0 0 ${I + Ht} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${n} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${I} height=${t.h}><rect width=${I} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${b.grid.map((u) => Y`<line x1="0" y1=${u.y} x2=${I} y2=${u.y} class=${u.strong ? "axis" : "grid"}></line>`)}
            ${(g ?? []).map((u) => Y`<line x1=${u.x} y1="0" x2=${u.x} y2=${t.h} class="grid"></line>`)}
            <g mask=${n > 0 ? `url(#bm-${t.id})` : C}>${t.body}</g>
            <line x1=${l} y1="0" x2=${l} y2=${t.h} class="cursor"></line>
            ${c ? Y`<circle cx=${l} cy=${c.y} r="6" style="fill:var(--ed-text)"></circle>` : C}
          </svg>
          ${m.map((u) => y`<span class="bat-ylabel" style="top:calc(${h(u.y)} - 7px);left:calc(${(I / (I + Ht) * 100).toFixed(2)}% + 8px)">${u.text}</span>`)}
          <input type="range" style="width:${(I / (I + Ht) * 100).toFixed(2)}%" min="0" max="100" step="1" .value=${String(s)} aria-label=${e.bat.scrubLabel} aria-valuetext=${d}
            @input=${(u) => {
      this._batScrub = { ...this._batScrub, [t.id]: Number(u.target.value) };
    }} @keydown=${r} />
        </div>
        ${g ? y`<div class="bat-axis ticks">${g.map((u) => y`<span style="left:${((u.labelX ?? u.x) / (I + Ht) * 100).toFixed(2)}%;transform:translateX(${u.labelX === void 0 && u.x < 8 ? "0" : u.labelX === void 0 && u.x > I - 8 ? "-100%" : "-50%"})">${u.text}</span>`)}</div>` : y`<div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>`}
        ${t.panel ? t.panel(i) : t.legend ?? C}`;
  }
  renderChartOrEmpty(t, e, s) {
    if (s) return this.renderChart(s);
    const n = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return y`<div class="bat-nodata" style="aspect-ratio:${I} / ${e}">${n ? T : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const e = t.entities.battery, s = `day:${this._batSpan}`, n = this._batData[s];
    if (!n) return;
    const o = this._batSpan === "6h" ? 6 : 24, i = n.at, r = i - o * tt, l = wt(this.batRows(s, "level", e.state_of_charge), "mean", r, i, oe), c = wt(this.batRows(s, "level", e.power), "mean", r, i, oe).map((L) => L === void 0 ? void 0 : -L / 1e3);
    if (!l.some((L) => L !== void 0) && !c.some((L) => L !== void 0)) return;
    const d = W(this.hass, e.state_of_charge), h = W(this.hass, e.power);
    d !== void 0 && (l[oe - 1] = d), h !== void 0 && (c[oe - 1] = -h / 1e3);
    const g = oe, b = (L) => R(L / (g - 1) * I), m = (L) => R(98 - Q(L, 0, 100) / 100 * 90), u = ae(Math.max(1, ...c.map((L) => Math.abs(L ?? 0)))), p = 172, f = (L) => R(p - Q(L, -u, u) / u * 44), v = 4.2, x = c.map((L, S) => {
      if (L === void 0) return C;
      const D = Math.min(p, f(L)), M = Math.max(1.5, Math.abs(f(L) - p));
      return Y`<rect x=${R(b(S) - v / 2)} y=${L >= 0 ? D : p} width=${v} height=${R(M)} rx="1.5" style="fill:${L >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), k = Jt(l, b, m), $ = Ae(l, b, m, 98), E = (L) => `${G(L, L % 1 === 0 ? 0 : 1)} kW`;
    return {
      id: "level",
      h: 224,
      n: g,
      x: b,
      grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: !0 }, { y: p - 44 }, { y: p, strong: !0 }, { y: p + 44 }],
      time: { start: r, end: i },
      labels: [
        { y: 8, text: U(100) },
        { y: 53, text: U(50) },
        { y: 98, text: U(0) },
        { y: p - 44, text: `+${E(u)}` },
        { y: p, text: "0" },
        { y: p + 44, text: `−${E(u)}` }
      ],
      body: Y`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${$} fill="url(#bl-area)"></path>
          <path d=${k} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${x}`,
      dot: (L) => l[L] === void 0 ? void 0 : { y: m(l[L]), color: "var(--ed-text)" },
      read: (L) => {
        const S = c[L], D = S === void 0 ? T : Math.abs(S) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${S > 0 ? this.t.bat.charging : this.t.bat.discharging} ${nt(Math.abs(S) * 1e3, "kW")}`;
        return `${this.back((1 - L / (g - 1)) * o * 60)} · ${l[L] === void 0 ? T : U(l[L])} · ${D}`;
      },
      from: `−${o} h`,
      to: this.t.bat.now,
      legend: y`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`
    };
  }
  /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
  energyChart(t, e) {
    const s = t.entities.battery, n = `hist:${e}`, o = this._batData[n];
    if (!o) return;
    const i = this.histWindow(e, o.at), r = e === "1d", l = i.bins, c = r ? tt : Tt, d = i.start + l * c, h = r ? 0 : 6 * tt, g = this.batRows(n, "energy", s.total_charge), b = this.batRows(n, "energy", s.total_discharge), m = wt(g, "change", i.start, d, l, "sum", h), u = wt(b, "change", i.start, d, l, "sum", h);
    if (!m.some((w) => w !== void 0) && !u.some((w) => w !== void 0)) return;
    const p = m.map((w) => w ?? 0), f = u.map((w) => w ?? 0), v = ae(Math.max(0.5, ...p, ...f)), x = r ? 3 : l <= 7 ? 10 : 2, k = (I - (l - 1) * x) / l, $ = (w) => R(w * (k + x) + k / 2), E = 100, L = (w) => Q(w, 0, v) / v * 92, S = p.flatMap((w, z) => {
      const ot = f[z], F = z === l - 1 ? 1 : 0.85;
      return [
        Y`<rect x=${R(z * (k + x))} y=${R(E - Math.max(w > 0 ? 1 : 0, L(w)))} width=${R(k)} height=${R(Math.max(w > 0 ? 1 : 0, L(w)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${F}"></rect>`,
        Y`<rect x=${R(z * (k + x))} y=${E} width=${R(k)} height=${R(Math.max(ot > 0 ? 1 : 0, L(ot)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${F}"></rect>`
      ];
    }), D = (w) => R(E - Q(w, -v, v) / v * 92), M = p.map((w, z) => w - f[z]), _ = r ? 2 : 1, A = (w) => `${w >= 0 ? "+" : "−"}${G(Math.abs(w), _)}`, H = (w) => r ? it(i.start + w * tt) : le(i.start + w * Tt);
    return {
      charged: p,
      discharged: f,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: $,
        grid: [{ y: E, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${G(v, v % 1 === 0 ? 0 : 1)}` }, { y: E, text: "0" }, { y: 192, text: `−${G(v, v % 1 === 0 ? 0 : 1)}` }],
        time: { start: i.start, end: d, slot: c },
        valueNum: (w) => (E - w) / 92 * v,
        valueAt: (w) => {
          const z = (E - w) / 92 * v;
          return Math.abs(z) < 1e-9 ? void 0 : `${z > 0 ? "+" : "−"}${G(Math.abs(z), Math.abs(z) % 1 === 0 ? 0 : Math.abs(z * 10) % 1 < 1e-6 ? 1 : 2)}`;
        },
        body: Y`${S}<path d=${Jt(M, $, D)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (w) => ({ y: D(M[w]), color: "var(--ed-text)" }),
        read: (w) => `${H(w)} · ${A(p[w])} / ${A(-f[w])} · ${this.t.bat.net} ${A(M[w])} kWh`,
        from: r ? "−24 h" : le(i.start),
        to: this.t.bat.today,
        legend: y`<div class="bat-legend wrap"><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charged.toLowerCase()}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharged.toLowerCase()}</span><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.net}</span></div>`
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
    const i = Gt[e], r = o.at, l = r - i * Tt, c = ja, d = (_) => wt(this.batRows(n, "health", _), "mean", l, r, c), h = d(s.min_cell_voltage), g = d(s.max_cell_voltage), b = h.map((_, A) => _ === void 0 || g[A] === void 0 ? void 0 : Math.max(0, (g[A] - _) * 1e3)), m = b.filter((_) => _ !== void 0);
    if (!m.length) return;
    const { imbalance_good: u, imbalance_warn: p } = t.num.battery, f = Math.max(u > 0 ? u * 1.5 : 10, Math.max(...m) * 1.2), v = (_) => R(130 - Q(_, 0, f) / f * 120), x = (_) => R(_ / (c - 1) * I), k = (_) => this.back((1 - _ / (c - 1)) * i * 24 * 60), $ = this.t.bat.health, E = "var(--ed-battery)", L = "var(--ed-warning)", S = (_) => _ > p ? L : E, D = `bg-${e}`, M = Q(1 - (130 - v(p)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: c,
      x,
      time: { start: l, end: r },
      grid: [{ y: 10 }, { y: v(u) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${j(f)} mV` }, { y: v(u), text: `${j(u)} mV` }, { y: 130, text: "0" }],
      body: Y`<defs>
            <linearGradient id=${D} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${M} stop-color="#FF9230"></stop><stop offset=${M} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${D}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${v(u)} width=${I} height=${R(130 - v(u))} style="fill:${E};fill-opacity:0.12"></rect>
          <path d=${Ae(b, x, v, 130)} fill="url(#${D}-area)"></path>
          <path d=${Jt(b, x, v)} fill="none" stroke="url(#${D})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (_) => b[_] === void 0 ? void 0 : { y: v(b[_]), color: S(b[_]) },
      read: (_) => b[_] === void 0 ? `${k(_)} · ${T}` : `${k(_)} · ${$.difference} ${j(b[_])} mV · ${$.min} ${G(h[_], 3)} V · ${$.max} ${G(g[_], 3)} V`,
      from: i === 1 ? "−24 h" : `−${i} d`,
      to: this.t.bat.today,
      legend: y`<div class="bat-legend"><span><i class="swatch" style="background:${E};opacity:0.35"></i>${$.excellentZone(`${j(u)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, e, s) {
    if (t === "gap") return this.balanceChart(e, s);
    const n = e.entities.battery, o = `health:${s}`, i = this._batData[o];
    if (!i) return;
    const r = Gt[s], l = i.at, c = l - r * Tt, d = ja, h = (M) => this.batRows(o, "health", M), g = (M) => wt(h(M), "mean", c, l, d), b = (M) => R(M / (d - 1) * I), m = (M) => this.back((1 - M / (d - 1)) * r * 24 * 60), u = r === 1 ? "−24 h" : `−${r} d`;
    let p;
    if (t === "temp") {
      const M = g(n.min_cell_temperature), _ = g(n.max_cell_temperature), A = g(n.temperature);
      p = {
        low: M,
        high: _,
        line: A,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (H) => `${j(H)} °C`,
        mid: (H) => `${j(H)} °C`,
        read: (H) => {
          const w = [M[H] === void 0 ? void 0 : `${this.t.bat.health.min} ${G(M[H], 1)}`, A[H] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${G(A[H], 1)}`, _[H] === void 0 ? void 0 : `${this.t.bat.health.max} ${G(_[H], 1)}`].filter(Boolean);
          return `${m(H)} · ${w.length ? `${w.join(" · ")} °C` : T}`;
        },
        legend: y`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const M = wt(h(n.total_discharge), "state", c, l, d, "last").map((_) => _ === void 0 ? void 0 : _ / e.num.battery.capacity);
      p = {
        low: M,
        high: M,
        line: M,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (_) => j(_, 1),
        mid: (_) => j(_, 1),
        read: (_) => `${m(_)} · ${M[_] === void 0 ? T : this.t.bat.health.cycles(G(M[_], 1))}`
      };
    }
    const f = Vn([...p.low, ...p.high], p.minSpan);
    if (!f) return;
    const v = us(f.hi - f.lo, 4), x = Math.floor(f.lo / v + 1e-9) * v;
    let k = Math.ceil(f.hi / v - 1e-9) * v;
    Math.round((k - x) / v) % 2 === 1 && (k += v);
    const $ = { lo: x, hi: k }, E = (M) => R(130 - (Q(M, $.lo, $.hi) - $.lo) / ($.hi - $.lo) * 120), L = t === "life" ? "" : cs(p.low, p.high, b, E), S = p.line ? Jt(p.line, b, E) : "", D = p.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: d,
      x: b,
      time: { start: c, end: l },
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: p.text($.hi) }, { y: 70, text: p.mid(($.hi + $.lo) / 2) }, { y: 130, text: p.text($.lo) }],
      body: Y`<path d=${L} style="fill:${D};fill-opacity:0.22"></path><path d=${S} fill="none" style="stroke:${D}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (M) => p.line?.[M] === void 0 ? void 0 : { y: E(p.line[M]), color: D },
      read: p.read,
      from: u,
      to: this.t.bat.today,
      legend: p.legend
    };
  }
  // ----------------------------------------------------------------- the detail
  /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
  renderBatteryDetail(t, e) {
    const s = this.t, n = ["now", "hist", "health"].map((o) => ({ value: o, label: s.bat.tabs[o] }));
    return y`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${s.bat.detailLabel} tabindex="-1">
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
    const e = this.t, s = Le.map((n) => ({ value: n, label: e.bat.ranges[n] }));
    return y`<ed-segmented .options=${s} .value=${this.batRange(t)} label=${e.bat.rangeLabel} @hdk-select=${(n) => this.setBatRange(n.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, e) {
    const s = this.t, n = t.entities.battery, o = e.soc, i = this.batState(e, t), r = this.batSigned(e), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, c = "kW", d = W(this.hass, n.current), h = W(this.hass, n.voltage), g = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, b = i === "idle", m = i === "charging" ? s.pop.charging(nt(e.batIn ?? 0, c)) : i === "discharging" ? s.pop.discharging(nt(e.batDis ?? 0, c)) : i === "idle" ? s.bat.status.idle.toLowerCase() : s.noData, u = this.batEstimate(e, t), p = this.today(t), f = [
      { label: s.bat.live.power, value: l === void 0 ? T : b ? "0 kW" : nt(l, c), sub: i === void 0 ? "" : s.bat.status[i] },
      { label: s.bat.live.current, value: d === void 0 ? T : `${G(Math.abs(d), 1)} A`, sub: d === void 0 || b || i === void 0 ? "" : i === "charging" ? s.bat.live.chargeCurrent : s.bat.live.dischargeCurrent },
      { label: s.bat.live.voltage, value: h === void 0 ? T : `${G(h, 1)} V`, sub: s.bat.live.ofBattery },
      { label: s.bat.live.load, value: g === void 0 ? T : `${G(g, 2)} C`, sub: s.bat.live.loadSub }
    ], v = p.bchg, x = p.bdis, k = v !== void 0 && x !== void 0 ? v - x : void 0, $ = ["6h", "24h"].map((E) => ({ value: E, label: s.bat.spans[E] }));
    return y`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${s.bat.level}</span><span class="bat-sub">${m}</span></div><span class="bat-huge">${o === void 0 ? T : U(o)}</span></div>
          ${this.renderGauge(o, t, 32)}
          ${u ? y`<p class="bat-estimate plain">${u}</p>` : C}
        </div>
        <div class="bat-kpis">${f.map((E) => y`<div class="bat-kpi"><span class="sub">${E.label}</span><span class="val">${E.value}</span><span class="sub">${E.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.levelChart}</span>
          <ed-segmented .options=${$} .value=${this._batSpan} label=${s.bat.spanLabel} @hdk-select=${(E) => {
      this._batSpan = E.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${s.bat.charged}</span><span class="val">${v === void 0 ? T : `${st(v)} kWh`}</span></div><div><span class="sub">${s.bat.discharged}</span><span class="val">${x === void 0 ? T : `${st(x)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${v !== void 0 && x !== void 0 && v + x > 0 ? y`${v > 0 ? y`<i style="flex:${v.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : C}${x > 0 ? y`<i style="flex:${x.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : C}` : C}</div>
          <p class="bat-sub">${k === void 0 ? T : s.bat.netStored(`${k >= 0 ? "+" : "−"}${st(Math.abs(k))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, e) {
    const s = this.t, n = t.entities.battery, o = this.batRange(t), i = `hist:${o}`, r = this.energyChart(t, o), l = r ? r.charged.reduce((S, D) => S + D, 0) : void 0, c = r ? r.discharged.reduce((S, D) => S + D, 0) : void 0, d = s.bat.kpi.over(o === "1d" ? "24 h" : s.bat.ranges[o].toLowerCase()), h = this._batData[i], g = Gt[o], b = this.batRows(i, "level", n.state_of_charge), m = this.batRows(i, "level", n.power), u = kt(b, "min") ? Math.min(...(b ?? []).map((S) => S.min).filter((S) => typeof S == "number")) : void 0, p = kt(m, "max") || kt(m, "min") ? Math.max(...(m ?? []).flatMap((S) => [S.max, S.min]).filter((S) => typeof S == "number").map((S) => Math.abs(S))) : void 0, f = `${G(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, v = T, x = [
      { label: s.bat.charged, value: l === void 0 ? v : `${G(l, o === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.discharged, value: c === void 0 ? v : `${G(c, o === "1d" ? 1 : 0)} kWh`, sub: d },
      { label: s.bat.kpi.efficiency, value: l && c !== void 0 ? U(G(c / l * 100, 1)) : v, sub: s.bat.kpi.efficiencySub },
      { label: s.bat.kpi.cycles, value: c === void 0 ? v : G(c / t.num.battery.capacity, 1), sub: s.bat.kpi.cyclesSub(f) },
      { label: s.bat.kpi.lowest, value: u === void 0 ? v : U(u), sub: s.bat.kpi.lowestSub },
      { label: s.bat.kpi.peak, value: p === void 0 ? v : nt(p, "kW"), sub: s.bat.kpi.peakSub }
    ], $ = wt(b, "mean", this.histWindow(o, h?.at ?? Date.now()).start, h?.at ?? Date.now(), Math.max(1, g * 24)).filter((S) => S !== void 0), E = [0, 20, 40, 60, 80, 100], L = E.slice(0, 5).map((S, D) => $.length ? Math.round($.filter((M) => D === 4 ? M >= S : M >= S && M < E[D + 1]).length / $.length * 100) : void 0);
    return y`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${o === "1d" ? s.bat.energyHours : s.bat.energyDays} · kWh</span>${this.renderChartOrEmpty(i, 200, r?.chart)}</div>
        <div class="bat-kpis">${x.map((S) => y`<div class="bat-kpi"><span class="sub">${S.label}</span><span class="val">${S.value}</span><span class="sub">${S.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.bandsTitle}</span>
          ${L.map((S, D) => y`<div class="bat-band"><span class="name">${E[D]}–${E[D + 1]} %</span><span class="track"><i style="width:${S ?? 0}%;background:${D === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${S === void 0 ? T : U(S)}</span></div>`)}
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
    const s = this.t, n = t.entities.battery, o = s.bat.health, i = this.batRange(t), r = (A) => W(this.hass, A), l = r(n.state_of_health), c = r(n.min_cell_voltage), d = r(n.max_cell_voltage), h = r(n.min_cell_temperature), g = r(n.max_cell_temperature), b = this.batProblem(n.error), m = this.batProblem(n.warning), u = Wt(this.hass, n.total_charge), p = Wt(this.hass, n.total_discharge), f = t.num.battery, v = c !== void 0 && d !== void 0 ? (d - c) * 1e3 : void 0, x = v === void 0 ? void 0 : v <= f.imbalance_good ? "good" : v <= f.imbalance_warn ? "ok" : v <= f.imbalance_fault ? "warn" : "fault", k = x === "warn" || x === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", L = [l, c, d, h, g, e.soc].every((A) => A === void 0) && b === void 0 && m === void 0 ? { title: o.noData, sub: o.noDataSub, tone: "off", icon: "M5 12h14" } : b || m ? { title: b ? o.error(b) : o.warning(m), sub: o.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: o.ok, sub: o.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, S = p === void 0 ? void 0 : p / f.capacity, D = [
      { key: "soh", label: o.capacity, value: l === void 0 ? T : U(l), sub: l === void 0 ? s.noData : o.capacitySub(`${G(f.capacity * l / 100, 1)} kWh`, `${G(f.capacity, f.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: o.balance, value: v === void 0 ? T : `${j(v)} mV`, word: x ? o.words[x] : void 0, sub: o.balanceSub, details: [] },
      {
        key: "temp",
        label: o.temperature,
        value: g === void 0 ? T : `${j(g)} °C`,
        sub: g !== void 0 && h !== void 0 ? o.temperatureSub(`${j(g - h)} °C`) : s.noData,
        details: [
          [o.battery, n.temperature],
          [o.inverterAir, n.inverter_temperature_air],
          [o.inverterRadiator, n.inverter_temperature_radiator]
        ].filter(([, A]) => A).map(([A, H]) => ({ label: A, value: r(H) === void 0 ? T : `${G(r(H), 1)} °C` }))
      },
      {
        key: "life",
        label: o.life,
        value: S === void 0 ? T : o.cycles(j(S)),
        sub: u && p !== void 0 ? o.lifeSub(U(G(p / u * 100, 1))) : s.noData,
        details: [
          { label: o.totalCharged, value: u === void 0 ? T : `${j(u)} kWh` },
          { label: o.totalDischarged, value: p === void 0 ? T : `${j(p)} kWh` }
        ]
      }
    ], M = (A) => A ? eo(this.hass, A) : void 0, _ = [];
    if (n.mode && _.push({ label: o.mode, value: M(n.mode) ?? T }), n.charge_limit && _.push({ label: o.chargeLimit, value: r(n.charge_limit) === void 0 ? T : `${j(r(n.charge_limit))} A` }), n.discharge_limit && _.push({ label: o.dischargeLimit, value: r(n.discharge_limit) === void 0 ? T : `${j(r(n.discharge_limit))} A` }), n.error || n.warning) {
      const A = [b, m].filter(Boolean).join(", ");
      _.push({ label: o.errors, value: b === void 0 && m === void 0 ? T : A || o.none, warn: !!A });
    }
    return y`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${L.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${L.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${L.tone}">${L.title}</span><span class="bat-sub">${L.sub}</span></div>
        </div>
        ${D.map((A) => {
      const H = A.key !== "soh" && this._batOpen === A.key, w = H ? this.healthChart(A.key, t, i) : void 0;
      return y`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${A.key === "soh"} aria-expanded=${A.key === "soh" ? C : H ? "true" : "false"}
              @click=${() => {
        A.key !== "soh" && (this._batOpen = H ? void 0 : A.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${A.label}</span><span class="bat-sub">${A.sub}</span></span>
              <span class="bat-value">${A.value}</span>${A.word ? y`<span class="bat-word" style="color:${k}">${A.word}</span>` : C}
              ${A.key === "soh" ? C : y`<svg class="chev ${H ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${H ? y`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${i}`, 140, w)}
                  ${A.details.length ? y`<div class="bat-list">${A.details.map((z) => y`<div class="bat-line"><span>${z.label}</span><b>${z.value}</b></div>`)}</div>` : C}
                </div>` : C}
          </div>`;
    })}
        ${_.length ? y`<div class="bat-card flush"><span class="bat-cap pad">${o.diagnostics}</span><div class="bat-list pad">${_.map((A) => y`<div class="bat-line"><span>${A.label}</span><b style="color:${A.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${A.value}</b></div>`)}</div></div>` : C}`;
  }
};
function eo(a, t) {
  const e = pt(a, t)?.state;
  return e === void 0 || e === "" || e === "unavailable" || e === "unknown" ? void 0 : e;
}
const Pa = (a) => typeof a == "number" && Number.isFinite(a);
function Re(a, t) {
  const e = /* @__PURE__ */ new Map();
  for (const s of a ?? []) {
    const n = s[t];
    if (!Pa(n) || !Pa(s.start)) continue;
    const o = new Date(s.start), i = Dt(s.start), r = e.get(i) ?? new Array(24).fill(void 0);
    r[o.getHours()] = Math.max(0, t === "mean" ? n / 1e3 : n), e.set(i, r);
  }
  return e;
}
function Ee(a, t = 1) {
  if (!a) return;
  const e = a.filter((s) => s !== void 0);
  return e.length >= t ? e.reduce((s, n) => s + n, 0) : void 0;
}
function Oe(a, t) {
  if (!a.length) return;
  const e = [...a].sort((i, r) => i - r), s = Math.min(100, Math.max(0, t)) / 100 * (e.length - 1), n = Math.floor(s), o = Math.ceil(s);
  return e[n] + (e[o] - e[n]) * (s - n);
}
const Ra = (a) => Oe(a, 50);
function gs(a, t) {
  const e = [], s = new Date(a);
  for (let n = 0; n < t; n++)
    s.setDate(s.getDate() - 1), e.push(s.getTime());
  return e;
}
function St(a, t) {
  const e = new Date(a);
  return e.setDate(e.getDate() + t), e.setHours(0, 0, 0, 0), e.getTime();
}
function ao(a, t, e, s) {
  const n = gs(t, e).filter((r) => a.has(r)), o = Array.from({ length: 24 }, (r, l) => {
    const c = n.map((d) => a.get(d)[l]).filter((d) => d !== void 0);
    return c.length >= 3 ? Oe(c, s) : void 0;
  }), i = n.map((r) => Ee(a.get(r), 20)).filter((r) => r !== void 0);
  return { curve: o, daily: i.length >= 3 ? Oe(i, s) : void 0, days: n.length };
}
function so(a) {
  const t = a.reduce((e, s) => e + (s ?? 0), 0);
  return t > 0 ? a.map((e) => (e ?? 0) / t) : void 0;
}
function no(a, t) {
  const e = so(t);
  return e ? e.map((s) => s * a) : void 0;
}
function oo(a, t, e, s) {
  const n = new Date(s), o = n.getHours(), i = 1 - (n.getMinutes() * 60 + n.getSeconds()) / 3600, r = e.map((c, d) => d < o ? 0 : d === o ? (c ?? 0) * i : c ?? 0), l = r.reduce((c, d) => c + d, 0);
  return Array.from({ length: 24 }, (c, d) => d < o ? a?.[d] : l > 0 ? r[d] / l * Math.max(0, t) : void 0);
}
function Na(a, t) {
  const e = new Date(t), s = e.getHours(), n = 1 - (e.getMinutes() * 60 + e.getSeconds()) / 3600;
  return a.reduce((o, i, r) => o + (r < s ? 0 : r === s ? (i ?? 0) * n : i ?? 0), 0);
}
function io(a, t, e, s, n, o) {
  if (a === void 0) return;
  const i = new Date(s), r = i.getHours() + i.getMinutes() / 60, l = e.reduce((f, v, x) => f + (v ?? 0) * Math.min(1, Math.max(0, r - x)), 0), c = e.reduce((f, v) => f + (v ?? 0), 0);
  let d, h = "forecast";
  if (t !== void 0) {
    const f = Na(e, s);
    let v = Math.min(Math.max(t - a, 0), f);
    o && o.possible >= 0.3 && (v = Math.min(v, f * Math.min(1, Math.max(0, o.actual / o.possible)))), d = a + v;
  } else if (c > 0 && l >= 0.5) {
    const f = c - l;
    d = a + f * Math.min(2, a / l), h = "pace";
  }
  if (d === void 0) return;
  const g = d > 0 ? Math.min(1, a / d) : 1, b = Math.min(0.6, n * (1 + (1 - g))), m = Math.max(0, d - a), u = c > 0 ? Na(e, s) : 1 / 0;
  let p = g < 0.35 ? "low" : g < 0.7 ? "medium" : "high";
  return n > 0.3 && p !== "low" && (p = p === "high" ? "medium" : "low"), { value: d, low: a + m * (1 - b), high: a + Math.min(m * (1 + b), u), done: g, certainty: p, source: h };
}
function ro(a) {
  const t = a.filter((e) => e.actual > 0.5);
  if (!(t.length < 3))
    return t.reduce((e, s) => e + Math.abs(s.forecast - s.actual) / s.actual, 0) / t.length;
}
function lo(a, t, e, s) {
  let n = -1, o = -1;
  for (let i = t; i <= e; i++)
    (a[i] ?? 0) >= s && (n < 0 && (n = i), o = i);
  return n < 0 ? void 0 : [n, o + 1];
}
const Fa = [9, 11, 13, 15];
function co(a) {
  const t = Fa.findIndex((e) => a < e);
  return t < 0 ? Fa.length : t;
}
function ho(a) {
  if (!a || !a.some((e) => e !== void 0)) return;
  const t = [0, 0, 0, 0, 0];
  return a.forEach((e, s) => {
    e !== void 0 && (t[co(s)] += e);
  }), t;
}
function ye(a, t, e) {
  const s = new Date(a), n = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), 12), o = Math.round(n / 864e5 + 24405875e-1 - 2451545), i = Math.PI / 180, r = o - e / 360, l = (357.5291 + 0.98560028 * r) % 360, c = 1.9148 * Math.sin(l * i) + 0.02 * Math.sin(2 * l * i) + 3e-4 * Math.sin(3 * l * i), d = (l + c + 180 + 102.9372) % 360, h = 2451545 + r + 53e-4 * Math.sin(l * i) - 69e-4 * Math.sin(2 * d * i), g = Math.sin(d * i) * Math.sin(23.4397 * i), b = Math.cos(Math.asin(g)), m = (Math.sin(-0.833 * i) - Math.sin(t * i) * g) / (Math.cos(t * i) * b);
  if (m < -1 || m > 1) return;
  const u = Math.acos(m) / i, p = (f) => (f - 24405875e-1) * 864e5;
  return { rise: p(h - u / 360), set: p(h + u / 360) };
}
function po(a) {
  const { capacity: t, efficiency: e } = a;
  let s = a.soc / 100 * t;
  const n = a.reserve / 100 * t, o = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let i = Math.ceil(a.now / (tt / 4)) * (tt / 4);
  const r = Dt(a.now), l = r + a.eveningHour * tt, c = St(r, 1) + a.morningHour * tt;
  let d = !1, h = s >= t - 0.01;
  for (; i <= c; i += tt / 4) {
    !o.socAtEvening && i >= l && a.now < l && (o.socAtEvening = s / t * 100);
    const g = new Date(i - 1).getHours(), b = i - 1 < St(r, 1), m = b ? (a.sun[g] ?? 0) / 4 : 0, u = (a.house[g] ?? 0) / 4;
    i <= l && (o.sunUntilEvening += m, o.houseUntilEvening += u);
    const p = s / t * 100;
    let f = 0;
    a.car && b && (d && p <= a.car.stopSoc ? d = !1 : !d && p >= a.car.startSoc && m * 4 * 1e3 >= a.car.minSun && (d = !0), f = d ? a.car.watts / 1e3 / 4 : 0);
    const v = u + f, x = Math.min(m, v), k = m - x, $ = v - x;
    if (f > 0 && (o.carTotal += f, o.carSun += Math.min(f, Math.max(0, m - u))), k > 0)
      s = Math.min(t, s + k * e);
    else if ($ > 0) {
      const E = Math.max(0, s - n) * e, L = Math.min($, E);
      s -= L / e;
    }
    !h && s >= t - 0.01 && o.fullAt === void 0 && i < l && (o.fullAt = i), s >= t - 0.01 && (h = !0), i >= c && (o.socAtMorning = s / t * 100);
  }
  return o;
}
function uo(a, t, e = 8) {
  const s = t.length;
  if (s === 0) return [];
  if (s === 1) return [[a[0], t[0]]];
  const n = Array.from({ length: s - 1 }, (r, l) => (t[l + 1] - t[l]) / (a[l + 1] - a[l])), o = [n[0], ...Array.from({ length: s - 2 }, (r, l) => n[l] * n[l + 1] <= 0 ? 0 : 2 * n[l] * n[l + 1] / (n[l] + n[l + 1])), n[s - 2]], i = [];
  for (let r = 0; r < s - 1; r++) {
    const l = a[r + 1] - a[r];
    for (let c = 0; c < e; c++) {
      const d = c / e, h = 2 * d ** 3 - 3 * d ** 2 + 1, g = d ** 3 - 2 * d ** 2 + d, b = -2 * d ** 3 + 3 * d ** 2, m = d ** 3 - d ** 2;
      i.push([a[r] + d * l, h * t[r] + g * l * o[r] + b * t[r + 1] + m * l * o[r + 1]]);
    }
  }
  return i.push([a[s - 1], t[s - 1]]), i;
}
function go(a, t, e, s) {
  const n = gs(t, e).map((o) => Ee(a.get(o), 20)).filter((o) => o !== void 0);
  return n.length >= 3 ? Oe(n, s) : void 0;
}
const bo = 5 * 6e4, fo = 30 * 6e4, ie = 12, Kt = 2, Ia = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)"
], Wa = ["7d", "30d"], Ne = { "7d": 7, "30d": 30 }, mo = (a) => class extends a {
  constructor() {
    super(...arguments), this._sunWeatherBusy = !1;
  }
  // ----------------------------------------------------------------- state and history
  sunRange(t) {
    if (this._sunRange) return this._sunRange;
    try {
      const e = localStorage.getItem(La);
      if (e && Wa.includes(e)) return e;
    } catch {
    }
    return t.sunRange;
  }
  setSunRange(t) {
    this._sunRange = t, this._batScrub = {};
    try {
      localStorage.setItem(La, t);
    } catch {
    }
  }
  /** The views of the history the open parts need: the popup and the detail both show the day. */
  sunNeeds() {
    return this._sunDetail || this._pop === "sun" ? ["sun:hist", "sun:five"] : [];
  }
  sunRequests(t, e, s) {
    const n = t.entities, o = (...l) => l.filter((c) => !!c), i = Dt(s);
    if (e === "sun:five")
      return [{ part: "power", ids: o(n.pv.power), start: St(i, -10), end: s, period: "5minute", types: ["mean"] }];
    const r = St(i, -(Math.max(30, t.num.forecast.learn_days) + t.num.forecast.learn_days + 1));
    return [
      { part: "energy", ids: o(n.pv.total_generation), start: r, end: s, period: "hour", types: ["change"] },
      { part: "power", ids: o(n.pv.power), start: r, end: s, period: "hour", types: ["mean", "max"] },
      { part: "house", ids: o(n.house.power), start: St(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] },
      { part: "forecast", ids: o(n.forecast.energy_today), start: St(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] }
    ];
  }
  loadSun() {
    const t = this._config;
    if (!(!t || !this.hass)) {
      for (const e of this.sunNeeds()) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < bo) || this.fetchSun(t, e, s);
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
      await Promise.all(i.map(async (l) => r[l.part] = await Et(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: o, parts: {} } };
    }
  }
  /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
  async loadWeather(t) {
    const e = t.entities.forecast.weather, s = this.hass;
    if (!e || !s || this._sunWeatherBusy || this._sunWeather && Date.now() - this._sunWeather.at < fo) return;
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
      this._sunWeather = { at: n, days: i.filter((r) => r.datetime).map((r) => ({ day: Dt(Date.parse(r.datetime)), condition: r.condition })) };
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
    const e = Date.now(), s = Dt(e), n = t.num.forecast, o = this._batData["sun:hist"], i = this._batData["sun:five"], r = t.entities;
    let l = /* @__PURE__ */ new Map(), c = new Array(24).fill(void 0), d = [];
    if (o && Object.keys(o.parts).length) {
      if (this._sunCache?.entry !== o) {
        const F = r.pv.total_generation ? o.parts.energy?.[r.pv.total_generation] : void 0;
        let O = Re(F, "change");
        O.size || (O = Re(r.pv.power ? o.parts.power?.[r.pv.power] : void 0, "mean"));
        const Z = Re(r.house.power ? o.parts.house?.[r.house.power] : void 0, "mean"), vt = Array.from({ length: 24 }, (P, lt) => {
          const At = [...Z.entries()].filter(([ht]) => ht < s).map(([, ht]) => ht[lt]).filter((ht) => ht !== void 0);
          return At.length >= 3 ? Ra(At) : void 0;
        }), B = ((r.forecast.energy_today ? o.parts.forecast?.[r.forecast.energy_today] : void 0) ?? []).filter((P) => typeof P.mean == "number" && new Date(P.start).getHours() === 8).map((P) => ({ day: Dt(P.start), forecast: P.mean, actual: Ee(O.get(Dt(P.start)), 20) })).filter((P) => P.actual !== void 0 && P.day < s);
        this._sunCache = { entry: o, days: O, houseCurve: vt, pairs: B };
      }
      l = this._sunCache.days, c = this._sunCache.houseCurve, d = this._sunCache.pairs;
    }
    const h = ao(l, s, n.learn_days, n.possible_percentile), g = r.pv.power ? i?.parts.power?.[r.pv.power] : void 0;
    let b = l.get(s);
    if (g?.length) {
      const F = new Array(24).fill(void 0);
      for (const O of g) {
        if (O.start < s || typeof O.mean != "number") continue;
        const Z = new Date(O.start).getHours();
        F[Z] = (F[Z] ?? 0) + Math.max(0, O.mean) / 1e3 / ie;
      }
      b = F;
    }
    const u = Wt(this.hass, t.entities.daily.pv_generation) ?? (b && b.some((F) => F !== void 0) ? b.reduce((F, O) => F + (O ?? 0), 0) : void 0), p = Wt(this.hass, r.forecast.energy_today), f = new Date(e), v = f.getHours() + f.getMinutes() / 60, x = h.curve.some((F) => F !== void 0) ? h.curve.reduce((F, O, Z) => F + (O ?? 0) * Q(v - Z, 0, 1), 0) : void 0, k = ro(d) ?? n.typical_deviation / 100;
    let $;
    if (g?.length) {
      let F = 0, O = 0;
      for (const Z of g)
        Z.start < e - tt || Z.start >= e || typeof Z.mean != "number" || (F += Math.max(0, Z.mean) / 1e3 / ie, O += (h.curve[new Date(Z.start).getHours()] ?? 0) / ie);
      $ = { actual: F, possible: O };
    }
    const E = io(u, p, h.curve, e, k, $), L = E ? Math.max(0, E.value - (u ?? 0)) : 0, S = oo(b, E ? L : 0, h.curve, e);
    if (!E) for (let F = new Date(e).getHours(); F < 24; F++) S[F] = void 0;
    const D = this.place(), M = D ? ye(s, D.latitude, D.longitude) : void 0, _ = t.num.flows.idle_threshold, A = (g ?? []).filter((F) => F.start >= s && typeof F.mean == "number"), H = A.filter((F) => F.mean >= _), w = H.length ? H[0].start : void 0, z = A.reduce((F, O) => !F || O.mean > F.mean ? O : F, void 0);
    let ot;
    if (M) {
      const F = [];
      for (const xt of [...new Set((g ?? []).map((B) => Dt(B.start)))].filter((B) => B < s)) {
        const B = (g ?? []).filter((lt) => Dt(lt.start) === xt && lt.mean >= _).pop(), P = D ? ye(xt, D.latitude, D.longitude) : void 0;
        B && P && F.push(P.set - (B.start + 5 * 6e4));
      }
      const O = F.length >= 3 ? Ra(F) : 0, Z = H.length ? H[H.length - 1].start + 5 * 6e4 : void 0;
      ot = e > M.set && (Z === void 0 || e - Z > 15 * 6e4) && Z !== void 0 ? { at: Z, over: !0 } : { at: M.set - O, over: !1 };
    }
    return {
      now: e,
      today: s,
      ready: !!o && o.status !== "loading" || !!o?.parts && Object.keys(o.parts).length > 0,
      days: l,
      learned: h,
      done: u,
      possibleSoFar: x,
      forecastToday: p,
      deviation: k,
      pairs: d,
      estimate: E,
      hours: S,
      rise: M?.rise,
      set: M?.set,
      started: w,
      ends: ot,
      fiveRows: g,
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
    return y`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${s ? "true" : "false"} @click=${() => {
      this._sunHint = s ? void 0 : t;
    }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${s ? y`<div class="sun-note" role="note" @click=${() => {
      this._sunHint = void 0;
    }}>${e}</div>` : C}`;
  }
  /** A ring with the number centred in it and the unit under the number. */
  ring(t, e, s, n, o, i) {
    const r = (e - s) / 2, l = 2 * Math.PI * r, c = Q(t, 0, 1);
    return y`<div class="sun-ring" style="width:${e}px;height:${e}px" role="img" aria-label=${i}>
        <svg viewBox="0 0 ${e} ${e}" aria-hidden="true">
          <circle cx=${e / 2} cy=${e / 2} r=${r} fill="none" class="track" stroke-width=${s}></circle>
          <circle cx=${e / 2} cy=${e / 2} r=${r} fill="none" class="fill" stroke-width=${s} stroke-linecap="round" stroke-dasharray="${(l * c).toFixed(1)} ${l.toFixed(1)}" transform="rotate(-90 ${e / 2} ${e / 2})"></circle>
        </svg>
        <span class="num" style="font-size:${Math.round(e * (e <= 44 ? 0.3 : 0.27))}px">${n}</span><span class="unit">${o}</span>
      </div>`;
  }
  /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
  renderSoFar(t) {
    const e = this.t.sun, s = t.estimate, n = s && t.done !== void 0 && s.value > 0 ? Math.min(100, Math.round(t.done / s.value * 100)) : void 0, o = t.done !== void 0 && t.possibleSoFar !== void 0 && t.possibleSoFar >= 0.3 ? Math.round(t.done / t.possibleSoFar * 100) : void 0;
    return y`<div class="sun-sofar">
        <div class="text"><span class="sub">${e.soFar}</span><span class="val">${t.done === void 0 ? T : `${st(t.done)} kWh`}</span><span class="sub">${s ? e.ofEstimate(st(s.value)) : T}</span>${o === void 0 ? C : y`<span class="sub">${e.ofPossibleSoFar(U(o))}</span>`}</div>
        ${n === void 0 ? C : this.ring(n / 100, 40, 6, String(n), "%", e.ringLabel(U(n)))}
      </div>`;
  }
  /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
  renderSunFlow(t, e, s) {
    const n = this.t, o = e.num.flows.idle_threshold, i = ee.map((l) => ({ sink: l, watts: t.flows.filter((c) => c.from === "sun" && c.to === l).reduce((c, d) => c + d.watts, 0) })).filter((l) => et(l.watts, o));
    if (!i.length) return y`<p class="bat-sub">${t.sun === void 0 ? T : n.sun.flowNone}</p>`;
    const r = "kW";
    return y`<div class="mix-bar sun-bar ${s ? "large" : ""}" role="img" aria-label=${i.map((l) => `${n.tile[l.sink]} ${nt(l.watts, r)}`).join(", ")}>${i.map((l) => y`<div style="flex:${l.watts.toFixed(0)} 1 0;background:var(${qt[l.sink]})"></div>`)}</div>
        ${s ? y`<div class="sun-legend" role="group" aria-label=${n.sun.flowTitle}>${i.map((l) => y`<span><span class="name"><i style="background:var(${qt[l.sink]})"></i>${n.tile[l.sink]}</span><b>${nt(l.watts, r)}</b></span>`)}</div>` : C}`;
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
  renderSunPopup(t, e, s, n, o) {
    const i = this.t, r = this.sunView(s), l = et(n.sun, s.num.flows.idle_threshold), c = this.weatherNow(s), d = l ? c ? i.sun.producingWith(c) : i.sun.producing : n.sun === void 0 ? T : i.idle.sun, h = Math.min(236, e.width), g = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, b = Q(g - h / 2, 0, e.width - h), m = t.side === "L" ? e.left[t.key] : e.right[t.key], u = m - e.tile.h / 2, p = m < e.height / 2, f = p ? `top:${(u + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - u + 8).toFixed(0)}px`;
    return y`<div class="pop bat-pop sun-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${b.toFixed(0)}px;${f};width:${h}px">
        <i class="arrow ${p ? "up" : "down"}" aria-hidden="true" style="left:${(g - b - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${d}</span></div>
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${i.sun.powerNow}</span><span class="pop-big">${n.sun === void 0 ? T : nt(n.sun, o === "W" && n.sun >= s.num.flows.kw_from ? "kW" : o)}</span></div>
          ${l ? this.renderSunFlow(n, s, !1) : C}
        </div>
        ${this.renderSoFar(r)}
        <div class="pop-rows">
          <div class="pop-row"><span>${i.sun.started}</span><b>${r.started === void 0 ? T : it(r.started)}</b></div>
          <div class="pop-row"><span>${r.ends?.over ? i.sun.ended : i.sun.ends}</span><b>${r.ends === void 0 ? T : it(r.ends.at)}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openSunDetail()}><span>${i.sun.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
  }
  // ----------------------------------------------------------------- the detail
  renderSunDetail(t, e) {
    const s = this.t, n = ["today", "hist", "outlook"].map((i) => ({ value: i, label: s.sun.tabs[i] })), o = this.sunView(t);
    return y`<section class="bat-detail sun-detail" role="dialog" aria-modal="true" aria-label=${s.sun.detailLabel} tabindex="-1">
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
    if (!t.entities.pv.power || !e.fiveRows?.some((O) => O.start >= e.today)) return;
    const n = this.t.sun, o = e.rise !== void 0 ? Q(Math.floor(this.hourOf(e.rise) - 0.5), 0, 22) : 6, i = e.set !== void 0 ? Q(Math.ceil(this.hourOf(e.set) + 0.5), o + 2, 24) : 18, r = (i - o) * ie, l = e.today + o * tt, c = e.today + i * tt, d = (O) => R(Kt + O / (r - 1) * (I - Kt)), h = wt(e.fiveRows, "mean", l, c, r).map((O) => O === void 0 ? void 0 : O / 1e3), g = (O) => o + (O + 0.5) / ie, b = Math.floor((e.now - l) / (c - l) * r), m = W(this.hass, t.entities.pv.power);
    m !== void 0 && h.some((O) => O !== void 0) && b >= 0 && b < r && (h[b] = Math.max(0, m) / 1e3);
    const u = (O, Z) => {
      const vt = Z - 0.5, xt = Math.floor(vt), B = O[xt], P = O[xt + 1];
      if (B === void 0 && P === void 0) return;
      const lt = vt - xt;
      return (B ?? 0) * (1 - lt) + (P ?? 0) * lt;
    }, p = e.learned.curve.some((O) => O !== void 0), f = Array.from({ length: r }, (O, Z) => p ? u(e.learned.curve, g(Z)) : void 0), v = e.estimate, x = v ? Math.max(0, v.value - (e.done ?? 0)) : 0, k = v && x > 0 ? (v.low - (e.done ?? 0)) / x : 1, $ = v && x > 0 ? (v.high - (e.done ?? 0)) / x : 1, E = (O) => O >= b, L = Array.from({ length: r }, (O, Z) => v && E(Z) ? u(e.hours.map((vt, xt) => xt >= new Date(e.now).getHours() ? vt : void 0), g(Z)) : void 0), S = L.map((O) => O === void 0 ? void 0 : O * k), D = L.map((O, Z) => O === void 0 ? void 0 : Math.min(O * $, Math.max(O, f[Z] ?? 1 / 0))), M = Math.max(1, ...h.map((O) => O ?? 0), ...f.map((O) => O ?? 0), ...D.map((O) => O ?? 0)), _ = { start: l, end: c, x0: Kt, x1: I }, A = 150, H = us(M, Math.round((A - 12) / ps(oa(_)))), w = Math.ceil(M / H) * H, z = (O) => R(A - Q(O, 0, w) / w * (A - 12)), ot = (O) => nt(O * 1e3, "kW"), F = Array.from({ length: Math.round(w / H) }, (O, Z) => (Z + 1) * H);
    return {
      id: "sun-today",
      h: 170,
      n: r,
      x: d,
      fade: 0,
      start: Q(b / (r - 1) * 100, 0, 100),
      grid: [{ y: A, strong: !0 }, ...F.map((O) => ({ y: z(O) }))],
      labels: [...F.map((O) => ({ y: z(O), text: j(O, O % 1 ? 1 : 0) })), { y: A, text: "0" }],
      body: Y`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${cs(S, D, d, z)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${Jt(f, d, z)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${Ae(h, d, z, A)} fill="url(#sun-area)"></path>
          <path d=${Jt(h, d, z)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (O) => h[O] === void 0 ? void 0 : { y: z(h[O]), color: "var(--ed-sun)" },
      read: (O) => {
        const Z = it(l + (O + 0.5) * ((c - l) / r)), vt = [h[O] !== void 0 ? ot(h[O]) : L[O] !== void 0 ? `${n.chartLegend.forecast.toLowerCase()} ≈ ${ot(L[O])}` : T];
        return f[O] !== void 0 && vt.push(`${n.possibleShort} ${ot(f[O])}`), `${Z} · ${vt.join(" · ")}`;
      },
      time: _,
      from: it(l),
      to: it(c),
      legend: y`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-sun)"></i>${n.chartLegend.production}</span><span><i class="dots" aria-hidden="true"></i>${n.chartLegend.possible}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.3"></i>${n.chartLegend.forecast}</span></div>`
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
    const n = this.t, o = "kW", i = this.todayChart(t, s), r = this.whereToday(t), l = r?.reduce((d, h) => d + h.kwh, 0) ?? 0, c = e.sun === void 0 ? T : nt(e.sun, o);
    return y`<div class="bat-card">
          <span class="bat-cap">${n.sun.powerNow}</span>
          <span class="bat-huge">${c}</span>
          ${et(e.sun, t.num.flows.idle_threshold) ? this.renderSunFlow(e, t, !0) : C}
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
        ${r ? y`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.sun.whereTitle}</span>${this.hint("where", n.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${r.map((d) => y`<div style="flex:${d.kwh.toFixed(3)} 1 0;background:var(${qt[d.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${n.sun.whereTitle}>${r.map((d) => y`<span><span class="name"><i style="background:var(${qt[d.key]})"></i>${n.tile[d.key]}</span><b>${st(d.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${l > 0 ? n.sun.whereUnit : T}</span>
            </div>` : C}`;
  }
  // ----------------------------------------------------------------- Historie
  renderSunRange(t) {
    const e = this.t.sun.hist, s = Wa.map((n) => ({ value: n, label: e.ranges[n] }));
    return y`<ed-segmented .options=${s} .value=${this.sunRange(t)} label=${e.rangeLabel} @hdk-select=${(n) => this.setSunRange(n.detail.value)}></ed-segmented>`;
  }
  /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
  rangeDays(t, e, s = 0) {
    const n = Ne[e];
    return Array.from({ length: n }, (o, i) => St(t.today, -(n - i) - s));
  }
  /** The production by day of the range: the totals, the blocks of the day and what was possible. */
  histData(t, e, s) {
    const n = t.num.forecast;
    return this.rangeDays(e, s).map((i) => {
      const r = e.days.get(i), l = Ee(r, 20);
      return { day: i, hours: r, total: l, blocks: l === void 0 ? void 0 : ho(r), possible: go(e.days, i, n.learn_days, n.possible_percentile) };
    });
  }
  histChart(t, e, s) {
    const n = this.t.sun.hist, o = this.histData(t, e, s);
    if (!o.some((p) => p.total !== void 0)) return;
    const i = o.length, r = (I - Kt) / i, l = (p) => R(Kt + p * r + r / 2), c = Math.max(1, ...o.map((p) => Math.max(p.total ?? 0, p.possible ?? 0))), d = ae(c), h = 150, g = (p) => R(h - Q(p, 0, d) / d * (h - 14)), b = this._sunMode === "parts";
    let m;
    if (b) {
      const p = o.map((S, D) => l(D)), f = o.map((S) => S.blocks), v = f.map((S, D) => S ? D : -1).filter((S) => S >= 0), x = v.map((S) => f[S].reduce((D, M) => [...D, D[D.length - 1] + M], [0])), k = Array.from({ length: 6 }, (S, D) => uo(v.map((M) => p[M]), x.map((M) => g(M[D])))), $ = (S) => S.map(([D, M]) => `${R(D)},${R(M)}`).join(" "), E = o.map((S) => S.possible), L = E.some((S) => S !== void 0) ? Ae(E, l, g, h) : "";
      m = Y`<path d=${L} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((S) => Y`<polygon points=${`${$(k[S + 1])} ${$([...k[S]].reverse())}`} style="fill:${Ia[S]}"></polygon>`)}
          ${[1, 2, 3, 4].map((S) => Y`<polyline points=${$(k[S])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
    } else {
      const p = Math.min(s === "7d" ? 26 : 7, r - 3);
      m = Y`${o.map((f, v) => Y`
          ${f.possible === void 0 ? C : Y`<rect x=${R(l(v) - p / 2)} y=${g(f.possible)} width=${p} height=${R(h - g(f.possible))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${f.total === void 0 ? C : Y`<rect x=${R(l(v) - p / 2)} y=${g(f.total)} width=${p} height=${R(Math.max(1, h - g(f.total)))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${f.total !== void 0 && s === "7d" ? Y`<text x=${l(v)} y=${g(f.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${G(f.total, 1)}</text>` : C}`)}`;
    }
    const u = b ? y`<div class="sun-blocks" role="group">${n.blocks.map((p, f) => y`<span><i style="background:${Ia[f]}"></i><span>${p}</span></span>`)}</div>` : y`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${n.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${n.possible}</span></div>`;
    return {
      id: `sun-hist-${b ? "parts" : "total"}`,
      h: 170,
      n: i,
      x: l,
      fade: 0,
      grid: [{ y: h, strong: !0 }, { y: g(d / 2) }, { y: g(d) }],
      labels: [{ y: g(d), text: j(d) }, { y: g(d / 2), text: j(d / 2, d / 2 % 1 ? 1 : 0) }, { y: h, text: "0" }],
      time: { start: o[0].day, end: o[i - 1].day + Tt, x0: Kt, x1: I, slot: Tt },
      valueNum: (p) => (h - p) / (h - 14) * d,
      valueAt: (p) => j((h - p) / (h - 14) * d, (h - p) / (h - 14) * d % 1 ? 1 : 0),
      body: m,
      dot: (p) => o[p].total === void 0 ? void 0 : { y: g(o[p].total), color: "var(--ed-sun)" },
      read: (p) => {
        const f = o[p], v = le(f.day);
        if (f.total === void 0) return `${v} · ${T}`;
        if (b && f.blocks) {
          const x = f.blocks.indexOf(Math.max(...f.blocks));
          return `${v} · ${G(f.total, 1)} kWh · ${n.mostIn(n.blocks[x])}`;
        }
        return `${v} · ${G(f.total, 1)} kWh${f.possible ? ` · ${n.ofPossible(U(Math.round(f.total / f.possible * 100)))}` : ""}`;
      },
      from: "",
      to: "",
      legend: u
    };
  }
  /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
  eastWest(t) {
    const e = this.t.sun.hist, s = 46, n = (r, l, c) => {
      const d = (h) => `${R(70 + s * Math.cos(h * Math.PI / 180))},${R(64 - s * Math.sin(h * Math.PI / 180))}`;
      return Y`<path d="M${d(r)} A${s},${s} 0 0 1 ${d(l)}" fill="none" style="stroke:${c}" stroke-width="10"></path>`;
    }, o = 180 - 180 * t, i = Math.round(t * 100);
    return y`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${e.eastWestLabel(U(i), U(100 - i))}>${n(180, o + 1.5, "var(--ed-warning)")}${n(o - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${U(i)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${U(100 - i)}</span></div>`;
  }
  renderSunHistory(t, e) {
    const s = this.t.sun, n = t.num.forecast, o = this.sunRange(t), i = this.histData(t, e, o), r = i.filter((w) => w.total !== void 0), l = !e.ready, c = r.reduce((w, z) => w + z.total, 0);
    i.reduce((w, z) => w + (z.possible ?? 0), 0);
    const d = r.filter((w) => w.possible !== void 0), h = d.length ? Math.round(d.reduce((w, z) => w + z.total, 0) / d.reduce((w, z) => w + z.possible, 0) * 100) : void 0, g = this.histChart(t, e, o), b = ["total", "parts"].map((w) => ({ value: w, label: s.hist.modes[w] })), m = r.reduce((w, z) => !w || z.total > w.total ? z : w, void 0), u = r.reduce((w, z) => !w || z.total < w.total ? z : w, void 0), p = (w) => s.hist.dayOfPossible(le(w.day), w.possible ? U(Math.round(w.total / w.possible * 100)) : T), f = t.entities, v = f.pv.power && this._batData["sun:hist"]?.parts.power?.[f.pv.power] || [], x = i[0]?.day ?? e.today, k = v.filter((w) => w.start >= x && w.start < e.today && typeof w.max == "number").reduce((w, z) => !w || z.max > w.max ? z : w, void 0), $ = (w) => {
      const z = w.map((ot) => ot.hours ? ot.hours.filter((F) => (F ?? 0) >= 0.05).length : void 0).filter((ot) => ot !== void 0);
      return z.length ? z.reduce((ot, F) => ot + F, 0) / z.length : void 0;
    }, E = $(i), L = $(this.rangeDays(e, o, Ne[o]).map((w) => ({ hours: e.days.get(w) }))), S = e.rise !== void 0 && e.set !== void 0 ? this.hourOf((e.rise + e.set) / 2) : 12;
    let D = 0, M = 0;
    for (const w of r) w.hours?.forEach((z, ot) => {
      z && (ot + 0.5 < S ? D += z : M += z);
    });
    const _ = D + M > 0 ? D / (D + M) : void 0, A = r.filter((w) => w.total > n.good_day).length, H = e.pairs.slice(-7);
    return y`${this.renderSunRange(t)}
        <div class="bat-card">
          <span class="bat-cap">${s.hist.last(Ne[o])}</span>
          <span class="bat-huge sun-huge">${r.length ? `${G(c, 1)} kWh` : T}</span>
          <span class="bat-sub">${r.length ? y`${h === void 0 ? C : y`<b class="sun-yellow">${s.hist.ofPossible(U(h))}</b> · `}${s.hist.average(`${G(c / r.length, 1)} kWh`)}` : T}</span>
        </div>
        <div class="bat-card">
          <div class="bat-card-bar sun-mode"><span class="sun-title">${s.hist.chartTitle}</span>
            <ed-segmented compact .options=${b} .value=${this._sunMode} label=${s.hist.modeLabel} @hdk-select=${(w) => {
      this._sunMode = w.detail.value;
    }}></ed-segmented>
          </div>
          ${this.renderChartOrEmpty("sun:hist", 170, g)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${s.hist.best}</span><span class="val">${m ? `${G(m.total, 1)} kWh` : T}</span><span class="sub">${m ? p(m) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.worst}</span><span class="val">${u ? `${G(u.total, 1)} kWh` : T}</span><span class="sub">${u ? p(u) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.peak}</span><span class="val">${k ? nt(k.max, "kW") : T}</span><span class="sub">${k ? `${le(k.start)} ${s.at(it(k.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.length}</span><span class="val">${E === void 0 ? T : s.hist.lengthValue(G(E, 1))}</span><span class="sub">${L === void 0 ? "" : (o === "7d" ? s.hist.before7 : s.hist.before30)(G(L, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${s.hist.eastWest}</span>${_ === void 0 ? y`<span class="bat-sub">${T}</span>` : this.eastWest(_)}</div>
          <div class="bat-card"><span class="bat-cap">${s.hist.goodDays}</span><span class="val big">${r.length ? s.hist.goodOf(A, r.length) : T}</span><span class="bat-sub">${s.hist.over(j(n.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${r.map((w) => y`<i class=${w.total > n.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${H.length >= 3 ? this.renderAccuracy(H, e) : C}`;
  }
  renderAccuracy(t, e) {
    const s = this.t.sun, n = ae(Math.max(...t.flatMap((c) => [c.forecast, c.actual]))), o = 310, i = 60, r = 14, l = o / t.length;
    return y`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${s.hist.accuracyTitle}</span>${this.hint("acc", s.hints.acc)}</div>
        <div class="sun-acc"><b>±${U(Math.round(e.deviation * 100))}</b><span class="bat-sub">${s.hist.accuracyAverage(e.pairs.length)}</span></div>
        <svg viewBox="0 0 ${o + Ht} 80" class="sun-pairs" role="img" aria-label=${s.hist.accuracyLabel}>
          ${Array.from({ length: t.length + 1 }, (c, d) => Y`<line x1=${R(d * l)} y1="0" x2=${R(d * l)} y2=${i} class="grid"></line>`)}
          <line x1="0" y1=${i - 25} x2=${o} y2=${i - 25} class="grid"></line>
          <line x1="0" y1=${i - 50} x2=${o} y2=${i - 50} class="grid"></line>
          <text x=${o + 5} y=${i - 46} style="fill:var(--ed-secondary)" font-size="12">${j(n)} kWh</text>
          <text x=${o + 5} y=${i - 21} style="fill:var(--ed-secondary)" font-size="12">${j(n / 2, n / 2 % 1 ? 1 : 0)}</text>
          <text x=${o + 5} y=${i + 4} style="fill:var(--ed-secondary)" font-size="12">0</text>
          <line x1="0" y1=${i} x2=${o} y2=${i} class="axis"></line>
          ${t.map((c, d) => {
      const h = d * l + (l - 2 * r - 2) / 2, g = (b) => R(b / n * 50);
      return Y`<rect x=${R(h)} y=${R(i - g(c.forecast))} width=${r} height=${g(c.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${R(h + r + 2)} y=${R(i - g(c.actual))} width=${r} height=${g(c.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${R(h + r + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(c.day)}</text>`;
    })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${s.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${s.hist.actual}</span></div>
      </div>`;
  }
  // ----------------------------------------------------------------- Výhled
  renderSunOutlook(t, e) {
    const s = this.t.sun, n = s.outlook, o = t.num.forecast, i = t.entities, r = e.estimate, l = o.good_power / 1e3, c = `${G(o.good_power / 1e3, o.good_power % 1e3 ? 1 : 0)} kW`, d = r && e.done !== void 0 && r.value > 0 ? Math.min(100, Math.round(e.done / r.value * 100)) : void 0, h = r ? { low: 1, medium: 2, high: 3 }[r.certainty] : 0, g = [i.forecast.energy_today, i.forecast.energy_tomorrow, i.forecast.energy_day_2, i.forecast.energy_day_3, i.forecast.energy_day_4], b = this._sunWeather?.days ?? [], m = g.map((_, A) => {
      const H = St(e.today, A), w = A === 0 ? r?.value : Wt(this.hass, _), z = A === 0 ? e.hours : w === void 0 ? void 0 : no(w, e.learned.curve), ot = A === 0 ? this.weatherGroup(i.forecast.weather ? pt(this.hass, i.forecast.weather)?.state : void 0) : this.weatherGroup(b.find((F) => F.day === H)?.condition);
      return { i: A, day: H, kwh: w, hours: z, condition: ot };
    }).filter((_) => _.kwh !== void 0 || _.i === 0), u = m.filter((_) => _.kwh !== void 0), p = (_) => _ ? lo(_, o.strip_from, o.strip_to, l) : void 0, f = u.filter((_) => _.i > 0 || u.length === 1).reduce((_, A) => !_ || A.kwh > _.kwh ? A : _, void 0), v = f ? p(f.hours) : void 0, x = this.place(), k = x ? ye(e.today, x.latitude, x.longitude) : void 0, $ = x ? ye(St(e.today, 1), x.latitude, x.longitude) : void 0, E = k ? Math.round((k.set - k.rise) / 6e4) : void 0, L = k && $ ? Math.round(($.set - $.rise - (k.set - k.rise)) / 6e4) : void 0, S = this.evening(t, e), D = Array.from({ length: o.strip_to - o.strip_from + 1 }, (_, A) => o.strip_from + A), M = new Date(e.now).getHours();
    return y`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${n.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${r ? `${st(r.value)} kWh` : T}</span>
              <span class="bat-sub">${r ? n.between(st(r.low), st(r.high)) : ""}</span>
              ${r ? y`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((_) => y`<i class=${_ <= h ? "on" : ""}></i>`)}</span><b>${n.certainty[r.certainty]}</b>${this.hint("conf", s.hints.conf)}</span>` : C}
            </div>
            ${d === void 0 ? C : this.ring(d / 100, 76, 8, String(d), "%", s.ringLabel(U(d)))}
          </div>
        </div>
        ${m.length > 1 ? y`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.fiveTitle}</span>${this.hint("five", s.hints.five(c))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${D.map((_) => y`<span>${_ % 3 === 0 ? _ : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${m.map((_) => {
      const A = p(_.hours);
      return y`<div class="sun-five-row">
                    <span class="day"><b>${_.i === 0 ? n.today : Xt(_.day)}</b><span>${_.condition ? s.weather[_.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${D.map((H) => {
        const w = _.hours?.[H], z = w === void 0 ? "none" : w >= l ? "strong" : w >= l * 0.35 ? "mid" : w >= l * 0.075 ? "faint" : "none";
        return y`<i class="${z} ${_.i === 0 && H === M ? "now" : ""}"></i>`;
      })}</span>
                    <span class="end"><b>${_.kwh === void 0 ? T : `${_.i ? "≈ " : ""}${st(_.kwh)}`}</b><span class=${A ? "" : "off"}>${_.kwh === void 0 ? "" : A ? n.window(A[0], A[1]) : n.below(c)}</span></span>
                  </div>`;
    })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${n.strong(c)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${n.weak}</span></div>
            </div>` : C}
        ${S ? y`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.eveningTitle}</span>${this.hint("eve", s.hints.eve)}</div>
              <div class="bat-list">${S.map((_) => y`<div class="bat-line sun-line"><span><i style="background:var(${_.color})"></i>${_.label}</span><b>${_.value}</b></div>`)}
              </div>
            </div>` : C}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${n.dayLength}</span><span class="val">${E === void 0 ? T : n.hoursMinutes(Math.floor(E / 60), E % 60)}</span><span class="sub">${L === void 0 ? "" : n.dayChange(L)}</span></div>
          <div class="bat-kpi"><span class="sub">${n.bestDay}</span><span class="val">${f ? f.i === 0 ? n.today : Xt(f.day) : T}</span><span class="sub">${f ? n.bestSub(st(f.kwh), v ? n.window(v[0], v[1]) : "") : ""}</span></div>
        </div>`;
  }
  /** kWh per km of the car, from its charge, the capacity and the range it reports; undefined when it reports none of them. */
  carKwhPerKm(t) {
    const e = W(this.hass, t.entities.car.state_of_charge), s = W(this.hass, t.entities.car.range), n = W(this.hass, t.entities.car.capacity);
    if (!(e === void 0 || s === void 0 || n === void 0 || e < 5 || s < 5 || n <= 0))
      return n * e / 100 / s;
  }
  /** The rows of "Dnes do večera": the battery full, its level in the evening, the car from the sun, the grid at night; none without the data it needs. */
  evening(t, e) {
    const s = t.num.forecast, n = t.entities, o = W(this.hass, n.battery.state_of_charge), i = this.sunHouseCurve();
    if (o === void 0 || !i.some((h) => h !== void 0) || !e.estimate) return;
    const r = po({
      now: e.now,
      soc: o,
      capacity: t.num.battery.capacity,
      reserve: this.batteryReserve(t),
      sun: e.hours,
      house: i,
      efficiency: s.efficiency / 100,
      eveningHour: s.evening_hour,
      morningHour: s.morning_hour,
      car: n.wallbox.power && es(ct(this.hass, n.wallbox.status)) !== "disconnected" ? { startSoc: s.car_start_soc, stopSoc: s.car_stop_soc, minSun: s.car_min_sun, watts: t.num.wallbox.power_min } : void 0
    }), l = this.t.sun.outlook, c = [], d = it(e.today + s.evening_hour * tt);
    if (r.socAtEvening !== void 0 && (c.push({ color: "--ed-battery", label: l.batteryNow, value: U(Math.round(o)) }), c.push({ color: "--ed-sun", label: l.sunUntil(d), value: `≈ ${st(r.sunUntilEvening)} kWh` }), c.push({ color: "--ed-house", label: l.houseUntil(d), value: `≈ ${st(r.houseUntilEvening)} kWh` })), r.fullAt !== void 0 && c.push({ color: "--ed-battery", label: l.full, value: `≈ ${it(r.fullAt)}` }), r.socAtEvening !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(it(e.today + s.evening_hour * tt)), value: `≈ ${U(Math.round(r.socAtEvening))}` }), r.carTotal > 0) {
      const h = this.carKwhPerKm(t);
      c.push({ color: "--ed-car", label: l.carSun, value: `≈ ${st(r.carSun)} kWh${h ? ` · ${j(r.carSun / h)} km` : ""}` });
    }
    return r.socAtMorning !== void 0 && c.push({ color: "--ed-battery", label: l.batteryAt(it(St(e.today, 1) + s.morning_hour * tt)), value: `≈ ${U(Math.round(r.socAtMorning))}` }), c;
  }
}, $e = 5 * 6e4, vo = 24 * tt, yo = 7, $o = 3, xo = ["overcurrent", "overheating", "overpowering", "overvoltage"], Zt = ["#5E5CE6", "#E8457A", "#1E9E96", "#B8803A", "#5E9E34", "#6F8FAF"], Ua = "ha-energie-dashboard.house-range", wo = "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12C19,15.87 15.87,19 12,19C8.13,19 5,15.87 5,12C5,9.82 6.01,7.87 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,9.26 19.77,6.82 17.83,5.17Z", ko = (a) => `\0group:${a}`, _o = "mdi:power-plug", So = (a) => class extends a {
  // ----------------------------------------------------------------- the appliances
  /** The appliances: the devices that have the label and measure power, and the ones named in house.appliances with their power sensor; the others (a vacuum) drop out. */
  appliances(t) {
    const e = this.hass, s = e?.devices ?? {}, n = e?.entities ?? {}, o = t.houseLabel.toLowerCase(), i = (d) => !!d?.some((h) => h.toLowerCase() === o), r = /* @__PURE__ */ new Set();
    for (const [d, h] of Object.entries(s)) i(h.labels) && r.add(d);
    for (const d of Object.values(n)) d.device_id && i(d.labels) && r.add(d.device_id);
    const l = (d) => {
      const h = { problems: [] }, g = {};
      for (const [b, m] of Object.entries(n)) {
        if (!d || m.device_id !== d) continue;
        const u = this.hass?.states?.[b];
        if (!u) continue;
        const p = u.attributes?.icon;
        typeof p == "string" && p && (g[b] = p);
        const f = u.attributes?.device_class;
        if (b.startsWith("sensor."))
          f === "power" && !h.power ? h.power = b : f === "energy" && u.attributes?.state_class === "total_increasing" && !b.endsWith("_returned") && !h.energy && (h.energy = b);
        else if (b.startsWith("binary_sensor.") && f === "problem") {
          const v = xo.find((x) => b.endsWith(`_${x}`));
          v && h.problems.push({ id: b, kind: v });
        } else b.startsWith("switch.") && !h.plug && (h.plug = b);
      }
      return h.icon = h.plug && g[h.plug] || h.power && g[h.power] || Object.values(g)[0], h;
    }, c = [];
    for (const d of r) {
      const h = s[d], g = (h?.name_by_user || h?.name || d).trim(), b = l(d);
      if (!b.power) continue;
      const m = t.appliances.find((u) => wa(u.name).some((p) => p.toLowerCase() === g.toLowerCase()));
      c.push({ name: g, label: m?.name, deviceId: d, power: m?.power ?? b.power, energy: m?.energy ?? b.energy, plug: b.plug, icon: this.iconOf(m?.icon, b.icon, [m?.power ?? b.power, m?.energy ?? b.energy, m?.running, m?.start_energy]), problems: b.problems, running: m?.running, startEnergy: m?.start_energy });
    }
    for (const d of t.appliances) {
      if (!d.power || c.some((b) => b.power === d.power)) continue;
      const h = n[d.power]?.device_id ?? void 0, g = l(h);
      c.push({ name: wa(d.name)[0], label: d.name, deviceId: h ?? d.power, power: d.power, energy: d.energy ?? g.energy, plug: g.plug, icon: this.iconOf(d.icon, g.icon, [d.power, d.energy, d.running, d.start_energy]), problems: g.problems, running: d.running, startEnergy: d.start_energy });
    }
    return c.sort((d, h) => d.name.localeCompare(h.name));
  }
  /** The icon of an appliance: the configured one, the one of the entities of its device, the one of its helpers, otherwise a plug. */
  iconOf(t, e, s) {
    const n = s.map((o) => o ? this.hass?.states?.[o]?.attributes?.icon : void 0).find((o) => typeof o == "string" && o !== "");
    return t ?? e ?? n ?? _o;
  }
  /** The name of the appliance in the language of the card. */
  applianceName(t) {
    return this.pickText(t.label) ?? t.name;
  }
  /** The icon of the appliance (Home Assistant draws it from its name). */
  renderApplianceIcon(t) {
    return t.icon ? y`<ha-icon class="house-icon" icon=${t.icon}></ha-icon>` : C;
  }
  /** An appliance that draws no power: the grey power symbol instead of a word. */
  renderIdleMark() {
    return y`<span class="house-idle" role="img" aria-label=${this.t.house.idle}><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${wo}></path></svg></span>`;
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
    const s = W(this.hass, t.power);
    return s === void 0 ? void 0 : et(s, e.num.flows.idle_threshold);
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
      const c = new Date(l);
      return c.setHours(0, 0, 0, 0), c.getTime();
    }, i = o(t), r = o(Date.now());
    return e !== void 0 && o(e) === i ? n : i === r ? e === void 0 ? n : `${s.house.todayWord} ${n}` : i === o(r - 12 * tt) ? `${s.house.yesterday} ${n}` : `${Xt(t)} ${n}`;
  }
  /** The energy of the cycle: the counter minus the value saved at the start. */
  cycleKwh(t) {
    const e = Wt(this.hass, t.energy), s = W(this.hass, t.startEnergy);
    return e === void 0 || s === void 0 ? void 0 : Math.max(0, e - s);
  }
  /** The status line of an appliance: "Běží · 31 min", "Skončilo · před 40 min" (up to 24 h) or nothing. */
  applianceStatus(t, e) {
    const s = this.t, n = this.applianceOn(t, e);
    if (n === void 0) return;
    const o = this.cycleTimes(t, n);
    if (n) return t.running && o.minutes !== void 0 ? s.house.running(de(o.minutes)) : s.house.runningNoCycle;
    if (t.running && o.end !== void 0 && Date.now() - o.end <= vo) return s.house.ended(de(Math.max(0, Math.round((Date.now() - o.end) / 6e4))));
  }
  // ----------------------------------------------------------------- alerts
  /** One alert for each appliance whose socket reports a fault (CURRENT_SPEC.md, Dům: popup a detail). */
  houseAlerts(t) {
    return this.appliances(t).flatMap((e) => e.problems.filter((n) => ct(this.hass, n.id) === "on").map((n) => ({ kind: "warn", title: this.applianceName(e), text: this.t.house.problem[n.kind] })));
  }
  // ----------------------------------------------------------------- the popup
  /** The order of the rows is decided when the popup opens: the running appliances by power, at most three. */
  freezeHouse(t) {
    const e = this.appliances(t).filter((s) => this.applianceOn(s, t) === !0).sort((s, n) => (W(this.hass, n.power) ?? 0) - (W(this.hass, s.power) ?? 0)).slice(0, $o);
    this._houseFrozen = e.map((s) => s.name);
  }
  renderHousePopup(t, e, s, n, o) {
    const i = this.t, r = s.num.flows.idle_threshold, l = et(n.other, r), c = this.today(s), d = this.appliances(s), h = (this._houseFrozen ?? []).map((k) => d.find(($) => $.name === k)).filter((k) => !!k), g = Math.min(300, e.width), b = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, m = Q(b - g / 2, 0, e.width - g), u = t.side === "L" ? e.left[t.key] : e.right[t.key], p = u - e.tile.h / 2, f = u < e.height / 2, v = f ? `top:${(p + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - p + 8).toFixed(0)}px`, x = l ? nt(n.other, o) : n.other === void 0 ? T : i.idle.house;
    return y`<div class="pop bat-pop house-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${m.toFixed(0)}px;${v};width:${g}px">
        <i class="arrow ${f ? "up" : "down"}" aria-hidden="true" style="left:${(b - m - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${x}</span></div>
        <div class="pop-rows">
          ${h.map((k) => {
      const $ = W(this.hass, k.power), E = this.applianceStatus(k, s), L = this.cycleTimes(k, this.applianceOn(k, s)).minutes, S = this.applianceOn(k, s) && k.running && L !== void 0 ? `${this.applianceName(k)} · ${de(L)}` : this.applianceName(k), D = $ === void 0 ? y`<b>${T}</b>` : et($, r) ? y`<b>${nt($, o).replace(" ", " ")}</b>` : this.applianceOn(k, s) ? y`<b>${j($)}\u00a0W</b>` : this.renderIdleMark();
      return y`<div class="house-app" title=${E ?? ""}><span class="ell">${this.renderApplianceIcon(k)}${S}</span>${D}</div>`;
    })}
          <div class="pop-row"><span>${i.pop.rows.consumed}</span><b>${c.house === void 0 ? T : `${st(c.house)} kWh`}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openHouseDetail()}><span>${i.house.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
  }
  // ----------------------------------------------------------------- state and history
  houseRange(t) {
    if (this._houseRange) return this._houseRange;
    try {
      const e = localStorage.getItem(Ua);
      if (e && Le.includes(e)) return e;
    } catch {
    }
    return t.houseRange;
  }
  setHouseRange(t) {
    this._houseRange = t, this._batScrub = {};
    try {
      localStorage.setItem(Ua, t);
    } catch {
    }
  }
  openHouseDetail() {
    this._houseDetail = !0, this._houseOpen = [], this._houseTab = "now", this._batScrub = {};
    const t = this._config;
    t && !this._houseFrozen && this.freezeHouse(t);
  }
  closeHouseDetail() {
    this._houseDetail = !1, this._pop = void 0, this._houseFrozen = void 0, this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
  }
  loadBattery() {
    super.loadBattery(), this.loadHouse();
  }
  loadHouse() {
    const t = this._config;
    if (!t || !this.hass) return;
    if ((this._pop === "house" || this._pop === "car" || this._pop === "boil" || this._all || this._houseDetail) && (!this._houseToday || Date.now() - this._houseToday.at > $e || this._houseDetail && !this._houseToday.detail) && this.fetchHouseToday(t), this._houseDetail && this._houseTab === "hist") {
      const s = this.houseRange(t), n = `hist:${s}`, o = this._houseData[n];
      (!o || o.status !== "loading" && Date.now() - o.at > $e) && this.fetchHouse(t, n, s, o);
    }
    if (this._houseDetail && this._houseTab === "now") {
      const s = this._houseData.day;
      (!s || s.status !== "loading" && Date.now() - s.at > $e) && this.fetchHouse(t, "day", "day", s);
    }
    if (this._houseDetail && this._houseTab === "now" || this._pop === "house") {
      const s = this._houseCycles;
      (!s || Date.now() - s.at > $e) && this.fetchCycles(t);
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
        const d = await Et(e, [...n, ...l], c.getTime(), s, "5minute", ["mean"]), h = o.length || r.length ? await Et(e, [...o, ...r], c.getTime(), s, "5minute", ["change"]) : {}, g = {};
        for (const u of i)
          if (u.energy) {
            const p = h[u.energy];
            kt(p, "change") && (g[u.power] = p.reduce((f, v) => f + (typeof v.change == "number" ? v.change : 0), 0));
          } else {
            const p = d[u.power];
            kt(p, "mean") && (g[u.power] = p.reduce((f, v) => f + (typeof v.mean == "number" ? v.mean : 0), 0) / 12 / 1e3);
          }
        const b = {};
        for (const u of o) {
          const p = h[u];
          kt(p, "change") && (b[u] = p.reduce((f, v) => f + (typeof v.change == "number" ? v.change : 0), 0));
        }
        const m = (u) => {
          const p = u ? d[u] : void 0;
          return kt(p, "mean") ? p.reduce((f, v) => f + (typeof v.mean == "number" ? v.mean : 0), 0) / 12 / 1e3 : void 0;
        };
        this._houseToday = { at: s, car: m(t.entities.wallbox.power), boil: m(t.entities.boiler.power), apps: b, groups: g, detail: this._houseDetail };
      } catch {
        this._houseToday = { at: s, detail: this._houseDetail };
      }
  }
  /** The first moment and the number of bins of the chart: 24 whole hours, or whole days up to today (the same as the history of the battery). */
  houseWindow(t, e) {
    if (t === "day") {
      const n = new Date(e);
      return n.setHours(0, 0, 0, 0), { start: n.getTime(), bins: 24, step: tt };
    }
    return { ...this.histWindow(t, e), step: t === "1d" ? tt : Tt };
  }
  async fetchHouse(t, e, s, n) {
    const o = this.hass;
    if (!o) return;
    const i = Date.now();
    this._houseData = { ...this._houseData, [e]: { status: "loading", at: i, parts: n?.parts ?? {} } };
    try {
      const r = this.houseWindow(s, i), l = s === "1d" || s === "day" ? "hour" : "day", c = (...$) => $.filter((E) => !!E), d = t.entities, h = r.start + Math.min(r.bins - 1, Math.max(0, Math.floor((i - r.start) / r.step))) * r.step, g = this.appliances(t), b = t.groups.flatMap(($) => $.appliances), m = s === "day", u = c(...m ? [] : [d.pv.total_generation, d.battery.total_discharge, d.battery.total_charge, d.grid.total_import, d.grid.total_export], ...g.map(($) => $.energy), ...b.map(($) => $.energy)), p = c(...m ? [] : [d.wallbox.power, d.boiler.power], ...g.filter(($) => !$.energy).map(($) => $.power), ...b.filter(($) => !$.energy).map(($) => $.power)), [f, v, x, k] = await Promise.all([
        Et(o, u, r.start, i, l, ["change"]),
        Et(o, p, r.start, i, l, ["mean"]),
        // The running bin (hour or day) has no row in the long-term statistics yet: the 5-minute rows fill it.
        Et(o, u, h, i, "5minute", ["change"]),
        Et(o, p, h, i, "5minute", ["mean"])
      ]);
      this._houseData = { ...this._houseData, [e]: { status: "ready", at: i, parts: { energy: f, power: v, nowCounters: x, nowPowers: k } } };
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
    const n = this.appliances(t).map((o) => o.running).filter((o) => !!o);
    if (n.length)
      try {
        const o = await e.callWS({
          type: "history/history_during_period",
          start_time: new Date(s - yo * Tt).toISOString(),
          end_time: new Date(s).toISOString(),
          entity_ids: n,
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        }), i = {};
        for (const [r, l] of Object.entries(o ?? {})) {
          const c = [], d = [];
          let h, g;
          for (const b of l) {
            const m = b.s ?? b.state, u = b.lu ?? b.last_updated, p = typeof u == "number" ? u * 1e3 : u ? Date.parse(u) : NaN;
            if (Number.isFinite(p)) {
              if (m === void 0 || m === "unavailable" || m === "unknown") {
                h !== void 0 && g === void 0 && (g = p);
                continue;
              }
              h !== void 0 && m !== h && (m === "on" ? c.push(p) : m === "off" && d.push(h === "on" && g !== void 0 ? g : p)), h = m, g = void 0;
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
    const s = this.t, n = this.houseRange(t), o = Le.map((m) => ({ value: m, label: s.bat.ranges[m] })), i = ["now", "hist"].map((m) => ({ value: m, label: s.house.tabs[m] })), r = this.appliances(t), l = "W", c = [...this._houseFrozen ?? []], d = [...r].sort((m, u) => {
      const p = c.indexOf(m.name), f = c.indexOf(u.name);
      return (p < 0 ? 99 : p) - (f < 0 ? 99 : f) || m.name.localeCompare(u.name);
    }), h = this.houseChart(t, n), g = this._houseData[`hist:${n}`], b = g?.status === "loading" && !Object.keys(g.parts).length;
    return y`<section class="bat-detail house-detail" role="dialog" aria-modal="true" aria-label=${s.house.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeHouseDetail()}>‹ ${s.house.back}</button>
          <h2>${s.house.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeHouseDetail()}>${s.house.done}</button>
        </div>
        <ed-segmented .options=${i} .value=${this._houseTab} label=${s.house.tabsLabel} @hdk-select=${(m) => {
      this._houseTab = m.detail.value, this._batScrub = {};
    }}></ed-segmented>
        ${this._houseTab === "now" ? y`<div class="bat-card"><span class="bat-cap">${s.house.nowLabel}</span>
              <span class="house-hero">${e.other === void 0 ? T : nt(e.other, l)}</span></div>
            <div class="house-list"><span class="bat-cap">${s.house.appliances}</span>
              ${d.length || t.groups.length ? d.map((m) => this.renderApplianceRow(m, t, l)) : y`<div class="bat-card"><span>${s.house.none}</span><span class="bat-sub">${this.labelDiagnostics(t)}</span></div>`}
              ${t.groups.map((m, u) => this.renderGroupRow(m, u))}
            </div>` : y`<ed-segmented .options=${o} .value=${n} label=${s.house.rangeLabel} @hdk-select=${(m) => this.setHouseRange(m.detail.value)}></ed-segmented>
            <div class="bat-card"><span class="bat-cap">${n === "1d" ? s.house.chartHours : s.house.chartDays} · kWh</span>
              ${h ? this.renderChart(h) : y`<div class="bat-nodata" style="aspect-ratio:${I} / 220">${b ? T : s.bat.noDataChart}</div>`}
            </div>`}
      </section>`;
  }
  /**
   * A group of appliances (house.groups): one row. Closed: the power now (the sum) and the energy of today; open: every appliance with its
   * power now and its energy of today. No cycles, no threshold: what the appliances draw is shown as it is. A sum counts only when every appliance is known.
   */
  renderGroupRow(t, e) {
    const s = ko(e), n = this._houseOpen.includes(s), o = t.appliances.map((d) => ({ name: this.pickText(d.name) ?? "", watts: W(this.hass, d.power), kwh: this._houseToday?.groups?.[d.power] })), i = (d) => d.every((h) => h !== void 0) ? d.reduce((h, g) => h + g, 0) : void 0, r = (d) => d === void 0 ? T : nt(d, "W").replace(" ", " "), l = (d) => d === void 0 ? T : `${st(d)} kWh`, c = this.t;
    return y`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${n ? "true" : "false"} @click=${() => {
      this._houseOpen = n ? this._houseOpen.filter((d) => d !== s) : [...this._houseOpen, s];
    }}>
          <ha-icon class="house-icon" icon=${t.icon}></ha-icon>
          <span class="bat-col"><span class="bat-label">${this.pickText(t.name) ?? ""}</span><span class="bat-sub">${c.house.today} ${l(i(o.map((d) => d.kwh)))}</span></span>
          <span class="bat-value">${r(i(o.map((d) => d.watts)))}</span>
          <svg class="chev ${n ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${n ? y`<div class="house-body">
            <div class="house-cook">
              <span class="house-cook-head"></span><span class="house-cook-head">${c.house.nowCol}</span><span class="house-cook-head">${c.house.totalCol}</span>
              ${o.map((d) => y`<span class="house-cook-name">${d.name}</span><b>${r(d.watts)}</b><b>${l(d.kwh)}</b>`)}
            </div>
            ${this.renderDayChart(t.appliances.map((d, h) => ({ name: this.pickText(d.name) ?? "", energy: d.energy, power: d.power, color: Zt[h % Zt.length] })))}
          </div>` : C}
      </div>`;
  }
  renderApplianceRow(t, e, s) {
    const n = this.t, o = this._houseOpen.includes(t.name), i = W(this.hass, t.power), r = this.applianceOn(t, e), l = this.applianceStatus(t, e) ?? (r === !1 ? n.house.notRunning : T), c = i !== void 0 && et(i, e.num.flows.idle_threshold), d = i === void 0 ? y`<span class="bat-value">${T}</span>` : c ? y`<span class="bat-value">${nt(i, s)}</span>` : r ? y`<span class="bat-value">${j(i)}\u00a0W</span>` : this.renderIdleMark(), h = this.cycleTimes(t, r), g = this.cycleKwh(t), b = /* @__PURE__ */ new Date();
    b.setHours(0, 0, 0, 0);
    const m = t.running ? this._houseCycles?.byId[t.running] : void 0, u = m ? m.starts.filter((D) => D >= b.getTime()).length : void 0, p = Math.max(0, this.appliances(e).findIndex((D) => D.name === t.name)), f = Zt[p % Zt.length], v = (D, M) => `${this.stamp(D)} – ${M}`, x = t.running && h.start !== void 0 ? y`<div class="house-line wrap"><span>${r ? n.house.currentCycle : n.house.lastCycle}</span><b><span>${v(h.start, r ? n.house.axisTo : this.stamp(h.end ?? h.start, h.start))}</span>${g !== void 0 ? y` <span>·\u00a0${st(g)}\u00a0kWh</span>` : C}</b></div>` : t.running && h.end !== void 0 && !r ? y`<div class="house-line wrap"><span>${n.house.lastCycle}</span><b>${n.house.endedAt(this.stamp(h.end))}</b></div>` : C, k = this.renderDayChart([{ name: this.applianceName(t), energy: t.energy, power: t.power, color: f }]), $ = t.energy ? this._houseToday?.apps?.[t.energy] : void 0, E = t.plug ? ct(this.hass, t.plug) : void 0, L = t.problems.find((D) => ct(this.hass, D.id) === "on"), S = (D, M) => y`<div class="house-line"><span>${D}</span><b>${M}</b></div>`;
    return y`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${o ? "true" : "false"} @click=${() => {
      this._houseOpen = o ? this._houseOpen.filter((D) => D !== t.name) : [...this._houseOpen, t.name];
    }}>
          ${this.renderApplianceIcon(t)}
          <span class="bat-col"><span class="bat-label">${this.applianceName(t)}</span><span class="bat-sub">${l}</span></span>
          ${d}
          <svg class="chev ${o ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${o ? y`<div class="house-body">
              ${L ? S(n.house.problem[L.kind], "") : C}
              ${x}
              ${t.running && u !== void 0 ? S(n.house.today, n.house.cyclesCount(u, $ === void 0 ? "" : st($))) : C}
              ${k}
              ${E === "off" ? S(n.house.plug, n.house.plugOff) : C}
            </div>` : C}
      </div>`;
  }
  /** "Co se dělo": the consumption of the house (without the car and the boiler) in kWh per hour or per day, broken down by the appliances. */
  /** The energy per bin of the statistics of a view: from the counter (the running bin from its 5-minute rows), otherwise from the mean power. */
  houseSeries(t, e) {
    const s = t.at, n = this.houseWindow(e, s), o = n.bins, i = n.start + o * n.step, r = n.step / tt, l = Math.min(o - 1, Math.max(0, Math.floor((s - n.start) / n.step))), c = t.parts.energy ?? {}, d = t.parts.power ?? {}, h = t.parts.nowCounters ?? {}, g = t.parts.nowPowers ?? {};
    return { at: s, w: n, n: o, cur: l, counter: (u) => {
      if (!u || !kt(c[u], "change")) return;
      const p = wt(c[u], "change", n.start, i, o, "sum"), f = h[u];
      return kt(f, "change") && (p[l] = f.reduce((v, x) => v + (typeof x.change == "number" ? x.change : 0), 0)), p;
    }, meanKwh: (u) => {
      if (!u || !kt(d[u], "mean")) return;
      const p = wt(d[u], "mean", n.start, i, o, "mean").map((v) => v === void 0 ? void 0 : v * r / 1e3), f = g[u];
      if (kt(f, "mean")) {
        const v = f, x = v.reduce((k, $) => k + (typeof $.mean == "number" ? $.mean : 0), 0) / v.length;
        p[l] = x * Math.min(r, Math.max(0, (s - (n.start + l * n.step)) / tt)) / 1e3;
      }
      return p;
    } };
  }
  /** The reading of a bar (and the legend at once): the moment and the total, then every part with its colour and its energy. */
  renderReading(t, e, s, n) {
    return y`<div class="house-panel" role="group" aria-label=${t}>
        <div class="house-panel-head"><span>${t}</span><b>${s}\u00a0${st(e)}\u00a0kWh</b></div>
        ${n.map((o) => y`<div class="house-panel-row"><i style="background:${o.color}"></i><span>${o.name}</span><b>${st(o.kwh)}\u00a0kWh</b></div>`)}
      </div>`;
  }
  /**
   * A small trend of today by hours (from midnight to midnight) in the row of an appliance (one colour) or of a group (the appliances
   * of the group stacked, a legend names them): when it was cooking, when it was washing. No axis of values, no reading. Without statistics nothing.
   */
  renderDayChart(t) {
    const e = this.t, s = this._houseData.day;
    if (!s || s.status === "error" || !Object.keys(s.parts).length) return C;
    const { n, counter: o, meanKwh: i } = this.houseSeries(s, "day"), r = t.map((x) => ({ ...x, list: x.energy ? o(x.energy) : i(x.power) })).filter((x) => x.list && x.list.some((k) => typeof k == "number"));
    if (!r.length) return C;
    const l = (x, k) => x?.[k] ?? 0;
    let c = 0;
    for (let x = 0; x < n; x++) c = Math.max(c, r.reduce((k, $) => k + l($.list, x), 0));
    const d = 44, h = 42, g = c > 0 ? ae(c) : 0, b = g > 0 ? 36 / g : 0, m = /* @__PURE__ */ new Date();
    m.setHours(0, 0, 0, 0);
    const u = oa({ start: m.getTime(), end: m.getTime() + 24 * tt }), p = I / n, f = p * 0.72, v = Array.from({ length: n }, (x, k) => {
      let $ = 0;
      return r.map((E) => {
        const L = l(E.list, k);
        if (L <= 0) return C;
        const S = Math.max(1.5, L * b), D = h - $ - S;
        return $ += S + 1, Y`<rect x=${(k * p + (p - f) / 2).toFixed(1)} y=${D.toFixed(1)} width=${f.toFixed(1)} height=${S.toFixed(1)} style="fill:${E.color}"></rect>`;
      });
    });
    return y`<div class="house-micro">
        <span class="house-micro-cap">${e.house.chartToday} · kWh</span>
        <svg viewBox="0 0 ${I + Ht} ${d}" role="img" aria-label=${e.house.chartToday}>
          ${u.map((x) => Y`<line x1=${x.x} y1="0" x2=${x.x} y2=${h} style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>`)}
          <line x1="0" y1="6" x2=${I} y2="6" style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>
          <line x1="0" y1=${h} x2=${I} y2=${h} style="stroke:var(--ed-tick);stroke-width:1.5"></line>
          ${v}
          <text x=${I + 9} y="10" style="fill:var(--ed-secondary)" font-size="12">${g > 0 ? j(g, g % 1 ? 1 : 0) : ""}</text>
        </svg>
        <div class="bat-axis ticks" aria-hidden="true">${u.map((x) => y`<span style="left:${(x.x / (I + Ht) * 100).toFixed(1)}%;transform:translateX(${x.x < 8 ? "0" : x.x > I - 8 ? "-100%" : "-50%"})">${x.text}</span>`)}</div>
        ${r.length > 1 ? y`<div class="house-micro-legend">${r.map((x) => y`<span><i style="background:${x.color}"></i>${x.name}</span>`)}</div>` : C}
      </div>`;
  }
  houseChart(t, e) {
    const s = this.t, n = this._houseData[`hist:${e}`];
    if (!n || n.status === "error" || !Object.keys(n.parts).length) return;
    const o = t.entities, { w: i, n: r, counter: l, meanKwh: c } = this.houseSeries(n, e), d = l(o.pv.total_generation), h = l(o.battery.total_discharge), g = l(o.battery.total_charge), b = l(o.grid.total_import), m = l(o.grid.total_export), u = c(o.wallbox.power), p = c(o.boiler.power);
    if (!d && !h && !g && !b && !m) return;
    const f = (B, P) => B?.[P] ?? 0, v = !u || !p, x = Array.from({ length: r }, (B, P) => Math.max(0, f(d, P) + f(h, P) + f(b, P) - f(g, P) - f(m, P) - f(u, P) - f(p, P))), k = (B) => {
      const P = B.filter((lt) => !!lt);
      return P.length ? Array.from({ length: r }, (lt, At) => P.reduce((ht, gt) => ht + (gt[At] ?? 0), 0)) : void 0;
    }, $ = [
      ...this.appliances(t).map((B) => ({ name: this.applianceName(B), list: B.energy ? l(B.energy) : c(B.power) })),
      ...t.groups.map((B) => ({ name: this.pickText(B.name) ?? "", list: k(B.appliances.map((P) => P.energy ? l(P.energy) : c(P.power))) }))
    ].map((B, P) => ({ ...B, color: Zt[P % Zt.length] })).filter((B) => B.list && B.list.some((P) => typeof P == "number")), E = (B) => Math.max(x[B], $.reduce((P, lt) => P + f(lt.list, B), 0));
    let L = 0;
    for (let B = 0; B < r; B++) L = Math.max(L, E(B));
    if (L <= 0) return;
    const S = ae(L), D = 220, M = 200, _ = 180 / S, A = 0, H = Math.min(18, (I - A) / r * 0.72), w = (B) => A + (B + 0.5) / r * (I - A), z = Array.from({ length: r }, (B, P) => {
      let lt = 0;
      const At = $.reduce((gt, se) => gt + f(se.list, P), 0);
      return [...$.map((gt) => ({ value: f(gt.list, P), color: gt.color })), { value: Math.max(0, x[P] - At), color: "#8E8E93" }].map((gt) => {
        if (gt.value <= 0) return C;
        const se = Math.max(0.6, gt.value * _), bs = M - lt - se;
        return lt += se + 1, Y`<rect x=${(w(P) - H / 2).toFixed(1)} y=${bs.toFixed(1)} width=${H.toFixed(1)} height=${se.toFixed(1)} style="fill:${gt.color}"></rect>`;
      });
    }), ot = (B) => {
      const P = i.start + B * i.step;
      return e === "1d" ? `${Xt(P)} ${it(P)}–${it(P + tt)}` : Xt(P);
    }, F = (B) => Math.max(x[B], $.reduce((P, lt) => P + f(lt.list, B), 0)), O = v ? s.house.houseTotal : s.house.sum, Z = (B) => `${ot(B)} · ${O} ${st(F(B))} kWh`, vt = (B) => {
      const P = F(B), lt = $.reduce((ht, gt) => ht + f(gt.list, B), 0), At = $.length ? [...$.map((ht) => ({ name: ht.name, kwh: f(ht.list, B), color: ht.color })).sort((ht, gt) => gt.kwh - ht.kwh), { name: s.house.houseRest, kwh: Math.max(0, P - lt), color: "#8E8E93" }] : [];
      return this.renderReading(ot(B), P, O, At);
    }, xt = [d, h, g, b, m].some((B) => B && B[0] === void 0);
    return {
      id: `house-${e}`,
      h: D,
      // The top line is the value `max` exactly (the bars are drawn on the scale of 180 above the base).
      grid: [{ y: M - 180 }, { y: M, strong: !0 }],
      labels: [{ y: M - 180, text: `${S}` }, { y: M, text: "0" }],
      time: { start: i.start, end: i.start + r * i.step, x0: A, x1: I, slot: i.step },
      valueNum: (B) => (M - B) / 180 * S,
      valueAt: (B) => {
        const P = (M - B) / 180 * S;
        return P % 1 ? st(P) : j(P);
      },
      body: Y`${z}`,
      n: r,
      x: w,
      read: Z,
      from: xt ? s.house.dataFrom(Xt(i.start)) : s.house.axisFrom[e],
      to: s.house.axisTo,
      fade: 0,
      panel: vt
    };
  }
};
function Mo(a, t) {
  return { sources: [...mt], sinks: t.slice().sort((e, s) => ee.indexOf(e) - ee.indexOf(s)) };
}
function Do(a, t = ee, e = mt) {
  const s = Math.round(Math.max(116, Math.min(132, a * 0.377))), n = 56, o = 6, i = Math.max(1, t.length), r = i * n + (i - 1) * o, l = Object.fromEntries(t.map((d, h) => [d, n / 2 + h * (n + o)])), c = Object.fromEntries(
    e.map((d, h) => [d, i < 4 ? n / 2 + h * (n + o) : (h + 0.5) * r / mt.length])
  );
  return { width: a, tile: { w: s, h: n }, gap: o, height: r, left: c, right: l, xa: s - 8, xb: a - s + 8 };
}
const dt = (a) => a.toFixed(1);
function To(a, t, e) {
  const s = a.filter((p) => p.to in t.right);
  if (!s.length) return [];
  const n = (p) => Math.sqrt(p.watts / 1e3), o = (p) => {
    const f = /* @__PURE__ */ new Map();
    for (const v of s) f.set(v[p], (f.get(v[p]) ?? 0) + n(v));
    return f;
  }, i = Math.max(...o("from").values(), ...o("to").values()), r = Math.min(e.maxPxPerKw, 44 / i), l = (p) => Math.max(e.minPx, n(p) * r), c = /* @__PURE__ */ new Map();
  for (const p of mt) {
    const f = s.filter((v) => v.from === p).reduce((v, x) => v + l(x), 0);
    c.set(p, t.left[p] - f / 2);
  }
  const d = /* @__PURE__ */ new Map();
  for (const p of ee.filter((f) => f in t.right)) {
    const f = s.filter((v) => v.to === p).reduce((v, x) => v + l(x), 0);
    d.set(p, t.right[p] - f / 2);
  }
  const h = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map();
  for (const p of mt)
    for (const f of s.filter((v) => v.from === p).sort((v, x) => t.right[v.to] - t.right[x.to]))
      h.set(f, c.get(p)), c.set(p, c.get(p) + l(f));
  for (const p of ee.filter((f) => f in t.right))
    for (const f of s.filter((v) => v.to === p).sort((v, x) => t.left[v.from] - t.left[x.from]))
      g.set(f, d.get(p)), d.set(p, d.get(p) + l(f));
  const { xa: b, xb: m } = t, u = (b + m) / 2;
  return s.map((p) => {
    const f = l(p), v = h.get(p), x = v + f, k = g.get(p), $ = k + f;
    return {
      from: p.from,
      to: p.to,
      watts: p.watts,
      thickness: f,
      d: `M${b} ${dt(v)} C${dt(u)} ${dt(v)} ${dt(u)} ${dt(k)} ${m} ${dt(k)} L${m} ${dt($)} C${dt(u)} ${dt($)} ${dt(u)} ${dt(x)} ${b} ${dt(x)} Z`,
      centre: `M${b} ${dt(v + f / 2)} C${dt(u)} ${dt(v + f / 2)} ${dt(u)} ${dt(k + f / 2)} ${m} ${dt(k + f / 2)}`
    };
  });
}
const at = {
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
}, Fe = 42, Ie = 10, Co = 12, Lo = 34, Ao = (a) => class extends a {
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
    return s.length ? y`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${s.map(
      (n) => y`<li class="alert ${n.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${n.kind === "warn" ? at.alert : at.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${n.title}</span><span class="alert-text">${n.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : C;
  }
  renderElectricity(t, e) {
    const s = e.summarySource ? `var(${Ft[e.summarySource]})` : void 0;
    return y`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(n) => {
      n.stopPropagation(), this.openAll();
    }}>
              ${this.pickText(t.titles.electricity) ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${at.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(e.summary, s)}
        </div>
        ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : C}
        ${this._pop || this._all ? y`<button type="button" class="scrim" aria-label=${this.t.close} @click=${() => this.closePop()}></button>` : C}
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
    const s = this.t, n = t.entities, o = t.num.scale, i = t.num.flows.idle_threshold, r = e.carLink, l = e.soc, c = l !== void 0 && l <= this.batteryReserve(t), d = ($) => l === void 0 ? void 0 : { f: l / 100, active: $, color: c ? "var(--ed-warning)" : "var(--ed-battery)", a1: c ? 0.5 : 0.58 }, h = ($) => `${s.tileSpoken.batteryState($)}, ${l === void 0 ? s.noData : s.tileSpoken.chargeLevel(U(l))}${c ? `, ${s.tileSpoken.atReserve}` : ""}`, g = r === "connected" || r === "charging" || et(e.car, i), b = t.num.water.gauge_min, m = Math.max(t.num.water.gauge_max, W(this.hass, n.boiler.target_temperature) ?? 0), u = e.boilTemp, p = ($) => et($, i), f = e.loadShare.house, v = mt.filter(($) => f[$] >= 0.02), x = p(e.other) && v.length ? this.houseBackground(v, f, Q((e.other ?? 0) / o.house, 0, 1)) : void 0, k = [
      { side: "L", key: "sun", name: s.tile.sun, watts: e.sun, k: (e.sun ?? 0) / o.sun, icon: at.sun, idleIcon: at.moon, idleText: s.idle.sun, aria: e.sun === void 0 ? s.noData : "" },
      { side: "L", key: "bat", name: s.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / o.battery, icon: at.battery, icon2: at.batteryDown, idleIcon: at.pause, idleText: s.idle.bat, level: d(p(e.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: s.tile.grid, watts: e.imp, k: (e.imp ?? 0) / o.grid, icon: at.grid, idleIcon: at.minus, idleText: s.idle.grid, aria: e.imp === void 0 ? s.noData : p(e.imp) ? s.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: s.tile.house, watts: e.other, k: (e.other ?? 0) / o.house, icon: at.home, idleIcon: at.minus, idleText: s.idle.house, background: x, aria: e.other === void 0 ? s.noData : s.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const $ = g && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: p(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      k.push({
        side: "R",
        key: "car",
        name: s.tile.car,
        watts: r === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / o.car,
        icon: at.car,
        idleIcon: r === "disconnected" ? at.minus : at.plug,
        idleText: r === "disconnected" ? s.idle.carDisconnected : r === void 0 ? s.idle.carNoState : s.idle.carConnected,
        level: $,
        aria: [r === void 0 && e.car === void 0 ? s.noData : p(e.car) ? s.tileSpoken.charging : "", g && e.carSoc !== void 0 ? s.tileSpoken.chargeLevel(U(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const $ = u === void 0 ? void 0 : { f: Q((u - b) / (m - b), 0, 1), active: p(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      k.push({
        side: "R",
        key: "boil",
        name: s.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / o.boiler,
        icon: at.therm,
        idleIcon: at.pause,
        idleText: s.idle.boil,
        level: $,
        aria: [u === void 0 ? s.noData : s.tileSpoken.temperature(`${j(u)} °C`), p(e.boil) ? s.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return k.push(
      { side: "R", key: "batIn", name: s.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / o.battery, icon: at.battery, icon2: at.batteryBolt, idleIcon: at.pause, idleText: s.idle.batIn, level: d(p(e.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: s.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / o.grid, icon: at.grid, idleIcon: at.minus, idleText: s.idle.gridOut, aria: e.exp === void 0 ? s.noData : p(e.exp) ? s.tileSpoken.gridExport : "" }
    ), k;
  }
  renderFlow(t, e) {
    const s = t.num.flows.idle_threshold, n = ea(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((h) => et(h, s) ? h : void 0),
      t.num.flows.kw_from
    ), o = this.tiles(t, e), i = Mo(e.flows, o.filter((h) => h.side === "R").map((h) => h.key)), r = Do(this._width, i.sinks, i.sources), l = To(e.flows, r, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), c = (h) => Y`<linearGradient id="rg-${h}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(--band-${h});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(--band-${h});stop-opacity:var(--band-a1)"></stop>
          <stop offset="0.86" style="stop-color:var(--band-${h});stop-opacity:var(--band-a2)"></stop>
          <stop offset="1" style="stop-color:var(--band-${h});stop-opacity:0.2"></stop>
        </linearGradient>`, d = this._pop ? o.find((h) => h.key === this._pop) : void 0;
    return y`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${r.height}px">
        <svg width=${r.width} height=${r.height} viewBox="0 0 ${r.width} ${r.height}" aria-hidden="true">
          <defs>${mt.map(c)}</defs>
          ${l.map((h) => Y`<path d=${h.d} fill="url(#rg-${h.from})"></path>`)}
        </svg>
        ${o.map((h) => this.renderTile(h, r, n, t))} ${d ? this.renderTilePopup(d, r, t, e, n) : C}
      </div>`;
  }
  /** A power "1,37 kW" as the number and a smaller grey unit next to it (uživatel 3. 11. 2026). */
  valueWithUnit(t) {
    const e = /^(.+) (k?W)$/.exec(t);
    return e ? y`${e[1]} <small>${e[2]}</small>` : t;
  }
  houseBackground(t, e, s) {
    const n = t.reduce((c, d) => e[d] > e[c] ? d : c), o = `linear-gradient(${ve(`var(${Ft[n]})`, Math.round(Fe + Ie * s))}, ${ve(`var(${Ft[n]})`, Math.round(Fe + Ie * s))}), var(--ed-tile)`;
    if (t.length === 1) return o;
    const i = t.reduce((c, d) => c + e[d], 0);
    let r = 0;
    const l = [];
    return t.forEach((c, d) => {
      const h = r / i * 100;
      r += e[c];
      const g = r / i * 100, b = `var(${Ft[c]})`, m = d === 0 ? `${h}%` : `calc(${h}% + 1px)`, u = d === t.length - 1 ? `${g}%` : `calc(${g}% - 1px)`;
      d > 0 && l.push(`transparent calc(${h}% - 1px) calc(${h}% + 1px)`), l.push(`${b} ${m} ${u}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${o}`;
  }
  tileBackground(t, e, s) {
    const n = `var(${qt[t.key]})`, o = t.level;
    if (o) {
      const i = Q(o.f, 0, 1), r = `${(i * 100).toFixed(1)}%`, l = t.key === "boil", c = o.active ? ve(o.color, Math.round(o.a1 * 100 + (l ? Co * s : 0))) : "var(--ed-fill-idle)", d = o.active ? na(o.color, Math.round(14 + (l ? Lo * s : 0))) : "var(--ed-tile)";
      return i < 5e-3 ? o.active ? `linear-gradient(${d}, ${d}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${c} 0%, ${c} ${r}, ${d} ${r}, ${d} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const i = ve(n, Math.round(Fe + Ie * s));
      return `linear-gradient(${i}, ${i}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, s, n) {
    const o = t.watts === void 0, i = et(t.watts, n.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], c = Q(t.k, 0, 1), d = o ? T : nt(t.watts, s), h = this.tileBackground(t, i, c), g = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${qt[t.key]});--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%${h ? `;background:${h}` : ""}`;
    return y`<button
        type="button"
        class="tile ${i ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""} ${!i && t.level && t.level.f >= 5e-3 ? "fill" : ""}"
        data-tile=${t.key}
        style=${g}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${i ? d : o ? T : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${i ? t.icon : t.idleIcon}></path>${i && t.icon2 ? Y`<path class="icon2" d=${t.icon2}></path>` : C}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${i ? this.valueWithUnit(d) : o ? T : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
    const e = this._config;
    this._pop === "house" && e && this.freezeHouse(e);
  }
  renderTilePopup(t, e, s, n, o) {
    if (t.key === "bat" || t.key === "batIn") return this.renderBatteryPopup(t, e, s, n, o);
    if (t.key === "sun") return this.renderSunPopup(t, e, s, n, o);
    if (t.key === "house") return this.renderHousePopup(t, e, s, n, o);
    const i = this.t, r = s.num.flows.idle_threshold, l = this.today(s), c = (H) => H === void 0 ? T : `${st(H)} kWh`, d = (H) => H === void 0 ? T : nt(H, o), h = (H) => et(H, r), g = n.soc, b = g !== void 0 && g <= this.batteryReserve(s), m = (H) => ({
      title: H ? i.tile.bat : i.tile.batIn,
      now: H ? h(n.batDis) ? i.pop.discharging(d(n.batDis)) : n.batDis === void 0 && g === void 0 ? T : i.idle.bat : h(n.batIn) ? i.pop.charging(d(n.batIn)) : n.batIn === void 0 && g === void 0 ? T : i.idle.batIn,
      level: g === void 0 ? void 0 : { label: i.pop.level, text: U(g), percent: g, color: b ? "var(--ed-warning)" : "var(--ed-battery)", note: b ? i.pop.atReserve : "" },
      rows: H ? [{ label: i.pop.rows.discharged, value: c(l.bdis) }] : [{ label: i.pop.rows.charged, value: c(l.bchg) }]
    }), u = (H) => ({
      title: H ? i.tile.gridOut : i.tile.grid,
      now: H ? h(n.exp) ? i.pop.exporting(d(n.exp)) : n.exp === void 0 ? T : i.idle.gridOut : h(n.imp) ? i.pop.importing(d(n.imp)) : n.imp === void 0 ? T : i.idle.grid,
      rows: H ? [{ label: i.pop.rows.exported, value: c(l.gout) }] : [{ label: i.pop.rows.imported, value: c(l.gin) }]
    }), p = n.carLink, f = n.boilTemp, v = s.num.water.gauge_min, x = Math.max(s.num.water.gauge_max, W(this.hass, s.entities.boiler.target_temperature) ?? 0), $ = {
      sun: { title: i.tile.sun, now: h(n.sun) ? d(n.sun) : n.sun === void 0 ? T : i.idle.sun, rows: [{ label: i.pop.rows.produced, value: c(l.pv) }] },
      bat: m(!0),
      batIn: m(!1),
      grid: u(!1),
      gridOut: u(!0),
      house: { title: i.tile.house, now: h(n.other) ? d(n.other) : n.other === void 0 ? T : i.idle.house, rows: [{ label: i.pop.rows.consumed, value: c(l.house) }] },
      car: {
        title: i.tile.car,
        now: h(n.car) ? i.pop.charging(d(n.car)) : p === "connected" || p === "charging" ? i.pop.carConnectedIdle : p === "disconnected" ? i.idle.carDisconnected : T,
        level: n.carSoc !== void 0 && (p === "connected" || p === "charging") ? { label: i.pop.level, text: U(n.carSoc), percent: n.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: i.pop.rows.carCharged, value: c(l.car) }]
      },
      boil: {
        title: i.tile.boil,
        now: h(n.boil) ? i.pop.heating(d(n.boil)) : n.boil === void 0 ? T : i.idle.boil,
        level: f === void 0 ? void 0 : { label: i.pop.temperature, text: `${j(f)} °C`, percent: Q((f - v) / (x - v) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: i.pop.rows.boilerHeated, value: c(l.boil) }]
      }
    }[t.key], E = 236, L = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, S = t.side === "L" ? e.left[t.key] : e.right[t.key], D = S - e.tile.h / 2, M = S < e.height / 2, _ = Q(L - E / 2, 0, e.width - E), A = M ? `top:${(D + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - D + 8).toFixed(0)}px`;
    return y`<div class="pop" role="dialog" aria-label=${$.title} tabindex="-1" style="left:${_.toFixed(0)}px;${A};width:${Math.min(E, e.width)}px">
        <i class="arrow ${M ? "up" : "down"}" aria-hidden="true" style="left:${(L - _ - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${$.title}</span><span class="pop-now">${$.now}</span></div>
        ${$.level ? y`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${$.level.label}${$.level.note ? y`<span class="note"> ${$.level.note}</span>` : C}</span>
                <span class="pop-big" style="color:${$.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${$.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${ds($.level.percent).map((H) => y`<span><i style="width:${H.toFixed(0)}%;background:${$.level.color}"></i></span>`)}</div>
            </div>` : C}
        <div class="pop-rows">${$.rows.map((H) => y`<div class="pop-row"><span>${H.label}</span><b>${H.value}</b></div>`)}</div>
      </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const s = this.t, n = this.today(t), o = (g) => g === void 0 ? T : st(g), i = [n.pv, n.bdis, n.gin], r = i.every((g) => g !== void 0) ? i.reduce((g, b) => g + b, 0) : void 0, l = n.house === void 0 ? void 0 : n.house + n.car + n.boil + n.bchg + n.gout, c = [
      { label: s.tile.sun, color: "var(--ed-sun)", value: n.pv },
      { label: s.pop.fromBattery, color: "var(--ed-battery)", value: n.bdis },
      { label: s.pop.fromGrid, color: "var(--ed-grid)", value: n.gin }
    ], d = [
      { label: s.tile.house, color: "var(--ed-house)", value: n.house },
      { label: s.tile.car, color: "var(--ed-car)", value: n.car },
      { label: s.tile.boil, color: "var(--ed-boiler)", value: n.boil },
      { label: s.pop.toBattery, color: "var(--ed-battery)", value: n.bchg },
      { label: s.tile.gridOut, color: "var(--ed-grid)", value: n.gout }
    ], h = (g, b, m) => y`<div role="list" aria-label=${g} class="day-col">
        <div class="day-total"><span>${g}</span><b>${o(b)}</b></div>
        ${m.map((u) => y`<div role="listitem" class="day-item"><i style="background:${u.color}" aria-hidden="true"></i><span>${u.label}</span><b>${o(u.value)}</b></div>`)}
      </div>`;
    return y`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${s.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${h(s.pop.sources, r, c)} ${h(s.pop.consumption, l, d)}</div>
      </div>`;
  }
}, Eo = (a) => class extends a {
  constructor() {
    super(...arguments), this._carGesture = new Qe(() => ({
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
    const s = this.t, n = t.entities, o = t.num.flows, i = t.num.car.charge_limit, r = e.carLink, l = et(e.car, o.idle_threshold) && r !== "disconnected", c = aa(e.loadShare.car, o, s), d = ct(this.hass, n.wallbox.block_charging) === "on", h = this.shown(n.wallbox.boost), g = h === "on" ? `var(${Ft[c.main]})` : this.sourceColor(c), b = ct(this.hass, n.wallbox.prioritize_connected) === "on" && r === "connected" && !d && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let m, u;
    l ? (m = `${s.car.charging(c.text)}${h === "on" ? ` · ${s.boostOptions.on}` : ""}`, u = g) : r === "connected" || r === "charging" ? (m = s.car.connectedIdle, u = b ? "var(--ed-warning)" : void 0) : r === "disconnected" && (m = s.car.disconnected);
    const p = na(u ?? "#d8d8dc", u ? 42 : 28), f = pt(this.hass, n.car.image)?.attributes?.entity_picture, v = e.carSoc, x = ea([et(e.car, o.idle_threshold) ? e.car : void 0], o.kw_from), k = i < 100, $ = s.car.chargeLevel(v === void 0 ? s.noData : U(v), k ? U(i) : void 0), E = n.wallbox, L = h === "on" ? "on" : h === "off" ? "off" : "", S = this.boostOptions, D = h === "on" ? s.car.modeBoost : h === "off" ? s.car.modeSurplus : T;
    return y`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${p}, transparent)"></div><div class="shadow"></div>
            ${typeof f == "string" && f ? y`<img src=${f} alt="" />` : C}
          </div>
          ${t.carLink ? y`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${s.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(M) => M.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? y`<div class="car-hint" aria-hidden="true">${s.hint.holdOrDouble}</div>` : C}` : C}
          <div class="head"><h2 id="h-car">${this.pickText(t.titles.car) ?? s.titles.car}</h2>${this.stateLine(m, u)}</div>
          <div class="car-soc">
            <span class="soc">${v === void 0 ? T : j(v)}<small>${this._i18n.percent("")}</small>${v === void 0 ? y`<span class="sr-only">${s.noData}</span>` : C}</span>
            <span class="range">${s.car.range} <b>${e.carRange === void 0 ? T : `${j(e.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${$}>
            ${ds(Q(v ?? 0, 0, 100)).map((M) => y`<span><i style="width:${M.toFixed(1)}%"></i></span>`)}
            ${k ? y`<div class="limit" style="left:${Aa(i)}"></div>` : C}
          </div>
          ${k ? y`<div class="meter-label" aria-hidden="true"><span style="left:${Aa(i)}">${s.car.limit(U(i))}</span></div>` : C}
        </div>
        ${l ? this.renderCarSources(e, o, nt(e.car ?? 0, x), h === "on") : C}
        ${E.boost ? y`<div class="mode">
              <div class="mode-head"><span id="mode-l">${s.car.mode}</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${D}</span></div>
              <ed-segmented
                guarded .options=${S} .value=${L} label=${s.car.modeLabel} .hint=${s.hint.holdDragOrDouble} ?disabled=${h === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(M) => this.setBoost("wallbox", M.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, h === "on")}
            </div>` : C}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, l, g, x) : C}
      </section>`;
  }
  renderCarSources(t, e, s, n) {
    const o = this.t, i = o.source, r = t.loadShare.car, l = mt.filter((h) => r[h] > 4e-3), c = In(l.map((h) => r[h])), d = (h) => h === "grid" && !n && r.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${Ft[h]})`;
    return y`<div class="mix">
        <div class="mix-head"><span>${o.car.sourcesTitle}</span><span>${s}</span></div>
        <div class="mix-bar" aria-hidden="true">${l.map((h) => y`<div style="flex:${r[h]} 1 0;background:${d(h)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${o.car.sourcesLabel}>
          ${l.map((h, g) => y`<span><i style="background:${d(h)}"></i>${i[h]}<em>${U(c[g])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const s = t.entities.wallbox.charging_power;
    if (!s) return C;
    const { phases: n, power_min: o, power_max: i, power_step: r } = t.num.wallbox, l = pt(this.hass, s), c = W(this.hass, s), d = c === void 0 ? void 0 : c * n / 1e3;
    let h = o / 1e3, g = i / 1e3;
    const b = Ct(l, "min"), m = Ct(l, "max");
    return b !== void 0 && (h = Math.max(h, b * n / 1e3)), m !== void 0 && (g = Math.min(g, m * n / 1e3)), y`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${d === void 0 ? T : j(d, 1)}<small> kW</small></span>
          <ed-slider
            .min=${h} .max=${g} .step=${r / 1e3} .value=${d ?? h}
            label=${this.t.car.powerLabel} valueText=${d === void 0 ? this.t.noData : `${j(d, 1)} kW`}
            minLabel="${j(h, 1)} kW" maxLabel="${j(g, 1)} kW"
            ?disabled=${d === void 0}
            @hdk-change=${(u) => this.setNumber(s, Math.round(u.detail.value * 1e3 / n), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, e, s, n, o) {
    const i = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, c = !!(r.block_charging || r.prioritize_connected), d = e.carLink, h = s ? y`<span>${i.wallbox.charging} </span><b style="--c:${n}">${nt(e.car ?? 0, o)}</b>` : d === "connected" || d === "charging" ? y`${i.wallbox.idle}` : d === "disconnected" ? y`${i.wallbox.disconnected}` : y`${T}`, g = t.entities.car.state_of_charge, b = W(this.hass, g) === void 0 ? void 0 : dn(pt(this.hass, g)?.last_updated, this._now, i), m = this.shown(r.block_charging), u = this.shown(r.prioritize_connected);
    return y`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!c} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${s ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${at.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${i.wallbox.title}</span><span class="row-sub">${h}</span></span>
            <span class="row-aside">${b ? i.wallbox.fromCar(b) : ""}</span>
            ${c ? y`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${at.expand}></path></svg>` : y`<span></span>`}
          </button>
          ${c ? y`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(i.wallbox.block, r.block_charging, m === "on" ? i.wallbox.blockOn : i.wallbox.blockOff, m === "on") : C}
                ${r.prioritize_connected ? this.switchRow(i.wallbox.priority, r.prioritize_connected, u === "on" ? i.wallbox.priorityOn : i.wallbox.priorityOff, !1) : C}
              </div></div>` : C}
        </li>
      </ul>`;
  }
}, xe = 45, It = 46, Oo = 62, Ho = 58;
function We(a, t) {
  let e = 1;
  for (; e < a.length - 1 && t > a[e].temp; ) e++;
  const s = a[e - 1], n = a[e], o = Math.max(0, Math.min(1, (t - s.temp) / (n.temp - s.temp))), i = (c) => [1, 3, 5].map((d) => parseInt(c.slice(d, d + 2), 16)), r = i(s.color), l = i(n.color);
  return `rgb(${[0, 1, 2].map((c) => Math.round(r[c] + (l[c] - r[c]) * o)).join(",")})`;
}
const ce = (a, t) => {
  const e = (135 + 270 * a) * Math.PI / 180;
  return [Oo + t * Math.cos(e), Ho + t * Math.sin(e)];
}, zo = (a, t) => {
  const [e, s] = ce(a, It), [n, o] = ce(t, It);
  return `M${e.toFixed(2)} ${s.toFixed(2)} A${It} ${It} 0 0 1 ${n.toFixed(2)} ${o.toFixed(2)}`;
};
function Bo(a, t, e, s) {
  const n = a === void 0 ? 0 : Math.max(0, Math.min(1, (a - t) / (e - t))), o = "var(--ed-gauge-track)", i = Array.from({ length: xe }, (b, m) => {
    const u = (m + 0.5) / xe, p = a !== void 0 && u <= n ? We(s, t + u * (e - t)) : o;
    return Y`<path d=${zo(m / xe, Math.min(1, (m + 1) / xe + 4e-3))} fill="none" stroke=${p} stroke-width="10"></path>`;
  }), [r, l] = ce(0, It), [c, d] = ce(1, It), [h, g] = ce(n, It);
  return Y`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${i}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${a !== void 0 && n > 0 ? We(s, t) : o}></circle>
    <circle cx=${c.toFixed(1)} cy=${d.toFixed(1)} r="5" fill=${a !== void 0 && n >= 0.99 ? We(s, e) : o}></circle>
    ${a === void 0 ? null : Y`<circle class="knob" cx=${h.toFixed(1)} cy=${g.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const jo = (a) => class extends a {
  renderWater(t, e) {
    const s = this.t, n = t.entities, o = t.num.flows, i = et(e.boil, o.idle_threshold), r = aa(e.loadShare.boil, o, s), l = this.sourceColor(r), d = this.shown(n.boiler.boost) === "on", h = ea([i ? e.boil : void 0], o.kw_from);
    let g;
    return i ? g = `${s.water.boilerHeats(r.text)}${d ? ` · ${s.boostOptions.on}` : ""}` : e.boil !== void 0 && (g = s.water.noHeating), y`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${this.pickText(t.titles.water) ?? s.titles.water}</h2>${this.stateLine(g, i ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, i, l, h)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, s, n, o) {
    return y`<div class="arc" role="img" aria-label=${o}>
        ${Bo(t, e, s, n.tempScale)}
        <div class="arc-num"><b>${t === void 0 ? T : j(t)}</b>${t === void 0 ? y`<span class="sr-only">${this.t.noData}</span>` : y`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${j(e)}</span><span class="arc-max" aria-hidden="true">${j(s)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, s, n, o) {
    const i = this.t, r = t.entities.boiler, l = this.shown(r.boost), c = l === "on", d = W(this.hass, r.target_temperature), h = W(this.hass, r.boost_target_temperature), g = c ? h : d, b = t.num.water.gauge_min, m = Math.max(t.num.water.gauge_max, d ?? 0), u = e.boilTemp, p = !!this._open.targets, f = !!(r.target_temperature || r.boost_target_temperature), v = i.water.boilerLabel(
      u === void 0 ? i.noData : `${j(u)} °C`,
      s ? i.water.heatingWith(nt(e.boil, o)) : i.water.notHeating,
      g === void 0 ? void 0 : `${j(g)} °C`,
      j(b),
      `${j(m)} °C`
    );
    return y`<div class="source">
        <div class="source-top">
          ${this.gauge(u, b, m, t, v)}
          <div class="source-body">
            <div>
              <div class="source-title">${i.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${s ? n : "var(--ed-secondary)"}">${s ? nt(e.boil, o) : e.boil === void 0 ? T : i.water.notHeating}</span>${g === void 0 ? C : y` <span class="dim">· ${i.water.target(`${j(g)} °C`)}</span>`}
              </div>
            </div>
            ${r.boost ? y`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${i.water.boostMode} .hint=${i.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(x) => this.setBoost("boiler", x.detail.value === "on")}
                ></ed-segmented>` : C}
          </div>
        </div>
        ${f ? y`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${p ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${i.water.targets}</span>
                <span class="rowbtn-value">${i.water.targetFlow} <b>${d === void 0 ? T : j(d)}</b> · ${i.water.targetBoost} <b>${h === void 0 ? T : `${j(h)} °C`}</b></span>
                <svg class="chevron ${p ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${at.expand}></path></svg>
              </button>
              <div class="fold ${p ? "open" : ""}" ?inert=${!p}><div>${this.renderTargets(t, d, h)}</div></div>
            </div>` : C}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, s) {
    const n = this.t, o = t.entities.boiler, i = t.num.boiler, r = (l, c, d, h, g, b) => {
      if (!l) return C;
      const m = pt(this.hass, l);
      let u = i.target_min, p = i.target_max;
      const f = Ct(m, "min"), v = Ct(m, "max");
      return f !== void 0 && (u = Math.max(u, f)), v !== void 0 && (p = Math.min(p, v)), g !== void 0 && (u = Math.max(u, g)), b !== void 0 && (p = Math.min(p, b)), y`<div class="field">
          <span class="field-label">${d}<span class="hint">${h}</span></span><span class="field-value">${c === void 0 ? T : j(c)}<small> °C</small></span>
          <ed-slider
            .min=${u} .max=${p} .step=${i.target_step} .value=${c ?? u}
            label=${n.water.targetSliderLabel(d)} valueText=${c === void 0 ? n.noData : n.water.targetSliderSpoken(`${c} °C`, d)}
            minLabel="${j(u)} °C" maxLabel="${j(p)} °C"
            ?disabled=${c === void 0}
            @hdk-change=${(x) => this.setNumber(l, x.detail.value, n.water.targetWhat(d))}
          ></ed-slider>
        </div>`;
    };
    return y`<div class="detail">
        ${r(o.target_temperature, e, n.water.targetFlow, n.water.targetFlowHint, s, void 0)}
        ${r(o.boost_target_temperature, s, n.water.targetBoost, n.water.targetBoostHint, void 0, e)}
        <p class="hint">${n.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return C;
    const s = pn(this.shown(e.valve_c1), this.shown(e.valve_c2)), n = s === "on", o = !!(e.valve_c1 && e.valve_c2), i = s === "unclear" ? this.t.water.mixingUnclear : s === void 0 ? this.t.noData : "";
    return y`
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${n ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${n ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${n ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${i ? y`<span class="mixcap-note">${i}</span>` : C}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${n} ?disabled=${s === void 0 || !o}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, s = t.entities.tank, n = t.num.tank, o = s.water_heater, i = pt(this.hass, o), r = this.shown(o), l = r === "off", c = r === "heat", d = Ct(i, "temperature"), h = this._tankTemp, g = h && h.id === o ? h.value : d, b = t.num.water.gauge_min, m = Math.max(t.num.water.gauge_max, W(this.hass, t.entities.boiler.target_temperature) ?? 0), u = l ? n.temp_min : g, p = Array.isArray(i?.attributes?.operation_list) ? i.attributes.operation_list : Object.keys(e.tank.modes), f = Object.keys(e.tank.modes).filter((D) => p.includes(D)).map((D) => ({ value: D, label: e.tank.modes[D] })), v = !!this._open.tank, { min: x, max: k } = this.tankRange(t), $ = r === void 0 ? T : e.tank.modes[r] ?? r, E = l ? e.tank.keepsMinimum : c ? e.tank.setManually : e.tank.byPlan, L = u === void 0 ? T : l ? e.tank.summaryOff(`${j(n.temp_min)} °C`) : (c ? e.tank.summaryManual : e.tank.summaryPlan)(`${j(u)} °C`), S = e.tank.label(
      u === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${j(n.temp_min)} °C`) : e.tank.settingSet(`${j(u)} °C`),
      $,
      j(b),
      `${j(m)} °C`
    );
    return y`<div class="source">
        <div class="source-top">
          ${this.gauge(u, b, m, t, S)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${c ? "var(--ed-text)" : "var(--ed-secondary)"}">${$}</span>${r === void 0 ? C : y` <span class="dim">· ${E}</span>`}</div>
            </div>
            ${o ? y`<ed-segmented compact .options=${f} .value=${r ?? ""} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(D) => this.setTank(o, D.detail.value)}></ed-segmented>` : C}
          </div>
        </div>
        ${o ? y`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${v ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${L}</span>
                <svg class="chevron ${v ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${at.expand}></path></svg>
              </button>
              <div class="fold ${v ? "open" : ""}" ?inert=${!v}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : c ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${u === void 0 ? T : j(u)}<small> °C</small></span>
                    <ed-slider
                      .min=${x} .max=${k} .step=${n.temp_step} .tickStep=${5} .value=${u ?? x}
                      label=${e.tank.sliderLabel} valueText=${g === void 0 ? e.noData : e.tank.sliderSpoken(`${g} °C`)}
                      minLabel="${j(x)} °C" maxLabel="${j(k)} °C"
                      ?disabled=${g === void 0 || l}
                      @hdk-change=${(D) => this.setTankTemperature(o, D.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : C}
      </div>`;
  }
}, da = class da extends jo(Eo(Ao(So(mo(to(Un(X))))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return C;
    const e = cn(this.hass, t, this.t), s = t.colors, n = `--ed-sun:${s.sun};--ed-battery:${s.battery};--ed-grid:${s.grid};--ed-house:${s.house};--ed-car:${s.car};--ed-boiler:${s.boiler};--ed-discharge:${s.discharge};--ed-accent:${s.accent};--ed-warning:${s.warning};--ed-off:${s.neutral}`;
    return this._batDetail ? y`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderBatteryDetail(t, e)}</div>` : this._houseDetail ? y`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderHouseDetail(t, e)}</div>` : this._sunDetail ? y`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderSunDetail(t, e)}</div>` : y`<div class="page" style=${n} @keydown=${this.onKey}>
      ${t.title === "" ? C : y`<h1>${this.pickText(t.title) ?? this.t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
da.styles = un;
let Ge = da;
Is("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", Ge);
window.customCards = window.customCards ?? [];
window.customCards.some((a) => a.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: De(Ks()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.1.0 · 2026-11-04 19:29 UTC · po 9461126 ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
