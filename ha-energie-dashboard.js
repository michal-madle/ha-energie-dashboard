const Tt = globalThis, Wt = Tt.ShadowRoot && (Tt.ShadyCSS === void 0 || Tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ut = /* @__PURE__ */ Symbol(), ne = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Ut) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Wt && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = ne.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ne.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pe = (i) => new ye(typeof i == "string" ? i : i + "", void 0, Ut), _t = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, o, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + i[s + 1], i[0]);
  return new ye(e, i, Ut);
}, Ne = (i, t) => {
  if (Wt) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), o = Tt.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = e.cssText, i.appendChild(n);
  }
}, ae = Wt ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return Pe(e);
})(i) : i;
const { is: Fe, defineProperty: Ie, getOwnPropertyDescriptor: Re, getOwnPropertyNames: We, getOwnPropertySymbols: Ue, getPrototypeOf: Ve } = Object, Bt = globalThis, se = Bt.trustedTypes, Ge = se ? se.emptyScript : "", Ze = Bt.reactiveElementPolyfillSupport, xt = (i, t) => i, Ot = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ge : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, Vt = (i, t) => !Fe(i, t), re = { attribute: !0, type: String, converter: Ot, reflect: !1, useDefault: !1, hasChanged: Vt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Bt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ht = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = re) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(t, n, e);
      o !== void 0 && Ie(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: o, set: s } = Re(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get: o, set(a) {
      const r = o?.call(this);
      s?.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? re;
  }
  static _$Ei() {
    if (this.hasOwnProperty(xt("elementProperties"))) return;
    const t = Ve(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(xt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(xt("properties"))) {
      const e = this.properties, n = [...We(e), ...Ue(e)];
      for (const o of n) this.createProperty(o, e[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, o] of e) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const o = this._$Eu(e, n);
      o !== void 0 && this._$Eh.set(o, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) e.unshift(ae(o));
    } else t !== void 0 && e.push(ae(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ne(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$ET(t, e) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Ot).toAttribute(e, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const s = n.getPropertyOptions(o), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Ot;
      this._$Em = o;
      const r = a.fromAttribute(e, s.type);
      this[o] = r ?? this._$Ej?.get(o) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, o = !1, s) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (s = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? Vt)(s, e) || n.useDefault && n.reflect && s === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: o, wrapped: s }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? e ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: a } = s, r = this[o];
        a !== !0 || this._$AL.has(o) || r === void 0 || this.C(o, void 0, s, r);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
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
ht.elementStyles = [], ht.shadowRootOptions = { mode: "open" }, ht[xt("elementProperties")] = /* @__PURE__ */ new Map(), ht[xt("finalized")] = /* @__PURE__ */ new Map(), Ze?.({ ReactiveElement: ht }), (Bt.reactiveElementVersions ??= []).push("2.1.2");
const Gt = globalThis, le = (i) => i, Et = Gt.trustedTypes, de = Et ? Et.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, ke = "$lit$", tt = `lit$${Math.random().toFixed(9).slice(2)}$`, _e = "?" + tt, Ke = `<${_e}>`, ct = document, wt = () => ct.createComment(""), yt = (i) => i === null || typeof i != "object" && typeof i != "function", Zt = Array.isArray, qe = (i) => Zt(i) || typeof i?.[Symbol.iterator] == "function", jt = `[ 	
\f\r]`, ft = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, he = />/g, st = RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, ue = /"/g, Ce = /^(?:script|style|textarea|title)$/i, Se = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), g = Se(1), pt = Se(2), ut = /* @__PURE__ */ Symbol.for("lit-noChange"), v = /* @__PURE__ */ Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), lt = ct.createTreeWalker(ct, 129);
function Me(i, t) {
  if (!Zt(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return de !== void 0 ? de.createHTML(t) : t;
}
const Xe = (i, t) => {
  const e = i.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = ft;
  for (let r = 0; r < e; r++) {
    const l = i[r];
    let d, c, p = -1, h = 0;
    for (; h < l.length && (a.lastIndex = h, c = a.exec(l), c !== null); ) h = a.lastIndex, a === ft ? c[1] === "!--" ? a = ce : c[1] !== void 0 ? a = he : c[2] !== void 0 ? (Ce.test(c[2]) && (o = RegExp("</" + c[2], "g")), a = st) : c[3] !== void 0 && (a = st) : a === st ? c[0] === ">" ? (a = o ?? ft, p = -1) : c[1] === void 0 ? p = -2 : (p = a.lastIndex - c[2].length, d = c[1], a = c[3] === void 0 ? st : c[3] === '"' ? ue : pe) : a === ue || a === pe ? a = st : a === ce || a === he ? a = ft : (a = st, o = void 0);
    const x = a === st && i[r + 1].startsWith("/>") ? " " : "";
    s += a === ft ? l + Ke : p >= 0 ? (n.push(d), l.slice(0, p) + ke + l.slice(p) + tt + x) : l + tt + (p === -2 ? r : x);
  }
  return [Me(i, s + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class kt {
  constructor({ strings: t, _$litType$: e }, n) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [d, c] = Xe(t, e);
    if (this.el = kt.createElement(d, n), lt.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (o = lt.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const p of o.getAttributeNames()) if (p.endsWith(ke)) {
          const h = c[a++], x = o.getAttribute(p).split(tt), f = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: f[2], strings: x, ctor: f[1] === "." ? Je : f[1] === "?" ? Qe : f[1] === "@" ? ti : zt }), o.removeAttribute(p);
        } else p.startsWith(tt) && (l.push({ type: 6, index: s }), o.removeAttribute(p));
        if (Ce.test(o.tagName)) {
          const p = o.textContent.split(tt), h = p.length - 1;
          if (h > 0) {
            o.textContent = Et ? Et.emptyScript : "";
            for (let x = 0; x < h; x++) o.append(p[x], wt()), lt.nextNode(), l.push({ type: 2, index: ++s });
            o.append(p[h], wt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === _e) l.push({ type: 2, index: s });
      else {
        let p = -1;
        for (; (p = o.data.indexOf(tt, p + 1)) !== -1; ) l.push({ type: 7, index: s }), p += tt.length - 1;
      }
      s++;
    }
  }
  static createElement(t, e) {
    const n = ct.createElement("template");
    return n.innerHTML = t, n;
  }
}
function gt(i, t, e = i, n) {
  if (t === ut) return t;
  let o = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const s = yt(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== s && (o?._$AO?.(!1), s === void 0 ? o = void 0 : (o = new s(i), o._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = o : e._$Cl = o), o !== void 0 && (t = gt(i, o._$AS(i, t.values), o, n)), t;
}
class Ye {
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
    const { el: { content: e }, parts: n } = this._$AD, o = (t?.creationScope ?? ct).importNode(e, !0);
    lt.currentNode = o;
    let s = lt.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new Ct(s, s.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (d = new ei(s, this, t)), this._$AV.push(d), l = n[++r];
      }
      a !== l?.index && (s = lt.nextNode(), a++);
    }
    return lt.currentNode = ct, o;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Ct {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, o) {
    this.type = 2, this._$AH = v, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    t = gt(this, t, e), yt(t) ? t === v || t == null || t === "" ? (this._$AH !== v && this._$AR(), this._$AH = v) : t !== this._$AH && t !== ut && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== v && yt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = kt.createElement(Me(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(e);
    else {
      const s = new Ye(o, this), a = s.u(this.options);
      s.p(e), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let e = ge.get(t.strings);
    return e === void 0 && ge.set(t.strings, e = new kt(t)), e;
  }
  k(t) {
    Zt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, o = 0;
    for (const s of t) o === e.length ? e.push(n = new Ct(this.O(wt()), this.O(wt()), this, this.options)) : n = e[o], n._$AI(s), o++;
    o < e.length && (this._$AR(n && n._$AB.nextSibling, o), e.length = o);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = le(t).nextSibling;
      le(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class zt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, o, s) {
    this.type = 1, this._$AH = v, this._$AN = void 0, this.element = t, this.name = e, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = v;
  }
  _$AI(t, e = this, n, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = gt(this, t, e, 0), a = !yt(t) || t !== this._$AH && t !== ut, a && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = s[0], l = 0; l < s.length - 1; l++) d = gt(this, r[n + l], e, l), d === ut && (d = this._$AH[l]), a ||= !yt(d) || d !== this._$AH[l], d === v ? t = v : t !== v && (t += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === v ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Je extends zt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === v ? void 0 : t;
  }
}
class Qe extends zt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== v);
  }
}
class ti extends zt {
  constructor(t, e, n, o, s) {
    super(t, e, n, o, s), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = gt(this, t, e, 0) ?? v) === ut) return;
    const n = this._$AH, o = t === v && n !== v || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== v && (n === v || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ei {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    gt(this, t);
  }
}
const ii = Gt.litHtmlPolyfillSupport;
ii?.(kt, Ct), (Gt.litHtmlVersions ??= []).push("3.3.3");
const oi = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = e?.renderBefore ?? null;
    n._$litPart$ = o = new Ct(t.insertBefore(wt(), s), s, void 0, e ?? {});
  }
  return o._$AI(i), o;
};
const Kt = globalThis;
class ot extends ht {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oi(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ut;
  }
}
ot._$litElement$ = !0, ot.finalized = !0, Kt.litElementHydrateSupport?.({ LitElement: ot });
const ni = Kt.litElementPolyfillSupport;
ni?.({ LitElement: ot });
(Kt.litElementVersions ??= []).push("4.2.2");
const ai = { attribute: !0, type: String, converter: Ot, reflect: !1, hasChanged: Vt }, si = (i = ai, t, e) => {
  const { kind: n, metadata: o } = e;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), s.set(e.name, i), n === "accessor") {
    const { name: a } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, i, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, i, r), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = e;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, i, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function _(i) {
  return (t, e) => typeof e == "object" ? si(i, t, e) : ((n, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(i, t, e);
}
function N(i) {
  return _({ ...i, state: !0, attribute: !1 });
}
class qt {
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
    const n = this.pressing, o = this.fired;
    return this.pressing = !1, this.fired = !1, !n || o ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class Ae {
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
const Te = _t`
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
var ri = Object.defineProperty, V = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && ri(t, e, o), o;
};
const te = class te extends ot {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new Ae(this), this.nudgeIndex = 0, this.gesture = new qt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? e[0]?.value, o = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, s = this.hints.nudge && !o ? Math.sign(this.nudgeIndex - t) * 14 : 0, a = this._dragging ? this._dx : s;
    return g`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${a}px"
        @keydown=${this.onKey}
        @pointerdown=${this.onDown}
        @pointermove=${this.onMove}
        @pointerup=${this.onUp}
        @pointercancel=${this.onCancel}
        @contextmenu=${(r) => this.guarded && r.preventDefault()}
      >
        <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
        ${this.options.map(
      (r, l) => g`<button
            type="button"
            role="radio"
            aria-checked=${r.value === this.value ? "true" : "false"}
            tabindex=${r.value === n ? 0 : -1}
            ?disabled=${this.disabled || r.disabled}
            data-value=${r.value}
            data-index=${l}
            @click=${(d) => this.onClick(d, r.value, l)}
          >
            <span>${r.label}</span>${r.detail ? g`<span class="detail">${r.detail}</span>` : null}
          </button>`
    )}
      </div>
      <span class="sr" aria-live="polite">${this.hints.hint ? this.hint : ""}</span>
      ${this.hints.hint ? g`<div class="hint above ${this.compact ? "end" : "center"}" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
  }
  select(t) {
    this.disabled || t === this.value || (this.gesture.release(), this.hints.hide(), this.dispatchEvent(new CustomEvent("hdk-select", { detail: { value: t }, bubbles: !0, composed: !0 })));
  }
  onClick(t, e, n) {
    if (this.disabled || e === this.value) return;
    if (!this.guarded) {
      this.select(e);
      return;
    }
    if (t.detail === 0) {
      this.gesture.cancel(), this.select(e);
      return;
    }
    const o = this.gesture.tap(String(n), t.timeStamp);
    if (this.swallowClick || o === "none") {
      this.swallowClick = !1;
      return;
    }
    o === "double" ? this.select(e) : (this.nudgeIndex = n, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, n = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: n, moved: !1, id: t.pointerId };
    const o = t.target.closest("button[data-index]"), s = o ? Number(o.dataset.index) : -1, a = s >= 0 && s !== n && !this.options[s]?.disabled;
    this.gesture.start(() => {
      a && (this.drag = void 0, this.select(this.options[s].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const n = t.clientX - e.x;
    if (!e.moved && Math.abs(n) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const o = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((o - e.index) * e.width, n)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const n = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const o = this.options[n];
    o && !o.disabled && n !== e.index && this.select(o.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const n = this.options.filter((r) => !r.disabled);
    if (!n.length) return;
    const o = n.findIndex((r) => r.value === this.value), s = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, a = n[(o + s + n.length) % n.length];
    t.preventDefault(), this.select(a.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${a.value}"]`)?.focus());
  }
};
te.styles = [
  Te,
  _t`
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
let H = te;
V([
  _({ attribute: !1 })
], H.prototype, "options");
V([
  _()
], H.prototype, "value");
V([
  _()
], H.prototype, "label");
V([
  _({ type: Boolean })
], H.prototype, "disabled");
V([
  _({ type: Boolean })
], H.prototype, "compact");
V([
  _({ type: Boolean })
], H.prototype, "guarded");
V([
  _({ type: Number })
], H.prototype, "holdMs");
V([
  _({ type: Number })
], H.prototype, "doubleTapMs");
V([
  _({ type: Number })
], H.prototype, "hintSeconds");
V([
  _()
], H.prototype, "hint");
V([
  N()
], H.prototype, "_dx");
V([
  N()
], H.prototype, "_dragging");
var li = Object.defineProperty, K = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && li(t, e, o), o;
};
const ee = class ee extends ot {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, o = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, s = this.tickStep || this.step || 1, a = Math.floor(e / s + 1e-9) + 1, r = a >= 2 && a <= 40 ? Array.from({ length: a }, (l, d) => g`<i style="left:${(d * s / e * 100).toFixed(2)}%"></i>`) : [];
    return g`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${o}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${r}</div>
      </div>
      ${this.minLabel || this.maxLabel ? g`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("hdk-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("hdk-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
ee.styles = _t`
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
let P = ee;
K([
  _({ type: Number })
], P.prototype, "min");
K([
  _({ type: Number })
], P.prototype, "max");
K([
  _({ type: Number })
], P.prototype, "step");
K([
  _({ type: Number })
], P.prototype, "tickStep");
K([
  _({ type: Number })
], P.prototype, "value");
K([
  _()
], P.prototype, "label");
K([
  _()
], P.prototype, "valueText");
K([
  _()
], P.prototype, "minLabel");
K([
  _()
], P.prototype, "maxLabel");
K([
  _({ type: Boolean })
], P.prototype, "disabled");
K([
  N()
], P.prototype, "_drag");
var di = Object.defineProperty, J = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && di(t, e, o), o;
};
const ie = class ie extends ot {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new Ae(this), this.gesture = new qt(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
      this.gesture.release();
    };
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    return g`<button
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
      ${this.hints.hint ? g`<div class="hint ${this.hintPlacement} end" aria-hidden="true"><i></i><span style="position: relative">${this.hint}</span></div>` : null}`;
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
ie.styles = [
  Te,
  _t`
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
let U = ie;
J([
  _({ type: Boolean })
], U.prototype, "checked");
J([
  _({ type: Boolean })
], U.prototype, "disabled");
J([
  _()
], U.prototype, "label");
J([
  _({ type: Boolean })
], U.prototype, "guarded");
J([
  _({ type: Number })
], U.prototype, "holdMs");
J([
  _({ type: Number })
], U.prototype, "doubleTapMs");
J([
  _({ type: Number })
], U.prototype, "hintSeconds");
J([
  _()
], U.prototype, "hintPlacement");
J([
  _()
], U.prototype, "hint");
function ci(i) {
  const t = [
    [`${i}-switch`, U],
    [`${i}-segmented`, H],
    [`${i}-slider`, P]
  ];
  for (const [e, n] of t)
    customElements.get(e) || customElements.define(e, n);
}
const hi = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function pi(i) {
  return hi.has(i);
}
function Z(i, t) {
  return t ? i?.states?.[t] : void 0;
}
function R(i, t) {
  const e = Z(i, t)?.state;
  return e === void 0 || pi(e) ? void 0 : e;
}
function ui(i, t) {
  const e = R(i, t);
  if (e === void 0)
    return;
  const n = Number(e);
  return Number.isFinite(n) ? n : void 0;
}
function Le(i) {
  return (i?.locale?.language || i?.language || "").trim();
}
function Xt(i) {
  const t = i.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function gi(i, t) {
  return i === "auto" ? Xt(Le(t)) : i;
}
function bi() {
  return Xt(document.documentElement.lang || navigator.language || "");
}
const be = /* @__PURE__ */ new WeakMap(), mi = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, fi = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), vi = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Pt(i, t) {
  const e = i?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function xi(i, t, e) {
  const n = Le(e).replace("_", "-"), o = n !== "" && Xt(n) === t ? n : mi[t], s = Pt(e, "number_format"), a = Pt(e, "time_format"), r = Pt(e, "date_format"), l = [t, o, s, a, r].join("|");
  let d = be.get(i);
  d || (d = /* @__PURE__ */ new Map(), be.set(i, d));
  let c = d.get(l);
  return c || (c = yi(i[t], t, o, s, a, r), d.set(l, c)), c;
}
function $i(i) {
  try {
    return new Intl.NumberFormat(i), i;
  } catch {
    return "en";
  }
}
function wi(i, t) {
  if (i === "12")
    return !0;
  if (i === "24")
    return !1;
  const e = i === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function yi(i, t, e, n, o, s) {
  const a = $i(e), r = n === "system" ? void 0 : n === "none" ? "en-US" : vi[n] ?? a, l = n === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), x = wi(o, a), f = x ? "h12" : "h23", u = new Intl.DateTimeFormat(a, { hour: x ? "numeric" : "2-digit", minute: "2-digit", hourCycle: f }), b = new Intl.DateTimeFormat(a, x ? { hour: "numeric", hourCycle: f } : { hour: "2-digit", minute: "2-digit", hourCycle: f }), m = s === "system" ? void 0 : a, $ = new Intl.DateTimeFormat(m, { day: "numeric", month: "numeric" }), S = (w) => {
    if (!["DMY", "MDY", "YMD"].includes(s))
      return $.format(w);
    const C = $.formatToParts(w), E = C.find((Q) => Q.type === "literal")?.value ?? "/", j = C[C.length - 1], L = j?.type === "literal" ? j.value : "", F = C.find((Q) => Q.type === "day")?.value ?? "", mt = C.find((Q) => Q.type === "month")?.value ?? "";
    return s === "DMY" ? `${F}${E}${mt}${L}` : `${mt}${E}${F}${L}`;
  }, T = fi.has(a.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: a,
    t: i,
    one: (w) => d.format(w),
    two: (w) => c.format(w),
    half: (w) => p.format(Math.round(w * 2) / 2),
    tick: (w) => p.format(w),
    whole: (w) => h.format(w),
    percent: (w) => `${w}${T}%`,
    time: (w) => u.format(w),
    hour: (w) => b.format(w),
    day: S
  };
}
const ki = {
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
    minutes: (i) => `před ${i} min`,
    hours: (i) => `před ${i} h`,
    days: (i) => `před ${i} d`
  },
  // Sources of energy: "ze slunce", "z baterie a sítě" (from-form first, then the form after "a")
  from: { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" },
  alsoFrom: { sun: "slunce", bat: "baterie", grid: "sítě" },
  /** Names of the sources in lists (car sources). */
  source: { sun: "Slunce", bat: "Baterie", grid: "Síť" },
  // Sentence under the heading of Elektřina
  summary: {
    exportSurplus: "Přebytek jde do sítě",
    sunChargesCar: (i) => `Slunce nabíjí ${i ? "baterii i " : ""}auto`,
    sunChargesBattery: "Slunce nabíjí baterii",
    sunCoversHouse: "Slunce pokrývá dům",
    fromGrid: "Dům jede ze sítě",
    fromBattery: "Dům jede z baterie",
    nothing: "Dům nic neodebírá",
    houseTakes: (i) => `Dům bere ${i}`
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
    belowReserve: "pod rezervou",
    chargeLevel: (i) => `nabití ${i}`,
    temperature: (i) => `teplota ${i}`,
    batteryState: (i) => i ? "vybíjení" : "nabíjení"
  },
  // Popups of the tiles and of the heading
  pop: {
    discharging: (i) => `vybíjí ${i}`,
    charging: (i) => `nabíjí ${i}`,
    importing: (i) => `odebírá ${i}`,
    exporting: (i) => `dodává ${i}`,
    noFlow: "bez toku",
    carConnectedIdle: "připojeno, nenabíjí",
    heating: (i) => `ohřev ${i}`,
    level: "Nabití",
    belowReserve: "pod rezervou",
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
    charging: (i) => `Nabíjí ${i}`,
    connectedIdle: "Připojeno, nenabíjí",
    disconnected: "Odpojeno",
    openDashboard: "Otevřít dashboard auta",
    chargeLevel: (i, t) => `Nabití auta ${i}${t === void 0 ? "" : `, limit ${t}`}`,
    range: "dojezd",
    limit: (i) => `limit ${i}`,
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
    fromCar: (i) => `z auta ${i}`,
    block: "Zablokovat nabíjení",
    blockOn: "Auto nenabíjí, přebytek ohřívá vodu",
    blockOff: "Auto smí nabíjet",
    priority: "Přednost před bojlerem",
    priorityOn: "Auto nabíjí dřív než bojler",
    priorityOff: "Auto nemá přednost"
  },
  // Hot water panel
  water: {
    boilerHeats: (i) => `Bojler ohřívá ${i}`,
    noHeating: "Bez ohřevu",
    boilerTitle: "Bojler (FVE)",
    notHeating: "neohřívá",
    target: (i) => `cíl ${i}`,
    boilerLabel: (i, t, e, n, o) => `Bojler ${i}, ${t}${e === void 0 ? "" : `, cíl ${e}`}, stupnice ${n} až ${o}`,
    heatingWith: (i) => `ohřívá výkonem ${i}`,
    boostMode: "Režim ohřevu bojleru",
    targets: "Cílové teploty",
    targetFlow: "Přetoky",
    targetBoost: "Boost",
    targetFlowHint: "jen z přebytku",
    targetBoostHint: "i ze sítě a z baterie",
    targetsRule: "Přetoky nesmí být pod Boostem.",
    targetSliderLabel: (i) => `Cíl ohřevu bojleru, ${i}`,
    targetSliderSpoken: (i, t) => `${i}, ${t}`,
    targetWhat: (i) => `Cíl ohřevu bojleru (${i})`,
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
    summaryOff: (i) => `${i} · vypnuto`,
    summaryManual: (i) => `${i} · ručně`,
    summaryPlan: (i) => `${i} · podle plánu`,
    hintOff: "zásobník je vypnutý",
    hintManual: "nastavujete ručně",
    hintPlan: "podle plánu; změna přepne na Manual",
    sliderSpoken: (i) => `${i}, nastavená teplota`,
    label: (i, t, e, n) => `Zásobník, ${i}, režim ${t}, naměřená teplota není, stupnice ${e} až ${n}`,
    settingNoData: "nastavení bez dat",
    settingOff: (i) => `vypnuto, kotel drží ${i}`,
    settingSet: (i) => `nastaveno ${i}`
  },
  // Hints of the protected controls (hold or double tap)
  hint: {
    holdOrDouble: "Podržte nebo klepněte dvakrát.",
    holdDragOrDouble: "Podržte, přetáhněte nebo klepněte dvakrát."
  },
  // Feedback under the card
  feedback: {
    noData: (i) => `${i}: entita nehlásí data, nic jsem neodeslal.`,
    rejected: (i) => `${i}: Home Assistant příkaz nepřijal.`,
    unblocked: "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval.",
    mixingNotSent: "Mísení vody: příkaz se neodeslal."
  }
}, _i = {
  title: "Energy",
  cardDescription: "Home energy: flows as a Sankey diagram, the car with its wallbox and hot water (boiler, tank, mixing) with controls.",
  titles: { electricity: "Electricity", car: "BMW i3", water: "Hot water" },
  noData: "no data",
  close: "Close",
  and: "and",
  ago: {
    now: "just now",
    minutes: (i) => `${i} min ago`,
    hours: (i) => `${i} h ago`,
    days: (i) => `${i} d ago`
  },
  from: { sun: "from the sun", bat: "from the battery", grid: "from the grid" },
  alsoFrom: { sun: "the sun", bat: "the battery", grid: "the grid" },
  source: { sun: "Sun", bat: "Battery", grid: "Grid" },
  summary: {
    exportSurplus: "Surplus goes to the grid",
    sunChargesCar: (i) => `The sun charges the ${i ? "battery and the " : ""}car`,
    sunChargesBattery: "The sun charges the battery",
    sunCoversHouse: "The sun covers the house",
    fromGrid: "The house runs on the grid",
    fromBattery: "The house runs on the battery",
    nothing: "The house draws nothing",
    houseTakes: (i) => `The house takes energy ${i}`
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
    belowReserve: "below reserve",
    chargeLevel: (i) => `charge ${i}`,
    temperature: (i) => `temperature ${i}`,
    batteryState: (i) => i ? "discharging" : "charging"
  },
  pop: {
    discharging: (i) => `discharging ${i}`,
    charging: (i) => `charging ${i}`,
    importing: (i) => `importing ${i}`,
    exporting: (i) => `exporting ${i}`,
    noFlow: "no flow",
    carConnectedIdle: "plugged in, not charging",
    heating: (i) => `heating ${i}`,
    level: "Charge",
    belowReserve: "below reserve",
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
    charging: (i) => `Charging ${i}`,
    connectedIdle: "Plugged in, not charging",
    disconnected: "Unplugged",
    openDashboard: "Open the car dashboard",
    chargeLevel: (i, t) => `Car charge ${i}${t === void 0 ? "" : `, limit ${t}`}`,
    range: "range",
    limit: (i) => `limit ${i}`,
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
    fromCar: (i) => `from the car ${i}`,
    block: "Block charging",
    blockOn: "The car does not charge, the surplus heats the water",
    blockOff: "The car may charge",
    priority: "Priority over the boiler",
    priorityOn: "The car charges before the boiler",
    priorityOff: "The car has no priority"
  },
  water: {
    boilerHeats: (i) => `The boiler heats ${i}`,
    noHeating: "Not heating",
    boilerTitle: "Boiler (PV)",
    notHeating: "not heating",
    target: (i) => `target ${i}`,
    boilerLabel: (i, t, e, n, o) => `Boiler ${i}, ${t}${e === void 0 ? "" : `, target ${e}`}, scale ${n} to ${o}`,
    heatingWith: (i) => `heating with ${i}`,
    boostMode: "Boiler heating mode",
    targets: "Target temperatures",
    targetFlow: "Surplus",
    targetBoost: "Boost",
    targetFlowHint: "from the surplus only",
    targetBoostHint: "also from the grid and the battery",
    targetsRule: "Surplus may not be below Boost.",
    targetSliderLabel: (i) => `Boiler heating target, ${i}`,
    targetSliderSpoken: (i, t) => `${i}, ${t}`,
    targetWhat: (i) => `Boiler heating target (${i})`,
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
    summaryOff: (i) => `${i} · off`,
    summaryManual: (i) => `${i} · manual`,
    summaryPlan: (i) => `${i} · by schedule`,
    hintOff: "the tank is off",
    hintManual: "you set it manually",
    hintPlan: "by schedule; a change switches to Manual",
    sliderSpoken: (i) => `${i}, set temperature`,
    label: (i, t, e, n) => `Tank, ${i}, mode ${t}, no measured temperature, scale ${e} to ${n}`,
    settingNoData: "setting not available",
    settingOff: (i) => `off, the boiler keeps ${i}`,
    settingSet: (i) => `set to ${i}`
  },
  hint: {
    holdOrDouble: "Press and hold, or tap twice.",
    holdDragOrDouble: "Press and hold, drag, or tap twice."
  },
  feedback: {
    noData: (i) => `${i}: the entity reports no data, nothing was sent.`,
    rejected: (i) => `${i}: Home Assistant did not accept the command.`,
    unblocked: "Charging was blocked; I turned the block off so that Boost works.",
    mixingNotSent: "Water mixing: the command was not sent."
  }
}, Ci = {
  title: "Energi",
  cardDescription: "Hemmets energi: flöden som Sankey-diagram, bilen med laddbox och varmvatten (beredare, tank, blandning) med styrning.",
  titles: { electricity: "El", car: "BMW i3", water: "Varmvatten" },
  noData: "inga data",
  close: "Stäng",
  and: "och",
  ago: {
    now: "just nu",
    minutes: (i) => `för ${i} min sedan`,
    hours: (i) => `för ${i} h sedan`,
    days: (i) => `för ${i} d sedan`
  },
  from: { sun: "från solen", bat: "från batteriet", grid: "från nätet" },
  alsoFrom: { sun: "solen", bat: "batteriet", grid: "nätet" },
  source: { sun: "Sol", bat: "Batteri", grid: "Nät" },
  summary: {
    exportSurplus: "Överskottet går ut på nätet",
    sunChargesCar: (i) => `Solen laddar ${i ? "batteriet och " : ""}bilen`,
    sunChargesBattery: "Solen laddar batteriet",
    sunCoversHouse: "Solen täcker huset",
    fromGrid: "Huset går på nätet",
    fromBattery: "Huset går på batteriet",
    nothing: "Huset drar ingenting",
    houseTakes: (i) => `Huset tar energi ${i}`
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
    belowReserve: "under reserven",
    chargeLevel: (i) => `laddning ${i}`,
    temperature: (i) => `temperatur ${i}`,
    batteryState: (i) => i ? "urladdning" : "laddning"
  },
  pop: {
    discharging: (i) => `laddar ur ${i}`,
    charging: (i) => `laddar ${i}`,
    importing: (i) => `köper ${i}`,
    exporting: (i) => `säljer ${i}`,
    noFlow: "inget flöde",
    carConnectedIdle: "ansluten, laddar inte",
    heating: (i) => `värmer ${i}`,
    level: "Laddning",
    belowReserve: "under reserven",
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
    charging: (i) => `Laddar ${i}`,
    connectedIdle: "Ansluten, laddar inte",
    disconnected: "Urkopplad",
    openDashboard: "Öppna bilens dashboard",
    chargeLevel: (i, t) => `Bilens laddning ${i}${t === void 0 ? "" : `, gräns ${t}`}`,
    range: "räckvidd",
    limit: (i) => `gräns ${i}`,
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
    fromCar: (i) => `från bilen ${i}`,
    block: "Blockera laddning",
    blockOn: "Bilen laddar inte, överskottet värmer vattnet",
    blockOff: "Bilen får ladda",
    priority: "Företräde före beredaren",
    priorityOn: "Bilen laddar före beredaren",
    priorityOff: "Bilen har inget företräde"
  },
  water: {
    boilerHeats: (i) => `Beredaren värmer ${i}`,
    noHeating: "Ingen uppvärmning",
    boilerTitle: "Beredare (sol)",
    notHeating: "värmer inte",
    target: (i) => `mål ${i}`,
    boilerLabel: (i, t, e, n, o) => `Beredare ${i}, ${t}${e === void 0 ? "" : `, mål ${e}`}, skala ${n} till ${o}`,
    heatingWith: (i) => `värmer med ${i}`,
    boostMode: "Beredarens värmeläge",
    targets: "Måltemperaturer",
    targetFlow: "Överskott",
    targetBoost: "Boost",
    targetFlowHint: "bara från överskottet",
    targetBoostHint: "även från nätet och batteriet",
    targetsRule: "Överskott får inte ligga under Boost.",
    targetSliderLabel: (i) => `Beredarens måltemperatur, ${i}`,
    targetSliderSpoken: (i, t) => `${i}, ${t}`,
    targetWhat: (i) => `Beredarens måltemperatur (${i})`,
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
    summaryOff: (i) => `${i} · av`,
    summaryManual: (i) => `${i} · manuellt`,
    summaryPlan: (i) => `${i} · enligt schema`,
    hintOff: "tanken är av",
    hintManual: "du ställer in manuellt",
    hintPlan: "enligt schema; en ändring växlar till Manuell",
    sliderSpoken: (i) => `${i}, inställd temperatur`,
    label: (i, t, e, n) => `Tank, ${i}, läge ${t}, ingen uppmätt temperatur, skala ${e} till ${n}`,
    settingNoData: "inställning saknas",
    settingOff: (i) => `av, pannan håller ${i}`,
    settingSet: (i) => `inställd på ${i}`
  },
  hint: {
    holdOrDouble: "Håll nedtryckt eller tryck två gånger.",
    holdDragOrDouble: "Håll nedtryckt, dra eller tryck två gånger."
  },
  feedback: {
    noData: (i) => `${i}: enheten rapporterar inga data, inget skickades.`,
    rejected: (i) => `${i}: Home Assistant tog inte emot kommandot.`,
    unblocked: "Laddningen var blockerad; jag tog bort blockeringen så att Boost fungerar.",
    mixingNotSent: "Vattenblandning: kommandot skickades inte."
  }
}, Si = { cs: ki, en: _i, sv: Ci };
function Dt(i, t) {
  return xi(Si, i, t);
}
function D(i, t) {
  const e = ui(i, t);
  if (e !== void 0)
    return Z(i, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let nt = Dt("cs"), Ft = "auto";
function Mi(i, t = "auto") {
  nt = i, Ft = t;
}
function Yt(i, t = 1e3) {
  return i.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function Ai(i) {
  const t = Ft === "auto" ? Math.abs(Math.round(i * 100) / 100) < 10 ? 2 : Math.abs(Math.round(i * 10) / 10) < 100 ? 1 : 0 : Ft;
  return t === 2 ? nt.two(i) : t === 1 ? nt.one(i) : nt.whole(i);
}
function bt(i, t) {
  return t === "kW" ? `${Ai(i / 1e3)} kW` : `${nt.whole(Math.round(i))} W`;
}
function k(i, t = 0) {
  return t === 0 ? nt.whole(i) : nt.one(i);
}
function it(i) {
  return nt.percent(typeof i == "number" ? k(i) : i);
}
function Ti(i, t) {
  const e = Z(i, t), n = R(i, t);
  if (n === void 0) return;
  const o = Number(n);
  if (!Number.isFinite(o)) return;
  const s = e?.attributes?.unit_of_measurement;
  return s === "Wh" ? o / 1e3 : s === "MWh" ? o * 1e3 : o;
}
function me(i) {
  return i < 0.05 ? "0" : k(i, 1);
}
function Li(i, t, e) {
  const n = i ? Date.parse(i) : NaN;
  if (!Number.isFinite(n)) return;
  const o = Math.max(0, Math.round((t - n) / 6e4));
  return o < 1 ? e.ago.now : o < 60 ? e.ago.minutes(o) : o < 1440 ? e.ago.hours(Math.round(o / 60)) : e.ago.days(Math.round(o / 1440));
}
const W = ["sun", "bat", "grid"], vt = ["house", "car", "boil", "batIn", "gridOut"], Mt = (i) => i === void 0 ? void 0 : Math.max(0, i), z = (i, t) => i !== void 0 && i >= t;
function Oi(i) {
  if (i === "Disconnected") return "disconnected";
  if (i === "Waiting") return "connected";
  if (i === "Charging") return "charging";
}
function Ei(i, t, e) {
  const n = t.entities, o = t.num.flows.idle_threshold, s = Mt(D(i, n.pv.power)), a = D(i, n.battery.power), r = D(i, n.grid.power), l = Mt(D(i, n.house.power)), d = Mt(D(i, n.wallbox.power)), c = Mt(D(i, n.boiler.power)), p = a === void 0 ? void 0 : Math.max(0, a), h = a === void 0 ? void 0 : Math.max(0, -a), x = r === void 0 ? void 0 : Math.max(0, -r), f = r === void 0 ? void 0 : Math.max(0, r), u = l === void 0 ? void 0 : Math.max(0, l - (d ?? 0) - (c ?? 0)), b = (E) => z(E, o) ? E : 0, m = {
    sun: Math.max(0, b(s) - b(h) - b(f)),
    bat: b(p),
    grid: b(x)
  }, $ = m.sun + m.bat + m.grid, S = { sun: 0, bat: 0, grid: 0 };
  if ($ > 0)
    for (const E of W) S[E] = m[E] / $;
  const T = [], w = [
    ["house", u],
    ["car", d],
    ["boil", c]
  ];
  for (const [E, j] of w)
    if (z(j, o))
      for (const L of W) {
        const F = j * S[L];
        F > 0.5 && T.push({ from: L, to: E, watts: F });
      }
  z(h, o) && T.push({ from: "sun", to: "batIn", watts: h }), z(f, o) && T.push({ from: "sun", to: "gridOut", watts: f });
  const C = {
    sun: s,
    batDis: p,
    batIn: h,
    imp: x,
    exp: f,
    other: u,
    car: d,
    boil: c,
    share: S,
    flows: T,
    soc: D(i, n.battery.state_of_charge),
    carSoc: D(i, n.car.state_of_charge),
    carRange: D(i, n.car.range),
    boilTemp: D(i, n.boiler.temperature),
    carLink: Oi(R(i, n.wallbox.status))
  };
  return Object.assign(C, Di(C, t.num.flows, e)), C;
}
function Di(i, t, e) {
  const n = t.idle_threshold, o = (h) => z(h, n);
  if ([i.sun, i.batDis, i.imp, i.other].every((h) => h === void 0)) return {};
  if (o(i.sun) && !o(i.imp) && !o(i.batDis)) {
    let h;
    return (i.exp ?? 0) > t.export_notice && !o(i.batIn) ? h = e.summary.exportSurplus : o(i.car) ? h = e.summary.sunChargesCar(o(i.batIn)) : o(i.batIn) ? h = e.summary.sunChargesBattery : h = e.summary.sunCoversHouse, { summary: h, summarySource: "sun" };
  }
  const { sun: r, bat: l, grid: d } = i.share;
  if (d > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const c = t.source_min_share / 100;
  if (r < c && d < c && l > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const p = Ee(i.share, c);
  return p.length ? { summary: e.summary.houseTakes(Oe(p, e)), summarySource: p[0] } : { summary: e.summary.nothing };
}
function Oe(i, t) {
  return t.from[i[0]] + i.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function Ee(i, t) {
  return W.filter((e) => i[e] >= t).sort((e, n) => i[n] - i[e]);
}
function De(i, t, e) {
  let n = Ee(i, t.source_min_share / 100);
  n.length || (n = ["sun"]);
  const o = i.grid > t.grid_deviation_share / 100;
  return { text: Oe(n, e), main: o ? "grid" : n[0], deviation: o };
}
function Bi(i, t) {
  if (!(i === void 0 || t === void 0))
    return i === "off" && t === "on" ? "on" : i === "on" && t === "off" ? "off" : "unclear";
}
const zi = _t`
  :host {
    display: block;
    --ed-card: #1c1c1e;
    --ed-tile: #2c2c2e;
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
    height: 34px;
    border-radius: 12px;
    background: var(--ed-tile);
    overflow: hidden;
  }

  .meter .fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 12px;
    background: var(--ed-car);
  }

  .meter .ticks {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(90deg, transparent 0, transparent calc(10% - 1px), rgb(0 0 0 / 28%) calc(10% - 1px), rgb(0 0 0 / 28%) 10%);
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
    gap: 3px;
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
`, Hi = ["cs", "en", "sv"];
class Be extends Error {
}
function O(i) {
  throw new Be(i);
}
function ji(i, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof Be ? new Error(`${i}: ${e.message}`) : e;
  }
}
function Jt(i) {
  return typeof i == "object" && i !== null && !Array.isArray(i);
}
function at(i, t) {
  return i == null ? {} : (Jt(i) || O(`"${t}" must be a mapping of keys.`), i);
}
function St(i, t, e) {
  for (const n of Object.keys(i))
    t.includes(n) || O(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function Pi(i, t, e = {}) {
  if (i == null)
    return;
  const n = typeof i == "string" ? i.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || O(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && O(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
const fe = ["auto", ...Hi];
function Ni(i) {
  const t = i ?? "auto";
  return fe.includes(t) || O(`language must be one of ${fe.join(", ")}.`), t;
}
const Ht = {
  pv: { power: void 0 },
  battery: { power: void 0, state_of_charge: void 0, depth_of_discharge: "number" },
  grid: { power: void 0 },
  house: { power: void 0 },
  car: { state_of_charge: void 0, range: void 0, image: "image" },
  wallbox: { power: void 0, status: void 0, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch" },
  daily: { pv_generation: void 0, battery_charge: void 0, battery_discharge: void 0, grid_import: void 0, grid_export: void 0, car: void 0, boiler: void 0 }
}, ze = { boiler: ["show"], car: ["link"], flows: ["decimals"] }, ve = ["always", "heating"], Fi = "heating", xe = ["auto", 1, 2], Ii = "auto", He = Object.keys(Ht), y = (i, t, e, n, o = !1) => ({ value: i, min: t, max: e, what: n, integer: o }), Qt = {
  battery: { reserve: y(20, 0, 100, "% battery reserve") },
  car: {
    charge_limit: y(100, 1, 100, "% charge limit of the car (the marker is drawn below 100)"),
    image_scale: y(2, 0.5, 3, "× size of the car picture (grows up and to the sides, the bottom stays)")
  },
  wallbox: {
    phases: y(3, 1, 3, "number of phases", !0),
    power_min: y(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: y(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: y(300, 1, 1e5, "W, step of the charging power (all phases)"),
    priority_min_sun: y(200, 0, 1e5, "W of sun above which a waiting car is reported")
  },
  boiler: {
    target_min: y(20, 0, 100, "°C, lowest target"),
    target_max: y(85, 0, 100, "°C, highest target"),
    target_step: y(5, 1, 50, "°C, target step"),
    hold_minutes: y(15, 0, 1440, "min the boiler tile stays after heating (boiler.show: heating)")
  },
  water: {
    gauge_min: y(15, -50, 100, "°C, start of the hot-water gauges and of the boiler tile fill"),
    gauge_max: y(65, 0, 150, "°C, end of the hot-water gauges (the higher of this and the surplus target counts)")
  },
  tank: {
    temp_min: y(38, 0, 100, "°C, lowest temperature"),
    temp_max: y(65, 0, 100, "°C, highest temperature"),
    temp_step: y(1, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: y(100, 0, 1e3, "W, below this a flow counts as none"),
    kw_from: y(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    export_notice: y(300, 0, 1e5, "W of export that counts as a surplus"),
    source_min_share: y(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: y(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: y(10, 0.5, 50, "px per kW, thickness of the bands"),
    band_min_px: y(1.6, 0.5, 10, "px, thinnest band")
  },
  scale: {
    sun: y(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: y(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: y(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: y(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: y(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: y(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: {
    revert_after: y(6, 1, 60, "s until a chosen value falls back to the real state"),
    hold_ms: y(550, 200, 3e3, "ms to hold a protected control to switch it", !0),
    double_tap_ms: y(400, 150, 1e3, "ms between the two taps of a double tap", !0),
    hint_seconds: y(3, 1, 10, "s the hint of a protected control stays")
  }
}, Lt = {
  sun: "#FFD60A",
  battery: "#30D158",
  grid: "#3D8BFF",
  house: "#BF5AF2",
  car: "#40D0E6",
  boiler: "#FF6F59",
  accent: "#0A84FF",
  warning: "#FF9230",
  neutral: "#8E8E93",
  cold: "#64D2FF",
  hot: "#FF9F0A"
}, Ri = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], It = ["electricity", "car", "water"];
[
  ...He.flatMap((i) => Object.keys(Ht[i]).map((t) => `${i}.${t}`)),
  ...Object.entries(Qt).flatMap(([i, t]) => Object.keys(t).map((e) => `${i}.${e}`)),
  ...It.map((i) => `titles.${i}`),
  ...Object.keys(Lt).map((i) => `colors.${i}`)
];
function Wi(i, t) {
  const e = at(i[t], t), n = Ht[t], o = [...Object.keys(Qt[t] ?? {}), ...ze[t] ?? []];
  St(e, [...Object.keys(n), ...o], t);
  const s = {};
  for (const [a, r] of Object.entries(n)) {
    const l = Pi(e[a], `${t}.${a}`, { domain: r });
    l && (s[a] = l);
  }
  return s;
}
function Ui(i) {
  const t = {};
  for (const [e, n] of Object.entries(Qt)) {
    const o = at(i[e], e), s = Object.keys(Ht[e] ?? {});
    St(o, [...s, ...Object.keys(n), ...ze[e] ?? []], e), t[e] = {};
    for (const [a, r] of Object.entries(n)) {
      const l = o[a], d = `${e}.${a}`;
      if (l == null) {
        t[e][a] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && O(`${d} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && O(`${d} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][a] = l;
    }
  }
  return t;
}
function Vi(i) {
  const t = at(i.colors, "colors");
  St(t, [...Object.keys(Lt), "temp_scale"], "colors");
  const e = { ...Lt };
  for (const n of Object.keys(Lt)) {
    const o = t[n];
    o != null && ((typeof o != "string" || !/^#[0-9a-fA-F]{6}$/.test(o.trim())) && O(`colors.${n} must be a colour like #FFD60A (six hex digits).`), e[n] = o.trim().toUpperCase());
  }
  return e;
}
function Gi(i) {
  const t = at(i.colors, "colors").temp_scale;
  if (t == null)
    return Ri.map((o) => ({ ...o }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && O(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const n = t.map((o, s) => (Jt(o) || O(`${e}[${s}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), St(o, ["temp", "color"], `${e}[${s}]`), (typeof o.temp != "number" || !Number.isFinite(o.temp)) && O(`${e}[${s}].temp must be a number (°C).`), (typeof o.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(o.color.trim())) && O(`${e}[${s}].color must be a colour like #0A84FF (six hex digits).`), { temp: o.temp, color: o.color.trim().toUpperCase() }));
  return n.forEach((o, s) => {
    s > 0 && o.temp <= n[s - 1].temp && O(`${e}: temperatures must rise (${n[s - 1].temp} is followed by ${o.temp}).`);
  }), n;
}
function Zi(i) {
  const t = at(i.boiler, "boiler").show;
  return t == null ? Fi : ((typeof t != "string" || !ve.includes(t)) && O(`boiler.show must be one of ${ve.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Ki(i) {
  const t = at(i.flows, "flows").decimals;
  return t == null ? Ii : (xe.includes(t) || O(`flows.decimals must be one of ${xe.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const qi = "/dashboard-bmw";
function Xi(i) {
  const t = at(i.car, "car").link;
  return t == null ? qi : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && O(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function Yi(i) {
  const t = at(i.titles, "titles");
  St(t, [...It], "titles");
  const e = {};
  for (const n of It) {
    const o = t[n];
    o != null && ((typeof o != "string" || o.trim() === "") && O(`titles.${n} must be a non-empty text.`), e[n] = o.trim());
  }
  return e;
}
function Ji(i) {
  const t = [
    [i.wallbox.power_min, i.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [i.boiler.target_min, i.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [i.water.gauge_min, i.water.gauge_max, "water.gauge_min", "water.gauge_max", !0],
    [i.tank.temp_min, i.tank.temp_max, "tank.temp_min", "tank.temp_max", !0]
  ];
  for (const [e, n, o, s, a] of t)
    (a ? e >= n : e > n) && O(`${o} (${e}) must be ${a ? "below" : "at most"} ${s} (${n}).`);
}
function Qi(i) {
  return ji("Energie Dashboard", () => to(i));
}
function to(i) {
  Jt(i) || O("the configuration must be a mapping of keys."), i.title != null && typeof i.title != "string" && O("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(He.map((o) => [o, Wi(i, o)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && O("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = Ui(i);
  Ji(e);
  const n = Ni(i.language);
  return { title: i.title ?? void 0, language: n, entities: t, titles: Yi(i), num: e, colors: Vi(i), tempScale: Gi(i), boilerShow: Zi(i), powerDecimals: Ki(i), carLink: Xi(i) };
}
const M = "––", X = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, $e = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, we = "ha-energie-dashboard:boiler-heating";
function Y(i, t) {
  const e = i?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function eo(i) {
  const t = i.reduce((s, a) => s + a, 0);
  if (t <= 0) return i.map(() => 0);
  const e = i.map((s) => s / t * 100), n = e.map(Math.floor);
  let o = 100 - n.reduce((s, a) => s + a, 0);
  return e.map((s, a) => ({ index: a, rest: s - n[a] })).sort((s, a) => a.rest - s.rest).forEach(({ index: s }) => {
    o-- > 0 && n[s]++;
  }), n;
}
const et = (i, t, e) => Math.max(t, Math.min(e, i)), rt = (i, t) => `color-mix(in srgb, ${i} ${t}%, transparent)`, io = (i) => Array.from({ length: 10 }, (t, e) => et((i - e * 10) / 10, 0, 1) * 100);
var oo = Object.defineProperty, q = (i, t, e, n) => {
  for (var o = void 0, s = i.length - 1, a; s >= 0; s--)
    (a = i[s]) && (o = a(t, e, o) || o);
  return o && oo(t, e, o), o;
};
class G extends ot {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._i18n = Dt("cs"), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = Qi(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(we)) || 0);
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
    this._i18n = Dt(gi(this._config?.language ?? "auto", this.hass), this.hass), Mi(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && z(D(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(we, String(this._lastHeating));
      } catch {
      }
    }
  }
  updated(t) {
    super.updated(t);
    const e = this.renderRoot.querySelector(".flow");
    if (e && !this._observer && (this._observer = new ResizeObserver(() => {
      const o = Math.round(e.getBoundingClientRect().width);
      o > 0 && o !== this._width && (this._width = o);
    }), this._observer.observe(e)), t.has("hass")) {
      const o = Object.entries(this._optimistic).filter(([s, a]) => this.hass?.states?.[s]?.state === a);
      if (o.length) {
        const s = { ...this._optimistic };
        o.forEach(([a]) => delete s[a]), this._optimistic = s;
      }
    }
    t.has("hass") && this._tankTemp && Y(Z(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const n = this._config;
    if (window.clearTimeout(this._timers.get("hold")), n && n.boilerShow === "heating" && this._lastHeating) {
      const o = this._lastHeating + n.num.boiler.hold_minutes * 6e4 - Date.now();
      o > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), o + 50));
    }
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${X[t.main]})`;
  }
  stateLine(t, e) {
    return g`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? g`${M}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !z(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || z(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const e = D(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
}
q([
  N()
], G.prototype, "_config");
q([
  _({ attribute: !1 })
], G.prototype, "hass");
q([
  N()
], G.prototype, "_width");
q([
  N()
], G.prototype, "_optimistic");
q([
  N()
], G.prototype, "_feedback");
q([
  N()
], G.prototype, "_open");
q([
  N()
], G.prototype, "_pop");
q([
  N()
], G.prototype, "_all");
q([
  N()
], G.prototype, "_now");
q([
  N()
], G.prototype, "_carHint");
q([
  N()
], G.prototype, "_tankTemp");
const no = (i) => class extends i {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? R(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, n, o) {
    const s = this.shown(e);
    return g`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${o ? "warn" : ""}">${s === void 0 ? M : n}</span></span>
        <ed-switch
          label=${t} .checked=${s === "on"} ?disabled=${s === void 0}
          @hdk-toggle=${(a) => this.setSwitch(e, a.detail.checked, t)}
        ></ed-switch>
      </div>`;
  }
  // ---------------------------------------------------------------- actions
  choose(t, e) {
    this._optimistic = { ...this._optimistic, [t]: e }, window.clearTimeout(this._timers.get(t)), this._timers.set(t, window.setTimeout(() => {
      const n = { ...this._optimistic };
      delete n[t], this._optimistic = n;
    }, (this._config?.num.ui.revert_after ?? 6) * 1e3));
  }
  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  async call(t, e, n, o, s) {
    if (!this.hass || R(this.hass, o) === void 0)
      return this._feedback = this.t.feedback.noData(s), !1;
    try {
      return await this.hass.callService(t, e, n), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(s), !1;
    }
  }
  async setSwitch(t, e, n) {
    this._feedback = "", this.choose(t, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: t }, t, n);
  }
  async setBoost(t, e) {
    const n = this._config.entities, o = t === "wallbox" ? n.wallbox.boost : n.boiler.boost;
    o && (this._feedback = "", t === "wallbox" && e && n.wallbox.block_charging && R(this.hass, n.wallbox.block_charging) === "on" && (await this.setSwitch(n.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(o, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: o }, o, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, e, n) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, n);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, this.t.tank.modeLabel) && e === "heat") {
      const { min: n, max: o } = this.tankRange(this._config), s = Y(Z(this.hass, t), "temperature");
      (s === void 0 || s < n || s > o) && await this.setTemperature(t, et(s ?? n, n, o));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = Z(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, Y(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, Y(e, "max_temp") ?? t.num.tank.temp_max)
    };
  }
  async setTemperature(t, e) {
    return this._tankTemp = { id: t, value: e }, window.clearTimeout(this._timers.get("tank-temp")), this._timers.set("tank-temp", window.setTimeout(() => this._tankTemp = void 0, (this._config?.num.ui.revert_after ?? 6) * 1e3)), this.call("water_heater", "set_temperature", { entity_id: t, temperature: e }, t, this.t.tank.sliderLabel);
  }
  /** Moving the temperature in Auto switches the tank to Manual first (CURRENT_SPEC.md, Zásobník). */
  async setTankTemperature(t, e, n) {
    this._feedback = "", !(n !== "heat" && (this.choose(t, "heat"), !await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: "heat" }, t, this.t.tank.modeLabel))) && await this.setTemperature(t, e);
  }
  /**
   * Manual mixing switches both valves directly and at once (mixing = C1 off + C2 on, not mixing = C1 on + C2 off),
   * so it works from any valve state, even an unclear one. Automations are not touched.
   */
  async setMixing(t) {
    const { valve_c1: e, valve_c2: n } = this._config.entities.mixing;
    if (!e || !n) return;
    this._feedback = "";
    const o = t === "on" ? "off" : "on", s = t === "on" ? "on" : "off";
    this.choose(e, o), this.choose(n, s), (await Promise.all([
      this.call("switch", `turn_${o}`, { entity_id: e }, e, this.t.water.mixing),
      this.call("switch", `turn_${s}`, { entity_id: n }, n, this.t.water.mixing)
    ])).every(Boolean) || (this._feedback = this._feedback || this.t.feedback.mixingNotSent);
  }
};
function ao(i, t = vt) {
  const e = Math.round(Math.max(116, Math.min(132, i * 0.377))), n = 56, o = 6, s = Math.max(1, t.length), a = s * n + (s - 1) * o, r = Object.fromEntries(t.map((d, c) => [d, n / 2 + c * (n + o)])), l = Object.fromEntries(
    W.map((d, c) => [d, s < 4 ? n / 2 + c * (n + o) : (c + 0.5) * a / W.length])
  );
  return { width: i, tile: { w: e, h: n }, gap: o, height: a, left: l, right: r, xa: e - 8, xb: i - e + 8 };
}
const B = (i) => i.toFixed(1);
function so(i, t, e) {
  const n = i.filter((u) => u.to in t.right);
  if (!n.length) return [];
  const o = (u) => {
    const b = /* @__PURE__ */ new Map();
    for (const m of n) b.set(m[u], (b.get(m[u]) ?? 0) + m.watts);
    return b;
  }, s = Math.max(...o("from").values(), ...o("to").values()), a = Math.min(e.maxPxPerKw / 1e3, 44 / s), r = (u) => Math.max(e.minPx, u.watts * a), l = /* @__PURE__ */ new Map();
  for (const u of W) {
    const b = n.filter((m) => m.from === u).reduce((m, $) => m + r($), 0);
    l.set(u, t.left[u] - b / 2);
  }
  const d = /* @__PURE__ */ new Map();
  for (const u of vt.filter((b) => b in t.right)) {
    const b = n.filter((m) => m.to === u).reduce((m, $) => m + r($), 0);
    d.set(u, t.right[u] - b / 2);
  }
  const c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const u of W)
    for (const b of n.filter((m) => m.from === u).sort((m, $) => vt.indexOf(m.to) - vt.indexOf($.to)))
      c.set(b, l.get(u)), l.set(u, l.get(u) + r(b));
  for (const u of vt.filter((b) => b in t.right))
    for (const b of n.filter((m) => m.to === u).sort((m, $) => W.indexOf(m.from) - W.indexOf($.from)))
      p.set(b, d.get(u)), d.set(u, d.get(u) + r(b));
  const { xa: h, xb: x } = t, f = (h + x) / 2;
  return n.map((u) => {
    const b = r(u), m = c.get(u), $ = m + b, S = p.get(u), T = S + b;
    return {
      from: u.from,
      to: u.to,
      watts: u.watts,
      thickness: b,
      d: `M${h} ${B(m)} C${B(f)} ${B(m)} ${B(f)} ${B(S)} ${x} ${B(S)} L${x} ${B(T)} C${B(f)} ${B(T)} ${B(f)} ${B($)} ${h} ${B($)} Z`,
      centre: `M${h} ${B(m + b / 2)} C${B(f)} ${B(m + b / 2)} ${B(f)} ${B(S + b / 2)} ${x} ${B(S + b / 2)}`
    };
  });
}
const A = {
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
}, ro = (i) => class extends i {
  onKey(t) {
    t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const n = this.t, o = t.entities.wallbox, s = [], a = e.carLink === "connected" || e.carLink === "charging", r = R(this.hass, o.block_charging) === "on", l = R(this.hass, o.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    return r ? s.push({ kind: "info", ...n.alerts.blocked }) : l && s.push({ kind: "warn", ...n.alerts.priorityWaiting }), R(this.hass, o.boost) === "on" && a && s.push({ kind: "warn", ...n.alerts.boostWallbox }), R(this.hass, t.entities.boiler.boost) === "on" && s.push({ kind: "warn", ...n.alerts.boostBoiler }), s;
  }
  renderAlerts(t, e) {
    const n = this.alerts(t, e);
    return n.length ? g`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${n.map(
      (o) => g`<li class="alert ${o.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${o.kind === "warn" ? A.alert : A.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${o.title}</span><span class="alert-text">${o.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : v;
  }
  renderElectricity(t, e) {
    const n = e.summarySource ? `var(${X[e.summarySource]})` : void 0;
    return g`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(o) => {
      o.stopPropagation(), this.openAll();
    }}>
              ${t.titles.electricity ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${A.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(e.summary, n)}
        </div>
        ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : v}
        ${this._pop || this._all ? g`<button type="button" class="scrim" aria-label=${this.t.close} @click=${() => this.closePop()}></button>` : v}
      </section>`;
  }
  openAll() {
    this._all = !this._all, this._pop = void 0;
  }
  closePop() {
    this._pop = void 0, this._all = !1;
  }
  /** The level of a tile (battery, car, boiler) as the fill of its background. */
  tiles(t, e, n) {
    const o = this.t, s = t.entities, a = t.num.scale, r = t.num.flows.idle_threshold, l = e.carLink, d = e.soc, c = d !== void 0 && d <= this.batteryReserve(t), p = (w) => d === void 0 ? void 0 : { f: d / 100, active: w, color: c ? "var(--ed-warning)" : "var(--ed-battery)", a1: c ? 0.5 : 0.58 }, h = (w) => `${o.tileSpoken.batteryState(w)}, ${d === void 0 ? o.noData : o.tileSpoken.chargeLevel(it(d))}${c ? `, ${o.tileSpoken.belowReserve}` : ""}`, x = l === "connected" || l === "charging" || z(e.car, r), f = t.num.water.gauge_min, u = Math.max(t.num.water.gauge_max, D(this.hass, s.boiler.target_temperature) ?? 0), b = e.boilTemp, m = (w) => z(w, r), $ = W.filter((w) => e.share[w] >= 0.02), S = m(e.other) && $.length ? $.length === 1 ? `linear-gradient(135deg, ${rt(`var(${X[$[0]]})`, 40)}, ${rt(`var(${X[$[0]]})`, 12)}), var(--ed-tile)` : `linear-gradient(135deg, ${$.map((w, C) => {
      const E = $.slice(0, C).reduce((j, L) => j + e.share[L], 0);
      return `${rt(`var(${X[w]})`, 40)} ${((E + e.share[w] / 2) * 100).toFixed(0)}%`;
    }).join(", ")}), var(--ed-tile)` : void 0, T = [
      { side: "L", key: "sun", name: o.tile.sun, watts: e.sun, k: (e.sun ?? 0) / a.sun, icon: A.sun, idleIcon: A.moon, idleText: o.idle.sun, aria: e.sun === void 0 ? o.noData : "" },
      { side: "L", key: "bat", name: o.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / a.battery, icon: A.battery, icon2: A.batteryDown, idleIcon: A.pause, idleText: o.idle.bat, level: p(m(e.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: o.tile.grid, watts: e.imp, k: (e.imp ?? 0) / a.grid, icon: A.grid, idleIcon: A.minus, idleText: o.idle.grid, aria: e.imp === void 0 ? o.noData : m(e.imp) ? o.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: o.tile.house, watts: e.other, k: (e.other ?? 0) / a.house, icon: A.home, idleIcon: A.minus, idleText: o.idle.house, background: S, aria: e.other === void 0 ? o.noData : o.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const w = x && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: m(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      T.push({
        side: "R",
        key: "car",
        name: o.tile.car,
        watts: l === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / a.car,
        icon: A.car,
        idleIcon: l === "disconnected" ? A.minus : A.plug,
        idleText: l === "disconnected" ? o.idle.carDisconnected : l === void 0 ? o.idle.carNoState : o.idle.carConnected,
        level: w,
        aria: [l === void 0 && e.car === void 0 ? o.noData : m(e.car) ? o.tileSpoken.charging : "", x && e.carSoc !== void 0 ? o.tileSpoken.chargeLevel(it(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const w = b === void 0 ? void 0 : { f: et((b - f) / (u - f), 0, 1), active: m(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      T.push({
        side: "R",
        key: "boil",
        name: o.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / a.boiler,
        icon: A.therm,
        idleIcon: A.pause,
        idleText: o.idle.boil,
        level: w,
        aria: [b === void 0 ? o.noData : o.tileSpoken.temperature(`${k(b)} °C`), m(e.boil) ? o.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return T.push(
      { side: "R", key: "batIn", name: o.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / a.battery, icon: A.battery, icon2: A.batteryBolt, idleIcon: A.pause, idleText: o.idle.batIn, level: p(m(e.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: o.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / a.grid, icon: A.grid, idleIcon: A.minus, idleText: o.idle.gridOut, aria: e.exp === void 0 ? o.noData : m(e.exp) ? o.tileSpoken.gridExport : "" }
    ), T;
  }
  renderFlow(t, e) {
    const n = t.num.flows.idle_threshold, o = Yt(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((c) => z(c, n) ? c : void 0),
      t.num.flows.kw_from
    ), s = this.tiles(t, e, o), a = ao(this._width, s.filter((c) => c.side === "R").map((c) => c.key)), r = so(e.flows, a, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), l = (c) => pt`<linearGradient id="rg-${c}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(${X[c]});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(${X[c]});stop-opacity:0.88"></stop>
          <stop offset="0.86" style="stop-color:var(${X[c]});stop-opacity:0.88"></stop>
          <stop offset="1" style="stop-color:var(${X[c]});stop-opacity:0.2"></stop>
        </linearGradient>`, d = this._pop ? s.find((c) => c.key === this._pop) : void 0;
    return g`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${a.height}px">
        <svg width=${a.width} height=${a.height} viewBox="0 0 ${a.width} ${a.height}" aria-hidden="true">
          <defs>${W.map(l)}</defs>
          ${r.map(
      (c) => pt`<g>
              <path d=${c.d} fill="url(#rg-${c.from})"></path>
              <path class="dots" d=${c.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, c.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(c.watts / 1e3, 10))).toFixed(2)}s"></path>
            </g>`
    )}
        </svg>
        ${s.map((c) => this.renderTile(c, a, o, t))} ${d ? this.renderTilePopup(d, a, t, e, o) : v}
      </div>`;
  }
  tileBackground(t, e, n) {
    const o = `var(${$e[t.key]})`, s = t.level;
    if (s) {
      const a = et(s.f, 0, 1), r = `${(a * 100).toFixed(1)}%`, l = s.active ? rt(s.color, s.a1 * 100) : "var(--ed-fill-idle)", d = s.active ? rt(s.color, 10) : "var(--ed-tile)";
      return a < 5e-3 ? s.active ? `linear-gradient(${d}, ${d}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${l} 0%, ${l} ${r}, ${d} ${r}, ${d} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const a = rt(o, Math.round(21 + 7 * n));
      return `linear-gradient(${a}, ${a}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, n, o) {
    const s = t.watts === void 0, a = z(t.watts, o.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], d = et(t.k, 0, 1), c = s ? M : bt(t.watts, n), p = this.tileBackground(t, a, d), h = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${$e[t.key]});--gr:${(2 + 9 * d).toFixed(1)}px;--ga:${Math.round(30 + 60 * d)}%${p ? `;background:${p}` : ""}`;
    return g`<button
        type="button"
        class="tile ${a ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""}"
        data-tile=${t.key}
        style=${h}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${a ? c : s ? M : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${a ? t.icon : t.idleIcon}></path>${a && t.icon2 ? pt`<path class="icon2" d=${t.icon2}></path>` : v}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${a ? c : s ? M : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, n = (r) => Ti(this.hass, r), o = {
      pv: n(e.pv_generation),
      bchg: n(e.battery_charge),
      bdis: n(e.battery_discharge),
      gin: n(e.grid_import),
      gout: n(e.grid_export),
      car: n(e.car),
      boil: n(e.boiler)
    }, a = [o.pv, o.gin, o.bdis, o.gout, o.bchg, o.car, o.boil].every((r) => r !== void 0) ? Math.max(0, o.pv + o.gin + o.bdis - o.gout - o.bchg - o.car - o.boil) : void 0;
    return { ...o, house: a };
  }
  renderTilePopup(t, e, n, o, s) {
    const a = this.t, r = n.num.flows.idle_threshold, l = this.today(n), d = (I) => I === void 0 ? M : `${me(I)} kWh`, c = (I) => I === void 0 ? M : bt(I, s), p = (I) => z(I, r), h = o.soc, x = h !== void 0 && h <= this.batteryReserve(n), f = p(o.batDis) ? a.pop.discharging(c(o.batDis)) : p(o.batIn) ? a.pop.charging(c(o.batIn)) : h === void 0 ? M : a.idle.bat, u = {
      title: a.tile.bat,
      now: f,
      level: h === void 0 ? void 0 : { label: a.pop.level, text: it(h), percent: h, color: x ? "var(--ed-warning)" : "var(--ed-battery)", note: x ? a.pop.belowReserve : "" },
      rows: [{ label: a.pop.rows.discharged, value: d(l.bdis) }, { label: a.pop.rows.charged, value: d(l.bchg) }]
    }, b = {
      title: a.tile.grid,
      now: p(o.imp) ? a.pop.importing(c(o.imp)) : p(o.exp) ? a.pop.exporting(c(o.exp)) : o.imp === void 0 && o.exp === void 0 ? M : a.pop.noFlow,
      rows: [{ label: a.pop.rows.imported, value: d(l.gin) }, { label: a.pop.rows.exported, value: d(l.gout) }]
    }, m = o.carLink, $ = o.boilTemp, S = n.num.water.gauge_min, T = Math.max(n.num.water.gauge_max, D(this.hass, n.entities.boiler.target_temperature) ?? 0), C = {
      sun: { title: a.tile.sun, now: p(o.sun) ? c(o.sun) : o.sun === void 0 ? M : a.idle.sun, rows: [{ label: a.pop.rows.produced, value: d(l.pv) }] },
      bat: u,
      batIn: u,
      grid: b,
      gridOut: b,
      house: { title: a.tile.house, now: p(o.other) ? c(o.other) : o.other === void 0 ? M : a.idle.house, rows: [{ label: a.pop.rows.consumed, value: d(l.house) }] },
      car: {
        title: a.tile.car,
        now: p(o.car) ? a.pop.charging(c(o.car)) : m === "connected" || m === "charging" ? a.pop.carConnectedIdle : m === "disconnected" ? a.idle.carDisconnected : M,
        level: o.carSoc !== void 0 && (m === "connected" || m === "charging") ? { label: a.pop.level, text: it(o.carSoc), percent: o.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: a.pop.rows.carCharged, value: d(l.car) }]
      },
      boil: {
        title: a.tile.boil,
        now: p(o.boil) ? a.pop.heating(c(o.boil)) : o.boil === void 0 ? M : a.idle.boil,
        level: $ === void 0 ? void 0 : { label: a.pop.temperature, text: `${k($)} °C`, percent: et(($ - S) / (T - S) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: a.pop.rows.boilerHeated, value: d(l.boil) }]
      }
    }[t.key], E = 236, j = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, L = t.side === "L" ? e.left[t.key] : e.right[t.key], F = L - e.tile.h / 2, mt = L < e.height / 2, Q = et(j - E / 2, 0, e.width - E), je = mt ? `top:${(F + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - F + 8).toFixed(0)}px`;
    return g`<div class="pop" role="dialog" aria-label=${C.title} tabindex="-1" style="left:${Q.toFixed(0)}px;${je};width:${Math.min(E, e.width)}px">
        <i class="arrow ${mt ? "up" : "down"}" aria-hidden="true" style="left:${(j - Q - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${C.title}</span><span class="pop-now">${C.now}</span></div>
        ${C.level ? g`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${C.level.label}${C.level.note ? g`<span class="note"> ${C.level.note}</span>` : v}</span>
                <span class="pop-big" style="color:${C.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${C.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${io(C.level.percent).map((I) => g`<span><i style="width:${I.toFixed(0)}%;background:${C.level.color}"></i></span>`)}</div>
            </div>` : v}
        <div class="pop-rows">${C.rows.map((I) => g`<div class="pop-row"><span>${I.label}</span><b>${I.value}</b></div>`)}</div>
      </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const n = this.t, o = this.today(t), s = (h) => h === void 0 ? M : me(h), a = [o.pv, o.bdis, o.gin], r = a.every((h) => h !== void 0) ? a.reduce((h, x) => h + x, 0) : void 0, l = o.house === void 0 ? void 0 : o.house + o.car + o.boil + o.bchg + o.gout, d = [
      { label: n.tile.sun, color: "var(--ed-sun)", value: o.pv },
      { label: n.pop.fromBattery, color: "var(--ed-battery)", value: o.bdis },
      { label: n.pop.fromGrid, color: "var(--ed-grid)", value: o.gin }
    ], c = [
      { label: n.tile.house, color: "var(--ed-house)", value: o.house },
      { label: n.tile.car, color: "var(--ed-car)", value: o.car },
      { label: n.tile.boil, color: "var(--ed-boiler)", value: o.boil },
      { label: n.pop.toBattery, color: "var(--ed-battery)", value: o.bchg },
      { label: n.tile.gridOut, color: "var(--ed-grid)", value: o.gout }
    ], p = (h, x, f) => g`<div role="list" aria-label=${h} class="day-col">
        <div class="day-total"><span>${h}</span><b>${s(x)}</b></div>
        ${f.map((u) => g`<div role="listitem" class="day-item"><i style="background:${u.color}" aria-hidden="true"></i><span>${u.label}</span><b>${s(u.value)}</b></div>`)}
      </div>`;
    return g`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${n.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${p(n.pop.sources, r, d)} ${p(n.pop.consumption, l, c)}</div>
      </div>`;
  }
}, lo = (i) => class extends i {
  constructor() {
    super(...arguments), this._carGesture = new qt(() => ({
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
      const n = this._carGesture.tap("car", t.timeStamp);
      n === "double" ? this.openCarLink() : n === "single" && (this._carHint = !0, window.clearTimeout(this._timers.get("carhint")), this._timers.set("carhint", window.setTimeout(() => this._carHint = !1, e.num.ui.hint_seconds * 1e3)));
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
    const n = this.t, o = t.entities, s = t.num.flows, a = t.num.car.charge_limit, r = e.carLink, l = z(e.car, s.idle_threshold) && r !== "disconnected", d = De(e.share, s, n), c = this.sourceColor(d), p = R(this.hass, o.wallbox.block_charging) === "on", h = this.shown(o.wallbox.boost), x = R(this.hass, o.wallbox.prioritize_connected) === "on" && r === "connected" && !p && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let f, u;
    l ? (f = `${n.car.charging(d.text)}${h === "on" ? ` · ${n.boostOptions.on}` : ""}`, u = c) : r === "connected" || r === "charging" ? (f = n.car.connectedIdle, u = x ? "var(--ed-warning)" : void 0) : r === "disconnected" && (f = n.car.disconnected);
    const b = rt(u ?? "#d8d8dc", u ? 42 : 28), m = Z(this.hass, o.car.image)?.attributes?.entity_picture, $ = e.carSoc, S = Yt([z(e.car, s.idle_threshold) ? e.car : void 0], s.kw_from), T = a < 100, w = n.car.chargeLevel($ === void 0 ? n.noData : it($), T ? it(a) : void 0), C = o.wallbox, E = h === "on" ? "on" : h === "off" ? "off" : "", j = this.boostOptions, L = h === "on" ? n.car.modeBoost : h === "off" ? n.car.modeSurplus : M;
    return g`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${b}, transparent)"></div><div class="shadow"></div>
            ${typeof m == "string" && m ? g`<img src=${m} alt="" />` : v}
          </div>
          ${t.carLink ? g`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${n.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(F) => F.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? g`<div class="car-hint" aria-hidden="true">${n.hint.holdOrDouble}</div>` : v}` : v}
          <div class="head"><h2 id="h-car">${t.titles.car ?? n.titles.car}</h2>${this.stateLine(f, u)}</div>
          <div class="car-soc">
            <span class="soc">${$ === void 0 ? M : k($)}<small>${this._i18n.percent("")}</small>${$ === void 0 ? g`<span class="sr-only">${n.noData}</span>` : v}</span>
            <span class="range">${n.car.range} <b>${e.carRange === void 0 ? M : `${k(e.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${w}>
            <div class="fill" style="width:${et($ ?? 0, 0, 100)}%"></div>
            <div class="ticks"></div>
            ${T ? g`<div class="limit" style="left:${a}%"></div>` : v}
          </div>
          ${T ? g`<div class="meter-label" aria-hidden="true"><span style="left:${a}%">${n.car.limit(it(a))}</span></div>` : v}
        </div>
        ${l ? this.renderCarSources(e, s, bt(e.car ?? 0, S)) : v}
        ${C.boost ? g`<div class="mode">
              <div class="mode-head"><span id="mode-l">${n.car.mode}</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${L}</span></div>
              <ed-segmented
                guarded .options=${j} .value=${E} label=${n.car.modeLabel} .hint=${n.hint.holdDragOrDouble} ?disabled=${h === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(F) => this.setBoost("wallbox", F.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, h === "on")}
            </div>` : v}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, l, c, S) : v}
      </section>`;
  }
  renderCarSources(t, e, n) {
    const o = this.t, s = o.source, a = W.filter((d) => t.share[d] > 4e-3), r = eo(a.map((d) => t.share[d])), l = (d) => d === "grid" && t.share.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${X[d]})`;
    return g`<div class="mix">
        <div class="mix-head"><span>${o.car.sourcesTitle}</span><span>${n}</span></div>
        <div class="mix-bar" aria-hidden="true">${a.map((d) => g`<div style="flex:${t.share[d]} 1 0;background:${l(d)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${o.car.sourcesLabel}>
          ${a.map((d, c) => g`<span><i style="background:${l(d)}"></i>${s[d]}<em>${it(r[c])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const n = t.entities.wallbox.charging_power;
    if (!n) return v;
    const { phases: o, power_min: s, power_max: a, power_step: r } = t.num.wallbox, l = Z(this.hass, n), d = D(this.hass, n), c = d === void 0 ? void 0 : d * o / 1e3;
    let p = s / 1e3, h = a / 1e3;
    const x = Y(l, "min"), f = Y(l, "max");
    return x !== void 0 && (p = Math.max(p, x * o / 1e3)), f !== void 0 && (h = Math.min(h, f * o / 1e3)), g`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${c === void 0 ? M : k(c, 1)}<small> kW</small></span>
          <ed-slider
            .min=${p} .max=${h} .step=${r / 1e3} .value=${c ?? p}
            label=${this.t.car.powerLabel} valueText=${c === void 0 ? this.t.noData : `${k(c, 1)} kW`}
            minLabel="${k(p, 1)} kW" maxLabel="${k(h, 1)} kW"
            ?disabled=${c === void 0}
            @hdk-change=${(u) => this.setNumber(n, Math.round(u.detail.value * 1e3 / o), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, e, n, o, s) {
    const a = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, d = !!(r.block_charging || r.prioritize_connected), c = e.carLink, p = n ? g`<span>${a.wallbox.charging} </span><b style="--c:${o}">${bt(e.car ?? 0, s)}</b>` : c === "connected" || c === "charging" ? g`${a.wallbox.idle}` : c === "disconnected" ? g`${a.wallbox.disconnected}` : g`${M}`, h = t.entities.car.state_of_charge, x = D(this.hass, h) === void 0 ? void 0 : Li(Z(this.hass, h)?.last_updated, this._now, a), f = this.shown(r.block_charging), u = this.shown(r.prioritize_connected);
    return g`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!d} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${n ? `--bc:${o}` : ""}><svg viewBox="0 0 24 24"><path d=${A.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${a.wallbox.title}</span><span class="row-sub">${p}</span></span>
            <span class="row-aside">${x ? a.wallbox.fromCar(x) : ""}</span>
            ${d ? g`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${A.expand}></path></svg>` : g`<span></span>`}
          </button>
          ${d ? g`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(a.wallbox.block, r.block_charging, f === "on" ? a.wallbox.blockOn : a.wallbox.blockOff, f === "on") : v}
                ${r.prioritize_connected ? this.switchRow(a.wallbox.priority, r.prioritize_connected, u === "on" ? a.wallbox.priorityOn : a.wallbox.priorityOff, !1) : v}
              </div></div>` : v}
        </li>
      </ul>`;
  }
}, At = 45, dt = 46, co = 62, ho = 58;
function Nt(i, t) {
  let e = 1;
  for (; e < i.length - 1 && t > i[e].temp; ) e++;
  const n = i[e - 1], o = i[e], s = Math.max(0, Math.min(1, (t - n.temp) / (o.temp - n.temp))), a = (d) => [1, 3, 5].map((c) => parseInt(d.slice(c, c + 2), 16)), r = a(n.color), l = a(o.color);
  return `rgb(${[0, 1, 2].map((d) => Math.round(r[d] + (l[d] - r[d]) * s)).join(",")})`;
}
const $t = (i, t) => {
  const e = (135 + 270 * i) * Math.PI / 180;
  return [co + t * Math.cos(e), ho + t * Math.sin(e)];
}, po = (i, t) => {
  const [e, n] = $t(i, dt), [o, s] = $t(t, dt);
  return `M${e.toFixed(2)} ${n.toFixed(2)} A${dt} ${dt} 0 0 1 ${o.toFixed(2)} ${s.toFixed(2)}`;
};
function uo(i, t, e, n) {
  const o = i === void 0 ? 0 : Math.max(0, Math.min(1, (i - t) / (e - t))), s = "var(--ed-gauge-track)", a = Array.from({ length: At }, (x, f) => {
    const u = (f + 0.5) / At, b = i !== void 0 && u <= o ? Nt(n, t + u * (e - t)) : s;
    return pt`<path d=${po(f / At, Math.min(1, (f + 1) / At + 4e-3))} fill="none" stroke=${b} stroke-width="10"></path>`;
  }), [r, l] = $t(0, dt), [d, c] = $t(1, dt), [p, h] = $t(o, dt);
  return pt`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${a}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${i !== void 0 && o > 0 ? Nt(n, t) : s}></circle>
    <circle cx=${d.toFixed(1)} cy=${c.toFixed(1)} r="5" fill=${i !== void 0 && o >= 0.99 ? Nt(n, e) : s}></circle>
    ${i === void 0 ? null : pt`<circle class="knob" cx=${p.toFixed(1)} cy=${h.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const go = (i) => class extends i {
  renderWater(t, e) {
    const n = this.t, o = t.entities, s = t.num.flows, a = z(e.boil, s.idle_threshold), r = De(e.share, s, n), l = this.sourceColor(r), c = this.shown(o.boiler.boost) === "on", p = Yt([a ? e.boil : void 0], s.kw_from);
    let h;
    return a ? h = `${n.water.boilerHeats(r.text)}${c ? ` · ${n.boostOptions.on}` : ""}` : e.boil !== void 0 && (h = n.water.noHeating), g`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${t.titles.water ?? n.titles.water}</h2>${this.stateLine(h, a ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, a, l, p)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, n, o, s) {
    return g`<div class="arc" role="img" aria-label=${s}>
        ${uo(t, e, n, o.tempScale)}
        <div class="arc-num"><b>${t === void 0 ? M : k(t)}</b>${t === void 0 ? g`<span class="sr-only">${this.t.noData}</span>` : g`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${k(e)}</span><span class="arc-max" aria-hidden="true">${k(n)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, n, o, s) {
    const a = this.t, r = t.entities.boiler;
    t.num.boiler;
    const l = this.shown(r.boost), d = l === "on", c = D(this.hass, r.target_temperature), p = D(this.hass, r.boost_target_temperature), h = d ? p : c, x = t.num.water.gauge_min, f = Math.max(t.num.water.gauge_max, c ?? 0), u = e.boilTemp, b = !!this._open.targets, m = !!(r.target_temperature || r.boost_target_temperature), $ = a.water.boilerLabel(
      u === void 0 ? a.noData : `${k(u)} °C`,
      n ? a.water.heatingWith(bt(e.boil, s)) : a.water.notHeating,
      h === void 0 ? void 0 : `${k(h)} °C`,
      k(x),
      `${k(f)} °C`
    );
    return g`<div class="source">
        <div class="source-top">
          ${this.gauge(u, x, f, t, $)}
          <div class="source-body">
            <div>
              <div class="source-title">${a.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${n ? o : "var(--ed-secondary)"}">${n ? bt(e.boil, s) : e.boil === void 0 ? M : a.water.notHeating}</span>${h === void 0 ? v : g` <span class="dim">· ${a.water.target(`${k(h)} °C`)}</span>`}
              </div>
            </div>
            ${r.boost ? g`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${a.water.boostMode} .hint=${a.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(S) => this.setBoost("boiler", S.detail.value === "on")}
                ></ed-segmented>` : v}
          </div>
        </div>
        ${m ? g`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${b ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${a.water.targets}</span>
                <span class="rowbtn-value">${a.water.targetFlow} <b>${c === void 0 ? M : k(c)}</b> · ${a.water.targetBoost} <b>${p === void 0 ? M : `${k(p)} °C`}</b></span>
                <svg class="chevron ${b ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${A.expand}></path></svg>
              </button>
              <div class="fold ${b ? "open" : ""}" ?inert=${!b}><div>${this.renderTargets(t, c, p)}</div></div>
            </div>` : v}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, n) {
    const o = this.t, s = t.entities.boiler, a = t.num.boiler, r = (l, d, c, p, h, x) => {
      if (!l) return v;
      const f = Z(this.hass, l);
      let u = a.target_min, b = a.target_max;
      const m = Y(f, "min"), $ = Y(f, "max");
      return m !== void 0 && (u = Math.max(u, m)), $ !== void 0 && (b = Math.min(b, $)), h !== void 0 && (u = Math.max(u, h)), x !== void 0 && (b = Math.min(b, x)), g`<div class="field">
          <span class="field-label">${c}<span class="hint">${p}</span></span><span class="field-value">${d === void 0 ? M : k(d)}<small> °C</small></span>
          <ed-slider
            .min=${u} .max=${b} .step=${a.target_step} .value=${d ?? u}
            label=${o.water.targetSliderLabel(c)} valueText=${d === void 0 ? o.noData : o.water.targetSliderSpoken(`${d} °C`, c)}
            minLabel="${k(u)} °C" maxLabel="${k(b)} °C"
            ?disabled=${d === void 0}
            @hdk-change=${(S) => this.setNumber(l, S.detail.value, o.water.targetWhat(c))}
          ></ed-slider>
        </div>`;
    };
    return g`<div class="detail">
        ${r(s.target_temperature, e, o.water.targetFlow, o.water.targetFlowHint, n, void 0)}
        ${r(s.boost_target_temperature, n, o.water.targetBoost, o.water.targetBoostHint, void 0, e)}
        <p class="hint">${o.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return v;
    const n = Bi(this.shown(e.valve_c1), this.shown(e.valve_c2)), o = n === "on", s = !!(e.valve_c1 && e.valve_c2), a = n === "unclear" ? this.t.water.mixingUnclear : n === void 0 ? this.t.noData : "";
    return g`
        <div class="link ${o ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${o ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${o ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${o ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${a ? g`<span class="mixcap-note">${a}</span>` : v}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${o} ?disabled=${n === void 0 || !s}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${o ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, n = t.entities.tank, o = t.num.tank, s = n.water_heater, a = Z(this.hass, s), r = this.shown(s), l = r === "off", d = r === "heat", c = Y(a, "temperature"), p = this._tankTemp, h = p && p.id === s ? p.value : c, x = t.num.water.gauge_min, f = Math.max(t.num.water.gauge_max, D(this.hass, t.entities.boiler.target_temperature) ?? 0), u = l ? o.temp_min : h, b = Array.isArray(a?.attributes?.operation_list) ? a.attributes.operation_list : Object.keys(e.tank.modes), m = Object.keys(e.tank.modes).filter((L) => b.includes(L)).map((L) => ({ value: L, label: e.tank.modes[L] })), $ = !!this._open.tank, { min: S, max: T } = this.tankRange(t), w = r === void 0 ? M : e.tank.modes[r] ?? r, C = l ? e.tank.keepsMinimum : d ? e.tank.setManually : e.tank.byPlan, E = u === void 0 ? M : l ? e.tank.summaryOff(`${k(o.temp_min)} °C`) : (d ? e.tank.summaryManual : e.tank.summaryPlan)(`${k(u)} °C`), j = e.tank.label(
      u === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${k(o.temp_min)} °C`) : e.tank.settingSet(`${k(u)} °C`),
      w,
      k(x),
      `${k(f)} °C`
    );
    return g`<div class="source">
        <div class="source-top">
          ${this.gauge(u, x, f, t, j)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${d ? "var(--ed-text)" : "var(--ed-secondary)"}">${w}</span>${r === void 0 ? v : g` <span class="dim">· ${C}</span>`}</div>
            </div>
            ${s ? g`<ed-segmented compact .options=${m} .value=${r ?? ""} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(L) => this.setTank(s, L.detail.value)}></ed-segmented>` : v}
          </div>
        </div>
        ${s ? g`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${$ ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${E}</span>
                <svg class="chevron ${$ ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${A.expand}></path></svg>
              </button>
              <div class="fold ${$ ? "open" : ""}" ?inert=${!$}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : d ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${u === void 0 ? M : k(u)}<small> °C</small></span>
                    <ed-slider
                      .min=${S} .max=${T} .step=${o.temp_step} .tickStep=${5} .value=${u ?? S}
                      label=${e.tank.sliderLabel} valueText=${h === void 0 ? e.noData : e.tank.sliderSpoken(`${h} °C`)}
                      minLabel="${k(S)} °C" maxLabel="${k(T)} °C"
                      ?disabled=${h === void 0 || l}
                      @hdk-change=${(L) => this.setTankTemperature(s, L.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : v}
      </div>`;
  }
}, oe = class oe extends go(lo(ro(no(G)))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return v;
    const e = Ei(this.hass, t, this.t), n = t.colors, o = `--ed-sun:${n.sun};--ed-battery:${n.battery};--ed-grid:${n.grid};--ed-house:${n.house};--ed-car:${n.car};--ed-boiler:${n.boiler};--ed-accent:${n.accent};--ed-warning:${n.warning};--ed-off:${n.neutral}`;
    return g`<div class="page" style=${o} @keydown=${this.onKey}>
      ${t.title === "" ? v : g`<h1>${t.title ?? this.t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
oe.styles = zi;
let Rt = oe;
ci("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", Rt);
window.customCards = window.customCards ?? [];
window.customCards.some((i) => i.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Dt(bi()).t.cardDescription,
  preview: !1
});
