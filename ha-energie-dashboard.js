const Nt = globalThis, re = Nt.ShadowRoot && (Nt.ShadyCSS === void 0 || Nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, le = /* @__PURE__ */ Symbol(), Se = /* @__PURE__ */ new WeakMap();
let Je = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== le) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (re && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Se.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Se.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ga = (a) => new Je(typeof a == "string" ? a : a + "", void 0, le), Ot = (a, ...t) => {
  const e = a.length === 1 ? a[0] : t.reduce((n, i, o) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + a[o + 1], a[0]);
  return new Je(e, a, le);
}, fa = (a, t) => {
  if (re) a.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), i = Nt.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, a.appendChild(n);
  }
}, Ce = re ? (a) => a : (a) => a instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return ga(e);
})(a) : a;
const { is: ma, defineProperty: va, getOwnPropertyDescriptor: xa, getOwnPropertyNames: $a, getOwnPropertySymbols: ya, getPrototypeOf: wa } = Object, Zt = globalThis, Me = Zt.trustedTypes, ka = Me ? Me.emptyScript : "", _a = Zt.reactiveElementPolyfillSupport, Tt = (a, t) => a, Wt = { toAttribute(a, t) {
  switch (t) {
    case Boolean:
      a = a ? ka : null;
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
} }, de = (a, t) => !ma(a, t), Le = { attribute: !0, type: String, converter: Wt, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Zt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let wt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Le) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && va(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: o } = xa(this.prototype, t) ?? { get() {
      return this[e];
    }, set(s) {
      this[e] = s;
    } };
    return { get: i, set(s) {
      const r = i?.call(this);
      o?.call(this, s), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Le;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Tt("elementProperties"))) return;
    const t = wa(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Tt("properties"))) {
      const e = this.properties, n = [...$a(e), ...ya(e)];
      for (const i of n) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, i] of e) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const i = this._$Eu(e, n);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) e.unshift(Ce(i));
    } else t !== void 0 && e.push(Ce(t));
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
    return fa(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const o = (n.converter?.toAttribute !== void 0 ? n.converter : Wt).toAttribute(e, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = n.getPropertyOptions(i), s = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : Wt;
      this._$Em = i;
      const r = s.fromAttribute(e, o.type);
      this[i] = r ?? this._$Ej?.get(i) ?? r, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, i = !1, o) {
    if (t !== void 0) {
      const s = this.constructor;
      if (i === !1 && (o = this[t]), n ??= s.getPropertyOptions(t), !((n.hasChanged ?? de)(o, e) || n.useDefault && n.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: i, wrapped: o }, s) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, s ?? e ?? this[t]), o !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, o] of n) {
        const { wrapped: s } = o, r = this[i];
        s !== !0 || this._$AL.has(i) || r === void 0 || this.C(i, void 0, o, r);
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
wt.elementStyles = [], wt.shadowRootOptions = { mode: "open" }, wt[Tt("elementProperties")] = /* @__PURE__ */ new Map(), wt[Tt("finalized")] = /* @__PURE__ */ new Map(), _a?.({ ReactiveElement: wt }), (Zt.reactiveElementVersions ??= []).push("2.1.2");
const ce = globalThis, Te = (a) => a, Vt = ce.trustedTypes, Ae = Vt ? Vt.createPolicy("lit-html", { createHTML: (a) => a }) : void 0, Qe = "$lit$", bt = `lit$${Math.random().toFixed(9).slice(2)}$`, ta = "?" + bt, Sa = `<${ta}>`, xt = document, Dt = () => xt.createComment(""), Bt = (a) => a === null || typeof a != "object" && typeof a != "function", he = Array.isArray, Ca = (a) => he(a) || typeof a?.[Symbol.iterator] == "function", qt = `[ 	
\f\r]`, Ct = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, De = /-->/g, Be = />/g, ft = RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ee = /'/g, Oe = /"/g, ea = /^(?:script|style|textarea|title)$/i, aa = (a) => (t, ...e) => ({ _$litType$: a, strings: t, values: e }), m = aa(1), q = aa(2), _t = /* @__PURE__ */ Symbol.for("lit-noChange"), w = /* @__PURE__ */ Symbol.for("lit-nothing"), ze = /* @__PURE__ */ new WeakMap(), mt = xt.createTreeWalker(xt, 129);
function ia(a, t) {
  if (!he(a) || !a.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ae !== void 0 ? Ae.createHTML(t) : t;
}
const Ma = (a, t) => {
  const e = a.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Ct;
  for (let r = 0; r < e; r++) {
    const l = a[r];
    let d, c, p = -1, h = 0;
    for (; h < l.length && (s.lastIndex = h, c = s.exec(l), c !== null); ) h = s.lastIndex, s === Ct ? c[1] === "!--" ? s = De : c[1] !== void 0 ? s = Be : c[2] !== void 0 ? (ea.test(c[2]) && (i = RegExp("</" + c[2], "g")), s = ft) : c[3] !== void 0 && (s = ft) : s === ft ? c[0] === ">" ? (s = i ?? Ct, p = -1) : c[1] === void 0 ? p = -2 : (p = s.lastIndex - c[2].length, d = c[1], s = c[3] === void 0 ? ft : c[3] === '"' ? Oe : Ee) : s === Oe || s === Ee ? s = ft : s === De || s === Be ? s = Ct : (s = ft, i = void 0);
    const g = s === ft && a[r + 1].startsWith("/>") ? " " : "";
    o += s === Ct ? l + Sa : p >= 0 ? (n.push(d), l.slice(0, p) + Qe + l.slice(p) + bt + g) : l + bt + (p === -2 ? r : g);
  }
  return [ia(a, o + (a[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Et {
  constructor({ strings: t, _$litType$: e }, n) {
    let i;
    this.parts = [];
    let o = 0, s = 0;
    const r = t.length - 1, l = this.parts, [d, c] = Ma(t, e);
    if (this.el = Et.createElement(d, n), mt.currentNode = this.el.content, e === 2 || e === 3) {
      const p = this.el.content.firstChild;
      p.replaceWith(...p.childNodes);
    }
    for (; (i = mt.nextNode()) !== null && l.length < r; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const p of i.getAttributeNames()) if (p.endsWith(Qe)) {
          const h = c[s++], g = i.getAttribute(p).split(bt), x = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: o, name: x[2], strings: g, ctor: x[1] === "." ? Ta : x[1] === "?" ? Aa : x[1] === "@" ? Da : Kt }), i.removeAttribute(p);
        } else p.startsWith(bt) && (l.push({ type: 6, index: o }), i.removeAttribute(p));
        if (ea.test(i.tagName)) {
          const p = i.textContent.split(bt), h = p.length - 1;
          if (h > 0) {
            i.textContent = Vt ? Vt.emptyScript : "";
            for (let g = 0; g < h; g++) i.append(p[g], Dt()), mt.nextNode(), l.push({ type: 2, index: ++o });
            i.append(p[h], Dt());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ta) l.push({ type: 2, index: o });
      else {
        let p = -1;
        for (; (p = i.data.indexOf(bt, p + 1)) !== -1; ) l.push({ type: 7, index: o }), p += bt.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const n = xt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function St(a, t, e = a, n) {
  if (t === _t) return t;
  let i = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const o = Bt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(a), i._$AT(a, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = i : e._$Cl = i), i !== void 0 && (t = St(a, i._$AS(a, t.values), i, n)), t;
}
class La {
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
    const { el: { content: e }, parts: n } = this._$AD, i = (t?.creationScope ?? xt).importNode(e, !0);
    mt.currentNode = i;
    let o = mt.nextNode(), s = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let d;
        l.type === 2 ? d = new zt(o, o.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (d = new Ba(o, this, t)), this._$AV.push(d), l = n[++r];
      }
      s !== l?.index && (o = mt.nextNode(), s++);
    }
    return mt.currentNode = xt, i;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class zt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, i) {
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = St(this, t, e), Bt(t) ? t === w || t == null || t === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t !== this._$AH && t !== _t && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ca(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== w && Bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(xt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Et.createElement(ia(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new La(i, this), s = o.u(this.options);
      o.p(e), this.T(s), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = ze.get(t.strings);
    return e === void 0 && ze.set(t.strings, e = new Et(t)), e;
  }
  k(t) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, i = 0;
    for (const o of t) i === e.length ? e.push(n = new zt(this.O(Dt()), this.O(Dt()), this, this.options)) : n = e[i], n._$AI(o), i++;
    i < e.length && (this._$AR(n && n._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = Te(t).nextSibling;
      Te(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Kt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, i, o) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = w;
  }
  _$AI(t, e = this, n, i) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = St(this, t, e, 0), s = !Bt(t) || t !== this._$AH && t !== _t, s && (this._$AH = t);
    else {
      const r = t;
      let l, d;
      for (t = o[0], l = 0; l < o.length - 1; l++) d = St(this, r[n + l], e, l), d === _t && (d = this._$AH[l]), s ||= !Bt(d) || d !== this._$AH[l], d === w ? t = w : t !== w && (t += (d ?? "") + o[l + 1]), this._$AH[l] = d;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ta extends Kt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === w ? void 0 : t;
  }
}
class Aa extends Kt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== w);
  }
}
class Da extends Kt {
  constructor(t, e, n, i, o) {
    super(t, e, n, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = St(this, t, e, 0) ?? w) === _t) return;
    const n = this._$AH, i = t === w && n !== w || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== w && (n === w || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ba {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    St(this, t);
  }
}
const Ea = ce.litHtmlPolyfillSupport;
Ea?.(Et, zt), (ce.litHtmlVersions ??= []).push("3.3.3");
const Oa = (a, t, e) => {
  const n = e?.renderBefore ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    n._$litPart$ = i = new zt(t.insertBefore(Dt(), o), o, void 0, e ?? {});
  }
  return i._$AI(a), i;
};
const pe = globalThis;
class gt extends wt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Oa(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return _t;
  }
}
gt._$litElement$ = !0, gt.finalized = !0, pe.litElementHydrateSupport?.({ LitElement: gt });
const za = pe.litElementPolyfillSupport;
za?.({ LitElement: gt });
(pe.litElementVersions ??= []).push("4.2.2");
const ja = { attribute: !0, type: String, converter: Wt, reflect: !1, hasChanged: de }, Ha = (a = ja, t, e) => {
  const { kind: n, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), n === "setter" && ((a = Object.create(a)).wrapped = !0), o.set(e.name, a), n === "accessor") {
    const { name: s } = e;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(s, l, a, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(s, void 0, a, r), r;
    } };
  }
  if (n === "setter") {
    const { name: s } = e;
    return function(r) {
      const l = this[s];
      t.call(this, r), this.requestUpdate(s, l, a, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function H(a) {
  return (t, e) => typeof e == "object" ? Ha(a, t, e) : ((n, i, o) => {
    const s = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, n), s ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(a, t, e);
}
function U(a) {
  return H({ ...a, state: !0, attribute: !1 });
}
class ue {
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
    const n = this.pressing, i = this.fired;
    return this.pressing = !1, this.fired = !1, !n || i ? "none" : this.last && this.last.key === t && e - this.last.time <= this.times().doubleTapMs ? (this.last = void 0, "double") : (this.last = { key: t, time: e }, "single");
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
class na {
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
const oa = Ot`
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
var Pa = Object.defineProperty, nt = (a, t, e, n) => {
  for (var i = void 0, o = a.length - 1, s; o >= 0; o--)
    (s = a[o]) && (i = s(t, e, i) || i);
  return i && Pa(t, e, i), i;
};
const xe = class xe extends gt {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1, this.compact = !1, this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hint = "Press and hold, drag, or tap twice.", this._dx = 0, this._dragging = !1, this.hints = new na(this), this.nudgeIndex = 0, this.gesture = new ue(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.swallowClick = !1;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.gesture.dispose(), this.hints.dispose();
  }
  render() {
    const t = this.options.findIndex((r) => r.value === this.value), e = this.options.filter((r) => !r.disabled), n = this.options[t]?.value ?? e[0]?.value, i = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches, o = this.hints.nudge && !i ? Math.sign(this.nudgeIndex - t) * 14 : 0, s = this._dragging ? this._dx : o;
    return m`<div
        class="track ${this.compact ? "compact" : ""} ${this.guarded ? "guarded" : ""} ${this._dragging ? "dragging" : ""} ${this.options.some((r) => r.detail) ? "tall" : ""}"
        role="radiogroup"
        aria-label=${this.label}
        style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)};--dx:${s}px"
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
            tabindex=${r.value === n ? 0 : -1}
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
    const i = this.gesture.tap(String(n), t.timeStamp);
    if (this.swallowClick || i === "none") {
      this.swallowClick = !1;
      return;
    }
    i === "double" ? this.select(e) : (this.nudgeIndex = n, this.hints.show(this.hintSeconds));
  }
  onDown(t) {
    if (!this.guarded || this.disabled || t.button > 0) return;
    const e = t.currentTarget, n = this.options.findIndex((r) => r.value === this.value);
    this.swallowClick = !1, this.drag = { x: t.clientX, width: (e.getBoundingClientRect().width - 6) / Math.max(1, this.options.length), index: n, moved: !1, id: t.pointerId };
    const i = t.target.closest("button[data-index]"), o = i ? Number(i.dataset.index) : -1, s = o >= 0 && o !== n && !this.options[o]?.disabled;
    this.gesture.start(() => {
      s && (this.drag = void 0, this.select(this.options[o].value));
    });
  }
  onMove(t) {
    const e = this.drag;
    if (!e || e.id !== t.pointerId) return;
    const n = t.clientX - e.x;
    if (!e.moved && Math.abs(n) < 6) return;
    e.moved || (e.moved = !0, this.gesture.release(), this.hints.hide(), t.currentTarget.setPointerCapture?.(t.pointerId));
    const i = this.options.length - 1;
    this._dx = Math.max(-e.index * e.width, Math.min((i - e.index) * e.width, n)), this._dragging = !0;
  }
  onUp(t) {
    const e = this.drag;
    if (this.gesture.release(), !e || e.id !== t.pointerId || (this.drag = void 0, !e.moved)) return;
    this.swallowClick = !0;
    const n = Math.max(0, Math.min(this.options.length - 1, e.index + Math.round(this._dx / e.width)));
    this._dx = 0, this._dragging = !1;
    const i = this.options[n];
    i && !i.disabled && n !== e.index && this.select(i.value);
  }
  onCancel() {
    this.gesture.cancel(), this.drag = void 0, this._dx = 0, this._dragging = !1;
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const n = this.options.filter((r) => !r.disabled);
    if (!n.length) return;
    const i = n.findIndex((r) => r.value === this.value), o = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, s = n[(i + o + n.length) % n.length];
    t.preventDefault(), this.select(s.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${s.value}"]`)?.focus());
  }
};
xe.styles = [
  oa,
  Ot`
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
let X = xe;
nt([
  H({ attribute: !1 })
], X.prototype, "options");
nt([
  H()
], X.prototype, "value");
nt([
  H()
], X.prototype, "label");
nt([
  H({ type: Boolean })
], X.prototype, "disabled");
nt([
  H({ type: Boolean })
], X.prototype, "compact");
nt([
  H({ type: Boolean })
], X.prototype, "guarded");
nt([
  H({ type: Number })
], X.prototype, "holdMs");
nt([
  H({ type: Number })
], X.prototype, "doubleTapMs");
nt([
  H({ type: Number })
], X.prototype, "hintSeconds");
nt([
  H()
], X.prototype, "hint");
nt([
  U()
], X.prototype, "_dx");
nt([
  U()
], X.prototype, "_dragging");
var Ra = Object.defineProperty, st = (a, t, e, n) => {
  for (var i = void 0, o = a.length - 1, s; o >= 0; o--)
    (s = a[o]) && (i = s(t, e, i) || i);
  return i && Ra(t, e, i), i;
};
const $e = class $e extends gt {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.tickStep = 0, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, i = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, o = this.tickStep || this.step || 1, s = Math.floor(e / o + 1e-9) + 1, r = s >= 2 && s <= 40 ? Array.from({ length: s }, (l, d) => m`<i style="left:${(d * o / e * 100).toFixed(2)}%"></i>`) : [];
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
          style="--fill: ${i}"
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
$e.styles = Ot`
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
let J = $e;
st([
  H({ type: Number })
], J.prototype, "min");
st([
  H({ type: Number })
], J.prototype, "max");
st([
  H({ type: Number })
], J.prototype, "step");
st([
  H({ type: Number })
], J.prototype, "tickStep");
st([
  H({ type: Number })
], J.prototype, "value");
st([
  H()
], J.prototype, "label");
st([
  H()
], J.prototype, "valueText");
st([
  H()
], J.prototype, "minLabel");
st([
  H()
], J.prototype, "maxLabel");
st([
  H({ type: Boolean })
], J.prototype, "disabled");
st([
  U()
], J.prototype, "_drag");
var Ia = Object.defineProperty, ht = (a, t, e, n) => {
  for (var i = void 0, o = a.length - 1, s; o >= 0; o--)
    (s = a[o]) && (i = s(t, e, i) || i);
  return i && Ia(t, e, i), i;
};
const ye = class ye extends gt {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "", this.guarded = !1, this.holdMs = 550, this.doubleTapMs = 400, this.hintSeconds = 3, this.hintPlacement = "above", this.hint = "Press and hold, or tap twice.", this.hints = new na(this), this.gesture = new ue(() => ({ holdMs: this.holdMs, doubleTapMs: this.doubleTapMs })), this.release = () => {
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
ye.styles = [
  oa,
  Ot`
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
let it = ye;
ht([
  H({ type: Boolean })
], it.prototype, "checked");
ht([
  H({ type: Boolean })
], it.prototype, "disabled");
ht([
  H()
], it.prototype, "label");
ht([
  H({ type: Boolean })
], it.prototype, "guarded");
ht([
  H({ type: Number })
], it.prototype, "holdMs");
ht([
  H({ type: Number })
], it.prototype, "doubleTapMs");
ht([
  H({ type: Number })
], it.prototype, "hintSeconds");
ht([
  H()
], it.prototype, "hintPlacement");
ht([
  H()
], it.prototype, "hint");
function Na(a) {
  const t = [
    [`${a}-switch`, it],
    [`${a}-segmented`, X],
    [`${a}-slider`, J]
  ];
  for (const [e, n] of t)
    customElements.get(e) || customElements.define(e, n);
}
const Fa = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Wa(a) {
  return Fa.has(a);
}
function et(a, t) {
  return t ? a?.states?.[t] : void 0;
}
function at(a, t) {
  const e = et(a, t)?.state;
  return e === void 0 || Wa(e) ? void 0 : e;
}
function Va(a, t) {
  const e = at(a, t);
  if (e === void 0)
    return;
  const n = Number(e);
  return Number.isFinite(n) ? n : void 0;
}
function sa(a) {
  return (a?.locale?.language || a?.language || "").trim();
}
function be(a) {
  const t = a.toLowerCase().split(/[-_]/)[0];
  return t === "cs" ? "cs" : t === "sv" ? "sv" : "en";
}
function Ua(a, t) {
  return a === "auto" ? be(sa(t)) : a;
}
function Ga() {
  return be(document.documentElement.lang || navigator.language || "");
}
const je = /* @__PURE__ */ new WeakMap(), Za = { cs: "cs-CZ", sv: "sv-SE", en: "en" }, Ka = /* @__PURE__ */ new Set(["cs", "de", "fi", "fr", "sk", "sv"]), Ya = {
  comma_decimal: ["en-US", "en"],
  decimal_comma: ["de", "es", "it"],
  space_comma: ["fr", "sv", "cs"],
  quote_decimal: ["de-CH"]
};
function Xt(a, t) {
  const e = a?.locale?.[t];
  return typeof e == "string" && e !== "" ? e : "language";
}
function qa(a, t, e) {
  const n = sa(e).replace("_", "-"), i = n !== "" && be(n) === t ? n : Za[t], o = Xt(e, "number_format"), s = Xt(e, "time_format"), r = Xt(e, "date_format"), l = [t, i, o, s, r].join("|");
  let d = je.get(a);
  d || (d = /* @__PURE__ */ new Map(), je.set(a, d));
  let c = d.get(l);
  return c || (c = Qa(a[t], t, i, o, s, r), d.set(l, c)), c;
}
function Xa(a) {
  try {
    return new Intl.NumberFormat(a), a;
  } catch {
    return "en";
  }
}
function Ja(a, t) {
  if (a === "12")
    return !0;
  if (a === "24")
    return !1;
  const e = a === "system" ? void 0 : t;
  return (/* @__PURE__ */ new Date("January 1, 2023 22:00:00")).toLocaleString(e).includes("10");
}
function Qa(a, t, e, n, i, o) {
  const s = Xa(e), r = n === "system" ? void 0 : n === "none" ? "en-US" : Ya[n] ?? s, l = n === "none" ? { useGrouping: !1 } : {}, d = new Intl.NumberFormat(r, { minimumFractionDigits: 1, maximumFractionDigits: 1, ...l }), c = new Intl.NumberFormat(r, { minimumFractionDigits: 2, maximumFractionDigits: 2, ...l }), p = new Intl.NumberFormat(r, { maximumFractionDigits: 1, ...l }), h = new Intl.NumberFormat(r, { maximumFractionDigits: 0, ...l }), g = Ja(i, s), x = g ? "h12" : "h23", u = new Intl.DateTimeFormat(s, { hour: g ? "numeric" : "2-digit", minute: "2-digit", hourCycle: x }), b = new Intl.DateTimeFormat(s, g ? { hour: "numeric", hourCycle: x } : { hour: "2-digit", minute: "2-digit", hourCycle: x }), v = o === "system" ? void 0 : s, $ = new Intl.DateTimeFormat(v, { day: "numeric", month: "numeric" }), k = (f) => {
    if (!["DMY", "MDY", "YMD"].includes(o))
      return $.format(f);
    const y = $.formatToParts(f), A = y.find((M) => M.type === "literal")?.value ?? "/", S = y[y.length - 1], C = S?.type === "literal" ? S.value : "", E = y.find((M) => M.type === "day")?.value ?? "", L = y.find((M) => M.type === "month")?.value ?? "";
    return o === "DMY" ? `${E}${A}${L}${C}` : `${L}${A}${E}${C}`;
  }, B = Ka.has(s.toLowerCase().split("-")[0]) ? " " : "";
  return {
    language: t,
    locale: s,
    t: a,
    one: (f) => d.format(f),
    two: (f) => c.format(f),
    half: (f) => p.format(Math.round(f * 2) / 2),
    tick: (f) => p.format(f),
    whole: (f) => h.format(f),
    percent: (f) => `${f}${B}%`,
    time: (f) => u.format(f),
    hour: (f) => b.format(f),
    day: k
  };
}
const ti = {
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
    boilerLabel: (a, t, e, n, i) => `Bojler ${a}, ${t}${e === void 0 ? "" : `, cíl ${e}`}, stupnice ${n} až ${i}`,
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
    label: (a, t, e, n) => `Zásobník, ${a}, režim ${t}, naměřená teplota není, stupnice ${e} až ${n}`,
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
  }
}, ei = {
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
    boilerLabel: (a, t, e, n, i) => `Boiler ${a}, ${t}${e === void 0 ? "" : `, target ${e}`}, scale ${n} to ${i}`,
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
    label: (a, t, e, n) => `Tank, ${a}, mode ${t}, no measured temperature, scale ${e} to ${n}`,
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
  }
}, ai = {
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
    boilerLabel: (a, t, e, n, i) => `Beredare ${a}, ${t}${e === void 0 ? "" : `, mål ${e}`}, skala ${n} till ${i}`,
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
    label: (a, t, e, n) => `Tank, ${a}, läge ${t}, ingen uppmätt temperatur, skala ${e} till ${n}`,
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
  }
}, ii = { cs: ti, en: ei, sv: ai };
function Ut(a, t) {
  return qa(ii, a, t);
}
function R(a, t) {
  const e = Va(a, t);
  if (e !== void 0)
    return et(a, t)?.attributes?.unit_of_measurement === "kW" ? e * 1e3 : e;
}
let Y = Ut("cs"), Gt = "auto";
function ni(a, t = "auto") {
  Y = a, Gt = t;
}
function ge(a, t = 1e3) {
  return a.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function ra(a) {
  const t = Gt === "auto" ? Math.abs(Math.round(a * 100) / 100) < 10 ? 2 : Math.abs(Math.round(a * 10) / 10) < 100 ? 1 : 0 : Gt;
  return t === 2 ? Y.two(a) : t === 1 ? Y.one(a) : Y.whole(a);
}
function Q(a, t) {
  return t === "kW" ? `${ra(a / 1e3)} kW` : `${Y.whole(Math.round(a))} W`;
}
function T(a, t = 0) {
  return t === 0 ? Y.whole(a) : Y.one(a);
}
function N(a, t) {
  if (t === 0) return Y.whole(a);
  if (t === 1) return Y.one(a);
  if (t === 2) return Y.two(a);
  const e = Y.one(1.5).charAt(1), n = 10 ** t, i = Math.round(Math.abs(a) * n);
  return `${a < 0 && i > 0 ? "−" : ""}${Y.whole(Math.floor(i / n))}${e}${String(i % n).padStart(t, "0")}`;
}
function He(a) {
  return `${new Intl.DateTimeFormat(Y.locale, { weekday: "short" }).format(a)} ${Y.day(a)}`;
}
function oi(a) {
  return Y.time(a);
}
function F(a) {
  return Y.percent(typeof a == "number" ? T(a) : a);
}
function ie(a, t) {
  const e = et(a, t), n = at(a, t);
  if (n === void 0) return;
  const i = Number(n);
  if (!Number.isFinite(i)) return;
  const o = e?.attributes?.unit_of_measurement;
  return o === "Wh" ? i / 1e3 : o === "MWh" ? i * 1e3 : i;
}
function kt(a) {
  return a < (Gt === 1 ? 0.05 : 5e-3) ? "0" : ra(a);
}
function si(a, t, e) {
  const n = a ? Date.parse(a) : NaN;
  if (!Number.isFinite(n)) return;
  const i = Math.max(0, Math.round((t - n) / 6e4));
  return i < 1 ? e.ago.now : i < 60 ? e.ago.minutes(i) : i < 1440 ? e.ago.hours(Math.round(i / 60)) : e.ago.days(Math.round(i / 1440));
}
const tt = ["sun", "bat", "grid"], Lt = ["house", "car", "boil", "batIn", "gridOut"], Ht = (a) => a === void 0 ? void 0 : Math.max(0, a), V = (a, t) => a !== void 0 && a >= t;
function ri(a) {
  if (a === "Disconnected") return "disconnected";
  if (a === "Waiting") return "connected";
  if (a === "Charging") return "charging";
}
function li(a, t, e) {
  const n = t.entities, i = t.num.flows.idle_threshold, o = Ht(R(a, n.pv.power)), s = R(a, n.battery.power), r = R(a, n.grid.power), l = Ht(R(a, n.house.power)), d = Ht(R(a, n.wallbox.power)), c = Ht(R(a, n.boiler.power)), p = s === void 0 ? void 0 : Math.max(0, s), h = s === void 0 ? void 0 : Math.max(0, -s), g = r === void 0 ? void 0 : Math.max(0, -r), x = r === void 0 ? void 0 : Math.max(0, r), u = l === void 0 ? void 0 : Math.max(0, l - (d ?? 0) - (c ?? 0)), b = (E) => V(E, i) ? E : 0, v = {
    sun: Math.max(0, b(o) - b(h) - b(x)),
    bat: b(p),
    grid: b(g)
  }, $ = v.sun + v.bat + v.grid, k = { sun: 0, bat: 0, grid: 0 };
  if ($ > 0)
    for (const E of tt) k[E] = v[E] / $;
  const B = [], f = { house: { ...k }, car: { ...k }, boil: { ...k } }, y = [
    ["house", u],
    ["car", d],
    ["boil", c]
  ], A = y.reduce((E, [, L]) => E + (V(L, i) ? L : 0), 0), S = { sun: 0, bat: 0, grid: 0 };
  for (const E of tt) S[E] = $ > 0 ? v[E] * A / $ : 0;
  for (const [E, L] of y) {
    if (!V(L, i)) continue;
    let M = L;
    const z = { sun: 0, bat: 0, grid: 0 };
    for (const lt of tt) {
      const D = Math.min(S[lt], M);
      S[lt] -= D, M -= D, z[lt] = D / L, D > 0.5 && B.push({ from: lt, to: E, watts: D });
    }
    z.sun + z.bat + z.grid > 0 && (f[E] = z);
  }
  V(h, i) && B.push({ from: "sun", to: "batIn", watts: h }), V(x, i) && B.push({ from: "sun", to: "gridOut", watts: x });
  const C = {
    sun: o,
    batDis: p,
    batIn: h,
    imp: g,
    exp: x,
    other: u,
    car: d,
    boil: c,
    share: k,
    loadShare: f,
    flows: B,
    soc: R(a, n.battery.state_of_charge),
    carSoc: R(a, n.car.state_of_charge),
    carRange: R(a, n.car.range),
    boilTemp: R(a, n.boiler.temperature),
    carLink: ri(at(a, n.wallbox.status))
  };
  return Object.assign(C, di(C, t.num.flows, e)), C;
}
function di(a, t, e) {
  const n = t.idle_threshold, i = (h) => V(h, n);
  if ([a.sun, a.batDis, a.imp, a.other].every((h) => h === void 0)) return {};
  if (i(a.sun) && !i(a.imp) && !i(a.batDis)) {
    let h;
    return (a.exp ?? 0) > t.export_notice && !i(a.batIn) ? h = e.summary.exportSurplus : i(a.car) ? h = e.summary.sunChargesCar(i(a.batIn)) : i(a.batIn) ? h = e.summary.sunChargesBattery : h = e.summary.sunCoversHouse, { summary: h, summarySource: "sun" };
  }
  const { sun: r, bat: l, grid: d } = a.loadShare.house;
  if (d > t.grid_deviation_share / 100) return { summary: e.summary.fromGrid, summarySource: "grid" };
  const c = t.source_min_share / 100;
  if (r < c && d < c && l > 0) return { summary: e.summary.fromBattery, summarySource: "bat" };
  const p = da(a.loadShare.house, c);
  return p.length ? { summary: e.summary.houseTakes(la(p, e)), summarySource: p[0] } : { summary: e.summary.nothing };
}
function la(a, t) {
  return t.from[a[0]] + a.slice(1).map((e) => ` ${t.and} ${t.alsoFrom[e]}`).join("");
}
function da(a, t) {
  return tt.filter((e) => a[e] >= t).sort((e, n) => a[n] - a[e]);
}
function ca(a, t, e) {
  let n = da(a, t.source_min_share / 100);
  n.length || (n = ["sun"]);
  const i = a.grid > t.grid_deviation_share / 100;
  return { text: la(n, e), main: i ? "grid" : n[0], deviation: i };
}
function ci(a, t) {
  if (!(a === void 0 || t === void 0))
    return a === "off" && t === "on" ? "on" : a === "on" && t === "off" ? "off" : "unclear";
}
const hi = Ot`
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
`, pi = ["cs", "en", "sv"];
class ha extends Error {
}
function I(a) {
  throw new ha(a);
}
function ui(a, t) {
  try {
    return t();
  } catch (e) {
    throw e instanceof ha ? new Error(`${a}: ${e.message}`) : e;
  }
}
function fe(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function pt(a, t) {
  return a == null ? {} : (fe(a) || I(`"${t}" must be a mapping of keys.`), a);
}
function jt(a, t, e) {
  for (const n of Object.keys(a))
    t.includes(n) || I(`${e}: unknown key "${n}" (allowed: ${t.join(", ")}).`);
}
function bi(a, t, e = {}) {
  if (a == null)
    return;
  const n = typeof a == "string" ? a.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(n) || I(`${t} must be an entity ID such as ${e.example ?? `${e.domain ?? "sensor"}.example`}.`), e.domain && !n.startsWith(`${e.domain}.`) && I(`${t} must be a ${e.domain} entity (${e.domain}.…), not ${n}.`), n;
}
const Pe = ["auto", ...pi];
function gi(a) {
  const t = a ?? "auto";
  return Pe.includes(t) || I(`language must be one of ${Pe.join(", ")}.`), t;
}
const Yt = {
  pv: { power: void 0 },
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
  daily: { pv_generation: void 0, battery_charge: void 0, battery_discharge: void 0, grid_import: void 0, grid_export: void 0, car: void 0, boiler: void 0 }
}, pa = { boiler: ["show"], car: ["link"], flows: ["decimals"], battery: ["default_range"] }, Re = ["1d", "7d", "30d"], fi = "1d", Ie = ["always", "heating"], mi = "heating", Ne = ["auto", 1, 2], vi = "auto", ua = Object.keys(Yt), O = (a, t, e, n, i = !1) => ({ value: a, min: t, max: e, what: n, integer: i }), me = {
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
}, Ft = {
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
}, xi = [
  { temp: 20, color: "#0A84FF" },
  { temp: 32, color: "#5AC8FA" },
  { temp: 44, color: "#FFD60A" },
  { temp: 58, color: "#FF9F0A" },
  { temp: 85, color: "#FF453A" }
], ne = ["electricity", "car", "water"];
[
  ...ua.flatMap((a) => Object.keys(Yt[a]).map((t) => `${a}.${t}`)),
  ...Object.entries(me).flatMap(([a, t]) => Object.keys(t).map((e) => `${a}.${e}`)),
  ...ne.map((a) => `titles.${a}`),
  ...Object.keys(Ft).map((a) => `colors.${a}`)
];
function $i(a, t) {
  const e = pt(a[t], t), n = Yt[t], i = [...Object.keys(me[t] ?? {}), ...pa[t] ?? []];
  jt(e, [...Object.keys(n), ...i], t);
  const o = {};
  for (const [s, r] of Object.entries(n)) {
    const l = bi(e[s], `${t}.${s}`, { domain: r });
    l && (o[s] = l);
  }
  return o;
}
function yi(a) {
  const t = {};
  for (const [e, n] of Object.entries(me)) {
    const i = pt(a[e], e), o = Object.keys(Yt[e] ?? {});
    jt(i, [...o, ...Object.keys(n), ...pa[e] ?? []], e), t[e] = {};
    for (const [s, r] of Object.entries(n)) {
      const l = i[s], d = `${e}.${s}`;
      if (l == null) {
        t[e][s] = r.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && I(`${d} must be a number (${r.what}).`), (l < r.min || l > r.max || r.integer && !Number.isInteger(l)) && I(`${d} must be ${r.integer ? "a whole number " : "a number "}from ${r.min} to ${r.max} (${r.what}), not ${l}.`), t[e][s] = l;
    }
  }
  return t;
}
function wi(a) {
  const t = pt(a.colors, "colors");
  jt(t, [...Object.keys(Ft), "temp_scale"], "colors");
  const e = { ...Ft };
  for (const n of Object.keys(Ft)) {
    const i = t[n];
    i != null && ((typeof i != "string" || !/^#[0-9a-fA-F]{6}$/.test(i.trim())) && I(`colors.${n} must be a colour like #FFD60A (six hex digits).`), e[n] = i.trim().toUpperCase());
  }
  return e;
}
function ki(a) {
  const t = pt(a.colors, "colors").temp_scale;
  if (t == null)
    return xi.map((i) => ({ ...i }));
  const e = "colors.temp_scale";
  (!Array.isArray(t) || t.length < 2) && I(`${e} must be a list of at least two points like {temp: 20, color: "#0A84FF"}.`);
  const n = t.map((i, o) => (fe(i) || I(`${e}[${o}] must be a mapping like {temp: 20, color: "#0A84FF"}.`), jt(i, ["temp", "color"], `${e}[${o}]`), (typeof i.temp != "number" || !Number.isFinite(i.temp)) && I(`${e}[${o}].temp must be a number (°C).`), (typeof i.color != "string" || !/^#[0-9a-fA-F]{6}$/.test(i.color.trim())) && I(`${e}[${o}].color must be a colour like #0A84FF (six hex digits).`), { temp: i.temp, color: i.color.trim().toUpperCase() }));
  return n.forEach((i, o) => {
    o > 0 && i.temp <= n[o - 1].temp && I(`${e}: temperatures must rise (${n[o - 1].temp} is followed by ${i.temp}).`);
  }), n;
}
function _i(a) {
  const t = pt(a.boiler, "boiler").show;
  return t == null ? mi : ((typeof t != "string" || !Ie.includes(t)) && I(`boiler.show must be one of ${Ie.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Si(a) {
  const t = pt(a.battery, "battery").default_range;
  return t == null ? fi : ((typeof t != "string" || !Re.includes(t)) && I(`battery.default_range must be one of ${Re.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
function Ci(a) {
  const t = pt(a.flows, "flows").decimals;
  return t == null ? vi : (Ne.includes(t) || I(`flows.decimals must be one of ${Ne.join(", ")}, not ${JSON.stringify(t)}.`), t);
}
const Mi = "/dashboard-bmw";
function Li(a) {
  const t = pt(a.car, "car").link;
  return t == null ? Mi : ((typeof t != "string" || t !== "" && !/^(\/(?!\/)\S*|https?:\/\/\S+)$/.test(t)) && I(`car.link must be a path such as /dashboard-bmw, an address starting with http:// or https://, or an empty text, not ${JSON.stringify(t)}.`), t);
}
function Ti(a) {
  const t = pt(a.titles, "titles");
  jt(t, [...ne], "titles");
  const e = {};
  for (const n of ne) {
    const i = t[n];
    i != null && ((typeof i != "string" || i.trim() === "") && I(`titles.${n} must be a non-empty text.`), e[n] = i.trim());
  }
  return e;
}
function Ai(a) {
  const t = [
    [a.wallbox.power_min, a.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [a.boiler.target_min, a.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [a.water.gauge_min, a.water.gauge_max, "water.gauge_min", "water.gauge_max", !0],
    [a.tank.temp_min, a.tank.temp_max, "tank.temp_min", "tank.temp_max", !0],
    [a.battery.imbalance_good, a.battery.imbalance_warn, "battery.imbalance_good", "battery.imbalance_warn", !1],
    [a.battery.imbalance_warn, a.battery.imbalance_fault, "battery.imbalance_warn", "battery.imbalance_fault", !1]
  ];
  for (const [e, n, i, o, s] of t)
    (s ? e >= n : e > n) && I(`${i} (${e}) must be ${s ? "below" : "at most"} ${o} (${n}).`);
}
function Di(a) {
  return ui("Energie Dashboard", () => Bi(a));
}
function Bi(a) {
  fe(a) || I("the configuration must be a mapping of keys."), a.title != null && typeof a.title != "string" && I("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(ua.map((i) => [i, $i(a, i)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && I("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = yi(a);
  Ai(e);
  const n = gi(a.language);
  return { title: a.title ?? void 0, language: n, entities: t, titles: Ti(a), num: e, colors: wi(a), tempScale: ki(a), boilerShow: _i(a), powerDecimals: Ci(a), carLink: Li(a), batteryRange: Si(a) };
}
const _ = "––", rt = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, Fe = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, We = "ha-energie-dashboard:boiler-heating", Ve = "ha-energie-dashboard:battery-range";
function ct(a, t) {
  const e = a?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function Ei(a) {
  const t = a.reduce((o, s) => o + s, 0);
  if (t <= 0) return a.map(() => 0);
  const e = a.map((o) => o / t * 100), n = e.map(Math.floor);
  let i = 100 - n.reduce((o, s) => o + s, 0);
  return e.map((o, s) => ({ index: s, rest: o - n[s] })).sort((o, s) => s.rest - o.rest).forEach(({ index: o }) => {
    i-- > 0 && n[o]++;
  }), n;
}
const W = (a, t, e) => Math.max(t, Math.min(e, a)), ve = (a, t) => `color-mix(in srgb, ${a} ${t}%, transparent)`, Pt = (a, t) => `color-mix(in srgb, ${a} ${t}%, var(--ed-tint-base))`, ba = (a) => Array.from({ length: 10 }, (t, e) => W((a - e * 10) / 10, 0, 1) * 100), Ue = (a) => `calc((100% - 18px) * ${W(a, 0, 100) / 100} + ${Math.max(0, Math.ceil(W(a, 0, 100) / 10) - 1) * 2}px)`;
var Oi = Object.defineProperty, K = (a, t, e, n) => {
  for (var i = void 0, o = a.length - 1, s; o >= 0; o--)
    (s = a[o]) && (i = s(t, e, i) || i);
  return i && Oi(t, e, i), i;
};
class G extends gt {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._all = !1, this._now = Date.now(), this._carHint = !1, this._batDetail = !1, this._batTab = "now", this._batSpan = "24h", this._batScrub = {}, this._batData = {}, this._i18n = Ut("cs"), this._timers = /* @__PURE__ */ new Map(), this._lastHeating = 0, this._storedHeating = 0;
  }
  setConfig(t) {
    this._config = Di(t);
  }
  getCardSize() {
    return 14;
  }
  connectedCallback() {
    super.connectedCallback();
    try {
      this._lastHeating = Math.max(this._lastHeating, Number(localStorage.getItem(We)) || 0);
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
    this._i18n = Ut(Ua(this._config?.language ?? "auto", this.hass), this.hass), ni(this._i18n, this._config?.powerDecimals), this.lang !== this._i18n.language && (this.lang = this._i18n.language), this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
    const t = this._config;
    if (t && V(R(this.hass, t.entities.boiler.power), t.num.flows.idle_threshold) && (this._lastHeating = Date.now(), this._lastHeating - this._storedHeating > 6e4)) {
      this._storedHeating = this._lastHeating;
      try {
        localStorage.setItem(We, String(this._lastHeating));
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
      const i = Math.round(e.getBoundingClientRect().width);
      i > 0 && i !== this._width && (this._width = i);
    }), this._observer.observe(e)), t.has("hass")) {
      const i = Object.entries(this._optimistic).filter(([o, s]) => this.hass?.states?.[o]?.state === s);
      if (i.length) {
        const o = { ...this._optimistic };
        i.forEach(([s]) => delete o[s]), this._optimistic = o;
      }
    }
    t.has("hass") && this._tankTemp && ct(et(this.hass, this._tankTemp.id), "temperature") === this._tankTemp.value && (this._tankTemp = void 0);
    const n = this._config;
    if (window.clearTimeout(this._timers.get("hold")), n && n.boilerShow === "heating" && this._lastHeating) {
      const i = this._lastHeating + n.num.boiler.hold_minutes * 6e4 - Date.now();
      i > 0 && this._timers.set("hold", window.setTimeout(() => this.requestUpdate(), i + 50));
    }
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${rt[t.main]})`;
  }
  stateLine(t, e) {
    return m`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? m`${_}<span class="sr-only">${this.t.noData}</span>`}
    </p>`;
  }
  carVisible(t, e) {
    return !(e.carLink === "disconnected" && !V(e.car, t.num.flows.idle_threshold));
  }
  boilerVisible(t, e) {
    return t.boilerShow === "always" || e.boil === void 0 || V(e.boil, t.num.flows.idle_threshold) ? !0 : this._lastHeating > 0 && Date.now() - this._lastHeating < t.num.boiler.hold_minutes * 6e4;
  }
  /** Energy of today in kWh from the counters of the configuration; undefined = no data. */
  today(t) {
    const e = t.entities.daily, n = (r) => ie(this.hass, r), i = {
      pv: n(e.pv_generation),
      bchg: n(e.battery_charge),
      bdis: n(e.battery_discharge),
      gin: n(e.grid_import),
      gout: n(e.grid_export),
      car: n(e.car),
      boil: n(e.boiler)
    }, s = [i.pv, i.gin, i.bdis, i.gout, i.bchg, i.car, i.boil].every((r) => r !== void 0) ? Math.max(0, i.pv + i.gin + i.bdis - i.gout - i.bchg - i.car - i.boil) : void 0;
    return { ...i, house: s };
  }
  /** Battery reserve in %: 100 − the inverter's depth of discharge (on-grid); the configured number only when the inverter does not report it. */
  batteryReserve(t) {
    const e = R(this.hass, t.entities.battery.depth_of_discharge);
    return e !== void 0 && e >= 0 && e <= 100 ? 100 - e : t.num.battery.reserve;
  }
}
K([
  U()
], G.prototype, "_config");
K([
  H({ attribute: !1 })
], G.prototype, "hass");
K([
  U()
], G.prototype, "_width");
K([
  U()
], G.prototype, "_optimistic");
K([
  U()
], G.prototype, "_feedback");
K([
  U()
], G.prototype, "_open");
K([
  U()
], G.prototype, "_pop");
K([
  U()
], G.prototype, "_all");
K([
  U()
], G.prototype, "_now");
K([
  U()
], G.prototype, "_carHint");
K([
  U()
], G.prototype, "_batDetail");
K([
  U()
], G.prototype, "_batTab");
K([
  U()
], G.prototype, "_batSpan");
K([
  U()
], G.prototype, "_batRange");
K([
  U()
], G.prototype, "_batOpen");
K([
  U()
], G.prototype, "_batScrub");
K([
  U()
], G.prototype, "_batData");
K([
  U()
], G.prototype, "_tankTemp");
const zi = (a) => class extends a {
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? at(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  switchRow(t, e, n, i) {
    const o = this.shown(e);
    return m`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${e.replace(/\W/g, "-")}">${t}</span><span class="hint ${i ? "warn" : ""}">${o === void 0 ? _ : n}</span></span>
        <ed-switch
          label=${t} .checked=${o === "on"} ?disabled=${o === void 0}
          @hdk-toggle=${(s) => this.setSwitch(e, s.detail.checked, t)}
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
  async call(t, e, n, i, o) {
    if (!this.hass || at(this.hass, i) === void 0)
      return this._feedback = this.t.feedback.noData(o), !1;
    try {
      return await this.hass.callService(t, e, n), !0;
    } catch {
      return this._feedback = this.t.feedback.rejected(o), !1;
    }
  }
  async setSwitch(t, e, n) {
    this._feedback = "", this.choose(t, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: t }, t, n);
  }
  async setBoost(t, e) {
    const n = this._config.entities, i = t === "wallbox" ? n.wallbox.boost : n.boiler.boost;
    i && (this._feedback = "", t === "wallbox" && e && n.wallbox.block_charging && at(this.hass, n.wallbox.block_charging) === "on" && (await this.setSwitch(n.wallbox.block_charging, !1, this.t.wallbox.block), this._feedback = this.t.feedback.unblocked), this.choose(i, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: i }, i, t === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title));
  }
  async setNumber(t, e, n) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, n);
  }
  async setTank(t, e) {
    if (this._feedback = "", this.choose(t, e), !!await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, this.t.tank.modeLabel) && e === "heat") {
      const { min: n, max: i } = this.tankRange(this._config), o = ct(et(this.hass, t), "temperature");
      (o === void 0 || o < n || o > i) && await this.setTemperature(t, W(o ?? n, n, i));
    }
  }
  /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
  tankRange(t) {
    const e = et(this.hass, t.entities.tank.water_heater);
    return {
      min: Math.max(t.num.tank.temp_min, ct(e, "min_temp") ?? t.num.tank.temp_min),
      max: Math.min(t.num.tank.temp_max, ct(e, "max_temp") ?? t.num.tank.temp_max)
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
    const i = t === "on" ? "off" : "on", o = t === "on" ? "on" : "off";
    this.choose(e, i), this.choose(n, o), (await Promise.all([
      this.call("switch", `turn_${i}`, { entity_id: e }, e, this.t.water.mixing),
      this.call("switch", `turn_${o}`, { entity_id: n }, n, this.t.water.mixing)
    ])).every(Boolean) || (this._feedback = this._feedback || this.t.feedback.mixingNotSent);
  }
}, Ge = ["1d", "7d", "30d"], yt = { "1d": 1, "7d": 7, "30d": 30 }, ot = 310, dt = 36e5, Mt = 24 * dt, oe = (a) => typeof a == "number" && Number.isFinite(a);
async function ji(a, t, e, n, i, o) {
  return t.length ? await a.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(e).toISOString(),
    end_time: new Date(n).toISOString(),
    statistic_ids: t,
    period: i,
    types: o
  }) ?? {} : {};
}
function ut(a, t, e, n, i, o = "mean", s = 0) {
  const r = new Array(i).fill(0), l = new Array(i).fill(0), d = new Array(i).fill(void 0), c = (n - e) / i;
  for (const p of a ?? []) {
    const h = p[t];
    if (!oe(h) || !oe(p.start) || c <= 0) continue;
    const g = Math.floor((p.start - e + s) / c);
    if (g < 0 || g >= i) continue;
    l[g]++, r[g] += h;
    const x = d[g];
    o === "min" ? d[g] = x === void 0 ? h : Math.min(x, h) : o === "max" ? d[g] = x === void 0 ? h : Math.max(x, h) : o === "last" && (d[g] = h);
  }
  return d.map((p, h) => {
    if (l[h])
      return o === "mean" ? r[h] / l[h] : o === "sum" ? r[h] : p;
  });
}
function Jt(a, t) {
  return (a ?? []).some((e) => oe(e[t]));
}
const j = (a) => Math.round(a * 10) / 10;
function Rt(a, t, e) {
  let n = "", i = !1;
  return a.forEach((o, s) => {
    if (o === void 0) {
      i = !1;
      return;
    }
    n += `${i ? " L" : n ? " M" : "M"}${j(t(s))} ${j(e(o))}`, i = !0;
  }), n;
}
function Ze(a, t, e, n) {
  let i = "", o = -1;
  const s = (r) => {
    if (!(o < 0)) {
      i += `${i ? " " : ""}M${j(t(o))} ${j(n)}`;
      for (let l = o; l <= r; l++) i += ` L${j(t(l))} ${j(e(a[l]))}`;
      i += ` L${j(t(r))} ${j(n)} Z`, o = -1;
    }
  };
  return a.forEach((r, l) => {
    r === void 0 ? s(l - 1) : o < 0 && (o = l);
  }), s(a.length - 1), i;
}
function Hi(a, t, e, n) {
  let i = "", o = -1;
  const s = (l) => a[l] !== void 0 && t[l] !== void 0, r = (l) => {
    if (!(o < 0)) {
      i += `${i ? " " : ""}M${j(e(o))} ${j(n(t[o]))}`;
      for (let d = o + 1; d <= l; d++) i += ` L${j(e(d))} ${j(n(t[d]))}`;
      for (let d = l; d >= o; d--) i += ` L${j(e(d))} ${j(n(a[d]))}`;
      i += " Z", o = -1;
    }
  };
  for (let l = 0; l < a.length; l++)
    s(l) ? o < 0 && (o = l) : r(l - 1);
  return r(a.length - 1), i;
}
function Ke(a) {
  if (!(a > 0)) return 1;
  const e = 10 ** Math.floor(Math.log10(a)), n = a / e;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 3 ? 3 : n <= 5 ? 5 : 10) * e;
}
function Pi(a, t) {
  const e = a.filter((r) => r !== void 0);
  if (!e.length) return;
  let n = Math.min(...e), i = Math.max(...e);
  const o = Math.max(i - n, t), s = (i + n) / 2;
  return n = s - o / 2 - o * 0.1, i = s + o / 2 + o * 0.1, { lo: n, hi: i };
}
function Ye(a, t, e) {
  if (!(e > 0) || !(a > 0) || !(t > 0)) return;
  const n = a / 100 * t / (e / 1e3), i = Math.round(n * 60 / 5) * 5;
  return i >= 5 && i < 2880 ? i : void 0;
}
function qe(a) {
  const t = Math.floor(a / 60), e = a % 60;
  return t === 0 ? `${e} min` : e === 0 ? `${t} h` : `${t} h ${e} min`;
}
const Ri = 5 * 6e4, Qt = 48, Xe = 60, Ii = 90, Ni = (a) => class extends a {
  // ----------------------------------------------------------------- state and history
  /** The history range: the choice made in the detail (kept in the browser), otherwise battery.default_range. */
  batRange(t) {
    if (this._batRange) return this._batRange;
    try {
      const e = localStorage.getItem(Ve);
      if (e && Ge.includes(e)) return e;
    } catch {
    }
    return t.batteryRange;
  }
  setBatRange(t) {
    this._batRange = t, this._batScrub = {};
    try {
      localStorage.setItem(Ve, t);
    } catch {
    }
  }
  /** The views of the history the open parts need (keys of `_batData`). */
  batNeeds(t) {
    const e = [];
    return this._batDetail && (this._batTab === "now" && e.push(`day:${this._batSpan}`), this._batTab === "hist" && e.push(`hist:${this.batRange(t)}`), this._batTab === "health" && this._batOpen && e.push(`health:${this.batRange(t)}`)), e;
  }
  /** What to ask Home Assistant for a view; the entities that are not configured are left out. */
  batRequests(t, e, n) {
    const i = t.entities.battery, o = (...d) => d.filter((c) => !!c), [s, r] = e.split(":");
    if (s === "day") {
      const d = n - (r === "6h" ? 6 : 24) * dt;
      return [{ part: "level", ids: o(i.power, i.state_of_charge), start: d, end: n, period: "5minute", types: ["mean"] }];
    }
    const l = r;
    if (s === "hist") {
      const d = this.histWindow(l, n);
      return [
        { part: "energy", ids: o(i.total_charge, i.total_discharge), start: d.start, end: n, period: l === "1d" ? "hour" : "day", types: ["change"] },
        { part: "level", ids: o(i.state_of_charge, i.power), start: d.start, end: n, period: "hour", types: ["mean", "min", "max"] }
      ];
    }
    return [
      {
        part: "health",
        ids: o(i.min_cell_voltage, i.max_cell_voltage, i.min_cell_temperature, i.max_cell_temperature, i.temperature, i.total_discharge, i.total_charge),
        start: n - yt[l] * Mt,
        end: n,
        period: l === "1d" ? "5minute" : "hour",
        types: ["mean", "state"]
      }
    ];
  }
  /** The first moment shown by the energy chart: 24 whole hours, or whole days up to today. */
  histWindow(t, e) {
    if (t === "1d")
      return { start: Math.floor(e / dt) * dt - 23 * dt, bins: 24 };
    const n = new Date(e);
    return n.setHours(0, 0, 0, 0), n.setDate(n.getDate() - (yt[t] - 1)), { start: n.getTime(), bins: yt[t] };
  }
  loadBattery() {
    const t = this._config;
    if (!(!t || !this.hass))
      for (const e of this.batNeeds(t)) {
        const n = this._batData[e];
        n && (n.status === "loading" || Date.now() - n.at < Ri) || this.fetchBattery(t, e, n);
      }
  }
  async fetchBattery(t, e, n) {
    const i = this.hass;
    if (!i) return;
    const o = Date.now();
    this._batData = { ...this._batData, [e]: { status: "loading", at: o, parts: n?.parts ?? {} } };
    try {
      const s = this.batRequests(t, e, o), r = {};
      await Promise.all(s.map(async (l) => r[l.part] = await ji(i, l.ids, l.start, l.end, l.period, l.types))), this._batData = { ...this._batData, [e]: { status: "ready", at: o, parts: r } };
    } catch {
      this._batData = { ...this._batData, [e]: { status: "error", at: o, parts: {} } };
    }
  }
  /** Rows of one entity from a loaded view. */
  batRows(t, e, n) {
    return n ? this._batData[t]?.parts[e]?.[n] : void 0;
  }
  batteryToggled() {
    if (!this._batDetail) return;
    const t = this.renderRoot.querySelector(".bat-detail");
    t?.scrollIntoView({ block: "start" }), t?.focus({ preventScroll: !0 });
  }
  openBatteryDetail() {
    this._batDetail = !0, this._batTab = "now", this._batOpen = void 0, this._batScrub = {};
  }
  /** "Zpět" returns to the popup of the tile, "Hotovo" closes everything. */
  closeBatteryDetail(t) {
    this._batDetail = !1, t && (this._pop = void 0), this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
  }
  // ----------------------------------------------------------------- shared pieces
  batState(t, e) {
    const n = e.num.flows.idle_threshold;
    return V(t.batIn, n) ? "charging" : V(t.batDis, n) ? "discharging" : t.batIn === void 0 && t.batDis === void 0 ? void 0 : "idle";
  }
  /** The gauge of ten pills (the first ones are the reserve); only the outer corners are round, nothing is animated. */
  renderGauge(t, e, n) {
    const i = this.t, o = this.batteryReserve(e), s = Array.from({ length: 10 }, (l, d) => {
      const c = (d + 1) * 10 <= o + 1e-3, p = t === void 0 ? 0 : W((t - d * 10) / 10, 0, 1) * 100, h = d === 0 ? "8px 0 0 8px" : d === 9 ? "0 8px 8px 0" : "0", g = c ? "var(--ed-warning)" : "var(--ed-battery)";
      return m`<span class="pill" style="height:${n}px;border-radius:${h};background:${c ? ve("var(--ed-warning)", 24) : "var(--pill)"}"><i style="width:${p.toFixed(1)}%;background:${g}"></i></span>`;
    }), r = t === void 0 ? i.noData : i.bat.levelLabel(F(t), F(o));
    return m`<div class="bat-gauge" role="img" aria-label=${r}>${s}</div>`;
  }
  /** "Plná za asi 7 h 30 min" / "Vydrží asi 3 h 30 min" at the present power, none while the battery rests. */
  batEstimate(t, e) {
    const n = t.soc, i = this.batState(t, e);
    if (n === void 0) return;
    const o = e.num.battery.capacity;
    if (i === "charging") {
      const s = Ye(100 - n, o, t.batIn ?? 0);
      return s === void 0 ? void 0 : this.t.bat.fullIn(qe(s));
    }
    if (i === "discharging") {
      const s = Ye(n - this.batteryReserve(e), o, t.batDis ?? 0);
      return s === void 0 ? void 0 : this.t.bat.lastsFor(qe(s));
    }
  }
  /** Signed power in kW, charging positive (the raw entity is the other way round). */
  batSigned(t) {
    if (!(t.batIn === void 0 && t.batDis === void 0))
      return ((t.batIn ?? 0) - (t.batDis ?? 0)) / 1e3;
  }
  // ----------------------------------------------------------------- popup
  renderBatteryPopup(t, e, n, i, o) {
    const s = this.t, r = n.num.flows.idle_threshold, l = t.key === "bat", d = i.soc, c = d !== void 0 && d <= this.batteryReserve(n), p = l ? i.batDis : i.batIn, g = V(p, r) ? l ? s.pop.discharging(Q(p, o)) : s.pop.charging(Q(p, o)) : i.batDis === void 0 && i.batIn === void 0 && d === void 0 ? _ : l ? s.idle.bat : s.idle.batIn, x = this.today(n), u = l ? x.bdis : x.bchg, b = this.batEstimate(i, n), v = Math.min(236, e.width), $ = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, k = W($ - v / 2, 0, e.width - v), B = t.side === "L" ? e.left[t.key] : e.right[t.key], f = B - e.tile.h / 2, y = B < e.height / 2, A = y ? `top:${(f + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - f + 8).toFixed(0)}px`;
    return m`<div class="pop bat-pop" role="dialog" aria-label=${t.name} tabindex="-1" style="left:${k.toFixed(0)}px;${A};width:${v}px">
        <i class="arrow ${y ? "up" : "down"}" aria-hidden="true" style="left:${($ - k - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${t.name}</span><span class="pop-now">${g}</span></div>
        <div class="pop-level">
          <div class="pop-level-row">
            <span class="pop-label">${s.pop.level}${c ? m`<span class="note"> ${s.pop.atReserve}</span>` : w}</span>
            <span class="pop-big" style="color:${c ? "var(--ed-warning)" : "var(--ed-text)"}">${d === void 0 ? _ : F(d)}</span>
          </div>
          ${this.renderGauge(d, n, 12)}
        </div>
        ${b ? m`<p class="bat-estimate"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2"></circle><path d="M8 4.5V8l2.4 1.6"></path></svg>${b}</p>` : w}
        <div class="pop-rows"><div class="pop-row"><span>${l ? s.pop.rows.discharged : s.pop.rows.charged}</span><b>${u === void 0 ? _ : `${kt(u)} kWh`}</b></div></div>
        <button type="button" class="bat-open" @click=${() => this.openBatteryDetail()}><span>${s.bat.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
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
    const e = this.t, n = this._batScrub[t.id] ?? 100, i = Math.round(n / 100 * (t.n - 1)), o = t.x(i), s = t.dot?.(i), r = t.read(i), l = (d) => `${(d / t.h * 100).toFixed(2)}%`;
    return m`<div class="bat-read">${r}</div>
        <div class="bat-chart" style="aspect-ratio:${ot} / ${t.h}">
          <svg viewBox="0 0 ${ot} ${t.h}" aria-hidden="true">
            <defs>
              <linearGradient id="bf-${t.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2=${Ii} y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"></stop><stop offset="1" stop-color="#fff" stop-opacity="1"></stop></linearGradient>
              <mask id="bm-${t.id}" maskUnits="userSpaceOnUse" x="0" y="0" width=${ot} height=${t.h}><rect width=${ot} height=${t.h} fill="url(#bf-${t.id})"></rect></mask>
            </defs>
            ${t.grid.map((d) => q`<line x1="0" y1=${d.y} x2=${ot} y2=${d.y} class=${d.strong ? "axis" : "grid"}></line>`)}
            <g mask="url(#bm-${t.id})">${t.body}</g>
            <line x1=${o} y1="0" x2=${o} y2=${t.h} class="cursor"></line>
            ${s ? q`<circle cx=${o} cy=${s.y} r="6" style="fill:var(--ed-text)"></circle>` : w}
          </svg>
          ${t.labels.map((d) => m`<span class="bat-ylabel" style="top:calc(${l(d.y)} - 16px)">${d.text}</span>`)}
          <input type="range" min="0" max="100" step="1" .value=${String(n)} aria-label=${e.bat.scrubLabel} aria-valuetext=${r}
            @input=${(d) => {
      this._batScrub = { ...this._batScrub, [t.id]: Number(d.target.value) };
    }} />
        </div>
        <div class="bat-axis"><span>${t.from}</span><span>${t.to}</span></div>
        ${t.legend ?? w}`;
  }
  renderChartOrEmpty(t, e, n) {
    if (n) return this.renderChart(n);
    const i = this._batData[t]?.status === "loading" && !Object.keys(this._batData[t]?.parts ?? {}).length;
    return m`<div class="bat-nodata" style="aspect-ratio:${ot} / ${e}">${i ? _ : this.t.bat.noDataChart}</div>`;
  }
  /** Nabití a výkon: the line of the charge above, the bars of the power around its own zero axis below. */
  levelChart(t) {
    const e = t.entities.battery, n = `day:${this._batSpan}`, i = this._batData[n];
    if (!i) return;
    const o = this._batSpan === "6h" ? 6 : 24, s = i.at, r = s - o * dt, l = ut(this.batRows(n, "level", e.state_of_charge), "mean", r, s, Qt), d = ut(this.batRows(n, "level", e.power), "mean", r, s, Qt).map((f) => f === void 0 ? void 0 : -f / 1e3);
    if (!l.some((f) => f !== void 0) && !d.some((f) => f !== void 0)) return;
    const c = Qt, p = (f) => j(f / (c - 1) * ot), h = (f) => j(98 - W(f, 0, 100) / 100 * 90), g = Ke(Math.max(1, ...d.map((f) => Math.abs(f ?? 0)))), x = 160, u = (f) => j(x - W(f, -g, g) / g * 44), b = 4.2, v = d.map((f, y) => {
      if (f === void 0) return w;
      const A = Math.min(x, u(f)), S = Math.max(1.5, Math.abs(u(f) - x));
      return q`<rect x=${j(p(y) - b / 2)} y=${f >= 0 ? A : x} width=${b} height=${j(S)} rx="1.5" style="fill:${f >= 0 ? "var(--ed-battery)" : "var(--ed-discharge)"}"></rect>`;
    }), $ = Rt(l, p, h), k = Ze(l, p, h, 98), B = (f) => `${N(f, f % 1 === 0 ? 0 : 1)} kW`;
    return {
      id: "level",
      h: 210,
      n: c,
      x: p,
      grid: [{ y: 8 }, { y: 53 }, { y: 98, strong: !0 }, { y: x, strong: !0 }],
      labels: [
        { y: 8, text: F(100) },
        { y: 53, text: F(50) },
        { y: 98, text: F(0) },
        { y: x - 44, text: `+${B(g)}` },
        { y: x, text: "0" },
        { y: x + 44, text: `−${B(g)}` }
      ],
      body: q`<defs><linearGradient id="bl-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.22"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient></defs>
          <path d=${k} fill="url(#bl-area)"></path>
          <path d=${$} fill="none" style="stroke:var(--ed-text)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>${v}`,
      dot: (f) => l[f] === void 0 ? void 0 : { y: h(l[f]), color: "var(--ed-text)" },
      read: (f) => {
        const y = d[f], A = y === void 0 ? _ : Math.abs(y) < t.num.flows.idle_threshold / 1e3 ? this.t.bat.status.idle.toLowerCase() : `${y > 0 ? this.t.bat.charging : this.t.bat.discharging} ${Q(Math.abs(y) * 1e3, "kW")}`;
        return `${this.back((1 - f / (c - 1)) * o * 60)} · ${l[f] === void 0 ? _ : F(l[f])} · ${A}`;
      },
      from: `−${o} h`,
      to: this.t.bat.now,
      legend: m`<div class="bat-legend wrap"><span><i class="bar" style="background:var(--ed-text)"></i>${this.t.bat.levelLegend}</span><span><i class="dot" style="background:var(--ed-battery)"></i>${this.t.bat.charging}</span><span><i class="dot" style="background:var(--ed-discharge)"></i>${this.t.bat.discharging}</span></div>`
    };
  }
  /** The energy chart of the history: charged above, discharged below, the white line is the net sum. */
  energyChart(t, e) {
    const n = t.entities.battery, i = `hist:${e}`, o = this._batData[i];
    if (!o) return;
    const s = this.histWindow(e, o.at), r = e === "1d", l = s.bins, d = r ? dt : Mt, c = s.start + l * d, p = r ? 0 : 6 * dt, h = this.batRows(i, "energy", n.total_charge), g = this.batRows(i, "energy", n.total_discharge), x = ut(h, "change", s.start, c, l, "sum", p), u = ut(g, "change", s.start, c, l, "sum", p);
    if (!x.some((D) => D !== void 0) && !u.some((D) => D !== void 0)) return;
    const b = x.map((D) => D ?? 0), v = u.map((D) => D ?? 0), $ = Ke(Math.max(0.5, ...b, ...v)), k = r ? 3 : l <= 7 ? 10 : 2, B = (ot - (l - 1) * k) / l, f = (D) => j(D * (B + k) + B / 2), y = 100, A = (D) => W(D, 0, $) / $ * 92, S = b.flatMap((D, $t) => {
      const ke = v[$t], _e = $t === l - 1 ? 1 : 0.85;
      return [
        q`<rect x=${j($t * (B + k))} y=${j(y - Math.max(D > 0 ? 1 : 0, A(D)))} width=${j(B)} height=${j(Math.max(D > 0 ? 1 : 0, A(D)))} rx="2" style="fill:var(--ed-battery);fill-opacity:${_e}"></rect>`,
        q`<rect x=${j($t * (B + k))} y=${y} width=${j(B)} height=${j(Math.max(ke > 0 ? 1 : 0, A(ke)))} rx="2" style="fill:var(--ed-discharge);fill-opacity:${_e}"></rect>`
      ];
    }), C = (D) => j(y - W(D, -$, $) / $ * 92), E = b.map((D, $t) => D - v[$t]), L = r ? 2 : 1, M = (D) => `${D >= 0 ? "+" : "−"}${N(Math.abs(D), L)}`, z = (D) => r ? oi(s.start + D * dt) : He(s.start + D * Mt), lt = (D) => `${N(D, D % 1 === 0 ? 0 : 1)} kWh`;
    return {
      charged: b,
      discharged: v,
      chart: {
        id: "energy",
        h: 200,
        n: l,
        x: f,
        grid: [{ y, strong: !0 }, { y: 8 }, { y: 192 }],
        labels: [{ y: 8, text: `+${lt($)}` }, { y, text: "0" }, { y: 192, text: `−${lt($)}` }],
        body: q`${S}<path d=${Rt(E, f, C)} fill="none" style="stroke:var(--ed-text)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>`,
        dot: (D) => ({ y: C(E[D]), color: "var(--ed-text)" }),
        read: (D) => `${z(D)} · ${M(b[D])} / ${M(-v[D])} · ${this.t.bat.net} ${M(E[D])} kWh`,
        from: r ? "−24 h" : He(s.start),
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
    const n = t.entities.battery, i = `health:${e}`, o = this._batData[i];
    if (!o) return;
    const s = yt[e], r = o.at, l = r - s * Mt, d = Xe, c = (L) => ut(this.batRows(i, "health", L), "mean", l, r, d), p = c(n.min_cell_voltage), h = c(n.max_cell_voltage), g = p.map((L, M) => L === void 0 || h[M] === void 0 ? void 0 : Math.max(0, (h[M] - L) * 1e3)), x = g.filter((L) => L !== void 0);
    if (!x.length) return;
    const { imbalance_good: u, imbalance_warn: b } = t.num.battery, v = Math.max(u > 0 ? u * 1.5 : 10, Math.max(...x) * 1.2), $ = (L) => j(130 - W(L, 0, v) / v * 120), k = (L) => j(L / (d - 1) * ot), B = (L) => this.back((1 - L / (d - 1)) * s * 24 * 60), f = this.t.bat.health, y = "var(--ed-battery)", A = "var(--ed-warning)", S = (L) => L > b ? A : y, C = `bg-${e}`, E = W(1 - (130 - $(b)) / 120, 0, 1);
    return {
      id: "health-gap",
      h: 140,
      n: d,
      x: k,
      grid: [{ y: 10 }, { y: $(u) }, { y: 130, strong: !0 }],
      labels: [{ y: 10, text: `${T(v)} mV` }, { y: $(u), text: `${T(u)} mV` }, { y: 130, text: "0" }],
      body: q`<defs>
            <linearGradient id=${C} gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2="130">
              <stop offset=${E} stop-color="#FF9230"></stop><stop offset=${E} stop-color="#30D158"></stop>
            </linearGradient>
            <linearGradient id=${C}-area x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.18"></stop><stop offset="1" stop-color="#fff" stop-opacity="0"></stop></linearGradient>
          </defs>
          <rect x="0" y=${$(u)} width=${ot} height=${j(130 - $(u))} style="fill:${y};fill-opacity:0.12"></rect>
          <path d=${Ze(g, k, $, 130)} fill="url(#${C}-area)"></path>
          <path d=${Rt(g, k, $)} fill="none" stroke="url(#${C})" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (L) => g[L] === void 0 ? void 0 : { y: $(g[L]), color: S(g[L]) },
      read: (L) => g[L] === void 0 ? `${B(L)} · ${_}` : `${B(L)} · ${f.difference} ${T(g[L])} mV · ${f.min} ${N(p[L], 3)} V · ${f.max} ${N(h[L], 3)} V`,
      from: s === 1 ? "−24 h" : `−${s} d`,
      to: this.t.bat.today,
      legend: m`<div class="bat-legend"><span><i class="swatch" style="background:${y};opacity:0.35"></i>${f.excellentZone(`${T(u)} mV`)}</span></div>`
    };
  }
  /** A line (and band) chart of the health rows (temperature, life) with an auto-scaled vertical axis. */
  healthChart(t, e, n) {
    if (t === "gap") return this.balanceChart(e, n);
    const i = e.entities.battery, o = `health:${n}`, s = this._batData[o];
    if (!s) return;
    const r = yt[n], l = s.at, d = l - r * Mt, c = Xe, p = (y) => this.batRows(o, "health", y), h = (y) => ut(p(y), "mean", d, l, c), g = (y) => j(y / (c - 1) * ot), x = (y) => this.back((1 - y / (c - 1)) * r * 24 * 60), u = r === 1 ? "−24 h" : `−${r} d`;
    let b;
    if (t === "temp") {
      const y = h(i.min_cell_temperature), A = h(i.max_cell_temperature), S = h(i.temperature);
      b = {
        low: y,
        high: A,
        line: S,
        minSpan: 6,
        colour: "var(--ed-sun)",
        text: (C) => `${T(C)} °C`,
        mid: (C) => `${T(C)} °C`,
        read: (C) => {
          const E = [y[C] === void 0 ? void 0 : `${this.t.bat.health.min} ${N(y[C], 1)}`, S[C] === void 0 ? void 0 : `${this.t.bat.health.battery.toLowerCase()} ${N(S[C], 1)}`, A[C] === void 0 ? void 0 : `${this.t.bat.health.max} ${N(A[C], 1)}`].filter(Boolean);
          return `${x(C)} · ${E.length ? `${E.join(" · ")} °C` : _}`;
        },
        legend: m`<div class="bat-legend"><span><i class="swatch" style="background:var(--ed-sun)"></i>${this.t.bat.health.rangeLegend}</span><span><i class="bar" style="background:var(--ed-sun)"></i>${this.t.bat.health.battery.toLowerCase()}</span></div>`
      };
    } else {
      const y = ut(p(i.total_discharge), "state", d, l, c, "last").map((A) => A === void 0 ? void 0 : A / e.num.battery.capacity);
      b = {
        low: y,
        high: y,
        line: y,
        minSpan: 1,
        colour: "var(--ed-battery)",
        text: (A) => T(A),
        mid: (A) => T(A),
        read: (A) => `${x(A)} · ${y[A] === void 0 ? _ : this.t.bat.health.cycles(N(y[A], 1))}`
      };
    }
    const v = Pi([...b.low, ...b.high], b.minSpan);
    if (!v) return;
    const $ = (y) => j(130 - (W(y, v.lo, v.hi) - v.lo) / (v.hi - v.lo) * 120), k = t === "life" ? "" : Hi(b.low, b.high, g, $), B = b.line ? Rt(b.line, g, $) : "", f = b.colour;
    return {
      id: `health-${t}`,
      h: 140,
      n: c,
      x: g,
      grid: [{ y: 10 }, { y: 70 }, { y: 130 }],
      labels: [{ y: 10, text: b.text(v.hi) }, { y: 70, text: b.mid((v.hi + v.lo) / 2) }, { y: 130, text: b.text(v.lo) }],
      body: q`<path d=${k} style="fill:${f};fill-opacity:0.22"></path><path d=${B} fill="none" style="stroke:${f}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`,
      dot: (y) => b.line?.[y] === void 0 ? void 0 : { y: $(b.line[y]), color: f },
      read: b.read,
      from: u,
      to: this.t.bat.today,
      legend: b.legend
    };
  }
  // ----------------------------------------------------------------- the detail
  /** The battery detail replaces the card page while it is open (a push, like in iOS), with Back and Done. */
  renderBatteryDetail(t, e) {
    const n = this.t, i = ["now", "hist", "health"].map((o) => ({ value: o, label: n.bat.tabs[o] }));
    return m`<section class="bat-detail" role="dialog" aria-modal="true" aria-label=${n.bat.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeBatteryDetail(!1)}>‹ ${n.bat.back}</button>
          <h2>${n.bat.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeBatteryDetail(!0)}>${n.bat.done}</button>
        </div>
        <ed-segmented .options=${i} .value=${this._batTab} label=${n.bat.tabsLabel} @hdk-select=${(o) => {
      this._batTab = o.detail.value;
    }}></ed-segmented>
        ${this._batTab === "now" ? this.renderBatteryNow(t, e) : this._batTab === "hist" ? this.renderBatteryHistory(t, e) : this.renderBatteryHealth(t, e)}
      </section>`;
  }
  renderRange(t) {
    const e = this.t, n = Ge.map((i) => ({ value: i, label: e.bat.ranges[i] }));
    return m`<ed-segmented .options=${n} .value=${this.batRange(t)} label=${e.bat.rangeLabel} @hdk-select=${(i) => this.setBatRange(i.detail.value)}></ed-segmented>`;
  }
  renderBatteryNow(t, e) {
    const n = this.t, i = t.entities.battery, o = e.soc, s = this.batState(e, t), r = this.batSigned(e), l = r === void 0 ? void 0 : Math.abs(r) * 1e3, d = "kW", c = R(this.hass, i.current), p = R(this.hass, i.voltage), h = l === void 0 ? void 0 : l / 1e3 / t.num.battery.capacity, g = s === "idle", x = s === "charging" ? n.pop.charging(Q(e.batIn ?? 0, d)) : s === "discharging" ? n.pop.discharging(Q(e.batDis ?? 0, d)) : s === "idle" ? n.bat.status.idle.toLowerCase() : n.noData, u = this.batEstimate(e, t), b = this.today(t), v = [
      { label: n.bat.live.power, value: l === void 0 ? _ : g ? "0 kW" : Q(l, d), sub: s === void 0 ? "" : n.bat.status[s] },
      { label: n.bat.live.current, value: c === void 0 ? _ : `${N(Math.abs(c), 1)} A`, sub: c === void 0 || g || s === void 0 ? "" : s === "charging" ? n.bat.live.chargeCurrent : n.bat.live.dischargeCurrent },
      { label: n.bat.live.voltage, value: p === void 0 ? _ : `${N(p, 1)} V`, sub: n.bat.live.ofBattery },
      { label: n.bat.live.load, value: h === void 0 ? _ : `${N(h, 2)} C`, sub: n.bat.live.loadSub }
    ], $ = b.bchg, k = b.bdis, B = $ !== void 0 && k !== void 0 ? $ - k : void 0, f = ["6h", "24h"].map((y) => ({ value: y, label: n.bat.spans[y] }));
    return m`<div class="bat-card">
          <div class="bat-card-head"><div><span class="bat-cap">${n.bat.level}</span><span class="bat-sub">${x}</span></div><span class="bat-huge">${o === void 0 ? _ : F(o)}</span></div>
          ${this.renderGauge(o, t, 32)}
          ${u ? m`<p class="bat-estimate plain">${u}</p>` : w}
        </div>
        <div class="bat-kpis">${v.map((y) => m`<div class="bat-kpi"><span class="sub">${y.label}</span><span class="val">${y.value}</span><span class="sub">${y.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${n.bat.levelChart}</span>
          <ed-segmented .options=${f} .value=${this._batSpan} label=${n.bat.spanLabel} @hdk-select=${(y) => {
      this._batSpan = y.detail.value, this._batScrub = { ...this._batScrub, level: 100 };
    }}></ed-segmented>
          ${this.renderChartOrEmpty(`day:${this._batSpan}`, 210, this.levelChart(t))}
        </div>
        <div class="bat-card">
          <span class="bat-cap">${n.bat.energyToday}</span>
          <div class="bat-two"><div><span class="sub">${n.bat.charged}</span><span class="val">${$ === void 0 ? _ : `${kt($)} kWh`}</span></div><div><span class="sub">${n.bat.discharged}</span><span class="val">${k === void 0 ? _ : `${kt(k)} kWh`}</span></div></div>
          <div class="bat-split" aria-hidden="true">${$ !== void 0 && k !== void 0 && $ + k > 0 ? m`${$ > 0 ? m`<i style="flex:${$.toFixed(3)} 1 0;background:var(--ed-battery)"></i>` : w}${k > 0 ? m`<i style="flex:${k.toFixed(3)} 1 0;background:var(--ed-discharge)"></i>` : w}` : w}</div>
          <p class="bat-sub">${B === void 0 ? _ : n.bat.netStored(`${B >= 0 ? "+" : "−"}${kt(Math.abs(B))} kWh`)}</p>
        </div>`;
  }
  renderBatteryHistory(t, e) {
    const n = this.t, i = t.entities.battery, o = this.batRange(t), s = `hist:${o}`, r = this.energyChart(t, o), l = r ? r.charged.reduce((S, C) => S + C, 0) : void 0, d = r ? r.discharged.reduce((S, C) => S + C, 0) : void 0, c = n.bat.kpi.over(o === "1d" ? "24 h" : n.bat.ranges[o].toLowerCase()), p = this._batData[s], h = yt[o], g = this.batRows(s, "level", i.state_of_charge), x = this.batRows(s, "level", i.power), u = Jt(g, "min") ? Math.min(...(g ?? []).map((S) => S.min).filter((S) => typeof S == "number")) : void 0, b = Jt(x, "max") || Jt(x, "min") ? Math.max(...(x ?? []).flatMap((S) => [S.max, S.min]).filter((S) => typeof S == "number").map((S) => Math.abs(S))) : void 0, v = `${N(t.num.battery.capacity, t.num.battery.capacity % 1 === 0 ? 0 : 1)} kWh`, $ = _, k = [
      { label: n.bat.charged, value: l === void 0 ? $ : `${N(l, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: n.bat.discharged, value: d === void 0 ? $ : `${N(d, o === "1d" ? 1 : 0)} kWh`, sub: c },
      { label: n.bat.kpi.efficiency, value: l && d !== void 0 ? F(N(d / l * 100, 1)) : $, sub: n.bat.kpi.efficiencySub },
      { label: n.bat.kpi.cycles, value: d === void 0 ? $ : N(d / t.num.battery.capacity, 1), sub: n.bat.kpi.cyclesSub(v) },
      { label: n.bat.kpi.lowest, value: u === void 0 ? $ : F(u), sub: n.bat.kpi.lowestSub },
      { label: n.bat.kpi.peak, value: b === void 0 ? $ : Q(b, "kW"), sub: n.bat.kpi.peakSub }
    ], f = ut(g, "mean", this.histWindow(o, p?.at ?? Date.now()).start, p?.at ?? Date.now(), Math.max(1, h * 24)).filter((S) => S !== void 0), y = [0, 20, 40, 60, 80, 100], A = y.slice(0, 5).map((S, C) => f.length ? Math.round(f.filter((E) => C === 4 ? E >= S : E >= S && E < y[C + 1]).length / f.length * 100) : void 0);
    return m`${this.renderRange(t)}
        <div class="bat-card"><span class="bat-cap">${o === "1d" ? n.bat.energyHours : n.bat.energyDays}</span>${this.renderChartOrEmpty(s, 200, r?.chart)}</div>
        <div class="bat-kpis">${k.map((S) => m`<div class="bat-kpi"><span class="sub">${S.label}</span><span class="val">${S.value}</span><span class="sub">${S.sub}</span></div>`)}</div>
        <div class="bat-card">
          <span class="bat-cap">${n.bat.bandsTitle}</span>
          ${A.map((S, C) => m`<div class="bat-band"><span class="name">${y[C]}–${y[C + 1]} %</span><span class="track"><i style="width:${S ?? 0}%;background:${C === 0 ? "var(--ed-warning)" : "var(--ed-battery)"}"></i></span><span class="pct">${S === void 0 ? _ : F(S)}</span></div>`)}
          <p class="bat-sub">${n.bat.bandsNote}</p>
        </div>`;
  }
  /** Text of an error or a warning entity: "" = none, undefined = no data. */
  batProblem(t) {
    const e = et(this.hass, t)?.state;
    if (!(e === void 0 || e === "unavailable" || e === "unknown"))
      return e === "" || e === "0" ? "" : e;
  }
  renderBatteryHealth(t, e) {
    const n = this.t, i = t.entities.battery, o = n.bat.health, s = this.batRange(t), r = (M) => R(this.hass, M), l = r(i.state_of_health), d = r(i.min_cell_voltage), c = r(i.max_cell_voltage), p = r(i.min_cell_temperature), h = r(i.max_cell_temperature), g = this.batProblem(i.error), x = this.batProblem(i.warning), u = ie(this.hass, i.total_charge), b = ie(this.hass, i.total_discharge), v = t.num.battery, $ = d !== void 0 && c !== void 0 ? (c - d) * 1e3 : void 0, k = $ === void 0 ? void 0 : $ <= v.imbalance_good ? "good" : $ <= v.imbalance_warn ? "ok" : $ <= v.imbalance_fault ? "warn" : "fault", B = k === "warn" || k === "fault" ? "var(--ed-warning)" : "var(--ed-pop-sec)", A = [l, d, c, p, h, e.soc].every((M) => M === void 0) && g === void 0 && x === void 0 ? { title: o.noData, sub: o.noDataSub, tone: "off", icon: "M5 12h14" } : g || x ? { title: g ? o.error(g) : o.warning(x), sub: o.problemSub, tone: "warn", icon: "M12 7v6M12 17h.01" } : { title: o.ok, sub: o.okSub, tone: "ok", icon: "M5 12.5l4.5 4.5L19 7.5" }, S = b === void 0 ? void 0 : b / v.capacity, C = [
      { key: "soh", label: o.capacity, value: l === void 0 ? _ : F(l), sub: l === void 0 ? n.noData : o.capacitySub(`${N(v.capacity * l / 100, 1)} kWh`, `${N(v.capacity, v.capacity % 1 === 0 ? 0 : 1)} kWh`), details: [] },
      { key: "gap", label: o.balance, value: $ === void 0 ? _ : `${T($)} mV`, word: k ? o.words[k] : void 0, sub: o.balanceSub, details: [] },
      {
        key: "temp",
        label: o.temperature,
        value: h === void 0 ? _ : `${T(h)} °C`,
        sub: h !== void 0 && p !== void 0 ? o.temperatureSub(`${T(h - p)} °C`) : n.noData,
        details: [
          [o.battery, i.temperature],
          [o.inverterAir, i.inverter_temperature_air],
          [o.inverterRadiator, i.inverter_temperature_radiator]
        ].filter(([, M]) => M).map(([M, z]) => ({ label: M, value: r(z) === void 0 ? _ : `${N(r(z), 1)} °C` }))
      },
      {
        key: "life",
        label: o.life,
        value: S === void 0 ? _ : o.cycles(T(S)),
        sub: u && b !== void 0 ? o.lifeSub(F(N(b / u * 100, 1))) : n.noData,
        details: [
          { label: o.totalCharged, value: u === void 0 ? _ : `${T(u)} kWh` },
          { label: o.totalDischarged, value: b === void 0 ? _ : `${T(b)} kWh` }
        ]
      }
    ], E = (M) => M ? Fi(this.hass, M) : void 0, L = [];
    if (i.mode && L.push({ label: o.mode, value: E(i.mode) ?? _ }), i.charge_limit && L.push({ label: o.chargeLimit, value: r(i.charge_limit) === void 0 ? _ : `${T(r(i.charge_limit))} A` }), i.discharge_limit && L.push({ label: o.dischargeLimit, value: r(i.discharge_limit) === void 0 ? _ : `${T(r(i.discharge_limit))} A` }), i.error || i.warning) {
      const M = [g, x].filter(Boolean).join(", ");
      L.push({ label: o.errors, value: g === void 0 && x === void 0 ? _ : M || o.none, warn: !!M });
    }
    return m`${this.renderRange(t)}
        <div class="bat-card row">
          <span class="bat-badge ${A.tone}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${A.icon}></path></svg></span>
          <div class="bat-col"><span class="bat-title ${A.tone}">${A.title}</span><span class="bat-sub">${A.sub}</span></div>
        </div>
        ${C.map((M) => {
      const z = M.key !== "soh" && this._batOpen === M.key, lt = z ? this.healthChart(M.key, t, s) : void 0;
      return m`<div class="bat-card flush">
            <button type="button" class="bat-row" ?disabled=${M.key === "soh"} aria-expanded=${M.key === "soh" ? w : z ? "true" : "false"}
              @click=${() => {
        M.key !== "soh" && (this._batOpen = z ? void 0 : M.key, this._batScrub = {});
      }}>
              <span class="bat-col"><span class="bat-label">${M.label}</span><span class="bat-sub">${M.sub}</span></span>
              <span class="bat-value">${M.value}</span>${M.word ? m`<span class="bat-word" style="color:${B}">${M.word}</span>` : w}
              ${M.key === "soh" ? w : m`<svg class="chev ${z ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>`}
            </button>
            ${z ? m`<div class="bat-body">
                  ${this.renderChartOrEmpty(`health:${s}`, 140, lt)}
                  ${M.details.length ? m`<div class="bat-list">${M.details.map((D) => m`<div class="bat-line"><span>${D.label}</span><b>${D.value}</b></div>`)}</div>` : w}
                </div>` : w}
          </div>`;
    })}
        ${L.length ? m`<div class="bat-card flush"><span class="bat-cap pad">${o.diagnostics}</span><div class="bat-list pad">${L.map((M) => m`<div class="bat-line"><span>${M.label}</span><b style="color:${M.warn ? "var(--ed-warning)" : "var(--ed-pop-sec)"}">${M.value}</b></div>`)}</div></div>` : w}`;
  }
};
function Fi(a, t) {
  const e = et(a, t)?.state;
  return e === void 0 || e === "" || e === "unavailable" || e === "unknown" ? void 0 : e;
}
function Wi(a, t = Lt) {
  const e = Math.round(Math.max(116, Math.min(132, a * 0.377))), n = 56, i = 6, o = Math.max(1, t.length), s = o * n + (o - 1) * i, r = Object.fromEntries(t.map((d, c) => [d, n / 2 + c * (n + i)])), l = Object.fromEntries(
    tt.map((d, c) => [d, o < 4 ? n / 2 + c * (n + i) : (c + 0.5) * s / tt.length])
  );
  return { width: a, tile: { w: e, h: n }, gap: i, height: s, left: l, right: r, xa: e - 8, xb: a - e + 8 };
}
const Z = (a) => a.toFixed(1);
function Vi(a, t, e) {
  const n = a.filter((u) => u.to in t.right);
  if (!n.length) return [];
  const i = (u) => {
    const b = /* @__PURE__ */ new Map();
    for (const v of n) b.set(v[u], (b.get(v[u]) ?? 0) + v.watts);
    return b;
  }, o = Math.max(...i("from").values(), ...i("to").values()), s = Math.min(e.maxPxPerKw / 1e3, 44 / o), r = (u) => Math.max(e.minPx, u.watts * s), l = /* @__PURE__ */ new Map();
  for (const u of tt) {
    const b = n.filter((v) => v.from === u).reduce((v, $) => v + r($), 0);
    l.set(u, t.left[u] - b / 2);
  }
  const d = /* @__PURE__ */ new Map();
  for (const u of Lt.filter((b) => b in t.right)) {
    const b = n.filter((v) => v.to === u).reduce((v, $) => v + r($), 0);
    d.set(u, t.right[u] - b / 2);
  }
  const c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
  for (const u of tt)
    for (const b of n.filter((v) => v.from === u).sort((v, $) => Lt.indexOf(v.to) - Lt.indexOf($.to)))
      c.set(b, l.get(u)), l.set(u, l.get(u) + r(b));
  for (const u of Lt.filter((b) => b in t.right))
    for (const b of n.filter((v) => v.to === u).sort((v, $) => tt.indexOf(v.from) - tt.indexOf($.from)))
      p.set(b, d.get(u)), d.set(u, d.get(u) + r(b));
  const { xa: h, xb: g } = t, x = (h + g) / 2;
  return n.map((u) => {
    const b = r(u), v = c.get(u), $ = v + b, k = p.get(u), B = k + b;
    return {
      from: u.from,
      to: u.to,
      watts: u.watts,
      thickness: b,
      d: `M${h} ${Z(v)} C${Z(x)} ${Z(v)} ${Z(x)} ${Z(k)} ${g} ${Z(k)} L${g} ${Z(B)} C${Z(x)} ${Z(B)} ${Z(x)} ${Z($)} ${h} ${Z($)} Z`,
      centre: `M${h} ${Z(v + b / 2)} C${Z(x)} ${Z(v + b / 2)} ${Z(x)} ${Z(k + b / 2)} ${g} ${Z(k + b / 2)}`
    };
  });
}
const P = {
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
}, te = 42, ee = 10, Ui = (a) => class extends a {
  onKey(t) {
    t.key === "Escape" && this._batDetail ? this.closeBatteryDetail(!0) : t.key === "Escape" && (this._pop || this._all) && (this._pop = void 0, this._all = !1);
  }
  // ----------------------------------------------------------------- alerts
  /** Deviations only (CURRENT_SPEC.md, Upozornění): a battery on its reserve and a house on the grid are not alerts. */
  alerts(t, e) {
    const n = this.t, i = t.entities.wallbox, o = [], s = e.carLink === "connected" || e.carLink === "charging", r = at(this.hass, i.block_charging) === "on", l = at(this.hass, i.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    return r ? o.push({ kind: "info", ...n.alerts.blocked }) : l && o.push({ kind: "warn", ...n.alerts.priorityWaiting }), at(this.hass, i.boost) === "on" && s && o.push({ kind: "warn", ...n.alerts.boostWallbox }), at(this.hass, t.entities.boiler.boost) === "on" && o.push({ kind: "warn", ...n.alerts.boostBoiler }), o;
  }
  renderAlerts(t, e) {
    const n = this.alerts(t, e);
    return n.length ? m`<section class="alerts" aria-labelledby="h-al">
        <h2 id="h-al" class="group-label">${this.t.alerts.heading}</h2>
        <ul class="group">
          ${n.map(
      (i) => m`<li class="alert ${i.kind}">
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${i.kind === "warn" ? P.alert : P.info}></path></svg></span>
              <span class="row-text"><span class="row-title">${i.title}</span><span class="alert-text">${i.text}</span></span>
            </li>`
    )}
        </ul>
      </section>` : w;
  }
  renderElectricity(t, e) {
    const n = e.summarySource ? `var(${rt[e.summarySource]})` : void 0;
    return m`<section class="panel" aria-labelledby="h-el">
        <div class="head click" @click=${() => this.openAll()}>
          <h2 id="h-el">
            <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._all ? "true" : "false"} @click=${(i) => {
      i.stopPropagation(), this.openAll();
    }}>
              ${t.titles.electricity ?? this.t.titles.electricity}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${P.chevron}></path></svg>
            </button>
          </h2>
          ${this.stateLine(e.summary, n)}
        </div>
        ${this.renderFlow(t, e)} ${this._all ? this.renderDayPopup(t, e) : w}
        ${this._pop || this._all ? m`<button type="button" class="scrim" aria-label=${this.t.close} @click=${() => this.closePop()}></button>` : w}
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
    const i = this.t, o = t.entities, s = t.num.scale, r = t.num.flows.idle_threshold, l = e.carLink, d = e.soc, c = d !== void 0 && d <= this.batteryReserve(t), p = (y) => d === void 0 ? void 0 : { f: d / 100, active: y, color: c ? "var(--ed-warning)" : "var(--ed-battery)", a1: c ? 0.5 : 0.58 }, h = (y) => `${i.tileSpoken.batteryState(y)}, ${d === void 0 ? i.noData : i.tileSpoken.chargeLevel(F(d))}${c ? `, ${i.tileSpoken.atReserve}` : ""}`, g = l === "connected" || l === "charging" || V(e.car, r), x = t.num.water.gauge_min, u = Math.max(t.num.water.gauge_max, R(this.hass, o.boiler.target_temperature) ?? 0), b = e.boilTemp, v = (y) => V(y, r), $ = e.loadShare.house, k = tt.filter((y) => $[y] >= 0.02), B = v(e.other) && k.length ? this.houseBackground(k, $, W((e.other ?? 0) / s.house, 0, 1)) : void 0, f = [
      { side: "L", key: "sun", name: i.tile.sun, watts: e.sun, k: (e.sun ?? 0) / s.sun, icon: P.sun, idleIcon: P.moon, idleText: i.idle.sun, aria: e.sun === void 0 ? i.noData : "" },
      { side: "L", key: "bat", name: i.tile.bat, watts: e.batDis, k: (e.batDis ?? 0) / s.battery, icon: P.battery, icon2: P.batteryDown, idleIcon: P.pause, idleText: i.idle.bat, level: p(v(e.batDis)), aria: h(!0) },
      { side: "L", key: "grid", name: i.tile.grid, watts: e.imp, k: (e.imp ?? 0) / s.grid, icon: P.grid, idleIcon: P.minus, idleText: i.idle.grid, aria: e.imp === void 0 ? i.noData : v(e.imp) ? i.tileSpoken.gridImport : "" },
      { side: "R", key: "house", name: i.tile.house, watts: e.other, k: (e.other ?? 0) / s.house, icon: P.home, idleIcon: P.minus, idleText: i.idle.house, background: B, aria: e.other === void 0 ? i.noData : i.tileSpoken.houseOther }
    ];
    if (this.carVisible(t, e)) {
      const y = g && e.carSoc !== void 0 ? { f: e.carSoc / 100, active: v(e.car), color: "var(--ed-car)", a1: 0.5 } : void 0;
      f.push({
        side: "R",
        key: "car",
        name: i.tile.car,
        watts: l === void 0 && e.car === void 0 ? void 0 : e.car ?? 0,
        k: (e.car ?? 0) / s.car,
        icon: P.car,
        idleIcon: l === "disconnected" ? P.minus : P.plug,
        idleText: l === "disconnected" ? i.idle.carDisconnected : l === void 0 ? i.idle.carNoState : i.idle.carConnected,
        level: y,
        aria: [l === void 0 && e.car === void 0 ? i.noData : v(e.car) ? i.tileSpoken.charging : "", g && e.carSoc !== void 0 ? i.tileSpoken.chargeLevel(F(e.carSoc)) : ""].filter(Boolean).join(", ")
      });
    }
    if (this.boilerVisible(t, e)) {
      const y = b === void 0 ? void 0 : { f: W((b - x) / (u - x), 0, 1), active: v(e.boil), color: "var(--ed-boiler)", a1: 0.5 };
      f.push({
        side: "R",
        key: "boil",
        name: i.tile.boil,
        watts: e.boil,
        k: (e.boil ?? 0) / s.boiler,
        icon: P.therm,
        idleIcon: P.pause,
        idleText: i.idle.boil,
        level: y,
        aria: [b === void 0 ? i.noData : i.tileSpoken.temperature(`${T(b)} °C`), v(e.boil) ? i.tileSpoken.heating : ""].filter(Boolean).join(", ")
      });
    }
    return f.push(
      { side: "R", key: "batIn", name: i.tile.batIn, watts: e.batIn, k: (e.batIn ?? 0) / s.battery, icon: P.battery, icon2: P.batteryBolt, idleIcon: P.pause, idleText: i.idle.batIn, level: p(v(e.batIn)), aria: h(!1) },
      { side: "R", key: "gridOut", name: i.tile.gridOut, watts: e.exp, k: (e.exp ?? 0) / s.grid, icon: P.grid, idleIcon: P.minus, idleText: i.idle.gridOut, aria: e.exp === void 0 ? i.noData : v(e.exp) ? i.tileSpoken.gridExport : "" }
    ), f;
  }
  renderFlow(t, e) {
    const n = t.num.flows.idle_threshold, i = ge(
      [e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil].map((c) => V(c, n) ? c : void 0),
      t.num.flows.kw_from
    ), o = this.tiles(t, e, i), s = Wi(this._width, o.filter((c) => c.side === "R").map((c) => c.key)), r = Vi(e.flows, s, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), l = (c) => q`<linearGradient id="rg-${c}" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style="stop-color:var(${rt[c]});stop-opacity:0.2"></stop>
          <stop offset="0.14" style="stop-color:var(${rt[c]});stop-opacity:0.88"></stop>
          <stop offset="0.86" style="stop-color:var(${rt[c]});stop-opacity:0.88"></stop>
          <stop offset="1" style="stop-color:var(${rt[c]});stop-opacity:0.2"></stop>
        </linearGradient>`, d = this._pop ? o.find((c) => c.key === this._pop) : void 0;
    return m`<div class="flow" role="group" aria-label=${this.t.flowLabel} style="height:${s.height}px">
        <svg width=${s.width} height=${s.height} viewBox="0 0 ${s.width} ${s.height}" aria-hidden="true">
          <defs>${tt.map(l)}</defs>
          ${r.map(
      (c) => q`<g>
              <path d=${c.d} fill="url(#rg-${c.from})"></path>
              <path class="dots" d=${c.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, c.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(c.watts / 1e3, 10))).toFixed(2)}s"></path>
            </g>`
    )}
        </svg>
        ${o.map((c) => this.renderTile(c, s, i, t))} ${d ? this.renderTilePopup(d, s, t, e, i) : w}
      </div>`;
  }
  houseBackground(t, e, n) {
    const i = t.reduce((d, c) => e[c] > e[d] ? c : d), o = `linear-gradient(${Pt(`var(${rt[i]})`, Math.round(te + ee * n))}, ${Pt(`var(${rt[i]})`, Math.round(te + ee * n))}), var(--ed-tile)`;
    if (t.length === 1) return o;
    const s = t.reduce((d, c) => d + e[c], 0);
    let r = 0;
    const l = [];
    return t.forEach((d, c) => {
      const p = r / s * 100;
      r += e[d];
      const h = r / s * 100, g = `var(${rt[d]})`, x = c === 0 ? `${p}%` : `calc(${p}% + 1px)`, u = c === t.length - 1 ? `${h}%` : `calc(${h}% - 1px)`;
      c > 0 && l.push(`transparent calc(${p}% - 1px) calc(${p}% + 1px)`), l.push(`${g} ${x} ${u}`);
    }), `linear-gradient(90deg, ${l.join(", ")}) bottom / 100% 4px no-repeat, ${o}`;
  }
  tileBackground(t, e, n) {
    const i = `var(${Fe[t.key]})`, o = t.level;
    if (o) {
      const s = W(o.f, 0, 1), r = `${(s * 100).toFixed(1)}%`, l = o.active ? Pt(o.color, Math.round(o.a1 * 100)) : "var(--ed-fill-idle)", d = o.active ? ve(o.color, 14) : "var(--ed-tile)";
      return s < 5e-3 ? o.active ? `linear-gradient(${d}, ${d}), var(--ed-tile)` : void 0 : `linear-gradient(90deg, ${l} 0%, ${l} ${r}, ${d} ${r}, ${d} 100%), var(--ed-tile)`;
    }
    if (t.background) return t.background;
    if (e) {
      const s = Pt(i, Math.round(te + ee * n));
      return `linear-gradient(${s}, ${s}), var(--ed-tile)`;
    }
  }
  renderTile(t, e, n, i) {
    const o = t.watts === void 0, s = V(t.watts, i.num.flows.idle_threshold), r = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], d = W(t.k, 0, 1), c = o ? _ : Q(t.watts, n), p = this.tileBackground(t, s, d), h = `left:${r}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${Fe[t.key]});--gr:${(2 + 9 * d).toFixed(1)}px;--ga:${Math.round(30 + 60 * d)}%${p ? `;background:${p}` : ""}`;
    return m`<button
        type="button"
        class="tile ${s ? "on" : "idle"} ${t.key === "bat" || t.key === "batIn" ? "battery" : ""}"
        data-tile=${t.key}
        style=${h}
        aria-haspopup="dialog"
        aria-expanded=${this._pop === t.key ? "true" : "false"}
        aria-label=${[`${t.name} ${s ? c : o ? _ : t.idleText}`, t.aria].filter(Boolean).join(", ")}
        @click=${() => this.openTile(t.key)}
      >
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d=${s ? t.icon : t.idleIcon}></path>${s && t.icon2 ? q`<path class="icon2" d=${t.icon2}></path>` : w}
        </svg>
        <span class="text">
          <span class="name">${t.name}</span>
          <span class="value" aria-hidden="true">${s ? c : o ? _ : t.idleText}</span>
        </span>
      </button>`;
  }
  openTile(t) {
    this._all = !1, this._pop = this._pop === t ? void 0 : t;
  }
  renderTilePopup(t, e, n, i, o) {
    if (t.key === "bat" || t.key === "batIn") return this.renderBatteryPopup(t, e, n, i, o);
    const s = this.t, r = n.num.flows.idle_threshold, l = this.today(n), d = (z) => z === void 0 ? _ : `${kt(z)} kWh`, c = (z) => z === void 0 ? _ : Q(z, o), p = (z) => V(z, r), h = i.soc, g = h !== void 0 && h <= this.batteryReserve(n), x = (z) => ({
      title: z ? s.tile.bat : s.tile.batIn,
      now: z ? p(i.batDis) ? s.pop.discharging(c(i.batDis)) : i.batDis === void 0 && h === void 0 ? _ : s.idle.bat : p(i.batIn) ? s.pop.charging(c(i.batIn)) : i.batIn === void 0 && h === void 0 ? _ : s.idle.batIn,
      level: h === void 0 ? void 0 : { label: s.pop.level, text: F(h), percent: h, color: g ? "var(--ed-warning)" : "var(--ed-battery)", note: g ? s.pop.atReserve : "" },
      rows: z ? [{ label: s.pop.rows.discharged, value: d(l.bdis) }] : [{ label: s.pop.rows.charged, value: d(l.bchg) }]
    }), u = (z) => ({
      title: z ? s.tile.gridOut : s.tile.grid,
      now: z ? p(i.exp) ? s.pop.exporting(c(i.exp)) : i.exp === void 0 ? _ : s.idle.gridOut : p(i.imp) ? s.pop.importing(c(i.imp)) : i.imp === void 0 ? _ : s.idle.grid,
      rows: z ? [{ label: s.pop.rows.exported, value: d(l.gout) }] : [{ label: s.pop.rows.imported, value: d(l.gin) }]
    }), b = i.carLink, v = i.boilTemp, $ = n.num.water.gauge_min, k = Math.max(n.num.water.gauge_max, R(this.hass, n.entities.boiler.target_temperature) ?? 0), f = {
      sun: { title: s.tile.sun, now: p(i.sun) ? c(i.sun) : i.sun === void 0 ? _ : s.idle.sun, rows: [{ label: s.pop.rows.produced, value: d(l.pv) }] },
      bat: x(!0),
      batIn: x(!1),
      grid: u(!1),
      gridOut: u(!0),
      house: { title: s.tile.house, now: p(i.other) ? c(i.other) : i.other === void 0 ? _ : s.idle.house, rows: [{ label: s.pop.rows.consumed, value: d(l.house) }] },
      car: {
        title: s.tile.car,
        now: p(i.car) ? s.pop.charging(c(i.car)) : b === "connected" || b === "charging" ? s.pop.carConnectedIdle : b === "disconnected" ? s.idle.carDisconnected : _,
        level: i.carSoc !== void 0 && (b === "connected" || b === "charging") ? { label: s.pop.level, text: F(i.carSoc), percent: i.carSoc, color: "var(--ed-car)", note: "" } : void 0,
        rows: [{ label: s.pop.rows.carCharged, value: d(l.car) }]
      },
      boil: {
        title: s.tile.boil,
        now: p(i.boil) ? s.pop.heating(c(i.boil)) : i.boil === void 0 ? _ : s.idle.boil,
        level: v === void 0 ? void 0 : { label: s.pop.temperature, text: `${T(v)} °C`, percent: W((v - $) / (k - $) * 100, 0, 100), color: "var(--ed-boiler)", note: "" },
        rows: [{ label: s.pop.rows.boilerHeated, value: d(l.boil) }]
      }
    }[t.key], y = 236, A = t.side === "L" ? e.tile.w / 2 : e.width - e.tile.w / 2, S = t.side === "L" ? e.left[t.key] : e.right[t.key], C = S - e.tile.h / 2, E = S < e.height / 2, L = W(A - y / 2, 0, e.width - y), M = E ? `top:${(C + e.tile.h + 8).toFixed(0)}px` : `bottom:${(e.height - C + 8).toFixed(0)}px`;
    return m`<div class="pop" role="dialog" aria-label=${f.title} tabindex="-1" style="left:${L.toFixed(0)}px;${M};width:${Math.min(y, e.width)}px">
        <i class="arrow ${E ? "up" : "down"}" aria-hidden="true" style="left:${(A - L - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${f.title}</span><span class="pop-now">${f.now}</span></div>
        ${f.level ? m`<div class="pop-level">
              <div class="pop-level-row">
                <span class="pop-label">${f.level.label}${f.level.note ? m`<span class="note"> ${f.level.note}</span>` : w}</span>
                <span class="pop-big" style="color:${f.level.note ? "var(--ed-warning)" : "var(--ed-text)"}">${f.level.text}</span>
              </div>
              <div class="segs" aria-hidden="true">${ba(f.level.percent).map((z) => m`<span><i style="width:${z.toFixed(0)}%;background:${f.level.color}"></i></span>`)}</div>
            </div>` : w}
        <div class="pop-rows">${f.rows.map((z) => m`<div class="pop-row"><span>${z.label}</span><b>${z.value}</b></div>`)}</div>
      </div>`;
  }
  /** The big popup of the heading: today's totals of everything (sources = consumption, the house is the rest). */
  renderDayPopup(t, e) {
    const n = this.t, i = this.today(t), o = (h) => h === void 0 ? _ : kt(h), s = [i.pv, i.bdis, i.gin], r = s.every((h) => h !== void 0) ? s.reduce((h, g) => h + g, 0) : void 0, l = i.house === void 0 ? void 0 : i.house + i.car + i.boil + i.bchg + i.gout, d = [
      { label: n.tile.sun, color: "var(--ed-sun)", value: i.pv },
      { label: n.pop.fromBattery, color: "var(--ed-battery)", value: i.bdis },
      { label: n.pop.fromGrid, color: "var(--ed-grid)", value: i.gin }
    ], c = [
      { label: n.tile.house, color: "var(--ed-house)", value: i.house },
      { label: n.tile.car, color: "var(--ed-car)", value: i.car },
      { label: n.tile.boil, color: "var(--ed-boiler)", value: i.boil },
      { label: n.pop.toBattery, color: "var(--ed-battery)", value: i.bchg },
      { label: n.tile.gridOut, color: "var(--ed-grid)", value: i.gout }
    ], p = (h, g, x) => m`<div role="list" aria-label=${h} class="day-col">
        <div class="day-total"><span>${h}</span><b>${o(g)}</b></div>
        ${x.map((u) => m`<div role="listitem" class="day-item"><i style="background:${u.color}" aria-hidden="true"></i><span>${u.label}</span><b>${o(u.value)}</b></div>`)}
      </div>`;
    return m`<div class="pop day" role="dialog" aria-labelledby="day-h" tabindex="-1">
        <i class="arrow up" aria-hidden="true" style="left:30px"></i>
        <h3 id="day-h">${n.pop.day} <span>· kWh</span></h3>
        <div class="day-cols">${p(n.pop.sources, r, d)} ${p(n.pop.consumption, l, c)}</div>
      </div>`;
  }
}, Gi = (a) => class extends a {
  constructor() {
    super(...arguments), this._carGesture = new ue(() => ({
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
    const n = this.t, i = t.entities, o = t.num.flows, s = t.num.car.charge_limit, r = e.carLink, l = V(e.car, o.idle_threshold) && r !== "disconnected", d = ca(e.loadShare.car, o, n), c = this.sourceColor(d), p = at(this.hass, i.wallbox.block_charging) === "on", h = this.shown(i.wallbox.boost), g = at(this.hass, i.wallbox.prioritize_connected) === "on" && r === "connected" && !p && (e.sun ?? 0) > t.num.wallbox.priority_min_sun;
    let x, u;
    l ? (x = `${n.car.charging(d.text)}${h === "on" ? ` · ${n.boostOptions.on}` : ""}`, u = c) : r === "connected" || r === "charging" ? (x = n.car.connectedIdle, u = g ? "var(--ed-warning)" : void 0) : r === "disconnected" && (x = n.car.disconnected);
    const b = ve(u ?? "#d8d8dc", u ? 42 : 28), v = et(this.hass, i.car.image)?.attributes?.entity_picture, $ = e.carSoc, k = ge([V(e.car, o.idle_threshold) ? e.car : void 0], o.kw_from), B = s < 100, f = n.car.chargeLevel($ === void 0 ? n.noData : F($), B ? F(s) : void 0), y = i.wallbox, A = h === "on" ? "on" : h === "off" ? "off" : "", S = this.boostOptions, C = h === "on" ? n.car.modeBoost : h === "off" ? n.car.modeSurplus : _;
    return m`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, t.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${t.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${b}, transparent)"></div><div class="shadow"></div>
            ${typeof v == "string" && v ? m`<img src=${v} alt="" />` : w}
          </div>
          ${t.carLink ? m`<div class="car-art car-hitbox" style="transform:scale(${t.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${n.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(E) => E.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? m`<div class="car-hint" aria-hidden="true">${n.hint.holdOrDouble}</div>` : w}` : w}
          <div class="head"><h2 id="h-car">${t.titles.car ?? n.titles.car}</h2>${this.stateLine(x, u)}</div>
          <div class="car-soc">
            <span class="soc">${$ === void 0 ? _ : T($)}<small>${this._i18n.percent("")}</small>${$ === void 0 ? m`<span class="sr-only">${n.noData}</span>` : w}</span>
            <span class="range">${n.car.range} <b>${e.carRange === void 0 ? _ : `${T(e.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${f}>
            ${ba(W($ ?? 0, 0, 100)).map((E) => m`<span><i style="width:${E.toFixed(1)}%"></i></span>`)}
            ${B ? m`<div class="limit" style="left:${Ue(s)}"></div>` : w}
          </div>
          ${B ? m`<div class="meter-label" aria-hidden="true"><span style="left:${Ue(s)}">${n.car.limit(F(s))}</span></div>` : w}
        </div>
        ${l ? this.renderCarSources(e, o, Q(e.car ?? 0, k)) : w}
        ${y.boost ? m`<div class="mode">
              <div class="mode-head"><span id="mode-l">${n.car.mode}</span><span class="mode-sub ${h === "on" ? "warn" : ""}">${C}</span></div>
              <ed-segmented
                guarded .options=${S} .value=${A} label=${n.car.modeLabel} .hint=${n.hint.holdDragOrDouble} ?disabled=${h === void 0}
                .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                @hdk-select=${(E) => this.setBoost("wallbox", E.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(t, h === "on")}
            </div>` : w}
        ${this.carVisible(t, e) ? this.renderWallboxGroup(t, e, l, c, k) : w}
      </section>`;
  }
  renderCarSources(t, e, n) {
    const i = this.t, o = i.source, s = t.loadShare.car, r = tt.filter((c) => s[c] > 4e-3), l = Ei(r.map((c) => s[c])), d = (c) => c === "grid" && s.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${rt[c]})`;
    return m`<div class="mix">
        <div class="mix-head"><span>${i.car.sourcesTitle}</span><span>${n}</span></div>
        <div class="mix-bar" aria-hidden="true">${r.map((c) => m`<div style="flex:${s[c]} 1 0;background:${d(c)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${i.car.sourcesLabel}>
          ${r.map((c, p) => m`<span><i style="background:${d(c)}"></i>${o[c]}<em>${F(l[p])}</em></span>`)}
        </p>
      </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPowerFold(t, e) {
    const n = t.entities.wallbox.charging_power;
    if (!n) return w;
    const { phases: i, power_min: o, power_max: s, power_step: r } = t.num.wallbox, l = et(this.hass, n), d = R(this.hass, n), c = d === void 0 ? void 0 : d * i / 1e3;
    let p = o / 1e3, h = s / 1e3;
    const g = ct(l, "min"), x = ct(l, "max");
    return g !== void 0 && (p = Math.max(p, g * i / 1e3)), x !== void 0 && (h = Math.min(h, x * i / 1e3)), m`<div class="fold ${e ? "open" : ""}" ?inert=${!e}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${c === void 0 ? _ : T(c, 1)}<small> kW</small></span>
          <ed-slider
            .min=${p} .max=${h} .step=${r / 1e3} .value=${c ?? p}
            label=${this.t.car.powerLabel} valueText=${c === void 0 ? this.t.noData : `${T(c, 1)} kW`}
            minLabel="${T(p, 1)} kW" maxLabel="${T(h, 1)} kW"
            ?disabled=${c === void 0}
            @hdk-change=${(u) => this.setNumber(n, Math.round(u.detail.value * 1e3 / i), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
  }
  renderWallboxGroup(t, e, n, i, o) {
    const s = this.t, r = t.entities.wallbox, l = !!this._open.wallbox, d = !!(r.block_charging || r.prioritize_connected), c = e.carLink, p = n ? m`<span>${s.wallbox.charging} </span><b style="--c:${i}">${Q(e.car ?? 0, o)}</b>` : c === "connected" || c === "charging" ? m`${s.wallbox.idle}` : c === "disconnected" ? m`${s.wallbox.disconnected}` : m`${_}`, h = t.entities.car.state_of_charge, g = R(this.hass, h) === void 0 ? void 0 : si(et(this.hass, h)?.last_updated, this._now, s), x = this.shown(r.block_charging), u = this.shown(r.prioritize_connected);
    return m`<ul class="group">
        <li class=${l ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${l ? "true" : "false"} ?disabled=${!d} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${n ? `--bc:${i}` : ""}><svg viewBox="0 0 24 24"><path d=${P.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${s.wallbox.title}</span><span class="row-sub">${p}</span></span>
            <span class="row-aside">${g ? s.wallbox.fromCar(g) : ""}</span>
            ${d ? m`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${P.expand}></path></svg>` : m`<span></span>`}
          </button>
          ${d ? m`<div class="fold ${l ? "open" : ""}" ?inert=${!l}><div>
                ${r.block_charging ? this.switchRow(s.wallbox.block, r.block_charging, x === "on" ? s.wallbox.blockOn : s.wallbox.blockOff, x === "on") : w}
                ${r.prioritize_connected ? this.switchRow(s.wallbox.priority, r.prioritize_connected, u === "on" ? s.wallbox.priorityOn : s.wallbox.priorityOff, !1) : w}
              </div></div>` : w}
        </li>
      </ul>`;
  }
}, It = 45, vt = 46, Zi = 62, Ki = 58;
function ae(a, t) {
  let e = 1;
  for (; e < a.length - 1 && t > a[e].temp; ) e++;
  const n = a[e - 1], i = a[e], o = Math.max(0, Math.min(1, (t - n.temp) / (i.temp - n.temp))), s = (d) => [1, 3, 5].map((c) => parseInt(d.slice(c, c + 2), 16)), r = s(n.color), l = s(i.color);
  return `rgb(${[0, 1, 2].map((d) => Math.round(r[d] + (l[d] - r[d]) * o)).join(",")})`;
}
const At = (a, t) => {
  const e = (135 + 270 * a) * Math.PI / 180;
  return [Zi + t * Math.cos(e), Ki + t * Math.sin(e)];
}, Yi = (a, t) => {
  const [e, n] = At(a, vt), [i, o] = At(t, vt);
  return `M${e.toFixed(2)} ${n.toFixed(2)} A${vt} ${vt} 0 0 1 ${i.toFixed(2)} ${o.toFixed(2)}`;
};
function qi(a, t, e, n) {
  const i = a === void 0 ? 0 : Math.max(0, Math.min(1, (a - t) / (e - t))), o = "var(--ed-gauge-track)", s = Array.from({ length: It }, (g, x) => {
    const u = (x + 0.5) / It, b = a !== void 0 && u <= i ? ae(n, t + u * (e - t)) : o;
    return q`<path d=${Yi(x / It, Math.min(1, (x + 1) / It + 4e-3))} fill="none" stroke=${b} stroke-width="10"></path>`;
  }), [r, l] = At(0, vt), [d, c] = At(1, vt), [p, h] = At(i, vt);
  return q`<svg viewBox="0 0 124 112" width="108" height="98" aria-hidden="true">
    ${s}
    <circle cx=${r.toFixed(1)} cy=${l.toFixed(1)} r="5" fill=${a !== void 0 && i > 0 ? ae(n, t) : o}></circle>
    <circle cx=${d.toFixed(1)} cy=${c.toFixed(1)} r="5" fill=${a !== void 0 && i >= 0.99 ? ae(n, e) : o}></circle>
    ${a === void 0 ? null : q`<circle class="knob" cx=${p.toFixed(1)} cy=${h.toFixed(1)} r="6.5" fill="#ffffff" stroke="var(--ed-tile)" stroke-width="2.5"></circle>`}
  </svg>`;
}
const Xi = (a) => class extends a {
  renderWater(t, e) {
    const n = this.t, i = t.entities, o = t.num.flows, s = V(e.boil, o.idle_threshold), r = ca(e.loadShare.boil, o, n), l = this.sourceColor(r), c = this.shown(i.boiler.boost) === "on", p = ge([s ? e.boil : void 0], o.kw_from);
    let h;
    return s ? h = `${n.water.boilerHeats(r.text)}${c ? ` · ${n.boostOptions.on}` : ""}` : e.boil !== void 0 && (h = n.water.noHeating), m`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${t.titles.water ?? n.titles.water}</h2>${this.stateLine(h, s ? l : void 0)}</div>
        <div class="water">
          ${this.renderBoilerTile(t, e, s, l, p)} ${this.renderMixing(t)} ${this.renderTankTile(t)}
        </div>
      </section>`;
  }
  /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
  gauge(t, e, n, i, o) {
    return m`<div class="arc" role="img" aria-label=${o}>
        ${qi(t, e, n, i.tempScale)}
        <div class="arc-num"><b>${t === void 0 ? _ : T(t)}</b>${t === void 0 ? m`<span class="sr-only">${this.t.noData}</span>` : m`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${T(e)}</span><span class="arc-max" aria-hidden="true">${T(n)}</span>
      </div>`;
  }
  renderBoilerTile(t, e, n, i, o) {
    const s = this.t, r = t.entities.boiler;
    t.num.boiler;
    const l = this.shown(r.boost), d = l === "on", c = R(this.hass, r.target_temperature), p = R(this.hass, r.boost_target_temperature), h = d ? p : c, g = t.num.water.gauge_min, x = Math.max(t.num.water.gauge_max, c ?? 0), u = e.boilTemp, b = !!this._open.targets, v = !!(r.target_temperature || r.boost_target_temperature), $ = s.water.boilerLabel(
      u === void 0 ? s.noData : `${T(u)} °C`,
      n ? s.water.heatingWith(Q(e.boil, o)) : s.water.notHeating,
      h === void 0 ? void 0 : `${T(h)} °C`,
      T(g),
      `${T(x)} °C`
    );
    return m`<div class="source">
        <div class="source-top">
          ${this.gauge(u, g, x, t, $)}
          <div class="source-body">
            <div>
              <div class="source-title">${s.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${n ? i : "var(--ed-secondary)"}">${n ? Q(e.boil, o) : e.boil === void 0 ? _ : s.water.notHeating}</span>${h === void 0 ? w : m` <span class="dim">· ${s.water.target(`${T(h)} °C`)}</span>`}
              </div>
            </div>
            ${r.boost ? m`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${l ?? ""} label=${s.water.boostMode} .hint=${s.hint.holdDragOrDouble} ?disabled=${l === void 0}
                  .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
                  @hdk-select=${(k) => this.setBoost("boiler", k.detail.value === "on")}
                ></ed-segmented>` : w}
          </div>
        </div>
        ${v ? m`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${b ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${s.water.targets}</span>
                <span class="rowbtn-value">${s.water.targetFlow} <b>${c === void 0 ? _ : T(c)}</b> · ${s.water.targetBoost} <b>${p === void 0 ? _ : `${T(p)} °C`}</b></span>
                <svg class="chevron ${b ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${P.expand}></path></svg>
              </button>
              <div class="fold ${b ? "open" : ""}" ?inert=${!b}><div>${this.renderTargets(t, c, p)}</div></div>
            </div>` : w}
      </div>`;
  }
  /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
  renderTargets(t, e, n) {
    const i = this.t, o = t.entities.boiler, s = t.num.boiler, r = (l, d, c, p, h, g) => {
      if (!l) return w;
      const x = et(this.hass, l);
      let u = s.target_min, b = s.target_max;
      const v = ct(x, "min"), $ = ct(x, "max");
      return v !== void 0 && (u = Math.max(u, v)), $ !== void 0 && (b = Math.min(b, $)), h !== void 0 && (u = Math.max(u, h)), g !== void 0 && (b = Math.min(b, g)), m`<div class="field">
          <span class="field-label">${c}<span class="hint">${p}</span></span><span class="field-value">${d === void 0 ? _ : T(d)}<small> °C</small></span>
          <ed-slider
            .min=${u} .max=${b} .step=${s.target_step} .value=${d ?? u}
            label=${i.water.targetSliderLabel(c)} valueText=${d === void 0 ? i.noData : i.water.targetSliderSpoken(`${d} °C`, c)}
            minLabel="${T(u)} °C" maxLabel="${T(b)} °C"
            ?disabled=${d === void 0}
            @hdk-change=${(k) => this.setNumber(l, k.detail.value, i.water.targetWhat(c))}
          ></ed-slider>
        </div>`;
    };
    return m`<div class="detail">
        ${r(o.target_temperature, e, i.water.targetFlow, i.water.targetFlowHint, n, void 0)}
        ${r(o.boost_target_temperature, n, i.water.targetBoost, i.water.targetBoostHint, void 0, e)}
        <p class="hint">${i.water.targetsRule}</p>
      </div>`;
  }
  /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
  renderMixing(t) {
    const e = t.entities.mixing;
    if (!e.valve_c1 && !e.valve_c2) return w;
    const n = ci(this.shown(e.valve_c1), this.shown(e.valve_c2)), i = n === "on", o = !!(e.valve_c1 && e.valve_c2), s = n === "unclear" ? this.t.water.mixingUnclear : n === void 0 ? this.t.noData : "";
    return m`
        <div class="link ${i ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${i ? t.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${i ? t.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${i ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${s ? m`<span class="mixcap-note">${s}</span>` : w}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${i} ?disabled=${n === void 0 || !o}
            .holdMs=${t.num.ui.hold_ms} .doubleTapMs=${t.num.ui.double_tap_ms} .hintSeconds=${t.num.ui.hint_seconds}
            @hdk-toggle=${(r) => this.setMixing(r.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${i ? "on" : ""}" aria-hidden="true"></div>`;
  }
  renderTankTile(t) {
    const e = this.t, n = t.entities.tank, i = t.num.tank, o = n.water_heater, s = et(this.hass, o), r = this.shown(o), l = r === "off", d = r === "heat", c = ct(s, "temperature"), p = this._tankTemp, h = p && p.id === o ? p.value : c, g = t.num.water.gauge_min, x = Math.max(t.num.water.gauge_max, R(this.hass, t.entities.boiler.target_temperature) ?? 0), u = l ? i.temp_min : h, b = Array.isArray(s?.attributes?.operation_list) ? s.attributes.operation_list : Object.keys(e.tank.modes), v = Object.keys(e.tank.modes).filter((C) => b.includes(C)).map((C) => ({ value: C, label: e.tank.modes[C] })), $ = !!this._open.tank, { min: k, max: B } = this.tankRange(t), f = r === void 0 ? _ : e.tank.modes[r] ?? r, y = l ? e.tank.keepsMinimum : d ? e.tank.setManually : e.tank.byPlan, A = u === void 0 ? _ : l ? e.tank.summaryOff(`${T(i.temp_min)} °C`) : (d ? e.tank.summaryManual : e.tank.summaryPlan)(`${T(u)} °C`), S = e.tank.label(
      u === void 0 ? e.tank.settingNoData : l ? e.tank.settingOff(`${T(i.temp_min)} °C`) : e.tank.settingSet(`${T(u)} °C`),
      f,
      T(g),
      `${T(x)} °C`
    );
    return m`<div class="source">
        <div class="source-top">
          ${this.gauge(u, g, x, t, S)}
          <div class="source-body">
            <div>
              <div class="source-title">${e.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${d ? "var(--ed-text)" : "var(--ed-secondary)"}">${f}</span>${r === void 0 ? w : m` <span class="dim">· ${y}</span>`}</div>
            </div>
            ${o ? m`<ed-segmented compact .options=${v} .value=${r ?? ""} label=${e.tank.modeLabel} ?disabled=${r === void 0} @hdk-select=${(C) => this.setTank(o, C.detail.value)}></ed-segmented>` : w}
          </div>
        </div>
        ${o ? m`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${$ ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${e.tank.temperature}</span>
                <span class="rowbtn-value">${A}</span>
                <svg class="chevron ${$ ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${P.expand}></path></svg>
              </button>
              <div class="fold ${$ ? "open" : ""}" ?inert=${!$}><div>
                <div class="detail">
                  <div class="field ${l ? "off" : ""}">
                    <span class="field-label">${e.tank.temperature}<span class="hint">${l ? e.tank.hintOff : d ? e.tank.hintManual : e.tank.hintPlan}</span></span>
                    <span class="field-value">${u === void 0 ? _ : T(u)}<small> °C</small></span>
                    <ed-slider
                      .min=${k} .max=${B} .step=${i.temp_step} .tickStep=${5} .value=${u ?? k}
                      label=${e.tank.sliderLabel} valueText=${h === void 0 ? e.noData : e.tank.sliderSpoken(`${h} °C`)}
                      minLabel="${T(k)} °C" maxLabel="${T(B)} °C"
                      ?disabled=${h === void 0 || l}
                      @hdk-change=${(C) => this.setTankTemperature(o, C.detail.value, r)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>` : w}
      </div>`;
  }
}, we = class we extends Xi(Gi(Ui(Ni(zi(G))))) {
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return w;
    const e = li(this.hass, t, this.t), n = t.colors, i = `--ed-sun:${n.sun};--ed-battery:${n.battery};--ed-grid:${n.grid};--ed-house:${n.house};--ed-car:${n.car};--ed-boiler:${n.boiler};--ed-discharge:${n.discharge};--ed-accent:${n.accent};--ed-warning:${n.warning};--ed-off:${n.neutral}`;
    return this._batDetail ? m`<div class="page" style=${i} @keydown=${this.onKey}>${this.renderBatteryDetail(t, e)}</div>` : m`<div class="page" style=${i} @keydown=${this.onKey}>
      ${t.title === "" ? w : m`<h1>${t.title ?? this.t.title}</h1>`} ${this.renderAlerts(t, e)} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)}
      ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
};
we.styles = hi;
let se = we;
Na("ed");
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", se);
window.customCards = window.customCards ?? [];
window.customCards.some((a) => a.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  // The card picker has no `hass` yet: the language Home Assistant set on the page.
  description: Ut(Ga()).t.cardDescription,
  preview: !1
});
console.info("%c ENERGIE-DASHBOARD %c 0.1.0 · 2026-10-30 07:40 UTC · po 97abdb2 ", "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
