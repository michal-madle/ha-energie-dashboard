const Le = globalThis, ea = Le.ShadowRoot && (Le.ShadyCSS === void 0 || Le.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, aa = /* @__PURE__ */ Symbol(), $a = /* @__PURE__ */ new WeakMap();
let as = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== aa) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ea && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = $a.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && $a.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Es = (a) => new as(typeof a == "string" ? a : a + "", void 0, aa), de = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((s, n, o) => s + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + a[o + 1], a[0]);
  return new as(e, a, aa);
}, Os = (a, t) => {
  if (ea) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), n = Le.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = e.cssText, a.appendChild(s);
  }
}, wa = ea ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Es(e);
})(a) : a;
const { is: zs, defineProperty: Hs, getOwnPropertyDescriptor: Bs, getOwnPropertyNames: js, getOwnPropertySymbols: Ps, getPrototypeOf: Rs } = Object, Fe = globalThis, xa = Fe.trustedTypes, Ns = xa ? xa.emptyScript : "", Is = Fe.reactiveElementPolyfillSupport, be = (a, t) => a, Oe = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? Ns : null;
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
} }, sa = (a, t) => !zs(a, t), ka = { attribute: !0, type: String, converter: Oe, reflect: !1, useDefault: !1, hasChanged: sa };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Fe.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let te = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ka) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), n = this.getPropertyDescriptor(t, s, e);
      n !== void 0 && Hs(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: n, set: o } = Bs(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? ka;
  }
  static _$Ei() {
    if (this.hasOwnProperty(be("elementProperties"))) return;
    const t = Rs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(be("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(be("properties"))) {
      const e = this.properties, s = [...js(e), ...Ps(e)];
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
      for (const n of s) e.unshift(wa(n));
    } else t !== void 0 && e.push(wa(t));
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
    return Os(t, this.constructor.elementStyles), t;
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
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : Oe).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const o = s.getPropertyOptions(n), i = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Oe;
      this._$Em = n;
      const r = i.fromAttribute(e, o.type);
      this[n] = r ?? this._$Ej?.get(n) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, n = !1, o) {
    if (t !== void 0) {
      const i = this.constructor;
      if (n === !1 && (o = this[t]), s ??= i.getPropertyOptions(t), !((s.hasChanged ?? sa)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, s)))) return;
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
te.elementStyles = [], te.shadowRootOptions = { mode: "open" }, te[be("elementProperties")] = /* @__PURE__ */ new Map(), te[be("finalized")] = /* @__PURE__ */ new Map(), Is?.({ ReactiveElement: te }), (Fe.reactiveElementVersions ??= []).push("2.1.2");
const na = globalThis, _a = (a) => a, ze = na.trustedTypes, Sa = ze ? ze.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, ss = "$lit$", Pt = `lit$${Math.random().toFixed(9).slice(2)}$`, ns = "?" + Pt, Fs = `<${ns}>`, Zt = document, ve = () => Zt.createComment(""), ye = (a) => a === null || typeof a != "object" && typeof a != "function", oa = Array.isArray, Ws = (a) => oa(a) || typeof a?.[Symbol.iterator] == "function", Ve = `[ 	
\f\r]`, pe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ma = /-->/g, Ta = />/g, It = RegExp(`>|${Ve}(?:([^\\s"'>=/]+)(${Ve}*=${Ve}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Da = /'/g, Ca = /"/g, os = /^(?:script|style|textarea|title)$/i, is = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), y = is(1), Y = is(2), oe = /* @__PURE__ */ Symbol.for("lit-noChange"), T = /* @__PURE__ */ Symbol.for("lit-nothing"), La = /* @__PURE__ */ new WeakMap(), Wt = Zt.createTreeWalker(Zt, 129);
function rs(a, t) {
  if (!oa(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Sa !== void 0 ? Sa.createHTML(t) : t;
}
const Us = (a, t) => {
  const e = a.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", i = pe;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let h, c, d = -1, u = 0;
    for (; u < l.length && (i.lastIndex = u, c = i.exec(l), c !== null); ) u = i.lastIndex, i === pe ? c[1] === "!--" ? i = Ma : c[1] !== void 0 ? i = Ta : c[2] !== void 0 ? (os.test(c[2]) && (n = RegExp("</" + c[2], "g")), i = It) : c[3] !== void 0 && (i = It) : i === It ? c[0] === ">" ? (i = n ?? pe, d = -1) : c[1] === void 0 ? d = -2 : (d = i.lastIndex - c[2].length, h = c[1], i = c[3] === void 0 ? It : c[3] === '"' ? Ca : Da) : i === Ca || i === Da ? i = It : i === Ma || i === Ta ? i = pe : (i = It, n = void 0);
    const b = i === It && a[r + 1].startsWith("/>") ? " " : "";
    o += i === pe ? l + Fs : d >= 0 ? (s.push(h), l.slice(0, d) + ss + l.slice(d) + Pt + b) : l + Pt + (d === -2 ? r : b);
  }
  return [rs(a, o + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class $e {
  constructor({ strings: t, _$litType$: e }, s) {
    let n;
    this.parts = [];
    let o = 0, i = 0;
    const r = t.length - 1, l = this.parts, [h, c] = Us(t, e);
    if (this.el = $e.createElement(h, s), Wt.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Wt.nextNode()) !== null && l.length < r; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(ss)) {
          const u = c[i++], b = n.getAttribute(d).split(Pt), v = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: v[2], strings: b, ctor: v[1] === "." ? Gs : v[1] === "?" ? Ks : v[1] === "@" ? Zs : We }), n.removeAttribute(d);
        } else d.startsWith(Pt) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (os.test(n.tagName)) {
          const d = n.textContent.split(Pt), u = d.length - 1;
          if (u > 0) {
            n.textContent = ze ? ze.emptyScript : "";
            for (let b = 0; b < u; b++) n.append(d[b], ve()), Wt.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[u], ve());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ns) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(Pt, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += Pt.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = Zt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function ie(a, t, e = a, s) {
  if (t === oe) return t;
  let n = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = ye(t) ? void 0 : t._$litDirective$;
  return n?.constructor !== o && (n?._$AO?.(!1), o === void 0 ? n = void 0 : (n = new o(a), n._$AT(a, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = n : e._$Cl = n), n !== void 0 && (t = ie(a, n._$AS(a, t.values), n, s)), t;
}
class Vs {
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
    const { el: { content: e }, parts: s } = this._$AD, n = (t?.creationScope ?? Zt).importNode(e, !0);
    Wt.currentNode = n;
    let o = Wt.nextNode(), i = 0, r = 0, l = s[0];
    for (; l !== void 0; ) {
      if (i === l.index) {
        let h;
        l.type === 2 ? h = new xe(o, o.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (h = new Ys(o, this, t)), this._$AV.push(h), l = s[++r];
      }
      i !== l?.index && (o = Wt.nextNode(), i++);
    }
    return Wt.currentNode = Zt, n;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class xe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, n) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    t = ie(this, t, e), ye(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== oe && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ws(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && ye(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Zt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = $e.createElement(rs(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === n) this._$AH.p(e);
    else {
      const o = new Vs(n, this), i = o.u(this.options);
      o.p(e), this.T(i), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = La.get(t.strings);
    return e === void 0 && La.set(t.strings, e = new $e(t)), e;
  }
  k(t) {
    oa(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, n = 0;
    for (const o of t) n === e.length ? e.push(s = new xe(this.O(ve()), this.O(ve()), this, this.options)) : s = e[n], s._$AI(o), n++;
    n < e.length && (this._$AR(s && s._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = _a(t).nextSibling;
      _a(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class We {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, n, o) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = T;
  }
  _$AI(t, e = this, s, n) {
    const o = this.strings;
    let i = !1;
    if (o === void 0) t = ie(this, t, e, 0), i = !ye(t) || t !== this._$AH && t !== oe, i && (this._$AH = t);
    else {
      const r = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++) h = ie(this, r[s + l], e, l), h === oe && (h = this._$AH[l]), i ||= !ye(h) || h !== this._$AH[l], h === T ? t = T : t !== T && (t += (h ?? "") + o[l + 1]), this._$AH[l] = h;
    }
    i && !n && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Gs extends We {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class Ks extends We {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class Zs extends We {
  constructor(t, e, s, n, o) {
    super(t, e, s, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = ie(this, t, e, 0) ?? T) === oe) return;
    const s = this._$AH, n = t === T && s !== T || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== T && (s === T || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ys {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ie(this, t);
  }
}
const Xs = na.litHtmlPolyfillSupport;
Xs?.($e, xe), (na.litHtmlVersions ??= []).push("3.3.3");
const qs = (a, t, e) => {
  const s = e?.renderBefore ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = n = new xe(t.insertBefore(ve(), o), o, void 0, e ?? {});
  }
  return n._$AI(a), n;
};
const ia = globalThis;
class Ot extends te {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qs(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return oe;
  }
}
Ot._$litElement$ = !0, Ot.finalized = !0, ia.litElementHydrateSupport?.({ LitElement: Ot });
const Js = ia.litElementPolyfillSupport;
Js?.({ LitElement: Ot });
(ia.litElementVersions ??= []).push("4.2.2");
const Qs = { attribute: !0, type: String, converter: Oe, reflect: !1, hasChanged: sa }, tn = (a = Qs, t, e) => {
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
function W(a) {
  return (t, e) => typeof e == "object" ? tn(a, t, e) : ((s, n, o) => {
    const i = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), i ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(a, t, e);
}
function X(a) {
  return W({ ...a, state: !0, attribute: !1 });
}
var en = Object.defineProperty, ce = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && en(t, e, n), n;
};
const ga = class ga extends Ot {
  constructor() {
    super(...arguments), this.fraction = 0, this.size = 40, this.stroke = 6, this.num = "", this.unit = "", this.label = "";
  }
  render() {
    const { size: t, stroke: e } = this, s = (t - e) / 2, n = 2 * Math.PI * s, o = Math.min(1, Math.max(0, Number.isFinite(this.fraction) ? this.fraction : 0)), i = t / 2;
    return y`<div class="ring" style="width:${t}px;height:${t}px" role="img" aria-label=${this.label}>
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
      ${this.num ? y`<span class="num ${this.unit ? "with-unit" : ""}" style="font-size:${Math.round(t * (t <= 44 ? 0.3 : 0.27))}px">${this.num}</span>${this.unit ? y`<span class="unit">${this.unit}</span>` : T}` : T}
    </div>`;
  }
};
ga.styles = de`
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
let Ht = ga;
ce([
  W({ type: Number })
], Ht.prototype, "fraction");
ce([
  W({ type: Number })
], Ht.prototype, "size");
ce([
  W({ type: Number })
], Ht.prototype, "stroke");
ce([
  W()
], Ht.prototype, "num");
ce([
  W()
], Ht.prototype, "unit");
ce([
  W()
], Ht.prototype, "label");
class ra {
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
class ls {
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
const ds = de`
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
var an = Object.defineProperty, xt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && an(t, e, n), n;
};
const ba = class ba extends Ot {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new ls(this), this.nudgeIndex = 0, this.gesture = new ra(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
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
            @click=${(h) => this.onClick(h, r.value, l)}
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
ba.styles = [
  ds,
  de`
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
let ut = ba;
xt([
  W({ attribute: !1 })
], ut.prototype, "options");
xt([
  W()
], ut.prototype, "value");
xt([
  W()
], ut.prototype, "label");
xt([
  W({ type: Boolean })
], ut.prototype, "disabled");
xt([
  W({ type: Boolean })
], ut.prototype, "compact");
xt([
  W({ type: Boolean })
], ut.prototype, "guarded");
xt([
  W({ type: Number })
], ut.prototype, "holdMs");
xt([
  W({ type: Number })
], ut.prototype, "doubleTapMs");
xt([
  W({ type: Number })
], ut.prototype, "hintSeconds");
xt([
  W()
], ut.prototype, "hint");
xt([
  X()
], ut.prototype, "_dx");
xt([
  X()
], ut.prototype, "_dragging");
var sn = Object.defineProperty, Mt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && sn(t, e, n), n;
};
const fa = class fa extends Ot {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, n = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, o = this.tickStep || this.step || 1, i = Math.floor(e / o + 1e-9) + 1, r = i >= 2 && i <= 40 ? Array.from({ length: i }, (l, h) => y`<i style="left:${(h * o / e * 100).toFixed(2)}%"></i>`) : [];
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
fa.styles = de`
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
let bt = fa;
Mt([
  W({ type: Number })
], bt.prototype, "min");
Mt([
  W({ type: Number })
], bt.prototype, "max");
Mt([
  W({ type: Number })
], bt.prototype, "step");
Mt([
  W({ type: Number })
], bt.prototype, "tickStep");
Mt([
  W({ type: Number })
], bt.prototype, "value");
Mt([
  W()
], bt.prototype, "label");
Mt([
  W()
], bt.prototype, "valueText");
Mt([
  W()
], bt.prototype, "minLabel");
Mt([
  W()
], bt.prototype, "maxLabel");
Mt([
  W({ type: Boolean })
], bt.prototype, "disabled");
Mt([
  X()
], bt.prototype, "_drag");
var nn = Object.defineProperty, Bt = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && nn(t, e, n), n;
};
const ma = class ma extends Ot {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new ls(this), this.gesture = new ra(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
ma.styles = [
  ds,
  de`
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
let wt = ma;
Bt([
  W({ type: Boolean })
], wt.prototype, "checked");
Bt([
  W({ type: Boolean })
], wt.prototype, "disabled");
Bt([
  W()
], wt.prototype, "label");
Bt([
  W({ type: Boolean })
], wt.prototype, "guarded");
Bt([
  W({ type: Number })
], wt.prototype, "holdMs");
Bt([
  W({ type: Number })
], wt.prototype, "doubleTapMs");
Bt([
  W({ type: Number })
], wt.prototype, "hintSeconds");
Bt([
  W()
], wt.prototype, "hintPlacement");
Bt([
  W()
], wt.prototype, "hint");
function on(a) {
  const t = [
    [`${a}-switch`, wt],
    [`${a}-segmented`, ut],
    [`${a}-slider`, bt],
    [`${a}-ring`, Ht]
  ];
  for (const [e, s] of t)
    customElements.get(e) || customElements.define(e, s);
}
const rn = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function ln(a) {
  return rn.has(a);
}
function pt(a, t) {
  return t ? a?.states?.[t] : void 0;
}
function ct(a, t) {
  const e = pt(a, t)?.state;
  return e === void 0 || ln(e) ? void 0 : e;
}
function dn(a, t) {
  const e = ct(a, t);
  if (e === void 0)
    return;
  const s = Number(e);
  return Number.isFinite(s) ? s : void 0;
}
function cs(a) {
  return (a?.locale?.language || a?.language || "").trim();
}
function la(a) {
  const t = a.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function cn(a, t) {
  return a === "auto" ? la(cs(t)) : a;
}
function hn() {
  return la(document.documentElement.lang || navigator.language || "");
}
const Aa = /* @__PURE__ */ new WeakMap(), pn = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, un = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), gn = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Ge(a, t) {
  const e = a?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function bn(a, t, e) {
  const s = cs(e).replace("_", "-"), n = s !== "" && la(s) === t ? s : pn[t], o = Ge(e, "number_format"), i = Ge(e, "time_format"), r = Ge(e, "date_format"), l = [t, n, o, i, r].join("|");
  let h = Aa.get(a);
  h || (h = /* @__PURE__ */ new Map(), Aa.set(a, h));
  let c = h.get(l);
  return c || (c = vn(a[t], t, n, o, i, r), h.set(l, c)), c;
}
function fn(a) {
  try {
    return new Intl.NumberFormat(a), a;
  } catch {
    return "en";
  }
}
function mn(a, t) {
  if (a === "12")
    return !0;
  if (a === "24")
    return !1;
  const e = a === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function vn(a, t, e, s, n, o) {
  const i = fn(e), r = s === "system" ? void 0 : s === "none" ? "en-US" : gn[s] ?? i, l = s === "none" ? { useGrouping: !1 } : {}, h = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), d = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), u = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), b = mn(n, i), v = b ? "h12" : "h23", m = new Intl.DateTimeFormat(i, { hour: b ? "numeric" : "2-digit", minute: "2-digit", hourCycle: v }), p = new Intl.DateTimeFormat(i, b ? { hour: "numeric", hourCycle: v } : { hour: "2-digit", minute: "2-digit", hourCycle: v }), g = o === "system" ? void 0 : i, f = new Intl.DateTimeFormat(g, { day: "numeric", month: "numeric" }), $ = (w) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return f.format(w);
    const L = f.formatToParts(w), A = L.find((E) => E.type === "literal")?.value ?? "/", S = L[L.length - 1], M = S?.type === "literal" ? S.value : "", C = L.find((E) => E.type === "day")?.value ?? "", x = L.find((E) => E.type === "month")?.value ?? "";
    return o === "DMY" ? `${C}${A}${x}${M}` : `${x}${A}${C}${M}`;
  }, _ = un.has(i.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: i,
    t: a,
    one: (w) => h.format(w),
    two: (w) => c.format(w),
    half: (w) => d.format(Math.round(w * 2) / 2),
    tick: (w) => d.format(w),
    whole: (w) => u.format(w),
    percent: (w) => `${w}${_}%`,
    time: (w) => m.format(w),
    hour: (w) => p.format(w),
    day: $
  };
}
const yn = {
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
}, $n = {
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
}, wn = {
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
}, xn = { cs: yn, en: $n, sv: wn };
function He(a, t) {
  return bn(xn, a, t);
}
function F(a, t) {
  const e = dn(a, t);
  if (e !== void 0)
    return pt(a, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let rt = He("cs"), Be = "auto";
function kn(a, t = "auto") {
  rt = a, Be = t;
}
function da(a, t = 1e3) {
  return a.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function hs(a) {
  const t = Be === "auto" ? Math.abs(Math.round(a * 100) / 100) < 10 ? 2 : Math.abs(Math.round(a * 10) / 10) < 100 ? 1 : 0 : Be;
  return t === 2 ? rt.two(a) : t === 1 ? rt.one(a) : rt.whole(a);
}
function nt(a, t) {
  return t === "kW" ? `${hs(a / 1e3)} kW` : `${rt.whole(Math.round(a))} W`;
}
function j(a, t = 0) {
  return t === 0 ? rt.whole(a) : rt.one(a);
}
function Z(a, t) {
  if (t === 0) return rt.whole(a);
  if (t === 1) return rt.one(a);
  if (t === 2) return rt.two(a);
  const e = rt.one(1.5).charAt(1), s = 10 ** t, n = Math.round(Math.abs(a) * s);
  return `${a < 0 && n > 0 ? "−" : ""}${rt.whole(Math.floor(n / s))}${e}${String(n % s).padStart(t, "0")}`;
}
function fe(a) {
  return `${new Intl.DateTimeFormat(rt.locale, { weekday: "short" }).format(a)} ${rt.day(a)}`;
}
function _n(a) {
  return new Intl.DateTimeFormat(rt.locale, { weekday: "short" }).format(a);
}
function Sn(a) {
  return rt.day(a);
}
function ee(a) {
  const t = new Intl.DateTimeFormat(rt.locale, { weekday: "long" }).format(a);
  return t.charAt(0).toLocaleUpperCase(rt.locale) + t.slice(1);
}
function it(a) {
  return rt.time(a);
}
function K(a) {
  return rt.percent(typeof a == "number" ? j(a) : a);
}
function Gt(a, t) {
  const e = pt(a, t), s = ct(a, t);
  if (s === void 0) return;
  const n = Number(s);
  if (!Number.isFinite(n)) return;
  const o = e?.attributes?.unit_of_measurement;
  return o === "Wh" ? n / 1e3 : o === "MWh" ? n * 1e3 : n;
}
function st(a) {
  return a < (Be === 1 ? 0.05 : 5e-3) ? "0" : hs(a);
}
function Mn(a, t, e) {
  const s = a ? Date.parse(a) : NaN;
  if (!Number.isFinite(s)) return;
  const n = Math.max(0, Math.round((t - s) / 6e4));
  return n < 1 ? e.ago.now : n < 60 ? e.ago.minutes(n) : n < 1440 ? e.ago.hours(Math.round(n / 60)) : e.ago.days(Math.round(n / 1440));
}
const vt = ["sun", "bat", "grid"], re = ["house", "car", "boil", "batIn", "gridOut"], _e = (a) => a === void 0 ? void 0 : Math.max(0, a), tt = (a, t) => a !== void 0 && a >= t;
function ps(a) {
  if (a === "Disconnected") return "disconnected";
  if (a === "Waiting") return "connected";
  if (a === "Charging") return "charging";
}
function Tn(a, t, e) {
  const s = t.entities, n = t.num.flows.idle_threshold, o = _e(F(a, s.pv.power)), i = F(a, s.battery.power), r = F(a, s.grid.power), l = _e(F(a, s.house.power)), h = _e(F(a, s.wallbox.power)), c = _e(F(a, s.boiler.power)), d = i === void 0 ? void 0 : Math.max(0, i), u = i === void 0 ? void 0 : Math.max(0, -i), b = r === void 0 ? void 0 : Math.max(0, -r), v = r === void 0 ? void 0 : Math.max(0, r), m = l === void 0 ? void 0 : Math.max(0, l - (h ?? 0) - (c ?? 0)), p = (C) => tt(C, n) ? C : 0, g = {
    sun: Math.max(0, p(o) - p(u) - p(v)),
    bat: p(d),
    grid: p(b)
  }, f = g.sun + g.bat + g.grid, $ = { sun: 0, bat: 0, grid: 0 };
  if (f > 0)
    for (const C of vt) $[C] = g[C] / f;
  const _ = [], w = { house: { ...$ }, car: { ...$ }, boil: { ...$ } }, L = [
    ["house", m],
    ["car", h],
    ["boil", c]
  ], A = L.reduce((C, [, x]) => C + (tt(x, n) ? x : 0), 0), S = { sun: 0, bat: 0, grid: 0 };
  for (const C of vt) S[C] = f > 0 ? g[C] * A / f : 0;
  for (const [C, x] of L) {
    if (!tt(x, n)) continue;
    let E = x;
    const z = { sun: 0, bat: 0, grid: 0 };
    for (const k of vt) {
      const H = Math.min(S[k], E);
      S[k] -= H, E -= H, z[k] = H / x, H > 0.5 && _.push({ from: k, to: C, watts: H });
    }
    z.sun + z.bat + z.grid > 0 && (w[C] = z);
  }
  tt(u, n) && _.push({ from: "sun", to: "batIn", watts: u }), tt(v, n) && _.push({ from: "sun", to: "gridOut", watts: v });
  const M = {
    sun: o,
    batDis: d,
    batIn: u,
    imp: b,
    exp: v,
    other: m,
    car: h,
    boil: c,
    share: $,
    loadShare: w,
    flows: _,
    soc: F(a, s.battery.state_of_charge),
    carSoc: F(a, s.car.state_of_charge),
    carRange: F(a, s.car.range),
    boilTemp: F(a, s.boiler.temperature),
    carLink: ps(ct(a, s.wallbox.status))
  };
  return Object.assign(M, Dn(M, t.num.flows, e)), M;
}
function Dn(a, t, e) {
  const s = t.idle_threshold, n = (m) => tt(m, s);
  if ([a.sun, a.batDis, a.imp, a.other].every((m) => m === void 0)) return {};
  if (n(a.sun) && !n(a.imp) && !n(a.batDis)) {
    let m;
    return (a.exp ?? 0) > t.export_notice && !n(a.batIn) ? m = e.summary.exportSurplus : n(a.car) ? m = e.summary.sunChargesCar(n(a.batIn)) : n(a.batIn) ? m = e.summary.sunChargesBattery : m = e.summary.sunCoversHouse, { summary: m, summarySource: "sun" };
  }
  const r = [["house", a.other], ["car", a.car], ["boil", a.boil]].filter(([, m]) => n(m)).map(([m, p]) => [m, p]), l = r.reduce((m, [, p]) => m + p, 0), h = r.filter(([, m]) => m >= t.source_min_share / 100 * l).sort((m, p) => p[1] - m[1]);
  if (h.length && !(h.length === 1 && h[0][0] === "house")) {
    const m = h.reduce((f, [, $]) => f + $, 0), p = { sun: 0, bat: 0, grid: 0 };
    for (const [f, $] of h) for (const _ of vt) p[_] += a.loadShare[f][_] * $ / m;
    const g = ca(p, t, e);
    return { summary: e.summary.loadsTake(h.map(([f]) => f), g.text), summarySource: g.main };
  }
  const { sun: c, bat: d, grid: u } = a.loadShare.house;
  if (u > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const b = t.source_min_share / 100;
  if (c < b && u < b && d > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const v = gs(a.loadShare.house, b);
  return v.length ? { summary: e.summary.houseTakes(us(v, e)), summarySource: v[0] } : { summary: e.summary.nothing };
}
function us(a, t) {
  return t.from[a[0]] + a.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function gs(a, t) {
  return vt.filter((e) => a[e] >= t).sort((e, s) => a[s] - a[e]);
}
function ca(a, t, e) {
  let s = gs(a, t.source_min_share / 100);
  s.length || (s = ["sun"]);
  const n = a.grid > t.grid_deviation_share / 100;
  return { text: us(s, e), main: n ? "grid" : s[0], deviation: n };
}
function Cn(a, t) {
  if (!(a === void 0 || t === void 0))
    return a === "off" && t === "on" ? "on" : a === "on" && t === "off" ? "off" : "unclear";
}
const Ln = de`
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
  .house-app .ell { color: var(--ed-pop-sec); font-size: 15px; line-height: 20px; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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

  .bat-detail ed-segmented { --hdk-track: var(--ed-track-page); }

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
`, An = ["cs", "en", "sv"];
class bs extends Error {
}
function V(a) {
  throw new bs(a);
}
function En(a, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof bs ? new Error(`${a}: ${e.message}`) : e;
  }
}
function Yt(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function ft(a, t) {
  return a == null ? {} : (Yt(a) || V(`"${t}" must be a mapping of keys.`), a);
}
function Nt(a, t, e) {
  for (const s of Object.keys(a))
    t.includes(s) || V(`${e}: unknown key "${s}" (allowed: ${t.join(", ")}).`);
}
function Kt(a, t, e = {}) {
  if (a == null)
    return;
  const s = typeof a == "string" ? a.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(s) || V(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !s.startsWith(`${e.domain}.`) && V(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${s}.`), s;
}
function we(a, t) {
  if (a != null) {
    if (typeof a == "string" && a.trim())
      return a.trim();
    if (Yt(a) && Object.keys(a).length > 0) {
      const e = Object.entries(a);
      if (e.every(([s, n]) => /^[a-z]{2}(-[A-Za-z]+)?$/.test(s) && typeof n == "string" && n.trim()))
        return Object.fromEntries(e.map(([s, n]) => [s, n.trim()]));
    }
    return V(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
  }
}
function On(a, t) {
  if (a === void 0 || typeof a == "string")
    return a;
  const e = t.toLowerCase();
  return a[e] ?? a[e.split("-")[0]] ?? a.en ?? Object.values(a)[0];
}
function Ea(a) {
  return a === void 0 ? [] : typeof a == "string" ? [a] : Object.values(a);
}
const Oa = ["auto", ...An];
function zn(a) {
  const t = a ?? "auto";
  return Oa.includes(t) || V(`language must be one of ${Oa.join(", ")}.`), t;
}
const Ue = {
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
}, fs = { house: ["label", "default_range", "appliances", "groups"], boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"], forecast: ["default_range"] }, je = ["1d", "7d", "30d"], ms = "1d", Hn = "appliances", za = ["7d", "30d"], Bn = "7d", Ha = ["always", "heating"], jn = "heating", Ba = ["auto", 1, 2], Pn = "auto", vs = Object.keys(Ue), N = (a, t, e, s, n = !1) => ({ value: a, min: t, max: e, what: s, integer: n }), ha = {
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
    idle_threshold: N(25, 0, 1e3, "W, below this a flow (and an appliance) counts as none"),
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
}, Ae = {
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
}, Rn = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], Je = ["electricity", "car", "water"];
[
  ...vs.flatMap((a) => Object.keys(Ue[a]).map((t) => `${a}.${t}`)),
  ...Object.entries(ha).flatMap(([a, t]) => Object.keys(t).map((e) => `${a}.${e}`)),
  ...Je.map((a) => `titles.${a}`),
  ...Object.keys(Ae).map((a) => `colors.${a}`)
];
function Nn(a, t) {
  const e = ft(a[t], t), s = Ue[t], n = [...Object.keys(ha[t] ?? {}), ...fs[t] ?? []];
  Nt(e, [...Object.keys(s), ...n], t);
  const o = {};
  for (const [i, r] of Object.entries(s)) {
    const l = Kt(e[i], `${t}.${i}`, { domain: r });
    l && (o[i] = l);
  }
  return o;
}
function In(a) {
  const t = {};
  for (const [e, s] of Object.entries(ha)) {
    const n = ft(a[e], e), o = Object.keys(Ue[e] ?? {});
    Nt(n, [...o, ...Object.keys(s), ...fs[e] ?? []], e), t[e] = {};
    for (const [i, r] of Object.entries(s)) {
      const l = n[i], h = `${e}.${i}`;
      if (l == null) {
        t[e][i] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && V(`${h} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && V(`${h} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][i] = l;
    }
  }
  return t;
}
function Fn(a) {
  const t = ft(a.colors, "colors");
  Nt(t, [...Object.keys(Ae), "temp_scale"], "colors");
  const e = { ...Ae };
  for (const s of Object.keys(Ae)) {
    const n = t[s];
    n != null && ((typeof n != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.trim())) && V(`colors.${s} must be a colour like #FFD60A (six hex digits).`), e[s] = n.trim().toUpperCase());
  }
  return e;
}
function Wn(a) {
  const t = ft(a.colors, "colors").temp_scale;
  if (t == null)
    return Rn.map((n) => ({ ...n }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && V(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const s = t.map((n, o) => (Yt(n) || V(`${e}[${o}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), Nt(n, ["temp", "color"], `${e}[${o}]`), (typeof n.temp != "number" || !Number.isFinite(n.temp)) && V(`${e}[${o}].temp must be a number (°C).`), (typeof n.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(n.color.trim())) && V(`${e}[${o}].color must be a colour like #0A84FF (six hex digits).`), { temp: n.temp, color: n.color.trim().toUpperCase() }));
  return s.forEach((n, o) => {
    o > 0 && n.temp <= s[o - 1].temp && V(`${e}: temperatures must rise (${s[o - 1].temp} is followed by ${n.temp}).`);
  }), s;
}
function Un(a) {
  const t = ft(a.boiler, "boiler").show;
  return t == null ? jn : ((typeof t != "string" || !Ha.includes(t)) && V(`boiler.show must be one of ${Ha.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Vn(a) {
  const t = ft(a.battery, "battery").default_range;
  return t == null ? ms : ((typeof t != "string" || !je.includes(t)) && V(`battery.default_range must be one of ${je.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Gn(a) {
  const t = ft(a.forecast, "forecast").default_range;
  return t == null ? Bn : ((typeof t != "string" || !za.includes(t)) && V(`forecast.default_range must be one of ${za.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Kn(a) {
  const t = ft(a.house, "house").label;
  return t == null ? Hn : ((typeof t != "string" || t.trim() === "") && V("house.label must be a non-empty text (the label of the appliances in Home Assistant)."), t.trim());
}
function Zn(a) {
  const t = ft(a.house, "house").default_range;
  return t == null ? ms : ((typeof t != "string" || !je.includes(t)) && V(`house.default_range must be one of ${je.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const Yn = "mdi:power-plug";
function Xn(a) {
  const t = ft(a.house, "house").appliances;
  return t == null ? [] : (Array.isArray(t) || V("house.appliances must be a list of {name, icon, power, energy, running, start_energy, warn_after}."), t.map((e, s) => {
    const n = `house.appliances[${s}]`;
    Yt(e) || V(`${n} must be a mapping like {name: Pračka, running: input_boolean.…, start_energy: input_number.…}.`), Nt(e, ["name", "power", "energy", "running", "start_energy", "icon", "warn_after"], n);
    const o = we(e.name, `${n}.name`);
    o === void 0 && V(`${n}.name must be the name of the device of the appliance.`);
    const i = ys(e.running, `${n}.running`), r = Kt(e.start_energy, `${n}.start_energy`, { domain: "input_number" }), l = Kt(e.power, `${n}.power`, { domain: "sensor" }), h = Kt(e.energy, `${n}.energy`, { domain: "sensor" }), c = ws(e.icon, `${n}.icon`), d = $s(e.warn_after, `${n}.warn_after`);
    return { name: o, ...l ? { power: l } : {}, ...h ? { energy: h } : {}, ...i ? { running: i } : {}, ...r ? { start_energy: r } : {}, ...d ? { warn_after: d } : {}, ...c ? { icon: c } : {} };
  }));
}
function ys(a, t) {
  const e = Kt(a, t, { example: "input_boolean.technicka_mistnost_pracka_bezi" });
  return e && !/^(input_boolean|binary_sensor)\./.test(e) && V(`${t} must be an input_boolean or a binary_sensor entity, not ${e}.`), e;
}
function $s(a, t) {
  if (a != null)
    return (typeof a != "number" || !Number.isInteger(a) || a < 1 || a > 1440) && V(`${t} must be a whole number of minutes from 1 to 1440, not ${JSON.stringify(a)}.`), a;
}
function ja(a, t) {
  return a ?? V(`${t} must be a text or a mapping of the language to the text, like {cs: Vaření, en: Cooking}.`);
}
function ws(a, t) {
  if (a != null)
    return (typeof a != "string" || !/^[a-z0-9]+:[a-z0-9-]+$/i.test(a)) && V(`${t} must be an icon such as mdi:washing-machine.`), a;
}
function qn(a) {
  const t = ft(a.house, "house").groups;
  return t == null ? [] : (Array.isArray(t) || V("house.groups must be a list of {name, icon, appliances}."), t.map((e, s) => {
    const n = `house.groups[${s}]`;
    Yt(e) || V(`${n} must be a mapping like {name: Vaření, icon: mdi:silverware-fork-knife, appliances: [...]}.`), Nt(e, ["name", "icon", "appliances"], n), (!Array.isArray(e.appliances) || e.appliances.length === 0) && V(`${n}.appliances must be a list of {name, power, energy, running}.`);
    const o = e.appliances.map((i, r) => {
      const l = `${n}.appliances[${r}]`;
      Yt(i) || V(`${l} must be a mapping like {name: Trouba, power: sensor.…, energy: sensor.…}.`), Nt(i, ["name", "power", "energy", "running", "warn_after"], l);
      const h = Kt(i.power, `${l}.power`, { domain: "sensor" });
      h || V(`${l}.power must be the power sensor (sensor.…) of the appliance.`);
      const c = Kt(i.energy, `${l}.energy`, { domain: "sensor" }), d = ys(i.running, `${l}.running`), u = $s(i.warn_after, `${l}.warn_after`);
      return { name: ja(we(i.name, `${l}.name`), `${l}.name`), power: h, ...c ? { energy: c } : {}, ...d ? { running: d } : {}, ...u ? { warn_after: u } : {} };
    });
    return { name: ja(we(e.name, `${n}.name`), `${n}.name`), icon: ws(e.icon, `${n}.icon`) ?? Yn, appliances: o };
  }));
}
function Jn(a) {
  const t = ft(a.flows, "flows").decimals;
  return t == null ? Pn : (Ba.includes(t) || V(`flows.decimals must be one of ${Ba.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const Qn = "/dashboard-bmw";
function to(a) {
  const t = ft(a.car, "car").link;
  return t == null ? Qn : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && V(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function eo(a) {
  const t = ft(a.titles, "titles");
  Nt(t, [...Je], "titles");
  const e = {};
  for (const s of Je) {
    const n = we(t[s], `titles.${s}`);
    n !== void 0 && (e[s] = n);
  }
  return e;
}
function ao(a) {
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
function so(a) {
  return En("Energie Dashboard", () => no(a));
}
function no(a) {
  Yt(a) || V("the configuration must be a mapping of keys.");
  const t = a.title === "" ? "" : we(a.title, "title"), e = Object.fromEntries(vs.map((o) => [o, Nn(a, o)]));
  e.mixing.valve_c1 && e.mixing.valve_c1 === e.mixing.valve_c2 && V("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const s = In(a);
  ao(s);
  const n = zn(a.language);
  return { title: t, language: n, entities: e, titles: eo(a), num: s, colors: Fn(a), tempScale: Wn(a), boilerShow: Un(a), powerDecimals: Jn(a), carLink: to(a), batteryRange: Vn(a), sunRange: Gn(a), houseLabel: Kn(a), houseRange: Zn(a), appliances: Xn(a), groups: qn(a) };
}
const D = "––", Ut = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, ae = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, Pa = "ha-energie-dashboard:boiler-heating", Ra = "ha-energie-dashboard:battery-range", Na = "ha-energie-dashboard:sun-range";
function zt(a, t) {
  const e = a?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function oo(a) {
  const t = a.reduce((o, i) => o + i, 0);
  if (t <= 0) return a.map(() => 0);
  const e = a.map((o) => o / t * 100), s = e.map(Math.floor);
  let n = 100 - s.reduce((o, i) => o + i, 0);
  return e.map((o, i) => ({ index: i, rest: o - s[i] })).sort((o, i) => i.rest - o.rest).forEach(({ index: o }) => {
    n-- > 0 && s[o]++;
  }), s;
}
const Q = (a, t, e) => Math.max(t, Math.min(e, a)), pa = (a, t) => `color-mix(in srgb, ${a} ${t}%, transparent)`, Se = (a, t) => `color-mix(in srgb, ${a} ${t}%, var(--ed-tint-base))`, xs = (a) => Array.from({ length: 10 }, (t, e) => Q((a - e * 10) / 10, 0, 1) * 100), Ia = (a) => `calc((100% - 18px) * ${Q(a, 0, 100) / 100} + ${Math.max(0, Math.ceil(Q(a, 0, 100) / 10) - 1) * 2}px)`;
var io = Object.defineProperty, J = (a, t, e, s) => {
  for (var n = void 0, o = a.length - 1, i; o >= 0; o--)
    (i = a[o]) && (n = i(t, e, n) || n);
  return n && io(t, e, n), n;
};
class q extends Ot {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._sunDetail = !1, this._sunTab = "today", this._sunMode = "total", this._houseDetail = !1, this._houseOpen = [], this._houseTab = "now", this._houseData = {}, this._i18n = He("cs"), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = so(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(Pa)) || 0);
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
    return On(t, this._i18n?.language ?? this.lang ?? "en");
  }
  get t() {
    return this._i18n.t;
  }
  get boostOptions() {
    return [{ value: "off", label: this.t.boostOptions.off }, { value: "on", label: this.t.boostOptions.on }];
  }
  willUpdate() {
    this._i18n = He(cn(this._config?.language ?? "auto", this.hass), this.hass), kn(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && tt(F(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(Pa, String(this._lastHeating));
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
    t.has("hass") && this._tankTemp && zt(pt(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const s = this._config;
    if (window.clearTimeout(this._timers.get("hold")), s && s.boilerShow === "heating" && this._lastHeating) {
      const n = this._lastHeating + s.num.boiler.hold_minutes * 6e4 - Date.now();
      n > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), n + 50));
    }
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${Ut[t.main]})`;
  }
  stateLine(t, e) {
    return y`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? y`${D}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !tt(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || tt(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, s = (r) => Gt(this.hass, r), n = {
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
  X()
], q.prototype, "_config");
J([
  W({ attribute: !1 })
], q.prototype, "hass");
J([
  X()
], q.prototype, "_width");
J([
  X()
], q.prototype, "_optimistic");
J([
  X()
], q.prototype, "_feedback");
J([
  X()
], q.prototype, "_open");
J([
  X()
], q.prototype, "_pop");
J([
  X()
], q.prototype, "_all");
J([
  X()
], q.prototype, "_now");
J([
  X()
], q.prototype, "_carHint");
J([
  X()
], q.prototype, "_batDetail");
J([
  X()
], q.prototype, "_batTab");
J([
  X()
], q.prototype, "_batSpan");
J([
  X()
], q.prototype, "_batRange");
J([
  X()
], q.prototype, "_batOpen");
J([
  X()
], q.prototype, "_batScrub");
J([
  X()
], q.prototype, "_batData");
J([
  X()
], q.prototype, "_sunDetail");
J([
  X()
], q.prototype, "_sunTab");
J([
  X()
], q.prototype, "_sunRange");
J([
  X()
], q.prototype, "_sunMode");
J([
  X()
], q.prototype, "_sunHint");
J([
  X()
], q.prototype, "_sunWeather");
J([
  X()
], q.prototype, "_houseDetail");
J([
  X()
], q.prototype, "_houseRange");
J([
  X()
], q.prototype, "_houseOpen");
J([
  X()
], q.prototype, "_houseTab");
J([
  X()
], q.prototype, "_houseData");
J([
  X()
], q.prototype, "_houseToday");
J([
  X()
], q.prototype, "_houseCycles");
J([
  X()
], q.prototype, "_tankTemp");
const ro = (a) => class extends a {
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
        <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${n ? "warn" : ""}">${o === void 0 ? D : s}</span></span>
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
      const { min: s, max: n } = this.tankRange(this._config), o = zt(pt(this.hass, t), "temperature");
      (o === void 0 || o < s || o > n) && await this.setTemperature(t, Q(o ?? s, s, n));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = pt(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, zt(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, zt(e, "max_temp") ?? t.num.tank.temp_max)
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
}, Pe = ["1d", "7d", "30d"], qt = { "1d": 1, "7d": 7, "30d": 30 }, U = 310, et = 36e5, Et = 24 * et, Qe = (a) => typeof a == "number" && Number.isFinite(a);
async function jt(a, t, e, s, n, o) {
  return t.length ? await a.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(s).toISOString(),
    statistic_ids: t,
    period: n,
    types: o
  }) ?? {} : {};
}
function At(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t.getTime();
}
function _t(a, t, e, s, n, o = "mean", i = 0) {
  const r = new Array(n).fill(0), l = new Array(n).fill(0), h = new Array(n).fill(void 0), c = (s - e) / n;
  for (const d of a ?? []) {
    const u = d[t];
    if (!Qe(u) || !Qe(d.start) || c <= 0) continue;
    const b = Math.floor((d.start - e + i) / c);
    if (b < 0 || b >= n) continue;
    l[b]++, r[b] += u;
    const v = h[b];
    o === "min" ? h[b] = v === void 0 ? u : Math.min(v, u) : o === "max" ? h[b] = v === void 0 ? u : Math.max(v, u) : o === "last" && (h[b] = u);
  }
  return h.map((d, u) => {
    if (l[u])
      return o === "mean" ? r[u] / l[u] : o === "sum" ? r[u] : d;
  });
}
function St(a, t) {
  return (a ?? []).some((e) => Qe(e[t]));
}
const R = (a) => Math.round(a * 10) / 10;
function se(a, t, e) {
  let s = "", n = !1;
  return a.forEach((o, i) => {
    if (o === void 0) {
      n = !1;
      return;
    }
    s += `${n ? " L" : s ? " M" : "M"}${R(t(i))} ${R(e(o))}`, n = !0;
  }), s;
}
function Re(a, t, e, s) {
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
function ks(a, t, e, s) {
  let n = "", o = -1;
  const i = (l) => a[l] !== void 0 && t[l] !== void 0, r = (l) => {
    if (!(o < 0)) {
      n += `${n ? " " : ""}M${R(e(o))} ${R(s(t[o]))}`;
      for (let h = o + 1; h <= l; h++) n += ` L${R(e(h))} ${R(s(t[h]))}`;
      for (let h = l; h >= o; h--) n += ` L${R(e(h))} ${R(s(a[h]))}`;
      n += " Z", o = -1;
    }
  };
  for (let l = 0; l < a.length; l++)
    i(l) ? o < 0 && (o = l) : r(l - 1);
  return r(a.length - 1), n;
}
function le(a) {
  if (!(a > 0)) return 1;
  const e = 10 ** Math.floor(Math.log10(a)), s = a / e;
  return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 3 ? 3 : s <= 5 ? 5 : 10) * e;
}
function lo(a, t) {
  const e = a.filter((r) => r !== void 0);
  if (!e.length) return;
  let s = Math.min(...e), n = Math.max(...e);
  const o = Math.max(n - s, t), i = (n + s) / 2;
  return s = i - o / 2 - o * 0.1, n = i + o / 2 + o * 0.1, { lo: s, hi: n };
}
function Fa(a, t, e) {
  if (!(e > 0) || !(a > 0) || !(t > 0)) return;
  const s = a / 100 * t / (e / 1e3), n = Math.round(s * 60 / 5) * 5;
  return n >= 5 && n < 2880 ? n : void 0;
}
function ne(a) {
  const t = Math.floor(a / 60), e = a % 60;
  return t === 0 ? `${e} min` : e === 0 ? `${t} h` : `${t} h ${e} min`;
}
const Rt = 56, Ee = 6e4, Ft = 60 * Ee, Ct = 24 * Ft, Wa = [10 * Ee, 15 * Ee, 30 * Ee, Ft, 2 * Ft, 3 * Ft, 4 * Ft, 6 * Ft, 12 * Ft, Ct, 2 * Ct, 3 * Ct, 5 * Ct, 7 * Ct], Ua = 6, Va = 10, _s = 8;
function co(a) {
  let t = Wa[0], e = 1 / 0;
  for (const s of Wa) {
    const n = a / s, i = (n < Ua ? Ua - n : n > Va ? n - Va : 0) * 100 + Math.abs(n - _s) - s / 1e12;
    i < e && (e = i, t = s);
  }
  return t;
}
function Ga(a) {
  const t = new Date(a);
  return t.setHours(0, 0, 0, 0), t;
}
function ho(a, t, e) {
  const s = [];
  if (e < Ct) {
    const i = Ga(a).getTime();
    for (let r = i + Math.ceil((a - i) / e) * e; r <= t; r += e) r >= a && s.push(r);
    return s;
  }
  const n = Math.round(e / Ct), o = Ga(t);
  for (let i = 0; ; i++) {
    const r = new Date(o);
    if (r.setDate(o.getDate() - i * n), r.getTime() < a) break;
    s.push(r.getTime());
  }
  return s.reverse();
}
function ua(a) {
  const { start: t, end: e } = a, s = a.x0 ?? 0, n = a.x1 ?? U, o = a.x ?? ((c) => s + (c - t) / (e - t) * (n - s)), i = co(e - t), r = (c) => i < Ct ? it(c).replace(/^(\d{1,2}):00$/, "$1") : i === Ct && e - t <= 8 * Ct ? _n(c) : Sn(c), l = ho(t, e, i).map((c) => {
    const d = Math.round(o(c) * 10) / 10;
    if (a.slot) {
      const u = Math.round(o(c + a.slot / 2) * 10) / 10, b = r(c), v = b.length * 3.3;
      return { x: d, text: u - v < s || u + v > n ? "" : b, labelX: u };
    }
    return { x: d, text: d < s + 6 || d > n - 6 ? "" : r(c) };
  });
  return Math.max(0, ...l.map((c) => c.text.length)) > 5 && l.length - 1 > 7 ? l.map((c, d) => d % 2 === 1 ? c : { ...c, text: "" }) : l;
}
function Ss(a) {
  if (!a || a.length < 2) return U / _s;
  const t = a.slice(1).map((e, s) => e.x - a[s].x).sort((e, s) => e - s);
  return t[Math.floor(t.length / 2)];
}
const po = [1, 2, 4, 5], uo = [1, 2, 3, 4, 5, 6, 8, 10];
function go(a) {
  if (!(a > 0)) return !1;
  const t = a / 10 ** Math.floor(Math.log10(a) + 1e-9);
  return [1, 2, 2.5, 5].some((e) => Math.abs(t - e) < 1e-6 * e);
}
function bo(a, t, e, s) {
  const n = [...a].sort((r, l) => r.y - l.y), o = [...n], i = [];
  return n.slice(1).forEach((r, l) => {
    const h = n[l].y, c = (r.y - h) / t, d = s ? uo.filter((b) => b === 1 || go(Math.abs(s(r.y) - s(h)) / b)) : po, u = d.reduce((b, v) => Math.abs(v - c) < Math.abs(b - c) ? v : b, d[0] ?? 1);
    for (let b = 1; b < u; b++) {
      const v = Math.round((h + (r.y - h) * b / u) * 10) / 10;
      o.push({ y: v });
      const m = e?.(v);
      m && i.push({ y: v, text: m });
    }
  }), { grid: o.sort((r, l) => r.y - l.y), labels: i };
}
function Ms(a, t) {
  const e = a / Math.max(1, t), s = 10 ** Math.floor(Math.log10(e));
  return [1, 2, 2.5, 5, 10].map((n) => n * s).find((n) => n >= e * 0.8) ?? e;
}
const fo = 5 * 6e4, ue = 48, Ka = 60, mo = 0, vo = (a) => class extends a {
  // ----------------------------------------------------------------- state and history
  /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
  batRange(t) {
    if (this._batRange) return this._batRange;
    try {
      const e = localStorage.getItem(Ra);
      if (e && Pe.includes(e)) return e;
    } catch {
    }
    return t.batteryRange;
  }
  setBatRange(t) {
    this._batRange = t, this._batScrub = {};
    try {
      localStorage.setItem(Ra, t);
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
      const h = s - (r === "6h" ? 6 : 24) * et;
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
        start: s - qt[l] * Et,
        end: s,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, e) {
    if (t === "1d")
      return { start: Math.floor(e / et) * et - 23 * et, bins: 24 };
    const s = new Date(e);
    return s.setHours(0, 0, 0, 0), s.setDate(s.getDate() - (qt[t] - 1)), { start: s.getTime(), bins: qt[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const e of this.batNeeds(t)) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < fo) || this.fetchBattery(t, e, s);
      }
  }
  async fetchBattery(t, e, s) {
    const n = this.hass;
    if (!n) return;
    const o = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: o, parts: s?.parts ?? {} } };
    try {
      const i = this.batRequests(t, e, o), r = {};
      await Promise.all(i.map(async (l) => r[l.part] = await jt(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
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
    return tt(t.batIn, s) ? "charging" : tt(t.batDis, s) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, e, s) {
    const n = this.t, o = this.batteryReserve(e), i = Array.from({ length: 10 }, (l, h) => {
      const c = (h + 1) * 10 <= o + 1e-3, d = t === void 0 ? 0 : Q((t - h * 10) / 10, 0, 1) * 100, u = h === 0 ? "8px 0 0 8px" : h === 9 ? "0 8px 8px 0" : "0", b = c ? "var(--ed-warning)" : "var(--ed-battery)";
      return y`<span class="pill" style="height:${s}px;border-radius:${u};background:${c ? pa("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${d.toFixed(1)}%;background:${b}"></i></span>`;
    }), r = t === void 0 ? n.noData : n.bat.levelLabel(K(t), K(o));
    return y`<div class="bat-gauge" role="img" aria-label=${r}>${i}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, e) {
    const s = t.soc, n = this.batState(t, e);
    if (s === void 0) return;
    const o = e.num.battery.capacity;
    if (n === "charging") {
      const i = Fa(100 - s, o, t.batIn ?? 0);
      return i === void 0 ? void 0 : this.t.bat.fullIn(ne(i));
    }
    if (n === "discharging") {
      const i = Fa(s - this.batteryReserve(e), o, t.batDis ?? 0);
      return i === void 0 ? void 0 : this.t.bat.lastsFor(ne(i));
    }
  }
  /** Signed power in kW, charging positive (the raw entity is the other way round). */
  batSigned(t) {
    if (!(t.batIn === void 0 && t.batDis === void 0))
      return ((t.batIn ?? 0) - (t.batDis ?? 0)) / 1e3;
  }
  // ----------------------------------------------------------------- popup
  renderBatteryPopup(t, e, s, n, o) {
    const i = this.t, r = s.num.flows.idle_threshold, l = t.key === "bat", h = n.soc, c = h !== void 0 && h <= this.batteryReserve(s), d = l ? n.batDis : n.batIn, b = tt(d, r) ? l ? i.pop.discharging(nt(d, o)) : i.pop.charging(nt(d, o)) : n.batDis === void 0 && n.batIn === void 0 && h === void 0 ? D : l ? i.idle.bat : i.idle.batIn, v = this.today(s), m = l ? v.bdis : v.bchg, p = this.batEstimate(n, s), g = Math.min(236, e.width), f = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, $ = Q(f - g / 2, 0, e.width - g), _ = t.side === "L" ? e.left[t.key] : e.right[t.key], w = _ - e.tile.h / 2, L = _ < e.height / 2, A = L ? `top:${(w + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - w + 8).toFixed(0)}px`;
    return y`<div class="pop bat-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${$.toFixed(0)}px;${A};width:${g}px">
        <i class="arrow ${L ? "up" : "down"}" aria-hidden="true" style="left:${(f - $ - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${b}</span></div>
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${i.pop.level}${c ? y`<span class="note"> ${i.pop.atReserve}</span>` : T}</span>
            <span class="pop-big" style="color:${c ? "var(--ed-warning)" : "var(--ed-text)"}">${h === void 0 ? D : K(h)}</span>
          </div>
          ${this.renderGauge(h, s, 12)}
        </div>
        ${p ? y`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${p}</p>` : T}
        <div class="pop-rows"><div class="pop-row"><span>${l ? i.pop.rows.discharged : i.pop.rows.charged}</span><b>${m === void 0 ? D : `${st(m)} kWh`}</b></div></div>
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
    const e = this.t, s = this._batScrub[t.id] ?? t.start ?? 100, n = !!t.whole && this._batScrub[t.id] === void 0, o = t.fade ?? mo, i = (g) => {
      const f = g / 100 * U;
      let $ = 0;
      for (let _ = 1; _ < t.n; _++) Math.abs(t.x(_) - f) < Math.abs(t.x($) - f) && ($ = _);
      return $;
    }, r = i(s), l = () => {
      const g = { ...this._batScrub };
      delete g[t.id], this._batScrub = g;
    }, h = (g) => {
      if (g.key === "Enter" && t.whole && !n) {
        g.preventDefault(), l();
        return;
      }
      const f = g.key === "ArrowRight" || g.key === "ArrowUp" ? 1 : g.key === "ArrowLeft" || g.key === "ArrowDown" ? -1 : 0;
      if (!f) return;
      g.preventDefault();
      const $ = Q(r + f, 0, t.n - 1);
      this._batScrub = { ...this._batScrub, [t.id]: t.x($) / U * 100 };
    }, c = t.x(r), d = t.dot?.(r), u = n && t.wholeText ? t.wholeText : t.read(r), b = (g) => `${(g / t.h * 100).toFixed(2)}%`, v = t.ticks ?? (t.time ? ua(t.time) : void 0), m = bo(t.grid, Ss(v), t.valueAt, t.valueNum), p = [...t.labels, ...m.labels.filter((g) => t.labels.every((f) => Math.abs(f.y - g.y) > 13))];
    return y`${t.panel ? T : y`<div class="bat-read">${u}</div>`}
        <div class="bat-chart" style="aspect-ratio:${U + Rt} / ${t.h}">
          <svg viewBox="0 0 ${U + Rt} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${o} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${U} height=${t.h}><rect width=${U} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${m.grid.map((g) => Y`<line x1="0" y1=${g.y} x2=${U} y2=${g.y} class=${g.strong ? "axis" : "grid"}></line>`)}
            ${(v ?? []).map((g) => Y`<line x1=${g.x} y1="0" x2=${g.x} y2=${t.h} class="grid"></line>`)}
            <g mask=${o > 0 ? `url(#bm-${t.id})` : T}>${t.body}</g>
            ${n ? T : Y`<line x1=${c} y1="0" x2=${c} y2=${t.h} class="cursor"></line>`}
            ${d && !n ? Y`<circle cx=${c} cy=${d.y} r="6" style="fill:var(--ed-text)"></circle>` : T}
          </svg>
          ${p.map((g) => y`<span class="bat-ylabel" style="top:calc(${b(g.y)} - 7px);left:calc(${(U / (U + Rt) * 100).toFixed(2)}% + 8px)">${g.text}</span>`)}
          <input type="range" style="width:${(U / (U + Rt) * 100).toFixed(2)}%" min="0" max="100" step="1" .value=${String(s)} aria-label=${e.bat.scrubLabel} aria-valuetext=${u}
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
      const f = Number(g.target.value);
      this._scrubTap?.id === t.id && this._scrubTap.index !== i(f) && (this._scrubTap.moved = !0), this._batScrub = { ...this._batScrub, [t.id]: f };
    }} @keydown=${h} />
        </div>
        ${v ? y`<div class="bat-axis ticks">${v.map((g) => y`<span style="left:${((g.labelX ?? g.x) / (U + Rt) * 100).toFixed(2)}%;transform:translateX(${g.labelX === void 0 && g.x < 8 ? "0" : g.labelX === void 0 && g.x > U - 8 ? "-100%" : "-50%"})">${g.text}</span>`)}</div>` : y`<div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>`}
        ${t.panel ? n ? t.whole() : t.panel(r) : t.legend ?? T}`;
  }
  renderChartOrEmpty(t, e, s) {
    if (s) return this.renderChart(s);
    const n = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return y`<div class="bat-nodata" style="aspect-ratio:${U} / ${e}">${n ? D : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const e = t.entities.battery, s = `day:${this._batSpan}`, n = this._batData[s];
    if (!n) return;
    const o = this._batSpan === "6h" ? 6 : 24, i = n.at, r = i - o * et, l = _t(this.batRows(s, "level", e.state_of_charge), "mean", r, i, ue), h = _t(this.batRows(s, "level", e.power), "mean", r, i, ue).map((A) => A === void 0 ? void 0 : -A / 1e3);
    if (!l.some((A) => A !== void 0) && !h.some((A) => A !== void 0)) return;
    const c = F(this.hass, e.state_of_charge), d = F(this.hass, e.power);
    c !== void 0 && (l[ue - 1] = c), d !== void 0 && (h[ue - 1] = -d / 1e3);
    const u = ue, b = (A) => R(A / (u - 1) * U), v = (A) => R(98 - Q(A, 0, 100) / 100 * 90), m = le(Math.max(1, ...h.map((A) => Math.abs(A ?? 0)))), p = 172, g = (A) => R(p - Q(A, -m, m) / m * 44), f = 4.2, $ = h.map((A, S) => {
      if (A === void 0) return T;
      const M = Math.min(p, g(A)), C = Math.max(1.5, Math.abs(g(A) - p));
      return Y`<rect x=${R(b(S) - f / 2)} y=${A >= 0 ? M : p} width=${f} height=${R(C)} rx="1.5" style="fill:${A >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), _ = se(l, b, v), w = Re(l, b, v, 98), L = (A) => `${Z(A, A % 1 === 0 ? 0 : 1)} kW`;
    return {
      id: "level",
      h: 224,
      n: u,
      x: b,
      grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: !0 }, { y: p - 44 }, { y: p, strong: !0 }, { y: p + 44 }],
      time: { start: r, end: i },
      labels: [
        { y: 8, text: K(100) },
        { y: 53, text: K(50) },
        { y: 98, text: K(0) },
        { y: p - 44, text: `+${L(m)}` },
        { y: p, text: "0" },
        { y: p + 44, text: `−${L(m)}` }
      ],
      body: Y`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${w} fill="url(#bl-area)"></path>
          <path d=${_} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${$}`,
      dot: (A) => l[A] === void 0 ? void 0 : { y: v(l[A]), color: "var(--ed-text)" },
      read: (A) => {
        const S = h[A], M = S === void 0 ? D : Math.abs(S) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${S > 0 ? this.t.bat.charging : this.t.bat.discharging} ${nt(Math.abs(S) * 1e3, "kW")}`;
        return `${this.back((1 - A / (u - 1)) * o * 60)} · ${l[A] === void 0 ? D : K(l[A])} · ${M}`;
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
    const i = this.histWindow(e, o.at), r = e === "1d", l = i.bins, h = r ? et : Et, c = i.start + l * h, d = r ? 0 : 6 * et, u = this.batRows(n, "energy", s.total_charge), b = this.batRows(n, "energy", s.total_discharge), v = _t(u, "change", i.start, c, l, "sum", d), m = _t(b, "change", i.start, c, l, "sum", d);
    if (!v.some((k) => k !== void 0) && !m.some((k) => k !== void 0)) return;
    const p = v.map((k) => k ?? 0), g = m.map((k) => k ?? 0), f = le(Math.max(0.5, ...p, ...g)), $ = r ? 3 : l <= 7 ? 10 : 2, _ = (U - (l - 1) * $) / l, w = (k) => R(k * (_ + $) + _ / 2), L = 100, A = (k) => Q(k, 0, f) / f * 92, S = p.flatMap((k, H) => {
      const ot = g[H], I = H === l - 1 ? 1 : 0.85;
      return [
        Y`<rect x=${R(H * (_ + $))} y=${R(L - Math.max(k > 0 ? 1 : 0, A(k)))} width=${R(_)} height=${R(Math.max(k > 0 ? 1 : 0, A(k)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${I}"></rect>`,
        Y`<rect x=${R(H * (_ + $))} y=${L} width=${R(_)} height=${R(Math.max(ot > 0 ? 1 : 0, A(ot)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${I}"></rect>`
      ];
    }), M = (k) => R(L - Q(k, -f, f) / f * 92), C = p.map((k, H) => k - g[H]), x = r ? 2 : 1, E = (k) => `${k >= 0 ? "+" : "−"}${Z(Math.abs(k), x)}`, z = (k) => r ? it(i.start + k * et) : fe(i.start + k * Et);
    return {
      charged: p,
      discharged: g,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: w,
        grid: [{ y: L, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${Z(f, f % 1 === 0 ? 0 : 1)}` }, { y: L, text: "0" }, { y: 192, text: `−${Z(f, f % 1 === 0 ? 0 : 1)}` }],
        time: { start: i.start, end: c, slot: h },
        valueNum: (k) => (L - k) / 92 * f,
        valueAt: (k) => {
          const H = (L - k) / 92 * f;
          return Math.abs(H) < 1e-9 ? void 0 : `${H > 0 ? "+" : "−"}${Z(Math.abs(H), Math.abs(H) % 1 === 0 ? 0 : Math.abs(H * 10) % 1 < 1e-6 ? 1 : 2)}`;
        },
        body: Y`${S}<path d=${se(C, w, M)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (k) => ({ y: M(C[k]), color: "var(--ed-text)" }),
        read: (k) => `${z(k)} · ${E(p[k])} / ${E(-g[k])} · ${this.t.bat.net} ${E(C[k])} kWh`,
        from: r ? "−24 h" : fe(i.start),
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
    const i = qt[e], r = o.at, l = r - i * Et, h = Ka, c = (x) => _t(this.batRows(n, "health", x), "mean", l, r, h), d = c(s.min_cell_voltage), u = c(s.max_cell_voltage), b = d.map((x, E) => x === void 0 || u[E] === void 0 ? void 0 : Math.max(0, (u[E] - x) * 1e3)), v = b.filter((x) => x !== void 0);
    if (!v.length) return;
    const { imbalance_good: m, imbalance_warn: p } = t.num.battery, g = Math.max(m > 0 ? m * 1.5 : 10, Math.max(...v) * 1.2), f = (x) => R(130 - Q(x, 0, g) / g * 120), $ = (x) => R(x / (h - 1) * U), _ = (x) => this.back((1 - x / (h - 1)) * i * 24 * 60), w = this.t.bat.health, L = "var(--ed-battery)", A = "var(--ed-warning)", S = (x) => x > p ? A : L, M = `bg-${e}`, C = Q(1 - (130 - f(p)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: h,
      x: $,
      time: { start: l, end: r },
      grid: [{ y: 10 }, { y: f(m) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${j(g)} mV` }, { y: f(m), text: `${j(m)} mV` }, { y: 130, text: "0" }],
      body: Y`<defs>
            <linearGradient id=${M} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${C} stop-color="#FF9230"></stop><stop offset=${C} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${M}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${f(m)} width=${U} height=${R(130 - f(m))} style="fill:${L};fill-opacity:0.12"></rect>
          <path d=${Re(b, $, f, 130)} fill="url(#${M}-area)"></path>
          <path d=${se(b, $, f)} fill="none" stroke="url(#${M})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (x) => b[x] === void 0 ? void 0 : { y: f(b[x]), color: S(b[x]) },
      read: (x) => b[x] === void 0 ? `${_(x)} · ${D}` : `${_(x)} · ${w.difference} ${j(b[x])} mV · ${w.min} ${Z(d[x], 3)} V · ${w.max} ${Z(u[x], 3)} V`,
      from: i === 1 ? "−24 h" : `−${i} d`,
      to: this.t.bat.today,
      legend: y`<div class="bat-legend"><span><i class="swatch" style="background:${L};opacity:0.35"></i>${w.excellentZone(`${j(m)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, e, s) {
    if (t === "gap") return this.balanceChart(e, s);
    const n = e.entities.battery, o = `health:${s}`, i = this._batData[o];
    if (!i) return;
    const r = qt[s], l = i.at, h = l - r * Et, c = Ka, d = (C) => this.batRows(o, "health", C), u = (C) => _t(d(C), "mean", h, l, c), b = (C) => R(C / (c - 1) * U), v = (C) => this.back((1 - C / (c - 1)) * r * 24 * 60), m = r === 1 ? "−24 h" : `−${r} d`;
    let p;
    if (t === "temp") {
      const C = u(n.min_cell_temperature), x = u(n.max_cell_temperature), E = u(n.temperature);
      p = {
        low: C,
        high: x,
        line: E,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (z) => `${j(z)} °C`,
        mid: (z) => `${j(z)} °C`,
        read: (z) => {
          const k = [C[z] === void 0 ? void 0 : `${this.t.bat.health.min} ${Z(C[z], 1)}`, E[z] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${Z(E[z], 1)}`, x[z] === void 0 ? void 0 : `${this.t.bat.health.max} ${Z(x[z], 1)}`].filter(Boolean);
          return `${v(z)} · ${k.length ? `${k.join(" · ")} °C` : D}`;
        },
        legend: y`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const C = _t(d(n.total_discharge), "state", h, l, c, "last").map((x) => x === void 0 ? void 0 : x / e.num.battery.capacity);
      p = {
        low: C,
        high: C,
        line: C,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (x) => j(x, 1),
        mid: (x) => j(x, 1),
        read: (x) => `${v(x)} · ${C[x] === void 0 ? D : this.t.bat.health.cycles(Z(C[x], 1))}`
      };
    }
    const g = lo([...p.low, ...p.high], p.minSpan);
    if (!g) return;
    const f = Ms(g.hi - g.lo, 4), $ = Math.floor(g.lo / f + 1e-9) * f;
    let _ = Math.ceil(g.hi / f - 1e-9) * f;
    Math.round((_ - $) / f) % 2 === 1 && (_ += f);
    const w = { lo: $, hi: _ }, L = (C) => R(130 - (Q(C, w.lo, w.hi) - w.lo) / (w.hi - w.lo) * 120), A = t === "life" ? "" : ks(p.low, p.high, b, L), S = p.line ? se(p.line, b, L) : "", M = p.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: c,
      x: b,
      time: { start: h, end: l },
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: p.text(w.hi) }, { y: 70, text: p.mid((w.hi + w.lo) / 2) }, { y: 130, text: p.text(w.lo) }],
      body: Y`<path d=${A} style="fill:${M};fill-opacity:0.22"></path><path d=${S} fill="none" style="stroke:${M}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (C) => p.line?.[C] === void 0 ? void 0 : { y: L(p.line[C]), color: M },
      read: p.read,
      from: m,
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
    const e = this.t, s = Pe.map((n) => ({ value: n, label: e.bat.ranges[n] }));
    return y`<ed-segmented .options=${s} .value=${this.batRange(t)} label=${e.bat.rangeLabel} @hdk-select=${(n) => this.setBatRange(n.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, e) {
    const s = this.t, n = t.entities.battery, o = e.soc, i = this.batState(e, t), r = this.batSigned(e), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, h = "kW", c = F(this.hass, n.current), d = F(this.hass, n.voltage), u = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, b = i === "idle", v = i === "charging" ? s.pop.charging(nt(e.batIn ?? 0, h)) : i === "discharging" ? s.pop.discharging(nt(e.batDis ?? 0, h)) : i === "idle" ? s.bat.status.idle.toLowerCase() : s.noData, m = this.batEstimate(e, t), p = this.today(t), g = [
      { label: s.bat.live.power, value: l === void 0 ? D : b ? "0 kW" : nt(l, h), sub: i === void 0 ? "" : s.bat.status[i] },
      { label: s.bat.live.current, value: c === void 0 ? D : `${Z(Math.abs(c), 1)} A`, sub: c === void 0 || b || i === void 0 ? "" : i === "charging" ? s.bat.live.chargeCurrent : s.bat.live.dischargeCurrent },
      { label: s.bat.live.voltage, value: d === void 0 ? D : `${Z(d, 1)} V`, sub: s.bat.live.ofBattery },
      { label: s.bat.live.load, value: u === void 0 ? D : `${Z(u, 2)} C`, sub: s.bat.live.loadSub }
    ], f = p.bchg, $ = p.bdis, _ = f !== void 0 && $ !== void 0 ? f - $ : void 0, w = ["6h", "24h"].map((L) => ({ value: L, label: s.bat.spans[L] }));
    return y`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${s.bat.level}</span><span class="bat-sub">${v}</span></div><span class="bat-huge">${o === void 0 ? D : K(o)}</span></div>
          ${this.renderGauge(o, t, 32)}
          ${m ? y`<p class="bat-estimate plain">${m}</p>` : T}
        </div>
        <div class="bat-kpis">${g.map((L) => y`<div class="bat-kpi"><span class="sub">${L.label}</span><span class="val">${L.value}</span><span class="sub">${L.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.levelChart}</span>
          <ed-segmented .options=${w} .value=${this._batSpan} label=${s.bat.spanLabel} @hdk-select=${(L) => {
      this._batSpan = L.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${s.bat.charged}</span><span class="val">${f === void 0 ? D : `${st(f)} kWh`}</span></div><div><span class="sub">${s.bat.discharged}</span><span class="val">${$ === void 0 ? D : `${st($)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${f !== void 0 && $ !== void 0 && f + $ > 0 ? y`${f > 0 ? y`<i style="flex:${f.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : T}${$ > 0 ? y`<i style="flex:${$.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : T}` : T}</div>
          <p class="bat-sub">${_ === void 0 ? D : s.bat.netStored(`${_ >= 0 ? "+" : "−"}${st(Math.abs(_))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, e) {
    const s = this.t, n = t.entities.battery, o = this.batRange(t), i = `hist:${o}`, r = this.energyChart(t, o), l = r ? r.charged.reduce((S, M) => S + M, 0) : void 0, h = r ? r.discharged.reduce((S, M) => S + M, 0) : void 0, c = s.bat.kpi.over(o === "1d" ? "24 h" : s.bat.ranges[o].toLowerCase()), d = this._batData[i], u = qt[o], b = this.batRows(i, "level", n.state_of_charge), v = this.batRows(i, "level", n.power), m = St(b, "min") ? Math.min(...(b ?? []).map((S) => S.min).filter((S) => typeof S == "number")) : void 0, p = St(v, "max") || St(v, "min") ? Math.max(...(v ?? []).flatMap((S) => [S.max, S.min]).filter((S) => typeof S == "number").map((S) => Math.abs(S))) : void 0, g = `${Z(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, f = D, $ = [
      { label: s.bat.charged, value: l === void 0 ? f : `${Z(l, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: s.bat.discharged, value: h === void 0 ? f : `${Z(h, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: s.bat.kpi.efficiency, value: l && h !== void 0 ? K(Z(h / l * 100, 1)) : f, sub: s.bat.kpi.efficiencySub },
      { label: s.bat.kpi.cycles, value: h === void 0 ? f : Z(h / t.num.battery.capacity, 1), sub: s.bat.kpi.cyclesSub(g) },
      { label: s.bat.kpi.lowest, value: m === void 0 ? f : K(m), sub: s.bat.kpi.lowestSub },
      { label: s.bat.kpi.peak, value: p === void 0 ? f : nt(p, "kW"), sub: s.bat.kpi.peakSub }
    ], w = _t(b, "mean", this.histWindow(o, d?.at ?? Date.now()).start, d?.at ?? Date.now(), Math.max(1, u * 24)).filter((S) => S !== void 0), L = [0, 20, 40, 60, 80, 100], A = L.slice(0, 5).map((S, M) => w.length ? Math.round(w.filter((C) => M === 4 ? C >= S : C >= S && C < L[M + 1]).length / w.length * 100) : void 0);
    return y`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${o === "1d" ? s.bat.energyHours : s.bat.energyDays} · <span class="unit">kWh</span></span>${this.renderChartOrEmpty(i, 200, r?.chart)}</div>
        <div class="bat-kpis">${$.map((S) => y`<div class="bat-kpi"><span class="sub">${S.label}</span><span class="val">${S.value}</span><span class="sub">${S.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${s.bat.bandsTitle}</span>
          ${A.map((S, M) => y`<div class="bat-band"><span class="name">${L[M]}–${L[M + 1]} %</span><span class="track"><i style="width:${S ?? 0}%;background:${M === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${S === void 0 ? D : K(S)}</span></div>`)}
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
    const s = this.t, n = t.entities.battery, o = s.bat.health, i = this.batRange(t), r = (E) => F(this.hass, E), l = r(n.state_of_health), h = r(n.min_cell_voltage), c = r(n.max_cell_voltage), d = r(n.min_cell_temperature), u = r(n.max_cell_temperature), b = this.batProblem(n.error), v = this.batProblem(n.warning), m = Gt(this.hass, n.total_charge), p = Gt(this.hass, n.total_discharge), g = t.num.battery, f = h !== void 0 && c !== void 0 ? (c - h) * 1e3 : void 0, $ = f === void 0 ? void 0 : f <= g.imbalance_good ? "good" : f <= g.imbalance_warn ? "ok" : f <= g.imbalance_fault ? "warn" : "fault", _ = $ === "warn" || $ === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", A = [l, h, c, d, u, e.soc].every((E) => E === void 0) && b === void 0 && v === void 0 ? { title: o.noData, sub: o.noDataSub, tone: "off", icon: "M5 12h14" } : b || v ? { title: b ? o.error(b) : o.warning(v), sub: o.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: o.ok, sub: o.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, S = p === void 0 ? void 0 : p / g.capacity, M = [
      { key: "soh", label: o.capacity, value: l === void 0 ? D : K(l), sub: l === void 0 ? s.noData : o.capacitySub(`${Z(g.capacity * l / 100, 1)} kWh`, `${Z(g.capacity, g.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: o.balance, value: f === void 0 ? D : `${j(f)} mV`, word: $ ? o.words[$] : void 0, sub: o.balanceSub, details: [] },
      {
        key: "temp",
        label: o.temperature,
        value: u === void 0 ? D : `${j(u)} °C`,
        sub: u !== void 0 && d !== void 0 ? o.temperatureSub(`${j(u - d)} °C`) : s.noData,
        details: [
          [o.battery, n.temperature],
          [o.inverterAir, n.inverter_temperature_air],
          [o.inverterRadiator, n.inverter_temperature_radiator]
        ].filter(([, E]) => E).map(([E, z]) => ({ label: E, value: r(z) === void 0 ? D : `${Z(r(z), 1)} °C` }))
      },
      {
        key: "life",
        label: o.life,
        value: S === void 0 ? D : o.cycles(j(S)),
        sub: m && p !== void 0 ? o.lifeSub(K(Z(p / m * 100, 1))) : s.noData,
        details: [
          { label: o.totalCharged, value: m === void 0 ? D : `${j(m)} kWh` },
          { label: o.totalDischarged, value: p === void 0 ? D : `${j(p)} kWh` }
        ]
      }
    ], C = (E) => E ? yo(this.hass, E) : void 0, x = [];
    if (n.mode && x.push({ label: o.mode, value: C(n.mode) ?? D }), n.charge_limit && x.push({ label: o.chargeLimit, value: r(n.charge_limit) === void 0 ? D : `${j(r(n.charge_limit))} A` }), n.discharge_limit && x.push({ label: o.dischargeLimit, value: r(n.discharge_limit) === void 0 ? D : `${j(r(n.discharge_limit))} A` }), n.error || n.warning) {
      const E = [b, v].filter(Boolean).join(", ");
      x.push({ label: o.errors, value: b === void 0 && v === void 0 ? D : E || o.none, warn: !!E });
    }
    return y`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${A.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${A.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${A.tone}">${A.title}</span><span class="bat-sub">${A.sub}</span></div>
        </div>
        ${M.map((E) => {
      const z = E.key !== "soh" && this._batOpen === E.key, k = z ? this.healthChart(E.key, t, i) : void 0;
      return y`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${E.key === "soh"} aria-expanded=${E.key === "soh" ? T : z ? "true" : "false"}
              @click=${() => {
        E.key !== "soh" && (this._batOpen = z ? void 0 : E.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${E.label}</span><span class="bat-sub">${E.sub}</span></span>
              <span class="bat-value">${E.value}</span>${E.word ? y`<span class="bat-word" style="color:${_}">${E.word}</span>` : T}
              ${E.key === "soh" ? T : y`<svg class="chev ${z ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${z ? y`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${i}`, 140, k)}
                  ${E.details.length ? y`<div class="bat-list">${E.details.map((H) => y`<div class="bat-line"><span>${H.label}</span><b>${H.value}</b></div>`)}</div>` : T}
                </div>` : T}
          </div>`;
    })}
        ${x.length ? y`<div class="bat-card flush"><span class="bat-cap pad">${o.diagnostics}</span><div class="bat-list pad">${x.map((E) => y`<div class="bat-line"><span>${E.label}</span><b style="color:${E.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${E.value}</b></div>`)}</div></div>` : T}`;
  }
};
function yo(a, t) {
  const e = pt(a, t)?.state;
  return e === void 0 || e === "" || e === "unavailable" || e === "unknown" ? void 0 : e;
}
const Za = (a) => typeof a == "number" && Number.isFinite(a);
function Ke(a, t) {
  const e = /* @__PURE__ */ new Map();
  for (const s of a ?? []) {
    const n = s[t];
    if (!Za(n) || !Za(s.start)) continue;
    const o = new Date(s.start), i = At(s.start), r = e.get(i) ?? new Array(24).fill(void 0);
    r[o.getHours()] = Math.max(0, t === "mean" ? n / 1e3 : n), e.set(i, r);
  }
  return e;
}
function Ne(a, t = 1) {
  if (!a) return;
  const e = a.filter((s) => s !== void 0);
  return e.length >= t ? e.reduce((s, n) => s + n, 0) : void 0;
}
function Ie(a, t) {
  if (!a.length) return;
  const e = [...a].sort((i, r) => i - r), s = Math.min(100, Math.max(0, t)) / 100 * (e.length - 1), n = Math.floor(s), o = Math.ceil(s);
  return e[n] + (e[o] - e[n]) * (s - n);
}
const Ya = (a) => Ie(a, 50);
function Ts(a, t) {
  const e = [], s = new Date(a);
  for (let n = 0; n < t; n++)
    s.setDate(s.getDate() - 1), e.push(s.getTime());
  return e;
}
function Dt(a, t) {
  const e = new Date(a);
  return e.setDate(e.getDate() + t), e.setHours(0, 0, 0, 0), e.getTime();
}
function $o(a, t, e, s) {
  const n = Ts(t, e).filter((r) => a.has(r)), o = Array.from({ length: 24 }, (r, l) => {
    const h = n.map((c) => a.get(c)[l]).filter((c) => c !== void 0);
    return h.length >= 3 ? Ie(h, s) : void 0;
  }), i = n.map((r) => Ne(a.get(r), 20)).filter((r) => r !== void 0);
  return { curve: o, daily: i.length >= 3 ? Ie(i, s) : void 0, days: n.length };
}
function wo(a) {
  const t = a.reduce((e, s) => e + (s ?? 0), 0);
  return t > 0 ? a.map((e) => (e ?? 0) / t) : void 0;
}
function xo(a, t) {
  const e = wo(t);
  return e ? e.map((s) => s * a) : void 0;
}
function ko(a, t, e, s) {
  const n = new Date(s), o = n.getHours(), i = 1 - (n.getMinutes() * 60 + n.getSeconds()) / 3600, r = e.map((h, c) => c < o ? 0 : c === o ? (h ?? 0) * i : h ?? 0), l = r.reduce((h, c) => h + c, 0);
  return Array.from({ length: 24 }, (h, c) => c < o ? a?.[c] : l > 0 ? r[c] / l * Math.max(0, t) : void 0);
}
function Xa(a, t) {
  const e = new Date(t), s = e.getHours(), n = 1 - (e.getMinutes() * 60 + e.getSeconds()) / 3600;
  return a.reduce((o, i, r) => o + (r < s ? 0 : r === s ? (i ?? 0) * n : i ?? 0), 0);
}
function _o(a, t, e, s, n, o) {
  if (a === void 0) return;
  const i = new Date(s), r = i.getHours() + i.getMinutes() / 60, l = e.reduce((g, f, $) => g + (f ?? 0) * Math.min(1, Math.max(0, r - $)), 0), h = e.reduce((g, f) => g + (f ?? 0), 0);
  let c, d = "forecast";
  if (t !== void 0) {
    const g = Xa(e, s);
    let f = Math.min(Math.max(t - a, 0), g);
    o && o.possible >= 0.3 && (f = Math.min(f, g * Math.min(1, Math.max(0, o.actual / o.possible)))), c = a + f;
  } else if (h > 0 && l >= 0.5) {
    const g = h - l;
    c = a + g * Math.min(2, a / l), d = "pace";
  }
  if (c === void 0) return;
  const u = c > 0 ? Math.min(1, a / c) : 1, b = Math.min(0.6, n * (1 + (1 - u))), v = Math.max(0, c - a), m = h > 0 ? Xa(e, s) : 1 / 0;
  let p = u < 0.35 ? "low" : u < 0.7 ? "medium" : "high";
  return n > 0.3 && p !== "low" && (p = p === "high" ? "medium" : "low"), { value: c, low: a + v * (1 - b), high: a + Math.min(v * (1 + b), m), done: u, certainty: p, source: d };
}
function So(a) {
  const t = a.filter((e) => e.actual > 0.5);
  if (!(t.length < 3))
    return t.reduce((e, s) => e + Math.abs(s.forecast - s.actual) / s.actual, 0) / t.length;
}
function Mo(a, t, e, s) {
  let n = -1, o = -1;
  for (let i = t; i <= e; i++)
    (a[i] ?? 0) >= s && (n < 0 && (n = i), o = i);
  return n < 0 ? void 0 : [n, o + 1];
}
const qa = [9, 11, 13, 15];
function To(a) {
  const t = qa.findIndex((e) => a < e);
  return t < 0 ? qa.length : t;
}
function Do(a) {
  if (!a || !a.some((e) => e !== void 0)) return;
  const t = [0, 0, 0, 0, 0];
  return a.forEach((e, s) => {
    e !== void 0 && (t[To(s)] += e);
  }), t;
}
function Me(a, t, e) {
  const s = new Date(a), n = Date.UTC(s.getFullYear(), s.getMonth(), s.getDate(), 12), o = Math.round(n / 864e5 + 24405875e-1 - 2451545), i = Math.PI / 180, r = o - e / 360, l = (357.5291 + 0.98560028 * r) % 360, h = 1.9148 * Math.sin(l * i) + 0.02 * Math.sin(2 * l * i) + 3e-4 * Math.sin(3 * l * i), c = (l + h + 180 + 102.9372) % 360, d = 2451545 + r + 53e-4 * Math.sin(l * i) - 69e-4 * Math.sin(2 * c * i), u = Math.sin(c * i) * Math.sin(23.4397 * i), b = Math.cos(Math.asin(u)), v = (Math.sin(-0.833 * i) - Math.sin(t * i) * u) / (Math.cos(t * i) * b);
  if (v < -1 || v > 1) return;
  const m = Math.acos(v) / i, p = (g) => (g - 24405875e-1) * 864e5;
  return { rise: p(d - m / 360), set: p(d + m / 360) };
}
function Co(a) {
  const { capacity: t, efficiency: e } = a;
  let s = a.soc / 100 * t;
  const n = a.reserve / 100 * t, o = { carSun: 0, carTotal: 0, sunUntilEvening: 0, houseUntilEvening: 0 };
  let i = Math.ceil(a.now / (et / 4)) * (et / 4);
  const r = At(a.now), l = r + a.eveningHour * et, h = Dt(r, 1) + a.morningHour * et;
  let c = !1, d = s >= t - 0.01;
  for (; i <= h; i += et / 4) {
    !o.socAtEvening && i >= l && a.now < l && (o.socAtEvening = s / t * 100);
    const u = new Date(i - 1).getHours(), b = i - 1 < Dt(r, 1), v = b ? (a.sun[u] ?? 0) / 4 : 0, m = (a.house[u] ?? 0) / 4;
    i <= l && (o.sunUntilEvening += v, o.houseUntilEvening += m);
    const p = s / t * 100;
    let g = 0;
    a.car && b && (c && p <= a.car.stopSoc ? c = !1 : !c && p >= a.car.startSoc && v * 4 * 1e3 >= a.car.minSun && (c = !0), g = c ? a.car.watts / 1e3 / 4 : 0);
    const f = m + g, $ = Math.min(v, f), _ = v - $, w = f - $;
    if (g > 0 && (o.carTotal += g, o.carSun += Math.min(g, Math.max(0, v - m))), _ > 0)
      s = Math.min(t, s + _ * e);
    else if (w > 0) {
      const L = Math.max(0, s - n) * e, A = Math.min(w, L);
      s -= A / e;
    }
    !d && s >= t - 0.01 && o.fullAt === void 0 && i < l && (o.fullAt = i), s >= t - 0.01 && (d = !0), i >= h && (o.socAtMorning = s / t * 100);
  }
  return o;
}
function Lo(a, t, e = 8) {
  const s = t.length;
  if (s === 0) return [];
  if (s === 1) return [[a[0], t[0]]];
  const n = Array.from({ length: s - 1 }, (r, l) => (t[l + 1] - t[l]) / (a[l + 1] - a[l])), o = [n[0], ...Array.from({ length: s - 2 }, (r, l) => n[l] * n[l + 1] <= 0 ? 0 : 2 * n[l] * n[l + 1] / (n[l] + n[l + 1])), n[s - 2]], i = [];
  for (let r = 0; r < s - 1; r++) {
    const l = a[r + 1] - a[r];
    for (let h = 0; h < e; h++) {
      const c = h / e, d = 2 * c ** 3 - 3 * c ** 2 + 1, u = c ** 3 - 2 * c ** 2 + c, b = -2 * c ** 3 + 3 * c ** 2, v = c ** 3 - c ** 2;
      i.push([a[r] + c * l, d * t[r] + u * l * o[r] + b * t[r + 1] + v * l * o[r + 1]]);
    }
  }
  return i.push([a[s - 1], t[s - 1]]), i;
}
function Ao(a, t, e, s) {
  const n = Ts(t, e).map((o) => Ne(a.get(o), 20)).filter((o) => o !== void 0);
  return n.length >= 3 ? Ie(n, s) : void 0;
}
const Eo = 5 * 6e4, Oo = 30 * 6e4, ge = 12, Jt = 2, Ja = [
  "var(--ed-warning)",
  "color-mix(in srgb, var(--ed-warning) 60%, var(--ed-sun))",
  "color-mix(in srgb, var(--ed-warning) 25%, var(--ed-sun))",
  "var(--ed-sun)",
  "color-mix(in srgb, var(--ed-sun) 62%, white)"
], Qa = ["7d", "30d"], Ze = { "7d": 7, "30d": 30 }, zo = (a) => class extends a {
  constructor() {
    super(...arguments), this._sunWeatherBusy = !1;
  }
  // ----------------------------------------------------------------- state and history
  sunRange(t) {
    if (this._sunRange) return this._sunRange;
    try {
      const e = localStorage.getItem(Na);
      if (e && Qa.includes(e)) return e;
    } catch {
    }
    return t.sunRange;
  }
  setSunRange(t) {
    this._sunRange = t, this._batScrub = {};
    try {
      localStorage.setItem(Na, t);
    } catch {
    }
  }
  /** The views of the history the open parts need: the popup and the detail both show the day. */
  sunNeeds() {
    return this._sunDetail || this._pop === "sun" ? ["sun:hist", "sun:five"] : [];
  }
  sunRequests(t, e, s) {
    const n = t.entities, o = (...l) => l.filter((h) => !!h), i = At(s);
    if (e === "sun:five")
      return [{ part: "power", ids: o(n.pv.power), start: Dt(i, -10), end: s, period: "5minute", types: ["mean"] }];
    const r = Dt(i, -(Math.max(30, t.num.forecast.learn_days) + t.num.forecast.learn_days + 1));
    return [
      { part: "energy", ids: o(n.pv.total_generation), start: r, end: s, period: "hour", types: ["change"] },
      { part: "power", ids: o(n.pv.power), start: r, end: s, period: "hour", types: ["mean", "max"] },
      { part: "house", ids: o(n.house.power), start: Dt(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] },
      { part: "forecast", ids: o(n.forecast.energy_today), start: Dt(i, -t.num.forecast.learn_days), end: s, period: "hour", types: ["mean"] }
    ];
  }
  loadSun() {
    const t = this._config;
    if (!(!t || !this.hass)) {
      for (const e of this.sunNeeds()) {
        const s = this._batData[e];
        s && (s.status === "loading" || Date.now() - s.at < Eo) || this.fetchSun(t, e, s);
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
      await Promise.all(i.map(async (l) => r[l.part] = await jt(n, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: o, parts: {} } };
    }
  }
  /** The daily forecast of the weather entity: the condition of each day; none when the entity is missing or the action is refused. */
  async loadWeather(t) {
    const e = t.entities.forecast.weather, s = this.hass;
    if (!e || !s || this._sunWeatherBusy || this._sunWeather && Date.now() - this._sunWeather.at < Oo) return;
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
      this._sunWeather = { at: n, days: i.filter((r) => r.datetime).map((r) => ({ day: At(Date.parse(r.datetime)), condition: r.condition })) };
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
    const e = Date.now(), s = At(e), n = t.num.forecast, o = this._batData["sun:hist"], i = this._batData["sun:five"], r = t.entities;
    let l = /* @__PURE__ */ new Map(), h = new Array(24).fill(void 0), c = [];
    if (o && Object.keys(o.parts).length) {
      if (this._sunCache?.entry !== o) {
        const I = r.pv.total_generation ? o.parts.energy?.[r.pv.total_generation] : void 0;
        let O = Ke(I, "change");
        O.size || (O = Ke(r.pv.power ? o.parts.power?.[r.pv.power] : void 0, "mean"));
        const G = Ke(r.house.power ? o.parts.house?.[r.house.power] : void 0, "mean"), yt = Array.from({ length: 24 }, (lt, Tt) => {
          const ke = [...G.entries()].filter(([Lt]) => Lt < s).map(([, Lt]) => Lt[Tt]).filter((Lt) => Lt !== void 0);
          return ke.length >= 3 ? Ya(ke) : void 0;
        }), ht = ((r.forecast.energy_today ? o.parts.forecast?.[r.forecast.energy_today] : void 0) ?? []).filter((lt) => typeof lt.mean == "number" && new Date(lt.start).getHours() === 8).map((lt) => ({ day: At(lt.start), forecast: lt.mean, actual: Ne(O.get(At(lt.start)), 20) })).filter((lt) => lt.actual !== void 0 && lt.day < s);
        this._sunCache = { entry: o, days: O, houseCurve: yt, pairs: ht };
      }
      l = this._sunCache.days, h = this._sunCache.houseCurve, c = this._sunCache.pairs;
    }
    const d = $o(l, s, n.learn_days, n.possible_percentile), u = r.pv.power ? i?.parts.power?.[r.pv.power] : void 0;
    let b = l.get(s);
    if (u?.length) {
      const I = new Array(24).fill(void 0);
      for (const O of u) {
        if (O.start < s || typeof O.mean != "number") continue;
        const G = new Date(O.start).getHours();
        I[G] = (I[G] ?? 0) + Math.max(0, O.mean) / 1e3 / ge;
      }
      b = I;
    }
    const m = Gt(this.hass, t.entities.daily.pv_generation) ?? (b && b.some((I) => I !== void 0) ? b.reduce((I, O) => I + (O ?? 0), 0) : void 0), p = Gt(this.hass, r.forecast.energy_today), g = new Date(e), f = g.getHours() + g.getMinutes() / 60, $ = d.curve.some((I) => I !== void 0) ? d.curve.reduce((I, O, G) => I + (O ?? 0) * Q(f - G, 0, 1), 0) : void 0, _ = So(c) ?? n.typical_deviation / 100;
    let w;
    if (u?.length) {
      let I = 0, O = 0;
      for (const G of u)
        G.start < e - et || G.start >= e || typeof G.mean != "number" || (I += Math.max(0, G.mean) / 1e3 / ge, O += (d.curve[new Date(G.start).getHours()] ?? 0) / ge);
      w = { actual: I, possible: O };
    }
    const L = _o(m, p, d.curve, e, _, w), A = L ? Math.max(0, L.value - (m ?? 0)) : 0, S = ko(b, L ? A : 0, d.curve, e);
    if (!L) for (let I = new Date(e).getHours(); I < 24; I++) S[I] = void 0;
    const M = this.place(), C = M ? Me(s, M.latitude, M.longitude) : void 0, x = t.num.flows.idle_threshold, E = (u ?? []).filter((I) => I.start >= s && typeof I.mean == "number"), z = E.filter((I) => I.mean >= x), k = z.length ? z[0].start : void 0, H = E.reduce((I, O) => !I || O.mean > I.mean ? O : I, void 0);
    let ot;
    if (C) {
      const I = [];
      for (const kt of [...new Set((u ?? []).map((ht) => At(ht.start)))].filter((ht) => ht < s)) {
        const ht = (u ?? []).filter((Tt) => At(Tt.start) === kt && Tt.mean >= x).pop(), lt = M ? Me(kt, M.latitude, M.longitude) : void 0;
        ht && lt && I.push(lt.set - (ht.start + 5 * 6e4));
      }
      const O = I.length >= 3 ? Ya(I) : 0, G = z.length ? z[z.length - 1].start + 5 * 6e4 : void 0;
      ot = e > C.set && (G === void 0 || e - G > 15 * 6e4) && G !== void 0 ? { at: G, over: !0 } : { at: C.set - O, over: !1 };
    }
    return {
      now: e,
      today: s,
      ready: !!o && o.status !== "loading" || !!o?.parts && Object.keys(o.parts).length > 0,
      days: l,
      learned: d,
      done: m,
      possibleSoFar: $,
      forecastToday: p,
      deviation: _,
      pairs: c,
      estimate: L,
      hours: S,
      rise: C?.rise,
      set: C?.set,
      started: k,
      ends: ot,
      fiveRows: u,
      peak: H ? { kw: H.mean / 1e3, at: H.start } : void 0,
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
    return y`<button type="button" class="sun-hint" aria-label=${this.t.sun.info} aria-expanded=${s ? "true" : "false"} @click=${() => {
      this._sunHint = s ? void 0 : t;
    }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2"></circle><path d="M12 11v5.2"></path><circle cx="12" cy="7.6" r="0.7"></circle></svg>
        </button>${s ? y`<div class="sun-note" role="note" @click=${() => {
      this._sunHint = void 0;
    }}>${e}</div>` : T}`;
  }
  /** A ring with the number centred in it and the unit under the number: the shared ring of the kit (`<ed-ring>`). */
  ring(t, e, s, n, o, i) {
    return y`<ed-ring fraction=${t} size=${e} stroke=${s} num=${n} unit=${o} label=${i}></ed-ring>`;
  }
  /** The one panel "Dnes zatím" with the ring, the same in the popup and in the detail. */
  renderSoFar(t) {
    const e = this.t.sun, s = t.estimate, n = s && t.done !== void 0 && s.value > 0 ? Math.min(100, Math.round(t.done / s.value * 100)) : void 0, o = t.done !== void 0 && t.possibleSoFar !== void 0 && t.possibleSoFar >= 0.3 ? Math.round(t.done / t.possibleSoFar * 100) : void 0;
    return y`<div class="sun-sofar">
        <div class="text"><span class="sub">${e.soFar}</span><span class="val">${t.done === void 0 ? D : `${st(t.done)} kWh`}</span><span class="sub">${s ? e.ofEstimate(st(s.value)) : D}</span>${o === void 0 ? T : y`<span class="sub">${e.ofPossibleSoFar(K(o))}</span>`}</div>
        ${n === void 0 ? T : this.ring(n / 100, 40, 6, String(n), "", e.ringLabel(K(n)))}
      </div>`;
  }
  /** Where the sun goes now: the bar and the legend of the sinks (house, car, boiler, battery, grid). */
  renderSunFlow(t, e, s) {
    const n = this.t, o = e.num.flows.idle_threshold, i = re.map((l) => ({ sink: l, watts: t.flows.filter((h) => h.from === "sun" && h.to === l).reduce((h, c) => h + c.watts, 0) })).filter((l) => tt(l.watts, o));
    if (!i.length) return y`<p class="bat-sub">${t.sun === void 0 ? D : n.sun.flowNone}</p>`;
    const r = "kW";
    return y`<div class="mix-bar sun-bar ${s ? "large" : ""}" role="img" aria-label=${i.map((l) => `${n.tile[l.sink]} ${nt(l.watts, r)}`).join(", ")}>${i.map((l) => y`<div style="flex:${l.watts.toFixed(0)} 1 0;background:var(${ae[l.sink]})"></div>`)}</div>
        ${s ? y`<div class="sun-legend" role="group" aria-label=${n.sun.flowTitle}>${i.map((l) => y`<span><span class="name"><i style="background:var(${ae[l.sink]})"></i>${n.tile[l.sink]}</span><b>${nt(l.watts, r)}</b></span>`)}</div>` : T}`;
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
    const i = this.t, r = this.sunView(s), l = tt(n.sun, s.num.flows.idle_threshold), h = this.weatherNow(s), c = l ? h ? i.sun.producingWith(h) : i.sun.producing : n.sun === void 0 ? D : i.idle.sun, d = Math.min(236, e.width), u = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, b = Q(u - d / 2, 0, e.width - d), v = t.side === "L" ? e.left[t.key] : e.right[t.key], m = v - e.tile.h / 2, p = v < e.height / 2, g = p ? `top:${(m + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - m + 8).toFixed(0)}px`;
    return y`<div class="pop bat-pop sun-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${b.toFixed(0)}px;${g};width:${d}px">
        <i class="arrow ${p ? "up" : "down"}" aria-hidden="true" style="left:${(u - b - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${c}</span></div>
        <div class="pop-level">
          <div class="pop-level-row"><span class="pop-label">${i.sun.powerNow}</span><span class="pop-big">${n.sun === void 0 ? D : nt(n.sun, o === "W" && n.sun >= s.num.flows.kw_from ? "kW" : o)}</span></div>
          ${l ? this.renderSunFlow(n, s, !1) : T}
        </div>
        ${this.renderSoFar(r)}
        <div class="pop-rows">
          <div class="pop-row"><span>${i.sun.started}</span><b>${r.started === void 0 ? D : it(r.started)}</b></div>
          <div class="pop-row"><span>${r.ends?.over ? i.sun.ended : i.sun.ends}</span><b>${r.ends === void 0 ? D : it(r.ends.at)}</b></div>
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
    const n = this.t.sun, o = e.rise !== void 0 ? Q(Math.floor(this.hourOf(e.rise) - 0.5), 0, 22) : 6, i = e.set !== void 0 ? Q(Math.ceil(this.hourOf(e.set) + 0.5), o + 2, 24) : 18, r = (i - o) * ge, l = e.today + o * et, h = e.today + i * et, c = (O) => R(Jt + O / (r - 1) * (U - Jt)), d = _t(e.fiveRows, "mean", l, h, r).map((O) => O === void 0 ? void 0 : O / 1e3), u = (O) => o + (O + 0.5) / ge, b = Math.floor((e.now - l) / (h - l) * r), v = F(this.hass, t.entities.pv.power);
    v !== void 0 && d.some((O) => O !== void 0) && b >= 0 && b < r && (d[b] = Math.max(0, v) / 1e3);
    const m = (O, G) => {
      const yt = G - 0.5, kt = Math.floor(yt), ht = O[kt], lt = O[kt + 1];
      if (ht === void 0 && lt === void 0) return;
      const Tt = yt - kt;
      return (ht ?? 0) * (1 - Tt) + (lt ?? 0) * Tt;
    }, p = e.learned.curve.some((O) => O !== void 0), g = Array.from({ length: r }, (O, G) => p ? m(e.learned.curve, u(G)) : void 0), f = e.estimate, $ = f ? Math.max(0, f.value - (e.done ?? 0)) : 0, _ = f && $ > 0 ? (f.low - (e.done ?? 0)) / $ : 1, w = f && $ > 0 ? (f.high - (e.done ?? 0)) / $ : 1, L = (O) => O >= b, A = Array.from({ length: r }, (O, G) => f && L(G) ? m(e.hours.map((yt, kt) => kt >= new Date(e.now).getHours() ? yt : void 0), u(G)) : void 0), S = A.map((O) => O === void 0 ? void 0 : O * _), M = A.map((O, G) => O === void 0 ? void 0 : Math.min(O * w, Math.max(O, g[G] ?? 1 / 0))), C = Math.max(1, ...d.map((O) => O ?? 0), ...g.map((O) => O ?? 0), ...M.map((O) => O ?? 0)), x = { start: l, end: h, x0: Jt, x1: U }, E = 150, z = Ms(C, Math.round((E - 12) / Ss(ua(x)))), k = Math.ceil(C / z) * z, H = (O) => R(E - Q(O, 0, k) / k * (E - 12)), ot = (O) => nt(O * 1e3, "kW"), I = Array.from({ length: Math.round(k / z) }, (O, G) => (G + 1) * z);
    return {
      id: "sun-today",
      h: 170,
      n: r,
      x: c,
      fade: 0,
      start: Q(b / (r - 1) * 100, 0, 100),
      grid: [{ y: E, strong: !0 }, ...I.map((O) => ({ y: H(O) }))],
      labels: [...I.map((O) => ({ y: H(O), text: j(O, O % 1 ? 1 : 0) })), { y: E, text: "0" }],
      body: Y`<defs><linearGradient id="sun-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ed-sun)" stop-opacity="0.28"></stop><stop offset="1" style="stop-color:var(--ed-sun)" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${ks(S, M, c, H)} style="fill:var(--ed-sun);fill-opacity:0.24"></path>
          <path d=${se(g, c, H)} fill="none" style="stroke:var(--ed-secondary)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="0.1 6"></path>
          <path d=${Re(d, c, H, E)} fill="url(#sun-area)"></path>
          <path d=${se(d, c, H)} fill="none" style="stroke:var(--ed-sun)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (O) => d[O] === void 0 ? void 0 : { y: H(d[O]), color: "var(--ed-sun)" },
      read: (O) => {
        const G = it(l + (O + 0.5) * ((h - l) / r)), yt = [d[O] !== void 0 ? ot(d[O]) : A[O] !== void 0 ? `${n.chartLegend.forecast.toLowerCase()} ≈ ${ot(A[O])}` : D];
        return g[O] !== void 0 && yt.push(`${n.possibleShort} ${ot(g[O])}`), `${G} · ${yt.join(" · ")}`;
      },
      time: x,
      from: it(l),
      to: it(h),
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
    ].filter((h) => h.kwh > 5e-3);
  }
  renderSunToday(t, e, s) {
    const n = this.t, o = "kW", i = this.todayChart(t, s), r = this.whereToday(t), l = r?.reduce((c, d) => c + d.kwh, 0) ?? 0, h = e.sun === void 0 ? D : nt(e.sun, o);
    return y`<div class="bat-card">
          <span class="bat-cap">${n.sun.powerNow}</span>
          <span class="bat-huge">${h}</span>
          ${tt(e.sun, t.num.flows.idle_threshold) ? this.renderSunFlow(e, t, !0) : T}
        </div>
        <div class="bat-card rel">
          <div class="bat-card-bar"><span class="sun-title">${n.sun.chartTitle}</span><span class="sun-unit">${n.sun.chartUnit}${this.hint("chart", n.sun.hints.chart)}</span></div>
          ${this.renderChartOrEmpty("sun:five", 170, i)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi sun-kpi-ring">${this.renderSoFar(s)}</div>
          <div class="bat-kpi"><span class="sub">${n.sun.peakToday}</span><span class="val">${s.peak ? nt(s.peak.kw * 1e3, o) : D}</span><span class="sub">${s.peak ? n.sun.at(it(s.peak.at)) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${n.sun.startedLong}</span><span class="val">${s.started === void 0 ? D : it(s.started)}</span><span class="sub">${s.rise === void 0 ? "" : n.sun.sunrise(it(s.rise))}</span></div>
          <div class="bat-kpi"><span class="sub">${s.ends?.over ? n.sun.ended : n.sun.ends}</span><span class="val">${s.ends === void 0 ? D : it(s.ends.at)}</span><span class="sub">${s.set === void 0 ? "" : n.sun.sunset(it(s.set))}</span></div>
        </div>
        ${r ? y`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.sun.whereTitle}</span>${this.hint("where", n.sun.hints.where)}</div>
              <div class="mix-bar sun-bar large" aria-hidden="true">${r.map((c) => y`<div style="flex:${c.kwh.toFixed(3)} 1 0;background:var(${ae[c.key]})"></div>`)}</div>
              <div class="sun-legend" role="group" aria-label=${n.sun.whereTitle}>${r.map((c) => y`<span><span class="name"><i style="background:var(${ae[c.key]})"></i>${n.tile[c.key]}</span><b>${st(c.kwh)}</b></span>`)}</div>
              <span class="bat-sub">${l > 0 ? n.sun.whereUnit : D}</span>
            </div>` : T}`;
  }
  // ----------------------------------------------------------------- Historie
  renderSunRange(t) {
    const e = this.t.sun.hist, s = Qa.map((n) => ({ value: n, label: e.ranges[n] }));
    return y`<ed-segmented .options=${s} .value=${this.sunRange(t)} label=${e.rangeLabel} @hdk-select=${(n) => this.setSunRange(n.detail.value)}></ed-segmented>`;
  }
  /** The complete days of a range, oldest first (today is not in it: a day that is not over would lower every figure). */
  rangeDays(t, e, s = 0) {
    const n = Ze[e];
    return Array.from({ length: n }, (o, i) => Dt(t.today, -(n - i) - s));
  }
  /** The production by day of the range: the totals, the blocks of the day and what was possible. */
  histData(t, e, s) {
    const n = t.num.forecast;
    return this.rangeDays(e, s).map((i) => {
      const r = e.days.get(i), l = Ne(r, 20);
      return { day: i, hours: r, total: l, blocks: l === void 0 ? void 0 : Do(r), possible: Ao(e.days, i, n.learn_days, n.possible_percentile) };
    });
  }
  histChart(t, e, s) {
    const n = this.t.sun.hist, o = this.histData(t, e, s);
    if (!o.some((p) => p.total !== void 0)) return;
    const i = o.length, r = (U - Jt) / i, l = (p) => R(Jt + p * r + r / 2), h = Math.max(1, ...o.map((p) => Math.max(p.total ?? 0, p.possible ?? 0))), c = le(h), d = 150, u = (p) => R(d - Q(p, 0, c) / c * (d - 14)), b = this._sunMode === "parts";
    let v;
    if (b) {
      const p = o.map((S, M) => l(M)), g = o.map((S) => S.blocks), f = g.map((S, M) => S ? M : -1).filter((S) => S >= 0), $ = f.map((S) => g[S].reduce((M, C) => [...M, M[M.length - 1] + C], [0])), _ = Array.from({ length: 6 }, (S, M) => Lo(f.map((C) => p[C]), $.map((C) => u(C[M])))), w = (S) => S.map(([M, C]) => `${R(M)},${R(C)}`).join(" "), L = o.map((S) => S.possible), A = L.some((S) => S !== void 0) ? Re(L, l, u, d) : "";
      v = Y`<path d=${A} style="fill:var(--ed-tile)"></path>
          ${[0, 1, 2, 3, 4].map((S) => Y`<polygon points=${`${w(_[S + 1])} ${w([..._[S]].reverse())}`} style="fill:${Ja[S]}"></polygon>`)}
          ${[1, 2, 3, 4].map((S) => Y`<polyline points=${w(_[S])} fill="none" stroke="#fff" stroke-opacity="0.38" stroke-width="1"></polyline>`)}`;
    } else {
      const p = Math.min(s === "7d" ? 26 : 7, r - 3);
      v = Y`${o.map((g, f) => Y`
          ${g.possible === void 0 ? T : Y`<rect x=${R(l(f) - p / 2)} y=${u(g.possible)} width=${p} height=${R(d - u(g.possible))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-tile)"></rect>`}
          ${g.total === void 0 ? T : Y`<rect x=${R(l(f) - p / 2)} y=${u(g.total)} width=${p} height=${R(Math.max(1, d - u(g.total)))} rx=${s === "7d" ? 5 : 2} style="fill:var(--ed-sun)"></rect>`}
          ${g.total !== void 0 && s === "7d" ? Y`<text x=${l(f)} y=${u(g.total) - 5} text-anchor="middle" style="fill:var(--ed-text)" font-size="11" font-weight="600">${Z(g.total, 1)}</text>` : T}`)}`;
    }
    const m = b ? y`<div class="sun-blocks" role="group">${n.blocks.map((p, g) => y`<span><i style="background:${Ja[g]}"></i><span>${p}</span></span>`)}</div>` : y`<div class="bat-legend sun-legend-row"><span><i class="dot" style="background:var(--ed-sun)"></i>${n.production}</span><span><i class="dot" style="background:var(--ed-tile)"></i>${n.possible}</span></div>`;
    return {
      id: `sun-hist-${b ? "parts" : "total"}`,
      h: 170,
      n: i,
      x: l,
      fade: 0,
      grid: [{ y: d, strong: !0 }, { y: u(c / 2) }, { y: u(c) }],
      labels: [{ y: u(c), text: j(c) }, { y: u(c / 2), text: j(c / 2, c / 2 % 1 ? 1 : 0) }, { y: d, text: "0" }],
      time: { start: o[0].day, end: o[i - 1].day + Et, x0: Jt, x1: U, slot: Et },
      valueNum: (p) => (d - p) / (d - 14) * c,
      valueAt: (p) => j((d - p) / (d - 14) * c, (d - p) / (d - 14) * c % 1 ? 1 : 0),
      body: v,
      dot: (p) => o[p].total === void 0 ? void 0 : { y: u(o[p].total), color: "var(--ed-sun)" },
      read: (p) => {
        const g = o[p], f = fe(g.day);
        if (g.total === void 0) return `${f} · ${D}`;
        if (b && g.blocks) {
          const $ = g.blocks.indexOf(Math.max(...g.blocks));
          return `${f} · ${Z(g.total, 1)} kWh · ${n.mostIn(n.blocks[$])}`;
        }
        return `${f} · ${Z(g.total, 1)} kWh${g.possible ? ` · ${n.ofPossible(K(Math.round(g.total / g.possible * 100)))}` : ""}`;
      },
      from: "",
      to: "",
      legend: m
    };
  }
  /** A half ring: the share of the production in the morning (east) and in the afternoon (west). */
  eastWest(t) {
    const e = this.t.sun.hist, s = 46, n = (r, l, h) => {
      const c = (d) => `${R(70 + s * Math.cos(d * Math.PI / 180))},${R(64 - s * Math.sin(d * Math.PI / 180))}`;
      return Y`<path d="M${c(r)} A${s},${s} 0 0 1 ${c(l)}" fill="none" style="stroke:${h}" stroke-width="10"></path>`;
    }, o = 180 - 180 * t, i = Math.round(t * 100);
    return y`<svg viewBox="0 0 140 78" class="sun-half" role="img" aria-label=${e.eastWestLabel(K(i), K(100 - i))}>${n(180, o + 1.5, "var(--ed-warning)")}${n(o - 1.5, 0, "var(--ed-sun)")}</svg>
        <div class="sun-half-text"><span style="color:color-mix(in srgb, var(--ed-warning) 45%, var(--ed-text))">${K(i)}</span><span style="color:color-mix(in srgb, var(--ed-sun) 45%, var(--ed-text))">${K(100 - i)}</span></div>`;
  }
  renderSunHistory(t, e) {
    const s = this.t.sun, n = t.num.forecast, o = this.sunRange(t), i = this.histData(t, e, o), r = i.filter((k) => k.total !== void 0), l = !e.ready, h = r.reduce((k, H) => k + H.total, 0);
    i.reduce((k, H) => k + (H.possible ?? 0), 0);
    const c = r.filter((k) => k.possible !== void 0), d = c.length ? Math.round(c.reduce((k, H) => k + H.total, 0) / c.reduce((k, H) => k + H.possible, 0) * 100) : void 0, u = this.histChart(t, e, o), b = ["total", "parts"].map((k) => ({ value: k, label: s.hist.modes[k] })), v = r.reduce((k, H) => !k || H.total > k.total ? H : k, void 0), m = r.reduce((k, H) => !k || H.total < k.total ? H : k, void 0), p = (k) => s.hist.dayOfPossible(fe(k.day), k.possible ? K(Math.round(k.total / k.possible * 100)) : D), g = t.entities, f = g.pv.power && this._batData["sun:hist"]?.parts.power?.[g.pv.power] || [], $ = i[0]?.day ?? e.today, _ = f.filter((k) => k.start >= $ && k.start < e.today && typeof k.max == "number").reduce((k, H) => !k || H.max > k.max ? H : k, void 0), w = (k) => {
      const H = k.map((ot) => ot.hours ? ot.hours.filter((I) => (I ?? 0) >= 0.05).length : void 0).filter((ot) => ot !== void 0);
      return H.length ? H.reduce((ot, I) => ot + I, 0) / H.length : void 0;
    }, L = w(i), A = w(this.rangeDays(e, o, Ze[o]).map((k) => ({ hours: e.days.get(k) }))), S = e.rise !== void 0 && e.set !== void 0 ? this.hourOf((e.rise + e.set) / 2) : 12;
    let M = 0, C = 0;
    for (const k of r) k.hours?.forEach((H, ot) => {
      H && (ot + 0.5 < S ? M += H : C += H);
    });
    const x = M + C > 0 ? M / (M + C) : void 0, E = r.filter((k) => k.total > n.good_day).length, z = e.pairs.slice(-7);
    return y`${this.renderSunRange(t)}
        <div class="bat-card">
          <span class="bat-cap">${s.hist.last(Ze[o])}</span>
          <span class="bat-huge sun-huge">${r.length ? `${Z(h, 1)} kWh` : D}</span>
          <span class="bat-sub">${r.length ? y`${d === void 0 ? T : y`<b class="sun-yellow">${s.hist.ofPossible(K(d))}</b> · `}${s.hist.average(`${Z(h / r.length, 1)} kWh`)}` : D}</span>
        </div>
        <div class="bat-card">
          <div class="bat-card-bar sun-mode"><span class="sun-title">${s.hist.chartTitle}</span>
            <ed-segmented compact .options=${b} .value=${this._sunMode} label=${s.hist.modeLabel} @hdk-select=${(k) => {
      this._sunMode = k.detail.value;
    }}></ed-segmented>
          </div>
          ${this.renderChartOrEmpty("sun:hist", 170, u)}
        </div>
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${s.hist.best}</span><span class="val">${v ? `${Z(v.total, 1)} kWh` : D}</span><span class="sub">${v ? p(v) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.worst}</span><span class="val">${m ? `${Z(m.total, 1)} kWh` : D}</span><span class="sub">${m ? p(m) : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.peak}</span><span class="val">${_ ? nt(_.max, "kW") : D}</span><span class="sub">${_ ? `${fe(_.start)} ${s.at(it(_.start))}` : ""}</span></div>
          <div class="bat-kpi"><span class="sub">${s.hist.length}</span><span class="val">${L === void 0 ? D : s.hist.lengthValue(Z(L, 1))}</span><span class="sub">${A === void 0 ? "" : (o === "7d" ? s.hist.before7 : s.hist.before30)(Z(A, 1))}</span></div>
        </div>
        <div class="sun-two">
          <div class="bat-card"><span class="bat-cap">${s.hist.eastWest}</span>${x === void 0 ? y`<span class="bat-sub">${D}</span>` : this.eastWest(x)}</div>
          <div class="bat-card"><span class="bat-cap">${s.hist.goodDays}</span><span class="val big">${r.length ? s.hist.goodOf(E, r.length) : D}</span><span class="bat-sub">${s.hist.over(j(n.good_day))}</span>
            <div class="sun-dots" aria-hidden="true">${r.map((k) => y`<i class=${k.total > n.good_day ? "on" : ""}></i>`)}</div></div>
        </div>
        ${z.length >= 3 ? this.renderAccuracy(z, e) : T}`;
  }
  renderAccuracy(t, e) {
    const s = this.t.sun, n = le(Math.max(...t.flatMap((h) => [h.forecast, h.actual]))), o = 310, i = 60, r = 14, l = o / t.length;
    return y`<div class="bat-card rel">
        <div class="bat-card-bar"><span class="bat-cap">${s.hist.accuracyTitle}</span>${this.hint("acc", s.hints.acc)}</div>
        <div class="sun-acc"><b>±${K(Math.round(e.deviation * 100))}</b><span class="bat-sub">${s.hist.accuracyAverage(e.pairs.length)}</span></div>
        <svg viewBox="0 0 ${o + Rt} 80" class="sun-pairs" role="img" aria-label=${s.hist.accuracyLabel}>
          ${Array.from({ length: t.length + 1 }, (h, c) => Y`<line x1=${R(c * l)} y1="0" x2=${R(c * l)} y2=${i} class="grid"></line>`)}
          <line x1="0" y1=${i - 25} x2=${o} y2=${i - 25} class="grid"></line>
          <line x1="0" y1=${i - 50} x2=${o} y2=${i - 50} class="grid"></line>
          <text x=${o + 5} y=${i - 46} style="fill:var(--ed-secondary)" font-size="12">${j(n)} kWh</text>
          <text x=${o + 5} y=${i - 21} style="fill:var(--ed-secondary)" font-size="12">${j(n / 2, n / 2 % 1 ? 1 : 0)}</text>
          <text x=${o + 5} y=${i + 4} style="fill:var(--ed-secondary)" font-size="12">0</text>
          <line x1="0" y1=${i} x2=${o} y2=${i} class="axis"></line>
          ${t.map((h, c) => {
      const d = c * l + (l - 2 * r - 2) / 2, u = (b) => R(b / n * 50);
      return Y`<rect x=${R(d)} y=${R(i - u(h.forecast))} width=${r} height=${u(h.forecast)} rx="3" style="fill:var(--ed-off)"></rect>
              <rect x=${R(d + r + 2)} y=${R(i - u(h.actual))} width=${r} height=${u(h.actual)} rx="3" style="fill:var(--ed-sun)"></rect>
              <text x=${R(d + r + 1)} y="76" text-anchor="middle" style="fill:var(--ed-secondary)" font-size="11">${new Intl.DateTimeFormat(this._i18n.locale, { weekday: "short" }).format(h.day)}</text>`;
    })}
        </svg>
        <div class="bat-legend"><span><i class="dot" style="background:var(--ed-off)"></i>${s.hist.forecast}</span><span><i class="dot" style="background:var(--ed-sun)"></i>${s.hist.actual}</span></div>
      </div>`;
  }
  // ----------------------------------------------------------------- Výhled
  renderSunOutlook(t, e) {
    const s = this.t.sun, n = s.outlook, o = t.num.forecast, i = t.entities, r = e.estimate, l = o.good_power / 1e3, h = `${Z(o.good_power / 1e3, o.good_power % 1e3 ? 1 : 0)} kW`, c = r && e.done !== void 0 && r.value > 0 ? Math.min(100, Math.round(e.done / r.value * 100)) : void 0, d = r ? { low: 1, medium: 2, high: 3 }[r.certainty] : 0, u = [i.forecast.energy_today, i.forecast.energy_tomorrow, i.forecast.energy_day_2, i.forecast.energy_day_3, i.forecast.energy_day_4], b = this._sunWeather?.days ?? [], v = u.map((x, E) => {
      const z = Dt(e.today, E), k = E === 0 ? r?.value : Gt(this.hass, x), H = E === 0 ? e.hours : k === void 0 ? void 0 : xo(k, e.learned.curve), ot = E === 0 ? this.weatherGroup(i.forecast.weather ? pt(this.hass, i.forecast.weather)?.state : void 0) : this.weatherGroup(b.find((I) => I.day === z)?.condition);
      return { i: E, day: z, kwh: k, hours: H, condition: ot };
    }).filter((x) => x.kwh !== void 0 || x.i === 0), m = v.filter((x) => x.kwh !== void 0), p = (x) => x ? Mo(x, o.strip_from, o.strip_to, l) : void 0, g = m.filter((x) => x.i > 0 || m.length === 1).reduce((x, E) => !x || E.kwh > x.kwh ? E : x, void 0), f = g ? p(g.hours) : void 0, $ = this.place(), _ = $ ? Me(e.today, $.latitude, $.longitude) : void 0, w = $ ? Me(Dt(e.today, 1), $.latitude, $.longitude) : void 0, L = _ ? Math.round((_.set - _.rise) / 6e4) : void 0, A = _ && w ? Math.round((w.set - w.rise - (_.set - _.rise)) / 6e4) : void 0, S = this.evening(t, e), M = Array.from({ length: o.strip_to - o.strip_from + 1 }, (x, E) => o.strip_from + E), C = new Date(e.now).getHours();
    return y`<div class="bat-card rel">
          <div class="sun-hero">
            <div class="text">
              <span class="bat-cap">${n.heroTitle}</span>
              <span class="sun-est"><span class="approx">≈</span> ${r ? `${st(r.value)} kWh` : D}</span>
              <span class="bat-sub">${r ? n.between(st(r.low), st(r.high)) : ""}</span>
              ${r ? y`<span class="sun-conf"><span class="level" aria-hidden="true">${[1, 2, 3].map((x) => y`<i class=${x <= d ? "on" : ""}></i>`)}</span><b>${n.certainty[r.certainty]}</b>${this.hint("conf", s.hints.conf)}</span>` : T}
            </div>
            ${c === void 0 ? T : this.ring(c / 100, 76, 8, String(c), "", s.ringLabel(K(c)))}
          </div>
        </div>
        ${v.length > 1 ? y`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.fiveTitle}</span>${this.hint("five", s.hints.five(h))}</div>
              <div class="sun-five">
                <div class="sun-five-head"><span class="day"></span><span class="strip">${M.map((x) => y`<span>${x % 3 === 0 ? x : ""}</span>`)}</span><span class="end">kWh</span></div>
                ${v.map((x) => {
      const E = p(x.hours);
      return y`<div class="sun-five-row">
                    <span class="day"><b>${x.i === 0 ? n.today : ee(x.day)}</b><span>${x.condition ? s.weather[x.condition] : ""}</span></span>
                    <span class="strip" aria-hidden="true">${M.map((z) => {
        const k = x.hours?.[z], H = k === void 0 ? "none" : k >= l ? "strong" : k >= l * 0.35 ? "mid" : k >= l * 0.075 ? "faint" : "none";
        return y`<i class="${H} ${x.i === 0 && z === C ? "now" : ""}"></i>`;
      })}</span>
                    <span class="end"><b>${x.kwh === void 0 ? D : `${x.i ? "≈ " : ""}${st(x.kwh)}`}</b><span class=${E ? "" : "off"}>${x.kwh === void 0 ? "" : E ? n.window(E[0], E[1]) : n.below(h)}</span></span>
                  </div>`;
    })}
              </div>
              <div class="bat-legend wrap"><span><i class="swatch" style="background:var(--ed-sun)"></i>${n.strong(h)}</span><span><i class="swatch" style="background:var(--ed-sun);opacity:.38"></i>${n.weak}</span></div>
            </div>` : T}
        ${S ? y`<div class="bat-card rel">
              <div class="bat-card-bar"><span class="bat-cap">${n.eveningTitle}</span>${this.hint("eve", s.hints.eve)}</div>
              <div class="bat-list">${S.map((x) => y`<div class="bat-line sun-line"><span><i style="background:var(${x.color})"></i>${x.label}</span><b>${x.value}</b></div>`)}
              </div>
            </div>` : T}
        <div class="bat-kpis">
          <div class="bat-kpi"><span class="sub">${n.dayLength}</span><span class="val">${L === void 0 ? D : n.hoursMinutes(Math.floor(L / 60), L % 60)}</span><span class="sub">${A === void 0 ? "" : n.dayChange(A)}</span></div>
          <div class="bat-kpi"><span class="sub">${n.bestDay}</span><span class="val">${g ? g.i === 0 ? n.today : ee(g.day) : D}</span><span class="sub">${g ? n.bestSub(st(g.kwh), f ? n.window(f[0], f[1]) : "") : ""}</span></div>
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
    const r = Co({
      now: e.now,
      soc: o,
      capacity: t.num.battery.capacity,
      reserve: this.batteryReserve(t),
      sun: e.hours,
      house: i,
      efficiency: s.efficiency / 100,
      eveningHour: s.evening_hour,
      morningHour: s.morning_hour,
      car: n.wallbox.power && ps(ct(this.hass, n.wallbox.status)) !== "disconnected" ? { startSoc: s.car_start_soc, stopSoc: s.car_stop_soc, minSun: s.car_min_sun, watts: t.num.wallbox.power_min } : void 0
    }), l = this.t.sun.outlook, h = [], c = it(e.today + s.evening_hour * et);
    if (r.socAtEvening !== void 0 && (h.push({ color: "--ed-battery", label: l.batteryNow, value: K(Math.round(o)) }), h.push({ color: "--ed-sun", label: l.sunUntil(c), value: `≈ ${st(r.sunUntilEvening)} kWh` }), h.push({ color: "--ed-house", label: l.houseUntil(c), value: `≈ ${st(r.houseUntilEvening)} kWh` })), r.fullAt !== void 0 && h.push({ color: "--ed-battery", label: l.full, value: `≈ ${it(r.fullAt)}` }), r.socAtEvening !== void 0 && h.push({ color: "--ed-battery", label: l.batteryAt(it(e.today + s.evening_hour * et)), value: `≈ ${K(Math.round(r.socAtEvening))}` }), r.carTotal > 0) {
      const d = this.carKwhPerKm(t);
      h.push({ color: "--ed-car", label: l.carSun, value: `≈ ${st(r.carSun)} kWh${d ? ` · ${j(r.carSun / d)} km` : ""}` });
    }
    return r.socAtMorning !== void 0 && h.push({ color: "--ed-battery", label: l.batteryAt(it(Dt(e.today, 1) + s.morning_hour * et)), value: `≈ ${K(Math.round(r.socAtMorning))}` }), h;
  }
}, Te = 5 * 6e4, Ho = 24 * et, Bo = 7, ts = 5, jo = ["overcurrent", "overheating", "overpowering", "overvoltage"], Qt = ["#5E5CE6", "#E8457A", "#1E9E96", "#B8803A", "#5E9E34", "#6F8FAF", "#D9503C", "#A064C8", "#8F8C2A"], es = "ha-energie-dashboard.house-range", Po = "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12C19,15.87 15.87,19 12,19C8.13,19 5,15.87 5,12C5,9.82 6.01,7.87 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,9.26 19.77,6.82 17.83,5.17Z", De = (a) => `\0group:${a}`, Ro = "mdi:power-plug", No = (a) => class extends a {
  // ----------------------------------------------------------------- the appliances
  /** The appliances: the devices that have the label and measure power, and the ones named in house.appliances with their power sensor; the others (a vacuum) drop out. */
  appliances(t) {
    const e = this.hass, s = e?.devices ?? {}, n = e?.entities ?? {}, o = t.houseLabel.toLowerCase(), i = (c) => !!c?.some((d) => d.toLowerCase() === o), r = /* @__PURE__ */ new Set();
    for (const [c, d] of Object.entries(s)) i(d.labels) && r.add(c);
    for (const c of Object.values(n)) c.device_id && i(c.labels) && r.add(c.device_id);
    const l = (c) => {
      const d = { problems: [] }, u = {};
      for (const [b, v] of Object.entries(n)) {
        if (!c || v.device_id !== c) continue;
        const m = this.hass?.states?.[b];
        if (!m) continue;
        const p = m.attributes?.icon;
        typeof p == "string" && p && (u[b] = p);
        const g = m.attributes?.device_class;
        if (b.startsWith("sensor."))
          g === "power" && !d.power ? d.power = b : g === "energy" && m.attributes?.state_class === "total_increasing" && !b.endsWith("_returned") && !d.energy && (d.energy = b);
        else if (b.startsWith("binary_sensor.") && g === "problem") {
          const f = jo.find(($) => b.endsWith(`_${$}`));
          f && d.problems.push({ id: b, kind: f });
        } else b.startsWith("switch.") && !d.plug && (d.plug = b);
      }
      return d.icon = d.plug && u[d.plug] || d.power && u[d.power] || Object.values(u)[0], d;
    }, h = [];
    for (const c of r) {
      const d = s[c], u = (d?.name_by_user || d?.name || c).trim(), b = l(c);
      if (!b.power) continue;
      const v = t.appliances.find((m) => Ea(m.name).some((p) => p.toLowerCase() === u.toLowerCase()));
      h.push({ name: u, label: v?.name, deviceId: c, warnAfter: v?.warn_after, power: v?.power ?? b.power, energy: v?.energy ?? b.energy, plug: b.plug, icon: this.iconOf(v?.icon, b.icon, [v?.power ?? b.power, v?.energy ?? b.energy, v?.running, v?.start_energy]), problems: b.problems, running: v?.running, startEnergy: v?.start_energy });
    }
    for (const c of t.appliances) {
      if (!c.power || h.some((b) => b.power === c.power)) continue;
      const d = n[c.power]?.device_id ?? void 0, u = l(d);
      h.push({ name: Ea(c.name)[0], label: c.name, deviceId: d ?? c.power, power: c.power, energy: c.energy ?? u.energy, plug: u.plug, icon: this.iconOf(c.icon, u.icon, [c.power, c.energy, c.running, c.start_energy]), problems: u.problems, running: c.running, startEnergy: c.start_energy, warnAfter: c.warn_after });
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
    const e = this.listed(t).map((n) => ({ key: n.name, name: this.applianceName(n), icon: n.icon, power: n.power, running: n.running, cycle: !!n.running, warnAfter: n.warnAfter })), s = t.groups.flatMap((n, o) => n.appliances.map((i) => ({ key: `${De(o)}:${i.power}`, name: this.pickText(i.name) ?? "", icon: n.icon, power: i.power, running: i.running, cycle: !1, warnAfter: i.warn_after })));
    return [...e, ...s];
  }
  /** The icon of an appliance: the configured one, the one of the entities of its device, the one of its helpers, otherwise a plug. */
  iconOf(t, e, s) {
    const n = s.map((o) => o ? this.hass?.states?.[o]?.attributes?.icon : void 0).find((o) => typeof o == "string" && o !== "");
    return t ?? e ?? n ?? Ro;
  }
  /** The name of the appliance in the language of the card. */
  applianceName(t) {
    return this.pickText(t.label) ?? t.name;
  }
  /** The icon of the appliance (Home Assistant draws it from its name). */
  renderApplianceIcon(t) {
    return t.icon ? y`<ha-icon class="house-icon" icon=${t.icon}></ha-icon>` : T;
  }
  /** An appliance that draws no power: the grey power symbol instead of a word. */
  renderIdleMark() {
    return y`<span class="house-idle" role="img" aria-label=${this.t.house.idle}><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${Po}></path></svg></span>`;
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
    return s === void 0 ? void 0 : tt(s, e.num.flows.idle_threshold);
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
    return e !== void 0 && o(e) === i ? n : i === r ? e === void 0 ? n : `${s.house.todayWord} ${n}` : i === o(r - 12 * et) ? `${s.house.yesterday} ${n}` : `${ee(t)} ${n}`;
  }
  /** The energy of the cycle: the counter minus the value saved at the start. */
  cycleKwh(t) {
    const e = Gt(this.hass, t.energy), s = F(this.hass, t.startEnergy);
    return e === void 0 || s === void 0 ? void 0 : Math.max(0, e - s);
  }
  /** The status line of an appliance: "Běží · 31 min", "Skončilo · před 40 min" (up to 24 h) or nothing. */
  applianceStatus(t, e) {
    const s = this.t, n = this.applianceOn(t, e);
    if (n === void 0) return;
    const o = this.cycleTimes(t, n);
    if (n) return t.running && o.minutes !== void 0 ? s.house.running(ne(o.minutes)) : s.house.runningNoCycle;
    if (t.running && o.end !== void 0 && Date.now() - o.end <= Ho) return s.house.ended(ne(Math.max(0, Math.round((Date.now() - o.end) / 6e4))));
  }
  // ----------------------------------------------------------------- alerts
  /** One alert for each appliance whose socket reports a fault, and for each one that runs longer than its `warn_after` (CURRENT_SPEC.md, Upozornění). */
  houseAlerts(t) {
    const e = this.appliances(t).flatMap((n) => n.problems.filter((i) => ct(this.hass, i.id) === "on").map((i) => ({ kind: "warn", title: this.applianceName(n), text: this.t.house.problem[i.kind] }))), s = this.popupItems(t).flatMap((n) => {
      if (!n.warnAfter || !n.running || this.applianceOn(n, t) !== !0) return [];
      const o = this.cycleTimes(n, !0).minutes;
      return o !== void 0 && o >= n.warnAfter ? [{ kind: "warn", title: n.name, text: this.t.house.runningLong(ne(o)) }] : [];
    });
    return [...e, ...s];
  }
  // ----------------------------------------------------------------- the popup
  /**
   * The rows are decided when the popup opens (uživatel 9. 11. 2026, "Q1 B"): at most five, the running cycles always among them, the rest by power
   * (an appliance or a member of a group runs by its helper, without one by its power above the threshold); shown from the largest power.
   */
  freezeHouse(t) {
    const e = (r) => F(this.hass, r.power) ?? 0, s = (r, l) => e(l) - e(r), n = this.popupItems(t).filter((r) => this.applianceOn(r, t) === !0), o = n.filter((r) => r.cycle).sort(s).slice(0, ts), i = n.filter((r) => !r.cycle).sort(s).slice(0, ts - o.length);
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
      tt(i, t.num.flows.idle_threshold) && e.push({ key: De(n), watts: i });
    }), e.sort((s, n) => n.watts - s.watts).map((s) => s.key);
  }
  /** The order of the table of each group, decided when the detail opens: from the largest power now, the unknown ones last (uživatel 9. 11. 2026, "Q19 ok"). */
  memberOrder(t) {
    return Object.fromEntries(
      t.groups.map((e, s) => [s, e.appliances.map((n) => ({ power: n.power, watts: F(this.hass, n.power) ?? -1 })).sort((n, o) => o.watts - n.watts).map((n) => n.power)])
    );
  }
  renderHousePopup(t, e, s, n) {
    const o = this.t, i = s.num.flows.idle_threshold, r = tt(n.other, i), l = this.today(s), h = this.popupItems(s), c = (this._houseFrozen ?? []).map(($) => h.find((_) => _.key === $)).filter(($) => !!$), d = Math.min(300, e.width), u = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, b = Q(u - d / 2, 0, e.width - d), v = t.side === "L" ? e.left[t.key] : e.right[t.key], m = v - e.tile.h / 2, p = v < e.height / 2, g = p ? `top:${(m + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - m + 8).toFixed(0)}px`, f = r ? nt(n.other, "W").replace(" ", " ") : n.other === void 0 ? D : o.idle.house;
    return y`<div class="pop bat-pop house-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${b.toFixed(0)}px;${g};width:${d}px">
        <i class="arrow ${p ? "up" : "down"}" aria-hidden="true" style="left:${(u - b - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${f}</span></div>
        <div class="pop-rows">
          ${c.map(($) => {
      const _ = F(this.hass, $.power), w = this.applianceOn($, s), L = this.listed(s).find((x) => x.name === $.key), A = L ? this.applianceStatus(L, s) : void 0, S = this.cycleTimes($, w).minutes, M = w && $.running && S !== void 0 ? `${$.name} · ${ne(S)}` : $.name, C = _ === void 0 ? y`<b>${D}</b>` : tt(_, i) || w || !$.cycle ? y`<b>${nt(_, "W").replace(" ", " ")}</b>` : this.renderIdleMark();
      return y`<div class="house-app" title=${A ?? ""}><span class="ell">${$.icon ? y`<ha-icon class="house-icon" icon=${$.icon}></ha-icon>` : T}${M}</span>${C}</div>`;
    })}
          <div class="pop-row"><span>${o.pop.rows.consumed}</span><b>${l.house === void 0 ? D : `${st(l.house)} kWh`}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openHouseDetail()}><span>${o.house.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
  }
  // ----------------------------------------------------------------- state and history
  houseRange(t) {
    if (this._houseRange) return this._houseRange;
    try {
      const e = localStorage.getItem(es);
      if (e && Pe.includes(e)) return e;
    } catch {
    }
    return t.houseRange;
  }
  setHouseRange(t) {
    this._houseRange = t, this._batScrub = {};
    try {
      localStorage.setItem(es, t);
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
    if ((this._pop === "house" || this._pop === "car" || this._pop === "boil" || this._all || this._houseDetail) && (!this._houseToday || Date.now() - this._houseToday.at > Te || this._houseDetail && !this._houseToday.detail) && this.fetchHouseToday(t), this._houseDetail && this._houseTab === "hist") {
      const n = this.houseRange(t), o = `hist:${n}`, i = this._houseData[o];
      (!i || i.status !== "loading" && Date.now() - i.at > Te) && this.fetchHouse(t, o, n, i);
    }
    if (this._houseDetail && this._houseTab === "now") {
      const n = this._houseData.day;
      (!n || n.status !== "loading" && Date.now() - n.at > Te) && this.fetchHouse(t, "day", "day", n);
    }
    const s = this.popupItems(t).some((n) => n.warnAfter && n.running);
    if (this._houseDetail && this._houseTab === "now" || this._pop === "house" || s) {
      const n = this._houseCycles;
      (!n || Date.now() - n.at > Te) && this.fetchCycles(t);
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
        const c = await jt(e, [...n, ...l], h.getTime(), s, "5minute", ["mean"]), d = o.length || r.length ? await jt(e, [...o, ...r], h.getTime(), s, "5minute", ["change"]) : {}, u = {};
        for (const m of i)
          if (m.energy) {
            const p = d[m.energy];
            St(p, "change") && (u[m.power] = p.reduce((g, f) => g + (typeof f.change == "number" ? f.change : 0), 0));
          } else {
            const p = c[m.power];
            St(p, "mean") && (u[m.power] = p.reduce((g, f) => g + (typeof f.mean == "number" ? f.mean : 0), 0) / 12 / 1e3);
          }
        const b = {};
        for (const m of o) {
          const p = d[m];
          St(p, "change") && (b[m] = p.reduce((g, f) => g + (typeof f.change == "number" ? f.change : 0), 0));
        }
        const v = (m) => {
          const p = m ? c[m] : void 0;
          return St(p, "mean") ? p.reduce((g, f) => g + (typeof f.mean == "number" ? f.mean : 0), 0) / 12 / 1e3 : void 0;
        };
        this._houseToday = { at: s, car: v(t.entities.wallbox.power), boil: v(t.entities.boiler.power), apps: b, groups: u, detail: this._houseDetail };
      } catch {
        this._houseToday = { at: s, detail: this._houseDetail };
      }
  }
  /** The first moment and the number of bins of the chart: today by hours from midnight to midnight, or whole days up to today (uživatel 9. 11. 2026, "Q8 ok": 1 den = od půlnoci). */
  houseWindow(t, e) {
    if (t === "day" || t === "1d") {
      const s = new Date(e);
      return s.setHours(0, 0, 0, 0), { start: s.getTime(), bins: 24, step: et };
    }
    return { ...this.histWindow(t, e), step: Et };
  }
  async fetchHouse(t, e, s, n) {
    const o = this.hass;
    if (!o) return;
    const i = Date.now();
    this._houseData = { ...this._houseData, [e]: { status: "loading", at: i, parts: n?.parts ?? {} } };
    try {
      const r = this.houseWindow(s, i), l = s === "1d" || s === "day" ? "hour" : "day", h = (...w) => w.filter((L) => !!L), c = t.entities, d = r.start + Math.min(r.bins - 1, Math.max(0, Math.floor((i - r.start) / r.step))) * r.step, u = this.listed(t), b = t.groups.flatMap((w) => w.appliances), v = s === "day", m = h(...v ? [] : [c.pv.total_generation, c.battery.total_discharge, c.battery.total_charge, c.grid.total_import, c.grid.total_export], ...u.map((w) => w.energy), ...b.map((w) => w.energy)), p = h(...v ? [] : [c.wallbox.power, c.boiler.power], ...u.filter((w) => !w.energy).map((w) => w.power), ...b.filter((w) => !w.energy).map((w) => w.power)), [g, f, $, _] = await Promise.all([
        jt(o, m, r.start, i, l, ["change"]),
        jt(o, p, r.start, i, l, ["mean"]),
        // The running bin (hour or day) has no row in the long-term statistics yet: the 5-minute rows fill it.
        jt(o, m, d, i, "5minute", ["change"]),
        jt(o, p, d, i, "5minute", ["mean"])
      ]);
      this._houseData = { ...this._houseData, [e]: { status: "ready", at: i, parts: { energy: g, power: f, nowCounters: $, nowPowers: _ } } };
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
          start_time: new Date(s - Bo * Et).toISOString(),
          end_time: new Date(s).toISOString(),
          entity_ids: n,
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        }), i = {};
        for (const [r, l] of Object.entries(o ?? {})) {
          const h = [], c = [];
          let d, u;
          for (const b of l) {
            const v = b.s ?? b.state, m = b.lu ?? b.last_updated, p = typeof m == "number" ? m * 1e3 : m ? Date.parse(m) : NaN;
            if (Number.isFinite(p)) {
              if (v === void 0 || v === "unavailable" || v === "unknown") {
                d !== void 0 && u === void 0 && (u = p);
                continue;
              }
              d !== void 0 && v !== d && (v === "on" ? h.push(p) : v === "off" && c.push(d === "on" && u !== void 0 ? u : p)), d = v, u = void 0;
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
    const s = this.t, n = this.houseRange(t), o = Pe.map((b) => ({ value: b, label: s.bat.ranges[b] })), i = ["now", "hist"].map((b) => ({ value: b, label: s.house.tabs[b] })), r = "W", l = this._houseOrder ?? [], h = [
      ...this.listed(t).map((b) => ({ key: b.name, label: this.applianceName(b), group: !1, render: () => this.renderApplianceRow(b, t, r) })),
      ...t.groups.map((b, v) => ({ key: De(v), label: "", group: !0, render: () => this.renderGroupRow(b, v) }))
    ].sort((b, v) => {
      const m = l.indexOf(b.key), p = l.indexOf(v.key);
      return m >= 0 || p >= 0 ? (m < 0 ? 999 : m) - (p < 0 ? 999 : p) : Number(b.group) - Number(v.group) || (b.group ? 0 : b.label.localeCompare(v.label));
    }), c = this.houseChart(t, n), d = this._houseData[`hist:${n}`], u = d?.status === "loading" && !Object.keys(d.parts).length;
    return y`<section class="bat-detail house-detail" role="dialog" aria-modal="true" aria-label=${s.house.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeHouseDetail()}>‹ ${s.house.back}</button>
          <h2>${s.house.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeHouseDetail()}>${s.house.done}</button>
        </div>
        <ed-segmented .options=${i} .value=${this._houseTab} label=${s.house.tabsLabel} @hdk-select=${(b) => {
      this._houseTab = b.detail.value, this._batScrub = {};
    }}></ed-segmented>
        ${this._houseTab === "now" ? y`<div class="bat-card"><span class="bat-cap">${s.house.nowLabel}</span>
              <span class="house-hero">${e.other === void 0 ? D : nt(e.other, r)}</span></div>
            <div class="house-list"><span class="bat-cap">${s.house.appliances}</span>
              ${h.length ? h.map((b) => b.render()) : y`<div class="bat-card"><span>${s.house.none}</span><span class="bat-sub">${this.labelDiagnostics(t)}</span></div>`}
            </div>` : y`<ed-segmented .options=${o} .value=${n} label=${s.house.rangeLabel} @hdk-select=${(b) => this.setHouseRange(b.detail.value)}></ed-segmented>
            <div class="bat-card"><span class="bat-cap">${n === "1d" ? s.house.chartHours : s.house.chartDays} · <span class="unit">kWh</span></span>
              ${c ? this.renderChart(c) : y`<div class="bat-nodata" style="aspect-ratio:${U} / 220">${u ? D : s.bat.noDataChart}</div>`}
            </div>`}
      </section>`;
  }
  /**
   * A group of appliances (house.groups): one row. Closed: the power now (the sum) and the energy of today; open: every appliance with its
   * power now and its energy of today. No cycles, no threshold: what the appliances draw is shown as it is. A sum counts only when every appliance is known.
   */
  renderGroupRow(t, e) {
    const s = De(e), n = this._houseOpen.includes(s), o = this._houseMembers?.[e] ?? [], i = t.appliances.map((d) => ({ power: d.power, name: this.pickText(d.name) ?? "", watts: F(this.hass, d.power), kwh: this._houseToday?.groups?.[d.power] })).sort((d, u) => (o.indexOf(d.power) < 0 ? 999 : o.indexOf(d.power)) - (o.indexOf(u.power) < 0 ? 999 : o.indexOf(u.power))), r = (d) => d.every((u) => u !== void 0) ? d.reduce((u, b) => u + b, 0) : void 0, l = (d) => d === void 0 ? D : nt(d, "W").replace(" ", " "), h = (d) => d === void 0 ? D : `${st(d)} kWh`, c = this.t;
    return y`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${n ? "true" : "false"} @click=${() => {
      this._houseOpen = n ? this._houseOpen.filter((d) => d !== s) : [...this._houseOpen, s];
    }}>
          <ha-icon class="house-icon" icon=${t.icon}></ha-icon>
          <span class="bat-col"><span class="bat-label">${this.pickText(t.name) ?? ""}</span><span class="bat-sub">${c.house.today} ${h(r(i.map((d) => d.kwh)))}</span></span>
          <span class="bat-value">${l(r(i.map((d) => d.watts)))}</span>
          <svg class="chev ${n ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${n ? y`<div class="house-body">
            <div class="house-cook">
              <span class="house-cook-head"></span><span class="house-cook-head">${c.house.nowCol}</span><span class="house-cook-head">${c.house.totalCol}</span>
              ${i.map((d) => y`<span class="house-cook-name">${d.name}</span><b>${l(d.watts)}</b><b>${h(d.kwh)}</b>`)}
            </div>
            ${this.renderDayChart(t.appliances.map((d, u) => ({ name: this.pickText(d.name) ?? "", energy: d.energy, power: d.power, color: Qt[u % Qt.length] })))}
          </div>` : T}
      </div>`;
  }
  renderApplianceRow(t, e, s) {
    const n = this.t, o = this._houseOpen.includes(t.name), i = F(this.hass, t.power), r = this.applianceOn(t, e), l = this.applianceStatus(t, e) ?? (r === !1 ? n.house.notRunning : D), h = i !== void 0 && tt(i, e.num.flows.idle_threshold), c = i === void 0 ? y`<span class="bat-value">${D}</span>` : h ? y`<span class="bat-value">${nt(i, s)}</span>` : r ? y`<span class="bat-value">${j(i)}\u00a0W</span>` : this.renderIdleMark(), d = this.cycleTimes(t, r), u = this.cycleKwh(t), b = /* @__PURE__ */ new Date();
    b.setHours(0, 0, 0, 0);
    const v = t.running ? this._houseCycles?.byId[t.running] : void 0, m = v ? v.starts.filter((M) => M >= b.getTime()).length : void 0, p = Math.max(0, this.listed(e).findIndex((M) => M.name === t.name)), g = Qt[p % Qt.length], f = (M, C) => `${this.stamp(M)} – ${C}`, $ = t.running && d.start !== void 0 ? y`<div class="house-line wrap"><span>${r ? n.house.currentCycle : n.house.lastCycle}</span><b><span>${f(d.start, r ? n.house.axisTo : this.stamp(d.end ?? d.start, d.start))}</span>${u !== void 0 ? y` <span>·\u00a0${st(u)}\u00a0kWh</span>` : T}</b></div>` : t.running && d.end !== void 0 && !r ? y`<div class="house-line wrap"><span>${n.house.lastCycle}</span><b>${n.house.endedAt(this.stamp(d.end))}</b></div>` : T, _ = this.renderDayChart([{ name: this.applianceName(t), energy: t.energy, power: t.power, color: g }]), w = t.energy ? this._houseToday?.apps?.[t.energy] : void 0, L = t.plug ? ct(this.hass, t.plug) : void 0, A = t.problems.find((M) => ct(this.hass, M.id) === "on"), S = (M, C) => y`<div class="house-line"><span>${M}</span><b>${C}</b></div>`;
    return y`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${o ? "true" : "false"} @click=${() => {
      this._houseOpen = o ? this._houseOpen.filter((M) => M !== t.name) : [...this._houseOpen, t.name];
    }}>
          ${this.renderApplianceIcon(t)}
          <span class="bat-col"><span class="bat-label">${this.applianceName(t)}</span><span class="bat-sub">${l}</span></span>
          ${c}
          <svg class="chev ${o ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${o ? y`<div class="house-body">
              ${A ? S(n.house.problem[A.kind], "") : T}
              ${$}
              ${t.running && m !== void 0 ? S(n.house.today, n.house.cyclesCount(m, w === void 0 ? "" : st(w))) : T}
              ${_}
              ${L === "off" ? S(n.house.plug, n.house.plugOff) : T}
            </div>` : T}
      </div>`;
  }
  /** "Co se dělo": the consumption of the house (without the car and the boiler) in kWh per hour or per day, broken down by the appliances. */
  /** The energy per bin of the statistics of a view: from the counter (the running bin from its 5-minute rows), otherwise from the mean power. */
  houseSeries(t, e) {
    const s = t.at, n = this.houseWindow(e, s), o = n.bins, i = n.start + o * n.step, r = n.step / et, l = Math.min(o - 1, Math.max(0, Math.floor((s - n.start) / n.step))), h = t.parts.energy ?? {}, c = t.parts.power ?? {}, d = t.parts.nowCounters ?? {}, u = t.parts.nowPowers ?? {};
    return { at: s, w: n, n: o, cur: l, counter: (m) => {
      if (!m || !St(h[m], "change")) return;
      const p = _t(h[m], "change", n.start, i, o, "sum"), g = d[m];
      return St(g, "change") && (p[l] = g.reduce((f, $) => f + (typeof $.change == "number" ? $.change : 0), 0)), p;
    }, meanKwh: (m) => {
      if (!m || !St(c[m], "mean")) return;
      const p = _t(c[m], "mean", n.start, i, o, "mean").map((f) => f === void 0 ? void 0 : f * r / 1e3), g = u[m];
      if (St(g, "mean")) {
        const f = g, $ = f.reduce((_, w) => _ + (typeof w.mean == "number" ? w.mean : 0), 0) / f.length;
        p[l] = $ * Math.min(r, Math.max(0, (s - (n.start + l * n.step)) / et)) / 1e3;
      }
      return p;
    } };
  }
  /** The reading of a bar (and the legend at once): the moment and the total, then every part with its colour and its energy. */
  renderReading(t, e, s, n) {
    return y`<div class="house-panel" role="group" aria-label=${t}>
        <div class="house-panel-head"><span>${t}</span><b>${s}\u00a0${st(e)}\u00a0kWh</b></div>
        ${n.map((o) => y`<div class="house-panel-row"><i style="background:${o.color}"></i><span>${o.name}</span><b>${o.kwh === void 0 ? D : `${st(o.kwh)} kWh`}</b></div>`)}
      </div>`;
  }
  /**
   * A small trend of today by hours (from midnight to midnight) in the row of an appliance (one colour) or of a group (the appliances
   * of the group stacked, a legend names them): when it was cooking, when it was washing. No axis of values, no reading. Without statistics nothing.
   */
  renderDayChart(t) {
    const e = this.t, s = this._houseData.day;
    if (!s || s.status === "error" || !Object.keys(s.parts).length) return T;
    const { n, counter: o, meanKwh: i } = this.houseSeries(s, "day"), r = t.map(($) => ({ ...$, list: $.energy ? o($.energy) : i($.power) })).filter(($) => $.list && $.list.some((_) => typeof _ == "number"));
    if (!r.length) return T;
    const l = ($, _) => $?.[_] ?? 0;
    let h = 0;
    for (let $ = 0; $ < n; $++) h = Math.max(h, r.reduce((_, w) => _ + l(w.list, $), 0));
    const c = 44, d = 42, u = h > 0 ? le(h) : 0, b = u > 0 ? 36 / u : 0, v = /* @__PURE__ */ new Date();
    v.setHours(0, 0, 0, 0);
    const m = ua({ start: v.getTime(), end: v.getTime() + 24 * et }), p = U / n, g = p * 0.72, f = Array.from({ length: n }, ($, _) => {
      let w = 0;
      return r.map((L) => {
        const A = l(L.list, _);
        if (A <= 0) return T;
        const S = Math.max(1.5, A * b), M = d - w - S;
        return w += S + 1, Y`<rect x=${(_ * p + (p - g) / 2).toFixed(1)} y=${M.toFixed(1)} width=${g.toFixed(1)} height=${S.toFixed(1)} style="fill:${L.color}"></rect>`;
      });
    });
    return y`<div class="house-micro">
        <span class="house-micro-cap">${e.house.chartToday} · <span class="unit">kWh</span></span>
        <svg viewBox="0 0 ${U + Rt} ${c}" role="img" aria-label=${e.house.chartToday}>
          ${m.map(($) => Y`<line x1=${$.x} y1="0" x2=${$.x} y2=${d} style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>`)}
          <line x1="0" y1="6" x2=${U} y2="6" style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>
          <line x1="0" y1=${d} x2=${U} y2=${d} style="stroke:var(--ed-tick);stroke-width:1.5"></line>
          ${f}
          <text x=${U + 9} y="10" style="fill:var(--ed-secondary)" font-size="12">${u > 0 ? j(u, u % 1 ? 1 : 0) : ""}</text>
        </svg>
        <div class="bat-axis ticks" aria-hidden="true">${m.map(($) => y`<span style="left:${($.x / (U + Rt) * 100).toFixed(1)}%;transform:translateX(${$.x < 8 ? "0" : $.x > U - 8 ? "-100%" : "-50%"})">${$.text}</span>`)}</div>
        ${r.length > 1 ? y`<div class="house-micro-legend">${r.map(($) => y`<span><i style="background:${$.color}"></i>${$.name}</span>`)}</div>` : T}
      </div>`;
  }
  houseChart(t, e) {
    const s = this.t, n = this._houseData[`hist:${e}`];
    if (!n || n.status === "error" || !Object.keys(n.parts).length) return;
    const o = t.entities, { w: i, n: r, cur: l, counter: h, meanKwh: c } = this.houseSeries(n, e), d = h(o.pv.total_generation), u = h(o.battery.total_discharge), b = h(o.battery.total_charge), v = h(o.grid.total_import), m = h(o.grid.total_export), p = c(o.wallbox.power), g = c(o.boiler.power);
    if (!d && !u && !b && !v && !m) return;
    const f = (B, P) => B?.[P] ?? 0, $ = !p || !g, _ = Array.from({ length: r }, (B, P) => Math.max(0, f(d, P) + f(u, P) + f(v, P) - f(b, P) - f(m, P) - f(p, P) - f(g, P))), w = (B) => {
      if (!B.length || B.some((mt) => !mt)) return;
      const P = B;
      return Array.from({ length: r }, (mt, Xt) => P.some(($t) => $t[Xt] === void 0) ? void 0 : P.reduce(($t, gt) => $t + gt[Xt], 0));
    }, L = [
      ...this.listed(t).map((B) => ({ name: this.applianceName(B), group: !1, list: B.energy ? h(B.energy) : c(B.power) })),
      ...t.groups.map((B) => ({ name: this.pickText(B.name) ?? "", group: !0, list: w(B.appliances.map((P) => P.energy ? h(P.energy) : c(P.power))) }))
    ].map((B, P) => ({ ...B, color: Qt[P % Qt.length] })).filter((B) => B.group || B.list && B.list.some((P) => typeof P == "number")), A = (B) => Math.max(_[B], L.reduce((P, mt) => P + f(mt.list, B), 0));
    let S = 0;
    for (let B = 0; B < r; B++) S = Math.max(S, A(B));
    if (S <= 0) return;
    const M = le(S), C = 220, x = 200, E = 180 / M, z = 0, k = Math.min(18, (U - z) / r * 0.72), H = (B) => z + (B + 0.5) / r * (U - z), ot = Array.from({ length: r }, (B, P) => {
      let mt = 0;
      const Xt = L.reduce((gt, he) => gt + f(he.list, P), 0);
      return [...L.map((gt) => ({ value: f(gt.list, P), color: gt.color })), { value: Math.max(0, _[P] - Xt), color: "#8E8E93" }].map((gt) => {
        if (gt.value <= 0) return T;
        const he = Math.max(0.6, gt.value * E), As = x - mt - he;
        return mt += he + 1, Y`<rect x=${(H(P) - k / 2).toFixed(1)} y=${As.toFixed(1)} width=${k.toFixed(1)} height=${he.toFixed(1)} style="fill:${gt.color}"></rect>`;
      });
    }), I = (B) => {
      const P = i.start + B * i.step;
      return e === "1d" ? `${ee(P)} ${it(P)}–${it(P + et)}` : ee(P);
    }, O = (B) => Math.max(_[B], L.reduce((P, mt) => P + f(mt.list, B), 0)), G = $ ? s.house.houseTotal : s.house.sum, yt = (B) => `${I(B)} · ${G} ${st(O(B))} kWh`, kt = (B) => {
      const P = O(B), mt = L.reduce(($t, gt) => $t + f(gt.list, B), 0), Xt = L.length ? [...L.map(($t) => ({ name: $t.name, kwh: $t.list?.[B], color: $t.color })).sort(($t, gt) => (gt.kwh ?? -1) - ($t.kwh ?? -1)), { name: s.house.houseRest, kwh: Math.max(0, P - mt), color: "#8E8E93" }] : [];
      return this.renderReading(I(B), P, G, Xt);
    }, ht = Array.from({ length: r }, (B, P) => P), lt = L.map((B) => ({
      name: B.name,
      // A group with an unknown bin up to now is unknown as a whole (Q20); the bins after now have no value yet.
      kwh: B.group && ht.slice(0, l + 1).some((P) => B.list?.[P] === void 0) ? void 0 : ht.reduce((P, mt) => P + f(B.list, mt), 0),
      color: B.color
    })).sort((B, P) => (P.kwh ?? -1) - (B.kwh ?? -1)), Tt = lt.reduce((B, P) => B + (P.kwh ?? 0), 0), ke = e === "1d" ? this.today(t).house : void 0, Lt = Math.max(ke ?? ht.reduce((B, P) => B + O(P), 0), Tt), Ds = () => this.renderReading(ya, Lt, G, L.length ? [...lt, { name: s.house.houseRest, kwh: Math.max(0, Lt - Tt), color: "#8E8E93" }] : []), ya = e === "1d" ? s.house.today : s.bat.ranges[e], Cs = () => `${ya} · ${G} ${st(Lt)} kWh`, Ls = [d, u, b, v, m].some((B) => B && B[0] === void 0);
    return {
      id: `house-${e}`,
      h: C,
      // The top line is the value `max` exactly (the bars are drawn on the scale of 180 above the base).
      grid: [{ y: x - 180 }, { y: x, strong: !0 }],
      labels: [{ y: x - 180, text: `${M}` }, { y: x, text: "0" }],
      time: { start: i.start, end: i.start + r * i.step, x0: z, x1: U, slot: i.step },
      valueNum: (B) => (x - B) / 180 * M,
      valueAt: (B) => {
        const P = (x - B) / 180 * M;
        return P % 1 ? st(P) : j(P);
      },
      body: Y`${ot}`,
      n: r,
      x: H,
      read: yt,
      from: Ls ? s.house.dataFrom(ee(i.start)) : s.house.axisFrom[e],
      to: s.house.axisTo,
      fade: 0,
      panel: kt,
      whole: Ds,
      wholeText: Cs()
    };
  }
};
function Io(a, t) {
  return { sources: [...vt], sinks: t.slice().sort((e, s) => re.indexOf(e) - re.indexOf(s)) };
}
function Fo(a, t = re, e = vt) {
  const s = Math.round(Math.max(116, Math.min(132, a * 0.377))), n = 56, o = 6, i = Math.max(1, t.length), r = i * n + (i - 1) * o, l = Object.fromEntries(t.map((c, d) => [c, n / 2 + d * (n + o)])), h = Object.fromEntries(
    e.map((c, d) => [c, i < 4 ? n / 2 + d * (n + o) : (d + 0.5) * r / vt.length])
  );
  return { width: a, tile: { w: s, h: n }, gap: o, height: r, left: h, right: l, xa: s - 8, xb: a - s + 8 };
}
const dt = (a) => a.toFixed(1);
function Wo(a, t, e) {
  const s = a.filter((p) => p.to in t.right);
  if (!s.length) return [];
  const n = (p) => Math.sqrt(p.watts / 1e3), o = (p) => {
    const g = /* @__PURE__ */ new Map();
    for (const f of s) g.set(f[p], (g.get(f[p]) ?? 0) + n(f));
    return g;
  }, i = Math.max(...o("from").values(), ...o("to").values()), r = Math.min(e.maxPxPerKw, 44 / i), l = (p) => Math.max(e.minPx, n(p) * r), h = /* @__PURE__ */ new Map();
  for (const p of vt) {
    const g = s.filter((f) => f.from === p).reduce((f, $) => f + l($), 0);
    h.set(p, t.left[p] - g / 2);
  }
  const c = /* @__PURE__ */ new Map();
  for (const p of re.filter((g) => g in t.right)) {
    const g = s.filter((f) => f.to === p).reduce((f, $) => f + l($), 0);
    c.set(p, t.right[p] - g / 2);
  }
  const d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (const p of vt)
    for (const g of s.filter((f) => f.from === p).sort((f, $) => t.right[f.to] - t.right[$.to]))
      d.set(g, h.get(p)), h.set(p, h.get(p) + l(g));
  for (const p of re.filter((g) => g in t.right))
    for (const g of s.filter((f) => f.to === p).sort((f, $) => t.left[f.from] - t.left[$.from]))
      u.set(g, c.get(p)), c.set(p, c.get(p) + l(g));
  const { xa: b, xb: v } = t, m = (b + v) / 2;
  return s.map((p) => {
    const g = l(p), f = d.get(p), $ = f + g, _ = u.get(p), w = _ + g;
    return {
      from: p.from,
      to: p.to,
      watts: p.watts,
      thickness: g,
      d: `M${b} ${dt(f)} C${dt(m)} ${dt(f)} ${dt(m)} ${dt(_)} ${v} ${dt(_)} L${v} ${dt(w)} C${dt(m)} ${dt(w)} ${dt(m)} ${dt($)} ${b} ${dt($)} Z`,
      centre: `M${b} ${dt(f + g / 2)} C${dt(m)} ${dt(f + g / 2)} ${dt(m)} ${dt(_ + g / 2)} ${v} ${dt(_ + g / 2)}`
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
}, Ye = 42, Xe = 10, Uo = 12, Vo = 34, Go = (a) => class extends a {
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
      </section>` : T;
  }
  renderElectricity(t, e) {
    const s = e.summarySource ? `var(${Ut[e.summarySource]})` : void 0;
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
        ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : T}
        ${this._pop || this._all ? y`<button type="button" class="scrim" aria-label=${this.t.close} @click=${() => this.closePop()}></button>` : T}
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
    const s = this.t, n = t.entities, o = t.num.scale, i = t.num.flows.idle_threshold, r = e.carLink, l = e.soc, h = l !== void 0 && l <= this.batteryReserve(t), c = (w) => l === void 0 ? void 0 : { f: l / 100, active: w, color: h ? "var(--ed-warning)" : "var(--ed-battery)", a1: h ? 0.5 : 0.58 }, d = (w) => `${s.tileSpoken.batteryState(w)}, ${l === void 0 ? s.noData : s.tileSpoken.chargeLevel(K(l))}${h ? `, ${s.tileSpoken.atReserve}` : ""}`, u = r === "connected" || r === "charging" || tt(e.car, i), b = t.num.water.gauge_min, v = Math.max(t.num.water.gauge_max, F(this.hass, n.boiler.target_temperature) ?? 0), m = e.boilTemp, p = (w) => tt(w, i), g = e.loadShare.house, f = vt.filter((w) => g[w] >= 0.02), $ = p(e.other) && f.length ? this.houseBackground(f, g, Q((e.other ?? 0) / o.house, 0, 1)) : void 0, _ = [
      { side: "L", key: "sun", name: s.tile.sun, watts: e.sun, k: (e.sun ?? 0) / o.sun, icon: at.sun, idleIcon: at.moon, idleText: s.idle.sun, aria: e.sun === void 0 ? s.noData : "" },
      { side: "L", key: "bat", name: s.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / o.battery, icon: at.battery, icon2: at.batteryDown, idleIcon: at.pause, idleText: s.idle.bat, level: c(p(e.batDis)), aria: d(!0) },
      { side: "L", key: "grid", name: s.tile.grid, watts: e.imp, k: (e.imp ?? 0) / o.grid, icon: at.grid, idleIcon: at.minus, idleText: s.idle.grid, aria: e.imp === void 0 ? s.noData : p(e.imp) ? s.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: s.tile.house, watts: e.other, k: (e.other ?? 0) / o.house, icon: at.home, idleIcon: at.minus, idleText: s.idle.house, background: $, aria: e.other === void 0 ? s.noData : s.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const w = u && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: p(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      _.push({
        side: "R",
        key: "car",
        name: s.tile.car,
        watts: r === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / o.car,
        icon: at.car,
        idleIcon: r === "disconnected" ? at.minus : at.plug,
        idleText: r === "disconnected" ? s.idle.carDisconnected : r === void 0 ? s.idle.carNoState : s.idle.carConnected,
        level: w,
        aria: [r === void 0 && e.car === void 0 ? s.noData : p(e.car) ? s.tileSpoken.charging : "", u && e.carSoc !== void 0 ? s.tileSpoken.chargeLevel(K(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const w = m === void 0 ? void 0 : { f: Q((m - b) / (v - b), 0, 1), active: p(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      _.push({
        side: "R",
        key: "boil",
        name: s.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / o.boiler,
        icon: at.therm,
        idleIcon: at.pause,
        idleText: s.idle.boil,
        level: w,
        aria: [m === void 0 ? s.noData : s.tileSpoken.temperature(`${j(m)} °C`), p(e.boil) ? s.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return _.push(
      { side: "R", key: "batIn", name: s.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / o.battery, icon: at.battery, icon2: at.batteryBolt, idleIcon: at.pause, idleText: s.idle.batIn, level: c(p(e.batIn)), aria: d(!1) },
      { side: "R", key: "gridOut", name: s.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / o.grid, icon: at.grid, idleIcon: at.minus, idleText: s.idle.gridOut, aria: e.exp === void 0 ? s.noData : p(e.exp) ? s.tileSpoken.gridExport : "" }
    ), _;
  }
  renderFlow(t, e) {
    const s = t.num.flows.idle_threshold, n = da(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((d) => tt(d, s) ? d : void 0),
      t.num.flows.kw_from
    ), o = this.tiles(t, e), i = Io(e.flows, o.filter((d) => d.side === "R").map((d) => d.key)), r = Fo(this._width, i.sinks, i.sources), l = Wo(e.flows, r, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), h = (d) => Y`<linearGradient id="rg-${d}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(--band-${d});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(--band-${d});stop-opacity:var(--band-a1)"></stop>
          <stop offset="0.86" style="stop-color:var(--band-${d});stop-opacity:var(--band-a2)"></stop>
          <stop offset="1" style="stop-color:var(--band-${d});stop-opacity:0.2"></stop>
        </linearGradient>`, c = this._pop ? o.find((d) => d.key === this._pop) : void 0;
    return y`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${r.height}px">
        <svg width=${r.width} height=${r.height} viewBox="0 0 ${r.width} ${r.height}" aria-hidden="true">
          <defs>${vt.map(h)}</defs>
          ${l.map((d) => Y`<path d=${d.d} fill="url(#rg-${d.from})"></path>`)}
        </svg>
        ${o.map((d) => this.renderTile(d, r, n, t))} ${c ? this.renderTilePopup(c, r, t, e, n) : T}
      </div>`;
  }
  /** A power "1,37 kW" as the number and a smaller grey unit next to it (uživatel 3. 11. 2026). */
  valueWithUnit(t) {
    const e = /^(.+) (k?W)$/.exec(t);
    return e ? y`${e[1]} <small>${e[2]}</small>` : t;
  }
  houseBackground(t, e, s) {
    const n = t.reduce((h, c) => e[c] > e[h] ? c : h), o = `linear-gradient(${Se(`var(${Ut[n]})`, Math.round(Ye + Xe * s))}, ${Se(`var(${Ut[n]})`, Math.round(Ye + Xe * s))}), var(--ed-tile)`;
    if (t.length === 1) return o;
    const i = t.reduce((h, c) => h + e[c], 0);
    let r = 0;
    const l = [];
    return t.forEach((h, c) => {
      const d = r / i * 100;
      r += e[h];
      const u = r / i * 100, b = `var(${Ut[h]})`, v = c === 0 ? `${d}%` : `calc(${d}% + 1px)`, m = c === t.length - 1 ? `${u}%` : `calc(${u}% - 1px)`;
      c > 0 && l.push(`transparent calc(${d}% - 1px) calc(${d}% + 1px)`), l.push(`${b} ${v} ${m}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${o}`;
  }
  tileBackground(t, e, s) {
    const n = `var(${ae[t.key]})`, o = t.level;
    if (o) {
      const i = Q(o.f, 0, 1), r = `${(i * 100).toFixed(1)}%`, l = t.key === "boil", h = o.active ? Se(o.color, Math.round(o.a1 * 100 + (l ? Uo * s : 0))) : "var(--ed-fill-idle)", c = o.active ? pa(o.color, Math.round(14 + (l ? Vo * s : 0))) : "var(--ed-tile)";
      return i < 5e-3 ? o.active ? `linear-gradient(${c}, ${c}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${h} 0%, ${h} ${r}, ${c} ${r}, ${c} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const i = Se(n, Math.round(Ye + Xe * s));
      return `linear-gradient(${i}, ${i}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, s, n) {
    const o = t.watts === void 0, i = tt(t.watts, n.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], h = Q(t.k, 0, 1), c = o ? D : nt(t.watts, s), d = this.tileBackground(t, i, h), u = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${ae[t.key]});--gr:${(2 + 9 * h).toFixed(1)}px;--ga:${Math.round(30 + 60 * h)}%${d ? `;background:${d}` : ""}`;
    return y`<button
        type="button"
        class="tile ${i ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""} ${!i && t.level && t.level.f >= 5e-3 ? "fill" : ""}"
        data-tile=${t.key}
        style=${u}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${i ? c : o ? D : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${i ? t.icon : t.idleIcon}></path>${i && t.icon2 ? Y`<path class="icon2" d=${t.icon2}></path>` : T}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${i ? this.valueWithUnit(c) : o ? D : t.idleText}</span>
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
    if (t.key === "house") return this.renderHousePopup(t, e, s, n);
    const i = this.t, r = s.num.flows.idle_threshold, l = this.today(s), h = (z) => z === void 0 ? D : `${st(z)} kWh`, c = (z) => z === void 0 ? D : nt(z, o), d = (z) => tt(z, r), u = n.soc, b = u !== void 0 && u <= this.batteryReserve(s), v = (z) => ({
      title: z ? i.tile.bat : i.tile.batIn,
      now: z ? d(n.batDis) ? i.pop.discharging(c(n.batDis)) : n.batDis === void 0 && u === void 0 ? D : i.idle.bat : d(n.batIn) ? i.pop.charging(c(n.batIn)) : n.batIn === void 0 && u === void 0 ? D : i.idle.batIn,
      level: u === void 0 ? void 0 : { label: i.pop.level, text: K(u), percent: u, color: b ? "var(--ed-warning)" : "var(--ed-battery)", note: b ? i.pop.atReserve : "" },
      rows: z ? [{ label: i.pop.rows.discharged, value: h(l.bdis) }] : [{ label: i.pop.rows.charged, value: h(l.bchg) }]
    }), m = (z) => ({
      title: z ? i.tile.gridOut : i.tile.grid,
      now: z ? d(n.exp) ? i.pop.exporting(c(n.exp)) : n.exp === void 0 ? D : i.idle.gridOut : d(n.imp) ? i.pop.importing(c(n.imp)) : n.imp === void 0 ? D : i.idle.grid,
      rows: z ? [{ label: i.pop.rows.exported, value: h(l.gout) }] : [{ label: i.pop.rows.imported, value: h(l.gin) }]
    }), p = n.carLink, g = n.boilTemp, f = s.num.water.gauge_min, $ = Math.max(s.num.water.gauge_max, F(this.hass, s.entities.boiler.target_temperature) ?? 0), w = {
      sun: { title: i.tile.sun, now: d(n.sun) ? c(n.sun) : n.sun === void 0 ? D : i.idle.sun, rows: [{ label: i.pop.rows.produced, value: h(l.pv) }] },
      bat: v(!0),
      batIn: v(!1),
      grid: m(!1),
      gridOut: m(!0),
      house: { title: i.tile.house, now: d(n.other) ? c(n.other) : n.other === void 0 ? D : i.idle.house, rows: [{ label: i.pop.rows.consumed, value: h(l.house) }] },
      car: {
        title: i.tile.car,
        now: d(n.car) ? i.pop.charging(c(n.car)) : p === "connected" || p === "charging" ? i.pop.carConnectedIdle : p === "disconnected" ? i.idle.carDisconnected : D,
        level: n.carSoc !== void 0 && (p === "connected" || p === "charging") ? { label: i.pop.level, text: K(n.carSoc), percent: n.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: i.pop.rows.carCharged, value: h(l.car) }]
      },
      boil: {
        title: i.tile.boil,
        now: d(n.boil) ? i.pop.heating(c(n.boil)) : n.boil === void 0 ? D : i.idle.boil,
        level: g === void 0 ? void 0 : { label: i.pop.temperature, text: `${j(g)} °C`, percent: Q((g - f) / ($ - f) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: i.pop.rows.boilerHeated, value: h(l.boil) }]
      }
    }[t.key], L = 236, A = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, S = t.side === "L" ? e.left[t.key] : e.right[t.key], M = S - e.tile.h / 2, C = S < e.height / 2, x = Q(A - L / 2, 0, e.width - L), E = C ? `top:${(M + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - M + 8).toFixed(0)}px`;
    return y`<div class="pop" role="dialog" aria-label=${w.title} tabindex="-1" style="left:${x.toFixed(0)}px;${E};width:${Math.min(L, e.width)}px">
        <i class="arrow ${C ? "up" : "down"}" aria-hidden="true" style="left:${(A - x - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${w.title}</span><span class="pop-now">${w.now}</span></div>
        ${w.level ? y`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${w.level.label}${w.level.note ? y`<span class="note"> ${w.level.note}</span>` : T}</span>
                <span class="pop-big" style="color:${w.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${w.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${xs(w.level.percent).map((z) => y`<span><i style="width:${z.toFixed(0)}%;background:${w.level.color}"></i></span>`)}</div>
            </div>` : T}
        <div class="pop-rows">${w.rows.map((z) => y`<div class="pop-row"><span>${z.label}</span><b>${z.value}</b></div>`)}</div>
      </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const s = this.t, n = this.today(t), o = (u) => u === void 0 ? D : st(u), i = [n.pv, n.bdis, n.gin], r = i.every((u) => u !== void 0) ? i.reduce((u, b) => u + b, 0) : void 0, l = n.house === void 0 ? void 0 : n.house + n.car + n.boil + n.bchg + n.gout, h = [
      { label: s.tile.sun, color: "var(--ed-sun)", value: n.pv },
      { label: s.pop.fromBattery, color: "var(--ed-battery)", value: n.bdis },
      { label: s.pop.fromGrid, color: "var(--ed-grid)", value: n.gin }
    ], c = [
      { label: s.tile.house, color: "var(--ed-house)", value: n.house },
      { label: s.tile.car, color: "var(--ed-car)", value: n.car },
      { label: s.tile.boil, color: "var(--ed-boiler)", value: n.boil },
      { label: s.pop.toBattery, color: "var(--ed-battery)", value: n.bchg },
      { label: s.tile.gridOut, color: "var(--ed-grid)", value: n.gout }
    ], d = (u, b, v) => y`<div role="list" aria-label=${u} class="day-col">
        <div class="day-total"><span>${u}</span><b>${o(b)}</b></div>
        ${v.map((m) => y`<div role="listitem" class="day-item"><i style="background:${m.color}" aria-hidden="true"></i><span>${m.label}</span><b>${o(m.value)}</b></div>`)}
      </div>`;
    return y`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${s.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${d(s.pop.sources, r, h)} ${d(s.pop.consumption, l, c)}</div>
      </div>`;
  }
}, Ko = (a) => class extends a {
  constructor() {
    super(...arguments), this._carGesture = new ra(() => ({
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
    const s = this.t, n = t.entities, o = t.num.flows, i = t.num.car.charge_limit, r = e.carLink, l = tt(e.car, o.idle_threshold) && r !== "disconnected", h = ca(e.loadShare.car, o, s), c = ct(this.hass, n.wallbox.block_charging) === "on", d = this.shown(n.wallbox.boost), u = d === "on" ? `var(${Ut[h.main]})` : this.sourceColor(h), b = ct(this.hass, n.wallbox.prioritize_connected) === "on" && r === "connected" && !c && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let v, m;
    l ? (v = `${s.car.charging(h.text)}${d === "on" ? ` · ${s.boostOptions.on}` : ""}`, m = u) : r === "connected" || r === "charging" ? (v = s.car.connectedIdle, m = b ? "var(--ed-warning)" : void 0) : r === "disconnected" && (v = s.car.disconnected);
    const p = pa(m ?? "#d8d8dc", m ? 42 : 28), g = pt(this.hass, n.car.image)?.attributes?.entity_picture, f = e.carSoc, $ = da([tt(e.car, o.idle_threshold) ? e.car : void 0], o.kw_from), _ = i < 100, w = s.car.chargeLevel(f === void 0 ? s.noData : K(f), _ ? K(i) : void 0), L = n.wallbox, A = d === "on" ? "on" : d === "off" ? "off" : "", S = this.boostOptions, M = d === "on" ? s.car.modeBoost : d === "off" ? s.car.modeSurplus : D;
    return y`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${p}, transparent)"></div><div class="shadow"></div>
            ${typeof g == "string" && g ? y`<img src=${g} alt="" />` : T}
          </div>
          ${t.carLink ? y`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${s.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(C) => C.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? y`<div class="car-hint" aria-hidden="true">${s.hint.holdOrDouble}</div>` : T}` : T}
          <div class="head"><h2 id="h-car">${this.pickText(t.titles.car) ?? s.titles.car}</h2>${this.stateLine(v, m)}</div>
          <div class="car-soc">
            <span class="soc">${f === void 0 ? D : j(f)}<small>${this._i18n.percent("")}</small>${f === void 0 ? y`<span class="sr-only">${s.noData}</span>` : T}</span>
            <span class="range">${s.car.range} <b>${e.carRange === void 0 ? D : `${j(e.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${w}>
            ${xs(Q(f ?? 0, 0, 100)).map((C) => y`<span><i style="width:${C.toFixed(1)}%"></i></span>`)}
            ${_ ? y`<div class="limit" style="left:${Ia(i)}"></div>` : T}
          </div>
          ${_ ? y`<div class="meter-label" aria-hidden="true"><span style="left:${Ia(i)}">${s.car.limit(K(i))}</span></div>` : T}
        </div>
        ${l ? this.renderCarSources(e, o, nt(e.car ?? 0, $), d === "on") : T}
        ${L.boost ? y`<div class="mode">
              <div class="mode-head"><span id="mode-l">${s.car.mode}</span><span class="mode-sub ${d === "on" ? "warn" : ""}">${M}</span></div>
              <ed-segmented
                guarded .options=${S} .value=${A} label=${s.car.modeLabel} .hint=${s.hint.holdDragOrDouble} ?disabled=${d === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(C) => this.setBoost("wallbox", C.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, d === "on")}
            </div>` : T}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, l, u, $) : T}
      </section>`;
  }
  renderCarSources(t, e, s, n) {
    const o = this.t, i = o.source, r = t.loadShare.car, l = vt.filter((d) => r[d] > 4e-3), h = oo(l.map((d) => r[d])), c = (d) => d === "grid" && !n && r.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${Ut[d]})`;
    return y`<div class="mix">
        <div class="mix-head"><span>${o.car.sourcesTitle}</span><span>${s}</span></div>
        <div class="mix-bar" aria-hidden="true">${l.map((d) => y`<div style="flex:${r[d]} 1 0;background:${c(d)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${o.car.sourcesLabel}>
          ${l.map((d, u) => y`<span><i style="background:${c(d)}"></i>${i[d]}<em>${K(h[u])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const s = t.entities.wallbox.charging_power;
    if (!s) return T;
    const { phases: n, power_min: o, power_max: i, power_step: r } = t.num.wallbox, l = pt(this.hass, s), h = F(this.hass, s), c = h === void 0 ? void 0 : h * n / 1e3;
    let d = o / 1e3, u = i / 1e3;
    const b = zt(l, "min"), v = zt(l, "max");
    return b !== void 0 && (d = Math.max(d, b * n / 1e3)), v !== void 0 && (u = Math.min(u, v * n / 1e3)), y`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${c === void 0 ? D : j(c, 1)}<small> kW</small></span>
          <ed-slider
            .min=${d} .max=${u} .step=${r / 1e3} .value=${c ?? d}
            label=${this.t.car.powerLabel} valueText=${c === void 0 ? this.t.noData : `${j(c, 1)} kW`}
            minLabel="${j(d, 1)} kW" maxLabel="${j(u, 1)} kW"
            ?disabled=${c === void 0}
            @hdk-change=${(m) => this.setNumber(s, Math.round(m.detail.value * 1e3 / n), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, e, s, n, o) {
    const i = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, h = !!(r.block_charging || r.prioritize_connected), c = e.carLink, d = s ? y`<span>${i.wallbox.charging} </span><b style="--c:${n}">${nt(e.car ?? 0, o)}</b>` : c === "connected" || c === "charging" ? y`${i.wallbox.idle}` : c === "disconnected" ? y`${i.wallbox.disconnected}` : y`${D}`, u = t.entities.car.state_of_charge, b = F(this.hass, u) === void 0 ? void 0 : Mn(pt(this.hass, u)?.last_updated, this._now, i), v = this.shown(r.block_charging), m = this.shown(r.prioritize_connected);
    return y`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!h} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${s ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${at.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${i.wallbox.title}</span><span class="row-sub">${d}</span></span>
            <span class="row-aside">${b ? i.wallbox.fromCar(b) : ""}</span>
            ${h ? y`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${at.expand}></path></svg>` : y`<span></span>`}
          </button>
          ${h ? y`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(i.wallbox.block, r.block_charging, v === "on" ? i.wallbox.blockOn : i.wallbox.blockOff, v === "on") : T}
                ${r.prioritize_connected ? this.switchRow(i.wallbox.priority, r.prioritize_connected, m === "on" ? i.wallbox.priorityOn : i.wallbox.priorityOff, !1) : T}
              </div></div>` : T}
        </li>
      </ul>`;
  }
}, Ce = 45, Vt = 46, Zo = 62, Yo = 58;
function qe(a, t) {
  let e = 1;
  for (; e < a.length - 1 && t > a[e].temp; ) e++;
  const s = a[e - 1], n = a[e], o = Math.max(0, Math.min(1, (t - s.temp) / (n.temp - s.temp))), i = (h) => [1, 3, 5].map((c) => parseInt(h.slice(c, c + 2), 16)), r = i(s.color), l = i(n.color);
  return `rgb(${[0, 1, 2].map((h) => Math.round(r[h] + (l[h] - r[h]) * o)).join(",")})`;
}
const me = (a, t) => {
  const e = (135 + 270 * a) * Math.PI / 180;
  return [Zo + t * Math.cos(e), Yo + t * Math.sin(e)];
}, Xo = (a, t) => {
  const [e, s] = me(a, Vt), [n, o] = me(t, Vt);
  return `M${e.toFixed(2)} ${s.toFixed(2)} A${Vt} ${Vt} 0 0 1 ${n.toFixed(2)} ${o.toFixed(2)}`;
};
function qo(a, t, e, s) {
  const n = a === void 0 ? 0 : Math.max(0, Math.min(1, (a - t) / (e - t))), o = "var(--ed-gauge-track)", i = Array.from({ length: Ce }, (b, v) => {
    const m = (v + 0.5) / Ce, p = a !== void 0 && m <= n ? qe(s, t + m * (e - t)) : o;
    return Y`<path d=${Xo(v / Ce, Math.min(1, (v + 1) / Ce + 4e-3))} fill="none" stroke=${p} stroke-width="10"></path>`;
  }), [r, l] = me(0, Vt), [h, c] = me(1, Vt), [d, u] = me(n, Vt);
  return Y`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${i}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${a !== void 0 && n > 0 ? qe(s, t) : o}></circle>
    <circle cx=${h.toFixed(1)} cy=${c.toFixed(1)} r="5" fill=${a !== void 0 && n >= 0.99 ? qe(s, e) : o}></circle>
    ${a === void 0 ? null : Y`<circle class="knob" cx=${d.toFixed(1)} cy=${u.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const Jo = (a) => class extends a {
  renderWater(t, e) {
    const s = this.t, n = t.entities, o = t.num.flows, i = tt(e.boil, o.idle_threshold), r = ca(e.loadShare.boil, o, s), l = this.sourceColor(r), c = this.shown(n.boiler.boost) === "on", d = da([i ? e.boil : void 0], o.kw_from);
    let u;
    return i ? u = `${s.water.boilerHeats(r.text)}${c ? ` · ${s.boostOptions.on}` : ""}` : e.boil !== void 0 && (u = s.water.noHeating), y`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${this.pickText(t.titles.water) ?? s.titles.water}</h2>${this.stateLine(u, i ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, i, l, d)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, s, n, o) {
    return y`<div class="arc" role="img" aria-label=${o}>
        ${qo(t, e, s, n.tempScale)}
        <div class="arc-num"><b>${t === void 0 ? D : j(t)}</b>${t === void 0 ? y`<span class="sr-only">${this.t.noData}</span>` : y`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${j(e)}</span><span class="arc-max" aria-hidden="true">${j(s)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, s, n, o) {
    const i = this.t, r = t.entities.boiler, l = this.shown(r.boost), h = l === "on", c = F(this.hass, r.target_temperature), d = F(this.hass, r.boost_target_temperature), u = h ? d : c, b = t.num.water.gauge_min, v = Math.max(t.num.water.gauge_max, c ?? 0), m = e.boilTemp, p = !!this._open.targets, g = !!(r.target_temperature || r.boost_target_temperature), f = i.water.boilerLabel(
      m === void 0 ? i.noData : `${j(m)} °C`,
      s ? i.water.heatingWith(nt(e.boil, o)) : i.water.notHeating,
      u === void 0 ? void 0 : `${j(u)} °C`,
      j(b),
      `${j(v)} °C`
    );
    return y`<div class="source">
        <div class="source-top">
          ${this.gauge(m, b, v, t, f)}
          <div class="source-body">
            <div>
              <div class="source-title">${i.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${s ? n : "var(--ed-secondary)"}">${s ? nt(e.boil, o) : e.boil === void 0 ? D : i.water.notHeating}</span>${u === void 0 ? T : y` <span class="dim">· ${i.water.target(`${j(u)} °C`)}</span>`}
              </div>
            </div>
            ${r.boost ? y`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${i.water.boostMode} .hint=${i.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${($) => this.setBoost("boiler", $.detail.value === "on")}
                ></ed-segmented>` : T}
          </div>
        </div>
        ${g ? y`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${p ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${i.water.targets}</span>
                <span class="rowbtn-value">${i.water.targetFlow} <b>${c === void 0 ? D : j(c)}</b> · ${i.water.targetBoost} <b>${d === void 0 ? D : `${j(d)} °C`}</b></span>
                <svg class="chevron ${p ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${at.expand}></path></svg>
              </button>
              <div class="fold ${p ? "open" : ""}" ?inert=${!p}><div>${this.renderTargets(t, c, d)}</div></div>
            </div>` : T}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, s) {
    const n = this.t, o = t.entities.boiler, i = t.num.boiler, r = (l, h, c, d, u, b) => {
      if (!l) return T;
      const v = pt(this.hass, l);
      let m = i.target_min, p = i.target_max;
      const g = zt(v, "min"), f = zt(v, "max");
      return g !== void 0 && (m = Math.max(m, g)), f !== void 0 && (p = Math.min(p, f)), u !== void 0 && (m = Math.max(m, u)), b !== void 0 && (p = Math.min(p, b)), y`<div class="field">
          <span class="field-label">${c}<span class="hint">${d}</span></span><span class="field-value">${h === void 0 ? D : j(h)}<small> °C</small></span>
          <ed-slider
            .min=${m} .max=${p} .step=${i.target_step} .value=${h ?? m}
            label=${n.water.targetSliderLabel(c)} valueText=${h === void 0 ? n.noData : n.water.targetSliderSpoken(`${h} °C`, c)}
            minLabel="${j(m)} °C" maxLabel="${j(p)} °C"
            ?disabled=${h === void 0}
            @hdk-change=${($) => this.setNumber(l, $.detail.value, n.water.targetWhat(c))}
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
    if (!e.valve_c1 && !e.valve_c2) return T;
    const s = Cn(this.shown(e.valve_c1), this.shown(e.valve_c2)), n = s === "on", o = !!(e.valve_c1 && e.valve_c2), i = s === "unclear" ? this.t.water.mixingUnclear : s === void 0 ? this.t.noData : "";
    return y`
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${n ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${n ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${n ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${i ? y`<span class="mixcap-note">${i}</span>` : T}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${n} ?disabled=${s === void 0 || !o}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${n ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, s = t.entities.tank, n = t.num.tank, o = s.water_heater, i = pt(this.hass, o), r = this.shown(o), l = r === "off", h = r === "heat", c = zt(i, "temperature"), d = this._tankTemp, u = d && d.id === o ? d.value : c, b = t.num.water.gauge_min, v = Math.max(t.num.water.gauge_max, F(this.hass, t.entities.boiler.target_temperature) ?? 0), m = l ? n.temp_min : u, p = Array.isArray(i?.attributes?.operation_list) ? i.attributes.operation_list : Object.keys(e.tank.modes), g = Object.keys(e.tank.modes).filter((M) => p.includes(M)).map((M) => ({ value: M, label: e.tank.modes[M] })), f = !!this._open.tank, { min: $, max: _ } = this.tankRange(t), w = r === void 0 ? D : e.tank.modes[r] ?? r, L = l ? e.tank.keepsMinimum : h ? e.tank.setManually : e.tank.byPlan, A = m === void 0 ? D : l ? e.tank.summaryOff(`${j(n.temp_min)} °C`) : (h ? e.tank.summaryManual : e.tank.summaryPlan)(`${j(m)} °C`), S = e.tank.label(
      m === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${j(n.temp_min)} °C`) : e.tank.settingSet(`${j(m)} °C`),
      w,
      j(b),
      `${j(v)} °C`
    );
    return y`<div class="source">
        <div class="source-top">
          ${this.gauge(m, b, v, t, S)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${h ? "var(--ed-text)" : "var(--ed-secondary)"}">${w}</span>${r === void 0 ? T : y` <span class="dim">· ${L}</span>`}</div>
            </div>
            ${o ? y`<ed-segmented compact .options=${g} .value=${r ?? ""} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(M) => this.setTank(o, M.detail.value)}></ed-segmented>` : T}
          </div>
        </div>
        ${o ? y`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${f ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${A}</span>
                <svg class="chevron ${f ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${at.expand}></path></svg>
              </button>
              <div class="fold ${f ? "open" : ""}" ?inert=${!f}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : h ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${m === void 0 ? D : j(m)}<small> °C</small></span>
                    <ed-slider
                      .min=${$} .max=${_} .step=${n.temp_step} .tickStep=${5} .value=${m ?? $}
                      label=${e.tank.sliderLabel} valueText=${u === void 0 ? e.noData : e.tank.sliderSpoken(`${u} °C`)}
                      minLabel="${j($)} °C" maxLabel="${j(_)} °C"
                      ?disabled=${u === void 0 || l}
                      @hdk-change=${(M) => this.setTankTemperature(o, M.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : T}
      </div>`;
  }
}, va = class va extends Jo(Ko(Go(No(zo(vo(ro(q))))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return T;
    const e = Tn(this.hass, t, this.t), s = t.colors, n = `--ed-sun:${s.sun};--ed-battery:${s.battery};--ed-grid:${s.grid};--ed-house:${s.house};--ed-car:${s.car};--ed-boiler:${s.boiler};--ed-discharge:${s.discharge};--ed-accent:${s.accent};--ed-warning:${s.warning};--ed-off:${s.neutral}`;
    return this._batDetail ? y`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderBatteryDetail(t, e)}</div>` : this._houseDetail ? y`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderHouseDetail(t, e)}</div>` : this._sunDetail ? y`<div class="page" style=${n} @keydown=${this.onKey}>${this.renderSunDetail(t, e)}</div>` : y`<div class="page" style=${n} @keydown=${this.onKey}>
      ${t.title === "" ? T : y`<h1>${this.pickText(t.title) ?? this.t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
va.styles = Ln;
let ta = va;
on("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", ta);
window.customCards = window.customCards ?? [];
window.customCards.some((a) => a.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: He(hn()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.1.0 · 2026-11-09 09:09 UTC · po f8b56c4 ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
