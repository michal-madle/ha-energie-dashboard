const pt = globalThis, Mt = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Et = /* @__PURE__ */ Symbol(), Rt = /* @__PURE__ */ new WeakMap();
let Jt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Et) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Mt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Rt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Rt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (o) => new Jt(typeof o == "string" ? o : o + "", void 0, Et), gt = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce((i, s, n) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + o[n + 1], o[0]);
  return new Jt(e, o, Et);
}, le = (o, t) => {
  if (Mt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), s = pt.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, o.appendChild(i);
  }
}, Bt = Mt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ae(e);
})(o) : o;
const { is: ce, defineProperty: de, getOwnPropertyDescriptor: pe, getOwnPropertyNames: he, getOwnPropertySymbols: ue, getPrototypeOf: be } = Object, vt = globalThis, Vt = vt.trustedTypes, fe = Vt ? Vt.emptyScript : "", ge = vt.reactiveElementPolyfillSupport, st = (o, t) => o, bt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? fe : null;
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
} }, Lt = (o, t) => !ce(o, t), Ut = { attribute: !0, type: String, converter: bt, reflect: !1, useDefault: !1, hasChanged: Lt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), vt.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let J = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ut) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = /* @__PURE__ */ Symbol(), s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && de(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: s, set: n } = pe(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: s, set(r) {
      const a = s?.call(this);
      n?.call(this, r), this.requestUpdate(t, a, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(st("elementProperties"))) return;
    const t = be(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(st("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(st("properties"))) {
      const e = this.properties, i = [...he(e), ...ue(e)];
      for (const s of i) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, s] of e) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const s = this._$Eu(e, i);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(Bt(s));
    } else t !== void 0 && e.push(Bt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return le(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$ET(t, e) {
    const i = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (i.converter?.toAttribute !== void 0 ? i.converter : bt).toAttribute(e, i.type);
      this._$Em = t, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const i = this.constructor, s = i._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const n = i.getPropertyOptions(s), r = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : bt;
      this._$Em = s;
      const a = r.fromAttribute(e, n.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, i, s = !1, n) {
    if (t !== void 0) {
      const r = this.constructor;
      if (s === !1 && (n = this[t]), i ??= r.getPropertyOptions(t), !((i.hasChanged ?? Lt)(n, e) || i.useDefault && i.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: i, reflect: s, wrapped: n }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, n] of i) {
        const { wrapped: r } = n, a = this[s];
        r !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
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
J.elementStyles = [], J.shadowRootOptions = { mode: "open" }, J[st("elementProperties")] = /* @__PURE__ */ new Map(), J[st("finalized")] = /* @__PURE__ */ new Map(), ge?.({ ReactiveElement: J }), (vt.reactiveElementVersions ??= []).push("2.1.2");
const St = globalThis, It = (o) => o, ft = St.trustedTypes, Wt = ft ? ft.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Yt = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, Qt = "?" + N, ve = `<${Qt}>`, F = document, ot = () => F.createComment(""), nt = (o) => o === null || typeof o != "object" && typeof o != "function", jt = Array.isArray, me = (o) => jt(o) || typeof o?.[Symbol.iterator] == "function", _t = `[ 	
\f\r]`, et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Zt = />/g, B = RegExp(`>|${_t}(?:([^\\s"'>=/]+)(${_t}*=${_t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kt = /'/g, qt = /"/g, te = /^(?:script|style|textarea|title)$/i, ee = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), b = ee(1), kt = ee(2), Y = /* @__PURE__ */ Symbol.for("lit-noChange"), m = /* @__PURE__ */ Symbol.for("lit-nothing"), Gt = /* @__PURE__ */ new WeakMap(), I = F.createTreeWalker(F, 129);
function ie(o, t) {
  if (!jt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wt !== void 0 ? Wt.createHTML(t) : t;
}
const xe = (o, t) => {
  const e = o.length - 1, i = [];
  let s, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = et;
  for (let a = 0; a < e; a++) {
    const l = o[a];
    let c, h, d = -1, u = 0;
    for (; u < l.length && (r.lastIndex = u, h = r.exec(l), h !== null); ) u = r.lastIndex, r === et ? h[1] === "!--" ? r = Ft : h[1] !== void 0 ? r = Zt : h[2] !== void 0 ? (te.test(h[2]) && (s = RegExp("</" + h[2], "g")), r = B) : h[3] !== void 0 && (r = B) : r === B ? h[0] === ">" ? (r = s ?? et, d = -1) : h[1] === void 0 ? d = -2 : (d = r.lastIndex - h[2].length, c = h[1], r = h[3] === void 0 ? B : h[3] === '"' ? qt : Kt) : r === qt || r === Kt ? r = B : r === Ft || r === Zt ? r = et : (r = B, s = void 0);
    const g = r === B && o[a + 1].startsWith("/>") ? " " : "";
    n += r === et ? l + ve : d >= 0 ? (i.push(c), l.slice(0, d) + Yt + l.slice(d) + N + g) : l + N + (d === -2 ? a : g);
  }
  return [ie(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class rt {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0, r = 0;
    const a = t.length - 1, l = this.parts, [c, h] = xe(t, e);
    if (this.el = rt.createElement(c, i), I.currentNode = this.el.content, e === 2 || e === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (s = I.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const d of s.getAttributeNames()) if (d.endsWith(Yt)) {
          const u = h[r++], g = s.getAttribute(d).split(N), p = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: n, name: p[2], strings: g, ctor: p[1] === "." ? we : p[1] === "?" ? ye : p[1] === "@" ? _e : mt }), s.removeAttribute(d);
        } else d.startsWith(N) && (l.push({ type: 6, index: n }), s.removeAttribute(d));
        if (te.test(s.tagName)) {
          const d = s.textContent.split(N), u = d.length - 1;
          if (u > 0) {
            s.textContent = ft ? ft.emptyScript : "";
            for (let g = 0; g < u; g++) s.append(d[g], ot()), I.nextNode(), l.push({ type: 2, index: ++n });
            s.append(d[u], ot());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Qt) l.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = s.data.indexOf(N, d + 1)) !== -1; ) l.push({ type: 7, index: n }), d += N.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const i = F.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Q(o, t, e = o, i) {
  if (t === Y) return t;
  let s = i !== void 0 ? e._$Co?.[i] : e._$Cl;
  const n = nt(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(o), s._$AT(o, e, i)), i !== void 0 ? (e._$Co ??= [])[i] = s : e._$Cl = s), s !== void 0 && (t = Q(o, s._$AS(o, t.values), s, i)), t;
}
class $e {
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
    const { el: { content: e }, parts: i } = this._$AD, s = (t?.creationScope ?? F).importNode(e, !0);
    I.currentNode = s;
    let n = I.nextNode(), r = 0, a = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let c;
        l.type === 2 ? c = new at(n, n.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (c = new ke(n, this, t)), this._$AV.push(c), l = i[++a];
      }
      r !== l?.index && (n = I.nextNode(), r++);
    }
    return I.currentNode = F, s;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class at {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, i, s) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = Q(this, t, e), nt(t) ? t === m || t == null || t === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : t !== this._$AH && t !== Y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : me(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== m && nt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(F.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: i } = t, s = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = rt.createElement(ie(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const n = new $e(s, this), r = n.u(this.options);
      n.p(e), this.T(r), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = Gt.get(t.strings);
    return e === void 0 && Gt.set(t.strings, e = new rt(t)), e;
  }
  k(t) {
    jt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const n of t) s === e.length ? e.push(i = new at(this.O(ot()), this.O(ot()), this, this.options)) : i = e[s], i._$AI(n), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const i = It(t).nextSibling;
      It(t).remove(), t = i;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class mt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, s, n) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = n, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = Q(this, t, e, 0), r = !nt(t) || t !== this._$AH && t !== Y, r && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = n[0], l = 0; l < n.length - 1; l++) c = Q(this, a[i + l], e, l), c === Y && (c = this._$AH[l]), r ||= !nt(c) || c !== this._$AH[l], c === m ? t = m : t !== m && (t += (c ?? "") + n[l + 1]), this._$AH[l] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class we extends mt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === m ? void 0 : t;
  }
}
class ye extends mt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== m);
  }
}
class _e extends mt {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Q(this, t, e, 0) ?? m) === Y) return;
    const i = this._$AH, s = t === m && i !== m || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, n = t !== m && (i === m || s);
    s && this.element.removeEventListener(this.name, this, i), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ke {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Q(this, t);
  }
}
const Ae = St.litHtmlPolyfillSupport;
Ae?.(rt, at), (St.litHtmlVersions ??= []).push("3.3.3");
const Ce = (o, t, e) => {
  const i = e?.renderBefore ?? t;
  let s = i._$litPart$;
  if (s === void 0) {
    const n = e?.renderBefore ?? null;
    i._$litPart$ = s = new at(t.insertBefore(ot(), n), n, void 0, e ?? {});
  }
  return s._$AI(o), s;
};
const zt = globalThis;
class D extends J {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ce(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Y;
  }
}
D._$litElement$ = !0, D.finalized = !0, zt.litElementHydrateSupport?.({ LitElement: D });
const Me = zt.litElementPolyfillSupport;
Me?.({ LitElement: D });
(zt.litElementVersions ??= []).push("4.2.2");
const Ee = { attribute: !0, type: String, converter: bt, reflect: !1, hasChanged: Lt }, Le = (o = Ee, t, e) => {
  const { kind: i, metadata: s } = e;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), i === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(e.name, o), i === "accessor") {
    const { name: r } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, l, o, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, o, a), a;
    } };
  }
  if (i === "setter") {
    const { name: r } = e;
    return function(a) {
      const l = this[r];
      t.call(this, a), this.requestUpdate(r, l, o, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function C(o) {
  return (t, e) => typeof e == "object" ? Le(o, t, e) : ((i, s, n) => {
    const r = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, i), r ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(o, t, e);
}
function K(o) {
  return C({ ...o, state: !0, attribute: !1 });
}
var Se = Object.defineProperty, xt = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Se(t, e, s), s;
};
const Ht = class Ht extends D {
  constructor() {
    super(...arguments), this.options = [], this.value = "", this.label = "", this.disabled = !1;
  }
  render() {
    const t = this.options.findIndex((s) => s.value === this.value), e = this.options.filter((s) => !s.disabled), i = this.options[t]?.value ?? e[0]?.value;
    return b`<div
      class="track ${this.options.some((s) => s.detail) ? "tall" : ""}"
      role="radiogroup"
      aria-label=${this.label}
      style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, t)}"
      @keydown=${this.onKey}
    >
      <span class="thumb" aria-hidden="true" ?hidden=${t < 0}></span>
      ${this.options.map(
      (s) => b`<button
          type="button"
          role="radio"
          aria-checked=${s.value === this.value ? "true" : "false"}
          tabindex=${s.value === i ? 0 : -1}
          ?disabled=${this.disabled || s.disabled}
          data-value=${s.value}
          @click=${() => this.pick(s.value)}
        >
          <span>${s.label}</span>${s.detail ? b`<span class="detail">${s.detail}</span>` : null}
        </button>`
    )}
    </div>`;
  }
  pick(t) {
    this.disabled || t === this.value || this.dispatchEvent(new CustomEvent("ed-select", { detail: { value: t }, bubbles: !0, composed: !0 }));
  }
  onKey(t) {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(t.key)) return;
    const i = this.options.filter((a) => !a.disabled);
    if (!i.length) return;
    const s = i.findIndex((a) => a.value === this.value), n = t.key === "ArrowRight" || t.key === "ArrowDown" ? 1 : -1, r = i[(s + n + i.length) % i.length];
    t.preventDefault(), this.pick(r.value), this.updateComplete.then(() => this.renderRoot.querySelector(`[data-value="${r.value}"]`)?.focus());
  }
};
Ht.styles = gt`
    :host {
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
      background: var(--ed-track, #2c2c2e);
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
      background: var(--ed-seg-thumb, #fff);
      box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
      transform: translateX(calc(var(--i) * 100%));
      transition: transform 0.28s cubic-bezier(0.3, 1.1, 0.5, 1);
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
      color: var(--ed-seg-text, #ebebf5);
      font: inherit;
      font-size: 17px;
      font-weight: 400;
      line-height: 22px;
      cursor: pointer;
      transition: color 0.2s;
    }
    button .detail {
      font-size: 13px;
      line-height: 18px;
    }
    button[aria-checked="true"] {
      color: var(--ed-seg-selected, #000);
      font-weight: 600;
    }
    button:focus-visible {
      outline: 2px solid var(--ed-accent, #0a84ff);
      outline-offset: -3px;
    }
    button:disabled {
      cursor: default;
      opacity: 0.5;
    }
    @media (prefers-reduced-motion: reduce) {
      .thumb,
      button {
        transition: none;
      }
    }
  `;
let Z = Ht;
xt([
  C({ attribute: !1 })
], Z.prototype, "options");
xt([
  C()
], Z.prototype, "value");
xt([
  C()
], Z.prototype, "label");
xt([
  C({ type: Boolean })
], Z.prototype, "disabled");
var je = Object.defineProperty, O = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && je(t, e, s), s;
};
const Pt = class Pt extends D {
  constructor() {
    super(...arguments), this.min = 0, this.max = 100, this.step = 1, this.value = 0, this.label = "", this.valueText = "", this.minLabel = "", this.maxLabel = "", this.disabled = !1;
  }
  render() {
    const t = this._drag ?? this.value, e = this.max - this.min || 1, s = `calc(19px + (100% - 38px) * ${Math.max(0, Math.min(1, (t - this.min) / e))})`, n = Math.round(e / (this.step || 1)) + 1, r = n >= 2 && n <= 40 ? Array.from({ length: n }, () => b`<i></i>`) : [];
    return b`<div class="wrap">
        <input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .value=${String(t)}
          aria-label=${this.label}
          aria-valuetext=${this.valueText || String(t)}
          ?disabled=${this.disabled}
          style="--fill: ${s}"
          @input=${this.onInput}
          @change=${this.onChange}
        />
        <div class="ticks" aria-hidden="true">${r}</div>
      </div>
      ${this.minLabel || this.maxLabel ? b`<div class="ends" aria-hidden="true"><span>${this.minLabel}</span><span>${this.maxLabel}</span></div>` : null}`;
  }
  onInput(t) {
    this._drag = Number(t.target.value), this.dispatchEvent(new CustomEvent("ed-input", { detail: { value: this._drag }, bubbles: !0, composed: !0 }));
  }
  onChange(t) {
    const e = Number(t.target.value);
    this._drag = void 0, this.dispatchEvent(new CustomEvent("ed-change", { detail: { value: e }, bubbles: !0, composed: !0 }));
  }
};
Pt.styles = gt`
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
      background: var(--ed-track, #2c2c2e);
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
      background: linear-gradient(to right, var(--ed-accent, #0a84ff) 0%, var(--ed-accent, #0a84ff) var(--fill), var(--ed-bar, rgb(255 255 255 / 14%)) var(--fill), var(--ed-bar, rgb(255 255 255 / 14%)) 100%);
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
      background: var(--ed-bar, rgb(255 255 255 / 14%));
    }
    input::-moz-range-progress {
      height: 6px;
      border-radius: 3px;
      background: var(--ed-accent, #0a84ff);
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
      outline: 2px solid var(--ed-accent, #0a84ff);
      outline-offset: 2px;
    }
    /* Ticks at the steps, between the thumb centres at both ends. */
    .ticks {
      position: absolute;
      left: 33px;
      right: 33px;
      bottom: 7px;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
    }
    .ticks i {
      width: 2px;
      height: 5px;
      border-radius: 1px;
      background: var(--ed-tick, rgb(255 255 255 / 28%));
    }
    .ends {
      display: flex;
      justify-content: space-between;
      padding: 4px 14px 0;
      color: var(--ed-secondary, #98989f);
      font-size: 13px;
      line-height: 18px;
    }
  `;
let E = Pt;
O([
  C({ type: Number })
], E.prototype, "min");
O([
  C({ type: Number })
], E.prototype, "max");
O([
  C({ type: Number })
], E.prototype, "step");
O([
  C({ type: Number })
], E.prototype, "value");
O([
  C()
], E.prototype, "label");
O([
  C()
], E.prototype, "valueText");
O([
  C()
], E.prototype, "minLabel");
O([
  C()
], E.prototype, "maxLabel");
O([
  C({ type: Boolean })
], E.prototype, "disabled");
O([
  K()
], E.prototype, "_drag");
var ze = Object.defineProperty, Tt = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && ze(t, e, s), s;
};
const Nt = class Nt extends D {
  constructor() {
    super(...arguments), this.checked = !1, this.disabled = !1, this.label = "";
  }
  render() {
    return b`<button
      type="button"
      role="switch"
      aria-checked=${this.checked ? "true" : "false"}
      aria-label=${this.label}
      ?disabled=${this.disabled}
      @click=${this.onClick}
    ><span class="thumb"></span></button>`;
  }
  onClick() {
    this.disabled || this.dispatchEvent(new CustomEvent("ed-toggle", { detail: { checked: !this.checked }, bubbles: !0, composed: !0 }));
  }
};
Nt.styles = gt`
    :host {
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
      background: var(--ed-switch-off, rgb(120 120 128 / 36%));
      cursor: pointer;
      transition: background 0.2s;
    }
    button[aria-checked="true"] {
      background: var(--ed-accent, #0a84ff);
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
    button:disabled {
      cursor: default;
      opacity: 0.45;
    }
    button:focus-visible {
      outline: 2px solid var(--ed-accent, #0a84ff);
      outline-offset: 3px;
    }
    @media (prefers-reduced-motion: reduce) {
      button,
      .thumb {
        transition: none;
      }
    }
  `;
let tt = Nt;
Tt([
  C({ type: Boolean })
], tt.prototype, "checked");
Tt([
  C({ type: Boolean })
], tt.prototype, "disabled");
Tt([
  C()
], tt.prototype, "label");
const Te = "Energie", $t = {
  pv: { power: void 0 },
  battery: { power: void 0, state_of_charge: void 0 },
  grid: { power: void 0 },
  house: { power: void 0 },
  car: { state_of_charge: void 0, range: void 0, image: "image" },
  wallbox: { power: void 0, status: void 0, boost: "switch", block_charging: "switch", prioritize_connected: "switch", charging_power: "number" },
  boiler: { power: void 0, temperature: void 0, boost: "switch", target_temperature: "number", boost_target_temperature: "number" },
  tank: { water_heater: "water_heater" },
  mixing: { valve_c1: "switch", valve_c2: "switch", script: "script" }
}, se = Object.keys($t), x = (o, t, e, i, s = !1) => ({ value: o, min: t, max: e, what: i, integer: s }), Ot = {
  battery: { reserve: x(20, 0, 100, "% battery reserve") },
  car: { charge_limit: x(80, 1, 100, "% charge limit marker") },
  wallbox: {
    phases: x(3, 1, 3, "number of phases", !0),
    power_min: x(4200, 0, 1e5, "W, lowest charging power (all phases)"),
    power_max: x(11100, 0, 1e5, "W, highest charging power (all phases)"),
    power_step: x(300, 1, 1e5, "W, step of the charging power (all phases)"),
    priority_min_sun: x(200, 0, 1e5, "W of sun above which a waiting car is reported")
  },
  boiler: {
    target_min: x(20, 0, 100, "°C, lowest target"),
    target_max: x(85, 0, 100, "°C, highest target"),
    target_step: x(5, 1, 50, "°C, target step"),
    scale_min: x(10, -50, 100, "°C, empty end of the meter and the tank"),
    gauge_max: x(60, 0, 150, "°C, full end of the meter"),
    schema_max: x(70, 0, 150, "°C, full end of the tank drawing"),
    cold_below: x(30, 0, 100, "°C, below this the water is drawn cold"),
    hot_from: x(45, 0, 100, "°C, from this the water is drawn hot")
  },
  tank: {
    temp_min: x(30, 0, 100, "°C, lowest temperature"),
    temp_max: x(65, 0, 100, "°C, highest temperature"),
    temp_step: x(5, 1, 50, "°C, temperature step")
  },
  flows: {
    idle_threshold: x(10, 0, 1e3, "W, below this a flow counts as none"),
    kw_from: x(1e3, 100, 1e5, "W, from this any power is shown in kW"),
    sun_covers: x(50, 0, 1e4, "W of sun that counts as covering the house"),
    export_notice: x(300, 0, 1e5, "W of export that counts as a surplus"),
    battery_flow: x(50, 0, 1e4, "W of battery power that counts as charging"),
    source_min_share: x(15, 0, 100, "% a source needs to be named in a text"),
    grid_deviation_share: x(50, 0, 100, "% of the grid above which it is a deviation"),
    band_max_px_per_kw: x(10, 0.5, 50, "px per kW, thickness of the bands"),
    band_min_px: x(1.6, 0.5, 10, "px, thinnest band")
  },
  scale: {
    sun: x(1e4, 100, 1e6, "W, full strength of the sun tile"),
    battery: x(5e3, 100, 1e6, "W, full strength of the battery tiles"),
    grid: x(1e4, 100, 1e6, "W, full strength of the grid tiles"),
    house: x(1e4, 100, 1e6, "W, full strength of the house tile"),
    car: x(11100, 100, 1e6, "W, full strength of the car tile"),
    boiler: x(4e3, 100, 1e6, "W, full strength of the boiler tile")
  },
  ui: { revert_after: x(6, 1, 60, "s until a chosen value falls back to the real state") }
}, ht = {
  sun: "#FFD60A",
  battery: "#30D158",
  grid: "#3D8BFF",
  house: "#BF5AF2",
  car: "#40D0E6",
  boiler: "#FF6F59",
  accent: "#0A84FF",
  button: "#0A6ED1",
  warning: "#FF9230",
  cold: "#3CD3FE",
  neutral: "#8E8E93"
}, ut = { electricity: "Elektřina", car: "BMW i3", water: "Teplá voda" };
[
  ...se.flatMap((o) => Object.keys($t[o]).map((t) => `${o}.${t}`)),
  ...Object.entries(Ot).flatMap(([o, t]) => Object.keys(t).map((e) => `${o}.${e}`)),
  ...Object.keys(ut).map((o) => `titles.${o}`),
  ...Object.keys(ht).map((o) => `colors.${o}`)
];
function L(o) {
  throw new Error(`Energie Dashboard: ${o}`);
}
function oe(o) {
  return typeof o == "object" && o !== null && !Array.isArray(o);
}
function wt(o, t) {
  return o == null ? {} : (oe(o) || L(`"${t}" must be a mapping of keys.`), o);
}
function yt(o, t, e) {
  for (const i of Object.keys(o))
    t.includes(i) || L(`${e}: unknown key "${i}" (allowed: ${t.join(", ")}).`);
}
function Oe(o, t, e) {
  if (o == null)
    return;
  const i = typeof o == "string" ? o.trim() : "";
  return /^[a-z0-9_]+\.[a-z0-9_]+$/.test(i) || L(`${t} must be an entity ID such as ${e ?? "sensor"}.example.`), e && !i.startsWith(`${e}.`) && L(`${t} must be a ${e} entity (${e}.…), not ${i}.`), i;
}
function He(o, t) {
  const e = wt(o[t], t), i = $t[t], s = Object.keys(Ot[t] ?? {});
  yt(e, [...Object.keys(i), ...s], t);
  const n = {};
  for (const [r, a] of Object.entries(i)) {
    const l = Oe(e[r], `${t}.${r}`, a);
    l && (n[r] = l);
  }
  return n;
}
function Pe(o) {
  const t = {};
  for (const [e, i] of Object.entries(Ot)) {
    const s = wt(o[e], e), n = Object.keys($t[e] ?? {});
    yt(s, [...n, ...Object.keys(i)], e), t[e] = {};
    for (const [r, a] of Object.entries(i)) {
      const l = s[r], c = `${e}.${r}`;
      if (l == null) {
        t[e][r] = a.value;
        continue;
      }
      (typeof l != "number" || !Number.isFinite(l)) && L(`${c} must be a number (${a.what}).`), (l < a.min || l > a.max || a.integer && !Number.isInteger(l)) && L(`${c} must be ${a.integer ? "a whole number " : "a number "}from ${a.min} to ${a.max} (${a.what}), not ${l}.`), t[e][r] = l;
    }
  }
  return t;
}
function Ne(o) {
  const t = wt(o.colors, "colors");
  yt(t, Object.keys(ht), "colors");
  const e = { ...ht };
  for (const i of Object.keys(ht)) {
    const s = t[i];
    s != null && ((typeof s != "string" || !/^#[0-9a-fA-F]{6}$/.test(s.trim())) && L(`colors.${i} must be a colour like #FFD60A (six hex digits).`), e[i] = s.trim().toUpperCase());
  }
  return e;
}
function De(o) {
  const t = wt(o.titles, "titles");
  yt(t, Object.keys(ut), "titles");
  const e = { ...ut };
  for (const i of Object.keys(ut)) {
    const s = t[i];
    s != null && ((typeof s != "string" || s.trim() === "") && L(`titles.${i} must be a non-empty text.`), e[i] = s.trim());
  }
  return e;
}
function Re(o) {
  const t = [
    [o.wallbox.power_min, o.wallbox.power_max, "wallbox.power_min", "wallbox.power_max", !0],
    [o.boiler.target_min, o.boiler.target_max, "boiler.target_min", "boiler.target_max", !0],
    [o.boiler.scale_min, o.boiler.gauge_max, "boiler.scale_min", "boiler.gauge_max", !0],
    [o.boiler.scale_min, o.boiler.schema_max, "boiler.scale_min", "boiler.schema_max", !0],
    [o.boiler.cold_below, o.boiler.hot_from, "boiler.cold_below", "boiler.hot_from", !1],
    [o.tank.temp_min, o.tank.temp_max, "tank.temp_min", "tank.temp_max", !0]
  ];
  for (const [e, i, s, n, r] of t)
    (r ? e >= i : e > i) && L(`${s} (${e}) must be ${r ? "below" : "at most"} ${n} (${i}).`);
}
function Be(o) {
  oe(o) || L("the configuration must be a mapping of keys."), o.title != null && typeof o.title != "string" && L("title must be a text (an empty text leaves the heading out).");
  const t = Object.fromEntries(se.map((i) => [i, He(o, i)]));
  t.mixing.valve_c1 && t.mixing.valve_c1 === t.mixing.valve_c2 && L("mixing.valve_c1 and mixing.valve_c2 must be two different valves.");
  const e = Pe(o);
  return Re(e), { title: o.title ?? Te, entities: t, titles: De(o), num: e, colors: Ne(o) };
}
const Ve = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function U(o, t) {
  return t ? o?.states?.[t] : void 0;
}
function z(o, t) {
  const e = U(o, t)?.state;
  return e === void 0 || Ve.has(e) ? void 0 : e;
}
function M(o, t) {
  const e = U(o, t), i = z(o, t);
  if (i === void 0)
    return;
  const s = Number(i);
  if (Number.isFinite(s))
    return e?.attributes?.unit_of_measurement === "kW" ? s * 1e3 : s;
}
const Ue = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), Ie = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 0 });
function At(o, t = 1e3) {
  return o.some((e) => e !== void 0 && Math.abs(e) >= t) ? "kW" : "W";
}
function ct(o, t) {
  return t === "kW" ? `${Ue.format(o / 1e3)} kW` : `${Ie.format(Math.round(o))} W`;
}
function w(o, t = 0) {
  return new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: t, maximumFractionDigits: t }).format(o);
}
const j = ["sun", "bat", "grid"], W = ["house", "car", "boil", "batIn", "gridOut"], dt = (o) => o === void 0 ? void 0 : Math.max(0, o);
function We(o) {
  if (o === "Disconnected") return "disconnected";
  if (o === "Waiting") return "connected";
  if (o === "Charging") return "charging";
}
function Fe(o, t) {
  const e = t.entities, i = t.num.flows.idle_threshold, s = dt(M(o, e.pv.power)), n = M(o, e.battery.power), r = M(o, e.grid.power), a = dt(M(o, e.house.power)), l = dt(M(o, e.wallbox.power)), c = dt(M(o, e.boiler.power)), h = n === void 0 ? void 0 : Math.max(0, n), d = n === void 0 ? void 0 : Math.max(0, -n), u = r === void 0 ? void 0 : Math.max(0, -r), g = r === void 0 ? void 0 : Math.max(0, r), p = a === void 0 ? void 0 : Math.max(0, a - (l ?? 0) - (c ?? 0)), f = {
    sun: Math.max(0, (s ?? 0) - (d ?? 0) - (g ?? 0)),
    bat: h ?? 0,
    grid: u ?? 0
  }, v = f.sun + f.bat + f.grid, y = { sun: 0, bat: 0, grid: 0 };
  if (v > i)
    for (const X of j) y[X] = f[X] / v;
  const k = [], H = [
    ["house", p],
    ["car", l],
    ["boil", c]
  ];
  for (const [X, R] of H)
    if (!(!R || R <= i))
      for (const S of j) {
        const lt = R * y[S];
        lt > i / 2 && k.push({ from: S, to: X, watts: lt });
      }
  (d ?? 0) > i && k.push({ from: "sun", to: "batIn", watts: d }), (g ?? 0) > i && k.push({ from: "sun", to: "gridOut", watts: g });
  const G = {
    sun: s,
    batDis: h,
    batIn: d,
    imp: u,
    exp: g,
    other: p,
    car: l,
    boil: c,
    share: y,
    flows: k,
    soc: M(o, e.battery.state_of_charge),
    carSoc: M(o, e.car.state_of_charge),
    carRange: M(o, e.car.range),
    boilTemp: M(o, e.boiler.temperature),
    carLink: We(z(o, e.wallbox.status))
  };
  return Object.assign(G, Ze(G, t.num.flows)), G;
}
function Ze(o, t) {
  const e = t.idle_threshold;
  if ([o.sun, o.batDis, o.imp, o.other].every((u) => u === void 0)) return {};
  if ((o.sun ?? 0) > t.sun_covers && (o.imp ?? 0) <= e && (o.batDis ?? 0) <= e) {
    let u;
    return (o.exp ?? 0) > t.export_notice && (o.batIn ?? 0) < t.battery_flow ? u = "Přebytek jde do sítě" : (o.car ?? 0) > e ? u = `Slunce nabíjí ${(o.batIn ?? 0) > t.battery_flow ? "baterii i " : ""}auto` : (o.batIn ?? 0) > t.battery_flow ? u = "Slunce nabíjí baterii" : u = "Slunce pokrývá dům", { summary: u, summarySource: "sun" };
  }
  const { sun: n, bat: r, grid: a } = o.share;
  if (a > t.grid_deviation_share / 100) return { summary: "Dům jede ze sítě", summarySource: "grid" };
  const l = t.source_min_share / 100;
  if (n < l && a < l && r > 0) return { summary: "Dům jede z baterie", summarySource: "bat" };
  const c = re(o.share, l);
  if (!c.length) return { summary: "Dům nic neodebírá" };
  const h = { sun: "slunce", bat: "baterie", grid: "sítě" };
  return { summary: `Dům bere ${ne[c[0]]}${c.slice(1).map((u) => ` a ${h[u]}`).join("")}`, summarySource: c[0] };
}
const ne = { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" };
function re(o, t) {
  return j.filter((e) => o[e] >= t).sort((e, i) => o[i] - o[e]);
}
function Xt(o, t) {
  const e = { sun: "slunce", bat: "baterie", grid: "sítě" };
  let i = re(o, t.source_min_share / 100);
  i.length || (i = ["sun"]);
  const s = o.grid > t.grid_deviation_share / 100;
  return { text: ne[i[0]] + i.slice(1).map((n) => ` a ${e[n]}`).join(""), main: s ? "grid" : i[0], deviation: s };
}
function Ke(o, t) {
  const e = z(o, t.valve_c1), i = z(o, t.valve_c2);
  if (!(e === void 0 || i === void 0))
    return e === "off" && i === "on" ? "on" : e === "on" && i === "off" ? "off" : "unclear";
}
function qe(o) {
  const t = Math.round(Math.max(116, Math.min(132, o * 0.35))), e = 50, i = 6, s = W.length * e + (W.length - 1) * i, n = Object.fromEntries(W.map((a, l) => [a, e / 2 + l * (e + i)])), r = Object.fromEntries(j.map((a, l) => [a, (l + 0.5) * s / j.length]));
  return { width: o, tile: { w: t, h: e }, gap: i, height: s, left: r, right: n, xa: t - 8, xb: o - t + 8 };
}
const A = (o) => o.toFixed(1);
function Ge(o, t, e) {
  if (!o.length) return [];
  const i = (p) => {
    const f = /* @__PURE__ */ new Map();
    for (const v of o) f.set(v[p], (f.get(v[p]) ?? 0) + v.watts);
    return f;
  }, s = Math.max(...i("from").values(), ...i("to").values()), n = Math.min(e.maxPxPerKw / 1e3, 44 / s), r = (p) => Math.max(e.minPx, p.watts * n), a = /* @__PURE__ */ new Map();
  for (const p of j) {
    const f = o.filter((v) => v.from === p).reduce((v, y) => v + r(y), 0);
    a.set(p, t.left[p] - f / 2);
  }
  const l = /* @__PURE__ */ new Map();
  for (const p of W) {
    const f = o.filter((v) => v.to === p).reduce((v, y) => v + r(y), 0);
    l.set(p, t.right[p] - f / 2);
  }
  const c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  for (const p of j)
    for (const f of o.filter((v) => v.from === p).sort((v, y) => W.indexOf(v.to) - W.indexOf(y.to)))
      c.set(f, a.get(p)), a.set(p, a.get(p) + r(f));
  for (const p of W)
    for (const f of o.filter((v) => v.to === p).sort((v, y) => j.indexOf(v.from) - j.indexOf(y.from)))
      h.set(f, l.get(p)), l.set(p, l.get(p) + r(f));
  const { xa: d, xb: u } = t, g = (d + u) / 2;
  return o.map((p) => {
    const f = r(p), v = c.get(p), y = v + f, k = h.get(p), H = k + f;
    return {
      from: p.from,
      to: p.to,
      watts: p.watts,
      thickness: f,
      d: `M${d} ${A(v)} C${A(g)} ${A(v)} ${A(g)} ${A(k)} ${u} ${A(k)} L${u} ${A(H)} C${A(g)} ${A(H)} ${A(g)} ${A(y)} ${d} ${A(y)} Z`,
      centre: `M${d} ${A(v + f / 2)} C${A(g)} ${A(v + f / 2)} ${A(g)} ${A(k + f / 2)} ${u} ${A(k + f / 2)}`
    };
  });
}
const Xe = gt`
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
  }

  .page {
    display: grid;
    gap: 12px;
    min-width: 0;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    padding: 4px 4px 0;
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
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
    gap: 8px;
    padding: 0 10px;
    border: 0;
    border-radius: 12px;
    background: var(--ed-tile);
    color: var(--ed-text);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .tile.on {
    background: color-mix(in srgb, var(--tc) var(--tint), var(--ed-tile));
  }

  .tile:focus-visible,
  .row-btn:focus-visible,
  .btn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: 2px;
  }

  .tile .icon {
    flex: none;
    width: 26px;
    height: 26px;
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
  .tile.on .name {
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

  .tile.idle .value {
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 400;
  }

  /* ------------------------------------------------------------ gauges */
  .gauges {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-top: 4px;
  }

  .gauge {
    box-sizing: border-box;
    min-width: 0;
    padding: 8px 10px 10px;
    border-radius: 12px;
    background: var(--ed-tile);
  }

  .g-label {
    color: var(--ed-secondary);
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    white-space: nowrap;
  }

  .g-value {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .bar {
    position: relative;
    height: 5px;
    margin-top: 6px;
    border-radius: 3px;
    background: var(--ed-bar);
  }

  .bar .fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 3px;
  }

  .bar .tick {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 2px;
    margin-left: -1px;
    border-radius: 1px;
    background: var(--ed-text);
    opacity: 0.8;
  }

  /* --------------------------------------------------------------- car */
  .car-top {
    position: relative;
    height: 148px;
  }

  .car-art {
    position: absolute;
    right: -4px;
    bottom: 0;
    width: 236px;
    height: 132px;
    pointer-events: none;
  }

  .car-art .glow {
    position: absolute;
    inset: auto 6px 2px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(closest-side, var(--glow), transparent);
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
    width: 168px;
    max-height: 100px;
    object-fit: contain;
    filter: drop-shadow(0 6px 10px rgb(0 0 0 / 45%));
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
    margin-top: 4px;
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 16px;
  }

  .meter-label span {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .notice {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--ed-tile);
    font-size: 15px;
    line-height: 20px;
  }

  .notice.warn {
    background: color-mix(in srgb, var(--ed-warning) 16%, var(--ed-card));
  }

  .notice svg {
    flex: none;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    fill: var(--ed-secondary);
  }

  .notice.warn svg {
    fill: var(--ed-warning);
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

  /* --------------------------------------------------------- hot water */
  .water {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr) 96px;
    align-items: start;
    padding-top: 6px;
  }

  .tank-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .tank {
    position: relative;
    width: 96px;
    height: 132px;
    box-sizing: border-box;
    border-radius: 20px;
    background: var(--ed-tile);
    overflow: hidden;
  }

  .tank-water {
    position: absolute;
    inset: auto 0 0;
    border-top: 2px solid transparent;
  }

  .tank-target {
    position: absolute;
    inset: 0 0 auto;
    border-top: 1px dashed var(--ed-text);
    opacity: 0.5;
  }

  .tank-temp {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .tank-temp.top {
    align-items: flex-start;
    padding-top: 14px;
  }

  .tank-temp small {
    padding-top: 6px;
    color: color-mix(in srgb, var(--ed-text) 82%, transparent);
    font-size: 17px;
  }

  .tank-caption {
    width: 120px;
    margin: 0 -12px;
    text-align: center;
    white-space: nowrap;
  }

  .tank-caption b {
    display: block;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  .tank-caption span {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  .tank-caption span.src {
    color: var(--c);
  }

  :host([data-light]) .tank-caption span.src {
    color: color-mix(in srgb, var(--c) 45%, #000);
  }

  .mixing {
    display: block;
    width: 100%;
    height: 132px;
  }

  .mixing text {
    font-family: inherit;
    fill: var(--ed-secondary);
  }

  /* ------------------------------------------------------------- lists */
  .group {
    margin: 0;
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
    grid-template-columns: 40px minmax(0, 1fr) auto;
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

  .row-sub.accent {
    color: var(--c);
  }

  :host([data-light]) .row-sub.accent,
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
    width: 16px;
    height: 16px;
    fill: var(--ed-off);
    transition: transform 0.28s ease;
  }

  .open .chevron {
    transform: rotate(90deg);
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
    .fold,
    .chevron {
      transition: none;
    }
  }

  .detail {
    display: grid;
    gap: 14px;
    padding: 4px 0 14px;
  }

  .field {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    column-gap: 12px;
  }

  .field ed-slider {
    grid-column: 1 / -1;
    margin-top: 6px;
  }

  .field-label {
    font-size: 15px;
    line-height: 20px;
  }

  .field-value {
    font-size: 22px;
    font-weight: 500;
    line-height: 28px;
    font-variant-numeric: tabular-nums;
  }

  .field-value.dim {
    color: var(--ed-secondary);
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
    min-height: 56px;
  }

  .switch-text {
    display: flex;
    flex-direction: column;
  }

  .switch-title {
    font-size: 17px;
    line-height: 22px;
  }

  .confirm {
    display: grid;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    background: var(--ed-card);
    font-size: 15px;
    line-height: 20px;
  }

  .confirm .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .btn {
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 999px;
    background: var(--ed-btn);
    color: var(--ed-text);
    font: inherit;
    font-size: 17px;
    cursor: pointer;
  }

  .btn.primary {
    background: var(--ed-button);
    color: #fff;
    font-weight: 600;
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
`, $ = {
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
  lock: "M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 10 0v2zm-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3",
  wallbox: "M19.77,7.23L19.78,7.22L16.06,3.5L15,4.56L17.11,6.67C16.17,7.03 15.5,7.93 15.5,9A2.5,2.5 0 0,0 18,11.5C18.36,11.5 18.69,11.42 19,11.29V18.5A1,1 0 0,1 18,19.5A1,1 0 0,1 17,18.5V14A2,2 0 0,0 15,12H14V5A2,2 0 0,0 12,3H6A2,2 0 0,0 4,5V21H14V13.5H15.5V18.5A2.5,2.5 0 0,0 18,21A2.5,2.5 0 0,0 20.5,18.5V9C20.5,8.31 20.22,7.68 19.77,7.23M18,10A1,1 0 0,1 17,9A1,1 0 0,1 18,8A1,1 0 0,1 19,9A1,1 0 0,1 18,10M8,18V13.5H6L10,6V11H12L8,18Z",
  bolt: "M11 15H6L13 1V9H18L11 23V15Z",
  chevron: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  waterTemp: "M19 5C17.89 5 17 5.89 17 7V13.76C16.36 14.33 16 15.15 16 16C16 17.66 17.34 19 19 19S22 17.66 22 16C22 15.15 21.64 14.33 21 13.77V7C21 5.89 20.11 5 19 5M19 6C19.55 6 20 6.45 20 7V8H18V7C18 6.45 18.45 6 19 6M8 20C4.69 20 2 17.31 2 14C2 10 8 3.25 8 3.25S14 10 14 14C14 17.31 11.31 20 8 20Z",
  alert: "M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2z"
};
var Je = Object.defineProperty, q = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Je(t, e, s), s;
};
const _ = "––", V = { sun: "--ed-sun", bat: "--ed-battery", grid: "--ed-grid" }, Ye = {
  sun: "--ed-sun",
  bat: "--ed-battery",
  grid: "--ed-grid",
  house: "--ed-house",
  car: "--ed-car",
  boil: "--ed-boiler",
  batIn: "--ed-battery",
  gridOut: "--ed-grid"
}, Ct = { auto: "Auto", heat: "Manual", off: "Off" }, Qe = { auto: "auto", heat: "manual", off: "vypnuto" };
function P(o, t) {
  const e = o?.attributes?.[t];
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function ti(o) {
  const t = o.reduce((n, r) => n + r, 0);
  if (t <= 0) return o.map(() => 0);
  const e = o.map((n) => n / t * 100), i = e.map(Math.floor);
  let s = 100 - i.reduce((n, r) => n + r, 0);
  return e.map((n, r) => ({ index: r, rest: n - i[r] })).sort((n, r) => r.rest - n.rest).forEach(({ index: n }) => {
    s-- > 0 && i[n]++;
  }), i;
}
const it = (o, t, e) => Math.max(t, Math.min(e, o)), Dt = class Dt extends D {
  constructor() {
    super(...arguments), this._width = 329, this._optimistic = {}, this._feedback = "", this._open = {}, this._timers = /* @__PURE__ */ new Map();
  }
  setConfig(t) {
    this._config = Be(t);
  }
  getCardSize() {
    return 14;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._observer?.disconnect(), this._observer = void 0, this._timers.forEach((t) => window.clearTimeout(t)), this._timers.clear();
  }
  willUpdate() {
    this.toggleAttribute("data-light", this.hass?.themes?.darkMode === !1);
  }
  updated(t) {
    super.updated(t);
    const e = this.renderRoot.querySelector(".flow");
    if (e && !this._observer && (this._observer = new ResizeObserver(() => {
      const i = Math.round(e.getBoundingClientRect().width);
      i > 0 && i !== this._width && (this._width = i);
    }), this._observer.observe(e)), t.has("hass")) {
      const i = Object.entries(this._optimistic).filter(([s, n]) => this.hass?.states?.[s]?.state === n);
      if (i.length) {
        const s = { ...this._optimistic };
        i.forEach(([n]) => delete s[n]), this._optimistic = s;
      }
    }
  }
  // ----------------------------------------------------------------- render
  render() {
    const t = this._config;
    if (!t) return m;
    const e = Fe(this.hass, t), i = t.colors, s = `--ed-sun:${i.sun};--ed-battery:${i.battery};--ed-grid:${i.grid};--ed-house:${i.house};--ed-car:${i.car};--ed-boiler:${i.boiler};--ed-accent:${i.accent};--ed-button:${i.button};--ed-warning:${i.warning};--ed-cold:${i.cold};--ed-off:${i.neutral}`;
    return b`<div class="page" style=${s}>
      ${t.title === "" ? m : b`<h1>${t.title}</h1>`} ${this.renderElectricity(t, e)} ${this.renderCar(t, e)} ${this.renderWater(t, e)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
  /** The colour of a source text: the grid beyond its share is a deviation (orange). */
  sourceColor(t) {
    return t.deviation ? "var(--ed-warning)" : `var(${V[t.main]})`;
  }
  stateLine(t, e) {
    return b`<p class="state" style="--sc:${e ?? "var(--ed-secondary)"}">
      <span class="dot" aria-hidden="true"></span>${t ?? b`${_}<span class="sr-only">bez dat</span>`}
    </p>`;
  }
  // ------------------------------------------------------------ Elektřina
  renderElectricity(t, e) {
    const i = e.summarySource ? `var(${V[e.summarySource]})` : void 0;
    return b`<section class="panel" aria-labelledby="h-el">
      <div class="head"><h2 id="h-el">${t.titles.electricity}</h2>${this.stateLine(e.summary, i)}</div>
      ${this.renderFlow(t, e)} ${this.renderGauges(t, e)}
    </section>`;
  }
  tiles(t, e) {
    const i = e.entities, s = e.num.scale, n = t.carLink;
    return [
      { side: "L", key: "sun", name: "Slunce", watts: t.sun, k: (t.sun ?? 0) / s.sun, icon: $.sun, idleIcon: $.moon, idleText: "nevyrábí", entity: i.pv.power },
      { side: "L", key: "bat", name: "Baterie", watts: t.batDis, k: (t.batDis ?? 0) / s.battery, icon: $.battery, icon2: $.batteryDown, idleIcon: $.pause, idleText: "nevybíjí", entity: i.battery.power },
      { side: "L", key: "grid", name: "Síť", watts: t.imp, k: (t.imp ?? 0) / s.grid, icon: $.grid, idleIcon: $.minus, idleText: "neodebírá", entity: i.grid.power },
      { side: "R", key: "house", name: "Dům", watts: t.other, k: (t.other ?? 0) / s.house, icon: $.home, idleIcon: $.minus, idleText: "bez odběru", entity: i.house.power },
      {
        side: "R",
        key: "car",
        name: "Auto",
        watts: n === void 0 && t.car === void 0 ? void 0 : t.car ?? 0,
        k: (t.car ?? 0) / s.car,
        icon: $.car,
        idleIcon: n === "disconnected" ? $.minus : $.plug,
        idleText: n === "disconnected" ? "odpojeno" : n === void 0 ? "bez stavu" : "připojeno",
        entity: i.wallbox.power
      },
      { side: "R", key: "boil", name: "Bojler", watts: t.boil, k: (t.boil ?? 0) / s.boiler, icon: $.therm, idleIcon: $.pause, idleText: "vypnuto", entity: i.boiler.power },
      { side: "R", key: "batIn", name: "Do baterie", watts: t.batIn, k: (t.batIn ?? 0) / s.battery, icon: $.battery, icon2: $.batteryBolt, idleIcon: $.pause, idleText: "nenabíjí", entity: i.battery.power },
      { side: "R", key: "gridOut", name: "Do sítě", watts: t.exp, k: (t.exp ?? 0) / s.grid, icon: $.grid, idleIcon: $.minus, idleText: "nedodává", entity: i.grid.power }
    ];
  }
  renderFlow(t, e) {
    const i = qe(this._width), s = Ge(e.flows, i, { maxPxPerKw: t.num.flows.band_max_px_per_kw, minPx: t.num.flows.band_min_px }), n = At([e.sun, e.batDis, e.batIn, e.imp, e.exp, e.other, e.car, e.boil], t.num.flows.kw_from), r = (a) => kt`<linearGradient id="rg-${a}" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color:var(${V[a]});stop-opacity:0.2"></stop>
        <stop offset="0.14" style="stop-color:var(${V[a]});stop-opacity:0.88"></stop>
        <stop offset="0.86" style="stop-color:var(${V[a]});stop-opacity:0.88"></stop>
        <stop offset="1" style="stop-color:var(${V[a]});stop-opacity:0.2"></stop>
      </linearGradient>`;
    return b`<div class="flow" role="group" aria-label="Toky energie" style="height:${i.height}px">
      <svg width=${i.width} height=${i.height} viewBox="0 0 ${i.width} ${i.height}" aria-hidden="true">
        <defs>${j.map(r)}</defs>
        ${s.map(
      (a) => kt`<g>
            <path d=${a.d} fill="url(#rg-${a.from})"></path>
            <path class="dots" d=${a.centre} style="stroke-width:${Math.max(1.8, Math.min(3.2, a.thickness * 0.55)).toFixed(1)}px;animation-duration:${(14 / (14 + 6 * Math.min(a.watts / 1e3, 10))).toFixed(2)}s"></path>
          </g>`
    )}
      </svg>
      ${this.tiles(e, t).map((a) => this.renderTile(a, i, n, t))}
    </div>`;
  }
  renderTile(t, e, i, s) {
    const n = t.watts === void 0, r = !n && t.watts > s.num.flows.idle_threshold, a = t.side === "L" ? 0 : e.width - e.tile.w, l = t.side === "L" ? e.left[t.key] : e.right[t.key], c = it(t.k, 0, 1), h = n ? _ : ct(t.watts, i), d = n ? "bez dat" : r ? h : t.idleText, u = `left:${a}px;top:${(l - e.tile.h / 2).toFixed(1)}px;width:${e.tile.w}px;height:${e.tile.h}px;--tc:var(${Ye[t.key]});--tint:${r ? Math.round(21 + 7 * c) : 0}%;--gr:${(2 + 9 * c).toFixed(1)}px;--ga:${Math.round(30 + 60 * c)}%`;
    return b`<button
      type="button"
      class="tile ${r ? "on" : "idle"}"
      style=${u}
      aria-label="${t.name} ${d}"
      @click=${() => this.moreInfo(t.entity)}
    >
      <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d=${r ? t.icon : t.idleIcon}></path>${r && t.icon2 ? kt`<path class="icon2" d=${t.icon2}></path>` : m}
      </svg>
      <span class="text">
        <span class="name">${t.name}</span>
        <span class="value" aria-hidden="true">${r ? h : n ? _ : t.idleText}</span>
      </span>
    </button>`;
  }
  renderGauges(t, e) {
    const { reserve: i } = t.num.battery, s = t.num.car.charge_limit, { scale_min: n, gauge_max: r } = t.num.boiler, a = (c) => c === void 0 ? void 0 : it(c, 0, 100), l = [
      { label: "Baterie", text: e.soc === void 0 ? _ : `${w(e.soc)} %`, fill: a(e.soc), color: (e.soc ?? 100) <= i ? "var(--ed-warning)" : "var(--ed-battery)", tick: i },
      { label: `Auto → ${w(s)} %`, text: e.carSoc === void 0 ? _ : `${w(e.carSoc)} %`, fill: a(e.carSoc), color: "var(--ed-car)", tick: s },
      { label: "Bojler", text: e.boilTemp === void 0 ? _ : `${w(e.boilTemp)} °C`, fill: e.boilTemp === void 0 ? void 0 : a((e.boilTemp - n) / (r - n) * 100), color: "var(--ed-boiler)", tick: void 0 }
    ];
    return b`<div class="gauges" role="group" aria-label="Stav baterie, auta a bojleru">
      ${l.map(
      (c) => b`<div class="gauge">
          <div class="g-label">${c.label}</div>
          <div class="g-value">${c.text}${c.fill === void 0 ? b`<span class="sr-only">bez dat</span>` : m}</div>
          <div class="bar" aria-hidden="true">
            <div class="fill" style="width:${c.fill ?? 0}%;background:${c.color}"></div>
            ${c.tick === void 0 ? m : b`<div class="tick" style="left:${c.tick}%"></div>`}
          </div>
        </div>`
    )}
    </div>`;
  }
  // ------------------------------------------------------------------- car
  renderCar(t, e) {
    const i = t.entities, s = t.num.flows, n = s.idle_threshold, r = t.num.car.charge_limit, a = (e.car ?? 0) > n && e.carLink !== "disconnected", l = Xt(e.share, s), c = this.sourceColor(l), h = z(this.hass, i.wallbox.prioritize_connected) === "on" && e.carLink === "connected" && (e.sun ?? 0) > t.num.wallbox.priority_min_sun, d = z(this.hass, i.wallbox.block_charging) === "on";
    let u, g;
    a ? (u = `Nabíjí ${l.text}`, g = c) : e.carLink === "connected" ? (u = "Připojeno, nenabíjí", g = h ? "var(--ed-warning)" : void 0) : e.carLink === "disconnected" && (u = "Odpojeno");
    const p = `color-mix(in srgb, ${g ?? "#d8d8dc"} ${g ? 42 : 28}%, transparent)`, f = U(this.hass, i.car.image)?.attributes?.entity_picture, v = e.carSoc, y = At([e.car], s.kw_from), k = e.car ?? 0;
    return b`<section class="panel" aria-labelledby="h-car">
      <div class="car-top">
        <div class="car-art" aria-hidden="true" style="--glow:${p}">
          <div class="glow"></div><div class="shadow"></div>
          ${typeof f == "string" && f ? b`<img src=${f} alt="" />` : m}
        </div>
        <div class="head"><h2 id="h-car">${t.titles.car}</h2>${this.stateLine(u, g)}</div>
        <div class="car-soc">
          <span class="soc">${v === void 0 ? _ : w(v)}<small> %</small>${v === void 0 ? b`<span class="sr-only">bez dat</span>` : m}</span>
          <span class="range">dojezd <b>${e.carRange === void 0 ? _ : `${w(e.carRange)} km`}</b></span>
        </div>
      </div>
      <div>
        <div class="meter" role="img" aria-label="Nabití auta ${v === void 0 ? "bez dat" : `${w(v)} %`}, limit ${w(r)} %">
          <div class="fill" style="width:${it(v ?? 0, 0, 100)}%"></div>
          <div class="ticks"></div>
          <div class="limit" style="left:${r}%"></div>
        </div>
        <div class="meter-label" aria-hidden="true"><span style="left:${r}%">limit ${w(r)} %</span></div>
      </div>
      ${d ? b`<div class="notice" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${$.lock}></path></svg><p>Nabíjení auta je zablokované.</p></div>` : h ? b`<div class="notice warn" role="status"><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${$.alert}></path></svg><p>Přednost před bojlerem je zapnutá, auto je připojené, ale nenabíjí. Slunce zřejmě nestačí na rozjezd wallboxu.</p></div>` : m}
      ${a ? this.renderCarSources(e, s, ct(k, y)) : m}
      ${this.renderWallboxRows(t, e, a, l, c, y)}
    </section>`;
  }
  renderCarSources(t, e, i) {
    const s = { sun: "Slunce", bat: "Baterie", grid: "Síť" }, n = j.filter((l) => t.share[l] > 4e-3), r = ti(n.map((l) => t.share[l])), a = (l) => l === "grid" && t.share.grid > e.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${V[l]})`;
    return b`<div class="mix">
      <div class="mix-head"><span>Odkud auto nabíjí</span><span>${i}</span></div>
      <div class="mix-bar" aria-hidden="true">${n.map((l) => b`<div style="flex:${t.share[l]} 1 0;background:${a(l)}"></div>`)}</div>
      <p class="mix-legend" role="group" aria-label="Odkud auto nabíjí">
        ${n.map((l, c) => b`<span><i style="background:${a(l)}"></i>${s[l]}<em>${r[c]} %</em></span>`)}
      </p>
    </div>`;
  }
  renderWallboxRows(t, e, i, s, n, r) {
    const a = t.entities.wallbox, l = this.shown(a.boost), c = !!this._open.wallbox, h = !!(a.boost || a.block_charging || a.prioritize_connected);
    let d = _;
    l === "off" ? d = "Vypnuto" : l === "on" && (d = i ? `Nabíjí ${s.text}` : e.carLink === "connected" ? "Auto nenabíjí" : e.carLink === "disconnected" ? "Auto není připojeno" : _);
    const u = l === "on", g = u ? i ? n : "var(--ed-warning)" : void 0, p = e.carLink === "charging" || i ? b`nabíjí <b style="--c:${n}">${ct(e.car ?? 0, r)}</b>` : e.carLink === "connected" ? b`nenabíjí` : e.carLink === "disconnected" ? b`odpojeno` : b`${_}`;
    return b`<ul class="group">
      <li>
        <button type="button" class="row row-btn" @click=${() => this.moreInfo(a.power)}>
          <span class="badge" aria-hidden="true" style=${i ? `--bc:${n}` : ""}><svg viewBox="0 0 24 24"><path d=${$.wallbox}></path></svg></span>
          <span class="row-text"><span class="row-title">Wallbox</span><span class="row-sub">${p}</span></span>
          <span></span>
        </button>
      </li>
      <li class=${c ? "open" : ""}>
        ${h ? b`<button type="button" class="row row-btn" aria-expanded=${c ? "true" : "false"} @click=${() => this.toggle("wallbox")}>
              <span class="badge" aria-hidden="true" style=${u ? "--bc:var(--ed-warning)" : ""}><svg viewBox="0 0 24 24"><path d=${$.bolt}></path></svg></span>
              <span class="row-text"><span class="row-title">Boost</span><span class="row-sub ${g ? "accent" : ""}" style=${g ? `--c:${g}` : ""}>${d}</span></span>
              <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${$.chevron}></path></svg>
            </button>
            <div class="fold ${c ? "open" : ""}" ?inert=${!c}><div>${this.renderWallboxDetail(t)}</div></div>` : m}
      </li>
    </ul>`;
  }
  renderWallboxDetail(t) {
    const e = t.entities.wallbox, i = [{ value: "off", label: "Přetoky" }, { value: "on", label: "Boost" }];
    return b`<div class="detail">
      ${e.boost ? this.segmented("Režim nabíjení auta", i, this.shown(e.boost), e.boost, (s) => this.setBoost("wallbox", s === "on")) : m}
      ${this.shown(e.boost) === "on" ? this.renderPower(t) : m}
      ${e.block_charging ? this.switchRow("Zablokovat nabíjení", e.block_charging, "bojler má přednost") : m}
      ${e.prioritize_connected ? this.switchRow("Přednost před bojlerem", e.prioritize_connected, "dokud je auto připojené") : m}
    </div>`;
  }
  /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
  renderPower(t) {
    const e = t.entities.wallbox.charging_power;
    if (!e) return m;
    const { phases: i, power_min: s, power_max: n, power_step: r } = t.num.wallbox, a = U(this.hass, e), l = M(this.hass, e), c = l === void 0 ? void 0 : l * i / 1e3;
    let h = s / 1e3, d = n / 1e3;
    const u = P(a, "min"), g = P(a, "max");
    return u !== void 0 && (h = Math.max(h, u * i / 1e3)), g !== void 0 && (d = Math.min(d, g * i / 1e3)), b`<div class="field">
      <span class="field-label">Nabíjecí výkon</span><span class="field-value">${c === void 0 ? _ : `${w(c, 1)} kW`}</span>
      <ed-slider
        .min=${h} .max=${d} .step=${r / 1e3} .value=${c ?? h}
        label="Nabíjecí výkon wallboxu" valueText=${c === void 0 ? "bez dat" : `${w(c, 1)} kW`}
        minLabel="${w(h, 1)} kW" maxLabel="${w(d, 1)} kW"
        ?disabled=${c === void 0}
        @ed-change=${(p) => this.setNumber(e, Math.round(p.detail.value * 1e3 / i), "Nabíjecí výkon")}
      ></ed-slider>
    </div>`;
  }
  // ----------------------------------------------------------------- water
  renderWater(t, e) {
    const i = t.entities, s = t.num.boiler, n = t.num.flows, r = n.idle_threshold, a = (e.boil ?? 0) > r, l = Xt(e.share, n), c = this.sourceColor(l), h = this.shown(i.boiler.boost) === "on", d = M(this.hass, i.boiler.target_temperature), u = M(this.hass, i.boiler.boost_target_temperature), g = h ? u : d, p = e.boilTemp, f = s.schema_max - s.scale_min, v = (lt) => it(Math.round((lt - s.scale_min) / f * 100), 8, 95), y = p === void 0 ? "var(--ed-off)" : a && l.deviation || p >= s.hot_from ? "var(--ed-warning)" : p >= s.cold_below ? "var(--ed-off)" : "var(--ed-cold)", k = At([e.boil], n.kw_from);
    let H;
    a ? H = `Bojler ohřívá ${l.text}` : e.boil !== void 0 && (H = "Bez ohřevu");
    const G = Ke(this.hass, i.mixing), X = U(this.hass, i.tank.water_heater), R = this.shown(i.tank.water_heater), S = P(X, "temperature");
    return b`<section class="panel" aria-labelledby="h-water">
      <div class="head"><h2 id="h-water">${t.titles.water}</h2>${this.stateLine(H, a ? c : void 0)}</div>
      <div class="water">
        <div class="tank-col">
          <div class="tank" role="img" aria-label="Bojler ${p === void 0 ? "bez dat" : `${w(p)} °C`}${g === void 0 ? "" : `, cíl ${w(g)} °C`}">
            ${p === void 0 ? m : b`<div class="tank-water" style="height:${v(p)}%;background:color-mix(in srgb, ${y} 38%, transparent);border-top-color:${y}"></div>`}
            ${g === void 0 ? m : b`<div class="tank-target" style="top:${100 - it((g - s.scale_min) / f * 100, 0, 100)}%"></div>`}
            <div class="tank-temp">${p === void 0 ? _ : w(p)}<small>${p === void 0 ? "" : "°C"}</small></div>
          </div>
          <div class="tank-caption"><b>Bojler (FVE)</b><span class=${a ? "src" : ""} style="--c:${c}">ohřev ${e.boil === void 0 ? _ : ct(e.boil, k)}</span></div>
        </div>
        ${this.renderMixingArrows(G)}
        <div class="tank-col">
          <div class="tank" role="img" aria-label="Zásobník, ${S === void 0 ? "nastavení bez dat" : `nastaveno ${w(S)} °C`}, naměřená teplota není">
            ${S === void 0 || R === "off" ? m : b`<div class="tank-water" style="height:${v(S)}%;background:color-mix(in srgb, var(--ed-warning) 38%, transparent);border-top:2px dashed var(--ed-warning)"></div>`}
            <div class="tank-temp top">${S === void 0 ? _ : w(S)}<small>${S === void 0 ? "" : "°C"}</small></div>
          </div>
          <div class="tank-caption"><b>Zásobník (plyn)</b><span>${R === "off" ? "vypnuto" : "nastaveno"}</span></div>
        </div>
      </div>
      ${this.renderWaterRows(t, e, a, l, c, S, R, G)}
    </section>`;
  }
  /** Arrows of the mixing: both ways while it is on (solid white), dashed grey otherwise. */
  renderMixingArrows(t) {
    const e = t === "on";
    return b`<svg class="mixing" viewBox="0 0 121 132" aria-hidden="true">
      <g fill="none" stroke=${e ? "var(--ed-text)" : "var(--ed-off)"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=${e ? "none" : "3 3"}>
        <path d="M8 40 H112"></path><path d="M113 96 H9"></path>
      </g>
      <g fill="none" stroke=${e ? "var(--ed-text)" : "var(--ed-off)"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M104 32 L113 40 L104 48"></path><path d="M17 88 L8 96 L17 104"></path>
      </g>
      <text x="60.5" y="70" text-anchor="middle" font-size="13">mísení</text>
      <text x="60.5" y="88" text-anchor="middle" font-size="15" font-weight="500" style=${e ? "fill:var(--ed-text)" : ""}>${t === "on" ? "zapnuto" : t === "off" ? "vypnuto" : t === "unclear" ? "nejasné" : _}</text>
    </svg>`;
  }
  renderWaterRows(t, e, i, s, n, r, a, l) {
    const c = t.entities, h = c.boiler, d = this.shown(h.boost), u = d === "on";
    let g = _;
    d === "off" ? g = "Vypnuto" : u && (g = i ? `Hřeje ${s.text}` : "Nehřeje");
    const p = u ? i ? n : "var(--ed-warning)" : void 0, f = !!(c.tank.water_heater || c.mixing.script && (c.mixing.valve_c1 || c.mixing.valve_c2)), v = !!(h.boost || h.target_temperature || h.boost_target_temperature), y = !!this._open.tank, k = !!this._open.boiler;
    return b`<ul class="group">
      <li class=${y ? "open" : ""}>
        <button type="button" class="row row-btn" aria-expanded=${y ? "true" : "false"} ?disabled=${!f} @click=${() => this.toggle("tank")}>
          <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d=${$.waterTemp}></path></svg></span>
          <span class="row-text">
            <span class="row-title">Zásobník (plyn)</span>
            <span class="row-sub">${r === void 0 && a === void 0 ? _ : b`nastaveno <b>${r === void 0 ? _ : `${w(r)} °C`}</b>${a === void 0 ? m : ` · režim ${Qe[a] ?? a}`}`}</span>
          </span>
          ${f ? b`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${$.chevron}></path></svg>` : b`<span></span>`}
        </button>
        ${f ? b`<div class="fold ${y ? "open" : ""}" ?inert=${!y}><div>${this.renderTankDetail(t, l)}</div></div>` : m}
      </li>
      <li class=${k ? "open" : ""}>
        <button type="button" class="row row-btn" aria-expanded=${k ? "true" : "false"} ?disabled=${!v} @click=${() => this.toggle("boiler")}>
          <span class="badge" aria-hidden="true" style=${u ? "--bc:var(--ed-warning)" : ""}><svg viewBox="0 0 24 24"><path d=${$.bolt}></path></svg></span>
          <span class="row-text"><span class="row-title">Boost bojleru</span><span class="row-sub ${p ? "accent" : ""}" style=${p ? `--c:${p}` : ""}>${g}</span></span>
          ${v ? b`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${$.chevron}></path></svg>` : b`<span></span>`}
        </button>
        ${v ? b`<div class="fold ${k ? "open" : ""}" ?inert=${!k}><div>${this.renderBoilerDetail(t)}</div></div>` : m}
      </li>
    </ul>`;
  }
  renderBoilerDetail(t) {
    const e = t.entities.boiler, i = t.num.boiler, s = this.shown(e.boost) === "on", n = M(this.hass, e.target_temperature), r = M(this.hass, e.boost_target_temperature), a = [
      { value: "off", label: "Přetoky", detail: n === void 0 ? void 0 : `${w(n)} °C` },
      { value: "on", label: "Boost", detail: r === void 0 ? void 0 : `${w(r)} °C` }
    ], l = s ? e.boost_target_temperature : e.target_temperature, c = U(this.hass, l), h = s ? r : n;
    let d = i.target_min, u = i.target_max;
    const g = P(c, "min"), p = P(c, "max");
    g !== void 0 && (d = Math.max(d, g)), p !== void 0 && (u = Math.min(u, p)), s && n !== void 0 && (u = Math.min(u, n)), !s && r !== void 0 && (d = Math.max(d, r));
    const f = s ? "boost" : "přetoky";
    return b`<div class="detail">
      ${e.boost ? this.segmented("Režim ohřevu bojleru a jeho cílová teplota", a, s ? "on" : this.shown(e.boost) === void 0 ? "" : "off", e.boost, (v) => this.setBoost("boiler", v === "on")) : m}
      ${l ? b`<div class="field">
            <span class="field-label">Cíl ohřevu (${f})</span><span class="field-value">${h === void 0 ? _ : `${w(h)} °C`}</span>
            <ed-slider
              .min=${d} .max=${u} .step=${i.target_step} .value=${h ?? d}
              label="Cíl ohřevu bojleru, ${f}" valueText=${h === void 0 ? "bez dat" : `${h} °C`}
              minLabel="${w(d)} °C" maxLabel="${w(u)} °C"
              ?disabled=${h === void 0}
              @ed-change=${(v) => this.setNumber(l, v.detail.value, "Cíl ohřevu bojleru")}
            ></ed-slider>
          </div>` : m}
    </div>`;
  }
  renderTankDetail(t, e) {
    const i = t.entities, s = t.num.tank, n = i.tank.water_heater, r = U(this.hass, n), a = this.shown(n), l = Array.isArray(r?.attributes?.operation_list) ? r.attributes.operation_list : Object.keys(Ct), c = Object.keys(Ct).filter((f) => l.includes(f)).map((f) => ({ value: f, label: Ct[f] })), h = P(r, "temperature"), d = a === "heat", u = Math.max(s.temp_min, P(r, "min_temp") ?? s.temp_min), g = Math.min(s.temp_max, P(r, "max_temp") ?? s.temp_max), p = !!(i.mixing.script && i.mixing.valve_c1 && i.mixing.valve_c2);
    return b`<div class="detail">
      ${n ? this.segmented("Režim zásobníku", c, a, n, (f) => this.setTank(n, f)) : m}
      ${n ? b`<div class="fold ${d ? "open" : ""}" ?inert=${!d}>
            <div>
              <div class="field">
                <span class="field-label">Teplota</span><span class="field-value">${h === void 0 ? _ : `${w(h)} °C`}</span>
                <ed-slider
                  .min=${u} .max=${g} .step=${s.temp_step} .value=${h ?? u}
                  label="Teplota zásobníku" valueText=${h === void 0 ? "bez dat" : `${h} °C`}
                  minLabel="${w(u)} °C" maxLabel="${w(g)} °C"
                  ?disabled=${h === void 0}
                  @ed-change=${(f) => this.setTankTemperature(n, f.detail.value)}
                ></ed-slider>
              </div>
            </div>
          </div>` : m}
      ${p ? this.renderMixingControl(e) : m}
    </div>`;
  }
  /** Mixing is switched by a script that toggles the valves, so the card asks first (CURRENT_SPEC.md, Mísení vody). */
  renderMixingControl(t) {
    const e = [{ value: "off", label: "Vypnuto" }, { value: "on", label: "Zapnuto" }], i = t === "on" || t === "off", s = this._confirmMix;
    return b`<div class="field">
      <span class="field-label">Mísení vody</span><span class="hint">${t === void 0 ? _ : t === "unclear" ? "stav ventilů je nejasný" : ""}</span>
      <ed-segmented
        style="grid-column:1 / -1;margin-top:6px"
        .options=${e} .value=${i ? t : ""} label="Mísení vody" ?disabled=${!i}
        @ed-select=${(n) => {
      this._confirmMix = n.detail.value === t ? void 0 : n.detail.value;
    }}
      ></ed-segmented>
      ${s && i ? b`<div class="confirm" role="alertdialog" aria-label="Potvrzení přepnutí mísení" style="grid-column:1 / -1;margin-top:10px">
            <span>Přepnout mísení vody na ${s === "on" ? "zapnuto" : "vypnuto"}?</span>
            <div class="buttons">
              <button type="button" class="btn" @click=${() => {
      this._confirmMix = void 0;
    }}>Zrušit</button>
              <button type="button" class="btn primary" @click=${() => this.setMixing(s, t)}>Přepnout</button>
            </div>
          </div>` : m}
    </div>`;
  }
  // --------------------------------------------------------------- controls
  /** The state shown: a just chosen value, until Home Assistant reports it. */
  shown(t) {
    if (t)
      return this._optimistic[t] ?? z(this.hass, t);
  }
  toggle(t) {
    this._open = { ...this._open, [t]: !this._open[t] };
  }
  segmented(t, e, i, s, n) {
    const r = z(this.hass, s) === void 0 && this._optimistic[s] === void 0;
    return b`<ed-segmented
      .options=${e} .value=${i ?? ""} label=${t} ?disabled=${r}
      @ed-select=${(a) => n(a.detail.value)}
    ></ed-segmented>`;
  }
  switchRow(t, e, i) {
    const s = this.shown(e);
    return b`<div class="switch-row">
      <span class="switch-text"><span class="switch-title">${t}</span><span class="hint">${s === void 0 ? _ : i}</span></span>
      <ed-switch
        label=${t} .checked=${s === "on"} ?disabled=${s === void 0}
        @ed-toggle=${(n) => this.setSwitch(e, n.detail.checked, t)}
      ></ed-switch>
    </div>`;
  }
  // ---------------------------------------------------------------- actions
  moreInfo(t) {
    t && this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 }));
  }
  choose(t, e) {
    this._optimistic = { ...this._optimistic, [t]: e }, window.clearTimeout(this._timers.get(t)), this._timers.set(t, window.setTimeout(() => {
      const i = { ...this._optimistic };
      delete i[t], this._optimistic = i;
    }, (this._config?.num.ui.revert_after ?? 6) * 1e3));
  }
  /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
  async call(t, e, i, s, n) {
    if (!this.hass || z(this.hass, s) === void 0)
      return this._feedback = `${n}: entita nehlásí data, nic jsem neodeslal.`, !1;
    try {
      return await this.hass.callService(t, e, i), !0;
    } catch {
      return this._feedback = `${n}: Home Assistant příkaz nepřijal.`, !1;
    }
  }
  async setSwitch(t, e, i) {
    this._feedback = "", this.choose(t, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: t }, t, i);
  }
  async setBoost(t, e) {
    const i = this._config.entities, s = t === "wallbox" ? i.wallbox.boost : i.boiler.boost;
    s && (this._feedback = "", t === "wallbox" && e && i.wallbox.block_charging && z(this.hass, i.wallbox.block_charging) === "on" && (await this.setSwitch(i.wallbox.block_charging, !1, "Zablokovat nabíjení"), this._feedback = "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval."), this.choose(s, e ? "on" : "off"), await this.call("switch", e ? "turn_on" : "turn_off", { entity_id: s }, s, t === "wallbox" ? "Boost wallboxu" : "Boost bojleru"));
  }
  async setNumber(t, e, i) {
    this._feedback = "", await this.call("number", "set_value", { entity_id: t, value: e }, t, i);
  }
  async setTank(t, e) {
    this._feedback = "", this.choose(t, e), await this.call("water_heater", "set_operation_mode", { entity_id: t, operation_mode: e }, t, "Režim zásobníku");
  }
  async setTankTemperature(t, e) {
    this._feedback = "", await this.call("water_heater", "set_temperature", { entity_id: t, temperature: e }, t, "Teplota zásobníku");
  }
  /** The script toggles the valves, so it is called only when the wanted state differs from the real one. */
  async setMixing(t, e) {
    const i = this._config.entities.mixing.script;
    this._confirmMix = void 0, !(!i || t === e) && (this._feedback = "", await this.call("script", "turn_on", { entity_id: i }, i, "Mísení vody"));
  }
};
Dt.styles = Xe;
let T = Dt;
q([
  K()
], T.prototype, "_config");
q([
  C({ attribute: !1 })
], T.prototype, "hass");
q([
  K()
], T.prototype, "_width");
q([
  K()
], T.prototype, "_optimistic");
q([
  K()
], T.prototype, "_feedback");
q([
  K()
], T.prototype, "_open");
q([
  K()
], T.prototype, "_confirmMix");
customElements.get("ed-segmented") || customElements.define("ed-segmented", Z);
customElements.get("ed-slider") || customElements.define("ed-slider", E);
customElements.get("ed-switch") || customElements.define("ed-switch", tt);
customElements.get("ha-energie-dashboard") || customElements.define("ha-energie-dashboard", T);
window.customCards = window.customCards ?? [];
window.customCards.some((o) => o.type === "ha-energie-dashboard") || window.customCards.push({
  type: "ha-energie-dashboard",
  name: "Energie Dashboard",
  description: "Energie domu: toky jako Sankey diagram, auto s wallboxem a teplá voda (bojler, zásobník, mísení) s ovládáním.",
  preview: !1
});
